
---
layout: single
title:  "유튜브 크롤링"
categories: Selenium
tag: [python,crawling,blog,github,유튜브,크롤링,파이썬,입문,기초]
toc: true
sidebar:
    nav: "docs"
---

## 튜브둥둥

### 유튭을 더 재밌게 -> 튜브둥둥  
1. 원하는 키워드를 입력하면, 
2. 영상제목, 조회수, url을 추출한 뒤 파일로 저장하고 시각화  
    -> 조회수 많은 순으로 정렬하여 키워드 관련 핫한 영상을 한눈에 볼 수 있음.  
3. 영상 제목의 키워드를 count하여 시각화  
    -> 트렌드 파악, 마케팅 등 의사결정 정보로 활용 


```python
import sys 
import os 
import time   
import warnings
warnings.filterwarnings('ignore') 

import chromedriver_autoinstaller  
import pandas as pd 
import numpy as np 
from selenium import webdriver
```

### 1. 자료추출


```python
# user = input("어떤 제품을 검색할래요? ")
user = "먹방"
```


```python
path = chromedriver_autoinstaller.install()
driver = webdriver.Chrome(path)
driver.get("https://www.youtube.com/results?search_query={}".format(user))
time.sleep(2)
```


```python
# 스크롤 내리기
def scroll_down(driver):
    driver.execute_script("window.scrollTo(0, 1431049)")
    
n = 30 # 숫자가 클수록 데이터 많이 가져옴
i = 0
while i < n: # 이 조건이 만족되는 동안 반복 실행
    scroll_down(driver) # 스크롤 다운
    i = i+1
    time.sleep(0.2)
```


```python
# aria-label 있는 a태그 id 자료 가져오기

a_id = "#video-title"
raws = driver.find_elements_by_css_selector(a_id)
len(raws)
```




    203




```python
# 1번 for문 - raw_data

aria_list = []  # list
url_list = []

for raw in raws: 
    aria = raw.get_attribute('aria-label')
    aria_list.append(aria)
    
for u in raws:
    url = u.get_attribute('href')
    url_list.append(url)

print(len(aria_list), len(url_list))
```

    203 203
    

### 2. 데이터정제 및 분류


```python
# none값 제거  (리스트 타입 영상엔 aria-label 속성이 없음)

dt = list(filter(None,aria_list))
url_list = list(filter(None, url_list))

print(len(dt), len(url_list))
```

    203 203
    


```python
dt[0]
```




    '[ENG]사장님 "어머 유튜버 OO보다 많이 먹었어!!" 가뿐하게 부산가서 신기록 세우고 왔습니다..^^ 떡볶이꼬치 최대 몇개까지 먹어봤니? 게시자: 웅이woongei 2시간 전 13분 24초 조회수 76,269회'




```python
# 2번 for문 - aria_list 데이터 분류

title_list = []     # 영상제목
view_cnt_list =[]   # 조회수

for i in range(0, len(dt)):
    content = dt[i].split(' 게시자: ') 
    title = content[0]  
    title_list.append(title)
    
    t_remain = content[1].split(' ')
    view_cnt = t_remain[-1]
    view_cnt = view_cnt.replace('회','')  # '회'글자 제거
    view_cnt = view_cnt.replace(',','')   # 중간 ',' 제거
    view_cnt = view_cnt.replace('없음','0')
    # view_cnt = re.findall('/d+',view_cnt)
        # 정규표현식은 리스트형태로 저장돼서 int로 변환 안됨.
    view_cnt_list.append(int(view_cnt))   # int로 변경  

time.sleep(1)
```


```python
print(len(title_list), len(view_cnt_list), len(url_list))
```

    203 203 203
    

### 3. DF 정렬 및 파일저장


```python
# 데이터프레임 만들기
df = pd.DataFrame({'title':title_list, 'view_cnt':view_cnt_list, 'url':url_list})

# 조회수 높은 순으로 정렬
df = df.sort_values('view_cnt',ascending=False)
df = df.reset_index(drop=True) # 인덱스 리셋

df.head(2)
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
      <th>view_cnt</th>
      <th>url</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>ASMR CARBO Fire NOODLES 까르보 불닭볶음면 먹방 *꾸덕꾸덕*</td>
      <td>11314837</td>
      <td>https://www.youtube.com/watch?v=WZrsASo5yPM</td>
    </tr>
    <tr>
      <th>1</th>
      <td>[전참시] 먹방계 레전드 찍은 천뚱🍚 전참시 먹방 1시간 14분 모음.zip ㅣ#천...</td>
      <td>8857687</td>
      <td>https://www.youtube.com/watch?v=y63-_gkH_WA</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.to_csv("tube_dungdung({}).csv".format(user), encoding='utf-8-sig')
```

### 4. 둥둥 시각화


```python
## 라이브러리 import

from konlpy.tag import Okt # 형태소분석기 : Openkoreatext
from collections import Counter # 빈도 수 세기
from wordcloud import WordCloud # wordcloud 만들기

import matplotlib.pyplot as plt # 시각화
import matplotlib as mpl
from matplotlib import font_manager as fm # font 설정
import nltk # natural language toolkit : 자연어 처리
```


```python
# 한글폰트 설정 
mpl.rcParams['font.family'] = 'Malgun Gothic'
mpl.rcParams['font.size'] = 15
mpl.rcParams['axes.unicode_minus'] = False    # 마이너스 깨짐 방지
```


```python
# 맛집영상 조회수 상위 10개 가져오기
dung = pd.read_csv('./tube_dungdung(맛집).csv')
dung = dung.drop(['Unnamed: 0'], axis=1) # 불필요한 unnamed 삭제
dung = dung.head(10)
```


```python
# 먹방영상 조회수 상위 10개 가져오기
dung2 = pd.read_csv('./tube_dungdung(먹방).csv')
dung2 = dung2.drop(['Unnamed: 0'], axis=1) # 불필요한 unnamed 삭제
dung2 = dung2.head(10)
```


```python
x = range(1,11)
y1 = dung['view_cnt'].cumsum()
y2 = dung2['view_cnt'].cumsum()
```


```python
plt.plot(x, y2, marker = '*', label='먹방', color='r')
plt.plot(x, y1, marker = 'o', label='맛집')
plt.xlabel('영상수', color='g', loc='right')
plt.ylabel('조회수', color='g', loc='top')
plt.title('< ' + '누적 조회수 ' + '>')

plt.legend(loc=(0.7, 0.5));
    # 두개 키워드 상위 10개의 누적조회수 비교 
    # 먹방(6억) vs 맛집(3억)
```


    
![png](output_22_0.png)
    



```python

```

### @ for문 쪼개 보기


```python
dt[1]
```




    '24시간동안 200% VS 50%!! 두 배면 무조건 행복할까?! 게시자: 파뿌리 2시간 전 25분 조회수 135,477회'




```python
content = dt[0].split(' 게시자: ')
title = content[0]
title
```




    '[ENG]사장님 "어머 유튜버 OO보다 많이 먹었어!!" 가뿐하게 부산가서 신기록 세우고 왔습니다..^^ 떡볶이꼬치 최대 몇개까지 먹어봤니?'




```python
t_remain = content[1].split(' ')
t_remain
```




    ['웅이woongei', '2시간', '전', '13분', '24초', '조회수', '76,269회']




```python
view_cnt = t_remain[-1] # 마지막인덱스
view_cnt = view_cnt.replace('회','')   # '회'글자 제거
view_cnt = view_cnt.replace(',','')    # 중간 ',' 제거
print(view_cnt, type(int(view_cnt)))  # 리스트에 추가할 땐 int로 추가할 것임 
```

    76269 <class 'int'>
    
