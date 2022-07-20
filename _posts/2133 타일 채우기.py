import sys

N = int(sys.stdin.readline())

dp = [0] * (N + 1)

if N % 2 != 0:
    print("0")
else:
    dp[0] = 1
    dp[2] = 3
    for i in range(4, N + 1, 2):
        dp[i] = dp[i - 2] * 3 + sum(dp[2:(i - 2)]) * 2 + 2
    print(dp[N])    
