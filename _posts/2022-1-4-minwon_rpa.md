---
layout: single
title: "정부민원 RPA"
categories: Python
tag: [python, crawling, blog, github, 정부24, 가족관계, 민원서류, RPA, 파이썬]
toc: true
sidebar:
  nav: "docs"
---

# 민원easy

```
1. 은행 대출 할 때, 필요서류는 보통 5 ~ 10 종류 입니다.   
   인터넷으로 발급하려해도 관할이 달라 여러 사이트를 방문해야 합니다.
2. 어느 사이트에서 발급하는지 찾는 것도 어렵지만, 찾더라도  
   각기 다른 보안&출력 프로그램을 설치해야해 오류도 잦습니다.
3. 동 행정복지센터에서 여러 기관 시스템에 접속할 수 있어   
   대부분의 서류가 발급 가능하지만 평일 일과시간 직접 방문해야하고,   
   오랫동안 기다려야 하기도 많습니다.  
4. 하나의 웹 페이지에 자주 쓰이는 서류들을 표시하고 클릭했을 때,  
   서류 발급까지 연결해주면 어떨까? 하며 구현 중인 서비스 입니다.
```


```python
# 모듈 import

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

### 1. 정부24 (등본)

- child(i) i만 바꾸면 다른 서비스 연결

```python
# 자동로그인
    # 접속자의 id와 pw을 넣어주세요

my_id = " "
my_pw = " "
```

```python
# 정부24 페이지 진입
path = chromedriver_autoinstaller.install()
driver = webdriver.Chrome(path)
driver.get("https://www.gov.kr/")
time.sleep(2)

# 첫화면 -> 로그인 -> 아이디
driver.find_element_by_link_text("로그인").click( )
time.sleep(2)
driver.find_element_by_link_text("아이디").click( )

idform = driver.find_element_by_id("userId")
pwform = driver.find_element_by_id("pwd")

idform.send_keys(my_id)
pwform.send_keys(my_pw)

driver.find_element_by_id("genLogin").click()
time.sleep(1)

# 건축물대장 클릭

driver.find_element_by_css_selector('li.item.swiper-slide1.swiper-slide.swiper-slide-active > div > a:nth-child(1)').click()

# 발급버튼 클릭
driver.find_element_by_id("applyBtn").click()
```

### 2. 법원 가족관계 - 가족관계증명

- child(i) i만 바꾸면 다른 서비스 연결

```python
# 가족관계 페이지 진입
path = chromedriver_autoinstaller.install()
driver = webdriver.Chrome(path)
driver.get("https://efamily.scourt.go.kr/")
time.sleep(2)

# 가족관계 증명서 클릭
driver.find_element_by_css_selector('ul.innerContent > li:nth-child(1)').click()
```

### 3. 홈택스 - 연말정산

```python
path = chromedriver_autoinstaller.install()
driver = webdriver.Chrome(path)
driver.get("https://www.hometax.go.kr/")
time.sleep(2)
```
