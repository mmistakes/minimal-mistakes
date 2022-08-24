---
layout: single
title:  "네이버 검색 API 활용 예제"
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

web_df = pd.DataFrame(columns=("Title","Link","Description"))

for start_index in range(start, end, display):

    url = "https://openapi.naver.com/v1/search/webkr?query=" + query + "&display="+str(display) + "&start="+str(start_index)

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
            description = title = re.sub(remove_tag,'',items[item_index]['description'])
            web_df.loc[idx] = [ title, link, description]
            idx += 1
    else:
        print("Error Code:" + rescode)
        
web_df
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
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Computer 이진법을 이용하여 논리 연산, 저장을 수행하는 전자 기계.</td>
      <td>https://namu.wiki/w/%EC%BB%B4%ED%93%A8%ED%84%B0</td>
      <td>Computer 이진법을 이용하여 논리 연산, 저장을 수행하는 전자 기계.</td>
    </tr>
    <tr>
      <th>1</th>
      <td>가격비교 사이트 - 온라인 쇼핑몰, 소셜커머스 전 상품 정보 가격비교 사이트, 비교...</td>
      <td>https://www.danawa.com/pc/</td>
      <td>가격비교 사이트 - 온라인 쇼핑몰, 소셜커머스 전 상품 정보 가격비교 사이트, 비교...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>PC,노트북,컴퓨터부품,가전제품,주변기기,소모품,사무용품,케이블 등</td>
      <td>https://www.compuzone.co.kr/</td>
      <td>PC,노트북,컴퓨터부품,가전제품,주변기기,소모품,사무용품,케이블 등</td>
    </tr>
    <tr>
      <th>3</th>
      <td>6만(삼성 국민 비씨 5징5징 22/08/09 17:27 288 2 370776 당...</td>
      <td>http://www.todayhumor.co.kr/board/list.php?tab...</td>
      <td>6만(삼성 국민 비씨 5징5징 22/08/09 17:27 288 2 370776 당...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>델 본사 공식 온라인 쇼핑몰에서는 최신기술의 Dell 정품 제품을 다양한 온라인 프...</td>
      <td>https://www.dell.com/ko-kr?c=kr&amp;l=ko&amp;s=,gen&amp;~c...</td>
      <td>델 본사 공식 온라인 쇼핑몰에서는 최신기술의 Dell 정품 제품을 다양한 온라인 프...</td>
    </tr>
    <tr>
      <th>5</th>
      <td>오늘은 컴퓨터 무선 와이파이 연결 방법에 대해서 알아보도록 하겠습니다. 컴퓨터(데스...</td>
      <td>https://changwoos.tistory.com/202</td>
      <td>오늘은 컴퓨터 무선 와이파이 연결 방법에 대해서 알아보도록 하겠습니다. 컴퓨터(데스...</td>
    </tr>
    <tr>
      <th>6</th>
      <td>이 분류에 대한 설명은 컴퓨터 문서나 컴퓨터 관련 정보 문서를 참고하십시오.</td>
      <td>https://namu.wiki/w/%EB%B6%84%EB%A5%98:%EC%BB%...</td>
      <td>이 분류에 대한 설명은 컴퓨터 문서나 컴퓨터 관련 정보 문서를 참고하십시오.</td>
    </tr>
    <tr>
      <th>7</th>
      <td>컴퓨터 및 주변기기, 조립PC 전문 쇼핑몰, 모니터 전산소모품</td>
      <td>https://www.youngjaecomputer.com/</td>
      <td>컴퓨터 및 주변기기, 조립PC 전문 쇼핑몰, 모니터 전산소모품</td>
    </tr>
    <tr>
      <th>8</th>
      <td>위키하우는 컴퓨터 단계적 설명과 사진이 있는 ~하는 법 글을 다룬다. 시스템 PC/...</td>
      <td>https://ko.wikihow.com/%EB%B6%84%EB%A5%98:%EC%...</td>
      <td>위키하우는 컴퓨터 단계적 설명과 사진이 있는 ~하는 법 글을 다룬다. 시스템 PC/...</td>
    </tr>
    <tr>
      <th>9</th>
      <td>■ 가구 인터넷 보급률 및 컴퓨터 보유율 변화 추이 ㅇ 국내... 가구의 컴퓨터 보...</td>
      <td>https://www.index.go.kr/potal/main/EachDtlPage...</td>
      <td>■ 가구 인터넷 보급률 및 컴퓨터 보유율 변화 추이 ㅇ 국내... 가구의 컴퓨터 보...</td>
    </tr>
  </tbody>
</table>
</div>




```python
url = "https://openapi.naver.com/v1/search/webkr?query=" + query + "&display="+str(display) + "&start="+str(start)

url
```


```python

```
