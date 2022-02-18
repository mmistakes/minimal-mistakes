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



<span style="color: red">P.S. 이 문서는 https://scikit-learn.org/stable/tutorial/basic/tutorial.html 의 내용을 개인적으로 공부한 후 정리한 것임을 밝힙니다.</span>

<span style='background-color: #EEEEEE'>이 문서는 scikit-learn의 전반에 걸쳐 [머신러닝](https://en.wikipedia.org/wiki/Machine_learning)의 용어를 소개하고 학습의 예시를 제공합니다.</span>


## <span style='background-color: #BED4EB'>머신러닝: 문제 설정하기</span>


일반적으로 학습 문제는 train set 라 불리는 n 개의 데이터 샘플 집합으로 학습한 후 알려지지 않은 데이터의 특성을 예측하려고 시도합니다. 만약, 각 데이터 샘플의 **특성**<sup>feature</sup>이 여러 개 있다면 이를 다차원 항목 (aka. [다변수](https://en.wikipedia.org/wiki/Sample_(statistics)) 데이터)라고 합니다.



ex) 붓꽃의 한 샘플에는 꽃잎 길이, 꽃잎 너비, 꽃받침 길이 그리고 꽃받침 너비 등의 특징이 있으므로 다변수 데이터입니다.


학습은 여러 개의 범주로 나뉩니다:





*   [지도 학습<sup>supervised learning</sup>](https://en.wikipedia.org/wiki/Supervised_learning)에는 우리가 예측하고자 하는 레이블<sup>label</sup>이라는 추가적인 특성이 포함됩니다. 이 문제는 다음 중 하나일 수 있습니다. ([scikit-learn supervised learning page](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning))



  - [분류classification](https://en.wikipedia.org/wiki/Statistical_classification): 각 샘플은 두 개 이상의 레이블 중 하나에 속합니다. 그리고, 분류의 목적은 이미 레이블이 지정된 과거의 데이터를 기반으로 아직 레이블이 지정되지 않은 새로운 데이터의 레이블을 예측하는 방법을 배우는 것입니다. 분류 문제의 예로는 MNIST 같은 필기 숫자 인식이 있으며, 입력으로 들어온 각 벡터를 유한한 수의 이산 범주 중 하나로 할당하는 것입니다. MNIST 같은 필기 숫자 인식은 분류 문제의 대표적인 예이며, 입력으로 들어온 각 벡터를 유한한 수의 이산적인 레이블 중 하나로 할당하는 것입니다.



  - [회귀regression](https://en.wikipedia.org/wiki/Regression_analysis): 원하는 출력이 연속적인 변수로 구성된 경우를 회귀라고 합니다. 회귀 문제의 예는 연어의 나이와 무게를 기반으로 연어의 길이를 예측하는 것입니다.



*  [비지도 학습<sup>unsupervised learning</sup>](https://en.wikipedia.org/wiki/Unsupervised_learning)은 학습 데이터에 대응하는 레이블이 없이 입력 벡터 x 세트로만 구성되어 있습니다. 비지도 학습의 목표는 데이터 내에서 [군집<sup>clustering</sup>](https://en.wikipedia.org/wiki/Cluster_analysis)이라고 하는 그룹을 발견하거나 [밀도 추정](https://en.wikipedia.org/wiki/Density_estimation)을 통해 입력 공간 내의 데이터의 분포를 결정하는 것일 수 있습니다. 그리고, 시각화를 위해서 고차원의 데이터를 2차원 또는 3차원으로 축소하는 것일 수 있습니다.([scikit-learn unsupervised learning page](https://scikit-learn.org/stable/unsupervised_learning.html#unsupervised-learning))







<span style='background-color: #EEEEEE'>**Training set and testing set**</span>



<span style='background-color: #EEEEEE'>머신러닝은 데이터 세트의 일부 속성을 학습한 다음 다른 데이터 세트에 대해 해당 속성을 테스트(예측)하는 것입니다. 머신러닝의 일반적인 관행은 데이터 세트를 둘로 분할하여 알고리즘을 평가하는 것입니다. 우리는 그중 하나를 **훈련 세트**<sup>training set</sup>, 다른 하나를 **테스트 세트**<sup>testing set</sup>이라고 부릅니다. 이들은 각각 모델을 훈련시키고 모델을 테스트합니다.</span>


## <span style='background-color: #BED4EB'>예시 데이터셋 불러오기</span>


scikit-learn은 분류를 위한 iris와 digits 데이터셋과 회귀를 위한 diabetes 데이터셋을 제공합니다.


다음으로, 개인의 shell로 Python 인터프리터를 시작하고 iris와 digits 데이터셋을 불러옵니다. $는 쉘 프롬프트를 나타내고 >>>는 파이썬 인터프리터 프롬프트를 나타냅니다.



```python
# $ python  필자는 google colab 환경에서 진행하므로 생략합니다.
from sklearn import datasets    # sklearn 라이브러리의 datasets 모듈을 로드합니다.
iris = datasets.load_iris()     # iris 변수에 iris 데이터셋을 저장합니다.
digits = datasets.load_digits() # digits 변수에 digits 데이터셋을 저장합니다.
```
