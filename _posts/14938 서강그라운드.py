import sys

n, m, r = map(int, sys.stdin.readline().split())

INF = float('inf')

item_list = list(map(int, sys.stdin.readline().split()))


graph = [[INF] * (n + 1) for _ in range(n + 1)]

for k in range(r):
    a, b, c = map(int, sys.stdin.readline().split()) 
    graph[a][b] = c
    graph[b][a] = c

for i in range(1, n + 1):
    for j in range(1, n + 1):
        if i == j:
            graph[i][j] = 0
            
for k in range(1, n + 1):
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            graph[i][j] = min(graph[i][j], graph[i][k] + graph[k][j])
max_sum = 0           
for i in range(1, n + 1):
    sum = 0
    for j in range(1, n + 1):
        if graph[i][j] == float('inf'):
            continue
        if graph[i][j] <= r:
            sum += item_list[j - 1]
    max_sum = max(max_sum, sum)

print(max_sum)