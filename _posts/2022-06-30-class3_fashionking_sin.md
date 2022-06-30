---
layout: single
title:  "패션왕 신해빈"
categories: Class3
tag: [수학, 자료구조, 조합론, 해시를 사용한 집합과 맵]
toc: true
author_profile: false
sidebar: 
    nav: "docs"
---

# 9375, 패션왕 신해빈

## 최초 접근법

처음 문제를 읽자마자 dictionary를 써야겠다고 생각했다. 

의상 개수만 카운트하면 되기 때문에 

옷의 종류를 key, 옷 이름과 개수를 value로 받아 계산한다.

## 코드

```python
T =int(input())

for _ in range(T):
    n = int(input())
    fasion = {}
    ans = 1
    for _ in range(n):
        cloth, genre = input().split()

        if genre in fasion:
            fasion[genre][1] += 1
        else:
            fasion[genre] = [cloth, 2]

    for i in fasion:
        ans *= fasion[i][1]

    print(ans - 1)

```

풀이 방식은 최초 접근법과 같다. 

다만, 의상을 선택하지 않는 경우도 있다는 것을 생각해야한다.

또, 모두 선택하지 않는 경우는 없으므로 최종 출력 시 -1을 해준다.

## 요점 및 배운 점

1. 이 문제에서는 의상을 선택하지 않는 경우를 고려해야한다는 것이 핵심이다. 
2. 모두 선택하지 않는 경우도 생각하여 최종 출력 시에는 1을 빼주어야 한다.
