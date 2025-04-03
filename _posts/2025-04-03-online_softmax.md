---
layout: single
title:  "From Online Softmax to. Flash Attention"
typora-root-url: ./
---

이번 포스팅은 [From Online Softmax to FlashAttention](https://courses.cs.washington.edu/courses/cse599m/23sp/notes/flashattn.pdf) 리포트에 대해 다룹니다. 

이 리포트는 워싱턴 대학교 컴퓨터 공학과 박사과정 학생인  [Zihao Ye](https://homes.cs.washington.edu/~zhye/)가 2023년 봄 학기에 CSE 599M: ML for ML Systems 강의의 조교(TA)로 활동하며 수업 참고 자료로 제공한 것입니다. 

FlashAttention 알고리즘이 어떻게 작동하는지를 온라인 소프트맥스(Online Softmax) 기법을 통해 단계적으로 유도하는 것을 목표로 합니다. 

### The Self-Attention 

Self-Attention의 계산은 다음과 같이 요약할 수 있습니다. 
$$
O = \text{softmax}(QK^T)V
$$
 Self-Attention을 계산하는 일반적인 접근 방식은 여러 단계로 계산을 분해하는 것입니다. 여기서 $ X $ 는 pre-softmax logits, $ A $ 는 attention score, $ O $는 output 입니다.
$$
X = QK^T
$$

$$
A = \text{softmax}(X)
$$

$$
O = AV
$$



FlashAttention의 주요 특징은 기존 어텐션 메커니즘과 달리 $X$ 와 $A$ 를 전부 메모리에 상주시킬 필요가 없다는 점입니다. 

행렬 곱셈은 타일링을 사용하여 온칩 메모리가 하드웨어의 용량 한계를 넘지 않도록 설계합니다. 커널 실행 중에는 행렬의 형태와 관계없이 온칩에 저장되는 요소의 수를 $3T^2$ 개로 제한합니다. 

이러한 타일링 접근법이 효과적인 이유는 전체 행렬 곱셈을 여러 타일 단위의 부분 행렬 곱셈의 합으로 분해할 수 있기 때문입니다. 

하지만 Self-Attention의 경우, 소프트맥스 연산으로 인해 단순히 타일링만으로는 제약이 따르며, FlashAttention은 이를 해결한 방법으로 개발되었습니다. 

![matrix](./../images/2025-04-03-online_softmax/matrix.png)

### (safe) softmax

소프트맥스 계산의 일반적인 공식은 다음과 같습니다. 
$$
\text{softmax}(\{x_1, \cdots, x_N\}) = \left\{ \frac{e^{x_i}}{\sum_{j=1}^{N} e^{x_j}} \right\}_{i=1}^{N}
$$
여기서 $x_i$ 값이 매우 클 경우, $e^{x_i}$는 쉽게 오버플로우 될 수 있습니다. 예를 들어, float16이 지원할 수 있는 최대 숫자는 65536인데, 이는 $x > 11$ 일 경우 $e^{x}$ 가 float16의 유효 범위를 넘어서게 됨을 것을 의미합니다. 이런 문제를 해결하기 위해 **"safe"** softmax 를 활용하여 오버플로우를 방지합니다. 
$$
\frac{e^{x_i}}{\sum_{j=1}^{N} e^{x_j}} = \frac{e^{x_i -m}}{\sum_{j=1}^{N} e^{x_j - m}}
$$
여기서 $m = \text{max}_{j=1}^{N} (x_j)$ 로 정의되며, $x_i - m \leq 0$ 이 성립함으로 지수 함수에는 항상 음수 또는 0이 입력됩니다. 이로 인해 오버플로우가 발생하지 않아 안전하게 계산할 수 있습니다. 

이러한 **"safe"** softmax는 3-pass 알고리즘으로 요약할 수 있다. 

### Algorithm 3-pass safe softmax 

NOTIONS 

${m_i}: max_{j=1}^{i}\{x_j\}$, with initial value $m_0 = -\inf$

$\{d_i\}: \sum_{j=1}^{i} e^{x_j -m_N}$, with initial value $d_0 = 0, d_n$ is the denominator of safe softmax

$\{a_i\}:$ the final softmax value 

BODY

$\text{for i} \leftarrow 1, \text{N do}$
$$
m_i \leftarrow \text{max}(m_{i-1}, x_i)
$$
$\text{end}$

$\text{for i} \leftarrow 1, \text{N do}$
$$
d_i \leftarrow d_{i-1} + e^{x_i - m_N}
$$
$\text{end}$

$\text{for i} \leftarrow 1, \text{N do}$
$$
a_i \leftarrow \frac{e^{x_i - m_N}}{d_N}
$$
$\text{end}$

