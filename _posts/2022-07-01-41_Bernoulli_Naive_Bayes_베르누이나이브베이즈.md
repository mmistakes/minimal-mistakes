베르누이 나이브 베이즈를 활용한 스팸 메일 분류  
이메일 제목과 레이블(스팸 여부) 데이터를 활용해 베르누이 나이브 베이즈 분류로 스팸 메일을 확인한다.


```python
import warnings
warnings.filterwarnings('ignore')
import numpy as np
import pandas as pd
import sklearn
```


```python
# 베르누이 나이브 베이즈를 위한 라이브러리를 import 한다.
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import BernoulliNB
# 모델 정확도 평가를 위해 import 한다.
from sklearn.metrics import accuracy_score
```

데이터 획득


```python
email_list = [
    {'email title': 'free game only today', 'spam': True},
    {'email title': 'cheapest flight deal', 'spam': True},
    {'email title': 'limited time offer only today only today', 'spam': True},
    {'email title': 'today meeting schedule', 'spam': False},
    {'email title': 'your flight schedule attached', 'spam': False},
    {'email title': 'your credit card statement', 'spam': False}
]
df = pd.DataFrame(email_list)
df
```


---
layout: single
title:  "41_Bernoulli_Naive_Bayes_베르누이나이브베이즈"
categories : python
tag : [review]
search: true #false로 주면 검색해도 안나온다.
---

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
      <th>email title</th>
      <th>spam</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>free game only today</td>
      <td>True</td>
    </tr>
    <tr>
      <th>1</th>
      <td>cheapest flight deal</td>
      <td>True</td>
    </tr>
    <tr>
      <th>2</th>
      <td>limited time offer only today only today</td>
      <td>True</td>
    </tr>
    <tr>
      <th>3</th>
      <td>today meeting schedule</td>
      <td>False</td>
    </tr>
    <tr>
      <th>4</th>
      <td>your flight schedule attached</td>
      <td>False</td>
    </tr>
    <tr>
      <th>5</th>
      <td>your credit card statement</td>
      <td>False</td>
    </tr>
  </tbody>
</table>
</div>



학습 데이터 다듬기  
사이킷런의 베이누이 나이브 베이즈 분류기(BernoulliNB)는 숫자만 다루기 때문에 True와 False를 1과 0으로 치환한다.  
이메일 제목(email title)으로 학습을 진행하고 레이블은 label을 사용해서 스팸 메일인지 여부를 확인한다.


```python
df['label'] = df.spam.map({True: 1, False: 0})
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
      <th>email title</th>
      <th>spam</th>
      <th>label</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>free game only today</td>
      <td>True</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>cheapest flight deal</td>
      <td>True</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>limited time offer only today only today</td>
      <td>True</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>today meeting schedule</td>
      <td>False</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>your flight schedule attached</td>
      <td>False</td>
      <td>0</td>
    </tr>
    <tr>
      <th>5</th>
      <td>your credit card statement</td>
      <td>False</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>




```python
# 학습에 사용할 데이터와 레이블로 값을 분리한다.
df_x = df['email title']
df_y = df['label']
```

베르누이 나이브 베이즈의 입력 데이터는 고정된 크기의 벡터이어야 한다.  
사이킷런의 CountVectorizer() 함수를 사용하면 데이터에 출현한 모든 단어의 개수 만큼 크기를 가지는 벡터를 만들고 고정된 벡터로 표현한다.


```python
s = set(['free', 'game', 'only', 'today', 'cheapest', 'flight', 'deal', 'limited', 'time', 'offer', 'only', 'today', 'only', 
         'today', 'today', 'meeting', 'schedule', 'your', 'flight', 'schedule', 'attached', 'your', 'credit', 'card', 
         'statement'])
s
```




    {'attached',
     'card',
     'cheapest',
     'credit',
     'deal',
     'flight',
     'free',
     'game',
     'limited',
     'meeting',
     'offer',
     'only',
     'schedule',
     'statement',
     'time',
     'today',
     'your'}




```python
# CountVectorizer() 함수는 이메일 제목에 출현한 단어를 오름차순으로 정렬해 단어의 위치로 행렬을 만들어 리턴한다.
# 특정 단어가 출현할 경우 출현한 단어의 개수를 출현하지 않으면 0을 리턴한다.
# CountVectorizer() 함수의 옵션으로 binary=True를 지정하면 같은 단어가 여러번 출현하더라도 1을 리턴한다.
cv = CountVectorizer(binary=True)
x_train = cv.fit_transform(df_x)
# toarray() 함수로 CountVectorizer() 함수를 실행한 결과를 넘파이 배열 데이터로 변환한다.
encoded_input = x_train.toarray()
encoded_input
```




    array([[0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
           [0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
           [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
           [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1]], dtype=int64)



위의 행렬에서 볼 수 있듯이 이메일 제목에서 총 17개의 단어가 발견되어 각 이메일 제목이 17개 크기의 벡터로 인코딩(표현)된 것을 확인할 수 있다.  
또한 베르누이 나이브 베이즈에서 사용하기 위해 이메일 제목에 중복되는 단어가 있더라도 중복된 횟수로 표현된 것이 아니라 binary=True 옵션을 사용해서 단순히 1로 표현한 것을 알 수 있다.


```python
# inverse_transform() 함수로 고정된 크기의 벡터에 포함된 단어를 확인한다.
cv.inverse_transform(encoded_input)
```




    [array(['free', 'game', 'only', 'today'], dtype='<U9'),
     array(['cheapest', 'deal', 'flight'], dtype='<U9'),
     array(['limited', 'offer', 'only', 'time', 'today'], dtype='<U9'),
     array(['meeting', 'schedule', 'today'], dtype='<U9'),
     array(['attached', 'flight', 'schedule', 'your'], dtype='<U9'),
     array(['card', 'credit', 'statement', 'your'], dtype='<U9')]




```python
# 고정된 벡터의 각 인덱스가 어떤 단어를 의미하는지 궁금하다면 get_feature_names() 함수로 각 인덱스에 해당되는 단어를 확인할
# 수 있다.
cv.get_feature_names()
```




    ['attached',
     'card',
     'cheapest',
     'credit',
     'deal',
     'flight',
     'free',
     'game',
     'limited',
     'meeting',
     'offer',
     'only',
     'schedule',
     'statement',
     'time',
     'today',
     'your']



베르누이 나이브 베이즈 모델 학습하기  
사이킷런의 베르누이 나이브 베이즈 분류기는 기본적으로 스무딩을 지원하므로 학습 데이터에 없던 단어가 테스트 데이터에 있어도 분류가 잘 진행된다.
***
라플라스 스무딩(Laplace Smoothing)  
0이란 수는 곱셈과 나눗셈을 무력화시키는 값이므로 그 전에 아무리 의미있는 값이 도출된다 하더라도 마지막에 0을 곱해버리면 값은 0이 나온다. 이런 경우가 상당히 빈번하기 때문에 값을 0이 아닌 최소값(1회 등장)으로 보정을 하게 되는데 이를 라플라스 스무딩이라 한다.


```python
bnb = BernoulliNB()
y_train = df_y.astype(int)
bnb.fit(x_train, y_train)
```




    BernoulliNB()



테스트 데이터로 테스트 한다.


```python
test_email_list = [
    {'email title' : 'free flight offer', 'spam' : True},
    {'email title' : 'hey traveler free flight deal', 'spam' : True},
    {'email title' : 'limited free game offer', 'spam' : True},
    {'email title' : 'today flight schedule', 'spam' : False},
    {'email title' : 'your credit card attached', 'spam' : False},
    {'email title' : 'free credit card offer only today', 'spam' : False}
]
test_df = pd.DataFrame(test_email_list)
test_df['label'] = test_df.spam.map({True: 1, False: 0})
test_x = test_df['email title']
test_y = test_df['label']
x_test = cv.transform(test_x)
y_test = test_y.astype(int)
```


```python
predict = bnb.predict(x_test)
print('정확도(accuracy): {}'.format(accuracy_score(y_test, predict)))
```

    정확도(accuracy): 0.8333333333333334
    


```python
comparsion = pd.DataFrame({'실제값': y_test, '예측값': predict})
comparsion
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
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>
