---
layout: single
title:  "선형회귀 쉽게 이해하기"
categories: Machine Learning
tag: [python, Machine Learning]
toc: true
---

## 1. 선형회귀란?

어떤 변수의 값에 따라서 x값이 증가하거나 감소할 때 y값 또한 증가하거나 감소하는 하는 경우 독립 변수가 1개라면 단순 선형 회귀라고 합니다.
키가 클수록 몸무게가 증가한다. 공부를 많이 할수록 시험점수가 오른다. 이와 같이 독립변수는 여러개가 될 수 있고 종속 변수는 하나만 올 수 있습니다.
선형 회귀는 한 개 이상의 독립 변수 와 의 선형 관계를 모델링합니다. 만약, 독립 변수 가 1개라면 단순 선형 회귀라고 합니다.

![Alt text](https://i.esdrop.com/d/f/uVJApfFjHN/a39HQaLJoA.jpg)

그렇다면 예상값이 정확히 일치하냐?하고 물으면 일치하지는 않습니다. 이는 근사치로 정확하지는 않고 최대한 가깝게 추정할 수 있도록 도와줍니다. 

$y=ax+b$

기울기 a, 절편 b에 따라 그 선의 모양이 정해지기 때문에 x를 넣었을 때 y를 구할 수 있습니다. 우리가 찾고자 하는 목적은 선형회귀분석을 가장 잘 나타내는 a와 b를 찾는 것입니다.

***

## 2. 선형회귀에서의 오차, 손실

우리는 선형회귀에서 정확한 값을 찾을 수 없고 근사값을 찾을 수 있습니다. 이와 같이 정확한 값과의 차이를 우리는 오차, 머신러닝에서는 손실이라고 부릅니다.앞으로 우리는 근사값을 추정치라고 부르겠습니다.

![Alt text](https://i.esdrop.com/d/f/uVJApfFjHN/Hv2vooqllM.jpg)

손실의 값은 음수가 될 수도 있고 양수가 될 수도 있습니다. 우리는 실제 데이터와 선과의 손실이 얼마나 차이가 있는지 알아보기 위해 손실을 제곱 해줍니다. 제곱을 해주는 이유는 손실이 얼마나 큰지를 보여주기 위함입니다. 이런 방식으로 손실을 구하는 걸 평균 제곱 오차(MSE)라고 부릅니다.

![Alt text](https://i.esdrop.com/d/f/uVJApfFjHN/XXHYzyxQb7.jpg)


![Alt text](https://i.esdrop.com/d/f/uVJApfFjHN/7KjIKAacQn.png)



![Alt text](https://i.esdrop.com/d/f/uVJApfFjHN/htNfl3AYzE.jpg)

손실을 구한 후 제곱을 해 보면 왼쪽의 직선의 정사각형이 더 작다는 걸 볼 수 있습니다. 그러므로 왼쪽의 직선 모델이 예측을 더 잘할 것입니다.

***

## 3. 경사하강법(Gradient Descent)


