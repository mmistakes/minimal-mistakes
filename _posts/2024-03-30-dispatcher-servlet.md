---
layout: single
title: '[Spring] Spring MVC Framework와 Dispatcher-Servlet 이해하기'
categories: Spring
tag: [JAVA, Spring]
toc: true 
author_profile: false
sidebar:
    nav: "counts"
published: true

---

## Spring MVC Framework
Spring MVC는 Spring 프레임워크에서 제공하는 웹 모듈이다.  MVC 디자인 패턴에 기반해 웹 어플리케이션을 만들기 위한 Spring 기능을 말한다.  

### Model
데이터와 관련된 컴포넌트이다. 클라이언트의 요청을 전달받으면 요청 사항을 처리하기 위한 작업을 수행한다. 클라이언트에게 응답으로 돌려주는 작업의 처리 결과 데이터를 Model이라고 한다.

- DAO 클래스, Service 클래스에 해당
- Java Beans

### View
Model을 이용하여 웹 브라우저와 같은 애플리케이션의 화면에 보이는 리소스(Resource)를 제공하는 역할을 한다.

-  HTML과 CSS, JavaScript를 사용하여 웹 브라우저가 출력할 UI를 생성
- JSP 및 Thymeleaf, Groovy, Freemarker 등 여러 Template Engine

### Controller
클라이언트 측의 요청을 직접적으로 전달받는 엔드포인트(Endpoint)로써 Model과 View의 중간에서 상호작용을 해주는 역할을 한다.

- Servlet과 JSP를 사용하여 작성

## Spring MVC 구조

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-03-30-dispatcher-servlet\mvc-framework.png" alt="Alt text" style="width: 100%; height: 100%; margin: 20px;">
</div>

### 구성 요소 

- **DispatcherServlet**
    - Front controller 역할을 수행한다.
    - 서블릿 컨테이너에서 http 프로토콜을 통해 들어오는 모든 request에 대해 가장 먼저 받아 중앙 집중식으로 처리한다.

- **HandlerMapping**
     - 사용자의 요청을 처리할 Controller를 찾아 Dispatcher Servlet에게 전달한다. 
     - 즉, 클래스에 @RequestMapping(“/url”)  명시하면 해당 URL에 대한 요청이 들어왔을 때 해당 클래스를 처리할 Handler객체를 리턴한다.

- **ModelAndView** 
    - Controller가 처리한 Model 데이터 객체와 이동할 페이지에 대한 정보를 보유한 객체이다.

- **ViewResolver** 
    - ModelAndView 객체를 처리해 View를 그린다.
    - Controller가 리턴한 뷰 이름을 기반으로 Controller 처리 결과를 생성할 뷰를 결정한다.

-------

### 동작 순서

><span style = "font-weight:bold;">1. Client의 요청이 들어오면 DispatchServlet이 가장 먼저 요청을 받는다.</span>

><span style = "font-weight:bold;">2. HandlerMapping이 요청에  해당 url을 처리하는 Controller를 return한다.</span>

><span style = "font-weight:bold;">3. Controller는 비지니스 로직을 수행(호출)하고 결과 데이터를 ModelAndView에 반영하여 return한다.</span>

><span style = "font-weight:bold;">4. ViewResolver는 view name을 받아 해당하는 View 객체를 return한다.</span>

><span style = "font-weight:bold;">5. View는 Model 객체를 받아 rendering 한다.</span>

><span style = "font-weight:bold;">6. 완성된 View 파일을 화면에 출력한다. </span>



## Front-Controller 패턴

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-03-30-dispatcher-servlet\front_controller.png" alt="Alt text" style="width: 100%; height: 100%; margin: 20px;">
</div>
<div style="text-align: center;">
    @image:<a href="https://www.developerfusion.com/article/9450/controller-patterns-for-aspnet/">developerfusion</a>
</div>

<br>

Front-Controller 패턴은 웹 어플리케이션에서 사용되는 디자인 패턴으로, 
모든 리소스(Resource) 요청을 처리해주는 하나의 컨트롤러(Controller)를 두는 패턴이다.

스프링 웹 MVC의 DispatcherServlet은 HTTP 프로토콜로 들어오는 모든 요청을 가장 먼저 받아 적합한 컨트롤러에 위임해주는 **프론트 컨트롤러(Front Controller)**이다. 디스패처 서블릿은 공통적인 작업을 먼저 처리한 후에 해당 요청을 처리해야 하는 컨트롤러를 찾아서 작업을 위임한다. 


## Dispatcher-Servlet(디스패처 서블릿) 

dispatcher-servlet의 dispatch는 "보내다"라는 뜻을 가지고 있다. 디스패처 서블릿이 어플리케이션으로 들어오는 모든 요청을 핸들링해주고 공통 작업을 처리면서 컨트롤러를 구현해두기만 하면 디스패처 서블릿가 알아서 적합한 컨트롤러로 위임을 해주는 구조가 가능하게 됐다. 

Dispatcher Servlet이 요청을 처리할 컨트롤러를 먼저 찾고 요청에 대한 컨트롤러를 찾을 수 없는 경우에, 2차적으로 설정된 자원(Resource) 경로를 탐색하여 이미지나 HTML/CSS/JavaScript 등과 같은 정적 파일에 Static Resources요청으로 처리한다. 


<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-03-30-dispatcher-servlet\dispatcher_Servlet_flow.png" alt="Alt text" style="width: 100%; height: 100%; margin: 20px;">
</div>


### 동작 순서



><span style = "font-weight:bold;">1. Client의 요청이 들어오면 블릿 컨텍스트(웹 컨텍스트)에서 필터들을 지나 스프링 컨텍스트에서 DispatchServlet이 가장 먼저 요청을 받는다.</span>

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-03-30-dispatcher-servlet\dispatcher_flow1.png" alt="Alt text" style="width: 100%; height: 100%; margin: 20px;">
</div>

><span style = "font-weight:bold;">2. HandlerMapping이 요청에  해당 url을 처리하는 Controller를 return한다. </span> <br><br>@Controller에 @RequestMapping 관련 어노테이션을 사용해 컨트롤러를 작성하는 것이 일반적이다. <br>  <br>요청을 처리할 대상(HandlerMethod)를 찾은 후에 컨트롤러로 요청을 넘겨주기 전에 처리해야 하는 인터셉터 등을 포함하기 위해서 HandlerExecutionChain으로 감싸서 반환한다.

><span style = "font-weight:bold;">3. 디스패처 서블릿은 요청을  컨트롤러로 위임할  <b>HandlerAdapter</b>를 찾아서 전달한다.  </span> <br><br>다양하게 작성되는 컨트롤러에 대응하기 위해 스프링은 HandlerAdapter라는 어댑터 인터페이스를 통해 어댑터 패턴을 적용함으로써 컨트롤러의 구현 방식에 상관없이 요청을 위임할 수 있다.

><span style = "font-weight:bold;">4. 핸들러 어댑터가 컨트롤러로 요청을 위임한 전/후에 공통적인 전/후처리 과정을 수행한다.  </span> <br><br>  @RequestParam, @RequestBody 등을 처리하기 위한 ArgumentResolver와 응답 시에 ResponseEntity의 Body를 Json으로 직렬화하는 등의 처리를 하는 ReturnValueHandler 등이 핸들러 어댑터에서 처리된다. 


><span style = "font-weight:bold;">5. Controller는 비지니스 로직을 수행한다. 데이터를 반환하는 경우에는 주로 ResponseEntity를 반환하게 되고, 응답 페이지를 보여주는 경우라면 String으로 View의 이름을 반환한다.

><span style = "font-weight:bold;">6. HandlerAdapter는 컨트롤러로부터 받은 응답을 응답 처리기인 ReturnValueHandler가 후처리한 후에 디스패처 서블릿으로 돌려준다.  </span> <br><br>컨트롤러가 ResponseEntity를 반환하면 HttpEntityMethodProcessor가 MessageConverter를 사용해 응답 객체를 직렬화하고 응답 상태(HttpStatus)를 설정한다. 만약 컨트롤러가 View 이름을 반환하면 ViewResolver를 통해 View를 반환한다.

><span style = "font-weight:bold;">7. 디스패처 서블릿을 통해 반환되는 응답은 다시 필터들을 거쳐 클라이언트에게 반환된다.



<br>
----
<br>

Reference

- Spring MVC Pattern
    - <a href = 'https://jeonyoungho.github.io/posts/Spring-MVC/'>[개발자 블로그] Spring MVC by jeonyoungho </a>
    - <a href = 'https://velog.io/@kimmy/SpringSpring-MVC-Framework'>Spring MVC Framework by kimmy.log </a>
    - <a href = 'https://www.egovframe.go.kr/wiki/doku.php?id=egovframework:rte:ptl:spring_mvc_architecture'>Spring MVC Architecture by egovframe </a>
    - <a href = 'https://xpmxf4.tistory.com/3'>Spring MVC? MVC 패턴? 뭐가 다른 건가 by xpmxf4.tistory </a>

- 디스패처 서블릿
    - <a href = ' https://mangkyu.tistory.com/18'>Dispatcher-Servlet(디스패처 서블릿)이란? by [MangKyu's Diary:티스토리]</a>

