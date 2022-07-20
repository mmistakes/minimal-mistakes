# import sys
# from collections import deque

# N = int(sys.stdin.readline())

# list_num = list(map(int, sys.stdin.readline().split()))

# sort_list = [0] * (N + 1)

# for i in range(len(list_num)):
#     sort_list[list_num[i]] = i + 1

# ans_list = []

# def bfs():
#     while queue:
#         num , count = queue.popleft()
        
#         for i in range(sort_list.index(num) + 1, len(sort_list)):
#             if num < sort_list[i]:
#                 queue.append((sort_list[i], count + 1))
        
#         if len(queue) == 0:
#             print(count)

# queue = deque()
            
# for i in range(1, len(sort_list)):
#     queue.append((sort_list[i] , 1))
    
# bfs()
# bfs 는 시간복잡도가 O(n^2)이다.

# <p align="center">
# <img style="margin:50px 0 10px 0" src="https://user-images.githubusercontent.com/95459089/179918439-79266e58-a536-4b39-86fb-5faaecf7ea89.png" alt/>
# </p> 

# 여기서 테스트 케이스는 4 * 10^5 이다. 10^4을 넘어가기 때문에 O(n^2)의 시간 복잡도를 가지는 bfs를
# 사용하면 안된다!
# O(nlogn)의 시간 복잡도를 가지는 알고리즘을 사용하여야함.

# dp = [1] * (N + 1)

# for i in range(1, N + 1):
#     for j in range(1, i):
#         if sort_list[i] > sort_list[j]:
#             dp[i] = max(dp[i], dp[j] + 1)
# dp.sort(reverse = True)
# print(dp[0])






# import sys
# from bisect import bisect_left
# n=int(sys.stdin.readline())
# arr=list(map(int,sys.stdin.readline().split()))

# q=[arr[0]]
# t=[] # (들어갈 위치, 값)의 쌍을 넣는 배열
# # 여기는 이전 문제들과 비슷하다.
# #  다만 t라는 새로운 배열에 갱신되는 배열 요소의 위치, 요소 값에 대한 정보도 추가하는게 다르다
# for x in arr:
#     if q[-1]<x:
#         q.append(x)
#         t.append((len(q)-1,x))
#     else:
#         idx=bisect_left(q,x)
#         q[idx]=x
#         t.append((idx,x))
        
# # 최종 배열의 길이를 구했으면 마지막 위치부터 가장 큰 요소를 넣는다 (실제 요소)       
# last_idx=len(q)-1

# # 덮어씌워진 요소가 아니라 기존 요소를 넣어준다 
# ans=[]
# for i in range(n-1,-1,-1):
#     if t[i][0]==last_idx:
#         ans.append(t[i][1])
#         last_idx-=1

# print(len(q))
# # *을 붙이면 자동으로 리스트 요소를 공백으로 구분해 반환해준다
# print(*reversed(ans))

import sys
from bisect import bisect_left

N = int(sys.stdin.readline())

list_num = list(map(int, sys.stdin.readline().split()))

q = [list_num[0]]

t = []

for i in list_num:
    if q[-1] < i:
        q.append(i)
        t.append((len(q) - 1, i))
        
    else:
        idx = bisect_left(q, i)
        q[idx] = i
        t.append((idx, i))

last_idx = len(q) - 1
ans = []
        
for i in range(N - 1, -1, -1):
    if last_idx == t[i][0]:
        ans.append(t[i][1])
        last_idx -= 1
    if last_idx < 0:
        break
        
print(len(q))
print(*reversed(ans))