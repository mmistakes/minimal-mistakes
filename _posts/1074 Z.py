import sys

N, r, c = map(int, sys.stdin.readline().split())

def rec(r, c):
    if r == 0 and c == 0:
        return 0
    a = r % 2
    b = c % 2
    r = r // 2
    c = c // 2
    return rec(r, c)*4 + 2*a + b

print(rec(r, c))