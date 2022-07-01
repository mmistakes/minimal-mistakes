---
layout: single
title:  "24_starbucks_Analysis"
categories : python
tag : [review]
search: true #false로 주면 검색해도 안나온다.
---

```python
import warnings
warnings.filterwarnings('ignore')
import requests
import folium
from pandas.io.json import json_normalize
```


```python
#전국 또는 특정 지역의 스타벅스 매장의 위치를 찾아서 지도위에 표시하기
#1. requests 모듈로 스타벅스 매장 위치 데이터를 
#   가져와서 딕셔너리 타입으로 변환한다.
#2. 판다스의 json_normalize()함수로 json이 변환된 딕셔너리를 
#   판다스 데이터프레임으로 변환한다.
#3. folium 모듈을 사용해 지도를 표시하고 지도위의 스타벅스 매장 위치에
#   마커를 표시한다.
```


```python
#서울 스타벅스 전 지점
targetSite = 'https://www.starbucks.co.kr/store/getStore.do?r=V412YZ6GQ3'
request = requests.post(targetSite, data={ 
    'ins_lat' : 37.2700715, # 위도
    'ins_lng': 127.1273485, # 경도
    'p_sido_cd' : '01', #시도코드
    'p_gugun_cd': '', #구군코드
    'in_biz_cd': '', #?
    'iend' : 1600, #서버가 응답하는 최대 매장의 개수
    'set_date' : '' #?
    })

storeList = request.json()
print(type(storeList))
print(len(storeList['list']))
```

    <class 'dict'>
    581
    


```python
#json_normalize()함수로 json타입으로 데이터가
#변환된 딕셔너리를 판다스 데이터프레임으로 변환한다.
#json_normalize(데이터프레임으로 변환할 데이터가 저장된 딕셔너리, 
#               '딕셔너리의 key중에서 데이터 프레임으로 변환할 key')
star_df = json_normalize(storeList, 'list')
print(type(star_df))
```

    <class 'pandas.core.frame.DataFrame'>
    


```python
star_df.head()
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
      <th>seq</th>
      <th>sido_cd</th>
      <th>sido_nm</th>
      <th>gugun_cd</th>
      <th>gugun_nm</th>
      <th>code_order</th>
      <th>view_yn</th>
      <th>store_num</th>
      <th>sido</th>
      <th>gugun</th>
      <th>...</th>
      <th>t22</th>
      <th>t21</th>
      <th>p90</th>
      <th>t05</th>
      <th>t30</th>
      <th>t36</th>
      <th>t27</th>
      <th>t29</th>
      <th>t43</th>
      <th>t48</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 129 columns</p>
</div>




```python
print(storeList['list'][0])
```

    {'seq': 0, 'sido_cd': None, 'sido_nm': None, 'gugun_cd': None, 'gugun_nm': None, 'code_order': None, 'view_yn': None, 'store_num': None, 'sido': None, 'gugun': None, 'address': None, 'new_img_nm': None, 'p_pro_seq': 0, 'p_view_yn': None, 'p_sido_cd': '', 'p_gugun_cd': '', 'p_store_nm': None, 'p_theme_cd': None, 'p_wireless_yn': None, 'p_smoking_yn': None, 'p_book_yn': None, 'p_music_yn': None, 'p_terrace_yn': None, 'p_table_yn': None, 'p_takeout_yn': None, 'p_parking_yn': None, 'p_dollar_assent': None, 'p_card_recharge': None, 'p_subway_yn': None, 'stb_store_file_renew': None, 'stb_store_theme_renew': None, 'stb_store_time_renew': None, 'stb_store_lsm': None, 's_code': '1509', 's_name': '역삼아레나빌딩', 'tel': '1522-3232', 'fax': '02-568-3763', 'sido_code': '01', 'sido_name': '서울', 'gugun_code': '0101', 'gugun_name': '강남구', 'addr': '서울특별시 강남구 역삼동 721-13 아레나빌딩', 'park_info': None, 'new_state': None, 'theme_state': 'T05@T08@T16@T17@T20@T21@T30@@T52@P80@P90', 'new_bool': 0, 'search_text': '', 'ins_lat': '', 'ins_lng': '', 'in_distance': 0, 'out_distance': '26.75', 'all_search_cnt': -1, 'addr_search_cnt': -1, 'store_search_cnt': -1, 'rowCount': 30, 'store_nm': '', 'store_cd': 0, 's_biz_code': '3762', 'new_icon': 'N', 'set_user': '', 'favorites': 0, 'map_desc': None, 'notice': None, 'defaultimage': '/upload/store/2020/09/[3762]_20200917031519_6juwr.JPG', 'etcimage': None, 'in_biz_cd': None, 'in_store_cd': None, 'in_favorites': None, 'in_user_id': None, 'in_biz_cds': 0, 'in_biz_arr': None, 'in_biz_arrdata': None, 'in_scodes': 0, 'in_scode_arr': None, 'in_scode_arrdata': None, 'disp': None, 'set_date': None, 'hlytag': None, 'hlytag_msg': None, 'vSal': '', 'istart': 1, 'iend': 60, 'open_dt': '20190613', 'gold_card': 0, 'ip_lat': '', 'ip_long': '', 'espresso': '', 'new_store': '', 'premiere_food': '', 'doro_address': '서울특별시 강남구 언주로 425 (역삼동)', 'cold_blew': '', 'my_siren_order_store_yn': 'N', 'whcroad_yn': 'WHCROAD', 'skuNo': '', 'skuName': '', 'skuImgUrl': '', 'stock_count': 0, 'store_area_name': None, 'store_area_code': 'A01', 'is_open': None, 'gift_stock_yn': None, 'lat': '37.501087', 'lot': '127.043069', 't20': 0, 't04': 0, 't03': 0, 't01': 0, 't12': 0, 't09': 0, 't06': 0, 't10': 0, 'p10': 0, 'p50': 0, 'p20': 0, 'p60': 0, 'p30': 0, 'p70': 0, 'p40': 0, 'p80': 0, 't22': 0, 't21': 0, 'p90': 0, 't05': 0, 't30': 0, 't36': 0, 't27': 0, 't29': 0, 't43': 0, 't48': 0}
    


```python
# 작업에 필요한 칼럼 및 가지를 선택해서 지도에 마커를
# 표시할 때 사용할 데이터가 저장된 데이터프레임을 만든다.
# s_name => 지점이름
# sido_code => 시도코드
# sido_name => 시도이름
# gugun_code => 구군코드
# gugun_name => 구군이름
# ,doro_address => 도로명주소
# lat => 위도
# lot => 경도

star_df_map = star_df[['s_name','sido_code','sido_name','gugun_code',
                        'gugun_name','doro_address','lat','lot']]
star_df_map.head()
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
      <th>s_name</th>
      <th>sido_code</th>
      <th>sido_name</th>
      <th>gugun_code</th>
      <th>gugun_name</th>
      <th>doro_address</th>
      <th>lat</th>
      <th>lot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>역삼아레나빌딩</td>
      <td>01</td>
      <td>서울</td>
      <td>0101</td>
      <td>강남구</td>
      <td>서울특별시 강남구 언주로 425 (역삼동)</td>
      <td>37.501087</td>
      <td>127.043069</td>
    </tr>
    <tr>
      <th>1</th>
      <td>논현역사거리</td>
      <td>01</td>
      <td>서울</td>
      <td>0101</td>
      <td>강남구</td>
      <td>서울특별시 강남구 강남대로 538 (논현동)</td>
      <td>37.510178</td>
      <td>127.022223</td>
    </tr>
    <tr>
      <th>2</th>
      <td>신사역성일빌딩</td>
      <td>01</td>
      <td>서울</td>
      <td>0101</td>
      <td>강남구</td>
      <td>서울특별시 강남구 강남대로 584 (논현동)</td>
      <td>37.514132</td>
      <td>127.020563</td>
    </tr>
    <tr>
      <th>3</th>
      <td>국기원사거리</td>
      <td>01</td>
      <td>서울</td>
      <td>0101</td>
      <td>강남구</td>
      <td>서울특별시 강남구 테헤란로 125 (역삼동)</td>
      <td>37.499517</td>
      <td>127.031495</td>
    </tr>
    <tr>
      <th>4</th>
      <td>대치재경빌딩R</td>
      <td>01</td>
      <td>서울</td>
      <td>0101</td>
      <td>강남구</td>
      <td>서울특별시 강남구 남부순환로 2947 (대치동)</td>
      <td>37.494668</td>
      <td>127.062583</td>
    </tr>
  </tbody>
</table>
</div>




```python
star_df_map.dtypes
```




    s_name          object
    sido_code       object
    sido_name       object
    gugun_code      object
    gugun_name      object
    doro_address    object
    lat             object
    lot             object
    dtype: object




```python
star_df_map['lat'] = star_df_map['lat'].astype(float)
star_df_map['lot'] = star_df_map['lot'].astype(float)
star_df_map.dtypes
```




    s_name           object
    sido_code        object
    sido_name        object
    gugun_code       object
    gugun_name       object
    doro_address     object
    lat             float64
    lot             float64
    dtype: object




```python
#종각점 
star_df_map[star_df_map['s_name']=='종각']
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
      <th>s_name</th>
      <th>sido_code</th>
      <th>sido_name</th>
      <th>gugun_code</th>
      <th>gugun_name</th>
      <th>doro_address</th>
      <th>lat</th>
      <th>lot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>431</th>
      <td>종각</td>
      <td>01</td>
      <td>서울</td>
      <td>0118</td>
      <td>종로구</td>
      <td>서울특별시 종로구 종로 64 (종로2가)</td>
      <td>37.569918</td>
      <td>126.984528</td>
    </tr>
  </tbody>
</table>
</div>




```python
#종로관철점
star_df_map[star_df_map['s_name']=='종로관철']
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
      <th>s_name</th>
      <th>sido_code</th>
      <th>sido_name</th>
      <th>gugun_code</th>
      <th>gugun_name</th>
      <th>doro_address</th>
      <th>lat</th>
      <th>lot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>433</th>
      <td>종로관철</td>
      <td>01</td>
      <td>서울</td>
      <td>0118</td>
      <td>종로구</td>
      <td>서울특별시 종로구 종로12길 21, 2층 (관철동)</td>
      <td>37.569058</td>
      <td>126.986013</td>
    </tr>
  </tbody>
</table>
</div>




```python
# folium 모듈의 Map()함수로 location 속성으로 지정한
# 위치를 중심으로 하는 zoom_start옵션으로 지정한
# 배율을 가지는 지도를 만든다.
star_map = folium.Map(location=[37.56996875550683, 126.98374888362954], zoom_start=18)

# folium 모듈의 Marker()함수로 location 속성으로 지정한
# 위치에 마커를 만들고 addto()함수로 지도에 추가한다.
# folium 모듈의 Popup()함수로 마커를 클릭했을 때 
# 표시할 팝업 메시지와 max_width속성으로 팝업메시지
# 표시되는 창의 최대 크기를 지정할 수 있다.
popup = folium.Popup('종각점', max_width=200)
folium.Marker(location=[37.56996875550683, 126.98374888362954], 
              popup=popup).add_to(star_map)

popup = folium.Popup('종로 관철점점', max_width=200)
folium.Marker(location=[37.56919236504892, 126.98600579712074], 
              popup=popup).add_to(star_map)
star_map.save('./output/star1.html')
star_map
```


```python
# 서울특별시에 위치한 스타벅스 전 지점의 위치를 지도위에
# 표시한다.

# 지도를 작성할 때 지도의 중심으로 설정할 위치가 애매할 경우
# 지도위에 표시할 모든 스타벅스의 위도,경도위치의 평균을 
# 중심으로 하는 지도를 만들면 된다.
star_map = folium.Map(location=[star_df_map['lat'].mean(),
                      star_df_map['lot'].mean()], 
                      zoom_start=18)

# iterrows() 함수는 데이터프레임에 저장된 데이터의 인덱스와
# 그 인덱스에 해당되는 데이터를 얻어온다.
for index, data in star_df_map.iterrows():
    popup = folium.Popup(data['s_name'] + '점, 주소 : ' +data['doro_address'], max_width=300)
    folium.Marker(location=[data['lat'], data['lot']], popup=popup).add_to(star_map)
star_map.save('./output/star2.html')
star_map
```


```python
# 강남구 스타벅스 전 지점
targetSite = 'https://www.starbucks.co.kr/store/getStore.do?r=V412YZ6GQ3'
request = requests.post(targetSite, data={ 
    'ins_lat' : 37.2700715, # 위도
    'ins_lng': 127.1273485, # 경도
    'p_sido_cd' : '01', #시도코드
    'p_gugun_cd': '', #구군코드
    'in_biz_cd': '', #?
    'iend' : 1600, #서버가 응답하는 최대 매장의 개수
    'set_date' : '' #?
    })
storeList = request.json()
star_df = json_normalize(storeList, 'list')
star_df_map = star_df[['s_name','sido_code','sido_name','gugun_code',
                        'gugun_name','doro_address','lat','lot']]
star_df_map['lat'] = star_df_map['lat'].astype(float)
star_df_map['lot'] = star_df_map['lot'].astype(float)

star_map = folium.Map(location=[star_df_map['lat'].mean(),
                      star_df_map['lot'].mean()], 
                      zoom_start=12)
for index, data in star_df_map.iterrows():
    popup = folium.Popup(data['s_name'] + '점, 주소 : ' +data['doro_address'], max_width=300)
    folium.Marker(location=[data['lat'], data['lot']], popup=popup).add_to(star_map)
star_map.save('./output/star3.html')
star_map
```
