---
layout: single
title: "Spring REST Exception Handling"
categories: Spring
tag: [Java,REST,"REST Exception Handling"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Problem!
- if wrong student id like out of number

![](https://i.imgur.com/U3j6cXS.png)
>You can handle the exception and return as JOSN

## Spring REST Exception Handling

![](https://i.imgur.com/uyC4OTk.png)

![](https://i.imgur.com/nyCLwjB.png)


## Development Process
1. Create a custom error response class
2. Create a custom exception class
3. Update REST service to throw exception if student not found
4. Add an exception handler method using @ExceptionHandler

### Step 1: Create custom error response class
- The custom error response class will be sent back to client as JSON
- We will define as Java class(POJO)
	- ![](https://i.imgur.com/Kt649nF.png)
	- You can define any custom fields that you want to track
- Jackson will handle converting it to JSON
- ![](https://i.imgur.com/5DoMMTR.png)

![](https://i.imgur.com/hc3n13u.png)



### Step 2: Create custom student exception
- The custom student exception will used by our REST service
- In our code, if we can't find student, then we'll throw an exception
- Need to define a custom student exception class

![](https://i.imgur.com/Pm51ykZ.png)

### Step 3: Update REST service to throw exception

![](https://i.imgur.com/kIulDsX.png)

#### Spring REST Exception Handling

![](https://i.imgur.com/fXc5HJM.png)

### Step 4: Add exception handler method
- Define exception handler method(s) with ***@ExceptionHandler ***annotation
- Exception handler will return a ***ResponseEntity***
- ***ResponseEntity*** is a wrapper for the ***HTTP*** response object
- ***ResponseEntity*** provides fine-grained control to specify:
	- ***HTTP*** status code, ***HTTP*** headers and Response body

![](https://i.imgur.com/eIhMzmO.png)
![](https://i.imgur.com/ASJS3dJ.png)
