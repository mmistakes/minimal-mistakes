---
layout: single
title: "JSON Jackson Data Binding"
categories: Spring
tag: [Java,REST,JSON,Jackson]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---

# Java JSON Data Binding
- Data binding is the process of converting JSON data to a Java POJO
- mapping, sterilization 뭐 다 같은 말임
- Java POJO is just plain old Java object

![](https://i.imgur.com/WcMRII0.png)

## JSON Data Binding with Jackson
- Spring uses the ***Jackson Project*** behind the scenes
- Jackson handles data binding between JSON and Java POJO
	- Spring Boot Starter Web automatically includes dependency for Jackson
- Details on Jackson Project:
	- https://github.com/FasterXML/jackson-databind

## Jackson Data Binding
- By default, Jackson will call appropriate getter/setter method
	- The important thing is that it'll actually use the getter and setter methods for handing some of this processing

![](https://i.imgur.com/nvZlNBW.png)

### JSON to Java POJO
- Convert JSON to Java POJO ... call setter methods on POJO

![](https://i.imgur.com/9Jsw2vo.png)

![](https://i.imgur.com/8GqNstk.png)

>- Note: Jackson calls the setXXX methods
>- It does NOT access internal private fields directly

### Java POJO to JSON
- Now let's go the other direction
- Convert Java POJO to JSON ... call getter methods on POJO

![](https://i.imgur.com/sGmlccB.png)

## Spring and Jackson Support
- When building Spring REST applications
- Spring will automatically handle Jackson Integration
- JSON data being passed to REST controller is converted to POJO
- Java object being returned from REST controller is converted to JSON

>Happens automatically behind scenes

## Spring REST Service - Students
- Return a list of students
>GET -> /api/students  -> Returns a list of students

![](https://i.imgur.com/QpQbQ8D.png)

### Behind the scenes

![](https://i.imgur.com/ij5EbSb.png)

## Development Process
1. Create Java POJO class for **Student**
2. Create Spring REST Service using **@RestController**

### Step 1: Create Java POJO class for Student
- Fields / Constructors / Getter/Setters
![](https://i.imgur.com/o65X1E8.png)

### Step 2: Create @RestController

![](https://i.imgur.com/c4gQEcP.png)


### Convert Java POJO to JSON
- Our REST Service will return `List<Student>`
- Need to convert `List<Student>` to JSON
- **Jackson** can help up out with this...

### Spring Boot and Jackson Support
- Spring Boot will automatically handle **Jackson** integration
	- Happens automatically behind the scenes
- JSON data being passed to REST controller is converted to Java POJO
- Java POJO being returned from REST controller is converted to JSON
	- Spring Boot Starter Web automatically includes dependency for Jackson