---
layout: single
title: "보스톤_데이타 처리"
categories: 데이터_분석
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

## 3개 연도(15~17) 데이터 합치기

```python
# lib 및 파일 로드
# 데이터 다운로드 : 캐글 -> "finishers boston marathon 2015,2016&2017"

import pandas as pd
import numpy as np

marathon_2015 = pd.read_csv('./data_boston/marathon_results_2015.csv')
marathon_2016 = pd.read_csv('./data_boston/marathon_results_2016.csv')
marathon_2017 = pd.read_csv('./data_boston/marathon_results_2017.csv')


# 각 데이터 year 컬럼 생성
marathon_2015['Year'] = '2015'
marathon_2016['Year'] = '2016'
marathon_2017['Year'] = '2017'
```

### 하나의 데이터로 만들기 (concat 활용)

```python
# concat으로 세개의 데이터 하나로 합치기
marathon_2015_2017 = pd.concat([marathon_2015, marathon_2016, marathon_2017], ignore_index=True, sort=False)
```

```python
# 불필요한 컬럼 삭제
marathon_2015_2017 = marathon_2015_2017.drop(['Unnamed: 0', 'Bib', 'Citizen', 'Unnamed: 9', 'Proj Time', 'Unnamed: 8'], axis=1)
```

### 시간기록(시:분:초) -> 초 단위로 변환 (timedelta 활용)

```python
# 거리별 구분
distance_div = list(marathon_2015_2017.columns[6:17]) # 5K ~ official time
```

```python
# for문과 timedelta 활용해서 초단위로 변환
for i in distance_div:
    marathon_2015_2017[marathon_2015_2017[i]=='-'] = 0
    marathon_2015_2017[i] = pd.to_timedelta(marathon_2015_2017[i]).astype('m8[s]').astype(np.int64)
```

```python
marathon_2015_2017.to_csv("boston_15_17.csv", encoding='utf-8-sig')
```
