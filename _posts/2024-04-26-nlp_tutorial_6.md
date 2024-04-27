---
layout: single
title:  "딥러닝을 이용한 자연어 처리-06"
categories : nlp-tutorial
tag : [딥러닝을 이용한 자연어 처리, nlp, python]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=딥러닝을 이용한 자연어 처리 - 6&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

[내용 참고](https://wikidocs.net/book/2155)

&nbsp;

# 통계적 언어 모델

&nbsp;

## 1. 조건부 확률

- 조건부 확률은 두 확률 ![equation](https://latex.codecogs.com/svg.image?P(A)), ![equation](https://latex.codecogs.com/svg.image?P(B))에 대해서 아래와 같은 관계

![image-20240426181509469](/images/2024-04-26-nlp_tutorial6/image-20240426181509469.png)

> 위의 수식을 다시 표현
>
> ![image-20240426181604659](/images/2024-04-26-nlp_tutorial6/image-20240426181604659.png)
>
> 일반화 수식 표현
>
> ![image-20240426181804598](/images/2024-04-26-nlp_tutorial6/image-20240426181804598.png)

&nbsp;

## 2. 문장에 대한 확률

-  문장의 확률은 각 단어들이 이전 단어가 주어졌을 때 다음 단어로 등장할 확률의 곱으로 구성

![image-20240426182007611](/images/2024-04-26-nlp_tutorial6/image-20240426182007611.png)

- EX) An adorable little boy is spreading smiles

![image-20240426182029917](/images/2024-04-26-nlp_tutorial6/image-20240426182029917.png)

> 각 단어에 대한 예측 확률의 곱으로 계산

&nbsp;

## 3. 카운트 기반의 접근

- SLM(통계적 언어 모델)은 이전 단어로 부터 다음 단어에 대한 확률은 카운트를 기반하여 확률 계산

- EX) An adorable little boy가 나올때 is가 나올 확률

![image-20240426182320745](/images/2024-04-26-nlp_tutorial6/image-20240426182320745.png)

> An adorable little boy 가 100번, 다음 is가 등장한 경우 30 일때 
>
> 30/100 = 30%

&nbsp;

## 4. 카운트 기반 접근의 한계 - 희소 문제

- 훈련에 필요한 데이터의 양이 많음
- 훈련한 코퍼스에 없는 내용이 나오면 확률이 0

> 충분한 데이터를 관측하지 못하여 언어를 정확히 모델링 못하는 문제 `희소문제`
>
> 위 문제를 완화하는 방법이 n-gram, 스무딩, 백오프와 같은 일반화 기법
