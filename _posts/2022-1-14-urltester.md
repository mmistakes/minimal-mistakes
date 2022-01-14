---
layout: single
title: "파이썬 URL_Tester"
categories: Python
tag:
  [
    python,
    while문,
    blog,
    github,
    파이썬,
    for문,
    if문,
    requests,
    코딩,
    입문,
    URL,
  ]
toc: true
sidebar:
  nav: "docs"
---

## url 유효성 검사기

```python
import requests
```

```python
while True:
    print("환영합니다. URL 유효성 검사기 입니다.")
    print("확인하려는 URL을 입력해주세요.(여러개 입력시 ,로 구분)\n")

    # 소문자로 바꿔주고, ','를 기준으로 구분시키기
    urls = str(input()).lower().split(",")

    # for문을 각각의 url검사
    for url in urls:
        url = url.strip() # url 앞 뒤에 공백을 제거

        # if_1: url 안에 '.'이 없으면 유효하지 않은 URL
        if "." not in url:
            print(url, "is not a valid URL")

        # else_1 : '.'이 있다면, url안에 http란 단어가 있는지 확인
        else:
            # 'http'가 없다면 https://를 추가
            if "http" not in url:
                url = f"https://{url}"
        # 예외경우 처리를 위한 try, except 구문
        try:
            # r 변수에 url의 Response 코드를 가져온 뒤 확인
            r = requests.get(url)
            if r.status_code == 200: # 코드가 200(정상)이면 up
                print(url, "is Up!")
            else:
                print(url, "is down.") # 아니면 down 출력
        except:
            print(url, "is down.") # 기타 예외도 down 출력

    answer = input("다른 것도 검사할까요? y/n \n").lower()

    # answer에 n이 입력되면 정지, 나머지는 while문 반복
    if answer == "n":
        print("안녕히 가세요.")
        break
    else:
        True
```

    환영합니다. URL 유효성 검사기 입니다.
    확인하려는 URL을 입력해주세요.(여러개 입력시 ,로 구분)



     www.naver.com, google.com, daum.net


    https://www.naver.com is Up!
    https://google.com is Up!
    https://daum.net is Up!


    다른 것도 검사할까요? y/n
     n


    안녕히 가세요.

```python

```
