---
title: Maven (로컬, 원격)저장소 이용하기
categories:  
- java 
- maven

tags:
   - maven
   - pom.xml
   - repository

author_profile: true #작성자 프로필 출력여부
read_time: true # read_time을 출력할지 여부 1min read 같은것!

toc: true #Table Of Contents 목차 보여줌2
toc_label: "My Table of Contents" # toc 이름 정의
toc_icon: "cog" # font Awesome아이콘으로 toc 아이콘 설정 
toc_sticky: true # 스크롤 내릴때 같이 내려가는 목차

last_modified_at: 2020-03-24T08:33:00 # 마지막 변경일

---
기존에는 필요한 라이브러리를 다운받아 넣어줘야 사용할 수 있던 것을 pom.xml에 태그만 기술함으로서 쉽게 라이브러리를 사용할 수 있게 되었다.  
그렇게 할 수 있는데에는 중앙 저장소 덕분이다.  

중앙 저장소는 일종의 라이브러리 보관 장소이고, 메이븐을 개발한 아파치 소프트웨어 재단이 운영하는 [사이트](https://repo1.maven.org/maven2/)이다.

주소를 지정해 원하는 저장소로 지정 가능하지만 아무것도 지정하지 않으면 **기본값으로 [메이븐 중앙 저장소](https://repo1.maven.org/maven2/)**로 지정된다.  

실제 사이트로 들어가보면 단순히 프로그램 이름(그룹ID, 아티팩트ID)로 디렉토리를 나누어 공개하고 있을 뿐 원하는 라이브러리를 찾기는 쉽지 않다.  
즉, 메이븐이 찾기에는 좋은 곳이지만 사용자가 원하는 라이브러리를 조사하기 위해 접속해봐도 별 도움은 되지 않는다.  

그래서 중앙 저장소에 등록된 라이브러리를 쉽게 검색해볼수 있는 [사이트]가 있다.



```
mvn package
```
위 명령어를 통해 만든 jar 파일은 manifest 속성이 빠져있다면 실행이 불가능하다.  


pom.xml에 [plugin](https://choiseonjae.github.io/plugin/%EA%B0%9C%EC%9A%94/)을 추가 해줘야한다.  


```xml
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-jar-plugin</artifactId>
	<version>[버전]</version>
	<configuration>
		<archive>
			<manifest>
				<addClasspath>true</addClasspath>
				<mainClass>[메인 클래스]</mainClass>
			</manifest>
		</archive>
	</configuration>
</plugin>
```

`maven-jar-plugin`은 `<configuration>` 내에 `<archive>` 태그를 구는데, 이는 압축에 관한 설정이다.  


그 안에 `<manifest>` 태그를 두고 두 가지 태그를 배치하는데  
* `<addClasspath>`는 클래스 경로에 JAR 파일이 있는 경로를 추가하기 위한 태그인데 보통은 **true**로 지정해 놓는다.
* `<mainClass>`는 실행할 메인 클래스를 지정한다.  


# Reference
*  [자바 프로젝트 필수 유틸리티](https://books.google.co.kr/books/about/%EC%9E%90%EB%B0%94_%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_%ED%95%84%EC%88%98_%EC%9C%A0%ED%8B%B8%EB%A6%AC%ED%8B%B0.html?id=jZdaDwAAQBAJ&printsec=frontcover&source=kp_read_button&redir_esc=y#v=onepage&q&f=false)

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEwMzEyNzQ3MzZdfQ==
-->