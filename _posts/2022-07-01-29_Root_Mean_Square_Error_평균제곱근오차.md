---
layout: single
title:  "29_Root_Mean_Square_Error_평균제곱근오차"
categories : python
tag : [review]
search: true #false로 주면 검색해도 안나온다.
---

평균 제곱근 오차(Root Mean Squre Error, RMSE)  
임의의 선을 그리고 난 후 이선이 얼마나 잘 그려졌는지  
평가해서 조금씩 수정해 나간다. 이를 위해서 주어진  
선의 오차를 평가하는 알고리즘이 필요한데 그 중에서  
가장 많이 사용되는 방법이 평균 제곱근 오차이다.


```python
import warnings 
warnings.filterwarnings('ignore')
import numpy as np
import pandas as pd
```


```python
#x, y의 데이터 값이 한건씩 저장된 리스트
#=>[공부한 시간(x), 실제성적(y)]
data = [[2,81],[4,93],[6,91],[8,97]]

#기울기 a와 y절편 b를 임의로 정한다.
#=>[기울기, y절편]
ab=[2.3, 79]

for i in data:
    print('공부한 시간 : {}, 실제 성적 : {}'.format(i[0], i[1]))
```

    공부한 시간 : 2, 실제 성적 : 81
    공부한 시간 : 4, 실제 성적 : 93
    공부한 시간 : 6, 실제 성적 : 91
    공부한 시간 : 8, 실제 성적 : 97



```python
#x,y의 데이터 값이 한건씩 저장된 2차원 리스트에서 공부한 
#시간(x)와 실제성적(y)를 뽑아내서 별도의 리스트에 저장한다.
x=[i[0] for i in data] #공부한 시간
y=[i[1] for i in data] #시험 성적(실제성적)

for i in range(len(x)):
    print('공부한 시간 : {}, 실제 성적 : {}'.format(x[i], y[i]))
```

    공부한 시간 : 2, 실제 성적 : 81
    공부한 시간 : 4, 실제 성적 : 93
    공부한 시간 : 6, 실제 성적 : 91
    공부한 시간 : 8, 실제 성적 : 97

```python
#y=a*x+b에 a(기울기), b(y절편) 값을 대입해서 결과(예측 성적)를
#계산해서 리턴하는 함수
def predict(x):
    return ab[0]*x+ab[1]
```


```python
#임의로 정한 기울기와 y절편으로 예측 성적을 계산한다.
predict_result = [] #예측 성적이 저장될 빈 리스트를 선언한다.

#모든 공부 시간(x) 값을 한 번씩 대입해서 예측 성적 리스트를
#완성한다.
for i in range(len(x)):
    #공부한 시간에 따른 예측 성적을 계산하는 함수인
    #predict()를 실행해서 얻어진 예측 성적을
    #predict_result에 추가한다.
    predict_result.append(predict(x[i]))
    print('공부한 시간 : {}, 실제 성적 : {}, 예측 성적 : {}'.format(x[i], y[i], predict_result[i]))
```

    공부한 시간 : 2, 실제 성적 : 81, 예측 성적 : 83.6
    공부한 시간 : 4, 실제 성적 : 93, 예측 성적 : 88.2
    공부한 시간 : 6, 실제 성적 : 91, 예측 성적 : 92.8
    공부한 시간 : 8, 실제 성적 : 97, 예측 성적 : 97.4



```python
#평균 제곱근 오차를 계산하는 함수
#rmse(예측 성적, 실제 성적) => 한 번의 연산으로 처리하기 위해 넘겨받는
#데이터는 넘파이 배열 타입으로 넘겨받는다.
def rmse(predict_result, y):
    return np.sqrt(((predict_result-y)**2).mean())
```


```python
#평균 제곱근 오차를 계산하기 위해 파이썬 리스트 타입의 데이터를
#넘파이 배열로 만들어 평균 제곱근 오차를 계산하는 함수를 호출하는 함수
def rmse_val(predict_result, y):
    return rmse(np.array(predict_result), np.array(y))
```


```python
#평균 제곱근 오차를 출력한다
rmse_result = rmse_val(predict_result, y)
print('RMSE(평균 제곱근 오차) : {}'.format(rmse_result))
```

    RMSE(평균 제곱근 오차) : 2.880972058177584

임의로 지정한 기울기(a = 3)와 y절편(b=76)은 3.3166247903554의 평균 제곱근 오차가  발생 되는 것을 알 수 있다. 이제 남은 일은 이 오차를 줄이면서 새로운 선을 긋는 일이다. 이를 위해 기울기와 y절편을 적절히 조정하면서 오차의 변화를 오차가 최소가 되는 기울기와 y절편을 찾아야 한다. 25_Least_Square_Approximation_최소제곱법 예제에서 계산한 기울기와 y절편을 사용시 2.880972058177584의 평균 제곱근 오차가 발생된다.
