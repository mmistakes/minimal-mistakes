---
layout: single
title: "Spring Boot Actuator?"
categories: Spring
tag: [Java,Actuator]
toc: true
toc_sticky: true
author_profile: false
sidebar:
     

---


## Problem

- How can I monitor and manage my application?

- How can I check the application health?

- How can I access application metrics?

## Solution : Spring Boot Actuator

- Exposes endpoints to monitor and manage your application

- You easily get DevOps functionality out of the box

- Simply add the dependency to your POM file

- REST endpoints are automatically added to your application
  (No need to write additional code!)
  (You get new REST endpoints for FREE!)

- Adding the dependency to your POM file

```java
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

- Automatically exposes endpoints for metrics out of the box

- Endpoints are prefixed with : **/actuator**
  
![](https://i.imgur.com/SRIlJKp.png)



### Health Endpoint

- **/health** checks the status of your application

- Normally used by monitoring apps to see if your app is up or down 

- (Health status is customizable based on your own business logic)


![](https://i.imgur.com/13mfFaZ.png)


### Exposing Endpoints

- By default, only **/health** is exposed

- The **/info** endpoint can provide information about your application

- To expose **/info**


```java
File: src/main/resources/application.properties

management.endpoints.web.exposure.include=health,info
management.info.env.enabled=ture
```

***

- By default, only **/health** is exposed

- To expose all actuator endpoints over HTTP

```java
File: src/main/resources/application.properties

# Use wildcard "*" to expose all endpoints
# Can also expose individual endpoints with 
# a comma-delimited list

management.endpoints.web.exposure.include= *
```

### Info Endpoint

- **/info** gives information about your application

- Default is empty
  
![](https://i.imgur.com/LAwkciO.png)

- Update **application.properties** with your app info
```java
File: src/main/resources/application.properties

info.app.name = ***My Super Cool App***
info.app.description =***A crazy and fun app, Yeah!***
info.app.version = ***1.0.0***
```


-> Properties starting with "info." will be used by /info

![](https://i.imgur.com/AzWf2dr.png)


## Spring Boot Actuator Endpoints

- There are 10+ Spring Boot Actuator endpoints

![](https://i.imgur.com/TRt86p6.png)


### Get A List of Beans

- Access http://localhost:8080/actuator/beans ->

- 당연히 security도 추가 해야함

### Development Process

1. Edit **pom.xml** and add **spring-boot-starter-acuator**

2. View actuator endpoints for: **/health**

3. Edit **application.properties** to customize **/info**

```java
<!--    ADD SUPPORT FOR SPRING BOOT ACTUATOR   -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

/pom.xml
```

```java
# Use wildcard "*" to expose all endpoints
# Can also expose individual endpoints with a comma-delimited list
#management.endpoints.web.exposure.include=health,info

management.endpoints.web.exposure.include=*
management.info.env.enabled=true

info.app.name= My Super Cool App
info.app.description = A crazy fun app, YEAH!!
info,app.version= 1.0.0 


src/main/resources/application.properties
```

### List of Actuator

- actuator/beans -> 등록된 bean 확인

- actuator/threaddump-> 모든 스레드 확인 , 병목현상 및 퍼포먼스 확인

- actuator/mapping,,etc..

## What about Security?

- You may NOT want to expose all of this information

- Add Spring Security to project and endpoints are secured 

```java
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
```

### Secured Endpoints

- Now when you access: /actuator/beans

- Spring Security will prompt for login

### Spring Security configuration

- You can override default user name and generated password
  
  ```java
  File: src/main/resources/application.properties
  
  spring.security.user.name = yohan
  spring.security.user.password = 1234
  ```

### Customizing Spring Security

- You can customize Spring Security for Spring Boot Actuator
  
  - Use a database for roles, encrypted password etc..

### Excluding Endpoints

- To exclude /health and /info
  
  ```java
  File: src/main/resources/application.properties
  
  management.endpoints.web.exposure.exclude=health,info
  ```

## Development Process

1. Edit **pom.xml** and add **spring-boot-starter-security**

2. Verify security on actuator endpoints for: **/beans** etc

3. Disable endpoints for **/health** and **/info**

### dependency 추가

- pom.xml 에 dependency를 추가하면 login을 해야 정보를 볼 수 있다.

- 비밀번호는 콘솔창에 자동으로 생성되지만 바꿔줄 수 있다.

![](https://i.imgur.com/PIkR0XY.png)


![](https://i.imgur.com/DIZRASw.png)


- 하지만 여전히 info, health 는 로그인 없이 정보 확인 가능하다.

![](https://i.imgur.com/gPzhF3f.png)

### endponts.exclude
 - resoucre 부분의 properties에서 이전에 했던 include에서 exclude에 원하는 엔드포인트를 추가해주면 된다

![](https://i.imgur.com/mH2rLJI.png)

![](https://i.imgur.com/frr7eiO.png)


- 빠밤!

![](https://i.imgur.com/Q7UbZP3.png)


출처 유데미
