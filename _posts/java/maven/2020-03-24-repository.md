---
title: Maven 저장소 이용하기
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

기존에는 필요한 **라이브러리를 다운**받아 넣어줘야 사용할 수 있던 것을 **pom.xml에 태그만 기술**함으로서 쉽게 라이브러리를 사용할 수 있게 되었다.  **메이븐 중앙 저장소** 덕분이다.  

<br>

# 저장소
저장소는 일종의 라이브러리 보관 장소이다.

주소를 지정해 원하는 저장소로 지정 가능하지만 아무것도 지정하지 않으면 **기본값으로 [메이븐 중앙 저장소](https://repo1.maven.org/maven2/)**이 지정된다.  

실제 사이트로 들어가보면 단순히 **프로그램 이름**(그룹ID, 아티팩트ID)로 디렉토리를 나누어 공개하고 있을 뿐 원하는 라이브러리를 찾기는 쉽지 않다.  
즉, 메이븐이 찾기에는 좋은 곳이지만 사용자가 원하는 라이브러리를 조사하기 위해 접속해봐도 별 도움은 되지 않는다.  

그래서 중앙 저장소에 등록된 라이브러리를 쉽게 검색해볼수 있는 [사이트](https://search.maven.org/)가 있다.  
> 이용하는 방법은 [해당 포스팅](https://choiseonjae.github.io/java/maven/repository/central/)을 참고하면 된다.  



저장소는 크게 **로컬 저장소**와 **원격 저장소**로 나눌 수 있다.  

## 로컬 저장소
이용하려는 라이브러리에 따라서 중앙 저장소에 존재하지 않는 경우가 존재한다.  

자신이 만든 라이브러리 혹은 유명하지 않은 라이브러리라면 중앙 저장소에 공개되지 않을 수 있다.  

이럴 경우 로컬 저장소를 이용하면 되는데, 로컬 환경에 있는 저장소이다.  

메이븐은 로컬 볼륨에 저장소를 작성하며, 이곳에 설치한 라이브러리는 메이븐에서 원격 저장소와 동일하게 다룰 수 있다.  

### 메이븐 자작 라이브러리 생성하기
1. 프로젝트 및 클래스 생성
	```bash
	mvn archetype:generate
	```
	위 명령어를 실행한 뒤, 다음과 같이 프로젝트를 설정한다.  
	|key|value|
	|--|--|
	|archetype|maven-archetype-quickstart|
	|version|1.1(기본값)|
	|groupId|[groupId]|
	|artifactId|[artifactId]|
	|version|1.0-SNAPSHOT|
	|package|[package]|

	[]괄호로 쌓인 부분은 자신의 상황에 맞게 입력하면 된다.  

	이렇게 생성한 프로젝트에 자신이 원하는 클래스를 생성한다.  

2. pom.xml 수정
	
	



## 원격 저장소


# Reference
*  [자바 프로젝트 필수 유틸리티](https://books.google.co.kr/books/about/%EC%9E%90%EB%B0%94_%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_%ED%95%84%EC%88%98_%EC%9C%A0%ED%8B%B8%EB%A6%AC%ED%8B%B0.html?id=jZdaDwAAQBAJ&printsec=frontcover&source=kp_read_button&redir_esc=y#v=onepage&q&f=false)

* [메이븐 검색 사이트](https://search.maven.org/)

* [메이븐 중앙 저장소](https://repo1.maven.org/maven2/)

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTM4NjQzODM3OSwtNDA5NTM1NDE3LC0xNT
cyNTM5OTk0LDE4MzIyMzA0MzIsNzMzNDg2MzM1LDE2MjI3NzAw
MTJdfQ==
-->