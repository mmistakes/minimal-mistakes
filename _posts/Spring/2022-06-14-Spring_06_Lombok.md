---
layout : single
title : Spring 롬복
categories: Spring
tags: [SPRING]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: true
sidebar:
  nav: "docs"
---

> ### Spring 롬복

- 롬복 다운로드 설치
- 이클립스 종료 후 관리자 권한으로 명령 프로토콜에서 롬복 위치로 들어가서
- java -jar lombok.jar 실행 후 위치를 이클립스 위치로 해서 이클립스 선택후 설치하면 롬복파일 이클립스 위치로 이동
- 레거시 새 프로젝트 ex01 생성 후 pom.xml 버전 다시 수정
- mvn에서 lombok 1.18.22 pom.xml 넣기
- 컨트롤러 생성 후 @Data를 롬북으로 가져오면 여러가지 자동적으로 생성됨
- ***새로운 프로젝트를 개설할때 서버 모듈 다시 설정해야됨***

~~~java
package com.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.demo.domain.SampleDTO;

@Controller
@RequestMapping("/sample/*") // 공통경로. sample로 시작하는 모든 주소를 의미함
public class SampleController {
	
	private static final Logger Logger = LoggerFactory.getLogger(SampleController.class);
	
	// 주소 : /sample/doA. jsp파일명
	@RequestMapping("doA")
	public void doA() {
		Logger.info("/sample/doA");
	}
	
	// 주소 : /sample/doB. jsp파일명
	@RequestMapping("doB")
	public void doB() {
		Logger.info("/sample/doB");
	}
	
	// /sample 로 싲가하는 주소와 요청방식이 존재하지 않으면, 아래 주소가 호출됨
	// 아래 주소가 없다면 오류로 요청방식 GET은 지원하지 않는다고 나옴
	@RequestMapping("")
	public void basic() {
		Logger.info("basic called...");
	}
	
	// /sample/ + /basicForm -> 인식됨
	@RequestMapping("/basicForm")
	public void basicForm() {
		Logger.info("basicForm called...");
	}
	
	// 매핑주소 여러개를 생성하여, 하나의 메서드 호출
	@RequestMapping(value = {"/bsciaA", "/basicB"})
	public void basicGet() {
		Logger.info("basicOnly called...");
	}
	
	// /sample/basicForm. 기본요청방식이 get, post 둘다 지원
	// 아래는 post만 지원하겠다는 조건
	@RequestMapping(value = "basicTwoMethod", method = RequestMethod.POST)
	public void basicTwoMethod() {
		Logger.info("basicTwoMethod called...");
	}
	
	// spring framework 4.3이후 get요청방식 주소설정. @PostMapping : post요청방식 주소설정
	@GetMapping("/basicOnlyGet")
	public void basicGet2() {
		Logger.info("basicGet2 called...");
	}
	
	
	
//	클라이언트에서 보내온 데이터를 서버(스프링)에서 참조한느 방법
//	주소 : http://localhost:9090/sample/ex1?name=홍길동&age=100
//	1) 클래스를 사용 - SampleDTO dto
	
//	주소 : http://localhost:9090/sample/ex02?name=홍길동&age=100
//	2) 각각의 필드를 사용 - String name, int age
	
	@GetMapping("/ex01") // http://localhost:9090/sample/ex01?name=홍길동&age=100
	public String ex01(SampleDTO dto) {
		
		Logger.info(dto.toString());
		
		return "/sample/ex01"; // jsp 파일명
	}
	
	// 참고. 파라미터가 기본 데이터타입은 값을 제공하지 않으면, 에러발생
	@GetMapping("/ex02") // http://localhost:9090/sample/ex02?name=홍길동&age=100
	public String ex02(String name, int age) {
		
		Logger.info("이름은 ? " + name);
		Logger.info("나이는 ? " + age);
		
		return "/sample/ex02"; // jsp 파일명
	}
	
	// ?
	
	
	@GetMapping("/ex0201") // http://localhost:9090/sample/ex0201?name=홍길동&age=100
	public String ex0201(@RequestParam("uname") String name, @RequestParam("uage") int age) {
		
		Logger.info("이름은 ? " + name);
		Logger.info("나이는 ? " + age);
		
		return "/sample/ex0201"; // jsp 파일명
	}
	
}
~~~

- views 아래 sample 공용폴더 만들고 그 안에 basicForm.jsp파일생성

~~~jsp
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<h3>form - post방식</h3>

	<form method="post" action="basicTwoMethod">
		<input type="submit" value="전송">
	</form>
	
	<h3>form - get방식</h3>
	<a href = "basicTwoMethod">요청</a>
	

</body>
</html>
~~~

- com.demo.domain에 SampleDTO.java 생성

~~~java
package com.demo.domain;

import lombok.Data;

// 스프링에서 사용하는 데이터 관리 목적으로 사용하는 클래스는 getter,setter 메서드가 반드시 존재
@Data
public class SampleDTO {

	private String name;
	private int age;
}
~~~

