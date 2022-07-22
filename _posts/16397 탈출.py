import sys
from collections import deque

N, T, G = map(int, sys.stdin.readline().split())

queue = deque()
queue.append((N, 0))
visit = [0] * 100000

if N == G:
    print("0")
    exit()

def bfs():
    N_A = 0
    N_B = 0
    while queue:
        flag = 0
        N, count = queue.popleft()
        if count == T:
            continue
        N_A = N + 1
        if N_A == G:
            print(count + 1)
            flag = 1
            break
        if N_A < 100000 and visit[N_A] == 0:
            visit[N_A] = 1
            queue.append((N_A, count + 1))
        if N != 0:
            N_B = N * 2
            if N_B > 99999:
                continue
            else:
                list_N_B = list(str(N_B))
                c = int(list_N_B[0])
                c -= 1
                list_N_B[0] = str(c)
                a = 0
                for i in range(len(list_N_B)):
                    a += int(list_N_B[i]) * (10 ** (len(list_N_B) - 1 - i))
                # a = str(N_B)
                # a = str(int(a[0]) - 1) + a[1:]
                if int(a) == G:
                    print(count + 1)
                    flag = 1
                    break
                if visit[int(a)] == 0:
                    queue.append((int(a), count + 1))
                    visit[int(a)] = 1
    if flag == 0:
        print("ANG")
                           
bfs()        
