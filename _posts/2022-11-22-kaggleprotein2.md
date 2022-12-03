---
title: '[Kaggle/CV] Protein Atlas - 한 단계 발전된 모델 🔬'
toc: true
toc_sticky: true
categories:
  - kaggle-imageclassification
---
## 2. Protein Atlas

### 2.0 들어가며

[**저번 글**](https://haminchang.github.io/kaggle/kaggleprotein1/)에서는 Protein Atlas 문제를 풀기 위한 베이스라인 모델을 만들었는지만 의미있는 성능을 보여주지는 못했다. 이번 글에서는 한 단계 발전한 모델을 만들어서 Protein Atlas 문제가 의도하는대로 문제를 풀 수 있는 모델을 구축해 볼 것이다.

### 2.1 타깃 wish list 만들기

모든 타깃값을 예측하기는 어렵기 때문에 한발짝 물러서서 일단 가장 흔하게 나타나는 클래스들인 nucleoplasm, cytosol, plasma membrane을 예측해보자. 



```python
wishlist = ['Nucleoplasm','Cytosol','Plasma membrane']
```

타깃 wishlist를 위한 datagenerator를 정의한다. 베이스라인 모델의 DataGenerator 클래스를 overwrite해서 새로운 datagenerator를 정의할건데, 타깃 wishlist를 위한 datagenerator를 만들어야 하기 때문에 베이스라인의 DataGenerator 클래스f get_targets_per_image를 새로 정의해서 새로운 datagenerator를 만든다.


```python
class ImprovedDataGenerator(DataGenerator):
    # 베이스라인의 DataGenerator와 다르게 init에 target wishlist를 추가
    def __init__(self, list_IDs, labels, modelparameter, imagepreprocessor, target_wishlist):
        super().__init__(list_IDs, labels, modelparameter, imagepreprocessor)
        self.target_wishlist = target_wishlist
        
    def get_targets_per_image(self, identifier):
        return self.labels.loc[self.labels.Id==identifier][self.target_wishlist].values

```

### 2.2 여러가지 features 추가하기

#### 2.2.1 평가 지표 추가하기

우리는 베이스라인 모델에서 accuracy 점수는 모델이 얼마나 정확한 예측을 했는지 알 수 있는 지표가 아니라는 것을 알았다. F1 macro score 지표를 추가할건데, 이는 다중 클래스 문제에 사용하는 F1 지표라고 생각하면 된다. 하지만 F1 macro score는 클래스의 비중에 관계없이 평균 지표를 내는데, 이는 클래스의 비율의 편차가 큰 이번 데이터셋에서는 좋은 방법은 아닌것 같기 때문에, F1 min 또는 F1 max와 F1 std를 추가로 사용해볼 것이다.


```python
import keras.backend as K

def base_f1(y_true, y_pred):
    y_pred = K.round(y_pred)
    tp = K.sum(K.cast(y_true*y_pred, 'float'),axis=0)
    tn = K.sum(K.cast((1-y_true)*(1-y_pred),'float'),axis=0)
    fp = K.sum(K.cast((1-y_true)*y_pred, 'float'),axis=0)
    fn = K.sum(K.cast(y_true * (1-y_pred), 'float'), axis=0)
    
    precision = tp / (tp+fp+K.epsilon())
    recall = tp / (tp+fn+K.epsilon())
    
    f1 = 2 * precision * recall / (precision + recall + K.epsilon())
    f1 = tf.where(tf.is_nan(f1), tf.zeros_like(f1), f1)
    return f1

def f1_min(y_true, y_pred):
    f1 = base_f1(y_true, y_pred)
    return K.min(f1)

def f1_max(y_true, y_pred):
    f1 = base_f1(y_true, y_pred)
    return K.max(f1)

def f1_mean(y_true, y_pred):
    f1 = base_f1(y_true, y_pred)
    return K.mean(f1)

def f1_std(y_true, y_pred):
    f1 = base_f1(y_true, y_pred)
    return K.std(f1)
```

#### 2.2.2 손실 추적하며 epochs 조절하기
더 좋은 성능의 모델을 만들기 위해서는 최적의 epochs 수를 알아야한다. 최소한 epochs 수가 너무 적어서 가중치 업데이트를 다 못하지는 않아야한다. 그래서 손실을 추적하는 클래스를 만들어서 손실이 줄어드는지 추적할 수 있도록 해보자.


```python
class TrackHistory(keras.callbacks.Callback):
    def on_train_begin(self, logs={}):
        self.losses = []
        
    def on_batch_end(self, batch, logs={}):
        self.losses.append(logs.get('loss'))
```

위에서 정의한 손실 추적 클래스를 사용한 새로운 모델 클래스를 정의한다.


```python
class ImprovedModel(BaseLineModel):
    def __init__(self, modelparameter, use_dropout, my_metrics = [f1_mean,f1_min,f1_max,f1_std]):
        super().__init__(modelparameter)
        self.my_metrics = my_metrics
        self.use_dropout = use_dropout
        
    def learn(self):
        self.history = TrackHistory()
        return self.model.fit_generator(generator=self.training_generator,
                                       validataion_data=self.validation_generator,
                                       epochs = self.params.n_epochs,
                                       use_multiprocessing=True,
                                       workers =8,
                                       callbacks=[self.history])
    
    def build_model(self):
        self.model = Sequential()
        self.model.add(Conv2D(16, kernel_size=(3, 3), activation='relu', input_shape=self.input_shape,
                             kernel_initializer=VarianceScaling(seed=0),))
        self.model.add(Conv2D(32, (3, 3), activation='relu',
                             kernel_initializer=VarianceScaling(seed=0),))
        self.model.add(MaxPooling2D(pool_size=(2, 2)))
        if self.use_dropout:
            self.model.add(Dropout(0.25))
        self.model.add(Flatten())
        self.model.add(Dense(64, activation='relu',
                            kernel_initializer=VarianceScaling(seed=0),))
        if self.use_dropout:
            self.model.add(Dropout(0.5))
        self.model.add(Dense(self.num_classes, activation='sigmoid'))
```

베이스라인 모델보다 더 많은 가중치 업데이트를 통해 더 많은 훈련을 모델이 하기 위해 더 큰 epochs수와 작은 batch_size를 사용해보자.


```python
parameter = ModelParameter(train_path, num_classes=(wishlist),n_epochs=5,
                          batch_size=64)
preprocessor = ImagePreprocessor(parameter)
labels = train_labels
```

이제 발전된 모델을 위한 데이터 generator를 준비하고 모델을 compile하고 본격적인 훈련을 해보자.


```python
training_generator = ImprovedDataGenerator(partition['train'],labels,parameter,preprocessor,wishlist)
validation_generator = ImprovedDataGenerator(partition['validation'],
                                            labels,parameter,preprocessor,wishlist)
predict_generator = PredictGenerator(partition['validation'],preprocessor,train_path)

test_preprocessor = ImagePreprocessor(parameter)
submission_predict_generator = PredictGenerator(test_names, test_preprocessor, test_path)
```


```python

if kernelsettings.fit_improved_baseline == True:
    model = ImprovedModel(parameter, use_dropout=use_dropout)
    model.build_model()
    model.compile_model()
    model.set_generators(training_generator, validation_generator)
    epoch_history = model.learn()
    proba_predictions = model.predict(predict_generator)
    #model.save("improved_model.h5")
    
    improved_proba_predictions = pd.DataFrame(proba_predictions, columns=wishlist)
    improved_proba_predictions.to_csv("improved_predictions.csv")
    improved_losses = pd.DataFrame(epoch_history.history["loss"], columns=["train_loss"])
    improved_losses["val_loss"] = epoch_history.history["val_loss"]
    improved_losses.to_csv("improved_losses.csv")
    improved_batch_losses = pd.DataFrame(model.history.losses, columns=["batch_losses"])
    improved_batch_losses.to_csv("improved_batch_losses.csv")
    
    improved_submission_proba_predictions = model.predict(submission_predict_generator)
    improved_test_labels = test_labels.copy()
    improved_test_labels.loc[:, wishlist] = improved_submission_proba_predictions
    improved_test_labels.to_csv("improved_submission_proba.csv")
# 시간을 아끼기 위해 False로 설정해서 이미 훈련된 csv 사용
else:
    improved_proba_predictions = pd.read_csv("../input/proteinatlaseabpredictions/improved_predictions.csv", index_col=0)
    improved_losses= pd.read_csv("../input/proteinatlaseabpredictions/improved_losses.csv", index_col=0)
    improved_batch_losses = pd.read_csv("../input/proteinatlaseabpredictions/improved_batch_losses.csv", index_col=0)
    improved_test_labels = pd.read_csv("../input/proteinatlaseabpredictions/improved_submission_proba.csv",index_col=0)
```

모델이 훈련한 손실을 그래프로 시각화해보자.


```python
fig, ax = plt.subplots(2,1,figsize=(20,13))
ax[0].plot(np.arange(1,6), improved_losses["train_loss"].values, 'r--o', label="train_loss")
ax[0].plot(np.arange(1,6), improved_losses["val_loss"].values, 'g--o', label="validation_loss")
ax[0].set_xlabel("Epoch")
ax[0].set_ylabel("Loss")
ax[0].set_title("Loss evolution per epoch")
ax[0].legend()
ax[1].plot(improved_batch_losses.batch_losses.values, 'r-+', label="train_batch_losses")
ax[1].set_xlabel("Number of update steps in total")
ax[1].set_ylabel("Train loss")
ax[1].set_title("Train loss evolution per batch");
```


    
![protein2_1](https://user-images.githubusercontent.com/77332628/203475800-1221f0c7-f464-459c-ae0d-5537612c98bc.png)
    


우리는 훈련 배치 사이즈를 줄이면서 훈련 스텝(learning rate)를 크게 했다. 그 결과 빠른 훈련 속도를 얻을 수 있었다. 하지만 배치 크기를 줄였기 때문에 모델이 gradient를 훈련할 수 있는 데이터 수가 적었고 그 결과 모델이 충분한 학습을 하지 못했다. 그리고 훈련의 스텝이 너무 커서 손실의 최소값을 얻을 수 있는 지역을 찾지 못했다. 그럼 모델이 학습을 시작하기는 한 걸까? 한번 확인해보자. 


```python
fig, ax = plt.subplots(3,1,figsize=(25,15))
sns.distplot(improved_proba_predictions.values[:,0], color="Orange", ax=ax[0])
ax[0].set_xlabel("Predicted probabilites of {}".format(improved_proba_predictions.columns.values[0]))
ax[0].set_xlim([0,1])
sns.distplot(improved_proba_predictions.values[:,1], color="Purple", ax=ax[1])
ax[1].set_xlabel("Predicted probabilites of {}".format(improved_proba_predictions.columns.values[1]))
ax[1].set_xlim([0,1])
sns.distplot(improved_proba_predictions.values[:,2], color="Limegreen", ax=ax[2])
ax[2].set_xlabel("Predicted probabilites of {}".format(improved_proba_predictions.columns.values[2]))
ax[2].set_xlim([0,1]);
```


    
![protein2_2](https://user-images.githubusercontent.com/77332628/203475809-bbfb8c0b-bdfd-4fca-87b8-d06ad809d660.png)
    


출력 값을 보면 Nucleoplasm과 Cytosol 클래스는 다봉 분포의 형태를 띄면서 확실히 0과 1을 분류하는 학습을 했다는 것을 알 수 있다. 따라서 epochs 수는 늘리고 batch 사이즈는 줄인게 도움이 되었다는 것이다. 



### 2.3 Batch size, epochs 다시 조절하기
이제 모델을 더 발전시켜보자. 이전 모델에서는 배치 사이즈가 작았기 때문에 모델이 충분히 훈련하지 못했다. 이번에는 배치 사이즈를 128로 다시 키우고, epochs를 10으로 설정하고 손실을 출력해보자.


```python
parameter = ModelParameter(train_path, num_classes = len(wishlist), n_epochs=10, batch_size=128)
preprocessor = ImagePreprocessor(parameter)
labels = train_labels

training_generator = ImprovedDataGenerator(partition['train'],labels,parameter,preprocessor,wishlist)
validation_generator = ImprovedDataGenerator(partition['validation'],labels,parameter,preprocessor,wishlist)
predict_generator = PredictGenerator(partition['validation'],preprocessor,train_path)

```


```python
if kernelsettings.fit_improved_higher_batchsize == True:
    model = ImprovedModel(parameter, use_dropout=True)
    model.build_model()
    model.compile_model()
    model.set_generators(training_generator, validation_generator)
    epoch_history = model.learn()
    proba_predictions = model.predict(predict_generator)
    #model.save("improved_model.h5")
    improved_proba_predictions = pd.DataFrame(proba_predictions, columns=wishlist)
    improved_proba_predictions.to_csv("improved_hbatch_predictions.csv")
    improved_losses = pd.DataFrame(epoch_history.history["loss"], columns=["train_loss"])
    improved_losses["val_loss"] = epoch_history.history["val_loss"]
    improved_losses.to_csv("improved_hbatch_losses.csv")
    improved_batch_losses = pd.DataFrame(model.history.losses, columns=["batch_losses"])
    improved_batch_losses.to_csv("improved_hbatch_batch_losses.csv")
# 계산 시간을 줄이기 위해 미리 훈련된 결과값 사용
else:
    improved_proba_predictions = pd.read_csv(
        "../input/proteinatlaseabpredictions/improved_hbatch_predictions.csv", index_col=0)
    improved_losses= pd.read_csv(
        "../input/proteinatlaseabpredictions/improved_hbatch_losses.csv", index_col=0)
    improved_batch_losses = pd.read_csv("../input/proteinatlaseabpredictions/improved_hbatch_batch_losses.csv", index_col=0)
```


```python
improved_losses["train_loss"].values
```




    array([0.57145964, 0.52602202, 0.51316622, 0.50722028, 0.49814213,
           0.48810789, 0.47650666, 0.4633443 , 0.44778025, 0.42932816])




```python
fig, ax = plt.subplots(2,1,figsize=(20,13))
ax[0].plot(np.arange(1,11), improved_losses["train_loss"].values, 'r--o', label="train_loss")
ax[0].plot(np.arange(1,11), improved_losses["val_loss"].values, 'g--o', label="validation_loss")
ax[0].set_xlabel("Epoch")
ax[0].set_ylabel("Loss")
ax[0].set_title("Loss evolution per epoch")
ax[0].legend()
ax[1].plot(improved_batch_losses.batch_losses.values, 'r-+', label="train_batch_losses")
ax[1].set_xlabel("Number of update steps in total")
ax[1].set_ylabel("Train loss")
ax[1].set_title("Train loss evolution per batch");
```


    
![protein2_3](https://user-images.githubusercontent.com/77332628/203475812-d300ade6-97ac-4699-acb2-e9793924740a.png)
    



```python
fig, ax = plt.subplots(3,1,figsize=(25,15))
sns.distplot(improved_proba_predictions.values[:,0], color="Orange", ax=ax[0])
ax[0].set_xlabel("Predicted probabilites of {}".format(improved_proba_predictions.columns.values[0]))
ax[0].set_xlim([0,1])
sns.distplot(improved_proba_predictions.values[:,1], color="Purple", ax=ax[1])
ax[1].set_xlabel("Predicted probabilites of {}".format(improved_proba_predictions.columns.values[1]))
ax[1].set_xlim([0,1])
sns.distplot(improved_proba_predictions.values[:,2], color="Limegreen", ax=ax[2])
ax[2].set_xlabel("Predicted probabilites of {}".format(improved_proba_predictions.columns.values[2]))
ax[2].set_xlim([0,1]);
```


    
![protein2_4](https://user-images.githubusercontent.com/77332628/203475814-8f112c55-c86e-470c-a3a7-dd50ecff57d5.png)
    


위의 출력된 그래프들을 보면 검증 손실도 계속 줄어들다가 다시 늘어나는 약간의 과대적합을 보이고 있기도 하고 바 그래프들은 더욱 확실한 분류를 하고 있다는 것을 알 수 있다! 배치 사이즈를 늘린 것이 효과가 있는 것 같다!

### 2.4 DropOut 사용하기
보통은 Dropout의 효과로 과대적합을 최소화한다는 것을 생각한다. 하지만 Dropout은 또 다른 기능을 가지고 있다. 예를 들어 강아지와 고양이의 사진을 분류하는 문제를 푼다고 해보자. 만약 하나의 배치에 고양이로만 가득찼다면 모델은 고양이의 사진만 잘 분류할 수 있도록 학습될 뿐만 아니라 고양이와 강아지 두 클래스가 가중치를 공유하기 때문에 강아지를 분류하는데는 악영향을 미친다. 하지만 이때 Dropout을 사용하게 된다면 확률적으로 일부분만 학습하기 때문에 고양이로만 가득찬 배치를 학습하더라도 강아지를 학습하는데 도움이 되는 가중치는 바뀌지 않을 것이기 때문에 좋은 성능을 보일 것이다. 이렇듯 Dropout은 과대적합을 최소화하는데 도움이 되기도 하지만 **불균형한 데이터셋**에서 학습할 때도 도움이 된다. 위의 코드들을 보면 알았겠지만 이미 Dropout층을 사용하고 있었다. 하지만 Dropout 층을 사용하면 모델의 성능이 무조건 좋아진다는 보장은 하지 못한다. 왜냐하면 Dropout 층은 확률적으로 일부 뉴런을 사용하지 않기 때문에 성능에 도움을 주는 뉴런을 떨어뜨릴 수도, 성능에 악영향을 주는 뉴런을 떨어뜨릴 수도 있기 때문이다. 위의 그래프를 보면 Dropout층을 사용하지 않은 모델 훈련 결과와 비교해보더라도 Droptout층을 사용한 것이 무조건 좋은 성능을 낸다고 하기 힘들다는 것을 알 수 있다.


```python
# Run computation and store results as csv
if kernelsettings.fit_improved_without_dropout == True:
    model = ImprovedModel(parameter, use_dropout=False)
    model.build_model()
    model.compile_model()
    model.set_generators(training_generator, validation_generator)
    epoch_history = model.learn()
    proba_predictions = model.predict(predict_generator)
    #model.save("improved_model.h5")
    improved_proba_predictions = pd.DataFrame(proba_predictions, columns=wishlist)
    improved_proba_predictions.to_csv("improved_nodropout_predictions.csv")
    improved_losses = pd.DataFrame(epoch_history.history["loss"], columns=["train_loss"])
    improved_losses["val_loss"] = epoch_history.history["val_loss"]
    improved_losses.to_csv("improved_nodropout_losses.csv")
    improved_batch_losses = pd.DataFrame(model.history.losses, columns=["batch_losses"])
    improved_batch_losses.to_csv("improved_nodropout_batch_losses.csv")
# If you already have done a baseline fit once, 
# you can load predictions as csv and further fitting is not neccessary:
else:
    improved_proba_predictions_no_dropout = pd.read_csv(
        "../input/proteinatlaseabpredictions/improved_nodropout_predictions.csv", index_col=0)
    improved_losses_no_dropout= pd.read_csv(
        "../input/proteinatlaseabpredictions/improved_nodropout_losses.csv", index_col=0)
    improved_batch_losses_no_dropout = pd.read_csv(
        "../input/proteinatlaseabpredictions/improved_nodropout_batch_losses.csv", index_col=0)
```


```python
fig, ax = plt.subplots(2,1,figsize=(20,13))
ax[0].plot(np.arange(1,11), improved_losses["train_loss"].values, 'r--o', label="train_loss_dropout")
ax[0].plot(np.arange(1,11), improved_losses_no_dropout["train_loss"].values, 'r-o', label="train_loss_no_dropout")
ax[0].plot(np.arange(1,11), improved_losses["val_loss"].values, 'g--o', label="validation_loss")
ax[0].plot(np.arange(1,11), improved_losses_no_dropout["val_loss"].values, 'g-o', label="validation_loss_no_dropout")
ax[0].set_xlabel("Epoch")
ax[0].set_ylabel("Loss")
ax[0].set_title("Loss evolution per epoch")
ax[0].legend()
ax[1].plot(improved_batch_losses.batch_losses.values[-800::], 'r-+', label="train_batch_losses_dropout")
ax[1].plot(improved_batch_losses_no_dropout.batch_losses.values[-800::], 'b-+',
           label="train_batch_losses_no_dropout")
ax[1].set_xlabel("Number of update steps in total")
ax[1].set_ylabel("Train loss")
ax[1].set_title("Train loss evolution per batch");
ax[1].legend();
```


    
![protein2_5](https://user-images.githubusercontent.com/77332628/203475817-99907287-c113-4b11-82ab-ddc692e75139.png)


위의 출력된 그래프들을 보면 dropout층을 사용한 훈련 결과값이 사용하지 않은 훈련 결과값보다 무조건 좋다고 하기는 힘들다는 것을 알 수 있다.

이번 글에서는 베이스라인 모델에서 몇가지 feature들을 추가해서 성능을 살짝 높여봤다. 당연히 3가지 타깃만 예측을 했기 때문에 좋은 성능을 보이지는 못하지만 모델이 학습하는 수준까지는 올려놨다. 다음 글에서는 조금 더 발전된 모델들을 구축해보겠다.
