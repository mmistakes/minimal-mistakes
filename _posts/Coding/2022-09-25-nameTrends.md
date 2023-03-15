---
layout: single
title:  "Python Study 4"
categories: Coding
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


## 1. Import Dataset



```python
import pandas as pd
```


```python
file = './data/babyNamesUS.csv'
raw = pd.read_csv(file)
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

```python
name_df = raw.pivot_table(index = 'Name', values = 'Number', aggfunc = 'sum', columns = 'Sex')
name_df = name_df.fillna(0)
name_df.head(10)
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
    <tr>
      <th>Aadit</th>
      <td>0.0</td>
      <td>24.0</td>
    </tr>
    <tr>
      <th>Aaditya</th>
      <td>0.0</td>
      <td>61.0</td>
    </tr>
    <tr>
      <th>Aadvik</th>
      <td>0.0</td>
      <td>7.0</td>
    </tr>
    <tr>
      <th>Aadya</th>
      <td>120.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Aadyn</th>
      <td>0.0</td>
      <td>14.0</td>
    </tr>
  </tbody>
</table>
</div>


## 2. What is the common name for men and women



```python
## Comparing the ratio (M/F), if the value is close to 0.5, that name is no gender distinct
name_df['Sum'] = name_df["M"] + name_df['F']
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
      <th>Sum</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Aadan</th>
      <td>0.0</td>
      <td>18.0</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>Aaden</th>
      <td>0.0</td>
      <td>855.0</td>
      <td>855.0</td>
    </tr>
    <tr>
      <th>Aadhav</th>
      <td>0.0</td>
      <td>14.0</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>Aadhya</th>
      <td>188.0</td>
      <td>0.0</td>
      <td>188.0</td>
    </tr>
    <tr>
      <th>Aadi</th>
      <td>0.0</td>
      <td>116.0</td>
      <td>116.0</td>
    </tr>
  </tbody>
</table>
</div>



```python
# Calculate the ratio of men and women
name_df['F_ratio'] = name_df['F'] / name_df['Sum']
name_df['M_ratio'] = name_df['M'] / name_df['Sum']
```


```python
# Calculate the difference of both ratio
name_df['M_F_Gap'] = abs(name_df['F_ratio'] - name_df['M_ratio'])
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
      <th>Sum</th>
      <th>F_ratio</th>
      <th>M_ratio</th>
      <th>M_F_Gap</th>
    </tr>
    <tr>
      <th>Name</th>
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
      <th>Aadan</th>
      <td>0.0</td>
      <td>18.0</td>
      <td>18.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Aaden</th>
      <td>0.0</td>
      <td>855.0</td>
      <td>855.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Aadhav</th>
      <td>0.0</td>
      <td>14.0</td>
      <td>14.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Aadhya</th>
      <td>188.0</td>
      <td>0.0</td>
      <td>188.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Aadi</th>
      <td>0.0</td>
      <td>116.0</td>
      <td>116.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
  </tbody>
</table>
</div>



```python
# Sorting with descending order
name_df = name_df.sort_values(by = 'Sum', ascending = False)
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
      <th>Sum</th>
      <th>F_ratio</th>
      <th>M_ratio</th>
      <th>M_F_Gap</th>
    </tr>
    <tr>
      <th>Name</th>
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
      <th>Michael</th>
      <td>4133.0</td>
      <td>725757.0</td>
      <td>729890.0</td>
      <td>0.005662</td>
      <td>0.994338</td>
      <td>0.988675</td>
    </tr>
    <tr>
      <th>James</th>
      <td>3050.0</td>
      <td>693271.0</td>
      <td>696321.0</td>
      <td>0.004380</td>
      <td>0.995620</td>
      <td>0.991240</td>
    </tr>
    <tr>
      <th>Robert</th>
      <td>2469.0</td>
      <td>674934.0</td>
      <td>677403.0</td>
      <td>0.003645</td>
      <td>0.996355</td>
      <td>0.992710</td>
    </tr>
    <tr>
      <th>John</th>
      <td>2398.0</td>
      <td>670893.0</td>
      <td>673291.0</td>
      <td>0.003562</td>
      <td>0.996438</td>
      <td>0.992877</td>
    </tr>
    <tr>
      <th>David</th>
      <td>2003.0</td>
      <td>615943.0</td>
      <td>617946.0</td>
      <td>0.003241</td>
      <td>0.996759</td>
      <td>0.993517</td>
    </tr>
  </tbody>
</table>
</div>



```python
# Find the ratio if the difference (man / women) < 0.1
cond = name_df['M_F_Gap'] < 0.1
name_df[cond]
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
      <th>Sum</th>
      <th>F_ratio</th>
      <th>M_ratio</th>
      <th>M_F_Gap</th>
    </tr>
    <tr>
      <th>Name</th>
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
      <th>Jessie</th>
      <td>25842.0</td>
      <td>21259.0</td>
      <td>47101.0</td>
      <td>0.548651</td>
      <td>0.451349</td>
      <td>0.097302</td>
    </tr>
    <tr>
      <th>Riley</th>
      <td>15539.0</td>
      <td>14929.0</td>
      <td>30468.0</td>
      <td>0.510011</td>
      <td>0.489989</td>
      <td>0.020021</td>
    </tr>
    <tr>
      <th>Emerson</th>
      <td>2341.0</td>
      <td>2471.0</td>
      <td>4812.0</td>
      <td>0.486492</td>
      <td>0.513508</td>
      <td>0.027016</td>
    </tr>
    <tr>
      <th>Justice</th>
      <td>2083.0</td>
      <td>2461.0</td>
      <td>4544.0</td>
      <td>0.458407</td>
      <td>0.541593</td>
      <td>0.083187</td>
    </tr>
    <tr>
      <th>Kris</th>
      <td>2100.0</td>
      <td>2055.0</td>
      <td>4155.0</td>
      <td>0.505415</td>
      <td>0.494585</td>
      <td>0.010830</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>Yihan</th>
      <td>5.0</td>
      <td>5.0</td>
      <td>10.0</td>
      <td>0.500000</td>
      <td>0.500000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>Alika</th>
      <td>5.0</td>
      <td>5.0</td>
      <td>10.0</td>
      <td>0.500000</td>
      <td>0.500000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>Rajdeep</th>
      <td>5.0</td>
      <td>5.0</td>
      <td>10.0</td>
      <td>0.500000</td>
      <td>0.500000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>Ariyan</th>
      <td>5.0</td>
      <td>5.0</td>
      <td>10.0</td>
      <td>0.500000</td>
      <td>0.500000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>Diamante</th>
      <td>5.0</td>
      <td>5.0</td>
      <td>10.0</td>
      <td>0.500000</td>
      <td>0.500000</td>
      <td>0.000000</td>
    </tr>
  </tbody>
</table>
<p>87 rows × 6 columns</p>
</div>



```python
# The most top 10 common names for men and women 
name_df[cond].head(10)
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
      <th>Sum</th>
      <th>F_ratio</th>
      <th>M_ratio</th>
      <th>M_F_Gap</th>
    </tr>
    <tr>
      <th>Name</th>
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
      <th>Jessie</th>
      <td>25842.0</td>
      <td>21259.0</td>
      <td>47101.0</td>
      <td>0.548651</td>
      <td>0.451349</td>
      <td>0.097302</td>
    </tr>
    <tr>
      <th>Riley</th>
      <td>15539.0</td>
      <td>14929.0</td>
      <td>30468.0</td>
      <td>0.510011</td>
      <td>0.489989</td>
      <td>0.020021</td>
    </tr>
    <tr>
      <th>Emerson</th>
      <td>2341.0</td>
      <td>2471.0</td>
      <td>4812.0</td>
      <td>0.486492</td>
      <td>0.513508</td>
      <td>0.027016</td>
    </tr>
    <tr>
      <th>Justice</th>
      <td>2083.0</td>
      <td>2461.0</td>
      <td>4544.0</td>
      <td>0.458407</td>
      <td>0.541593</td>
      <td>0.083187</td>
    </tr>
    <tr>
      <th>Kris</th>
      <td>2100.0</td>
      <td>2055.0</td>
      <td>4155.0</td>
      <td>0.505415</td>
      <td>0.494585</td>
      <td>0.010830</td>
    </tr>
    <tr>
      <th>Carey</th>
      <td>1969.0</td>
      <td>1841.0</td>
      <td>3810.0</td>
      <td>0.516798</td>
      <td>0.483202</td>
      <td>0.033596</td>
    </tr>
    <tr>
      <th>Amari</th>
      <td>1694.0</td>
      <td>2057.0</td>
      <td>3751.0</td>
      <td>0.451613</td>
      <td>0.548387</td>
      <td>0.096774</td>
    </tr>
    <tr>
      <th>Stevie</th>
      <td>1795.0</td>
      <td>1649.0</td>
      <td>3444.0</td>
      <td>0.521196</td>
      <td>0.478804</td>
      <td>0.042393</td>
    </tr>
    <tr>
      <th>Merle</th>
      <td>1623.0</td>
      <td>1612.0</td>
      <td>3235.0</td>
      <td>0.501700</td>
      <td>0.498300</td>
      <td>0.003400</td>
    </tr>
    <tr>
      <th>Jaylin</th>
      <td>1174.0</td>
      <td>1021.0</td>
      <td>2195.0</td>
      <td>0.534852</td>
      <td>0.465148</td>
      <td>0.069704</td>
    </tr>
  </tbody>
</table>
</div>



```python
# The list of common name
name_df[cond].head(10).index
```

<pre>
Index(['Jessie', 'Riley', 'Emerson', 'Justice', 'Kris', 'Carey', 'Amari',
       'Stevie', 'Merle', 'Jaylin'],
      dtype='object', name='Name')
</pre>

```python
## 3. Trends of name
#      by Year
#      the criteria of standard is 30 years
```


```python
raw['YearOfBirth'].unique()
```

<pre>
array([1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920,
       1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931,
       1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942,
       1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953,
       1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964,
       1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975,
       1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986,
       1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997,
       1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
       2009, 2010, 2011, 2012, 2013, 2014, 2015], dtype=int64)
</pre>

```python
# Divide by year
year_class_list = []
for year in raw['YearOfBirth']:
    if year <= 1930:
        year_class = 'Before 1930'
    elif year <= 1960:
        year_class = 'Before 1960'
    elif year <= 1990:
        year_class = 'Before 1990'
    else:
        year_class = 'Before 2020'
    year_class_list.append(year_class)
```


```python
# Print all classified data
# year_class_list
# Too many values in data...
```


```python
raw['year_class'] = year_class_list
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
      <th>year_class</th>
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
      <td>Before 1930</td>
    </tr>
    <tr>
      <th>1</th>
      <td>AK</td>
      <td>F</td>
      <td>1910</td>
      <td>Annie</td>
      <td>12</td>
      <td>Before 1930</td>
    </tr>
    <tr>
      <th>2</th>
      <td>AK</td>
      <td>F</td>
      <td>1910</td>
      <td>Anna</td>
      <td>10</td>
      <td>Before 1930</td>
    </tr>
    <tr>
      <th>3</th>
      <td>AK</td>
      <td>F</td>
      <td>1910</td>
      <td>Margaret</td>
      <td>8</td>
      <td>Before 1930</td>
    </tr>
    <tr>
      <th>4</th>
      <td>AK</td>
      <td>F</td>
      <td>1910</td>
      <td>Helen</td>
      <td>7</td>
      <td>Before 1930</td>
    </tr>
  </tbody>
</table>
</div>



```python
# By using pivot_table(), we can print the number of names that used in each period
name_period = raw.pivot_table(index = ['Name', 'Sex'], values = 'Number', aggfunc = 'sum', columns = 'year_class')
name_period = name_period.fillna(0)
name_period = name_period.astype(int)
name_period.head()
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
      <th>year_class</th>
      <th>Before 1930</th>
      <th>Before 1960</th>
      <th>Before 1990</th>
      <th>Before 2020</th>
    </tr>
    <tr>
      <th>Name</th>
      <th>Sex</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Aadan</th>
      <th>M</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>18</td>
    </tr>
    <tr>
      <th>Aaden</th>
      <th>M</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>855</td>
    </tr>
    <tr>
      <th>Aadhav</th>
      <th>M</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>14</td>
    </tr>
    <tr>
      <th>Aadhya</th>
      <th>F</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>188</td>
    </tr>
    <tr>
      <th>Aadi</th>
      <th>M</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>116</td>
    </tr>
  </tbody>
</table>
</div>



```python
# Get the sum of columns by using sum(axis = 1)
name_period['sum'] = name_period.sum(axis = 1)
#name_period.iloc [0, 1]
#name_period['Before 1930'] + name_period['Before 1960'] + name_period['Before 1990'] + name_period['Before 2020']
name_period
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
      <th>year_class</th>
      <th>Before 1930</th>
      <th>Before 1960</th>
      <th>Before 1990</th>
      <th>Before 2020</th>
      <th>sum</th>
    </tr>
    <tr>
      <th>Name</th>
      <th>Sex</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Aadan</th>
      <th>M</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>18</td>
      <td>18</td>
    </tr>
    <tr>
      <th>Aaden</th>
      <th>M</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>855</td>
      <td>855</td>
    </tr>
    <tr>
      <th>Aadhav</th>
      <th>M</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>14</td>
      <td>14</td>
    </tr>
    <tr>
      <th>Aadhya</th>
      <th>F</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>188</td>
      <td>188</td>
    </tr>
    <tr>
      <th>Aadi</th>
      <th>M</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>116</td>
      <td>116</td>
    </tr>
    <tr>
      <th>...</th>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>Zyler</th>
      <th>M</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>38</td>
      <td>38</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">Zyon</th>
      <th>F</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>6</td>
      <td>6</td>
    </tr>
    <tr>
      <th>M</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>91</td>
      <td>91</td>
    </tr>
    <tr>
      <th>Zyra</th>
      <th>F</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>23</td>
      <td>23</td>
    </tr>
    <tr>
      <th>Zyrah</th>
      <th>F</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>5</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
<p>22798 rows × 5 columns</p>
</div>



```python
for col in name_period.columns:
    col_new = col+" ratio"
    name_period[col_new] = name_period[col] / name_period['sum']
    
name_period.head()
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
      <th>year_class</th>
      <th>Before 1930</th>
      <th>Before 1960</th>
      <th>Before 1990</th>
      <th>Before 2020</th>
      <th>sum</th>
      <th>Before 1930 ratio</th>
      <th>Before 1960 ratio</th>
      <th>Before 1990 ratio</th>
      <th>Before 2020 ratio</th>
      <th>sum ratio</th>
    </tr>
    <tr>
      <th>Name</th>
      <th>Sex</th>
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
      <th>Aadan</th>
      <th>M</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>18</td>
      <td>18</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Aaden</th>
      <th>M</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>855</td>
      <td>855</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Aadhav</th>
      <th>M</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>14</td>
      <td>14</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Aadhya</th>
      <th>F</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>188</td>
      <td>188</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Aadi</th>
      <th>M</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>116</td>
      <td>116</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
  </tbody>
</table>
</div>



```python
# Sorting with descending order
name_period = name_period.sort_values(by = ['sum','Before 2020 ratio','Before 1990 ratio'], ascending = False)
name_period
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
      <th>year_class</th>
      <th>Before 1930</th>
      <th>Before 1960</th>
      <th>Before 1990</th>
      <th>Before 2020</th>
      <th>sum</th>
      <th>Before 1930 ratio</th>
      <th>Before 1960 ratio</th>
      <th>Before 1990 ratio</th>
      <th>Before 2020 ratio</th>
      <th>sum ratio</th>
    </tr>
    <tr>
      <th>Name</th>
      <th>Sex</th>
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
      <th>Michael</th>
      <th>M</th>
      <td>4990</td>
      <td>198074</td>
      <td>377295</td>
      <td>145398</td>
      <td>725757</td>
      <td>0.006876</td>
      <td>0.272921</td>
      <td>0.519864</td>
      <td>0.200340</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>James</th>
      <th>M</th>
      <td>97838</td>
      <td>288091</td>
      <td>225243</td>
      <td>82099</td>
      <td>693271</td>
      <td>0.141125</td>
      <td>0.415553</td>
      <td>0.324899</td>
      <td>0.118423</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Robert</th>
      <th>M</th>
      <td>87070</td>
      <td>292338</td>
      <td>231058</td>
      <td>64468</td>
      <td>674934</td>
      <td>0.129005</td>
      <td>0.433136</td>
      <td>0.342342</td>
      <td>0.095517</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>John</th>
      <th>M</th>
      <td>98536</td>
      <td>268873</td>
      <td>227108</td>
      <td>76376</td>
      <td>670893</td>
      <td>0.146873</td>
      <td>0.400769</td>
      <td>0.338516</td>
      <td>0.113842</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>David</th>
      <th>M</th>
      <td>16463</td>
      <td>203033</td>
      <td>278429</td>
      <td>118018</td>
      <td>615943</td>
      <td>0.026728</td>
      <td>0.329630</td>
      <td>0.452037</td>
      <td>0.191605</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>...</th>
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
    </tr>
    <tr>
      <th>Yoshiro</th>
      <th>M</th>
      <td>5</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>5</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Ysabel</th>
      <th>M</th>
      <td>5</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>5</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Yvonnie</th>
      <th>F</th>
      <td>0</td>
      <td>5</td>
      <td>0</td>
      <td>0</td>
      <td>5</td>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Zebedee</th>
      <th>M</th>
      <td>0</td>
      <td>5</td>
      <td>0</td>
      <td>0</td>
      <td>5</td>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Zygmunt</th>
      <th>M</th>
      <td>5</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>5</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.0</td>
    </tr>
  </tbody>
</table>
<p>22798 rows × 10 columns</p>
</div>



```python
name_period = name_period.reset_index()
name_period.head()
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
      <th>year_class</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Before 1930</th>
      <th>Before 1960</th>
      <th>Before 1990</th>
      <th>Before 2020</th>
      <th>sum</th>
      <th>Before 1930 ratio</th>
      <th>Before 1960 ratio</th>
      <th>Before 1990 ratio</th>
      <th>Before 2020 ratio</th>
      <th>sum ratio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Michael</td>
      <td>M</td>
      <td>4990</td>
      <td>198074</td>
      <td>377295</td>
      <td>145398</td>
      <td>725757</td>
      <td>0.006876</td>
      <td>0.272921</td>
      <td>0.519864</td>
      <td>0.200340</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>James</td>
      <td>M</td>
      <td>97838</td>
      <td>288091</td>
      <td>225243</td>
      <td>82099</td>
      <td>693271</td>
      <td>0.141125</td>
      <td>0.415553</td>
      <td>0.324899</td>
      <td>0.118423</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Robert</td>
      <td>M</td>
      <td>87070</td>
      <td>292338</td>
      <td>231058</td>
      <td>64468</td>
      <td>674934</td>
      <td>0.129005</td>
      <td>0.433136</td>
      <td>0.342342</td>
      <td>0.095517</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>John</td>
      <td>M</td>
      <td>98536</td>
      <td>268873</td>
      <td>227108</td>
      <td>76376</td>
      <td>670893</td>
      <td>0.146873</td>
      <td>0.400769</td>
      <td>0.338516</td>
      <td>0.113842</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>David</td>
      <td>M</td>
      <td>16463</td>
      <td>203033</td>
      <td>278429</td>
      <td>118018</td>
      <td>615943</td>
      <td>0.026728</td>
      <td>0.329630</td>
      <td>0.452037</td>
      <td>0.191605</td>
      <td>1.0</td>
    </tr>
  </tbody>
</table>
</div>



```python
# Men's data
cond = name_period['Sex'] == 'M'
name_period[cond].head(10)
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
      <th>year_class</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Before 1930</th>
      <th>Before 1960</th>
      <th>Before 1990</th>
      <th>Before 2020</th>
      <th>sum</th>
      <th>Before 1930 ratio</th>
      <th>Before 1960 ratio</th>
      <th>Before 1990 ratio</th>
      <th>Before 2020 ratio</th>
      <th>sum ratio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Michael</td>
      <td>M</td>
      <td>4990</td>
      <td>198074</td>
      <td>377295</td>
      <td>145398</td>
      <td>725757</td>
      <td>0.006876</td>
      <td>0.272921</td>
      <td>0.519864</td>
      <td>0.200340</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>James</td>
      <td>M</td>
      <td>97838</td>
      <td>288091</td>
      <td>225243</td>
      <td>82099</td>
      <td>693271</td>
      <td>0.141125</td>
      <td>0.415553</td>
      <td>0.324899</td>
      <td>0.118423</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Robert</td>
      <td>M</td>
      <td>87070</td>
      <td>292338</td>
      <td>231058</td>
      <td>64468</td>
      <td>674934</td>
      <td>0.129005</td>
      <td>0.433136</td>
      <td>0.342342</td>
      <td>0.095517</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>John</td>
      <td>M</td>
      <td>98536</td>
      <td>268873</td>
      <td>227108</td>
      <td>76376</td>
      <td>670893</td>
      <td>0.146873</td>
      <td>0.400769</td>
      <td>0.338516</td>
      <td>0.113842</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>David</td>
      <td>M</td>
      <td>16463</td>
      <td>203033</td>
      <td>278429</td>
      <td>118018</td>
      <td>615943</td>
      <td>0.026728</td>
      <td>0.329630</td>
      <td>0.452037</td>
      <td>0.191605</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>6</th>
      <td>William</td>
      <td>M</td>
      <td>89173</td>
      <td>200843</td>
      <td>141872</td>
      <td>85908</td>
      <td>517796</td>
      <td>0.172216</td>
      <td>0.387881</td>
      <td>0.273992</td>
      <td>0.165911</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Richard</td>
      <td>M</td>
      <td>30680</td>
      <td>185139</td>
      <td>131367</td>
      <td>35293</td>
      <td>382479</td>
      <td>0.080214</td>
      <td>0.484050</td>
      <td>0.343462</td>
      <td>0.092274</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Christopher</td>
      <td>M</td>
      <td>335</td>
      <td>20961</td>
      <td>233318</td>
      <td>123408</td>
      <td>378022</td>
      <td>0.000886</td>
      <td>0.055449</td>
      <td>0.617207</td>
      <td>0.326457</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Daniel</td>
      <td>M</td>
      <td>7133</td>
      <td>59581</td>
      <td>166941</td>
      <td>139894</td>
      <td>373549</td>
      <td>0.019095</td>
      <td>0.159500</td>
      <td>0.446905</td>
      <td>0.374500</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>10</th>
      <td>Joseph</td>
      <td>M</td>
      <td>34908</td>
      <td>75603</td>
      <td>130341</td>
      <td>100905</td>
      <td>341757</td>
      <td>0.102143</td>
      <td>0.221219</td>
      <td>0.381385</td>
      <td>0.295254</td>
      <td>1.0</td>
    </tr>
  </tbody>
</table>
</div>


## 3. Result of my testing and Print top 5 recent trends name for men and women



```python
# Recent trends name of men
cond_age = name_period['Before 2020 ratio'] > 0.3 
cond_sex = name_period['Sex'] == 'M'
cond = cond_age & cond_sex
name_period[cond].head(5)
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
      <th>year_class</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Before 1930</th>
      <th>Before 1960</th>
      <th>Before 1990</th>
      <th>Before 2020</th>
      <th>sum</th>
      <th>Before 1930 ratio</th>
      <th>Before 1960 ratio</th>
      <th>Before 1990 ratio</th>
      <th>Before 2020 ratio</th>
      <th>sum ratio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>8</th>
      <td>Christopher</td>
      <td>M</td>
      <td>335</td>
      <td>20961</td>
      <td>233318</td>
      <td>123408</td>
      <td>378022</td>
      <td>0.000886</td>
      <td>0.055449</td>
      <td>0.617207</td>
      <td>0.326457</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Daniel</td>
      <td>M</td>
      <td>7133</td>
      <td>59581</td>
      <td>166941</td>
      <td>139894</td>
      <td>373549</td>
      <td>0.019095</td>
      <td>0.159500</td>
      <td>0.446905</td>
      <td>0.374500</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>14</th>
      <td>Matthew</td>
      <td>M</td>
      <td>1160</td>
      <td>8822</td>
      <td>148707</td>
      <td>121522</td>
      <td>280211</td>
      <td>0.004140</td>
      <td>0.031483</td>
      <td>0.530697</td>
      <td>0.433680</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>15</th>
      <td>Anthony</td>
      <td>M</td>
      <td>7132</td>
      <td>36965</td>
      <td>114441</td>
      <td>121379</td>
      <td>279917</td>
      <td>0.025479</td>
      <td>0.132057</td>
      <td>0.408839</td>
      <td>0.433625</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>20</th>
      <td>Andrew</td>
      <td>M</td>
      <td>7369</td>
      <td>18639</td>
      <td>94219</td>
      <td>117022</td>
      <td>237249</td>
      <td>0.031060</td>
      <td>0.078563</td>
      <td>0.397131</td>
      <td>0.493245</td>
      <td>1.0</td>
    </tr>
  </tbody>
</table>
</div>



```python
# Recent trends name of women
cond_age = name_period['Before 2020 ratio'] > 0.3 
cond_sex = name_period['Sex'] == 'F'
cond = cond_age & cond_sex
name_period[cond].head(5)
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
      <th>year_class</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Before 1930</th>
      <th>Before 1960</th>
      <th>Before 1990</th>
      <th>Before 2020</th>
      <th>sum</th>
      <th>Before 1930 ratio</th>
      <th>Before 1960 ratio</th>
      <th>Before 1990 ratio</th>
      <th>Before 2020 ratio</th>
      <th>sum ratio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>19</th>
      <td>Jessica</td>
      <td>F</td>
      <td>0</td>
      <td>1380</td>
      <td>153315</td>
      <td>92631</td>
      <td>247326</td>
      <td>0.000000</td>
      <td>0.005580</td>
      <td>0.619890</td>
      <td>0.374530</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>28</th>
      <td>Sarah</td>
      <td>F</td>
      <td>11765</td>
      <td>20330</td>
      <td>93470</td>
      <td>68456</td>
      <td>194021</td>
      <td>0.060638</td>
      <td>0.104782</td>
      <td>0.481752</td>
      <td>0.352828</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>31</th>
      <td>Ashley</td>
      <td>F</td>
      <td>0</td>
      <td>0</td>
      <td>89243</td>
      <td>97123</td>
      <td>186366</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.478859</td>
      <td>0.521141</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>37</th>
      <td>Stephanie</td>
      <td>F</td>
      <td>252</td>
      <td>11271</td>
      <td>111214</td>
      <td>55909</td>
      <td>178646</td>
      <td>0.001411</td>
      <td>0.063091</td>
      <td>0.622538</td>
      <td>0.312960</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>51</th>
      <td>Emily</td>
      <td>F</td>
      <td>3816</td>
      <td>6191</td>
      <td>38195</td>
      <td>105767</td>
      <td>153969</td>
      <td>0.024784</td>
      <td>0.040209</td>
      <td>0.248069</td>
      <td>0.686937</td>
      <td>1.0</td>
    </tr>
  </tbody>
</table>
</div>

