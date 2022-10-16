---
title : '[DL/BASIC] 케라스 사용법 : 모델 구축을 위한 기본기 🛠️'
layout: single
---

# 5. 케라스 사용법 : 여러가지 모델 구축하기

#### 케라스를 사용하는데에 **'올바른'** 한가지 방법만 있는 것은 아니다. 이어지는 글들에서 다루게 될 컴퓨터 비전 뿐만 아니라 시계열 예측, 자연어처리, 생성딥러닝에 대한 모델을 구축하기 위해서는 케라스 API의 사용법을 완전히 익혀야한다. 이번 글에서는 케라스의 사용법을 알아본다.

### 5.1 케라스 모델을 만드는 여러 방법
케라스에서 모델을 만드는 API는 단계별로 세가지가 있다.

#### 5.1.1 Sequential 모델
Sequential 모델을 사용하는 것은 케라스 모델을 만드는 가장 간단한 방법이다.




```python
from tensorflow import keras
from tensorflow.keras import layers

model = keras.Sequential([
    layers.Dense(64, activation="relu"),
    layers.Dense(10, activation="softmax")])

```

층은 처음 호출될 때 만들어진다. 층의 가중치 크기가 입력 크기에 따라 달라지기 때문이다. 즉 ,입력 크기를 알기 전까지 가중치를 만들 수 없다. 가중치를 생성하려면 어떤 데이터로 호출하거나 입력 크기를 지정해서 build( ) 메서드를 호출해야한다.


```python
model.build(input_shape = (None,3)) #이제 모델은 크기가 (3,)인 샘플을 기대. None은 어떤 배치 크기도 가능하다는 뜻이
model.weights # 이제 모델의 가중치 확인 가능
```

build( ) 메서드가 호출된 후 디버깅에 유용한 summary( ) 메서드를 사용하여 모델 구조를 출력할 수 있다.


```python
model.summary()
```

    Model: "sequential"
    _________________________________________________________________
     Layer (type)                Output Shape              Param #   
    =================================================================
     dense (Dense)               (None, 64)                256       
                                                                     
     dense_1 (Dense)             (None, 10)                650       
                                                                     
    =================================================================
    Total params: 906
    Trainable params: 906
    Non-trainable params: 0
    _________________________________________________________________


Sequential 모델의 가중치를 바로 생성하는 방법이 있다. **Input 클래스**를 사용해서 모델의 입력 크기를 미리 지정하면 된다.


```python
model = keras.Sequential()
model.add(keras.Input(shape=(3,))) # Input 클래스 사용
model.add(layers.Dense(64, activation="relu"))
model.summary()
```

    Model: "sequential_1"
    _________________________________________________________________
     Layer (type)                Output Shape              Param #   
    =================================================================
     dense_2 (Dense)             (None, 64)                256       
                                                                     
    =================================================================
    Total params: 256
    Trainable params: 256
    Non-trainable params: 0
    _________________________________________________________________


#### 5.1.2 함수형 API
Sequential 모델은 사용하기 쉽지만 적용할 곳이 극히 제한적이다. 다중 입력과 다중 출력 또는 비선형적인 구조를 가진 모델을 구축하는 것은 함수형 API를 많이 사용한다. 간단한 함수형 API 모델 코드부터 시작해보자.


```python
inputs = keras.Input(shape=(3,),name='my_input')
features = layers.Dense(64,activation='relu')(inputs)
outputs = layers.Dense(10,activation='softmax')(features)
model = keras.Model(inputs=inputs,outputs=outputs)
```

#### 다중 입력, 다중 출력 모델

위의 간단한 모델과 달리 대부분 딥러닝 모델은 입력이 여러개이거나 출력이 여러개이다. 예를 들어서 고객 이슈 티켓에 우선순위를 정하고, 적절한 부서로 전달하는 시스템을 만드는 모델을 구축해보자.

이 모델은 3개의 입력을 사용한다.


*   이슈 티켓의 입력 (텍스트 입력)
*   이슈 티켓의 텍스트 본문 (텍스트 입력)
*   시영지기 츠기힌 태그 (범주형 입력 - 원핫인코딩 가정)

(*텍스트 인코딩 기법은 다루지 않는다.*)

이 모델의 출력은 2개다.


*   이슈 티켓의 우선순위 점수 (0과 1 사이의 스칼라) (시그모이드 출력)
*   이슈 티켓을 처리할 부서 (전체 부서 집합에 대한 소프트맥스 출력)


>




```python
vocabulary_size = 10000
num_tags = 100
num_departments = 4

title = keras.Input(shape=(vocabulary_size,),name='title') # 모델의 입력 정의 1
text_body = keras.Input(shape=(vocabulary_size,),name='text_body') # 모델의 입력 정의 2
tags = keras.Input(shape=(num_tags,),name='tags') # 모델의 입력 정의 3

features = layers.Concatenate()([title,text_body,tags]) # 입력 특성을 하나의 features로 연결
features = layers.Dense(64,activation='relu')(features) # 중간층을 적용 -> 입력 특성을 더 풍부한 표현으로 재결합

priority = layers.Dense(1,activation='sigmoid',name='priority')(features) # 모델의 출력 정의 1
department = layers.Dense(num_departments,activation='softmax',name='department')(features) # 모델의 출력 정의 2

model = keras.Model(inputs = [title,text_body,tags],
                    outputs = [priority,department]) # 입력과 출력 지정하여 모델 구축
                    
```

**다중 입력 , 다중 출력 모델 훈련**

Sequential 모델을 훈련하는 것과 거의 같은 방법으로 함수형 API 모델을 훈련할 수 있다. 입력과 출력 데이터의 리스트로 fit( ) 메서드를 호출하면 된다. 데이터의 리스트는 Model 클래스에 전달한 순서와 같아야 한다.


```python

'''title_data,text_body,tags_data 입력데이터와
priortiy_data , department_data 출력 데이터가 존재한다고 가정하고'''

model.compile(optimizer='rmsprop',loss=['mean_squared_loss,categorical_crossentropy'],
              metrics = [['mean_absoulte_error'],['accuracy']])
model.fit([title_data, text_body_data, tags_data],
          [priority_data, department_data],
          epochs=1)
model.evaluate([title_data, text_body_data, tags_data],
               [priority_data, department_data])
priority_preds, department_preds = model.predict([title_data, text_body_data, tags_data])
```

입력 순서를 신경쓰고 싶지 않다면 Input 객체와 출력 층에 부여한 이름을 활용해서 데이터를 딕셔너리로 전달하면 된다. 


```python
model.compile(optimizer="rmsprop",
              loss={"priority": "mean_squared_error", "department": "categorical_crossentropy"},
              metrics={"priority": ["mean_absolute_error"], "department": ["accuracy"]})
model.fit({"title": title_data, "text_body": text_body_data, "tags": tags_data},
          {"priority": priority_data, "department": department_data},
          epochs=1)
model.evaluate({"title": title_data, "text_body": text_body_data, "tags": tags_data},
               {"priority": priority_data, "department": department_data})
priority_preds, department_preds = model.predict(
    {"title": title_data, "text_body": text_body_data, "tags": tags_data})
```

#### 함수형 API 장점 : 층 연결 구조 활용하기
함수형 모델은 명시적인 그래프 데이터 구조이기 때문에 층이 어떻게 연결되어 있는지 조사하고 , 이전 그래프 노드를 새 모델의 일부로 재사용이 가능하다. 이를 통해 **모델 시각화**와 **특성 추출**이라는 중요한 기능들이 가능하다. plot_model( ) 함수를 사용해서 그래프로 그릴수 있다.


```python
keras.utils.plot_model(model,'ticket_classifier_with_shape.png',show_shapes=True)
```




    
![10-16-first](https://user-images.githubusercontent.com/77332628/196033530-10020b81-2ce5-4fd5-9e9a-ea3bca0c868e.png)
    



층 연결 구조를 참조해서 그래프에 있는 개별 노드를 조사하고 재사용(층 호출)할 수 있다. model.layers 속성은 모델에 있는 층의 리스틀 가지고 있다. 각층에 대해 layer.input과 layer.output을 출력해 볼 수 있다.


```python
model.layers
```




    [<keras.engine.input_layer.InputLayer at 0x7f3eadd2ad50>,
     <keras.engine.input_layer.InputLayer at 0x7f3eadcd9690>,
     <keras.engine.input_layer.InputLayer at 0x7f3eadcd8690>,
     <keras.layers.merging.concatenate.Concatenate at 0x7f3eae373990>,
     <keras.layers.core.dense.Dense at 0x7f3eaf06d8d0>,
     <keras.layers.core.dense.Dense at 0x7f3eaf141d90>,
     <keras.layers.core.dense.Dense at 0x7f3eadd2e8d0>]




```python
model.layers[3].input # 4번째 층의 입력
```




    [<KerasTensor: shape=(None, 10000) dtype=float32 (created by layer 'title')>,
     <KerasTensor: shape=(None, 10000) dtype=float32 (created by layer 'text_body')>,
     <KerasTensor: shape=(None, 100) dtype=float32 (created by layer 'tags')>]




```python
model.layers[3].output # 4번째 층의 출력
```




    <KerasTensor: shape=(None, 20100) dtype=float32 (created by layer 'concatenate')>



이를 통해 특성 추출을 수행해서 다른 모델에서 중간 특성을 재사용하는 모델을 만들 수도 있다.

이전 모델에 또 다른 출력을 추가해보자. 이슈 티켓이 해결되는 난이도를 추정해보려한다. 모델을 처음부터 만들 필요없이 이전 모델의 중간 특성에서 시작할 수 있다.


```python
features = model.layers[4].output # 중간 Dense층 호출
difficulty = layers.Dense(3,activation='softmax',name='difficulty')(features) #새로운 출력 추가
new_model = keras.Model(
    inputs = [title,text_body,tags],
    outputs = [priority,department,difficulty] #출력이 3개인 새로운 모델 구축
)
```

새로운 모델의 그래프를 출력해보자


```python
keras.utils.plot_model(new_model,'updated_ticket_classifier.png',show_shapes=True)
```




    
![10-16-second](https://user-images.githubusercontent.com/77332628/196033533-8437b922-33df-464d-ae4d-97b098771bbf.png)
    



#### Model 서브클래싱
케라스 모델을 만드는 가장 고급 방법이다. Model 클래스를 상속해서 사용자 정의 모델을 만드는 것이다. 즉, 모델을 바닥부터 구축하는 것이다. 이 방법은 새로운 모델을 개발하려는 개발자들이 사용하는 방법이라고 생각하기 때문에 이 글에서는 다루지 않는다.


### 5.2 콜백 사용하기
콜백은 fit( ) 메서드 호출 시 모델에 전달되는 객체이다. 훈련하는 동안 모델은 여러 지점에서 콜백을 호출한다. 콜백은 모델의 상태와 성능에 대한 정보에 접근하고 다음의 여러가지를 처리할 수 있다.



*   모델 체크포인트 저장 : 훈련하는 동안 어떤 지점에서 모델의 현재 가중치를 저장한다.
*   조기 종료 : 검증 손실이 더 좋아지지 않을 때 훈련을 중지한다. 
*   훈련하는 동안 하이퍼파라미터 값을 동적으로 조정
*   훈련과 검증 지표를 로그에 기록하거나 모델이 학습한 표현이 업데이트 될때마다 시각화

#### 5.2.1 ModelCheckpoint와 EarlyStopping 콜백
검증 손실이 더 이상 향상되지 않을 때 훈련을 멈추면 모델을 일단 과대적합 시키고 최적의 에포크 수로 다시 훈련하는 귀찮은 일을 안해도 된다. EarlyStopping 콜백을 사용해서 이를 구현할 수 있다.

EarlyStopping 콜백은 정해진 에포크 동안 모니터링 지표가 향상되지 않을 때 훈련을 중지한다. 일반적으로 훈련하는 동안 모델을 계속 저장하는 ModelCheckpoing 콜백과 함께 사용한다. (선택적으로 지금까지 가장 좋은 모델만 저장할 수 있다.)



```python
''' 재사용할 모델 구축 함수'''
def get_mnist_model():
    inputs = keras.Input(shape=(28 * 28,))
    features = layers.Dense(512, activation="relu")(inputs)
    features = layers.Dropout(0.5)(features)
    outputs = layers.Dense(10, activation="softmax")(features)
    model = keras.Model(inputs, outputs)
    return model
'''재사용할 모델 구축 함수'''

callbacks_list = [         # fit() 메서드의 callbacks 매개변수에 콜백의 리스트를 전달
    keras.callbacks.EarlyStopping(
        monitor = 'val_accuracy',# 모델의 검증 정확도를 모니터링
        patience = 2 # 두번의 에포크 동안 정확도가 향상되지 않으면 훈련 중단
    ),
    keras.callbacks.ModelCheckpoint(
        filepath = 'checkpoint_path.keras', # 모델 파일의 저장 경로
        monitor = 'val_loss', # val_loss가 좋아지지 않으면 새로운 모델을 덮어씀
        save_best_only = True 
    )
]
model = get_mnist_model() # 모델 구축
model.compile(optimizer="rmsprop", 
              loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])
model.fit(train_images, train_labels, # fit() 메서드의 callbacks 매개변수에 콜백의 리스트를 전달
          epochs=10,
          callbacks=callbacks_list, 
          validation_data=(val_images, val_labels))
```

저장된 모델은 다음 코드와 같이 로드할 수 있다.


```python
model = keras.models.load_model('checkpoint_path.keras')
```

✅ 케라스는 복잡성의 단계적 공개 원칙을 기반으로 하기 때문에 사용자 지정 훈련루프와 사용자 지정 평가 루프를 만들어서 모델에 사용할 수 있을 뿐만 아니라 사용자 지정 콜백함수도 만들어서 사용할 수 있다. 하지만 새로운 모델을 연구하는 개발자들이 아닌 이상 케라스에서 기본적으로 제공하는 fit( )과 evaluate( ) 메서드를 사용하는 것만으로 충분하고 , 기본적으로 제공하는 콜백함수들만 사용해서 모델을 구축해도 충분하다고 생각해서 사용자 지정 훈련,평가,콜백 함수는 다루지 않는다.  
