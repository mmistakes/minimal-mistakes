---
layout: single
title: "02-회원제 게시판 만들기_SpringBoot와 JPA "
categories: memberboard
tag: [springbot, jpa]
toc: true
author_profile: false
toc: false
sidebar:
  nav: "docs"
search: true
---

**[공지사항]** <strong> [개인적인 공부를 위한 내용입니다. 오류가 있을 수 있습니다.] </strong>
{: .notice--success}

### 02-기본환경 설정 - SpringBoot
###### DB와의 연동과 Validation을 위해 build.gradle 파일에 내용을 추가해준다.
```java
plugins {
    id 'org.springframework.boot' version '2.6.2'
    id 'io.spring.dependency-management' version '1.0.11.RELEASE'
    id 'java'
}

group = 'com.ex'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

configurations {
    compileOnly {
        extendsFrom annotationProcessor
    }
}

repositories {
    mavenCentral()
}

dependencies {
    
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-validation'

    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'

    runtimeOnly 'mysql:mysql-connector-java'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
}

test {
    useJUnitPlatform()
}
```
###### 위에서 추가된 내용은 추려보았다.

```java
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    runtimeOnly 'mysql:mysql-connector-java'		
    }
```

###### 패키지를 아래와 같이 모두 생성해준다.(dto, service, entity, repository)
<img src="C:\Gibson1211.github.io\assets\images\002_001_projectStructure.JPG"> 

######

