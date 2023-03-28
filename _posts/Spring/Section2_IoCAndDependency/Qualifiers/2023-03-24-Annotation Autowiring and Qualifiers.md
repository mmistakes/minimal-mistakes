---
layout: single
title: "Annotation Autowiring and Qualifiers"
categories: Spring
tag: [Java,IoC,Inversion of Control,Setter Injection
,"@Autowired",Annotation,"@Qualifier"]
toc: true
toc_sticky: true
author_profile: false
sidebar:


---

# Autowiring 과 Qualifiers는 무엇인가?

## Autowiring

- Injecting a Coach implementation

- Spring will scan @Components

- Any one implements Coach interface??

- If so, let's inject them... *but.. which one?*

### Multiple Coach Implementations

![](https://i.imgur.com/AE6I5K9.png)


- 다양한 Coach Implementation 이 존재하면 어떻게 될까?

- 오류발생함 -> 왜냐하면 Spring이 뭘 선택해야할지 모름

### Solution: Be specific! - @Qualifer

#### For Constructor Injection

```java
@RestController
public class DemoController {

    private Coach myCoach;

    @Autowired
    public DemoController(@Qualifier("cricketCoach") Coach theCoach){
        myCoach = theCoach;
} //Coach 앞에 @Qualifier("클래스 이름") 주입.

    @GetMapping("/dailyworkout")
    public String getDailyWorkout() {
        return myCoach.getDailyWorkout();
}
}
```

- Specific the ***bean id*:** cricketCoach

- 이 ***bean id*** 는 CricketCoach와 같은 이름이면서 *소문자* 로 시작하면 된다.
- Other ***bean ids*** we could use: baseballCoach, trackCoach, tennisCoach..

#### For Setter Injection

- If you are using Setter injection, can also apply **@Qualifier** annotation
  
  ```java
  @RestController
  public class DemoController {
  
      private Coach myCoach;
  
      @Autowired
      public void setCoach(@Qualifier("cricketCoach") Coach theCoach){
          myCoach = theCoach;
  } //@Qualifier 똑같이 사용
  
      @GetMapping("/dailyworkout")
      public String getDailyWorkout() {
          return myCoach.getDailyWorkout();
  }
  }
  ```

- Give ***bean id*** : cricketCoach with starting lower-case
- Other ***bean ids*** we could use: baseballCoach, trackCoach, tennisCoach..
