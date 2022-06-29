from queue import Queue
import sys
from collections import deque

N = int(sys.stdin.readline())
queue = deque()


for i in range(N):
    input_str = sys.stdin.readline().rstrip()
    
    if input_str[:4] == "push":
        a = input_str[5:]
        queue.append(a)

    elif input_str == "pop":
        if queue:
            print(queue[0])
            queue.popleft()
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