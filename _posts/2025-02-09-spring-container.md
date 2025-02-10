---
layout: single
title: 컨테이너리스(Containerless) 정리
categories: spring
tag: [spring, containerless]
toc: true
toc_sticky: true
author_profile: false
sidebar:
    nav: "docs"
search: true
sidebar:
    nav: "counts"
typora-root-url: ../


---

## 📌 컨테이너리스 (Containerless) 정리

## 📚 목차

1. [개념 요약 (핵심 내용 정리)](#개념-요약-핵심-내용-정리)
2. [실무 적용 포인트](#실무-적용-포인트)
3. [코드 예제](#코드-예제)
4. [주요 질문 & 인터뷰 대비](#주요-질문--인터뷰-대비)
5. [트러블슈팅 & 실전 노트](#트러블슈팅--실전-노트)
6. [트레이드 오프 분석](#트레이드-오프-분석)
7. [소프트웨어 아키텍처 관점](#소프트웨어-아키텍처-관점)
8. [이해도 체크 질문](#이해도-체크-질문)
9. [추가 학습 키워드](#추가-학습-키워드)
10. [비슷하거나 반대되는 개념 정리](#비슷하거나-반대되는-개념-정리)

---

## 1️⃣ 개념 요약 (핵심 내용 정리)

### 🔹 컨테이너리스(Containerless)란?
컨테이너리스는 **“컨테이너가 없는”** 것이 아니라, **“개발자가 컨테이너 관리를 신경 쓰지 않아도 된다”**는 개념이다.

### 🔹 배경 및 개념
- 스프링 부트는 **컨테이너리스 웹 애플리케이션** 개발을 쉽게 하기 위해 만들어졌다.
- 기존에는 서블릿 컨테이너(예: Tomcat, Jetty, Undertow 등)를 개발자가 직접 설정하고 배포해야 했다.
- 컨테이너리스는 **서블릿 컨테이너를 자동 설정하고 실행할 수 있도록** 지원해준다.
- 개발자는 비즈니스 로직 개발에만 집중할 수 있도록 한다.

### 🔹 컨테이너리스와 서버리스(Serverless)의 관계
- 서버리스(Serverless)와 유사한 개념이지만 완전히 동일하지 않다.
- 서버리스는 **인프라 자체를 관리할 필요 없게 만드는 것** (예: AWS Lambda).
- 컨테이너리스는 **서블릿 컨테이너 관리 부담을 없애는 것**.

### 🔹 웹 컨테이너(Web Container)와의 관계
- 기존에는 웹 컴포넌트(서블릿)가 **웹 컨테이너(예: Tomcat) 안에서 실행**되었다.
- 웹 컨테이너는 서블릿의 **생명주기 관리, 요청 매핑, 리소스 관리** 등의 역할을 수행했다.
- **컨테이너리스는 웹 컨테이너의 관리 부담을 줄여주고 자동 설정한다.**

---

## 2️⃣ 실무 적용 포인트

- **빠른 개발 환경 구성** → `spring-boot-starter-web` 의존성만 추가하면 자동으로 내장 Tomcat이 실행된다.
- **독립 실행형 애플리케이션(Standalone Application)** → JAR 실행만으로 서버가 동작하는 구조 (`java -jar application.jar`).
- **WAR 배포 없이 실행 가능** → WAR 패키징 없이 JAR만으로 실행 가능하며, CI/CD가 간단해진다.
- **설정 간소화** → `application.properties`에서 최소한의 설정만으로 웹 컨테이너가 자동 실행됨.
- **Docker 컨테이너와 함께 사용 가능** → 컨테이너리스와 Docker는 별개 개념이지만, 필요하면 Docker 기반 배포도 가능.

---

## 3️⃣ 코드 예제

### ✅ 기존 Servlet Container 기반 Spring MVC
```xml
<!-- web.xml에서 서블릿 설정 필요 -->
<servlet>
    <servlet-name>dispatcher</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>dispatcher</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

### ✅ 컨테이너리스 Spring Boot 방식
```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

---

## 4️⃣ 주요 질문 & 인터뷰 대비

### 📌 컨테이너리스란 무엇인가?
컨테이너리스는 **서블릿 컨테이너(Tomcat, Jetty)를 개발자가 직접 관리하지 않아도 되도록 하는 방식**이다.

### 📌 기존 Servlet Container 기반 개발과 컨테이너리스 개발 방식의 차이점?
| **구분**      | **기존 방식 (Servlet Container)** | **컨테이너리스 방식** |
| ------------- | --------------------------------- | --------------------- |
| **설정**      | `web.xml`, `server.xml` 등 필요   | 최소한의 설정         |
| **배포 방식** | WAR 파일 배포                     | JAR 파일 배포 가능    |
| **실행 방식** | Tomcat/Jetty 설치 필요            | `java -jar` 실행 가능 |
| **CI/CD**     | 컨테이너 설치 및 배포 필요        | 간단한 JAR 실행       |

---

## 5️⃣ 트러블슈팅 & 실전 노트

- **Q: 기존 Tomcat 설정을 변경하려면?** → `application.properties`에서 `server.port`, `server.tomcat.max-threads` 등을 조정하면 된다.
- **Q: 내장 Tomcat 대신 Jetty, Undertow를 사용하고 싶다면?** → `spring-boot-starter-web`을 제거하고 원하는 웹 서버 의존성을 추가하면 된다.
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

---

## 6️⃣ 트레이드 오프 분석

| **선택지**                                  | **장점**                               | **단점**                           |
| ------------------------------------------- | -------------------------------------- | ---------------------------------- |
| **컨테이너리스 (Spring Boot 내장 Tomcat)**  | 설정이 간단, JAR 배포 가능, CI/CD 용이 | 세부적인 웹 컨테이너 설정이 제한적 |
| **기존 Servlet Container 사용 (Tomcat 등)** | 다양한 설정 가능, 레거시 시스템과 호환 | 설정이 복잡하고 유지보수 부담 증가 |

---

## 7️⃣ 소프트웨어 아키텍처 관점

- **마이크로서비스 아키텍처 (MSA)** → 컨테이너리스 방식은 MSA에서 개별 서비스 실행을 독립적으로 할 수 있어 유리하다.
- **배포 및 확장성** → JAR 기반 배포가 가능해 DevOps 환경에서 더 쉽게 확장할 수 있다.
- **레거시 시스템과의 통합** → 기존 WAS 환경과 통합하려면 WAR 방식도 지원해야 하는 경우가 있음.

---

## 8️⃣ 이해도 체크 질문

1. 컨테이너리스와 서버리스의 차이점은?
2. Spring Boot에서 내장 Tomcat을 Jetty로 변경하는 방법은?
3. 컨테이너리스 방식이 CI/CD에서 가지는 장점은?
4. Spring Boot가 서블릿 컨테이너를 자동 실행하는 과정은?

---

## 9️⃣ 추가 학습 키워드

- Embedded Tomcat vs External Tomcat
- Spring Boot Actuator
- Java EE vs Spring Boot (Servlet Container 차이)

---

## 🔄 비슷하거나 반대되는 개념 정리

| **개념**                       | **설명**                                         |
| ------------------------------ | ------------------------------------------------ |
| **Serverless**                 | 인프라를 직접 운영하지 않는 방식 (AWS Lambda 등) |
| **Containerless**              | 웹 컨테이너를 직접 관리하지 않는 방식            |
| **Embedded Servlet Container** | Spring Boot 내장 Tomcat, Jetty, Undertow         |

---

