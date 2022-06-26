import sys

M, N = map(int, sys.stdin.readline().split())

def gcd(M, N):
    if M % N == 0:
        return N
    else:
        return gcd(N, M % N)

def result(M, N, gcd):
    sum = 1
    sum *= M // gcd
    sum *= N // gcd
    sum *= gcd
    return sum

        
res_gcd = gcd(M, N)
res = result(M, N, res_gcd)
print(res_gcd)
print(res)


