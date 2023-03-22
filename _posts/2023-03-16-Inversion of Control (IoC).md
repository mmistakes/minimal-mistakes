---
layout: single
title: "IoC 가 그래서 뭐지?"
categories: Spring
tag: [Java,IoC,Inversion of Control]
toc: true
toc_sticky: true
author_profile: false
sidebar:
    nav: "docs"

---

# What is IOC?

Well, it's simply the design process of externalizing the construction and management of your objects.

So in a nutshell, it basically says that your application is gonna outsource the creation and management of the objects, and that outsourcing will be handled by a object factory.

And that's the big idea of Inversion of Control.

요약 하자면 IoC 는 디자인 프로세서고 변경이 자유롭다.

## Spring Container

![Spring - IoC-Page-1.drawio 1.png](/images/2022-03-16-Inversion of Control (IoC)/6a07f695e7826d193a2afcb1729ef147e6572ac7.png)

- Primary functions
  
  - Create and manage objects (***Inversion of Control***)
  
  - Inject object dependencies(***Dependency Injection***)

### Cofiguring Spring Container

- XML configuration file (***legacy***)

- Java Annotations (***modern***)

- Java Source Code (***modern***)

## Dependency Injection

- The dependency inversion principle

- The client delegates to another object
  
  - The responsibility of providing its dependencies

### Dependency inversion Injection

![Spring - IoC-페이지-2.drawio.png](/images/2022-03-16-Inversion%20of%20Control%20(IoC)/0b1dffb9a2bec34a68d433443a8f99c0e5114260.png)

그림으로 설명하면 이런 개념이다.
내가 직접 자동차를 생산하지는 않는다.

You just outsorcethe construction and injection of your object to an external entity.
In this case, That's the car factory.
They inject the engine, tires and so on for you.
You don't have to build the car.

![Spring - IoC-Page-1.drawio (1) 1.png](/images/2022-03-16-Inversion%20of%20Control%20(IoC)/db9017c5c5fd753754c32159c150db03cb104293.png)

![Pasted image 20230303054847.png](/images/2022-03-16-Inversion%20of%20Control%20(IoC)/5dcaa5756b8e65ee6a01683f49865f19976ebf51.png)

## Demo Example

- Coach will provide daily workouts

- The DemoController wants to use a Coach
  
  - New helper: **Coach**
  
  - This is a ***dependency***

- Need to ***inject*** this ***dependency***

![](/images/2023-03-16-Inversion%20of%20Control%20(IoC)/2023-03-22-22-55-44-image.png)

## Injection Types

- There are multiple types of injection with Spring

- We will cover the two recommended types of injection
  
  - Constructor Injection
  
  - Setter Injection  

### Which one to use?

- Constructor Injection
  
  - Use this when you have required dependencies
  
  - Generally recommended by the spring.io development team as first choice

- Setter Injection
  
  - Use this when you have optional dependencies
  
  - If dependency is not provided, your app can provide reasonable default logic

## What is Spring AutoWiring

- For dependency injection, Spring can use autowiring

- Spring will look for a class that matches
  
  - ***matches by type*** : class or interface

- Spring will inject it automatically .. hence it is autowired

### Autowiring Example

- Injecting a Coach implementation

- Spring will scan for @Components

- Any one implements the Coach interface??

- If so, let's inject them. For example: Cricket Coach

### Example Application

![](/images/2023-03-16-Inversion%20of%20Control%20(IoC)/2023-03-22-23-10-53-image.png)

## Development Process - Constructor Injection

1. Define the dependency interface and class

2. Create Demo REST Controller

3. Create a constructor in your class for injections

4. Add ***@GetMapping*** for /dailyworkout

### Step 1: Define the dependency interface and class

```java
File: Coach.java

package com.luv2code.springcoredemo;

public interface Coach {
    String getDailyWorkout();
}
```

```java
File: CricketCoach.java

package com.luv2code.springcoredemo;

import org.springframework.sterotype.Component;

@Component // <- marks as a Spring Bean
public class CricketCoach implements Coach {

    @Override
    public String getDailyWorkout() {
        return "Practice fast bowling for 15 min";
}
}
```

#### @Component annotation

- @Component annotation marks the class as Spring Bean
  
  - A Spring bean is just a regular Java class that is managed by Spring

- @Component also makes the bean available for dependency injection

### Step 2: Create Demo REST Controller

```java
File: DemoController.java

package com.luv2code.springcoredemo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

}
```

### Step 3: Create a constructor in your class for injections

```java
File: DemoController.java

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {
    private Coach myCoach;

    @Autowired
    public DemoController (Coach theCoach) {
        myCoach = theCoach;
}
}
```

- @Autowired annotation tells Spring to inject a dependency

- if you only have one constructor then @Autowired on constructor is optional

### Step 4: Add @GetMapping for /dailyworkout

```java
File: DemoController.java

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class DemoController {
    private Coach myCoach;

    @Autowired
    public DemoController (Coach theCoach) {
        myCoach = theCoach;
}

    @GetMapping
    public String getDailyWorkout() {
        return myCoach.getDailyWorkout();
}

}
```

![](/images/2023-03-16-Inversion%20of%20Control%20(IoC)/2023-03-23-02-51-23-image.png)

참고로 no usages 는 무시해도 된다.

왜냐하면 스프링 내부에서 알아서 돌아가는데 IDE는 인식하지 못하는 경우가 있다.

이런 경우에는 무시하면 된다.

출처 유데미 & https://www.baeldung.com/inversion-control-and-dependency-injection-in-spring
