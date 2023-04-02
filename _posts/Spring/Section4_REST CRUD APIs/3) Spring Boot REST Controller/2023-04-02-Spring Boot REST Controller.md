---
layout: single
title: "Spring Boot REST Controller"
categories: Spring
tag: [Java,REST,"REST Controller"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Basic code

```java
@RestController <- Adds REST support
@RequestMapping("/test") 
public class DemoResetController {

	@GetMapping("/hello") <-Access the REST endpoint at /test/hello
	public String sayHello(){
		return "Hello World"; <- Returns content to client
	}
}
```

## Web Browser vs Postman
- For simple REST testing for GET requests
	- Web Browser and Postman are similar
- However, for advanced REST testing: POST, PUT etc...
	- Postman has much better support
	- POSTing JSON data, setting content type
	- Passing HTTP request headers, authentication etc...

## Development Process
1. Add Maven dependency for Spring Boot Starter Web
2. Create Spring REST Service using @RestController

### Step 1: Add Maven Dependency

```java
File: pom.xml
<!-- Add Spring Boot Starter Web -->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifacId>spring-boot-starter-web</artifacId>
</dependency>
// At Spring Initializr website,
// Can also select the "Web" dependency
```

### Step 2: Create Spring REST Service

```java
@RestController  
@RequestMapping("/test")  
public class DemoRestController {  
  
    // add code for the "/hello" endpoint  
  
    @GetMapping("/hello")  <- Handles HTTP GET requests
    public String sayHello(){  
        return "Hello World";  
    }  
}

```