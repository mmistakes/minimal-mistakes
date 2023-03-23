---
layout: single
title: "Injection 비교"
categories: Spring
tag: [Java,IoC,Inversion of Control,Injection 비교]
toc: true
toc_sticky: true
author_profile: false
sidebar:
 nav: "docs"

---

# Spring Injection Types

- Recommended by the spring.io development team
  
  - Constructor Injection: required dependencies
  
  - Setter Injection: optional dependencies

- Not recommended by the *spring.io* development team
  
  - Field Injection

## 결론

- 어렵게 생각할거 없이 Field Injection은 사용안하면 된다. 

- 물론 알아둬야하는데 그 이유는 오래된 레거시에서 볼 수도 있기 때문이다.

- Field Injection이 추천되지 않는 가장 큰 이유는 유닛 테스트 하기가 어려워지기 때문이다.
