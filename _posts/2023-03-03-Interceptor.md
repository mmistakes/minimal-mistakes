---
title: "Spring MVC : 인터셉터"
categories:
  - Spring
toc: true
toc_label: "목차"
#toc_icon:
toc_sticky: true
#last_modified_at:
---

## 1. 인터셉터
예를 들어 인터셉터가 없는 웹에서 로그인하지 않은 상태에서 비밀번호를 변경한다고 "http.://localhost:8080/edit/changePassword" 주소에 들어간다면 비밀번호 변경 폼이 출력될 것이다. 로그인 하지 않았는데 변경 폼이 출력되는 것은 이상하다.\
그것보다도 로그인하지 않은 상태에서 비밀번호 변경 폼을 요청하면 로그인 화면으로 이동시키는 것이 더 좋은 방법이다.

이를 위해 다음과 같이 HttpSession에 "authInfo" 객체가 존재하는지 검사하고 존재하지 않으면 로그인 경로로 리다이렉트하도록 ChangePwdController 클래스를 수정할 수 있다.

```java
@GetMapping
public String  form(
    @ModelAttribute("command") ChangePwdCommand pwdCmd, HttpSession session) {
    
    AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
    if(authInfo != null){
        return "redirect:/login";
    }
    return "edit/changePwdForm";
}
```

그런제 실제 웹 어플리케이션에서는 비밀번호 변경 기능 외에 더 많은 기능에 로그인 여부를 확인해야 한다. 각 기능을 구현한 컨트롤러 코드마다 세션 확인 코드를 삽입하는 것은 많은 중복을 일으킨다.

> 이렇게 다수의 컨트롤러에 대해 동일한 기능을 적용해야 할 때 사용할 수 있는 것이 HandlerInterceptor이다.

## 2. HandlerInterceptor 인터페이스 구현하기
org.springframework.web.HandlerInterceptor 인터페이스를 사용하면 다음의 세 시점에 공통 기능을 넣을 수 있다.
- 컨트롤러(핸들러) 실행전
- 컨트롤러(핸들러) 실행 후, 아직 뷰를 실행하기 전
- 뷰를 실행한 이후

세 시점을 처리하기 위해 HadlerInterceptor인터페이스는 다음 메서드를 정의하고 있다.

```java
boolean preHandle(
        HttpServletRequest request,
        HttpServletResponse response,
        Object hadnler) throws Exception;

boolean postHandle(
        HttpServletRequest request,
        HttpServletResponse reponse,
        Object handler,
        ModelAndView modelAndView) throws Exception;

boolean afterCompletion(
        HttpServletRequest request,
        HttpServletResponse response,
        Object handler,
        Exception ex) throws Exception;
```

- preHandle()\
preHandle() 메서드는 컨트롤러(핸들러) 객체를 실행하기 전에 필요한 기능을 구현할 때 사용한다. handler 파라미터는 웹 요청을 처리할 컨트롤러(핸들러) 객체이다. 이 메서드를 사용하면 다음 작업이 가능하다
    - 로그인하지 않은 경우 컨트롤러를 실행하지 않음
    - 컨트롤러를 실행하기 전에 컨트롤러에서 필요로 하는 정보를 생성\

    preHandle() 메서드의 리턴 타입은 boolean이다. preHandle() 메서드가 false를 리턴하면 컨트롤러 (또는 다음 HandlerInterceptor)를 실행하지 않는다.

- postHandle()\
pastHandle() 메서드는 컨트롤러(핸들러)가 정상적으로 실행된 이후에 추가 기능을 구현할 때 사용한다. 컨트롤러가 익셉션을 발생하면 postHandle() 메서드는 실행하지 않는다.

- afterCompletion()\
afterCompletion() 메서드는 뷰가 클라이언트에 응답을 전송한 뒤에 실행된다.\ 
컨트롤러 실행 과정에서 익셉션이 발생하면 이 메서드의 네 번째 파라미터로 전달된다. 익셉션이 발생하지 앟으면 네 번째 파라미터는 null이 된다.\
따라서 컨트롤러 실행 이후에 예기치 않게 발생한 익셉션을 로그로 남긴다거나 실행 시간을 기록하는 등의 후처리를 하기에 적합한 메서드이다.

HandlerInterceptor와 컨트롤러의 흐름을 그림으로 그려보면 아래와 같이 정리할 수 있다. HandlerMapping, ViewResolver, HandlerAdapter 등과의 흐름은 생략했다.

![interceptor](https://user-images.githubusercontent.com/97718735/222708277-99cef859-e24d-4adf-968c-33183d40d2ee.png)

HandlerInterceptor 인터페이스의 각 메서드는 아무 기능도 구현하지 않은 자바 8의 디폴트 메서드이다. 따라서 HandlerInterceptor 인터페이스의 메서드를 모두 구현할 필요가 없다. 


## 3. HandlerInterceptor 구현
비밀번호 변경 기능에 접근할 때 HandlerInterceptor를 사용하면 로그인 여부에 따라 로그인 폼으로 보내거나 컨트롤러를 실행하도록 구현할 수 있다.\
아래 코드는 preHandle() 메서드를 구현한다. HttpSession에 "authInfo" 속성이 존재하지 않으면 지정한 경로로 리다이렉트하도록 구현하면 된다.
```java
import org.springframwork.web.servlet.HadlerInterceptro;

public class AuthCheckInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
        HttpServletRequest request,
        HttpServletResponse response,
        Object handler) throws Exception {
        
        HttpSession session = request.getSession(false);
        if(session != null) {
            Object authInfo = session.getAuthInfo("authInfo");
            if(authInfo != null){
                return true;
            }
        }
        response.sendRedirect(request.getContextPath() + "/login");
        return false;
    }
}
```
preHandle() 메서드에서 true를 리턴하면 컨트롤러를 실행하므로 로그인 상태면 컨트롤러를 실행한다. 반대로 false를 리턴하면 로그인 상태가 아니므로 18행에서 지정한 경로로 리다이렉트한다.

참고로 18에서 request.getContextPath()는 현재 컨텍스트 경로를 리턴한다. 예를 들어 웹 어플리케이션 경로가 h.ttp://localhost:8080/sp5-chap13이면 컨텍스트 경로는 /sp5-chap13이 된다. 따라서 18행은 "/sp5-chap13/login"으로 리다이렉트하라는 응답을 전송한다.

## 4. HandlerInterceptor 설정하기
HandlerInterceptor를 구현하면 HandlerInterceptor를 어디에 적용할지 설정해야 한다. 관련 설정은 WebMvcConfigurer 인터페이스에 정의되어 있다.
```java
@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {
    ...

    @Override
    public void addInterceptor(InterceptorRegistry registry){
        registry.addInterceptor(authCehckInterceptor())
            .addPathPatterns("/edit/**");
    }

    @Bean
    public AuthCheckInterceptor authCheckInterceptor(){
        return new AuthCheckInterceptor();
    }
}
```

7행의 WebMvcConfigurer#addInterceptor() 메서드는 인터셉터를 설정하는 메서드이다.

InterceptorRegistry.addInterceptor() 메서드는 HandlerInterceptor 객체를 설정한다.

InterceptorRegistry.addInterceptor() 메서드는 InterceptorRegistration 객체를 리턴하는데 이 객체의 addPathPatterns() 메서드는 인터셉터를 적용할 경로 패턴을 지정한다.\
이 경로는 Ant 경로 패턴을 사용한다. 두 개 이상 경로 패턴을 지정하려면 각 경로 패턴을 **'콤마'**로 구분해서 지정한다. 9행은 /edit/으로 시작하는 모든 경로에 인터셉터를 적용한다.

> Ant 경로 패턴\
Ant 패턴은 *, **, ? 의 세 가지 특수 문자를 이용해서 경로를 표현한다. 각 문자는 다음의 의미를 갖는다.
> - " * " : 0개 또는 그 이상의 글자
> - " ? " : 1개 글자
> - " ** " : 0개 또는 그 이상의 폴더 경로
>
>이들 문자를 사용한 경로 표현 예는 다음과 같다.
> - @RequestMapping("/member/?*.info")\
    /member/로 시작하고 확장자가 .info로 시작하는 모든 경로
> - @RequestMapping("/faq/f?OO.fq")\
    /faq/f로 시작하고, 1글자 사이에 위치하고 OO.fq로 끝나는 모든 경로
> - @RequestMapping("/folders/**/files")\
    /folders/로 시작하고, 중간에 0개 이상의 중간 경로가 존재하고 /files/로 끝나는 모든 경로 예를 들어 /folders/files, /folders/1/2/3/files등이 일치한다.

### 4.1 경로 제외
addPathPatters() 메서드에 지정한 경로 패턴 중 일부를 제외하고 싶다면 excludePathPatterns() 메서드를 사용한다.
```java
@Override
public void addInterceptor(InterceptorRegistry registry) {

    registery.addInterceptor(authCheckInterceptor())
        .addPathPatterns("/edit/**")
        .excludePathPatterns("/edit/help/**");
}
```
제외할 경롤 패턴은 두 개 이상이면 각 경로 패턴을 **'콤마'**로 구분하면 된다.
## Ref.
- 최범균, 스프링프로그래밍입문5, 가메출판사.