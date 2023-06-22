---
layout : single
title : Spring 환경구축
categories: Spring
tags: [SPRING]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: true
sidebar:
  nav: "docs"
---

> ### Spring 환경구축

- 이클립스 help - marketplace - spring 검색
-  Spring Tools 3 (Standalone Edition) 3.9.14.RELEASE 설치

- windows - Perspective  - Open Perspective - others - spring로 변경
- 다시 톰캣 설정 : Preferences - server - Runtime에서 설정
- 같은 경로에서 enc 입력 후 모두 utf-8로 변경
- bin 폴더 직전까지 browse에 넣기

---

> ##### 스프링 프로젝트 생성

- 새 프로젝트 Spring Legacy Project / Spring Starter Project - Spring MVC Project - 이름 설정 com.demo.controller

- pom.xml 파일에서 자바 버전 변경 (1.8), 스프링 프레임워크 변경 (5.0.7), 맨아래 configuration의 source, target 변경 (1.8)
- project 우클릭 - maven - Update project - ok
- JRE System Library 1.8로 변경되었는지 확인
- 서버에 port number http쪽 포트 9090으로 변경 / Modules 에서 /만 남기고 저장

---

> ##### 빌드 및 라이브러리 관리 프로그램

- Maven(메이븐) : 스프링 MVC 프로젝트 생성시 Maver이 함께 설치되어 있다

  pom.xml : Maven에서 사용하는 라이브러리 관리 파일

  https://mvnrepository.com/ : 메이븐 리포지터리 사이트

  (필요한 라이브러리 정보를 구성)

- Gradle(그래들)

---



> ##### 스프링 개발 툴

- 이클립스 : spring 설치
- Visual Studio Code : spring 설치
- http://spring.io/tools 다운 (스프링 전용툴)
- http://www.jetbrains.com/ko-kr/idea/ (상용) : Intellij IDEA
  1. 무료 버진인 커뮤니티 에디션
  2. 유료 버전인 얼티밋 에디션

> ##### 스프링 프레임 워크

- 스프링(전통) : 기존 SI업체
  - 특징 : 설정이 어렵다
- DB : Oracle
- ORM : MyBatis
- 스프링 부트 : 신생 업체
  - 특징 : 설정이 쉽다