import sys

N, M, B = map(int, sys.stdin.readline().split())

graph = []

for i in range(N):
    graph.append(list(map(int, sys.stdin.readline().split())))

time_cnt = 0

ans = sys.maxsize
height = 0

for i in range(257):
    max_tg = 0
    min_tg = 0
    for j in range(N):
        for k in range(M):
            # 깎기
            if graph[j][k] >= i:
                max_tg += graph[j][k] - i
                
            # 붙이기   
            else:
                min_tg += graph[j][k]
                
        
    if B + max_tg >= min_tg:
        time_cnt = max_tg * 2 + min_tg
        if ans > time_cnt:
            ans = time_cnt
            height = i
        
    time_cnt = 0
           
print(ans, height)
