---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 001"
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


<h2>[파이썬(python) & 크롤링(crawling) - 001]</h2>


<h3> 파이썬(python) 기본 - 01</h3>

<h3>데이터 형식 : str_data, int_data, float_data, bool_data</h3>
<h3>나누기의 몫을 구하는 표기는 //, 나머지를 구하는 표기는 %</h3>
<h3>입력받기 : 변수 = input()   ex)name = input() => david => name = david ※ 무조건 문자열로 넘김</h3>
<h3>형변환(type casting)</h3>
<h6>float(3) = 3.0 , int(3.6) = 3 , str(1) = '1'<br>
digit_str = "123" => digit_int = int(digit_str) => print(digit_int) => ▶ 123<br>
print (type(digit_int) ▶ <class 'int'><br>
print(type(float(digit_str)) ▶ y=f(x) => y=f(f(x))<br>
digit1 = int(input()) => digit2 = int(input()) => print(digit1 * digit2)<br>
int(input("How old are you?")) ==> 입력창 뜨며 값을 넣어야 함.</h6><br>
<h3>여러 문장으로 이어진 문자열을 사용할때는 """ or '''로 감싸서 사용</h3>
<h6>text =<br>'''<br>abcd<br>efgh<br>ijkl<br>'''<br>
print(text) : 출력 결과는 아래에...<br>
abcd<br>
efgh<br>
ijkl<h6>

<h3>역슬래시(\)</h3>
<h6>역슬래시(\)의 기능은 바로 뒤에 나오는 문자를 특수하게 처리하라는 뜻으로 즉 \"는 문자열을 닫는 문법적 역할 " 이 아닌<br> "문자열 그 자체"로 쓰겠다는 뜻이다.<br>
Ex) print("여기서 쌍따옴표는 \"라고 써주면 됩니다.") => 여기서 쌍따옴표는 "라고 써주면 됩니다.</h6><br>

<h3>개행문자/줄바꿈 표시</h3>
<h6>\n은 줄바꿈 표시를 의미하며 문자 count 시 하나의 문자로 계산한다.</h6><br>

<h3>다양한 문자열 처리</h3>
<h6>some_string = "python"<br>
len(some_string) = 6<br><br><br>
article = '''The latest jobs numbers are heralded as good news for the U.S. economy,<br> but inflation continues to take a bite out of Americans' paychecks. <br>Conservationists in Tanzania work to "protect the tribe while preserving the pride" of nearby lions.<br> And the U.S. Census Bureau publishes historic documents that reflect America in 1950.'''<br><br>
article.count("latest")  => 1<br><br>
print(len(article)) => 326(전체 글자 길이)<br><br>
print(article.find("t")) => 6(t가 문장에서 몇개인가?)<br><br>
print(article.replace("jobs", "occupation")) => 문장 내 jobs를 occupation으로 변경<br><br>
The latest occupation numbers are heralded as good news for the U.S. economy,<br> but inflation continues to take a bite out of Americans' paychecks.<br> Conservationists in Tanzania work to "protect the tribe while preserving the pride" of nearby lions.<br> And the U.S. Census Bureau publishes historic documents that reflect America in 1950.</h6><br><br>

<h6>some_string = "␣␣␣␣␣␣␣␣computer␣␣␣␣␣␣␣␣␣" => ␣ 제거하고 문자열만 출력하기 => some_string.strip('␣') => computer<br>※ 앞뒤로 특정 문자열을 삭제하고자 할 때 그 문자열을 ()안에 넣어준다. 공백도 가능하다<br>
</h6><br>
<h3>문자열 index</h3>
<h6>article = "python" => index는 0부터 시작하기에 0, 1, 2, 3, 4, 5까지임<br>
역순으로는 왼쪽부터 -6, -5, -4, -3, -2, -1임<br>
print(article[2]) => 결과값은 t<br>
글자 자르기(slice) : print(article[2:4] => 결과값은 th<br>
※ slice의 특징은 인덱스번호 2번째부터 4까지라고 했으나 실제로 자르는 건 4를 포함시키지 않는</h6><h3>인덱스 2,3에 해당하는
  t와 h만이다.</h3> <h6>이부분을 혼동해서는 안된다.</h6><br><br>

<h3>format 형식</h3>
<h6>중괄호({})안에 문자열을 차례차례 넣는다.<br>
print("I have a { }, I have an { }.". format("pen", "apple"))<br>
결과값 : I have a pen, I have an apple.<br><br>

print("I have a {1}, I have an {0}.". format("pen", "apple"))<br>
결과값 : I have a apple, I have an pen.<br><br>

print("I have a {0}, I have an {0}.". format("pen", "apple"))<br>
결과값 : I have a pen, I have an pen.<br><br></h6>

<h6>format을 이용한 소숫점 자리 표시</h6>
<h6>interest = 0.087<br>
print(format(interest, ".2f")) ==> 소숫점 둘째짜리까지 출력 요청(반올림 기본 반영)<br>
결과값 : 0.09<br><br>
interest = 0.897<br>
print(format(interest, ".2f")) ==> 소숫점 둘째짜리까지 출력 요청(반올림 기본 반영)<br>
결과값 : 0.90(마지막 0은 필요없으나 소숫점 둘째짜리까지 출력 명령을 했기에 0으로 출력)</h6><br><br>

<h6>문자열 출력<br>
data1 = int(input()) , data2 = int(input())<br>
print(data1, "+", data2, "=", data1 + data2)  ==> 입력값을 data1 = 5, data2 = 3을 입력시<br>
출력값 : 5 + 3 =8</h6>


