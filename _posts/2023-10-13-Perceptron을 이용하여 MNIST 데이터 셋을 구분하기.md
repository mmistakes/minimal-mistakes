---
layout: single
title: Perceptron을 MNIST 데이터 셋을 구분하기 
category: deeplearning
tag: [deeplearning , codinig , Perceptron , Python , Pytorch]
toc: true
---


드디어 Perceptron의 마지막 부분인 MNIST데이터 셋 분류 입니다.

도대체 왜 맨날 뭐만 하면 MNIST 데이터 셋이냐 할 수 있겠지만

이 데이터 셋은 새로운 알고리즘이나 모델을 실험할 때 혹은 논문을 낼 때 가장 많이 사용하는 데이터 셋 중에 하나인 기본 데이터 셋이기 때문입니다.

그럼 한번 해보도록 하겠습니다.

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import fetch_openml

mnist=fetch_openml('mnist_784',version=1,cache=True,as_frame=False)
```

먼저 mnist 데이터 셋을 불러와 줍니다.

```python
mnist.target=mnist.target.astype(np.int8)
x=mnist.data/255#0~255사이의 값을 0과 1사이에 있는 값으로 정규화를 시킴
y=mnist.target #mnist데이터 셋의 레이블 값 즉 사진에 적혀있는 손글씨의 숫자 값을 저장한 정답지임
```

그리고 불러온 데이터 셋은 8비트 형태의 numpy배열로 변경 시켜준 뒤

mnist 데이터 셋을 255로 나누어 줌으로써 0과 1사이에 있는 값으로 정규화를 시켜줍니다.

왜냐하면 MNIST 데이터 셋을 8비트 형태로 나누었기 때문에 255로 나누어 0~255 사이의 값을 0과 1 사이에 있는 값으로 정규화를 시켜주는 것 입니다.

```python
import torch
from torch.utils.data import TensorDataset,DataLoader
from sklearn.model_selection import train_test_split
#데이터셋은 훈련용과 테스트용으로 나누어주는 라이브러리
X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=1/7, random_state=0)
#1/7은 테스트용 나머지 6/7은 훈련용 데이터셋으로 나누어주며 난수 발생 시드를 0으로 지정시켜 동일한 난수 시퀀스를 생성하도록함
X_train=torch.Tensor(X_train)
X_test=torch.Tensor(X_test)
y_train=torch.LongTensor(y_train)
#정수 값을 가지는 y레이블을 리스트 형태에서 LongTensor를 통해 텐서로 변환시켜줌
y_test=torch.LongTensor(y_test)

ds_train=TensorDataset(X_train,y_train)
ds_test=TensorDataset(X_test,y_test)

loader_train=DataLoader(ds_train,batch_size=64,shuffle=True)
loader_test=DataLoader(ds_test,batch_size=64,shuffle=False)
```

이제 데이터 셋을 받아 왔으니 훈련 용 데이터 셋과 테스트 용 데이터 셋으로 나누어 줍니다.

여기서 batch_size는 64개로 설정 하였고 훈련 용 데이터 셋은 임의로 섞었습니다. 

```python
from torch import nn
model=nn.Sequential()
model.add_module('fc1',nn.Linear(28*28*1,100))
model.add_module('relu1',nn.ReLU())
model.add_module('fc2',nn.Linear(100,100))
model.add_module('relu2',nn.ReLU())
model.add_module('fc3',nn.Linear(100,10))

print(model)
```

```python
Sequential(
  (fc1): Linear(in_features=784, out_features=100, bias=True)
  (relu1): ReLU()
  (fc2): Linear(in_features=100, out_features=100, bias=True)
  (relu2): ReLU()
  (fc3): Linear(in_features=100, out_features=10, bias=True)
```

이제 DNN(깊은 신경망)을 만들어 주도록 합시다.

input feature은 mnist 데이터 셋이 28x28크기의 그림을 가지고 있기 때문에 784로 설정 하였고 해당 input은 100개의 뉴런이 있는 hidden layer로 전달이 됩니다.

그리고 hidden layer의 활성 함수는 ReLU로 설정 했습니다.

마지막으로 output layer에서 out_features는 10으로 설정 했는데요. 그 이유는 mnist 데이터 셋은 0부터 9까지 총 10개의 feature를 가지고 있기 때문입니다.

```python
from torch import optim
loss_fn=nn.CrossEntropyLoss()
optimizer=optim.Adam(model.parameters(),lr=0.01)

def train(epoch):
    model.train()

    for data,targets in loader_train:
        #데이터로더에서 미니 배치를 하나씩 꺼내 학습을 수행
        optimizer.zero_grad()
        outputs=model(data)
        loss=loss_fn(outputs,targets)
        loss.backward()
        optimizer.step()

    print("epoch{}:완료\n".format(epoch))
```

loss는 CrossEntropy를 사용하였고 optimizer는 Adam이라는 Momentum과 RMSProp의 장점을 합친 optimizer입니다. 해당 optimizer는 optimizer의 종류를 다룰 때 더 자세하게 다루도록 하겠습니다.

```python
def test():
    model.eval()#신경망을 추론 모드로 봐꿈
    correct=0

    with torch.no_grad():
        for data, targets in loader_test:
            outputs=model(data)
            _,predicted=torch.max(outputs.data,1)#확률이 가장 높은 레이블이 무엇인지 계산
            correct+=predicted.eq(targets.data.view_as(predicted)).sum()
            #정답과 일치할경우 카운트 +1
            data_num=len(loader_test.dataset)
            print('\n테스트 데이터에서 예측 정확도: {}/{} ({:.0f}%)\n'.format(correct,data_num, 100. * correct / data_num))
```

```python
for epoch in range(3):
    train(epoch)

test()
```

```python
index = 2018

model.eval()  # 신경망을 추론 모드로 전환
data = X_test[index]
output = model(data)  # 데이터를 입력하고 출력을 계산
_, predicted = torch.max(output.data, 0)  # 확률이 가장 높은 레이블이 무엇인지 계산

print("예측 결과 : {}".format(predicted))

X_test_show = (X_test[index]).numpy()
plt.imshow(X_test_show.reshape(28, 28), cmap='gray')
print("이 이미지 데이터의 정답 레이블은 {:.0f}입니다".format(y_test[index]))
```

```python
예측 결과 : 2
이 이미지 데이터의 정답 레이블은 2입니다
```

![Untitled](Perceptron%E1%84%8B%E1%85%B3%E1%84%85%E1%85%A9%20MNIST%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5%20%E1%84%89%E1%85%A6%E1%86%BA%20%E1%84%87%E1%85%AE%E1%86%AB%E1%84%85%E1%85%B2%2080d494a529ed41f1a2e635c75110cfaf/Untitled.png)

해당 코드를 통해 우리는 DNN을 통한 MNIST 데이터 셋을 분류 할 수 있습니다.