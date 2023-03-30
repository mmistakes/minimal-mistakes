---
layout: single
title: "Deleteing Objects with JPA"
categories: Spring
tag: [Java,Hibernate,JPA]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Deleting Objects with JPA Overview


## Delete a Student
```java
// retrieve the student
int id = 1;
Student theStudent = entityManager.find(Student.class, id);

// delete the student
entityManager.remove(theStudent);

```

## Delete based on a condition

![](https://i.imgur.com/QpMGQZL.png)


## Delete All Students
```java
int numRowsDeleted = entityManager
						.createQuery("DELETE FROM Student")
						.excuteUpdate();
```

## Development Process
1. Add new method to DAO interface
2. Add new method to DAO implemen
3. Update main app

### Step 1: Add new method to DAO interface
```java
public interface StudentDAO {

	void delete(Integer id);
	
}
```

### Step 2: Define DAO implementation
```java
@Repository  
public class StudentDAOImpl implements StudentDAO{  
  
    private EntityManager entityManager;
    ...

	@Override  
	@Transactional  // <- Add @Transactional since we are performing a delete
	public void delete(Integer id) {  
  
	    // retrieve the student  
	    Student theStudent = entityManager.find(Student.class, id);  
	    // delete the student  
	    entityManager.remove(theStudent);  
}

```

### Step 3: Update main app
```java
@SpringBootApplication  
public class CruddemoApplication {
	...
	public CommandLineRunner commandLineRunner(StudentDAO studentDAO){  
	   return runner-> {
	          deleteAllStudents(studentDAO);  
   };  
}

private void deleteStudent(StudentDAO studentDAO) {  
  
   int studentId = 2;  
   System.out.println("Deleting student id: " + studentId);  
   studentDAO.delete(studentId);  
  
}
```


## Delete all of the students

```java
public interface StudentDAO {
	int deleteAll();
}
```

```java
private void deleteAllStudents(StudentDAO studentDAO) {  
   System.out.println("Deleting all students");  
   int numRowsDeleted = studentDAO.deleteAll();  
   System.out.println("Deleted row count: " + numRowsDeleted);  
}
```





