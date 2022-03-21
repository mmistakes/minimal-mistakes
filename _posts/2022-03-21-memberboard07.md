---
layout: single
title: "07-회원제 게시판 만들기_SpringBoot와 JPA"
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

<center><h2>[회원탈퇴]</h2></center><br>

<center><h6>update.html 하단에 회원탈퇴 링크를 하나 추가한다.</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberwithdrawal.JPG?raw=true" width="340">
</div>
<br>

```html
        <a href="/member/delete">회원 탈퇴</a>
```
<br>

<center><h6>회원탈퇴 링크는 member/delete로 링크되며 resources/member 폴더에 delete.html을 만든다.</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberWithdrawalForm.JPG?raw=true" width="350">
</div>
<br>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:font-size="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <title>회원탈퇴</title>
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>

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

<center><h6>MemberController에 회원 탈퇴 화면을 보여주기 위한 메서드를 추가해준다.</h6></center>

```java 
    // 회원 탈퇴 화면 보여주기
    @GetMapping("/delete")
    public String delete(Model model, HttpSession session){
        String member = (String) session.getAttribute("loginEmail");
        MemberDetailDTO memberDetailDTO = ms.findByMemberEmail(member);
        model.addAttribute("member", memberDetailDTO);
        return "member/delete";
    }
```
<br>
<center><h6>서버를 실행해서 회원 탈퇴화면이 정상적으로 사용자에게 보여지는지 확인한다.</h6></center>
<br>

<center><h2>[회원탈퇴 처리 ]</h2></center><br>
<br>
<center><h6>delete.html에 회원탈퇴(삭제)를 위한 (script)를 (header)영역에 추가해준다.</h6></center>

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