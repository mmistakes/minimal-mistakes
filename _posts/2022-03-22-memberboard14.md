---
layout: single
title: "14-회원제 게시판 만들기_SpringBoot와 JPA"
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

<center><h2>05-댓글(comment)파트 - SpringBoot</h2></center>

<center><h2>[게시판-댓글]</h2></center><br>

<center><h3>[첫번재-댓글등록 화면 보여주기]</h3></center><br>

<center><h6>글목록(findAll)에서 조회하고자 하는 글을 클릭하여 글상세화면(findById)으로 들어가<br>
            해당 글의 하단에 댓글을 쓸 수 있는 폼을 만든다. 로그인을 하지 않은 경우에는 작성자란이 비활성화되고<br>
            로그인한 상태에서 작성이 가능하게 구현한다.
            </h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/commentForm.JPG?raw=true" width="550">
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
        <input type="text" name="commentWriter" id="commentWriter" th:value="${session.loginEmail}" readonly><br>
        <input type="text" name="commentContents" id="commentContents" placeholder="내용"><br>
        <button id="comment-write-btn">댓글등록</button>
      </div>
      <div>
      <h3>-------------------------------------------------------------------------------------</h3>
      <div id="comment-area">
        <table>
          <thead>
          <tr>
            <th>댓글번호</th>
            <th>내용</th>
            <th>작성자</th>
            <th>작성시간</th>
          </tr>
          </thead>
          <tbody>
          <tr th:each="comment: ${commentList}">
            <td th:text="${comment.commentId}" id="commentId"></td>
            <td th:text="${comment.commentContents}"></td>
            <td th:text="${comment.commentWriter}"></td>
            <td th:text="${comment.createTime}"></td>
            <td><input type="button" th:if="${comment.commentWriter}==${session.loginEmail}" th:onclick="deleteById([[${comment.commentId}]])" value="삭제"></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    </body>

    <script>
      $("#comment-write-btn").click(function (){
        console.log('댓글등록 버튼 클릭');
        const commentWriter = $("#commentWriter").val();
        const commentContents = $("#commentContents").val();
        const boardId = '[[${board.boardId}]]';
        console.log(commentWriter, commentContents, boardId);
        $.ajax({
          type: 'post',
          url: '/comment/save',
          data:{
            'commentWriter': commentWriter,
            'commentContents': commentContents,
            'boardId': boardId
          },
          dataType: 'json',
          success: function (result){
            let output = "<table>";
            output += "<tr><th>댓글번호</th>";
            output += "<th>작성자</th>";
            output += "<th>내용</th>";
            output += "<th>작성시간</th></tr>";
            for ( let i in result) {
              output += "<tr>";
              output += "<td>" + result[i].commentId + "</td>";
              output += "<td>" + result[i].commentWriter + "</td>";
              output += "<td>" + result[i].commentContents + "</td>";
              output += "<td>" + result[i].createTime + "</td>";
              output += "</tr>";
            }
            output += "</table>";
            document.getElementById('comment-area').innerHTML = output;
            document.getElementById('commentContents').value = '';
            location.reload();
          },
          error: function (){
            alert('ajax 실패');
          }
        });
      });
    </script>
    </body>
    </html>
```
<br>

<center><h6>controller package에 CommentController를 만들고 댓글을 입력하면 댓글이 저장되고<br>
            기존에 작성된 댓글을 보여주기 위한 메서드(save(PostMapping))를 작성한다.<br>
            @RequestMapping("/comment")라는 코드를 추가하면 브라우저에서/comment로 들어오는 주소에 대해 <br>
            controller 內 주소 작성 시 /comment의 주소 뒷부분만 작성하면 되게 만들어준다.</h6></center>

```java 
    // 댓글 화면 저장 및 댓글 목록 보여주기
    package com.ex.test01.controller;
    
    import com.ex.test01.dto.CommentDetailDTO;
    import com.ex.test01.dto.CommentSaveDTO;
    import com.ex.test01.service.CommentService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.stereotype.Controller;
    import org.springframework.web.bind.annotation.*;
    
    import java.util.List;
    
    @Controller
    @RequiredArgsConstructor
    @RequestMapping("/comment")
    public class CommentController {
    
        private final CommentService cs;
    
      // 댓글 저장과 댓글 목록 보여주기
        @PostMapping("/save")
        public @ResponseBody
        List<CommentDetailDTO> save(@ModelAttribute CommentSaveDTO commentSaveDTO){
            cs.save(commentSaveDTO);
            List<CommentDetailDTO> commentList = cs.findAll(commentSaveDTO.getBoardId());
            return commentList;
        }
    }
```
<br>
<center><h6>상기의 필드로 구성된 CommentSaveDTO와 CommentDetailDTO를 dto package에 만들어준다.</h6></center><br>
<center><h6>CommentSaveDTO</h6></center>

```java 
    package com.ex.test01.dto;
    
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;
    
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class CommentSaveDTO {
    
        private Long commentId;
        private Long memberId;
        private Long boardId;
        private String commentWriter;
        private String commentContents;
    
    }
```
<br>
<center><h6>CommentDetailDTO</h6></center>

```java 
package com.ex.test01.dto;

import com.ex.test01.entity.CommentEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class CommentDetailDTO {

    private Long commentId;
    private Long memberId;
    private Long boardId;
    private String commentWriter;
    private String commentContents;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;

    public static CommentDetailDTO toCommentDetailDTO(CommentEntity c) {
        CommentDetailDTO commentDetailDTO = new CommentDetailDTO();
        commentDetailDTO.setCommentId(c.getCommentId());
        commentDetailDTO.setCommentWriter(c.getCommentWriter());
        commentDetailDTO.setCommentContents(c.getCommentContents());
        commentDetailDTO.setCreateTime(c.getCreateTime());
        commentDetailDTO.setUpdateTime(c.getUpdateTime());
        commentDetailDTO.setMemberId(c.getMemberEntity().getMemberId());
        commentDetailDTO.setBoardId(c.getBoardEntity().getBoardId());
        return commentDetailDTO;
    }
}
```
<br>

<center><h6>entity package에 CommentEntity를 생성하고 아래와 같이 작성한다.</h6></center>

```java 
package com.ex.test01.entity;

import com.ex.test01.dto.CommentSaveDTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.lang.reflect.Member;

@Entity
@Getter
@Setter
@Table(name="comment_table")
public class CommentEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="commentId")
    private Long commentId;

    @Column
    private String commentWriter;

    @Column
    private String commentContents;

    
    // 댓글과 게시글의 관계(여러개의 댓글을 하나의 게시글에 달 수 있음)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="boardId")
    private BoardEntity boardEntity;

    // 댓글과 회원의 관계(여러개의 댓글을 한명의 회원이 달 수 있음)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="memberId")
    private MemberEntity memberEntity;


    public static CommentEntity toSaveComment(CommentSaveDTO commentSaveDTO, MemberEntity memberEntity, BoardEntity boardEntity) {
    CommentEntity commentEntity = new CommentEntity();
    commentEntity.setCommentWriter(memberEntity.getMemberEmail());
    commentEntity.setCommentContents(commentSaveDTO.getCommentContents());
    commentEntity.setMemberEntity(memberEntity);
    commentEntity.setBoardEntity(boardEntity);
    return commentEntity;
    }
}

```
<br>

<center><h6>service package에 CommentService를 interface 형식으로 CommentServiceImpl을 class 형식으로 만들어준다.<br>
            CommentController에서 빨간 밑줄이 생긴 cs.save와 cs.findAll을 클릭하면 자동으로 CommentService에 <br>
            해당 내용이 생성된다.</h6></center>

<center><h6>CommentService</h6></center>

```java 
    // 댓글 저장
    Long save(CommentSaveDTO commentSaveDTO);
    
    // 댓글 목록
    List<CommentDetailDTO> findAll(Long boardId);
```
<br>

<center><h6>CommentServiceImpl에 댓글저장과 댓글목록 관련 내용을 추가한다.</h6></center>

```java 
package com.ex.test01.service;

import com.ex.test01.dto.CommentDetailDTO;
import com.ex.test01.dto.CommentSaveDTO;
import com.ex.test01.entity.BoardEntity;
import com.ex.test01.entity.CommentEntity;
import com.ex.test01.entity.MemberEntity;
import com.ex.test01.repository.BoardRepository;
import com.ex.test01.repository.CommentRepository;
import com.ex.test01.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final CommentRepository cr;
    private final MemberRepository mr;
    private final BoardRepository br;

    // 댓글 저장
    @Override
    public Long save(CommentSaveDTO commentSaveDTO) {
        BoardEntity boardEntity = br.findById(commentSaveDTO.getBoardId()).get();
        MemberEntity memberEntity = mr.findByMemberEmail(commentSaveDTO.getCommentWriter());
        CommentEntity commentEntity = CommentEntity.toSaveComment(commentSaveDTO, memberEntity, boardEntity);
        return cr.save(commentEntity).getCommentId();
    }

    // 댓글 목록
    @Override
    public List<CommentDetailDTO> findAll(Long boardId) {
        BoardEntity boardEntity = br.findById(boardId).get();
        List<CommentEntity> commentEntityList = boardEntity.getCommentEntityList();
        List<CommentDetailDTO> commentList = new ArrayList<>();
        for(CommentEntity c:commentEntityList) {
            CommentDetailDTO commentDetailDTO = CommentDetailDTO.toCommentDetailDTO(c);
            commentList.add(commentDetailDTO);
        }
        return commentList;
    }
}
```
<br>

<center><h6>repository package에 CommentRepository를 interface 형식으로 생성한 후 아래와 같이 작성한다.</h6></center>

```java 
  package com.ex.test01.repository;
  
  import com.ex.test01.entity.CommentEntity;
  import org.springframework.data.jpa.repository.JpaRepository;
  
  public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
  
  }

```
<br>

<center><h6>여기까지 작성 후 댓글을 작성 후 저장이 정상적으로 이뤄지는지와<br>
            댓글 목록이 정상적으로 화면에 보여지는지 확인한다.</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/commentSaveTry.jpg?raw=true" width="500"><br><br>
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/commentListOk.JPG?raw=true" width="500"><br><br>
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/commentSaveDb.JPG?raw=true" width="700">
</div>
<br>
<center><h6>상기와 같이 댓글이 정상적으로 저장이 되고 댓글 목록이 출력되었다면 해당 기능은 정상적으로 구현되었다.</h6></center><br>
<br>


<center><h3>[댓글 삭제 기능 구현]</h3></center><br>

<center><h6>글상세조회 화면(findById.html) 하단에 자신이 작성한 댓글에만 보여지는 삭제 버튼을 생성하고<br>
            삭제버튼을 누를 경우 실행될 Ajax Script를 작성한다.</h6></center><br>
<br>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/commentDeleteButton.JPG?raw=true" width="500"><br><br>
</div>

```html
<h3>-------------------------------------------------------------------------------------</h3>
    <div id="comment-area">
        <table>
            <thead>
            <tr>
                <th>댓글번호</th>
                <th>내용</th>
                <th>작성자</th>
                <th>작성시간</th>
            </tr>
            </thead>
            <tbody>
            <tr th:each="comment: ${commentList}">
                <td th:text="${comment.commentId}" id="commentId"></td>
                <td th:text="${comment.commentContents}"></td>
                <td th:text="${comment.commentWriter}"></td>
                <td th:text="${comment.createTime}"></td>
                <td><input type="button" th:if="${comment.commentWriter}==${session.loginEmail}" th:onclick="deleteById([[${comment.commentId}]])" value="삭제"></td>
            </tr>
            </tbody>
        </table>
    </div>
    </div>
    </body>
    <script>
      const deleteById = (commentId) => {    
        const reqUrl = "/comment/"+commentId;
        $.ajax({
          type: 'delete',
          url:reqUrl,
          success: function (){
            location.reload();
          },
          error: function (){
          }
        });
      }
    </script> 
</html>


```
<br>
<center><h6>CommentController에 댓글 삭제 관련 메서드를 추가한다.</h6></center>

```java 
  // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity deleteById(@PathVariable("commentId") Long commentId){
        cs.deleteById(commentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
```
<br>
<center><h6>CommentController 內 cs.deleteById를 클릭하면 자동으로 CommentService에 내용이 추가된다.</h6></center>

```java 
  // 댓글 삭제
    void deleteById(Long commentId);
```
<br>
<center><h6>CommentServiceImpl에 댓글 삭제 관련 내용을 추가한다.</h6></center>

```java 
  // 댓글 삭제
    @Override
    public void deleteById(Long commentId) {
        cr.deleteById(commentId);
    }
```
<br>
<center><h6>여기까지 작성 후 자신이 작성한 댓글을 삭제해본다.</h6></center>
<center><h6>삭제 前</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/commentDeleteButton.JPG?raw=true" width="500"><br><br>
</div><br>
<center><h6>삭제 後</h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/commentDeleteOk.JPG?raw=true" width="500"><br><br>
</div>
<center><h6>16번 댓글이 삭제됨을 확인할 수 있다.</h6></center>
<center><h6>여기까지 확인이 되면 댓글 삭제기능 구현은 정상적으로 구현되었다. </h6></center>

<center><h2>댓글(등록, 삭제, 목록)  파트 끝</h2></center>