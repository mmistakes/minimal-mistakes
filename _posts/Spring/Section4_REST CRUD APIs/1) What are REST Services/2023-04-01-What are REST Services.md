---
layout: single
title: "What are REST Services?"
categories: Spring
tag: [Java,REST]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# REST 서비스란 무엇인가?
REST CRUD APIs(1)
- 이해가 잘 가도록 스토리로 이해해보자.

## Business Problem
- Build a client app that provides the weather report for a city
- Need to get weather data from an external service

## Application Architecture
![](https://i.imgur.com/FHXH5Mf.png)

### Questions
1. How will we connect to the Weather Service?
2. What programming language do we use?
3. What is the data format?

### Answers
- How will we connect to the Weather Service?
	- We can make REST API calls over HTTP
	- REST: REpresentational State Transfer
	- Lightweight approach for communicationg between applications
- What programming language do we use?
	- REST is language independent
	- The ***client*** application can use ***ANY*** programming language
	- The ***server*** application can use ***ANY*** programming language
- What is the data format?
	- REST applications can use any data format
	- Commonly see XML and JSON
	- JSON is most popular and morden
		- JavaScriptObjectNotation

## Possible Solution
- Use online Weather Service API provided by: openweathermap.org
- Provide weather data via an API
- Data is available in multiple formats: JSON, XML etc..

## Call Weather Service
- The API documentation gives us the following:
	- Pass in the city name
```java
api.openweathermap.org/data/2.5/weather?q={city name}
OR
api.openweathermap.org/data/2.5/weatjer?q={city name},{country code}
```
## Remember
>- REST calls can be made over HTTP
>- REST is language independent




출처 luv2code.com , https://docs.spring.io/spring-framework/docs/current/reference/html/index.html 