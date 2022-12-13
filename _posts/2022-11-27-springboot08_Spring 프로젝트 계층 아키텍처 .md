---
layout: single
title:  "Spring 프로젝트 계층 아키텍처"
categories: SpringBoot
tag: [Java, Spring, JPA, Spring Boot, 아키텍쳐]
toc: true
toc_sticky: true
post-header: false

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


스프링의 계층은 **Presentation Layer**, **Business, Layer**, **Data Access Layer** 크게 3개로 나눌 수 있다.

![01.png](/assets/images/springboot08/01.png)

## 각 계층의 역할 및 특징 정리

### 프레젠테이션 계층

- 브라우저상의 웹 클라이언트의 요청 및 응답을 처리하는 계층이다
- Service 계층, Data Access 계층에서 발생하는 Exception을 처리
- @Controller 어노테이션을 사용하여 작성된 Controller 클래스가 이 계층에 속함

### 서비스 계층

- 애플리케이션 비즈니스 로직 처리와 비즈니스와 관련된 도메인 모델의 적합성 검증
- 트랜잭션을 관리한다
- Presentation 계층과 Data Access 계층 사이에서 직접적으로 통신하지 않게 함
- Service 인터페이스와 @Service 어노테이션을 사용하여 작성된 Service 구현 클래스가 이 계층에 속함

### 데이터 엑세스 계층

- ORM(Mybatis 혹은 Hibernate)를 주로 사용하는 계층
- DAO 인터페이스와 @Repository 어노테이션을 사용하여 작성된 DAO 구현 클래스가 이 계층에 속함
- 데이터베이스에 CRUD하는 계층

### 프로젝트에서 직접 작성했던 Repository 인터페이스

![02.png](/assets/images/springboot08/02.png)

### 도메인 모델 계층

- DB의 테이블과 매칭될 클래스
- Entity 클래스라고도 부른다.

## 계층에 관한 용어 정리

### DTO (Data Transfer Object)

- 각 계층간 데이터 교환을 위한 객체 (데이터를 주고 받을 형태 혹은 포맷)
- Domain, VO라고도 부름
- DB에서 데이터를 얻어 Service, Controller 등으로 보낼때 사용함
- 로직을 갖지 않고 순수하게 getter, setter 메소드를 가진다.

![03.png](/assets/images/springboot08/03.png)

### DAO (Data Access Object)

- DB에 접근하는 객체 혹은 DB를 사용해 데이터를 조작하는 기능을 하는 객체
- MyBatis 사용시에 DAO or Mapper, JPA 사용시에 Repository
- Service 계층과 DB를 연결하는 고리 역할을 한다.

### Entity 클래스

- Domain 이라고도 부름 (JPA에서 사용)
- 실제 DB 테이블과 매칭될 클래스
- Entity 클래스 또는 가장 Core한 클래스라고 부름
- Domain 로직만을 가지고 있어야하며 Presentation Logic을 가지고 있어서는 안됨

![04.png](/assets/images/springboot08/04.png)

## Domain 클래스와 DTO 클래스를 분리하는 이유

![05.png](/assets/images/springboot08/05.png)

- 테이블과 매핑되는 Entity 클래스가 변경되면 여러 클래스에 영향을 끼치게 되지만 View와 통신하는 DTO 클래스는 자주 변경되므로 분리할 필요가 있음
- DTO는 Domain Model을 복사한 형태로, 다양한 Presentation Logic을 추가한 정도로 사용함
- View Layer와 DB Layer의 역할을 철저하게 분리하기 위해

## RestController와 @Service를 나누는 이유

- 모든 기능들을 세분화해서 서비스 계층에 작성하고 나중에는 서비스의 기능들을 **조합**만 해서 새로운 기능으로 만들 수 있음
- 중복되는 코드가 발생하면 따로 모듈화를 해서 나눠주면 **유지보수**하기 편리하다.
- 비즈니스 로직을 서비스 구현체에서 구현하여 **확장성**과 **재사용성** 그리고 **중복 코드 제거**를 확보할 수 있다.

### Service 계층에서 비즈니스 로직 처리

프로젝트에서 내가 직접 구현했던 Service 구현 클래스

![06.png](/assets/images/springboot08/06.png)