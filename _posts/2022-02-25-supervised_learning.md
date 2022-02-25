---
layout: single
title:  "Supervised learning: predicting an output variable from high-dimensional observations"
categories: scikit-learn tutorial statistical_inference
tag: [python, scikit-learn]
toc: true
author_profile: false
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


# <span style='background-color: #CDE8EF'> 지도 학습: 고차원 관측치로부터 결과값 예측하기 </span>


<div style="background-color: #EEEEEE"><strong>지도 학습으로 문제 해결하기</strong>
<br><a href='https://scikit-learn.org/stable/supervised_learning.html#supervised-learning' target='blank'>지도 학습</a>은 관측 데이터 <code>x</code> 와 "정답" 또는 "레이블"이라고 부르는 예측 변수 <code>y</code>의 관계를 학습합니다.대부분, <code>y</code>는 <code>n_samples</code> 길이의 1D 배열입니다.

<br>scikit-learn의 모든 지도 학습 <a href='https://en.wikipedia.org/wiki/Estimator' target='blank'>추정기</a>는 모델을 학습시키기 위한 <code>fit(X, y)</code> 메서드를 제공합니다. 그리고, 레이블이 지정되지 않은 관측치 <code>X</code>가 주어지면 예측 레이블 <code>y</code>를 반환하는 <code>predict(X)</code> 메서드도 제공합니다. </div>

<br>

<div style="background-color: #EEEEEE"><strong>어휘: 분류 및 회귀</strong>
<br>예측이 관측치에 일련의 유한한 레이블을 지정하는 것, 즉 관찰된 객체에 "이름을 지정"하는 것이라면 이러한 작업을 <b>분류</b>라고 합니다. 반면, 연속적인 타겟 변수를 예측하는 것이 목표라면 <b>회귀</b>라고 합니다.

<br> Note: scikit-learn 내에서 사용되는 기본 기계 학습 어휘에 대한 빠른 실행은 <a href='https://sameta-cani.github.io/scikit-learn/tutorial/sklearn_tut1/' target='blank'>다음 문서</a>를 참조하세요.</div>

<br>

<span style='color:#808080'>ⓒ 2007 - 2021, scikit-learn developers (BSD License).</span> <a href='https://scikit-learn.org/stable/_sources/tutorial/statistical_inference/supervised_learning.rst.txt' target='blanck'>Show this page source</a>

