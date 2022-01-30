---
layout: single
title: "파이썬 시각화 2. 파레토차트"
categories: 데이터 시각화
tag:
  [
    python,
    crawling,
    blog,
    github,
    파이썬,
    시각화,
    차트,
    기초,
    트렌드,
    파악,
    마케팅,
  ]
toc: true
sidebar:
  nav: "docs"
---

# 보스턴마라톤 시각화 (파이썬)

## 2. Dual Axis, 파레토 차트

```python
# 라이브러리 및 파일가져오기

import pandas as pd
import numpy as np

import matplotlib.pyplot as plt  # 시각화 라이브러리
import seaborn as sns            # 시각화 라이브러리

from tqdm import tqdm_notebook   # for문 진행상황을 게이지로 알려줌

import warnings # 파이썬 warning 무시
warnings.filterwarnings(action='ignore')

marathon_2015_2017 = pd.read_csv('./boston_15_17.csv')
    # 데이터 처리 먼저해야 생기는 파일
```

### 1) 데이터 세팅

```python
#### 18세~59세 데이터만 가져오기 : isin()
runner_18_59 = marathon_2015_2017[marathon_2015_2017.Age.isin(range(18, 60))]
runner_18_59.head(2)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Unnamed: 0</th>
      <th>Name</th>
      <th>Age</th>
      <th>M/F</th>
      <th>City</th>
      <th>State</th>
      <th>Country</th>
      <th>5K</th>
      <th>10K</th>
      <th>15K</th>
      <th>...</th>
      <th>25K</th>
      <th>30K</th>
      <th>35K</th>
      <th>40K</th>
      <th>Pace</th>
      <th>Official Time</th>
      <th>Overall</th>
      <th>Gender</th>
      <th>Division</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>Desisa, Lelisa</td>
      <td>25</td>
      <td>M</td>
      <td>Ambo</td>
      <td>NaN</td>
      <td>ETH</td>
      <td>883</td>
      <td>1783</td>
      <td>2697</td>
      <td>...</td>
      <td>4567</td>
      <td>5520</td>
      <td>6479</td>
      <td>7359</td>
      <td>296</td>
      <td>7757</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>2015</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>Tsegay, Yemane Adhane</td>
      <td>30</td>
      <td>M</td>
      <td>Addis Ababa</td>
      <td>NaN</td>
      <td>ETH</td>
      <td>883</td>
      <td>1783</td>
      <td>2698</td>
      <td>...</td>
      <td>4567</td>
      <td>5519</td>
      <td>6479</td>
      <td>7362</td>
      <td>298</td>
      <td>7788</td>
      <td>2</td>
      <td>2</td>
      <td>2</td>
      <td>2015</td>
    </tr>
  </tbody>
</table>
<p>2 rows × 22 columns</p>
</div>

```python
#### 18~59세 나이대별로 카운트 : value_counts()
runner_18_59_counting = runner_18_59.Age.value_counts()
runner_18_59_counting.head(2)
```

    45    3217
    46    3019
    Name: Age, dtype: int64

### 2) x축, y축 세팅

```python
# x축 인덱스를 참가자 나이로 세팅
x = runner_18_59_counting.index
    # int 타입인 인덱스를 str로 변경해줘야함
    # 바꿔주지 않으면 x축이 범위값으로 잡힘

x = [str(i) for i in x] # int 값을 str 로 바꾸기
x[:4]
```

    ['45', '46', '40', '47']

```python
# y축 나이별 참가자수 나열
y = runner_18_59_counting.values

# 누적비율 구하기 : cumsum() 사용
ratio = y/y.sum()
ratio_sum = ratio.cumsum()
ratio_sum[:4]
```

    array([0.04403351, 0.08535684, 0.12256016, 0.15740918])

### 3) 그래프 그리기

```python
fig, barChart = plt.subplots(figsize=(20,8))  # 그래프 size

barChart.bar(x,y) # barChart 에 x,y 값 넣기

# 라인차트 생성
lineChart = barChart.twinx()
    # 두 개의 차트가 같은 x축, 다른 y축 사용하게 해줌
lineChart.plot(x, ratio_sum, '-g^', alpha = 0.5)  # alpha : 투명도

# 누적비율(라인차트 축) 레이블
ranges = lineChart.get_yticks() # y차트의 단위들
lineChart.set_yticklabels(['{0:.1%}'.format(x) for x in ranges])
# ranges

# 라인차트에 % 값 표시
ratio_sum_percentages = ['{0:.0%}'.format(x) for x in ratio_sum]
for i, txt in enumerate(ratio_sum_percentages):
    lineChart.annotate(txt, (x[i], ratio_sum[i]), fontsize=12)

# x, y label 만들기
barChart.set_xlabel('Age', fontdict={'size':16})
barChart.set_ylabel('Number of runner', fontdict={'size':16})

plt.title('Number of runner by Age', fontsize = 20);
```

![output_9_0](https://user-images.githubusercontent.com/67591105/148877004-e3a02106-52d6-412a-9a85-18c9660146ef.png)

-> 파레토 차트로 상위 그룹을 직관적으로 확인할 수 있다
