![이미지](/assets/blog1.jpg)

## 들어가기에 앞서

## HTTP 프로토콜이란
- 웹에서 데이터를 주고받기 위한 표준 프로토콜(규칙) 중 하나
- 클라이언트-서버 모델을 기반으로 한다. 클라이언트를 요청, 서버는 응답
- HTTP 요청은 다양한 method를 사용하는데 대표적으로 GET(리소스 조회), POST(리소스 생성), PUT(리소스 갱신), DELETE(리소스 삭제) 등이 존재

## GET method와 POST method의 공통점
- 클라이언트에서 서버로 데이터를 보내는 목적으로 사용
- 모두 URL을 사용하여 요청대상을 식별

## GET method와 POST method의 차이점
### GET method
- 데이터는 URL의 쿼리 문자열에 포함되어 전송
ex 나무위키에 *normaltic*을 검색
![이미지](/assets/GET_method_normaltic.png)
##### https://namu.wiki/w/Normaltic%20Place?from=%EB%85%B8%EB%A7%90%ED%8B%B1
##### 여기서 "https://namu.wiki/w/Normaltic%20Place"는 리소스 경로이고 '?' 이후의 부분이 쿼리 문자열입니다.  