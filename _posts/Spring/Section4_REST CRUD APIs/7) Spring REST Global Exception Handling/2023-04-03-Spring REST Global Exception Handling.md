---
layout: single
title: "Spring REST Global Exception Handling"
categories: Spring
tag: [Java,REST,"REST Exception Handling","@ControllerAdvice"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Global Exception Handling
REST CRUD APIs(7)
- Exception handler code is only for the specific REST controller
- Can't be reused by other controllers <- Large projects will have multiple controllers
- We need global exception handlers
	- Promotes reuse
	- Centralizes exception handling
	
## Spring @ControllerAdvice
- @ControllerAdvice is similar to an interceptor / filter
- Pre-process requests to controllers
- Post-process response to handle exceptions
- Perfect for global exception handling
![](https://i.imgur.com/Ro0BiHw.png)

## Development Process
1. Create new @ControllerAdvice
2. Refactor REST service... remove exception handling code
3. Add exception handling code to @ControllerAdvice

### Step 1: Create new @ControllerAdvice
```java
File: StudentRestExceptionHandler.java
@ControllerAdvice
public class StudentRestExceptionHandler{

}
```

### Step 2: Refactor - remove exception handling

![](https://i.imgur.com/MJSAhzG.png)

### Step 3: Add exception handler to @ControllerAdvice

```java
File: StudentRestExceptionHandler.java
@ControllerAdvice
public class StudentRestExceptionHandler {
...
	@ExceptionHandler
	public ResponseEntity<StudentErrorResponse> handleException(StudentNotFoundException exc) {

	StudentErrorResponse error = new StudentErrorResponse();

	error.setStatus(HttpStatus.NOT_FOUND.value());
	error.setMessage(exc.getMessage());
	error.setTimeStamp(System.currentTimeMillis());

	return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	
	}
}
```

