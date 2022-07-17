import sys
import itertools

N, M = map(int, sys.stdin.readline().split())

graph = []

for i in range(N):
    graph.append(list(map(int, sys.stdin.readline().split())))

graph_home = [[0]]
graph_chicken = [[0]]


for i in range(N):
    for j in range(N):
        if graph[i][j] == 1:
            graph_home.append((i, j))
        elif graph[i][j] == 2:
            graph_chicken.append((i, j))
            
           
distance_chicken = [[0] * len(graph_home) for _ in range(len(graph_chicken))] 

for i in range(1, len(graph_chicken)):
    for j in range(1, len(graph_home)):
        distance_chicken[i][j] = abs(graph_chicken[i][0] - graph_home[j][0]) + abs(graph_chicken[i][1] - graph_home[j][1])

min_compare = 10 ** 9      

comb_list = list(itertools.combinations(range(1, len(graph_chicken)), M))
min_sum = [0] * len(comb_list)
for k in range(1, len(graph_home)):
    for i in range(len(comb_list)):
        for j in comb_list[i]:
            if min_compare > distance_chicken[j][k]:
                min_compare = distance_chicken[j][k]
        min_sum[i] += min_compare
        min_compare = 10 ** 9
        
min_sum.sort()
print(min_sum[0])

