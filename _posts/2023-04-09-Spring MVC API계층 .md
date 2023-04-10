---
layout: single
title: "[Spring] Security MVC API 계층 "
categories: Spring
tag: [back-end, spring]
toc: true
toc_sticky: true
toc_label: index
toc_icon: "fa-solid fa-indent"
author_profile: false
# sidebar:
#     nav: "docs"
# search: false
---



<br> <br>

## 📚 학습목표

Spring MVC

- Spring MVC란 무엇인지 이해할 수 있다.
- Spring MVC의 동작방식과 구성요소를 이해할 수 있다.

Controller

- API 엔드 포인트인 Controller의 구성 요소를 이해할 수 있다.
- 실제 동작하는 Controller의 기본 기능을 구현할 수 있다.

DTO(Data Transfer Object)

- DTO가 무엇인지 이해할 수 있다
- DTO Validation이 무엇인지 이해할 수 있다.
- Controller에 DTO 클래스를 적용할 수 있다.

<br>

<br>

## 📃 샘플 프로젝트 내용 설명

### 서버용 웹 애플리케이션에서 제공할 기능

<u>고객이 스마트폰 앱을 통해 커피를 주문하기</u>  



- 커피 주문에 필요한 기능 예
  - 제일 먼저 커피 자체에 대한 정보(Coffee)
  - 다음으로 이 커피를 주문하는 고객의 정보(Member)
  - 그리고 고객이 주문하려는 커피의 주문 정보(Order)

기본적으로는 이 세 가지 정보만 있으면 고객은 커피를 주문하고, 주문된 커피를 마실 수 있다.  



<u>하지만 현실적으로 사용자 입장에서 불편하지 않은 애플리케이션</u>으로 완성되려면  

아래 예와 같이 고려해야 될 사항이 꽤 많다.  

- 커피 주문을 위해 더 고려해야 할 사항 예
  - 커피 전문점의 주인이 커피 정보를 등록하는 기능
  - 고객이 주문한 커피에 대한 결제 기능
  - 고객에게 배달을 통해 커피를 전달할 지 매장에 직접 방문해서 가져가게 할 지의 선택 기능
  - 고객이 결제한 커피에 대한 포인트 또는 스탬프에 대한 처리 기능
  - 고객이 결제한 커피에 대한 배달 및 픽업 완료 기능

<br>

**결제 처리같은 외부 연동기능외 구현**  



<br>

<br>

### 📢 이번 포스팅 학습목표.

Spring MVC

- Spring MVC란 무엇인지 이해할 수 있다.
- Spring MVC의 동작방식과 구성요소를 이해할 수 있다.

<br>

----

<br>

## 1️⃣ Spring MVC란?  

Spring MVC는 Spring Framework에서 제공하는 웹 애플리케이션 개발을 위한 모듈 중 하나입니다.   Spring MVC는 Model-View-Controller (MVC) 아키텍처 패턴을 기반으로 하여 웹 애플리케이션의 요청과 응답 처리를 담당합니다.  

Spring MVC의 주요 구성 요소는 다음과 같습니다.

1. **DispatcherServlet**: Spring MVC의 핵심 컴포넌트로, 모든 클라이언트 요청을 처리합니다. 클라이언트 요청이 들어오면 DispatcherServlet은 요청을 처리하기 위해 Controller와 View를 호출합니다.
2. **Controller**: 클라이언트 요청을 처리하고, 비즈니스 로직을 수행한 후에 모델을 생성하거나 수정합니다. Controller는 DispatcherServlet에게 응답할 View의 이름과 전달할 모델 데이터를 반환합니다.
3. **Model**: 애플리케이션의 상태 정보를 나타냅니다. Controller는 모델을 수정하고, View는 모델을 템플릿으로 전달하여 결과를 생성합니다.
4. **View**: 모델 데이터를 이용하여 클라이언트에게 응답을 생성합니다. View는 템플릿 엔진을 이용하여 모델 데이터를 적절하게 렌더링하고, 클라이언트에게 HTML, JSON, XML 등의 응답을 보냅니다.

**<u>Spring MVC는 다른 프레임워크와 달리 설정 파일을 이용하여 애플리케이션을 구성하고 관리합니다.</u>**  

이를 통해 높은 유연성과 확장성을 제공하며, 다양한 기능을 제공하는 다른 Spring 모듈과 통합하여 사용할 수 있습니다. 또한, Spring MVC는 강력한 유효성 검사, 국제화, 보안 및 테스트 지원을 제공하여 웹 애플리케이션 개발을 간편하고 안정적으로 할 수 있습니다.  

<br>

Spring MVC에서 MVC의 전체적인 동작 흐름은 아래와 같습니다. ↓

- Client가 요청 데이터 전송 → Controller가 요청 데이터 수신 → 비즈니스 로직 처리 → Model 데이터 생성 → Controller에게 Model 데이터 전달 → Controller가 View에게 Model 데이터 전달 → View가 응답 데이터 생성

<br>

<br>

#### 🔑**더 알기 쉽게 풀어서 정리:**   

Spring MVC는 웹 애플리케이션을 개발하기 위한 프레임워크 중 하나입니다. 이를 이용하면 쉽게 웹 애플리케이션을 구축하고, 요청과 응답 처리, 데이터 유효성 검사, 보안, 테스트 등 다양한 기능을 제공할 수 있습니다.  

Spring MVC에서는 Model-View-Controller (MVC) 아키텍처 패턴을 사용합니다. 이 패턴은 애플리케이션을 세 가지 요소로 나누어 관리합니다. Controller는 클라이언트로부터 요청을 받아 처리하고, Model을 이용하여 데이터를 생성하고 수정합니다. View는 Model을 이용하여 클라이언트에게 결과를 제공합니다.  

Spring MVC에서는 DispatcherServlet이라는 중심 컴포넌트가 존재합니다. 이는 클라이언트의 요청을 받아 Controller와 View를 호출하여 요청 처리를 담당합니다. Controller에서는 요청을 처리하고, View의 이름과 Model 데이터를 반환합니다. View에서는 이를 이용하여 클라이언트에게 응답을 생성합니다.  

Spring MVC는 XML이나 Java Config 등의 설정 파일을 이용하여 애플리케이션을 구성하고, 관리합니다. 이를 이용하면 높은 유연성과 확장성을 제공하며, 다양한 Spring 모듈과 통합하여 사용할 수 있습니다. 또한, Spring MVC는 유효성 검사, 국제화, 보안 및 테스트를 위한 다양한 기능을 제공하여 개발자가 웹 애플리케이션 개발을 더욱 쉽게, 안정적으로 수행할 수 있도록 지원합니다.   

<br>

#### **핵심Point**  

- Spring MVC는 **웹 프레임워크**의 한 종류이기 때문에 **Spring MVC 프레임워크**라고도 부른다.
- Spring MVC에서 M은 Model을 의미한다.
  - 클라이언트에게 응답으로 돌려주는 **작업의 처리 결과 데이터**를 **Model**이라고 한다.
- Spring MVC에서 V는 View를 의미한다.
  - View는 Model 데이터를 이용해서 웹브라우저 같은 클라이언트 애플리케이션의 화면에 보여지는 리소스(Resource)를 제공한다.
  - 우리가 실질적으로 학습하게 되는 View는 **JSON 포맷**의 데이터를 생성한다.
- Spring MVC에서 C는 Controller를 의미한다.
  - Controller는 클라이언트 측의 요청을 전달 받아 Model과 View의 중간에서 상호 작용을 해주는 역할을 담당한다.

<br>

<br>



## 2️⃣ Spring MVC의 동작방식과 구성요소

![image-20230410163858788](C:\Users\MIN\Desktop\github\mins-github-blog\mins-git.github.io\images\2023-04-09-Spring MVC API계층 \image-20230410163858788.png)

<br> <center> 클라이언트가 요청을 전송했을 때, <br> Spring MVC가 내부적으로 이 요청을 어떻게 처리하는 과정.  </center>

<br>

<br>

(1) 먼저 클라이언트가 요청을 전송하면 `DispatcherServlet`이라는 클래스에 요청이 전달됩니다.

(2) `DispatcherServlet`은 **클라이언트의 요청을 처리할 Controller에 대한 검색**을 HandlerMapping 인터페이스에게 요청합니다.

(3) `HandlerMapping`은 **클라이언트 요청과 매핑되는 핸들러 객체를 다시 DispatcherServlet에게 리턴**해줍니다.

> 핸들러 객체는 해당 핸들러의 **Handler 메서드** 정보를 포함하고 있습니다. **Handler 메서드**는 Controller 클래스 안에 구현된 요청 처리 메서드를 의미합니다.

(4) 요청을 처리할 Controller 클래스를 찾았으니 이제는 **실제로 클라이언트 요청을 처리할 Handler 메서드**를 찾아서 호출해야 합니다. `DispatcherServlet`은 Handler 메서드를 직접 호출하지 않고, HandlerAdpater에게 **Handler 메서드 호출을 위임**합니다.

(5) `HandlerAdapter`는 DispatcherServlet으로부터 전달 받은 Controller 정보를 기반으로 **해당 Controller의 Handler 메서드를 호출**합니다.

이제 전체 처리 흐름의 반환점을 돌았습니다. 이제부터는 반대로 되돌아 갑니다. ^^

(6) `Controller`의 Handler 메서드는 비즈니스 로직 처리 후 리턴 받은 **Model 데이터를 HandlerAdapter에게 전달**합니다.

(7) `HandlerAdapter`는 전달받은 **Model 데이터와 View 정보를 다시 DispatcherServlet에게 전달**합니다.

(8) `DispatcherServlet`은 전달 받은 View 정보를 다시 ViewResolver에게 **전달해서 View 검색을 요청**합니다.

(9) `ViewResolver`는 View 정보에 해당하는 View를 찾아서 **View를 다시 리턴**해줍니다.

(10) `DispatcherServlet`은 ViewResolver로부터 전달 받은 View 객체를 통해 Model 데이터를 넘겨주면서 클라이언트에게 전달할 **응답 데이터 생성을 요청**합니다.

(11) `View`는 응답 데이터를 생성해서 다시 DispatcherServlet에게 전달합니다.

(12) `DispatcherServlet`은 **View로부터 전달 받은 응답 데이터를 최종적으로 클라이언트에게 전달**합니다.  

<br>

<br>



#### 🔑**더 알기 쉽게 풀어서 정리:**   

Spring MVC는 Model-View-Controller(MVC) 패턴을 기반으로 하는 웹 프레임워크입니다. Spring MVC는 클라이언트의 요청을 받아서 처리하고, 응답을 반환하는데 필요한 구성 요소들이 있습니다.  

**Spring MVC의 동작 방식은 다음과 같습니다.**

1. 클라이언트가 요청(Request)을 보냅니다.
2. DispatcherServlet은 요청을 받고, HandlerMapping을 사용하여 적절한 컨트롤러(Controller)를 선택합니다.
3. 선택된 컨트롤러는 클라이언트 요청을 처리하고, 적절한 모델(Model)을 생성합니다.
4. 생성된 모델은 DispatcherServlet에 반환됩니다.
5. DispatcherServlet은 ViewResolver를 사용하여 적절한 뷰(View)를 선택합니다.
6. 선택된 뷰는 모델을 사용하여 클라이언트에게 응답(Response)을 생성합니다. <br>

**Spring MVC의 구성 요소는 다음과 같습니다.**

1. DispatcherServlet: 클라이언트의 모든 요청을 처리하는 중심 컨트롤러입니다. DispatcherServlet은 Spring ApplicationContext에 의해 구성되고, 요청 처리를 위해 HandlerMapping, ViewResolver 및 HandlerExceptionResolver와 같은 다른 구성 요소를 사용합니다.
2. HandlerMapping: DispatcherServlet에게 요청을 처리할 컨트롤러를 알려줍니다. 요청 URL과 일치하는 컨트롤러를 찾아서 반환합니다.
3. Controller: 요청을 처리하는 로직을 구현하는 컴포넌트입니다. 클라이언트의 요청을 받아서 비즈니스 로직을 수행하고, 모델을 반환합니다.
4. Model: 컨트롤러에서 반환되는 데이터입니다. 보통은 Map 형식으로 구성되어 있으며, 뷰에서 사용됩니다.
5. ViewResolver: 요청 처리 결과를 표시할 뷰를 선택합니다. 뷰의 물리적인 위치나 이름을 사용하여 뷰 객체를 찾습니다.
6. View: 요청 처리 결과를 생성하는데 사용됩니다. 보통은 JSP, Thymeleaf, Velocity 등의 템플릿 엔진을 사용합니다.
7. ModelAndView: 컨트롤러에서 반환된 모델과 뷰 정보를 담는 객체입니다.
8. HandlerExceptionResolver: 요청 처리 중에 발생한 예외를 처리합니다. 예외가 발생하면 DispatcherServlet은 이 구성 요소를 사용하여 예외를 처리합니다. <br>

이러한 구성 요소들은 Spring ApplicationContext에 등록되어 있으며, DispatcherServlet이 요청을 처리할 때 이러한 구성 요소들이 상호 작용하여 처리 결과를 생성합니다.

<br>

<br>



#### **핵심Point**  

- Spring MVC의 요청 처리 흐름
  - 클라이언트의 요청을 제일 먼저 전달 받는 구성요소는 DispatcherServlet이다.
  - DispatcherServlet은 HandlerMapping 인터페이스에게 Controller의 검색을 위임한다.
  - DispatcherServlet은 검색된 Controller 정보를 토대로 HandlerAdapter 인터페이스에게 Controller 클래스내에 있는 Handler 메서드의 호출을 위임한다.
  - HandlerAdapter 인터페이스는 Controller 클래스의 Handler 메서드를 호출한다.
  - DispatcherServlet은 ViewResolver에게 View의 검색을 위임한다.
  - DispatcherServlet은 View에게 Model 데이터를 포함한 응답 데이터 생성을 위임한다.
  - DispatcherServlet은 최종 응답 데이터를 클라이언트에게 전달한다.
- DispatcherServlet이 애플리케이션의 가장 앞단에 배치되어 다른 구성요소들과 상호작용하면서 클라이언트의 요청을 처리하는 패턴을 **Front Controller Pattern**이라고 한다.

<br>

<br>

<br>



### 🔖 알아가야하는 용어

**Servlet?**  

Servlet은 웹 애플리케이션 서버에서 동작하는 자바 프로그램으로, HTTP 요청과 응답을 처리하는 데 사용됩니다. Servlet은 동적인 웹 페이지, 웹 어플리케이션, RESTful 웹 서비스 등 다양한 웹 애플리케이션을 개발하는 데 사용됩니다.

Servlet은 Java Servlet API를 통해 개발됩니다. 이 API를 사용하면 HTTP 요청 및 응답에 대한 처리를 수행하는 클래스를 만들 수 있습니다. 이러한 클래스는 웹 컨테이너(예: Tomcat, Jetty 등)에서 실행되며, HTTP 요청을 받아 처리하고, HTTP 응답을 생성하여 클라이언트에게 반환합니다.

Servlet은 일반적으로 Java 웹 애플리케이션의 서버 측 로직을 작성하는 데 사용됩니다. 예를 들어, Servlet은 데이터베이스에서 데이터를 검색하여 HTML 문서로 변환하는 웹 페이지를 동적으로 생성하거나, HTTP 요청에 대한 인증 및 권한 부여를 수행하는 등의 작업을 수행합니다.

Servlet은 HTTP 요청 및 응답을 처리하기 위해 다양한 메서드 및 이벤트 콜백을 제공합니다. 이러한 메서드를 재정의하고 이벤트 콜백을 사용하여 Servlet을 개발하면, HTTP 요청에 대한 처리를 커스터마이징할 수 있습니다.  

<br>

<br>

**DispatcherServlet의 역할**

Spring MVC의 요청 처리 흐름을 가만히 살펴보면 `DispatcherServlet`이 굉장히 많은 일을 하는 것처럼 보입니다.

클라이언트로부터 요청을 전달 받으면 HandlerMapping, HandlerAdapter, ViewResolver, View 등 대부분의 Spring MVC 구성 요소들과 상호 작용을 하고 있는 것을 볼 수 있습니다.

그런데 DispatcherServlet이 굉장히 바빠보이지만 실제로 요청에 대한 처리는 다른 구성 요소들에게 **위임(Delegate)**하고 있습니다.

마치 “HandlerMapping(핸들러매핑)아 Handler Controller 좀 찾아줄래? → ViewResolver(뷰리졸버)야 View 좀 찾아줄래? → View야 Model 데이터를 합쳐서 컨텐츠 좀 만들어 줄래?” 라고 하는것과 같습니다.

이처럼 DispatcherServlet이 애플리케이션의 가장 앞단에 배치되어 다른 구성요소들과 상호작용하면서 클라이언트의 요청을 처리하는 패턴을 **Front Controller Pattern**이라고 합니다.

<br>

<br>



##### 🔗 도움될만한 url  

1.  JSON의 표기법과 사용법을 익숙하게 하기위한 링크 ↓

- https://ko.wikipedia.org/wiki/JSON

2.  아래 링크는 JSON 포맷의 문자열을 Java 클래스로 변경해주는 온라인 툴↓  <br> (JSON 포맷의 문자열이 Java에서 어떻게 표현되는지 연습해 볼 수 있다.)

* https://jsonformatter.org/json-to-java  

<br>





