import sys
from collections import deque

N, M = map(int, sys.stdin.readline().split())

graph = []
queue = deque()


for i in range(N):
    graph.append(list(map(int, sys.stdin.readline().rstrip())))
       
dx = [-1, 0, 0, 1]
dy = [0, -1, 1, 0]

queue.append([0, 0])

while queue:
    x, y = queue.popleft()
    for i in range(4):
        nx = x + dx[i]
        ny = y + dy[i]
        if nx >= 0 and ny >= 0 and nx <= N - 1 and ny <= M - 1:
            if graph[nx][ny] != 0 and graph[nx][ny] == 1:
                graph[nx][ny] += graph[x][y]
                queue.append([nx, ny])
                
            
print(graph[N - 1][M - 1])