---
layout: single
title: "[혼공머신러닝] 6 - 1 군집 알고리즘"
categories: Hongong_mldl
tag: [python, Machine Learning]
toc: true
---

## 군집 알고리즘

---

### 1. 용어 정리

비지도 학습 : 타깃이 없을 경우 사용하는 머신러닝 알고리즘

히스토그램 : 구간별로 값이 발생한 빈도를 그래프로 표시한 것

군집 : 비슷한 샘플끼리 하나의 그룹으로 모으는 대표적인 비지도 학습 작업

클러스터 : 군집 알고리즘에서 만든 그룹

---

### 2. 비지도 학습

#### 2 - 1. 과일 사진 데이터 준비

```python
!wget https://bit.ly/fruits_300_data -O fruits_300.npy
import numpy as np
import matplotlib.pyplot as plt
```

여기서 !는 코랩의 코드 셀에서 리눅스 셀 명령어로 인식하고 wget 명령은 원격 주소에서 데이터를 다운로드하여 저장합니다. 이 명령어를 실행하면 fruit_300.npy가 저장된것을 확인한 후에 load로 데이터를 불러옵니다.

```python
fruits = np.load('fruits_300.npy')
```

첫번째 차원(300)은 샘플의 개수를 나타내고, 두 번째 차원(100)은 이미지 높이, 세번째 차원(100)은 이미지 너비입니다.

```python
print(fruits.shape)
```

    (300, 100, 100)

첫 번째 행에 있는 픽셀 100개에 들어 있는 값을 출력해봅니다.

```python
print(fruits[0,0,:])
```

    [  1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   2   1
       2   2   2   2   2   2   1   1   1   1   1   1   1   1   2   3   2   1
       2   1   1   1   1   2   1   3   2   1   3   1   4   1   2   5   5   5
      19 148 192 117  28   1   1   2   1   4   1   1   3   1   1   1   1   1
       2   2   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1
       1   1   1   1   1   1   1   1   1   1]

첫 이미지는 사과로 추정이됩니다. 0에 가까울수록 검게 나타나고 높은 값은 밝게 표시가 된것을 확인해볼 수 있습니다.

```python
plt.imshow(fruits[0], cmap='gray')
plt.show()
```

![png](https://i.esdrop.com/d/f/uVJApfFjHN/5XFBFu7s5W.jpg)

우리가 봐야할 대상은 바탕이 아닌 사과입니다. 고로 흰색 바탕은 우리에게 중요하지 않고 사과가 중요하기 때문에 바탕을 검게 만들고 사과를 밝게 만들겠습니다. 'gray_r'을 사용하면 반전하여 우리 눈에 편하게 해줍니다.

```python
plt.imshow(fruits[0], cmap='gray_r')
plt.show()
```

![png](https://i.esdrop.com/d/f/uVJApfFjHN/nKho5mkiF4.jpg)

바나나와 파인애플도 출력해보겠습니다.

```python
fig,axs = plt.subplots(1,2)
axs[0].imshow(fruits[100], cmap='gray_r')
axs[1].imshow(fruits[200], cmap='gray_r')
plt.show()
```

![png](https://i.esdrop.com/d/f/uVJApfFjHN/99lmOOo8CT.jpg)

#### 2 - 2. 픽셀값 분석하기

사용하기 쉽게하기 위해 데이터를 사과, 파인애플, 바나나로 각각 나누어 줍니다. 이미지로는 출력하기에는 불편하지만 배열을 계산할 때는 편리합니다. reshap(-1,100\*100)을 사용해 차원을 할당해 줍니다.

```python
apple = fruits[0:100].reshape(-1,100*100)
pineapple = fruits[100:200].reshape(-1,100*100)
banana = fruits[200:300].reshape(-1,100*100)
```

```python
print(apple.shape)
```

    (100, 10000)

```python
print(apple.mean(axis = 1))
```

    [ 88.3346  97.9249  87.3709  98.3703  92.8705  82.6439  94.4244  95.5999
      90.681   81.6226  87.0578  95.0745  93.8416  87.017   97.5078  87.2019
      88.9827 100.9158  92.7823 100.9184 104.9854  88.674   99.5643  97.2495
      94.1179  92.1935  95.1671  93.3322 102.8967  94.6695  90.5285  89.0744
      97.7641  97.2938 100.7564  90.5236 100.2542  85.8452  96.4615  97.1492
      90.711  102.3193  87.1629  89.8751  86.7327  86.3991  95.2865  89.1709
      96.8163  91.6604  96.1065  99.6829  94.9718  87.4812  89.2596  89.5268
      93.799   97.3983  87.151   97.825  103.22    94.4239  83.6657  83.5159
     102.8453  87.0379  91.2742 100.4848  93.8388  90.8568  97.4616  97.5022
      82.446   87.1789  96.9206  90.3135  90.565   97.6538  98.0919  93.6252
      87.3867  84.7073  89.1135  86.7646  88.7301  86.643   96.7323  97.2604
      81.9424  87.1687  97.2066  83.4712  95.9781  91.8096  98.4086 100.7823
     101.556  100.7027  91.6098  88.8976]

숫자로는 알아보기 힘드니까 히스토그램으로 알아봅니다.
바나나의 경우 평균값은 40아래에 집중되어 있고 사과와 파인애플은 겹쳐보입니다. 즉 사과와 파인애플을 구별하기 어렵습니다.

```python
plt.hist(np.mean(apple, axis=1), alpha=0.8)
plt.hist(np.mean(pineapple,axis=1), alpha = 0.8)
plt.hist(np.mean(banana, axis = 1), alpha = 0.8)
plt.legend(['apple', 'pineapple', 'banana'])
plt.show
```

    <function matplotlib.pyplot.show>

![png](https://i.esdrop.com/d/f/uVJApfFjHN/8nCfKU4w22.jpg)

샘플의 평균값이 아닌 픽셀별 평균값을 비교해 보겠습니다. 평균을 계산하는 것은 axis=0으로 지정해주면 됩니다.

```python
fig, axs = plt.subplots(1, 3, figsize=(20, 5))
axs[0].bar(range(10000), np.mean(apple, axis=0))
axs[1].bar(range(10000), np.mean(pineapple, axis=0))
axs[2].bar(range(10000), np.mean(banana, axis=0))
plt.show()
```

![png](https://i.esdrop.com/d/f/uVJApfFjHN/Dk87RjepAF.jpg)

100 X 100으로 바꿔서 이미지처럼 출력해 위 그래프와 비교해봅니다.

```python
apple_mean = np.mean(apple,axis=0).reshape(100,100)
pineapple_mean = np.mean(pineapple,axis=0).reshape(100,100)
banana_mean = np.mean(banana, axis=0).reshape(100,100)
fig, axs = plt.subplots(1, 3, figsize=(20, 5))
axs[0].imshow(apple_mean, cmap='gray_r')
axs[1].imshow(pineapple_mean, cmap='gray_r')
axs[2].imshow(banana_mean, cmap='gray_r')
plt.show()
```

![png](https://i.esdrop.com/d/f/uVJApfFjHN/U6GK09Emma.jpg)

#### 2 - 3. 평균값과 가까운 사진 고르기

절댓값 함수인 abs()를 사용하여 apple_mean과 오차가 가장 작은 샘플 100개를 골라봅니다. 그 후 subplots()함수를 사용해 100개의 사진을 출력해봅니다.

```python
abs_diff = np.abs(fruits - apple_mean)
abs_mean = np.mean(abs_diff, axis=(1,2))
print(abs_mean.shape)
```

    (300,)

```python
apple_index = np.argsort(abs_mean)[:100]
fig,axs = plt.subplots(10,10,figsize=(10,10))
for i in range(10):
  for j in range(10):
      axs[i,j].imshow(fruits[apple_index[i*10+j]],cmap='gray_r')
      axs[i, j].axis('off')
plt.show()
```

![png](https://i.esdrop.com/d/f/uVJApfFjHN/s0Tg2QK1Zq.jpg)

공부한 전체 코드는 깃허브에 올렸습니다.
<https://github.com/mgskko/Data_science_Study-hongongmachine/blob/main/%ED%98%BC%EA%B3%B5%EB%A8%B8%EC%8B%A0_6%EA%B0%95_1.ipynb>
