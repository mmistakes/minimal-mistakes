---
layout: single
title:  "벽 부수고 이동하기"
categories: BOJ, Class4
tag: [그래프 이론, 그래프 탐색, bfs]
toc: true
author_profile: false
sidebar: 
    nav: "docs"
---

# 2206, 벽 부수고 이동하기

## 최초 접근법

최단경로 문제여서 우선 바로 bfs를 떠올렸다.

**이 문제의 특징은 벽을 딱 한번 부술 수 있다는 것이다.** 

난 2개의 함수를 만들어 ''벽을 부수는 경우 vs 벽을 부수지 않는 경우''를 비교하여 더 작은  값을 출력하는 방법으로 접근하였다. 

또, 입력이 정수로 주어졌기 때문에 판 자체를 수정해가면서 1씩 더해주는 방법을 택하였다. 

벽을 부수는 경우의 함수를 구현하기가 어려웠다....

1. 벽을 딱 1개만 부술 수 있다. 

2. 만약 벽을 부숴도 이동할 수 없다면? 

   --> 굳이 확인해볼 필요가 없다. 

하지만, 2중 for문을 돌면서 벽을 확인하고 부술지의 여부를 체크한 다음 최단 경로를 확인해보는 코드는 매우 비효율적이고 구현하기도 어려웠다. 

<span style="color:red">

*나의 최초 접근법의 한계는 2차원 배열에만 머물러 있었다는 것이다.* 

</span>

이 문제를 해결하기 위해서는 벽을 부쉈는지의 유무를 3차원 배열로 표시하여 접근하여야 한다. 

## 코드

```python
import sys
from collections import deque


n, m = map(int, sys.stdin.readline().split())
pan = [list(map(int, sys.stdin.readline().strip())) for _ in range(n)]

q = deque()
visited = [[[0, 0] for _ in range(m)] for _ in range(n)]

dx = [-1, 0, 1, 0]
dy = [0, -1, 0, 1]


def bfs(): # 벽을 부수지 않는 경우
    q.append((0, 0, 0))
    visited[0][0][0] = 1

    while q:
        x, y, wall = q.popleft()

        if x == n-1 and y == m-1: # 목적지에 도달한 경우
            return visited[x][y][wall] # 시작점이 0이므로 1을 더해서 반환해준다.

        for i in range(4):
            nx, ny = x + dx[i], y + dy[i]
            # 범위 내에 있고 아직 방문한 적 없다면
            if 0 <= nx < n and 0 <= ny < m and visited[nx][ny][wall] == 0:
                if pan[nx][ny] == 0:
                    visited[nx][ny][wall] = visited[x][y][wall] + 1
                    q.append((nx, ny, wall))

                elif wall == 0 and pan[nx][ny] == 1:
                    visited[nx][ny][wall+1] = visited[x][y][wall] + 1
                    q.append((nx, ny, wall+1))

    return -1


print(bfs())
```



## 설명

이 문제의 핵심은 3차원 배열을 사용하는 것이다. 

또, pan을 업데이트해가면서 직접 이동하면 시간초과가 발생한다. 

visited를 3차원 배열로 만들어 각각 벽을 부순 경우와 부수지 않은 경우 2가지로 나눠 업데이트를 한다. 

1. 상하좌우 탐색 후 만약 범위 내에 있으며, 아직 방문한적 없다면 skip한다. **방문 여부를 체크하지 않으면 메모리초과가 발생한다.** 
2. 만약 이동할 수 있는 칸이라면 그냥 이동한다. 
3. 만약 아직 벽을 부순적이 없고 벽을 만났다면 
   - 벽을 부쉈다는 체크를 해준 후 이동한다. 
   - 여기서 체크란 해당 인덱스의 두번째 원소를 말한다.

4. 만약 최종 목적지에 도착하면 visited에서 정답을 출력한다. 

5. 만약 while문에서 목적지에 도착하지 못하고 끝난다면 -1을 반환한다. 



## 요점 및 배운점

- 단순 최단경로를 구하는 문제에서 벽을 부술 수 있다는 조건이 새로 추가된 문제이다. 
- 3차원 배열을 사용해야 풀 수 있는 문제이다. 이런 문제의 case는 처음 접해봤다. 좋은 공부였다. 
- 또, if문 조건에 visited를 검사해야만 통과할 수 있다. 조건문의 활용으로 시간 및 메모리 효율이 크게 갈린다는 것을 다시 한번 느꼈다. 
