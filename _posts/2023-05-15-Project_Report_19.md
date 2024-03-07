---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록19 - Trouble Shooting"
categories: Project
tag: [web, server, DB, spring boot, spring mvc, java, JPA]
toc: true
toc_sticky: true
author_profile: false
sidebar:
    nav: "docs"
---

<br>

# 개요

프로젝트를 진행 하면서 직면한 문제들과 오류에 대해서 해결하면서 어떻게 해결했는지, 어떤 내용을 알게 되었는지 기록하기 위해 작성했다.

## Template Error

![BindingResult](/images/Project_Report/BindingResult.png)

- 로그인 페이지로 넘어가기만 하면 해당 오류가 발생하였다.
- 검색해본 결과로는 `@ModelAttribute`를 통해 값을 넘겨주거나 할 때 이름이 맞지 않는 것 처럼 Controller와 Template 사이에 이름이 맞지 않으면 오류가 발생한다고 한다.
    - 하지만 아무리 코드를 확인해 봐도 이름 자체에는 문제가 전혀 없었다.
- 한참 확인하던 중 html 부분에 작성한 Thymeleaf 코드를 자세히 확인해 보았는데, `th:object`여기서 오타가 나 있었다..
- 해당 부분은 컴파일 시점에 정확히 잡아주지 못하기 때문에 찾는데 오래걸렸다..

<br>

## Thymeleaf Image 참조

- 기존에 html에서 이미지 첨부를 통해 화면에 출력하기 위해서 `<img src="...">`이런 식으로 이미지를 출력했다.
- 하지만 Thymeleaf를 사용한다면 저 방식으로는 정상적인 출력이 되지 않는다.
- Thymeleaf에서 이미지를 정상 출력하기 위해서는 `<img th:src="@{...}">`이런식으로 경로를 걸어줘야 한다.

<br>

## 유효성 검사 우선순위

- 회원가입 시 사용자가 사용할 id, pw를 입력하게 되는데, 입력 과정에서 형식에 어긋나거나 값을 입력하지 않는 것에 대한 오류 메시지를 출력하도록 개발했습니다.
- 검증을 위해 Bean Validation을 이용했고, 검증 어노테이션으로 `@NotBlank`, `@Pattern`를 사용했습니다.
- 기능은 잘 동작하였지만, 문제는 두 개의 검증 어노테이션에 모두 위배될 경우 오류 메시지가 동시에 출력되는 것이었습니다.
- 관련 정보를 찾아보니 `@GroupSequence`를 통해 검증에 우선순위를 설정할 수 있다는 것을 알게 되었습니다.

<details markdown="1">
<summary>Validation Code</summary>

**ValidationGroups**
```java
public class ValidationGroups {
    public interface NotEmptyGroup {};
    public interface PatternCheckGroup {};
}
```

**ValidationSequence**
```java
@GroupSequence({NotEmptyGroup.class, PatternCheckGroup.class})
public interface ValidationSequence {}
```
</details>

- 현재 `@NotBlank`, `@Pattern` 관련 검증을 하고 있기 때문에 각각 인터페이스로 만들어 주었고, `@GroupSequence`를 통해 순서를 정했습니다.
    - `@GroupSequence`에 입력하는 순서대로 동작

<details markdown="1">
<summary>적용 코드</summary>

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
</details>

- 마지막으로 회원가입 Form에 groups를 통해 각각 지정해 주었더니 정상적으로 동작 되었습니다.

<br>

## Spring Batch 실행 오류

- 영화 검색 기록을 DB에 저장하는데, 주기적으로 DB에 저장된 데이터들을 삭제하기 위해 Spring Batch를 사용하게 되었습니다.
- 처음 코드를 추가한 뒤 실행했을 때 오류가 발생하였는데, 검색해 보니 Spring Boot 2.X 버전 이상부터는 다음 코드를 추가해줘야 했습니다.
    - batch를 위한 기본 테이블이 생성되지 않은 문제.

<details markdown="1">
<summary>수정 전 코드</summary>

**application.properties**
```properties
spring.batch.initialize-schema=always
```
</details>

- 하지만 해당 코드를 추가해도 오류가 계속 되자 혹시 다른 코드를 잘못 작성한건 아닌지 확인도 해보았지만 별다른 문제가 없어 보였습니다.
- 다시 검색해 보니 2.7.0 버전부터 해당 코드가 제거되어 2.5.0 버전부터는 사용이 안되는 것이었습니다.
- 그리하여 새로운 코드로 수정해 주었더니 정상적으로 동작되었습니다.

<details markdown="1">
<summary>수정 후 코드</summary>

**application.properties**
```properties
spring.batch.jdbc.initialize-schema=always
```
</details>

<br>

## 팝업 창 관련 동작

### 목적

- 회원 탈퇴는 팝업 창을 띄워주고, 그 안에서 비밀번호 인증이 완료되면 alert 기능을 통해 동작 완료를 알리며 종료되는 순으로 개발 예정이었습니다.
- 목적은 팝업창에서 인증만 하고, 완료됨과 동시에 팝업창은 사라지고 메인 창에서 메인 화면으로 이동하는 것이었습니다.

### 문제

- 실제 동작해 보니 완료 메시지 창이 뜨고, 확인 버튼을 누르니 팝업창 자체에서 메인 화면으로 이동되는 것이 문제였습니다.

<details markdown="1">
<summary>기존 코드</summary>

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <th:block th:if="${#strings.length(data.message) != 0}">
        <script>
            top.alert("[[$data.message]]");
        </script>
    </th:block>

    <th:block th:if="${#strings.length(data.href) != 0}">
        <script>
            top.location.href = '[[$data.href]]';
        </script>
    </th:block>
</head>
</html>
```
</details>

- Controller에서 model(key : data)을 통해 값을 넘겨주면 해당 html에서는 안에 값이 존재하는지 확인하고, 그 값을 뽑아서 메시지 창에 출력하고, 지정해준 경로로 이동하도록 제작하였다.
- top을 이용해서 최상위 윈도우 창에서 메시지를 띄우고, 지정해준 경로로 이동시킬 예정이었지만 생각처럼 동작하지 않았다.

<details markdown="1">
<summary>수정 후 코드</summary>

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
</details>

- `window.self().close()`를 통해서 현재 열린 팝업창을 닫을 수 있었다.
- `window.opener`는 파업창에서 자신을 오픈한 부모창을 제어할 수 있기 때문에 이 코드를 통해 부모창을 원하는 경로로 이동시킬 수 있었습니다.
- 평소에는 팝업창의 알림이 아닌 일반적인 알림 목적으로 사용하기 때문에, 따로 팝업창에서 넘어오는 메시지가 아니라면 일반적인 메시지 창으로 동작.
