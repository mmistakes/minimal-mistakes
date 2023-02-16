---
layout: single
title: '깃허브 블로그 만들기 for Mac OS: 3. 구글 애널리틱스, 구글 및 네이버 노출'
categories: 'GitHubBlog'
tags: ['GitHub Pages', 'Jekyll']
toc: true   # 우측 목차 여부
author_profile: True  # 좌측 프로필 여부
published: false
---


## 구글 애널리틱스
- 블로그 방문자와 통계를 확인할 수 있는 기능이다. 사실 기록용이기때문에 어떻게 사용할지 모르겠지만 일단 데이터 수집이 가능하니 설치하도록 한다

1. [Google Analytics](https://analytics.google.com/analytics/web/provision/?hl=ko&pli=1#/provision) 접속 -> 측정시작
![ga1](/assets/blog_img/ga1.png)
2. 계정이름 설정
![ga2](/assets/blog_img/ga2.png)
3. 속성 설정
![ga3](/assets/blog_img/ga3.png)
4. 비지니스 정보 입력
![ga4](/assets/blog_img/ga4.png)
5. 동의 후 이메일 커뮤니케이션 창에서 동의 -> Choose a platform 웹 클릭 -> url, 스트림이름(원하는) 입력
![ga5](/assets/blog_img/ga5.png)
6. 측정 ID 복사
![ga6](/assets/blog_img/ga6.png)
- _config.yml 파일의 약 98번째 줄 근처에 Analytics 태그 선정

```python 
# Before
# Analytics
analytics                :
  provider               : false # false (default), "google", "google-universal", "google-gtag", "custom"
  google                 :
    tracking_id          :

#After
# Analytics
analytics:
  provider               : "google-gtag" # false (default), "google", "google-universal", "google-gtag", "custom"
  google:
    tracking_id          : "G-**********"
    anonymize_ip         :  false
```

## 구글 노출

## 네이버 노출




## 게시물 레이아웃 Category Tags 댓글
## 