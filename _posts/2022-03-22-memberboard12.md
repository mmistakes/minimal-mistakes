---
layout: single
title: "12-회원제 게시판 만들기_SpringBoot와 JPA"
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

<center><h2>[게시판-글수정]</h2></center><br>

<center><h3>[첫번재-글수정 화면 보여주기]</h3></center><br>

<center><h6>글 상세정보 조회화면(findById.html)에 회원이 로그인해서 쓴 글 중 <br>
            자신이 쓴 글에 대해서는 수정 링크가 보이게 내용을 추가한다.<br> 
            수정 링크를 클릭하면 글 수정화면(update.html)으로 이동되도록 한다.<br>
            </h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardUpdateLink.JPG?raw=true" width="450">
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

<center><h6>resources/board 폴더에 글수정화면(update.html)을 생성하고 아래와 같이 작성한다..</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardUpdateForm.JPG?raw=true" width="350">
</div>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:font-size="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <title>update.html</title>
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
</head>
<body>

<div th:align="center">
  <h2>글 수정</h2><br>
  <form action="/board/update" id="boardUp" enctype="multipart/form-data">
    글번호<br>
    <input type="text" name="boardId" id="boardId" th:value="${board.boardId}" readonly><br>
    작성자<br>
    <input type="text" th:name="boardWriter" id="boardWriter" th:value="${board.boardWriter}" readonly><br>
    제목<br>
    <input type="text" th:name="boardTitle" id="boardTitle" th:value="${board.boardTitle}"><br>
    내용<br>
    <input type="email" th:name="boardContents" id="boardContents" th:value="${board.boardContents}"><br>
    파일명<br>
    <input type="text" th:name="boardFilename" id="boardFilename" th:value="${board.boardFilename}"><br>
    <!--    작성일자<br>-->
    <!--    <input type="text" th:name="boardDate" id="boardDate" th:value="${board.boardDate}" readonly><br>-->
    조회수<br>
    <input type="text" th:name="boardHits" id="boardHits" th:value="${board.boardHits}" readonly><br>
    회원번호<br>
    <input type="text" name="memberId" id="memberId" th:value="${board.memberId}" readonly><br><br>
    <input type="file" name="boardFile"><br><br>
    <input type="button" th:onclick="boardUpdate()" th:value="수정"><br><br><br>
  </form>
</div>
</body>
</html>
```
<br>
<center><h6>BoardController에 글수정화면을 보여주기 위한 메서드(update(GetMapping))를 작성한다.<br>
            주소형식은 "board/update/글번호"로 작성해준다.</h6></center>

```java 
    // 글 수정화면 보여주기(/board/update/5)
    @GetMapping("/update/{boardId}")
    public String updateForm(Model model, @PathVariable Long boardId) {
        BoardDetailDTO board = bs.findById(boardId);
        model.addAttribute("board", board);
        return "/board/update";
    }
```
<br>
<center><h6>이 이후부터는 지난 글에 작성했던 "새창을 띄워 글상세정보 보기"의 프로세스와 동일하다.<br>
            즉 BoardService, BoardServiceImpl, 그리고 BoardDetailDTO와 동일하기에 추가로 작성할 필요가 없다.
            <br>다만 이해를 위해 지난 글의 내용을 다시 한번 써본다.</h6></center><br>

<center><h6>BoardService</h6></center>

```java 
    // 글 상세화면
    BoardDetailDTO findById(Long boardId);
```
<br>

<center><h6>BoardServiceImpl</h6></center>

```java 
    // 글 상세화면 보여주기
    @Override
    public BoardDetailDTO findById(Long boardId) {
        BoardDetailDTO board = BoardDetailDTO.toBoardDetailDTO(br.findById(boardId).get());
        return board;
        }
```
<br>

<center><h6>BoardDetailDTO</h6></center>

```java 
package com.ex.test01.dto;

import com.ex.test01.entity.BoardEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardDetailDTO {

    private Long boardId;
    private Long memberId;
    private String boardWriter;
    private String boardTitle;
    private String boardContents;
    private String boardFilename;
    private LocalDateTime boardDate;
    private int boardHits;


    public static BoardDetailDTO toBoardDetailDTO(BoardEntity boardEntity) {
        BoardDetailDTO boardDetailDTO = new BoardDetailDTO();
        boardDetailDTO.setBoardId(boardEntity.getBoardId());
        boardDetailDTO.setBoardWriter(boardEntity.getBoardWriter());
        boardDetailDTO.setBoardTitle(boardEntity.getBoardTitle());
        boardDetailDTO.setBoardContents(boardEntity.getBoardContents());
        boardDetailDTO.setBoardFilename(boardEntity.getBoardFilename());
        if (boardEntity.getUpdateTime()==null) {
            boardDetailDTO.setBoardDate(boardEntity.getCreateTime());
        } else {
            boardDetailDTO.setBoardDate(boardEntity.getUpdateTime());
        }
        boardDetailDTO.setBoardHits(boardEntity.getBoardHits());
        boardDetailDTO.setMemberId(boardEntity.getBoardId());
        return boardDetailDTO;
    }
}
```
<br>

<center><h6>여기까지 작성 후 글 상세조회화면에서 글수정 링크를 눌러 기작성되어 있던 글의 상세화면이<br> 
            update.html에 정상적으로 보여지는지 확인한다. </h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardUpdateForm.JPG?raw=true" width="350">
</div>

<center><h6>상기와 같이 글 상세내용이 정상적으로 보여진다면<br> 글 수정페이지에 글상세내용을 보여주는 기능구현은 완료되었다.</h6></center><br>
<br><br>

<center><h3>[두번째-Ajax를 이용하여 수정된 글 처리하기]</h3></center><br>

<center><h6>글 수정화면(update.html)에서 ajax로 수정 요청을 Controller로 전달하는 스크립트를 작성한다.</h6></center>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:font-size="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <title>update.html</title>
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>

  <script>
    const boardUpdate = () => {
      const id=document.getElementById("boardId").value;

      const reqUrl="/board/"+id;

      var form = $('#boardUp')[0];
      var data = new FormData(form);
      console.log(data);

      $.ajax({
        type: 'PUT',
        enctype: 'multipart/form-data',
        url:reqUrl,
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function(){
          location.href="/board/"+id;
        },
        error: function (){
          alert("아작이 또 또 실패")
        }
      });
    }
  </script>

</head>
<body>

<div th:align="center">
  <h2>글 수정</h2><br>
  <form action="/board/update" id="boardUp" enctype="multipart/form-data">
    글번호<br>
    <input type="text" name="boardId" id="boardId" th:value="${board.boardId}" readonly><br>
    작성자<br>
    <input type="text" th:name="boardWriter" id="boardWriter" th:value="${board.boardWriter}" readonly><br>
    제목<br>
    <input type="text" th:name="boardTitle" id="boardTitle" th:value="${board.boardTitle}"><br>
    내용<br>
    <input type="email" th:name="boardContents" id="boardContents" th:value="${board.boardContents}"><br>
    파일명<br>
    <input type="text" th:name="boardFilename" id="boardFilename" th:value="${board.boardFilename}"><br>
    <!--    작성일자<br>-->
    <!--    <input type="text" th:name="boardDate" id="boardDate" th:value="${board.boardDate}" readonly><br>-->
    조회수<br>
    <input type="text" th:name="boardHits" id="boardHits" th:value="${board.boardHits}" readonly><br>
    회원번호<br>
    <input type="text" name="memberId" id="memberId" th:value="${board.memberId}" readonly><br><br>
    <input type="file" name="boardFile"><br><br>
    <input type="button" th:onclick="boardUpdate()" th:value="수정"><br><br><br>
  </form>
</div>

</body>
</html>
```
<br>

<center><h6>위의 필드값으로 구성한 BoardUpdateDTO를 dto package에 만든다.</h6></center>

```java 
    package com.ex.test01.dto;
    
    import com.ex.test01.entity.BoardEntity;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;
    
    import java.sql.Date;
    import java.time.LocalDateTime;
    
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class BoardUpdateDTO {
    
        private Long boardId;
        private Long memberId;
        private String boardWriter;
        private String boardTitle;
        private String boardContents;
        private String boardFilename;
    //    private LocalDateTime boardDate;
        private int boardHits;

}
    }
```
<br>
<center><h6>BoardController에서 글수정처리(update(PUT Mapping)) 메서드를 추가해준다.</h6></center>

```java 
    // AJax를 이용한 글수정 처리(PUT)
    @PutMapping("{boardId}")
    public ResponseEntity boardUpdate(@ModelAttribute BoardUpdateDTO boardUpdateDTO) {
        Long boardId = bs.update(boardUpdateDTO);
        return new ResponseEntity(HttpStatus.OK);
    }
```
<br>
<center><h6>BoardController에서 빨간줄이 있는 bs.update를 클릭하면 BoardService 하단의 내용이 자동으로 생성된다.</h6></center>

```java 
    // 글 수정처리
    Long update(BoardUpdateDTO boardUpdateDTO);
```
<br>
<center><h6>BoardServiceImpl에 글수정 관련 내용을 추가한다.</h6></center>

```java 
    // 글 수정처리
    @Override
    public Long update(BoardUpdateDTO boardUpdateDTO) {
        MemberEntity memberEntity = mr.findByMemberEmail(boardUpdateDTO.getBoardWriter());
        BoardEntity boardEntity = BoardEntity.updateBoard(boardUpdateDTO, memberEntity);
        return br.save(boardEntity).getBoardId();
    }
```
<br>
<center><h6>BoardEntity에 updateBoard 내용을 추가해준다.</h6></center>

```java 
    public static BoardEntity updateBoard(BoardUpdateDTO boardUpdateDTO, MemberEntity memberEntity) {
//    public static BoardEntity saveBoard(BoardSaveDTO boardSaveDTO) {
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setBoardId(boardUpdateDTO.getBoardId());
        boardEntity.setBoardWriter(boardUpdateDTO.getBoardWriter());
        boardEntity.setBoardTitle(boardUpdateDTO.getBoardTitle());
        boardEntity.setBoardContents(boardUpdateDTO.getBoardContents());
        boardEntity.setBoardFilename(boardUpdateDTO.getBoardFilename());
        boardEntity.setMemberEntity(memberEntity);
        boardEntity.setBoardHits(boardUpdateDTO.getBoardHits());
        return boardEntity;
    }
```
<br>

<center><h6>여기까지 확인 후 글수정 화면에서 원하는 항목을 수정 후 버튼을 클릭하여 글 수정이 이뤄지는지와<br>
            글상세정보(findById.html)에도 변경된 정보로 보여지는지 확인한다.</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardUpdateTry.JPG?raw=true" width="250"><br><br>
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardUpdateOk.JPG?raw=true" width="550">
</div>
<br>
<center><h6>상기와 같이 글수정내용이 정상적으로 반영이 되었다면 Ajax를 이용한 글수정 구현은 완료되었다.</h6></center><br>

<br>

<center><h2>게시판 글수정(board/update) 파트 끝</h2></center>