---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 016"
categories: python
tag: [python, 파이썬, crawling, 크롤링]
toc: true
author_profile: false
toc: false
sidebar:
nav: "docs"
search: true
---

<center>**[공지사항]** <strong> [개인적인 공부를 위한 내용입니다. 오류가 있을 수 있습니다.] </strong></center>
{: .notice--success}


<h2>[파이썬(python) & 크롤링(crawling) - 016]</h2>


<h3> 크롤링(Crawling) 기본 - 16</h3>

<h3>API를 활용한 크롤링</h3>
<h5>Open API(Rest API)</h5>

  - API: Application Programming Interface의 약자로, 특정 프로그램을 만들기 위해 제공되는 모듈(함수 등)을 의미한다.
  - Open API는 공개 API라고 ㅎ며 누구나 사용할 수 있도록 주로 Rest API 기술을 많이 사용하여 공개해놓은 API를 말한다.
  - Rest API : Representational State Transfer API의 약자로 HTTP 프로토콜을 통해 서버 제공 기능을 사용할 수 있는 함수를 의미한다.
    - XML, JSON의 형태로 응답을 전달하기에 원하는 데이터의 추출이 용이하다.<br><br>

  - JSON(JavaScript Object Notation)
    - 웹환경에서 서버와 클라이언트 사이에 데이터를 주고 받을 때 많이 사용<br><br>

  - JSON의 요청과 응답을 용이하게 테스트하거나 아래와 같이 보기 좋게 출력하고자 하는 경우 Postman을 이용하여 진행할 수 있다.


```python 

        # JSON 데이터 예시
        # 여러줄을 줄바꿈하며 입력하고자 할 때는 """을 사용

        data = """
        {
            "total": 634151,
            "start": 1,
            "display": 10,
            "items": [
                {
                    "title": "MHL 케이블",
                    "link": "https://search.shopping.naver.com/gate.nhn?id=10782444869",
                    "image": "https://shopping-phinf.pstatic.net/main_1078244/10782444869.5.jpg",
                    "lprice": "16500",
                    "hprice": "0",
                    "mallName": "투데이샵",
                    "productId": "10782444869",
                    "productType": "2"
                },
                {
                    "title": "파인디지털 파인드라이브 Q300",
                    "link": "https://search.shopping.naver.com/gate.nhn?id=19490416717",
                    "image": "https://shopping-phinf.pstatic.net/main_1949041/19490416717.20190527115824.jpg",
                    "lprice": "227050",
                    "hprice": "359000",
                    "mallName": "네이버",
                    "productId": "19490416717",
                    "productType": "1"
                }
            ]
        }
        """
    
       json_data = json.loads(data)
       print(json_data['items'][0]['title']) 
       print (json_data['items'][0]['link'])

       # 출력값
         MHL 케이블
         https://search.shopping.naver.com/gate.nhn?id=10782444869
```
<br>
<h3>네이버 검색 API 활용해보기 </h3>

  - 네이버 개발자 센터에 접속(https://developers.naver.com/main/) 해서 naver 아이디로 로그인을 한다.
  - 상단 메뉴 중 Application 메뉴에서 애플리케이션 등록을 클릭하여 애플리케이션 이름을 이름의 작성한 후 사용 API에서<br>
    검색을 선택한다. 그리고 비로그인 오픈 API 서비스환경은 Web 설정으로 지정한다.
  - 웹서비스 URL은 자신의 컴에서 진행하는 것이니 http://localhost라고 기입한다.
  - 여기까지 마치고 등록하기를 누르면 화면에 Client ID와 Client Sectet가 나타나게 되는데 이를 잘 기록해둔다.
  - 다시 Naver Developer 상단 메뉴에서 Document => 서비스 API => 검색을 선택한다.
  - 그리고 API 호출 예제 중 하단 파이선 內 url의 따옴표 안의 텍스트를 복사해서 포스트맨에 붙여넣기 한다.

<div align="center">
<img src="http://drive.google.com/uc?export=view&id=1fpapPOGWad__uatriU82_WD_sjQGZaL0"><br>
</div>

  - Postman을 열고 주소를 아래의 이미지와 같이 붙여넣기 한다.
  - 주소 : https://openapi.naver.com/v1/search/news.xml?query= 뒤에 예시로 android를 추가 입력한다.
  - 화면 좌측 상단에 "Get"을 확인하고 기존 주소에서 blog를 news로 수정하고 뒤에 android를 추가 입력한 주소를 붙여넣기 후<br>
    화면 우측 상단 Send 버튼을 누르면 화면 하단의 에러메세지를 확인할 수 있다.

<div align="center">
<img src="http://drive.google.com/uc?export=view&id=1fpfylk-wbK0sxhTL6kUkX9IWXDRqU4fB" width="750"><br>
</div><br><br>

  - 에러메세지는 네이버에게서 받은 인증키를 입력하지 않았기에 발생한 인증 오류이다
  - 상단 메뉴 중 Headers를 클릭해서 Key에 X-Naver-Client-Id라고 입력하고 그 옆 value에 자신의 Id를 적고<br>
    그 아래 Key에는 X-Naver-Client-Secret라고 입력하고 자신의 secret값을 입력한다.<br>
    여기까지 완료되면 Send를 다시 클릭하여 하단에 데이터가 정상적으로 넘어오는지 확인한다.<br>

<div align="center">
<img src="http://drive.google.com/uc?export=view&id=1ftltwloSRljnOP0HudpYxAPcgVWl0xJ-" width="750"><br>
</div><br><br>

  - 위의 내용을 참고하여 네이버 개발자센터의 검색=>뉴스 공개API의 각종 파라미터를 참고해보자.

<div align="center">
<img src="http://drive.google.com/uc?export=view&id=1fw8CjTaVn70IfbISadZTM2qPUYMfZEHN" width="650"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1fy9qUxz2mfgRo5DwkecbwpAe_SIrzDB7" width="650"><br><br>
<h5>크롤링 조건을 여러개 사용하고자 하는 경우에는 아래와 같이 파라미터와 파라미터 사이 & 기호를 추가하면 된다.<br>
Ex] https://openapi.naver.com/v1/search/news.xml?query=%EC%A3%BC%EC%8B%9D&display=10&start=1&sort=sim</h5><br>
<img src="http://drive.google.com/uc?export=view&id=1g-8Ie_yxN8b-QR4221zKB80eoPQrbpzZ" width="650"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1g-J5N2jAif98YVh6QgOhjSOZJgU8BvIm" width="650"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1g-KFaO0FPUsBxrnExl37ryNbokYSW0l9" width="650">
</div><br><br>
