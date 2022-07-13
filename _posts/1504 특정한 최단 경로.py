import sys

N, E = map(int, sys.stdin.readline().split())

graph = [[] for _ in range(N + 1)]
visit = [False] * (N + 1) 
dis_list = []

for i in range(E):
    a, b, c = map(int, sys.stdin.readline().split())
    graph[a].append([b, c])
    graph[b].append([a, c])

v1, v2 = map(int, sys.stdin.readline().split())

for i in range(N + 1):
    graph[i].sort()

def dfs(v, distance, sum_dis, v1, v2):
    sum_dis += distance
    for i in range(len(graph[v])):
        if visit[graph[v][i][0]] == True:
            continue
        else:
            visit[graph[v][i][0]] = True
            if graph[v][i][0] == N:
                if visit[v1] == True and visit[v2] == True:
                    dis_list.append(sum_dis + graph[v][i][1])
                visit[v] = False
                visit[N] = False
                return 
            else:
                dfs(graph[v][i][0], graph[v][i][1], sum_dis, v1, v2)
    if visit[1] == False:
        return
visit[1] = True
dfs(1, 0, 0, v1, v2)
#print(dis_list)
dis_list.sort()
if len(dis_list) == 0:
    print(-1)
else: 
    print(dis_list[0])