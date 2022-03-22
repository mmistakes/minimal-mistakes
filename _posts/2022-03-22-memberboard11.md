---
layout: single
title: "11-회원제 게시판 만들기_SpringBoot와 JPA"
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

<center><h2>[게시판-글 상세조회]</h2></center><br>

<center><h3>[첫번재-새창을 띄워 글상세조회 화면 보여주기]</h3></center><br>

<center><h6>findAll.html에 글상세조회 링크(/board/findById)를 추가한다.<br> 
            단 글상세조회는 글제목을 클릭 시 글상세조회 페이지로 이동하게 하고<br>
            로그인 여부와 관계없이 보이도록 한다.<br>
            </h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardFindAllLinkTitle.JPG?raw=true" width="420">
</div>
<br>

```html
    <!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>

  <meta charset="UTF-8">
  <title>글목록</title>
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>

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
    </tr>
    </tbody><br><br>

  </table>
</div>

</body>
</html>
```
<br>

<center><h6>resources/board 폴더에 findById.html로 글상세화면을 아래와 같이 보이는 형식으로 만든다.</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardFindById.JPG?raw=true" width="400">
</div>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>  
  <meta charset="UTF-8">
  <title>Title</title>
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
</head>
<body>
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
  </tr>
  </tbody>
</table>
<br>
</body>
</html>
```
<br>
<center><h6>BoardController에 글상세화면을 보여주기 위한 메서드(findAll)를 작성한다.<br>
            주소형식은 "board/글번호"으로 작성해준다.</h6></center>

```java 
    // 글 상세화면
    @GetMapping("/{boardId}")
    public String findById(@PathVariable("boardId") Long boardId, Model model, HttpSession session) {
        BoardDetailDTO boardDetailDTO = bs.findById(boardId);
        bs.hits(boardId);
        model.addAttribute("board", boardDetailDTO);
        return "/board/findById";
    }
```

<br>

<center><h6>BoardController 內 bs.findById(boardId)을 클릭하면 BoardService에 내용이 자동으로 추가된다.</h6></center>

```java 
    // 글 상세화면
    BoardDetailDTO findById(Long boardId);
```
<br>

<center><h6>BoardServiceImpl에 관련 내용을 추가한다.</h6></center>

```java 
    // 글 상세화면 보여주기
    @Override
    public BoardDetailDTO findById(Long boardId) {
        BoardDetailDTO board = BoardDetailDTO.toBoardDetailDTO(br.findById(boardId).get());
        return board;
        }
```
<br>

<center><h6>BoardDetailDTO에 toBoardDetailDTO에 대한 내용을 추가해준다.</h6></center>

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

<center><h6>여기까지 작성 후 글목록 화면에서 글제목을 눌러 기작성되어 있던 글의 상세화면이 정상적으로 보여지는지 확인한다. </h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardFindById.JPG?raw=true" width="400"></div>

<center><h6>상기와 같이 글 상세내용이 정상적으로 보여진다면<br> 새로운 페이지를 띄워 글상세화면을 보여주는 기능구현은 완료되었다.</h6></center><br>
<br><br>

<center><h3>[두번째-Ajax를 이용하여 글목록 하단에 글상세조회 화면 보여주기]</h3></center><br>

<center><h6>findAll.html에 글상세조회 버튼을(/board/findById)를 추가한다.<br> 
            단 글상세조회는 글상세조회 버튼을 클릭 시 글목록 하단에 글의 상세정보가 나타나며<br>
            로그인 여부와 관계없이 보이도록 한다.<br> 주소형식은 "board/글번호"로 상단의 구현방식과 동일하다.<br>아래의 이미지를 참고하자.
            </h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/findAll_ajaxForFindById.JPG?raw=true" width="450">
</div>
<br>

```html
    <!DOCTYPE html>
    <html lang="en" xmlns:th="http://www.thymeleaf.org">
    <head>
        <meta charset="UTF-8">
        <title>글목록</title>
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
    </tr>
    </tbody><br><br>
</table>
    <br><br><br>
    <div id="board-detail"></div>
</div>
</body>
</html>

```
<br>
<center><h6>BoardController에 Ajax로 글상세내용을 보여주는 메서드를 추가한다.</h6></center>

```java 
    // Ajax를 이용하여 글 상세화면을 글목록 하단에 보여주기

    @PostMapping("/{boardId}")
    public @ResponseBody BoardDetailDTO detail(@PathVariable Long boardId) {
        BoardDetailDTO board = bs.findById(boardId);
        return board;
    }
```
<br>
<center><h6>이 이후부터는 상단에 썼던 "새창을 띄워 글상세정보 보기"의 BoardService, BoardServiceImpl <br>
그리고 BoardEntity와 동일하기에 추가로 작성할 필요가 없다.<br>다만 이해를 위해 상단의 내용을 다시 한번 써본다..</h6></center>

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
<center><h6>BoardEntity</h6></center>

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

<center><h6>여기까지 확인 후 글목록에서 글상세정보(Ajax) 버튼을 클릭하여 하단에 정상적으로 내용이 나오는지 확인한다.</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/findByIdAjaxOk.JPG?raw=true" width="450">
</div>
<br>
<center><h6>상기와 같이 글상세내용이 정상적으로 보여진다면 Ajax를 이용한 글상세내용 조회기능 구현은 완료되었다.</h6></center><br>
<center><h6>정상적으로 조회된 페이지소스를 브라우저 기능을 이용하여 확인해보면<br>
            실제 화면에는 4번째 글번호만 출력이 되었지만<br>
            페이지소스에는 모든 글의 상세정보가 딸려왔음을 확인할 수 있다.</h6></center><br>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/findByIdAjaxOk.JPG?raw=true" width="450">
</div>
<br>

<center><h2>게시판 글상세조회(board/findById) 파트 끝</h2></center>