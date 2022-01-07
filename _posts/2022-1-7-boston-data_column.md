---
layout: single
title: "보스톤_컬럼차트"
categories: boston_data
tag:
  [
    python,
    blog,
    github,
    image,
    data,
    timedelta,
    boston,
    data,
    marathon,
    bigdata,
    파이썬,
    데이터,
  ]
toc: true
sidebar:
  nav: "docs"
---

# 보스턴마라톤 시각화 (파이썬)

## 1. column 차트

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

참가자 나이 많은순으로 column chart 그리기

```python
# 미국인 데이터만 가져오기
USA_runner = marathon_2015_2017[marathon_2015_2017.Country=='USA']
```

### (1) State 별 runner수

```python
# column 그래프 그리기(필수)
plt.figure(figsize=(20, 7))                                # 그래프 크기
runner_state = sns.countplot('State', data=USA_runner)      # 그래프 함수 : sns.countplot() 사용

# column 그래프 부가 설명(옵션)
runner_state.set_title('Number of runner by State - USA', fontsize=25)   # 제목
runner_state.set_xlabel('State', fontdict={'size':16})                   # x축 이름
runner_state.set_ylabel('Number of runner', fontdict={'size':16})        # y축 이름
plt.show()
```

```python
### (2) State, Gender 별 runner 수
```

```python
# column 그래프 그리기(필수)
plt.figure(figsize=(20, 10))                                                                   # 그래프 크기
runner_state = sns.countplot('State', data=USA_runner, hue='M/F', palette={'F':'g', 'M':'r'})  # 그래프 함수 : sns.countplot() 사용
                                                      # hue : 칼럼명 기준으로 데이터 구분해줌
# column 그래프 부가 설명(옵션)
runner_state.set_title('Number of runner by State, Gender - USA', fontsize=18)   # 제목
runner_state.set_xlabel('State', fontdict={'size':16})                   # x축 이름
runner_state.set_ylabel('Number of runner', fontdict={'size':16})        # y축 이름
plt.show()
```

### (3) 년도별 runner 수

```python
# column 그래프 그리기(필수)
plt.figure(figsize=(20, 10))                                                                   # 그래프 크기
runner_state = sns.countplot('State', data=USA_runner, hue='Year')  # 그래프 함수 : sns.countplot() 사용
                                                      # hue : 칼럼명 기준으로 데이터 구분해줌
# column 그래프 부가 설명(옵션)
runner_state.set_title('Number of runner by State, Year - USA', fontsize=18)   # 제목
runner_state.set_xlabel('State', fontdict={'size':16})                   # x축 이름
runner_state.set_ylabel('Number of runner', fontdict={'size':16})        # y축 이름
plt.show()
```
