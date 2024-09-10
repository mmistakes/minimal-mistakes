---
layout: single        # 문서 형식
title: Diffusion Models, Image Super-Resolution And Everthing : A Survey         # 제목
categories: Generative Model    # 카테고리
toc: true             # 글 목차
author_profiel: false # 홈페이지 프로필이 다른 페이지에도 뜨는지 여부
sidebar:              # 페이지 왼쪽에 카테고리 지정
    nav: "docs"       # sidebar의 주소 지정
#search: false # 블로그 내 검색 비활성화
---
# Keywords
Super Resolution, Diffusion Models, 


# 1. Introduction
Computer-Vision에서 Image Super-Resolution(SR)은 어설픈 특성때문에 오랫동안 어려운 분야로 취급받아왔다. 다양한 분야에서 여러 어려움들을 해결하고자 했고 GAN을 이용하고자 했지만 GAN에서의 regularization과  optimization으로는 극복하기 어려웠다. 최근에 Diffusion Models(DMs)의 등장으로 GAN의 여러 한계들을 뛰어넘게 되었고, SR 역시 Diffusion을 이용해 발전을 이루었다. 하지만 DMs 역시 여러 문제와 한계점이 존재하고 이를 뛰어넘기 위해 많은 연구자들이 힘쓰고 있다.



# 2. Image Super-Resolution
목표 : 저해상도 이미지를 고해상도로 변환하는 것을 목표로 한다.
종류 : 변환시키는 이미지의 수에 따라 Single과 Multi로 구분한다. 

## 2.1. Single Image SR (SISR)
주어진 단일 저해상도 이미지 $\mathbf{x} \in \mathbb{R}^{\bar{w} \times \bar{h} \times c}$ 에 대응하는 $\mathbf{y} \in \mathbb{R}^{w \times h \times c}$ 를 생성하는데, 여기서
$\bar{w} < w$, $ \bar{h} < h $ 를 만족한다. 
$x$와 $y$의 관계를 표현하면 다음과 같다.

$$ \mathbf{x} = D(\mathbf{y};\Theta) = ((\mathbf{y} \otimes \mathbf{k}) \downarrow_{s} + \mathbf{n})_{JPEG_q} $$

여기서 $D$는 degradation mapping으로 $D : \mathbb{R}^{w \times h \times c} \rightarrow \mathbb{R}^{\bar{w} \times \bar{h} \times c} $ 이고 $\Theta$는 blur $\mathbf{k}$, noise $\mathbf{n}$, scaling $s$, compression quality $q$ 등과 같은 degradation parameter들을 포함한다. 

화질저하(degradation)는 보통 알 수 없으므로 $D$의 매개변수 $\theta$ 의 inverse mapping을 결정하는 것이 주요 과제이다. 이는 보통 SR 모델로 구현된다. 그리고 원래 HR 이미지인 $\mathbf{y}$와 예측한 SR 이미지인 $\hat{\mathbf{y}}$ 간 차이를 최소화 하는 것을 목표로 하고 이를 다음과 같이 표현할 수 있다.

$$
\theta = argmin_{\theta} \mathcal{L}(\hat{\mathbf{y}}, \mathbf{y}) + \lambda \phi(\theta)
$$

여기서 $\mathcal{L}$은 원래(실제) HR 이미지인 $\mathbf{y}$와 예측한 SR 이미지인 $\hat{\mathbf{y}}$ 간 손실함수, $\lambda$는 balancing parameter, $\phi(\theta)$는 regularization term이다.

$\theta$ 를 예측하는 과정에서 ill-posed problem으로 인해 고유한 복잡성 문제가 발생한다. 여러 SR 이미지가 주어진 저해상도 이미지에 대해 유효할 수 있으며, 원본 고해상도 이미지와 유사한 손실값을 가질 수 있지만 밝기나 색상 등에서 주관적으로 다르게 인식될 수 있다. 이를 해결하기 위해 현실적인 세부 사항을 추정해야하며, 이는 일반적으로 생성 모델의 범주이다. 이 중 DMs가 해당 영역의 최전선에 있다.


## 2.2. Datasets
대부분은 LR과 HR 짝으로 구성, 일부는 HR만 존재해 antialiasing을 이용한 bicubic downsampling으로 LR을 구성한다. DIV2K, Flickr2K, FFHQ, CelebA-HQ 등이 있다. 


## 2.3. Methods
#### - Traditional Methods
statistical, edge-based, patch-based, prediction-based, sparse representation techniques 들을 이용하는데, 고해상도 이미지를 생성하기 위해 이미지 분포를 파악해 기존 픽셀들에 대한 정보를 이용한다. 

#### - Regression-based Deep Learning
딥러닝이 여러 CV 분야에서 좋은 성능을 보이자 SR에도 딥러닝을 이용하였다. 그 중 저해상도에서 고해상도로 해상도를 증가시키는 end-to-end mapping 구조인 CNN 기반 모델들을 주로 사용한다. SRCNN, FSRCNN, ESPCNN 등 초기 모델들은 깊이와 feature map의 크기를 조절하는 정도로 사용하였다. 그리고 최근 모델들은 여러 CV 분야에서 이용하는 concept들을 이용해 다양한 방법으로 적용한다. 더욱 최근에는 이미지 내 관심있는 부분에 집중하기 위해 attention 구조를 이용하기도 한다. 이와 같은 방법들은 모두 regression에 기초한 것들이며 손실함수로는 주로 L1과 L2 정규화다. 그러나 이러한 방법들은 낮은 배율에서는 효율적이지만, 배율이 올라감에 따라 효율이 감소한다. 특히, 더 큰 upscaling에서 세부사항에 문제가 발생하고 지나치게 부드러운 결과를 생성하는 경향이 있다. 이 문제들은 보통 생성모델을 통해 해결된다.

#### - Generative Adversarial Networks (GANs)
GAN은 Generator $G$와 Discriminator $D$를 이용하는데, SR에서 $G$는 최대한 원본 이미지와 비슷하게 HR sample들을 생성하는 것을 목표로 하고 동시에 $D$는 $G$가 생성한 이미지와 원본 이미지를 구별하도록  학습한다. SRGAN 이나 ESRGAN의 경우 덜 부드러운 이미지를 생성하기 위해 adversarial 손실과 content loss를 같이 사용해 최적화하기도 한다. GAN의 SOTA 모델들을 이용한 이미지들은 더욱 정교하고 구체적이게 되간다. 그러나 모드 붕괴에 취약하고 상당한 계산 비용을 요구하며, 어떤 경우에는 수렴이 되지않아 안정성 문제가 발생한다. 

#### - Flow-based Methods
Flow-based 방법은 optical flow algorithm을 이용해 SR 이미지를 생성한다. 이는 입력받은 저해상도 이미지에 대해 가능한 고해상도 이미지의 조건부 분포를 학습해 SR의 ill-nature을 해결하려 한다. 저해상도 이미지와 고해상도 이미지를 정렬하기 위해 displacement field(변위장)을 계산해 SR 이미지를 복원하는 조건부 정규화 flow 구조를 도입한다. 이 때 입력받은 모든 고해상도 이미지를 잠재적인 flow 공간으로 mapping해 정확하게 재구성할 수 있는 fully invertible encoder를 이용한다. 그래서 이 방법은 SR 모델이 정확한 log 가능도를 기초로 하는 학습을 사용하는 분포를 학습할 수 있다. 이 방법덕분에 불안정성을 방지하고 일정한 계산 비용을 가진다.


## 2.4. Image Quality Assessment (IQA)
이미지 품질은 선명도, 대비, 노이즈 유무 등의 여러 특성들을 다루는 다면적인 개념이다. 따라서 생성한 이미지의 품질을 평가하는 것은 쉬운 일이 아니다. Image Quality Assessment(IQA)는 인간 관찰자의 지각 평가와 유사한 모든 지표를 의미하며, SR에서는 SR기술을 적용 후 이미지에서 인식되는 현실감 수준을 나타낸다. 여기서는 다음과 같은 notation을 사용한다.

$$
\mathbf{x} \in \mathbb{R}^{w \times h \times c}, \Omega_{\mathbf{x}} = \{ (i,j,k) \in \mathbb{N}^{3}_{1} | i \le h, j \le w, k \le c  \}
$$ 

이고 이는 $\mathbf{x}$ 의 모든 가능한 위치의 집합에서 정의된다.  

#### - Peak Signal-to-Noise Ratio (PSNR)

SISR의 복원 성능을 평가할 때 가장 많이 사용하는 지표이다. 이는 pixel 내 최대값 $L$ 과 SR로 생성한 이미지 $\mathbf{\hat{y}}$와 실제 고해상도 이미지 $\mathbf{y}$ 의 MSE(Mean Squared Error) 간 비율이다.

$$
\mathbf{PSNR}(\mathbf{y},\mathbf{\hat{y}}) = 10 \cdot \log_{10} \frac{L^2}{\frac{1}{N} \sum_{i=1}^{N}{[\mathbf{y} - \mathbf{\hat{y}}]^2}} 
$$

가장 널리 알려진 지표임에도 불구하고, 인간의 인지와는 정확하게 맞지는 않다. 이는 주로 주관적으로 인식되는 품질과 일치하지 않는 픽셀 차이에 집중한다. 픽셀의 미세한 이동이 PSNR에는 큰 영향을 미칠 수 있지만, 인간의 인지에는 영향이 적을 수도 있다. 또한 픽셀 단계에서 계산되기 때문에 서로 관련이 있는 픽셀을 기반으로 손실을 훈련한 모델은 높은 PSNR 값이 나온다. 반면에 생성 모델은 더 낮은 PSNR을 생성하는 경향이 있다.

#### - Structural Similarity Index (SSIM)
SSIM은 PSNR과 비슷하게 이미지 간 구조적 특징들의 차이점에 집중하는 평가방법이다. 이는 명도, 대비, 구조를 비교해 구조적 유사성을 포착한다. 이를 수식으로 표현하면 다음과 같다.

$\mathbf{y}$ : 이미지,

$\mu_{\mathbf{y}}$ : 이미지의 명도를 평균으로 표현, $\mu_{\mathbf{y}} = \frac{1}{N}\sum_{p \in \Omega_{\mathbf{y}}} \mathbf{y}_p$,

$\sigma_{\mathbf{y}}$ : 이미지의 대비를 표준편차로 표현, $\sigma_{\mathbf{y}} = \frac{1}{N-1}\sum_{p \in \Omega_{\mathbf{y}}} [{\mathbf{y}_p - \mu_{\mathbf{y}}}]^2$, 

$S$ : 계산한 entity간 유사성을 위한 비교함수, $S(x,y,c) = \frac{2 \cdot x \cdot y + c}{x^2 + y^2 + c}$

여기서 $x$와 $y$는 비교가능한 scalar 변수, $c = (k \cdot L)^2 $  $for$ $ 0 < k << 1$ 는 수치적 안정성을 위한 상수이다.

이제 고해상도 이미지 $\mathbf{y}$ 와 SR 이미지 $\mathbf{\hat{y}}$에 대한 표현은 다음과 같다.

명도 $\mathcal{C}_l(\mathbf{y}, \mathbf{\hat{y}}) = S(\mu_{\mathbf{y}},\mu_\mathbf{\hat{y}}, c_1)$,

채도 $\mathcal{C}_c(\mathbf{y}, \mathbf{\hat{y}}) = S(\mu_{\mathbf{y}},\mu_\mathbf{\hat{y}}, c_2)$

여기서 $c_1$과 $c_2$는 모두 0보다 크다.

empirical covariance $\sigma_{\mathbf{y}, \mathbf{\hat{y}}} = \frac{1}{N-1}\sum_{p \in \Omega_{\mathbf{y}}} ({\mathbf{y}_p - \mu_{\mathbf{y}}})({\mathbf{\hat{y}}_p - \mu_{\mathbf{\hat{y}}}})$,

구조적 비교를 위한 상관관계 $\mathcal{C}_s(\mathbf{y}, \mathbf{\hat{y}}) = \frac{\sigma_{\mathbf{y}, \mathbf{\hat{y}}} + c_3}{\sigma_{\mathbf{y}} \cdot \sigma_{\mathbf{\hat{y}}}+ c_3} $

여기서 $c_3$ 은 0보다 크다.

마지막으로 SSIM은 다음과 같다.

$$
\mathbf{SSIM}(\mathbf{y}, \mathbf{\hat{y}}) = [\mathcal{C}_l(\mathbf{y}, \mathbf{\hat{y}})]^{\alpha} \cdot [\mathcal{C}_c(\mathbf{y}, \mathbf{\hat{y}})]^{\beta} \cdot [\mathcal{C}_s(\mathbf{y}, \mathbf{\hat{y}})]^{\gamma}
$$

여기서 $\alpha, \beta, \gamma$는 모두 구성요소의 상대적인 중요성을 조정하기 위한 0보다 큰 파라미터들이다.


#### - Mean Opinion Score (MOS)
MOS는 생성된 SR 이미지의 평가를 위해 인간의 지각 품질을 활용하는 주관적인 측정방법이다. 인간이 SR 이미지를 보고 품질 점수를 매겨 이를 수치적인 값으로 변환해 평균을 낸다. 인간 지각의 직접적인 평가를 얻을 수 있지만, 객관적인 지표들에 비해 시간이 더 많이 걸리고 번거롭다. 또한 매우 주관적이기때문에 편향될 가능성도 있다.


#### - Consistency
Consistency는 비결정론적 SR 방법인 GAN이나 DM같은 생성모델의 안정성을 측정하기 위해 사용한다. 생성모델들은 동일한 입력에 대해 다양한 출력을 생성하게 의도적으로 구성되었는데, 이를 위해서는 일정 수준의 consistency가 요구된다. 이를 측정하기 위한 방법으로는 주로 Mean Squared Error가 사용된다.


#### - Learned Perceptual Image Patch Similarity (LPIPS)
LPIPS는 사전학습된 CNN 모델 $\varphi$ 를 이용해 저해상도에서 고해상도까지의 feature map을 $L$개 생성한다. 그리고 이들간 유사성을 순차적으로 계산한다. 주어진 $l$ 번째 feature map 의 높이와 길이인 $h_l$과 $w_l$, 그리고 scaling vector $\alpha \in \mathbb{R}^{C_{l}}$ 에 대해, LPIPS metric은 다음과 같다.

$$
\mathbf{LPIPS}(\mathbf{y}, \mathbf{\hat{y}}) = \sum_{l=1}^{L} \sum_{p}{\frac{||\alpha_l \odot (\varphi^{l}(\mathbf{\hat{y}}) - \varphi^{l}(\mathbf{y}) )_{p} ||_{2}^{2}}{h_l \cdot w_l}}
$$

LPIPS는 $\varphi$ 를 이용해 이미지를 지각적 feature space 로 사영하고, 원본 고해상도 이미지와 생성한 고해상도 이미지의 대응하는 패치 간 차이을 $\alpha_l$로 scaling 하여 평가한다. 이는 PSNR이나 SSIM 과 같은 방법들에 비해 인간의 지각과 더 잘 일치하므로 인간 중심의 평가가 가능케한다.



# 3. Diffusion Models 

## 3.1. Architecture 
DMs 는 생성 AI 분야에 엄청난 영향력을 보여서, 다양한 모델들이 파생되고 있다. 기존 생성모델들과의 차이점으로는 간 순방향과 역방향의 반복적인 시간 단계에서 실행된다는 것이다. 순방향 $q$는 점진적으로 반복적으로 노이즈를 추가함으로써 입력 데이터의 품질을 저하시킨다. 역방향 $p$ 는 품질이 저하된 데이터의 노이즈를 걷어내고 역시간순으로 원본 이미지를 복원한다. 이는 다음 그림과 같이 표현할 수 있다.


<p align = "center"><img src = "E:\공부\Github\blog\images\SRDM Survey\figure1.jpg">

#### - Notation 

시간 단계 $t$ : 순방향 diffusion 동안 증가 및 역방향 diffusion 동안 0으로 전파, 유한한 $T$에 대해 $0 < t \le T$로 유한한 경우만 고려.

$\mathcal{D}$ : 저해상도-고해상도 image pair set, $\mathcal{D} = ${$\mathbf{x}_i, \mathbf{y}_i $}$ _{i=1}^{N}$

확률 변수 $\mathbf{z}_t$ : 이미지와 corruption space 간 상태인 현재 상태, 이 때 순방향 $\mathbf{z}_t$ 와 역방향 $\mathbf{z}_t$ 사이에는 명확한 구분이 없다.

#### - Assumptions
순방향 diffusion 동안 $\mathbf{z}_t$ ~ $q(\mathbf{z}_t | \mathbf{z}_{t-1})$, 역방향 diffusion 동안 $\mathbf{z}_{t-1}$ ~ $p(\mathbf{z}_{t-1} | \mathbf{z}_{t})$ 이고 $t=0$ 일 때 초기 데이터 분포는 $\mathbf{z}_0$ ~ $q(\mathbf{x})$ 이다. 이 때 $q$와 $p$는 DM에 따라 구현이 달라지는데, 이는 크게 Denoising Diffusion Probabilistic Models (DDPMs)와 Score-Based Generative Models (SGMs), 그리고 Stochastic Differential Equations (SDEs)로 구분된다.


## 3.2. Denosing Diffusion Probabilistic Models (DDPMs)

DDPMs는 유한한 discrete  시간 단계 동안 순방향과 역방향 diffusion을 활성화하기위해 2개의 Markov chain을 사용한다. 

#### - Forward Diffusion
데이터의 분포를 사전분포로 변환한다. 이는 다음과 같이 표현할 수 있다.

$$
q(\mathbf{z}_t | \mathbf{z}_{t-1}) = \mathcal{N}(\mathbf{z}_t | \sqrt{1-\alpha_t} \mathbf{z}_{t-1}, \alpha_t \mathbf{I})
$$

여기서 하이퍼파라미터 $\alpha_t$는 각 단계마다 포함된 노이즈의 분산을 의미하고 범위는 $0 < \alpha_{1:T} < 1$이다. 주로 가우시안 커널을 이용하지만 다른 커널도 사용가능하다. 위 식을 하나의 계산으로 축약하면 다음과 같다.

$$
q(\mathbf{z}_t | \mathbf{z}_{0}) = \mathcal{N}(\mathbf{z}_t | \sqrt{\gamma_t}\mathbf{z}_{0}, (1-\gamma_{t})\mathbf{I}), 
$$ 여기서 $\gamma_t = \prod_{i=1}^{t} ({1-\alpha_i})$ 이다.

따라서 $\mathbf{z}_t$는 이전 시간 단계에서 발생해야 할 일과 상관없이 다음과 같이 직접 샘플링될 수 있다.

$$
q(\mathbf{z}_t | \mathbf{z}_{0}) = \mathcal{N}(\mathbf{z}_t | \sqrt{\gamma_t} \cdot \epsilon), \epsilon ~ \mathcal{N}(\mathbf{0}, \mathbf{I})
$$

#### - Backward Diffusion
역방향 diffusion의 목표는 순방향 diffusion의 역을 직접적으로 학습하고, SR 에서 보통 고해상도 이미지인 사전분포 $\mathbf{z}_0$ 을 닮은 분포를 생성하는 것이다. 실제로 $p$의 매개 변형을 학습하기 위해 CNN을 사용한다. 순방향 diffusion에서 $q(\mathbf{z}_T) \approx \mathcal{N}(\mathbf{0}, \mathbf{I})$ 으로 근사하기때문에, 학습가능한 transition kernel의 형태는 다음과 같다.

$$
p_{\theta}(\mathbf{z}_{t-1} | \mathbf{z}_{t}) = \mathcal{N}(\mathbf{z}_{t-1} | \mu_{\theta}(\mathbf{z}_t, \gamma_{t}), \Sigma_{\theta}(\mathbf{z}_t, \gamma_t)),$$ 

여기서 $\mu_{\theta}$와 $\Sigma_{\theta}$은 학습가능하다. 유사하게 $p_{\theta}(\mathbf{z}_{t-1} |\mathbf{z}_{t}, \mathbf{x})$ 에서는 $\mu_{\theta}(\mathbf{z}_t, \mathbf{x}, \gamma_{t}), \Sigma_{\theta}(\mathbf{z}_t, \mathbf{x}, \gamma_t)$ 를 대신 사용가능하다.

#### - Optimization 
순방향 과정을 학습하는 역방향 diffusion을 안내하기 위해, 다음과 같은 순방향 및 역방향 시퀀스의 결합 분포에 대한 Kullback-Leibler (KL) Divergence를 최소화한다.

$$
p_{\theta}(\mathbf{z}_{0}, ... , \mathbf{z}_{T}) = p(\mathbf{z}_T) \prod_{t=1}^{T}p_{\theta}(\mathbf{z}_{t-1} |\mathbf{z}_{t}),
$$
$$
q(\mathbf{z}_{0}, ... , \mathbf{z}_{T}) = p(\mathbf{z}_0) \prod_{t=1}^{T}q(\mathbf{z}_{t-1} |\mathbf{z}_{t})
$$ 에 대해

$$
\mathbf{KL}(q(\mathbf{z}_{0}, ... , \mathbf{z}_{T})||p_{\theta}(\mathbf{z}_{0}, ... , \mathbf{z}_{T}))
$$
$$
= -\mathbb{E}_{q(\mathbf{z}_{0}, ... , \mathbf{z}_{T})} [\log p_{\theta}(\mathbf{z}_{0}, ... , \mathbf{z}_{T})] + c
$$
$$
\overset{(i)}{=} \mathbb{E}_{q(\mathbf{z}_{0}, ... , \mathbf{z}_{T})}[- \log p(\mathbf{z}_T) - \sum_{t=1}^{T} \log \frac{p_{\theta}(\mathbf{z}_{t-1} | \mathbf{z}_{t})}{q(\mathbf{z}_t | \mathbf{z}_{t-1})}] + c
$$
$$
\overset{(i)}{\ge} \mathbb{E}[- \log p_{\theta} (\mathbf{z}_0)] + c
$$
여기서 $(i)$는 두 항이 분포의 곱이기 때문에 가능하고, (ii)는 Jensen의 부등식의 결과다. 상수 $c$는 영향을 받지 않으므로 $\theta$를 최적화하는 데는 무관하다. 상수 $c$ 를 제외한 $\mathbf{KL}(q(\mathbf{z}_{0}, ... , \mathbf{z}_{T})||p_{\theta}(\mathbf{z}_{0}, ... , \mathbf{z}_{T}))$ 은 데이터 $\mathbf{z}_0$ 의 로그 가능도의 변분 하한이며, 이는 일반적으로 DDPM에 의해 최대화된다.

## 3.3. Score-Based Generative Models (SGMs)
SGMs는 DDPMs와 유사하게 이산형 diffusion 과정을 이용하지만 또다른 수학적 foundation을 사용한다. 직접적으로 분포 함수 $p(\mathbf{z})$를 사용하는 대신 Stein score 함수를 이용하는데, 이는 로그 확률 분포 $\nabla_{\mathbf{z}} \log p(\mathbf{z})$ 의 gradient이다. 수학적으로 score 함수는 밀도 함수에 대한 모든 정보를 보존하지만, 계산적으로는 다루기가 더 쉽다. 더욱이, 모델 훈련과 샘플링 절차의 분리는 샘플링 방법과 훈련 목표를 정의하는 데 더 큰 유연성을 부여한다.

#### - Forward Diffusion
$ 0 < \sigma_1 < ... < \sigma_T$ : 유한한 noise 단계 순서
에 대해 순방향 diffusion은 DDPMs와 유사하게 Gaussian noise 분포를 다음과 같이 정의한다.

$$
q(\mathbf{z}_t | \mathbf{z}_{0}) = \mathcal{N}(\mathbf{z}_t | \mathbf{z}_{0}, \sigma_t^2 \mathbf{I}),$$ 각 시간 단계 $t$에서의 gradient 근사를 위해, 학습된 predictor $s_\theta$ 를 사용하며 이는 Noise-Conditional Score Network (NCSN) 라고 한다. 이는 다음과 같다.
$$ 
s_{\theta} \approx \nabla_{\mathbf{z}} \log q(\mathbf{\mathbf{z}_t})
$$NCSN로 sampling하는 것은  $s_{\theta}(\mathbf{z}_t,t)$ 를 사용하여 반복적인 접근 방식을 통해 중간 상태 $\mathbf{z}_t$ 를 생성하는 것을 포함한다. 이 과정은 diffusion 동안 수행되는 반복과는 다르며, 오직 $\mathbf{z}_t$ 생성만을 다룬다. 
즉, $\mathbf{z}_t$ 는 반복적으로 샘플링되어야 하지만, DDPM은 zt+1로부터 직접 zt를 예측하는 것이 주요 차이점이다. 
본 논문에서는 반복 생성을 수행하는 여러 방법 중 Annealed Langevin Dynamics (ALD)을 소개한다. 초기 상태는 $\mathbf{z}_t^{(N)} \sim \mathcal{N}(\mathbf{0},\mathbf{I})$ 과  해당 시간 단계 $t$ 에서의 스텝 사이즈를 $\alpha$ > 0 에 대해 $\mathbf{z}_{t-1}^{(i)}$ 에서  $\mathbf{z}_{t-1}^{(i+1)}$ 로 얼마나 이동하는지 총 반복횟수 $N$ 번을 이용해 추정한다.  각 $0 < t \le T$ 동안 $\mathbf{z}_{t-1}^{(0)} = \mathbf{z}_t^{(N)} \approx \mathbf{z}_t$ 초기화하는데, 이는 이전 중간 상태 최신 추정치이다. $\mathbf{z}_{t-1}^{(N)} \approx \mathbf{z}_{t-1}$ 로 근사하기 위해, ALD는 $i = 0, ..., N − 1$에 대해 다음과 같은 업데이트 규칙을 사용한다.

$ Rule (1) : \epsilon^{(i)} \leftarrow \mathcal{N}(\mathbf{0},\mathbf{I}) $
$ Rule (2) : \mathbf{z}_{t-1}^{(i+1)} \leftarrow \mathbf{z}_{t-1}^{(i)} + \frac{1}{2} \alpha_{t-1} s_{\theta}(\mathbf{z}_{t-1}^{(i)}, t-1) + \sqrt{s_{t-1}} \epsilon^{(i)}$

이 규칙은 $\alpha_t \rightarrow 0$ 과 $N \rightarrow \infin$ 일 때 $\mathbf{z}_{0}^{(N)}$ 가 $q(\mathbf{z}_0)$ 로 수렴할 때까지 진행한다.

DDPMs과 유사하게 SGMs를 조건부 SGMs로 바꿀 수 있는데, 이는 저해상도 이미지와 같은 조건 $\mathbf{x}$를 추가함으로써 가능하다. 이를 수식으로 표현하면 다음과 같다.

$$
s_{\theta}(\mathbf{z}_t, \mathbf{x}, t) \approx \nabla_{\mathbf{z}_t} \log q(\mathbf{z}_t | \mathbf{x}) 
$$

#### - Optimization
역방향 diffusion 을 구체적으로 공식화하지 않고, $s_{\theta}(\mathbf{z}_t, t) \approx \nabla_{\mathbf{z}_t} \log q(\mathbf{z}_t) $ 로 근사함으로써 NCSN을 훈련시킬 수 있다. 점수 추정은 Denoising Score Matching 방법을 사용하여 수행할 수 있다.

<p align = "center"><img src = "E:\공부\Github\blog\images\SRDM Survey\SGMs_Optim.jpg" width = 500 height = 350>

여기서 $\lambda(t) >0 $ 은 가중함수, $\sigma_t$는 시간 단계 $t$마다 추가되는 noise level이다.



## 3.4. Stochastic Differential Equations (SDEs)
DDPMs와 SGMs에서는 시간 단계를 유한한 이산형으로 가정했다면, SDEs에서는 이를 무한한 연속형으로 가정해 일반화한다. 데이터가 이전과 동일하게 일반 diffusion 과정에서 교란되지만, 무한대의 nosie scale로 일반화된다.

#### - Forward Diffusion
SDEs의 순방향 Diffusion은 다음과 같다.

$$ \mathrm{d} \mathbf{z} = f(\mathbf{z},t)\mathrm{d}t + g(t)\mathrm{d}\mathbf{w}$$ 여기서 $f$와 $g$는 각각 drift와 diffusion 함수이고 $\mathbf{w}$는 Standard Wiener Process 이다. 이 일반화된 식은 DDPMs와 SGMs 모두에 대한 일정한 representation을 제공한다. DDPMs에 대한 SDE는 다음과 같다.
$$ \mathrm{d} \mathbf{z} = -\frac{1}{2} \alpha(t) \mathbf{z} \mathrm{d}t + \sqrt{\alpha(t)} \mathrm{d} \mathbf{w}, 
$$ 여기서 $T$가 무한대로 가면 $\alpha(\frac{t}{T}) = T_{\alpha_t}$ 이다.

그리고 SGMs에 대한 SDE는 다음과 같다.
$$ \mathrm{d} \mathbf{z} = \sqrt{\frac{\mathrm{d}[\sigma(t)^2]}{\mathrm{d}t}}   \mathrm{d} \mathbf{w}, 
$$ 여기서 $T$가 무한대로 가면 $\sigma(\frac{t}{T}) = \sigma_t$ 이다.
아래부터는 $q_t(\mathbf{z})$를 diffusion 과정 중 $\mathbf{z}_t$의 분포라 한다.

#### - Backward Diffusion
$Anderson$ 이 제안한 역방향 시간의 SDE는 다음과 같다. 
$$ \mathrm{d} \mathbf{z} = [f(\mathbf{z}, t) - g(t)^2 \nabla_{\mathbf{z}} \log q_{t}(\mathbf{z})] \mathrm{d}t + g(t)d\mathbf{\tilde{w}},
$$ 여기서 $\mathbf{\tilde{w}}$는 시간이 역으로 진행될 때의 Standard Wiener Process, $\mathrm{d}t$는 음의 무한소(infinitesimal) 시간 단계이다. 이 때,  방정식의 해는 점진적으로 노이즈를 데이터로 변환하는 diffusion 과정으로 볼 수 있다. 

#### - Optimization
SGMs와 유사하게 score model을 다음과 같이 정의한다.
$$
s_{\theta}(\mathbf{z}_t, t) \approx \nabla_{\mathbf{z}} \log q_t(\mathbf{z})
$$ 추가적으로 SGMs의 Optimization을 위한 score 함수를 다음과 같이 확장한다.
<p align = "center"><img src = "E:\공부\Github\blog\images\SRDM Survey\SDEs_Optim.jpg" width = 500 height = 100>

여기서 $\lambda(t)$는 0보다 큰 가중치 함수이다.

## 3.5. Relation to other Image SR Generative Models
<p align = "center"><img src = "E:\공부\Github\blog\images\SRDM Survey\figure2.jpg" width = 500 height = 500>

#### - Generative Adversarial Networks (GANs)
DMs 에서는 discriminator 를 사용하지 않지만, 가능한 현실과 비슷한 데이터를 생성할 때 반복적으로 noise를 추가하고 제거함으로써 discriminator와 비슷한 효과를 내도록하는 훈련 전략을 가지고 있다.

#### - Variational AutoEncoders (VAEs)
VAE의 핵심 목표는 데이터의 로그 가능도의 변분(variational) 하한을 설정하는 것으로, 이는 DMs의 기본 원리와 유사하다. DMs를 VAE의 변형으로 볼 수도 있는데, 고정된 VAE의 인코더 구조에서는 입력 데이터를 교란하고 디코더 구조는 DMs의 역방향 diffusion 과정과 유사하다. 하지만 VAE가 variational latent space로 입력값의 차원을 축소시키는 반면, DMs는 차원을 유지한 채로 과정을 진행한다.

#### - AutoRegressive Models (ARMs)
ARMs는 이미지를 픽셀 시퀀스로 간주하며, 순차적으로 이전에 생성된 픽셀의 값에 기반해 각 픽셀을 생성한다. 그리고 전체 이미지의 확률은 각 개별 픽셀의 조건부 확률 분포의 곱으로 주어진다. 이러한 과정으로 인해 고해상도 이미지 생성에 있어 ARMs의 계산량은 상당히 많아진다. 반면에 DMs는 초기 데이터 샘플에 noise를 점진적으로 확산하고 과정을 역으로 돌리며 데이터를 생성한다. 이 때, noise는 순차적이기보다 이미지 전체로 동시에 확산된다.

#### - Normalizing Flows (NF)
NF는 VAEs와 DMs와 마찬가지로 데이터의 로그 가능도를 기반으로 최적화를 진행한다. 그러나 NFs 만의 차별점은 Jacobian Determinant를 이용해 가역적이고 매개변수화된 변환을 학습한다는 것이다. 이를 이용한 계산량은 상당하다. 

# 4. Diffusion Models for Image Super-Resolution
## 4.1. Concrete Realization of Diffusion Models
SR에서는 주로 DDPMs를 사용한다. 왜냐하면 DDPMs가 더욱 직관적인 접근이고 진입장벽이 낮기 때문이다. 그리고 SGM은 맞춤형 해답을 만드는 유연성이 있지만 고려해야할 다양한 설계 변수들로 인해 구조가 복잡해진다. 

#### - SR3 
DDPMs와 유사하게, $\mathbf{z}_{T} \approx \mathcal{N}(\mathbf{0}, \mathbf{I})$ 이 될 때까지 저해상도 이미지에 Gaussian noise를 넣고 정제 단계 $T$ 번 동안 목표인 고해상도 이미지 $\mathbf{z}_0$ 을 반복적으로 생성한다. 여기서 noise $\epsilon_{t}$ 를 예측하기 위한 denoising model $\varphi_{\theta}(\mathbf{x}, \mathbf{z}_t, \gamma_t) $ 을 추가하는데, 여기서 입력값들 $\mathbf{x}$는 저해상도 이미지, noise의 분산 $\gamma_t$, 그리고 $\mathbf{z}_t$ 는 nosiy target 이미지다. $\varphi_{\theta}$ 를 이용한 $\epsilon_t$ 예측으로 다음과 같이 근사할 수 있다.
$$
\mathbf{z}_t = \sqrt{\gamma_t} \cdot \mathbf{\hat{z}}_0 + \sqrt{1-\gamma_t} \cdot \varphi_{\theta}(\mathbf{x}, \mathbf{z}_t, \gamma_t)
$$
$$
\Longleftrightarrow \mathbf{\hat{z}}_0 = \frac{1}{\sqrt{\gamma_t}} \cdot (\mathbf{z}_t - \sqrt{1-\gamma_t} \cdot \varphi_{\theta}(\mathbf{x}, \mathbf{z}_t, \gamma_t))
$$ 
$\mathbf{z}_0$ 을 사후분포에 대입해 $p_{\theta}(\mathbf{z}_{t-1} | \mathbf{z}_{t})$ 의 평균을 매개변수화하면 다음과 같은 결과를 얻을 수 있다.
$$
\mu_{\theta}(\mathbf{x}, \mathbf{z}_t, \gamma_t) = \frac{1}{\sqrt{\alpha_t}} [\mathbf{z}_t - \frac{1-\alpha_t}{\sqrt{1-\gamma_t}} \cdot \varphi_{\theta}(\mathbf{x}, \mathbf{z}_t, \gamma_t)]
$$ SR3에서 저자는 편의성을 위해 분산 $ \Sigma_{\theta}$ 를 $(1-\alpha_t) $ 로 단순화하였다. 결과적으로 $ \epsilon \sim \mathcal{N}(\mathbf{0}, \mathbf{I}) $ 를 이용한 각 정제 단계는 다음과 같이 표현할 수 있다.
$$
\mathbf{z}_{t-1} = \frac{1}{\sqrt{\alpha_t}}[\mathbf{z}_t - \frac{1-\alpha_t}{\sqrt{1-\gamma_t}} \cdot \varphi_{\theta}(\mathbf{x}, \mathbf{z}_t, \gamma_t)] + \sqrt{1-\alpha_t} \cdot \epsilon_t
$$
대부분의 논문들이 denoise 모델 $\varphi_{\theta}(\mathbf{x}, \mathbf{z}_t, \gamma_t)$ 을 변형한 모델을 사용한다. 한 예시로는 SRDiff가 있는데, 이는 저해상도 이미지와 고해상도 이미지 간의 잔여 정보, 즉 차이를 예측한다. 

## 4.2. Guidance in Training
diffusion에 기초한 SR의 backbone은 조건부 분포의 학습이다. 조건 $\mathbf{x}$는 DDPMs의 경우 $p_{\theta}(\mathbf{z}_{t-1} | \mathbf{z}_t, \mathbf{x})$, SGMs와 SDEs의 경우 $s_{\theta}(\mathbf{z}_t, \mathbf{x}, t)$ 에 통합되어 역방향 diffusion 과정에 적용된다. 하지만 이러한 간단한 공식화는 조건부 정보를 무시하는 무시하는 모델이 될 수도 있다. 이러한 문제들을 방지하기 위해 'guidance' 라는 원칙을 이용하는데, 이는 샘플의 다양성을 감소시키는 대신 조건부 정보의 가중치를 조절하는 것이다. 

#### Classifier Guidance
Claasifier Guidance 는 샘플링동안 분류기의 gradient와 DM의 score estimate를 합침으로써 diffusion 과정을 안내하는 데에 이용한다. 이는 mode converage와 샘플 충실도 간 균형을 촉진한다. 분류기는 정보 $\mathbf{z}_t$ 로부터 $\mathbf{x}$ 을 예측하기 위해 DM과 동시에 훈련된다. 조건 정보의 가중치가 주어졌을 때, score function은 다음과 같다.
$$
\nabla_{\mathbf{z}_t} \log q(\mathbf{z}_t | \mathbf{x}) = \nabla_{\mathbf{z}_t} \log q(\mathbf{z}_t) + \lambda \nabla_{\mathbf{z}_t} \log q(\mathbf{x} | \mathbf{z}_t)
$$ 여기서 $\lambda \in \mathbb{R}^{+}$ 는 가중치를 조절하는 hyper parameter 다. 
이 접근법의 단점은 임의의 noise가 존재하는 입력값을 처리가능한 학습된 분류기에 의존한다는 것인데, 이는 대부분의 pre-trained 이미지 분류 모델이 갖추지 못한 능력이다.

#### Classifier-Free Guaidance
Classifier-Free Guaidance는 분류기를 사용하지않고 유사한 결과를 내는 것을 목표로 한다. score function은 Classifier Guidance의 것을 변형하여 사용하고 다음과 같다.
$$
\nabla_{\mathbf{z}_t} \log q(\mathbf{z}_t | \mathbf{x}) = (1-\lambda) \nabla_{\mathbf{z}_t} + \lambda \nabla_{\mathbf{z}_t} \log q(\mathbf{x} | \mathbf{z}_t)
$$ 
$\lambda > 1$ 인 경우를 보면, DM은 조건부 정보를 우선시하여 무조건부 score function 으로 부터 벗어나 조건부 정보를 무시하는 샘플들을 생성할 가능성을 줄인다. 하지만 이러한 접근법의 주요 단점은 분리된 DM 2개를 학습하는데 많은 cost가 발생한다는 것이다. 이는 단일 조건부 모델을 학습하고 무조건부 score function에서 조건부 정보를 null 값으로 대치하는 방법으로 완화할 수 있다.

## 4.3. State Domains 
<p align = "center"><img src = "E:\공부\Github\blog\images\SRDM Survey\figure4.jpg" width = 500 height = 250>

#### Latent space
1. Score-Based Generative Models(LSGM)
VAE의 latent space에서 작동하는 일반적인 SGM이며, 연산량을 줄이기위해 autoencoder의 latent space로 diffusion 과정을 이동시킨다. VAE를 사전훈련함으로써 더 빠른 샘플링 속도를 보이며 픽셀 도메인에서 작동하는 DM과 비슷하거나 더 나은 결과를 보인다.

2. Latent Diffusion Models (LDMs)
저차원의 autoencoder latent space에서 diffusion을 수행하는 모델이다. 사전 훈련된 DDPMs과 Autoencoder를 사용하며, denoising 신경망과 함께 훈련되지는 않는다. 이는 성능 저하 없이 연산량을 크게 낮춘다. 이러한 훈련방법으로 잠재공간에 대한 규제가 거의 없으며 다양한 모델에서 잠재 표현의 재사용을 가능케한다.

3. image REstoration with difFUSION models(REFUSION)
LDMs의 개선버전으로 encoder 에서 decoder 에 이르는 skip connection 을 포함하는 U-Net 을 사용해 decoder 부분에 더 많은 정보를 제공한다. 비선형 활성화를 요소별 작업으로 대체하는 Nonlinear Activation-Free Block(NAFBlock) 을 도입해 두 부분으로 feature channel을 분리하고 그것들을 곱하여 하나의 출력을 생성한다. 그리고 인코딩된 저해상도 이미지나 고해상도 이미지에 대해 잠재 표현을 부분적으로 대체해 재구성 작업을 수행하도록 U-Net을 학습한다.

4. Hierarchical Integration Diffusion Model(HI-Diff)
첫 번째 단계에서는 인코더가 ground truth image를 매우 compact한 잠재 공간 표현으로 압축하는데, 이는 LDM보다 더 압축 비율이 높다. 그래서 다양한 scale의 잠재 표현을 세밀하게 다듬는 DM의 계산 부담이 크게 줄어든다. 두 번째 단계는 vision-transformer를 기초로한 autoencoder로, 이는 cross-attention fusion module 인 Hierarchical Integration Modules (HIM) 을 통해 downsampling 동안 첫 번째 단계의 잠재 표현을 통합한다.

#### Frequency space
1. Wavelets
공간 domain 에서 wavelet domain 으로의 변환은 손실없이 이루어지며 이미지의 공간적 크기가 4가지 요인에 의해 작아질 수 있기 때문에 여러 이점들이 있다. 따라서 학습과 추론 단계에서 더 빠르게 diffusion이 이루어진다. 또한, 이 변환은 고주파 details을 개별 채널로 분리해 고주파 정보를 더욱 구체적으로 이용할 수 있고 더 잘 제어할 수 있다. 게다가 기존의 DM에 plug-in 기능으로 간편하게 통합이 가능하다.

2. DiWa
diffusion 과정은 모든 wavelet bands 와 직접적으로 상호작용하거나 특정 band를 목표로 나머지 band를 표준 CNN으로 예측할 수 있다. 

#### Residual space
1. SRDiff
SRDiff 는 생성과정을 잔차 공간, 즉 upsample 된 저해상도 이미지와 고해상도 이미지 간의 차이로으로 이동하려 시도한 첫 논문이다. 이를 이용해 DM은 잔차에 대한 세부사항에 집중하고 수렴속도가 증가하며 학습과정을 안정화할 수 있다는 장점이 생긴다. 
Whang $et$ $al.$ 도 이미지의 blur를 제거하기 위해 predict-and-refine 접근법을 이용해 기초적인 요소로써 잔차 예측을 사용한다. 그러나 SRDiff와 달리 CNN을 사용해 SR을 예측하며, 이 예측값과 고해상도 값 사이의 잔차를 DM으로 예측한다.

2. ResDiff
ResDiff는 위 방법과 더불어 역방향 diffusion 에서 SR 예측과 고주파 정보를 통합한다. 

3. ResShift
고해상도 이미지와 저해상도 이미지 간의 잔차를 조정해 변환에 대한 Markov Chain 을 구성한다. 순방향 diffusion에서 단순히 Gaussian noise를 추가하는 것 대신에, 잔차는 학습동안 noise sampling 의 평균으로 추가된다. 이를 통해 샘플링의 효율성을 크게 향상해 샘플링 단계를 고작 15개까지로 감소할 수 있다.


## 4.4. Conditioning Diffusion Models
#### - Low Resolution Reference
직관적인 channel 통합으로 고품질의 SR 예측을 수행할 수 있다. 저해상도 이미지가 $t-1$ 번째부터 denoised 결과와 합쳐져 $t$ 번째에서 noise 예측을 위한 조건부 정보의 입력값의 역할을 한다. 

1. Iterative Latent Variable Refinement (ILVR)
반면에 ILVR 에서는 조건없는 LDM (unconditional LDM) 의 생성 과정에 조건을 부여한다. 이는 사전 훈련된 DM 을 활용해 훈련 시간을 더 짧게 한다. 조건 정보를 통합하기 위해, 노이즈가 제거된 출력의 저주파 구성 요소는 저해상도 이미지의 해당하는 부분으로 대체된다. 이를 통해 잠재변수는 생성 과정의 각 단계에서 제공된 참조 이미지와 정렬되어, 사용자가 원하는 것에 맞춰 더 정확한 생성을 보장한다. 

####  - Super-Resolved Reference
1. CDPMSR
저해상도 이미지의 noise를 제거하는 조건을 대한 대안으로 사전 학습된 SR 모델로부터 사전분포를 학습해 참조 이미지를 예측하는 방법이 있다. CDPMSR은 기존 standard SR 모델을 사용해 얻어진 예측된 SR 참조 이미지로 noise 제거 과정에 조건을 부여한다.

2. $Pandey$ $et$ $al.$
<p align = "center"><img src = "E:\공부\Github\blog\images\SRDM Survey\figure5.jpg" width = 500 height = 250>

본 논문에서는 DiffuseVAE를 사용해 예측된 조건을 변화시키는 아이디어를 도입했다. 이는 확률적 예측을 생성하는 VAE가 DM의 조건 정보로 통합되어 두 모델의 이점을 모두 활용할 수 있다. 'generator-refiner framework' 라고 불리는 두 단계 접근법을 사용한다. 첫 번째에서는 훈련 데이터에 대해 학습하고, 두 번째 단계에서 DM 이 VAE 에 의해 생성된 다양하고 흐릿한 재구성을 사용해 조건화된다. 이 방법의 핵심은 VAE 의 저차원 잠재 공간 내에서 생성된 샘플들이 다양하다는 것이다. 즉, 샘플링 속도와 다양성에 강점이 있다. 


#### Feature Reference
1. SRDiff
조건 정보에 대한 또다른 이점은 사전 학습된 신경망으로부터 관련있는 feature들을 추출할 수 있다는 것이다. SRDiff는 사전 훈련된 encoder를 이용해 역방향 diffusion 의 각 단계에서 저해상도 이미지의 feature를 encoding 한다. 이 feature들은 guidance 역할을 하며, 고해상도 출력을 생성하는데 도움을 준다.

2. Impicit DMs (IDMs)
IDMs는 다른 접근법을 이용하는데, neural representation으로 noise 제거 신경망을 조건화한다. 이는 다양한 scale에서 연속적인 표현을 가능하도록 한다.

## 4.5. Corruption Space
DM 에는 3가지 핵심 기술이 있는데, 이는 noise schedule, 신경망 parameterization, sampling algorithm이다. 최근에는 순방향 diffusion 동안 순수한 Gaussian noise를 사용하는 것 대신에 다른 종류의 corruption space 사용을 주장한다. 

1. Soft Score Mathcing (SSM)
SSM은 필터링 과정을 SGM에 직접 통합해, 모델이 깨끗한 이미지를 예측하도록 훈련하는 방법이다. 이미지가 손상되었을 때, 이 예측된 이미지가 관찰값과 일치하도록 한다. 

2. Cold Diffusion
Cold Diffusion은 DDPMs의 손상 공간을 조정하는 방법을 제안한다. 이는 이미지 생성 능력이 이미지 degradation 에 강하게 의존하지 않는데, Gaussian noise 이외에도 animorphosis와 같은 여러 최신 diffusion에도 적용가능하다.

3. Image-to-Image Schrödinger Bridge (I2ISB)
<p align = "center"><img src = "E:\공부\Github\blog\images\SRDM Survey\figure6.jpg" width = 600 height = 350>

I2ISB는 위 방법들과 비슷하지만 사전분포에 대해 어떠한 가정도 하지 않는다. diffusion 과정에서 깨끗한 이미지는 최초의 상태를 유지하지만 화질이 낮아진 이미지는 순방향과 역방향 모두에서 마지막 상태를 유지한다. 이 접근법은 저화질의 이미지가 깨끗하게 유지되어 원본 이미지로의 추적이 용이하다는 장점이 있다. 또한 더 적은 단계를 거치기 때문에 효율성이 높다는 장점도 있다. 하지만 훈련 시 pair인 data에만 특정되어, 비지도 학습 기반의 SR에 적합하지않다. 

4. Inversion by Direct Iteration (InDI)
InDI는 직접적인 mapping을 통해 두 품질 공간 사이의 간극을 효율적으로 연결한다. 이와 같은 내재된 유연성과 직접 mapping 능력은 이미지의 품질을 향상시킨다. 

## 4.6. Color Shifting
<p align = "center"><img src = "E:\공부\Github\blog\images\SRDM Survey\figure7.jpg" width = 400 height = 225>

제한된 hardware로 작은 batch size나 짧은 학습 시간으로 학습을 진행할 때, 높은 계산량으로 인해 DM은 color shifting 현상이 발생한다. StableSR에서 color normalization을 이용한 직접적인 변형으로 이를 해결할 수 있다고 한다. 수학적인 표현은 다음과 같다.

$$
\mathbf{\hat{z}}_0 = \frac{\mathbf{z}_0 - \mu_{\mathbf{z}_0}^{c}}{\sigma_{\mathbf{z}_0}^{c}} \cdot \sigma_{\mathbf{x}}^{c} + \mu_{\mathbf{x}}^{c}, 
$$ 여기서 $c \in \{ r, g, b\}$ 는 color channel, $\sigma_{\mathbf{z}_0}^{c}$ 과 $ \mu_{\mathbf{z}_0}^{c}$ ($\sigma_{\mathbf{x}}^{c}$ 과 $\mu_{\mathbf{x}}^{c}$) 은 각각 예측 이미지 $\mathbf{z}_0$ 의 $c$번째 channel(또는 입력 이미지 $\mathbf{x}$)의 이미지와 분산이다. 


# 5. Diffusion-based Zero-shot SR
Zero-shot image SR은 사전 이미지에 대한 예시나 학습에 의존하지 않는 방법을 개발하는 것을 목표로 한다. 이 방법들은 단일 이미지 내에 내재된 중복성을 활용해 개선한다. 주로 사전 훈련된 DM을 사용해 이미지를 생성하며 샘플링 과정에서 저해상도 이미지를 조건으로 통합한다. 

## 5.1. Projection-Based
이 방법은 저해상도 이미지에서 내재된 구조나 texture를 추출해 각 단계에서 생성된 이미지를 보완하고 데이터 일관성을 보장하는 것을 목표로 한다. 

1. RePaint 
RePaint에서 diffusion 과정은 inpainting이 필요한 특정 부분에만 선택적으로 적용되고, 나머지 부분은 적용되지 않는다. 

2. You Only Diffuse Areas (YODA)
YODA는 RePaint와 유사한 아이디어를 SR에 적용하지만 이는 zero-shot은 아니다. YODA는 DINO에서 파생된 importance mask를 이용해 각 시간 단계동안 diffusion이 일어날 영역을 지정한다.

3. ILVR
ILVR은 저해상도 이미지에서 저주파수 정보를 고해상도 이미지로 투영해 데이터의 일관성을 보장하고 향상된 DM 조건을 설정한다. Come-Closer-Diffuse-Faster (CCDF) 에서는 SR에 대한 일관화된 투영방법을 다음과 같이 표현한다.
$$
\mathbf{\hat{z}}_{t-1} = f(\mathbf{z}_t, t) + g(\mathbf{z}_t, t) \cdot \varepsilon_t
$$
$$
\mathbf{\hat{z}}_{t-1} = (\mathbf{I} - \mathbf{P}) \cdot \mathbf{\hat{z}}_{t-1} + \mathbf{\hat{x}}, \quad \mathbf{\hat{x}} \sim q(\mathbf{z}_t | \mathbf{z}_0 = \mathbf{x})
$$ 여기서 $f,g$는 DMs의 종류에 따라 달라지고, $\mathbf{P}$는 저해상도 이미지에 대한 degradation, $\mathbf{\hat{x}}$ 은 시간과 관련된 noise에 대한 저해상도 이미지다. 

## 5.2. Decomposition-Based
분해 기반 방법은 SR을 선형결합(linear image reverse(IR) problem)으로 바라본다. 이에 대한 식은 다음과 같다.
$$
\mathbf{x} = \mathbf{Ay} + b 
$$ 여기서 $A$ 는 degradation operator, $b$ 는 contiminating noise 이다.

1. SNIPS & DDRM
SINPS와 DDRM에서는 SR의 결과를 더 좋게 만들기 위해 spectral domain에 diffusion 과정을 적용한다. 이 과정에서 $\mathbf{A}$ 에 SVD(singualr value decomposition)을 적용함으로써 향상된 결과를 얻게 된다.

2. Denosing Diffusion Null-space Model (DDNM)
<p align = "center"><img src = "E:\공부\Github\blog\images\SRDM Survey\figure8.jpg" width = 600 height = 175>

DDNM은 위 식(LIR problem)에 대한 또다른 접근 방법을 보인다. range-null space decompostion을 이용해 zero-shot 을 진행한다. 기존 image IR problem을 변형해, noise가 없는 공간에서는 다음과 같이 표현할 수 있다.
$$
\mathbf{x} = \mathbf{Ay}
$$ 여기서 $\mathbf{y} \in \mathbb{R}^{D \times 1}$ 은 선형화된 고해상도 이미지, $\mathbf{x} \in \mathbb{R}^{d \times 1}$ 는 션형화된 화질이 감소한 이미지이다.
여기에 두 제약조건을 제시하는데, 이는 다음과 같다.
$$
Consistency : \mathbf{A \hat{y}} \equiv \mathbf{x}, \quad \quad Realnes : \mathbf{\hat{y}} \sim p(\mathbf{y})
$$ 여기서 $p(\mathbf{y})$ 는 ground-truth 이미지의 분포이고 $\mathbf{\hat{y}}$ 는 예측한 이미지이다. 

range-null space decompostion 에서 $\mathbf{\hat{y}}$ 의 알반 해는 다음과 같이 표현할 수 있다.
$$
\mathbf{\hat{y}} = \mathbf{A^{\dagger}x} + (\mathbf{I - A^{\dagger}A}\mathbf{\bar{y}}),
$$ 여기서 $\mathbf{A^{\dagger}} \in \mathbb{R}^{D \times d}$는 $\mathbf{AA^{\dagger}A} \equiv \mathbf{A}$ 를 만족하는 pseudo-inverse 이다. (Moore&Penrose Generailized Inverse 참고)
목표는 null-space $(\mathbf{I-A^{\dagger}A})\mathbf{\bar{y}}$ 를 생성하는 적절한 $\mathbf{\bar{y}}$ 를 찾아 위 식의 $Realness$를 만족하는 range-space  $\mathbf{A^{\dagger}x}$ 를 구성하는 것이다. 깔끔한 중간 상태 $\mathbf{z}_{0|t}$를 유도하기 위해 시간단계 $t$ 에 대해 $\mathbf{z}_0$ 으로부터의 rang-null space decompostion을 수행하는데, 이는 다음과 같이 식을 정의한다.
$$
\mathbf{z}_{0|t} = \frac{1}{\sqrt{\bar{\alpha}_t}} (\mathbf{z}_t - \epsilon_\theta(\mathbf{z}_t, t) \sqrt{1-\bar{\alpha}_t})
$$ 여기서 $\epsilon_t = \epsilon_{\theta}(\mathbf{z}_t,t)$ 이다.
이 때, $\mathbf{Az_0} \equiv \mathbf{x}$ 를 만족하는 $\mathbf{z}_0$ 를 생성하기 위해, range-space를 $\mathbf{A^{\dagger}y}$ 로 두고 null-space는 바꾸지않는다. 이를 이용해 rectified esimator인 $\mathbf{\hat{z}}_{0|t}$ 를 생성하는데, 이는 다음과 같다.
$$
\mathbf{\hat{z}}_{0|t} = \mathbf{A^{\dagger}x} + (\mathbf{I - A^{\dagger}A}) \mathbf{z}_{0|t} $$
마지막으로 $\mathbf{z}_{t-1}$ 을 $p(\mathbf{z}_{t-1} | \mathbf{z}_{t}, \mathbf{\hat{z}}_{0|t})$ 에서 sampling 함으로써 유도한다.
$$
\mathbf{z}_{t-1} = \frac{\sqrt{\bar{\alpha}_{t-1}} \beta_t}{1-\bar{\alpha}_t} \mathbf{\hat{z}}_{0|t} + \frac{\sqrt{\alpha_t}(1-\bar{\alpha}_{t-1})}{1-\bar{\alpha}_{t-1}} \mathbf{z}_t + \sigma_t \mathbf{\epsilon} , \quad \mathbf{\epsilon} \sim \mathcal{N}(0, \mathbf{I})
$$ 여기서 $\alpha_t = 1- \beta_t, \bar{\alpha}_t = \prod_{i=0}^{t}\alpha_i$ 이다.
$\mathbf{z}_{t-1}$ 은 $\mathbf{\hat{z}}_{0|t}$ 의 noise가 추가된 버전이다. 이 노이즈는 range-space 와 null-space 간 불일치를 효과적으로 완화한다. 

마지막으로 $\mathbf{A}$ 와 $\mathbf{A^{\dagger}}$ 를 정의하는 것에 따라 수행할 복원 작업이 달라진다. 

## 5.3. Posterior Estimation
데이터의 일관성을 강화하기 위해 사후분포 추정을 도입한다. 이 Bayesian 접근방법은 inverse linear problem 을 해결하는데 있어 더 robust하고 확률적인 framework를 제공한다. 그리고 이를 다양한 image 처리분야에 도입해 더 좋은 결과를 얻을 수 있다. score 함수는 다음과 같다.
$$
\nabla_{\mathbf{z}_t} \log p_t (\mathbf{z}_t | \mathbf{x}) = \nabla_{\mathbf{z}_t} \log p_t (\mathbf{x} | \mathbf{z}_t) + s_{\theta}(\mathbf{x}, t), 
$$ 여기서 $s_{\theta}(\mathbf{x}, t)$ 는 사전훈련된 모델에서 추출 가능하지만 반면에 $p_t(\mathbf{x} | \mathbf{z}_t)$ 는 다루기 어렵다. 그래서 이에 대한 목표는 $p_t(\mathbf{x} | \mathbf{z}_t)$ 를 정확하게 추정하는 것이다.


#### - DPS
DPS에서는 $p_t(\mathbf{x} | \mathbf{\hat{z}}_0 (\mathbf{z}_t)) \; with \; \mathbf{\hat{z}}_0 (\mathbf{z}_t) = \mathbb{E}(\mathbf{z}_0 | \mathbf{z}_t)$ 를 이용해 $p_t(\mathbf{x} | \mathbf{z}_t)$를 추정한다. 이는 다음과 같이 표현할 수 있다. 
$$
\nabla_{\mathbf{z}_t} \log p_t (\mathbf{z}_t | \mathbf{x}) \approx \nabla_{\mathbf{z}_t} \log p (\mathbf{x} | \mathbf{\hat{z}}_0 (\mathbf{z}_t)) \approx - \frac{1}{\sigma^2} \nabla_{\mathbf{z}_t} \parallel \mathbf{x} - H(\mathbf{\hat{z}}_0 (\mathbf{z}_t)) \parallel_2^2,
$$ 여기서 $H$ 는 순방향 measurement 연산자이다.

#### - GDP
$p_t(\mathbf{x} | \mathbf{z}_t)$ 의 조건부 확률이 더 높을수록 degradation 모델인 $\mathcal{D}(\mathbf{z}_t)$ 를 $\mathbf{x}$ 에 적용한 결과와의 거리가 감소하는 것에 집중한다. 이에 대한 heuristic 근사를 다음과 같이 제안한다.
$$
p_t{\mathbf{x} | \mathbf{z}_t} \approx \frac{1}{Z} \exp (-[s \mathcal{L}(\mathcal{D}(\mathbf{z}_t), \mathbf{x})]) + \lambda \mathcal{Q}(\mathbf{z}_t),
$$ 여기서 $\mathcal{L}$ 은 거리 metric, $\mathcal{Q}$은 quality metric, $Z$ 는 정규분포, $s$ 는 gudiance 가중치를 조절하기 위한 scaling factor 이다.


