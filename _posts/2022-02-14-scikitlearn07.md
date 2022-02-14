---
title: "데이터 인코딩 - Mean target encoding"
---
----

안녕하세요. 데이터 사이언티스트를 위한 정보를 공유하고 있습니다.

M1 Macbook Air를 사용하고 있으며, 블로그의 모든 글은 Mac을 기준으로 작성된 점 참고해주세요.

----

지난 데이터 인코딩 포스팅 이어서 글 작성하겠습니다.

# 3. Mean (target) encoding

Mean encoding 또는 Mean Target encoding이라고도 하는데요.

Mean encoding은 앞선 One-Hot encoding의 high cardinality 문제,

즉 새로운 피처가 지나치게 많이 발생하는 문제를 개선하여 빠른 속도로 학습을 진행할 수 있습니다.

Mean encoding은 카테고리 피처의 타겟값에 의존하는데

카테고리 별 타겟값의 평균값을 인코딩의 결과로 변환하는 방식입니다.

----

역시 글로는 쉽게 와닿지 않을 수 있을 것 같아 바로 예시로 보여드리겠습니다.

캐글의 타이타닉 데이터를 활용하겠습니다.([Kaggle Titanic data](https://www.kaggle.com/c/titanic/data))

타이타닉 데이터에 대해 간단히 설명드리자면

성별, 나이, 티켓 등급 등의 피처들이 있고, 생존 여부를 타겟값으로 하는 데이터로서

생존 여부를 분류 예측하기 위한 데이터 세트이며,

판다스나 사이킷런 등의 라이브러리 실습을 위해 자주 사용되는 데이터 세트입니다.

먼저 타이타닉 데이터를 가져와 'Survived' 칼럼을 타겟으로 지정해 주겠습니다.

In:


```python
import pandas as pd

titanic_df = pd.read_csv("/content/drive/MyDrive/Colab Notebooks/titanic_train.csv")
# 타이타닉 데이터 불러오기
titanic_df["Target"] = titanic_df["Survived"]
# 생존 여부를 타겟으로 지정
titanic_df.head()
```

Out:

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
      <th>Target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>0</td>
      <td>3</td>
      <td>Braund, Mr. Owen Harris</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>A/5 21171</td>
      <td>7.2500</td>
      <td>NaN</td>
      <td>S</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>1</td>
      <td>1</td>
      <td>Cumings, Mrs. John Bradley (Florence Briggs Th...</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>PC 17599</td>
      <td>71.2833</td>
      <td>C85</td>
      <td>C</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>1</td>
      <td>3</td>
      <td>Heikkinen, Miss. Laina</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>STON/O2. 3101282</td>
      <td>7.9250</td>
      <td>NaN</td>
      <td>S</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>1</td>
      <td>1</td>
      <td>Futrelle, Mrs. Jacques Heath (Lily May Peel)</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>113803</td>
      <td>53.1000</td>
      <td>C123</td>
      <td>S</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>0</td>
      <td>3</td>
      <td>Allen, Mr. William Henry</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>373450</td>
      <td>8.0500</td>
      <td>NaN</td>
      <td>S</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
Target 값이 0이면 생존하지 못한 것이고, 1이면 생존한 것입니다.

In:


```python
sex_mean = titanic_df.groupby("Sex")["Target"].mean()
# 'male'과 'female'로 각각 그룹화한 후, 각 그룹의 'Target'의 평균값을 도출
sex_mean
```

Out:


    Sex
    female    0.742038
    male      0.188908
    Name: Target, dtype: float64

In:


```python
titanic_df["Sex_mean"] = titanic_df["Sex"].map(sex_mean)
# 타이타닉 데이터의 성별과 위에서 도출했던 성별 별 타겟의 평균값을 매핑
titanic_df[["Sex", "Sex_mean", "Survived"]]
# 인코딩 결과를 확인하기 위해 세 개의 칼럼만 확인
```

Out:

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Sex</th>
      <th>Sex_mean</th>
      <th>Survived</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>male</td>
      <td>0.188908</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>female</td>
      <td>0.742038</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>female</td>
      <td>0.742038</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>female</td>
      <td>0.742038</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>male</td>
      <td>0.188908</td>
      <td>0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>886</th>
      <td>male</td>
      <td>0.188908</td>
      <td>0</td>
    </tr>
    <tr>
      <th>887</th>
      <td>female</td>
      <td>0.742038</td>
      <td>1</td>
    </tr>
    <tr>
      <th>888</th>
      <td>female</td>
      <td>0.742038</td>
      <td>0</td>
    </tr>
    <tr>
      <th>889</th>
      <td>male</td>
      <td>0.188908</td>
      <td>1</td>
    </tr>
    <tr>
      <th>890</th>
      <td>male</td>
      <td>0.188908</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>891 rows × 3 columns</p>

성별마다 생존한 사람과 그렇지 못한 사람이 존재하겠지만,

Mean encoding을 적용해 보니 생존율의 평균이 남성은 약 0.19, 여성은 0.74인 것을 확인할 수 있습니다.

이는 남성은 0이 많고, 여성은 1이 많다는 뜻으로 타이타닉호 침몰 사고에서 여성의 생존율이 더 높았다는 뜻입니다.

이처럼 Mean encoding이 적용되면 인코딩된 값과 타겟값 간의 실질적인 연관이 생기게 됩니다.

----

Mean encoding도 역시 문제점이 있습니다.

첫 번째로 구현과 검증이 어렵습니다.

두 번째는 data leakage 문제인데 data leakage란 머신러닝에서 학습 데이터 외부로 부터 유입된 정보가 모델을 만들 때 사용되는 것을 의미합니다.

Mean encoding의 경우 타겟값의 평균값을 사용하기 때문에 타겟값에 대한 정보가 피처로 들어가게 되는 것입니다.

이는 모델이 학습 데이터에 과적합(overfitting)되는 현상을 초래합니다.

또한 학습 데이터와 테스트 데이터의 분포가 다른 경우에도 문제가 생길 수 있습니다.

평균값을 사용하는 인코딩이기 때문에

학습 데이터에서 변환한 특정 피처에 대한 평균값이, 즉 인코딩한 값이

학습 데이터와 분포가 다른 테스트 데이터에서는 해당 피처를 대표하는 값이 아닐 수도 있는 겁니다.

----

Mean encoding의 문제점을 개선하기 위한 여러 가지 방식이 존재합니다.

1. **K-Fold Regularization**
2. **Expanding Mean**
3. **Smoothing**

각 문제 해결에 대해서 자세히 다루기에는 내용이 방대하므로 간략하게 설명하도록 하겠습니다.

----

# 1. K-Fold Regularization

교차 검증에 대해서 포스팅한 바가 있는데요.

교차 검증을 방식을 통해 폴드 수 만큼 Mean encoding을 진행하는 방식입니다.

교차 검증 포스팅에서는 StratifiedKFold() 사용하는 대신 cross_val_score()를 사용했습니다.

이번에는 교차 검증 결과를 반환하는 것이 아니라 폴드를 나누어 반복문을 진행하는 것이 목적입니다.

따라서 다음 코드에서 StratifiedKFold() 사용법을 같이 익혀주면 좋을 것 같습니다.

In:


```python
from sklearn.model_selection import train_test_split, StratifiedKFold

import numpy as np

train_titanic, test_titanic = train_test_split(titanic_df, test_size = 0.2, random_state = 4)
# 데이터를 학습 데이터, 테스트 데이터로 분리

new_train_titanic = train_titanic.copy()
new_train_titanic[:] = np.nan
# 인코딩 한 데이터를 저장하기 위해 titanic 데이터를 복사해서 비워둠

X_train = train_titanic.drop(["Target", "Survived"], axis = 1)
# 피처 데이터
y_train = train_titanic["Target"]
# 타겟 데이터

skfold = StratifiedKFold(n_splits = 5, shuffle = True, random_state = 4)
# 5개의 폴드로 나누는 StratifiedKFold 객체를 만들기

for train_index, validation_index in skfold.split(X_train, y_train):
  X_train = train_titanic.iloc[train_index]
  # 학습 데이터 지정
  X_validation = train_titanic.iloc[validation_index]
  # 검증 데이터 지정

  sex_mean = X_train.groupby("Sex")["Target"].mean()
  X_validation["Sex_mean"] = X_validation["Sex"].map(sex_mean)
  # Mean encoding으로 변환된 학습 데이터의 'Sex_mean' 칼럼을 하나의 폴드(X_validation)에만 저장
  new_train_titanic.iloc[validation_index] = X_validation
  # 인덱스에 맞춰 새로 만들어 놓은 new_train_titanic에 저장

new_train_titanic.head()
```

Out:

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
      <th>Target</th>
      <th>Sex_mean</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>42</th>
      <td>43.0</td>
      <td>0.0</td>
      <td>3.0</td>
      <td>Kraeff, Mr. Theodor</td>
      <td>male</td>
      <td>NaN</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>349253</td>
      <td>7.8958</td>
      <td>NaN</td>
      <td>C</td>
      <td>0.0</td>
      <td>0.195055</td>
    </tr>
    <tr>
      <th>684</th>
      <td>685.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>Brown, Mr. Thomas William Solomon</td>
      <td>male</td>
      <td>60.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>29750</td>
      <td>39.0000</td>
      <td>NaN</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.191136</td>
    </tr>
    <tr>
      <th>605</th>
      <td>606.0</td>
      <td>0.0</td>
      <td>3.0</td>
      <td>Lindell, Mr. Edvard Bengtsson</td>
      <td>male</td>
      <td>36.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>349910</td>
      <td>15.5500</td>
      <td>NaN</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.195055</td>
    </tr>
    <tr>
      <th>409</th>
      <td>410.0</td>
      <td>0.0</td>
      <td>3.0</td>
      <td>Lefebre, Miss. Ida</td>
      <td>female</td>
      <td>NaN</td>
      <td>3.0</td>
      <td>1.0</td>
      <td>4133</td>
      <td>25.4667</td>
      <td>NaN</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.747619</td>
    </tr>
    <tr>
      <th>740</th>
      <td>741.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>Hawksford, Mr. Walter James</td>
      <td>male</td>
      <td>NaN</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>16988</td>
      <td>30.0000</td>
      <td>D45</td>
      <td>S</td>
      <td>1.0</td>
      <td>0.189415</td>
    </tr>
  </tbody>
</table>
 In:

```python
new_train_titanic.groupby(["Sex", "Sex_mean"])["PassengerId"].count()
# 성별로 그룹화하고, 폴드 별로 타겟값 평균값을 확인
```

Out:


    Sex     Sex_mean
    female  0.709677    45
            0.742718    56
            0.747619    52
            0.751196    53
            0.752427    56
    male    0.189415    91
            0.191136    89
            0.195055    86
            0.198347    87
            0.203966    97
    Name: PassengerId, dtype: int64

폴드를 5개로 나누어 5번씩 인코딩을 진행했으므로

'male'과 'female' 카테고리가 각각 인코딩된 값이 5개씩 있다는 것을 확인할 수 있습니다.

카테고리 별로 평균값이 다양해지면서 data leakage를 줄여주는 효과가 있으며,

카테고리가 더 세분화되면서 트리 기반 모델에서 더 좋은 성능을 보일 수 있습니다.

----

# 2. Expandimng Mean Regularization

폴드를 나눈 방식처럼 인코딩 되는 카테고리를 세분화하는 방식인데

보다 더 잘게 나누어 카테고리를 더 다양하게 만들어주는 방식입니다.

그러다 보니 data leakage를 더 잘 줄여준다고 합니다.

범주형 변수를 분류할 때 유용한 모델인 CatBoost 모델에 내장된 기능이라고 하네요.

----

# 3. Smoothing

학습 데이터와 테스트 데이터의 분포에 큰 차이가 있을 때의 문제를 해결해 주는 방법입니다.

인코딩으로 변환된 값을 테스트 데이터를 포함한 전체 데이터에서 구한 평균값에 가깝게 보정하여 문제를 해결합니다.

Mean encoding의 문제를 해결하는 방식들에 대해서는 다음 기회에 더 자세히 다루도록 하겠습니다.

----

읽어주셔서 감사합니다.

정보 공유의 목적으로 만들어진 블로그입니다.

미흡한 점은 언제든 댓글로 지적해주시면 감사하겠습니다.

----
