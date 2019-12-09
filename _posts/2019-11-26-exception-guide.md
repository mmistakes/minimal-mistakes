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

### 1. Error Detail

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

### 2. Custom Exception Handler

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

### 3. UserNotFoundException.class

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

### 4. GlobalExceptionHandler.class
   ```java
    package com.skcc.demo.exceptionsample.context.exceptionhandle;
    import java.nio.file.AccessDeniedException;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.validation.BindException;
    import org.springframework.web.HttpRequestMethodNotSupportedException;
    import org.springframework.web.bind.MethodArgumentNotValidException;
    import org.springframework.web.bind.annotation.ControllerAdvice;
    import org.springframework.web.bind.annotation.ExceptionHandler;
    import org.springframework.web.bind.annotation.ResponseStatus;
    import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
    import com.skcc.demo.exceptionsample.context.exceptionhandle.apierror.ApiErrorDetail;
    import lombok.extern.slf4j.Slf4j;
    @ControllerAdvice
    @Slf4j
    public class GlobalExceptionHandler {
        /**
        *  javax.validation.Valid or @Validated 으로 binding error 발생시 발생
        *  HttpMessageConverter 에서 등록한 HttpMessageConverter binding 못할경우 발생
        *  주로 @RequestBody, @RequestPart 어노테이션에서 발생
        */
        @ExceptionHandler(MethodArgumentNotValidException.class)
        protected ResponseEntity<ApiErrorDetail> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
            log.error("handleMethodArgumentNotValidException", e);
            ApiErrorDetail errorDetail = new ApiErrorDetail(HttpStatus.BAD_REQUEST);
    errorDetail.setMessage(e.getMessage());
            return new ResponseEntity<>(errorDetail, HttpStatus.BAD_REQUEST);
        }
        /**
        * @ModelAttribut 으로 binding error 발생시 BindException 발생
        * ref https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-ann-modelattrib-method-args
        */
        @ExceptionHandler(BindException.class)
        protected ResponseEntity<ApiErrorDetail> handleBindException(BindException e) {
            log.error("handleBindException", e);
            ApiErrorDetail errorDetail = new ApiErrorDetail(HttpStatus.BAD_REQUEST);
    errorDetail.setMessage(e.getMessage());
            return new ResponseEntity<>(errorDetail, HttpStatus.BAD_REQUEST);
        }
        /**
        * enum type 일치하지 않아 binding 못할 경우 발생
        * 주로 @RequestParam enum으로 binding 못했을 경우 발생
        */
        @ExceptionHandler(MethodArgumentTypeMismatchException.class)
        protected ResponseEntity<ApiErrorDetail> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
            log.error("handleMethodArgumentTypeMismatchException", e);
            ApiErrorDetail errorDetail = new ApiErrorDetail(HttpStatus.BAD_REQUEST);
    errorDetail.setMessage(e.getMessage());
            return new ResponseEntity<>(errorDetail, HttpStatus.BAD_REQUEST);
        }
        /**
        * 지원하지 않은 HTTP method 호출 할 경우 발생
        */
        @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
        protected ResponseEntity<ApiErrorDetail> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
            log.error("handleHttpRequestMethodNotSupportedException", e);
            ApiErrorDetail errorDetail = new ApiErrorDetail(HttpStatus.BAD_REQUEST);
    errorDetail.setMessage(e.getMessage());
            return new ResponseEntity<>(errorDetail, HttpStatus.BAD_REQUEST);
        }
        /**
        * Authentication 객체가 필요한 권한을 보유하지 않은 경우 발생
        */
        @ExceptionHandler(AccessDeniedException.class)
        protected ResponseEntity<ApiErrorDetail> handleAccessDeniedException(AccessDeniedException e) {
            log.error("handleAccessDeniedException", e);
            ApiErrorDetail errorDetail = new ApiErrorDetail(HttpStatus.BAD_REQUEST);
    errorDetail.setMessage(e.getMessage());
            return new ResponseEntity<>(errorDetail, HttpStatus.BAD_REQUEST);
        }
    
    
        @ExceptionHandler(Exception.class)
        protected ResponseEntity<ApiErrorDetail> handleException(Exception e) {
            log.error("handleEntityNotFoundException", e);
            ApiErrorDetail errorDetail = new ApiErrorDetail(HttpStatus.INTERNAL_SERVER_ERROR);
    errorDetail.setMessage(e.getMessage());
            return new ResponseEntity<>(errorDetail, HttpStatus.INTERNAL_SERVER_ERROR);
        }    /**
        * View와 연결// @ExceptionHandler(Exception.class)
    //    public ModelAndView handleError(HttpServletRequest req, Exception ex) {
    //  log.error("handleEntityNotFoundException", e);
    //     ModelAndView mav = new ModelAndView();
    //     mav.addObject("exception", ex);
    //     mav.addObject("url", req.getRequestURL());
    //     mav.setViewName("error");
    //     return mav;
    //   }
    *
    * */}
    ```
    **Tips**
    - CustomExceptionHandler처럼 Entity나 Business Logic의 특정 Exception 처리가 아닌, Validation/Binding 등 전역에서 발생할 수 있는 에러를 한 곳에 모아 같은 Format으로 처리.
    - View와 연결 시키는 경우 return type을 ModelAndView로 설정
    - Error View의 경우, Spring에서는 다음과 같은 Page가 Default로 설정되어 있음.
    {: .notice--danger}
    
    ![](https://cnaps-skcc.github.io/assets/images/globalexeption1.png)
  
    ![](https://cnaps-skcc.github.io/assets/images/globalexception2.png)
    
    → src/main/resources/templates/error 밑에 html 파일을 작성해 Error Page를 수정할 수 있음  
    → 예제: 4xx.html로 파일명을 선언해, 400,404,405 등 Status Code가 4xx Error의 경우 다음과 같은 View Page로 연결

### 5. ExceptionSamplController.java
   
   ```java
    package com.skcc.demo.exceptionsample.context.application.sp.web;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.validation.annotation.Validated;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.PathVariable;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.RequestBody;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RestController;
    import com.skcc.demo.exceptionsample.context.domain.UsersService;
    import com.skcc.demo.exceptionsample.context.domain.users.model.User;
    @RestController
    @RequestMapping("/test")
    public class ExceptionSampleController {
    @Autowired
    UsersService usersService;
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id")Long id){
    User user = usersService.findUser(id);
    return new ResponseEntity<>(user, HttpStatus.OK);
    }
    }
    ```
### 6. UsersService
   
   ```java
    package com.skcc.demo.exceptionsample.context.domain;
    import com.skcc.demo.exceptionsample.context.domain.users.model.User;
    public interface UsersService {
    public User findUser(Long id);
    }
    ```
### 7. UsersLogic
   
   ```java
    package com.skcc.demo.exceptionsample.context.domain;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;
    import com.skcc.demo.exceptionsample.context.domain.users.model.User;
    import com.skcc.demo.exceptionsample.context.domain.users.repository.UserRepository;
    import com.skcc.demo.exceptionsample.context.exceptionhandle.UserNotFoundException;
    @Service
    public class UsersLogic implements UsersService{
    @Autowired
    private UserRepository userRepository;
    @Override
    public User findUser(Long id) {
    
    User user = userRepository.findById(id).orElseThrow(()->new UserNotFoundException("User not found"));
    
    return user;
    }
    
    }
    ```

    **Tips**
    - UsersLogic 에서, UserRepository에 해당 UserId가 없는 경우 UserNotFoundException을 발생시킴  
    **: User user = userRepository.findById(id).orElseThrow(()->new UserNotFoundException("User not found"));**
    
>Exception 처리 Sample Github 주소: 
<https://github.com/Juyounglee95/exception-sample.git>

>Exception 처리 가이드 참고 자료:  
<https://www.mkyong.com/spring-boot/spring-rest-error-handling-example/>
<https://spring.io/blog/2013/11/01/exception-handling-in-spring-mvc>
<https://github.com/paulc4/mvc-exceptions.git>
  
>Logging 처리:  
<https://www.sangkon.com/hands-on-springboot-logging/>
<https://meetup.toast.com/posts/149>