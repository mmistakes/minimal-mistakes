---
layout: single
title:  "40_Gaussian_Naive_Bayes_가우시안나이브베이즈"
categories : python
tag : [review]
search: true #false로 주면 검색해도 안나온다.
---

![제목 없음2](../../images/2022-07-01-40_Gaussian_Naive_Bayes_가우시안나이브베이즈/제목 없음2.png){: width="100%" height="100%"}

![제목 없음](../../images/2022-07-01-40_Gaussian_Naive_Bayes_가우시안나이브베이즈/제목 없음-16612525675253.png){: width="100%" height="100%"}


```python
import warnings
warnings.filterwarnings('ignore')
import numpy as np
import pandas as pd
import sklearn
```

가우시안 나이브 베이즈를 활용한 붓꽃 분류  
iris 데이터를 활용해 데이터의 특징에 따라 붓꽃의 종류를 구분한다.


```python
# 사이킷런에서 제공하는 iris 데이터를 불러오기 위해서 import 한다.
from sklearn.datasets import load_iris
# 학습 데이터와 테스트 데이터를 손쉽게 나눌 수 있도록 import 한다.
from sklearn.model_selection import train_test_split
# 가우시안 나이브 베이즈로 iris 데이터를 분류하기 위해 import 한다.
from sklearn.naive_bayes import GaussianNB
# 분류 성능을 측정하기 위해 사이킷런의 metrics 모듈의 accuracy_score, classification_report를 import 한다.
from sklearn.metrics import classification_report
from sklearn.metrics import accuracy_score
```


```python
# iris 데이터 셋을 불러온다.
dataset = load_iris()
# print(type(dataset)) # sklearn.utils.Bunch
# print(dataset.feature_names) # 열 이름
# 'sepal length (cm)' => 꽃 받침 길이, 'sepal width (cm)' => 꽃 받침 너비, 'petal length (cm)' => 꽃잎 길이, 
# 'petal width (cm)' => 꽃잎 너비
# print(dataset.data) # 데이터
df = pd.DataFrame(dataset.data, columns=dataset.feature_names)
# print(dataset.target) # 실제값, 0 => 'setosa', 1 => 'versicolor', 2 => 'virginica'
df['target'] = dataset.target
df.target = df.target.map({0: 'setosa', 1: 'versicolor', 2: 'virginica'})
# print(type(df))
df
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
      <th>sepal length (cm)</th>
      <th>sepal width (cm)</th>
      <th>petal length (cm)</th>
      <th>petal width (cm)</th>
      <th>target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5.1</td>
      <td>3.5</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4.9</td>
      <td>3.0</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4.7</td>
      <td>3.2</td>
      <td>1.3</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4.6</td>
      <td>3.1</td>
      <td>1.5</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5.0</td>
      <td>3.6</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>145</th>
      <td>6.7</td>
      <td>3.0</td>
      <td>5.2</td>
      <td>2.3</td>
      <td>virginica</td>
    </tr>
    <tr>
      <th>146</th>
      <td>6.3</td>
      <td>2.5</td>
      <td>5.0</td>
      <td>1.9</td>
      <td>virginica</td>
    </tr>
    <tr>
      <th>147</th>
      <td>6.5</td>
      <td>3.0</td>
      <td>5.2</td>
      <td>2.0</td>
      <td>virginica</td>
    </tr>
    <tr>
      <th>148</th>
      <td>6.2</td>
      <td>3.4</td>
      <td>5.4</td>
      <td>2.3</td>
      <td>virginica</td>
    </tr>
    <tr>
      <th>149</th>
      <td>5.9</td>
      <td>3.0</td>
      <td>5.1</td>
      <td>1.8</td>
      <td>virginica</td>
    </tr>
  </tbody>
</table>
<p>150 rows × 5 columns</p>
</div>

데이터 시각화


```python
setosa_df = df[df.target == 'setosa']
versicolor_df = df[df.target == 'versicolor']
virginica_df = df[df.target == 'virginica']
```

꽃 받침 길이

[]: https://wikidocs.net/159927	"kde"


```python
ax = setosa_df['sepal length (cm)'].plot(kind='hist')
setosa_df['sepal length (cm)'].plot(kind='kde', ax=ax, secondary_y=True, title='setosa sepal length (cm) distrubution', 
                                    figsize=[8, 4])
```


    <AxesSubplot:label='7c4da28c-cf85-45da-b77a-4f85ad551c0f'>

![output_8_1](../../images/2022-07-01-40_Gaussian_Naive_Bayes_가우시안나이브베이즈/output_8_1.png){: width="100%" height="100%"}
 꽃 받침 너비


```python
ax = setosa_df['sepal width (cm)'].plot(kind='hist')
setosa_df['sepal width (cm)'].plot(kind='kde', ax=ax, secondary_y=True, title='setosa sepal width (cm) distrubution', 
                                    figsize=[8, 4])
```


    <AxesSubplot:label='532e2c24-4336-4397-9be1-f9994c383ba2'>

![output_10_1](../../images/2022-07-01-40_Gaussian_Naive_Bayes_가우시안나이브베이즈/output_10_1.png){: width="100%" height="100%"}


꽃잎 길이


```python
ax = setosa_df['petal length (cm)'].plot(kind='hist')
setosa_df['petal length (cm)'].plot(kind='kde', ax=ax, secondary_y=True, title='setosa petal length (cm) distrubution', 
                                    figsize=[8, 4])
```


    <AxesSubplot:label='e6906f89-fd8e-4653-8523-68bdc1ca5ba7'>

![output_12_1](../../images/2022-07-01-40_Gaussian_Naive_Bayes_가우시안나이브베이즈/output_12_1.png){: width="100%" height="100%"}


꽃잎 너비


```python
ax = setosa_df['petal width (cm)'].plot(kind='hist')
setosa_df['petal width (cm)'].plot(kind='kde', ax=ax, secondary_y=True, title='setosa petal width (cm) distrubution', 
                                    figsize=[8, 4])
```


    <AxesSubplot:label='814eba03-378b-41d4-876c-5f5ba9ad3e8b'>

![output_14_1](../../images/2022-07-01-40_Gaussian_Naive_Bayes_가우시안나이브베이즈/output_14_1.png){: width="100%" height="100%"}


데이터 다듬기


```python
# 전체 데이터를 80%는 학습에 사용하고 나머지 20%는 테스트에 사용한다.
x_train, x_test, y_train, y_test = train_test_split(dataset.data, dataset.target, train_size=0.8, test_size=0.2)
print('x_train: {}, x_test: {}'.format(len(x_train), len(x_test)))
print('y_train: {}, y_test: {}'.format(len(y_train), len(y_test)))
print('꽃받침 길이, 꽃받침 너비, 꽃잎 길이, 꽃잎 너비(문제): {}, 품종(답): {}'.format(x_train[0], y_train[0]))
```

    x_train: 120, x_test: 30
    y_train: 120, y_test: 30
    꽃받침 길이, 꽃받침 너비, 꽃잎 길이, 꽃잎 너비(문제): [7.4 2.8 6.1 1.9], 품종(답): 2


가우시안 나이브 베이즈 모델 학습


```python
model = GaussianNB()
model.fit(x_train, y_train)
```


    GaussianNB()

테스트


```python
predict = model.predict(x_test) # 학습 결과에 따른 테스트 데이터의 예측값을 계산한다.
print(classification_report(y_test, predict)) # 테스트 데이터의 실제값, 예측값
# accuracy: 정확도, precision: 정밀도, recall: 재현율, f1-score: f1 점수
```

                  precision    recall  f1-score   support
    
               0       1.00      1.00      1.00        11
               1       0.91      1.00      0.95        10
               2       1.00      0.89      0.94         9
    
        accuracy                           0.97        30
       macro avg       0.97      0.96      0.96        30
    weighted avg       0.97      0.97      0.97        30


```python
print('정확도(accuracy): {}'.format(accuracy_score(y_test, predict))) # # 테스트 데이터의 실제값, 예측값
```

    정확도(accuracy): 0.9666666666666667

```python
comparsion = pd.DataFrame({'실제값': y_test, '예측값': predict})
comparsion
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
      <th>실제값</th>
      <th>예측값</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>6</th>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <th>7</th>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <th>8</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>9</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>10</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>11</th>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>12</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>13</th>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>14</th>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>15</th>
      <td>2</td>
      <td>1</td>
    </tr>
    <tr>
      <th>16</th>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>17</th>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>18</th>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <th>19</th>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <th>20</th>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>21</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>22</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>23</th>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <th>24</th>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>25</th>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <th>26</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>27</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>28</th>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <th>29</th>
      <td>1</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>
