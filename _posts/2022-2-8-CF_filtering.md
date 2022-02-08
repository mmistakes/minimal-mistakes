---
layout: single
title: "대부와 유사한 영화 10개 추천 (CBF 기반)"
categories: 데이터_분석
tag: [
    python,
    머신러닝,
    blog,
    github,
    CF,
    추천시스템,
    빅데이터,
    영화,
    협업,
    필터링,
    collaboration,
    filtering,
    멀티캠퍼스,
    국비지원,
    교육,
    분석,
    데이터,
    파이썬,
  ]
toc: true
sidebar:
  nav: "docs"
---
## 1. 데이터 및 라이브러리 불러오기


```python
import pandas as pd
import numpy as np

movies = pd.read_csv('./data_movie_lens/movies.csv')
ratings = pd.read_csv('./data_movie_lens/ratings.csv')

print(movies.shape)
print(ratings.shape)

# 9천여개 영화에 대해 사용자들(600여명)이 평가한 10만여개 평점 데이터
```

    (9742, 3)
    (100836, 4)



```python
movies.head(1)
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
      <th>movieId</th>
      <th>title</th>
      <th>genres</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>Toy Story (1995)</td>
      <td>Adventure|Animation|Children|Comedy|Fantasy</td>
    </tr>
  </tbody>
</table>
</div>




```python
ratings.head(1)
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
      <th>userId</th>
      <th>movieId</th>
      <th>rating</th>
      <th>timestamp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>1</td>
      <td>4.0</td>
      <td>964982703</td>
    </tr>
  </tbody>
</table>
</div>



## 2. 데이터 전처리


```python
# 불필요한 'timestamp' 컬럼 제거 
ratings = ratings.drop(['timestamp'],axis=1)
ratings.head(1)
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
      <th>userId</th>
      <th>movieId</th>
      <th>rating</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>1</td>
      <td>4.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
# pivot_table 메소드를 사용해서 행렬 반환
ratings_matrix = ratings.pivot_table('rating', index='userId', columns='movieId')

# 각 유저가 영화에 매긴 평점을 행렬로 표시
print(ratings_matrix.shape)
ratings_matrix.head(2)
```

    (610, 9724)





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
      <th>movieId</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
      <th>6</th>
      <th>7</th>
      <th>8</th>
      <th>9</th>
      <th>10</th>
      <th>...</th>
      <th>193565</th>
      <th>193567</th>
      <th>193571</th>
      <th>193573</th>
      <th>193579</th>
      <th>193581</th>
      <th>193583</th>
      <th>193585</th>
      <th>193587</th>
      <th>193609</th>
    </tr>
    <tr>
      <th>userId</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>4.0</td>
      <td>NaN</td>
      <td>4.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>4.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
<p>2 rows × 9724 columns</p>
</div>




```python
# movieId 기준으로 DF 합치기  

rating_movies = pd.merge(ratings, movies, on='movieId')
print(rating_movies.shape)
    # 행의 갯수는 모든 유저가 단 평점갯수의 총합
rating_movies.head(1)
```

    (100836, 5)





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
      <th>userId</th>
      <th>movieId</th>
      <th>rating</th>
      <th>title</th>
      <th>genres</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>1</td>
      <td>4.0</td>
      <td>Toy Story (1995)</td>
      <td>Adventure|Animation|Children|Comedy|Fantasy</td>
    </tr>
  </tbody>
</table>
</div>




```python
# title 컬럼 기준으로 pivot 수행

ratings_matrix = rating_movies.pivot_table('rating', index='userId', columns='title')
ratings_matrix.head(2)
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
      <th>title</th>
      <th>'71 (2014)</th>
      <th>'Hellboy': The Seeds of Creation (2004)</th>
      <th>'Round Midnight (1986)</th>
      <th>'Salem's Lot (2004)</th>
      <th>'Til There Was You (1997)</th>
      <th>'Tis the Season for Love (2015)</th>
      <th>'burbs, The (1989)</th>
      <th>'night Mother (1986)</th>
      <th>(500) Days of Summer (2009)</th>
      <th>*batteries not included (1987)</th>
      <th>...</th>
      <th>Zulu (2013)</th>
      <th>[REC] (2007)</th>
      <th>[REC]² (2009)</th>
      <th>[REC]³ 3 Génesis (2012)</th>
      <th>anohana: The Flower We Saw That Day - The Movie (2013)</th>
      <th>eXistenZ (1999)</th>
      <th>xXx (2002)</th>
      <th>xXx: State of the Union (2005)</th>
      <th>¡Three Amigos! (1986)</th>
      <th>À nous la liberté (Freedom for Us) (1931)</th>
    </tr>
    <tr>
      <th>userId</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>4.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
<p>2 rows × 9719 columns</p>
</div>




```python
# NaN 값을 모두 0 으로 변환 

#사용자 - 아이템 행렬 도출
ratings_matrix = ratings_matrix.fillna(0)
ratings_matrix.head(2)
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
      <th>title</th>
      <th>'71 (2014)</th>
      <th>'Hellboy': The Seeds of Creation (2004)</th>
      <th>'Round Midnight (1986)</th>
      <th>'Salem's Lot (2004)</th>
      <th>'Til There Was You (1997)</th>
      <th>'Tis the Season for Love (2015)</th>
      <th>'burbs, The (1989)</th>
      <th>'night Mother (1986)</th>
      <th>(500) Days of Summer (2009)</th>
      <th>*batteries not included (1987)</th>
      <th>...</th>
      <th>Zulu (2013)</th>
      <th>[REC] (2007)</th>
      <th>[REC]² (2009)</th>
      <th>[REC]³ 3 Génesis (2012)</th>
      <th>anohana: The Flower We Saw That Day - The Movie (2013)</th>
      <th>eXistenZ (1999)</th>
      <th>xXx (2002)</th>
      <th>xXx: State of the Union (2005)</th>
      <th>¡Three Amigos! (1986)</th>
      <th>À nous la liberté (Freedom for Us) (1931)</th>
    </tr>
    <tr>
      <th>userId</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>4.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>2 rows × 9719 columns</p>
</div>



## 3. 영화들 간 유사도 산출


```python
# 아이템 - 사용자 행렬로 transpose 
ratings_matrix_T = ratings_matrix.transpose() # 전치행렬

print(ratings_matrix_T.shape)
ratings_matrix_T.head(2)
```

    (9719, 610)





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
      <th>userId</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
      <th>6</th>
      <th>7</th>
      <th>8</th>
      <th>9</th>
      <th>10</th>
      <th>...</th>
      <th>601</th>
      <th>602</th>
      <th>603</th>
      <th>604</th>
      <th>605</th>
      <th>606</th>
      <th>607</th>
      <th>608</th>
      <th>609</th>
      <th>610</th>
    </tr>
    <tr>
      <th>title</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>'71 (2014)</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>'Hellboy': The Seeds of Creation (2004)</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>2 rows × 610 columns</p>
</div>




```python
# 영화들 간 코사인 유사도 산출 
from sklearn.metrics.pairwise import cosine_similarity

item_sim = cosine_similarity(ratings_matrix_T, ratings_matrix_T)
print(item_sim.shape)
item_sim[0:2]
```

    (9719, 9719)





    array([[1.        , 0.        , 0.        , ..., 0.32732684, 0.        ,
            0.        ],
           [0.        , 1.        , 0.70710678, ..., 0.        , 0.        ,
            0.        ]])




```python
# 코사인 유사도로 반환된 넘파이 행렬에 영화명 매핑 -> DataFrame 으로 변환

item_sim_df = pd.DataFrame(data=item_sim, index=ratings_matrix.columns,
                           columns=ratings_matrix.columns)
print(item_sim_df.shape)
item_sim_df.head(2)
```

    (9719, 9719)





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
      <th>title</th>
      <th>'71 (2014)</th>
      <th>'Hellboy': The Seeds of Creation (2004)</th>
      <th>'Round Midnight (1986)</th>
      <th>'Salem's Lot (2004)</th>
      <th>'Til There Was You (1997)</th>
      <th>'Tis the Season for Love (2015)</th>
      <th>'burbs, The (1989)</th>
      <th>'night Mother (1986)</th>
      <th>(500) Days of Summer (2009)</th>
      <th>*batteries not included (1987)</th>
      <th>...</th>
      <th>Zulu (2013)</th>
      <th>[REC] (2007)</th>
      <th>[REC]² (2009)</th>
      <th>[REC]³ 3 Génesis (2012)</th>
      <th>anohana: The Flower We Saw That Day - The Movie (2013)</th>
      <th>eXistenZ (1999)</th>
      <th>xXx (2002)</th>
      <th>xXx: State of the Union (2005)</th>
      <th>¡Three Amigos! (1986)</th>
      <th>À nous la liberté (Freedom for Us) (1931)</th>
    </tr>
    <tr>
      <th>title</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>'71 (2014)</th>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.141653</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.342055</td>
      <td>0.543305</td>
      <td>0.707107</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.139431</td>
      <td>0.327327</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>'Hellboy': The Seeds of Creation (2004)</th>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.707107</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>2 rows × 9719 columns</p>
</div>




```python
# Godfather 와 유사한 영화 5개 확인해보기 (0번 인덱스는 Godfater 니까 제외)
item_sim_df["Godfather, The (1972)"].sort_values(ascending=False)[1:6]
```




    title
    Godfather: Part II, The (1974)               0.821773
    Goodfellas (1990)                            0.664841
    One Flew Over the Cuckoo's Nest (1975)       0.620536
    Star Wars: Episode IV - A New Hope (1977)    0.595317
    Fargo (1996)                                 0.588614
    Name: Godfather, The (1972), dtype: float64



## 4. 협업 필터링 적용한 추천

아이템 기반 인접이웃 데이터 기반한 예측평점 
- 아이템 기반 : 이 상품을 선택한 다른 고객이 구매한 상품 추천  
  
>    cf. 사용자 기반 : 유저와 비슷한 상품을 구매해 온 다른 고객이 구매한 상품  


```python
# 평점 벡터(행), 유사도 벡터(열) 내적하여 예측평점 계산 함수
def predict_rating(ratings_arr, item_sim_arr):
    ratings_pred = ratings_arr.dot(item_sim_arr) / np.array([np.abs(item_sim_arr).sum(axis=1)])
    return ratings_pred    
```


```python
ratings_pred = predict_rating(ratings_matrix.values, item_sim_df.values)
ratings_pred[0]
```




    array([0.07034471, 0.5778545 , 0.32169559, ..., 0.13602448, 0.29295452,
           0.72034722])




```python
# 데이터프레임으로 변환 -> 영화별 예측 평점

ratings_pred_matrix = pd.DataFrame(data = ratings_pred, index = ratings_matrix.index,
                                    columns = ratings_matrix.columns)
print(ratings_pred_matrix.shape)
ratings_pred_matrix.head(2)
```

    (610, 9719)





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
      <th>title</th>
      <th>'71 (2014)</th>
      <th>'Hellboy': The Seeds of Creation (2004)</th>
      <th>'Round Midnight (1986)</th>
      <th>'Salem's Lot (2004)</th>
      <th>'Til There Was You (1997)</th>
      <th>'Tis the Season for Love (2015)</th>
      <th>'burbs, The (1989)</th>
      <th>'night Mother (1986)</th>
      <th>(500) Days of Summer (2009)</th>
      <th>*batteries not included (1987)</th>
      <th>...</th>
      <th>Zulu (2013)</th>
      <th>[REC] (2007)</th>
      <th>[REC]² (2009)</th>
      <th>[REC]³ 3 Génesis (2012)</th>
      <th>anohana: The Flower We Saw That Day - The Movie (2013)</th>
      <th>eXistenZ (1999)</th>
      <th>xXx (2002)</th>
      <th>xXx: State of the Union (2005)</th>
      <th>¡Three Amigos! (1986)</th>
      <th>À nous la liberté (Freedom for Us) (1931)</th>
    </tr>
    <tr>
      <th>userId</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>0.070345</td>
      <td>0.577855</td>
      <td>0.321696</td>
      <td>0.227055</td>
      <td>0.206958</td>
      <td>0.194615</td>
      <td>0.249883</td>
      <td>0.102542</td>
      <td>0.157084</td>
      <td>0.178197</td>
      <td>...</td>
      <td>0.113608</td>
      <td>0.181738</td>
      <td>0.133962</td>
      <td>0.128574</td>
      <td>0.006179</td>
      <td>0.212070</td>
      <td>0.192921</td>
      <td>0.136024</td>
      <td>0.292955</td>
      <td>0.720347</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.018260</td>
      <td>0.042744</td>
      <td>0.018861</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.035995</td>
      <td>0.013413</td>
      <td>0.002314</td>
      <td>0.032213</td>
      <td>0.014863</td>
      <td>...</td>
      <td>0.015640</td>
      <td>0.020855</td>
      <td>0.020119</td>
      <td>0.015745</td>
      <td>0.049983</td>
      <td>0.014876</td>
      <td>0.021616</td>
      <td>0.024528</td>
      <td>0.017563</td>
      <td>0.000000</td>
    </tr>
  </tbody>
</table>
<p>2 rows × 9719 columns</p>
</div>



## 5. 예측평점 정확도 판단 (오차함수 RMSE 적용)

### 유저가 실제 평점을 부여한 영화와 예측점수 비교


```python
# 예측성능평가(MSE) 적용 함수 
from sklearn.metrics import mean_squared_error

def get_mse(pred, actual):
    pred = pred[actual.nonzero()].flatten() 
        # 넘파이 nonzero() -> 0 이 아닌 값들의 index를 반환해줌
        # 넘파이 flatten() -> 평평하게(1차원으로) 만들어줌
              # -> 평점을 매긴 데이터가 1차원 넘파이 행렬로 추출됨
    actual = actual[actual.nonzero()].flatten()
    return mean_squared_error(pred,actual)

print('아이템 기반 모든 인접 이웃 MSE : ', get_mse(ratings_pred, ratings_matrix.values))
```

    아이템 기반 모든 인접 이웃 MSE :  9.895354759094706


### 유사도 상위 n개의 예측평점 계산


```python
def predict_rating_topsim(ratings_arr, item_sim_arr, n=20):
    # (사용자-아이템 평점)행렬 크기만큼 0으로 채운 예측행렬 초기화 
    pred = np.zeros(ratings_arr.shape)
    
    # 행렬의 열 수만큼 Loop 수행
    for col in range(ratings_arr.shape[1]):
        # 유사도가 1인(자기자신)을 제외하고 큰 순으로 index 반환
        top_n_items = [np.argsort(item_sim_arr[:, col])[:-n-1:-1]]
        # 개인화된 예측 평점 계산 -> 행(유저 수) 만큼 Loop
        for row in range(ratings_arr.shape[0]):
            pred[row, col] = item_sim_arr[col, :][top_n_items].dot(ratings_arr[row,:][top_n_items].T)
            pred[row, col] /= np.sum(np.abs(item_sim_arr[col,:][top_n_items]))
    return pred
```


```python
import warnings
warnings.filterwarnings('ignore')

# 함수 실행 (2분 정도 걸림) 
ratings_pred = predict_rating_topsim(ratings_matrix.values, item_sim_df.values, n=20)
print('아이템 기반 인접 TOP-20 이웃 MSE: ', get_mse(ratings_pred, ratings_matrix.values))

# 함수로 계산된 예측평점으로 DataFrame 재생성 -> 최종적인 영화별 예측 평점 데이터
ratings_pred_matrix = pd.DataFrame(data=ratings_pred, index=ratings_matrix.index,
                                   columns = ratings_matrix.columns)
```

    아이템 기반 인접 TOP-20 이웃 MSE:  3.694999233129397


## 6. 사용자에게 영화 추천

### 9번 유저가 높은 평점을 준 영화 확인


```python
user_rating_id = ratings_matrix.loc[9,:]
user_rating_id[user_rating_id > 0].sort_values(ascending=False)[:10]
```




    title
    Adaptation (2002)                                                                 5.0
    Citizen Kane (1941)                                                               5.0
    Raiders of the Lost Ark (Indiana Jones and the Raiders of the Lost Ark) (1981)    5.0
    Producers, The (1968)                                                             5.0
    Lord of the Rings: The Two Towers, The (2002)                                     5.0
    Lord of the Rings: The Fellowship of the Ring, The (2001)                         5.0
    Back to the Future (1985)                                                         5.0
    Austin Powers in Goldmember (2002)                                                5.0
    Minority Report (2002)                                                            4.0
    Witness (1985)                                                                    4.0
    Name: 9, dtype: float64



평점 5점을 준 영화는 어댑션, 오스틴파워, 반지의 제왕 등 이다.  
흥행성이 높은 어드벤처 영화를 좋아한다고 예상할 수 있다. 

### 관람하지 않은 영화 추천


```python
# user_rating이 0보다 크면 관람한 영화

def get_unseen_movies(ratings_matrix, userId):
    # userId(유저)의 모든 영화 정보 추출 -> Series로 반환
    user_rating = ratings_matrix.loc[userId,:] 
        # 반환된 user_rating 은 title을 index로 가짐
        
    # user_rating이 0 보다 큰 영화의 index를 추출 -> list 로 만듦 
    already_seen = user_rating[user_rating > 0].index.tolist()
    
    # 모든 영화명을 리스트로 만듦 
    movies_list = ratings_matrix.columns.tolist()
    
    # 이미 본 영화 제외 (list comprehension 활용)
    unseen_list = [ movie for movie in movies_list if movie not in already_seen ]
    
    return unseen_list
```


```python
# 개인별 영화 추천 함수 

def recomm_movie_by_userid(pred_df, userId, unseen_list, top_n=10):
    # 예측평점 df 에서 userId 의 인덱스와 unseen_list 의 컬럼을 추출 
        # -> 예측평점이 높은 순으로 정렬 
    recomm_movies = pred_df.loc[userId, unseen_list].sort_values(ascending=False)[:top_n]
    return recomm_movies
```


```python
# 관람하지 않은 영화 추출 
unseen_list = get_unseen_movies(ratings_matrix, 9)

# 유저에게 영화 추천 
recomm_movies = recomm_movie_by_userid(ratings_pred_matrix, 9, unseen_list, top_n=10)

recomm_movies = pd.DataFrame(data=recomm_movies.values, index=recomm_movies.index, columns=['pred_score'])
recomm_movies
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
      <th>pred_score</th>
    </tr>
    <tr>
      <th>title</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Shrek (2001)</th>
      <td>0.866202</td>
    </tr>
    <tr>
      <th>Spider-Man (2002)</th>
      <td>0.857854</td>
    </tr>
    <tr>
      <th>Last Samurai, The (2003)</th>
      <td>0.817473</td>
    </tr>
    <tr>
      <th>Indiana Jones and the Temple of Doom (1984)</th>
      <td>0.816626</td>
    </tr>
    <tr>
      <th>Matrix Reloaded, The (2003)</th>
      <td>0.800990</td>
    </tr>
    <tr>
      <th>Harry Potter and the Sorcerer's Stone (a.k.a. Harry Potter and the Philosopher's Stone) (2001)</th>
      <td>0.765159</td>
    </tr>
    <tr>
      <th>Gladiator (2000)</th>
      <td>0.740956</td>
    </tr>
    <tr>
      <th>Matrix, The (1999)</th>
      <td>0.732693</td>
    </tr>
    <tr>
      <th>Pirates of the Caribbean: The Curse of the Black Pearl (2003)</th>
      <td>0.689591</td>
    </tr>
    <tr>
      <th>Lord of the Rings: The Return of the King, The (2003)</th>
      <td>0.676711</td>
    </tr>
  </tbody>
</table>
</div>



아이템 기반 
