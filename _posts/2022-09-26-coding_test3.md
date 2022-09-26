---
layout: single
title:  "코딩 테스트 책 - 3차시"
categories : coding-test
tag : [이것이 취업을 위한 코딩 테스트다, python, 나동빈]
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=코딩 테스트 책 - 3차시&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

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


