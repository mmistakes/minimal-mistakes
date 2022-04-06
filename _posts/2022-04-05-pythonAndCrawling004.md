---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 004"
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


<h2>[파이썬(python) & 크롤링(crawling) - 004]</h2>


<h3> 파이썬(python) 기본 - 03</h3>

<h3>반복문</h3>
<h6>반복문 문법</h6><br>

```python
# 반복문 for 변수 in (리스트 or 문자열):
  for i in range(3):     
    print(i)
    
  #출력값 : 0
           1 
           2

  # range(3)은 index 기준 0,1,2 의미, 
  # range(1, 4)는 index 기준 1부터 시작해서 4 바로 직전인 2,3까지임    
```
<br>

```python
for i in ['python', 'java', 'golang']:
  print(i)
  
  #출력값
  python
  java
  golang
```
<br>

```python
for index in ['list1', 'list2', 'list3']:
  print(index)

# 출력값
list1
list2
list3
```
<br>

```python
# 1부터 10까지 합 구하기
sum = 0
for i in range(1, 11):
  sum += i
  
print(sum)
  
  # 출력값 : 55
```
<br>

```python
# while문 조건:
    실행문1
```
<br>

```python
# while i <= 3:
    print(i)
    i = i + 1
    
    # 출력값
      0
      1
      2
      3
```
<br>

```python
# while 무한루프
  
  while 1:
    print("Hello World!")
    
  # while 1이라는 의미는 무조건 참이라는 의미이므로  위 while문은 무한루프에 빠진다.(절대 실행 금지)    
```
<br>

```python
# 1부터 10까지의 합을 while문을 써서 구하기
  
  sum = 0
  index = 1
  while index <= 10:
    sum += index
    index = index + 1
    
  print(sum)
  
  #출력값 : 55
```
<br>

```python
# 1부터 10 中 임의의 번호 하나를 입력받아 미리 지정해놓은 번호와 맞는지 확인
  
  data = int(input("1~10까지 중 숫자 하나를 입력하세요"))
  while data != 2:
    print('번호가 다릅니다.')
    data = int(input("1~10까지 중 숫자 하나를 입력하세요"))
    
  print('번호가 맞습니다')
```
<br>

```python
# 리스트 변수에서 음수를 삭제하고 양수만 가진 리스트 변수를 만들고 해당 변수 출력하기

num_list = [0, -11, 31, 22, -11, 33, -44, -55]
plus_list = list() : 리스트 변수 선언
for num in num_list:
  if num >= 0:
    plus_list.append(num)
    print(plus_list)
    
    # 출력값 : [0, 31, 22, 33]
```
<br>

```python
# 아래 변수에서 이름만 출력하기

data = "Dave, David, Andy, Arthor"
data_list = data.split(",")  # 콤마(,)로 구분해서 이름 쪼개기
print(data_list)
  # 출력값 : ['Dave', 'David', 'Andy', 'Arthor'] => 배열로 출력됨
for str_data in data_list:
  print(str_data)
  
  # 출력값
    Dave
    David
    Andy
    Arthor  
```
<br>

```python
# 아래와 같이 작성하면 앞에서 하나 빼고 뒤에서 하나 뺀다는 의미
  str_data[1:-1]
```
<br>