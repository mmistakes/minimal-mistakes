---
title: String and advanced function concept
date: 2024-07-06
categories: python-basic
---
# String and advanced function concept

## String

- 시퀀스 자료형으로 문자형 data를 메모리에 저장
- 영문자 한 글자는 1byte의 메모리 공간을 사용
- ![alt text](image.png)

비트 : 0 또는 1

바이트 = 비트 8개 = 256

킬로바이트 = 1024바이트

- 문자열의 각 문자는 개별 주소(offset)을 가짐
- 이 주소를 사용해 할당된 값을 가져오는 것이 **인덱싱**
- List와 같은 형태로 데이터를 처리함

```python
len(a)
a.upper()
a.1ower()
a.capitalize()
a.titile()
a.count('abc')
a.find('abc')
a.rfind('abc')
a.startswith('abc')
a.endswith('abc')
a.split()
a.isdigit()
```

## Function

- call by object reference

- 함수에서 parameter를 전달하는 방식

  1. 값에 의한 호출(Call by value)
  2. 참조에 의한 호출(Call by reference)
  3. 객체 참조에 의한 호출(Call by object reference)

- Call by Object Reference
  - 파이썬의 객체의 주소가 함수로 전달되는 방식
    - 전달된 객체를 참조하여 변경 시 호출자에게 영향을 주나 새로운 객체를 만들 경우 호출자에게 영향을 주지 않음

```python
def spam(eggs):
    eggs.append(1) # 기존 객체의 주소값에 [1] 추가
    eggs = [2, 3] # 새로운 객체 생성
ham = [0]
spam(ham)
print(ham) # [0,1]
```

- swap

## swap_value(x, y)

```python
def swap_value(x, y):
    temp = x
    x = y
    y = temp
```

- 이 함수는 `x`와 `y`라는 변수 두 개를 받아서 그 값들을 교환합니다.
- 중요한 점은 이 함수가 받은 값들만 교환할 뿐, 리스트 `a`에는 아무런 영향을 주지 않습니다.
- 예를 들어, `swap_value(a[0], a[1])`을 호출하면 `x`는 1, `y`는 2가 되어 교환됩니다. 그러나 이 교환은 함수 내부에서만 일어나고 리스트 `a`는 그대로 `[1, 2, 3, 4, 5]`입니다.

## swap_offset(offset_x, offset_y)

```python
def swap_offset(offset_x, offset_y):
    temp = a[offset_x]
    a[offset_x] = a[offset_y]
    a[offset_y] = temp
```

- 이 함수는 리스트 `a`의 특정 위치에 있는 값을 교환합니다.
- `offset_x`와 `offset_y`는 리스트의 인덱스(위치)를 의미합니다.
- 예를 들어, `swap_offset(0, 1)`을 호출하면 `a[0]`과 `a[1]`의 값이 교환되어 리스트 `a`는 `[2, 1, 3, 4, 5]`가 됩니다.

## swap_reference(list, offset_x, offset_y)

```python
def swap_reference(list, offset_x, offset_y):
    temp = list[offset_x]
    list[offset_x] = list[offset_y]
    list[offset_y] = temp
```

- 이 함수는 전달된 리스트의 특정 위치에 있는 값을 교환합니다.
- 리스트를 함수의 인자로 받아서 그 리스트의 원소들을 교환합니다.
- 예를 들어, `swap_reference(a, 0, 1)`을 호출하면 `a[0]`과 `a[1]`의 값이 교환되어 리스트 `a`는 `[2, 1, 3, 4, 5]`가 됩니다.

---

## function - scoping rule

- 변수의 범위(Scoping Rule)
- 지역변수(local variable) : 함수내에서만 사용
- 전역변수(Global variable) : 프로그램 전체에서 사용

```python
def test(t): # t : 함수 내의 변수 local variable
  print(x) # x : 함수 밖의 변수 global variable
  t = 20
  print("In Function: ", t)

x = 10
text(x)
print(t)
```

```python
def f():
    global s
    s="I love London!"
    print(s)
s = "I love Paris!"
f()
print(s)

# I love London!
# I love London!
```

## Recursive Function(재귀 함수)

- 자기 자신을 호출하는 함수
- 점화식과 같은 재귀적 수학 모형을 표현할 때 사용
- 재귀 종료 조건 존재, 종료 조건까지 함수호출 반복

## Function type hints

- 파이썬의 가장 큰 특징 : dynamic typing
- 처음 함수를 사용하는 사용자가 interface를 알기 어렵다는 단점이 있음

```python
def do_function(var_name: var_type) -> return_type:
    pass
def type_hint_example(name: str) -> str:
    return f"Hell0, {name}"
```

- Type hints의 장점
  1. 사용자에게 인터페이스를 명확히 알려줄 수 있다.
  2. 함수의 문서화시 parameter에 대한 정보를 명확히 알 수 있다.
  3. 시스템 전체적인 안정성을 확보할 수 있다.

ex)
![alt text](image-1.png)

## docstring

- 파이썬 함수에 대한 상세스펙을 사전에 작성 -> 함수 사용자의 이해도 up
- 세 개의 따옴표로 docstring 영역 표시(함수명 아래)

## 함수 작성 가이드 라인

- 함수는 가능하면 짧게 작성할 것(줄 수를 줄일 것)
- 함수 이름에 함수의 역할, 의도가 명확히 드러낼 것

```python
def 동사+명사():
```

- 하나의 함수에는 유사한 역할을 하는 코드만 포함
- 인자로 받은 값 자체를 바꾸진 말 것(임시변수 선언)
- 공통적으로 사용되는 코드는 함수로 변환
- 복잡한 수식, 조건 -> 식별 가능한 이름의 함수로 변환

## 코딩은 팀플

> 컴퓨터가 이해할 수 있는 코드는 어느 바보나 다 짤 수 있다. 좋은 프로그래머는 사람이 이해할 수 있는 코드를 짠다. -마틴 파울러-

- 사람의 이해를 돕기 위한 **규칙**이 필요함
- 그 규칙을 **코딩 컨벤션**이라고 함(Google python convention)
  - 명확한 규칙은 없으나 중요한 건 팀이나 프로젝트 마다의 **일관성**
  - 들여쓰기는 Tab or 4 Space
    - 일반적으로 4 Space 권장
  - 한 줄은 최대 79자까지
  - 불필요한 공백은 피함
  - = 연산자는 1칸 이상 안 띄움
  - 주석은 항상 갱신, 불필요한 주석은 삭제
  - 코드의 마지막에는 항상 한 줄 추가
  - 소문자 l, 대문자 O, 대문자 I 금지
  - 함수명은 소문자로 구성, 필요하면 밑줄로 나눔
