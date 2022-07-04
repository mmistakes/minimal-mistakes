---
layout: single
title:  "카잉 달력"
categories: Class3
tag: [수학, 정수론, 중국인의 나머지 정리]
toc: true
author_profile: false
sidebar: 
    nav: "docs"
---

# 6064, 카잉 달력

## 최초 접근법

문제를 이해하는데에 꽤 시간이 걸렸다. 

m과 n이 같이 증가하다가 각각 최대에 도달하면 다시 1부터 카운트하고 m과 n이 둘다 최대에 도달하면 그것이 마지막 해인 것이다. 이해를 돕기위해 아래 그림을 첨부한다. 

![KakaoTalk_20220701_043617252](../../images/2022-06-30-class3_kiing/KakaoTalk_20220701_043617252.jpg)

처음에는 규칙을 찾아 해결하려 했지만, 어려웠고 비효율적이었다. 

해결 방법은 수학적 지식을 활용하는 것이었다. 핵심은 **최대 공약수**이다.   

## 코드

```python
t = int(input())


def kiing(m, n, x, y):
    k = x  # x값을 받아온다.
    while k <= m * n:  # k의 범위는 m*n을 넘을 수 없다.
        # x, y는 x에 m만큼 더했을 때 x번째 이동한 해수와
        # y에 n만큼 더했을 때 y번째 이동한 해수가 동일한 경우이다.
        # 따라서 k에서 각각 x, y만큼 뺀 후 m과 n으로 나누었을 때 나머지가 0인경우 반환한다.
        if (k - x) % m == 0 and (k - y) % n == 0:
            return k
        k += m # 아닌 경우 k에 계속 m씩 더해준다.
    return -1 # 해당 조건을 만족하지 못한채 벗어나면 유효하지 않은 경우이므로 -1을 반환한다.

for _ in range(t):
    m, n, x, y = map(int, input().split())

    print(kiing(m, n, x, y))
```

## 설명

지나간 해를 k라고 생각해보자. 우선 k는 m*n을 넘을 수 없다. 

또, 000000000000000000000000 
