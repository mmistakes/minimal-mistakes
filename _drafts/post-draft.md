---
title: "제목을 입력하세요"
last_modified_at: 2020-xx-xxT00:00:00-00:00
categories:
	- 카테고리를 입력하세요 ex)Cloud, AI, Big Data
tags:
	- 태그를 입력하세요 
	ex)Cloud: k8s, Docker, CloudZ, Azure, AWS, Google Cloud
	   Ai: Abril, Tensor Flow
       Big Data: accuinsight+, QUTA
author: 작성자를 입력하세요.
excerpt: "포스팅에 관한 간단한 소개 메세지를 입력하세요"
toc: true (toc를 사용하지 않을 경우에만 false로 변경)
toc_sticky: true (toc를 사용하지 않을 경우에만 false로 변경)
toc_label: "List" (toc 사용시-변경x, 사용하지 않을 시 삭제)
---

# Title 1 <!--title H1 -->

contents



<img src="/Users/juyounglee/cnaps-skcc.github.io/assets/images/smile.png" alt="smile" style="zoom:80%;" />

Exception Flow <!--title H2 -->


<!-- 이미지 삽입 -->

*[이미지 출처 링크](https://www.toptal.com/java/spring-boot-rest-api-error-handling)
<!-- 텍스트에 링크 삽입 -->

**Exception Sample 예제** <!-- Bold Text -->

~~Client가 "localhost:8083/test/xxx" 요청 ( RequestMapping("/test"), GetMapping({id})인 경우)~~ <!--취소줄-->

_This is italic text_ <!-- Italic Text-->
***This is Bold italic text*** <!-- 두꺼운 Italic Text-->

→ 화살표는 복사해서 사용하세요 <!-- 화살표 -->


## 제목

### 1. 제목 <!--title H3 -->

### 2. 제목

### 3. 제목

### 제목

#### 제목

##### 제목

###### 제목


<!--숫자형 리스트 -->
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

   ```java <!--코드 블럭 시작 -->
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

  ``` <!--코드 블럭 끝 -->

**Tips** 팁박스입니다.
{: .notice--danger} <!--팁 박스 빨간색-->

**ProTip:** Be sure to remove `/docs` and `/test` if you forked Minimal Mistakes. These folders contain documentation and test pages for the theme and you probably don't want them littering up your repo.
{: .notice--info}<!--팁 박스 파란색-->
 
 
**Note:** The theme uses the [jekyll-include-cache](https://github.com/benbalter/jekyll-include-cache) plugin which will need to be installed in your `Gemfile` and added to the `plugins` array of `_config.yml`. Otherwise you'll throw `Unknown tag 'include_cached'` errors at build.
{: .notice--warning} <!--팁 박스 노란색-->


- CustomExceptionHandler처럼 Entity나 Business Logic의 특정 Exception 처리가 아닌, Validation/Binding 등 전역에서 발생할 수 있는 에러를 한 곳에 모아 같은 Format으로 처리.
- View와 연결 시키는 경우 return type을 ModelAndView로 설정
- Error View의 경우, Spring에서는 다음과 같은 Page가 Default로 설정되어 있음.
<!-- 리스트 -->

<span style="color:blue"> **: User user = userRepository.findById(id).orElseThrow(()->new UserNotFoundException("User not found"));** </span> <!--글씨 색 변경 -->
\

>Exception 처리 Sample Github 주소: <!--인용구-->
<https://github.com/Juyounglee95/exception-sample.git> 
<!--링크 참조 기본 -->

>Exception 처리 가이드 참고 자료:  
<https://www.mkyong.com/spring-boot/spring-rest-error-handling-example/>
<https://spring.io/blog/2013/11/01/exception-handling-in-spring-mvc>
<https://github.com/paulc4/mvc-exceptions.git>
  
>Logging 처리:  
<https://www.sangkon.com/hands-on-springboot-logging/>
<https://meetup.toast.com/posts/149>
  ```