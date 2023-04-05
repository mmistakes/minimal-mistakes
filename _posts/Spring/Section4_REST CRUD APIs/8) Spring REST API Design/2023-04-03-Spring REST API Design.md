---
layout: single
title: "Spring REST API Design"
categories: Spring
tag: [Java,REST,"REST API Design","@Service","@PathVariable","@RequestBody","@DeleteMapping","@PutMapping"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Spring REST API Design
REST CRUD APIs(8)
- For real-time projects, who will use your API?
- Also, how will they use your API?
- Design the API based on requirements

## API Design Process
1. Review API requirements
2. Identify main resource / entity
3. Use HTTP methods to assign action on resource

## API Reqirements
- Create a REST API for the Employee Directory
- REST Clients should be abot to
>- Get a list of employees
>- Get a single employee by id
>- Add a new employee
>- Update an employee
>- Delete an employee

## Step 1: Identify main resource / entity
- To identify main resource / entity, look for the most prominent "noun"
- For our project, it is "employee"
- Convention is to use plural form of resource / entity: **employees**

## Step 2: Use HTTP methods to assign action on resource

| HTTP Method | CRUD Action                              |
| ----------- | ---------------------------------------- |
| POST        | Create a new entity                      |
| GET         | Read a list of entities or single entity |
| PUT         | Update an existing entity                |
| DELETE      | Delete an existing entity                                         |

### Employee Real-Time Project

| HTTP Method | Endpoint                    | CRUD Action         |         
| ----------- | --------------------------- | --------------------------- |
| POST        | /api/employees              | Create a new employee       |
| GET         | /api/employees              | Read a list of employees    |
| GET         | /api/employees/{employeeId} | Read a single employee      | 
| PUT         | /api/employees              | Update an existing employee |
| DELETE      | /api/employees/{employeeId} | Delete an existing employee  | 


### Anti-Patterns
- DO NOT DO THIS .. these are REST anti-patterns, bad practice
>- /api/employeeList
>- /api/deleteEmployee
>- /api/addEmployee
>- /api/updateEmployee

- Don't include actions in the endpoint
>Instead, use HTTP methods to assign actions

## Development Process
1. Set up Database Dev Environment
2. Create Spring Boot project using Spring Initializr
3. Get list of employees
4. Get single employee by ID
5. Add a new employee
6. Update an existing employee
7. Delete an existing employee

## Application Architecture
-117-
![](https://i.imgur.com/Q5jqrqA.png)

### Step-by-step 
1. Set up Database Dev Environment
2. Create Spring Boot project using Spring Initializr
3. ***--Get list of employees--***
4. Get single employee by ID
5. Add a new employee
6. Update an existing employee
7. Delete an existing employee

### DAO Impl

![](https://i.imgur.com/RY6SJ3F.png)

### Get a list of employees

![](https://i.imgur.com/IGVGzpf.png)

### Step-by-step (1)
1. ***--Update db configs in application.properties--***
2. ***--Create Employee entity--***
3. Create DAO interface
4. Create DAO implementation
5. Create REST controller to use DAO

#### Update db configs in application.properties

![](https://i.imgur.com/GJLeKjX.png)

#### Create Employee entity
```java
package com.luv2code.springboot.cruddemo.entity;  
  
import jakarta.persistence.*;  
  
@Entity  
@Table(name="employee")  
public class Employee {  
  
    // define fields  
    @Id  
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    @Column(name = "id")  
    private int id;  
    @Column(name = "first_Name")  
    private String firstName;  
    @Column(name = "last_Name")  
    private String lastName;  
    @Column(name = "email")  
    private String email;  
  
  
    // define constructors  
    public Employee(){  
  
    }  
  
    public Employee(String firstName, String lastName, String email) {  
        this.firstName = firstName;  
        this.lastName = lastName;  
        this.email = email;  
        // id 는 자동생성
    }  
  
    // define getter/setter  
  
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
  
  
    // define toString  
    @Override  
    public String toString() {  
        return "Employee{" +  
                "id=" + id +  
                ", firstName='" + firstName + '\'' +  
                ", lastName='" + lastName + '\'' +  
                ", email='" + email + '\'' +  
                '}';  
    }  
}
```

### Step-by-step (2)
-119-
1. Update db configs in application.properties
2. Create Employee entity
3. ***--Create DAO interface--***
4. ***--Create DAO implementation--***
5. ***--Create REST controller to use DAO--***

#### Create DAO interface

```java
public interface EmployeeDAO {  
  
    List<Employee> findAll();
}
```

#### Create DAO implementation

```java
package com.luv2code.springboot.cruddemo.dao;  
  
import com.luv2code.springboot.cruddemo.entity.Employee;  
import jakarta.persistence.EntityManager;  
import jakarta.persistence.TypedQuery;  
import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.stereotype.Repository;  
  
import java.util.List;  
  
@Repository  
public class EmployeeDAOJpaImpl implements EmployeeDAO{ <-Same interface for consistent API
  
    // define field for entitymanager  
    private EntityManager entityManager;  
  
    // set up constructor injection  
    @Autowired  
    public EmployeeDAOJpaImpl(EntityManager theEntityManager) <- Constructor injection , Automatically created by Spring Boot
    {  
        entityManager = theEntityManager;  
    }  
  
    @Override  
    public List<Employee> findAll() {  
        // create a query  
        TypedQuery<Employee> theQuery = entityManager.createQuery(
        "from Employee" <- JPQL , Employee.class);  
        // execute query and get result list  
        List<Employee> employees 
        = theQuery.getResultList(); <-Using Standard JPA API
        // return the results  
        return employees;  
    }  
  
}
```

#### Create REST controller to use DAO
```java
package com.luv2code.springboot.cruddemo.rest;  
  
import com.luv2code.springboot.cruddemo.entity.Employee;  
import com.luv2code.springboot.cruddemo.service.EmployeeService;  
import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.web.bind.annotation.*;  
  
import java.util.List;  
  
@RestController  
@RequestMapping("/api")  
public class EmployeeRestController {  
    private EmployeeService employeeService;  
    // quick and dirty: inject employee dao (use constructor injection)    @Autowired  
    public EmployeeRestController(EmployeeService theEmployeeService) {  
        employeeService = theEmployeeService;  
    }  
    // expose "/employee" and return a list of employees  
    @GetMapping("/employees")  
    public List<Employee> findAll() {  
        return employeeService.findAll();  
    }  
  
}
```

![](https://i.imgur.com/rZwVHBU.png)

## Define Services with @Service
-121-

### Refactor: Add a Service Layer

#### Purpose of Service Layer
- **Service Facade** design pattern
- Intermediate layer for custom business logic
- Integrate data from multiple sources (DAO/repositories)

![](https://i.imgur.com/izgeyrC.png)

#### Integrate Multiple Data Sources

![](https://i.imgur.com/niF4F2z.png)

#### Specialized Annotation for Services
- Spring provides the **@Service** annotation
- **@Service** applied to Service implementations
- Spring will automatically register the Service implementation
	- Good component-scanning :)
![](https://i.imgur.com/8UdBxdd.png)

### Employee Service
1. Define Service interface
2. Define Service implementation
	- Inject the EmployeeDAO

![](https://i.imgur.com/izgeyrC.png)

#### Step 1: Define Service interface

```java
public interface EmployeeService{
	List<Employee> findAll();
}
```

#### Step 2: Define Service implementation

```java
@Service <- enables component scanning
public class EmployeeServiceImpl implements EmployeeService{
	//inject EmployeeDAO...
	@Override
	public List<Employee>findAll(){
		return employeeDAO.findAll();
	}

}

```


```java
@Service  
public class EmployeeServiceImpl implements EmployeeService {  
    private EmployeeDAO employeeDAO;  
    @Autowired  
    public EmployeeServiceImpl (EmployeeDAO theEmployeeDAO) {  
        employeeDAO = theEmployeeDAO;  
    }  
    @Override  
    public List<Employee> findAll() {  
        return employeeDAO.findAll();  
    }  
  
}
```

```java 
@RestController  
@RequestMapping("/api")  
public class EmployeeRestController {  
    // Refactor  
    // private EmployeeDAO employeeDAO; 
    private EmployeeService employeeService;   
    // quick and dirty: inject employee dao (use constructor injection)
    @Autowired  
    public EmployeeRestController(EmployeeService theEmployeeService) {  
        employeeService = theEmployeeService;  
    }  
    // expose "/employee" and return a list of employees  
    @GetMapping("/employees")  
    public List<Employee> findAll() {  
	    // Refactor
	    // return employeeDAO.findAll();
        return employeeService.findAll();  
    }  

}
```

## Service Layer - Best Practice
-123-
- Best practice is to apply transactional boundaries at the service layer
- It is the service layer's responsibilty boundaries at the service layer
- For implementation code
	- Apply @Transactional on service methods
	- Remove @Transactional on DAO methods if they already exist

### Step-by-step
1. Set up Database Dev Environment
2. Create Spring Boot project using Spring Initializr
3. Get list of employees
4. ***--Get single employee by ID--***
5. Add a new employee
6. Update an existing employee
7. Delete an existing employee

### DAO: Get a single employee

```java
@Override 
public Employee findById(int theId) {
		-> theId 통일
	// get employee
	Employee theEmployee = entityManager.find(Employee.class, theId);
	// return employee
	return theEmployee; 
}
```

### DAO: Add or Update employee

```java
@Override <- Note: We don't use @ Transactional at DAO layer 
					It will be handled at Service layer
					
public Employee save(Employee theEmployee) {
	// save or update the employee
	Employee dbEmployee = entityManager.merge(theEmployee);
	-> if id == 0 then save/insert else update
	// return dbEmployee
	return dbEmployee;
	-> Return dbEmployee 
	-> It has updated id from the database (in the case of insert)
}
```

### DAO: Delege an existing employee

```java
@Override <- Note: We don't use @ Transactional at DAO layer 
					It will be handled at Service layer
					
public void deleteById(int theId) {
	// find the employee by id
	Employee theEmployee = entityManager.find(Employee.class, theId);
	// delete the employee
	entityManager.remove(theEmployee);
}
```

## Service methods

```java
public interface EmployeeDAO {  
    List<Employee> findAll();  
  
    Employee findById(int theId);  
    Employee save(Employee theEmployee);  
    void deleteById(int theId);  
}
```


```java
public interface EmployeeService {  
    List<Employee> findAll();  
  
    Employee findById(int theId);  
    Employee save(Employee theEmployee);  
    void deleteById(int theId);  
}
```

### Delegate the calls to the DAO

```java
@Service  
public class EmployeeServiceImpl implements EmployeeService {  
    private EmployeeDAO employeeDAO;  
    @Autowired  
    public EmployeeServiceImpl (EmployeeDAO theEmployeeDAO) {  
        employeeDAO = theEmployeeDAO;  
    }  
    @Override  
    public List<Employee> findAll() {  
        return employeeDAO.findAll();  
    }  
  
    @Override  
    public Employee findById(int theId) {  
        return employeeDAO.findById(theId);  
    }  
  
    @Transactional  <- Apply at @Transactional the Service layer
    @Override    public Employee save(Employee theEmployee) {  
        return employeeDAO.save(theEmployee);  
    }  
  
    @Transactional  <- Apply at @Transactional the Service layer
    @Override    public void deleteById(int theId) {  
        employeeDAO.deleteById(theId);  
    }  
}
```

## Get Single Employee & Read & Add Employee
-126-

### Step-by-step
1. Set up Database Dev Environment
2. Create Spring Boot project using Spring Initializr
3. Get list of employees
4. ***--Get single employee by ID--*** <---- **Rest Controller methods**
5. ***--Add a new employee--*** <---- **Rest Controller methods**
6. Update an existing employee
7. Delete an existing employee

### Read a Single Employee

![](https://i.imgur.com/gcSVFtm.png)

### Create a New Employee

![](https://i.imgur.com/odEwJWA.png)


### Sending JSON to Spring REST Controllers
- When sending JSON data to Spring REST Controllers
- For controller to process JSON data, need to set a HTTP request header
	- Content-type: application/json
- Need to configure REST client to send the correct HTTP request header

### Postman - Sending JSON in Request Body
- Must set HTTP request header in Postman
- ![](https://i.imgur.com/pKAYsTw.png)

오류나는데 이부분 
Content-Type 변경
![](https://i.imgur.com/ksqCEK7.png)

### RestController: Read a Single Employee & Add Employee

```java

@RestController  
@RequestMapping("/api")  
public class EmployeeRestController {  
  
    private EmployeeService employeeService;  
  
    // Refactor  
    // private EmployeeDAO employeeDAO;  
    // quick and dirty: inject employee dao (use constructor injection) 
    @Autowired  
    public EmployeeRestController(EmployeeService theEmployeeService) {  
        employeeService = theEmployeeService;  
    }  
  
    // expose "/employee" and return a list of employees  
    @GetMapping("/employees")  
    public List<Employee> findAll() {  
        return employeeService.findAll();  
    }  
  -------------------------------------------------------------------------
  
    // add mapping for GET/ employees/{employeeId}  
    @GetMapping("/employees/{employeeId}")  
    public Employee getEmployee(@PathVariable int employeeId){  
        Employee theEmployee = employeeService.findById(employeeId);  
        if (theEmployee == null) {  
            throw new RuntimeException("Employee id not found - " + employeeId);  
        }  
        return theEmployee;  
    }  
  
    // add mapping for POST /employees - add new employee  
    @PostMapping("/employees")  
    public Employee addEmployee(@RequestBody Employee theEmployee) {  
        // also just in case they pass an id in JSON... set id to 0  
        // this is to force a save of new item... instead of update  
        theEmployee.setId(0);  
        Employee dbEmployee = employeeService.save(theEmployee);  
        return dbEmployee;  
    }  
  -------------------------------------------------------------------------

}
```

## Update Employee & Delete Employee
-128-
### Step-by-step
1. Set up Database Dev Environment
2. Create Spring Boot project using Spring Initializr
3. Get list of employees
4. Get single employee by ID
5. Add a new employee
6. ***--Update an existing employee--***  <---- **Rest Controller methods**
7. ***--Delete an existing employee--***   <---- **Rest Controller methods**

### Update Employee

![](https://i.imgur.com/LajQxaR.png)

### Delete Employee

![](https://i.imgur.com/lMT7dpx.png)

```java

@RestController  
@RequestMapping("/api")  
public class EmployeeRestController {  
  
    private EmployeeService employeeService;  
  
    // Refactor  
    // private EmployeeDAO employeeDAO;  
    // quick and dirty: inject employee dao (use constructor injection) 
    @Autowired  
    public EmployeeRestController(EmployeeService theEmployeeService) {  
        employeeService = theEmployeeService;  
    }  
  
    // expose "/employee" and return a list of employees  
    @GetMapping("/employees")  
    public List<Employee> findAll() {  
        return employeeService.findAll();  
    }  
  
    // add mapping for GET/ employees/{employeeId}  
    @GetMapping("/employees/{employeeId}")  
    public Employee getEmployee(@PathVariable int employeeId){  
        Employee theEmployee = employeeService.findById(employeeId);  
        if (theEmployee == null) {  
            throw new RuntimeException("Employee id not found - " + employeeId);  
        }  
        return theEmployee;  
    }  
  
    // add mapping for POST /employees - add new employee  
    @PostMapping("/employees")  
    public Employee addEmployee(@RequestBody Employee theEmployee) {  
        // also just in case they pass an id in JSON... set id to 0  
        // this is to force a save of new item... instead of update  
        theEmployee.setId(0);  
        Employee dbEmployee = employeeService.save(theEmployee);  
        return dbEmployee;  
    }  
  -------------------------------------------------------------------------
    // add mapping for PUT/ employees - update existing employess  
    @PutMapping("/employees")  
    public Employee updateEmployee(@RequestBody Employee theEmployee) {  
        Employee dbEmployee = employeeService.save(theEmployee);  
        return dbEmployee;  <- It has latest updates from the database
  
    }  
  
    // add mapping for DELETE / employees/{employeeId} - delete employee  
  
    @DeleteMapping("/employees/{employeeId}")  
    public String deleteEmployee(@PathVariable int employeeId) {  
        Employee tempEmployee = employeeService.findById(employeeId);  
        // throw exception if null  
        if (tempEmployee == null) {  
            throw new RuntimeException("Employee id not found - " + employeeId);  
        }  
        employeeService.deleteById(employeeId);  
        return "Deleted employee id - " + employeeId;  
    }  
}
```