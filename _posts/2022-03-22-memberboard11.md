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

<center><h6>findAll.html에 글상세조회 링크(/board/findById)를 추가한다.<br> 
            단 글상세조회는 글제목을 클릭 시 글상세조회 페이지로 이동하게 하고<br>
            로그인 여부와 관계없이 보이도록 한다.<br>
            </h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardFindAll.JPG?raw=true" width="140">
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

<center><h6>resources 폴더에 board 폴더를 생성한 후 findAll.html로 글목록 화면을 만든다.</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardFindAllForm.jpg?raw=true" width="400">
</div>

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
<center><h6>BoardController에 글목록을 보여주기 위한 메서드(findAll)를 작성한다.</h6></center>

```java 
     // 글 목록
    @GetMapping("/findAll")
    public String findAll(Model model) {
        List<BoardDetailDTO> boardList = bs.findAll();
        model.addAttribute("boardList", boardList);
        return "/board/findAll";
    }
```

<br>

<center><h6>BoardController 內 bs.findAll()을 클릭하면 BoardService에 내용이 자동으로 추가된다.<br>
또한 조회수 기능 구현을 위해 아래와 같이 내용을 추가한다.</h6></center>

```java 
    // 글 목록
    List<BoardDetailDTO> findAll();
    
    // 조회수 기능
    void hits(Long boardId);
```
<br>

<center><h6>BoardServiceImpl에 관련 내용을 추가한다.</h6></center>

```java 
    // 글 목록 화면 보여주기
    @Override
    public List<BoardDetailDTO> findAll() {
        List<BoardEntity> boardEntityList = br.findAll();
        List<BoardDetailDTO> boardList = new ArrayList<>();
        for (BoardEntity e : boardEntityList) {
            boardList.add(BoardDetailDTO.toBoardDetailDTO(e));
        }
        return boardList;
        
    // 조회수 기능 구현
    @Transactional
    @Override
    public void hits(Long boardId) {
        br.hits(boardId);
    }     
  }
```
<br>

<center><h6>BoardRepository에 글조회수의 표시 및 조회수 증가 기능을 위해 내용을 추가한다.</h6></center>

```java 
package com.ex.test01.repository;

import com.ex.test01.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {

    @Modifying
    @Query("update BoardEntity  as b set b.boardHits = b.boardHits+1 where b.boardId= :boardId")
    void hits(Long boardId);
} 
```
<br>

<center><h6>여기까지 작성 후 index화면에서 글목록을 눌러 기작성되어 있던 글들의 목록이 보여지는지 확인한다. </h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardFindAllOk.JPG?raw=true" width="370"></div>

<center><h6>상기와 같이 글목록이 정상적으로 보여진다면 글목록 기능구현은 완료되었다.</h6></center><br>


<center><h2>게시판 글목록(board/findAll) 파트 끝</h2></center>