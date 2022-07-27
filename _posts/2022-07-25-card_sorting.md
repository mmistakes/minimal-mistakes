---
layout: single
title:  "카드 정렬하기"
categories: BOJ, Class4
tag: [자료 구조, 그리디 알고리즘, 우선순위 큐]
toc: true
author_profile: false
sidebar: 
nav: "docs"
---

# 1715, 카드 정렬하기

## 최초 접근법

이 문제는 그냥 단순하게 연산만 신경쓰면 쉽게 풀리는 문제였다. 

비교할 두 카드뭉치, 비교횟수를 계속 더해주면 된다. 

다만 주의할점은 더한 카드뭉치를 다시 heap에 넣어주어야한다. 

```python
import sys
import heapq

n = int(sys.stdin.readline())
card = []

for _ in range(n):
    card.append(int(sys.stdin.readline()))

heapq.heapify(card)

ans = 0 # 비교횟수

while len(card) != 1: # 마지막 카드뭉치 1개만 남을때까지 반복한다.
    x = heapq.heappop(card) # 비교할 카드뭉치 1
    y = heapq.heappop(card) # 비교할 카드뭉치 2
    ans += (x + y) # 두개의 카드뭉치 비교 횟수를 더해준다.
    heapq.heappush(card, x + y) # 카드뭉치 업데이트
print(ans)
```

## 설명

최초 접근법과 동일하다. 

## 요점 및 배운점

- 카드 뭉치가 최종적으로 한개만 남을 때까지 반복한다. 
- 합친 카드뭉치를 새로 heap에 넣어주어야한다. 

위 두가지가 이 문제의 핵심이다. 이것만 알면 너무 쉽게 풀 수 있었다. 
