---
layout: single
title: "Field Injection"
categories: Spring
tag: [Java,IoC,Inversion of Control,Field Injection]
toc: true
toc_sticky: true
author_profile: false
sidebar:
 nav: "docs"

---

# Filed Injection

- 추천되지 않는 injection
- 유닛테스트하기 힘들다.
- 옛날버전 레거시에서 많이 볼 수 있음

## Because...

- Field Injection is no longer cool
  
  - In the early days, field injection was popular on Spring projects
    
    - In recent years, it has fallen out of favor
  
  - In general, it makes the code harder to unit test
  
  - As a result, the *spring.io* team does not recommend field injection
    
    - However, you will still see it being used on legacy projects

## Step 1: Configure the dependency injection with Autowired Annotation

```java
File: DemoController.java

public class DemoController {

    @Autowired
    private Coach myCoach; //(Field injection)

    // No need for constructor or setters

    @GetMapping("/dailyworkout")
    public String getDailyWorkout() {
        return myCoach.getDailyWorkout();
}

}
```
