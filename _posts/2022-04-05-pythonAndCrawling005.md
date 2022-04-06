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

  - Coding을 출력하는 coding() 함수 만들고 호출하기

```python
              def coding():
                  print ("Coding")
              
                coding()
              
              # 출력값 
                Coding           
```
<br> 

  - 임의의 문자열을 넣으면 해당 문자열을 출력하는 coding() 함수 만들고 호출하기

```python
              def coding(argument1):
                  print ("argument1")
              
                coding("David)
              
              # 출력값 
                David           
```
<br> 

- 임의의 세 개의 숫자를 인자로 넣으면 세 숫자를 더한 값을 출력해주는 함수 만들고 호출하기

```python
              def plus(data1, data2, data3):
                  print (data1 + data2 + data3)
              
              plus(1, 2, 3)
                            
              # 출력값 
                6         
```
<br>

  - 임의의 두 개의 숫자를 인자로 넣으면 두 개의 숫자를 곱한 값을 리턴해주는 함수를 만들고,<br> 특정 변수에 해당 리턴값을 넣고, 호출하기

```python
                def multiply(data1, data2):
                    return data1 * data2
                
                data = multiply(2, 3)
                print (data)
                            
              # 출력값 
                6         
```
<br>

  - 사칙연산을 지원하는 함수를 다음과 같이 만들고, 특정 변수에 해당 리턴값을 넣고, 호출해보세요.<br>
    - 첫번째 인자: 숫자
    - 두번째 인자: 숫자
    - 세번째 인자: "*" 또는 "+"
    - 세번째 인자에 따라 첫번째 인자와 두번째 인자를 곱하거나, 더한 값을 리턴
    - 만약, 세번째 인자가 "*" 또는 "+" 가 아니라면, 0을 리턴

```python
                def cal(data1, data2, way):
                    if way == "+":
                        return data1 + data2
                    elif way == "*":
                        return data1 * data2
                    else:
                        return 0
                    
                data = cal(1, 2, "+")
                print (data)
                
                data = cal(1, 2, "*")
                print (data)
                
                data = cal(1, 2, "/")
                print (data)
                            
              # 출력값 
                3
                2
                0         
```
<br>

  - 위에서 작성한 함수에 사칙연산 기능을 "-" (빼기) 와 "/" (나누기) 도 지원하도록 추가하기<br>
    단, "/" 일 경우, 두번째 인자가 0이면, -1 을 리턴하도록 작성

```python
                def cal(data1, data2, way):
                    if way == "+":
                        return data1 + data2
                    elif way == "*":
                        return data1 * data2
                    elif way == "-":
                        return data1 - data2
                    elif way == "/":
                        if data2 == 0:
                            return -1
                        else:
                            return data1 / data2
                    else:
                        return 0
                    
                data = cal(1, 2, "+")
                print (data)
                
                data = cal(1, 2, "*")
                print (data)
                
                data = cal(1, 2, "-")
                print (data)
                
                data = cal(1, 0, "/")
                print (data)
                
                data = cal(1, 2, "/")
                print (data)
                            
              # 출력값 
                3
                2
                -1
                -1
                0.5         
```
<br>

  - 다음과 같은 기능을 하는 함수를 작성하고, 호출하기<br>
    - 첫번째 인자: 문자열
    - 두번째 인자: 숫자
    - 리턴값: 문자열을 숫자만큼 넣은 리스트
    - 출력 예1:
      - print_string("Fun", 3)
      - ["Fun", "Fun", "Fun"]

```python
                def print_string(string, digit):
                    data = list()
                    for index in range(digit):
                        data.append(string)
                    return data
                
                print_string("Fun", 3)
                            
              # 출력값 
                ['Fun', 'Fun', 'Fun']       
```
<br>