---
title: Pythonic Code
date: 2024-07-07
categories: python-basic
---

## Overview

- 파이썬 스타일의 코딩 기법
- 파이썬 특유의 문법을 활용하여 효율적으로 코드를 표현함
- 고급 코드를 작성 할 수록 더 많이 필요해짐

---

Example code

```python
colors = ['red', 'blue', 'green', 'yellow']
result = ''
for s in colors:
    result += s
print(result)
# 'redbluegreenyellow'

result = ''.join(colors)
print(result)
# 'redbluegreenyellow'
```

## Contents

- split & join
- list comprehension
- enumerate & zip
- lambda & map & reduce
- generator
- asterisk

## Split and join

### split

- string type의 값을 '기준값'으로 나눠서 List 형태로 변환

```python
items = 'zero one tow three'.split() # 스페이스를 기준으로 문자열 나누기
# ['zero', 'one', 'two', 'three']

example = "teamlab.technology.io"
subdomain, domain, tld = example.split(".")
```

### join

```python
colors = ["red", "blue", "green", "yellow"]
"_".join(colors)
# 'red-blue-green-ye||ow'
```

## List comprehension

- 기존 List를 사용하여 간단히 다른 List를 만드는 방법
- 일반저긍로 for + append보다 속도가 빠름

```python
# General Style
result = []
for i in range(10):
    result.append(i)
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# List comprehension
result = [i for i in range(10)]
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
result = [i for i in range(10) if i % 2 == 0] # Filter
# [0, 2, 4, 6, 8]
```

```python
word_1 = "Hello"
word_2 = "World"
result = [i+j for i in word_1 for j in word_2] # Nested for loop
# ['HW', 'Ho', 'Hr', 'Hl', 'Hd', 'eW', 'eo', 'er', 'el', 'ed', 'lW', 'lo', 'lr', 'll', 'ld', 'lW', 'lo', 'lr', 'll', 'ld', 'oW', 'oo', 'or', 'ol', 'od']
result = [i+j for i in word_1 for j in word_2 if not(i==j)]
result = [i+j if not(i==j) else i for i in word_1 for j in word_2]
```

```python
import pprint
words = 'The quick brown fox jumps over the lazy dog'.split()

stuff = [[w.upper(), w.lower(), len(w)] for w in words]
pprint.pprint(stuff)
"""
[['THE', 'the', 3],
 ['QUICK', 'quick', 5],
 ['BROWN', 'brown', 5],
 ['FOX', 'fox', 3],
 ['JUMPS', 'jumps', 5],
 ['OVER', 'over', 4],
 ['THE', 'the', 3],
 ['LAZY', 'lazy', 4],
 ['DOG', 'dog', 3]]
 """
```

### Two dimensional vs One dimensional

```python
case_1 = ["A", "B", "C"]
case_2 = ["D", "E", "F"]

result = [[i+j for i in case_1] for j in case_2]
# [['AD', 'BD', 'CD'], ['AE', 'BE', 'CE'], ['AA', 'BA', 'CA']]
```

## enumerate & zip

### enumerate

- enumerate : index와 함께 list의 element를 추출

```python
# dict 타입으로 만들 때 자주 사용
text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
{v.lower() : i for i, v in enumerate(text.split())}
"""
{'adipiscing': 6,
 'aliqua.': 18,
 'amet,': 4,
 'consectetur': 5,
 'do': 9,
 'dolor': 2,
 'dolore': 16,
 'eiusmod': 10,
 'elit,': 7,
 'et': 15,
 'incididunt': 12,
 'ipsum': 1,
 'labore': 14,
 'lorem': 0,
 'magna': 17,
 'sed': 8,
 'sit': 3,
 'tempor': 11,
 'ut': 13}
 """
```

### zip

- zip : 두 개의 list의 값을 병렬적으로 추출함

```python
alist = ["a1", "a2", "a3"]
blist = ["b1", "b2", "b3"]
[ [a, b] for a, b in zip(alist, blist)]
# [['a1', 'b1'], ['a2', 'b2'], ['a3', 'b3']]
```

## lambda & map & reduce

### lambda

- 함수 이름 없이 쓸 수 있는 익명함수
- 수학의 람다 대수에서 유래함

```python
# general function
def f(x, y):
    return x + y

# lambda function
f = lambda x, y: x+y

(lambda x, y: x+y)(10, 50)
```

- 권장

  - def f(x): retrun 2\*x

- PEP 8에서는 lambda의 사용을 권장하지 않음
  - 어려운 문법
  - 테스트의 어려움
  - 문서화 docstring 지원 미비

### map

- 주어진 함수를 시퀀스의 각 요소에 적용하여 새로운 시퀀스를 반환하는 함수
- 두 개 이상의 list에도 적용 가능함, if filter도 사용가능
- list comprehension을 사용하는 걸 권장하는 분위기

```python
ex = [1, 2, 3, 4, 5]
f = lambda x,y: x+y
list(map(f, ex, ex))
[f(value, value) for value in ex]
```

### reduce

- map function과 달리 list에 똑같은 함수를 적용해서 통합
- 대용량의 데이터를 다룰 때 사용

```python
from functools import reduce
print(reduce(lambda x, y: x+y, [1, 2, 3, 4, 5]))
```

## iterable object

- Sequence형 자료형에서 데이터를 순서대로 추출하는 object
- 내부적으로 **iter**와 **next**가 사용됨
- iter()와 next() 함수로 iterable 객체를 iterator object로 사용

```python
cities = ["Seoul", "Busan", "Jeju"]

iter_obj = iter(cities)

print(next(iter_obj))
print(next(iter_obj))
print(next(iter_obj))
```

## generator

- iterable object를 특수한 형태로 사용해주는 함수
- element가 사용되는 시점에 값을 메모리에 반환
  - yield를 사용해 한번에 하나의 element만 반환함

### 장점

- 메모리 효율성: 한 번에 하나의 요소만 메모리에 올리므로 큰 데이터를 처리할 때 유리합니다.
- 느긋한 계산: 필요할 때마다 값을 생성하여 불필요한 계산을 피할 수 있습니다.
- 성능 최적화: 함수의 상태를 유지하며 효율적인 반복 작업을 수행할 수 있습니다.
- 코드의 간결함: 복잡한 이터레이션 로직을 간단하게 작성할 수 있습니다.

### Why & When

- 일반적인 iterator는 generator에 반해 훨씬 큰 메모리 용량 사용
- list 타입의 데이터를 반환해주는 함수는generator로 만들어라
- 큰 데이터를 처리할 때는 generator expression을 고려하라
- 파일 데이터를 처리할 때도 generator를 쓰자

```python
def simple_generator():
    for i in range(1, 11):
        yield i

# 제너레이터 객체 생성
gen = simple_generator()

# 제너레이터에서 값을 하나씩 꺼내기
for value in gen:
    print(value)
```

### generator comprehension

- list comprehension과 유사한 형태로 generator형태의 list 생성
- generator expression이라는 이름으로도 부름
- [] 대신 ()를 사용하여 표현

```python
gen_ex = (n*n for n in range(500))
```

## function passing arguments

- 함수에 입력되는 arguments의 다양한 형태
  1. Keyword arguments
  2. Default arguments
  3. Variable-length asterisk

1. Keyword arguments

- 함수에 입력되는 parameter의 변수명을 사용, arguments를 넘김

```python
def print_something(my_name, your_name):
    print(f"{my_name} {your_name}")

print_something(your_name = "aa", my_name = "bb") # your_name, my_name과 같이 parameter의 변수명을 사용하는 것을 Keyword arguments
```

2. Default arguments

- parameter의 기본 값을 사용, 입력하지 않을 경우 기본값 출력

```python
def print_something(my_name, your_name = "aa"):
    print(f"{my_name} {your_name}")
```

3. Variable-length(가변 인자) asterisk

- 만약 함수의 parameter가 정해지지 않았다면?
- 개수가 정해지지 않은 변수를 함수의 parameter로 사용하는 법
- Keyword arhument와 함께, argument 사용 가능
- Asterisk(\*) 기호를 사용하여 함수의 parameter를 표시함
- 입력된 값은 **tuple type**으로 사용할 수 있음
- 가변 인자는 오직 한 개만 맨 마지막 parameter 위치에 사용가능

```python
def asterisk_test(a, b, *args):
    return a+b+sum(args) # tuple type으로 입력됨
print(asterisk_test(1, 2, 3, 4, 5))
```

4. Keyword variable-length

- parameter 이름을 따로 지정하지 않고 입력하는 방법
- asterisk(\*) 두 개를 사용하여 함수의 parameter를 표시함
- 입력된 값은 **dict type**으로 사용할 수 있음
- 가변인자는 오직 한 개만 기존 가변인자 다음에 사용

```python
def kwargs_test_1(**kwargs):
    print(kwargs) # dict type으로 값을 입력
kwargs_test_1(first = 1, second = 2, third = 3)
# {'first' : 1, 'second' : 2, 'third' : 3}

def kwargs_test_2(one, two, *args, **kwargs):
    print(one + two + sum(args))
    print(kwargs)
kwargs_test_2(3, 4, 5, 6, 7, 8, 9, first = 3, secon = 2, third = 5)
###
```

### asterisk

- 단순 곱셈
- 제곱 연산
- 가변 인자
- tuple, dict 등 자료형에 들어가 있는 값을 **unpacking**(unpacking a container)
- 함수의 입력값, zip 등에 유용하게 사용가능

```python
def asterisk_test(a, *args):
    print(a, *args)
    print(a, args)
    print(type(args))
test = (2, 3, 4, 5,  6)
asterisk_test(1, *test)
# 1 2 3 4 5 6
# 1 (2, 3, 4, 5, 6)
# <class 'tuple'>
asterisk_test(1, test)
# 1 (2, 3, 4, 5, 6)
# 1 ((2, 3, 4, 5, 6),) # *args는 튜플로 받기 때문에  ((2, 3, 4, 5, 6),) 형태의 튜플이 된다
# <class 'tuple'>
```
