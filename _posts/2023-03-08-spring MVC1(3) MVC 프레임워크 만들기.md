# 0. 프론트 컨트롤러 패턴 소개

- ![image-20230308211958964](../images/2023-03-08-spring MVC1(3) MVC 프레임워크 만들기/image-20230308211958964.png)

- FrontController 패턴 특징 
  - 프론트 컨트롤러 서블릿 하나로 클라이언트의 요청을 받음 
  - 프론트 컨트롤러가 요청에 맞는 컨트롤러를 찾아서 호출 입구를 하나로! 
  - 공통 처리 가능 
  - 프론트 컨트롤러를 제외한 나머지 컨트롤러는 서블릿을 사용하지 않아도 됨
- 스프링 웹 MVC의 DispatcherServlet이 FrontController 패턴으로 구현되어 있음

# 1. 프론트 컨트롤러 도입 - v1

- 프론트 컨트롤러를 단계적으로 도입한다. (version 관리)
- 점진적 리팩토링을 한다.

## V1 구조

- ![image-20230308214942874](../images/2023-03-08-spring MVC1(3) MVC 프레임워크 만들기/image-20230308214942874.png)

## ControllerV1

- hello.servlet.web.frontcontroller.v1

- ```java
  package hello.servlet.web.frontcontroller.v1;
  
  import jakarta.servlet.ServletException;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  
  import java.io.IOException;
  
  public interface ControllerV1 {
      void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException;
  }
  
  ```

  - 서블릿과 비슷한 모양의 컨트롤러 인터페이스를 도입한다. 
  - 각 컨트롤러들은 이 인터페이스를 구현하면 된다. 프론트 컨트롤러는 이 인터페이스를 호출해서 구현과 관계없이 로직의 일관성을 가져갈 수 있다.

## MemberFormControllerV1 - 회원 등록 컨트롤러

- hello.servlet.web.frontcontroller.v1.controller

- ```java
  package hello.servlet.web.frontcontroller.v1.controller;
  
  import hello.servlet.web.frontcontroller.v1.ControllerV1;
  import jakarta.servlet.RequestDispatcher;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  
  import java.io.IOException;
  
  public class MemberFormControllerV1 implements ControllerV1 {
  
      @Override
      public void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  
          String viewPath = "/WEB-INF/views/new-form.jsp";
          RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
          dispatcher.forward(request, response);
      }
  }
  ```

  - 코드는 Servlet - jsp MVC 패턴 사용 시(MvcMemberFormServlet)랑 똑같다.
  - ControllerV1 인터페이스를 상속받는다.

## MemberSaveControllerV1 - 회원 저장 컨트롤러

- 마찬가지로 어노테이션과 상속관계 빼고는 다 똑같다.

- ```java
  package hello.servlet.web.frontcontroller.v1.controller;
  
  import hello.servlet.domain.member.Member;
  import hello.servlet.domain.member.MemberRepository;
  import hello.servlet.web.frontcontroller.v1.ControllerV1;
  import jakarta.servlet.RequestDispatcher;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  
  import java.io.IOException;
  
  public class MemberSaveControllerV1 implements ControllerV1 {
  
      private MemberRepository memberRepository = MemberRepository.getInstance();
  
      @Override
      public void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
          String username = request.getParameter("username");
          int age = Integer.parseInt(request.getParameter("age"));
  
          Member member = new Member(username, age);
          memberRepository.save(member);
  
          request.setAttribute("member", member);
  
          String viewPath = "/WEB-INF/views/save-result.jsp";
          RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
          dispatcher.forward(request, response);
      }
  }
  ```

## MemberListControllerV1 - 회원 목록 컨트롤러

- ```java
  package hello.servlet.web.frontcontroller.v1.controller;
  
  import hello.servlet.domain.member.Member;
  import hello.servlet.domain.member.MemberRepository;
  import hello.servlet.web.frontcontroller.v1.ControllerV1;
  import jakarta.servlet.RequestDispatcher;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  
  import java.io.IOException;
  import java.util.List;
  
  public class MemberListControllerV1 implements ControllerV1 {
  
      MemberRepository memberRepository = MemberRepository.getInstance();
  
      @Override
      public void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
          List<Member> members = memberRepository.findAll();
  
          request.setAttribute("members", members);
  
          String viewPath = "/WEB-INF/views/members.jsp";
          RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
          dispatcher.forward(request, response);
      }
  }
  ```

## FrontControllerServletV1 - 프론트 컨트롤러

- hello.servlet.web.frontcontroller.v1 -> ControllerV1 과 같은 디렉토리

- ```java
  package hello.servlet.web.frontcontroller.v1;
  
  import hello.servlet.web.frontcontroller.v1.controller.MemberFormControllerV1;
  import hello.servlet.web.frontcontroller.v1.controller.MemberListControllerV1;
  import hello.servlet.web.frontcontroller.v1.controller.MemberSaveControllerV1;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.annotation.WebServlet;
  import jakarta.servlet.http.HttpServlet;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  
  import java.io.IOException;
  import java.util.HashMap;
  import java.util.Map;
  
  //front-controller/v1 하위에 있는 모든 url 은 이 컨트롤러를 거침
  @WebServlet(name = "frontControllerServletV1", urlPatterns = "/front-controller/v1/*")
  public class FrontControllerServletV1 extends HttpServlet {
  
      private Map<String, ControllerV1> controllerMap = new HashMap<>();
  
      //생성자로, 호출되면 controllerMap 에 key, value 값으로 url 을 매핑한다.
      public FrontControllerServletV1() {
          controllerMap.put("/front-controller/v1/members/new-form", new MemberFormControllerV1());
          controllerMap.put("/front-controller/v1/members/save", new MemberSaveControllerV1());
          controllerMap.put("/front-controller/v1/members", new MemberListControllerV1());
      }
  
      @Override
      protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
          System.out.println("FrontControllerServletV1.service");
  
          String requestURI = request.getRequestURI();
  
          // HashMap 에서 new MemberxxxController() 를 찾는다.
          ControllerV1 controller = controllerMap.get(requestURI);
          if(controller == null){
              response.setStatus(HttpServletResponse.SC_NOT_FOUND);
              return;
          }
  
          controller.process(request, response);
      }
  }
  
  ```

### urlPatterns

- urlPatterns = "/front-controller/v1/*" 
  - /front-controller/v1 를 포함한 하위 모든 요청은 이 서블릿에서 받아들인다. 
  - 예) /front-controller/v1 , /front-controller/v1/a , /front-controller/v1/a/b 등등...

### controllerMap

- key: 매핑, URL value: 호출될 컨트롤러
- Map 을 통해 url 키와 value 값을 생성자로 미리 선언해준다.

### service()

- request.getRequestURI(); 을 통해 현재 페이지의 URI 를 받아서 String requestURI 에 넣는다.
- requestURI 를 통해 HashMap 에서 new MemberxxxController() 를 찾는다.
  - `ControllerV1 controller = controllerMap.get(requestURI);`
  - 없으면 statue 404 return
- `ControllerV1 controller = controllerMap.get(requestURI);` 를 통해 controller 클래스가 해당 URI 클래스로 변경되었으므로 controller.process 로 해당 컨트롤러를 호출하여 JSP 를 통해 HTML 을 응답한다.

### JSP

- JSP는 이전 MVC에서 사용했던 것을 그대로 사용한다.

# 2. View 분리 - v2

- 모든 컨트롤러에서 뷰로 이동하는 부분에 중복이 있고, 깔끔하지 않다.

  - ```java
    String viewPath = "/WEB-INF/views/new-form.jsp";
    RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
    dispatcher.forward(request, response);
    ```

  - 이 부분을 깔끔하게 분리하기 위해 별도로 뷰를 처리하는 객체를 만든다.

## V2 구조

- ![image-20230309104931360](../images/2023-03-08-spring MVC1(3) MVC 프레임워크 만들기/image-20230309104931360.png)

## MyView

- `hello.servlet.web.frontcontroller` : 이후 다른 버전에서도 함께 사용

- ```java
  package hello.servlet.web.frontcontroller;
  
  import jakarta.servlet.RequestDispatcher;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  
  import java.io.IOException;
  
  public class MyView {
      private String viewPath;
  
      public MyView(String viewPath) {
          this.viewPath = viewPath;
      }
  
      public void render(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
          RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
          dispatcher.forward(request, response);
      }
  }
  ```

- viewPath 를 받아서 dispatcher.forward 를 통해 jsp 로 보낸다.

## ControllerV2

-  `hello.servlet.web.frontcontroller.v2`

- Controller 인터페이스로, MyView 를 반환한다.

- ```java
  package hello.servlet.web.frontcontroller.v2;
  
  import hello.servlet.web.frontcontroller.MyView;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  
  import java.io.IOException;
  
  public interface ControllerV2 {
      MyView process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException;
  
  }
  ```

## MemberFormControllerV2 - 회원 등록 폼

- 아래 컨트롤러들은 V1 에서 dispatcher.forward() 를 뺀 코드이다. (MyView 에서 구현하는 코드들)

- ```java
  package hello.servlet.web.frontcontroller.v2.controller;
  
  import hello.servlet.web.frontcontroller.MyView;
  import hello.servlet.web.frontcontroller.v2.ControllerV2;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  
  import java.io.IOException;
  
  public class MemberFormControllerV2 implements ControllerV2 {
  
      @Override
      public MyView process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
          return new MyView("/WEB-INF/views/new-form.jsp");
      }
  }
  ```

- 이제 각 컨트롤러는 복잡한 dispatcher.forward() 를 직접 생성해서 호출하지 않아도 된다. 
- 단순히 MyView 객체를 생성하고 거기에 뷰 이름만 넣고 반환하면 된다.

## MemberSaveControllerV2 - 회원 저장

- 

- ```java
  package hello.servlet.web.frontcontroller.v2.controller;
  
  import hello.servlet.domain.member.Member;
  import hello.servlet.domain.member.MemberRepository;
  import hello.servlet.web.frontcontroller.MyView;
  import hello.servlet.web.frontcontroller.v2.ControllerV2;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  
  import java.io.IOException;
  
  public class MemberSaveControllerV2 implements ControllerV2 {
  
      private MemberRepository memberRepository = MemberRepository.getInstance();
  
      @Override
      public MyView process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  
          String username = request.getParameter("username");
          int age = Integer.parseInt(request.getParameter("age"));
  
          Member member = new Member(username, age);
          memberRepository.save(member);
  
          //Model 에 데이터를 보관해야 한다.
          request.setAttribute("member", member);
  
          return new MyView("/WEB-INF/views/save-result.jsp");
      }
  }
  ```

## MemberListControllerV2 - 회원 목록

- ```java
  package hello.servlet.web.frontcontroller.v2.controller;
  
  import hello.servlet.domain.member.Member;
  import hello.servlet.domain.member.MemberRepository;
  import hello.servlet.web.frontcontroller.MyView;
  import hello.servlet.web.frontcontroller.v2.ControllerV2;
  import jakarta.servlet.RequestDispatcher;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  
  import java.io.IOException;
  import java.util.List;
  
  public class MemberListControllerV2 implements ControllerV2 {
  
      MemberRepository memberRepository = MemberRepository.getInstance();
  
      @Override
      public MyView process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
          List<Member> members = memberRepository.findAll();
  
          //model 에 담는 방법
          request.setAttribute("members", members);
  
          return new MyView("/WEB-INF/views/members.jsp");
      }
  }
  
  ```

## 프론트 컨트롤러 V2

- ```java
  package hello.servlet.web.frontcontroller.v2;
  
  import hello.servlet.web.frontcontroller.MyView;
  import hello.servlet.web.frontcontroller.v2.ControllerV2;
  import hello.servlet.web.frontcontroller.v2.controller.MemberFormControllerV2;
  import hello.servlet.web.frontcontroller.v2.controller.MemberListControllerV2;
  import hello.servlet.web.frontcontroller.v2.controller.MemberSaveControllerV2;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.annotation.WebServlet;
  import jakarta.servlet.http.HttpServlet;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  
  import java.io.IOException;
  import java.util.HashMap;
  import java.util.Map;
  
  //front-controller/v1 하위에 있는 모든 url 은 이 컨트롤러를 거침
  @WebServlet(name = "frontControllerServletV2", urlPatterns = "/front-controller/v2/*")
  public class FrontControllerServletV2 extends HttpServlet {
  
      private Map<String, ControllerV2> controllerMap = new HashMap<>();
  
      public FrontControllerServletV2() {
          controllerMap.put("/front-controller/v2/members/new-form", new MemberFormControllerV2());
          controllerMap.put("/front-controller/v2/members/save", new MemberSaveControllerV2());
          controllerMap.put("/front-controller/v2/members", new MemberListControllerV2());
      }
  
      @Override
      protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  
          String requestURI = request.getRequestURI();
  
          ControllerV2 controller = controllerMap.get(requestURI);
          if(controller == null){
              response.setStatus(HttpServletResponse.SC_NOT_FOUND);
              return;
          }
  
          MyView view = controller.process(request, response);
          view.render(request, response);
  
      }
  }
  ```

  - controller.process 의 반환결과가 MyView 이다. 따라서 프론트 컨트롤러에서 그 반환결과를 통해 view.render 로 렌더링 한다. (JSP 수행)
  - 프론트 컨트롤러의 도입으로 MyView 객체의 render() 를 호출하는 부분을 모두 일관되게 처리할 수 있다. 
  - 각각의 컨트롤러는 MyView 객체를 생성만 해서 반환하면 된다.

# 3. Model 추가 - v3

## 서블릿 종속성 제거

- 요청 파라미터 정보는 자바의 Map으로 대신 넘기도록 하면 지금 구조에서는 컨트롤러가 서블릿 기술을 몰라도 동작할 수 있다.
- 그리고 request 객체를 Model로 사용하는 대신에 별도의 Model 객체를 만들어서 반환하면 된다.
- 우리가 구현하는 컨트롤러가 서블릿 기술을 전혀 사용하지 않도록 변경해보자. 
- 이렇게 하면 구현 코드도 매우 단순해지고, 테스트 코드 작성이 쉽다.

## 뷰 이름 중복 제거

- 컨트롤러는 뷰의 논리 이름을 반환하고, 실제 물리 위치의 이름은 프론트 컨트롤러에서 처리하도록 단순화 하자.
- 이렇게 해두면 향후 뷰의 폴더 위치가 함께 이동해도 프론트 컨트롤러만 고치면 된다. 
  - /WEB-INF/views/new-form.jsp -> new-form 
  - /WEB-INF/views/save-result.jsp -> save-result 
  - /WEB-INF/views/members.jsp -> members

## V3 구조

- ![image-20230309115510981](../images/2023-03-08-spring MVC1(3) MVC 프레임워크 만들기/image-20230309115510981.png)
  1. FrontController 에서 HTTP 요청이 오면 `Map controllerMap` 을 통해 컨트롤러를 조회한다. (어떤 컨트롤러를 써야하는지)
  2. FrontController 는 `controllerMap.get(requestURI)` 를 통해 해당 컨트롤러를 호출한다.
  3. 컨트롤러는 받은 request 정보(매핑된 쿼리 key, value 값)를 통해 ModelView 형식으로 반환한다.
     - ModelView 에는 viewName(뷰 위치 논리값), Map<> model(반환 정보) 가 있다.
  4. FrontController 는 컨트롤러에게서 받은 ModelView 에서 viewName 을 꺼내서 viewResolver 에서 보낸다.
  5. viewResolver 는 해당 주소 논리값을 물리값으로 바꾸고 FrontController 로 리턴한다.
     - ex) "save-result" -> "/WEB-INF/views/save-result.jsp"
  6. FrontController 는 viewResolver 에게 받은 주소 물리값을 통해 Myview 를 호출하고, ModelView 에서 받은 Map<> model(반환 정보) 으로 `view.render(mv.getModel(), request, response);` 를 통해 MyView 로 응답한다.
  7. 개어렵다!

## ModelView

- 서블릿의 종속성을 제거하기 위해 Model을 직접 만들고, 추가로 View 이름까지 전달하는 객체를 만들어본다.

- ```java
  package hello.servlet.web.frontcontroller;
  
  import lombok.Getter;
  import lombok.Setter;
  import java.util.HashMap;
  import java.util.Map;
  
  @Getter @Setter
  public class ModelView {
      private String viewName;
      private Map<String, Object> model = new HashMap<>();
  
      public ModelView(String viewName) {
          this.viewName = viewName;
      }
  }
  ```

  - 저장하는 요소 
    - viewName (url 논리 값)
    - Map<> model (controller 에서 받은 정보)
  - 생성자는 viewName 으로 생성된다.
  - model은 단순히 map으로 되어 있으므로 컨트롤러에서 뷰에 필요한 데이터를 key, value로 넣어주면 된다.

## ControllerV3

- ```java
  package hello.servlet.web.frontcontroller.v3;
  
  import hello.servlet.web.frontcontroller.ModelView;
  
  import java.util.Map;
  
  public interface ControllerV3 {
  
      ModelView process(Map<String, String> paramMap);
  }
  
  ```

  - 이 컨트롤러는 서블릿 기술을 전혀 사용하지 않는다.
  - 따라서 구현이 매우 단순해지고, 테스트 코드 작성시 테스트 하기 쉽다.
  - HttpServletRequest가 제공하는 파라미터는 프론트 컨트롤러가 paramMap에 담아서 호출해주면 된다.
  - 응답 결과로 뷰 이름과 뷰에 전달할 Model 데이터를 포함하는 ModelView 객체를 반환하면 된다.

## MemberFormControllerV3 - 회원 등록 폼

- ```java
  package hello.servlet.web.frontcontroller.v3.controller;
  
  import hello.servlet.web.frontcontroller.ModelView;
  import hello.servlet.web.frontcontroller.v3.ControllerV3;
  
  import java.util.Map;
  
  public class MemberFormControllerV3 implements ControllerV3 {
      @Override
      public ModelView process(Map<String, String> paramMap) {
          return new ModelView("new-form");
      }
  }
  
  ```

  - ModelView 를 생성할 때 new-form 이라는 view의 논리적인 이름을 지정한다. 실제 물리적인 이름은 프론트 컨트롤러에서 처리한다.
  - 회원 등록 폼은 return 할 정보가 없으므로 바로 viewName 만 보내면 된다.

## MemberSaveControllerV3 - 회원 저장

- ```java
  package hello.servlet.web.frontcontroller.v3.controller;
  
  import hello.servlet.domain.member.Member;
  import hello.servlet.domain.member.MemberRepository;
  import hello.servlet.web.frontcontroller.ModelView;
  import hello.servlet.web.frontcontroller.v3.ControllerV3;
  
  import java.util.Map;
  
  public class MemberSaveControllerV3 implements ControllerV3 {
  
      private MemberRepository memberRepository = MemberRepository.getInstance();
  
      @Override
      public ModelView process(Map<String, String> paramMap) {
          String username = paramMap.get("username");
          int age = Integer.parseInt(paramMap.get("age"));
  
          Member member = new Member(username, age);
          memberRepository.save(member);
  
          ModelView mv = new ModelView("save-result");
          mv.getModel().put("member", member);
          return mv;
      }
  }
  ```

  - 파라미터 정보는 paramMap 에 담겨있으므로 꺼내서 memberRepository 에 저장하면 된다.
  - 그리고 ModelView 로 반환하기 위해 `"save-result"`로 생성 후 ModelView 의 Model<String, Object> 에 put 으로 넣어주고 반환해준다.

## MemberListControllerV3 - 회원 목록

- ```java
  package hello.servlet.web.frontcontroller.v3.controller;
  
  import hello.servlet.domain.member.Member;
  import hello.servlet.domain.member.MemberRepository;
  import hello.servlet.web.frontcontroller.ModelView;
  import hello.servlet.web.frontcontroller.v3.ControllerV3;
  
  import java.util.List;
  import java.util.Map;
  
  public class MemberListControllerV3 implements ControllerV3 {
  
      private MemberRepository memberRepository = MemberRepository.getInstance();
  
      @Override
      public ModelView process(Map<String, String> paramMap) {
          List<Member> members = memberRepository.findAll();
  
          ModelView mv = new ModelView("members");
          mv.getModel().put("members", members);
          return mv;
      }
  }
  ```

  - 마찬가지로 memberRepository 에서 findAll() 을 한 후 모든 members 를 ModelView 에 넣어서 반환해준다.
    - 그러면 FrontController 가 알아서 처리해줄 것이다!

## FrontControllerServletV3

- ```java
  package hello.servlet.web.frontcontroller.v3;
  
  import hello.servlet.web.frontcontroller.ModelView;
  import hello.servlet.web.frontcontroller.MyView;
  import hello.servlet.web.frontcontroller.v2.ControllerV2;
  import hello.servlet.web.frontcontroller.v3.controller.MemberFormControllerV3;
  import hello.servlet.web.frontcontroller.v3.controller.MemberListControllerV3;
  import hello.servlet.web.frontcontroller.v3.controller.MemberSaveControllerV3;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.annotation.WebServlet;
  import jakarta.servlet.http.HttpServlet;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  
  import java.io.IOException;
  import java.sql.SQLOutput;
  import java.util.HashMap;
  import java.util.Map;
  
  @WebServlet(name = "frontControllerServletV3", urlPatterns = "/front-controller/v3/*")
  public class FrontControllerServletV3 extends HttpServlet {
  
      private Map<String, ControllerV3> controllerMap = new HashMap<>();
  
      public FrontControllerServletV3() {
          controllerMap.put("/front-controller/v3/members/new-form", new MemberFormControllerV3());
          controllerMap.put("/front-controller/v3/members/save", new MemberSaveControllerV3());
          controllerMap.put("/front-controller/v3/members", new MemberListControllerV3());
      }
  
      @Override
      protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  
          //1
          String requestURI = request.getRequestURI();
  
          ControllerV3 controller = controllerMap.get(requestURI);
          if(controller == null){
              response.setStatus(HttpServletResponse.SC_NOT_FOUND);
              return;
          }
  
          //2
          Map<String, String> paramMap = createParamMap(request);
          ModelView mv = controller.process(paramMap);
  
          //3
          String viewName = mv.getViewName(); //논리이름 new-form
          MyView view = viewResolver(viewName);
  
          //4 
          view.render(mv.getModel(), request, response);
  
      }
  
      private static MyView viewResolver(String viewName) {
          return new MyView("/WEB-INF/views/" + viewName + ".jsp");
      }
  
      private static Map<String, String> createParamMap(HttpServletRequest request) {
          Map<String, String> paramMap = new HashMap<>();
          request.getParameterNames().asIterator()
                  .forEachRemaining(paramName -> paramMap.put(paramName, request.getParameter(paramName)));
          return paramMap;
      }
  }
  
  ```

  1. 이전과 같이 URI 를 통해 컨트롤러를 매핑한다.
  2. `createParamMap(request)` 를 통해 Map<String, String> paramMap 을 생성한다. 그 paramMap 으로 `controller.process(paramMap)` 를 실행한다. 그렇게 되면 controller 에서 ModelView 를 반환해준다.
     1. createParamMap 으로 request 에서 parameter 를 하나씩 꺼내서 <key, value> 형태로 매핑한 후 반환해준다.
     2. 이 값을 개별 컨트롤러들은 받아서 ModelView 로 viewName 과 model 을 FrontController 로 다시 반환해준다.
  3. `mv.getViewName()` 을 통해 방금 개별 컨트롤러에게 받은 viewName (논리 이름) 을 받아서 `viewResolver(viewName);` 를 통해 실제값으로 바꾼다. 이후 그 값으로 jsp 를 호출할 수 있는 MyView 를 호출한다.
  4. `view.render`을 호출한다. 이때 생성자에 `mv.getModel()` 을 포함시켜서 개별 컨트롤러에게 받은 model 을 다시 jsp 로 반환해준다.

# 4. 단순하고 실용적인 컨트롤러 - v4

- 앞서 만든 v3 는  항상 ModelView 객체를 생성하고 반환해야 하는 부분이 조금은 번거롭다.
- 좋은 프레임워크는 아키텍처도 중요하지만, 그와 더불어 실제 개발하는 개발자가 단순하고 편리하게 사용할 수 있어야 한다. 소위 실용성이 있어야 한다.

## V4 구조

- ![image-20230309130256542](../images/2023-03-08-spring MVC1(3) MVC 프레임워크 만들기/image-20230309130256542.png)

- 기본적인 구조는 V3 와 같다.
- 대신에 컨트롤러가 ModelView 를 반환하지 않고, ViewName 만 반환한다.
- 2번에서 FrontController 는 paramMap(parameter 정보) 과 model (저장해야 할 공간) 을 Controller 에 주고, 개별 컨트롤러는 model 을 수정한다.

## ControllerV4

- ```java
  package hello.servlet.web.frontcontroller.v4;
  
  import java.util.Map;
  
  public interface ControllerV4 {
      /**
       *
       * @param paramMap
       * @param model
       * @return viewName
       */
      String process(Map<String, String> paramMap, Map<String, Object> model);
  }
  ```

- 이번 버전은 인터페이스에 ModelView가 없다. 
- model 객체는 파라미터로 전달되기 때문에 그냥 사용하면 되고, 결과로 뷰의 이름만 반환해주면 된다.

## MemberFormControllerV4

- ```java
  package hello.servlet.web.frontcontroller.v4.controller;
  
  import hello.servlet.web.frontcontroller.v4.ControllerV4;
  
  import java.util.Map;
  
  public class MemberFormControllerV4 implements ControllerV4 {
      @Override
      public String process(Map<String, String> paramMap, Map<String, Object> model) {
          return "new-form";
      }
  }
  
  ```

- 단순하게 new-form 이라는 뷰의 논리 이름만 반환하면 된다.

## MemberSaveControllerV4

- ```java
  package hello.servlet.web.frontcontroller.v4.controller;
  
  import hello.servlet.domain.member.Member;
  import hello.servlet.domain.member.MemberRepository;
  import hello.servlet.web.frontcontroller.ModelView;
  import hello.servlet.web.frontcontroller.v4.ControllerV4;
  
  import java.util.Map;
  
  public class MemberSaveControllerV4 implements ControllerV4 {
  
      private MemberRepository memberRepository = MemberRepository.getInstance();
  
      @Override
      public String process(Map<String, String> paramMap, Map<String, Object> model) {
          String username = paramMap.get("username");
          int age = Integer.parseInt(paramMap.get("age"));
  
          Member member = new Member(username, age);
          memberRepository.save(member);
  
          model.put("member", member);
          return "save-result";
      }
  }
  
  ```

  - `model.put("member", member)` : 모델이 파라미터로 전달되기 때문에, 모델을 직접 생성하지 않아도 된다.

## MemberListControllerV4

- ```java
  package hello.servlet.web.frontcontroller.v4.controller;
  
  import hello.servlet.domain.member.Member;
  import hello.servlet.domain.member.MemberRepository;
  import hello.servlet.web.frontcontroller.v4.ControllerV4;
  
  import java.util.List;
  import java.util.Map;
  
  public class MemberListControllerV4 implements ControllerV4 {
  
      private MemberRepository memberRepository = MemberRepository.getInstance();
  
      @Override
      public String process(Map<String, String> paramMap, Map<String, Object> model) {
  
          List<Member> members = memberRepository.findAll();
  
          model.put("members", members);
          return "members";
      }
  }
  
  ```

  - memberRepository 에서 members 를 꺼낸 후 model 에 넣어주면 된다.

## FrontControllerServletV4

- 

- ```java
  package hello.servlet.web.frontcontroller.v4;
  
  import hello.servlet.web.frontcontroller.ModelView;
  import hello.servlet.web.frontcontroller.MyView;
  import hello.servlet.web.frontcontroller.v4.ControllerV4;
  import hello.servlet.web.frontcontroller.v4.controller.MemberFormControllerV4;
  import hello.servlet.web.frontcontroller.v4.controller.MemberListControllerV4;
  import hello.servlet.web.frontcontroller.v4.controller.MemberSaveControllerV4;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.annotation.WebServlet;
  import jakarta.servlet.http.HttpServlet;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  
  import java.io.IOException;
  import java.util.HashMap;
  import java.util.Map;
  
  @WebServlet(name = "frontControllerServletV4", urlPatterns = "/front-controller/v4/*")
  public class FrontControllerServletV4 extends HttpServlet {
  
      private Map<String, ControllerV4> controllerMap = new HashMap<>();
  
      public FrontControllerServletV4() {
          controllerMap.put("/front-controller/v4/members/new-form", new MemberFormControllerV4());
          controllerMap.put("/front-controller/v4/members/save", new MemberSaveControllerV4());
          controllerMap.put("/front-controller/v4/members", new MemberListControllerV4());
      }
  
      @Override
      protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  
          String requestURI = request.getRequestURI();
          ControllerV4 controller = controllerMap.get(requestURI);
          if(controller == null){
              response.setStatus(HttpServletResponse.SC_NOT_FOUND);
              return;
          }
  
          //1
          Map<String, String> paramMap = createParamMap(request);
          Map<String, Object> model = new HashMap<>(); //추가
  
          //2
          String viewName = controller.process(paramMap, model);
  
          //3
          MyView view = viewResolver(viewName);
          view.render(model, request, response);
  
      }
  
      private static MyView viewResolver(String viewName) {
          return new MyView("/WEB-INF/views/" + viewName + ".jsp");
      }
  
      private static Map<String, String> createParamMap(HttpServletRequest request) {
          Map<String, String> paramMap = new HashMap<>();
          request.getParameterNames().asIterator()
                  .forEachRemaining(paramName -> paramMap.put(paramName, request.getParameter(paramName)));
          return paramMap;
      }
  }
  ```

  1. request 정보를 받는 paramMap 과 개별 컨트롤러에서 정보를 받을 model 을 생성한다.
  2. `controller.process(paramMap, model)` 로 viewName 을 리턴받는다. 
     - 이 때 1번에서 넘겨줬던 model 에 정보가 담겨서 온다.
  3. viewResolver 로 뷰의 논리값을 물리 값으로 변경하고, `view.render` 로 jsp 로 값을 넘겨준다.

### 모델 객체 전달

- `Map model = new HashMap<>(); //추가`
- 모델 객체를 프론트 컨트롤러에서 생성해서 넘겨준다. 컨트롤러에서 모델 객체에 값을 담으면 여기에 그대로 담겨있게 된다.

# 5. 유연한 컨트롤러1 - v5

## 어댑터 패턴

- 지금까지 우리가 개발한 프론트 컨트롤러는 한가지 방식의 컨트롤러 인터페이스만 사용할 수 있다.
-  ControllerV3 , ControllerV4 는 완전히 다른 인터페이스이다. 
- 따라서 호환이 불가능하다. 마치 v3는 110v이고, v4는 220v 전기 콘센트 같은 것이다. 
- 이럴 때 사용하는 것이 바로 어댑터이다. 어댑터 패턴을 사용해서 프론트 컨트롤러가 다양한 방식의 컨트롤러를 처리할 수 있도록 변경해보자.

## V5 구조

- ![image-20230309145638730](../images/2023-03-08-spring MVC1(3) MVC 프레임워크 만들기/image-20230309145638730.png)

- 핸들러 어댑터: 중간에 어댑터 역할을 하는 어댑터가 추가되었는데 이름이 핸들러 어댑터이다. 여기서 어댑터 역할을 해주는 덕분에 다양한 종류의 컨트롤러를 호출할 수 있다. 
- 핸들러: 컨트롤러의 이름을 더 넓은 범위인 핸들러로 변경했다. 그 이유는 이제 어댑터가 있기 때문에 꼭 컨트롤러의 개념 뿐만 아니라 어떠한 것이든 해당하는 종류의 어댑터만 있으면 다 처리할 수 있기 때문이다.

## MyHandlerAdapter

- 어댑터는 이렇게 구현해야 한다는 어댑터용 인터페이스이다.

- ```java
  package hello.servlet.web.frontcontroller.v5;
  
  import hello.servlet.web.frontcontroller.ModelView;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  
  import java.io.IOException;
  
  public interface MyHandlerAdapter {
  
      //지원되는 handler 인지 아닌지 확인
      boolean supports(Object handler);
  
      //FrontController 에서 받은 값을 처리해서 ModelView 로 반환
      ModelView handle(HttpServletRequest request, HttpServletResponse response, Object handler) throws ServletException, IOException;
  }
  
  ```

## ControllerV3HandlerAdapter (ControllerV3를 지원하는 어댑터)

- 

- ```java
  package hello.servlet.web.frontcontroller.v5.adapter;
  
  import hello.servlet.web.frontcontroller.ModelView;
  import hello.servlet.web.frontcontroller.v3.ControllerV3;
  import hello.servlet.web.frontcontroller.v5.MyHandlerAdapter;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  
  import java.io.IOException;
  import java.util.HashMap;
  import java.util.Map;
  
  public class ControllerV3HandlerAdapter implements MyHandlerAdapter {
  
      //ControllerV3 을 처리할 수 있는 어댑터를 뜻한다.
      @Override
      public boolean supports(Object handler) {
          return (handler instanceof ControllerV3);
      }
  
      @Override
      public ModelView handle(HttpServletRequest request, HttpServletResponse respons, Object handler) throws ServletException, IOException {
          //handler를 컨트롤러 V3로 변환한 다음에 V3 형식에 맞도록 호출한다.
  	   //supports() 를 통해 ControllerV3 만 지원하기 때문에 타입 변환은 걱정없이 실행해도 된다.
         //ControllerV3는 ModelView를 반환하므로 그대로 ModelView를 반환하면 된다.
          ControllerV3 controller = (ControllerV3) handler;
  
          Map<String, String> paramMap = createParamMap(request);
          ModelView mv = controller.process(paramMap);
  
          return mv;
      }
  
      private static Map<String, String> createParamMap(HttpServletRequest request) {
          Map<String, String> paramMap = new HashMap<>();
          request.getParameterNames().asIterator()
                  .forEachRemaining(paramName -> paramMap.put(paramName, request.getParameter(paramName)));
          return paramMap;
      }
  }
  ```

## FrontControllerServletV5

- 

- ```java
  package hello.servlet.web.frontcontroller.v5;
  
  import hello.servlet.web.frontcontroller.ModelView;
  import hello.servlet.web.frontcontroller.MyView;
  import hello.servlet.web.frontcontroller.v3.ControllerV3;
  import hello.servlet.web.frontcontroller.v3.controller.MemberFormControllerV3;
  import hello.servlet.web.frontcontroller.v3.controller.MemberListControllerV3;
  import hello.servlet.web.frontcontroller.v3.controller.MemberSaveControllerV3;
  import hello.servlet.web.frontcontroller.v4.ControllerV4;
  import hello.servlet.web.frontcontroller.v5.adapter.ControllerV3HandlerAdapter;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.annotation.WebServlet;
  import jakarta.servlet.http.HttpServlet;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  import org.springframework.web.servlet.HandlerAdapter;
  
  import java.io.IOException;
  import java.util.ArrayList;
  import java.util.HashMap;
  import java.util.List;
  import java.util.Map;
  
  @WebServlet(name = "frontControllerServletV5", urlPatterns = "/front-controller/v5/*")
  public class FrontControllerServletV5 extends HttpServlet {
  
      //핸들러 매핑과 어댑터를 초기화한다.
      private final Map<String, Object> handlerMappingMap = new HashMap<>();
      private final List<MyHandlerAdapter> handlerAdapters = new ArrayList<>();
  
      public FrontControllerServletV5() {
          initHandlerMappingMap();
          inintHandlerAdapters();
      }
  
      @Override
      protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  
          //핸들러 매핑 정보인 handlerMappingMap 에서 URL에 매핑된 핸들러(컨트롤러) 객체를 찾아서 반환한다.
          Object handler = getHandler(request);
          if(handler == null){
              response.setStatus(HttpServletResponse.SC_NOT_FOUND);
              return;
          }
  
          //핸들러를 처리할 수 있는 어댑터 조회
          //getHandlerAdapter 메서드를 보면, 사용할 수 있는 핸들러 목록인 handlerAdapters 리스트에서 handler 가 있는지 찾는다.
          //그리고 있으면 adapter 를 호출한다. (ControllerV3HandlerAdapter)
          MyHandlerAdapter adapter = getHandlerAdapter(handler);
  
          //어댑터 호출
          ModelView mv = adapter.handle(request, response, handler);
  
          String viewName = mv.getViewName();
          MyView view = viewResolver(viewName);
  
          view.render(mv.getModel(), request, response);
      }
  
  
      private void initHandlerMappingMap() {
          handlerMappingMap.put("/front-controller/v5/v3/members/new-form", new MemberFormControllerV3());
          handlerMappingMap.put("/front-controller/v5/v3/members/save", new MemberSaveControllerV3());
          handlerMappingMap.put("/front-controller/v5/v3/members", new MemberListControllerV3());
      }
  
      private boolean inintHandlerAdapters() {
          return handlerAdapters.add(new ControllerV3HandlerAdapter());
      }
  
      private Object getHandler(HttpServletRequest request) {
          String requestURI = request.getRequestURI();
          return handlerMappingMap.get(requestURI);
      }
  
      private MyHandlerAdapter getHandlerAdapter(Object handler) {
          for (MyHandlerAdapter adapter : handlerAdapters) {
              if(adapter.supports(handler)){
                  return adapter;
              }
          }
          throw new IllegalArgumentException("handler adapter 를 찾을 수 잆습니다. handler = " + handler);
      }
  
      private static MyView viewResolver(String viewName) {
          return new MyView("/WEB-INF/views/" + viewName + ".jsp");
      }
  }
  ```

# 5. 유연한 컨트롤러2 - v5(어댑터 추가)

- FrontControllerServletV5 에 ControllerV4 기능도 추가

### FrontControllerServletV5

- initHandlerMappingMap() 에 v4 추가

  - ```java
    private void initHandlerMappingMap() {
            handlerMappingMap.put("/front-controller/v5/v3/members/new-form", new MemberFormControllerV3());
            handlerMappingMap.put("/front-controller/v5/v3/members/save", new MemberSaveControllerV3());
            handlerMappingMap.put("/front-controller/v5/v3/members", new MemberListControllerV3());
    
            handlerMappingMap.put("/front-controller/v5/v4/members/new-form", new MemberFormControllerV4());
            handlerMappingMap.put("/front-controller/v5/v4/members/save", new MemberSaveControllerV4());
            handlerMappingMap.put("/front-controller/v5/v4/members", new MemberListControllerV4());
        }
    ```

- initHandlerAdapters() 에  new ControllerV4HandlerAdapter() 추가

  - ```java
     private void initHandlerAdapters() {
            handlerAdapters.add(new ControllerV3HandlerAdapter());
            handlerAdapters.add(new ControllerV4HandlerAdapter());
        }
    ```



## ControllerV4HandlerAdapter

- ControllerV3HandlerAdapter 와 큰 차이는 없다.

- ```java
  package hello.servlet.web.frontcontroller.v5.adapter;
  
  import hello.servlet.web.frontcontroller.ModelView;
  import hello.servlet.web.frontcontroller.v4.ControllerV4;
  import hello.servlet.web.frontcontroller.v5.MyHandlerAdapter;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  
  import java.io.IOException;
  import java.util.HashMap;
  import java.util.Map;
  
  public class ControllerV4HandlerAdapter implements MyHandlerAdapter {
      
      //ControllerV4 인지 확인
      @Override
      public boolean supports(Object handler) {
          return (handler instanceof ControllerV4);
      }
  
      
      @Override
      public ModelView handle(HttpServletRequest request, HttpServletResponse response, Object handler) throws ServletException, IOException {
  
          //핸들러 타입을 ControllerV4 로 변환
          ControllerV4 controller = (ControllerV4) handler;
  
          //controller.process 메서드를 위한 매개변수 만들기
          Map<String, String> paramMap = createParamMap(request);
          Map<String, Object> model = new HashMap<>();
  
          //V4 는 viewName 을 반환하므로 String 으로 반환받는다.
          String viewName = controller.process(paramMap, model);
  
          //ModelView 를 viewName 으로 생성하고 model 을 넣는다.
          //model 은 위에서 controller.process() 에 의해 정보를 받은 상태이다.
          
          //V4 는 반환 형식이 String 이지만,
          //어댑터는 이것을 ModelView로 만들어서 형식을 맞추어 반환한다. 
          ModelView mv = new ModelView(viewName);
          mv.setModel(model);
  
          return mv;
      }
  
      private static Map<String, String> createParamMap(HttpServletRequest request) {
          Map<String, String> paramMap = new HashMap<>();
          request.getParameterNames().asIterator()
                  .forEachRemaining(paramName -> paramMap.put(paramName, request.getParameter(paramName)));
          return paramMap;
      }
  }
  ```

  