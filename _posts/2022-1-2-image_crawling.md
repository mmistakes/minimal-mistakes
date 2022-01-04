---
layout: single
title:  "google image crawling"
categories: Selenium
tag: [python,crawling,blog,github,image,크롤링,파이썬,입문,기초]
toc: true
author_profile: false
sidebar:
    nav: "docs"
# search: false 
---

## 이미지 크롤링 

https://wltn39.github.io/start/setting/

### 주의사항! 
- 한 셀에 모든 코드가 함께 있어야 정상적으로 실행됩니다.

### 1. 필요라이브러리 import
- 크롬드라이버 인스톨러는 없으니 아래 코드 입력 후 설치해주셔야해요. 


```python
!pip install chromedriver_autoinstaller
```


```python
from selenium import webdriver
import chromedriver_autoinstaller
```

### 2. search_selenium 함수 정의


```python
def search_selenium(search_name, search_path, search_limit):
    search_url = "https://www.google.com/search?q=" + str(
        search_name) + "&hl=ko&tbm=isch"
        # search_url 에 구글 이미지 검색 url과 연결

    path = chromedriver_autoinstaller.install()
        # 크롬드라이버 다운받고 불러오는 것이 정석이지만.. 
        # 이거땜에 에러나면 나중에 해보자구요..ㅋㅋ
    browser = webdriver.Chrome(path)
    browser.get(search_url)
        # 브라우저 변수에 크롬의 웹드라이버를 가져오고, 
        # .get 메소드로 url을 열어줍니다. 
        
    browser.implicitly_wait(2)
        # 웹페이지 전체가 넘어올 때까지 기다리기
        # cf. explicitly wait (웹페이지의 일부분이 나타날때까지 기다리기) 
        # 시스템 과부하 등을 막기 위함
            
```


```python
    for i in range(search_limit):
        image = browser.find_elements_by_tag_name("img")[i]
            # image 변수에 img 태그의 요소를 가져오고 i번 인덱스에 저장합니다. 
        image.screenshot("D:/download/" + str(i) + ".jpg")
            # .screenshot 메소드로 이미지를 스크린샷해서 D:/download 폴더에 저장해줌 
                # 폴더는 이미 있어야 하며, 자신이 활용할 폴더로 설정해줘야함

    browser.close()
```


```python
if __name__ == "__main__":
         # 인터프리터 실행되면 우선 적용되는 조건문
    search_name = input("검색하고 싶은 키워드 : ")
     
    search_limit = int(input("원하는 이미지 수집 개수 : "))
    search_path = "Your Path"
    search_selenium(search_name, search_path, search_limit)
```


```python
# " if __name__ == "__main__": "
        #  - "__name__ == __main__" : 인터프리터에서 직접 실행했을 경우에만 if문 내의 코드를 돌리라는 명령 
        #  - 현재 모듈 내에서 필요한 함수, 변수 등을 제공해줌 (따로 모듈 만들고 immport 하지 않고 해결할 때 활용됨)
```
