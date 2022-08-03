import sys
import heapq

N = int(sys.stdin.readline())
queue_plus = []
queue_minus = []

flag_zero = False

for _ in range(N):
    a = int(sys.stdin.readline())
    if a > 0:
        heapq.heappush(queue_plus, -a)
    elif a < 0:
        heapq.heappush(queue_minus, a)
    else:
        flag_zero = True

sum = 0

while queue_plus:
    if len(queue_plus) == 1:
        sum -= heapq.heappop(queue_plus)
    else:
        a = heapq.heappop(queue_plus)
        b = heapq.heappop(queue_plus)
        if a == -1 or b == -1:
            sum += (-a - b)
        else:
            sum += a * b
while queue_minus:
    if len(queue_minus) == 1:
        if flag_zero == True:
            heapq.heappop(queue_minus)
        else:
            sum += heapq.heappop(queue_minus)
    else:
        sum += heapq.heappop(queue_minus) * heapq.heappop(queue_minus)

print(sum)