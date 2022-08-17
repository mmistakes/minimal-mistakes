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
        
                
# c가 0이 아닐때
# 	c->a
# 		c + a 가 A를 초과할 경우
# 		c + a 가 A를 초과하지 않을 경우
# 	c->b
# 		c + b 가 B를 초과할 경우
# 		c + b 가 B를 초과하지 않을 경우
# b가 0이 아닐때
# 	b->a
# 		b + a 가 A를 초과할 경우
# 		b + a 가 A를 초과하지 않을 경우
# 	b->c
# 		b + c 가 C를 초과할 경우
# 		b + c 가 C를 초과하지 않을 경우
# a가 0이 아닐때
# 	a->c
# 		a + c 가 C를 초과할 경우
# 		a + c 가 C를 초과하지 않을 경우
# 	a->b
# 		a + b 가 B를 초과할 경우
# 		a + b 가 B를 초과하지 않을 경우
	