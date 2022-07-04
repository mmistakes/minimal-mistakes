---
layout: single
title:  "팩토리얼 0의 개수"
categories: Class3
tag: [수학, 임의 정밀도, 큰 수 연산]
toc: true
author_profile: false
sidebar: 
    nav: "docs"
---

# 1679, 팩토리얼 0의 개수

## 최초 접근법

1. 재귀를 이용하여 팩토리얼 함수를 구현한다.
2. 뒤에서부터 0을 검사하여 cnt 1씩 증가
3. 최종적으로 cnt 출력

**But,** RecursionError 발생하였다. 이를 해결하기 위해 단순 for문을 이용하여 팩토리얼 함수를 구현하여 해결.

## 코드

```python
def factorial(n):
    res = 1
    for i in range(1, n+1):
        res *= i
    return res


num = []
cnt = 0
n = int(input())
ans = factorial(n)
ans = str(ans)

for i in range(len(ans)-1, -1, -1):
    num.append(ans[i])

for i in num:
    if i == '0':
        cnt += 1
    else:
        break
print(cnt)
```

## 설명

팩토리얼 함수에 대한 설명은 생략한다. 

1. 숫자를 문자열로 변환
2. 뒤에서부터 index를 받아와 리스트에 추가한다. 
3. 리스트의 순서대로 '0'을 검사
   - '0'이면 cnt 1증가
   - '0'이 아니면 그 즉시 break
4. 정답 출력

## 요점 및 배운 점

이 문제는 어째서인지 재귀를 이용하면 RecursionError가 발생한다. 아무래도 단순 연산이 재귀에 비해 처리속도가 훨씬 빠르기 때문일 것 같다.

- 재귀는 시간을 많이 소요한다. 
