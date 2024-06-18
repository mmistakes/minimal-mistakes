---
layout: single
title: "Practice CIFAR-10"
categories: AI
tag: Paper Review
toc: true
---



## CIFAR-10 데이터셋 불러오기 


```python
import os
import random
import numpy as np
import matplotlib.pyplot as plt

import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, Conv2D, MaxPooling2D, Dropout, Flatten

from tensorflow.keras.datasets import cifar10
from tensorflow.keras.utils import to_categorical
from matplotlib.ticker import (MultipleLocator, FormatStrFormatter)
from dataclasses import dataclass
```


```python
SEED_VALUE = 42

# 임의의 랜덤 시드 사용(42)
random.seed(SEED_VALUE)
np.random.seed(SEED_VALUE)
tf.random.set_seed(SEED_VALUE)
```


```python
# load_data() 함수를 사용하여 데이터셋을 로드하고 샘플 수와 데이터의 형태를 확인
 (X_train, y_train), (X_test, y_test) = cifar10.load_data()

print(X_train.shape)
print(X_test.shape)
```

    Downloading data from https://www.cs.toronto.edu/~kriz/cifar-10-python.tar.gz
    170498071/170498071 [==============================] - 13s 0us/step
    (50000, 32, 32, 3)
    (10000, 32, 32, 3)


# 데이터셋의 샘플 이미지 표시


```python
plt.figure(figsize=(7, 7))

num_rows = 10
num_cols = 10

for i in range(num_rows*num_cols):
    ax = plt.subplot(num_rows, num_cols, i + 1)
    plt.imshow(X_train[i,:,:])
    plt.axis("off")
```


    
![png](/images/2024/05/2024-05-31-02-output_5_0.png)
    

## 데이터셋 전처리


```python
# 이미지를 [0, 1] 범위로 정규화
X_train = X_train.astype("float32") / 255
X_test  = X_test.astype("float32") / 255

# 레이블을 정수에서 범주형 데이터로 변경
print('training sample: ', y_train[0])

# 레이블을 원-핫 인코딩으로 변환
y_train = to_categorical(y_train)
y_test  = to_categorical(y_test)

print('categorical one-hot encoded labels: ', y_train[0])
```

    Original (integer) label for the first training sample:  [6]
    After conversion to categorical one-hot encoded labels:  [0. 0. 0. 0. 0. 0. 1. 0. 0. 0.]


## 데이터 세트 및 학습 구성 매개 변수


```python
@dataclass(frozen=True)
class DatasetConfig:
    NUM_CLASSES:  int = 10
    IMG_HEIGHT:   int = 32
    IMG_WIDTH:    int = 32
    NUM_CHANNELS: int = 3

@dataclass(frozen=True)
class TrainingConfig:
    EPOCHS:        int = 31
    BATCH_SIZE:    int = 256
    LEARNING_RATE: float = 0.001
```

## Keras의 CNN 모델 구현


```python
# Keras에서 사전 정의된 계층을 사용하여 네트워크 모델을 구축/정의
def cnn_model(input_shape=(32, 32, 3)):

    model = Sequential()

    #------------------------------------
    # Conv Block 1: 32 Filters, MaxPool.
    #------------------------------------
    model.add(Conv2D(filters=32, kernel_size=3, padding='same', activation='relu', input_shape=input_shape))
    model.add(Conv2D(filters=32, kernel_size=3, padding='same', activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))

    #------------------------------------
    # Conv Block 2: 64 Filters, MaxPool.
    #------------------------------------
    model.add(Conv2D(filters=64, kernel_size=3, padding='same', activation='relu'))
    model.add(Conv2D(filters=64, kernel_size=3, padding='same', activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))

    #------------------------------------
    # Conv Block 3: 64 Filters, MaxPool.
    #------------------------------------
    model.add(Conv2D(filters=64, kernel_size=3, padding='same', activation='relu'))
    model.add(Conv2D(filters=64, kernel_size=3, padding='same', activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))

    #------------------------------------
    # Flatten the convolutional features.
    #------------------------------------
    model.add(Flatten())
    model.add(Dense(512, activation='relu'))
    model.add(Dense(10, activation='softmax'))

    return model
```


```python
# 모델 생성
model = cnn_model()
model.summary()
```

    Model: "sequential"
    _________________________________________________________________
     Layer (type)                Output Shape              Param #   
    =================================================================
     conv2d (Conv2D)             (None, 32, 32, 32)        896       
                                                                     
     conv2d_1 (Conv2D)           (None, 32, 32, 32)        9248      
                                                                     
     max_pooling2d (MaxPooling2  (None, 16, 16, 32)        0         
     D)                                                              
                                                                     
     conv2d_2 (Conv2D)           (None, 16, 16, 64)        18496     
                                                                     
     conv2d_3 (Conv2D)           (None, 16, 16, 64)        36928     
                                                                     
     max_pooling2d_1 (MaxPoolin  (None, 8, 8, 64)          0         
     g2D)                                                            
                                                                     
     conv2d_4 (Conv2D)           (None, 8, 8, 64)          36928     
                                                                     
     conv2d_5 (Conv2D)           (None, 8, 8, 64)          36928     
                                                                     
     max_pooling2d_2 (MaxPoolin  (None, 4, 4, 64)          0         
     g2D)                                                            
                                                                     
     flatten (Flatten)           (None, 1024)              0         
                                                                     
     dense (Dense)               (None, 512)               524800    
                                                                     
     dense_1 (Dense)             (None, 10)                5130      
                                                                     
    =================================================================
    Total params: 669354 (2.55 MB)
    Trainable params: 669354 (2.55 MB)
    Non-trainable params: 0 (0.00 Byte)
    _________________________________________________________________



```python
# 모델 컴파일
model.compile(optimizer='rmsprop',
              loss='categorical_crossentropy',
              metrics=['accuracy'],
             )
```


```python
# 모델 학습
history = model.fit(X_train,
                    y_train,
                    batch_size=TrainingConfig.BATCH_SIZE,
                    epochs=TrainingConfig.EPOCHS,
                    verbose=1,
                    validation_split=.3,
                   )
```

    Epoch 1/31
    137/137 [==============================] - 10s 33ms/step - loss: 2.1757 - accuracy: 0.2045 - val_loss: 1.8987 - val_accuracy: 0.3151
    Epoch 2/31
    137/137 [==============================] - 3s 22ms/step - loss: 1.7648 - accuracy: 0.3590 - val_loss: 1.5809 - val_accuracy: 0.4207
    Epoch 3/31
    137/137 [==============================] - 3s 24ms/step - loss: 1.5269 - accuracy: 0.4414 - val_loss: 1.4883 - val_accuracy: 0.4513
    Epoch 4/31
    137/137 [==============================] - 3s 20ms/step - loss: 1.3787 - accuracy: 0.4998 - val_loss: 1.2668 - val_accuracy: 0.5461
    Epoch 5/31
    137/137 [==============================] - 3s 22ms/step - loss: 1.2518 - accuracy: 0.5522 - val_loss: 1.4190 - val_accuracy: 0.5347
    Epoch 6/31
    137/137 [==============================] - 3s 20ms/step - loss: 1.1300 - accuracy: 0.5980 - val_loss: 1.2235 - val_accuracy: 0.5575
    Epoch 7/31
    137/137 [==============================] - 3s 23ms/step - loss: 1.0162 - accuracy: 0.6351 - val_loss: 1.0210 - val_accuracy: 0.6428
    Epoch 8/31
    137/137 [==============================] - 3s 23ms/step - loss: 0.9169 - accuracy: 0.6729 - val_loss: 1.0173 - val_accuracy: 0.6393
    Epoch 9/31
    137/137 [==============================] - 3s 20ms/step - loss: 0.8276 - accuracy: 0.7073 - val_loss: 0.9755 - val_accuracy: 0.6617
    Epoch 10/31
    137/137 [==============================] - 3s 20ms/step - loss: 0.7387 - accuracy: 0.7380 - val_loss: 1.0000 - val_accuracy: 0.6583
    Epoch 11/31
    137/137 [==============================] - 3s 23ms/step - loss: 0.6525 - accuracy: 0.7714 - val_loss: 0.8477 - val_accuracy: 0.7123
    Epoch 12/31
    137/137 [==============================] - 3s 21ms/step - loss: 0.5736 - accuracy: 0.7949 - val_loss: 0.8547 - val_accuracy: 0.7181
    Epoch 13/31
    137/137 [==============================] - 3s 20ms/step - loss: 0.4931 - accuracy: 0.8284 - val_loss: 0.8719 - val_accuracy: 0.7163
    Epoch 14/31
    137/137 [==============================] - 3s 20ms/step - loss: 0.4135 - accuracy: 0.8527 - val_loss: 1.0511 - val_accuracy: 0.6809
    Epoch 15/31
    137/137 [==============================] - 3s 20ms/step - loss: 0.3460 - accuracy: 0.8793 - val_loss: 0.9708 - val_accuracy: 0.7279
    Epoch 16/31
    137/137 [==============================] - 3s 22ms/step - loss: 0.2758 - accuracy: 0.9017 - val_loss: 1.0801 - val_accuracy: 0.7189
    Epoch 17/31
    137/137 [==============================] - 3s 21ms/step - loss: 0.2205 - accuracy: 0.9243 - val_loss: 1.2581 - val_accuracy: 0.7067
    Epoch 18/31
    137/137 [==============================] - 3s 23ms/step - loss: 0.1828 - accuracy: 0.9383 - val_loss: 1.2623 - val_accuracy: 0.7232
    Epoch 19/31
    137/137 [==============================] - 3s 20ms/step - loss: 0.1508 - accuracy: 0.9497 - val_loss: 1.3480 - val_accuracy: 0.7129
    Epoch 20/31
    137/137 [==============================] - 3s 22ms/step - loss: 0.1192 - accuracy: 0.9602 - val_loss: 1.5366 - val_accuracy: 0.7155
    Epoch 21/31
    137/137 [==============================] - 3s 21ms/step - loss: 0.1080 - accuracy: 0.9648 - val_loss: 1.8424 - val_accuracy: 0.6703
    Epoch 22/31
    137/137 [==============================] - 3s 23ms/step - loss: 0.1006 - accuracy: 0.9684 - val_loss: 1.6001 - val_accuracy: 0.7140
    Epoch 23/31
    137/137 [==============================] - 3s 21ms/step - loss: 0.0938 - accuracy: 0.9692 - val_loss: 1.7790 - val_accuracy: 0.7189
    Epoch 24/31
    137/137 [==============================] - 3s 23ms/step - loss: 0.0870 - accuracy: 0.9727 - val_loss: 1.7076 - val_accuracy: 0.7322
    Epoch 25/31
    137/137 [==============================] - 3s 25ms/step - loss: 0.0740 - accuracy: 0.9761 - val_loss: 1.8602 - val_accuracy: 0.7165
    Epoch 26/31
    137/137 [==============================] - 3s 25ms/step - loss: 0.0711 - accuracy: 0.9773 - val_loss: 1.8184 - val_accuracy: 0.7195
    Epoch 27/31
    137/137 [==============================] - 3s 23ms/step - loss: 0.0630 - accuracy: 0.9802 - val_loss: 2.0117 - val_accuracy: 0.7183
    Epoch 28/31
    137/137 [==============================] - 3s 24ms/step - loss: 0.0676 - accuracy: 0.9795 - val_loss: 2.1262 - val_accuracy: 0.7027
    Epoch 29/31
    137/137 [==============================] - 3s 21ms/step - loss: 0.0605 - accuracy: 0.9802 - val_loss: 2.1155 - val_accuracy: 0.7218
    Epoch 30/31
    137/137 [==============================] - 3s 23ms/step - loss: 0.0598 - accuracy: 0.9811 - val_loss: 2.1629 - val_accuracy: 0.7207
    Epoch 31/31
    137/137 [==============================] - 3s 23ms/step - loss: 0.0604 - accuracy: 0.9815 - val_loss: 2.1921 - val_accuracy: 0.7115


## 훈련 결과 플로팅


```python
def plot_results(metrics, title=None, ylabel=None, ylim=None, metric_name=None, color=None):

    fig, ax = plt.subplots(figsize=(15, 4))

    if not (isinstance(metric_name, list) or isinstance(metric_name, tuple)):
        metrics = [metrics,]
        metric_name = [metric_name,]

    for idx, metric in enumerate(metrics):
        ax.plot(metric, color=color[idx])

    plt.xlabel("Epoch")
    plt.ylabel(ylabel)
    plt.title(title)
    plt.xlim([0, TrainingConfig.EPOCHS-1])
    plt.ylim(ylim)
    # Tailor x-axis tick marks
    ax.xaxis.set_major_locator(MultipleLocator(5))
    ax.xaxis.set_major_formatter(FormatStrFormatter('%d'))
    ax.xaxis.set_minor_locator(MultipleLocator(1))
    plt.grid(True)
    plt.legend(metric_name)
    plt.show()
    plt.close()
```


```python
# Retrieve training results.
train_loss = history.history["loss"]
train_acc  = history.history["accuracy"]
valid_loss = history.history["val_loss"]
valid_acc  = history.history["val_accuracy"]

plot_results([ train_loss, valid_loss ],
            ylabel="Loss",
            ylim = [0.0, 5.0],
            metric_name=["Training Loss", "Validation Loss"],
            color=["g", "b"]);

plot_results([ train_acc, valid_acc ],
            ylabel="Accuracy",
            ylim = [0.0, 1.0],
            metric_name=["Training Accuracy", "Validation Accuracy"],
            color=["g", "b"])
```


    
![png](/images/2024/05/2024-05-31-02-output_17_0.png)
    



    
![png](/images/2024/05/2024-05-31-02-output_17_1.png)
    


## 모델에 드롭아웃 추가


```python
def cnn_model_dropout(input_shape=(32, 32, 3)):

    model = Sequential()

    #------------------------------------
    # Conv Block 1: 32 Filters, MaxPool.
    #------------------------------------
    model.add(Conv2D(filters=32, kernel_size=3, padding='same', activation='relu', input_shape=input_shape))
    model.add(Conv2D(filters=32, kernel_size=3, padding='same', activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    #------------------------------------
    # Conv Block 2: 64 Filters, MaxPool.
    #------------------------------------
    model.add(Conv2D(filters=64, kernel_size=3, padding='same', activation='relu'))
    model.add(Conv2D(filters=64, kernel_size=3, padding='same', activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    #------------------------------------
    # Conv Block 3: 64 Filters, MaxPool.
    #------------------------------------
    model.add(Conv2D(filters=64, kernel_size=3, padding='same', activation='relu'))
    model.add(Conv2D(filters=64, kernel_size=3, padding='same', activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    #------------------------------------
    # Flatten the convolutional features.
    #------------------------------------
    model.add(Flatten())
    model.add(Dense(512, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(10, activation='softmax'))

    return model
```


```python
# 모델 생성
model_dropout = cnn_model_dropout()
model_dropout.summary()
```

    Model: "sequential_1"
    _________________________________________________________________
     Layer (type)                Output Shape              Param #   
    =================================================================
     conv2d_6 (Conv2D)           (None, 32, 32, 32)        896       
                                                                     
     conv2d_7 (Conv2D)           (None, 32, 32, 32)        9248      
                                                                     
     max_pooling2d_3 (MaxPoolin  (None, 16, 16, 32)        0         
     g2D)                                                            
                                                                     
     dropout (Dropout)           (None, 16, 16, 32)        0         
                                                                     
     conv2d_8 (Conv2D)           (None, 16, 16, 64)        18496     
                                                                     
     conv2d_9 (Conv2D)           (None, 16, 16, 64)        36928     
                                                                     
     max_pooling2d_4 (MaxPoolin  (None, 8, 8, 64)          0         
     g2D)                                                            
                                                                     
     dropout_1 (Dropout)         (None, 8, 8, 64)          0         
                                                                     
     conv2d_10 (Conv2D)          (None, 8, 8, 64)          36928     
                                                                     
     conv2d_11 (Conv2D)          (None, 8, 8, 64)          36928     
                                                                     
     max_pooling2d_5 (MaxPoolin  (None, 4, 4, 64)          0         
     g2D)                                                            
                                                                     
     dropout_2 (Dropout)         (None, 4, 4, 64)          0         
                                                                     
     flatten_1 (Flatten)         (None, 1024)              0         
                                                                     
     dense_2 (Dense)             (None, 512)               524800    
                                                                     
     dropout_3 (Dropout)         (None, 512)               0         
                                                                     
     dense_3 (Dense)             (None, 10)                5130      
                                                                     
    =================================================================
    Total params: 669354 (2.55 MB)
    Trainable params: 669354 (2.55 MB)
    Non-trainable params: 0 (0.00 Byte)
    _________________________________________________________________



```python
model_dropout.compile(optimizer='rmsprop',
                      loss='categorical_crossentropy',
                      metrics=['accuracy'],
                     )
```


```python
history = model_dropout.fit(X_train,
                            y_train,
                            batch_size=TrainingConfig.BATCH_SIZE,
                            epochs=TrainingConfig.EPOCHS,
                            verbose=1,
                            validation_split=.3,
                           )
```

    Epoch 1/31
    137/137 [==============================] - 8s 34ms/step - loss: 2.1466 - accuracy: 0.2049 - val_loss: 2.0399 - val_accuracy: 0.2543
    Epoch 2/31
    137/137 [==============================] - 5s 36ms/step - loss: 1.8586 - accuracy: 0.3310 - val_loss: 1.6229 - val_accuracy: 0.4019
    Epoch 3/31
    137/137 [==============================] - 4s 27ms/step - loss: 1.6434 - accuracy: 0.4079 - val_loss: 1.4500 - val_accuracy: 0.4736
    Epoch 4/31
    137/137 [==============================] - 4s 28ms/step - loss: 1.4957 - accuracy: 0.4597 - val_loss: 1.3105 - val_accuracy: 0.5251
    Epoch 5/31
    137/137 [==============================] - 4s 26ms/step - loss: 1.3728 - accuracy: 0.5065 - val_loss: 1.3360 - val_accuracy: 0.5172
    Epoch 6/31
    137/137 [==============================] - 4s 30ms/step - loss: 1.2613 - accuracy: 0.5488 - val_loss: 1.3085 - val_accuracy: 0.5423
    Epoch 7/31
    137/137 [==============================] - 4s 26ms/step - loss: 1.1760 - accuracy: 0.5827 - val_loss: 1.0483 - val_accuracy: 0.6257
    Epoch 8/31
    137/137 [==============================] - 4s 29ms/step - loss: 1.1000 - accuracy: 0.6099 - val_loss: 0.9638 - val_accuracy: 0.6559
    Epoch 9/31
    137/137 [==============================] - 4s 28ms/step - loss: 1.0316 - accuracy: 0.6346 - val_loss: 0.9656 - val_accuracy: 0.6584
    Epoch 10/31
    137/137 [==============================] - 4s 29ms/step - loss: 0.9723 - accuracy: 0.6551 - val_loss: 0.9065 - val_accuracy: 0.6806
    Epoch 11/31
    137/137 [==============================] - 4s 29ms/step - loss: 0.9263 - accuracy: 0.6726 - val_loss: 0.8328 - val_accuracy: 0.7091
    Epoch 12/31
    137/137 [==============================] - 4s 29ms/step - loss: 0.8802 - accuracy: 0.6909 - val_loss: 0.8497 - val_accuracy: 0.7026
    Epoch 13/31
    137/137 [==============================] - 4s 28ms/step - loss: 0.8335 - accuracy: 0.7038 - val_loss: 0.8664 - val_accuracy: 0.6953
    Epoch 14/31
    137/137 [==============================] - 4s 26ms/step - loss: 0.8004 - accuracy: 0.7174 - val_loss: 0.8244 - val_accuracy: 0.7139
    Epoch 15/31
    137/137 [==============================] - 4s 29ms/step - loss: 0.7768 - accuracy: 0.7269 - val_loss: 0.7989 - val_accuracy: 0.7231
    Epoch 16/31
    137/137 [==============================] - 4s 29ms/step - loss: 0.7370 - accuracy: 0.7401 - val_loss: 0.7107 - val_accuracy: 0.7546
    Epoch 17/31
    137/137 [==============================] - 4s 26ms/step - loss: 0.7163 - accuracy: 0.7487 - val_loss: 0.7445 - val_accuracy: 0.7460
    Epoch 18/31
    137/137 [==============================] - 4s 29ms/step - loss: 0.6881 - accuracy: 0.7579 - val_loss: 0.6884 - val_accuracy: 0.7600
    Epoch 19/31
    137/137 [==============================] - 4s 27ms/step - loss: 0.6670 - accuracy: 0.7633 - val_loss: 0.6727 - val_accuracy: 0.7661
    Epoch 20/31
    137/137 [==============================] - 4s 26ms/step - loss: 0.6448 - accuracy: 0.7722 - val_loss: 0.7363 - val_accuracy: 0.7433
    Epoch 21/31
    137/137 [==============================] - 4s 28ms/step - loss: 0.6266 - accuracy: 0.7790 - val_loss: 0.6804 - val_accuracy: 0.7686
    Epoch 22/31
    137/137 [==============================] - 4s 29ms/step - loss: 0.6086 - accuracy: 0.7865 - val_loss: 0.6885 - val_accuracy: 0.7609
    Epoch 23/31
    137/137 [==============================] - 4s 26ms/step - loss: 0.5923 - accuracy: 0.7921 - val_loss: 0.7677 - val_accuracy: 0.7401
    Epoch 24/31
    137/137 [==============================] - 4s 28ms/step - loss: 0.5711 - accuracy: 0.7998 - val_loss: 0.7026 - val_accuracy: 0.7614
    Epoch 25/31
    137/137 [==============================] - 4s 28ms/step - loss: 0.5580 - accuracy: 0.8035 - val_loss: 0.6414 - val_accuracy: 0.7824
    Epoch 26/31
    137/137 [==============================] - 4s 29ms/step - loss: 0.5387 - accuracy: 0.8097 - val_loss: 0.7137 - val_accuracy: 0.7622
    Epoch 27/31
    137/137 [==============================] - 4s 26ms/step - loss: 0.5267 - accuracy: 0.8132 - val_loss: 0.6783 - val_accuracy: 0.7748
    Epoch 28/31
    137/137 [==============================] - 4s 29ms/step - loss: 0.5143 - accuracy: 0.8167 - val_loss: 0.6377 - val_accuracy: 0.7879
    Epoch 29/31
    137/137 [==============================] - 4s 29ms/step - loss: 0.5033 - accuracy: 0.8238 - val_loss: 0.6172 - val_accuracy: 0.7927
    Epoch 30/31
    137/137 [==============================] - 4s 28ms/step - loss: 0.4858 - accuracy: 0.8275 - val_loss: 0.6394 - val_accuracy: 0.7884
    Epoch 31/31
    137/137 [==============================] - 4s 27ms/step - loss: 0.4810 - accuracy: 0.8299 - val_loss: 0.6545 - val_accuracy: 0.7846


## 드롭아웃이 적용된 훈련 결과 플로팅


```python
# Retrieve training results.
train_loss = history.history["loss"]
train_acc  = history.history["accuracy"]
valid_loss = history.history["val_loss"]
valid_acc  = history.history["val_accuracy"]

plot_results([ train_loss, valid_loss ],
            ylabel="Loss",
            ylim = [0.0, 5.0],
            metric_name=["Training Loss", "Validation Loss"],
            color=["g", "b"]);

plot_results([ train_acc, valid_acc ],
            ylabel="Accuracy",
            ylim = [0.0, 1.0],
            metric_name=["Training Accuracy", "Validation Accuracy"],
            color=["g", "b"])
```


    
![png](/images/2024/05/2024-05-31-02-output_24_0.png)
    



    
![png](/images/2024/05/2024-05-31-02-output_24_1.png)
    



```python
# 모델 저장
model_dropout.save('model_dropout')
```


```python
from tensorflow.keras import models
reloaded_model_dropout = models.load_model('model_dropout')
```


```python
# 테스트 데이터 세트에서 모델 평가
test_loss, test_acc = reloaded_model_dropout.evaluate(X_test, y_test)
print(f"Test accuracy: {test_acc*100:.3f}")
```

    313/313 [==============================] - 2s 5ms/step - loss: 0.6712 - accuracy: 0.7822
    Test accuracy: 78.220


## 샘플 테스트 이미지 예측


```python
def evaluate_model(dataset, model):

    class_names = ['airplane',
                   'automobile',
                   'bird',
                   'cat',
                   'deer',
                   'dog',
                   'frog',
                   'horse',
                   'ship',
                   'truck' ]
    num_rows = 3
    num_cols = 6

    # Retrieve a number of _images/2024/05 from the dataset.
    data_batch = dataset[0:num_rows*num_cols]

    # Get predictions from model.
    predictions = model.predict(data_batch)

    plt.figure(figsize=(20, 8))
    num_matches = 0

    for idx in range(num_rows*num_cols):
        ax = plt.subplot(num_rows, num_cols, idx + 1)
        plt.axis("off")
        plt.imshow(data_batch[idx])

        pred_idx = tf.argmax(predictions[idx]).numpy()
        truth_idx = np.nonzero(y_test[idx])

        title = str(class_names[truth_idx[0][0]]) + " : " + str(class_names[pred_idx])
        title_obj = plt.title(title, fontdict={'fontsize':13})

        if pred_idx == truth_idx:
            num_matches += 1
            plt.setp(title_obj, color='g')
        else:
            plt.setp(title_obj, color='r')

        acc = num_matches/(idx+1)
    print("Prediction accuracy: ", int(100*acc)/100)

    return
```


```python
evaluate_model(X_test, reloaded_model_dropout)
```

    1/1 [==============================] - 0s 289ms/step
    Prediction accuracy:  0.83



    
![png](/images/2024/05/2024-05-31-02-output_30_1.png)
    



### References
https://learnopencv.com/implementing-cnn-tensorflow-keras/