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
3. 동 행정복지센터에선 여러 기관 시스템에 접속할 수 있어    
   대부분의 서류가 한번에 서류가 발급 가능하지만   
   평일 일과시간 직접 방문해야하고 오랫동안 기다려야 합니다.  

💡 하나의 웹 페이지에 자주 쓰이는 서류들을 표시하고 클릭했을 때,  
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

### 1. 정부24 (주민등록, 지방세)

- child(i) i만 바꾸면 다른 서비스 연결

```python
# 자동로그인 구현 
    # 접속자의 id와 pw을 넣어주세요

my_id = " "
my_pw = " "
```

![Untitled](https://user-images.githubusercontent.com/67591105/154850924-29179f26-0d71-4584-97ac-042a8632f3b5.png)

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

# 등본 클릭

driver.find_element_by_css_selector('li.item.swiper-slide1.swiper-slide.swiper-slide-active > div > a:nth-child(1)').click()

# 발급버튼 클릭
driver.find_element_by_id("applyBtn").click()
```

![image-20220221001131996](https://user-images.githubusercontent.com/67591105/154850739-893ba7bc-0d79-478e-8d0e-e5fd1a2ae68b.png)

### 2. 법원 (가족관계 관련)

- 여기도 child(i) i만 바꾸면 다른 서비스 연결 


```python
# 가족관계 페이지 진입
path = chromedriver_autoinstaller.install()
driver = webdriver.Chrome(path)
driver.get("https://efamily.scourt.go.kr/")
time.sleep(2)

# 가족관계 증명서 클릭
driver.find_element_by_css_selector('ul.innerContent > li:nth-child(1)').click()
```

![image-20220221001323477](https://user-images.githubusercontent.com/67591105/154850797-53fd1190-d425-4c93-a18a-3c248305169f.png)

### 3. 홈택스 (국세 관련 )

- 여기도 child 안의 숫자 바꿔주면 됨

```python
path = chromedriver_autoinstaller.install()
driver = webdriver.Chrome(path)
driver.get("https://www.hometax.go.kr/")
time.sleep(2)
driver.find_element_by_link_text("로그인").click( )
time.sleep(2)
driver.find_element_by_link_text("아이디 로그인").click( )

idform = driver.find_element_by_id("iptUserId")
pwform = driver.find_element_by_id("iptUserPw")

idform.send_keys(my_id)
pwform.send_keys(my_pw)

time.sleep(2)

# 로그인하면 child(1)은 My홈택스로 바뀌니 child(2)로 지정
driver.find_element_by_css_selector('#group8861269 > li:nth-child(2)').click()
```

![image-20220221002526378 - 복사본](https://user-images.githubusercontent.com/67591105/154850825-c0baf860-e59c-4d26-9e09-7b3f9e3ce29e.png)

```
가장 자주 찾을만한 3개 사이트를 연결하며 살짝 구현해보았습니다.  
하나의 사이트에서 대부분의 서류발급 페이지 연결됐으면 합니다.
그리고 사람들이 자주하는 업무(대출, 부동산 등기 등)을 기준으로  
필요한 서류들이 안내되고 한 눈에 정리되면 어떨까? 생각해봅니다. 
```

