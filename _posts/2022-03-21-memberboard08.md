---
layout: single
title: "08-회원제 게시판 만들기_SpringBoot와 JPA"
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

<center><h2>03-관리자(admin)파트 - SpringBoot</h2></center>

<center><h2>[관리자-회원목록]</h2></center><br>

<center><h6>index.html 하단에 로그인 이메일이 admin인 경우에만 보이는 회원목록 링크를 하나 추가한다..</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/adminMemberList.jpg?raw=true" width="200">
</div>
<br>

```html
  <span th:if="(${session.loginEmail}=='admin@aaa.com')">
     <div>
         <h3>관리자 메뉴</h3><br>
     <a class="nav-link" href="/admin/memberList" style="font-size: 15px">회원 목록</a><br><br>
     </div></span>

</div>
```
<br>

<center><h6>회원목록은 admin/memberList로 링크되며 resources 폴더에 admin 폴더를 만들고 그 밑에 memberList.html을 만든다. </h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberList_1.jpg?raw=true" width="300">
</div>
<br>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
  
  <meta charset="UTF-8">
  <title>memberList</title>
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
  
</head>

<body>

<table>
  
  <thead>
  <tr>
    <th>회원번호</th>
    <th>이름</th>
    <!--        <th>비밀번호</th>-->
    <th>이메일</th>
  </tr>
  </thead>
  
  <tbody>
  <tr th:each="member: ${memberList}">
    <td th:text="${member.memberId}"></td>
    <td><a th:href="@{|/member/${member.memberId}|}">
      <span th:text="${member.memberName}"></span></a></td>
    <td th:hidden="${member.memberPw}"></td>
    <td th:text="${member.memberEmail}"></td>
  </tr>
  </tbody>
  
</table>
<div id="member-detail"></div>

</body>
</html>
```
<br>

<center><h6>controller package 內 AdminController를 생성하고 메서드를 추가해준다.</h6></center>

```java 
package com.ex.test01.controller;

import com.ex.test01.dto.MemberDetailDTO;
import com.ex.test01.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;
import java.util.List;

import static com.ex.test01.common.PagingConst.BLOCK_LIMIT;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final MemberService ms;

    @GetMapping("/memberList")
    public String memberList(Model model, HttpSession session) {
            List<MemberDetailDTO> memberList = ms.findAll();
            model.addAttribute("memberList", memberList);
            return "admin/memberList";
        }
```
<br>
<center><h6>AdminController 內 ms.findAll을 클릭하면 MemberService에 내용이 추가된다.</h6></center>

```java 
    List<MemberDetailDTO> findAll();
```
<br>

<center><h6>MemberServiceImpl에 관련 내용을 추가한다.</h6></center>

```java 
    // 회원 목록
    @Override
    public List<MemberDetailDTO> findAll() {
        List<MemberEntity> memberEntityList = mr.findAll();
        List<MemberDetailDTO> memberList = new ArrayList<>();
        for (MemberEntity e : memberEntityList) {
            memberList.add(MemberDetailDTO.toMemberDetailDTO(e));
        }
        return memberList;
    }
```
<br>
<center><h6>여기까지 작성 후 admin@aaa.com으로 로그인하여 회원목록을 조회해 아래와 같이 조회되는지 확인한다. </h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberList.jpg?raw=true" width="300">

<br><br>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:font-size="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <title>회원탈퇴</title>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        const deleteById = (memberId) => {

            console.log(memberId);
            const reqUrl = "/member/"+memberId;
            $.ajax({
                type: 'delete',
                url:reqUrl,
                success: function (){
                    location.href="/";
                },
                error: function (){

                }
            });
        }
    </script>
</head>
<body>
    <div th:align="center">
        <h2>회원 탈퇴</h2>
        <br><br><br>
        회원을 탈퇴하시겠습니까?<br><br><br><br>
        <div>
            <input type="hidden" id="memberId" name="memberId" th:value="${member.memberId}">
            <button th:type="button" th:onclick="deleteById([[${member.memberId}]])">확인</button>
            <button th:type="button" onclick="location.href='/member/update'">취소</button>
        </div>
    </div><br><br>
    세션값 이메일: <p th:text="${session['loginEmail']}"></p>

</body>
</html>
```
<br>

<center><h6>MemberControllerl에 delete 관련 내용을 추가한다.</h6></center>

```java 
    // 회원 탈퇴 처리하기
    @DeleteMapping("/{memberId}")
    public ResponseEntity deleteById(HttpSession session, @PathVariable("memberId") Long memberId) {
        ms.deleteById(memberId);
        session.invalidate();
        return new ResponseEntity(HttpStatus.OK);
    }

```
<br>
<center><h6>MemberController에 ms.deleteById를 클릭하면 MemberService에 관련 내용이 추가된다.</h6></center>

```java 
    void deleteById(Long memberId);
```
<br>
<center><h6>MemberServiceImpl에 회원 삭제 관련 내용을 추가한다.</h6></center>

```java 
    // 회원 삭제
    @Override
    public void deleteById(Long memberId) {
        mr.deleteById(memberId);
    }
```
<br>

<center><h6>여기까지 작성한 후 회원명 zzzzz를 회원탈퇴를 하면 회원은 logout이 되고 index페이지를 띄우게된다.<br>
DB에서 zzzzz의 데이터가 삭제되었다면 회원탈퇴가 정상적으로 처리된 것이다.  </h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberDeleteEx01.JPG?raw=true" width="200">

<br><br>
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberDeleteEx02.JPG?raw=true" width="300">

<br><br>

<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberDeleteEx03.JPG?raw=true" width="600">

<br><br>

<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberDeleteEx05.JPG?raw=true" width="280">

<br><br>

<center><h6>DB에서 zzzzz의 데이터가 삭제되었음을 확인할 수 있다.</h6></center>

<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberDeleteEx06.JPG?raw=true" width="600">

<br><br>

<center><h2>회원탈퇴 끝</h2></center>