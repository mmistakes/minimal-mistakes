---
layout: single
title:  "Brute Force(무차별 대입 공격)"
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

</span>
<br>
<br>
![image](https://github.com/gyun97/Baekjoon_Solution/assets/143414166/960ad31e-472d-41d6-8f4a-3978c2c04b49)

<br>
<br>
<br>
# **Brute Force란?**
<span style = "color:blue; font-weight = bold;">
Brute Force 알고리즘은 어떤 문제에 대해서 가능한 모든 경우의 수를 시도하여 원하는 결과를 찾는 방법을 의미한다.</span><br>
알고리즘의 이름 그대로 (Brute: 야만적인, 난폭한 + force: 힘, 무력) 다른 알고리즘에 비해 매우 단순하고 직관적이지만 완전탐색의 한 형태로 가능한 모든 조합을 시도하여 원하는 결과를 찾기 때문에 입력 데이터의 크기가 커지면 커질수록 시간 복잡도가 급증하여 한편으로는 매우 비효율적인 알고리즘이다.

