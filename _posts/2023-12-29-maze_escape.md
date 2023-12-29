---
published: true
title: "[이코테] 미로 탈출 (Python)"

categories: CodingTest
tag: [codingtest]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

date: 2023-12-29
---
<br>
<br>

# 문제

N x M 크기의 직사각형 형태의 미로에 여러 마리의 괴물이 있어 이를 피해 탈출해야 한다. 현재 위치는 (1, 1)이고 미로의 출구는 (N,M)의 위치에 존재하며 한 번에 한 칸씩 이동할 수 있다. 괴물이 있는 부분은 0으로, 괴물이 없는 부분은 1로 표시되어 있다. 미로는 반드시 탈출할 수 있는 형태로 제시된다. 탈출하기 위해 움직여야 하는 최소 칸의 개수를 구하라. 칸을 셀 때는 시작 칸과 마지막 칸을 모두 포함해서 계산한다.

## Input / Output

**입력**

첫째 줄에 두 정수 N, M(4 <= N, M <= 200)이 주어진다. 

다음 N개의 줄에는 각각 M개의 정수(0혹은 1)로 미로의 정보가 주어진다. 

각각의 수들은 공백 없이붙어서 입력으로 제시된다. 또한 시작 칸과 마지막 칸은 항상 1이다.

**출력**

첫째 줄에 최소 이동 칸의 개수를 출력한다.

<br>

**입력 예시**

```html
5 6
101010
111111
000001
111111
111111
```

**출력 예시**
```html
10
```

<br>

# 풀이

BFS는 시작 지점에서 가까운 노드부터 차례대로 그래프의 모든 노드를 탐색하기 때문에 이 문제 해결에 적합한 알고리즘이다.

상하좌우로 연결된 모든 노드로의 거리가 1로 동일하고 따라서 (1, 1) 지점부터 BFS를 수행하여 모든 노드의 최단 거리 값을 기록하면 해결할 수 있다.

(1, 1) 위치에서 시작해 인접한 노드 중 값이 1인 노드로만 이동이 가능하다고 판단하여 큐에 원소를 넣어 방문 처리한다.

상하좌우로 탐색을 진행하면서 방문한 노드의 값 1씩 증가시킨다. 

매번 새로운 지점을 방문할 때 그 이전지점까지의 최단거리에 1을 더한 값을 기록할 수 있도록 하는 것이다.

## Code

```python
import sys
from collections import deque
input = sys.stdin.readline

def bfs(x, y):
    queue = deque()
    queue.append((x, y))

    while queue:
        x, y = queue.popleft()

        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]

            if nx < 0 or nx >= n or ny < 0 or ny >= m:
                continue

            if graph[nx][ny] == 0:
                continue

            if graph[nx][ny] == 1:
                graph[nx][ny] = graph[x][y] + 1
                queue.append((nx, ny))
    # 가장 오른쪽 아래까지의 최단거리 반환
    return graph[n-1][m-1]
s
n, m = map(int, input().strip().split())

graph = []
for i in range(n):
    graph.append(list(map(int, input().strip())))

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

print(bfs(0, 0))

```
