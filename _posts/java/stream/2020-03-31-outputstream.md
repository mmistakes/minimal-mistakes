---
title: \[Java] OutputStream의 정의와 종류
categories:  
- java 
- stream

tags:
- FileOutputStream
- PrintStream
- BufferedOutputStream
- DateOutputStream
- ServletOutputStream
- OutputStream
- write
- flush

isPost: false

author_profile: true #작성자 프로필 출력여부
read_time: true # read_time을 출력할지 여부 1min read 같은것!

toc: true
toc_label: "목차"
toc_icon: "cog" # font Awesome아이콘으로 toc 아이콘 설정 
toc_sticky: true # 스크롤 내릴때 같이 내려가는 목차

last_modified_at: 2020-03-31T10:57:00
---

# OutputStream

추상 클래스이며 바이트 기반 출력 스트림의 최상위 클래스입니다.

모든 바이트 기반의 출력 스트림 클래스들은 이 클래스를 상속받아 만들어집니다.

* FileOutputStream
 PrintStream
 BufferedOutputStream
* DateOutputStream
* ServletOutputStream


OutputStream 의 추상 메소드
> 여기서 나오는 예시 코드들의 new OutputStream은 예시입니다.  
> **추상클래스는 인스턴스를 생성할 수 없습니다.**  
> 상황에 맞는 상속받은 클래스를 이용해 객체를 생성해야 합니다.  

* **write( int b )**
	매개 변수로 주어진 int 값에서 끝에 있는 1Byte만 출력 스트림으로 보냅니다.

	매개 변수가 정수 타입이지만 4Byte를 모두 보내는 것은 아닙니다.
	```java
	OutputStream outputStream = new OutputStream("파일 경로");

	byte[] datas = "ABC".getBytes();
	for( int i = 0; i< datas.length(); i++ ) {
		outputStream.write(datas[i]);
	}
	```
<br>

* **write( byte[] b )**
	매개값으로 주어진 바이트 배열의 모든 바이트를 출력 스트림으로 보냅니다.
	```java
	OutputStream outputStream = new OutputStream("파일 경로");

	byte[] datas = "ABC".getBytes();
	outputStream.write(datas);
	```
	
	"ABC" 를 한번에 모두 출력합니다.
<br>
  

* **write( byte[] b, int off, int len )**
	b[off] 부터 len 개의 바이트를 출력 스트림으로 보냅니다.

	```java
	OutputStream outputStream = new OutputStream("파일 경로");

	byte[] datas = "ABC".getBytes();
	outputStream.write(datas, 1,2);
	```
	"BC"만 출력
<br>
  

* **flush()**
	출력 스트림의 내부에는 작은 버퍼가 있습니다.
	
	데이터가 출력되기 전에 버퍼에 쌓여 있다가, 순서대로 출력합니다

	flush()는 버퍼에 남아있는 데이터를 모두 출력시키고, 버퍼를 비우는 역할을 합니다.

	더 이상 출력할 데이턱 없다면 flush()를 마지막에 호출해 버퍼에 남아있는 데이터가 모두 출력 되도록 해야 합니다.
<br>
* **close()**
	OutputStream을 더 이상 사용하지 않는 다면 close()를 호출해 사용했던 시스템 자원을 풀어줘야 합니다.



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

* [IOS를 Java](https://altongmon.tistory.com/266) 
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjA0NDY5MDMwNiwyMDUwMzkwNzU1XX0=
-->