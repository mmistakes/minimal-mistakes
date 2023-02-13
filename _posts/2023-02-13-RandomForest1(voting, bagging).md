---
title: "보팅, 배깅, 페이스팅"
---

앙상블 학습과 랜덤 포레스트(1)

실생활에서 무작위로 선택된 인원이 전문가에 비해 현명한 결단을 내리는 경우가 있다. 이것을 우리는 '대중의 지혜'라고 한다.
마찬가지로 랜덤으로 선택한 여러가지 예측기들을 사용하면 가장 좋은 모델 하나만 사용하는 것보다 더 좋은 예측값을 얻을 수 있다.
이렇게 여러 예측기들을 사용한 학습을 앙상블 학습이라고 한다.
그럼 이제 어떤 기준으로 예측기들을 골라야 하고, 각각 어떻게 예측하여, 도출된 결과들로는 어떤 최종 예측값을 만들어 내는지가 궁금할 것이다.

# 투표 기반 분류기

여러개의 예측기를 학습시켰을때, 이들의 예측 결과를 모아서 가장 많이 선택된 클래스를 예측하는 방법으로, 이렇게 다수결 투표로 정해지는 분류기를 직접 투표 분류기라고 한다.
이렇게 다수결 투표 분류기를 통해 나온 결과는, 앙상블에 포함된 개별 분류기 중 가장 뛰어난 모델 보다도 더 높은 정확도를 기록할 때도 있다.
따라서 각 학습기들이 약한 학습기라고 하더라도, 충분히 많고 다양하다면 앙상블은 강한 학습기가 될 수도 있다.

다음 코드는 사이킷런의 make_moons() 함수를 통해 훈련, 테스트 데이터를 만드는 코드이다.
make_moons() 함수는 이항 분류에서 데이터들의 분포가 두개의 달 모양이 서로 맞물려 있는 형태가 되게끔 데이터들을 생성해주는 함수이다.

```python
from sklearn.datasets import make_moons
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import PolynomialFeatures
from sklearn.model_selection import train_test_split

X, y = make_moons(n_samples=100, noise=0.15)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

```
100개의 샘플을 만들었으며 noise는 0.15로 설정했다.(noise가 0이면 정확한 반원을 이룬다.)
그리고 테스트 샘플은 전체 샘플의 20%로 설정했다.

다음 코드는 로지스틱 회귀 분류기, 랜덤 포레스트 분류기, 서포트 벡터 머신 분류기를 포함한 투표 기반 분류기를 학습시키는 코드이다.

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC

log_clf = LogisticRegression()
rnd_clf = RandomForestClassifier()
svm_clf = SVC(probability=True)

voting_clf = VotingClassifier(
    estimators=[('lr', log_clf), ('rf', rnd_clf), ('svc', svm_clf)],
    voting='hard')
voting_clf.fit(X_train, y_train)

```
estimators 매개변수를 통해 어떤 분류기들로 앙상블을 구성할지 정해주었고, voting 매개변수로는 hard / soft 중에서 골라줄 수 있다.
하드 보팅은 앞서 설명한대로 다수결 투표로 정해지는 직접 투표 분류기를 사용하고자 할때 사용하는 방법이고, 소프트 보팅은 각 분류기의 예측값을 평균내어 가장 높은 예측값이 나온 클래스로 결정하는 기법이다.

<style>#sk-container-id-4 {color: black;background-color: white;}#sk-container-id-4 pre{padding: 0;}#sk-container-id-4 div.sk-toggleable {background-color: white;}#sk-container-id-4 label.sk-toggleable__label {cursor: pointer;display: block;width: 100%;margin-bottom: 0;padding: 0.3em;box-sizing: border-box;text-align: center;}#sk-container-id-4 label.sk-toggleable__label-arrow:before {content: "▸";float: left;margin-right: 0.25em;color: #696969;}#sk-container-id-4 label.sk-toggleable__label-arrow:hover:before {color: black;}#sk-container-id-4 div.sk-estimator:hover label.sk-toggleable__label-arrow:before {color: black;}#sk-container-id-4 div.sk-toggleable__content {max-height: 0;max-width: 0;overflow: hidden;text-align: left;background-color: #f0f8ff;}#sk-container-id-4 div.sk-toggleable__content pre {margin: 0.2em;color: black;border-radius: 0.25em;background-color: #f0f8ff;}#sk-container-id-4 input.sk-toggleable__control:checked~div.sk-toggleable__content {max-height: 200px;max-width: 100%;overflow: auto;}#sk-container-id-4 input.sk-toggleable__control:checked~label.sk-toggleable__label-arrow:before {content: "▾";}#sk-container-id-4 div.sk-estimator input.sk-toggleable__control:checked~label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-4 div.sk-label input.sk-toggleable__control:checked~label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-4 input.sk-hidden--visually {border: 0;clip: rect(1px 1px 1px 1px);clip: rect(1px, 1px, 1px, 1px);height: 1px;margin: -1px;overflow: hidden;padding: 0;position: absolute;width: 1px;}#sk-container-id-4 div.sk-estimator {font-family: monospace;background-color: #f0f8ff;border: 1px dotted black;border-radius: 0.25em;box-sizing: border-box;margin-bottom: 0.5em;}#sk-container-id-4 div.sk-estimator:hover {background-color: #d4ebff;}#sk-container-id-4 div.sk-parallel-item::after {content: "";width: 100%;border-bottom: 1px solid gray;flex-grow: 1;}#sk-container-id-4 div.sk-label:hover label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-4 div.sk-serial::before {content: "";position: absolute;border-left: 1px solid gray;box-sizing: border-box;top: 0;bottom: 0;left: 50%;z-index: 0;}#sk-container-id-4 div.sk-serial {display: flex;flex-direction: column;align-items: center;background-color: white;padding-right: 0.2em;padding-left: 0.2em;position: relative;}#sk-container-id-4 div.sk-item {position: relative;z-index: 1;}#sk-container-id-4 div.sk-parallel {display: flex;align-items: stretch;justify-content: center;background-color: white;position: relative;}#sk-container-id-4 div.sk-item::before, #sk-container-id-4 div.sk-parallel-item::before {content: "";position: absolute;border-left: 1px solid gray;box-sizing: border-box;top: 0;bottom: 0;left: 50%;z-index: -1;}#sk-container-id-4 div.sk-parallel-item {display: flex;flex-direction: column;z-index: 1;position: relative;background-color: white;}#sk-container-id-4 div.sk-parallel-item:first-child::after {align-self: flex-end;width: 50%;}#sk-container-id-4 div.sk-parallel-item:last-child::after {align-self: flex-start;width: 50%;}#sk-container-id-4 div.sk-parallel-item:only-child::after {width: 0;}#sk-container-id-4 div.sk-dashed-wrapped {border: 1px dashed gray;margin: 0 0.4em 0.5em 0.4em;box-sizing: border-box;padding-bottom: 0.4em;background-color: white;}#sk-container-id-4 div.sk-label label {font-family: monospace;font-weight: bold;display: inline-block;line-height: 1.2em;}#sk-container-id-4 div.sk-label-container {text-align: center;}#sk-container-id-4 div.sk-container {/* jupyter's `normalize.less` sets `[hidden] { display: none; }` but bootstrap.min.css set `[hidden] { display: none !important; }` so we also need the `!important` here to be able to override the default hidden behavior on the sphinx rendered scikit-learn.org. See: https://github.com/scikit-learn/scikit-learn/issues/21755 */display: inline-block !important;position: relative;}#sk-container-id-4 div.sk-text-repr-fallback {display: none;}</style><div id="sk-container-id-4" class="sk-top-container"><div class="sk-text-repr-fallback"><pre>VotingClassifier(estimators=[(&#x27;lr&#x27;, LogisticRegression()),
                             (&#x27;rf&#x27;, RandomForestClassifier()),
                             (&#x27;svc&#x27;, SVC(probability=True))])</pre><b>In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. <br />On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.</b></div><div class="sk-container" hidden><div class="sk-item sk-dashed-wrapped"><div class="sk-label-container"><div class="sk-label sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-13" type="checkbox" ><label for="sk-estimator-id-13" class="sk-toggleable__label sk-toggleable__label-arrow">VotingClassifier</label><div class="sk-toggleable__content"><pre>VotingClassifier(estimators=[(&#x27;lr&#x27;, LogisticRegression()),
                             (&#x27;rf&#x27;, RandomForestClassifier()),
                             (&#x27;svc&#x27;, SVC(probability=True))])</pre></div></div></div><div class="sk-parallel"><div class="sk-parallel-item"><div class="sk-item"><div class="sk-label-container"><div class="sk-label sk-toggleable"><label>lr</label></div></div><div class="sk-serial"><div class="sk-item"><div class="sk-estimator sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-14" type="checkbox" ><label for="sk-estimator-id-14" class="sk-toggleable__label sk-toggleable__label-arrow">LogisticRegression</label><div class="sk-toggleable__content"><pre>LogisticRegression()</pre></div></div></div></div></div></div><div class="sk-parallel-item"><div class="sk-item"><div class="sk-label-container"><div class="sk-label sk-toggleable"><label>rf</label></div></div><div class="sk-serial"><div class="sk-item"><div class="sk-estimator sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-15" type="checkbox" ><label for="sk-estimator-id-15" class="sk-toggleable__label sk-toggleable__label-arrow">RandomForestClassifier</label><div class="sk-toggleable__content"><pre>RandomForestClassifier()</pre></div></div></div></div></div></div><div class="sk-parallel-item"><div class="sk-item"><div class="sk-label-container"><div class="sk-label sk-toggleable"><label>svc</label></div></div><div class="sk-serial"><div class="sk-item"><div class="sk-estimator sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-16" type="checkbox" ><label for="sk-estimator-id-16" class="sk-toggleable__label sk-toggleable__label-arrow">SVC</label><div class="sk-toggleable__content"><pre>SVC(probability=True)</pre></div></div></div></div></div></div></div></div></div></div>


다음 코드는 각 분류기의 테스트셋 정확도를 확인할 수 있는 코드이다.

```python
from sklearn.metrics import accuracy_score
for clf in (log_clf, rnd_clf, svm_clf, voting_clf):
    clf.fit(X_train, y_train)
    y_pred = clf.predict(X_test)
    print(clf.__class__.__name__, accuracy_score(y_test, y_pred))
    
```

    LogisticRegression 0.9
    RandomForestClassifier 0.95
    SVC 0.95
    VotingClassifier 0.95

결과를 확인해보니 투표 기반 분류기의 성능이 다른 개별 분류기들보다 높은 것을 확인할 수 있다.

# 배깅과 페이스팅
앞선 투표 기반 분류기에서는 각기 다른 훈련 알고리즘을 사용하는 기법이었다. 그러나, 같은 알고리즘을 사용하면서 훈련 세트의 서브셋을 무작위로 구성해 각기 다른 방법으로 분류기를 학습 시키는 방법도 있다.
이러한 기법을 배깅과 페이스팅이라고 한다.
우선 배깅은, 훈련 세트에서 중복을 허용하여 샘플링하는 방식이다. 그리고 페이스팅은, 훈련 세트에서 중복을 허용하지 않고 샘플링하는 방식이다.

각 예측기의 훈련이 끝나면, 앙상블은 모든 예측기의 예측을 모아 새로운 샘플에 대한 예측을 만든다.
예측들을 수집할때 통상적으로 분류시에는 통계적 최빈값을, 회귀 예제에서는 평균값을 계산한다.
개별 예측기는 원본 훈련 세트로 훈련시킨 것보다 훨씬 크게 편향되어 있지만, 수집 함수를 통과하면 편향과 분산이 모두 감소한다.
일반적으로 앙상블의 결과는 편향은 하나의 예측기를 훈련 시킬때와 비슷한 결과를 얻지만, 분산은 줄어들게 된다.

* 편향: 잘못된 가정으로 인한 일반화 오차로, 편향이 큰 모델은 과소적합되기가 쉽다.
* 분산: 자유도가 높은 모델은 높은 분산을 가지게 되고 훈련 데이터에 과대적합되는 경향이 있다. 훈련 데이터에 있는 작은 변동(노이즈)에도 민감하게 반응하는 경우.

다음 코드는 배깅 분류기를 사용한 학습 및 결과값을 예측하는 코드이다.

```python
from sklearn.ensemble import BaggingClassifier
from sklearn.tree import DecisionTreeClassifier

bag_clf = BaggingClassifier(
    DecisionTreeClassifier(), n_estimators=500,
    max_samples=50, bootstrap=True, n_jobs=-1)
bag_clf.fit(X_train, y_train)
y_pred = bag_clf.predict(X_test)
accuracy_score(y_test, y_pred)
```




    0.95

bootStrap = True 일 경우 배깅(중복 허용한 샘플링)이고, False 일 경우에는 페이스팅(중복을 허용하지 않은 샘플링)이다.
n_jobs 매개변수는 사이킷런이 훈련과 예측에 사용할 CPU 코어 수를 지정하는 매개변수로, -1일 경우에는 가용한 모든 코어를 사용한다.

배깅에서는 샘플링시 중복을 허용하기 때문에, 어떤 샘플은 한번도 사용되지 않을 수도 있다.
m개의 데이터로 샘플링을 해서 배깅 방법으로 학습하는 경우, 63% 정도의 데이터들만 샘플링에서 사용한다고 한다.
이때 나머지 37%정도의 데이터들을 oob(Out of bag) 샘플이라고 부르며, 이 oob를 평가하여 정확도를 얻을 수도 있다.

다음 코드와 같이 oob_score_ 를 사용하면 이 분류기의 테스트 세트 정확도를 확인할 수 있다.

```python
bag_clf = BaggingClassifier(
    DecisionTreeClassifier(), n_estimators=500,
    bootstrap=True, n_jobs=-1, oob_score=True
)
bag_clf.fit(X_train, y_train)
bag_clf.oob_score_
```




    0.925




```python
y_pred = bag_clf.predict(X_test)
accuracy_score(y_test, y_pred)
```




    0.9


그리고 다음 코드와 같이 oob_decision_function_ 변수를 사용하면 oob 샘플에 대한 결정 함수의 값도 확인할 수 있다.

```python
bag_clf.oob_decision_function_
```




    array([[0.98378378, 0.01621622],
           [1.        , 0.        ],
           [1.        , 0.        ],
           [0.11728395, 0.88271605],
           [0.86934673, 0.13065327],
           [0.00502513, 0.99497487],
           [0.99425287, 0.00574713],
           [0.06962025, 0.93037975],
           [0.        , 1.        ],
           [0.94413408, 0.05586592],
           [0.77722772, 0.22277228],
           [0.        , 1.        ],
           [0.0201005 , 0.9798995 ],
           [0.45856354, 0.54143646],
           [1.        , 0.        ],
           [1.        , 0.        ],
           [0.20994475, 0.79005525],
           [0.01183432, 0.98816568],
           [0.37823834, 0.62176166],
           [0.69      , 0.31      ],
           [0.03902439, 0.96097561],
           [0.84375   , 0.15625   ],
           [0.28021978, 0.71978022],
           [1.        , 0.        ],
           [0.46875   , 0.53125   ],
           [0.74157303, 0.25842697],
           [1.        , 0.        ],
           [0.        , 1.        ],
           [0.16363636, 0.83636364],
           [0.05524862, 0.94475138],
           [0.63212435, 0.36787565],
           [0.9760479 , 0.0239521 ],
           [0.98214286, 0.01785714],
           [0.7       , 0.3       ],
           [0.3989071 , 0.6010929 ],
           [0.00531915, 0.99468085],
           [0.01714286, 0.98285714],
           [1.        , 0.        ],
           [0.21925134, 0.78074866],
           [1.        , 0.        ],
           [0.18902439, 0.81097561],
           [0.40860215, 0.59139785],
           [0.94505495, 0.05494505],
           [0.95477387, 0.04522613],
           [1.        , 0.        ],
           [0.        , 1.        ],
           [0.99456522, 0.00543478],
           [0.04232804, 0.95767196],
           [1.        , 0.        ],
           [0.04046243, 0.95953757],
           [0.93085106, 0.06914894],
           [0.13705584, 0.86294416],
           [0.        , 1.        ],
           [0.74358974, 0.25641026],
           [0.        , 1.        ],
           [0.        , 1.        ],
           [1.        , 0.        ],
           [0.        , 1.        ],
           [1.        , 0.        ],
           [0.94886364, 0.05113636],
           [0.02285714, 0.97714286],
           [0.        , 1.        ],
           [0.00581395, 0.99418605],
           [0.26519337, 0.73480663],
           [0.16494845, 0.83505155],
           [0.6440678 , 0.3559322 ],
           [0.99428571, 0.00571429],
           [0.        , 1.        ],
           [0.995     , 0.005     ],
           [0.        , 1.        ],
           [0.19487179, 0.80512821],
           [0.66666667, 0.33333333],
           [0.94413408, 0.05586592],
           [0.04081633, 0.95918367],
           [0.26282051, 0.73717949],
           [0.98974359, 0.01025641],
           [0.89204545, 0.10795455],
           [0.88717949, 0.11282051],
           [0.60818713, 0.39181287],
           [1.        , 0.        ]])