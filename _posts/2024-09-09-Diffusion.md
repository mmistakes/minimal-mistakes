---
layout: single        # 문서 형식
title: Deep Unsupervised Learning Using Nonequilibrium Thermodynamics (2015)       # 제목
categories: Generative Model    # 카테고리
toc: true             # 글 목차
author_profile: false # 홈페이지 프로필이 다른 페이지에도 뜨는지 여부
sidebar:              # 페이지 왼쪽에 카테고리 지정
    nav: "docs"       # sidebar의 주소 지정
#search: false # 블로그 내 검색 비활성화
---
# Keywords
Gererative, Image 


# 1. Introduction
#### - Tractable Model
다루기 쉬운 모형들은 설명과 분석이 용이하며 데이터에 쉽게 적합할 수 있다. 하지만 이러한 모형들은 종류가 다양한 데이터셋에서 적절히 구조를 묘사하는 것이 불가능하다.

#### - Flexible Model
반면에 유연한 모형들은 다양한 데이터셋에서 적절한 구조를 구성할 수 있다. 그러나 학습, 평가, 표본 수집 등 다양한 작업에서 많은 연산량이 필요하다.

#### - Markov Chain
마르코프 체인은 마르코프 성질을 지닌 이산확률과정이다. 이 때 마르코프 성질이란 $t$ 번째 상태는 이전 상태와 관련없이 오직 $t-1$ 번째 상태에만 영향을 받는 것을 의미한다. 즉, 현재 상태는 오직 직전 과거의 상태에만 영향을 받는 다는 것이다. 


## 1.1. Diffusion Probabilistic Model
다음 조건을 따르는 모형을 제안한다.

1. 모형 구조가 굉장히 유연
2. 정확한 샘플링이 가능
3. 다른 분포와의 계산 용이성
4. 로그 가능도와 각 상태에 대한 확률의 가벼운 계산량

본 논문에서는 generative Markov chain을 이용하는데, 이는 diffusion 과정을 사용해 정보가 있는 분포를 target 분포로 변환한다. 즉, Markov chain 의 종점으로 확률 모형을 명시적으로 정의한다. 각 diffusion 과정은 확률을 계산할 수 있기 때문에, 전체 과정 또한 계산이 가능하다. 이 과정에서 작은 섭동(perturbation)들을 추정이 가능한데, 이는 전체 분포나 과정을 묘사하는 것보다 더욱 다루기 쉽다. diffusion 과정이 부드러운 target 분포에 대해 존재하기 때문에, 이러한 방법은 데이터의 분포를 확인하기 좋은 방법이 될 수도 있다.




# 2. Algorithm
#### - 목표
1. 복잡한 데이터 분포를 간단하고, 다루기 쉬운 분포로 변환하는 전진(추론) diffusion 과정을 정의한다.
2. 1번 과정의 역순을 생성 모형의 분포를 정의하기 위해 유한번 학습한다.

## 2.1. Forward Trajectory 
#### - Notation
$q(\mathbf{x}^{(0)})$ : 데이터 분포
$\pi(\mathbf{y})$ : 분석적으로 다루기 쉬운 분포
$T_{\pi}(\mathbf{y} | \mathbf{y}^{\prime} ; \beta)$ : $\pi(\mathbf{y})$ 에 대한 Markov diffusion kernel
$\beta$ : diffusion rate (noise 추가 정도)

$$ 
\pi(\mathbf{y}) = \int d\mathbf{y}^{\prime} \: T_{\pi}(\mathbf{y} | \mathbf{y}^{\prime} ; \beta) \: \pi(\mathbf{y}^{\prime})
$$

$$
q(\mathbf{x}^{(t)} | \mathbf{x}^{(t-1)}) = T_{\pi}(\mathbf{x}^{(t)} | \mathbf{x}^{(t-1)} ; \beta_t)
$$

#### - Forward Diffusion
목표 : $T_{\pi}(\mathbf{y} | \mathbf{y}^{\prime} ; \beta)$를 반복적으로 적용해 $q(\mathbf{x}^{(0)})$ 를 점진적으로 $\pi(\mathbf{y})$로 변환한다.
time step $t = 0$ 부터 $t=T$까지 진행되는 diffusion 과정은 다음과 같다.
$$
q(\mathbf{x}^{(0 \cdot \cdot \cdot T)}) = q(\mathbf{x}^{(0)}) \: \prod _{t=1}^{T} q(\mathbf{x}^{(t)} | \mathbf{x}^{(t-1)})
$$
여기서 $q(\mathbf{x}^{(t)} | \mathbf{x}^{(t-1)})$ 은 정규분포에서 공분산이 단위-공분산인 정규분포나 이항분포에서 독립 이항분포로의 변환에 해당한다.



## 2.2. Reverse Trajectory 
#### - Notation
Forward Trajectory와 동일하게 구성하지만, 순서는 반대로 진행한다.
$$ 
p(\mathbf{x}^{(T)}) = \pi(\mathbf{x}^{(T)})
$$

$$
p(\mathbf{x}^{(0 \cdot \cdot \cdot T)}) = p(\mathbf{x}^{(T)}) \: \prod _{t=1}^{T} p(\mathbf{x}^{(t-1)} | \mathbf{x}^{(t)})
$$

#### - Reverse Diffusion
정규분포와 이항분포에 대한 diffusion에서 ($\beta$ 가 작고 제한이 있는 경우), 후진 diffusion 과정은 전진과정과 함수형태가 동일하다. 또한 과정이 길어질수록 $\beta$는 작아진다. 



## 2.3. Model Probability
생성모델이 데이터에 부여하는 확률은 다음과 같다.
$$
p(\mathbf{x}^{(0)}) = \int d \mathbf{x}^{(1 \cdot \cdot \cdot T)} \: p(\mathbf{x} ^ {(1 \cdot \cdot \cdot T)})
$$
이를 Forward Trajectory와 Reverse Trajectory 를 적당히 이용하면 다음과 같이 전개할 수 있다.

$$
\begin{align}
p(\mathbf{x}^{(0)}) &= \int d \mathbf{x}^{(1 \cdot \cdot \cdot T)} \: p(\mathbf{x} ^ {(0 \cdot \cdot \cdot T)}) \frac{q(\mathbf{x}^{(1 \cdot \cdot \cdot T)} | \mathbf{x}^{(0)})}{q(\mathbf{x}^{(1 \cdot \cdot \cdot T)} | \mathbf{x}^{(0)})}\\
&= \int d\mathbf{x}^{1 \cdot \cdot \cdot T} \: q(\mathbf{x}^{(1 \cdot \cdot \cdot T)} | \mathbf{x}^{(0)}) \: \frac{p(\mathbf{x}^{(0 \cdot \cdot \cdot T)})}{q(\mathbf{x}^{(1 \cdot \cdot \cdot T)} | \mathbf{x}^{(0)})} \\
&= \int d\mathbf{x}^{1 \cdot \cdot \cdot T} \: q(\mathbf{x}^{(1 \cdot \cdot \cdot T)} | \mathbf{x}^{(0)}) \: p(\mathbf{x} ^ {(T)}) \prod_{t=1}^{T} \frac{p(\mathbf{x^{(t-1)}}|\mathbf{x^{(t)}})}{q(\mathbf{x^{(t)}}|\mathbf{x^{(t-1)}})}\\ 
\end{align}
$$ 

위 식에서 $p(\mathbf{x}^{(0)})$ 이 전진 과정의 샘플들의 평균을 계산함으로써 빠르게 연산이 가능하다는 것을 알 수 있다. 이 때 무한소 $\beta$ 에 대해 전진과 후진 과정의 분포는 동일하다. 만약 두 분포가 동일하고 전진 분포에서 단일 표본이라면 위 식으로 정확하게 계산이 가능하다. 



## 2.4. Training
#### - Likelihood
모형의 가능도는 다음과 같다.
$$
\begin{align}
L &= \int d\mathbf{x}^{(0)} \: \log p(\mathbf{x}^{(0)}) \\
&= \int d\mathbf{x}^{(0)} \: q(\mathbf{x}^{(0)}) \cdot \log [\int d\mathbf{x}^{1 \cdot \cdot \cdot T} \: q(\mathbf{x}^{(1 \cdot \cdot \cdot T)} | \mathbf{x}^{(0)}) \: p(\mathbf{x} ^ {(T)}) \prod_{t=1}^{T} \frac{p(\mathbf{x^{(t-1)}}|\mathbf{x^{(t)}})}{q(\mathbf{x^{(t)}}|\mathbf{x^{(t-1)}})}]\\
\end{align}
$$

Jensen 부등식을 이용해 전개하면 하한은 다음과 같다.
$$
\begin{align}
L &>= \int d\mathbf{x}^{(0 \cdot \cdot \cdot T)} \: q(\mathbf{x}^{(0 \cdot \cdot \cdot T)}) \cdot \log [p(\mathbf{x}^{(T)}) \: \prod_{t=1}^{T} \frac{p(\mathbf{x^{(t-1)}}|\mathbf{x^{(t)}})}{q(\mathbf{x^{(t)}}|\mathbf{x^{(t-1)}})} ] \\
\end{align}
$$

그리고 이를 다음과 같이 전개할 수 있다.

$$
\begin{equation}
\begin{split}
L &>= K \\ 
K &= -2 \sum_{t=2}^{T} \int d \mathbf{x}^{(0)} d \mathbf{x}^{(t)} q(\mathbf{x}^{(0)}, \mathbf{x}^{(t)}) \: \cdot \: D_{KL}(q(\mathbf{x}^{(t-1)} |\mathbf{x}^{(t)}, \mathbf{x}^{(0)}) \: || \: p(\mathbf{x}^{(t-1)} |\mathbf{x}^{(t)})) \\
&+ H_q(\mathbf{X}^{(T)} | \mathbf{X}^{(0)}) - H_q(\mathbf{X}^{(1)} | \mathbf{X}^{(0)}) - H_p(\mathbf{X}^{(T)}) \\
\end{split}
\end{equation}
$$
여기서 entropy와 KL divergence는 분석적으로(수치적으로) 계산 가능하다. 그리고 이 하한의 미분값은 variational Bayesian 방법에서 로그 가능도의 하한의 미분값과 평행하다. 이 때, 전진과 후진과정이 동일하다면, quasi-static 과정에 해당하므로 $L = K$ 가 성립한다.

로그가능도에 대한 하한을 최대로 하는 reverse Markov transition 을 찾도록 훈련을 진행하고 이는 다음과 같다.
$$
\begin{align}
\hat{p} \:(\mathbf{x}^{(t-1)} | \mathbf{x}^{(t)}) = \argmax_{p(\mathbf{x}^{(t-1)} | \mathbf{x}^{(t)})} K 
\end{align}
$$

따라서 평균과 분산이 설정된 정규분포함수에 대한 회귀 식을 이용함으로써 확률분포를 측정하는 일은 감소된다.

#### - $\beta_t$ 선택
1. 열역학(Thermodynamics)
동일한 분포 사이이 움직이는 schedule은 자유 에너지가 얼마나 손실되냐에 따라 결정된다.

2. Gaussian Diffusion
모형의 가능도의 하한에 대해 기울기 증가에 의한 전진 schedule $\beta_{2 \cdot \cdot \cdot T}$ 를 학습한다. 첫번째 단계의 분산인 $\beta_1$ 은 과적합을 방지하기 위해 작은 상수로 고정된다. 그리고 $\beta_{1 \cdot \cdot \cdot T}$ 에 대해 $q(\mathbf{x}^{(1 \cdot \cdot \cdot T)} | \mathbf{x}^{(0)})$ 으로부터의 표본들의 의존성은 'frozen' 상태가 되는데, 이는 표본들을 추가적인 잠재변수로 간주하고 모수들과 관련한 K를 계산하는 과정에서 특정 상수로 값을 고정한다.

3. Binomial Diffusion
이산 공간(discrete state space)에서는 기울기 증가로 noise를 frozen 하는 것이 불가능하다. 그래서 frozen 대신 전진 schdule $\beta_{1 \cdot \cdot \cdot T}$ 로 각 diffusion 단계에 원래 신호의 상수인 $\frac{1}{T}$ 를 제거한다. 이는 다음과 같다.
$$ \beta_t = (T - t + 1)^{-1}
$$


## 2.5. Multiplying Distributions, and Computing Posteriors
#### - Notation
$p(\mathbf{x}^{(0)})$ : 모형 분포
$r(\mathbf{x}^{(0)})$ : 2번째 분포 또는 제한된 양수 함수(bounded positive function)
$\tilde{p}(\mathbf{x}^{(0)}) \propto p(\mathbf{x}^{(0)}) \: r(\mathbf{x}^{(0)})$ : 새로운 분포 

분포의 곱은 계산량이 많고 어렵지만, 각 과정에서 $r(\mathbf{x}^{(0)})$ 을 작은 섭동(perturbation)으로 간주하거나 정확하게 계산되기때문에 diffusion 모형은 직관적이다.

### 2.5.1. Modified Marginal Distributions
$\tilde{p}(\mathbf{x}^{(0)})$ 를 계산하기 위해 각 중간 분포와 그에 대응하는 $r(\mathbf{x}^{(t)})$ 를 곱한다. 이에 대응되는 변형된 역과정 $\tilde{p}(\mathbf{x}^{(T)})$ 는 다음과 같이 정의할 수 있다.
$$
\tilde{p}(\mathbf{x}^{(t)}) = \frac{1}{\tilde{Z_T}} \: p(\mathbf{x}^{(t)}) \: r(\mathbf{x}^{(t)})
$$
여기서 $Z_T$ 는 $t$ 번째 중간 분포의 정규화 상수이다.

### 2.5.2. Modified Diffusion Steps
역과정에서 Markov kernel $p(\mathbf{x^{(t)}}|\mathbf{x^{(t+1)}})$ 은 다음과 같은 동치조건을 만족한다.
$$
p(\mathbf{x}^{(t)}) = \int d \mathbf{x}^{(t+1)} \: p(\mathbf{x^{(t)}}|\mathbf{x^{(t+1)}}) \: p(\mathbf{x^{(t+1)}})
$$

본 논문에서는 섭동된(perturbed) Markov kernel $ \tilde{p}(\mathbf{x^{(t)}}|\mathbf{x^{(t+1)}})$ 을 만들기 원하는데, 이는 다음과 같이 유도할 수 있다.
$$
\begin{align}
\tilde{p}(\mathbf{x}^{(t)}) &= \int d \mathbf{x}^{(t+1)} \: \tilde{p} (\mathbf{x}^{(t)} | \mathbf{x}^{(t+1)}) \: \tilde{p} (\mathbf{x}^{(t+1)})\\
\frac{p(\mathbf{x}^{(t)}) \: r(\mathbf{x}^{(t)})}{\tilde{Z_t}} &= \int d \mathbf{x}^{(t+1)} \: \tilde{p} (\mathbf{x}^{(t)} | \mathbf{x}^{(t+1)}) \cdot \frac{p(\mathbf{x}^{(t+1)}) \: r(\mathbf{x}^{(t+1)})}{\tilde{Z_t}} \\
p(\mathbf{x}^{(t)}) &= \int d \mathbf{x}^{(t+1)} \: \tilde{p} (\mathbf{x}^{(t)} | \mathbf{x}^{(t+1)}) \cdot \frac{\tilde{Z}_{t} \: r(\mathbf{x}^{(t+1)})}{\tilde{Z}_{t+1} \: r(\mathbf{x}^{(t)})} \: p(\mathbf{x}^{(t+1)})\\
\tilde{p} (\mathbf{x}^{(t)} | \mathbf{x}^{(t+1)}) &= \tilde{p}(\mathbf{x}^{(t)} | \mathbf{x}^{(t+1)}) \frac{\tilde{Z}_{t+1} \: r(\mathbf{x}^{(t+1)})}{\tilde{Z}_{t} \: r(\mathbf{x}^{(t)})} \: p(\mathbf{x}^{(t+1)})\\
\end{align}
$$
만약 $\tilde{p} (\mathbf{x}^{(t)} | \mathbf{x}^{(t+1)})$ 식 $(12)$ 와 같다면, 식 $(11)$ 의 등식이 성립한다. 식 $(12)$ 가 정규화된 확률 분포가 아닐 수도 있기 때문에, 이에 대한 방안으로 다음과 같은 식을 이용한다.
$$
\begin{align}
\tilde{p} (\mathbf{x}^{(t)} | \mathbf{x}^{(t+1)}) &= \frac{1}{\tilde{Z}_{t} \: r(\mathbf{x}^{(t)})} \: p(\mathbf{x}^{(t)} | \mathbf{x}^{(t+1)}) \: r(\mathbf{x}^{(t+1)})\\
\end{align}
$$
여기서 $\tilde{Z}_t (\mathbf{x}^{(t+1)})$ 은 정규화 상수이다. 그리고 $\frac{r(\mathbf{x}^{(t)})}{r(\mathbf{x}^{(t+1)})}$ 은 $ p(\mathbf{x}^{(t)} | \mathbf{x}^{(t+1)})$ 에 대한 섭동으로 간주된다. 이러한 작은 섭동은 정규분포의 평균에 영향은 미치지만 정규화 상수에는 영향이 없기때문에, 식 $(12)$ 와 $(13)$ 은 동치이다.

### 2.5.3. Appling $r \: (\mathbf{x}^{(t)})$
#### case 1 : $r(\mathbf{x}^{(t)})$ 가 충분히 부드러운 경우
$r(\mathbf{x}^{(t)})$ 을 역과정의 kernel $p(\mathbf{x}^{(t)} | \mathbf{x}^{(t+1)})$ 에 대한 작은 섭동으로 간주해 $\: \tilde{p}(\mathbf{x}^{(t)} | \mathbf{x}^{(t+1)})$ 과 $p(\mathbf{x}^{(t)} | \mathbf{x}^{(t+1)})$ 가 동일한 분포를 따르지만 정규분포 kernel에서는 동조(perturbed)된 평균을, 이항분포 kernel에서는 동조된 flip rate를 가지게 된다.

#### case 2 : $r(\mathbf{x}^{(t)})$ 가 닫힌 형태(close form)로 정규분포나 이항분포와 곱해진 경우
$r(\mathbf{x}^{(t)})$ 을 역과정 kernel $p(\mathbf{x}^{(t)} | \mathbf{x}^{(t+1)})$ 에 바로 곱할 수 있다. 이는 $r(\mathbf{x}^{(t)})$ 가 좌표축에 대한 부분집합의 delta 함수로 구성된 경우에 적용 가능하다.

### 2.5.4. Choosing $\: r \: (\mathbf{x}^{(t)})$
$r(\mathbf{x}^{(t)})$ 은 주로 diffusion 과정에서 천천히 변화하도록 정해져야한다. 본 논문에서는 상수가 되도록 다음과 같이 설정한다.
$$
\begin{align}
r(\mathbf{x}^{(t)}) &= r(\mathbf{x}^{(0)}) \\
r(\mathbf{x}^{(t)}) &= r(\mathbf{x}^{(0)})&{\frac{T-t}{T}} \\
\end{align}
$$
식 $(15)$ 의 경우 역과정에 대한 시작 분포에 영향이 없다. 즉, 역과정에서 $\tilde{p}(\mathbf{x}^{(T)})$ 으로부터 뽑은 최초의 표본들은 똑바르다(starightforward)는 것이다.


## 2.6. Entropy of Reverse Process
전진 과정을 알고있기 때문에, 상한과 하한을 다음과 같이 유도할 수 있다.
$$
\begin{equation}
\begin{split}
H_q(\mathbf{X}^{(t)} | \mathbf{X}^{(t-1)})  &+ H_q(\mathbf{X}^{(t-1)} | \mathbf{X}^{(t)}) - H_q(\mathbf{X}^{(t)} | \mathbf{X}^{(0)}) \\
&\le H_q(\mathbf{X}^{(t-1)} | \mathbf{X}^{(t)}) \le H_q(\mathbf{X}^{(t)} | \mathbf{X}^{(t-1)})
\end{split}
\end{equation}
$$


# 참고
https://roytravel.tistory.com/358
https://xoft.tistory.com/32