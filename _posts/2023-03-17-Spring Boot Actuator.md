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
  
  ![](../images/2023-03-17-Spring%20Boot%20Actuator/2023-03-17-21-19-32-image.png)

## Health Endpoint

- **/health** checks the status of your application

- Normally used by monitoring apps to see if your app is up or down 

- (Health status is customizable based on your own business logic)

![](../images/2023-03-17-Spring%20Boot%20Actuator/2023-03-17-22-55-32-image.png)

## Exposing Endpoints

- By default, only **/health** is exposed

- The **/info** endpoint can provide information about your application

- To expose **/info**

File: src/main/resources/application.properties

```java
management.endpoints.web.exposure.include=health,info
management.info.env.enabled=ture
```

***

- By default, only **/health** is exposed

- To expose all actuator endpoints over HTTP

File: src/main/resources/application.properties

```java
# Use wildcard "*" to expose all endpoints
# Can also expose individual endpoints with 
# a comma-delimited list

management.endpoints.web.exposure.include= *
```

## Info Endpoint

- **/info** gives information about your application

- Default is empty
  
  ![](../images/2023-03-17-Spring%20Boot%20Actuator/2023-03-17-22-56-39-image.png)

- Update **application.properties** with your app info

File: src/main/resources/application.properties

info.app.name = ***My Super Cool App***

info.app.description =***A crazy and fun app, Yeah!***

info.app.version = ***1.0.0***

-> Properties starting with "info." will be used by /info

![](../images/2023-03-17-Spring%20Boot%20Actuator/2023-03-17-22-57-10-image.png)

## Spring Boot Actuator Endpoints

- There are 10+ Spring Boot Actuator endpoints

![](../images/2023-03-17-Spring%20Boot%20Actuator/2023-03-17-21-43-20-image.png)

## Get A List of Beans

- Access http://localhost:8080/actuator/beans ->

- 당연히 security도 추가 해야함

## Development Process

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
