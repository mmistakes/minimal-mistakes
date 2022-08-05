---
layout: single
title:  "[프로그래머스] 전화번호 목록"
categories: programmers
tag: [python, algolithm, level2, sort, programmers]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# N으로 표현

[Class2] [N으로 표현](https://school.programmers.co.kr/learn/courses/30/lessons/42895)

## 문제 설명
---
아래와 같이 5와 사칙연산만으로 12를 표현할 수 있습니다.

12 = 5 + 5 + (5 / 5) + (5 / 5)

12 = 55 / 5 + 5 / 5

12 = (55 + 5) / 5

5를 사용한 횟수는 각각 6,5,4 입니다. 그리고 이중 가장 작은 경우는 4입니다.

이처럼 숫자 N과 number가 주어질 때, N과 사칙연산만 사용해서 표현 할 수 있는 방법 중 N 사용횟수의 최솟값을 return 하도록 solution 함수를 작성하세요.


## 제한사항
---
- N은 1 이상 9 이하입니다.
- number는 1 이상 32,000 이하입니다.
- 수식에는 괄호와 사칙연산만 가능하며 나누기 연산에서 나머지는 무시합니다.
- 최솟값이 8보다 크면 -1을 return 합니다.

## 입출력 예
---

|N|number|return|
|:---|:---|:---|
|5|12|4|
|2|11|3|

## 입출력 예 설명
---

예제 #1

문제에 나온 예와 같습니다.

예제 #2

```
11 = 22 / 2
``` 

와 같이 2를 3번만 사용하여 표현할 수 있습니다



# 문제 해석

- 프로그래머스 문제 분류에 dp라고 써있다.
- 만약 dp인것을 몰랐다면 많이 해맸을것이다.
- N이라는 숫자가 나올 수 있는 최대치는 8개까지이다.
- dp를 무엇으로 기준으로 잡냐에 따라서 문제를 풀 수 있고 없고가 갈린다.
- 보통 dp에서는 범위가 작게 나온 것이 기준이 되는 경우가 많다.


# 풀이

- 5를 예시로 들어보자.
1. 5를 1번 사용
    - 5
2. 5를 2번 사용
    - 55, (5 * 5), (5 / 5), (5 - 5), (5 + 5)
        - 55, 25, 1, 0, 10
3. 5를 3번 사용
    - 555, (55 * 5), (55 / 5), (55 - 5), (55 + 5)
    - ((5 * 5) * 5), ((5 * 5) / 5), ((5 * 5) + 5), ((5 * 5) -5)
    - ((5 / 5) * 5), ((5 / 5) / 5), ((5 / 5) + 5), ((5 / 5) -5) 
    - ((5 + 5) * 5), ((5 + 5) / 5), ((5 + 5) + 5), ((5 + 5) -5)
    - ((5 - 5) * 5), ((5 - 5) / 5), ((5 - 5) + 5), ((5 - 5) -5)

- 여기에는 규칙이 있다.
1. 5를 1번 사용 
    - 1번 사용
2. 5를 2번 사용
    - 1번 사용 (사칙 연산) 1번 사용
3. 5를 3번 사용
    - 1번 사용 (사칙 연산) 2번 사용
    - 2번 사용 (사칙 연산) 1번 사용
4. 5를 4번 사용
    - 1번 사용 (사칙 연산) 3번 사용
    - 2번 사용 (사칙 연산) 2번 사용
    - 3번 사용 (사칙 연산) 1번 사용

- **점화식**

```python
dp[i]의 원소 = dp[i - j]의 원소 (사칙연산) dp[j]
```

```python
def solution(N, number):
    dp = [[] for _ in range(9)]
    for i in range(1, 9):
        comb_list = set()
        comb_list.add(int(str(N) * i))
        for j in range(1, i):
            for comb1 in dp[i - j]:
                for comb2 in dp[j]:
                    plus = comb1 + comb2
                    minus = comb1 - comb2
                    mul = comb1 * comb2
                    if comb2 != 0:
                        div = comb1 / comb2
                        if div % 1 == 0:
                            comb_list.add(int(div))
                    comb_list.add(plus)
                    comb_list.add(mul)
                    if minus >= 0:
                        comb_list.add(minus)
        if number in comb_list:
            return i
        for q in comb_list:
            dp[i].append(q)
    return -1
```


# 고찰

- 이 문제에 첫번째 키는 dp이다.
- 만약 dp인것을 못찾았다면 이 문제의 유형을 복습하면서 잘 써먹도록 하자.
- 두번째 키는 무엇을 기준으로 dp를 쓸까인가 이다.
- N으로 할지, number로 할지, N의 갯수로 할지를 잘 파악해야 한다.
- 보통 제한 범위가 짧은 것을 하는것이 좋다.