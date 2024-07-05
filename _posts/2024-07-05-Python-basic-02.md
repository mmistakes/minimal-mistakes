---
title: Python 기본 문법 - variable, list, operations
date: 2024-07-05
categories: python-basic
related_posts:
  - "2024-07-05-Python-basic-01.md"
  - "2024-07-05-Python-basic-01-review.md"
---

## Variable & List

variable & memory

데이터(값)을 저장하기 위한 메모리 공간의 프로그래밍상 이름

professor = "Sungchul Choi"의 의미는 **professor에 Sungchul Choi를 넣어라**

- professor라는 변수에 "Sungchul Choi"라는 값을 넣으라는 의미

- 변수는 메모리 주소를 가지고 있고 변수에 들어가는 값은 메모리 주소에 할당됨
- a = 8의 의미는 "a는 8이다"가 아닌 a라는 이름을 가진 메모리 주소에 8을 저장하라 임

---

## basic operations

1. 기본 자료형(primitive data type)
2. 연산자와 피연산자
3. 데이터 형변환

---

1. 파이썬이 처리할 수 있는 데이터 유형
   1. integer
   2. float
   3. string
   4. boolean

- 데이터 타입마다 메모리가 가지는 크기가 달라짐
  - integer : 4바이트, 32비트[^1]
  - long : 무제한
  - float : 8바이트, 64비트
  - string : 각 문자는 1바이트 또는 2바이트
  - boolean : 1바이트

다이나믹 타이핑 Dynamic Typing : 타입에 대해서 선언하지 않더라도 알아서 타입을 인식

---

2. 연산자(Operator)와 피연산자(operand)

- 문자 간 + 연산 : concatenate
- 제곱 연산 : \*\*
- % : 나머지 연산
- += : 증가 연산
- -= : 감소 연산

---

3. 형변환

\>>> a = 10

\>>> type(a)

\<class 'int'>

\>>> float(a)

10.0

\>>> type(a)

\<class 'int'>

\>>> a = float(a) # 재할당을 해줘야 형변환이 됨

\>>> type(a)

\<class 'float'>

---

4. List 또는 Array

- 시퀀스 자료형
- list의 값들은 주소(offset)를 가짐
  cities[start 인덱스 : end 인덱스 : step]
- 다양한 데이터 타입이 하나의 List에 들어감

  - a = ["color", 1, 0.2]

- 리스트 메모리 저장 방식

  - a = [5, 4, 3, 2, 1]
  - b = [1, 2, 3, 4, 5]
  - b = a # 메모리 주소 참조
  - a.sort()

  - b = a[:] # 메모리 주소 공유가 아닌 새롭게 복사[^2]

- 패킹 : 한 변수에 여러 개의 데이터를 넣는 것
- 언패킹 : 한 변수의 데이터를 각각의 변수로 반환

\>>> t = [1, 2, 3] # 1, 2, 3을 변수 t에 패킹
\>>> a, b, c = t # t에 있는 값 1, 2, 3을 변수 a, b, c에 언패킹

---

[^1]:
    비트(bit) : 0 또는 1을 가짐
    바이트(Byte) : 8개의 bit로 구성. 0~255
    킬로바이트(Kilobyte) : 1024 Byte
    메가바이트(Megabyte) : 1024 KB

[^2]: 2차원 matrix는 안됨. 이때는 import copy copy.deepcopy(array)
