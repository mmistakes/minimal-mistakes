---
layout: single 
title: "SRCNN 논문 리뷰(Paper Review)"
categories: DeepLearning
tag: [DeepLearning, paper-reveiw, SRCNN, Super-Resolution] 
toc: true
---


논문 명: Image Super-Resolution Using Deep Convolutional Networks

해당 논문은 SRCNN으로 불리지만 사실 풀 네임은 위와 같습니다.

해당 논문의 분야는 Image Super Resolution(SR)분야에서 딥 러닝을 적용시켜 만든 논문이다.

- **???: Image Super Resolution은 뭐임?**
    
    먼저 해당 논문을 리뷰 하기 전에 Image Super Resolution이 뭔지 부터 알아 보도록 합시다.
    
    해당 논문에서는 첫 장 INTRODUCTION 부분에서  Single image super-resolution(SR)에 대해 설명을 하고 있다.
    
    간단하게 요약하자면 단일 low-resolution(저해상도) 이미지를 high-resolution(고해상도) 이미지로 바꾸어 주는 기법이다.
    
    해당 기법은 컴퓨터 비전 분야의 일 부분인 분야로서 컴퓨터 공학 전공 혹은 컴퓨터 공학 전공 중에서도 컴퓨터 비전에 관심이 없으신 분들은 모를 수 있다.
    
    그럼 첫 장 INTRODUCTION 부분을 요약해서 리뷰 해보도록 하겠다.
    

## 1.INTRODUCTION

---

먼저 컴퓨터 비전 분야에서 Single image super-resolution은 컴퓨터 비전 분야에서의 전통적인 문제 였다고 합니다. 특히, 저 해상도에서 고 해상도로 바꾸는 문제는 정답이 없는(ill-posed)문제 였다고 합니다. 왜 정답이 없는 문제였냐면 저 해상도 픽셀이 주어졌을 때 unique한 해 즉 독특한 값이 아닌 

너무나 다양한 해가 존재 하기 때문이라고 저자는 설명하고 있습니다. 

그니까 정답이 있다는 것은 1+1=2 라고 명확한 해가 존재 해야 하는데 주말에 배고픈데 뭘 시켜먹지? 라는 문제가 주어졌을 때 짜장면을 시켜 먹어도 되고, 짬뽕을 시켜 먹어도 되는 명확한 해가 주어지지 않았다는 것 입니다.

SRCNN이 나오기 전에 SR 분야에서 적용 시킨 방법은 아래와 같습니다.

---

- **1.example based strategy**
    
    해당 방식은 external example인 저 해상도/고 해상도 이미지 patch의 쌍을 매핑하는 함수를 학습시키는 방식이라고 합니다. 혹은 동일한 이미지의 내부 유사성을 활용 하는 방법이라고 합니다.
    
    ![Untitled](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/a3f3af28-e8fd-44ea-bb14-77e1c715e3bf)
    
    [출처:[https://www.researchgate.net/publication/315954141_Multi-sensor_image_super-resolution_with_fuzzy_cluster_by_using_multi-scale_and_multi-view_sparse_coding_for_infrared_image](https://www.researchgate.net/publication/315954141_Multi-sensor_image_super-resolution_with_fuzzy_cluster_by_using_multi-scale_and_multi-view_sparse_coding_for_infrared_image)]
    
- **2.The sparse-coding-based method**
    
    이 방식은 대표적인 example based 기반 SR방법이라고 합니다.
    
    해당 방식은 solution pipeline에 여러 단계가 포함이 됩니다.
    
    ![Untitled 1](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/d6225e77-182f-4274-840c-7af52f6f6523)
    
    [출처:
    
    [https://www.researchgate.net/publication/319707337_Performance_Evaluation_of_Super-Resolution_Methods_Using_Deep-Learning_and_Sparse-Coding_for_Improving_the_Image_Quality_of_Magnified_Images_in_Chest_Radiographs](https://www.researchgate.net/publication/319707337_Performance_Evaluation_of_Super-Resolution_Methods_Using_Deep-Learning_and_Sparse-Coding_for_Improving_the_Image_Quality_of_Magnified_Images_in_Chest_Radiographs)]
    
    1.입력된 저 해상도 이미지로부터 overlapping patch들을 전처리(subtracting and normalization)과정이 이루어집니다.
    
    2.이 패치들은 인코딩되어 low-resolution dictionary에 저장이 됩니다.
    
    3.sparse coefficient들은 고 해상도 딕셔너리를 거쳐 high-resolution patches를 만듭니다.
    
    4.재 복된 overlapping patch들은 weighted averaging같은 과정을 통해 합쳐지고 최종적으로 output을 나오게 된다고 합니다.
    
    그런데 위의 전통적인 SR방식들은 pipeline의 모든 단계들에 대해 거의 최적화 시키지 않는다고 합니다.
    
    이 논문에서는 저 해상도 이미지와 고 해상도 이미지를 (end-to-end mapping)을 하여 학습하는 CNN을 생각했다고 합니다.
    
    여기서 end-to-end-mapping은 CNN의 처음부터 끝까지 통과시킨 다는 의미 입니다.
    
    그리고 논문에서는 기존의 방식과 다르게, 명시적으로 manifolds나 dictionary를 학습시키지 않아도 된다고 하네요.
    
    또한 패치 추출이나 모음도 Covolution layer를 통해 이루어 질 수 있다고 합니다. 그리고 저자들은 우리의 방법을 사용한다면 전체 SR pipeline이 약간의 전후처리 외에는 모두 학습을 통해 얻어진다고 합니다.
    
    이 SRCNN의 장점은 크게 4가지가 있다고 합니다.
    
    1)기존 방법들보다 구조가 간단하지만 정확도가 훨씬 높다.
    
    2)CPU에서 쓸 수 있을 정도로 속도가 빠르다
    
    3)모델이 크고 깊을수록, 데이터 셋이 더 다양할수록 성능이 증가한다.
    
    4)이미지의 3채널(color image)에 대해 동시 처리가 가능하다
    
    SRCNN의 주요 연구 성과
    
    1)SR분야에 CNN모델을 적용
    
    2)딥러닝 기반의 SR방식과 전통적인 sparse-coding기반의 SR방식간의 관계 성립
    
    3)딥러닝이 고전적인 컴퓨터 비전분야의 문제였던 SR에 유용하고 좋은 성능과 속도를 달성 했다는 것
    
    그리고 저자들은 이전에도 이런 연구를 했었고 이전 연구에 비해 개선 점을 몇 가지 추가를 했다고 합니다.
    
    1)SRCNN의 비선형 매핑 레이어에 들어가는 filter size를 더 크게 만들었고 비선형 레이어를 추가함으로써 구조를 더 깊게 확장 시켰다고 합니다.
    
    2)YCbCr이든 RGB든, 3채널의 이미지 즉 컬러 이미지를 동시에 처리할 수 있게 해주었다고 합니다.
    
    ---
    
    ## 2.RELATED WORK
    
    ---
    
     single-image super resolution algorithm은 이전에는 총 4가지로 나눌 수 있었다고 합니다.
    
    prediction models, edge based methods, image statistical methods, pach based( or example-based) methods 이렇게 총 4가지가 있었는데 여기서 prediction models 만  state-of-the-art performance를 보여줬다고 하네요
    
    기존의 전문적인 SR 알고리즘들은 gray-scale 혹은 single channel image(흑백 사진)의 image resolution에 초점을 맞췄다고 합니다.
    
    컬러 이미지에 대해서는 YCbCr이나 YUV와 같이 다른 이미지 포맷으로 변환 시킨 후 오직 luminance 채널에만 SR을 적용시켯다고합니다.
    
    ---
    
    ## 2.2 Convolutional Neural Network
    
    ---
    
    CNN은 저자가 논문을 썻을 당시에 분류 문제에서 엄청난 인기가 폭발했다고 합니다.
    
    또한 컴퓨터 비전 분야에서 적용 하였을 때 성공적 이였다고 합니다. (ex: object detection, face recognition, pedestrian detection)
    
    그리고 저자는 CNN의 장점에 대해 설명합니다.
    
    1)강력한 GPU를 이용하여 효율적인 훈련이 가능하다.
    
    2)ReLU함수가 좋은 성능을 보여주며 변환 속도가 빠르다
    
    3)큰 모델을 훈련 시키기 위한 데이터 셋(ex image Net)에 접근성이 좋다
    
    ---
    
    ## 2.3 Deep Learning for Image Restoration
    
    MLP를 이용하여 natural image denoising, post-deblurring denoising을 했다고 합니다.
    
    ---
    
    이전에도 딥 러닝을 이용한 image restoration 연구가 몇개 있었다고 합니다.
    
    더욱 더 관련 된 연구로는 CNN을 적용하여 natural image denoising 과 removing noisy patterns(dirt/rain)하였다고 합니다.
    
    Cui라는 사람이 super-resolution pipeline에 embed auto-encoder networks를 적용하는 것을 제안했다고 합니다. 근데 그 모델은 각 layer마다 self-similarity process와 auto-encoder를 독립적으로 최적화를 해줘야 했다고 합니다. 그래서 이 모델은 end - to -end solution이 아니 였다고 하네요.
    
    하지만 이 SRCNN은 속도적인 면에서 굉장히 빠르고 양적으로 우수한 방법 일 뿐만 아니라 실질적으로 유용한 방법이라고 저자는 설명하고 있습니다.
    
    ---
    
    ## 3.Convolutional Neural Networks For Super Resolution
    
    ---
    
    ![Untitled 2](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/32494535-3472-48d5-b2a1-d6a920cd3f8f)
    
    [출처:[https://arxiv.org/abs/1501.00092](https://arxiv.org/abs/1501.00092)]
    
    해당 사진은 SRCNN논문 원본에 있는 사진이며 SRCNN의 구조와 방식에 대해 설명해주는 사진입니다.
    
    SRCNN의 구조에 대해 저자가 말해주는데 한번 보도록 하겠습니다.
    
    단인 저 해상도 이미지에 대해 bicubic interpolation을 이용해서 우리가 고안한 사이즈로 upscale을 하는게 전처리 과정의 전부라고 합니다.
    
    그리고 이러한 과정을 통해 만들어진 이미지를 Y라고 표현합니다.
    
    본 연구의 목적은 Y를 F(Y)로 복원 하는 Mapping 함수 F를 학습 하는것이 목적이라고 합니다. 그리고 이 F(Y)는 고 해상도 이미지 X와 같다고 저자는 작성하였습니다
    
    요약하자면 원본 이미지를 일정 크기로 잘라서 늘렸다가 줄였다가 해서 저 해상도 이미지로 만든 뒤 해당 이미지를 원본 이미지와 같은 고 해상도 이미지로 복원 해주는 Mapping 함수를 찾는 것이 목적이라고 하네요
    
    CNN에서 이루어지는 과정 3가지를 저자는 설명합니다.
    
    1) Patch extraction and representation: 이 과정은 overlapping된 패치들을 저 해상도 이미지 Y에서 추출하고 고 차원의 벡터로 나타냅니다. 이 벡터들은 feature map 집합을 구성하며 개념적으로 이 벡터들의 집합 수는 벡터의 차원과 같다고 합니다.
    
    2)Non-linear mapping:  첫 번째 과정을 통해 만들어진 고 차원 벡터들을 또 다른 고 차원의 벡터로 비선형 맵핑을 한다고 합니다.
    
    각 맵핑 된 벡터들은 고 해상도 patch의 표현이라고 할 수 있다합니다.
    
    3)Reconstruction: 위 과정을 통해 만들어진, 고 해상도를 나타내는 표현(패치)들이 모여 최종적으로 high-resolution image를 만들어 냅니다.
    
    그리고 이 이미지는 실제 정답 이미지 X와 굉장히 유사하다는 것을 기대 할 수 있습니다.
    
    ---
    
    ![Untitled 2](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/32494535-3472-48d5-b2a1-d6a920cd3f8f)
    
    사실 위의 설명이 굉장히 복잡하고 어렵지만 위의 사진과 같이, SRCNN은 결국 Convolution layer에 Low-resolution image를 input에 넣고 선형 계산과 비선형 계산을 굉장히 많이 해서 high-resolution image를 최종적으로 출력 하는 얕은 CNN모델이라는 것 입니다.
    
    ---
    
    ## 3.2 Relationship to Sparse-Coding-Based Methods
    
    ---
    
    저자는 CNN과 Sparse-coding-based SR methods간의 관계를 설명해주며 Sparse-coding-based SR methods가 CNN으로 표현이 가능하다는 것을 보여줍니다.
    
    ![Untitled 3](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/d88eaf35-eb80-4325-afed-bbb34b7e848c)
  
    1) input에서 f1 x f1 low resolution patch를 뽑아냅니다.
    
    2) 이후 뽑아낸 patch를  sparse coding solver를 통해 low resolution dictionary로 project한다고 합니다.
    
    - 만약 dictionary size가 n1이면 n1 linear filter(f1 x f1)를 input image에 적용하는 것과 같다고  합니다.(mean substraction과 같은 정규화 또한 linear 연산이므로 포함된다 합니다)
    
    3) Sparse coding solver는 반복 적으로 n1 coefficients를 처리 한다고 합니다.
    
    - 이렇게 처리된 output은 n2 coefficients이고 보통 n2=n1 이라고 하며 n2 coefficients는 high-representation patch라고 합니다.
        
        sparse codinig solver는 1x1에서의 비선형 mapping 연산자라고 볼 수 있다고 합니다.
        
        하지만 sparse coding solver는 feed-forward가 아니라고 합니다 왜냐면 반복 알고리즘이기 때문이죠
        
        하지만 비선형 연산은 완전한 feed-forward 이며 계산을 효율적으로 한답니다.
        
        만약  f2=1 이라 하면, 비선형 연산자는 pixel-wise fully connected layer로 볼 수 있다고 합니다.
        
        그렇기 때문에 sparse coding solver는 SRCNN의 1번째, 2번째 layer의 역할과 같다고 볼 수 있다고 합니다.
        
        따라서 SRCNN은 비선형 연산도 학습 과정에서 잘한다고 합니다.
        
    
    4) Sparse coding 후의 n2 coefficients는 high-resolution patch를 만들기 위해 high-resolution dictionary로 project 된다
    
    결론을 요약하자면 sparse-coding based SR methods를 일종의 CNN 이라고 본다고 합니다. 하지만 이는 CNN의 과정의 일부로만 볼 수 있지 전체적인 CNN으로 볼 수 없다고 합니다. 왜냐하면 CNN은 전 과정을 최적화 하지만 sparse-coding method는 일부만 최적화 하기 때문에 CNN과 sparse-coding method는 다르다고 합니다.
    
    ---
    
    ## 3.3 Training
    
    ---
    
    LOSS function은 MSE(mean square error)를 쓴다고 합니다.
    
    여기서 LOSS SRCNN으로 나온 F(Y)와 고화질 이미지 원본 X와의 차이를 계산한다고 합니다. 그리고 이 Loss function의 최적화는 SGD로 최소화 시킨다고 합니다.
    
    그리고 얼마나 최적화가 잘 되서 고 해상화 되었는지는 PSNR수치를 사용한다고 하네요.
    
    PSNR은 최대 신호 대 잡음비(Peak Singnal-to-noise ratio)라고 하며, 신호가 가질 수 있는 최대 전력에 대한 잡음의 전력을 나타낸 것이라고 합니다.
    
    이 PSNR수치는 이미지 복구 성능을 평가하기 위해 널리 사용되는 수치라고 하며,  주로 영상 손실 압축에서 화질 손실 정보를 평가할 때 사용된다 합니다.
    
    MSE의 값이 낮아질수록 PSNR이 높아지므로 PSNR수치가 높으면 초 해상화가 잘 된 이미지라고 할 수 있습니다.
    
    ![Untitled 4](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/def09213-c023-4bb4-9214-6edfa850509e)
    
    훈련과정에서 ground truth image인 X(i)는 훈련 이미지들로부터 f x f x c크기로 잘려진 sub-image 라고 합니다. 
    
    sub-image는 patch가 아닌 image로 보는데 그 이유는 패치는 평균화  과정과 후처리가 필요하지만 sub-image는 필요가 없기 때문이라고 저자는 설명합니다.
    
    위의 과정과 같이 원본 이미지 X를 특정 사이즈로 잘라서  sub-image를 만든 뒤 다시 원본 이미지에서 똑같이 특정 사이즈로 짤라서 또 sub-image를 만드는데 이번에 만든 sub-image는 저 해상도 이미지 Y로 만들어서 훈련에 사용을 한다 합니다.
    
    그리고 가우시안 커널을 이용해 sub-image를 흐리게 만들고, upscaling factor를 이용해 bicubic interpolation을 하여 up scaling을 한다고 합니다.
    
    ---
    
    ## 4.Experiments
    
    ---
    
    이전 SR연구에 따르면  YCbCr채널에서 Y채널만 적용이 되었다고 합니다. 그래서 1 채널만 적용을 했기 때문에 input채널과 output채널이 1이었다고 합니다. 그리고 마지막에는 컬러 이미지 네트워크로 확장 시켜서 각 각 다른 채널들의 성능도 평가했다고 합니다.
    
    ![Untitled 5](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/fdcac50d-e62a-4ad2-b7d6-73dc0a0ef8ee)
    
    위의 사진은 input layer에 컬러 이미지를 넣었을 때 어떻게 채널이 분리 되는지 과정을 나타낸 사진입니다.
    
    1)RGB 3채널 이미지를 Input layer에 넣은 뒤 RGB채널을 YCbCr로 변환한다.
    
    2)YCbCr로 변환된 이미지를 특정 크기의 필터로 잘라서 sub-image를 만들어 정답 이미지 X로 만듭니다. 
    
    3)다시 이 YCbCr 이미지에서 특정 크기의 필터로 잘라서 또 sub-image를 만든 다음 해당 sub-image를 Bicubic interpolation 통해 upscailing factor값으로 흐리게 만들어 저 해상도 이미지 Y를 만듭니다.
    
    마지막으로는 모델의 구조 및 데이터에 따른 실험 결과 입니다.
    
  ![Untitled 6](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/aa370931-19c7-4d97-a41b-5ce4fb915ad5)
    
    훈련 데이터로는 ImageNet, 91 image 두 가지를 사용하였으며, 위의 그래프는 훈련 데이터에 따른 PSNR 수치 입니다.
    
    ImageNet을 사용하여 훈련 했을 때 성능이 더 좋은 지표를 나타내고 있습니다.
    
    다음은 필터의 개수에 따른 성능 비교 입니다.
    
    ![Untitled 7](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/bc52faa7-6a70-486f-85d6-d83c9f1fc6ec)

    모델의 구조는 f1=9, f2=1, f3=5, n1=64, n2=32이 입니다.
    
    여기서 f1의 의미는 첫 번째 레이어의 필터의 크기가 9x9이며 n1은 첫번째 레이어의 필터의 개수가 64개라는 의미 입니다.
    
    다른 것들도 마친가지로 f2는 2번째 레이어의 필터 크기는 1x1 개수는 32개 3번째 레이어의 필터 크기는 5x5라는 의미이며
    
    해당 지표는 필터의 개수에 따른 훈련 시간과 PSNR 결과 표 입니다.
    
    필터의 개수가 늘어 날수록 성능은 좋아지지만 훈련 시간이 그만큼 길어진다는 것을 알 수 있습니다.
    
    그 다음은 필터의 크기에 따른 성능 지표 입니다.
    
    ![Untitled 8](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/70717c94-566c-41db-aea3-96fbdf8e02f3)

    위의 그래프는 필터의 크기에 따른 성능 지표이며 1번째 레이어 필터 크기가 9 X 9, 2번째 레이어 필터 크기가 5X5, 3번째 레이어 필터 크기가 5X5일 때 가장 좋은 성능을 보여주고 있습니다.
    
    다음은 모델의 깊이 즉 레이어의 개수에 따른 성능 비교 입니다.
    
    ![Untitled 9](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/7ca642e6-73ce-437e-9d24-737e3c32d279)


위의 그래프는 각 모델의 필터 크기와 레이어의 개수를 다르게 했을 때 성능을 비교한 그래프 입니다.

위의 그래프를 살펴보면 레이어의 개수가 4개일 때 보다 3개일 때 PSNR수치가 더 높으며 가장 좋은 모델의 구조는 f1 = 9, f2 =5, f3 =5, n1=64, n2 = 32일 때 최적의 성능과 속도를 나타냅니다.

저자는 3층 레이어가 4층 레이어 보다 성능이 더 좋은 이유를 모델의 깊이가 깊어 질수록 더욱 더 parameter들 도 많아지고 복잡해지며 훈련에서 복잡하다고 합니다. 또한 적절한 learning rate을 찾는 것도 힘들기 때문이라고 합니다. 그래서 저자는 위와 같은 여러 실험을 통해 최종 적인 최적화 된 모델을 소개 합니다.

다음은 기존의 SR기법과 SRCNN의 성능 차이를 나타내주는 그래프 입니다.

![Untitled 10](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/12b7ae85-cd15-4d31-8107-2d00bce3c2ea)

위 그래프에서는 이전에 많이 쓰였던 SR기법들과 SRCNN의 PSNR수치를 나타내는 그래프 입니다.

SRCNN은 기존의 SOTA 방법들에 비해 매우 우수한 성능을 보여 주었다는 것을 나타내고 있습니다.

그리고 논문의 원본을 보게 되면 똑같은 이미지에 대해 각 SOTA 방법들과 SRCNN을 적용하여 Befor After 비교 사진이 나와 있습니다.

자세한 결과물을 보고 싶으시다면 논문 원본을 참조 바랍니다.

논문 원본의 결과 물을 보더라도 SRCNN이 기존의 SOTA 방법들 보다 훨씬 더 선명하고 흐림이 없는 이미지 화질 개선을 이루어 냈습니다.

![Untitled 11](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/5440eea1-1dac-4dfc-8755-a63223c15401)

또한 SRCNN은 다른 SOTA 방법들에 비해 초 해상화 된 이미지를 생성하는 속도도 훨씬 빨랐으며 PSNR수치도 높다는 것을 말해주고 있습니다.

마지막으로 훈련 방법에 따른 각 채널별 평균 PSNR입니다.

![Untitled 12](https://github.com/jusunglee-ai/jusunglee-ai.github.io/assets/125032849/03376002-4c9f-4a02-8e9c-142cbfb46f97)

위의 지표는 각 훈련 방법에 따른 Y , Cb, Cr , RGB 컬러 이미지 채널에 따른 PSNR 평균 수치 입니다.

훈련 방법에 따라 채널 컬러 이미지의 PSNR 수치가 다르게 표현 되고 있습니다. 

SRCNN은 네트워크 구조나 학습 메커니즘의 변경 없이 여러가지 채널을 받아들일 수 있으며 RGB 채널을 처리하면서 고 해상도 이미지를 얻을 수 있다는 것을 알려주는 지표 입니다.

---

마지막으로 해당 논문을 제 방식대로 요약을 해보자면

SRCNN은 기존의 SR 방법들에 비해 굉장히 빠르고 좋은 성능을 보여주는 CNN을 SR분야에 접목한 딥 러닝 네트워크 입니다.

그리고 SRCNN은 굉장히 단순한 구조를 가지고 있으며 작동 원리를 요약하자면 Low-resolution 이미지를 input으로 넣고 end-to-end mapping을 통해 최종적으로 high-resolution이미지를 출력하는 원리 입니다.

[구현코드]

:[https://github.com/jhcha08/Implementation_DeepLearningPaper/tree/master/srcnn](https://github.com/jhcha08/Implementation_DeepLearningPaper/tree/master/srcnn)

[원본 논문]

:[https://arxiv.org/pdf/1501.00092.pdf](https://arxiv.org/pdf/1501.00092.pdf)

[논문 리뷰 참고 사이트]

:[https://mole-starseeker.tistory.com/82](https://mole-starseeker.tistory.com/82)
