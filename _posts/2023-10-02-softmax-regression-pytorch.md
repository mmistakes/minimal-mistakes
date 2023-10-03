---
layout: single
title: softmax regressioon pytorch
category: deeplearning
tag: [deeplearning , coding , Python , Pytorch , Softmax Regression]
toc: true
---

이번에는 Softmax Regression을 직접 코드로 구현해보도록 하겠습니다.

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim

torch.manual_seed(1)
```

훈련 데이터를 임의로 한번 만들어 보겠습니다.

```python
x_train = [[1, 2, 1, 1],
           [2, 1, 3, 2],
           [3, 1, 3, 4],
           [4, 1, 5, 5],
           [1, 7, 5, 5],
           [1, 2, 5, 6],
           [1, 6, 6, 6],
           [1, 7, 7, 7]]
y_train = [2, 2, 2, 1, 1, 1, 0, 0]
x_train = torch.FloatTensor(x_train)
y_train = torch.LongTensor(y_train)
```

해당 샘플은 3개의 클래스를 분류 해야 하며 4개의 feature을 구분해야하는 샘플입니다.

```python
print(x_train.shape)
print(y_train.shape)
```

![Untitled](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/abfb9a35-601a-43e8-b31a-1d1dac722f4b)

그럼 각 샘플의 shape을 한번 알아보도록 합시다.

x같은 경우 8x4크기의 2차원 텐서이며

y는 (8,)크기의 1차원 텐서 입니다.

하지만 우리가 사용할 y_train은 one-hot encoding한 결과를 사용해야하며 클래스가 총 3개임으로 8x3크기의 one-hot encoding을 사용 하기 위해 만들어봅시다.

```python
y_one_hot=torch.zeros(8,3)
y_one_hot.scatter_(1,y_train.unsqueeze(1),1)
print(y_one_hot.shape)
```

이렇게 하면 8x3크기의 one-hot encoding이 완성이 됩니다.

그럼 weight와 bias를 한번 만들어 보도록 합시다.

```python
weight=torch.zeros((4,3),requires_grad=True)
bias=torch.zeros((1,3),requires_grad=True)
optimizer=optim.SGD([weight,bias],lr=0.1)
```

현재 feature는 4개이고 클래스는 3개이기 때문에 4x3크기의 weight를 만듭니다.

그리고 bias는 1x3 크기의 bias도 만드며 optimizer는 SGD  Gradient descent를 사용할 것 입니다. learning rate 같은 경우 0.1로 설정했습니다.

```python
epochs=1000
for epoch in range(epochs+1):
    z=x_train.matmul(weight)+bias
    loss=F.cross_entropy(z,y_train)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    if epoch%100==0:
        print('Epoch {:4d}/{} Cost: {:.6f}'.format(
            epoch, epochs, loss.item()
        ))
```

그럼 학습을 진행 한 뒤 결과를 보도록 하겠습니다.

![Untitled 1](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/55cd7138-98a4-4f36-923a-d08a70911064)

loss는 충분히 점점 줄어들며 weight와 bias가 개선이 되었다는 것을 알 수 있습니다.

---

### nn.Module을 이용해서 Softmax Regression 구현하기

---

```python
#nn.module을 사용해서 softmax Regression구현
model=nn.Linear(4,3)
#4개의 feature와 3개의 클래스가 있기 때문에 input_dim=4, output_dim=3으로 설정
```

```python
# optimizer 설정
optimizer = optim.SGD(model.parameters(), lr=0.1)

epochs = 1000
for epoch in range(epochs + 1):

    # H(x) 계산
    prediction = model(x_train)

    # cost 계산
    loss = F.cross_entropy(prediction, y_train)

    # cost로 H(x) 개선
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    # 20번마다 로그 출력
    if epoch % 100 == 0:
        print('Epoch {:4d}/{} Cost: {:.6f}'.format(
            epoch, epochs, loss.item()
        ))
```

![Untitled 2](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/74c88fe0-5171-4d6c-9724-7857a61ad7cb)

loss가 충분히 잘 개선이 되고 있음을 확인 할 수 있습니다.

---

### Class를 이용해서 Softmax Regression구현하기

---

```python
#클래스를 이용해서 소프트맥스 Regression구현
class SoftmaxRegression(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear=nn.Linear(4,3)

    def forward(self,x):
        return self.linear(x)
```

이렇게 클래스를 선언 해주도록 합시다.

```python
model=SoftmaxRegression()
# optimizer 설정
optimizer = optim.SGD(model.parameters(), lr=0.1)

epochs = 1000
for epoch in range(epochs + 1):

    # H(x) 계산
    prediction = model(x_train)

    # cost 계산
    loss = F.cross_entropy(prediction, y_train)

    # cost로 H(x) 개선
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    # 20번마다 로그 출력
    if epoch % 100 == 0:
        print('Epoch {:4d}/{} Cost: {:.6f}'.format(
            epoch, epochs, loss.item()
        ))
```

이렇게 해서 Softmax Regression을 구현 해보았습니다.

다음에는 가장 많이 사용하는 MNIST 숫자 필기 데이터 셋을 이용하여 Softmax Regression을 한번 사용해보도록 하습니다.