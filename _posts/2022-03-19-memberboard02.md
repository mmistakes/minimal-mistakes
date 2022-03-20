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
###### 정상적으로 db 사용이 가능함을 확인한다.
![](https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/mysqlTest01UseDb.JPG?raw=true)
<br><br>

###### application.yml 파일을 열어 DB 접속 추가정보를 작성해준다.
```yaml
# 서버포트, DB 연결정보
server:
  port: 8096
  #포트번호는 각자 세팅이 다르기 때문에 꼭 확인해보세요.

#DB 접속 정보
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/test01?serverTimezone=Asia/Seoul&characterEncoding=UTF-8
    username: 디비아이디
    password: 디비비밀번호
  thymeleaf:
    cache: false
    
  #JPA 관련 설정(Spring에 속해있는 설정으로 맨 앞칸에서 쓰면 안되고 위의 datasource와 같은 수준의 칸에서 써야 함.
  jpa:
    database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
    show-sql: true
    hibernate:
      ddl-auto: create
#     위의 ddl-auto: create은 시작할때 마다 다시 시작하는 의미
#     DB에 데이터를 한번 만든 경우 create을 update로 변경하여 사용
#		  데이터를 계속 추가하고자 하는 경우 update라는 명령어로 코딩
#      ddl: data definition language
#      Entity를 수정하는 경우에는  create으로 db를 다시 시작하는게 좋음
```
<br><br>
###### 패키지를 아래와 같이 모두 생성해준다.(dto, service, entity, repository)
![](https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/002_001_projectStructure.JPG?raw=true)


<br><br><br>
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
<img src = "https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberSave.JPG?raw=true">

###### 회원가입 폼을 아래와 같이 구성해본다.(비밀번호 재입력 확인란과 Email 중북여부 기능을 포함한다.)
<img src= "https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberSaveForm.JPG?raw=true" width="550px" height="700px">

###### 위의 폼에 맞게 template 밑 member 폴더 밑에 save.html을 만들어준다.
###### save.html
```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:font-size="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <title>save.html</title>

  <script src="https://code.jquery.com/jquery-latest.min.js"></script>

  <style>
    .field-error {
      color:red;
    }
  </style>

  <script>
    /* 아이디 입력을 하는 동안에 idDuplicate() 함수를 호출하고 입력된 값을 콘솔에 출력 */
    function emailDp() {
      const id = document.getElementById('memberEmail').value;
      console.log(id);
      const checkResult = document.getElementById('emailCheck');
      $.ajax({
        type: 'post', // 전송방식(get, post, put 등)
        url: '/member/emailDp', // 요청주소(controller로 요청하는 주소)
        data: {'memberEmail': id},  // 전송할 데이터
        dataType: 'text', // 요청 후 리턴받을 때의 데이터 형식
        success: function (result) { // 요청이 성공적으로 처리됐을때 실행 할 함수
          console.log('ajax 성공');
          console.log(result); // MemberController에서 넘어온 result값 찍어보기(ok or no)
          if (result == "ok") {
            checkResult.style.color = 'green';
            checkResult.innerHTML = '멋진 아이디네요!!';
          } else {
            checkResult.style.color = 'red';
            checkResult.innerHTML = '이미 사용중인 아이디입니다.';
          }
        },
        error: function () { // 요청이 실패했을때 실행 할 함수
          console.log('오타 찾으세요.');
        }
      });
    }
  </script>

  <script type="text/javascript">
    $(function(){
      $("#alert-success").hide();
      $("#alert-danger").hide();
      $("input").keyup(function(){
        var pwd1=$("#pwd1").val();
        var pwd2=$("#pwd2").val();
        if(pwd1 != "" || pwd2 != ""){
          if(pwd1 == pwd2){
            $("#alert-success").show();
            $("#alert-danger").hide();
            $("#submit").removeAttr("disabled");
          }else{
            $("#alert-success").hide();
            $("#alert-danger").show();
            $("#submit").attr("disabled", "disabled");
          }
        }
      });
    });
  </script>

</head>
<body>
<div th:align="center">
  <span style=" font-size:1.5em; color: black;" th:align="center" >회원 가입</span><br><br>
  <form action="/member/save" method="post" enctype="multipart/form-data" th:object="${member}">
    <div th:if="${#fields.hasGlobalErrors()}">
      <p class="field-error" th:each="err: ${#fields.globalErrors()}" th:text="${err}">글로벌오류</p>
    </div>
    이름<br>
    <input type="text" th:field="*{memberName}"   placeholder="이름: 2~50자로 입력해주세요">
    <p th:if="${#fields.hasErrors('memberName')}" th:errors="*{memberName}" th:errorclass="field-error"></p><br><br>

    비밀번호<br>
    <input type="password" th:field="*{memberPw}" id="pwd1" placeholder="비밀번호: 5~20자로 입력해주세요." required>
    <p th:if="${#fields.hasErrors('memberPw')}" th:errors="*{memberPw}" th:errorclass="field-error"></p><br>
    비밀번호 확인<br>
    <input type="password" id="pwd2" placeholder="비밀번호 확인: 비밀번호를 다시 입력해주세요." required><br><br>
    <div class="alert alert-success" style="color: green" id="alert-success">비밀번호가 일치합니다.</div><br>
    <div class="alert alert-danger" style="color: red" id="alert-danger">비밀번호가 일치하지 않습니다.</div>

    이메일<br>
    <input type="email" th:field="*{memberEmail}"  onblur="emailDp()" placeholder="이메일: 5~50자로 입력해주세요"><br>
    <span id="emailCheck"></span>
    <p th:if="${#fields.hasErrors('memberEmail')}" th:errors="*{memberEmail}" th:errorclass="field-error"></p><br><br>

    주소<br>
    <input type="text" th:field="*{memberAddr}"  placeholder="주소">
    <p th:if="${#fields.hasErrors('memberAddr')}" th:errors="*{memberAddr}" th:errorclass="field-error"></p><br><br>

    핸드폰 번호<br>
    <input type="text" th:field="*{memberPhone}"  placeholder="핸드폰번호: 10~11자로 숫자만 입력해주세요">
    <p th:if="${#fields.hasErrors('memberPhone')}" th:errors="*{memberPhone}" th:errorclass="field-error"></p><br><br>

    생년월일<br>
    <input type="date" th:field="*{memberDate}"  placeholder="생년월일"><br><br>
    <span style=" font-size:0.8em; color: black;" th:align="center" >프로필 사진</span><br>
    <input type="file" th:field="*{memberFile}" placeholder="프로필 사진"><br><br>
    <input type="submit"  value="회원가입">

  </form>
</div>

</body>
</html>

```
<br><br>


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
###### @RequestMapping는 /member의 주소로 오는 모든 요청(get, post, put, update, delete등)을 받아줄 수 있는 어노테이션으로 이 이후 컨트롤러에서 작성되어지는 브라우저 주소 부분(만일 작성해야 할 주소가  "/member/save"라면)은  member를 생략한 하단의 주소("/save")만 기입하면 된다. 
###### Templates  폴더 내  member 폴더를 만든 후 save.html을 만든다.

###### dto 패키지 內 MemberSaveDTO를 class형식으로 만들어준다.
![](https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/MemberSaveDTO.JPG?raw=true)

###### MemberSaveDTO에 코드를 작성해준다.
```java
package com.ex.test01.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.sql.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberSaveDTO {

    @NotBlank(message = "이름은 필수입니다.")
    @Length(min = 2, max = 50, message = "2~50자로 입력해주세요")
    private String memberName;

    @NotBlank
    @Length(min = 5, max = 20, message = "5~20자로 입력해주세요")
    private String memberPw;

    @NotBlank(message = "Email은 필수입니다.")
    @Length(min = 5, max = 50, message = "5~50자로 입력해주세요")
    private String memberEmail;

//    @NotBlank(message = "주소는 필수입니다.")
//    @Length(min = 10, max = 50, message = "10~50자로 입력해주세요")
    private String memberAddr;

    @NotBlank(message = "핸드폰 번호는 필수입니다.")
    @Length(min = 10, max = 11, message = "10~11자로 숫자만 입력해주세요")
    private String memberPhone;


    private Date memberDate;


    private MultipartFile memberFile;


    private String memberFilename;

}

```

###### 여기까지 작성이 되면 회원가입 화면(saveForm)이 정상적으로 뜨게 된다.
<br><br>
###### 이제는 화면가입에 기입된 정보가 정상적으로 DB에까지 저장되는 프로세스를 구축해본다.
###### MemberController에 관련 코드를 추가해준다.
```java
    // 회원가입 저장
    @PostMapping("/save")
    public String save(@Validated @ModelAttribute("member") MemberSaveDTO memberSaveDTO, BindingResult bindingResult) {
        System.out.println("MemberController.save =" + memberSaveDTO);
        if (bindingResult.hasErrors()) {
            return "member/save";
        }
        try {
            Long memberId = ms.save(memberSaveDTO);
        } catch (IllegalStateException | IOException e) {
            bindingResult.reject("emailCheck", e.getMessage());
            return "member/save";
        }
        return "redirect:/";
    }
```

###### service package 內 MemberService를 interface 형식으로 만들어준다.
![](https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/MemberServiceInterface.JPG?raw=true)
###### service package 內 MemberServiceImpl을 class 형식으로 만들어준다.
![](https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/MemberServiceImpl.JPG?raw=true)

###### MemberService에 코드를 추가해준다.
```java
package com.ex.test01.service;

import com.ex.test01.dto.*;
import java.io.IOException;


public interface MemberService {
    Long save(MemberSaveDTO memberSaveDTO) throws IOException; 
}
```
###### MemberServiceImpl에 코드를 추가해준다.
```java 
package com.ex.test01.service;
import com.ex.test01.dto.*;
import com.ex.test01.entity.MemberEntity;
import com.ex.test01.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository mr;

    // 회원 가입 저장
    @Override
    public Long save(MemberSaveDTO memberSaveDTO) throws IOException {
        MultipartFile memberFile = memberSaveDTO.getMemberFile();
        String memberFilename = memberFile.getOriginalFilename();
        memberFilename = System.currentTimeMillis() + "-" + memberFilename;
        String savePath = "F:\\Development_F\\source\\springboot\\test01\\src\\main\\resources\\templates\\img\\" + memberFilename;
        if (!memberFile.isEmpty()) {
            memberFile.transferTo(new File(savePath));
        }
        memberSaveDTO.setMemberFilename(memberFilename);
        MemberEntity memberEntity = MemberEntity.saveMember(memberSaveDTO);
        System.out.println("MemberServiceImpl.save");
        return mr.save(memberEntity).getMemberId();
    }
}
```
###### 상기 코드 중 이 부분(String savePath = "F:\\~~~~~")은 각자의 PC에 저장되는 폴더의 full 주소에  역슬래쉬(\\) 두개를 추가한 후 + memberFilename을 붙이는 형식으로 작성하면 된다. 

###### entity package 內 MemberEntity를 class 형식으로 생성한다.
![](https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/MemberEntity.JPG?raw=true)
<br>
###### MemberEntity를 작성해준다.
```java 
package com.ex.test01.entity;

import com.ex.test01.dto.MemberSaveDTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;


@Entity
@Getter
@Setter
@Table(name = "member_table")
public class MemberEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="member_id")
    private Long memberId;

    @Column
    private String memberName;

    @Column
    private String memberPw;

    @Column
    private String memberEmail;

    @Column
    private String memberAddr;

    @Column
    private String memberPhone;

    @Column
    private Date memberDate;

    @Column
    private String memberFilename;

    public static MemberEntity saveMember(MemberSaveDTO memberSaveDTO) {
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setMemberName(memberSaveDTO.getMemberName());
        memberEntity.setMemberPw(memberSaveDTO.getMemberPw());
        memberEntity.setMemberEmail(memberSaveDTO.getMemberEmail());
        memberEntity.setMemberAddr(memberSaveDTO.getMemberAddr());
        memberEntity.setMemberPhone(memberSaveDTO.getMemberPhone());
        memberEntity.setMemberDate(memberSaveDTO.getMemberDate());
        memberEntity.setMemberFilename(memberSaveDTO.getMemberFilename());
        return memberEntity;
    }

}

```

###### repository package 內 MemberRepository를 interface형식으로 생성한다.
![](https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/MemberRepository.JPG?raw=true)

###### MemberRepository에 코드를 작성한다.
``` java 
package com.ex.test01.repository;

import com.ex.test01.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

}
```

###### 여기까지 작성 완료 후 서버를 가동한 후 회원가입을 실제 진행해본다. mysql db에서 select * from member_table;로 가입한 회원정보가 정상적으로 들어왔다면 회원가입은 정상적으로 이뤄진 것이다.
![](https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/MemberSaveDB.JPG?raw=true)

### 회원가입 끝