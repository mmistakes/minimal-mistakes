---
layout: single
title: "미관측 데이터 회귀분석으로 채워넣기"
categories: 데이터_분석
tag:
  [
    python,
    머신러닝,
    blog,
    github,
    sklearn,
    사이킥런,
    bike,
    케글,
    멀티캠퍼스,
    국비지원,
    교육,
    분석,
    데이터,
    파이썬,
  ]
toc: true
sidebar:
  nav: "docs"
---

## 결측값 데이터 처리

### 결과값이 '0'인 'windspeed' 데이터 채워넣기

- 자료출처 : https://www.kaggle.com/c/bike-sharing-demand

```python
import pandas as pd
import numpy as np
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns

%matplotlib inline

plt.style.use('ggplot')

mpl.rcParams['axes.unicode_minus'] = False

import warnings
warnings.filterwarnings('ignore')
```

```python
# parse_dates로 DateTime 포맷에 맞도록 파싱해서 읽어옴
train = pd.read_csv("data_bike/train.csv", parse_dates=['datetime'])
train.head(2)
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
      <th>datetime</th>
      <th>season</th>
      <th>holiday</th>
      <th>workingday</th>
      <th>weather</th>
      <th>temp</th>
      <th>atemp</th>
      <th>humidity</th>
      <th>windspeed</th>
      <th>casual</th>
      <th>registered</th>
      <th>count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2011-01-01 00:00:00</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>9.84</td>
      <td>14.395</td>
      <td>81</td>
      <td>0.0</td>
      <td>3</td>
      <td>13</td>
      <td>16</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2011-01-01 01:00:00</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>9.02</td>
      <td>13.635</td>
      <td>80</td>
      <td>0.0</td>
      <td>8</td>
      <td>32</td>
      <td>40</td>
    </tr>
  </tbody>
</table>
</div>

Description

- datetime - hourly date + timestamp
- season - 1 = spring, 2 = summer, 3 = fall, 4 = winter
- holiday - whether the day is considered a holiday
- workingday - whether the day is neither a weekend nor holiday
- weather
  1: Clear, Few clouds, Partly cloudy, Partly cloudy
  2: Mist + Cloudy, Mist + Broken clouds, Mist + Few clouds, Mist
  3: Light Snow, Light Rain + Thunderstorm + Scattered clouds, Light Rain + Scattered clouds
  4: Heavy Rain + Ice Pallets + Thunderstorm + Mist, Snow + Fog
- temp - temperature in Celsius
- atemp - "feels like" temperature in Celsius
- humidity - relative humidity
- windspeed - wind speed
- casual - number of non-registered user rentals initiated
- registered - number of registered user rentals initiated
- count - number of total rentals

```python
# null 데이터 확인 (시각화)

import missingno as msno

msno.matrix(train, figsize=(12,5));
```

```python
test = pd.read_csv('data_bike/test.csv', parse_dates=['datetime'])

print(test.shape)
test.head(2)
```

    (6493, 9)

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
      <th>datetime</th>
      <th>season</th>
      <th>holiday</th>
      <th>workingday</th>
      <th>weather</th>
      <th>temp</th>
      <th>atemp</th>
      <th>humidity</th>
      <th>windspeed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2011-01-20 00:00:00</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>10.66</td>
      <td>11.365</td>
      <td>56</td>
      <td>26.0027</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2011-01-20 01:00:00</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>10.66</td>
      <td>13.635</td>
      <td>56</td>
      <td>0.0000</td>
    </tr>
  </tbody>
</table>
</div>

```python
Categorical = ['season', 'holiday', 'workingday', 'weather']

# astype() -> 카테고리 형태로 바꿈
for col in Categorical:
    train[col] = train[col].astype('category')
    test[col] = test[col].astype('category')
```

```python
# train 데이터에 시간 단위별 컬럼 추가
train['year'] = train['datetime'].dt.year
train['month'] = train['datetime'].dt.month
train['day'] = train['datetime'].dt.day
train['hour'] = train['datetime'].dt.hour
train['minute'] = train['datetime'].dt.minute
train['second'] = train['datetime'].dt.second
train['dayofweek'] = train['datetime'].dt.dayofweek

print(train.shape)
train.head(2)
```

    (10886, 19)

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
      <th>datetime</th>
      <th>season</th>
      <th>holiday</th>
      <th>workingday</th>
      <th>weather</th>
      <th>temp</th>
      <th>atemp</th>
      <th>humidity</th>
      <th>windspeed</th>
      <th>casual</th>
      <th>registered</th>
      <th>count</th>
      <th>year</th>
      <th>month</th>
      <th>day</th>
      <th>hour</th>
      <th>minute</th>
      <th>second</th>
      <th>dayofweek</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2011-01-01 00:00:00</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>9.84</td>
      <td>14.395</td>
      <td>81</td>
      <td>0.0</td>
      <td>3</td>
      <td>13</td>
      <td>16</td>
      <td>2011</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>5</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2011-01-01 01:00:00</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>9.02</td>
      <td>13.635</td>
      <td>80</td>
      <td>0.0</td>
      <td>8</td>
      <td>32</td>
      <td>40</td>
      <td>2011</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 시간 단위별 컬럼 추가
test['year'] = test['datetime'].dt.year
test['month'] = test['datetime'].dt.month
test['day'] = test['datetime'].dt.day
test['hour'] = test['datetime'].dt.hour
test['minute'] = test['datetime'].dt.minute
test['second'] = test['datetime'].dt.second
test['dayofweek'] = test['datetime'].dt.dayofweek

print(test.shape)
```

    (6493, 16)

### windspeed == 0 인 데이터를 회귀분석 예측값으로 대체

```python
# 분리
train_wind_0 = train[train.windspeed==0]
print(train_wind_0.shape)

train_wind_not0 = train[train.windspeed!=0]
print(train_wind_not0.shape)
```

    (1313, 19)
    (9573, 19)

### windspeed가 0이 아닌 것들로 회귀분석 하기

```python
# 독립변수 추출
feature_names_wnot0 = ['year','month','hour','season','weather','atemp','humidity']
```

```python
# 독립변수와 종속변수 선언
X_train = train_wind_not0[feature_names_wnot0]
y_train = train_wind_not0['windspeed']
```

```python
# 모델만들기
# RandomForestRegressor 알고리즘 활용한 회귀분석

from sklearn.ensemble import RandomForestRegressor
model = RandomForestRegressor()
model.fit(X_train, y_train)
```

    RandomForestRegressor()

```python
# X_test에 'windspeed'가 0인 행의 독립변수 대입

X_test = train_wind_0[feature_names_wnot0]
X_test.shape
```

    (1313, 7)

```python
# 학습된 모델에 새 독립변수(X_test) 적용 ->
    # train 데이터 셋에 예측값 대입

train_wind_0['windspeed'] = model.predict(X_test)
```

```python
# train 쪽  0이였던 데이터 모두 예측값으로 대체됨
len(train_wind_0[train_wind_0['windspeed']==0])
```

    0

```python
# 두 데이터를 다시 합치고, datetime 기준으로 정렬
train = pd.concat([train_wind_0, train_wind_not0], axis=0).sort_values(by='datetime')
```

### test 셋 예측값 대입

- 모델이 예측한 값을 test 데이터 셋에 대입

```python
# windspeed==0인 것, 0아닌 것 분리
test_wind_0 = test[test.windspeed==0]
test_wind_not0 = test[test.windspeed!=0]

# 예측값 대입 (모델은 위에서 만들어진 모델 사용)
X_test = test_wind_0[feature_names_wnot0]
test_wind_0['windspeed'] = model.predict(X_test)

test = pd.concat([test_wind_0, test_wind_not0], axis=0).sort_values(by='datetime')
```
