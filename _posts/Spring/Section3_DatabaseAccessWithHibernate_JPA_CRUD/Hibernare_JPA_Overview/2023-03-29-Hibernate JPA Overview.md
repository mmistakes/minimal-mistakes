---
layout: single
title: "Hibernate, JPA Overview"
categories: Spring
tag: [Java,Hibernate,JPA]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Hibernate 랑 JPA가 뭐지?
- What is Hibernate?
- Benefits of Hibernate?
- What is JPA?
- Benefits of JPA?
- Code Snippets

## What is Hibernate?
- A framework for persisting / saving Java objects in a database
	- www.hibernate.org/orm
	![](https://i.imgur.com/uCE9YU9.png)
## Benefits of Hibernate
- Hibernate handles all of the low-level SQL
- Minimizes the amount of JDBC code you have to develop
- Hibernate provides the Object-to-Relational Mapping(ORM)

### Object-TO-Relational Mapping(ORM)
- The developer defines mapping between Java class and database table
![](https://i.imgur.com/pjAimOb.png)

## What is JPA?
- Jakarta Persistence API(JPA) ... *previously known as Java Persistence API*
	- Standard API for Object-to-Relational-Mapping(ORM)
- Only a specification
	- Defines a set of interfaces
	- Requires an implementation tobe usable

### JPA - Vendor Implementations
![](https://i.imgur.com/v5spGdp.png)

## What are Benefits of JPA
- By having a standard API, you are not locked to vendor's implementation
- Maintain portable, flexible code by coding to JPA spec(interfaces)
- Can theoretically switch vendor implementations
	- For example, if Vendor ABC stops supporting their product
	- You could switch to Vendor XYZ without vendor lock in
### JPA - Vendor Implementations
![](https://i.imgur.com/dqa8QGV.png)

## Saving a Java Object with JPA

![](https://i.imgur.com/iSoqOUv.png)

## Retrieving a Java Object with JPA

![](https://i.imgur.com/fXhDQWy.png)

## Querying for Java Objects

![](https://i.imgur.com/R2rg201.png)

## JPA/Hibernate CRUD Apps

- Create objects
- Read objects
- Update objects
- Delete objects