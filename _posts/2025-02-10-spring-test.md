---
layout: single
title: Spring Boot의 Opinionated 철학 정리
categories: spring
tag: [spring, Opinionated]
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

# 📌 Spring Boot의 Opinionated 철학 정리

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

### 주제: Spring Boot의 Opinionated 철학

- **정의**:  
  Spring Boot는 *Opinionated(자기 주장이 강한)* 철학을 가진 프레임워크로, 개발자가 기술 선택과 설정에 고민하지 않도록 사전 결정된 구성과 기본 설정을 제공한다.

- **주요 기능**:
  - 개발자가 직접 설정해야 하는 항목을 최소화
  - 표준 기술과 검증된 라이브러리 및 버전을 기본 제공
  - Spring의 다양한 기술과 통합을 쉽게 만들어 줌

- **사용 목적**:
  - 빠른 애플리케이션 개발을 지원
  - 최적의 기술 조합을 제공하여 개발자가 고민할 필요 없도록 함
  - Spring 생태계와의 강한 통합으로 유지보수성과 확장성을 높임

---

## 2️⃣ 실무 적용 포인트

- **Spring Boot의 기본 철학을 이해하고 활용하기**
- **사전 구성된 라이브러리와 설정을 최대한 활용하여 개발 속도 향상**
- **불필요한 설정을 줄이고, 도메인 로직 개발에 집중**

### ✅ Spring Boot가 결정해주는 것
- 사용 기술 및 라이브러리 선택
- 라이브러리의 버전 관리
- 기본적인 설정 값 제공

### ⚠ 설정을 수정해야 할 경우
- Spring Boot가 기본 제공하는 설정을 수정할 때는 신중해야 함
- 특정 요구사항이 있을 경우 커스터마이징 가능하지만, 변경 범위가 커질수록 Spring Boot의 장점이 감소

---

## 3️⃣ 코드 예제

### Spring Boot가 자동 설정을 제공하는 예제

#### ✅ JPA 자동 설정 예제

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}
```

```properties
# application.properties에서 최소한의 설정만 하면 JPA가 동작함
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=secret
spring.jpa.hibernate.ddl-auto=update
```

#### ✅ Spring Boot Starter를 활용한 자동 설정

```xml
<!-- Spring Boot의 스타터를 사용하면 JPA와 관련된 라이브러리들이 자동으로 포함됨 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

---

## 4️⃣ 주요 질문 & 인터뷰 대비

- **Spring과 Spring Boot의 철학적 차이는?**
  - Spring Framework → *Not Opinionated* (기술 선택의 자유도 높음)
  - Spring Boot → *Opinionated* (최적의 기술 조합과 설정을 제공)

- **Spring Boot의 Opinionated 설계 철학의 장점과 단점?**
  - **장점**: 빠른 개발 가능, 검증된 기술 스택 제공, 유지보수 용이
  - **단점**: 기본 설정이 프로젝트 요구사항과 맞지 않을 경우 커스터마이징이 필요하고, 지나친 수정 시 장점이 사라짐

- **Spring Boot에서 JPA를 사용할 때 자동 설정되는 것은?**
  - Hibernate, EntityManager, 트랜잭션 관리, DataSource 설정 등이 자동으로 구성됨

---

## 5️⃣ 트러블슈팅 & 실전 노트

- **Spring Boot 자동 설정이 예상과 다르게 동작할 경우**
  - `spring-boot-starter-*` 의존성을 확인하고, 필요한 라이브러리가 올바르게 추가되었는지 확인
  - `@SpringBootApplication` 내부의 `@EnableAutoConfiguration`을 확인하여 자동 설정이 활성화되었는지 체크

- **Spring Boot의 기본 설정을 변경해야 할 경우**
  - `application.properties` 또는 `application.yml`을 활용하여 설정
  - 커스텀 `@Configuration` 클래스를 작성하여 세부 조정

---

## 6️⃣ 트레이드 오프 분석

| 선택지                        | 장점                        | 단점                                                         |
| ----------------------------- | --------------------------- | ------------------------------------------------------------ |
| Spring Boot 기본 설정 사용    | 빠른 개발, 검증된 설정 제공 | 요구사항과 맞지 않을 경우 수정이 필요                        |
| Spring Boot 설정 커스터마이징 | 유연한 설정 가능            | Spring Boot의 장점(빠른 개발, 유지보수성 등)이 감소할 수 있음 |

---

## 7️⃣ 소프트웨어 아키텍처 관점

- Spring Boot는 모듈화된 아키텍처를 지향하며, 의존성 관리 및 통합을 간편하게 제공
- 설정 작업이 줄어들어 개발 속도가 빨라지고, 유지보수성이 향상됨
- 확장성 고려: 기본 설정을 유지하면서 커스터마이징할 경우, 장점을 최대한 살릴 수 있도록 설계해야 함

---

## 8️⃣ 이해도 체크 질문

1. Spring Boot의 Opinionated 철학이란?
2. Spring Boot가 자동 설정해주는 것은?
3. Spring Boot의 설정을 변경할 때 어떻게 접근해야 하는가?
4. Spring과 Spring Boot의 가장 큰 차이점은?
5. Spring Boot의 Opinionated 설정을 활용하면 얻는 이점은?

---

## 9️⃣ 추가 학습 키워드

- Spring Boot Starter 패키지
- Spring Boot Auto Configuration
- Spring Boot Custom Configuration 
- Spring Boot와 Spring Cloud의 관계

---

## 10. 비슷하거나 반대되는 개념 정리

| 개념                                   | 설명                                                    |
| -------------------------------------- | ------------------------------------------------------- |
| **Spring Framework (Not Opinionated)** | 개발자가 모든 설정을 직접 선택해야 함                   |
| **Spring Boot (Opinionated)**          | 사전 구성된 설정과 라이브러리를 제공하여 빠른 개발 가능 |
| **자동 설정 (Auto Configuration)**     | Spring Boot에서 기본적으로 설정을 제공하는 기능         |

---

✅ **결론**: Spring Boot는 최적의 기술 조합을 자동으로 제공하여 빠른 개발을 지원하며, 필요 시 커스터마이징이 가능하지만 지나치게 변경하면 Spring Boot의 장점이 사라질 수 있다.



스프링 배포 테스트 2