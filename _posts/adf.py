import sys

graph = [[[0 for _ in range(5)] for _ in range(4)]]

graph.append(graph[0])
print(graph[1][0][0])