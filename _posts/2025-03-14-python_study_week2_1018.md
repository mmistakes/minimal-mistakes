---
layout: single
title: "[Python/파이썬][완전탐색] 백준 1018번 - 체스판 다시 칠하기"
categories:
  - python_algorithm_study
tags:
  - python
  - 백준
  - solved
  - 완전탐색
  - 구현
  - 시뮬레이션
author_profile: false
use_math: true
---
## 문제
지민이는 자신의 저택에서 MN개의 단위 정사각형으로 나누어져 있는 M×N 크기의 보드를 찾았다. 어떤 정사각형은 검은색으로 칠해져 있고, 나머지는 흰색으로 칠해져 있다. 지민이는 이 보드를 잘라서 8×8 크기의 체스판으로 만들려고 한다.

체스판은 검은색과 흰색이 번갈아서 칠해져 있어야 한다. 구체적으로, 각 칸이 검은색과 흰색 중 하나로 색칠되어 있고, 변을 공유하는 두 개의 사각형은 다른 색으로 칠해져 있어야 한다. 따라서 이 정의를 따르면 체스판을 색칠하는 경우는 두 가지뿐이다. 하나는 맨 왼쪽 위 칸이 흰색인 경우, 하나는 검은색인 경우이다.

보드가 체스판처럼 칠해져 있다는 보장이 없어서, 지민이는 8×8 크기의 체스판으로 잘라낸 후에 몇 개의 정사각형을 다시 칠해야겠다고 생각했다. 당연히 88 크기는 아무데서나 골라도 된다. 지민이가 다시 칠해야 하는 정사각형의 최소 개수를 구하는 프로그램을 작성하시오.

## 입력
첫째 줄에 N과 M이 주어진다. N과 M은 8보다 크거나 같고, 50보다 작거나 같은 자연수이다. 둘째 줄부터 N개의 줄에는 보드의 각 행의 상태가 주어진다. B는 검은색이며, W는 흰색이다.

## 출력
첫째 줄에 지민이가 다시 칠해야 하는 정사각형 개수의 최솟값을 출력한다.

## 풀이
- 꽤나 까다로웠던 문제였다.
	1. 처음에는 W, B를 입력받은 후, 위아래 양옆 원소가 다르다는 점에만 착안하여 문제를 풀었다.
	2. 그러다 보니, 보드 크기가 8x8 이상인 것을 받아줄 경우를 체크하는 데에 어려움을 겪었다.
	3. 그래서 생각의 흐름을 유일한 두개의 정답 케이스와 비교하며 체크하는 방향으로 바꾸어 풀었다.<br><br>
- 해결 순서
	1. W와 B를 2x2 리스트로 받아준다.
		- W와 B를 입력받을 때, 요소 별로 따로 입력 받기 위해 `list`로 `input()`을 받아준다
	2. 체스판 배열로 가능한 두 가지 경우를 리스트로 만들어 `white_start`, `black_start`로 할당해 준다.
	3. 입력받은 보드의 크기에서, 8x8 크기로 슬라이딩 하며 찍어내서 정답케이스와 비교 검증하여 최솟값을 출력해준다.
		- 8x8 크기로 찍어낸 보드를 하나씩 잘라내어,
		- 앞서 받아놓은 `white_start`, `black_start`와 요소별로 비교하며 다를 경우 카운트하여 `repaint_count_white`, `repaint_count_black`에 누적해준다.
		- `min_repaints`에 각 슬라이딩 보드 당 min값을 할당해 주어, 
		- 최종 최솟값을 출력해준다.

## 코드
```
n, m = map(int, input().split())

# MxN 크기의 보드를 리스트로 받아줌
chess_board = []
for i in range(n):
    row = list(input())  # "WB" -> ['W', 'B']로 변환
    chess_board.append(row)

# 가능한 정답 케이스 두가지를 리스트로 받아줌
white_start = [['W' if (i + j) % 2 == 0 else 'B' for j in range(8)] for i in range(8)]
black_start = [['B' if (i + j) % 2 == 0 else 'W' for j in range(8)] for i in range(8)]

min_repaints = float('inf')

from itertools import product

# NxM 크기의 보드에서, 8x8 크기의 보드를 슬라이딩하여 찍어내 정답 케이스와 비교
for i, j in product(range(n - 7), range(m - 7)):  # 0부터 n-8, m-8까지
    repaint_count_white = 0
    repaint_count_black = 0
    
    for x in range(8):
        for y in range(8):
            if chess_board[i + x][j + y] != white_start[x][y]:
                repaint_count_white += 1
            if chess_board[i + x][j + y] != black_start[x][y]:
                repaint_count_black += 1

    min_repaints = min(min_repaints, repaint_count_white, repaint_count_black)

print(min_repaints)
```

