---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록7"
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

<br>

# 이번에 해야할 목록

- 로그인된 사용자만 특정 사이트에 들어갈 수 있도록 인터셉터 제작
- 오류 페이지 적용
- 로그인 후 모든 페이지에서 사용자가 로그인된 상태인 것을 인지할 수 있도록 로직 수정

## LoginCheckInterceptor

기존에는 로그인을 하지 않아도, 게시글 작성, 수정 등 모든 곳에 접근할 수 있었다.<br>
처음에는 Spring Security로 제작했지만 생각했던대로 동작하지 않아서 시간을 많이 보내버렸다.<br>
구조까지 얼추 공부했지만 생각대로 구현이 잘 되지 않아서 일단 인터셉터로 구현을 해 놓기로 했다.<br>
스프링 인터셉터도 서블릿 필터와 마찬가지로 웹 관련 공통 관심 사항을 효과적으로 해결할 수 있는 기술이지만, 서블릿 필터는 서블릿이 제공하는 기술이고, 스프링 인터셉터는 스프링 MVC가 제공하는 기술이다.<br>
또한, 적용되는 순서와 범위, 사용법이 다르다.
<br>

**흐름**
```
HTTP 요청 -> WAS -> 필터 -> 서블릿 -> 스프링 인터셉터 -> 컨트롤러
```

**제한**
```
HTTP 요청 -> WAS -> 필터 -> 서블릿 -> 스프링 인터셉터 -> 컨트롤러 //로그인 사용자
HTTP 요청 -> WAS -> 필터 -> 서블릿 -> 스프링 인터셉터(적절하지 않은 요청, 컨트롤러 호출X) // 비 로그인 사용자
```

**체인**
```
HTTP 요청 -> WAS -> 필터 -> 서블릿 -> 인터셉터1 -> 인터셉터2 -> 컨트롤러
```

>더 자세한 내용은 해당 포스팅 참고 : 
[스프링 인터셉터](https://kangtaegong.github.io/spring_mvc/springmvc-21/)

```java
public class LoginCheckInterceptor implements HandlerInterceptor {
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();

        HttpSession session = request.getSession(false);
        
        if(session == null || session.getAttribute(SessionConst.LOGIN_USER) == null) {

            /*
            * 인증이 필요한 페이지를 URL로 직접 접근시 LoginForm으로 이동
            * requestURI를 넘겨줌으로 써 로그인이 완료되면 직전에 보고 있던 화면으로 redirect
            * 게시글 수정, 삭제를 강제로 접근시 LoginForm으로 이동하고, 인증이 완료되면 게시판 list로 이동
            * */
            if(requestURI.contains("/modify") || requestURI.contains("/delete")) {
                response.sendRedirect("/login?redirectURI=" + "/community/list");
                return false;
            }
            response.sendRedirect("/login?redirectURI=" + requestURI);
            return false;
        }

        // 로그인 이후에 강제로 접속 시 list화면으로 내보냄
        if(requestURI.contains("/modify") || requestURI.contains("/delete")) {
            if (PostingController.check_posting == null) {
                response.sendRedirect("/community/list");
                return false;
            }

        }
        return true;
    }
}
```
- 우선 `request.getSession(false)`를 통해서 세션이 존재하면 가져온다.
- 가져온 세션의 존재 여부를 파악해서 존재하면 그대로 `return true`, 존재하지 않으면 미인증 사용자 요청이므로 if문 조건에 부합하게 된다.
- 접근한 페이지가 게시글 수정/삭제 페이지라면 로그인 화면으로 리다이렉트 시키고, 이때 게시판 메인 페이지 URI를 파라미터로 같이 넘겨준다.
- 실제 테스트를 해보니 로그인된 사용자지만 URI를 조작해서 다른 사람의 게시글의 수정/삭제 페이지로 들어갈 수 있었다.
    - 그리하여  `check_posting` 변수를 만들고, 이를 통해 실제로 게시글 비밀번호 인증을 통해 접근하는 것인지 확인.
    - 만약 `check_posting` 값이 `null`이라면 인증하지 않은 사용자이기 때문에 게시판 메인 페이지로 이동시킨다.

- 그 외의 인증이 필요한 페이지에 접근시 마찬가지로 로그인 화면으로 리다이렉트 시키고, 파라미터는 현재 접근한 URI정보를 넘겨준다.(로그인이 완료되면 접근 페이지로 바로 이동할 수 있도록)

## WebConfig

인터셉터를 등록하기 위한 클래스

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginCheckInterceptor())
                .order(1)
                .addPathPatterns("/community/**", "/memberInfo/**")
                .excludePathPatterns("/community/list", "/community/read/*");
    }
}
```
- `WebMvcConfigurer`가 제공하는 `addInterceptors`를 사용해서 인터셉터를 등록할 수 있다.
- `excludePathPatterns`에 인증하지 않을 경로를 넣어두었다.
- `addPathPatterns`에 게시판과 관련된 모든 경로를 넣었고, `excludePathPatterns`에 인증하지 않을 경로를 넣어두었기 때문에 게시판 리스트, 읽기 부분을 제외한 모든 게시판 관련 경로는 인증이 필요하다.

## 오류 페이지 적용

오류 발생시 기존에 발생하던 Whitelable 에러 페이지 대신 다른 커스텀 페이지를 적용했다.<br>
에러 페이지 경로는 `templates - error - `이렇게 지정해 두었다.

### 404.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="/css/errors.css">
</head>
<body>
  <div id="error">
    <div id="box"></div>
    <h3>ERROR 404</h3>
    <p>Not <span>Found</span> Page</p>
    <p>Please enter the correct address</p>
  </div>
</body>
</html>
```

### 5xx.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="/css/errors.css">
</head>
<body>
  <div id="error">
    <div id="box"></div>
    <h3>ERROR 500</h3>
    <p>Things are a little <span>unstable</span> here</p>
    <p>I suggest come back later</p>
  </div>
</body>
</html>
```
(css는 생략..)

- 원래는 예외 종류에 따라서 ErrorPage를 추가하고, 예외 처리용 컨트롤러를 따로 만들어야 한다.
- 하지만 스프링 부트는 이런 과정을 기본적으로 제공해주기 때문에 해당 경로에 오류 페이지만 등록하면 알아서 처리해준다.
- `404.html`은 404 에러만 처리하지만, `5xx.html`은 서버 관련 에러(5__)를 모두 처리해준다.

>더 자세한 내용은 해당 포스팅 참고 : [스프링 부트 - 오류 페이지](https://kangtaegong.github.io/spring_mvc/springmvc-24/)

## LoginSessionCheck

기존에는 로그인 하면 메인화면에서는 사용자 이름과 로그아웃 버튼이 뜨면서 로그인된 것이 확인이 되지만, 다른 화면으로 넘어가면 다시 로그인 버튼이 생기면서 실제로 로그인은 되어있지만, 화면상으로 봤을 때는 로그인이 되어있지 않은 것 처럼 보였다.<br>
처음에는 인터셉터를 통해서 어떻게 할 수 있을까 고민을 하다가 막상 방법이 떠오르지 않아서 일단 클래스를 하나 만들어서 세션을 확인하고, 화면단에는 model을 통해서 넘겨주기로 했다.

```java
public class LoginSessionCheck {

    public static User check_loginUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return (User)session.getAttribute(SessionConst.LOGIN_USER);
    }

    public static void check_loginUser(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            User sessionUser = (User) session.getAttribute(SessionConst.LOGIN_USER);
            model.addAttribute("user", sessionUser);
        }
    }
}
```
- `check_loginUser(request)`는 글 작성시에 회원이 로그인 되었는지 확인 후 회원의 정보를 가져와 작성자 이름을 뿌려줄때 사용한다.
- `check_loginUser(request, model)`는 세션을 가져온 뒤 세션이 null이 아니라면 session에서 회원의 정보를 가져와 model을 통해서 넘겨주는 역할을 한다.
- 모든 게시글 관련 화면(리스트, 읽기, 생성 등..)을 불러올 때 `check_loginUser(request, model)`을 호출함으로서 화면단에 회원 정보를 넘겨준다.

### header.html

```html
...(생략)
<ul class="nav">
    <li><a th:href="@{/}">HOME</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Service</a></li>
    <li><a th:href="@{/community/list}">Community</a></li>
    <li>
            <div class="login_btn">
                <a href="#" th:href="@{/login}" th:if="${user == null}">로그인</a>
            </div>
    </li>
    <li>
            <span th:text="|${user.userName} 님|" th:if="${user != null}">사용자 이름</span>
    </li>
    <li>
            <form th:action="@{/logout}" method="post">
                <input type="submit" value="로그아웃" id="logout_btn" th:if="${user != null}">
            </form>
    </li>
```
- Controller에서 model을 통해 넘겨주는 user 정보를 존재 여부를 통해 출력해준다.