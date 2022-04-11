---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 019"
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


<h2>[파이썬(python) & 크롤링(crawling) - 019]</h2>


<h3> 크롤링(Crawling) 기본 - 19</h3>

<h3>문자열 변환</h3>
<h5>다양한 함수를 이용해서 문자열을 추가, 결합, 나누기, 삭제, 대체해보자 </h5>

<h5>문자열 관련 함수</h5>

```python
                # 1. count 함수 : 문자열에 있는 특정 문자 갯수를 알 수 있다.
                
                data = "Gibson Kim"
                data.count('i')                
                # 출력값 : 2
                
                # 2. index 함수 : 문자열에 있는 특정 문자의 위치를 알 수 있다.
                                 단 특정문자가 있지 않는 경우 error를 발생시킨다.
                       
                data = 'Gibson Kim'
                data.index('b')                
                # 출력값 : 2
                
                data = 'Gibson Kim'
                data.index('z')                
                # 출력값 : ValueError: substring not found => 해당 데이터에 찾고자 하는 글자가 없는 경우 error 발생
                
                # 3. find 함수 : index 함수와 기능은 동일하고 특정문자가 없는 경우 -1을 출력해준다.
                
                data = 'Gibson Kim'
                data.index('z')                
                # 출력값 : -1
                
                # 4. join 함수 : 문자열 사이에 다른 문자를 삽입할 수 있다.
                
                string = "12345"
                comma = ','
                comma.join(string)                 
                # 출력값 : '1,2,3,4,5'
                
                # 5. strip 함수 : 문자열에 있는 공백이나 특정 문자를 기준으로 앞, 뒤의 문자, 공백 기호 등을 지움
                #      lstrip : 왼쪽 문자열 지우기          rstrip : 오른쪽 문자열 지우기 
                
                data = "    Gibson     "
                data.strip()  # 하나 또는 여러개의 앞뒤 공백을 모두 지움                
                #출력값 : 'Gibson'
                
                data = "    Gibson     "
                data.lstrip()  # 하나 또는 여러개의 왼쪽 공백을 모두 지움                
                #출력값 : 'Gibson     '  
                
                data = "    Gibson     "
                data.lstrip()  # 하나 또는 여러개의 오른쪽 공백을 모두 지움
                #출력값 : '    Gibson' 
                
                data = "    111111111111(Gibson)22222222222     "
                data.strip(" 12()")  # 공백, 1,2, (, )를 모두 지움                                
                #출력값 : 'Gibson' 
                
                # 6. upper : 소문자만 대문자로 바꾸기
                
                data = "    Gibson     "
                data.upper()                  
                #출력값 : 'GIBSON'
                
                # 7. lower : 대문자만 소문자로 바꾸기 
                                
                data = "    Gibson     "
                data.lower()                  
                #출력값 : 'gibson'
                
                # 8. strip : 문자열을 나눠 리스트로 출력한다. ()에 문자나 기호가 없으면 기본적으로 space를 기준으로 나눈다. 
                                
                data = "Gibson go home"
                data.strip()                  
                #출력값 : ['Gibson', 'go', 'home']
                
                data.strip()[2]
                #출력값 : 'home'
                
                data = "Gibson/go/home" 
                data.strip('/')    # 특정 문자나 기호를 넣으면 그 값을 기준으로 문자열을 나눈다.              
                #출력값 : ['Gibson', 'go', 'home']
                
                # 9. replace : 문자열 중 일부를 다른 문자로 바꾸거나 삭제 
                                
                data = "Gibson go home"
                data.replace('home', 'shopping')                  
                #출력값 : 'Gibson go shopping']
                
                data = "(Gibson)"
                data.replace('(', '')                  
                #출력값 : 'Gibson)']
                
                data = "(Gibson)"
                data.replace(')', '')                  
                #출력값 : '(Gibson']
                
                
                data = "(Gibson)"
                data1=data.replace('(', '')
                data1.replace(')','')       # case: 1 
                data.replace("(", "".replace")","")   # case : 2
                                  
                #출력값 : 'Gibson'                
                
                
                # 10. string = "10,11,22,33,44" 를 컴마(,) 로 분리해서 리스트 변수를 만들어 각 값을 정수형 리스트 데이터로 넣기
                
                string = "10,11,22,33,44"
                split_string = string.split(',')  # 변환값 : ['10', '11', '22', '33', '44']
                for index, split_item in enumerate(split_string):
                    split_string[index] = int(split_item)
                print (split_string)
                
                # 출력값 : [10, 11, 22, 33, 44]     
            
```
