import sys
from collections import deque

N = int(sys.stdin.readline())
queue = deque()

for i in range(N):
    input_str = sys.stdin.readline().rstrip()
    
    if input_str[:10] == "push_front":
        a = input_str[11:]
        queue.appendleft(a)
        
    elif input_str[:9] == "push_back":
        a = input_str[10:]
        queue.append(a)

    elif input_str == "pop_front":
        if queue:
            print(queue[0])
            queue.popleft()
        else:
            print(-1)
            
    elif input_str == "pop_back":
        if queue:
            print(queue[-1])
            queue.pop()
        else:
            print(-1)        
            
    elif input_str == "front":
        if queue:
            print(queue[0])
        else:
            print(-1)
            
    elif input_str == "back":
        if queue:
            print(queue[-1])
        else:
            print(-1)        
            
    elif input_str == "size":
        print(len(queue))
    
    else:
        if queue:
            print(0)
        else:
            print(1)