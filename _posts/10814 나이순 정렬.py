# import sys
# from collections import deque

# N = int(sys.stdin.readline())

# deq = deque()

# for i in range(N):
#     deq.append(list(sys.stdin.readline().split()))
    
#     for j in range(0, i):
#         if int(deq[i][0]) < int(deq[j][0]):
#             deq.appendleft(deq[i])
#             deq.pop()
#             break


# for j in range(N):
#     print(deq[j][0], deq[j][1])

import sys

N = int(sys.stdin.readline())

status = []

for i in range(N):
    age, name = sys.stdin.readline().split()
    age = int(age)
    status.append((age, name))
    
status.sort(key = lambda x : x[0])

for j in range(N):
    print(status[j][0], status[j][1])
    
print(status)