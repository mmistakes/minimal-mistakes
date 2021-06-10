---
title:  "웹 스크래핑 기본 개념"
excerpt: ""

categories:
  - Web Scraping
tags:
  - Web Scraping
published: false
---

## XPath
어떤 엘리멘트를 지칭하는지를 정확히 하기 위해 사용하는 개념.
```python
학교/학년/반/학생[2]

#다음과 같이 줄일 수도 있다.
//학생[@학번="20172817"]

# /는 내가 위치한 곳에서부터 한 단계 아래  
# //는 내가 위치한 곳에서 모든 위치
# *은 모든 경우 ex) //*[@학번="20172817"]

브라우저에서 자동으로 해준다.
```

## Requests
```python
# pip install requests로 설치
import requests

res = requests.get("https://google.com")  
# res.status_code가 200이면 정상, 403은 접근권한 없음.
if res.status_code == requests.codes.ok(200)
or 
res.raise_for_status()로도 처리.

# 이렇게 사용하는 것을 습관화하자.
res = requests.get("https://google.com") 
res.raise_for_status()

# res.text: 홈페이지의 텍스트  
with open("mygoogle.html", "w", encoding="utf-8") as f:
  f.write(res.text)
```

## 정규표현식
올바른 형식인지를 확인하기 위해 사용한다.
```python
import re

p = re.complie("ca.e")
# . (ca.e) : 하나의 문자를 의미 > care, cafe, case
# ^ (^de) : 문자열의 시작 > desk, destination
# $ (se$) : 문자열의 끝 > case, base

m = p.match("case") # 주어진 문자열의 처음부터 일치하는지 확인
print(m.group()) # 일치하는 문자열 반환, 매치되지 않으면 에러가 발생

m = p.search("good care") # 주어진 문자열 중에 일치하는게 있는지 확인
print(m.string) # 입력받은 문자열
print(m.start()) # 일치하는 문자열의 시작 index
print(m.end()) # 일치하는 문자열의 끝 index
print(m.span()) # 일치하는 문재열의 시작 / 끝 index

lst = p.findall("careless") # 일치하는 모든 것을 리스트 형태로 반환
```

## User Agent
헤더 정보에 따라 사이트의 정보가 달라짐. 사람이 접속하는 것이 아닌 웹 크롤러가 접근하게 되면 사이트에서 차단한다.  
my user agent를 검색하면 자신의 user agent를 알 수 있다. 접속하는 브라우저에 따라 다르다. 이를 헤더로 넘겨주면 성공적으로 사이트 정보를 가져올 수 있다.
```python
import requests
url = "https://google.com"
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36"}
res = requests.get(url, headers=headers)  
res.raise_for_status()
with open("mygoogle.html", "w", encoding="utf-8") as f:
  f.write(res.text)
```