---
layout: single
title:  "Python - basic gramma"
categories: Python
tag: [python]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>





# ◆python이란?

-플랫폼에 독립적이며 인터프리터식, 객체지향적, 동적 타이핑(dynamically typed) 대화형 언어이다.<br/>-``colab``을 많이 이용한다.

<br/>







# ◆변수

-데이터를 담을 수 있는 공간이다.<br/>-형식 : ``변수이름 = 대입 값``

```python
num = 2
print(num) 
결과 : 2
```



## 1)변수명 규칙

-영문자, 숫자, 언더바(_)는 사용 가능하다.(단, 영문자는 대문자와 소문자 다르게 인식한다.)<br/>-숫자로 시작할 수 없다.<br/>-키워드 사용이 불가능 하다.<br/>-변수명 첫글자는 항상 소문자로 생성한다.<br/>-두가지의 문자를 섞어서 변수명을 만들경우 두 단어를 구분해 준다.(ex numberList, number_list)

<br/>







# ◆자료형 종류

-문자열은 큰따옴표와 작은따옴표를 사용하여 작성해야된다.

|      종류       | 예                                           |
| :-------------: | :------------------------------------------- |
|      숫자       | 정수 : -2, -1, 0 1, 2<br />실수 : 3.14, 0.12 |
| 문자열(string)  | "안녕하세요", 'hi'                           |
| 논리형(boolean) | True, False                                  |

<br/>







# ◆문자열



## 1)문자열_이스케이프 코드

| 종류 | 기능          | 예제                                            | 예제결과                                  |
| :--: | :------------ | ----------------------------------------------- | ----------------------------------------- |
|  \n  | 개행(줄바꿈)  | line = "life is too short \n you need python"   | life is too short  <br />you need python  |
|  \t  | 수평탭        | line = "life is too short \t you need python"   | life is too short<------->you need python |
| \ \  | 문자\ 자체    | line = "life is too short \ \ you need python " | life is too short\you need python         |
| \ '  | 단일 인용부호 | line = "life is too short \ ' you need python"  | life is too short'you need python         |
| \ "  | 이중 인용부호 | line = "life is too short \ " you need python"  | life is too short"you need python         |





## 2)문자열_인덱싱(indexing)

-인덱싱은 무언가를 "가르킨다" 의미를 가진다.<br/>-형식 : ``변수명[인덱스값]``

**예제**

|  M   |  y   |      |  n   |  a   |  m   |  e   |      |  i   |  s   |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
|  0   |  1   |  2   |  3   |  4   |  5   |  6   |  7   |  8   |  9   |
| -10  |  -9  |  -8  |  -7  |  -6  |  -5  |  -4  |  -3  |  -2  |  -1  |

```python
name = "My name is"
print(name[0]) // "M"
print(name[-4]) // "e"
```





## 3)문자열_슬라이싱(silcing)

-슬라이싱은 범위를 "가져온다" 의미를 가진다.<br/> -형식 : ``변수명[시작값 : 마지막값+1]``

**예제**

```python
name = "My name is"
print(name[0 : 2]) // "My"
print(name[:7]) // "My name"
print(name[3:]) // "name is"
```





## 4)문자열_포매팅(formatting)

-문자열 안의 특정한 값을 삽입해야 될때 사용한다.<br/>



### 4_1. 포맷코드 %d 

```python
month = 7
day = 4
print("오늘 %d월 4일 입니다."%month) // 오늘 7월 4일 입니다.
print("오늘 %d월 %d일 입니다."%(month, day) // 오늘 7월 4일 입니다.
```



**포맷코드 종류**

| 종류 | 기능                    |
| :--: | :---------------------- |
|  %s  | 문자열                  |
|  %c  | 문자 1개                |
|  %d  | 정수                    |
|  %f  | 실수                    |
|  %%  | literal % (문자 % 자체) |





### 4_2. format 함수를 사용한 포매팅

```python
month = 7
day = 4
print("오늘 {}월 {}일 입니다.".format(month, day)) // 오늘 7월 4일 입니다.
```





### 4_3. f 문자열를 사용한 포매팅

```python
month = 7
day = 4
print(f"오늘 {month}월 {day}일 입니다.") // 오늘 7월 4일 입니다.
```

<br/>







# ◆리스트(list)

-형식 : ``리스트명 = [요소1, 요소2, ..]``<br/>-파이썬의 자료구조 형태 중 하나이다.(많은 양의 데이터를 관리한다)<br/>-대괄호([])로 작성하며 리스트 내부의 값은 콤마(,)로 구분한다.<br/>-추가, 수정, 삭제가 가능한 객체의 집합이다.<br/> 



## 1)리스트_인덱싱

-형식 : ``리스트[인덱스]``

```python
list1 = [1,2,3,["a","b","c"]]
list1[0] // 1
list1[3] // ['a', 'b', 'c']
list1[3][0] // a
```





## 2)리스트_슬라이싱

 -형식 : ``리스트[start인덱스 : end인덱스+1]``<br/>

```python
list1 = [0,1,2,3,4,5] 
lsit1[0:3] // [0,1,2]
list1[:2] // [0,1]
list1[3:] // [3,4,5]
list1[:] // [0,1,2,3,4,5] 
```



## 3)리스트_더하기

```python
list1 = [1,2,3]
list2 = [5,6,7]
list1+list2 // [1,2,3,5,6,7]
```

<br/>







#  ◆튜플(tuple)

-형식 : ``튜플명 = (요소1, 요소2, ...)``<br/> -파이썬의 자료구조 형태 중 하나이다.(많은 양의 데이터를 관리한다)<br/>-소괄호(())로 작성하며 리스트 내부의 값은 콤마(,)로 구분한다.<br/>-추가, 수정, 삭제가 불가능한 객체의 집합이다.<br/>-**튜플_인덱싱** 과 **튜플_슬라이싱**의 형식은 위의 리스트 형식과 같다<br/>



**리스트와 튜플의 차이점**<br/> -리스트는 가변적이며 튜플은 불변적이다.<br/> -리스트는 요소가 몇개 들어갈지 명확하지 않을 때 사용한다.<br/> -튜플은 요소 개수가 정확할 때 사용한다.

<br/>







# ◆연산자

|      연산자      | 종류                                                         | 예시                                                         |
| :--------------: | :----------------------------------------------------------- | ------------------------------------------------------------ |
|    산술연산자    | +, -, * , /, //(몫), %(나머지)                               | print(7//4) = 1<br />print(7%4) = 3<br />print(str(10)+"7") = 107<br />print(10+int("7")) = 17 |
|    지수연산자    | **(제곱)                                                     | print(2**3) = 8                                              |
| 대입(복합)연산자 | =, +=, -+, *=, /+, //+, %=                                   | a+=b 는 a = a+b와 같다.<br />a-=3 은 a = a-3과 같다.         |
| 관계(비교)연산자 | >, >=, <, <=, ==, !=(같지않음)                               | print(3!=5) = true<br />print(3>=5) = false                  |
|    논리연산자    | not : 논리값을 뒤집는다,<br />and : 두값이 모두 true인 경우에만 true,<br />or : 둘 중에 하나라도 true면 true | print(3<8) = false<br />print(3<5 and 10==20) = false<br />print(3<5 and 10==10) = ture<br />print(3<5 or 10==20) =  true |
|    삼항연산자    | "a if 조건식 else b" : 조건식이 맞으면 a 실행 아니면 b 실행  | score = 80<br />"a" if score >=80 else "b"<br />결과 : a     |

<br/>







# ◆조건문

-조건에 따라 실행을 다르게 하는 문법이다.<br/>



## 1)if 조건문

-조건식이 True인 경우 실행문장을 실행하고 아니면 종료한다.<br/>

```python
<형식>
if 조건식 :
   실행문장

<예제>
if True :
   print("안녕하세요") // 안녕하세요
```





## 2)if else 조건문

-조건식이 True인 경우 실행문장1 실행하고 False인 경우 실행문장2 실행한다.<br/>

```python
<형식>
if 조건식 :
   실행문장1
else :
   실행문장2

<예제>
if False :
   print("안녕하세요")
else :
   print("반갑습니다") // 반갑습니다
```





## 3)elif 조건문

-조건식1 True인 경우 실행문장1 실행하고 False인 경우 다음 조건식2 확인해서 True 이면 실행문장2 실행 아니면 실행문장3 실행한다.<br/>

```python
<형식>
if 조건식1 :
    실행문장1
elif 조건식2 :
    실행문장2
else :
    실행문장3

<예제>
num = 5
if num >5 :
    print("성공")
elif num<= 5 :
    print("보류")
else :
    print("실패") // 보류
```

<br/>







# ◆반복문

-프로그램 내에서 똑같은 명령을 일정 횟수 만큼 반복하여 수행하도록 하는 제어문이다.<br/>



## 1)while문

-조건식이 True일때 실행문장을 반복한다.<br>-반복횟수가 명확하지 않을 때 사용한다.<br/>

```python
<형식>
whlile 조건식 :
       실행문장
<예제>
num = 1
while num<=3 :
    print(num)
    num += 1 // 1,2,3
```



### 1_1. while문_break

-반복문을 나가는 기능이다.<br/>-break에 조건문을 설정할 수 있다.<br/>

```python
num = 1
while True :
    print(num)
    num +=1
    if num>3 :
        break // 1,2,3
```





## 2)for문

-문자열, 리스트, 튜플이 들어갔을 때 변수에 데이터를 저장한 후 안에 있는 요소를 하나씩 반복하는 기능이다.<br/>

```python
<형식>
for 변수 in 문자열(리스트 or 튜플) :
    print(변수)
<예제>
list = ["a", "b", "c", "d"]
for num in list :
    print(num)  // a,b,c,d

hi = "안녕하세요"
for temp in hi :
    print(temp) //안녕하세요
```





### 2_1. for문_range()함수

-필요한 만큼의 숫자를 만들어 내는 유용한 기능이다.(출력범위를 지정할 수 있다.)<br/>-시작할 숫자의 기본값은 "0"이고 증감량의 기본값은 "1"이다.(시작숫자와 증감량을 안적어 주면 기본값으로 대체됨)<br/>-형식 : ``range(시작할 숫자, 종료할 숫자, 증감량)``

```python
range(1,10,1) // 1,2,3,4,5,6,7,8,9
range(10,1,-1) // 10,9,8,7,6,5,4,3,2

for num in range(1,10,1) :
    print(num) // 1,2,3,4,5,6,7,8,9
   
for num in range(3,10) :
    print(num) // 3,4,5,6,7,8,9
    
for num in range(10) :
    print(num) // 0,1,2,3,4,5,6,7,8,9
```





### 2_2. for문_print() end 속성

-print의 디폴트값이 end = '\n' 이여서 개행하지 않고 띄어쓰기를 하려면 end속성을 적어줘야함.<br/>

```python
for i in range(1,10,1) :
    print(i, end = " ") // 1,2,3,4,5,6,7,8,9(결과값이 개행되지 않고 띄어쓰기로 표현됨)
```