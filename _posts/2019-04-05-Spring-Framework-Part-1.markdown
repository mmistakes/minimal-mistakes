---
layout: post
title:  "Java Spring MSA 파트 1"
subtitle: "Student 모델 CRUD (DAL, Data Access Layer)"
author: "코마"
date:   2019-04-05 00:00:00 +0900
categories: [ "java", "spring", "crud", "dal" ]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 오늘은 Java Spring Framework 를 이용하여 간단한 모델링을 해보고 데이터를 넣는 과정을 해보도록 하겠습니다. 

<!--more-->

# 설치 

Java Spring Frmawork 개발 환경은 아래의 세가지를 설치하면 됩니다.

* Java JRE 설치
* Spring Tool Suite (IDE) 설치
* Mysql Server & Workbench 설치
* Postman 설치

설치 및 테스트 프로젝트 작성은 매우 간단하므로 생략하도록 하겠습니다.

설치가 완료된 후에 아래의 절차를 따라 줍니다. 

- sts-4.x.x 를 실행
- File > New > Spring Start Project 클릭
- 아래의 이름을 설정 후 Next
  - Group : com.test.student.dal
- 패키지 추가 
  - mysql
  - jpa
- 프로젝트 생성

# Mysql 데이터베이스 생성

아래의 sql 구문을 작성하고 데이터 베이스를 생성합니다. (For Mysql)

<script src="https://gist.github.com/code-machina/94307c2e8f68d9b8e9c3ac8f2bd2cdf8.js"></script>

# 샘플 작성

아래와 같이 파일을 생성해 줍니다.

- com.test.student.dal.entities : Student.java
- com.test.student.dal.repos : StudentRepository.java

- StudentRepository.java : DependencyInjection 을 통해 Repository 에 CRUD 인터페이스를 제공
- Student.java : Mysql 테이블과 연동한 모델 클래스

## 1. 모델 생성 (Student.java)

Student 모델을 생성 후 이를 Mysql 의 데이터 베이스와 연결 한다. (Annotation 을 활용)

<script src="https://gist.github.com/code-machina/8355d35821eeda08833f76692b5283e2.js"></script>

## 2. Repository 생성 (StudentRepository.java)

CrudRepository 인터페이스를 구현하는 Repository 를 생성 후 이를 사용하여 Model 에 대한 Crud 를 테스트 한다.

<script src="https://gist.github.com/code-machina/b1474dc97e473272daaa670bf8081af8.js"></script>

## 3. 테스트 생성

Java Spring Framework 버전은 최신 버전(2.1.4.RELEASE)

<script src="https://gist.github.com/code-machina/a0c2c2612cec4cfb96ca5fba3edcbe5d.js"></script>

# 요약 정리

모델 객체 선언 후에 이를 DAL 을 통해서 RDB(mysql) 와 연결하는 작업을 진행하였으며 그 결과 CRUD 를 간단하게 구현할 수 있음을 확인할 수 있습니다. 오늘도 구독해주셔서 감사합니다.
