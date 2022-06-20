---
layout: single
title:  "13_Visualization_Anscombe"
categories : python
tag : [review]
search: true #false로 주면 검색해도 안나온다.
---

```python
import warnings
warnings.filterwarnings('ignore')
from IPython.display import Image
import numpy as np
import pandas as pd

import matplotlib.pyplot as plt #그래프
import seaborn as sns
import matplotlib as mpl

#한글 폰트를 사용할 때 마이너스 데이터가 깨져
#보이는 문제를 해결한다.
mpl.rcParams['axes.unicode_minus'] = False

plt.rcParams['font.family'] = 'NanumGothicCoding'
plt.rcParams['font.size'] = 15
```


```python
#사람의 눈은 수백 줄의 텍스트만으로 이루어진 데이터를
#읽거나 기초 통계 수치를 계산하는 방법으로는 데이터를
#제데로 분석할 수 없기 때문에, 데이터에 숨겨진 패턴을
#파악하기 위해 데이터 시각화를 사용한다.

#엔스콤 4분할 그래프
#데이터를 시각화하지 않고 수치만 확인햇을 때 발생할 수 
#있는 함정을 보여주기 위해 만든 그래프
#데이터 집합은 4개의 그룹으로 구성되어 있으며 4개의 데이터
#그룹은 각각 평균, 분산과 같은 수치나 상관관계, 회귀선이
#모두 같다는 특징이 있다. 그래서 이런 결과를 보면 4개의
#데이터 그룹의 데이터는 모두 같을 것이라 착각할 수 있다.
```


```python
#앤스콤 데이터 집합은 seaborn 라이브러리에 포함되어 있다.
#seaborn 라이브러리의 load_dataset()함수의 인수로 'anscombe'을
#전달하면 엔스콤 데이터 집합을 불러올 수 있다.
anscombe = sns.load_dataset('anscombe')
anscombe
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
      <th>dataset</th>
      <th>x</th>
      <th>y</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>I</td>
      <td>10.0</td>
      <td>8.04</td>
    </tr>
    <tr>
      <th>1</th>
      <td>I</td>
      <td>8.0</td>
      <td>6.95</td>
    </tr>
    <tr>
      <th>2</th>
      <td>I</td>
      <td>13.0</td>
      <td>7.58</td>
    </tr>
    <tr>
      <th>3</th>
      <td>I</td>
      <td>9.0</td>
      <td>8.81</td>
    </tr>
    <tr>
      <th>4</th>
      <td>I</td>
      <td>11.0</td>
      <td>8.33</td>
    </tr>
    <tr>
      <th>5</th>
      <td>I</td>
      <td>14.0</td>
      <td>9.96</td>
    </tr>
    <tr>
      <th>6</th>
      <td>I</td>
      <td>6.0</td>
      <td>7.24</td>
    </tr>
    <tr>
      <th>7</th>
      <td>I</td>
      <td>4.0</td>
      <td>4.26</td>
    </tr>
    <tr>
      <th>8</th>
      <td>I</td>
      <td>12.0</td>
      <td>10.84</td>
    </tr>
    <tr>
      <th>9</th>
      <td>I</td>
      <td>7.0</td>
      <td>4.82</td>
    </tr>
    <tr>
      <th>10</th>
      <td>I</td>
      <td>5.0</td>
      <td>5.68</td>
    </tr>
    <tr>
      <th>11</th>
      <td>II</td>
      <td>10.0</td>
      <td>9.14</td>
    </tr>
    <tr>
      <th>12</th>
      <td>II</td>
      <td>8.0</td>
      <td>8.14</td>
    </tr>
    <tr>
      <th>13</th>
      <td>II</td>
      <td>13.0</td>
      <td>8.74</td>
    </tr>
    <tr>
      <th>14</th>
      <td>II</td>
      <td>9.0</td>
      <td>8.77</td>
    </tr>
    <tr>
      <th>15</th>
      <td>II</td>
      <td>11.0</td>
      <td>9.26</td>
    </tr>
    <tr>
      <th>16</th>
      <td>II</td>
      <td>14.0</td>
      <td>8.10</td>
    </tr>
    <tr>
      <th>17</th>
      <td>II</td>
      <td>6.0</td>
      <td>6.13</td>
    </tr>
    <tr>
      <th>18</th>
      <td>II</td>
      <td>4.0</td>
      <td>3.10</td>
    </tr>
    <tr>
      <th>19</th>
      <td>II</td>
      <td>12.0</td>
      <td>9.13</td>
    </tr>
    <tr>
      <th>20</th>
      <td>II</td>
      <td>7.0</td>
      <td>7.26</td>
    </tr>
    <tr>
      <th>21</th>
      <td>II</td>
      <td>5.0</td>
      <td>4.74</td>
    </tr>
    <tr>
      <th>22</th>
      <td>III</td>
      <td>10.0</td>
      <td>7.46</td>
    </tr>
    <tr>
      <th>23</th>
      <td>III</td>
      <td>8.0</td>
      <td>6.77</td>
    </tr>
    <tr>
      <th>24</th>
      <td>III</td>
      <td>13.0</td>
      <td>12.74</td>
    </tr>
    <tr>
      <th>25</th>
      <td>III</td>
      <td>9.0</td>
      <td>7.11</td>
    </tr>
    <tr>
      <th>26</th>
      <td>III</td>
      <td>11.0</td>
      <td>7.81</td>
    </tr>
    <tr>
      <th>27</th>
      <td>III</td>
      <td>14.0</td>
      <td>8.84</td>
    </tr>
    <tr>
      <th>28</th>
      <td>III</td>
      <td>6.0</td>
      <td>6.08</td>
    </tr>
    <tr>
      <th>29</th>
      <td>III</td>
      <td>4.0</td>
      <td>5.39</td>
    </tr>
    <tr>
      <th>30</th>
      <td>III</td>
      <td>12.0</td>
      <td>8.15</td>
    </tr>
    <tr>
      <th>31</th>
      <td>III</td>
      <td>7.0</td>
      <td>6.42</td>
    </tr>
    <tr>
      <th>32</th>
      <td>III</td>
      <td>5.0</td>
      <td>5.73</td>
    </tr>
    <tr>
      <th>33</th>
      <td>IV</td>
      <td>8.0</td>
      <td>6.58</td>
    </tr>
    <tr>
      <th>34</th>
      <td>IV</td>
      <td>8.0</td>
      <td>5.76</td>
    </tr>
    <tr>
      <th>35</th>
      <td>IV</td>
      <td>8.0</td>
      <td>7.71</td>
    </tr>
    <tr>
      <th>36</th>
      <td>IV</td>
      <td>8.0</td>
      <td>8.84</td>
    </tr>
    <tr>
      <th>37</th>
      <td>IV</td>
      <td>8.0</td>
      <td>8.47</td>
    </tr>
    <tr>
      <th>38</th>
      <td>IV</td>
      <td>8.0</td>
      <td>7.04</td>
    </tr>
    <tr>
      <th>39</th>
      <td>IV</td>
      <td>8.0</td>
      <td>5.25</td>
    </tr>
    <tr>
      <th>40</th>
      <td>IV</td>
      <td>19.0</td>
      <td>12.50</td>
    </tr>
    <tr>
      <th>41</th>
      <td>IV</td>
      <td>8.0</td>
      <td>5.56</td>
    </tr>
    <tr>
      <th>42</th>
      <td>IV</td>
      <td>8.0</td>
      <td>7.91</td>
    </tr>
    <tr>
      <th>43</th>
      <td>IV</td>
      <td>8.0</td>
      <td>6.89</td>
    </tr>
  </tbody>
</table>
</div>


```python
print(anscombe[anscombe['dataset'] == 'I'].mean())
print('=' * 30)
print(anscombe[anscombe['dataset'] == 'II'].mean())
print('=' * 30)
print(anscombe[anscombe['dataset'] == 'III'].mean())
print('=' * 30)
print(anscombe[anscombe['dataset'] == 'IV'].mean())
```

    x    9.000000
    y    7.500909
    dtype: float64
    ==============================
    x    9.000000
    y    7.500909
    dtype: float64
    ==============================
    x    9.0
    y    7.5
    dtype: float64
    ==============================
    x    9.000000
    y    7.500909
    dtype: float64

```python
dataset_1 = anscombe[anscombe['dataset'] == 'I']
dataset_2 = anscombe[anscombe['dataset'] == 'II']
dataset_3 = anscombe[anscombe['dataset'] == 'III']
dataset_4 = anscombe[anscombe['dataset'] == 'IV']
```

       dataset     x      y
    0        I  10.0   8.04
    1        I   8.0   6.95
    2        I  13.0   7.58
    3        I   9.0   8.81
    4        I  11.0   8.33
    5        I  14.0   9.96
    6        I   6.0   7.24
    7        I   4.0   4.26
    8        I  12.0  10.84
    9        I   7.0   4.82
    10       I   5.0   5.68

```python
#plot() 함수로 그래프를 그린다. plot()함수의
#x,y축으로 데이터를 전달하면 그래프가 나타난다.
plt.plot(dataset_1['x'],dataset_1['y'], 'ro')
plt.show()
```

![output_5_0](../../images/2022-06-03-12_Visualization_Anscombe/output_5_0.png){: width="100%" height="100%"}

```python
plt.plot(dataset_2['x'],dataset_2['y'], 'bs')
plt.show()
```


![output_6_0](../../images/2022-06-03-12_Visualization_Anscombe/output_6_0.png){: width="100%" height="100%"}

```python
plt.plot(dataset_3['x'],dataset_3['y'], 'g^')
plt.show()
```


![output_7_0](../../images/2022-06-03-12_Visualization_Anscombe/output_7_0.png){: width="100%" height="100%"}

```python
plt.plot(dataset_4['x'],dataset_4['y'], 'm*')
plt.show()
```

![output_8_0](../../images/2022-06-03-12_Visualization_Anscombe/output_8_0.png){: width="100%" height="100%"}

```python
# figure() 함수로 전체 그래프가 그려질 기본 틀을 만든다.
fig = plt.figure()
plt.rcParams['figure.figsize'] = [10, 10]

#add_subplot()함수로 그래프가 그려질 격자를 만든다.
#=> add_subplot(행, 열, 위치)
axes1 = fig.add_subplot(2,2,1)
axes2 = fig.add_subplot(2,2,2)
axes3 = fig.add_subplot(2,2,3)
axes4 = fig.add_subplot(2,2,4)

#plot()함수로 격자에 데이터를 전달해 그래프를 그린다.
axes1.plot(dataset_1['x'],dataset_1['y'], 'ro')
axes2.plot(dataset_2['x'],dataset_2['y'], 'bs')
axes3.plot(dataset_3['x'],dataset_3['y'], 'g^')
axes4.plot(dataset_4['x'],dataset_4['y'], 'm*')

#set_title()함수로 각각의 그래프에 제목을 추가할 수 있다.
axes1.set_title('dataset_1')
axes2.set_title('dataset_2')
axes3.set_title('dataset_3')
axes4.set_title('dataset_4')

#suptitle()함수로 그래프 전체의 제목을 추가할 수 있다.
fig.suptitle('앤스콤 데이터 그래프')

plt.show()
```


![output_9_0](../../images/2022-06-03-12_Visualization_Anscombe/output_9_0.png){: width="100%" height="100%"}
