import sys

N = int(sys.stdin.readline())

pos = []

for i in range(N):
    pos.append(list(map(int, sys.stdin.readline().split())))
    
pos.sort(key = lambda x: x[0:])

for i, j in pos:
    print(i, j)