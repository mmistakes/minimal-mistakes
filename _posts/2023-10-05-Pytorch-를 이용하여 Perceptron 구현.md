---
layout: single
title: Pytorch를 이용하여 Perceptron 구현
category: deeplearning
tag: [deeplearning , coding , Perceptron , Python , Pytorch]
toc: true
---


이번에는 Pytorch를 이용해서  Perceptron을 만들고 Perceptron으로 AND, OR ,NAND문제를 풀어보도록 하겠습니다.

```python
import torch
import torch.nn as nn
torch.manual_seed(777)
x=torch.FloatTensor([[0,0],[0,1],[1,0],[1,1]])
AND_y=torch.FloatTensor([[0],[0],[0],[1]])
```

먼저 x데이터와 y데이터 레이블을 만들어주도록 합시다.

```python
linear=nn.Linear(2,1)
sigmoid=nn.Sigmoid()
model=nn.Sequential(linear,sigmoid)
criteriono=torch.nn.BCELoss()
optimizer=torch.optim.SGD(model.parameters(),lr=0.1)
```

그럼 모델을 한번 만들어보도록 합시다.

input의 feature가 2개이며 output이 1개이기 때문에 input_dim=2, output_dim=1인 선형 층과 활성 함수 sigmoid인 활성 층을 조합해 model을 만들었습니다.

그리고 0과 1을 구분하는 문제이기 때문에 binary classfication에서 사용하는 sigmoid 함수를 loss함수로 설정했습니다.

optimizer는 늘 사용하는 gradient descent로 설정 합니다.

```python
epochs=2000
for epoch in range(epochs+1):
    optimizer.zero_grad()
    hypothesis=model(x)
    cost=criteriono(hypothesis,AND_y)
    cost.backward()
    optimizer.step()

    if epoch%100==0:
        print(epoch,cost.item())
```

그럼 학습을 하고 난 뒤 loss를 확인해보도록 하겠습니다.

```python
0 0.9013811349868774
100 0.476090669631958
200 0.3705870509147644
300 0.30643314123153687
400 0.2627508044242859
500 0.23066988587379456
600 0.20587708055973053
700 0.18601995706558228
800 0.16969451308250427
900 0.15600207448005676
1000 0.14433574676513672
1100 0.1342678666114807
1200 0.1254863739013672
1300 0.11775746196508408
1400 0.1109018474817276
1500 0.10477949678897858
1600 0.09927891194820404
1700 0.09431047737598419
1800 0.08980115503072739
1900 0.08569057285785675
2000 0.08192870020866394
```

총 2000번을 확습 하였을 때 loss는 0.08이 나왔고 학습을 하면 할수록 loss가 줄어드는 것을 확인 할 수 있습니다.

만약 여기서 학습을 더 했다면 loss가 더 줄어 들었을 것 같네요.

그럼 weight와 bias를 개선하였으니 모델이 예측하고 예측 한 값을 기반으로 정확도 계산까지 해보도록 하겠습니다.

```python
with torch.no_grad():
    hypothesis=model(x)
    predicted=(hypothesis>0.5).float()
    accuracy=(predicted==AND_y).float().mean()
    print('모델의 출력값(hypothesis):',hypothesis.detach().cpu().numpy())
    print('모델의 예측값(predicted):',predicted.detach().cpu().numpy())
    print('실제값(Y): ', AND_y.cpu().numpy())
    print('정확도(Accuracy): ', accuracy.item())
```

```python
모델의 출력값(hypothesis): [[0.00144503]
 [0.09053694]
 [0.09048136]
 [0.8725076 ]]
모델의 예측값(predicted): [[0.]
 [0.]
 [0.]
 [1.]]
실제값(Y):  [[0.]
 [0.]
 [0.]
 [1.]]
정확도(Accuracy):  1.0
```

모델이 정확하게 예측을 함으로써 정확도가 100프로가 나오는 것을 확인 할 수 있습니다.

여기서 y값 즉 레이블 값만 다르게 해서 OR 문제와 NAND문제도 구현해보도록 하겠습니다.

---

### OR문제 해결

---

```python
OR_y=torch.FloatTensor([[0],[1],[1],[1]])
epochs=2000
for epoch in range(epochs+1):
    optimizer.zero_grad()
    hypothesis=model(x)
    cost=criteriono(hypothesis,OR_y)
    cost.backward()
    optimizer.step()

    if epoch%100==0:
        print(epoch,cost.item())
```

```python
0 1.235609769821167
100 0.11562903225421906
200 0.05452387407422066
300 0.04012339562177658
400 0.034435614943504333
500 0.03151794895529747
600 0.029712382704019547
700 0.028420131653547287
800 0.027391865849494934
900 0.02651379257440567
1000 0.02573038823902607
1100 0.025012817233800888
1200 0.024345146492123604
1300 0.023717908188700676
1400 0.02312513068318367
1500 0.022562790662050247
1600 0.02202785760164261
1700 0.021517949178814888
1800 0.021031100302934647
1900 0.020565759390592575
2000 0.020120389759540558
```

```python
with torch.no_grad():
    hypothesis=model(x)
    predicted=(hypothesis>0.5).float()
    accuracy=(predicted==OR_y).float().mean()
    print('모델의 출력값(hypothesis):',hypothesis.detach().cpu().numpy())
    print('모델의 예측값(predicted):',predicted.detach().cpu().numpy())
    print('실제값(Y): ', OR_y.cpu().numpy())
    print('정확도(Accuracy): ', accuracy.item())
```

```python
모델의 출력값(hypothesis): [[0.04377063]
 [0.98231333]
 [0.9823117 ]
 [0.9999852 ]]
모델의 예측값(predicted): [[0.]
 [1.]
 [1.]
 [1.]]
실제값(Y):  [[0.]
 [1.]
 [1.]
 [1.]]
정확도(Accuracy):  1.0
```

---

### NAND 문제 해결

---

```python
NAND_y=torch.FloatTensor([[1],[1],[1],[0]])
epochs=2000
for epoch in range(epochs+1):
    optimizer.zero_grad()
    hypothesis=model(x)
    cost=criteriono(hypothesis,NAND_y)
    cost.backward()
    optimizer.step()

    if epoch%100==0:
        print(epoch,cost.item())
```

```python
0 3.5716469287872314
100 2.4639720916748047
200 1.629415512084961
300 1.0075081586837769
400 0.6416910886764526
500 0.459957480430603
600 0.3618398904800415
700 0.30091428756713867
800 0.258884996175766
900 0.22776848077774048
1000 0.20359665155410767
1100 0.18416905403137207
1200 0.16815632581710815
1300 0.15470072627067566
1400 0.14321905374526978
1500 0.13329820334911346
1600 0.1246362030506134
1700 0.11700586974620819
1800 0.11023255437612534
1900 0.10417966544628143
2000 0.09873825311660767
```

```python
with torch.no_grad():
    hypothesis=model(x)
    predicted=(hypothesis>0.5).float()
    accuracy=(predicted==NAND_y).float().mean()
    print('모델의 출력값(hypothesis):',hypothesis.detach().cpu().numpy())
    print('모델의 예측값(predicted):',predicted.detach().cpu().numpy())
    print('실제값(Y): ', NAND_y.cpu().numpy())
    print('정확도(Accuracy): ', accuracy.item())
```

```python
모델의 출력값(hypothesis): [[0.9974094 ]
 [0.8925007 ]
 [0.8925007 ]
 [0.15184908]]
모델의 예측값(predicted): [[1.]
 [1.]
 [1.]
 [0.]]
실제값(Y):  [[1.]
 [1.]
 [1.]
 [0.]]
정확도(Accuracy):  1.0
```

이렇게 Pytorch로 단층 Perceptron을 만들어 AND, OR ,NAND문제를 해결 해 보았습니다.

다음 챕터는 다층 퍼셉트론을 만들고 XOR문제를 해결하는 글로 찾아오겠습니다.
