---
title: "랜덤 포레스트, 에이다 부스트"
---

# 랜덤 포레스트

의사 결정 트리에서는 과대적합이 일어날 수 있다. 결정 트리에서 일어나는 과대적합을 방지하기 위해, 배깅 방식으로 결정 트리 예측기들을 학습시켜 앙상블 학습하는 방법이 있다.
이 방식을 랜덤 포레스트 기법이라고 하며 기존 BaggingClassifier에서 DecisionTreeCalssifier를 사용하여 구현할 수 있다.
이것을 더 간단하고 쉽게 할 수 있는 방법이 있는데, 사이킷런에서 재공하는 RandomForestClassifier(회귀의 경우 RandomForestRegressor)을 사용하면 된다.

다음은 make_moons() 함수를 사용하여 노이즈가 0.1인 샘플을 만드는 코드이다.

```python
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split

X, y = make_moons(n_samples = 100, noise = 0.1)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state=43)

```
다음은 랜덤 포레스트 분류기를 사용하여 모델을 여러 CPU 코어에서 학습시키는 코드이다.
500개의 결정 트리로 이루어져 있으며, 최대 리프 노드는 16개이다.

```python
from sklearn.ensemble import RandomForestClassifier

rnd_clf = RandomForestClassifier(n_estimators=500, max_leaf_nodes=16, n_jobs=-1)
rnd_clf.fit(X_train, y_train)

y_pred_rf = rnd_clf.predict(X_test)

```
최대 리프 노드의 개수를 제어하는 이유는 과대적합을 방지하기 위한 것으로, 노드의 개수를 제어하지 않게 되면 모델이 지나치게 학습되어 일반화가 어렵다.
랜덤 포레스트에서 트리를 만들 때, 각 노드는 무작위로 특성의 서브셋을 만들어 분할에 사용한다. 여기서 트리를 더욱 무작위하게 만들기 위해서, 최적의 임곗값을 찾는 대신 후보 특성을 사용해 무작위로 분할한 다음 그 중에서 최상의 분할을 선택한다. 이런 방식을 익스트림 랜덤 트리(엑스트라 트리) 방법이라고 부르며, 일반적인 랜덤 포레스트에 비해 훨씬 빠르다는 장점이 있다.
-> 일반적인 랜덤 포레스트는 모든 노드에서 특성마다 가장 최적의 임곗값을 찾느라 시간이 더욱 걸린다.
엑스트라 트리를 만들기 위해서는 사이킷런에서 제공하는 ExtraTreeClassifier를 사용한다.

랜덤 포레스트의 다른 장점으로는, 특성의 상대적 중요도를 측정하기 쉽다는 점이있다.
의사결정 트리에서는 각 노드를 지나며 불순도를 최소화 하는 것을 목표로 한다.
* 불순도란: 전체 데이터 중에서 다른 데이터들이 얼마나 섞여있는지를 나타내는 지표이다. 트리의 노드가 끝까지 자라면 불순도가 0이 된다.
랜덤 포레스트 분류기에서 feature_importances_ 라는 변수에는 각 특성(노드)에서 얼마나 불순도를 감소시키는지를 반영하여 특성의 중요도를 측정한 값이 들어있다.

다음 코드는 iris 데이터셋을 사용하여, 각 특성의 중요도가 어떻게 되는지를 보여주는 코드이다.

```python
from sklearn.datasets import load_iris
iris = load_iris()
rnd_clf = RandomForestClassifier(n_estimators=500, n_jobs=-1)
rnd_clf.fit(iris["data"], iris["target"])
for name, score in zip(iris["feature_names"], rnd_clf.feature_importances_):
    print(name, score)
```

    sepal length (cm) 0.0891522818014241
    sepal width (cm) 0.02387732812402761
    petal length (cm) 0.41234149596158054
    petal width (cm) 0.4746288941129678

위와 같이 각 특성들의 중요도를 확인할 수 있다.

# 부스팅

부스팅이랑 약한 학습기들을 여럿 연결하여 강한 학습기를 만드는 앙상블 방법이다.
언뜻 보면 배깅(Bagging)과 비슷한 기법으로 보일 수 있지만, 가장 큰 차이점은 한번 학습할 때마다 보완이 되면서 학습을 이어간다는 점이다.
* 배깅은 여러 학습기들을 동시에 병렬적으로 학습시키지만, 부스팅은 하나의 약한 학습기가 학습을 완료하면 가중치를 조정해가며 학습을 계속한다.

부스팅은 여러 종류가 있지만 에이다부스트, 그래디언트 부스팅이 가장 인기가 높다.

에이다부스트는, 학습이 한번 끝나면 가중치를 수정하여 다음 분류기에서 다시 학습한다.
이 과정에서 가중치는 이전에 과소적합이 되어 제대로 분류되지 못한 샘플들을 제대로 학습할 수 있도록 초점을 맞추어 수정한다.

에이다부스트 알고리즘의 진행은 다음과 같다.
* 각 샘플의 가중치는 초기에 1/m(m=샘플의 총 개수)으로 초기화된다.
* 첫 번째 예측기가 학습되고, 가중치가 적용된 에러율r이 훈련 세트에 대해 계산된다. -> r = 에러가 난 샘플의 총 가중치 합 / 전체 샘플의 가중치 합
* j번째 예측기의 가중치 alpha^j = n(학습률 하이퍼파라미터) * log{(1 - r) / r}
* 에이다부스트의 알고리즘을 사용해 샘플의 가중치를 업데이트 하는데, 제대로 분류된 샘플의 가중치는 변경하지 않고 잘못 분류된 샘플의 가중치만 업데이트한다.
* 에이다부스트의 알고리즘은 지정된 예측기 수에 도달하거나 완벽한 예측기가 만들어지면 중지된다.
* 모든 예측기의 예측을 계산하고 예측기 가중치 alpha^j를 더해 합이 가장 큰 클래스가 예측 결과가 된다.

다음 코드는 사이킷런에서 제공하는 AdaBoostClassifier를 사용하여, 200개의 결정 트리를 기반으로 하는 에이다부스트 분류기를 훈련시키는 코드이다.

```python
from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier

ada_clf = AdaBoostClassifier(
    DecisionTreeClassifier(max_depth=1), n_estimators=200,
    algorithm="SAMME.R", learning_rate=0.5)
ada_clf.fit(X_train, y_train)
```
max_depth=1으로, 결정 노드 하나와 리프 노드 두 개로 이루어진 트리이다.
에이다부스트 앙상블이 훈련 세트에 과대적합될 때에는 추정기 수를 줄이거나 추정기의 규제를 더 강하게 하는 방법이 있다.


<style>#sk-container-id-1 {color: black;background-color: white;}#sk-container-id-1 pre{padding: 0;}#sk-container-id-1 div.sk-toggleable {background-color: white;}#sk-container-id-1 label.sk-toggleable__label {cursor: pointer;display: block;width: 100%;margin-bottom: 0;padding: 0.3em;box-sizing: border-box;text-align: center;}#sk-container-id-1 label.sk-toggleable__label-arrow:before {content: "▸";float: left;margin-right: 0.25em;color: #696969;}#sk-container-id-1 label.sk-toggleable__label-arrow:hover:before {color: black;}#sk-container-id-1 div.sk-estimator:hover label.sk-toggleable__label-arrow:before {color: black;}#sk-container-id-1 div.sk-toggleable__content {max-height: 0;max-width: 0;overflow: hidden;text-align: left;background-color: #f0f8ff;}#sk-container-id-1 div.sk-toggleable__content pre {margin: 0.2em;color: black;border-radius: 0.25em;background-color: #f0f8ff;}#sk-container-id-1 input.sk-toggleable__control:checked~div.sk-toggleable__content {max-height: 200px;max-width: 100%;overflow: auto;}#sk-container-id-1 input.sk-toggleable__control:checked~label.sk-toggleable__label-arrow:before {content: "▾";}#sk-container-id-1 div.sk-estimator input.sk-toggleable__control:checked~label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-1 div.sk-label input.sk-toggleable__control:checked~label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-1 input.sk-hidden--visually {border: 0;clip: rect(1px 1px 1px 1px);clip: rect(1px, 1px, 1px, 1px);height: 1px;margin: -1px;overflow: hidden;padding: 0;position: absolute;width: 1px;}#sk-container-id-1 div.sk-estimator {font-family: monospace;background-color: #f0f8ff;border: 1px dotted black;border-radius: 0.25em;box-sizing: border-box;margin-bottom: 0.5em;}#sk-container-id-1 div.sk-estimator:hover {background-color: #d4ebff;}#sk-container-id-1 div.sk-parallel-item::after {content: "";width: 100%;border-bottom: 1px solid gray;flex-grow: 1;}#sk-container-id-1 div.sk-label:hover label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-1 div.sk-serial::before {content: "";position: absolute;border-left: 1px solid gray;box-sizing: border-box;top: 0;bottom: 0;left: 50%;z-index: 0;}#sk-container-id-1 div.sk-serial {display: flex;flex-direction: column;align-items: center;background-color: white;padding-right: 0.2em;padding-left: 0.2em;position: relative;}#sk-container-id-1 div.sk-item {position: relative;z-index: 1;}#sk-container-id-1 div.sk-parallel {display: flex;align-items: stretch;justify-content: center;background-color: white;position: relative;}#sk-container-id-1 div.sk-item::before, #sk-container-id-1 div.sk-parallel-item::before {content: "";position: absolute;border-left: 1px solid gray;box-sizing: border-box;top: 0;bottom: 0;left: 50%;z-index: -1;}#sk-container-id-1 div.sk-parallel-item {display: flex;flex-direction: column;z-index: 1;position: relative;background-color: white;}#sk-container-id-1 div.sk-parallel-item:first-child::after {align-self: flex-end;width: 50%;}#sk-container-id-1 div.sk-parallel-item:last-child::after {align-self: flex-start;width: 50%;}#sk-container-id-1 div.sk-parallel-item:only-child::after {width: 0;}#sk-container-id-1 div.sk-dashed-wrapped {border: 1px dashed gray;margin: 0 0.4em 0.5em 0.4em;box-sizing: border-box;padding-bottom: 0.4em;background-color: white;}#sk-container-id-1 div.sk-label label {font-family: monospace;font-weight: bold;display: inline-block;line-height: 1.2em;}#sk-container-id-1 div.sk-label-container {text-align: center;}#sk-container-id-1 div.sk-container {/* jupyter's `normalize.less` sets `[hidden] { display: none; }` but bootstrap.min.css set `[hidden] { display: none !important; }` so we also need the `!important` here to be able to override the default hidden behavior on the sphinx rendered scikit-learn.org. See: https://github.com/scikit-learn/scikit-learn/issues/21755 */display: inline-block !important;position: relative;}#sk-container-id-1 div.sk-text-repr-fallback {display: none;}</style><div id="sk-container-id-1" class="sk-top-container"><div class="sk-text-repr-fallback"><pre>AdaBoostClassifier(estimator=DecisionTreeClassifier(max_depth=1),
                   learning_rate=0.5, n_estimators=200)</pre><b>In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. <br />On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.</b></div><div class="sk-container" hidden><div class="sk-item sk-dashed-wrapped"><div class="sk-label-container"><div class="sk-label sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-1" type="checkbox" ><label for="sk-estimator-id-1" class="sk-toggleable__label sk-toggleable__label-arrow">AdaBoostClassifier</label><div class="sk-toggleable__content"><pre>AdaBoostClassifier(estimator=DecisionTreeClassifier(max_depth=1),
                   learning_rate=0.5, n_estimators=200)</pre></div></div></div><div class="sk-parallel"><div class="sk-parallel-item"><div class="sk-item"><div class="sk-label-container"><div class="sk-label sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-2" type="checkbox" ><label for="sk-estimator-id-2" class="sk-toggleable__label sk-toggleable__label-arrow">estimator: DecisionTreeClassifier</label><div class="sk-toggleable__content"><pre>DecisionTreeClassifier(max_depth=1)</pre></div></div></div><div class="sk-serial"><div class="sk-item"><div class="sk-estimator sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-3" type="checkbox" ><label for="sk-estimator-id-3" class="sk-toggleable__label sk-toggleable__label-arrow">DecisionTreeClassifier</label><div class="sk-toggleable__content"><pre>DecisionTreeClassifier(max_depth=1)</pre></div></div></div></div></div></div></div></div></div></div>


