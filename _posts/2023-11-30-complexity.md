---
published: true
title: "Complexity"

categories: CodingTest
tag: [codingtest, complexity, algorithm]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

date: 2023-11-30
---
<br>
<br>

# Complexity

시간 복잡도 O(n) : 특정한 크기의 입력에 대하여 알고리즘이 얼마나 오래걸리는가

공간 복잡도 : 특정한 크기의 입력에 대하여 알고리즘이 얼마나 많은 메모리를 차지하는가

<br>
<br>

## 시간 복잡도

|빅오 표기법|명칭|
|:--------:|:-------:|
|**O(1)**|상수 시간|
|**O(logN)**|로그 시간|
|**O(N)**|선형 시간|
|**O(NlogN)**|로그 선형 시간|
|**O(N<sup>2</sup>)**|이차 시간|
|**O(N<sup>3</sup>)**|삼차 시간|
|**O(2<sup>n</sup>)**|지수 시간|

<br>
<br>

수행 시간 측정 소스코드
```python

import time
start_time = time.time() # 측정 시간

# 프로그램 소스코드
end_time = time.time()
printf("time : ", end_time - start_time) # 수행 시간 출력

```


