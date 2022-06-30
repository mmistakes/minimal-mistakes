import sys

N = int(sys.stdin.readline())

pos = []

for i in range(N):
    a = list(map(int, sys.stdin.readline().split()))
    a[0], a[1] = a[1], a[0]
    pos.append(a)
    
pos.sort(key = lambda x: x[0:])

for i, j in pos:
    print(j, i)