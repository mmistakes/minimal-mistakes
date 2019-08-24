---
title: "Spring IOC"
date: 2019-08-25
categories: web, spring
comments: true
---
> Spring Inversion of control

### IOC(Inversion-of-control)이란?
- 직역을 하면 제어의 역전이라 해석할 수 있다.
- 다시 쉽게 설명하면 개발자가 직접 객체의 생명 주기 등의 관리를 하는 것이 아니다.
- **컨테이너가 대신 객체를 관리**해주는 것을 의미한다.  

![spring ioc container](https://docs.spring.io/spring/docs/current/spring-framework-reference/images/container-magic.png)

- Spring IOC 컨테이너에 관리되는 객체 즉, Bean의 생성, 소멸, [DI](https://rerewww.github.io/web,/spring/dependency-injection/), 생명 주기를 대신 관리해주는 것이다.

### 결론
- 객체의 제어권이 컨테이너로 역전이 되며, 개발자는 컨테이너에 대한 Configuration을 설정하고 객체 제어는 컨테이너에 맡기므로 비즈니스 로직에 집중할 수 있다.