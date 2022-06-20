---
layout : single
title : JSP와 데이터베이스 연동하기
categories: JSP
tags: [JSP]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

> ### JSP와 데이터베이스 연동하기 - JDBC사용

- JDK 1.8
  - 수많은 라이브러리가 각 패지지별로 구성
  
- JDBC
  - 데이터베이스 연동기능을 지원하기 위한 라이브러리
  - java.sql 패키지
  - 연동? 데이터베이스를 연결하고, SQL문을 실행하는 의미
  
- JDBC API

  1. Class.forName("오라클 or mysql") : 경로 찾아서 넣기

  2. Connection 인터페이스 : 연결 접속을 담당

  3. Statement 인터페이스 : 쿼리문 실행

     - PreparedStatement - 일반 SQL구문

  
     - CallableStatement - 프로시저 이용
  
  4. ResultSet : SELECT문***(SELECT문만 사용)*** 실행시 결과를 관리하는 객체
  
  - SQL구문을 실행요청
    - executeUpdate() : INSERT, UPDATE, DELETE 등
    - executeQuery() : SELECT문 데이터집합

---



> ##### 준비작업

- C:\Dev\Program\oracle\app\oracle\product\11.2.0\server\jdbc\lib 경로에 ojdbc6.jar 파일을 이클립스 WEB-INF에 복사하기

~~~jsp
SQL에 연결되는지 테스트 작업

<%@page import="java.sql.Connection"%>
<%@page import="java.sql.*"%>

<html>
<head>
<meta charset="UTF-8">
<title>JDBC Driver 테스트</title>
</head>
<body>
<h3>JDBC Driver 테스트</h3>
<%
	// 준비) WEB-INF/lib 폴더에 JDBC Driver가 존재해야 한다.
    // 현재 오라클이므로, ojdbc6.jar(jdk 1.8 지원/oracle 11g xe)
	Connection conn = null; // 1) 데이터베이스 연결기능
	
	// 예외(Exception) 문법 특징이 존재한다
	try{
		// 2) 데이터베이스 연결정보. SQL Deverloper 접속툴에서 사용한 정보를 코드로 구성
		String jdbcUrl = "jdbc:oracle:thin:@localhost:1521:xe";
		String dbId = "ora_user"; // 아이디는 대소문자 구분안함
		String dbPass = "1234"; // 비번은 대소문자 구분함
		
		// oracle회사에서 제공하는 오라클DB를 접속하기 위한 Driver의 정보.
         // 메모리상에 DriverManager 객체생성
		Class.forName("oracle.jdbc.OracleDriver");
		// url, id, pw에 연결을 시도
		conn = DriverManager.getConnection(jdbcUrl, dbId, dbPass);
		
		out.println("연결 성공");
		
	}catch(Exception e){
		e.printStackTrace();
	}

%>
</body>
</html>
~~~

---

> ### 연결 예제

- 데이터 폼 형성
- 전송 키 누르면 폼의 액션에 형성된 insertPro.jsp로 이어진다

~~~jsp
insertForm.jsp 파일

<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h3>회원가입</h3>
	<form method="post" action="insertPro.jsp">
		<dl>
			<dd>
				<label for="userId">아이디</label>
				<input type="text" name="userId" id="userId" placeholder="user01@abc.com" autofocus required>
			</dd>
			<dd>
				<label for="passwd">비밀번호</label>
				<input type="password" name="passwd" id="passwd" placeholder="비밀번호 입력" required>
			</dd>
			<dd>
				<label for="username">이름</label>
				<input type="text" name="username" id="username" placeholder="이름을 입력" required>
			</dd>
			<dd>
				<label for="addr">주소</label>
				<input type="text" name="addr" id="addr" placeholder="주소 입력" required>
			</dd>
			<dd>
				<label for="tel">연락처</label>
				<input type="text" name="tel" id="tel" placeholder="연락처 입력" required>
			</dd>
			<dd>
				<input type="submit" value="전송">
			</dd>
		</dl>
	</form>
</body>
</html>
~~~

- 전송된 데이터를 받아 sql에 연결 insert를 통해 데이터를 넣는다

~~~jsp
insertPro.jsp 파일

<%@page import="java.sql.*"%>

<%
// 오라클 데이터베이스 MEMBER 테이블에 사용자가 입력한 데이터 저장목적
	request.setCharacterEncoding("UTF-8");

	String userId = request.getParameter("userId");
	String passwd = request.getParameter("passwd");
	String username = request.getParameter("username");
	String addr = request.getParameter("addr");
	String tel = request.getParameter("tel");
	
	// jdbc 작업
	// 데이터베이스 연결
	Connection conn = null;
	// SQL 구문 실행객체
	PreparedStatement pstmt = null;
	String str = "";
	try {
		// 데이터베이스 연결정보
		String url = "jdbc:oracle:thin:@localhost:1521:xe";
		String id = "ezen";
		String password = "1234";
		
		Class.forName("oracle.jdbc.OracleDriver");
		// 1) conn객체가 생성이 되면, 오라클DB에 연결됨을 의미한다
		conn = DriverManager.getConnection(url, id, password);
		// out.println("연결 성공");
		
		// 쿼리문구성
		String sql = "insert into member(userid, passwd, username, addr, tel) values(?, ?, ?, ?, ?)";
		// 2) pstmt 객체생성
		pstmt = conn.prepareStatement(sql);
		// 5개의 ?에 대채될 값을 지정. 컬럼의 값을 지정시 set타입이름() 메서드 사용
		pstmt.setString(1, userId);
		pstmt.setString(2, passwd);
		pstmt.setString(3, username);
		pstmt.setString(4, addr);
		pstmt.setString(5, tel);
		
		// 쿼리 실행요청
		
		// SELECT 사용시
		// pstmt.executeQuery(sql);
		
		// INSERT, UPDATE, DELETE 사용시
		pstmt.executeUpdate(); // sql 변수의 insert구문이 오라클서버에게 실행요청을 하게된다
		
		out.println("member 테이블에 새로운 레코드가 추가되었습니다");
		
	} catch(Exception ex){
		// 예외정보를 콘솔에서 확인
		ex.printStackTrace();
		out.println("member 테이블에 새로운 레코드가 추가실패");
	} finally {
		// 예외발생 여부와 상관없이, 반드시 실행시킬 구문을 작성한다
		// jdbc 관련객체는 소멸작업을 해주어야 메모리누수를 방지할 수가 있다
		// 작업이 conn-pstmt 객체생성의 역순으로 close()작업 호출
		if(pstmt != null)
			try{pstmt.close();}catch(Exception ex){}
		if(conn != null)
			try{conn.close();}catch(Exception ex){}
	}
	
%>
~~~

- insert 된 데이터를 select 문을 통해 출력해보자

~~~jsp


<%@page import="java.sql.*"%>

<table border="1">
	<tr>
		<td>아이디</td>
		<td>비밀번호</td>
		<td>이름</td>
		<td>주소</td>
		<td>전화번호</td>
		<td>가입일자</td>
	</tr>

<%
	// member테이블의 모든 데이터를 불러와서, 화면에서 출력한다

	// jdbc 작업
	// 데이터베이스 연결
	Connection conn = null;
	// SQL 구문 실행객체
	PreparedStatement pstmt = null;
	// member 테이블의 데이터를 저장할 기억장소 생성
	ResultSet rs = null;
	
	
	
	String str = "";
	try {
		// 데이터베이스 연결정보
		String url = "jdbc:oracle:thin:@localhost:1521:xe";
		String id = "ezen";
		String password = "1234";
		
		Class.forName("oracle.jdbc.OracleDriver");
		// conn객체가 생성이 되면, 오라클DB에 연결됨을 의미한다
		conn = DriverManager.getConnection(url, id, password);
		// out.println("연결 성공");
		
		// 쿼리문구성
		String sql = "select * from member";
		pstmt = conn.prepareStatement(sql);
		
		// rs객체가 "select * from member" 구문이 실행된 결과를 메모리상에서 참조하게 된다
		// rs객체에 데이터 위치를 나타내는 커서가 존재하는데, 처음에는 커서가 헤더위치에 존재
		// rs.next() :
		// 커서를 다음위치로 이동. 이동된 위치에 데이터가 존재하면 true,아니면 false로 반환해주는 기능제공
		rs = pstmt.executeQuery();
		
		// rs객체의 커서가 헤더에 존재 상태에서, next()메서드에 의하여, 다음위치로 이동되고, 데이터존재 유무를 확인
		// -- userid, passwd, username, addr, tel
		while(rs.next()){
			String userid = rs.getString("userid");
			String passwd = rs.getString("passwd");
			String username = rs.getString("username");
			String addr = rs.getString("addr");
			String tel = rs.getString("tel");
			Timestamp reg_date = rs.getTimestamp("reg_date");
%>

	<tr>
		<td><%= userid %></td><td><%= passwd %></td><td><%= username %></td><td><%= addr %></td><td><%= tel %></td><td><%= reg_date %></td>
	</tr>

<%		}
		
		
		
	} catch(Exception ex){
		ex.printStackTrace();
	} finally {
		// 예외발생 여부와 상관없이, 반드시 실행시킬 구문을 작성한다
		// jdbc 관련객체는 소멸작업을 해주어야 메모리누수를 방지할 수가 있다
		// 작업이 conn-pstmt-rs 객체생성의 역순으로 close()작업 호출
		if(rs != null)
			try{rs.close();}catch(Exception ex){}
		if(pstmt != null)
			try{pstmt.close();}catch(Exception ex){}
		if(conn != null)
			try{conn.close();}catch(Exception ex){}
	}
	
%>

</table>
~~~

