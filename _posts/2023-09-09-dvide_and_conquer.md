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
![image](https://github.com/gyun97/Baekjoon_Solution/assets/143414166/75cc2769-7184-4ab1-9edb-a9df633663a8)
※Divide and Conquer 포스팅 정독 전에 재귀 함수에 대해 잘 모르거나 익숙하지 않은 분들은 <a href="https://gyun97.github.io/algorithm/recrusion/">재귀 함수</a>에 대해 보고 오시는 것을 권장합니다.


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
<br>
## **Divide and Conquer 종류**
### **1. 합병 정렬(Merge Sort)**
<span style = "color:blue; font-weight:bold;">
합병 정렬(Merge Sort)은 분할 정복(Divide and Conquer) 알고리즘의 일종으로, 대규모 데이터 집합을 작은 부분으로 분할하고 이를 정렬(정복)한 다음 병합하여 전체 데이터를 정렬(정복)하는 정렬 알고리즘 중 하나이다.</span><br>
<br>
<span style ="font-weight:bold;">
분할(Divide)</span>: 정렬할 배열을 두 개의 작은 배열로 분할한다. 배열을 반으로 나누는 방법은 임의의 중간 지점을 선택하거나 배열의 크기를 기준으로 나누는 것이다.<br>
<br>
<span style ="font-weight:bold;">
정복(Conquer)</span>: 분할된 두 개의 작은 배열에 대해 재귀적으로 병합 정렬을 호출한다. 작은 배열은 더 이상 나눌 수 없을 때까지 계속 분할 및 정렬된다. 이 과정에서 기저 조건(작은 배열의 크기가 1 이하)이 적용된다.<br>
<br>
<span style ="font-weight:bold;">
병합(Combine)</span>: 정렬된 작은 배열을 병합하여 하나의 큰 정렬된 배열로 만든다. 이때 두 개의 작은 배열을 비교하면서 순서대로 합치는데, 작은 값을 선택하여 결과 배열에 추가한다. 이 과정을 두 작은 배열 중 하나가 완전히 사용될 때까지 반복한다.<br>
<br>
<img width="662" alt="image" src="https://github.com/gyun97/Baekjoon_Solution/assets/143414166/d000150d-368b-4194-a646-fc74d5dc430c"><br>
예시로 위와 같이 정렬되지 않은 리스트([10,7,23,19,4,15,38,2])가 존재한다고 해보자.
<br>
<br>
<img width="661" alt="image" src="https://github.com/gyun97/Baekjoon_Solution/assets/143414166/cfdb4f67-e9b4-401e-a846-94e63ef1a484"><br>
리스트를 반으로 나누었지만 아직 충분히 작지 않아 기저 조건이 충족될 때까지(배열의 크기가 1 이하) 또 다시 재귀를 통해 분할(divide)한다.
<br>
<br>
<img width="661" alt="image" src="https://github.com/gyun97/Baekjoon_Solution/assets/143414166/c8727c07-9468-4d1f-b180-e3ff2bdc8fa6">
<br>
<br>
<img width="661" alt="image" src="https://github.com/gyun97/Baekjoon_Solution/assets/143414166/e5d4ee9b-bfb3-4670-95c8-218e5889b7d7">
계속 분할하다 보면 리스트의 요소가 1개밖에 안 남게 되는데 요소가 1개인 리스트는 요소가 1개이기 때문에 자연스럽게 정렬되어 정복(conqer)이 완료되었다고 볼 수 있다.<br> 
<br>
<img width="700" alt="image" src="https://github.com/gyun97/Baekjoon_Solution/assets/143414166/0f8c98b0-3c53-414d-ade2-cfb510d82181">
정렬이 완료된 요소가 1개인 리스트 2개([10], [7])를 각 리스트의 요소를 비교하면서 크기가 작은 순서를 기준으로 1개씩 배치하여 합병(merge)시켜 정렬 완료한다.
<br>
<br>
<img width="700" alt="image" src="https://github.com/gyun97/Baekjoon_Solution/assets/143414166/73698998-67ef-4b9b-9727-779a8f946727">
똑같은 과정을 반복하여 분할한다.
<br>
<br>
<img width="700" alt="image" src="https://github.com/gyun97/Baekjoon_Solution/assets/143414166/3c0c0ee1-bfd4-4439-8db4-768aa54d437e">
요소가 1개인 리스트 2개([23],[19])를 똑같은 과정을 반복하여 크기가 작은 순대로 하나씩 배치하여 합병한다.
<br>
<br>
<img width="700" alt="image" src="https://github.com/gyun97/Baekjoon_Solution/assets/143414166/52f81bbd-31c8-48a9-ab0e-9dbd0239f048">
이제 요소가 2개인 두 리스트([7,10],[19,23])를 차례로 각 요소를 비교하면서 작은 숫자 순서대로 하나씩 배치하면서 합병 및 정렬한다.<br>(각 리스트의 첫 번째 수인 7과 19 중에 7이 더 작아 7를 맨 앞에 배치하고 그 다음 수인 10과 19를 비교해도 10이 더 작아 10을 두 번째 배치하고 이제 나머지 요소들을 그 뒤에 배치하는 식으로 정렬과 합병이 이루어진다)  
<br>
<br>
<img width="700" alt="image" src="https://github.com/gyun97/Baekjoon_Solution/assets/143414166/68821b09-7f62-4b3d-a0ed-cf2ce0482dfe">
반대편 리스트([4,15,38,2])도 위와 똑같이 분할, 정복, 합병 과정을 거쳐 정렬시키면 된다.
<br>
<br>
<img width="700" alt="image" src="https://github.com/gyun97/Baekjoon_Solution/assets/143414166/13fdea38-4f23-46c0-91bf-aca796251554">
기존의 리스트를 절반으로 나눈 두 리스트([7,10,19,23],[2,4,15,38])를 각 리스트에서 요소를 하나씩 꺼내가면서 차례로 비교하여 둘 중 더 작은 수를 결과 리스트에 배치하는 식으로 두 리스트를 합병한다.
<br> 
<br>
위의 설명을 파이썬 코드로 나타내면 다음과 같다.
```python
def merge_sort(arr):

    # base case
    if len(arr) <= 1: # 기저 조건: 리스트 요소가 1개 이하이므로 저절로 정렬 완료
        return arr
    
    # recrusive case
    # 배열을 반으로 나누기
    mid = len(arr) // 2
    left_half = arr[:mid]
    right_half = arr[mid:]

    # 왼쪽과 오른쪽 부분을 재귀적으로 정렬
    left_half = merge_sort(left_half)
    right_half = merge_sort(right_half)

    # 두 부분을 병합
    return merge(left_half, right_half)



def merge(left, right):
    result = []
    i = j = 0

    # 왼쪽과 오른쪽 배열을 비교하며 병합
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # 병합하고도 남아 있는 요소들을 결과 리스트에 추가
    result.extend(left[i:])
    result.extend(right[j:])

    return result

# 테스트 코드
arr = [10, 7, 23, 19, 4, 15, 38, 2]
print(merge_sort(arr))
출력 결과: [2, 4, 7, 10, 15, 19, 23, 38]
```
<br>
<br>
### **1. 퀵 정렬(Quick Sort)**