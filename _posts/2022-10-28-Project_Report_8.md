---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록8"
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

<br>

# 이번에 해야할 목록

- 게시판 검색기능 기능 추가
    - Repository, Service, Controller 코드 수정
    - 테스트 코드 작성
    - 검색기능 tymeleaf 추가

## PostingRepositoryImpl 코드 수정

```java
...
    @Override
    public Page<PostingResponseDto> getListPaging(Pageable pageable, String postingSearch) {
        List<PostingResponseDto> pagingList = queryFactory
                .select(Projections.constructor(PostingResponseDto.class,
                        posting.id,
                        posting.title,
                        posting.content,
                        posting.writer,
                        posting.password,
                        posting.hits))
                .from(posting)
                .where(
                        postingInfoLike(postingSearch))
                .orderBy(posting.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(posting.count())
                .from(posting);

        return PageableExecutionUtils.getPage(pagingList, pageable, countQuery::fetchOne);
    }

    /*게시글 검색시 넘겨받은 값을 통해 일치하는 값이 있는지 확인
    * 해당 text를 포함하는 값이 있다면 where문에 넣어 반환
    * 해당 값이 없다면 null 반환
    * null을 반환하게 되면 where문은 자동으로 동작하지 않는다.
    * */
    private BooleanExpression postingInfoLike(String postingInfo) {
        return StringUtils.hasText(postingInfo) ? posting.title.contains(postingInfo)
                .or(posting.writer.contains(postingInfo)) : null;
    }
...
```
원래는 기존에 있던 `getListPaging()`은 두고, 검색 기능을 위해 따로 만들까 했지만, 그럴필요가 없을거 같아서 코드를 수정했다.<br>

- 검색어가 들어오면 `postingInfoLike()`를 통해서 게시글의 제목 또는 작성자와 일치하는지 파악하고, 일치하지 않으면 null을 반환해준다.
- 여기서 `.where()`문은 null이 들어가면 실행되지 않기 때문에 검색어가 없어도 정상적으로 동작한다.
- `contains()`는 위치에 상관없이 값이 포함만 되면 일치한다.

## PostingService 수정

```java
/*
* 전체 게시글 조회(페이징)
* 커뮤니티 메인 페이지에 정렬(최대 15개)
* */
public Page<PostingResponseDto> getPosting_paging(Pageable pageable, String postingInfo) {
    return postingRepository.getListPaging(pageable, postingInfo);
}
```
비즈니스 로직은 크게 달라지는거 없이 파라미터에 들어가는 값만 추가되었다.

## PostingController 수정

```java
@GetMapping("/list")
public String postingList(Model model, HttpServletRequest request,
                          @PageableDefault(page = 0, size = 15)Pageable pageable, String postingInfo) {
    // communityPage.html에서 name = postingInfo값을 넘겨주어 게시글 검색을 한다.
    log.info("postingInfo = {}", postingInfo);
    Page<PostingResponseDto> postingList = postingService.getPosting_paging(pageable, postingInfo);
    ...(생략)
}
```
컨트롤러도 마찬가지로 postingInfo만 추가되었다.

## 테스트 코드

```java
/*
* 게시글 검색 테스트 + 페이징
* */
@Test
void searchPosting_Test() {
    //when
    PageRequest pageRequest = PageRequest.of(0, 5);
    Page<PostingResponseDto> findPosting = postingRepository.getListPaging(pageRequest, "김길");

    //then
    for(PostingResponseDto find : findPosting) {
        log.info("findPosting = {}", find.getContent());
        Assertions.assertEquals(posting3.getTitle(), find.getTitle());
    }
}
```

## communityPage.html

```html
<form th:action method="get">
    <div class = "create_btn">
        <a th:href="@{/community/write}">글 쓰기</a>
    </div>
    <ul class="function">
        <li><input type="text" id="search_text" name="postingInfo"></li>
        <li><input type="submit" id="search_button" value="검색"></li>
    </ul>
</form>
```
처음에는 이 값을 `method="post"`로 넘겨야하나 고민이 많았는데, `name="postingInfo"`로 설정해주고, 컨트롤러에서도 이름을 맞춰주면 URL 파라미터로 넘어가는 이 값이 그대로 들어가게 된다.<br>
따라서, 따로 postMapping을 할 필요 없이 get으로 처리했다.

## 테스트 화면

![community_search](/images/Project_Report/community_search.png)