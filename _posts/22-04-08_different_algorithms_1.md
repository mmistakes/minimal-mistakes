---
layout: single
title:  "AdaBoostClassifier, ExtraTreesClassifier, GradientBoostingClassifier"
categories: ML
tag: [AdaBoostClassifier, ExtraTreesClassifier, GradientBoostingClassifier]
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
- extra tree의 base인 $$ExtraClassifier$$는 $$DecisionClassifier$$를 상속한 것이며, $$splitter="best"$$가 아니고 $$splitter="random"$$인 것과 $$max_features="auto"$$인 것을 제외하고는 $$DecisionTreeClassifier$$와 동일
- accuracy 자체는 random forest와 거의 동일하지만, feature의 weight가 비교적 고른 편












-----------
참고
- https://inuplace.tistory.com/583
- https://midannii.github.io/deeplearning/2021/02/12/XGB.html