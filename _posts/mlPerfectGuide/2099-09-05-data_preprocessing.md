---
published: true
layout: single
title: "[Machine Learning PerfectGuide] 데이터 전처리(Preprocessing)"
category: mlbasic
tags:
comments: true
sidebar:
  nav: "mainMenu"
use_math: true
--- 
* * *

- 데이터 클린징  

- 결손값 처리(Null/NaN 처리)  

- 데이터 인코딩(레이블, 원-핫 인코딩)  
  1. 레이블 인코딩 : 원본 데이터의 레이블 코드를 숫자형으로 변환/맵핑하여 사용하는 것 
  2. 원-핫 인코딩 : 레이블 인코딩으로 생성된 숫자형 데이터는 어쩔 수 없이 크다/작다 등의 연관성을 가지게 되므로 레이블 값들을 각각의 피처로 추가하여 0 or 1을 할당하여 사용하는 방식 ( pandas의 get_dummies()에서 지원 )

  ```python
  # 레이블 인코딩
  items = ['TV', '냉장고', '전자렌지', '컴퓨터', '선풍기', '선풍기', '믹서', '믹서']

  # LabelEncoder를 객체로 생성한 후 , fit( ) 과 transform( ) 으로 label 인코딩 수행.
  encoder = LabelEncoder()
  encoder.fit(items)
  labels = encoder.transform(items)
  print('인코딩 변환값:', labels)
  print('인코딩 클래스:', encoder.classes_)
  print('디코딩 원본 값:', encoder.inverse_transform([0]))
  print('디코딩 원본 값:', encoder.inverse_transform([1]))
  print('디코딩 원본 값:', encoder.inverse_transform([4, 5, 2, 0, 1, 1, 3, 3]))
  ```
  ```
  인코딩 변환값: [0 1 4 5 3 3 2 2]
  인코딩 클래스: ['TV' '냉장고' '믹서' '선풍기' '전자렌지' '컴퓨터']
  디코딩 원본 값: ['TV']
  디코딩 원본 값: ['냉장고']
  디코딩 원본 값: ['전자렌지' '컴퓨터' '믹서' 'TV' '냉장고' '냉장고' '선풍기' '선풍기']
  ```

  ```python
  # 원-핫 인코딩
  from sklearn.preprocessing import OneHotEncoder
  import numpy as np

  items=['TV','냉장고','전자렌지','컴퓨터','선풍기','선풍기','믹서','믹서']

  # 먼저 숫자값으로 변환을 위해 LabelEncoder로 변환합니다. 
  encoder = LabelEncoder()
  encoder.fit(items)
  labels = encoder.transform(items)
  print(labels, '\n')

  # 2차원 데이터로 변환합니다. 
  labels = labels.reshape(-1,1)
  print(labels, '\n')

  # 원-핫 인코딩을 적용합니다. 
  oh_encoder = OneHotEncoder()
  oh_encoder.fit(labels)
  oh_labels = oh_encoder.transform(labels)

  print('원-핫 인코딩 데이터', '\n')
  print(oh_labels.toarray(), '\n')
  print('원-핫 인코딩 데이터 차원', '\n')
  print(oh_labels.shape)
  ```
  ```
  [0 1 4 5 3 3 2 2] 

  [[0]
  [1]
  [4]
  [5]
  [3]
  [3]
  [2]
  [2]] 

  원-핫 인코딩 데이터 

  [[1. 0. 0. 0. 0. 0.]
  [0. 1. 0. 0. 0. 0.]
  [0. 0. 0. 0. 1. 0.]
  [0. 0. 0. 0. 0. 1.]
  [0. 0. 0. 1. 0. 0.]
  [0. 0. 0. 1. 0. 0.]
  [0. 0. 1. 0. 0. 0.]
  [0. 0. 1. 0. 0. 0.]] 

  원-핫 인코딩 데이터 차원 

  (8, 6)
  ```
  ```python
  df = pd.DataFrame({'item': ['TV', '냉장고', '전자렌지', '컴퓨터', '선풍기', '선풍기', '믹서', '믹서']})
  print(pd.get_dummies(df))
  ```
  ```
    item_TV  item_냉장고  item_믹서  item_선풍기  item_전자렌지  item_컴퓨터
  0        1         0        0         0          0         0
  1        0         1        0         0          0         0
  2        0         0        0         0          1         0
  3        0         0        0         0          0         1
  4        0         0        0         1          0         0
  5        0         0        0         1          0         0
  6        0         0        1         0          0         0
  7        0         0        1         0          0         0
  ```

- 피처 스케일링  
1. 표준화 : 데이터의 피처 각각이 평균이 0이고 분산이 1인 가우시안 정규 분포를 가진 값으로 변환하는 것을 의미 
> ### $ x_i = \frac{x_i - mean(x)}{stdev(v)} $     
2. 정규화 : 서로 다른 피처의 크기를 통일하기 위해 크기를 변환해주는 개념  
ex) 연봉(3000 ~ 10억?)을 0부터 1사이의 값으로 정규화
> ### $ x_i = \frac{x_i - min(x)}{max(x) - min(x)} $  

  ```python
  from sklearn.datasets import load_iris
  import pandas as pd
  # 붓꽃 데이터 셋을 로딩하고 DataFrame으로 변환합니다. 
  iris = load_iris()
  iris_data = iris.data
  iris_df = pd.DataFrame(data=iris_data, columns=iris.feature_names)

  print('feature 들의 평균 값')
  print(iris_df.mean())
  print('\nfeature 들의 분산 값')
  print(iris_df.var())
  ```
  ```
  feature 들의 평균 값
  sepal length (cm)    5.843333
  sepal width (cm)     3.057333
  petal length (cm)    3.758000
  petal width (cm)     1.199333
  dtype: float64

  feature 들의 분산 값
  sepal length (cm)    0.685694
  sepal width (cm)     0.189979
  petal length (cm)    3.116278
  petal width (cm)     0.581006
  dtype: float64
  ```
  ```python
  # StandardScaler의 경우
  # 각 Feature들의 값을 평균이 0 분산이 1인 값들로 스케일링 해줍니다.

  from sklearn.preprocessing import StandardScaler
  # StandardScaler객체 생성
  scaler = StandardScaler()
  # StandardScaler 로 데이터 셋 변환. fit( ) 과 transform( ) 호출.  
  scaler.fit(iris_df)
  iris_scaled = scaler.transform(iris_df)

  #transform( )시 scale 변환된 데이터 셋이 numpy ndarry로 반환되어 이를 DataFrame으로 변환
  iris_df_scaled = pd.DataFrame(data=iris_scaled, columns=iris.feature_names)
  print('feature 들의 평균 값')
  print(iris_df_scaled.mean())
  print('\nfeature 들의 분산 값')
  print(iris_df_scaled.var())
  ```
  ```
  feature 들의 평균 값
  sepal length (cm)   -1.690315e-15
  sepal width (cm)    -1.842970e-15
  petal length (cm)   -1.698641e-15
  petal width (cm)    -1.409243e-15
  dtype: float64

  feature 들의 분산 값
  sepal length (cm)    1.006711
  sepal width (cm)     1.006711
  petal length (cm)    1.006711
  petal width (cm)     1.006711
  dtype: float64
  ```
  ```python
  # MinMaxScaler는 Feature들의 값을
  # 0과 1사이의 값들로 스케일링 해줍니다.
  from sklearn.preprocessing import MinMaxScaler
  # MinMaxScaler객체 생성
  scaler = MinMaxScaler()
  # MinMaxScaler 로 데이터 셋 변환. fit() 과 transform() 호출.  
  scaler.fit(iris_df)
  iris_scaled = scaler.transform(iris_df)

  # transform()시 scale 변환된 데이터 셋이 numpy ndarry로 반환되어 이를 DataFrame으로 변환
  iris_df_scaled = pd.DataFrame(data=iris_scaled, columns=iris.feature_names)
  print('feature들의 최소 값')
  print(iris_df_scaled.min())
  print('\nfeature들의 최대 값')
  print(iris_df_scaled.max())
  ```
  ```
  feature들의 최소 값
  sepal length (cm)    0.0
  sepal width (cm)     0.0
  petal length (cm)    0.0
  petal width (cm)     0.0
  dtype: float64

  feature들의 최대 값
  sepal length (cm)    1.0
  sepal width (cm)     1.0
  petal length (cm)    1.0
  petal width (cm)     1.0
  dtype: float64
  ```

- 이상치 제거  
  \- 피처 스케일링 전에 말도 안되는 레이블(타겟) 값을 사전에 제거하여 학습률을 높이는 방법. 
  통상적으로 Z-Score의 절대값이 2가 넘는 경우를 이상치라고 한다.

- Feature 선택, 추출 및 가공

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>