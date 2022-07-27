---
layout: single
title:  "최대 힙"
categories: BOJ, Class3
tag: [자료 구조, 우선순위 큐]
toc: true
author_profile: false
sidebar: 
    nav: "docs"
---

# 11279, 최대 힙

## 최초 접근법

아주 간단한 문제이다. heapq 모듈을 사용할 줄 알고 있다면 쉽게 풀 수 있다. 

heapq 모듈은 기본적으로 min-heap을 제공한다. 하지만 원소를 반대로 -를 붙여주면 max-heap이 되는 것이다. 

## 코드

```python
import sys
import heapq

n = int(sys.stdin.readline())
a = []
heapq.heapify(a)
for i in range(n):
    num = int(sys.stdin.readline())
    if num == 0:
        if len(a) == 0:
            print(0)
        else:
            print(-heapq.heappop(a))
    else:
        heapq.heappush(a, -num)
```

## 설명

설명은 최초 접근법과 동일하다. 

다만, 이 문제는 입력은 input()으로 받으면 시간초과가 발생한다. 따라서 조금 더 속도가 빠른 sys.stdin.readline()으로 입력받는다. 

## 요점 및 배운점

- heapq  모듈의 사용법을 다시 상기할 수 있었다. 
