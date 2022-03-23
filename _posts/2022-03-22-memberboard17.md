---
layout: single
title: "17-회원제 게시판 만들기_SpringBoot와 JPA"
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

<center><h2>회원(member)파트 - SpringBoot</h2></center>

<center><h2>[회원-회원목록 페이징]</h2></center><br>

<center><h3>[첫번재-회원목록을 페이징하여 보여주기]</h3></center><br>

<center><h6>index 페이지에 admin@admin.com으로 로그인해야 볼 수 있는 회원목록(페이징처리)라는 링크를 만들어준다.</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberPagingLinkOfIndex.jpg?raw=true" width="320">
</div>
<br>

```html
    <!DOCTYPE html>
    <html lang="en" xmlns:th="http://www.thymeleaf.org">
    <head>
      <meta charset="UTF-8">
      <title>index.html</title>
    </head>
    <body>
    <div th:align="center">
      <h2>index.html</h2><br><br>
      <a href="member/save">회원가입</a><br><br>
      <a href="member/login">로그인</a><br><br>
      <a href="/board/findAll">글목록(페이징 적용으로 사용불가)</a><br><br>
      <a href="/board?page=1">글목록(페이징처리)</a><br><br>
      <a href="member/logout">로그아웃</a><br><br>
    
      세션값 이메일: <p th:text="${session['loginEmail']}"></p>
    
      <span th:if="(${session.loginEmail}!=null)">
         <div>
         <a class="nav-link" href="/board/save" style="font-size: 15px">글쓰기</a><br><br>
        <a href="member/mypage">나의정보 조회</a><br><br>
        <a href="member/update">내정보 수정(update)</a><br><br>
         </div></span><br><br>
    
    
      <span th:if="(${session.loginEmail}=='admin@aaa.com')">
         <div>
             <h3>관리자 메뉴</h3><br>
         <a class="nav-link" href="/member?page=1" style="font-size: 15px">회원 목록(페이징처리)</a><br><br>
         <a href="/member?page=1">페이징</a><br><br>         </div></span> 
    </div>
    <br><br><br><br><br>
    
    </body>
    </html>
```
<br>
<center><h3>[MemberController, MemberService, MemberServiceImpl 내용 수정]<br><br>
        기존 회원목록(페이징이 되어있지 않은)과 회원목록 페이지에<br><br> 새로 만들고자 하는 Paging을 동시에 사용하게 되면<br><br>
        BoardController 내 findAll 메서드, BoardService<br><br> 그리고 BoardServiceImpl 內 findAll 관련 항목과<br><br>
        충돌이 일어나 오류가 발생하게 된다.<br><br> 이러한 문제를 방지하기 위해 위의 해당 항목들을 먼저 주석으로 처리해야<br><br>
        정상적으로 Paging 기능이 작동한다/.</h3></center><br><br>

<center><h6>글목록(findAll) 하단에 페이지에 대한 부분을 아래와 같이 보여주기 위해 findAll.html에 그 내용을 추가한다.<br>
            브라우저 주소창에 보이는 주소값은 /board?page=1 형태로 보여진다.</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberPagingForm.jpg?raw=true" width="650">
</div>
<br>

```html
    <!DOCTYPE html>
    <html lang="en" xmlns:th="http://www.thymeleaf.org">
    <head>
      <meta charset="UTF-8">
      <title>findAll.html</title>
      <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
      <script>
        // function detail(memberId){
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
              output += "<table class=\"table table-hover\">\n" +
                "    <thead>\n" +
                "    <tr>\n" +
                "        <th scope=\"col\">번호</th>\n" +
                "        <th scope=\"col\">이름</th>\n" +
                "        <th scope=\"col\">이메일</th>\n" +
                "        <th scope=\"col\">주소</th>\n" +
                "        <th scope=\"col\">전화번호</th>\n" +
                "        <th scope=\"col\">생년월일</th>\n" +
                "        <th scope=\"col\">파일이름</th>\n" +
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
    <div th:align="center">
      <br><br><h3>회원목록</h3>
      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">회원번호</th>
          <th scope="col">이름</th>
          <!--        <th scope="col">비밀번호</th>-->
          <th scope="col">이메일</th>
          <!--        <th scope="col">주소</th>-->
          <!--        <th scope="col">전화번호</th>-->
          <!--        <th scope="col">생년월일</th>-->
          <!--        <th scope="col">파일이름</th>-->
          <th scope="col">회원 조회</th>
          <th scope="col">회원 삭제</th>
        </tr>
        </thead>
        <tbody>
        <tr th:each="member: ${memberList}">
          <td th:text="${member.memberId}"></td>
          <td><a th:href="@{|/member/${member.memberId}|}">
            <span th:text="${member.memberName}"></span></a></td>
          <!--          <td th:hidden="${member.memberPw}"></td>-->
          <td th:text="${member.memberEmail}"></td>
          <!--          <td th:text="${member.memberAddr}"></td>-->
          <!--          <td th:text="${member.memberPhone}"></td>-->
          <!--          <td th:text="${member.memberDate}"></td>-->
          <!--          <td th:text="${member.memberFilename}"></td>-->
          <td><button th:onclick="detail([[${member.memberId}]])">조회(Ajax)</button></td>
          <td><button th:onclick="deleteById([[${member.memberId}]])">삭제(Ajax)</button></td>
    
        </tr>
        </tbody>
      </table>
      <br>
      <div id="member-detail"></div>
      <br>
      <h3>----------------------------------------------------------------------</h3>
      <!-- 브라우저 주소창에 보이는 주소값: /member?page=1
           html에서 타임리프로 작성하는 주소값: /member(page==1) -->
    
      <div class="container" th:align="center">
        <ul class="pagination">
          <li class="page-item">
            <!-- 첫 페이지로 가는 링크 -->
            <a class="page-link" th:href="@{/member(page=1)}">
              <span>First</span>
            </a>
          </li>
    
          <li th:class="${memberList.first} ? 'disabled'" class="page-item">
            <!--boardList.first: isFirst() 호출 / 링크에 샾이 있으면 그 자리에 머무른다.(컨트롤러에 요청안함)
                boardList.number: getNumber()-->
            <a class="page-link" th:href="${memberList.first} ? '#' : @{/member(page=${memberList.number})}">
              <span>&lt;</span> <!-- '<'를 표현(HTML문법) -->
            </a>
          </li>
    
          <!-- startPage ~ endPage 까지 숫자를 만들어주는 역할-->
          <li th:each="page: ${#numbers.sequence(startPage, endPage)}"
              th:class="${page == memberList.number + 1} ? 'active'" class="page-item">
            <a class="page-link" th:text="${page}" th:href="@{/member(page=${page})}"></a>
          </li>
    
          <!-- 다음  페이지 요청
              현재 3페이지를 보고 있다면 다음 페이지는 4페이지임.
              getNumber() 값은 2임.
              따라서 4페이지를 보고 싶다면 getNumber()+2를 해야 컨트롤러에 4를 요청-->
          <li th:class="${memberList.last} ? 'disabled'">
            <a class="page-link" th:href="${memberList.last} ? '#' : @{/member(page=${memberList.number + 2})}">
              <span>&gt;</span>
            </a>
          </li>
    
          <li class="page-item">
            <a class="page-link" th:href="@{/member(page=${memberList.totalPages})}">
              <span>Last</span>
            </a>
          </li>
        </ul>
        <h3>-----------------------------------------------------------------</h3>
        <br>
        <div th:align="center"></div>
        <form action="/member/search" method="get">
          <select name="searchType">
            <option th:value=memberName>이름</option>
            <option th:value=memberEmail>이메일</option>
          </select>
          <input type="text" name="keyword" placeholder="검색어를 입력하세요.">
          <input type="submit" value="검색">
        </form>
      </div>
    </body>
    </html>
```
<br>

<center><h6>글목록 페이징 글에서 이미 만든 한 페이지에 보여줄 글의 갯수와 <br>화면에 보여줄 페이지의 갯수를 정의하고자 하면<br>
            common package 內 PagingConst라는 class를 참고한다.<br>
            내용은 아래와 같다.</h6></center>

```java 
    package com.ex.test01.common;

  public class PagingConst {
     public static final int PAGE_LIMIT = 10; // 한 페이지에 보여 줄 글 갯수
     public static final int BLOCK_LIMIT = 5; // 한 화면에 보여 줄 페이지 갯수

}
```
<br>
<center><h6>MemberController에 paging 관련 메서드를 추가해준다.</h6></center>

```java 
    //페이징처리(member?page=5)
    //5번글(/board/5) 여기에서 5는 고유번호
    @GetMapping
    public String paging(@PageableDefault(page = 1) Pageable pageable, Model model) {
        Page<MemberDetailDTO> memberList = ms.paging(pageable);
        model.addAttribute("memberList", memberList);
        int startPage = (((int) (Math.ceil((double) pageable.getPageNumber() / BLOCK_LIMIT))) - 1) * BLOCK_LIMIT + 1;
        int endPage = ((startPage + BLOCK_LIMIT - 1) < memberList.getTotalPages()) ? startPage + BLOCK_LIMIT - 1 : memberList.getTotalPages();
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);
        return "member/findAll";
    }
```
<br>
<center><h6>MemberController 內 빨간줄로 표시된 ms.paging을 클릭하면 MemberService에 자동으로 내용이 추가된다.</h6></center>

```java 
    // 페이징 처리
    Page<MemberDetailDTO> paging(Pageable pageable);
```
<br>

<center><h6>MemberServiceImpl에 paging 관련 내용을 추가한다.</h6></center>

```java 
    // 페이징
    @Override
    public Page<MemberDetailDTO> paging(Pageable pageable) {
        int page = pageable.getPageNumber();
//         * 요청한 페이지가 1인면 페이지값을 0으로 하고 1이 아니면 요청페이지에서 1을 뺀다.
//        * page = page -1;
        page = (page == 1) ? 0 : (page - 1);
        Page<MemberEntity> memberEntities = mr.findAll(PageRequest.of(page, PagingConst.PAGE_LIMIT, Sort.by(Sort.Direction.DESC, "memberId")));
//         * Page<BoardEntity> => Page<BoardPagingDTO>
        Page<MemberDetailDTO> memberList = memberEntities.map(
                member -> new MemberDetailDTO(member.getMemberId(),
                        member.getMemberName(),
                        member.getMemberPw(),
                        member.getMemberEmail(),
                        member.getMemberAddr(),
                        member.getMemberPhone(),
                        member.getMemberDate(),
                        member.getMemberFilename())
        );
        return memberList;
    }
```
<br>

<center><h6>여기까지 작성 후 서버를 실행하여 아래와 같이 페이징형태로 회원목록(findAll.html)이 보여지는지 확인한다.</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberPagingOk1.JPG?raw=true" width="650">
</div>
<center><h6>여기까지 확인이 되면 회원목록의 Paging 구현은 정상적으로 구현되었다. </h6></center>

<center><h2>[ 회원목록 Paging 파트 끝 ]</h2></center>