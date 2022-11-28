---
layout: single
title:  "[SpringBoot] Spring Boot 프로젝트 시작"
categories: SpringBoot
tag: [Java, Spring, Spring Boot, STS, Eclipse]
toc: true
author_profile: false
---

<head>
  <style>
    table.dataframe {
      white-space: normal;
      width: 100%;
      height: 240px;
      display: block;
      overflow: auto;
      font-family: Arial, sans-serif;
      font-size: 0.9rem;
      line-height: 20px;
      text-align: center;
      border: 0px !important;
    }

    table.dataframe th {
      text-align: center;
      font-weight: bold;
      padding: 8px;
    }

    table.dataframe td {
      text-align: center;
      padding: 8px;
    }

    table.dataframe tr:hover {
      background: #b8d1f3; 
    }

    .output_prompt {
      overflow: auto;
      font-size: 0.9rem;
      line-height: 1.45;
      border-radius: 0.3rem;
      -webkit-overflow-scrolling: touch;
      padding: 0.8rem;
      margin-top: 0;
      margin-bottom: 15px;
      font: 1rem Consolas, "Liberation Mono", Menlo, Courier, monospace;
      color: $code-text-color;
      border: solid 1px $border-color;
      border-radius: 0.3rem;
      word-break: normal;
      white-space: pre;
    }

  .dataframe tbody tr th:only-of-type {
      vertical-align: middle;
  }

  .dataframe tbody tr th {
      vertical-align: top;
  }

  .dataframe thead th {
      text-align: center !important;
      padding: 8px;
  }

  .page__content p {
      margin: 0 0 0px !important;
  }

  .page__content p > strong {
    font-size: 0.8rem !important;
  }

  </style>
</head>


# Spring Boot 프로젝트 시작

## STS로 스프링 부트 시작하기

- Java Development Kit(JDK): 8이상 (11이상 권장)
- STS 다운로드 : [https://spring.io/tools](https://spring.io/tools)

## 프로젝트 생성하기

Spring Initializer로 프로젝트 세팅 후 STS에서 프로젝트를 시작하는 방법이다.

[https://start.spring.io/](https://start.spring.io/)

![00_1.png](/assets/images/springboot01/00_1.png)

- 프로젝트 환경
    - Tool : STS
    - build : Maven
    - Language : Java
    - Spring Boot Version : 2.7.4
    - Packageing : Jar
    - JAVA Version : 8

이니셜라이저를 사용하게 되면 프로젝트를 좀 더 간편하게 생성할 수 있다.

필요한 기능을 사용하기 위해 우측의 Dependencies에서 선택하여 프로젝트를 생성할 수 있기 때문에 초반 세팅에 귀찮은 작업에 낭비되는 시간을 절약할 수 있다.

프로젝트 셋팅 완료 후 다운로드 받은 후, 해당 파일을 STS의 workspace로 이동시킨다.

## Spring Boot 프로젝트 설정

## 1. porm.xml 설정

### **POM(프로젝트 객체 모델(Project Object Model))**

- Maven의 기능을 이용하기 위해서 POM이 사용된다.
- POM은 pom.xml파일을 말하며 pom.xml은 Maven을 이용하는 프로젝트의 root에 존재하는 xml 파일이다.
    
    (하나의 자바 프로젝트에 빌드 툴을 Maven으로 설정하면, 프로젝트 최상위 디렉토리에 "pom.xml"이라는 파일이 생성된다.)
    
- 파일은 프로젝트마다 1개이며, pom.xml만 보면 프로젝트의 모든 설정, 의존성 등을 알 수 있다.
- 다른 파일이름으로 지정할 수도 있다. (mvn -f 파일명.xml test). 하지만 pom.xml으로 사용하기를 권장

**ex) pom.xml 예시**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.7.4</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.example</groupId>
	<artifactId>demo</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>demo</name>
	<description>Demo project for Spring Boot</description>
	<properties>
		<java.version>1.8</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.mybatis.spring.boot</groupId>
			<artifactId>mybatis-spring-boot-starter</artifactId>
			<version>2.2.2</version>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-devtools</artifactId>
			<scope>runtime</scope>
			<optional>true</optional>
		</dependency>
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<optional>true</optional>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
		<!--ThymeLeaf-->
		<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
		
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
				<configuration>
					<excludes>
						<exclude>
							<groupId>org.projectlombok</groupId>
							<artifactId>lombok</artifactId>
						</exclude>
					</excludes>
				</configuration>
			</plugin>
		</plugins>
	</build>

</project>
```

### 엘리먼트

- modelVersion : POM model의 버전
- parent : 프로젝트의 계층 정보
- groupId : 프로젝트를 생성하는 조직의 고유 아이디를 결정한다. 일반적으로 도메인 이름을 거꾸로 적는다.
- artifactId : 프로젝트 빌드시 파일 대표이름 이다. groupId 내에서 유일해야 한다. Maven을 이용하여 빌드시 다음과 같은 규칙으로 파일이 생성 된다.
    
    artifactid-version.packaging. 위 예의 경우 빌드할 경우 bo-0.0.1-SNAPSHOT.war 파일이 생성된다.  (하단 예시 파일 참고)
    
- version : 프로젝트의 현재 버전, 프로젝트 개발 중일 때는 SNAPSHOT을 접미사로 사용.
- packaging : 패키징 유형(jar, war, ear 등)
- name : 프로젝트, 프로젝트 이름
- description : 프로젝트에 대한 간략한 설명
- url : 프로젝트에 대한 참고 Reference 사이트
- properties : 버전관리시 용이 하다. ex) 하당 자바 버전을 선언 하고 dependencies에서 다음과 같이 활용 가능 하다.
    
    <version>${java.version}</version>
    
- dependencies : dependencies태그 안에는 프로젝트와 의존 관계에 있는 라이브러리들을 관리 한다.
- build : 빌드에 사용할 플러그인 목록

### 라이브러리

Spring부트는 spring-boot-starter로 시작하는 라이브러리를 제공한다. starter-parent에 지정된 라이브러리 버전을 따른다.

- spring-boot-starter-web
    
    : Spring MVC를 사용한 RESTful서비스를 개발하는데 사용.
    
- spring-boot-starter-test
    
    : Junit, Hamcrest, Mockito를 포함하는 스프링 어플리케이션을 테스트 가능하도록 한다.
    
- spring-boot-devtools
    
    : devtools는 Spring boot에서 제공하는 개발 편의를 위한 모듈이다. 쉽게 말하면 브라우저로 전송되는 내용들에 대한 코드가 변경되면, **자동으로 어플리케이션을 재시작**하여 브라우저에도 업데이트를 해주는 역할을 한다.
    
- mybatis-spring-boot-starter
    
    : 스프링부트 위에 MyBatis 애플리케이션을 빠르게 빌드 할 수 있다. 
    
    - DataSource 를 자동 감지합니다.
    - SqlSessionFactory 를 전달 하는 인스턴스를 자동 생성하고 등록합니다
    - DataSource.SqlSessionFactoryBean 의 인스턴스를 만들고 등록합니다.
    - @Mapper주석이 표시된 매퍼를 자동 스캔하고에 연결합니다.
    - SqlSessionTemplateSpring 컨텍스트에 등록하여 Bean에 주입 할 수 있도록합니다.
- mysql-connector-java
    
    : 스프링부트에서 MySQL을 사용하기 위한 라이브러리
    
- lombok
    
    : Java 라이브러리로 반복되는 getter, setter, toString 등의 메서드 작성 코드를 줄여주는 코드 다이어트 라이브러리
    
- spring-boot-starter-thymeleaf
    
    : ThymeLeaf 템플릿을 사용하기 위한 라이브러리
    

## 2. application.properties 설정

이 파일은 스프링부트가 애플리케이션을 구동할 때 자동으로 로딩하는 파일이다.

key - value 형식으로 값을 정의하면 애플리케이션에서 참조하여 사용할 수 있다.

![01_1.png](/assets/images/springboot01/01_1.png)

- url을 호출할 때 필요한 context-path
- Server 포트 설정
    
    기본 포트는 8080
    
- JSP View Resolver(JSP 사용할 때)
- MySQL 접속 정보
- mapper.xml 경로 설정(별도의 경로를 사용할 때 설정)
- ThymeLeaf 설정
    
    기본 경로는 classpath:/templates/