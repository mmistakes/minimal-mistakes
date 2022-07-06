---
layout: single
title:  "19_Data_Analysis_2"
categories : python
tag : [review]
search: true #false로 주면 검색해도 안나온다.
---

```python
import warnings
warnings.filterwarnings('ignore')
from IPython.display import Image
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
plt.rcParams['font.family'] = 'NanumGothicCoding'
plt.rcParams['font.size'] = 15
import matplotlib as mpl
mpl.rcParams['axes.unicode_minus'] = False
import seaborn as sns
from plotnine import *
import missingno as msno
```

공공 데이터 상권 정보 분석하기 => https://www.data.go.kr/dataset/15012005/fileData.do


```python
# read_csv() 함수의 encoding 속성의 기본값은 utf-8 이다. utf-8로 읽어오지 못한다면 encoding 속성을 euc-kr, ms949, cp949로
# 변경해서 실행한다.
shop = pd.read_csv('./data/shop_2016.csv', encoding='euc-kr')
shop
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
      <th>상권명칭</th>
      <th>상권번호</th>
      <th>관리년월</th>
      <th>대분류명</th>
      <th>중분류명</th>
      <th>과밀지수(밀집도)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>강릉역광장_2</td>
      <td>2523</td>
      <td>201601</td>
      <td>소매</td>
      <td>가전제품소매</td>
      <td>1.0818</td>
    </tr>
    <tr>
      <th>1</th>
      <td>구미역_3</td>
      <td>1149</td>
      <td>201601</td>
      <td>소매</td>
      <td>가전제품소매</td>
      <td>0.8865</td>
    </tr>
    <tr>
      <th>2</th>
      <td>전북 전주시 중화산1동_1</td>
      <td>768</td>
      <td>201601</td>
      <td>소매</td>
      <td>가전제품소매</td>
      <td>1.1757</td>
    </tr>
    <tr>
      <th>3</th>
      <td>충청북도청_2</td>
      <td>1309</td>
      <td>201601</td>
      <td>소매</td>
      <td>가전제품소매</td>
      <td>0.3574</td>
    </tr>
    <tr>
      <th>4</th>
      <td>충북 청주시 복대1동_1</td>
      <td>1311</td>
      <td>201601</td>
      <td>소매</td>
      <td>가전제품소매</td>
      <td>0.6849</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>805676</th>
      <td>경남 양산시 덕계동_1</td>
      <td>626</td>
      <td>201612</td>
      <td>소매</td>
      <td>NaN</td>
      <td>1.2906</td>
    </tr>
    <tr>
      <th>805677</th>
      <td>경북 구미시 신평1동_2</td>
      <td>1143</td>
      <td>201612</td>
      <td>업종분류불능</td>
      <td>NaN</td>
      <td>0.5677</td>
    </tr>
    <tr>
      <th>805678</th>
      <td>안양역_5</td>
      <td>1663</td>
      <td>201612</td>
      <td>소매</td>
      <td>NaN</td>
      <td>1.6597</td>
    </tr>
    <tr>
      <th>805679</th>
      <td>양산역</td>
      <td>616</td>
      <td>201612</td>
      <td>소매</td>
      <td>NaN</td>
      <td>1.4103</td>
    </tr>
    <tr>
      <th>805680</th>
      <td>망포역_2</td>
      <td>1473</td>
      <td>201612</td>
      <td>업종분류불능</td>
      <td>NaN</td>
      <td>0.7113</td>
    </tr>
  </tbody>
</table>
<p>805681 rows × 6 columns</p>

</div>


```python
shop_201806 = pd.read_csv('./data/shop_201806_01.csv', encoding='euc-kr')
shop_201806.shape
```


    (499328, 39)


```python
shop_201806.head()
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
      <th>상가업소번호</th>
      <th>상호명</th>
      <th>지점명</th>
      <th>상권업종대분류코드</th>
      <th>상권업종대분류명</th>
      <th>상권업종중분류코드</th>
      <th>상권업종중분류명</th>
      <th>상권업종소분류코드</th>
      <th>상권업종소분류명</th>
      <th>표준산업분류코드</th>
      <th>...</th>
      <th>건물관리번호</th>
      <th>건물명</th>
      <th>도로명주소</th>
      <th>구우편번호</th>
      <th>신우편번호</th>
      <th>동정보</th>
      <th>층정보</th>
      <th>호정보</th>
      <th>경도</th>
      <th>위도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>19905471</td>
      <td>와라와라호프</td>
      <td>NaN</td>
      <td>Q</td>
      <td>음식</td>
      <td>Q09</td>
      <td>유흥주점</td>
      <td>Q09A01</td>
      <td>호프/맥주</td>
      <td>I56219</td>
      <td>...</td>
      <td>1168010600106040000014378</td>
      <td>대치상가</td>
      <td>서울특별시 강남구 남부순환로 2933</td>
      <td>135280</td>
      <td>6280.0</td>
      <td>NaN</td>
      <td>1</td>
      <td>NaN</td>
      <td>127.061026</td>
      <td>37.493922</td>
    </tr>
    <tr>
      <th>1</th>
      <td>19911397</td>
      <td>커피빈코리아선릉로93길점</td>
      <td>코리아선릉로93길점</td>
      <td>Q</td>
      <td>음식</td>
      <td>Q12</td>
      <td>커피점/카페</td>
      <td>Q12A01</td>
      <td>커피전문점/카페/다방</td>
      <td>I56220</td>
      <td>...</td>
      <td>1168010100106960042022041</td>
      <td>NaN</td>
      <td>서울특별시 강남구 선릉로93길 6</td>
      <td>135080</td>
      <td>6149.0</td>
      <td>NaN</td>
      <td>1</td>
      <td>NaN</td>
      <td>127.047883</td>
      <td>37.505675</td>
    </tr>
    <tr>
      <th>2</th>
      <td>19911801</td>
      <td>프로포즈</td>
      <td>NaN</td>
      <td>Q</td>
      <td>음식</td>
      <td>Q09</td>
      <td>유흥주점</td>
      <td>Q09A01</td>
      <td>호프/맥주</td>
      <td>I56219</td>
      <td>...</td>
      <td>1154510200101620001017748</td>
      <td>NaN</td>
      <td>서울특별시 금천구 가산로 34-6</td>
      <td>153010</td>
      <td>8545.0</td>
      <td>NaN</td>
      <td>1</td>
      <td>NaN</td>
      <td>126.899220</td>
      <td>37.471711</td>
    </tr>
    <tr>
      <th>3</th>
      <td>19912201</td>
      <td>싱싱커피&amp;토스트</td>
      <td>NaN</td>
      <td>Q</td>
      <td>음식</td>
      <td>Q07</td>
      <td>패스트푸드</td>
      <td>Q07A10</td>
      <td>토스트전문</td>
      <td>I56192</td>
      <td>...</td>
      <td>2653010400105780000002037</td>
      <td>산업용품유통상가</td>
      <td>부산광역시 사상구 괘감로 37</td>
      <td>617726</td>
      <td>46977.0</td>
      <td>NaN</td>
      <td>1</td>
      <td>26</td>
      <td>128.980455</td>
      <td>35.159774</td>
    </tr>
    <tr>
      <th>4</th>
      <td>19932756</td>
      <td>가락사우나내스낵</td>
      <td>NaN</td>
      <td>F</td>
      <td>생활서비스</td>
      <td>F09</td>
      <td>대중목욕탕/휴게</td>
      <td>F09A02</td>
      <td>사우나/증기탕/온천</td>
      <td>S96121</td>
      <td>...</td>
      <td>1171010500102560005010490</td>
      <td>NaN</td>
      <td>서울특별시 송파구 가락로 71</td>
      <td>138846</td>
      <td>5690.0</td>
      <td>NaN</td>
      <td>1</td>
      <td>NaN</td>
      <td>127.104071</td>
      <td>37.500249</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 39 columns</p>

</div>


```python
shop_201806.columns
```


    Index(['상가업소번호', '상호명', '지점명', '상권업종대분류코드', '상권업종대분류명', '상권업종중분류코드',
           '상권업종중분류명', '상권업종소분류코드', '상권업종소분류명', '표준산업분류코드', '표준산업분류명', '시도코드',
           '시도명', '시군구코드', '시군구명', '행정동코드', '행정동명', '법정동코드', '법정동명', '지번코드',
           '대지구분코드', '대지구분명', '지번본번지', '지번부번지', '지번주소', '도로명코드', '도로명', '건물본번지',
           '건물부번지', '건물관리번호', '건물명', '도로명주소', '구우편번호', '신우편번호', '동정보', '층정보',
           '호정보', '경도', '위도'],
          dtype='object')


```python
# 분석 작업에 사용할 column만 추려낸다.
view_columns = ['상호명', '지점명', '상권업종대분류명', '상권업종중분류명', '상권업종소분류명', '시도명', '시군구명', 
                '행정동명', '법정동명', '지번주소', '도로명주소', '경도', '위도']
shop_2018_06 = shop_201806[view_columns]
shop_2018_06
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
      <th>상호명</th>
      <th>지점명</th>
      <th>상권업종대분류명</th>
      <th>상권업종중분류명</th>
      <th>상권업종소분류명</th>
      <th>시도명</th>
      <th>시군구명</th>
      <th>행정동명</th>
      <th>법정동명</th>
      <th>지번주소</th>
      <th>도로명주소</th>
      <th>경도</th>
      <th>위도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>와라와라호프</td>
      <td>NaN</td>
      <td>음식</td>
      <td>유흥주점</td>
      <td>호프/맥주</td>
      <td>서울특별시</td>
      <td>강남구</td>
      <td>대치1동</td>
      <td>대치동</td>
      <td>서울특별시 강남구 대치동 604</td>
      <td>서울특별시 강남구 남부순환로 2933</td>
      <td>127.061026</td>
      <td>37.493922</td>
    </tr>
    <tr>
      <th>1</th>
      <td>커피빈코리아선릉로93길점</td>
      <td>코리아선릉로93길점</td>
      <td>음식</td>
      <td>커피점/카페</td>
      <td>커피전문점/카페/다방</td>
      <td>서울특별시</td>
      <td>강남구</td>
      <td>역삼1동</td>
      <td>역삼동</td>
      <td>서울특별시 강남구 역삼동 696-42</td>
      <td>서울특별시 강남구 선릉로93길 6</td>
      <td>127.047883</td>
      <td>37.505675</td>
    </tr>
    <tr>
      <th>2</th>
      <td>프로포즈</td>
      <td>NaN</td>
      <td>음식</td>
      <td>유흥주점</td>
      <td>호프/맥주</td>
      <td>서울특별시</td>
      <td>금천구</td>
      <td>독산3동</td>
      <td>독산동</td>
      <td>서울특별시 금천구 독산동 162-1</td>
      <td>서울특별시 금천구 가산로 34-6</td>
      <td>126.899220</td>
      <td>37.471711</td>
    </tr>
    <tr>
      <th>3</th>
      <td>싱싱커피&amp;토스트</td>
      <td>NaN</td>
      <td>음식</td>
      <td>패스트푸드</td>
      <td>토스트전문</td>
      <td>부산광역시</td>
      <td>사상구</td>
      <td>괘법동</td>
      <td>괘법동</td>
      <td>부산광역시 사상구 괘법동 578</td>
      <td>부산광역시 사상구 괘감로 37</td>
      <td>128.980455</td>
      <td>35.159774</td>
    </tr>
    <tr>
      <th>4</th>
      <td>가락사우나내스낵</td>
      <td>NaN</td>
      <td>생활서비스</td>
      <td>대중목욕탕/휴게</td>
      <td>사우나/증기탕/온천</td>
      <td>서울특별시</td>
      <td>송파구</td>
      <td>석촌동</td>
      <td>석촌동</td>
      <td>서울특별시 송파구 석촌동 256</td>
      <td>서울특별시 송파구 가락로 71</td>
      <td>127.104071</td>
      <td>37.500249</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>499323</th>
      <td>배스킨라빈스31</td>
      <td>건대스타시티점</td>
      <td>음식</td>
      <td>패스트푸드</td>
      <td>아이스크림판매</td>
      <td>서울특별시</td>
      <td>광진구</td>
      <td>자양3동</td>
      <td>자양동</td>
      <td>서울특별시 광진구 자양동 227-7</td>
      <td>서울특별시 광진구 아차산로 262</td>
      <td>127.072944</td>
      <td>37.536997</td>
    </tr>
    <tr>
      <th>499324</th>
      <td>본도시락</td>
      <td>본설렁탕</td>
      <td>음식</td>
      <td>한식</td>
      <td>설렁탕집</td>
      <td>서울특별시</td>
      <td>강동구</td>
      <td>강일동</td>
      <td>상일동</td>
      <td>서울특별시 강동구 상일동 502</td>
      <td>서울특별시 강동구 상일로6길 39</td>
      <td>127.175331</td>
      <td>37.549794</td>
    </tr>
    <tr>
      <th>499325</th>
      <td>체크페이먼트</td>
      <td>NaN</td>
      <td>음식</td>
      <td>커피점/카페</td>
      <td>커피전문점/카페/다방</td>
      <td>서울특별시</td>
      <td>강남구</td>
      <td>대치4동</td>
      <td>대치동</td>
      <td>서울특별시 강남구 대치동 905</td>
      <td>서울특별시 강남구 역삼로69길 10</td>
      <td>127.054001</td>
      <td>37.502210</td>
    </tr>
    <tr>
      <th>499326</th>
      <td>마젠타네일</td>
      <td>NaN</td>
      <td>생활서비스</td>
      <td>이/미용/건강</td>
      <td>발/네일케어</td>
      <td>서울특별시</td>
      <td>마포구</td>
      <td>아현동</td>
      <td>공덕동</td>
      <td>서울특별시 마포구 공덕동 463</td>
      <td>서울특별시 마포구 마포대로 173</td>
      <td>126.954442</td>
      <td>37.549892</td>
    </tr>
    <tr>
      <th>499327</th>
      <td>GS25</td>
      <td>역촌대로점</td>
      <td>소매</td>
      <td>종합소매점</td>
      <td>편의점</td>
      <td>서울특별시</td>
      <td>은평구</td>
      <td>역촌동</td>
      <td>역촌동</td>
      <td>서울특별시 은평구 역촌동 9-7</td>
      <td>서울특별시 은평구 연서로 92</td>
      <td>126.915538</td>
      <td>37.607334</td>
    </tr>
  </tbody>
</table>
<p>499328 rows × 13 columns</p>

</div>


```python
shop_201806.isnull().sum()
```


    상가업소번호            0
    상호명               1
    지점명          432587
    상권업종대분류코드         0
    상권업종대분류명          0
    상권업종중분류코드         0
    상권업종중분류명          0
    상권업종소분류코드         0
    상권업종소분류명          0
    표준산업분류코드      28731
    표준산업분류명       28731
    시도코드              0
    시도명               0
    시군구코드             0
    시군구명              0
    행정동코드             0
    행정동명              0
    법정동코드             0
    법정동명              0
    지번코드              0
    대지구분코드            0
    대지구분명             0
    지번본번지             0
    지번부번지         86552
    지번주소              0
    도로명코드             0
    도로명               0
    건물본번지             0
    건물부번지        434501
    건물관리번호            0
    건물명          274150
    도로명주소             0
    구우편번호             0
    신우편번호             9
    동정보          455420
    층정보          191133
    호정보          427356
    경도                0
    위도                0
    dtype: int64


```python
msno.matrix(shop_201806)
```


    <AxesSubplot:>


![output_8_1](../../images/2022-06-28-19_Data_Analysis_2/output_8_1.png){: width="100%" height="100%"}

```python
msno.matrix(shop_2018_06)
```


    <AxesSubplot:>


![output_9_1](../../images/2022-06-28-19_Data_Analysis_2/output_9_1.png){: width="100%" height="100%"}

```python
ggplot(shop_2018_06, aes(x='경도', y='위도')) \
    + geom_point() \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[7, 10])
```


![output_10_0](../../images/2022-06-28-19_Data_Analysis_2/output_10_0.png){: width="100%" height="100%"}

    <ggplot: (-9223371889610062213)>


```python
shop_2018_06.plot.scatter(x='경도', y='위도', grid=True, figsize=[7, 10])
```


    <AxesSubplot:xlabel='경도', ylabel='위도'>


![output_11_1](../../images/2022-06-28-19_Data_Analysis_2/output_11_1.png){: width="100%" height="100%"}

```python
# 데이터를 시각화 시켜보니 서울과 부산만 있는것 같다. 그래서 서울과 그 이외의 데이터로 나눈다.
# shop_2018_06[shop_2018_06['시도명'] == '서울특별시'] # 시도명이 서울특별시인 데이터만 얻어온다.
# shop_2018_06[shop_2018_06['지번주소'].str.startswith('서울')] # 지번주소가 서울로 시작하는 데이터만 얻어온다.
shop_seoul = shop_2018_06[shop_2018_06['도로명주소'].str.startswith('서울')] # 도로명주소가 서울로 시작하는 데이터만 얻어온다.
shop_seoul
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
      <th>상호명</th>
      <th>지점명</th>
      <th>상권업종대분류명</th>
      <th>상권업종중분류명</th>
      <th>상권업종소분류명</th>
      <th>시도명</th>
      <th>시군구명</th>
      <th>행정동명</th>
      <th>법정동명</th>
      <th>지번주소</th>
      <th>도로명주소</th>
      <th>경도</th>
      <th>위도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>와라와라호프</td>
      <td>NaN</td>
      <td>음식</td>
      <td>유흥주점</td>
      <td>호프/맥주</td>
      <td>서울특별시</td>
      <td>강남구</td>
      <td>대치1동</td>
      <td>대치동</td>
      <td>서울특별시 강남구 대치동 604</td>
      <td>서울특별시 강남구 남부순환로 2933</td>
      <td>127.061026</td>
      <td>37.493922</td>
    </tr>
    <tr>
      <th>1</th>
      <td>커피빈코리아선릉로93길점</td>
      <td>코리아선릉로93길점</td>
      <td>음식</td>
      <td>커피점/카페</td>
      <td>커피전문점/카페/다방</td>
      <td>서울특별시</td>
      <td>강남구</td>
      <td>역삼1동</td>
      <td>역삼동</td>
      <td>서울특별시 강남구 역삼동 696-42</td>
      <td>서울특별시 강남구 선릉로93길 6</td>
      <td>127.047883</td>
      <td>37.505675</td>
    </tr>
    <tr>
      <th>2</th>
      <td>프로포즈</td>
      <td>NaN</td>
      <td>음식</td>
      <td>유흥주점</td>
      <td>호프/맥주</td>
      <td>서울특별시</td>
      <td>금천구</td>
      <td>독산3동</td>
      <td>독산동</td>
      <td>서울특별시 금천구 독산동 162-1</td>
      <td>서울특별시 금천구 가산로 34-6</td>
      <td>126.899220</td>
      <td>37.471711</td>
    </tr>
    <tr>
      <th>4</th>
      <td>가락사우나내스낵</td>
      <td>NaN</td>
      <td>생활서비스</td>
      <td>대중목욕탕/휴게</td>
      <td>사우나/증기탕/온천</td>
      <td>서울특별시</td>
      <td>송파구</td>
      <td>석촌동</td>
      <td>석촌동</td>
      <td>서울특별시 송파구 석촌동 256</td>
      <td>서울특별시 송파구 가락로 71</td>
      <td>127.104071</td>
      <td>37.500249</td>
    </tr>
    <tr>
      <th>5</th>
      <td>허술한집</td>
      <td>NaN</td>
      <td>음식</td>
      <td>분식</td>
      <td>라면김밥분식</td>
      <td>서울특별시</td>
      <td>강서구</td>
      <td>공항동</td>
      <td>공항동</td>
      <td>서울특별시 강서구 공항동 45-89</td>
      <td>서울특별시 강서구 공항대로3길 9</td>
      <td>126.809957</td>
      <td>37.562013</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>499323</th>
      <td>배스킨라빈스31</td>
      <td>건대스타시티점</td>
      <td>음식</td>
      <td>패스트푸드</td>
      <td>아이스크림판매</td>
      <td>서울특별시</td>
      <td>광진구</td>
      <td>자양3동</td>
      <td>자양동</td>
      <td>서울특별시 광진구 자양동 227-7</td>
      <td>서울특별시 광진구 아차산로 262</td>
      <td>127.072944</td>
      <td>37.536997</td>
    </tr>
    <tr>
      <th>499324</th>
      <td>본도시락</td>
      <td>본설렁탕</td>
      <td>음식</td>
      <td>한식</td>
      <td>설렁탕집</td>
      <td>서울특별시</td>
      <td>강동구</td>
      <td>강일동</td>
      <td>상일동</td>
      <td>서울특별시 강동구 상일동 502</td>
      <td>서울특별시 강동구 상일로6길 39</td>
      <td>127.175331</td>
      <td>37.549794</td>
    </tr>
    <tr>
      <th>499325</th>
      <td>체크페이먼트</td>
      <td>NaN</td>
      <td>음식</td>
      <td>커피점/카페</td>
      <td>커피전문점/카페/다방</td>
      <td>서울특별시</td>
      <td>강남구</td>
      <td>대치4동</td>
      <td>대치동</td>
      <td>서울특별시 강남구 대치동 905</td>
      <td>서울특별시 강남구 역삼로69길 10</td>
      <td>127.054001</td>
      <td>37.502210</td>
    </tr>
    <tr>
      <th>499326</th>
      <td>마젠타네일</td>
      <td>NaN</td>
      <td>생활서비스</td>
      <td>이/미용/건강</td>
      <td>발/네일케어</td>
      <td>서울특별시</td>
      <td>마포구</td>
      <td>아현동</td>
      <td>공덕동</td>
      <td>서울특별시 마포구 공덕동 463</td>
      <td>서울특별시 마포구 마포대로 173</td>
      <td>126.954442</td>
      <td>37.549892</td>
    </tr>
    <tr>
      <th>499327</th>
      <td>GS25</td>
      <td>역촌대로점</td>
      <td>소매</td>
      <td>종합소매점</td>
      <td>편의점</td>
      <td>서울특별시</td>
      <td>은평구</td>
      <td>역촌동</td>
      <td>역촌동</td>
      <td>서울특별시 은평구 역촌동 9-7</td>
      <td>서울특별시 은평구 연서로 92</td>
      <td>126.915538</td>
      <td>37.607334</td>
    </tr>
  </tbody>
</table>
<p>345268 rows × 13 columns</p>

</div>


```python
# '~'는 ~가 아니것을 의미한다.
shop_except_seoul = shop_2018_06[~shop_2018_06['도로명주소'].str.startswith('서울')]
shop_except_seoul
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
      <th>상호명</th>
      <th>지점명</th>
      <th>상권업종대분류명</th>
      <th>상권업종중분류명</th>
      <th>상권업종소분류명</th>
      <th>시도명</th>
      <th>시군구명</th>
      <th>행정동명</th>
      <th>법정동명</th>
      <th>지번주소</th>
      <th>도로명주소</th>
      <th>경도</th>
      <th>위도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>3</th>
      <td>싱싱커피&amp;토스트</td>
      <td>NaN</td>
      <td>음식</td>
      <td>패스트푸드</td>
      <td>토스트전문</td>
      <td>부산광역시</td>
      <td>사상구</td>
      <td>괘법동</td>
      <td>괘법동</td>
      <td>부산광역시 사상구 괘법동 578</td>
      <td>부산광역시 사상구 괘감로 37</td>
      <td>128.980455</td>
      <td>35.159774</td>
    </tr>
    <tr>
      <th>22</th>
      <td>경부할인마트</td>
      <td>NaN</td>
      <td>소매</td>
      <td>종합소매점</td>
      <td>종합소매</td>
      <td>부산광역시</td>
      <td>동구</td>
      <td>초량6동</td>
      <td>초량동</td>
      <td>부산광역시 동구 초량동 794-681</td>
      <td>부산광역시 동구 망양로 593</td>
      <td>129.034599</td>
      <td>35.123196</td>
    </tr>
    <tr>
      <th>23</th>
      <td>마니쩜</td>
      <td>NaN</td>
      <td>음식</td>
      <td>유흥주점</td>
      <td>호프/맥주</td>
      <td>부산광역시</td>
      <td>부산진구</td>
      <td>가야1동</td>
      <td>가야동</td>
      <td>부산광역시 부산진구 가야동 450-2</td>
      <td>부산광역시 부산진구 대학로 64-1</td>
      <td>129.034302</td>
      <td>35.150069</td>
    </tr>
    <tr>
      <th>24</th>
      <td>경주아구찜</td>
      <td>NaN</td>
      <td>음식</td>
      <td>일식/수산물</td>
      <td>아구전문</td>
      <td>부산광역시</td>
      <td>수영구</td>
      <td>남천1동</td>
      <td>남천동</td>
      <td>부산광역시 수영구 남천동 357-10</td>
      <td>부산광역시 수영구 수영로 381-8</td>
      <td>129.106330</td>
      <td>35.141176</td>
    </tr>
    <tr>
      <th>30</th>
      <td>동해제일산오징어</td>
      <td>NaN</td>
      <td>음식</td>
      <td>일식/수산물</td>
      <td>낙지/오징어</td>
      <td>부산광역시</td>
      <td>동래구</td>
      <td>온천3동</td>
      <td>온천동</td>
      <td>부산광역시 동래구 온천동 1380-2</td>
      <td>부산광역시 동래구 아시아드대로220번길 30</td>
      <td>129.068324</td>
      <td>35.202902</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>499305</th>
      <td>보라헤어</td>
      <td>NaN</td>
      <td>생활서비스</td>
      <td>이/미용/건강</td>
      <td>여성미용실</td>
      <td>부산광역시</td>
      <td>사상구</td>
      <td>주례2동</td>
      <td>주례동</td>
      <td>부산광역시 사상구 주례동 3-16</td>
      <td>부산광역시 사상구 백양대로342번길 22</td>
      <td>129.014460</td>
      <td>35.154509</td>
    </tr>
    <tr>
      <th>499310</th>
      <td>호텔엘레펀트</td>
      <td>NaN</td>
      <td>숙박</td>
      <td>모텔/여관/여인숙</td>
      <td>모텔/여관/여인숙</td>
      <td>부산광역시</td>
      <td>부산진구</td>
      <td>부전2동</td>
      <td>부전동</td>
      <td>부산광역시 부산진구 부전동 519-36</td>
      <td>부산광역시 부산진구 중앙대로691번가길 24-12</td>
      <td>129.056079</td>
      <td>35.155344</td>
    </tr>
    <tr>
      <th>499311</th>
      <td>포항물회</td>
      <td>7.7</td>
      <td>음식</td>
      <td>일식/수산물</td>
      <td>횟집</td>
      <td>부산광역시</td>
      <td>영도구</td>
      <td>남항동</td>
      <td>대교동1가</td>
      <td>부산광역시 영도구 대교동1가 106-7</td>
      <td>부산광역시 영도구 절영로36번길 14-1</td>
      <td>129.038401</td>
      <td>35.091686</td>
    </tr>
    <tr>
      <th>499318</th>
      <td>참누리</td>
      <td>NaN</td>
      <td>생활서비스</td>
      <td>세탁/가사서비스</td>
      <td>청소/소독</td>
      <td>부산광역시</td>
      <td>해운대구</td>
      <td>좌3동</td>
      <td>좌동</td>
      <td>부산광역시 해운대구 좌동 1375</td>
      <td>부산광역시 해운대구 좌동순환로99번길 22</td>
      <td>129.166905</td>
      <td>35.177375</td>
    </tr>
    <tr>
      <th>499321</th>
      <td>봉수아피자</td>
      <td>연산동점</td>
      <td>음식</td>
      <td>패스트푸드</td>
      <td>피자전문</td>
      <td>부산광역시</td>
      <td>연제구</td>
      <td>연산8동</td>
      <td>연산동</td>
      <td>부산광역시 연제구 연산동 339-14</td>
      <td>부산광역시 연제구 연동로 21</td>
      <td>129.093382</td>
      <td>35.187174</td>
    </tr>
  </tbody>
</table>
<p>154060 rows × 13 columns</p>

</div>


```python
ggplot(shop_seoul, aes(x='경도', y='위도')) \
    + geom_point(size=0.2, alpha=0.2) \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 7])
```


![output_14_0](../../images/2022-06-28-19_Data_Analysis_2/output_14_0.png){: width="100%" height="100%"}

    <ggplot: (147438564528)>


```python
#scatter에서 s는 점의 크기를 나타낸다.
shop_seoul.plot.scatter(x='경도', y='위도', grid=True, figsize=[10, 7], s=2)
```


    <AxesSubplot:xlabel='경도', ylabel='위도'>


![output_15_1](../../images/2022-06-28-19_Data_Analysis_2/output_15_1.png){: width="100%" height="100%"}

```python
# 데이터프레임의 도로명주소를 활용해서 '시도', '구군' 열을 만든다.
# split() 함수에 expand=True 옵션을 지정해서 구분자를 경계로 문자열을 서로 다른 열(데이터프레임)으로 구분해서 '시도' 열과
# '구군' 열을 만든다.
# print(type(shop_seoul[:1]['도로명주소'].str.split(' ', expand=True)))
# print(shop_seoul[:1]['도로명주소'].str.split(' ', expand=True)[0]) # 시도
# print(shop_seoul[:1]['도로명주소'].str.split(' ', expand=True)[1]) # 구군
# print(shop_seoul[:1]['도로명주소'].str.split(' ', expand=True)[2])

shop_2018_06['시도'] = shop_seoul['도로명주소'].str.split(' ', expand=True)[0]
shop_2018_06['구군'] = shop_seoul['도로명주소'].str.split(' ', expand=True)[1]
shop_2018_06.columns
```


    Index(['상호명', '지점명', '상권업종대분류명', '상권업종중분류명', '상권업종소분류명', '시도명', '시군구명', '행정동명',
           '법정동명', '지번주소', '도로명주소', '경도', '위도', '시도', '구군'],
          dtype='object')


```python
# '시도' 열과 '구군' 열이 추가된 원본 데이터프레임에서 서울만 추출해 다시 데이터프레임을 만들어준다.
shop_seoul = shop_2018_06[shop_2018_06['도로명주소'].str.startswith('서울')]
shop_seoul
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
      <th>상호명</th>
      <th>지점명</th>
      <th>상권업종대분류명</th>
      <th>상권업종중분류명</th>
      <th>상권업종소분류명</th>
      <th>시도명</th>
      <th>시군구명</th>
      <th>행정동명</th>
      <th>법정동명</th>
      <th>지번주소</th>
      <th>도로명주소</th>
      <th>경도</th>
      <th>위도</th>
      <th>시도</th>
      <th>구군</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>와라와라호프</td>
      <td>NaN</td>
      <td>음식</td>
      <td>유흥주점</td>
      <td>호프/맥주</td>
      <td>서울특별시</td>
      <td>강남구</td>
      <td>대치1동</td>
      <td>대치동</td>
      <td>서울특별시 강남구 대치동 604</td>
      <td>서울특별시 강남구 남부순환로 2933</td>
      <td>127.061026</td>
      <td>37.493922</td>
      <td>서울특별시</td>
      <td>강남구</td>
    </tr>
    <tr>
      <th>1</th>
      <td>커피빈코리아선릉로93길점</td>
      <td>코리아선릉로93길점</td>
      <td>음식</td>
      <td>커피점/카페</td>
      <td>커피전문점/카페/다방</td>
      <td>서울특별시</td>
      <td>강남구</td>
      <td>역삼1동</td>
      <td>역삼동</td>
      <td>서울특별시 강남구 역삼동 696-42</td>
      <td>서울특별시 강남구 선릉로93길 6</td>
      <td>127.047883</td>
      <td>37.505675</td>
      <td>서울특별시</td>
      <td>강남구</td>
    </tr>
    <tr>
      <th>2</th>
      <td>프로포즈</td>
      <td>NaN</td>
      <td>음식</td>
      <td>유흥주점</td>
      <td>호프/맥주</td>
      <td>서울특별시</td>
      <td>금천구</td>
      <td>독산3동</td>
      <td>독산동</td>
      <td>서울특별시 금천구 독산동 162-1</td>
      <td>서울특별시 금천구 가산로 34-6</td>
      <td>126.899220</td>
      <td>37.471711</td>
      <td>서울특별시</td>
      <td>금천구</td>
    </tr>
    <tr>
      <th>4</th>
      <td>가락사우나내스낵</td>
      <td>NaN</td>
      <td>생활서비스</td>
      <td>대중목욕탕/휴게</td>
      <td>사우나/증기탕/온천</td>
      <td>서울특별시</td>
      <td>송파구</td>
      <td>석촌동</td>
      <td>석촌동</td>
      <td>서울특별시 송파구 석촌동 256</td>
      <td>서울특별시 송파구 가락로 71</td>
      <td>127.104071</td>
      <td>37.500249</td>
      <td>서울특별시</td>
      <td>송파구</td>
    </tr>
    <tr>
      <th>5</th>
      <td>허술한집</td>
      <td>NaN</td>
      <td>음식</td>
      <td>분식</td>
      <td>라면김밥분식</td>
      <td>서울특별시</td>
      <td>강서구</td>
      <td>공항동</td>
      <td>공항동</td>
      <td>서울특별시 강서구 공항동 45-89</td>
      <td>서울특별시 강서구 공항대로3길 9</td>
      <td>126.809957</td>
      <td>37.562013</td>
      <td>서울특별시</td>
      <td>강서구</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>499323</th>
      <td>배스킨라빈스31</td>
      <td>건대스타시티점</td>
      <td>음식</td>
      <td>패스트푸드</td>
      <td>아이스크림판매</td>
      <td>서울특별시</td>
      <td>광진구</td>
      <td>자양3동</td>
      <td>자양동</td>
      <td>서울특별시 광진구 자양동 227-7</td>
      <td>서울특별시 광진구 아차산로 262</td>
      <td>127.072944</td>
      <td>37.536997</td>
      <td>서울특별시</td>
      <td>광진구</td>
    </tr>
    <tr>
      <th>499324</th>
      <td>본도시락</td>
      <td>본설렁탕</td>
      <td>음식</td>
      <td>한식</td>
      <td>설렁탕집</td>
      <td>서울특별시</td>
      <td>강동구</td>
      <td>강일동</td>
      <td>상일동</td>
      <td>서울특별시 강동구 상일동 502</td>
      <td>서울특별시 강동구 상일로6길 39</td>
      <td>127.175331</td>
      <td>37.549794</td>
      <td>서울특별시</td>
      <td>강동구</td>
    </tr>
    <tr>
      <th>499325</th>
      <td>체크페이먼트</td>
      <td>NaN</td>
      <td>음식</td>
      <td>커피점/카페</td>
      <td>커피전문점/카페/다방</td>
      <td>서울특별시</td>
      <td>강남구</td>
      <td>대치4동</td>
      <td>대치동</td>
      <td>서울특별시 강남구 대치동 905</td>
      <td>서울특별시 강남구 역삼로69길 10</td>
      <td>127.054001</td>
      <td>37.502210</td>
      <td>서울특별시</td>
      <td>강남구</td>
    </tr>
    <tr>
      <th>499326</th>
      <td>마젠타네일</td>
      <td>NaN</td>
      <td>생활서비스</td>
      <td>이/미용/건강</td>
      <td>발/네일케어</td>
      <td>서울특별시</td>
      <td>마포구</td>
      <td>아현동</td>
      <td>공덕동</td>
      <td>서울특별시 마포구 공덕동 463</td>
      <td>서울특별시 마포구 마포대로 173</td>
      <td>126.954442</td>
      <td>37.549892</td>
      <td>서울특별시</td>
      <td>마포구</td>
    </tr>
    <tr>
      <th>499327</th>
      <td>GS25</td>
      <td>역촌대로점</td>
      <td>소매</td>
      <td>종합소매점</td>
      <td>편의점</td>
      <td>서울특별시</td>
      <td>은평구</td>
      <td>역촌동</td>
      <td>역촌동</td>
      <td>서울특별시 은평구 역촌동 9-7</td>
      <td>서울특별시 은평구 연서로 92</td>
      <td>126.915538</td>
      <td>37.607334</td>
      <td>서울특별시</td>
      <td>은평구</td>
    </tr>
  </tbody>
</table>
<p>345268 rows × 15 columns</p>

</div>


```python
ggplot(shop_seoul, aes(x='경도', y='위도', color='구군')) \
    + geom_point(size=0.2, alpha=0.2) \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 7])
```


![output_18_0](../../images/2022-06-28-19_Data_Analysis_2/output_18_0.png){: width="100%" height="100%"}

    <ggplot: (-9223371889580377277)>


```python
# seaborn 라이브러리을 이용한 시각화
plt.figure(figsize=[16, 12])
sns.scatterplot(data=shop_seoul, x='경도', y='위도', hue='구군', s=5)
```


    <AxesSubplot:xlabel='경도', ylabel='위도'>


![output_19_1](../../images/2022-06-28-19_Data_Analysis_2/output_19_1.png){: width="100%" height="100%"}

```python
ggplot(shop_seoul, aes(x='경도', y='위도', color='상권업종대분류명')) \
    + geom_point(size=0.2, alpha=0.2) \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 7])
```


![output_20_0](../../images/2022-06-28-19_Data_Analysis_2/output_20_0.png){: width="100%" height="100%"}

    <ggplot: (-9223371889581271089)>


```python
plt.figure(figsize=[16, 12])
sns.scatterplot(data=shop_seoul, x='경도', y='위도', hue='상권업종대분류명', s=5)
```


    <AxesSubplot:xlabel='경도', ylabel='위도'>


![output_21_1](../../images/2022-06-28-19_Data_Analysis_2/output_21_1.png){: width="100%" height="100%"}

```python
# 상권업종대분류명이 '학문/교육'과 관련된 정보 보기
shop_seoul_edu = shop_seoul[shop_seoul['상권업종대분류명'] == '학문/교육']
shop_seoul_edu
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
      <th>상호명</th>
      <th>지점명</th>
      <th>상권업종대분류명</th>
      <th>상권업종중분류명</th>
      <th>상권업종소분류명</th>
      <th>시도명</th>
      <th>시군구명</th>
      <th>행정동명</th>
      <th>법정동명</th>
      <th>지번주소</th>
      <th>도로명주소</th>
      <th>경도</th>
      <th>위도</th>
      <th>시도</th>
      <th>구군</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>52</th>
      <td>안재형영어</td>
      <td>NaN</td>
      <td>학문/교육</td>
      <td>학원-어학</td>
      <td>학원-외국어/어학</td>
      <td>서울특별시</td>
      <td>양천구</td>
      <td>목5동</td>
      <td>목동</td>
      <td>서울특별시 양천구 목동 905-34</td>
      <td>서울특별시 양천구 목동서로 133-2</td>
      <td>126.875973</td>
      <td>37.531592</td>
      <td>서울특별시</td>
      <td>양천구</td>
    </tr>
    <tr>
      <th>67</th>
      <td>정아트</td>
      <td>NaN</td>
      <td>학문/교육</td>
      <td>학원-음악미술무용</td>
      <td>서예/서화/미술</td>
      <td>서울특별시</td>
      <td>강서구</td>
      <td>염창동</td>
      <td>염창동</td>
      <td>서울특별시 강서구 염창동 184-8</td>
      <td>서울특별시 강서구 양천로73가길 21</td>
      <td>126.873645</td>
      <td>37.550924</td>
      <td>서울특별시</td>
      <td>강서구</td>
    </tr>
    <tr>
      <th>86</th>
      <td>GIA보석교육원</td>
      <td>NaN</td>
      <td>학문/교육</td>
      <td>학원-자격/국가고시</td>
      <td>학원-보석감정</td>
      <td>서울특별시</td>
      <td>강남구</td>
      <td>압구정동</td>
      <td>신사동</td>
      <td>서울특별시 강남구 신사동 639-3</td>
      <td>서울특별시 강남구 압구정로 320</td>
      <td>127.036437</td>
      <td>37.528532</td>
      <td>서울특별시</td>
      <td>강남구</td>
    </tr>
    <tr>
      <th>120</th>
      <td>경찰태권도</td>
      <td>NaN</td>
      <td>학문/교육</td>
      <td>학원-예능취미체육</td>
      <td>태권도장</td>
      <td>서울특별시</td>
      <td>성북구</td>
      <td>길음1동</td>
      <td>길음동</td>
      <td>서울특별시 성북구 길음동 1283-4</td>
      <td>서울특별시 성북구 길음로 20</td>
      <td>127.023020</td>
      <td>37.604749</td>
      <td>서울특별시</td>
      <td>성북구</td>
    </tr>
    <tr>
      <th>142</th>
      <td>파랑새어린이집</td>
      <td>NaN</td>
      <td>학문/교육</td>
      <td>유아교육</td>
      <td>어린이집</td>
      <td>서울특별시</td>
      <td>도봉구</td>
      <td>창1동</td>
      <td>창동</td>
      <td>서울특별시 도봉구 창동 374</td>
      <td>서울특별시 도봉구 덕릉로 329</td>
      <td>127.045486</td>
      <td>37.644831</td>
      <td>서울특별시</td>
      <td>도봉구</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>499268</th>
      <td>점프셈교실</td>
      <td>뉴스터디</td>
      <td>학문/교육</td>
      <td>학원-보습교습입시</td>
      <td>학원-입시</td>
      <td>서울특별시</td>
      <td>강서구</td>
      <td>염창동</td>
      <td>염창동</td>
      <td>서울특별시 강서구 염창동 242-29</td>
      <td>서울특별시 강서구 양천로 623</td>
      <td>126.867243</td>
      <td>37.554476</td>
      <td>서울특별시</td>
      <td>강서구</td>
    </tr>
    <tr>
      <th>499278</th>
      <td>점프셈교실</td>
      <td>IPN보떼미용</td>
      <td>학문/교육</td>
      <td>학원-창업취업취미</td>
      <td>학원-네일아트</td>
      <td>서울특별시</td>
      <td>강동구</td>
      <td>천호2동</td>
      <td>천호동</td>
      <td>서울특별시 강동구 천호동 456-2</td>
      <td>서울특별시 강동구 천호대로 993</td>
      <td>127.122785</td>
      <td>37.539198</td>
      <td>서울특별시</td>
      <td>강동구</td>
    </tr>
    <tr>
      <th>499288</th>
      <td>점프셈교실</td>
      <td>온누리보습</td>
      <td>학문/교육</td>
      <td>학원-보습교습입시</td>
      <td>학원-입시</td>
      <td>서울특별시</td>
      <td>관악구</td>
      <td>미성동</td>
      <td>신림동</td>
      <td>서울특별시 관악구 신림동 753-2</td>
      <td>서울특별시 관악구 문성로16가길 43</td>
      <td>126.914883</td>
      <td>37.475271</td>
      <td>서울특별시</td>
      <td>관악구</td>
    </tr>
    <tr>
      <th>499289</th>
      <td>점프셈교실</td>
      <td>일신제2관</td>
      <td>학문/교육</td>
      <td>학원-보습교습입시</td>
      <td>학원-입시</td>
      <td>서울특별시</td>
      <td>영등포구</td>
      <td>양평1동</td>
      <td>양평동1가</td>
      <td>서울특별시 영등포구 양평동1가 9-32</td>
      <td>서울특별시 영등포구 선유로 88</td>
      <td>126.890194</td>
      <td>37.521725</td>
      <td>서울특별시</td>
      <td>영등포구</td>
    </tr>
    <tr>
      <th>499315</th>
      <td>점프셈교실</td>
      <td>키스톤보습</td>
      <td>학문/교육</td>
      <td>학원-보습교습입시</td>
      <td>학원-입시</td>
      <td>서울특별시</td>
      <td>관악구</td>
      <td>조원동</td>
      <td>신림동</td>
      <td>서울특별시 관악구 신림동 1652-9</td>
      <td>서울특별시 관악구 조원로6길 1</td>
      <td>126.905305</td>
      <td>37.483139</td>
      <td>서울특별시</td>
      <td>관악구</td>
    </tr>
  </tbody>
</table>
<p>27717 rows × 15 columns</p>

</div>


```python
ggplot(shop_seoul_edu, aes(x='경도', y='위도', color='상권업종중분류명')) \
    + geom_point(size=0.5, alpha=0.2) \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 7])
```


![output_23_0](../../images/2022-06-28-19_Data_Analysis_2/output_23_0.png){: width="100%" height="100%"}

    <ggplot: (-9223371889443788130)>


```python
plt.figure(figsize=[16, 12])
sns.scatterplot(data=shop_seoul_edu, x='경도', y='위도', hue='상권업종중분류명', s=20)
```


    <AxesSubplot:xlabel='경도', ylabel='위도'>


![output_24_1](../../images/2022-06-28-19_Data_Analysis_2/output_24_1.png){: width="100%" height="100%"}

```python
# 상권업종대분류명이 '부동산'인 정보 보기
shop_seoul_realty = shop_seoul[shop_seoul['상권업종대분류명'] == '부동산']
shop_seoul_realty
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
      <th>상호명</th>
      <th>지점명</th>
      <th>상권업종대분류명</th>
      <th>상권업종중분류명</th>
      <th>상권업종소분류명</th>
      <th>시도명</th>
      <th>시군구명</th>
      <th>행정동명</th>
      <th>법정동명</th>
      <th>지번주소</th>
      <th>도로명주소</th>
      <th>경도</th>
      <th>위도</th>
      <th>시도</th>
      <th>구군</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>127</th>
      <td>화랑공인중개사사무소</td>
      <td>NaN</td>
      <td>부동산</td>
      <td>부동산중개</td>
      <td>부동산중개</td>
      <td>서울특별시</td>
      <td>노원구</td>
      <td>공릉2동</td>
      <td>공릉동</td>
      <td>서울특별시 노원구 공릉동 111</td>
      <td>서울특별시 노원구 화랑로51길 17</td>
      <td>127.089345</td>
      <td>37.623066</td>
      <td>서울특별시</td>
      <td>노원구</td>
    </tr>
    <tr>
      <th>145</th>
      <td>반석공인중개사사무소</td>
      <td>NaN</td>
      <td>부동산</td>
      <td>부동산중개</td>
      <td>부동산중개</td>
      <td>서울특별시</td>
      <td>강동구</td>
      <td>명일1동</td>
      <td>명일동</td>
      <td>서울특별시 강동구 명일동 15</td>
      <td>서울특별시 강동구 고덕로 210</td>
      <td>127.147049</td>
      <td>37.553801</td>
      <td>서울특별시</td>
      <td>강동구</td>
    </tr>
    <tr>
      <th>153</th>
      <td>부동산명가공인중개사사무소</td>
      <td>NaN</td>
      <td>부동산</td>
      <td>부동산중개</td>
      <td>부동산중개</td>
      <td>서울특별시</td>
      <td>송파구</td>
      <td>삼전동</td>
      <td>삼전동</td>
      <td>서울특별시 송파구 삼전동 45</td>
      <td>서울특별시 송파구 삼전로6길 18</td>
      <td>127.089034</td>
      <td>37.502621</td>
      <td>서울특별시</td>
      <td>송파구</td>
    </tr>
    <tr>
      <th>155</th>
      <td>강변공인중개사사무소</td>
      <td>NaN</td>
      <td>부동산</td>
      <td>부동산중개</td>
      <td>부동산중개</td>
      <td>서울특별시</td>
      <td>서초구</td>
      <td>잠원동</td>
      <td>잠원동</td>
      <td>서울특별시 서초구 잠원동 53</td>
      <td>서울특별시 서초구 잠원로12길 4</td>
      <td>127.012702</td>
      <td>37.518127</td>
      <td>서울특별시</td>
      <td>서초구</td>
    </tr>
    <tr>
      <th>160</th>
      <td>중앙부동산</td>
      <td>NaN</td>
      <td>부동산</td>
      <td>부동산중개</td>
      <td>부동산중개</td>
      <td>서울특별시</td>
      <td>서초구</td>
      <td>반포2동</td>
      <td>반포동</td>
      <td>서울특별시 서초구 반포동 2-8</td>
      <td>서울특별시 서초구 신반포로15길 29</td>
      <td>126.994682</td>
      <td>37.505459</td>
      <td>서울특별시</td>
      <td>서초구</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>498113</th>
      <td>고수경부동산</td>
      <td>NaN</td>
      <td>부동산</td>
      <td>부동산중개</td>
      <td>부동산중개</td>
      <td>서울특별시</td>
      <td>강남구</td>
      <td>개포4동</td>
      <td>개포동</td>
      <td>서울특별시 강남구 개포동 1218-1</td>
      <td>서울특별시 강남구 개포로24길 10</td>
      <td>127.048231</td>
      <td>37.478277</td>
      <td>서울특별시</td>
      <td>강남구</td>
    </tr>
    <tr>
      <th>498230</th>
      <td>희망</td>
      <td>NaN</td>
      <td>부동산</td>
      <td>부동산중개</td>
      <td>부동산중개</td>
      <td>서울특별시</td>
      <td>광진구</td>
      <td>자양3동</td>
      <td>자양동</td>
      <td>서울특별시 광진구 자양동 516</td>
      <td>서울특별시 광진구 뚝섬로35길 32</td>
      <td>127.071279</td>
      <td>37.536209</td>
      <td>서울특별시</td>
      <td>광진구</td>
    </tr>
    <tr>
      <th>498232</th>
      <td>중앙부동산</td>
      <td>NaN</td>
      <td>부동산</td>
      <td>부동산중개</td>
      <td>부동산중개</td>
      <td>서울특별시</td>
      <td>금천구</td>
      <td>시흥5동</td>
      <td>시흥동</td>
      <td>서울특별시 금천구 시흥동 929-33</td>
      <td>서울특별시 금천구 금하로24길 91</td>
      <td>126.909643</td>
      <td>37.446840</td>
      <td>서울특별시</td>
      <td>금천구</td>
    </tr>
    <tr>
      <th>498307</th>
      <td>진주부동산</td>
      <td>NaN</td>
      <td>부동산</td>
      <td>부동산중개</td>
      <td>부동산중개</td>
      <td>서울특별시</td>
      <td>송파구</td>
      <td>잠실3동</td>
      <td>잠실동</td>
      <td>서울특별시 송파구 잠실동 35</td>
      <td>서울특별시 송파구 잠실로 62</td>
      <td>127.090269</td>
      <td>37.508009</td>
      <td>서울특별시</td>
      <td>송파구</td>
    </tr>
    <tr>
      <th>499226</th>
      <td>대원공인중개사사무소</td>
      <td>NaN</td>
      <td>부동산</td>
      <td>부동산중개</td>
      <td>부동산중개</td>
      <td>서울특별시</td>
      <td>은평구</td>
      <td>응암1동</td>
      <td>응암동</td>
      <td>서울특별시 은평구 응암동 115-4</td>
      <td>서울특별시 은평구 은평로8길 18-1</td>
      <td>126.919966</td>
      <td>37.598778</td>
      <td>서울특별시</td>
      <td>은평구</td>
    </tr>
  </tbody>
</table>
<p>13164 rows × 15 columns</p>

</div>


```python
ggplot(shop_seoul_realty, aes(x='경도', y='위도', color='상권업종중분류명')) \
    + geom_point(size=0.7) \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 7])
```


![output_26_0](../../images/2022-06-28-19_Data_Analysis_2/output_26_0.png){: width="100%" height="100%"}

    <ggplot: (147429567429)>


```python
plt.figure(figsize=[16, 12])
sns.scatterplot(data=shop_seoul_realty, x='경도', y='위도', hue='상권업종중분류명', s=30)
```


    <AxesSubplot:xlabel='경도', ylabel='위도'>


![output_27_1](../../images/2022-06-28-19_Data_Analysis_2/output_27_1.png){: width="100%" height="100%"}

```python
# 상권업종중분류명이 '학원-컴퓨터'인 정보 보기
shop_seoul_edu_computer = shop_seoul[shop_seoul['상권업종중분류명'] == '학원-컴퓨터']
shop_seoul_edu_computer
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
      <th>상호명</th>
      <th>지점명</th>
      <th>상권업종대분류명</th>
      <th>상권업종중분류명</th>
      <th>상권업종소분류명</th>
      <th>시도명</th>
      <th>시군구명</th>
      <th>행정동명</th>
      <th>법정동명</th>
      <th>지번주소</th>
      <th>도로명주소</th>
      <th>경도</th>
      <th>위도</th>
      <th>시도</th>
      <th>구군</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>442</th>
      <td>아이비씨에듀케이션</td>
      <td>NaN</td>
      <td>학문/교육</td>
      <td>학원-컴퓨터</td>
      <td>컴퓨터학원</td>
      <td>서울특별시</td>
      <td>은평구</td>
      <td>불광1동</td>
      <td>불광동</td>
      <td>서울특별시 은평구 불광동 272-2</td>
      <td>서울특별시 은평구 불광로 51</td>
      <td>126.930696</td>
      <td>37.613419</td>
      <td>서울특별시</td>
      <td>은평구</td>
    </tr>
    <tr>
      <th>2687</th>
      <td>서원초등학교컴퓨터교실</td>
      <td>NaN</td>
      <td>학문/교육</td>
      <td>학원-컴퓨터</td>
      <td>컴퓨터학원</td>
      <td>서울특별시</td>
      <td>서초구</td>
      <td>반포1동</td>
      <td>반포동</td>
      <td>서울특별시 서초구 반포동 30-8</td>
      <td>서울특별시 서초구 고무래로 63</td>
      <td>127.014605</td>
      <td>37.502429</td>
      <td>서울특별시</td>
      <td>서초구</td>
    </tr>
    <tr>
      <th>3678</th>
      <td>이찬진컴퓨터교실</td>
      <td>NaN</td>
      <td>학문/교육</td>
      <td>학원-컴퓨터</td>
      <td>컴퓨터학원</td>
      <td>서울특별시</td>
      <td>성북구</td>
      <td>정릉1동</td>
      <td>정릉동</td>
      <td>서울특별시 성북구 정릉동 16-282</td>
      <td>서울특별시 성북구 정릉로38다길 29</td>
      <td>127.017025</td>
      <td>37.601564</td>
      <td>서울특별시</td>
      <td>성북구</td>
    </tr>
    <tr>
      <th>3872</th>
      <td>백상컴퓨터학원</td>
      <td>NaN</td>
      <td>학문/교육</td>
      <td>학원-컴퓨터</td>
      <td>컴퓨터학원</td>
      <td>서울특별시</td>
      <td>구로구</td>
      <td>구로4동</td>
      <td>구로동</td>
      <td>서울특별시 구로구 구로동 314</td>
      <td>서울특별시 구로구 구로중앙로7길 28</td>
      <td>126.889592</td>
      <td>37.491327</td>
      <td>서울특별시</td>
      <td>구로구</td>
    </tr>
    <tr>
      <th>5517</th>
      <td>보성컴퓨터학원</td>
      <td>NaN</td>
      <td>학문/교육</td>
      <td>학원-컴퓨터</td>
      <td>컴퓨터학원</td>
      <td>서울특별시</td>
      <td>성북구</td>
      <td>장위1동</td>
      <td>장위동</td>
      <td>서울특별시 성북구 장위동 230-91</td>
      <td>서울특별시 성북구 장위로15길 16</td>
      <td>127.041859</td>
      <td>37.614905</td>
      <td>서울특별시</td>
      <td>성북구</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>499152</th>
      <td>점프셈교실</td>
      <td>피씨정비네트워크</td>
      <td>학문/교육</td>
      <td>학원-컴퓨터</td>
      <td>컴퓨터학원</td>
      <td>서울특별시</td>
      <td>마포구</td>
      <td>합정동</td>
      <td>합정동</td>
      <td>서울특별시 마포구 합정동 412-20</td>
      <td>서울특별시 마포구 독막로 33-1</td>
      <td>126.917321</td>
      <td>37.548368</td>
      <td>서울특별시</td>
      <td>마포구</td>
    </tr>
    <tr>
      <th>499153</th>
      <td>점프셈교실</td>
      <td>왕컴퓨터</td>
      <td>학문/교육</td>
      <td>학원-컴퓨터</td>
      <td>컴퓨터학원</td>
      <td>서울특별시</td>
      <td>은평구</td>
      <td>응암3동</td>
      <td>응암동</td>
      <td>서울특별시 은평구 응암동 576-48</td>
      <td>서울특별시 은평구 응암로 204</td>
      <td>126.917419</td>
      <td>37.590132</td>
      <td>서울특별시</td>
      <td>은평구</td>
    </tr>
    <tr>
      <th>499154</th>
      <td>점프셈교실</td>
      <td>벽산정보처리</td>
      <td>학문/교육</td>
      <td>학원-컴퓨터</td>
      <td>컴퓨터학원</td>
      <td>서울특별시</td>
      <td>노원구</td>
      <td>상계6.7동</td>
      <td>상계동</td>
      <td>서울특별시 노원구 상계동 763-4</td>
      <td>서울특별시 노원구 동일로 1335</td>
      <td>127.062251</td>
      <td>37.647993</td>
      <td>서울특별시</td>
      <td>노원구</td>
    </tr>
    <tr>
      <th>499155</th>
      <td>점프셈교실</td>
      <td>신촌아이디컴퓨터</td>
      <td>학문/교육</td>
      <td>학원-컴퓨터</td>
      <td>컴퓨터학원</td>
      <td>서울특별시</td>
      <td>서대문구</td>
      <td>신촌동</td>
      <td>창천동</td>
      <td>서울특별시 서대문구 창천동 20-44</td>
      <td>서울특별시 서대문구 신촌로 117</td>
      <td>126.938941</td>
      <td>37.556025</td>
      <td>서울특별시</td>
      <td>서대문구</td>
    </tr>
    <tr>
      <th>499156</th>
      <td>점프셈교실</td>
      <td>영명컴퓨터</td>
      <td>학문/교육</td>
      <td>학원-컴퓨터</td>
      <td>컴퓨터학원</td>
      <td>서울특별시</td>
      <td>마포구</td>
      <td>아현동</td>
      <td>공덕동</td>
      <td>서울특별시 마포구 공덕동 249-12</td>
      <td>서울특별시 마포구 마포대로8길 9</td>
      <td>126.953922</td>
      <td>37.546617</td>
      <td>서울특별시</td>
      <td>마포구</td>
    </tr>
  </tbody>
</table>
<p>215 rows × 15 columns</p>

</div>


```python
ggplot(shop_seoul_edu_computer, aes(x='경도', y='위도', color='상호명')) \
    + geom_point(size=0.7) \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 7])
```


![output_29_0](../../images/2022-06-28-19_Data_Analysis_2/output_29_0.png){: width="100%" height="100%"}

    <ggplot: (-9223371889420026294)>


```python
plt.figure(figsize=[16, 12])
sns.scatterplot(data=shop_seoul_edu_computer, x='경도', y='위도', hue='상호명', s=30)
```


    <AxesSubplot:xlabel='경도', ylabel='위도'>


![output_30_1](../../images/2022-06-28-19_Data_Analysis_2/output_30_1.png){: width="100%" height="100%"}

```python
import folium
```


```python
data = shop_seoul_edu_computer
edu_map = folium.Map(location=[data['위도'].mean(), data['경도'].mean()], zoom_start=12, tiles='Stamen Terrain')

for i in data.index:
    edu_name = data.loc[i, '상호명'] + ' - ' + data.loc[i, '도로명주소']
    popup = folium.Popup(edu_name, max_width=200)
    folium.Marker(location=[data.loc[i, '위도'], data.loc[i, '경도']], popup=popup).add_to(edu_map)

edu_map.save('./output/edu_map.html')
edu_map
```

![1](../../images/2022-06-28-19_Data_Analysis_2/1.png){: width="100%" height="100%"}


```python
# 상권업종중분류명이 '커피점/카페'인 정보 보기
shop_seoul_eat = shop_seoul[shop_seoul['상권업종중분류명'] == '커피점/카페']
shop_seoul_eat
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
      <th>상호명</th>
      <th>지점명</th>
      <th>상권업종대분류명</th>
      <th>상권업종중분류명</th>
      <th>상권업종소분류명</th>
      <th>시도명</th>
      <th>시군구명</th>
      <th>행정동명</th>
      <th>법정동명</th>
      <th>지번주소</th>
      <th>도로명주소</th>
      <th>경도</th>
      <th>위도</th>
      <th>시도</th>
      <th>구군</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>커피빈코리아선릉로93길점</td>
      <td>코리아선릉로93길점</td>
      <td>음식</td>
      <td>커피점/카페</td>
      <td>커피전문점/카페/다방</td>
      <td>서울특별시</td>
      <td>강남구</td>
      <td>역삼1동</td>
      <td>역삼동</td>
      <td>서울특별시 강남구 역삼동 696-42</td>
      <td>서울특별시 강남구 선릉로93길 6</td>
      <td>127.047883</td>
      <td>37.505675</td>
      <td>서울특별시</td>
      <td>강남구</td>
    </tr>
    <tr>
      <th>8</th>
      <td>스완카페트</td>
      <td>NaN</td>
      <td>음식</td>
      <td>커피점/카페</td>
      <td>커피전문점/카페/다방</td>
      <td>서울특별시</td>
      <td>영등포구</td>
      <td>대림3동</td>
      <td>대림동</td>
      <td>서울특별시 영등포구 대림동 604-56</td>
      <td>서울특별시 영등포구 도신로10가길 11-1</td>
      <td>126.897710</td>
      <td>37.503693</td>
      <td>서울특별시</td>
      <td>영등포구</td>
    </tr>
    <tr>
      <th>11</th>
      <td>왕실</td>
      <td>NaN</td>
      <td>음식</td>
      <td>커피점/카페</td>
      <td>커피전문점/카페/다방</td>
      <td>서울특별시</td>
      <td>중구</td>
      <td>명동</td>
      <td>명동2가</td>
      <td>서울특별시 중구 명동2가 105</td>
      <td>서울특별시 중구 남대문로 52-13</td>
      <td>126.982419</td>
      <td>37.562274</td>
      <td>서울특별시</td>
      <td>중구</td>
    </tr>
    <tr>
      <th>15</th>
      <td>커피빈</td>
      <td>코리아교대점</td>
      <td>음식</td>
      <td>커피점/카페</td>
      <td>커피전문점/카페/다방</td>
      <td>서울특별시</td>
      <td>서초구</td>
      <td>서초1동</td>
      <td>서초동</td>
      <td>서울특별시 서초구 서초동 1657-5</td>
      <td>서울특별시 서초구 서초중앙로 118</td>
      <td>127.014217</td>
      <td>37.492388</td>
      <td>서울특별시</td>
      <td>서초구</td>
    </tr>
    <tr>
      <th>17</th>
      <td>고려대학교교육관쎄리오점</td>
      <td>NaN</td>
      <td>음식</td>
      <td>커피점/카페</td>
      <td>커피전문점/카페/다방</td>
      <td>서울특별시</td>
      <td>성북구</td>
      <td>안암동</td>
      <td>안암동5가</td>
      <td>서울특별시 성북구 안암동5가 1-2</td>
      <td>서울특별시 성북구 안암로 145</td>
      <td>127.031702</td>
      <td>37.588485</td>
      <td>서울특별시</td>
      <td>성북구</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>499300</th>
      <td>간단하지만특별한화피디Cafe</td>
      <td>지오갤러리&amp;</td>
      <td>음식</td>
      <td>커피점/카페</td>
      <td>커피전문점/카페/다방</td>
      <td>서울특별시</td>
      <td>광진구</td>
      <td>구의2동</td>
      <td>구의동</td>
      <td>서울특별시 광진구 구의동 53-1</td>
      <td>서울특별시 광진구 천호대로 661</td>
      <td>127.090097</td>
      <td>37.552007</td>
      <td>서울특별시</td>
      <td>광진구</td>
    </tr>
    <tr>
      <th>499307</th>
      <td>간단하지만특별한화피디Cafe</td>
      <td>운정갤러리</td>
      <td>음식</td>
      <td>커피점/카페</td>
      <td>커피전문점/카페/다방</td>
      <td>서울특별시</td>
      <td>서초구</td>
      <td>서초3동</td>
      <td>서초동</td>
      <td>서울특별시 서초구 서초동 1600-9</td>
      <td>서울특별시 서초구 서초중앙로5길 10-8</td>
      <td>127.015083</td>
      <td>37.485853</td>
      <td>서울특별시</td>
      <td>서초구</td>
    </tr>
    <tr>
      <th>499320</th>
      <td>스타벅스</td>
      <td>독립문역점</td>
      <td>음식</td>
      <td>커피점/카페</td>
      <td>커피전문점/카페/다방</td>
      <td>서울특별시</td>
      <td>종로구</td>
      <td>교남동</td>
      <td>교북동</td>
      <td>서울특별시 종로구 교북동 12-1</td>
      <td>서울특별시 종로구 송월길 155</td>
      <td>126.961371</td>
      <td>37.571632</td>
      <td>서울특별시</td>
      <td>종로구</td>
    </tr>
    <tr>
      <th>499322</th>
      <td>간단하지만특별한화피디Cafe</td>
      <td>앤아더</td>
      <td>음식</td>
      <td>커피점/카페</td>
      <td>커피전문점/카페/다방</td>
      <td>서울특별시</td>
      <td>성동구</td>
      <td>성수1가2동</td>
      <td>성수동1가</td>
      <td>서울특별시 성동구 성수동1가 668-104</td>
      <td>서울특별시 성동구 서울숲2길 40-10</td>
      <td>127.042749</td>
      <td>37.546316</td>
      <td>서울특별시</td>
      <td>성동구</td>
    </tr>
    <tr>
      <th>499325</th>
      <td>체크페이먼트</td>
      <td>NaN</td>
      <td>음식</td>
      <td>커피점/카페</td>
      <td>커피전문점/카페/다방</td>
      <td>서울특별시</td>
      <td>강남구</td>
      <td>대치4동</td>
      <td>대치동</td>
      <td>서울특별시 강남구 대치동 905</td>
      <td>서울특별시 강남구 역삼로69길 10</td>
      <td>127.054001</td>
      <td>37.502210</td>
      <td>서울특별시</td>
      <td>강남구</td>
    </tr>
  </tbody>
</table>
<p>16349 rows × 15 columns</p>

</div>


```python
ggplot(shop_seoul_eat, aes(x='경도', y='위도', color='구군')) \
    + geom_point(size=0.7) \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 7])
```


![output_34_0](../../images/2022-06-28-19_Data_Analysis_2/output_34_0.png){: width="100%" height="100%"}

    <ggplot: (147444776438)>


```python
plt.figure(figsize=[16, 12])
sns.scatterplot(data=shop_seoul_eat, x='경도', y='위도', hue='구군', s=30)
```


    <AxesSubplot:xlabel='경도', ylabel='위도'>


![output_35_1](../../images/2022-06-28-19_Data_Analysis_2/output_35_1.png){: width="100%" height="100%"}

```python
data = shop_seoul_eat[shop_seoul_eat['구군'] == '노원구']
edu_map = folium.Map(location=[data['위도'].mean(), data['경도'].mean()], zoom_start=14, tiles='Stamen Terrain')

for i in data.index:
    edu_name = data.loc[i, '상호명'] + ' - ' + data.loc[i, '도로명주소']
    popup = folium.Popup(edu_name, max_width=200)
    folium.Marker(location=[data.loc[i, '위도'], data.loc[i, '경도']], popup=popup).add_to(edu_map)

edu_map.save('./output/eat_map.html')
edu_map
```

![2](../../images/2022-06-28-19_Data_Analysis_2/2.png){: width="100%" height="100%"}
