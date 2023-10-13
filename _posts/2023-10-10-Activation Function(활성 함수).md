--- 
layout: single
title: Activation Function(활성화 함수)
category: deeplearning
tag: [deeplearning , Activation Function , Pytorch , Python , coding]
toc: true
---


이번에는 다양한 Activation Function을 알아보도록 하겠습니다.

우리가 주로 사용하는 Activation Function은 binary classification을 할 때는 Sigmoid Function, Multiclass Classification을 할 때는 Softmax Function을 사용했습니다.

이번에는 그 외의 딥 러닝에서 사용하는 활성 함수에 대해 알아보도록 하겠습니다.

일단은 Sigmoid Function을 구현 해보도록 하겠습니다.

그리고 해당 함수의 특징과 장단점에 대해 좀 더 분석 해보도록 할게요.

### Sigmoid Function

---

```python
import numpy as np
import matplotlib.pyplot as plt
```

```python
def sigmoid(x):
    return 1/(1+np.exp(-x))

x=np.arange(-5.0,5.0,0.1)
y=sigmoid(x)
plt.plot(x,y)
plt.plot([0,0],[1.0,0.0],':')
plt.title('Sigmoid Function')
plt.show()
```

![Untitled](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/56a6756b-508c-449c-a8bf-a901014d973b)

sigmoid함수는 출력 값이 0과 1사이를 출력하며

x가 커질수록 점점  y값이 1에 수렴하며 기울기가 0에 수렴하고, x가 작아질수록 점점 y값이 0에 수렴하며 기울기가 0에 수렴하는 특징을 가지고 있습니다.

이러한 특징을 가지고 있기 때문에 우리는 binary classfication의 경우 sigmoid함수를 사용하고 있습니다.

하지만 이 sigmoid함수를 hidden layer에서 사용하게 되면 치명적인 단점이 존재합니다.

우리가 전에 배운 backpropagation을 수행 할 때 만약 기울기가 0에 수렴하는 부분을 곱하게 된다면 바로 앞단에 있는 hidden layer에 기울기가 잘 전달이 되지 않습니다.

이게 무슨 소리인지 backpropagation의 개념을 다시 한번 생각 해볼 필요가 있습니다. backpropagation은 forward propagation을 통해 나온 값들을 이용해서 거꾸로 chain rule을 이용해 계산하여 gradient descent를 실행하는 알고리즘입니다.

그리고 이 chain rule에 의한 계산 과정에서 한 부분의 수식을 보도록 하겠습니다.

![Untitled 1](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/f98c39a3-7065-431e-9732-ee5c01b8a0f6)

위 식은 sigmoid 함수를 미분한 값 입니다.==f(x)-(1-f(x))

만약 O1(세타 1)부분에 들어 가는 sigmoid함수의 기울기 값이 0에 수렴하거나 1에 수렴하게 된다면 매우 결과 값은 0에 가까운 매우 작은 값이 나오게 될 것 입니다. 그렇게 되면 gradient descent를 통한 weight 개선이 이루어지지 않게 될 것이며 그 뒤에 weight에도 영향을 끼치게 되며 weight가 개선이 되지 않게 됩니다.

이를 바로 그래디언트 소실(vanishing gradient)라고 표현 합니다.

 

![Untitled 2](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/23baa908-552e-49f1-8aaa-a967af7be99f)

그리고 해당 내용을 그림으로 표현 하게 된다면 위의 그림과 같이 표현을 할 수 있습니다.

### Tanh function(Hyperboloic tangent function)

---

이번에는 Tanh라고 표기하는 하이퍼볼릭 탄젠트 함수를 보도록 하겠습니다.

```python
#tanh함수
x=np.arange(-5.0,5.0,0.1)
y=np.tanh(x)

plt.plot(x,y)
plt.plot([0,0],[1.0,-1.0],':')
plt.axhline(y=0,color='orange',linestyle='--')
plt.title('Tanh Function')
plt.show()
```

![Untitled](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/56a6756b-508c-449c-a8bf-a901014d973b)

위 함수에 대한 이해를 좀 더 쉽게 하기 위해서 Sigmoid함수를 분석하고 설명을 했습니다.

해당 함수 굉장히 Sigmoid함수와 유사하게 생겼습니다. 해당 함수는 -1부터 1까지 표현을 하며 0을 중심 점으로 하고 있다는 것을 제외하고는 Sigmoid함수와 동일하게 생겼습니다.

하지만 Vanishing Gradient문제는 해당 함수도 -1 혹은 1에 가까운 출력을 할 때 똑같이 발생합니다. 왜냐하면 해당 함수도 -1 혹은 1에 가까운 출력을 할 때 기울기가 0에 가까워지기 때문이죠.

 하지만 그래도 Sigmoid 함수보다는 Vanishing Gradient 증상이 적은 편입니다. 그래서 Hidden Layer에서 Sigmoid 함수보다는 많이 쓰지만 해당 함수도 잘 쓰는 편이 아닙니다. 

---

### ReLu 함수(ReLu Function)

---

다음은 현재까지도 가장 많이 인공지능 개발자들에게 사랑을 받고 있으며 많이 사용하는 ReLu함수 입니다. 아직 까지 해당 함수를 변형하거나 대체하려는 함수들이 있지만 솔직히 말하면 얘만큼 성능 내는 함수가 없습니다.;;

그래서 꼭 여러분들이 이 함수 만큼은 완전히 이해 하시고 분석 해보셔야 합니다.

솔직히 말하면 얘만 써요 몇몇 경우를 제외하고는 얘 말고 쓴 것을 본적이 없어요.. 그리고 쓰더라도 해당 함수를 변형한 Leaky ReLu함수 이런 함수들이라서 ReLu함수를 알아야지 뒤에 설명할 변형 함수들을 이해 하실 수 있습니다.

```python
def relu(x):
    return np.maximum(0,x)

x=np.arange(-5.0,5.0,0.1)
y=relu(x)

plt.plot(x,y)
plt.plot([0,0],[5.0,0.0],':')
```

![Untitled 3](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/77bce250-f916-4ca5-b752-31b920672409)

해당 함수를 그래프로 그려 봤습니다.

자 한번 분석해보도록 합시다.

x가 0 이상 이면 y=x인 기울기가 1인 직선을 나타내며 0 이하는 모두 y=0이며 기울기가 0인 값을 나타내고 있습니다.

근데 얘가 인기가 왜 많을까요? 음수를 넣으면 그냥 0으로 꼬라 박혀서 나올 생각을 안하는데;

그 이유는 바로 양수일 경우에는 특정 양수 값에 수렴을 하지 않기 때문 입니다. 기울기도 0이 되지 않고요.

그렇기 때문에 DNN에서는 해당 함수를 hidden layer에서 활성 함수로 가장 많이 씁니다. 그리고 얘는 sigmoid, tanh 함수 처럼 어떤 연산이 필요한게 아니라 바로 단순 임계 값이기 때문에 연산 속도도 훨씬 빠릅니다. 그렇기 때문에 학습 속도도 훨씬 빠르죠.

하지만 얘도 치명적인 단점이 있습니다.

input값이 음수면 기울기가 0에서 박혀 가지고 나올 생각을 안합니다. 그리고 이 문제를 사람들은 죽은 렐루(dying ReLu)라고 부릅니다.

---

### Leaky ReLU Function

---

이는 ReLU의 변형 함수인 Leaky ReLU에 대해 알아보도록 합시다.

해당 함수의 목적은 ReLU의 치명적인 단점 죽은 렐루(Dying ReLU)를 해결하기 위해 나온 함수 입니다.

그럼 해당 함수를 코드로 짜서 그림으로 확인해 보도록 합시다.

```python
#leaky Relu
a=0.1

def leaky_relu(x):
    return np.maximum(a*x,x)

x=np.arange(-5.0,5.0,0.1)
y=leaky_relu(x)
plt.plot(x,y)
plt.plot([0,0],[5.0,0.0],':')
plt.title('Leaky ReLu')
plt.show()
```

![Untitled 4](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/83128692-94bf-4545-9382-deb2eb595410)


해당 함수는 음수일 경우에 0이 아닌 0.1, 0.01, 0.001과 같은 매우 작은 수를 반환하며 기울기를 가집니다.

수식은 f(x)=max(ax,x)로 표현이 되며 a는 Leaky(새는)정도를 조절 할 수 있는 하이퍼 파라미터 값 입니다. 해당 그래프는 Leaky ReLU의 가장 큰 특징인 새는 특징을 잘 나타내기 위해서 a를 0.1로 설정하였습니다.

왜 이 함수가 ReLU함수의 변형 함수냐면 양수 일 때는 기존의 ReLU함수와 똑같습니다. 

하지만 음수 일 때 기울기가 0이 되지 않으며 Dying ReLU가 발생하지 않기 때문입니다.

---

### Softmax Function

---

마지막은 우리가 많이 보던 Softmax Function입니다.

Sigmoid함수나 Softmax함수는 이진 분류 혹은 다중 클래스 분류 문제와 같은 분류 문제에서 많이 사용하는 함수 입니다.

대신 출력 층(Output layer)에서 주로 많이 사용하며 은닉 층(hidden layer)에서는 자주 사용하지 않는 함수 입니다.

해당 함수에 대해서는 자세히 설명하지는 않겠습니다.

```python
#softmax function
x=np.arange(-5.0,5.0,0.1)
y=np.exp(x)

plt.plot(x,y)
plt.title('Softmax Function')
plt.show()
```

![Untitled 5](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/0417d6d5-c81c-4583-b1f2-7347664dd840)

Softmax 함수 같은 경우에는 binary classification보다는 Multi class Classification에서 주로 사용하는 함수 입니다.

---
