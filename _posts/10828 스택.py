import sys

N = int(sys.stdin.readline())
stk = []

for i in range(N):
    input_str = sys.stdin.readline().rstrip()
    
    if input_str[:4] == "push":
        a = input_str[5:]
        stk.append(a)

    elif input_str == "top":
        if stk:
            print(stk[-1])
        else:
            print(-1)
            
    elif input_str == "pop":
        if stk:
            print(stk[-1])
            stk.pop()
        else:
            print(-1)
            
    elif input_str == "size":
        print(len(stk))
    
    else:
        if stk:
            print(0)
        else:
            print(1)
        