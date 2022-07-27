---
layout: single
title:  "소수 찾기"
categories: Programmers, Class2
tag: [에라토스테네스의 체, permutation, set]
toc: true
author_profile: false
sidebar: 
nav: "docs"
---

# Programmers, 소수 찾기

## 최초 접근법

1. 입력 문자를 각각 리스트에 넣어준다.
2. 각 자리수마다 만들 수 있는 숫자들을 permutation을 이용하여 조합을 만들어준다. 
3. 빈 문자열에 각 조합으로 만들어진 수들을 합쳐주어 정수형으로 변환한다. 
4. 가능한 조합들 중 최고 숫자만큼 set을 만들어 에라토스테네스의 체를 만든다. 
5. set에 있는 숫자들을 에라토스테네스의 체를 이용하여 소수인지 판별하고 소수라면 ans를 1씩 카운트해준다. 
6. ans를 출력 및 반환한다. 

에라토스테네스의 체를 알고있다면 비교적 쉽게 풀 수 있다. 

## 나의 코드

```py
from itertools import permutations
import math



def solution(numbers): # 문자열로 입력을 받는다.
    ans = 0
    paper = []
    arr = set()

    for n in numbers:
        paper.append(n)

    for length in range(1, len(numbers)+1): # 가능한 숫자 조합들을 다 set에 넣어준다.
        combi = list(permutations(paper, length))

        for i in combi:
            sosu = ''
            for j in range(length):
                sosu += i[j]
            sosu = int(sosu)
            if sosu not in arr:
                arr.add(sosu)
    limit = max(arr) + 1
    ## 에라토스테네스의 체
    num = [False] * limit
    num[0] = True
    num[1] = True
    for i in range(2, int(math.sqrt(limit))):
        for j in range(i * 2, limit, i):
            if not num[j]:
                num[j] = True

    for i in arr:
        if not num[i]:
            print(i)
            ans += 1
    return ans
```

## 설명

설명의 최초 접근법과 동일하기 때문에 생략한다. 



## 추천 코드

```python
from itertools import permutations
def solution(n):
    a = set()
    for i in range(len(n)):
        a |= set(map(int, map("".join, permutations(list(n), i + 1))))
    a -= set(range(0, 2))
    for i in range(2, int(max(a) ** 0.5) + 1):
        a -= set(range(i * 2, max(a) + 1, i))
    return len(a)
```



## 설명

set과 map을 너무 잘 활용한 것 같다. 

1. 마찬가지로 자리수마다 가능한 조합을 만든다. 
2. permutation은 파라미터로 리스트와 조합할 개수를 받아 오브젝트를 반환해준다. 
3. 이를 ''.join과 mapping하여 문자열로 합쳐준다. 
4. 첫번째 mapping에서 반환된 합쳐진 문자열을 int형으로 다시 mapping하여 set으로 만들어준다. 
5. 두번째 mapping에서 반환된 set을 기존의 set인 a와 합집합 연산을 이용하여 중복없이 합쳐준다. 
   - 가능한 숫자 조합들이 중복없이 정수형으로 set에 추가된다. 
6. 0과 1은 소수가 아니므로 a에 차집합 연산을 이용하여 빼준다. 
7. 2부터 가능한 조합들의 최고숫자의 정수형의 제곱근까지의 범위를 설정하여
   - 배수들을 지워준다. 즉, 소수가 아닌 것들을 차집합 연산을 이용하여 없애준다. 
   - a에는 소수만 남게된다. 
8. a의 원소의 개수가 가능한 조합들 중 소수에 해당한다. 



## 요점 및 배운점

- list('문자열') --> 문자열의 각 원소들을 하나의 원소로 list반환

- permutation(iter, n) --> iter에서 n개로 가능한 조합들 오브젝트 반환

- map(''.join, permutation(iter, n))
  --> iter에서 n개로 가능한 조합들을 각각 모두 문자열로 합쳐 오브젝트로 반환

  ex) [('1', '7')] ///// [('1', '7'), ('7', '1')] --> ['1', '17', '71']

  위 예시의 리스트는 임의로 한것이다. 즉, list(map()) 해준것이다.

추천 코드는 위의 방법으로 가능한 조합의 문자열들을 다시 mapping하여 int형으로 바꾸고 set으로 만들어주었다. set을 사용한 이유는 중복을 제거하기 위함이다. 

- set1 |= set2 --> 중복없이 합친다. 
- set1 -= set2 --> set1과 set2의 중복된것들을 set1에서 제거해준다. 
- 에라토스테네스의 체를 set으로 구현하여 매우 간단하게 해결하였다. 이러한 방법도 알고 있어야겠다. 
