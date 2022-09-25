---
layout: single
title:  "Basic Python Testing"
categories: Testing
tag: [python, blog, jupytor]
toc: true
author_profile: false
---

<head>
  <style>
    table.dataframe {
      white-space: normal;
      width: 100%;
      height: 240px;
      display: block;
      overflow: auto;
      font-family: Arial, sans-serif;
      font-size: 0.9rem;
      line-height: 20px;
      text-align: center;
      border: 0px !important;
    }

    table.dataframe th {
      text-align: center;
      font-weight: bold;
      padding: 8px;
    }

    table.dataframe td {
      text-align: center;
      padding: 8px;
    }

    table.dataframe tr:hover {
      background: #b8d1f3; 
    }

    .output_prompt {
      overflow: auto;
      font-size: 0.9rem;
      line-height: 1.45;
      border-radius: 0.3rem;
      -webkit-overflow-scrolling: touch;
      padding: 0.8rem;
      margin-top: 0;
      margin-bottom: 15px;
      font: 1rem Consolas, "Liberation Mono", Menlo, Courier, monospace;
      color: $code-text-color;
      border: solid 1px $border-color;
      border-radius: 0.3rem;
      word-break: normal;
      white-space: pre;
    }

  .dataframe tbody tr th:only-of-type {
      vertical-align: middle;
  }

  .dataframe tbody tr th {
      vertical-align: top;
  }

  .dataframe thead th {
      text-align: center !important;
      padding: 8px;
  }

  .page__content p {
      margin: 0 0 0px !important;
  }

  .page__content p > strong {
    font-size: 0.8rem !important;
  }

  </style>
</head>



```python
# 판다스 라이브러리를 불러오겠습니다. 
import pandas as pd
```

## 데이터 불러오기



```python
# 현재 쥬피터노트북 파일 위치 아래에 있는 data 폴더의 babyNamesUS.csv 파일 데이터를 불러오겠습니다. 
file = './data/babyNamesUS.csv'
raw = pd.read_csv(file)
```


```python
# head() 를 이용해 상단의 5개 데이터를 살펴보겠습니다. 
raw.head()
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
      <th>StateCode</th>
      <th>Sex</th>
      <th>YearOfBirth</th>
      <th>Name</th>
      <th>Number</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>AK</td>
      <td>F</td>
      <td>1910</td>
      <td>Mary</td>
      <td>14</td>
    </tr>
    <tr>
      <th>1</th>
      <td>AK</td>
      <td>F</td>
      <td>1910</td>
      <td>Annie</td>
      <td>12</td>
    </tr>
    <tr>
      <th>2</th>
      <td>AK</td>
      <td>F</td>
      <td>1910</td>
      <td>Anna</td>
      <td>10</td>
    </tr>
    <tr>
      <th>3</th>
      <td>AK</td>
      <td>F</td>
      <td>1910</td>
      <td>Margaret</td>
      <td>8</td>
    </tr>
    <tr>
      <th>4</th>
      <td>AK</td>
      <td>F</td>
      <td>1910</td>
      <td>Helen</td>
      <td>7</td>
    </tr>
  </tbody>
</table>
</div>



```python
# info() 명령을 이용해 데이터 구조를 살펴볼 수 있습니다. 
# 전체 1048574개의 데이터를 가지고 있으며(인덱스에서 확인)
# 컬럼은 총 5개로 각각 인덱스 개수와 동일하게 1048574개의 데이터를 가지고 있습니다. 
raw.info()
```

<pre>
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 1048575 entries, 0 to 1048574
Data columns (total 5 columns):
StateCode      1048575 non-null object
Sex            1048575 non-null object
YearOfBirth    1048575 non-null int64
Name           1048575 non-null object
Number         1048575 non-null int64
dtypes: int64(2), object(3)
memory usage: 40.0+ MB
</pre>
-


### pd.pivot_table(index = '컬럼명', columns = '컬럼명', values = '컬럼명', `aggfunc` = 'sum')



`aggfunc` 옵션: sum, count, mean, ...


- 이름 사용 빈도수 집계하기



```python
# state, 성별, 출생연도에 상관없이 이름이 등록된 수를 합하여 정리해보겠습니다. 
# 인덱스는 이름으로, 값은 등록된 수를 모두 더하여 피벗 테이블을 만들겠습니다. 
raw.pivot_table(index = 'Name', values = 'Number', aggfunc='sum')
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
      <th>Number</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Aadan</th>
      <td>18</td>
    </tr>
    <tr>
      <th>Aaden</th>
      <td>855</td>
    </tr>
    <tr>
      <th>Aadhav</th>
      <td>14</td>
    </tr>
    <tr>
      <th>Aadhya</th>
      <td>188</td>
    </tr>
    <tr>
      <th>Aadi</th>
      <td>116</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
    </tr>
    <tr>
      <th>Zylah</th>
      <td>36</td>
    </tr>
    <tr>
      <th>Zyler</th>
      <td>38</td>
    </tr>
    <tr>
      <th>Zyon</th>
      <td>97</td>
    </tr>
    <tr>
      <th>Zyra</th>
      <td>23</td>
    </tr>
    <tr>
      <th>Zyrah</th>
      <td>5</td>
    </tr>
  </tbody>
</table>
<p>20815 rows × 1 columns</p>
</div>


- 이름/성별 사용 빈도수 집계하기



```python
# 앞서 생성한 데이터에서, 성별 구분을 컬럼에 추가하여 피벗 테이블을 만들겠습니다. 
# 인덱스는 이름으로, 값은 등록된 수의 합계, 컬럼은 성별로 구분하여  피벗 테이블을 만들겠습니다. 

name_df = raw.pivot_table(index = 'Name', values = 'Number', columns = 'Sex', aggfunc='sum')
name_df.head()
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
      <th>Sex</th>
      <th>F</th>
      <th>M</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Aadan</th>
      <td>NaN</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>Aaden</th>
      <td>NaN</td>
      <td>855.0</td>
    </tr>
    <tr>
      <th>Aadhav</th>
      <td>NaN</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>Aadhya</th>
      <td>188.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>Aadi</th>
      <td>NaN</td>
      <td>116.0</td>
    </tr>
  </tbody>
</table>
</div>



```python
# 성별/이름별 데이터는 총 20815개의 이름 데이터가 있으며 
# 여자 이름은 14140개, 남자 이름은 8658 개의 데이터가 있는 것을 확인할 수 있습니다. 
name_df.info()
```

<pre>
<class 'pandas.core.frame.DataFrame'>
Index: 20815 entries, Aadan to Zyrah
Data columns (total 2 columns):
F    14140 non-null float64
M    8658 non-null float64
dtypes: float64(2)
memory usage: 487.9+ KB
</pre>
## 9. 비어있는 데이터 채워넣기


데이터를 정리하다보면, 비어있는 데이터들이 존재하게 됩니다. 

비어있는 데이터 부분을 어떻게 정리할지에 따라 분석 결과가 달라질 수도 있습니다. 

- 공통된 값을 입력하거나(ex 0)

- 임의의 수를 입력하거나(ex 평균, 최대값, 최소값, 비어있는 자리 주변의 값 등)

- 비어있는 데이터는 분석에서 제외하거나  



여러 방법으로 처리 할 수 있으며, 어떠한 것을 선택할지는 데이터/분석방향 등에 따라 상이합니다. 



```python
# 데이터가 비어있다는 의미는, 해당 이름이 한 번도 사용된 적이 없다는 의미이므로,  숫자 0을 입력하겠습니다. 
name_df = name_df.fillna(0)
name_df.head()
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
      <th>Sex</th>
      <th>F</th>
      <th>M</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Aadan</th>
      <td>0.0</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>Aaden</th>
      <td>0.0</td>
      <td>855.0</td>
    </tr>
    <tr>
      <th>Aadhav</th>
      <td>0.0</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>Aadhya</th>
      <td>188.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Aadi</th>
      <td>0.0</td>
      <td>116.0</td>
    </tr>
  </tbody>
</table>
</div>



```python
# info() 를 통해 데이터를 살펴보겠습니다. 
# 여자(F)와 남자(M) 컬럼 각각 20815개의 데이터를 가지며 전체 데이터 셋의 개수(인덱스 개수 20815개)와 동일한 것을 확인할 수 있습니다. 
name_df.info()
```

<pre>
<class 'pandas.core.frame.DataFrame'>
Index: 20815 entries, Aadan to Zyrah
Data columns (total 2 columns):
F    20815 non-null float64
M    20815 non-null float64
dtypes: float64(2)
memory usage: 487.9+ KB
</pre>
#### Q) 남자/여자 가장 많이 사용되는 이름은?


## 10. 정렬하기


- name_df.`sort_values`(by = '컬럼명', ascending = False)



```python
# 남자이름 사용순위 Top 5
# 여자이름 사용순위 Top 5
```


```python
# 남자 컬럼을 기준으로 정렬하겠습니다. 
# 작은 값 부터 큰 값, 오름차순으로 정렬되는 것을 확인할 수 있습니다. 
name_df.sort_values(by = 'M')
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
      <th>Sex</th>
      <th>F</th>
      <th>M</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Kasandra</th>
      <td>2130.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Lillyanna</th>
      <td>442.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Lillyanne</th>
      <td>48.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Lillybeth</th>
      <td>5.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Lilou</th>
      <td>5.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>David</th>
      <td>2003.0</td>
      <td>615943.0</td>
    </tr>
    <tr>
      <th>John</th>
      <td>2398.0</td>
      <td>670893.0</td>
    </tr>
    <tr>
      <th>Robert</th>
      <td>2469.0</td>
      <td>674934.0</td>
    </tr>
    <tr>
      <th>James</th>
      <td>3050.0</td>
      <td>693271.0</td>
    </tr>
    <tr>
      <th>Michael</th>
      <td>4133.0</td>
      <td>725757.0</td>
    </tr>
  </tbody>
</table>
<p>20815 rows × 2 columns</p>
</div>



```python
# ascending = False 옵션을 통해 내림차순으로 정렬할 수 있습니다. 
# 남자 컬럼을 기준으로, 내림차순으로 정렬하겠습니다.  

name_df.sort_values(by = 'M',ascending = False)
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
      <th>Sex</th>
      <th>F</th>
      <th>M</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Michael</th>
      <td>4133.0</td>
      <td>725757.0</td>
    </tr>
    <tr>
      <th>James</th>
      <td>3050.0</td>
      <td>693271.0</td>
    </tr>
    <tr>
      <th>Robert</th>
      <td>2469.0</td>
      <td>674934.0</td>
    </tr>
    <tr>
      <th>John</th>
      <td>2398.0</td>
      <td>670893.0</td>
    </tr>
    <tr>
      <th>David</th>
      <td>2003.0</td>
      <td>615943.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>Jemimah</th>
      <td>5.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Jemma</th>
      <td>535.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Jena</th>
      <td>1819.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Jenae</th>
      <td>510.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Zyrah</th>
      <td>5.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>20815 rows × 2 columns</p>
</div>



```python
# 남자 컬럼 기준, 내림차순으로 정렬한 데이터의 상위 5개(head()) 이름(index)을 확인해보겠습니다. 
name_df.sort_values(by = 'M',ascending = False).head().index
```

<pre>
Index(['Michael', 'James', 'Robert', 'John', 'David'], dtype='object', name='Name')
</pre>

```python
# 유사한 방법으로, 여자이름(F)에서 가장 많이 사용된 이름 5개를 확인해보겠습니다. 
name_df.sort_values(by = 'F',ascending = False).head().index
```

<pre>
Index(['Mary', 'Jennifer', 'Elizabeth', 'Patricia', 'Linda'], dtype='object', name='Name')
</pre>
## 11. 컬럼별 데이터 종류 확인하기


- df['컬럼'].`unique()`



- df['컬럼'].`value_counts()`



```python
# StateCode 컬럼에 어떠한 값이 들어있는지 살펴보겠습니다. 
raw['StateCode'].unique()
```

<pre>
array(['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL'],
      dtype=object)
</pre>

```python
# StateCode 컬럼의 값의 종류별로 몇 번 사용되었는지 확인해보겠습니다. 
raw['StateCode'].value_counts()
```

<pre>
CA    361128
AL    128556
AZ    108599
CO    101403
AR     97560
CT     78039
FL     61322
DC     53933
DE     30892
AK     27143
Name: StateCode, dtype: int64
</pre>

```python
# 연도별 데이터 수를 살펴보겠습니다. 
raw['YearOfBirth'].value_counts()
```

<pre>
2007    17166
2008    17109
2009    16914
2014    16820
2006    16810
        ...  
1914     3997
1913     3417
1912     3148
1911     2392
1910     2358
Name: YearOfBirth, Length: 106, dtype: int64
</pre>