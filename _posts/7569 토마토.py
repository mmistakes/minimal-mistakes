import queue
import sys
from collections import deque

N, M, H = map(int, sys.stdin.readline().split())

graph = []
queue = deque()
dx = [-1, 0, 0, 1]
dy = [0, -1, 1, 0]


for i in range(M * H):
    graph.append(list(map(int, sys.stdin.readline().split())))
    
for i in range(M * H):
    for j in range(N):
        if graph[i][j] == 1:
            queue.append([i, j])

def bfs():
    while queue:
        x, y = queue.popleft()
        z = x % M
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            if nx >= 0 and nx < M * H and ny >= 0 and ny < N:
                if nx >= (x - z) and nx < (x - z + M):
                    if graph[nx][ny] == 0:
                        graph[nx][ny] += graph[x][y] + 1
                        queue.append([nx, ny])
        if x // M < 1:
            if x + M < M * H:
                if graph[x + M][y] == 0:
                    graph[x + M][y] += graph[x][y] + 1
                    queue.append([x + M, y])
        elif x // M == H - 1:
            if x - M >= 0:
                if graph[x - M][y] == 0:
                    graph[x - M][y] += graph[x][y] + 1
                    queue.append([x - M, y])
        else:
            if x + M < M * H:
                if graph[x + M][y] == 0:
                    graph[x + M][y] += graph[x][y] + 1
                    queue.append([x + M, y])
            if x - M >= 0:
                if graph[x - M][y] == 0:
                    graph[x - M][y] += graph[x][y] + 1
                    queue.append([x - M, y])
                
bfs()              
ans = 0
for i in range(M * H):
    for j in range(N):
        if graph[i][j] == 0:
            print("-1")
            exit()
        else:
            if ans < graph[i][j]:
                ans = graph[i][j]

if ans == 1:
    print("0")
else:
    print(ans - 1)
