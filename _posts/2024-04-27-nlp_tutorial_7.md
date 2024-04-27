---
layout: single
title:  "딥러닝을 이용한 자연어 처리 - 7"
date: 2024-04-26
categories : nlp-tutorial
tag : [nlp-study, 딥러닝을 이용한 자연어 처리,python]
toc: true
toc_sticky: true
order: 7
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=딥러닝을 이용한 자연어 처리 - 7&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

[내용 참고](https://wikidocs.net/book/2155)

&nbsp;

# N-gram 언어 모델

- 언어 모델과는 달리 이전에 등장한 모든 단어를 고려하는 것이 아니라 일부 단어만 고려하는 접근 방법을 사용
- 일부 단어를 몇 개 보느냐를 결정하는데 이것이 n-gram에서의 n이 가지는 의미

&nbsp;

## 1. 코퍼스에서 카운트하지 못하는 경우의 감소

- SLM의 문제는 훈련 코퍼스에 확률을 계산하는 형태인데 만약 훈련데이터에서 못본 코퍼스가 입력으로 주어진다면 계산이 불가능

  - 참고하는 단어들을 줄인다면 count가 가능할수 있음

    ![image-20240427135012457](/images/image-20240427135012457.png)

    - An adorable little boy 뒤 is가 나올 확률은 boy가 나올때 is가 나올 확률로 생각 (~~~~ is 보다 boy is가 단어 시퀀스가 존재할 가능성이 높음)

    > 뒤에 따라오는 단어의 확률을 계산하기 위해서 전체가 아닌 임의의 개수만을 포함해서 count 계산, 이후 그 값을 근사하는 것

&nbsp;

## 2. N-gram

- 임의의 개수를 정하기 위해 사용하는 것이 n-gram, n-gram은 n개의 연속적인 단어 나열을 의미

  - An adorable little boy is spreading smiles를 통한 예시

    ~~~ markdown
    unigrams : an, adorable, little, boy, is, spreading, smiles
    bigrams : an adorable, adorable little, little boy, boy is, is spreading, spreading smiles
    trigrams : an adorable little, adorable little boy, little boy is, boy is spreading, is spreading smiles
    4-grams : an adorable little boy, adorable little boy is, little boy is spreading, boy is spreading smiles
    ~~~

- n-gram을 통한 언어 모델에서는 다음에 나올 단어의 예측은 오직 n-1개의 단어에 의존

  - n=4인 4-gram의 예시

    - An adorable little boy is spreading __ 경우에서 앞의 3개의 단어만을 고려

    - ![image-20240427135607170](/images/image-20240427135607170.png)

    - 여기서 boy is spreading = 1,000번, boy is spreading insults = 500번, smiles = 200번 이면 

      - ![image-20240427135709982](/images/image-20240427135709982.png)

        > insults가 더 맞는 것으로 판단함


&nbsp;

## 3. N-gram Language Model의 한계

- n-gram은 단어 n개만 선택하기 때문에 문맥적으로 올바르지 못하는 경우가 있음

- 전체 문장을 고려하는 SLM보다는 성능이 덜어질 수 있음

&nbsp;

### 희소 문제

- 현실적으로 SLM보다 일부의 단어만 보는 n-gram이 확률을 높일수 있지만 희소문제가 존재함

&nbsp;

### n을 선택하는 것은 trade-off 

- 앞에서 몇 개의 단어를 볼지 n을 정하는 것은 trade-off가 존재함
- n을 크게 선택하면 실제 훈련 코퍼스에서 해당 n-gram count 확률은 줄어듦 > 희소 문제가 발생, n이 커질수록 모델 크기도 증가 (모든 n-gram에 대해서 카운트 해야함)
- 반대로 n을 작게 선택하면 훈련에서는 count가 좋지만 근사 정확도는 떨어짐

> 적절한 n의 값을 선택하는 것이 좋음, n은 최대 5를 넘지 않게 설정하는 것을 권장

- 3,800만 개의 단어 토큰에 대하여 n-gram 언어 모델을 학습, 1,500만 개의 테스트 데이터에 대해서 테스트를 수행할때 아래와 같은 성능을 기록
  - n이 1<2<3 커질수록 성능이 올라감

|                | **Unigram** | **Bigram** | **Trigram** |
| :------------- | :---------- | :--------- | :---------- |
| **Perplexity** | 962         | 170        | 109         |

&nbsp;

## 4. 적용 분야에 맞는 코퍼스의 수집

- 사용하고자 하는 도메인의 코퍼스를 사용한다면 언어 모델이 제대로 된 언어 생성을 함
- 훈련에 사용된 도메인 코퍼스에 따라 성능이 달라짐

&nbsp;

## 5. 인공 신경망을 이용한 언어 모델

- N-gram Language Model의 한계점을 극복하기위해 분모, 분자에 숫자를 더해서 count 할때 0이 되는 것을 방지하는 등의 여러 일반화 방법들이 존재
  - 본질적으로 n-gram 언어 모델에 대한 취약점은 존재, 이를 해결하기 위해 **인공 신경망을 이용한 언어 모델** 사용

&nbsp;
