---
layout: single
title: "다중 선형 회귀(Multi Linear Regression)"
categories: DeepLearning
tag: [python, coding, DeepLearning, LinearRegression]  
---

# 다중 선형 회귀(Multi Linear Regression)

이번에는 한번 다중 선형 회귀 (Multi Linear Regression)에 대해 다루어 봅시다.

이번에는 3가지의 쪽지 시험 점수를 바탕으로 최종 점수를 예상해보는 다중선형회귀 모델을 만들어 보려합니다.

![Untitled](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/a7bd1ba7-fde8-4ed6-a6cc-ddde7db61da8)


 이 문제를 통해서 우리가 얻고자 하는 것은 서로 다른 3개의 독립 변수로 x와 이 독립변수로 부터 영향을 받는 종속변수 y에 대한 관계식을 얻기 것 입니다.

그리고 이번 예제를 통해서 행렬 곱에 대해 알아보도록 하겠습니다.

이번 챕터는 개념 위주보다는 행렬 곱에 대해 위주로 다루도록 할 겁니다.

먼저 hypothesis부터 설계를 해보도록 하겠습니다.

x데이터와 y데이터의 관계를 통해서 우리는 hypothesis를 y=x1w1+x2w2+x3w3+b로 세울 수 있습니다.

![Untitled 1](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/b556ed2d-09bd-4b3a-a8e9-69ea215fb313)


이전과 같이 먼저 manual_seed(1)를 통해 seed값을 고정해줍시다.

그리고 위의 데이터 표와 같이 훈련 데이터를 한번 만들어 봅시다.

![Untitled 2](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/946974bb-2667-4f93-9330-4b6e94e01a44)


훈련 데이터를 만들었으니 weight와 bias도 만들어야겠죠?

그리고 훈련데이터의 종류가 3개이니 weight도 3개씩 만들어줍시다.

![Untitled 3](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/7fbb7dee-c546-47b2-8649-1ff7be13669c)


이후 Optimizer와 epochs, hypothesis, loss함수도 선언 해준 뒤 총 1000번을 학습시켜 줍시다. 

![Untitled 4](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/85ead9b5-3859-42b6-8b70-29624b25326d)


loss값이 점점 작아지는 것을 보아 weight와 bias가 개선이 되고 있음을 알 수 있습니다.

### 벡터의 내적을 이용해서 효율적으로 계산하기

이번 챕터에서 중점으로 다룰 예정이었던 벡터의 내적에 대해 알아보도록 하겠습니다.

우리가 이번 챕터에서 다루는 Multi Linear Regression 같은 경우 서로 종류가 다른 독립변수 x와 독립 변수 별로 서로 다른 가중치 weight가 필요합니다.

그리고 우리가 예제로 다룬 퀴즈 문제 처럼 독립 변수의 종류가 적다면 위의 예제 코드와 같이 직접 hypothesis함수를 작성해주면 됩니다.

하지만 만약 독립 변수의 개수가 10개 100개 1000개가 된다면 weight도 10개 100개 1000개가 필요할 겁니다. 그리고 이를 하나하나씩 선언을 해가며 hypothesis를 작성하는 것은 너무나도 비효율 적이고 불편합니다.

그렇기 때문에 우리는 벡터의 내적을 이용해서 효율적으로 계산을 해야합니다.

**???:도대체 벡터의 내적이랑 텐서끼리 곱하는 거랑 무슨 상관임?**

그 이유는 hypothesis를 표현하는 연산을 벡터의 내적으로 표현 할 수 있기 때문입니다.

![Untitled 5](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/bc01e5a6-43aa-4d1d-badd-7991ea284dc9)


한번 위의 자료처럼 예시를 들어봅시다.

x를 3x2형태의 2차원 텐서(벡터)로 표현하고 weight를 2x3크기의 2차원 벡터(텐서)로 표현하고 이 두 텐서(벡터)들을 곱하는 것인 1x2+2x9+3x11=58이 나오는 과정을 벡터의 내적으로 표현 할 수있습니다.

**???:근데 저건 벡터의 내적이고 우리가 곱해야하는거는 x1w1, x2w2, x3w3를 각각 계산한 뒤 더하는 거아님?**

네 맞습니다. 여러분이 생각하고 말씀하신 그 과정 자체가 벡터의 내적 과정과 결과 입니다.

위의 예시도 똑같이 x1w1, x2w2, x3w3를 각각 계산한 뒤 더한 결과입니다.

![Untitled 6](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/b3dcbe5c-210d-4636-8014-5d3876a3a5a3)


바로 이 식을 아래와 같이 벡터의 내적으로 표현 할 수 있죠

![Untitled 7](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/17395bb6-e71d-4d5f-a6c1-55bb353b4e1f)

그럼 우리가 앞서 다루었던 퀴즈 예제를 이용해서 벡터의 내적을 해봅시다.

![Untitled](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/a7bd1ba7-fde8-4ed6-a6cc-ddde7db61da8)


위의 데이터 표를 보면 서로 다른 퀴즈 1,2,3이 있습니다.

그리고 서로 다른 퀴즈이기 때문에 독립 변수 x1,x2,x3로도 표현이 가능합니다.

이렇게 y에 영향을 주는 서로 다른 독립 변수를 우리는 **특성(feature)**라고 표현합니다. 이 특성이라는 것은 여러분이 머신러닝을 공부하시다 보면 아주 많이 보시게 될 단어 입니다. 그러니 꼭 알아두도록 합시다!

그리고 셀 수 있는 데이터의 단위를 샘플(sample)이라고 합니다.

그럼 다시 한번 해당 데이터 표를 자세하게 보도록 합시다

특성은 3개이고 1개의 특성당 5개의 샘플이 있고 총 3개의 특성이 있으니 x는 (샘플의 수 x 특성의 수)=5x3 크기의 2차원 텐서(벡터)로 표현 할 수 있습니다. 그리고 우리는 이를 벡터 X라고 합시다.

또한 weight의 개수도 특성이 3개이기 때문에 3개입니다.

따라서 3x1크기의 2차원 텐서(벡터)로 표현할 수 있겠네요.

그리고 weight의 벡터도 벡터 W라고 합시다.

그럼 이 둘을 벡터의 내적으로 y를 구해봅시다.

![Untitled 8](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/d0bfe38c-892c-4e73-9a84-1061c87bc790)



이 두개의 2차원 텐서(벡터)를 벡터의 내적으로 구하면 y를 쉽게 구할 수 있습니다.

그럼 y=XW라는 식으로 단 한줄로 표현 할 수 있게 됩니다.

그럼 bias만 더하면 아래와 같은 식으로 표현할 수 있습니다.

그리고 bias의 벡터를 B라고 표현합시다.

![Untitled 9](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/79da0651-32e8-4f4c-80b2-7fd70f73eb6f)


그럼 y=XW+B라고 쉽게 표현 할 수 있습니다.

![Untitled 28](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/0b118ce7-bb10-4071-a0eb-adfae5d2cea6)


그럼 우리가 다루었던 개념들을 pytorch로 표현해봅시다.

![Untitled 10](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/c3ed7a14-3758-49c6-a023-078ddc3edb0a)


x_train과 y_train을 선언해주고 한번 잘 선언이 되었는지 확인해봅시다.

![Untitled 11](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/e7d53039-fb49-4624-bca3-e7bd9d1ec300)


5x3크기의 2차원 Tensor인 x_train과

5x1크기의 1차원 Tensor인 y_train이 잘 선언 되었네요.

그럼 훈련용 데이터도 만들었으니 weight와 bias도 선언 해주어야겠죠

![Untitled 12](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/6b72d17e-89c8-44c7-b662-01b911c184a6)


3x1크기의 2차원 Tensor(벡터)인 weight와 bias도 만들어줍시다. 그리고 gradient descent alogorithm을 optimizer로 사용할 예정이니 reqires_grad를 True로 설정해서 자동 미분을 가능하게 해줍시다.

weight와 bias 그리고 데이터까지 선언이 모두 완료 되었으니 hypothesis까지 선언해주도록 하겠습니다.

![Untitled 13](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/a47cf817-9685-4e70-a6b8-c9858cd9831d)


참고로 matmul메서드는 행렬을 계산하게 해주는 함수입니다.

이후 마지막으로 optimizer설정과 loss함수까지 선언해주고 gradient descent algorithm을 써서 weight와 bias 조정을 해주도록 합시다.

![Untitled 14](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/5e60b20b-d3d7-43ea-a0d2-1e04d759589a)

![Untitled 15](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/2451c655-2dfa-460f-ad93-9a9ac2b8cbd4)

점점 loss값이 작아지고 weight와 bias들이 조정이 되는 것을 확인 할 수 있습니다.

이렇게 다중 선형 회귀와 벡터의 내적을 통한 행렬 곱을 다루어 보았습니다.

선형 회귀는 중요한 머신러닝 개념이니 꼭 알아두도록 합시다!
