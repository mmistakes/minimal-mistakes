---
layout: single
title: Spring ApplicationContext
categories: spring
tag: [spring]
toc: true
toc_sticky: true
author_profile: false
sidebar:
    nav: "docs"
search: true
sidebar:
    nav: "counts"
typora-root-url: ../


---

## 핵심 목표



### 스프링 애플리케이션 컨택스트

스프링 애플리케이션은 스프링의 IoC 컨택스트로서, 단순한 BeanFactory의 확장입니다.

추가적인 기능(국제화, 이벤트 발행/수신, 리소스 접근 등)을 제공합니다.

+ IoC/DI: 객체 생성 및 의존성 주입을 통해 결합도를 낮추고 유지보수성을 높인다
+ AOP: 횡단 광심사를 분리하여 코드의 재사용성을 높이고 개발자의 객체지향 모듈화를 지원한다.

스프링 애플리켙이션 컨택스트는 제어의 역전과 의존성 주입의 역할을 하는 컨테이너입니다.

