---
layout: single
title: "04-회원제 게시판 만들기_SpringBoot와 JPA"
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

<center><h2>02-회원(member)파트 - SpringBoot</h2></center>

<center><h2>[나의 정보조회]</h2></center><br>

<center><h6>나의 정보조회 링크를 index.html에  추가해준다.</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/myinfo_findById.jpg?raw=true" width="160">
</div>
<br>

```html
    <a href="member/mypage">나의정보 조회</a><br><br>
```
<br>

<center><h6>나의 정보를 보여주는 페이지를 만들기 위해 resources/member 폴더 內 mypage.html을 만들어준다.</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/mypageForm_findById.JPG?raw=true" width="450">
</div><br>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Mypage.html</title>
</head>
<body>
<div th:align="center">
    <h3>마이페이지</h3><br>
    <table>
        <thead>
        <tr>
            <th>번호</th>
            <th>이름</th>
<!--            <th>비밀번호</th>-->
            <th>이메일</th>
            <th>주소</th>
            <th>핸드폰 번호</th>
            <th>생년월일</th>
<!--            <th>파일</th>-->
<!--            <th>파일명</th>-->
        </tr>
        </thead>
        <tbody>
        <tr>
            <td th:text="${member.memberId}"></td>
            <td th:text="${member.memberName}"></td>
            <td th:hidden="${member.memberPw}"></td>
            <td th:text="${member.memberEmail}"></td>
            <td th:text="${member.memberAddr}"></td>
            <td th:text="${member.memberPhone}"></td>
            <td th:text="${member.memberDate}"></td>
<!--            <td th:file="${member.memberFile}"></td>-->
<!--            <td><img th:src="@{/resources/templates/img/}+${member.memberFilename}" alt="프로필사진"></td>-->
        </tr>
        </tbody>
    </table>
</div>
</body>
</html>
```
<br><br>
<center><h6>위의 정보를 보여주기 위해 dto package 內 MemberDetailDTO를 만들어준다.</h6></center>

```java 
public class MemberDetailDTO {

    private Long memberId;
    private String memberName;
    private String memberPw;
    private String memberEmail;
    private String memberAddr;
    private String memberPhone;
    private Date memberDate;
//    private MultipartFile memberFile;
    private String memberFilename;
    
    }
```
<br>

<center><h6>mypage를 사용자에게 보여주기 위해 MemberController 內 메서드를 추가해준다.</h6></center>

```java 
    // 마이페이지 보여주기
    @GetMapping("/mypage")
    public String mypageForm(Model model, HttpSession session) {
        String memberEmail = (String) session.getAttribute("loginEmail");
        MemberDetailDTO member = ms.findByMemberEmail(memberEmail);
        model.addAttribute("member", member);
        return "member/mypage";
    }
```
<br>
<center><h6>여기까지 작성 후 서버를 실행한다. 그리고 로그인 후 나의 정보조회 링크를 클릭 해 아래와 같이 정보가 조회되면 정상이다. </h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/mypageResult.JPG?raw=true" width="450">
</div>



<center><h2>나의 정보조회 끝</h2></center>