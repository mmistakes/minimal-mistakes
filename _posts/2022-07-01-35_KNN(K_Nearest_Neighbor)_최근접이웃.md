---
layout: single
title:  "35_KNN(K_Nearest_Neighbor)_최근접이웃"
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
import sklearn
```


```python
#basketball_stat.csv파일의 데이터를 데이터프레임으로
#읽어온다.
df = pd.read_csv('./data/basketball_stat.csv')
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
      <th>Player</th>
      <th>Pos</th>
      <th>3P</th>
      <th>2P</th>
      <th>TRB</th>
      <th>AST</th>
      <th>STL</th>
      <th>BLK</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Alex Abrines</td>
      <td>SG</td>
      <td>1.4</td>
      <td>0.6</td>
      <td>1.3</td>
      <td>0.6</td>
      <td>0.5</td>
      <td>0.1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Steven Adams</td>
      <td>C</td>
      <td>0.0</td>
      <td>4.7</td>
      <td>7.7</td>
      <td>1.1</td>
      <td>1.1</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Alexis Ajinca</td>
      <td>C</td>
      <td>0.0</td>
      <td>2.3</td>
      <td>4.5</td>
      <td>0.3</td>
      <td>0.5</td>
      <td>0.6</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Chris Andersen</td>
      <td>C</td>
      <td>0.0</td>
      <td>0.8</td>
      <td>2.6</td>
      <td>0.4</td>
      <td>0.4</td>
      <td>0.6</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Will Barton</td>
      <td>SG</td>
      <td>1.5</td>
      <td>3.5</td>
      <td>4.3</td>
      <td>3.4</td>
      <td>0.8</td>
      <td>0.5</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>95</th>
      <td>Nikola Vucevic</td>
      <td>C</td>
      <td>0.3</td>
      <td>6.1</td>
      <td>10.4</td>
      <td>2.8</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>96</th>
      <td>Dwyane Wade</td>
      <td>SG</td>
      <td>0.8</td>
      <td>6.2</td>
      <td>4.5</td>
      <td>3.8</td>
      <td>1.4</td>
      <td>0.7</td>
    </tr>
    <tr>
      <th>97</th>
      <td>Dion Waiters</td>
      <td>SG</td>
      <td>1.8</td>
      <td>4.3</td>
      <td>3.3</td>
      <td>4.3</td>
      <td>0.9</td>
      <td>0.4</td>
    </tr>
    <tr>
      <th>98</th>
      <td>Hassan Whiteside</td>
      <td>C</td>
      <td>0.0</td>
      <td>7.0</td>
      <td>14.1</td>
      <td>0.7</td>
      <td>0.7</td>
      <td>2.1</td>
    </tr>
    <tr>
      <th>99</th>
      <td>Lou Williams</td>
      <td>SG</td>
      <td>2.0</td>
      <td>3.3</td>
      <td>2.5</td>
      <td>3.0</td>
      <td>1.0</td>
      <td>0.2</td>
    </tr>
  </tbody>
</table>
<p>100 rows × 8 columns</p>
</div>


```python
df.Pos.value_counts()
```


    SG    50
    C     50
    Name: Pos, dtype: int64


```python
#seaborn 라이브러리의 lmplot()함수로 스틸과 2점슛, 어시스트와
#2점 슛의 포지션(Pos)별 분포도를 출력한다.
sns.lmplot(data=df,x='STL',y='2P',fit_reg=False, #데이터, x축,y축, 회귀선 표시 여부
           hue='Pos',                            #그래프에 표시될 표식의 색상
           scatter_kws={'s':50},                 #그래프에 표시될 표시의 크기
           markers=['o', 'x']                    #그래프에 표시할 마커의 모양
          )
plt.title('STL nd 2P in 2D Plane')

#스틸(STL), 이점슛(2P), 스틸(STL)는 어떤 포지션에서도 가능하다.
#즉 데이터 구분이 안된다.
sns.lmplot(data=df,x='AST',y='2P',fit_reg=False, 
           hue='Pos',                           
           scatter_kws={'s':50},                 
           markers=['o', 'x']
          )
plt.show()
```

![output_3_0](../../images/2022-07-01-35_KNN(K_Nearest_Neighbor)_최근접이웃/output_3_0.png){: width="100%" height="100%"}


![output_3_1](../../images/2022-07-01-35_KNN(K_Nearest_Neighbor)_최근접이웃/output_3_1.png){: width="100%" height="100%"}

```python
#seaborn 라이브러리의 lmplot()함수로 블로킹(BLK),3점슛,
#리바운드(TRB) 별 분포도를 출력한다.
#=>비교적 데이터구분이 잘 된다.
sns.lmplot(data=df,x='BLK',y='3P',fit_reg=False, 
           hue='Pos',                           
           scatter_kws={'s':50},                 
           markers=['o', 'x']
          )

sns.lmplot(data=df,x='TRB',y='3P',fit_reg=False, 
           hue='Pos',                           
           scatter_kws={'s':50},                 
           markers=['o', 'x']
          )
plt.show()
```


![output_4_0](../../images/2022-07-01-35_KNN(K_Nearest_Neighbor)_최근접이웃/output_4_0.png){: width="100%" height="100%"}


![output_4_1](../../images/2022-07-01-35_KNN(K_Nearest_Neighbor)_최근접이웃/output_4_1.png){: width="100%" height="100%"}


데이터 전처리


```python
#drop()함수로 불필요한 칼럼을 삭제한다.
#axis속성은 생락시 0이 기본값이며 행을 삭제하고
#1을 쓰면 열을 삭제한다.
#inplace 속성은 False가 기본값이며 함수가 실행된
#결과를 데이터에 반영하지 않고, True를 쓰면 실행된
#결과를 데이터에 반영된다.

#df=df.drop(['2P','AST', 'STL'], axis=1)
df.drop(['2P','AST', 'STL'], axis=1, inplace=True)
df.head()
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
      <th>Player</th>
      <th>Pos</th>
      <th>3P</th>
      <th>TRB</th>
      <th>BLK</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Alex Abrines</td>
      <td>SG</td>
      <td>1.4</td>
      <td>1.3</td>
      <td>0.1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Steven Adams</td>
      <td>C</td>
      <td>0.0</td>
      <td>7.7</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Alexis Ajinca</td>
      <td>C</td>
      <td>0.0</td>
      <td>4.5</td>
      <td>0.6</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Chris Andersen</td>
      <td>C</td>
      <td>0.0</td>
      <td>2.6</td>
      <td>0.6</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Will Barton</td>
      <td>SG</td>
      <td>1.5</td>
      <td>4.3</td>
      <td>0.5</td>
    </tr>
  </tbody>
</table>
</div>

전체 데이터를 무작위로 학습 데이터와 테스트 데이터로 분리한다.


```python
#학습 데이터와 테스트 데이터로 분리하기 위해
#sklearn패키지의 train_test_split()함수를 import해야 한다.
from sklearn.model_selection import train_test_split

#전체 80%를 학습용으로, 나머지 20%를 테스트용으로
#데이터를 분리한다.

#train, test = train_test_split(df, train_size=0.8)
#train, test = train_test_split(df, test_size=0.2)
#위에와 같은 의미다.
train, test = train_test_split(df,train_size=0.8, test_size=0.2)

#행의 개수 출력
print(train.shape[0])   #학습 데이터 행의 숫자
print(test.shape[0])    #테스트 데이터의 행의 숫자
```

    80
    20


최적의 KNN파라미터 찾기


```python
#sklearn의 cross_val_score()함수의 k-fold 교차 검증을
#사용해서 KNN알고리즘의 조절 가능한 단 하나의 변수
#K를 찾는다.
#k-fold 교차 검즘은 기존 데이터를 k개로 나눠서 k번
#정확도를 검증하는 것이다.
from sklearn.model_selection import cross_val_score
from sklearn.neighbors import KNeighborsClassifier
```


```python
#최적의 k를 차기 위해서 교차 검증을 수행할 k의 범위를 3부터
#학습 데이터 개수의 절반까지 지정한다.
k_list=[]
for i in range(3,train.shape[0]//2, 2):
    k_list.append(i)
print(k_list)
```

    [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39]

```python
#각각의 k별 10-fold 교차 검증 결과의 평균을
#기억할 빈 리스트를 선언한다.
cross_validation_scores = []

#학습 데이터에서 학습에 사용할 데이터를 저장한다.
#('3P', 'TRB', 'BLK'를 통해 포지션 알아맞추기)
x_train = train[['3P', 'TRB', 'BLK']]

#학습 데이터에서 학습 결과로 사용할 데이터를 저장한다.
y_train = train[['Pos']]  #실제값
```

학습 데이터를 10조각으로 나눠 한조각을 검증 데이터로  
사용하고 나머지 9조각을 학습 데이터로 사용한다.  
첫번째 조각번터 열번재 조각까지 한번씩 검증하고  
열번 검증 결과를 10으로 나눈 평균을 검증 결과의 점수로 한다. 

cross_val_score(model, X, Y, scoring=None, cv=None)  

model : 회귀 분석 모델  
X&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 독릭 변수 데이터(학습 데이터)      
Y&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 종속 변수 데이터(학습 결과)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;학습에 따른 결과는 1차원 형태로 지정해야 한다.  
scoring=None : 성능 검증에 사용할 매개 변수에 원하는  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;평가 지표를 지정한다.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=>정확도를 의미하는 'accuracy'를 입력한다.  
cv=None&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 교차 검증 생성기 객체 또는 숫자, None일 경우  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;KFold(3), 숫자를 지정하면 KFold(숫자)


```python
#10-fold교차 검증을 각 k를 대상으로 수행해 검증 결과를 저장한다.
for k in k_list:
    #KNeighborsClassifier()함수의 n_neighbors속성에 knn모델에서
    #사용할 이웃의 개수를 지정하 kNN모델을 만든다.
    knn = KNeighborsClassifier(n_neighbors=k)
    
    #학습에 따른 결과는 1차원 형태로 지정해야 하므로 학습 결과에
    #values.ravel()를 사용해서 2차원(여러개의 행 하나의 열의 결과)을 
    #1차원으로 변경해야 한다.
    scores = cross_val_score(knn, x_train, y_train.values.ravel())
    cross_validation_scores.append(scores.mean())
print(cross_validation_scores)
```

    [0.9, 0.925, 0.9375, 0.9375, 0.925, 0.925, 0.925, 0.9125, 0.9125, 0.9125, 0.9, 0.9, 0.8625, 0.875, 0.875, 0.85, 0.85, 0.85, 0.825]


각 k별로 출력된 정확도가 쉽게 이해되지 않기 대문에  
시각화를 해서 최적의 k를 확인한다.


```python
plt.plot(k_list, cross_validation_scores)
plt.xlabel('the number of k')
plt.ylabel('accuracy')
plt.show()
```


![output_16_0](../../images/2022-07-01-35_KNN(K_Nearest_Neighbor)_최근접이웃/output_16_0.png){: width="100%" height="100%"}

```python
#예측율이 가장 높은 k를 선정한다.
#cross_validation_scores에서 최대값의 인덱스를 얻어와 k_list에서 얻어오고
#optimal_k에 저장한다.

#참고
#k_list=[]
#for i in range(3,train.shape[0]//2, 2):
#    k_list.append(i)
#print(k_list)

optimal_k = k_list[cross_validation_scores.index(max(cross_validation_scores))]
print('최적의 k : {}'.format(optimal_k))
```

    최적의 k : 7


모델 테스트


```python
from sklearn.metrics import accuracy_score
```


```python
# 분별력이 있다고 판단된 3점슛(3P), 블로킹(BLK), 리바운드(TRB) 속성으로 모듈을 학습한 후 테스트를 진행한다.
knn = KNeighborsClassifier(n_neighbors=optimal_k)
# 학습에 사용할 속성과 예측값을 지정한다.
x_train = train[['3P', 'TRB', 'BLK']]
y_train = train[['Pos']]
knn.fit(x_train, y_train.values.ravel())

# 테스트에 사용할 속성과 포지션에 대한 정답을 지정한다.
x_test = test[['3P', 'TRB', 'BLK']]
y_test = test[['Pos']]

# 테스트를 수행한다. 정확도를 계산한다.
predict = knn.predict(x_test) # 예측값
# 모델 예측 정확도를 계산한다.
print('정확도: {}'.format(accuracy_score(y_test.values.ravel(), predict)))
```

    정확도: 0.9

```python
comparison = pd.DataFrame({'실제값':y_test.values.ravel(), '예측값':predict})
comparison
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
      <th>실제값</th>
      <th>예측값</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>SG</td>
      <td>SG</td>
    </tr>
    <tr>
      <th>1</th>
      <td>C</td>
      <td>C</td>
    </tr>
    <tr>
      <th>2</th>
      <td>SG</td>
      <td>SG</td>
    </tr>
    <tr>
      <th>3</th>
      <td>C</td>
      <td>C</td>
    </tr>
    <tr>
      <th>4</th>
      <td>SG</td>
      <td>C</td>
    </tr>
    <tr>
      <th>5</th>
      <td>SG</td>
      <td>SG</td>
    </tr>
    <tr>
      <th>6</th>
      <td>SG</td>
      <td>SG</td>
    </tr>
    <tr>
      <th>7</th>
      <td>C</td>
      <td>C</td>
    </tr>
    <tr>
      <th>8</th>
      <td>SG</td>
      <td>SG</td>
    </tr>
    <tr>
      <th>9</th>
      <td>SG</td>
      <td>SG</td>
    </tr>
    <tr>
      <th>10</th>
      <td>SG</td>
      <td>SG</td>
    </tr>
    <tr>
      <th>11</th>
      <td>SG</td>
      <td>SG</td>
    </tr>
    <tr>
      <th>12</th>
      <td>C</td>
      <td>C</td>
    </tr>
    <tr>
      <th>13</th>
      <td>SG</td>
      <td>C</td>
    </tr>
    <tr>
      <th>14</th>
      <td>C</td>
      <td>C</td>
    </tr>
    <tr>
      <th>15</th>
      <td>C</td>
      <td>C</td>
    </tr>
    <tr>
      <th>16</th>
      <td>SG</td>
      <td>SG</td>
    </tr>
    <tr>
      <th>17</th>
      <td>C</td>
      <td>C</td>
    </tr>
    <tr>
      <th>18</th>
      <td>C</td>
      <td>C</td>
    </tr>
    <tr>
      <th>19</th>
      <td>C</td>
      <td>C</td>
    </tr>
  </tbody>
</table>
</div>

샘플 테스트


```python
x ={'3P' : [0, 3.9], 'BLK' :[7.7,0.3], 'TRB' : [1.0,0.1]}
x_test = pd.DataFrame(x)
print(x_test)
print()
y = {'Pos' :['C', 'SG']}
y_test = pd.DataFrame(y)
print(y_test)
print()
predict = knn.predict(x_test) #예측값
print('샘플 테스트 정확도 : {}'.format(accuracy_score(y_test.values.ravel(), predict)))
comparison = pd.DataFrame({'실제값':y_test.values.ravel(), '예측값':predict})
comparison
```

        3P  BLK  TRB
    0  0.0  7.7  1.0
    1  3.9  0.3  0.1
    
      Pos
    0   C
    1  SG
    
    샘플 테스트 정확도 : 1.0

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
      <th>실제값</th>
      <th>예측값</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>C</td>
      <td>C</td>
    </tr>
    <tr>
      <th>1</th>
      <td>SG</td>
      <td>SG</td>
    </tr>
  </tbody>
</table>
</div>
