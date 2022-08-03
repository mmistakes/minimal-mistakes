import sys
from collections import deque

omok = [[0] * 19 for _ in range(19)]

for i in range(19):
    omok[i] = list(map(int, sys.stdin.readline().split()))

queue_white = deque()
queue_black = deque()

for i in range(19):
    for j in range(19):
        if omok[i][j] == 2:
            queue_white.append([i, j, 0, 1])
        elif omok[i][j] == 1:
            queue_black.append([i, j, 0, 1])
# 0 : 아직 방향이 안정해져있음
# 1 : 가로 체크 오른쪽으로만
# 2 : 세로 체크 밑으로만
# 3 : 왼쪽 대각선 체크 왼쪽 밑으로만
# 4 : 오른쪽 대각선 체크 오른쪽 밑으로만

dx = [0, 1, 1, 1]
dy = [1, 0, -1, 1]

def bfs(queue, color):
    ans = []
    if color == "white":
        color_num = 2
    else:
        color_num = 1
    while queue:
        x, y, route, count = queue.popleft()
        if route == 0:
            for i in range(4):
                nx = x + dx[i]
                ny = y + dy[i]
                route_check = i + 1
                if 0 <= nx <= 18 and 0 <= ny <= 18:
                    if omok[nx][ny] == color_num:
                        if route_check == 1:
                            if 0 <= y - 1:
                                if omok[x][y - 1] == color_num:
                                    continue
                        elif route_check == 2:
                            if 0 <= x - 1:
                                if omok[x - 1][y] == color_num:
                                    continue
                        elif route_check == 3:
                            if 0 <= x - 1 and y + 1 <= 18:
                                if omok[x - 1][y + 1] == color_num:
                                    continue
                        elif route_check == 4:
                            if 0 <= x - 1 and 0 <= y - 1:
                                if omok[x - 1][y - 1] == color_num:
                                    continue
                        queue.append([nx, ny, route_check, 2])
        else:
            flag = 0
            if count == 5:
                flag = 1
            nx = x + dx[route - 1]
            ny = y + dy[route - 1]
            if 0 <= nx <= 18 and 0 <= ny <= 18:
                if omok[nx][ny] == color_num:
                    if count == 5:
                        continue
                    queue.append([nx, ny, route, count + 1])
                else:
                    if count == 5:
                        ans.append([x + 1, y + 1, route, count])
            elif count == 5 and flag == 1:
                ans.append([x + 1, y + 1, route, count])
    return ans

ans_black = bfs(queue_black, "black")
ans_white = bfs(queue_white, "white")

black_win = []
white_win = []

if len(ans_black) != 0:
    for i in range(len(ans_black)):
        if ans_black[i][3] == 5:
            if ans_black[i][2] == 1:
                black_win.append((ans_black[i][0], ans_black[i][1] - 4))
            elif ans_black[i][2] == 2:
                black_win.append((ans_black[i][0] - 4, ans_black[i][1]))
            elif ans_black[i][2] == 3:
                black_win.append((ans_black[i][0], ans_black[i][1]))
            else: 
                black_win.append((ans_black[i][0] - 4, ans_black[i][1] - 4))
if len(ans_white) != 0:
    for i in range(len(ans_white)):
        if ans_white[i][3] == 5:
            if ans_white[i][2] == 1:
                white_win.append((ans_white[i][0], ans_white[i][1] - 4))
            elif ans_white[i][2] == 2:
                white_win.append((ans_white[i][0] - 4, ans_white[i][1]))
            elif ans_white[i][2] == 3:
                white_win.append((ans_white[i][0], ans_white[i][1]))
            else: 
                white_win.append((ans_white[i][0] - 4, ans_white[i][1] - 4))

if len(black_win) != 0:
    print("1")
    print(*black_win[0])
elif len(white_win) != 0:
    print("2")
    print(*white_win[0])
else:
    print("0")

