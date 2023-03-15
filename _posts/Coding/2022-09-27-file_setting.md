---
layout: single
title:  "Python Study 7"
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



```python
# import library
import pandas as pd
```

## 1. Import raw file (Korea Subway information)

- Dates/ lanes/ Customers

- From January, 2019 ~ June, 2019




```python
# Import one of the files
file = "./rawfiles/CARD_SUBWAY_MONTH_201901.csv"
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
      <th>사용일자</th>
      <th>노선명</th>
      <th>역ID</th>
      <th>역명</th>
      <th>승차총승객수</th>
      <th>하차총승객수</th>
      <th>등록일자</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1323</td>
      <td>가평</td>
      <td>1520</td>
      <td>1436</td>
      <td>20190104</td>
    </tr>
    <tr>
      <th>1</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1322</td>
      <td>상천</td>
      <td>275</td>
      <td>114</td>
      <td>20190104</td>
    </tr>
    <tr>
      <th>2</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1321</td>
      <td>청평</td>
      <td>1509</td>
      <td>1083</td>
      <td>20190104</td>
    </tr>
    <tr>
      <th>3</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1320</td>
      <td>대성리</td>
      <td>357</td>
      <td>271</td>
      <td>20190104</td>
    </tr>
    <tr>
      <th>4</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1319</td>
      <td>마석</td>
      <td>1772</td>
      <td>1963</td>
      <td>20190104</td>
    </tr>
  </tbody>
</table>
</div>



```python
# Data Infromation
raw.info()
```

<pre>
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 18334 entries, 0 to 18333
Data columns (total 7 columns):
 #   Column  Non-Null Count  Dtype 
---  ------  --------------  ----- 
 0   사용일자    18334 non-null  int64 
 1   노선명     18334 non-null  object
 2   역ID     18334 non-null  int64 
 3   역명      18334 non-null  object
 4   승차총승객수  18334 non-null  int64 
 5   하차총승객수  18334 non-null  int64 
 6   등록일자    18334 non-null  int64 
dtypes: int64(5), object(2)
memory usage: 1002.8+ KB
</pre>
### Read data file: read_excel/ read_csv

- pd.read_excel ('file location + file name.xlsx')

- pd.read_csv('file location + filename.csv', encoding = 'utf-8') (default)

- pd.read_csv('file location + filename.csv', encoding = 'cp949') (IF ms excel)

### Frequently used option

-pd.read_excel('file locaion', option1 = value1, option2 = value2 ...)

-index_col = column index number # Select which column set as index

- header = row index number #Select from which rows going to set as daata

- thousands = ',' # make numbers look esier



```python
# Import several datasets and combine them
raw = pd.DataFrame()
file1 = './rawfiles/CARD_SUBWAY_MONTH_201901.csv'
file2 = './rawfiles/CARD_SUBWAY_MONTH_201902.csv'
temp = pd.read_csv(file1)
raw = raw.append(temp)
temp = pd.read_csv(file2)
raw = raw.append(temp)
```


```python
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
      <th>사용일자</th>
      <th>노선명</th>
      <th>역ID</th>
      <th>역명</th>
      <th>승차총승객수</th>
      <th>하차총승객수</th>
      <th>등록일자</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1323</td>
      <td>가평</td>
      <td>1520</td>
      <td>1436</td>
      <td>20190104</td>
    </tr>
    <tr>
      <th>1</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1322</td>
      <td>상천</td>
      <td>275</td>
      <td>114</td>
      <td>20190104</td>
    </tr>
    <tr>
      <th>2</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1321</td>
      <td>청평</td>
      <td>1509</td>
      <td>1083</td>
      <td>20190104</td>
    </tr>
    <tr>
      <th>3</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1320</td>
      <td>대성리</td>
      <td>357</td>
      <td>271</td>
      <td>20190104</td>
    </tr>
    <tr>
      <th>4</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1319</td>
      <td>마석</td>
      <td>1772</td>
      <td>1963</td>
      <td>20190104</td>
    </tr>
  </tbody>
</table>
</div>



```python
# We can check whether combined well or not by using tail()
raw.tail()
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
      <th>사용일자</th>
      <th>노선명</th>
      <th>역ID</th>
      <th>역명</th>
      <th>승차총승객수</th>
      <th>하차총승객수</th>
      <th>등록일자</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>16538</th>
      <td>20190228</td>
      <td>우이신설선</td>
      <td>4709</td>
      <td>북한산보국문</td>
      <td>6564</td>
      <td>6029</td>
      <td>20190303</td>
    </tr>
    <tr>
      <th>16539</th>
      <td>20190228</td>
      <td>우이신설선</td>
      <td>4710</td>
      <td>정릉</td>
      <td>4821</td>
      <td>4348</td>
      <td>20190303</td>
    </tr>
    <tr>
      <th>16540</th>
      <td>20190228</td>
      <td>경춘선</td>
      <td>1314</td>
      <td>퇴계원</td>
      <td>4212</td>
      <td>3899</td>
      <td>20190303</td>
    </tr>
    <tr>
      <th>16541</th>
      <td>20190228</td>
      <td>우이신설선</td>
      <td>4711</td>
      <td>성신여대입구(돈암)</td>
      <td>4058</td>
      <td>4452</td>
      <td>20190303</td>
    </tr>
    <tr>
      <th>16542</th>
      <td>20190228</td>
      <td>우이신설선</td>
      <td>4712</td>
      <td>보문</td>
      <td>1803</td>
      <td>1836</td>
      <td>20190303</td>
    </tr>
  </tbody>
</table>
</div>


## 2. Import all the files in the folder



```python
# Import os library (directing folder/file)
import os
```


```python
# Using os.listdir(), check the file lists in rawfiles(folder)
files = os.listdir('./rawfiles')
files
```

<pre>
['CARD_SUBWAY_MONTH_201901.csv',
 'CARD_SUBWAY_MONTH_201902.csv',
 'CARD_SUBWAY_MONTH_201903.csv',
 'CARD_SUBWAY_MONTH_201904.csv',
 'CARD_SUBWAY_MONTH_201905.csv',
 'CARD_SUBWAY_MONTH_201906.csv']
</pre>
## 3. Combine all files in rawfiles

- Make empty DataFrame

- Using loop, read csv file - add to DataFrame




```python
raw = pd.DataFrame()
path = './rawfiles/'
for file in files:
    temp = pd.read_csv(path + file)
    raw = raw.append(temp) 
    #raw = raw.append(temp, ignore_index = True) #Reset index by adding
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
      <th>사용일자</th>
      <th>노선명</th>
      <th>역ID</th>
      <th>역명</th>
      <th>승차총승객수</th>
      <th>하차총승객수</th>
      <th>등록일자</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1323</td>
      <td>가평</td>
      <td>1520</td>
      <td>1436</td>
      <td>20190104</td>
    </tr>
    <tr>
      <th>1</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1322</td>
      <td>상천</td>
      <td>275</td>
      <td>114</td>
      <td>20190104</td>
    </tr>
    <tr>
      <th>2</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1321</td>
      <td>청평</td>
      <td>1509</td>
      <td>1083</td>
      <td>20190104</td>
    </tr>
    <tr>
      <th>3</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1320</td>
      <td>대성리</td>
      <td>357</td>
      <td>271</td>
      <td>20190104</td>
    </tr>
    <tr>
      <th>4</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1319</td>
      <td>마석</td>
      <td>1772</td>
      <td>1963</td>
      <td>20190104</td>
    </tr>
  </tbody>
</table>
</div>



```python
# Check wheter combined well or not
raw.tail()
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
      <th>사용일자</th>
      <th>노선명</th>
      <th>역ID</th>
      <th>역명</th>
      <th>승차총승객수</th>
      <th>하차총승객수</th>
      <th>등록일자</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>17719</th>
      <td>20190630</td>
      <td>2호선</td>
      <td>204</td>
      <td>을지로4가</td>
      <td>4940</td>
      <td>4668</td>
      <td>20190703</td>
    </tr>
    <tr>
      <th>17720</th>
      <td>20190630</td>
      <td>2호선</td>
      <td>203</td>
      <td>을지로3가</td>
      <td>12043</td>
      <td>11854</td>
      <td>20190703</td>
    </tr>
    <tr>
      <th>17721</th>
      <td>20190630</td>
      <td>2호선</td>
      <td>202</td>
      <td>을지로입구</td>
      <td>31622</td>
      <td>29723</td>
      <td>20190703</td>
    </tr>
    <tr>
      <th>17722</th>
      <td>20190630</td>
      <td>2호선</td>
      <td>201</td>
      <td>시청</td>
      <td>10178</td>
      <td>8214</td>
      <td>20190703</td>
    </tr>
    <tr>
      <th>17723</th>
      <td>20190630</td>
      <td>1호선</td>
      <td>159</td>
      <td>동묘앞</td>
      <td>13859</td>
      <td>14352</td>
      <td>20190703</td>
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
Int64Index: 99342 entries, 0 to 17723
Data columns (total 7 columns):
 #   Column  Non-Null Count  Dtype 
---  ------  --------------  ----- 
 0   사용일자    99342 non-null  int64 
 1   노선명     99342 non-null  object
 2   역ID     99342 non-null  int64 
 3   역명      99342 non-null  object
 4   승차총승객수  99342 non-null  int64 
 5   하차총승객수  99342 non-null  int64 
 6   등록일자    99342 non-null  int64 
dtypes: int64(5), object(2)
memory usage: 6.1+ MB
</pre>

```python
# Reset index numbers
raw = raw.reset_index(drop = True)
raw.tail()
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
      <th>사용일자</th>
      <th>노선명</th>
      <th>역ID</th>
      <th>역명</th>
      <th>승차총승객수</th>
      <th>하차총승객수</th>
      <th>등록일자</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>99337</th>
      <td>20190630</td>
      <td>2호선</td>
      <td>204</td>
      <td>을지로4가</td>
      <td>4940</td>
      <td>4668</td>
      <td>20190703</td>
    </tr>
    <tr>
      <th>99338</th>
      <td>20190630</td>
      <td>2호선</td>
      <td>203</td>
      <td>을지로3가</td>
      <td>12043</td>
      <td>11854</td>
      <td>20190703</td>
    </tr>
    <tr>
      <th>99339</th>
      <td>20190630</td>
      <td>2호선</td>
      <td>202</td>
      <td>을지로입구</td>
      <td>31622</td>
      <td>29723</td>
      <td>20190703</td>
    </tr>
    <tr>
      <th>99340</th>
      <td>20190630</td>
      <td>2호선</td>
      <td>201</td>
      <td>시청</td>
      <td>10178</td>
      <td>8214</td>
      <td>20190703</td>
    </tr>
    <tr>
      <th>99341</th>
      <td>20190630</td>
      <td>1호선</td>
      <td>159</td>
      <td>동묘앞</td>
      <td>13859</td>
      <td>14352</td>
      <td>20190703</td>
    </tr>
  </tbody>
</table>
</div>


## 4.Add day (ex) Monday, Tuesday...)

- import datetime library

- datetime.strptime('day str', type of str): 

 - type of str type: %Y-%m-%d %H:%M:%S




```python
from datetime import datetime
```


```python
# Example
s = '20220107'
date = datetime.strptime(s,'%Y%m%d')
date
```

<pre>
datetime.datetime(2022, 1, 7, 0, 0)
</pre>

```python
# weekday()
# Monday : 0 ~ Sunday: 6
date.weekday()
```

<pre>
4
</pre>

```python
weekday_dict = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
weekday_index = date.weekday()
print(weekday_index)
print(weekday_dict[weekday_index])
```

<pre>
4
Friday
</pre>

```python
# Import date column and store them in the list
weekday_list = []
for date_str in raw['사용일자']:
    date = datetime.strptime(str(date_str), '%Y%m%d')
    weekday_index = date.weekday()
    weekday = weekday_dict[weekday_index]
    weekday_list.append(weekday)
```


```python
raw['Day'] = weekday_list
```


```python
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
      <th>사용일자</th>
      <th>노선명</th>
      <th>역ID</th>
      <th>역명</th>
      <th>승차총승객수</th>
      <th>하차총승객수</th>
      <th>등록일자</th>
      <th>Day</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1323</td>
      <td>가평</td>
      <td>1520</td>
      <td>1436</td>
      <td>20190104</td>
      <td>Tuesday</td>
    </tr>
    <tr>
      <th>1</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1322</td>
      <td>상천</td>
      <td>275</td>
      <td>114</td>
      <td>20190104</td>
      <td>Tuesday</td>
    </tr>
    <tr>
      <th>2</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1321</td>
      <td>청평</td>
      <td>1509</td>
      <td>1083</td>
      <td>20190104</td>
      <td>Tuesday</td>
    </tr>
    <tr>
      <th>3</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1320</td>
      <td>대성리</td>
      <td>357</td>
      <td>271</td>
      <td>20190104</td>
      <td>Tuesday</td>
    </tr>
    <tr>
      <th>4</th>
      <td>20190101</td>
      <td>경춘선</td>
      <td>1319</td>
      <td>마석</td>
      <td>1772</td>
      <td>1963</td>
      <td>20190104</td>
      <td>Tuesday</td>
    </tr>
  </tbody>
</table>
</div>



```python
# Print random samples
raw.sample(5)
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
      <th>사용일자</th>
      <th>노선명</th>
      <th>역ID</th>
      <th>역명</th>
      <th>승차총승객수</th>
      <th>하차총승객수</th>
      <th>등록일자</th>
      <th>Day</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>11824</th>
      <td>20190120</td>
      <td>중앙선</td>
      <td>1205</td>
      <td>구리</td>
      <td>8901</td>
      <td>9425</td>
      <td>20190123</td>
      <td>Sunday</td>
    </tr>
    <tr>
      <th>51986</th>
      <td>20190408</td>
      <td>안산선</td>
      <td>1763</td>
      <td>수리산</td>
      <td>5253</td>
      <td>4097</td>
      <td>20190411</td>
      <td>Monday</td>
    </tr>
    <tr>
      <th>58162</th>
      <td>20190420</td>
      <td>6호선</td>
      <td>2646</td>
      <td>태릉입구</td>
      <td>5220</td>
      <td>5703</td>
      <td>20190423</td>
      <td>Saturday</td>
    </tr>
    <tr>
      <th>92624</th>
      <td>20190619</td>
      <td>5호선</td>
      <td>2552</td>
      <td>명일</td>
      <td>9232</td>
      <td>9984</td>
      <td>20190622</td>
      <td>Wednesday</td>
    </tr>
    <tr>
      <th>74917</th>
      <td>20190519</td>
      <td>경의선</td>
      <td>1251</td>
      <td>서울역</td>
      <td>1564</td>
      <td>1287</td>
      <td>20190522</td>
      <td>Sunday</td>
    </tr>
  </tbody>
</table>
</div>



```python
# Change columns order

raw = raw[['사용일자','Day', '노선명', '역ID', '역명', '승차총승객수', '하차총승객수', '등록일자']]
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
      <th>사용일자</th>
      <th>Day</th>
      <th>노선명</th>
      <th>역ID</th>
      <th>역명</th>
      <th>승차총승객수</th>
      <th>하차총승객수</th>
      <th>등록일자</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>20190101</td>
      <td>Tuesday</td>
      <td>경춘선</td>
      <td>1323</td>
      <td>가평</td>
      <td>1520</td>
      <td>1436</td>
      <td>20190104</td>
    </tr>
    <tr>
      <th>1</th>
      <td>20190101</td>
      <td>Tuesday</td>
      <td>경춘선</td>
      <td>1322</td>
      <td>상천</td>
      <td>275</td>
      <td>114</td>
      <td>20190104</td>
    </tr>
    <tr>
      <th>2</th>
      <td>20190101</td>
      <td>Tuesday</td>
      <td>경춘선</td>
      <td>1321</td>
      <td>청평</td>
      <td>1509</td>
      <td>1083</td>
      <td>20190104</td>
    </tr>
    <tr>
      <th>3</th>
      <td>20190101</td>
      <td>Tuesday</td>
      <td>경춘선</td>
      <td>1320</td>
      <td>대성리</td>
      <td>357</td>
      <td>271</td>
      <td>20190104</td>
    </tr>
    <tr>
      <th>4</th>
      <td>20190101</td>
      <td>Tuesday</td>
      <td>경춘선</td>
      <td>1319</td>
      <td>마석</td>
      <td>1772</td>
      <td>1963</td>
      <td>20190104</td>
    </tr>
  </tbody>
</table>
</div>


## 5. Store dataset into file



```python
fpath = './data/subway_raw.xlsx'
raw.to_excel(fpath, index = False)
```
