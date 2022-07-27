---
layout: single
title:  "특정한 최단 경로"
categories: BOJ, Class4
tag: [그래프 이론, 다익스트라]
toc: true
author_profile: false
sidebar: 
    nav: "docs"
---

# 1504, 특정한 최단 경로

## 최초 접근법

1. a에서 b로 가는 최단 경로를 2차원 graph에 저장한다. 

2. v1을 먼저 경유하는 경우와 v2를 먼저 경유하는 경우를 비교하여 최솟값을 출력한다. 

최단 경로를 구하는 알고리즘으로는 처음에는 가장 편하게 사용할 수 있는 플로이드 워셜 알고리즘을 사용해보았지만 시간초과가 발생하였다. 

플로이드 워셜 알고리즘은 기본적으로 3중 for문을 사용하므로 이에 해당하는 시간복잡도를 가진다. 

따라서 다익스트라 알고리즘으로 접근하였다. 

- 플로이드 워셜 --> O(n^3)
- 다익스트라 --> O(nlogn)

## 코드

```python
import sys
from math import inf
import heapq


n, e = map(int, sys.stdin.readline().split())

graph = [[] for _ in range(n+1)]

for _ in range(e):
    a, b, c = map(int, sys.stdin.readline().split())
    graph[a].append((c, b)) # a에서 b로 가는데 c만큼 걸린다.
    graph[b].append((c, a))

v1, v2 = map(int, sys.stdin.readline().split())


def dijkstra(start):
    q = []
    distance = [inf] * (n+1) # 최단거리를 갱신해나갈 리스트
    distance[start] = 0
    heapq.heappush(q, (0, start)) # 거리를 가장 우선적으로 heap 정렬하기 위해 거리정보를 튜플의 첫번째 인자로 받는다.

    while q:
        d, temp = heapq.heappop(q) # 가장 우선적으로 가까운 지점과 거리를 pop한다.

        if distance[temp] < d: # 만약 거쳐갈 지점까지의 거리가 기존의 거리보다 멀면 continue
            continue
        for i in graph[temp]: # 거쳐갈 지점까지의 거리가 기존의 거리보다 가깝다면
            dist = d + i[0] # 거쳐가는만큼 거리를 더해준다.
            if dist < distance[i[1]]: # 만약 거쳐지나가는 거리의 합이 기존의 해당 지점까지의 거리보다 가깝다면
                distance[i[1]] = dist # 갱신해준다.
                heapq.heappush(q, (dist, i[1])) # 거쳐가는 지점과 거리를 다시 우선순위 큐에 삽입

    return distance


path_1 = dijkstra(1)
path_v1 = dijkstra(v1)
path_v2 = dijkstra(v2)

ans_1 = path_1[v1] + path_v1[v2] + path_v2[n]
ans_2 = path_1[v2] + path_v2[v1] + path_v1[n]

if ans_1 >= inf and ans_2 >= inf:
    print(-1)
else:
    print(min(ans_1, ans_2))
```

## 설명

다익스트라 알고리즘을 이용하여 각각 출발지점에서 모든 정점까지의 최단 경로를 저장한다. 

1. 1번에서 출발하였을 때 최단경로
2. v1에서 출발하였을 때 최단경로
3. v2에서 출발하였을 때 최단경로

4. 1 --> v1 --> v2 --> n과 1 --> v2 --> v1 --> n을 비교
5. 더 가까운 경우의 거리를 출력한다. 

다익스트라 알고리즘의 구현방법을 알고있다면 쉽게 해결할 수 있는 문제였다. 나는 다익스트라 알고리즘에 익숙하지 않아 꽤나 해매었다. 

## 다익스트라 알고리즘

다익스트라 알고리즘은 한 정점에서 다른 모든 정점으로의 최단 경로를 구하는 알고리즘으로 우선순위 큐를 사용한다. 즉, heapq를 사용한다. 

이 알고리즘의 코드구현의 경우 플로이드 워셜 알고리즘처럼 어느정도 외워두면 편하게 사용할 수 있다. 

다른 정점까지 갈 때, 또 다른 한 개 이상의 정점을 거쳐가는 경우 더 가깝다면 더 가까운 경우로 1차원 배열에 갱신해주는 알고리즘이다. 

- 우선 우선순위 큐를 만들 queue와 거리 정보를 저장할 1차원 배열 list가 필요하다. 

1. 최초 출발지점과 거리0을 heapq에 삽입한다. 
   - 여기서 주의할 점은 거리를 우선으로 heap정렬하기 위해 (거리, 정점)으로 삽입해준다. 
2. while문을 이용하여 반복한다. 
3. 거리와 현재의 정점을 heappop으로 입력받는다. 

- 만약 출발 지점 --> 거쳐가는 지점

  이 거리가 목적지까지의 거리보다 멀다면 확인할 필요 없다. 

- 출발지점 --> 거쳐가는 지점 --> 도착지점

  이 거리가 바로가는 경우보다 더 가깝다면 갱신해준다. 
