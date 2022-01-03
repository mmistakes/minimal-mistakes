---
title : "⚙ 1. 머신러닝 기초"

categories:
    - Machinelearning
tags:
    - [AI]

toc : true
toc_sticky : true

date: 2022-01-03
last_modified_at: 2022-01-03
---  

* * *

🔨 새해가 밝았다. 올해는 학과 수업 중에 머신러닝 과목이 있기 떄문에 미리 예습하는 느낌으로 조금씩 공부해보려고 한다.  
🔨 의공학과 인공지능이 무슨 연관이 있을까 생각해봤는데, 아마 많은 생명학 데이터를 사람이 모두 산출해내서 어떤 상황에 적용한 결과를 예측하기란 불가능에 가깝기 때문이 아닐까 생각한다.

## 1. 머신러닝

🔨 explicit programming 의 한계 때문에 고안되기 시작  

- explicit programming : 정확한 상황에 딱 짜여진 대로 결과를 도출하는 것.  
    - 하지만 생각할 규칙과 상황이 너무 많이 늘어감에 따라 인간이 그 규칙들을 모두 따져가며 프로그래밍을 할 수가 없어짐
    - 그래서 프로그램이 배운다는 의미의 Machine Learning 이 발달하기 시작함
    - 코드를 통해서 프로그램을 학습시키고, 프로그램은 학습한 내용을 바탕으로 다양한 상황을 예측하고 결과를 산출
    - 주로 <b>Supervised learning</b> 과 <b>Unsupervised learning</b> 로 분류

### 1.1 Supervised learning (지도학습)
* * *
🔨 정해진 training set을 가지고 학습하는 것  

- 이미지 라벨링, 스팸이메일 필터
- Label(답)이 정해지지 않은 feature를 가지는 training set을 머신이 학습하고 feature에 정확한 Label을 해줌

<p align="center"><img src="https://user-images.githubusercontent.com/65170165/147894459-9e33f876-0070-4789-927e-1d508f872801.png" width="700" /></p>

- 종류
  - <b>Regression</b> (회귀) : 넓은 범위에 대해서 예측해야 하는 경우 (1~100) - 예측변수 사용
  - <b>Binary classification</b> (분류) : 둘 중에 하나로 나눠야하는 경우 (A / B)
  - <b>Multi-label classification</b> : 몇 개 중에 하나로 분류해야 하는 경우 (A / B / C / D / F)

### 1.2 Unsupervised learning (비지도학습)
* * *

🔨 정해지지 않은 데이터를 가지고 직접 학습해야 하는 것
- 데이터만을 가지고 학습하게 되는데 데이터가 무작위로 분포 되어 있을때 <b>비슷한 특성</b>을 가진 데이터들을 묶는 방식

* * *

🔨 이번 포스팅에서는 머신러닝의 기본적인 과정과 종류에 대해 알아보았다. training set을 통해서 학습하고, feature에 대해서 label을 결과값으로 주는 과정이 일단은 간결해서 좋았다 (물론 공부하다보면 또 머리를 부여잡겠지만...??).  

🔨 다음 포스팅에서는 선형회귀에 대해서 알아보자.