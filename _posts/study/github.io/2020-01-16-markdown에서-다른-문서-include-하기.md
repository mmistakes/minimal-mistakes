---
title: Jekyll, 마크다운 문법에서 다른 문서 include 하기

categories: 
   - Github.io
   
tags:
   - markdown
   - jekyll
   - include
   
author_profile: true <!-- 작성자 프로필 출력여부 -->
read_time: true <!-- read_time을 출력할지 여부 1min read 같은것! -->

toc: true <!-- Table Of Contents 목차 보여줌 -->
toc_label: My Table of Contents # toc 이름 정의
<!-- toc_icon: "cog" # font Awesome아이콘으로 toc 아이콘 설정 -->
toc_sticky: true # 스크롤 내릴때 같이 내려가는 목차

date: 2020-01-16T17:49:00 <!-- 최초 생성일 -->
last_modified_at: 2020-01-16T17:49:00 <!-- 마지막 수정일 -->

comments: true <!-- 댓글 시스템 사용 -->
---

<!-- intro -->
{% include intro %}

# 들어가며
블로그를 만든 뒤 3개, 4개 정도의 포스트를 쓰다 보니, 상당히 많은 코드(?), 부분이 중복됨을 확인 할 수 있었다.
이를 해결할 수 있는 방식을 찾다보니 **미리 만들어 놓은 코드를 해당 마크 다운 문서에 include 하는 방식**을 찾을 수 있었다.
이를 이용하여, 자주 사용하는 말 `인트로 인사말`, `자주 사용하는 문법`을 미리 문서화 시켜 필요할 때마다 파라미터로 넘겨줌으로 사용할 수 있었다.
지금 본 포스트에 존재하는 인트로도 해당 방법을 통해 구현하였다.
