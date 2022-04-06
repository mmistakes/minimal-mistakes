---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 006"
categories: python
tag: [python, 파이썬, crawling, 크롤링]
toc: true
author_profile: false
toc: false
sidebar:
nav: "docs"
search: true
---

<center>**[공지사항]** <strong> [개인적인 공부를 위한 내용입니다. 오류가 있을 수 있습니다.] </strong></center>
{: .notice--success}


<h2>[파이썬(python) & 크롤링(crawling) - 006]</h2>


<h3> 파이썬(python) 기본 - 06</h3>

<h3>데이터 구조</h3>
###### 종류 : 리스트(list), 튜플(tuple), 딕셔너리(dictionary), 집합(set)
######    - list :  animals = ['','','','']
######    - tuple :  animals = ('','','','')

### Tuple
  - 괄호로 선언 => ex. tuple1 = (1,2,3,4)
    - type 확인해보기 => type(tuple1)  ==> 출력값: tuple
  - 추가, 삭제, 수정은 불가하고 입력과 읽기만 가능하다.
    - 읽기는 배열과 동일하다. tuple1[0] => 1, tuple1[1] => 2
  - 파이썬에서 리턴값이 두개(return a,b)인 경우 보이기에는 두개이나 실제 데이터는 투플에 담긴 하나의 값이다.
  - tuple끼리 덧셈과 곱셈만 가능하다. 단 곱셈은 tuple X 숫자만이 가능하다. 그 외에는 불가능하다.
    - data1 = (1,2,3), data2 = (4,5,6)  
      - data1 + data2  ==>  출력값: (1,2,3,4,5,6)
      - data1 * 3  ==>  출력값: (1,2,3,1,2,3,1,2,3)
      - data1 * data2  ==> 출력값 : error
  - tuple을 이용하면 변수간 값의 교환이 쉽다.
    - 일반적인 방식은 temp라는 변수를 만든 후 x의 값을 temp에 대입시킨 후 y값을 x에 대입시키고 temp값을 y에 대입시켜 교환한다.
    - tuple은 (x,y) = (y,x)라고 쓰면 x,y의 값은 바로 교환된다.
  - return으로 하나 이상의 값을 반환하는 예제
  
```python
def quot_and_rem(x,y):
quot = x // y
rem = x % y
return (quot, rem)
(quot, rem) = quot_and_rem(3,10)
```
<br>    
  - list와 tuple간의 형변환이 가능하다. 따라서 tuple에서 허용되지 않는 추가, 삭제, 수정을 하고자 할 경우<br>list로 전환 후 작업을 진행하고 다시 tuple로 형변환을 한다.
    - list((1,2))  ==>  tuple([1,2])
    - data1 = (1,2,3)  ==> list(data1)  ==>  [1,2,3] 

```python
def mul_return(a):
  b= a + 1
  return a, b

# 입력   
mul_return(1)

# 출력값 - 아래와 같이 두개의 return값이 괄호()로 묶여있어 tuple임을 확인할 수 있다.
(1, 2)
```
<br>  

