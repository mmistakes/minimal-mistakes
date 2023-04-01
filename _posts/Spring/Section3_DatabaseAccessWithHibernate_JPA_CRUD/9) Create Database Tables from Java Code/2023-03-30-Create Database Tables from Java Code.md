---
layout: single
title: "Create Database Tables from Java Code"
categories: Spring
tag: [Java,Hibernate,JPA]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Create database tables: student
- Hibernate/JPA CRUD (9)
- Previously, we created database tables by running a SQL script
- JPA/Hibernate provides an option to automagically create database tables
- Creates tables based on Java code with JPA/Hibernate annotations
- Useful for development and testing
![](https://i.imgur.com/TXCpSX6.png)

## Configuration
- In Spring Boot configuration file:application.properties
```java
# Add logging configs to display SQL statements  

# Log SQL statements  
logging.level.org.hibernate.SQL=debug  

# Log values for SQL statement  
logging.level.org.hibernate.orm.jdbc.bind=trace

# # Configure JPA/Hibernate to auto create the tables
spring.jpa.hibernate.ddl-auto=create
-> DROP & CREATE evey time
```
- When you run your app, JPA/Hibernate will ***drop*** tables then ***create*** them
- Based on the JPA/Hibernate annotations in your Java code

## Creating Tables based on Java Code
![](https://i.imgur.com/OXbE00U.png)


## Configuration - application.properties

```java
spring.jpa.hibernate.ddl-auto=PROPERTY-VALUE
```

| Property Value | Property Description                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| none           | No action will be performed                                                                                         |
| create-only    | Database tables are only created                                                                                    |
| drop           | Database tables dropped (When database tables are dropped, all data is lost)                                        |
| create         | Database tables are dropped followed by database tables creation                                                    |
| create-drop    | Database tables are dropped followed by database tables creation. On application shutdown, drop the database tables |
| validate       | Validate the database tables schema                                                                                 |
| update         | Update the database tables schema                                                                                   |


## Basic Projects
- For basic projects, can use auto configuration
```java
spring.jpa.hibernate.ddl-auto=create
```
- Database tables are ***dropped*** first and then ***created*** from scratch
	- Note: When database tables are dropped, all data is lost

- If you want to create tables once.. and then keep data, use:update
```java
spring.jpa.hibernate.ddl-auto=update
```
- However, will ALTER database schema based on latest code updates
- Be VERY careful here ... only use for basic projects

### Warning

```java
spring.jpa.hibernate.ddl-auto=create
```
- Don't do this on ***Production*** databases !!
- You don't want to ***drop*** your Production data
	- ***All data is deleted!!!***
-  Instead for Production, you should have DBAs run SQL scripts

## Use Case

```java
spring.jpa.hibernate.ddl-auto=create
```
- Automatic table generation is useful for
	- Database integration testing with in-memory databases
	- Basic, small hobby projects

## Recommendation
- In general, I don't recommend auto generation for enterprise, real-time projects
	- You can VERY easily drop PRODUCTION data if you are not careful

- I recommend SQL scripts
	- Corporate DBAs prefer SQL scripts for governance and code review
	- The SQL scripts can be customized and fine-turned for complex database designs
	- The SQL scripts can be version-controlled
	- Can also work with schema migration tools such as Liquibase and Flyway

개인프로젝트가 아닌 이상
웬만하면 SQL scripts 사용하는게 여러모로 좋다.