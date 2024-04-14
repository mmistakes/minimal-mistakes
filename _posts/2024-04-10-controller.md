---
layout: single
title: '[Spring] @Controller와 @RestController 제대로 알기'
categories: JAVA
tag: [JAVA, Spring]
toc: true 
author_profile: false
sidebar:
    nav: "counts"
published: true

---

Spring에서 클래스에 컨트롤러를 지정해주기 위한 어노테이션은 @Controller와 @RestController가 있다.

Spring MVC의 컨트롤러인 @Controller와 RESTful 웹 서비스의 Controller인 @RestController의 주요한 차이점은 Response Body가 생성되는 방식이다.


## @Controller 
전통적인 Spring MVC의 컨트롤러인 @Controller는 주로 **View를 반환**하기 위해 사용하며, 데이터를 반환하기 위해서는 **@ResponseBody** 어노테이션을 활용해주어야 한다.

DispatcherServlet는 View Resolver를 통해 View Name에 해당하는 View를 찾아서 Client한테 반환한다. 

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-04-10-controller\mvc_spring_container.png" alt="Alt text" style="width: 80%; height: 80%; margin: 20px;">
</div>



컨트롤러를 통해 객체(데이터)를 반환할 대 일반적으로 ResponseEntity로 감싸서 반환하고 객체를 반환하기 위해서는 viewResolver 대신에 HttpMessageConverter가 동작한다. 

HttpMessageConverter는 반환해야 하는 데이터에 따라 다른 Converter를 사용한다.

- 단순 문자열 : StringHttpMessageConverter
- 객체 : MappingJackson2HttpMessageConverter

데이터 종류에 따라 서로 다른 MessageConverter가 작동하며, 
Spring은 클라이언트의 HTTP Accept 헤더와 서버의 컨트롤러 반환 타입 정보 둘을 조합해 적합한 HttpMessageConverter를 선택하여 이를 처리한다.

MessageConverter는 HandlerAdapter와 Controller가 요청을 주고 받는 시점 동작하는데 그림의 4번에서는 메세지를 객체로, 6번에서는 객체를 메세지로 변환하는데 메세지 컨버터가 사용된다.


### 예제 코드 


```java

     // UserDto를 json으로 반환하기 위해 @ResponseBody라는 어노테이션 추가 
     @GetMapping( "/find/name/{userName}")
     public @ResponseBody ResponseEntity<UserDto> findByUserNamerWithResponseEntity(@PathVariable("userName") String userName) throws Exception {
         return ResponseEntity.ok(userService.findByUserName(userName));
     }

     
    @GetMapping("mypage")
    public String mypage(Authentication authentication, Model model) {

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        model.addAttribute("username", userDetails.getUsername());
        return "member/mypage";
    }


```
## @RestController

@RestController는 Spring4.0에서 추가되었다.

@Controller + @ResponseBody 가 합쳐진 형태로 데이터를 반환하는 REST API를 개발할 때 주로 사용하며 객체를 ResponseEntity로 감싸서 반환한다. 

@RestController는 모든 핸들러 메소드에서 @ResponseBody를 사용할 필요가 없이 데이터를 반화해준다.

REStful 웹 서비스를 만드는 경우에는 @Controller + @ResponseBody 보다 @RestController을 사용하는 것이 좋다. 


### 예제 코드 

```java
    //  User 객체를 그대로 반환 -> 클라이언트가 예상하는 HttpStatus를 설정해줄 수 없다 ❌
    @GetMapping("/find/name/{userName}")
    public UserDto findByUserName(@PathVariable("userName") String userName) throws Exception {
        return userService.findByUserName(userName);
    }

    // 객체를 그대로 반환하면 HttpStatus를 설정해줄 수 없음 -> 객체를 상황에 맞는 ResponseEntity로 감싸서 반환 ⭕
    @GetMapping( "/find/name/{userName}")
    public ResponseEntity<UserDto> findByUserNamerWithResponseEntity(@PathVariable("userName") String userName) throws Exception {
        return ResponseEntity.ok(userService.findByUserName(userName));
    }

```
<br>

@Controller와 @RestController 와 정리하면 다음과 같다. 

>- @Controller : 뷰와 연계되는 웹 페이지를 위한 요청 처리
>
>- @RestController : RESTful API를 통해 데이터를 주고받기 위한 요청 처리

구조적으로 두 어노테이션을 사용하는 컨트롤러 클래스를 따로 구성하는 것이 바람직하다 !

그래서 기존 기능별로 나눴던 컨트롤러 구조를 회원 / 비회원으로 나눴다.


<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-04-10-controller\controllre_structure.png" alt="Alt text" style="width: 60%; height: 80%; margin: 20px;">
</div>


- Public controler : 누구나 접근할 수 있는 뷰 

- UserController : 회원만 접근할 수 있는 뷰 

- UserApiController : 회원 관련 RESTful API


유저와 관련된 컨트롤러는 UserController로, API 처리는 UserApiController와 같이 별도의 컨트롤러로 분리하면 역할을 명확히 구분하고 유지 관리를 용이하게 할 수 있다.


<br>
----
<br>

Reference

- @Controller와 @RestController 
    - <a href = 'https://mangkyu.tistory.com/49'>[Spring] @Controller와 @RestController 차이
by [MangKyu's Diary:티스토리]</a>
    - <a href = 'https://backendcode.tistory.com/213#google_vignette'>@Controller와 @RestController 차이점 by [무작정 개발:티스토리]</a>
