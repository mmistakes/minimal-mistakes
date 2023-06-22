---
layout : single
title : Spring 예외처리
categories: Spring
tags: [SPRING]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: true
sidebar:
  nav: "docs"
---

> ### Spring 예외처리

~~~xml
<!-- except 메서드 설정 
	servlet-context.xml에 추가 -->

<context:component-scan base-package="com.demo.exception" />

<!-- handle404 메서드 설정
	web.xml에 추가 -->

		<init-param>
			<param-name>throwExceptionIfNoHandlerFound</param-name>
			<param-value>true</param-value>
		</init-param>
~~~

~~~java
package com.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;

import lombok.extern.log4j.Log4j;

// 예외(Exception) : 프로그램 실행도중 발생하는 오류를 의미. 예외발생시 강제적인 종료가 된다
// 1)예외처리. try~catch 2)예외전가. 메서드 정의시 옆 throws Exception

// 각 컨트롤러의 메서드에서 예외가 발생하면, 개별메서드에서 예외작업을 하였다.
// 모든 컨트롤러에서 예외가 발생하면, 각각 개별 컨트롤러 수준에서 예외처리를 하는 것이 아니라, 공통 예외처리를 담당하는 클래스를 작업

@ControllerAdvice
@Log4j
public class CommonExceptionAdvice {

	// 모든 예외처리는 아래 메서드가 호출된다
	// 예외 테스트 주소 : http://localhost:9090/sample/ex02?name=홍길동
	@ExceptionHandler(Exception.class)
	public String except(Exception ex, Model model) {
		
		log.error("Exception..." + ex.getMessage());
		model.addAttribute("exception", ex);
		log.error(model.toString());
		
		return "/error/error_page";
	}
	
	// 특정한 예외가 발생이 되면 처리되는 경우 (예. 요청주소가 존재하지 않을 경우) web.xml <init-param> 설정필요
	// 테스트 주소. http://localhost:9090/sample/ex1000000 참고사항>HTTP상태코드
	@ExceptionHandler(NoHandlerFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public String handle404(NoHandlerFoundException ex) {
		
		return "/error/cuntom404";
	}
	
}
~~~

~~~jsp
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

<h4><c:out value="${ exception.getMessage() }" /></h4>
<ul>
	<c:forEach items="${ exception.getStackTrace() }" var="stack">
		<li><c:out value="${ stack }"></c:out></li>
	</c:forEach>
</ul>

</body>
</html>
~~~

~~~jsp
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

<h2>해당 URL은 존재하지 않습니다</h2>

</body>
</html>
~~~

