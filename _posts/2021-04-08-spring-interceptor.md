---
title: "Spring Interceptor"
date: 2021-04-16 12:00:00 +0900
categories: spring
comments: true
---

## Interceptor 등록
* 특정 패턴의 경로에서만 interceptor 설정을 하고싶다면 addPathPatterns을 사용해서 패턴을 등록한다.

```java
@Override
public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new CommonInterceptor())
        .addPathPatterns("/admin/**");
    
    WebMvcConfigurer.super.addInterceptors(registry);
}
```

## HandlerInterceptorAdapter를 상속받아 Interceptor class를 생성한다.
* preHandle는 Controller가 호출되기 이전에 실행
response.sendRedirect 메소드를 통해 강제적으로 다른 경로로 이동시킬 수 있음
* postHandle Controller가 실행된 이후에 호출

```java
public class CommonInterceptor extends HandlerInterceptorAdapter {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        ...
        response.sendRedirect("/main");
        ...
        
        return super.preHandle(request, response, handler);
    }
    
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		super.postHandle(request, response, handler, modelAndView);
	}
}
```
