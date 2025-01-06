---
layout: single
title: "📘[Web] Get과 Post..."
toc: true
toc_sticky: true
toc_label: "목차"
categories: web
excerpt: "Get과 Post의 차이?"
tag: [web]
---
# 📘 Get vs Post

![alt text](image-1.png)

## 1. Get
    서버로부터 정보를 요청할 때 사용되는 HTTP 메서드    

- HTTP 패킷 Header에 데이터
- 데이터 길이 제한이 있다
- 요청시 Body가 빈 상태로 데이터 전송 -> 쿼리 스트링을 통해 전송함
- 불필요한 요청을 제한하기 위한 캐시 요청 가능

---
## 2. Post
    정보 생성/업데이트하기 위해 서버에 데이터를 보내는 HTTP 메서드
    
- HTTP 패킷 Body에 데이터
- 데이터 길이 제한 없다
- 브라우저 히스토리에 남지 않는다
- 캐시 요청 없다

## 3. Get과 Post의 차이점
- 사용목적 차이
    - Get : 서버의 리소스에서 데이터를 요청 시
    - Post : 서버의 리소스를 새로 생성, 업데이트 시

- 요청에 Body 유무
    - Get : URL에 데이터를 담아보냄 -> HTTP 메세지에 Body 없음
    - Post : Body에 데이터를 담아보냄

- 속도 : Get이 더 빠르다 -> 캐싱 (한번 접근 후 다시 요청 시 빠르게 접근하기 위해 데이터를 저장시켜 놓음)