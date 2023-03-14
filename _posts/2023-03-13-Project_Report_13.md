---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록13"
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
<br>

# 이번에 해야할 목록

- 전체적인 디자인 변경 및 부가적인 페이지 제작
- 로그인, 회원가입 관련 검증에 대한 우선순위 설정

## 구상

- 홈페이지 전체적으로 디자인을 수정하고, 홈페이지에 대한 설명과 어떤 이유로 만들어졌는지 Service 페이지와 About 페이지를 제작.
- `@GroupSequence`를 사용하여 검증 우선순위 부여

## 디자인

### header

#### 기존 디자인

![common](/images/Project_Report/common.png)

#### 변경 디자인

![new_common](/images/Project_Report/new_common.png)

- 전체적인 페이지의 디자인과 색감을 맞춰서 새롭게 제작
- 로고 삽입

### 메인 페이지

#### 기존 디자인

![old_mainPage](/images/Project_Report/old_mainPage.png)

#### 변경 디자인

![mainPage](/images/Project_Report/mainPage.png)

- 필요한 기능은 검색칸밖에 없어서 화면을 어떻게 채울지 고민을 많이했다..
- 웹사이트에 나온 여러 디자인을 참고해서 가장 잘 맞는 디자인을 찾아서 참고해 만들었다.
- 왼쪽, 오른쪽으로 화면을 나누어 오른쪽은 로고를 넣고, 왼쪽은 필요한 기능과 사이트 관련 정보를 게시했다.

### 회원가입, 로그인 관련

#### 기존 디자인

![joinPage](/images/Project_Report/joinPage.png)
<br>

![login1](/images/Project_Report/login1.png)

#### 변경 디자인

![new_joinPage](/images/Project_Report/new_joinPage.png)
<br>

![new_login](/images/Project_Report/new_login.png)

- 기능은 전과 동일하게 돌아간다.

### 게시판 관련

#### 기존 디자인

![community_page](/images/Project_Report/community_page.png)

![community_write](/images/Project_Report/community_write.png)

![community_read](/images/Project_Report/community_read.png)

#### 변경 디자인

![new_community_page](/images/Project_Report/new_community_page.png)

![new_community_write](/images/Project_Report/new_community_write.png)

![new_community_read](/images/Project_Report/new_community_read.png)

### Service, About 페이지

#### Service

![main_servicePage](/images/Project_Report/main_servicePage.png)

#### About

![main_aboutPage](/images/Project_Report/main_aboutPage.png)

- Service, About 페이지는 홈페이지에 대한 설명이 들어간 페이지다.
- 마우스 커서를 위에 올리면 움직이는 형태로 제작
    - (유튜브 영상을 참고하면서 만들었다.)
    - [Service 페이지 출처](https://www.youtube.com/watch?v=WpLvs3v02OU)
    - [About 페이지 출처](https://www.youtube.com/watch?v=Llln7-xYRHA)

<br>

## 검증 우선순위 설정

기존 로그인, 회원가입 페이지 코드에서는 입력하는 값에 따른 검증은 작동하지만, `@NotBlank`, `@Pattern` 두 검증에 동시에 걸리게 되면 오류 메시지가 모두 출력되는 문제가 있다.<br>
그래서 걸어놓은 검증에 대하여 우선순위가 필요했다.

### ValidationGroups

```java
public class ValidationGroups {
    public interface NotEmptyGroup {};
    public interface PatternCheckGroup {};
}
```
- 각각의 인터페이스를 따로따로 만들지 않고, 한 클래스 안에 정의.

### ValidationSequence
```java
@GroupSequence({NotEmptyGroup.class, PatternCheckGroup.class})
public interface ValidationSequence {
}
```
- `@GroupSequence`를 사용하여 그룹별 인터페이스 정의
- 왼쪽부터 유효성 검사를 진행해서 오류가 없으면 다음 유효성 검사를 진행.
    - NotEmptyGroup.class -> PatternCheckGroup.class


### 적용

**JoinForm**<br>
```java
@Getter
public class JoinForm {

    @NotBlank(groups = ValidationGroups.NotEmptyGroup.class)
    @Pattern(regexp = "^[가-힣a-zA-Z]{2,10}$", groups = ValidationGroups.PatternCheckGroup.class)
    private String userName;

    @NotBlank(groups = ValidationGroups.NotEmptyGroup.class)
    @Pattern(regexp = "[a-z0-9]{5,9}", groups = ValidationGroups.PatternCheckGroup.class)
    private String userId;

    @NotBlank(groups = ValidationGroups.NotEmptyGroup.class)
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", groups = ValidationGroups.PatternCheckGroup.class)
    private String password;

    @NotBlank(groups = ValidationGroups.NotEmptyGroup.class)
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", groups = ValidationGroups.PatternCheckGroup.class)
    private String check_password;  // 2차 비밀번호

}
```
- LoginForm 코드는 동일
- 시퀀스를 지정하기 위해 `@Validated`어노테이션을 사용해야 한다.

>**참고**<br>
@Valid와 @Validated의 차이점은 검증 항목을 그룹으로 나눠서 검증할 수 있는지, 즉 Group Validation이 가능한지에 대한 여부이다.<br>
자바에서 객체를 검증할 때 사용하도록 구현한 것이 @Valid라면 여기에 Group Validation까지 가능하도록 구현된 것이 스프링 프레임워크의 @Validated이다.


# 마무리

전체적으로 조잡했던 디자인을 모두 변경했다.<br>
html, css는 어느정도 할 수 있지만, 전체적인 디자인 감각이나 구체적인 코드는 잘 모르기 때문에 미디어의 힘을 많이 빌렸다.