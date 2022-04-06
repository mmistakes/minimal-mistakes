---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 010"
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


<h2>[파이썬(python) & 크롤링(crawling) - 010]</h2>


<h3> 파이썬(python) 기본 - 10</h3>

<h3>객체지향 프로그래밍</h3>
    
  - class 만들기는 설계도 만들기로 이해하면 된다.
    - class 선언방법
      - class Quad:
        - height = 0
        - width = 0
        - color = ''



```python
              # Quad(사각형 만들기)라는 class 선언
                class Qurd():
                    height = 0    # attribute
                    width = 0
                    color = ''
                    name = 'Qurd'
                    
                    def qurd_name(self):   # self 외 인자가 추가될때 self는 놔두고 인자를 추가하면 된다.
                      return self.name     # ex) def qurd_name(self, argument1, argument2) 
                      
                   # class 안에서 class에 선언된 attribute를 해당 method에서 호출할 때(인자가 없을때)에는
                   # self.~~라고 붙여야한다.
                   # class 이름은 항상 대문자로 시작하고 method 이름은 소문자에 카멜케이스로 작성한다.
                           
<
              # 객체 만들기
                quad1 = Qurd()
                quad2 = Qurd()
                
              
              # 객체 기능 호출
                quad1.width = 10
                quad1.height = 10
                quad1.color ='blue'
                quad1.name = 'blue 사각형'
                
                quad1.width = 5
                quad2.height = 5
                quad2.color ='yellow'
                quad2.name = 'yellow 사각형'

                print(quad1.width, quad2.width)
                print(quad1.qurd_name(), quad2.qurd_name())
                
                
                # 출력값 : 10 0
                          blue 사각형 yellow 사각형
                          
                qurd_name 메서드 內 인자를 두개 받는 경우
                def qurd_name(self, argument1, argument2)
                
                print(quad1.qurd_name(1,2), quad2.qurd_name(2,3))
                
                # 출력값 : 1 2
                          2 3
                
                      
```
<br> 


<div align="center">
<img src="http://drive.google.com/uc?export=view&id=1fgwmYDOwC9YElqf_vOvPfC3tMnnoSx6h" width="700"><br>
</div>
<br><br>