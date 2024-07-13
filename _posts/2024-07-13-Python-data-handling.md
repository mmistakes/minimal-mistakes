---
title: Python data handling
date: 2024-07-13
categories: python-basic
---

1. CSV
2. 웹(html)
3. XML
4. JSON

## Comma-separated values

- 필드를 Comma로 구분한 텍스트 파일
- 엑셀 양식의 데이터를 프로그램에 상관없이 쓰기 위한 데이터 형식
- 탭, 빈칸 등으로 구분해서 만들기도 함
- 통칭해서 character-separated values(CSV)라고 부름
- 엑셀에서는 다른 이름 저장으로 사용 가능
- 일반적으로 text 파일을 처리하듯이 파일을 읽어온 후, 한 줄 한 줄씩 데이터를 처리함

### CSV 객체로 CSV 처리

- 문장 내에 있는 ","에 대해 전처리 필요
- 파이썬에서는 간단히 CSV 파일을 처리하기 위해 csv 객체를 제공함

## Web

- World Wide Web(WWW), 줄여서 웹이라고 부름
- 인터넷 공간의 정식 명칭
- 데이터 송수신을 위한 HTTP 프로토콜 사용
- 데이터를 표시하기 위해 HTML 형식을 사용

### Web의 동작 방식

1. 요청

- 클라리언트 : 웹주소, Form, Header 등

2. 처리

- 서버 : Database 처리 등 요청 대응

3. 응답

- HTMl, XML 등으로 결과 반환

4. 렌더링

- HTML, XML 표시

### HTML(Hyper Text Markup Language)

- 웹 상의 정보를 **구조적으로** 표현하기 위한 언어
- 제목, 단락, 링크 등 요소 표시를 위해 **Tag**를 사용
- 모든 요소들은 **꺾쇠 괄호** 안에 둘러 쌓여 있음
  - <title> Hello, Wold </title> # 제목 요소, 값은 Hello, World
- 모든 HTML은 트리 모양의 포함관계를 가짐
- 일반적으로 웹페이지의 HTML 소스파일은 컴퓨터가 **다운로드** 받은 후 **웹 브라우저가 해석/표시**

#### HTML 구조

> <html> - <head> - <title>
>        - <body> - <p>

- Element, Attribute, Value로 이루어어짐

```html
<tag attribute1="attt_value1" attribute2="att_value1"> 보이는 내용(Value) </tag>
```

- 정보의 보고, 많은 데이터들이 웹을 통해 공유됨
- HTML도 일종의 프로그램, 페이지 생성 규칙이 있음
  - 규칙을 분석하여 데이터의 추출이 가능
- 추출된 데이터를 바탕으로 다양한 분석이 가능

### 정규식(regular expression)

- 정규 표현식, regexp 또는 regex 등으로 불림
- 복잡한 문자열 패턴을 정의하는 문자 표현 공식
- 특정한 규칙을 가진 문자열의 집합을 추출

#### 정규식 for HTML Parsing

- 전화번호, 도서 ISBN 등 형식이 있는 문자열을 원본 문자열로부터 추출함
- HTML 역시 tag를 사용한 일정한 형식이 존재하여 정규식으로 추출이 용이함
- 관련자료 : http://www.nextree.co.kr/p4327

##### 정규식 연습하기

1. 정규식 연습장(http://www.regexr.com/)으로 이동
2. 테스트하고 싶은 문서를 Text란에 삽입
3. 정규식을 사용해서 찾아보기

- 문자 클래스 []
  - [] 사이의 문자들과 매치라는 의미
    - ex) [abc] : 해당 글자가 a, b, c 중 하나가 있다.
    - "a", "before", "deep", "dud", sunset"
- "-"를 사용 범위를 지정할 수 있음
  - ex) [a-zA-Z] : 알파벳 전체
  - [0-9] : 숫자 전체

#### 정규식 기본 문법 - 메타 문자

- 정규식 표현을 위해 원리 의미가 아닌 **다른 용도로 사용되는 문자**
  - . : 줄바꿈 문자인 \n을 제외한 **모든 문자**와 매치
    - 예시: a.b
      - 매치되는 문자열: aab, acb, a1b, a@b
      - 매치되지 않는 문자열: ab, a\nb (줄바꿈 문자 포함)
  - - : 앞에 있는 글자를 0번 이상 반복
    * 예시: ab\*c
      - 매치되는 문자열: ac (b가 0번), abc (b가 1번), abbc (b가 2번), abbbc (b가 3번)
      - 매치되지 않는 문자열: aabc (a가 두 개)
  - - : 앞에 있는 글자를 1회 이상 반복
    * 예시: ab+c\
      - 매치되는 문자열: abc (b가 1번), abbc (b가 2번), abbbc (b가 3번)
      - 매치되지 않는 문자열: ac (b가 없음)
  - ? : 바로 앞의 글자가 0번 또는 1번
    - 예시: ab?c
      - 매치되는 문자열: ac (b가 0번), abc (b가 1번)
      - 매치되지 않는 문자열: abbc (b가 2번)
  - {} : 중괄호 안의 숫자만큼 바로 앞의 글자 반복
    - 예시 1: a{2}
      - 매치되는 문자열: aa
      - 매치되지 않는 문자열: a, aaa
    - 예시 2: a{2,4}
      - 매치되는 문자열: aa, aaa, aaaa
      - 매치되지 않는 문자열: a, aaaaa
  - [] : 대괄호 안에 있는 문자들 중 하나와 매치
    - 예시: [abc], [a-c]
      - 매치되는 문자열: a, b, c
      - 매치되지 않는 문자열: d, e
  - ^ : 문자열의 시작
    - 예시: ^a (a로 시작하는 문자열)
      - 매치되는 문자열: apple, aardvark
      - 매치되지 않는 문자열: banana, crazy
  - $ : 문자열의 끝
    - 예시 2: a$ (a로 끝나는 문자열)
      - 매치되는 문자열: banana, a
      - 매치되지 않는 문자열: apple, an
  - \ : 이스케이프 문자
    - 예시: a\.b
      - 매치되는 문자열: a.b
      - 매치되지 않는 문자열: aab, a1b
  - 특수 시퀀스:
    - \d: 숫자와 매치 (0-9)
    - \D: 숫자가 아닌 문자와 매치
    - \w: 문자와 숫자 및 밑줄과 매치 (알파벳, 숫자, \_)
    - \W: 문자와 숫자 및 밑줄이 아닌 문자와 매치
    - \s: 공백 문자와 매치 (공백, 탭, 줄바꿈)
    - \S: 공백이 아닌 문자와 매치

```python
import re
import urllib.request

url = "https://bit.ly/3rxQFS4"
html = urllib.request.urlopen(url)
html_contents = str(html.read())
id_result - re.findall(r"[A-Za-z0-9]+\*\*\*)", html_contents)

for result in id_results:
  print(result)
```

## XML(eXtensible Markup Language)

- 데이터의 구조와 의미를 설명하는 **TAG(Markup)**를 사용하여 표시하는 언어
- TAG와 TAG 사이에 값이 표시되고, 구조적인 정보를 표현할 수 있음
- HTML과 문법이 유사
- 대표적인 데이터 저장 방식

### XML 특징

- 구조에 대한 정보인 스키마와 DTD 등으로 **정보에 대한 정보**가 표현되며, 용도에 따라 다양한 형태로 변경 가능
- XML은 컴퓨터(PC <-> 스마트폰) 간의 정보를 주고받기 매우 유용한 저장 방식

```XML
〈?xml version="1.0"?〉
<고양이>
<이름>나비스</이름>
<품종>샴</품종>
<나이>6</나이>
<중성화>예</중성화>
<발톱 제거>아니요</발톱 제거>
<등록 번호>Izz138bod</등록 번호>
<소유자>이강주</소유자>
</고양이>
```

### XML Parsing in Python

- XML도 HTML과 같이 구조적 markup 언어
- 정규표현식으로 Parsing이 가능함
- 그러나 좀 더 손쉬운 도구들이 개발되어 있음
  - beautifulsoup

### BeautifulSoup

- HTML, XML 등 Markup 언어 Scraping을 위한 대표적인 도구
- lxml과 html5lib과 같은 Parser를 사용함
- 속도는 상대적으로 느리나 간편히 사용할 수 있음

```python
from bs4 import BeautifulSoup
# 객체 생성
soup = BeautifulSoup(books_xml, "lxml")
# Tag 찾는 함수 find_all 생성
soup.find_all("author")
```

- find_all : 정규식과 마찬가지로 해당 패턴을 모두 반환
- get_text() : 태그와 태그 사이의 패턴의 값 반환

## JavaScript Object Notation

### JSON 개요

- 원래 웹 언어인 Java Script의 데이터 객체 표현 방식
- 간결성으로 기계/인간이 모두 이해하기 편함
- 데이터 용량이 적고, Code로의 전환이 쉬움
- XML의 대체제로 많이 활용됨

```json
{
  "title": "Example",
  "description": "This is a simple example",
  "properties": {
    "firstname": {
      "type": "string"
    },
    "lastname": {
      "type": "string"
    },
    "age": {
      "type": "integer",
      "description": "Age in years",
      "minimum": 0
    }
  },
  "required": ["firstname", "lastname", "age"]
}
```

- Python의 Dict Type과 유사
- key:value 쌍으로 데이터 표시

### JSON in Python

- json 모듈을 사용하여 손 쉽게 파싱 및 저장 가능
- 데이터 저장 및 읽기는 dict type과 상호 호환 가능
- 웹에서 제공하는 API 대부분은 JSON 활용
  - Developer API의 활용법을 찾아 사용
-
