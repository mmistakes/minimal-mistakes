---
layout: single
title:  "Basic prepare course"
categories: 
tag: [python]
toc: true
author_profile: false
---

<head>
  <style>
    table.dataframe {
      white-space: normal;
      width: 100%;
      height: 240px;
      display: block;
      overflow: auto;
      font-family: Arial, sans-serif;
      font-size: 0.9rem;
      line-height: 20px;
      text-align: center;
      border: 0px !important;
    }

    table.dataframe th {
      text-align: center;
      font-weight: bold;
      padding: 8px;
    }

    table.dataframe td {
      text-align: center;
      padding: 8px;
    }

    table.dataframe tr:hover {
      background: #b8d1f3; 
    }

    .output_prompt {
      overflow: auto;
      font-size: 0.9rem;
      line-height: 1.45;
      border-radius: 0.3rem;
      -webkit-overflow-scrolling: touch;
      padding: 0.8rem;
      margin-top: 0;
      margin-bottom: 15px;
      font: 1rem Consolas, "Liberation Mono", Menlo, Courier, monospace;
      color: $code-text-color;
      border: solid 1px $border-color;
      border-radius: 0.3rem;
      word-break: normal;
      white-space: pre;
    }

  .dataframe tbody tr th:only-of-type {
      vertical-align: middle;
  }

  .dataframe tbody tr th {
      vertical-align: top;
  }

  .dataframe thead th {
      text-align: center !important;
      padding: 8px;
  }

  .page__content p {
      margin: 0 0 0px !important;
  }

  .page__content p > strong {
    font-size: 0.8rem !important;
  }

  </style>
</head>


# 기초


## 주피터 노트북


### 탭 자동완성

대부분의 통합 개발 환경이나 대화형 데이터 분석 환경에 구현되어 있는 기능으로, 셸에서 입력을 하는 동안 탭을 누르면 네임스페이스에서 그 시점까지 입력한 내용과 맞아떨어지는 변수(객체, 함수 등)를 자동으로 찾아준다.

![tab-1.png](../../images/2022_07_18_image/tab_ex01.png)

어떤 객체의 메서드나 속성 뒤에 마침표를 입력한 후 자동완성 기능을 활용할 수도 있다.

![tab-2.png](../../images/2022_07_18_image/tab_ex02.png)

탭 자동완성은 대화형 네임스페이스 검색과 객체 및 모듈 속성의 자동완성뿐만 아니라 파일 경로를 입력(파이썬 문자열 안에서도)한 후 탭을 누르면 입력한 문자열에 맞는 파일 경로를 컴퓨터의 파일 시스템 안에서 찾아서 보여준다. 또한 함수에서 이름을 가진 인자(= 기호까지 포함해서)도 보여준다.

![tab-3.png](../../images/2022_07_18_image/tab_ex03.png)

### 자기관찰

변수 이름 앞이나 뒤에 ?기호를 붙이면 그 객체에 대한 일반 정보를 출력한다.

![instro.png](../../images/2022_07_18_image/instro.png)

이 기능은 객체의 **자기관찰**(인트로스펙션<sup>introspection</sup>)이라고 하는데, 만약 객체가 함수이거나 인스턴스 메서드라면 정의되어 있는 문서<sup>docstring</sup>를 출력해준다.



??를 사용하면 가능한 경우 함수의 소스 코드도 보여준다.


### 표준 IPython 키보드 단축키



|키보드 단축키|내용|
|:------|:---|
|Ctrl-P 또는 위 화살표 키|명령어 히스토리를 역순으로 검색하기|
|Ctrl-N 또는 아래 화살표 키|명령어 히스토리를 최근 순으로 검색하기|
|Ctrl-R|readline 형식의 히스토리 검색(부분 매칭)하기|
|Ctrl-Shift-V|클립보드에서 텍스트 붙여넣기|
|Ctrl-C|현재 실행 중인 코드 중단하기|
|Ctrl-A|커서를 줄의 처음으로 이동하기|
|Ctrl-E|커서를 줄의 끝으로 이동하기|
|Ctrl-K|커서가 놓인 곳부터 줄의 끝까지 텍스트 삭제하기|
|Ctrl-U|현재 입력된 모든 테스트 지우기|
|Ctrl-F|커서를 앞으로 한 글자씩 이동하기|
|Ctrl-B|커서를 뒤로 한 글자씩 이동하기|
|Ctrl-L|화면 지우기|



### 매직 명령어

IPython은 파이썬 자체에 존재하지 않는 '매직'명령어라고 하는 여러 가지 특수한 명령어를 포함하고 있다. 이 매직 명령어는 일반적인 작업이나 IPyhton 시스템의 동작을 쉽게 제어할 수 있도록 설계된 특수한 명령어다. 매직 명령어는 앞에 % 기호를 붙이는 형식으로 사용한다.



|명령어|설명|
|:------|:---|
|%quickref|IPython의 빠른 도움말 표시|
|%magic|모든 매직함수에 대한 상세 도움말 출력|
|%debug|최근 예외 트레이스백의 하단에서 대화형 디버거로 진입|
|%hist|명령어 입력(그리고 선택적 출력) 히스토리 출력|
|%pdb|예외가 발생하면 자동으로 디버거로 진입|
|%paste|클립보드에서 들여쓰기 된 채로 파이썬 코드 가져오기|
|%cpaste|실행할 파이썬 코드를 수동으로 붙여 넣을 수 잇는 프롬프트 표시|
|%page *OBJECT*|객체를 pager를 통해 보기 좋게 출력|
|%run *script.py*|IPython 내에서 파이썬 스크립트 실행|
|%prun *statement*|cProfile을 이용하여 *statement*를 실행하고 프로파일 결과를 출력|
|%time *statement*|*statement*의 단일 실행 시간을 출력|
|%timeit *statement*|*statement*를 여러 차례 실행한 후 평균 실행 시간을 출력. 매우 짧은 시간 안에 끝나는 코드의 시간을 측정할 때 유용|
|%who, %who_ls, %whos|대화형 네임스페이스 내에 정의된 변수를 다양한 방법으로 표시|
|%xdel *variable*|*Variable*을 삭제하고 IPython 내부적으로 해당 객체에 대한 모든 참조를 제거|


## 파이썬

<strong>파이썬은 가독성과 명료성 그리고 명백함을 강조한다.</strong>


### 들여쓰기

파이썬은 R, C++, 자바, 펄 같은 다른 많은 언어와는 다르게 중괄호 대신 공백 문자(탭이나 스페이스)를 사용해서 코드를 구조화한다. 콜론(:)은 코드 블록의 시작을 의미하며 블록이 끝날 때까지 블록 안에 있는 코드는 모두 같은 크기만큼 들여 써야 한다.

<code>

    for x in array:

        if x < pivot:

             less.append(x)

         else:

             greater.append(x)


### 주석

\# 뒤에 오는 문자는 모두 파이썬 인터프리터에서 무시된다. 이를 이용해서 코드에 주석을 달 수 있다. 또한 코드를 지우지 않고 **실행만 되지 않도록** 남겨두고 싶을 때도 활용한다.



```python
for i in range(5):
    # 이 부분은 무시
    #print('출력이 안됩니다.')
    print(i, end=' ')
```

<pre>
0 1 2 3 4 
</pre>
### 함수와 객체 매서드 호출

함수는 괄호와 0개 이상의 인자를 전달해서 호출할 수 있다. 반환되는 값은 선택적으로 변수에 대입할 수 있다. 파이썬의 거의 모든 객체는 함수를 포함하고 있는데 이를 **메서드**라고 하며 객체의 내부 데이터에 접근할 수 있다.


### 변수와 인자 전달

파이썬에서 변수(혹은 **이름**)에 값을 대입하면 대입 연산자 오른쪽에 있는 객체에 대한 **참조**를 생성하게 된다.



```python
a = [1, 2, 3]
```


```python
b = a # b는 a를 참조한다.
```


```python
a.append(4) # b가 a와 같은 객체를 참조하므로 4가 추가된 list객체를 참조한다.
print(b)
```

<pre>
[1, 2, 3, 4]
</pre>
변수에 값을 할당하는 것은 이름을 객체에 연결하는 것이므로 **바인딩**이라고 부른다. 값이 할당된 변수 이름을 때때로 바운드 변수라고 부르기도 한다.


### 동적 참조와 강한 타입

파이썬에서 모든 객체는 특정한 자료형(또는 **클래스**)을 가지며 다음과 같은 어떤 명백한 상황에서만 묵시적인 변환을 수행하는 자료형을 구분하는 **강한 타입**의 언어라고 하는 것이 맞을 것이다.



```python
a = 4.5

b = 2

print('a is {0}, b is {1}'.format(type(a), type(b)))
print(a / b) # b는 int형이지만 묵시적인 변환을 수행하여 연산에 참여
```

<pre>
a is <class 'float'>, b is <class 'int'>
2.25
</pre>
isinstance 함수를 이용하면 객체의 자료형을 검사할 수 있다.



```python
a = 5
isinstance(a, int)
```

<pre>
True
</pre>
### 속성과 메서드

파이썬에서 객체는 일반적으로 속성(객체 내부에 저장되는 다른 파이썬 객체)과 메서드(객체의 내부 데이터에 

접근할 수 있는 함수)를 가진다. 속성과 메서드는 *obj.attribute_name* 문법으로 접근할 수 있다. getattr 함수를 통해 이름으로 접근하는 것도 가능하다.



```python
a = 'foo'
getattr(a, 'split')
```

<pre>
<function str.split(sep=None, maxsplit=-1)>
</pre>
### 덕 타이핑

객체의 자료형에는 관심이 없고 그 객체가 어떤 메서드나 행동을 지원하는지만 알고 싶은 경우 사용한다. 예를 들어 어떤 객체가 **이터레이터**를 구현했다면 순회가 가능한 객체인지 검증할 수 있다.



```python
def isiterable(obj):
    try:
        iter(obj)
        return True
    except TypeError: # iterable 객체 아님
        return False
```


```python
print(isiterable('a string'))
print(isiterable([1, 2, 3]))
print(isiterable(5))
```

<pre>
True
True
False
</pre>