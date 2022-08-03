##########################################################
# 플로이드 워셜 풀이

# import sys

# N = int(sys.stdin.readline())

# INF = 10 ** 9

# graph = [[INF] * (N + 1) for _ in range(N + 1)]


# for i in range(1, N + 1):
#     for j in range(1, N + 1):
#         if i == j:
#             graph[i][j] = 0

# for i in range(N - 1):
#     a, b, c = map(int, sys.stdin.readline().split())
#     graph[a][b] = c
#     graph[b][a] = c

# for k in range(1, N + 1):
#     for i in range(1, N + 1):
#         for j in range(1, N + 1):
#             graph[i][j] = min(graph[i][j], graph[i][k] + graph[k][j])
# print(graph)
# max_list = []
# max_val = 0

# for i in range(1, N + 1):
#     for j in graph[i]:
#         if j == INF:
#             continue
#         else:
#             if max_val < j:
#                 max_val = j
#     max_list.append(max_val)
#     max_val = 0

# print(max(max_list))

##########################################################
# DFS 풀이

# import sys
# sys.setrecursionlimit(10**6)

# N = int(sys.stdin.readline())

# graph = [[] for _ in range(N + 1)]

# for i in range(1, N):
#     a, b, c = map(int, sys.stdin.readline().split())
#     graph[a].append([b, c])
#     graph[b].append([a, c])

# distance = [-1] * (N + 1)
# distance[1] = 0

# def dfs(start, dis):
#     for i in range(len(graph[start])):
#         next, next_dis = graph[start][i]
#         if distance[next] == -1:
#             distance[next] = next_dis + dis
#             dfs(next, distance[next])

# dfs(1, 0)

# max_index = distance.index(max(distance))

# distance = [-1] * (N + 1)
# distance[max_index] = 0
# dfs(max_index, 0)

# print(max(distance))

##########################################################
# 다익스트라 풀이

import sys
import heapq

INF = int(1e9)

N = int(sys.stdin.readline())


graph = [[] for i in range(N + 1)]

visited = [False] * (N + 1)

distance = [INF] * (N + 1)

for _ in range(N - 1):
    a, b, c = map(int, sys.stdin.readline().split())
    graph[a].append((b, c))
    graph[b].append((a, c))

def dijkstra(start):
    q = []
    heapq.heappush(q, (0, start))
    distance[start] = 0
    while q:
        dist, now = heapq.heappop(q)

        if distance[now] < dist:
            continue
        for i in graph[now]:
            cost = dist + i[1]
            if cost < distance[i[0]]:
                distance[i[0]] = cost
                heapq.heappush(q, (cost, i[0]))

dijkstra(1)

distance[0] = -1
new_start = distance.index(max(distance))

distance = [INF] * (N + 1)
visited = [False] * (N + 1)

dijkstra(new_start)

distance[0] = -1
print(max(distance))
