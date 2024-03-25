---
title: "3장 확률"
excerpt: "3장 확률"
categories: ['Probability & Statistics']
# Cpp / Algorithm / Computer Network / A.I / Database / Mobile Platform / Probability & Statistics
tags: probability-statistics

toc: true
toc_sticky: true
use_math: true

date: 2024-03-22
last_modified_at: 2024-03-22
---
## 1. 사건의 확률

##### 표본공간(sampple space: $\omega$)
  * 한 실험에서 나올 수 있는 모든 결과들의 모임
##### 근원사건(elementary space: $\omega_1,\,\omega_2,\,\dotsb$)
  * 표본공간을 구성하는 개개의 결과
##### 사건(event: $A,\,B,\,\dotsb$)
  * 표본공간의 부분집합으로 어떤 특성을 갖는 결과들의 모임
  * 근원 사건들의 집합

#### 확률의 기본 성질
$P(A^c) = 1-P(A)$ : 여사건의 확률
$A \subset B \Rightarrow P(A) \leq P(B)$
$P(A\cup B)=P(A)+P(B)-P(A\cap B)$ : 합사건의 확률법칙
### 수학적 확률
$$P(A) = \frac{n(A)}{n(\Omega)}$$

### 통계적 확률
$$P(A)=\lim_{n\rightarrow\infty} \frac{n(A)}{n}$$

### 조건부 확률
* 두 사건 $A, B$가 있을 때, 사건 $A$가 일어났을 때 $B$가 일어날 확률을 $P(A\mid B)$라 하고 이를 **조건부 확률**이라 한다.
* $P(B)\neq 0$인 사건 $B$가 주어졌을 때 사건 $A$의 조건부 확률
$$P(A\mid B) = \frac{P(A\cap B)}{P(B)}\qquad(단, P(B) > 0)$$

#### 곱사건의 확률법칙
$$
\begin{aligned}
P(A\cap B)&=P(A\mid B)\cdot P(B)\\  
P(A\cap B)&=P(B\mid A)\cdot P(A)  
\end{aligned}
$$

#### 독립
$$
두\,사건\,A,\,B\,가\,다음을\,만족할\,때\,사건\,A와\,사건\,B가\,서로\,독립이라고\,한다.\\
P(A\cap B)=P(A)\,P(B)
$$
$$
\begin{aligned}
  사건\,A와\,B가\,서로\,독립&\Leftrightarrow P(A\mid B)=P(A)\\
  &\Leftrightarrow P(B\mid A)=P(B)
\end{aligned}
$$
* 두 사건의 발생이 전혀 무관할 때, 예를 들어 주사위와 동전을 던질 때 1의 눈이 나오는 사건과 동전 앞면이 나오는 사건은 서로 무관하고, 이러한 두 사건을 서로 **독립**이라고 한다.
* 두 사건 $A,\,B$가 서로 독립이면, $A$와 $B^c$, $A^c$와 $B$, $A^c$와 $B^c$도 서로 독립이다.

#### 상호배반
$$P(A\cap B) = \emptyset $$

### 표본공간의 분할과 베이즈 정리(Bayes' Rule)

#### 표본공간의 분할(partition)
$$사건\,A_1,\,A_2\,,\dotsb ,\,A_n이\,서로\,배반사건이고\,\Omega=A_1\cup\dotsb A_n일\,때\\사건\,A_1,\,A_2\,,\dotsb ,\,A_n을\,\Omega의\,분할이라고\,한다.$$

#### 총확률의 법칙(law of total probability)
$$사건\,A_1,\,A_2\,,\dotsb ,\,A_n이\,표본공간의\,분할일\,때,\\\,임의의\,사건\,B의\,확률\,P(B)는\,다음과\,같이\,계산할\,수\,있다.\\
P(B)=\Sigma P(A_i)P(B\mid A_i)
$$

#### 베이즈 정리
$$
사건\,A_1,\,A_2\,,\dotsb ,\,A_n이\,표본공간의\,분할일\,때,\\\,임의의\,사건\,B에\,대하여\,다음\,식이\,성립된다.\\
P(A_i\mid B)=\frac{P(A_i)P(B\mid A_i)}{P(A_1)P(B\mid A_1)+\dotsb +P(A_n)P(B\mid A_n)},\,i=1,\,\dotsb, n
$$
$P(A_i\mid B)$: $B$라는 결과를 보였을 때, $i$번째 원인에 의할 확률

