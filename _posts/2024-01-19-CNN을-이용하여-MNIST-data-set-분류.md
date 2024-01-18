---
layout: single
title: CNN(convolution neural network)
category: deeplearning
tag: [CNN , deeplearning , coding , Python , Pytorch]
toc: true
---
# CNN을 이용해 MNIST 분류

이번에는 CNN을 이용해서 MNIST데이터 셋을 분류 해보도록 하겠습니다.

먼저 임의의 데이터를 만들어서 CNN을 넣었을 때 어떤 Output이 나오는지 보도록 합시다.

```python
import torch
import torch.nn as nn
```

```python
inputs=torch.Tensor(1,1,28,28)
print('텐서의 크기: {}'.format(inputs.shape))
#배치 크기x채널 x높이 x넓이
```

```python
텐서의 크기: torch.Size([1, 1, 28, 28])
```

먼저 input 텐서를 임의로 만들어주도록 하겠습니다.

해당 텐서는 28x28크기의 텐서로 1채널이며 배치 크기가 1인 텐서 입니다.

그럼 convolution layer를 만들어주도록 하겠습니다.

```python
conv1=nn.Conv2d(1,32,3,padding=1)
print(conv1)
```

```python
Conv2d(1, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
```

해당 convolution layer는 1채널을 입력으로 받고 32채널을 출력을 하는 convolution layer 입니다. 합성 곱 연산을 하기 위해 만든 filter(kernel)은 3x3크기이며 x축 y축 둘 다 1칸씩 이동하면서 합성곱 연산을 하며 합성곱 층을 만들고 패딩은 x축 y축 둘 다 1칸씩 채움으로써 패딩을 한다는 의미입니다.

그럼 두 번째 covolution layer를 보도록 하겠습니다.

```python
conv2=nn.Conv2d(32,64,kernel_size=3,padding=1)
```

해당 convolution layer는 32채널을 입력 받고 64채널을 출력해주며, 커널 사이즈는 3x3 패딩은 1로 진행 됩니다. covoloution layer1에서 출력을 32채널을 출력하기 때문에 convolution layer2는 32채널을 입력 받습니다.

다음은 마지막으로 풀링입니다

```python
pool=nn.MaxPool2d(2)
print(pool)
```

```python
MaxPool2d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False)
```

풀링은 맥스 풀링을 하며 커널 사이즈는 2x2 입니다.또한 stride는 2로 하며 패딩은 진행하지 않습니다.

그럼 이제 모든 covolution layer와 pooling을 선언 했으니 이 layer들을 연결시키고 각 layer들을 통과할 때마다 어떤 결과 값이 나오는지 보도록 합시다.

```python
out=conv1(inputs)
print(out.shape)
```

```python
torch.Size([1, 32, 28, 28])
```

conv1을 통과하자 28x28의 특성 맵이 완성 되었으며 채널은 32채널이 되었습니다. 배치크기는 1이구요.

왜 convolution layer를 통과 했는데 이미지 크기가 그대로 일까요?

바로 우리가 padding해주었기 때문입니다.

그럼 이번에는 해당 out을 가지고 conv2에 통과 시켜 보도록 하겠습니다.

```python
out = conv2(out)
print(out.shape)
```

```python
torch.Size([1, 64, 14, 14])
```

이번에는 conv2를 통과시켰을 때의 결과 입니다.

conv2를 통과시켰더니 64채널이 되었으며 크기는 14x14의 크기가 된 것을 알 수 있습니다.

마지막은 풀링 레이어 입니다.

```python
out=pool(out)
print(out.shape)
```

```python
torch.Size([1, 64, 7, 7])
```

풀링 레이어에서의 결과 값은 채널 변동이 없습니다. 다만 kernel을 통해 특징을 또 한번 추출을 해내기 때문에 크기는 7x7로 작아진 것을 확인 할 수 있습니다.

최종적으로 pooling layer를 통해 나온 데이터를 한번 펼쳐 보도록 하겠습니다.

```python
out=out.view(out.size(0),-1)
print(out.shape)
```

```python
torch.Size([1, 3136])
```

배치 크기를 제외한 나머지를 펼치게 되면 3136=64x7x7의 크기로 모두 통합된 차원에서 펼쳐진 것을 확인 할 수 있습니다. 이렇게 되면 3136개의 뉴런이 만들어져 3136차원이 됩니다.

그럼 이를 마지막 최종 출력 층에 넣어보도록 하겠습니다

출력 층에서 사용하는 것은 Linear Regression입니다.

```python
fc=nn.Linear(3136,10)
out=fc(out)
print(out.shape)
```

```python
torch.Size([1, 10])
```

마지막에서 input_dim=3136, output_dim=10으로 설정 했기 때문에 배치를 제외한 나머지 최종적으로 10차원이 출력이 되는 것을 확인 할 수 있습니다.

이러한 구조와 원리를 이용하여 MNIST 데이터 셋을 분류 해보도록 하겠습니다.

---

### CNN을 이용한 MNIST 데이터 셋 분류

---

```python
import torch
import torchvision.datasets as dsets
import torchvision.transforms as transforms
import torch.nn.init
```

```python
torch.manual_seed(777)
learning_rate=0.001
training_epochs=15
batch_size=100
```

기본적인 설정을 해주도록 합시다. 시드 값을 고정 해준 뒤 learning rate=0.001로 훈련 횟수는 15회 batch_size는 100으로 해주도록 합시다.

```python
mnist_train = dsets.MNIST(root='MNIST_data/', # 다운로드 경로 지정
                          train=True, # True를 지정하면 훈련 데이터로 다운로드
                          transform=transforms.ToTensor(), # 텐서로 변환
                          download=True)

mnist_test = dsets.MNIST(root='MNIST_data/', # 다운로드 경로 지정
                         train=False, # False를 지정하면 테스트 데이터로 다운로드
                         transform=transforms.ToTensor(), # 텐서로 변환
                         download=True)
```

```python
data_loader = torch.utils.data.DataLoader(dataset=mnist_train,
                                          batch_size=batch_size,
                                          shuffle=True,
                                          drop_last=True)
```

이렇게 MNIST데이터 셋을 받고 MNIST 데이터 셋을 훈련용과 시험용 데이터로 나눈 뒤 텐서로 변환 해주도록 합니다.

다음은 CNN을 만들어 보도록 합시다.

```python
class CNN(torch.nn.Module):
    def __init__(self):
        super(CNN,self).__init__()
        #첫번째 층
        #합성곱 층은 1채널을를 입력 받으며 32채널로 아웃풋을 냄
        #filter의 크기는 3x3 strdie는 1로 설정해서
        #합성곱 연산을하고 합성곱 연산을 통해 나온 특성 맵의 패딩은 1로설정해서 원본이미지와 크기 동일하게함
        #activation function=렐루 함수 풀링은 맥스 풀링을 사용하며 2x2커널에 2칸씩 이동하면서 특성 추출

        self.layer1=torch.nn.Sequential(
            torch.nn.Conv2d(1,32,kernel_size=3,stride=1,padding=1),
            torch.nn.ReLU(),
            torch.nn.MaxPool2d(kernel_size=2,stride=2)
        )
        #두번째 층은 32채널을 입력 받은 뒤 64채널로 아웃풋을 냄
        #kernel size는 3x3에 1칸씩 stride하면서 특징을 추출해준 뒤 padding까지 해줌
        #pooling 층에서는 kernel size=2x2이며 이를 2칸씩 이동해주며 풀링을 함 패딩은 안함
        self.layer2=torch.nn.Sequential(
            torch.nn.Conv2d(32,64,kernel_size=3,stride=1,padding=1),
            torch.nn.ReLU(),
            torch.nn.MaxPool2d(kernel_size=2,stride=2)
        )
        #최종적으로 선형층을 출력층으로 설정하여 최종적인 값을 추출함
        self.fc=torch.nn.Linear(7*7*64,10,bias=True)
        torch.nn.init.xavier_uniform_(self.fc.weight)

    def forward(self,x):
        out=self.layer1(x)
        out=self.layer2(out)
        out=out.view(out.size(0),-1)
        out=self.fc(out)
        return out
```

클래스를 통해 CNN을 만들어 주도록 합시다.

1개의 층에 convolution layer, activation layer, pooling layer 이 3개의 층을 묶어서 하나의 layer로 만들었습니다.

자세한 설명은 주석을 달아 놨으니 확인 해주세요.

그럼 loss함수와 optimizer 함수를 선언해주도록 하겠습니다.

```python
model=CNN()
criterion=torch.nn.CrossEntropyLoss()
optimizer=torch.optim.Adam(model.parameters(),lr=learning_rate)
total_batch=len(data_loader)
print('총 배치의 수: {}'.format(total_batch))
```

loss는 CrossEntropy그리고 옵티마이저는 Adam을 설정하였습니다.

MNIST 데이터 셋 같은 경우 총 이미지가 6만장 이기 때문에 batch_size를 100으로 설정 했을 때 총 배치의 수는 600이 나오게 됩니다.

그럼 학습 시켜보도록 하겠습니다.

```python
for epoch in range(training_epochs):
    avg_cost=0
    for X,Y in data_loader:
        X=X
        Y=Y
        optimizer.zero_grad()
        hypothesis=model(X)
        cost=criterion(hypothesis,Y)
        cost.backward()
        optimizer.step()

        avg_cost+=cost/total_batch

print('[Epoch: {:>4}] cos {:>.9}'.format(epoch+1,avg_cost))
```

```python
[Epoch:   15] cos 0.00556721445
```

총 15번 트레이닝 셋을 이용해 학습을 하였고 로스는 0.0055로 굉장히 낮게 나온 것을 확인 할 수 있습니다.

그럼 한번 테스트 데이터를 이용해 테스트를 해보도록 하겠습니다.

```python
with torch.no_grad():
    X_test=mnist_test.test_data.view(len(mnist_test),1,28,28).float()
    Y_test=mnist_test.test_labels
    prediction=model(X_test)
    correct_prediction=torch.argmax(prediction,1)==Y_test
    accuracy=correct_prediction.float().mean()
    print('Accuracy:',accuracy.item())
```

```python
Accuracy: 0.9860000014305115
```

최종적으로 정확도는 98.6프로가 나왔습니다.

학습을 좀 더 했다면 100프로가 나오지 않았을까 하는 추측이 됩니다.

다음은 제가 2학년 2학기 겨울방학때 만든 모델로 MNIST와 CIFAR-10을 구분하는 모델을 보여드리도록 하겠습니다.