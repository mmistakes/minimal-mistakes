## 7. Inception-v3 모델 알아보기

### 7.0 들어가며
이전 글들에서 다뤘듯이, 컴퓨터 비전을 위한 딥러닝 모델을 만들때 사전 훈련된 모델들을 사용하면 좋은 성능의 모델을 얻을 수 있다. 이번 글에서는 사전 훈련된 모델 중 하나인 Inception-v3 모델에 대해서 다룰건데, Inception-v3 모델의 베이스 모델들인 GoogLeNet과 Inception-v2 모델에 관해서 다룬 후, 본격적으로 Inception-v3 모델에 대해서 설명으로 글을 마무리하겠다.

### 7.1 GoogLeNet (Inception), 2014
Inception architecture라는 예명도 가지고 있는 GoogLeNet 모델은 이름에서도 알 수 있듯이 구글이 주도해서 개발한 모델이다. 

먼저 모델의 구조도를 살펴보자.

![incep1](https://user-images.githubusercontent.com/77332628/202139016-be32bbc9-23c0-4827-9d72-5ec3dda4fb25.png)


GoogLeNet은 총 22개의 층으로 구성되어 있으며, 위의 이미지에서 볼 수 있듯이 굉장히 길고 복잡하게 구성되어있다. 이제 이 복잡한 모델을 하나하나 분석해보자.

#### 7.1.1 Inception Module
GoogLeNet에서는 **Inception Module**이라는 block 구조를 사용한다.

![incep2](https://user-images.githubusercontent.com/77332628/202139025-02ced19c-d40b-48a3-8742-27151df01c68.png)


기존에는 각 layer 간에 하나의 convolution 연산과 하나의 pooling 연산을 연결했었다면, 위의 이미지처럼 inception module은 4가지의 서로 다른 연산을 거친 뒤 feature map을 channel 방향으로 합치는 기법을 사용한다. 또한 다양한 receptive field를 표현하기 위해서 1x1, 3x3, 5x5 convolution 연산을 섞어서 사용했다. 이 방식이 위 이미지의 (a)그림인 **Naive Inception module**이라고 부른다. Naive Inception module의 3x3, 5x5 convolution 연산이 많은 연산량을 차지하기 때문에 두 convolution 연산 앞에 1x1 연산을 추가해서 feature map 개수를 줄인 후, 다시 3x3 conv 연산과 5x5 conv 연산을 수행해서 feature map 개수를 다시 늘리는 bottleneck 구조를 추가한 방식이 위 이미지의 (b)**Inception module with dimension reduction**이다.

#### 7.1.2 Auxiliary Classifier

![incep3](https://user-images.githubusercontent.com/77332628/202139027-012a110e-9e11-4399-a6c7-1705e6b80f8a.png)


모델의 구조도를 자세히 보면 총 9개의 inception module을 사용한 것을 알 수 있는데, 3번째와 6번째 inception module 뒤에 classifier를 추가로 붙여서 총 3개의 분류기를 사용했는데, 이를 **Auxiliary(보조) Classifier**이라고 부른다. 보조 분류기를 추가로 사용하는 이유는 가장 뒷 부분에만 분류기가 있으면 input과 가까운 쪽(앞 쪽)에는 gradient가 잘 전달되지 않는 vanishing gradient 현상이 생길 수 있는데, Network의 중간 부분과 앞 부분에 추가로 softmax 분류기를 붙여주어서 vanishing gradient를 완화시켰다. 다만 auxiliary classifier로 구한 loss는 보조적인 역할을 하기 때문에, 주 분류기인 가장 뒷 부분에 있는 Classifier보단 모델에 적은 영향을 주기 위해 loss에 0.3을 곱해서 전체 loss에 더한다. 이는 학습 단계에서만 사용되고 추**론 단계에서는 성능 향상이 미미하기 때문에 사용되지 않는다.**

#### 7.1.3 Gloabl Average Pooling

![incep4](https://user-images.githubusercontent.com/77332628/202139029-1f426132-1e65-415d-a7fb-8a9aeebd3d02.png)


마지막으로는 NIN 논문에서 제안된 방식인 **Global Average Pooling**(GAP)을 사용해서 Fully-connected layer를 대체함으로써 parameter 수를 크게 줄인다. GAP는 각 feature map의 모든 element의 평균을 구해서 하나의 node로 바꿔주는 연산이며, feature map의 개수만큼의 node를 출력한다. GoogLeNet에서는 GAP를 거쳐서 총 1024개의 node를 만든 뒤 class개수 (ImageNet=1000)의 output을 출력하도록 하나의 fully-connected layer를 사용해서 분류기를 구성함으로써 VGG 같은 모델들보다 훨씬 적은 수의 parameter를 갖게 되었다.

### 7.2 Inception-v2, 2016
GoogLeNet의 후속 모델인 Inception-v2의 핵심 요소는 크게 3가지로 나눌 수 있다. 

#### 7.2.1 Conv Filter Factorization
GoogLeNet(Inception-v1) 모델은 VGG, AlexNet에 비해서는 parameter수가 굉장히 적지만 여전히 많은 연산 비용이 든다. Inception-v2는 연산 복잡도를 줄이기 위해 **Conv Filter Factorization** 기법을 사용한다. Conv Filter Factorization은 5x5 conv를 3x3 conv 2개로 분해하는 것처럼 더 작은 합성곱으로 분해하는 것이다. 3x3 conv 보다 큰 필터는 언제든지 3x3 conv로 분해하는 것이 좋다는 연구 결과가 있다.

실제로 Inception-v2에서는 아래 이미지처럼 inception module에서 5x5 conv 부분을 두개의 3x3 conv로 분해한다.

* 기존 inception module

![incep5](https://user-images.githubusercontent.com/77332628/202139032-0784ae75-c81a-4848-a526-ace166902e35.png)


* 작은 합성곱 필터로 분해한 inception module

![incep6](https://user-images.githubusercontent.com/77332628/202139033-9bf83fcc-8db1-44bd-94bf-7daf54c22f3f.png)


#### 7.2.2 비대칭 합성곱 분해 
그렇다면 3x3 conv 필터를 더 작은 conv 필터로 분해할 수 있을까? Inception-v2 논문의 저자에 따르면 2x2 conv로 분해하는 것보다 nx1 비대칭 conv로 분해하는 것이 더 효과적이라고 한다. 예를 들어 아래 이미지처럼 3x3 conv를 1x3 conv와 3x1 conv로 분해하는 것이다. 

![incep7](https://user-images.githubusercontent.com/77332628/202139037-2fd95781-3ec8-4f33-a844-f6c096de1399.png)


feature map 사이즈가 17~20 사이일 때 효과적이기 때문에 Inception-v2 모델에서는 inception module에서 nXn conv를 nx1 과 1xn conv로 대체하면 다음과 같이 된다.

![incep8](https://user-images.githubusercontent.com/77332628/202139042-a508f0a7-cbaa-4422-be14-8585d46cfb58.png)


#### 7.2.3 보조 분류기(Auxiliary Classifiers)의 역할의 변화
GoogLeNet에서 보조 분류기를 사용하면 신경망이 수렴하는데 도움이 된다고 했었는데, 실험 결과 별다른 성능 향상에 도움이 안된다는 것이 밝혀졌다. 하지만 Auxiliary classifiers에 Dropout이나 batch normalization을 적용했을 때 메인 분류기의 성능히 향상된 것으로 보아서 auxiliary classifier는 성능 향상보다 정규화 효과가 있을 것이라고 추측한다. 그래서 Inception-v2에서는 1개의 보조 분류기만 사용했다.

* 보조 분류기에 배치 정규화를 적용하니 0.4%의 정확도가 개선되었다는 것을 설명하는 이미지

![incep9](https://user-images.githubusercontent.com/77332628/202139047-8ebf09f5-3ab3-43c5-b862-e6c47dcc23bb.png)


#### 7.2.4 Grid Size Reduction
일반적인 CNN 신경망은 feature map의 크기를 줄이기 위해 pooling 연산을 사용하는데, pooling을 하면 나타나는 신경망의 표현력이 감소되는 representational bottleneck을 피하기 위해 필터 수를 증가시킨다. 이는 신경망의 표현력을 포기하거나 많은 연산 비용을 감수하는 선택을 해야한다. 하지만 Inception-v2에서는 표현력을 감소시키지 않고 연산량을 감소시키는 방법을 사용한다. 

![incep10](https://user-images.githubusercontent.com/77332628/202139050-7069e2b9-1bc4-4b86-99b7-5d80496efdcd.png)


위의 이미지와 같이 stride=2인 pooling layer와 conv layer를 병렬로 상용하고 둘을 연결하는 방법을 사용해서 표현력을 감소시키지 않으면서 연산량을 감소시킨다. 최종적으로는 다음 이미지와 같은 방식을 사용했다고 한다.

![incep11](https://user-images.githubusercontent.com/77332628/202139055-5cfff798-0bce-4ac0-bbee-a1130f3ff3bf.png)


#### 7.2.5 최종 Inception-v2 모델
7.2.1 ~ 7.2.4까지 소개된 아이디어들이 최종 적용된 Inception-v2의 architecture 표는 다음과 같다. 7.2.1의 Factorization 방법을 사용해서 3x3 conv 연산 3개로 대체가 되었고, 나머지 아이디어들이 차례대로 적용되었다.

![incep12](https://user-images.githubusercontent.com/77332628/202139058-d2db380e-f5a3-4a82-810c-58bd63f1f5f3.png)


### 7.3 Inception-v3, 2016
Inception-v3는 Inception-v2의 architecture는 그대로 가져가고, 다음의 몇가지 기법들을 적용해서 최고의 성능을 내는 모델이다.

#### 7.3.1 Model Regularization via Label Smoothing
**Label Smoothing** 기법은 정규화 테크닉 하나로 간단하면서도 모델의 일반화 성능을 높여서 주목 받은 기법이다. Label Smoothing에 관해서 간단히 설명하자면 만약 기존 label이 [0,1,0,0]이라면 레이블 스무딩을 적용하면 [0.025,0.925,0.025,0.025]가 되는데, 이는 정답에 대한 확신을 감소시켜서 모델의 일반화 성능을 향상시킨다.

#### 7.3.2 기타 기법들
* optimizer를 Momentum optimizer 에서 RMSProp optimizer로 변경
* Auxiliary classifier의 FC layer에 Batch Normalization 추가

다음은 Inception-v3의 architecture이다.

![incep13](https://user-images.githubusercontent.com/77332628/202139061-9fa97c46-e11e-4cef-86aa-92d02c020ad8.png)
 

(출처:https://sh-tsang.medium.com/review-inception-v3-1st-runner-up-image-classification-in-ilsvrc-2015-17915421f77c)


*출처를 밝히지 않은 이 글의 모든 이미지의 출처는 original 논문이다.*
