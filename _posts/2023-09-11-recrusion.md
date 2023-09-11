---
layout: single
title:  "재귀 함수(Recursive Function)"
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
![image](https://github.com/gyun97/Baekjoon_Solution/assets/143414166/0985f553-fe59-4423-ad0b-cf0388a7ad6e)

## **재귀 함수(Recursive Function)란?**
<span style = "color:blue; font-weight:bold;">
재귀 함수는 함수 내에서 함수 자신을 다시 호출하는 함수를 의미한다.</span>재귀 함수는 <span style = "font-weight:bold;">함수 내에서 자기 자신을 호출하는 '재귀 호출(recursion)'</span>과 <span style = "font-weight:bold;">조건이 충족되면 재귀 호출이 멈추고 함수가 종료되게 하는 '기저 조건(base case)'</span>을 갖는다는 특징이 있다.
재귀 함수를 통해 반복문만 비슷한 효과를 낼 수 있다.
<br>
<br>
<span style = "font-weight:bold;">
※하위 문제: 기존의 문제를 풀기 쉽게 더 작은 문제로 쪼갠 문제이다.
</span><br>
하위 문제로 나눌 때에는 재귀 함수의 input으로 받은 파라미터의 사이즈(ex. n, x 등)을 하나 줄이는 경우가 많다.<br>
<br>
<span style = "font-weight:bold;">
※base case: 충분히 작아서 더 이상 하위 문제로 쪼갤 필요 없이 바로 답을 알 수 있는 경우로 보통 재귀 함수의 종료 조건으로 사용된다.</span><br>

<br>
<span style = "font-weight:bold;">
※recrusive case: 재귀를 이용해 하위 문제로 더 쪼개야 하는 경우</span> 


<br>
<br>
## **재귀 함수 예시**
<br>
<span style = "font-weight:bold;">
1.재귀를 이용한 카운트다운</span>
<br>
```python
def count_down(n):
    # recrusive case
    if n >= 1:
        print("카운트 다운:", n)
        count_down(n - 1)
        
    # base case = n < 1    

#테스트 코드
count_down(6)

출력 결과:
카운트 다운: 6
카운트 다운: 5
카운트 다운: 4
카운트 다운: 3
카운트 다운: 2
카운트 다운: 1
```
count_down이라는 함수에서는 인풋인 n이 1 이상이면 "카운트 다운: n"이라는 문구가 출력되고 count_down(n-1)이라는 재귀 호출로 인하여 n이 1 더 작은 인풋을 파라미터로 갖는 count_down 함수가 실행되어 n이 1씩 줄어들면서 카운트 다운 문구가 n이 1일 때까지 반복하여 출력된다.<br> 이후 n이 0까지 도달하면 recrusive case 조건문을 만족 못 하기에 print문이 실행되지는 못 하며 재귀호출도 중단되어 count_down(0) 함수가 시작된 count_down(1)로 다시 거슬러 올라가서 종료되고(다만 이미 모든 코드가 실행되었기 때문에 변화 없이 종료) count_down(1)도 자신이 호출된 count_down(2) 함수로 돌아가 종료되는 식으로 최초의 함수까지 거슬러 올라가는 식으로 하나 하나 종료된다.   
<br>
<br>
<span style = "font-weight:bold;">
2.재귀를 이용한 팩토리얼(!)</span>
```python
def factorial(n):

    # base case: n이 0 또는 1인 경우, 바로 결과가 1이기 때문에 1을 반환하고 종료
    if n <= 1:
        return 1

    # recrusive case
    else:
        # 재귀 호출: n! = n * (n-1)!
        return n * factorial(n - 1)

# 테스트 코드
print(factorial(5))
출력 결과: 120
```
예시로 factorial(5)의 경우를 살펴보자.<br>
n이 1보다 크기 때문에 recrusive case 조건을 만족하여 5 * factorial(4)가 실행되는데 facotiral(4)의 값을 알기 위해 프로그램은 facotiral(4)를 풀다가 마지막 코드로 인해 facotiral(3)을 풀게 되고 facotiral(2), facotiral(1)까지 가는데 facotiral(1)에서는 base case로 1이 리턴되어 반대로 거슬러 올라가면서 n * factorial(n-1) 부분의 식이 반복하여 완성되는 식으로 종국에는 factorial(5)의 값이 120인 리턴된다. 
<br>
<br>
<br>
<span style = "font-weight:bold;">
3.재귀를 이용한 리스트 뒤집기</span>
```python
def list_reversing(my_list):

    # base case
    if len(my_list) <= 1:  # 리스트 원소 수 1개 이하이면 뒤집을 필요 X
        return my_list

    # recrusive case
    return my_list[-1:] + list_reversing(my_list[:-1])  # 맨 뒤의 원소 하나씩 저장하여 순서 뒤집기

# 테스트 코드
my_list = [1,2,3,4,5]
print(list_reversing(my_list))
출력 결과: [5, 4, 3, 2, 1]
```
원소의 개수가 1개 이하이면 뒤집어도 어차피 결과는 똑같고 2개 이상인 경우부터 recrusive case 조건을 만족하는데 기존의 맨 뒤에 있는 원소들(my_list[-1:])은 저장하고 리스트의 나머지 원소들을 재귀 호출(list_reversing(my_list[:-1]))을 이용하는 식으로 원소들을 뒤에서부터 하나씩 이어붙이는 형식으로 리스트를 뒤집는 코드이다.
<br>
<br>
<br>
## **재귀 함수 주의점 스택 오버플로우(Stack overflow)**
재귀적으로 구현된 모든 함수는 반복문으로 바꿀 수 있고 반복문으로 구현된 모든 함수 또한 재귀 함수로 바꿔 구현할 수 있다. 다만 반복문과 달리 재귀 함수에서는 주의해야 할 점이 하나 존재하는데 바로 '<span style = "font-weight:bold;">스택 오버플로우(stack overflow)'이다.</span><br>
<span style = "color:blue; font-weight:bold;">
스택 오버플로우(Stack Overflow)는 컴퓨터 프로그램에서 주로 재귀 함수를 사용할 때 나타나는 오류 중 하나로, 스택 메모리의 한계를 초과하여 발생하는 오류이다.</span><br> 예시를 통해 살펴보자.
```python
def introduce_myself(name, age):
    print(f"Hi, my name is {name} and my age is {age}. Nice to meet you!")

my_name = "John Smith"
my_age = 19

introduce_myself(my_name, my_age)
```
해당 예시 코드에서는 my_name과 my_age라는 변수를 정의한 후에 재귀 호출(introduce_myself(my_name, my_age))을 통해 함수 자신을 호출하여 print문을 실행하고 함수 실행이 종료된다. 함수 실행이 끝나면 프로그램은 다음 줄이 아니라 함수가 호출된 부분(introduce_myself(my_name, my_age))으로 복귀하기 때문에 컴퓨터는 함수가 호출된 위치를 기억하기 위해 호출 위치(stack frame)를 콜 스택(call stack)이라는 메모리에 저장하는데 반복되는 재귀 호출로 인하여 함수가 종료되지 않고 함수 호출 위치가 콜 스택에 쌓이다가 콜 스택이 꽉 찼는데도 더 많은 콜 스택의 저장 공간이 필요로 하면 스택 오버플로우 에러가 발생하는 원리이다.<br>(파이썬에서는 콜 스택에 저장되는 함수 호출 위치를 1000개 미만으로 제한하여 스택 오버플로우를 방지한다. 1000개 이상일 시 recrusion error가 발생한다)
<br>
<br>
<br>
![image](https://github.com/gyun97/Baekjoon_Solution/assets/143414166/03c91f31-530a-4028-b226-206b3e635b8b)
<br>
<br>
## **재귀 함수의 의의**
그렇다면 왜 쉽고 스택 오버플로우 에러를 걱정하지 않아도 되는 반복문을 냅두고 재귀 함수를 사용하는 것일까?<br>
프로그래밍을 할 때에는 반복문 대신 재귀 함수로 코드를 짜는 것이 훨씬 더 간단하고 깔끔한 경우도 존재한다. 또한 재귀 함수 사용을 통해 자주 사용되는 알고리즘 패러다임인 Divide and Conquer을 비롯하여 여러 문제 해결 방식과 새로운 사고 방식을 구현하는 데 있어 더 익숙해지고 능숙해질 수 있다는 의의가 존재한다. 