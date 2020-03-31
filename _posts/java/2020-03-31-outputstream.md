---
title: [Java] OutputStream이란? 
categories:  
- java 
- netty

tags:
   - netty

isPost: false

author_profile: true #작성자 프로필 출력여부
read_time: true # read_time을 출력할지 여부 1min read 같은것!

toc: true
toc_label: "목차"
toc_icon: "cog" # font Awesome아이콘으로 toc 아이콘 설정 
toc_sticky: true # 스크롤 내릴때 같이 내려가는 목차

last_modified_at: 2020-03-31T09:34:00 # 마지막 변경일
---
# OutputStream

추상 클래스이며 바이트 기반 출력 스트림의 최상위 클래스입니다.

모든 바이트 기반의 출력 스트림 클래스들은 이 클래스를 상속받아 만들어집니다.

* FileOutputStream
* PrintStream
* BufferedOutputStream
* DateOutputStream
* ServletOutputStream

  
  


## ServletOutputStream

파일을 읽어올 때에는 FileInputStream으로 읽어온 뒤 브라우저에 출력할 때에는  **ServletOutputStream**을 사용한다.

ServletOutputStream의 용도는 게시판에 파일을 올릴 때 사용한다.

[ServletOutputStream](https://tomcat.apache.org/tomcat-8.0-doc/servletapi/index.html)  은 추상클래스이기 때문에 인스턴스를 생성할 수 없다.

[ServletResponse](https://tomcat.apache.org/tomcat-8.0-doc/servletapi/index.html)  클래스에 getOutputStream()이라는 함수를 통해  **servletOutputStream** 인스턴스를 받아서 사용해야한다.

```java
// resp = HttpServletResponse의 객체
ServletOutputStream sos = resp.getOutputStream();

sos.write(쓰고자하는 데이터의 버퍼);
sos.flush();
sos.close();
```

  
  
# Reference
* [공부를 위한 블로그](https://pozt1234.tistory.com/29) 
* 
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTk5Njk4MzExOF19
-->