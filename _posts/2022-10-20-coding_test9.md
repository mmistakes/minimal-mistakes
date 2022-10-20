---
layout: single
title:  "코딩 테스트 책 - 9차시"
categories : coding-test
tag : [이것이 취업을 위한 코딩 테스트다, python, 나동빈]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=코딩 테스트 책 - 9차시&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)&nbsp;

## 다이나믹 프로그래밍

&nbsp;

### 중복되는 연산을 줄이자

- 메모리 공간은 한정적 그러므로 연산 속도와 메모리 공간을 최대한으로 활용할 수 있는 효율적인 알고리즘 작성
- 메모리 공간을 약간 더 사용하면 연산 속도를 비약적으로 증가시키는 방법중 하나는 **다이나믹 프로그래밍**(동적 계획법)
  - 대표적인 예시로 피보나치 수열이 존재

&nbsp;

**피보나치 수열 예제**

```python
def fibo(x):
    if x == 1 or x == 2:
        return 1
    else:
        return fibo(x-1) + fibo(x-2)
```

- 다이나믹 프로그래밍의 주요한 두 조건
  1. 큰 문제를 작은 문제로 나눌 수 있다.
  2. 작은 문제에서 구한 정답은 그것을 포함하는 큰 문제에서도 동일함

&nbsp;

**피보나치 수열 소스코드(재귀)**

```python
d = [0] * 100

def fibo(x):
    if x==1 or x==2:
        return 1
    
    # 계산 기록있을경우 추가계산 X
    if d[x] !=0:
        return d[x]
    
    d[x] = fibo(x-1) + fibo(x-2)
    return d[x]
```

- 기존의 피보나치 수열 함수보다 빠른 실행속도를 보여줌
- 다이나믹 프로그래밍은 큰 문제를 작게 나누고, 같은 문제라면 한 번씩만 풀어 문제를 효율적으로 해결하는 알고리즘 기법을 의미

&nbsp;

**호출되는 함수 확인(탑다운)**

```python
d = [0] * 100

def fibo(x):
  print('f(' + str(x) + ')', end = ' ')
  
  if x == 1 or x == 2:
    return 1
  if d[x] != 0:
    return d[x]
  d[x] = fibo(x-1) + fibo(x-2)
  return d[x]

fibo(10)
>> f(10) f(9) f(8) f(7) f(6) f(5) f(4) f(3) f(2) f(1) f(2) f(3) f(4) f(5) f(6) f(7) f(8) 55
```

- 재귀 함수를 이용해 다이나믹 프로그래밍 소스코드를 작성하는 방법을 큰 문제를 해결하기 위해 작은 문제를 호출한다고 하여 **탑다운 방식**이라고 함
- 단순히 반복문을 이용하여 소스코드를 작성하는 경우 작은 문제부터 차근차근 답을 도출한다고 하여 **보텀업방식**이라고 함

**피보나치 수열(보텀업)**

```python
d = [0] * 100

d[1] = 1
d[2] = 1
n = 10

for i in range(3,n+1):
  d[i] = d[i-1] + d[i-2]


print(d[10])
>> 55
```

&nbsp;

- 탑다운 방식은 하향식, 보텀업 방식은 상향식이라고 함
- 다이나믹 프로그램의 전형적인 형태는 보텀업 방식