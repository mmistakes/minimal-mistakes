---
layout: single
title: '판다스 복습'
author_profile: false
published: false
sidebar:
    nav: "counts"
---

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import koreanize_matplotlib  
```


```python
df = pd.read_csv("saved_data/movie_df.csv")
df.shape
```




    (4916, 28)




```python
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
      <th>color</th>
      <th>director_name</th>
      <th>num_critic_for_reviews</th>
      <th>duration</th>
      <th>director_facebook_likes</th>
      <th>actor_3_facebook_likes</th>
      <th>actor_2_name</th>
      <th>actor_1_facebook_likes</th>
      <th>gross</th>
      <th>genres</th>
      <th>...</th>
      <th>num_user_for_reviews</th>
      <th>language</th>
      <th>country</th>
      <th>content_rating</th>
      <th>budget</th>
      <th>title_year</th>
      <th>actor_2_facebook_likes</th>
      <th>imdb_score</th>
      <th>aspect_ratio</th>
      <th>movie_facebook_likes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Color</td>
      <td>James Cameron</td>
      <td>723.0</td>
      <td>178.0</td>
      <td>0.0</td>
      <td>855.0</td>
      <td>Joel David Moore</td>
      <td>1000.0</td>
      <td>760505847.0</td>
      <td>Action|Adventure|Fantasy|Sci-Fi</td>
      <td>...</td>
      <td>3054.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>237000000.0</td>
      <td>2009.0</td>
      <td>936.0</td>
      <td>7.9</td>
      <td>1.78</td>
      <td>33000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Color</td>
      <td>Gore Verbinski</td>
      <td>302.0</td>
      <td>169.0</td>
      <td>563.0</td>
      <td>1000.0</td>
      <td>Orlando Bloom</td>
      <td>40000.0</td>
      <td>309404152.0</td>
      <td>Action|Adventure|Fantasy</td>
      <td>...</td>
      <td>1238.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>300000000.0</td>
      <td>2007.0</td>
      <td>5000.0</td>
      <td>7.1</td>
      <td>2.35</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Color</td>
      <td>Sam Mendes</td>
      <td>602.0</td>
      <td>148.0</td>
      <td>0.0</td>
      <td>161.0</td>
      <td>Rory Kinnear</td>
      <td>11000.0</td>
      <td>200074175.0</td>
      <td>Action|Adventure|Thriller</td>
      <td>...</td>
      <td>994.0</td>
      <td>English</td>
      <td>UK</td>
      <td>PG-13</td>
      <td>245000000.0</td>
      <td>2015.0</td>
      <td>393.0</td>
      <td>6.8</td>
      <td>2.35</td>
      <td>85000</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Color</td>
      <td>Christopher Nolan</td>
      <td>813.0</td>
      <td>164.0</td>
      <td>22000.0</td>
      <td>23000.0</td>
      <td>Christian Bale</td>
      <td>27000.0</td>
      <td>448130642.0</td>
      <td>Action|Thriller</td>
      <td>...</td>
      <td>2701.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>250000000.0</td>
      <td>2012.0</td>
      <td>23000.0</td>
      <td>8.5</td>
      <td>2.35</td>
      <td>164000</td>
    </tr>
    <tr>
      <th>4</th>
      <td>NaN</td>
      <td>Doug Walker</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>131.0</td>
      <td>NaN</td>
      <td>Rob Walker</td>
      <td>131.0</td>
      <td>NaN</td>
      <td>Documentary</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>12.0</td>
      <td>7.1</td>
      <td>NaN</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 28 columns</p>
</div>




```python
df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 4916 entries, 0 to 4915
    Data columns (total 28 columns):
     #   Column                     Non-Null Count  Dtype  
    ---  ------                     --------------  -----  
     0   color                      4897 non-null   object 
     1   director_name              4814 non-null   object 
     2   num_critic_for_reviews     4867 non-null   float64
     3   duration                   4901 non-null   float64
     4   director_facebook_likes    4814 non-null   float64
     5   actor_3_facebook_likes     4893 non-null   float64
     6   actor_2_name               4903 non-null   object 
     7   actor_1_facebook_likes     4909 non-null   float64
     8   gross                      4054 non-null   float64
     9   genres                     4916 non-null   object 
     10  actor_1_name               4909 non-null   object 
     11  movie_title                4916 non-null   object 
     12  num_voted_users            4916 non-null   int64  
     13  cast_total_facebook_likes  4916 non-null   int64  
     14  actor_3_name               4893 non-null   object 
     15  facenumber_in_poster       4903 non-null   float64
     16  plot_keywords              4764 non-null   object 
     17  movie_imdb_link            4916 non-null   object 
     18  num_user_for_reviews       4895 non-null   float64
     19  language                   4902 non-null   object 
     20  country                    4911 non-null   object 
     21  content_rating             4616 non-null   object 
     22  budget                     4432 non-null   float64
     23  title_year                 4810 non-null   float64
     24  actor_2_facebook_likes     4903 non-null   float64
     25  imdb_score                 4916 non-null   float64
     26  aspect_ratio               4590 non-null   float64
     27  movie_facebook_likes       4916 non-null   int64  
    dtypes: float64(13), int64(3), object(12)
    memory usage: 1.1+ MB
    

actor_facebook_likes -> float 타입으로 설정되어있다. 


```python
df[['actor_1_facebook_likes', 'actor_2_facebook_likes', 'actor_3_facebook_likes']].info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 4916 entries, 0 to 4915
    Data columns (total 3 columns):
     #   Column                  Non-Null Count  Dtype  
    ---  ------                  --------------  -----  
     0   actor_1_facebook_likes  4909 non-null   float64
     1   actor_2_facebook_likes  4903 non-null   float64
     2   actor_3_facebook_likes  4893 non-null   float64
    dtypes: float64(3)
    memory usage: 115.3 KB
    

null 값이 존재하면 int type은 floadt 타입으로 처리된다.


```python
df['actor_1_facebook_likes'].isna().sum()
```




    7



### astype()

- 정수: int8(-128~127), int16(+-3만5천), int32(+-21억), int64(+-9경)
- 실수: float16, float32, float64
- 문자열 : object


```python

type_df = pd.Series([10_000_000, 10_000_000_000])
type_df.info()
```

    <class 'pandas.core.series.Series'>
    RangeIndex: 2 entries, 0 to 1
    Series name: None
    Non-Null Count  Dtype
    --------------  -----
    2 non-null      int64
    dtypes: int64(1)
    memory usage: 148.0 bytes
    


```python
# int64 -> int16
# 범위가 작은 데이터 타입으로 변환시 데이터 손실 발생 
type_df.astype('int16')
```




    0   -27008
    1    -7168
    dtype: int16



### describe


```python
# 일반적으로 수치형 데이터의 통계정보를 보여준다 
df.describe()

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
      <th>num_critic_for_reviews</th>
      <th>duration</th>
      <th>director_facebook_likes</th>
      <th>actor_3_facebook_likes</th>
      <th>actor_1_facebook_likes</th>
      <th>gross</th>
      <th>num_voted_users</th>
      <th>cast_total_facebook_likes</th>
      <th>facenumber_in_poster</th>
      <th>num_user_for_reviews</th>
      <th>budget</th>
      <th>title_year</th>
      <th>actor_2_facebook_likes</th>
      <th>imdb_score</th>
      <th>aspect_ratio</th>
      <th>movie_facebook_likes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>4867.000000</td>
      <td>4901.000000</td>
      <td>4814.000000</td>
      <td>4893.000000</td>
      <td>4909.000000</td>
      <td>4.054000e+03</td>
      <td>4.916000e+03</td>
      <td>4916.000000</td>
      <td>4903.000000</td>
      <td>4895.000000</td>
      <td>4.432000e+03</td>
      <td>4810.000000</td>
      <td>4903.000000</td>
      <td>4916.000000</td>
      <td>4590.000000</td>
      <td>4916.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>137.988905</td>
      <td>107.090798</td>
      <td>691.014541</td>
      <td>631.276313</td>
      <td>6494.488491</td>
      <td>4.764451e+07</td>
      <td>8.264492e+04</td>
      <td>9579.815907</td>
      <td>1.377320</td>
      <td>267.668846</td>
      <td>3.654749e+07</td>
      <td>2002.447609</td>
      <td>1621.923516</td>
      <td>6.437429</td>
      <td>2.222349</td>
      <td>7348.294142</td>
    </tr>
    <tr>
      <th>std</th>
      <td>120.239379</td>
      <td>25.286015</td>
      <td>2832.954125</td>
      <td>1625.874802</td>
      <td>15106.986884</td>
      <td>6.737255e+07</td>
      <td>1.383222e+05</td>
      <td>18164.316990</td>
      <td>2.023826</td>
      <td>372.934839</td>
      <td>1.002427e+08</td>
      <td>12.453977</td>
      <td>4011.299523</td>
      <td>1.127802</td>
      <td>1.402940</td>
      <td>19206.016458</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1.000000</td>
      <td>7.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.620000e+02</td>
      <td>5.000000e+00</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>2.180000e+02</td>
      <td>1916.000000</td>
      <td>0.000000</td>
      <td>1.600000</td>
      <td>1.180000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>49.000000</td>
      <td>93.000000</td>
      <td>7.000000</td>
      <td>132.000000</td>
      <td>607.000000</td>
      <td>5.019656e+06</td>
      <td>8.361750e+03</td>
      <td>1394.750000</td>
      <td>0.000000</td>
      <td>64.000000</td>
      <td>6.000000e+06</td>
      <td>1999.000000</td>
      <td>277.000000</td>
      <td>5.800000</td>
      <td>1.850000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>108.000000</td>
      <td>103.000000</td>
      <td>48.000000</td>
      <td>366.000000</td>
      <td>982.000000</td>
      <td>2.504396e+07</td>
      <td>3.313250e+04</td>
      <td>3049.000000</td>
      <td>1.000000</td>
      <td>153.000000</td>
      <td>1.985000e+07</td>
      <td>2005.000000</td>
      <td>593.000000</td>
      <td>6.600000</td>
      <td>2.350000</td>
      <td>159.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>191.000000</td>
      <td>118.000000</td>
      <td>189.750000</td>
      <td>633.000000</td>
      <td>11000.000000</td>
      <td>6.110841e+07</td>
      <td>9.377275e+04</td>
      <td>13616.750000</td>
      <td>2.000000</td>
      <td>320.500000</td>
      <td>4.300000e+07</td>
      <td>2011.000000</td>
      <td>912.000000</td>
      <td>7.200000</td>
      <td>2.350000</td>
      <td>2000.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>813.000000</td>
      <td>511.000000</td>
      <td>23000.000000</td>
      <td>23000.000000</td>
      <td>640000.000000</td>
      <td>7.605058e+08</td>
      <td>1.689764e+06</td>
      <td>656730.000000</td>
      <td>43.000000</td>
      <td>5060.000000</td>
      <td>4.200000e+09</td>
      <td>2016.000000</td>
      <td>137000.000000</td>
      <td>9.500000</td>
      <td>16.000000</td>
      <td>349000.000000</td>
    </tr>
  </tbody>
</table>
</div>




```python
# 카테고리형의 정보를 보고싶다면 include 이용 
df.describe(include=['object']).T # count: 개수, unique : 고유값, top : 최빈값, freq : 최빈값의 개수 
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
      <th>count</th>
      <th>unique</th>
      <th>top</th>
      <th>freq</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>color</th>
      <td>4897</td>
      <td>2</td>
      <td>Color</td>
      <td>4693</td>
    </tr>
    <tr>
      <th>director_name</th>
      <td>4814</td>
      <td>2397</td>
      <td>Steven Spielberg</td>
      <td>26</td>
    </tr>
    <tr>
      <th>actor_2_name</th>
      <td>4903</td>
      <td>3030</td>
      <td>Morgan Freeman</td>
      <td>18</td>
    </tr>
    <tr>
      <th>genres</th>
      <td>4916</td>
      <td>914</td>
      <td>Drama</td>
      <td>233</td>
    </tr>
    <tr>
      <th>actor_1_name</th>
      <td>4909</td>
      <td>2095</td>
      <td>Robert De Niro</td>
      <td>48</td>
    </tr>
    <tr>
      <th>movie_title</th>
      <td>4916</td>
      <td>4916</td>
      <td>Avatar</td>
      <td>1</td>
    </tr>
    <tr>
      <th>actor_3_name</th>
      <td>4893</td>
      <td>3519</td>
      <td>Steve Coogan</td>
      <td>8</td>
    </tr>
    <tr>
      <th>plot_keywords</th>
      <td>4764</td>
      <td>4756</td>
      <td>based on novel</td>
      <td>4</td>
    </tr>
    <tr>
      <th>movie_imdb_link</th>
      <td>4916</td>
      <td>4916</td>
      <td>http://www.imdb.com/title/tt0499549/?ref_=fn_t...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>language</th>
      <td>4902</td>
      <td>46</td>
      <td>English</td>
      <td>4582</td>
    </tr>
    <tr>
      <th>country</th>
      <td>4911</td>
      <td>65</td>
      <td>USA</td>
      <td>3710</td>
    </tr>
    <tr>
      <th>content_rating</th>
      <td>4616</td>
      <td>18</td>
      <td>R</td>
      <td>2067</td>
    </tr>
  </tbody>
</table>
</div>



### na_values


```python
%%writefile test_na.csv

data1, data2, data3
?, 1, 2
apple, -11, banana
hello, -5, abc
```

    Overwriting test_na.csv
    


```python
test_na = pd.read_csv('test_na.csv')
test_na
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
      <th>data1</th>
      <th>data2</th>
      <th>data3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>?</td>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>apple</td>
      <td>-11</td>
      <td>banana</td>
    </tr>
    <tr>
      <th>2</th>
      <td>hello</td>
      <td>-5</td>
      <td>abc</td>
    </tr>
  </tbody>
</table>
</div>




```python
test_na = pd.read_csv('test_na.csv', na_values=['?', 'hello'])
test_na
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
      <th>data1</th>
      <th>data2</th>
      <th>data3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>NaN</td>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>apple</td>
      <td>-11</td>
      <td>banana</td>
    </tr>
    <tr>
      <th>2</th>
      <td>NaN</td>
      <td>-5</td>
      <td>abc</td>
    </tr>
  </tbody>
</table>
</div>



### Drop


```python
test_na.drop(labels='data1', axis=1)
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
      <th>data2</th>
      <th>data3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-11</td>
      <td>banana</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-5</td>
      <td>abc</td>
    </tr>
  </tbody>
</table>
</div>




```python
test_na.drop(labels=0)

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
      <th>data1</th>
      <th>data2</th>
      <th>data3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>apple</td>
      <td>-11</td>
      <td>banana</td>
    </tr>
    <tr>
      <th>2</th>
      <td>NaN</td>
      <td>-5</td>
      <td>abc</td>
    </tr>
  </tbody>
</table>
</div>




```python
test_na.drop(columns='data1')

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
      <th>data2</th>
      <th>data3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-11</td>
      <td>banana</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-5</td>
      <td>abc</td>
    </tr>
  </tbody>
</table>
</div>




```python
test_na.drop(index=0)

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
      <th>data1</th>
      <th>data2</th>
      <th>data3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>apple</td>
      <td>-11</td>
      <td>banana</td>
    </tr>
    <tr>
      <th>2</th>
      <td>NaN</td>
      <td>-5</td>
      <td>abc</td>
    </tr>
  </tbody>
</table>
</div>



### between 


```python
df.loc[df['actor_1_facebook_likes'].between(100,1000),'movie_title']
```




    0                                           Avatar
    4       Star Wars: Episode VII - The Force Awakens
    5                                      John Carter
    7                                          Tangled
    12                               Quantum of Solace
                               ...                    
    4908                                   El Mariachi
    4910                                     Newlyweds
    4911                       Signed Sealed Delivered
    4912                                 The Following
    4914                              Shanghai Calling
    Name: movie_title, Length: 2692, dtype: object



### insert


```python
test_na
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
      <th>data1</th>
      <th>data2</th>
      <th>data3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>NaN</td>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>apple</td>
      <td>-11</td>
      <td>banana</td>
    </tr>
    <tr>
      <th>2</th>
      <td>NaN</td>
      <td>-5</td>
      <td>abc</td>
    </tr>
  </tbody>
</table>
</div>




```python
test_na.insert(0, 'data', [1, 2, 3])
test_na
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
      <th>data</th>
      <th>data1</th>
      <th>data2</th>
      <th>data3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>NaN</td>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>apple</td>
      <td>-11</td>
      <td>banana</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>NaN</td>
      <td>-5</td>
      <td>abc</td>
    </tr>
  </tbody>
</table>
</div>



### 인덱스 조회 


```python
df.columns[[1, -1, 3]] # fancy indexing
```




    Index(['director_name', 'movie_facebook_likes', 'duration'], dtype='object')




```python
df.iloc[[0, 4, -1]]
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
      <th>color</th>
      <th>director_name</th>
      <th>num_critic_for_reviews</th>
      <th>duration</th>
      <th>director_facebook_likes</th>
      <th>actor_3_facebook_likes</th>
      <th>actor_2_name</th>
      <th>actor_1_facebook_likes</th>
      <th>gross</th>
      <th>genres</th>
      <th>...</th>
      <th>num_user_for_reviews</th>
      <th>language</th>
      <th>country</th>
      <th>content_rating</th>
      <th>budget</th>
      <th>title_year</th>
      <th>actor_2_facebook_likes</th>
      <th>imdb_score</th>
      <th>aspect_ratio</th>
      <th>movie_facebook_likes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Color</td>
      <td>James Cameron</td>
      <td>723.0</td>
      <td>178.0</td>
      <td>0.0</td>
      <td>855.0</td>
      <td>Joel David Moore</td>
      <td>1000.0</td>
      <td>760505847.0</td>
      <td>Action|Adventure|Fantasy|Sci-Fi</td>
      <td>...</td>
      <td>3054.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>237000000.0</td>
      <td>2009.0</td>
      <td>936.0</td>
      <td>7.9</td>
      <td>1.78</td>
      <td>33000</td>
    </tr>
    <tr>
      <th>4</th>
      <td>NaN</td>
      <td>Doug Walker</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>131.0</td>
      <td>NaN</td>
      <td>Rob Walker</td>
      <td>131.0</td>
      <td>NaN</td>
      <td>Documentary</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>12.0</td>
      <td>7.1</td>
      <td>NaN</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4915</th>
      <td>Color</td>
      <td>Jon Gunn</td>
      <td>43.0</td>
      <td>90.0</td>
      <td>16.0</td>
      <td>16.0</td>
      <td>Brian Herzlinger</td>
      <td>86.0</td>
      <td>85222.0</td>
      <td>Documentary</td>
      <td>...</td>
      <td>84.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG</td>
      <td>1100.0</td>
      <td>2004.0</td>
      <td>23.0</td>
      <td>6.6</td>
      <td>1.85</td>
      <td>456</td>
    </tr>
  </tbody>
</table>
<p>3 rows × 28 columns</p>
</div>




```python
df.loc[[0, 2, 6]]
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
      <th>color</th>
      <th>director_name</th>
      <th>num_critic_for_reviews</th>
      <th>duration</th>
      <th>director_facebook_likes</th>
      <th>actor_3_facebook_likes</th>
      <th>actor_2_name</th>
      <th>actor_1_facebook_likes</th>
      <th>gross</th>
      <th>genres</th>
      <th>...</th>
      <th>num_user_for_reviews</th>
      <th>language</th>
      <th>country</th>
      <th>content_rating</th>
      <th>budget</th>
      <th>title_year</th>
      <th>actor_2_facebook_likes</th>
      <th>imdb_score</th>
      <th>aspect_ratio</th>
      <th>movie_facebook_likes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Color</td>
      <td>James Cameron</td>
      <td>723.0</td>
      <td>178.0</td>
      <td>0.0</td>
      <td>855.0</td>
      <td>Joel David Moore</td>
      <td>1000.0</td>
      <td>760505847.0</td>
      <td>Action|Adventure|Fantasy|Sci-Fi</td>
      <td>...</td>
      <td>3054.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>237000000.0</td>
      <td>2009.0</td>
      <td>936.0</td>
      <td>7.9</td>
      <td>1.78</td>
      <td>33000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Color</td>
      <td>Sam Mendes</td>
      <td>602.0</td>
      <td>148.0</td>
      <td>0.0</td>
      <td>161.0</td>
      <td>Rory Kinnear</td>
      <td>11000.0</td>
      <td>200074175.0</td>
      <td>Action|Adventure|Thriller</td>
      <td>...</td>
      <td>994.0</td>
      <td>English</td>
      <td>UK</td>
      <td>PG-13</td>
      <td>245000000.0</td>
      <td>2015.0</td>
      <td>393.0</td>
      <td>6.8</td>
      <td>2.35</td>
      <td>85000</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Color</td>
      <td>Sam Raimi</td>
      <td>392.0</td>
      <td>156.0</td>
      <td>0.0</td>
      <td>4000.0</td>
      <td>James Franco</td>
      <td>24000.0</td>
      <td>336530303.0</td>
      <td>Action|Adventure|Romance</td>
      <td>...</td>
      <td>1902.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>258000000.0</td>
      <td>2007.0</td>
      <td>11000.0</td>
      <td>6.2</td>
      <td>2.35</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>3 rows × 28 columns</p>
</div>



### select_dtypes
- include
- exclude


```python
# 특정 타입의 데이터만 가져오기 
df.select_dtypes(include=['int64', 'float64'])
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
      <th>num_critic_for_reviews</th>
      <th>duration</th>
      <th>director_facebook_likes</th>
      <th>actor_3_facebook_likes</th>
      <th>actor_1_facebook_likes</th>
      <th>gross</th>
      <th>num_voted_users</th>
      <th>cast_total_facebook_likes</th>
      <th>facenumber_in_poster</th>
      <th>num_user_for_reviews</th>
      <th>budget</th>
      <th>title_year</th>
      <th>actor_2_facebook_likes</th>
      <th>imdb_score</th>
      <th>aspect_ratio</th>
      <th>movie_facebook_likes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>723.0</td>
      <td>178.0</td>
      <td>0.0</td>
      <td>855.0</td>
      <td>1000.0</td>
      <td>760505847.0</td>
      <td>886204</td>
      <td>4834</td>
      <td>0.0</td>
      <td>3054.0</td>
      <td>237000000.0</td>
      <td>2009.0</td>
      <td>936.0</td>
      <td>7.9</td>
      <td>1.78</td>
      <td>33000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>302.0</td>
      <td>169.0</td>
      <td>563.0</td>
      <td>1000.0</td>
      <td>40000.0</td>
      <td>309404152.0</td>
      <td>471220</td>
      <td>48350</td>
      <td>0.0</td>
      <td>1238.0</td>
      <td>300000000.0</td>
      <td>2007.0</td>
      <td>5000.0</td>
      <td>7.1</td>
      <td>2.35</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>602.0</td>
      <td>148.0</td>
      <td>0.0</td>
      <td>161.0</td>
      <td>11000.0</td>
      <td>200074175.0</td>
      <td>275868</td>
      <td>11700</td>
      <td>1.0</td>
      <td>994.0</td>
      <td>245000000.0</td>
      <td>2015.0</td>
      <td>393.0</td>
      <td>6.8</td>
      <td>2.35</td>
      <td>85000</td>
    </tr>
    <tr>
      <th>3</th>
      <td>813.0</td>
      <td>164.0</td>
      <td>22000.0</td>
      <td>23000.0</td>
      <td>27000.0</td>
      <td>448130642.0</td>
      <td>1144337</td>
      <td>106759</td>
      <td>0.0</td>
      <td>2701.0</td>
      <td>250000000.0</td>
      <td>2012.0</td>
      <td>23000.0</td>
      <td>8.5</td>
      <td>2.35</td>
      <td>164000</td>
    </tr>
    <tr>
      <th>4</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>131.0</td>
      <td>NaN</td>
      <td>131.0</td>
      <td>NaN</td>
      <td>8</td>
      <td>143</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>12.0</td>
      <td>7.1</td>
      <td>NaN</td>
      <td>0</td>
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
      <th>4911</th>
      <td>1.0</td>
      <td>87.0</td>
      <td>2.0</td>
      <td>318.0</td>
      <td>637.0</td>
      <td>NaN</td>
      <td>629</td>
      <td>2283</td>
      <td>2.0</td>
      <td>6.0</td>
      <td>NaN</td>
      <td>2013.0</td>
      <td>470.0</td>
      <td>7.7</td>
      <td>NaN</td>
      <td>84</td>
    </tr>
    <tr>
      <th>4912</th>
      <td>43.0</td>
      <td>43.0</td>
      <td>NaN</td>
      <td>319.0</td>
      <td>841.0</td>
      <td>NaN</td>
      <td>73839</td>
      <td>1753</td>
      <td>1.0</td>
      <td>359.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>593.0</td>
      <td>7.5</td>
      <td>16.00</td>
      <td>32000</td>
    </tr>
    <tr>
      <th>4913</th>
      <td>13.0</td>
      <td>76.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>38</td>
      <td>0</td>
      <td>0.0</td>
      <td>3.0</td>
      <td>1400.0</td>
      <td>2013.0</td>
      <td>0.0</td>
      <td>6.3</td>
      <td>NaN</td>
      <td>16</td>
    </tr>
    <tr>
      <th>4914</th>
      <td>14.0</td>
      <td>100.0</td>
      <td>0.0</td>
      <td>489.0</td>
      <td>946.0</td>
      <td>10443.0</td>
      <td>1255</td>
      <td>2386</td>
      <td>5.0</td>
      <td>9.0</td>
      <td>NaN</td>
      <td>2012.0</td>
      <td>719.0</td>
      <td>6.3</td>
      <td>2.35</td>
      <td>660</td>
    </tr>
    <tr>
      <th>4915</th>
      <td>43.0</td>
      <td>90.0</td>
      <td>16.0</td>
      <td>16.0</td>
      <td>86.0</td>
      <td>85222.0</td>
      <td>4285</td>
      <td>163</td>
      <td>0.0</td>
      <td>84.0</td>
      <td>1100.0</td>
      <td>2004.0</td>
      <td>23.0</td>
      <td>6.6</td>
      <td>1.85</td>
      <td>456</td>
    </tr>
  </tbody>
</table>
<p>4916 rows × 16 columns</p>
</div>




```python
df.select_dtypes(include=['int64', 'float64']).info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 4916 entries, 0 to 4915
    Data columns (total 16 columns):
     #   Column                     Non-Null Count  Dtype  
    ---  ------                     --------------  -----  
     0   num_critic_for_reviews     4867 non-null   float64
     1   duration                   4901 non-null   float64
     2   director_facebook_likes    4814 non-null   float64
     3   actor_3_facebook_likes     4893 non-null   float64
     4   actor_1_facebook_likes     4909 non-null   float64
     5   gross                      4054 non-null   float64
     6   num_voted_users            4916 non-null   int64  
     7   cast_total_facebook_likes  4916 non-null   int64  
     8   facenumber_in_poster       4903 non-null   float64
     9   num_user_for_reviews       4895 non-null   float64
     10  budget                     4432 non-null   float64
     11  title_year                 4810 non-null   float64
     12  actor_2_facebook_likes     4903 non-null   float64
     13  imdb_score                 4916 non-null   float64
     14  aspect_ratio               4590 non-null   float64
     15  movie_facebook_likes       4916 non-null   int64  
    dtypes: float64(13), int64(3)
    memory usage: 614.6 KB
    


```python
df.select_dtypes(exclude="object")

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
      <th>num_critic_for_reviews</th>
      <th>duration</th>
      <th>director_facebook_likes</th>
      <th>actor_3_facebook_likes</th>
      <th>actor_1_facebook_likes</th>
      <th>gross</th>
      <th>num_voted_users</th>
      <th>cast_total_facebook_likes</th>
      <th>facenumber_in_poster</th>
      <th>num_user_for_reviews</th>
      <th>budget</th>
      <th>title_year</th>
      <th>actor_2_facebook_likes</th>
      <th>imdb_score</th>
      <th>aspect_ratio</th>
      <th>movie_facebook_likes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>723.0</td>
      <td>178.0</td>
      <td>0.0</td>
      <td>855.0</td>
      <td>1000.0</td>
      <td>760505847.0</td>
      <td>886204</td>
      <td>4834</td>
      <td>0.0</td>
      <td>3054.0</td>
      <td>237000000.0</td>
      <td>2009.0</td>
      <td>936.0</td>
      <td>7.9</td>
      <td>1.78</td>
      <td>33000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>302.0</td>
      <td>169.0</td>
      <td>563.0</td>
      <td>1000.0</td>
      <td>40000.0</td>
      <td>309404152.0</td>
      <td>471220</td>
      <td>48350</td>
      <td>0.0</td>
      <td>1238.0</td>
      <td>300000000.0</td>
      <td>2007.0</td>
      <td>5000.0</td>
      <td>7.1</td>
      <td>2.35</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>602.0</td>
      <td>148.0</td>
      <td>0.0</td>
      <td>161.0</td>
      <td>11000.0</td>
      <td>200074175.0</td>
      <td>275868</td>
      <td>11700</td>
      <td>1.0</td>
      <td>994.0</td>
      <td>245000000.0</td>
      <td>2015.0</td>
      <td>393.0</td>
      <td>6.8</td>
      <td>2.35</td>
      <td>85000</td>
    </tr>
    <tr>
      <th>3</th>
      <td>813.0</td>
      <td>164.0</td>
      <td>22000.0</td>
      <td>23000.0</td>
      <td>27000.0</td>
      <td>448130642.0</td>
      <td>1144337</td>
      <td>106759</td>
      <td>0.0</td>
      <td>2701.0</td>
      <td>250000000.0</td>
      <td>2012.0</td>
      <td>23000.0</td>
      <td>8.5</td>
      <td>2.35</td>
      <td>164000</td>
    </tr>
    <tr>
      <th>4</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>131.0</td>
      <td>NaN</td>
      <td>131.0</td>
      <td>NaN</td>
      <td>8</td>
      <td>143</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>12.0</td>
      <td>7.1</td>
      <td>NaN</td>
      <td>0</td>
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
      <th>4911</th>
      <td>1.0</td>
      <td>87.0</td>
      <td>2.0</td>
      <td>318.0</td>
      <td>637.0</td>
      <td>NaN</td>
      <td>629</td>
      <td>2283</td>
      <td>2.0</td>
      <td>6.0</td>
      <td>NaN</td>
      <td>2013.0</td>
      <td>470.0</td>
      <td>7.7</td>
      <td>NaN</td>
      <td>84</td>
    </tr>
    <tr>
      <th>4912</th>
      <td>43.0</td>
      <td>43.0</td>
      <td>NaN</td>
      <td>319.0</td>
      <td>841.0</td>
      <td>NaN</td>
      <td>73839</td>
      <td>1753</td>
      <td>1.0</td>
      <td>359.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>593.0</td>
      <td>7.5</td>
      <td>16.00</td>
      <td>32000</td>
    </tr>
    <tr>
      <th>4913</th>
      <td>13.0</td>
      <td>76.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>38</td>
      <td>0</td>
      <td>0.0</td>
      <td>3.0</td>
      <td>1400.0</td>
      <td>2013.0</td>
      <td>0.0</td>
      <td>6.3</td>
      <td>NaN</td>
      <td>16</td>
    </tr>
    <tr>
      <th>4914</th>
      <td>14.0</td>
      <td>100.0</td>
      <td>0.0</td>
      <td>489.0</td>
      <td>946.0</td>
      <td>10443.0</td>
      <td>1255</td>
      <td>2386</td>
      <td>5.0</td>
      <td>9.0</td>
      <td>NaN</td>
      <td>2012.0</td>
      <td>719.0</td>
      <td>6.3</td>
      <td>2.35</td>
      <td>660</td>
    </tr>
    <tr>
      <th>4915</th>
      <td>43.0</td>
      <td>90.0</td>
      <td>16.0</td>
      <td>16.0</td>
      <td>86.0</td>
      <td>85222.0</td>
      <td>4285</td>
      <td>163</td>
      <td>0.0</td>
      <td>84.0</td>
      <td>1100.0</td>
      <td>2004.0</td>
      <td>23.0</td>
      <td>6.6</td>
      <td>1.85</td>
      <td>456</td>
    </tr>
  </tbody>
</table>
<p>4916 rows × 16 columns</p>
</div>



### filter
- items
- like
- regex : 정규표현식



```python
df.filter(items=['color', 'plot_keywords'])
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
      <th>color</th>
      <th>plot_keywords</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Color</td>
      <td>avatar|future|marine|native|paraplegic</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Color</td>
      <td>goddess|marriage ceremony|marriage proposal|pi...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Color</td>
      <td>bomb|espionage|sequel|spy|terrorist</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Color</td>
      <td>deception|imprisonment|lawlessness|police offi...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>4911</th>
      <td>Color</td>
      <td>fraud|postal worker|prison|theft|trial</td>
    </tr>
    <tr>
      <th>4912</th>
      <td>Color</td>
      <td>cult|fbi|hideout|prison escape|serial killer</td>
    </tr>
    <tr>
      <th>4913</th>
      <td>Color</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>4914</th>
      <td>Color</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>4915</th>
      <td>Color</td>
      <td>actress name in title|crush|date|four word tit...</td>
    </tr>
  </tbody>
</table>
<p>4916 rows × 2 columns</p>
</div>




```python
df.columns
```




    Index(['color', 'director_name', 'num_critic_for_reviews', 'duration',
           'director_facebook_likes', 'actor_3_facebook_likes', 'actor_2_name',
           'actor_1_facebook_likes', 'gross', 'genres', 'actor_1_name',
           'movie_title', 'num_voted_users', 'cast_total_facebook_likes',
           'actor_3_name', 'facenumber_in_poster', 'plot_keywords',
           'movie_imdb_link', 'num_user_for_reviews', 'language', 'country',
           'content_rating', 'budget', 'title_year', 'actor_2_facebook_likes',
           'imdb_score', 'aspect_ratio', 'movie_facebook_likes'],
          dtype='object')




```python
df.filter(like='_like').head(3)
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
      <th>director_facebook_likes</th>
      <th>actor_3_facebook_likes</th>
      <th>actor_1_facebook_likes</th>
      <th>cast_total_facebook_likes</th>
      <th>actor_2_facebook_likes</th>
      <th>movie_facebook_likes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.0</td>
      <td>855.0</td>
      <td>1000.0</td>
      <td>4834</td>
      <td>936.0</td>
      <td>33000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>563.0</td>
      <td>1000.0</td>
      <td>40000.0</td>
      <td>48350</td>
      <td>5000.0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.0</td>
      <td>161.0</td>
      <td>11000.0</td>
      <td>11700</td>
      <td>393.0</td>
      <td>85000</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.filter(like='_facebook_').head(3)

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
      <th>director_facebook_likes</th>
      <th>actor_3_facebook_likes</th>
      <th>actor_1_facebook_likes</th>
      <th>cast_total_facebook_likes</th>
      <th>actor_2_facebook_likes</th>
      <th>movie_facebook_likes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.0</td>
      <td>855.0</td>
      <td>1000.0</td>
      <td>4834</td>
      <td>936.0</td>
      <td>33000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>563.0</td>
      <td>1000.0</td>
      <td>40000.0</td>
      <td>48350</td>
      <td>5000.0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.0</td>
      <td>161.0</td>
      <td>11000.0</td>
      <td>11700</td>
      <td>393.0</td>
      <td>85000</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.filter(regex=r'actor_[123]_name').head()
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
      <th>actor_2_name</th>
      <th>actor_1_name</th>
      <th>actor_3_name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Joel David Moore</td>
      <td>CCH Pounder</td>
      <td>Wes Studi</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Orlando Bloom</td>
      <td>Johnny Depp</td>
      <td>Jack Davenport</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Rory Kinnear</td>
      <td>Christoph Waltz</td>
      <td>Stephanie Sigman</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Christian Bale</td>
      <td>Tom Hardy</td>
      <td>Joseph Gordon-Levitt</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Rob Walker</td>
      <td>Doug Walker</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>



### loc[index이름 , 컬럼이름], iloc[index 번호 , 컬럼 번호]


```python
df.loc[0, 'director_name']
```




    'James Cameron'




```python
df.iloc[0,1]

```




    'James Cameron'




```python
df.columns
```




    Index(['color', 'director_name', 'num_critic_for_reviews', 'duration',
           'director_facebook_likes', 'actor_3_facebook_likes', 'actor_2_name',
           'actor_1_facebook_likes', 'gross', 'genres', 'actor_1_name',
           'movie_title', 'num_voted_users', 'cast_total_facebook_likes',
           'actor_3_name', 'facenumber_in_poster', 'plot_keywords',
           'movie_imdb_link', 'num_user_for_reviews', 'language', 'country',
           'content_rating', 'budget', 'title_year', 'actor_2_facebook_likes',
           'imdb_score', 'aspect_ratio', 'movie_facebook_likes'],
          dtype='object')



정렬 후 문자로 조회 가능  


```python
df2 = df.set_index('movie_title')
df2 = df2.sort_index()
df2.head()
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
      <th>color</th>
      <th>director_name</th>
      <th>num_critic_for_reviews</th>
      <th>duration</th>
      <th>director_facebook_likes</th>
      <th>actor_3_facebook_likes</th>
      <th>actor_2_name</th>
      <th>actor_1_facebook_likes</th>
      <th>gross</th>
      <th>genres</th>
      <th>...</th>
      <th>num_user_for_reviews</th>
      <th>language</th>
      <th>country</th>
      <th>content_rating</th>
      <th>budget</th>
      <th>title_year</th>
      <th>actor_2_facebook_likes</th>
      <th>imdb_score</th>
      <th>aspect_ratio</th>
      <th>movie_facebook_likes</th>
    </tr>
    <tr>
      <th>movie_title</th>
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
      <th>#Horror</th>
      <td>Color</td>
      <td>Tara Subkoff</td>
      <td>35.0</td>
      <td>101.0</td>
      <td>37.0</td>
      <td>56.0</td>
      <td>Balthazar Getty</td>
      <td>501.0</td>
      <td>NaN</td>
      <td>Drama|Horror|Mystery|Thriller</td>
      <td>...</td>
      <td>42.0</td>
      <td>English</td>
      <td>USA</td>
      <td>Not Rated</td>
      <td>1500000.0</td>
      <td>2015.0</td>
      <td>418.0</td>
      <td>3.3</td>
      <td>NaN</td>
      <td>750</td>
    </tr>
    <tr>
      <th>10 Cloverfield Lane</th>
      <td>Color</td>
      <td>Dan Trachtenberg</td>
      <td>411.0</td>
      <td>104.0</td>
      <td>16.0</td>
      <td>82.0</td>
      <td>John Gallagher Jr.</td>
      <td>14000.0</td>
      <td>71897215.0</td>
      <td>Drama|Horror|Mystery|Sci-Fi|Thriller</td>
      <td>...</td>
      <td>440.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>15000000.0</td>
      <td>2016.0</td>
      <td>338.0</td>
      <td>7.3</td>
      <td>2.35</td>
      <td>33000</td>
    </tr>
    <tr>
      <th>10 Days in a Madhouse</th>
      <td>Color</td>
      <td>Timothy Hines</td>
      <td>1.0</td>
      <td>111.0</td>
      <td>0.0</td>
      <td>247.0</td>
      <td>Kelly LeBrock</td>
      <td>1000.0</td>
      <td>14616.0</td>
      <td>Drama</td>
      <td>...</td>
      <td>10.0</td>
      <td>English</td>
      <td>USA</td>
      <td>R</td>
      <td>12000000.0</td>
      <td>2015.0</td>
      <td>445.0</td>
      <td>7.5</td>
      <td>1.85</td>
      <td>26000</td>
    </tr>
    <tr>
      <th>10 Things I Hate About You</th>
      <td>Color</td>
      <td>Gil Junger</td>
      <td>133.0</td>
      <td>97.0</td>
      <td>19.0</td>
      <td>835.0</td>
      <td>Heath Ledger</td>
      <td>23000.0</td>
      <td>38176108.0</td>
      <td>Comedy|Drama|Romance</td>
      <td>...</td>
      <td>549.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>16000000.0</td>
      <td>1999.0</td>
      <td>13000.0</td>
      <td>7.2</td>
      <td>1.85</td>
      <td>10000</td>
    </tr>
    <tr>
      <th>10,000 B.C.</th>
      <td>NaN</td>
      <td>Christopher Barnard</td>
      <td>NaN</td>
      <td>22.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>5.0</td>
      <td>NaN</td>
      <td>Comedy</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>7.2</td>
      <td>NaN</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 27 columns</p>
</div>




```python
df2.loc['A':'C']
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
      <th>color</th>
      <th>director_name</th>
      <th>num_critic_for_reviews</th>
      <th>duration</th>
      <th>director_facebook_likes</th>
      <th>actor_3_facebook_likes</th>
      <th>actor_2_name</th>
      <th>actor_1_facebook_likes</th>
      <th>gross</th>
      <th>genres</th>
      <th>...</th>
      <th>num_user_for_reviews</th>
      <th>language</th>
      <th>country</th>
      <th>content_rating</th>
      <th>budget</th>
      <th>title_year</th>
      <th>actor_2_facebook_likes</th>
      <th>imdb_score</th>
      <th>aspect_ratio</th>
      <th>movie_facebook_likes</th>
    </tr>
    <tr>
      <th>movie_title</th>
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
      <th>A Beautiful Mind</th>
      <td>Color</td>
      <td>Ron Howard</td>
      <td>205.0</td>
      <td>135.0</td>
      <td>2000.0</td>
      <td>535.0</td>
      <td>Austin Pendleton</td>
      <td>1000.0</td>
      <td>170708996.0</td>
      <td>Biography|Drama</td>
      <td>...</td>
      <td>1171.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>58000000.0</td>
      <td>2001.0</td>
      <td>592.0</td>
      <td>8.2</td>
      <td>1.85</td>
      <td>29000</td>
    </tr>
    <tr>
      <th>A Beginner's Guide to Snuff</th>
      <td>Color</td>
      <td>Mitchell Altieri</td>
      <td>NaN</td>
      <td>87.0</td>
      <td>9.0</td>
      <td>165.0</td>
      <td>Luke Edwards</td>
      <td>467.0</td>
      <td>NaN</td>
      <td>Comedy|Horror|Thriller</td>
      <td>...</td>
      <td>NaN</td>
      <td>English</td>
      <td>USA</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>2016.0</td>
      <td>258.0</td>
      <td>8.7</td>
      <td>NaN</td>
      <td>8</td>
    </tr>
    <tr>
      <th>A Better Life</th>
      <td>Color</td>
      <td>Chris Weitz</td>
      <td>94.0</td>
      <td>98.0</td>
      <td>129.0</td>
      <td>221.0</td>
      <td>Eddie 'Piolin' Sotelo</td>
      <td>749.0</td>
      <td>1754319.0</td>
      <td>Drama|Romance</td>
      <td>...</td>
      <td>81.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>10000000.0</td>
      <td>2011.0</td>
      <td>252.0</td>
      <td>7.2</td>
      <td>1.85</td>
      <td>0</td>
    </tr>
    <tr>
      <th>A Bridge Too Far</th>
      <td>Black and White</td>
      <td>Richard Attenborough</td>
      <td>56.0</td>
      <td>175.0</td>
      <td>0.0</td>
      <td>14.0</td>
      <td>Dirk Bogarde</td>
      <td>385.0</td>
      <td>50800000.0</td>
      <td>Drama|History|War</td>
      <td>...</td>
      <td>210.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG</td>
      <td>26000000.0</td>
      <td>1977.0</td>
      <td>232.0</td>
      <td>7.4</td>
      <td>2.35</td>
      <td>0</td>
    </tr>
    <tr>
      <th>A Bug's Life</th>
      <td>Color</td>
      <td>John Lasseter</td>
      <td>117.0</td>
      <td>95.0</td>
      <td>487.0</td>
      <td>1000.0</td>
      <td>Madeline Kahn</td>
      <td>18000.0</td>
      <td>162792677.0</td>
      <td>Adventure|Animation|Comedy|Family|Fantasy</td>
      <td>...</td>
      <td>317.0</td>
      <td>English</td>
      <td>USA</td>
      <td>G</td>
      <td>120000000.0</td>
      <td>1998.0</td>
      <td>1000.0</td>
      <td>7.2</td>
      <td>2.35</td>
      <td>0</td>
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
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
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
      <th>But I'm a Cheerleader</th>
      <td>Color</td>
      <td>Jamie Babbit</td>
      <td>99.0</td>
      <td>85.0</td>
      <td>91.0</td>
      <td>849.0</td>
      <td>Clea DuVall</td>
      <td>1000.0</td>
      <td>2199853.0</td>
      <td>Comedy|Drama</td>
      <td>...</td>
      <td>186.0</td>
      <td>English</td>
      <td>USA</td>
      <td>R</td>
      <td>1200000.0</td>
      <td>1999.0</td>
      <td>1000.0</td>
      <td>6.6</td>
      <td>1.85</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Butch Cassidy and the Sundance Kid</th>
      <td>Color</td>
      <td>George Roy Hill</td>
      <td>130.0</td>
      <td>110.0</td>
      <td>131.0</td>
      <td>399.0</td>
      <td>Ted Cassidy</td>
      <td>640.0</td>
      <td>102308900.0</td>
      <td>Biography|Crime|Drama|Western</td>
      <td>...</td>
      <td>309.0</td>
      <td>English</td>
      <td>USA</td>
      <td>M</td>
      <td>6000000.0</td>
      <td>1969.0</td>
      <td>566.0</td>
      <td>8.1</td>
      <td>2.35</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Butterfly</th>
      <td>Color</td>
      <td>Matt Cimber</td>
      <td>15.0</td>
      <td>108.0</td>
      <td>32.0</td>
      <td>180.0</td>
      <td>June Lockhart</td>
      <td>602.0</td>
      <td>NaN</td>
      <td>Crime|Drama</td>
      <td>...</td>
      <td>18.0</td>
      <td>English</td>
      <td>USA</td>
      <td>R</td>
      <td>NaN</td>
      <td>1982.0</td>
      <td>427.0</td>
      <td>4.5</td>
      <td>1.85</td>
      <td>76</td>
    </tr>
    <tr>
      <th>Butterfly Girl</th>
      <td>Color</td>
      <td>Cary Bell</td>
      <td>NaN</td>
      <td>78.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>Stacie Evans</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>Documentary</td>
      <td>...</td>
      <td>1.0</td>
      <td>English</td>
      <td>USA</td>
      <td>NaN</td>
      <td>180000.0</td>
      <td>2014.0</td>
      <td>0.0</td>
      <td>8.7</td>
      <td>NaN</td>
      <td>88</td>
    </tr>
    <tr>
      <th>By the Sea</th>
      <td>Color</td>
      <td>Angelina Jolie Pitt</td>
      <td>131.0</td>
      <td>122.0</td>
      <td>11000.0</td>
      <td>188.0</td>
      <td>Angelina Jolie Pitt</td>
      <td>11000.0</td>
      <td>531009.0</td>
      <td>Drama|Romance</td>
      <td>...</td>
      <td>61.0</td>
      <td>English</td>
      <td>USA</td>
      <td>R</td>
      <td>10000000.0</td>
      <td>2015.0</td>
      <td>11000.0</td>
      <td>5.3</td>
      <td>2.35</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>600 rows × 27 columns</p>
</div>




```python
df2 = df.set_index('director_name')
df2 = df2.sort_index()
df2.head()
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
      <th>color</th>
      <th>num_critic_for_reviews</th>
      <th>duration</th>
      <th>director_facebook_likes</th>
      <th>actor_3_facebook_likes</th>
      <th>actor_2_name</th>
      <th>actor_1_facebook_likes</th>
      <th>gross</th>
      <th>genres</th>
      <th>actor_1_name</th>
      <th>...</th>
      <th>num_user_for_reviews</th>
      <th>language</th>
      <th>country</th>
      <th>content_rating</th>
      <th>budget</th>
      <th>title_year</th>
      <th>actor_2_facebook_likes</th>
      <th>imdb_score</th>
      <th>aspect_ratio</th>
      <th>movie_facebook_likes</th>
    </tr>
    <tr>
      <th>director_name</th>
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
      <th>A. Raven Cruz</th>
      <td>Color</td>
      <td>3.0</td>
      <td>97.0</td>
      <td>0.0</td>
      <td>94.0</td>
      <td>Vanilla Ice</td>
      <td>639.0</td>
      <td>NaN</td>
      <td>Action|Adventure|Comedy|Fantasy|Sci-Fi</td>
      <td>Scott Levy</td>
      <td>...</td>
      <td>9.0</td>
      <td>English</td>
      <td>USA</td>
      <td>R</td>
      <td>1000000.0</td>
      <td>2005.0</td>
      <td>361.0</td>
      <td>1.9</td>
      <td>1.78</td>
      <td>128</td>
    </tr>
    <tr>
      <th>Aaron Hann</th>
      <td>Color</td>
      <td>29.0</td>
      <td>87.0</td>
      <td>0.0</td>
      <td>94.0</td>
      <td>Michael McLafferty</td>
      <td>160.0</td>
      <td>NaN</td>
      <td>Drama|Horror|Mystery|Sci-Fi|Thriller</td>
      <td>Jordi Vilasuso</td>
      <td>...</td>
      <td>59.0</td>
      <td>English</td>
      <td>USA</td>
      <td>Not Rated</td>
      <td>NaN</td>
      <td>2015.0</td>
      <td>152.0</td>
      <td>6.0</td>
      <td>NaN</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Aaron Schneider</th>
      <td>Color</td>
      <td>160.0</td>
      <td>100.0</td>
      <td>11.0</td>
      <td>970.0</td>
      <td>Robert Duvall</td>
      <td>13000.0</td>
      <td>9176553.0</td>
      <td>Drama|Mystery</td>
      <td>Bill Murray</td>
      <td>...</td>
      <td>97.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>7500000.0</td>
      <td>2009.0</td>
      <td>3000.0</td>
      <td>7.1</td>
      <td>2.35</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Aaron Seltzer</th>
      <td>Color</td>
      <td>99.0</td>
      <td>85.0</td>
      <td>64.0</td>
      <td>729.0</td>
      <td>Carmen Electra</td>
      <td>3000.0</td>
      <td>48546578.0</td>
      <td>Comedy|Romance</td>
      <td>Alyson Hannigan</td>
      <td>...</td>
      <td>613.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>20000000.0</td>
      <td>2006.0</td>
      <td>869.0</td>
      <td>2.7</td>
      <td>1.85</td>
      <td>806</td>
    </tr>
    <tr>
      <th>Abel Ferrara</th>
      <td>Color</td>
      <td>48.0</td>
      <td>99.0</td>
      <td>220.0</td>
      <td>599.0</td>
      <td>Vincent Gallo</td>
      <td>812.0</td>
      <td>1227324.0</td>
      <td>Crime|Drama</td>
      <td>Isabella Rossellini</td>
      <td>...</td>
      <td>48.0</td>
      <td>English</td>
      <td>USA</td>
      <td>R</td>
      <td>12500000.0</td>
      <td>1996.0</td>
      <td>787.0</td>
      <td>6.6</td>
      <td>1.85</td>
      <td>344</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 27 columns</p>
</div>




```python
# 결측치가 존재하지 않을떄만 가능 
df3 = df[df.director_name.notna()]
df4 = df3.set_index("director_name").sort_index()
df4.loc['A':'C']
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
      <th>color</th>
      <th>num_critic_for_reviews</th>
      <th>duration</th>
      <th>director_facebook_likes</th>
      <th>actor_3_facebook_likes</th>
      <th>actor_2_name</th>
      <th>actor_1_facebook_likes</th>
      <th>gross</th>
      <th>genres</th>
      <th>actor_1_name</th>
      <th>...</th>
      <th>num_user_for_reviews</th>
      <th>language</th>
      <th>country</th>
      <th>content_rating</th>
      <th>budget</th>
      <th>title_year</th>
      <th>actor_2_facebook_likes</th>
      <th>imdb_score</th>
      <th>aspect_ratio</th>
      <th>movie_facebook_likes</th>
    </tr>
    <tr>
      <th>director_name</th>
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
      <th>A. Raven Cruz</th>
      <td>Color</td>
      <td>3.0</td>
      <td>97.0</td>
      <td>0.0</td>
      <td>94.0</td>
      <td>Vanilla Ice</td>
      <td>639.0</td>
      <td>NaN</td>
      <td>Action|Adventure|Comedy|Fantasy|Sci-Fi</td>
      <td>Scott Levy</td>
      <td>...</td>
      <td>9.0</td>
      <td>English</td>
      <td>USA</td>
      <td>R</td>
      <td>1000000.0</td>
      <td>2005.0</td>
      <td>361.0</td>
      <td>1.9</td>
      <td>1.78</td>
      <td>128</td>
    </tr>
    <tr>
      <th>Aaron Hann</th>
      <td>Color</td>
      <td>29.0</td>
      <td>87.0</td>
      <td>0.0</td>
      <td>94.0</td>
      <td>Michael McLafferty</td>
      <td>160.0</td>
      <td>NaN</td>
      <td>Drama|Horror|Mystery|Sci-Fi|Thriller</td>
      <td>Jordi Vilasuso</td>
      <td>...</td>
      <td>59.0</td>
      <td>English</td>
      <td>USA</td>
      <td>Not Rated</td>
      <td>NaN</td>
      <td>2015.0</td>
      <td>152.0</td>
      <td>6.0</td>
      <td>NaN</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Aaron Schneider</th>
      <td>Color</td>
      <td>160.0</td>
      <td>100.0</td>
      <td>11.0</td>
      <td>970.0</td>
      <td>Robert Duvall</td>
      <td>13000.0</td>
      <td>9176553.0</td>
      <td>Drama|Mystery</td>
      <td>Bill Murray</td>
      <td>...</td>
      <td>97.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>7500000.0</td>
      <td>2009.0</td>
      <td>3000.0</td>
      <td>7.1</td>
      <td>2.35</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Aaron Seltzer</th>
      <td>Color</td>
      <td>99.0</td>
      <td>85.0</td>
      <td>64.0</td>
      <td>729.0</td>
      <td>Carmen Electra</td>
      <td>3000.0</td>
      <td>48546578.0</td>
      <td>Comedy|Romance</td>
      <td>Alyson Hannigan</td>
      <td>...</td>
      <td>613.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>20000000.0</td>
      <td>2006.0</td>
      <td>869.0</td>
      <td>2.7</td>
      <td>1.85</td>
      <td>806</td>
    </tr>
    <tr>
      <th>Abel Ferrara</th>
      <td>Color</td>
      <td>48.0</td>
      <td>99.0</td>
      <td>220.0</td>
      <td>599.0</td>
      <td>Vincent Gallo</td>
      <td>812.0</td>
      <td>1227324.0</td>
      <td>Crime|Drama</td>
      <td>Isabella Rossellini</td>
      <td>...</td>
      <td>48.0</td>
      <td>English</td>
      <td>USA</td>
      <td>R</td>
      <td>12500000.0</td>
      <td>1996.0</td>
      <td>787.0</td>
      <td>6.6</td>
      <td>1.85</td>
      <td>344</td>
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
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
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
      <th>Burr Steers</th>
      <td>Color</td>
      <td>191.0</td>
      <td>102.0</td>
      <td>23.0</td>
      <td>651.0</td>
      <td>Hunter Parrish</td>
      <td>2000.0</td>
      <td>64149837.0</td>
      <td>Comedy|Drama|Family|Fantasy|Romance</td>
      <td>Matthew Perry</td>
      <td>...</td>
      <td>185.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>20000000.0</td>
      <td>2009.0</td>
      <td>2000.0</td>
      <td>6.4</td>
      <td>2.35</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Burr Steers</th>
      <td>Color</td>
      <td>225.0</td>
      <td>108.0</td>
      <td>23.0</td>
      <td>845.0</td>
      <td>Bella Heathcote</td>
      <td>2000.0</td>
      <td>10907291.0</td>
      <td>Action|Horror|Romance</td>
      <td>Matt Smith</td>
      <td>...</td>
      <td>134.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>28000000.0</td>
      <td>2016.0</td>
      <td>860.0</td>
      <td>5.8</td>
      <td>2.35</td>
      <td>73000</td>
    </tr>
    <tr>
      <th>Burr Steers</th>
      <td>Color</td>
      <td>136.0</td>
      <td>99.0</td>
      <td>23.0</td>
      <td>471.0</td>
      <td>Rory Culkin</td>
      <td>1000.0</td>
      <td>4681503.0</td>
      <td>Comedy|Drama</td>
      <td>Kieran Culkin</td>
      <td>...</td>
      <td>238.0</td>
      <td>English</td>
      <td>USA</td>
      <td>R</td>
      <td>9000000.0</td>
      <td>2002.0</td>
      <td>710.0</td>
      <td>7.0</td>
      <td>2.35</td>
      <td>838</td>
    </tr>
    <tr>
      <th>Burr Steers</th>
      <td>Color</td>
      <td>117.0</td>
      <td>99.0</td>
      <td>23.0</td>
      <td>135.0</td>
      <td>Charlie Tahan</td>
      <td>405.0</td>
      <td>31136950.0</td>
      <td>Drama|Fantasy|Romance</td>
      <td>Augustus Prew</td>
      <td>...</td>
      <td>75.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>44000000.0</td>
      <td>2010.0</td>
      <td>268.0</td>
      <td>6.5</td>
      <td>2.35</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Byron Howard</th>
      <td>Color</td>
      <td>225.0</td>
      <td>96.0</td>
      <td>59.0</td>
      <td>699.0</td>
      <td>Diedrich Bader</td>
      <td>17000.0</td>
      <td>114053579.0</td>
      <td>Adventure|Animation|Comedy|Drama|Family</td>
      <td>Chloë Grace Moretz</td>
      <td>...</td>
      <td>178.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG</td>
      <td>150000000.0</td>
      <td>2008.0</td>
      <td>759.0</td>
      <td>6.9</td>
      <td>1.85</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>559 rows × 27 columns</p>
</div>




```python
# df2.loc['A':'C'] KeyError: 'A'
df2 = df2.sort_index()
df2
df2[1:].sort_index().loc['A':'C']
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
      <th>color</th>
      <th>num_critic_for_reviews</th>
      <th>duration</th>
      <th>director_facebook_likes</th>
      <th>actor_3_facebook_likes</th>
      <th>actor_2_name</th>
      <th>actor_1_facebook_likes</th>
      <th>gross</th>
      <th>genres</th>
      <th>actor_1_name</th>
      <th>...</th>
      <th>num_user_for_reviews</th>
      <th>language</th>
      <th>country</th>
      <th>content_rating</th>
      <th>budget</th>
      <th>title_year</th>
      <th>actor_2_facebook_likes</th>
      <th>imdb_score</th>
      <th>aspect_ratio</th>
      <th>movie_facebook_likes</th>
    </tr>
    <tr>
      <th>director_name</th>
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
      <th>A. Raven Cruz</th>
      <td>Color</td>
      <td>3.0</td>
      <td>97.0</td>
      <td>0.0</td>
      <td>94.0</td>
      <td>Vanilla Ice</td>
      <td>639.0</td>
      <td>NaN</td>
      <td>Action|Adventure|Comedy|Fantasy|Sci-Fi</td>
      <td>Scott Levy</td>
      <td>...</td>
      <td>9.0</td>
      <td>English</td>
      <td>USA</td>
      <td>R</td>
      <td>1000000.0</td>
      <td>2005.0</td>
      <td>361.0</td>
      <td>1.9</td>
      <td>1.78</td>
      <td>128</td>
    </tr>
    <tr>
      <th>Aaron Hann</th>
      <td>Color</td>
      <td>29.0</td>
      <td>87.0</td>
      <td>0.0</td>
      <td>94.0</td>
      <td>Michael McLafferty</td>
      <td>160.0</td>
      <td>NaN</td>
      <td>Drama|Horror|Mystery|Sci-Fi|Thriller</td>
      <td>Jordi Vilasuso</td>
      <td>...</td>
      <td>59.0</td>
      <td>English</td>
      <td>USA</td>
      <td>Not Rated</td>
      <td>NaN</td>
      <td>2015.0</td>
      <td>152.0</td>
      <td>6.0</td>
      <td>NaN</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Aaron Schneider</th>
      <td>Color</td>
      <td>160.0</td>
      <td>100.0</td>
      <td>11.0</td>
      <td>970.0</td>
      <td>Robert Duvall</td>
      <td>13000.0</td>
      <td>9176553.0</td>
      <td>Drama|Mystery</td>
      <td>Bill Murray</td>
      <td>...</td>
      <td>97.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>7500000.0</td>
      <td>2009.0</td>
      <td>3000.0</td>
      <td>7.1</td>
      <td>2.35</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Aaron Seltzer</th>
      <td>Color</td>
      <td>99.0</td>
      <td>85.0</td>
      <td>64.0</td>
      <td>729.0</td>
      <td>Carmen Electra</td>
      <td>3000.0</td>
      <td>48546578.0</td>
      <td>Comedy|Romance</td>
      <td>Alyson Hannigan</td>
      <td>...</td>
      <td>613.0</td>
      <td>English</td>
      <td>USA</td>
      <td>PG-13</td>
      <td>20000000.0</td>
      <td>2006.0</td>
      <td>869.0</td>
      <td>2.7</td>
      <td>1.85</td>
      <td>806</td>
    </tr>
    <tr>
      <th>Abel Ferrara</th>
      <td>Color</td>
      <td>48.0</td>
      <td>99.0</td>
      <td>220.0</td>
      <td>599.0</td>
      <td>Vincent Gallo</td>
      <td>812.0</td>
      <td>1227324.0</td>
      <td>Crime|Drama</td>
      <td>Isabella Rossellini</td>
      <td>...</td>
      <td>48.0</td>
      <td>English</td>
      <td>USA</td>
      <td>R</td>
      <td>12500000.0</td>
      <td>1996.0</td>
      <td>787.0</td>
      <td>6.6</td>
      <td>1.85</td>
      <td>344</td>
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
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
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
      <th>NaN</th>
      <td>Color</td>
      <td>75.0</td>
      <td>60.0</td>
      <td>NaN</td>
      <td>833.0</td>
      <td>Masi Oka</td>
      <td>1000.0</td>
      <td>NaN</td>
      <td>Drama|Fantasy|Sci-Fi|Thriller</td>
      <td>Sendhil Ramamurthy</td>
      <td>...</td>
      <td>379.0</td>
      <td>English</td>
      <td>USA</td>
      <td>TV-14</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>923.0</td>
      <td>7.7</td>
      <td>16.00</td>
      <td>0</td>
    </tr>
    <tr>
      <th>NaN</th>
      <td>Color</td>
      <td>11.0</td>
      <td>22.0</td>
      <td>NaN</td>
      <td>6.0</td>
      <td>Ron Lynch</td>
      <td>59.0</td>
      <td>NaN</td>
      <td>Animation|Comedy|Drama</td>
      <td>Brendon Small</td>
      <td>...</td>
      <td>82.0</td>
      <td>English</td>
      <td>USA</td>
      <td>TV-PG</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>11.0</td>
      <td>8.2</td>
      <td>1.33</td>
      <td>526</td>
    </tr>
    <tr>
      <th>NaN</th>
      <td>Color</td>
      <td>23.0</td>
      <td>43.0</td>
      <td>NaN</td>
      <td>576.0</td>
      <td>Tracy Spiridakos</td>
      <td>2000.0</td>
      <td>NaN</td>
      <td>Action|Adventure|Drama|Sci-Fi</td>
      <td>Billy Burke</td>
      <td>...</td>
      <td>323.0</td>
      <td>English</td>
      <td>USA</td>
      <td>TV-14</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>821.0</td>
      <td>6.7</td>
      <td>16.00</td>
      <td>17000</td>
    </tr>
    <tr>
      <th>NaN</th>
      <td>Color</td>
      <td>11.0</td>
      <td>58.0</td>
      <td>NaN</td>
      <td>250.0</td>
      <td>James Norton</td>
      <td>887.0</td>
      <td>NaN</td>
      <td>Crime|Drama</td>
      <td>Shirley Henderson</td>
      <td>...</td>
      <td>59.0</td>
      <td>English</td>
      <td>UK</td>
      <td>TV-MA</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>340.0</td>
      <td>8.5</td>
      <td>16.00</td>
      <td>10000</td>
    </tr>
    <tr>
      <th>NaN</th>
      <td>Color</td>
      <td>43.0</td>
      <td>43.0</td>
      <td>NaN</td>
      <td>319.0</td>
      <td>Valorie Curry</td>
      <td>841.0</td>
      <td>NaN</td>
      <td>Crime|Drama|Mystery|Thriller</td>
      <td>Natalie Zea</td>
      <td>...</td>
      <td>359.0</td>
      <td>English</td>
      <td>USA</td>
      <td>TV-14</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>593.0</td>
      <td>7.5</td>
      <td>16.00</td>
      <td>32000</td>
    </tr>
  </tbody>
</table>
<p>4916 rows × 27 columns</p>
</div>



### skipna, numeric_only

EX) df.max(numeric_only=True, skipna=False) 

 skipna : na를 skip하지 않고 계산 => na가 있는 컬럼의 결과 -> na 


```python
df2.mean(numeric_only=True)
```




    num_critic_for_reviews       1.379889e+02
    duration                     1.070908e+02
    director_facebook_likes      6.910145e+02
    actor_3_facebook_likes       6.312763e+02
    actor_1_facebook_likes       6.494488e+03
    gross                        4.764451e+07
    num_voted_users              8.264492e+04
    cast_total_facebook_likes    9.579816e+03
    facenumber_in_poster         1.377320e+00
    num_user_for_reviews         2.676688e+02
    budget                       3.654749e+07
    title_year                   2.002448e+03
    actor_2_facebook_likes       1.621924e+03
    imdb_score                   6.437429e+00
    aspect_ratio                 2.222349e+00
    movie_facebook_likes         7.348294e+03
    dtype: float64




```python
df2.mean(numeric_only=True, skipna=False)

```




    num_critic_for_reviews                NaN
    duration                              NaN
    director_facebook_likes               NaN
    actor_3_facebook_likes                NaN
    actor_1_facebook_likes                NaN
    gross                                 NaN
    num_voted_users              82644.924939
    cast_total_facebook_likes     9579.815907
    facenumber_in_poster                  NaN
    num_user_for_reviews                  NaN
    budget                                NaN
    title_year                            NaN
    actor_2_facebook_likes                NaN
    imdb_score                       6.437429
    aspect_ratio                          NaN
    movie_facebook_likes          7348.294142
    dtype: float64



### Agg


```python
# df['movie_facebook_likes'].mean()
df['movie_facebook_likes'].agg('mean')
```




    7348.294141578519




```python
df[['movie_facebook_likes', 'num_voted_users']].agg(['mean', 'count'])

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
      <th>movie_facebook_likes</th>
      <th>num_voted_users</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>mean</th>
      <td>7348.294142</td>
      <td>82644.924939</td>
    </tr>
    <tr>
      <th>count</th>
      <td>4916.000000</td>
      <td>4916.000000</td>
    </tr>
  </tbody>
</table>
</div>




```python
func = {
    "movie_facebook_likes" : "mean",
    "num_voted_users" : ["min", "max"]
}

df.agg(func)
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
      <th>movie_facebook_likes</th>
      <th>num_voted_users</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>mean</th>
      <td>7348.294142</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>min</th>
      <td>NaN</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>max</th>
      <td>NaN</td>
      <td>1689764.0</td>
    </tr>
  </tbody>
</table>
</div>



### 사용자 정의 함수


```python
def min_max_diff(x):
    return max(x)-min(x)
```


```python
min_max_diff(df['actor_1_facebook_likes'])
```




    640000.0




```python
df['actor_1_facebook_likes'].agg(min_max_diff)
```




    640000.0




```python
df['actor_1_facebook_likes'].agg(lambda x : max(x)-min(x))
```




    640000.0




```python
df.select_dtypes(exclude='object').agg({
    'actor_1_facebook_likes' : ['mean', 'max'],
    'imdb_score' : 'mean'
})
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
      <th>actor_1_facebook_likes</th>
      <th>imdb_score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>mean</th>
      <td>6494.488491</td>
      <td>6.437429</td>
    </tr>
    <tr>
      <th>max</th>
      <td>640000.000000</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>




```python
# 상반기, 하반기 주유소 가격 데이터 조회
df1 = pd.read_csv('../주유소데이터 분석/data/2022년_서울_상반기_일별_가격.csv', encoding='cp949')
df2 = pd.read_csv('../주유소데이터 분석/data/2022년_서울_하반기_일별_가격.csv', encoding='cp949')
df = pd.concat([df1, df2], axis=0)
```


```python
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
      <th>번호</th>
      <th>지역</th>
      <th>상호</th>
      <th>주소</th>
      <th>기간</th>
      <th>상표</th>
      <th>셀프여부</th>
      <th>고급휘발유</th>
      <th>휘발유</th>
      <th>경유</th>
      <th>실내등유</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>A0006039</td>
      <td>서울 강남구</td>
      <td>(유)동하석유 힐탑셀프주유소</td>
      <td>서울 강남구 논현로 640</td>
      <td>20220101</td>
      <td>SK에너지</td>
      <td>셀프</td>
      <td>1887</td>
      <td>1737</td>
      <td>1587</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>A0006039</td>
      <td>서울 강남구</td>
      <td>(유)동하석유 힐탑셀프주유소</td>
      <td>서울 강남구 논현로 640</td>
      <td>20220102</td>
      <td>SK에너지</td>
      <td>셀프</td>
      <td>1887</td>
      <td>1737</td>
      <td>1587</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>A0006039</td>
      <td>서울 강남구</td>
      <td>(유)동하석유 힐탑셀프주유소</td>
      <td>서울 강남구 논현로 640</td>
      <td>20220103</td>
      <td>SK에너지</td>
      <td>셀프</td>
      <td>1887</td>
      <td>1737</td>
      <td>1587</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>A0006039</td>
      <td>서울 강남구</td>
      <td>(유)동하석유 힐탑셀프주유소</td>
      <td>서울 강남구 논현로 640</td>
      <td>20220104</td>
      <td>SK에너지</td>
      <td>셀프</td>
      <td>1887</td>
      <td>1737</td>
      <td>1587</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>A0006039</td>
      <td>서울 강남구</td>
      <td>(유)동하석유 힐탑셀프주유소</td>
      <td>서울 강남구 논현로 640</td>
      <td>20220105</td>
      <td>SK에너지</td>
      <td>셀프</td>
      <td>1887</td>
      <td>1737</td>
      <td>1587</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>



### Query
​

1) 비교 연산자( ==, >, >=, <, <=, != )

2) in 연산자( in, ==, not in, != )

3) 논리 연산자(and, or, not)

4) 외부 변수(또는 함수) 참조 연산

5) 인덱스 검색

6) 문자열 부분검색( str.contains, str.startswith, str.endswith )


```python
# 상표별 휘발유 가격 높은 순 정렬 
df.query('휘발유!=0').groupby('상표')['휘발유'].agg('max').sort_values(ascending=False)
```




    상표
    SK에너지     3096
    GS칼텍스     3050
    S-OIL     2595
    현대오일뱅크    2568
    알뜰주유소     2252
    자가상표      2198
    알뜰(ex)    2125
    Name: 휘발유, dtype: int64




```python
cheap_price = df.query('휘발유!=0').groupby(['상호', '주소'])['휘발유'].max().sort_values().head(5)
cheap_price
```




    상호                 주소                       
    (주)동원석유            경기도 부천시 원미구  부흥로 182 (중동)    1654
    송파알찬주유소            서울 송파구 백제고분로 229 (삼전동)       1690
    (주)명보에너지           경기도 시흥시  수인로 2186 (목감동)      1755
    정다운셀프주유소           서울 도봉구 도봉로 635               1759
    오션네트웍스(주) 서울식물원지점  서울 강서구 양천로 300               1940
    Name: 휘발유, dtype: int64




```python
# 휘발유 저렴한 주유소의 상위 5개의 상호, 지역, 주소 조회(중복제거)
df.query("상호 in @cheap_price.index.get_level_values(0) and 주소 in @cheap_price.index.get_level_values(1)")\
[['상호', '지역', '주소']].drop_duplicates()
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
      <th>상호</th>
      <th>지역</th>
      <th>주소</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>25556</th>
      <td>(주)명보에너지</td>
      <td>서울 금천구</td>
      <td>경기도 시흥시  수인로 2186 (목감동)</td>
    </tr>
    <tr>
      <th>32304</th>
      <td>정다운셀프주유소</td>
      <td>서울 도봉구</td>
      <td>서울 도봉구 도봉로 635</td>
    </tr>
    <tr>
      <th>43575</th>
      <td>(주)동원석유</td>
      <td>서울 서초구</td>
      <td>경기도 부천시 원미구  부흥로 182 (중동)</td>
    </tr>
    <tr>
      <th>59953</th>
      <td>송파알찬주유소</td>
      <td>서울 송파구</td>
      <td>서울 송파구 백제고분로 229 (삼전동)</td>
    </tr>
    <tr>
      <th>14459</th>
      <td>오션네트웍스(주) 서울식물원지점</td>
      <td>서울 강서구</td>
      <td>서울 강서구 양천로 300</td>
    </tr>
  </tbody>
</table>
</div>



### nlargest, nsmallest


```python
df.nlargest(5, '휘발유')

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
      <th>번호</th>
      <th>지역</th>
      <th>상호</th>
      <th>주소</th>
      <th>기간</th>
      <th>상표</th>
      <th>셀프여부</th>
      <th>고급휘발유</th>
      <th>휘발유</th>
      <th>경유</th>
      <th>실내등유</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>78935</th>
      <td>A0000767</td>
      <td>서울 중구</td>
      <td>서남주유소</td>
      <td>서울 중구 통일로 30</td>
      <td>20220622</td>
      <td>SK에너지</td>
      <td>일반</td>
      <td>3496</td>
      <td>3096</td>
      <td>3223</td>
      <td>2719</td>
    </tr>
    <tr>
      <th>78936</th>
      <td>A0000767</td>
      <td>서울 중구</td>
      <td>서남주유소</td>
      <td>서울 중구 통일로 30</td>
      <td>20220623</td>
      <td>SK에너지</td>
      <td>일반</td>
      <td>3496</td>
      <td>3096</td>
      <td>3223</td>
      <td>2719</td>
    </tr>
    <tr>
      <th>78937</th>
      <td>A0000767</td>
      <td>서울 중구</td>
      <td>서남주유소</td>
      <td>서울 중구 통일로 30</td>
      <td>20220624</td>
      <td>SK에너지</td>
      <td>일반</td>
      <td>3496</td>
      <td>3096</td>
      <td>3223</td>
      <td>2719</td>
    </tr>
    <tr>
      <th>78938</th>
      <td>A0000767</td>
      <td>서울 중구</td>
      <td>서남주유소</td>
      <td>서울 중구 통일로 30</td>
      <td>20220625</td>
      <td>SK에너지</td>
      <td>일반</td>
      <td>3496</td>
      <td>3096</td>
      <td>3223</td>
      <td>2719</td>
    </tr>
    <tr>
      <th>78939</th>
      <td>A0000767</td>
      <td>서울 중구</td>
      <td>서남주유소</td>
      <td>서울 중구 통일로 30</td>
      <td>20220626</td>
      <td>SK에너지</td>
      <td>일반</td>
      <td>3496</td>
      <td>3096</td>
      <td>3223</td>
      <td>2719</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.nsmallest(5, '휘발유')
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
      <th>번호</th>
      <th>지역</th>
      <th>상호</th>
      <th>주소</th>
      <th>기간</th>
      <th>상표</th>
      <th>셀프여부</th>
      <th>고급휘발유</th>
      <th>휘발유</th>
      <th>경유</th>
      <th>실내등유</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1833</th>
      <td>A0010236</td>
      <td>서울 강남구</td>
      <td>SK에너지㈜ 진달래주유소</td>
      <td>서울 강남구 도곡로 208</td>
      <td>20220331</td>
      <td>SK에너지</td>
      <td>일반</td>
      <td>2169</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>5261</th>
      <td>A0009738</td>
      <td>서울 강남구</td>
      <td>현대오일뱅크 도곡셀프주유소</td>
      <td>서울 강남구  남부순환로 2718 (도곡2동)</td>
      <td>20220320</td>
      <td>현대오일뱅크</td>
      <td>셀프</td>
      <td>2199</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>6537</th>
      <td>A0001839</td>
      <td>서울 강동구</td>
      <td>(주)소모에너지 신월주유소</td>
      <td>서울 강동구 양재대로 1323 (성내동)</td>
      <td>20220329</td>
      <td>GS칼텍스</td>
      <td>셀프</td>
      <td>2165</td>
      <td>0</td>
      <td>0</td>
      <td>1480</td>
    </tr>
    <tr>
      <th>6996</th>
      <td>A0009799</td>
      <td>서울 강동구</td>
      <td>강동주유소</td>
      <td>서울 강동구 양재대로 1509 (길동)</td>
      <td>20220104</td>
      <td>SK에너지</td>
      <td>일반</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1447</td>
    </tr>
    <tr>
      <th>6997</th>
      <td>A0009799</td>
      <td>서울 강동구</td>
      <td>강동주유소</td>
      <td>서울 강동구 양재대로 1509 (길동)</td>
      <td>20220105</td>
      <td>SK에너지</td>
      <td>일반</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1447</td>
    </tr>
  </tbody>
</table>
</div>



### datetime


```python
df['기간'] = pd.to_datetime(df['기간'], format='%Y%m%d')
df['기간'].info()
```

    <class 'pandas.core.series.Series'>
    Index: 164482 entries, 0 to 81792
    Series name: 기간
    Non-Null Count   Dtype         
    --------------   -----         
    164482 non-null  datetime64[ns]
    dtypes: datetime64[ns](1)
    memory usage: 2.5 MB
    


```python
df['년'] = df['기간'].dt.year
df['월'] = df['기간'].dt.month
df['일'] = df['기간'].dt.day
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
      <th>번호</th>
      <th>지역</th>
      <th>상호</th>
      <th>주소</th>
      <th>기간</th>
      <th>상표</th>
      <th>셀프여부</th>
      <th>고급휘발유</th>
      <th>휘발유</th>
      <th>경유</th>
      <th>실내등유</th>
      <th>년</th>
      <th>월</th>
      <th>일</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>A0006039</td>
      <td>서울 강남구</td>
      <td>(유)동하석유 힐탑셀프주유소</td>
      <td>서울 강남구 논현로 640</td>
      <td>2022-01-01</td>
      <td>SK에너지</td>
      <td>셀프</td>
      <td>1887</td>
      <td>1737</td>
      <td>1587</td>
      <td>0</td>
      <td>2022</td>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>A0006039</td>
      <td>서울 강남구</td>
      <td>(유)동하석유 힐탑셀프주유소</td>
      <td>서울 강남구 논현로 640</td>
      <td>2022-01-02</td>
      <td>SK에너지</td>
      <td>셀프</td>
      <td>1887</td>
      <td>1737</td>
      <td>1587</td>
      <td>0</td>
      <td>2022</td>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>A0006039</td>
      <td>서울 강남구</td>
      <td>(유)동하석유 힐탑셀프주유소</td>
      <td>서울 강남구 논현로 640</td>
      <td>2022-01-03</td>
      <td>SK에너지</td>
      <td>셀프</td>
      <td>1887</td>
      <td>1737</td>
      <td>1587</td>
      <td>0</td>
      <td>2022</td>
      <td>1</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>A0006039</td>
      <td>서울 강남구</td>
      <td>(유)동하석유 힐탑셀프주유소</td>
      <td>서울 강남구 논현로 640</td>
      <td>2022-01-04</td>
      <td>SK에너지</td>
      <td>셀프</td>
      <td>1887</td>
      <td>1737</td>
      <td>1587</td>
      <td>0</td>
      <td>2022</td>
      <td>1</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>A0006039</td>
      <td>서울 강남구</td>
      <td>(유)동하석유 힐탑셀프주유소</td>
      <td>서울 강남구 논현로 640</td>
      <td>2022-01-05</td>
      <td>SK에너지</td>
      <td>셀프</td>
      <td>1887</td>
      <td>1737</td>
      <td>1587</td>
      <td>0</td>
      <td>2022</td>
      <td>1</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>



### str accessor

#### Slice


```python
df['지역'].str.slice(3)
```




    0        강남구
    1        강남구
    2        강남구
    3        강남구
    4        강남구
            ... 
    81788    중랑구
    81789    중랑구
    81790    중랑구
    81791    중랑구
    81792    중랑구
    Name: 지역, Length: 164482, dtype: object



#### removeprefix


```python
df['지역'].str.removeprefix('서울')

```




    0         강남구
    1         강남구
    2         강남구
    3         강남구
    4         강남구
             ... 
    81788     중랑구
    81789     중랑구
    81790     중랑구
    81791     중랑구
    81792     중랑구
    Name: 지역, Length: 164482, dtype: object



----
추가 정리가 필요한 부분 

pivot_table, Groupby, map, apply, cut, concat, join, merge
