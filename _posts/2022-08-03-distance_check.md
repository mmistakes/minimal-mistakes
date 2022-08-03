---
layout: single
title:  "거리두기 확인하기"
categories: Programmers, Class2
tag: [bfs, dfs]
toc: true
author_profile: false
sidebar: 
nav: "docs"
---

# Programmers, 거리두기 확인하기

## 최초 접근법

바로 BFS를 떠올려서 접근하였다. 

파티션은 벽으로 생각하고, 테이블은 빈칸으로 생각한다. 

응시자 P에서 BFS를 시작하여 이동하고 거리가 2보다 커진다면 더이상 확인하지 않는다. 

한번이라도 거리두기가 지켜지지 않은것이 확인된다면 바로 0을 추가하고 break한다. 

## 최초 코드

```python
from collections import deque
from itertools import combinations


dx = [-1, 0, 1, 0]
dy = [0, -1, 0, 1]


def solution(places):
    answer = []

    for room in places:
        person = []
        visited = []
        q = deque()
        flag = 0
        for i in range(5): # 행
            for j in range(5): # 열
                if room[i][j] == 'P':
                    person.append((i, j))
        distance = list(combinations(person, 2))
        for a, b in distance:
            if (abs(a[0]-b[0]) + abs(a[1]-b[1])) <= 2:
                if a not in visited and b not in visited:
                    q.append((a, b))

        while q:
            a, b = q.popleft()
            check = []
            q_ = deque()
            q_.append((a[0], a[1], 0)) # 출발지점 a의 x, y 좌표
            check.append((a[0], a[1])) # 방문기록

            while q_:
                x, y, cnt = q_.popleft() # 출발지점부터 출발

                if cnt >= 2:
                    continue

                for d in range(4): # 상하좌우 탐색
                    nx, ny = x + dx[d], y + dy[d]
                    if 0 <= nx < 5 and 0 <= ny < 5 and (nx, ny) not in check: # 범위안에 있으면
                        if room[nx][ny] == 'P':
                            answer.append(0)
                            flag += 1
                            break
                        elif room[nx][ny] == 'O':
                            cnt += 1
                            q_.append((nx, ny, cnt))
                            check.append((nx, ny))
                        else:
                            continue
                if flag == 1:
                    break
            if flag == 1:
                flag -= 1
                break
        else:
            answer.append(1)

    return answer
```

- 조합과 BFS를 이용하여 접근하였다. 

1. 응시자들의 위치를 모두 확인하여 2개씩 조합을 만든다.

2. 만들어진 조합에서 맨하튼 거리가 2이하인 사람들의 좌표를 queue에 삽입한다. 

3. 삽입된 queue에서 BFS를 이용하여 벽 없이 빈칸만으로 갈 수 있다면 거리두기가 지켜지지 않은 것으로 0을 추가하고 break

위 코드는 어떤 이유에서인지 특정 테스트 케이스들을 통과하지 못하였다. 아쉽게도 아직 반례를 찾지는 못했다. 

## 수정된 코드

```python
from collections import deque

dx = [-1, 0, 1, 0]
dy = [0, -1, 0, 1]


def solution(places):
    answer = []

    for room in places:
        q = deque()
        flag = 0
        for i in range(5): # 행
            for j in range(5): # 열
                if room[i][j] == 'P':
                    q.append((i, j))
        while q:
            a, b = q.popleft()
            check = []
            q_ = deque()
            q_.append((a, b, 0)) # 출발지점 a의 x, y 좌표
            check.append((a, b)) # 방문기록

            while q_:
                x, y, cnt = q_.popleft() # 출발지점부터 출발

                if cnt >= 2:
                    continue
                for d in range(4): # 상하좌우 탐색
                    nx, ny = x + dx[d], y + dy[d]
                    if 0 <= nx < 5 and 0 <= ny < 5 and (nx, ny) not in check: # 범위안에 있으면
                        if room[nx][ny] == 'P': # a와 b가 만날 수 있다면
                            answer.append(0) # 정답에 0을 추가한다.
                            flag += 1
                            break
                        elif room[nx][ny] == 'O': # 만약 이동할 수 있는 칸이라면
                            q_.append((nx, ny, cnt+1)) # 이동
                            check.append((nx, ny)) # 방문 기록
                        else: # X가 나온다면 이동할 수 없으므로 pass한다.
                            continue
                if flag == 1:
                    break
            if flag == 1:
                flag -= 1
                break
        else:
            answer.append(1)

    return answer
```

## 설명

수정된 방법으로는  조합을 사용하지 않고 각 응시자들의 위치에서 바로 BFS를 이용하여 확인하였다. 

- 접근 방법은 동일하다

- 똑같이 벽과 빈칸을 고려하여 이동하고 거리를 확인한다. 

- 거리가 2보다 커진다면 pass

- 거리가 2이하인데 다른 응시자가 있다면 0을 추가한다. 

## 요점 및 배운점

- BFS를 이용한 간단한 문제인데 사소한 실수로 꽤나 시간이 걸렸다. 

- cnt 즉, 이동거리를 체크할 때 이중 while문을 사용하였으므로 cnt를 초기화해주던가 아니면 바로 queue에 삽입할때 1을 더해서 삽입하여야했다. 

```python
cnt += 1
q.append(cnt)
```

```python
q.append(cnt+1)
```

첫 번째 방법으로 이동거리를 계산하였을 때는 마지막 테스트케이스를 통과하지 못하였다. 

두번째 방법으로 수정 후 해결할 수 있었다. 

- 조합을 이용하여 풀었을 때 어떤 반례에 의해 통과하지 못했는지 아직 확인하지 못했다.
