---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 002"
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


<h2>[파이썬(python) & 크롤링(crawling) - 002]</h2>


<h3> 파이썬(python) 기본 - 02</h3>

<h3>list(배열)</h3>
<h6>리스트 선언<br>
location = list() ※ 파이썬 공식 선언 방법<br>
location = []  ※ 위와 동일<br><br>

리스트 내 데이터 추출<br>
location = ['서울시', '경기도', '인천시']<br>
location[0] ==> '서울시', location[1] ==> '경기도'<br>
location[-1] ==> '인천시' ※ -1은 맨 마지막 인덱스 호출<br>
location[1:3] ==> '경기도', '인천시'  ※ 인덱스번호 1부터 3을 제외한 2까지 추출<br>

데이터 추가<br>
location.append['부산시'] ==> 맨마지막에 추가 됨, 하나씩만 추가 가능 ==> ['서울시', '경기도', '인천시', '부산시'] <br>
location[1, '안산시'] ==> 1번째 인덱스에 추가되고 나머지가 밀림 ==> ['서울시', '안산시', '경기도', '인천시', '부산시'] <br>
<br><br>

데이터 삭제<br>
location.remove('경기도') ※ 데이터 내용으로 삭제<br>
del location[2] ※ 인덱스 번호로 삭제<br><br>

데이터 정렬<br>
numbers = [2, 1, 4, 5]<br>
순차정렬 : numbers.sort()  ==> [1, 2, 4, 5]<br>
역순정렬 : numbers.reverse() ==> [5, 4, 2, 1]<br><br>

문자열 나누기<br>
python_is_easy = "python is easy"
python_is_easy.split()  ==> ['python', 'is', 'easy']  ※ 리스트 형태로 나눔
string_list = python_is_easy.split()
print(string_list)  ==>  ['python', 'is', 'easy']
