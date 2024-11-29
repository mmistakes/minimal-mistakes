---
layout: single
title:  "[python] 백준 9461번 문제풀이"
categories: coding
tags: [python, blog, baekjoon] 
toc : true
author_profile : false 
---

백준 9461번 파도반 수열 문제 풀이를 해보겠습니다.


출처 : [백준](https://www.acmicpc.net/problem/9461)
#### 문제
오른쪽 그림과 같이 삼각형이 나선 모양으로 놓여져 있다. 첫 삼각형은 정삼각형으로 변의 길이는 1이다. 그 다음에는 다음과 같은 과정으로 정삼각형을 계속 추가한다. 나선에서 가장 긴 변의 길이를 k라 했을 때, 그 변에 길이가 k인 정삼각형을 추가한다.

파도반 수열 P(N)은 나선에 있는 정삼각형의 변의 길이이다. P(1)부터 P(10)까지 첫 10개 숫자는 1, 1, 1, 2, 2, 3, 4, 5, 7, 9이다.

N이 주어졌을 때, P(N)을 구하는 프로그램을 작성하시오.

#### 입력
첫째 줄에 테스트 케이스의 개수 T가 주어진다. 각 테스트 케이스는 한 줄로 이루어져 있고, N이 주어진다. (1 ≤ N ≤ 100)

#### 출력
각 테스트 케이스마다 P(N)을 출력한다.

#### 풀이
문제 설명: 피보나치 수와 비슷한 규칙을 찾아 동적 계획법으로 푸는 문제

n이 1,2,3일때 1이고 n이 4,5일때 2이다.

n이 6이상이면 아래와 같은 점화식이 만들어 진다.
* wave(6) = wave(5) + wave(1)
* wave(7) = wave(6) + wave(2)
* wave(n) = wave(n-1) + wave(n-5)

n이 1~5일때의 값은 미리 저장해 놓고 6이상이면 저장해 놓은 값을 이용하여 계산한다.
#### 코드
```python
import sys
input = sys.stdin.readline

def wave(n) :
    if n == 1 or n == 2 or n == 3:
        return 1
    elif n == 4 or n == 5:
        return 2

    dp = [0] * (n+1)
    dp[1], dp[2], dp[3] = 1, 1, 1
    dp[4], dp[5] = 2, 2

    for i in range(6, n+1) :
        dp[i] = dp[i-1] + dp[i-5]
    
    return dp[n]

def main() :
    T  = int(input().strip())
    for _ in range(T) :
        n = int(input().strip())
        print(wave(n))

main()
    
```