---
layout: single
title:  "Crawling!"
---



```python
import time
import requests
from bs4 import BeautifulSoup
```


```python
page = requests.get("https://sponbbang.com/bj/")
```


```python
rating_page = page.text
```


```python
soup = BeautifulSoup(rating_page, 'html.parser')
```


```python
li_tags = soup.select('.double_right')
```


```python
title = []
```


```python
for li in li_tags:
    title.append(li.text)
```


```python
title[5:]
```




    ['이영호 T',
     '유영진 T',
     '박상현 Z',
     '김택용 P',
     '김민철 Z',
     '도재욱 P',
     '김지성 T',
     '이재호 T',
     '변현제 P',
     '조일장 Z',
     '김명운 Z',
     '장윤철 P',
     '임홍규 Z',
     '최호선 T',
     '김성대 Z',
     '조기석 T',
     '송병구 P',
     '정영재 T',
     '윤용태 P',
     '영호토스 P',
     '샤이니 T',
     '호그 Z',
     '임진묵 T',
     '이영한 Z',
     '박준오 Z',
     '황병영 T',
     '김정우 Z',
     '유진우 Z',
     '김윤중 P',
     '김상수 T',
     '만두소희 T',
     '유승곤 T',
     '이영웅 T',
     '이예훈 Z',
     '마쏠 Z',
     '김태영 T',
     '윤찬희 T',
     '홍덕 P',
     '초난강 T',
     '윤호준 P',
     '스마일 T',
     '뚠두부 P',
     '다크효 P',
     '윤수철 P',
     '정민기 T',
     '한두열 Z',
     '김범수 P',
     '서지수 T',
     '노준규 T',
     '김은호 P',
     '신상문 T',
     '김채운 P',
     '남멀티 T',
     '서문지훈 Z',
     '이광용 P',
     '김대한 Z',
     '채린쟝 Z',
     '배병우 Z',
     '박재혁 Z',
     '김준혁 Z',
     '김경모 Z',
     '김봉실 P',
     '최영현 P',
     '윤준석 P',
     '원선재 P',
     '휘경 Z',
     '권혁진 P',
     '원지훈 P',
     '박정일 T',
     '노지호 P',
     '김병수 Z',
     '배성흠 Z',
     '오진식 Z',
     '전제민 P']


