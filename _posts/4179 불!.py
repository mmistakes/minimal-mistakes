import sys
from collections import deque

R, C = map(int, sys.stdin.readline().split())

visit_fire = [[0] * C for _ in range(R)]
visit_jihun = [[0] * C for _ in range(R)] 


maze = [[0] * C] * R

for i in range(R):
    maze[i] = list(sys.stdin.readline().rstrip())
fire = []
for i in range(R):
    for j in range(C):
        if maze[i][j] == "J":
            jihun = [i, j]
            visit_jihun[i][j] = 1
        elif maze[i][j] == "F":
            fire.append([i, j])
            visit_fire[i][j] = 1
        elif maze[i][j] == "#":
            visit_jihun[i][j] = 1
            visit_fire[i][j] = 1

queue_jihun = deque()
queue_fire = deque()
queue_jihun.append([jihun[0], jihun[1], 0])
for i in range(len(fire)):
    queue_fire.append([fire[i][0], fire[i][1], 0])


def bfs():
    dx = [-1, 1, 0, 0]
    dy = [0, 0, -1, 1]
    while queue_jihun:
        while queue_fire:
            if queue_jihun[0][2] == queue_fire[0][2]:
                fire_x, fire_y, fire_count = queue_fire.popleft()
                for i in range(4):
                    fire_nx = fire_x + dx[i]
                    fire_ny = fire_y + dy[i]
                    if 0 <= fire_nx < R and 0 <= fire_ny < C and visit_fire[fire_nx][fire_ny] == 0:
                        queue_fire.append([fire_nx, fire_ny, fire_count + 1])
                        visit_fire[fire_nx][fire_ny] = 1
            else:
                break
        jihun_x, jihun_y, jihun_count = queue_jihun.popleft()
        for i in range(4):
            jihun_nx = jihun_x + dx[i]
            jihun_ny = jihun_y + dy[i]
            if jihun_nx < 0 or jihun_nx >= R or jihun_ny >= C or jihun_ny < 0:
                return jihun_count + 1
            elif visit_jihun[jihun_nx][jihun_ny] != 1 and visit_fire[jihun_nx][jihun_ny] != 1:
                queue_jihun.append([jihun_nx, jihun_ny, jihun_count + 1])
                visit_jihun[jihun_nx][jihun_ny] = 1
    return 0

count = bfs()
if count == 0:
    print("IMPOSSIBLE")
else:
    print(count)

