import sys

N = int(sys.stdin.readline())

M = int(sys.stdin.readline())

visited = [False] * (N + 1)

graph = [[] for _ in range(N + 1)]

for i in range(M):
    a, b = map(int, sys.stdin.readline().split())
    graph[a].append(b)
    graph[b].append(a)
    
    
count = 0

def dfs(graph, visited, v):
    visited[v] = True
    
    for i in graph[v]:
        if not visited[i]:
            dfs(graph, visited, i)
 
dfs(graph,visited, 1)  
        
count = 0          
for i in visited:
    if i == True:
        count += 1
print(count - 1)