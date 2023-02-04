---
layout: single
title: "[혼공머신러닝] 2 - 1 훈련세트와 테스트 세트"
categories: Hongong_mldl
tag: [python, Machine Learning]
toc: true
---

## 훈련세트와 테스트 세트

---

### 1. 용어 정리

훈련 세트 : 훈련에 사용되는 데이터

지도 학습 : 훈련하기 위한 데이터와 정답이 필요

입력 : 지도 학습에서의 데이터

타깃 : 지도 학습에서의 정답

훈련 데이터 : 입력과 타깃

특성 : 입력으로 사용된 데이터의 열(길이, 무게 등)

테스트 세트 : 평가에 사용하는 데이터

훈련 세트 : 훈련에 사용되는 데이터

넘파이 : 파이썬의 대표적인 배열 라이브러리

---

### 2. 문제 풀이

#### 2 - 1. 1장 문제 복습

생선의 무게와 길이의 리스트

```python
fish_length = [25.4, 26.3, 26.5, 29.0, 29.0, 29.7, 29.7, 30.0, 30.0, 30.7, 31.0, 31.0,
                31.5, 32.0, 32.0, 32.0, 33.0, 33.0, 33.5, 33.5, 34.0, 34.0, 34.5, 35.0,
                35.0, 35.0, 35.0, 36.0, 36.0, 37.0, 38.5, 38.5, 39.5, 41.0, 41.0, 9.8,
                10.5, 10.6, 11.0, 11.2, 11.3, 11.8, 11.8, 12.0, 12.2, 12.4, 13.0, 14.3, 15.0]
fish_weight = [242.0, 290.0, 340.0, 363.0, 430.0, 450.0, 500.0, 390.0, 450.0, 500.0, 475.0, 500.0,
                500.0, 340.0, 600.0, 600.0, 700.0, 700.0, 610.0, 650.0, 575.0, 685.0, 620.0, 680.0,
                700.0, 725.0, 720.0, 714.0, 850.0, 1000.0, 920.0, 955.0, 925.0, 975.0, 950.0, 6.7,
                7.5, 7.0, 9.7, 9.8, 8.7, 10.0, 9.9, 9.8, 12.2, 13.4, 12.2, 19.7, 19.9]
```

2차원 리스트 만들기

```python
fish_data = [[l, w] for l, w in zip(fish_length, fish_weight)]
fish_target = [1]*35 + [0]*14
```

하나의 생선 데이터를 **샘플**이라고 부른다.
도미와 빙어는 각각 35마리, 14마리
전체 데이터는 49개의 **샘플**
사용되는 특성은 길이와 무게 2개

사이킷런의 KNeighborsClassifier 클래스를 임포트하고 모델 객체 만들기

```Python
from sklearn.neighbors import KNeighborsClassifier
kn = KNeighborsClassifier()
```

```python
kn.fit(train_input, train_target)
kn.score(test_input, test_target)

출력결과 : 0.0
```

정확도가 0.0이 나온 이유는 도미로만 훈련을 하고 테스트는 빙어로만 했기 때문에 문제가 발생한 것입니다.

![Alt text](https://i.esdrop.com/d/f/uVJApfFjHN/CdHLtRtW3m.jpg)

정확한 값을 가져오기 위해서는 훈련에 도미와 빙어 모두가 들어가고 테스트에도 도미와 빙어 모두가 들어가야 됩니다.

이렇게 훈련 세트와 테스트 세트에 샘플이 골고루 섞여 있지 않고 샘플링이 한쪽으로 치우쳤다는 의미로 **샘플림 편향** 이라고 부릅니다

---

#### 2 - 2. 넘파이 활용하기

파이썬 리스트를 넘파이 배열로 바꾸기

```python
import numpy as np
```

```python
input_arr = np.array(fish_data)
target_arr = np.array(fish_target)
print(input_arr)

출력결과 :
[[  25.4  242. ]
 [  26.3  290. ]

        .
        .
        .
 [  14.3   19.7]
 [  15.    19.9]]
```

인덱스를 input_arr와 target_arr에 부여하고 랜덤하게 섞어 출력해보면, 골고루 섞인 것을 확인할 수 있습니다.

```python
np.random.seed(42)
index = np.arange(49)
np.random.shuffle(index)
print(index)

출력결과 :
[13 45 47 44 17 27 26 25 31 19 12  4 34  8  3  6 40 41 46 15  9 16 24 33
 30  0 43 32  5 29 11 36  1 21  2 37 35 23 39 10 22 18 48 20  7 42 14 28
 38]
```

랜덤하게 섞인 인덱스를 배열 인덱싱을 이용해 훈련 세트와 테스트 세트를 섞습니다.

```python
train_input = input_arr[index[:35]]
train_target = target_arr[index[:35]]

test_input = input_arr[index[35:]]
test_target = target_arr[index[35:]]
```

그래프로 확인해 보기

```python
import matplotlib.pyplot as plt
plt.scatter(train_input[:, 0], train_input[:, 1])
plt.scatter(test_input[:, 0], test_input[:, 1])
plt.xlabel('length')
plt.ylabel('weight')
plt.show()
```

![Alt text](https://i.esdrop.com/d/f/uVJApfFjHN/TyTu7A9uqD.jpg)

파란색이 훈련 세트, 주황색이 테스트 세트입니다.
도미와 빙어 모두 잘 섞여 있는 것을 그래프를 통해 확인해 볼 수 있습니다. 다음은 훈련을 시켜 보겠습니다.

```python
kn = kn.fit(train_input, train_target)
kn.score(test_input, test_target)

출력결과 :
1.0
```

출력 결과 또한 100%의 정확도를 보여줍니다.

---

공부한 전체 코드는 깃허브에 올렸습니다.

**[깃허브 주소](<https://github.com/mgskko/Data_science_Study-hongongmachine/blob/main/%ED%98%BC%EA%B3%B5%EB%A8%B8%EC%8B%A0_2%EA%B0%95_1.ipynb>)**
{: .notice--primary}
