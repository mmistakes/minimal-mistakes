---
layout: single
title: "18-회원제 게시판 만들기_SpringBoot와 JPA"
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

<center><h2>[회원목록 內 검색]</h2></center><br>

<center><h3>[첫번재-회원목록 內 검색기능 추가하기]</h3></center><br>

<center><h6>글목록(findAll) 하단에 검색기능을 추가하기 위해  findAll.html에 그 내용을 추가한다.<br></h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberSearchForm.JPG?raw=true" width="650">
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
</div>
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
</div>
<h3>-----------------------------------------------------------------</h3>
<br>
<div th:align="center">
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

<center><h6>검색버튼을 눌렀을 경우 결과 페이지를 보여줄 search.html을 아래와 같이 만들어준다.<br><br>
            브라우저 상의 주소는<br>
                             /member/search?searchType=memberName&keyword="검색할 이름(Ex.bbbb)" 형태와,<br>
                             /member/search?searchType=memberEmail&keyword="검색할 이메일(Ex bbbbb@bbb.com) 형태로 표기된다.</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberSearchResultForm.jpg?raw=true" width="750">
</div>
<br>

```html
    <!DOCTYPE html>
    <html xmlns:th="http://www.thymeleaf.org">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <head>
      <meta charset="UTF-8">
      <title>Title</title>
    </head>
    
    <br><br>
    <div th:align="center"><h2>검색_글목록</h2></div><br>
    
    <body class="container">
    <!--<input type="hidden" th:value="${keyword}">-->
    
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">번호</th>
        <th scope="col">이름</th>
        <th scope="col">이메일</th>
        <th scope="col">주소</th>
        <th scope="col">전화번호</th>
        <th scope="col">생년월일</th>
        <th scope="col">파일이름</th>
      </tr>
      </thead>
      <tbody>
      <tr th:each="member: ${memberList}">
        <td th:text="${member.memberId}" id="memberId"></td>
        <td><a th:href="@{|/member/${member.memberId}|}" th:text="${member.memberName}">이름</a></td>
        <td th:text="${member.memberEmail}"></td>
        <td th:text="${member.memberAddr}"></td>
        <td th:text="${member.memberPhone}"></td>
        <td th:text="${member.memberDate}"></td>
        <td th:text="${member.memberFilename}"></td>
        <td><button th:if="(${#strings.equals(session['loginEmail'],'admin@aaa.com')}) or (${session.loginEmail}==${member.memberName})" th:onclick="deleteById([[${member.memberId}]])">삭제</button></td>
      </tr>
      </tbody>
    </table>
    
    <!-- 브라우저 주소창에 보이는 주소값: /board?page=1
         html에서 타임리프로 작성하는 주소값: /board(page==1)
     -->
    <div class="container">
      <ul class="pagination">
        <li class="page-item">
          <!-- 첫 페이지로 가는 링크 -->
          <a class="page-link" th:href="@{/member/search(page=0,searchType='memberName',keyword=${keyword})}">
            <span>First</span>
          </a>
        </li>
    
        <li th:class="${memberList.first} ? 'disabled'" class="page-item">
          <!--boardList.first: isFirst() 호출 / 링크에 샾이 있으면 그 자리에 머무른다.(컨트롤러에 요청안함)
              boardList.number: getNumber()-->
          <a class="page-link" th:href="${memberList.first} ? '#' : @{/member/search(page=${(memberList.number)-1},searchType='memberName',keyword=${keyword})}">
            <span>&lt;</span> <!-- '<'를 표현(HTML문법) -->
          </a>
        </li>
    
        <!-- startPage ~ endPage 까지 숫자를 만들어주는 역할-->
        <li th:each="page: ${#numbers.sequence(startPage, endPage)}"
            th:class="${page == memberList.number + 1} ? 'active'" class="page-item">
          <a class="page-link" th:text="${page}" th:href="@{/member/search(page=${(page)-1},searchType='memberName',keyword=${keyword})}"></a>
        </li>
    
        <!-- 다음  페이지 요청
            현재 3페이지를 보고 있다면 다음 페이지는 4페이지임.
            getNumber() 값은 2임.
            따라서 4페이지를 보고 싶다면 getNumber()+2를 해야 컨트롤러에 4를 요청-->
        <li th:class="${memberList.last} ? 'disabled'">
          <a class="page-link" th:href="${memberList.last} ? '#' : @{/member/search(page=${(memberList.number)+1},searchType='memberName',keyword=${keyword})}">
            <span>&gt;</span>
          </a>
        </li>
    
        <li class="page-item">
          <a class="page-link" th:href="@{/member/search(page=${(memberList.totalPages)-1},searchType='memberName',keyword=${keyword})}">
            <span>Last</span>
          </a>
        </li>
      </ul>
    </div>
    
    <div th:align="center">
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
<center><h6>MemberController에 검색 관련 메서드를 추가해준다.</h6></center>

```java 
    // 검색
    @GetMapping("/search")
    public String search(@RequestParam("searchType") String searchType, @RequestParam("keyword") String keyword,
                         Model model, @PageableDefault(page=0, size = 5, sort ="memberId", direction = Sort.Direction.DESC)Pageable pageable){
        System.out.println("searchType1 = " + searchType);
        System.out.println("keyword1 = " + keyword);

        Page<MemberDetailDTO> memberList = ms.findAll(searchType,keyword,pageable);
        System.out.println("memberList = " + memberList);

        int startPage = (((int) (Math.ceil((double) (pageable.getPageNumber()+1) /BLOCK_LIMIT))) - 1) * BLOCK_LIMIT + 1;
        int endPage = ((startPage + BLOCK_LIMIT - 1) < (memberList.getTotalPages()+1)) ? startPage + BLOCK_LIMIT - 1 : memberList.getTotalPages();
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage",endPage);
        model.addAttribute("memberList",memberList);
        model.addAttribute("searchType",searchType);
        model.addAttribute("keyword",keyword);

        System.out.println("searchType2 = " + searchType);
        System.out.println("keyword2 = " + keyword);
        System.out.println("memberList2 = " + memberList);
        return "/member/search";
    }
```
<br>
<center><h6>MemberController 內 빨간줄로 표시된 ms.findAll을 클릭하면 MemberService에 자동으로 내용이 추가된다.</h6></center>

```java 
    // 검색(페이징 포함)
    Page<MemberDetailDTO> findAll(String searchType, String keyword, Pageable pageable);
```
<br>

<center><h6>MemberServiceImpl에 검색 관련 내용을 추가한다.</h6></center>

```java 
    // 검색
    @Override
    public Page<MemberDetailDTO> findAll(String searchType, String keyword, Pageable pageable) {
        Page<MemberEntity> memberEntities = null;
        /* * br.findAll(PageRequest.of(page, PagingConst.PAGE_LIMIT, Sort.by(Sort.Direction.DESC, "id")));*/

        if (searchType.equals("memberName")) {
            System.out.println("name");
            memberEntities = mr.findByMemberNameContaining(keyword, pageable);
        } else if (searchType.equals("memberEmail")) {
            System.out.println("email");
            memberEntities = mr.findByMemberEmailContaining(keyword, pageable);
        } else {
            System.out.println("addr");
            memberEntities = mr.findByMemberAddrContaining(keyword, pageable);
            System.out.println("asdfsadf=" + memberEntities);
        }

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
<center><h6>MemberRepository에 검색 관련 내용을 추가한다.</h6></center>

```java 
    // 검색
    Page<MemberEntity> findByMemberNameContaining(String keyword, Pageable pageable);

    Page<MemberEntity> findByMemberEmailContaining(String keyword, Pageable pageable);

    Page<MemberEntity> findByMemberAddrContaining(String keyword, Pageable pageable);
```
<br>

<center><h6>여기까지 작성 후 서버를 실행하여 아래와 같이 Paging이 된 회원목록 페이지에서 이름이나 Email로<br> 검색을 하였을 경우 정상적으로 Paging이 된 검색결과 페이지(search.html)가 화면에 보여지는지 확인한다. .</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberSearchResultOk.jpg?raw=true" width="750">
</div>
<center><h6>여기까지 확인이 되면 회원목록의 검색기능 구현은 정상적으로 구현되었다. </h6></center>

<center><h2>[ 회원목록 검색기능 파트 끝 ]</h2></center>