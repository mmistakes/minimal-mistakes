---
layout: single
title: "신경망 구현해보기!"
categories: ML_DL
tag: [Python,시그모이드 sigmoid,계단함수 step function,ReLU,]
toc: true
toc_sticky: true
author_profile: false

---
# 퍼셉트론에서 신경망으로?

- 퍼셉트론과 신경망은 공통점이 많다.
- 하지만 신경망과 퍼셉트론은 다른다.
- 신경망이 퍼셉트론과 다른 점을 중심으로 신경망의 구조를 알아보자.

## 신경망의 쉽게 구조 알아보기

![](https://i.imgur.com/53rczAo.png)
- 가장 왼쪽이 입력층
- 가운데가 은닉층
- 맨 오른쪽이 출력층이다.
- 왼쪽 방향에서 차례대로 0층,1층,2층이라고 부른다.
- 따라서 해당 신경망은 2층 신경망이라고 부른다. (3층 신경망이라고 부르는 경우도 있다.)

## 활성화 함수
- 이전의 퍼셉트론은 편향을 활용해 얼마나 쉽게 활성화 되는지를 제어했다.
- ![](https://i.imgur.com/wdGlRp5.png)
- 하지만 활성화 함수를 이용한다면?
- ![](https://i.imgur.com/8paKQGo.png)
- 위의 식처럼 h(x) 라는 함수를 거쳐 변환시키면 입력이 0을 넘으면 1을 돌려주고 그렇지 않으면 0을 반환한다.
- 사실상 같은 내용이다.
- 이처럼 입력 신호의 총합을 출력 신호로 변환하는 함수를 일반적으로 활성화 함수라고 한다.
- 즉 활성화 함수는 임계값을 경계로 출력이 바뀌는데 이런 함수를 계단함수라고 한다.
- 신경망과 퍼셉트론의 주된 차이는 이 활성화 함수 뿐이다.
- 
	- 퍼셉트론에서는 계단함수를 사용하고 있지만 신경망에서 이용하는 활성화 함수는 뭐가 있을까?

### 계단 함수
```python
def step_function(x):
    if x > 0:
        return 1
    else:
        return 0
```
- 입력이 0을 넘으면 1을 출력하고 그 이외에는 0을 출력하는 함수다.
- 파이썬으로 구현하면 위와 같다.
- 하지만 위의 파이썬 코드는 실수만 받아들인다.
	- 대부분 넘파이 배열을 사용하는데 어떻게 하면 적용시킬 수 있을까?
```python
def step_function(x):
    return np.array(x>0, dtype=np.intc)
```



### 시그모이드 함수 구현하기
```python
def sigmoid(x):
    return 1/ (1+np.exp(-x))
```
- 이렇게 함수를 생성해도 넘파이 배열을 연산하는게 가능하다. 왜냐하면 넘파이의 브로드캐스트 덕분이다.
	- 브로드캐스트 기능이란 넘파이 배열과 스칼락ㅄ의 연산을 넘파이의 배열의 원소 각각과 스칼라값의 연산으로 바꿔 수행하는 것
![](https://i.imgur.com/S2tREPj.png)


### 시그모이드 함수와 계단 함수 비교
![](https://i.imgur.com/9sl9zSJ.png)
- 점선은 계단함수
- 실선은 시그모이드 함수

### ReLU 함수
![](https://i.imgur.com/5tnlkVZ.png)

![](https://i.imgur.com/KAnhvgz.png)

```python
def relu(x):
    return np.maximum(0, x)
```


## 다차원 배열의 계산
- 넘파이의 다차원 배열을 사용한 계산법은 신경망을 효율적으로 구현할 수 있다.

### 다차원 배열
```python
import numpy as np
A = np.array([1,2,3,4])
print(A)
# -> [1,2,3,4]
print(np.ndim(A))
# -> 1
print(A.shape)
# -> (4,)
print(A.shpae[0])
# -> 4
```
- np.ndim() 은 배열의 차원 확인
- A.shape 의 리턴은 튜플 값이며 원소는 4개, 1차원이다.

```Python
B = np.array([[1,2],[3,4],[5,6]])
print(B)
# [[1 2]
#  [3 4]
#  [5 6]]
print(np.ndim(B))
# -> 2
print(B.shape)
# -> (3,2)

```
![](https://i.imgur.com/ygbEEZ3.png)

### 행렬의 곱

![](https://i.imgur.com/IAKE0ic.png)

![](https://i.imgur.com/aZVeD59.png)

![](https://i.imgur.com/Y6XInAA.png)

![](https://i.imgur.com/8xUdy9m.png)

![](https://i.imgur.com/DBDCTJd.png)

![](https://i.imgur.com/MvJaZKp.png)

![](https://i.imgur.com/mFYgFug.png)

### 신경망에서의 행렬 곱

![](https://i.imgur.com/MHfldU0.png)

## 3층 신경망 구현하기

![](https://i.imgur.com/REMGTVd.png)


### 표기법 설명
### 각 층의 신호 전달 구현하기
### 구현 정리

## 출력층 설계하기
### 항등 함수와 소프트맥스 함수 구현하기
### 소프트맥스 함수 구현 시 주의점
### 소프트맥스 함수의 특징
### 출력층의 뉴런 수 정하기
