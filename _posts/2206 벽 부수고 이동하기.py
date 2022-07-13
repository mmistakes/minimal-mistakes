import sys
from collections import deque

N, M = map(int, sys.stdin.readline().split())

graph = [[0 for _ in range(M)] for _ in range(N)]

queue = deque()
queue.append([0, 0, 0])

for i in range(N):
    graph[i] = list(map(int, sys.stdin.readline().rstrip()))

visited = [[[0] * 2 for _ in range(M)] for _ in range(N)]
visited[0][0][0] = 1
visited[0][0][1] = 1

dx = [-1, 0, 1, 0]
dy = [0, -1, 0, 1]

def bfs():
    while queue:
        x, y, broken = queue.popleft()
        if x == N - 1 and y == M - 1:
            return visited[x][y][broken]
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            if nx >= 0 and nx < N and ny >= 0 and ny < M:
                if graph[nx][ny] == 1 and broken == 0:
                    visited[nx][ny][1] = visited[x][y][0] + 1
                    queue.append([nx, ny, 1])
                elif graph[nx][ny] == 0 and visited[nx][ny][broken] == 0:
                    visited[nx][ny][broken] = visited[x][y][broken] + 1
                    queue.append([nx, ny, broken])
    return -1
        
non_broken = False
broken = False

print(bfs())
