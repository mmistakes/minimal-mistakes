---
layout: single        # 문서 형식
title: KL Divergence          # 제목
categories: Statistics    # 카테고리
toc: true             # 글 목차
author_profiel: false # 홈페이지 프로필이 다른 페이지에도 뜨는지 여부
sidebar:              # 페이지 왼쪽에 카테고리 지정
    nav: "docs"       # sidebar의 주소 지정
#search: false # 블로그 내 검색 비활성화
---

# 1. Cross Entropy
#### - Entropy
엔트로피는 불확실성의 척도로 정보이론에서는 불확실성을 나타내며 엔트로피가 높다는 것은 정보가 많고 확률이 낮다는 것을 의미한다.

$H(x) = - \sum_{i=1}^{n}p(x_i)log(p(x_i)) $  

여기서 $p(x_i)$는 $i$번째 사건에 대한 확률이다.

#### - Cross Entropy
Cross Entropy는 실제 분포인 q를 모를 때, 예측모형 p을 q와 근사하게 모델링하여 이 확률분포들의 차이를 구하기 위해 사용한다. 

$H_p(q) = - \sum_{i=1}^{n}q(x_i)log(p(x_i)) $  

머신러닝을 이용한 예측 모형에서 실제 분포인 q를 실제 데이터를 이용해 확인할 수 있기 때문에 예측값과의 cross entropy를 계산할 수 있다. 



# 2. Kullback-Leibler divergence
Kullback-Leibler divergence는 두 확률분포의 차이를 계산하는데 사용하는 함수로, 어떤 이상적인 분포(실제모형)에 대해 그 분포를 근사하는 다른 분포(예측모형)를 사용해 두 분포간 정보량의 차이를 계산한다.

#### - 이산확률변수
$D_{KL}(P||Q) = \sum_{i} P(i) log(P(i)/Q(i)) = H_p(q) - H(q)$

#### - 연속확률변수
$D_{KL}(P||Q) = \int_{-\infty}^{\infty} p(x) log(p(x)/q(x)) dx$

#### - Entropy, Cross Entropy와의 연관성
$H_p(q)$는 $H(q)$ 보다 항상 크기때문에 KL divergence는 항상 0보다 큰 값을 갖게된다. 이 때 $H(q)$는 고정이기 때문에 $H_p(q)$를 최소화하는 것이 예측모형을 실제모형에 가깝게 근사시키는 것이라고 할 수 있다. 실제 환경에서의 불확실성을 제어하고자하는 것이 목표라고 할 수 있다.



# 3. Jensen-Shannon Divergence
#### - Definition
위의 지표들과 동일하게 분포간 거리를 계산하는데 사용하는 함수로, KL divergence를 두 번 구해 평균을 낸 것이다.그리고  KL divergence와 다르게 symetric하다는 특징이 있으며 분포간 거리를 나타낸다고 할 수 있다.

$JSD(P||Q) = (D_{KL}(P||M) + D_{KL}(Q||M))/2$
여기서 $M = (P+Q)/2$ 은 $P$와 $Q$의 혼합 분포



# 참고
https://ko.wikipedia.org/wiki/%EC%BF%A8%EB%B0%B1-%EB%9D%BC%EC%9D%B4%EB%B8%94%EB%9F%AC_%EB%B0%9C%EC%82%B0

https://en.wikipedia.org/wiki/Jensen%E2%80%93Shannon_divergence

https://velog.io/@rcchun/%EB%A8%B8%EC%8B%A0%EB%9F%AC%EB%8B%9D-%ED%81%AC%EB%A1%9C%EC%8A%A4-%EC%97%94%ED%8A%B8%EB%A1%9C%ED%94%BCcross-entropy