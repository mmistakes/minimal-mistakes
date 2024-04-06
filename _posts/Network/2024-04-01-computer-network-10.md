---
title: "2.4 DNS: 인터넷의 디렉터리 서비스"
excerpt: "2.4 DNS: 인터넷의 디렉터리 서비스"
categories: ['Computer Network']
tags:
  - computer
  - network

toc: true
toc_sticky: true
use_math: true
 
date: 2024-04-01
last_modified_at: 2024-04-01
---
&nbsp;&nbsp;인터넷 호스트를 구별하기 위해 사용하는 식별자에는 **호스트 이름**(hostname)과 **IP 주소**(IP address)가 있다. 

* **호스트 이름**(hostname)
  * www.facebook.com, www.google.com ...
  * 호스트 이름은 알파뉴메릭 문자로 구성되므로 라우터가 처리하는 데 어려움이 있으므로 IP 주소로 식별한다.

* **IP 주소**(IP address)
  * 121.7.106.83과 같은 형태
  * 0~255의 십진수로 표현하는 각 바이트는 점으로 구분
  * 왼쪽에서 오른쪽으로 읽어 호스트의 위치 정보를 얻음

## 1. DNS가 제공하는 서비스

### DNS(domain name system)
* 호스트 이름을 IP 주소로 변환해주는 디렉터리 서비스
* DNS 서버들의 계층구조로 구현된 분산 데이터베이스
* 호스트가 분산 데이터베이스로 질의하도록 허락하는 애플리케이션 계층 프로토콜
* DNS 프로토콜은 UDP상에서 수행되고 포트 번호 53을 이용


### DNS 작동 순서

1. 사용자 컴퓨터는 DNS 애플리케이션의 클라이언트 역할을 담당한다.
2. 브라우저는 URL로부터 호스트 이름 www.google.com을 추출하고 그 호스트 이름을 DNS 애플리케이션의 클라이언트 측에 넘긴다.
3. DNS 클라이언트는 DNS 서버로 호스트 이름을 포함하는 질의를 보낸다.
4. DNS 클라이언트는 호스트 이름에 대한 IP 주소를 포함한 응답을 받는다.
5. 브라우저가 DNS로부터 IP 주소를 받으면, 브라우저는 해당 IP 주소와 그 주소의 80번 포트에 위치하는 HTTP 서버 프로세스로 TCP 연결을 초기화한다.


### DNS가 제공하는 추가 서비스


#### 호스트 에일리어싱(host aliasing)

&nbsp;&nbsp;호스트는 하나 이상의 별명(호스트 이름)을 가질 수 있다. 예를 들어 relay1.west-coast.enterprise.com과 같은 호스트 이름은 enterprise.com과 www.enterprise.com과 같은 2개의 별칭을 얻을 수 있다. 이때 relay1.west-coast.enterprise.com은 **정식 호스트 이름**(canonical hostname)이라고 한다.


#### 메일 서버 에일리어싱(mail server aliasing)

&nbsp;&nbsp;핫메일 서버의 호스트 이름은 복잡하여 사용자가 기억하기 힘들다. DNS는 호스트의 별칭 호스트 이름에 대한 정식 호스트 이름을 얻도록 메일 애플리케이션에 의해 수행한다.



#### 부하 분산(load distribution)

&nbsp;&nbsp;naver.com과 같이 인기 있는 사이트의 부하를 분산하기 위한 서비스이다.


## 2. DNS 동작 원리 개요

## 3. DNS 레코드와 메시지


##### www
* 월드 와이드 웹(World Wide Web, WWW, W3)
* 세계적인 인터넷 망, 인터넷이 전세계적으로 거미줄처럼 엮어져 있는 것을 나타냄