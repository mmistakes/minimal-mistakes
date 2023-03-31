---
layout: single
title: "Hibernate, JPA Overview"
categories: Spring
tag: [Java,Hibernate,JPA,JDBC,ORM]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Hibernate 랑 JPA가 뭐지?
Hibernate/JPA CRUD (1)

- What is Hibernate?
- Benefits of Hibernate?
- What is JPA?
- Benefits of JPA?
- Code Snippets

## What is Hibernate?
- A framework for persisting / saving Java objects in a database
- www.hibernate.org/orm
	![](https://i.imgur.com/uCE9YU9.png)
### save(), pertsist()?
- save() - Persist the given transient instance, first assigning a generated identifier. (Or using the current value of the identifier property if the assigned generator is used.) This operation cascades to associated instances if the association is mapped with cascade="save-update".
- persist() - Make a transient instance persistent. This operation cascades to associated instances if the association is mapped with cascade="persist". The semantics of this method are defined by JSR-220.

| Key                    | save()                                                      | persist()                                                 |
| ---------------------- | ----------------------------------------------------------- | --------------------------------------------------------- |
| Basic                  | It stores object in database                                | It also stores object in database                         |
| Return Type            | It return generated id and return type is serializable      | It does not return anything. Its void return type.        |
| Transaction Boundaries | It can save object within boundaries and outside boundaries | It can only save object within the transaction boundaries |
| Detached Object        | It will create a new row in the table for detached object   | It will throw persistence exception for detached object   |
| Supported by           | It is only supported by Hibernate                           | It is also supported by JPA                                                          |

## Benefits of Hibernate
- Hibernate handles all of the low-level SQL
- Minimizes the amount of JDBC code you have to develop
- Hibernate provides the Object-to-Relational Mapping(ORM)

### What is JDBC?
- JDBC stands for **J**ava **D**atabase **C**onnectivity. It is a Java library/specification released by sun microsystems. 
- It enables Java applications to communicate with databases.
- A JDBC driver is an implementation of the above-mentioned specification i.e. it contains the classes and interfaces to communicate with the database. 
- Using JDBC driver and JDBC API you can write Java applications which will send a request to the database and retrieve the results.
- I.e. you can connect to the database, create SQL statements, Execute the SQL statements, access and modify the resultant tables using this library.
- Fundamentally, JDBC is a specification that provides a complete set of interfaces that allows for portable access to an underlying database. 
- Java can be used to write different types of executables, such as −
	-   Java Applications
	-   Java Applets
	-   Java Servlets
	-   Java ServerPages (JSPs)
	-   Enterprise JavaBeans (EJBs).
- All of these different executables are able to use a JDBC driver to access a database, and take advantage of the stored data. 
- JDBC provides the same capabilities as ODBC, allowing Java programs to contain database-independent code.
- ![](https://www.tutorialspoint.com/assets/questions/media/19619/jdbc_driver_manager.jpg)

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
	- 
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

출처 : luv2code.com , https://www.tutorialspoint.com/difference-between-save-and-persist-in-hibernate, https://www.tutorialspoint.com/what-is-jdbc