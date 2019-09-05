---
title: "Spring4는 어떻게 url를 통해 Controller객체를 가져올까(2)"
date: 2019-09-03
categories: spring
comments: true
---

### 개요
[Spring4는 어떻게 url를 통해 Controller객체를 가져올까(1)](https://rerewww.github.io/spring/spring-handler-mapping/)에서 HandlerMapping을 통해 Controller 객체를 구했습니다.  
구한 Controller 객체를 실행하고 반환 값을 DispatcherServlet에 전달하는 과정까지 알아보겠습니다.  
기준은 RequestMappingHandlerAdapter에 대한 설명이며 [Spring4는 어떻게 url를 통해 Controller 객체를 가져올까(1)](https://rerewww.github.io/spring/spring-handler-mapping/)과 동일하게 디버깅으로 로직 흐름을 파악했고 맞지 않는 정보는 피드백 부탁드립니다.

### HandlerAdapter
Controller 객체를 호출하여 서로 다른 반환 값을 ModelAndView 타입으로 DispatcherServlet에 반환하는 bean이 필요한데, 이 역할을 HandlerAdapter가 수행합니다.  
HandlerAdapter 인터페이스를 확장하여 구현한 아래 3가지 종류가 있습니다.

- 종류
	- RequestMappingHandlerAdapter
    - HttpRequestHandlerAdapter
    - SimpleControllerHandlerAdapter

3가지로 구성되어 있으며, RequestMappingHandlerAdapter을 사용했을 때 어떻게 동작하는지 알아보겠습니다.
- RequestMappingHandlerAdapter
    - @RequestMapping annotation을 지원합니다.
    - HandlerAdapter 타입을 지원하는 추상 클래스인 AbstractHandlerMethodAdapter 확장하여 사용합니다.  
    - ```java
        //dispatcher-servlet.xml
        <mvc:annotation-driven /> // 선언
        // "java:org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter" 사용합니다.
      ```

### 동작 방식
1. HandlerMapping 클래스에서 클라이언트 요청에 대한 Controller 객체를 가져오면 이를 가지고 Controller 객체를 실행하고 리턴을 반환할 HandlerAdapter를 구합니다.
```java
	// DispatcherServlet class
	...
	// Determine handler for the current request.
	// 클라이언트 요청 URL에 맵핑되는 Controller 객체를 가져온다. 
	mappedHandler = getHandler(processedRequest);
	if (mappedHandler == null) {
		noHandlerFound(processedRequest, response);
		return;
	}

	// Determine handler adapter for the current request.
	// 찾은 Controller 객체에 대한 HandlerAdapter를 구한다.
	HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());
	...
```
2. 찾은 handler를 파라미터로 넘겨 HandlerAdapter를 가져옵니다.  
```java
	// DispatcherServlet class
	protected HandlerAdapter getHandlerAdapter(Object handler) throws ServletException {
		// this.handlerAdapters: HandlerAdapter의 3가지 타입이 존재한다.
		if (this.handlerAdapters != null) {
			for (HandlerAdapter adapter : this.handlerAdapters) {
				// handler 파라미터를 넘겨 RequestMappingHandlerAdapter, HttpRequestHandlerAdapter, SimpleControllerHandlerAdapter 중 지원하는 adapter를 반환한다.
				if (adapter.supports(handler)) {
					return adapter;
				}
			}
		}
	...
```
3. (2)에서 구한 RequestMappingHandlerAdapter로 handler를 호출합니다.
```java
	// DispatcherServlet class
	...
	mv = ha.handle(processedRequest, response, mappedHandler.getHandler());
	...
```
4. RequestMappingHandlerAdapter의 getModelAndView 메소드를 통해 **Controller의 결과 값을 ModelAndView 생성**하여 DispatcherServlet로 반환합니다.

### 참고
[Spring Documentation](https://spring.io/docs)