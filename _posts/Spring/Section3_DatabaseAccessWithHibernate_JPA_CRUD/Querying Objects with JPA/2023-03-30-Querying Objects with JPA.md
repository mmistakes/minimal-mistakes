---
layout: single
title: "Querying Objects with JPA"
categories: Spring
tag: [Java,JPA,JPQL,"??"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# JPA Query Language (JPQL)
- Query language for retrieving onjects
- Similar in concept to SQL
	- where, like, order by, join, in, etc...
- However, JPQL is based on **entity name** and **entity fields**

## Retrieving all Students
![](https://i.imgur.com/t5cKEBU.png)

### Retrieving Students: lastName= "Doe"
![](https://i.imgur.com/LitLZn9.png)


### Retrieving Students using OR predicate:
![](https://i.imgur.com/1vdYhis.png)

### Retrieving Students using LIKE predicate:
![](https://i.imgur.com/nQAq26D.png)

## JPQL - Named Parameters

![](https://i.imgur.com/Gol9Mcb.png)

## Development Process
1. Add new method to DAO interface
2. Add new method to DAO implementation
3. Update main app

### Step 1: Add new method to DAO interface
```java
public interface StudentDAO {
	...
	List<Student> findAll();
}
```

### Step 2: Add new method to DAO implementation
![](https://i.imgur.com/vLuW7Ly.png)


### Step 3: Update main app
```java

@SpringBootApplication  
public class CruddemoApplication {  
  
   public static void main(String[] args) {  
      SpringApplication.run(CruddemoApplication.class, args);  
   }  
  
   @Bean  
   public CommandLineRunner commandLineRunner(StudentDAO studentDAO){  
      return runner-> {  
      // createStudent(studentDAO);  
      // readStudent(studentDAO);         
      queryForStudents(studentDAO);  
      };  
   }  
  
   private void queryForStudents(StudentDAO studentDAO) {  
  
      // get a list of students  
      List<Student> theStudents = studentDAO.findAll();  
  
      // display list of students  
      for (Student tempStudent : theStudents) {  
         System.out.println(tempStudent);  
      }  
   }  
....

```

#### order by
```java
@Override  
public List<Student> findAll() {  
    // create query  
    TypedQuery<Student> theQuery = entityManager.createQuery(
    "FROM Student order by lastName desc", Student.class);
    //  
  
    // return query results  
    return theQuery.getResultList();  
}
```