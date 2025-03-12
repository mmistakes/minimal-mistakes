---
layout: single
title: "[Python/파이썬][Greedy/그리디] 백준 1026번 - 보물"
categories:
  - python_algorithm_study
tags:
  - python
  - 백준
  - solved
  - 그리디
  - greedy
author_profile: false
use_math: true
---
## 문제
옛날 옛적에 수학이 항상 큰 골칫거리였던 나라가 있었다. 이 나라의 국왕 김지민은 다음과 같은 문제를 내고 큰 상금을 걸었다.

길이가 $N$인 정수 배열 $A$와 $B$가 있다. 다음과 같이 함수 $S$를 정의하자.

$S = A[0] × B[0] + ... + A[N-1] × B[N-1]$

$S$의 값을 가장 작게 만들기 위해 $A$의 수를 재배열하자. 단, $B$에 있는 수는 재배열하면 안 된다.

$S$의 최솟값을 출력하는 프로그램을 작성하시오.

## 입력
첫째 줄에 $N$이 주어진다. 둘째 줄에는 $A$에 있는 $N$개의 수가 순서대로 주어지고, 셋째 줄에는 $B$에 있는 수가 순서대로 주어진다. $N$은 50보다 작거나 같은 자연수이고, $A$와 $B$의 각 원소는 100보다 작거나 같은 음이 아닌 정수이다.

## 출력
첫째 줄에 $S$의 최솟값을 출력한다.

## 풀이
- 이 문제는 "가중평균의 최솟값" 개념으로 접근하였다.
	- 가중평균이 최소가 되기 위해서는, **각 리스트의 최댓값과 최솟값을 곱해**주어야 한다.
	- A와 B를 각각 반대로 정렬(하나는 오름차순으로, 하나는 내림차순으로)한 후, 곱해주면 된다.

- 사실 이 문제는 B의 위치는 재배열 하면 안된다는 조건이 있지만, 위와 같이 풀어도 정답이다.

- 제대로 풀기 위해, 추가적으로 **B를 재배열 하면 안된다는 조건**을 지키며 풀어보았다.
	- B의 최댓값을 하나씩 불러내어
	- A를 오름차순으로 정렬시킨 후, 하나씩 불러낸 B의 최댓값과 곱해줌
	- 곱한 값을 결과로 할당


## 코드
B를 재배열 시킨 풀이(문제 조건 X)

```
n = int(input())
a_list = list(map(int, input().split()))
b_list = list(map(int, input().split()))

a_list_rev = sorted(a_list, reverse=True)
b_list_sort = sorted(b_list)

total = 0
for i in range(n):
	total += a_list_rev[i] * b_list_sort[i]

print(total)
```

B를 재배열 시키지 않은 풀이(문제 조건 O)

```
n = int(input())
a_list = list(map(int, input().split()))
b_list = list(map(int, input().split()))

a_list.sort()
total = 0
for i in range(n):
    b_value_max = max(b_list)
    total += a_list[i] * b_value_max
    b_list.remove(b_value_max)
    
print(total)
```