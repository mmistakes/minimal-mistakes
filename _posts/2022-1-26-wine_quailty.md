---
layout: single
title: "와인품질분류"
categories: 데이터_분석
tag:
  [
    python,
    머신러닝,
    blog,
    github,
    sklearn,
    사이킥런,
    이상치,
    제거,
    xgboost,
    데이콘,
    와인,
    품질 분류,
    lightgbm,
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

## 와인 품질 분류

- 정확도 높이는 방법?
  1. 예측모델을 변경한다
  2. 독립변수 삭제 or 가중치 부여 (와인 품질에 어떤 특성이 중요?)
  3. 하이퍼 파라미터 튜닝?

```python
import pandas as pd
%matplotlib inline
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings(action='ignore')
```

```python
train = pd.read_csv('data/train.csv')
test = pd.read_csv('data/test.csv')
```

### 1. 간단한 EDA

```python
print(train.shape, test.shape)
```

    (5497, 14) (1000, 13)

```python
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
      <th>index</th>
      <th>quality</th>
      <th>fixed acidity</th>
      <th>volatile acidity</th>
      <th>citric acid</th>
      <th>residual sugar</th>
      <th>chlorides</th>
      <th>free sulfur dioxide</th>
      <th>total sulfur dioxide</th>
      <th>density</th>
      <th>pH</th>
      <th>sulphates</th>
      <th>alcohol</th>
      <th>type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>5</td>
      <td>5.6</td>
      <td>0.695</td>
      <td>0.06</td>
      <td>6.8</td>
      <td>0.042</td>
      <td>9.0</td>
      <td>84.0</td>
      <td>0.99432</td>
      <td>3.44</td>
      <td>0.44</td>
      <td>10.2</td>
      <td>white</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>5</td>
      <td>8.8</td>
      <td>0.610</td>
      <td>0.14</td>
      <td>2.4</td>
      <td>0.067</td>
      <td>10.0</td>
      <td>42.0</td>
      <td>0.99690</td>
      <td>3.19</td>
      <td>0.59</td>
      <td>9.5</td>
      <td>red</td>
    </tr>
  </tbody>
</table>
</div>

```python
test.head(2) # quality 변수가 없네.. quality가 target?
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
      <th>index</th>
      <th>fixed acidity</th>
      <th>volatile acidity</th>
      <th>citric acid</th>
      <th>residual sugar</th>
      <th>chlorides</th>
      <th>free sulfur dioxide</th>
      <th>total sulfur dioxide</th>
      <th>density</th>
      <th>pH</th>
      <th>sulphates</th>
      <th>alcohol</th>
      <th>type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>9.0</td>
      <td>0.31</td>
      <td>0.48</td>
      <td>6.6</td>
      <td>0.043</td>
      <td>11.0</td>
      <td>73.0</td>
      <td>0.9938</td>
      <td>2.90</td>
      <td>0.38</td>
      <td>11.6</td>
      <td>white</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>13.3</td>
      <td>0.43</td>
      <td>0.58</td>
      <td>1.9</td>
      <td>0.070</td>
      <td>15.0</td>
      <td>40.0</td>
      <td>1.0004</td>
      <td>3.06</td>
      <td>0.49</td>
      <td>9.0</td>
      <td>red</td>
    </tr>
  </tbody>
</table>
</div>

```python
train.info()  # 다행히 결측치는 없다
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 5497 entries, 0 to 5496
    Data columns (total 14 columns):
     #   Column                Non-Null Count  Dtype
    ---  ------                --------------  -----
     0   index                 5497 non-null   int64
     1   quality               5497 non-null   int64
     2   fixed acidity         5497 non-null   float64
     3   volatile acidity      5497 non-null   float64
     4   citric acid           5497 non-null   float64
     5   residual sugar        5497 non-null   float64
     6   chlorides             5497 non-null   float64
     7   free sulfur dioxide   5497 non-null   float64
     8   total sulfur dioxide  5497 non-null   float64
     9   density               5497 non-null   float64
     10  pH                    5497 non-null   float64
     11  sulphates             5497 non-null   float64
     12  alcohol               5497 non-null   float64
     13  type                  5497 non-null   object
    dtypes: float64(11), int64(2), object(1)
    memory usage: 601.4+ KB

```python
# train 데이터셋 변수간 상관관계(train) 보기 - heatmap
plt.figure(figsize=(12,12))
sns.heatmap(data = train.corr(), annot=True);
```

![output_8_0](https://user-images.githubusercontent.com/67591105/151116625-c01279f6-618d-4e6f-986e-d0e4e76fff52.png)

```python
# train의 각 변수별 분포 확인 (subplot)
plt.figure(figsize=(12,12))
for i in range(1,13):
    plt.subplot(3,4,i)
    sns.distplot(train.iloc[:,i])
plt.tight_layout();
    # density 값은 왜 다르지?
    # 확률밀도함수의 y축이 density, 저 함수의 값을 적분하면 값이 1
```

 ![output_9_0](https://user-images.githubusercontent.com/67591105/151116436-4b1aeebb-438a-4552-8fdf-b050f7c0abde.png)

```python
# quality 변수를 기준 다른 피처들의 분포 확인 (barplot)
for i in range(11):
    fig = plt.figure(figsize = (12,6))
    sns.barplot(x= 'quality', y = train.columns[i+2], data = train)

    # 막대그래프는 평균? or 최빈값? , 가운데 선은 편차?
    # 오차막대(?) - 분산?
```

![output_10_0](https://user-images.githubusercontent.com/67591105/151116438-b967049c-0cae-4892-ba51-bb6b6cc96611.png)
![output_10_1](https://user-images.githubusercontent.com/67591105/151116439-e7930d31-9ebe-46b4-b2b1-5cbb46babca8.png)
![output_10_2](https://user-images.githubusercontent.com/67591105/151116441-126100e1-61b4-444e-b468-582126dd2ed6.png)
![output_10_3](https://user-images.githubusercontent.com/67591105/151116443-6b8270dd-faa2-4f2a-a1b0-c0a76460bf37.png)
![output_10_4](https://user-images.githubusercontent.com/67591105/151116446-0c9d033c-f20d-4035-8380-7eca31c37b37.png)

![output_10_5](https://user-images.githubusercontent.com/67591105/151117188-dcaf7e8e-27b6-4ea1-a087-d897fb9c81b5.png)

![output_10_6](https://user-images.githubusercontent.com/67591105/151116449-f705e04c-7ef6-43fe-af40-973d39fd6462.png)

![output_10_7](https://user-images.githubusercontent.com/67591105/151116451-23c194bd-14e2-4238-8c47-a7f809f00dc1.png)

![output_10_8](https://user-images.githubusercontent.com/67591105/151116453-38129264-075c-48d4-b872-8d95a9e9eae4.png)
![output_10_9](https://user-images.githubusercontent.com/67591105/151116456-0a86ee72-4451-4acf-96f6-b2caeb284b7c.png)
![output_10_10](https://user-images.githubusercontent.com/67591105/151116459-38bde0db-a893-49c0-bf44-a69bcfe308c0.png)

### 2. 데이터 전처리

```python
# type은 white와 red 두 종류인데 각각 0과 1로 변환
from sklearn.preprocessing import LabelEncoder

enc = LabelEncoder()
enc.fit(train['type'])
train['type'] = enc.transform(train['type'])
test['type'] = enc.transform(test['type'])
```

```python
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
      <th>index</th>
      <th>quality</th>
      <th>fixed acidity</th>
      <th>volatile acidity</th>
      <th>citric acid</th>
      <th>residual sugar</th>
      <th>chlorides</th>
      <th>free sulfur dioxide</th>
      <th>total sulfur dioxide</th>
      <th>density</th>
      <th>pH</th>
      <th>sulphates</th>
      <th>alcohol</th>
      <th>type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>5</td>
      <td>5.6</td>
      <td>0.695</td>
      <td>0.06</td>
      <td>6.8</td>
      <td>0.042</td>
      <td>9.0</td>
      <td>84.0</td>
      <td>0.99432</td>
      <td>3.44</td>
      <td>0.44</td>
      <td>10.2</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>5</td>
      <td>8.8</td>
      <td>0.610</td>
      <td>0.14</td>
      <td>2.4</td>
      <td>0.067</td>
      <td>10.0</td>
      <td>42.0</td>
      <td>0.99690</td>
      <td>3.19</td>
      <td>0.59</td>
      <td>9.5</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>

```python
train.describe()
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
      <th>index</th>
      <th>quality</th>
      <th>fixed acidity</th>
      <th>volatile acidity</th>
      <th>citric acid</th>
      <th>residual sugar</th>
      <th>chlorides</th>
      <th>free sulfur dioxide</th>
      <th>total sulfur dioxide</th>
      <th>density</th>
      <th>pH</th>
      <th>sulphates</th>
      <th>alcohol</th>
      <th>type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>5497.000000</td>
      <td>5497.000000</td>
      <td>5497.000000</td>
      <td>5497.000000</td>
      <td>5497.000000</td>
      <td>5497.000000</td>
      <td>5497.000000</td>
      <td>5497.000000</td>
      <td>5497.000000</td>
      <td>5497.000000</td>
      <td>5497.000000</td>
      <td>5497.000000</td>
      <td>5497.000000</td>
      <td>5497.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>2748.000000</td>
      <td>5.818992</td>
      <td>7.210115</td>
      <td>0.338163</td>
      <td>0.318543</td>
      <td>5.438075</td>
      <td>0.055808</td>
      <td>30.417682</td>
      <td>115.566491</td>
      <td>0.994673</td>
      <td>3.219502</td>
      <td>0.530524</td>
      <td>10.504918</td>
      <td>0.756595</td>
    </tr>
    <tr>
      <th>std</th>
      <td>1586.991546</td>
      <td>0.870311</td>
      <td>1.287579</td>
      <td>0.163224</td>
      <td>0.145104</td>
      <td>4.756676</td>
      <td>0.034653</td>
      <td>17.673881</td>
      <td>56.288223</td>
      <td>0.003014</td>
      <td>0.160713</td>
      <td>0.149396</td>
      <td>1.194524</td>
      <td>0.429177</td>
    </tr>
    <tr>
      <th>min</th>
      <td>0.000000</td>
      <td>3.000000</td>
      <td>3.800000</td>
      <td>0.080000</td>
      <td>0.000000</td>
      <td>0.600000</td>
      <td>0.009000</td>
      <td>1.000000</td>
      <td>6.000000</td>
      <td>0.987110</td>
      <td>2.740000</td>
      <td>0.220000</td>
      <td>8.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>1374.000000</td>
      <td>5.000000</td>
      <td>6.400000</td>
      <td>0.230000</td>
      <td>0.250000</td>
      <td>1.800000</td>
      <td>0.038000</td>
      <td>17.000000</td>
      <td>78.000000</td>
      <td>0.992300</td>
      <td>3.110000</td>
      <td>0.430000</td>
      <td>9.500000</td>
      <td>1.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>2748.000000</td>
      <td>6.000000</td>
      <td>7.000000</td>
      <td>0.290000</td>
      <td>0.310000</td>
      <td>3.000000</td>
      <td>0.047000</td>
      <td>29.000000</td>
      <td>118.000000</td>
      <td>0.994800</td>
      <td>3.210000</td>
      <td>0.510000</td>
      <td>10.300000</td>
      <td>1.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>4122.000000</td>
      <td>6.000000</td>
      <td>7.700000</td>
      <td>0.400000</td>
      <td>0.390000</td>
      <td>8.100000</td>
      <td>0.064000</td>
      <td>41.000000</td>
      <td>155.000000</td>
      <td>0.996930</td>
      <td>3.320000</td>
      <td>0.600000</td>
      <td>11.300000</td>
      <td>1.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>5496.000000</td>
      <td>9.000000</td>
      <td>15.900000</td>
      <td>1.580000</td>
      <td>1.660000</td>
      <td>65.800000</td>
      <td>0.610000</td>
      <td>289.000000</td>
      <td>440.000000</td>
      <td>1.038980</td>
      <td>4.010000</td>
      <td>2.000000</td>
      <td>14.900000</td>
      <td>1.000000</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 데이터 분리 및 불필요한 변수 제거
    # 독립변수 중 제거해도 좋은 변수가 있을까? 있다면 어떻게 알 수 있을까?
train_x = train.drop(['index','quality'], axis = 1)
train_y = train['quality']
test_x = test.drop('index', axis = 1)
```

```python
train_x.shape, train_y.shape, test_x.shape
```

    ((5497, 12), (5497,), (1000, 12))

### 3. 모델링 진행

```python
# from sklearn.ensemble import RandomForestClassifier
# # 모델선언
# model = RandomForestClassifier()

# # 모델학습
# model.fit(train_x, train_y)
```

    RandomForestClassifier()

```python
from xgboost import XGBClassifier
from sklearn.metrics import roc_auc_score

# XGBClassifier 객체 생성
model = XGBClassifier(n_estimators=500, random_state=156) # 100 -> 500 (0.03 늘어남..)

# 학습 : 성능 평가 지표를 auc로 설정하고 학습 수행.
model.fit(train_x, train_y)
```

    [17:19:36] WARNING: C:/Users/Administrator/workspace/xgboost-win64_release_1.5.1/src/learner.cc:1115: Starting in XGBoost 1.3.0, the default evaluation metric used with the objective 'multi:softprob' was changed from 'merror' to 'mlogloss'. Explicitly set eval_metric if you'd like to restore the old behavior.





    XGBClassifier(base_score=0.5, booster='gbtree', colsample_bylevel=1,
                  colsample_bynode=1, colsample_bytree=1, enable_categorical=False,
                  gamma=0, gpu_id=-1, importance_type=None,
                  interaction_constraints='', learning_rate=0.300000012,
                  max_delta_step=0, max_depth=6, min_child_weight=1, missing=nan,
                  monotone_constraints='()', n_estimators=500, n_jobs=8,
                  num_parallel_tree=1, objective='multi:softprob', predictor='auto',
                  random_state=156, reg_alpha=0, reg_lambda=1,
                  scale_pos_weight=None, subsample=1, tree_method='exact',
                  validate_parameters=1, verbosity=None)

```python
# 학습된 모델로 test 데이터 예측
y_pred = model.predict(test_x)
```

```python
# 제출파일 생성
submission = pd.read_csv('data/sample_submission.csv')
```

```python
submission['quality'] = y_pred
```

```python
submission.head(2)
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
      <th>index</th>
      <th>quality</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>5</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>

```python
submission.to_csv('data/wine_quality_2.csv',index=False)
```
