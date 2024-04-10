---
layout: single
title:  "SpringBoot- ORM, JPA, Hibernate, Spring Data JPA grammar"
categories: SpringBoot
tag: [SpringBoot]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---
<br>





# ◆ORM

ORM은 객체와 DB 테이블이 매핑을 이루는 것을 의미한다. 즉, 내가 코드 상에서 생성한 객체가 DB상에 어떤 테이블과 연결이 된다는 것을 의미한다. <br>이렇게 되면 내가 객체를 조작함으로써 DB를 조작할 수 있게 된다.

<br>



---



# ◆JPA

## 1. JPA 개념

JPA는 Java Persistence API의 약자로, **자바 어플리케이션에서 관계형 데이터베이스를 사용하는 방식을 정의한 인터페이스**이다.<br/><br/>



> JPA는 영속성 컨텍스트인 EntityManager를 통해 Entity를 관리하고 이러한 Entity가 DB와 매핑되어 사용자가 Entity에 대한 CRUD를 실행을 했을 때 Entity와 관련된 테이블에 대한 적절한 SQL 쿼리문을 생성하고 이를 관리하였다가 필요시 JDBC API를 통해 DB에 날리게 된다.
> 
- 영속성 컨텍스트는 Entity에 대한 캐시라고 생각하면 이해가 빠르게 될것이다.
- Entity는 DB의 Entity와 동일한 개념이고 단지 이를 Java라는 객체지향 언어에서 객체로 관리하는 것을 의미한다. <a href="https://pueser.github.io/springboot/SpringBoot-Entity/">Entity</a>
- EntityManager는 Entity를 생명주기를 관리하는 context로 Persistence Context 역할을 수행해준다. 마치 메모리에서 데이터를 언제 올리고 어떻게 내릴지에 관해 관리하는 것처럼 말이다.<br/><br/>



**<조회과정>**

![JPA과정](https://github.com/pueser/Thefesta_android/assets/117990884/fe1753ae-debc-4cdc-8b04-611b1f757320)

<br>


---


## 2. JPA 환경설정

buil.gradle 파일
```java
implementation 'org.springframework.boot:spring-boot-starter-data-jpa
```
<br/><br/>


application.properties파일
```java
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.show_sql=true
```
<br/><br/>
- spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect: 스프링 부트와 하이버네이트를 함께 사용할때 필요한 설정항목
- spring.jpa.hibernate.ddl-auto=update: 엔터티를 기준으로 데이터의 테이블을 생성하는 규칙
- spring.jpa.properties.hibernate.format_sql=true, spring.jpa.properties.hibernate.show_sql=true: 실행 쿼리문이 콘솔로그에서 확인할 수있도록하는 설정항목

<br>



---



# ◆Hibernate

Hibernate는 **JPA라는 명세의 구현체**이다. <br> **JPA와 Hibernate는 마치 자바의 interface와 해당 interface를 구현한 class와 같은 관계**이다.<br/><br/>
하지만  **JPA를 사용하기 위해서 반드시 Hibernate를 사용할 필요가 없다**. <br>
Hibernate의 작동 방식이 마음에 들지 않는다면 언제든지 DataNucleus, EclipseLink 등 다른 JPA 구현체를 사용해도 되고, 심지어 본인이 직접 JPA를 구현해서 사용할 수도 있다. 

<br>




---




# ◆Spring Data JPA

Spring Data JPA는 Spring에서 제공하는 모듈 중 하나로, 개발자가 JPA를 더 쉽고 편하게 사용할 수 있도록 도와준다. <br>
이는 **JPA를 한 단계 추상화시킨 `Repository`라는 인터페이스를 제공함으로써 이루어진다**. <br>
사용자가 `Repository` 인터페이스에 정해진 규칙대로 메소드를 입력하면, Spring이 알아서 해당 메소드 이름에 적합한 쿼리를 날리는 구현체를 만들어서 Bean으로 등록해준다.

