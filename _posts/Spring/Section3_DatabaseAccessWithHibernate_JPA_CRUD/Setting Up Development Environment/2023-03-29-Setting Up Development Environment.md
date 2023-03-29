---
layout: single
title: "Spring 배너창 및 쓸데없는 정보 없애기"
categories: Spring
tag: [Java]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
```java
src->main->resources->application.properties

#Turn off the Spring Boot banner
spring.main.banner-mode=off

#Reduce logging level. Set logging level to warn
logging.level.root=warn
```