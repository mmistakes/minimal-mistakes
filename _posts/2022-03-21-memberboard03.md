---
layout: single
title: "03-회원제 게시판 만들기_SpringBoot와 JPA"
categories: memberboard
tag: [springbot, jpa]
toc: true
author_profile: false
toc: false
sidebar:
  nav: "docs"
search: true
---

<center>**[공지사항]** <strong> [개인적인 공부를 위한 내용입니다. 오류가 있을 수 있습니다.] </strong></center>
{: .notice--success}

<center><h2>02-기본환경 설정 - SpringBoot</h2></center>

<center><h2>[로그인과 로그아웃]</h2></center><br>

<center><h6>아래와 같은 화면을 보여주기 위해 index.html 內 로그인을 위한 링크를 추가해준다.</h6></center>

<center><img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/login_index.JPG?raw=true" style=""width="250"></center>

```html
   <a href="member/login">로그인</a><br><br>
```
<br>

<h6>로그인을 위한 html을 resources/member 폴더 내 생성해준다, 그리고 해당 코드를 작성해준다. 로그인 창은 form을 사용했고 post를 컨트롤러에 전달한다. </h6>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>login.html</title>
</head>
<body>
    <form action="/member/login" method="post">
        <input type="text" name="memberEmail"  placeholder="이메일"><br>
        <input type="text" name="memberPassword" placeholder="비밀번호"><br>
        <input type="submit" value="로그인">
    </form>
</body>
</html>
```
<br>
<center><h6>MemberController에서는 로그인 창을 사용자에게 보여주기 위해 아래와 같이 코드를 작성한다.</h6></center>

```java 
    // 로그인 화면 보여주기
    @GetMapping("/login")
    public String loginForm(Model model) {
        model.addAttribute("login", new MemberLoginDTO());
        return "member/login";
    }
```

<center><h6>여기까지 작성하면 사용자에게 로그인 화면은 정상적으로 보여지게 된다.</h6></center>

<center><h2>회원가입 끝</h2></center>