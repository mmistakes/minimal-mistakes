---
layout: single
title: "06-회원제 게시판 만들기_SpringBoot와 JPA"
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

<center><h2>[회원 탈퇴]</h2></center><br>

<center><h6>update.html 하단에 회원탈퇴 링크를 하나 추가한다.</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/myinfo_UpdateForm.JPG?raw=true" width="320">
</div>
<br>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:font-size="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <title>update.html</title>
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>

  <script>
    const ajaxUp = () => {

      const id = document.getElementById('memberId').value;
      const name = document.getElementById('memberName').value;
      const pw = document.getElementById('memberPw').value;
      const email = document.getElementById('memberEmail').value;
      const addr = document.getElementById('memberAddr').value;
      const phone = document.getElementById('memberPhone').value;
      const date = document.getElementById('memberDate').value;
      // const date = $('memberDate').val();
      const fileName = document.getElementById('memberFilename').value;

      console.log(memberId, memberName, memberPw, memberEmail, memberAddr, memberPhone, memberDate, memberFilename);

      const updateData=JSON.stringify({
        memberId: id,
        memberName: name,
        memberPw: pw,
        memberEmail: email,
        memberAddr: addr,
        memberPhone: phone,
        memberDate: date,
        memberFilename: fileName
      });

      const reqUrl = "/member/"+id;
      console.log(updateData);

      $.ajax({
        type: 'put',
        // enctype: 'multipart/form-data',
        data: updateData,
        url:reqUrl,
        processData: false,
        contentType: 'application/json', //json으로 보낼때 꼭 써야 함.
        cache: false,
        timeout: 600000,
        success: function(){
          console.log("???")
          location.href="/member/update";
          // location.href="/member/update" + id;
        },
        error: function (){
          alert("Ajax 실패")
        }
      });
      document.updateForm.submit();
    }
  </script>
  
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
<br>

<center><h6>Update에 사용할 MemberUpdateDTO를 dto pacakage에 만든다.</h6></center>


```java 
package com.ex.test01.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberUpdateDTO {

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

<center><h6>MemberController에 정보 수정을 위한 메서드를 추가해준다.</h6></center>

```java 
    // 수정 처리(PUT)
    @PutMapping("/{memberId}")
    public ResponseEntity update(@RequestBody MemberUpdateDTO memberUpdateDTO) throws IllegalStateException, IOException {
        System.out.println(memberUpdateDTO);
        ms.update(memberUpdateDTO);
        return new ResponseEntity(HttpStatus.OK);
    }
```
<br>
<center><h6>MemberController 內 ms.update를 클릭하면 MemberService에 내용이 추가된다.</h6></center>

```java 
Long update(MemberUpdateDTO memberUpdateDTO) throws IllegalStateException, IOException;
```
<br>

<center><h6>MemberServiceImpl에 update 관련 내용을 추가한다.</h6></center>

```java 
    // 회원 수정
    @Override
    public Long update(MemberUpdateDTO memberUpdateDTO) throws IllegalStateException, IOException {
        MemberEntity memberEntity = MemberEntity.updateMember(memberUpdateDTO);
        return mr.save(memberEntity).getMemberId();
    }
```
<br>
<center><h6>MemberEntity에 updateMember 관련 내용을 추가한다.</h6></center>

```java 
    public static MemberEntity updateMember(MemberUpdateDTO memberUpdateDTO) {
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setMemberId(memberUpdateDTO.getMemberId());
        memberEntity.setMemberName(memberUpdateDTO.getMemberName());
        memberEntity.setMemberPw(memberUpdateDTO.getMemberPw());
        memberEntity.setMemberEmail(memberUpdateDTO.getMemberEmail());
        memberEntity.setMemberAddr(memberUpdateDTO.getMemberAddr());
        memberEntity.setMemberPhone(memberUpdateDTO.getMemberPhone());
        memberEntity.setMemberDate(memberUpdateDTO.getMemberDate());
//        memberEntity.setMemberFilename(memberUpdateDTO.getMemberFilename());
        return memberEntity;
    }
```

<br>
<center><h6>여기까지 작성한 후 서버를 실행한다. 로그인을 하고 index에서 내정보 수정(update)을 클릭 후 이름, 주소, 핸드폰번호, 생년월일을 수정해본다. </h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/myinfo_UpdateForm.JPG?raw=true" width="320">
</div>
<br>
<center><h6>aaaaa인 주소를 aaaaabbbbb로 수정했다.</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/updateComplete.JPG?raw=true" width="400">
<br><br>
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/updateDb.JPG?raw=true" width="600">
</div>
<br><br>

<center><h2>나의 정보수정 끝</h2></center>