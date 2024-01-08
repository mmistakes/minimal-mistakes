---
published: true
title: "[Algorithm] 에라토스테네스의 체"

categories: Algorithm
tag: [algorithm]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

use_math: true

date: 2024-01-08
---
# 에라토스테네스의 체 - 소수 찾기

<br>

에라토스테네스의 체는 자연수 n 이하의 소수를 모두 찾는 가장 간단하고 빠른 방법이다.

에라토스테네스의 체는 '특정 범위 내의 소수'를 판정하는 데에 매우 효율적이다.

주어진 수가 소수인지 판별하기 위해서는 단순하게 제곱근 까지 약수의 여부를 구하면 O(N<sup>1/2</sup>)의 시간 복잡도로 빠르게 구할 수 있다.

# 에라토스테네스의 체 원리

예를 들어 1~100까지의 숫자 중 소수를 찾는다고 가정해보자. 

![스크린샷 2024-01-08 233151](https://github.com/leejongseok1/algorithm/assets/79849878/42d7b666-c04b-4443-9a39-7e38d9c47a03)

<br>

**첫 번째로**, 소수도 합성수도 아닌 유일한 자연수 1을 제거한다.

![image](https://github.com/leejongseok1/algorithm/assets/79849878/58b9f523-ae04-48c3-9f12-7071f3cc6ada)

<br>

**2**를 **제외한 2의 배수**를 **제거**한다.

![image](https://github.com/leejongseok1/algorithm/assets/79849878/c90619e7-86ac-4453-9402-84ba18076293)

<br>

**3**을 **제외한 3의 배수**를 **제거**한다.

![image](https://github.com/leejongseok1/algorithm/assets/79849878/a93868f9-a477-40b1-8059-dbfc75fc25c4)

<br>

4의 배수는 2의 배수를 제거할 때 이미 지워졌기 때문에 지울 필요가 없다.

2, 3 다음으로 남아있는 가장 작은 소수인 **5**를 **제외한 5의 배수**를 **제거**한다.

![image](https://github.com/leejongseok1/algorithm/assets/79849878/a8589dc0-705d-4307-8bb0-14d290d7790b)

<br>

6의 배수도 2의 배수를 제거할 때 이미 지워졌기 때문에 지울 필요가 없다.

이제 **7**을 **제외한 7의 배수**까지 **제거**한다.

![image](https://github.com/leejongseok1/algorithm/assets/79849878/ade69a99-d7da-4356-9a85-c0907e166e9c)

<br>

8의 배수와 9의 배수, 10의배수는 각각 2의 배수와 3의 배수를 지울 때 이미 지워졌다.

이 예시에서는 100이하의 소수를 찾는 것이고 11이상의 소수들의 배수부터는 11이 $\sqrt{100}$보다 크기 때문에 지울 필요가 없다.

100이하 자연수 중에서 11의 배수는 11에 1~9사이의 값을 곱한 것인데 모두 1~9사이의 배수이다.

n이하의 소수를 모두 찾고자 한다면 1부터 n까지 쭉 나열한 다음에 위처럼 나누는 것이다.

이렇게 7을 제외한 7의 배수까지 제거하면 100이하 자연수 중 소수를 모두 찾을 수 있다.

<br>
<br>

# 에라토스테네스의 체 구현 (Python)

<br>

## 방법 1

```python
def eratosthenes(n):
    arr = [True for i in range(n + 1)]
    end = int(n**0.5)
    for i in range(2, end+1):
        if arr[i] == True:
            j = 2
            while i * j <= n:
                arr[i*j] = False
                j += 1

    for i in range(2, n+1):
        if arr[i]:
            print(i, end=' ')

print(eratosthenes(100))
```
```python
# output
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97
```

<br>

## 방법2

```python
def eratosthenes(n):
    arr = [i for i in range(n+1)]
    end = int(n**0.5) # n의 제곱근
    for i in range(2, end+1):
        # 소수가 아닌 수는 pass
        if arr[i] == 0:
            continue
        # 자기 자신 제외한 i의 배수 0으로 처리
        for j in range(i*i, n+1, i):
            arr[j] = 0
    
    return [i for i in arr[2:] if arr[i]]

print(eratosthenes(100))
```
```python
# output
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
```

에라토스테네스의 체 알고리즘은 대략 시간복잡도 $O(n\sqrt{n})$ 으로 n 이하의 소수를 모두 구할 수 있다.