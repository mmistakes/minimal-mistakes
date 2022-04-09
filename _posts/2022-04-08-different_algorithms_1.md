---
layout: single
title:  "AdaBoost, ExtraTrees, GradientBoosing, LDA"
categories: ML
tag: [AdaBoost, ExtraTrees, GradientBoosing, LDA]
toc: true
author_profile: false
sidebar:
    nav: "docs"
search: false
---

# AdaBoost (Adaptive Boosing)

- GradientBoosting 처럼 내부에 약한 성능의 분류기를 가지는 앙상블 모델
- GradientBoosting이 이전 분류기가 만든 잔여 오차에 대해 새로운 분류기를 만들었다면, AdaBoost는 이전의 분류기가 잘못 분류한 샘플에 대해서 가중치를 높여서 다음 모델을 훈련시킨다. 반복마다 샘플에 대한 가중치를 수정
- 훈련된 각 분류기는 성능에 따라 가중치가 부여되고, 예측에서 각 분류기가 예측한 레이블을 기준으로 가중치까지 적용해 가장 높은 값을 가진 레이블을 선택

-------------------

# ExtraTreesClassifier

- random forest model의 변종으로, forest tree 의 각 후보 feature을 무작위로 분할하는 식으로 무작위성을 증가시킨다
- extra tree의 base인 ```ExtraClassifier```는 ```DecisionClassifier```를 상속한 것이며, ```splitter="best"```가 아니고 ```splitter="random"```인 것과 ```max_features="auto"```인 것을 제외하고는 ```DecisionTreeClassifier```와 동일
- accuracy 자체는 random forest와 거의 동일하지만, feature의 weight가 비교적 고른 편

-------

# GradientBoosting
- 여러 개의 DecisionTree를 묶어 부스팅하는 앙상블 기법
- 회귀와 분류 모두 사용 가능
- 랜덤하게 트리를 생성한 랜덤 포레스트와는 달리 그래디언트 부스팅은 이전 트리의 오차를 보완하는 방식으로 순차적으로 트리를 만듬 (무작위성이 없음)
- 보통 다섯 개 이하 깊이의 트리를 사용하므로 메모리를 적게 사용하고 예측도 빠르다.
- 각각의 트리는 데이터의 일부에 대해서만 맞춰져있어 트리가 많이 추가될수록 성능이 좋아짐
- 단점 : 매개변수를 잘 조정해야하며, 훈련시간이 길다. 트리의 특성상 고차원 희소 데이터에 대해서는 정상적 작동이 어렵다

- learning_rate : 이전 트리의 오차를 얼마나 강하게 보정할 것인지를 제어 (학습률이 크면 트리는 보정을 강하게 하기 때문에 복잡한 모델을 만듬)
- n_estimators 값을 키우면 앙상블에 트리가 더 많이 추가되어 모델의 복잡도가 커지고 훈련 세트에서의 오차를 더 잘 바로잡을 수 있음

-------
# LDA(Linear Discriminant Analysis, LDA)
- LDA는 PCA와 마찬가지로 차원 축소 방법
- LDA는 PCA와 유사하게 입력 데이터 세트를 저차원 공간으로 투영(project)해 차원을 축소하는 기법이지만, PCA와 다르게 LDA는 지도학습의 분류(Classification)에서 사용됩니다.

-----------
References
- https://inuplace.tistory.com/583
- https://midannii.github.io/deeplearning/2021/02/12/XGB.html
- https://inuplace.tistory.com/582
- https://bkshin.tistory.com/entry/%EB%A8%B8%EC%8B%A0%EB%9F%AC%EB%8B%9D-18-%EC%84%A0%ED%98%95%ED%8C%90%EB%B3%84%EB%B6%84%EC%84%9DLDA