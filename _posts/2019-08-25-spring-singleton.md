---
title: "Spring Singleton"
date: 2019-08-25
categories: web, spring
comments: true
---
> Spring Singleton

### Singleton이란?
> 생성자가 여러차례 호출되더라도 실제로 생성되는 instance는 하나이다.  
> 주로 공통된 객체를 여러개 생성해서 사용하는 DBCP(DataBase Connection Pool)와 같은 상황에서 많이 사용된다.

### Spring Singleton
- 스프링에서 기본 값(scope="singleton")으로 beans을 싱글톤으로 [IOC](https://rerewww.github.io/web,/spring/Inversion-oif-control/) 컨테이너에 관리된다.
- **컨테이너 당 하나의 싱글톤 bean id*를 관리한다.
- 아래의 코드 처럼 같은 클래스의 서로 다른 bean id를 생성하면 같은 클래스이지만 두 개의 인스턴스가 생성되어 관리된다.
```java
	@Bean(name = "bean1")
	public UserInfo userInfo1(){
		return new UserInfo("Test User 1");
	}

	@Bean(name = "bean2")
	public UserInfo userInfo2(){
		return new UserInfo("Test User 2");
	}
```
- 상태(State)가 없는 bean은 singleton으로 사용할 수 있다.

### Spring Singleton은 Thread-safe인가?
- Dao, Service, Controller등의 상태가 없는 bean은 동시 요청에 대한 영향을 받지 않는다.
- 그러나, 상태가 존재하는 클래스(Member, Person, Student같은 상태를 저장하고 있는 클래스)를 bean으로 등록하여 싱글톤으로 사용한다면 Thread-safe하지 않다.

### 결론
- 스프링 IOC 컨테이너 당 beans을 관리하고 기본 값은 싱글톤이다.
- bean ID에 대하여 하나의 싱글톤 bean을 관리한다.