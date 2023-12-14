---
categories: web basic
---
![이미지](/assets/blog1.jpg)

## 들어가기에 앞서

## HTTP 프로토콜이란
- 웹에서 데이터를 주고받기 위한 표준 프로토콜(규칙) 중 하나
- 클라이언트-서버 모델을 기반으로 한다. 클라이언트를 요청, 서버는 응답
- HTTP 요청은 다양한 method를 사용하는데 대표적으로 GET(리소스 조회), POST(리소스 생성), PUT(리소스 갱신), DELETE(리소스 삭제) 등이 존재

#### GET method
- 주로 서버로부터 정보를 요청할 떄 사용됨
- URL값에 정보를 담아보내기 떄문에 전달할 수 있는 정보의 양이 적음
- 데이터는 URL의 쿼리 문자열에 포함되어 전송
![이미지](/assets/GET_method_normaltic.png)
https://namu.wiki/w/Normaltic%20Place?from=%EB%85%B8%EB%A7%90%ED%8B%B1
여기서 "https://namu.wiki/w/Normaltic%20Place"는 리소스 경로, '?' 이후의 부분이 쿼리 문자열

#### POST method
- 주로 서버에 정보를 보낼 때 사용됨
- HTTP요청의 <body>안에 정보를 담아보내기 떄문에 전달할 수 있는 정보의 양이 많음