---
title: "monge array의 정의와 성질"
date: 2020-04-30 22:45:00
categories:
- Hard-Algorithm
tags:
- DP
---

### 서론
DP 최적화를 공부하다보면 monge array라는 것이 많이 보이지만, 정작 monge array에 대한 설명은 많이 없습니다.<br>
이 글에서는 monge array의 정의와 몇 가지 성질의 증명을 다룹니다.

### 정의
$n \times m$크기의 행렬 $A$가 아래 성질을 만족할 때 $A$를 monge array라고 합니다.
> $1 ≤ a < b ≤ n,\space 1 ≤ c < d ≤ m$인 $a, b, c, d$에 대해 $A[a, c] + A[b, d] ≤ A[a, d] + A[b, c]$를 만족

예를 들어, 아래 행렬은 monge array입니다.

 ![ \begin{bmatrix} 10 & 17 & 13 & 28 & 23 \\ 17 & 22 & 16 & 29 & 23 \\ 24 & 28 & 22 & 34 & 24 \\ 11 & 13 & 6 & 17 & 7 \\ 45 & 44 & 32 & 37 & 23 \\ 36 & 33 & 19 & 21 & 6 \\ 75 & 66 & 51 & 53 & 34 \end{bmatrix}](https://wikimedia.org/api/rest_v1/media/math/render/svg/c63443c48b1827644de13c8ab732376463abb1e9) 

DP에서 monge array의 성질을 이용해 최적화를 하는 경우, 대부분 $A[i, j]$가 구간 $[i, j]$를 사용할 때의 비용을 의미하므로 $a ≤ b ≤ c ≤ d$로 봐도 됩니다.<br>행렬을 구간의 비용이라고 보면, 이 부등식은 한 구간이 다른 구간을 포함하고 있을 때 그렇지 않게 풀어주는 것이 이득인 것을 의미합니다.

### 성질
**1. monge array의 행 $n'$개, 열 $m'$개를 선택한 뒤, 선택한 행과 열이 교차하는 위치에 있는 원소들로 만든 $n'\times m'$ 크기의 행렬도 monge array이다.**

**proof.** 자명

**2. monge array 두 개를 더해도 monge array이다.**

**proof.** 행렬 $A, B$가 monge array이고 $C = A + B$라고 합시다.
* $A[a, c] + A[b, d] ≤ A[a, d] + A[b, c]$
* $B[a, c] + B[b, d] ≤ B[a, d] + A[b, c]$
* 양변을 더해주면 $C[a, c] + C[b, d] ≤ C[a, d] + C[b, c]$ 이므로 monge array 두 개를 더해도 monge array입니다.

비슷하게 음이 아닌 정수 $x, y$와 monge array $A, B$가 있을 때 $xA + yB$도 monge array입니다.

**3. 각 행마다 최소인 원소 중 가장 왼쪽에 있는 원소의 위치는 단조증가한다.**

$\displaystyle f(x) = \arg \min_{1≤j≤m}\{A[x, j]\}$일 때 1 이상 n미만인 i에 대해 $f(i) ≤ f(i+1)$이 성립한다.

**proof.** 귀류법을 사용해 증명할 수 있습니다. $f(i) > f(i+1)$인 $i$가 존재한다고 합시다.<br>
$i$행에서 가장 작은 원소 중 가장 왼쪽에 있는 원소는 $A[i, f(i)]$이고, $i+1$행에서 가장 작은 원소 중 가장 왼쪽에 있는 원소는 $A[i+1, f(i+1)]$입니다.<br>$A[i, f(i)] < A[i, f(i+1)]$이고, $A[i+1, f(i+1)] ≤ A[i+1, f(i)]$이기 때문에 $A[i, f(i)] + A[i+1, f(i+1)] < A[i, f(i+1)] + A[i+1, f(i)]$입니다.<br>이는 monge array의 정의와 모순이므로 항상 $f(i) ≤ f(i+1) $를 만족합니다.

### 참고
* [koosaga 블로그 - 동적 계획법을 최적화하는 9가지 방법 part.1](https://koosaga.com/242)
* [wikipedia - monge array](https://en.wikipedia.org/wiki/Monge_array)
