---
layout: single
title:  "딥러닝을 이용한 자연어 처리-05"
categories : nlp-tutorial
tag : [딥러닝을 이용한 자연어 처리, nlp, python]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=딥러닝을 이용한 자연어 처리 - 5&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

[내용 참고](https://wikidocs.net/book/2155)

&nbsp;

# 언어 모델

- 언어 모델은 언어라는 현상을 모델링 하고자 단어 시퀀스에 확률을 할당하는 모델
  - 언어모델을 만드는 방법
    - 통계를 이용한 방법
    - 인공 신경망을 이용한 방법

&nbsp;

## 언어 모델이란?

- 단어 시퀀스에 확률을 할당하는 일을 하는 모델
  - 가장 자연스러운 단어 시퀀스를 찾아내는 모델을 의미, 이전 단어들이 주어졌을 때 다음 단어를 예측

&nbsp;

## 단어 시퀀스의 확률 할당

- P는 확률

&nbsp;

### 기계 번역

~~~ python
P(나는 버스를 탔다) > P(나는 버스를 태운다)
~~~

&nbsp;

### 오타 교정

~~~ python
선생님이 교실로 부리나케
P(달려갔다) > P(잘려갔다)
~~~

&nbsp;

### 음성 인식

~~~ python
P(나는 메롱을 먹는다) < P(나는 메론을 먹는다)
~~~

&nbsp;

> 언어 모델은 확률을 기반으로 더 적절한 문장을 판단

&nbsp;

## 주어진 이전 단어들로부터 다음 단어 예측하기

- 언어 모델은 단어 시퀀스에 확률을 할당
  - 이전 단어들을 통해 다음 단어를 예측

&nbsp;

### 단어 시퀀스의 확률

- 하나의 단어를 ![equation](https://latex.codecogs.com/svg.image?%20w), 단어 시퀀스를 대문자 ![equation](https://latex.codecogs.com/svg.image?%20W)라고 한다면, ![equation](https://latex.codecogs.com/svg.image?%20n)개의 단어가 등장하는 단어 시퀀스 ![equation](https://latex.codecogs.com/svg.image?%20W)의 확률

  ![image-20240426173755432](/images/2024-04-26-nlp_tutorial5/image-20240426173755432.png)

&nbsp;

### 다음 단어 등장 확률

- ![equation](https://latex.codecogs.com/svg.image?%20n-1)개의 단어가 나열된 상태에서 ![equation](https://latex.codecogs.com/svg.image?%20n)번째 단어의 확률

  ![image-20240426173924655](/images/2024-04-26-nlp_tutorial5/image-20240426173924655.png)

- `|` : 조건부 확률

&nbsp;

> 전체 단어 시퀀스 ![equation](https://latex.codecogs.com/svg.image?%20W)의 확률은 모든 단어가 예측되고 알수있기 때문에 전체 확률
>
> ![image-20240426174041564](/images/2024-04-26-nlp_tutorial5/image-20240426174041564.png)
