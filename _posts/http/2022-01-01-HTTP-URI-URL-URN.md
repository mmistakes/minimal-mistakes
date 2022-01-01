---
layout: single
title: "[HTTP] URI, URL, URN"
categories: HTTP
tag: [HTTP, network]
toc: true
author_profile: false
# sidebar:
#   nav: "docs"
---

## ✔ URI & URL

> URI과 URL은 해당 자원의 위치를 식별하기 위해 사용되는 규칙이다

<img width="400" alt="URI" src="https://user-images.githubusercontent.com/53969142/124256208-027fa900-db66-11eb-9062-33b95096e940.png">

<img width="400" alt="URL" src="https://user-images.githubusercontent.com/53969142/124256216-03b0d600-db66-11eb-965f-572e0fc44a3e.png">

### URI(Uniform Resource Identifier)

- Uniform: 리소스를 식별하기 위한 통일된 규칙
- Resource: URI로 식별할 수 있는 모든 자원(제한 없음)
  - 실시간 교통 정보
  - HTML
  - 우리가 구분할 수 있는 모든 것
- Identifier: 다른 항목과 구분하는데 필요한 정보

### URL(Uniform Resource Locator)

- 리소스가 있는 위치를 지정

### URN(Uniform Resource Name)

- 리소스에 이름 부여
- 위치는 변할 수 있지만, 이름은 변하지 않는다.
- urn:isbn:8960777331 (어떤 책의 isbn URN)
- URN 이름만으로 실제 리소스를 찾을 수 있는 방법이 보편화 되지 않음

## ✔ URL 분석

- https://www.google.com/search?q=hello&hl=ko

### URL(전체 문법)

- scheme://[userinfo@]host[:port][/path][?query][#fragment]
- https://www.google.com:443/search?q=hello&hl=ko
  - 프로토콜(https)
  - 호스트명(www.google.com)
    - com : 상위 도메인명
    - google : 도메인명
  - 포트 번호(443)
  - 패스(/search)
  - 쿼리 파라미터(q=hello&hl=ko)

### URL(scheme)

- scheme://[userinfo@]host[:port][/path][?query][#fragment]
- https://www.google.com:443/search?q=hello&hl=ko
  - 주로 프로토콜 사용
  - 프로토콜: 어떤 방식으로 자원에 접근할 것인가 하는 약속 규칙.
    - 클라이언트와 서버 간의 약속
    - ex) http, https, ftp 등등
- http는 80포트, https는 443 포트를 주로 사용, 포트는 생략 가능
- https는 http에 보안 추가 (HTTP Secure)

### URL(userinfo)

- scheme://[userinfo@]host[:port][/path][?query][#fragment]
- https://www.google.com:443/search?q=hello&hl=ko
  - URL에 사용자정보를 포함해서 인증
  - 거의 사용하지 않음

### URL(host)

- scheme://[userinfo@]host[:port][/path][?query][#fragment]
- https://www.google.com:443/search?q=hello&hl=ko
  - 호스트명
  - 도메인명 또는 IP주소를 직접 사용가능

### URL(port)

- scheme://[userinfo@]host[:port][/path][?query][#fragment]
- https://www.google.com:443/search?q=hello&hl=ko
  - 포트(PORT)
  - 접속 포트
  - 일반적으로 생략, 생략 시 http는 80, https는 443

### URL(path)

- scheme://[userinfo@]host[:port][/path][?query][#fragment]
- https://www.google.com:443/search?q=hello&hl=ko
  - 리소스 경로(path), 계층적 구조
  - 예)
    - /home/file1.jpg
    - /members
    - /members/100, /items/iphone12

### URL(query)

- scheme://[userinfo@]host[:port][/path][?query][#fragment]
- https://www.google.com:443/search?q=hello&hl=ko
  - key=value 형태
  - ?로 시작, &로 추가 가능 ?keyA=valueA&keyB=valueB
  - query parameter, query string 등으로 불림, 웹 서버에 제공하는 파라미터, 문자 형태

### URL(fragment)

- scheme://[userinfo@]host[:port][/path][?query][#fragment]
- https://docs.spring.io/spring-boot/current/reference/html/getting-
  started.html#getting-started-introducing-spring-boot
  - fragment
  - html 내부 북마크 등에 사용
  - 서버에 전송하는 정보 아님

### 참고 자료

- [URI와 웹 브라우저 요청 흐름](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/lecture/61357?tab=curriculum)
