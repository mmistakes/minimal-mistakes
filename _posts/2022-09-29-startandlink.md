---
layout: single
title:  "스타트와 링크"
categories: BOJ, CodingTest
tag: [브루트포스, 백트래킹]
toc: true
author_profile: false
sidebar: 
    nav: "docs"
---

# 14889, 스타트와 링크

## 최초 접근법

조합을 이용하여 절반씩 나누었을 때 가능한 조합을 만들어 스코어를 비교하는 식으로 접근하였다. 

![KakaoTalk_20220929_211928908](../../images/2022-09-29-startandlink/KakaoTalk_20220929_211928908.jpg)

## 코드

```python
from itertools import combinations


n = int(input())
arr = set()
ans = set()

for i in range(1, n+1):
    arr.add(i)
    
cases = list(combinations(arr, n//2))
graph = [list(map(int, input().split())) for _ in range(n)]

for i in range(0, (len(cases)//2) + 1):
    score_start = 0
    score_link = 0
    start = list(cases[i])
    link =list(cases[-i-1])
    for j in start:
        for k in start:
            if j == k:
                continue
            score_start += graph[j-1][k-1]
    for j in link:
        for k in link:
            if j == k:
                continue
            score_link += graph[j-1][k-1]
    ans.add(abs(score_start-score_link))


print(min(ans))
```

## 설명

- combinations(iter, n) 함수를 이용하여 가능한 조합을 만든다.  

- 위에서 만들어진 조합은 순서대로 조합을 구성해주므로 절반을 나눈다면 각각 처음 index와 마지막 index가 하나의 경우가 된다. ex) 1, 2 // 3, 4

- 이를 이용하여 for문을 구성한다. 

1. 매 경우의 수마다 start팀과 link팀의 score를 초기화해준다. 

2. start팀과 link팀을 리스트로 구성하고 score를 계산하고 점수차를 ans에 저장한다.

3. ans의 최솟값을 출력한다. 

## 요점 및 배운점

- combination과 permutation을 사용하기 위해서는 **from itertools import ~~~** 해야한다. 

- combination(조합): 서로 다른 n개 중에서 r개를 취하여 구성한다. 다만, 순서를 고려하지 않는다. ex) 1, 2랑 2, 1은 순서만 바뀐 것이므로 하나의 경우로 생각한다. 0 

- permutation(순열): 서로 다른 n개 중에서 r개를 취하여 구성한다. 다만, 순서를 고려한다. ex) 1, 2와 2, 1은 다른 경우이다. 
