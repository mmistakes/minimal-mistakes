---
layout: single
title:  "Python Study 1"
categories: study

tag: [python, coding]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

<head>
  <style>
    table.dataframe {
      white-space: normal;
      width: 100%;
      height: 240px;
      display: block12
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

## 1.Import Data

```python
# Import Pandas Library
import pandas as pd
```




```python
# Import data file (excel)
fpath = './data/babyNamesUS.csv'
raw = pd.read_csv(fpath)
```


```python
# Using head(), print upper 5 data
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
# Check data info
raw.info()
```

<pre>
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 1048575 entries, 0 to 1048574
Data columns (total 5 columns):
 #   Column       Non-Null Count    Dtype 
---  ------       --------------    ----- 
 0   StateCode    1048575 non-null  object
 1   Sex          1048575 non-null  object
 2   YearOfBirth  1048575 non-null  int64 
 3   Name         1048575 non-null  object
 4   Number       1048575 non-null  int64 
dtypes: int64(2), object(3)
memory usage: 40.0+ MB
</pre>
## 2.pd.pivot_table


#pd.pivot_table(index = 'column name', columns = 'column name', values = 'column name', `aggfunc` = 'sum')
#`aggfunc` Option: sum, count, mean, ...



```python
# Count the number of names
raw.pivot_table(index = 'Name', values = 'Number', aggfunc = 'sum')
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



```python
name_df = raw.pivot_table(index = 'Name', values = 'Number', aggfunc = 'sum', columns = 'Sex')
name_df
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
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>Zylah</th>
      <td>36.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>Zyler</th>
      <td>NaN</td>
      <td>38.0</td>
    </tr>
    <tr>
      <th>Zyon</th>
      <td>6.0</td>
      <td>91.0</td>
    </tr>
    <tr>
      <th>Zyra</th>
      <td>23.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>Zyrah</th>
      <td>5.0</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
<p>20815 rows × 2 columns</p>
</div>



```python
# Information of data
# There are 14410 of Female name and 8657 of men name
name_df.info()
```

<pre>
<class 'pandas.core.frame.DataFrame'>
Index: 20815 entries, Aadan to Zyrah
Data columns (total 2 columns):
 #   Column  Non-Null Count  Dtype  
---  ------  --------------  -----  
 0   F       14140 non-null  float64
 1   M       8658 non-null   float64
dtypes: float64(2)
memory usage: 487.9+ KB
</pre>
## 3. Fill the data



```python
# Change value (Nan) to 0
name_df = name_df.fillna(0)
```


```python
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


## 4. Sorting



```python
# Sorting data with descending order
name_df.sort_values(by = 'M', ascending = False).head()
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
  </tbody>
</table>
</div>



```python
# Check top 5 names of men
name_df.sort_values(by = 'M', ascending = False).head().index
```

<pre>
Index(['Michael', 'James', 'Robert', 'John', 'David'], dtype='object', name='Name')
</pre>

```python
# Check top 5 names of female
name_df.sort_values(by = 'F', ascending = False).head().index
```

<pre>
Index(['Mary', 'Jennifer', 'Elizabeth', 'Patricia', 'Linda'], dtype='object', name='Name')
</pre>
## 5. Checking the type of data by columns



```python
# Print values of "state column"
raw['StateCode'].unique()
```

<pre>
array(['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL'],
      dtype=object)
</pre>

```python
# Print the number of values by columns
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
# Print the number by Year
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

```python
```
