---
layout: post
title:  "[Pandas][기초 통계] 공분산(Covariance)와 상관계수(Correlation)"
subtitle: "Pandas 로 배우는 공분산과 상관계수 개념"
author: "코마"
date:   2019-07-23 00:00:00 +0900
categories: [ "pandas", "cov", "corr"]
use_math: true
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 오늘은 공분산(Covariance)과 상관계수(Correlation)의 개념을 알아보도록 하겠습니다. 😺

<!--more-->

# 공분산이란?

위키 백과에 따르면 공분산이란 2개의 확률변수의 상관정도를 나타내는 값이라고 소개되어 있다. 정리해 보면 아래와 같습니다.

- 2개의 변수 중 하나의 값이 상승하는 경향을 보일 때, 다른 값도 상승하는 경향의 상관관계라면 **공분산의 값은 양수**가 될 것이다.
- 반대로 하나의 값이 상승하는 경향을 보일때 다른 값이 하강하는 경향의 상관관계라면 **공분산의 값은 음수**가 될 것이다.

## 공분산의 단점

공분산은 상관관계의 상승 혹은 하강하는 경향을 이해하기에 적절하나 변수의 측정 단위의 크기에 따라 값이 달라지므로 상관관계의 정도를 나타내는 단위로 모상관계수 p를 사용한다.

## 공분산 공식 정리 그리고 독립

공식으로 표현하면 아래와 같다.

$$ 

\newcommand{\Cov}{\mathrm{Cov}}
\newcommand{\E}{\mathrm{E}}
\newcommand{\Var}{\mathrm{Var}}

$$

$$ \E(X) = \mu, \E(Y) = v $$

$$

\Cov(X, Y) = \E((X-\mu)(Y-v))

$$

$$ \Cov(X, Y) = \E(X \cdot Y) - \mu v $$

만약 X 와 Y 가 독립일 경우, 아래와 같이 표현 가능하며

$$ \E(X \cdot Y) = \E(X) \cdot \E(Y) = \mu v $$

공분산 공식에 대입할 경우, 아래가 성립한다.

$$ \Cov(X,Y) = \mu v - \mu v = 0 $$

즉, X 와 Y 가 독립일 경우 공분산 값은 0이다. 그러나 이 역은 성립하지 않는다. 즉, 독립이 아닐 경우에도 공분산의 값은 0 이 될 수 있다. 

마지막으로 공분산의 단위는 X 와 Y 의 곱이다. 공분산의 성질은 아래의 링크를 참조하길 바란다.

## 공분산 단점 예시

인터넷에서 공분산 단점에 대한 아주 쉬운 예가 있어 이를 발췌하였다. 원문을 포함한다.

> 즉 다시말해 100점만점인 두과목의 점수 공분산은 별로 상관성이 부족하지만 100점만점이기 때문에 큰 값이 나오고 10점짜리 두과목의 점수 공분산은 상관성이 아주 높을지만 10점만점이기 때문에 작은값이 나온다.

- 참고 : [공분산(Covariance)과 상관계수(Correlation)](https://ko.wikipedia.org/wiki/%EA%B3%B5%EB%B6%84%EC%82%B0)

## 보완책 상관계수 (Correlation)

확률변수의 절대적 크기에 영향을 받지 않도록 단위화 시킨 것이다. 즉, 크기에 영향을 받지않고 단위화 시킴에 따라 상관계수의 성질로 절대값이 1이하이다.

$$ 
\rho = \frac{ \Cov(X, Y) }{ \sqrt{ \Var(X) } \sqrt{ \Var(Y) } }, -1 \leq \rho \geq 1
$$

### 상관계수의 성질

1. 상관계수의 절대값은 1을 넘을 수 없다.
2. 확률변수 X, Y가 독립이라면 상관계수는 0이다.
3. X와 Y가 선형적 관계라면 상관계수는 1 혹은 -1이다.
   1에 가까울 수록 양의 선형관계이며, -1에 가까울 수록 음의 선형관계이다.

# Pandas 에서 계산

Pandas 는 두 변수의 상관관계와 공분산을 계산하기 위한 메서드를 제공한다. 상관관계 혹은 공분산을 계산하기 위해서는 하나의 인자가 더 필요하다. 즉, 변수 X 외에도 변수 Y가 있어야 계산되는 값이다.

Pandas 는 DataFrame 과 Series 객체를 제공하며 각 객체는 corr, cov, corrwith 등의 메서드를 통해서 상관관계, 공분산을 계산한다. 이때 서로 다른 객체간에 계산하는 유형은 아래와 같이 세가지로 나눌 수 있다.
   
- Series 와 Series 간의 계산 (Series.corr(Series))
- DataFrame 의 칼럼 간의 계산 (DataFrame.corr())
- DataFrame 과 Series 의 계산 (DataFrame.corrwith(Series))

객체 간의 연산을 위해 객체의 타입 별로 분류하는 것이 이해하기에 용이하다. 우선 주식 데이터를 로드하기 위해 아래와 같이 패키지를 설치해보자.

```bash
conda install pandas-datareader
```

다음으로 분석할 데이터를 로딩해보자. 그리고 주가(price)에 대해 퍼센트 변화율(Percent Change)를 계산하여 `returns` 변수에 담아 둔다.

> `data.DataReader(ticker, 'google', ... )` 이라고 되어 있으나 구글 정책 변경으로 `yahoo` 라고 표기해야 에러가 발생하지 않는다. 일부 책에서는 google 로 표기하고 있으니 추후에 참고 바란다.

```python
import pandas as pd
import numpy as np
from pandas_datareader import data

all_data = {}
for ticker in ['AAPL', 'IBM', 'MSFT', 'GOOG']:
    all_data[ticker] = data.DataReader(ticker, 'yahoo', '2015-01-01', '2016-01-01')

price = pd.DataFrame({tic: data['Close'] for tic, data in all_data.items()})
volume = pd.DataFrame({tic: data['Volume'] for tic, data in all_data.items()})

# 퍼센트 변화율을 계산하여 별도의 데이터프레임을 생성한다.
returns = price.pct_change()
```

## Series vs Series

pandas 에서 공분산을 계산하기 위해서 인자가 두개가 필요하다. 이는 공분산 공식에서 보았듯이 X와 Y의 역할을 하는 변수를 두는 것과 동일하다. 


이 예제에서는 MSFT 와 IBM 의 주가의 퍼센트 변화율에 대해 공분산을 구해본다.

```python
[100] : returns.MSFT.cov(returns.IBM)
0.0001312719700990277
```

계산 결과는 0에 매우 가깝다. 즉, MSFT 주가와 IBM 의 주가는 선형관계가 성립하지 않음을 의미한다. 그러나 0이라고 하여 서로 독립이라고 말할 수 없다. (이 내용은 위의 글을 참조 바람)


위에서 공분산의 단점으로 단위의 크기가 단위화 되지 않음을 말하며 이에, 상관계수가 필요하다고 하였다. MSFT와 IBM 의 corr 값을 구해보자.

```python
[100] : returns.MSFT.corr(returns.IBM)
0.5501734168185448
```

위에서 언급하였듯이 1에 가까울 수록 양의 상관관계 (X가 증가하는 경향이 있을 때, Y가 증가하는 경향)가 있음을 말하였다. 또한, 0 일 경우 선형관계가 없음을 말할 수 있다. 

그렇다면 공분산 값(0.0001312719700990277)과 상관계수 값(0.5501734168185448)의 차이가 발생하는 이유가 무엇일까? **정답은 퍼센트 변화율 때문이다.** 

퍼센트 변화율을 구하면서 주가(price)가 소수점 두자리 이하인 것을 확인하였다. (아래의 데이터를 참조) 그리고 우리는 공분산이 단위에 영향을 받음을 이미 알고 있다.

```bash
 	          AAPL 	      IBM 	      MSFT      	GOOG
Date 				
2015-12-24 	-0.005340 	-0.002093 	-0.002687 	-0.002546
2015-12-28 	-0.011201 	-0.004629 	 0.005030 	 0.018854
2015-12-29 	 0.017974 	 0.015769    0.010724 	 0.018478
2015-12-30 	-0.013059 	-0.003148 	-0.004244 	-0.007211
2015-12-31 	-0.019195 	-0.012344 	-0.014740 	-0.015720
```

따라서, 상관계수의 값을 바탕으로 MSFT 와 IBM 간에 어느정도 양의 상관관계가 있다고 말하는 것이 옳다.


## DataFrame의 Corr, Cov 계산

DataFrame 은 칼럼들로 구성되어 있다. DataFrame 에 대해서 corr(), cov() 메서드를 호출할 경우 별도의 인자가 필요없다. 아래의 예시를 확인해 보자. 인덱스 축과 칼럼 축이 똑같은 이름인 것을 확인할 수 있다.
그리고 (0,0), (1,1), (2,2), (3,3) 은 모두 1의 값임을 말하고 있다. 이는, AAPL 주가가 오르거나 내릴 때 상관관계가 있음을 의미한다.

DataFrame 의 corr 와 cov 메서드는 테이블 내의 계산을 수행한다.

```python
[120] : returns.corr()
 	    AAPL 	    IBM 	    MSFT    	GOOG
AAPL 	1.000000 	0.513448 	0.522070 	0.380192
IBM 	0.513448 	1.000000 	0.550173 	0.449781
MSFT 	0.522070 	0.550173 	1.000000 	0.521194
GOOG 	0.380192 	0.449781 	0.521194 	1.000000
```

## DataFrame 와 Series 의 Corr, Cov 계산

그러나 우리는 간혹 DataFrame 의 특정 필드와 다른 Series 에 대해 공분산, 상관계수를 구하여 선형관계인지를 확인하고자 할 때가 있다. 이를 위해 사용할 수 있는 메서드가 corrwith 이다.

불행히도 covwith 는 없다. 그래도 상관계수를 통해서도 충분히 선형관계를 보일 수 있으니 걱정할 필요는 없을 것이다.

아래와 같이 명령어를 입력할 경우 IBM 주가의 퍼센트 변화율과 각 주식들의 퍼센트 변화율에 대한 선형관계를 판단해 볼 수 있다.

```python
[130] : returns.corrwith(returns.IBM)
AAPL    0.513448
IBM     1.000000
MSFT    0.550173
GOOG    0.449781
dtype: float64
```

즉, 여기 예에서는 IBM 주가를 사용하였지만, 추후에 카카오, 네이버등 한국 IT 주식의 데이터와 비교할 때도 이는 용이한 방법이라 활용도가 높을 것으로 예상된다.

물론, 데이터 프레임에 병합하여 할 수도 있겠지만, 이방법이 훨씬 간단해 보인다.

# 결론

이로써 Pandas 를 통해 공분산과 상관계수에 대해서 알아보았다. 매우 기초적인 개념이지만, 통계에서 상식적인 내용으로 Pandas 를 이용해서 데이터를 분석할 때 자연스럽게 사용할 수 있도록 풀어 보았다.
이러한 개념을 잘 내재화하여 X와 Y의 관계를 파악할 때 DataFrame, Series 를 잘 이용해 보자.

# 참고

- [Mathisfun: Percentage Change](https://www.mathsisfun.com/numbers/percentage-change.html)
- [Latex : Math Symbol List](https://librewiki.net/wiki/%EC%88%98%ED%95%99_%EA%B8%B0%ED%98%B8)
- [Wiki : 공분산](https://ko.wikipedia.org/wiki/%EA%B3%B5%EB%B6%84%EC%82%B0)

