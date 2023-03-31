---
layout: single
title: "신경망 구현해보기!"
categories: ML_DL
tag: [Python,시그모이드 sigmoid function,계단함수 step function,ReLU,소프트맥스 함수 softmax function]
toc: true
toc_sticky: true
author_profile: false

---
# 퍼셉트론에서 신경망으로?

- 퍼셉트론과 신경망은 공통점이 많다.
- 하지만 신경망과 퍼셉트론은 다르다.
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

> 그렇다면 활성화 함수는 뭐가 있고 뭐가 다를까?

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
> 퍼셉트론에서는 활성화 함수로 이 계단 함수를 사용한다.



### 시그모이드 함수
```python
def sigmoid(x):
    return 1/ (1+np.exp(-x))
```
- 이렇게 함수를 생성하면 넘파이 배열을 연산하는게 가능하다. 왜냐하면 넘파이의 브로드캐스트 덕분이다.
	- 브로드캐스트 기능이란 넘파이 배열과 스칼라 값의 연산을 넘파이의 배열의 원소 각각과 스칼라값의 연산으로 바꿔 수행하는 것
![](https://i.imgur.com/S2tREPj.png)


### 시그모이드 함수와 계단 함수 비교
![](https://i.imgur.com/9sl9zSJ.png)
- 점선은 계단함수
- 실선은 시그모이드 함수
- 
#### 차이점은?
>1. 계단 함수에서는 0에서 1로 출력이 갑자기 바뀌지만 시그모이드에서는 입력에 따라 출력이 연속적으로 변한다.
>2. 퍼셉트론에서는 뉴런 사이에 0, 1만 흘렀지만 신경망에서는 연속적인 실수가 흐른다.

- 
#### 신경망에서 활성화 함수로 비선형 함수를 사용하는 이유
>1. 선형 함수를 이용하면 신경망의 층을 깊게 하는 의미가 없어짐
>2. 선형 함수의 또 다른 문제는 층을 아무리 깊게 만들어도 은닉층이 없는 네트워크로도 똑같은 기능이 가능함
>3. 예를 들어 3층 네트워크를 만든다고 가정할 때
>4. 활성화 함수 -> h(x) = cx
>5. 3층 네트워크 -> y(x) = h(h(h(x))) -> y(x) = ax 와 같음 왜냐하면 a = c^3 
>6. 즉 선형 함수는 은닉층이 없음
>7. 따라서 반드시 비선형 함수를 사용해야함

### ReLU 함수
- 요즘에는 시그모이드보다는 ReLU 함수를 주로 쓴다.
- 왜냐하면 여로모로 성능이 시그모이드보다 좋다.
- 
![](https://i.imgur.com/5tnlkVZ.png)
- 수식
- 
![](https://i.imgur.com/KAnhvgz.png)
- 파이썬 코드로 구현
- 
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

```python
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
- B는 2차원 배열이고 3행 2열인 행렬이다.
### 행렬의 곱

![](https://i.imgur.com/IAKE0ic.png)

#### 2x2 행렬과 2x2 행렬의 곱
![](https://i.imgur.com/aZVeD59.png)
>1. 행렬 A와 B의 곱은 np.dot으로 계산한다.
>2. 참고로 행렬의 곱은 곱하는 순서에 따라 값이 달라진다.
>3. @, * , np.dot 모두 행렬의 곱에 사용할 수 있지만 결과 값이 달라지니 주의.

#### 2x3 행렬과 3x2 행렬의 곱
![](https://i.imgur.com/Y6XInAA.png)
>행렬의 곱은 행렬의 형상에 주의해야한다.

#### 행렬의 형상이 다른 경우의 곱
![](https://i.imgur.com/8xUdy9m.png)
>행렬의 형상이 다른 경우 위와 같은 오류를 출력한다.

### 행렬의 곱 -> 차원수 일치
![](https://i.imgur.com/DBDCTJd.png)

![](https://i.imgur.com/MvJaZKp.png)
- 코드 구현
- 
![](https://i.imgur.com/mFYgFug.png)

### 신경망에서의 행렬 곱 정리

![](https://i.imgur.com/MHfldU0.png)
> 1. 차원의 원소 수를 같게 만들면 Y원소가 1000개여도 한 번에 연산 가능
> 2. np.dot을 쓰지 않으면 for문으로 계산해야하는데 넘나 귀찮

## 3층 신경망 구현하기

![](https://i.imgur.com/REMGTVd.png)

```python
def init_network():
    network = {}
    network['W1'] = np.array([[0.1, 0.3, 0.5], [0.2, 0.4, 0.6]])
    network['b1'] = np.array([0.1, 0.2, 0.3])
    network['W2'] = np.array([[0.1, 0.4], [0.2, 0.5], [0.3, 0.6]])
    network['b2'] = np.array([0.1, 0.2])
    network['W3'] = np.array([[0.1, 0.3], [0.2, 0.4]])
    network['b3'] = np.array([0.1, 0.2])
    return network

def forward(network, x):
    W1, W2, W3 = network['W1'], network['W2'], network['W3']
    b1, b2, b3 = network['b1'], network['b2'], network['b3']
    a1 = np.dot(x, W1) + b1
    z1 = sigmoid(a1)
    a2 = np.dot(z1, W2) + b2
    z2 = sigmoid(a2)
    a3 = np.dot(z2, W3) + b3
    y = identity_function(a3)
    return y

network = init_network()
x = np.array([1.0, 0.5])
y = forward(network, x)

print(y) # [ 0.31682708 0.69627909]
```
>1. init_network() 와 forward() 함수 정의
>2. forward() 함수-> 입력신호를 출력으로 변환하는 처리과정을 구현
>3. forward는 순방향을 의미 -> 순전파

## 출력층 설계하기
- 신경망은 분류와 회귀 모두에 이용가능
- 일반적으로 회귀에는 항등함수 사용
- 분류에는 소프트맥스 함수를 사용
	- 분류는 말 그대로 성별 같이 뭔가를 구분지어야되는 것
	- 회귀는 입력데이터에 연속적인 수치를 예측하는 문제
	  
### 항등 함수와 소프트맥스 함수 구현하기
#### 항등함수
![](https://i.imgur.com/5t9J38p.png)
- 항등함수는 입력 그대로를 출력
	- 입력과 출력이 항상 같다는 뜻


#### 소프트맥스 함수
![](https://i.imgur.com/9ULdULr.png)
- exp(x) 는 지수함수 (e는 자연상수)
- n은 출력층의 뉴런수
- y_k는 그중 k 번째 출력
- ![](https://i.imgur.com/rhl7z04.png)

##### 코드구현
```python
def softmax(a):
    exp_a = np.exp(a) 
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a

    return y
```
>- 이 식은 맞게 썼지만 컴퓨터에서 구현할 때 메모리부분에서 구조적인 문제가 있다.
>- 밑에서 이유와 주의점을 알아보자.

#### 소프트맥스 함수 구현 시 주의점
- 간단히 이야기 하자면 데이터 저장에 대해서 할당 크기가 정해져있다.
- 컴퓨터로 표현할 수 있는 범위는 이미 한정되어 있기 때문에 오버플로우가 생길 수 있다.
- 따라서 컴퓨터에서 구현하는데 문제가 없게 식을 수정해주면 된다.
- ![](https://i.imgur.com/XvYxSnQ.png)

##### 코드 구현
```python
def softmax(a):
    c = np.max(a)
    exp_a = np.exp(a - c) # 오버플로 대책
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a

    return y
```


### 소프트맥스 함수의 특징
```python
a = np.array([0.3, 2.9, 4.0])
y = softmax(a)
print(y) -> [0.01821127, 0.24519181, 0.73659691]
print(np.sum(y)) -> 1.0
```
> - 소프트맥스 함수의 출력은 0 에서 1 사이의 실수.
> - 출력의 총합은 1 이다.
> 	- 이러한 성질 덕분에 소프트맥스 함수의 출력을 '확률'로 해석할 수 있다.

#### 주의점
>- 소프트맥스 함수를 적용해도 각 원소의 대소 관계는 변하지 않는다.
>- 왜냐하면 지수함수 y=exp(x)가 단조 증가 함수이기 때문이다.
>	- 단조 증가 함수란
>- a에서 가장 큰원소는 2번 째이고 y에서 가장 큰 원소도 2번쨰다.
>- 신경망을 이용한 분류에서는 일반적으로 가장 큰 출력을 내는 뉴러런에 해당하는 클래스로만 인식한다.
>- 또한 소프트맥스 함수를 적용해도 출력이 가장 큰 뉴런의 위치는 달라지지 않는다.
>- 결과적으로 신경망으로 분류할 때는 출력층의 소프트맥스 함수는 생략해도 된다.
>- 현업에서도 지수 함수 계산에 드는 자원 낭비를 줄이고자 출력층의 소프트맥스 함수는 생략하는 것이 일반적이다.


### 출력층의 뉴런 수 정하기
- 출력층의 뉴런수는 풀려는 문제에 맞게 적절히 정해야 한다.
- 분류에서 분류하고 싶은 클래스 수로 설정하는 것이 일반적이다.
	- 예를 들어 입력 이미지를 숫자 0부터 9중 하나로 분류하는 문제면 출력층의 10개로 설정한다.
	- ![](https://i.imgur.com/HSPZP7B.png)
- 그림처럼 출력층 뉴런은 위에서부터 차례로 숫자 0,1,2,3, ....9에 대응하며, 뉴런의 색깔 농도가 해당 뉴런의 출력 값의 크기를 의미한다.
- 여기서 색이 가장 짙은 뉴런 y_2가 가장 큰 값을 출력한다.
- 그래서 이 신경망이 선택한 클래스 y_2 즉 입력 이미지 숫자 '2'로 판단했음을 의미한다.