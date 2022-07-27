---
layout: single
title:  "[프로그래머스] 소수 찾기"
categories: programmers
tag: [python, algolithm, level2, 에라토스테네스의 체, permutation, programmers]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# 소수 찾기

[소수 찾기](https://school.programmers.co.kr/learn/courses/30/lessons/42839?language=python3)

## 문제 설명

한자리 숫자가 적힌 종이 조각이 흩어져있습니다. 흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지 알아내려 합니다.

각 종이 조각에 적힌 숫자가 적힌 문자열 numbers가 주어졌을 때, 종이 조각으로 만들 수 있는 소수가 몇 개인지 return 하도록 solution 함수를 완성해주세요.

## 제한사항

- numbers는 길이 1 이상 7 이하인 문자열입니다.
- numbers는 0~9까지 숫자만으로 이루어져 있습니다.
- "013"은 0, 1, 3 숫자가 적힌 종이 조각이 흩어져있다는 의미입니다.

## 입출력 예

|numbers|return|
|:---|:---|
|"17"|3|
|"011"|2|

## 입출력 예 설명

예제 #1
[1, 7]으로는 소수 [7, 17, 71]를 만들 수 있습니다.

예제 #2
[0, 1, 1]으로는 소수 [11, 101]를 만들 수 있습니다.

- 11과 011은 같은 숫자로 취급합니다.

## 시작 코드

```python
def solution(numbers):
    answer = 0
    return answer
```


# 문제 해석

- 소수 찾기에 대해서는 백준에서 많이 풀어봐서 잘 알고 있다.
- 에라토스테네스의 체를 이용하여 문제를 풀면된다.
- 하지만 여기서 문자열로 숫자를 받아서 그 숫자들을 조합을 한 후, 그 숫자들이 소수인지 비교를 하여야 한다.
- 순열(permutations)을 이용하여 서로 다른 n개에서 r개를 선택할 때 순서를 고려하여, 중복없이 뽑아야 한다.
- 거기에 추가하여 11이 문자열로 들어오면 경우의 수 리스트로는 [1, 1, 11, 11] 이렇게 4가지가 나온다.
- 1과 11이 서로 중복되기 때문에 visit 리스트를 써서 만약 한번이라도 중복이 되었다면 그 수는 제외하도록 해야 한다.


# 풀이 1 (직접 푼 코드)

- 입력 받는 문자열의 길이는 1이상 7이하이다.
- 그렇다면 최대 소수는 9999999이 된다.
- 그러므로 중복 체크를 위한 visit 배열의 길이를 10000000로 설정해주고 0으로 초기화 해준다.
- max 값을 따로 설정해주는 이유는 순열을 써서 중복 없이 모든 경우의 수를 출력해도 마지막 수가 max가 아닐 수도 있기 때문에 max값을 잡아서 연산을 최대한 줄이고자 하기 위함이다.
- numbers 문자열을 permutations 함수를 이용하여 문자열 중에 1개를 뽑는 경우부터 문자열의 길이만큼 뽑는 것 까지 루프를 돌려준다.
- 우리는 문자열을 입력받았기 대문에 한 경우에 나온 문자열들을 전부 합쳐서 하나의 숫자로 만들어준다.
- 예를 들면 1645라는 문자열중에 2가지를 뽑은 경우 중에 하나는 ['1', '6']인 경우가 있다.
- sum이라는 변수를 빈 문자열로 초기화 해주고 1과 6을 합쳐주면 16이 된다.
- 거기에 만약 16이라는 수가 전에 나온적이 있다면 그냥 넘어가도록 하자.
- 만약 방문한 적이 없다면 방문 설정을 해준다.
- 그리고 모든 경우를 돌면서 max값도 찾아주기 위해서 max 값을 수시로 체크해준다.
- 그 후, 미리 선언해 놨던 comb 리스트에 한가지 경우의 수를 넣어준다.
- 에라토스테네스의 체는 최종 범위의 제곱근 까지만 체크를 해주면 되기 때문에 가장 max값의 제곱근을 구해준다.
- 소수 체크를 위해 visit 리스트를 max + 1 크기만큼 0으로 초기화를 해준다.
- 에라토스테네스 체를 이용하여 소수를 체크해준다.
- 그 후, comb 리스트에는 모든 경우의 수에 대한 숫자들이 저장되어 있다.
- 그 수 들이 소수인지 체크하여 소수라면 answer 값을 1 올려준다.


```python
import itertools
def solution(numbers):
    comb = []
    visit = [0] * 10000000
    max = 0
    for i in range(len(numbers)):
        for j in itertools.permutations(numbers, i + 1):
            sum = ""
            for k in range(len(j)):
                sum += j[k]
            if visit[int(sum)] == 1:
                continue
            visit[int(sum)] = 1
            if max < int(sum):
                max = int(sum)
            comb.append(int(sum))
    a = int(max ** (0.5))
    visit = [0] * (max + 1)
    visit[0] = 1
    visit[1] = 1
    for i in range(2, a + 1):
        for j in range(i + i, max + 1, i):
            visit[j] = 1
    answer = 0
    for i in comb:
        if visit[i] == 0:
            answer += 1
    return answer
```

# 풀이 2 (유명한 코드)

```python
from itertools import permutations
def solution(n):
    a = set()
    for i in range(len(n)):
        a |= set(map(int, map("".join, permutations(list(n), i + 1))))
    a -= set(range(0, 2))
    for i in range(2, int(max(a) ** 0.5) + 1):
        a -= set(range(i * 2, max(a) + 1, i))
    return len(a)
```

- 필자는 순열을 이용해서 나온 값들 중 중복 되는 값을 visit 리스트를 이용하여 체크를 해주었고, 경우의 수로 나온 문자열들을 다시 루프를 돌면서 더해주는 식으로 숫자를 만들었다.
- 하지만 우수 정답 코드에서는 그렇게 하지 않고 중복 되는 값을 set으로 없애주었고, join을 이용하여 각 permutations를 이용해 나온 숫자들을 한번에 합쳐주고 int로 다시 map을 해서 바로 숫자로 변환 시켜주었다.
- 순열, 문자열 합치기, 중복 체크를 코드 한줄로 정리하였다.
- 그리고 0, 1 은 어차피 소수가 아니기 때문에 빼주었다.
- 일단 여기서 배운 것은 |= 연산자이다. 합집합으로 생각하면 되는데, set을 통해 set 리스트들을 a에 |= 연산자를 이용해 덧붙여준 것이다.
- 그리고 set 끼리 - 연산자를 이용하여 제거를 해주었고, 에라토스테네스의 체에서도 set을 이용하여 이미 나온 숫자들에서 소수인 것들을 set 함수를 이용하여 제거해주었다.
- 그러니깐 이게 무슨 말이냐면 2, 3, 5 라는 set 리스트가 있는데, 에라토스테네스 메커니즘을 이용하여 이 숫자들이 소수에 해당되지 않으면 - 연산자를 이용하여 없애주었다.

# 고찰

- 파이썬의 성질을 정말 잘 이용한 코드를 보고 나니 현타가 왔다.
- set 리스트와 join, map 을 활용하는 능력을 보고 많이 깨달았다.
- 그리고 무엇보다 |= 합집합 연산자를 배우게 되어서 의미 깊은 시간이였다.