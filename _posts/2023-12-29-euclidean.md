---
published: true
title: "[Algorithm] 유클리드 호제법"

categories: Algorithm
tag: [codingtest, algorithm, euclidean]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

date: 2023-12-29
---
**최대공약수 계산 - 유클리드 호제법**

# 유클리드 호제법

두 개의 자연수에 대한 최대공약수를 구하는 대표적인 알고리즘

- 두 자연수 **A**, **B**에 대하여 (A > B) **A**를 **B**로 나눈 나머지를 **R**이라고 할 때
- **A**와 **B**의 최대공약수는 **B**와 **R**의 최대공약수와 같다

이 유클리드 호제법의 아이디어를 그대로 재귀 함수로 작성 할 수 있다.

<br>

**ex) GCD(192, 162)**

|단계|A|B|
|:--:|:--:|:--:|
|1|192|162|
|2|162|30|
|3|30|12|
|4|12|6|

> 192와 162의 최대공약수는 12와 6의 최대공약수와 같다.

```python
def gcd(a, b):
    if a % b == 0: # a가 b의 배수라면
        return b
    else:
        return gcd(b, a % b)

print(gcd(192, 162))

# output
>>> 6
```
