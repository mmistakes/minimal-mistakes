---
layout: single
title:  "코딩 테스트 책 - 3차시"
categories : coding-test
tag : [이것이 취업을 위한 코딩 테스트다, python, 나동빈]
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=코딩 테스트 책 - 3차시&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

&nbsp;

## 자료구조

- **탐색**
  - 많은 양의 데이터 중에서 원하는 데이터를 찾는 과정
- **자료구조**
  - 데이터를 표현하고 관리하고 처리하기 위한 구조
    - 삽입(push) : 데이터 삽입
    - 삭제(pop) : 데이터 삭제
    - 오버플로 : 특정 자료구조가 수용할 수 있는 데이터의 크기를 이미 가득 찬 상태에서 삽입 연산 수행시 발생
    - 언더플로 : 데이터가 없는 상태에서 삭제 연산을 수행하면 발생

&nbsp;



## 스택

- 선입후출(First In Last Out) or 후입선출(Last In First Out)
  - 먼저들어온것이 가장 나중에 나감


&nbsp;

### 예제) 스택

```python
- 삽입(5), 삽입(2), 삽입(3), 삽입(7), 삭제(), 삽입(1), 삽입(4) ,삭제() 

example = []

example.append(5)
example.append(2)
example.append(3)
example.append(7)
example.pop()
example.append(1)
example.append(4)
example.pop()

print(example) # 최하단 부터
print(example[::-1]) # 최상단 부터
```

&nbsp;



## 큐

- 선입선출(First In First Out) 구조

&nbsp;

### 예제) 큐

```python
- 삽입(5), 삽입(2), 삽입(3), 삽입(7), 삭제(), 삽입(1), 삽입(4) ,삭제() 

from collections import deque

queue = deque()

queue.append(5)
queue.append(2)
queue.append(3)
queue.append(7)
queue.popleft()
queue.append(1)
queue.append(4)
queue.popleft()

print(queue) # 입력부터 출력
queue.reverse() # 역순으로 변경
print(queue) # 나중 원소부터 출력
```



&nbsp;



## 재귀 함수

- 자기 자신을 다시 호출하는 함수
- 재귀 함수는 종료 조건을 명시해야함
- 스택 자료구조를 사용 가장 마지막에 호출한 함수가 먼저 수행을 끝나야 그 앞의 호출이 종료되기 때문

&nbsp;

### 예제) 팩토리얼

```python
def factorial(n):
    
    result = 1
    
    for i in range(1,n+1):
        result *= i
    
    return result

def factorial_re(n):
    if n<= 1:
        return 1
    else:
        return n * factorial_re(n-1)
```

> 수학의 점화식을 그대로 소스코드로 옮겼기 때문에 더욱 간결한 형태가 유지됨

&nbsp;


