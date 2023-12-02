---
published: true
title: "구현 (Implementation)"

categories: Algorithm
tag: [codingtest, algorithm, 구현]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

date: 2023-12-02
---
<br>
<br>

# 구현 Implementation

<br>

![implementation](https://github.com/leejongseok1/digivice/assets/79849878/1fed19cb-174b-4fbd-9ce5-8050227e9ce2)


: '머릿속에 있는 알고리즘을 소스코드로 바꾸는 과정'

- 흔히 풀이를 떠올리는 것은 쉽지만 소스코드로 옮기기 어려운 문제를 의미함
- 피지컬 요구


**완전 탐색**

모든 경우의 수를 주저 없이 다 계산하는 해결 방법

**시뮬레이션**

문제에서 제시한 알고리즘을 한 단계씩 차례대로 직접 수행


<br> 

**다음은 구현에 관한 간단한 문제 몇 개이다.**

<br>
<br>
<br>

## 상하좌우

<br>

```python
'''
A는 N x N 정사각형 공간 위에 서 있다.
이 공간은 1 x 1 크기의 정사각형들로 나누어져있다.
가장 왼쪽 위 (1, 1), 가장 오른쪽 아래 (N, N)
L 왼쪽 R 오른쪽 U 위 D 아래
N x N 을 벗어나는 움직임은 무시됨
'''

n = int(input())
x, y = 1, 1
plans = input().split()

dx = [0, 0, -1, 1]
dy = [-1, 1, 0, 0]
move_types = ['L', 'R', 'U', 'D']

for plan in plans:

    for i in range(len(move_types)):
        if plan == move_types[i]:
            nx = x + dx[i]
            ny = y + dy[i]
    
    if nx < 1 or ny < 1 or nx > n or ny > n:
        continue

    x, y = nx, ny

print(x, y)

```
```python
# 입력 예시
5
R R R U D D
# 출력 예시
3 4
```

개체를 차례대로 이동시킨다는 점에서 시뮬레이션 유형이다. 
처음 위치 x, y를 초기화 시키고 방향에 따른 이동 방향을 배열로 나타낸다. 입력받은 입력 계획(plans)를 for문을 통해 하나씩 확인하면서 이동 후의 좌표를 구한다.

<br>
<br>

## 시각 (3 개수 세기)

```python
'''
00시 00분 00초 ~ N시 59분 59초 까지
3이 하나라도 포함되어 있으면 세기
'''
# my
n = int(input())

cnt = 0

hour = range(n+1)
min = range(60)
sec = range(60)
            
for h in hour:
    h_str = str(h)
    for m in min:
        m_str = str(m)
        for s in sec:
            s_str = str(s)

            if '3' in h_str or '3' in m_str or '3' in s_str:
                cnt += 1

print(cnt)


# solution
'''
n = int(input())

cnt = 0

for i in range(n+1):
    for j in range(60):
        for k in range(60):
            if '3' in str(i) + str(j) + str(k):
                cnt += 1
'''

```
```python
# 입력 예시
# 5
# 출력 예시
# 11475
```

경우의 수가 24 x 60 x 60 으로 그리 많지 않다.

3중 반복문을 통해 시각을 1씩 증가시키면서 3이 하나라도 포함되었는지 확인하면 끝이다. 그래서 이 문제는 완전탐색 유형이다.

문제 답안과 내 풀이가 똑같은 구조이지만 풀이를 보고 내 코드는 변수의 사용이 너무 많다는 반성을 하게 됐다. 참고해야겠다.

<br>
<br>

## 왕실의 나이트

```python
'''
8 x 8 좌표 평면 (1~8) x (a~h)
나이트는 L 자로만 이동가능
1. 수평 2칸 이동 후 수직 1칸
2. 수직 2칸 이동 후 수평 1칸
평면 밖으로는 나갈 수 없음

현재 위치 입력 했을 때, 나이트가 이동할 수 있는 경우의 수 세기 ex) a1 - 2
'''

p = input()
row = int(p[1])
col = int(ord(p[0])) - int(ord('a')) + 1


cnt = 0

steps = [(-2, -1), (-2, 1), (2, -1), (2, 1), (-1, -2), (-1, 2), (1, -2), (1, 2)]

for step in steps:
    # 이동하고자 하는 위치 확인 
    next_row = row + step[0]
    next_col = col + step[1]

    # 해당 위치로 이동가능하다면 카운트 증가
    if next_row >= 1 and next_row <= 8 and next_col >= 1 and next_col <= 8:
        cnt += 1

print(cnt)

```
나이트의 이동 경로를 규칙에 따라 steps 변수에 대입한다.

나이트의 현재 위치가 주어지면 현재 위치에서 이동 경로를 더한 다음, 밖으로 나가지 않는지 확인하면 된다.

앞서 상하좌우 문제에선 이동할 방향을 dx, dy 리스트로 선언했고 이번 문제에서는 steps 변수에 저장하였다. 2가지 형태 모두 자주 사용된다고 하니 참고해야겠다.

<br>
<br>

<memo>
백준 구현 문제집 풀어보고 더 작성 예정.
이코테 ~118p







