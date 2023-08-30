---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록14"
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

<br>

# 이번에 해야할 목록

- 메시지 알림창(alert) 기능을 위한 message.html 제작
    - 게시글 삭제시에 적용
    - 회원 가입시 사용
        - 회원 가입 실패에 대한 예외 처리

## message.html

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <script th:inline="javascript">
    /*<![CDATA[*/
        var message = [[${data.message}]]
        alert(message);

        if(message == "회원 탈퇴가 완료되었습니다."){

            window.self.close();
            window.opener.location.replace([[${data.href}]]);
        }
        location.replace([[${data.href}]]);
    /*]]>*/
</script>
</head>
</html>
```
- 각 컨트롤러에서 model을 통해 출력할 메시지와 redirect할 링크를 넘겨준다.
- 회원 탈퇴는 예외적으로 따로 진행
    - 회원 탈퇴는 따로 팝업창을 띄워서 진행하게 되는데, 확인 버튼을 누르면 팝업창이 닫히고 메인창이 지정된 링크로 이동해야 한다.
    - `window.self.close();`는 현재 페이지를 닫는다.
    - `window.opener.location.replace()`는 부모창(메인창)에서 지정된 링크로 이동하기 위해 작성한 코드이다.(Redirect)
        - `window`인터페이스의 `opener` 속성은 `open()`을 사용해 현재 창을 열었던 창의 참조를 반환.(부모창)

## alert 적용

### PostingController

```java
    /*
    * 게시글 삭제
    * */
    @GetMapping("/{postingId}/delete")
    public String deletePosting(@PathVariable("postingId") Long postingId, Model model) {

        postingService.delete_posting(postingId);

        model.addAttribute("data", new Message("게시글이 삭제되었습니다.", "/community/list"));
        // 삭제 후 리스트 화면으로 이동
        return "alert/message";
    }
```
- 기존에는 컨트롤러에서 바로 redirect를 선언해서 게시글이 삭제됨과 동시에 게시글이 제대로 삭제된건지 영문도 모른체 이동했다.
- 리턴값을 `message.html`으로 변경함으로서, 삭제 완료 메시지 알림이 뜨게 된다.

### UserService

```java
    public Long join(JoinForm form) throws JoinFailException{

        validateDuplicateUser(form);    // 중복 회원 검증

        /*
        * 중복 확인이 끝나면, User Entity로 변환해서 DB에 저장
        * 회원으로 가입하기 때문에 ROLE_USER
        * 패스워드 암호화
        * */
        String encodePassword = bCryptPasswordEncoder.encode(form.getPassword());

        User user = new User(form.getUserName(), form.getUserId(), encodePassword, Role.ROLE_USER);
        userRepository.save(user);
        return user.getId();
    }

    /*
    * 회원가입시 입력한 아이디와 DB에 입력된 아이디 값을 비교해서 중복 회원가입인지 확인
    * */
    private void validateDuplicateUser(JoinForm form) throws JoinFailException {
        Optional<FindUserDto> findUser = userRepository.findByUserId(form.getUserId());
        if(!findUser.isEmpty()) {
            throw new JoinFailException("이미 존재하는 회원입니다.");
        }
    }
```
- 기존에는 회원가입에 실패하면 `IllegalStateException` 예외를 던졌지만, 회원 가입에 대한 예외를 따로 추가했다.
- `JoinFailException`은 런타임 에러이기 때문에 `throws`로 던지지 않아도 되지만, 발생한 에러를 놓치는 일이 생기지 않도록 선언했다.

#### JoinFailException

```java
public class JoinFailException extends RuntimeException{

    public JoinFailException() {
        super();
    }

    public JoinFailException(String message) {
        super(message);
    }

    public JoinFailException(String message, Throwable cause) {
        super(message, cause);
    }

    public JoinFailException(Throwable cause) {
        super(cause);
    }

    protected JoinFailException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
```

### JoinController

```java
    @PostMapping("/join")
    public String join(@Validated(ValidationSequence.class) @ModelAttribute("joinForm") JoinForm form, BindingResult bindingResult,
                       Model model) {

        if(!form.getPassword().equals(form.getCheck_password())) {
            bindingResult.rejectValue("password", "NotEquals");
            bindingResult.rejectValue("check_password", "NotEquals");
            return "login/joinPage";
        }

        if(bindingResult.hasErrors()) {
            return "login/joinPage";
        }

        /*
         * 회원 가입
         * */
        try {
            userService.join(form);
        } catch(JoinFailException e) {
            model.addAttribute("data", new Message("이미 존재하는 회원입니다.", "/join"));
            return "alert/message";
        }

        model.addAttribute("data", new Message("회원 가입이 완료되었습니다.", "/login"));
        return "alert/message";
    }
```
- 회원가입시 1차, 2차 비밀번호가 서로 맞지않으면 필드에러를 넣고 다시 회원가입 페이지로 리턴.
- `userService.join()`이 실패하면, 발생하는 `JoinFailException` 예외를 잡아서 처리.
- 문제 없이 회원가입에 성공하면 `message.html`을 리턴함으로써 회원가입이 완료된걸 사용자에게 알림

<br>

# 정리

사용자 입장에서 불편했던 점을 고려해, 해당 동작이 정상적으로 완료되었는지 알려주는 기능을 추가하기 위해 `message.html`을 추가했다.<br>
그래서 기존에 해당 기능이 필요했던 게시글 삭제, 회원가입 완료 등 필요한 곳에 기능을 추가했다.<br>
또한, 회원가입 부분에 대한 예외를 따로 만들어서 명확하게 회원가입 에러를 잡을 수 있게 수정하였고, 검증에 대한 부분을 조금 추가했다.(bindingResult 부분)