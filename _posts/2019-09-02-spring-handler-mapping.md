---
title: "Spring4는 어떻게 url를 통해 Controller객체를 가져올까(1)"
date: 2019-09-02
categories: spring
comments: true
---

### 개요
스프링 프레임워크4를 사용하면서 당연하게(?) 클라이언트로부터 request url를 통해 맵핑된 Controller 객체에 정의된 메소드를 호출하여 결과를 받는다.  
실무에서도 요청 할 url에 맞춰 컨트롤러에 @RequestMapping을 등록하여 사용하는데, Spring은 어떻게 url를 가지고 해당 컨트롤러를 알 수 있는지 궁금했다.  
dispather-servlet에서 Controller의 요청까지 동작 원리를 알기위해 디버깅을 통해 코드 한줄 한줄씩 따라가면서 확인했다.

### HandlerMapping
dispather-servlet은 클라이언트의 request url에 대한 컨트롤러를 HandlerMapping 객체에 찾으라는 요청을 한다.  
HandlerMapping 객체는 request url에 해당하는 컨트롤러(bean)를 전달한다.

- hanlder: 클라이언트의 요청과 맵핑되는 컨트롤러를 여러 방법을 통해 전달해주는 클래스
- AbstractHandlerMapping: HandlerMapping 패키지에 대한 기본적인 상위 추상 클래스
- RequestMappingHandlerMapping: default HandlerMapping 클래스, AbstractHandlerMethodMapping(AbstractHandlerMapping 상속함) 추상클래스를 상속, 확장하여 사용하고 있다.

### 동작 방식
1. Context가 로드될 때, BeanFactory에서 Application Context에서 Beans을 스캔하고 handler method를 등록한다.  
  
2. 등록된 Bean중에 Annotation이 Controller이거나 RequestMapping을 찾는다.
```java
	...
	@Override
	protected boolean isHandler(Class<?> beanType) {
		return (AnnotatedElementUtils.hasAnnotation(beanType, Controller.class) ||
				AnnotatedElementUtils.hasAnnotation(beanType, RequestMapping.class));
	}
	...
```  
  
3. 찾은 Handler에서 메소드를 찾아서 getMappingForMethod를 호출한다.
```java
	...
		if (handlerType != null) {
			Class<?> userType = ClassUtils.getUserClass(handlerType);
			Map<Method, T> methods = MethodIntrospector.selectMethods(userType,
					(MethodIntrospector.MetadataLookup<T>) method -> {
						try {
							// method: handler 클래스 안에서 선언된 메소드
							// userType: hanlder 클래스
							return getMappingForMethod(method, userType);
						}
	...
```  
  
4. getMappingForMethod는 파라미터로 받은 method와 Handler type으로 RequestMappingInfo 객체를 생성한다.  
    4.1. RequestMappingInfo(@RequestMapping에 사용되는 url, method(get, post)방식 등의 정보가 담겨있는 객체)
```java
	public RequestMappingInfo(@Nullable String name, @Nullable PatternsRequestCondition patterns,
			@Nullable RequestMethodsRequestCondition methods, @Nullable ParamsRequestCondition params,
			@Nullable HeadersRequestCondition headers, @Nullable ConsumesRequestCondition consumes,
			@Nullable ProducesRequestCondition produces, @Nullable RequestCondition<?> custom) {

		this.name = (StringUtils.hasText(name) ? name : null);
		this.patternsCondition = (patterns != null ? patterns : new PatternsRequestCondition());
		this.methodsCondition = (methods != null ? methods : new RequestMethodsRequestCondition());
		this.paramsCondition = (params != null ? params : new ParamsRequestCondition());
		...
	}
	...
```  
  
5. AbstractHandlerMethodMapping클래스의 멤버변수인 mappingRegistry에 (3)에서 찾은 RequestMappingInfo과 method, handler를 등록한다.
```java
	protected void registerHandlerMethod(Object handler, Method method, T mapping) {
		this.mappingRegistry.register(mapping, handler, method);
	}
```

6. 등록을 모두 완료한 후, 클라이언트의 요청url이 들어오면 request객체를 통해 path를 가져온다.
```java
	...
		@Override
		protected HandlerMethod getHandlerInternal(HttpServletRequest request) throws Exception {
			// http://localhost:1234/helloWorld 요청을 하면 lookupPath 변수에는 "/helloWorld" 값으로 초기화 된다.
			String lookupPath = getUrlPathHelper().getLookupPathForRequest(request);
	...
```
7.  RequestMappingInfo객체를 이용하여 (5)에서 등록한 mappingRegistry객체를 통해 컨트롤러 bean을 반환한다.
```java
	...
		if (match != null) {
			matches.add(new Match(match, this.mappingRegistry.getMappings().get(mapping)));
		}
	...
		Match bestMatch = matches.get(0);
	...
		return bestMatch.handlerMethod;
	```

  	  
	  
Spring Framework4에서 Context Load시, bean factory를 통해 RequestMapping Annotation Bean을 등록하고 Handler를 가져오는 동작을 알아보았다.
다음 장에서는 HandlerAdapter를 알아보자.

### 참고
전자정부 표준프레임워크