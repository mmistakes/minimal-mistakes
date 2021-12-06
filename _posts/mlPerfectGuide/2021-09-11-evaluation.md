---
published: true
layout: single
title: "[Machine Learning PerfectGuide] 평가 (Evaluation)"
category: mlbasic
tags:
comments: true
sidebar:
  nav: "mainMenu"
use_math: true
--- 
* * *

#### 정확도(Accuracy)
* * *
- 직관적으로 모델 예측 성능을 나타내는 평가 지표.
- 하지만 이진 분류의 경우 데이터의 구성에 따라 ML 모델의 성능을 왜곡할 가능성이 有.

#### 오차 행렬(Confusion Matrix)
* * *
- 이진 분류의 예측 오류가 얼마인지와 더불어 어떤 유형의 오류가 발생하고 있는지를 함께 나타내는 지표.
- 오차 행렬은 TN, FP, FN, TP로 4가지로 레이블 클래스 값과 예측 레이블 값의 유형을 분류함.
> TN은 예측값을 Negative 값 0으로 예측했는데 실제 값 역시 Negative 0  
> FP는 예측값을 Positive 값 1로 예측했는데 실제 값은 Negative 0  
> FN은 예측값을 Negative 값 0으로 예측했는데 실제 값은 Positive 1  
> TP는 예측값을 Positive 값 1로 예측했는데 실제 값 역시 Positive 1  
- 오차 행렬을 사용한 정확도
$ Accuracy = \frac{TN + TP}{TN + FP + FN + TP}$

#### 정밀도 & 재현율
* * *
- 정밀도와 재현율은 오차 행렬을 사용하여 Positive 데이터 셋의 예측 성능에 좀 더 초점을 맞춘 평가 지표.
- 정밀도 공식 : 
$Precision = \frac{TP}{FP + TP}$
- 재현율 공식 : 
$Recall = \frac{TP}{FN + TP}$
- 정밀도는 TP를 높이고 FP를 낮추는데 초점을 둔다. 즉 Negative를 Positive로 잘못 판단하는 경우를 줄이는 것이 목표.
- 재현율은 TP를 높이고 FN을 낮추는데 초점을 둔다. 즉 Positive를 Negative로 잘못 판단하는 경우를 줄이는 것이 목표.

#### sklearn function
- 정확도 : accuracy_score
- 정밀도 : precision_score
- 재현율 : recall_score
- 오차 행렬 : confusion_matrix

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, precision_score, recall_score, confusion_matrix

def get_clf_eval(y_test, pred):
  confusion = confusion_matrix(y_test, pred)
  accuracy = accuracy_score(y_test, pred)
  precision = precision_score(y_test, pred)
  recall = recall_score(y_test, pred)
  print('오차 행렬')
  print(confusion)
  print('정확도: {0: .4f}, 정밀도: {1: .4f}, 재현율: {2: .4f}'.format(accuracy, precision, recall))

titanic_df = pd.read_csv('../../kaggle/titanic/train.csv')

y_titanic_df = titanic_df['Survived']
X_titanic_df = titanic_df.drop('Survived', axis=1)

X_titanic_df['Age'].fillna(X_titanic_df['Age'].mean(), inplace=True)
X_titanic_df['Cabin'] = X_titanic_df['Cabin'].str[:1]
X_titanic_df['Cabin'].fillna('N', inplace=True)
X_titanic_df['Embarked'].fillna('S', inplace=True)

X_titanic_df.drop(['PassengerId', 'Name', 'Ticket'], axis=1, inplace=True)

features = ['Sex', 'Cabin', 'Embarked']
for feature in features:
    encoder = LabelEncoder()
    encoder.fit(X_titanic_df[feature])
    X_titanic_df[feature] = encoder.transform(X_titanic_df[feature])

X_train, X_test, y_train, y_test = train_test_split(X_titanic_df, y_titanic_df, test_size=0.2)

lr_clf = LogisticRegression(max_iter=500)
lr_clf.fit(X_train, y_train)
pred = lr_clf.predict(X_test)

get_clf_eval(y_test, pred)
```

```
오차 행렬
[[99 18]
 [15 47]]
정확도:  0.8156, 정밀도:  0.7231, 재현율:  0.7581
```

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>