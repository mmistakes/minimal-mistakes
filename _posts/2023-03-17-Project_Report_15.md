---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록15"
categories: Project
tag: [web, server, DB, spring boot, spring mvc, java, JPA]
toc: true
toc_sticky: true
author_profile: false
sidebar:
    nav: "docs"
---

<br>

# 현재까지 진행 상황

- 회원가입 기능 완료
    - BaseTimeEntity 생성 완료
    - User Entity 생성 완료
    - UserRepositoryImpl, UserService를 통해서 DB에 저장되는지 Test Code로 확인.
    - 중복 회원 검증
    - 회원가입 관련 html thymeleaf 적용해서 동적인 코드로 변경
    - 회원가입시 사용할 error code 생성
    - 회원가입시 검증기를 통한 text 출력
    - Controller 생성 후 연결해서 화면에서 확인
- 로그인 기능 완료
    - 로그인시 사용할 Dto 생성
    - 로그인 Service 생성
    - 로그인 Controller에서 로그인 처리
    - 로그인 관련 HTML 동적인 코드로 변경(+오류 코드)
- 게시판 Entity, DTO, Repository 개발    
    - 게시판 관련 Entity 생성
    - 필요한 정보만 받아올 DTO 생성
    - Error Code 작성
    - 게시판 관련 Repository 개발
    - 게시판 Repository Test Code 작성
- 게시판 Controller, Service 개발
    - 게시판 비즈니스 로직 구현
    - 비즈니스 로직 테스트 코드 작성
    - 컨트롤러 제작
    - 게시판 html을 thymeleaf를 통해 동적인 코드로 수정
    - 실제 실행 테스트
- 로그인된 사용자만 특정 사이트에 들어갈 수 있도록 인터셉터 제작
- 오류 페이지 적용
- 로그인 후 모든 페이지에서 사용자가 로그인된 상태인 것을 인지할 수 있도록 로직 수정
- 게시판 검색기능 기능 추가
    - Repository, Service, Controller 코드 수정
    - 테스트 코드 작성
    - 검색기능 tymeleaf 추가
- 메인 서비스 개발
    - 임시 메인 서비스 화면 제작
    - `NaverMovieApiService` 개발(네이버 API를 활용한 값 읽어오기)
    - AutoComplete 기능 개발
        - MainService 로직 개발
        - 서비스 페이지에 ajax 코드 추가
        - AutoComplete 관련 Controller 코드 작성
    - 검색어의 개수에 따른 동작 구현
        - MainService.java에 영화를 검색하는 로직 작성
        - MainServiceController 관련 코드 작성
        - searvicePage.html, compareServicePage.html thymeleaf 코드 작성
        - 에러 페이지 제작
    - 네이버 영화 페이지에서 리뷰 정보 크롤링 해오기
        - MainService 크롤링 관련 코드 작성
        - MainServiceController 관련 코드 추가
        - servicePage, compareServicePage 코드 추가
- 전체적인 디자인 변경 및 부가적인 페이지 제작
- 로그인, 회원가입 관련 검증에 대한 우선순위 설정
- 메시지 알림창(alert) 기능을 위한 message.html 제작
    - 게시글 삭제시에 적용
    - 회원 가입시 사용
        - 회원 가입 실패에 대한 예외 처리

<br>

# 이번에 해야할 목록

- 회원 정보 페이지 제작
    - 관련 엔티티 생성
        - 연관관계 매핑 코드 추가

## Front-end 개발

### memberInfoPage

```html
<!doctype html>
<html lang="ko">
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <link rel="stylesheet" type="text/css" href="/css/member_info_style.css">
    <link rel="stylesheet" type="text/css" href="/css/common.css">
</head>
<body>
<div class="center">
    <div class="image_box">
        <img class="logo_img" th:src="@{/img/memberInfo_logo.png}">
    </div>

    <div class="title">
        회원 정보
    </div>

    <div class="txt_field">
        <div class="info_tag">
            이름
        </div>
        <div class="info_txt">
            <p th:text="${user.userName}"></p>
        </div>
    </div>

    <div class="txt_field">
        <div class="info_tag">
            ID
        </div>
        <div class="info_txt">
            <p th:text="${user.userId}">
        </div>
    </div>

    <button class="button" onclick="button_click();">회원탈퇴</button>

    <script>
        let popupWidth = 460;
        let popupHeight = 510;

        let popupX = (window.screen.width / 2) - (popupWidth / 2);
        let popupY = (window.screen.height / 2) - (popupHeight / 2) - 150;

        function button_click() {
            window.open('/memberInfo/popup', '회원탈퇴', 'width=' + popupWidth + ', height=' + popupHeight +
            ', left=' + popupX + ', top=' + popupY);
        }
    </script>
</div>

<div class="user_record">
    <div class="community_record">
        <div class="record_title">
            <p>게시글 작성 목록</p>
        </div>

        <div class="record_contents" th:if="${not #lists.isEmpty(postings)}" th:each="posting : ${postings}">
            <a th:text="${posting.postingTitle}" th:href="@{/community/{postingId}/read (postingId = ${posting.postingId})}"></a>
        </div>
    </div>

    <div class="search_record">
        <div class="record_title">
            <p>검색 목록</p>
        </div>

        <div class="record_contents" th:if="${not #lists.isEmpty(movies)}" th:each="movie : ${movies}">
            <p th:text=${movie}></p>
        </div>
    </div>
</div>
</body>
</html>
```
- 해당 페이지는 회원의 정보를 가운데에 출력하고, 그 외의 정보들은 아래에 출력하도록 할 것이다.
- 컨트롤러에서 넘겨주는 회원의 정보를 출력.
- 게시글의 정보 및 영화 제목 검색 목록은 `th:if`문을 사용하여 넘겨준 list에 값이 있으면 출력하도록 했다.
- 중요하게 볼 것은 회원 탈퇴 버튼인데, script를 사용하여 함수를 따로 만들어 버튼을 누르면 호출하는 식으로 제작했다.
    - 회원탈퇴 버튼을 누르면 팝업창을 띄워서 그 안에서 탈퇴를 진행시키는 방식이다.
    - 팝업의 위치는 가운데를 기준으로 보기 좋은 위치로 맞췄다.
    - 최종적으로 `window.open()`을 활용하여 팝업을 지정한 크기와 위치에 출력한다.

### deleteMember_popup_page

```html
<!doctype html>
<html lang="ko" xmlns:th="http://www.w3.org/1999/xhtml">
    <head>
        <link rel="stylesheet" type="text/css" href="/css/deleteMember_popUp_style.css">

        <style>
            .field-error {
                border-color: #dc3545;
                color: #dc3545;
            }
        </style>
    </head>
    <body>
        <div class="center">
            <div class="image_box">
                <img th:src="@{/img/main_logo.png}" class="logo_img">
            </div>

            <div class="title">
                <text>회원 탈퇴</text>
            </div>
            <form th:action="@{/memberInfo/withdrawal_member}" th:object="${checkPassword}" method="post">
                <div class="txt_field">
                    <input type="password" required th:field="*{password}" th:errorclass="field-error">
                    <span></span>
                    <label>패스워드</label>
                </div>

                <div th:if="${#fields.hasGlobalErrors()}">
                    <p class="field-error" th:each="err : ${#fields.globalErrors()}"
                       th:text="${err}"></p>
                </div>

                <input type="submit" value="탈퇴하기">
            </form>
        </div> 
    </body>
</html>
```
- 실제 회원탈퇴를 진행하는 팝업창 html
- 패스워드를 확인하고 진행하는 방식으로 패스워드가 일치하지 않으면 오류 메시지를 출력.

## Back-end 개발

### CreatedTimeEntity

```java
@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class CreatedTimeEntity {

    // Entity가 생성되서 저장될 때 시간이 자동 저장
    @CreatedDate
    private LocalDateTime createdDate;
}
```
- 기존 `BaseTimeEntity`도 있지만, `BaseTimeEntity`는 생성일자와 수정일자가 들어간다.
- 또한, `BaseTimeEntity`는 `yyyy-MM-dd`형식으로 format해서 시간을 활용할 수는 없다.
- Movie Entity는 생성일자만 필요하며, 검색 시간을 통해 정렬할 것이기 때문에 `CreatedTimeEntity`를 따로 생성했다.

### Movie Entity

사용자 정보 페이지에서는 사용자가 작성한 게시글과 최근 검색한 영화의 제목을 표시할 것이기 때문에 영화 관련 엔티티를 생성했다.

```java
@Entity
@Getter
@NoArgsConstructor
public class Movie extends CreatedTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String movie_title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_PK")
    private User user;

    public Movie(String movie_title, User user) {
        this.movie_title = movie_title;
        this.user = user;
    }
}
```
- 실제 필요한 데이터는 영화의 제목밖에 없고, 어떤 사용자가 검색한 것인지 연결해줘야 하기 때문에 User 엔티티와 연관관계 매핑을 했다.
- id값은 MySQL을 사용할 것이므로 `@GeneratedValue(strategy = GenerationType.IDENTITY)`으로 설정해 주었다.
- 한명의 회원에 대한 많은 검색 기록이 존재하므로, Movie엔티티가 Many, User 엔티티가 One이다.
    - `@ManyToOne()`은 기본적으로 즉시 로딩이므로 지연 로딩으로 설정.
- 최신 검색어를 기준으로 출력해줄 것이기 때문에 `CreatedTimeEntity`를 상속받아 생성일자를 저장.

### Posting Entity

```java
@Entity
@Getter
@NoArgsConstructor
public class Posting extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_id")
    private Long id;

    private String title;   // 제목
    private String content; // 내용
    private String writer; //글쓴이
    private int hits; // 조회수

    private String password; // 수정, 삭제시 사용할 패스워드

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_PK")
    private User user;

    (...)
}
```
- 회원정보 페이지에서 작성한 게시글 정보도 출력해야 하기 때문에 Posting 엔티티도 User 엔티티와 연관관계 매핑을 하였다.
    - Movie 엔티티와 마찬가지로 한명의 회원이 여러 게시글을 작성하기 때문에 Posting 엔티티가 Many, User 엔티티가 One.

### User Entity

```java
@Entity
@Getter
@NoArgsConstructor
public class User extends BaseTimeEntity{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_PK")
    private Long id;
    private String userName;
    private String userId;
    private String password;

    @Enumerated(EnumType.STRING)
    @Setter
    private Role role;

    /*
    * 회원 정보가 삭제되면 작성한 게시글과 영화 정보도 같이 삭제
    * orphanRemoval = true
    * */
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    List<Movie> movies = new ArrayList<>();

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    List<Posting> postings = new ArrayList<>();

    (...)
}
```
- User 엔티티에서 Movie, Posting 엔티티와 연관관계 매핑을 하면서 양방향 연관관계 매핑으로 설정하였다.
- 회원 탈퇴시에는 해당 회원이 작성한 게시글이나 검색한 영화의 제목은 DB에 남아있을 필요가 없다.
    - 고아 객체 제거 기능(`orphanRemoval = true`)을 사용해서 회원이 삭제되면 같이 제거되도록 설정.
    - 고아 객체 제거 : 부모 엔티티와 연관관계가 끊어진 자식 엔티티를 자동으로 삭제.

<br>

# 정리

페이지를 만드는 것은 어렵지 않았지만, 팝업창에서 조금 시간이 걸렸다.<br>
팝업창을 띄우는 것도 문제였지만, 회원 탈퇴를 한 이후에 메인페이지로 돌아가려니 팝업창에서 돌아가버려서, 팝업창을 닫고 메인페이지에서 돌아가도록 구현하는게 힘들었다..<br>
위 문제는 message.html에서 `window.self.close()`와 `window.opener`를 통해 해결할 수 있었다.