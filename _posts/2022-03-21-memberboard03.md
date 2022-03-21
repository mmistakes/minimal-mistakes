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


<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/login_index.JPG?raw=true" width="300"></div>>

```html
   <a href="member/login">로그인</a><br><br>
```
<br>

<h6>로그인을 위한 html을 resources/member 폴더 내 생성해준다, 그리고 아래와 같은 화면을 보여주기 위한 코드를 login.html에 작성해준다. 로그인 창은 form을 사용했고 post로 컨트롤러에 전달한다. </h6>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/loginForm.JPG?raw=true" width="300"><br><br>
</div>

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
<h6>로그인을 위해서는 Email과 Password가 필요하기에 dto pacakage 內 MemberLoginDTO를 만들고 해당항목을 추가해준다.</h6>

```java 
package com.ex.test01.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberLoginDTO {


    private String memberEmail;
    private String memberPw;
}
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

<center><h6>여기까지 작성하면 사용자에게 로그인 화면은 정상적으로 보여지게 된다.</h6></center><br><br>

<center><h3>로그인 처리</h3></center>
<center><h6>로그인 처리를 위해 MemberController에 코드를 추가해준다. 내용은 정상적으로 로그인 한 경우에는 index 페이지를 띄워주고 로그인 정보가 잘못된 경우에는 "로그인 정보가 잘못되었습니다."라는 알림창을 띄워주고 사용자가 확인을 누를 경우 다시 login창을 띄워주도록 구성한다. 이 알림창을 띄우기 위해서는 resources 폴더 內 message.html을 만들어준다. </h6></center>

```java 
    // 로그인 처리
    @PostMapping("/login")
    public String login(@ModelAttribute("login") MemberLoginDTO memberLoginDTO, Model model, HttpSession session) {
        boolean loginResult = ms.login(memberLoginDTO);
        if (loginResult) {
            session.setAttribute("loginEmail", memberLoginDTO.getMemberEmail());
            return "redirect:/";
        } else {
            model.addAttribute("message", "로그인 정보가 잘못되었습니다.");
            model.addAttribute("searchUrl", "/member/login");
            return "member/message";
        }
    }
```
<br>
<center><h6>message.html</h6></center>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

  <script th:inline="javascript">

    /*<![CDATA[*/
    var message = [[${message}]];
    alert(message);

    location.replace([[${searchUrl}]]);
    /*]]>*/

  </script>

</head>
<body>

</body>
</html>
```
<br>
<center><h6>로그인 정보 오류시 알림 창</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/loginAlert.JPG?raw=true" width="400"></div><br><br>

<center><h6>빨간색 처리 된 ms.login을 클릭하면 MemberService에 아래 메서드가 자동으로 추가된다.</h6></center>

```java 
    boolean login(MemberLoginDTO memberLoginDTO);
```
<br>
<center><h6>MemberServiceImpl에 메서드가 추가되고 거기에 로그인 관련 코드를 추가 삽입한다.</h6></center>

```java 
    // 로그인 처리
    @Override
    public boolean login(MemberLoginDTO memberLoginDTO) {
        MemberEntity memberEntity = mr.findByMemberEmail(memberLoginDTO.getMemberEmail());
        if (memberEntity != null) {
            if (memberEntity.getMemberPw().equals(memberLoginDTO.getMemberPw())) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
```
<br>
<center><h6>여기까지 작성 후 index 페이지에서 회원가입 후 해당 아이디로 login이 정상적으로 작동하는지 확인하기 위해 login 후 login session값을 보여주는 작업을 진행한다.</h6></center>
<br><br><br>

<center><h3>login Session값 보여주기</h3></center>
<center><h6>사용자가 정상적으로 로그인 한 경우 해당 세션값을 index 페이지 內 보여주기 위한 코드를 작성해준다.</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/loginSession.jpg?raw=true" width="180">
</div>

```html
세션값 이메일: <p th:text="${session['loginEmail']}"></p>
```




<center><h3>로그아웃</h3></center>
<center><h6>로그인 된 사용자의 로그아웃을 위해 index 페이지 內 로그아웃 링크를 하나 만들어 준다.</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/logoutIndex.jpg?raw=true" width="180">
</div>

```html
    <a href="member/logout">로그아웃</a>
```
<br><br>
<center><h6>MemberController에 logout 관련 코드를 추가해준다. 사용자가 로그아웃을 클릭하면 로그아웃이 이뤄지고 index 페이지를 띄워준다.</h6></center>

```java 
    // 로그아웃
    @GetMapping("logout")
    public String logout(HttpSession session){
        session.invalidate();
        return "redirect:/";
    }
```


<center><h2>로그인 & 로그아웃 끝</h2></center>