# import sys

# N, M = map(int, sys.stdin.readline().split())

# num_list = list(map(int, list(sys.stdin.readline().split())))

# res = 0
# sum_res = 0
# for i in range(N-2):
#     for j in range(i+1, N-1):
#         for k in range(j+1, N):
#             sum_res = num_list[i] + num_list[j] + num_list[k]
#             if sum_res > M:
#                 sum_res = 0
#                 continue
#             elif sum_res == M:
#                 print(M)
#                 exit()
#             else:
#                 res = max(res, sum_res)

# print(res)

import sys
import itertools

N, M = map(int, sys.stdin.readline().split())

num_list = list(map(int, list(sys.stdin.readline().split())))

sum_list = list(itertools.combinations(num_list, 3))
res = 0
sum_test = 0
for i in range(len(sum_list)):
    sum_test = sum(sum_list[i])
    if sum_test > M:
        sum_test = 0
        continue
    elif sum_test == M:
        res = sum_test
        break
    else:
        res = max(res, sum_test)    
        
print(res)