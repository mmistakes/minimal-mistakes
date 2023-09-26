---
layout: single
title: Pytorch를 이용한 이진 분류(binary classification)
category: deeplearning
tag: [deeplearning , Pytorch , Python , coding , logistic regression , binary classification]
toc: true
---

이번에는 실습으로 pytorch를 이용해서 이진 분류를 진행해보도록 하겠습니다.

기존의 있는 실습과 크게 다르지 않고 sigmoid가 추가된 정도이니 쉽게 따라오실 수 있으실 겁니다.

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
torch.manual_seed(1)
```

일단 기본적인 셋팅은 늘 하던걸로 하겠습니다.

![Untitled](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/5ac28c15-8df2-4e68-9787-68b96bb2eebc)


이후 훈련용 데이터를 만들어 주고 데이터의 차원과 형태에 대해서 확인 해보도록 하겠습니다.

**항상 데이터의 형태와 크기를 확인하는 습관을 들이십시다 진짜 매우 중요함!**

```python
x_data = [[1, 2], [2, 3], [3, 1], [4, 3], [5, 3], [6, 2]]
y_data = [[0], [0], [0], [1], [1], [1]]
x_train = torch.FloatTensor(x_data)
y_train = torch.FloatTensor(y_data)
print(x_train.shape)
print(x_train.dim())
print(y_train.shape)
print(y_train.dim())
```

해당 코드를 실행시켜보면 x는 6 x 2크기의 2차원 텐서 형태의 데이터 이고 y는 6 x 1크기의 2차원 텐서 형태의 데이터라는 것을 확인 할 수 있습니다.

그럼 데이터도 만들고 차원과 크기에 대해 확인을 해봤으니 weight와 bias를 선언 해주도록 합시다.

```python
weight=torch.zeros((2,1),requires_grad=True)
bias=torch.zeros(1,requires_grad=True)
```

여기서 weight가 2,1인 이유는 x_train데이터의 크기는 6 x 2 크기의 2차원 텐서이며 feature가 2개가 있습니다. 그리고 x_train을 X weight를 W라고 표현 하였을 때 y=WX가 되어야 함으로 W의 크기는 2x1 이어야 합니다.

즉 feature의 개수를 맞춰 주셔야 합니다.

그럼 hypothesis를 한번 세워보도록 하겠습니다.

```python
hypothesis=torch.sigmoid(x_train.matmul(weight)+bias)
print(hypothesis)
```

![Untitled 1](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/623df489-8c44-4195-aa02-67c8f001f7e2)


hypothesis를 sigmoid 함수를 통해 세운 뒤 해당 모델에 훈련용 데이터를 넣어 확인 해보도록 하겠습니다.

현재 np.zeros를 통해서 weight와 bias가 0으로 초기화 된 상태이기 때문에 6x1 크기의 2차원 텐서가 나오긴 하는데 모두 값이 0.5가 나옵니다.

가설을 세워줬으니 한번 loss도 설정해주도록 합시다.

```python
loss=F.binary_cross_entropy(hypothesis,y_train)
print(loss)
```

loss는 pytorch에서 제공하는 모듈을 통해서 cross entropy 함수를 불러와 쉽게 사용 할 수 있습니다.

![Untitled 2](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/966bc662-60e4-4a39-87b3-18b1ec389be9)


현재 loss값을 확인해보니 0.6931이 초기 loss값이라는 것을 알 수 있습니다.

그럼 마지막으로 optimizer 설정 뒤 한번 모델을 훈련 시켜봅시다.

```python
optimizer = optim.SGD([weight, bias], lr=1)

nb_epochs = 1000
for epoch in range(nb_epochs + 1):

   
   
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    if epoch % 100 == 0:
        print('Epoch {:4d}/{} Cost: {:.6f}'.format(
            epoch, nb_epochs, loss.item()
        ))
```

![Untitled 3](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/d2e3132b-3b5c-410d-93f0-8b850ef18771)

훈련 과정과 결과를 보니 loss가 점점 줄어드는 것으로 보아 훈련이 잘 되었고 최종적으로는 아주 작은 loss값이 나오며 초기 loss값 대비 아주 많이 loss값이 줄어든 것을 확인 할 수 있습니다.

그럼 훈련 이후 weight와 bias를 가지고 기존 데이터를 예측 시켜보도록 하겠습니다.

```python
print(hypothesis)
```

![Untitled 4](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/ca91aec5-a321-492f-9392-3d43e970ccd4)


훈련 이후 0.5였던 값에서 바뀐 것을 확인 할 수 있습니다.

그럼 이 hypothesis결과 값을 바탕으로 이진 분류를 시켜보도록 하겠습니다.

```python
prediction=hypothesis >=torch.FloatTensor([0.5])
print(prediction)
```

![Untitled 5](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/684526fa-1a95-4a27-962c-45179f83133f)

결과를 보니 아주 잘 학습되어 weight와 bias가 최적화가 되었다는 것을 확인 할 수 있습니다.