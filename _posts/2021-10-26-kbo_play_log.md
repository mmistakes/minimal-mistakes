---
layout: single
title:  "kbo play log"
tags : [python, 크롤링, 야구]
---


```python
#datelist 라는 엑셀 파일에
#yyyy-mm-dd  형식으로 날짜 리스트 준비


import time
import pandas as pd
import requests
from bs4 import BeautifulSoup
from html_table_parser import parser_functions as parser
import os
import datetime 

#시작 시간 측정
start = time.time()

#긁어 올 datelist 준비 yyyy-mm-dd 형식
datelist = pd.read_excel('datelist.xlsx', sheet_name ='Sheet1', header = None)
datelist.columns = ['date']
datelist = datelist['date']

df_list = pd.DataFrame()

for i in datelist.index :
    url = 'http://www.statiz.co.kr/boxscore.php?date=' + str(datelist[i])

    
    html = requests.get(url).text
    soup = BeautifulSoup(html, 'html.parser')

    #경기 정보
    texts = soup.select('h3.box-title')

    play_info = pd.DataFrame()

    for i in texts:
        play_info_text = pd.Series(i.text)
        play_info = play_info.append(play_info_text, ignore_index=True)

    play_info.columns=['info']
    
    #첫째 줄은 필요 없어서 버림
    play_info = play_info[1:].reset_index(drop=True)
    


    #긁어 올 경기 링크 정보 : 공통적으로 opt=5로 끝난다
    links = soup.select("a[href$='opt=5']")

    link_info = pd.DataFrame()

    for a_tag in links:
        link_info_text = pd.Series(a_tag["href"])
        link_info = link_info.append(link_info_text, ignore_index=True)


    #경기가 없는 날짜도 datelist에 있을 수 있어 try, excpet 처리
    #경기 없는 날은 pass
    try:
        link_info.columns=['link']

        play_info['link'] = link_info['link']
        play_info['url'] = str('http://www.statiz.co.kr/') + play_info['link']
        
        def date_info(row):
                return row.split(' ')[0]
        
        play_info['date'] = play_info['info'].apply(date_info)
        
        play_info = play_info.filter(items=['url','date'])

        #취소된 경기는 링크가 없다. dropna로 버리자
        play_info = play_info.dropna(axis=0)

        df = pd.DataFrame()

        for i in play_info.index:
            play_url = play_info['url'][i]
            
            result_html = requests.get(play_url).text
            result_soup = BeautifulSoup(result_html, 'html.parser')

            play_by_play = result_soup.find_all("table", attrs={"class":"table table-striped"})[2] 
            html_table = parser.make2d(play_by_play)

            df1 = pd.DataFrame(html_table[1:], columns=html_table[0])  
            
            
            # 팀 정보
            team_texts = result_soup.select('h3.box-title')

            team_info = pd.DataFrame()

            for a in team_texts:
                team_text = pd.Series(a.text)
                team_info = team_info.append(team_text, ignore_index=True)

            team_info.columns=['info']
                
            team_info = team_info[1:3].reset_index(drop=True)
            team_info['info'] = team_info['info'].str.split(',').str[0]
            team_info = team_info.transpose().reset_index(drop=True)
            team_info.columns = ['away','home']

            df1['away'] = team_info['away'].values[0]
            df1['home'] = team_info['home'].values[0]            
            
            df = df.append(df1)
            df['date'] = play_info['date'][i]
            

        df_list = df_list.append(df)

    except: 
        pass



dataframe = pd.DataFrame(df_list)
dataframe.to_csv('play_by_play_record.csv', encoding="euc-kr")

print("종료")

sec = time.time()-start
times = str(datetime.timedelta(seconds=sec)).split(".")
times = times[0]
print(times)


```


```python
import pandas as pd
import numpy as np

df = pd.read_excel('2020.xlsx', sheet_name = 'play_by_play_record_2020')
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
      <th>이닝</th>
      <th>투수</th>
      <th>타순</th>
      <th>타자</th>
      <th>투구수</th>
      <th>볼카운트</th>
      <th>결과</th>
      <th>결과(대분류)</th>
      <th>이전 상황 아웃카운트</th>
      <th>이후 상황 아웃 카운트</th>
      <th>...</th>
      <th>이전 상황 점수차이</th>
      <th>이후 상황 스코어(어웨이)</th>
      <th>이후 상황 스코어(홈)</th>
      <th>이후 상황 점수차이</th>
      <th>LEV</th>
      <th>REs</th>
      <th>REa</th>
      <th>WPe</th>
      <th>WPa</th>
      <th>date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1초</td>
      <td>차우찬</td>
      <td>1.0</td>
      <td>박건우</td>
      <td>8.0</td>
      <td>2-3</td>
      <td>볼넷</td>
      <td>볼넷</td>
      <td>무사</td>
      <td>무사</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0.87</td>
      <td>0.555</td>
      <td>0.398</td>
      <td>0.465</td>
      <td>0.036</td>
      <td>2020-05-05</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1초</td>
      <td>차우찬</td>
      <td>2.0</td>
      <td>허경민</td>
      <td>6.0</td>
      <td>2-3</td>
      <td>좌익수 뜬공</td>
      <td>뜬공</td>
      <td>무사</td>
      <td>1사</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1.44</td>
      <td>0.953</td>
      <td>-0.380</td>
      <td>0.498</td>
      <td>-0.033</td>
      <td>2020-05-05</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1초</td>
      <td>차우찬</td>
      <td>3.0</td>
      <td>오재일</td>
      <td>5.0</td>
      <td>2-2</td>
      <td>오재일 : 삼진 아웃</td>
      <td>삼진</td>
      <td>1사</td>
      <td>2사</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1.15</td>
      <td>0.573</td>
      <td>-0.322</td>
      <td>0.526</td>
      <td>-0.028</td>
      <td>2020-05-05</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1초</td>
      <td>차우찬</td>
      <td>4.0</td>
      <td>김재환</td>
      <td>3.0</td>
      <td>2-0</td>
      <td>김재환 : 삼진 아웃</td>
      <td>삼진</td>
      <td>2사</td>
      <td>이닝종료</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0.79</td>
      <td>0.251</td>
      <td>-0.251</td>
      <td>0.548</td>
      <td>-0.022</td>
      <td>2020-05-05</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1말</td>
      <td>알칸타라</td>
      <td>1.0</td>
      <td>이천웅</td>
      <td>4.0</td>
      <td>2-1</td>
      <td>이천웅 : 삼진 아웃</td>
      <td>삼진</td>
      <td>무사</td>
      <td>1사</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0.87</td>
      <td>0.555</td>
      <td>-0.258</td>
      <td>0.526</td>
      <td>-0.022</td>
      <td>2020-05-05</td>
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
      <th>72198</th>
      <td>9말</td>
      <td>박진우</td>
      <td>2.0</td>
      <td>이진영</td>
      <td>5.0</td>
      <td>2-2</td>
      <td>이진영 : 삼진 아웃</td>
      <td>삼진</td>
      <td>무사</td>
      <td>1사</td>
      <td>...</td>
      <td>0</td>
      <td>3</td>
      <td>3</td>
      <td>0</td>
      <td>2.26</td>
      <td>0.555</td>
      <td>-0.258</td>
      <td>0.580</td>
      <td>-0.058</td>
      <td>2020-10-31</td>
    </tr>
    <tr>
      <th>72199</th>
      <td>9말</td>
      <td>박진우</td>
      <td>3.0</td>
      <td>유민상</td>
      <td>4.0</td>
      <td>0-3</td>
      <td>볼넷</td>
      <td>볼넷</td>
      <td>1사</td>
      <td>1사</td>
      <td>...</td>
      <td>0</td>
      <td>3</td>
      <td>3</td>
      <td>0</td>
      <td>1.80</td>
      <td>0.297</td>
      <td>0.276</td>
      <td>0.635</td>
      <td>0.055</td>
      <td>2020-10-31</td>
    </tr>
    <tr>
      <th>72200</th>
      <td>9말</td>
      <td>박진우</td>
      <td>4.0</td>
      <td>이우성</td>
      <td>5.0</td>
      <td>1-3</td>
      <td>볼넷</td>
      <td>볼넷</td>
      <td>1사</td>
      <td>1사</td>
      <td>...</td>
      <td>0</td>
      <td>3</td>
      <td>3</td>
      <td>0</td>
      <td>2.92</td>
      <td>0.573</td>
      <td>0.398</td>
      <td>0.708</td>
      <td>0.073</td>
      <td>2020-10-31</td>
    </tr>
    <tr>
      <th>72201</th>
      <td>9말</td>
      <td>박진우</td>
      <td>5.0</td>
      <td>한승택</td>
      <td>4.0</td>
      <td>1-2</td>
      <td>1루수 땅볼</td>
      <td>땅볼</td>
      <td>1사</td>
      <td>2사</td>
      <td>...</td>
      <td>0</td>
      <td>3</td>
      <td>3</td>
      <td>0</td>
      <td>4.30</td>
      <td>0.971</td>
      <td>-0.337</td>
      <td>0.635</td>
      <td>-0.073</td>
      <td>2020-10-31</td>
    </tr>
    <tr>
      <th>72202</th>
      <td>9말</td>
      <td>박진우</td>
      <td>6.0</td>
      <td>최정용</td>
      <td>3.0</td>
      <td>1-1</td>
      <td>유격수 내야안타</td>
      <td>안타</td>
      <td>2사</td>
      <td>2사</td>
      <td>...</td>
      <td>0</td>
      <td>3</td>
      <td>4</td>
      <td>1</td>
      <td>4.63</td>
      <td>0.634</td>
      <td>0.832</td>
      <td>1.000</td>
      <td>0.365</td>
      <td>2020-10-31</td>
    </tr>
  </tbody>
</table>
<p>72203 rows × 26 columns</p>
</div>




```python
df['이전상황 루상황'] = np.where(df.이전상황.str.contains('만루'),'만루', 
                         np.where(df.이전상황.str.contains('2,3루'),'2,3루',
                                 np.where(df.이전상황.str.contains('1,3루'),'1,3루',
                                         np.where(df.이전상황.str.contains('1,2루'),'1,2루',
                                                 np.where(df.이전상황.str.contains('3루'),'3루',
                                                         np.where(df.이전상황.str.contains('2루'),'2루',
                                                                 np.where(df.이전상황.str.contains('1루'),'1루','')))))))
```


```python
df['이후상황 루상황'] = np.where(df.이후상황.str.contains('만루'),'만루', 
                         np.where(df.이후상황.str.contains('2,3루'),'2,3루',
                                 np.where(df.이후상황.str.contains('1,3루'),'1,3루',
                                         np.where(df.이후상황.str.contains('1,2루'),'1,2루',
                                                 np.where(df.이후상황.str.contains('3루'),'3루',
                                                         np.where(df.이후상황.str.contains('2루'),'2루',
                                                                 np.where(df.이후상황.str.contains('1루'),'1루','')))))))
```


```python
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
      <th>이닝</th>
      <th>투수</th>
      <th>타순</th>
      <th>타자</th>
      <th>투구수</th>
      <th>볼카운트</th>
      <th>결과</th>
      <th>결과(대분류)</th>
      <th>이전 상황 아웃카운트</th>
      <th>이후 상황 아웃 카운트</th>
      <th>...</th>
      <th>이후 상황 스코어(홈)</th>
      <th>이후 상황 점수차이</th>
      <th>LEV</th>
      <th>REs</th>
      <th>REa</th>
      <th>WPe</th>
      <th>WPa</th>
      <th>date</th>
      <th>이전상황 루상황</th>
      <th>이후상황 루상황</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1초</td>
      <td>차우찬</td>
      <td>1.0</td>
      <td>박건우</td>
      <td>8.0</td>
      <td>2-3</td>
      <td>볼넷</td>
      <td>볼넷</td>
      <td>무사</td>
      <td>무사</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0.87</td>
      <td>0.555</td>
      <td>0.398</td>
      <td>0.465</td>
      <td>0.036</td>
      <td>2020-05-05</td>
      <td></td>
      <td>1루</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1초</td>
      <td>차우찬</td>
      <td>2.0</td>
      <td>허경민</td>
      <td>6.0</td>
      <td>2-3</td>
      <td>좌익수 뜬공</td>
      <td>뜬공</td>
      <td>무사</td>
      <td>1사</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>1.44</td>
      <td>0.953</td>
      <td>-0.380</td>
      <td>0.498</td>
      <td>-0.033</td>
      <td>2020-05-05</td>
      <td>1루</td>
      <td>1루</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1초</td>
      <td>차우찬</td>
      <td>3.0</td>
      <td>오재일</td>
      <td>5.0</td>
      <td>2-2</td>
      <td>오재일 : 삼진 아웃</td>
      <td>삼진</td>
      <td>1사</td>
      <td>2사</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>1.15</td>
      <td>0.573</td>
      <td>-0.322</td>
      <td>0.526</td>
      <td>-0.028</td>
      <td>2020-05-05</td>
      <td>1루</td>
      <td>1루</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1초</td>
      <td>차우찬</td>
      <td>4.0</td>
      <td>김재환</td>
      <td>3.0</td>
      <td>2-0</td>
      <td>김재환 : 삼진 아웃</td>
      <td>삼진</td>
      <td>2사</td>
      <td>이닝종료</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0.79</td>
      <td>0.251</td>
      <td>-0.251</td>
      <td>0.548</td>
      <td>-0.022</td>
      <td>2020-05-05</td>
      <td>1루</td>
      <td></td>
    </tr>
    <tr>
      <th>4</th>
      <td>1말</td>
      <td>알칸타라</td>
      <td>1.0</td>
      <td>이천웅</td>
      <td>4.0</td>
      <td>2-1</td>
      <td>이천웅 : 삼진 아웃</td>
      <td>삼진</td>
      <td>무사</td>
      <td>1사</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0.87</td>
      <td>0.555</td>
      <td>-0.258</td>
      <td>0.526</td>
      <td>-0.022</td>
      <td>2020-05-05</td>
      <td></td>
      <td></td>
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
      <th>72198</th>
      <td>9말</td>
      <td>박진우</td>
      <td>2.0</td>
      <td>이진영</td>
      <td>5.0</td>
      <td>2-2</td>
      <td>이진영 : 삼진 아웃</td>
      <td>삼진</td>
      <td>무사</td>
      <td>1사</td>
      <td>...</td>
      <td>3</td>
      <td>0</td>
      <td>2.26</td>
      <td>0.555</td>
      <td>-0.258</td>
      <td>0.580</td>
      <td>-0.058</td>
      <td>2020-10-31</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>72199</th>
      <td>9말</td>
      <td>박진우</td>
      <td>3.0</td>
      <td>유민상</td>
      <td>4.0</td>
      <td>0-3</td>
      <td>볼넷</td>
      <td>볼넷</td>
      <td>1사</td>
      <td>1사</td>
      <td>...</td>
      <td>3</td>
      <td>0</td>
      <td>1.80</td>
      <td>0.297</td>
      <td>0.276</td>
      <td>0.635</td>
      <td>0.055</td>
      <td>2020-10-31</td>
      <td></td>
      <td>1루</td>
    </tr>
    <tr>
      <th>72200</th>
      <td>9말</td>
      <td>박진우</td>
      <td>4.0</td>
      <td>이우성</td>
      <td>5.0</td>
      <td>1-3</td>
      <td>볼넷</td>
      <td>볼넷</td>
      <td>1사</td>
      <td>1사</td>
      <td>...</td>
      <td>3</td>
      <td>0</td>
      <td>2.92</td>
      <td>0.573</td>
      <td>0.398</td>
      <td>0.708</td>
      <td>0.073</td>
      <td>2020-10-31</td>
      <td>1루</td>
      <td>1,2루</td>
    </tr>
    <tr>
      <th>72201</th>
      <td>9말</td>
      <td>박진우</td>
      <td>5.0</td>
      <td>한승택</td>
      <td>4.0</td>
      <td>1-2</td>
      <td>1루수 땅볼</td>
      <td>땅볼</td>
      <td>1사</td>
      <td>2사</td>
      <td>...</td>
      <td>3</td>
      <td>0</td>
      <td>4.30</td>
      <td>0.971</td>
      <td>-0.337</td>
      <td>0.635</td>
      <td>-0.073</td>
      <td>2020-10-31</td>
      <td>1,2루</td>
      <td>2,3루</td>
    </tr>
    <tr>
      <th>72202</th>
      <td>9말</td>
      <td>박진우</td>
      <td>6.0</td>
      <td>최정용</td>
      <td>3.0</td>
      <td>1-1</td>
      <td>유격수 내야안타</td>
      <td>안타</td>
      <td>2사</td>
      <td>2사</td>
      <td>...</td>
      <td>4</td>
      <td>1</td>
      <td>4.63</td>
      <td>0.634</td>
      <td>0.832</td>
      <td>1.000</td>
      <td>0.365</td>
      <td>2020-10-31</td>
      <td>2,3루</td>
      <td>1,2루</td>
    </tr>
  </tbody>
</table>
<p>72203 rows × 28 columns</p>
</div>




```python
dataframe = pd.DataFrame(df)
dataframe.to_csv('2020.txt', header=True,index=False,encoding="euc-kr")
```
