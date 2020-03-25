---
title: build(빌드)와 compile(컴파일)의 차이점은 무엇일까?
categories:  difference

tags:
   - build
   - compile

author_profile: true #작성자 프로필 출력여부
read_time: true # read_time을 출력할지 여부 1min read 같은것!

toc: true #Table Of Contents 목차 보여줌2
toc_label: "My Table of Contents" # toc 이름 정의
toc_icon: "cog" # font Awesome아이콘으로 toc 아이콘 설정 
toc_sticky: true # 스크롤 내릴때 같이 내려가는 목차

last_modified_at: 2020-03-25T08:44:00 # 마지막 변경일

---

이클립스와 같은 IDE를 사용하기 때문에 컴파일과 빌드의 개념에 대해 잘 알지 못했다.

단지 소스코드를 작성하고 이클립스에서 run을 실행하면 알아서 모든 과정이 자동으로 실행되기 때문이다.

빌드와 컴파일이라는 단어를 혼용해서 사용하곤 했다.  
 
컴파일과 빌드란 무엇이고 그 차이점에 대해서 알아보자.

# 정의  

## 컴파일(Compile)

컴파일이란 개발자가 작성한 소스코드를 바이너리 코드로 변환하는 과정을 말한다. (목적파일이 생성됨)

즉, 컴퓨터가 이해할 수 있는 기계어로 변환하는 작업이다. 이러한 작업을 해주는 프로그램을 가르켜 컴파일러(Compiler)라 한다.

자바의 경우, 자바가상머신(JVM)에서 실행가능한 바이트코드 형태의 클래스파일이 생성이 된다.

  

## 링크(link)

* 프로젝트를 진행하다 보면 소스파일이 여러개가 생성이되고 A라는 소스파일에서 B라는 소스파일에 존재하는 함수(메서드)를 호출하는 경우가 있다.
이때 A와 B 소스파일 각각을 컴파일만 하면 A가 B에 존재하는 함수를 찾질 못하기 때문에 호출할 수가 없다.
따라서 A와 B를 연결해주는 작업이 필요한데 이 작업을 링크라고 한다.

* 여러개로 분리된 소스파일들을 컴파일한 결과물들에서 최종 실행가능한 파일을 만들기 위해 필요한 부분을 찾아서 연결해주는 작업이다.

* 링크는 정적링크(static link)와 동적링크(dynamic link)가 있는데
	* 정적링크란 컴파일된 소스파일을 연결해서 실행가능한 파일을 만든다.  
	* 동적링크란 프로그램 실행 도중 프로그램 외부에 존재하는 코드를 찾아서 연결하는 작업을 말한다.

* 자바의 경우, JVM이 프로그램 실행 도중 필요한 클래스를 찾아서 클래스패스에 로드해주는데 이는 동적링크의 예이다.


## 빌드(Build)

- 소스코드 파일을 컴퓨터에서 실행할 수 있는 독립 소프트웨어 가공물로 변환하는 과정 또는 그에 대한 결과물 이다.  

- 즉, 우리가 작성한 **소스코드**(java), 프로젝트에서 쓰인 각각의 **파일 및 자원** 등(.xml, .jpg, .jar, .properties)을 JVM이나 톰캣같은 WAS가 **인식할 수 있는 구조로 패키징 하는 과정** 및 결과물이라고 할 수 있다.

* 빌드의 단계 중 컴파일이 포함이 되어 있는데 컴파일은 빌드의 부분집합이라 할 수 있다.


### 빌드 툴(Build Tool)

* 빌드 과정을 도와주는 도구를 빌드 툴이라 한다.

* 일반적으로 빌드 툴이 제공해주는 기능으로는 다음과 같은 기능들이 있다.
	* 전처리(preprocessing)
	* 컴파일(Compile)
	* 패키징(packaging)
	* 테스팅(testing)
	* 배포(distribution)

* 빌드 툴로는 **Ant, Maven, Gradle** 등이 있다.

<br>

# Reference
* [https://freezboi.tistory.com/39](https://freezboi.tistory.com/39) [코딩 공작소]

* [갓대희의 작은공간](https://goddaehee.tistory.com/199)

<!--stackedit_data:
eyJoaXN0b3J5IjpbNjI5NjE0MjA4LC0xMDE1MjY5Nzc3XX0=
-->