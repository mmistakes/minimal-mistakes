---
layout: single
title: nn.Module을 이용한 Logistic Regression 구현
category: deeplearning
tag: [deeplearning, coding, Python, Pytorch, logistic regression , binary classification]
toc: true
---

이번에는 Logistic Regresiion을 nn.module을 써서 해보겠습니다.

기존과 방식은 크게 차이가 나지 않으나 sigmoid함수 부분이 조금 차이가 있습니다.

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
torch.manual_seed(1)
```

기본적인 셋팅은 늘 먹던걸로 하겠습니다.

![Untitled](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/5ac28c15-8df2-4e68-9787-68b96bb2eebc)

```python
x_data = [[1, 2], [2, 3], [3, 1], [4, 3], [5, 3], [6, 2]]
y_data = [[0], [0], [0], [1], [1], [1]]
x_train = torch.FloatTensor(x_data)
y_train = torch.FloatTensor(y_data)
```

데이터도 우리가 앞에서 logistic regression 실습을 할 때 썻던 걸로 쓰도록 하겠습니다.

```python
model = nn.Sequential(
   nn.Linear(2, 1), # input_dim = 2, output_dim = 1
   nn.Sigmoid() # 출력은 시그모이드 함수를 거친다
)
```

여기서 우리는 기존에 썻던 torch.sigmoid가 아니라 nn.Sequential을 쓸 겁니다.

이 메서드의 역할은 바로 선형 회귀인 Wx+b의 식과 sigmoid식을 연결 해주는 메서드입니다.

물론 다른 수식과도 연결을 할 수 있습니다.

그렇기 때문에 nn.Linear(2,1)을 통해 x의 feature가 2개고 y의 feature가 1개인 선형 회귀 함수와 sigmoid함수를 nn.Sequential을 통해 이어준다고 생각하면 됩니다.

```python
optimizer=optim.SGD(model.parameters(),lr=1)
epochs=1000
for epoch in range(epochs+1):
    hypothesis=model(x_train)
    loss=F.binary_cross_entropy(hypothesis,y_train)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    if epoch %10 ==0:
        prediction=hypothesis >= torch.FloatTensor([0.5])
        correct_prediction=prediction.float()==y_train
        accuracy=correct_prediction.sum().item()/len(correct_prediction)
        print('Epoch {:4d}/{} Cost: {:.6f} Accuracy {:2.2f}%'.format( # 각 에포크마다 정확도를 출력
            epoch, nb_epochs, loss.item(), accuracy * 100,
        ))
```

optimizer는 gradient descent를 쓰는데 여기서 model.parameters를 넣었기 때문에 따로 weight와 bias값을 넣지 않아도 됩니다.

왜냐하면 model.parameters에 weight와 bias의 정보가 다 들어있기 때문이죠

loss는 우리가 sigmoid함수를 통해 이진 분류를 하는 것이기 때문에 sigmoid 함수를 mse에 적용한 cross_entropy를 사용합니다.

그럼 한번 x_train을 넣어 예측을 시켜본 뒤 학습 뒤의 weight도 확인 해보도록 합시다.

```python
model(x_train)
print(list(model.parameters()))
```

다음은 클래스로 회귀를 logistic regression을 해보도록 하겠습니다.

기본적인 셋팅은 다 똑같지만 Class만 추가해주시면 됩니다.