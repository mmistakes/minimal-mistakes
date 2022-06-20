---
layout : single
title : JSP application 내장객체
categories: JSP
tags: [JSP]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

> ### JSP application 내장객체

- 경로를 뽑아올 수 있다

~~~jsp
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h2>application 내장객체</h2>
	<%
		String info = application.getServerInfo();
		String path = application.getRealPath("/");
		application.log("로그 기록 : ");
	%>
	
	웹 컨테이너의 이름 버전 : <%=info %> <br>
	웹 어플리케이션 폴더의 로컬 시스템 경로 : <%=path %>
	
</body>
</html>
~~~







