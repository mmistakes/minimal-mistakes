import sys

T = int(sys.stdin.readline())

d = [[0, 0] for _ in range(41)] 

d[0][0] = 1
d[0][1] = 0
d[1][0] = 0
d[1][1] = 1

def dp(x):
    if x == 0 or x == 1 or d[x][0] != 0:
        return d[x]
    else:
        a = dp(x - 1)
        #d[x] = [a[1], a[0] + a[1]]
        d[x][0] = a[1]
        d[x][1] = a[0] + a[1]
    return d[x]

for i in range(T):
    a = int(sys.stdin.readline())
    dp(a)
    print(d[a][0], d[a][1])

# fibo_zero = [1, 0]
# fibo_one = [0, 1]

# for i in range(T):
#     a = int(sys.stdin.readline())
#     if a == 0:
#         print("1 0")
#         continue
#     elif a == 1:
#         print("0 1")
#         continue
#     else:
#         for i in range(len(fibo_zero), a + 1):
#             fibo_zero.append(fibo_one[i - 1])
#             fibo_one.append(fibo_zero[i - 1] + fibo_one[i - 1])
#     print(fibo_zero[a], fibo_one[a])
    