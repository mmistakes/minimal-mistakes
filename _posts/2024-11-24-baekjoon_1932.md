---
layout: single
title:  "[python] 백준 1932번 문제풀이"
categories: coding
tags: [python, blog, baekjoon] 
toc : true
author_profile : false 
---

백준 1932번 정수 삼각형 문제 풀이를 해보겠습니다.


출처 : [백준](https://www.acmicpc.net/problem/1932)

#### 문제
![삼각형](/assets/images/baekjoon_1932.png)

위 그림은 크기가 5인 정수 삼각형의 한 모습이다.

맨 위층 7부터 시작해서 아래에 있는 수 중 하나를 선택하여 아래층으로 내려올 때, 이제까지 선택된 수의 합이 최대가 되는 경로를 구하는 프로그램을 작성하라. 아래층에 있는 수는 현재 층에서 선택된 수의 대각선 왼쪽 또는 대각선 오른쪽에 있는 것 중에서만 선택할 수 있다.

삼각형의 크기는 1 이상 500 이하이다. 삼각형을 이루고 있는 각 수는 모두 정수이며, 범위는 0 이상 9999 이하이다.
#### 입력
첫째 줄에 삼각형의 크기 n(1 ≤ n ≤ 500)이 주어지고, 둘째 줄부터 n+1번째 줄까지 정수 삼각형이 주어진다.
#### 출력
첫째 줄에 합이 최대가 되는 경로에 있는 수의 합을 출력한다.

#### 풀이
문제 설명: 각 층의 모든 칸마다 최댓값을 저장하면서 동적 계획법으로 푸는 문제

RGB거리 문제와 비슷한 방식으로 동작하는 문제이다.

[RGB거리 풀이보러가기](https://hidokim.github.io/coding/second_post/)

RGB문제는 색과 가격 모두를 고려해야하는 반면, 이 문제는 가격만 고려하면 된다.

하지만 N개의 줄 각각의 길이가 다르기 때문에 이를 추가로 고려해야 한다. 

i번째 줄에 있을 때 i-1번째 줄의 수를 선택하는 3가지의 경우가 있다.
1. 가장 왼쪽에 있는 경우
2. 가장 오른쪽에 있는 경우
3. 가운데에 있는 경우

가장 왼쪽과 오른쪽에 있는 경우에는 선택할 수 있는 숫자가 1개 뿐이지만, 가운데에 있는 경우 선택할 수 있는 숫자가 2개이다. 

가운데의 경우에는 둘 중 더 큰 숫자를 선택하는 방식으로 문제를 풀어보겠다.

#### 코드
```python
import sys
input = sys.stdin.readline

def main():
    N = int(input())
    integer = [list(map(int, input().split())) for _ in range(N)] 
    # 정수를 삼각형 모양의 2차원 리스트로 저장받음

    dp = [[0] * (i + 1) for i in range(N)]
    # 2차원 리스트를 0으로 초기화하며 생성
    dp[0][0] = integer[0][0] # 첫번째 입력으로 초기화
   
    for i in range(1,N) :
        for j in range(len(integer[i])) : #i번째 리스트의 길이만큼 반복
            if j == 0 : # 가장 왼쪽일때
                dp[i][j] = dp[i-1][j] + integer[i][j] # 오른쪽 대각선 위 숫자를 더하는 경우만 존재
            elif j == len(integer[i]) - 1 : # 가장 오른쪽일때
                dp[i][j] = dp[i-1][j-1] + integer[i][j] # 왼쪽 대각선 위 숫자를 더하는 경우만 존재
            else : # 오른쪽 대각선 위, 왼쪽 대각선 위 숫자중 큰 수를 더함
                dp[i][j] = max(dp[i-1][j-1], dp[i-1][j]) + integer[i][j]
    
    print(max(dp[N-1])) # 가장 큰 결과를 프린트

main()

```