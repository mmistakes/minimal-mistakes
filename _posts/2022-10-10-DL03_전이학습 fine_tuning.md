---
layout: single
title:  "Tensorflow:: 전이학습, Fine tuning"
categories: 딥러닝
tag: [딥러닝, python, 전이학습, 사전학습, Fine tuning, tensorflow]
toc: true
toc_sticky: true

---

<head>
  <style>
    table.dataframe {
      white-space: normal;
      width: 100%;
      height: 240px;
      display: block;
      overflow: auto;
      font-family: Arial, sans-serif;
      font-size: 0.9rem;
      line-height: 20px;
      text-align: center;
      border: 0px !important;
    }

    table.dataframe th {
      text-align: center;
      font-weight: bold;
      padding: 8px;
    }

    table.dataframe td {
      text-align: center;
      padding: 8px;
    }

    table.dataframe tr:hover {
      background: #b8d1f3; 
    }

    .output_prompt {
      overflow: auto;
      font-size: 0.9rem;
      line-height: 1.45;
      border-radius: 0.3rem;
      -webkit-overflow-scrolling: touch;
      padding: 0.8rem;
      margin-top: 0;
      margin-bottom: 15px;
      font: 1rem Consolas, "Liberation Mono", Menlo, Courier, monospace;
      color: $code-text-color;
      border: solid 1px $border-color;
      border-radius: 0.3rem;
      word-break: normal;
      white-space: pre;
    }

  .dataframe tbody tr th:only-of-type {
      vertical-align: middle;
  }

  .dataframe tbody tr th {
      vertical-align: top;
  }

  .dataframe thead th {
      text-align: center !important;
      padding: 8px;
  }

  .page__content p {
      margin: 0 0 0px !important;
  }

  .page__content p > strong {
    font-size: 0.8rem !important;
  }

  </style>
</head>

전이학습이란 다른 데이터 셋으로 이미 학습한 모델을 유사한 다른 데이터를 인식하는데 사용하는 기법

- 이 방법은 특히 새로 훈련시킬 데이터가 충분히 확보되지 못한 경우에 높은 학습 효율을 높여줌
- 전이학습 모델을 적절히 이용하는 방법은 특성 추출(feature extraction) 방식과 미세 조정(fine-tuning) 방식이 있다.

### 전이학습 - 특성 추출 방식(feature extraction)

![02_1.png](/assets/images/DL03/02_1.png)

CNN 층에서 특성추출부만 가져와서 사용하는 방식이다.

- 특성추출부 부분만 사용하는 이유는 분류기(MLP)의 경우 우리가 해결 하고자 하는 문제에 맞게 새로 설정해줘야 하기 때문
- 단, 새롭게 분류할 클래스의 종류가 사전 학습에 사용된 데이터와 특징이 매우 다르면, 특성추출부 전체를 재사용해서는 안되고 앞 단의 일부 계층만을 재사용해야 함(심플한 특징들만 추출해내기 위해)

### 전이학습 - 미세 조정 방식(fine-tuning)

![02_2.png](/assets/images/DL03/02_2.png)

'사전 학습된 모델의 가중치’ 를 목적에 맞게 전체 또는 일부를 재학습시키는 방식이다.

특성 추출부의 층들 중 하단부 몇 개의 계층을 전결합층 분류기(MLP)와 함께 새로 학습시킨다.

- 처음부터 특성추출부 계층들과 분류기(MLP)를 같이 훈련시키면 새롭게 만든 분류기에서 발생하는 큰 에러 값으로 인해, 특성추출부에서 사전 학습된 가중치가 많이 손실될 수 있음
- 처음에는 분류기(MLP)의 파라미터가 랜덤하게 초기화 되어 있으므로 컨볼루션 베이스 중 앞 단 계층들을 고정(동결)하고 뒷 단의 일부 계층만 학습이 가능하게 설정한 후, MLP와 같이 학습시켜
파라미터(w, b) 들을 적당하게 잡아 준다.