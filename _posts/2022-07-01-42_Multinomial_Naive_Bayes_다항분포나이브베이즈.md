다항분포 나이브 베이즈를 활용한 영화 리뷰 분류  
영화 리뷰에 다항분포 나이브 베이즈를 활용해 영화 리뷰가 긍정적인지 부정적인지 분류한다.


```python
import warnings
warnings.filterwarnings('ignore')
import numpy as np
import pandas as pd
import sklearn
```


```python
# 다항분포 나이브 베이즈를 위한 라이브러리를 import 한다.
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
# 모델 정확도 평가를 위해 import 한다.
from sklearn.metrics import accuracy_score
```

데이터 획득  
movie_review: 영화 감상평, type: 감상평이 긍정적(positive)인지 부정적(negative)인지 나타낸다.


```python
review_list = [
    {'movie_review' : 'this is great great movie. I will watch again', 'type' : 'positive'},
    {'movie_review' : 'I like this movie', 'type' : 'positive'},
    {'movie_review' : 'amazing movie in this year', 'type' : 'positive'},
    {'movie_review' : 'cool my boyfriend also said the movie is cool', 'type' : 'positive'},
    {'movie_review' : 'awesome of the awesome movie ever', 'type' : 'positive'},
    {'movie_review' : 'shame I wasted money and time', 'type' : 'negative'},
    {'movie_review' : 'regret on this move. I will never never what movie from this director', 'type' : 'negative'},
    {'movie_review' : 'I do not like this movie', 'type' : 'negative'},
    {'movie_review' : 'I do not like actors in this movie', 'type' : 'negative'},
    {'movie_review' : 'boring boring sleeping movie', 'type' : 'negative'}
]
df = pd.DataFrame(review_list)
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
      <th>movie_review</th>
      <th>type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>this is great great movie. I will watch again</td>
      <td>positive</td>
    </tr>
    <tr>
      <th>1</th>
      <td>I like this movie</td>
      <td>positive</td>
    </tr>
    <tr>
      <th>2</th>
      <td>amazing movie in this year</td>
      <td>positive</td>
    </tr>
    <tr>
      <th>3</th>
      <td>cool my boyfriend also said the movie is cool</td>
      <td>positive</td>
    </tr>
    <tr>
      <th>4</th>
      <td>awesome of the awesome movie ever</td>
      <td>positive</td>
    </tr>
    <tr>
      <th>5</th>
      <td>shame I wasted money and time</td>
      <td>negative</td>
    </tr>
    <tr>
      <th>6</th>
      <td>regret on this move. I will never never what m...</td>
      <td>negative</td>
    </tr>
    <tr>
      <th>7</th>
      <td>I do not like this movie</td>
      <td>negative</td>
    </tr>
    <tr>
      <th>8</th>
      <td>I do not like actors in this movie</td>
      <td>negative</td>
    </tr>
    <tr>
      <th>9</th>
      <td>boring boring sleeping movie</td>
      <td>negative</td>
    </tr>
  </tbody>
</table>
</div>



학습 데이터 다듬기  
사이킷런의 다항분포 나이브 베이즈 분류기(MultinomialNB)는 숫자만 다루기 때문에 positive와 negative를 1과 0으로 치환한다.


```python
df['label'] = df.type.map({'positive': 1, 'negative': 0})
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
      <th>movie_review</th>
      <th>type</th>
      <th>label</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>this is great great movie. I will watch again</td>
      <td>positive</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>I like this movie</td>
      <td>positive</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>amazing movie in this year</td>
      <td>positive</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>cool my boyfriend also said the movie is cool</td>
      <td>positive</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>awesome of the awesome movie ever</td>
      <td>positive</td>
      <td>1</td>
    </tr>
    <tr>
      <th>5</th>
      <td>shame I wasted money and time</td>
      <td>negative</td>
      <td>0</td>
    </tr>
    <tr>
      <th>6</th>
      <td>regret on this move. I will never never what m...</td>
      <td>negative</td>
      <td>0</td>
    </tr>
    <tr>
      <th>7</th>
      <td>I do not like this movie</td>
      <td>negative</td>
      <td>0</td>
    </tr>
    <tr>
      <th>8</th>
      <td>I do not like actors in this movie</td>
      <td>negative</td>
      <td>0</td>
    </tr>
    <tr>
      <th>9</th>
      <td>boring boring sleeping movie</td>
      <td>negative</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>




```python
# 학습에 사용할 데이터와 레이블로 값을 분리한다.
df_x = df['movie_review']
df_y = df['label']
```

다항분포 나이브 베이즈의 입력 데이터는 고정된 크기의 벡터로서 각 인덱스는 단어의 빈도수를 나타내야 한다.  
사이킷런의 CountVectorizer() 함수를 사용하면 데이터에 출현한 모든 단어의 개수 만큼 크기를 가지는 벡터를 만들고 고정된 벡터로 표현한다.


```python
# CountVectorizer() 함수는 이메일 제목에 출현한 단어를 오름차순으로 정렬해 단어의 위치로 행렬을 만들어 리턴한다.
# 특정 단어가 출현할 경우 출현한 단어의 개수를 출현하지 않으면 0을 리턴한다.
# CountVectorizer() 함수의 옵션으로 binary=True를 지정하면 같은 단어가 여러번 출현하더라도 1을 리턴한다.
cv = CountVectorizer()
x_train = cv.fit_transform(df_x)
# toarray() 함수로 CountVectorizer() 함수를 실행한 결과를 넘파이 배열 데이터로 변환한다.
encoded_input = x_train.toarray()
encoded_input
```




    array([[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
           [0, 0, 1, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0,
            0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
            0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 2,
            0, 0, 1, 1, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 0],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]], dtype=int64)




```python
# inverse_transform() 함수로 고정된 크기의 벡터에 포함된 단어를 확인한다.
cv.inverse_transform(encoded_input)
```




    [array(['again', 'great', 'is', 'movie', 'this', 'watch', 'will'],
           dtype='<U9'),
     array(['like', 'movie', 'this'], dtype='<U9'),
     array(['amazing', 'in', 'movie', 'this', 'year'], dtype='<U9'),
     array(['also', 'boyfriend', 'cool', 'is', 'movie', 'my', 'said', 'the'],
           dtype='<U9'),
     array(['awesome', 'ever', 'movie', 'of', 'the'], dtype='<U9'),
     array(['and', 'money', 'shame', 'time', 'wasted'], dtype='<U9'),
     array(['director', 'from', 'move', 'movie', 'never', 'on', 'regret',
            'this', 'what', 'will'], dtype='<U9'),
     array(['do', 'like', 'movie', 'not', 'this'], dtype='<U9'),
     array(['actors', 'do', 'in', 'like', 'movie', 'not', 'this'], dtype='<U9'),
     array(['boring', 'movie', 'sleeping'], dtype='<U9')]




```python
# 고정된 벡터의 각 인덱스가 어떤 단어를 의미하는지 궁금하다면 get_feature_names() 함수로 각 인덱스에 해당되는 단어를 확인할
# 수 있다.
cv.get_feature_names()
```




    ['actors',
     'again',
     'also',
     'amazing',
     'and',
     'awesome',
     'boring',
     'boyfriend',
     'cool',
     'director',
     'do',
     'ever',
     'from',
     'great',
     'in',
     'is',
     'like',
     'money',
     'move',
     'movie',
     'my',
     'never',
     'not',
     'of',
     'on',
     'regret',
     'said',
     'shame',
     'sleeping',
     'the',
     'this',
     'time',
     'wasted',
     'watch',
     'what',
     'will',
     'year']



다항분포 나이브 베이즈 모델 학습하기


```python
mnb = MultinomialNB()
y_train = df_y.astype(int)
mnb.fit(x_train, y_train)
```




    MultinomialNB()



테스트 데이터로 테스트 한다.


```python
test_feedback_list = [
    {'movie_review': 'great great great movie ever', 'type': 'positive'},
    {'movie_review': 'I like this amazing movie', 'type': 'positive'},
    {'movie_review': 'my boyfriend said great movie ever', 'type': 'positive'},
    {'movie_review': 'cool cool cool', 'type': 'positive'},
    {'movie_review': 'awesome boyfriend said cool movie ever', 'type': 'positive'},
    {'movie_review': 'shame shame shame', 'type': 'negative'},
    {'movie_review': 'awesome director shame movie boring movie', 'type': 'negative'},
    {'movie_review': 'do not like this movie', 'type': 'negative'},
    {'movie_review': 'I do not like this boring movie', 'type': 'negative'},
    {'movie_review': 'aweful terrible boring movie', 'type': 'negative'}
]

test_df = pd.DataFrame(test_feedback_list)
test_df['label'] = test_df.type.map({'positive': 1, 'negative': 0})
test_x = test_df['movie_review']
test_y = test_df['label']

x_test = cv.transform(test_x)
y_test = test_y.astype(int)
```


```python
predict = mnb.predict(x_test)
print('정확도(accuracy): {}'.format(accuracy_score(y_test, predict)))
```

    정확도(accuracy): 1.0
    


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
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>6</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>7</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>8</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>9</th>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>




```python

```


```python

```


```python

```
