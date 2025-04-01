---
layout: post
title: "Activation functions"
date: 2024-03-31
category: [deeplearning]
header:
  teaser: https://github.com/user-attachments/assets/94ab4e96-a7c0-4408-bba1-56fb254cc19e
excerpt:
---

## Activation Function
- 뉴런(노드)에서 나온 출력값을 비선형 함수에 통과시켜주는 함수.

- 왜 Activation Function이 필요할까?
  - 만약 activation function 없이 뉴런을 쌓으면, 아무리 여러 층을 쌓아도 전체는 선형 함수가 되어 복잡한 문제를 해결할 수 없음.
  - 즉, activation function은 모델에 '비선형성'을 넣어줘서 복잡한 문제를 풀 수 있게 해줌.

---

## 🔹 1. Sigmoid
![image](https://github.com/user-attachments/assets/67fa2cdb-984d-4f10-a7cb-c95a352484cf)
<img width="162" alt="image" src="https://github.com/user-attachments/assets/d4f1393b-35b3-49d0-9f65-c563a7b1f611" />


### ✅ 특징
- 출력: 0 ~ 1
- 확률처럼 해석 가능 → 이진 분류에서 자주 사용
- 입력값이 클수록 1에 가까워지고, 작을수록 0에 가까움
- 비선형 함수의 시작점

### ❓의문
"왜 sigmoid는 잘 안 쓰이게 됐는지?"

### ⚠️ 문제: Gradient Vanishing (기울기 소실)
- x가 크거나 작을수록 기울기(미분 값)가 0에 가까워짐  
→ 역전파 시 앞쪽 레이어로 기울기가 거의 전달되지 않음

---

## 🔹 2. Tanh
![image](https://github.com/user-attachments/assets/4f42b233-edb4-43c1-a643-74336b0bd8fa)
<img width="193" alt="image" src="https://github.com/user-attachments/assets/61c33b67-d3f4-478c-ba8f-d47af87b6353" />

### ✅ 특징
- 출력: -1 ~ 1
- Sigmoid보다 나음 (중심이 0)
- 예전 MLP에서 자주 사용

### ⚠️ 문제
- 여전히 Gradient Vanishing 발생

---

## 🔹 3. ReLU
![image](https://github.com/user-attachments/assets/0354288e-6781-4b15-af36-14b626366d55)
<img width="176" alt="image" src="https://github.com/user-attachments/assets/22282230-934e-4685-b949-1f1e7fb2ea3c" />

### ✅ 특징
- 간단하고 빠름
- x > 0이면 기울기 1 → 기울기 소실 없음
- 현재 가장 기본적인 은닉층 함수

### ❓의문
"왜 보통 음수는 0으로?"

✅ 이유:
- 불필요한 정보는 막고, 계산량도 줄이고  
- **희소성(Sparsity)** 증가 → 일반화에 도움  
→ 학습 효율이 좋아짐

### ⚠️ 문제: Dying ReLU
- x < 0일 때 완전히 0 → 뉴런이 죽을 수 있음

---

## 🔹 4. Leaky ReLU / PReLU
![image](https://github.com/user-attachments/assets/ad0cf20e-845f-4019-8ce1-35f536e8673e)
<img width="206" alt="image" src="https://github.com/user-attachments/assets/bad012b5-1841-4ce2-98b5-a8aa7736d970" />


### ✅ Leaky ReLU
- 음수 입력도 약간 통과 (보통 \(\alpha = 0.01\))

### ✅ PReLU
- \(\alpha\)를 학습해서 최적화

### ❓의문
"그럼 왜 음수 입력을 아예 꺼버리진 않고 조금 남겨두는지?"

✅ 이유:
- 완전히 죽이면 학습이 불안정해질 수 있어서  
→ 최소한의 정보는 통과시켜 gradient 흐름 유지

---

## 🔹 5. ELU
![image](https://github.com/user-attachments/assets/7c49bceb-5bfd-4945-861e-b54777f6687d)
<img width="273" alt="image" src="https://github.com/user-attachments/assets/760a26d6-407f-4fdf-ad0b-fd5b7fd46a6f" />


### ✅ 특징
- 음수도 부드럽게 처리
- 중심이 0 → 안정적 학습
- ReLU의 Dying 문제 완화

---

## 🔹 6. Swish (Google 제안)
![image](https://github.com/user-attachments/assets/605d3b35-7164-41ba-b439-eec2c4ebbc0c)
<img width="198" alt="image" src="https://github.com/user-attachments/assets/3ac99f8b-8286-4426-8a92-d0a3905019ed" />


### ✅ 특징
- 입력값이 클수록 잘 켜지고, 작으면 천천히 꺼짐
- ReLU보다 부드럽고 미분 가능
- Gradient 흐름이 부드럽게 이어짐

### ❓의문
"그럼 Swish는 sigmoid 곱하니까 다시 기울기 소실 생길 가능성?"

✅ 답변:
- 일부 구간에서 소실 가능
- 하지만 x와 곱해지기 때문에 **완전한 소실은 피함**
- 중심 0 근처에서는 **기울기 살아 있음**

---

## 🔹 7. GELU (BERT, GPT 사용)
![image](https://github.com/user-attachments/assets/36f7aecc-7007-45f8-9cc3-5af132737d07)
<img width="411" alt="image" src="https://github.com/user-attachments/assets/6af0d5d2-edc0-4a96-8a75-58cf47603f40" />


### ✅ 특징
- 입력값이 **의미 있을 확률 × 입력값** 구조
- 확률 기반 부드러운 스위치
- 중심 0, 부드럽고 안정적
- → Transformer 계열에서 자주 사용

### ❓의문
"유의미한 정도는 어떻게 판단하는지?"

✅ 답변:
- 정규분포(CDF)를 사용해서  
→ 이 입력값이 **중요할 확률**을 계산하고 곱해줌  
→ 확률적으로 켜지는 "지능적인 스위치"

---

## 🔹 8. GEGLU / SwiGLU (Gated Activation Units)

\[
\text{GEGLU}(x) = \text{Linear}_1(x) \cdot \text{GELU}(\text{Linear}_2(x))  
\text{SwiGLU}(x) = \text{Linear}_1(x) \cdot \text{Swish}(\text{Linear}_2(x))
\]

### ✅ 특징
- 두 선형 변환 → 한쪽은 게이트 역할 (GELU or Swish)
- 게이트가 **"필터 역할"**을 해줌
- GPT-4, PaLM, GLaM, T5.1.1 등에서 사용

### ❓의문
"GPT와 같은 최신 모델에는 어떤 활성화 함수 사용?"

✅ 답변:
- GPT-2/3는 **GELU** 사용
- GPT-4는 **GEGLU or SwiGLU**로 추정  
→ 대부분 게이팅 구조의 활성화 함수로 진화 중

---

## 📊 최종 비교표
![image](https://github.com/user-attachments/assets/94ab4e96-a7c0-4408-bba1-56fb254cc19e)

| 함수 | 출력 범위 | 중심 | 기울기 소실 | 특징 |
|------|------------|--------|---------------|--------|
| **Sigmoid** | 0 ~ 1 | 0.5 | ⚠️ 있음 | 확률처럼 해석 |
| **Tanh** | -1 ~ 1 | 0 | ⚠️ 있음 | 중심 0, 안정적 |
| **ReLU** | 0 ~ ∞ | >0 | ✅ 없음 | 빠름, 죽은 뉴런 가능 |
| **Leaky ReLU** | -∞ ~ ∞ | 0 | ✅ 없음 | 죽은 뉴런 방지 |
| **ELU** | -α ~ ∞ | 0 | ✅ 적음 | 부드럽고 안정적 |
| **Swish** | -∞ ~ ∞ | ~0 | ⚠️ 약간 있음 | 부드럽고 효율적 |
| **GELU** | -∞ ~ ∞ | 0 | ✅ 거의 없음 | 확률 기반, 최신 모델 사용 |
| **GEGLU / SwiGLU** | -∞ ~ ∞ | 0 | ✅ 없음 | 게이팅 구조, GPT-4 등 최신 사용 |

