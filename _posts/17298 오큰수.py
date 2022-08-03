import sys

N = int(sys.stdin.readline())

NEG = list(map(int, sys.stdin.readline().split()))

stack = []

ans = [-1] * N

for i in range(N):
    while stack and (stack[-1][0] < NEG[i]):
        val, index = stack.pop()
        ans[index] = NEG[i]
    stack.append((NEG[i], i))

print(*ans)

# index 함수는 시간 복잡도가 O(n)이다.