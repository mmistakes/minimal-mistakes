---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록17"
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
    - RecordRepository 생성
    - RecordService 코드 작성
        - RecordService Test code 작성
    - PostingService 코드 수정
    - RecordRepositoryCustom 생성
        - RecordRepositoryCustomImpl 생성 및 코드 작성
        - RecordRepositoryCustomImpl Test Code 작성

<br>

# 이번에 해야할 목록

- RecordService 코드 추가
    - RecordService Test Code 추가
- MemberInfoController 생성 및 코드 작성
- Popup창 제작

## RecordService(+)

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
    
    /*
    * 사용자가 검색한 영화 정보 기록을 가져온다.
    * 영화의 제목만 화면에 뿌려줄 예정이기 때문에 List에 제목만 담아서 반환
    * */
    public List<String> getMovieList(User user) {

        User findUser = userRepository.loadUserByUserId(user.getUserId());
        List<Movie> movies = recordRepository.searchMovieList(findUser.getId(), 0, 10);
        
        List<String> list = new ArrayList<>();
        // 검색 목록에서 중복되는 영화 제목은 하나만 출력
        for (Movie movie : movies) {
            if (!list.contains(movie.getMovie_title()))
                list.add(movie.getMovie_title());

            if (list.size() > 4)
                break;
        }

        return list;
    }

    /*
     * 사용자가 작성한 게시글 정보 기록을 가져온다.
     * 게시글의 제목과, 게시글의 id만 담아서 리턴
     * 게시글의 id는 사용자 정보에서 게시글로 href를 통해 바로 이동할 때 사용
     * */
    public List<RecordPostingDto> getPostingList(User user) {

        User findUser = userRepository.loadUserByUserId(user.getUserId());

        List<Posting> postings = recordRepository.searchPostingList(findUser.getId(), 0, 5);

        return postings.stream().map(p -> new RecordPostingDto(p.getId(), p.getTitle())).collect(Collectors.toList());

    }

    public List<Movie> findMovieRecord(LocalDateTime aWeekAgo) {
        return recordRepository.findByCreatedDateLessThan(aWeekAgo);
    }

    public void deleteMovieRecord(Movie movie) {
        recordRepository.delete(movie);
    }
}
```
- `getMovieList()`, `getPostingList()`를 추가했다.
- 각각 User Entity를 통해 영화 검색어와 작성한 게시글을 List로 가져오는 메소드이다.
- `getMovieList()`
    - 페이징을 통해 10개까지만 가져오는걸로 제한.
    - 영화 검색어를 list로 받아온 뒤에 새로운 list에 값을 넣는다.(중복 제거)
    - list의 사이즈가 5가 되면 반복문을 종료.(사이즈를 5로 고정)

- `getPostingList()`
    - 페이징을 통해 5개까지만 가져온다.
    - Posting Entity의 정보에서 게시글 id(pk)와 제목만 필요.(id값은 클릭하면 href를 통해서 게시글로 이동하기 위함)
    - `RecordPostingDto`에 값을 넣어서 return

### RecordPostingDto

```java
@Getter
@AllArgsConstructor
public class RecordPostingDto {

    private Long postingId;
    private String postingTitle;
}
```

### RecordServiceTest(+)

```java
@SpringBootTest
@Transactional
@Slf4j
public class RecordServiceTest {

    @Autowired UserRepository userRepository;
    @Autowired PostingRepository postingRepository;
    @Autowired RecordService recordService;
    @Autowired RecordRepository recordRepository;

    (...)

    @Test
    void getMovieList_Test() {
        //given
        User user1 = new User("홍김동", "aaa1234", "1221@");
        userRepository.save(user1);


        recordService.saveMovie("터미네이터1", user1);
        recordService.saveMovie("터미네이터2", user1);
        recordService.saveMovie("터미네이터3", user1);

        //when
        List<String> movieList = recordService.getMovieList(user1);

        //then
        for(String movie : movieList) {
            log.info("movie_title = {}", movie);
        }

        Assertions.assertEquals(3, movieList.size());
    }

    @Test
    void getPostingList_Test() {
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
        List<RecordPostingDto> postingList = recordService.getPostingList(user2);

        //then
        for(RecordPostingDto posting : postingList) {
            log.info("#posting id = {}", posting.getPostingId());
            log.info("#posting title = {}", posting.getPostingTitle());
        }

        Assertions.assertEquals(3, postingList.size());
    }
}
```
- RecordService의 `getMovieList()`, `getPostingList()` Test Code

## MemberInfoController

```java
@Controller
@RequiredArgsConstructor
@RequestMapping("/memberInfo")
@Slf4j
public class MemberInfoController {

    private final RecordService recordService;
    private final UserService userService;

    /*
     * 회원 정보 화면
     * 넘겨주는 model 값
     *   - Session에서 가져온 회원 정보
     *   - 사용자가 검색한 영화 제목 List
     *   - 사용자가 작성한 게시글 List
     * */
    @GetMapping
    public String memberInfoPage(Model model, HttpServletRequest request) {

        User session_user = LoginSessionCheck.check_loginUser(request);

        List<String> movieList = recordService.getMovieList(session_user);
        List<RecordPostingDto> postingList = recordService.getPostingList(session_user);

        model.addAttribute("user", session_user);
        model.addAttribute("movies", movieList);
        model.addAttribute("postings", postingList);

        return "main/memberInfoPage";
    }

    @GetMapping("/popup")
    public String deletePopup(@ModelAttribute("checkPassword")CheckPasswordDto dto) {
        return "alert/deleteMember_popUp_Page";
    }
}
```
- `RecordService`를 통해서 받아오는 영화, 게시글의 리스트를 model을 통해 front단에 넘겨준다.
- `/memberInfo/popup`을 통해 회원탈퇴 팝업창을 띄운다.

## Popup창 제작

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
            
            <form th:method="delete" th:action="@{/memberInfo/popup}" th:object="${checkPassword}">
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

## MemberInfoController(+)

```java
@Controller
@RequiredArgsConstructor
@RequestMapping("/memberInfo")
@Slf4j
public class MemberInfoController {

    private final RecordService recordService;
    private final UserService userService;

    (...)

    @GetMapping("/popup")
    public String deletePopup(@ModelAttribute("checkPassword")CheckPasswordDto dto) {
        return "alert/deleteMember_popUp_Page";
    }

    /*
    * 팝업창에서 진행하는 회원탈퇴 처리 로직
    * */
    @DeleteMapping("/popup")
    public String membership_withdrawal(@ModelAttribute("checkPassword") CheckPasswordDto passwordDto, HttpServletRequest request,
                                        BindingResult bindingResult, Model model) {
        User session_user = LoginSessionCheck.check_loginUser(request);

        /*
        * 회원 탈퇴 로직
        * 성공하면 true
        * 실패하면 false
        * */
        Boolean check_password = userService.membership_withdrawal_pass(session_user, passwordDto.getPassword());

        if (check_password) {
            HttpSession session = request.getSession(false);
            session.invalidate(); // 세션의 정보를 모두 삭제(로그인 회원 정보)
            
            model.addAttribute("data", new Message("회원 탈퇴가 완료되었습니다.", "/"));
            return "alert/message";
        }

        bindingResult.reject("withdrawFail", "비밀번호가 일치하지 않습니다.");
        model.addAttribute("checkPassword", passwordDto);
        return "alert/deleteMember_popUp_Page";
    }
}
```
- UserService의 `membership_withdrawal_pass`메소드를 통해서 사용자가 입력한 패스워드가 회원의 패스워드와 일치한지 체크
- 일치한다면 세션 정보를 삭제하고, message창을 통해 회원탈퇴가 완료 되었음을 알림.
- 실패시 팝업창 내에 오류 메시지를 출력하고, 다시 팝업창을 리턴.

>**[참고]** <br>
DELETE, PUT 메소드를 사용하기 위해서는 application.properties에 다음 코드를 추가해줘야 한다.

```properties
# thymeleaf에서 PUT,DELETE 메소드 사용 허용
spring.mvc.hiddenmethod.filter.enabled=true
```

## UserService(+)

```java
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    
    (...)

    /*
    * 회원 탈퇴시 패스워드 확인 - 인코딩된 패스워드가 입력한 패스워드와 일치하는지 확인
    *
    * */
    public Boolean membership_withdrawal_pass(User sessionUser, String input_password) {

        if(bCryptPasswordEncoder.matches(input_password, sessionUser.getPassword())) {
            /*
             * session에서 찾은 sessionUser는 id(PK)값이 없다.
             * 그래서 sessionUser.getUserId()를 통해서 다시 값을 조회해서 PK값이 포함된 완전한 user의 값을 가져온다.
             * */
            User user = userRepository.loadUserByUserId(sessionUser.getUserId());
            userRepository.deleteUser(user);
            return true;
        }
        return false;
    }
}
```
- 기존 DB에 패스워드를 저장할 때 인코딩되어 있기 때문에 사용자가 입력한 값과 매치하는지 `bCryptPasswordEncoder`를 통해 확인
- 일치한다면 회원 정보 삭제를 진행하고, true 리턴
- 일치하지 않다면 false를 리턴

### UserService Test Code(+)

```java
@SpringBootTest
@Transactional
public class UserServiceTest {

    @Autowired UserService userService;
    @Autowired UserRepository userRepository;

    (...)

    @Test
    void membership_withdrawal_pass_Test() {
        //given
        User user = new User("김길이", "kingill4223", "abcd1234@");
        userRepository.save(user);

        //when
        Boolean delete_result = userService.membership_withdrawal_pass(user, "abcd1234@");

        //then
        Assertions.assertEquals(true, delete_result);
    }
}
```

## 최종 화면

![memberInfoPage](/images/Project_Report/memberInfoPage.png)

<br>

![memberInfoPage_popup](/images/Project_Report/memberInfoPage_popup.png)

<br>

# 정리

사실 영화 외에도 식당이나 책 등등 많은 소재로 비교하고 싶지만, 우선 현재 상황상 영화까지만 제작하고, 나중에 취업하고 시간있으면 계속 채워갈 생각이다.<br>
이제 할 일은 게시글은 회원이 직접 삭제하거나, 회원 정보 자체가 삭제되면 같이 삭제되지만, 영화검색어는 그렇지 않다.<br>
따라서, 일정 기간이 지나면 DB에 저장된 영화 검색어를 자동으로 삭제하도록 하는 기능을 추가해야 하며, H2 DB에서 MySQL로 변경만 하면 된다.