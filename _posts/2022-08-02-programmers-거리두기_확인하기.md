---
layout: single
title:  "[프로그래머스] 거리두기 확인하기"
categories: programmers
tag: [python, algolithm, level2, bfs , programmers]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# 거리두기 확인하기

[거리두기 확인하기](https://school.programmers.co.kr/learn/courses/30/lessons/81302)

## 문제 설명
---
개발자를 희망하는 죠르디가 카카오에 면접을 보러 왔습니다.

코로나 바이러스 감염 예방을 위해 응시자들은 거리를 둬서 대기를 해야하는데 개발 직군 면접인 만큼
아래와 같은 규칙으로 대기실에 거리를 두고 앉도록 안내하고 있습니다.
1. 대기실은 5개이며, 각 대기실은 5x5 크기입니다.
2. 거리두기를 위하여 응시자들 끼리는 맨해튼 거리1가 2 이하로 앉지 말아 주세요.
3. 단 응시자가 앉아있는 자리 사이가 파티션으로 막혀 있을 경우에는 허용합니다.

예를 들어,

![스크린샷 2022-08-02 오전 3 41 23](https://user-images.githubusercontent.com/88064555/182220810-4b7f072f-3fbc-4439-920e-123a331f4577.png)

5개의 대기실을 본 죠르디는 각 대기실에서 응시자들이 거리두기를 잘 기키고 있는지 알고 싶어졌습니다. 자리에 앉아있는 응시자들의 정보와 대기실 구조를 대기실별로 담은 2차원 문자열 배열 places가 매개변수로 주어집니다. 각 대기실별로 거리두기를 지키고 있으면 1을, 한 명이라도 지키지 않고 있으면 0을 배열에 담아 return 하도록 solution 함수를 완성해 주세요.



## 제한사항
---
- places의 행 길이(대기실 개수) = 5
    - places의 각 행은 하나의 대기실 구조를 나타냅니다.
- places의 열 길이(대기실 세로 길이) = 5
- places의 원소는 P,O,X로 이루어진 문자열입니다.
    - places 원소의 길이(대기실 가로 길이) = 5
    - P는 응시자가 앉아있는 자리를 의미합니다.
    - O는 빈 테이블을 의미합니다.
    - X는 파티션을 의미합니다.
- 입력으로 주어지는 5개 대기실의 크기는 모두 5x5 입니다.
- return 값 형식
    - 1차원 정수 배열에 5개의 원소를 담아서 return 합니다.
    - places에 담겨 있는 5개 대기실의 순서대로, 거리두기 준수 여부를 차례대로 배열에 담습니다.
    - 각 대기실 별로 모든 응시자가 거리두기를 지키고 있으면 1을, 한 명이라도 지키지 않고 있으면 0을 담습니다.

## 입출력 예
---
![스크린샷 2022-08-02 오전 3 43 37](https://user-images.githubusercontent.com/88064555/182221142-acf6cc3f-c0f5-4d66-8d62-308e77154d3c.png)

## 입출력 예 설명
입출력 예 #1

첫 번째 대기실
```
.	0	1	2	3	4
0	P	O	O	O	P
1	O	X	X	O	X
2	O	P	X	P	X
3	O	O	X	O	X
4	P	O	X	X	P
```
- 모든 응시자가 거리두기를 지키고 있습니다.

두 번째 대기실
```
No.	0	1	2	3	4
0	P	O	O	P	X
1	O	X	P	X	P
2	P	X	X	X	O
3	O	X	X	X	O
4	O	O	O	P	P
```

- (0, 0) 자리의 응시자와 (2, 0) 자리의 응시자가 거리두기를 지키고 있지 않습니다.
- (1, 2) 자리의 응시자와 (0, 3) 자리의 응시자가 거리두기를 지키고 있지 않습니다.
- (4, 3) 자리의 응시자와 (4, 4) 자리의 응시자가 거리두기를 지키고 있지 않습니다.

세 번째 대기실
```
No.	0	1	2	3	4
0	P	X	O	P	X
1	O	X	O	X	P
2	O	X	P	O	X
3	O	X	X	O	P
4	P	X	P	O	X
```
- 모든 응시자가 거리두기를 지키고 있습니다.

네 번째 대기실
```
No.	0	1	2	3	4
0	O	O	O	X	X
1	X	O	O	O	X
2	O	O	O	X	X
3	O	X	O	O	X
4	O	O	O	O	O
```

- 대기실에 응시자가 없으므로 거리두기를 지키고 있습니다.

다섯 번째 대기실
```
No.	0	1	2	3	4
0	P	X	P	X	P
1	X	P	X	P	X
2	P	X	P	X	P
3	X	P	X	P	X
4	P	X	P	X	P
```

- 모든 응시자가 거리두기를 지키고 있습니다.

두 번째 대기실을 제외한 모든 대기실에서 거리두기가 지켜지고 있으므로, 배열 [1, 0, 1, 1, 1]을 return 합니다.

## 제한시간 안내

- 정확성 테스트 : 10초
※ 공지 - 2022년 4월 25일 테스트케이스가 추가되었습니다.

두 테이블 T1, T2가 행렬 (r1, c1), (r2, c2)에 각각 위치하고 있다면, T1, T2 사이의 맨해튼 거리는 |r1 - r2| + |c1 - c2| 입니다.

# 문제 해석

- 전형적인 bfs 문제이다.
- 상, 하, 좌, 우를 검색하면서 빈 테이블이 있는 곳만 탐색하여 queue에 append해준다.
- count 값까지 queue에 넣어주어서 count가 2까지 올라가면 맨허튼 거리가 2를 초과하므로 거리 두기를 만족한다.
- X는 벽이라고 생각해서 고려하지 않고, P를 count가 2 올라가기 전에 만나면 거리두기가 되지 않은 것으로 고려한다.
- 처음 시작때 queue에 P가 위치한 인덱스만 넣어준다.


# 풀이

- P = 응시자가 앉아있는 자리
- 0 = 빈 테이블
- X = 파티션

- 거리두기 지킬 조건
    - 맨허튼 거리 3 이상
    - 파티션이 응시자 사이를 막고 있는 경우


- bfs 이용
- 상, 하, 좌, 우 검사
- 0으로 된것만 이동 가능
- 두 번 이하로 이동했는데 P가 또 나오면 return 0
- 두 번을 넘게 이동했는데 P가 안나오면 queue에 안집어넣음
- visit를 굳이 쓰지 않고 어차피 두번까지만 검사하면 되기 때문에 
- queue에 넣을 때 현재 자기의 위치 index와 2를 넘는지 체크하기 위한 count 변수까지 같이 넣어준다.
- 이전 좌표와 상,하,좌,우 검사 중 업데이트한 좌표가 같다면 이미 방문을 했기 때문에 skip한다.

```python
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
                else:
                    if count == 1:
                        ans += temp
                    else:
                        ans += str(count) + temp
                    count = 1
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
```


# 고찰

- bfs에 대해서 익숙하기 때문에 문제를 풀기 쉬웠다.