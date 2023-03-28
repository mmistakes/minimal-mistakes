---
layout: single
title: "Lazy Initialization"
categories: Spring
tag: [Java,IoC,Inversion of Control,"@Lazy"]
toc: true
toc_sticky: true
author_profile: false
sidebar:


---

# Lazy Initialization 은 뭐지?

## Initialization
- By default, when your application starts, all beans are initialized
	- @Component, etc..
- Spring will create an instance of each and make them available

## Diagnostics: Add println to constructors
```java
@Component
public class CricketCoach implements Coach{
	public CricketCoach(){
		System.out.println(
		"In constructor: " + getClass().getSimpleName()
		);
	}
}

@Component
public class BaseballCoach implements Coach{
	public BaseballCoach(){
		System.out.println(
		"In constructor: " + getClass().getSimpleName()
		);
	}
}

......

```

## When we start the application
---
In constructor : CricketCoach
In constructor : BaseballCoach
In constructor : TennisCoach
In constructor : TrackCoach
-> By default, when your application starts, all beans are initialized. Spring will create instance of each and make them available.
---

## Lazy Initialization
- Instead of creating all beans up front, we can specify lazy initialization
- A been will only be initialized in the following cases:
	- It is needed for dependency injection
	- Or it is explicitly requested
- Add the @Lazy annotation to a given class

### Lazy Initialization with @Lazy
```java
@Component
@Lazy 
public class TrackCoach implements Coach {
	public TrackCoach() {
		System.out.println("In constructor: " + getClass().getSimpleName()
		)
		.....
	}
}
```
- Bean is only initialized if needed for dependency injection

```java
@RestController
public class DemoController {
	private Coach myCoach;

	@Autowired
	public DemoController(@Qualifier("cricketCoach") Coach theCoach){
		myCoach = theCoach;
	}
}
```
- Inject cricketCoach

```java
---console---
In constructor : CricketCoach
In constructor : BaseballCoach
In constructor : TennisCoach
---
```
- Since we are NOT injecting TrackCoach .. it's not initialized

---
- To configure other beans for Lazy initialization
	- We could need to add @Lazy to each class
- Turns into tedious work for a large number of classes
- I wish we could set a global configuration property.. --> The answer is YES

### Lazy Initialization - Global configuration
```java
File: application.properties

Spring.main.lazy-initialization=true
```
- All beans are lazy...
- No beans are created until needed, ***Including our DemoController***
- Once we access REST endpoint/dailywork
- Spring will determine dependencies for DemoController
- For dependency resolution, Spring creates instance of CricketCoach first...
- Then creates instance of DemoController and injects the CricketCoach

### So Lazy? 
- Advantages
	- Only create objects as needed
	- May help with faster startup time if you have large number of components
- Disadvantages
	- If you have web related components like @RestController, not created until requested
	- May not discover configuration issues until too late
	- Need to make sure you have enough memory for all beans once created

- Lazy initialization feature is disabled by defualt
- You should profile your application before configuring lazy initiailiation.
- Avoid the common pitfall of premature optimization

출처 : luv2code.com