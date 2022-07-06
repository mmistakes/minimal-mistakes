import sys
from collections import deque

N = int(sys.stdin.readline())

graph = []

for i in range(N):
    graph.append(list(map(int, sys.stdin.readline().rstrip())))

res = []

def bfs(graph, x, y, res):
    queue = deque()
    dx = [-1, 0, 1, 0]
    dy = [0, -1, 0, 1]
    
    queue.append([x, y])
    res_cnt = 1
    graph[x][y] = 2
    
    while queue:
        x, y = queue.popleft()
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            
            if nx >= 0 and nx < N and ny >= 0 and ny < N:
                if graph[nx][ny] == 1:
                    queue.append([nx, ny])
                    graph[nx][ny] = 2
                    res_cnt += 1
    res.append(res_cnt)
    
for i in range(N):
    for j in range(N):
        if graph[i][j] == 1:
            bfs(graph, i, j, res)
res.sort()
print(len(res))
for i in res:
    print(i)

# queue = deque()
# dx = [-1, 0, 1, 0]
# dy = [0, -1, 0, 1]
# queue.append([0,0])
# res_cnt = 0
# tot_cnt = 0
# brk = False
# res = []

# if graph[0][0] == 1:
#     res_cnt += 1

# while True:
#     while queue:
#         x, y = queue.popleft()
#         for i in range(4):
#             nx = x + dx[i]
#             ny = y + dy[i]
            
#             if nx >= 0 and nx < N and ny >= 0 and ny < N:
#                 if graph[ny][nx] == 1:
#                     queue.append([nx, ny])
#                     graph[ny][nx] = 2
#                     res_cnt += 1
#     res.append(res_cnt)
#     res_cnt = 0
#     tot_cnt += 1
#     for i in range(N):
#         for j in range(N):
#             if graph[i][j] == 1:
#                 queue.append([j, i])
#                 brk = True
#                 break
#         if brk == True:
#             brk = False
#             break
#         if i == N - 1:
#             brk = True
    
#     if brk == True:
#         print(tot_cnt)
#         break
                
# res.sort(reverse = False)

# for i in res:
#     print(i)
            
    