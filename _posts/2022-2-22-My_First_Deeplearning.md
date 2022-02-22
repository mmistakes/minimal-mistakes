---
layout: single
title: "My First DeepLearning"
categories: 머신러닝&딥러닝
tag: [ python, blog, github, 파이썬, 머신러닝, 딥러닝, 차이, 개념, 입문, 텐서플로, tensorflow, 케라스, keras, sequential, model, add, dence ]
toc: true
sidebar:
  nav: "docs"
---
## 딥러닝 - 텐서플로 & 케라스


[코드출처 : 모두의 딥러닝](https://book.naver.com/bookdb/book_detail.nhn?bid=16215446)

### 머신러닝 < 딥러닝 
```
딥러닝은 머신러닝 방법 중 하나로 최근 가장 각광받고 있음

- GPU 발전으로 인공신경망 구현이 가능해지며 정립된 개념
- 인공신경망은 인간의 뇌처럼 여러 정보를 한꺼번에 받아들이고 처리하는 것을 의미함
```

```python
# # 텐서플로와 케라스 설치
# !pip install tensorflow
# !pip install keras
```

### 텐서플로, 케라스 함수호출
```python
# 텐서플로 : 다수의 머신러닝과 딥러닝 알고리즘을 결합한 라이브러리
import tensorflow 
tensorflow.__version__
```
    '2.8.0'

```python
# 케라스 : 딥러닝 수행에 특화된 라이브러리. 텐서플로가 있어야 실행됨
import keras
keras.__version__
```
    '2.8.0'

```
케라스 함수 호출 

1. Sequential(연속적인) - 여러 레이어(층)를 연속으로 쌓을 수 있는 틀 
2. model.add() - 필요한 층을 추가함.  
    - model.add()에는 각 층 특성을 설정하는 Dense 함수 포함  
```
```python
from tensorflow.keras.models import Sequential  
from tensorflow.keras.layers import Dense
```

### 딥러닝 준비

```python
# 필요한 라이브러리를 불러옵니다.
import numpy as np
import tensorflow as tf

# 실행할 때마다 같은 결과를 출력하기 위해 설정하는 부분입니다.
np.random.seed(3)
tf.random.set_seed(3)

# 준비된 수술 환자 데이터를 불러들입니다.
Data_set = np.loadtxt("dataset/ThoraricSurgery.csv", delimiter=",")
```


```python
print(type(Data_set))
print(Data_set.shape)
Data_set
```

    <class 'numpy.ndarray'>
    (470, 18)
    
    array([[293.  ,   1.  ,   3.8 , ...,   0.  ,  62.  ,   0.  ],
           [  1.  ,   2.  ,   2.88, ...,   0.  ,  60.  ,   0.  ],
           [  8.  ,   2.  ,   3.19, ...,   0.  ,  66.  ,   1.  ],
           ...,
           [406.  ,   6.  ,   5.36, ...,   0.  ,  62.  ,   0.  ],
           [ 25.  ,   8.  ,   4.32, ...,   0.  ,  58.  ,   1.  ],
           [447.  ,   8.  ,   5.2 , ...,   0.  ,  49.  ,   0.  ]])




```python
# 환자의 기록과 수술 결과를 X와 Y로 구분하여 저장합니다.
X = Data_set[:, 0:17]
Y = Data_set[:, 17]
```

### 딥러닝 실행 (활성함수 - sigmond)

```python
# 딥러닝 구조를 결정합니다(모델을 설정하고 실행하는 부분입니다).
model = Sequential()
model.add(Dense(30, input_dim=17, activation='relu'))  # 입력층 노드 17개
                                                       # 은닉층1 노드 30개
model.add(Dense(1, activation='sigmoid'))              # 출력층 노드 1개
```



```python
# 딥러닝을 실행합니다.
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

# 모델 학습
model.fit(X, Y, epochs=100, batch_size=10) 
```

    Epoch 1/100
    47/47 [==============================] - 1s 972us/step - loss: 0.6482 - accuracy: 0.8128
    Epoch 2/100
    47/47 [==============================] - 0s 859us/step - loss: 0.4890 - accuracy: 0.8468
    Epoch 3/100
    47/47 [==============================] - 0s 889us/step - loss: 0.4416 - accuracy: 0.8511
    Epoch 4/100
    47/47 [==============================] - 0s 899us/step - loss: 0.4863 - accuracy: 0.8489
    Epoch 5/100
    47/47 [==============================] - 0s 967us/step - loss: 0.4430 - accuracy: 0.8532
    Epoch 6/100
    47/47 [==============================] - 0s 871us/step - loss: 0.4303 - accuracy: 0.8532
    Epoch 7/100
    47/47 [==============================] - 0s 964us/step - loss: 0.4421 - accuracy: 0.8511
    Epoch 8/100
    47/47 [==============================] - 0s 905us/step - loss: 0.4363 - accuracy: 0.8489
    Epoch 9/100
    47/47 [==============================] - 0s 920us/step - loss: 0.4165 - accuracy: 0.8489
    Epoch 10/100
    47/47 [==============================] - 0s 951us/step - loss: 0.4317 - accuracy: 0.8489
    Epoch 11/100
    47/47 [==============================] - 0s 869us/step - loss: 0.4458 - accuracy: 0.8489
    Epoch 12/100
    47/47 [==============================] - 0s 954us/step - loss: 0.4384 - accuracy: 0.8532
    Epoch 13/100
    47/47 [==============================] - 0s 857us/step - loss: 0.4651 - accuracy: 0.8532
    Epoch 14/100
    47/47 [==============================] - 0s 862us/step - loss: 0.4475 - accuracy: 0.8319
    Epoch 15/100
    47/47 [==============================] - 0s 935us/step - loss: 0.4934 - accuracy: 0.8255
    Epoch 16/100
    47/47 [==============================] - 0s 893us/step - loss: 0.4472 - accuracy: 0.8447
    Epoch 17/100
    47/47 [==============================] - 0s 844us/step - loss: 0.4747 - accuracy: 0.8383
    Epoch 18/100
    47/47 [==============================] - 0s 915us/step - loss: 0.4488 - accuracy: 0.8468
    Epoch 19/100
    47/47 [==============================] - 0s 846us/step - loss: 0.4407 - accuracy: 0.8511
    Epoch 20/100
    47/47 [==============================] - 0s 988us/step - loss: 0.4380 - accuracy: 0.8511
    Epoch 21/100
    47/47 [==============================] - 0s 892us/step - loss: 0.4331 - accuracy: 0.8532
    Epoch 22/100
    47/47 [==============================] - 0s 863us/step - loss: 0.4242 - accuracy: 0.8511
    Epoch 23/100
    47/47 [==============================] - 0s 978us/step - loss: 0.4183 - accuracy: 0.8532
    Epoch 24/100
    47/47 [==============================] - 0s 863us/step - loss: 0.4303 - accuracy: 0.8489
    Epoch 25/100
    47/47 [==============================] - 0s 876us/step - loss: 0.4246 - accuracy: 0.8511
    Epoch 26/100
    47/47 [==============================] - 0s 902us/step - loss: 0.4335 - accuracy: 0.8532
    Epoch 27/100
    47/47 [==============================] - 0s 910us/step - loss: 0.4492 - accuracy: 0.8383
    Epoch 28/100
    47/47 [==============================] - 0s 873us/step - loss: 0.4241 - accuracy: 0.8532
    Epoch 29/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.4212 - accuracy: 0.8532
    Epoch 30/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.4136 - accuracy: 0.8511
    Epoch 31/100
    47/47 [==============================] - 0s 960us/step - loss: 0.4389 - accuracy: 0.8511
    Epoch 32/100
    47/47 [==============================] - 0s 867us/step - loss: 0.4188 - accuracy: 0.8553
    Epoch 33/100
    47/47 [==============================] - 0s 847us/step - loss: 0.4428 - accuracy: 0.8532
    Epoch 34/100
    47/47 [==============================] - 0s 880us/step - loss: 0.4103 - accuracy: 0.8489
    Epoch 35/100
    47/47 [==============================] - 0s 871us/step - loss: 0.4178 - accuracy: 0.8489
    Epoch 36/100
    47/47 [==============================] - 0s 895us/step - loss: 0.4136 - accuracy: 0.8532
    Epoch 37/100
    47/47 [==============================] - 0s 891us/step - loss: 0.4429 - accuracy: 0.8511
    Epoch 38/100
    47/47 [==============================] - 0s 906us/step - loss: 0.4258 - accuracy: 0.8489
    Epoch 39/100
    47/47 [==============================] - 0s 915us/step - loss: 0.4714 - accuracy: 0.8319
    Epoch 40/100
    47/47 [==============================] - 0s 876us/step - loss: 0.4041 - accuracy: 0.8574
    Epoch 41/100
    47/47 [==============================] - 0s 885us/step - loss: 0.4210 - accuracy: 0.8511
    Epoch 42/100
    47/47 [==============================] - 0s 876us/step - loss: 0.4418 - accuracy: 0.8447
    Epoch 43/100
    47/47 [==============================] - 0s 888us/step - loss: 0.4096 - accuracy: 0.8511
    Epoch 44/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.4032 - accuracy: 0.8511
    Epoch 45/100
    47/47 [==============================] - 0s 957us/step - loss: 0.4067 - accuracy: 0.8532
    Epoch 46/100
    47/47 [==============================] - 0s 872us/step - loss: 0.4030 - accuracy: 0.8532
    Epoch 47/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.4132 - accuracy: 0.8447
    Epoch 48/100
    47/47 [==============================] - 0s 873us/step - loss: 0.4026 - accuracy: 0.8532
    Epoch 49/100
    47/47 [==============================] - 0s 939us/step - loss: 0.4082 - accuracy: 0.8511
    Epoch 50/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.4097 - accuracy: 0.8511
    Epoch 51/100
    47/47 [==============================] - 0s 974us/step - loss: 0.4124 - accuracy: 0.8532
    Epoch 52/100
    47/47 [==============================] - 0s 940us/step - loss: 0.3972 - accuracy: 0.8553
    Epoch 53/100
    47/47 [==============================] - 0s 979us/step - loss: 0.4128 - accuracy: 0.8489
    Epoch 54/100
    47/47 [==============================] - 0s 878us/step - loss: 0.4073 - accuracy: 0.8468
    Epoch 55/100
    47/47 [==============================] - 0s 839us/step - loss: 0.4110 - accuracy: 0.8532
    Epoch 56/100
    47/47 [==============================] - 0s 938us/step - loss: 0.3921 - accuracy: 0.8532
    Epoch 57/100
    47/47 [==============================] - 0s 903us/step - loss: 0.4091 - accuracy: 0.8532
    Epoch 58/100
    47/47 [==============================] - 0s 860us/step - loss: 0.3995 - accuracy: 0.8574
    Epoch 59/100
    47/47 [==============================] - 0s 941us/step - loss: 0.3985 - accuracy: 0.8532
    Epoch 60/100
    47/47 [==============================] - 0s 909us/step - loss: 0.3899 - accuracy: 0.8574
    Epoch 61/100
    47/47 [==============================] - 0s 955us/step - loss: 0.4041 - accuracy: 0.8553
    Epoch 62/100
    47/47 [==============================] - 0s 870us/step - loss: 0.4246 - accuracy: 0.8468
    Epoch 63/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.4068 - accuracy: 0.8532
    Epoch 64/100
    47/47 [==============================] - 0s 962us/step - loss: 0.4318 - accuracy: 0.8511
    Epoch 65/100
    47/47 [==============================] - 0s 952us/step - loss: 0.3902 - accuracy: 0.8553
    Epoch 66/100
    47/47 [==============================] - 0s 891us/step - loss: 0.4312 - accuracy: 0.8511
    Epoch 67/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.4164 - accuracy: 0.8489
    Epoch 68/100
    47/47 [==============================] - 0s 935us/step - loss: 0.4090 - accuracy: 0.8511
    Epoch 69/100
    47/47 [==============================] - 0s 864us/step - loss: 0.4020 - accuracy: 0.8511
    Epoch 70/100
    47/47 [==============================] - 0s 874us/step - loss: 0.3986 - accuracy: 0.8574
    Epoch 71/100
    47/47 [==============================] - 0s 919us/step - loss: 0.4027 - accuracy: 0.8511
    Epoch 72/100
    47/47 [==============================] - 0s 973us/step - loss: 0.4196 - accuracy: 0.8340
    Epoch 73/100
    47/47 [==============================] - 0s 958us/step - loss: 0.4019 - accuracy: 0.8532
    Epoch 74/100
    47/47 [==============================] - 0s 860us/step - loss: 0.3907 - accuracy: 0.8553
    Epoch 75/100
    47/47 [==============================] - 0s 890us/step - loss: 0.3890 - accuracy: 0.8553
    Epoch 76/100
    47/47 [==============================] - 0s 858us/step - loss: 0.4077 - accuracy: 0.8553
    Epoch 77/100
    47/47 [==============================] - 0s 877us/step - loss: 0.4178 - accuracy: 0.8426
    Epoch 78/100
    47/47 [==============================] - 0s 930us/step - loss: 0.4080 - accuracy: 0.8553
    Epoch 79/100
    47/47 [==============================] - 0s 973us/step - loss: 0.4148 - accuracy: 0.8426
    Epoch 80/100
    47/47 [==============================] - 0s 979us/step - loss: 0.4019 - accuracy: 0.8468
    Epoch 81/100
    47/47 [==============================] - 0s 959us/step - loss: 0.4057 - accuracy: 0.8532
    Epoch 82/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.4184 - accuracy: 0.8489
    Epoch 83/100
    47/47 [==============================] - 0s 984us/step - loss: 0.3944 - accuracy: 0.8532
    Epoch 84/100
    47/47 [==============================] - 0s 917us/step - loss: 0.4345 - accuracy: 0.8468
    Epoch 85/100
    47/47 [==============================] - 0s 997us/step - loss: 0.4050 - accuracy: 0.8489
    Epoch 86/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.3922 - accuracy: 0.8489
    Epoch 87/100
    47/47 [==============================] - 0s 942us/step - loss: 0.3976 - accuracy: 0.8511
    Epoch 88/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.3966 - accuracy: 0.8468
    Epoch 89/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.3886 - accuracy: 0.8468
    Epoch 90/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.3965 - accuracy: 0.8596
    Epoch 91/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.4220 - accuracy: 0.8532
    Epoch 92/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.4198 - accuracy: 0.8489
    Epoch 93/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.3953 - accuracy: 0.8511
    Epoch 94/100
    47/47 [==============================] - 0s 995us/step - loss: 0.3871 - accuracy: 0.8489
    Epoch 95/100
    47/47 [==============================] - 0s 918us/step - loss: 0.3864 - accuracy: 0.8574
    Epoch 96/100
    47/47 [==============================] - 0s 879us/step - loss: 0.4229 - accuracy: 0.8426
    Epoch 97/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.4149 - accuracy: 0.8447
    Epoch 98/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.3857 - accuracy: 0.8596
    Epoch 99/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.4051 - accuracy: 0.8532
    Epoch 100/100
    47/47 [==============================] - 0s 1ms/step - loss: 0.3832 - accuracy: 0.8468





    <keras.callbacks.History at 0x228b41c49a0>




```python

```
