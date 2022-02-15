---
title: "데이터 스케일링"
---
----

안녕하세요.
데이터 사이언티스트를 위한 정보를 공유하고 있습니다.

M1 Macbook Air를 사용하고 있으며, 블로그의 모든 글은 Mac을 기준으로 작성된 점 참고해주세요.

----

# 데이터 스케일링(scaling)

데이터 스케일링은 데이터 전처리 과정 중 하나입니다.

서로 다른 피처의 값의 범위나 분포를 일정한 수준으로 맞춰주기 위한 작업입니다.

이를테면 나이라는 피처와 재산이라는 피처가 있을 때,

일반적으로 재산의 값이 나이보다 훨씬 클 겁니다.

이러한 경우 특정 모델에서는 재산 피처에 더 가중치가 생길 우려가 있습니다.

물론 따져봐야 할 여러 조건이 있지만 이런 경우를 방지하기 위해 스케일링을 사용하는 것입니다.

----

크게 표준화(Standardization)와 정규화(Normalization) 두 가지 개념으로 스케일링을 진행합니다.

표준화는 피처 각각의 평균이 0, 분산이 1인 가우시안 정규 분포를 가진 값으로 변환하는 것이고,

정규화는 서로 다른 피처의 크기를 특정 범위로 변환해 주는 것입니다.

이러한 스케일링을 도와주기 위해 사이킷런에서 제공하는 스케일러는 다음과 같은 종류가 있습니다.

1. **StandardScaler**
2. **MinMaxScaler**
3. **MaxAbsScaler**
4. **RobustScaler**
5. **Normalizer**

모든 종류의 스케일러의 사용 법은 동일합니다.

각 스케일러에는 fit()과 transform()이라는 메소드가 있습니다.

데이터를 스케일링하기 전에 스케일러는 fit()으로 학습 데이터의 분포를 학습하여 변환을 위한 기준 정보를 설정하고(예를 들면 MinMaxScaler의 경우 학습 데이터에서 최댓값/최솟값을 찾아 설정하는 일 등),

fit()으로 부터 설정된 기준 정보를 바탕으로 transform()으로 학습 데이터와 테스트 데이터를 변환하여 스케일링을 진행합니다.

여기서 주의할 점은 fit()을 학습 데이터에만 적용해야 한다는 것입니다.

fit()은 학습 데이터를 바탕으로 스케일러의 데이터 변환을 위한 정보 설정을 해주는 것인데

테스트 데이터에도 적용하면 테스트 데이터에 맞는 정보 설정이 새로 세팅됩니다.

학습 데이터와 테스트 데이터의 기준 정보가 달라지면 예측 결과에 문제가 발생할 수 있습니다.

따라서 학습 데이터로 부터 설정된 데이터의 기준 정보를 바탕으로 테스트 데이터는 변환, 즉 transform()만 적용하면 되는 것입니다.

이러한 번거로운 점을 상쇄하기 위해서는

가능한 학습 데이터와 테스트 데이터로 분리하기 전에 전체 데이터에서 스케일링을 진행하는 것이 더 바람직합니다.

----

# 1. StandardScaler

피처를 평균이 0, 분산이 1인 가우시안 정규 분포를 갖도록 변환하는 스케일러입니다.

사이킷런의 서포트 벡터 머신(SVM), 선형 회귀(Linear Regression), 로지스틱 회귀(Logistic Regression) 모델은 데이터가 가우시안 분포를 갖고 있다는 전제로 구현되는 모델이기 때문에

StandardScaler를 적용하는 것이 성능 향상에 도움을 줄 수 있습니다.

또한 이상치가 있으면 평균과 표준편차에 영향을 주게 되므로 이상치에 민감한 스케일러입니다.

붓꽃 데이터에 StandardScaler를 사용해 보겠습니다.

In:


```python
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import load_iris

import pandas as pd

iris_data = load_iris()
# 붓꽃 데이터 가져오기
X = pd.DataFrame(data = iris_data.data, columns = iris_data.feature_names)
X.head()
```

Out:
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>sepal length (cm)</th>
      <th>sepal width (cm)</th>
      <th>petal length (cm)</th>
      <th>petal width (cm)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5.1</td>
      <td>3.5</td>
      <td>1.4</td>
      <td>0.2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4.9</td>
      <td>3.0</td>
      <td>1.4</td>
      <td>0.2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4.7</td>
      <td>3.2</td>
      <td>1.3</td>
      <td>0.2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4.6</td>
      <td>3.1</td>
      <td>1.5</td>
      <td>0.2</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5.0</td>
      <td>3.6</td>
      <td>1.4</td>
      <td>0.2</td>
    </tr>
  </tbody>
</table>
In:

```python
print(f"스케일 전 평균\n{X.mean()}\n")
print(f"스케일 전 분산\n{X.var()}")

scaler = StandardScaler()
scaler.fit(X)
scaled_X = scaler.transform(X)
# 스케일러 호출 -> fit() -> transform()이 스케일러 적용의 기본 순서

print("\n------------------\n")

print(f"스케일 후 평균\n{scaled_X.mean()}\n")
print(f"스케일 후 분산\n{scaled_X.var()}")
```

Out:

    스케일 전 평균
    sepal length (cm)    5.843333
    sepal width (cm)     3.057333
    petal length (cm)    3.758000
    petal width (cm)     1.199333
    dtype: float64
    
    스케일 전 분산
    sepal length (cm)    0.685694
    sepal width (cm)     0.189979
    petal length (cm)    3.116278
    petal width (cm)     0.581006
    dtype: float64
    
    ------------------
    
    스케일 후 평균
    -1.4684549872375404e-15
    
    스케일 후 분산
    1.0


StandardScaler 적용 결과 모든 피처가 평균은 0에 매우 가깝고, 분산은 1인 가우시안 정규 분포를 가지는 피처로 변환된 것을 확인할 수 있습니다.

----

# 2. MinMaxScaler

피처의 모든 값이 0과 1 사이의 값이 되도록 변환하는 스케일러입니다.

이름을 따라 피처의 최댓값을 1, 최솟값을 0으로 지정하는 것이죠.

In:


```python
from sklearn.preprocessing import MinMaxScaler

print(f"스케일 전 최솟값\n{X.min()}")
print(f"\n스케일 전 최댓값\n{X.max()}")

scaler = MinMaxScaler()
scaler.fit(X)
scaled_X = scaler.transform(X)

print("\n------------------\n")

print(f"스케일 후 최솟값\n{scaled_X.min()}")
print(f"\n스케일 후 최댓값\n{scaled_X.max()}")
```

Out

    스케일 전 최솟값
    sepal length (cm)    4.3
    sepal width (cm)     2.0
    petal length (cm)    1.0
    petal width (cm)     0.1
    dtype: float64
    
    스케일 전 최댓값
    sepal length (cm)    7.9
    sepal width (cm)     4.4
    petal length (cm)    6.9
    petal width (cm)     2.5
    dtype: float64
    
    ------------------
    
    스케일 후 최솟값
    0.0
    
    스케일 후 최댓값
    1.0


MinMaxScaler 적용 결과 피처의 최댓값은 1, 최솟값은 0으로 변환된 것을 확인할 수 있습니다.

MinMaxScaler 역시나 이상치의 영향을 많이 받는 스케일러입니다.

예를 들어 피처가 1, 2, 3, 100으로 구성되어 있을 때,

MinMaxScaler를 적용하면,

In:


```python
x = [1, 2, 3, 100]
x = pd.DataFrame(x)

scaler = MinMaxScaler()
scaled_x = scaler.fit_transform(x)

scaled_x
```

Out:


    array([[0.        ],
           [0.01010101],
           [0.02020202],
           [1.        ]])



다음과 같이 1을 제외한 변환된 값들이 매우 좁은 범위로 압축되는데

이는 이상치인 100의 영향을 받아 한 쪽으로 치우친 분포를 갖게 된 모습이죠.

----

# 3. MaxAbsScaler

피처의 모든 값의 절대값이 0과 1 사이의 값이 되도록 변환하는 스케일러로서 MinMaxScaler와 같은 방식의 스케일러입니다.

역시 이상치에 민감하게 반응합니다.

----
# 4. RobustScaler

StandardScaler가 피처를 평균이 0, 분산이 1인 분포로 변환한 반면,

RobustScaler는 비슷하지만 평균 대신 중앙값(median)을 사용하고, 분산 대신 IQR(interquartile range)을 사용합니다.

IQR에 대해 잠시 설명하겠습니다.

사분위수는 피처 값을 순서대로 나열한 후 4등분 했을 때,

1/4, 2/4, 3/4, 4/4 위치에 있는 값을 의미합니다.

예를 들어 학생 100명을 시험 성적을 기준으로 등수를 매겼을 때,

1사분위수(Q1)는 75등인 학생, 즉 하위 25% 학생의 성적,

2사분위수(Q2)는 50등인 학생, 즉 하위 50% 학생의 성적,

3사분위수(Q3)는 25등인 학생, 즉 상위 25% 학생의 성적,

4사분위수(Q4)는 1등인 학생의 성적, 즉 최댓값을 의미합니다.

이때 사분위수 범위(IQR = Q3 - Q1)는 25%~75% 범위를 의미합니다.

그러므로 RobustScaler를 다시 설명하면,

피처를 중앙값이 0, IQR이 1인 분포를 갖도록 변환하는 스케일러입니다.

이상치의 영향을 최소화한다는 장점이 있습니다.

----

모든 스케일러는 같은 방식으로 적용이 되기 때문에 MaxAbsScaler와 RobustScaler는 글로 설명만 하였습니다.

각 스케일러를 설명할 때마다 이상치(outlier)에 대해 언급하였는데

그만큼 이상치는 스케일링 효과를 저해하는 요소임을 의미합니다.

따라서 스케일링에 앞서 이상치를 제거해주는 작업을 먼저 해주는 것이 좋습니다.

그리고 스케일링은 항상 모든 피처에 적용하는 것이 아닙니다.

EDA에서 각 피처의 분포 특징 등을 살펴보고 적절히 스케일러를 적용하여야 합니다.

Normalizer의 경우 통계치를 기반으로 이루어지는 앞에 4개의 스케일러와는 목적과 방식이 다릅니다.

다음에 따로 포스팅 하도록 하겠습니다.

----

읽어주셔서 감사합니다.

정보 공유의 목적으로 만들어진 블로그입니다.

미흡한 점은 언제든 댓글로 지적해주시면 감사하겠습니다.

----
