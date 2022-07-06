---
layout: single
title:  "절댓값 힙"
categories: Class3
tag: [자료 구조, 우선순위 큐]
toc: true
author_profile: false
sidebar: 
    nav: "docs"
---

# 11286, 절댓값 힙

## 최초 접근법

heapq 모듈을 사용할 때, max_heap의 경우 -를 붙여 넣어준다. 

때문에 하나의 heap에 입력 값을 모두 넣은 다음 출력하는 방법은 불가능하다 생각했다. 

min_heap과 max_heap 두개를 만들어 최솟값을 비교하여 같은 경우 max_heap에서 출력하는 식으로 구상하였다. 

![KakaoTalk_20220706_222142613](../../images/2022-07-06-absolute_heap/KakaoTalk_20220706_222142613.jpg)

```python
import sys
import heapq


n = int(sys.stdin.readline())
min_heap = []
max_heap = []

for _ in range(n):
    x = int(sys.stdin.readline())
    if x > 0:
        heapq.heappush(min_heap, x)
    elif x < 0:
        heapq.heappush(max_heap, -x)
    elif x == 0:
        if len(min_heap) == 0 and len(max_heap) == 0: # 둘 다 비어있는 경우
            print(0)
        elif len(min_heap) > 0 and len(max_heap) == 0: # max_heap이 비어있는 경우
            print(heapq.heappop(min_heap))
        elif len(min_heap) == 0 and len(max_heap) > 0: # min_heap이 비어있는 경우
            print(-heapq.heappop(max_heap))
        elif len(min_heap) > 0 and len(max_heap) > 0: # 둘다 비어있지 않은 경우
            a, b = min_heap[0], max_heap[0] # 두 heap의 최솟값을 받아온다.
            if a > b: # max_heap의 절댓값이 더 작은 경우
                print(-heapq.heappop(max_heap))
            elif a < b: # min_heap의 절댓값이 더 작은 경우
                print(heapq.heappop(min_heap))
            elif a == b: # 두 값의 절댓값이 같은 경우
                print(-heapq.heappop(max_heap))
```

## 설명

풀이 방식은 위의 이미지와 동일하다. 

- 양수인 경우 min heap, 음수인 경우 max heap에 추가한다.
- 둘 중 하나라도 heap이 비어있다면 비어있지 않은 heap에서 출력한다. 
- 둘 다 비어있지 않다면 각각 최솟값을 비교하여 출력해준다. 
- 둘 다 비어있다면 0을 출력한다.  

이 문제는 input()을 이용하여 입력을 받으면 시간초과가 발생한다. 때문에 sys.stdin.readline()을 이용하여 입력을 받아야한다. 

## 요점 및 배운점

최소 힙, 최대 힙에 이어 절댓값 힙을 사용할 수 있게 되었다. 
