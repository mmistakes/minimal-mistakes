---
layout: single
title: "13-회원제 게시판 만들기_SpringBoot와 JPA"
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

<center><h2>[게시판-글삭제]</h2></center><br>

<center><h3>[첫번재-글삭제 화면 보여주기]</h3></center><br>

<center><h6>글 상세정보 조회화면(findById.html)에 회원이 로그인해서 쓴 글 중 <br>
            자신이 쓴 글에 대해서는 삭제 링크가 보이게 내용을 추가한다.<br> 
            삭제 링크를 클릭하면 글 삭제화면(delete.html)으로 이동되도록 한다.<br>
            </h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardDeleteLink.JPG?raw=true" width="450">
</div>
<br>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
</head>
<body>
<div th:align="center">
  <h2>상세글</h2>

  <table>
    <thead>
    <tr>
      <td>번호</td>
      <td>제목</td>
      <td>작성자</td>
      <td>내용</td>
      <!--        <td>프로필 사진</td>-->
      <td>조회수</td>
      <td>작성일자</td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td th:text="${board.boardId}"></td>
      <td th:text="${board.boardTitle}"></td>
      <td th:text="${board.boardWriter}"></td>
      <td th:text="${board.boardContents}"></td>
      <!--        <td><img th:src="@{/boardImg/}+${board.boardFilename}" alt="프로필사진"></td>-->
      <td th:text="${board.boardHits}"> </td>
      <td th:text="${board.boardDate}"></td>
      <td><a th:if="${session.loginEmail}==${board.boardWriter}" th:href="@{|/board/update/${board.boardId}|}">수정</a></td>
      <td><a th:if="${session.loginEmail}==${board.boardWriter}" th:href="@{|/board/delete/${board.boardId}|}">삭제</a></td>      
    </tr>
    </tbody>
  </table>
  <br><br><br>
  <div id="comment-write">
  </div>
</div>
</body>
</html>
```
<br>

<center><h6>resources/board 폴더에 글삭제화면(delete.html)을 생성하고 아래와 같이 작성한다.</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardDeleteForm.JPG?raw=true" width="350">
</div>

```html
    <!DOCTYPE html>
    <html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:font-size="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="UTF-8">
      <title>글 삭제</title>
      <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    </head>
    <body>
    <div th:align="center">
      <h2>글 삭제</h2>
      <br><br><br>
      글을 삭제하시겠습니까?<br><br><br><br>
      <div>
        <input type="hidden" id="boardId" name="boardId" th:value="${board.boardId}">
        <button th:type="button" th:onclick="deleteById([[${board.boardId}]])">확인</button>
        <button th:type="button" onclick="location.href='/board/findAll'">취소</button>
      </div>
    </div><br><br>
    
    </body>
    </html>
```
<br>
<center><h6>BoardController에 글수정화면을 보여주기 위한 메서드(update(GetMapping))를 작성한다.<br>
            주소형식은 "board/delete/글번호"로 작성해준다.<br>
            글삭제를 취소할 경우 글목록(findAll)화면을 보여준다.</h6></center>

```java 
    // 글 삭제 화면 보여주기(/board/delete/5)
    @GetMapping("/delete/{boardId}")
    public String delete(Model model, @PathVariable Long boardId){
        BoardDetailDTO board = bs.findById(boardId);
        model.addAttribute("board", board);
        return "/board/delete";
    }
```
<br>
<center><h6>이 이후부터는 BoardService, BoardServiceImpl의 findById의 프로세스와 동일하기에 이전 글을 참조하면 된다.</h6></center><br>


<center><h6>여기까지 작성 후 글 상세조회화면에서 글삭제 링크를 눌러 글 삭제화면이<br> 
            delete.html에 정상적으로 보여지는지 확인한다. </h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardDeleteForm.JPG?raw=true" width="350">
</div><br>

<center><h6>상기와 같이 글 삭제화면이 정상적으로 보여진다면<br> 글삭제 페이지를 보여주는 기능구현은 완료되었다.</h6></center><br>
<br><br>

<center><h3>[두번째-Ajax를 이용하여 글 삭제 처리하기]</h3></center><br>

<center><h6>글 삭제화면(delete.html)에서 ajax로 삭제 요청을 Controller로 전달하는 스크립트를 작성한다.</h6></center>

```html
    <!DOCTYPE html>
    <html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:font-size="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="UTF-8">
      <title>글 삭제</title>
      <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
      <script>
        const deleteById = (boardId) => {
    
          console.log(boardId);
          const reqUrl = "/board/"+boardId;
          $.ajax({
            type: 'delete',
            url:reqUrl,
            success: function (){
              location.href="/board/findAll";
            },
            error: function (){
    
            }
          });
        }
      </script>
    </head>
    <body>
    <div th:align="center">
      <h2>글 삭제</h2>
      <br><br><br>
      글을 삭제하시겠습니까?<br><br><br><br>
      <div>
        <input type="hidden" id="boardId" name="boardId" th:value="${board.boardId}">
        <button th:type="button" th:onclick="deleteById([[${board.boardId}]])">확인</button>
        <button th:type="button" onclick="location.href='/board/findAll'">취소</button>
      </div>
    </div><br><br>
    
    </body>
    </html>
```
<br>

<br>
<center><h6>BoardController에서 글삭제처리(delete(Delete Mapping)) 메서드를 추가해준다.</h6></center>

```java 
    // Ajax를 이용한 글 삭제 처리
    @DeleteMapping("/{boardId}")
    public ResponseEntity deleteById(HttpSession session, @PathVariable("boardId") Long boardId) {
        bs.deleteById(boardId);
        return new ResponseEntity(HttpStatus.OK);
    }
```
<br>
<center><h6>BoardController에서 빨간줄이 있는 bs.deleteById를 클릭하면 BoardService 하단의 내용이 자동으로 생성된다.</h6></center>

```java 
    // 글 삭제처리
    void deleteById(Long boardId);
```
<br>
<center><h6>BoardServiceImpl에 글삭제 관련 내용을 추가한다.</h6></center>

```java 
    // 글 삭제처리
    @Override
    public void deleteById(Long boardId) {
        br.deleteById(boardId);
    }
```
<br>

<center><h6>여기까지 확인 후 글삭제 화면에서 확인 버튼을 클릭하여 글 삭제가 이뤄지는지와<br>
            글삭제 후 글목록 화면이 보여지는지와 글목록에 해당글이 안보이는지 확인한다.<br>
            또한 DB에서도 해당 글이 삭제되었는지 확인이 가능하다.</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardUpdateTry.JPG?raw=true" width="250"><br><br>
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardUpdateOk.JPG?raw=true" width="550">
</div>
<br>
<center><h6>상기와 같이 글수정내용이 정상적으로 반영이 되었다면 Ajax를 이용한 글수정 구현은 완료되었다.</h6></center><br>

<br>

<center><h2>게시판 글수정(board/update) 파트 끝</h2></center>