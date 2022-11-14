---
title: '[DL/BASIC] 혼동행렬 : 모델 성능 시각화하기 📊'
layout : single
toc: true
toc_sticky: true
categories:
  - basics
---

## 6. 오차행렬 (confusion matrix)

### 6.1 오차행렬 알아보기
오차 행렬(confusion matrix)은 이중 분류 모델의 평가 결과를 나타낼 때 많이 사용하는 방법 중 하나이다. 오차 행렬의 뜻을 해석해보면 학습된 분류 모델이 예측을 수행면서 얼마나 혼동하고 있는지 보여주는 지표라고 생각하면 된다. 오차 행렬은 다음 이미지와 같이 2x2 크기의 배열이다. 배열의 행은 정답 클래스에 해당하고, 열은 예측 클래스에 해당한다.

![cf1](https://user-images.githubusercontent.com/77332628/201680980-5b2b5fbe-011d-43ea-b113-08ef0d47f473.png)

위의 배열에서 4가지의 값이 발생했는데, TN과 TP는 각각 True Negative와 True Positive로 올바르게 예측한 횟수이고 FN과 FP는 False Negative와 False Positive로 잘못 예측한 횟수이다. 이제 이 4가지 값들을 가지고 어떤 의미있는 지표를 계산할 수 있는지 알아보자.

### 6.2 오차행렬로 얻을 수 있는 지표

#### 6.2.1 정확도 (accuracy)
정확도는 모델이 입력 데이터에 대해서 얼마나 정확하게 예측했는지를 나타내는 지표다. 정확도는 (올바르게 예측한 횟수) / (전체 데이터수)로 계산한다. 


#### 6.2.2 정밀도 (precision)
정밀도는 모델의 예측값이 얼마나 정확하게 됐는지를 나타내는 지표다. 정밀도는 모델의 타깃값(positive값)을 예측한 정답률이라고 생각하면 된다. 

#### 6.2.3 재현율 (recall)
재현율은 모델이 실제 정답값 중에서 모델이 예측에 성공한 값들의 비율이다.

![cf2](https://user-images.githubusercontent.com/77332628/201682262-6b6f9e19-74b0-4354-b218-c542badbd48b.png)

### 6.3 다중분류에서의 혼동행렬
당연하게도 이중분류가 아닌 다중분류 모델에서도 혼동 행렬을 통한 모델의 예측 성능 평가가 가능하다. 예를 들어 3가지 클래스로 분류하는 모델의 혼동 행렬은 다음 이미지와 같이 나올 것이다.

![cf3](https://user-images.githubusercontent.com/77332628/201680888-39f1bac8-79cc-427d-bf78-f1d2333f7361.png)


그리고 각 A,B,C 클래스 중 어느 것이 타깃값인지에 따라 다음 세가지의 경우로 혼동 행렬이 나올 것이다.

A가 타깃값인 경우

![cf4](https://user-images.githubusercontent.com/77332628/201680896-35c3112c-82f5-4219-a213-846aeed51056.png)


B가 타깃값인 경우

![cf5](https://user-images.githubusercontent.com/77332628/201680902-e72129c7-96a7-45e1-98a7-55a238551df1.png)


C가 타깃값인 경우

![cf6](https://user-images.githubusercontent.com/77332628/201680908-a1296493-74b3-4966-8ebd-751bb406c2a9.png)


각각의 색에 대한 설명


![cf7](https://user-images.githubusercontent.com/77332628/201680909-45a5a129-b3e9-46b6-9b29-0190b2b6df6d.png)

(위의 5개의 이미지 출처 https://rython.tistory.com/14)

이후 정확도,정밀도,재현율은 똑같이 계산해주면 된다.

이번 글에서는 모델의 예측 성능을 평가하고 시각화 할 수 있는 간단한 방법인 혼동행렬에 대해서 알아봤고, 유용한 지표인 정확도, 정밀도, 재현율에 대해서도 알아봤다.
