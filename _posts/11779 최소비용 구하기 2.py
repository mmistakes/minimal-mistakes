import sys
import heapq

n = int(sys.stdin.readline())
m = int(sys.stdin.readline())

graph = [[] for _ in range(n + 1)]

INF = 10 ** 9

distance = [INF] * (n + 1)
distance_root = [[] for i in range(n + 1)]

for i in range(m):
    a, b, c = map(int, sys.stdin.readline().split())
    graph[a].append((b, c))
    
start, end = map(int, sys.stdin.readline().split())

def dijkstra(start, end):
    q = []
    heapq.heappush(q, (0, start))
    distance[start] = 0
    distance_root[start].append(start)

    while q:
        dist, now = heapq.heappop(q)
        
        if distance[now] < dist:
            continue
        
        for i in graph[now]:
            cost = dist + i[1]
            if cost < distance[i[0]]:
                distance[i[0]] = cost
                
                distance_root[i[0]] = []
                for j in distance_root[now]:
                    distance_root[i[0]].append(j)
                distance_root[i[0]].append(i[0])
                heapq.heappush(q, (cost, i[0]))

dijkstra(start, end)

print(distance[end])
print(len(distance_root[end]))
for i in distance_root[end]:
    print(i, end = " ")
