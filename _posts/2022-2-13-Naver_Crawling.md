---
layout: single
title: "Naver_Crawling"
categories: Crawling
tag:
  [python, crawling, blog, github, naver, map, 맛집, 숙소, 가게,  크롤링, 파이썬,  멀티캠퍼스, 국비, 빅데이터 교육]
toc: true
sidebar:
  nav: "docs"
---

```python
import time
import sys 
import os 

import pandas as pd
import numpy as np

from selenium import webdriver 
import chromedriver_autoinstaller
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

import warnings
warnings.filterwarnings('ignore')
```

## 1. 데이터 수집


```python
# 검색어 입력 
# guery = input('검색지역? ')
query = '부산 맛집'
```


```python
path = chromedriver_autoinstaller.install()
driver = webdriver.Chrome(path)
driver.get(f"https://map.naver.com/v5/search/{query}?c=14203933.7141038,4562681.4505997,10,0,0,0,dh")
```


```python
# 검색결과 iframe 접근
driver.switch_to.frame("searchIframe")
```

### 데이터 수집 For 문


```python
# 처음 돌릴 땐 자료 60개 수집..
# 1페이지로 돌아간 뒤 한번 더 돌리면 300개 정도 추출됨 (검색 결과 많은 경우)


title_list = []
f_data_list = []

try: 
    for i in range(1,7): 
        driver.find_element_by_link_text(str(i)).click()
        try: 
            for j in range(3,70,3):
                element = driver.find_elements_by_css_selector('.OXiLu')[j]
                ActionChains(driver).move_to_element(element).key_down(Keys.PAGE_DOWN).key_up(Keys.PAGE_DOWN).perform()
        except:
            pass

        title_raw = driver.find_elements_by_css_selector(".OXiLu")
        for title in title_raw:
            title = title.text
            title_list.append(title)

        # 평점 등 데이터
        data_raw = driver.find_elements_by_css_selector('._17H46')
        for data in data_raw: 
            data = data.text
            f_data_list.append(data)
        
except:
    pass

print(len(title_list),len(f_data_list))
```

    304 304



```python
## 데이터 프레임 만들기
df = pd.DataFrame({'title':title_list, 'data':f_data_list})
df
```




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
      <th>title</th>
      <th>data</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>카페 린</td>
      <td>영업 종료\n별점\n4.82방문자리뷰 110블로그리뷰 28</td>
    </tr>
    <tr>
      <th>1</th>
      <td>레아파티쓰리</td>
      <td>영업 종료\n별점\n4.84방문자리뷰 37블로그리뷰 22</td>
    </tr>
    <tr>
      <th>2</th>
      <td>해운대암소갈비집</td>
      <td>별점\n4.22방문자리뷰 3,465블로그리뷰 2,675</td>
    </tr>
    <tr>
      <th>3</th>
      <td>해운대 가야밀면</td>
      <td>영업 종료\n별점\n4.54방문자리뷰 4,366블로그리뷰 5,010</td>
    </tr>
    <tr>
      <th>4</th>
      <td>파크하얏트부산호텔</td>
      <td>별점\n4.67방문자리뷰 807블로그리뷰 4,095</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>299</th>
      <td>할매집</td>
      <td>영업 종료\n별점\n4.37방문자리뷰 409블로그리뷰 283</td>
    </tr>
    <tr>
      <th>300</th>
      <td>오후의홍차</td>
      <td>영업 종료\n별점\n4.71방문자리뷰 4,306블로그리뷰 1,185</td>
    </tr>
    <tr>
      <th>301</th>
      <td>회전초밥갓파스시 덕천점</td>
      <td>별점\n4.31방문자리뷰 1,471블로그리뷰 249</td>
    </tr>
    <tr>
      <th>302</th>
      <td>할매집</td>
      <td>영업 종료\n별점\n4.52방문자리뷰 1,055블로그리뷰 459</td>
    </tr>
    <tr>
      <th>303</th>
      <td>호찐빵</td>
      <td>영업 종료\n별점\n4.38방문자리뷰 2,843블로그리뷰 614</td>
    </tr>
  </tbody>
</table>
<p>304 rows × 2 columns</p>
</div>



## 2. data 컬럼 전처리


```python
df['data'][0:10]
```




    0         영업 종료\n별점\n4.82방문자리뷰 110블로그리뷰 28
    1          영업 종료\n별점\n4.84방문자리뷰 37블로그리뷰 22
    2           별점\n4.22방문자리뷰 3,465블로그리뷰 2,675
    3    영업 종료\n별점\n4.54방문자리뷰 4,366블로그리뷰 5,010
    4             별점\n4.67방문자리뷰 807블로그리뷰 4,095
    5    영업 종료\n별점\n4.55방문자리뷰 2,327블로그리뷰 1,335
    6      영업 종료\n별점\n4.44방문자리뷰 933블로그리뷰 1,850
    7     영업 종료\n별점\n4.5방문자리뷰 2,303블로그리뷰 1,127
    8     영업 종료\n별점\n4.3방문자리뷰 3,482블로그리뷰 3,312
    9     영업 종료\n별점\n4.4방문자리뷰 3,567블로그리뷰 3,023
    Name: data, dtype: object




```python
# 별점 없는 데이터 인덱스 확인
d = df[~df['data'].str.contains('별점')].index
d
```




    Int64Index([ 15,  23,  46,  49,  86, 101, 103, 115, 119, 147, 149, 158, 160,
                165, 172, 178, 189, 191, 213, 219, 221, 226, 239, 245, 258, 266,
                274, 282],
               dtype='int64')




```python
refined_df = df.drop(index=d, axis=0)
refined_df
```




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
      <th>title</th>
      <th>data</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>카페 린</td>
      <td>영업 종료\n별점\n4.82방문자리뷰 110블로그리뷰 28</td>
    </tr>
    <tr>
      <th>1</th>
      <td>레아파티쓰리</td>
      <td>영업 종료\n별점\n4.84방문자리뷰 37블로그리뷰 22</td>
    </tr>
    <tr>
      <th>2</th>
      <td>해운대암소갈비집</td>
      <td>별점\n4.22방문자리뷰 3,465블로그리뷰 2,675</td>
    </tr>
    <tr>
      <th>3</th>
      <td>해운대 가야밀면</td>
      <td>영업 종료\n별점\n4.54방문자리뷰 4,366블로그리뷰 5,010</td>
    </tr>
    <tr>
      <th>4</th>
      <td>파크하얏트부산호텔</td>
      <td>별점\n4.67방문자리뷰 807블로그리뷰 4,095</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>299</th>
      <td>할매집</td>
      <td>영업 종료\n별점\n4.37방문자리뷰 409블로그리뷰 283</td>
    </tr>
    <tr>
      <th>300</th>
      <td>오후의홍차</td>
      <td>영업 종료\n별점\n4.71방문자리뷰 4,306블로그리뷰 1,185</td>
    </tr>
    <tr>
      <th>301</th>
      <td>회전초밥갓파스시 덕천점</td>
      <td>별점\n4.31방문자리뷰 1,471블로그리뷰 249</td>
    </tr>
    <tr>
      <th>302</th>
      <td>할매집</td>
      <td>영업 종료\n별점\n4.52방문자리뷰 1,055블로그리뷰 459</td>
    </tr>
    <tr>
      <th>303</th>
      <td>호찐빵</td>
      <td>영업 종료\n별점\n4.38방문자리뷰 2,843블로그리뷰 614</td>
    </tr>
  </tbody>
</table>
<p>276 rows × 2 columns</p>
</div>




```python
# # 방문자리뷰 없는 데이터 확인 (보통 다 있음)
# d = df[~df['data'].str.contains('방문자리뷰')].index
# d

# # 블로그리뷰 없는 데이터 있는지 확인 (보통 다 있음)
# d = df[~df['data'].str.contains('블로그리뷰')].index
# d
```


```python
data_list = refined_df['data'].values.tolist()
data_list[0:5]
```




    ['영업 종료\n별점\n4.82방문자리뷰 110블로그리뷰 28',
     '영업 종료\n별점\n4.84방문자리뷰 37블로그리뷰 22',
     '별점\n4.22방문자리뷰 3,465블로그리뷰 2,675',
     '영업 종료\n별점\n4.54방문자리뷰 4,366블로그리뷰 5,010',
     '별점\n4.67방문자리뷰 807블로그리뷰 4,095']




```python
for i in range(len(data_list)):
   # 별점 숫자 앞 제거
    data_list[i] = data_list[i].split('별점')[1]
    data_list[i] = data_list[i].split('\n')[1]

    # 나머지 한글 제거
    data_list[i] = data_list[i].replace('방문자리뷰', '').replace('블로그리뷰','')

    # 별점, 방문자리뷰, 저장수 분리
    data_list[i] = data_list[i].split(' ')
```


```python
# 각 요소 리스트로 만들기

rating = []
review = []
save = []

for i in range(len(data_list)):
    rating.append(data_list[i][0])
    review.append(data_list[i][1])
    save.append(data_list[i][2])
```


```python
# 새로운 df 만듦
naver_df = refined_df

# 컬럼 추가 
naver_df['rating'] = rating
naver_df['review'] = review
naver_df['blog'] = save
```


```python
# data 컬럼 삭제 

naver_df = naver_df.drop(['data'], axis=1)
naver_df
```




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
      <th>title</th>
      <th>rating</th>
      <th>review</th>
      <th>blog</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>카페 린</td>
      <td>4.82</td>
      <td>110</td>
      <td>28</td>
    </tr>
    <tr>
      <th>1</th>
      <td>레아파티쓰리</td>
      <td>4.84</td>
      <td>37</td>
      <td>22</td>
    </tr>
    <tr>
      <th>2</th>
      <td>해운대암소갈비집</td>
      <td>4.22</td>
      <td>3,465</td>
      <td>2,675</td>
    </tr>
    <tr>
      <th>3</th>
      <td>해운대 가야밀면</td>
      <td>4.54</td>
      <td>4,366</td>
      <td>5,010</td>
    </tr>
    <tr>
      <th>4</th>
      <td>파크하얏트부산호텔</td>
      <td>4.67</td>
      <td>807</td>
      <td>4,095</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>299</th>
      <td>할매집</td>
      <td>4.37</td>
      <td>409</td>
      <td>283</td>
    </tr>
    <tr>
      <th>300</th>
      <td>오후의홍차</td>
      <td>4.71</td>
      <td>4,306</td>
      <td>1,185</td>
    </tr>
    <tr>
      <th>301</th>
      <td>회전초밥갓파스시 덕천점</td>
      <td>4.31</td>
      <td>1,471</td>
      <td>249</td>
    </tr>
    <tr>
      <th>302</th>
      <td>할매집</td>
      <td>4.52</td>
      <td>1,055</td>
      <td>459</td>
    </tr>
    <tr>
      <th>303</th>
      <td>호찐빵</td>
      <td>4.38</td>
      <td>2,843</td>
      <td>614</td>
    </tr>
  </tbody>
</table>
<p>276 rows × 4 columns</p>
</div>




```python
## csv 저장 
df.to_csv("naver({}).csv".format(query), encoding='utf-8-sig')
```
