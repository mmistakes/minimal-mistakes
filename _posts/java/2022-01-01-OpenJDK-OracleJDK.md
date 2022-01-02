---
layout: single
title: "[Java] OpenJDK, OracleJDK 정리"
date: "2022-01-01 15:30:40"
categories: Java
tag: [Java, Enviroment, Version]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ✔ Goal

- **Open JDK**와 **Oracle JDK**의 차이 이해한다

## ✔ Open JDK & Oracle JDK

```yaml
OpenJDK & OracleJDK:
  - 개인적으로 Java를 사용할 때는 Oracle JDK를 사용해도 상관이 없다
  - 하지만 기업용으로 사용을 할 때는 Open JDK 사용을 지향해야 한다
```

`JDK` > `JRE` > `JVM`

Java를 실행하기 위해 JVM이 필요하고 자바 코드를 컴파일하기 위해서는 JDK가 필요하다
보통은 JDK를 설치하면 `JRE` 와 `JVM` 이 같이 설치된다

- **Oracle JDK** : 오라클에서 만든 JDK, `개인에게는 무료`, `기업용은 유료`
- **Open JDK** : Oracle JDK와 비슷한 성능, `항상 무료`

### 차이점

- **Oracle JDK**는 상용(**`유료`**) 이지만 **Open JDK**는 오픈소스 기반 (**`무료`**)다.
- **Oracle JDK**의 라이센스는 `Oracle BCL` (Binary Code License) Agreement,  
  **Open JDK**의 라이센스는 `Oracle GPL V2`다
- **Oracle JDK**는 `LTS`(장기 지원) 업데이트 지원을 받을 수 있지만, **Open JDK**는 LTS 없이 `6개월마다 새로운 버전 배포`
- **Oracle JDK**는 Oracle이 인수한 `Sun Microsystems 플러그인`을 제공, **Open JDK**는 지원하지 않는다
- **Oracle JDK**는 **Open JDK** 보다 `CPU 사용량`과 `메모리 사용량`이 적고, `응답 시간`이 높다

### 결론

**Oracle**은 **2019년 1월**부터 Java를 사용으로 사용하거나 지속적인 업데이트를 받으려는 기업 사용자에게 유료로 제공하고 있으며,  
현재 **2020년 2월 기준**으로 `Oracle JDK 8은 개인 또는 개발 용도의 사용은 무료`지만, 2021년부터는 유료화로 전환될 것으로  
알려져 있다

**JDK 유료화**에 따라 **개인 사용자**를 비롯해 **기업 사용자**는 OpenJDK를 적용하기 위해 `호환성`, `안정성`, `성능` 등의 `검증`이  
필요하다. 또한, 배포 버전에 따른 생산성 확인과 보안 이슈 등을 인지하고 테스트 해야 한다.

회사에서 서버를 사용할 때 Oracle JDK를 쓰면 과금을 하게 될 상황이 올 수 있다.  
때문에 `OpenJDK`를 사용할 가능성이 커질것이다.

### 오라클 OpenJDK 다운로드

- [Oracle 공식 사이트](https://www.oracle.com/kr/java/technologies/javase-jdk11-downloads.html)
- [Oracle JDK 설치 참고](https://sparkdia.tistory.com/64)
- [Open JDK 설치 참고](https://recipes4dev.tistory.com/173)

### 참고 자료

- [OKKY](https://okky.kr/article/490213)
- [Baeldung OpenJDK vs OracleJDK](https://www.baeldung.com/oracle-jdk-vs-openjdk)
- [Oracle JDK와 Open JDK의 차이점](https://lindarex.github.io/concepts/difference-between-oraclejdk-openjdk/)
- [오라클 JDK 11부터 유료화? - 백기선님](https://www.youtube.com/watch?v=F3kkYHo3haM)
