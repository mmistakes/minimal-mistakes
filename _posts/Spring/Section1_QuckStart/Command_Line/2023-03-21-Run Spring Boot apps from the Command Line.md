---
layout: single
title: "Run Spring Boot apps from the Command Line"
categories: Spring
tag: [Java,mvn,mvnw]
toc: true
toc_sticky: true
author_profile: false
sidebar:
     

---

# Command Line을 왜 사용할까?

- 자바스크립트를 배울 때도 그렇고 대부분 커맨드라인의 편의성을 많이 이야기하는데 역시나!

- 딥러닝도 파이썬 그냥 커맨드라인으로 돌리던데...

- 스프링에서도 커맨드 라인을 통해서 앱을 구동하는 방법에 대해서 나온다 

- 왜죠?

## No need to have IDE open/running

- 서버 자체가 JAR 파일에 내장되어 있음

- 분리된 서버를 설치할 필요가 없음

- Tomcat? 역시 필요 없음

- Becuase Spring Boot apps are self-contained !

![](/images/2023-03-21-ssss/2023-03-21-20-03-35-image.png)

## Two options for running the app

- Option 1: Use java - jar

- Option 2: Use Spring Boot Maven plugin
  
  - mvnw spring-boot: run

### Option 1: Use java - jar

![](/images/2023-03-21-ssss/2023-03-21-20-09-21-image.png)

### Option 2: Use Spring Boot Maven plugin

<img title="" src="/images/2023-03-21-ssss/2023-03-21-20-10-48-image.png" alt="" width="177"> 

- mvnw allows you to run a Maven project
  
  - No need to have Maven install
  
  - If correct version of Maven is NOT found on your computer
    
    - **Automatically downloads** correct version and runs Maven

- Two files are provided
  
  - mvnw.cmd for MS windows
  
  - mvnw.sh for Linux/Mac

```java
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
```

- To package executable jar or war archive
  Can also easily run the app

- Can also just use: 
  mvn package
  mvn spring-boot:run

## Development Process

1. Exit the IDE

2. Package the app using mvnw package

3. Run app using java -jar

4. Run app using Spring Boot Maven plugin, mvnw spring-boot:run

### 근데 또 안되기 시작.. 하아!

- 해결!
  
  - 처음에 maven 안 깔려 있어도 된다고 그래서 그렇구나 했는데 안됨...
  
  - 그래서 환경설정도 하고 다 깔았는데도? 안됨
  
  - 알고보니 강의는 맥 기준이고 윈도우에서는 ./ 빼고 명령어 실행하라고 했는데 명령어 인식 자체를 못함...
  
  - 자세히보니 맥이랑 윈도우랑 스프링 생성되는 파일 위치가 조금 달랐다.. 아니면 버전이 달라서 그런건지...무튼 실행했지만 역시나 안됨..
  
  - 원인은 자바 17 이랑 11 둘 다 깔려 있었는데 환경설정에 11로 되어 있어서 자바 17로 바꾸니 잘 진행 되었다.
    
    - 예전에는 환경설정 막히면 맨붕이였는데 이제는 별로 어렵지 않음

- cd target -> dir *.jar로 확인

- java -jar {확인된 이름} -> 스프링 구동됨

- Maven plugin으로도 가능
  
  - cd.. -> mvn spring-boot:run 으로도 구동

출처 유데미
