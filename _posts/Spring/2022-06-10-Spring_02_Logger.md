---
layout : single
title : Spring Controller
categories: Spring
tags: [SPRING]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: true
sidebar:
  nav: "docs"
---

> ### Spring Controller

- 일단 자바파일은 src/main/java의 패키지에 생성
- jsp파일은 src/main/webapp/WEB-INF/views 안에 생성

---



> ##### Logger 객체 생성

~~~java
// 컨트롤러 파일

package com.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SampleController {

	//로그설정. SampleController클래스의 메서드가 동작되는 것을 모니터링
	private static final Logger Logger = LoggerFactory.getLogger(SampleController.class);
	
	@RequestMapping("doA") // 클라이언트(브라우저)에서 메서드를 호출하기 위한 주소작업
	public void doA() {
		Logger.info("doA called...."); // System.out.println()메서드와 같은 기능
		
		// 리턴값이 void인 경우 매핑주소 doA가 jsp 파일명이 된다
		// servlet-context.xml의 설정구문 참조
		// /WEB-INF/views/ + doA + .jsp -> /WEB-INF/views/doA.jsp
	}
	
	@RequestMapping("doB")
	public void doB() {
		Logger.info("doB called....");
	}
	
}
~~~

~~~java
// 컨트롤러 파일2
// 아래 jsp 파일과 연결

package com.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SampleController2 {

	private static final Logger Logger = LoggerFactory.getLogger(SampleController2.class);
	
	// 요청시 메서드의 파라미터를 제공해야 문제가 생기지 않는다
	// http://localhost:9090/doC?name=홍길동&age=100
	@RequestMapping("doC")
	public String doC(@ModelAttribute("name") String name, @ModelAttribute("age") int age) {
		
		Logger.info("doC called...." + name);
		Logger.info("doC called...." + age);
		
		// 파라미터 name, age 변수의 값을 result.jsp 파일명에서 참조할 경우 @ModelAttribute 사용
		// 리턴값이 String인 경우에는 리턴값 "result"가 jsp 파일명이 된다
		return "result";
		
	}
	
}

~~~

~~~jsp
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

<p>당신의 이름은? ${ name }
<p>당신의 나이는? ${ age }

</body>
</html>
~~~

---

> ##### 