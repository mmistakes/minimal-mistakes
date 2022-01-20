---
layout: single
title:  "Book_bestseller_Crawling"
categories: Crawling
tag: [python,crawling,blog,github,책정보, 교보문고, 크롤링,파이썬,입문,기초]
toc: true
sidebar:
    nav: "docs"
---

## 교보문고 크롤링

```python
import sys
import os
import time
import warnings
warnings.filterwarnings('ignore')

import pandas as pd
import numpy as np
from tqdm import tqdm_notebook
import chromedriver_autoinstaller

from bs4 import BeautifulSoup
from selenium import webdriver
```


```python
path = chromedriver_autoinstaller.install()
driver = webdriver.Chrome(path)
driver.get("http://www.kyobobook.co.kr/")
time.sleep(2)
```


```python
# driver.find_element_by_css_selector("ul.gnb_sub > li:nth-child(1) > a").click()
driver.find_element_by_link_text("베스트").click()
time.sleep(1)
```


```python
title_list = []
info_list = []
price_list = []
```


```python
for i in tqdm_notebook(range(2, 11)):
    # 예외발생하면 멈추기 위해 try, except 활용
    try:
        articles = "div.detail > div.title > a" # title의 위치
        article_raw = driver.find_elements_by_css_selector(articles)
            # 한페이지의 title 정보를 가진 article_raw 데이터 추출

        for article in article_raw:
            title = article.text         # article.text로 제목 하나 가져오기
            title_list.append(title)     # title_list에 더해주기

        authors = "div.detail > div.author" # author 위치
        authors_raw = driver.find_elements_by_css_selector(authors)

        for author in authors_raw:
            auth = author.text
            info_list.append(auth)

        price_lo = "div.detail > div.price > strong" # price 위치
        price_raw = driver.find_elements_by_css_selector(price_lo)

        for price in price_raw:
            pri = price.text
            price_list.append(pri)

        print(i-1, title)
        time.sleep(1)

        # 다음 페이지로 넘어가기
        driver.find_element_by_link_text(str(i)).click( )

    except:
        break
```


```python
# 각 list 들이 잘 생성됐는지, 길이는 같은지 확인
print(len(title_list), len(info_list), len(price_list))
```


```python
# 3개 열을 가진 pandas DataFrame으로 바꿔준 뒤 엑셀 파일로 저장
df = pd.DataFrame({'title':title_list, 'info':info_list, 'price':price_list})
df.to_excel("best_books.xlsx", encoding='utf-8-sig')
```
