---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록6"
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

<br>

# 이번에 해야할 목록

- 게시판 비즈니스 로직 구현
- 비즈니스 로직 테스트 코드 작성
- 컨트롤러 제작
- 게시판 html을 thymeleaf를 통해 동적인 코드로 수정
- 실제 실행 테스트

## 비즈니스 로직 구현

```java
@Service
@Transactional
@RequiredArgsConstructor
public class PostingService {

    private final PostingRepository postingRepository;

    /*
    * 게시글 최초 저장
    * 생성된 id를 Controller로 반환
    * */
    public Long create_posting(PostingForm form) {
        Posting posting = new Posting(form.getTitle(), form.getContent(), form.getWriter(), form.getPassword(), 1);
        Long posting_id = postingRepository.create(posting);
        return posting_id;
    }

    /*
    * 전체 게시글 조회
    * */
    public List<PostingResponseDto> get_postingList() {
        return postingRepository.getList();
    }
    
    /*
    * 전체 게시글 조회(페이징)
    * 커뮤니티 메인 페이지에 정렬(최대 15개)
    * */
    public Page<PostingResponseDto> getPosting_paging(Pageable pageable) {
        return postingRepository.getListPaging(pageable);
    }

    /*
    * 게시글 개수 조회
    * 게시글 번호 지정시 사용
    * */
    public Long getPostingCount() {
        return postingRepository.getPostingCount();
    }

    /*
    * 하나의 게시글 조회
    * 게시글에 들어갈 때 사용
    * */
    public PostingResponseDto get_posting(Long postingId) {
        return postingRepository.getPosting(postingId).orElseThrow(PostingNotFoundException::new);
    }

    /*
    * 사용자가 게시글 조회시 사용
    * 조회수 +1
    * */
    public void update_hits(Long postingId) {
        Posting findPosting = postingRepository.findPostingById(postingId);
        int hits = findPosting.getHits() + 1;
        findPosting.setHits(hits);
    }

    /*
    * ID로 게시글 조회 후 입력한 패스워드와 비교
    * 수정/삭제시 사용
    * 패스워드가 일치하지 않으면 null 반환
    * */
    public PostingResponseDto getPosting_password(Long postingId, String password) {
        PostingResponseDto findPosting = get_posting(postingId);
        if (!findPosting.getPassword().equals(password)) {
            return null;
        }
        return findPosting;
    }

    /*
    * ID로 게시글을 조회해서 가져온 뒤 수정
    * Dirty Checking
    * */
    public void update_posting(PostingModifyForm modifyForm) {
        Posting findPosting = postingRepository.findPostingById(modifyForm.getId());
        findPosting.updateContent(modifyForm.getContent());
    }

    /*
    * 게시글 삭제(PostingRequestDto)
    * */
    public void delete_posting(Long postingId) {
        postingRepository.delete_Posting(postingId);
    }
}
```
- `void update_hits()` : 게시글을 읽게 되면 현재 게시글을 호출하여 조회수에 +1을 실행해준다.
    - `posting`을 직접 조회하여 Dirty Checking을 이용해 수정값 저장
- `PostingResponseDto getPosting_password()`: 현재 들어와 있는 게시글의 id를 통해서 게시글을 조회한 후 사용자가 입력한 패스워드를 통해 일치 여부를 파악.
    - 일치 한다면 조회한 게시글의 정보를 반환, 일치하지 않으면 `null`반환
- `void update_posting()`: 수정 내용을 적용할 로직.(글 내용만 수정 가능)

## PostingService Test Code

```java
@SpringBootTest
@Transactional
public class PostingServiceTest {

    @Autowired PostingService postingService;
    @Autowired PostingRepository postingRepository;

    Posting posting1;
    Posting posting2;
    Posting posting3;

    /*
     * 테스트시 사용할 초기값 미리 넣어 두기
     * */
    @BeforeEach
    public void init() {
        posting1 = new Posting("게시글1", "안녕하세요. 홍길동 입니다.", "홍길동","1234", 1);
        posting2 = new Posting("게시글2", "안녕하세요. 고길동 입니다.", "고길동","1234", 1);
        posting3 = new Posting("게시글3", "안녕하세요. 김길이 입니다.", "김길이","1234", 1);

        postingRepository.create(posting1);
        postingRepository.create(posting2);
        postingRepository.create(posting3);
    }

    /*
    * 게시글 저장 테스트
    * */
    @Test
    void create_posting_Test() {
        //given
        PostingForm form = new PostingForm("최초 생성 게시글", "안녕하세요.", "시금치", "aaaa1234@");
        //when
        Long postingId = postingService.create_posting(form);
        //then
        PostingResponseDto findPosting = postingRepository.getPosting(postingId).orElseThrow(PostingNotFoundException::new);
        Assertions.assertEquals("시금치", findPosting.getWriter());
    }

    /*
    * 전체 게시글 조회 테스트
    * */
    @Test
    void get_postingList_Test() {
        //when
        List<PostingResponseDto> postingList = postingService.get_postingList();
        //then
        Assertions.assertEquals(3, postingList.size());
    }

    /*
     * 하나의 게시글 조회 테스트
     * */
    @Test
    void get_posting_Test() {
        //when
        Long postingId = posting2.getId();
        PostingResponseDto posting = postingService.get_posting(postingId);
        //then
        Assertions.assertEquals("게시글2", posting.getTitle());
    }

    /*
     * 게시글 수정 테스트
     * */
    @Test
    void update_posting_Test() {
        //given
        PostingModifyForm modifyForm = new PostingModifyForm(posting3.getId(), "수정된 내용입니다.");
        //when
        postingService.update_posting(modifyForm);

        //then
        PostingResponseDto findPosting = postingRepository.getPosting(posting3.getId()).orElseThrow(PostingNotFoundException::new);
        Assertions.assertEquals("수정된 내용입니다.", findPosting.getContent());
    }
    
    /*
    * 게시글 조회수 추가 테스트
    * */
    @Test
    void update_postingHits_Test() {
        //when
        postingService.update_hits(posting3.getId());
        //then
        Assertions.assertEquals(2, posting3.getHits());
    }
}
```

## 컨트롤러 제작

```java
/*
* 2022-10-06
* 커뮤니티 관련 컨트롤러
* */
@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/community")
public class PostingController {

    private final PostingService postingService;

    @GetMapping("/list")
    public String postingList(Model model, HttpServletRequest request,
                              @PageableDefault(page = 0, size = 15)Pageable pageable) {

        Page<PostingResponseDto> postingList = postingService.getPosting_paging(pageable);
        int currentPage = postingList.getPageable().getPageNumber()+1;
        int startPage = 1;
        int endPage = postingList.getTotalPages();

        Long totalPostingCount = postingService.getPostingCount();
        log.info("totalPostingCount = {}", totalPostingCount);

        model.addAttribute("postingList", postingList);
        model.addAttribute("currentPage", currentPage);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);
        model.addAttribute("totalPostingCount", totalPostingCount); // 전체 게시글 수

        return "community/communityPage";
    }

    @GetMapping("/write")
    public String writePosting_form(@ModelAttribute("postingForm") PostingForm form) {
        return "community/communityWritePage";
    }

    @PostMapping("/write")
    public String writePosting(@Valid @ModelAttribute("postingForm") PostingForm form, BindingResult bindingResult,
                               HttpServletRequest request){

        /*
        * 글 작성시에 문제가 있을 시 팝업을 띄우고, 다시 글 작성 창 띄워주기
        * */
        if(bindingResult.hasErrors()) {
            return "community/communityWritePage";
        }
        
        /*
        * 문제 없을 시 request, session을 통해서 회원 이름을 조회하고 저장 메소드로 값을 넘겨줌
        * */
        User session_user = LoginSessionCheck.check_loginUser(request);
        String userName = session_user.getUserName();
        log.info("Find UserName = {}", userName);

        // PostingForm에 Session에서 가져온 작성자 입력
        form.setWriter(userName);

        Long postingId = postingService.create_posting(form);

        // 글 생성이 완료되면 읽기 페이지로 이동
        String redirectUrl = "/community/" + postingId + "/read";
        return "redirect:" + redirectUrl;
    }

    /*
    * 게시글 읽어오기
    * */
    @GetMapping("/{postingId}/read")
    public String readPostingForm(@PathVariable("postingId") Long postingId, @ModelAttribute("postingPasswordForm") PostingPassword postingPassword, Model model) {

        // postingId를 통해서 posting 조회 후 html에 posting 정보를 뿌려준다.
        PostingResponseDto posting = postingService.get_posting(postingId);
        model.addAttribute("posting", posting);

        // 게시글 읽어올 때 조회수 + 1
        postingService.update_hits(postingId);

        return "community/communityReadPage";
    }

    @PostMapping("/{postingId}/read")
    public String readPosting(@PathVariable("postingId") Long postingId, @Validated @ModelAttribute("postingPasswordForm") PostingPassword postingPassword, BindingResult bindingResult
                                , Model model) {
        PostingResponseDto posting = postingService.get_posting(postingId);

        if(bindingResult.hasErrors()) {
            log.info("readPosting-post bindingResult() 실행");
            model.addAttribute("posting", posting);
            return "community/communityReadPage";
        }

        /*
         * 필드에 오류가 없을 시
         * getPosting_password()에 패스워드를 보내서 Service 로직에서 비교 후 결과 반환
         * */
        log.info("패스워드 확인 getPosting_password");
        PostingResponseDto check_posting = postingService.getPosting_password(postingId, postingPassword.getPassword());
        if(check_posting == null) {
            bindingResult.reject("modifyFail", "비밀번호가 일치하지 않습니다.");
            model.addAttribute("posting", posting);
            return "community/communityReadPage";
        }
        
        // 글 수정/삭제 화면으로 이동
        return "redirect:/community/" + postingId + "/modify";
    }

    /*
    * 게시글 수정, 삭제 form
    * 수정 관련 로직
    * */
    @GetMapping("/{postingId}/modify")
    public String modifyPostingForm(@PathVariable("postingId") Long postingId, Model model) {
        PostingResponseDto posting = postingService.get_posting(postingId);
        model.addAttribute("posting", posting);
        /*
        * 글 내용만 model에 따로 담아서 전달
        * @PostMapping의 @ModelAttribute와 이름 동일
        * */
        PostingModifyForm postingModifyForm = new PostingModifyForm(postingId, posting.getContent());
        model.addAttribute("postingModifyForm", postingModifyForm);

        return "community/communityModifyPage";
    }

    @PostMapping("/{postingId}/modify")
    public String modifyPosting(@PathVariable("postingId") Long postingId, @Valid @ModelAttribute("postingModifyForm") PostingModifyForm postingModifyForm,
                                BindingResult bindingResult, Model model) {
        /*
         * 수정 시 문제 발생 시 오류 코드를 출력하고, 다시 입력
         * get_posting()을 통해서 posting정보를 가져와 model에 담아서 다시 수정 페이지로 보내준다.
         * 기존 작성되어 있던 제목, 작성자를 유지하기 위해
         * */
        if(bindingResult.hasErrors()) {
            PostingResponseDto posting = postingService.get_posting(postingId);
            log.info("modify bindingResult() 실행");
            model.addAttribute("posting", posting);
            return "community/communityModifyPage";
        }

        /*
        * 수정 성공시 결과를 DB에 반영하고 포스팅 읽기 페이지로 리다이렉트
        * PostingModifyForm에 id값을 넣어서 비즈니스 로직으로 전달
        * */
        PostingModifyForm modifyForm = new PostingModifyForm(postingId, postingModifyForm.getContent());
        postingService.update_posting(modifyForm);

        String redirectUrl = "/community/" + postingId + "/read";

        return "redirect:" + redirectUrl;
    }

    /*
    * 게시글 삭제
    * */
    @GetMapping("/{postingId}/delete")
    public String deletePosting(@PathVariable("postingId") Long postingId, Model model) {

        postingService.delete_posting(postingId);

        model.addAttribute("data", new Message("게시글이 삭제되었습니다.", "/community/list"));
        // 삭제 후 리스트 화면으로 이동
        return "redirect:/community/list";
    }
```
- `@GetMapping("/list")`
    - `@PageableDefault(page = 0, size = 15)Pageable pageable`
        - Pageable 값 설정
        - 시작 페이지는 0(0부터 시작)
        - 한 페이지당 가져올 게시글의 개수 : 15
    - `currentPage`
        - 현재 페이지
        - 페이지 번호를 가져와서 + 1
    - `startPage`
        - 시작페이지(원래는 0시작이지만 편의상 1로 시작하도록)
    - `endPage`
        - 가져온 전체 리스트의 총 페이지 수가 곧 마지막 페이지
- `@PostMapping("/{postingId}/read")`
    - 사용자가 입력한 패스워드와 게시글의 패스워드 일치 여부 판단.
    - 일치하면 수정/삭제 페이지로 이동, 일치하지 않으면 bindingResult에 값을 넣어서 다시 읽기 페이지로

- `@GetMapping("/{postingId}/modify")`
    - 게시글을 수정할 때 현재 작성되어 있는 내용을 가져오기 위해서 `PostingModifyForm`생성자에 내용을 넣고, model을 통해서 넘겨주었다.

## 게시판 화면단 수정

### 게시판 리스트 화면

```html
...(생략)
<div class = "intro_text">게시판</div>
<div class = "function_form">
    <div class = "create_btn">
        <a th:href="@{/community/write}">글 쓰기</a>
    </div>
</div>
<div class = "table_form">
<table>
    <thead>
    <tr>
        <th>No.</th>
        <th>제목</th>
        <th>글쓴이</th>
        <th>조회수</th>
    </tr>
    </thead>
    <tbody>
    <tr th:each="posting : ${postingList}">
        <td th:text="${posting.id}"></td>
        <td>
            <a th:text="${posting.title}" th:href="@{/community/{id}/read (id=${posting.id})}"></a>
        </td>
        <td th:text="${posting.writer}"></td>
        <td th:text="${posting.hits}"></td>
    </tr>
    </tbody>
</table>
</div>
<div class = "number">
    <th:block th:each="page:${#numbers.sequence(startPage, endPage)}">
        <a th:if="${page != currentPage}" th:href="@{/community/list(page=${page -1})}"
           th:text="${page}"></a>
        <strong th:if="${page == currentPage}" th:text="${page}" style="color:red"></strong>
    </th:block>
</div>
```
- 컨트롤러에서 넘겨준 페이징된 `postingList`를 `th:each`를 사용해 하나씩 출력.
    - 제목은 누르면 해당 게시글로 이동할 수 있도록 링크를 걸어두었다.
- 컨트롤러에서 넘겨준 페이징 정보를 통해서 페이지 아래에 동적으로 페이징 처리를 했다.
    - strong을 통해 현재 페이지에 색을 주어서 현재 페이지가 어딘지 표시했다.

### 게시글 읽기 화면

```html
...(생략)
<form th:action th:object="${postingPasswordForm}" method="post">
    <table class = "contents">
        <tr>
            <th scope="row">제목</th>
            <td th:text="${posting.title}"></td>
        </tr>
        <tr>
            <th scope="row">글쓴이</th>
            <td th:text="${posting.writer}"></td>
        </tr>
        <tr>
            <th scope="row">조회수</th>
            <td th:text="${posting.hits}"></td>
        </tr>
        <tr class="content">
            <th scope="row">내용</th>
            <td th:text="${posting.content}"></td>
        </tr>
    </table>

    <div class="check_password">
        비밀번호 : <input type="password" name="check_password" class="info_form" th:field="*{password}"
                th:errorclass="field-error">
        <div class="field-error" th:errors="*{password}"></div>
    </div>

    <div th:if="${#fields.hasGlobalErrors()}">
        <p class="field-error" th:each="err : ${#fields.globalErrors()}"
           th:text="${err}">오류 메시지</p>
    </div>

    <div class = "btn_form">
        <div class = "modify_btn">
            <input type="submit" value="수정/삭제">
        </div>

        <div class = "back_btn">
            <a th:href="@{/community/list}">뒤로 가기</a>
        </div>
    </div>
</form>
```

### 게시글 작성 화면


```html
...(생략)
<div class = "intro_text">글 쓰기</div>
    <form th:action th:object="${postingForm}" method="post">
        <table class = "contents">
            <tr>
                <th scope="row">제목</th>
                <td class="title_write">
                    <input type="text" th:field="*{title}" class="info_form">
                </td>
            </tr>
            <tr class="content">
                <th scope="row">내용</th>
                <td id="write"><textarea th:field="*{content}" class="info_form"></textarea></td>
            </tr>
        </table>

        <div th:if="${#fields.hasErrors()}">
            <p class="field-error" th:each="err : ${#fields.errors()}"
               th:text="${err}">오류 메시지</p>
        </div>

        <div class="check_password">
            비밀번호 : <input th:field="*{password}" type="password">
        </div>

        <div class = "btn_form">
            <div class = "write_btn">
                <input type="submit" value="저장">
            </div>
    
            <div class = "cancel_btn">
                <a th:href="@{/community/list}">취소</a>
            </div>
        </div>
    </form>
</div>
```

### 게시글 수정 화면

```html
<div class = "intro_text">글 수정</div>
    <form th:action th:object="${postingModifyForm}" method="post">
        <table class = "contents">
            <tr>
                <th scope="row">제목</th>
                <td class="read" th:text="${posting.title}"></td>
            </tr>
            <tr>
                <th scope="row">글쓴이</th>
                <td class="read" th:text="${posting.writer}"></td>
            </tr>
            <tr class="content">
                <th scope="row">내용</th>
                <td class="write"><textarea th:field="*{content}" class="info_form"></textarea></td>
            </tr>
        </table>

        <div th:if="${#fields.hasErrors()}">
            <p class="field-error" th:each="err : ${#fields.errors()}"
               th:text="${err}">오류 메시지</p>
        </div>

        <div class = "btn_form">
            <div class = "modify_btn">
                <input type="submit" value="수정완료">
            </div>

            <div class = "delete_btn">
                <a th:href="@{/community/{id}/delete (id=${posting.id})}">삭제 하기</a>
            </div>

            <div class = "cancel_btn">
                <a th:href="@{/community/{id}/read (id=${posting.id})}">취소</a>
            </div>
        </div>
    </form>
</div>
```

## 실행 테스트

### 게시글 작성 페이지

![community_write](/images/Project_Report/community_write.png)

### 게시글 읽기 페이지

![community_read](/images/Project_Report/community_read.png)

### 게시글 수정/삭제 페이지

![community_modify](/images/Project_Report/community_modify.png)