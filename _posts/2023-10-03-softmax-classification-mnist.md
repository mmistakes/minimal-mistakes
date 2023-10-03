---
layout : single
title: Softmax Regression을 활용하여 MNIST 데이터 셋 분류 해보기
category: deeplearning
tag: [deeplearning , coding , SoftmaxRegression , Python , Pytorch]
toc: true
---

이번에는 MNIST라는 숫자 필기 데이터 셋을 분류해보도록 하겠습니다.

해당 데이터 셋은 실험이나 논문을 작성할 때 가장 많이 쓰는 데이터 셋 중에 하나인 데이터 셋 입니다.

먼저 MNIST데이터셋 부터 살펴 보도록 하겠습니다.

![Untitled](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/c13b7f13-3cec-4b71-9c59-4052efd6e2eb)

MNIST데이터 셋은 위의 그림과 같이 여러가지의 필기채로 0부터 9까지 작성이 되어 있는 데이터 셋입니다.

총 6만개의 훈련 데이터와 레이블, 총 1만개의 테스트 데이터와 레이블로 이루어져 있습니다.

우리 사람이 보기엔 모든 숫자를 다 인식을 할 수 있지만 그림 데이터 셋 같은 경우 픽셀로 이루어져 있으며 같은 숫자이지만 각각의 다른 위치에 다른 픽셀의 데이터 값이 있기 때문에 컴퓨터의 입장에서는 전혀 다른 그림처럼 해석이 됩니다.

먼저 해당 데이터 셋 그림 하나를 가져와서 데이터가 어떤 크기인지 먼저 분석 해보도록 하겠습니다.

![Untitled 1](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/b9e32e9e-6dd3-4987-bc9e-177a653bd34a)

해당 데이터 셋은 모든 그림이 28X28 크기의 그림을 가지고 있습니다

그럼 28X28=784 픽셀을 가지고 있습니다.

그럼 우리는 해당 데이터를  784개의 원소를 가진 벡터로 만들어 주도록 하겠습니다.

![Untitled 2](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/1b972e23-2db3-4457-9acf-903b35347c64)

해당 데이터 셋을 784개의 원소를 가진 벡터로 표현하면 위의 그림과 같이 표현이 됩니다.

그리고 이를 코드로 구현하면 아래와 같습니다.

```python
for X,Y in data_loader:
	X=X.view(-1,28*28)
```

그럼 한번 코드로 전부 구현 해보도록 하겠습니다.

```python
import torch 
import torchvision.datasets as dsets
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
import torch.nn as nn
import matplotlib.pyplot as plt
import random

random.seed(777)
torch.manual_seed(777)

training_epochs=15
batch_size=100
```

기본적인 라이브러리 설정과 랜덤시드를 생성한 뒤 해당 시드를 고정해주도록 합시다.

그리고 epochs는 15회 batch_sizer는 100회입니다.

```python
mnist_train=dsets.MNIST(root='MNIST_data/',
train=True,
transform=transforms.ToTensor(),
download=True)
mnist_test=dsets.MNIST(root='MNIST_data/',
train=False,
transform=transforms.ToTensor(),
download=True)
```

위의 코드를 사용해서 MNIST 데이터의 훈련용 데이터 셋과 테스트용 데이터 셋을 받아 올 수 있습니다.

```python
data_loader=DataLoader(dataset=mnist_train,batch_size=batch_size,shuffle=True,drop_last=True)
```

이제 batch size=100으로 설정 dataset은 mnist 훈련용 데이터, shuffle은 매 epochs마다 매치들을 랜덤을 섞을 것인지 설정하는 것이며 drop_last는 마지막 나머지 배치를 버릴지 말지 설정하는 것 입니다.

```python
USE_CUDA = torch.cuda.is_available() # GPU를 사용가능하면 True, 아니라면 False를 리턴
device = torch.device("cuda" if USE_CUDA else "cpu") # GPU 사용 가능하면 사용하고 아니면 CPU 사용
print("다음 기기로 학습합니다:", device)
```

그리고 대부분은 로컬 환경에서 하시기보다는 코랩을 이용해서 하실 겁니다. 그럼 이렇게 gpu설정을 하실 수 있습니다.

그럼 모델을 설정해보도록 하겠습니다.

```python
linear=nn.Linear(784,10,bias=True).to(device)
```

해당 이미지의 크기가 28x28크기이며 이미지를 784개의 원소를 가지는 벡터로 변환하였고 0부터 9까지의 총 10개의 클래스 분류이기 때문에 input_dim=784, output_dim=10으로 설정하였습니다.

bias는 편향 bias를 사용할 것인지 나타냅니다 기본 값은 True입니다.

그럼 loss함수와 optimizer를 정의해보도록하겠습니다.

```python
criterion=nn.CrossEntropyLoss().to(device)#내부적으로 소프트맥스 함수를 포함하고 있음
optimizer=torch.optim.SGD(linear.parameters(),lr=0.1)
```

loss함수는 Cross Entropy를 사용하며 optimizer는 gradient descent로 learning rate은 0.1로 설정을 해주었습니다.

```python
for epoch in range(training_epochs):
    avg_cost=0
    total_batch=len(data_loader)

    for X, Y in data_loader:
        X=X.view(-1,28*28).to(device)
        Y=Y.to(device)
        optimizer.zero_grad()
        hypothesis=linear(X)
        loss=criterion(hypothesis,Y)
        loss.backward()
        optimizer.step()

        avg_cost +=loss/total_batch
    print('Epoch:','%04d'%(epoch+1),'loss=','{:.9f}'.format(avg_cost))

print('Learning finished')
```

그럼 학습을 하며 loss를 줄이고 weight와 bias를 개선해보도록 합시다.

```python
Epoch: 0001 loss= 0.535150588
Epoch: 0002 loss= 0.359577775
Epoch: 0003 loss= 0.331264257
Epoch: 0004 loss= 0.316404670
Epoch: 0005 loss= 0.307106972
Epoch: 0006 loss= 0.300456554
Epoch: 0007 loss= 0.294933408
Epoch: 0008 loss= 0.290956199
Epoch: 0009 loss= 0.287074119
Epoch: 0010 loss= 0.284515619
Epoch: 0011 loss= 0.281914055
Epoch: 0012 loss= 0.279526860
Epoch: 0013 loss= 0.277636588
Epoch: 0014 loss= 0.275874794
Epoch: 0015 loss= 0.274422795
Learning finished
```

loss가 점차 줄어들며 weight와 bias가 개선이 된 것을 확인 할 수 있습니다.

그럼 해당 모델을 검증을하며 평가를 해보도록 하겠습니다.

```python
with torch.no_grad():
    X_test=mnist_test.test_data.view(-1,28*28 ).float().to(device)
    Y_test=mnist_test.test_labels.to(device)
    prediction=linear(X_test)
    correct_prediction=torch.argmax(prediction,1)==Y_test
    accuracy=correct_prediction.float().mean()
    print('Accuracy:',accuracy.item())
    #mnist 테스트 데이텅서 무작위로 하나를 뽑아서 예측함
    r=random.randint(0,len(mnist_test)-1)
    X_single_data=mnist_test.test_data[r:r+1].view(-1,28*28).float().to(device)
    Y_single_data=mnist_test.test_labels[r:r+1].to(device)

    print('Accuracy:',accuracy.item())
    singe_prediction=linear(X_single_data)
    print('prediction:',torch.argmax(singe_prediction,1).item())
    plt.imshow(mnist_test.test_data[r:r+1].view(28,28),cmap='Greys',interpolation='nearest')
    plt.show()
```

```python
Accuracy: 0.8883000016212463
Accuracy: 0.8883000016212463
prediction: 7
```

정확도는 88.8프로 정도 나오며 예측한 값은 7이라고 나왔습니다.

그럼 정말로 7이 맞는지 사진을 봐보도록 합시다.

![Untitled 3](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/c7600005-a80a-43ab-9b3f-b690895d7dec)

사람이 우리가 봐도 7인 숫자인 것을 확인 할 수 있으며 모델이 잘 구분하였다는 것을 확인 할 수 있습니다.

다음에는 머신 러닝의 개념에 대해 알아보도록 하겠습니다.