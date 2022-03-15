---
layout: single
title:  "Getting Started"
categories: scikit-learn
tag: [python, scikit-learn]
toc: true
author_profile: false
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


# <span style='background-color: #CDE8EF'> 시작하기 </span>


이 가이드의 목적은 `scikit-learn`이 제공하는 몇 가지 주요 기능을 설명하기 위함입니다. 이것은 머신 러닝 실습에 대해 매우 기본적인 작업 지식을 다룹니다(모델 학습, 예측, 교차 검증 등). `scikit-learn` 설치에 대한 [설치 지침](https://scikit-learn.org/stable/install.html#installation-instructions)을 참조해주세요.


`Scikit-learn`은 지도 학습과 비지도 학습을 지원하는 오픈 소스 머신 러닝 라이브러리입니다. 또한, 모델 학습, 데이터 전처리, 모델 선택, 모델 평가 그리고 다른 많은 유틸리티들을 위한 다양한 도구들을 제공합니다.


## <span style='background-color: #BED4EB'>학습과 예측: 추정기 기본</span>


`Scikit-learn`은 추정기(estimator)라고 불리는 내장된 수십 가지 머신 러닝 알고리즘 및 모델을 제공합니다.


다음은 매우 기본적인 데이터로 [RandomForestClassifier](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html#sklearn.ensemble.RandomForestClassifier)를 학습하는 간단한 예입니다:



```python
from sklearn.ensemble import RandomForestClassifier
clf = RandomForestClassifier(random_state=0)
X = [[ 1,  2,  3],  # 3 개의 특성을 가진 2 개의 샘플들
     [11, 12, 13]]
y = [0, 1]          # 각 샘플의 레이블
clf.fit(X, y)
```

<pre>
RandomForestClassifier(random_state=0)
</pre>
[fit](https://scikit-learn.org/stable/glossary.html#term-fit) 메서드는 일반적으로 2 개의 입력을 허용합니다:






*   샘플들의 행렬(또는 설계 행렬) X: `X`의 크기는 일반적으로 `(n_samples, n_features)`입니다. 즉, 샘플은 행으로 표현되고 특성은 열로 표현됨을 의미합니다.

*   타겟값 `y`는 회귀를 위한 실수이거나 분류를 위한 정수(또는 다른 이산 값 집합)입니다. 비지도 학습의 경우 `y`를 지정할 필요가 없습니다. `y`는 보통 `X`의 `i`번째 샘플의 타겟값에 대응하는 `i`번째 항목을 담은 1d 배열입니다.





일부 추정기는 희소 행렬 같은 다른 형식과 함께 작동하지만 `X`와 `y` 모두 일반적으로 numpy 배열 또는 이에 상응하는 [유사 배열 객체](https://scikit-learn.org/stable/glossary.html#term-array-like) 데이터 타입으로 기대합니다.


한번 추정기가 학습되면, 새로운 데이터가 들어왔을 때 추정기를 재학습시키지 않아도  타겟값을 예측할 수 있습니다:



```python
clf.predict(X)  # 학습 데이터의 레이블을 예측합니다.
```

<pre>
array([0, 1])
</pre>

```python
clf.predict([[4, 5, 6], [14, 15, 16]])  # 새로운 데이터의 레이블을 예측합니다.
```

<pre>
array([0, 1])
</pre>
## <span style='background-color: #BED4EB'>변환기 및 전처리</span>


머신 러닝의 작업흐름은 종종 서로 다른 분야로 구성됩니다. 일반적인 파이프라인은 데이터를 변환하거나 전가하는 전처리 단계와 타겟값을 예측하는 최종 예측기로 구성됩니다.


`scikit-learn`에서 전처리기와 변환기는 추정기 객체와 동일한 API를 따릅니다(실제로는 모두 동일한 `BaseEstimator` 클래스로부터 상속됨). 변환기 객체는 [predict](https://scikit-learn.org/stable/glossary.html#term-predict) 메서드가 없지만 새롭게 변화된 샘플 행렬 `X`를 출력하는 [transform](https://scikit-learn.org/stable/glossary.html#term-transform) 메서드가 있습니다:



```python
from sklearn.preprocessing import StandardScaler  # 표준화 모듈
X = [[0, 15],
     [1, -10]]
# 계산된 스케일링 값에 따라 데이터 스케일링
StandardScaler().fit(X).transform(X)  # StandardScaler().fit_transform(X) 와 동일
```

<pre>
array([[-1.,  1.],
       [ 1., -1.]])
</pre>
때론, 각 특성에 다른 변환을 적용하고 싶을 것입니다: 그럴 땐 [ColumnTransformer](https://scikit-learn.org/stable/modules/compose.html#column-transformer)를 사용하세요.


## <span style='background-color: #BED4EB'>파이프라인: 전처리기와 추정기를 연결</span>


변환기 및 추정기(예측기)는 단일 통합 객체인 [파이프라인](https://scikit-learn.org/stable/modules/generated/sklearn.pipeline.Pipeline.html#sklearn.pipeline.Pipeline)으로 같이 결합될 수 있습니다. 파이프라인은 일반 추정기와 동일한 API를 제공합니다: `fit` 및 `predict`를 사용하여 학습하고 예측할 수 있습니다. 나중에 보게 되겠지만, 파이프라인을 사용하면 데이터 누출, 즉 훈련 데이터의 일부 테스트 데이터 공개를 방지할 수도 있습니다.


다음 예시에서는, Iris 데이터세트를 불러오고, 학습 세트와 테스트 세트로 분할하고, 테스트 데이터에 대해 파이프라인의 정확도를 계산합니다.



```python
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 파이프라인 객체 생성
pipe = make_pipeline(
    StandardScaler(),
    LogisticRegression()
)   # 표준화 전처리기와 로지스틱회귀 추정기를 결합

# Iris 데이터세트를 불러오고 학습 세트와 테스트 세트로 분할
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)

# 전체 파이프라인 학습
pipe.fit(X_train, y_train)
```

<pre>
Pipeline(steps=[('standardscaler', StandardScaler()),
                ('logisticregression', LogisticRegression())])
</pre>

```python
# 이제 다른 추정기처럼 사용할 수 있습니다.
accuracy_score(pipe.predict(X_test), y_test)  # X_test로 예측한 값과 실제 값을 비교하여 정확도를 구합니다.
```

<pre>
0.9736842105263158
</pre>
## <span style='background-color: #BED4EB'>모델 평가</span>


모델을 일부 데이터에 학습하는 것이 보지 못한 데이터에 대해 잘 예측한다는 것을 의미하지는 않습니다. 이것은 직접 평가해봐야 합니다. 데이터 세트를 학습 세트와 테스트 세트로 분할해주는 [train_test_split](https://scikit-learn.org/stable/datasets.html#datasets) 를 방금 보았지만 `scikit-learn`은 특히 [교차 검증](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.cross_validate.html#sklearn.model_selection.cross_validate) 같은 모델 평가를 위한 다른 많은 도구를 제공합니다.


여기서는 [cross_validate](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.cross_validate.html#sklearn.model_selection.cross_validate) 를 사용하여 5중 교차 검증 절차를 수행하는 방법을 간략하게 보여줍니다. 각 폴드를 수동으로 반복하고, 다양한 데이터 분할 전략을 사용하고, 사용자 지정 점수 함수를 사용할 수도 있습니다. 자세한 정보는 [사용자 가이드](https://scikit-learn.org/stable/modules/cross_validation.html#cross-validation)를 참조해주세요:



```python
from sklearn.datasets import make_regression
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_validate

X, y = make_regression(n_samples=1000, random_state=0)  # 1,000 개의 회귀용 샘플 생성
lr = LinearRegression() # 선형 회귀 객체 생성

result = cross_validate(lr, X, y, cv=5)   # 디폴트: 5겹 교차 검증 (cv=5 생략해도 동일)
result['test_score']  # 데이터 세트가 쉬워서 결정계수 점수가 높게 나옵니다.
```

<pre>
{'fit_time': array([0.01843166, 0.03219676, 0.0267272 , 0.02029562, 0.01756144]),
 'score_time': array([0.00071025, 0.00445962, 0.00075221, 0.0052402 , 0.00121593]),
 'test_score': array([1., 1., 1., 1., 1.])}
</pre>
## <span style='background-color: #BED4EB'>자동으로 적절한 파라미터 찾기</span>


모든 추정기는 조정할 수 있는 파라미터들(문헌에서는 종종 하이퍼 파라미터라고 부름)을 갖고 있습니다. 추정기의 일반화 능력은 종종 몇 가지 파라미터에 크게 의존합니다. 예를 들어, [RandomForestRegressor](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html#sklearn.ensemble.RandomForestRegressor) 는 랜덤포레스트에서 사용할 결정 트리의 갯수를 결정하는 파라미터인 `n_estimators` 와 각 결정 트리의 최대 깊이를 결정하는 파라미터인 `max_depth` 가 있습니다. 종종 이러한 파라미터의 정확한 값은 현재 데이터에 의존하기 때문에 명확하지 않습니다.


`Scikit-learn`은 (교차 검증을 통해) 최상의 파라미터 조합을 자동으로 찾는 도구를 제공합니다. 다음 예에서는 [RandomizedSearchCV](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.RandomizedSearchCV.html#sklearn.model_selection.RandomizedSearchCV) 객체를 사용하여 랜덤 포레스트의 파라미터 공간을 무작위로 검색합니다. 검색이 끝나면 [RandomizedSearchCV](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html#sklearn.ensemble.RandomForestRegressor)는 최적의 파라미터 세트가 적용된 [RandomForestRegressor](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html#sklearn.ensemble.RandomForestRegressor)로 작동합니다. [사용자 가이드](https://scikit-learn.org/stable/modules/grid_search.html#grid-search)에서 더 자세히 알아보세요:



```python
from sklearn.datasets import fetch_california_housing
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import RandomizedSearchCV
from sklearn.model_selection import train_test_split
from scipy.stats import randint

X, y = fetch_california_housing(return_X_y=True)  # 캘리포니아 집 값 데이터
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)

# 검색할 파라미터 공간을 결정합니다.
param_distributions = {'n_estimators': randint(1, 5),   # 1 ~ 5 사이 
                       'max_depth': randint(5, 10)}     # 5 ~ 10 사이

# searchCV 객체를 생성하고 데이터를 학습합니다.
search = RandomizedSearchCV(estimator=RandomForestRegressor(random_state=0),
                            n_iter=5,   # 5 회 반복
                            param_distributions=param_distributions,
                            random_state=0)
search.fit(X_train, y_train)
```

<pre>
RandomizedSearchCV(estimator=RandomForestRegressor(random_state=0), n_iter=5,
                   param_distributions={'max_depth': <scipy.stats._distn_infrastructure.rv_frozen object at 0x7f2a12393a10>,
                                        'n_estimators': <scipy.stats._distn_infrastructure.rv_frozen object at 0x7f2a12360410>},
                   random_state=0)
</pre>

```python
search.best_params_
```

<pre>
{'max_depth': 9, 'n_estimators': 4}
</pre>

```python
# search 객체는 일반 랜덤 포레스트 추정기처럼 작동합니다.
# max_depth=9, n_estimators=4 로 설정된
search.score(X_test, y_test)
```

<pre>
0.735363411343253
</pre>
<div style="background-color: #EEEEEE"><strong>Note:

</strong>실제로는 단일 추정기 대신 거의 항상 <a href='https://scikit-learn.org/stable/modules/grid_search.html#composite-grid-search' target='blank'>파이프라인</a>으로 검색하려고 합니다. 그것에 대한 주요 이유 중 하나는 파이프라인을 사용하지 않고 전체 데이터 세트에 전처리 단계를 적용한 다음, 교차 검증을 수행하면 학습 데이터와 테스트 데이터 간의 독립성에 대한 기본적인 가정을 깨는 것입니다.실제로 전체 데이터 세트를 사용하여 데이터를 전처리했기 때문에 테스트 세트에 대한 일부 정보를 학습 세트에서 사용할 수 있습니다.이것은 추정기의 일반화 능력을 과대평가하게 됩니다(<a href='' target='blank'>Kaggle post</a> 에서 더 자세히 알 수 있습니다).<br>교차 검증 및 검색에서 파이프라인을 사용하면 이 일반적인 함정에서 크게 벗어날 수 있습니다.</div>



## <span style='background-color: #BED4EB'>다음 단계</span>


우리는 추정기 학습 및 예측, 전처리 단계, 파이프라인, 교차 검증 도구 및 자동 하이퍼 파라미터 검색에 대해 간략하게 다뤘습니다. 이 가이드는 라이브러리의 몇 가지 주요 기능에 대한 개요를 제공하지만, `scikit-learn`에는 더 많은 것이 있습니다!

<br><br>

우리가 제공하는 모든 도구에 대한 자세한 내용은 [사용자 가이드](https://scikit-learn.org/stable/user_guide.html#user-guide)를 참조하십시오. [API 참조 문서](https://scikit-learn.org/stable/modules/classes.html#api-ref)에서 공개 API의 전체 목록을 찾을 수도 있습니다.

<br><br>

또한 다양한 컨텍스트에서 `scikit-learn`을 사용하는 방법을 보여주는 수많은 예를 볼 수 있습니다.

<br><br>

[튜토리얼](https://scikit-learn.org/stable/tutorial/index.html#tutorial-menu)에는 추가 학습 리소스도 포함되어 있습니다.


<span style='color:#808080'>ⓒ 2007 - 2021, scikit-learn developers (BSD License).</span> <a href='https://scikit-learn.org/stable/_sources/getting_started.rst.txt' target='blanck'>Show this page source</a>

