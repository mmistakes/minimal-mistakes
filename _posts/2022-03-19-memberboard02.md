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
![](https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/002_001_projectStructure.JPG?raw=true)


## DB 설정
###### Mysql에 db와 user, 비밀번호를 생성하고 관련 권한을 부여한다.(Ctrl+Enter)
![](https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/mysqlRoot.JPG?raw=true)
<br><br>
![](https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/mysqlRootConnection.JPG?raw=true)
<br><br>
![](https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/mysqlRootConnectionTest.JPG?raw=true)
<br><br>
```sql
create database 디비이름;
create user 사용할 아이디@localhost identified by '사용할 비밀번호';
grant all privileges on 디비이름.* to 사용할 아이디@localhost;
```
<br><br>
![](https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/mysqlTest01connection.JPG?raw=true)
###### test01 커넥션을 열고 아래와 같이 입력 후 Ctrl + Enter를 눌러준다.
```sql
use test01;
```


# 회원가입
###### index 페이지를 아래와 같이 작성한다.
```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>index.html</title>
</head>
<body>

  <div th:align="center">
      <h2>index.html</h2><br><br>
      <a href="member/save">회원가입</a><br><br>

</body>
</html>
```
###### 화면에 회원가입 링크가 생성되었다.
![](https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberSave.JPG?raw=true)

###### controller 내 MemberController를 생성한 후 아래와 같이 작성한다.
```java
package com.ex.test01.controller;

import com.ex.test01.dto.*;
import com.ex.test01.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@Controller
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService ms;

    // 회원가입 화면 보여주기
    @GetMapping("/save")
    public String saveForm(Model model) {
        model.addAttribute("member", new MemberSaveDTO());
        return "member/save";
    }
    
  }
```