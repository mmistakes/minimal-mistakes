---
published: true
layout: single
title: "[Machine Learning PerfectGuide] 교차검증 성능평가(cross_val_score), 하이퍼 파라미터 튜닝(GridSearchCV)"
category: mlbasic
tags:
comments: true
sidebar:
  nav: "mainMenu"
--- 
* * * 

#### 하이퍼 파라미터 튜닝이란
* * *
- 머신러닝에서 파라미터는 학습으로 도출되는 가중치(weight), 편향(bias)와 같은 값이다.
- 하이퍼 파라미터는 연구자가 수정할 수 있는 값으로 학습률, Optimizer, 활성화 함수, 손실 함수 등 다양한 인자들을 의미한다.
- 하이퍼 파라미터 튜닝이란 모델의 정확성을 위해 하이퍼 파라미터의 적절한 값으로 조절하는 것을 의미한다.
- GridSearchCV는 모든 하이퍼 파라미터를 다 넣어가면서 적절한 값을 찾는 것으로 그리드 서치에 기반한다
- 그 외에 랜덤 서치, Bayesian Optimization 등이 있다.

<br>

#### cross_val_score()
* * *
```python
import numpy as np

from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import cross_val_score, cross_validate
from sklearn.datasets import load_iris

if __name__ == '__main__':
    iris_data = load_iris()
    dt_clf = DecisionTreeClassifier(random_state=156)

    data = iris_data.data
    label = iris_data.target

    # estimator, training data, label(target), scoring, cv
    scores = cross_val_score(dt_clf, data, label, scoring='accuracy', cv=3)

    print('교차 검증별 정확도', np.round(scores, 4))
    print('평균 검증별 정확도', np.round(np.mean(scores), 4))

```

```
교차 검증별 정확도 [0.98 0.94 0.98]
평균 검증별 정확도 0.9667
```

<br>

#### GridSearchCV
* * *

```python
import numpy as np
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.metrics import accuracy_score

if __name__ == '__main__':
    pd.set_option('display.max_columns', None)

    iris_data = load_iris()
    X_train, X_test, y_train, y_test = train_test_split(iris_data.data
                                                        , iris_data.target
                                                        , test_size=0.2
                                                        , random_state=121)
    dtree = DecisionTreeClassifier()

    ### parameter 들을 dictionary 형태로 설정
    paramters = {'max_depth': [1, 2, 3], 'min_samples_split': [2, 3]}

    # param_grid의 하이퍼 파라미터들을 3개의 train, test set fold 로 나누어서 테스트 수행 설정.  
    ### refit=True 가 default 임. True이면 가장 좋은 파라미터 설정으로 재 학습 시킴.  
    grid_dtree = GridSearchCV(dtree, param_grid=paramters, cv=3, refit=True, return_train_score=True)

    # 붓꽃 Train 데이터로 param_grid의 하이퍼 파라미터들을 순차적으로 학습/평가 .
    grid_dtree.fit(X_train, y_train)

    # GridSearchCV 결과는 cv_results_ 라는 딕셔너리로 저장됨. 이를 DataFrame으로 변환
    #scores_df = pd.DataFrame(grid_dtree.cv_results_)
    #print(scores_df[['params', 'mean_test_score', 'rank_test_score',
    #           'split0_test_score', 'split1_test_score', 'split2_test_score']])

    print('GridSearch 최적 파라미터 : ', grid_dtree.best_params_)
    print('GridSearch 최고 정확도 : {0:.4f}'.format(grid_dtree.best_score_) )

    # refit=True로 설정된 GridSearchCV 객체가 fit()을 수행 시 학습이 완료된 Estimator를 내포하고 있으므로 predict()를 통해 예측도 가능.
    pred = grid_dtree.predict(X_test)
    print('테스트 데이터셋 정확도 : {0:.4f}'.format(accuracy_score(y_test, pred)))

    # GridSearchCV의 refit으로 이미 학습이 된 estimator 반환
    estimator = grid_dtree.best_estimator_

    # GridSearchCV의 best_estimator_는 이미 최적 하이퍼 파라미터로 학습이 됨
    pred = estimator.predict(X_test)
    print('테스트 데이터셋 정확도 : {0:.4f}'.format(accuracy_score(y_test, pred)))

```

```
GridSearch 최적 파라미터 :  {'max_depth': 3, 'min_samples_split': 2}
GridSearch 최고 정확도 : 0.9750
테스트 데이터셋 정확도 : 0.9667
테스트 데이터셋 정확도 : 0.9667
```

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>