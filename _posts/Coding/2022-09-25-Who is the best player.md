---
layout: single
title:  "Python Study 6"
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


# Who is the best player?

Batting average: hits / time at bat



On Base percentage: (intentional base on balls + base on balls + hits) / time at bat



Slugging percentage : (doubles + tripples + homerun) / time at bat



OPS: On Base percentage + Slugging percentage



## 1. Import pandas library

I will import the data of KBO Hitters in 2019



```python
import pandas as pd
```


```python
file = './data/KBO_2019_player_gamestats.csv'
# It's Korean data
# Encode it with cp949
raw = pd.read_csv(file, encoding = 'cp949')
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
      <th>팀</th>
      <th>이름</th>
      <th>생일</th>
      <th>일자</th>
      <th>상대</th>
      <th>결과</th>
      <th>타순</th>
      <th>P</th>
      <th>선발</th>
      <th>타수</th>
      <th>...</th>
      <th>희타</th>
      <th>희비</th>
      <th>타율</th>
      <th>출루</th>
      <th>장타</th>
      <th>OPS</th>
      <th>투구</th>
      <th>avLI</th>
      <th>RE24</th>
      <th>WPA</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>두산</td>
      <td>페르난데스</td>
      <td>1988-04-27</td>
      <td>03-23</td>
      <td>한화</td>
      <td>W 5:4</td>
      <td>6</td>
      <td>DH</td>
      <td>1</td>
      <td>4</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0.500</td>
      <td>0.500</td>
      <td>0.750</td>
      <td>1.250</td>
      <td>19</td>
      <td>1.98</td>
      <td>1.65</td>
      <td>0.429</td>
    </tr>
    <tr>
      <th>1</th>
      <td>두산</td>
      <td>페르난데스</td>
      <td>1988-04-27</td>
      <td>03-24</td>
      <td>한화</td>
      <td>L 1:11</td>
      <td>6</td>
      <td>DH</td>
      <td>1</td>
      <td>2</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0.333</td>
      <td>0.333</td>
      <td>0.500</td>
      <td>0.833</td>
      <td>4</td>
      <td>0.77</td>
      <td>-0.36</td>
      <td>-0.038</td>
    </tr>
    <tr>
      <th>2</th>
      <td>두산</td>
      <td>페르난데스</td>
      <td>1988-04-27</td>
      <td>03-26</td>
      <td>키움</td>
      <td>W 7:2</td>
      <td>2</td>
      <td>DH</td>
      <td>1</td>
      <td>2</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0.250</td>
      <td>0.400</td>
      <td>0.375</td>
      <td>0.775</td>
      <td>16</td>
      <td>1.56</td>
      <td>0.98</td>
      <td>0.146</td>
    </tr>
    <tr>
      <th>3</th>
      <td>두산</td>
      <td>페르난데스</td>
      <td>1988-04-27</td>
      <td>03-27</td>
      <td>키움</td>
      <td>W 3:2</td>
      <td>2</td>
      <td>DH</td>
      <td>1</td>
      <td>4</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0.417</td>
      <td>0.500</td>
      <td>0.500</td>
      <td>1.000</td>
      <td>11</td>
      <td>1.53</td>
      <td>1.29</td>
      <td>0.189</td>
    </tr>
    <tr>
      <th>4</th>
      <td>두산</td>
      <td>페르난데스</td>
      <td>1988-04-27</td>
      <td>03-28</td>
      <td>키움</td>
      <td>L 4:5</td>
      <td>2</td>
      <td>DH</td>
      <td>1</td>
      <td>3</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0.333</td>
      <td>0.474</td>
      <td>0.400</td>
      <td>0.874</td>
      <td>23</td>
      <td>2.04</td>
      <td>-0.30</td>
      <td>-0.166</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 34 columns</p>
</div>



```python
raw.info()
```

<pre>
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 15311 entries, 0 to 15310
Data columns (total 34 columns):
 #   Column  Non-Null Count  Dtype  
---  ------  --------------  -----  
 0   팀       15311 non-null  object 
 1   이름      15311 non-null  object 
 2   생일      15311 non-null  object 
 3   일자      15311 non-null  object 
 4   상대      15311 non-null  object 
 5   결과      15311 non-null  object 
 6   타순      15311 non-null  int64  
 7   P       15311 non-null  object 
 8   선발      15311 non-null  int64  
 9   타수      15311 non-null  int64  
 10  득점      15311 non-null  int64  
 11  안타      15311 non-null  int64  
 12  2타      15311 non-null  int64  
 13  3타      15311 non-null  int64  
 14  홈런      15311 non-null  int64  
 15  루타      15311 non-null  int64  
 16  타점      15311 non-null  int64  
 17  도루      15311 non-null  int64  
 18  도실      15311 non-null  int64  
 19  볼넷      15311 non-null  int64  
 20  사구      15311 non-null  int64  
 21  고4      15311 non-null  int64  
 22  삼진      15311 non-null  int64  
 23  병살      15311 non-null  int64  
 24  희타      15311 non-null  int64  
 25  희비      15311 non-null  int64  
 26  타율      15311 non-null  float64
 27  출루      15311 non-null  float64
 28  장타      15311 non-null  float64
 29  OPS     15311 non-null  float64
 30  투구      15311 non-null  int64  
 31  avLI    15311 non-null  float64
 32  RE24    15311 non-null  float64
 33  WPA     15311 non-null  float64
dtypes: float64(7), int64(20), object(7)
memory usage: 4.0+ MB
</pre>
## 2. Select colums which I will use



```python
raw.columns
columns_select = ['팀', '이름', '생일','일자', '상대','타수','안타','홈런', '루타', '타점','볼넷', '사구', '희비']
data = raw[columns_select]
data.head()
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
      <th>팀</th>
      <th>이름</th>
      <th>생일</th>
      <th>일자</th>
      <th>상대</th>
      <th>타수</th>
      <th>안타</th>
      <th>홈런</th>
      <th>루타</th>
      <th>타점</th>
      <th>볼넷</th>
      <th>사구</th>
      <th>희비</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>두산</td>
      <td>페르난데스</td>
      <td>1988-04-27</td>
      <td>03-23</td>
      <td>한화</td>
      <td>4</td>
      <td>2</td>
      <td>0</td>
      <td>3</td>
      <td>3</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>두산</td>
      <td>페르난데스</td>
      <td>1988-04-27</td>
      <td>03-24</td>
      <td>한화</td>
      <td>2</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>두산</td>
      <td>페르난데스</td>
      <td>1988-04-27</td>
      <td>03-26</td>
      <td>키움</td>
      <td>2</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>2</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>두산</td>
      <td>페르난데스</td>
      <td>1988-04-27</td>
      <td>03-27</td>
      <td>키움</td>
      <td>4</td>
      <td>3</td>
      <td>0</td>
      <td>3</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>두산</td>
      <td>페르난데스</td>
      <td>1988-04-27</td>
      <td>03-28</td>
      <td>키움</td>
      <td>3</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>2</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>


## 3. Check who is the best



```python
# By using pivot table, organize the dataset.
data_player = data.pivot_table(index = ['팀','이름','생일'], 
                               values = ['타수','안타','홈런','루타','타점','볼넷','사구','희비'], 
                              aggfunc = 'sum')

data_player.head()
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
      <th></th>
      <th></th>
      <th>루타</th>
      <th>볼넷</th>
      <th>사구</th>
      <th>안타</th>
      <th>타수</th>
      <th>타점</th>
      <th>홈런</th>
      <th>희비</th>
    </tr>
    <tr>
      <th>팀</th>
      <th>이름</th>
      <th>생일</th>
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
      <th rowspan="5" valign="top">KIA</th>
      <th>고영창</th>
      <th>1989-02-24</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>김선빈</th>
      <th>1989-12-18</th>
      <td>146</td>
      <td>43</td>
      <td>1</td>
      <td>115</td>
      <td>394</td>
      <td>40</td>
      <td>3</td>
      <td>4</td>
    </tr>
    <tr>
      <th>김세현</th>
      <th>1987-08-07</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>김주찬</th>
      <th>1981-03-25</th>
      <td>126</td>
      <td>17</td>
      <td>5</td>
      <td>101</td>
      <td>337</td>
      <td>32</td>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <th>나지완</th>
      <th>1985-05-19</th>
      <td>47</td>
      <td>19</td>
      <td>3</td>
      <td>24</td>
      <td>129</td>
      <td>17</td>
      <td>6</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
</div>



```python
# There's some data with time at bat(타수) <= 10
# Check the distribution

data_player['타수'].hist()
```

<pre>
<AxesSubplot:>
</pre>
<img src="data:image/png;base64,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"/>


```python
# I will select players with time at bat > 50
cond = data_player['타수'] > 50
data_player = data_player[cond].reset_index()
data_player.head()
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
      <th>팀</th>
      <th>이름</th>
      <th>생일</th>
      <th>루타</th>
      <th>볼넷</th>
      <th>사구</th>
      <th>안타</th>
      <th>타수</th>
      <th>타점</th>
      <th>홈런</th>
      <th>희비</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>KIA</td>
      <td>김선빈</td>
      <td>1989-12-18</td>
      <td>146</td>
      <td>43</td>
      <td>1</td>
      <td>115</td>
      <td>394</td>
      <td>40</td>
      <td>3</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>KIA</td>
      <td>김주찬</td>
      <td>1981-03-25</td>
      <td>126</td>
      <td>17</td>
      <td>5</td>
      <td>101</td>
      <td>337</td>
      <td>32</td>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <th>2</th>
      <td>KIA</td>
      <td>나지완</td>
      <td>1985-05-19</td>
      <td>47</td>
      <td>19</td>
      <td>3</td>
      <td>24</td>
      <td>129</td>
      <td>17</td>
      <td>6</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>KIA</td>
      <td>류승현</td>
      <td>1997-07-01</td>
      <td>48</td>
      <td>9</td>
      <td>4</td>
      <td>38</td>
      <td>150</td>
      <td>14</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>KIA</td>
      <td>박찬호</td>
      <td>1995-06-05</td>
      <td>160</td>
      <td>26</td>
      <td>4</td>
      <td>131</td>
      <td>504</td>
      <td>49</td>
      <td>2</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
</div>



```python
# Make function to calculate Batting average, On Base percentage, Slugging percentage, OPS
# Batting average: hits / time at bat = 안타 / 타수
# On Base percentage: (intentional base on balls + base on balls + hits) / time at bat = (안타+볼넷+몸에맞는볼)/(타수+볼넷+몸에맞는볼+희생플라이)
# Slugging percentage : (doubles + tripples + homerun) / time at bat = 루타 / 타수
# OPS: On Base percentage + Slugging percentage

def cal_hit(df):
    df['AVG'] = df['안타'] / df['타수']
    df['OBP'] = (df['안타'] + df['볼넷'] + df['사구']) / (df['타수'] + df['볼넷'] + df['사구'] + df['희비'])
    df['SLG'] = df['루타'] / df['타수']
    df['OPS'] = df['OBP'] + df['SLG']
    return df
```


```python
data_player.head()
player_stat =  cal_hit(data_player)
player_stat.head()
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
      <th>팀</th>
      <th>이름</th>
      <th>생일</th>
      <th>루타</th>
      <th>볼넷</th>
      <th>사구</th>
      <th>안타</th>
      <th>타수</th>
      <th>타점</th>
      <th>홈런</th>
      <th>희비</th>
      <th>AVG</th>
      <th>OBP</th>
      <th>SLG</th>
      <th>OPS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>KIA</td>
      <td>김선빈</td>
      <td>1989-12-18</td>
      <td>146</td>
      <td>43</td>
      <td>1</td>
      <td>115</td>
      <td>394</td>
      <td>40</td>
      <td>3</td>
      <td>4</td>
      <td>0.291878</td>
      <td>0.359729</td>
      <td>0.370558</td>
      <td>0.730287</td>
    </tr>
    <tr>
      <th>1</th>
      <td>KIA</td>
      <td>김주찬</td>
      <td>1981-03-25</td>
      <td>126</td>
      <td>17</td>
      <td>5</td>
      <td>101</td>
      <td>337</td>
      <td>32</td>
      <td>3</td>
      <td>3</td>
      <td>0.299703</td>
      <td>0.339779</td>
      <td>0.373887</td>
      <td>0.713666</td>
    </tr>
    <tr>
      <th>2</th>
      <td>KIA</td>
      <td>나지완</td>
      <td>1985-05-19</td>
      <td>47</td>
      <td>19</td>
      <td>3</td>
      <td>24</td>
      <td>129</td>
      <td>17</td>
      <td>6</td>
      <td>2</td>
      <td>0.186047</td>
      <td>0.300654</td>
      <td>0.364341</td>
      <td>0.664995</td>
    </tr>
    <tr>
      <th>3</th>
      <td>KIA</td>
      <td>류승현</td>
      <td>1997-07-01</td>
      <td>48</td>
      <td>9</td>
      <td>4</td>
      <td>38</td>
      <td>150</td>
      <td>14</td>
      <td>0</td>
      <td>0</td>
      <td>0.253333</td>
      <td>0.312883</td>
      <td>0.320000</td>
      <td>0.632883</td>
    </tr>
    <tr>
      <th>4</th>
      <td>KIA</td>
      <td>박찬호</td>
      <td>1995-06-05</td>
      <td>160</td>
      <td>26</td>
      <td>4</td>
      <td>131</td>
      <td>504</td>
      <td>49</td>
      <td>2</td>
      <td>2</td>
      <td>0.259921</td>
      <td>0.300373</td>
      <td>0.317460</td>
      <td>0.617833</td>
    </tr>
  </tbody>
</table>
</div>


## 3. reset_index(drop = True)

reset the index number



```python
# Sorting with the OBP
# if OBP is the same, then sorting with SLG
# next standard is OPS, and AVG

player_stat = player_stat.sort_values(by = ['OBP', 'SLG', 'OPS', 'AVG'], ascending = False)
player_stat.reset_index(drop = True).head()
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
      <th>팀</th>
      <th>이름</th>
      <th>생일</th>
      <th>루타</th>
      <th>볼넷</th>
      <th>사구</th>
      <th>안타</th>
      <th>타수</th>
      <th>타점</th>
      <th>홈런</th>
      <th>희비</th>
      <th>AVG</th>
      <th>OBP</th>
      <th>SLG</th>
      <th>OPS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>NC</td>
      <td>나성범</td>
      <td>1989-10-03</td>
      <td>60</td>
      <td>12</td>
      <td>1</td>
      <td>34</td>
      <td>93</td>
      <td>14</td>
      <td>4</td>
      <td>0</td>
      <td>0.365591</td>
      <td>0.443396</td>
      <td>0.645161</td>
      <td>1.088558</td>
    </tr>
    <tr>
      <th>1</th>
      <td>NC</td>
      <td>양의지</td>
      <td>1987-06-05</td>
      <td>225</td>
      <td>48</td>
      <td>15</td>
      <td>139</td>
      <td>394</td>
      <td>68</td>
      <td>20</td>
      <td>6</td>
      <td>0.352792</td>
      <td>0.436285</td>
      <td>0.571066</td>
      <td>1.007351</td>
    </tr>
    <tr>
      <th>2</th>
      <td>KT</td>
      <td>강백호</td>
      <td>1999-07-29</td>
      <td>217</td>
      <td>61</td>
      <td>2</td>
      <td>147</td>
      <td>438</td>
      <td>65</td>
      <td>13</td>
      <td>4</td>
      <td>0.335616</td>
      <td>0.415842</td>
      <td>0.495434</td>
      <td>0.911275</td>
    </tr>
    <tr>
      <th>3</th>
      <td>KIA</td>
      <td>최형우</td>
      <td>1983-12-16</td>
      <td>221</td>
      <td>85</td>
      <td>7</td>
      <td>137</td>
      <td>456</td>
      <td>86</td>
      <td>17</td>
      <td>7</td>
      <td>0.300439</td>
      <td>0.412613</td>
      <td>0.484649</td>
      <td>0.897262</td>
    </tr>
    <tr>
      <th>4</th>
      <td>두산</td>
      <td>페르난데스</td>
      <td>1988-04-27</td>
      <td>277</td>
      <td>63</td>
      <td>6</td>
      <td>197</td>
      <td>581</td>
      <td>90</td>
      <td>15</td>
      <td>6</td>
      <td>0.339071</td>
      <td>0.405488</td>
      <td>0.476764</td>
      <td>0.882252</td>
    </tr>
  </tbody>
</table>
</div>


## 4. Distribution with boxplot



```python
# import seaborn library
import seaborn as sns
sns.boxplot(data = player_stat, x = '팀', y = 'OBP')
```

<pre>
<AxesSubplot:xlabel='팀', ylabel='OBP'>
</pre>
<img src="data:image/png;base64,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"/>


```python
# Error message due to Korean words
# Swith to font which offers Korean words
import matplotlib
import matplotlib.pyplot as plt
from matplotlib import font_manager, rc
import platform
import seaborn as sns

# Korean support 
if platform.system() == 'Windows':
    font_name = font_manager.FontProperties(fname = "c:/Windows/Fonts/malgun.ttf").get_name()
    rc('font', family = font_name)
matplotlib.rcParams['axes.unicode_minus'] = False
```


```python
sns.boxplot(data = player_stat, x = "팀", y = 'OBP')
```

<pre>
<AxesSubplot:xlabel='팀', ylabel='OBP'>
</pre>
<img src="data:image/png;base64,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"/>


```python
# Compare swarmplot and boxplot
sns.boxplot(data = player_stat, x = '팀', y = 'OBP')
sns.swarmplot(data = player_stat, x = '팀', y = 'OBP')
```

<pre>
<AxesSubplot:xlabel='팀', ylabel='OBP'>
</pre>
<img src="data:image/png;base64,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"/>


```python
# Graphs of botplot and swarmplot are hard to identify them
# So, I will remove the color of boxplot

sns.boxplot(data = player_stat, x = '팀', y = 'OBP',
           showcaps = False, whiskerprops = {'linewidth': 0},
           showfliers = False, boxprops = {'facecolor': 'None'})
sns.swarmplot(data = player_stat, x = '팀', y = 'OBP')
```

<pre>
<AxesSubplot:xlabel='팀', ylabel='OBP'>
</pre>
<img src="data:image/png;base64,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"/>


```python
# Store this data
file = './data/player_stat.csv'
player_stat.to_csv(file, encoding = 'cp949', index = False)
```


```python
```
