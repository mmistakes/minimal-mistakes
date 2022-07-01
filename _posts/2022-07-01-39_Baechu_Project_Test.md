---
layout: single
title:  "39_Baechu_Project_Test"
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
X = tf.placeholder(dtype=tf.float32, shape=[None, 4])
# Y = tf.placeholder(dtype=tf.float32, shape=[None, 1])
a = tf.Variable(tf.random_uniform([4, 1]), dtype=tf.float32)
b = tf.Variable(tf.random_uniform([1]), dtype=tf.float32)
y = tf.matmul(X, a) + b
```


```python
# 배추 가격을 결정하는 4가지 변화 요인을 입력받는다.
# input() 함수는 무조건 문자열로 입력을 받기 때문에 입력받은 후 int()나 float() 함수를 사용해서 숫자로 변환해 사용한다.
avgTemp = float(input('평균 온도: '))
minTemp = float(input('최저 온도: '))
maxTemp = float(input('최고 온도: '))
rainFall = float(input('강수량: '))
```

    평균 온도: 5
    최저 온도: -3
    최고 온도: 10
    강수량: 10
    


```python
sess = tf.Session()
sess.run(tf.global_variables_initializer())

# 저장된 학습 모델을 불러와 적용한다.
saver = tf.train.Saver()
# save() 함수로 저장시킨 학습 모델은 restore() 함수를 사용해서 세션으로 불러올 수 있다.
saver.restore(sess, './model/saved.cpkt')

# 키보드로 입력받은 데이터를 불러온 학습 모델에서 사용하기 위해 2차원 리스트를 만든다.
data = [[avgTemp, minTemp, maxTemp, rainFall]]

# 불러온 학습 모델을 키보드로 입력한 데이터를 적용시켜 입력된 데이터에 따른 배추 가격을 예측한다.
result = sess.run(y, feed_dict={X: data})
print('평균 온도: {0:.1f}, 최저 온도: {1:.1f}, 최고 온도: {2:.1f}, 강수량: {3:.1f}일 때 배추 가격은 {4:7,.1f}원 입니다.'
      .format(avgTemp, minTemp, maxTemp, rainFall, result[0][0]))
```

    INFO:tensorflow:Restoring parameters from ./model/saved.cpkt
    평균 온도: 5.0, 최저 온도: -3.0, 최고 온도: 10.0, 강수량: 10.0일 때 배추 가격은 2,972.2원 입니다.
    
