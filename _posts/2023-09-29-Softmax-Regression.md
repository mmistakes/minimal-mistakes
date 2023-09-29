---
layout: single
title: Softmax Regression
category: deeplearning
tag: [deeplearning , coding , Softmax Regression , Python , Pytorch]
toc: true
---

우리는 저번까지 Logistic Regression을 통해 binary classfication을 할 수 있었습니다.(이진 분류)

하지만 사실 우리가 일상 생활에서도 문제를 직면하게 된다면 여러가지의 선택지 중에서 하나를 골라야 하는 경우가 굉장히 많습니다.

이럴 때 사용하는 것이 바로 Softmax Regression 입니다.

Softmax Regression같은 경우 앞에서 배웠던 one-hot encoding과 굉장히 유사합니다.

 Softmax Regression은 선택지의 개수만큼 차원의 벡터를 만들며 해당 벡터들의 합이 1이 되도록 하는 Softmax function을 지나치도록 하는 것 입니다.

그리고 Softmax Regression을 통해 Mulit classification(다중 클래스 분류)를 할 수 있습니다.

Softmax Regression에 대해 알아 보기 위해 가장 많이 쓰는 다중 클래스 분류 문제인 붓꽃 품종 고르기 데이터를 활용하겠습니다.

![Untitled](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/a99b538e-0eaf-416b-bec6-27d168133a3c)

해당 데이터를 조금 분석 해보자면

순서대로 꽃받침 길이, 꽃받침 넓이, 꽃잎 길이, 꽃잎 넓이 이 4가지의 특성(feature)을 기반으로 setosa, veriscolor, virginica 3가지의 꽃 품종을 고르는 아주 대표적이고 실험용으로도 많이 사용하는 다중 클래스 분류 문제입니다.

![Untitled 1](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/2c8a9cbf-531d-4148-978f-af16db2cce28)

X는 input data이며 해당 데이터를 softmax function에 넣었을 때 

각 클래스 별로 해당 데이터가 어떤 클래스일지에 대한 확률을 보여주는 그림 입니다.

해당 데이터 같은 경우 클래스 2의 정답 확률이 0.75 즉 75프로 이기 때문에 해당 데이터 같은 경우 클래스 2번으로 분류 할 수 있습니다.

해당 그림에서 조금 잘못 된 점이 있습니다. 여기서 모든 클래스의 총 확률이 1이 되어야 합니다. 하지만 0.15가 초과가 됬네요.

클래스 분류 문제의 경우 각 클래스가 될 확률을 더했을 때 1이 되어야 합니다.

### Softmax function

---

이번에는 소프트맥스 함수 Softmax function에 대해 알아보도록 하겠습니다.

![Untitled 2](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/0d972fb0-f535-4b4c-9c7f-ba65740698f3)

Softmax function은 위의 수식과 같습니다.

근데 사실 위의 수식만 보고는 무슨 말인지 이해를 할 수가 없을 겁니다.

그럼 위 수식을 우리가 처음에 Softmax Regression을 이해하기 위해 예로 들었던 붓꽃 분류 문제에 적용 시켜 보도록 하겠습니다.

붓꽃 분류 문제에서는 feature가 4개 클래스가 3개였습니다.

그럼 k=3임으로 3차원의 벡터를 입력 받게 될 것입니다.

![Untitled 3](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/6dca9ec2-ecd2-4562-b55c-2ab14f01d2bd)

그럼 위의 수식과 같이 표현을 할 수 있게 됩니다.

여기서 p1,p2,p3는 클래스 1, 클래스 2 ,클래스 3의 각각의 정답 확률이며 이 확률을 모두 더한 y는 1이 나오게 됩니다.

이와 같이 선택지의 개수만큼 차원을 가지는 벡터를 만들어 내고 해당 벡터의 총 합이 1이 되도록 만들어 내는 함수가 바로 Softmax Function이며 다중 분류 문제에서 많이 사용되는 함수 입니다.

그럼 한번 이 Softmax Function을 한번 붓꽃 분류 문제에 적용시켜 그림으로 표현해보도록 하겠습니다.

![Untitled 4](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/e552bab4-71fb-4561-aa0b-00b8d42685b4)

붓꽃 분류 문제에서 특성은 총 4개임으로 4차원 벡터가 될 것이며 클래스는 3개이기 때문에 3차원 벡터가 될 것 입니다.

그렇기 때문에 Softmax함수에서 입력을 받는 벡터는 3차원 벡터로 입력을 받아야 하지만 입력 데이터의 특성이 4개 이기 때문에 4차원 벡터를 3차원 벡터로 바꿔서 입력을 시켜야 합니다.

그럼 어떻게 벡터를 변환 시킬 수 있을까요

![Untitled 5](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/382fd380-1889-4001-b15a-1ef75caa6273)

위의 그림에서 화살표는 가중치 weight를 의미 하며 4x3=12개의 화살표(가중치)가 있습니다. 그리고 해당 가중치는 서로 다른 값이며 각 특성마다 서로 다른 가중치를 곱해서 Softmax Function의 입력 벡터 차원으로 크기를 변환 시킵니다.

그리고 학습을 하면서 loss값을 최소화 하기 위해 weight를 개선시킵니다.

그럼 loss값을 최소화 시키는 원리에 대해 알아보도록 하겠습니다.

---

### Loss를 최소화 시키며 가중치를 개선하는 방법

---

![Untitled 6](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/8f797aec-49a3-4f29-8fea-d4d927d4d895)

위의 그림은 붓꽃 분류 데이터에서 각 클래스 별로 one-hot encoding을 진행 시킨 결과 입니다.

![Untitled 7](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/dfefa118-a657-4897-bf0d-57fca8deb1ba)

만약 우리가 넣은 데이터가 setosa에 대한 데이터이며 예측 결과 값이 [0.1,0]으로 setosa의 one-hot encoding의 결과가 나오게 된다면 예측 값과 실제 값이 완전히 일치함으로 loss값은 0이 될 것 입니다.

하지만 그 외의 경우에는 오차가 발생하게 될 것 입니다.

![Untitled 8](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/74f77d1f-4234-4c55-9ea7-a5a6ad9527dd)

그럼 오차를 개선하기 위해서는 weight와 bias를 개선 해야 할 것이고 위의 그림과 같이 weight와 bias가 개선이 될 것 입니다. 

그리고 이를 개선하기 위해 사용하는 오차 함수가 바로 cross_entropy함수 입니다.

---

### Loss Function=Cross_Entropy

---

![Untitled 9](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/b70ab9a1-1465-4506-b702-76aa55a495d1)

위의 수식이 바로 cross entropy 함수입니다.

여기서 y는 실제 값이며 k는 클래스의 개수,  yj는 실제 값 y의 one-hot encoding의 j번째 인덱스 값, pj는 샘플 데이터가 j번째 클래스일 확률을 의미합니다.

만약 a,b,c를 분류하는 문제에서 a가 one-hot encoding에서 1을 가진 원소의 인덱스인 경우 Pa=1은 모델이 정확하게 예측한 y값이 맞습니다.

이를 그럼 식에 대입하게 된다면 -1log(1)=0이 되기 때문에 모델이 정확하게 실제 답을 예측을 했기 때문에 크로스 엔트로피 함수는 0의 값을 가지게 됩니다.

![Untitled 10](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/d08b0719-43d6-4692-aae9-2ab7453c71fc)

그럼 우리는 loss값을 최소한으로 가지게 하기 위해서는 위의 수식의 값이 최소가 되어야 합니다.

![Untitled 11](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/6dc1c0a8-943d-411c-aec3-ff203aa9705d)

만약 이를 n개의 전체 데이터에 대한 평균을 구해 평균 loss를 구하기 위해서는 위의 수식과 같습니다.

좀 더 자세하게 간단한 그림 예시를 보며 이해하기 위해선 해당 강의를 보시는 것을 추천 드립니다.

[https://www.youtube.com/watch?v=LLux1SW--oM](https://www.youtube.com/watch?v=LLux1SW--oM)

[Pytorch를 이용해 Softmax function 구현](Softmax%20Regression%206c078326dd19451cbc51b6cdebd40e18/Pytorch%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A2%20Softmax%20function%20%E1%84%80%E1%85%AE%E1%84%92%E1%85%A7%E1%86%AB%2012054a3b473243e4bf3c891b065b9971.md)

[Pytorch를 이용하여 Softmax Regression을 구현하기 ](Softmax%20Regression%206c078326dd19451cbc51b6cdebd40e18/Pytorch%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%8B%E1%85%A7%20Softmax%20Regression%E1%84%8B%E1%85%B3%E1%86%AF%20%E1%84%80%E1%85%AE%E1%84%92%E1%85%A7%E1%86%AB%E1%84%92%E1%85%A1%20b79ad3277c9a4c12bd14674aa0059358.md)

[Softmax Regression을 이용해 MNIST데이터 셋을 분류해보기](Softmax%20Regression%206c078326dd19451cbc51b6cdebd40e18/Softmax%20Regression%E1%84%8B%E1%85%B3%E1%86%AF%20%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A2%20MNIST%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5%20%E1%84%89%E1%85%A6%E1%86%BA%E1%84%8B%E1%85%B3%E1%86%AF%20%E1%84%87%20c407d34e80304b318811ff6e0e25d9b1.md)