---
title: 경력 기술서

categories: 
   - About

permalink: /about/

toc: true #Table Of Contents 목차 보여줌
toc_label: "My Table of Contents" # toc 이름 정의
toc_sticky: true # 스크롤 내릴때 같이 내려가는 목차

last_modified_at: 2020-03-21T18:42:00 # 마지막 변경일

comments: false

---
# 프로필
## 이름
최선재

## 직무
* [락인컴퍼니](https://choiseonjae.github.io/about/#%EB%9D%BD%EC%9D%B8%EC%BB%B4%ED%8D%BC%EB%8B%88qa-team) `2016.01.04 ~ 2016.03.31`   
`QA부서 / 인턴`

* [에이스프로젝트](https://choiseonjae.github.io/about/#aceprojectserver-team) `2019.07.01 ~ 2019.08.30`  
`백앤드 서버 개발팀 / 인턴`

* [(주) 다날](https://choiseonjae.github.io/about/#%EB%8B%A4%EB%82%A0) `2019.12.02 ~ 재직중`  
`TX 개발팀 / 사원`  

# 스킬
## Language
- Java
- MySQL
- JavaScript

## 형상관리
- SVN
- Git

## System
- Windows
- Linux

# 경력기술서
## 다날
### LG Pay 휴대폰 결제 서비스 신규 개발(GW) `2020.04 ~ 2020.07`  
- 개발 담당자
- 다날의 휴대폰 결제 서버와 카드 리더기(Van)사와 통신
- LG Server 와 LG APP와 통신
- 프레임 워크 설계(회사 자체 프레임 워크 내부 재설계 - 언어 변경)
- 비즈니스 로직 설계(모든 전문 및 Util 모듈 개발)
- 서버 간 통신시 암호화 모듈 개발
- 운영과 개발계를 분리 시키기 위해 Yaml 사용
  - YamlMap, YamlReader, YamlChahe 개발
  - YamlCache의 역할 : 자주 변경되지 않는 프로퍼티를 매번 읽는 코스트를 없애기 위해 캐싱해놓고 사용함.
- 전문 개발  
  - 결제 수단 등록
	- 오프라인 결제
	- 온라인 모바일 결제
	- 온라인 PC 결제
	- PIN 변경
	- 생체 인증
	- 결제 등록
- 사용 스킬
  - log4j
  - 암호화 모듈
  - snakeYaml
  - JUnit
  - JDBC
  - jetty

### 휴대폰 결제 서비스 유지보수 `2020.07 ~ 진행 중`  
- 버그 FIX
- 정책 변경에 따른 수정사항 적용

### 본인확인 서비스 유지보수 `2020.07 ~ 진행 중`  
- 버그 FIX
- 정책 변경에 따른 수정사항 적용
- 통신사 통신 모듈 리팩토링

# 인턴
  
## ACEPROJECT(Server team)
`Intern • Jul, 2019 — Aug 2019`

* 과제
	* [Board](https://github.com/choiseonjae/Board_aceproject)
	* [Scout Baseball Player `API`](https://github.com/choiseonjae/API_Aceproject)
	* [Trade Baseball Player `API`](https://github.com/choiseonjae/API_Aceproject)
	* [crawling (Assignment)](https://github.com/choiseonjae/crawling)



* 실무 (실제 서비스) 개발
	- 선수 대결 시 플레이어 목록 로딩 시 레이턴시 발생 -> 캐쉬사용으로 해결 (카페인 라이브러리)
	- 기존 우편함 보관시간 15일 -> 송신자가 기간 조절 가능하도록 변경 
	- 거래에 대한 모듈 개발(Exchange Class - 거래 외에도 보상, 선물도 이러한 형태로 지급)
	- 기존 어뷰징 혹은 버그로 정지당한 사용자가 지워지지 않아 랭크에는 반영되는 버그 발생 -> elastic search(인터넷 nosql)에 존재하는 정지 사용자 로그를 제거함으로서 해결
	- 야구선수를 상점이 아닌 다른 곳에서도 구매가능하도록 변경



* 배운 점
	- batch 방식으로 User에게 Item 부여 
		- 일반적으로, 이벤트를 하거나 특정 유저에게 아이템을 뿌릴 때 **해당하는 모든 유저의 DB**에 정보를 넣는다고 생각했다.  
		- **로그인 시 유저가 직접 자신이 받을 수 있는 아이템들을 챙겨가는 구조**로 개발한다면 접속하지 않는 유저에게 아이템을 주거나 만료시키는 오버헤드를 없앨 수 있다.  

	- 스크립트 DB에 저장 (서버 재시작하지 않고 확률 등의 수정 가능)
	> 내 생각엔, js(인터프리터) 등을 사용하는 방식으로 해도 됬을텐데 오히려 내가 봤을 땐 유지보수만 안 좋아지는 거 같다.

	- JDBC 는 객체로 DB에 저장위해서 (기존에는 mybatis를 사용하지만 객체 전체를 DB에 저장하기위해 JDBC를 사용)

## 락인컴퍼니(QA Team)
`Intern • Jan, 2016 — Mar, 2016`

* testing
* developed batch tool for QA
  
  ![인턴  LIAPP](https://user-images.githubusercontent.com/49507736/66195102-def9a700-e6d0-11e9-8b5f-7abe23e9a882.png)

# 대학교 Project
## Server for Application
  `Developer • Oct, 2019 — Oct, 2019`<br>
  Developed Server for 2019 Seoul App Contest using Spring Boot.  
  Providing a restaurant, toilet and road for disabled.

## Server for Mobile Simulation Game
  `Developer • Jul, 2019 — Aug, 2019`<br>
  Developed Server for Mobile Baseball Games using Spring and Spring Boot.

## Family SNS with Android
  `Developer • Mar, 2019 — Jun, 2019`<br>
  Developed Chatting and Picture Cloud using Firebase.<br>
  Categorization of faces via CNN, SVM.
  
## Distributed and Parallel Processing project
  `Developer • Sep, 2018 — Dec, 2018`<br>
  Word extraction of 10000 HTML files for frequency return.<br>
  Distributed processing across multiple servers for improved performance and deploy availability using socket.

## News Search & Analyze
  `Developer • Mar, 2019 — Jun, 2019`  
  Web Crawler(Jsoup) for News search.  
  Komoran for word extraction to check frequency.

# Education

## Kyonggi University
`Computer Science • 2014.03 — 2020.02`


# Skill
  
## Cloud
* Google Cloud Platform

  
## Frontend Development
* Html
* Css
* Javascript

  
## Backend Development
* Java
	* Servlet
	* Jsp
	* Spring
	* Spring Boot

  
## Android
* Android with java

  
## Problem Solving(Data Structure + Algorithm)
* [Baekjoon](https://www.acmicpc.net/user/homesking)

  
## Database
* MySQL
* Elastic Search
* Google Cloud SQL for MySQL
* firebase realtime database

  
## ~~AI~~  
~~tensorflow CNN~~
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyNzA4NDE1MjIsLTc4Nzc5NjY3MiwxOD
E3NDIxMjg1LC0xNjM1MDMwNzc5LDEyNjM4NzI1MTYsMTcyNDMy
OTA2OCwzNjkzODI3OCwxNDAyMzM2MjYwLC0xMjUxNjAwMTk2LD
QxOTg2OTk5MCwtMTg3ODg5NjQ3NywtMTAzMTE2NDM5Miw2NTM3
NDI2NzksNzY5Njc0NDU5LC02MTIyNzE1NjUsLTEwMTg3OTAzNT
QsLTE1NDk2NDU3NzYsNjk4OTY3MjI2LDc3MDkwODg5LC00ODYy
NjY4MTBdfQ==
-->
