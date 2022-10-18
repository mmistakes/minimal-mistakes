---
layout: single
title: "SpringBoot - Basic #7"
categories: springboot
Tag: [springboot-basic]
---
# 회원 관리 예제 - 웹 MVC 개발(홈 화면, 등록)

회원 웹 기능 - 홈 화면 추가
* HomeController 클래스 생성
_@GetMapping("/")_ <- / 하면 그냥 도메인 첫번째를 호출함을 의미

```java
package com.hello.hellospring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
pulic class HomeController {

    @GetMapping("/") //도메인 첫 화면
    public String home(){
        return "home";
    }
}
```

* 홈 화면 템플릿 생성
템플릿 디렉토리 안에 _HomeController.java_ 에 생성한 메소드에 맞게


```html
<!DOCTYPE HTML>
<html xmlns:th="htttp://www.thymleaf.org">
    <head>
        <title>web_mvc_예제</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    </head>
    <body>
        <div>
            <div>
                <h1>Hello Spring!</h1>
                <p>회원 기능</p>
                <p>
                    <a href="/member/new">회원 가입</a>
                    <a href="/members">회원 목록</a>
                </p>
            </div>
        </div>    
    </body>
</html>
```
    * 스프링은 요청이 오면 스프링 컨테이너를 찾고 없다면 스태틱으로 넘어감

<hr>

* 회원 웹 기능 (등록)

1. MemberController 클래스 안에

_@GetMapping_ 을 이용해 등록을 위한 메소드를 생성 

→ 어노테이션 주소는 _home.html_ 의 회원 가입 주소 입력 ` <a href="/member/new">회원 가입</a>`

→ return이 되면 templates 에서 파일명과 맞는 파일을 찾아서 보여줌 (_viewResolver_)

_MemberController.java_ 에 _PostMapping_ 생성 후 리다이렉트 설정

```java
package com.hello.hellospring.controller;

import com.hello.hellospring.domain.Member;
import com.hello.hellospring.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MemberController {

    //다른 곳에서도 쓰는 건 하나만 생성해서 공용으로 쓰는게 좋음
    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("members/new")
    public String create(){
        return "members/createMemberForm";
    }

    @PostMapping("members/new")
    public String create(MemberForm form){
        Member member = new Member();
        member.setName(form.getName());

        memberService.join(member);

        return "redirect:/";
    }

}
```
    디버깅 통해서 값 들어오는지 확인!

 2. MemberForm 클래스 생성

_createMemberForm.html_ 안에 데이터를 받는 name 변수명과 동일하게

**html 파일에서 input 태그 안에 name 은 서버로 넘어올 때 키 값**

![2번 설명 이미지](/assets/images/2022-10-18-09-21-29.png)