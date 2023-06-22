---
layout : single
title : Spring 업로드
categories: Spring
tags: [SPRING]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: true
sidebar:
  nav: "docs"
---

> ### Spring 업로드

~~~java
package com.demo.controller;

import java.util.ArrayList;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/sample3/*") // 공통경로. sample로 시작하는 모든 주소를 의미함
@Log4j
public class SampleController3 {
	
	@GetMapping("/getAjax")
	public String getAjax() {
		
		return "/sample3/getAjax";
	}
	
	@GetMapping("/demo")
	public String demo() {
		
		return "/sample3/demo";
	}
	
//	ResponseEntity : ajax 작업과 함께 사용한다
//	서버에서 클라이언트로 결과를 보낼 때 1)리턴데이터, 2)헤더정보, 3)Http상태코드 3가지정보를 관리
//	1)응답데이터 : 클라이언트의 요청에 따른 서버측의 행위에 따른 결과
//	2)헤더정보 : "헤더+데이터". 데이터이외의 부가적인 정보를 요청(request)과 응답(response)에서 사용한다
//	3)Http상태코드
	
	
	@GetMapping("/ex07")
	public ResponseEntity<String> ex07(){
		
		ResponseEntity<String> entity = null;
		
		// 1)응답데이터 : json포맷 {"name":"홍길동"}
		String msg = "{\"name\":\"홍길동\"}";
		
		// 2)헤더 : 부가적인 정보
		HttpHeaders header = new HttpHeaders();
		header.add("Content-Type", "application/json;charset=utf-8");
		
		// 3)HttpStatus.OK : 상태코드
		entity = new ResponseEntity<String>(msg, header, HttpStatus.OK);
		
		return entity;
	}
	
	// 파일업로드 폼
	@GetMapping("/exUpload")
	public void exUpload() {
		log.info("exUpload called...");
	}
	
	// 파일업로드 처리
	// 설정. pom.xml 파일업로드 라이브러리 작업
	// <input type="file" name="files"> 와 ArrayList<MultipartFile> files 이름이 동일해야 한다
	@PostMapping("/exUploadPost")
	public void exUploadPost(ArrayList<MultipartFile> files) {
		
		for(int i=0; i<files.size(); i++) {
			log.info("-------------------");
			log.info("name : " + files.get(i).getOriginalFilename());
			log.info("size : " + files.get(i).getSize());
		}
		
	}
	
}
~~~

~~~jsp
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

<h3>파일업로드</h3>

<form action="/sample3/exUploadPost" method="post" enctype="multipart/form-data">
	<input type="file" name="files"><br>
	<input type="file" name="files"><br>
	<input type="file" name="files"><br>
	<input type="file" name="files"><br>
	<input type="file" name="files"><br>
	<input type="submit" value="파일업로드">
</form>

</body>
</html>
~~~

~~~xml
		<!-- pom.xml -->
		<!-- https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload -->
		<!-- 파일 업로드 기능지원 라이브러리 -->
		<dependency>
		    <groupId>commons-fileupload</groupId>
		    <artifactId>commons-fileupload</artifactId>
		    <version>1.3.3</version>
		</dependency>

<!-- servlet-context.xml -->
<beans:bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
		<beans:property name="defaultEncoding" value="utf-8"></beans:property>
		<beans:property name="maxUploadSize" value="10485760"></beans:property>
		<beans:property name="maxUploadSizePerFile" value="2097152"></beans:property>
		<!-- 서버에 업로드시 사용될 임시폴더 경로설정 -->
		<beans:property name="uploadTempDir" value="file:C:\Dev\upload\tmp"></beans:property>
		<beans:property name="maxInMemorySize" value="10485756"></beans:property>
	</beans:bean>
~~~

