---
layout: single
title:  "[프로그래머스] 소수 찾기"
categories: programmers
tag: [python, algolithm, gold, heap, programmers]
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

numbers|return|
|---|---|
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

처음에 문제를 보고 잘못 해석해서 처음에 bisect 모듈을 이용한 bisect_left를 이용하여 풀이를 하였다. 하지만 간과한것이 bisect 모듈은 원소들이 정렬되어 있을때에만 정상 작동한다. 만약 정렬되어 있지 않고 섞여있다면 절대 쓰면 안됨.

카드들을 비교하는데 최소로 비교하는 횟수를 출력해야 한다.

여기서 실수한 것이, 30 40 50 60을 비교하는 것을 예로 들어보자

내가 생각한 방식은 (30 + 40) + (70 + 50) + (120 + 60) = 370이다.

그런데 30과 40을 비교하고 나서 70이 나왔으면 70보다 작은 수인 50과 60을 먼저 비교하고 후에 비교를 해야한다.

즉, (30 + 40) + (50 + 60) + (70 + 110) = 360이다.

입력받은 리스트들을 가장 최적의 시간으로 최소값을 뽑아내야 하는 알고리즘은 최소힙이 있다. 그리고 더한 결과도 힙에 넣어주면 알아서 최소값들을 뽑아내준다.


# 풀이

- 한줄씩 입력 받을 때마다 heappush를 해준다.
- N - 1번 루프를 돌면서 가장 작은 수와, 그 다음 작은 수를 heappop해서 더한 후 다시 heappush를 해준다. 물론 push 하기 전에 더한 수를 ans라는 리스트에 넣어준다. 왜냐면 이것또한 더해줘야 하기 때문이다.
- 또 하나의 예외가 있는데 N이 만약 1이라면 비교할 필요가 없으니 0을 출력 해줘야한다.

```python
import sys
import heapq

N = int(sys.stdin.readline())

card = []



for i in range(N):
    heapq.heappush(card, int(sys.stdin.readline()))


ans = []


if N == 1:
    print(0)
    exit()

for i in range(N - 1):
    pop_1 = heapq.heappop(card)
    pop_2 = heapq.heappop(card)
    card_sum = pop_1 + pop_2
    ans.append(card_sum)
    heapq.heappush(card, card_sum)
print(sum(ans))
    
```

# 고찰

- 문제가 너무 쉬워보여서 자신만만하게 이진 탐색으로 접근을 했는데, 만약 bisect 모듈에 대해서 자세히 알고 있었으면 시도도 안했을 것이다. 
- 최소힙은 O(nlogn)의 시간 복잡도를 가지고 있다. 
- 문제에서 입력값이 10^5을 가지고 있으니 무조건 O(nlogn)으로 풀어야한다.
- 문제를 좀 더 자세히 보고 분석한 후 코딩을 하도록 하자. 제발!