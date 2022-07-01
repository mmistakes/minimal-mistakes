---
layout: single
title:  "31_Multi_Linear_Regression_다중선형회귀"
categories : python
tag : [review]
search: true #false로 주면 검색해도 안나온다.
---

```python
import warnings 
warnings.filterwarnings('ignore')
import numpy as np
import pandas as pd
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()
```

    WARNING:tensorflow:From c:\python\lib\site-packages\tensorflow\python\compat\v2_compat.py:101: disable_resource_variables (from tensorflow.python.ops.variable_scope) is deprecated and will be removed in a future version.
    Instructions for updating:
    non-resource variables are not supported in the long term
    


```python
data = [[2,0,81],[4,4,93],[6,2,91],[8,3,97]] #[공부한 시간(x1), 과외 수업 시간(x2) 실제 성적(y)]
xData1=[i[0] for i in data] #공부한 시간
xData2=[i[1] for i in data] #과외 시간
yData=[i[2] for i in data] #시험 성적(실제성적)
```


```python
#기울기 a1,a2와 절편 b를 임의로 정한다.
#기울기의 범위는 0~10사이이며, y절편의 범위는
#0~100사이에서 임의로 변하게 한다.
a1=tf.Variable(tf.random_uniform([1],0,10,dtype=tf.float32))
a2=tf.Variable(tf.random_uniform([1],0,10,dtype=tf.float32))
b=tf.Variable(tf.random_uniform([1],0,100,dtype=tf.float32))
sess = tf.Session()
sess.run(tf.global_variables_initializer())
print('a1={},a2={},b={}'.format(sess.run(a1),sess.run(a2), sess.run(b)))
```

    a1=[1.6001141],a2=[1.2594676],b=[59.424484]
    


```python
#예측 성적(y)을 얻기위한 가설(수식)을 만든다.
y = a1*xData1 + a2*xData2 + b

#RMSE(평균 제곱근 오차) 수식(오차(비용)함수)을 만든다.
#예측 성적과 실제 성적의 편차의 제곱에 대한 평균의 제곱근을
#계산한다.
rmse = tf.sqrt(tf.reduce_mean(tf.square(y-yData)))
#경사 하강법 알고리즘을 이용해서 RMSE를 최소로 하는 값을 찾는
#수식을 만든다.
gradient_descent = tf.train.GradientDescentOptimizer(0.1).minimize(rmse)
```


```python
#학습시킨다.
import time
```


```python
sess = tf.Session()
sess.run(tf.global_variables_initializer())

for i in range(3001):
    sess.run(gradient_descent)
    if i % 200 ==0:
        #Epoch => 한번 학습을 의미하는 용어, 
        #         RMSE, 기울기(2.3에 가까워진다.)
        #         y절편(79에 가까워진다.)
        #print('Epoch : %4d, RMSE : %7.4f, 기울기 : %7.4f, y절편 : %7.4f' 
        #      %(i, sess.run(rmse), sess.run(a), sess.run(b)))
        
        #넘파이 배열(아래 예시의 경우'[]'안에 데이터가 하나 들어있다)에서 
        #서식을 지정해서 꺼내려면 [0]붙여줘야 한다.
        print('Epoch : {0:4d}, RMSE : {1:7.4f}, 기울기1 : {2:7.4f}, 기울기2 : {3:7.4f}, y절편 : {4:7.4f}' 
              .format(i, sess.run(rmse),sess.run(a1)[0],sess.run(a2)[0], sess.run(b)[0]))        
```

    Epoch :    0, RMSE :  5.9515, 기울기1 :  3.7287, 기울기2 :  0.9599, y절편 : 65.5723
    Epoch :  200, RMSE :  1.8304, 기울기1 :  2.1546, 기울기2 :  2.5114, y절편 : 73.3638
    Epoch :  400, RMSE :  1.8368, 기울기1 :  1.3419, 기울기2 :  2.2023, y절편 : 77.0699
    Epoch :  600, RMSE :  1.8370, 기울기1 :  1.2493, 기울기2 :  2.1699, y절편 : 77.6807
    Epoch :  800, RMSE :  1.8370, 기울기1 :  1.2335, 기울기2 :  2.1644, y절편 : 77.7885
    Epoch : 1000, RMSE :  1.8370, 기울기1 :  1.2307, 기울기2 :  2.1635, y절편 : 77.8076
    Epoch : 1200, RMSE :  1.8370, 기울기1 :  1.2302, 기울기2 :  2.1633, y절편 : 77.8109
    Epoch : 1400, RMSE :  1.8371, 기울기1 :  1.2301, 기울기2 :  2.1633, y절편 : 77.8113
    Epoch : 1600, RMSE :  1.8371, 기울기1 :  1.2301, 기울기2 :  2.1633, y절편 : 77.8113
    Epoch : 1800, RMSE :  1.8371, 기울기1 :  1.2301, 기울기2 :  2.1633, y절편 : 77.8113
    Epoch : 2000, RMSE :  1.8371, 기울기1 :  1.2301, 기울기2 :  2.1633, y절편 : 77.8113
    Epoch : 2200, RMSE :  1.8371, 기울기1 :  1.2301, 기울기2 :  2.1633, y절편 : 77.8113
    Epoch : 2400, RMSE :  1.8371, 기울기1 :  1.2301, 기울기2 :  2.1633, y절편 : 77.8113
    Epoch : 2600, RMSE :  1.8371, 기울기1 :  1.2301, 기울기2 :  2.1633, y절편 : 77.8113
    Epoch : 2800, RMSE :  1.8371, 기울기1 :  1.2301, 기울기2 :  2.1633, y절편 : 77.8113
    Epoch : 3000, RMSE :  1.8371, 기울기1 :  1.2301, 기울기2 :  2.1633, y절편 : 77.8113
    


```python
#http://taewan.kim/post/sigmoid_diff/
#Sgimoid함수 미분 정리

#https://devlog.jwgo.kr/2018/04/16/sigmoid-graph-according-to-slope-change/

```
