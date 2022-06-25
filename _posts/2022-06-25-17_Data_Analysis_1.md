---
layout: single
title:  "17_Data_Analysis_1"
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
```


```python
# !pip install plotnine  # 시각화 라이브러리 => R에 시각화 하는 방법과 유사하게 시각화 한다.
# !pip install missingno # 누락값(결측치)을 시각화 하는 라이브러리
from plotnine import *
import missingno as msno
```


```python
# 데이터 다운로드 => https://www.data.go.kr/dataset/3035522/fileData.do
# 2015년 10월부터 2018년 7월까지 주택 분양 보증을 받아서 분양한 전체 민간 아파트 신규 분양가격 동향
```


```python
# 현재 화면에 보이는 소스 프로그램의 위치(경로)를 보여준다.
%pwd
```




    'D:\\kookgi_11gi\\PythonBigData\\workspace'




```python
# 현재 화면에 보이는 소스 프로그램의 위치에 저장된 파일 목록을 보여준다.
# 현재 폴더 아래에 위치한 폴더에 저장된 파일 목록을 보고싶다면 '%ls 폴더이름'으로 실행한다.
%ls data
```

     D 드라이브의 볼륨에는 이름이 없습니다.
     볼륨 일련 번호: 4089-A2ED
    
     D:\kookgi_11gi\PythonBigData\workspace\data 디렉터리
    
    2021-11-08  오전 11:19    <DIR>          .
    2021-11-08  오전 11:19    <DIR>          ..
    2020-03-24  오후 10:45           326,362 a_new_hope.txt
    2020-03-24  오후 10:09           148,570 alice.txt
    2020-03-24  오후 11:22           416,516 alice_color.png
    2020-03-24  오후 10:09             7,339 alice_mask.png
    2021-11-03  오후 01:42               587 concat.zip
    2018-09-05  오전 11:23                61 concat_1.csv
    2018-09-05  오전 11:23                61 concat_2.csv
    2018-09-05  오전 11:23                69 concat_3.csv
    2018-09-05  오전 11:23             5,796 country_timeseries.csv
    2018-09-05  오전 11:23            83,637 gapminder.tsv
    2020-03-25  오전 12:30            99,957 korea_mask.jpg
    2021-11-04  오전 09:28             1,063 merge.zip
    2018-09-05  오전 11:23               984 pew.csv
    2020-06-17  오후 03:09           131,206 preSale_2018_6.csv
    2018-09-05  오전 11:23               442 scientists.csv
    2021-09-15  오후 08:08            45,122 Seattle2014.csv
    2020-03-24  오후 10:46            12,601 stormtrooper_mask.png
    2018-09-05  오전 11:23               128 survey_person.csv
    2018-09-05  오전 11:23                78 survey_site.csv
    2018-09-05  오전 11:23               413 survey_survey.csv
    2018-09-05  오전 11:23               177 survey_visited.csv
    2020-03-25  오전 12:45            26,392 wordData.txt
    2021-11-08  오전 11:19            28,146 분양가.zip
    2020-06-17  오후 03:09           131,206 전국_평균_분양가격_2018.6월_.csv
                  24개 파일           1,466,913 바이트
                   2개 디렉터리  958,804,938,752 바이트 남음



```python
# read_csv() 함수로 읽어들이는 csv 파일이 한글 인코딩 문제로 에러가 발생되서 읽어오지 못할 경우가 있다.
# pd.read_csv('./data/전국_평균_분양가격_2018.6월_.csv') # 이 문장에서 에러가 발생된다면 아래와 같이 실행한다.
# pd.read_csv('./data/전국_평균_분양가격_2018.6월_.csv', encoding='euc-kr', engine='python')
pre_sale = pd.read_csv('./data/preSale_2018_6.csv')
pre_sale.shape
```


    (2805, 5)


```python
pre_sale.head()
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
      <th>지역명</th>
      <th>규모구분</th>
      <th>연도</th>
      <th>월</th>
      <th>분양가격(㎡)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>서울</td>
      <td>전체</td>
      <td>2015</td>
      <td>10</td>
      <td>5841</td>
    </tr>
    <tr>
      <th>1</th>
      <td>서울</td>
      <td>전용면적 60㎡이하</td>
      <td>2015</td>
      <td>10</td>
      <td>5652</td>
    </tr>
    <tr>
      <th>2</th>
      <td>서울</td>
      <td>전용면적 60㎡초과 85㎡이하</td>
      <td>2015</td>
      <td>10</td>
      <td>5882</td>
    </tr>
    <tr>
      <th>3</th>
      <td>서울</td>
      <td>전용면적 85㎡초과 102㎡이하</td>
      <td>2015</td>
      <td>10</td>
      <td>5721</td>
    </tr>
    <tr>
      <th>4</th>
      <td>서울</td>
      <td>전용면적 102㎡초과</td>
      <td>2015</td>
      <td>10</td>
      <td>5879</td>
    </tr>
  </tbody>
</table>
</div>


```python
pre_sale.tail()
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
      <th>지역명</th>
      <th>규모구분</th>
      <th>연도</th>
      <th>월</th>
      <th>분양가격(㎡)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2800</th>
      <td>제주</td>
      <td>전체</td>
      <td>2018</td>
      <td>6</td>
      <td>3925</td>
    </tr>
    <tr>
      <th>2801</th>
      <td>제주</td>
      <td>전용면적 60㎡이하</td>
      <td>2018</td>
      <td>6</td>
      <td>5462</td>
    </tr>
    <tr>
      <th>2802</th>
      <td>제주</td>
      <td>전용면적 60㎡초과 85㎡이하</td>
      <td>2018</td>
      <td>6</td>
      <td>3639</td>
    </tr>
    <tr>
      <th>2803</th>
      <td>제주</td>
      <td>전용면적 85㎡초과 102㎡이하</td>
      <td>2018</td>
      <td>6</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2804</th>
      <td>제주</td>
      <td>전용면적 102㎡초과</td>
      <td>2018</td>
      <td>6</td>
      <td>3029</td>
    </tr>
  </tbody>
</table>
</div>


```python
# dtypes 속성이나 info() 함수를 이용해서 데이터프레임을 구성하는 데이터 타입을 확인하고 필요하다면 데이터 타입을 변경한다.
pre_sale.dtypes
```


    지역명        object
    규모구분       object
    연도          int64
    월           int64
    분양가격(㎡)    object
    dtype: object


```python
pre_sale.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 2805 entries, 0 to 2804
    Data columns (total 5 columns):
     #   Column   Non-Null Count  Dtype 
    ---  ------   --------------  ----- 
     0   지역명      2805 non-null   object
     1   규모구분     2805 non-null   object
     2   연도       2805 non-null   int64 
     3   월        2805 non-null   int64 
     4   분양가격(㎡)  2674 non-null   object
    dtypes: int64(2), object(3)
    memory usage: 109.7+ KB

```python
# 연도와 월은 연산에 사용할 데이터가 아니라 구분에 사용되는 데이터이므로 문자열 형태로 변환한다.
pre_sale['연도'] = pre_sale['연도'].astype(str)
pre_sale['월'] = pre_sale['월'].astype(str)
pre_sale.dtypes
```


    지역명        object
    규모구분       object
    연도         object
    월          object
    분양가격(㎡)    object
    dtype: object


```python
# 분양가격 데이터 타입을 숫자로 변경하고 평당분양가격을 계산한다.
# pre_sale['분양가격(㎡)'] = pre_sale['분양가격(㎡)'].astype(float)
# to_numeric() 함수의 error 속성을 coerce로 지정하면 오류가 발생된 데이터를 누락값으로 변경한다.
pre_sale['분양가격(㎡)'] = pd.to_numeric(pre_sale['분양가격(㎡)'], errors='coerce')
pre_sale['평당분양가격'] = pre_sale['분양가격(㎡)'] * 3.3
pre_sale.dtypes
```


    지역명         object
    규모구분        object
    연도          object
    월           object
    분양가격(㎡)    float64
    평당분양가격     float64
    dtype: object


```python
pre_sale.head()
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
      <th>지역명</th>
      <th>규모구분</th>
      <th>연도</th>
      <th>월</th>
      <th>분양가격(㎡)</th>
      <th>평당분양가격</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>서울</td>
      <td>전체</td>
      <td>2015</td>
      <td>10</td>
      <td>5841.0</td>
      <td>19275.3</td>
    </tr>
    <tr>
      <th>1</th>
      <td>서울</td>
      <td>전용면적 60㎡이하</td>
      <td>2015</td>
      <td>10</td>
      <td>5652.0</td>
      <td>18651.6</td>
    </tr>
    <tr>
      <th>2</th>
      <td>서울</td>
      <td>전용면적 60㎡초과 85㎡이하</td>
      <td>2015</td>
      <td>10</td>
      <td>5882.0</td>
      <td>19410.6</td>
    </tr>
    <tr>
      <th>3</th>
      <td>서울</td>
      <td>전용면적 85㎡초과 102㎡이하</td>
      <td>2015</td>
      <td>10</td>
      <td>5721.0</td>
      <td>18879.3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>서울</td>
      <td>전용면적 102㎡초과</td>
      <td>2015</td>
      <td>10</td>
      <td>5879.0</td>
      <td>19400.7</td>
    </tr>
  </tbody>
</table>
</div>


```python
# isnull() 또는 isna() 함수와 sum() 함수를 사용해서 누락값이 존재하는가 확인하기
print(pre_sale.isnull().sum())
print(pre_sale.isna().sum())
```

    지역명          0
    규모구분         0
    연도           0
    월            0
    분양가격(㎡)    223
    평당분양가격     223
    dtype: int64
    지역명          0
    규모구분         0
    연도           0
    월            0
    분양가격(㎡)    223
    평당분양가격     223
    dtype: int64

```python
# missingno 라이브러리로 그래프를 그려서 누락값 확인하기 => 중간 중간에 흰색으로 보이는 부분이 누락값이다.
msno.matrix(pre_sale, figsize=[10, 6])
plt.show()
```


![png](output_14_0.png)
    

```python
# 2017년 데이터만 추출한다.
pre_sale_2017 = pre_sale[pre_sale['연도'] == '2017']
pre_sale_2017
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
      <th>지역명</th>
      <th>규모구분</th>
      <th>연도</th>
      <th>월</th>
      <th>분양가격(㎡)</th>
      <th>평당분양가격</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1275</th>
      <td>서울</td>
      <td>전체</td>
      <td>2017</td>
      <td>1</td>
      <td>6450.0</td>
      <td>21285.0</td>
    </tr>
    <tr>
      <th>1276</th>
      <td>서울</td>
      <td>전용면적 60㎡이하</td>
      <td>2017</td>
      <td>1</td>
      <td>6662.0</td>
      <td>21984.6</td>
    </tr>
    <tr>
      <th>1277</th>
      <td>서울</td>
      <td>전용면적 60㎡초과 85㎡이하</td>
      <td>2017</td>
      <td>1</td>
      <td>6500.0</td>
      <td>21450.0</td>
    </tr>
    <tr>
      <th>1278</th>
      <td>서울</td>
      <td>전용면적 85㎡초과 102㎡이하</td>
      <td>2017</td>
      <td>1</td>
      <td>7030.0</td>
      <td>23199.0</td>
    </tr>
    <tr>
      <th>1279</th>
      <td>서울</td>
      <td>전용면적 102㎡초과</td>
      <td>2017</td>
      <td>1</td>
      <td>6771.0</td>
      <td>22344.3</td>
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
      <th>2290</th>
      <td>제주</td>
      <td>전체</td>
      <td>2017</td>
      <td>12</td>
      <td>3578.0</td>
      <td>11807.4</td>
    </tr>
    <tr>
      <th>2291</th>
      <td>제주</td>
      <td>전용면적 60㎡이하</td>
      <td>2017</td>
      <td>12</td>
      <td>5380.0</td>
      <td>17754.0</td>
    </tr>
    <tr>
      <th>2292</th>
      <td>제주</td>
      <td>전용면적 60㎡초과 85㎡이하</td>
      <td>2017</td>
      <td>12</td>
      <td>3467.0</td>
      <td>11441.1</td>
    </tr>
    <tr>
      <th>2293</th>
      <td>제주</td>
      <td>전용면적 85㎡초과 102㎡이하</td>
      <td>2017</td>
      <td>12</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2294</th>
      <td>제주</td>
      <td>전용면적 102㎡초과</td>
      <td>2017</td>
      <td>12</td>
      <td>3029.0</td>
      <td>9995.7</td>
    </tr>
  </tbody>
</table>
<p>1020 rows × 6 columns</p>
</div>


```python
pre_sale['지역명'].value_counts() # 시도별 데이터가 동일하게 저장되어 있다.
```


    전북    165
    전남    165
    울산    165
    경북    165
    서울    165
    제주    165
    충북    165
    광주    165
    강원    165
    경남    165
    부산    165
    충남    165
    인천    165
    경기    165
    대구    165
    대전    165
    세종    165
    Name: 지역명, dtype: int64


```python
pre_sale['규모구분'].value_counts() # 규모구분별 데이터가 동일하게 저장되어 있다.
```


    전체                   561
    전용면적 60㎡초과 85㎡이하     561
    전용면적 60㎡이하           561
    전용면적 102㎡초과          561
    전용면적 85㎡초과 102㎡이하    561
    Name: 규모구분, dtype: int64

전국 평균 분양 가격


```python
# pd.options.display.float_format 속성을 사용해서 데이터프레임에 저장된 숫자 데이터가 화면에 표시될 출력 서식을 지정할 수 있다.
# 출력서식 {:,.1f}는 천 단위마다 ','를 출력하고 '.'뒤의 숫자만큼 소수점 아래 자리수를 표현한다.
# 'f'를 붙이지 않으면 실수가 'e'를 사용하는 지수 형태로 표현된다.
pd.options.display.float_format = '{:,.1f}'.format
```


```python
# describe() 함수로 데이터프레임에 저장된 숫자 데이터의 요약 통계량을 확인 할 수 있다.
pre_sale.groupby(pre_sale['연도']).describe()
```


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
    
    .dataframe thead tr th {
        text-align: left;
    }
    
    .dataframe thead tr:last-of-type th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th colspan="8" halign="left">분양가격(㎡)</th>
      <th colspan="8" halign="left">평당분양가격</th>
    </tr>
    <tr>
      <th></th>
      <th>count</th>
      <th>mean</th>
      <th>std</th>
      <th>min</th>
      <th>25%</th>
      <th>50%</th>
      <th>75%</th>
      <th>max</th>
      <th>count</th>
      <th>mean</th>
      <th>std</th>
      <th>min</th>
      <th>25%</th>
      <th>50%</th>
      <th>75%</th>
      <th>max</th>
    </tr>
    <tr>
      <th>연도</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2015</th>
      <td>243.0</td>
      <td>2,788.7</td>
      <td>976.9</td>
      <td>1,868.0</td>
      <td>2,225.0</td>
      <td>2,516.0</td>
      <td>3,025.5</td>
      <td>7,092.0</td>
      <td>243.0</td>
      <td>9,202.7</td>
      <td>3,223.6</td>
      <td>6,164.4</td>
      <td>7,342.5</td>
      <td>8,302.8</td>
      <td>9,984.1</td>
      <td>23,403.6</td>
    </tr>
    <tr>
      <th>2016</th>
      <td>984.0</td>
      <td>2,934.2</td>
      <td>1,071.4</td>
      <td>1,900.0</td>
      <td>2,282.0</td>
      <td>2,672.0</td>
      <td>3,148.5</td>
      <td>8,096.0</td>
      <td>984.0</td>
      <td>9,683.0</td>
      <td>3,535.8</td>
      <td>6,270.0</td>
      <td>7,530.6</td>
      <td>8,817.6</td>
      <td>10,390.0</td>
      <td>26,716.8</td>
    </tr>
    <tr>
      <th>2017</th>
      <td>899.0</td>
      <td>3,139.5</td>
      <td>1,107.6</td>
      <td>1,976.0</td>
      <td>2,365.0</td>
      <td>2,849.0</td>
      <td>3,456.0</td>
      <td>7,887.0</td>
      <td>899.0</td>
      <td>10,360.5</td>
      <td>3,655.0</td>
      <td>6,520.8</td>
      <td>7,804.5</td>
      <td>9,401.7</td>
      <td>11,404.8</td>
      <td>26,027.1</td>
    </tr>
    <tr>
      <th>2018</th>
      <td>456.0</td>
      <td>3,299.4</td>
      <td>1,199.3</td>
      <td>2,076.0</td>
      <td>2,470.5</td>
      <td>2,912.5</td>
      <td>3,647.2</td>
      <td>8,098.0</td>
      <td>456.0</td>
      <td>10,888.1</td>
      <td>3,957.7</td>
      <td>6,850.8</td>
      <td>8,152.6</td>
      <td>9,611.2</td>
      <td>12,035.9</td>
      <td>26,723.4</td>
    </tr>
  </tbody>
</table>
</div>


```python
# describe() 함수 실행 결과에 'T' 속성을 지정하면 요약 통계량이 전치되서 수직 방향으로 출력된다.
pre_sale.groupby(pre_sale['연도']).describe().T 
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
      <th>연도</th>
      <th>2015</th>
      <th>2016</th>
      <th>2017</th>
      <th>2018</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="8" valign="top">분양가격(㎡)</th>
      <th>count</th>
      <td>243.0</td>
      <td>984.0</td>
      <td>899.0</td>
      <td>456.0</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>2,788.7</td>
      <td>2,934.2</td>
      <td>3,139.5</td>
      <td>3,299.4</td>
    </tr>
    <tr>
      <th>std</th>
      <td>976.9</td>
      <td>1,071.4</td>
      <td>1,107.6</td>
      <td>1,199.3</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1,868.0</td>
      <td>1,900.0</td>
      <td>1,976.0</td>
      <td>2,076.0</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>2,225.0</td>
      <td>2,282.0</td>
      <td>2,365.0</td>
      <td>2,470.5</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>2,516.0</td>
      <td>2,672.0</td>
      <td>2,849.0</td>
      <td>2,912.5</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>3,025.5</td>
      <td>3,148.5</td>
      <td>3,456.0</td>
      <td>3,647.2</td>
    </tr>
    <tr>
      <th>max</th>
      <td>7,092.0</td>
      <td>8,096.0</td>
      <td>7,887.0</td>
      <td>8,098.0</td>
    </tr>
    <tr>
      <th rowspan="8" valign="top">평당분양가격</th>
      <th>count</th>
      <td>243.0</td>
      <td>984.0</td>
      <td>899.0</td>
      <td>456.0</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>9,202.7</td>
      <td>9,683.0</td>
      <td>10,360.5</td>
      <td>10,888.1</td>
    </tr>
    <tr>
      <th>std</th>
      <td>3,223.6</td>
      <td>3,535.8</td>
      <td>3,655.0</td>
      <td>3,957.7</td>
    </tr>
    <tr>
      <th>min</th>
      <td>6,164.4</td>
      <td>6,270.0</td>
      <td>6,520.8</td>
      <td>6,850.8</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>7,342.5</td>
      <td>7,530.6</td>
      <td>7,804.5</td>
      <td>8,152.6</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>8,302.8</td>
      <td>8,817.6</td>
      <td>9,401.7</td>
      <td>9,611.2</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>9,984.1</td>
      <td>10,390.0</td>
      <td>11,404.8</td>
      <td>12,035.9</td>
    </tr>
    <tr>
      <th>max</th>
      <td>23,403.6</td>
      <td>26,716.8</td>
      <td>26,027.1</td>
      <td>26,723.4</td>
    </tr>
  </tbody>
</table>
</div>


```python
pre_sale.groupby(pre_sale.연도).describe().T 
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
      <th>연도</th>
      <th>2015</th>
      <th>2016</th>
      <th>2017</th>
      <th>2018</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="8" valign="top">분양가격(㎡)</th>
      <th>count</th>
      <td>243.0</td>
      <td>984.0</td>
      <td>899.0</td>
      <td>456.0</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>2,788.7</td>
      <td>2,934.2</td>
      <td>3,139.5</td>
      <td>3,299.4</td>
    </tr>
    <tr>
      <th>std</th>
      <td>976.9</td>
      <td>1,071.4</td>
      <td>1,107.6</td>
      <td>1,199.3</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1,868.0</td>
      <td>1,900.0</td>
      <td>1,976.0</td>
      <td>2,076.0</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>2,225.0</td>
      <td>2,282.0</td>
      <td>2,365.0</td>
      <td>2,470.5</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>2,516.0</td>
      <td>2,672.0</td>
      <td>2,849.0</td>
      <td>2,912.5</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>3,025.5</td>
      <td>3,148.5</td>
      <td>3,456.0</td>
      <td>3,647.2</td>
    </tr>
    <tr>
      <th>max</th>
      <td>7,092.0</td>
      <td>8,096.0</td>
      <td>7,887.0</td>
      <td>8,098.0</td>
    </tr>
    <tr>
      <th rowspan="8" valign="top">평당분양가격</th>
      <th>count</th>
      <td>243.0</td>
      <td>984.0</td>
      <td>899.0</td>
      <td>456.0</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>9,202.7</td>
      <td>9,683.0</td>
      <td>10,360.5</td>
      <td>10,888.1</td>
    </tr>
    <tr>
      <th>std</th>
      <td>3,223.6</td>
      <td>3,535.8</td>
      <td>3,655.0</td>
      <td>3,957.7</td>
    </tr>
    <tr>
      <th>min</th>
      <td>6,164.4</td>
      <td>6,270.0</td>
      <td>6,520.8</td>
      <td>6,850.8</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>7,342.5</td>
      <td>7,530.6</td>
      <td>7,804.5</td>
      <td>8,152.6</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>8,302.8</td>
      <td>8,817.6</td>
      <td>9,401.7</td>
      <td>9,611.2</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>9,984.1</td>
      <td>10,390.0</td>
      <td>11,404.8</td>
      <td>12,035.9</td>
    </tr>
    <tr>
      <th>max</th>
      <td>23,403.6</td>
      <td>26,716.8</td>
      <td>26,027.1</td>
      <td>26,723.4</td>
    </tr>
  </tbody>
</table>
</div>

전국 규모별 평균 분양 가격


```python
# pivot_table(values, index[, columns, aggfunc, fill_value])
# values: 통계 함수를 적용할 데이터프레임의 열을 지정한다.
# index: 그룹화의 첫 번째 기준으로 사용되는 피벗 테이블로 가져올 데이터프레임의 열을 지정한다. => 행 데이터
# columns: 그룹화의 두 번째 기준으로 사용되는 피벗 테이블로 가져올 데이터프레임의 열을 지정한다. => 열 데이터
# aggfunc: index와 columns로 그룹화된 values에 적용할 함수를 지정한다. => 기본값은 평균을 계산하는 함수 mean 이다.
# fill_value: NaN을 대체할 값을 지정한다. => 주로 0을 사용한다.
pre_sale.pivot_table('평당분양가격', '규모구분', '연도')
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
      <th>연도</th>
      <th>2015</th>
      <th>2016</th>
      <th>2017</th>
      <th>2018</th>
    </tr>
    <tr>
      <th>규모구분</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>전용면적 102㎡초과</th>
      <td>9,837.2</td>
      <td>10,388.7</td>
      <td>11,334.5</td>
      <td>11,259.8</td>
    </tr>
    <tr>
      <th>전용면적 60㎡이하</th>
      <td>8,951.5</td>
      <td>9,398.9</td>
      <td>10,246.1</td>
      <td>10,957.3</td>
    </tr>
    <tr>
      <th>전용면적 60㎡초과 85㎡이하</th>
      <td>8,891.8</td>
      <td>9,296.0</td>
      <td>9,825.0</td>
      <td>10,438.1</td>
    </tr>
    <tr>
      <th>전용면적 85㎡초과 102㎡이하</th>
      <td>9,518.5</td>
      <td>10,122.4</td>
      <td>10,540.4</td>
      <td>11,456.8</td>
    </tr>
    <tr>
      <th>전체</th>
      <td>8,893.0</td>
      <td>9,293.0</td>
      <td>9,901.3</td>
      <td>10,560.3</td>
    </tr>
  </tbody>
</table>
</div>


```python
# 규모구분이 전체로 되어있는 금액으로면 연도별 변동 금액을 살펴보자
# 규모구분이 전체인 데이터만 추출한다.
region_year_all = pre_sale[pre_sale['규모구분'] == '전체']
region_year_all
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
      <th>지역명</th>
      <th>규모구분</th>
      <th>연도</th>
      <th>월</th>
      <th>분양가격(㎡)</th>
      <th>평당분양가격</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>서울</td>
      <td>전체</td>
      <td>2015</td>
      <td>10</td>
      <td>5,841.0</td>
      <td>19,275.3</td>
    </tr>
    <tr>
      <th>5</th>
      <td>인천</td>
      <td>전체</td>
      <td>2015</td>
      <td>10</td>
      <td>3,163.0</td>
      <td>10,437.9</td>
    </tr>
    <tr>
      <th>10</th>
      <td>경기</td>
      <td>전체</td>
      <td>2015</td>
      <td>10</td>
      <td>3,138.0</td>
      <td>10,355.4</td>
    </tr>
    <tr>
      <th>15</th>
      <td>부산</td>
      <td>전체</td>
      <td>2015</td>
      <td>10</td>
      <td>3,112.0</td>
      <td>10,269.6</td>
    </tr>
    <tr>
      <th>20</th>
      <td>대구</td>
      <td>전체</td>
      <td>2015</td>
      <td>10</td>
      <td>2,682.0</td>
      <td>8,850.6</td>
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
      <th>2780</th>
      <td>전북</td>
      <td>전체</td>
      <td>2018</td>
      <td>6</td>
      <td>2,326.0</td>
      <td>7,675.8</td>
    </tr>
    <tr>
      <th>2785</th>
      <td>전남</td>
      <td>전체</td>
      <td>2018</td>
      <td>6</td>
      <td>2,356.0</td>
      <td>7,774.8</td>
    </tr>
    <tr>
      <th>2790</th>
      <td>경북</td>
      <td>전체</td>
      <td>2018</td>
      <td>6</td>
      <td>2,631.0</td>
      <td>8,682.3</td>
    </tr>
    <tr>
      <th>2795</th>
      <td>경남</td>
      <td>전체</td>
      <td>2018</td>
      <td>6</td>
      <td>2,695.0</td>
      <td>8,893.5</td>
    </tr>
    <tr>
      <th>2800</th>
      <td>제주</td>
      <td>전체</td>
      <td>2018</td>
      <td>6</td>
      <td>3,925.0</td>
      <td>12,952.5</td>
    </tr>
  </tbody>
</table>
<p>561 rows × 6 columns</p>
</div>


```python
# regoin_year = region_year_all.pivot_table('평당분양가격', '지역명', '연도')
region_year = region_year_all.pivot_table('평당분양가격', '지역명', '연도').reset_index()
print(region_year.columns)
print(region_year.columns.name)
region_year.columns.name = ''
print(region_year.columns)
region_year
```

    Index(['지역명', '2015', '2016', '2017', '2018'], dtype='object', name='연도')
    연도
    Index(['지역명', '2015', '2016', '2017', '2018'], dtype='object', name='')



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
      <th>지역명</th>
      <th>2015</th>
      <th>2016</th>
      <th>2017</th>
      <th>2018</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>강원</td>
      <td>7,159.9</td>
      <td>7,011.1</td>
      <td>7,126.8</td>
      <td>7,642.8</td>
    </tr>
    <tr>
      <th>1</th>
      <td>경기</td>
      <td>10,377.4</td>
      <td>11,220.0</td>
      <td>11,850.0</td>
      <td>12,854.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>경남</td>
      <td>7,585.6</td>
      <td>7,847.9</td>
      <td>8,119.8</td>
      <td>8,894.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>경북</td>
      <td>7,170.9</td>
      <td>7,360.7</td>
      <td>7,794.9</td>
      <td>8,261.6</td>
    </tr>
    <tr>
      <th>4</th>
      <td>광주</td>
      <td>8,052.0</td>
      <td>8,898.7</td>
      <td>9,463.5</td>
      <td>9,629.9</td>
    </tr>
    <tr>
      <th>5</th>
      <td>대구</td>
      <td>9,232.3</td>
      <td>10,310.0</td>
      <td>11,455.8</td>
      <td>11,651.7</td>
    </tr>
    <tr>
      <th>6</th>
      <td>대전</td>
      <td>8,098.2</td>
      <td>8,501.6</td>
      <td>9,044.7</td>
      <td>9,588.7</td>
    </tr>
    <tr>
      <th>7</th>
      <td>부산</td>
      <td>10,307.0</td>
      <td>10,429.9</td>
      <td>11,577.9</td>
      <td>12,709.9</td>
    </tr>
    <tr>
      <th>8</th>
      <td>서울</td>
      <td>19,725.2</td>
      <td>20,663.5</td>
      <td>21,375.9</td>
      <td>22,299.2</td>
    </tr>
    <tr>
      <th>9</th>
      <td>세종</td>
      <td>8,750.5</td>
      <td>8,860.5</td>
      <td>9,135.3</td>
      <td>10,381.8</td>
    </tr>
    <tr>
      <th>10</th>
      <td>울산</td>
      <td>10,052.9</td>
      <td>10,208.6</td>
      <td>11,345.1</td>
      <td>10,440.6</td>
    </tr>
    <tr>
      <th>11</th>
      <td>인천</td>
      <td>10,484.1</td>
      <td>10,532.5</td>
      <td>10,736.7</td>
      <td>11,218.4</td>
    </tr>
    <tr>
      <th>12</th>
      <td>전남</td>
      <td>6,317.3</td>
      <td>6,488.6</td>
      <td>7,187.7</td>
      <td>7,794.1</td>
    </tr>
    <tr>
      <th>13</th>
      <td>전북</td>
      <td>6,703.4</td>
      <td>6,417.9</td>
      <td>7,057.8</td>
      <td>7,552.1</td>
    </tr>
    <tr>
      <th>14</th>
      <td>제주</td>
      <td>7,405.2</td>
      <td>9,129.2</td>
      <td>10,830.9</td>
      <td>12,740.8</td>
    </tr>
    <tr>
      <th>15</th>
      <td>충남</td>
      <td>7,114.8</td>
      <td>7,330.7</td>
      <td>7,456.2</td>
      <td>7,972.8</td>
    </tr>
    <tr>
      <th>16</th>
      <td>충북</td>
      <td>6,645.1</td>
      <td>6,770.2</td>
      <td>6,762.6</td>
      <td>7,893.1</td>
    </tr>
  </tbody>
</table>
</div>

전국 지역별 평당분양가격 변동 금액


```python
region_year['변동금액'] = region_year['2018'] - region_year['2015']
region_year
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
      <th>지역명</th>
      <th>2015</th>
      <th>2016</th>
      <th>2017</th>
      <th>2018</th>
      <th>변동금액</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>강원</td>
      <td>7,159.9</td>
      <td>7,011.1</td>
      <td>7,126.8</td>
      <td>7,642.8</td>
      <td>482.9</td>
    </tr>
    <tr>
      <th>1</th>
      <td>경기</td>
      <td>10,377.4</td>
      <td>11,220.0</td>
      <td>11,850.0</td>
      <td>12,854.0</td>
      <td>2,476.6</td>
    </tr>
    <tr>
      <th>2</th>
      <td>경남</td>
      <td>7,585.6</td>
      <td>7,847.9</td>
      <td>8,119.8</td>
      <td>8,894.0</td>
      <td>1,308.4</td>
    </tr>
    <tr>
      <th>3</th>
      <td>경북</td>
      <td>7,170.9</td>
      <td>7,360.7</td>
      <td>7,794.9</td>
      <td>8,261.6</td>
      <td>1,090.7</td>
    </tr>
    <tr>
      <th>4</th>
      <td>광주</td>
      <td>8,052.0</td>
      <td>8,898.7</td>
      <td>9,463.5</td>
      <td>9,629.9</td>
      <td>1,577.9</td>
    </tr>
    <tr>
      <th>5</th>
      <td>대구</td>
      <td>9,232.3</td>
      <td>10,310.0</td>
      <td>11,455.8</td>
      <td>11,651.7</td>
      <td>2,419.4</td>
    </tr>
    <tr>
      <th>6</th>
      <td>대전</td>
      <td>8,098.2</td>
      <td>8,501.6</td>
      <td>9,044.7</td>
      <td>9,588.7</td>
      <td>1,490.5</td>
    </tr>
    <tr>
      <th>7</th>
      <td>부산</td>
      <td>10,307.0</td>
      <td>10,429.9</td>
      <td>11,577.9</td>
      <td>12,709.9</td>
      <td>2,403.0</td>
    </tr>
    <tr>
      <th>8</th>
      <td>서울</td>
      <td>19,725.2</td>
      <td>20,663.5</td>
      <td>21,375.9</td>
      <td>22,299.2</td>
      <td>2,574.0</td>
    </tr>
    <tr>
      <th>9</th>
      <td>세종</td>
      <td>8,750.5</td>
      <td>8,860.5</td>
      <td>9,135.3</td>
      <td>10,381.8</td>
      <td>1,631.3</td>
    </tr>
    <tr>
      <th>10</th>
      <td>울산</td>
      <td>10,052.9</td>
      <td>10,208.6</td>
      <td>11,345.1</td>
      <td>10,440.6</td>
      <td>387.7</td>
    </tr>
    <tr>
      <th>11</th>
      <td>인천</td>
      <td>10,484.1</td>
      <td>10,532.5</td>
      <td>10,736.7</td>
      <td>11,218.4</td>
      <td>734.3</td>
    </tr>
    <tr>
      <th>12</th>
      <td>전남</td>
      <td>6,317.3</td>
      <td>6,488.6</td>
      <td>7,187.7</td>
      <td>7,794.1</td>
      <td>1,476.8</td>
    </tr>
    <tr>
      <th>13</th>
      <td>전북</td>
      <td>6,703.4</td>
      <td>6,417.9</td>
      <td>7,057.8</td>
      <td>7,552.1</td>
      <td>848.7</td>
    </tr>
    <tr>
      <th>14</th>
      <td>제주</td>
      <td>7,405.2</td>
      <td>9,129.2</td>
      <td>10,830.9</td>
      <td>12,740.8</td>
      <td>5,335.6</td>
    </tr>
    <tr>
      <th>15</th>
      <td>충남</td>
      <td>7,114.8</td>
      <td>7,330.7</td>
      <td>7,456.2</td>
      <td>7,972.8</td>
      <td>858.0</td>
    </tr>
    <tr>
      <th>16</th>
      <td>충북</td>
      <td>6,645.1</td>
      <td>6,770.2</td>
      <td>6,762.6</td>
      <td>7,893.1</td>
      <td>1,248.0</td>
    </tr>
  </tbody>
</table>
</div>


```python
# print(region_year['변동금액'].max())
# print(np.max(region_year['변동금액']))
max_delta_price = np.max(region_year['변동금액'])
print('2015년부터 2018년까지 분양가는 계속 상승했으며, 상승금액이 가장 큰 지역은 제주로 상승액은 평당 {:,.1f} 이다.'.
      format(max_delta_price))
```

    2015년부터 2018년까지 분양가는 계속 상승했으며, 상승금액이 가장 큰 지역은 제주로 상승액은 평당 5,335.6 이다.

```python
min_delta_price = np.min(region_year['변동금액'])
min_delta_price
```


    387.7499999999982


```python
mean_delta_price = np.mean(region_year['변동금액'])
mean_delta_price
```


    1667.276470588235

plotnine 패키지를 이용한 시각화


```python
# 전국 지역별 평균 분양 가격 시각화
# ggplot(데이터프레임, aes(x='x축 데이터', y='y축 데이터', fill='범례'))
# geom_bar(stat='identity'): 막대 그래프, position 옵션을 지정하지 않으면 누적 막대그래프가 작성되고 'dodge'로 지정하면 일반
# 막대 그래프가 작성된다.
ggplot(region_year_all, aes(x='지역명', y='평당분양가격', fill='연도')) \
    + geom_bar(stat='identity', position='dodge') \
    + ggtitle('2015 ~ 2018년 신규 민간 아파트 분양 가격') \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 6])
```


![png](output_33_0.png)
    

    <ggplot: (-9223371876932408660)>


```python
(ggplot(region_year_all, aes(x='지역명', y='평당분양가격', fill='연도'))
    + geom_bar(stat='identity', position='dodge')
    + ggtitle('2015 ~ 2018년 신규 민간 아파트 분양 가격')
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 6]))
```


![png](output_34_0.png)

    <ggplot: (159922603752)>


```python
# 규모별 지역별 평당분양가격 합계
pre_sale.pivot_table('평당분양가격', '규모구분', '지역명', sum)
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
      <th>지역명</th>
      <th>강원</th>
      <th>경기</th>
      <th>경남</th>
      <th>경북</th>
      <th>광주</th>
      <th>대구</th>
      <th>대전</th>
      <th>부산</th>
      <th>서울</th>
      <th>세종</th>
      <th>울산</th>
      <th>인천</th>
      <th>전남</th>
      <th>전북</th>
      <th>제주</th>
      <th>충남</th>
      <th>충북</th>
    </tr>
    <tr>
      <th>규모구분</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>전용면적 102㎡초과</th>
      <td>251,862.6</td>
      <td>435,246.9</td>
      <td>295,092.6</td>
      <td>274,744.8</td>
      <td>269,910.3</td>
      <td>393,699.9</td>
      <td>171,388.8</td>
      <td>402,675.9</td>
      <td>705,104.4</td>
      <td>296,280.6</td>
      <td>249,361.2</td>
      <td>428,904.3</td>
      <td>241,589.7</td>
      <td>249,381.0</td>
      <td>302,606.7</td>
      <td>271,256.7</td>
      <td>252,813.0</td>
    </tr>
    <tr>
      <th>전용면적 60㎡이하</th>
      <td>229,911.0</td>
      <td>393,587.7</td>
      <td>266,250.6</td>
      <td>244,675.2</td>
      <td>229,336.8</td>
      <td>360,112.5</td>
      <td>282,097.2</td>
      <td>341,002.2</td>
      <td>703,220.1</td>
      <td>253,984.5</td>
      <td>224,119.5</td>
      <td>347,298.6</td>
      <td>223,360.5</td>
      <td>229,878.0</td>
      <td>382,206.0</td>
      <td>248,707.8</td>
      <td>222,436.5</td>
    </tr>
    <tr>
      <th>전용면적 60㎡초과 85㎡이하</th>
      <td>230,914.2</td>
      <td>372,794.4</td>
      <td>258,815.7</td>
      <td>245,028.3</td>
      <td>293,092.8</td>
      <td>348,450.3</td>
      <td>280,919.1</td>
      <td>356,330.7</td>
      <td>662,966.7</td>
      <td>295,584.3</td>
      <td>340,827.3</td>
      <td>342,998.7</td>
      <td>222,182.4</td>
      <td>219,789.9</td>
      <td>317,047.5</td>
      <td>239,484.3</td>
      <td>224,594.7</td>
    </tr>
    <tr>
      <th>전용면적 85㎡초과 102㎡이하</th>
      <td>182,688.0</td>
      <td>384,918.6</td>
      <td>314,694.6</td>
      <td>219,407.1</td>
      <td>176,625.9</td>
      <td>227,924.4</td>
      <td>234,973.2</td>
      <td>351,063.9</td>
      <td>758,844.9</td>
      <td>294,726.3</td>
      <td>115,193.1</td>
      <td>361,142.1</td>
      <td>251,446.8</td>
      <td>232,158.3</td>
      <td>236,359.2</td>
      <td>236,662.8</td>
      <td>260,637.3</td>
    </tr>
    <tr>
      <th>전체</th>
      <td>229,864.8</td>
      <td>373,246.5</td>
      <td>259,614.3</td>
      <td>245,153.7</td>
      <td>292,818.9</td>
      <td>347,341.5</td>
      <td>283,338.0</td>
      <td>359,696.7</td>
      <td>676,067.7</td>
      <td>295,356.6</td>
      <td>340,101.3</td>
      <td>343,256.1</td>
      <td>222,644.4</td>
      <td>220,073.7</td>
      <td>327,350.1</td>
      <td>239,167.5</td>
      <td>222,924.9</td>
    </tr>
  </tbody>
</table>
</div>


```python
# 규모별 지역별 평당분양가격 합계 시각화
ggplot(pre_sale, aes(x='지역명', y='평당분양가격', fill='규모구분')) \
    + geom_bar(stat='identity', position='dodge') \
    + ggtitle('규모별 신규 민간 아파트 분양가격') \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 6])
```


![png](output_36_0.png)

    <ggplot: (159923720673)>


```python
# 위의 그래프를 지역별로 보자
ggplot(pre_sale, aes(x='연도', y='평당분양가격', fill='규모구분')) \
    + geom_bar(stat='identity', position='dodge') \
    + facet_wrap('지역명') \
    + ggtitle('규모별 신규 민간 아파트 분양가격') \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[18, 10], axis_text_x=element_text(rotation=45))
```


![png](output_37_0.png)  

    <ggplot: (-9223371876934239842)>


```python
# boxplot을 그려보자
ggplot(pre_sale, aes(x='지역명', y='평당분양가격', fill='규모구분')) \
    + geom_boxplot() \
    + ggtitle('규모별 신규 민간 아파트 분양가격') \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 6])
```


![png](output_38_0.png)
    

    <ggplot: (159922671494)>


```python
# 사업 규모가 가장 큰 서울
pre_sale_seoul = pre_sale[pre_sale['지역명'] == '서울']
pre_sale_seoul
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
      <th>지역명</th>
      <th>규모구분</th>
      <th>연도</th>
      <th>월</th>
      <th>분양가격(㎡)</th>
      <th>평당분양가격</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>서울</td>
      <td>전체</td>
      <td>2015</td>
      <td>10</td>
      <td>5,841.0</td>
      <td>19,275.3</td>
    </tr>
    <tr>
      <th>1</th>
      <td>서울</td>
      <td>전용면적 60㎡이하</td>
      <td>2015</td>
      <td>10</td>
      <td>5,652.0</td>
      <td>18,651.6</td>
    </tr>
    <tr>
      <th>2</th>
      <td>서울</td>
      <td>전용면적 60㎡초과 85㎡이하</td>
      <td>2015</td>
      <td>10</td>
      <td>5,882.0</td>
      <td>19,410.6</td>
    </tr>
    <tr>
      <th>3</th>
      <td>서울</td>
      <td>전용면적 85㎡초과 102㎡이하</td>
      <td>2015</td>
      <td>10</td>
      <td>5,721.0</td>
      <td>18,879.3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>서울</td>
      <td>전용면적 102㎡초과</td>
      <td>2015</td>
      <td>10</td>
      <td>5,879.0</td>
      <td>19,400.7</td>
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
      <th>2720</th>
      <td>서울</td>
      <td>전체</td>
      <td>2018</td>
      <td>6</td>
      <td>6,694.0</td>
      <td>22,090.2</td>
    </tr>
    <tr>
      <th>2721</th>
      <td>서울</td>
      <td>전용면적 60㎡이하</td>
      <td>2018</td>
      <td>6</td>
      <td>7,232.0</td>
      <td>23,865.6</td>
    </tr>
    <tr>
      <th>2722</th>
      <td>서울</td>
      <td>전용면적 60㎡초과 85㎡이하</td>
      <td>2018</td>
      <td>6</td>
      <td>6,739.0</td>
      <td>22,238.7</td>
    </tr>
    <tr>
      <th>2723</th>
      <td>서울</td>
      <td>전용면적 85㎡초과 102㎡이하</td>
      <td>2018</td>
      <td>6</td>
      <td>7,591.0</td>
      <td>25,050.3</td>
    </tr>
    <tr>
      <th>2724</th>
      <td>서울</td>
      <td>전용면적 102㎡초과</td>
      <td>2018</td>
      <td>6</td>
      <td>6,905.0</td>
      <td>22,786.5</td>
    </tr>
  </tbody>
</table>
<p>165 rows × 6 columns</p>
</div>


```python
ggplot(pre_sale_seoul, aes(x='연도', y='평당분양가격', fill='규모구분')) \
    + geom_boxplot() \
    + ggtitle('규모별 신규 민간 아파트 분양가격') \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 6])
```


![png](output_40_0.png)
    

    <ggplot: (-9223371876932144170)>


```python
# 분양가 차이가 가장 큰 제주
pre_sale_jeju = pre_sale[pre_sale['지역명'] == '제주']
pre_sale_jeju
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
      <th>지역명</th>
      <th>규모구분</th>
      <th>연도</th>
      <th>월</th>
      <th>분양가격(㎡)</th>
      <th>평당분양가격</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>80</th>
      <td>제주</td>
      <td>전체</td>
      <td>2015</td>
      <td>10</td>
      <td>2,232.0</td>
      <td>7,365.6</td>
    </tr>
    <tr>
      <th>81</th>
      <td>제주</td>
      <td>전용면적 60㎡이하</td>
      <td>2015</td>
      <td>10</td>
      <td>nan</td>
      <td>nan</td>
    </tr>
    <tr>
      <th>82</th>
      <td>제주</td>
      <td>전용면적 60㎡초과 85㎡이하</td>
      <td>2015</td>
      <td>10</td>
      <td>2,225.0</td>
      <td>7,342.5</td>
    </tr>
    <tr>
      <th>83</th>
      <td>제주</td>
      <td>전용면적 85㎡초과 102㎡이하</td>
      <td>2015</td>
      <td>10</td>
      <td>2,583.0</td>
      <td>8,523.9</td>
    </tr>
    <tr>
      <th>84</th>
      <td>제주</td>
      <td>전용면적 102㎡초과</td>
      <td>2015</td>
      <td>10</td>
      <td>2,574.0</td>
      <td>8,494.2</td>
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
      <th>2800</th>
      <td>제주</td>
      <td>전체</td>
      <td>2018</td>
      <td>6</td>
      <td>3,925.0</td>
      <td>12,952.5</td>
    </tr>
    <tr>
      <th>2801</th>
      <td>제주</td>
      <td>전용면적 60㎡이하</td>
      <td>2018</td>
      <td>6</td>
      <td>5,462.0</td>
      <td>18,024.6</td>
    </tr>
    <tr>
      <th>2802</th>
      <td>제주</td>
      <td>전용면적 60㎡초과 85㎡이하</td>
      <td>2018</td>
      <td>6</td>
      <td>3,639.0</td>
      <td>12,008.7</td>
    </tr>
    <tr>
      <th>2803</th>
      <td>제주</td>
      <td>전용면적 85㎡초과 102㎡이하</td>
      <td>2018</td>
      <td>6</td>
      <td>nan</td>
      <td>nan</td>
    </tr>
    <tr>
      <th>2804</th>
      <td>제주</td>
      <td>전용면적 102㎡초과</td>
      <td>2018</td>
      <td>6</td>
      <td>3,029.0</td>
      <td>9,995.7</td>
    </tr>
  </tbody>
</table>
<p>165 rows × 6 columns</p>
</div>


```python
ggplot(pre_sale_jeju, aes(x='연도', y='평당분양가격', fill='규모구분')) \
    + geom_boxplot() \
    + ggtitle('규모별 신규 민간 아파트 분양가격') \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 6])
```


![png](output_42_0.png)
    

    <ggplot: (159920748401)>


```python
# 분양가 차이가 가장 작은 울산
pre_sale_ulsan = pre_sale[pre_sale['지역명'] == '울산']
pre_sale_ulsan
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
      <th>지역명</th>
      <th>규모구분</th>
      <th>연도</th>
      <th>월</th>
      <th>분양가격(㎡)</th>
      <th>평당분양가격</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>35</th>
      <td>울산</td>
      <td>전체</td>
      <td>2015</td>
      <td>10</td>
      <td>3,053.0</td>
      <td>10,074.9</td>
    </tr>
    <tr>
      <th>36</th>
      <td>울산</td>
      <td>전용면적 60㎡이하</td>
      <td>2015</td>
      <td>10</td>
      <td>2,422.0</td>
      <td>7,992.6</td>
    </tr>
    <tr>
      <th>37</th>
      <td>울산</td>
      <td>전용면적 60㎡초과 85㎡이하</td>
      <td>2015</td>
      <td>10</td>
      <td>3,040.0</td>
      <td>10,032.0</td>
    </tr>
    <tr>
      <th>38</th>
      <td>울산</td>
      <td>전용면적 85㎡초과 102㎡이하</td>
      <td>2015</td>
      <td>10</td>
      <td>2,951.0</td>
      <td>9,738.3</td>
    </tr>
    <tr>
      <th>39</th>
      <td>울산</td>
      <td>전용면적 102㎡초과</td>
      <td>2015</td>
      <td>10</td>
      <td>2,690.0</td>
      <td>8,877.0</td>
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
      <th>2755</th>
      <td>울산</td>
      <td>전체</td>
      <td>2018</td>
      <td>6</td>
      <td>3,125.0</td>
      <td>10,312.5</td>
    </tr>
    <tr>
      <th>2756</th>
      <td>울산</td>
      <td>전용면적 60㎡이하</td>
      <td>2018</td>
      <td>6</td>
      <td>nan</td>
      <td>nan</td>
    </tr>
    <tr>
      <th>2757</th>
      <td>울산</td>
      <td>전용면적 60㎡초과 85㎡이하</td>
      <td>2018</td>
      <td>6</td>
      <td>3,125.0</td>
      <td>10,312.5</td>
    </tr>
    <tr>
      <th>2758</th>
      <td>울산</td>
      <td>전용면적 85㎡초과 102㎡이하</td>
      <td>2018</td>
      <td>6</td>
      <td>nan</td>
      <td>nan</td>
    </tr>
    <tr>
      <th>2759</th>
      <td>울산</td>
      <td>전용면적 102㎡초과</td>
      <td>2018</td>
      <td>6</td>
      <td>nan</td>
      <td>nan</td>
    </tr>
  </tbody>
</table>
<p>165 rows × 6 columns</p>
</div>


```python
ggplot(pre_sale_ulsan, aes(x='연도', y='평당분양가격', fill='규모구분')) \
    + geom_boxplot() \
    + ggtitle('규모별 신규 민간 아파트 분양가격') \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 6])
```


​    
![png](output_44_0.png)

    <ggplot: (159922955952)>
