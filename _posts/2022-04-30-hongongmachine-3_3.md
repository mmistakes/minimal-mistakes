---
layout: single
title:  "[혼공머신러닝] 3 - 3 특성 공학과 규제"
categories: hongongmachine
tag: [python, Machine Learning]
toc: true
---

## 특성 공학과 규제

***

### 1. 용어 정리

특성 공학 : 기존의 특성을 사용해 새로운 특성을 뽑아내는 작업 

판다스 : 파이썬 데이터 처리를 위한 라이브러리입니다.

데이터프레임 : 판다스의 핵심 데이터 구조

변환기 : 사이킷런은 특성을 만들거나 전처리하기 위한 다양한 클래스를 제공합니다. 사이킷런에서는 이런 클래스를 변환기라고 부릅니다.

규제 : 머신러닝 모델이 훈련 세트를 너무 과도하게 학습하지 못하도록 훼방하는 것 즉 모델이 훈련 세트에 과대적합되지 않도록 만드는 것

릿지 : 계수를 제곱한 값을 기준으로 규제를 적용

라쏘 : 계수의 절댓값을 기준으로 규제를 적용

하이퍼파라미터 : 머신러닝 모델이 학습할 수 없고 사람이 알려줘야 하는 파라미터

***

### 2. 문제 풀이

#### 2 - 1. 데이터 준비

판다스라는 유명한 데이터 분석 라이브러리를 사용합니다. 데이터프레임은 판다스의 핵심 데이터 구조로 넘파이 배열보다 많은 기능을 제공해 줍니다. 또 데이터프레임은 넘파이 배열로 쉽게 바꿀 수도 있습니다. read_csv() 함수를 사용하여 넘파이 배열로 바꿔드립니다.

```python
import pandas as pd 
df = pd.read_csv('https://bit.ly/perch_csv_data')
perch_full = df.to_numpy() 
print(perch_full)
```

    [[ 8.4   2.11  1.41]
     [13.7   3.53  2.  ]
     [15.    3.82  2.43]
     [16.2   4.59  2.63]
     [17.4   4.59  2.94]
     [18.    5.22  3.32]
     [18.7   5.2   3.12]
     [19.    5.64  3.05]
     [19.6   5.14  3.04]
     [20.    5.08  2.77]
     [21.    5.69  3.56]
     [21.    5.92  3.31]
     [21.    5.69  3.67]
     [21.3   6.38  3.53]
     [22.    6.11  3.41]
     [22.    5.64  3.52]
     [22.    6.11  3.52]
     [22.    5.88  3.52]
     [22.    5.52  4.  ]
     [22.5   5.86  3.62]
     [22.5   6.79  3.62]
     [22.7   5.95  3.63]
     [23.    5.22  3.63]
     [23.5   6.28  3.72]
     [24.    7.29  3.72]
     [24.    6.38  3.82]
     [24.6   6.73  4.17]
     [25.    6.44  3.68]
     [25.6   6.56  4.24]
     [26.5   7.17  4.14]
     [27.3   8.32  5.14]
     [27.5   7.17  4.34]
     [27.5   7.05  4.34]
     [27.5   7.28  4.57]
     [28.    7.82  4.2 ]
     [28.7   7.59  4.64]
     [30.    7.62  4.77]
     [32.8  10.03  6.02]
     [34.5  10.26  6.39]
     [35.   11.49  7.8 ]
     [36.5  10.88  6.86]
     [36.   10.61  6.74]
     [37.   10.84  6.26]
     [37.   10.57  6.37]
     [39.   11.14  7.49]
     [39.   11.14  6.  ]
     [39.   12.43  7.35]
     [40.   11.93  7.11]
     [40.   11.73  7.22]
     [40.   12.38  7.46]
     [40.   11.14  6.63]
     [42.   12.8   6.87]
     [43.   11.93  7.28]
     [43.   12.51  7.42]
     [43.5  12.6   8.14]
     [44.   12.49  7.6 ]]



```python
import numpy as np

perch_weight = np.array(
    [5.9, 32.0, 40.0, 51.5, 70.0, 100.0, 78.0, 80.0, 85.0, 85.0, 
     110.0, 115.0, 125.0, 130.0, 120.0, 120.0, 130.0, 135.0, 110.0, 
     130.0, 150.0, 145.0, 150.0, 170.0, 225.0, 145.0, 188.0, 180.0, 
     197.0, 218.0, 300.0, 260.0, 265.0, 250.0, 250.0, 300.0, 320.0, 
     514.0, 556.0, 840.0, 685.0, 700.0, 700.0, 690.0, 900.0, 650.0, 
     820.0, 850.0, 900.0, 1015.0, 820.0, 1100.0, 1000.0, 1100.0, 
     1000.0, 1000.0]
     ) 
```


```python
from sklearn.model_selection import train_test_split
train_input, test_input, train_target, test_target = train_test_split(perch_full, perch_weight, random_state=42)
```
***

#### 2 - 2. 사이킷런의 변환기

특성을 만들거나 전처리하기 위한 다양한 클래스를 제공해주는 사이킷런은 변환기 클래스를 사용해 더 효과적인 값을 얻을 수 있습니다. include_bias=False를 지정하여 다시 특성을 변환합니다.

```python
from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(include_bias=False)
poly.fit([[2, 3]])
print(poly.transform([[2, 3]]))
```

    [[2. 3. 4. 6. 9.]]

***

#### 2 - 3. 다중 회귀 모델 훈련하기

테스트 세트에 대한 점수는 높아지지 않았지만 농어의 길이만 사용했을 때 있던 과소적합 문제는더 이상 나타나지 않았습니다.

```python
from sklearn.linear_model import LinearRegression

lr = LinearRegression()
lr.fit(train_poly, train_target)
print(lr.score(train_poly, train_target))
print(lr.score(test_poly, test_target))
```

    0.9903183436982124
    0.9714559911594134

이처럼 특성을 추가하면 문제가 생기지 않는 것을 확인해본 결과 3제곱, 4제곱 ,5제곱까지 특성을 추가해 출력을 해보겠습니다.

```python
poly = PolynomialFeatures(degree=5, include_bias=False) 

poly.fit(train_input)
train_poly = poly.transform(train_input)
test_poly = poly.transform(test_input)
print(train_poly.shape)
```

    (42, 55)



```python
lr.fit(train_poly, train_target)
print(lr.score(train_poly, train_target))
```

    0.9999999999991097



```python
print(lr.score(test_poly, test_target))
```

    -144.40579242684848

테스트 점수는 아주 큰 음수가 나오는걸 확인해 볼 수 있습니다. 특성의 개수를 크게 늘리면 선형 모델은 강력해지지만 너무 크게 늘릴 경우 형편없는 값이 나오게 됩니다. 

***

#### 2 - 4. 규제

아래 그림과 같이 왼쪽은 훈련 세트를 과도하게 학습한 결과이고 오른쪽은 기울기를 줄여 보편적인 패턴을 학습하고 있습니다. feature의 개수를 무리하게 늘려주면 과도한 over-fitting이 일어납니다.

![Alt text](https://i.esdrop.com/d/f/uVJApfFjHN/8Kuz1PRdz2.jpg)

훈련 세트로 학습한 변환기를 사용해 테스트 세트까지 변환해줍니다. 

```python
from sklearn.preprocessing import StandardScaler
ss = StandardScaler()
ss.fit(train_poly)
train_scaled = ss.transform(train_poly)
test_scaled = ss.transform(test_poly)
```

***

#### 2 - 5. 릿지 회귀

선형 회귀 모델에 규제를 추가한 모델 중 계수를 제곱한 값을 기준으로 규제를 적용합니다.

```python
from sklearn.linear_model import Ridge 
ridge = Ridge()
ridge.fit(train_scaled, train_target)
print(ridge.score(train_scaled, train_target))
```

    0.9896101671037343



```python
print(ridge.score(test_scaled, test_target))
```

    0.9790693977615397

테스트 세트가 정상적으로 돌아오고 훈련 세트에 너무 과대적합되지 않아 테스트 세트에서도 좋은 성능을 내고 있습니다. 

```python
import matplotlib.pyplot as plt
train_score = []
test_score = []
alpha_list = [0.001, 0.01, 0.1, 1, 10, 100]
for alpha in alpha_list:
    # 릿지 모델을 만듭니다
    ridge = Ridge(alpha=alpha)
    # 릿지 모델을 훈련합니다
    ridge.fit(train_scaled, train_target)
    # 훈련 점수와 테스트 점수를 저장합니다
    train_score.append(ridge.score(train_scaled, train_target))
    test_score.append(ridge.score(test_scaled, test_target))
plt.plot(np.log10(alpha_list), train_score)
plt.plot(np.log10(alpha_list), test_score)
plt.xlabel('alpha')
plt.ylabel('R^2')
plt.show()
```
![Alt text](https://i.esdrop.com/d/f/uVJApfFjHN/itDq2JMfwN.jpg)

적절한 alpha 값은 두 그래프가 가장 가깝고 테스트 세트의 점수가 가장 높은 -1, 즉 0.1입니다. alpha 값이 0.1로 결정을 하여 훈련을 하겠습니다.

밑에와 같이 훈련 세트, 테스트 세트의 점수가 비슷하게 높고 과대적합, 과소적합 사이에서 균형을 맞추고 있습니다.

```python
ridge = Ridge(alpha=0.1)
ridge.fit(train_scaled, train_target)

print(ridge.score(train_scaled, train_target))
print(ridge.score(test_scaled, test_target))
```

    0.9903815817570366
    0.9827976465386926

***

#### 2 - 6. 라쏘 회귀

릿지 회귀의 방식과 똑같이 진행해보겠습니다.기본적으로 라쏘 또한 릿지 회귀와 같이 과대적합을 잘 억제했고, 테스트 세트의 점수도 좋게 나왔습니다.

```python
from sklearn.linear_model import Lasso 
lasso = Lasso()
lasso.fit(train_scaled, train_target)
print(lasso.score(train_scaled, train_target))
```

    0.989789897208096

```python
print(lasso.score(test_scaled, test_target))
```

    0.9800593698421883

적절한 alpha 값을 찾기 위해 그래프를 그려보겠습니다.

```python
train_score = []
test_score = []

alpha_list = [0.001, 0.01, 0.1, 1, 10, 100]
for alpha in alpha_list:
    # 라쏘 모델을 만듭니다
    lasso = Lasso(alpha=alpha, max_iter=10000000)
    # 라쏘 모델을 훈련합니다
    lasso.fit(train_scaled, train_target)
    # 훈련 점수와 테스트 점수를 저장합니다
    train_score.append(lasso.score(train_scaled, train_target))
    test_score.append(lasso.score(test_scaled, test_target))
```

```python
plt.plot(np.log10(alpha_list), train_score)
plt.plot(np.log10(alpha_list), test_score)
plt.xlabel('alpha')
plt.ylabel('R^2')
plt.show()
```

![Alt text](https://i.esdrop.com/d/f/uVJApfFjHN/xSgEpvx3oY.jpg)

최적의 alpha값은 1로 즉 10^1 = 10입니다. 이 값으로 모델을 훈련하겠습니다.

```python
lasso = Lasso(alpha=10)
lasso.fit(train_scaled, train_target)

print(lasso.score(train_scaled, train_target))
print(lasso.score(test_scaled, test_target))
```

    0.9888067471131867
    0.9824470598706695

***

공부한 전체 코드는 깃허브에 올렸습니다.
<https://github.com/mgskko/Data_science_Study-hongongmachine/blob/main/%ED%98%BC%EA%B3%B5%EB%A8%B8%EC%8B%A0_3%EA%B0%95_3.ipynb>