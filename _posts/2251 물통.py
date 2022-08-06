import sys
from collections import deque

A, B, C = map(int, sys.stdin.readline().split())



def bfs():
    queue = deque()
    queue.append([0, 0, C])
    comb_set = set()
    comb_set.add((0, 0, C))
    while queue:
        a, b, c = queue.popleft()
        if c != 0:
            if a != A:
                c_a = c + a
                if c_a >= A:
                    c_a = c_a - A
                    if (A, b, c_a) not in comb_set:
                        comb_set.add((A, b, c_a))
                        queue.append([A, b, c_a])
                else:
                    if (c_a, b, 0) not in comb_set:
                        comb_set.add((c_a, b, 0))
                        queue.append([c_a, b, 0])
            if b != B:
                c_b = c + b
                if c_b >= B:
                    c_b = c_b - B
                    if (a, B, c_b) not in comb_set:
                        comb_set.add((a, B, c_b))
                        queue.append([a, B, c_b])
                else:
                    if (a, c_b, 0) not in comb_set:
                        comb_set.add((a, c_b, 0))
                        queue.append([a, c_b, 0])
        if b != 0:
            if a != A:
                b_a = b + a
                if b_a >= A:
                    b_a = b_a - A
                    if (A, b_a, c) not in comb_set:
                        comb_set.add((A, b_a, c))
                        queue.append([A, b_a, c])
                else:
                    if (b_a, 0, c) not in comb_set:
                        comb_set.add((b_a, 0, c))
                        queue.append([b_a, 0, c])
            if c != C:
                b_c = c + b
                if b_c >= C:
                    b_c = b_c - C
                    if (a, b_c, C) not in comb_set:
                        comb_set.add((a, b_c, C))
                        queue.append([a, b_c, C])
                else:
                    if (a, 0, b_c) not in comb_set:
                        comb_set.add((a, 0, b_c))
                        queue.append([a, 0, b_c])
        if a != 0:
            if c != C:
                a_c = c + a
                if a_c >= C:
                    a_c = a_c - C
                    if (a_c, b, C) not in comb_set:
                        comb_set.add((a_c, b, C))
                        queue.append([a_c, b, C])
                else:
                    if (0, b, a_c) not in comb_set:
                        comb_set.add((0, b, a_c))
                        queue.append([0, b, a_c])
            if b != B:
                a_b = a + b
                if a_b >= B:
                    a_b = a_b - B
                    if (a_b, B, c) not in comb_set:
                        comb_set.add((a_b, B, c))
                        queue.append([a_b, B, c])
                else:
                    if (0, a_b, c) not in comb_set:
                        comb_set.add((0, a_b, c))
                        queue.append([0, a_b, c])
    ans = []
    visited = [False] * (C + 1)
    for i in comb_set:
        if visited[i[2]] == False:
            if i[0] == 0:
                visited[i[2]] = True
                ans.append(i[2])
    ans.sort()
    print(*ans)
bfs()
        
                
# import sys
# from collections import deque

# # x, y의 경우의 수 저장
# def pour(x, y):
#     if not visited[x][y]:
#         visited[x][y] = True
#         q.append((x, y))

# def bfs():

#     while q:
#         # x : a물통의 물의 양, y : b물통의 물의 양, z : c물통의 물의 양
#         x, y = q.popleft()
#         z = c - x - y

#         # a 물통이 비어있는 경우 c 물통에 남아있는 양 저장
#         if x == 0:
#             answer.append(z)

#         # x -> y
#         water = min(x, b-y)
#         pour(x - water, y + water)
#         # x -> z
#         water = min(x, c-z)
#         pour(x - water, y)
#         # y -> x
#         water = min(y, a-x)
#         pour(x + water, y - water)
#         # y -> z
#         water = min(y, c-z)
#         pour(x, y - water)
#         # z -> x
#         water = min(z, a-x)
#         pour(x + water, y)
#         # z -> y
#         water = min(z, b-y)
#         pour(x, y + water)


# # 입력(리터 범위)
# a, b, c = map(int, sys.stdin.readline().split())

# # 경우의 수를 담을 큐
# q = deque()
# q.append((0, 0))

# # 방문 여부(visited[x][y])
# visited = [[False] * (b+1) for _ in range(a+1)]
# visited[0][0] = True

# # 답을 저장할 배열
# answer = []

# bfs()

# # 출력
# answer.sort()
# for i in answer:
#     print(i, end=" ")