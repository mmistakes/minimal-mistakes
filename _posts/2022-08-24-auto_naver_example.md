---
layout: single
title:  "구글 연관검색어 네이버 검색 조회율 조회"
categories: coding
tag: [python, blog]
---




```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import requests
from bs4 import BeautifulSoup

def get_category_popular_keyword_naver(category_num):
    driver = webdriver.Chrome('chromedriver.exe')
    driver.get('https://datalab.naver.com/')
    
    return_data = list()
    select_list = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.CSS_SELECTOR, ".select_btn")))
    select_list.click()
    time.sleep(2)
    
    select_item = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.select.depth._dropdown > ul > li:nth-child("+str(category_num) + ") > a")))
    select_item.click()
    time.sleep(2)
    
    datas1 = driver.find_elements_by_css_selector("div.keyword_rank div.rank_scroll li.list span.title")
    for item in datas1:
        return_data.append(item.text)
        
    driver.quit()
    return return_data[-10:]
```


```python
datas1 = get_category_popular_keyword_naver(4)

datas1
```




    ['키보드',
     '외장하드',
     '스피커',
     '로봇청소기',
     '헤드셋',
     '마우스',
     '서큘레이터zf-900',
     '블루투스헤드셋',
     '써큘레이터',
     '렉스퀸무선청소기']




```python
def get_related_keyword_google(keyword):
    return_data = list()
    google_related_key_api = 'http://suggestqueries.google.com/complete/search?output=toolbar&q='+keyword
    response = requests.get(google_related_key_api)
    soup = BeautifulSoup(response.content, 'xml')
    
    datas1 = soup.select('suggestion')
    
    for item in datas1:
        return_data.append(item['data'])
    return return_data
```


```python
get_related_keyword_google("가전")[0:5]
```




    ['가전제품', '가전 주부', '가전제품 수거', '가전', '가전내구제']




```python
def naver_shopping_api_template(naver_open_api, body):
    header_params = {"X-Naver-Client-Id":"XyBx9tytLniDDiCmtiVB", "X-Naver-Client-Secret":"vvaU6zjoZD", "Content-Type":"application/json"}
    res = requests.post(naver_open_api, headers=header_params, data=body.encode('utf-8'))
    
    if(res.status_code == 200):
        return res.json()
        print("OK")
    else:
        print("fail",res.status_code)
        return None
```


```python
naver_shpping_category_insight_api= "https://openapi.naver.com/v1/datalab/shopping/category/keywords"
```


```python
import json

result_data = list()

for item in datas1:
    body = {
        "startDate": "2022-05-01",
        "endDate": "2022-07-01",
        "timeUnit": "month",
        "category": "50000003",
        "keyword":[],
        "device": "",
        "gender": "",
        "ages": []
    }
    
#     print(item)
    
    related_keyword = get_related_keyword_google(item)[:5]
    
#     print("구글", related_keyword)
    for item2 in related_keyword:
        data_dict = dict()
        data_dict['name'] = item2
        data_list = list()
        data_list.append(item2)
        data_dict['param'] = data_list
#         print(data_list)
#         print(data_dict)
        body['keyword'].append(data_dict)
    body = json.dumps(body)
    data_json = naver_shopping_api_template(naver_shpping_category_insight_api, body)
    if data_json != None:
        result_data.append(data_json)
```

    fail 400
    fail 400
    


```python
result_data

# for i in result_data:
#     print(i['results'])
#     print("\n")
```




    [{'startDate': '2022-05-01',
      'endDate': '2022-07-31',
      'timeUnit': 'month',
      'results': [{'title': '키보드',
        'keyword': ['키보드'],
        'data': [{'period': '2022-05-01', 'ratio': 12.16972},
         {'period': '2022-06-01', 'ratio': 30.53398},
         {'period': '2022-07-01', 'ratio': 100}]},
       {'title': '키보드 테스트',
        'keyword': ['키보드테스트'],
        'data': [{'period': '2022-05-01', 'ratio': 4e-05},
         {'period': '2022-06-01', 'ratio': 4e-05},
         {'period': '2022-07-01', 'ratio': 9e-05}]},
       {'title': '키보드자판',
        'keyword': ['키보드자판'],
        'data': [{'period': '2022-05-01', 'ratio': 0.00653},
         {'period': '2022-06-01', 'ratio': 0.00597},
         {'period': '2022-07-01', 'ratio': 0.00915}]},
       {'title': '키보드 추천',
        'keyword': ['키보드추천'],
        'data': [{'period': '2022-05-01', 'ratio': 0.06832},
         {'period': '2022-06-01', 'ratio': 0.06789},
         {'period': '2022-07-01', 'ratio': 0.07722}]},
       {'title': '키보드 청소',
        'keyword': ['키보드청소'],
        'data': [{'period': '2022-05-01', 'ratio': 9e-05},
         {'period': '2022-06-01', 'ratio': 0.00017},
         {'period': '2022-07-01', 'ratio': 0.00025}]}]},
     {'startDate': '2022-05-01',
      'endDate': '2022-07-31',
      'timeUnit': 'month',
      'results': [{'title': '외장하드',
        'keyword': ['외장하드'],
        'data': [{'period': '2022-05-01', 'ratio': 6.59122},
         {'period': '2022-06-01', 'ratio': 25.6456},
         {'period': '2022-07-01', 'ratio': 100}]},
       {'title': '외장하드 인식불가',
        'keyword': ['외장하드인식불가'],
        'data': [{'period': '2022-05-01', 'ratio': 6e-05}]},
       {'title': '외장하드 추천',
        'keyword': ['외장하드추천'],
        'data': [{'period': '2022-05-01', 'ratio': 0.43838},
         {'period': '2022-06-01', 'ratio': 0.15884},
         {'period': '2022-07-01', 'ratio': 0.07927}]},
       {'title': '외장하드 복구',
        'keyword': ['외장하드복구'],
        'data': [{'period': '2022-05-01', 'ratio': 0.0001},
         {'period': '2022-06-01', 'ratio': 0.00066},
         {'period': '2022-07-01', 'ratio': 0.00154}]},
       {'title': '외장하드 인식',
        'keyword': ['외장하드인식'],
        'data': [{'period': '2022-05-01', 'ratio': 6e-05},
         {'period': '2022-06-01', 'ratio': 0.00016},
         {'period': '2022-07-01', 'ratio': 2e-05}]}]},
     {'startDate': '2022-05-01',
      'endDate': '2022-07-31',
      'timeUnit': 'month',
      'results': [{'title': '스피커',
        'keyword': ['스피커'],
        'data': [{'period': '2022-05-01', 'ratio': 6.6681},
         {'period': '2022-06-01', 'ratio': 40.33339},
         {'period': '2022-07-01', 'ratio': 100}]},
       {'title': '스피커 갤러리', 'keyword': ['스피커갤러리'], 'data': []},
       {'title': '스피커 물빼기', 'keyword': ['스피커물빼기'], 'data': []},
       {'title': '스피커 추천',
        'keyword': ['스피커추천'],
        'data': [{'period': '2022-05-01', 'ratio': 0.18199},
         {'period': '2022-06-01', 'ratio': 0.0961},
         {'period': '2022-07-01', 'ratio': 0.02293}]},
       {'title': '스피커갤', 'keyword': ['스피커갤'], 'data': []}]},
     {'startDate': '2022-05-01',
      'endDate': '2022-07-31',
      'timeUnit': 'month',
      'results': [{'title': '로봇청소기',
        'keyword': ['로봇청소기'],
        'data': [{'period': '2022-05-01', 'ratio': 25.9926},
         {'period': '2022-06-01', 'ratio': 56.81462},
         {'period': '2022-07-01', 'ratio': 100}]},
       {'title': '로봇청소기 추천',
        'keyword': ['로봇청소기추천'],
        'data': [{'period': '2022-05-01', 'ratio': 1.99336},
         {'period': '2022-06-01', 'ratio': 1.06908},
         {'period': '2022-07-01', 'ratio': 1.36026}]},
       {'title': '로봇청소기 가격',
        'keyword': ['로봇청소기가격'],
        'data': [{'period': '2022-05-01', 'ratio': 0.0029},
         {'period': '2022-06-01', 'ratio': 0.00303},
         {'period': '2022-07-01', 'ratio': 0.004}]},
       {'title': '로봇청소기 문턱',
        'keyword': ['로봇청소기문턱'],
        'data': [{'period': '2022-05-01', 'ratio': 0.00036},
         {'period': '2022-06-01', 'ratio': 0.00036},
         {'period': '2022-07-01', 'ratio': 0.00066}]},
       {'title': '로봇청소기 추천 클리앙', 'keyword': ['로봇청소기추천클리앙'], 'data': []}]},
     {'startDate': '2022-05-01',
      'endDate': '2022-07-31',
      'timeUnit': 'month',
      'results': [{'title': '헤드셋',
        'keyword': ['헤드셋'],
        'data': [{'period': '2022-05-01', 'ratio': 24.63102},
         {'period': '2022-06-01', 'ratio': 46.8918},
         {'period': '2022-07-01', 'ratio': 100}]},
       {'title': '헤드셋 추천',
        'keyword': ['헤드셋추천'],
        'data': [{'period': '2022-05-01', 'ratio': 1.44337},
         {'period': '2022-06-01', 'ratio': 0.75926},
         {'period': '2022-07-01', 'ratio': 0.42974}]},
       {'title': '헤드셋 소리 안들림', 'keyword': ['헤드셋소리안들림'], 'data': []},
       {'title': '헤드셋 한쪽만 들릴때', 'keyword': ['헤드셋한쪽만들릴때'], 'data': []},
       {'title': '헤드셋 마이크 안됨', 'keyword': ['헤드셋마이크안됨'], 'data': []}]},
     {'startDate': '2022-05-01',
      'endDate': '2022-07-31',
      'timeUnit': 'month',
      'results': [{'title': '마우스',
        'keyword': ['마우스'],
        'data': [{'period': '2022-05-01', 'ratio': 21.34318},
         {'period': '2022-06-01', 'ratio': 69.40858},
         {'period': '2022-07-01', 'ratio': 100}]},
       {'title': '마우스 갤러리', 'keyword': ['마우스갤러리'], 'data': []},
       {'title': '마우스패드',
        'keyword': ['마우스패드'],
        'data': [{'period': '2022-05-01', 'ratio': 11.23172},
         {'period': '2022-06-01', 'ratio': 31.92631},
         {'period': '2022-07-01', 'ratio': 41.67991}]},
       {'title': '마우스 커서',
        'keyword': ['마우스커서'],
        'data': [{'period': '2022-06-01', 'ratio': 0.0001},
         {'period': '2022-07-01', 'ratio': 0.0001}]},
       {'title': '마우스 추천',
        'keyword': ['마우스추천'],
        'data': [{'period': '2022-05-01', 'ratio': 0.17252},
         {'period': '2022-06-01', 'ratio': 0.18652},
         {'period': '2022-07-01', 'ratio': 0.17312}]}]},
     {'startDate': '2022-05-01',
      'endDate': '2022-07-31',
      'timeUnit': 'month',
      'results': [{'title': '블루투스 헤드폰',
        'keyword': ['블루투스헤드폰'],
        'data': [{'period': '2022-05-01', 'ratio': 53.42513},
         {'period': '2022-06-01', 'ratio': 32.45229},
         {'period': '2022-07-01', 'ratio': 100}]},
       {'title': '블루투스헤드셋 추천',
        'keyword': ['블루투스헤드셋추천'],
        'data': [{'period': '2022-05-01', 'ratio': 2.43309},
         {'period': '2022-06-01', 'ratio': 1.73306},
         {'period': '2022-07-01', 'ratio': 4.77019}]},
       {'title': '블루투스 헤드폰 가성비',
        'keyword': ['블루투스헤드폰가성비'],
        'data': [{'period': '2022-05-01', 'ratio': 0.01},
         {'period': '2022-06-01', 'ratio': 0.003},
         {'period': '2022-07-01', 'ratio': 0.001}]},
       {'title': '블루투스 헤드폰 추천 클리앙', 'keyword': ['블루투스헤드폰추천클리앙'], 'data': []},
       {'title': '블루투스 헤드폰 컴퓨터 연결',
        'keyword': ['블루투스헤드폰컴퓨터연결'],
        'data': [{'period': '2022-07-01', 'ratio': 0.002}]}]},
     {'startDate': '2022-05-01',
      'endDate': '2022-07-31',
      'timeUnit': 'month',
      'results': [{'title': '써큘레이터 선풍기 차이',
        'keyword': ['써큘레이터선풍기차이'],
        'data': [{'period': '2022-05-01', 'ratio': 0.01014},
         {'period': '2022-06-01', 'ratio': 0.01774},
         {'period': '2022-07-01', 'ratio': 0.01014}]},
       {'title': '써큘레이터 추천',
        'keyword': ['써큘레이터추천'],
        'data': [{'period': '2022-05-01', 'ratio': 26.87168},
         {'period': '2022-06-01', 'ratio': 100},
         {'period': '2022-07-01', 'ratio': 69.57381}]},
       {'title': '써큘레이터 선풍기',
        'keyword': ['써큘레이터선풍기'],
        'data': [{'period': '2022-05-01', 'ratio': 14.49686},
         {'period': '2022-06-01', 'ratio': 48.97193},
         {'period': '2022-07-01', 'ratio': 51.17004}]},
       {'title': '써큘레이터 뜻',
        'keyword': ['써큘레이터뜻'],
        'data': [{'period': '2022-05-01', 'ratio': 0.00253},
         {'period': '2022-06-01', 'ratio': 0.01774},
         {'period': '2022-07-01', 'ratio': 0.04563}]},
       {'title': '써큘레이터 청소',
        'keyword': ['써큘레이터청소'],
        'data': [{'period': '2022-05-01', 'ratio': 0.01774},
         {'period': '2022-06-01', 'ratio': 0.03549},
         {'period': '2022-07-01', 'ratio': 0.04563}]}]}]




```python
import os
import sys
import urllib.request

client_id = "GY0CffCE9PlFTTz4pvwT"
client_secret = "JQ8L1M410y"
url = "https://openapi.naver.com/v1/datalab/shopping/categories";
body = "{\"startDate\":\"2017-08-01\",\"endDate\":\"2017-09-30\",\"timeUnit\":\"month\",\"category\":[{\"name\":\"패션의류\",\"param\":[\"50000000\"]},{\"name\":\"화장품/미용\",\"param\":[\"50000002\"]}],\"device\":\"pc\",\"ages\":[\"20\",\"30\"],\"gender\":\"f\"}";

request = urllib.request.Request(url)
request.add_header("X-Naver-Client-Id",client_id)
request.add_header("X-Naver-Client-Secret",client_secret)
request.add_header("Content-Type","application/json")
response = urllib.request.urlopen(request, data=body.encode("utf-8"))
rescode = response.getcode()

if(rescode==200):
    response_body = response.read()
    print(response_body.decode('utf-8'))
else:
    print("Error Code:" + rescode)
```

    {"startDate":"2017-08-01","endDate":"2017-09-30","timeUnit":"month","results":[{"title":"패션의류","category":["50000000"],"data":[{"period":"2017-08-01","ratio":84.01252},{"period":"2017-09-01","ratio":100}]},{"title":"화장품/미용","category":["50000002"],"data":[{"period":"2017-08-01","ratio":22.21162},{"period":"2017-09-01","ratio":21.54278}]}]}
    


```python

```
