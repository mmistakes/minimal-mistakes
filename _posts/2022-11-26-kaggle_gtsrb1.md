---
title: '[Kaggle/CV] GTSRB - 독일 표지판 이미지 분류 🚸'
toc: true
toc_sticky: true
categories:
  - kaggle-imageclassification
---
## 1. GTSRB - German Traffic Sign Recognition Benchmark

### 1.0 들어가며
GTSRB 데이터는 독일의 교통 표지판을 모아놓은 데이터로, 각 데이터 샘플이 무슨 표지판인지 분류하는 문제다. 이는 다중 분류 문제로, 40개 이상의 클래스가 있고, 5만개 이상의 많은 데이터가 있다는 것이 특징이다. 이번 글의 코드는 [**이 캐글러**](https://www.kaggle.com/code/shivank856/gtsrb-cnn-98-test-accuracy)의 코드를 참고했다.

#### 1.0.1 라이브러리, 데이터 준비하기


```python
# 필요한 라이브러리 임포트
import numpy as np
import pandas as pd
import os
import cv2
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras
from PIL import Image
from sklearn.model_selection import train_test_split
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import Adam
from sklearn.metrics import accuracy_score
np.random.seed(42)

from matplotlib import style
style.use('fivethirtyeight')
```


```python
# 데이터 경로 지정
data_dir = '../input/gtsrb-german-traffic-sign'
train_path = '../input/gtsrb-german-traffic-sign/Train'
test_path = '..input/gtsrb-german-traffic-sign/Test'
```


```python
num_categories = len(os.listdir(train_path))
print('클래스 개수 : ',num_categories)
```

    클래스 개수 :  43



```python
# 전체 클래스 
classes = { 0:'Speed limit (20km/h)',
            1:'Speed limit (30km/h)', 
            2:'Speed limit (50km/h)', 
            3:'Speed limit (60km/h)', 
            4:'Speed limit (70km/h)', 
            5:'Speed limit (80km/h)', 
            6:'End of speed limit (80km/h)', 
            7:'Speed limit (100km/h)', 
            8:'Speed limit (120km/h)', 
            9:'No passing', 
            10:'No passing veh over 3.5 tons', 
            11:'Right-of-way at intersection', 
            12:'Priority road', 
            13:'Yield', 
            14:'Stop', 
            15:'No vehicles', 
            16:'Veh > 3.5 tons prohibited', 
            17:'No entry', 
            18:'General caution', 
            19:'Dangerous curve left', 
            20:'Dangerous curve right', 
            21:'Double curve', 
            22:'Bumpy road', 
            23:'Slippery road', 
            24:'Road narrows on the right', 
            25:'Road work', 
            26:'Traffic signals', 
            27:'Pedestrians', 
            28:'Children crossing', 
            29:'Bicycles crossing', 
            30:'Beware of ice/snow',
            31:'Wild animals crossing', 
            32:'End speed + passing limits', 
            33:'Turn right ahead', 
            34:'Turn left ahead', 
            35:'Ahead only', 
            36:'Go straight or right', 
            37:'Go straight or left', 
            38:'Keep right', 
            39:'Keep left', 
            40:'Roundabout mandatory', 
            41:'End of no passing', 
            42:'End no passing veh > 3.5 tons' }
```

### 1.1 데이터 시각화하기
먼저 각 클래스마다 데이터 샘플이 얼마나 있는지 시각화해보자.


```python
folders = os.listdir(train_path)

train_number = []
class_num = []

for folder in folders:
    train_files = os.listdir(train_path + '/' + folder)
    train_number.append(len(train_files))
    class_num.append(classes[int(folder)])

zipped_lists = zip(train_number,class_num)
sorted_pairs = sorted(zipped_lists)
tuples = zip(*sorted_pairs)
train_number, class_number = [list(tuple) for tuple in tuples]

plt.figure(figsize=(21,10))
plt.bar(class_num,train_number)
plt.xticks(class_num, rotation=90)
plt.show()
```


    
![kaggle_german1](https://user-images.githubusercontent.com/77332628/204090618-2616c735-6542-44c6-984a-ed10d65a33cc.png)
    


그 다음 랜덤으로 테스트 데이터의 25개 이미지 데이터를 시각화해보자.


```python
import random
from matplotlib.image import imread

test = pd.read_csv(data_dir+'/Test.csv')
imgs = test['Path'].values

plt.figure(figsize=(25,25))
for i in range(1,26):
    plt.subplot(5,5,i)
    random_img_path = data_dir + '/' + random.choice(imgs)
    rand_img = imread(random_img_path)
    plt.imshow(rand_img)
    plt.grid(b=None)
    plt.xlabel(rand_img.shape[1],fontsize=20) # 이미지 너비를 x축
    plt.ylabel(rand_img.shape[0],fontsize=20) # 이미지 높이를 y축   

```

    /opt/conda/lib/python3.7/site-packages/ipykernel_launcher.py:13: MatplotlibDeprecationWarning: The 'b' parameter of grid() has been renamed 'visible' since Matplotlib 3.5; support for the old name will be dropped two minor releases later.
      del sys.path[0]



    
![kaggle_german2](https://user-images.githubusercontent.com/77332628/204090619-be700297-22c2-4117-9e9d-9a8a2ed9e811.png)
    


### 1.2 데이터 로드하기

 


```python
# 이미지 데이터를 모델에 투입하기 위해 배열로 변환
image_data = []
image_labels = []

for i in range(num_categories):
    path = data_dir + '/Train/' + str(i)
    images = os.listdir(path)

    for img in images:
        try:
            image = cv2.imread(path + '/' + img)
            image_fromarray = Image.fromarray(image, 'RGB')
            resize_image = image_fromarray.resize((30, 30))
            image_data.append(np.array(resize_image))
            image_labels.append(i)
        except:
            print("Error in " + img)

# 리스트를 배열로 변환
image_data = np.array(image_data)
image_labels = np.array(image_labels)

print(image_data.shape, image_labels.shape)
```

    (39209, 30, 30, 3) (39209,)



```python
# 로드한 데이터 섞기
shuffle_indexes = np.arange(image_data.shape[0])
np.random.shuffle(shuffle_indexes)
image_data = image_data[shuffle_indexes]
image_labels = image_labels[shuffle_indexes]

# 섞은 데이터를 훈련용, 검증용 데이터로 분할하기
X_train, X_val , y_train, y_val = train_test_split(image_data,image_labels,test_size=0.3, random_state=42, shuffle=True)

# 훈련 데이터 rescaling
X_train = X_train/ 255
X_val = X_val/255 

print('X_train.shape',X_train.shape)
print('X_val.shape',X_val.shape)
print('y_train.shape',y_train.shape)
print('y_val.shape',y_val.shape)
```

    X_train.shape (27446, 30, 30, 3)
    X_val.shape (11763, 30, 30, 3)
    y_train.shape (27446,)
    y_val.shape (11763,)


전체 데이터를 훈련용과 검증용으로 나누었으니 레이블 y_train과 y_val 데이터를 **원-핫 인코딩**으로 모델에 주입할 수 있는 형태로 변환하자.


```python
y_train = keras.utils.to_categorical(y_train,num_categories)
y_val = keras.utils.to_categorical(y_val,num_categories)

print(y_train.shape)
print(y_val.shape)
```

    (27446, 43)
    (11763, 43)


### 1.3 모델 구축하기
이제 모델에 사용할 데이터의 준비를 마쳤으니 Sequential을 이용해서 모델을 구축한다. conv 블록을 2개 쌓은 후에 마지막에 분류기에 데이터를 주입한다. 


```python
model = keras.models.Sequential([
    keras.layers.Conv2D(filters=16, kernel_size=(3,3),activation='relu',
                       input_shape=(30,30,3)),
    keras.layers.Conv2D(filters=32, kernel_size=(3,3),activation='relu'),
    keras.layers.MaxPooling2D(pool_size=(2,2)),
    keras.layers.BatchNormalization(axis=-1),
    
    keras.layers.Conv2D(filters=64, kernel_size=(3,3),activation='relu'),
    keras.layers.Conv2D(filters=128, kernel_size = (3,3), activation='relu'),
    keras.layers.MaxPooling2D(pool_size=(2,2)),
    keras.layers.BatchNormalization(axis=-1),
    
    keras.layers.Flatten(),
    keras.layers.Dense(512, activation='relu'),
    keras.layers.BatchNormalization(),
    keras.layers.Dropout(rate=0.5),
    
    keras.layers.Dense(43, activation='softmax')
])
```


이제 학습률과 epochs와 optimizer를 정하고 모델을 compile 한다.


```python
lr = 0.001
epochs = 30
optimizer = Adam(learning_rate=lr, decay=lr/(epochs*0.5))
model.compile(loss='categorical_crossentropy', optimizer=optimizer, metrics=['accuracy'])
```

모델의 조금 더 나은 일반화 성능을 위해 이미지 데이터 증식을 활용한다.


```python
augmentation = ImageDataGenerator(rotation_range=10,
                                 zoom_range=0.15,
                                 width_shift_range=0.1,
                                 height_shift_range=0.1,
                                 shear_range=0.15,
                                 horizontal_flip=False,
                                 vertical_flip=False,
                                 fill_mode='nearest')
history = model.fit(augmentation.flow(X_train,y_train,batch_size=32),
                   epochs=epochs, validation_data=(X_val,y_val))
```

    2022-11-26 11:46:28.807937: I tensorflow/compiler/mlir/mlir_graph_optimization_pass.cc:185] None of the MLIR Optimization Passes are enabled (registered 2)


    Epoch 1/30
    858/858 [==============================] - 24s 20ms/step - loss: 1.0324 - accuracy: 0.7198 - val_loss: 0.0689 - val_accuracy: 0.9802
    Epoch 2/30
    858/858 [==============================] - 16s 19ms/step - loss: 0.1799 - accuracy: 0.9444 - val_loss: 0.0273 - val_accuracy: 0.9926
    Epoch 3/30
    858/858 [==============================] - 16s 18ms/step - loss: 0.1005 - accuracy: 0.9699 - val_loss: 0.0324 - val_accuracy: 0.9918
    Epoch 4/30
    858/858 [==============================] - 17s 19ms/step - loss: 0.0805 - accuracy: 0.9756 - val_loss: 0.0242 - val_accuracy: 0.9934
    Epoch 5/30
    858/858 [==============================] - 16s 19ms/step - loss: 0.0670 - accuracy: 0.9802 - val_loss: 0.0309 - val_accuracy: 0.9912
    Epoch 6/30
    858/858 [==============================] - 16s 19ms/step - loss: 0.0548 - accuracy: 0.9831 - val_loss: 0.0113 - val_accuracy: 0.9963
    Epoch 7/30
    858/858 [==============================] - 16s 18ms/step - loss: 0.0509 - accuracy: 0.9842 - val_loss: 0.0126 - val_accuracy: 0.9957
    Epoch 8/30
    858/858 [==============================] - 16s 19ms/step - loss: 0.0444 - accuracy: 0.9863 - val_loss: 0.0089 - val_accuracy: 0.9974
    Epoch 9/30
    858/858 [==============================] - 16s 19ms/step - loss: 0.0392 - accuracy: 0.9879 - val_loss: 0.0149 - val_accuracy: 0.9962
    Epoch 10/30
    858/858 [==============================] - 16s 19ms/step - loss: 0.0350 - accuracy: 0.9885 - val_loss: 0.0081 - val_accuracy: 0.9978
    Epoch 11/30
    858/858 [==============================] - 16s 19ms/step - loss: 0.0315 - accuracy: 0.9898 - val_loss: 0.0088 - val_accuracy: 0.9974
    Epoch 12/30
    858/858 [==============================] - 17s 19ms/step - loss: 0.0290 - accuracy: 0.9915 - val_loss: 0.0068 - val_accuracy: 0.9982
    Epoch 13/30
    858/858 [==============================] - 16s 18ms/step - loss: 0.0298 - accuracy: 0.9910 - val_loss: 0.0052 - val_accuracy: 0.9985
    Epoch 14/30
    858/858 [==============================] - 17s 19ms/step - loss: 0.0216 - accuracy: 0.9927 - val_loss: 0.0034 - val_accuracy: 0.9991
    Epoch 15/30
    858/858 [==============================] - 16s 18ms/step - loss: 0.0254 - accuracy: 0.9925 - val_loss: 0.0042 - val_accuracy: 0.9989
    Epoch 16/30
    858/858 [==============================] - 16s 19ms/step - loss: 0.0205 - accuracy: 0.9930 - val_loss: 0.0031 - val_accuracy: 0.9990
    Epoch 17/30
    858/858 [==============================] - 16s 18ms/step - loss: 0.0208 - accuracy: 0.9937 - val_loss: 0.0053 - val_accuracy: 0.9987
    Epoch 18/30
    858/858 [==============================] - 17s 19ms/step - loss: 0.0158 - accuracy: 0.9950 - val_loss: 0.0046 - val_accuracy: 0.9986
    Epoch 19/30
    858/858 [==============================] - 16s 19ms/step - loss: 0.0205 - accuracy: 0.9934 - val_loss: 0.0046 - val_accuracy: 0.9986
    Epoch 20/30
    858/858 [==============================] - 16s 19ms/step - loss: 0.0127 - accuracy: 0.9961 - val_loss: 0.0043 - val_accuracy: 0.9986
    Epoch 21/30
    858/858 [==============================] - 16s 19ms/step - loss: 0.0175 - accuracy: 0.9948 - val_loss: 0.0047 - val_accuracy: 0.9988
    Epoch 22/30
    858/858 [==============================] - 16s 18ms/step - loss: 0.0163 - accuracy: 0.9949 - val_loss: 0.0042 - val_accuracy: 0.9991
    Epoch 23/30
    858/858 [==============================] - 16s 19ms/step - loss: 0.0165 - accuracy: 0.9953 - val_loss: 0.0048 - val_accuracy: 0.9984
    Epoch 24/30
    858/858 [==============================] - 16s 18ms/step - loss: 0.0128 - accuracy: 0.9961 - val_loss: 0.0030 - val_accuracy: 0.9993
    Epoch 25/30
    858/858 [==============================] - 16s 19ms/step - loss: 0.0130 - accuracy: 0.9962 - val_loss: 0.0036 - val_accuracy: 0.9990
    Epoch 26/30
    858/858 [==============================] - 16s 18ms/step - loss: 0.0086 - accuracy: 0.9970 - val_loss: 0.0037 - val_accuracy: 0.9990
    Epoch 27/30
    858/858 [==============================] - 16s 19ms/step - loss: 0.0117 - accuracy: 0.9961 - val_loss: 0.0012 - val_accuracy: 0.9997
    Epoch 28/30
    858/858 [==============================] - 16s 18ms/step - loss: 0.0109 - accuracy: 0.9966 - val_loss: 0.0053 - val_accuracy: 0.9984
    Epoch 29/30
    858/858 [==============================] - 16s 19ms/step - loss: 0.0107 - accuracy: 0.9970 - val_loss: 0.0030 - val_accuracy: 0.9992
    Epoch 30/30
    858/858 [==============================] - 16s 18ms/step - loss: 0.0093 - accuracy: 0.9972 - val_loss: 0.0048 - val_accuracy: 0.9987


### 1.4 훈련 지표 평가하기


```python
pd.DataFrame(history.history).plot(figsize=(8,5))
plt.grid(True)
plt.gca().set_ylim(0,1)
plt.show()
```


    
![kaggle_german3](https://user-images.githubusercontent.com/77332628/204090620-e5419568-406f-442c-83c7-2f203922ae27.png)
    


와우! 굉장한 accuracy와 val_accuracy를 보였다. 간단한 모델로 이렇게 좋은 성능을 냈다는건, 이미지들이 분류하기 쉬웠나보다.

### 1.6 Test 데이터 예측하기
이제 test 데이터를 가져와서 문제를 풀어보자.


```python
test = pd.read_csv(data_dir + '/Test.csv')
labels = test['ClassId'].values
imgs = test['Path'].values

data = []
for img in imgs:
    try :
        image = cv2.imread(data_dir + '/' + img)
        image_from_array = Image.fromarray(image,'RGB')
        resize_image = image_from_array.resize((30,30))
        data.append(np.array(resize_image))
    except :
        print('Error in '+img)

X_test = np.array(data)
X_test = X_test/255

pred = model.predict(X_test).argmax(axis=1)

print('Test Data Accuracy : ',accuracy_score(labels,pred)*100)
```

    Test Data Accuracy :  98.48772763262075


역시 98%의 테스트 데이터 예측 정확도를 보이는 높은 성능의 모델이다!!

모델의 테스트 데이터 예측값을 시각화해보자.



```python
plt.figure(figsize = (25, 25))

start_index = 0
for i in range(25):
    plt.subplot(5, 5, i + 1)
    plt.grid(False)
    plt.xticks([])
    plt.yticks([])
    prediction = pred[start_index + i]
    actual = labels[start_index + i]
    col = 'g'
    if prediction != actual:
        col = 'r'
    plt.xlabel('Actual={} || Pred={}'.format(actual, prediction), color = col)
    plt.imshow(X_test[start_index + i])
plt.show()

```


    
![kaggle_german4](https://user-images.githubusercontent.com/77332628/204090621-f3d0f3d8-5ce3-4a0e-a68e-b716bf2ec3ff.png)
    




test 데이터에서 하나의 이미지만 빼고 모두 정확히 예측한 것을 알 수 있다.

### 1.7 모델 평가 시각화하기


```python
from sklearn.metrics import confusion_matrix
cf = confusion_matrix(labels,pred)

import seaborn as sns
df_cm = pd.DataFrame(cf, index=classes, columns=classes)
plt.figure(figsize=(20,20))
sns.heatmap(df_cm, annot=True)
```




    <AxesSubplot:>




    
![kaggle_german5](https://user-images.githubusercontent.com/77332628/204090623-b770164a-f559-4207-a922-2cde24d18121.png)
    


classification_report로 각 클래스에 대한 정밀도와 재현율, f1점수를 출력해보자.


```python
from sklearn.metrics import classification_report
print(classification_report(labels,pred))
```

                  precision    recall  f1-score   support
    
               0       1.00      1.00      1.00        60
               1       0.99      1.00      0.99       720
               2       1.00      0.99      0.99       750
               3       0.98      0.98      0.98       450
               4       1.00      0.99      0.99       660
               5       0.99      1.00      0.99       630
               6       0.99      0.99      0.99       150
               7       1.00      1.00      1.00       450
               8       1.00      0.99      0.99       450
               9       1.00      0.99      1.00       480
              10       0.99      1.00      1.00       660
              11       0.95      1.00      0.97       420
              12       1.00      0.99      1.00       690
              13       0.99      1.00      0.99       720
              14       0.94      1.00      0.97       270
              15       0.99      1.00      0.99       210
              16       0.96      1.00      0.98       150
              17       1.00      0.92      0.96       360
              18       1.00      0.89      0.94       390
              19       1.00      1.00      1.00        60
              20       0.84      1.00      0.91        90
              21       0.93      0.98      0.95        90
              22       0.97      0.88      0.92       120
              23       0.98      1.00      0.99       150
              24       0.99      0.97      0.98        90
              25       0.99      0.99      0.99       480
              26       0.91      0.99      0.95       180
              27       0.82      0.90      0.86        60
              28       0.98      1.00      0.99       150
              29       0.96      1.00      0.98        90
              30       0.96      0.85      0.90       150
              31       0.99      1.00      0.99       270
              32       0.95      1.00      0.98        60
              33       1.00      1.00      1.00       210
              34       1.00      1.00      1.00       120
              35       1.00      1.00      1.00       390
              36       0.98      0.97      0.97       120
              37       1.00      1.00      1.00        60
              38       1.00      0.99      0.99       690
              39       0.98      1.00      0.99        90
              40       0.98      0.97      0.97        90
              41       0.92      1.00      0.96        60
              42       0.98      0.94      0.96        90
    
        accuracy                           0.98     12630
       macro avg       0.97      0.98      0.98     12630
    weighted avg       0.99      0.98      0.98     12630
    

