---
published: true
title: "[Python] 기초 문법 정리"

categories: Python
tag: [python]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

date: 2023-12-05
---

# Python 기초 문법



## List


### List Comprehension

**리스트 컴프리헨션** | 리스트를 초기화하는 방법 중 하나


**예시 1**

```python
# 1 ~ 9 제곱 값 list
array = [i * i for i in range(1, 10)]
print(array)
```
```python
# output
[1, 4, 9, 16, 25, 36, 49, 64, 81]
```

**예시 2**
```python
# N x M 크기의 2차원 list 초기화
n = 3
m = 4
array = [[0] * m for _ in range(n)]
print(array)
```
```python
# output
[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
```

<br>
<br>


### 리스트 관련 메서드

|메서드|설명|시간 복잡도|
|:--|:--|:--:|
|list.append(n)|원소 삽입|O(1)|
|list.sort()|오름차순 정렬|O(NlogN)|
|list.sort(reverse=True)|내림차순 정렬|O(NlogN)|
|list.reverse()|원소 순서 뒤집기|O(N)|
|list.insert(idx, n)|특정 인덱스에 원소 삽입|O(N)|
|list.count(n)|n의 개수를 셈|O(N)|
|list.remove(n)|원소 제거, 여러 개 있으면 하나 제거|O(N)|

```python
list = [5, 3, 7]

list.append(2)  # >>> [5, 3, 7, 2]

list.sort() # >>> [2, 3, 5, 7]
list.sort(reverse=True) # >>> [7, 5, 3, 2]

list.reverse() # >>> [2, 7, 3, 5]

# 2번 index에 3 추가
list.insert(2, 3) # >>> [2, 7, 3, 3, 5]

list.count(3) # >>> 2

list.remove(3) # >>> [2, 7, 3, 5]
# =====================================

# 특정 값 모두 제거하기
list_2 = [1, 2, 3, 4, 5, 5, 5]
remove_set = {3, 5}

result = [i for i in list_2 if i not in remove_set]
# >>> [1, 2, 4]

```
- insert(), remove() 시간 복잡도에 유의 -> 남발 시 시간초과 위험

## Dictionary

```python
data = dict()
data['월요일'] = 'monday'
data['화요일'] = 'tuesday'
data['수요일'] = 'wednesday'
print(data)

key_list = data.keys()
value_list = data.value()
print(key_list)
print(value_list)

for key in key_list:
    print(data[key])
```
```python
# output
{'월요일': 'monday', '화요일': 'tuesday', '수요일': 'wednesday'}
dict_keys(['월요일', '화요일', '수요일'])
dict_values(['monday', 'tuesday', 'wednesday'])
monday
tuesday
wednesday
```

### dictionary comprehension

```python
num = [1, 2, 3, 4, 5]

dict1 = {i : '-' for i in num}
print(dict1)

# output
>>> {1: '-', 2: '-', 3: '-', 4: '-', 5: '-'}


num_str = ['one', 'two', 'three', 'four', 'five']
dict2 = dict(zip(num, num_str))
print(dict2)

# output
>>> {1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five'}


dict3 = {key: val for key, val in dict2.items() if key >= 3}
print(dict3)

# output
>>> {3: 'three', 4: 'four', 5: 'five'}
```

## Set

**집합 자료형**

순서가 없으며, 중복을 허용하지 않음

```python
a = set([1, 2, 3, 4, 5])
b = set([3, 4, 5, 6, 7])
                          # output
print(a | b) # 합집합        >>> {1, 2, 3, 4, 5, 6, 7}
print(a & b) # 교칩합        >>> {3, 4, 5}
print(a - b) # 차집합        >>> {1, 2}

#============================
data = set([1, 2, 3])

# 원소 추가
data.add(4) # >>> {1, 2, 3, 4} 
# 원소 여러개 추가
data.update([5, 6]) # >>> {1, 2, 3, 4, 5, 6}
# 삭제
data.remove(3) # >>>{1, 2, 4, 5, 6}
```

## 입출력

입력의 갯수가 많은 경우에는 input() 동작 속도가 느려 시간 초과 위험이 있기 때문에

sys 라이브러리에 정의되어 있는 sys.stdin.readline() 함수를 이용한다.

```python
import sys
data = sys.stdin.readline().rstrip()
```

## 주요 라이브러리 문법

### 내장 함수

sum(), min(), max(), ...

eval() : 수학 수식이 문자열로 들어오면 수식을 계산한 결과 반환
```python
result = eval("(3 + 5) * 7")
print(result)  # >>> 56
```

### itertools

**파이썬에서 반복되는 데이터를 처리하는 기능을 포함하고 있는 라이브러리**

- **permutations** : iterable 객체에서 r개의 데이터를 뽑아 일렬로 나열하는 모든 경우(순열)을 계산해줌
  
```python
from itertools import permutations

data = ['A', 'B', 'C']
result = list(permutations(data, 3)) # 모든 순열
print(result)

# output
>>> [('A', 'B', 'C'), ('A', 'C', 'B'), ('B', 'A', 'C'), ('B', 'C', 'A'), ('C', 'A', 'B'), ('C', 'B', 'A')]
```

```python
from itertools import product

data = ['A', 'B', 'C']
result = list(product(data, repeat=2)) # 2개를 뽑는 모든 순열 (중복 허용)
print(result)

# output
>>> [('A', 'A'), ('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'B'), ('B', 'C'), ('C', 'A'), ('C', 'B'), ('C', 'C')]
```


- **combinations** : iterable 객체에서 r개의 데이터를 뽑아 순서를 고려하지 않고 나열하는 모든 경우(조합)을 계산해줌
  
```python
from itertools import combinations
data = ['A', 'B', 'C']
result = list(combinations(data, 2)) # 2개를 뽑는 모든 조합 구하기
print(result)

# output
>>> [('A', 'B'), ('A', 'C'), ('B', 'C')]
```

```python
# 중복을 포함해 r개를 뽑아 순서에 상관없이 나열하는 모든 경우
from itertools import combinations_with_replacement
data = ['A', 'B', 'C']
result = list(combinations_with_replacement(data, 2))
print(result)

# output
>>> [('A', 'A'), ('A', 'B'), ('A', 'C'), ('B', 'B'), ('B', 'C'), ('C', 'C')]
```

### etc
```python
# 우선순위 큐 기능을 구현하고자 할 때
import heapq
heapq.heappush(lst, value)
heapq.heappop(lst)


# 이진탐색, 정렬된 배열에서 원소 찾을 때
from bisect import bisect_left, bisect_right


# 큐 구현할 때
from collections import deque
lst.popleft() # 첫번째 원소 제거
lst.pop() # 마지막 원소 제거
lst.appendleft(x) # 첫번째 인덱스에 x삽입
lst.append(x) # 마지막 인덱스에 x삽입


# 원소별 등장 횟수 셀 때
from collections import Counter
counter = Counter(['red', 'blue', 'red', 'green', 'blue', 'blue'])
print(counter['blue'])  # >>> 3
print(counter['green']) # >>> 1
print(dict(counter))    # >>> {'red': 2, 'blue': 3, 'green': 1}


# 수학적 기능
import math
math.pactorial(5)
math.sqrt(7) # 제곱근
math.gcd(21, 14) # 최대공약수
```




## memo

- iterable 객체 : 반복 가능한 객체 (리스트, 사전, 튜플 등)
- if~ continue - 반복문 처음으로 돌아감
- find(), replace(), enumerate(), 
            