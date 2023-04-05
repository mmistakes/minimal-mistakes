---
layout: single
title: "Spring REST Data JPA"
categories: Spring
tag: [Java,REST,"REST Data JPA","JpaRepository"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Application Architecture
REST CRUD APIs(9)
![](https://i.imgur.com/4THngMs.png)

## The Problem
- We saw how to create a DAO of ***Employee***
- What if we need to create a DAO for another entity?
	- ***Customer, Student, Product, Book...***
- Do we have to repeat all of the same code again?

## Creating DAO
- You may have noticed a pattern with creating DAOs

![](https://i.imgur.com/xQOXvQ6.png)

### Wish
>- Create a DAO for me
>- Plug in my entity type and primary key
>- Give me all of the basic CRUD features for free

![](https://i.imgur.com/mHXeWcG.png)

## Spring Data JPA - Solution

- Spring Data JPA is the solution!! -- https://spring.io/projects/spring-data-jpa
- Create a DAO and just plug in your *entity type* and *primary key*
- Spring will give you a CRUD implementation for FREE 
	- Helps to minimize boiler-plate DAO code
> More than 70% reduction in code .. depending on use case

### JpaRepository
- Spring Data JPA provides the interface: *JpaRepository*
- Expose methods (some by inheritance from parents)

## Development Process
1. Extend JpaRepository interface
2. Use your Repository in your app
> No need for implementation class

### Step 1: Extend JpaRepository interface
```java
public interface EmployeeRepository extends JpaRepository<Employee//(Entity type)
, Integer//(primary key)> {
>{
	that's it ... no deed to write any code
	No need for implementation class
}
```

#### JpaRepository Docs
- Full list of methods available ... see JavaDoc for JpaRepository
https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html

### Step 2: Use Repository in your app
```java
@Service
public class EmployeeServiceImpl implements EmployeeService {

	private EmployeeRepository employeeRepository

	@Autowired
	public EmployeeServiceImpl (EmployeeRepository theEmployeeRepository) {
		employeeRepository = theEmployeeRepository;
	}

	@Override
	public List<Employee> findAll() {
		return employeeRepository.findAll(); <- Magic method that is available via repository
	}
}
```

## Minimized Boilerplate Code
> - Before Spring Data JPA -> 2 Files , 30+ lines of code
> - After Spring Data JPA -> 1 File, 3 lines of code! ,Plus no need for implementation class

## Advanced Features
- Advanced features available for 
	- Extending and adding custom queries with JPQL
	- Query Domain Specific Language (Query DSL)
	- Defining custom methods (low-level coding)

### Refactor

```java
package com.luv2code.springboot.cruddemo.service;  
  
import com.luv2code.springboot.cruddemo.dao.EmployeeRepository;  
import com.luv2code.springboot.cruddemo.entity.Employee;  
import jakarta.transaction.Transactional;  
import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.stereotype.Service;  
  
import java.util.List;  
import java.util.Optional;  
  
@Service  
public class EmployeeServiceImpl implements EmployeeService {  
  
    private EmployeeRepository employeeRepository;  
  
    @Autowired  
    public EmployeeServiceImpl (EmployeeRepository theEmployeeRepository) {  
        employeeRepository = theEmployeeRepository;  
    }  
    @Override  
    public List<Employee> findAll() {  
        return employeeRepository.findAll();  
    }  
  
    @Override  
    public Employee findById(int theId) {  
        Optional<Employee> result = employeeRepository.findById(theId);  
  
        Employee theEmployee = null;  
  
        if (result.isPresent()) {  
            theEmployee = result.get();  
        }  
        else {  
            // we didn't find the employee  
            throw new RuntimeException ("Did not find employee id - " + theId);  
        }  
        return theEmployee;  
    }  
  
    //@Transactional  
    @Override  
    public Employee save(Employee theEmployee) {  
        return employeeRepository.save(theEmployee);  
    }  
  
    //@Transactional  
    @Override  
    public void deleteById(int theId) {  
        employeeRepository.deleteById(theId);  
    }  
}
```