---
layout: single
title:  "An introduction to machine learning with scikit-learn"
categories: scikit-learn tutorial
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


# <span style='background-color: #CDE8EF'>scikit-learn으로 배우는 머신러닝의 개요</span>



<span style="color: red">이 문서는 https://scikit-learn.org/stable/tutorial/basic/tutorial.html 의 내용을 개인적으로 공부한 후 정리한 것임을 밝힙니다.</span>


<div style='background-color: #EEEEEE'>이 문서는 scikit-learn의 전반에 걸쳐 <a href='https://en.wikipedia.org/wiki/Machine_learning' target='blank'>머신러닝</a>의 용어를 소개하고 학습의 예시를 제공합니다.</div>


## <span style='background-color: #BED4EB'>머신러닝: 문제 설정하기</span>


일반적으로 학습 문제는 train set 라 불리는 n 개의 데이터 샘플 집합으로 학습한 후 알려지지 않은 데이터의 특성을 예측하려고 시도합니다. 만약, 각 데이터 샘플의 **특성**<sup>feature</sup>이 여러 개 있다면 이를 다차원 항목 (aka. [다변수](https://en.wikipedia.org/wiki/Sample_(statistics)) 데이터)라고 합니다.



ex) 붓꽃의 한 샘플에는 꽃잎 길이, 꽃잎 너비, 꽃받침 길이 그리고 꽃받침 너비 등의 특성이 있으므로 다변수 데이터입니다.


학습은 여러 개의 범주로 나뉩니다:





*   [지도 학습<sup>supervised learning</sup>](https://en.wikipedia.org/wiki/Supervised_learning)에는 우리가 예측하고자 하는 레이블<sup>label</sup>이라는 추가적인 특성이 포함됩니다. 이 문제는 다음 중 하나일 수 있습니다. ([scikit-learn supervised learning page](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning))



  - [분류classification](https://en.wikipedia.org/wiki/Statistical_classification): 각 샘플은 두 개 이상의 레이블 중 하나에 속합니다. 그리고, 분류의 목적은 이미 레이블이 지정된 과거의 데이터를 기반으로 아직 레이블이 지정되지 않은 새로운 데이터의 레이블을 예측하는 방법을 배우는 것입니다. 분류 문제의 예로는 MNIST 같은 필기 숫자 인식이 있으며, 입력으로 들어온 각 벡터를 유한한 수의 이산 범주 중 하나로 할당하는 것입니다. MNIST 같은 필기 숫자 인식은 분류 문제의 대표적인 예이며, 입력으로 들어온 각 벡터를 유한한 수의 이산적인 레이블 중 하나로 할당하는 것입니다.



  - [회귀regression](https://en.wikipedia.org/wiki/Regression_analysis): 원하는 출력이 연속적인 변수로 구성된 경우를 회귀라고 합니다. 회귀 문제의 예는 연어의 나이와 무게를 기반으로 연어의 길이를 예측하는 것입니다.



*  [비지도 학습<sup>unsupervised learning</sup>](https://en.wikipedia.org/wiki/Unsupervised_learning)은 학습 데이터에 대응하는 레이블이 없이 입력 벡터 x 세트로만 구성되어 있습니다. 비지도 학습의 목표는 데이터 내에서 [군집<sup>clustering</sup>](https://en.wikipedia.org/wiki/Cluster_analysis)이라고 하는 그룹을 발견하거나 [밀도 추정](https://en.wikipedia.org/wiki/Density_estimation)을 통해 입력 공간 내의 데이터의 분포를 결정하는 것일 수 있습니다. 그리고, 시각화를 위해서 고차원의 데이터를 2차원 또는 3차원으로 축소하는 것일 수 있습니다.([scikit-learn unsupervised learning page](https://scikit-learn.org/stable/unsupervised_learning.html#unsupervised-learning))







<div style="background-color: #EEEEEE"><strong>훈련 세트와 테스트 세트</strong>

<br>머신러닝은 데이터 세트의 일부 속성을 학습한 다음 다른 데이터 세트에 대해 해당 속성을 테스트(예측)하는 것입니다. 머신러닝의 일반적인 관행은 데이터 세트를 둘로 분할하여 알고리즘을 평가하는 것입니다. 우리는 그중 하나를 <strong>훈련 세트<sup>training set</sup></strong>, 다른 하나를 <strong>테스트 세트<sup>testing set</sup></strong>이라고 부릅니다. 이들은 각각 모델을 훈련시키고 모델을 테스트합니다.</div>


## <span style='background-color: #BED4EB'>예시 데이터셋 불러오기</span>

`scikit-learn`은 분류를 위한 iris와 digits 데이터 세트와 회귀를 위한 diabetes 데이터 세트를 제공합니다.

<br>다음으로, 개인의 shell로 Python 인터프리터를 시작하고 `iris`와 `digits` 데이터 세트를 불러옵니다.

<br>

```python
from sklearn import datasets    # sklearn 라이브러리의 datasets 모듈을 로드합니다.
iris = datasets.load_iris()     # iris 변수에 iris 데이터 세트를 저장합니다.
digits = datasets.load_digits() # digits 변수에 digits 데이터 세트를 저장합니다.
```

<br>데이터 세트는 모든 데이터와 데이터에 대한 메타데이터를 포함하는 Bunch 객체(딕셔너리와 유사한 객체)입니다. 이 데이터는 `(n_samples, n_features)` 크기의 배열인 `.data` 멤버에 저장됩니다. 지도학습의 경우, 한 개 이상의 반응 변수(출력, 타깃)가 `.target` 멤버에 저장됩니다. 다양한 데이터 세트의 자세한 사항은 [전용 문서](https://scikit-learn.org/stable/datasets.html#datasets)에서 찾을 수 있습니다.

<br>예를 들어, digits 데이터 세트의 경우 `digits.data`는 각 digits 샘플을 분류하는 데 사용할 수 있는 특성에 접근할 수 있게 해줍니다.

<br>

```python
print(digits.data)
```

<pre>
[[ 0.  0.  5. ...  0.  0.  0.]
 [ 0.  0.  0. ... 10.  0.  0.]
 [ 0.  0.  0. ... 16.  9.  0.]
 ...
 [ 0.  0.  1. ...  6.  0.  0.]
 [ 0.  0.  2. ... 12.  0.  0.]
 [ 0.  0. 10. ... 12.  1.  0.]]
</pre>
그리고 `digits.target`은 digit 데이터 세트에 대한 정답 레이블을 제공합니다. 즉, 학습하려는 각 숫자 이미지에 해당하는 숫자입니다. 

<br>

```python
digits.target   # 첫 번째 숫자는 0, 두 번째 숫자는 1을 의미합니다.
```

<pre>
array([0, 1, 2, ..., 8, 9, 8])
</pre>
<div style='background-color: #EEEEEE'><strong>데이터 세트의 차원</strong>

<br>데이터는 항상 (샘플의 갯수, 특성의 갯수)의 2차원 배열이지만, 원래 데이터는 차원이 다를 수 있습니다. digits의 경우 각 원래 데이터는 (8, 8)인 이미지이고 이렇게 접근할 수 있습니다:

<div style='background-color: #D3D3D3'>

<pre>

>>> digits.images[0]

array([[ 0.,  0.,  5., 13.,  9.,  1.,  0.,  0.],

       [ 0.,  0., 13., 15., 10., 15.,  5.,  0.],
    
       [ 0.,  3., 15.,  2.,  0., 11.,  8.,  0.],
    
       [ 0.,  4., 12.,  0.,  0.,  8.,  8.,  0.],
    
       [ 0.,  5.,  8.,  0.,  0.,  9.,  8.,  0.],
    
       [ 0.,  4., 11.,  0.,  1., 12.,  7.,  0.],
    
       [ 0.,  2., 14.,  5., 10., 12.,  0.,  0.],
    
       [ 0.,  0.,  6., 13., 10.,  0.,  0.,  0.]])

</pre></div>

<a href='https://scikit-learn.org/stable/auto_examples/classification/plot_digits_classification.html#sphx-glr-auto-examples-classification-plot-digits-classification-py' target='blank'>이 데이터 세트의 간단한 예</a>는 원래 문제로부터 scikit-learn에서 사용할 데이터를 형성하기까지의 방법을 보여줍니다.</div>

<div style='background-color: #FFFFFF'>
    <br>
</div>


<div style='background-color: #EEEEEE'><strong>외부 데이터 세트 불러오기</strong>
<br>외부 데이터 세트를 불러오려면, <a href='https://scikit-learn.org/stable/datasets/loading_other_datasets.html#external-datasets' target='blank'>외부 데이터 세트 불러오기</a>를 참조해주세요.</div>


## <span style='background-color: #BED4EB'>학습과 예측</span>


digits 데이터 세트의 목표는 주어진 이미지를 올바른 숫자로 예측하는 것입니다. 새로운 데이터의 클래스를 예측할 수 있는 [추정기](https://en.wikipedia.org/wiki/Estimator)를 학습하도록 샘플이 주어지는데 각 샘플들은 10개의 클래스(0~9) 중 하나에 속합니다.

<br>scikit-learn에서 분류를 위한 추정기는 `fit(X, y)` 및 `predict(T)` 메서드를 구현하는 Python 객체입니다.

<br>`sklearn.svm.SVC` 클래스는 [support vector classification](https://en.wikipedia.org/wiki/Support_vector_machine)을 구현한 추정기입니다. 추정기의 생성자는 모델의 매개변수를 인수로 취합니다.

<br>지금은 추정기를 블랙 박스로 간주합니다.

<br>

```python
from sklearn import svm
clf = svm.SVC(gamma=0.001, C=100.)
```

<br>

<div style='background-color: #EEEEEE'><strong>모델의 파라미터 선택하기</strong>


<br>이 예시에서는, gamma의 값을 기본으로 설정했습니다. 이 파라미터들의 최적의 값을 찾기 위해서는 <a href='https://scikit-learn.org/stable/modules/grid_search.html#grid-search' target='blank'>그리드 서치</a>와 <a href='https://scikit-learn.org/stable/modules/cross_validation.html#cross-validation' target='blank'>교차 검증</a> 같은 도구들을 사용할 수 있습니다.</div>

<br>`clf`(분류기용) 추정기 객체가 먼저 모델에 적합합니다. 즉, 모델로부터 학습을 해야 합니다. 이것은 훈련 세트를 `fit` 메소드에 전달하여 수행됩니다. 훈련 세트의 경우 예측에 사용할 마지막 이미지를 제외하고 데이터 세트의 모든 이미지를 사용합니다. `[:-1]` Python 구문을 사용하여 훈련 세트를 선택합니다. 이는 `digits.data`에서 마지막 항목을 제외한 모든 항목을 포함하는 새 배열을 생성합니다. 

<br>


```python
clf.fit(digits.data[:-1], digits.target[:-1])
```

<pre>
SVC(C=100.0, gamma=0.001)
</pre>
이제 새로운 값을 예측할 수 있습니다. 이 경우, `digits.data`의 마지막 이미지를 예측할 수 있습니다. 예측을 통해 마지막 이미지와 가장 일치하는 훈련 세트의 이미지를 결정할 수 있습니다.

<br>

```python
clf.predict(digits.data[-1:])
```

<pre>
array([8])
</pre>
해당하는 이미지:


![digit_data.png](data:image/png;base64,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)

보시다시피 어려운 작업입니다. 이미지의 해상도도 좋지 않습니다.

분류기의 성능에 동의하시나요?


이 분류 문제의 완전한 예는 다음을 통해 실행하고 공부할 수 있습니다: [필기 숫자 인식](https://scikit-learn.org/stable/auto_examples/classification/plot_digits_classification.html#sphx-glr-auto-examples-classification-plot-digits-classification-py)

