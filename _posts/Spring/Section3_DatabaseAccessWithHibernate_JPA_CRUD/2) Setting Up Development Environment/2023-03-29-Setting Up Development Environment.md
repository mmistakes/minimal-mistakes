---
layout: single
title: "Spring 배너창 및 쓸데없는 정보 없애기 및 환경설정"
categories: Spring
tag: [Java,EntityManager]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
Hibernate/JPA CRUD (2)
- 스프링 돌릴 떄 배너 및 불필요한 요소 ㅂㅂ
```java
src->main->resources->application.properties

#Turn off the Spring Boot banner
spring.main.banner-mode=off

#Reduce logging level. Set logging level to warn
logging.level.root=warn
```


## Automatic Data source Configuration
- In Spring Boot, Hibernate is the default implementation of JPA
- **EntityManager** is main component for creating queries etc..
- **EntityManager** is from Jakarta Persistence API(JPA)
- Based on configs, Spring Boot will automatically create the beans:
	- DataSource, EntityManager...
- You can then inject these into your app, for example your DAO

## Setting up Project with Spring Initialzr
- At Spring Initializr website, *start.spring.io*
- Add dependencies
	- MySQL driver
	- Spring Data JPA

## Spring Boot - Auto configuration
- Spring Boot will *automatically configure* your data source for you
- Based on entries from Maven pom file
	- JDBC driver
	- Spring Data(ORM)
- DB connection info from ***application.properties***
### application.properties
```java
spring.datasource.url=jdbc:mysql://localhost:3306/student_tracker  
spring.datasource.username=springstudent  
spring.datasource.password=springstudent
```
- No need to give JDBC driver class name
- Spring Boot will automatically detect it based on URL
