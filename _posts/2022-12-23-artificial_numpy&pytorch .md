
---
layout: single
title: "신경망비교- numpy&pytorch"
categories: pytorch
tag: pytorch
---


### 해야할 업무 리스트
*  랭킹 데이터 개발 환경 및 운영환경 설정


```python
import os, sys
project_name = 'kurly-aa-ds-'
file_path = os.path.abspath('')
file_index = file_path.find(project_name)
print(file_path)
split_index = file_path.find('/', file_index)
project_path = file_path[:split_index]
print(project_path)
sys.path.append(project_path)
```

    /home/ubuntu/notebookDir/yjjo/github/kurly-aa-ds-demand-forecast/src
    /home/ubuntu/notebookDir/yjjo/github/kurly-aa-ds-demand-forecast



```python


# basic module
import os
from select import select
import sys
from typing import Dict
import pandas as pd
import numpy as np
from datetime import time, datetime, timedelta
import time
import logging
from itertools import groupby, product
from tabulate import tabulate

from common.io.read import main_read
from common.util.aargparser import get_aargparser, str2bool
from common.config.env import TEMP_PATH

from src.operation.aa_alarm_capa_v1 import AlarmCapaAlert

import six
import matplotlib.pyplot as plt
import re
```


```python
from common.io.read import main_read
#from common.util.aargparser import get_aargparser, str2bool
#from common.config.env import TEMP_PATH
```


```python
amp_df = pd.read_excel('amp_seg_221201.xlsx')
amp_df['biz_ymd'] = amp_df.columns[1].strftime('%Y-%m-%d')
amp_df[['content_no','content_nm','position']] = amp_df['content_id; content_name; position'].str.split(';', expand = True)
amp_df = amp_df[['content_no','content_nm','position']]
amp_df = amp_df[['content_no','content_nm']].drop_duplicates()
print(amp_df.shape)
amp_df.head()
```

    (335, 2)





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
      <th>content_no</th>
      <th>content_nm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5056791</td>
      <td>[KF365] 1+등급 무항생제 특란 20구</td>
    </tr>
    <tr>
      <th>1</th>
      <td>5103617</td>
      <td>[KF365] 1+ 한우 국거리 300g(냉장)</td>
    </tr>
    <tr>
      <th>2</th>
      <td>5131915</td>
      <td>[KF365] 훈제오리 150g*2pk</td>
    </tr>
    <tr>
      <th>3</th>
      <td>5127264</td>
      <td>[KF365] 한돈 떡갈비 1kg</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5063110</td>
      <td>[연세우유 x 마켓컬리] 전용목장우유 900mL</td>
    </tr>
  </tbody>
</table>
</div>



----
## 1. 특정 날짜에 최신 상품 리스트 가져오기 
* 최신 상품 리스트를 가져올 수 있도록 추가
* 패키지 명 붙일 때 최신 정보로 붙이지 않으면 값이 다를 수 있음
%%time
df = main_read.read_sql_query(
"""
--패키지 붙여주기
select 
    event_properties_package_id
    , event_properties_package_name
    , event_properties_position
    , event_time

from mkrs_amplitude_schema.app_v0_8 a 
where 1=1
and year = '2022'
and month = '12'
and day = '01'
and event_properties_browse_screen_name = 'bargain'
and (event_type = 'select_product' or event_type = 'select_product_shortcut')
;
"""
)

df['event_properties_position'] = df['event_properties_position'].astype(int)
print(df.shape)%%time
df = main_read.read_sql_query(
"""
--패키지 붙여주기
select 
    event_properties_package_id
    , event_properties_package_name
    , event_properties_position
    , event_time
    , b.pkg_nm
from mkrs_amplitude_schema.app_v0_8 a 
    left join mkrs_aa_schema.prd_info_1d b on a.event_properties_package_id = b.pkg_no
where 1=1
and year = '2022'
and month = '12'
and day = '01'
--and event_time >= '2022-12-01 22:00:00' and event_time <= '2022-12-01 22:10:00'
--and DATE(event_time) = '2022-12-01'
and event_properties_browse_screen_name = 'bargain'
and (event_type = 'select_product' or event_type = 'select_product_shortcut')
and event_properties_selection_sort_type = '추천순'
and event_properties_
;
"""
)

df['event_properties_position'] = df['event_properties_position'].astype(int)
df = df[['event_properties_package_id','event_properties_package_name']].drop_duplicates()
print(df.shape)
----
## 2. 재고 정보


```python
stock_df = main_read.read_sql_query(
"""
select 
    product_code as master_cd
    , center_code as center_cd
    , quantity as stock_cnt
from mkrs_schema.cms_stock 
"""  
)

print(stock_df.shape)
stock_df.head()
```

    (505887, 3)





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
      <th>product_code</th>
      <th>center_code</th>
      <th>quantity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>MK0000002661</td>
      <td>CC01</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>MK0000002782</td>
      <td>CC01</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>MK0000002891</td>
      <td>CC01</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>MK0000002956</td>
      <td>CC01</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>MK0000003560</td>
      <td>CC01</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>



궁금한 점
해당 테이블을 쓰는 이유 :   
https://kurly0521.atlassian.net/wiki/spaces/ForecastingDemand/pages/2775942192/Data+Structure
https://kurly0521.atlassian.net/wiki/spaces/ForecastingDemand/pages/3430941575/1+-

## 3.할인율 정보


```python
discount_df = main_read.read_sql_query(
"""
select
  product_masterproductcode
  , product_dealproductno
  , product_dealproductcode
  , clustercentercode,discounttype
  , discountvalue
  , startdatetime
  , enddatetime
  , reason1
  , reason2
  , price
  , case
      WHEN discounttype = 'AMOUNT' then 100*discountvalue/price::int
      WHEN discounttype = 'PERCENTAGE' then discountvalue
  	END AS discount_rate  
  , case 
  	  when discounttype = 'AMOUNT' then price - discountvalue
  	  when discounttype = 'PERCENTAGE' then price *(100-discountvalue)*0.01
  	end as show_price
  , row_number() over (partition by product_masterproductcode,product_dealproductno,product_dealproductcode,clustercentercode order by id desc) rn
  , datediff(minute, CURRENT_TIMESTAMP::TIMESTAMP, COALESCE(enddatetime::TIMESTAMP,'9999-01-01 00:00:00')) last_min
FROM
  mkrs_schema.v_discount_discount
WHERE
  activationstatus = 'ACTIVATED'
and  discountvalue != 0 
and ((discounttype = 'AMOUNT' and discountvalue > 1000)  or (discounttype = 'PERCENTAGE')) 
--할인타입이 '금액'일 경우, 할인금액이 1,000원 아래라면 null처리 -> 운영관점에서 1,000원 아래로는 효과가 없다고 판단
and reason1 NOT IN ('선물세트','퍼포먼스') --할인의 이유가 선물세트, 퍼포먼스일 경우 제외
and datediff(minute, CURRENT_TIMESTAMP::TIMESTAMP, COALESCE(enddatetime::TIMESTAMP,'9999-01-01 00:00:00')) > 180 -- 할인 종료시간 3시간 이내 상품 필터링
;
"""
)   
print(discount_df.shape)
discount_df.head(2)
```

    (7078, 15)





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
      <th>product_masterproductcode</th>
      <th>product_dealproductno</th>
      <th>product_dealproductcode</th>
      <th>clustercentercode</th>
      <th>discounttype</th>
      <th>discountvalue</th>
      <th>startdatetime</th>
      <th>enddatetime</th>
      <th>reason1</th>
      <th>reason2</th>
      <th>price</th>
      <th>discount_rate</th>
      <th>show_price</th>
      <th>rn</th>
      <th>last_min</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>M00000004648</td>
      <td>1000040246</td>
      <td>D00000016924</td>
      <td>IC</td>
      <td>AMOUNT</td>
      <td>3950</td>
      <td>2022-12-02 01:57:00</td>
      <td>2022-12-08 02:00:00</td>
      <td>프로모션</td>
      <td>기획전</td>
      <td>71100</td>
      <td>5</td>
      <td>67150.0</td>
      <td>1</td>
      <td>2401</td>
    </tr>
    <tr>
      <th>1</th>
      <td>M00000004655</td>
      <td>1000040241</td>
      <td>D00000016919</td>
      <td>CC02</td>
      <td>AMOUNT</td>
      <td>7450</td>
      <td>2022-12-02 01:57:00</td>
      <td>2022-12-08 02:00:00</td>
      <td>프로모션</td>
      <td>기획전</td>
      <td>134100</td>
      <td>5</td>
      <td>126650.0</td>
      <td>1</td>
      <td>2401</td>
    </tr>
  </tbody>
</table>
</div>



---
#### 4. 새롭게 할인한 상품은 어떻게 붙이지?

정의 : 최근 할인이 0이었는데 할인이 붙은 상품을 찾자

최근 마지막 할인일로부터 오늘이 몇일인지 확인할 것

----
## 5. 상품정보
같은 컨텐츠에 대해서 센터별로 다르게 있는 것을 숙지해야함 (합쳐서 계산해야하나?)


```python
prd_df = main_read.read_sql_query(
"""
select 
	center_cd
	, content_no::varchar
	, deal_no::varchar
	, master_cd
	, content_nm
	, deal_nm 
	, master_nm
from mkrs_aa_schema.u_core_prd_info_1d
where reg_date = current_date-1
--and content_no = 5059791    
"""
)
```


```python
print(prd_df.shape)
prd_df.head()
```

    (208374, 7)





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
      <th>center_cd</th>
      <th>content_no</th>
      <th>deal_no</th>
      <th>master_cd</th>
      <th>content_nm</th>
      <th>deal_nm</th>
      <th>master_nm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>CC01</td>
      <td>5000233</td>
      <td>10000233</td>
      <td>P00000IY000D</td>
      <td>[밥스레드밀] 유기농 팬케익 &amp; 와플믹스</td>
      <td>[밥스레드밀] 유기농 팬케익 &amp; 와플믹스</td>
      <td>[밥스레드밀] 유기농 팬케익 &amp; 와플믹스</td>
    </tr>
    <tr>
      <th>1</th>
      <td>CC01</td>
      <td>5000324</td>
      <td>10000324</td>
      <td>P00000ML000A</td>
      <td>[존쿡 델리미트] 프로슈토</td>
      <td>[존쿡 델리미트] 프로슈토</td>
      <td>[존쿡 델리미트] 프로슈토</td>
    </tr>
    <tr>
      <th>2</th>
      <td>CC01</td>
      <td>5000773</td>
      <td>10000773</td>
      <td>P00000WA000C</td>
      <td>새우젓</td>
      <td>새우젓</td>
      <td>새우젓</td>
    </tr>
    <tr>
      <th>3</th>
      <td>CC01</td>
      <td>5000785</td>
      <td>10000785</td>
      <td>P00000TP000D</td>
      <td>[권영원 소담정찬] 명이나물 장아찌 300g</td>
      <td>[권영원 소담정찬] 명이나물 장아찌 300g</td>
      <td>[권영원 소담정찬] 명이나물 장아찌 300g</td>
    </tr>
    <tr>
      <th>4</th>
      <td>CC01</td>
      <td>5001076</td>
      <td>10001076</td>
      <td>P00000WC000Q</td>
      <td>친환경 청상추 100g</td>
      <td>친환경 청상추 100g</td>
      <td>친환경 청상추 100g</td>
    </tr>
  </tbody>
</table>
</div>



* 콘텐츠 단위로 상품을 제공할 예정

### 노출여부도 필터링 해야하나? 

----
## 2. 데이터셋 생성


```python
print(amp_df.shape, prd_df.shape)
```

    (335, 2) (208374, 7)



```python
tot_df = pd.merge(amp_df[['content_no']], prd_df, how = 'left', on = ['content_no'])
```


```python
print(tot_df.shape)
tot_df.head()
```

    (1140, 7)





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
      <th>content_no</th>
      <th>center_cd</th>
      <th>deal_no</th>
      <th>master_cd</th>
      <th>content_nm</th>
      <th>deal_nm</th>
      <th>master_nm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5056791</td>
      <td>CC01</td>
      <td>10056791</td>
      <td>MK0000056791</td>
      <td>[KF365] 1+등급 무항생제 특란 20구</td>
      <td>[KF365] 1+등급 무항생제 특란 20구</td>
      <td>[KF365] 1+등급 무항생제 특란 20구</td>
    </tr>
    <tr>
      <th>1</th>
      <td>5056791</td>
      <td>CC02</td>
      <td>10056791</td>
      <td>MK0000056791</td>
      <td>[KF365] 1+등급 무항생제 특란 20구</td>
      <td>[KF365] 1+등급 무항생제 특란 20구</td>
      <td>[KF365] 1+등급 무항생제 특란 20구</td>
    </tr>
    <tr>
      <th>2</th>
      <td>5103617</td>
      <td>CC01</td>
      <td>10103617</td>
      <td>MK0000103617</td>
      <td>[KF365] 1+ 한우 국거리 300g(냉장)</td>
      <td>[KF365] 1+ 한우 국거리 300g(냉장)</td>
      <td>[KF365] 1+ 한우 국거리 300g(냉장)</td>
    </tr>
    <tr>
      <th>3</th>
      <td>5103617</td>
      <td>CC02</td>
      <td>10103617</td>
      <td>MK0000103617</td>
      <td>[KF365] 1+ 한우 국거리 300g(냉장)</td>
      <td>[KF365] 1+ 한우 국거리 300g(냉장)</td>
      <td>[KF365] 1+ 한우 국거리 300g(냉장)</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5131915</td>
      <td>CC01</td>
      <td>10131915</td>
      <td>MK0000131915</td>
      <td>[KF365] 훈제오리 150g*2pk</td>
      <td>[KF365] 훈제오리 150g*2pk</td>
      <td>[KF365] 훈제오리 150g*2pk</td>
    </tr>
  </tbody>
</table>
</div>




```python
tot_df = pd.merge(tot_df, stock_df, how = 'left', on = ['master_cd', 'center_cd'])
print(tot_df.shape)
tot_df.head()
```

    (1140, 8)





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
      <th>content_no</th>
      <th>center_cd</th>
      <th>deal_no</th>
      <th>master_cd</th>
      <th>content_nm</th>
      <th>deal_nm</th>
      <th>master_nm</th>
      <th>stock_cnt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5056791</td>
      <td>CC01</td>
      <td>10056791</td>
      <td>MK0000056791</td>
      <td>[KF365] 1+등급 무항생제 특란 20구</td>
      <td>[KF365] 1+등급 무항생제 특란 20구</td>
      <td>[KF365] 1+등급 무항생제 특란 20구</td>
      <td>4713</td>
    </tr>
    <tr>
      <th>1</th>
      <td>5056791</td>
      <td>CC02</td>
      <td>10056791</td>
      <td>MK0000056791</td>
      <td>[KF365] 1+등급 무항생제 특란 20구</td>
      <td>[KF365] 1+등급 무항생제 특란 20구</td>
      <td>[KF365] 1+등급 무항생제 특란 20구</td>
      <td>5394</td>
    </tr>
    <tr>
      <th>2</th>
      <td>5103617</td>
      <td>CC01</td>
      <td>10103617</td>
      <td>MK0000103617</td>
      <td>[KF365] 1+ 한우 국거리 300g(냉장)</td>
      <td>[KF365] 1+ 한우 국거리 300g(냉장)</td>
      <td>[KF365] 1+ 한우 국거리 300g(냉장)</td>
      <td>51</td>
    </tr>
    <tr>
      <th>3</th>
      <td>5103617</td>
      <td>CC02</td>
      <td>10103617</td>
      <td>MK0000103617</td>
      <td>[KF365] 1+ 한우 국거리 300g(냉장)</td>
      <td>[KF365] 1+ 한우 국거리 300g(냉장)</td>
      <td>[KF365] 1+ 한우 국거리 300g(냉장)</td>
      <td>57</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5131915</td>
      <td>CC01</td>
      <td>10131915</td>
      <td>MK0000131915</td>
      <td>[KF365] 훈제오리 150g*2pk</td>
      <td>[KF365] 훈제오리 150g*2pk</td>
      <td>[KF365] 훈제오리 150g*2pk</td>
      <td>3482</td>
    </tr>
  </tbody>
</table>
</div>




```python
discount_df = discount_df.rename(columns = {'product_masterproductcode':'master_cd',
                              'clustercentercode':'center_cd'})

discount_df = discount_df[['master_cd', 'center_cd', 'discounttype', 'discountvalue',
                           'startdatetime','enddatetime', 'reason1', 'reason2',
                           'price', 'discount_rate','show_price', 'rn', 'last_min']]
```

마지막 할인 시점


```python
tot_df1 = pd.merge(tot_df, discount_df, how = 'left', on = ['master_cd', 'center_cd'])
```

* 어디서 30개가 늘어났지?
