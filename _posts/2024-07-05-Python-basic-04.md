---
title: Conditionals and Loops(조건문과 루프)
date: 2024-07-05
categories: python-basic
---

## 조건문

- 조건에 따라 특정한 동작을 하게하는 명령어
- 조건문은 조건을 나타내는 **기준**과 실행해야 할 **명령**으로 구성됨
- 파이썬은 조건문으로 if, else, elif 등의 예약어를 사용함

### if-else문 문법

- 조건 일치시 수행 명령 block
- 조건 불일치시 수행 명령 block

```python
비교 연산자

x < y
x > y
x == y
x is y : 메모리의 주소를 비교
x != y
x is not y
x >= y
x <= y
```

```python
boolean_list = [True, False, True, False, True]

all(boolean_l ist )
False

any(boolean_list )
True
```

- 삼항 연산자(Ternary operators)
  - 조건문을 사용하여 참일 경우와 거짓일 경우의 결과를 한줄에 표현

```python
>>>value = 12
>>> is_even = True if value % 2 == 0 else False
>>>print (is_even)
True
```

## Loop

- 정해진 동작을 반복적으로 수행하게 하는 명령문
  - 반복 시작 조건
  - 종료 조건
  - 수행 명령
- for, while

### for loop

- range() 사용하기

```python
for looper in [1,2,3,4,5]:
print ("hello")
for 1ooper in range(0, 5):
print ("hello")
```

- 왜 range(1, 5)가 아닌 range(0, 5)인가?

  - range()는 마지막 숫자 바로 앞까지 리스트를 만들어줌
  - range(1, 5) = [1, 2, 3, 4]까지라는 의미
  - range(0, 5) = range(5)

- 간격을 두고 세기

```python
for i in range(1, 10, 2):
  # 1부터 10까지 2씩 증가시키면서 반복문 수행
```

- 역순으로 반복문 수행

```python
for i in range(10, 1, -1):
  # 10부터 1까지 -1씩 감소시키면서 반복문 수행
```

### while문

- **조건이 만족하는 동안** 반복 명령문을 수행

- 반복의 제어 - break, continue, else
  - break : 특정 조건에서 반복 종료

```python
for i in range(10):
    if i== 5: break
    print (i)
print ("EOP")
```

- continue : 특정 조건에서 남은 반복 명령 skip

```python
for i in range(10):
    if i == 5: continue
    print (i)
print ("EOP")
```

- else : 반복 조건이 만족하지 않을 경우 반복 종료 시 1회 수행

```python
for i in range(10):
    print (i,)
else:
    print ("EOP")
```

## loop & control lab

- 가변적인 중첩 반복문(variable nested loops)

## debugging

- 코드의 오류를 발견하여 수정하는 과정
- 오류의 '원인을 알고 '해결책'을 찾아야 함
- **문법적 에러**를 찾기 위한 에러 메시지 분석
- **논리적 에러**를 찾기 위한 테스트도 중요

```markdown
- IndentationError : 들여쓰기 오류
- NameError : 오탈자
-
```

```
File "test.py, line 1 # 몇번째 줄에
 test = float(intput())
 ^  # 이 부분에 에러가 있어요
IndentationError : unexpected indet # 이런 문제가 있네요
```

- 논리적 에러 : print()를 찍어보며 확인하기

```python
if __name__ == '__main__':
  main()
  # 특수한 언더바 두개
```
