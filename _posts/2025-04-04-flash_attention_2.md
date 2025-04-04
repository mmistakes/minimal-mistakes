---
layout: single
title:  "Online Softmax 개선: FlashAttention-2"
categories: "코딩"
toc: true
typora-root-url: ./
---

FlashAttention-2가 발표되면서 기존 FlashAttention에 비해 성능이 크게 향상되었습니다.

원래는 하나의 어텐션 헤드를 단일 스레드 블록이 처리하도록 설계되었으나, 이 방식은 시퀀스 길이가 길어지면 GPU의 SM이 효율적으로 활용되지 않아 자원 낭비로 이어졌습니다. 이를 해결하기 위해 FlashAttention-2에서는 시퀀스 길이 방향으로 병렬 처리를 도입하여 하나의 헤드를 여러 스레드 블록이 나누어 처리할 수 있도록 개선하였습니다. 

이러한 변화와 함께 다양한 최적화가 추가되었는데, 이번 포스팅에서는 그중에서도 새롭게 제안된 온라인 소프트맥스 최적화 기법을 중심으로 살펴보고자 합니다. 

## Advanced Online Softmax 

**FlashAttention**

각 어텐션 행을 여러 블록으로 나눠서 softmax를 정밀하게 계산하면서 정규화 상수(m, d)를 점진적으로 업데이트 하는 구조입니다.

$ \text{for i} \leftarrow 1, \text{N do} $

$$
\begin{align*}
x_i &\leftarrow Q[k,:]K^T[:,i] \\
m_i &\leftarrow \text{max}(m_{i-1}, x_i) \\
d_i^{\prime} &\leftarrow d_{i-1}^{\prime} e^{m_{i-1}-m_i} + e^{x_i-m_i} \\
o_i^{\prime} &\leftarrow o_{i-1}^{\prime} 
\frac{d_{i-1}^{\prime}e^{m_{i-1}-m_i}}{d_i^{\prime}} 
+ \frac{e^{x_i-m_i}}{d_i^{\prime}}V[i,:]
\end{align*}
$$

$ \text{end} $

$$
O[k,:] \leftarrow o_N^{\prime}
$$

```python
@triton.jit
def flashatt_kernel(q_ptr, k_ptr, v_ptr, z_ptr, N0, T, B0: tl.constexpr):
  pid = tl.program_id(0)
  block_indices = pid * B0 + tl.arange(0, B0)
  block_mask = block_indices < N0
  q_val = tl.load(q_ptr + block_indices, mask=block_mask, other=0.0)
  
  m = tl.full((B0,), float("-inf"), dtype=tl.float32)
  d = tl.zeros((B0,), dtype=tl.float32)
  z = tl.zeros((B0,), dtype=tl.float32)
  
  for j in range(0, T, B0):
    tile_indices = j + tl.arange(0, B0)
    tile_mask = tile_indices < T
    k_val = tl.load(k_ptr + tile_indices, mask=tile_mask, other=0.0)
    v_val = tl.load(v_ptr + tile_indices, mask=tile_mask, other=0.0)
    
    x = q_val[:, None] * k_val[None, :]
    x = tl.where(tile_indices[None, :] < T, x, float("-inf"))
    
    tile_m = tl.max(x, axis=1)
    tile_exp = tl.exp(x - tile_m[:, None])
    tile_d = tl.sum(tile_exp, axis=1)
    
    new_m = tl.maximum(m, tile_m)
    new_d = d * tl.exp(m - new_m) + tile_d * tl.exp(tile_m - new_m)
    
    a = tl.exp(x - new_m[:, None]) / new_d[:, None]
    z = z * (d * tl.exp(m - new_m) / new_d) + tl.sum(a * v_val[None, :], axis=1)
    
    m = new_m
    d = new_d 

  tl.store(z_ptr + block_indices, z, mask=block_mask)
```

**FLASHATTENTION-2** 

FlashAttention-2에서 online softmax는 max, div, exp 연산을 루프 내부에서 최소화하여 속도와 효율을 높였습니다. 

softmax는 다음과 같은 기본 성질이 있습니다. 

$$
\forall \text{c} \in \mathbb{R}, \quad \frac{e^{x_j}}{\sum_{i=1}^{T}e^{x_i}} = \frac{e^{x_j - c}}{\sum_{i=1}^{T}e^{x_i - c}} 
$$

각 타일 $t$의 기준 값 $m_t$ 는 타일 내에서만 동일하고 타일 간에는 다릅니다. 그러므로 $m_t \leq m$ 일때 다음과 같이 나타낼 수 있습니다. 여기서 $e^{m-m_t}$ 는 타일마다 일정한 스케일링 인자 입니다. 

$$
e^{x_j - m_t} = e^{x_j - m} e^{m - m_t}
$$

여기서 소프트맥스의 분모와 분자를 다음과 같이 조정할 수 있습니다. 

$$
n = \sum_t \sum_{j \in t } e^{x_j - m_t} = 
\sum_t e^{m-m_t}\sum_{j \in t} e^{x_j - m} v_j
$$

$$
d = \sum_t \sum_{j \in t } e^{x_j - m_t} = 
\sum_t e^{m-m_t}\sum_{j \in t} e^{x_j - m}
$$

여기서 최종 출력은 다음과 같이 나타낼 수 있습니다. 

$$
O = \frac{n}{d}
= \frac{\sum_t e^{m-m_t}\sum_{j \in t} e^{x_j - m} v_j}
{\sum_t e^{m-m_t}\sum_{j \in t} e^{x_j - m}}
= \frac{\sum_j e^{x_j - m} v_j}
{\sum_j e^{x_j - m}}
$$

즉, 타일마다 들어갔던 스케일링 인자가 분모/분자에 공통으로 들어가 약분되어 사라집니다. 이 형태는 softmax-weighted sum 형태가 됩니다. 

$$
O = \sum_j \text{softmax(x)}_j v_j = \sum_j 
\frac{e^{x_j}}{\sum_i e^{x_i}} v_j =
\frac{\sum_j e^{x_j }v_j}{\sum_i e^{x_i}}
$$

$\text{for i} \leftarrow 1, \text{N do}$

$$
\begin{align*}
x_i &\leftarrow Q[k,:] K^T[:, i] \\
a_i &\leftarrow \exp(x_i - m_t) \\
n_i &\leftarrow n_{i-1} + a_i \cdot V[i,:] \\
d_i &\leftarrow d_{i-1} + a_i
\end{align*}
$$

$\text{end}$

$$
O[k,:] \leftarrow \frac{n_N}{d_N}
$$

```python
@triton.jit
def flashatt2_kernel(q_ptr, k_ptr, v_ptr, z_ptr, N0, T, B0: tl.constexpr):
    pid = tl.program_id(0)
    block_indices = pid * B0 + tl.arange(0, B0)
    block_mask = block_indices < N0
    q = tl.load(q_ptr + block_indices, mask=block_mask, other=0.0)

    num = tl.zeros((B0,), dtype=tl.float32) 
    d = tl.zeros((B0,), dtype=tl.float32)    

    for j in range(0, T, B0):
        tile_indices = j + tl.arange(0, B0)
        tile_mask = tile_indices < T
        k = tl.load(k_ptr + tile_indices, mask=tile_mask, other=0.0)
        v = tl.load(v_ptr + tile_indices, mask=tile_mask, other=0.0)

        x = q[:, None] * k[None, :]
        tile_m = tl.max(x, axis=1)
        a = tl.exp(x - tile_m[:, None])
        num += tl.sum(a * v[None, :], axis=1)
        d += tl.sum(a, axis=1)

    out = num / d
    tl.store(z_ptr + block_indices, out, mask=block_mask)
```

