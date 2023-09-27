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
해당 포스팅은 코드잇의 강의를 참고하였습니다.
</span>
![image](https://github.com/gyun97/Baekjoon_Solution/assets/143414166/ca43b8c9-9d37-4d47-97c3-f3d7c2dbb50a)
## **Brute Force란?**
<span style = "color:blue; font-weight:bold;">
Brute Force 알고리즘은 어떤 문제에 대해서 가능한 모든 경우의 수를 시도하여 원하는 결과를 찾는 방법을 의미한다.</span>
<br>
<br>
## **Brute Force 단계**
<span style = "font-weight:bold;">
1) 모든 가능한 경우 생성</span>: 문제에 따라 가능한 모든 조합을 생성한다. 이 단계에서는 가능성 있는 모든 해결책을 고려한다.<br>
<span style = "font-weight:bold;">
2) 각 경우 검사</span>: 생성된 모든 경우를 하나씩 검사하여 원하는 결과를 찾을 때까지 반복한다. 각 경우를 검사하는 데 필요한 조건을 확인하고, 조건을 만족하는 경우 원하는 결과를 반환하거나 저장한다.<br>

<span style = "font-weight:bold;">
3) 결과 반환 또는 처리</span>: 원하는 결과를 찾으면 해당 결과를 반환하고 알고리즘을 종료한다. 결과를 찾지 못한 경우 루프가 종료되면 해당 결과가 없다는 것을 나타내기 위해 일반적으로 특정 값을 반환하거나 처리한다.
<br>
<br>
## **Brute Force 장단점**
알고리즘의 이름 그대로 (Brute: 야만적인, 난폭한 + force: 힘, 무력) 다른 알고리즘에 비해 매우 단순하고 직관적이고 답을 확실하게 찾을 수 있어 입력 데이터의 크기가 작으면 충분히 효율적이라는 장점이 있다.<br> 
하지만 완전탐색의 한 형태로서 가능한 모든 조합을 시도하여 원하는 결과를 찾는 방식이기 때문에 입력 데이터의 크기가 커지면 커질수록 시간 복잡도가 급증하여 매우 비효율적이라는 단점이 있다.<br>
예를 들어 컴퓨터가 사람을 상대로 바둑을 두는 프로그램을 Brute Force를 이용하여 만든다고 가정해 보자. 바둑판은 가로 19줄, 세로 19줄로 바둑칸을 둘 수 있는 위치는 모두 361곳인데 상대방이 첫 돌을 두면 프로그램이 둘 수 있는 경우의 수는 360개, 그 다음 경우의 수는 359개이고... 이런 방식으로 모든 가능한 경우의 수는 360!이라는 컴퓨터조차도 계산하기 힘든 경우의 수가 발생하기 때문에 이런 입력 데이터가 막대한 경우 Brute Force를 이용하는 것은 매우 비합리적이다. 
<br>
<br>
## **Brute Force 코드 예시**


주사위 3개를 던져 나온 세 눈금의 합이 10이 되는 경우를 Brute Force로 구해보자.

```python
# 가능한 주사위 눈금은 1부터 6까지
min_dice = 1
max_dice = 6
    
# 결과를 저장할 리스트
results = []
    
# 모든 가능한 조합을 검사
for dice1 in range(min_dice, max_dice + 1): #첫 번째 주사위 1 ~6
    for dice2 in range(min_dice, max_dice + 1):  # 두 번째 주사위 1 ~ 6
        for dice3 in range(min_dice, max_dice + 1):  # 세 번째 주사위 1~ 6
            if dice1 + dice2 + dice3 == 10:  # 세 주사위 합이 10이라면
                results.append((dice1, dice2, dice3))  # 결과에 추가  
print(results)    
```
<br>
## **Brute Force의 의의**

Brute Force는 알고리즘 패러다임 중에 가장 근본적이고 원시적인 알고리즘이라고 할 수 있다. Brute Force를 사용할 수 있는지 여부를 판단해보고 더 효율적인 알고리즘이 필요하다고 판단되면 Brute Force를 출발점으로써 이용하여 더욱 발전되고 효율적인 알고리즘을 도출하는 것이 일반적인 방법론이기 때문에 Brute Force에 대한 이해 역시 중요하다. 
