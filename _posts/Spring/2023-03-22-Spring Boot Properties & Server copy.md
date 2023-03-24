---
layout: single
title: "Spring Boot Properties & Server"
categories: Spring
tag: [Java,Properties,server]
toc: true
toc_sticky: true
author_profile: false
sidebar:
 nav: "docs"

---

# 스프링 부트 Properties 간략히 보기

- 서버 포트 및 설정 

## Spring Boot Properties

- Spring Boot can be configured in the ***application.properties*** file

- Server port, context path, actuator, security etc

- Spring Boot has 1,000 + properties...

- The properties are roughly grouped into the following categories
  
  - Core
  
  - Web
  
  - Security
  
  - Data
  
  - Actuator
  
  - Integration
  
  - DevTools
  
  - Testing

### Core Properties

```java
File: src/main/resources/application.properties

# Log levels severity mapping
logging.level.org.springframework=DEBUG
logging.level.org.hibernate=TRACE
logging.level.com.luv2code=INFO
// TRACE,DEBUG,INFO,WARN,ERROR,FATAL,OFF

//Set logging levels based on package names


# Log file name
logging.file = my-crazy-stuff.log
```

### Web Properties

```java
File: src/main/resources/application.properties

# HTTP server port
server.port = 7070

# Context path of the application
server.servlet.context-path=/my-silly-app

// ex) -> http://localhost:7070/my-silly-app/forture

# Default HTTP session time out
server.servlet.session.timeout = 15m

// Default timeout 30 minutes
```

### Actuator Properties

```java
File: src/main/resources/application.properties

# Endpoints to include by name or wildcard
management.endpoints.web.exposure.include=*

# Endpoints to exclude by name or wildcard
management.endpoints.web.exposure.include=beans,mapping

# Base path for actuator endpoints
management.endpoints.web.base-path=/actuator

// -> http://localhost:7070/actuator/health
```

### Security Properties

```java
File: src/main/resources/application.properties

# Default user name
spring.security.user.name = admin

# Password for default user
spring.securtiy.user.password = topsecret
```

### Data Properties

```java
File: src/main/resources/application.properties


# JDBC URL of the database
spring.datasource.url = jdbc:mysql://localhost:3306/ecommerce

# Login username of the database
spring.datasource.username = scott


# Login password of the database
spring.datasource.password = tiger
```

## Development Process

1. Cofigure the server port
2. Configure the application context path

### Step 1: Cofigure the server port

![](/images/2023-03-22-sss/2023-03-22-19-25-40-image.png)

![](/images/2023-03-22-sss/2023-03-22-19-26-07-image.png)

### Step 2: Configure the application context path

![](/images/2023-03-22-sss/2023-03-22-19-29-30-image.png)

![](/images/2023-03-22-sss/2023-03-22-19-29-18-image.png)

![](/images/2023-03-22-sss/2023-03-22-19-29-49-image.png)

출처 : 유데미, luv2code.com