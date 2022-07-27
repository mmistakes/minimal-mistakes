---
layout: single
title:  "치킨 배달"
categories: BOJ, Class4
tag: [구헌, 브루트포스, 백트래킹]
toc: true
author_profile: false
sidebar: 
    nav: "docs"
---

# 15686, 치킨 배달

## 최초 접근법

1. 각 집에서 치킨거리와 선택된 치킨 집을 구한다. 
2. 선택된 치킨집들의 선택 횟수대로 정렬한다. 
   - 폐업 순위를 결정할 수 있음
3. m개만 남기고 다 폐업시킨다.
4. 남은 치킨집들로 치킨거리를 계산한다. 
   - 1에서 선택된 치킨집 == 남은 치킨집 이라면 이미 구해놓았으므로 다시 계산할 필요가 없다. 
   - 하지만 1에서 선택되지 않은 치킨집이 남았다면 다시 계산해준다.
5. 정답을 출력한다. 

![KakaoTalk_20220717_114608880](../../images/2022-07-17-Chicken_delivery/KakaoTalk_20220717_114608880.jpg)

하지만, 이 방법은 생각대로 구현하기가 의외로 쉽지 않았다. 결국 해결하지 못하였다. 

## 수정된 접근법

수정된 접근법은 생각보다 매우 간단하였다. 다만, combination 라이브러리를 사용할 줄 알아야한다. 

combination을 사용하면 중복없이 x개를 선택하는 조합을 만들어준다. 

이를 이용하여 m개의 치킨집을 선택하는 모든 경우의 수를 list로 만들어 각각의 집까지 가장 가까운 치킨집과의 치킨거리를 더해준다. 

위의 과정으로 구한 도시의 치킨거리의 경우의 수들 중 최솟값을 출력한다. 

## 코드

```python
import sys
from itertools import combinations

n, m = map(int, input().split())
pan = [list(map(int, sys.stdin.readline().split())) for _ in range(n)]

house = []
chicken = []

# 집과 치킨집 좌표를 각각 저장한다.
for i in range(n):
    for j in range(n):
        if pan[i][j] == 1:
            house.append((i, j))
        elif pan[i][j] == 2:
            chicken.append((i, j))

# 중복 없이 m개의 치킨집을 고르는 경우의 수
chicken_select = list(combinations(chicken, m))
ans = 999999

for c in chicken_select:  # m개 선택된 치킨집의 모든 경우의 수
    distance = 0 # 거리 초기화
    for h in house:  # 집의 좌표가 튜플로 반환
        select = [] # 선택된 치킨집들과 집까지의 치킨거리를 저장해줄 리스트
        for i in range(m): # 각 경우의 수마다 선택된 치킨집들을 모두 탐색
            select.append((abs((h[0]-c[i][0])) + abs((h[1]-c[i][1])))) # 치킨거리를 추가
        distance += min(select) # 해당 집의 치킨거리중 최솟값을 더해줌
    if distance < ans: # 모든 경우의 수에 따른 도시의 치킨거리중 최솟값을 선택
        ans = distance

print(ans)
```

## 요점 및 배운점

- 경우의 수를 구해야할 때는 permutation 또는 combination을 사용할 수 있는 능력을 가지자
- 너무 어렵게 접근하였다. 처음에는 DP문제라고 생각하였다. 하지만, 의외로 쉽게 경우의 수들 마다 치킨거리의 최솟값을 더해주어 구하면 간단하게 풀 수 있는 문제였다. 
