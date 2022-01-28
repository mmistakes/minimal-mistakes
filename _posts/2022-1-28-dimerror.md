---
layout: single
title: 에러해결-mat1 dim 1 must match mat2 dim 0
categories: 딥러닝에러
tag: pytorch, numpy
typora-root-url: ../
---

RuntimeError: mat1 dim 1 must match mat2 dim 0
딥러닝 학습을 하다보면 만날수 있는 사소하지만 흔한 에러로 모델의 사이즈가 맞지 않은 경우이다. 그래서 모델 안에서의 구조를 .shape() 함수를 통해서 확인해주면 쉽게 문제가 된 부분을 찾을 수 있을것이다.