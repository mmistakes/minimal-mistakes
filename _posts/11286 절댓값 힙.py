import sys
import heapq

N = int(sys.stdin.readline())

heap = []

for i in range(N):
    a = int(sys.stdin.readline())
    if a > 0:
        heapq.heappush(heap, (a, 1))
    elif a < 0:
        heapq.heappush(heap, (-a, -1))
    else:
        if len(heap) == 0:
            print("0")
            continue
        if len(heap) > 2:
            if heap[0][0] == heap[1][0]:
                heap.sort()  
        b = heapq.heappop(heap)
        if b[1] == -1:
            print(-b[0])
        else:
            print(b[0])
        
