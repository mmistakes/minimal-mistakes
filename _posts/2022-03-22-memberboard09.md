---
layout: single
title: "09-회원제 게시판 만들기_SpringBoot와 JPA"
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

<center><h2>[게시판-글쓰기]</h2></center><br>

<center><h6>index.html에 글쓰기 링크(/board/save)를 추가한다. 단 글쓰기는 로그인을 할 경우에만 보이도록 한다.</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardSave_index.jpg?raw=true" width="200">
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
     <a class="nav-link" href="/admin/memberList" style="font-size: 15px">회원 목록</a><br><br>
     </div></span>

</div>
<br><br><br><br><br>

</body>
</html>
```
<br>

<center><h6>resources 폴더에 board 폴더를 생성한 후 save.html로 글쓰기 화면을 만든다.</h6></center>

<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/boardSave.JPG?raw=true" width="250">
</div>
<center><h6>작성자는 로그인한 Email이 자동으로 표기되도록 한다. 또한 어느 회원이 쓴 글인지에 대한 정보도 같이 가지고 있어야 하기에 회원번호(memberId)는 hidden으로 서버에 같이 저장이 되게끔 만든다.</h6></center>
<br>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:font-size="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <title>글쓰기</title>

  <script src="https://code.jquery.com/jquery-latest.min.js"></script>
</head>

<body>
<div th:align="center">

  <h2>글쓰기</h2><br>
  <form action ="/board/save" method="post" enctype="multipart/form-data" th:object="${board}">
    작성자<br>
    <input type="text" name="boardWriter" th:value="${session.loginEmail}" readonly><br><br>
    제목<br>
    <input type="text" name="boardTitle" th:field="*{boardTitle}"><br><br>
    글 내용<br>
    <input type="text" name="boardContents" th:field="*{boardContents}"><br><br>
    <input type="file" name="boardFile" th:field="*{boardFile}"><br><br><br>
    <input type="hidden" name="memberId" th:field="*{memberId}">
    <input type="submit" value="글 등록">
  </form>
</div>
</div>
</body>
</html>
```
<br>
<center><h6>위의 정의된 필드로 구성 DTO 파일을 dto package에 BoardSaveDTO라는 이름으로 만들어준다.</h6></center>

```java 
package com.ex.test01.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardSaveDTO {

    private String boardWriter;
    private String boardTitle;
    private String boardContents;
    private MultipartFile boardFile;
    private String boardFilename;
    private LocalDateTime boardDate;
    private int boardHits;
    private String memberId;
}
```

<br>
<center><h6>controller package에 BoardController를 만들어준다.<br>그리고 BoardController에 글작성 화면이 보이게하는 메서드를 작성해준다.</h6></center>

```java 
package com.ex.test01.controller;

import com.ex.test01.dto.*;
import com.ex.test01.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
    private final BoardService bs;

    // 글작성 화면 띄우기
    @GetMapping("/save")
    public String saveForm(Model model) {
        model.addAttribute("board", new BoardSaveDTO());
        return "/board/save";
    }
  }
```

<center><h6>여기까지 작성 후 서버를 실행하여 글쓰기 페이지가 정상적으로 뜨는지 확인한다.<br><br>정상적으로 화면이 뜨면 글작성을 모두 마치고 글등록 버튼을 눌렀을때<br> 해당 글이 DB에 저장이 되게끔 하는 메서드를 BoardController에 만들어준다.<br>글 등록이 완료되면 화면은 index 페이지를 띄워주게끔 작성한다.</h6></center>

```java 
    @PostMapping("/save")
    public String save(@ModelAttribute("board") BoardSaveDTO boardSaveDTO) throws IOException {
        Long boardId = bs.save(boardSaveDTO);
        return "redirect:/";
    }
```

<center><h6>service package에 BoardService와 BoardServiceImpl을 만들어준다.<br>그리고 BoardController 內 bs.save을 클릭하면 BoardService에 내용이 자동으로 추가된다.</h6></center>

```java 
package com.ex.test01.service;

import com.ex.test01.dto.BoardSaveDTO;
import java.io.IOException;

public interface BoardService {
    Long save(BoardSaveDTO boardSaveDTO) throws IOException;
  }
```
<br>

<center><h6>MemberServiceImpl에 관련 내용을 추가한다.</h6></center>

```java 
package com.ex.test01.service;

import com.ex.test01.dto.*;
import com.ex.test01.entity.BoardEntity;
import com.ex.test01.entity.MemberEntity;
import com.ex.test01.repository.BoardRepository;
import com.ex.test01.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;


@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{

    private final BoardRepository br;
    private final MemberRepository mr;

    @Override
    public Long save(@ModelAttribute("board") BoardSaveDTO boardSaveDTO) throws IOException {
        MultipartFile boardFile = boardSaveDTO.getBoardFile();
        String boardFilename = boardFile.getOriginalFilename();
        boardFilename = System.currentTimeMillis() + "-" + boardFilename;
        String savePath = "F:\\Development_F\\source\\springboot\\test01\\src\\main\\resources\\templates\\img\\" + boardFilename;
        if (!boardFile.isEmpty()) {
        boardFile.transferTo(new File(savePath));
    }
        boardSaveDTO.setBoardFilename(boardFilename);
        MemberEntity memberEntity = mr.findByMemberEmail(boardSaveDTO.getBoardWriter());
        BoardEntity boardEntity = BoardEntity.saveBoard(boardSaveDTO, memberEntity);
        return br.save(boardEntity).getBoardId();
    }
}
```
<br>
<center><h6>여기까지 작성한 후 entity package에 BoardEntity를 class 형식으로 만든 후 Entity의 기본적인 내용을 작성하고<br>글작성이 저장될 수 있게끔 saveBoard 항목을 하단에 추가하여 작성해준다. </h6></center>

```java 
package com.ex.test01.entity;

import com.ex.test01.dto.BoardSaveDTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="board_table")
public class BoardEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long boardId;

    @Column
    private String boardWriter;

    @Column
    private String boardTitle;

    @Column(length = 2000)
    private String boardContents;

    @Column
    private String boardFilename;

    @Column
    private int boardHits;

  // 한명의 회원이 여러개의 게시글을 작성할 수 있기에 @ManyToOne으로 구성
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private MemberEntity memberEntity;


    public static BoardEntity saveBoard(BoardSaveDTO boardSaveDTO, MemberEntity memberEntity) {
//    public static BoardEntity saveBoard(BoardSaveDTO boardSaveDTO) {
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setBoardWriter(boardSaveDTO.getBoardWriter());
        boardEntity.setBoardTitle(boardSaveDTO.getBoardTitle());
        boardEntity.setBoardContents(boardSaveDTO.getBoardContents());
        boardEntity.setBoardFilename(boardSaveDTO.getBoardFilename());
        boardEntity.setMemberEntity(memberEntity);
        boardEntity.setBoardHits(0);
        return boardEntity;
    }

}
```
<center><h6>repository package에 BoardRepository를 interface 형식으로 만든 후 아래와 같이 작성한다.</h6></center>

```java 
package com.ex.test01.repository;

import com.ex.test01.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {

}
```

<br><br>
<center><h6>여기까지 작성 후 회원으로 로그인하여 글쓰기페이지(/board/save.html)에서 글작성 후 글등록 버튼을 눌러<br> 작성한 글이 저장이 잘 되었는지를 db화면에서 확인해본다. 또한 브라우저에는 index화면이 뜨는지도 확인한다. </h6></center>
<div align="center">
<img src="https://github.com/Gibson1211/Gibson1211.github.io/blob/master/assets/images/memberList_jpg.jpg?raw=true" width="300"></div>

<br><br>

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