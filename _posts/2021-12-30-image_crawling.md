---
layout: single
title:  "이미지 크롤링"
---

## 이미지 크롤링 


```python
from selenium import webdriver
import chromedriver_autoinstaller

def search_selenium(search_name, search_path, search_limit):
    search_url = "https://www.google.com/search?q=" + str(
        search_name) + "&hl=ko&tbm=isch"

    path = chromedriver_autoinstaller.install()
    browser = webdriver.Chrome(path)
    browser.get(search_url)

    browser.implicitly_wait(2)
                # 웹페이지 전체가 넘어올 때까지 기다리기
                # cf. explicitly wait (웹페이지의 일부분이 나타날때까지 기다리기) 
            
    for i in range(search_limit):
        image = browser.find_elements_by_tag_name("img")[i]
        image.screenshot("D:/download/" + str(i) + ".jpg")
                        # .screenshot 메소드로 이미지를 스크린샷해서 ()안 폴더에 저장해줌
                        # 이미지를 저장할 폴더 위치 (기존에 있는 폴더로 해야함)

    browser.close()

if __name__ == "__main__":

    search_name = input("검색하고 싶은 키워드 : ")
    search_limit = int(input("원하는 이미지 수집 개수 : "))
    search_path = "Your Path"
    # search_maybe(search_name, search_limit, search_path)
    search_selenium(search_name, search_path, search_limit)
```

    검색하고 싶은 키워드 : 강아지
    원하는 이미지 수집 개수 : 10
    

    C:\Users\wltn3\AppData\Local\Temp/ipykernel_5100/4264386744.py:9: DeprecationWarning: executable_path has been deprecated, please pass in a Service object
      browser = webdriver.Chrome(path)
    C:\Users\wltn3\AppData\Local\Temp/ipykernel_5100/4264386744.py:17: DeprecationWarning: find_elements_by_* commands are deprecated. Please use find_elements() instead
      image = browser.find_elements_by_tag_name("img")[i]
    


```python
# " if __name__ == "__main__": "
        #  - "__name__ == __main__" : 인터프리터에서 직접 실행했을 경우에만 if문 내의 코드를 돌리라는 명령 
        #  - 현재 모듈 내에서 필요한 함수, 변수 등을 제공해줌 (따로 모듈 만들고 immport 하지 않고 해결할 때 활용됨)
```
