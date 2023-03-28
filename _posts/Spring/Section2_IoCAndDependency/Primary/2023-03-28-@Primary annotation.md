---
layout: single
title: "@Primary annotation"
categories: Spring
tag: [Java,IoC,Inversion of Control,"@Primary","@Qualifier"]
toc: true
toc_sticky: true
author_profile: false
sidebar:


---

# @Primary annotation은 어디다가 쓰는거지

## Resolving issue with Multiple Coach implementations

- In the case of Multiple Coach implementations
	- We resolved it usung @Qualifier
	- We specified a coach by name 
	
- Alternate solution available ..
	- Instead of specifying a coach by name using @Qualifier
	- I simply need a coach .. I don't care which coach
		- If there are multiple coaches
		- Then you coaches figure it out ... and tell me who's the ***primary*** coach
	- But when using @Primary, can have *only one* for multiple implementations
	- If you mark multiple classes with @Primary... umm, we have a problem

```java
package com.luv2code.demo;  
  
import org.springframework.context.annotation.Primary;  
import org.springframework.stereotype.Component;  
  
@Component  
@Primary  // 기존의 Coach 클래스에서 Primary annotation 추가해줌.
public class CricketCoach implements Coach{  
    @Override  
    public String getDailyWorkout() {  
        return "Practice fast bowling for 15 min!!@!";  
    }  
}
```

```java
package com.luv2code.springcoredemo.rest;  
  
import com.luv2code.demo.Coach;  
import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.beans.factory.annotation.Qualifier;  
import org.springframework.web.bind.annotation.GetMapping;  
import org.springframework.web.bind.annotation.RestController;  
  
@RestController  
public class DemoController {  
  
    //define a private field for the dependency  
    private Coach myCoach;  
  
    //define a constructor for dependency injection  
    @Autowired  
    public DemoController(//@Qualifier("trackCoach") <- 더 이상 필요 없음
						    Coach theCoach){  
        myCoach = theCoach;  
    }  
  
    @GetMapping("/dailyworkout")  
    public String getDailyWorkout(){  
        return myCoach.getDailyWorkout();  
    }  
  
}
```


## Mixing @Primary and @Qualifier

- If you mix @Primary and @Qualifier
	- @Qualifier has higher priority
- @Primary leaves it up to the implementation classes
	- Could have the issue of multiple @Primary classes leading to an error
- @Qualifier allows to you be very specific on which bean you want
- In genenral, recommend using @Qualifier
	- More specific
	- Higher priority