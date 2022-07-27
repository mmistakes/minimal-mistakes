import sys
from collections import deque


def solution(s):
    queue = deque()
    for i in range(len(s)):
        queue.append(s[i])
    temp = ""
    count = 1
    ans = []
    min_len = 10000000
    for j in range(1, len(s) + 1):
        while len(queue) >= j:
            temp = ""
            for i in range(j):
                temp += queue.popleft()
            if len(queue) >= j:
                a = ""
                for i in range(j):
                    a += queue[i] 
                if temp == a:
                    temp = ""
                    count += 1
                    # if len(queue) < j:
                    #     ans += str(count) + temp + queue[ : len(queue)]
                    #     break

                else:
                    if count == 1:
                        ans += temp
                    else:
                        ans += str(count) + temp
                    count = 1
                # if len(queue) < j:
                #     ans += queue[ : len(queue)]
                #     break
        if count == 1:
            ans += temp
        else:
            ans += str(count) + temp
        if len(queue) != 0:
                for i in range(len(queue)):
                    ans += queue[i]
        min_len = min(min_len, len(ans))
        ans = []
        count = 1
        queue = deque()
        if j != len(s):
            for i in range(len(s)):
                queue.append(s[i])

    return min_len

s = sys.stdin.readline().rstrip()



print(solution(s))