---
title: "Monotone Queue Optimization"
date: 2020-05-01 00:07:00
categories:
- Hard-Algorithm
tags:
- Monotone-Queue
---

### 서론
Monotone Queue Optimization은 점화식이 아래 조건을 만족할 때 사용할 수 있습니다.
* 점화식 꼴 : $\displaystyle D(i) = \min_{1 ≤ j < i}\{D(j) + C(j, i)\}$
* 조건 : $i < j$인 임의의 $i, j$에 대해 다음을 만족하는 지점 $cross(i, j)$가 존재
  * $cross(i, j) > k$이면 $D(i) + C(i, k) < D(j) + C(j, k)$
  * $cross(i, j) ≤ k$이면 $D(i) + C(i, k) > D(j) + C(j, k)$

$D(1 \dots N)$을 Naive하게 계산하면 $O(N^2)$이 걸리지만 Monotone Queue Optimization을 사용하면 $O(N \log N)$에 계산할 수 있습니다.<br>
$cross(i, j)$는 이분탐색을 이용해 $O(\log N)$에 구할 수 있습니다.

### 설명
$C(j, i)$가 $A(i) \times B(j)$라면 $D(j) + C(j, i)$가 직선 형태이기 때문에 CHT 문제로 바꿀 수 있습니다.<br>
$D(j) + C(j, i)$는 직선은 아니지만, cross를 <b>교점</b>이라고 생각해주면 교점이 정확히 한 개 존재하는 직선과 비슷한 함수로 생각할 수 있습니다.<Br>
더 나아가서, $i < j$일 때 $cross(i, j) ≤ k$이면 항상 $D(j) + C(j, k)$가 이득이므로 기울기와 y절편에 단조성이 있는 CHT와 비슷하게 생각해줄 수 있습니다.

CHT에서 사용하는 방식을 가져와서 여기에 적용해봅시다.<br>
큐 $Q$에는 앞으로 계산할 점화식에서 답이 될 수 있는 후보들을 차례대로 저장할 것입니다. 다시 말해 $\displaystyle D(i) = \min\{D(j) + C(j, i)\}$를 계산해야 하는 상황이라면, $Q$에는 $D(i \dots n)$이 답이 될 수 있는 $j$들을 순서대로 저장할 것입니다.<br>
답이 될 수 있는 $j$를 저장한다는 것은 $Q$의 모든 원소들을 $cross(Q_i, Q_{i+1}) < cross(Q_{i+1}, Q_{i+2})$가 만족하도록, 그리고 $cross(Q_0, Q_1) ≥ i$를 만족하도록 유지하는 것을 의미합니다.<br>
이런식으로 $Q$를 관리해주면 $D(i)$를 구하는 것은 $D(Q_0) + C(Q_0, i)$를 구하는 것으로 해결할 수 있습니다.

$cross(Q_0, Q_1) ≥ i$를 만족하도록 유지하는 것은 $Q$에서 적당히 pop해주는 것으로 쉽게 구현할 수 있습니다. 원소를 $Q$에 삽입할 때 $cross(Q_i, Q_{i+1}) < cross(Q_{i+1}, Q_{i+2})$를 유지시키는 것이 관건입니다.

$Q$의 맨 뒤에 push할 때 부등식이 성립을 안 하는 곳은 $Q$의 맨 뒤 밖에 없기 때문에, CHT와 비슷하게 조건을 만족할 때까지 $Q$의 맨 뒤에 있는 원소를 제거해주면 됩니다.

### 시간복잡도
각 원소는 $Q$에 한 번 들어가고 최대 한 번 빠져나옵니다. 이 과정에서 $cross(i, j)$를 $O(N)$번 호출하기 때문에 $cross(i, j)$를 구하는 시간인 $O(\log N)$을 곱한 $O(N \log N)$이 걸립니다.

### 사각 부등식
$C[i, j]$가 monge array면 monotone queue optimization을 사용할 수 있습니다.

$i < j < k$인 $i,j,k$에 대해 아래 명제는 참입니다.
1. $D(i) + C[i, k+1] ≤ D(j) + C[j, k+1]$이면 $D(i) + C[i, k] ≤ D(j) + C[j, k]$
> $D(i) - D(j) ≤ C[j, k+1] - C[i, k+1] ≤ C[j, k] - C[i, k]$임. (사각 부등식의 정의에 의해 $C[i, k] + C[j, k+1] ≤ C[i, k+1] + C[j, k], C[j, k+1] - C[i, k+1] ≤ C[j, k] - C[i, k]$)

2. $D(i) + C[i, k] ≥ D(j) + C[j, k]$이면 $D(i) + C[i, k+1] ≥ D(j) + C[j, k+1]$
> 1과 비슷하게 $D(j) - D(i)$로 식을 정리하면 증명 가능

### 다른 DP 최적화와의 호환성
##### 기울기와 y절편에 단조성이 있는 CHT
$C[i, j] = A(i) \times B(j)$(직선)이고, $A(i) ≥ A(i+1), B(i) ≤ B(i+1)$이면 $C$는 monge array입니다. 그러므로 기울기와 y절편에 단조성이 있는 CHT는 monotone queue optimization으로 해결할 수 있습니다.

##### Divide and Conquer Optimization
$D(i), D(j)$를 $D(t-1, i), D(t-1, j)$로 바꿔주면 Divide and Conquer Optimization 점화식 꼴이 됩니다. 그러므로 Divide and Conquer Optimization은 monotone queue optimization으로 풀 수 있습니다.

##### Li-Chao Tree
리차오 트리는 보통 CHT 문제를 풀 때 많이 사용하지만, 사실 직선이 아니더라도 교점이 하나만 존재하면 리차오 트리를 이용해 최소/최댓값을 구할 수 있습니다. 그러므로 monotone queue optimization 대신 Li-Chao Tree를 사용해도 됩니다.

### 참고
* [koosaga 블로그 - 동적 계획법을 최적화하는 9가지 방법 part.1](https://koosaga.com/242)
* [SNUPC 2019 풀이 - Div1D. 꽃집 부분](https://snups.snucse.org/snupc2019/slide.pdf)
