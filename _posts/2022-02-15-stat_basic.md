---
title: 통계학의 기초
tags:
- law of large numbers
- central limit theorem
- unbiased
- consistent
- efficient
- standard error
categories:
- Statistics
date: 2022-02-17 10:00:01
---

## 통계학 빌딩블락

- 삼위일체 : 평균 * 분산 * 공분산 = 기대값
- 두 기둥
  - 대수의 법칙(Law of Large Numbers)
  - 중심극한정리(Central Limit Theorem)

## 통계자료의 유형 구분
  
크게 횡단면, 종단(패널), 시계열 자료로 구분 가능

- 횡단면 Cross Sectional 자료  
    - 개체당 한 시점의 자료로 구성  
    - 또는 여러 시점의 자료라고 해도 동일 개체 구분 불능  
- 시계열 Time Series 자료  
    - 한 개체의 여러 시점 자료로 구성  
    - 벡터 시계열: 여러 개체를 벡터로 묶어 시계열 자료 구성  
- 종단 Longitudinal 자료  
    - 패널 panel 자료로도 불리움  
    - 개체당 여러 시점의 자료로 구성  
    - 핵심은 여러 시점에 걸쳐 동일 개체 구분 가능 

    
## 자료(정보) = 신호 + 잡음

- 신호 signal 필요한 정보
- 잡음 noise 불필요한 정보 

자료로부터 잡음을 제거하고 신호를 증폭  
* 자료의 요약: 정보의 차원을 축소
  - 예: 대푯값: 평균, 분산, 중간값, 최대값, 최소값 등
* 관계의 요약: 공분산, 상관계수, 회귀분석 등


## 기대값 Expectation : 확률가중평균
    
평균 mean = $E[X] = \mu$

편차 deviation = $X - \mu$

분산 variance = 편차 제곱의 기대값 

- $Var(X) = E[(X - \mu)^2] = E[X^2] - \mu^2 = \sigma^2$

- 표준편차 = 분산의 제곱근 = $\sigma$

공분산 Covariance = 두 확률변수 편차의 곱의 기대값

- $Cov(X,Y) = E[(X - \mu_{x})(Y - \mu_{y})] = \sigma_{xy}$
- $Cov(X,X) = Var(X) = \sigma^2$

## 추정 estimation
    
추정량(estimator): 방법(공식): 확률변수

- 추정치(estimate)는 추정량이 실현된 하나의 값

- 예 : 표본평균

    -  $X_i \sim iid(\mu, \sigma^2) \quad \Rightarrow  \quad  \hat\mu$ 
$: \bar{\mathbf{X}}\_n = \sum_{i=1}^{n}\frac{X_i}{n} $ 

    - $E[\bar{\mathbf{X}}\_n] = \mu$

    - $Var[\bar{\mathbf{X}}\_n] = \frac{\sigma^2}{n}$ : 대수의 법칙    
    

모평균 추정량으로 표본평균이 좋음 vs 중간값 $\mathbf{X}_{med}$

- 둘 다 평균적으로 모평균 $\mu$ 근처의 값으로 추정
- 그러나 여러 편리한 성질로 인해 표본평균 선호
 
 
### 추정량에 요구되는 기본 성질

#### 1. 비편향성 : unbiased : $E[\bar{\mathbf{X}}]=\mu$

  - 평균적으로 맞다

#### 2. 일치성 : consistent : $\lim_{n\to\infty}E[\bar{\mathbf{X}}]=\mu$

  - 비일치 추정량은 표본의 수가 많아져도 개선 효과 없음
 
#### 3. 효율성 : efficient : $Var[\bar{\mathbf{X}}]$ 분산이 작다    

  - 추정의 오차/변동성이 낮다 : 자주 크게 틀리지는 않는다


### 검정(test) 위해 오차의 추정 필요 : $\quad Var[\bar{\mathbf{X}}] = \frac{\;\sigma^2}{n}$
  
  
모평균뿐만 아니라 모분산도 모르므로 추정 필요

- 가정 : $X_i \sim$ 정규분포 또는 $n$ 충분히 큼 : 중심극한정리

  $\quad \sigma^2 \quad \Rightarrow \quad \hat\sigma^2 : S^2 = \frac{1}{n-1}\sum_{i=1}^{n}(X_i - \bar{\mathbf{X}})^2$

추정량/검정량은 주어진 정보(표본 등)만으로 측정 가능해야 함

- 예 : $H_0 : \mu=m$ 검정

$ \quad \quad \cfrac{\bar{\mathbf{X}}-m}{\frac{\sigma}{\sqrt{n}}} \sim N(0,1) $  

$ \quad \quad \frac{(n-1) S^2}{\sigma^2} \sim \chi^2_{n-1} $  

$ \quad \quad \cfrac{\bar{\mathbf{X}}-m}{\frac{S}{\sqrt{n}}} \sim t_{n-1} $  

Note : $Z, Z_i \sim iiN(0,1)$

$\quad \quad Z \sim N(0,1)$  

$\quad \quad \sum_{i=1}^q Z_i^2 \sim \chi^2_q$  

$\quad \quad \frac{Z}{\sqrt{\frac{\chi^2(q)}{q}}} \sim t_q$   
