---
title: 통계학 맛보기
date: 2024-07-19
categories: math-for-ml
---

## 모수

- 모수 : 특정 집단 전체의 특성을 나타내는 수치
  - 모집단의 평균, 분산, 비율 등의 형태로 나타남
- 통계적 모델링은 적절한 가정 위에서 확률분포를 추정(inference)하는 것이 목표
- 기계학습과 통계학이 공통적으로 추구하는 목표
- 유한한 개수의 데이터만 관찰해서 모집단의 분포를 정확하게 알아낸 다는 것은 불가능
- 근사적으로 확률분포를 추정할 수 밖에 없음
  - 분포를 정확하게 맞춤 X
  - 데이터와 추정 방법의 불확실성을 고려
- 데이터가 **특정 확률분포를 따른다고 선험적으로(a priori) 가정**한 후 그 분포를 결정하는 모수(parameter)를 추정하는 방법은 **모수적(parametric) 방법론**이라고 함
- 특정 **확률분포를 가정하지 않고** 데이터에 따라 모델의 구조 및 모수의 개수가 유연하게 바뀌면 **비모수(nonparametric) 방법론**이라고 함

## 확률분포 가정하기: 예제

- 확률분포를 가정하는 방법 : 우선 히스토그램을 통해 모양을 관찰한다.
- 데이터가 2개의 값(0 또는 1)만 가지는 경우 -> 베르누이 분포
- 데이터가 n개의 이산적인 값을 가지는 경우 -> 카테고리 분포
- 데이터가 [0, 1] 사이에서 값을 가지는 경우 -> 베타분포

  $$
  \text{Beta}(x; \alpha, \beta) = \frac{x^{\alpha-1} (1-x)^{\beta-1}}{B(\alpha, \beta)}
  $$

- 데이터가 0 이상의 값을 가지는 경우 -> 감마분포, 로그정규분포 등
- 데이터가 R 전체에서 값을 가지는 경우 -> 정규분포, 라플라스 분포
- 기계적으로 확률분포를 가정해서는 안됨
- **데이터를 생성하는 원리를 먼저 고려**하는 것이 원칙

## 데이터로 모수를 추정해보자

- 데이터의 확률분포를 가정했다면 모수를 추정해볼 수 있습니다
- 정규분포의 모수는 평균 \\(\mu\\) 과 분산 \\(\sigma^2\\)으로 추정하는 통계량(statistic)은 다음과 같다
  $$
  \bar{X} = \frac{1}{N} \sum_{i=1}^{N} X_i \quad \text{표본평균}
  $$

$$
S^2 = \frac{1}{N-1} \sum_{i=1}^{N} (X_i - \bar{X})^2 \quad \text{표본분산}
$$

$$
\mathbb{E}[\bar{X}] = \mu
$$

$$
\mathbb{E}[S^2] = \sigma^2
$$

- 표본분산을 구할 때 \\( N \\)이 아니라 \\( N-1 \\)로 나누는 이유는 불편(unbiased) 추정량을 구하기 위해서다
- 통계량의 확률분포를 표집분포(sampling distribution)라 부르며, 특히 표본평균의 표집분포는 \\( N \\)이 커질수록 정규분포 \\( N(\mu, \sigma^2 / N) \\)에 근접한다.

## 표본 분포 (Sample Distribution)

표본 분포는 단순히 어떤 모집단에서 추출한 하나의 표본 데이터의 분포를 말합니다. 예를 들어, 모집단이 있는 학생들의 키에 대한 정보라면, 100명의 학생을 임의로 선택하여 그들의 키를 기록한 값들이 표본 분포를 형성하게 됩니다.

### 특징

- 표본의 크기: 표본 분포는 주어진 표본의 크기에 따라 다릅니다.
- 특정 데이터셋: 표본 분포는 특정 표본에 대한 데이터 분포입니다.
- 모집단의 특성을 반영: 표본이 충분히 크다면, 모집단의 특성을 어느 정도 반영할 수 있습니다.

## 표집 분포 (Sampling Distribution)

표집 분포는 동일한 모집단에서 같은 크기의 표본을 여러 번 추출하여 계산된 통계량(예: 평균, 분산)의 분포를 말합니다. 즉, 표집 분포는 많은 표본들의 통계량으로 이루어진 분포입니다.

### 특징

- 반복된 추출: 동일한 크기의 표본을 여러 번 추출하여 각각의 표본에서 계산된 통계량들의 분포입니다.
- 통계량의 분포: 표집 분포는 특정 통계량(예: 표본 평균, 표본 비율 등)의 분포입니다.
- 중앙 극한 정리: 표본 크기가 충분히 크다면, 표집 분포는 모집단의 분포 형태와 관계없이 정규 분포에 가까워집니다.

## 최대가능도 추정법

- 표본평균이나 표본분산은 중요한 통계량이지만 확률분포마다 사용하는 모수가 다르므로 적절한 통계량이 달라지게 된다
- 이론적으로 가장 가능성이 높은 모수를 추정하는 방법 중 하나는 최대가능도 추정법(maximum likelihood estimation, MLE)
  $$
  \hat{\theta}_{MLE} = \underset{\theta}{\operatorname{argmax}} \, L(\theta; \mathbf{x}) = \underset{\theta}{\operatorname{argmax}} \, P(\mathbf{x}|\theta)
  $$

1. 목표 파라미터 \\(\theta\\) 선택:
   - \\(\theta\\)는 우리가 추정하고자 하는 모델의 파라미터입니다. 예를 들어, 정규분포의 평균과 표준편차 \\(\mu\\)와 \\(\sigma\\)가 될 수 있습니다.
2. 데이터 \\(\mathbf{x}\\):
   - \\(\mathbf{x}\\)는 실제 관측된 데이터입니다. 예를 들어, 어떤 실험에서 얻은 결과나 측정값들입니다.
3. 우도 함수 \\(L(\theta; \mathbf{x})\\):
   - 우도 함수는 주어진 파라미터 \\(\theta\\)에 대해 데이터 \\(\mathbf{x}\\)가 관측될 확률을 나타냅니다.
     즉, \\(L(\theta; \mathbf{x}) = P(\mathbf{x}|\theta)\\)입니다.
   - 여기서 \\(P(\mathbf{x}|\theta)\\)는 조건부 확률로,
     \\(\theta\\)가 주어졌을 때 \\(\mathbf{x}\\)가 관측될 확률을 의미합니다.
4. \\(\underset{\theta}{\operatorname{argmax}}\\):
   - 이 부분은 “우도 함수 \\(L(\theta; \mathbf{x})\\)를 최대화하는 \\(\theta\\)를 찾는다”는 의미입니다.
   - 즉, 가능한 모든 \\(\theta\\) 값 중에서 데이터 \\(\mathbf{x}\\)가 관측될 확률을 가장 크게 만드는 \\(\theta\\)를 찾는 과정입니다.
5. 최대우도추정 \\(\hat{\theta}_{MLE}\\):
   - 위 과정을 통해 찾은 \\(\theta\\) 값을 \\(\hat{\theta}_{MLE}\\)라고 하며, 이것이 최대우도추정치입니다.
   - \\(\hat{\theta}_{MLE}\\)는 주어진 데이터 \\(\mathbf{x}\\)에 가장 적합한 파라미터 값입니다.

- 데이터 집합 \\(\mathbf{X}\\)가 독립적으로 추출되었을 경우 로그가능도를 최적화합니다
  $$
  L(\theta; \mathbf{X}) = \prod_{i=1}^{n} P(x_i|\theta) \implies \log L(\theta; \mathbf{X}) = \sum_{i=1}^{n} \log P(x_i|\theta)
  $$

1. 우도 함수 \\(L(\theta; \mathbf{X})\\) 이해:
   - 주어진 데이터 \\(\mathbf{X}\\)가 주어졌을 때,
     각 데이터 \\(x_i\\)가 파라미터 \\(\theta\\) 아래서 발생할 확률 \\(P(x_i|\theta)\\)를 모두 곱하여 전체 데이터가 발생할 확률을 구합니다.
   - 이 곱셈 형태의 우도 함수는 독립적인 사건들의 결합 확률을 나타냅니다.
2. 로그 우도 함수 \\(\log L(\theta; \mathbf{X})\\)로 변환:
   - 우도 함수를 직접 최대화하는 대신, 로그 우도 함수를 최대화하는 것이 더 수학적으로 간편하고 안정적입니다.
   - 로그 변환을 통해 곱셈을 덧셈으로 변환하면 계산의 복잡성이 줄어듭니다.
3. 최대화 과정:
   - 로그 우도 함수를 최대화하는 파라미터 \\(\theta\\)를 찾는 과정은 원래의 우도 함수를 최대화하는 것과 동일한 결과를 줍니다.
   - 로그 우도 함수의 최대화를 통해 더 효율적이고 안정적으로 최대우도추정치를 구할 수 있습니다.
4. 경사하강법으로 가능도를 최적화할 때 미분 연산을 사용하게 되는데, 로그가능도를 사용하면 연산량을 \\(\mathcal{O}(n^2)\\)에서 \\(\mathcal{O}(n)\\)으로 줄여줌
5. 대게의 손실함수의 경우 경사하강법을 사용하므로 음의 로그가능도(negative log-likelihood)를 최적화하게 됨

### 최대가능도 추정법 예제: 정규분포

- 정규분포를 따르는 확률변수 \\(X\\)로부터 독립적인 표본 \\(\{x_1, ..., x_n\}\\)을 얻었을 때 최대 가능도 추정법을 이용하여 모수를 추정하면?

$$
\hat{\theta}_{MLE} = \underset{\theta}{\operatorname{argmax}} \, L(\theta; \mathbf{x}) = \underset{\mu, \sigma^2}{\operatorname{argmax}} \, P(\mathbf{X}|\mu, \sigma^2)
$$

$$
\log L(\theta; \mathbf{X}) = \sum_{i=1}^{n} \log P(x_i|\theta) = \sum_{i=1}^{n} \log \left( \frac{1}{\sqrt{2\pi\sigma^2}} \exp \left( -\frac{(x_i - \mu)^2}{2\sigma^2} \right) \right)
$$

$$
= -\frac{n}{2} \log 2\pi\sigma^2 - \sum_{i=1}^{n} \frac{(x_i - \mu)^2}{2\sigma^2}
$$

### 단계별 설명

1. 최대우도추정(MLE) 정의:

- MLE는 주어진 데이터 \\(\mathbf{X}\\)에 대해 파라미터 \\(\theta\\)를 찾는 방법입니다. 여기서 \\(\theta\\)는 \\(\mu\\)와 \\(\sigma^2\\)를 포함합니다.
- \\(\theta\\) 값을 최대화하는 것이 목표입니다.

2. 로그 우도 함수 \\(\log L(\theta; \mathbf{X})\\) 계산:

- 로그 우도 함수는 우도 함수의 로그를 취한 것으로, 계산을 간단하게 합니다.
- 주어진 데이터 \\(\mathbf{X} = \{x_1, x_2, \ldots, x_n\}\\)에 대해 로그 우도 함수는 다음과 같이 계산됩니다:

$$
\log L(\theta; \mathbf{X}) = \sum_{i=1}^{n} \log P(x_i|\theta)
$$

3. 정규분포의 확률밀도함수(PDF):

- 정규분포에서 \\(P(x_i\|\theta)\\)는 다음과 같습니다.


$$
P(x_i|\theta) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp \left( -\frac{(x_i - \mu)^2}{2\sigma^2} \right)
$$

4. 로그 우도 함수의 전개:

- 로그 우도 함수를 구하기 위해 각 \\(P(x_i\|\theta)\\)에 로그를 취하면 다음과 같은 형태로 전개됩니다.

$$
\log L(\theta; \mathbf{X}) = \sum_{i=1}^{n} \log \left( \frac{1}{\sqrt{2\pi\sigma^2}} \exp \left( -\frac{(x_i - \mu)^2}{2\sigma^2} \right) \right)
$$

- 로그 성질을 이용해 우도 함수를 전개하면 다음과 같습니다:

$$
= \sum_{i=1}^{n} \left( \log \frac{1}{\sqrt{2\pi\sigma^2}} + \log \exp \left( -\frac{(x_i - \mu)^2}{2\sigma^2} \right) \right)
= -\frac{n}{2} \log 2\pi\sigma^2 - \sum_{i=1}^{n} \frac{(x_i - \mu)^2}{2\sigma^2}
$$

$$
0 = \frac{\partial \log L}{\partial \mu} = -\sum_{i=1}^{n} \frac{x_i - \mu}{\sigma^2}
$$

$$
0 = \frac{\partial \log L}{\partial \sigma} = -\frac{n}{\sigma} + \frac{1}{\sigma^3} \sum_{i=1}^{n} (x_i - \mu)^2
$$

### 1. 로그 우도 함수의 \\(\mu\\)에 대한 편미분

$$
0 = \frac{\partial \log L}{\partial \mu} = -\sum_{i=1}^{n} \frac{x_i - \mu}{\sigma^2}
$$

- 로그 우도 함수:
- 이전 단계에서 얻은 로그 우도 함수는 다음과 같습니다:

$$
\log L(\theta; \mathbf{X}) = -\frac{n}{2} \log 2\pi\sigma^2 - \sum_{i=1}^{n} \frac{(x_i - \mu)^2}{2\sigma^2}
$$

- \\(\mu\\)에 대한 편미분:
- 로그 우도 함수를 \\(\mu\\)에 대해 미분합니다.
- \\(\mu\\)에 대한 편미분은 다음과 같이 계산됩니다:

$$
\frac{\partial \log L}{\partial \mu} = \frac{\partial}{\partial \mu} \left( -\sum_{i=1}^{n} \frac{(x_i - \mu)^2}{2\sigma^2} \right)
$$

- 이를 계산하면:

$$
\frac{\partial \log L}{\partial \mu} = -\sum_{i=1}^{n} \frac{x_i - \mu}{\sigma^2}
$$

- 최적화 조건:
- 이 편미분 결과를 0으로 설정하여 최적 조건을 찾습니다.

$$
0 = -\sum_{i=1}^{n} \frac{x_i - \mu}{\sigma^2}
$$

### 2. 로그 우도 함수의 \\(\sigma\\)에 대한 편미분

$$
0 = \frac{\partial \log L}{\partial \sigma} = -\frac{n}{\sigma} + \frac{1}{\sigma^3} \sum_{i=1}^{n} (x_i - \mu)^2
$$

- 로그 우도 함수:
- 동일한 로그 우도 함수에서 \\(\sigma\\)에 대해 미분합니다.
- \\(\sigma\\)에 대한 편미분:
- 로그 우도 함수를 \\(\sigma\\)에 대해 미분합니다.
- \\(\sigma\\)에 대한 편미분은 다음과 같이 계산됩니다:

$$
\frac{\partial \log L}{\partial \sigma} = \frac{\partial}{\partial \sigma} \left( -\frac{n}{2} \log 2\pi\sigma^2 - \sum_{i=1}^{n} \frac{(x_i - \mu)^2}{2\sigma^2} \right)
$$

- 이를 계산하면:

$$
\frac{\partial \log L}{\partial \sigma} = -\frac{n}{\sigma} + \frac{1}{\sigma^3} \sum_{i=1}^{n} (x_i - \mu)^2
$$

- 최적화 조건:
- 이 편미분 결과를 0으로 설정하여 최적 조건을 찾습니다.

$$
0 = -\frac{n}{\sigma} + \frac{1}{\sigma^3} \sum_{i=1}^{n} (x_i - \mu)^2
$$

$$
0 = \frac{\partial \log L}{\partial \mu} = -\sum_{i=1}^{n} \frac{x_i - \mu}{\sigma^2} \implies \hat{\mu}_{MLE} = \frac{1}{n} \sum_{i=1}^{n} x_i
$$

$$
0 = \frac{\partial \log L}{\partial \sigma} = -\frac{n}{\sigma} + \frac{1}{\sigma^3} \sum_{i=1}^{n} (x_i - \mu)^2 \implies \hat{\sigma}^2_{MLE} = \frac{1}{n} \sum_{i=1}^{n} (x_i - \mu)^2
$$

## 확률분포의 거리

- 기계학습에서 사용되는 손실함수들은 모델이 학습하는 확률분포와 데이터에서 관찰되는 확률분포의 거리를 통해 유도
- 데이터 공간에 두 개의 확률분포 \\(P(x)\\), \\(Q(x)\\)가 있을 경우 두 확률분포 사이의 거리(distance)를 계산할 때 다음과 같은 함수들을 이용
  - 총변동 거리(Total Variation Distance, TV)
  - 쿨백-라이블러 발산(Kullback-Leibler Divergence, KL)
  - 바슈타인 거리(Wasserstein Distance)

---

> 확률과 가능도의 차이?

1. 확률:
   - 상황: 동전을 던지기 전에
   - 질문: “앞면이 나올 가능성은?”
   - 답: 0.5 (50%)
2. 가능도:
   - 상황: 동전을 던진 후 10번 중 7번 앞면이 나왔다면
   - 질문: “동전이 앞면이 70% 나올 때 이 결과를 잘 설명할 수 있을까?”
   - 답: 앞면이 70% 나오는 동전이 이 결과를 잘 설명할 수 있습니다.

- 요약
  - 확률은 사건이 일어나기 전에 그 가능성을 생각하는 것.
  - 가능도는 사건이 일어난 후 그 결과를 보고 조건을 추정하는 것.
