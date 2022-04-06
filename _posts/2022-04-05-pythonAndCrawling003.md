---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 003"
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


<h2>[파이썬(python) & 크롤링(crawling) - 003]</h2>


<h3> 파이썬(python) 기본 - 03</h3>

<h3>if문</h3>
<h3>if문 문법<br></h3>

```python
if 조건:
  실행문1   # 위의 조건문과 아래 실행문 사이에는 하나의 Tab만큼의 공간을 반드시 두어야 한다.
  실행문2    
  
if문 조건의 끝에는 콜론(:)을 붙여주고 실행문은 반드시 tab으로 띄어쓰기 후 작성한다.
```
<br>

<h3>Ex)</h3>

```python
age =  int(input("나이는?"))
if age_digit >= 19:
  print("당신은 성인입니다.")
  elif age >= 13 and age < 19:
    print("당신은 청소년입니다.")
  else:
    print("당신은 어린이입니다.")
```
<br>

```python
cash = int(input("현금은?"))
cash = 120000
if cash > 100000:
  print("go to restaurant)
else:
  if cash > 50000:
    print("go to bobjib")
    else:
      print("go home")
```
<br>

```python
d1 = int(input())
if (d1 % 2 == 0):
  print("짝수")
else:
  print("홀수")
```
<br>

```python
data = input("주민번호는?")
# 주민번호 입력: 800001-1231231
# 성별을 나타내는 숫자만 출력할 것
print(data.split("-")[1][0] # -를 기준으로 숫자를 두개로 나누고 인덱스 1인 값의 인덱스 0인 숫자.
# 결과값 : 1
```
<br>

```python
# letters라는 변수에 사용자로부터 문자열을 입력받아서 문자 n이 들어있는지 출력한다.
# n이 들어있으면 0, 안들어있으면 -1을 출력하라.
letters = input()
# 입력값이 note로 들어왔다면
var = letters.find('n')
if var >= 0:
  print(0)
else:
  print(-1)
  
# 결과값 : 0
```

<br>
