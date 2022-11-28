---
layout: single
title:  "인공신경망 정리, fashion mnist"
categories: 딥러닝
tag: [python, keras, 파이썬, 딥러닝, fashion mnist, 인공신경망, 다중 분류, 예측]
toc: true
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


### Fashion MNIST 실습



<br/>



케라스의 fashion_mnist 데이터의 카테고리를 인공신경망을 활용해 분류해보려 합니다.  

처음으로 scikit-leran의 로지스틱 회귀를 통해 간단하게 분류 정확도를 체크하고,  

간단한 인공신경망 구축, 은닉층 추가, 옵티마이저 설정과 과적합을 피하기 위한 방법을 추가하며 결과를 확인해보겠습니다.



<br/>



Keras의 fashion_mnist데이터

 + 10개의 패션 아이템 클래스를 가지고 있습니다.

 + 28 x 28 픽셀의 흑백 이미지로 이루어져 있습니다.


##### keras의 fashion mnist 데이터 가져오기



```python
from tensorflow.keras.datasets import fashion_mnist

(X_train, y_train), (X_test, y_test) = fashion_mnist.load_data()

X_train.shape, y_train.shape
```

<pre>
((60000, 28, 28), (60000,))
</pre>
##### 데이터 확인해보기



```python
import matplotlib.pyplot as plt
import numpy as np

# 0 ~ 9번째 X데이터 출력
fig, axs = plt.subplots(1, 10, figsize=(10, 10))

for i in range(10):
    axs[i].imshow(X_train[i], cmap='gray_r')
    axs[i].axis('off')
plt.show()

# 0 ~ 9번째 Y데이터 출력
print([y_train[i] for i in range(10)])

# 카테고리 번호를 출력해보기(return_counts : 각 카테고리당 몇개씩 들어있는지 확인)
print(np.unique(y_train, return_counts=True))
```

<img src="data:image/png;base64,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"/>

<pre>
[9, 0, 0, 3, 0, 2, 7, 2, 5, 5]
(array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], dtype=uint8), array([6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000]))
</pre>
#### sikit-learn의 로지스틱 회귀로 예측 성능 확인해보기

+ 픽셀값은 0 ~ 255까지 이므로 0부터 1사이의 값으로 맞춰주기 위해 X데이터를 255.0으로 나누어줍니다.

+ 3차원의 X데이터를 1차원으로 펼쳐주기 위해 reshape를 해줍니다.



```python
X_train = X_train / 255.0
X_test = X_test / 255.0

X_train_scaled = X_train.reshape(-1, 28 * 28)
X_test_scaled = X_test.reshape(-1, 28 * 28)

X_train_scaled.shape, X_test_scaled.shape
```

<pre>
((60000, 784), (10000, 784))
</pre>
+ 로지스틱 회귀를 적용하기 위해 loss 매개변수에 손실 함수로 'log'를 지정합니다.  

+ max_iter 매개변수에 반복횟수로 5를 지정합니다.  

+ 반복 실행시 결과가 동일하게 나오기 위해 난수 초기값을 random_state 매개변수로 지정합니다.



```python
# scikit_learn의 SGDClassifier 클래스를 활용하여 경사하강법을 이용한 로지스틱 회귀를 사용
from sklearn.linear_model import SGDClassifier
from sklearn.model_selection import cross_validate

sc = SGDClassifier(loss='log', max_iter=5, random_state=42)

scores = cross_validate(sc, X_train_scaled, y_train, n_jobs=-1)
print(np.mean(scores['test_score']))  # 훈련데이터에 있어서 약 82프로의 정확도를 얻음
```

<pre>
0.8192833333333333
</pre>
10개의 클래스를 분류해야하는데 손실함수를 'log'로 사용하는 이유

+ SGD는 cross_entropy를 지정하는 곳이 따로 없기 때문에 10개의 클래스를 분류하기 위해 10개의

+ 예를 들어, 부츠를 양성, 나머지 9개를 음성으로 분류하여 1개의 모델을 훈련

+ 티셔츠를 양성, 나머지 9개를 음성으로 분류하여 1개의 모델을 훈련 -> 이런식으로 10개의 모델을 훈련

+ 10개의 계산값이 나오면 softmax함수(이진 분류일땐 sigmoid함수)를 사용하여 확률로 바꿔줍니다.

+ 이런식으로 이진분류를 다중분류처럼 사용하는 방법을 OVR(One verses Rest)라고 합니다.


#### 인공 신경망으로 구현

+ 로지스틱 회귀 경우 : 픽셀1 x w1 + 픽셀2 x w2 + ... + 픽셀784 x w784 + b => 10개의 모델  

+ 이를 인공 신경망으로 구현해봅니다.



```python
# 검증 데이터 0.2 비율로 분리
from sklearn.model_selection import train_test_split
X_train_scaled, X_val_scaled, y_train, y_val = train_test_split(
    X_train_scaled, y_train, test_size=0.2, random_state=42)

X_train_scaled.shape, y_train.shape, X_val_scaled.shape, y_val.shape
```

<pre>
((48000, 784), (48000,), (12000, 784), (12000,))
</pre>
##### 모델 정의

+ Dense 레이어를 사용하여 은닉층과 출력층을 생성합니다.

+ 은닉층의 활성화 함수에는 자주 쓰이는 'relu'를 사용합니다.

+ 출력층의 활성화 함수에는 다중분류이므로 'softmax'(이진분류일때는 'sigmoid')를 사용합니다.



##### 모델 컴파일

+ 손실 함수

    + 이진 분류 : binary_crossentropy

    + 다중 분류 : categorical_crossentropy

+ sparse_categorical_crossentropy란?

    + y데이터의 값은 0 ~ 9 까지의 정수인것을 확인했습니다.  

    이 정수값을 그대로 사용할 순 없고, 출력층에는 10개의 유닛에서 softmax함수값을 거쳐 10개의 확률값이 나옵니다.

    + crossentropy의 공식에 따라 10개의 확률값에 각각 로그를 취하고 타깃값과 곱하게 됩니다.  

    (샘플이 티셔츠일 확률 : a1 => -log(a1) x target값, -log(a2) x target값, ...)

    + 여기서, 티셔츠는 첫번째 원소가 1이고 나머지 0(\[1, 0, 0, ... , 0\])인 원 핫 인코딩이 되어있어야지만  

    첫번째 unit을 제외한 나머지 unit에서의 출력값이 모두 0이 곱해져 상쇄되어 티셔츠에 해당되는 뉴런의 출력값만 손실에 반영됩니다.

    + 하지만 원 핫 인코딩을 사용하지 않고, Y데이터의 정수값 그대로를 사용하려면 sparse_categorical_crossentropy를 사용합니다.

    



```python
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

model = Sequential()

# 다중분류이므로 softmax 사용
model.add(Dense(10, activation='softmax', input_shape=(784, )))

model.compile(loss='sparse_categorical_crossentropy',
             optimizer='adam',
             metrics=['acc'])
```


```python
# 모델 학습
history = model.fit(X_train_scaled, y_train, epochs=15, batch_size=100,
                    validation_data=(X_val_scaled, y_val))
```

<pre>
Epoch 1/15
480/480 [==============================] - 1s 1ms/step - loss: 0.7469 - acc: 0.7560 - val_loss: 0.5672 - val_acc: 0.8115
Epoch 2/15
480/480 [==============================] - 1s 1ms/step - loss: 0.5187 - acc: 0.8279 - val_loss: 0.5018 - val_acc: 0.8309
Epoch 3/15
480/480 [==============================] - 0s 1ms/step - loss: 0.4758 - acc: 0.8400 - val_loss: 0.4818 - val_acc: 0.8371
Epoch 4/15
480/480 [==============================] - 0s 1ms/step - loss: 0.4544 - acc: 0.8457 - val_loss: 0.4677 - val_acc: 0.8382
Epoch 5/15
480/480 [==============================] - 1s 1ms/step - loss: 0.4401 - acc: 0.8502 - val_loss: 0.4564 - val_acc: 0.8411
Epoch 6/15
480/480 [==============================] - 1s 1ms/step - loss: 0.4293 - acc: 0.8547 - val_loss: 0.4435 - val_acc: 0.8470
Epoch 7/15
480/480 [==============================] - 1s 1ms/step - loss: 0.4214 - acc: 0.8556 - val_loss: 0.4428 - val_acc: 0.8488
Epoch 8/15
480/480 [==============================] - 1s 1ms/step - loss: 0.4149 - acc: 0.8583 - val_loss: 0.4364 - val_acc: 0.8489
Epoch 9/15
480/480 [==============================] - 1s 1ms/step - loss: 0.4089 - acc: 0.8605 - val_loss: 0.4265 - val_acc: 0.8509
Epoch 10/15
480/480 [==============================] - 1s 1ms/step - loss: 0.4049 - acc: 0.8609 - val_loss: 0.4224 - val_acc: 0.8533
Epoch 11/15
480/480 [==============================] - 1s 1ms/step - loss: 0.4026 - acc: 0.8615 - val_loss: 0.4261 - val_acc: 0.8514
Epoch 12/15
480/480 [==============================] - 1s 1ms/step - loss: 0.3986 - acc: 0.8623 - val_loss: 0.4190 - val_acc: 0.8552
Epoch 13/15
480/480 [==============================] - 1s 1ms/step - loss: 0.3952 - acc: 0.8644 - val_loss: 0.4185 - val_acc: 0.8533
Epoch 14/15
480/480 [==============================] - 1s 1ms/step - loss: 0.3925 - acc: 0.8634 - val_loss: 0.4213 - val_acc: 0.8560
Epoch 15/15
480/480 [==============================] - 1s 1ms/step - loss: 0.3901 - acc: 0.8659 - val_loss: 0.4155 - val_acc: 0.8560
</pre>

```python
# 테스트 데이터를 모델에 적용하여 평가하기 [loss, acc]
model.evaluate(X_test_scaled, y_test)
```

<pre>
313/313 [==============================] - 0s 854us/step - loss: 0.4530 - acc: 0.8427
</pre>
<pre>
[0.45295682549476624, 0.8427000045776367]
</pre>
#### 심층 신경망

+ 입력층 784개의 뉴런과 은닉층 100개 뉴런, 출력층 10개 뉴런을 생성해보았습니다.



```python
# 모델을 좀 더 깊게(은닉층 추가) 수정
model = Sequential()

model.add(Dense(100, activation='relu', input_shape=(784, )))  # 은닉층
model.add(Dense(10, activation='softmax'))   # 출력층

model.compile(loss='sparse_categorical_crossentropy',
             optimizer='adam',
             metrics=['acc'])
```

##### model의 summary() 메서드

+ layer의 정보, 각 layer의 출력의 크기, 파라미터의 갯수를 확인할 수 있습니다.

+ 은닉층의 파라미터 갯수 : 784개의 입력 층과 은닉층의 100개의 뉴런이 있고, 각 뉴런은 b(절편)이 존재하므로  

100개의 b값이 존재합니다.  

따라서, 784 x 100 + 100 = 78500이 됩니다.

+ 출력층의 파라미터 갯수 : 은닉층에서 나오는 100개의 출력, 10개의 출력층 뉴런이 있으므로  

100 x 10 + 10 = 1010이 됩니다.



```python
model.summary()
```

<pre>
Model: "sequential_1"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 dense_1 (Dense)             (None, 100)               78500     
                                                                 
 dense_2 (Dense)             (None, 10)                1010      
                                                                 
=================================================================
Total params: 79,510
Trainable params: 79,510
Non-trainable params: 0
_________________________________________________________________
</pre>

```python
model.fit(X_train_scaled, y_train,
         epochs=15, batch_size=128, validation_data=(X_val_scaled, y_val))
```

<pre>
Epoch 1/15
375/375 [==============================] - 1s 2ms/step - loss: 0.5933 - acc: 0.7972 - val_loss: 0.4648 - val_acc: 0.8373
Epoch 2/15
375/375 [==============================] - 1s 1ms/step - loss: 0.4281 - acc: 0.8506 - val_loss: 0.4153 - val_acc: 0.8555
Epoch 3/15
375/375 [==============================] - 1s 1ms/step - loss: 0.3919 - acc: 0.8607 - val_loss: 0.3894 - val_acc: 0.8612
Epoch 4/15
375/375 [==============================] - 1s 1ms/step - loss: 0.3631 - acc: 0.8710 - val_loss: 0.3836 - val_acc: 0.8612
Epoch 5/15
375/375 [==============================] - 1s 2ms/step - loss: 0.3414 - acc: 0.8799 - val_loss: 0.3521 - val_acc: 0.8702
Epoch 6/15
375/375 [==============================] - 1s 2ms/step - loss: 0.3286 - acc: 0.8834 - val_loss: 0.3569 - val_acc: 0.8742
Epoch 7/15
375/375 [==============================] - 1s 1ms/step - loss: 0.3144 - acc: 0.8865 - val_loss: 0.3525 - val_acc: 0.8730
Epoch 8/15
375/375 [==============================] - 1s 1ms/step - loss: 0.3006 - acc: 0.8908 - val_loss: 0.3457 - val_acc: 0.8777
Epoch 9/15
375/375 [==============================] - 1s 2ms/step - loss: 0.2924 - acc: 0.8941 - val_loss: 0.3365 - val_acc: 0.8792
Epoch 10/15
375/375 [==============================] - 1s 2ms/step - loss: 0.2800 - acc: 0.8987 - val_loss: 0.3267 - val_acc: 0.8859
Epoch 11/15
375/375 [==============================] - 1s 2ms/step - loss: 0.2723 - acc: 0.9005 - val_loss: 0.3283 - val_acc: 0.8832
Epoch 12/15
375/375 [==============================] - 1s 2ms/step - loss: 0.2653 - acc: 0.9034 - val_loss: 0.3252 - val_acc: 0.8847
Epoch 13/15
375/375 [==============================] - 1s 2ms/step - loss: 0.2559 - acc: 0.9055 - val_loss: 0.3183 - val_acc: 0.8844
Epoch 14/15
375/375 [==============================] - 1s 2ms/step - loss: 0.2508 - acc: 0.9078 - val_loss: 0.3135 - val_acc: 0.8886
Epoch 15/15
375/375 [==============================] - 1s 2ms/step - loss: 0.2430 - acc: 0.9116 - val_loss: 0.3236 - val_acc: 0.8815
</pre>
<pre>
<keras.callbacks.History at 0x7f89740a0340>
</pre>

```python
model.evaluate(X_test_scaled, y_test)
```

<pre>
313/313 [==============================] - 0s 714us/step - loss: 0.3513 - acc: 0.8715
</pre>
<pre>
[0.3512624502182007, 0.8715000152587891]
</pre>
#### Relu함수와 Flatten층

+ Relu함수  

간단하게 말하면 Max함수입니다.  

뉴런의 출력값이 0보다 크면 그대로 출력, 0보다 작으면 0으로 출력해주는 단순한 함수입니다.  



+ Flatten층  

실제로 가중치는 존재하지 않는 층이며, 편의를 위해서 추가하는 층입니다.  

위에서 X데이터를 28x28 -> 784의 1차원 배열로 풀어주는 전처리 과정을 포함했습니다.  

이러한 작업을 Fletten이 대신 해줍니다.  

Flatten의 input_shape에 (28, 28)로 지정해주면 784의 1차원 배열로 전달해줍니다.  

summary()에서 보면 Flatten층의 출력 크기는 784로 나오는것을 확인할 수 있습니다.



```python
# Flatten층 사용하기 위해 reshape을 하지 않아도 됩니다.
# 그렇기 위해 귀찮겠지만 다시 데이터를 다시 로드했습니다.

(X_train, y_train), (X_test, y_test) = fashion_mnist.load_data()

X_train = X_train / 255.0
X_test = X_test / 255.0
```


```python
from tensorflow.keras.layers import Flatten

model = Sequential()

model.add(Flatten(input_shape=(28, 28)))
model.add(Dense(100, activation='relu'))
model.add(Dense(10, activation='softmax'))

model.compile(loss='sparse_categorical_crossentropy',
             optimizer='adam',
             metrics=['acc'])
```


```python
model.summary()
```

<pre>
Model: "sequential_6"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 flatten_4 (Flatten)         (None, 784)               0         
                                                                 
 dense_11 (Dense)            (None, 100)               78500     
                                                                 
 dense_12 (Dense)            (None, 10)                1010      
                                                                 
=================================================================
Total params: 79,510
Trainable params: 79,510
Non-trainable params: 0
_________________________________________________________________
</pre>

```python
history = model.fit(X_train, y_train, epochs=20,
                    batch_size=128, validation_split=0.2)
```

<pre>
Epoch 1/20
375/375 [==============================] - 1s 2ms/step - loss: 0.5939 - acc: 0.8002 - val_loss: 0.4570 - val_acc: 0.8438
Epoch 2/20
375/375 [==============================] - 1s 1ms/step - loss: 0.4267 - acc: 0.8518 - val_loss: 0.4048 - val_acc: 0.8581
Epoch 3/20
375/375 [==============================] - 1s 2ms/step - loss: 0.3846 - acc: 0.8652 - val_loss: 0.3798 - val_acc: 0.8639
Epoch 4/20
375/375 [==============================] - 1s 1ms/step - loss: 0.3614 - acc: 0.8720 - val_loss: 0.3696 - val_acc: 0.8674
Epoch 5/20
375/375 [==============================] - 1s 1ms/step - loss: 0.3388 - acc: 0.8785 - val_loss: 0.3745 - val_acc: 0.8658
Epoch 6/20
375/375 [==============================] - 1s 2ms/step - loss: 0.3238 - acc: 0.8849 - val_loss: 0.3453 - val_acc: 0.8755
Epoch 7/20
375/375 [==============================] - 1s 2ms/step - loss: 0.3120 - acc: 0.8859 - val_loss: 0.3625 - val_acc: 0.8701
Epoch 8/20
375/375 [==============================] - 1s 2ms/step - loss: 0.2972 - acc: 0.8907 - val_loss: 0.3300 - val_acc: 0.8813
Epoch 9/20
375/375 [==============================] - 1s 2ms/step - loss: 0.2896 - acc: 0.8948 - val_loss: 0.3335 - val_acc: 0.8792
Epoch 10/20
375/375 [==============================] - 1s 2ms/step - loss: 0.2773 - acc: 0.8988 - val_loss: 0.3262 - val_acc: 0.8821
Epoch 11/20
375/375 [==============================] - 1s 2ms/step - loss: 0.2702 - acc: 0.9020 - val_loss: 0.3237 - val_acc: 0.8848
Epoch 12/20
375/375 [==============================] - 1s 1ms/step - loss: 0.2620 - acc: 0.9047 - val_loss: 0.3225 - val_acc: 0.8835
Epoch 13/20
375/375 [==============================] - 1s 2ms/step - loss: 0.2531 - acc: 0.9072 - val_loss: 0.3294 - val_acc: 0.8831
Epoch 14/20
375/375 [==============================] - 1s 1ms/step - loss: 0.2489 - acc: 0.9087 - val_loss: 0.3149 - val_acc: 0.8861
Epoch 15/20
375/375 [==============================] - 1s 2ms/step - loss: 0.2437 - acc: 0.9115 - val_loss: 0.3265 - val_acc: 0.8832
Epoch 16/20
375/375 [==============================] - 1s 2ms/step - loss: 0.2362 - acc: 0.9131 - val_loss: 0.3123 - val_acc: 0.8893
Epoch 17/20
375/375 [==============================] - 1s 2ms/step - loss: 0.2324 - acc: 0.9145 - val_loss: 0.3193 - val_acc: 0.8874
Epoch 18/20
375/375 [==============================] - 1s 2ms/step - loss: 0.2246 - acc: 0.9180 - val_loss: 0.3212 - val_acc: 0.8847
Epoch 19/20
375/375 [==============================] - 1s 2ms/step - loss: 0.2232 - acc: 0.9179 - val_loss: 0.3140 - val_acc: 0.8867
Epoch 20/20
375/375 [==============================] - 1s 2ms/step - loss: 0.2141 - acc: 0.9224 - val_loss: 0.3102 - val_acc: 0.8913
</pre>

```python
model.evaluate(X_test, y_test)
```

<pre>
313/313 [==============================] - 0s 765us/step - loss: 0.3447 - acc: 0.8824
</pre>
<pre>
[0.34466418623924255, 0.8823999762535095]
</pre>
#### 옵티마이저

+ 학습률 : 경사하강법을 비유하자면, 산을 내려가면서 최적값을 찾아갈때 이동하는 거리.  

학습률을 너무 높게 잡는다면 최적값을 지나칠 수도 있기 때문에 적절한 학습률 조정이 필요합니다.  



기본 경사 하강법 옵티마이저

+ SGD

    + 기본 학습률은 0.01입니다.  

    model.compile(optimizer='sgd')

    + 학습률 조정도 가능합니다. (0.1로 변경)

    sgd = tensorflow.keras.optimizers.SGD(learning_rate=0.1)

+ 모멘텀

    + SGD에서 momentum > 0  

    sgd = tensorflow.keras.optimizers.SGD(momentum=0.9)

+ 네스테로프 모멘텀

    + SGD의 설정에서 nesterov = True를 주어 사용합니다.

    

<br/>



경사하강법에서 학습률에 따라 최적값을 찾아갈때, 최적값과 멀리 있을 땐 높은 이동 거리로 빠르게 접근하고,  

최적값과 가까워질 땐 좁은 거리로 이동하며 최대한 최적값에 수렴해가는게 좋습니다.  

이렇게 변화할 수 있는 학습률을 가지고 있는 것이 적응적 학습률 옵티마이저입니다.



<br/>



적응적 학습률 옵티마이저

+ RMSProp

+ Adam

+ Adagrad


#### 정확도와 손실 시각화해보기

model.fit()의 history는 훈련 과정 중 epoch별로 loss와 acc의 결과를 담고 있습니다.  

이를 활용해 모델의 정확도와 손실을 시각화 해볼 수 있습니다.



<br/>



시각화를 한 결과, epoch가 증가할 수록 훈련 데이터와 검증 데이터의 loss가 같이 줄어들고,   

정확도는 동시에 증가하는 것을 볼 수 있습니다.  

즉, 과적합이 많이 나타나지 않는 괜찮은 성능의 모델이라 확인할 수 있습니다.



```python
loss = history.history['loss']
val_loss = history.history['val_loss']
acc = history.history['acc']
val_acc = history.history['val_acc']

epochs = range(1, len(loss) + 1)
fig = plt.figure(figsize=(10, 5))

ax1 = fig.add_subplot(1, 2, 1)
ax1.plot(epochs, loss, color='blue', label='train_loss')
ax1.plot(epochs, val_loss, color='orange', label='val_loss')
ax1.set_title('train and val loss')
ax1.set_xlabel('epochs')
ax1.set_ylabel('loss')
ax1.legend()

ax2 = fig.add_subplot(1, 2, 2)
ax2.plot(epochs, acc, color='green', label='train_acc')
ax2.plot(epochs, val_acc, color='red', label='val_acc')
ax2.set_title('train and val acc')
ax2.set_xlabel('epochs')
ax2.set_ylabel('acc')
ax2.legend()
```

<pre>
<matplotlib.legend.Legend at 0x7f8940a50910>
</pre>
<img src="data:image/png;base64,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"/>

#### 드롭아웃

+ 가장 많이 사용하는 과적합을 피하는 방법 중 하나입니다.

+ 모델을 훈련할 때, 0 ~ 1사이의 확률로 랜덤적으로 뉴런의 계산을 끄고 학습을 진행합니다.

+ 제외하지 않은 나머지 뉴런에서만 훈련이 이루어집니다.

+ 특정 뉴런의 의존하게 되는 계산을 막을 수 있습니다.

+ 모델을 평가할때는 모든 뉴런을 사용합니다.



```python
from tensorflow.keras.layers import Dropout

model = Sequential()

model.add(Flatten(input_shape=(28, 28)))
model.add(Dense(100, activation='relu'))
model.add(Dropout(0.3))   # 0.3비율로 Dropout
model.add(Dense(10, activation='softmax'))

model.compile(loss='sparse_categorical_crossentropy',
             optimizer='adam',
             metrics=['acc'])

model.summary()
```

<pre>
Model: "sequential_9"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 flatten_7 (Flatten)         (None, 784)               0         
                                                                 
 dense_17 (Dense)            (None, 100)               78500     
                                                                 
 dropout_4 (Dropout)         (None, 100)               0         
                                                                 
 dense_18 (Dense)            (None, 10)                1010      
                                                                 
=================================================================
Total params: 79,510
Trainable params: 79,510
Non-trainable params: 0
_________________________________________________________________
</pre>

```python
history = model.fit(X_train, y_train,
                   epochs=20,
                   validation_split=0.2)
```

<pre>
Epoch 1/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.5865 - acc: 0.7941 - val_loss: 0.4211 - val_acc: 0.8484
Epoch 2/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.4389 - acc: 0.8434 - val_loss: 0.4098 - val_acc: 0.8489
Epoch 3/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.4026 - acc: 0.8535 - val_loss: 0.3723 - val_acc: 0.8635
Epoch 4/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.3810 - acc: 0.8605 - val_loss: 0.3629 - val_acc: 0.8709
Epoch 5/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.3659 - acc: 0.8661 - val_loss: 0.3551 - val_acc: 0.8708
Epoch 6/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.3514 - acc: 0.8716 - val_loss: 0.3622 - val_acc: 0.8639
Epoch 7/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.3432 - acc: 0.8738 - val_loss: 0.3498 - val_acc: 0.8747
Epoch 8/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.3318 - acc: 0.8772 - val_loss: 0.3304 - val_acc: 0.8803
Epoch 9/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.3288 - acc: 0.8775 - val_loss: 0.3341 - val_acc: 0.8805
Epoch 10/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.3150 - acc: 0.8828 - val_loss: 0.3430 - val_acc: 0.8723
Epoch 11/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.3119 - acc: 0.8841 - val_loss: 0.3254 - val_acc: 0.8847
Epoch 12/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.3086 - acc: 0.8851 - val_loss: 0.3414 - val_acc: 0.8780
Epoch 13/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.3001 - acc: 0.8880 - val_loss: 0.3325 - val_acc: 0.8831
Epoch 14/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.2963 - acc: 0.8879 - val_loss: 0.3212 - val_acc: 0.8842
Epoch 15/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.2917 - acc: 0.8915 - val_loss: 0.3254 - val_acc: 0.8861
Epoch 16/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.2840 - acc: 0.8941 - val_loss: 0.3248 - val_acc: 0.8859
Epoch 17/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.2847 - acc: 0.8938 - val_loss: 0.3197 - val_acc: 0.8875
Epoch 18/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.2788 - acc: 0.8957 - val_loss: 0.3405 - val_acc: 0.8804
Epoch 19/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.2766 - acc: 0.8964 - val_loss: 0.3131 - val_acc: 0.8906
Epoch 20/20
1500/1500 [==============================] - 2s 1ms/step - loss: 0.2723 - acc: 0.8971 - val_loss: 0.3260 - val_acc: 0.8868
</pre>
시각화를 해보면, Dropout을 사용했을 때 train_loss와 val_loss의 폭이 좀 더 줄어들고,  

val_loss의 증가율이 좀 더 낮아졌음을 볼 수 있습니다.



```python
loss = history.history['loss']
val_loss = history.history['val_loss']
acc = history.history['acc']
val_acc = history.history['val_acc']

epochs = range(1, len(loss) + 1)
fig = plt.figure(figsize=(10, 5))

ax1 = fig.add_subplot(1, 2, 1)
ax1.plot(epochs, loss, color='blue', label='train_loss')
ax1.plot(epochs, val_loss, color='orange', label='val_loss')
ax1.set_title('train and val loss')
ax1.set_xlabel('epochs')
ax1.set_ylabel('loss')
ax1.legend()

ax2 = fig.add_subplot(1, 2, 2)
ax2.plot(epochs, acc, color='green', label='train_acc')
ax2.plot(epochs, val_acc, color='red', label='val_acc')
ax2.set_title('train and val acc')
ax2.set_xlabel('epochs')
ax2.set_ylabel('acc')
ax2.legend()
```

<pre>
<matplotlib.legend.Legend at 0x7f88e63ab9d0>
</pre>
<img src="data:image/png;base64,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"/>

#### 모델 저장 및 복원

+ model.save_weights() : 모델의 구조는 저장하지않고, 파라미터만 저장합니다. (가중치, 편향)

+ model.load_weights() : 저장된 모델 객체를 불러옵니다.



<br/>



+ model.save() : 모델 구조 자체를 모두 저장합니다.

+ model.load_model() : 저장된 모델을 불러옵니다.



```python
# 모델 저장
model.save('./fashion_mnist_model-whole.h5')
```

model.predict() : 10개의 클래스가 존재하므로 각 샘플마다 10개의 확률을 출력해줍니다.  

10개의 확률 중 np.argmax()를 통해 가장 높은 값을 찾아서 그 인덱스를 예측값으로 사용합니다.  

얻은 예측값과 실제 테스트 데이터를 비교하여 평균을 내어 정확도를 내줍니다.  

아래에서 예측을 수행한 결과 약 88%의 정확도를 확인할 수 있습니다.



```python
# model.predict() : 각 샘플마다 10개의 확률을 출력해주는 메서드
# 10개의 확률 중 가장 높은 값을 찾아서 그 인덱스를 예측 값으로 사용합니다.

predictions = model.predict(X_test)
val_labels = np.argmax(predictions, axis=1)   # axis=1 : 행 기준으로 연산 수행(<-> axis=0 : 열 기준)
print(np.mean(val_labels == y_test))   # True : 1, False : 0
```

<pre>
0.8728
</pre>
#### 조기종료

학습이 진행될수록 학습셋의 정확도는 올라가지만 과적합으로 인해 테스트셋의 실험 결과가 점점 나빠질 수 있습니다.  

이렇게 학습이 진행되어도 텟트셋 오차가 줄지 않을 경우 학습을 멈추게 하는 함수입니다.



<br/>



+ patience = 2 : 검증셋의 손실이 2번 증가하면 중지

+ restore_best_weights=True : 가장 손실이 낮았던 곳으로 되돌리기



```python
import keras

checkpoint_cb = keras.callbacks.ModelCheckpoint('fashion_mnist_model-whole.h5')
early_stopping_cb = keras.callbacks.EarlyStopping(patience=2,
                                                 restore_best_weights=True)

history = model.fit(X_train, y_train, epochs=50, verbose=0,
                   validation_split=0.2, callbacks=[checkpoint_cb, early_stopping_cb])

print(f"종료될 떄의 epoch : {early_stopping_cb.stopped_epoch}")

loss = history.history['loss']
val_loss = history.history['val_loss']

plt.plot(loss)
plt.plot(val_loss)
plt.xlabel('epoch')
plt.ylabel('loss')
plt.legend(['train', 'val'])
plt.show()
```

<pre>
종료될 떄의 epoch : 11
</pre>
<img src="data:image/png;base64,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"/>
