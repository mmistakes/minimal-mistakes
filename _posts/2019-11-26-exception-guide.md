---
title:  "Exception 가이드"
last_modified_at: 2019-12-06T08:06:00-05:00
categories:
  - spring
tags:
  - spring
  - exception
  - java
author: Juyoung Lee
excerpt: "Spring에서 어떤 방식으로 Exception을 처리하는지 이해하고, 적용하는 방법을 간단한 예제 프로젝트를 만들었습니다."
toc: true
toc_sticky: true
toc_label: "List"
---

## Exception Flow 

![Exception Flow](https://cnaps-skcc.github.io/assets/images/exception-flow.png){: .align-center}
*[이미지 출처 링크](https://www.toptal.com/java/spring-boot-rest-api-error-handling)

**Exception Sample 예제**

Client가 "localhost:8083/test/xxx" 요청 ( RequestMapping("/test"), GetMapping({id})인 경우)

→ ExceptionSampleController에서 UsersService로 요청

→ UsersLogic에서 UserRepository접근

→ 해당 User Id == null (xxx가 Repository에 존재하지 않는 경우에 해당. 존재하는 경우 정상적으로 User return)

→ UserNotFoundException발생

→ CustomExceptionHandler에서 ApiErrorDetail Object를 생성해 Error Response 전달

## Exception sample Functions

### 1. Custom Exception Handle

:특정 Entity 별로 Exception 처리
ex) User Entity : findById(id)에서 해당 User가 없는 경우 Throw Exception
![Custom Exception Handle](https://cnaps-skcc.github.io/assets/images/exception-guide1.png)

### 2. Global Exception

1. MethodArgumentNotValidException
: javax.validation.Valid or @Validated 으로 binding error 발생
2. BindException
: @ModelAttribut 으로 binding error 발생시 BindException 발생
3. MethodArgumentTypeMismatchException
: enum type 일치하지 않아 binding 못할 경우 발생
4. HttpRequestMethodNotSupportedException
: 지원하지 않은 HTTP method 호출 할 경우 발생
5. AccessDeniedException
:  Authentication 객체가 필요한 권한을 보유하지 않은 경우 발생
6. Exception
: 이외에 발생하는 Exception
![Exception](https://cnaps-skcc.github.io/assets/images/exception-guide2.png)

### 3. Exception Detail Handle

:Error가 발생했을 때 출력되는 메세지 Custom 처리
→ status, timestamp, message, debug message 등 Custom 가능
![Exception 메세지](https://cnaps-skcc.github.io/assets/images/exception-guide3.png)

### 4. Exception View

:Error가 발생했을 때 보여지는 View Custom 처리
→ View에 보여질 Message, status-code, stack Trace 등 제어
![Exception View](https://cnaps-skcc.github.io/assets/images/exception-guide4.png)


### 5. Logging

@Slf4j 사용
→ Error 발생시 Console에 Error Log 보여지도록 처리
![Logging View](https://cnaps-skcc.github.io/assets/images/exception-guide5.png)


## Exception Sample Code

샘플에 작성된 코드 상세 설명입니다.

1. Error Detail

   ```java
    package com.skcc.demo.exceptionsample.context.exceptionhandle.apierror;
    import java.time.LocalDateTime;
    import java.util.List;
    import org.springframework.http.HttpStatus;
    import com.fasterxml.jackson.annotation.JsonFormat; 
    import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes;
    import lombok.Data;
    @Data
    public class ApiErrorDetail {

    private HttpStatus status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss", timezone="Asia/Seoul")
    private LocalDateTime timestamp;
    private String message;
    private String debugMessage;
    private List<ApiSubError> subErrors;
    private ApiErrorDetail() {
        timestamp = LocalDateTime.now();
    }
    public ApiErrorDetail(HttpStatus status) {
        this();
        this.status = status;
    }
    public ApiErrorDetail(HttpStatus status, Throwable ex) {
        this();
        this.status = status;
        this.message = "Unexpected error";
        this.debugMessage = ex.getLocalizedMessage();
    }
    public ApiErrorDetail(HttpStatus status, String message, Throwable ex) {
        this();
        this.status = status;
        this.message = message;
        this.debugMessage = ex.getLocalizedMessage();
    }
    }
    ```

    **Tips**
    - Error Message 객체 Format을 통일화

        - message : 에러에 대한 message를 작성

        - status : http status code를 작성 (header 정보에 포함된 정보)

    - Error Code는 포함 시키지 않았는데, Error Code 표준을 정한 경우 포함하는 것이 좋음
    {: .notice--danger}

2. Custom Exception Handler

   ```java
    package com.skcc.demo.exceptionsample.context.exceptionhandle;
    import javax.servlet.http.HttpServletRequest;
    import org.springframework.core.annotation.AnnotationUtils;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.ControllerAdvice;
    import org.springframework.web.bind.annotation.ExceptionHandler;
    import org.springframework.web.bind.annotation.ResponseStatus;
    import org.springframework.web.servlet.ModelAndView;
    import com.skcc.demo.exceptionsample.context.exceptionhandle.apierror.ApiErrorDetail;
    import lombok.extern.slf4j.Slf4j;

    @ControllerAdvice
    @Slf4j
    public class CustomExceptionHandler {
    @ExceptionHandler(UserNotFoundException.class)
    protected ResponseEntity<ApiErrorDetail> handleUserNotFoundException(UserNotFoundException unfe){
        log.error("handleUserNotFoundException", unfe);
    ApiErrorDetail errorDetail = new ApiErrorDetail(HttpStatus.NOT_FOUND);
    errorDetail.setMessage(unfe.getMessage());
    return new ResponseEntity<>(errorDetail, HttpStatus.NOT_FOUND);
    }}
   ```

    **Tips**
    - @ControllerAdvice : 모든 예외를 한 곳에서 처리할 수 있게 함.
    - handleUserNotFoundException: UserNotFoundException 처리로, 검색한 User가 존재하지 않으면 해당 Error Message Throw
    - 이외에 각 Entity 마다 Exception을 정의해 사용할 수 있음.
    {: .notice--danger}

3. UserNotFoundException.class

    ```java
    package com.skcc.demo.exceptionsample.context.exceptionhandle;
    public class UserNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 1L; //set UID
    public UserNotFoundException() {
    }
    public UserNotFoundException(String message) {
    super(message);
    }
    }
    ```

>이외 내용은 생략