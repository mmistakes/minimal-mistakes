---
title : "⚙ 3. 선형회귀 구현 - 코드"

categories:
    - Machinelearning
tags:
    - [AI, Regression, Cost]

toc : true
toc_sticky : true
use_math : true

date: 2022-01-11
last_modified_at: 2022-01-11
---  

* * *
🔨 이번에는 지난 두 포스팅에서 배운 가설함수와 비용함수를 텐서플로를 가지고 구현해보자.  
🔨 우선 필요한 라이브러리들을 임포트한다.
```py
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
```
* * *

## 1. Tensorflow 함수 설명

🔨 코드를 작성하기 전에 사용될 함수에 대해서 가볍게 알아보자.
- <b>tf.Variable( )</b> : 변수 생성
    - ```py
      a1 = tf.Variable(1)
      a2 = tf.Variable([1])
      a3 = tf.Variable([1,2])
      a4 = tf.Variable([[1,2], [3,4]])

      print("a1 : ", a1)
      print("a2 : ", a2)
      print("a3 : ", a3)
      ```
      ```
      >>
      a1 :  <tf.Variable 'Variable:0' shape=() dtype=int32, numpy=1>
      a2 :  <tf.Variable 'Variable:0' shape=(1,) dtype=int32, numpy=array([1])>
      a3 :  <tf.Variable 'Variable:0' shape=(2,) dtype=int32, numpy=array([1, 2])>
      a4 :  <tf.Variable 'Variable:0' shape=(2, 2) dtype=int32, numpy= array([[1, 2], [3, 4]])>
      ```  

- <b>tf.square( )</b> : 제곱
    - ```py
      tf.square(3)
      ```
      ```
      >> <tf.Tensor: shape=(), dtype=int32, numpy=9>
      ```  

- <b>tf.reduce_mean( )</b> : 평균을 구해주면서 차원을 낮춰줌
    - ```py
      v1 = [1,2,3,4]
      tf.reduce_mean(v1)
      ```
      ```
      >> <tf.Tensor: shape=(), dtype=int32, numpy=2>
      ```
    - ```py
      v2 = [1.,2.,3.,4.]
      tf.reduce_mean(v2)
      ```
      ```
      >> <tf.Tensor: shape=(), dtype=float32, numpy=2.5>
      ```  

- <b>with tf.GradientTape as tape:</b> : with 구문 안에서 실행된 모든 연산을 tape에 기록함
    - ```py
      with tf.GradientTape() as tape:
          hypothesis = W * x_data + b
          cost = tf.reduce_mean(tf.square(hypothesis - y_data))
      ```
    - 위의 예시에서는 tape에 hypothesis와 cost 값이 기록됨

   
- <b>tape.gradient(func, parameter)</b> : tape 객체의 func 함수를 parameter에 대해서 미분한 gradient를 구해줌
    - ```py
      W_grad = tape.gradient(cost, W)
      b_grad = tape.gradient(cost, b)
      ```
    - 위 코드는 아래와 같이 나타낼 수도 있다.
      ```py
      W_grad, b_grad = tape.gradient(cost, [W, b])  
      ```  

- <b>.assign_sub(🔲)</b> : A = A - 🔲 를 의미한다.
    - ```py
      W.assign_sub(learning_rate * W_grad)
      ```

## 2. Hypothesis 만들기

🔨 가설함수 Hypothesis  
<center>$H(x) = Wx + b$</center>  

```py
# x,y 데이터 생성
x_data = [1,2,3,4,5]
y_data = [1,2,3,4,5]

# W,b 초기값 선언
W = tf.Variable(2.9)
b = tf.Variable(0.5)

# 가설함수 정의
hypothesis = W * x_data + b

# 가설함수 플로팅
plt.figure(figsize = (10,8))
plt.plot(x_data, hypothesis.numpy(), 'r-')
plt.plot(x_data, y_data, 'o')
plt.ylim(0,8)
plt.show()
```
<p align="center"><img src="https://user-images.githubusercontent.com/65170165/148872338-5c734f2b-7741-4cc1-a32d-b893dd7ad38a.png" width="500" /></p>

🔨 x, y 데이터와 우리의 가설함수 간의 오차가 큰 것을 확인하자.

## 3. cost 함수 만들기

🔨 비용함수 cost
<center>$$cost(W,b) = \frac{1}{m} \sum_{i=1}^m(H(x_i) - y_i)^2$$</center>  

  
```py
cost = tf.reduce_mean(tf.square(hypothesis - y_data))
```

## 4. Gradient descent - W / b 업데이트 알고리즘

```py
# learning rate 정의
learning_rate = 0.01

# tape에 연산 과정 기록
with tf.GradientTape() as tape:
    hypothesis = W * x_data + b
    cost = tf.reduce_mean(tf.square(hypothesis - y_data))

# gradient    
W_grad = tape.gradient(cost, W) 
b_grad = tape.gradient(cost, b)

# W,b 업데이트
W.assign_sub(learning_rate * W_grad)
b.assign_sub(learning_rate * b_grad)
```

## 5. W / b 업데이트

```py
W = tf.Variable(2.9)
b = tf.Variable(0.5)
learning_rate = 0.01
print("{:>5}|{:>10}|{:>10}|{:>10}".format('i', 'W', 'b', 'cost'))

# 100번 업데이트 진행
for i in range(100+1):
    with tf.GradientTape() as tape:
        hypothesis = W * x_data + b
        cost = tf.reduce_mean(tf.square(hypothesis - y_data))
    
    W_grad, b_grad = tape.gradient(cost, [W,b])

    W.assign_sub(learning_rate * W_grad)
    b.assign_sub(learning_rate * b_grad)
    
    # 10회 마다 W / b / cost 출력
    if i % 10 == 0:
        print("{:5}|{:10.4}|{:10.4}|{:10.6f}".format(i, W.numpy(), b.numpy(), cost))
```
```
>>
    i|         W|         b|      cost
    0|     2.452|     0.376| 45.660004
   10|     1.104|  0.003398|  0.206336
   20|     1.013|  -0.02091|  0.001026
   30|     1.007|  -0.02184|  0.000093
   40|     1.006|  -0.02123|  0.000083
   50|     1.006|  -0.02053|  0.000077
   60|     1.005|  -0.01984|  0.000072
   70|     1.005|  -0.01918|  0.000067
   80|     1.005|  -0.01854|  0.000063
   90|     1.005|  -0.01793|  0.000059
  100|     1.005|  -0.01733|  0.000055
```
🔨 업데이트를 진행할수록 cost가 0에 가까워 지는 것을 확인할 수 있다.  

```py
plt.figure(figsize = (10,8))
plt.plot(x_data, hypothesis.numpy(), 'r-')
plt.plot(x_data, y_data, 'o')
plt.ylim(0,8)
plt.show()
```  

<p align="center"><img src="https://user-images.githubusercontent.com/65170165/148872356-b0a04e54-e91d-41de-af54-1b20c4c2cac2.png" width="500" /></p>

🔨 x, y 데이터와 업데이트 된 가설함수가 거의 일치하는 것을 확인하자. 이는 cost가 최소가 되는 방향으로 학습이 잘 진행되고 있다는 뜻이겠지?? 🙃

## 6. 전체 코드

```py
import tensorflow as tf
import numpy as np

print("{:>5}|{:>10}|{:>10}|{:>10}".format('i', 'W', 'b', 'cost'))

x_data = [1,2,3,4,5]
y_data = [1,2,3,4,5]

W = tf.Variable(2.9)
b = tf.Variable(0.5)

learning_rate = 0.01

for i in range(100+1):
    with tf.GradientTape() as tape:
        hypothesis = W * x_data + b
        cost = tf.reduce_mean(tf.square(hypothesis - y_data))
    
    W_grad, b_grad = tape.gradient(cost, [W,b])

    W.assign_sub(learning_rate * W_grad)
    b.assign_sub(learning_rate * b_grad)
    
    if i % 10 == 0:
        print("{:5}|{:10.4f}|{:10.4}|{:10.6f}".format(i, W.numpy(), b.numpy(), cost))
```
* * *

🔨 텐서플로를 사용해서 실제로 선형회귀모델을 구현해 보았다. 평소에 인공지능 툴을 어렵게 생각해서 그런지 막연한 두려움 같은 것이 있었는데 관련 함수를 찾아보고 강의도 듣고 하다보니 뭐 생각보다는 할 만한거 같다!!  

🔨 다음 포스팅에서는 cost를 최소화하는 것에 대해 좀 더 다뤄봐야겠다.
