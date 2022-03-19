---
layout: single
title: "01-회원제 게시판 만들기_SpringBoot와 JPA "
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

### 01-기본환경 설정 - SpringBoot
###### 화면구성 : thymeleaf,  DB(ORM): JPA, dependency: gradle
###### thymeleaf는 html에 직접 작성이 가능하고 확장성이 높다. 또한 JPA를 사용하기에 mysql query를 입력하지 않아도 사용이 가능하다.
###### gradle은 간단한 코드로 dependency 관리가 가능하다.
<br>

###### 아카데미 버전의 라이센스를 부여받은 인텔리제이를 인스톨 후 new project의 Spring Initializr에 가서 환경설정을 진행하였다.
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3b440411-5b1f-4190-b0c9-f25155ddd85d%2FUntitled.png?table=block&id=292dd57f-0655-4ae8-8fa6-62598fdebcc3&spaceId=7cb441ef-e066-4225-8a36-74fcd90a280b&width=1610&userId=2263adcd-10f2-4a60-bb39-3b4fa73b1b68&cache=v2)
<br><br>
<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6d652383-8950-4ed9-a42d-951b05ee057f%2FUntitled.png?table=block&id=3196bb9b-7d57-49eb-b62c-e2f6b472f322&spaceId=7cb441ef-e066-4225-8a36-74fcd90a280b&width=2000&userId=2263adcd-10f2-4a60-bb39-3b4fa73b1b68&cache=v2" width="800" height="900">
<br><br>
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fea9cc3d9-6a8e-4732-961d-4cfad4c2260a%2FUntitled.png?table=block&id=534cd76a-b048-44a9-95cb-66696d69f90f&spaceId=7cb441ef-e066-4225-8a36-74fcd90a280b&width=2000&userId=2263adcd-10f2-4a60-bb39-3b4fa73b1b68&cache=v2)
###### 여기까지 완료 후 확인을 finish를 클릭하면 dependency를 자동으로 다운로드하며 적게는 1분안쪽으로 길게는 1분 이상 작업을 혼자 진행한다. 모든 작업이 끝나면 아래의 화면을 확인할 수 있고 BUILD SUCCESSFUL 소요시간을 확인할 수 있다.
<br>
###### Setting으로 가서 아래항목을 체크 표시해준다.
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F52794626-56d2-403a-b5d3-256d6b8f42cd%2FUntitled.png?table=block&id=5a3a6053-9fcf-4d05-a205-523f17d00ef5&spaceId=7cb441ef-e066-4225-8a36-74fcd90a280b&width=2000&userId=2263adcd-10f2-4a60-bb39-3b4fa73b1b68&cache=v2)
<br>
###### 프로젝트 부분을 펼쳐보면 Main Method를 확인할 수 있다.
![](/assets/images/mainmethod.png)

<br>
###### resource  폴더는 static과 template로 구성되어 있다. static은 정적자원이며 css, javascript, image 파일 등 변경이 이뤄지지 않는 것들을 정적자원이라고 한다. template은 화면용 파일로 html 파일이 들어간다. spring의 views폴더와 기능이 유사하다.
###### gitignore 항목은 git 올리고 싶지 않은 파일이나 폴더를 지정하는 것으로 나중에 git을 사용할 때 무시한다.
###### build.gradle 파일은 gradle이라는 언어로 작성된 파일로 스프링 프레임워크 버전과, dependency 버전 그리고 어떤 언어로 작성되는지 적혀있다. 추가항목이 있는 경우 해당 문구를아래와 같이 삽입한 후 코끼리 아이콘을 꼭 눌러줘야  업데이트가 정상적으로 이뤄진다.
![](/assets/images/elephant.JPG)
<br>

```
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
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
    implementation 'org.springframework.boot:spring-boot-starter-web'

    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'

    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
}

test {
    useJUnitPlatform()
}
```

###### 위의 코딩 중에 아래 항목이 맞게 삽입되어 있는지 확인해 본다.
```java

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
    implementation 'org.springframework.boot:spring-boot-starter-web'

    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'

    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

```
<br>

###### 아래와 같이 resources 폴더 내 application.properties를 삭제한다.
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2c06c6fc-a2df-447d-905f-0b269650608c%2FUntitled.png?table=block&id=741a71fc-7e74-42b1-91f4-9f3dd33bbd55&spaceId=7cb441ef-e066-4225-8a36-74fcd90a280b&width=2000&userId=2263adcd-10f2-4a60-bb39-3b4fa73b1b68&cache=v2)

###### resources 폴더 우클릭 new → file 선택 후 아래와 같이 application.yml 파일을 생성한다.
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4015bffe-61b4-4556-afff-1a6e22e449f3%2FUntitled.png?table=block&id=72b320e2-ea4e-46c0-bb3d-4201bbcc7c59&spaceId=7cb441ef-e066-4225-8a36-74fcd90a280b&width=2000&userId=2263adcd-10f2-4a60-bb39-3b4fa73b1b68&cache=v2)

###### application.yml 파일을 열어 서버포트를 설정한다. port: 8091(각자 알아서 설정) port 작성 시 들여쓰기의 위치를 잘 지켜야 기능이 정상적으로 수행된다.
```yaml
# 서버포트, DB 연결정보
server:
  port: 8091
```

###### controller package를 생성해준다.
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/024ba2c9-eecd-4d23-b4dc-acbfca95eeee/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220319T100202Z&X-Amz-Expires=86400&X-Amz-Signature=99554b8bafd76d4da447401e0ae3d50c88a12aea2d10d8d11422a8c1081a5385&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)
<br>
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6c8c119e-01fd-4916-8c43-44e4523790d0/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220319T100230Z&X-Amz-Expires=86400&X-Amz-Signature=f19de987d2cf50d0ac4f3d7df2908dbe3943a536c3ff6148f24e502d6b576737&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

###### controller package 內 MainController class를 생성한다.
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1f70a360-f9e3-4690-96f0-05a975049694/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220319T100302Z&X-Amz-Expires=86400&X-Amz-Signature=069dccca7ee6cbdc32ec25c6344ac70afcd1e7d454e6bcc5673bc93ff449495d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

###### 홈페이지(index.html)를 띄우기위해 MainController을 아래와 같이 작성한다.
```
package com.icia.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @GetMapping("/")
    public String index(){
        System.out.println("index 호출");
        System.out.println("MainController.index");
        return "index";
    }
}
```
##### resources 內 templates 폴더에 index.html을 생성하고 아래와 같이 작성한다.

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/34cf7486-8f4d-4a72-9389-e35136a65e74/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220319T100025Z&X-Amz-Expires=86400&X-Amz-Signature=a8fe080c2146401e51f02969544d5905dd6584fc4f137e45ca20026eb90e17a8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)
<br>
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c199ab4d-87e3-44ee-8c1d-036c6ad3e658/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220319T100054Z&X-Amz-Expires=86400&X-Amz-Signature=5fd92343ac00844942b308b361f6857ac23a33122374725f062ca97cddec07a3&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>index.html</title>
</head>
<body>
    <h2>index.html</h2>
    <h2>Hello World</h2>
</body>
</html>
```

###### index.html을 만들면 MainController에서  “index”의 빨간줄이 사라진다. index위에 ctrl키를 누르면 바로  index.html로 이동한다. 아래와 같이 프로젝트명을 확인하고 그 옆 세모버튼을 눌러 서버를 실행해준다.

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8a672a80-4761-432a-bf18-71ec759609f3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220319T095849Z&X-Amz-Expires=86400&X-Amz-Signature=2084167c4fc410bbe6766b1aef29d9a84f3d036df730785d149932f71c8a03f5&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

###### 그러면 화면 하단 console에 아래와 같은 화면이 표시되고 맨 하단에 Started "프로젝트명"이 정상적으로 나온다면 서버가 정상적으로 실행이 된 것이다.

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4b333a3d-acf3-47a9-aa4a-13c4e889ccaa/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220319T095929Z&X-Amz-Expires=86400&X-Amz-Signature=76400dd5403b7fb805a202d846ed0e65507fb8f95698b10098ef524c2872e2d6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

###### 여기까지 확인 후 브라우저를 실행해서 http://localhost:8091을 주소창에 입력해본다.(8091은 각자 세팅값에 따라 달라질 수 있음)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6bdea9a7-7185-47c2-9036-89a5ef117a4e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220319T095622Z&X-Amz-Expires=86400&X-Amz-Signature=dfd5db2e5035f76728ddf1bd0414797c78f6786880cea0f7ae02e7cce191ab55&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

###### 위와 같이 Hello World가 뜨면 정상적으로 작동한 것이다. 또한 콘솔창에서도 아래와 같이  찍혔는지도 확인해본다.
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/06f184d0-fe2d-4e23-839e-3f3e1f081365/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220319T095742Z&X-Amz-Expires=86400&X-Amz-Signature=36d9dc95f5688539a937ff99726e115be229e7b2c1c14edbceaf457719a2cc76&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)
