---
layout: single
title:  "딥러닝을 이용한 자연어 처리 - 10"
date: 2024-04-27
categories : nlp-tutorial
tag : [nlp-study, 딥러닝을 이용한 자연어 처리,python]
toc: true
toc_sticky: true
order: 10
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=딥러닝을 이용한 자연어 처리 - 10&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

[내용 참고](https://wikidocs.net/book/2155)

&nbsp;

# 다양한 단어의 표현 방법

- 모델 내에서 자신의 성능을 수치화하여 결과를 내는 펄플렉서티(perplexity)

&nbsp;

## 1. 단어의 표현 방법 

- 크게 국소 표현(Local Representation) 방법과 분산 표현(Distributed Representation) 방법으로 구분
  - **국소 표현 방법**
    - 해당 단어 그 자체만 보고, 특정값을 맵핑하여 단어를 표현하는 방법
    - == 이산 표현(Discrete Representation)
      - EX) puppy(강아지), cute(귀여운), lovely(사랑스러운) 단어가 있을때 각 단어에 1번, 2번, 3번등과 같은 숫자를 맵핑하여 부여한다면 해당 방법은 국소 표현 방법
  - **분산 표현 방법**
    - 단어를 표현하고자 주변을 참고하여 단어를 표현하는 방법
    - == 연속 표현(Continuous Represnetation)
      - EX) puppy(강아지)라는 단어 근처에는 주로 cute(귀여운), lovely(사랑스러운)이라는 단어가 자주 등장하므로, puppy라는 단어는 cute, lovely한 느낌이다로 단어를 정의

&nbsp;

## 2. 단어 표현의 카테고리화

![img](/images/wordrepresentation.png)

- Bag of Words는 국소 표현에 속하며, 단어의 빈도수를 카운트 하여 단어를 수치화 하는 단어 표현 방법

&nbsp;
