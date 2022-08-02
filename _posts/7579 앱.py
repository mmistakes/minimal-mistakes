import sys

N, M = map(int, sys.stdin.readline().split())

m = list(map(int, sys.stdin.readline().split()))
c = list(map(int, sys.stdin.readline().split()))
# 30바이트 3
# 10바이트 0
# 20바이트 3
# 35바이트 5
# 40바이트 4

# 최대 비용은 15이다.
#   00 01 02 03 04 05 06 07 08 09  10  11  12  13  14  15
# 0 00 00 00 00 00 00 00 00 00 00  00  00  00  00  00  00
# 1 00 00 00 30 30 30 30 30 30 30  30  30  30  30  30  30
# 2 10 10 10 40 40 40 40 40 40 40  40  40  40  40  40  40
# 3 10 10 10 40 40 40 60 60 60 60  60  60  60  60  60  60
# 4 10 10 10 40 40 45 60 60 75 75  75  95  95  95  95  95
# 5 10 10 10 40 50 50 60 80 80 85 100 100 115 115 115 135

# 비용이 1개씩 증가하면서 메모리가 최대치로 나오게 설정을 해야 한다.
# 왜냐하면 비용이 하나씩 증가할때 메모리가 최대로 증가해서 최대한 빨리 60이라는 숫자를
# 넘어야 최소의 비용을 쓰면서 메모리 공간을 확보하는 것이기 때문이다

# 점화식
# dp[i][j] = max(dp[i - 1][j - cost[i]] + memory[i], dp[i - 1][j])

max_cost = sum(c)
min_cost = 10 ** 9

dp = [[0] * (max_cost + 1) for _ in range(N + 1)]

for i in range(1, N):
    for j in range(max_cost + 1):
        if j < c[i - 1]:
            dp[i][j] = dp[i - 1][j]
        else:
            dp[i][j] = max(dp[i - 1][j - c[i - 1]] + m[i - 1], dp[i - 1][j])
        if dp[i][j] >= M:
            if min_cost > j:
                min_cost = j

print(min_cost)






