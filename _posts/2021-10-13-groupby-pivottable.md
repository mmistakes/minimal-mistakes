---
layout: single
title:  "groupby, pivot_table 을 활용한 데이터 집계"
categories: study
tag: [pandas]
toc_label: "Contents"
toc: true
toc_sticky: true
---

# groupby, pivot_table 을 활용한 데이터 집계

DataFrame의 데이터를 groupby와 pivot_table을 활용해 데이터 집계를 연습합니다.



## 실습을 위한 데이터 셋
- 다운로드 : https://www.data.go.kr/dataset/3035522/fileData.do

```python
# 파이썬에서 쓸 수 있는 판다스 라이브러를 불러옴
import pandas as pd
```



## 데이터 로드

### 최근 파일 로드
- 인코딩을 설정해야만 한글이 깨지지 않음.
- 보통 한글로 저장된 한글 인토딩은 cp949와 euc-kr로 됨.
- df_last라는 변수에 최근 분양가 파일을 다운로드 받아 로드 진행


```python
# 최근 분양가 파일을 로드해서 df_last 라는 변수에 담음
# euc-kr보다는 cp949로 로드로 하는 것을 추천

# df_first : 전국 평균 분양가격 last 최근 파일
df_last = pd.read_csv("data/주택도시보증공사_전국 평균 분양가격(2019년 12월).csv", encoding="cp949")
df_last.shape
```




    (4335, 5)



### 데이터 집계를 위한 전처리 작업
- 규모구분 컬럼은 전용면적에 대한 내용이 있음.-> 전용면적이 좀 더 직관적임


```python
df_last["규모구분"].unique()
```




    array(['전체', '전용면적 60㎡이하', '전용면적 60㎡초과 85㎡이하', '전용면적 85㎡초과 102㎡이하',
           '전용면적 102㎡초과'], dtype=object)




```python
# 그냥 replace는 정확하게 입력된거만 바꿔줌

df_last["전용면적"] = df_last["규모구분"].str.replace("전용면적", "")
df_last["전용면적"] = df_last["전용면적"].str.replace("초과", "~")
df_last["전용면적"] = df_last["전용면적"].str.replace("이하", "")
df_last["전용면적"] = df_last["전용면적"].str.replace(" ", "").str.strip()
df_last["전용면적"]
```




    0             전체
    1            60㎡
    2        60㎡~85㎡
    3       85㎡~102㎡
    4          102㎡~
              ...   
    4330          전체
    4331         60㎡
    4332     60㎡~85㎡
    4333    85㎡~102㎡
    4334       102㎡~
    Name: 전용면적, Length: 4335, dtype: object



### 필요없는 컬럼 제거

```python
# drop 사용시 axis에 주의
# axis 0: 행, 1: 열
df_last = df_last.drop(["규모구분", "분양가격(㎡)"], axis=1)
```



## groupby로 데이터 집계하기


```python
# 지역명으로 분양가격의 평균을 구하고 막대그래프로로 시각화 
# df.groupby(["인덱스로 사용할 컬럼명"])["계산할 컬럼 값"].연산()

df_last.groupby(["지역명"])["평당분양가격"].mean()
```




    지역명
    강원     7890.750000
    경기    13356.895200
    경남     9268.778138
    경북     8376.536515
    광주     9951.535821
    대구    11980.895455
    대전    10253.333333
    부산    12087.121200
    서울    23599.976400
    세종     9796.516456
    울산    10014.902013
    인천    11915.320732
    전남     7565.316532
    전북     7724.235484
    제주    11241.276712
    충남     8233.651883
    충북     7634.655600
    Name: 평당분양가격, dtype: float64




```python
# 전용면적으로 분양가격의 평균을 구합니다.

df_last.groupby(["전용면적"])["평당분양가격"].mean()
```




    전용면적
    102㎡~       11517.705634
    60㎡         10375.137421
    60㎡~85㎡     10271.040071
    85㎡~102㎡    11097.599573
    전체          10276.086207
    Name: 평당분양가격, dtype: float64




```python
# 지역별, 전용면적으로 평당분양가격의 평균을 구합니다.
# unstack은 마지막에 있는 인덱스를 column명으로

df_last.groupby(["전용면적","지역명"])["평당분양가격"].mean().unstack().round()
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
      <th>전용면적</th>
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
      <th>102㎡~</th>
      <td>8311.0</td>
      <td>14772.0</td>
      <td>10358.0</td>
      <td>9157.0</td>
      <td>11042.0</td>
      <td>13087.0</td>
      <td>14877.0</td>
      <td>13208.0</td>
      <td>23446.0</td>
      <td>10107.0</td>
      <td>9974.0</td>
      <td>14362.0</td>
      <td>8168.0</td>
      <td>8194.0</td>
      <td>10523.0</td>
      <td>8689.0</td>
      <td>8195.0</td>
    </tr>
    <tr>
      <th>60㎡</th>
      <td>7567.0</td>
      <td>13252.0</td>
      <td>8689.0</td>
      <td>7883.0</td>
      <td>9431.0</td>
      <td>11992.0</td>
      <td>9176.0</td>
      <td>11354.0</td>
      <td>23213.0</td>
      <td>9324.0</td>
      <td>9202.0</td>
      <td>11241.0</td>
      <td>7210.0</td>
      <td>7610.0</td>
      <td>14022.0</td>
      <td>7911.0</td>
      <td>7103.0</td>
    </tr>
    <tr>
      <th>60㎡~85㎡</th>
      <td>7486.0</td>
      <td>12524.0</td>
      <td>8619.0</td>
      <td>8061.0</td>
      <td>9911.0</td>
      <td>11779.0</td>
      <td>9711.0</td>
      <td>11865.0</td>
      <td>22787.0</td>
      <td>9775.0</td>
      <td>10503.0</td>
      <td>11384.0</td>
      <td>7269.0</td>
      <td>7271.0</td>
      <td>10621.0</td>
      <td>7819.0</td>
      <td>7264.0</td>
    </tr>
    <tr>
      <th>85㎡~102㎡</th>
      <td>8750.0</td>
      <td>13678.0</td>
      <td>10018.0</td>
      <td>8774.0</td>
      <td>9296.0</td>
      <td>11141.0</td>
      <td>9037.0</td>
      <td>12073.0</td>
      <td>25944.0</td>
      <td>9848.0</td>
      <td>8861.0</td>
      <td>11528.0</td>
      <td>7909.0</td>
      <td>8276.0</td>
      <td>10709.0</td>
      <td>9120.0</td>
      <td>8391.0</td>
    </tr>
    <tr>
      <th>전체</th>
      <td>7478.0</td>
      <td>12560.0</td>
      <td>8659.0</td>
      <td>8079.0</td>
      <td>9904.0</td>
      <td>11771.0</td>
      <td>9786.0</td>
      <td>11936.0</td>
      <td>22610.0</td>
      <td>9805.0</td>
      <td>10493.0</td>
      <td>11257.0</td>
      <td>7284.0</td>
      <td>7293.0</td>
      <td>10785.0</td>
      <td>7815.0</td>
      <td>7219.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
# 연도, 지역명으로 평당분양가격의 평균을 구합니다.

g = df_last.groupby(["연도", "지역명"])["평당분양가격"].mean()
g
# g.unstack().transposen()
```




    연도    지역명
    2015  강원      7188.060000
          경기     11060.940000
          경남      8459.220000
          경북      7464.160000
          광주      7916.700000
                     ...     
    2019  전남      8219.275862
          전북      8532.260000
          제주     11828.469231
          충남      8748.840000
          충북      7970.875000
    Name: 평당분양가격, Length: 85, dtype: float64



## pivot table로 데이터 집계하기
- groupby로 했던 작업을 pivot_table로 똑같이 해봅니다.


```python
# groupby는 시리즈 형태로 데이터가 나오는 반면에 pivot_table은 DataFrame 형태로 출력
# groupby가 pivot_table에 비해 빠르다!!

pd.pivot_table(df_last, index=["지역명"], values=["평당분양가격"], aggfunc="mean")
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
      <th>평당분양가격</th>
    </tr>
    <tr>
      <th>지역명</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>강원</th>
      <td>7890.750000</td>
    </tr>
    <tr>
      <th>경기</th>
      <td>13356.895200</td>
    </tr>
    <tr>
      <th>경남</th>
      <td>9268.778138</td>
    </tr>
    <tr>
      <th>경북</th>
      <td>8376.536515</td>
    </tr>
    <tr>
      <th>광주</th>
      <td>9951.535821</td>
    </tr>
    <tr>
      <th>대구</th>
      <td>11980.895455</td>
    </tr>
    <tr>
      <th>대전</th>
      <td>10253.333333</td>
    </tr>
    <tr>
      <th>부산</th>
      <td>12087.121200</td>
    </tr>
    <tr>
      <th>서울</th>
      <td>23599.976400</td>
    </tr>
    <tr>
      <th>세종</th>
      <td>9796.516456</td>
    </tr>
    <tr>
      <th>울산</th>
      <td>10014.902013</td>
    </tr>
    <tr>
      <th>인천</th>
      <td>11915.320732</td>
    </tr>
    <tr>
      <th>전남</th>
      <td>7565.316532</td>
    </tr>
    <tr>
      <th>전북</th>
      <td>7724.235484</td>
    </tr>
    <tr>
      <th>제주</th>
      <td>11241.276712</td>
    </tr>
    <tr>
      <th>충남</th>
      <td>8233.651883</td>
    </tr>
    <tr>
      <th>충북</th>
      <td>7634.655600</td>
    </tr>
  </tbody>
</table>
</div>




```python
# df_last.groupby(["전용면적"])["평당분양가격"].mean()
# pivot은 연산을 하지 않고 데이터의 형태만 바꿈, pivot_table은 연산을 함

pd.pivot_table(df_last, index=["전용면적"], values=["평당분양가격"], aggfunc="mean")
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
      <th>평당분양가격</th>
    </tr>
    <tr>
      <th>전용면적</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>102㎡~</th>
      <td>11517.705634</td>
    </tr>
    <tr>
      <th>60㎡</th>
      <td>10375.137421</td>
    </tr>
    <tr>
      <th>60㎡~85㎡</th>
      <td>10271.040071</td>
    </tr>
    <tr>
      <th>85㎡~102㎡</th>
      <td>11097.599573</td>
    </tr>
    <tr>
      <th>전체</th>
      <td>10276.086207</td>
    </tr>
  </tbody>
</table>
</div>




```python
# df_last.groupby(["전용면적","지역명"])["평당분양가격"].mean().unstack().round()

df_last.pivot_table(index="전용면적", columns="지역명", values=["평당분양가격"]).round()
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
      <th colspan="17" halign="left">평당분양가격</th>
    </tr>
    <tr>
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
      <th>전용면적</th>
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
      <th>102㎡~</th>
      <td>8311.0</td>
      <td>14772.0</td>
      <td>10358.0</td>
      <td>9157.0</td>
      <td>11042.0</td>
      <td>13087.0</td>
      <td>14877.0</td>
      <td>13208.0</td>
      <td>23446.0</td>
      <td>10107.0</td>
      <td>9974.0</td>
      <td>14362.0</td>
      <td>8168.0</td>
      <td>8194.0</td>
      <td>10523.0</td>
      <td>8689.0</td>
      <td>8195.0</td>
    </tr>
    <tr>
      <th>60㎡</th>
      <td>7567.0</td>
      <td>13252.0</td>
      <td>8689.0</td>
      <td>7883.0</td>
      <td>9431.0</td>
      <td>11992.0</td>
      <td>9176.0</td>
      <td>11354.0</td>
      <td>23213.0</td>
      <td>9324.0</td>
      <td>9202.0</td>
      <td>11241.0</td>
      <td>7210.0</td>
      <td>7610.0</td>
      <td>14022.0</td>
      <td>7911.0</td>
      <td>7103.0</td>
    </tr>
    <tr>
      <th>60㎡~85㎡</th>
      <td>7486.0</td>
      <td>12524.0</td>
      <td>8619.0</td>
      <td>8061.0</td>
      <td>9911.0</td>
      <td>11779.0</td>
      <td>9711.0</td>
      <td>11865.0</td>
      <td>22787.0</td>
      <td>9775.0</td>
      <td>10503.0</td>
      <td>11384.0</td>
      <td>7269.0</td>
      <td>7271.0</td>
      <td>10621.0</td>
      <td>7819.0</td>
      <td>7264.0</td>
    </tr>
    <tr>
      <th>85㎡~102㎡</th>
      <td>8750.0</td>
      <td>13678.0</td>
      <td>10018.0</td>
      <td>8774.0</td>
      <td>9296.0</td>
      <td>11141.0</td>
      <td>9037.0</td>
      <td>12073.0</td>
      <td>25944.0</td>
      <td>9848.0</td>
      <td>8861.0</td>
      <td>11528.0</td>
      <td>7909.0</td>
      <td>8276.0</td>
      <td>10709.0</td>
      <td>9120.0</td>
      <td>8391.0</td>
    </tr>
    <tr>
      <th>전체</th>
      <td>7478.0</td>
      <td>12560.0</td>
      <td>8659.0</td>
      <td>8079.0</td>
      <td>9904.0</td>
      <td>11771.0</td>
      <td>9786.0</td>
      <td>11936.0</td>
      <td>22610.0</td>
      <td>9805.0</td>
      <td>10493.0</td>
      <td>11257.0</td>
      <td>7284.0</td>
      <td>7293.0</td>
      <td>10785.0</td>
      <td>7815.0</td>
      <td>7219.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
# 연도, 지역명으로 평당분양가격의 평균을 구합니다.
# g = df_last.groupby(["연도", "지역명"])["평당분양가격"].mean()

p = df_last.pivot_table(index=["연도", "지역명"], values="평당분양가격")
p.loc[2017]
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
      <th>평당분양가격</th>
    </tr>
    <tr>
      <th>지역명</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>강원</th>
      <td>7273.560000</td>
    </tr>
    <tr>
      <th>경기</th>
      <td>12304.980000</td>
    </tr>
    <tr>
      <th>경남</th>
      <td>8786.760000</td>
    </tr>
    <tr>
      <th>경북</th>
      <td>8280.800000</td>
    </tr>
    <tr>
      <th>광주</th>
      <td>9613.977551</td>
    </tr>
    <tr>
      <th>대구</th>
      <td>12206.700000</td>
    </tr>
    <tr>
      <th>대전</th>
      <td>9957.158491</td>
    </tr>
    <tr>
      <th>부산</th>
      <td>11560.680000</td>
    </tr>
    <tr>
      <th>서울</th>
      <td>21831.060000</td>
    </tr>
    <tr>
      <th>세종</th>
      <td>9132.505556</td>
    </tr>
    <tr>
      <th>울산</th>
      <td>10666.935714</td>
    </tr>
    <tr>
      <th>인천</th>
      <td>11640.600000</td>
    </tr>
    <tr>
      <th>전남</th>
      <td>7372.920000</td>
    </tr>
    <tr>
      <th>전북</th>
      <td>7398.973585</td>
    </tr>
    <tr>
      <th>제주</th>
      <td>12566.730000</td>
    </tr>
    <tr>
      <th>충남</th>
      <td>8198.422222</td>
    </tr>
    <tr>
      <th>충북</th>
      <td>7473.120000</td>
    </tr>
  </tbody>
</table>
</div>



21-10-13 Comments

> 판다스로만 시각화를 하기위해서는 groupby 와 pivot_table은 데이터를 연산하고 시각화할 때 자주 사용함. seaborn이나 기타 다른 시각화 method를 사용하다보면 해당 내용을 잊어버릴 수 있기 때문에 tip을 활용하는 습관을 길러야 할 듯!! 
