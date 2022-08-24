---
layout: single
title:  "네이버 지식인 API 활용예제 "
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

kin_df = pd.DataFrame(columns=("Title","Link","Description"))

for start_index in range(start, end, display):

    url = "https://openapi.naver.com/v1/search/kin?query=" \
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
            description = title = re.sub(remove_tag,'',items[item_index]['description'])
            kin_df.loc[idx] = [ title, link, description]
            idx += 1
    else:
        print("Error Code:" + rescode)
        
kin_df
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
      <td>... 컴퓨터 본체를 의자로 쳐서 기울었다 돌아오는 충격을 받았는데 혹시 이런 충격...</td>
      <td>https://kin.naver.com/qna/detail.naver?d1id=1&amp;...</td>
      <td>... 컴퓨터 본체를 의자로 쳐서 기울었다 돌아오는 충격을 받았는데 혹시 이런 충격...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>이주 전에 컴퓨터 초기화했는데요 부팅 오류가 뜨는 것도 아닌데 컴퓨터 화면도 안들어...</td>
      <td>https://kin.naver.com/qna/detail.naver?d1id=1&amp;...</td>
      <td>이주 전에 컴퓨터 초기화했는데요 부팅 오류가 뜨는 것도 아닌데 컴퓨터 화면도 안들어...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>번개장터에서 조립식 컴퓨터를 구매하려는데 컴퓨터를 잘 몰라서요. 괜찮은 건가요?? ...</td>
      <td>https://kin.naver.com/qna/detail.naver?d1id=5&amp;...</td>
      <td>번개장터에서 조립식 컴퓨터를 구매하려는데 컴퓨터를 잘 몰라서요. 괜찮은 건가요?? ...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>고1 학생인데요 공부도 못하고 잘할줄아는것도 없어서 컴퓨터 쪽으로 가고싶어서 직업을...</td>
      <td>https://kin.naver.com/qna/detail.naver?d1id=1&amp;...</td>
      <td>고1 학생인데요 공부도 못하고 잘할줄아는것도 없어서 컴퓨터 쪽으로 가고싶어서 직업을...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>... 지포스1060컴퓨터를 쓰다가 이번에 지포스3070ti가 포함된 새 컴퓨터를 ...</td>
      <td>https://kin.naver.com/qna/detail.naver?d1id=1&amp;...</td>
      <td>... 지포스1060컴퓨터를 쓰다가 이번에 지포스3070ti가 포함된 새 컴퓨터를 ...</td>
    </tr>
    <tr>
      <th>5</th>
      <td>컴퓨터활용능력 필기 1급 2급 컴퓨터일반 스프레드시트 내용이 겹치나요?  네, 질문...</td>
      <td>https://kin.naver.com/qna/detail.naver?d1id=1&amp;...</td>
      <td>컴퓨터활용능력 필기 1급 2급 컴퓨터일반 스프레드시트 내용이 겹치나요?  네, 질문...</td>
    </tr>
    <tr>
      <th>6</th>
      <td>컴퓨터학원을 찾아보고 있어요. 여러곳을 알아 봤지만 컴퓨터학원 좋은 곳이 어딘지 모...</td>
      <td>https://kin.naver.com/qna/detail.naver?d1id=1&amp;...</td>
      <td>컴퓨터학원을 찾아보고 있어요. 여러곳을 알아 봤지만 컴퓨터학원 좋은 곳이 어딘지 모...</td>
    </tr>
    <tr>
      <th>7</th>
      <td>오늘 컴퓨터가 왔는데 현재 컴퓨터에 있는 파일들을 새 컴퓨터로 옮겨야하는데 usb로...</td>
      <td>https://kin.naver.com/qna/detail.naver?d1id=1&amp;...</td>
      <td>오늘 컴퓨터가 왔는데 현재 컴퓨터에 있는 파일들을 새 컴퓨터로 옮겨야하는데 usb로...</td>
    </tr>
    <tr>
      <th>8</th>
      <td>... 컴퓨터를 해야합니다. 개발자라서 컴퓨터를 하루에 6시간 이상씩은 하는데 시력...</td>
      <td>https://kin.naver.com/qna/detail.naver?d1id=7&amp;...</td>
      <td>... 컴퓨터를 해야합니다. 개발자라서 컴퓨터를 하루에 6시간 이상씩은 하는데 시력...</td>
    </tr>
    <tr>
      <th>9</th>
      <td>... 제 컴퓨터를 방에 들일려고 하는데 컴퓨터 쓸 인터넷으로 따로 kt에 인터넷....</td>
      <td>https://kin.naver.com/qna/detail.naver?d1id=1&amp;...</td>
      <td>... 제 컴퓨터를 방에 들일려고 하는데 컴퓨터 쓸 인터넷으로 따로 kt에 인터넷....</td>
    </tr>
  </tbody>
</table>
</div>




```python

```
