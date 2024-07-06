---
title: Python data structure
date: 2024-07-07
categories: python-basic
---

## 특징이 있는 정보는 어떻게 저장하면 좋을까?

- 전화번호부 정보는 어떻게 저장하면 좋을까?
- 은행 번호표 정보는 어떻게 처리하면 좋을까?
- 서적 정보는 어떻게 관리하면 좋을까?
- 창고에 쌓인 수화물의 위치를 역순으로 찾을 때는 어떻게 하는게 좋을까?

## 파이썬 기본 데이터 구조

- 스택과 큐(stack & queue)
- 튜플과 집합(tuple & set)
- 사전(dictionary)
- Collection 모듈

## stack

- 나중에 넣은 데이터를 먼저 반환하도록 설계된 메모리 구조
- LIFO : Last In First Out
- Data의 입력을 Push, 출력을 Pop이라고 함

### stack with list object

- 리스트를 사용하여 스택 구조를 구현 가능
- push를 append(), pop을 pop()을 사용

```python
a = [1, 2, 3,4, 5]
a.append(20)
c = a.pop() # pop은 return 값을 가진다
```

## queue

- 먼저 넣은 데이터를 먼저 반환하도록 설계된 메모리 구조
- FIFO : First In First Out
- Stack과 반대되는 개념

### queue with list object

- 리스트를 사용하여 큐 구조를 구현 가능
- put을 append(), get을 pop(0)을 사용

## tuple

- 값의 변경이 불가능한 리스트
- 선언 시 "[]"가 아닌 "()"를 사용
- 리스트의 연산, 인덱싱, 슬라이싱 등 동일하게 사용가능

- 쓰는 이유?
  - 변경되지 않는 데이터를 저장할 때 사용
  - 함수의 반환값 등 사용자의 실수에 의한 에러를 사전에 방지

```python
TypeError : 'tuple' object does not support item assignment  # 값의 할당을 사전에 방지
```

```python
t = (1) # 일반 정수로 인식
t = (1, ) # 튜플로 선언하려면 ,를 사용해야 한다
```

## set

- 값을 순서없이 저장, 중복을 불허 하는 자료형
- set([object]) 또는 {object}를 사용해서 객체 생성

### 집합의 연산

- 수학에서 활용하는 다양한 집합연산 가능

```python
s1 = set([1, 2, 3, 4, 5])
s1 = set([3, 4, 5, 6, 7])
s1.union(s1) or s1 | s2
{1, 2, 3, 4, 5, 6, 7}
s1.intersection(s2) or s1 & s2
{3, 4, 5}
s1.difference(s2) or s1 - s2
{1, 2}
```

## dictionary

- 데이터를 저장할 때 구분 지을 수 있는 값을 함께 저장
- 구분을 위한 데이터 고유값을 Identifier 또는 key라고 함
- Key값을 활용하여, 데이터 값(Value)를 관리함
- 다른 언어에서는 Hash Table이라는 용어를 사용

```python
dict_example = {Key1 : Value1, Key2 : Value2, Key3 : Value3...}

for dic_item in dict_example.items():
  print(dic_item)
(Key1 : Value1) # 튜플의 형태로 저장(값을 바꿀 수 없음)
(Key2 : Value2)
(Key3 : Value3)

dict_example.keys() # 키 값만 출력
dict_example.values() # value 값 출력

"Key100" in dict_example.keys() # key값에 "Key100"이 있는지 확인
```

### Lab-dict

```python
sorted_dict = sorted(dictlist, key = getKey, reverse = True) # 큰 수대로 정렬
```

## collections

- List, Tuple, Dict에 대한 Python Built-in 확장 자료 구조(모듈)
- 편의성, 실행 효율성(메모리 사용량 or 시간 복잡도)

```python
from collections import deque
from collections import Counter
from collections import OrderedDict
from collections import defaultdict
from collections import namedtuple
```

### deque

- queue와 stack을 모두 지원하는 모듈
- List에 비해 효율적인(빠른) 자료 저장 방식을 지원

```python
from collections import deque

deque_list = deque()
for i in range(5):
  deque_list.append(i)
print(deque_list)
deque_list.appendleft(10)
print(deque_list)
```

- rotate, reverse 등 Linked List[^1]의 특성을 지원함
- 기존 list 형태의 함수를 모두 지원함

```python
from collections import deque

deque_list = deque()
for i in range(5):
    deque_list.append(i)
deque_list.appendleft(10)
# deque([10, 0, 1, 2, 3, 4])
deque_list.rotate(1) # 오른쪽으로 1칸 이동
# deque([4, 10, 0, 1, 2, 3])

deque_list.extend([5, 6, 7])
# deque([4, 10, 0, 1, 2, 3, 5, 6, 7])

deque_list.extendleft([5, 6, 7]) # 5, 6, 7을 왼쪽에 추가하면 7, 6, 5 순서로 추가됨
# deque([7, 6, 5, 4, 10, 0, 1, 2, 3, 5, 6, 7])
```

- deque는 기존 list보다 효율적인 자료구조를 제공
- 효율적 메모리 구조로 처리 속도 향상

```python
from collections import deque
import time

start_time = time.perf_counter()
deque_list = deque()
for i in range(10000):
    for i in range(10000):
        deque_list.append(i)
        deque_list.pop()
print(time.perf_counter() - start_time, "seconds")
# 3.909028 seconds

start_time = time.perf_counter()
just_list = []
for i in range(10000):
    for i in range(10000):
        just_list.append(i)
        just_list.pop()
print(time.perf_counter()- start_time, "seconds")
# 8.662928999999998 seconds
```

### OrderedDict

- Dict와 달리, 데이터를 입력한 순서대로 dict를 반환함
- 현재는 순서를 보장하여 출력하기 때문에 참고만

### defaultdict

- Dict type의 값에 기본 값을 지정, 신규값 생성 시 사용하는 방법

```python
d = dict()
print(d["first"])
------------------------------------------
KeyError: 'first'
```

- **존재하지 않는 키**를 접근하려 할 때 **자동으로 기본값을 생성**해 주는 기능

```python
from collections import defaultdict
d = defaultdict(object) # Default dictionary를 생성
d = defaultdict(lambda: 0) # Default 값을 0으로 설정
print(d["first"])
#
```

```python
from collections import defaultdict
text = """
A press release is the quickest and easiest way to get free publicity. If
well written, a press release can result in multiple published articles about your
firm and its products. And that Can mean new prospects contacting you asking you to
sell to them.
""".lower().split()

text_counter = defaultdict(object)
text_counter = defaultdict(lambda: 0)
for word in text:
        text_counter[word] += 1

print(text_counter["to"])
# 3
```

### Counter

- Sequence type의 data element들의 갯수를 dict 형태로 반환

```python
from collections import Counter

c = Counter()
c = Counter('gallahad')
print(c)
# Counter({'a': 3, 'l': 2, 'g': 1, 'd': 1, 'h': 1})
```

- Set의 연산들을 지원함(set의 확장 버전)

### namedtuple

- Tuple 형태로 Data 구조체를 저장하는 방법
- 저장되는 data의 variable을 사전에 지정해서 저장함

```python
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(x = 11, y = 22)
print(p[0]+p[1])
```

---

[^1] : 각 요소가 다음 요소에 대한 참조(링크)를 포함하는 요소의 순서로 구성된 데이터 구조.
