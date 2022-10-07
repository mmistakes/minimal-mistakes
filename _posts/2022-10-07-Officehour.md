---
layout: single
title:  "Vit, (3주차 심화과제)"
categories : DL
tag : 
toc : true
use_math : true
---

# Vit : Vision Transformer
 : Transformer 를 최대한 변형시키지 않고 CV분야에 적용한 방법론.
트랜스포머의 계산 효율성, 큰 스케일에서 효율적임을 이용

장점
1) 기존 transformer의 변경을 최소화하여 architecture 구성 -> 확장성이 좋음
2) transformer의 computational efficiency 장점을 그대로 얻음.

단점
1) CNN보다 Inductive bias가 부족 -> 더 많은 데이터를 요구
 -Inductive bias : 처음 보는 입력에 대해 모델이 출력을 예측하기 위해 사용되는 가정. CNN 에서의 두 특징 결여
	  (1) Translation equivariance : input 위치가 변하면 output위치 또한 변함.
    -즉, 동일한 input에 대해서 다른 위치에서도 결과값이 같음
      (2) Locality
  : 이미지의 특정 영역만을 보고 feature를 추출할 수 있다.


Vit 의 방법론
1. 이미지 patc로 단위화

   ![image-20221007171921480](/images/2022-10-07-Officehour/image-20221007171921480.png)

2. Linear Projection of Flattened Patches
3. Class token 추가, positional embedding
4. Transformer Encoder 통과
5. MLP Head 통과
6. Class 분류



수식

![image-20221007172051466](/images/2022-10-07-Officehour/image-20221007172051466.png)



# AAE (Adversarial Autoencoders)
: 기존 VAE에 variation inference 수행하기 위해 Gan을 적용한 방법론

