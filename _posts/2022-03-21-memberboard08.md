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
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberList_jpg.jpg?raw=true" width="300">

<br><br>

<center><h6>회원목록에서 회원이름을 클릭하면  member/3(회원번호)로 된 새창을 띄워 회원 상세정보를 보여주게끔 resources/member 폴더에 findById.html을 만들어준다.</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberFindbyIdForm.JPG?raw=true" width="400"></div><br>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:font-size="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <title>회원 상세정보</title>
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<body>
<div th:align="center">
  <h2>회원 상세정보</h2>
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
      <th>파일명</th>
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
      <td th:text="${member.memberFilename}"></td>
    </tr>
    </tbody>
  </table>
  <br><br>

  세션값 이메일: <p th:text="${session['loginEmail']}"></p>

</div>
</body>
</html>
```
<br>

<center><h6>MemberControllerl에 회원상세조회 관련 내용을 추가한다.</h6></center>

```java 
    // 회원 상세화면 보여주기(GET & findById)는 member/3(회원번호)로 된 새창을 띄워 보여줌
    @GetMapping("/{memberId}")
    public String findById(@PathVariable("memberId") Long memberId, Model model) {
        MemberDetailDTO memberDetailDTO = ms.findById(memberId);
        model.addAttribute("member", memberDetailDTO);
        return "/member/findById";
    }
```
<br>
<center><h6>MemberController에 ms.findById를 클릭하면 MemberService에 관련 내용이 추가된다.</h6></center>

```java 
  MemberDetailDTO findById(Long memberId);
```
<br>
<center><h6>MemberServiceImpl에 회원 상세조회 관련 내용을 추가한다.</h6></center>

```java 
    // 회원 상세화면 보여주기(GET & findById)
    @Override
    @Transactional
    public MemberDetailDTO findById(Long memberId) {
        Optional<MemberEntity> optionalMemberEntity = mr.findById(memberId);
        MemberDetailDTO memberDetailDTO = null;
        if (optionalMemberEntity.isPresent()) {
            MemberEntity memberEntity = optionalMemberEntity.get();
            memberDetailDTO = MemberDetailDTO.toMemberDetailDTO(memberEntity);
        }
        return memberDetailDTO;
    }
```
<br>

<center><h6>여기까지 작성한 후 MemberDetailDTO에 toMemberDetailDTO 항목을 작성해준다.</h6></center>

```java 
package com.ex.test01.dto;

import com.ex.test01.entity.MemberEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
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

    public MemberDetailDTO(Long memberId, String memberName, String memberEmail, String memberAddr, String memberPhone, Date memberDate, String memberFilename) {
    }

    public static MemberDetailDTO toMemberDetailDTO(MemberEntity memberEntity) {
        MemberDetailDTO memberDetailDTO = new MemberDetailDTO();
        memberDetailDTO.setMemberId(memberEntity.getMemberId());
        memberDetailDTO.setMemberName(memberEntity.getMemberName());
        memberDetailDTO.setMemberPw(memberEntity.getMemberPw());
        memberDetailDTO.setMemberEmail(memberEntity.getMemberEmail());
        memberDetailDTO.setMemberAddr(memberEntity.getMemberAddr());
        memberDetailDTO.setMemberPhone(memberEntity.getMemberPhone());
        memberDetailDTO.setMemberDate(memberEntity.getMemberDate());
//        memberDetailDTO.setMemberFile(memberEntity.getMemberFile());
        memberDetailDTO.setMemberFilename(memberEntity.getMemberFilename());
        return memberDetailDTO;
    }
}
```
<br>

<center><h6>서버를 실행한 후 admin으로 로그인 하고 회원목록에서 해당회원의 이름을 클릭하여 회원 상세정보가 정상적으로 조회되는지 확인한다.</h6></center>

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