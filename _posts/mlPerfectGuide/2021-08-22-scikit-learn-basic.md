---
published: true
layout: single
title: "[Machine Learning PerfectGuide] scikit-learn 기초"
category: mlbasic
tags:
comments: true
sidebar:
  nav: "mainMenu"
--- 
* * *

#### 데이터 사이언스 기본 용어
* * *

Feature(속성)
- Data Set의 일반 속성.

레이블, 클래스, 타겟(값), 결정(값)
- 학습을 위해 주어지는 정답 데이터.
- 지도 학습 중 분류의 경우에는 이 타겟값을 레이블 또는 클래스로 지칭함.

지도학습 - 분류
- 데이터 셋을 학습데이터/테스트데이터로 분류 후 학습 데이터를 사용하여 모델을 학습 후 테스트 데이터를 얼마나 잘 분류할 수 있는지 평가.

<br>

#### 사이킷런 프레임워크
* * *

사이킷런에서 Estimator는 분류(Classifier)와 회귀(Regressor)로 나뉨.

분류(Classifier)
- DecisionTreeClassifier
- RandomForestClassifier
- GaussianNB
- SVC

회귀(Regressor)
- LinearRegression
- Ridge
- Lasso
- RandomForestRegressor
- GradientBoostingRegressor

<br>

#### 사이킷런을 사용하여, 붓꽃 품종 예측하기 (무작정 따라하기)
* * *
```python
from sklearn.datasets import load_iris               # Toy용 iris data load
from sklearn.tree import DecisionTreeClassifier      # 결정 트리 알고리즘
from sklearn.model_selection import train_test_split # 학습/테스트 데이터 분리 모듈
from sklearn.metrics import accuracy_score           # 예측 정확도를 평가하는 모듈

# 붓꽃 데이터 셋 로딩
# [ (f1, f2, f3, f4, ..), (target)
#   ...  
#   ...
# ]
iris = load_iris()

# iris.data는 Iris 데이터 세트에서 피처(feature)만으로 된 데이터를 numpy로 가지고 있음.
iris_data = iris.data

# iris.target은 tartget값을 numpy로 가지고 있음.
# [0 0 0 ... 1 1 1 ... 2 2 2 ... 2]
iris_target = iris.target

# 붓꽃 데이터 세트를 DataFrame으로 변경
iris_df = pd.DataFrame(data=iris_data, columns=iris.feature_names)
iris_df['label'] = iris.targe

# 학습 데이터와 테스트 데이터 세트로 분리
# test dataset과 학습 dataset을 2:8로 분리
# X_train, X_test는 학습 데이터와 테스트 데이터 셋
# y_train, y_test는 학습 데이터의 target값과 테스트 데이터의 target 값
X_train, X_test, y_train, y_test = train_test_split(iris_data, iris_label, test_size=0.2, random_state=11)

# DecisionTreeClassifier 객체 생성
# random_state는 난수를 생성하는 seed
# 왜 seed를 설정해주었는지? => 인강의 예제와 동일한 결과를 얻기 위해서
dt_clf = DecisionTreeClassifier(random_state=11)

# 학습 수행 fit()
dt_clf.fit(X_train, y_train)

# 테스트 데이터 세트로 예측(Predict) 수행
pred = dt_clf.predict(X_test)

# y_test는 실제 target 값, pred는 예측 값
# 정확도 출력
print('예측 정확도: {0:.4f}'.format(accuracy_score(y_test,pred)))
```

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>

#### 사이킷런 train_test_split() - 학습/테스트 데이터 셋 분리
* * *

```python
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

dt_clf = DecisionTreeClassifier( )
iris_data = load_iris()

# ndarray : iris_data.data, iris_data.target가 ndarray이므로 ndarray 반환 !!!!
X_train, X_test,y_train, y_test= train_test_split(iris_data.data, iris_data.target, 
                                                    test_size=0.3, random_state=121)

print(type(X_train), type(X_test), type(y_train), type(y_test))



# DataFrame/Series : ftr_df, tgt_df가 DataFrame/Series 이므로 DataFrame/Series 반환 !!!!

iris_df = pd.DataFrame(iris_data.data, columns=iris_data.feature_names)
iris_df['target'] = iris_data.target

ftr_df = iris_df.iloc[:, :-1]
tgt_df = iris_df.iloc[:, -1]

X_train, X_test, y_train, y_test = train_test_split(ftr_df, tgt_df,
                                                    test_size=0.3, random_state=121)

print(type(X_train), type(X_test), type(y_train), type(y_test))
```

```
<class 'numpy.ndarray'> <class 'numpy.ndarray'> <class 'numpy.ndarray'> <class 'numpy.ndarray'>
<class 'pandas.core.frame.DataFrame'> <class 'pandas.core.frame.DataFrame'> <class 'pandas.core.series.Series'> <class 'pandas.core.series.Series'>
```

<br>

#### K 폴드 교차 검증
* * *
- 데이터셋을 Test Data set, Training Data set으로 분할할 때, K개로 나눈 후
분할된 데이터 셋을 학습 데이터셋/ 검증 데이터 셋으로 교차로 반복 사용하여 학습하는 방식.

```python
import numpy as np

from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn.datasets import load_iris
from sklearn.model_selection import KFold

if __name__ == '__main__':
    dt_clf = DecisionTreeClassifier()
    iris = load_iris()

    features = iris.data
    label = iris.target
    df_clf = DecisionTreeClassifier(random_state=156)

    # 5개의 폴드 세트로 분리하는 KFold 객체와 폴드 세트별 정확도를 담을 리스트 객체 생성.
    kfold = KFold(n_splits=5)
    cv_accuracy = []
    print("붓꽃 데이터 세트 크기 :", features.shape[0])

    n_iter = 0
    for train_index, test_index in kfold.split(features):
        # kfold.split( )으로 반환된 인덱스를 이용하여 학습용, 검증용 테스트 데이터 추출
        X_train, X_test = features[train_index], features[test_index]
        y_train, y_test = label[train_index], label[test_index]

        # 학습 및 예측
        dt_clf.fit(X_train, y_train)
        pred = dt_clf.predict(X_test)
        n_iter += 1

        # 반복 시 마다 정확도 측정
        accuracy = np.round(accuracy_score(y_test, pred), 4)
        train_size = X_train.shape[0]
        test_size = X_test.shape[0]
        print('\n#{0} 교차 검증 정확도 :{1}, 학습 데이터 크기: {2}, 검증 데이터 크기: {3}'
              .format(n_iter, accuracy, train_size, test_size))
        print('#{0} 검증 세트 인덱스:{1}'.format(n_iter, test_index))

        cv_accuracy.append(accuracy)

    # 개별 iteration별 정확도를 합하여 평균 정확도 계산
    print('\n## 평균 검증 정확도:', np.mean(cv_accuracy))

```
```
#1 교차 검증 정확도 :1.0, 학습 데이터 크기: 120, 검증 데이터 크기: 30
#1 검증 세트 인덱스:[ 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
 24 25 26 27 28 29]

#2 교차 검증 정확도 :1.0, 학습 데이터 크기: 120, 검증 데이터 크기: 30
#2 검증 세트 인덱스:[30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53
 54 55 56 57 58 59]

#3 교차 검증 정확도 :0.8333, 학습 데이터 크기: 120, 검증 데이터 크기: 30
#3 검증 세트 인덱스:[60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83
 84 85 86 87 88 89]

#4 교차 검증 정확도 :0.9333, 학습 데이터 크기: 120, 검증 데이터 크기: 30
#4 검증 세트 인덱스:[ 90  91  92  93  94  95  96  97  98  99 100 101 102 103 104 105 106 107
 108 109 110 111 112 113 114 115 116 117 118 119]

#5 교차 검증 정확도 :0.7333, 학습 데이터 크기: 120, 검증 데이터 크기: 30
#5 검증 세트 인덱스:[120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137
 138 139 140 141 142 143 144 145 146 147 148 149]
```

<br>

**Stratified K 폴드**
- 불균형한(imbalanced) 분포도를 가진 레이블 데이터 집합을 위한 K 폴드 방식
- 학습 데이터와 검증 데이터 셋이 가지는 레이블 분포도가 유사하도록 검증 데이터를 추출하는 방식
ex) 신용카드 사기 트랜잭션이 1만건당 1% 100건 정도 있다고 했을 때, 일반 k 폴드 교차 검증을 진행하면 사기 트랜잭션 Case에 해당하는 학습을
전혀 하지 못할 수 있음 

```python
# 먼저 동일하게 일반 k-fold를 통해 데이터 셋을 나누었을 때 레이블 분포는 어떻게 되는지 확인
kfold = KFold(n_splits=3)
# kfold.split(X)는 폴드 세트를 3번 반복할 때마다 달라지는 학습/테스트 용 데이터 로우 인덱스 번호 반환. 
n_iter =0
for train_index, test_index  in kfold.split(iris_df):
    n_iter += 1
    label_train= iris_df['label'].iloc[train_index]
    label_test= iris_df['label'].iloc[test_index]
    
    print('## 교차 검증: {0}'.format(n_iter))
    print('학습 레이블 데이터 분포:\n', label_train.value_counts())
    print('검증 레이블 데이터 분포:\n', label_test.value_counts())
```
```
## 교차 검증: 1
학습 레이블 데이터 분포:
 2    50
1    50
Name: label, dtype: int64
검증 레이블 데이터 분포:
 0    50
Name: label, dtype: int64
## 교차 검증: 2
학습 레이블 데이터 분포:
 2    50
0    50
Name: label, dtype: int64
검증 레이블 데이터 분포:
 1    50
Name: label, dtype: int64
## 교차 검증: 3
학습 레이블 데이터 분포:
 1    50
0    50
Name: label, dtype: int64
검증 레이블 데이터 분포:
 2    50
Name: label, dtype: int64
```

<br>

```python
# 이번에는 StratifiedKFold 사용해서 데이터셋 분할
from sklearn.model_selection import StratifiedKFold

skf = StratifiedKFold(n_splits=3)
n_iter=0

# 일반 k-fold와 다른점은 split시에 label
for train_index, test_index in skf.split(iris_df, iris_df['label']):
    n_iter += 1
    label_train= iris_df['label'].iloc[train_index]
    label_test= iris_df['label'].iloc[test_index]
    print('## 교차 검증: {0}'.format(n_iter))
    print('학습 레이블 데이터 분포:\n', label_train.value_counts())
    print('검증 레이블 데이터 분포:\n', label_test.value_counts())
```
```
## 교차 검증: 1
학습 레이블 데이터 분포:
 2    34
1    33
0    33
Name: label, dtype: int64
검증 레이블 데이터 분포:
 1    17
0    17
2    16
Name: label, dtype: int64
## 교차 검증: 2
학습 레이블 데이터 분포:
 1    34
2    33
0    33
Name: label, dtype: int64
검증 레이블 데이터 분포:
 2    17
0    17
1    16
Name: label, dtype: int64
## 교차 검증: 3
학습 레이블 데이터 분포:
 0    34
2    33
1    33
Name: label, dtype: int64
검증 레이블 데이터 분포:
 2    17
1    17
0    16
Name: label, dtype: int64
```

<br>

```python
dt_clf = DecisionTreeClassifier(random_state=156)

skfold = StratifiedKFold(n_splits=3)
n_iter=0
cv_accuracy=[]

# StratifiedKFold의 split( ) 호출시 반드시 레이블 데이터 셋도 추가 입력 필요  
for train_index, test_index  in skfold.split(features, label):
    # split( )으로 반환된 인덱스를 이용하여 학습용, 검증용 테스트 데이터 추출
    X_train, X_test = features[train_index], features[test_index]
    y_train, y_test = label[train_index], label[test_index]
    
    #학습 및 예측 
    dt_clf.fit(X_train , y_train)    
    pred = dt_clf.predict(X_test)

    # 반복 시 마다 정확도 측정 
    n_iter += 1
    accuracy = np.round(accuracy_score(y_test,pred), 4)
    train_size = X_train.shape[0]
    test_size = X_test.shape[0]
    
    print('\n#{0} 교차 검증 정확도 :{1}, 학습 데이터 크기: {2}, 검증 데이터 크기: {3}'
          .format(n_iter, accuracy, train_size, test_size))
    print('#{0} 검증 세트 인덱스:{1}'.format(n_iter,test_index))
    cv_accuracy.append(accuracy)
    
# 교차 검증별 정확도 및 평균 정확도 계산 
print('\n## 교차 검증별 정확도:', np.round(cv_accuracy, 4))
print('## 평균 검증 정확도:', np.mean(cv_accuracy)) 
```
```
#1 교차 검증 정확도 :0.98, 학습 데이터 크기: 100, 검증 데이터 크기: 50
#1 검증 세트 인덱스:[  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  50
  51  52  53  54  55  56  57  58  59  60  61  62  63  64  65  66 100 101
 102 103 104 105 106 107 108 109 110 111 112 113 114 115]

#2 교차 검증 정확도 :0.94, 학습 데이터 크기: 100, 검증 데이터 크기: 50
#2 검증 세트 인덱스:[ 17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32  33  67
  68  69  70  71  72  73  74  75  76  77  78  79  80  81  82 116 117 118
 119 120 121 122 123 124 125 126 127 128 129 130 131 132]

#3 교차 검증 정확도 :0.98, 학습 데이터 크기: 100, 검증 데이터 크기: 50
#3 검증 세트 인덱스:[ 34  35  36  37  38  39  40  41  42  43  44  45  46  47  48  49  83  84
  85  86  87  88  89  90  91  92  93  94  95  96  97  98  99 133 134 135
 136 137 138 139 140 141 142 143 144 145 146 147 148 149]

## 교차 검증별 정확도: [0.98 0.94 0.98]
## 평균 검증 정확도: 0.9666666666666667
```

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>