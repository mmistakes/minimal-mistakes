---
layout: single
title:  "알고리즘 평가의 기준: 시간 복잡도(Time Complexity)와 공간 복잡도(Space Complexity)"
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
![image](https://github.com/gyun97/Baekjoon_Solution/assets/143414166/9aebf320-78ef-4075-a32c-dee1e741c88e)

<br>
<br>
알고리즘을 구상하고 평가할 때 우리가 고려해야 할 사항은 앞서 잠깐 언급했듯이 '시간과 공간'이다.<br>
이번 포스팅에서는 그 중 알고리즘의 가장 중요한 시간과 관련된 평가 기준인 시간 복잡도에 대해 이야기할 것이다.   
 
## **시간 복잡도(Time Complexity)란?**
<span style = "color:blue; font-weight:bold;">
시간복잡도는 알고리즘의 성능과 관련하여 데이터가 많아질수록 해당 알고리즘의 소요 시간이 얼마나 급격히 증가하는가를 점근 표기법(Big-O)로 나타낸 것이다.</span>
시간적인 측면에서 가장 이상적인 알고리즘은 특정 문제를 해결하거나 서비스를 제공하는 데에 있어 돌아가는 시간이 가장 짧은 프로그램이다.<br>
그렇다면 왜 단순히 프로그램이 돌아가는 시간을 측정하여 알고리즘을 평가하지 않고 어렵고 복잡하게 시간 복잡도를 사용하여 알고리즘을 평가하는 것일까??<br>
그 이유는 프로그램이 돌아가는 시간은 컴퓨터의 사양, 인터넷 환경과 프로그래밍 언어의 속도 등 매우 다양한 외부 환경 요인의 영향을 받기 때문에 프로그램이 돌아가는 시간으로 알고리즘을 평가하는 것은 비합리적이다. 이러한 이유로 컴퓨터 과학에서는 알고리즘의 평가 척도로 시간 복잡도를 이용하는 것이다.<br>
<span style = "font-weight:bold;">
알고리즘의 시간 복잡도를 계산해서 시간 복잡도가 더 작을수록(입력 데이터의 개수가 동일하고 똑같은 환경이라고 가정했을 때 알고리즘 실행 속도가 더 빠를수록) 더 좋은 알고리즘이라고 평가할 수 있다.
</span>   

## **점근표기법(Big-O)**
<span style = "color:blue; font-weight:bold;">
점근 표기법(asymptotic notation)은 알고리즘의 시간 복잡도(실행 시간)과 공간 복잡도(차지하는 메모리 공간)를 분석하고 비교하기 위해 사용되는 수학적 표기법이다</span><br>
알고리즘은 입력 데이터의 크기에 따라 소요되는 시간이 달라지는 것이 일반적이다. 입력 데이터가 크면 클수록 알고리즘의 실행 시간은 더 길어진다. 하지만 앞서 말했듯이 실행 시간은 외부의 환경에 지대한 영향을 받기 때문에 입력 데이터의 크기에 따른 실행 시간을 수식으로 나타내봤자 수식은 그 때의 환경에 따라 매우 유동적일 것이기 때문에 1개의 수식으로는 알고리즘을 제대로 평가하는 것은 불가능하다.
이러한 문제를 해결하기 위해 컴퓨터 과학에서 알고리즘의 실행 속도를 나타내기 위해 공통적으로 사용하는 것이 바로 점근표기법이다.<br>
점근 표기법에서는 다음과 같은 3가지의 종류가 존재한다.
<br>
<span style = "color:blue; font-weight:bold;">     
1) 빅오 표기법 (Big-O): 알고리즘의 최악 실행 시간 표현
<br>      
2) 오메가 표기법 (Big-Ω): 알고리즘의 최선 실행 시간 표현
<br>  
3) 세타 표기법 (Big-θ):  알고리즘의 평균 실행 시간 표현
<br>
</span><br>
<span style = "font-weight:bold;">
3가지의 점근 표기법 중에 시간 복잡도에 가장 일반적으로 사용되는 것은 빅-오 표기법이다.</span> 다른 표기법들에 비해 상대적으로 시간 복잡도를 구하기가 수월하고 알고리즘의 최악 실행 시간을 상한으로 나타내므로 알고리즘의 성능의 불확실성을 최대한 고려하여 평가할 수 있어 실제 상황에서 해당 알고리즘이 얼마나 나쁠 수 있는지를 파악하여 개선 여부를 판단할 수 있어 가장 실용적이다.<br>
따라서 점근 표기법은 빅오 표기법을 중심으로 설명할 예정이다.

## **점근표기법(Big-O)에서의 n의 의미**
[빅오 표기법 예시]
```python
O(n)
O(n^2)
...
```

일반적으로 점근표기법에서 많이 사용되는 n은 무슨 의미를 가지고 있을까?<span style = "font-weight:bold;"> n은 점근 표기법에서 입력 데이터(인풋)의 크기를 나타내기 위해 일반적으로 쓰이는 문자이다.</span> x,i 같은 다른 문자를 써도 무방하겠지만 보통의 경우에는 암묵적으로 n을 사용하는 것이 일반적이다.
다만 간혹 트리와 그래프처럼 입력 데이터가 선형적이지 않은 경우 n이 아니라 V(꼭짓점의 개수)나 E(변의 개수) 같은 다른 뜻을 지니는 문자를 사용하기도 한다.<br><span style = "font-weight:bold;">
점근 표기법에서의 중점은 n(입력 데이터 크기)가 충분히 크다고 가정하는 것이다.</span> n이 작으면 어차피 좋은 알고리즘이든 나쁜 알고리즘이든 입력 데이터가 작기 때문에 실행 속도에 있어서 극히 드문 차이를 보여준다. 하지만 n이 커지면 커질수록 실행 속도에 있어 기하급수적인 차이를 보여주기 때문에 점근 표기법으로 해당 알고리즘의 성능을 잘 따져보는 것이 매우 중요하다.   


## **빅오 표기법 특징**

<span style = "font-weight:bold;"> 1) 최고차항을 제외한 나머지 항들은 전부 무시한다:</span><br> 
앞서 이미 n이 충분히 크다고 가정되어 있는 상태에서 최고차항은 하위 항들에 비해 기하급수적으로 증가하여 무한대를 향해 급격하게 증가하는 것에 비해 상수항을 포함한 다른 항들은 최고차항보다 훨씬 느리게 증가하기 때문에 n이 커지면 커질수록 격차가 너무 크게 차이 나게 되어 최고차항을 제외한 항들은 영향력이 거의 없다시피 하게 되기 때문에 빅오 표기법에서는 나머지 항들은 무시하고 최고차항만을 이용하여 표기한다. <br>
<br>
<span style = "font-weight:bold;">2) 최고차항에서도 계수는 무시한다:</span><br> 
최고차항에서도 계수를 제외한 최고차항의 차수와 문자(n)만을 사용한다. 결국 해당 수식의 성장성이 중요한 것인데 다른 항들을 제외한 이유와 마찬가지로 계수는 일정한 비율로 기하급수적으로 증가하는 최고차항의 계수와 달리 큰 의미를 가지지 않기 때문에 제외시킨다.<br>
위의 특징을 적용시킨 빅오 표기법의 예시이다.<br>  
```python
<소요 시간 수식>     <Big-O>
    18n+12            n
    5n^2+30          n^2
    9n^3+90          n^3 
```

## **빅오 표기법 종류**
<span style = "color:blue; font-weight:bold;">
1) O(1): 입력 데이터의 크기에 영향을 받지 않는다.
<br></span>
 -입력 데이터의 크기가 100, 200, 10000.. 무엇이든 소요 시간 변함 없다.
<br>
<br>
<span style = "color:blue; font-weight:bold;">
2) O(log n): : 입력 크기의 로그에 비례하는 실행 시간을 갖는다.<br></span>
-입력 데이터의 크기가 n배 증가하면 소요 시간이 log n배 증가한다.<br>
<br>
<span style = "color:blue; font-weight:bold;">
3) O(n): 입력 크기와 선형으로 비례하는 실행 시간을 갖는다.</span><br> 
 -입력 데이터의 크기가 n배 증가하면 소요 시간이 n배 증가한다.<br>
<br>
<span style = "color:blue; font-weight:bold;">
4) O(n log n): 입력 크기와 로그에 비례하는 실행 시간을 갖는다.</span><br>
-입력 데이터의 크기가 n배 증가하면 소요 시간이 n log n배 증가한다.<br>
<br>
<span style = "color:blue; font-weight:bold;">
5) O(n^2): 입력 크기의 제곱에 비례하는 실행 시간을 갖는다.</span><br>
 -입력 데이터의 크기가 n배 증가하면 소요 시간이 n^2배 증가한다.<br>
<br>
<span style = "color:blue; font-weight:bold;">
6) O(n^3): 입력 크기의 세제곱에 비례하는 실행 시간을 갖는다.</span><br>
 -입력 데이터의 크기가 n배 증가하면 소요 시간이 n^3배 증가한다.<br>
<br>
<span style = "color:blue; font-weight:bold;">
7) O(2^n): 입력 크기에 대해 2의 지수로 비례하는 실행 시간을 갖는다.<br></span>
-입력 데이터의 크기가 n배 증가하면 소요 시간이 2^n배 증가한다.<br>
<br>
<span style = "color:blue; font-weight:bold;">
8) O(n!): 입력 크기의 팩토리얼에 비례하는 실행 시간을 갖는다.<br></span>
-입력 데이터의 크기가 n배 증가하면 소요 시간이 n!배 증가한다.<br>
<br>

-이 중에서 많이 사용되는 시간 복잡도는 O(1), O(log n), O(n), O(n log n),O(n^2), O(n^3) 정도이다. 
 <br>
 <br>
![image](https://github.com/gyun97/Baekjoon_Solution/assets/143414166/ba1c5f92-36e7-483e-948e-f9314b3a4bfb)    
<span style = "font-size:12px;">
(출처: http://bigocheatsheet.com/)


## **선형 탐색과 이진 탐색을 이용한 시간 복잡도 계산 예시**


앞에서 공부한 선형 탐색과 이진 탐색을 이용하여 시간 복잡도를 어떻게 계산하는지 예시를 들어보겠다.
<br>
<br>
```python
<선형 검색>

def linear_search_algorithm(target_element, my_list):
    for element in range(len(my_list)):   # O(n): n은 리스트의 길이   
        if my_list[element] == target_element: # O(1): 단일 요소 비교
            return element  # O(1): 단일 요소를 찾았으므로 바로 반환
    return None   # O(1): 모든 요소를 검색하고 찾지 못한 경우 None 반환

시간 복잡도 = O(n) + O(1) + O(1) + O(1) = O(n) + 3*O(1)           
           = O(n) (최고차항 제외 제거)
```
<br>
```python
<이진 검색>

def binary_search_algorithm(target_element, my_list):
    first_index = 0  # O(1): 상수 시간
    last_index = len(my_list) - 1  # O(1): 상수 시간

    while first_index <= last_index:  # O(lg n): O(1) * 반복 회수 lg n
        middle = (first_index + last_index) // 2  # O(1), 상수 시간
        if my_list[middle] == target_element:  # O(1), 상수 시간  
            return middle
        elif my_list[middle] > target_element:  # O(1), 상수 시간
            last_index = middle - 1
        else:              
             first_index = middle + 1  # O(1), 상수 시간  
    return None  # O(1), 상수 시간   

시간 복잡도 = O lg(n) (최고차항 제외 제거, log는 이진 로그(밑이 2)인 경우 lg로 표현 가능)
```

## **공간 복잡도(Space Complexity)란?**
<span style = "color:blue; font-weight:bold;">
공간 복잡도는 알고리즘의 성능과 관련하여 데이터가 많아질수록 해당 알고리즘이 차지하는 메모리 공간이 얼마나 급격히 증가하는가를 점근 표기법(Big-O)로 나타낸 것이다.</span><br>
<span style = "font-weight: bold;">다만 현재는 컴퓨터의 발달로 메모리 공간은 여유가 있는 경우가 많 은 데다가 시간과 공간은 반비례하는 경향이 있어 일반적으로 해당 알고리즘이 사용하는 메모리 공간보다 알고리즘의 실행속도를 더 중요하게 여기기 때문에 시간 복잡도가 공간 복잡도보다 훨씬 더 중요하다.</span><br>공간 복잡도는 간단한 코드 예시를 통해 간략하게 설명하겠다.
<br>
<br>
```python
<O(1): 고정된 양의 메모리를 사용하는 경우>

def add(a, b):
    result = a + b  # 추가 메모리를 사용하지 않고 입력과 결과를 계산
    return result
```
<br>
```python
<O(n):  입력 크기에 비례하여 추가 메모리를 사용>

def copy_list(input_list):
    new_list = []  # 입력 리스트와 동일한 크기의 새로운 리스트 생성 (O(n) 공간 사용)
    
    for item in input_list:
        new_list.append(item)  # 입력 리스트의 요소를 새로운 리스트에 복사
    
    return new_list
```
<br>
```python
<O(n^2): 입력 크기의 제곱에 비례하여 추가 메모리를 사용>

def create_square_matrix(n):
    matrix = []
    for i in range(n):
        row = []
        for j in range(n):
            row.append(0)  # 이차원 배열의 모든 요소를 0으로 초기화
        matrix.append(row)

    return matrix
``` 

