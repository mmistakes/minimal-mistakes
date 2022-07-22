# 이진 탐색 bisect 모듈은 원소들이 정렬되어 있을때에만 정상 작동함
# 만약 정렬되어 있지 않고 섞여있다면 절대 쓰면 안됨.

import sys
import heapq

N = int(sys.stdin.readline())

card = []



for i in range(N):
    heapq.heappush(card, int(sys.stdin.readline()))


ans = []


if N == 1:
    print(0)
    exit()

for i in range(N - 1):
    pop_1 = heapq.heappop(card)
    pop_2 = heapq.heappop(card)
    card_sum = pop_1 + pop_2
    ans.append(card_sum)
    heapq.heappush(card, card_sum)
print(sum(ans))
    


