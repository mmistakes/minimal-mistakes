---
layout: single
title: "05-회원제 게시판 만들기_SpringBoot와 JPA"
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

<center><h2>[수정화면에 바로 나의 정보조회를 표시]</h2></center><br>

<center><h6>내정보 수정(update) 링크를 index.html에  추가해준다.</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/mypage_upadte.jpg?raw=true" width="170">
</div>
<br>

```html
    <a href="member/update">내정보 수정(update)</a><br><br>
```
<br>

<center><h6>내정보 수정(update)를 보여주기 위한 update.html을 resources/member 폴더 內에 만들어준다.</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/updateForm.jpg?raw=true" width="300">
</div>
<br>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:font-size="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <title>update.html</title>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
</head>
<body>
<div th:align="center">
  <h2>회원정보 수정</h2><br>
  <form id="memberUp" name="updateForm">
    번호<br>
    <input type="text" th:name="memberId" id="memberId" th:value="${member.memberId}" readonly><br>
    이름<br>
    <input type="text" th:name="memberName" id="memberName" th:value="${member.memberName}"><br>
    비밀번호<br>
    <input type="password" th:name="memberPw" id="memberPw" th:value="${member.memberPw}" readonly><br>
    이메일<br>
    <input type="email" th:name="memberEmail" id="memberEmail" th:value="${member.memberEmail}" readonly><br>
    주소<br>
    <input type="text" th:name="memberAddr" id="memberAddr" th:value="${member.memberAddr}"><br>
    핸드폰번호<br>
    <input type="text" th:name="memberPhone" id="memberPhone" th:value="${member.memberPhone}"><br>
    생년월일<br>
    <input type="text" th:name="memberDate" id="memberDate" th:value="${member.memberDate}"><br><br>
    파일네임<br>
    <input type="text" th:name="memberFilename" id="memberFilename" th:value="${member.memberFilename}"><br><br>
    <button type="button" th:onclick="ajaxUp()">정보 수정</button>
  </form><br><br>
</div>

</body>
</html>
```
<br><br>
<center><h6>MemberController에 메서드를 추가해준다.</h6></center>

```java 
    // 수정화면 보여주기
    @GetMapping("/update")
    public String updateForm(Model model, HttpSession session) {
        System.out.println(session.getAttribute("loginEmail"));
        String memberEmail = (String) session.getAttribute("loginEmail");
        MemberDetailDTO member = ms.findByMemberEmail(memberEmail);
        model.addAttribute("member", member);
        System.out.println("member:" + member);
        return "member/update";
    }
```
<br>
<center><h6>MemberService에는 이미 관련 내용이 추가되어 있다.</h6></center>

```java 
  MemberDetailDTO findByMemberEmail(String memberEmail);
```
<br>
<center><h6>MemberServiceImpl에도 기 작성한 내용이 있기에 확인만 해본다.</h6></center>

```java
    // 수정화면 보여주기
    @Override
    public MemberDetailDTO findByMemberEmail(String memberEmail) {
        MemberEntity memberEntity = mr.findByMemberEmail(memberEmail);
        MemberDetailDTO memberDetailDTO = MemberDetailDTO.toMemberDetailDTO(memberEntity);
        return memberDetailDTO;
    }
```
<br>

<center><h6>MemberRepository에 이미 내용이 추가되어있어 확인만 해본다.</h6></center>

```java 
public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    MemberEntity findByMemberEmail(String memberEmail);
    }
```
<br>

<center><h6>여기까지 작성 후 서버를 실행한다.</h6></center>
<center><h6>로그인 후 index 페이지 내 내정보 수정(update) 링크를 클릭 해 아래와 같이 정보가 조회되면 정상이다. </h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/myinfo_UpdateForm.JPG?raw=true" width="320">
</div>

<center><h2>나의 정보조회 끝</h2></center>