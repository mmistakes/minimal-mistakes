---
layout: single
title: "[Java] OpenJDK 설치"
date: "2022-01-01 15:30:30"
categories: Java
tag: [Java, Enviroment, Version]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ✔ Goal

- 개발환경 구축 시 참고용으로 사용
- **AdoptOpenJDK** 사이트 내에서 다운 받아 사용 해보기

## ✔ 개발 환경 구축 및 진행 순서

1. JDK(**Java Development Kit**) 설치
2. Intellij(**IDE**) 설치
3. Spring Boot(**Project**)
4. Hello Wolrd 출력

### Window cmd

```yaml
cmd:
  - java -version #현재 로컬 PC 자바 버전 확인
```

- **자바 버전** 확인
- 자바가 깔려있지 않기 때문에 Cmd 창에 나오지 않을 것이다

### Java 설치 (JDK)

<img width="500" alt="스크린샷 2021-08-11 00 00 54" src="https://user-images.githubusercontent.com/53969142/128890875-57e43ee1-9d96-4b00-b15b-2c9e6a1c4b6f.png">

- [AdoptOpenJDK 설치](https://adoptopenjdk.net/?variant=openjdk8&jvmVariant=hotspot)
- 위 사이트에 접속하여 버전에 맞는 `JDK`와 `JVM`을 다운 받는다

### Download 완료

- 해당 파일 다운로드 완료 후 Next를 계속 클릭하여 설치를 진행한다

### Window Cmd

```yaml
cmd:
  - java -version #현재 로컬 PC 자바 버전 확인
```

- 설치 후 **자바 버전**을 다시 확인한다

### IDE (Intellij 설치)

<img width="400" alt="스크린샷 2021-08-11 00 18 25" src="https://user-images.githubusercontent.com/53969142/128893784-d9854ef2-3c2c-4043-afba-f323e9b9c114.png">

- [Intellij Community 다운](https://www.jetbrains.com/ko-kr/idea/download/#section=mac)
- 해당 사이트에 접속하여 Intellij Community 버전을 클릭
- 회사에서는 Ultimate 버전을 사용할 것 같은데, 어떻게 할지 모르겠다 (필자는 Ultimate 버전)

### 다운로드 완료 후

- Intellij 아이콘을 클릭하여 실행 해준다

### 참고 자료

- [Java - Windows10 환경 OpenJDK 설치 및 환경설정](https://haenny.tistory.com/219)
- [Java - OpenJDK 설치](http://wandlab.com/blog/?p=217)
- [스프링 부트 개발 환경 구축](https://www.youtube.com/watch?v=EYmVJuRLHDQ)
