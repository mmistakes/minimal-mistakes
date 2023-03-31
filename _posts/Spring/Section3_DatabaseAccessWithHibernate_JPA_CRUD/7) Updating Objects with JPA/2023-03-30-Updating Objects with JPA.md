---
layout: single
title: "JPA로 오브젝트 업데이트"
categories: Spring
tag: [Java,JPA,update]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# JPA를 사용해서 Objects 업데이트하기
- Hibernate/JPA CRUD (7)


## Update a Student

![](https://i.imgur.com/wrcFn2Z.png)

## Update last name for all students

![](https://i.imgur.com/0IQZMn7.png)

## Development Process
1. Add new method to DAO interface
2. Add new method to DAO implementation
3. Update main app

### Step 1: Add new method to DAO interface
```java
public interface StudentDAO {
	...
	
    void update(Student theStudent);  
}
```

### Step2: Define DAO implementation
```java
@Repository  
public class StudentDAOImpl implements StudentDAO{  
  
    // define field for entity manager  
    private EntityManager entityManager;  
	  ...
	  
    @Override  
    @Transactional    // <- Because we are performing an update
    public void update(Student theStudent) {  
        entityManager.merge(theStudent);  
  
    }  
}
```

### Step 3: Update main app
```java

@SpringBootApplication  
public class CruddemoApplication {  
  
....
  
   @Bean  
   public CommandLineRunner commandLineRunner(StudentDAO studentDAO){  
      return runner-> {  
   
      updateStudent(studentDAO);  
  
      };  
   }  
  
   private void updateStudent(StudentDAO studentDAO) {  
  
      // retrieve student based on the id: primary key  
      int studentId = 1;  
      System.out.println("Getting student with id: " + studentId);  
      Student myStudent = studentDAO.findById(studentId);  
  
      // change first name to "Scooby"  
      System.out.println("Updating student ,,,");  
      myStudent.setFirstName("Scooby");  
  
      // update the student  
      studentDAO.update(myStudent);  
  
      // display the updated student  
      System.out.println("Updated a student: " + myStudent);  
   }  
  
```