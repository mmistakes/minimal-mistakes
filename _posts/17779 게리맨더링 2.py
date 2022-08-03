import sys

N = int(sys.stdin.readline())

graph = [[0] for _ in range(N + 1)]
visit = [[0] * (N + 1) for _ in range(N + 1)]

for i in range(1, N + 1):
    graph[i] = [0] + list(map(int, sys.stdin.readline().split()))


sum_list = [0] * 5
min_list = []


for d1 in range(1, N):
    for d2 in range(1, N):
        for x in range(1, N - d1 - d2 + 1):
            for y in range(1 + d1, N - d2 + 1):
                for i in range(d1 + 1):
                    if visit[x + i][y - i] == 0:
                        sum_list[4] += graph[x + i][y - i]
                        visit[x + i][y - i] = 1
                    if visit[x + d2 + i][y + d2 - i] == 0:
                        sum_list[4] += graph[x + d2 + i][y + d2 - i]
                        visit[x + d2 + i][y + d2 - i] = 1
                for j in range(d2 + 1):
                    if visit[x + j][y + j] == 0:
                        sum_list[4] += graph[x + j][y + j]
                        visit[x + j][y + j] = 1
                    if visit[x + d1 + j][y - d1 + j] == 0:
                        sum_list[4] += graph[x + d1 + j][y - d1 + j]
                        visit[x + d1 + j][y - d1 + j] = 1
                flag_i = 0
                for i in range(N + 1):
                    flag_j = 0
                    if visit[i].count(1) == 2:
                        for j in range(N + 1):
                            if visit[i][j] == 1:
                                flag_j += 1
                            elif flag_j == 1:
                                sum_list[4] += graph[i][j]
                                visit[i][j] = 1
                            elif flag_j == 2:
                                break
                    elif visit[i].count(1) == 1:
                        flag_i += 1
                        if flag_i == 2:
                            break
                for i in range(1, N + 1):
                    for j in range(1, N + 1):
                        if visit[i][j] == 0:
                            if 1 <= i < x + d1 and 1 <= j <= y:
                                sum_list[0] += graph[i][j]
                                visit[i][j] = 1
                            elif 1 <= i <= x + d2 and y < j <= N:
                                sum_list[1] += graph[i][j]
                                visit[i][j] = 1
                            elif x + d1 <= i <= N and 1 <= j < y - d1 + d2:
                                sum_list[2] += graph[i][j]
                                visit[i][j] = 1
                            else:
                                sum_list[3] += graph[i][j]
                                visit[i][j] = 1
                min_list.append(max(sum_list) - min(sum_list))
                sum_list = [0] * 5
                visit = [[0] * (N + 1) for _ in range(N + 1)]
print(min(min_list))
                