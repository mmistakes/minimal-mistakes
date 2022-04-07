---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 012"
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


<h2>[파이썬(python) & 크롤링(crawling) - 012]</h2>


<h3> 파이썬(python) 기본 - 12</h3>

<h3>크롤링(Crawling)</h3>
    
  - 라이브러리는 미리 만들어놓은 함수 집합으로, 이름이 있음
    - 지수승 구하기 ==> **
      - 3의 3승 ==> 3 ** 3

```python
              # 임의의 숫자와 지수를 입력받아 지수승을 구하기
                def exponential(digit, exponent):
                    value = digit ** exponent
                    return value

                print (exponential(3, 3))

                # 출력값 : 27                
                      
```
<br> 

  - math 라이브러리 : 수학 함수들을 모아놓은 라이브러리(https://docs.python.org/3/library/math.html)
    - pow : 지수승 계산 함수
    - factorial (5! = 1 x 2 x 3 x 4 x 5)

```python
              import math
              num = math.pow(3, 3)
              print (num)

              # 출력값 : 27.0   
              
              math.factorial(5)      
              
              # 출력값 : 120         
                      
```
<br>

  - 라이브러리 기본 사용방법 
    - import 라이브러리명
    - 라이브러리명.함수명
      - ex.<br>
        import math<br>
        math.factorial(5)<br><br>
  - 추가 사용방법

```python 
      # math 라이브러리에 있는 함수 중, sqrt, factorial 함수만 import
      
        from math import sqrt, factorial
        
        num = sqrt(5)
        print (num)
        num2 = factorial(5)
        print (num2)
        
        # 출력값 : 2.23606797749979
                  120
                  
                  
      # math 라이브러리에 있는 모든 함수를 import
      
        from math import *            
        
        num = sqrt(5) + factorial(3) 
        print (num)
        
        # 출력값 : 8.23606797749979
        
        
      # 라이브러리에 있는 함수명이 길거나 해서 다른 이름으로 쓰기
      
        import math as d
        
          num = d.factorial(5)
          print (num)
          
     # factorial() 함수를 f()로 사용 가능

       from math import factorial as f
       num = f(5)
       print (num)

```

  - pc에 라이브러리 설치하기 ==> cmd ==> pip install 라이브러리명
  - 최신버전으로 업그레이드 하기 ==> cmd ==> pip install --upgrade 라이브러리명