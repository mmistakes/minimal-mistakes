import sys

K = int(sys.stdin.readline())

stk = []

for i in range(K):
    int_input = int(sys.stdin.readline())
    if int_input == 0:
        stk.pop()
    else:
        stk.append(int_input)
        
print(sum(stk))