---
title: "2.2 웹과 HTTP"
excerpt: "2.2 웹과 HTTP"
categories: ['Computer Network']
tags:
  - computer
  - network

toc: true
toc_sticky: true
use_math: true
 
date: 2024-03-26
last_modified_at: 2024-03-26
---
## 1. HTTP 개요

&nbsp;&nbsp;HTTP(HyperText Transfer Protocol)는 웹의 애플리키에션 계층 프로토콜로 웹의 중심이 된다. HTTP는 클라이언트 프로그램과 서버 프로그램으로 구현되고 서로 HTTP 메시지를 교환하여 통신한다. HTTP는 메시지의 구조 및 클라인트와 서버의 메시지 교환에 대해 정의한다.

* **웹 페이지**(Web Page, 문서)
  * 객체로 구성된다.
* **객체**(object)
  * 단일 URL로 지정할 수 있는 하나의 파일
  * HTML 파일, JPEG 이미지, 자바스크립트, CSS 등이 해당된다.
* **웹 브라우저**(Web browser)
  * 네이버 웨일, 크롬...
  * HTTP의 클라이언트 측을 구현한다.
  * 웹 페이지를 보여주고 여러 가지 인터넷 탐색, 검색과 구성 특성을 제공
* **웹 서버**(Web server)
  * URL로 각각을 지정할 수 있는 웹 객체를 가지고 있다.
  * 아파치, 마이크로소프트 인터넷 인포메이션 서버 등...

&nbsp;&nbsp;HTTP는 웹 클라이언트가 웹 서버에게 웹 페이지를 요청하는 방법, 서버가 클라이언트로 웹 페이지를 전송하는 방법을 정의한다. HTTP는 **TCP**를 전송 프로토콜로 사용한다.
## 2. 비지속 연결과 지속 연결

### 비지속 연결 HTTP

### 지속 연결 HTTP

## 3. HTTP 메시지 포맷

### HTTP 요청 메시지

### HTTP 응답 메시지

## 4. 사용자와 서버 간의 상호작용: 쿠키

## 5. 웹 캐싱

### 조건부 GET

## 6. HTTP/2

### HTTP/2 프레이밍

### 메시지 우선순위화 및 서버 푸싱

### HTTP/3