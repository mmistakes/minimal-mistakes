---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록4"
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

- BaseTimeEntity 생성 완료
- User Entity 생성 완료
- UserRepositoryImpl, UserService를 통해서 DB에 저장되는지 Test Code로 확인.
- 중복 회원 검증
- 회원가입 관련 html thymeleaf 적용해서 동적인 코드로 변경
- 회원가입시 사용할 error code 생성
- 회원가입시 검증기를 통한 text 출력
- Controller 생성 후 연결해서 화면에서 확인

<br>

# 이번에 해야할 목록

- 로그인시 사용할 Dto 생성
- 로그인 Service 생성
- 로그인 Controller에서 로그인 처리
- 로그인 관련 HTML 동적인 코드로 변경(+오류 코드)

## LoginForm

로그인시 입력하는 값을 받는 DTO

```java
public class LoginForm {

    @NotEmpty(message = "아이디를 입력해주세요.")
    private String loginId;

    @NotEmpty(message = "비밀번호를 입력해주세요.")
    private String password;
```

## LoginService

`UserRepository`를 통해서 값을 가져온 뒤 비밀번호가 일치하는지 비교하는 비즈니스 로직

```java
public class LoginService {
    
    private final UserRepository userRepository;

    public FindUserDto login(String userId, String password) {

        FindUserDto findUser = userRepository.findByUserId(userId).orElseThrow(UserNotFoundException::new);

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if(encoder.matches(password, findUser.getPassword())) {
            return findUser;
        } else {
            throw new UserNotFoundException("비밀번호가 일치하지 않습니다.");
        }
    }
```
- `LoginForm`에서 입력받은 아이디와 패스워드를 통해서 일치하는 정보를 가져오고, 정보가 없으면 null을 리턴

## LoginController

```java
public class LoginController {

    private final LoginService loginService;

    @GetMapping("/login")
    public String loginForm(@ModelAttribute("loginForm") LoginForm form) {
        return "login/loginPage";
    }

    @PostMapping("/login")
    public String login(@Valid @ModelAttribute("loginForm") LoginForm form, BindingResult bindingResult,
                        HttpServletRequest request) {

        if(bindingResult.hasErrors()) {
            return "login/loginPage";
        }

        FindUserDto loginUser = loginService.login(form.getLoginId(), form.getPassword());
        log.info("loginUser = {}", loginUser);

        if(loginUser == null) {
            bindingResult.reject("loginFail", "아이디 또는 비밀번호가 일치하지 않습니다.");
            return "login/loginPage";
        }

        /*
        * 로그인 성공 로직
        * 세션이 있으면 세션 반환, 없으면 신규 세션 생성
        * */
        HttpSession session = request.getSession();
        User loginUser_entity = new User(loginUser.getUserName(), loginUser.getUserId(), loginUser.getPassword());

        // 세션에 로그인 회원 정보 보관
        session.setAttribute(SessionConst.LOGIN_USER, loginUser_entity);

        return "redirect:/";
    }

    /*
    * 로그아웃 로직
    * */
    @PostMapping("/logout")
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session != null) {
            session.invalidate();
        }

        return "redirect:/";
    }
```
- `bindingResult`에 값이 들어있으면 다시 로그인 페이지로 이동(로그인 실패)
- Service 로직을 통해서 값을 가져오는데 실패(null)하면 `bindingResult`에 오류 정보를 넣고, 다시 로그인 페이지로 이동
- 로그인에 성공하면 세션을 새로 생성한 뒤 메인 화면으로 다시 이동.
    - 추후에 로그인 성공시 무조건 메인화면이 아닌 이전 화면으로 가도록 수정할 것이다.
- 로그아웃은 세션을 가져온 뒤 무효화 시키도록 했다.

### SessionConst

```java
public class SessionConst {
    public static final String LOGIN_USER = "loginUser";
}
```
- 세션을 생성 또는 가져올 때 사용

## loginPage.html

```html
    <form th:action th:object="${loginForm}" method="post">
        <ul>
            <li>
                <input type="text" placeholder="아이디" th:field="*{loginId}" class="form-info"
                    th:errorclass="field-error">
                <div class="field-error" th:errors="*{loginId}"/>
            </li>
            <li>
                <input type="password" placeholder="비밀번호" th:field="*{password}" class="form-info"
                    th:errorclass="field-error">
                <div class="field-error" th:errors="*{password}"/>
            </li>
            <li>
                <div th:if="${#fields.hasGlobalErrors()}">
                    <p class="field-error" th:each="err : ${#fields.globalErrors()}"
                       th:text="${err}">오류 메시지</p>
                </div>
            </li>
            <li>
                <div class = "login_btn">
                    <input type="submit" value="로그인">
                </div>
            </li>
        </ul>
    </form>
```
- 필드 에러와 글로벌 에러(회원 정보 일치X) 처리

## 실제 확인

**어떤 값도 입력 안했을 때**<br>
![login1](/images/Project_Report/login1.png)

<br>

**DB에 저장된 회원 정보와 일치하지 않을 때**<br>
![login2](/images/Project_Report/login2.png)