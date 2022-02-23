

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

### 딥러닝 실행 

```python
# 딥러닝 구조를 결정합니다(모델을 설정하고 실행하는 부분)
model = Sequential()
# relu & sigmond 활성화함수
# (입력된 데이터의 가중합 -> 출력신호로 변환)
model.add(Dense(30, input_dim=17, activation='relu'))  # 입력층 노드 17개
                                                      # 은닉층1 노드 30개
model.add(Dense(1, activation='sigmoid'))              # 출력층 노드 1개
```



```python
# 딥러닝을 실행합니다.
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

# 모델 학습 (결과값 생략)
model.fit(X, Y, epochs=100, batch_size=10) 
```
