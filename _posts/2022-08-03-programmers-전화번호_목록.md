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

# 전화번호 목록

[전화번호 목록](https://school.programmers.co.kr/learn/courses/30/lessons/42577)

## 문제 설명
---
전화번호부에 적힌 전화번호 중, 한 번호가 다른 번호의 접두어인 경우가 있는지 확인하려 합니다.
전화번호가 다음과 같을 경우, 구조대 전화번호는 영석이의 전화번호의 접두사입니다.

- 구조대 : 119
- 박준영 : 97 674 223
- 지영석 : 11 9552 4421

전화번호부에 적힌 전화번호를 담은 배열 phone_book 이 solution 함수의 매개변수로 주어질 때, 어떤 번호가 다른 번호의 접두어인 경우가 있으면 false를 그렇지 않으면 true를 return 하도록 solution 함수를 작성해주세요.


## 제한사항
---
- phone_book의 길이는 1 이상 1,000,000 이하입니다.
    - 각 전화번호의 길이는 1 이상 20 이하입니다.
    - 같은 전화번호가 중복해서 들어있지 않습니다.

## 입출력 예
---

|phone_book|return|
|:---|:---|
|["119","97674223","1195524421"]|false|
|["123","456","789"]|true|
|["12","123","1235","567","88"]|false|


## 입출력 예 설명
---

입출력 예 #1

앞에서 설명한 예와 같습니다.

입출력 예 #2

한 번호가 다른 번호의 접두사인 경우가 없으므로, 답은 true입니다.

입출력 예 #3

첫 번째 전화번호, “12”가 두 번째 전화번호 “123”의 접두사입니다. 따라서 답은 false입니다.


# 문제 해석

- 문자열 sort()의 특성만 잘 이해하면 편하게 풀 수 있다.
- 하지만 필자는 처음에 문자열 sort()의 특성에 대해 생각하지 않고 연산양을 줄일 생각만 하였다.


# 풀이

- 처음 푼 코드이다
- 문자열의 길이를 기준으로 정렬을 한다.
- 만약 첫번째 문자열의 길이와 마지막 문자열의 길이가 같다면 접두사가 같은 번호는 존재하지 않기 때문에 True를 리턴
- 2중 포문을 돌면서 체크를 해준다.
    - 만약 두개의 길이가 같다면?
        - 접두사는 같을 수 없기 때문에 continue
    - startswith을 이용하여 접두사 체크
    - 같다면?
        - False 리턴

```python
import sys
def solution(phone_book):
    answer = True 
    phone_book.sort(key = len)
    if len(phone_book[0]) == len(phone_book[len(phone_book) - 1]):
        return True
    for i in range(len(phone_book)):
        for j in range(i + 1, len(phone_book)):
            if len(phone_book[i]) == len(phone_book[j]):
                continue
            if phone_book[j].startswith(phone_book[i]):
                return False
    return answer
```

- 연산양을 줄이기 위해서 앞에 if문을 통해 최악의 경우를 피했지만 결국은 O(n^2)이다.
- 여기서 생각해야 할 것은 문자열 sort의 기본 성질이다.
- 그냥 sort()를 한 후 접두사가 같은 것을 기준으로 길이가 적은것이 맨 앞에 온다.
- 그렇다면 O(n)만 돌리면서 바로 다음 문자만 체크해주면 된다.
- 만약 다음 문자를 체크했는데 접두사가 같지 않다면 그 다음 문자도 접두사가 같을 수가 없다.


```python
import sys
def solution(phone_book):
    answer = True
    phone_book.sort()
    for i in range(len(phone_book) - 1):
        if phone_book[i] == phone_book[i + 1][ : len(phone_book[i])]:
            return False
    return answer
```

- 이렇게 되면 굳이 다른 조건 없이 sort 한번만 해주면 나머지 연산은 O(n)이다. 

![image](https://user-images.githubusercontent.com/95459089/182551411-8fed122e-405d-46ae-9b82-642884275cbc.png)

- sort의 연산은 O(nlogn)이다.
- 입력 값의 범위는 1,000,000 즉, 10^4이다.
- 그렇다면 sort를 제외한 연산은 루프 n번만 돌아야 한다.


# 고찰

- 머리를 쎄게 한대 맞은 느낌이였다.
- 기초에 대해 충실히 공부하도록 하자.