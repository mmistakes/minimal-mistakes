---
layout: single
title:  "Spring Data JPA란?"
categories: SpringBoot
tag: [Java, Spring, JPA, Spring Boot, STS, Eclipse]
toc: true
toc_sticky: true

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



## ORM이란?

어플리케이션의 객체와 관계형 데이터베이스의 데이터를 자동으로 매핑해주는 것을 의미

- Java의 데이터 클래스와 관계형 데이터베이스의 테이블을 매핑

객체지향 프로그래밍과 관계형 데이터베이스의 차이로 발생하는 제약사항을 해결해주는 역할을 수행

대표적으로 JPA, Hibernate 등이 있음 (Persistent API)

## ORM의 장점

1. SQL 쿼리가 아닌 직관적인 코드로 데이터를 조작할 수 있음
    - 개발자가 보다 비즈니스 로직에 집중할 수 있음
2. 재사용 및 유지보수가 편리
    - ORM은 독릭접으로 작성되어 있어 재사용이 가능
    - 매핑정보를 명확하게 설계하기 때문에 따로 데이터베이스를 볼 필요가 없음
3. DBMS에 대한 종속성이 줄어듬
    - DBMS를 교체하는 작업을 비교적 적은 리스크로 수행 가능

## ORM의 단점

1. 복잡성이 커질 경우 ORM만으로 구현하기 어려움
    - 직접 쿼리를 구현하지 않아 복잡한 설계가 어려움
2. 잘못 구현할 경우 속도 저하 발생
3. 대형 쿼리는 별도의 튜닝이 필요할 수 있음

## JPA (Java Persistance API)

### **Hibernate**

ORM Framework중 하나

JPA의 실제 구현체 중 하나이며, 현재 JPA 구현체 중 가장 많이 사용됨

![00_1.png](/assets/images/springboot03/00_1.png)

### Spring Data JPA

Spring Framework에서 JPA를 편리하게 사용할 수 있게 지원하는 라이브러리

- CRUD 처리용 인터페이스 제공
- Repository 개발 시 인터페이스만 작성하면 구현 객체를 동적으로 생성해서 주입
- 데이터 접근 계층 개발시 인터페이스만 작성해도 됨

Hibernate에서 자주 사용되는 기능을 조금 더 쉽게 사용할 수 있게 구현