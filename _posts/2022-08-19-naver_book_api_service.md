---
layout: single
title:  "네이버BOOK API 활용예제"
categories: coding
tag: [python, blog, jekyll]
---


```python
import os
import sys
import urllib.request
import pandas as pd
import json
import re

client_id = "XyBx9tytLniDDiCmtiVB"
client_secret = "vvaU6zjoZD"

query = urllib.parse.quote(input("검색 질의: "))
idx = 0
display = 10
start = 1
end = 10
sort = "sim"

book_df = pd.DataFrame(columns=("Title","Link","image","author", "discount", "publisher", "isbn", "description","pubdate"))

for start_index in range(start, end, display):

    url = "https://openapi.naver.com/v1/search/book?query=" \
    + query + "&display="+str(display) \
    + "&start="+str(start_index) \
    + "&sort=" + str(sort)

    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",client_id)
    request.add_header("X-Naver-Client-Secret",client_secret)
    response = urllib.request.urlopen(request)
    rescode = response.getcode()
    
    if(rescode==200):
        response_body = response.read()
        response_dict = json.loads(response_body.decode('utf-8'))
        items = response_dict['items']
        for item_index in range(0,len(items)):
            remove_tag = re.compile('<.*?>')
            title = re.sub(remove_tag,'',items[item_index]['title'])
            link = items[item_index]['link']
            image = items[item_index]['image']
            author = re.sub(remove_tag,'',items[item_index]['author'])
            discount = items[item_index]['discount']
            publisher = items[item_index]['publisher']
            isbn = items[item_index]['isbn']
            description = items[item_index]['description']
            pubdate = items[item_index]['pubdate']
            book_df.loc[idx] = [ title, link, image, author, discount, publisher, isbn, description, pubdate]
            idx += 1
    else:
        print("Error Code:" + rescode)
        
book_df
```

    검색 질의: 컴퓨터
    




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Title</th>
      <th>Link</th>
      <th>image</th>
      <th>author</th>
      <th>discount</th>
      <th>publisher</th>
      <th>isbn</th>
      <th>description</th>
      <th>pubdate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>도커 교과서 (설치부터 실전 운영 투입까지, 한 권에 담았다!)</td>
      <td>https://search.shopping.naver.com/book/catalog...</td>
      <td>https://shopping-phinf.pstatic.net/main_338821...</td>
      <td>엘튼 스톤맨</td>
      <td>32400</td>
      <td>길벗</td>
      <td>9791140700943</td>
      <td>이 책을 읽고 나면, 도커 기본기는 물론이고\n개념 검증 수준의 프로젝트를 컨테이너...</td>
      <td>20220816</td>
    </tr>
    <tr>
      <th>1</th>
      <td>진짜 쓰는 실무 엑셀 (유튜브 대표 엑셀 채널, 오빠두가 알려 주는)</td>
      <td>https://search.shopping.naver.com/book/catalog...</td>
      <td>https://shopping-phinf.pstatic.net/main_324549...</td>
      <td>오빠두(전진권)</td>
      <td>18900</td>
      <td>제이펍</td>
      <td>9791191600704</td>
      <td>대기업 직장 생활 10년의 실무 노하우와 엑셀 유튜브 채널을 운영하면서 들은 수많은...</td>
      <td>20220215</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2022 유선배 SQL개발자(SQLD) 과외노트 (유튜브 선생님에게 배우는 유·선·배!)</td>
      <td>https://search.shopping.naver.com/book/catalog...</td>
      <td>https://shopping-phinf.pstatic.net/main_324640...</td>
      <td>정미나</td>
      <td>19800</td>
      <td>시대고시기획</td>
      <td>9791138310413</td>
      <td>도서 특징\n핵심만 쏙쏙 담은 알찬 수험서! SD에듀가 가장 효율적·효과적인 합격의...</td>
      <td>20220603</td>
    </tr>
    <tr>
      <th>3</th>
      <td>구글 엔지니어는 이렇게 일한다 (구글러가 전하는 문화, 프로세스, 도구의 모든 것)</td>
      <td>https://search.shopping.naver.com/book/catalog...</td>
      <td>https://shopping-phinf.pstatic.net/main_324919...</td>
      <td>타이터스 윈터스^톰 맨쉬렉^하이럼 라이트</td>
      <td>40500</td>
      <td>한빛미디어</td>
      <td>9791162245620</td>
      <td>구글은 어떻게 개발하고 코드를 관리하는가\n\n지난 50년의 세월과 이 책이 입증한...</td>
      <td>20220510</td>
    </tr>
    <tr>
      <th>4</th>
      <td>혼자 공부하는 얄팍한 코딩 지식 (비전공자도 1:1 과외하듯 배우는 IT 지식 입문서)</td>
      <td>https://search.shopping.naver.com/book/catalog...</td>
      <td>https://shopping-phinf.pstatic.net/main_324670...</td>
      <td>고현민</td>
      <td>16200</td>
      <td>한빛미디어</td>
      <td>9791162245552</td>
      <td>- 혼자 해도 충분합니다! 1:1 과외하듯 배우는 IT 지식 입문서\n이 책은 독학...</td>
      <td>20220525</td>
    </tr>
    <tr>
      <th>5</th>
      <td>면접을 위한 CS 전공지식 노트 (디자인 패턴, 운영체제, 데이터베이스, 자료 구조...</td>
      <td>https://search.shopping.naver.com/book/catalog...</td>
      <td>https://shopping-phinf.pstatic.net/main_324780...</td>
      <td>주홍철</td>
      <td>21600</td>
      <td>길벗</td>
      <td>9791165219529</td>
      <td>디자인 패턴, 네트워크, 운영체제, 데이터베이스, 자료 구조, 개발자 면접과 포트폴...</td>
      <td>20220428</td>
    </tr>
    <tr>
      <th>6</th>
      <td>구글 광고 하는 여자 (초보 구글 애즈 광고주를 위한 맞춤 가이드!)</td>
      <td>https://search.shopping.naver.com/book/catalog...</td>
      <td>https://shopping-phinf.pstatic.net/main_324402...</td>
      <td>유수정 (디디)</td>
      <td>15300</td>
      <td>디지털북스</td>
      <td>9788960883956</td>
      <td>초보 구글 광고주를 위한 맞춤 가이드!\n구글 광고 하는 여자\n\n광고 맛집, 구...</td>
      <td>20220330</td>
    </tr>
    <tr>
      <th>7</th>
      <td>도메인 주도 개발 시작하기: DDD 핵심 개념 정리부터 구현까지 (DDD 핵심 개념...</td>
      <td>https://search.shopping.naver.com/book/catalog...</td>
      <td>https://shopping-phinf.pstatic.net/main_324363...</td>
      <td>최범균</td>
      <td>25200</td>
      <td>한빛미디어</td>
      <td>9791162245385</td>
      <td>가장 쉽게 배우는 도메인 주도 설계 입문서!\n\n이 책은 도메인 주도 설계(DDD...</td>
      <td>20220321</td>
    </tr>
    <tr>
      <th>8</th>
      <td>헤드 퍼스트 디자인 패턴 (14가지 GoF 필살 패턴!)</td>
      <td>https://search.shopping.naver.com/book/catalog...</td>
      <td>https://shopping-phinf.pstatic.net/main_324734...</td>
      <td>에릭 프리먼^엘리자베스 롭슨^케이시 시에라^버트 베이츠</td>
      <td>32400</td>
      <td>한빛미디어</td>
      <td>9791162245262</td>
      <td>유지관리가 편리한 객체지향 소프트웨어 만들기!\n“『헤드 퍼스트 디자인 패턴(개정판...</td>
      <td>20220316</td>
    </tr>
    <tr>
      <th>9</th>
      <td>하루 5분 UX (UX/UI 디자인 실무를 위한 100가지 레슨)</td>
      <td>https://search.shopping.naver.com/book/catalog...</td>
      <td>https://shopping-phinf.pstatic.net/main_337034...</td>
      <td>조엘 마시</td>
      <td>25650</td>
      <td>유엑스리뷰(UX REVIEW)</td>
      <td>9791192143378</td>
      <td>UX 기획과 디자인 실무에 꼭 필요한 지식만 압축!\n매일 조금씩 읽다 보면 UX ...</td>
      <td>20220805</td>
    </tr>
  </tbody>
</table>
</div>




```python

```
