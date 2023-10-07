---
layout: single
title: Multi Layer Perceptron(MLP)
category: deeplearning
tag: [deeplearning , MLP , Perceptron , Pytorch , Python , coding]
toc: true
toc_sticky : true
toc_label : 목차
author_profile: false 
---
이번에는 Pytorch를 이용하여 Multi layer Perceptron을 구현 해보도록 하겠습니다. 그리고 해당 Perceptron을 이용해서 xor문제를 풀어 보도록 하겠습니다.

```python
import torch
import torch.nn as nn
x=torch.FloatTensor([[0,0],[0,1],[1,0],[1,1]])
y=torch.FloatTensor([[0],[1],[1],[1]])
```

먼저 데이터 부터 만들어 주도록 합시다 해당 데이터는 xor문제 데이터입니다.

```python
model=nn.Sequential(
    nn.Linear(2,10,bias=True),
    #input_layer에서 2개를 input으로 받음 그리고 input으로 받은 데이터 2개를 각각 10개씩 hidden_layer1에 전달함
    nn.Sigmoid(),#활성함수로 sigmoid함수 사용 이하 동문
    nn.Linear(10,10,bias=True),#hidden_layer1=10,hidden_layer2도 10
    nn.Sigmoid(),
    nn.Linear(10,10,bias=True),#hidden_layer2=10,hidden_layer3=10,
    nn.Sigmoid(),
    nn.Linear(10,1,bias=True),#hidden_layer3=10,output_layer=1
    nn.Sigmoid()
    )
```

그 다음 모델을 만들어 주도록 하겠습니다.

1개의 input layer와 3개의 hidden layer 1개의 output layer로 이루어져 있으며

hidden layer와 output layer에서의 활성 함수로는 sigmoid 함수입니다.

위의 인공 신경망을 그림으로 표현한다면 아래의 그림과 같습니다.

![Untitled](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/bf914b92-ef83-4fe5-96f8-5bbf14e2f346)

```python
criterion=torch.nn.BCELoss()
optimizer=torch.optim.SGD(model.parameters(),lr=0.5)
```

다음 loss함수와 optimizer를 설정해주도록 합시다.

BCELoss()같은 경우 이진 분류에서 사용하는 Cross Entropy를 사용할 수 있게 해주는 pytorch 메서드입니다.

그리고 optimizer는 gradientdescent를 사용하고 learning rate는 0.5로 설정합니다.

```python
for epoch in range(5001):
    optimizer.zero_grad()
    hypothesis=model(x)

    loss=criterion(hypothesis,y)
    loss.backward()
    optimizer.step()

    if epoch%1000==0:
        print(epoch,loss.item())
```

총 5000번 학습을 해주도록 하겠습니다.

```python
0 0.00035950023448094726
1000 0.0002839022781699896
2000 0.00023407691332977265
3000 0.00019888048700522631
4000 0.00017274447600357234
5000 0.00015255156904459
```

loss값이 점점 줄어드며 weight와 bias가 개선이 되었다는 것을 알 수 있습니다.

그럼 학습을 통해 weight와 bias를 개선 하였으니 한번 테스트를 해보도록 하겠습니다.

```python
with torch.no_grad():
    hypothesis=model(x)
    predicted=(hypothesis>0.5).float()
    accuracy=(predicted==y).float().mean()
    print('모델의 출력값(Hypothesis): ', hypothesis.detach().cpu().numpy())
    print('모델의 예측값(Predictea): ', predicted.detach().cpu().numpy())
    print('실제값(Y): ',  y.cpu().numpy())
    print('정확도(Accuracy): ', accuracy.item())
```

```python
모델의 출력값(Hypothesis):  [[3.0445305e-04]
 [9.9986684e-01]
 [9.9986660e-01]
 [9.9996102e-01]]
모델의 예측값(Predicted):  [[0.]
 [1.]
 [1.]
 [1.]]
실제값(Y):  [[0.]
 [1.]
 [1.]
 [1.]]
정확도(Accuracy):  1.0
```

weight와 bias가 적절하게 업데이트가 되어 단층 퍼셉트론이 해결하지 못했던 XOR 문제를 Multi Layer Perceptron을 만들어 해결하는 것을 확인 할 수 있습니다.

다음은 여러가지 활성 함수에 대해 알아보도록 하겠습니다.