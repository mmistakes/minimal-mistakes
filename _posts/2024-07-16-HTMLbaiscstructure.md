---
layout: single
title:   "네이버와 구글도 따라하는 HTML 문서 기본 구조"
categories: HTML
toc : true
author_profile : false
---


## Google 개발자도 쓰고 Naver 개발자도 쓰는 그것!!  
네이버와 구글 사이트에 들어간 후 개발자 도구(f12)를 눌러보자.  
element, console, source 등 웹페이지 개발을 위한 다양한 구성을 볼 수 있다.  
여기서 한가지 주목해볼 점이있다.  
바로, 구글이나 네이버나 하나같이 따르는 규칙이 있다는 것이다!  
<br>
<img width="1351" alt="image" src="https://github.com/user-attachments/assets/ab492017-fd6d-4c90-bff9-c86e2c5ca6b4">
(출처: google)
<br><br>
![image](https://github.com/user-attachments/assets/807464ff-1e8e-4596-b148-ee38a192d87c)
(출처: naver)
<br><br>
그것은 바로 이것!!  
<img width="439" alt="image" src="https://github.com/user-attachments/assets/431567cd-5899-4914-a25a-ca49ed7ffe32">
<br><br>
두 사이트의 소스 코드 모두 아래와 같은 형태를 띄고 있다.  

```html
<!DOCTYPE html>
<html lang="ko" ...>
<head> ... </head>
<body> ... </body>
<html>
```

그들은 같은 회사도 아닌데 왜 이렇게 똑같은 구조를 띄고 있을까?  

## 양식에 맞춰서 가져오세요.
살면서 여권을 만들던, 대출을 받던, 공공기관에서 무언가 민원처리를 해본 사람이라면 양식이란 것을 한번 쯤 작성해보았을 것이다.  
여기까지 가지 않더라도 우리가 어떤 사이트에 회원가입을 하기 위해 이름, 나이, 아이디, 패스워드와 같은 양식을 작성해 본 경험도 있다.  
양식에 맞지 않으면 민원처리도 회원가입도 진행되지 않는다.  

양식에 맞게 문서를 작성하면, 어떤 데이터가 들어와도 일관성 있게 데이터를 보여줄 수 있다.  
문서를 확인할 때마다 이름은 저 밑에 가있고, 나이는 맨위에 가있고, 갑자기 사는 곳이 추가되고, 패스워드가 사라진다면 필요한 자료가 어디있는지, 데이터는 어디에 입력해야하는지, 누락된 것은 없는지 다시 확인해야한다.  
웹 페이지 또한 모든 사용자에게 동일한 환경의 콘텐츠를 제공하기위해 이러한 양식이 존재한다.  

### 문서 기본 구조
일반적으로 HTML문서는 아래와 같은 기본 구조를 띈다.  
```
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <title> 문서 제목 </title>
  </head>
  <body>
    웹페이지에 표시한 콘텐츠(태그)
  </body>
</html>
```
자, 그렇다면 이제 코드를 한줄씩 따라가며 각각 무엇을 의미하는지 알아보자.  

#### ```<!DOCTYPE html>``` : 문서 형식 선언
DOCTYPE은 Document Type의 약자로 문서형식이라는 뜻이다.  
이는 브라우저에게 해당문서가 HTML5 표준을 따르고 있음을 알려주며, !는 문서 유형을 선언한다는 선언자이다.  
다시말해, "선언한다! 이문서의 형식은 html이다." 라는 명령어다.  

#### ```<html lang="ko">``` : 문서 시작했다. 문서 끝났다.
```<html> </html>``` 태그는 문서의 시작과 끝에 각각 표시한다.  
이 태그에는 선택적으로 lang이라는 속성을 추가할 수 있는데, 이는 language의 약자로 문서의 주요 언어를 표기한다.  
lang속성을 입력하는 이유는 텍스트가 포함된 모든 요소 속성에 대한 기본 언어를 지정함으로써, 스크린 리더나 브러우저, 검색 엔진 등에 사용해야하는 언어 정보를 제공해 주는 역할을 한다.  
따라서, 한국인 시각 장애인이 사용하는 웹페이지를 제작한다면 lang속성을 넣어주어 스크린 리더가 한국어라고 인식할 수 있게 해주어야한다.  

#### ```<head>``` : 문서의 정보
```<html></html>```의 하위 태그인 ```<head></head>```와 ```<body></body>```가 있다.  
이중 ```<head>```는 인코딩 방식과(```<meta charset="">```) 문서의 제목(```<title></title>```)과 같이 웹 페이지 품질에 영향을 줄 수 있는 요소를 포함한다.  

##### ```<meta charset="utf-8">``` : 인코딩 방식 설정
```<meta>```태그는 문서와 관련된 여러 항목(키워드, 설정)등을 지정할 때 사용한다.  
그 중 인코딩 방식을 설정해주는 문자셋(charset)을 설정할 수 있다.  
인코딩 방식이란 말이 생소할 수 있지만 간단하게 말해 컴퓨터가 언어를 해석하는 방식이다.  
프로그램 언어는 0과 1로 이뤄져있고, 처음엔 이를 영어로만 바꾸었다.  
하지만 점차 글로벌화 되면서 다양한 언어로 바꿔주는 형식이 필요했고 이를 해결하기 위해 유니코드라는 시스템이 탄생하였다.  
이를 실제로 저장하고 전송하기 위한 인코딩 방식을 utf-8이라고한다.  
따라서, 우리는 meta 태그를 통해 문자셋을 utf-8로 설정해주는 것이다.  

#### ```<title>``` : 문서의 제목
이것은 웹브라우저의 탭에 표시되는 정보로 웹페이지를 대표하는 정보이다.  
네이버도 아래와 같은 코드를 사용하고 있음을 확인할 수 있다.  
```html
<title>NAVER</title>
```
<img width="1437" alt="image" src="https://github.com/user-attachments/assets/2c08202e-7ecb-4f7d-86eb-c3f6637dbafb">
<br><br>

#### ```<body>``` : 표시되는 콘텐츠
텍스트, 이미지, 미디어 요소등 다양한 콘텐츠를 포함하여 웹페이지를 꾸밀 수 있다.  
실제 네이버에서도 ```<head>```부분에서는 온갖 설정들을 정의해 주었고,  
<br>
<img width="1450" alt="image" src="https://github.com/user-attachments/assets/d561330d-8dae-47ec-8a0e-088bc7cab1a8">
<br><br>

```<body>``` 부분에 와서야 웹페이지를 ```<div>``` 별로 나누어 구성했음을 알 수 있다.  
**```<body>``` 중 "header" 부분**  
검색창과 각종 메뉴와 같이 핵심적인 기능들이 들어가있다.  
<br>
<img width="1459" alt="스크린샷 2024-07-17 13 54 23" src="https://github.com/user-attachments/assets/8b7f9799-cc2d-4632-8294-1b1726e3bc01">
<br>
<br>

**```<body>``` 중 "container" 부분**  
마이메뉴의 빠른 접근, 뉴스, 쇼핑 등 각종 컨텐츠와 같이 눈길을 끌만한 컨텐츠가 들어가있다.  
<br>
<img width="1374" alt="스크린샷 2024-07-16 22 42 55" src="https://github.com/user-attachments/assets/ff877e75-a396-4eea-80b7-10dbeb834254">
<br>
<br>

**```<body>``` 중 "footer" 부분**  
공지사항과 기업정보, 파트너사 등 행정적인 내용과 같이 비교적 유저들이 덜 관심갖을 만한 내용이지만 웹페이지에 표시되어야할 내용이 들어가있다.  
<img width="1369" alt="image" src="https://github.com/user-attachments/assets/4ad8ac12-2b00-4f3b-a708-50aa49487f8e">
