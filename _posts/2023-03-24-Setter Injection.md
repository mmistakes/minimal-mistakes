---
layout: single
title: "Setter Injection"
categories: Spring
tag: [Java,IoC,Inversion of Control,Setter Injection
,"@Autowired",Annotation]
toc: true
toc_sticky: true
author_profile: false
sidebar:
 nav: "docs"

---

# 세터 인젝션이란?

- 세터 매서드로 dependencies 주입

## Aturowiring Example

- Inejecting a Coach implementation

- Spring will scan for @Components

- Any one implements the Coach imterface??

- If so, let's inject them. For example: CricketCoach  

## Development Process - Setter Injection

1. Create setter method(s) in your class for injections

2. Configure the dependency injection with @Autowired Annotation

### Step 1: Create setter method(s) in your class for injections

```java
File: DemoController.java

public class DemoController {

    private Coach myCoach;

    public void setCoach(Coach theCoach){

        myCoach = theCoach;
}
}
```

### Step 2: Configure the dependency injection with Autowired Annotation

File: DemoController.java

public class DemoController {

```java
File: DemoController.java

public class DemoController {

    private Coach myCoach;

    @Autowired
    public void setCoach(Coach theCoach){

        myCoach = theCoach;
}
}
```



## Injection Types - Which one to use?

- Constructor Injection
  
  - Use this when you have required dependencies
  
  - Generally recommended by the *spring.in* development team as first choice

- Setter Injection
  
  - Use this when you have optional dependencies
  
  - If dependency is not provided, your app can provide reasonable default logic
