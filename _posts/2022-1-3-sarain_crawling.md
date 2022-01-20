---
layout: single
title: "Job_Info_Crawling"
categories: Crawling
tag:
  [python, crawling, blog, github, 채용정보, 사람인, 크롤링, 파이썬, 입문, 기초]
toc: true
sidebar:
  nav: "docs"
---

## 사람인 크롤링

```python
import time
import warnings
warnings.filterwarnings('ignore')
    # 경고무시

import pandas as pd
import numpy as np
from tqdm import tqdm_notebook
import chromedriver_autoinstaller

from bs4 import BeautifulSoup
from selenium import webdriver
```

```python
search = "데이터 분석 파이썬"
```

```python
# 사람인 페이지 진입
path = chromedriver_autoinstaller.install( )
driver = webdriver.Chrome(path)
driver.get("http://www.saramin.co.kr")
time.sleep(2)
```

```python
# 검색창 클릭
driver.find_element_by_css_selector(".btn_search").click( )
time.sleep(2)
```

```python
# 검색버튼 한번 더 접근 후 검색 시작
element = driver.find_element_by_id("ipt_keyword_recruit")
element.send_keys(search)
driver.find_element_by_id("btn_search_recruit").click( )
time.sleep(2)
```

```python
# 채용정보 더보기 클릭
    # 검색 수가 적어 채용정보가 없는 경우도 있으니 except로 pass
try:
    driver.find_element_by_css_selector(".view_more.track_event").click( )
    time.sleep(2)
    # 채용더보기하면 2페이로 가서, 1페이지로 이동
    # 채용광고가 있는 경우 그곳에 있는 1페이지를 클릭해 xpath로 특정함
    driver.find_element_by_xpath("//*[@id='recruit_info_list']/div[2]/div/a[1]").click( )
except:
    pass
```

```python
# 반복횟수 정하기 (1페이지에  40개니까 320개 정도 추출)
repeat = 8
```

```python
# 빈리스트 만들기
title_list = []
condition_list = []
url_list = []
```

```python
for i in tqdm_notebook(range(2, repeat+2)):

    try:
        articles = "div.area_job > h2 > a" # url과 css정보를 담고 있는 a tag 특정
        article_raw = driver.find_elements_by_css_selector(articles)

        # for문을 통해 한페이지(40개)의 title과 url의 정보를 하나씩 추출해서 리스트로 저장
        for article in article_raw:
            title = article.get_attribute('title')
            title_list.append(title)
            url = article.get_attribute('href')
            url_list.append(url)
        time.sleep(1)

        infos = "div.area_job > div.job_condition" # condition정보를 담고 있는 div 클래스 특정
        infos_raw = driver.find_elements_by_css_selector(infos)

        # for문을 통해 condition 정보를 하나씩 추출
        for info in infos_raw:
            condition = info.text
            condition = condition.replace("\n","/")
            condition_list.append(condition)
        time.sleep(1)

        print(i-1, title)

        ## 10페이지 이후엔 "다음"버튼을 눌려야하므로 if문 활용
        if i % 10 == 1:
            driver.find_element_by_link_text("다음").click( )
        else:
            driver.find_element_by_link_text(str(i)).click( )
        time.sleep(1)

    except:
        break
```

```python
print(len(title_list), len(url_list), len(condition_list))
    # 리스트 길이가 같아야 엑셀로 변환 가능하니 한번 확인
```

```python
df = pd.DataFrame({'title':title_list, 'condition':condition_list, 'url':url_list})
df.to_excel("recuriut({}).xlsx".format(search), encoding='utf-8-sig')
```
