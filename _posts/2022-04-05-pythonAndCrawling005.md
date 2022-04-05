---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 005"
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


<h2>[파이썬(python) & 크롤링(crawling) - 005]</h2>


<h3> 파이썬(python) 기본 - 05</h3>

<h3>함수</h3>
<h6>함수 문법</h6><br>

```python
# 함수 사용법
  # 함수 선언
    def 함수이름(ex. func1)():
      print("hello")

  # 함수 호출
    func1()
    
    #출력값 : hello
```
<br>

```python
# 함수 선언
def func1(parameter1, parameter2):
  print("Hello!", parameter1)
  print("Hello!", parameter2) # 인자(argument)를 2개 선언했어도 하나만 사용해도 됨.
  
# 함수 호출
func1("python", "java")

# 출력값
  Hello! python
  Hello! java
  
  # return이 있는 경우 return까지만 실행이 되고 그 이후 코드는 실행하지 않는다.  
  
```
<br>

```python
def awe_sum(a, b):
  c = 1 #지역변수
  result = a + b
  return result
  
a=1 # 전역변수
print(awe_sum(2, 3)

# 출력값 : 5
  a값은 1  # 전역변수이기에 값을 가지고 있음.
  c값은 error # 지역변수로 함수가 끝나면 변수의 효력도 끝난다. 
```
<br>
