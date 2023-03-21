---
layout: single
title: "Spring Boot DevTools?"
categories: Spring
tag: [Java,Devtools]
toc: true
toc_sticky: true
author_profile: false
sidebar:
    nav: "docs"

---

## The problem

- When running Spring Boot applications
  
  - If you make changes to your source code
  
  - Then you have to manually restart your application

## Solution: Spring Boot Dev Tools

- Spring-boot-devtools to the rescue!

- Automatically restart your application when code is updated

- Simply add the dependency to your POM file

- No need to write additional code

- For IntelliJ, need to set additional configurations

## Spring Boot DevTools

- Adding the dependency to your POM file

```java
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtoos</artifactId>
        </dependency>
```

- 근데 IntelliJ 무료 버전은 DevTools 기본으로 제공 안해줌..

- Mac 은 Preferences -> Build, Execution, Deployment > Compiler

- Window 는 File -> Settings -> Build, Execution, Deployment > Compiler
  
  - Check box: Build project automatically
    
    ![](/images/2023-03-17-Spring%20Boot%20Dev%20Tools/2023-03-17-20-37-34-image.png)

- Additional setting

- Select: Preferences -> Advanced Settings
  
  - Check box : Allow auto-make-to ..
  
  ![](/images/2023-03-17-Spring%20Boot%20Dev%20Tools/2023-03-17-20-39-29-image.png)

이렇게 2개 체크하고 밑에 코드 pom.xml에 추가해 주면 끝 (새로고침 잊지말기)

```java
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
        </dependency>
```
