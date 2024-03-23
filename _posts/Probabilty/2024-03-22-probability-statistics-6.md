---
title: "4장| 이산확률변수와 확률분포"
excerpt: "4장| 이산확률변수와 확률분포"
categories: ['Probability & Statistics']
# Cpp / Algorithm / Computer Network / A.I / Database / Mobile Platform / Probability & Statistics
tags: probability-statistics

toc: true
toc_sticky: true
use_math: true

date: 2024-03-22
last_modified_at: 2024-03-22
---
## 확률변수
&nbsp;&nbsp;각 근원사건에 수치를 대응시키는 것을 **확률변수**라 한다.

### 확률변수(random varialble)
&nbsp;&nbsp;주어진 표본공간 $\Omega$에서 실수로 가는 함수이며 보통 $X,\,Y,\dotsb$로 나타낸다. 즉,
$$X:\Omega \rightarrow R$$확률변수는 정의역은 표본공간이고 공역이 실수인 함수이다.
* 확률실험을 했을 때 발생할 수 있는 결과를 실수값으로 바꿔주는 함수
* $X(\omega)=x$는 근원사건 $\omega \in \Omega$에 대응하는 실숫값이 $x$임을 의미한다.

#### 베르누이(Bernoulli) 확률변수
* 매 시행에서 오직 두 가지의 가능한 결과만 일어나는, 표본공간을 1과 0으로 대응하는 확률변수
* **지시**(indicator) 확률변수라고도 부른다.

#### 이산확률변수
* 확률변수가 가질 수 있는 값의 개수가 유한이거나 무한이어도 셀 수 있는 경우의 확률변수

#### 연속확률변수
* 연속적인 구간에 속하는 모든 값을 다 가질 수 있는 경우의 확률변수

## 확률분포

### 확률분포(probability distribition)
&nbsp;&nbsp;확률변수가 갖는 값들과 그에 대응하는 확률값을 나타내는 것을 **확률분포**(probability distribition)이라 한다.
* 나열된 표나 수식으로 표현
* 확률변수 $X$의 분포라고 한다.

#### 확률질량함수(probability mass function)
&nbsp;&nbsp;이산확률변수 &X&가 가지는 모든 값 &x&에 대하여
$$f(x)=P(X=x)=P(\{ w:X(w)=x\})$$를 확률함수, 확률질량함수라고 한다.
* 이산형 확률변수의 각 이산점에 대한 확률의 크기를 표현한 함수

##### 성질
1. 모든 값 $x$에서 $0\leq f(x) \leq 1$
2. 임의의 구간 $A$에 대하여 $P(X\in A)=\sum_{x\in A}f(x)$
3. $\sum_{모든\,x}f(x)=1$

## 이산확률분포의 기댓값과 표준편차

## 이항분포

## 초기하분포

## 기하분포

## 포아송분포