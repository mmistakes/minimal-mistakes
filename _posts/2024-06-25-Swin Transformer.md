---
layout: single        # 문서 형식
title: 'Swin Transformer 리뷰'         # 제목
categories: Generative Model    # 카테고리
toc: true             # 글 목차
author_profile: false # 홈페이지 프로필이 다른 페이지에도 뜨는지 여부
sidebar:              # 페이지 왼쪽에 카테고리 지정
    nav: "docs"       # sidebar의 주소 지정
#search: false # 블로그 내 검색 비활성화
---
# Keywords
Transformer, Window, Shifted


# 1. Introduction
#### - CNN
컴퓨터 비전에서의 모델들은 주로 CNN 기반이 많았다. 그리고 CNN architecture들은 더 정교하고 더 복잡하고 더 크고 확장이 가능한 연결형태를 만듦으로써 convolution 형태를 진화시켜왔디. 다양한 vision task에서 cnn은 backbone network로 많이 사용되어왔고 많은 분야에서 향상된 성능을 보여왔다.

#### - NLP
주로 transformer 기반으로 많이 사용한다. 성능이 좋아서 이를 컴퓨터 비전에도 적용하려는 시도가 있어왔다.

#### - nlp에서의 성능을 vision에서도 적용이 가능한가
이 논문에서 저자들은 컴퓨터 비전에서 일반적인 목적으로써 사용가능하도록 Transformer의 적용가능성을 확장시키고자한다. nlp에서 사용하는 transfomer를 vision에도 적용시키기에는 어려운데 scale과 text보다 image pixel이 더 많은 해상도(정보)를 포하는 어려움이 있다. 이들을 극복하고자 Swin Transformer 제안한다.

#### - Swin Transformer 의 구조에 대한 간략한 설명
계층적 feature map과 이미지 크기에 대한 선형 계산적 복잡도로 구성한다. 계층적 feature map 덕분에 dense prediction에 대한 고급 기술들 적용 가능하다. 선형 계산 복잡도는 이미지를 겹치지 않는 패치별로 잘라 부분마다 self-attention을 적용함으로써 계산이 가능하다. window마다 patch 수 고정함으로써 선형적인 계산 복잡도를 계산할 수 있다.

#### - Swin Transformer 의 구조 중 핵심 설계
연속적인 self attention 층간 window partition의 shift 한다. 이를 통해 층간 연결성으로 인해 모델링 파워 강화되며 실제 세계에서의 연산량에 영향을 미친다. experiment 보면 모델의 파워는 비슷한데 연산량은 더 적다.



# 2.Methods
## 2.1. Overall Architecture
<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\figure3.jpg">

#### - Input
<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\figure3-1.jpg" weight=500 height = 200>

이미지들을 ViT의 patch들처럼 겹치지 않게 각각 RGB채널마다 나눈다. 이 때 각 패치들은 토큰으로 간주되고 이에 대한 feature map은 raw pixel RGB값의 결합이다. 여기서는 패치크기를 4x4로 설정해 각 패치마다 feature 차원은 4x4x3(RGB channel)로 구성 한다. 이를 linear embedding 층에 적용하는데 arbitrary dimension $C$로 사영(삽입)한다. 변형된 self-attention 계산(Swin Transformer block)을 이용한 여러 Transformer block들에 앞서 구성한 패치들을 적용한다. 이때 Transformer block들의 크기는 토큰의 개수인 $\frac{H}{4}$x$\frac{W}{4}$ 이고 이를 Stage1이라고 지칭한다.


#### - Hierarchcial Feature Map
<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\figure3-2.jpg" weight=800 height = 200 >


이제 전체적인 구성에서 계층적인 feature map을 구성해야 하므로 신경망이 깊어짐에 따라 patch들을 합쳐 토큰의 수를 감소시켜야한다. Stage1에서 Stage2로 이동하면서 기존 패치들을 2x2로 합침으로써 4C 차원의 feature map을 구성한다. 따라서 output 차원은 2C가 된다. 동일하게 각 Stage를 이동할때마다 2x downsampling of resolution을 적용해 Stage3와 Stage4의 해상도는 각각 $\frac{H}{16}$x$\frac{W}{16}$x$4C$, $\frac{H}{32}$x$\frac{W}{32}$x$8C$로 층을 지날수록 감소한다. 이 작업을 통해 제안한 architecture는 일반적인 representation보다 더 계층적인 것을 학습가능하고 차원이 감소한 만큼 연산속도에도 이점이 있다.


## 2.2. Shifted Window based Self-Attention
#### - Swin Transformer Block
<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\figure3-3.jpg" weight=100 height = 200>
<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\figure3-3-1.jpg" weight=100 height = 200>

Swin Transformer는 기존 multi-head self-attention(MSA) 에서 shifted window가 적용된 Transformer Block을 사용한다. ViT의 Transformer Block과의 차이점으로는 2개의 block이 하나로 구성되어 있는데, 첫번째 block은 W-MSA를 사용하고 두번째 block은 SW-MSA(Shifted Winodw MSA)를 사용한다.

#### - Computation Complexity
기존 ViT는 이미지 전체에 대해 self-attention을 수행하기때문에 연산량이 많이 요구된다. 반면에 Swin은 겹치지않는 window를 이용한 self-attention으로 보다 효율적인 연산이 가능하다. 각 window가 $M$x$M$ 개의 패치를 가지고 이미지의 크기가 $h$x$w$ 라고 가정하자.복잡도 계산시 Softmax 계산은 제외하였을 때, 각각 ViT와 Swin 내 MSA의 복잡도 크기는 다음과 같다. 

$\Omega(MSA)$ = $4hwC^2 + 2(hw)^2C$,
$\Omega(W$-$MSA)$ = $4hwC^2 + 2M^2hwC$

이 때, ViT는 $hw$에 대해 quadratic한 식이 구성되지만 Swin은 window의 크기가 고정되어있으니 상수처럼 취급하고 $hw$의 크기에서만 선형적으로 증가하기 때문에 Swin의 연산량이 더 적다는 것을 알 수 있다.

#### - Shifted winodw partitioning in succevie blocks
window를 이용한 self-attention 모듈은 window 간 상호작용이 부족해 모델링 능력이 제한된다. 이를 보완하기 위해 연속된 Swin Transformer block을 번갈아 사용하는 naive한 shifted window partitioning은 다음과 같다.                                      

<p align = "left"><img src = "E:\공부\Github\blog\images\SwinTransformer\figure2.jpg">

$l$번째 층에서는 왼쪽 위를 기준으로 $M$x$M$ 크기로 윈도우를 분할하고 $\lceil \frac{h}{M} \rceil$x$\lceil \frac{w}{M} \rceil$ 개의 window들에 대해 각각 독립적으로 self-attention을 시행한다. 다음 층인 $l+1$번째 층에서는 $(\lceil \frac{h}{M} \rceil+1)$x$(\lceil \frac{w}{M} \rceil+1)$ 개의 추가적인 window로 나누어 $l$번째 층과 동일하게 self-attention을 시행한다. 이 때 각 window들은 $\lceil \frac{M}{2} \rceil$x$\lceil \frac{M}{2} \rceil$ 만큼 이동해(shifted) self-attention을 시행한다. 이를 그림으로 표현하면 다음과 같다.
<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\figure2-1.jpg">


#### - Cyclic Shift

위와 같은 naive한 shift의 경우 window의 개수가 2x2에서 3x3로 증가함에 따라 연산량이 2.25배가 되어 윈도우의 크기가 커짐에 따라 연산량이 기하급수적으로 증가한다. 그래서 본 논문에서는 cyclic shift를 제안한다.

<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\figure4.jpg">

위 그림에서 알 수 있듯이, 이는 기존 분할의 왼쪽 위 부분들을 오른쪽 하단으로 옮기는 것이다. 이 상태에서 self-attention을 시행하면 독립적으로 시행된 self-attetion이 다른 window에도 적용 가능하다.  여기서 A, B, C가 이동하여 window의 개수는 2x2로 유지된 상태로 self-attention이 시행된 것이므로, 중복 attention 연산을 제안하기 위해 masked self-attention을 진행한다.

#### - Computation of Consecutive Blocks
$\hat{z}^l = W$-$MSA (LN(z^{l-1}))+ z^{l-1}$,
$z^l = MLP(LN(\hat{z}^{l}))+ \hat{z}^{l}$,
$\hat{z}^{l+1} = SW$-$MSA (LN(z^{l}))+ z^{l}$,
$z^{l+1} = MLP(LN(\hat{z}^{l+1}))+ \hat{z}^{l+1}$,

여기서 $z^l$과 $\hat{z}^l$은 각각$l$번째 block에서 $MLP$ 모둘과 $(S)W$-$MSA$의 ouput feature이다.
이렇게 겹치지않는 이웃한 window 간 연결을 이용한 shifted window 분할은 image classification, object detection, semantic segmentation 등 다양한 분야에서 효율적이라는 것을 알 수 있다.




# 3. Experiments
## 3.1. Image Classification
- #### Settings
<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\settings_IC.jpg">

IamgeNet-1K으로 학습하였다. settings2에서 fine-tuning 진행시 30epoch, batch size 1024, constant learning rate $10^{-5}$, weight decay $10^{-8}$ 로 진행하였다.

- #### Results on Setting1
<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\result1.jpg">

기존 SOTA 모델인 DeiT 와 비교했을 때, 복잡도가 유사한 DeiT에 대해 Swin이 더 좋은 성능을 보인다. 또한 ConvNets 과 비교했을 때도 Swin이 조금 더 좋은 성능과 속도를 보인다. 

- #### Results on Setting2
<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\result2.jpg" weight=100 height = 200>

setting2에서 역시 다른 모델들에 비해 Swin이 조금 더 좋은 성능과 속도를 보인다.

## 3.2. Object Detection
- #### Settings
<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\settings_OD.jpg">

COCO 2017로 학습을 진행하였다. 시스템 수준 비교를 위해 instaboost, 강력한 다중 스케일 학습, 6배 스케줄 (epochs 72), soft-NMS, 그리고 ImageNet-22K 사전 학습 모델을 초기화로 사용하는 개선된 HTC (HTC++)를 사용한다.

- #### Results on Various Frameworks
<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\result3.jpg" weight=100 height = 200>

4가지 프레임워크에서 모두 기존 ResNe(X)t-50 보다 parameter 수가 많고 FLOPS는 비슷하지만, 이에 반해 높은 정확도을 보인다. 

- #### Results on Various backbones with cascade Mask R-CNN

<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\result4.jpg" weight=100 height = 200>

또한 Cascade Mask R-CNN을 backbone network로 이용했을 때 역시 다른 모델들에 비해 Swin이 높은 정확도를 보인다.
이 때 infernce speed에 대해, ResNe(X)t는 highly optimized Cudnn 함수를 이용했지만 Swin은 PyTorch 함수를 이용하였기에 최적화 성능에서 어느 정도 차이가 발생하였다. 

- #### Results on System-level Comparsion

<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\result5.jpg">

기존 SOTA 모델들과 비교했을 때, Swin이 가장 우수한 성능을 보인다.

## 3.3. Semantic Segmentation

#### - Settings
ADE20K 로 학습을 진행하였다. base framework로써 mmseg에서UperNet을 이용하였다. 

#### - Results 
<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\result6.jpg">

평가지표로 mIOU를 이용하였다. 다른 모델들과 비교했을 때, Swin이 validation set과 test set에서 모두 가장 높은 점수를 보인다.

## 3.4. Ablation Study

#### - Settings

3.1 ~ 3.3 에서 수행한 작업들에 대해 Ablation Study를 진행하였다. 

#### - Results on Relative Position Bias
<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\ablation1.jpg">

- 1. Shifted Windows

표의 윗 부분에서 shifted windows에 대한 성능을 비교한 결과를 보인다. 연속되는 층들에 대해 window간 연결을 할 때 shifted windows를 이용하는 것이 더 효율적이라는 것을 알 수 있다.

- 2. Relative Position Bias

표의 아랫부분에서 다양한 위치 임베딩 접근 방식을 비교한 결과를 보인다. Swin-T에서 상대 위치 편향을 사용해 다른 모델들에 비해 더 좋은 효과를 보인다. 또한 절대 위치 임베딩의 포함이 이미지 분류 정확도를 향상시키지만, 객체 탐지 및 시맨틱 세그멘테이션 성능은 오히려 저하된다.
최근의 ViT/DeiT 모델들이 이미지 분류에서 번역 불변성을 포기했음에도 불구하고, 이는 시각적 모델링에 있어 오랫동안 중요한 것으로 여겨져 왔다. 그래서 저자는 특정 번역 불변성을 장려하는 귀납적 편향이 특히 객체 탐지와 시맨틱 세그멘테이션과 같은 밀집 예측 작업에서 여전히 일반 목적 시각적 모델링에 선호된다는 것을 발견했다.


#### - Results on Shifted Winodws and Different self-attention methods
<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\ablation2.jpg">

위 표는 여러 self-attention 계산 방법을 비교한 표이다. 본 논문에서 제시하는 Cyclic Shift는 더 깊은 층에서의 naive padding보다 더 좋은 성능을 보인다.

또한 4 단계에 걸친 MSA에서 shifted window가 sliding window에 비해 대부분 더 좋은 성능을 보인다. 이를 바탕으로 각각 Image Classification, Object Detection, Semantic Segmentation에 적용한 결과는 다음 표와 같다.

<p align = "center"><img src = "E:\공부\Github\blog\images\SwinTransformer\ablation3.jpg">



# 참고
https://lcyking.tistory.com/entry/%EB%85%BC%EB%AC%B8%EB%A6%AC%EB%B7%B0-Swin-Transformer-Hierarchical-Vision-Transformer-using-Shifted-Windows