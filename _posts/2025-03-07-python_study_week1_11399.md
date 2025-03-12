---
layout: single
title: "[Python/파이썬][Greedy/그리디] 백준 11399번 - ATM"
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
인하은행에는 ATM이 1대밖에 없다. 지금 이 ATM앞에 N명의 사람들이 줄을 서있다. 사람은 1번부터 N번까지 번호가 매겨져 있으며, i번 사람이 돈을 인출하는데 걸리는 시간은 Pi분이다.

사람들이 줄을 서는 순서에 따라서, 돈을 인출하는데 필요한 시간의 합이 달라지게 된다. 예를 들어, 총 5명이 있고, $P_1 = 3, P_2 = 1, P_3 = 4, P_4 = 3, P_5 = 2$ 인 경우를 생각해보자. $[1, 2, 3, 4, 5]$ 순서로 줄을 선다면, 1번 사람은 3분만에 돈을 뽑을 수 있다. 2번 사람은 1번 사람이 돈을 뽑을 때 까지 기다려야 하기 때문에, $3+1 = 4$분이 걸리게 된다. 3번 사람은 1번, 2번 사람이 돈을 뽑을 때까지 기다려야 하기 때문에, 총 $3+1+4 = 8$분이 필요하게 된다. 4번 사람은 $3+1+4+3 = 11$분, 5번 사람은 $3+1+4+3+2 = 13$분이 걸리게 된다. 이 경우에 각 사람이 돈을 인출하는데 필요한 시간의 합은 $3+4+8+11+13 = 39$분이 된다.

줄을 $[2, 5, 1, 4, 3]$ 순서로 줄을 서면, 2번 사람은 1분만에, 5번 사람은 $1+2 = 3$분, 1번 사람은 $1+2+3 = 6$분, 4번 사람은 $1+2+3+3 = 9$분, 3번 사람은 $1+2+3+3+4 = 13$분이 걸리게 된다. 각 사람이 돈을 인출하는데 필요한 시간의 합은 $1+3+6+9+13 = 32$분이다. 이 방법보다 더 필요한 시간의 합을 최소로 만들 수는 없다.

줄을 서 있는 사람의 수 $N$과 각 사람이 돈을 인출하는데 걸리는 시간 $Pi$가 주어졌을 때, 각 사람이 돈을 인출하는데 필요한 시간의 합의 최솟값을 구하는 프로그램을 작성하시오.

## 입력
첫째 줄에 사람의 수 $N$($1 ≤ N ≤ 1,000$)이 주어진다. 둘째 줄에는 각 사람이 돈을 인출하는데 걸리는 시간 $P_i$가 주어진다. ($1 ≤ P_i ≤ 1,000$)

## 출력
첫째 줄에 각 사람이 돈을 인출하는데 필요한 시간의 합의 최솟값을 출력한다.

## 풀이
- 우선, 런타임 에러때문에 여러가지 코드 단축 시도를 한 문제이다

- 적용해본 알고리즘 2가지
	- 먼저, `sorted_time` 리스트에 입력받은 $P_i$를 오름차순으로 정렬해준 이후
		1. `sorted_time`의 0번 원소는 n번 등장, 1번 원소는 $n-1$번 등장, 2번 원소는 $n-2$번 등장...의 식으로 모두 더함
		2. 이중 반복문을 적용하여, 1번 사람~n번 사람까지 걸리는 시간을 각각 계산해서 더함

1번 방법
```
n = int(input())
sorted_time = sorted(list(map(int, input().split())))
min_total = 0

for i in range(n):
	min_total += sorted_time[i] * (n - i)

print(min_total)
```
  

2번 방법
```
n = int(input())
sorted_time = sorted(list(map(int, input().split())))
min_total = 0

for i in range(n):
	current_sum = sum(sorted_time[j] for j in range(i+1))
	min_total += current_sum

print(min_total)
```

- 위와 같이 적용하여 제출하니, 계속 런타임 에러가 발생하여 아래와 같은 시도를 해봄
	- 이중 반복문 단축(2번 알고리즘)
	- 입력받는 $P_i$ 를 처음부터 리스트로 입력 받음


- 위 시도에 대한 결과
	- 이중 반복문은 유지하여도, 런타임 에러 발생 여부에는 영향을 미치지 않았음
	- 가장 큰 차이: $P_1, P_2, P_3, P_4, P_5$ 를 입력받는 과정에서, **숫자 5개를 따로 입력 받지 않고 처음부터 list**로 받아줌
	
	- 결과: 이중 반복문은 런타임 에러 발생에 영향을 미치지 않았고, $P_i$ 입력을 리스트로 받아주니 문제가 해결됨

## 코드
풀이 1
```
n = int(input())
sorted_time = sorted(list(map(int, input().split())))
min_total = 0

for i in range(n):
	min_total += sorted_time[i] * (n - i)

print(min_total)
```



풀이 2
```
n = int(input())
sorted_time = sorted(list(map(int, input().split())))
min_total = 0

for i in range(n):
	current_sum = sum(sorted_time[j] for j in range(i+1))
	min_total += current_sum

print(min_total)
```
