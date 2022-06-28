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

전국 도시 공원 표준 데이터 => https://www.data.go.kr/dataset/15012890/standard.do


```python
park = pd.read_csv('./data/전국도시공원표준데이터.csv', encoding='euc-kr')
park.shape
```


    (18137, 20)


```python
park.head()
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
      <th>관리번호</th>
      <th>공원명</th>
      <th>공원구분</th>
      <th>소재지도로명주소</th>
      <th>소재지지번주소</th>
      <th>위도</th>
      <th>경도</th>
      <th>공원면적</th>
      <th>공원보유시설(운동시설)</th>
      <th>공원보유시설(유희시설)</th>
      <th>공원보유시설(편익시설)</th>
      <th>공원보유시설(교양시설)</th>
      <th>공원보유시설(기타시설)</th>
      <th>지정고시일</th>
      <th>관리기관명</th>
      <th>전화번호</th>
      <th>데이터기준일자</th>
      <th>제공기관코드</th>
      <th>제공기관명</th>
      <th>Unnamed: 19</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>26440-00001</td>
      <td>구랑공원</td>
      <td>문화공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 구랑동 1199-7</td>
      <td>35.157215</td>
      <td>128.854935</td>
      <td>9137.0</td>
      <td>4</td>
      <td>NaN</td>
      <td>화장실</td>
      <td>NaN</td>
      <td>팔각정자, 파고라2, 평의자6, 앉음벽14.38m, 축구장(골대2), 컨테이너, 안...</td>
      <td>2011-09-02</td>
      <td>부산광역시 강서구청 녹지공원과</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>26440-00002</td>
      <td>압곡공원</td>
      <td>근린공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 구랑동 1219</td>
      <td>35.154655</td>
      <td>128.854727</td>
      <td>33756.0</td>
      <td>4</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>배드민턴장, 족구장, 파고라4, 안내판, 볼라드7, 데크435.11㎡, 데크계단19...</td>
      <td>2008-02-28</td>
      <td>부산광역시 강서구청 녹지공원과</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2</th>
      <td>26440-00003</td>
      <td>서연정공원</td>
      <td>소공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 대저1동 1330-7</td>
      <td>35.216183</td>
      <td>128.969558</td>
      <td>646.0</td>
      <td>7</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>앉음벽13.57m, 트렐리스3, 안내판2, 플랜트2, 파고라, 평의자4</td>
      <td>2013-01-23</td>
      <td>부산광역시 강서구청 녹지공원과</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>3</th>
      <td>26440-00004</td>
      <td>용두공원</td>
      <td>어린이공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 대저2동 1870-67</td>
      <td>35.183679</td>
      <td>128.956007</td>
      <td>1620.0</td>
      <td>NaN</td>
      <td>조합놀이기구, 그네</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>정자, 농구장, 평의자6</td>
      <td>1998-07-25</td>
      <td>부산광역시 강서구청 녹지공원과</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>4</th>
      <td>26440-00005</td>
      <td>새동내공원</td>
      <td>어린이공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 대저2동 2407-1</td>
      <td>35.174568</td>
      <td>128.950612</td>
      <td>1009.0</td>
      <td>8</td>
      <td>조합놀이기구, 그네, 흔들놀이기구2</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>정자, 평의자14, 트렐리스2, 안내판, 볼라드</td>
      <td>1995-04-07</td>
      <td>부산광역시 강서구청 녹지공원과</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>


```python
park.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 18137 entries, 0 to 18136
    Data columns (total 20 columns):
     #   Column        Non-Null Count  Dtype  
    ---  ------        --------------  -----  
     0   관리번호          18137 non-null  object 
     1   공원명           18137 non-null  object 
     2   공원구분          18137 non-null  object 
     3   소재지도로명주소      8039 non-null   object 
     4   소재지지번주소       17158 non-null  object 
     5   위도            18137 non-null  float64
     6   경도            18137 non-null  float64
     7   공원면적          18137 non-null  float64
     8   공원보유시설(운동시설)  4845 non-null   object 
     9   공원보유시설(유희시설)  6964 non-null   object 
     10  공원보유시설(편익시설)  5084 non-null   object 
     11  공원보유시설(교양시설)  1160 non-null   object 
     12  공원보유시설(기타시설)  3116 non-null   object 
     13  지정고시일         15225 non-null  object 
     14  관리기관명         17383 non-null  object 
     15  전화번호          16957 non-null  object 
     16  데이터기준일자       18137 non-null  object 
     17  제공기관코드        18137 non-null  object 
     18  제공기관명         18137 non-null  object 
     19  Unnamed: 19   0 non-null      float64
    dtypes: float64(4), object(16)
    memory usage: 2.8+ MB

```python
park.isnull().sum()
```


    관리번호                0
    공원명                 0
    공원구분                0
    소재지도로명주소        10098
    소재지지번주소           979
    위도                  0
    경도                  0
    공원면적                0
    공원보유시설(운동시설)    13292
    공원보유시설(유희시설)    11173
    공원보유시설(편익시설)    13053
    공원보유시설(교양시설)    16977
    공원보유시설(기타시설)    15021
    지정고시일            2912
    관리기관명             754
    전화번호             1180
    데이터기준일자             0
    제공기관코드              0
    제공기관명               0
    Unnamed: 19     18137
    dtype: int64


```python
msno.matrix(park, figsize=[20, 8])
```


    <AxesSubplot:>


![output_6_1](../../images/2022-06-28-20_Data_Analysis_3/output_6_1.png){: width="100%" height="100%"}


    Index(['관리번호', '공원명', '공원구분', '소재지도로명주소', '소재지지번주소', '위도', '경도', '공원면적',
           '공원보유시설(운동시설)', '공원보유시설(유희시설)', '공원보유시설(편익시설)', '공원보유시설(교양시설)',
           '공원보유시설(기타시설)', '지정고시일', '관리기관명', '전화번호', '데이터기준일자', '제공기관코드', '제공기관명',
           'Unnamed: 19'],
          dtype='object')


```python
# drop() 함수로 불필요한 컬럼을 제거한다.
# columns 속성에 제거할 열 이름을 적는다. 단, 제거할 열이 2개 이상일 경으 []로 묶는다.
# inplace=True 속성을 지정하면 실행 결과가 데이터프레임에 바로 적용된다.
park.drop(columns=['공원보유시설(운동시설)', '공원보유시설(유희시설)', '공원보유시설(편익시설)', '공원보유시설(교양시설)',
                  '공원보유시설(기타시설)', '지정고시일', '관리기관명', 'Unnamed: 19'], inplace=True)
park
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
      <th>관리번호</th>
      <th>공원명</th>
      <th>공원구분</th>
      <th>소재지도로명주소</th>
      <th>소재지지번주소</th>
      <th>위도</th>
      <th>경도</th>
      <th>공원면적</th>
      <th>전화번호</th>
      <th>데이터기준일자</th>
      <th>제공기관코드</th>
      <th>제공기관명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>26440-00001</td>
      <td>구랑공원</td>
      <td>문화공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 구랑동 1199-7</td>
      <td>35.157215</td>
      <td>128.854935</td>
      <td>9137.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
    </tr>
    <tr>
      <th>1</th>
      <td>26440-00002</td>
      <td>압곡공원</td>
      <td>근린공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 구랑동 1219</td>
      <td>35.154655</td>
      <td>128.854727</td>
      <td>33756.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
    </tr>
    <tr>
      <th>2</th>
      <td>26440-00003</td>
      <td>서연정공원</td>
      <td>소공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 대저1동 1330-7</td>
      <td>35.216183</td>
      <td>128.969558</td>
      <td>646.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
    </tr>
    <tr>
      <th>3</th>
      <td>26440-00004</td>
      <td>용두공원</td>
      <td>어린이공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 대저2동 1870-67</td>
      <td>35.183679</td>
      <td>128.956007</td>
      <td>1620.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
    </tr>
    <tr>
      <th>4</th>
      <td>26440-00005</td>
      <td>새동내공원</td>
      <td>어린이공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 대저2동 2407-1</td>
      <td>35.174568</td>
      <td>128.950612</td>
      <td>1009.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
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
    </tr>
    <tr>
      <th>18132</th>
      <td>28140-00009</td>
      <td>송림4공원</td>
      <td>어린이공원</td>
      <td>NaN</td>
      <td>인천광역시 동구 송림동 291-6</td>
      <td>37.478715</td>
      <td>126.653257</td>
      <td>412.9</td>
      <td>032-770-6205</td>
      <td>2019-07-30</td>
      <td>3500000</td>
      <td>인천광역시 동구</td>
    </tr>
    <tr>
      <th>18133</th>
      <td>47760-00002</td>
      <td>서부공원</td>
      <td>근린공원</td>
      <td>NaN</td>
      <td>경상북도 영양군 영양읍 서부리 123</td>
      <td>36.660456</td>
      <td>129.114953</td>
      <td>56045.0</td>
      <td>054-680-6340</td>
      <td>2019-09-05</td>
      <td>5170000</td>
      <td>경상북도 영양군</td>
    </tr>
    <tr>
      <th>18134</th>
      <td>47760-00003</td>
      <td>입암공원</td>
      <td>근린공원</td>
      <td>NaN</td>
      <td>경상북도 영양군 입암면 신구리 산27-5</td>
      <td>36.594802</td>
      <td>129.093007</td>
      <td>109262.0</td>
      <td>054-680-6340</td>
      <td>2019-09-05</td>
      <td>5170000</td>
      <td>경상북도 영양군</td>
    </tr>
    <tr>
      <th>18135</th>
      <td>47760-00004</td>
      <td>수비공원</td>
      <td>근린공원</td>
      <td>NaN</td>
      <td>경상북도 영양군 수비면 발리리 산48</td>
      <td>36.761440</td>
      <td>129.200011</td>
      <td>67159.0</td>
      <td>054-680-6340</td>
      <td>2019-09-05</td>
      <td>5170000</td>
      <td>경상북도 영양군</td>
    </tr>
    <tr>
      <th>18136</th>
      <td>47760-00005</td>
      <td>삼지연꽃 테마파크</td>
      <td>수변공원</td>
      <td>NaN</td>
      <td>경상북도 영양군 영양읍 삼지리 200</td>
      <td>36.662816</td>
      <td>129.129372</td>
      <td>380000.0</td>
      <td>054-680-6340</td>
      <td>2019-09-05</td>
      <td>5170000</td>
      <td>경상북도 영양군</td>
    </tr>
  </tbody>
</table>
<p>18137 rows × 12 columns</p>
</div>


```python
msno.matrix(park, figsize=[14, 8])
```


    <AxesSubplot:>


![output_9_1](../../images/2022-06-28-20_Data_Analysis_3/output_9_1.png){: width="100%" height="100%"}


전국 공원 분포 시각화


```python
ggplot(park, aes(x='경도', y='위도')) \
    + geom_point(size=0.5) \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[7, 10])
```


![output_11_0](../../images/2022-06-28-20_Data_Analysis_3/output_11_0.png){: width="100%" height="100%"}

    <ggplot: (-9223371847520436883)>


```python
park.plot.scatter(x='경도', y='위도', grid=True, figsize=[7, 10], s=5)
```


    <AxesSubplot:xlabel='경도', ylabel='위도'>

![output_12_1](../../images/2022-06-28-20_Data_Analysis_3/output_12_1.png){: width="100%" height="100%"}


데이터 전처리


```python
park.dtypes
```


    관리번호         object
    공원명          object
    공원구분         object
    소재지도로명주소     object
    소재지지번주소      object
    위도          float64
    경도          float64
    공원면적        float64
    전화번호         object
    데이터기준일자      object
    제공기관코드       object
    제공기관명        object
    dtype: object


```python
park['공원면적'].head()
```


    0     9137.0
    1    33756.0
    2      646.0
    3     1620.0
    4     1009.0
    Name: 공원면적, dtype: float64


```python
# park['공원면적'] 열의 데이터가 처음부터 차례대로 lambda 뒤의 변수 x에 저장되면서 ':'뒤의 수식을 실행한다.
park['공원면적비율'] = park['공원면적'].apply(lambda x: np.sqrt(x) * 0.01)
park.head()
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
      <th>관리번호</th>
      <th>공원명</th>
      <th>공원구분</th>
      <th>소재지도로명주소</th>
      <th>소재지지번주소</th>
      <th>위도</th>
      <th>경도</th>
      <th>공원면적</th>
      <th>전화번호</th>
      <th>데이터기준일자</th>
      <th>제공기관코드</th>
      <th>제공기관명</th>
      <th>공원면적비율</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>26440-00001</td>
      <td>구랑공원</td>
      <td>문화공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 구랑동 1199-7</td>
      <td>35.157215</td>
      <td>128.854935</td>
      <td>9137.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.955877</td>
    </tr>
    <tr>
      <th>1</th>
      <td>26440-00002</td>
      <td>압곡공원</td>
      <td>근린공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 구랑동 1219</td>
      <td>35.154655</td>
      <td>128.854727</td>
      <td>33756.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>1.837281</td>
    </tr>
    <tr>
      <th>2</th>
      <td>26440-00003</td>
      <td>서연정공원</td>
      <td>소공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 대저1동 1330-7</td>
      <td>35.216183</td>
      <td>128.969558</td>
      <td>646.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.254165</td>
    </tr>
    <tr>
      <th>3</th>
      <td>26440-00004</td>
      <td>용두공원</td>
      <td>어린이공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 대저2동 1870-67</td>
      <td>35.183679</td>
      <td>128.956007</td>
      <td>1620.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.402492</td>
    </tr>
    <tr>
      <th>4</th>
      <td>26440-00005</td>
      <td>새동내공원</td>
      <td>어린이공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 대저2동 2407-1</td>
      <td>35.174568</td>
      <td>128.950612</td>
      <td>1009.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.317648</td>
    </tr>
  </tbody>
</table>
</div>


```python
# 도로명주소가 NaN인 데이터의 개수 => 지번주소만 입력된 데이터의 개수
# 도로명주소만 입력되고 지번주소가 입력되지 않은 데이터는 도로명주소 제도가 시행되고 난 후 조성된 공원이다.
park['소재지도로명주소'].isnull().sum()
```


    10098


```python
# 도로명주소는 입력되지 않고 지번주소만 입력된 데이터
# 판다스는 논리 연산자로 &(and)와 |(or)를 사용하고 논리 연산자 양쪽의 조건을 ()로 묶어준다.
park[(park['소재지도로명주소'].isnull()) & (park['소재지지번주소'].notnull())]
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
      <th>관리번호</th>
      <th>공원명</th>
      <th>공원구분</th>
      <th>소재지도로명주소</th>
      <th>소재지지번주소</th>
      <th>위도</th>
      <th>경도</th>
      <th>공원면적</th>
      <th>전화번호</th>
      <th>데이터기준일자</th>
      <th>제공기관코드</th>
      <th>제공기관명</th>
      <th>공원면적비율</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>26440-00001</td>
      <td>구랑공원</td>
      <td>문화공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 구랑동 1199-7</td>
      <td>35.157215</td>
      <td>128.854935</td>
      <td>9137.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.955877</td>
    </tr>
    <tr>
      <th>1</th>
      <td>26440-00002</td>
      <td>압곡공원</td>
      <td>근린공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 구랑동 1219</td>
      <td>35.154655</td>
      <td>128.854727</td>
      <td>33756.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>1.837281</td>
    </tr>
    <tr>
      <th>2</th>
      <td>26440-00003</td>
      <td>서연정공원</td>
      <td>소공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 대저1동 1330-7</td>
      <td>35.216183</td>
      <td>128.969558</td>
      <td>646.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.254165</td>
    </tr>
    <tr>
      <th>3</th>
      <td>26440-00004</td>
      <td>용두공원</td>
      <td>어린이공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 대저2동 1870-67</td>
      <td>35.183679</td>
      <td>128.956007</td>
      <td>1620.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.402492</td>
    </tr>
    <tr>
      <th>4</th>
      <td>26440-00005</td>
      <td>새동내공원</td>
      <td>어린이공원</td>
      <td>NaN</td>
      <td>부산광역시 강서구 대저2동 2407-1</td>
      <td>35.174568</td>
      <td>128.950612</td>
      <td>1009.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.317648</td>
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
      <th>18132</th>
      <td>28140-00009</td>
      <td>송림4공원</td>
      <td>어린이공원</td>
      <td>NaN</td>
      <td>인천광역시 동구 송림동 291-6</td>
      <td>37.478715</td>
      <td>126.653257</td>
      <td>412.9</td>
      <td>032-770-6205</td>
      <td>2019-07-30</td>
      <td>3500000</td>
      <td>인천광역시 동구</td>
      <td>0.203199</td>
    </tr>
    <tr>
      <th>18133</th>
      <td>47760-00002</td>
      <td>서부공원</td>
      <td>근린공원</td>
      <td>NaN</td>
      <td>경상북도 영양군 영양읍 서부리 123</td>
      <td>36.660456</td>
      <td>129.114953</td>
      <td>56045.0</td>
      <td>054-680-6340</td>
      <td>2019-09-05</td>
      <td>5170000</td>
      <td>경상북도 영양군</td>
      <td>2.367383</td>
    </tr>
    <tr>
      <th>18134</th>
      <td>47760-00003</td>
      <td>입암공원</td>
      <td>근린공원</td>
      <td>NaN</td>
      <td>경상북도 영양군 입암면 신구리 산27-5</td>
      <td>36.594802</td>
      <td>129.093007</td>
      <td>109262.0</td>
      <td>054-680-6340</td>
      <td>2019-09-05</td>
      <td>5170000</td>
      <td>경상북도 영양군</td>
      <td>3.305480</td>
    </tr>
    <tr>
      <th>18135</th>
      <td>47760-00004</td>
      <td>수비공원</td>
      <td>근린공원</td>
      <td>NaN</td>
      <td>경상북도 영양군 수비면 발리리 산48</td>
      <td>36.761440</td>
      <td>129.200011</td>
      <td>67159.0</td>
      <td>054-680-6340</td>
      <td>2019-09-05</td>
      <td>5170000</td>
      <td>경상북도 영양군</td>
      <td>2.591505</td>
    </tr>
    <tr>
      <th>18136</th>
      <td>47760-00005</td>
      <td>삼지연꽃 테마파크</td>
      <td>수변공원</td>
      <td>NaN</td>
      <td>경상북도 영양군 영양읍 삼지리 200</td>
      <td>36.662816</td>
      <td>129.129372</td>
      <td>380000.0</td>
      <td>054-680-6340</td>
      <td>2019-09-05</td>
      <td>5170000</td>
      <td>경상북도 영양군</td>
      <td>6.164414</td>
    </tr>
  </tbody>
</table>
<p>10098 rows × 13 columns</p>
</div>


```python
# 지번주소가 NaN인 데이터의 개수 => 도로명주소만 입력된 데이터의 개수
park['소재지지번주소'].isnull().sum()
```


    979


```python
# 도로명주소는 입력되고 지번주소가 입력되지 않은 데이터
park[(park['소재지도로명주소'].notnull()) & (park['소재지지번주소'].isnull())]
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
      <th>관리번호</th>
      <th>공원명</th>
      <th>공원구분</th>
      <th>소재지도로명주소</th>
      <th>소재지지번주소</th>
      <th>위도</th>
      <th>경도</th>
      <th>공원면적</th>
      <th>전화번호</th>
      <th>데이터기준일자</th>
      <th>제공기관코드</th>
      <th>제공기관명</th>
      <th>공원면적비율</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2132</th>
      <td>46130-00071</td>
      <td>오복공원</td>
      <td>근린공원</td>
      <td>전라남도 여수시 경호동 239번지</td>
      <td>NaN</td>
      <td>34.709529</td>
      <td>127.722047</td>
      <td>16036.0</td>
      <td>061-659-4627</td>
      <td>2019-06-13</td>
      <td>6460000</td>
      <td>전라남도</td>
      <td>1.266333</td>
    </tr>
    <tr>
      <th>2133</th>
      <td>46130-00072</td>
      <td>대경도공원</td>
      <td>근린공원</td>
      <td>전라남도 여수시 경호동 193-2</td>
      <td>NaN</td>
      <td>34.707635</td>
      <td>127.722798</td>
      <td>26384.0</td>
      <td>061-659-4627</td>
      <td>2019-06-13</td>
      <td>6460000</td>
      <td>전라남도</td>
      <td>1.624315</td>
    </tr>
    <tr>
      <th>2135</th>
      <td>46130-00076</td>
      <td>성산공원</td>
      <td>근린공원</td>
      <td>전라남도 여수시 화장동 949</td>
      <td>NaN</td>
      <td>34.774538</td>
      <td>127.645884</td>
      <td>70845.0</td>
      <td>061-659-4627</td>
      <td>2019-06-13</td>
      <td>6460000</td>
      <td>전라남도</td>
      <td>2.661672</td>
    </tr>
    <tr>
      <th>2137</th>
      <td>46130-00078</td>
      <td>주공공원</td>
      <td>어린이공원</td>
      <td>전라남도 여수시 신기동 4</td>
      <td>NaN</td>
      <td>34.765323</td>
      <td>127.676103</td>
      <td>1500.0</td>
      <td>061-659-4627</td>
      <td>2019-06-13</td>
      <td>6460000</td>
      <td>전라남도</td>
      <td>0.387298</td>
    </tr>
    <tr>
      <th>2138</th>
      <td>46130-00079</td>
      <td>들몰공원</td>
      <td>어린이공원</td>
      <td>전라남도 여수시 신기동 5</td>
      <td>NaN</td>
      <td>34.765144</td>
      <td>127.679023</td>
      <td>1500.0</td>
      <td>061-659-4627</td>
      <td>2019-06-13</td>
      <td>6460000</td>
      <td>전라남도</td>
      <td>0.387298</td>
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
      <th>18115</th>
      <td>44800-00078</td>
      <td>남당취락2소공원</td>
      <td>소공원</td>
      <td>충청남도 홍성군 서부면 남당리 859 일원</td>
      <td>NaN</td>
      <td>36.539355</td>
      <td>126.471621</td>
      <td>2395.0</td>
      <td>041-630-1268</td>
      <td>2019-06-25</td>
      <td>4600000</td>
      <td>충청남도 홍성군</td>
      <td>0.489387</td>
    </tr>
    <tr>
      <th>18116</th>
      <td>44800-00079</td>
      <td>옥암1호소공원</td>
      <td>소공원</td>
      <td>충청남도 홍성군 홍성읍 옥암리 148-8 일원</td>
      <td>NaN</td>
      <td>36.593251</td>
      <td>126.651456</td>
      <td>1142.0</td>
      <td>041-630-1268</td>
      <td>2019-06-25</td>
      <td>4600000</td>
      <td>충청남도 홍성군</td>
      <td>0.337935</td>
    </tr>
    <tr>
      <th>18117</th>
      <td>44800-00080</td>
      <td>옥암2호어린이공원</td>
      <td>어린이공원</td>
      <td>충청남도 홍성군 홍성읍 오관리 190 일원</td>
      <td>NaN</td>
      <td>36.599064</td>
      <td>126.663734</td>
      <td>1612.0</td>
      <td>041-630-1268</td>
      <td>2019-06-25</td>
      <td>4600000</td>
      <td>충청남도 홍성군</td>
      <td>0.401497</td>
    </tr>
    <tr>
      <th>18118</th>
      <td>44800-00081</td>
      <td>옥암1호어린이공원</td>
      <td>어린이공원</td>
      <td>충청남도 홍성군 홍성읍 옥암리 381-3 일원</td>
      <td>NaN</td>
      <td>36.587390</td>
      <td>126.646558</td>
      <td>1586.0</td>
      <td>041-630-1268</td>
      <td>2019-06-25</td>
      <td>4600000</td>
      <td>충청남도 홍성군</td>
      <td>0.398246</td>
    </tr>
    <tr>
      <th>18119</th>
      <td>44800-00082</td>
      <td>홍성읍24호소공원</td>
      <td>소공원</td>
      <td>충청남도 홍성군 홍성읍 오관리 472 일원</td>
      <td>NaN</td>
      <td>36.599064</td>
      <td>126.663734</td>
      <td>701.0</td>
      <td>041-630-1268</td>
      <td>2019-06-25</td>
      <td>4600000</td>
      <td>충청남도 홍성군</td>
      <td>0.264764</td>
    </tr>
  </tbody>
</table>
<p>979 rows × 13 columns</p>
</div>


```python
# 도로명주소와 지번주소가 모두 입력된 데이터
park[(park['소재지도로명주소'].notnull()) & (park['소재지지번주소'].notnull())]
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
      <th>관리번호</th>
      <th>공원명</th>
      <th>공원구분</th>
      <th>소재지도로명주소</th>
      <th>소재지지번주소</th>
      <th>위도</th>
      <th>경도</th>
      <th>공원면적</th>
      <th>전화번호</th>
      <th>데이터기준일자</th>
      <th>제공기관코드</th>
      <th>제공기관명</th>
      <th>공원면적비율</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>22</th>
      <td>26440-00023</td>
      <td>명지공원</td>
      <td>근린공원</td>
      <td>부산광역시 강서구 명지오션시티7로 30 (명지동)</td>
      <td>부산광역시 강서구 명지동 3247번지</td>
      <td>35.087766</td>
      <td>128.908524</td>
      <td>170405.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>4.128014</td>
    </tr>
    <tr>
      <th>23</th>
      <td>26440-00024</td>
      <td>철새탐방공원</td>
      <td>문화공원</td>
      <td>부산광역시 강서구 명지오션시티1로 284 (명지동)</td>
      <td>부산광역시 강서구 명지동 3308-3</td>
      <td>35.084080</td>
      <td>128.911810</td>
      <td>1344.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.366606</td>
    </tr>
    <tr>
      <th>32</th>
      <td>26440-00033</td>
      <td>보람공원</td>
      <td>근린공원</td>
      <td>부산광역시 강서구 녹산산단262로14번길 20 (송정동)</td>
      <td>부산광역시 강서구 송정동 1718</td>
      <td>35.088095</td>
      <td>128.843216</td>
      <td>27739.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>1.665503</td>
    </tr>
    <tr>
      <th>38</th>
      <td>26440-00039</td>
      <td>지사공원(2호근린공원)</td>
      <td>근린공원</td>
      <td>부산광역시 강서구 과학산단2로20번길 7-7 (지사동)</td>
      <td>부산광역시 강서구 지사동 1180</td>
      <td>35.151337</td>
      <td>128.831400</td>
      <td>11232.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>1.059811</td>
    </tr>
    <tr>
      <th>44</th>
      <td>26440-00045</td>
      <td>화암공원</td>
      <td>근린공원</td>
      <td>부산광역시 강서구 화전산단5로 131 (화전동)</td>
      <td>부산광역시 강서구 화전동 554-3</td>
      <td>35.110563</td>
      <td>128.877536</td>
      <td>21908.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>1.480135</td>
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
      <th>18027</th>
      <td>11590-00040</td>
      <td>국화원</td>
      <td>소공원</td>
      <td>서울특별시 동작구 상도로30길 39(상도동, 상도두산위브아파트)</td>
      <td>서울특별시 동작구 상도동 529 상도두산위브아파트</td>
      <td>37.504836</td>
      <td>126.943714</td>
      <td>757.0</td>
      <td>NaN</td>
      <td>2019-02-20</td>
      <td>3190000</td>
      <td>서울특별시 동작구</td>
      <td>0.275136</td>
    </tr>
    <tr>
      <th>18121</th>
      <td>28140-00011</td>
      <td>창영공원</td>
      <td>어린이공원</td>
      <td>인천광역시 동구 우각로 26</td>
      <td>인천광역시 동구 창영동 21-15</td>
      <td>37.470778</td>
      <td>126.639105</td>
      <td>1019.8</td>
      <td>032-770-6205</td>
      <td>2019-07-30</td>
      <td>3500000</td>
      <td>인천광역시 동구</td>
      <td>0.319343</td>
    </tr>
    <tr>
      <th>18125</th>
      <td>28140-00002</td>
      <td>화도진공원</td>
      <td>근린공원</td>
      <td>인천광역시 동구 화도진로 114</td>
      <td>인천광역시 동구 화수동 140-1</td>
      <td>37.481481</td>
      <td>126.628353</td>
      <td>20830.0</td>
      <td>032-770-6202</td>
      <td>2019-07-30</td>
      <td>3500000</td>
      <td>인천광역시 동구</td>
      <td>1.443260</td>
    </tr>
    <tr>
      <th>18126</th>
      <td>28140-00003</td>
      <td>인천교공원(A,B블럭)</td>
      <td>근린공원</td>
      <td>인천광역시 동구 방축로 231</td>
      <td>인천광역시 동구 송림동 318</td>
      <td>37.477844</td>
      <td>126.669618</td>
      <td>94068.0</td>
      <td>032-770-6203</td>
      <td>2019-07-30</td>
      <td>3500000</td>
      <td>인천광역시 동구</td>
      <td>3.067051</td>
    </tr>
    <tr>
      <th>18128</th>
      <td>28140-00005</td>
      <td>송현공원</td>
      <td>근린공원</td>
      <td>인천광역시 동구 솔빛로 51</td>
      <td>인천광역시 동구 송현동 163</td>
      <td>37.477773</td>
      <td>126.639225</td>
      <td>72492.0</td>
      <td>032-770-6204</td>
      <td>2019-07-30</td>
      <td>3500000</td>
      <td>인천광역시 동구</td>
      <td>2.692434</td>
    </tr>
  </tbody>
</table>
<p>7060 rows × 13 columns</p>
</div>


```python
# 도로명주소와 지번주소가 모두 입력되지 않은 데이터
park[(park['소재지도로명주소'].isnull()) & (park['소재지지번주소'].isnull())]
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
      <th>관리번호</th>
      <th>공원명</th>
      <th>공원구분</th>
      <th>소재지도로명주소</th>
      <th>소재지지번주소</th>
      <th>위도</th>
      <th>경도</th>
      <th>공원면적</th>
      <th>전화번호</th>
      <th>데이터기준일자</th>
      <th>제공기관코드</th>
      <th>제공기관명</th>
      <th>공원면적비율</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>
</div>


```python
# 도로명주소가 NaN인 데이터를 지번주소로 채운다.
park['소재지도로명주소'].fillna(park['소재지지번주소'], inplace=True)
park
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
      <th>관리번호</th>
      <th>공원명</th>
      <th>공원구분</th>
      <th>소재지도로명주소</th>
      <th>소재지지번주소</th>
      <th>위도</th>
      <th>경도</th>
      <th>공원면적</th>
      <th>전화번호</th>
      <th>데이터기준일자</th>
      <th>제공기관코드</th>
      <th>제공기관명</th>
      <th>공원면적비율</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>26440-00001</td>
      <td>구랑공원</td>
      <td>문화공원</td>
      <td>부산광역시 강서구 구랑동 1199-7</td>
      <td>부산광역시 강서구 구랑동 1199-7</td>
      <td>35.157215</td>
      <td>128.854935</td>
      <td>9137.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.955877</td>
    </tr>
    <tr>
      <th>1</th>
      <td>26440-00002</td>
      <td>압곡공원</td>
      <td>근린공원</td>
      <td>부산광역시 강서구 구랑동 1219</td>
      <td>부산광역시 강서구 구랑동 1219</td>
      <td>35.154655</td>
      <td>128.854727</td>
      <td>33756.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>1.837281</td>
    </tr>
    <tr>
      <th>2</th>
      <td>26440-00003</td>
      <td>서연정공원</td>
      <td>소공원</td>
      <td>부산광역시 강서구 대저1동 1330-7</td>
      <td>부산광역시 강서구 대저1동 1330-7</td>
      <td>35.216183</td>
      <td>128.969558</td>
      <td>646.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.254165</td>
    </tr>
    <tr>
      <th>3</th>
      <td>26440-00004</td>
      <td>용두공원</td>
      <td>어린이공원</td>
      <td>부산광역시 강서구 대저2동 1870-67</td>
      <td>부산광역시 강서구 대저2동 1870-67</td>
      <td>35.183679</td>
      <td>128.956007</td>
      <td>1620.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.402492</td>
    </tr>
    <tr>
      <th>4</th>
      <td>26440-00005</td>
      <td>새동내공원</td>
      <td>어린이공원</td>
      <td>부산광역시 강서구 대저2동 2407-1</td>
      <td>부산광역시 강서구 대저2동 2407-1</td>
      <td>35.174568</td>
      <td>128.950612</td>
      <td>1009.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.317648</td>
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
      <th>18132</th>
      <td>28140-00009</td>
      <td>송림4공원</td>
      <td>어린이공원</td>
      <td>인천광역시 동구 송림동 291-6</td>
      <td>인천광역시 동구 송림동 291-6</td>
      <td>37.478715</td>
      <td>126.653257</td>
      <td>412.9</td>
      <td>032-770-6205</td>
      <td>2019-07-30</td>
      <td>3500000</td>
      <td>인천광역시 동구</td>
      <td>0.203199</td>
    </tr>
    <tr>
      <th>18133</th>
      <td>47760-00002</td>
      <td>서부공원</td>
      <td>근린공원</td>
      <td>경상북도 영양군 영양읍 서부리 123</td>
      <td>경상북도 영양군 영양읍 서부리 123</td>
      <td>36.660456</td>
      <td>129.114953</td>
      <td>56045.0</td>
      <td>054-680-6340</td>
      <td>2019-09-05</td>
      <td>5170000</td>
      <td>경상북도 영양군</td>
      <td>2.367383</td>
    </tr>
    <tr>
      <th>18134</th>
      <td>47760-00003</td>
      <td>입암공원</td>
      <td>근린공원</td>
      <td>경상북도 영양군 입암면 신구리 산27-5</td>
      <td>경상북도 영양군 입암면 신구리 산27-5</td>
      <td>36.594802</td>
      <td>129.093007</td>
      <td>109262.0</td>
      <td>054-680-6340</td>
      <td>2019-09-05</td>
      <td>5170000</td>
      <td>경상북도 영양군</td>
      <td>3.305480</td>
    </tr>
    <tr>
      <th>18135</th>
      <td>47760-00004</td>
      <td>수비공원</td>
      <td>근린공원</td>
      <td>경상북도 영양군 수비면 발리리 산48</td>
      <td>경상북도 영양군 수비면 발리리 산48</td>
      <td>36.761440</td>
      <td>129.200011</td>
      <td>67159.0</td>
      <td>054-680-6340</td>
      <td>2019-09-05</td>
      <td>5170000</td>
      <td>경상북도 영양군</td>
      <td>2.591505</td>
    </tr>
    <tr>
      <th>18136</th>
      <td>47760-00005</td>
      <td>삼지연꽃 테마파크</td>
      <td>수변공원</td>
      <td>경상북도 영양군 영양읍 삼지리 200</td>
      <td>경상북도 영양군 영양읍 삼지리 200</td>
      <td>36.662816</td>
      <td>129.129372</td>
      <td>380000.0</td>
      <td>054-680-6340</td>
      <td>2019-09-05</td>
      <td>5170000</td>
      <td>경상북도 영양군</td>
      <td>6.164414</td>
    </tr>
  </tbody>
</table>
<p>18137 rows × 13 columns</p>
</div>


```python
park['소재지도로명주소'].isnull().sum()
```


    0


```python
# split() 함수 실행시 expand=True 옵션을 지정하면 데이터프레임으로 분리되서 인덱싱과 슬라이싱을 할 수 있다.
park['소재지도로명주소'].str.split(' ', expand=True)
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
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
      <th>6</th>
      <th>7</th>
      <th>8</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>부산광역시</td>
      <td>강서구</td>
      <td>구랑동</td>
      <td>1199-7</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>1</th>
      <td>부산광역시</td>
      <td>강서구</td>
      <td>구랑동</td>
      <td>1219</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2</th>
      <td>부산광역시</td>
      <td>강서구</td>
      <td>대저1동</td>
      <td>1330-7</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>3</th>
      <td>부산광역시</td>
      <td>강서구</td>
      <td>대저2동</td>
      <td>1870-67</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>4</th>
      <td>부산광역시</td>
      <td>강서구</td>
      <td>대저2동</td>
      <td>2407-1</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
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
    </tr>
    <tr>
      <th>18132</th>
      <td>인천광역시</td>
      <td>동구</td>
      <td>송림동</td>
      <td>291-6</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>18133</th>
      <td>경상북도</td>
      <td>영양군</td>
      <td>영양읍</td>
      <td>서부리</td>
      <td>123</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>18134</th>
      <td>경상북도</td>
      <td>영양군</td>
      <td>입암면</td>
      <td>신구리</td>
      <td>산27-5</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>18135</th>
      <td>경상북도</td>
      <td>영양군</td>
      <td>수비면</td>
      <td>발리리</td>
      <td>산48</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>18136</th>
      <td>경상북도</td>
      <td>영양군</td>
      <td>영양읍</td>
      <td>삼지리</td>
      <td>200</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
  </tbody>
</table>
<p>18137 rows × 9 columns</p>
</div>


```python
# 도로명주소에서 '시도'만 추출해서 '시도'라는 열을 만들어 park 데이터프레임에 추가한다.
park['시도'] = park['소재지도로명주소'].str.split(' ', expand=True)[0]
park.head()
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
      <th>관리번호</th>
      <th>공원명</th>
      <th>공원구분</th>
      <th>소재지도로명주소</th>
      <th>소재지지번주소</th>
      <th>위도</th>
      <th>경도</th>
      <th>공원면적</th>
      <th>전화번호</th>
      <th>데이터기준일자</th>
      <th>제공기관코드</th>
      <th>제공기관명</th>
      <th>공원면적비율</th>
      <th>시도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>26440-00001</td>
      <td>구랑공원</td>
      <td>문화공원</td>
      <td>부산광역시 강서구 구랑동 1199-7</td>
      <td>부산광역시 강서구 구랑동 1199-7</td>
      <td>35.157215</td>
      <td>128.854935</td>
      <td>9137.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.955877</td>
      <td>부산광역시</td>
    </tr>
    <tr>
      <th>1</th>
      <td>26440-00002</td>
      <td>압곡공원</td>
      <td>근린공원</td>
      <td>부산광역시 강서구 구랑동 1219</td>
      <td>부산광역시 강서구 구랑동 1219</td>
      <td>35.154655</td>
      <td>128.854727</td>
      <td>33756.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>1.837281</td>
      <td>부산광역시</td>
    </tr>
    <tr>
      <th>2</th>
      <td>26440-00003</td>
      <td>서연정공원</td>
      <td>소공원</td>
      <td>부산광역시 강서구 대저1동 1330-7</td>
      <td>부산광역시 강서구 대저1동 1330-7</td>
      <td>35.216183</td>
      <td>128.969558</td>
      <td>646.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.254165</td>
      <td>부산광역시</td>
    </tr>
    <tr>
      <th>3</th>
      <td>26440-00004</td>
      <td>용두공원</td>
      <td>어린이공원</td>
      <td>부산광역시 강서구 대저2동 1870-67</td>
      <td>부산광역시 강서구 대저2동 1870-67</td>
      <td>35.183679</td>
      <td>128.956007</td>
      <td>1620.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.402492</td>
      <td>부산광역시</td>
    </tr>
    <tr>
      <th>4</th>
      <td>26440-00005</td>
      <td>새동내공원</td>
      <td>어린이공원</td>
      <td>부산광역시 강서구 대저2동 2407-1</td>
      <td>부산광역시 강서구 대저2동 2407-1</td>
      <td>35.174568</td>
      <td>128.950612</td>
      <td>1009.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.317648</td>
      <td>부산광역시</td>
    </tr>
  </tbody>
</table>
</div>


```python
# 도로명주소에서 '구군'만 추출해서 '구군'이라는 열을 만들어 park 데이터프레임에 추가한다.
park['구군'] = park['소재지도로명주소'].str.split(' ', expand=True)[1]
park.head()
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
      <th>관리번호</th>
      <th>공원명</th>
      <th>공원구분</th>
      <th>소재지도로명주소</th>
      <th>소재지지번주소</th>
      <th>위도</th>
      <th>경도</th>
      <th>공원면적</th>
      <th>전화번호</th>
      <th>데이터기준일자</th>
      <th>제공기관코드</th>
      <th>제공기관명</th>
      <th>공원면적비율</th>
      <th>시도</th>
      <th>구군</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>26440-00001</td>
      <td>구랑공원</td>
      <td>문화공원</td>
      <td>부산광역시 강서구 구랑동 1199-7</td>
      <td>부산광역시 강서구 구랑동 1199-7</td>
      <td>35.157215</td>
      <td>128.854935</td>
      <td>9137.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.955877</td>
      <td>부산광역시</td>
      <td>강서구</td>
    </tr>
    <tr>
      <th>1</th>
      <td>26440-00002</td>
      <td>압곡공원</td>
      <td>근린공원</td>
      <td>부산광역시 강서구 구랑동 1219</td>
      <td>부산광역시 강서구 구랑동 1219</td>
      <td>35.154655</td>
      <td>128.854727</td>
      <td>33756.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>1.837281</td>
      <td>부산광역시</td>
      <td>강서구</td>
    </tr>
    <tr>
      <th>2</th>
      <td>26440-00003</td>
      <td>서연정공원</td>
      <td>소공원</td>
      <td>부산광역시 강서구 대저1동 1330-7</td>
      <td>부산광역시 강서구 대저1동 1330-7</td>
      <td>35.216183</td>
      <td>128.969558</td>
      <td>646.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.254165</td>
      <td>부산광역시</td>
      <td>강서구</td>
    </tr>
    <tr>
      <th>3</th>
      <td>26440-00004</td>
      <td>용두공원</td>
      <td>어린이공원</td>
      <td>부산광역시 강서구 대저2동 1870-67</td>
      <td>부산광역시 강서구 대저2동 1870-67</td>
      <td>35.183679</td>
      <td>128.956007</td>
      <td>1620.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.402492</td>
      <td>부산광역시</td>
      <td>강서구</td>
    </tr>
    <tr>
      <th>4</th>
      <td>26440-00005</td>
      <td>새동내공원</td>
      <td>어린이공원</td>
      <td>부산광역시 강서구 대저2동 2407-1</td>
      <td>부산광역시 강서구 대저2동 2407-1</td>
      <td>35.174568</td>
      <td>128.950612</td>
      <td>1009.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.317648</td>
      <td>부산광역시</td>
      <td>강서구</td>
    </tr>
  </tbody>
</table>
</div>


```python
# 도로명주소에서 '읍면동'만 추출해서 '읍면동'이라는 열을 만들어 park 데이터프레임에 추가한다.
park['읍면동'] = park['소재지도로명주소'].str.split(' ', expand=True)[2]
park.head()
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
      <th>관리번호</th>
      <th>공원명</th>
      <th>공원구분</th>
      <th>소재지도로명주소</th>
      <th>소재지지번주소</th>
      <th>위도</th>
      <th>경도</th>
      <th>공원면적</th>
      <th>전화번호</th>
      <th>데이터기준일자</th>
      <th>제공기관코드</th>
      <th>제공기관명</th>
      <th>공원면적비율</th>
      <th>시도</th>
      <th>구군</th>
      <th>읍면동</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>26440-00001</td>
      <td>구랑공원</td>
      <td>문화공원</td>
      <td>부산광역시 강서구 구랑동 1199-7</td>
      <td>부산광역시 강서구 구랑동 1199-7</td>
      <td>35.157215</td>
      <td>128.854935</td>
      <td>9137.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.955877</td>
      <td>부산광역시</td>
      <td>강서구</td>
      <td>구랑동</td>
    </tr>
    <tr>
      <th>1</th>
      <td>26440-00002</td>
      <td>압곡공원</td>
      <td>근린공원</td>
      <td>부산광역시 강서구 구랑동 1219</td>
      <td>부산광역시 강서구 구랑동 1219</td>
      <td>35.154655</td>
      <td>128.854727</td>
      <td>33756.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>1.837281</td>
      <td>부산광역시</td>
      <td>강서구</td>
      <td>구랑동</td>
    </tr>
    <tr>
      <th>2</th>
      <td>26440-00003</td>
      <td>서연정공원</td>
      <td>소공원</td>
      <td>부산광역시 강서구 대저1동 1330-7</td>
      <td>부산광역시 강서구 대저1동 1330-7</td>
      <td>35.216183</td>
      <td>128.969558</td>
      <td>646.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.254165</td>
      <td>부산광역시</td>
      <td>강서구</td>
      <td>대저1동</td>
    </tr>
    <tr>
      <th>3</th>
      <td>26440-00004</td>
      <td>용두공원</td>
      <td>어린이공원</td>
      <td>부산광역시 강서구 대저2동 1870-67</td>
      <td>부산광역시 강서구 대저2동 1870-67</td>
      <td>35.183679</td>
      <td>128.956007</td>
      <td>1620.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.402492</td>
      <td>부산광역시</td>
      <td>강서구</td>
      <td>대저2동</td>
    </tr>
    <tr>
      <th>4</th>
      <td>26440-00005</td>
      <td>새동내공원</td>
      <td>어린이공원</td>
      <td>부산광역시 강서구 대저2동 2407-1</td>
      <td>부산광역시 강서구 대저2동 2407-1</td>
      <td>35.174568</td>
      <td>128.950612</td>
      <td>1009.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.317648</td>
      <td>부산광역시</td>
      <td>강서구</td>
      <td>대저2동</td>
    </tr>
  </tbody>
</table>
</div>


```python
park[['위도', '경도']].describe()
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
      <th>위도</th>
      <th>경도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>18137.000000</td>
      <td>18137.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>36.335922</td>
      <td>127.543937</td>
    </tr>
    <tr>
      <th>std</th>
      <td>1.051835</td>
      <td>0.892670</td>
    </tr>
    <tr>
      <th>min</th>
      <td>27.551606</td>
      <td>125.430955</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>35.275430</td>
      <td>126.872301</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>36.364729</td>
      <td>127.130926</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>37.404278</td>
      <td>128.466193</td>
    </tr>
    <tr>
      <th>max</th>
      <td>38.224926</td>
      <td>137.202661</td>
    </tr>
  </tbody>
</table>
</div>


```python
# 위도와 경도가 잘못 입력된 데이터를 추출한다.
park_error = park[(park['위도'] < 32) | (park['경도'] > 132)]
park_error
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
      <th>관리번호</th>
      <th>공원명</th>
      <th>공원구분</th>
      <th>소재지도로명주소</th>
      <th>소재지지번주소</th>
      <th>위도</th>
      <th>경도</th>
      <th>공원면적</th>
      <th>전화번호</th>
      <th>데이터기준일자</th>
      <th>제공기관코드</th>
      <th>제공기관명</th>
      <th>공원면적비율</th>
      <th>시도</th>
      <th>구군</th>
      <th>읍면동</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>374</th>
      <td>11440-00004</td>
      <td>와우공원</td>
      <td>근린공원</td>
      <td>서울특별시 마포구 창전동3-231 등 59필지</td>
      <td>서울특별시 마포구 창전동3-231 등 59필지</td>
      <td>27.551606</td>
      <td>126.929047</td>
      <td>73590.0</td>
      <td>02-3153-9553</td>
      <td>2019-07-22</td>
      <td>3130000</td>
      <td>서울특별시 마포구</td>
      <td>2.712748</td>
      <td>서울특별시</td>
      <td>마포구</td>
      <td>창전동3-231</td>
    </tr>
    <tr>
      <th>12926</th>
      <td>43113-00080</td>
      <td>근린공원5(만수공원)</td>
      <td>근린공원</td>
      <td>충청북도 청주시 흥덕구 오송읍 만수리 512</td>
      <td>충청북도 청주시 흥덕구 오송읍 만수리 512</td>
      <td>36.374204</td>
      <td>137.202661</td>
      <td>33258.0</td>
      <td>043-201-4433</td>
      <td>2019-06-21</td>
      <td>5710000</td>
      <td>충청북도 청주시</td>
      <td>1.823678</td>
      <td>충청북도</td>
      <td>청주시</td>
      <td>흥덕구</td>
    </tr>
  </tbody>
</table>
</div>


```python
# 올바른 데이터
park_ok = park[(park['위도'] >= 32) & (park['경도'] <= 132)]
park_ok.shape
```


    (18135, 16)


```python
park_ok.head()
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
      <th>관리번호</th>
      <th>공원명</th>
      <th>공원구분</th>
      <th>소재지도로명주소</th>
      <th>소재지지번주소</th>
      <th>위도</th>
      <th>경도</th>
      <th>공원면적</th>
      <th>전화번호</th>
      <th>데이터기준일자</th>
      <th>제공기관코드</th>
      <th>제공기관명</th>
      <th>공원면적비율</th>
      <th>시도</th>
      <th>구군</th>
      <th>읍면동</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>26440-00001</td>
      <td>구랑공원</td>
      <td>문화공원</td>
      <td>부산광역시 강서구 구랑동 1199-7</td>
      <td>부산광역시 강서구 구랑동 1199-7</td>
      <td>35.157215</td>
      <td>128.854935</td>
      <td>9137.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.955877</td>
      <td>부산광역시</td>
      <td>강서구</td>
      <td>구랑동</td>
    </tr>
    <tr>
      <th>1</th>
      <td>26440-00002</td>
      <td>압곡공원</td>
      <td>근린공원</td>
      <td>부산광역시 강서구 구랑동 1219</td>
      <td>부산광역시 강서구 구랑동 1219</td>
      <td>35.154655</td>
      <td>128.854727</td>
      <td>33756.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>1.837281</td>
      <td>부산광역시</td>
      <td>강서구</td>
      <td>구랑동</td>
    </tr>
    <tr>
      <th>2</th>
      <td>26440-00003</td>
      <td>서연정공원</td>
      <td>소공원</td>
      <td>부산광역시 강서구 대저1동 1330-7</td>
      <td>부산광역시 강서구 대저1동 1330-7</td>
      <td>35.216183</td>
      <td>128.969558</td>
      <td>646.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.254165</td>
      <td>부산광역시</td>
      <td>강서구</td>
      <td>대저1동</td>
    </tr>
    <tr>
      <th>3</th>
      <td>26440-00004</td>
      <td>용두공원</td>
      <td>어린이공원</td>
      <td>부산광역시 강서구 대저2동 1870-67</td>
      <td>부산광역시 강서구 대저2동 1870-67</td>
      <td>35.183679</td>
      <td>128.956007</td>
      <td>1620.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.402492</td>
      <td>부산광역시</td>
      <td>강서구</td>
      <td>대저2동</td>
    </tr>
    <tr>
      <th>4</th>
      <td>26440-00005</td>
      <td>새동내공원</td>
      <td>어린이공원</td>
      <td>부산광역시 강서구 대저2동 2407-1</td>
      <td>부산광역시 강서구 대저2동 2407-1</td>
      <td>35.174568</td>
      <td>128.950612</td>
      <td>1009.0</td>
      <td>051-970-4536</td>
      <td>2019-05-02</td>
      <td>3360000</td>
      <td>부산광역시 강서구</td>
      <td>0.317648</td>
      <td>부산광역시</td>
      <td>강서구</td>
      <td>대저2동</td>
    </tr>
  </tbody>
</table>
</div>


```python
park_ok['시도'].value_counts()
```


    경기도        3318
    전라남도       1882
    경상남도       1825
    서울특별시      1744
    충청남도       1723
    전라북도       1137
    경상북도        917
    충청북도        898
    울산광역시       887
    인천광역시       675
    부산광역시       653
    강원도         647
    대구광역시       586
    대전광역시       497
    광주광역시       429
    제주특별자치도     246
    세종특별자치시      70
    강원            1
    Name: 시도, dtype: int64


```python
# '시도'가 '강원'인 데이터를 '강원도'로 수정한다.
park_ok['시도'][park_ok['시도'] == '강원'] = '강원도'
```


```python
park_ok['시도'].value_counts()
```


    경기도        3318
    전라남도       1882
    경상남도       1825
    서울특별시      1744
    충청남도       1723
    전라북도       1137
    경상북도        917
    충청북도        898
    울산광역시       887
    인천광역시       675
    부산광역시       653
    강원도         648
    대구광역시       586
    대전광역시       497
    광주광역시       429
    제주특별자치도     246
    세종특별자치시      70
    Name: 시도, dtype: int64

시도별 공원 데이터 시각화


```python
ggplot(park_ok, aes(x='경도', y='위도', color='시도')) \
    + geom_point(size=0.5) \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[6, 8])
```


![output_37_0](../../images/2022-06-28-20_Data_Analysis_3/output_37_0.png){: width="100%" height="100%"}

    <ggplot: (189338420726)>


```python
plt.figure(figsize=[8, 10])
sns.scatterplot(data=park_ok, x='경도', y='위도', hue='시도', s=10)
```


    <AxesSubplot:xlabel='경도', ylabel='위도'>

![output_38_1](../../images/2022-06-28-20_Data_Analysis_3/output_38_1.png){: width="100%" height="100%"}


공원 구분별 분포


```python
ggplot(park_ok, aes(x='경도', y='위도', color='공원구분', size='공원면적비율')) \
    + geom_point() \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[6, 8])
```


 ![output_40_0](../../images/2022-06-28-20_Data_Analysis_3/output_40_0.png){: width="100%" height="100%"}

    <ggplot: (189342326255)>


```python
plt.figure(figsize=[8, 10])
sns.scatterplot(data=park_ok, x='경도', y='위도', hue='공원구분', size='공원면적비율', sizes=(10, 500))
```


    <AxesSubplot:xlabel='경도', ylabel='위도'>

![output_41_1](../../images/2022-06-28-20_Data_Analysis_3/output_41_1.png){: width="100%" height="100%"}

```python
park_ok['공원구분'].value_counts()
```


    어린이공원     9987
    근린공원      4168
    소공원       2647
    문화공원       322
    수변공원       301
    기타         260
    체육공원       230
    역사공원       164
    묘지공원        43
    도시농업공원      13
    Name: 공원구분, dtype: int64

어린이 공원을 제외한 공원 분포


```python
ggplot(park_ok[park_ok['공원구분'] != '어린이공원'], aes(x='경도', y='위도', color='공원구분', size='공원면적비율')) \
    + geom_point() \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[6, 8])
```


![output_44_0](../../images/2022-06-28-20_Data_Analysis_3/output_44_0.png){: width="100%" height="100%"}

    <ggplot: (-9223371847511614292)>


```python
plt.figure(figsize=[8, 10])
sns.scatterplot(data=park_ok[park_ok['공원구분'] != '어린이공원'], x='경도', y='위도', hue='공원구분', size='공원면적비율', 
                sizes=(10, 500))
```


    <AxesSubplot:xlabel='경도', ylabel='위도'>

![output_45_1](../../images/2022-06-28-20_Data_Analysis_3/output_45_1.png){: width="100%" height="100%"}


시도별 공원 비율


```python
# '시도'별 공원 개수를 계산한다.
# value_counts() 함수는 별도의 옵션을 지정하지 않으면 데이터 개수를 계산해서 내림차순으로 정렬해서 출력한다.
# 오름차순으로 정렬해서 출력하려면 ascending=True 옵션을 지정하면 된다.
park_do = pd.DataFrame(park_ok['시도'].value_counts()).reset_index()
park_do.columns = ['시도', '개수']
park_do
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
      <th>시도</th>
      <th>개수</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>경기도</td>
      <td>3318</td>
    </tr>
    <tr>
      <th>1</th>
      <td>전라남도</td>
      <td>1882</td>
    </tr>
    <tr>
      <th>2</th>
      <td>경상남도</td>
      <td>1825</td>
    </tr>
    <tr>
      <th>3</th>
      <td>서울특별시</td>
      <td>1744</td>
    </tr>
    <tr>
      <th>4</th>
      <td>충청남도</td>
      <td>1723</td>
    </tr>
    <tr>
      <th>5</th>
      <td>전라북도</td>
      <td>1137</td>
    </tr>
    <tr>
      <th>6</th>
      <td>경상북도</td>
      <td>917</td>
    </tr>
    <tr>
      <th>7</th>
      <td>충청북도</td>
      <td>898</td>
    </tr>
    <tr>
      <th>8</th>
      <td>울산광역시</td>
      <td>887</td>
    </tr>
    <tr>
      <th>9</th>
      <td>인천광역시</td>
      <td>675</td>
    </tr>
    <tr>
      <th>10</th>
      <td>부산광역시</td>
      <td>653</td>
    </tr>
    <tr>
      <th>11</th>
      <td>강원도</td>
      <td>648</td>
    </tr>
    <tr>
      <th>12</th>
      <td>대구광역시</td>
      <td>586</td>
    </tr>
    <tr>
      <th>13</th>
      <td>대전광역시</td>
      <td>497</td>
    </tr>
    <tr>
      <th>14</th>
      <td>광주광역시</td>
      <td>429</td>
    </tr>
    <tr>
      <th>15</th>
      <td>제주특별자치도</td>
      <td>246</td>
    </tr>
    <tr>
      <th>16</th>
      <td>세종특별자치시</td>
      <td>70</td>
    </tr>
  </tbody>
</table>
</div>


```python
# value_counts() 함수는 별도의 옵션을 지정하지 않으면 데이터 개수를 계산하고 normalize=True 옵션을 지정하면 전체 개수에 대한
# 비율을 계산해서 출력한다.
park_normalize = pd.DataFrame(park_ok['시도'].value_counts(normalize=True)).reset_index()
park_normalize.columns = ['시도', '비율']
park_normalize
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
      <th>시도</th>
      <th>비율</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>경기도</td>
      <td>0.182961</td>
    </tr>
    <tr>
      <th>1</th>
      <td>전라남도</td>
      <td>0.103777</td>
    </tr>
    <tr>
      <th>2</th>
      <td>경상남도</td>
      <td>0.100634</td>
    </tr>
    <tr>
      <th>3</th>
      <td>서울특별시</td>
      <td>0.096168</td>
    </tr>
    <tr>
      <th>4</th>
      <td>충청남도</td>
      <td>0.095010</td>
    </tr>
    <tr>
      <th>5</th>
      <td>전라북도</td>
      <td>0.062696</td>
    </tr>
    <tr>
      <th>6</th>
      <td>경상북도</td>
      <td>0.050565</td>
    </tr>
    <tr>
      <th>7</th>
      <td>충청북도</td>
      <td>0.049518</td>
    </tr>
    <tr>
      <th>8</th>
      <td>울산광역시</td>
      <td>0.048911</td>
    </tr>
    <tr>
      <th>9</th>
      <td>인천광역시</td>
      <td>0.037221</td>
    </tr>
    <tr>
      <th>10</th>
      <td>부산광역시</td>
      <td>0.036008</td>
    </tr>
    <tr>
      <th>11</th>
      <td>강원도</td>
      <td>0.035732</td>
    </tr>
    <tr>
      <th>12</th>
      <td>대구광역시</td>
      <td>0.032313</td>
    </tr>
    <tr>
      <th>13</th>
      <td>대전광역시</td>
      <td>0.027406</td>
    </tr>
    <tr>
      <th>14</th>
      <td>광주광역시</td>
      <td>0.023656</td>
    </tr>
    <tr>
      <th>15</th>
      <td>제주특별자치도</td>
      <td>0.013565</td>
    </tr>
    <tr>
      <th>16</th>
      <td>세종특별자치시</td>
      <td>0.003860</td>
    </tr>
  </tbody>
</table>
</div>


```python
# 시도별 개수와 개수의 비율 데이터를 병합한다.
# park_sido = park_do.merge(park_normalize, left_index=True, right_index=True) # 시도_x, 시도_y 열이 나타난다. 
park_sido = park_do.merge(park_normalize, left_on='시도', right_on='시도')
park_sido
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
      <th>시도</th>
      <th>개수</th>
      <th>비율</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>경기도</td>
      <td>3318</td>
      <td>0.182961</td>
    </tr>
    <tr>
      <th>1</th>
      <td>전라남도</td>
      <td>1882</td>
      <td>0.103777</td>
    </tr>
    <tr>
      <th>2</th>
      <td>경상남도</td>
      <td>1825</td>
      <td>0.100634</td>
    </tr>
    <tr>
      <th>3</th>
      <td>서울특별시</td>
      <td>1744</td>
      <td>0.096168</td>
    </tr>
    <tr>
      <th>4</th>
      <td>충청남도</td>
      <td>1723</td>
      <td>0.095010</td>
    </tr>
    <tr>
      <th>5</th>
      <td>전라북도</td>
      <td>1137</td>
      <td>0.062696</td>
    </tr>
    <tr>
      <th>6</th>
      <td>경상북도</td>
      <td>917</td>
      <td>0.050565</td>
    </tr>
    <tr>
      <th>7</th>
      <td>충청북도</td>
      <td>898</td>
      <td>0.049518</td>
    </tr>
    <tr>
      <th>8</th>
      <td>울산광역시</td>
      <td>887</td>
      <td>0.048911</td>
    </tr>
    <tr>
      <th>9</th>
      <td>인천광역시</td>
      <td>675</td>
      <td>0.037221</td>
    </tr>
    <tr>
      <th>10</th>
      <td>부산광역시</td>
      <td>653</td>
      <td>0.036008</td>
    </tr>
    <tr>
      <th>11</th>
      <td>강원도</td>
      <td>648</td>
      <td>0.035732</td>
    </tr>
    <tr>
      <th>12</th>
      <td>대구광역시</td>
      <td>586</td>
      <td>0.032313</td>
    </tr>
    <tr>
      <th>13</th>
      <td>대전광역시</td>
      <td>497</td>
      <td>0.027406</td>
    </tr>
    <tr>
      <th>14</th>
      <td>광주광역시</td>
      <td>429</td>
      <td>0.023656</td>
    </tr>
    <tr>
      <th>15</th>
      <td>제주특별자치도</td>
      <td>246</td>
      <td>0.013565</td>
    </tr>
    <tr>
      <th>16</th>
      <td>세종특별자치시</td>
      <td>70</td>
      <td>0.003860</td>
    </tr>
  </tbody>
</table>
</div>


```python
ggplot(park_sido, aes(x='시도', y='개수')) \
    + geom_bar(stat='identity', fill='green') \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[18, 8])
```


 ![output_50_0](../../images/2022-06-28-20_Data_Analysis_3/output_50_0.png){: width="100%" height="100%"}

    <ggplot: (189345861864)>


```python
ggplot(park_sido, aes(x='시도', y='개수')) \
    + geom_bar(stat='identity', fill='green') \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 8], axis_text_x=element_text(rotation=45))
```


![output_51_0](../../images/2022-06-28-20_Data_Analysis_3/output_51_0.png){: width="100%" height="100%"}

    <ggplot: (189336376584)>


```python
ggplot(park_sido, aes(x='시도', y='개수')) \
    + geom_bar(stat='identity', fill='green') \
    + coord_flip() \
    + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 8])
```


  ![output_52_0](../../images/2022-06-28-20_Data_Analysis_3/output_52_0.png){: width="100%" height="100%"}

    <ggplot: (189340465128)>


```python
plt.figure(figsize=[12, 8])
sns.barplot(data=park_sido, x='시도', y='개수')
```


    <AxesSubplot:xlabel='시도', ylabel='개수'>

![output_53_1](../../images/2022-06-28-20_Data_Analysis_3/output_53_1.png){: width="100%" height="100%"}

```python
plt.figure(figsize=[12, 8])
plt.xticks(rotation=45)
sns.barplot(data=park_sido, x='시도', y='개수')
```


    <AxesSubplot:xlabel='시도', ylabel='개수'>

![output_54_1](../../images/2022-06-28-20_Data_Analysis_3/output_54_1.png){: width="100%" height="100%"}

```python
plt.figure(figsize=[12, 8])
sns.barplot(data=park_sido, x='개수', y='시도')
```


    <AxesSubplot:xlabel='개수', ylabel='시도'>

![output_55_1](../../images/2022-06-28-20_Data_Analysis_3/output_55_1.png){: width="100%" height="100%"}

```python
# https://plotnine.readthedocs.io/en/stable/tutorials/miscellaneous-order-plot-series.html
from pandas.api.types import CategoricalDtype
from plotnine.data import mpg
```


```python
(ggplot(mpg)
 + aes(x='manufacturer')
 + geom_bar(size=20)
 + coord_flip()
 + labs(y='Count', x='Manufacturer', title='Number of Cars by Make')
)
```


![output_57_0](../../images/2022-06-28-20_Data_Analysis_3/output_57_0.png){: width="100%" height="100%"}

    <ggplot: (-9223371847514367123)>


```python
# Determine order and create a categorical type
# Note that value_counts() is already sorted
manufacturer_list = mpg['manufacturer'].value_counts().index.tolist()
manufacturer_cat = pd.Categorical(mpg['manufacturer'], categories=manufacturer_list)

# assign to a new column in the DataFrame
mpg = mpg.assign(manufacturer_cat = manufacturer_cat)

(ggplot(mpg)
 + aes(x='manufacturer_cat')
 + geom_bar(size=20)
 + coord_flip()
 + labs(y='Count', x='Manufacturer', title='Number of Cars by Make')
)
```


![output_58_0](../../images/2022-06-28-20_Data_Analysis_3/output_58_0.png){: width="100%" height="100%"}

    <ggplot: (189340426076)>


```python
park_list = park_ok['시도'].value_counts().index.tolist()
park_cat = pd.Categorical(park_ok['시도'], categories=park_list)
park_ok = park_ok.assign(park_cat = park_cat)
(ggplot(park_ok)
 + aes(x='park_cat')
 + geom_bar(size=20)
 + coord_flip()
 + labs(y='개수', x='시도', title='시도별 공원 분포수')
 + theme(text=element_text(family='NanumGothicCoding'), figure_size=[10, 8])
)
```


![output_59_0](../../images/2022-06-28-20_Data_Analysis_3/output_59_0.png){: width="100%" height="100%"}

    <ggplot: (-9223371847511513305)>
