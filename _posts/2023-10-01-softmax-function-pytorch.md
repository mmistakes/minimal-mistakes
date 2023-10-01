---
layout: single
title: Pytorch를 이용하여 Softmax Function 구현
category: deeplearning
tag: [deeplearning , Pytorch , Python , SoftmaxRegression , coding]
toc: true
---

이번에는 우리가 한번 Softmax함수를 pytorch로 구현해 보도록 하겠습니다.

```python
import torch
import torch.nn.functional as F
torch.manual_seed(1)
```

셋팅은 늘 먹던걸로 하겠습니다.

![Untitled](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/bdd6241e-0d68-4bb2-9084-328b47c10508)

우선 3개의 원소를 가진 벡터를 정의하고 이를 이용해서 Softmax Function을 구현해보도록 하겠습니다.

```python
z=torch.FloatTensor([1,2,3])
hypothesis=F.sofmax(z,dim=0)
print(hypothesis)
```

![Untitled 1](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/030218a3-65f9-4cd3-ad8e-2de85a99d40c)

위의 3개 원소를 가진 벡터를 softmax함수에 넣게 되면 0~1사이에 있는 값을 가지게 됩니다.

```python
hypothesis.sum()
```

그리고 해당 벡터들을 모두 합하게 되면 1이라는 값을 가지는 것을 확인 하실 수 있습니다.

```python
z=torch.rand(3,5,required_grad=True)
hypothesis=F.softmax(z,dim=1)
print(hypothesis)
```

![Untitled 2](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/41cbcbdd-4563-48e9-b96d-dc4af22e454a)

위의 코드와 같이 z라는 변수에 3x5크기의 랜덤한 값을 가지는 벡터를 생성합니다. required_grad=True로 설정해서 자동으로 미분을 할 수 있는 벡터로 생성한 뒤 이를 softmax함수에 넣게 되면 3x5크기의 0~1사이의 값을 가지며 해당 값들을 모두 더했을 때 1이 나오는 텐서를 얻을 수 있습니다.

```python
y=torch.randint(5,(3,)).long()
```

그럼 각 샘플에 대해서 임의의 레이블을 만들어보겠습니다.

위의 코드 문법은 0이상 5미만의 3개의 정수를 가진 1차원 벡터를 만들겠다는 형태의 문법입니다. .long() 이 부분은 long()메서드를 활용해서 정수 데이터 타입으로 변환한다는 의미입니다. 

```python
y_one_hot=torch.zeros_like(hypothesis)
y_one_hot.scatter_(1,y.unsqueeze(1),1)
```

![Untitled 3](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/b3830fcc-ec59-4b78-b505-f23c58fb7eb7)

torch.zeros_like를 통해 모든 벡터의 값을 0으로 만든 뒤

scatter메서드를 이용해서 우리가 바로 전에 만들었던 y값을 index값으로 사용을 하여 index위치에 1로 바꿔주는 one_hot encoding을 진행하는 것 입니다.

여기서 y.unsqueeze(1)은 주어진 차원을 확장하여 텐서의 차원을 변경시켜주는 메서드인데 기존의 y는 (3,)인 1차원 텐서였는데 unsqueeze를 통하여 3x1의 2차원 텐서로 바꿔줍니다.

```python
print(y.unsqueeze(1)
```

![Untitled 4](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/2869dafc-c179-47ab-a791-f434bcd6155e)

그래서 이를 출력해보면 이렇게 나오게 됩니다.

즉dim=1로 설정했기 때문에 각 열을 기준으로 업데이트를 진행하게 됩니다.

0번째 행에서 0번째 열을 1

1번째 행에서 0번째 열을 1

2번째 행에서 2번째 열을 1 로 바꿔주는 one-hot encoding을 진행하게 되는 결과가 나오게 됩니다.

---

### Softmax Function만들어 보기

---

![Untitled 5](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/d9241f37-4b9c-4338-8696-e90711b1536d)

그럼 Softmax Function 위의 수식을 직접 코드로 작성해보겠습니다.

물론 늘 그렇다 싶이 이를 한번에 실행시켜주는 코드가 있지만 수식을 좀 더 이해하기 위해서 직접 코드로 구현해보겠습니다.

```python
loss=(y_one_hot * -torch.log(hypothesis)).sum(dim=1).mean()
print(loss)
```

이번에는 F.softmax()+torch.log()를 합친 F.log_softmax()라는 도구를 한번 사용해서 만들어 보겠습니다.

```python
torch.log(F.softmax(z,dim=1))
```

![Untitled 6](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/634724c7-5ee0-4374-9cba-511f5194434e)

```python
F.log(F.softmax(z,dim=1))
```

![Untitled 7](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/baa83658-66b5-4107-9479-eef71776c66d)

두 코드의 결과 값이 똑같은 걸 확인할 수 있습니다.

이번에는 loss function을 직접 수식을 만들어 코드를 짜는게 아닌 F.nll_loss()과 F.cross_entropy()를 사용해서 softmax Function을 직접 구현 해보도록 하겠습니다.

```python
F.nll_loss(F.log_softmax(z,dim=1),y)
F.cross_entropy(z,y)
```

![Untitled 8](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/4cebca8f-a9ae-4104-a721-068b550940d0)

두 수식 모두 같은 결과가 나온 것을 확인할 수 있습니다.