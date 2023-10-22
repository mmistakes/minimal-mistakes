---
layout: single
title:  "DB - DBCP"
categories: DB
tag: [DB]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br>







# ◆ DBCP란?

커넥션 풀이란? was가 실행되면서 DB와 미리 connection(연결)을 해놓은 객체들을 pool에 저장해 두었다가, 클라이언트 요청이 오면 connection을 빌려주고, 처리가 끝나면 실행된 상태로 다시 connection을 반납받아 pool에 저장하는 방식을 말한다.

![DBCP](https://github.com/pueser/pueser.github.io/assets/117990884/75c45ff2-49ff-485f-bd15-667c7d960ad0)

<br>



**커넥션 풀을 사용하는 이유**<br>자바에서는 DB에직접 연결해서 처리하는 경우 (JDBC) 드라이버를 로드하고 커넥션 객체를 받아와야한다. <br>그러면 매번 사용자가 요청을 할 때마다 드라이버를 로드하고 커넥션 객체를 생성하여 연결하고 종료하기 때문에 비효율적이다. 그래서 DBCP를 이용하여 이미 연결하는 작업을 pool에 있기 때문에 그것을 재사용 하는 것이다.

웹어플리케이션도 같은 얘기다.
웹 애플리케이션에서는 HTTP 요청에 따라 `Thread`를 생성하게 되고 대부분의 비지니스 로직은 DB 서버로 부터 데이터를 얻게 된다. 

<br>







# ◆ DBCP 과정

1) 웹 컨테이너(WAS)가 실행되면서 connection 객체를 `미리 pool에 생성해` 둔다.
2) HTTP 요청에 따라 pool에서 connection객체를 가져다 쓰고 반환한다.
3) 이와 같은 방식으로 물리적인 데이터베이스 connection(연결) 부하를 줄이고 연결을 관리 한다.
4) pool에 미리 connection이 생성되어 있기 때문에 connection을 생성하는 데 드는 요청마다 연결 시간이 소비되지 않는다.
5) connection을 계속해서 재사용하기 때문에 생성되는 커넥션 수를 제한적으로 설정함

<br>







# ◆ HikariCP

스프링 프로젝트를 진행하면서, 스프링부트 2.0부터 기본적으로 HikariCP를 사용하게 되었다.



**HikariCP 사용법**

1. Maven Repository에서 hikaricp을 pom.xml에 의존성 추가<br>

   ```java
   <!-- https://mvnrepository.com/artifact/com.zaxxer/HikariCP -->
   <dependency>
       <groupId>com.zaxxer</groupId>
       <artifactId>HikariCP</artifactId>
       <version>3.4.2</version>
   </dependency>	
   ```

2. root-context.xml에 DataSouce 설정 코드 추가

```java
<bean id="hikariConfig" class="com.zaxxer.hikari.HikariConfig">
    <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"></property>
    <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/데이터베이스명?serverTimezone=Asia/Seoul"></property> 
    <property name="username" value="사용자명"></property>
    <property name="password" value="비밀번호"></property>
</bean>	
	
<bean id="datasource" class="com.zaxxer.hikari.HikariDataSource" destroy-method="close">
    <constructor-arg ref="hikariConfig"></constructor-arg>
</bean>
```

<br>







# ◆ JDBC와 DBCP의 차이점

흔히 JDBC는 데이터베이스풀 방식을 사용하지 않고 DB에서 정보를 가져올 때마다 매번

디비연결을 열고 닫는 방식을 말한다.

디비풀을 사용하지도 않고, 각 페이지에 데이터베이스 통신이 필요한 부분이 있으면 무조건

디비객체 생성, 커넥션 연결, 커넥션종료 등 반복하기 때문에 효율이 매우 떨어진다.

따라서 가장 기본이 되지만 상용 어플리케이션에는 JDBC방식을 사용하는 경우는 거의 없다.



그렇기때문에 필요한 용어가 DBCP(Database Connection Pool)이며

기본적인 원리는 어플리케이션을 시작할 때 원하는 만큼 커넥션 객체를 만들어 놓고 pool에 넣어놓았다가

필요할때마다 갖다 쓰고 pool에 반납하는 방식으로 운영한다.





참고 블로그 : <a href="https://velog.io/@mooh2jj/%EC%BB%A4%EB%84%A5%EC%85%98-%ED%92%80Connection-pool%EC%9D%80-%EC%99%9C-%EC%93%B0%EB%8A%94%EA%B0%80">velog.io</a>
