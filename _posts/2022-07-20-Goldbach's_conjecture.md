---
layout: single
title:  "골드바흐의 추측"
categories: BOJ, Class4
tag: [수학, 정수론, 소수 판정, 에라토스테네스의 체]
toc: true
author_profile: false
sidebar: 
    nav: "docs"
---

# 6588, 골드바흐의 추측

## 최초 접근법

이 문제를 풀기 전에는 ''에라토스테네스의 체''를 알지 못했다. 하지만, 이 문제를 시간초과 없이 풀기위해서는 반드시 '에라토스테네스의 체'를 사용하여야 한다. 

나의 최초 접근법은 2부터 n의 절반까지만 검사를 한다. 

1. i와 n-i가 소수가 아닌 것으로 판정된 적 있는지 검사한다.
   - 만약 둘 중 하나라도 소수가 아닌것으로 판정된다면 확인할 필요 X
2.  만약 i와 n-i 둘 다 소수가 아닌 것으로 판정된 적 없다면
   - 둘 다 소수인지 검사한다. 
   - 둘 다 소수라면 이는 정답에 해당하므로 정답 리스트에 추가한다. 

3. 만약 정답 리스트가 비어있다면 GoldBach's conjecture is wrong을 출력한다. 
4. 비어있지 않다면 정답을 출력한다. 

나름 간단하게 구성하였다고 생각했는데 시간초과가 발생하였다. 

## 최초 코드

```python
import sys


def sosu(x):
    if x == 2:
        return x
    else:
        for i in range(2, x):
            if x % i == 0:
                visited.append(x) # x는 소수가 아님을 체크해둔다.
                return False
        else:
            return True


visited = []
while True:
    n = int(input())
    if n == 0:
        break
    ans = []

    for i in range(2, n//2): # 2부터 n의 절반까지 검사
        if i in visited or n-i in visited:
            continue
        else:
            if sosu(i): # a가 소수라면
                if sosu(n-i): # b도 소수라면
                    ans.append(i)
                    ans.append(n-i)
    if len(ans) == 0:
        print("GoldBach's conjecture is wrong")
    else:
        print(n, ' = ', ans[0], " + ", ans[1])
```

## 수정된 코드

```python
import sys

arr = [True for i in range(1000001)] # 최대범위인 백만까지 생성
for i in range(2, 1001): # 천까지의 수들의 모든 배수들을 제거한다.
    if arr[i]:  # 만약 아직 소수가 아닌것으로 판명되지 않았다면
        for j in range(i * 2, 1000001, i):  # i씩 더해가면서 i*2부터 i 배수들을 지워간다
            arr[j] = False

while True:
    n = int(sys.stdin.readline())
    flag = 0
    if n == 0:
        break
    else:
        for k in range(2, n):
            if arr[k] and arr[n-k]: #k와 (n-k)인 수 둘 다 소수라면 즉, 두개 더해서 n이고 둘 다 소수라면
                flag = 1
                print(n, '=', k, '+', n-k)
                break
        if flag == 0:
            print("GoldBach's conjecture is wrong")
```

## 설명

에라토스테네스의 체를 이용한 계산법은 다음과 같다. 

1. 최대 범위까지 True로 리스트를 만들어준다. 

2. 2부터 시작하여 검사를 시작한다. 

3. 2의 배수들을 모두 False
4. 3의 배수들을 모두 False
5. 4는 이미 False로 되어있기 때문에 생략한다. 
6. 5의 배수들을 모두 False

이런 식으로 작은 수부터 시작하여 배수들을 모두 걸러내는 식이다. 이렇게 하면 소수에 해당하는 숫자들만 True가 된다. 

k와 n-k가 소수이면 그냥 바로 정답을 출력하면 된다. 출력 방식은 최초코드와 거의 비슷하다. 

## 요점 및 배운점

- ''에라토스테네스의 체''를 알지 못했는데 새롭게 알게 되었다. 크게 어려운 알고리즘이 아니니까 그냥 외워야겠다. 
- 앞으로 소수 구하기 문제는 왠만하면 '에라토스테네스의 체'를 떠올리자!
