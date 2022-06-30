import sys
from collections import deque

N, K = map(int, sys.stdin.readline().split())

# queue = [False] * (N + 1)

# sum = K
# count = 0
# final_cnt = 0

# print("<", end = "")
# print(sum, end = ", ")
# queue[sum] = True

# while True:
#     sum += 1
#     if sum > 7:
#         sum -= 7
#     if queue[sum] == False:
#         count += 1
#         if count == K:
#             final_cnt += 1
#             if final_cnt == N - 1:
#                 print(sum, end = ">")
#                 break
#             else:
#                 print(sum, end = ", ")
#                 count = 0
#                 queue[sum] = True      

queue = deque()

for i in range(N):
    queue.append(i + 1)
    
print("<", end = "")

while queue:
    for i in range(K):
        a = queue.popleft()
        queue.append(a)
    res = queue.pop()
    if queue:
        print(res, end = ", ")
    else:
        print(res, end = "")
        
print(">")
            
            