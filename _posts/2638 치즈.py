import sys
from collections import deque

N, M = map(int, sys.stdin.readline().split())

graph = [[0] * M for _ in range(N)]
visited = [[0] * M for _ in range(N)]

for i in range(N):
    graph[i] = list(map(int, sys.stdin.readline().split()))

queue = deque()

queue.append([0, 0])
visited[0][0] = 0

dx = [-1, 0, 1, 0]
dy = [0, -1, 0, 1]

def bfs():
    while queue:
        x, y = queue.popleft()
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            if nx >= 0 and nx < N and ny >= 0 and ny < M:
                if graph[nx][ny] >= 1 and visited[x][y] <=1:
                    graph[nx][ny] += 1
                elif visited[nx][ny] == 0 and graph[nx][ny] == 0:
                    queue.append([nx, ny])
                    visited[nx][ny] += 1  
        visited[x][y] += 1

count = 0
exit_check = 0
            
while True:
    bfs()            
    for i in range(N):
        for j in range(M):
            visited[i][j] = 0
            if graph[i][j] >= 3:
                graph[i][j] = 0
                exit_check = 1
                queue.append([i, j])
            elif graph[i][j] == 2:
                graph[i][j] = 1
    if exit_check == 1:
        count += 1
    else:
        print(count)
        break
    exit_check = 0
    
