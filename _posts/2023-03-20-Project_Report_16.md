---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록16"
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
- 회원 정보 페이지 제작
    - 관련 엔티티 생성
        - 연관관계 매핑 코드 추가

<br>

# 이번에 해야할 목록

- RecordRepository 생성
- RecordService 코드 작성
    - RecordService Test code 작성
- PostingService 코드 수정
- RecordRepositoryCustom 생성
    - RecordRepositoryCustomImpl 생성 및 코드 작성
    - RecordRepositoryCustomImpl Test Code 작성
    
## RecordRepository

```java
public interface RecordRepository extends JpaRepository<Movie, Long> {

}
```
- 그동안 JPA, QueryDsl을 사용했기 때문에 이번에는 Spring Data JPA를 사용해봤다.
    - JpaRepository를 상속받아서 사용하는데, 기본적인 CRUD는 바로 사용할 수 있다.
- 회원 정보 페이지에서 사용하기 위한 영화 정보를 관리하는데 사용할 것이다.(CRUD)

## RecordService

```java
@Service
@Transactional
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepository recordRepository;
    private final UserRepository userRepository;

    /*
    * 사용자가 검색한 영화 정보를 DB에 저장
    * User Entity와 연관관계 매핑하여 어느 회원이 영화를 검색했는지 회원 정보를 같이 저장
    * */
    public Long saveMovie(String movie_title, User user) {

        Movie movie = new Movie(movie_title, userRepository.loadUserByUserId(user.getUserId()));
        recordRepository.save(movie);

        return movie.getId();
    }
}
```
- 파라미터로 넘어오는 User 엔티티의 userId를 통해서 User 엔티티를 찾는다.
    - 파라미터로 넘어오는 User 엔티티는 세션에서 가져온 값이다.
    - 세션에서 값을 가져오면 엔티티의 ID(PK)값이 들어가있지 않아서 다시 DB에서 찾는 과정을 진행했다.
- Movie 엔티티의 생성자를 통해서 영화의 제목과 User 엔티티를 묶어 저장했다.

### RecordServiceTest

RecordService Test Code 작성

```java
@SpringBootTest
@Transactional
@Slf4j
public class RecordServiceTest {

    @Autowired UserRepository userRepository;
    @Autowired RecordService recordService;
    @Autowired RecordRepository recordRepository;

    @Test
    void save() {
        //given
        User user1 = new User("홍길동", "aaa1223233", "aaaa1234@");
        User user2 = new User("홍김동", "aaa1234", "1221@");

        userRepository.save(user1);
        userRepository.save(user2);

        //when
        recordService.saveMovie("공조2", user1);
        recordService.saveMovie("공조1", user2);

        List<Movie> findMovie = recordRepository.findAll();
        //then
        Assertions.assertEquals(2, findMovie.size());
    }

    @Test
    void findById() {
        //given
        User user1 = new User("홍길동", "aaa1223233", "aaaa1234@");
        User user2 = new User("홍김동", "aaa1234", "1221@");

        userRepository.save(user1);
        userRepository.save(user2);

        //when
        Long saved_movie1 = recordService.saveMovie("공조2", user1);
        recordService.saveMovie("공조1", user2);

        //then
        Movie search_Movie = recordRepository.findById(saved_movie1).get();
        User search_User = search_Movie.getUser();

        Assertions.assertEquals("홍길동", search_User.getUserName());
    }
}
```
- 기본적으로 저장이 잘 되는지, 또한 값이 잘 들어가서 정상적인 값을 가져올 수 있는지 확인했다.

## PostingService - 수정

```java
    /*
    * 게시글 최초 저장
    * 생성된 id를 Controller로 반환
    * */
    public Long create_posting(PostingForm form, String userId) {
        Posting posting = new Posting(form.getTitle(), form.getContent(), form.getWriter(), form.getPassword(), 1, userRepository.loadUserByUserId(userId));
        return postingRepository.create(posting);
    }
```
- 기존과 다른점은 userId를 파라미터로 같이 넘겨주어 게시글을 저장할 때 회원 엔티티 값을 같이 저장한다.

## RecordRepositoryCustom 생성

```java
public interface RecordRepositoryCustom {

    List<Movie> searchMovieList(Long userId, int offset, int limit);

    List<Posting> searchPostingList(Long userId, int offset, int limit);
}
```
- 회원 정보 페이지에서 검색어와 게시글을 출력하기 위해 DB에서 정보를 가져오는 메소드.
- userId를 통해서 검색하며, 출력 개수를 제한하기 위해 파라미터로 offset과 limit가 들어간다.

## RecordRepositoryCustomImpl

Spring Data JPA를 사용했기 때문에 기능을 추가하기 위해서는 사용자 정의 Repository가 필요하다.

```java
@RequiredArgsConstructor
public class RecordRepositoryCustomImpl implements RecordRepositoryCustom{

    private final EntityManager em;

    @Override
    public List<Movie> searchMovieList(Long userId, int offset, int limit) {
        return em.createQuery("select m from Movie m" +
                               " where m.user.id =: userId" +
                               " order by m.createdDate desc", Movie.class)
                .setParameter("userId", userId)
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();
    }

    @Override
    public List<Posting> searchPostingList(Long userId, int offset, int limit) {
        return em.createQuery("select p from Posting p" +
                                " where p.user.id =: userId" +
                                " order by p.createdDate desc", Posting.class)
                .setParameter("userId", userId)
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();
    }
}
```
- 생성일자를 기준으로 내림차순하여 DB에서 가져온다.
    - 생성일자가 최신인것을 기준으로 원하는 개수만큼 자르기 위해.

### RecordRepository(+)

```java
public interface RecordRepository extends JpaRepository<Movie, Long>, RecordRepositoryCustom {
    
}
```
- RecordRepository에 RecordRepositoryCustom 추가 상속

## RecordRepositoryCustomImple Test

```java
@SpringBootTest
@Transactional
@Slf4j
public class RecordRepositoryCustomImplTest {

    @Autowired UserRepositoryImpl userRepository;
    @Autowired RecordService recordService;
    @Autowired RecordRepository recordRepositoryCustom;
    @Autowired PostingRepository postingRepository;
    /*
    * 회원 아이디를 통해 회원이 검색한 영화 제목 리스트를 가져오는 메서드 테스트
    * */
    @Test
    void searchMovieList_Test() {
        //given
        User user1 = new User("김길이", "abc123", "abcd1234@");
        User user2 = new User("김길삼", "zbc321", "abcd1234@");

        userRepository.save(user1);
        userRepository.save(user2);

        recordService.saveMovie("공조1", user1);
        recordService.saveMovie("공조2", user1);

        recordService.saveMovie("터미네이터1", user2);
        recordService.saveMovie("터미네이터2", user2);
        recordService.saveMovie("터미네이터3", user2);

        //when
        List<Movie> movies = recordRepositoryCustom.searchMovieList(user2.getId(), 0, 3);

        //then
        assertThat(movies)
                .extracting("movie_title")
                .containsExactly("터미네이터3", "터미네이터2", "터미네이터1");

        Assertions.assertEquals(3, movies.size());
    }

    /*
    * 회원 아이디를 통해 회원이 작성한 게시글 리스트를 가져오는 메서드 테스트
    * */
    @Test
    void searchPostingList_Test() {
        //given
        User user1 = new User("김길이", "abc123", "abcd1234@");
        User user2 = new User("김길삼", "zbc321", "abcd1234@");

        userRepository.save(user1);
        userRepository.save(user2);

        Posting posting1 = new Posting("테스트 게시글1", "내용입니다.", "김길이", "abcd1233", 1, user1);
        Posting posting2 = new Posting("테스트 게시글2", "내용입니다.", "김길이", "abcd1233", 1, user1);

        Posting posting3 = new Posting("테스트 게시글3", "내용입니다.", "김길삼", "abcd1233", 1, user2);
        Posting posting4 = new Posting("테스트 게시글4", "내용입니다.", "김길삼", "abcd1233", 1, user2);
        Posting posting5 = new Posting("테스트 게시글5", "내용입니다.", "김길삼", "abcd1233", 1, user2);

        postingRepository.create(posting1);
        postingRepository.create(posting2);
        postingRepository.create(posting3);
        postingRepository.create(posting4);
        postingRepository.create(posting5);

        //when
        List<Posting> postings = recordRepositoryCustom.searchPostingList(user2.getId(), 0, 3);

        //then
        assertThat(postings)
                .extracting("title")
                .containsExactly("테스트 게시글5","테스트 게시글4", "테스트 게시글3");

        Assertions.assertEquals(3, postings.size());
    }
}
```

<br>

# 정리

사용자 정의 Repository인 RecordRepositoryCustomImpl을 생성하여 DB에서 영화, 게시글 정보를 생성일자 기준 내림차순하여 가져올 수 있게 되었다.<br>
RecordService에서 이 데이터들을 가공하여 컨트롤러에 넘겨주면, 컨트롤러는 model을 통해 front단에 넘겨주어 출력만 잘 해주면 될 것 같다. 