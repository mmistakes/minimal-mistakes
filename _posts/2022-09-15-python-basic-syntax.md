---
layout: single
title:  "알고리즘을 위한 Python 기초 문법"
excerpt: "박상길, 『파이썬알고리즘인터뷰』, 책만(2020), p73-98."

categories: Python
tag: [Python, Syntax, Style]

toc: true
toc_sticky: true

author_profile: true
sidebar: true

search: true
 
date: 2022-09-15
last_modified_at: 2022-09-19
---



<br/><br/>



# Python's Syntax



<br/><br/>

## 인덴트



PEP 8 에 따라 **공백 4칸**이 원칙이다.



이외에도 여러가지 기준들이 포함되어 있다.

```python
foo = long_function_name(var_one, var_two,
                        var_three, var_four)
```

첫째 줄에 파라미터가 있다면, 시작되는 부분에 맞춰준다.



```python
def long_function_name(
        var_one, var_two, var_three,
        var_four):
    print(var_one)
```

첫번째 줄에 파라미터가 없으면, 공백 4칸 인덴트를 한번더 추가하여 print(var_one)의 행과 구분이 되게 한다.



```python
foo = long_function_name(
    var_one, var_two,
    var_trhee, var_four)
```

여러 줄로 나눠쓸 경우 다음 행과 구분되도록 인덴트를 추가한다.        

PyCharm 커뮤니티 에디션과 같은 도구를 이용해 이러한 기준들을 편리하게 맞출 수 있다.    

파이참에서 Reformat Code를 실행하면 자동으로 PEP 8 에 맞춰준다. (단축키 Ctrl + Alt + L)



<br/><br/>

## 네이밍 컨벤션



변수명이나 함수명은 단어를 밑줄(_)로 구분하여 표기하는 **Snake Case** 를 따른다.



<br/><br/>

## 타입힌트



파이썬 버전 3.5부터 사용이 가능하다.

CPython의 typing.py에는 선언할 수 있는 타입이 잘 명시되어 있으며 다음과 같은 형태로 타입을 선언 할 수 있다.

```python
a: str = "1"
b: int = 1
```



함수도 마찬가지로 가독성이 좋도록 선언을 할 수가 있다.

```python
def fn(a: int) -> bool:
    ...
```

온라인 코딩 테스트 시 mypy를 이용해 수정을 거친뒤 제출할 수 있다

```python
$pip install mypy #pip으로 손쉽게 설치가 가능하다
$mypy our_file.py our_directory #타입힌드가 잘못 지정된 코드 손쉽게 수정
```

![mypy](C:\LEESIN97-github-blog\LEESIN97.github.io\images\2022-09-15-python-basic-syntax\mypy.PNG)

<br/><br/>

## 리스트 컴프리헨션

파이썬에서 오래 사용되어온 리스트 컴프리헨션은 가독성이 좋아 많이 사용이 된다.

```python
[n*2 for n in range(1, 11) if n % 2 == 1] #1부터 10중 홀수인 경우 2를 곱해 출력
```



리스트 뿐만 아니라 딕셔너리 등도 가능하다.

```python
a = {key: value for key, value in original.items()}
```

<br/><br/>

## 제너레이터

제너레이터는 루푸의 반복 동작을 제어할 수 있는 루틴 형태를 말한다.

```python
def get_natural_number():
    n = 0
    while True:
        n += 1
        yield n
```

다음 함수에서 yield 구문을 사용하면 제너레이터를 리턴해 호출할 때 중간값을 리턴한다.

무한반복문이므로 계속해서 yield할 수가 있다.

```python
g = get_natural_number()
for _ in range(0, 100):
    print(next(g))
```

위의 코드는 1부터 100까지 출력을 하게 된다.

```python
def generator(): #다음과 같은 형식으로 어떠한 타입의 값을 생성할 수 있다.
    yield 'string'
g = generator()
next(g)
```

<br/><br/>

## range

range도 마찬가지로 제너레이터의 방식을 활용한 함수이다.

range()는 range클래스를 리턴한다.

for 문에서 사용할 경우 내부적으로 다음 숫자를 생성해내게 된다.

제너레이터를 리턴하게 되면 많은 반복문을 실행할 때 메모리를 직접 차지하지 않고, 값이 필요할 때 생성 조건에서 꺼내쓸 수 있게 된다.

```python
a = [n for n in range(10000)]
b = range(10000) #index로 접근이 가능하다.
```

len()함수를 통해 비교하면 둘다 동일한 길이를 출력하게 된다. 하지만 a는 실제값이 메모리를 차지하고 있고 b는 생성조건만 메모리에 담겨져있다.

<br/><br/>

## enumerate

여러가지 자료형 ex) list, set, tuple을 인덱스를 포함한 enumerate객체로 리턴한다.

```python
a = [1, 2, 3, 2, 45, 2, 5]
enumerate(a) #enumerate object를 return
```

```python
list(enumerate(a)) # >>> [(0,1), (1,2) .... ] 이러한 형식으로 출력
```

배열의 인덱스와 인덱스에 해당하는 값을 출력하기 위해

```python
for i in range(len(a)):
    print(i, a[i])
```

다음과 같이 사용하면 값을 가져오기 위해 a[i]를 a의 길이만큼 조회해야 하므로 깔끔하지 않다.

```python
i = 0
for v in a:
    print(i, v)
    i += 1
```

다음과 같은 경우에는 i라는 변수를 따로 관리하므로 깔끔하지 않다.

```python
for i, v in enumerate(a):
    print(i, v)
```

위와 같인 코드가 enumerate() 함수를 이용하여 코드를 깔끔하게 만들 수 있다.

<br/><br/>

## //나눗셈연산자

python 3버전 이상에서는 / 연산자는 실수형의 값을 리턴하고, // 연산자는 몫을 리턴한다.

나머지 연산자는 %이고, 동시에 구하려면 함수 divmod()를 이용할 수도 있다.  (tuple로 반환)

<br/><br/>

## print

부득이한 경우에 print()를 이용하여 디버깅하는 경우가 있을 수 있다. (코딩테스트에 한해)

다음과 같은 특성들을 이용한다.

```python
print('A1', 'B2') #default  한 칸 공백
print('A1', 'B2', sep = ',') #구분자를 설정할 수도 있다.
print('aa') #default 줄바꿈
print('aa', end=' ') #줄바꿈을 하지 않고 공백을 준다.
```

```python
a = ['a', 'b']
print(' '.join(a)) #리스트를 출력할 때 join() 함수를 이용한다.
```

```python
idx = 1
fruit = "Apple"

print('{0}: {1}'.format(idx+1, fruit)) #인덱스를 생략할 수도 있다.
print(f'{idx+1}:{fruit}') #f-string을 이용한 방법 3.6+ 에서 지원
```

<br/><br/>

## pass

```python
class MyClass(object):
    def method_a(self):
        pass
    def method_b(self):
        print("Method B")
```

pass는 널 연산으로 아무것도 하지 않는 기능이다.

mockup 인터페이스부터 구현하고 구현을 진행할 수 있게 한다.

<br/><br/>

## locals

locals()는 딕셔너리를 가져오는데, 로컬에 선언된 모든 변수를 조회할 수 있다.

이는 디버깅에 많은 도움을 준다.

```python
import pprint
pprint.pprint(locals()) # 클래스 메소드 내부의 모든 로컬 변수를 출력
```

<br/><br/>

# Style



* 변수 : 각각의 의미를 부여해 작명
* 주석 : 파이썬에는 간단한 주석(영어)을 부여하면 가독성이 높아보인다.
* 리스트 컴프리헨션의 표현식은 가독성을 위해 최대 2개, 경우에 따라는 풀어쓴다.
* 함수의 기본값으로 Mutable object를 사용하지 않고, Immutable object를 사용한다. 
* 함수의 기본값에 None을 명시적으로 할당할 수도 있다.
* True, False는 암시적인 방법을 사용하는 방법이 좋다.











