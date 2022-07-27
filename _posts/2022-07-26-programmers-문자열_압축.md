---
layout: single
title:  "[프로그래머스] 문자열 압축"
categories: programmers
tag: [python, algolithm, level2, queue, programmers]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# 문자열 압축

[문자열 압축](https://school.programmers.co.kr/learn/courses/30/lessons/60057)

## 문제 설명

데이터 처리 전문가가 되고 싶은 "어피치"는 문자열을 압축하는 방법에 대해 공부를 하고 있습니다. 최근에 대량의 데이터 처리를 위한 간단한 비손실 압축 방법에 대해 공부를 하고 있는데, 문자열에서 같은 값이 연속해서 나타나는 것을 그 문자의 개수와 반복되는 값으로 표현하여 더 짧은 문자열로 줄여서 표현하는 알고리즘을 공부하고 있습니다.
간단한 예로 "aabbaccc"의 경우 "2a2ba3c"(문자가 반복되지 않아 한번만 나타난 경우 1은 생략함)와 같이 표현할 수 있는데, 이러한 방식은 반복되는 문자가 적은 경우 압축률이 낮다는 단점이 있습니다. 예를 들면, "abcabcdede"와 같은 문자열은 전혀 압축되지 않습니다. "어피치"는 이러한 단점을 해결하기 위해 문자열을 1개 이상의 단위로 잘라서 압축하여 더 짧은 문자열로 표현할 수 있는지 방법을 찾아보려고 합니다.

예를 들어, "ababcdcdababcdcd"의 경우 문자를 1개 단위로 자르면 전혀 압축되지 않지만, 2개 단위로 잘라서 압축한다면 "2ab2cd2ab2cd"로 표현할 수 있습니다. 다른 방법으로 8개 단위로 잘라서 압축한다면 "2ababcdcd"로 표현할 수 있으며, 이때가 가장 짧게 압축하여 표현할 수 있는 방법입니다.

다른 예로, "abcabcdede"와 같은 경우, 문자를 2개 단위로 잘라서 압축하면 "abcabc2de"가 되지만, 3개 단위로 자른다면 "2abcdede"가 되어 3개 단위가 가장 짧은 압축 방법이 됩니다. 이때 3개 단위로 자르고 마지막에 남는 문자열은 그대로 붙여주면 됩니다.

압축할 문자열 s가 매개변수로 주어질 때, 위에 설명한 방법으로 1개 이상 단위로 문자열을 잘라 압축하여 표현한 문자열 중 가장 짧은 것의 길이를 return 하도록 solution 함수를 완성해주세요.

## 제한사항

- s의 길이는 1 이상 1,000 이하입니다.
- s는 알파벳 소문자로만 이루어져 있습니다.

## 입출력 예

|s|result|
|:---|:---|
|"aabbaccc"|7|
|"ababcdcdababcdcd"|9|
|"abcabcdede"|8|
|"abcabcabcabcdededededede"|14|
|"xababcdcdababcdcd"|17|

## 입출력 예에 대한 설명

### 입출력 예 #1

문자열을 1개 단위로 잘라 압축했을 때 가장 짧습니다.

### 입출력 예 #2

문자열을 8개 단위로 잘라 압축했을 때 가장 짧습니다.

### 입출력 예 #3

문자열을 3개 단위로 잘라 압축했을 때 가장 짧습니다.

### 입출력 예 #4

문자열을 2개 단위로 자르면 "abcabcabcabc6de" 가 됩니다.
문자열을 3개 단위로 자르면 "4abcdededededede" 가 됩니다.
문자열을 4개 단위로 자르면 "abcabcabcabc3dede" 가 됩니다.
문자열을 6개 단위로 자를 경우 "2abcabc2dedede"가 되며, 이때의 길이가 14로 가장 짧습니다.

### 입출력 예 #5

문자열은 제일 앞부터 정해진 길이만큼 잘라야 합니다.
따라서 주어진 문자열을 x / ababcdcd / ababcdcd 로 자르는 것은 불가능 합니다.
이 경우 어떻게 문자열을 잘라도 압축되지 않으므로 가장 짧은 길이는 17이 됩니다.

## 시작 코드

```python
def solution(numbers):
    answer = 0
    return answer
```


# 문제 해석

- 문자열을 1개부터 문자열의 길이만큼 압축해서 각자 길이 중에 최소값을 구한다.
- 1개씩 압축하는 경우
    - aaabbb = 3a3b
    - abbaaa = a2b3a
- 2개씩 압축하는 경우
    - ababcbcb = 2ab2cb
    - aabab = aabab
    - 2칸씩 잘라서 생각을 해야한다. 2칸을 짤라서 그 다음 문자 2개와 중복이면 카운트를 해주고, 중복이 되지 않으면 그대로 쓰는 형식
    - 눈으로 봤을때는 aabab = a2ab 처럼 보이지만 aa / ba / b 이렇게 2개씩 쪼개 놓고 생각을 해야한다.
    - 이것을 이해하지 못하여서 2시간 동안 완전 잘못된 방식으로 코딩을 했다.


# 풀이

- queue에 문자열을 순서대로 넣어준다.
- count = 1 부터 시작이다. 
- 이유는 예를 들어 3개로 자른다고 생각을 하면 3개짜리 문자열은 index를 초과하지 않는 이상 무조건 1개는 존재하기 때문이다.
- queue가 무조건 j보다 크거나 같아야 루프를 돈다.
- 이유는 j개 만큼 자를려고 하는데 필자는 자를때마다 queue에서 문자를 j개만큼 삭제를 시켜줬다. 만약 j개보다 크지 않으면 삭제할 문자가 없기 때문이다.
    - j개 만큼 삭제하면서 삭제한 문자들을 temp에 집어넣어준다.
- 다음 j개 만큼 검사를 하기 위해 먼저 queue의 길이가 j보다 크거나 같은지 검사한다.
- 크거나 같다면?
    - queue는 slicing을 이용하지 못하기 때문에 자르는 크기만큼 a 라는 문자열에 집어넣어준다.
    - 만약 앞의 문자열 j개만큼 자른 temp와 남아있는 j개 만큼 자른 a가 같다면?
        - count를 1개 올려주고 temp 초기화
    - 같지 않다면?
        - count가 1이라면 압축할 수 있는 문자열이 없기 때문에 그대로 ans에 넣어준다.
    - 1이 아니라면?
        - count와 함께 temp 문자열을 ans에 넣어준다.
- while을 다 돌았는데 나오는 경우는 두가지이다.
- 하나는 len(s)가 j의 배수여서 깔끔하게 쪼개지거나
- 나머지 하나는 queue에 남아있는 문자들이 j개를 넘지 못하여 쪼개지 못하거나이다.
- 둘 다 결국 ans에 count와 쪼갠 문자열을 넣지 못했기 때문에
- count가 1일 경우
- 1이 아닌 경우로 나누어서 ans에 넣어준다.
- 그렇게 ans에 쌓인 문자열의 길이를 대조해가면서 min 값을 return 해준다. 

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

- 다른 사람은 zip 함수를 이용하여 미리 문자열을 j개 만큼씩 쪼개어서 풀었는데 굳이 볼 필요가 없다고 생각하여 넘겼다.
- 문제를 초반에 잘못 해석해서 시간이 많이 걸렸는데, 잘만 해석했다면 30분 안에도 풀 수 있는 난이도인것 같다.