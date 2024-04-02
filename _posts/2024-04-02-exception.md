---
layout: single
title: 'Spring Exception 처리'
categories: Spring
tag: [Spring]
toc: true 
author_profile: false
sidebar:
    nav: "counts"
published: true

---

## [Spring] Exception 처리하기 

Spring을 이용한 웹 개발 미니프로젝트 중 효율적인 Exception 처리 로직에 관해 공부할 필요성을 느껴 예외 처리 방법에 대한 글을 작성할려한다.

### 예외(Exception) vs 오류(Error)
종종 예외와 오류를 동일하게 사용하는 경우가 많은데 둘은 명확히 다른 개념이다.

오류는 시스템 비정상적인 상황이 생겼을 때 발생한다. 이는 시스템 레벨에서 발생하는 심각한 수준의 문제이다. 

예외는 프로그래머가 작성한 로직에서 발생하는 문제이다. 미리 예측하고 처리할 수있기 때문에 올바르게 핸들링하는것이 중요하다. 


### 예외 처리 방법
일반적으로 JAVA 에서 예외 처리 방법의 구조는 try-catch 문이다. 

```java
try {
    // 예외가 발생할 가능성이 있는 코드
} catch(Exception e1) {
    // 예외를 처리하는 코드1
} catch(Exception e2) {
    // 예외를 처리하는 코드2
}finally{
    // 예외 발생 여부에 관계없이 수행되는 코드 
}
```
예외가 발생할 가능성이 있는 코드를 try 블럭으로 감싸고, 잡고싶은 예외를 catch 블럭에 명시해 주는 방식이다. 

catch블럭에서 정의한 예외 타입과 동일한 예외가 발생하면 catch 블럭에서 예외를 처리해준다. 

### 예외 던지기 

예외를 강제로 발생하는 방법이 있는데 








