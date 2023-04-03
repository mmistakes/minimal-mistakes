---
layout: single
title: "Spring REST API Design"
categories: Spring
tag: [Java,REST,"REST API Design",""]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Spring REST API Design
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

| HTTP Method | Endpoint                    | CRUD Action                 |     |
| ----------- | --------------------------- | --------------------------- | --- |
| POST        | /api/employees              | Create a new employee       |     |
| GET         | /api/employees              | Read a list of employees    |     |
| GET         | /api/employees/{employeeId} | Read a single employee      |     |
| PUT         | /api/employees              | Update an existing employee |     |
| DELETE      | /api/employees/{employeeId} | Delete an existing employee                            |     |


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

![](https://i.imgur.com/bOlUHnn.png)
>Using Standard JPA API -> EmployeeDAO

### DAO Impl
'code'
