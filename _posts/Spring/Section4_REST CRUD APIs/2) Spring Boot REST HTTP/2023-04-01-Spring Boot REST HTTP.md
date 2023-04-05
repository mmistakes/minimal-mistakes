---
layout: single
title: "Spring Boot REST HTTP"
categories: Spring
tag: [Java,REST,"Status Codes"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# REST over HTTP
REST CRUD APIs(2)
- Most common use of REST is over HTTP
- Leverage HTTP methods for CRUD operations

| HTTP Method | CRUD Operation                           |
| ----------- | ---------------------------------------- |
| POST        | Create a new entity                      |
| GET         | Read a list of entities or single entity |
| PUT         | Update an existing entity                |
| DELETE      | Delete an existing entity                                         |

## HTTP Request Message
- Request line: the HTTP command
- Header variables: request metadata
- Message body: contents of message

## HTTP Response Message
- Response line: server protocol and status code
- Header variables: response metadata
- Message body: contents of message

## HTTP Response - Status Codes

| Code Range | Description   |
| ---------- | ------------- |
| 100-199    | Informational |
| 200-299    | Successful    |
| 300-399    | Redirection   |
| 400-499    | Client error  |
| 500-599    | Server error              |
- 401 Authentication Required
- 404 File Not Found
- 500 Internal Server Error

## MIME Content Types
- The message format is described by MIME content type
	- Multipurpose Internet Mail-Extention
- Basic Syntax: type/sub-type
- Examples
	- text/html, text/plain
	- application/json, application/xml, ...