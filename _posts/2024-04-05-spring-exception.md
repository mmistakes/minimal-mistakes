---
layout: single
title: '[JAVA][Spring] 스프링에서 API Exception 처리하기
categories: Spring
tag: [JAVA, Spring]
toc: true 
author_profile: false
sidebar:
    nav: "counts"
published: true

---

Spring에서 예외가 발생했다면 우리는 접속한 환경에 따라 다른 에러 처리를 받게 될 것이다. 만약 우리가 웹페이지로 접속했다면 다음과 같은 whiltelabel 에러 페이지를 반환받는다.
출처: https://mangkyu.tistory.com/204 [MangKyu's Diary:티스토리]

## @ExceptionHandler 

스프링은 API 예외 처리 문제를 해결하기 위해 **@ExceptionHandler** 라는 annotation을 제공하며, @ControllerAdvice라는 annotation을 이용해 프로젝트 전체에 적용합니다. 


## Global Exception Handling - @ControllerAdvice
@ControllerAdvice 어노테이션을 사용하면 개별 컨트롤러뿐만 아니라 전체 컨트롤러에 적용할 수 있습니다.

@ControllerAdvice가 붙은 어떠한 클래스는 controller advice가 되며, 세가지 타입의 메소드가 지원됩니다.

