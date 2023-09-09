---
layout: single
title:  "Divide and Conquer(분할 정복)"
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
## **Divide and Conquer란?**
<span style = "color:blue; font-weight:bold;">
Divdie and Conquer는 답을 바로 알기는 힘든 큰 문제를 같은 형태를 가진 여러 작은 부분 문제로 분할하고, 부분 문제들을 해결한 후에 그 결과를 결합하여 원래 문제를 해결하는 알고리즘 패러다임이다.
</span><br>
<br>
## **Divide and Conquer 매커니즘**
<span style = "font-weight:bold;">
1) Divde: 문제를 여러 개의 작은 부분 문제로 나눈다.<br>
<br></span>
<span style = "font-weight:bold;">
2) Conquer: 나뉘어진 모든 부분 문제들을 순차적으로 정복한다.</span><br>
    다만 부분 문제들이 아직도 너무 크다면 문제가 충분히 작아질 때까지 하위의 부분 문제들로 계속 나누는 과정을 반복한 후에 정복해야 한다.<br>
(base case: 문제가 충분히 작아서 바로 풀 수 있는 경우)<br>
(recursive case: 재귀적으로 부분 문제를 푸는 경우)
<br>
<br>
<span style = "font-weight:bold;">
3) Combine: 정복한 부분 문제들을 이용하여 기존의 문제를 해결한다.</span><br>
<br>
## **Divide and Conquer 예시**
<img width="700" alt="image" src="https://github.com/gyun97/Baekjoon_Solution/assets/143414166/208cf936-b2af-46f1-a7eb-a25b0c1825ba">
간단한 예시로 1부터 12까지의 합을 Divde and Conquer 방식으로 구해본 것이 위의 이미지이다.<br>
기존의 문제를 충분히 작은 부분 문제(base case)까지 문제를 분할(Divide)한 후 가장 작은 부분 문제들을 정복(Conquer)한 후 거슬러 올라가면서 그 해답들을 이용해 한 단계 위의 부분 문제들을 차례로 해결한 후 최종적으로는 기존의 문제를 해결하는 방식이다. 
<br>
<br>
파이썬 코드로는 다음과 같이 나타낼 수 있다.
```python
def sum_of_range(first, last):
    # base case //
    if first == last:  # 범위의 첫 번째와 마지막 수가 같으면 바로 답이 도출되어서 분할 필요 X
        return first

    #recursive case //
    mid = (first + last) // 2  # Divide: 범위의 절반씩 분할

    # Conquer: 재귀 함수로 각 부분 문제 정복, Combine: 정복한 부분 문제들 합산
    return  sum_of_range(first, mid) + sum_of_range(mid + 1, last)


# 테스트 코드
print(sum_of_range(1, 12))
출력 : 78
``` 






