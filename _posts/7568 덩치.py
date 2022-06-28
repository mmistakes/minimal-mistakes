import sys

N = int(sys.stdin.readline())

body_list = []
body_rank = []

for i in range(N):
    body_list = list(map(int, list(sys.stdin.readline().split())))
    body_list.append(1)
    body_rank.append(body_list)
    for j in range(0, i):
        if body_rank[i][0] > body_rank[j][0] and body_rank[i][1] > body_rank[j][1]:
            body_rank[j][2] += 1
        elif body_rank[i][0] < body_rank[j][0] and body_rank[i][1] < body_rank[j][1]:
            body_rank[i][2] += 1
            
for k in range(N):
    print(body_rank[k][2], end=' ')
    
