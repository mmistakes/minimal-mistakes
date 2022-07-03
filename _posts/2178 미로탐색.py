import sys

N, M = map(int, sys.stdin.readline().split())

maze = []

for i in range(N):
    maze.append(list(sys.stdin.readline().rstrip()))
    
print(maze)