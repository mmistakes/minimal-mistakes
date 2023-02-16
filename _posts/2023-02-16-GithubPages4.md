---
layout: single
title: '깃허브 블로그 만들기 for Mac OS: 4. 구글 애널리틱스, 구글 및 네이버 노출'
categories: 'GitHubBlog'
tags: ['GitHub Pages', 'Jekyll']
toc: true   # 우측 목차 여부
author_profile: True  # 좌측 프로필 여부
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

1. [Google Webmaster Tools(링크)](https://search.google.com/search-console/welcome?hl=ko) 이동 후 접두어에 링크입력
![gs1](/assets/blog_img/gs1.png)

2.  html 파일 다운로드 후 _config.yml, LINCENSE와 같은 폴더에 이동후 GitHub Push
3.  Push 결과 확인 후 소유권 확인 -> 속성확인 이동
![gs2](/assets/blog_img/gs2.png)

4. 좌측 Sitemaps 클릭 후 사이트맥 URL 입력 (sitemap.xml)
![gs3](/assets/blog_img/gs3.png)

5. 블로그링크/sitemap.xml 주소입력 후 다음과 같은 결과 확인 -> 성공 (시간이 조금 걸릴 수 있음)
![gs4](/assets/blog_img/gs4.png)


## 네이버 노출

1. [Naver Search Advisor](https://searchadvisor.naver.com/) 이동 후 로그인 -> 웹마스터 도구 클릭
![nv1](/assets/blog_img/nv1.png)
2. 블로그 링크 입력 후 HTML 태그 클릭 -> 태그 내 contents 복사 -> _.config.yml line79 에 복사한 내용 붙여넣기 후 Push -> 대기후 소유 확인
![nv2](/assets/blog_img/nv2.png)

```
naver_site_verification  : "1b9d1c5bda4cce1bdcf045be73f5cd32c188cb9c"
```

3.  링크 클릭 후 요청/사이트맥 제출 클릭 -> 블로그링크/sitemap.xml 입력 -> 제출
![nv3](/assets/blog_img/nv3.png)

4. 검증/robots.txt -> 수집요청 클릭

