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


# 나는 1 4 5가 출력이 되어서 34 번째 줄 cost < distance[i[0]]를 
# <이 아닌 <= 으로 바꿔서 1 3 5 로 출력하게끔 하였다. 그렇게 되면 
# 같은 cost를 가지고 있더라도 업데이트가 계속 되는데 그러면 시간초과가 뜸
# 스페셜 저지라고 붙어있는데 답이 여러 개 일수도 있다는 뜻임
# 그렇다면 1 3 5로 나와도 정답이고 1 4 5 로 나와도 최단 경로이기 때문에 
# 정답이 됨. 근데 억지로 1 3 5를 만들려고 같은 cost도 루프에 참여하게끔
# 한다면 쓸데없는 경로 계산을 하기 때문에 시간초과가 뜸