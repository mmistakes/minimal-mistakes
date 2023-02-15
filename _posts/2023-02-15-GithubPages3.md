---
layout: single
title: '깃허브 블로그 만들기 for Mac OS: 3. 기본 레이아웃 설정 (테마, 타이틀, 링크, 날짜 설정 등)'
categories: 'GitHubBlog'
tags: ['GitHub Pages', 'Jekyll']
toc: true   # 우측 목차 여부
author_profile: True   # 좌측 프로필 여부
---


## 시작
- [Quick Start Guide](https://mmistakes.github.io/minimal-mistakes/docs/configuration/)를 참고하면 모든 자료가 나와있다
- **_config.yml 파일 수정**

## 기본 테마 변경

```python
#skin 바꾸기(15번째줄) 
minimal_mistakes_skin    : "mint" # "air", "aqua", "contrast", "dark", "dirt", "neon", "mint", "plum", "sunrise"
```

## 블로그 첫화면 레이아웃 상단 및 하단 글
![layout1](/assets/blog_img/layout1.png)
![layout2](/assets/blog_img/layout2.png)
![layout3](/assets/blog_img/layout3.png){: width="300" height="170"}

```python
# Site Settings(17번째줄 부터)
locale                   : "ko-KR" #지역 설정
title                    : "Data Sciathlete's Blog" #제목
title_separator          : "|" # 페이지 들어갔을 때 이름이 title|페이지 이름으로 나옴 사진 세번쨰
subtitle                 : "#BigData #DeepLearning #NLP #DataEngineering" # 소제목
name                     : "D.H.Ann" # 최하단 이름
```

## 블로그 첫화면 레이아웃 좌측과 하단 링크
```python
# Site Author(106번째줄 부터)
author:
  name             : "Ann, Dong Hyun" #이름
  avatar           : "assets/IMG_3830.JPG" # 사진
  bio              : "운동 좋아하는 데이터쟁이" # 사진 아래 설명
  location         : "Seongnam, Gyeonggi" # 지역
  email            : # 개인적으로 이 부분에 이메일 쓰는 것 보다는 아래에 쓰는 것이 보기 좋았음
  links:
    - label: "Email"
      icon: "fas fa-fw fa-envelope-square"
      url: mailto: email # mailto: 꼭 붙여줘야 함 
    - label: "Website"
      icon: "fas fa-fw fa-link"
      url: website Link
    - label: "GitHub"
      icon: "fab fa-fw fa-github"
      url: GitHub Link
    - label: "Instagram"
      icon: "fab fa-fw fa-instagram"
      url: Instagram Link

# Site Footer
footer:
  links:
    - label: "GitHub"
      icon: "fab fa-fw fa-github"
      url: GitHub Link
    - label: "Instagram"
      icon: "fab fa-fw fa-instagram"
      url: Instagram Link
```

## 날짜 추가
- 게시물 하단에 날짜 추가 하는 방법은 
![layout4](/assets/blog_img/layout4.png)

```python
# Defaults (263번줄부터 = 맨아래)
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      author_profile: true
      read_time: true
      comments: true
      share: true
      related: true
      show_date: true # 이부분을 추가해준다

date_format: "%Y-%m-%d"  # 원하는 형식으로 지정
```






