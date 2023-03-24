---
layout: single
title: "Spring Initializr?"
categories: Spring
tag: [Java,Spring Initializr]
toc: true
toc_sticky: true
author_profile: false
sidebar:
     

---

# Spring Initializr 간략하게 보기

Spring Initializr created a maven.

## Maven Standard Directory Structure

![](/images/2023-03-17-Spring%20Initializr/2023-03-17-18-35-59-image.png)

## Maven Wrapper files

<img src="/images/2023-03-17-Spring%20Initializr/2023-03-17-18-40-18-image.png" title="" alt="" width="247">

- mbnw allows you to run a Maven project
  - No need to have Maven installed or present on your path
  - if correct version of Maven is NOT found on your computer
    - **Automatically downloads** correct version and runs Maven
- Two files are provided
  - mvnw.cmd for MS Windows
  - mvnw.sh for Linux / Mac

하지만 이전에 설치 되어 있다면 별 상관 없음

## Maven POM file

- pom.xml includes info that you entered at Spring Initializr website 

<img src="/images/2023-03-17-Spring%20Initializr/2023-03-17-18-45-29-image.png" title="" alt="" width="248">

```java
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.0.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.luv2code.springboot.demo</groupId>
    <artifactId>mycoolapp</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>mycoolapp</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>17</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

- Spring Boot Maven plugin
  
  - To package executable jar or war archive Can also easily run the app

## Application Properties

- By default, Spring Boot will load properties from: application.properties

![](/images/2023-03-17-Spring%20Initializr/2023-03-17-18-51-58-image.png)

- Created by Spring initializr
  
  - Empty at the beginning
  
  - Can add Spring Boot properties
    server.port=8585
  
  - Also add your own custom properties
    coach.name = Mickey Mouse

- Read data from : application.properties
  
  ```java
  @RestController
  public class FunRestController
  
      @Value ("${coach.name}")
      private String coachName;
  
      @Value ("${team.name}")
      private String teamName;
  ```
  
  ```java
  # configure server port
  server.port = 8484
  ```

## configure my props

```java
coach.name = Micky Mouse
 team.name = The Mouse Crew
```

## Static Content

![](/images/2023-03-17-Spring%20Initializr/2023-03-17-18-58-39-image.png)

- By default, Spring Boot will load static resources from "/static" directory

- Example of static resources
  HTML files, CSS, JavaScript, Images, etc

- **Do not use** the src/main/webapp directory if your application is packaged as a JAR.

Although this is a standard Maven directory, it works only with WAR packaging.

It is silently ignored by most build tools if you generate a JAR.

- WAR 패키징만 되니까 조심할 것

## Templates

- Spring Boot includes auto-configuration for following template engines

- FreeMarker

- Thymeleaf (제일 인기 많다고 함)

- Mustache

## Unit Tests

<img src="/images/2023-03-17-Spring%20Initializr/2023-03-17-19-05-55-image.png" title="" alt="" width="443">

출처 유데미, luv2code.com
