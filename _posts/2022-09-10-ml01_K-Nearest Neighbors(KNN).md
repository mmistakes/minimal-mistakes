---
layout: single
title:  "K-Nearest Neighbors(KNN)"
categories: 머신러닝
tag: [KNN, 머신러닝, python]
toc: true
toc_sticky: true

---

<head>
  <style>
    table.dataframe {
      white-space: normal;
      width: 100%;
      height: 240px;
      display: block;
      overflow: auto;
      font-family: Arial, sans-serif;
      font-size: 0.9rem;
      line-height: 20px;
      text-align: center;
      border: 0px !important;
    }

    table.dataframe th {
      text-align: center;
      font-weight: bold;
      padding: 8px;
    }

    table.dataframe td {
      text-align: center;
      padding: 8px;
    }

    table.dataframe tr:hover {
      background: #b8d1f3; 
    }

    .output_prompt {
      overflow: auto;
      font-size: 0.9rem;
      line-height: 1.45;
      border-radius: 0.3rem;
      -webkit-overflow-scrolling: touch;
      padding: 0.8rem;
      margin-top: 0;
      margin-bottom: 15px;
      font: 1rem Consolas, "Liberation Mono", Menlo, Courier, monospace;
      color: $code-text-color;
      border: solid 1px $border-color;
      border-radius: 0.3rem;
      word-break: normal;
      white-space: pre;
    }

  .dataframe tbody tr th:only-of-type {
      vertical-align: middle;
  }

  .dataframe tbody tr th {
      vertical-align: top;
  }

  .dataframe thead th {
      text-align: center !important;
      padding: 8px;
  }

  .page__content p {
      margin: 0 0 0px !important;
  }

  .page__content p > strong {
    font-size: 0.8rem !important;
  }

  </style>
</head>

## k-최근접 이웃 알고리즘이란?

- 새로운 데이터 포인트와 가장 가까운 훈련 데이터셋의 데이터 포인트를 찾아 예측
- **k 값에 따라 가까운 이웃의 수가 결정**
- **분류**와 **회귀**에 모두 사용 가능

![01](/assets/images/ml01/01.png)

## 특징

- **k 값이 작을 수록** 모델의 **복잡도가 상대적으로 증가**.(noise 값에 민감)
- 반대로 **k 값이 커질수록** 모델의 **복잡도가 낮아진다.**
- 100개의 데이터를 학습하고 k를 100개로 설정하여 예측하면 **빈도가 가장 많은 클래스** 레이블로 분류
- 이해하기 매우 쉬운 모델
- 훈련 데이터 세트가 크면(특성,샘플의 수) 예측이 느려진다
- 수백 개 이상의 많은 특성을 가진 데이터 세트와 특성 값 대부분이 0인 희소(sparse)한 데이터 세트에는 잘 동작하지 않는다
- 거리를 측정하기 때문에 같은 scale을 같도록 **정규화** 필요

## 데이터 포인트(sample) 사이 거리 값 측정 방법

- 유클리디언 거리공식 (Euclidean Distance)

![02](/assets/images/ml01/02.png)

## scikit-learn 주요 매개변수

- metric : 유클리디언 거리 방식
- n_neighbors : 이웃의 수
- weight : 가중치 함수
    - uniform : 가중치를 동등하게 설정.
    - distance : 가중치를 거리에 반비례하도록 설정

## KNN 알고리즘 직접 구현

### 과제

- 예측 데이터와 모든 학습 데이터(500개)와의 거리 계산 -> 유클리드 거리 계산
- 계산된 모든 거리값 중 설정된 k값(k=5)만큼 가장 가까운 데이터 추출
- 추출된 데이터의 비율 확인 후 예측

### 데이터 로딩 및 가공

```python
import pandas as pd

data = pd.read_csv("./data/bmi_lbs.csv")
data['Weight(kg)'] = data['Weight(lbs)'] * 0.453592   # kg 단위로 변환
```

### 학습 데이터

```python
X = data[['Height','Weight(kg)']]
y = data['Label']
```

### 예측할 샘플 데이터

```python
sample_data = data.iloc[[30,110,150,433,498],[2,4]]
ground_truth = data.iloc[[30,110,150,433,498],0]
```

### KNN 함수

```python
# my_KNN
# 입력 변수 (예측할 데이터 샘플, k값)
def my_KNN(input_data, k):
    # 카운터 딕셔너리
    from collections import Counter
    
    # 1. 모든 데이터와 input데이터 사이의 거리계산
    distance_list = []
    
    for i in range(len(input_data)):
        temp = (X - input_data.iloc[i]) ** 2     # X데이터 전체[키, 몸무게] - i번째 인풋[키, 몸무게] -> 결과 : [a제곱, b제곱]
        distance = (temp.iloc[:, 0] + temp.iloc[:, 1])**0.5   # (키 + 몸무게) 의 제곱근

        distance_list.append(distance)
    distance_list = pd.Series(distance_list, index=input_data.index)   # list -> series 변환, 크기 : 샘플데이터 갯수 X 500
    #print(distance_list)

    # 2. k값만큼 가장 가까운 거리의 데이터 추출
    k_neighbors = []

    for i in range(len(input_data)):
        input_i = distance_list.iloc[i]
        temp = []
        for j in range(k):
            # k개만큼 최솟값들 뽑기
            #idx = input_i[input_i == input_i.min()].index[0]
            idx = input_i.idxmin()                # 구한 최솟값의 인덱스 구하기
            temp.append(y.loc[idx])               
            input_i.drop([idx], inplace=True)     # 최솟값 중복 없애게 이번에 뽑은 최솟값은 제거해주기
        k_neighbors.append(temp)                  # k_neighbors -> 크기 : (샘플데이터 갯수 X k개의 최소거리 인덱스)
    
    #print(k_neighbor)
    
    # 3. 추출된 데이터의 비율 확인 후 예측
    output = []
    for nb in k_neighbors:
        count = Counter(nb)     # key : 결과, value: key값이 나온 갯수
        output.append(max(count,key=count.get))
        
    output = pd.Series(output, index=input_data.index)     # input값의 인덱스 유지하기 위해 series화
    return output
```

### 테스트

- 예측

```python
sample2 = data.iloc[[0,1,2,3,4],[2,4]]
my_KNN(sample2, 5)
```

```
0       Obesity
1        Normal
2       Obesity
3    Overweight
4    Overweight
dtype: object
```

- 실제 정답

```python
y.iloc[[0,1,2,3,4]]
```

```
0       Obesity
1        Normal
2       Obesity
3    Overweight
4    Overweight
Name: Label, dtype: object
```

- 예측

```python
sample3 = data.iloc[[12,16,19,21,31],[2,4]]
my_KNN(sample3, 5)
```

```
12         Overweight
16    Extreme Obesity
19    Extreme Obesity
21    Extreme Obesity
31               Weak
dtype: object
```

- 실제 정답

```python
y.iloc[[12,16,19,21,31]]
```

```
12         Overweight
16    Extreme Obesity
19    Extreme Obesity
21    Extreme Obesity
31               Weak
Name: Label, dtype: object
```