---
layout: single
title:  "YOLO 논문 리뷰"
categories : paper
tag : [YOLO, object-detection, 논문리뷰, 딥러닝]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=YOLO 논문 리뷰&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

- [논문링크](https://arxiv.org/pdf/1506.02640.pdf)



## 요약

- Yolo 논문에서 Object detection에 대한 새로운 접근방식을 적용함
    - Object detection 이란?
        - 여러 물체에 대해 어떤 물체가 어디에 있는지 알아내는 작업

&nbsp;

- 기존의 multi-task 문제를 하나의 회귀 문제로 재정의
    - multi-task?
        - 서로 연관 있는 과제들을 동시에 학습함으로써 모든 과제 수행의 성능을 전반적으로 향상시키려는 학습 패러다임
        - 장점
            - **Knowledge Transfer :** 각각의 task를 학습하면서 얻은 정보가 서로 다른 task 들에 좋은 영향을 줌
            - **Overfitting 감소 :** 여러 task를 동시에 수행하기 때문에 보다 일반화된 특징표현에 중심으로 학습함
            - **Computational Efficiency :** 하나의 신경망으로 여러 task를 동시에 수행
        - 단점
            - **Negative Transfer :** 다른 task에 악영향을 미치는 task가 존재할 가능성이 있음
            - **Task Balancing의 어려움 :** task마다 학습 난이도가 크게 차이 나면 수렴하지 않거나 robust 하지 않을 수 있음
            

&nbsp;

- YOLO는 이미지 전체에 대해서 하나의 신경망이 한 번의 계산만으로 bounding box와 클래스 확률을 예측
    - bounding box란?
        - 객체의 위치를 알려주기 위해 객체의 둘레를 감싼 직사각형 박스를 말함
    - 클래스 확률이란?
        - bounding box로 둘러싸인 객체가 어떤 클래스에 해당하는지에 관한 확률을 의미
        

&nbsp;

- 객체 검출 파이프라인이 하나의 신경망으로 구성되어 있으므로  end-to-end 형식입니다.
    - end-to-end ?
        - 종단간 기계학습을 의미
        - 입력에서 출력까지 파이프라인 네트워크 없이 한 번에 처리한다는 뜻
        - 파이프라인 네트워크 : 전체 네트워크를 이루는 부분적 네트워크
        - 장점
            - 충분한 라벨링 된 데이터 존재 시 신경망 모델로 해결 가능
            - 직접 파이프라인을 설계할 필요가 줄어듦
        - 단점
            - 신경망에 너무 많은 계층의 노드가 있거나 메모리가 부족할 경우 학습하기 어려움
            - 문제가 복잡할수록, 전체를 파이프라인 네트워크로 나눠서 해결하는 것이 더 효율적일 수 있다.
            

&nbsp;

- Yolo의 통합된 모델 속도가 굉장히 빠른 성능을 나타냄
    - Yolo 모델은 1초에 45프레임 처리, Fast Yolo는 1초에 155프레임 처리 성능
    - 보통의 극장의 영화 : 24 프레임, 드라마 : 30 프레임, 스포츠 생중계 : 60 프레임




&nbsp;

## 알고 보면 좋은 것



- Yolo의 아이디어
    - 사람은 이미지를 보면 어디에 무엇이 어느 위치에 있는지 한 번에 파악
    - 사람의 시각 체계와 같이 빠르고 정확한 객체 검출 모델을 만들면 자율주행 분야의 기술 발전 향상도 기대됨
    
    
    
- 기존의 Object detection (←DPM을 공부하고 나니 더욱 이해가 수월했습니다.)
    - 기존의 detection 모델은 분류기를 재정의하여 검출기로 사용
    
    - Object detection은 하나의 이미지 내에서 개가 어디에 있는지, 고양이는 어디에 있는지 판단하나는 것
    
    - Object detection은 분류와 위치 정보도 같이 판단
    
    - 기존의 객체 검출 모델로는 대표적으로 DPM과 R-CNN이 존재
      
        
    
- yolo 특징
    1. 기존의 복잡한 객체 검출 프로세스를 하나의 회귀 문제로 변경
        - R-CNN 처럼 복잡한 파이프라인 필요없음
        - test 단계에서 새로운 이미지 YOLO 신경망 넣어주면 빠르게 객체감지
            - end-to-end 형식이기 때문에 가능
        - 다른 object detection 모델 보다 2배 이상의 mAP score (위의 R-CNN에서 설명)
        
        
        
    2. YOLO는 예측 할 때 이미지 전체를 다 체크
        - sliding window 나 region proposal 방식과 다르게 yolo는 train,test 에서 이미지 전체 다 체크 (클래스에 대한 정보와 주변 정보까지 학습 background error가 적어짐)
            - sliding window 는 위의 DPM모델에서 설명한 bounding box가 일정한 pixel을 건너 뛰는 것
            - region proposal은 위의 R-CNN에서 설명한 이미지에서 물체가 있을법한 위치를 찾는것을 의미하고 YOLO이전에는 Selective Search알고리즘을 사용했으나 Yolo부터는 이걸 사용하지 않음 (yolo 부터는 conv내에서 이루어짐 - Alexnet의 발전으로)
            - background error : object 없이 배경에 객체가 있다고 판단하는 것 → 배경 이미지를 객체로 판단 (YOLO는 객체와 배경까지 학습하기때문에 R-CNN에 비해 적은 background error)
            
            
        
    3. 빠르게 객체 검출할 수 있지만 정확성이 조금 떨어짐
        - 속도와 정확성을 반비례 관계(trade-off)
        
        
        
    4. YOLO는 물체의 일반적인 부분을 학습, train 단계에서 보지 못한 새로운 이미지에 대해 robust → 검출 정확도가 높음
    
    
    
    - 요약
        - YOLO는 객체 검출의 개별 요소를 단일 신경망으로 통합한 모델
            - R-CNN처럼 다양한 파이프라인으로 구성된 모델이 아닌 end-to-end임
        - Yolo는 각각의 bounding box를 예측하기 위해 이미지 전체의 특징을 활용
            - 위에서 언급한 내용처럼 클래스 만이아닌 주변 background 까지
        - 단일 신경망 , end-to-end 학습 이기때문에 높은 정확성, 실시간 객체 검출



&nbsp;

## YOLO 핵심



### Unified Detection

![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2056.png)

1. input image S x S gride
    - input image를 S x S 로 나눠줌 (논문에서는 S = 7, 총 49개 그리드 생성)
    
2. bounding box + confidence score & class probability
    - bounding box + confidence score
      
        ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2057.png)
        
        - 위에서 생성된 그리드 중 한개 단위로 그리드 셀 이라고 표현
        - bounding box의 중심좌표가 해당 셀 내에 있으면, 그 해당 셀이 그 bounding box를 담당한다 → 신뢰성이라고 소개함
        - bounding box 구성은 중심의 x,y 좌표, w,h
            - (x,y) 좌표
                - 상대좌표로 왼쪽 상단이 (0,0) 오른쪽 하단이 (1,1)
                - 0~1 사이로 표현
            - (w,h) 너비,높이
                - 이미지 전체의 너비,높이를 1이라고 하면 0~1사이의 값을 가짐
        - 모든 bounding box의 수는 몇개가 되어도 상관없지만 논문에서는 각 grid 당 box는 2개 (B=2, 전체 grid = 49  모든 bounding box는 98개)
        - 총 98개의 bounding box에 대해 confidence score을 예측 (밑은 confidence score 공식)
          
            ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2058.png)
            
            - confidence score은 bounding box가 객체를 포함한다는 것을 얼마나 믿을만 한지 그리고 예측한 bounding box가 얼마나 정확한지를 나타내는 수치
            - Pr(Object) = softmax 결과와 같이 각 class에 속할 확률
            - IOU = 실제 bounding box와 예측한 bounding box 사이에 교집합,합집합을 구하고 교집합 / 합집합 (0~1 까지값)
            
            ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2059.png)
            
            - confidence score는 객체가 존재한다면 Pr(object) = 1이므로
                - 객체존재하면 confidence score = IOU
                - 객체 존재하지 않으면 0
        
    - class propability
      
        ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2060.png)
        
        - 총 49개의 grid (7 x 7로 나눠서 s=7) 하나하나에 대해 conditional class probabilities를 계산
          
            ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2061.png)
            
            - 그리드 셀안에 객체가 있다는 전제 하에 그 객체가 어떤 클래스인지에 대한 조건부 확률 (공식 자체가 객체가 없을때는 생각하지 않는 공식)
            - 위에서 구한 bounding box와는 무관하게 그리드 셀만 가지고 계산
            - 만약 클래스가 1,2,3이 있다고 했을때 49개의 그리드 하나하나 1,2,3에 속할 확률을 계산하고 가장 큰 확률값이 해당 그리드의 class로 선정
        
    - 위의 2과정을 거치는 예측을 논문에서는 S x S x (B * 5 + C) tensor로 인코딩 했다고 설명
        - S x S x (B * 5 + C) 를 살펴보면
            - S = grid를 나눠준 수 (논문에서 s= 7 이미지를 7x7 = 49개로 나눴음)
            - B =  각 그리드당 box의 개수(논문에서 B = 2)
            - 5 = x,y,w,h, confidence score 총 5개
            - C = class propability ( 각 grid마다 class 확률중 가장 높은 확률의 class로 지정)
        
    - final detections을 가기전에 mns(Non-Maximum suppression) 단계
      
        ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2062.png)
        
        - 실제로 2번에 두 과정을 합치면 위와같이 bounding box가 속해지는 class로 여러가지 색을 가진 많은 bounding box가 생성됨
        
        - 예측한 다양한 bounding box 중에서 정확한 bounding box만을 선택하는 기법
        
        - 감지된 것을 정리하는 작업
        
        - Non-max suppression 알고리즘
          
            ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2063.png)
            
            - cell안에 물체가 있을 확률을 Pc(confidence score 의미)
            
            - 각 자동차의 Pc 값을 확인하고 가장큰 Pc 값을 선택
                - 1번 자동차 0.8 , 2번 자동차 0.9 선택
                
            - 선택된 자동차(0.8,0.9에 해당하는 box)와 IOU가 가장 많이 겹치는 box 억제
                - Non-max suppression 뜻 그대로 최대값 아닌 것은 억제
                
                
    
3. final detections
    - 실제 YOLO 에서는 nms를 거치면 각 클래스당 2개의 box가 남음 그중 최대값의 bounding box를 그려서 최종그림완성
    - output tensor 형태는 논문에서 (S x S x (B * 5 + C)) = (7x7x30)의 차원을 가짐
- tensor 형태로 위 과정 확인 (더 쉽게 이해됨)
    - 논문에서 box를 2개 했기 때문에 B=2가 되는데 실제 형태를 보면
      
        ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2064.png)
        
        ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2065.png)
        
        - 이런식으로 2개가 잡힌다고 한다면
          
            ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2066.png)
            
            - 이와 같이 앞의 5가 첫번째 그림에서 잡힌것 (x,y,w,h,confidence score), 뒤의 5가 두번째 그림으로 생성되는것
            - 뒤의 20은 VOC 데이터셋 클래스 수가 20임
                - 20개 각각 class propability의 확률값이 들어가 있음
            - 이후 첫번째5를 (bbox1), 두번째 5(bbox2) 라고 한다면
                - bbox1의 confidence score 과 20의 class에 해당하는 class propability를 곱함
                    - confidence score * class propability 를 class-specific confidence score라고 함
                      
                        ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2067.png)
                        
                        - 최종 식인 Pr(Classi) * IOU를 풀어보면
                            - Pr(Class) = bounding box에 특정 클래스가 나타날 확률
                            - IOU = 예측된 bounding box가 그 클래스에 잘 들어맞는지에 대한 확률
                - class-specific confidence score를 bbox1,bbox2 각각 따로 구한후 20x1 tensor형태로 반환
                  
                    ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2068.png)
                    
                - 이 작업을 모든 cell(7x7 = 49개) 에 대해서 전부 수행하기 때문에 7x7x2 = 98개의 20x1 tensor가 생성됨
                  
                    ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2069.png)
                    
                - 이후 98개의 20x1 tensor를 한행씩이 class
                  
                    ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2070.png)
                    
                    - 총 20개의 class 20행
                - 계산된 값이 < thresh1 (0.2) 이면 0으로 할당
                  
                    ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2071.png)
                    
                - 각 값들을 내림차순으로 정렬
                  
                    ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2072.png)
                    
                - Non-max suppression 수행
                    - class가 20개이고 한 행 98개를 tensor
                    - 내림차순으로 98개를 정렬
                    
                    - ex) [0.5,0.3,0.2,0.1, ,,,,,,,,,,,]  이게 98개 tensor의 1행을 가져온거라고 한다면
                    - 첫번째 0.5를 뽑고 그 다음 숫자들 0.3,0.2,0.1 .... 다 순회
                        - 순회하면서 0.5와 0.3~...끝까지 각각 IOU를 구하고 , IOU > 0.5면 해당하는 숫자 0으로 설정
                            - 0.5, 0.3을 꺼내서 IOU >0.5면 0.3 → set 0 [0.5, 0, 0.2, 0.1...]
                            - 0.5 랑 그다음 수 0.2 IOU >0.5 미만이면 continue
                            - 전부 순회했다면 0이 아닌 다음수(0.2) 가 다시 전체 순회 하며 반복
                        - 이 과정을 수행하면 최종적으로 2개의 bbox 남음(값이 0이 아닌것)
                        - 이렇게 20개 class행에 대해 모두 수행
                    
                    - 모든 20개 class에 대해 모두 수행했다면 이후에 bb1~bb98 까지 각각 20x1 tensor에 대해 각각 tensor의 최대값 index가 전체 텐서에 그 class의 최대값과 같다면 해당하는 bbx가 해당 class 의 bounding box
                        - dog에 해당하는 bounding box를 찾기위해 bb1~bb98 각각 최대값 index를 구함
                        - 만약 bb1의 최대값 index가 0이고 bb1~bb97까지 해당 인덱스를 최대값 index로 가지는 값중에 bb1이 가장 크다면 bb1이 dog의 bounding box
    
- 요약
    1. YOLO는 객체 검출의 개별 요소를 단일 신경망(single neural network)으로 통합한 모델
    2. 입력 이미지(input images)를 S x S 그리드(S x S grid)로 나눔
    3. 각각의 그리드 셀(grid cell)은 B개의 bounding box와 그 bounding box에 대한 confidence score를 예측
    4. class-specific confidence score는 bounding box에 특정 클래스(class) 객체가 나타날 확률과 예측된 bounding box가 그 클래스(class) 객체에 얼마나 잘 들어맞는지를 나타냄
    5. 최종 예측 텐서의 dimension은 (7 x 7 x 30)



&nbsp;

### Network Design



- Yolo는 하나의 CNN 구조로 디자인
    - data는 VOC 데이터 사용 - class 20개
    
- Network
    - GoogLeNet 기반을 사용
    
    ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2073.png)
    
    - 붉은 직사각형 하나가 inception Module 1개
      
        ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2074.png)
        
        - inception module은 conv 1x1, conv 3x3, conv 5x5, max pool 로 이루어짐
            - GoogLeNet 구조 와 YOLO 구조 비교
                - 여기서 Yolo 네트워크를 살펴보면
                - inception module을 1x1 layer, 3x3 layer로 변경
                - yolo는 convolutional layer 24 + Fc layer 2개
                    - GoogLeNet에서 conv 3x3 layer 4개를 더 추가하고 fc layer 2개 추가
                - 최종 아웃풋은 위에서 계산한 7x7x30 의 예측텐서가 나옴
                
        
        
    
    ​				![image-20220713140433059](/images/2022-07-13-YOLO(You Only Look Once)/image-20220713140433059.png)
    
    
    
    ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2075.png)
    
    - YOLO network
        - Pretrained
            - 사전에 학습시키는 layer
            - 1000 개의 class를 가진 ImageNet 데이터로 분류모델 학습
            - input image 224x224
            - 20 개의 conv layer
        - Fine-tuned
            - Object detection을 수행하기 위해 추가한 부분
            - 4개의 conv layer + 2개의 fc layer
            - input image 448x448
                - Pretrained 보다 이미지가 커진이유는 Object detection 은 해상도가 높아야 검출이 잘되서
        - Reduction layer
            - 1x1 layer를 통해 연산량이 감소함 (실제로 1x1 conv 사용시 channel의 수가 줄어듦)

&nbsp;

### Training



- Yolo는 1,000 개의 class를 가지는 ImageNet 데이터 셋으로 YOLO convolution을 사전학습 수행

- 사전훈련을 위해 24개의 convolution 계층 중 20개의 convolution 계층만을 이용, 이후 전결합층 계층 연결

- 모든 훈련과 추론을 위해 Darknet 프레임워크 사용
    - DarkNet?
        - Joseph Redmon이 독자적으로 개발한 신경망 프레임워크
        - deep neural network들을 학습시키고 실행할수 있는 툴
        - C,CUDA로 작성된 오픈 소스, 연산이 빠르고 설치가 쉽고 CPU,GPU 연산 지원
    
- 위에서 20개의 conv는 ImageNet의 분류 데이터로 학습된 layer , 이렇게 사전 학습된 분류모델을 객체 검출 모델로 변경하기위해 사전 훈련된 20개의 conv 계층 뒤에 4개(conv 3x3 4개) + FC(2개) 추가해 이 계층의 가중치를 임의로 초기화
  
    ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2076.png)
    
- Object detection 위해 이미지 정보의 해상도를 높임, 224 x 224 → 448 x 448

- 신경망의 최종 예측값은 class probabilities, bounding box의 위치 정보
  
    - 너비, 높이, 중심 좌표값 0~1 사이로 정규화 (그래서 상대위치라는 표현씀)

    
    
- YOLO의 마지막 계층에 선형 활성화 함수 적용, 나머지 모든 계층에는 leaky ReLU 적용
    - ReLU
      
        ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2077.png)
        
    - leaky ReLU
      
        ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2078.png)
        
    - 위의 두 식을 비교해보면 Relu 는 음수의 영향력을 모두 0으로 하는 반면에 leaky Relu는 0이하의 영향력도 어느정도 반영하는 모습을 보임
    
    - Yolo가 Relu 말고 leaky RelU 사용하는 이유
        - dying relu 현상 때문
            - ReLU는 모든 0이하의 값에 대해서 미분값이 0이됨, 가중치가 계속해서 업데이트 되면서 가중합이 음수가 되는 순간 ReLU는 0만 출력해 그 이후의 노드가 활성화 되지 않는 문제
              
                —> YOLO 에서 이런 dying ReLU 문제를 피하기 위해서 Leaky ReLU를 사용해 0이하의 값에(x 라고 하면) 0.01 * X로 출력해 다음 노드를 활성하게 함
            
            
    
- YOLO의 loss
    - YOLO의 loss는 SSE(sum-squared error)를 기반, 따라서 최종 output의 SSE를 최적화 해야함
        - YOLO가 SSE 선택한 이유 최적화가 쉬움
        
        - SSE
          
            ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2079.png)
            
            - 회귀선에 위치한 값과 실제값의 차이의 제곱
            
            
        
    - YOLO의 loss중에는 localization loss, classification loss 존재
        - localization loss : YOLO의 loss에는 bounding box의 위치를 얼마나 잘 예측했는지에 대한 loss
        
        - classification loss : 클래스를 얼마나 잘 예측했는지에 대한 loss
        
        - SSE를 사용해 얻는 단점
            1. 두개의 loss의 동일하게 두고 학습시키는 것은 좋은 영향을 주지 못함 하지만 SSE를 최적화 하는 방식은 이 두개의 loss를 동일한 가중치로 최적화함 
                - 이미지 내 대부분의 그리드 셀에는 객체가 없음
                    - 논문에서 이미지 한장당 7x7 = 49개의 grid cell을 만듬
                    - 49개의 grid cell 중에 대부분은 객체가 없음
                    - 객체가 없으면 confidence score = 0
                    - 대부분은 객체가 없기때문에 모델의 불균형을 유발
                
            2. SSE는 큰 bounding box와 작은 bounding box에 대해 모두 동일한 가중치로 loss 계산
                - bounding box 큰것 과 bounding box  작은것은 위치변화에 따라 각각 다른 양상을 보임
                    - bounding box 큰것은 위치가 조금 변화해도 여전히 객체를 잘 나타냄
                    - bounding box 작은것은 위치가 조금 변화하면 객체를 벗어나게 됨
                    
                    
            
        - SSE 문제 해결방안
            - 이미지 내 대부분의 그리드 셀에는 객체가 없음을 해결하기 위한 방법
                - bounding box 좌표에 대한 loss의 가중치 증가 시키고, 객체가 존재하지 않는 bounding box의 confidence loss에 대한 가중치 감소
                    - 쉽게 말하면 localization loss와 classification loss 중 localization loss의 가중치를 증가시키고, 객체가 없는 그리드 셀의 confidence loss보다 객체가 존재하는 그리드 셀의 confidence loss의 가중치를 증가 (객체가 없는 grid 가 더 많으니깐 객체가 있는 grid cell의 confidence loss의 가중치를 높여서 불균등을 해소하려고 한것)
                - 위 과정을 위해 두 개의 parameter 사용 λ_coord, λ_noobj (각각 λ_coord=5, λ_noobj=0.5 가중치 줌)
            - SSE는 큰 bounding box와 작은 bounding box에 대해 모두 동일한 가중치로 loss 계산을 해결하기 위한 방법
                - bounding box의 너비, 높이에 square root 를 취함, 이렇게 하면 너비와 높이가 커짐에 따라 그 증가율이 감소해 loss에 대한 가중치 감소 효과가 있음
        
    - YOLO는 하나의  grid cell 당 여러개의 bounding box 예측, 훈련 단계에서 하나의 bounding box predictor가 하나의 객체에 대한 책임이 있어야함
        - 객체 하나당 하나의 bounding box와 매칭 시켜야함, 여러 개의 bounding box 중 하나만을 선택, 이를 위해 예측된 bounding box 중 실제 객체를 감싸는 ground-truth bounding box와 IOU가 큰것을 선택
        
        - 이 과정을 통해 특정크기, 너비, 높이,객체 클래스를 잘 예측하게됨
        
        - train에서 사용하는 loss function
          
            ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2080.png)
            
            - ![image-20220713135100219](/images/2022-07-13-YOLO(You Only Look Once)/image-20220713135100219.png) : grid cell i안에 객체가 존재하는지 여부(존재하면 1, 없없으면 0)
            
            - ![image-20220713135128113](/images/2022-07-13-YOLO(You Only Look Once)/image-20220713135128113.png) : grid cell i의 j번째 bounding box predictor가 사용되는지 여부 (이 작업을 모든 cell(7x7 = 49개) 에 대해서 전부 수행하기 때문에 7x7x2 = 98개의 20x1 tensor가 생성됨 의 bbox 98개중 임의의 j를 사용하냐 라는 뜻)
            
            - λ_coord=5, λ_noobj=0.5
                - λ_coord: coordinates(x, y, w, h)에 대한 loss와 다른 loss들과의 균형을 위한 balancing parameter
                - λ_noobj: 객체가 있는 box와 없는 box 간에 균형을 위한 balancing parameter. (일반적으로 image내에는 객체가 있는 그리드 셀보다는 없는 셀이 더 많아서 사용)
            
            - 수식 위에서 아래로 서술
              
                ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2081.png)
                
                - Object가 존재하는 grid cell i 의 bounding box predictor j에 대해, x와 y의 loss를 계산. (object가 존재하는 grid cell이 더 적어서 λ_coord=5 가중치 )
                
                ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2082.png)
                
                - Object가 존재하는 그리드 셀 i의 bounding box predictor j에 대해, w와 h의 loss를 계산. 큰 box에 대해서는 작은 분산을 반영하기 위해 제곱근을 취한 후, SEE를 계산 (같은 error라도 큰 box의 경우 상대적으로 IOU에 영향을 적게 줍니다.) (SSE는 큰 bounding box와 작은 bounding box에 대해 모두 동일한 가중치로 loss 계산 을 해결하기 위한 방법)
                
                ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2083.png)
                
                - Object가 존재하는 그리드 셀 i의 bounding box predictor j에 대해, confidence score의 loss를 계산. (Ci = 1)
                
                ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2084.png)
                
                - Object가 존재하지 않는 그리드 셀 i의 bounding box predictor j에 대해, confidence score의 loss를 계산. (Ci = 0)
                
                ![Untitled](/images/2022-07-13-YOLO(You Only Look Once)/Untitled%2085.png)
                
                - Object가 존재하는 그리드 셀 i에 대해, conditional class probability의 loss를 계산.
                
                
    
- YOLO 논문 parameter 설정
    - 논문에서 YOLO는 파스칼 VOC dataset으로 학습, epoch = 135
    
    - batch size = 64, momentum=0.9, decay=0.0005 설정
        - batch size : 한 번의 batch마다 주는 데이터 샘플의 size
        - momentum : 움직임의 축적, 이력이 가중치의 추가 변화에 얼마나 영향을 미치는지에 대한 parameter
        - decay : 데이터 집합의 불균형 해소를 위한 parameter
        - 자세한 parameter 설명은 링크 참조
          
            [CFG Parameters in the [net] section · AlexeyAB/darknet Wiki](https://github.com/AlexeyAB/darknet/wiki/CFG-Parameters-in-the-%5Bnet%5D-section)
        
    - 초반 학습률은 0.001에서 0.01로 천천히 상승
        - 높은 학습률로 훈련시키면   gradient explosion 발생, 그래서 낮음 학습률로 시작
        
    - 75 epoch 동안에는 학습률 = 0.01, 이후 30 epoch 동안 , 0.001, 이후 30 epoch , 0.0001
      
        - 학습률을 점점 증가시키다 다시 감소시킴
        
    - 과적합을 막기 위해 dropout, data augmentation 적용
        - dropout = 0.5 , data augmentation 위해 원본 20% random scaling, random translation 적용
            - dropout  : Overfitting 해소하기위해 hidden layer의 일부 유닛이 동작하지 않게 하여 Overfitting 막는것
            - data augmentation : 데이터의 양을 늘리기 위해 원본에 각종 변환을 적용하여 개수를 증강시키는 기법
            
            
    
- 요약
    1. ImageNet 데이터 셋으로 YOLO의 앞단 20개의 컨볼루션 계층을 사전 훈련
    2. 사전 훈련된 20개의 컨볼루션 계층 뒤에 4개의 컨볼루션 계층 및 2개의 전결합 계층을 추가
    3. YOLO 신경망의 마지막 계층에는 선형 활성화 함수를 적용하고, 나머지 모든 계층에는 leaky ReLU를 적용
    4. 구조상 문제 해결을 위해 아래 3가지 개선안을 적용
        1. localization loss와 classification loss 중 localization loss의 가중치를 증가
        2. 객체가 없는 그리드 셀의 confidence loss보다 객체가 존재하는 그리드 셀의 confidence loss의 가중치를 증가
        3. bounding box의 너비, 높이에 square root를 취해준 값을 loss function으로 사용
    5. 과적합을 막기 위해 드롭아웃과 data augmentation을 적용
    

&nbsp;

### Inference

- Training 단계에서 수행한 7 x 7 x 2 = 98개의 bounding box 예측
- bounding box 마다 class probabilities 계산
- YOLO는 R-CNN과 다르게 하나의 신경망 계산만 필요해서 테스트 단계가 빠름



&nbsp;



## Limitations of YOLO

- YOLO는 하나의 그리드 셀마다 두 개의 bounding box를 예측 (B = 2), 그리고 하나의 그리드 셀마다 오직 하나의 객체만 검출함 —> 공간적 제약 발생
    - 공간적 제약 : 하나의 그리드 셀은 오직 하나의 객체만 검출하므로 하나의 그리드 셀에 두 개 이상의 객체가 붙어있다면 이를 잘 검출하지 못하는 문제
    - 여러 작은 물체가 같이 있는 상태에서 YOLO는 작게 모여있는 객체를 따로따로 detection하지 못함
- YOLO는 데이터로부터 bounding box를 예측하는 것을 학습하기 때문에 훈련 단계에서 학습하지 못했던 새로운 종횡비를 마주하면 학습이 잘 안됨
    - 종횡비 : 가로 세로 비율
- YOLO 모델은 큰 bounding box와 작은 bounding box의 loss에 대해 동일한 가중치줌,  큰 bounding box에 비해 작은 bounding box가 위치 변화에 따른 IOU 변화가 더 심하기 때문입니다. 이를 부정확한 localization 문제 —> 이를 해결하기 위해 SSE 에서 bounding box마다 다른 가중치를 줬지만 그래도 문제가 되는것 같습니다.