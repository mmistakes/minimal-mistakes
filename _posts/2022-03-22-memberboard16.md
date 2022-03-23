---
layout: single
title: "16-회원제 게시판 만들기_SpringBoot와 JPA"
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

<center><h2>[게시판-글목록 內 검색]</h2></center><br>

<center><h3>[첫번재-글목록 內 검색기능 추가하기]</h3></center><br>

<center><h6>글목록(findAll) 하단에 검색기능을 추가하기 위해  findAll.html에 그 내용을 추가한다.<br></h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/searchForm_findAll.JPG?raw=true" width="650">
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
      <form action="/board/search" method="get">
        <select name="searchType">
          <option th:value=boardTitle>제목</option>
          <option th:value=boardWriter>작성자</option>
        </select>
        <input type="text" name="keyword" placeholder="검색어를 입력하세요.">
        <input type="submit" value="검색">
      </form><br><br>
      세션값 이메일: <p th:text="${session['loginEmail']}"></p>
    
    </div>
    
    </body>
    </html> 
```
<br>

<center><h6>검색버튼을 눌렀을 경우 결과 페이지를 보여줄 search.html을 아래와 같이 만들어준다.<br><br>
            브라우저 상의 주소는<br>
                             /board/search?searchType=boardTitle&keyword="검색할 제목(Ex.비비비비)" 형태와,<br>
                             /board/search?searchType=boardWriter&keyword="검색할 작성자(Ex bbbb) 형태로 표기된다.</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/searchResultForm.JPG?raw=true" width="750">
</div>
<br>

```html
    <!DOCTYPE html>
    <html xmlns:th="http://www.thymeleaf.org">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <head>
      <meta charset="UTF-8">
      <title>search.html</title>
    </head>
    
    <br><br>
    <div th:align="center"><h2>검색_글목록</h2></div><br>
    
    <body class="container">
    <!--<input type="hidden" th:value="${keyword}">-->
    
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">글 번호</th>
        <th scope="col">글쓴이</th>
        <th scope="col">글제목</th>
        <th scope="col">조회수</th>
        <th scope="col">작성일자</th>
        <th scope="col">회원번호</th>
      </tr>
      </thead>
      <tbody>
      <tr th:each="board: ${boardList}">
        <td th:text="${board.boardWriter}"></td>
        <td th:text="${board.boardId}" id="boardId"></td>
        <td><a th:href="@{|/board/${board.boardId}|}" th:text="${board.boardTitle}">제목</a></td>
        <td th:text="${board.boardHits}"></td>
        <td th:text="${board.boardDate}"></td>
        <td th:text="${board.memberId}"></td>
        <td><button th:if="(${#strings.equals(session['loginEmail'],'admin')}) or (${session.loginEmail}==${board.boardWriter})" th:onclick="deleteById([[${board.boardId}]])">삭제</button></td>
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
          <a class="page-link" th:href="@{/board/search(page=0,searchType='boardWriter',keyword=${keyword})}">
            <span>First</span>
          </a>
        </li>
    
        <li th:class="${boardList.first} ? 'disabled'" class="page-item">
          <!--boardList.first: isFirst() 호출 / 링크에 샾이 있으면 그 자리에 머무른다.(컨트롤러에 요청안함)
              boardList.number: getNumber()-->
          <a class="page-link" th:href="${boardList.first} ? '#' : @{/board/search(page=${(boardList.number)-1},searchType='boardWriter',keyword=${keyword})}">
            <span>&lt;</span> <!-- '<'를 표현(HTML문법) -->
          </a>
        </li>
    
        <!-- startPage ~ endPage 까지 숫자를 만들어주는 역할-->
        <li th:each="page: ${#numbers.sequence(startPage, endPage)}"
            th:class="${page == boardList.number + 1} ? 'active'" class="page-item">
          <a class="page-link" th:text="${page}" th:href="@{/board/search(page=${(page)-1},searchType='boardWriter',keyword=${keyword})}"></a>
        </li>
    
        <!-- 다음  페이지 요청
            현재 3페이지를 보고 있다면 다음 페이지는 4페이지임.
            getNumber() 값은 2임.
            따라서 4페이지를 보고 싶다면 getNumber()+2를 해야 컨트롤러에 4를 요청-->
        <li th:class="${boardList.last} ? 'disabled'">
          <a class="page-link" th:href="${boardList.last} ? '#' : @{/board/search(page=${(boardList.number)+1},searchType='boardWriter',keyword=${keyword})}">
            <span>&gt;</span>
          </a>
        </li>
    
        <li class="page-item">
          <a class="page-link" th:href="@{/board/search(page=${(boardList.totalPages)-1},searchType='boardWriter',keyword=${keyword})}">
            <span>Last</span>
          </a>
        </li>
      </ul>
    </div>
    
    <div th:align="center">
      <form action="/board/search" method="get">
        <select name="searchType">
          <option th:value=boardTitle>제목</option>
          <option th:value=boardWriter>작성자</option>
        </select>
        <input type="text" name="keyword" placeholder="검색어를 입력하세요.">
        <input type="submit" value="검색">
      </form>
    </div>
    
    </body>
    </html>
```
<br>
<center><h6>BoardController에 검색 관련 메서드를 추가해준다.</h6></center>

```java 
    // 검색(페이징 포함)
    @GetMapping("/search")
    public String search(@RequestParam("searchType") String searchType, @RequestParam("keyword") String keyword,
                         Model model, @PageableDefault(page=0, size = 5, sort ="boardId", direction = Sort.Direction.DESC)Pageable pageable){
        System.out.println("searchType1 = " + searchType);
        System.out.println("keyword1 = " + keyword);

        Page<BoardDetailDTO> boardList = bs.findAll(searchType,keyword,pageable);
        System.out.println("boardList = " + boardList);

        int startPage = (((int) (Math.ceil((double) (pageable.getPageNumber()+1) /BLOCK_LIMIT))) - 1) * BLOCK_LIMIT + 1;
        int endPage = ((startPage + BLOCK_LIMIT - 1) < (boardList.getTotalPages()+1)) ? startPage + BLOCK_LIMIT - 1 : boardList.getTotalPages();
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage",endPage);
        model.addAttribute("boardList",boardList);
        model.addAttribute("searchType",searchType);
        model.addAttribute("keyword",keyword);

        System.out.println("searchType2 = " + searchType);
        System.out.println("keyword2 = " + keyword);
        System.out.println("boardList2 = " + boardList);
        return "/board/search";
    }
```
<br>
<center><h6>BoardController 內 빨간줄로 표시된 bs.findAll을 클릭하면 BoardService에 자동으로 내용이 추가된다.</h6></center>

```java 
    // 검색(페이징 포함)
    Page<BoardDetailDTO> findAll(String searchType, String keyword, Pageable pageable);
```
<br>

<center><h6>BoardServiceImpl에 검색 관련 내용을 추가한다.</h6></center>

```java 
    // 검색(페이징 포함)
    @Override
    public Page<BoardDetailDTO> findAll(String searchType, String keyword, Pageable pageable) {
        Page<BoardEntity> boardEntities = null;
        if(searchType.equals("boardTitle")){
            System.out.println("title");
            boardEntities = br.findByBoardTitleContaining(keyword,pageable);
        }else if(searchType.equals("boardWriter")){
            System.out.println("writer");
            boardEntities=br.findByBoardWriterContaining(keyword,pageable);
        }else{
            System.out.println("contents");
            boardEntities=br.findByBoardContentsContaining(keyword,pageable);
            System.out.println("asdfsadf="+boardEntities);
        }

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
<center><h6>BoardRepository에 검색 관련 내용을 추가한다.</h6></center>

```java 
    // 검색
    Page<BoardEntity> findByBoardTitleContaining(String keyword, Pageable pageable);

    Page<BoardEntity> findByBoardWriterContaining(String keyword, Pageable pageable);

    Page<BoardEntity> findByBoardContentsContaining(String keyword, Pageable pageable);
```
<br>

<center><h6>여기까지 작성 후 서버를 실행하여 아래와 같이 Paging이 된 글목록 페이지에서 제목이나 작성자명으로<br> 검색을 하였을 경우 정상적으로 Paging이 된 검색결과 페이지(search.html)가 화면에 보여지는지 확인한다. .</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/searchResultForm.JPG?raw=true" width="750">
</div>
<center><h6>여기까지 확인이 되면 글목록의 검색기능 구현은 정상적으로 구현되었다. </h6></center>

<center><h2>[ 글목록 검색기능 파트 끝 ]</h2></center>