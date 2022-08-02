import sys
from collections import deque

def solution(places):
    queue = deque()
    answer = []
    dx = [-1, 1, 0, 0]
    dy = [0, 0, -1, 1]
    for i in range(5):
        Flag = False
        for j in range(5):
            for q in range(5):
                if places[i][j][q] == "P":
                    # 이전 x위치, 이전 y위치, 자신의 x위치, 자신의 y위치, 거리
                    queue.append((-1, -1, j, q, 0))
        while queue:
            prev_x, prev_y, x, y, count = queue.popleft()
            for k in range(4):
                nx = x + dx[k]
                ny = y + dy[k]
                if (nx != prev_x or ny != prev_y) and 0 <= nx < 5 and 0 <= ny < 5 and count < 2:
                    if places[i][nx][ny] == "O":
                        queue.append((x, y, nx, ny, count + 1))
                    elif places[i][nx][ny] == "P":
                        queue.clear()
                        Flag = True
                        answer.append(0)
                        break
                
        if Flag == False:
            answer.append(1)
    return answer
    

# P = 응시자가 앉아있는 자리
# 0 = 빈 테이블
# X = 파티션

# 거리두기 지킬 조건
# 맨허튼 거리 3 이상
# 파티션이 응시자 사이를 막고 있는 경우

# P000P
# 0XX0X
# 0XXPX
# 0PX0X
# PXXXP

# POOPX
# OXPXP
# PXXXO
# OXXXO
# OOOPP

# bfs 이용
# 상, 하, 좌, 우 검사
# 0으로 된것만 이동 가능
# 두 번 이하로 이동했는데 P가 또 나오면 return 0
# 두 번을 넘게 이동했는데 P가 안나오면 queue에 안집어넣음
# visit를 굳이 쓰지 않고 어차피 두번까지만 검사하면 되기 때문에 
# queue에 넣을 때 현재 자기의 위치 index와 2를 넘는지 체크하기 위한 count 변수까지 같이 넣어준다.



