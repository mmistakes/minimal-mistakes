---
layout: single
title:  "멀쩡한 사각형"
categories: Programmers, Class2
tag: [최대공약수, 수학]
toc: true
author_profile: false
sidebar: 
nav: "docs"
---

# Programmers, 멀쩡한 사각형

## 최초 접근법

처음에는 기울기를 이용한 접근으로 시도하였다. 왜냐하면 기울기에 따라 지울 수 있는 사각형의 개수가 결정된다고 생각하였기 때문이다. 

![KakaoTalk_20220807_084710877](../../images/2022-08-07-safe_squre/KakaoTalk_20220807_084710877.jpg)

위 그림처럼 기울기에 따라 1만큼 이동할때 지울 수 있는 사각형이 결정되고 그게 w또는 h만큼 반복된다고 생각하였다. 

하지만 이 경우 w=3, h=5일때 반례가 생긴다는 것을 뒤늦게 알게되었다. 

## 최초 코드

```python
def solution(w,h):
    k = max(w, h) / min(w, h)  # 기울기

    if w == h:
        return w * h - w

    if str(k)[-1] == '0':
        square = ((k // 1) * min(w, h))
    else:
        square = (((k // 1) + 1) * min(w, h))

    return int((w * h) - (square))

```

## 수정된 접근법

반례를 발견한 후 계속된 시도 끝에 결국 기울기를 이용한 접근은 포기하였다....

새로운 규칙을 찾을 수 있었다. 

![KakaoTalk_20220807_085108783](../../images/2022-08-07-safe_squre/KakaoTalk_20220807_085108783.jpg)

최초 접근에서도 w와 h가 서로소가 될때까지 압축한다면 즉, 최대공약수로 각각 나누어 주었을때의 사각형만큼 반복된다는 것은 알 고 있었다. 그 이후를 얘기하도록 하겠다. 

a와 b를 각각 최대 공약수로 w와 h를 나눈 수라고 가정하자.

**axb 사각형에서 지워지는 사각형의 개수 = a + b - 1이다.** 

위와 같은 규칙을 찾을 수 있었다. 위 규칙에서 구한 지워지는 사각형의 개수가 최대공약수만큼 반복되는 것이다. 

## 수정된 코드

```python
import math

def solution(w,h):
    cnt = math.gcd(w, h) # 최대 공약수
    square = ((w // cnt) + (h // cnt) -1) * cnt
    
    return (w * h) - (square)
```

설명은 수정된 접근법과 동일하다. 

## 요점 및 배운점

- 사실 이 문제의 수학적 원리는 잘 이해하지 못하겠다. 다만, 규칙을 찾아서 해결할 수 있었다. 

- math 라이브러리의 gcd함수는 최대공약수를 반환한다. 시간복잡도는 O(logN)이다. 
