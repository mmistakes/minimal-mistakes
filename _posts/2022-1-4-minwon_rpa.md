---
layout: single
title: "정부민원 RPA"
categories: python
tag: [python, crawling, blog, github, 정부24, 가족관계, 민원서류, RPA, 파이썬]
toc: true
sidebar:
  nav: "docs"
---

# 민원easy

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
