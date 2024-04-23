---
title: "구글 검색 이미지 크롤링"
categories:
  - coding
# - Non-coding

tags:
  - 조코딩
  - Do it! 조코딩의 프로그래밍 입문
  - 이미지 크롤링
  - Python
  - 셀레니움
  - selenium
  - 에러 해결
  - coding
 

last_modified_at: 2024-04-23T23:00:50-23:59
---

### Backgound
'Do it! 조코딩의 프로그래밍 입문' 책의 chapter 11에서의 
구글 이미지 다운로드 자동화관련 파이썬 코드가 실행이 되지 않았음

책과 연관된 [조코딩 유튜브](ttps://youtu.be/1b7pXC1-IbE?si=oMNhLoPG_G0aTtd3)에서 
별도로 제공한 코드들과 영상들을 보며 따라했으나 역시 실행되지 않았음

원인들은 페이지 로딩시간, 라이브러리(selenium)의 업데이트 그리고 구글의 자동화 방지 기능 등이 였으며, 수정한 코드를 공유하고자 함

### 참고사항

책의 chapter 11에서의 코드가 아니라, 조코딩 유튜브의 '파이썬 셀레니움 이미지 크롤링으로 배우는 업무 자동화의 기초'에서 나오는 코드를 수정한 것

[![파이썬 셀레니움 이미지 크롤링으로 배우는 업무 자동화의 기초](http://img.youtube.com/vi/1b7pXC1-IbE/0.jpg)](https://www.youtube.com/watch?v=1b7pXC1-IbE) 

### 코드 개요

1. google 창에 elem.send_keys를 통해 검색키워드(여기서는 조코딩)를 넣기
2. 구글의 키워드 검색 결과 페이지를 끝까지 스크롤 다운하기
3. 작은 이미지들을 클릭하며, 큰 이미지들을 모두 다운 받기

### 에러 수정 사항
1. selenium 최신 버전은 크롬 드라이버 없이, 'driver.find_element' 함수 등 사용 가능

    다만, from selenium.webdriver.common.by import By 등 필요

2. 페이지 로딩 시간과 클릭 시간을 랜덤으로 지정하여, 로봇이 아니라 사람이 조작하는 것처럼 함 

    (참고) https://youtu.be/FsVwtilhmyg?si=CUeLPE99DVGIOMeA 


```python

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import urllib.request

import random

random_sec = random.uniform(3,5)

driver = webdriver.Chrome()
driver.get("https://www.google.co.kr/imghp?hl=ko&tab=wi&authuser=0&ogbl")
elem = driver.find_element(By.CLASS_NAME, 'gLFyf')
elem.send_keys("조코딩")
elem.send_keys(Keys.RETURN)

SCROLL_PAUSE_TIME = random_sec
# Get scroll height
last_height = driver.execute_script("return document.body.scrollHeight")
while True:
    # Scroll down to bottom
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    # Wait to load page
    time.sleep(SCROLL_PAUSE_TIME)
    # Calculate new scroll height and compare with last scroll height
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        try:
            driver.find_element(By.CSS_SELECTOR, '.FAGjZe').click()
        except:
            break
    last_height = new_height

time.sleep(random_sec)

images = driver.find_elements(By.CLASS_NAME, "rg_i.Q4LuWd")
print(images)
count = 1
for image in images:
    try:
        image.click()
        time.sleep(random_sec)
        print(count)
        imgUrl = driver.find_element(By.CLASS_NAME, "sFlh5c.pT0Scc.iPVvYb").get_attribute("src")
        opener=urllib.request.build_opener()
        opener.addheaders=[('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
        urllib.request.install_opener(opener)
        urllib.request.urlretrieve(imgUrl, str(count) + ".jpg")
        count = count + 1
    except:
        pass


driver.close()
```