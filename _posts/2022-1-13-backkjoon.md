---
layout: single
title: "백준 python50(1 ~ 저작권)"
categories: 알고리즘,기타
tag: [python, 문제, blog, github, 파이썬, 알고리즘, 백준, python50, 풀이, 답]
toc: true
sidebar:
  nav: "docs"
---

# 백준 python 50

## 1 ~ 저작권

```python
# 사칙연산

a, b = map(int, input().split())
print(a+b)
print(a-b)
print(a*b)
print(int(a/b))
print(a%b)
```

```python
# 나머지

A,B,C = map(int,input().split())

print((A+B)%C, ((A%C)+(B%C))%C, (A*B)%C, ((A%C)*(B%C))%C, sep='\n')
```

```python
# A+B -2

= int(input())
B = int(input())
print(A+B)
```

```python
# 곱셈

a = int(input())
b = input()

print(a*int(b[2]))
print(a*int(b[1]))
print(a*int(b[0]))
print(a*int(b))
```

```python
# R2

a, b = map(int,input().split())

print((b*2)-a)
```

```python
# 초코릿 자르기

a, b = map(int,input().split())
print(a*b-1)
```

```python
# A+B -7

n = int(input())

for i in range(1,n+1):
    a, b = map(int,input().split())
    print(f"Case #{i}: {a+b}")
```

```python
# A+B -8

n = int(input())

for i in range(1,n+1):
    a, b = map(int,input().split())
    print(f"Case #{i}: {a} + {b} = {a+b}")
```

```python
# 오늘 날짜

from datetime import datetime

print(datetime.now().date())
```

```python
# 등록

print("15\n")
print("wltn39\n")
```

```python
# 오븐 시계

, m = map(int, input().split())
t = int(input())

h += t // 60
m += t % 60

if m >= 60:
    h += 1
    m -= 60
if h >= 24:
    h -= 24

print(h,m)
```

```python
# 인공지능 시계

h, m, s = map(int, input().split())
t = int(input())

s += t % 60
t = t // 60
if s >= 60:
    s -= 60
    m += 1

m += t % 60
t = t // 60
if m >= 60:
    m -= 60
    h += 1

h += t % 24
if h >= 24:
    h -= 24

print(h,m,s)
```

```python
# 저작권

a, b = map(int, input().split())
print(a*(b-1)+1) # 적어도 몇 곡인지
```
