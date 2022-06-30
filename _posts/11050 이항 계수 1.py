import sys
import itertools


N, K = map(int, sys.stdin.readline().split())

# 날먹

# res = len(list(itertools.combinations(range(1, N + 1), K)))

# print(res)

# dp

dp = [[0] * 11 for _ in range(11)]

for i in range(N):
    for j in range(i + 1):
        if i == j:
            dp[i][j] = 1
            
        elif j == 0:
            dp[i][j] = i + 1
            
        else:
            dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
            
print(dp[N - 1][K - 1])