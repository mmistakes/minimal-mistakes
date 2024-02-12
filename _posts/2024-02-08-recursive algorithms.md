---
layout: single
title: '[알고리즘] 재귀 알고리즘 (recursive algorithms) '
categories: 알고리즘
tag: [algorithms]
author_profile: false
published: true
use_math: true
sidebar:
    nav: "counts"
---

4주차 스터디 주제로 재귀 알고리즘을 공부하기로 했다. 재귀는 코테 공부를 한 사람이라면 한번 쯤 들어봤을 알고리즘이다.

재귀 알고리즘을 공부하다 보면 순환문 (loop) 을 이용해서 정해진 연산을 반복함으로써 문제의 답을 구하는 방법이 시간적 효율이 더 높은 경우가 있다.

그럼에도 불구하고, 재귀 알고리즘이 필요한 경우는 어떤 상황인지 알아보자.

## 재귀 알고리즘 (recursive algorithms)

<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2024-02-08-recursive algorithms\recursive.gif" alt="Alt text" style="width: 40%; margin: 20px;">
</div>


재귀는 함수 내부에서 자기 자신을 다시 호출하는 특수한 형태를 말한다. 

재귀(Recursive) 자체는 알고리즘이 아니라 성질에 해당하며, 같은 알고리즘을 반복적으로 적용하는 형태를 재귀라고 한다. 

그리고 재귀 함수를 이용할 때는 종결 조건(Trivial Case)에 대해서 반드시 명시해줘야 한다. 


### 피보나치 수열 
재귀의 대표적인 문제 중 하나는 피보나치 수열이다. 

피보나치 수는 첫째 및 둘째 항이 1이며 그 뒤의 모든 항은 바로 앞 두 항의 합인 수열을 말한다. 


<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2024-02-08-recursive algorithms\fibo.png" alt="Alt text" style="width: 40%; margin: 10px;">
</div>

재귀 알고리즘을 이용한 풀이 

```python
import time 

def rec(n):
    if n <= 1:
        return n
    else:
        print(f"fibo({n}) = fibo({n-1})+fibo({n-2})")
        return rec(n-1)+rec(n-2)

rec(4)

```

```
fibo(4) = fibo(3)+fibo(2)
fibo(3) = fibo(2)+fibo(1)
fibo(2) = fibo(1)+fibo(0)
fibo(2) = fibo(1)+fibo(0)
```

위 진행 과정을 보면 중복해서 호출되는 경우를 포함하여, 도합 9번의 함수 호출이 이루어진다. 

다음은 loop를 이용한 풀이이다. 

```python
def iter(n):
    if n<=1 :
        return n
    else:
        i = 2
        f0 = 0
        f1 = 1
        while i <= n:
            print(f"fibo({i}) = fibo({f0})+fibo({f1})")
            f0, f1 = f1, f0+ f1
            i+=1
        return f1

```

```
fibo(2) = fibo(0)+fibo(1)
fibo(3) = fibo(1)+fibo(1)
fibo(4) = fibo(1)+fibo(2)
```
```python

while True:
    nbr = int(input('number : '))
    print(nbr)
    if nbr == 1:
        break

    ts = time.time()
    fibo = iter(nbr)
    ts = time.time() - ts 
    print('Iterator Version : %d (%.3f)' % (fibo, ts))
    ts = time.time()
    fibo = rec(nbr)
    ts = time.time() - ts 
    print('Recursive Version : %d (%.3f)' % (fibo, ts))

```

```
20
Iterator Version : 6765 (0.000)
Recursive Version : 6765 (0.002)
30
Iterator Version : 832040 (0.000)
Recursive Version : 832040 (0.160)
35
Iterator Version : 9227465 (0.000)
Recursive Version : 9227465 (1.791)
```

재귀적인 방법으로 함수를 구현할 경우가 성능적으로 낮은걸 확인했다. 

그렇다면, 재귀 알고리즘을 어떤 경우에 사용해야 하는걸까?

### 이진탐색 


