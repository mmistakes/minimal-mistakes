---
layout: single
title: Perceptron(퍼셉트론)
category: deeplearning
tag: [deeplearning , Perceptron , Pytorch , Python]
toc: true
---

이번에는 Perceptron에 대해 알아보도록 하겠습니다.

Perceptron은 프랑크 로젠블라트(Frank Rosenblatt)가 1957년에 제안한 초기 형태의 인공신경망으로 다수의 입력으로부터 하나의 결과를 내보내는 알고리즘 입니다.

퍼셉트론은 실제 뇌를 구성하는 신경 세포 뉴런의 동작과 굉장히 유사하다는 특징을 가지고 있습니다.

아래의 그림과 같이 뉴런은 가지돌기에서 신호를 받아들이고, 이 신호가 일정치 이상의 크기를 가지면 축삭 돌기를 통해서 신호를 전달하는 구조 입니다.

![Untitled](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/27edd507-c1d6-4501-bec4-d5adff16156f)

![Untitled 1](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/cf9270cd-f914-4417-ad93-3caff6b19459)

그래서 이러한 우리 뇌의 신경 세포 뉴런과 같은 동작을 이용하여 인공 컴퓨터 뇌도 우리 뇌의 뉴런과 같이 동작하게 만들어 OR, AND, NOR과 같은 Boolean Logic을 풀 수 있게 되면 여러 문제에 직면 하였을 경우 스스로 문제를 해결할 수 있겠구나 라고 생각해 만든 것이 바로 딥 러닝 에서의 Perceptron입니다.

그럼 인공 신경망에서는 어떤 원리로 우리 뇌의 뉴런과 같이 작동 하는지 알아보도록 하겠습니다.

![Untitled 2](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/e2bc5ab0-0cde-4e8d-9fe2-fb83f7fd4a3e)

위의 그림에서 x는 입력 값을 의미하며 입력층은 가지돌기의 역할을 하게 됩니다. 여기서 W는 weight가중치이며 축삭돌기의 역할을 하게 되죠

여기서 모든 입력은 다른 입력 값이며 weight도 서로 다른 가중치를 가지고 있습니다 또한 가중치 값이 크면 클수록 해당 입력 값이 중요한 입력이라는 것을 나타냅니다.

그리고 각 입력 값과 가중치가 곱해진 뒤 인공 뉴런에 보내지고 인공 뉴런에서 받은 모든 값들을 더했을 때 특정 임계치(threshold)이상이면 인공뉴런은 출력으로써 1 그 외에는 0을 출력을 합니다.

---

### 단층 퍼셉트론(Single-layer Perceptron)

---

Perceptron의 종류에는 단층 퍼셉트론과 다층 퍼셉트론이 있습니다.

그리고 우리가 위에서 다룬 저 그림이 바로 단층 퍼셉트론입니다.

그리고 여러분들이 많이 아시는 딥 러닝이 바로 다층 퍼셉트론 입니다.

![Untitled 3](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/436c3982-45dd-4d94-9203-fb683f9c3d7a)

이 그림과 같이 입력층과 출력층 단 2개의 층으로 이루어진 퍼셉트론을 단층 퍼셉트론이라고 합니다.

그럼 이 단층 퍼셉트론으로 AND, OR , NAND문제를 풀어보도록 하겠습니다.

![Untitled 4](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/79e99d59-bc75-4a18-a0f9-9b9395b20b5c)

위의 표와 같이 AND문제는 두 개의 X가 1이면 1 그 외에는 0의 값을 출력하는 문제입니다.

```python
def AND_gate(x1,x2):
    w1=0.5
    w2=0.5
    b=-0.7
    result=x1*w1+x2*w2+b
    if result <=0:
        return 0
    else:
        return 1
```

```python
AND_gate(0,0),AND_gate(0,1),AND_gate(1,0),AND_gate(1,1)

```

```python
(0, 0, 0, 1)
```

그럼 weight와 bias를 설정한 뒤 AND문제를 풀어보도록 합시다.

AND문제 같은 경우 아까 말했다 싶이 입력 값이 모두 1이 들어 갔을 경우에 출력 값이 1이 나온다 했습니다. 

그리고 코드를 실행 해본 결과 너무 잘 문제를 풀었다는 것을 확인 할 수 있습니다.

그럼 NAND 게이트를 풀어보도록 해봅시다.

![Untitled 5](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/074425be-e1ac-4f0a-869b-6e6aa90d29f7)

NAND게이트의 특징은 x1과 x2가 1일 경우에만 0을 출력하고 나머지는 1을 출력하는 게이트 입니다.

그럼 이를 간단하게 코드로 만들어 보도록 합시다.

```python
def NAND_gate(x1,x2):
    w1=-0.5
    w2=-0.5
    b=0.7
    result=x1*w1+x2*w2+b

    if result <=0:
        return 0
    else:
        return 1
```

```python
NAND_gate(0,0),NAND_gate(0,1),NAND_gate(1,0),NAND_gate(1,1)
```

```python
(1, 1, 1, 0)
```

이번에는 weight와 bias를 다르게 설정해서 NAND게이트를 해보았습니다.

그 결과 입력이 1,1일 때 0이 나오고 그 외에는 1이 나오는 것을 확인 할 수 있습니다.

그럼 마지막으로 OR문제를 풀어보도록 하겠습니다.

![Untitled 6](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/7628d618-5ada-4119-a989-1e09df833e79)

OR문제의 경우 x1과 x2가 0일 경우에만 0 그 외에는 1이 나오는 것이 특징입니다. 이를 파이썬으로 구현해보도록 하겠습니다.

```python
def OR_gate(x1,x2):
    w1=0.6
    w2=0.6
    b=-0.5
    result=x1*w1+x2*w2+b
    if result <=0:
        return 0
    else:
        return 1
```

```python
OR_gate(0,0),OR_gate(0,1),OR_gate(1,0),OR_gate(1,1)
```

```python
(0, 1, 1, 1)
```

위의 결과를 보니 입력 값이 0,0일 때 0 그 외에는 1이 나오는 것을 확인할 수 있습니다.

물론 여기서 weight와 bias는 무조건 이 값을 설정을 해야 AND, OR , NAND 문제를 해결 할 수 있는 것은 아닙니다.

다양한 weight와 bias가 있습니다.

AND, OR , NAND 문제를 한번 시각화 해보도록 하겠습니다.

![Untitled 7](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/a80a1d13-e704-4a69-9a6b-abbc3ee1f8e6)

위의 그림은 AND문제를 시각화 한 그래프입니다.

입력 값이 1,1일 때만 출력 값이 1이 나오는 특징을 가지고 있습니다.

그리고 검정색 점은 출력 값이 1 흰색 점은 출력 값이 0인 것을 표현 한 것 입니다.

![Untitled 8](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/1243b2b9-05c3-4d75-bd5f-69566f0b9487)

또한 위의 그림과 같이 OR, NAND 문제도 시각화가 가능합니다.

하지만 단층 퍼셉트론의 단점이 여기서 드러납니다.

바로 AND, OR , NAND 문제를 해결 할 수 있지만 XOR문제는 해결을 할 수 가 없다는 것 입니다.

한번 XOR 문제를 시각화 해서 분석해보도록 합시다.

![Untitled 9](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/9b44838b-38ed-4d4e-a000-cc598574d723)

XOR 문제의 특징은 input이 0,0이거나 1,1이면 0을 출력 하고 그 외에의 값은 1을 출력하는 문제 입니다.

weight와 bias값을 어떻게 조정하더라도 하나의 직선으로 나누는 것은 불가능하기 때문입니다.

그렇다면 직선이 아닌 곡선 즉 비선형 영역으로 영역으로 구분을 해보도록 합시다.

![Untitled 10](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/92854307-f45a-4f1b-99d3-adbb543dc662)

그렇다면 위의 그림과 같이 단 하나의 선 만으로도 XOR문제의 결과를 나눌 수 있게 됩니다.

그리고 이 곡선 형태의 선을 나타낼 수 있는 것이 바로 다층 퍼셉트론 Multilayer Perceptron 입니다.

---

### 다층 퍼셉트론(Multlayere Perceptron)

---

다층 퍼셉트론은 간단합니다.

우리가 앞에서 배운 단층 퍼셉트론 AND, OR ,NAND 퍼셉트론을 여러 겹 겹쳐서 조합을 하면 되기 때문 입니다.

단 층 퍼셉트론 같은 경우 입력층과 출력층 단 두 개의 층으로만 이루어져 있었다면 다층 퍼셉트론 같은 경우 입력 층과 출력 층 사이에 존재하는 은닉층(hidden layer)가 존재하는데 이 은닉층이 바로 AND, OR ,NAND 게이트를 여러 개 쌓아서 겹쳐 놓은 층 입니다.

![Untitled 11](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/36266293-4dca-40fa-9e68-c4bdb631bcef)

그리고 이러한 구조를 가진 Perptron의 개수를 늘린 다층 퍼셉트론의 그림은 아래와 같습니다.

![Untitled 12](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/f46b0c28-3b4c-4027-a1d6-e4d09d7e8e43)

위의 그림과 같이 은닉층의 개수가 2개 이상인 다층 신경망을 우리는 심층 신경망(Deep Neural Network, DNN)이라고 부르며

흔히 말하는 딥 러닝의 구조가 됩니다.

[Pytorch를 이용해 Perceptron 구현](Percepotron%20c7ead8a556c947a298f8ee3745b9aa22/Pytorch%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A2%20Perceptron%20%E1%84%80%E1%85%AE%E1%84%92%E1%85%A7%E1%86%AB%200d603839d6b74b61b0d5d6e75ce8430d.md)

[Backpropagation algorithm](Percepotron%20c7ead8a556c947a298f8ee3745b9aa22/Backpropagation%20algorithm%20d08e5ee8382141fa844fe729a73c9a13.md)

[Multi Layer Perceptron](Percepotron%20c7ead8a556c947a298f8ee3745b9aa22/Multi%20Layer%20Perceptron%2045bfbd4e23e647dd810cff4d69ba9965.md)

[Activation Function](Percepotron%20c7ead8a556c947a298f8ee3745b9aa22/Activation%20Function%204dd55a0ba01c4949be0356e475969ac5.md)

[Perceptron으로 MNIST 데이터 셋 분류](Percepotron%20c7ead8a556c947a298f8ee3745b9aa22/Perceptron%E1%84%8B%E1%85%B3%E1%84%85%E1%85%A9%20MNIST%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5%20%E1%84%89%E1%85%A6%E1%86%BA%20%E1%84%87%E1%85%AE%E1%86%AB%E1%84%85%E1%85%B2%2080d494a529ed41f1a2e635c75110cfaf.md)