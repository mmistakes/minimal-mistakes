---
layout: single
title: "Saving a Java Object with JPA"
categories: Spring
tag: [Java,JPA,"@Transactional","JDBC"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# JPA로 자바 오브젝트로 저장하기?

## Sample App Features
- Create a new Student
- Read a Student
- Update a Student
- Delete a Student

## Student Data Access Object
- Responsible for interfacing with the database
- This is a common design pattern: DataAccessObject(DAO)
- Our DAO needs a JPA Entity Manager
- JPA Entity Manager is the main component for saving/retrieving entities
![](https://i.imgur.com/YIShNPt.png)
### JPA Entity Manager
- Our JPA Entity Manager needs a Data Source
- The Data Source defines database connection info
- JPA Entity Manager and Data Source are automatically created by Spring Boot
	- Based on the file: application.properties(JDBC URL, user id, password, etc...)
- We can autowire/inject the JPA Entity Manager into out Student DAO
![](https://i.imgur.com/BPHX3hD.png)

## Student DAO
- Step 1: Define DAO interface
- Step 2: Define DAO implementation
	- Inject the entity manager
- Step 3: Update main app

### Step 1: Define DAO interface

```java
public interface StudentDAO {  
    void save(Student theStudent);  
}
```

### Step 2: Define DAO implementation

![](https://i.imgur.com/NdLObA8.png)

![](https://i.imgur.com/foWgm7O.png)



### Step 3: Update main app

![](https://i.imgur.com/TTqEDff.png)


## Spring @Transactional
- Spring provides an ***@Transactional*** annotation
- **Automagically** begin and end a transaction for your JPA code
	- No need for you to explicitly do this in your code
- This Spring **magic** happens behind the scenes

## Specialized Annotation for DAOs
- Spring provides the @Repository annotation
![](https://i.imgur.com/fCGNeXC.png)
- Applied to DAO implementations
- Spring will automatically register the DAO implementation
	- thanks to component-scanning
- Spring also provides translation of any JDBC related exceptions




















출처 : 유데미, luv2code.com