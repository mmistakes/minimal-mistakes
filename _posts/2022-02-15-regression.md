---
title: 회귀분석의 기초
categories: 
- Statistics
tags:
- Regression
- OLS
- GLS
- FGLS
- endogeneity
date: 2022-02-17 10:00:02
---

## 회귀식 Regression Equation

$\quad y_i = X_i \beta + \epsilon_i \quad : \quad \epsilon \sim (0, \Omega) $  
  
**기호의 설명**

|    | 명칭                | 의미                    |확률 |관측|
|:---|:--------------------|:----------------------- |:----|:---|
|$X$ | 독립변수 independent| 설명 explaining         |  ?  | yes|
|$y$ | 종속변수 dependent  | 피설명 explained        | yes | yes|
|$\epsilon$| 오차항 error  | 충격/교란 disturbance   | yes | no |
|$\beta$| 계수 coefficient | 기울기/민감도 sensitivity| no | no |
|$\Omega$| 공분산행렬      | 추정의 어려움의 근원     | no | no |
|$i$ | 관측치 observation  | 표본 sample              |    |    |

 
## 회귀식의 직관적 의미
  
- $\quad y_i = \alpha + \beta x_i + \epsilon_i$  

  - Cross Sectional : 아버지 키($x$)가 아들 키($y$)에 미치는 영향
    - 평균으로의 회귀(regression to the mean)
    - 오차항 : 어머니 키나 영양 등 통제하지 못한 요인들 포함
      - 중심극한정리 : 충분히 많은 요인들을 합치면 정규분포 성질
      - 단, 특정 요인의 영향(변동성)이 다른 요인들을 압도하면 곤란
      - 따라서 주요 요인들을 통제하는 것이 필요함

- $\quad R_{it} = \alpha_i + \beta_i R_{mt} + \epsilon_{it}$

  - Time Series: 시장수익률($x$)이 개별수익률($y$)에 미치는 영향
    - 종목 고정: Given $i$
    - 알파수익: 종목선정 
    - 베타수익: 위험선택: High Risk High Return
    - 오차항: 예상치 못한 **개별적** 충격: 분산투자 필요

## 회귀식의 추정

관측 표본으로부터 비관측 계수와 오차항 정보를 추정

$\quad (x,y : \alpha, \beta, \epsilon) \quad \Rightarrow \quad (\hat\alpha, \hat\beta, \hat\epsilon)$  

OLS : ordinary least square : 오차제곱합 최소화

- 오차항 *iid* : 등분산 구조 가정 : $\quad \Omega = \sigma^2 I$  
  
  $\hat\beta_{OLS} = (X'X)^{-1}X'y$

  - $X'X$ : 확률변수 $X$의 분산 개념  
  - $X'y$ : 확률변수 $X$와 $y$의 공분산 개념  
  - $X$ 변화 대응하는 $y$ 변화 : 확률적 기울기(민감도) 개념 


## GLS generalized least square

만약 $\quad \Omega = \sigma^2 I \quad$ 아니라고 해도 

- $E[X \epsilon \,] = 0 \quad$ : 비상관이면: $\quad \hat\beta_{OLS}$ >> 일치추정량 
- 그러나 효율적 추정 위해 $\Omega$ 구조 고려해야

  $\hat\beta_{GLS} = (X'\Omega^{-1}X)^{-1}X'\Omega^{-1}y$

- 분산 큰 관측치는 신뢰성 낮으므로 낮은 가중치 부여
- 대표적 예로 자기상관 없이 이분산만 존재하는 경우
  - WLS: weighted least square: 분산역수 가중치 사용
    - 자기상관 없으므로 모든 공분산은 0

만약 $\quad \Omega = \sigma^2 I \quad$ 이면 $\quad \hat\beta_{GLS} = \hat\beta_{OLS} \quad$ 


## FGLS feasible GLS

일반적으로 $\Omega$ 구조 모른다 >> **infeasible GLS**

- **FGLS** : 먼저 $\Omega$ 구조를 추정하여 **GLS**
  
- 대표적 예: WLS: OLS 잔차로 $\hat\Omega$ 추정하여 GLS
  
    $\hat\beta_{FGLS} = (X'\hat\Omega^{-1}X)^{-1}X'\hat\Omega^{-1}y$

주의 : 복잡한 추정 과정에서 추정량의 비편향성 보장 못함

- 그러나 일치성 보장됨 : 효율성과 비편향성을 절충해 고려



## 바른 검정을 위해 분산 $\Omega$ 구조 고려 필요

$\Omega = \sigma^2 I \quad$ 이라면 $\quad Var[\,\hat\beta_{OLS}\,] = \sigma^2(X'X)^{-1}$ 

- $H_0 : \beta = b \quad$ 검정통계량은 $\quad \frac{\hat\beta-b}{sd(\hat\beta)} \sim N(0,1)$ 
  - $sd(\hat\beta)$ 는 미지의 모수 $\sigma$ 를 포함 $\Rightarrow$ Z-검정 못함
  - 표준편차(sd) 대신 다음과 같은 표준오차(se) 사용 $\Rightarrow$ t-검정

    $\hat\sigma^2 = \frac{1}{n-k-1}\sum_{i=1}^{n}\hat\epsilon^2 \quad \Rightarrow \quad \frac{\hat\beta-b}{se(\hat\beta)} \sim t_{n-k-1}$

$\Omega = \sigma^2 I \quad$ 아니라면 이러한 검정은 유효하지 않음

- $\beta$ 추정과 별도로 표준오차 $se(\hat\beta)$ 추정 필요

  $Var[\hat\beta_{OLS}] = (X'X)^{-1}X'\Omega X(X'X)^{-1}$

  - 여기서도 미지의 $\Omega$ 를 바로 사용할 수는 없고
  - $\hat\Omega$ 사용 $\Rightarrow$ **White 추정량** : HC heteroskedasticity-robust/consistent se



## 비편향 일치 추정 위해 $X$ 와 $\epsilon$ 의 확률적 관계가 중요

#### 1. 독립적 : 가장 이상적 : **OLS** 충분

#### 2. 외생적 : $E[\,\epsilon \mid X\,] = 0 \quad \Rightarrow \quad \hat\beta_{OLS}$ 는 비편향
 
#### 3. 비상관 : $E[\,X\epsilon\,] = 0 \quad \Rightarrow \quad \hat\beta_{OLS}$ 는 일관적
 
#### 4. 상관 : 내생성 endogeneity $\Rightarrow$ **OLS** 곤란 >> 편향 불일치

- 패널/시계열 등 상관구조 추론 가능 $\Rightarrow$ 적절한 방법론   
- 상관구조 추론 어렵다면 $\Rightarrow$ 도구변수 등 특별조치  
- 도구변수: $X$ 와 상관인 동시에 $\epsilon$ 과는 비상관  
