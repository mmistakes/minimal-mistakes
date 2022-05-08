---
layout: single
title:  "파라미터와 하이퍼파라미터"
categories: MachineLearning
tag: [python, Machine Learning]
toc: true
---

### 1. 파라미터 (Parameter)

머신러닝에서 사용되는 파라미터는 모델 파라미터라고도 하며, 즉 파라미터는 모델 내부에서 결정되는 변수입니다.
* 가중치 계수 (weight coefficient)
* 편향 (bias)

### 2. 하이퍼 파라미터 (Hyper parameter)

모델이 학습할 수 없어서 사용자가 지정해야만 하는 파라미터를 **하이퍼파라미터**라고 합니다.
 
* 학습률 (Learning Rate)
* 손실 함수 (Cost Function)
* 가중치 초기화 (Weight Initialization)

경사하강법에서 시작점에서 다음점으로 이동할 때 보폭을 학습률이라고 한다. 학습률은 현재점에서 다음점으로 얼마큼 이동을하는지 모델이 세세하게 학습을 하는지를 말합니다.
학습률이 작으면 손실이 최적인 가중치를 찾는데 오랜 시간이 걸리고, 학습률이 너무 크다면 최적점을 무질서하게 이탈합니다.

손실함수는 측정한 데이터를 토대로 산출한 모델의 예측값과 실제값의 차이를 표현하는 지표이다.

하이퍼 파라미터는 정해진 최적의 값이 없습니다.
