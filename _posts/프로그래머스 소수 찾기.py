import sys
# import itertools

# def solution(numbers):
#     comb = []
#     visit = [0] * 10000000
#     max = 0
#     for i in range(len(numbers)):
#         for j in itertools.permutations(numbers, i + 1):
#             sum = ""
#             for k in range(len(j)):
#                 sum += j[k]
#             if visit[int(sum)] == 1:
#                 continue
#             visit[int(sum)] = 1
#             if max < int(sum):
#                 max = int(sum)
#             comb.append(int(sum))
#     a = int(max ** (0.5))
#     visit = [0] * (max + 1)
#     visit[0] = 1
#     visit[1] = 1
#     for i in range(2, a + 1):
#         for j in range(i + i, max + 1, i):
#             visit[j] = 1
#     answer = 0
#     for i in comb:
#         if visit[i] == 0:
#             answer += 1
    
#     return answer

from itertools import permutations
import sys
n = sys.stdin.readline().strip()
def solution(n):
    a = set()
    for i in range(len(n)):
        a |= set(map(int, map("".join, permutations(list(n), i + 1))))
    a -= set(range(0, 2))
    for i in range(2, int(max(a) ** 0.5) + 1):
        a -= set(range(i * 2, max(a) + 1, i))
    return len(a)

print(solution(n))