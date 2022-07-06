import sys
from collections import deque

N = int(sys.stdin.readline())

graph = [[]for _ in range(N)]
queue = deque()

for i in range(N):
    a = list(map(int, sys.stdin.readline().split()))
    for j in range(N):
        if a[j] == 1:
            graph[i].append(j)  
               
def bfs(v):
    queue.append(v)
    visit = [0] * N
    while queue:
        a = queue.popleft()
        for i in graph[a]:
            if visit[i] == 0:
                visit[i] = 1
                queue.append(i)
    for i in visit:
        print(i, end = " ")

for i in range(N):
    bfs(i)
    print()

    