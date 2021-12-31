---
layout: single
title:  "인스타 크롤링 "
---

## 인스타 크롤러

- 인스타 : 이미지 분석 크롤링 실습 적합  
- 인스타는 좀 더 상위 클래스로 해야 에러가 덜남 (for문)   
  (그래도 에러는 나니까 try - except로 예외처리 해줘야함)
- 검색 후 첫번째 사진 클릭만 하고 나머지는 다음 버튼을 누르며 크롤링 가능
- 엑셀, CSV에서 자동 줄바꿈하면보기 편하게 바뀜
    - div._2dDPU.CkGkG .c-Yi7 > time에서 ">" 자식은 바로 밑에 
        - DPU.CkGkG
    - (공백) 자손선택자 (자손은 밑에 어딘가에 있는)
- 모듈 re (정규표현식)
- 요소 하나는 element vs 여러 요소는 elements

- 코드정리  
    - element.clear()  # 검색창에 존재하는 텍스트 제거  



```python
import pandas as pd
import numpy as np

# 라이브러리 import
# 라이브러리 : 필요한 도구
from selenium import webdriver  # 라이브러리(모듈) 가져오라
from selenium.webdriver import ActionChains as AC
from tqdm import tqdm
from tqdm import tqdm_notebook
import re
from time import sleep
import time

# 워닝 무시
import warnings
warnings.filterwarnings('ignore')
```

### 먼저 쪼개서 보기


```python
# 데이터 수집할 키워드 지정
keyword = "카페"
keyword
```


```python
# 크롬창 띄우기
import chromedriver_autoinstaller
chrome_path = chromedriver_autoinstaller.install()
driver = webdriver.Chrome(chrome_path)

driver.get("https://www.instagram.com/")
time.sleep(3)
```
수동 로그인 + 수동 로그인

```python
# 검색창에 커서 클릭
element = driver.find_element_by_css_selector(".TqC_a") 
element.click()
time.sleep(1)
```


```python
# 검색 창에 검색어 입력
element = driver.find_element_by_css_selector(".XTCL.d_djL.DljaH")
element.clear()  # 혹시 검색창에 존재하는 텍스트 제거
element.send_keys(keyword)
time.sleep(2)
```


```python
# 검색어 리스트 중 첫번째 검색어 클릭
query_list = driver.find_elements_by_css_selector(".-qQT3")
query_list[0].click()
time.sleep(3)
```


```python
# 첫번째 사진 클릭
CSS_tran="div.Nnq7C.weEfm .eLAPa"                         
driver.find_element_by_css_selector(CSS_tran).click()   # 사진 클릭
time.sleep(1)
```


```python
# 사진(pic) 크롤링
overlays1 = "div._2dDPU.CkGkG .FFVAD"   # 사진창 속 사진  
    # (공백) 결합자는 첫 번째 요소의 자손인 노드를 선택
img = driver.find_element_by_css_selector(overlays1)    # 사진 선택
pic = img.get_attribute('src')                          # 사진 url 크롤링 완료
pic
```


```python
# 날짜(date) 크롤링
overlays2 = "div._2dDPU.CkGkG .c-Yi7 > time"                  # 날짜 지정
datum2 = driver.find_element_by_css_selector(overlays2)     # 날짜 선택
datum2.get_attribute('title')
```


```python
# 좋아요(like) 크롤링
overlays3 = ".Nm9Fw"                                        # 리뷰창 속 날짜
datum3 = driver.find_element_by_css_selector(overlays3)     # 리뷰 선택
like = datum3.text                                          # 좋아요 크롤링 완료
like
```


```python
# 해시태그(tag) 크롤링
overlays4 = ".xil3i"                                         
datum3 = driver.find_elements_by_css_selector(overlays4)    # 태그 선택

tag_list = []
for i in range(len(datum3)):
    tag_list.append(datum3[i].text)
tag_list
```


```python
# 다음장 클릭
CSS_tran2="body > div._2dDPU.QPGbb.CkGkG > div.EfHg9 > div > div > div.l8mY4.feth3 > button"             # 다음 버튼 정의
tran_button2 = driver.find_element_by_css_selector(CSS_tran2)  # 다음 버튼 find
AC(driver).move_to_element(tran_button2).click().perform()     # 다음 버튼 클릭
```


```python

```

### for문으로 인스타그램 크롤링 시작!


```python
# 데이터 수집할 키워드 지정
keyword = "겨울원피스"
len_insta = 20
```


```python
# 크롬창 띄우기
chrome_path = chromedriver_autoinstaller.install()
driver = webdriver.Chrome(chrome_path)

driver.get("https://www.instagram.com/")
time.sleep(3)
```
수동 로그인
알림 설정 : "나중에 하기" 클릭

```python
# 검색창에 커서 클릭
element = driver.find_element_by_css_selector(".TqC_a")
element.click()
time.sleep(1)

# 검색 창에 검색어 입력
element = driver.find_element_by_css_selector(".XTCLo.Ju1dg.x3qfX")
element.clear()  # 혹시 검색창에 존재하는 텍스트 제거
element.send_keys(keyword)
time.sleep(2)

# 검색어 리스트 중 첫번째 검색어 클릭
query_list = driver.find_elements_by_css_selector(".-qQT3")
query_list[0].click()
time.sleep(3)
```


```python
dict = {}

# 첫번째 사진 클릭
CSS_tran="div.Nnq7C.weEfm .eLAPa"                         
driver.find_element_by_css_selector(CSS_tran).click()   # 사진 클릭
time.sleep(2)

# 크롤링 시작
for j in tqdm_notebook(range(0, len_insta)):    

    target_info = {}                                            # 사진별 데이터를 담을 딕셔너리 생성

    try:    # 크롤링을 시도해라.
        # 사진(pic) 크롤링
        overlays1 = "div._2dDPU.CkGkG .FFVAD"                   # 사진창 속 사진   
        img = driver.find_element_by_css_selector(overlays1)    # 사진 선택
        pic = img.get_attribute('src')                          # 사진 url 크롤링 완료
        target_info['picture'] = pic
        
    

        # 날짜(date) 크롤링
        overlays2 = "div._2dDPU.CkGkG .c-Yi7 > time"                # 날짜 지정
        datum2 = driver.find_element_by_css_selector(overlays2)     # 날짜 선택
        date = datum2.get_attribute('title')
        target_info['date'] = date

        # 좋아요(like) 크롤링
        overlays3 = ".Nm9Fw"                                        # 리뷰창 속 날짜
        datum3 = driver.find_element_by_css_selector(overlays3)     # 리뷰 선택
        like = datum3.text                                          # 좋아요 크롤링 완료
        target_info['like'] = like

        # 해시태그(tag) 크롤링
        overlays4 = ".xil3i"                                         
        datum3 = driver.find_elements_by_css_selector(overlays4)    # 태그 선택
        tag_list = []
        for i in range(len(datum3)):
            tag_list.append(datum3[i].text)
        target_info['tag'] = tag_list

        dict[j] = target_info            # 토탈 딕셔너리로 만들기

        print(j, tag_list)

        # 다음장 클릭
        CSS_tran2="body > div._2dDPU.QPGbb.CkGkG > div.EfHg9 > div > div > div.l8mY4.feth3 > button"             # 다음 버튼 정의
        tran_button2 = driver.find_element_by_css_selector(CSS_tran2)  # 다음 버튼 find
        AC(driver).move_to_element(tran_button2).click().perform()     # 다음 버튼 클릭
        time.sleep(3)

    except:  # 에러가 나면 다음장을 클릭해라
        # 다음장 클릭
        CSS_tran2="body > div._2dDPU.QPGbb.CkGkG > div.EfHg9 > div > div > div.l8mY4.feth3 > button"             # 다음 버튼 정의
        tran_button2 = driver.find_element_by_css_selector(CSS_tran2)  # 다음 버튼 find
        AC(driver).move_to_element(tran_button2).click().perform()     # 다음 버튼 클릭

        time.sleep(3)

print(dict)
```


```python
# 판다스로 만들기 : 엑셀(테이블) 형식으로 만들기
import pandas as pd
result_df = pd.DataFrame.from_dict(dict, 'index')

print(result_df.shape)
result_df
```


```python
# n = result_df['picture'].count()

# csv 파일로 저장
result_df.to_csv("insta({}).csv".format(keyword), encoding='utf-8-sig')
```


```python
num_pic = len(result_df['picture'])
num_pic
```


```python
# 이미지들 image_insta 폴더에 다운받기
import os
import urllib.request

# 만약 image_insta 폴더가 없으면 만들어라
if not os.path.exists("image_insta"):
    os.makedirs("image_insta")
        
for i in range(0, 50):
    
    try:
        index = result_df['picture'][i]
        date = result_df['date'][i]
        urllib.request.urlretrieve(index, "image_insta/{0}_{1}.jpg".format(date, i))        
    except:
        pass
```

끝


```python

```
