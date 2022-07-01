---
layout: single
title:  "28_Least_Square_Approximation_최소제곱법"
categories : python
tag : [review]
search: true #false로 주면 검색해도 안나온다.
---

```python
import warnings 
warnings.filterwarnings('ignore')
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
```


```python
#최서 제곱법으로 기울기와 y절편을 계산할 데이터를 만든다.
x = [2,4,6,8] #공부한 시간
y = [81,93,91,97] #시험 점수
```


```python
# 공부한 시간과 시험점수 데이터를 판다스 데이터프레임으로 만든다.
# 빈 데이터프레임을 만든다.
df = pd.DataFrame(columns=['x', 'y'])

# 데이터프레임에 데이터를 넣어줄 때 loc[index]를 사용해서
# 리스트 형태의 데이터를 넣어주면 된다.
df.loc[0] = [2,81]
df.loc[1] = [4,93]
df.loc[2] = [6,91]
df.loc[3] = [8,97]
df
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
      <th>x</th>
      <th>y</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2</td>
      <td>81</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4</td>
      <td>93</td>
    </tr>
    <tr>
      <th>2</th>
      <td>6</td>
      <td>91</td>
    </tr>
    <tr>
      <th>3</th>
      <td>8</td>
      <td>97</td>
    </tr>
  </tbody>
</table>
</div>




```python
# 공부한 시간과 시험 점수 시각화
plt.figure(figsize=[12,8])
sns.scatterplot(data=df, x='x', y='y', s=100)
plt.show()
```


    
![png](output_3_0.png)
    


기울기 공식 => ∑(x-x의 평균)(y-y의 평균) / ∑(x-x의 평균)(x-x의 평균)


```python
mean_x = np.mean(x) # 공부 시간의 평균
mean_y = np.mean(y) # 시험 점수의 평균 => 실제값
print('공부한 시간의 평군 : {}, 시험 점수의 평균 : {}'.format(mean_x,mean_y))
```

    공부한 시간의 평군 : 5.0, 시험 점수의 평균 : 90.5
    


```python
# 기울기 공식이 분자를 계산하는 함수
def top(x, mean_x, y, mean_y):
    total = 0.0;
    for i in range(len(x)):
        total +=(x[i]-mean_x)*(y[i]-mean_y)
    return total
dividend = top(x, mean_x, y, mean_y)
print(dividend)
```

    46.0
    


```python
# 기울기 공식의 분모를 계산하는 함수
def bottom(x, mean_x):
    total = 0.0;
    for i in range(len(x)):
        total +=(x[i]-mean_x)**2
    return total
divisor = bottom(x, mean_x)
print(divisor)
```

    20.0
    


```python
divisor = sum([(i-mean_x)**2 for i in x])
print(divisor)
```

    20.0
    

기울기와 y절편을 계산한다.  
y절편 공식 => y의 평균 - (x의 평균 * 기울기)


```python
a = dividend / divisor #기울기
b = mean_y - (mean_x * a) # y절편
print('기울기 : {}, y절편 : {}'.format(a,b))
```

    기울기 : 2.3, y절편 : 79.0
