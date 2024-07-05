---
title: Python 기본 문법 - Function and Console I/O
date: 2024-07-05
categories: python-basic
---

# Function and Console I/O

## Function

- 어떤 일을 수행하는 코드의 덩어리
  - 반복적인 수행을 1회만 작성 후 호출
  - 코드를 논리적인 단위로 분리
    - **하나의 코드는 하나의 보고서**
  - 캡슐화 : 인터페이스만 알면 타인의 코드 사용

```
def 함수 이름 (parameter #1, ...,):
    수행문 #1(statements)
    return <반환값값
```

### 함수의 수행 순서

- def를 메모리에 올려놓음

- 프로그램의 함수와 수학의 함수는 유사함
- 모두 입력 값과 출력 값으로 이루어짐
- parameter : 함수의 입력값 인터페이스
- argument : 실제 Parameter에 대입된 값

```
def f(x): <- x가 parameter

>>>print(f(2)) <- 2가 argument
```

---

## console in/out

: 어떻게 프로그램과 데이터를 주고(input) 받을(print) 것인가?

- input() : 문자열을 입력 받는 함수

---

### Print Formatting

1. %string(퍼센트 스트링)
2. format 함수
3. fstring

---

1. %string과 str.format()

- %string

```
print('%s %s % ('one', 'two'))
- %s : string
- $d : digit

print('{} {}'.format(1,2))

```

- "%datatype"%(variable) 형태로 출력 양식을 표현

```
print("I eat %d apples."% 3)
print("Product: %s, Price per unit: %f." % ("Apple", 5.243))
print("Product: %s, Price per unit: %8.2f." % ("Apple", 5.243))
  %8.2f : 8자리로 출력, 소수점 아래 2자리만 출력
  %10s : 10자리 문자열 출력
```

- str.format()
  - "{datatype}".format(argument)

```
print("My name is {0}. I'm {1} years.old.".format(name, age))
  {0}, {1} : 인덱스
print("My name is {0}. I'm {1:10.5f} years.old.".format(name, age))
  {1:10.5f} : 10자리로 출력, 소수점 아래 5자리까지 출력
{0:<10s} : 왼쪽 정렬
{0:>10s} : 오른쪽 정렬
```

- padding
  - {1:10.5f} : 10자리로 출력, 소수점 아래 5자리까지 출력
  - {0:<10s} : 왼쪽 정렬
  - {0:>10s} : 오른쪽 정렬
- naming
  - print("Product : %(name)10s, Price per unit: %(price)10.5f"% {"name":"Apple", "price":5.243})
  - print("Product : {name:10s}, Price per unit: {price:10.5f}.".format(name="Apple", price=5.243))

---

- f-string

```
print(f"Hello, {name}. You are {age}.")
print(f"{name:20}) : 기본이 왼쪽 정렬, 20자리 출력
print(f"{name:>20}) : 오른쪽 정렬
print(f"{name:*<20}) : 왼쪽 정렬에 빈 공간을 *로 채움
print(f"{name:*>20}) : 오른쪽 정렬에 빈 공간을 *로 채움
print(f"{name:*^20}) : 가운데 정렬에 빈 공간을 *로 채움
print(f"{number:.2f}") : 소수점 아래 2자리
```
