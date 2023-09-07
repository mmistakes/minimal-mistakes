---
layout: single
title:  "알고리즘 평가의 기준 1: 시간 복잡도(Time Complexity)"
toc: true
author_profile: false
categories: Algorithm
tags: "python"
sidebar:
    nav: "counts"
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

<span style="font-size:13px;">
해당 글은 codeit의 강의를 참고하였음을 명확히 밝힙니다.
</span>
<br>
<br>
![image](https://github.com/gyun97/Baekjoon_Solution/assets/143414166/a8626d52-b21b-4c33-be46-a6bcece11507)
<br>
<br>
알고리즘을 구상하고 평가할 때 우리가 고려해야 할 사항은 앞서 잠깐 언급했듯이 '시간과 공간'이다.<br>
이번 포스팅에서는 그 중 알고리즘의 가장 중요한 시간과 관련된 평가 기준인 시간 복잡도에 대해 이야기할 것이다.   
 
## **알고리즘 평가 기준 1: 시간 복잡도(Time Complexity)**
<span style = "color:blue; font-weight:bold;">
시간 복잡도란 데이터가 많아질수록 걸리는 시간이 얼마나 급격히 증가하는지를 BiG-O 표기법(점근 표기법)으로 나타낸 것을 의미한다.</span><br>
시간적인 측면에서 가장 이상적인 알고리즘은 특정 문제를 해결하거나 서비스를 제공하는 데에 있어 돌아가는 시간이 가장 짧은 프로그램이다.<br>
그렇다면 왜 단순히 프로그램이 돌아가는 시간을 측정하여 알고리즘을 평가하지 않고 어렵고 복잡하게 시간 복잡도를 사용하여 알고리즘을 평가하는 것일까??<br>
그 이유는 컴퓨터의 사양, 인터넷과 프로그래밍 언어의 속도 등 매우 다양한 외부 환경 요인의 영향을 받기 때문에 프로그램이 돌아가는 시간으로 알고리즘을 평가하는 것은 비합리적이다. 

   

