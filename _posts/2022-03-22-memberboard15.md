---
layout: single
title: "15-회원제 게시판 만들기_SpringBoot와 JPA"
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

<center><h2>04-게시판(board)파트 - SpringBoot</h2></center>

<center><h2>[게시판-글목록 페이징]</h2></center><br>

<center><h3>[첫번재-글목록을 페이징하여 보여주기]</h3></center><br>

<center><h6>글목록(findAll) 하단에 페이지에 대한 부분을 아래아 같이 보여주기 위해 findAll.html에 그 내용을 추가한다.<br>
            브라우저 주소창에 보이는 주소값은 /board?page=1 형태로 보여진다.</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/paging_findAll.JPG?raw=true" width="650">
</div>
<br>

```html
    <!DOCTYPE html>
    <html lang="en" xmlns:th="http://www.thymeleaf.org">
    <head>
      <meta charset="UTF-8">
      <title>글목록</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
      <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
      <script>
        // function detail(boardId){
        const detail = (boardId) => {
          console.log(boardId);
          const reqUrl = "/board/" + boardId;
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
                "        <th>글번호</th>\n" +
                "        <th>작성자명</th>\n" +
                "        <th>제목</th>\n" +
                "        <th>조회수</th>\n" +
                "        <th>작성일자</th>\n" +
                "        <th>회원번호</th>\n" +
                "    </tr>\n" +
                "    </thead>\n" +
                "    <tbody>\n" +
                "        <tr>\n" +
                "            <td>"+result.boardId + "</td>\n" +
                "            <td>"+result.boardWriter + "</td>\n" +
                "            <td>"+result.boardTitle+ "</td>\n" +
                "            <td>"+result.boardHits+ "</td>\n" +
                "            <td>"+result.boardDate + " </td>\n" +
                "            <td>"+result.memberId + " </td>\n" +
                "        </tr>\n" +
                "    </tbody>\n" +
                "</table>"
              document.getElementById("board-detail").innerHTML = output;
            },
            error: function() {
              alert('ajax 실패');
            }
          });
        }
      </script>
    </head>
    <body>
    
    <div th:align="center">
      <h2>글 목록</h2>
      <table>
        <thead>
        <tr>
          <!--        <th>회원번호</th>-->
          <th>글번호</th>
          <th>작성자명</th>
          <!--        <th>비밀번호</th>-->
          <th>제목</th>
          <th>조회수</th>
          <th>작성일자</th>
          <th>회원번호</th>
          <th>글 상세조회</th>
        </tr>
        </thead>
        <tbody>
        <tr th:each="board: ${boardList}">
          <td th:text="${board.boardId}"></td>
          <td th:text="${board.boardWriter}"></td>
          <td><a th:href="@{|/board/${board.boardId}|}">
            <span th:text="${board.boardTitle}"></span></a></td>
          <td th:text="${board.boardHits}"></td>
          <td th:text="${board.boardDate}"></td>
          <td th:text="${board.memberId}"></td>
          <td><button th:onclick="detail([[${board.boardId}]])">글 상세조회(Ajax)</button></td>
          <!--        <td><button th:onclick="deleteById([[${board.boardId}]])">글삭제(Ajax)</button></td>-->
    
        </tr>
        </tbody><br><br>
      </table>
    
      <br><br><br>
      <div id="board-detail"></div>
    
    </div>
    
    <!-- 브라우저 주소창에 보이는 주소값: /board?page=1
         html에서 타임리프로 작성하는 주소값: /board(page==1) -->
    
    <div class="container" th:align="center">
      <ul class="pagination">
        <li class="page-item">
          <!-- 첫 페이지로 가는 링크 -->
          <a class="page-link" th:href="@{/board(page=1)}">
            <span>First</span>
          </a>
        </li>
    
        <li th:class="${boardList.first} ? 'disabled'" class="page-item">
          <!--boardList.first: isFirst() 호출 / 링크에 샾이 있으면 그 자리에 머무른다.(컨트롤러에 요청안함)
              boardList.number: getNumber()-->
          <a class="page-link" th:href="${boardList.first} ? '#' : @{/board(page=${boardList.number})}">
            <span>&lt;</span> <!-- '<'를 표현(HTML문법) -->
          </a>
        </li>
    
        <!-- startPage ~ endPage 까지 숫자를 만들어주는 역할-->
        <li th:each="page: ${#numbers.sequence(startPage, endPage)}"
            th:class="${page == boardList.number + 1} ? 'active'" class="page-item">
          <a class="page-link" th:text="${page}" th:href="@{/board(page=${page})}"></a>
        </li>
    
        <!-- 다음  페이지 요청
            현재 3페이지를 보고 있다면 다음 페이지는 4페이지임.
            getNumber() 값은 2임.
            따라서 4페이지를 보고 싶다면 getNumber()+2를 해야 컨트롤러에 4를 요청-->
        <li th:class="${boardList.last} ? 'disabled'">
          <a class="page-link" th:href="${boardList.last} ? '#' : @{/board(page=${boardList.number + 2})}">
            <span>&gt;</span>
          </a>
        </li>
    
        <li class="page-item">
          <a class="page-link" th:href="@{/board(page=${boardList.totalPages})}">
            <span>Last</span>
          </a>
        </li>
      </ul>
    </div>
    
    <div th:align="center">
      세션값 이메일: <p th:text="${session['loginEmail']}"></p>    
    </div>
    
    </body>
</html>
```
<br>

<center><h6>먼저 한 페이지에 보여줄 글의 갯수와 화면에 보여줄 페이지의 갯수 정의를 위해<br>
            common이라는 package를 생성하고 그안에 PagingConst라는 class를 생성한다.<br>
            그리고 내용을 아래와 같이 작성한다.</h6></center>

```java 
    package com.ex.test01.common;

  public class PagingConst {
     public static final int PAGE_LIMIT = 10; // 한 페이지에 보여 줄 글 갯수
     public static final int BLOCK_LIMIT = 5; // 한 화면에 보여 줄 페이지 갯수

}
```
<br>
<center><h6>BoardController에 paging 관련 메서드를 추가해준다.</h6></center>

```java 
    // 페이징처리 : 브라우저 주소창에 보이는 주소값: /board?page=1
    // html에서 타임리프로 작성하는 주소값: /board(page==1)
    @GetMapping
    public String paging(@PageableDefault(page=1) Pageable pageable, Model model){
        //Page라는 객체가 있다.
        Page<BoardDetailDTO> boardList = bs.paging(pageable);
        model.addAttribute("boardList",boardList);
        int startPage = (((int) (Math.ceil((double) pageable.getPageNumber() / BLOCK_LIMIT))) - 1) * BLOCK_LIMIT + 1;
        int endPage = ((startPage + BLOCK_LIMIT - 1) < boardList.getTotalPages()) ? startPage + BLOCK_LIMIT - 1 : boardList.getTotalPages();
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage",endPage);
        return  "board/findAll";
    }
```
<br>
<center><h6>BoardController 內 빨간줄로 표시된 bs.paging을 클릭하면 BoardService에 자동으로 내용이 추가된다.</h6></center>

```java 
    // 페이징 처리
    Page<BoardDetailDTO> paging(Pageable pageable);
```
<br>

<center><h6>BoardServiceImpl에 paging 관련 내용을 추가한다.</h6></center>

```java 
    // 페이징 처리
    @Override
    public Page<BoardDetailDTO> paging(Pageable pageable) {
        int page = pageable.getPageNumber();
//      *아래 내용은 요청한 페이지가 1이면 페이지값을 0으로 하고 1이 아니면 요청 페이지에서 1을 뺀다는 의미.
        page=(page==1)? 0:(page-1);
//         *PageRequest=> 페이지요청 / page => 몇번째? / PagingConst.PAGE_LIMIT => 몇개씩?
//         *Sort.by(Sort.Direction.DESC,"id") => 어떤식으로 볼거고 어떤걸 기준으로("id"는 Entity필드 이름으로 와야한다.)
        Page<BoardEntity> boardEntities =
                br.findAll(PageRequest.of(page, PagingConst.PAGE_LIMIT, Sort.by(Sort.Direction.DESC, "boardId")));
//         *Page<BoardEntity> => Page<BoardPagingDTO>
//         *기존 방식대로하면 안된다. -> 페이지 객체가 제공하는 메서드드를 못 쓴다! 이렇게 단순하게 옮기면
//        *map(): Entity가 담긴 Page 객체를 dto가 담긴 Page 객체로 변환해주는 역할
        Page<BoardDetailDTO> boardList = boardEntities.map(
                board -> new BoardDetailDTO(board.getBoardId(),
                        board.getMemberEntity().getMemberId(),
                        board.getBoardWriter(),
                        board.getBoardTitle(),
                        board.getBoardContents(),
                        board.getBoardFilename(),
                        board.getCreateTime(),
                        board.getBoardHits())
        );
        return boardList;
    }
```
<br>

<center><h6>여기까지 작성 후 서버를 실행하여 아래와 같이 페이징형태로 글목록(findAll.html)이 보여지는지 확인한다.</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/paging_findAll.JPG?raw=true" width="650">
</div>
<center><h6>여기까지 확인이 되면 글목록의 Paging 구현은 정상적으로 구현되었다. </h6></center>

<center><h2>[ 글목록 Paging 파트 끝 ]</h2></center>