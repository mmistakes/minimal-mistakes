---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록3"
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

<br>

# 이번에 해야할 목록

- 회원가입 관련 html thymeleaf 적용해서 동적인 코드로 변경
- 회원가입시 사용할 error code 생성
- 회원가입시 검증기를 통한 text 출력
- Controller 생성 후 연결해서 화면에서 확인

## joinPage.html

회원가입 html에서 thymeleaf를 추가하여 동적으로 값이 들어가도록 만들고, `th:errors`를 통해서 오류 발생시 오류 코드가 출력되도록 하였다.

```html
    <form action="mainPage.html" th:action th:object="${joinForm}" method="post">
        <ul>
            <li>
                <div class = "join_title"><h4>이름</h4></div>
                <input type="text" class="form_input" th:field="*{userName}"
                        th:errorclass="field-error">
                <div class="field-error" th:errors="*{userName}"/>
            </li>
            <li>
                <div class = "join_title"><h4>아이디</h4></div>
                <input type="text" class="form_input" placeholder="5 ~ 20자의 영문 소문자, 숫자 "
                       th:field="*{userId}" th:errorclass="field-error">
                <div class="field-error" th:errors="*{userId}"/>
            </li>
            <li>
                <div class = "join_title"><h4>비밀번호</h4></div>
                <input type="password" class="form_input" placeholder="8 ~ 16자의 영문 소문자, 숫자, 특수문자 조합"
                       th:field="*{password}" th:errorclass="field-error">
                <div class="field-error" th:errors="*{password}"/>
            </li>
            <li>
                <div class = "join_title"><h4>비밀번호 확인</h4></div>
                <input type="password" class="form_input" th:field="*{check_password}"
                       th:errorclass="field-error">
                <div class="field-error" th:errors="*{check_password}"/>
            </li>
            <li>
                <div class = "join_btn">
                    <input type="submit" value="회원가입">
                </div>
            </li>
        </ul>
```
- 회원가입시 입력하는 정보를 담는 Dto(joinForm)를 넘겨받아서 값을 넣도록 하였다.

## errors.properties

회원가입시 사용할 에러 코드를 넣어두었다.

```properties
# 회원 가입 오류 코드
NotBlank.joinForm.userName = 회원 이름은 필수 입력 값입니다.
NotBlank.joinForm.userId = 회원 아이디는 필수 입력 값입니다.
NotBlank.joinForm.password = 비밀번호를 입력해 주세요
NotBlank.joinForm.check_password = 2차 비밀번호를 입력해 주세요

Pattern.joinForm.userName = 이름 형식이 올바르지 않습니다.
Pattern.joinForm.userId = 아이디는 5 ~ 20자의 영문 소문자, 숫자만 가능합니다.
Pattern.joinForm.password = 비밀번호는 8 ~ 16자의 영문, 숫자, 특수문자 조합으로 가능합니다.
Pattern.joinForm.check_password = 비밀번호는 8 ~ 16자의 영문, 숫자, 특수문자 조합으로 가능합니다.

NotEquals.joinForm.password = 비밀번호가 일치하지 않습니다.
NotEquals.joinForm.check_password = 비밀번호가 일치하지 않습니다.
```

## JoinValidator

회원가입시 입력하는 1차 패스워드와 2차 패스워드가 일치한지 확인하기 위한 검증기다.

```java
@Component
public class JoinValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return JoinForm.class.isAssignableFrom(clazz);
    }

    /*
    * 회원가입시 입력하는 패스워드와 2차 패스워드가 동일한지 비교하는 로직
    * */
    @Override
    public void validate(Object target, Errors errors) {
        JoinForm joinForm = (JoinForm) target;

        if(joinForm.getPassword().equals(joinForm.getCheck_password()) == false) {
            errors.rejectValue("password", "NotEquals");
            errors.rejectValue("check_password", "NotEquals");
        }
    }
}
```

## JoinController

```java
    private final UserService userService;

    /*
     * WebDataBinder - 스프링의 파라미터 바인딩의 역할을 해주고 검증 기능도 내부에 포함
     */
    @InitBinder
    public void init(WebDataBinder dataBinder) {
        JoinValidator joinValidator = new JoinValidator();
        dataBinder.addValidators(joinValidator);
    }

    /*
     * 2022-09-23
     * 회원가입 관련 로직
     * */
    @GetMapping("/join")
    public String joinForm(@ModelAttribute("joinForm") JoinForm form) {
        return "login/joinPage";
    }

    @PostMapping("/join")
    public String join(@Valid @ModelAttribute("joinForm") JoinForm form, BindingResult bindingResult) {

        if(bindingResult.hasErrors()) {
            return "login/joinPage";
        }

        /*
         * 회원 가입
         * */
        userService.join(form);

        return "redirect:/login";
    }
```
- `JoinForm`을 통해서 값을 입력받으며, 에러 발생시 `BindingResult`에 값이 입력되면서 회원가입에 실패하고, 다시 회원가입 페이지로 돌아간다.
- 문제가 없다면 `UserService`를 통해서 회원가입을 한다.
- 회원가입이 완료되면 redirect를 통해서 다시 로그인 화면으로 돌아간다.

## 실제 화면에서 검증기 확인

![joinPage](/images/Project_Report/joinPage.png)