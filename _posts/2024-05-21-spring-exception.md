---
layout: single
title: '[Spring] ExceptionHandler와 ControllerAdvice를 이용해 예외 처리하기'
categories: JAVA
tag: [JAVA, Spring]
toc: true 
author_profile: false
sidebar:
    nav: "counts"
published: false

---

## 전역 Exception 처리 

@ControllerAdvice 어노테이션을 사용하면 개별 컨트롤러뿐만 아니라 전체 컨트롤러에 적용할 수 있다.

ControllerAdvice는 세가지 타입의 메소드를 지원한다. 
- @ExceptionHandler 가 붙은 메소드
- @ModelAttribute가 붙은 메소드.
- @initBinder가 붙은 메소드

출처: https://devscb.tistory.com/122 [SCB개발자이야기:티스토리]


(@RestControllerAdvice 는 @ControllerAdvice 와 같고, @ResponseBody 가 추가된 것)
 
위 에서 @RestControllerAdvice의 대상으로 RestController을 지정하였는데, @RestController 어노테이션이 있는 대상에만 적용한다는 뜻입니다.

출처: https://hstory0208.tistory.com/entry/Spring-스프링에서-API-예외오류-처리하기 [< Hyun / Log >:티스토리]

https://yulee.tistory.com/113

https://dangdangee.tistory.com/entry/Spring-ExceptionHandler-ControllerAdvice를-통한-예외-처리

https://kdyspring.tistory.com/45

https://dukcode.github.io/spring/spring-custom-exception-and-exception-strategy/



RestControllerAdvice ControllerAdvice