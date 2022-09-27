---
layout: single
title:  "코딩 테스트 책 - 4차시"
categories : coding-test
tag : [이것이 취업을 위한 코딩 테스트다, python, 나동빈]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=코딩 테스트 책 - 4차시&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

&nbsp;

## DFS

- 깊이 우선 탐색, 그래프에서 깊은 부분을 우선적으로 탐색하는 알고리즘
  - `인접 행렬` : 2차원 배열로 그래프의 연결 관계를 표현하는 방식
  - `인접 리스트` : 리스트로 그래프의 연결 관계를 표현하는 방식

- O(N) 시간복잡도




**ex) 인접 행렬 방식 예제**

```python
INF = 999999999999999 # 무한

# 2차원 리스트 이용해 인접 행렬 표현
graph = [
    [0, 7, 5],
    [7, 0, INF],
    [5, INF, 0]
]

print(graph)
>> [[0,7,5], [7,0,INF], [5, INF, 0]]
```

**ex) 인접 리스트 방식 예제**

```python
# row 3개 인 2차원 인접리스트
g = [[] for _ in range(3)]

# 노드 0에 연결된 노드 정보 저장
g[0].append((1, 7))
g[0].append((2, 5))

# 노드 1에 연결된 노드 정보 저장
g[1].append((0,7))

# 노드 2에 연결된 노드 정보 저장
g[2].append((0,5))

print(g)
```

> 메모리 속도 측면에서 인접 행렬은 모든 방식과 관계를 저장, 인접 리스트는 특정한 두 노드가 연결되어 있는지에 대한 정보를 얻는 속도가 느림

&nbsp;

**DFS 스택 자료구조를 이용하며 구체적인 동작 과정**

1. 탐색 시작 노드를 스택에 삽입하고 방문 처리를 수행
2. 스택의 최상단 노드에 방문하지 않은 인접 노드가 없으면 스택에서 최상단 노드를 꺼냄
3. 2번의 과정을 더 이상 수행할 수 없을 때까지 반복

> `방문 처리` 는 스택에 한 번 삽입되어 처리된 노드가 다시 삽입되지 않게 체크하는 것, 각 노드를 한 번씩만 처리할 수 있음

![image-20220927185959085](/images/2022-09-27-coding_test4/image-20220927185959085.png)

`*방문 순서*` : 1 -> 2 -> 7 -> 6 -> 8 -> 3 -> 4 -> 5 



```python
# DFS 메서드 정의

def dfs(graph, v, visited):
    # 방문 처리
    visited[v] = True
    print(v, end=' ')

    # 현재 노드와 연결된 다른 노드를 재귀적으로 방문
    for i in graph[v]:
        if not visited[i]:
            dfs(graph, i, visited)


# 2차원 노드 연결 리스트
graph = [
    [],
    [2, 3, 8],
    [1, 7],
    [1, 4, 5],
    [3, 5],
    [3, 4],
    [7],
    [2, 6, 8],
    [1, 7]
]

# 각 노드 방문 기록
visited = [False] * 9

# run
dfs(graph, 1, visited)
>> 1 2 7 6 8 3 4 5 
```

&nbsp;



## BFS

- `너비우선탐색`, 가까운 노드부터 탐색하는 알고리즘

- O(N) 시간복잡도, 일반적으로 DFS보다 좋음

**BFS 구체적인 동작 과정**

1.  탐색 시작 노드를 큐에 삽입하고 방문처리
2.  큐에서 노드를 꺼내 해당 노드의 인접 노드 중에서 방문하지 않은 노드를 모두 큐에 삽입하고 방문 처리를 함
3.  2번 과정을 더 이상 수행할 수 없을 때까지 반복



![image-20220927192135034](/images/2022-09-27-coding_test4/image-20220927192135034.png)

`*방문 순서*` : 1 -> 2 -> 3 -> 8 -> 7 -> 4 -> 5 -> 6 



```python
from collections import deque

# BFS 메서드 정의
def bfs(graph, start, visited):
  # 큐 구현 deque로
  queue = deque([start])
  # 방문처리
  visited[start] = True
  # 큐가 빌때까지 반복
  while queue:
    # 큐 원소 out
    v = queue.popleft()
    print(v, end=' ')
    # 해당 원소와 연결된, 아직 방문하지 않은 원소들을 큐에 삽입
    for i in graph[v]:
      if not visited[i]:
        queue.append(i)
        visited[i] = True

# 각 노드가 연결된 정보를 표현 (2차원 리스트)
graph = [
    [],
    [2, 3, 8],
    [1, 7],
    [1, 4, 5],
    [3, 5],
    [3, 4],
    [7],
    [2, 6, 8],
    [1, 7]
]

# 각 노드가 방문된 정보를 표현 (1차원 리스트)
visited = [False] * 9

# 정의된 BFS 함수 호출
bfs(graph, 1, visited)
```

&nbsp;



## DFS / BFS

- **DFS**
  - 동작 : 스택, 구현방법 : 재귀 함수

- **BFS**
  - 동작 : 큐, 구현방법 : 큐 자료구조 이용


&nbsp;

