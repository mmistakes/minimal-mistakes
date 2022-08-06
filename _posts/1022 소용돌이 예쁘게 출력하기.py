import sys

ans_minus = []
ans_plus = []
a = 4

for i in range(5002):
    if i == 0:
        ans_minus.append(1)
        ans_plus.append(1)
    elif i == 1:
        ans_minus.append(5)
        ans_plus.append(2)
    else:
        a += 8
        ans_minus.append(ans_minus[-1] + a)
        ans_plus.append(ans_plus[-1] + a - 4)

r1, c1, r2, c2 = map(int, sys.stdin.readline().split())

x = abs(r1 - r2) + 1
y = abs(c1 - c2) + 1

hurricane = [[0] * y for _ in range(x)]


for i in range(x):
    for j in range(y):
        real_x = i + r1
        real_y = j + c1
        if abs(real_x) > abs(real_y):
            if real_x < 0:
                hurricane[i][j] = ans_minus[abs(real_x)] - abs(real_x - real_y)
            elif real_x > 0:
                hurricane[i][j] = ans_plus[abs(real_x) + 1] - abs(real_x - real_y) -1 
        elif abs(real_x) < abs(real_y):
            if real_y > 0:
                hurricane[i][j] = ans_plus[abs(real_y)] + abs(real_x - real_y) -1
            elif real_y < 0:
                hurricane[i][j] = ans_minus[abs(real_y)] + abs(real_x - real_y)
        elif abs(real_x) == abs(real_y):
            if real_x < 0:
                hurricane[i][j] = ans_minus[abs(real_x)] - abs(real_x - real_y)
            elif real_x > 0:
                hurricane[i][j] = ans_plus[abs(real_x) + 1] - abs(real_x - real_y) - 1 
        if hurricane[i][j] == 0:
            hurricane[i][j] = 1
max_num = 0
for i in range(x):
    max_hurricane = max(hurricane[i])
    max_num = max(max_hurricane, max_num)

max_num_len = len(str(max_num))

for i in range(x):
    for j in range(y):
        a = len(str(hurricane[i][j]))
        if a < max_num_len:
            b = " " * (max_num_len - a)
            b += str(hurricane[i][j])
            print(b, end = " ")
        else:
            print(hurricane[i][j], end = " ")
    print()
        