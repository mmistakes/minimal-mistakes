---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록5"
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

<br>

# 이번에 해야할 목록

- 게시판 관련 Entity 생성
- 필요한 정보만 받아올 DTO 생성
- Error Code 작성
- 게시판 관련 Repository 개발
- 게시판 Repository Test Code 작성

## Posting Entity

```java
@Entity
@Getter
@NoArgsConstructor
public class Posting extends BaseTimeEntity {

    @Id @GeneratedValue
    @Column(name = "posting_id")
    private Long id;

    private String title;   // 제목
    private String content; // 내용
    private String writer; //글쓴이
    private int hits; // 조회수
    
    private String password; // 수정, 삭제시 사용할 패스워드

    public Posting(String title, String content, String writer, String password, int hits) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.password = password;
        this.hits = hits;
    }

    // 조회수 ++
    public void setHits(int hits) {
        this.hits = hits;
    }

    // 게시글 수정시 사용
    public void updateContent(String content) {
        this.content = content;
    }
```
- 기본적인 제목, 내용, 작성자, 조회수 항목이 있다.
- `setHits` : 게시글 조회시 조회수를 1씩 추가하기 위해 생성
- `updateContent` : 게시글 수정시 내용 변경에 사용하기 위해 생성

## DTO 작성

그때 그때 상황에 맞는 DTO를 모두 제작해서 그런지 생성된 DTO가 많다.

### PostingForm

```java
@Getter
public class PostingForm {

    @NotBlank
    private String title;
    @NotBlank
    private String content;
    private String writer;
    
    /*
    * 수정, 삭제를 위한 패스워드 입력
    * */
    @NotBlank
    private String password;

    public PostingForm(String title, String content, String writer, String password) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.password = password;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }
}
```
- 게시글 작성시에 사용할 DTO
- 글 작성시에는 제목과, 글 내용만 입력 받지만 작성 화면에서는 작성자까지 출력해준다.

### PostingRequestDto

```java
@Getter
@NoArgsConstructor
public class PostingRequestDto {

    private Long id;
    private String title;
    private String content;
    private String writer;

    public PostingRequestDto(Long id, String title, String content, String writer) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.writer = writer;
    }
}
```
- 기본적인 정보를 조회할 때 사용할 DTO

### PostingResponseDto

```java
@Getter
@NoArgsConstructor
public class PostingResponseDto {
    private Long id;
    private String title;
    private String content;
    private String writer;
    private String password;
    private int hits;
    private LocalDateTime modifiedDate;

    // paging 포함 조회시 사용(전체 게시글 송출)
    public PostingResponseDto(Long id, String title, String content, String writer, String password, int hits, String createdDate) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.password = password;
        this.hits = hits;
        this.createdDate = createdDate;
    }

    // paging없이 단순 조회(게시글 조회 등)
    public PostingResponseDto(Long id, String title, String content, String writer, String password, int hits) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.password = password;
        this.hits = hits;
    }
}
```
- 게시물 상세 조회에 필요한 DTO

### PostingModifyForm

```java
@Getter
public class PostingModifyForm {

    private Long id;

    @NotBlank
    private String content;

    public PostingModifyForm(Long id, String content) {
        this.id = id;
        this.content = content;
    }
}

```
- 글 수정, 삭제시에 사용
- 글 수정 화면에서 수정되는 글의 내용을 받는 DTO

### PostingPassword

```java
@Getter
public class PostingPassword {

    /*
     * 수정, 삭제를 위한 패스워드 입력
     * */
    @NotBlank
    private String password;

    public PostingPassword(String password) {
        this.password = password;
    }
}
```
- 게시글을 수정, 삭제하려면 패스워드 확인을 하는데 그때 사용한다.

## Error Code 작성

```properties
...(이전 코드 생략)

# 게시글 작성시 오류 코드
NotBlank.postingForm.title = 제목을 입력해 주세요.
NotBlank.postingForm.content = 게시글을 입력해 주세요.
NotBlank.postingForm.password = 비밀번호를 입력해 주세요.

# 게시글 수정시 오류 코드
NotBlank.postingPasswordForm.password = 비밀번호를 입력해 주세요.
NotBlank.postingModifyForm.content = 게시글을 입력해 주세요.
```

## PostingRepositoryImpl

`PostingRepositoryImpl`도 `PostingRepository` interface를 상속받도록 하였다.

```java
@Repository
public class PostingRepositoryImpl implements PostingRepository {

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public PostingRepositoryImpl(EntityManager em) {
        this.em = em;
        this.queryFactory = new JPAQueryFactory(em);
    }

    QPosting qPosting = posting;

    @Override
    public Long create(Posting posting) {
        em.persist(posting);
        return posting.getId();
    }

    /*
    * 커뮤니티 전체 글 페이징 추가해서 받아오기
    * */
    @Override
    public Page<PostingResponseDto> getListPaging(Pageable pageable) {
        List<PostingResponseDto> pagingList = queryFactory
                .select(Projections.constructor(PostingResponseDto.class,
                        posting.id,
                        posting.title,
                        posting.content,
                        posting.writer,
                        posting.password,
                        posting.hits))
                .from(posting)
                .orderBy(posting.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(posting.count())
                .from(posting);

        return PageableExecutionUtils.getPage(pagingList, pageable, countQuery::fetchOne);
    }

    /*
    * 커뮤니티 글 전체 리스트 가져오는 메소드
    * */
    public List<PostingResponseDto> getList() {
        return queryFactory
                .select(Projections.constructor(PostingResponseDto.class,
                        posting.id,
                        posting.title,
                        posting.content,
                        posting.writer,
                        posting.password,
                        posting.hits))
                .from(posting)
                .fetch();
    }
    
    /*
    * 하나의 글 조회시 글의 정보를 가져오는 메소드
    * getList() 리턴값에서 id 값을 이용해 필요한 포스팅 정보만 필터링
    * */
    public Optional<PostingResponseDto> getPosting(Long postingId) {
        return getList().stream()
                .filter(postingResponseDto -> postingResponseDto.getId().equals(postingId))
                .findFirst();
    }

    /*
    * Id로 조회하여 Entity 반환, 값이 없으면 null 반환
    * 게시글 수정시에 사용
    * Dirty Checking 용도
    * */
    public Posting findPostingById(Long postingId) {
        Posting findPosting = em.find(Posting.class, postingId);
        return findPosting != null ? findPosting : null;
    }

    // 게시글 삭제
    @Override
    public void delete_Posting(Long postingId) {
        queryFactory
                .delete(posting)
                .where(posting.id.eq(postingId))
                .execute();
    }
}
```
- querydsl을 사용해서 쿼리를 작성했다.
- `getListPaging(Pageable pageable)`
    - 게시판 모든 글을 출력하기 위해서 모든 게시글을 가져오는 메소드
    - Entity가 아닌 `PostingResponseDto`에 값을 바로 받았다.
    - `id`값에 따라서 내림차순 정렬하였다.
    - Controller에서 넘겨주는 Pageable의 정보에서 offset, size를 뽑아서 화면에 출력할 개수를 설정했다.
    - `countQuery`
        - Spring Boot 2.6 부터는 `fetchCount()`를 향후 미지원한다고 한다고 해서 따로 count 쿼리를 만들었다.
        - `fetch()`를 통해 컨텐츠만 가져오는 쿼리를 날리고, count 쿼리는 `PageableExecutionUtils.getPage`를 사용했다.
        - `(posting.count())`는 `count(posting.id)`로 처리된다.
- `findPostingById()`와 `getPosting()`의 차이는 `id`를 통해 Entity를 직접 반환하는지, DTO로 변환해서 받아오는지의 차이이다.
    - Entity로 직접 받아오는 것은 게시글 수정시에 Dirty Checking을 이용해서 수정 내용을 바로 적용하기 위해서이다.


> **[참고]** <br>
`PageableExecutionUtils.getPage`는 `PageImpl`과 같은 역할을 하지만 마지막 인자로 함수를 전달하는데 내부 작동에 의해서 total 카운트가 페이지 사이즈보다 적거나, 마지막 페이지 일 경우 해당 함수를 실행하지 않는다.

> **[참고]** <br>
`PageImpl`은 `Page` 인터페이스의 구현체로 `PageImpl`의 인자로는 content(조회된 컨텐츠), Pageable(페이지 요청 데이터), totalCount(전체 컨텐츠의 개수)가 들어간다.<br>
페이징 데이터가 많지 않거나 접속량이 중요하지 않다면 사용해도 큰 문제가 없다.<br>
하지만 `PageableExecutionUtils`를 사용하면 조금 더 성능 최적화가 되기 때문에 이것을 사용하는 것이 더 좋을 것 같다.

## Repository Test Code 작성

```java
@SpringBootTest
@Slf4j
@Transactional
public class PostingRepositoryImplTest {

    @Autowired PostingRepository postingRepository;

    Posting posting1;
    Posting posting2;
    Posting posting3;

    /*
    * 테스트시 사용할 초기값 미리 넣어 두기
    * */
    @BeforeEach
    public void init() {
        posting1 = new Posting("게시글1", "안녕하세요. 홍길동 입니다.", "홍길동", "1234", 1);
        posting2 = new Posting("게시글2", "안녕하세요. 고길동 입니다.", "고길동", "1234", 1);
        posting3 = new Posting("게시글3", "안녕하세요. 김길이 입니다.", "김길이", "1234", 1);

        postingRepository.create(posting1);
        postingRepository.create(posting2);
        postingRepository.create(posting3);
    }


    /*
    * 게시글 저장 테스트
    * create(), getPosting()
    * */
    @Test
//    @Rollback(value = false)
    void postingCreate_Test() {
        //given
        Posting posting = new Posting("첫 게시글1", "안녕하세요. 홍길동 입니다.", "홍길동","1234", 1);

        //when - 게시글 저장
        postingRepository.create(posting);

        // id값을 통해서 DB에서 저장한 포스팅 검색
        PostingResponseDto findPosting = postingRepository.getPosting(posting.getId()).orElseThrow(PostingNotFoundException::new);

        //then
        Assertions.assertEquals(posting.getId(), findPosting.getId());
    }

    /*
    * 전체 게시글 가져오는 테스트
    * getList()
    * */
    @Test
    void posting_getList_Test() {

        //when
        List<PostingResponseDto> findList = postingRepository.getList();

        //then
        Assertions.assertEquals(3, findList.size());
    }

    /*
    * 전체 게시글 + 페이징 테스트
    * getListPaging()
    * */
    @Test
    void getListPaging_Test() {
        //when
        PageRequest pageRequest = PageRequest.of(0, 3);
        Page<PostingResponseDto> listPaging = postingRepository.getListPaging(pageRequest);

        //then
        org.assertj.core.api.Assertions.assertThat(listPaging.getSize()).isEqualTo(3);
    }

    /*
    * 게시글 삭제 테스트
    * */
    @Test
    void delete_posting_Test() {

        //when
        postingRepository.delete_Posting(posting2.getId());
        List<PostingResponseDto> findList = postingRepository.getList();

        //then
        Assertions.assertEquals(2, findList.size());
    }
}
```
`@BeforeEach`를 통해서 테스트용 게시글을 미리 넣어두었다.