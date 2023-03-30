---
layout: single
title: "JPA Annotations Overview"
categories: Spring
tag: [Java,JPA,commandLineRunner,"@Entity","@Table","@Column","@GeneratedValue","@Id","Lombok"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---

# JPA Dev Process - To do list
1. Annotate Java Class
2. Develop Java Code to perform database operations

## Let's just say "JPA"
- As mentioned, Hibernate is the default JPA implementation in SpringBoot
- Going forward in this course, I will simply use the term:**JPA**
	- Instead of saying "JPA Hibernate"
- We know that by default, Hibernate is used behind the scenes

## Terminology
- Entity Class
	- Java class that is mapped to a database table

## Object-to-Relational Mapping(ORM)

![](https://i.imgur.com/pjAimOb.png)

## Entity Class
- At a minimum, the Entity class
	- Must be annotated with @Entity
	- Must have a public or protected no-argument constructor
		- The class can have other constructors


## Constructors in Java - Refresher
- Remember about constructors in Java
- If you don't declare any constructors
	- Java will provide a no-argument constructor for free
- If you declare constructors with arguments
	- then you do NOT get a no-argument constructor for free
	- In this case, you have to explicitly declare a no-argument constructor

## Java Annotations
- Step 1: Map class to database table
- Step 2: Map fields to database columns

### Step 1: Map class to database table

```java
@Entity
@Table(name="student")
public class Student {
...
}
```
![](https://i.imgur.com/fG8ij5D.png)

### Step 2: Map fields to database columns

```java
@Entity
@Table(name="student")
public class Student {
	@id
	@Column(name="id")
	private int id;

	@Column(name="first_name")
	private String firstName;
}
```
![](https://i.imgur.com/2Tczqw1.png)

### @Column - Optional
- Actually, the use of @Column is optional
- If not specified, the column name is the same name as Java field
- In general, I don't recommend this approach
	- If you refactor the Jaca code, then it will not match existing database columns
	- This is a breaking change and you will need to update database column
- Same applies to @Table database table name is same as the class

## Terminology
- Primary Key
	- Uniquely identifies each row in a table
	- Must be a unique value
	- Cannot contain NULL values

## MySQL - Auto Increment

```MySQL
CREATE TABLE student (

	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(45) DEFAULT NULL,
	last_name varchar(45) DEFAULT NULL,
	email varchar(45) DEFAULT NULL,
	PRIMARY KEY (id)

)
```

## JPA Identity - Primary Key

```java
@Entity
@Table(name="student")
public class Student {

	@id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	...
}
```

## ID Generation Strategies


| Name                    | Description                                                                 |
| ----------------------- | --------------------------------------------------------------------------- |
| GenerationType.AUTO     | Pick an appropriate strategy for the particular database                    |
| GenerationType.IDENTITY | Assign primary keys using database identity column (Recommend)                         |
| GenerationType.SEQUENCE | Assign primary keys using a database sequence                               |
| GenerationType.TABLE    | Assign primary keys using an underlying database table to ensure uniqueness |



## 근데 프로젝트에서 특정한 id를 사용해야되고 제약이 많고 뭐 그럴 경우에는 어떡하지?
- At my company, on out project, nothing that JPA provides out of the box matches our requirement.
	- You can define your own CUSTOM generation strategy
	- Create implementation of ***org.hibernate.id.IdentifierGenerator***
	- Override the method: ***public Serializable generate(...)***

## 데이터 연결작업

### MySQL 과 연결하기
```java
File : src/main/resources/application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/student_tracker  
spring.datasource.username=springstudent  
spring.datasource.password=springstudent
```

```java
@SpringBootApplication  
public class CruddemoApplication {  
  
   public static void main(String[] args) {  
      SpringApplication.run(CruddemoApplication.class, args);  
   }  
  
   @Bean  
   public CommandLineRunner commandLineRunner(String[] args){  
      return runner-> {  
         System.out.println("Hello World");  
      };  
   }  
}
```

## @Entity, @Table 로 데이터 연결

```java
@Entity  
@Table(name="student")  
public class Student {  
  
    // define fields  
    @Id  
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    @Column(name = "id")  
    private int id;  
  
    @Column(name = "first_name")  
    private String firstName;  
  
    @Column(name = "last_name")  
    private String lastName;  
  
    @Column(name = "email")  
    private String email;  
  
  
    // define constructors  
    public Student(){  
  
    }  
  
    public Student(String firstName, String lastName, String email) {  
        this.firstName = firstName;  
        this.lastName = lastName;  
        this.email = email;  
    }  
  
    // define getters/setters  
  
    public int getId() {  
        return id;  
    }  
  
    public void setId(int id) {  
        this.id = id;  
    }  
  
    public String getFirstName() {  
        return firstName;  
    }  
  
    public void setFirstName(String firstName) {  
        this.firstName = firstName;  
    }  
  
    public String getLastName() {  
        return lastName;  
    }  
  
    public void setLastName(String lastName) {  
        this.lastName = lastName;  
    }  
  
    public String getEmail() {  
        return email;  
    }  
  
    public void setEmail(String email) {  
        this.email = email;  
    }  
  
  
    // define toString() method  
  
    @Override  
    public String toString() {  
        return "Student{" +  
                "id=" + id +  
                ", firstName='" + firstName + '\'' +  
                ", lastName='" + lastName + '\'' +  
                ", email='" + email + '\'' +  
                '}';  
    }  
}  

```

- Lombok을 사용하면 코드를 더욱 축소 시킬 수 있다.
- 하지만 롤백에 시간이 오래 걸리고 모든 사람이 롬복 프러그인이 필요하고 기타 등등 단점도 분명 존재한다.
- 또한 Lombok 사용시 모든 계층이 Lombok에 의존하게 되므로 버그 발생시 분리된 모듈이 아닌 전체 어플리케이션에 걸쳐 나타날 수 있다고 한다.
	- Python이 아닌 Java를 쓰는 이유가 사라지는 느낌이라 
	  굳이 써야되나 싶다.
	  
출처 : 유데미, luv2code.com, https://velog.io/@kay019/Lombok%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%95%BC-%ED%95%A0%EA%B9%8C