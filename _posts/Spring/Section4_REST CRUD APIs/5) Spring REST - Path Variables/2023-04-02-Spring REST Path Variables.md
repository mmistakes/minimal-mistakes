---
layout: single
title: "Spring REST Path Variables"
categories: Spring
tag: [Java,REST,"REST Path Variables"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Path Variables
REST CRUD APIs(5)
- Retrieve a single student by id
`GET -> /api/students{studentId} <- Retrieve a single student` (Known as a 'path variable') like /api/students/0 , /api/students/1, /api/students/2

## Spring REST Service
![](https://i.imgur.com/Sd5PQ0x.png)

## Behind the scenes

![](https://i.imgur.com/rfZtcFZ.png)

## Development Process
1. Add request mapping to Spring REST Service
> Bind path variable to method parameter using @PathVariable


![](https://i.imgur.com/U7DJwfw.png)
