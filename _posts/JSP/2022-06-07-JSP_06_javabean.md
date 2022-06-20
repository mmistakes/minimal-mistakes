---
layout : single
title : JSP 자바빈 액션태그
categories: JSP
tags: [JSP]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

> ### 자바빈(Java Bean) 액션태그

- 특정한 작업을 하기위한 독립적으로 수행하는 컴포넌트

- JSP 페이지에서 HTML코드와 Java코드를 분리하기 위한 목적

  1. 데이터 저장 및 관리목적 : 데이터베이스 테이블에 매핑되는 클래스

     <jsp:useBean id="" class="자바빈 클래스명"></jsp:useBean> : 자바빈 클래스를 사용할 액션태그

  2. 기능구현 목적 : 비즈니스 로직으로 구성된 클래스

~~~java
public class TestBean {

//	DB - 테이블
//	
//	CREATE TABLE TEST
//	(
//		ID VARCHAR2(20) PRIMARY KEY
//	);
//	
//	위의 테이블과 구조가 동일한 클래스 생성
	
    // 변수 id를 form.jsp의 name 과 일치시켜야 함
	private String id;
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		
	}
	
}
~~~

~~~jsp
beanTestForm.jsp 파일

<html>
<head>
<meta charset="UTF-8">
<title>자바빈 클래스 이용</title>
</head>
<body>
	<form method="post" action="beanTestPro.jsp">
		<dl>
			<dd>
				<label>아이디</label>
				<input type="text" name="id" id="id" placeholder="아이디를 입력" autofocus required>
			</dd>
			<dd>
				<input type="submit" value="입력완료">
			</dd>
		</dl>
	</form>
</body>
</html>
~~~

~~~jsp
beanTestPro.jsp 파일

<% // <jsp:useBean id="자바 객체생성" class="자바빈 클래스명 경로">
   // </jsp:useBean>
   // <jsp:setProperty property="자바 객체의 set함수" name="위의 id에 들어간 것"/> %>

<jsp:useBean id="testBean" class="ch08.bean.TestBean">
</jsp:useBean>
<jsp:setProperty property="id" name="testBean"/>

입력한 아이디 : <jsp:getProperty property="id" name="testBean"/>
~~~

---

> ### 예제 연습

~~~java
package ch08.register;

import java.sql.Timestamp;

// 회원테이블 참조
// userId, passwd, name, reg_date 필드

public class RegisterBean {
	
	// 1) 모든 필드는 private 접근자 선언
	private String userId;
	private String passwd;
	private String name;
	
	private Timestamp reg_date;

	// 2) 모든 필드에 대한 getter, setter 메서드 정의
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPasswd() {
		return passwd;
	}

	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Timestamp getReg_date() {
		return reg_date;
	}

	public void setReg_date(Timestamp reg_date) {
		this.reg_date = reg_date;
	}
}
~~~

~~~jsp
registerForm.jsp 파일
실행시키기

<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form method="post" action="registerPro.jsp">
		<dl>
			<dd>
				<label for="userId">아이디</label>
				<input type="text" name="userId" id="userId" placeholder="user01@abc.com" autofocus required>
			</dd>
			<dd>
				<label for="passwd">비밀번호</label>
				<input type="password" name="passwd" id="passwd" placeholder="비밀번호 입력" autofocus required>
			</dd>
			<dd>
				<label for="name">이름</label>
				<input type="text" name="name" id="name" placeholder="이름을 입력" autofocus required>
			</dd>
			<dd>
				<input type="submit" value="전송">
			</dd>
		</dl>
	</form>
</body>
</html>
~~~

~~~jsp
registerPro.jsp 파일

<% request.setCharacterEncoding("utf-8"); // 한글 섞여있는경우 변환작업 %>

<jsp:useBean id="registerBean" class="ch08.register.RegisterBean">
	<jsp:setProperty property="userId" name="registerBean"/>
	<jsp:setProperty property="passwd" name="registerBean"/>
	<jsp:setProperty property="name" name="registerBean"/>
</jsp:useBean>

<%
	// 가입날짜 처리구문
	registerBean.setReg_date(new Timestamp(System.currentTimeMillis()));
%>

아이디 : 		<jsp:getProperty property="userId" name="registerBean"/>		<br>
비밀번호 : 	<jsp:getProperty property="passwd" name="registerBean"/>		<br>
이름 : 		<jsp:getProperty property="name" name="registerBean"/>			<br>
가입날짜 : 	<jsp:getProperty property="reg_date" name="registerBean"/>		<br>
~~~

