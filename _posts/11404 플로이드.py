import sys

n = int(sys.stdin.readline())
m = int(sys.stdin.readline())

INF = 10**9

graph = [[INF] * (n + 1) for _ in range(n + 1)]

for i in range(1, n + 1):
    for j in range(1, n + 1):
        if i == j:
            graph[i][j] = 0
            
for i in range(m):
    a, b, c = map(int, sys.stdin.readline().split())
    if graph[a][b] > c:
        graph[a][b] = c

for k in range(1, n + 1):
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            graph[i][j] = min(graph[i][j], graph[i][k] + graph[k][j])

for i in range(1, n + 1):
    for j in range(1, n + 1):
        if graph[i][j] == INF:
            graph[i][j] = 0
        print(graph[i][j], end = " ")
    print()