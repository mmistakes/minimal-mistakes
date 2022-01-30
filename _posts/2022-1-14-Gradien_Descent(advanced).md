---
layout: single
title: "경사하강법(중급)"
categories: 머신러닝_개념
tag:
  [
    python,
    머신러닝,
    blog,
    github,
    경사하강법,
    멀티캠퍼스,
    국비지원,
    교육,
    분석,
    데이터,
    파이썬,
  ]
toc: true
sidebar:
  nav: "docs"
---

# 2. 경사하강법 (중급)

- 경사하강법, 확률적 경사하강법

* 자료 출처 : 파이썬 머신러닝 완벽가이드

```python
import numpy as np
import pandas as pd

import matplotlib.pyplot as plt
%matplotlib inline
np.random.seed(0)
```

## y = 4X + 6

Y=4X+6 모델에 실제값을 시뮬레이션하는 데이터 값 생성
(w1=4, w0=6)

```python
np.random.seed(0) # 랜덤으로 형성된 값을 고정시켜줌
np.random.rand(100,1)[0:10]
    # 0~1 표준정규분포를 가진 100행 1열 np array
```

    array([[0.5488135 ],
           [0.71518937],
           [0.60276338],
           [0.54488318],
           [0.4236548 ],
           [0.64589411],
           [0.43758721],
           [0.891773  ],
           [0.96366276],
           [0.38344152]])

```python
np.random.seed(0)
X = 2*np.random.rand(100,1)
X[0:10] # 0 ~ 2 값 표준정규분포
```

    array([[1.09762701],
           [1.43037873],
           [1.20552675],
           [1.08976637],
           [0.8473096 ],
           [1.29178823],
           [0.87517442],
           [1.783546  ],
           [1.92732552],
           [0.76688304]])

```python
# y는 랜덤으로 생성된 X값에 매칭되는 값
y = 6 + 4*X + np.random.randn(100,1) # random 값은 Noise를 위해 만듦
```

```python
# x, y 데이터 셋 scatter plot으로 시각화
plt.scatter(X,y);
```

![output_6_0](https://user-images.githubusercontent.com/67591105/149498683-5040d992-67f4-4d05-abb6-493aeaf9178b.png)

** 오차함수를 최소화 할 수 있도록 w0, w1 값을 업데이트하는 함수 생성 **

y_pred = w1\*x + w0

- 예측배열 y_pred는 np.dot(x, w1.T) + w0
  입력 데이터 X(1,2,...,100)이 있다면,
  예측값은 w0 + X(1)*w1 + X(2)*w1 +..+ X(100)\*w1이며, 이는 입력 배열 X와 w1 배열의 내적임.

- 새로운 w1과 w0를 update함

```python
# w1 과 w0 를 업데이트하는 함수
def get_weight_updates(w1, w0, X, y, lr=0.01): # 편미분값을 조정하는 학습값
    N = len(y)
    # 먼저 w1_update, w0_update를 각각 w1, w0의 shape와 동일한 크기를 가진 0 값으로 초기화
    w1_update = np.zeros_like(w1)
    w0_update = np.zeros_like(w0)

    # 예측 배열 계산하고 예측과 실제 값의 차이 계산
    y_pred = np.dot(X, w1.T) + w0
    diff = y - y_pred

    # w0_update를 dot 행렬 연산으로 구하기 위해 모두 1값을 가진 행렬 생성
    w0_factors = np.ones((N, 1))

    # w1과 w0을 업데이트할 w1_update와 w0_update 계산
    w1_update = -(2/N)*lr*(np.dot(X.T, diff))
    w0_update = -(2/N)*lr*(np.dot(w0_factors.T, diff))

    return w1_update, w0_update
```

```python
w0 = np.zeros((1,1))
w1 = np.zeros((1,1))

w1, w0
```

    (array([[0.]]), array([[0.]]))

```python
y_pred = np.dot(X, w1.T) + w0
diff = y - y_pred

print(diff.shape, '\n')
```

    (100, 1)

```python
w0_factors = np.ones((100,1))

w1_update = -(2/100)*0.01*(np.dot(X.T, diff))
w0_update = -(2/100)*0.01*(np.dot(w0_factors.T,diff))
print(w1_update.shape, w0_update.shape)
```

    (1, 1) (1, 1)

```python
# 반복적으로 w1과 w0를 업데이트 하는 함수
def gradient_descent_steps(X, y, iters=10000):
    # w0와 w1을 모두 0으로 초기화
    w0 = np.zeros((1,1))
    w1 = np.zeros((1,1))

    # iters만큼 반복적으로 get_weight_updates() 호출
    for ind in range(iters):
        # w0, w1 업데이트
        w1_update, w0_update = get_weight_updates(w1, w0, X, y, lr=0.01)
        w1 = w1 - w1_update
        w0 = w0 - w0_update

    return w1, w0 # iter만큼 업데이트된 w1, w0 반환
```

```python
# 오차 함수 정의
def get_cost(y, y_pred):
    N = len(y)
    cost = np.sum(np.square(y - y_pred))/N
    return cost
```

## 경사하강법 수행해서 w1, w0 업데이트

```python
w1, w0 = gradient_descent_steps(X, y, iters=70000)
print("w1: {0:.3f} w0: {1:3f}".format(w1[0,0], w0[0,0]),'\n')

y_pred = w1[0,0]*x+w0
print('Gradient Descent Total Cost:{0:.4f}'.format(get_cost(y, y_pred)))
```

    w1: 3.968 w0: 6.222151

    Gradient Descent Total Cost:0.9924

```python
plt.scatter(x,y)
plt.plot(x,y_pred);
```

![output_16_0](https://user-images.githubusercontent.com/67591105/149498930-753fd812-e555-44ee-82ec-6ef1e47cb16f.png)

## 미니배치(확률GD)로 비용함수 최적화

전체 데이터에 대해 경사하강법 연산을 수행하려면 시간이 오래걸리기  
때문에 미니 배치로 샘플링하면 빠르게 경사하강법을 수행할 수 있음

```python
def stochastic_gradient_descent_steps(X, y, batch_size=10, iters=1000):
    w0 = np.zeros((1,1))
    w1 = np.zeros((1,1))
    prev_cost = 100000
    iter_index = 0

    for i in range(iters):
        np.random.seed(i)
        # 전체 x,y 데이터를 batch_size로 랜덤추출하여 sample에 부여
        stochastic_random_index = np.random.permutation(X.shape[0])
        # 랜덤순열 만들기
        sample_X = X[stochastic_random_index[0:batch_size]]
        sample_y = y[stochastic_random_index[0:batch_size]]

        # 미니배치 임의 추출
        # batch_size만큼 추출된 랜덤데이터로 w1, w0 update
        w1_update, w0_update = get_weight_updates(w1, w0, sample_X, sample_y, lr=0.01)
        w1 = w1 - w1_update
        w0 = w0 - w0_update

    return w1, w0
```

```python
w1, w0 = stochastic_gradient_descent_steps(X, y, iters=50000)
print("w1", round(w1[0,0],3), "w0",round(w0[0,0],3))
y_pred = w1[0,0] * X + w0
print(f"Stochastic Gradient Descent Total Cost: {get_cost(y,y_pred):.4f}")
```

    w1 3.991 w0 6.202
    Stochastic Gradient Descent Total Cost: 0.9926

-> 앞과 거의 비슷하게 w1, w0 값이 도출된다
