---
layout: single
title:  "Faster R-CNN 논문 리뷰"
categories : paper
tag : [Faster R-CNN, object-detection, 논문리뷰, 딥러닝]
toc: true
toc_sticky: true

---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=Faster R-CNN 논문 리뷰&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

- 논문 링크 : [Faster R-CNN](https://arxiv.org/pdf/1506.01497.pdf)



- 최신 Object detection 모델은 객체 위치를 추정하기 위해 region proposal 알고리즘을 사용했음 (R-CNN, Fast R-CNN 모두 selective search 사용)

    - 결과적으로 region proposal 사용으로 병목현상은 지속적으로 발생
        - 병목현상 : 한 번에 처리할 수 있는 데이터의 양보다 처리할 수 있는 능력이 충분하지 않을 경우 발생하는 문제
        - R-CNN 에서 region proposal의 selective search를 사용하기때문에 시간 소요가 크고 실시간으로 detection하는데 무리가 큼
        - Fast R-CNN 에서는 기본적으로 GPU로 속도를 향상시켰지만 region proposal은 CPU에서 수행함으로 병목현상 발생
        
        &nbsp;

- region proposal의 병목현상을 해결하기 위해 RPN(Region Proposal Network) 기법 제안
    - RPN은 객체 탐지 네트워크와 함께 합성곱 피처들을 공유하기 때문에 영역 추정에 거의 비용이 들지 않음

    - RPN 은 conv network이며 end-to-end 훈련 가능

    - RPN 과정
        1. 원본 이미지를 pre-trained된 CNN 모델에 입력하여 feature map을 얻습니다.
        2.  feature map은 RPN에 전달되어 적절한 region proposals을 산출합니다.
        3.  region proposals와 1번 과정에서 얻은 feature map을 통해 RoI pooling을 수행하여 고정된 크기의 feature map을 얻습니다.
        4.  Fast R-CNN 모델에 고정된 크기의 feature map을 입력하여 Classification과 Bounding box regression을 수행합니다.
        
        &nbsp;

- Fast R-CNN, R-CNN 모두 region proposal의 selective searh를 conv와 따로 연산했지만 Faster R-CNN은 RPN을 통해 CNN연산을 공유 RoI 생성에서 큰 변화를 줌

&nbsp;

## Faster R-CNN 핵심

- Anchor box
- RPN
- Multi-task loss
- Training

&nbsp;

&nbsp;

### Anchor box

![Untitled](/images/2022-07-05-Faster R-CNN/Untitled.png)

- Faster R-CNN은 기존의 Fast R-CNN, R-CNN과 다르게 Selective search를 통해 region proposal을 추출하지 않음
- 원본 이미지를 일정 간격의 grid로 나눠 각 grid cell을 bounding box로 간주하여 feature map에 encode하는 Dense Sampling 방식을 사용
    - Dense sampling
        - sub-sampling ratio를 기준으로 grid를 나누는 방식
        - 원본 이미지의 크기가 800x800이며, sub-sampling ratio가 1/100이라고 할 때, CNN 모델에 입력시켜 얻은 최종 feature map의 크기는 8x8(800x1/100)
        - feature map의 각 cell은 원본 이미지의 100x100만큼의 영역에 대한 정보를 함축하고 있다고 할 수 있습니다. 원본 이미지에서는 8x8개만큼의 bounding box가 생성
        - 하지만 Dense sampling 수행시 객체의 다양한 크기를 고려하지 않는 방법이여서 논문에서는 Anchor box 사용
    
- Anchor box는 사전의 정의된 서로다른 scale, aspect ratio를 가지는 bounding box
- 논문에서 3가지 scale([128, 256, 512])과 3가지 aspect ratio([1:1, 1:2, 2:1])를 가지는 총 9개의 서로 다른 anchor box를 사전에 정의
- 공식
  
    ![Untitled](/images/2022-07-05-Faster R-CNN/Untitled%201.png)
    
- scale = anchor box의 width(w), height(h)의 길이
- aspect ratio = width, height의 길이의 비율
- aspect ratio에 따른 width, height의 길이는 aspect ratio가 1:1일 때의 anchor box의 넓이를 유지한 채 계산
    - scale = s, aspect ratio = 1:1 일때, anchor box 넓이는 위공식에 따라 $s^2$마

![Untitled](/images/2022-07-05-Faster R-CNN/Untitled%202.png)

- anchor box는 원본 이미지의 각 grid cell의 중심을 기준으로 생성
- 원본 이미지에서 sub-sampling ratio를 기준으로 anchor box를 생성하는 기준점인 anchor를 고정
- 고정된 anchor를 기준으로 사전에 정의한 anchor box 9개를 생성
    - 예시
        - 위 그림에서 원본이미지 600 * 800, sub-sampling ratio = 1/16
        - anchor가 생성되는 수는 1900(=600/16 x 800/16), anchor box는 총 17100(=1900 x 9)개가 생성 (9개는 사전 정의한 anchor box 수)
        - 기존에 고정된 크기의 bounding box를 사용할 때보다 9배 많은 bounding box를 생성하며, 보다 다양한 크기의 객체를 포착하는 것이 가능



&nbsp;

&nbsp;



### RPN

![Untitled](/images/2022-07-05-Faster R-CNN/Untitled%203.png)

- RPN은 원본 이미지에서 region proposals를 추출하는 네트워크

- 원본 이미지에서 anchor box를 생성하면 수많은 region proposals가 생성

- RPN은 region proposals에 대하여 class score를 매기고, bounding box coefficient를 출력하는 기능 수행

- RPN 동작 과정
    1. 원본 이미지를 pre-trained된 VGG 모델에 입력하여 feature map 생성
        - 원본 이미지의 크기가 800x800이며, sub-sampling ratio가 1/100이라고 했을 때 8x8 크기의 feature map이 생성, channel 수는 512
    2. 위에서 얻은 feature map에 대하여 3x3 conv 연산을 적용합니다. 이때 feature map의 크기가 유지될 수 있도록 padding을 추가
        - 8x8x512 feature map에 대하여 3x3 연산을 적용하여 8x8x512개의 feature map이 출력
    3. class score를 매기기 위해서 feature map에 대하여 1x1 conv 연산을 적용, 이 때 출력하는 feature map의 channel 수가 2x9가 되도록 설정
        - RPN에서는 후보 영역이 어떤 class에 해당하는지까지 구체적인 분류를 하지 않고 객체가 포함되어 있는지 여부만을 분류
        - anchor box를 각 grid cell마다 9개가 되도록 설정했습니다. 따라서 channel 수는 2(object 여부) x 9(anchor box 9개)
        - 8x8x512 크기의 feature map을 입력받아 8x8x2x9크기의 feature map을 출력
    4. bounding box regressor를 얻기 위해 feature map에 대하여 1x1 conv 연산을 적용
        - 출력하는 feature map의 channel 수가 4(bounding box regressor)x9(anchor box 9개) 가 되도록 설정
        - 8x8x512 크기의 feature map을 입력받아 8x8x4x9크기의 feature map을 출력
    
- RPN 출력결과
  
    ![Untitled](/images/2022-07-05-Faster R-CNN/Untitled%204.png)
    
    - 왼쪽 object o, x는 anchor box의 종류에 따라 객체 포함 여부를 나타낸 feature map, 오른쪽은 anchor box의 종류에 따라 bounding box regressor를 나타낸 feature map
    - 이를 통해 8x8 grid cell마다 9개의 anchor box가 생성되어 총 576(=8x8x9)개의 region proposals가 추출
    - feature map을 통해 각각에 대한 객체 포함 여부와 bounding box regressor를 파악
    - class score에 따라 상위 N개의 region proposals만을 추출하고, Non maximum suppression을 적용하여 최적의 region proposals만을 Fast R-CNN에 전달
        - R-CNN, Fast R-CNN 모두 결과적으로 region 찾고 NMS는 필수
    
- Multi-task loss
  
    ![Untitled](/images/2022-07-05-Faster R-CNN/Untitled%205.png)
    
    - Parameter 설명
        - ![image-20220705194543689](/images/2022-07-05-Faster R-CNN/image-20220705194543689.png) : mini-batch 내의 anchor의 index
        - ![image-20220705194631107](/images/2022-07-05-Faster R-CNN/image-20220705194631107.png) : anchor i에 객체가 포함되어 있을 예측 확률 (classsification을 통해서 얻은 해당 엥커가 오브젝트일 확률을 의미)
        - ![image-20220705194649894](/images/2022-07-05-Faster R-CNN/image-20220705194649894.png) : anchor가 양성일 경우 1, 음성일 경우 0을 나타내는 index parameter
        - ![image-20220705194707672](/images/2022-07-05-Faster R-CNN/image-20220705194707672.png) : 예측 bounding box의 파라미터화된 좌표(bounding box regression을 통해서 얻은 박스 조정 값 벡터)
        - ![image-20220705194747024](/images/2022-07-05-Faster R-CNN/image-20220705194747024.png) : ground truth box의 파라미터화된 좌표
        - ![image-20220705194808542](/images/2022-07-05-Faster R-CNN/image-20220705194808542.png) : Loss loss
        - ![image-20220705194836188](/images/2022-07-05-Faster R-CNN/image-20220705194836188.png) : Smooth L1 loss
        - ![image-20220705194901595](/images/2022-07-05-Faster R-CNN/image-20220705194901595.png) : mini-batch의 크기(논문에서는 256으로 지정)
        - ![image-20220705194922756](/images/2022-07-05-Faster R-CNN/image-20220705194922756.png) : anchor 위치의 수
        - ![image-20220705194935104](/images/2022-07-05-Faster R-CNN/image-20220705194935104.png) : balancing parameter(default=10)
    - RPN에서 Classification과 Bouding Box Regression을 수행, 이때 두 가지 task에서 얻은 loss를 엮은 형태가 Faster R-CNN의 loss function
    - Classification은 log loss , Bouding Box Regression은 smoothL1사용
    

&nbsp;

&nbsp;



### Trining

![Untitled](/images/2022-07-05-Faster R-CNN/Untitled%206.png)

1. feature extraction by pre-trained VGG16
    - pre-trained된 VGG16 모델에 800x800x3 크기의 원본 이미지를 입력하여 50x50x512 크기의 feature map생성, sub-sampling ratio = 1/16
2. Generate Anchors by Anchor generation layer
    - 사전에 anchor box를 생성(region proposals를 추출전에)
    - 원본 이미지의 크기에 sub-sampling ratio를 곱한만큼의 grid cell이 생성
    - 각 grid cell마다 9개의 anchor box를 생성(원본 이미지에 50x50(=800x1/16 x 800x1/16)개의 grid cell이 생성되고, 각 grid cell마다 9개의 anchor box를 생성하므로 총 22500(=50x50x9)개의 anchor box가 생성)
3. Class scores and Bounding box regressor by RPN
    - VGG16으로부터 feature map을 입력받아 anchor에 대한 class score, bounding box regressor를 반환하는 역할
4. Region proposal by Proposal layer
    - Proposal layer에서는 2번 과정에서 생성된 anchor boxes와 RPN에서 반환한 class scores와 bounding box regressor를 사용하여 region proposals를 추출
      하는 작업을 수행
        - NMS(Non maximum suppression)을 적용하여 부적절한 객체를 제거한 후, class score 상위 N개의 anchor box를 추출
        - 이후 regression coefficients를 anchor box에 적용하여 anchor box가 객체의 위치를 더 잘 detect하도록 조정
5. Select anchors for training RPN by Anchor target layer
    - Anchor target layer의 목표는 RPN이 학습하는데 사용할 수 있는 anchor를 선택하는 것
    - 먼저 2번 과정에서 생성한 anchor box 중에서 원본 이미지의 경계를 벗어나지 않는 anchor box를 선택
    - positive/negative 데이터를 sampling(positive sample은 객체가 존재하는 foreground, negative sample은 객체가 존재하지 않는 background를 의미)
6. Select anchors for training Fast R-CNN by Proposal Target layer
    - Proposal target layer의 목표는 proposal layer에서 나온 region proposals 중에서 Fast R-CNN 모델을 학습시키기 위한 유용한 sample을 선택하는 것
    - 여기서 선택된 region proposals는 1번 과정을 통해 출력된 feature map에 RoI pooling을 수행 (region proposals와 ground truth box와의 IoU를 계산하여 0.5 이상일 경우 positive, 0.1~0.5 사이일 경우 negative sample로 label)
7. Max pooling by RoI pooling
    - 원본 이미지를 VGG16 모델에 입력하여 얻은 feature map과 6번 과정을 통해 얻은 sample을 사용하여 RoI pooling을 수행
    - 이를 통해 고정된 크기의 feature map이 출력
8. Train Fast R-CNN by Multi-task loss
    - 나머지 과정은 Fast R-CNN과 동일
    - 입력받은 feature map을 fc layer에 입력하여 4096 크기의 feature vector 생성
    - feature vector를 Classifier와 Bounding box regressor에 입력하여 (class의 수가 K라고 할 때)각각 (K+1), (K+1) x 4 크기의 feature vector를 출력 (+1은 배경)
    - 출력된 결과를 사용하여 Multi-task loss를 통해 모델을 학습
- 논문에서 언급한 Alternating Traing 방법 (Faster R-CNN 학습위해 RPN,Fast R-CNN 번갈아 가며 학습하는 것)
  
    ![Untitled](/images/2022-07-05-Faster R-CNN/Untitled%207.png)
    
    1. 먼저 Anchor generation layer에서 생성된 anchor box와 원본 이미지의 ground truth box를 사용하여 Anchor target layer에서 RPN을 학습시킬 positive/negative 데이터셋을 구성
        - 이를 활용하여 RPN을 학습 시킵니다. 이 과정에서 pre-trained된 VGG16 학습
    2. Anchor generation layer에서 생성한 anchor box와 학습된 RPN에 원본 이미지를 입력하여 얻은 feature maps를 사용하여 proposals layer에서 region proposals를 추출
        - 이를 Proposal target layer에 전달하여 Fast R-CNN 모델을 학습시킬 positive/negative 데이터셋을 구성
        - 이를 활용하여 Fast R-CNN을 학습 시킵니다. 이 때 pre-trained된 VGG16 도 학습
    3. 앞서 학습시킨 RPN과 Fast R-CNN에서 RPN에 해당하는 부분만 학습
        - 세부 학습은 1번과 같음
        - 두 네트워크끼리 공유하는 convolutional layer, 즉 pre-trained된 VGG16은 고정
    4. 학습시킨 RPN 3번 과정을 활용하여 추출한 region proposals를 활용하여 Fast R-CNN을 학습
        - 이 때 RPN과 pre-trained된 VGG16은 고정
    - 요약
        - RPN과 Fast R-CNN을 번갈아가며 학습시키면서 공유된 convolutional layer를 사용하는 것
        - 실제 학습 절차가 상당히 복잡
        
        &nbsp;
        
        &nbsp;
        
        
        
        &nbsp;
        
        

### Detection

![Untitled](/images/2022-07-05-Faster R-CNN/Untitled%208.png)

- 실제 detection시에는 Anchor target layer와 Proposal target layer는 사용되지 않음
- 두 layer 모두 네트워크를 학습시키기 위한 데이터셋을 구성하는데 사용되기 때문
- Proposal layer에서 추출한 region proposals를 활용하여 detection을 수행
- 최종적으로 얻은 predicted box에 Non maximum suppression을 적용
하여 최적의 bounding box만을 결과로 출력