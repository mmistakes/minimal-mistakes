---
layout: single
title: "[Python/파이썬][Greedy/그리디] 백준 2839번 - 설탕 배달"
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
상근이는 요즘 설탕공장에서 설탕을 배달하고 있다. 상근이는 지금 사탕가게에 설탕을 정확하게 $N$킬로그램을 배달해야 한다. 설탕공장에서 만드는 설탕은 봉지에 담겨져 있다. 봉지는 3킬로그램 봉지와 5킬로그램 봉지가 있다.

상근이는 귀찮기 때문에, 최대한 적은 봉지를 들고 가려고 한다. 예를 들어, 18킬로그램 설탕을 배달해야 할 때, 3킬로그램 봉지 6개를 가져가도 되지만, 5킬로그램 3개와 3킬로그램 1개를 배달하면, 더 적은 개수의 봉지를 배달할 수 있다.

상근이가 설탕을 정확하게 $N$킬로그램 배달해야 할 때, 봉지 몇 개를 가져가면 되는지 그 수를 구하는 프로그램을 작성하시오.

## 입력
첫째 줄에 $N$이 주어진다. ($3 ≤ N ≤ 5000$)

## 출력
상근이가 배달하는 봉지의 최소 개수를 출력한다. 만약, 정확하게 $N$킬로그램을 만들 수 없다면 -1을 출력한다.

## 풀이
- `min_bags` 계산해서 출력
	- 조합 가능한 경우가 없는 경우, -1 출력을 위한 장치로 처음 변수 선언 시 `min_bags`에 무한대 할당
	
- 5kg 봉지를 최대한 많이 활용하면서, 3kg 봉지를 최대한 적게 이용하는 알고리즘
	- $N$이 5로 나눠 떨어지면, 문제없이 5kg 봉지만 적용하는 것이 최적
	- $N$이 5로 나눠 떨어지지 않으면, 5kg 봉지의 갯수를 0부터 `N//5` 까지 순차적으로 돌며 최솟값 찾음
		- 5kg 봉지를 적용한 이후, 나머지를 3kg 봉지로 나눠떨어지게 담을 수 있어야 
		  **"정확한 N킬로그램"** 가능
		- "정확한 N킬로그램"을 맞출 수 없는 경우, **min_bags는 그대로 inf 값으로 유지**되어 -1 출력

## 코드
```
n = int(input())
min_bags = float('inf') # 조합 가능한 경우가 없는 경우, -1 출력을 위한 장치


if n % 5 == 0:
	min_bags = n // 5 # 5로 나눠 떨어지면, 문제없이 5Kg 봉지만 사용
else:
	for five_bags in range(0, n//5+1): 
		remain = n - five_bags * 5

		if remain >= 0 and remain % 3 == 0:
			three_bags = remain // 3
			min_bags = min(min_bags, five_bags + three_bags)

print(min_bags if min_bags != float('inf') else -1)
```



