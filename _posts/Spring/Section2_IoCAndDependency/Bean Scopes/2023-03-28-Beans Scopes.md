---
layout: single
title: "What is Beans Scopes?"
categories: Spring
tag: [Java,IoC,Inversion of Control,Prototype Scope,Singleton,"@Scope","Prototype Beans"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Beans Scopes는 무엇인가
----
- Scope refers to the lifecycle of a bean
- How long does the bean live?
- How many instances are created?
- How is the bean shared?

## Default Scope
- Default scope is singleton

### Refresher: What is a Singleton?
- Spring Container creates only one instance of the bean, by default
- It is cached in memory
- All dependency injections for the bean
	- will reference the SAME bean

![](https://i.imgur.com/gaZxHqE.png)

- ***Both point to the same instance*** when it comes to ***CricketCoach***
- Because by default, spring beans are singleton beans
- 인스턴스는 한 개만 생성된거임 -> 싱글톤이 디폴트라 같은 bean을 참조한다.

### Explicitly Specify Bean Scope
```java
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class CricketCoach implements Coach {
....
}
```

### Additional Spring Bean Scopes
---


| Scope          | Description                                                 |
| -------------- | ----------------------------------------------------------- |
| singleton      | Create a single shared instance of the Bean. Default scope. |
| prototype      |    Creates a new bean instance for each container request.                                                         |
| request        |           Scoped to an HTTP web request. Only used for web apps.                                                  |
| session        |            Scoped to an HTTP web session. Only used for web apps.                                                 |
| global-session |                     Socped to a global HTTP web session. Only used for web apps.                                       

#### Prototype Scope Example
- new object instance for each injection

```java
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class CricketCoach implements Coach {
....
}
```

![](https://i.imgur.com/0w7eJCs.png)

- 여기서는 CricketCoach 가 각각 다른 인스턴스 생성
- They point to two different areas of memory or two different beans

#### Checking on the scope

##### default

```java
@RestController  
public class DemoController {  
  
    private Coach myCoach;  
	private Coach anotherCoach;  
  
    @Autowired  
    public DemoController(
			    @Qualifier("cricketCoach") Coach theCoach
			    @Qualifier("cricketCoach") Coach theAnotherCoach
			    ){  
        myCoach = theCoach; 
        anotherCoach = theAnotherCoach; 
    }  
  
    @GetMapping("/check")  
    public String check(){  
        return "Comparing beans: myCoach == anotherCoach, "
        + (myCoach == anotherCoach); 
        // Check to see if this is the same bean
        // True or False depending on the bean scope
        // Singleton : True
        // Prototype : False
    }  
  
}
```

![](https://i.imgur.com/NnjdeC7.png)
- It means same bean by default

---

##### prototype
```java
@Component  
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)  
// add @Scope

public class CricketCoach implements Coach{  
    public CricketCoach(){  
        System.out.println("In constructor: " + getClass().getSimpleName() );  
    }  
    @Override  
    public String getDailyWorkout() {  
        return "Practice fast bowling for 15 min!!@!";  
    }  
}
```

![](https://i.imgur.com/VRyKBAh.png)
- It means each *cricketCoach* is different

#### Prototype Beans and Destroy Lifecycle
- **For "prototype" scoped beans, Spring does not call the destroy method.**
- **_In contrast to the other scopes, Spring does not manage the complete lifecycle of a prototype bean_**_: the container instantiates, configures, and otherwise assembles a prototype object, and hands it to the client, with no further record of that prototype instance._
- _Thus, although initialization lifecycle callback methods are called on all objects regardless of scope,_ **_in the case of prototypes, configured destruction lifecycle callbacks are not called_**_. The client code must clean up prototype-scoped objects and release expensive resources that the prototype bean(s) are holding._

#### Prototype Beans and Lazy Initialization
- Prototype beans are lazy by default. There is no need to use the @Lazy annotation for prototype scopes beans.