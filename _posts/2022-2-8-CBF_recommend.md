---
layout: single
title: "대부와 유사한 영화 10개 추천 (CBF 기반)"
categories: 데이터_분석
tag: [
    python,
    머신러닝,
    blog,
    github,
    CBF,
    추천시스템,
    빅데이터,
    영화,
    CBF,
    content,
    based,
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
## 1. 라이브러리 및 자료 불러오기


```python
import pandas as pd
import numpy as np

import warnings
warnings.filterwarnings('ignore')
```


```python
movies = pd.read_csv('tmdb_5000_movies.csv')
```


```python
print(movies.shape)
movies.head(1)
```

    (4803, 20)





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
      <th>budget</th>
      <th>genres</th>
      <th>homepage</th>
      <th>id</th>
      <th>keywords</th>
      <th>original_language</th>
      <th>original_title</th>
      <th>overview</th>
      <th>popularity</th>
      <th>production_companies</th>
      <th>production_countries</th>
      <th>release_date</th>
      <th>revenue</th>
      <th>runtime</th>
      <th>spoken_languages</th>
      <th>status</th>
      <th>tagline</th>
      <th>title</th>
      <th>vote_average</th>
      <th>vote_count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>237000000</td>
      <td>[{"id": 28, "name": "Action"}, {"id": 12, "nam...</td>
      <td>http://www.avatarmovie.com/</td>
      <td>19995</td>
      <td>[{"id": 1463, "name": "culture clash"}, {"id":...</td>
      <td>en</td>
      <td>Avatar</td>
      <td>In the 22nd century, a paraplegic Marine is di...</td>
      <td>150.437577</td>
      <td>[{"name": "Ingenious Film Partners", "id": 289...</td>
      <td>[{"iso_3166_1": "US", "name": "United States o...</td>
      <td>2009-12-10</td>
      <td>2787965087</td>
      <td>162.0</td>
      <td>[{"iso_639_1": "en", "name": "English"}, {"iso...</td>
      <td>Released</td>
      <td>Enter the World of Pandora.</td>
      <td>Avatar</td>
      <td>7.2</td>
      <td>11800</td>
    </tr>
  </tbody>
</table>
</div>




```python
movies_df = movies[['id','title','genres','vote_average','vote_count','popularity','keywords','overview']]
movies_df.head(1)
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
      <th>id</th>
      <th>title</th>
      <th>genres</th>
      <th>vote_average</th>
      <th>vote_count</th>
      <th>popularity</th>
      <th>keywords</th>
      <th>overview</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>19995</td>
      <td>Avatar</td>
      <td>[{"id": 28, "name": "Action"}, {"id": 12, "nam...</td>
      <td>7.2</td>
      <td>11800</td>
      <td>150.437577</td>
      <td>[{"id": 1463, "name": "culture clash"}, {"id":...</td>
      <td>In the 22nd century, a paraplegic Marine is di...</td>
    </tr>
  </tbody>
</table>
</div>



## 2. 데이터 전처리


```python
# 문자열 형태로 복잡하게 구성된 장르컬럼
movies_df['genres'][0]
```




    '[{"id": 28, "name": "Action"}, {"id": 12, "name": "Adventure"}, {"id": 14, "name": "Fantasy"}, {"id": 878, "name": "Science Fiction"}]'




```python
type(movies_df['genres'][0])
```




    str



### genres, keywords 컬럼 자료형 변환 (str -> list)


```python
# 리스트 형태로 변경해서 name 값 추출이 용이하도록 만듦

# literal_eval 활용
from ast import literal_eval

movies_df['genres'] = movies_df['genres'].apply(literal_eval)
movies_df['keywords'] = movies_df['keywords'].apply(literal_eval)
```


```python
movies_df['genres'][0]
```




    [{'id': 28, 'name': 'Action'},
     {'id': 12, 'name': 'Adventure'},
     {'id': 14, 'name': 'Fantasy'},
     {'id': 878, 'name': 'Science Fiction'}]




```python
type(movies_df['genres'][0])
```




    list



### list 내 딕셔너리, name키의 값을 리스트로 변환


```python
movies_df['genres']
```




    0       [{'id': 28, 'name': 'Action'}, {'id': 12, 'nam...
    1       [{'id': 12, 'name': 'Adventure'}, {'id': 14, '...
    2       [{'id': 28, 'name': 'Action'}, {'id': 12, 'nam...
    3       [{'id': 28, 'name': 'Action'}, {'id': 80, 'nam...
    4       [{'id': 28, 'name': 'Action'}, {'id': 12, 'nam...
                                  ...                        
    4798    [{'id': 28, 'name': 'Action'}, {'id': 80, 'nam...
    4799    [{'id': 35, 'name': 'Comedy'}, {'id': 10749, '...
    4800    [{'id': 35, 'name': 'Comedy'}, {'id': 18, 'nam...
    4801                                                   []
    4802                  [{'id': 99, 'name': 'Documentary'}]
    Name: genres, Length: 4803, dtype: object




```python
movies_df['genres'][0][2]['name']
```




    'Fantasy'




```python
movies_df['genres'] = movies_df['genres'].apply(lambda x : [ y['name'] for y in x])
movies_df['keywords'] = movies_df['keywords'].apply(lambda x :[ y['name'] for y in x])
```


```python
movies_df[['genres']][0:3]
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
      <th>genres</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>[Action, Adventure, Fantasy, Science Fiction]</td>
    </tr>
    <tr>
      <th>1</th>
      <td>[Adventure, Fantasy, Action]</td>
    </tr>
    <tr>
      <th>2</th>
      <td>[Action, Adventure, Crime]</td>
    </tr>
  </tbody>
</table>
</div>



## 3. 장르 유사도 측정 -> 추천시스템 구축


```python
from sklearn.feature_extraction.text import CountVectorizer
```


```python
# CountVectorizer를 적용하기 위해 genres 정보를
    # 공백으로 구분되는 문자열로 변경 후 새 컬럼에 적용 (join 활용)
movies_df['genres_literal'] = movies_df['genres'].apply(lambda x : (' ').join(x))
movies_df['genres_literal'][0:3]
```




    0    Action Adventure Fantasy Science Fiction
    1                    Adventure Fantasy Action
    2                      Action Adventure Crime
    Name: genres_literal, dtype: object




```python
type(movies_df['genres_literal'][0])
```




    str




```python
# CountVectorizer 학습 
    # vectorizer(벡터화) 데이터를 선, 곡선 등 기하학적 모양으로 변환하는 것을 의미한다 

# 단어장에 들어갈 최소빈도(min_df), ngram(n개의 연속적인 단어 나열)의 범위 
count_vect = CountVectorizer(min_df=0, ngram_range=(1,2)) 

# 장르별 인덱스 사전
genre_mat = count_vect.fit_transform(movies_df['genres_literal'])
print(genre_mat.shape)
```

    (4803, 276)



```python
# 범위를 좁힌 CountVectorizer 학습 

count_vect2 = CountVectorizer(min_df=1, ngram_range=(1, 1))  # min_df: 단어장에 들어갈 최소빈도, ngram_range: 1 <= n <= 2
genre_mat2 = count_vect2.fit_transform(movies_df['genres_literal'])
print(genre_mat2.shape)
```

    (4803, 22)


### 코사인 유사도(cosine_similarity) 계산


```python
from sklearn.metrics.pairwise import cosine_similarity
genre_sim = cosine_similarity(genre_mat, genre_mat)

print(genre_sim.shape)
print(genre_sim[::-1])
```

    (4803, 4803)
    [[0.         0.         0.         ... 0.         0.         1.        ]
     [0.         0.         0.         ... 0.         0.         0.        ]
     [0.         0.         0.         ... 1.         0.         0.        ]
     ...
     [0.4472136  0.4        1.         ... 0.         0.         0.        ]
     [0.59628479 1.         0.4        ... 0.         0.         0.        ]
     [1.         0.59628479 0.4472136  ... 0.         0.         0.        ]]



```python
# 유사도 높은 영화 순서대로 표시 

genre_sim_sorted_ind = genre_sim.argsort()[:,::-1] # [:,::-1] 2차원 배열의 역순정렬
genre_sim_sorted_ind[::-1]
```




    array([[4802, 4710, 4521, ..., 3140, 3141,    0],
           [4802, 1594, 1596, ..., 3204, 3205,    0],
           [4800, 3809, 1895, ..., 2229, 2230,    0],
           ...,
           [   2, 1740, 1542, ..., 3000, 2999, 2401],
           [ 262,    1,  129, ..., 3069, 3067, 2401],
           [   0, 3494,  813, ..., 3038, 3037, 2401]], dtype=int64)



### 장르 코사인 유사도 활용한 영화 추천


```python
title_movie = movies_df[movies_df['title'] == 'The Godfather']
title_movie
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
      <th>id</th>
      <th>title</th>
      <th>genres</th>
      <th>vote_average</th>
      <th>vote_count</th>
      <th>popularity</th>
      <th>keywords</th>
      <th>overview</th>
      <th>genres_literal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>3337</th>
      <td>238</td>
      <td>The Godfather</td>
      <td>[Drama, Crime]</td>
      <td>8.4</td>
      <td>5893</td>
      <td>143.659698</td>
      <td>[italy, love at first sight, loss of father, p...</td>
      <td>Spanning the years 1945 to 1955, a chronicle o...</td>
      <td>Drama Crime</td>
    </tr>
  </tbody>
</table>
</div>




```python
# 갓파더의 인덱스를 변수로 저장하고,
title_index = title_movie.index.values

# 코사인 유사도가 비슷한 영화의 인덱스 10개 추출
similar_indexes = genre_sim_sorted_ind[title_index, :10]
similar_indexes = similar_indexes.reshape(-1)
    # 1차원 array로 변경
movies_df.iloc[similar_indexes].head(1)
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
      <th>id</th>
      <th>title</th>
      <th>genres</th>
      <th>vote_average</th>
      <th>vote_count</th>
      <th>popularity</th>
      <th>keywords</th>
      <th>overview</th>
      <th>genres_literal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2731</th>
      <td>240</td>
      <td>The Godfather: Part II</td>
      <td>[Drama, Crime]</td>
      <td>8.3</td>
      <td>3338</td>
      <td>105.792936</td>
      <td>[italo-american, cuba, vororte, melancholy, pr...</td>
      <td>In the continuing saga of the Corleone crime f...</td>
      <td>Drama Crime</td>
    </tr>
  </tbody>
</table>
</div>



### 코사인 유사도 산출 함수 


```python
def find_sim_movie_ver1(df, sorted_ind, title_name, top_n=10):
    # df 에서 title 컬럼값이 title_name 인 df를 추출
    title_movie = df[df['title'] == title_name]
        
    # index 를 ndarray로 추출하고, 유사도 순으로 10개의 index 추출
    title_index = title_movie.index.values
    similar_indexes = sorted_ind[title_index, :(top_n)]
    
    # 추출된 데이터를 1차원으로 변환하고 해당 인덱스의 df 추출 
    similar_indexes = similar_indexes.reshape(-1)
    return df.iloc[similar_indexes]
```

### The Godfather 와 유사한 영화 10개 추천


```python
similar_movies = find_sim_movie_ver1(movies_df, genre_sim_sorted_ind, 'The Godfather', 20)
similar_movies[['title', 'vote_average', 'genres', 'vote_count']].head(1)
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
      <th>title</th>
      <th>vote_average</th>
      <th>genres</th>
      <th>vote_count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2731</th>
      <td>The Godfather: Part II</td>
      <td>8.3</td>
      <td>[Drama, Crime]</td>
      <td>3338</td>
    </tr>
  </tbody>
</table>
</div>




```python
# 평점기반으로 추천으로 상위 10개 추출
movies_df[['title','vote_average','vote_count']].sort_values('vote_average', ascending=False)[:10]
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
      <th>title</th>
      <th>vote_average</th>
      <th>vote_count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>3519</th>
      <td>Stiff Upper Lips</td>
      <td>10.0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4247</th>
      <td>Me You and Five Bucks</td>
      <td>10.0</td>
      <td>2</td>
    </tr>
    <tr>
      <th>4045</th>
      <td>Dancer, Texas Pop. 81</td>
      <td>10.0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4662</th>
      <td>Little Big Top</td>
      <td>10.0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3992</th>
      <td>Sardaarji</td>
      <td>9.5</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2386</th>
      <td>One Man's Hero</td>
      <td>9.3</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2970</th>
      <td>There Goes My Baby</td>
      <td>8.5</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1881</th>
      <td>The Shawshank Redemption</td>
      <td>8.5</td>
      <td>8205</td>
    </tr>
    <tr>
      <th>2796</th>
      <td>The Prisoner of Zenda</td>
      <td>8.4</td>
      <td>11</td>
    </tr>
    <tr>
      <th>3337</th>
      <td>The Godfather</td>
      <td>8.4</td>
      <td>5893</td>
    </tr>
  </tbody>
</table>
</div>



## 4. 추천시스템에 가중평점 반영

@ 가중평점(Weighted Rating, 평점 & 평가횟수):

    (v/(v+m))*R + (m/(v+m))*C 

- v : 영화별 평점을 투표한 횟수(vote_count) # 변동값
- m : 평점 부여되는 기준(최소 투표횟수) -> 여기선 투표수 상위 60% 
- R : 개별 영화의 평점 # 변동값
- C : 전체 영화의 평점


```python
C = movies_df['vote_average'].mean()
m = movies_df['vote_count'].quantile(0.6)
```


```python
print('C:', round(C,3), 'm:',round(m,3))
```

    C: 6.092 m: 370.2


### 가중평균 계산 함수


```python
def weighted_vote_average(record): 
    v = record['vote_count']
    R = record['vote_average']
    
    return ((v/(v+m))*R)+((m/(m+v))*C)
```


```python
# 가중평점 컬럼 추가 
movies_df['weighted_vote'] = movies_df.apply(weighted_vote_average, axis = 1)
```


```python
movies_df.head(1)
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
      <th>id</th>
      <th>title</th>
      <th>genres</th>
      <th>vote_average</th>
      <th>vote_count</th>
      <th>popularity</th>
      <th>keywords</th>
      <th>overview</th>
      <th>genres_literal</th>
      <th>weighted_vote</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>19995</td>
      <td>Avatar</td>
      <td>[Action, Adventure, Fantasy, Science Fiction]</td>
      <td>7.2</td>
      <td>11800</td>
      <td>150.437577</td>
      <td>[culture clash, future, space war, space colon...</td>
      <td>In the 22nd century, a paraplegic Marine is di...</td>
      <td>Action Adventure Fantasy Science Fiction</td>
      <td>7.166301</td>
    </tr>
  </tbody>
</table>
</div>



## 5. 결과 -> 대부 유사영화 10개 추천 (가중평점 반영) 


```python
movies_df[['weighted_vote','title','vote_average','vote_count','genres']].sort_values('weighted_vote',ascending=False)[:10]
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
      <th>weighted_vote</th>
      <th>title</th>
      <th>vote_average</th>
      <th>vote_count</th>
      <th>genres</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1881</th>
      <td>8.396052</td>
      <td>The Shawshank Redemption</td>
      <td>8.5</td>
      <td>8205</td>
      <td>[Drama, Crime]</td>
    </tr>
    <tr>
      <th>3337</th>
      <td>8.263591</td>
      <td>The Godfather</td>
      <td>8.4</td>
      <td>5893</td>
      <td>[Drama, Crime]</td>
    </tr>
    <tr>
      <th>662</th>
      <td>8.216455</td>
      <td>Fight Club</td>
      <td>8.3</td>
      <td>9413</td>
      <td>[Drama]</td>
    </tr>
    <tr>
      <th>3232</th>
      <td>8.207102</td>
      <td>Pulp Fiction</td>
      <td>8.3</td>
      <td>8428</td>
      <td>[Thriller, Crime]</td>
    </tr>
    <tr>
      <th>65</th>
      <td>8.136930</td>
      <td>The Dark Knight</td>
      <td>8.2</td>
      <td>12002</td>
      <td>[Drama, Action, Crime, Thriller]</td>
    </tr>
    <tr>
      <th>1818</th>
      <td>8.126069</td>
      <td>Schindler's List</td>
      <td>8.3</td>
      <td>4329</td>
      <td>[Drama, History, War]</td>
    </tr>
    <tr>
      <th>3865</th>
      <td>8.123248</td>
      <td>Whiplash</td>
      <td>8.3</td>
      <td>4254</td>
      <td>[Drama]</td>
    </tr>
    <tr>
      <th>809</th>
      <td>8.105954</td>
      <td>Forrest Gump</td>
      <td>8.2</td>
      <td>7927</td>
      <td>[Comedy, Drama, Romance]</td>
    </tr>
    <tr>
      <th>2294</th>
      <td>8.105867</td>
      <td>Spirited Away</td>
      <td>8.3</td>
      <td>3840</td>
      <td>[Fantasy, Adventure, Animation, Family]</td>
    </tr>
    <tr>
      <th>2731</th>
      <td>8.079586</td>
      <td>The Godfather: Part II</td>
      <td>8.3</td>
      <td>3338</td>
      <td>[Drama, Crime]</td>
    </tr>
  </tbody>
</table>
</div>

