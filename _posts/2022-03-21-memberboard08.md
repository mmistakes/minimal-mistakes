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

<center><h6>index.html 하단에 로그인 이메일이 admin@aaa.com인 경우에만 보이는 회원목록 링크를 하나 추가한다..</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/adminMemberList.jpg?raw=true" width="200">
</div>
<br>

```html
  <span th:if="(${session.loginEmail}=='admin@aaa.com')">
     <div>
         <h3>관리자 메뉴</h3><br>
     <a class="nav-link" href="/member/" style="font-size: 15px">회원 목록</a><br><br>
     </div></span>

</div>
```
<br>

<center><h6>회원목록은 /member/로 링크되며 member 폴더에  findAll.html을 만든다. </h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/member_findAll.JPG?raw=true" width="600">
</div>
<br>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
  
  <meta charset="UTF-8">
  <title>memberList</title>
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  
</head>

<body>

<table class="table table-hover">  
  <thead>
  <tr>
    <th scope="col">회원번호</th>
    <th scope="col">이름</th>
    <!--        <th scope="col">비밀번호</th>-->
    <th scope="col">이메일</th>
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

<center><h6>MemberController에 회원목록 관련 메서드를 추가해준다.</h6></center>

```java 
    // 회원목록
    @GetMapping("/")
    public String findAll(Model model, HttpSession session) {
      List<MemberDetailDTO> memberList = ms.findAll();
      model.addAttribute("memberList", memberList);
      return "member/findAll";
        }
```
<br>
<center><h6>MemberController 內 ms.findAll을 클릭하면 MemberService에 내용이 추가된다.</h6></center>

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
<center><h6>여기까지 작성 후 admin@aaa.com으로 로그인하여 회원목록을 조회해 아래와 같이 조회되는지 확인한다. </h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberFindallOk.JPG?raw=true" width="800"></div>
<center><h6>회원목록이 정상적으로 조회되면 회원목록 기능은 구현되었다. </h6></center>

<br>
<center><h2>[관리자-회원 상세정보를 새창에서 조회]</h2></center><br>
<center><h6>회원목록에서 회원이름을 클릭하면  member/3(회원번호)로 된 새창을 띄워 회원 상세정보를 보여주게끔 resources/member 폴더에 findById.html을 만들어준다.</h6></center><br>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberFindbyIdForm.JPG?raw=true" width="400"></div><br>

<center><h6>findById.html은 아래와 같이 코딩해준다.</h6></center>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:font-size="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <title>회원 상세정보</title>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
</head>
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
<br><br><br><br><br>
<a href="member/mypage">마이페이지</a><br><br>
<a href="member/update">마이페이지(update)</a><br><br>
<a href="/member?page=1">페이징</a><br><br>
<a href="/board/save">글쓰기</a><br><br>
<a href="/board/findAll">글목록</a><br><br>
<a href="member/logout">로그아웃</a><br><br>

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

<center><h6>이제 서버를 실행하여 admin으로 로그인 후 회원목록에서 회원의 이름을 클릭했을때 회원 상세정보가 정상적으로 나오는지 확인한다.</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberFindbyIdOk.JPG?raw=true" width="450"></div><br>

<br><br><br>

<center><h3>회원리스트(memberList)에 회원 상세정보를 화면 하단에 실시간으로 보여주는 기능 구현(Ajax)</h3></center><br>

<center><h6>회원목록(memberList)에서 ajax로 회원 상세정보를 화면 하단에 보여주는 버튼과 Ajax script를 작성한다.</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberDetailForm.JPG?raw=true" width="300"></div><br>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>memberList</title>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
   <script>
        // function detail(boardId){
        const detail = (memberId) => {
            console.log(memberId);
            const reqUrl = "/member/" + memberId;
            $.ajax({
                type: 'post',
                url: reqUrl,
                dataType: 'json',
                success: function(result) {
                    console.log(result);
                    let output = "";
                    output += "<table>\n" +
                        "    <thead>\n" +
                        "    <tr>\n" +
                        "        <th>번호</th>\n" +
                        "        <th>이름</th>\n" +
                        "        <th>이메일</th>\n" +
                        "        <th>주소</th>\n" +
                        "        <th>전화번호</th>\n" +
                        "        <th>생년월일</th>\n" +
                        "        <th>파일이름</th>\n" +
                        "    </tr>\n" +
                        "    </thead>\n" +
                        "    <tbody>\n" +
                        "        <tr>\n" +
                        "            <td>"+result.memberId + "</td>\n" +
                        "            <td>"+result.memberName + "</td>\n" +
                        "            <td>"+result.memberEmail+ "</td>\n" +
                        "            <td>"+result.memberAddr+ "</td>\n" +
                        "            <td>"+result.memberPhone + " </td>\n" +
                        "            <td>"+result.memberDate + " </td>\n" +
                        "            <td>"+result.memberFilename + " </td>\n" +
                        "        </tr>\n" +
                        "    </tbody>\n" +
                        "</table>"
                    document.getElementById("member-detail").innerHTML = output;
                },
                error: function() {
                    alert('ajax 실패');
                }
            });
        }
    </script>

</head>

<body>

<table>
  <thead>
    <tr>
        <th>회원번호</th>
        <th>이름</th>
<!--        <th>비밀번호</th>-->
        <th>이메일</th>
        <th>회원 조회</th>
    </tr>
  </thead>
  <tbody>
      <tr th:each="member: ${memberList}">
          <td th:text="${member.memberId}"></td>
          <td><a th:href="@{|/member/${member.memberId}|}">
              <span th:text="${member.memberName}"></span></a></td>
          <td th:hidden="${member.memberPw}"></td>
          <td th:text="${member.memberEmail}"></td>
          <td><button th:onclick="detail([[${member.memberId}]])">조회(Ajax)</button></td>
      </tr>
  </tbody>
</table>
<br><br><br>
    <div id="member-detail"></div>

</body>
</html>
```
<br><br>
<center><h6>MemberController에 해당 메서드를 작성해준다.</h6></center>

```java 
    // 회원 상세정보(Ajax)
    @PostMapping("/{memberId}")
      public @ResponseBody MemberDetailDTO detail(@PathVariable Long memberId) {
        MemberDetailDTO member = ms.findById(memberId);
        return member;
      }
```
<br><br>
<center><h6>MemberService에는 이미 작성되어져 있는 내용을 참고만한다.</h6></center>

```java 
    MemberDetailDTO findById(Long memberId);
```

<br><br>
<center><h6>MemberServiceImpl에도 이미 작성되어져 있는 내용을 참고만한다.</h6></center>

```java 
    // 회원 상세화면 보여주기(findById)
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
<br><br>
<center><h6>이 후 서버 실행 및 admin 로그인 후 회원목록의 해당회원의 조회(Ajax) 버튼을 클릭해서 해당 페이지의 아래에 상세정보가 출력되는지 확인한다.</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberDetailAjaxok.JPG?raw=true" width="400"></div><br><br>

<center><h3>회원 삭제</h3></center>
<center><h6>회원목록(memberList.html)에 삭제 관련 script를 header영역에 추가해주고 body에도 삭제 버튼 관련 내용을 추가한다.  </h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberListDeleteForm.JPG?raw=true" width="320"></div><br><br>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>memberList</title>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
   <script>
        // function detail(boardId){
        const detail = (memberId) => {
            console.log(memberId);
            const reqUrl = "/member/" + memberId;
            $.ajax({
                type: 'post',
                url: reqUrl,
                dataType: 'json',
                success: function(result) {
                    console.log(result);
                    let output = "";
                    output += "<table>\n" +
                        "    <thead>\n" +
                        "    <tr>\n" +
                        "        <th>번호</th>\n" +
                        "        <th>이름</th>\n" +
                        "        <th>이메일</th>\n" +
                        "        <th>주소</th>\n" +
                        "        <th>전화번호</th>\n" +
                        "        <th>생년월일</th>\n" +
                        "        <th>파일이름</th>\n" +
                        "    </tr>\n" +
                        "    </thead>\n" +
                        "    <tbody>\n" +
                        "        <tr>\n" +
                        "            <td>"+result.memberId + "</td>\n" +
                        "            <td>"+result.memberName + "</td>\n" +
                        "            <td>"+result.memberEmail+ "</td>\n" +
                        "            <td>"+result.memberAddr+ "</td>\n" +
                        "            <td>"+result.memberPhone + " </td>\n" +
                        "            <td>"+result.memberDate + " </td>\n" +
                        "            <td>"+result.memberFilename + " </td>\n" +
                        "        </tr>\n" +
                        "    </tbody>\n" +
                        "</table>"
                    document.getElementById("member-detail").innerHTML = output;
                },
                error: function() {
                    alert('ajax 실패');
                }
            });
        }
    </script>

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

<table>
  <thead>
    <tr>
        <th>회원번호</th>
        <th>이름</th>
<!--        <th>비밀번호</th>-->
        <th>이메일</th>
        <th>회원 조회</th>
        <th>회원 삭제</th>
    </tr>
  </thead>
  <tbody>
      <tr th:each="member: ${memberList}">
          <td th:text="${member.memberId}"></td>
          <td><a th:href="@{|/member/${member.memberId}|}">
              <span th:text="${member.memberName}"></span></a></td>
          <td th:hidden="${member.memberPw}"></td>
          <td th:text="${member.memberEmail}"></td>
          <td><button th:onclick="detail([[${member.memberId}]])">조회(Ajax)</button></td>
          <td><button th:onclick="deleteById([[${member.memberId}]])">삭제(Ajax)</button></td>

      </tr>
  </tbody>
</table>
<br><br><br>
    <div id="member-detail"></div>

</body>
</html>
```
<br>
<center><h6>MemberController와 MemberService 그리고 MemberServiceImpl에서는<br> 기작성되어 있는 delete 메서드를 통해 작업이 진행되기에 별도의 작업이 필요없다.  </h6></center>

<center><h6>여기까지 작업 후 서버를 실행하고 admin으로 로그인하여 회원목록에서 해당 회원의 삭제버튼을 눌러 정상적으로 삭제가 이뤄지는지 확인해본다.  </h6></center>

<br>
<center><h2>관리자(Admin)파트 끝</h2></center>