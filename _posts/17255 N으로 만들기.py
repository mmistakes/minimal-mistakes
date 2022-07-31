import sys

N = sys.stdin.readline().rstrip()

ans = []
sum = [0]
for _ in range(len(N)):
    sum[0] = sum[0] * 2 + 1
print(sum[0])

def dfs(left, right, string):
    if len(string) == sum[0]:
        ans.append(string)
    if left > 0:
        dfs(left - 1, right, string + N[left - 1] + string)
    if right < len(N) - 1:
        dfs(left, right + 1, string + string + N[right + 1])
        
for i in range(len(N)):
    dfs(i, i, N[i])
print((set(ans)))

# 1 10 101 = 101 -> 1 110 110101 -> 1 110 1101101 
# 0 10 101 = 011
# 1 01 101 = 101

# 0 01 101
# 1 10 101
# 0 10 101
# 1 01 101

# 911

# 9 91 911
# 1 91 911
# 1 11 911
