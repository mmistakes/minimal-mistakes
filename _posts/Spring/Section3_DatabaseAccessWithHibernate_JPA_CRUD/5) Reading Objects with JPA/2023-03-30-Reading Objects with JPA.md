---
layout: single
title: "Reading Objects with JPA"
categories: Spring
tag: [Java,JPA,DAO]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Retrieving a Java Object with JPA
- Hibernate/JPA CRUD (5)

  
```java
// retrieve/read from database using the primary key
// in this example, retrieve Student with primary key: 1

Student myStudent = entityManager.find(Student.class, 1);
```

![](https://i.imgur.com/qo6qRUZ.png)

## Development Process
1. Add new method to DAO interface
2. Add new method to DAO implementation
3. Update main app

### Step 1: Add new method to DAO interface
```java
public interface StudentDAO {  
	...
	
    Student findById(Integer id);  
    
}
```

### Step 2: Define DAO implementation
![](https://i.imgur.com/w85OG9T.png)

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
         readStudent(studentDAO);  
      };  
   }  
  
   private void readStudent(StudentDAO studentDAO) {  
  
      // create a student object  
      System.out.println("Creating new student object...");  
      Student tempStudent = new Student("Daffy","Duck", "@daffy@gmail.com");  
  
      // save the student  
      System.out.println("Saving the student...");  
      studentDAO.save(tempStudent);  
  
      // display id of the saved student  
      int theId = tempStudent.getId();  
      System.out.println("Saved student. Generated id: " + theId);  
  
      // retrieve student based on the id: primary key  
      System.out.println("Retrieving student with id: " + theId);  
      Student myStudent = studentDAO.findById(theId);  
  
      // display student  
      System.out.println("Found the student: " + myStudent);  
  
  
   }  
  ....
}
```