---
layout: post
title: "스프링부트 시작 ~ 테스트코드"
---

# 1. 스프링 프로젝트 생성
![image](https://user-images.githubusercontent.com/86642180/142897882-22179ccf-60da-4ad5-bb02-2ccb87f4d1ee.png)
gradle 프로젝트 - Java 선택  
왜 gradle 프로젝트 선택하는지 모르겠다.  
maven 대신에 의존성을 gradle로 주입할 프로젝트를 생성하기 위해서 인것 같다. 

![image](https://user-images.githubusercontent.com/86642180/142900499-9ed9697d-2fa6-48ba-941e-9c6a3a0296f4.png)
그렇게 생성된 프로젝트 화면  
현재 보이는 build.gradle에 스프링부트에 의존성(dependecy)를 추가할 수 있다.  
마치 maven project의 pom.xml 느낌이다.  
의존성을 추가하면 객체들에게 다 적용이 되는 것이니까 필요한거 잊지 말 것.  

<br>
spring initializer(start.spring.io)나 처음부터 spring initializr로 프로젝트를 생성하면  
더 쉽게 생성할 수 있으나 지금은 gradle을 처음 쓰는 것이기에  
gradle에서 spring boot 프로젝트 만드는 방법을 익힌다.


<br>
# 2. 그레이들 프로젝트 👉 스프링부트 프로젝트

![image](https://user-images.githubusercontent.com/86642180/142904457-12272a37-811d-4963-af4f-21ad96c85634.png)

build.gradle 가장 위에 있을 코드다.  
<b>ext</b>는 gradle의 전역변수 설정 키워드다.  
springBootVersion 전역변수 생성 뒤 그 값을 2.6.0.RELEASE로 하겠다는 것이다.  
💡 스프링부트 그레이들 플러그인의 2.6.0.RELEASE를 의존성으로 쓰겠다는 뜻

<br>
책에서는 2.1.7을 쓰지만 가장 최근인 2.6을 쓴다.  
나중에 무슨 에러가 생길지 몰라도 하고 본다.  

<br>
역시나 에러가 생긴다 2022년 2월 1일부터 jcenter()라는 함수가 사용이 안되나보다.  
<b>jCenter is the public repository hosted at bintray that is free</b> to use for open source library publishers.  
It is the largest repository in the world for Java and Android OSS libraries, packages and components  

<br>
참고 jcenter()의 역할
<b>jcenter delivers library through CDN which means improvements in CI and developer builds.</b>  
jcenter is the largest Java Repository on earth.  
This means that whatever is available on Maven Central is available on jcenter as well.  
It is incredibly easy to upload your own library to bintray.  

<br>
둘다 출처는 stack over flow  

<br>
불과 올해 초 추세는 jcenter()가 mavenCentral()을 압도한다고 했다.  
왜냐하면 jcenter()가 더 간단하게 library를 업로드하기 쉬우며  
jcenter를 통해 project repository에 라이브러리 업로드하면  
mavenCentral에도 업로드가 가능해서 였다.  

<br>
하지만 지금은 jcenter()를 검색하면 replacement가 세번째 추천 검색어다.  




<br><br><br>
<i>참고 : 스프링부트와 AWS로 혼자 구현하는 웹서비스</i>
