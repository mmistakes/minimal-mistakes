---
layout: single
title: "장고는 무엇인가?"
categories: 코딩
tag:
  - Django
  - memo
  - blog
toc: true
author_profile: false
sidebar:
  nav: "counts"
---

# 1. 장고에서는 MVC대신 MTV 라고 말합니다.

- controller 대신 template 라고 함.

# 2. 장고(Django)의 개념

특정 영역을 분리하기 위해 사용 

![image-20231101140123423]({{ site.url }}/images/2023-11-01-whatisDjango/image-20231101140123423.png)

장고에서는 모델에서 MANAGERS를 통해 알아서 관리해줌..?

템플릿 안에 로직을 삽입할 수 있음 (복잡한 로직은 아니고, view에서 받은 script파일들이 템플릿에 전달됨)

```
$ django-admin startproject --프로젝트 이름
```

```
$ ./manage.py startapp community
```

## settings.py

- DEBUG
  - 디버그 모드 설정
- INSTALLED_APPS
  - pip로 설치한 앱 또는 본인이 만든 앱을 추가
- MIDDELWARE_CLASSES
  - 요청과 응답 사이의 주요 기능 레이어
- TEMPLATES
  - django template 관련 설정, 실제 뷰(html,변수)
- DATABASES
  - 데이터베이스 엔진의 연결 설정
- STATIC_URL
  - 정적 파일의 URL(css,javascript,image,etc.)

## manage.py

프로젝트 관리 명령어 모음

- startapp - 앱 생성
- runserver - 서버 실행
- createsuperuser - 관리자 생성
- makemigrations app - 앱의 모델 변경사항 체크
- shell - 쉘을 통해 데이터 확인
- collectstatic - static 파일을 한 곳에 모아줌

```
./manage.py runserver 0.0.0.0:8080
```

