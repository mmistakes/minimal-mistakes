---
title: "Spring Dependency Injection(DI)"
date: 2021-04-07 12:00:00 +0900
categories: spring
comments: true
---

## Field Injection

```java
@Service
public class TestServiceImpl implements TestService {

    @Autowired
    private TestService testService;

    ...
}
```

## Setter based Injection
* Spring 3까지는 권장되었지만 4.3부터는 Constructor based Injection을 권장함

```java
@Service
public class TestServiceImpl implements TestService {

    private TestService testService;

    @Autowierd
    public void setTestService( TestService testService) {
        this.testService = testService;
    }

    ...
}
```

## Constructor based Injection
* final 선언이 가능하기 때문에 불변성
* 순환참조 방지 -> BeanCurrentlyInCreationException 발생
* Null을 주입하지 않는한 NullPointerException을 방지함
* 단일 생성자인 경우 @Autowired를 붙여주지 않아도 됨
* 생성자의 인자수가 많아질 경우 

```java
@Service
public class TestServiceImpl implements TestService {

    private final TestService testService;

    @Autowierd
    public TestServiceImpl( TestService testService) {
        this.testService = testService;
    }

    ...
}
```
