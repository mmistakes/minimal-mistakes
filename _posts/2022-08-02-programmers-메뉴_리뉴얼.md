---
layout: single
title:  "[프로그래머스] 메뉴 리뉴얼"
categories: programmers
tag: [python, algolithm, level2, dict, combination, counter, programmers]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# 메뉴 리뉴얼

[메뉴 리뉴얼](https://school.programmers.co.kr/learn/courses/30/lessons/72411)

## 문제 설명
---
레스토랑을 운영하던 스카피는 코로나19로 인한 불경기를 극복하고자 메뉴를 새로 구성하려고 고민하고 있습니다.
기존에는 단품으로만 제공하던 메뉴를 조합해서 코스요리 형태로 재구성해서 새로운 메뉴를 제공하기로 결정했습니다. 어떤 단품메뉴들을 조합해서 코스요리 메뉴로 구성하면 좋을 지 고민하던 "스카피"는 이전에 각 손님들이 주문할 때 가장 많이 함께 주문한 단품메뉴들을 코스요리 메뉴로 구성하기로 했습니다.
단, 코스요리 메뉴는 최소 2가지 이상의 단품메뉴로 구성하려고 합니다. 또한, 최소 2명 이상의 손님으로부터 주문된 단품메뉴 조합에 대해서만 코스요리 메뉴 후보에 포함하기로 했습니다.
예를 들어, 손님 6명이 주문한 단품메뉴들의 조합이 다음과 같다면,
(각 손님은 단품메뉴를 2개 이상 주문해야 하며, 각 단품메뉴는 A ~ Z의 알파벳 대문자로 표기합니다.)

```
손님 번호	주문한 단품메뉴 조합
1번 손님	A, B, C, F, G
2번 손님	A, C
3번 손님	C, D, E
4번 손님	A, C, D, E
5번 손님	B, C, F, G
6번 손님	A, C, D, E, H
```
가장 많이 함께 주문된 단품메뉴 조합에 따라 "스카피"가 만들게 될 코스요리 메뉴 구성 후보는 다음과 같습니다.

```
코스 종류	메뉴 구성	설명
요리 2개 코스	A, C	1번, 2번, 4번, 6번 손님으로부터 총 4번 주문됐습니다.
요리 3개 코스	C, D, E	3번, 4번, 6번 손님으로부터 총 3번 주문됐습니다.
요리 4개 코스	B, C, F, G	1번, 5번 손님으로부터 총 2번 주문됐습니다.
요리 4개 코스	A, C, D, E	4번, 6번 손님으로부터 총 2번 주문됐습니다.
```

## 문제
---
각 손님들이 주문한 단품메뉴들이 문자열 형식으로 담긴 배열 orders, "스카피"가 추가하고 싶어하는 코스요리를 구성하는 단품메뉴들의 갯수가 담긴 배열 course가 매개변수로 주어질 때, "스카피"가 새로 추가하게 될 코스요리의 메뉴 구성을 문자열 형태로 배열에 담아 return 하도록 solution 함수를 완성해 주세요.

## 제한사항
---
- orders 배열의 크기는 2 이상 20 이하입니다.
- orders 배열의 각 원소는 크기가 2 이상 10 이하인 문자열입니다.
    - 각 문자열은 알파벳 대문자로만 이루어져 있습니다.
    - 각 문자열에는 같은 알파벳이 중복해서 들어있지 않습니다.
- course 배열의 크기는 1 이상 10 이하입니다.
    - course 배열의 각 원소는 2 이상 10 이하인 자연수가 오름차순으로 정렬되어 있습니다.
    - course 배열에는 같은 값이 중복해서 들어있지 않습니다.
- 정답은 각 코스요리 메뉴의 구성을 문자열 형식으로 배열에 담아 사전 순으로 오름차순 정렬해서 return 해주세요.
    - 배열의 각 원소에 저장된 문자열 또한 알파벳 오름차순으로 정렬되어야 합니다.
    - 만약 가장 많이 함께 주문된 메뉴 구성이 여러 개라면, 모두 배열에 담아 return 하면 됩니다.
    - orders와 course 매개변수는 return 하는 배열의 길이가 1 이상이 되도록 주어집니다.

## 입출력 예
---
![스크린샷 2022-08-02 오전 3 51 27](https://user-images.githubusercontent.com/88064555/182222290-b58b0bf1-e379-4feb-a637-94619ddae1b8.png)

## 입출력 예 설명
---

입출력 예 #1
문제의 예시와 같습니다.

입출력 예 #2
AD가 세 번, CD가 세 번, ACD가 두 번, ADE가 두 번, XYZ 가 두 번 주문됐습니다.
요리 5개를 주문한 손님이 1명 있지만, 최소 2명 이상의 손님에게서 주문된 구성만 코스요리 후보에 들어가므로, 요리 5개로 구성된 코스요리는 새로 추가하지 않습니다.

입출력 예 #3
WX가 두 번, XY가 두 번 주문됐습니다.
3명의 손님 모두 단품메뉴를 3개씩 주문했지만, 최소 2명 이상의 손님에게서 주문된 구성만 코스요리 후보에 들어가므로, 요리 3개로 구성된 코스요리는 새로 추가하지 않습니다.
또, 단품메뉴를 4개 이상 주문한 손님은 없으므로, 요리 4개로 구성된 코스요리 또한 새로 추가하지 않습니다.

# 문제 해석

- 입력 받은 메뉴들 중에서 가장 많이 나온 메뉴들을 조합하는 것이다.
- course에서 몇개씩 골라야 하는지 나오기 때문에 코스에 나온 숫자들로 조합을 하면 된다.
- 메뉴에서는 알파벳 순서와 상관없이 나오기 때문에 조합하기 이전에 sorted 함수를 써서 각 문자열을 정렬해주어야 한다.
    - 만약 sorted를 하지 않고 조합을 한다면 AF, FA가 서로 다르게 나온다. 
    - combination을 써야하는데 permutation 처럼 나올 수 있기 때문이다.
- 여기서 주의해야 할 점은 모든 알파벳을 조합하면 안된다. 각 메뉴들에 나온 문자열들을 이용하여 조합을 하여야 시간초과가 나오지 않는다.
- 각 조합하여 나온 알파벳들을 이용하여 손님들이 시킨 메뉴(orders)에서 조합 알파벳들이 많이 나오는 것들을 course에 맞게 출력해준다.


# 풀이 (내가 푼것)

- ordes는 정렬되어서 나온 문자열들이 아니다.
- 그렇기 때문에 sorted를 이용하여 전부 정렬시키고 sort_orders에 넣어준다.
- 정렬시킨것을 이용하여 각 메뉴들을 course에 맞게 조합하여 c에 저장해준다.
- 하지만 여기서 코드를 줄일 수 있다.
- 필자는 따로 sorted를 시켜서 sort_orders에 집어넣은 후 combinations를 이용하여 c에 코스에 맞는 조합을 넣어주었다.
- 하지만 이것을 확실히 줄일 수 있다.

```python
# 필자가 쓴 코드
sort_orders = []
for i in orders:
    sort_orders.append("".join(sorted(i)))
    for i in course:
        c = set()
        for z in sort_orders:
            c |= set(map("".join, combinations(z, i)))
# 줄인 코드
for course_size in course:
        order_combinations = []
        for order in orders:
            order_combinations += itertools.combinations(sorted(order), course_size)
```

- 비슷하긴 하지만 위에서는 for문을 따로 돌리면서 sorted를 했지만 줄인 코드에서는 orders를 탐색하면서 동시에 sorted를 하고 combinations를 뽑아낸다.
- 굳이 sort_orders라는 메모리를 사용하지 않아도 된다.
- 그 후 dictionary를 이용하여 각 조합들을 이용해 count를 올려준다.
- set의 교집합을 이용하여 각 메뉴들과 조합들의 교집합을 a라는 변수에 저장해주고 다시 sort를 시킨 후, 그것이 코스 갯수와 같다면 dict의 value를 올려준다.
- 이렇게 하면 한 코스의 dictinary가 완성이 된다. 
- 여기서 values()라는 함수와 max 함수를 이용해 value들의 최대치를 뽑아준다.
- 그리고 dict를 탐색하면서 max_value를 가진 값들이면서 1보다 큰 값을 answer에 넣어준다.
- 코스의 개수로 정렬을 하는 것이 아닌 알파벳 순서로 정답을 정렬해야 하기 때문에 다시 answer를 sort해준다.

```python
from itertools import combinations
import sys

def solution(orders, course):
    answer = []
 
    sort_orders = []
    for i in orders:
        sort_orders.append("".join(sorted(i)))

    for i in course:
        c = set()
        for z in sort_orders:
            c |= set(map("".join, combinations(z, i)))
        dict_alpha = dict()
        for j in c:
            dict_alpha[j] = 0
        for q in sort_orders:
            for k in c:
                a = set(q) & set(k)
                a_list = list(a)
                a_list.sort()
                str_a = "".join(a_list)
                if len(a) == len(k):
                    dict_alpha[str_a] += 1
        if len(dict_alpha) == 0:
            continue
        max_value = max(dict_alpha.values())
        for i in dict_alpha:
            if dict_alpha[i] == max_value and max_value > 1:
                answer.append(i)
    
    answer.sort()
    return answer
```

# 풀이 (best 풀이)

- 위에서는 조합을 이용하여 조합에 맞게 dict의 value값들을 올려주어서 max값을 비교해 해당 key값을 answer에 집어넣어주었다.
- 하지만 여기서는 조합을 이용하고 collections 모듈의 counter 함수의 most_common()을 이용하여 각 메뉴들에게서 나온 조합들을 dict로 가장 많은 순으로 배치시켜준다.
- most_ordered[0][0]에는 가장 많이 나온 조합이 나오게 되고, most_ordered[0][1]에는 value값이 나온다.
- 그래서 most_ordered를 탐색하면서 value가 1보다 크고, 가장 많이 나온 value와 같은 값을 가진 조합을 result에 넣어준다.
- 그리고 알파벳순으로 정렬한 후 문자열화 시킨다.

```python
import collections
import itertools

def solution(orders, course):
    result = []

    for course_size in course:
        order_combinations = []
        for order in orders:
            order_combinations += itertools.combinations(sorted(order), course_size)

        most_ordered = collections.Counter(order_combinations).most_common()
        result += [ k for k, v in most_ordered if v > 1 and v == most_ordered[0][1] ]

    return [ ''.join(v) for v in sorted(result) ]
```


# 고찰

- most_common() 함수를 알았다면 쉽게 풀 수 있었던 문제이다. 
- 파이썬의 이점을 잘 활용하도록 하자.