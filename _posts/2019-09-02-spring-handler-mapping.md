---
title: "Spring에서 url를 통해 어떻게 Controller객체를 가져올까(1)"
date: 2019-09-02
categories: spring
comments: true
---

### HandlerMapping
스프링 프레임워크를 사용하면서 당연하게(?) 클라이언트로부터 request url를 통해 맵핑된 Controller 객체에 정의된 메소드를 호출하여 결과를 받는다.  
실무에서도 요청 할 url에 맞춰 컨트롤러에 Request Mapping을 등록하여 사용하는데, 어떻게 Spring은 url를 가지고 해당 컨트롤러를 알 수 있는지 궁금했다.  
dispather-servlet에서 Controller의 요청까지 동작 원리를 알기위해 디버깅을 통해 코드 한줄 한줄씩 따라가면서 확인했다.

- AbstractHandlerMethodMapping: 
- RequestMappingHandlerMapping: 
- hanlder: 

#### 동작 방식
1. Context가 로드될 때, BeanFactory에서 Application Context에서 Beans을 스캔하고 handler method를 등록한다. 등록된 Bean중에 Annotation이 Controller이거나 RequestMapping을 찾는다.
```java
RequestMappingHandlerMapping.isHandler
```
2. 찾은 Handler에서 메소드를 찾아서 getMappingForMethod를 호출한다.
3. getMappingForMethod는 파라미터로 받은 method와 Handler type으로 RequestMappingInfo 객체를 생성한다.
    3.1 RequestMappingInfo(@RequestMapping에 사용되는 url, method(get, post)방식 등의 정보가 담겨있는 객체)
4. mappingRegistry에 (3)에서 찾은 RequestMappingInfo과 method, handler를 등록한다.
5. lookupHandlerMethod
6. get