---
title: "Spring4는 어떻게 view를 가져올까"
date: 2019-09-07
categories: spring
comments: true
---

### 개요
[Spring4는 어떻게 url를 통해 Controller객체를 가져올까(2)](https://rerewww.github.io/spring/spring-handlerAdapter/)에서 HandlerAdapter를 통해 Controller에 요청하여 ModelAndView 결과 객체를 구했습니다.  
사용자에게 결과를 보여주기 위한 뷰를 찾기 위해 viewResolver bean 객체를 사용합니다. 

### viewResolver
DispatcherServlet에서 HandlerAdapter를 통해 Controller의 반환 값인 ModelAndView를 구했습니다.  
ModelAndView 객체에는 viewName 변수가 저장되어 있으며,  이 변수를 이용하여 viewResolver에서 사용할 view를 반환합니다.  
ViewResolver는 인터페이스로 구현되어 있으며 ViewResolver를 확장하여 사용합니다.
```xml
// dispatcher-servlet.xml
...
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
	<property name="prefix" value="/WEB-INF/views/"/>
	<property name="suffix" value=".jsp"/>
</bean>
...
```
위와 같이 dispatcher-servlet.xml에 사용 할 viewResolver를 선언하여 사용할 수 있습니다.  
JSP 파일을 뷰로 사용할 때, InternalResourceViewResolver bean을 사용합니다. prefix, suffix를 명시해주어야 하는데,  
- prefix는 view파일이 존재하는 경로이며 suffix는 확장자가 됩니다.  
- 코드처럼 prefix와 suffix 값을 해주면 '/WEB-INF/views/*.jsp' 파일을 찾게 됩니다.

### 동작 방식
1. Controller 요청에 의한 결과 값을 구한 뒤, mv를 processDispatchResult 메소드 호출 시, 파라미터로 넘깁니다.
```java
	// DispatcherServlet class
	...
	// 컨트롤러의 ModelAndView 반환 값을 가져옵니다.
	mv = ha.handle(processedRequest, response, mappedHandler.getHandler());
	...
	processDispatchResult(processedRequest, response, mappedHandler, mv, dispatchException);
	...
```
2. mv 객체가 존재한다면 render메소드를 호출합니다.
```java
	// DispatcherServlet class
	...
	if (mv != null && !mv.wasCleared()) {
		render(mv, request, response);
		if (errorView) {
			WebUtils.clearErrorRequestAttributes(request);
		}
	}
	...
```
3. mv 객체에서 viewName을 가져와서 null이 아니라면 resolveViewName 메소드를 통해 View 객체를 가져옵니다.
```java
	// DispatcherServlet class
	...
	View view;
	String viewName = mv.getViewName();
	if (viewName != null) {
		// We need to resolve the view name.
		view = resolveViewName(viewName, mv.getModelInternal(), locale, request);
		...
	}
	...
```
4. resolveViewName 메소드에선 현재 bean으로 등록된 viewResolvers들을 하나씩 호출하면서 view를 가져오며, 
```java
	...
	if (this.viewResolvers != null) {
		for (ViewResolver viewResolver : this.viewResolvers) {
			View view = viewResolver.resolveViewName(viewName, locale);
			...
		}
	}
	...
```

5. url과 view가 맵핑된 Map 객체를 가지고 있어서 url을 조회하여 value를 가져옵니다.
```java
public View resolveViewName(String viewName, Locale locale) throws Exception {
	if (!isCache()) {
			return createView(viewName, locale);
	}
	else {
		Object cacheKey = getCacheKey(viewName, locale);
		View view = this.viewAccessCache.get(cacheKey); // "index->" InternalResourceViewResolver; name='index'; URL [/WEB-INF/views/index.jsp]
		...
```

### 참고
[Spring Documentation](https://spring.io/docs)