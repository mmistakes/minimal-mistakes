---
layout: single
title:  "딥러닝을 이용한 자연어 처리 - 9"
date: 2024-04-27
categories : nlp-tutorial
tag : [nlp-study, 딥러닝을 이용한 자연어 처리,python]
toc: true
toc_sticky: true
author_profile: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=딥러닝을 이용한 자연어 처리 - 9&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

[내용 참고](https://wikidocs.net/book/2155)

&nbsp;

# 펄플렉서티 (Perplexity, PPL)

- 모델 내에서 자신의 성능을 수치화하여 결과를 내는 펄플렉서티(perplexity)

&nbsp;

## 1. 언어 모델의 평가 방법 (Evaluation metric)

- 펄플렉서티는 언어 모델을 평가하기 위한 지표

  - PPL은 낮을수록 좋고, 높을수록 안좋음
  - PPL은 문장의 길이로 정규화된 문장 확률의 역수, 문장 확률의 역수, 문장 ![equation](/images/svg.image)의 길이가 ![equation](/images/svg-20240427142822297.image)이라고 했을때 PPL의 수식

    ```
    $${PPL(W)=P(w_{1}, w_{2}, w_{3}, ... , w_{N})^{-\frac{1}{N}}=\sqrt[N]{\frac{1}{P(w_{1}, w_{2}, w_{3}, ... , w_{N})}}}$$
    ```

    
  
  $$
  {PPL(W)=P(w_{1}, w_{2}, w_{3}, ... , w_{N})^{-\frac{1}{N}}=\sqrt[N]{\frac{1}{P(w_{1}, w_{2}, w_{3}, ... , w_{N})}}}
  $$
  
  - 문장의 확률에 체인룰을 적용시
    $$
    PPL(W)=\sqrt[N]{\frac{1}{P(w_{1}, w_{2}, w_{3}, ... , w_{N})}}=\sqrt[N]{\frac{1}{\prod_{i=1}^{N}P(w_{i}| w_{1}, w_{2}, ... , w_{i-1})}}
    $$
  
  - N-gram 적용시 bigram 언어 모델의 경우는 아래와 같음
    $$
    PPL(W)=\sqrt[N]{\frac{1}{\prod_{i=1}^{N}P(w_{i}| w_{i-1})}}
    $$

&nbsp;

## 2. 분기 계수

- PPL은 선택할 수 있는 가능한 경우의 수를 의미하는 분기계수

  - 언어 모델이 특정 시점에서 평균적으로 몇 개의 선택지를 가지고 고민하고 있는지를 의미

    - EX) PPL = 10 은 해당 언어 모델은 다음 단어를 예측하는 모든 시점마다 평균 10개의 단어를 가지고 정답을 고민하는 것으로 해석

      > 테스트 데이터에 대해서 두 언어 모델의 PPL을 각각 계산 후에 PPL 값을 비교하면 낮은 PPL을 가지는 모델이 더 성능이 좋음
      > $$
      > PPL(W)=P(w_{1}, w_{2}, w_{3}, ... , w_{N})^{-\frac{1}{N}}=(\frac{1}{10}^{N})^{-\frac{1}{N}}=\frac{1}{10}^{-1}=10
      > $$

- 

- 주의
  - 평가 방법에서 주의할 점은 PPL의 값이 낮다는 것은 테스트 데이터 상에서 높은 정확도를 보인다는 것이고, 사용성에서 좋은 모델이라는 것은 아님
  - 언어 모델의 PPL은 테스트 데이터에 의존하므로 두 개 이상의 언어 모델을 비교할 때는 정량적으로 양이 많고, 또한 도메인에 알맞은 동일한 테스트 데이터를 사용해야 신뢰도가 높음

&nbsp;

## 3. 기존 언어 모델 Vs. 인공 신경망을 이용한 언어 모델.

- 페이스북 AI 연구팀의 n-gram 언어 모델과 딥러닝 이용한 언어 모델 PPL 성능 비교

![img](/images/ppl.png)

> 인공 신경망을 이용한 언어 모델들은 대부분 n-gram을 이용한 언어 모델보다 더 좋은 성능을 기록

&nbsp;
