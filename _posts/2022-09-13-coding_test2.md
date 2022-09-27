---
layout: single
title:  "코딩 테스트 책 - 2차시"
categories : coding-test
tag : [이것이 취업을 위한 코딩 테스트다, python, 나동빈]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=코딩 테스트 책 - 2차시&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

&nbsp;

## 구현

- **완전 탐색**
  - 모든 경우의 수를 주저 없이 다 계산하는 해결 방법

- **시뮬레이션**
  - 문제에서 제시한 알고리즘을 한 단계씩 차례대로 직접 수행


&nbsp;

### 예제) 상하좌우

```markdown
- N * N 행렬 좌표
- 가장 좌측 상단 좌표는 1,1 가장 우측 하단 좌표는 N,N 로 표기한다.
- N 길이의 입력에는 L(left), R(right), U(up), D(down) 이 들어있다.
- 좌표를 초과하는 이동은 무시한다.
- 예를 들어 1,1에서 L,U를 입력 받으면 이동하지 않는다.
- 최종 도착한 좌표를 공백 기준으로 분리하여 출력하라.

# 입력 예시
5
R R R U D D

# 출력 에시
3 4
```

&nbsp;

**풀이**

```python
number = int(input())
moves = input().split()
x,y = 1,1

dx = [0,0,-1,1]
dy = [-1,1,0,0]

move_type = ['L','R','U','D']

for p in moves:
    for i in range(len(move_type)):
        if p == move_type[i]:
            nx = x + dx[i]
            ny = y + dy[i]
    if nx < 1 or ny < 1 or nx > number or ny > number:
        continue
    
    x, y = nx, ny

print(x,y)
```

- 초기값 x,y 설정
- 방향에 따라 좌표값을 dx,dy에 할당
- 전체 격자를 넘어가는 경우에 대한 예외 적용

> 구현은 위와같이 예외 케이스를 제외하는 방식으로 진행

&nbsp;



### 시각

```markdown
정수 N이 입력되면 00시 00분 00초부터 N시 59분 59초까지의 모든 시각 중 3이 하나라도 포함되는 모든 경우의 수를 구하라.


# 입력 예시
5

# 출력 예시
11475
```

&nbsp;

**풀이**

```python
h = int(input())

cnt = 0

for i in range(h+1):
    for m in range(60):
        for s in range(60):
            if '3' in str(i) + str(m) + str(s):
                cnt += 1
```

> 시, 분, 초 나눠서 str로 합친후 3 존재시 1씩 증가

&nbsp;

### 왕실의 나이트

```markdown
왕실 정원은 8 by 8 좌표 평면이다. 왕실의 나이트는 다음과 같이 L자 형태로 움직일 수 있다.

- 수평으로 두 칸 이동한 뒤에 수직으로 한 칸 이동하기
- 수직으로 두 칸 이동한 뒤에 수평으로 한 칸 이동하기

좌표평면의 가로, 세로는 다음과 같으며 나이트의 초기 위치가 가로, 세로 문자열을 합쳐서 주어진다. 예를 들어, a1로 주어진다면 가장 왼쪽의 위 좌표를 의미한다.
```

&nbsp;

**풀이**

```python
x_col = ['a','b','c','d','e','f','g','h']
y_col = [i for i in range(1,9)]

state = input()

x = x_col.index(state[0])
y = y_col.index(int(state[1]))

move_step = [(2, -1), (2, 1), (1, -2), (-1, -2), (-2, -1), (-2, 1), (1, 2), (-1, 2)]

cnt = 0
for step in move_step:
    nx =  x + step[0]
    ny = y + step[1]
    
    if nx >= 0 and ny >= 0 and nx < 8 and ny < 8:
        cnt += 1
```

> 나이트가 갈수있는 방안을 모두 기록후 현재 위치에서의 가능한 경우의 수만 이동

&nbsp;



### 게임 개발

```markdown
**문제설명**

게임 캐릭터가 맴 안에서 움직이는 시스템을 개발하고 있다. 캐릭터가 있는 장소는 1 by 1 크기의 정사각형으로 이뤄진 N by M 크기의 직사각형으로 각각의 칸은 육지 또는 바다이다. 캐릭터는 동서남북 중 한 곳을 바라본다. 맵의 각 칸은 (A, B)로 나타낼 수 있고, A는 북쪽으로부터 떨어진 칸의 개수(즉, 행을 의미), B는 서쪽으로부터 떨어진 칸의 개수(즉, 열을 의미)이다. 캐릭터는 상하좌우로 움직일 수 있고, 바다로 되어 있는 공간에는 갈 수 없다. 캐릭터 움직임의 매뉴얼은 다음과 같다.

 
	1. 현재 위치에서 현재 방향을 기준으로 왼쪽 방향(반시계 방향으로 90도 회전한 방향)부터 차례대로 갈 곳을 정한다.
	2. 캐릭터의 바로 왼쪽 방향에 아직 가보지 않은 칸이 존재한다면, 왼쪽 방향으로 회전한 다음 왼쪽으로 한 칸을 전진한다. 왼쪽 방향에 가보지 않은 칸이 없다면, 왼쪽 방향으로 회전만 수행하고 1단계로 돌아간다.
	3. 만약 네 방향 모두 이미 가본 칸이거나 바다로 되어 있는 칸인 경우에는, 바라보는 방향을 유지한 채로 한 칸 뒤로 가고 1단계로 돌아간다. 단, 이 때 뒤쪽 방향이 바다인 칸이라 뒤로 갈 수 없는 경우에는 움직임을 멈춘다.
	
위 과정을 반복적으로 수행하면서 매뉴얼에 따라 캐릭터를 이동시킨 뒤에 캐릭터가 방문한 칸의 수(최초 좌표 칸 포함)를 출력하는 프로그램을 만드시오.


**입력조건**

- 첫째 줄에 맵의 세로 크기 N과 가로 크기 M을 공백으로 구분하여 입력한다.(3 <= N, M <= 50)
- 둘째 줄에 게임 캐릭터가 있는 칸의 좌표 (A, B)와 바라보는 방향 d가 각각 서로 공백으로 구분하여 주어진다. 방향 d의 값으로는 다음과 같이 4가지가 존재한다.

    0 : 북쪽
    1 : 동쪽
    2 : 남쪽
    3 : 서쪽

- 셋째 줄부터 맵이 육지인지 바다인지에 대한 정보가 N개의 줄로 주어진다. 0이면 육지, 1이면 바다를 의미한다 (단, 최초의 위치한 칸은 무조건 육지이다.)


4 4
1 1 0   
1 1 1 1 
1 0 0 1  
1 1 0 1
1 1 1 1

>> 3
```

&nbsp;



**풀이**

```python
# n, m
n, m = map(int,input().split())

# 방문할 위치 저장할 배열 생성
check = [[0] * m for _ in range(n)]

# 현재 map
real_map = [list(map(int, input().split())) for _ in range(n)]

# 현재 좌표 방향 
x,y,d = map(int, input().split())

# 시작위치는 방문
check[x][y] = 1

# 방문 count
count = 1

# 회전 count
turn_count = 0

# 방향 설정
dx = [-1, 0, 1, 0]
dy = [0, -1 , 0 , 1]

# 왼쪽으로 회전하는 함수
def left_turn():
    global d
    d += 1
    if (d == 4):
        d = 0

while True:
  # 왼쪽으로 회전
  left_turn()
  # 바라보는 방향의 좌표
  nx = x + dx[d]
  ny = y + dy[d]
  # 바라보는 방향이 맵 내부에 있는지 확인
  if (nx >= 0 and nx < n and ny >= 0 and ny < m):
      # 해당 방향으로 방문할 수 있는지 확인
      if (check[nx][ny] == 0 and real_map[nx][ny] == 0):
          # 현재 위치 변경
          x = nx
          y = ny
          # 방문 체크
          check[nx][ny] = 1
          # 방문 칸수 추가
          count += 1
          # 회전 횟수 초기화
          turn_count = 0
          continue
      # 해당 방향으로 방문할 수 없다면
      else:
          turn_count += 1
      # 회전 횟수가 찼다면
      if (turn_count == 4):
          # 바라보는 방향은 그대로 두고, 위치만 뒤로 변경
          nx = x - dx[d]
          ny = y - dy[d]    
          # 뒤로 갈 수 있다면
          if (check[nx][ny] == 0 and real_map[nx][ny] == 0):
              x = nx
              y = ny
              # 회전 횟수 초기화
              turn_count = 0
          # 뒤로 갈 수 없다면
          else:
              break

print(count)
```

> 예외 케이스를 먼저 생각





