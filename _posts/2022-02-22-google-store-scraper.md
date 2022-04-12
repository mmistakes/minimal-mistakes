---
title:  "구글 플레이스토어 스크래퍼 만들기"
excerpt: "클론 코딩하며 스스로 배운 것들과 최종 스크래퍼 코드를 정리한 글"

categories:
- scraping
tags:
- pyhton
last_modified_at: 2022-03-02
---
 

<br>
이 글은 클론 코딩을 하면서 배운 내용과 스스로 기록하고 싶은 내용을 정리한 글로 구글 플레이스토어 스크래퍼 최종 코드는 [Github](https://github.com/ssbinn/google-store-scraper)에 올려두었습니다.

<br>

## 웹 크롤러와 스크래퍼의 차이 

- 웹 크롤러 <br>
자동화된 방법으로 여러 사이트를 직접 돌아다니면서 데이터를 가지고 오는 봇을 크롤러라고 한다. 

- 웹 스크래퍼 <br>
특정 웹 사이트 또는 페이지에서 특정 데이터를 추출하여 새로운 것을 만드는 작업을 말한다.
여기서는 구글 플레이스토어의 모든 어플의 **앱 이름, 앱 정보, 별점, 다운로드 수**와 같은 원하는 정보를 가져올 것이기 때문에 스크래핑이라고 제목을 붙였다. 

<br>

## beautifulSoup, selenium 
python으로 스크래핑을 하기 위해 대부분 beautifulSoup과 selenium을 사용한다. beautifulSoup은 정적 웹 페이지에서 빠른 속도로 HTML을 파싱할 수 있고, python request 라이브러리에 대한 response를 분석할 때 사용한다. selenium은 속도가 느리고 메모리 요구가 크지만, 동적 웹 페이지 분석이 가능하다. 차이가 분명하게 있기 때문에 분석하려는 웹 사이트가 어떻게 구현되어 있는 지 먼저 확인을 해야 한다. 

<br>

## 플레이스토어 분석

분석하려는 [플레이스토어](https://play.google.com/store/apps?hl=ko&gl=US)는 처음 웹사이트를 새로고침 했을 때 모든 정보를 보여주지 않는다. 아래로 스크롤 하면 로딩 후에 어플을 보여준다. 또한 '인기 앱/게임', '맞춤 추천' 같은 카테고리에서 [더보기] 버튼을 눌러 안에 있는 모든 어플을 스크래핑 하려고 한다. 

- javascript 코드가 들어간 동적 웹이라서 beautifulSoup, selenium 모두 사용해야 한다.
- 플레이 스토어에서 일부 어플만 노출시켰기 때문에 최종적으로 스크래핑한 어플의 갯수는 얼마 되지 않는다.



### 인기 앱 페이지에서 연습한 코드 

```python
import requests
from bs4 import BeautifulSoup

url = "https://play.google.com/store/apps/collection/cluster?clp=0g4jCiEKG3RvcHNlbGxpbmdfZnJlZV9BUFBMSUNBVElPThAHGAM%3D:S:ANO1ljKs-KA&gsr=CibSDiMKIQobdG9wc2VsbGluZ19mcmVlX0FQUExJQ0FUSU9OEAcYAw%3D%3D:S:ANO1ljL40zU&hl=ko&gl=US"
headers = {
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36",
    "Accept-Language":"ko-KR,ko"
}

app_res = requests.get(url, headers=headers)
app_res.raise_for_status() # error 체크

soup = BeautifulSoup(app_res.text, 'lxml') # html_doc, 'html.parser'

apps = soup.find_all("div", attrs={"class":"ImZGtf mpg5gc"})
# print(len(apps))

for app in apps:
    title = app.find("div", attrs={"class":"WsMG1c nnK0zc"}).get_text()
    if title == None: 
        continue
    else: 
        print(title) 

```
requests를 통해서 접속했을 때 원하는 앱 이름 50개를 모두 보여준다. 여기서 원하는 앱 이름들만 가져오기 위해 클래스명을 찾아 적고, header를 작성했는데 구글은 접속하는 유저의 header 정보에 따라 다른 정보를 보여주기 때문에 꼭 작성해주어야 한다. 만약 작성하지 않는다면 requests를 통해서 플레이스토어에 접근할 때, 미국에서 접속한 것을 디폴트로 해서 보여주기 때문에 원하지 않는 정보가 출력될 수 있다. header를 잘 작성하여 원하는 사이트에 맞게 접속했는 지 확인하기 위해 아래의 코드로 확인해보았다.

```python
with open("app.html", "w", encoding="utf-8") as file:
    file.write(soup.prettify()) 
```

- user agent 정보 확인 방법
  - user agent string 검색하면, `what is my user agent?` 사이트에서 자신의 user agent 정보 확인 가능 
  - 접속하는 브라우저에 따라 다르게 나오기 때문에 주의 (저는 크롬을 사용했습니다.)

<br>

### 스크롤 처리 

스크래핑 할 [페이지](https://play.google.com/store/apps?hl=ko&gl=US)에서 모든 어플에 대한 데이터를 긁어오기 위해 Selenium을 사용해서 스크롤하는 코드이다.

```python
from selenium import webdriver
import time

browser = webdriver.Chrome("chromedriver.exe")
browser.maximize_window()
browser.get(url)

interval = 2

page_height = browser.execute_script("return document.body.scrollHeight") # 페이지 높이 저장
# print(page_height)

# 화면 맨 아래로 스크롤하도록 구현
while True:
    browser.execute_script("window.scrollTo(0, document.body.scrollHeight)") # 현재 페이지에서 맨 아래로 스크롤 내리기 (아마 해상도 높이 만큼 내려감)
    time.sleep(interval) # 2초동안 페이지 로딩 대기
    
    curr_height = browser.execute_script("return document.body.scrollHeight") # 현재 페이지 높이 저장
    if curr_height == page_height: # 더이상 스크롤 할 게 없다면 
        break
    
    page_height = curr_height
    
# print("스크롤 완료")
```

- webdriver 설치 방법 (크롬 드라이버 설치 방법)
  - [크롬 버전 확인](chrome://version/)
  - [크롬 드라이버 설치](https://chromedriver.chromium.org/downloads )
    - 크롬 버전과 맞춰서 설치해야 하고, exe 파일을 작업하고 있는 파일과 같은 경로에 압축을 풀어야 한다. 

<br>

더보기 버튼을 클릭 시 나오는 카테고리 페이지에서 스크래핑하기 위함 






<br>

## 참고 
- 클론 코딩: [인프런 나도코딩 웹 스크래핑](https://www.inflearn.com/course/파이썬-웹-스크래핑/dashboard)
- Github: <https://github.com/ssbinn/google-store-scraper>
- google-play-scraper 오픈소스: <https://github.com/facundoolano/google-play-scraper>