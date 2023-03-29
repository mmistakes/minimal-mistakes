---
layout: single
title: "What is Beans lifecycle?"
categories: Spring
tag: [Java,IoC,Inversion of Control,Bean Lifecycle,"@PostConstruct","@PreDestroy"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---

# Bean Lifecycle

![](https://i.imgur.com/JNJ4wVI.png)

## Bean Lifecycle Methods / Hooks
- You can add custom code during *bean initialization*
	- Calling custom business logic methods
	- Setting up handles to resources(db,sockets,file etc)

- You can add custom code during *bean destruction*
	- Calling custom business logic method
	- Clean up handles to resources(db,sockets,files etc)

## Init: method configuration

```java
@Component  
public class CricketCoach implements Coach{  
    public CricketCoach(){  
        System.out.println("In constructor: " + getClass().getSimpleName() );  
    }  
  
    // define our init method  
    @PostConstruct  
    public void doMyStartupStuff(){  
        System.out.println("In doMyStartupStuff(): " + getClass().getSimpleName());  
    }
.....
```

## Destroy: method configuration

```java
  
@Component  
public class CricketCoach implements Coach{  
    public CricketCoach(){  
        System.out.println("In constructor: " + getClass().getSimpleName() );  
    }  
  
    // define our init method  
    @PostConstruct  
    public void doMyStartupStuff(){  
        System.out.println("In doMyStartupStuff(): " + getClass().getSimpleName());  
    }  
  
    // define our destroy method  
    @PreDestroy  
    public void doMyCleanupStuff(){  
        System.out.println("In doMyCleanupStuff(): " + getClass().getSimpleName());  
    }
```

## Development Process

1. Define your methods for init and destroy
2. Add annotaions: @PostConstruct and @PreDestroy

![](https://i.imgur.com/K9eXBGK.png)
