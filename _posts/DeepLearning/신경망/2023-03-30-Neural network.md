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

##### 추가
> 1. 3층 네트워크를 표현할 때 XOR은 뭐냐라고 질문을 받았었는데 XOR 게이트 같은 경우 곡선을 사용하기 때문에 이 부분은 비선형 영역이다.
> 2. 하지만 XOR 게이트는 선형 함수로만 구성되어 있으며 이는 위와 같이 은닉층이 없는 네트워크로 표현할 수 있다. -> 층을 아무리 깊게 쌓아도 변화가 크게 없다.
> 4. 또한 퍼셉트론과 신경망의 차이는 퍼셉트론은 가중치 값을 적절하게 정하는 작업을 여전히 사람이 해야된다.
> 5. 이런 가중치 매개변수의 적절한 값을 데이터로부터 자동으로 학습하게 한 것이 신경망이다.
> 6. 그러기 위해서는 선형 함수가 아닌 비선형 함수가 필요하다.
> 7. 그리고 ReLU는 선으로 보여서 그런지 ReLU는 뭐냐고 물었는데
> 8. ReLU는 ***비선형 함수*** 며 이는 비선형 함수는 직선 1개로는 그릴 수 없는 함수를 말한다.


###### Why is Multi-layer Perceptron useless to use linear function for hidden layers?
Multi-layer Perceptrons (MLPs) are designed to learn complex non-linear relationships between inputs and outputs. The key to their success is the ability to model non-linear transformations through the use of non-linear activation functions in the hidden layers.

If a linear activation function is used in the hidden layers, then the output of the MLP will also be linear. This is because a linear combination of linear functions is still a linear function. Therefore, using a linear activation function in the hidden layers of an MLP essentially reduces the network to a single-layer perceptron, which can only model linear relationships between inputs and outputs.

This limitation of MLPs with linear activation functions in the hidden layers can be seen mathematically as well. A linear activation function such as the identity function (f(x) = x) would result in a linear combination of the input features, which could be expressed as a matrix multiplication. In this case, the MLP would essentially be a linear regression model, which is not capable of modeling complex non-linear relationships.

Therefore, to make the most of the MLP's ability to model complex non-linear relationships, it is necessary to use non-linear activation functions in the hidden layers. Examples of popular non-linear activation functions include the sigmoid function, the hyperbolic tangent function, and the Rectified Linear Unit (ReLU) function.

> - 숨겨진 계층에서 선형 활성화 함수를 사용하면 MLP의출력도 선형이 된다.
> - 왜냐하면 선형 함수의 선형 조합은 여전히 선형 함수이기 때문이다.
> - 따라서 히든 레이어에서 선형활성화 함수를 사용하면 하나의 단층 퍼셉트론으로 축소시키게 되며 이는 입력과 출력 사이의 선형 관계만을 모델링할 수 있는 선형 회귀모델로 제한된다.


##### 퍼셉트론과 신경망의차이는? 
신경망과 퍼셉트론은 모두 인공지능 분야에서 사용되는 기계학습 알고리즘 중 하나다. 하지만 이 둘은 다르게 동작하며, 구조와 기능 측면에서 차이가 있다.

###### 퍼셉트론

1. 퍼셉트론은 하나의 층(layer)으로 구성된 간단한 신경망 알고리즘이다. 
2. 퍼셉트론은 하나의 입력층과 하나의 출력층으로 구성되며, 입력층과 출력층 사이에는 가중치(weight)와 바이어스(bias)가 있다. 
3. 퍼셉트론은 이러한 가중치와 바이어스를 조정하여 입력 값과 원하는 출력 값을 매핑할 수 있다. 
4. 하지만 퍼셉트론은 하나의 층에서만 작동하기 때문에 비교적 단순한 문제만을 해결할 수 있습니다.

###### 신경망

1. 반면, 신경망은 여러 개의 층으로 구성된 더 복잡한 인공신경망 구조다. 
2. 신경망은 입력층, 출력층, 그리고 중간에 여러 개의 숨겨진(hidden) 층이 있다. 
3. 각 층은 여러 개의 노드(node)로 구성되며, 노드 간의 연결은 가중치와 바이어스로 표현된다. 
4. 신경망은 이러한 가중치와 바이어스를 조정하여 입력 값과 원하는 출력 값을 매핑할 수 있다. 
5. 신경망은 다양한 유형과 구조의 층을 사용하여 복잡한 문제를 해결할 수 있다.

요약하면, 퍼셉트론은 단층으로 구성된 간단한 신경망 알고리즘이며, 신경망은 여러 층으로 구성된 복잡한 인공신경망 구조입니다.

##### 그럼 다층 퍼셉트론과 신경망의 차이는?

다층 퍼셉트론(Multi-layer Perceptron, MLP)과 신경망(Deep Neural Network, DNN)은 모두 다층으로 구성된 인공신경망 구조입니다. 그러나 이 둘은 구조와 기능적인 면에서 차이가 있습니다.

###### 다층 퍼셉트론

1. MLP는 입력층, 숨겨진 층(hidden layer), 출력층으로 구성되며, 숨겨진 층에는 여러 개의 뉴런이 포함된다. 이러한 뉴런은 입력층에서 들어오는 신호에 대해 가중치를 적용하고, 비선형 함수인 활성화 함수를 거쳐 출력값을 계산한다. 
2. MLP는 숨겨진 층이 한 개 이상이기 때문에, 더 복잡한 비선형 함수를 모델링할 수 있다.


###### 신경망

1. DNN은 MLP와 같은 구조를 가지지만, 더 많은 층과 복잡한 구조를 가진다. DNN은 Convolutional Neural Network(CNN), Recurrent Neural Network(RNN), Long Short-Term Memory(LSTM) 등 다양한 유형의 층을 포함할 수 있으며, 이러한 다양한 층을 결합하여 복잡한 문제를 해결한다.
2. 따라서, MLP는 MLP에서 숨겨진 층이 하나 이상인 간단한 형태의 신경망이며, DNN은 MLP와 같은 다층 구조를 가지고 있지만, 보다 복잡한 구조와 다양한 유형의 층을 가진 인공신경망 구조다.

##### 다층 퍼셉트론에서 활성화 함수를 선형함수만 쓰는 이유는?

***다층 퍼셉트론에서는 활성화 함수로 선형 함수를 사용하는 것이 큰 의미가 없다***. 
이는 다층 퍼셉트론에서 선형 함수를 사용할 경우, 여러 층을 쌓아도 결국 하나의 선형 함수가 되어버리기 때문이다.

예를 들어, 두 개의 숨겨진 층이 있는 다층 퍼셉트론에서 모든 층의 활성화 함수가 선형 함수인 경우, 다음과 같이 나타낼 수 있다.

	y = W3(W2(W1x + b1) + b2) + b3

위 식에서 W1, W2, W3은 가중치, b1, b2, b3은 편향을 나타냅니다. 이 식은 결국 입력 x에 대한 선형 함수가 되기 때문에, 다층 구조를 가진 이유가 없어진다.

따라서, 다층 퍼셉트론에서는 비선형 함수인 활성화 함수를 사용하여 모델의 복잡성을 높이고, 더 다양한 패턴을 모델링할 수 있도록 한다. 
예를 들어, 시그모이드 함수, 하이퍼볼릭 탄젠트 함수, 렐루(Rectified Linear Unit, ReLU) 함수 등의 비선형 함수를 활성화 함수로 사용할 수 있다.

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

출처 : https://www.baeldung.com/cs/mlp-vs-dnn