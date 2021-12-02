---
title:  "머신러닝의 데이터 표현"
excerpt: "머신러닝 디자인 패턴 챕터2의 선형 스케일링 파트를 공부하고 정리한 내용입니다."
toc: true
toc_sticky: true
header:
  teaser: /assets/images/bio-photo-mldp.jpg

categories:
  - TIL
tags:
  - ML
  - Data-scaling
  - TIL
last_modified_at: 2021-12-01
---

## 1. 수치 입력

랜덤 포레스트, 서포트 벡터 머신, 신경망은 수치 기반으로 작동하므로 입력값이 수치로 되어 있다면 이를 변경하지 않고 모델에 전달할 수 있다. 주로 [-1, 1]의 범위로 스케일링을 진행하여 모델에 전달한다.


```python
from sklearn import datasets, linear_model
import timeit

diabetes_X, diabetes_y = datasets.load_diabetes(return_X_y=True)

raw = diabetes_X[:, None, 2]

max_raw = max(raw)
min_raw = min(raw)
scaled = (2*raw - max_raw - min_raw)/(max_raw - min_raw) # 최소-최대 스케일링

def train_raw():
    linear_model.LinearRegression().fit(raw, diabetes_y)

def train_scaled():
    linear_model.LinearRegression().fit(scaled, diabetes_y)
    
raw_time = timeit.timeit(train_raw, number=1000)
scaled_time = timeit.timeit(train_scaled, number=1000)
```


```python
print('Raw: {:.4f}s, Scaled: {:.4f}s, Improvement: {:2f}%'.format(raw_time, scaled_time, 100*(raw_time-scaled_time)/raw_time))
```

    Raw: 0.2659s, Scaled: 0.2429s, Improvement: 8.659831%
    

스켈일링한 쪽의 속도가 약 9%에 가깝게 향상됨을 알 수 있다. 이렇게 속도 향상이 됨으로써 비용도 절감할 수 있고, 정확도도 높아질 수 있다.

❓ **이외에도 스케일링이 필요한 이유와 스케일링의 범위가 [-1, 1]인 이유는 무엇일까?** 상당수의 ML 프레임워크가 [-1, 1] 범위 내의 수치에서 잘 작동하도록 조정된 옵티마이저를 사용하기 때문에 입력값이 이 범위에 속하도록 수치를 스케일링 하는 것이 도움이 될 수 있다. 따라서 [-1, 1]의 범위로 스케일링을 하면 삭습 속도가 빨라지거나 비용이 저렴해지고, 가장 높은 부동 소수점 정밀도를 얻을 수 있다.

❓ **옵티마이저가 [-1, 1] 범위 내에서 잘 작동하는 이유는 무엇일까?** 경사하강법(gradient descent) 옵티마이저는 손실 함수의 곡률이 증가함에 따라 수렴하는데 더 많은 단계를 필요로 한다. 만약 특징의 상대적인 크기가 더 크다면 미분도 커지는 현상이 발생하여 손실 함수의 곡률이 증가한다. 이는 비정상적인 가중치 업데이트로 이어져 수렴하는데 더 많은 단계가 필요하여 계산 부하가 증가하게 된다. 이를 보완하기 위해 테이블을 [-1, 1]의 범위로 중앙에 배치하면 오류 함수가 완만해지므로 학습 속도 향상, 비용 감소 효과를 일으킨다.

참고로 학습 속도와 비용 개선, 정확도 향상 뿐만 아니라 일부 머신러닝 알고리즘 및 기술이 데이터의 상대적인 크기에 민감하기 때문에 스케일링을 해주는 것이 좋다.(분류 문제를 해결하는 알고리즘을 필요 없음)

## 2. 선형 스케일링

1. 최소-최대 스케일링
: 최솟값은 -1, 최댓값은 1로 변환하여 나머지 데이터를 [-1, 1] 의 범위로 변환하는 기법
```python
minmax_scaled = (2*x - max_x - min_x)/(max_x - min_x)
```

2. 클리핑(최소-최대 스케일링과 함께 사용)
: 필요없는 정보, 아웃라이어(outlier)를 제거하여 합리적인 최솟값, 최댓값 사이에서 데이터 수치를 [-1, 1] 의 범위로 변환하는 기법

3. Z 점수 정규화
: 학습 데이터셋에 대해 추정한 평균과 표준편차를 사용하는 스케일링 기법
```python
zscore_scaled = (x - mean_x)/(stddev_x)
```

4. 윈저라이징
: 학습 데이터셋의 경험적 분포를 사용하여 데이터값의 10번째 및 90번째 혹은 5번째 및 95번째의 백분위수에 해당하는 경계로 클리핑 후 최소-최대 스케일을 적용하는 기법
