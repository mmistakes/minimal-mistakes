---
layout: single
title: '[Spring] SpringBoot 제대로 알기 - IoC(Inversion of Control) 와 DI (Dependency Injection) '
categories: SpringBoot
tag: [Spring, SpringBoot]
toc: true 
author_profile: false
sidebar:
    nav: "counts"
published: true

---

<i>면접 준비 겸 SpringBoot에 대해 제대로 정리해보자</i>

## Spring
Spring 사이트에 들어가면 스프링에 대해 다음과 같이 설명한다.

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-07-03-springboot-IOC-DI\spring.png" alt="Alt text" style="width: 40%; height: 50%; margin: 50px;">
</div>

>스프링(Spring)은 자바 프로그래밍을 더 빠르고, 쉽고, 안전하게 만듭니다. 스프링은 속도, 단순성, 생산성에 중점을 두어 세계에서 가장 인기 있는 자바 프레임워크가 되었습니다. 스프링은 Inversion of Control(IoC)와 Dependency Injection(DI) 기능을 바탕으로 확장 가능한 애플리케이션을 구축할 수 있도록 돕습니다.


위 설명을 읽으면 저체적인 내용이 파악되지만 IoC와 DI 부분은 정확히 이해되지 않았다. **Inversion of Control(IoC)와 Dependency Injection(DI)** 를 제대로 알고 넘어가자. 


##  IoC(Inversion of Control)란? 
IoC는 제어의 역전(Inversion of Control)을 의미합니다. 전통적인 프로그래밍에서는 개발자가 직접 프로그램의 흐름을 제어하지만, IoC에서는 프레임워크가 객체의 생성과 관리를 담당한다. Spring은 IoC를 지원하기 위해 ApplicationContext라는 컨테이너를 제공한다.

### IOC 컨테이너란?

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-07-03-springboot-IOC-DI\IOC.png" alt="Alt text" style="width: 40%; height: 50%; margin: 50px;">
</div>

IoC 컨테이너는 IoC를 제공하는 Bean을 담고 있는 컨테이너이다. Bean은 IoC 컨테이너에서 관리하는 객체를 의미하며, Spring은 이 객체들을 필요에 따라 적절하게 주입하여 사용하게 한다.

이로 인해 개발자는 객체의 생성과 호출 시점에 대해 신경 쓸 필요 없이, 프레임워크가 객체를 생성, 관리, 소멸시키는 역할을 한다.



- 작업의 구현과 흐름을 분리
- 모듈 제작 시 결합도 고민 감소
- 시스템의 동작 방식을 신경 쓰지 않고 협약대로 동작
- 모듈 변경 시 다른 시스템에 부작용 없음

이 방식은 모듈화를 용이하게 하고, 시스템의 확장성과 유지보수를 개선한다.


## DI (Dependency Injection)란?
DI는 객체 간의 의존성을 프레임워크가 주입하는 개념이다. DI는 IoC를 구현하기 위한 하나의 디자인 패턴으로, 객체 간의 의존 관계를 외부에서 주입하는 것을 말한다.


```java
public class Car {
    private final Engine B = new EngineB();
}
```

위 코드에서는 Car 클래스가 EngineB에 의존합니다. 이를 EngineA로 바꾸려면 Car 클래스를 수정해야 한다.


```java
public class Car {
    private final Engine engine;
    
    public Car(Engine engine){
        this.engine = engine;
    }
}
```
이 코드에서는 **생성자를 통해 외부에서 Engine을 주입받는다.** 이렇게 하면 Engine이 교체되어도 Car 클래스 코드를 수정할 필요가 없다.


### 의존성 주입 방식
1. 생성자 주입 (Constructor Injection)
2. 수정자 주입 (Setter Injection)
3. 필드 주입 (Field Injection)

위 방법 중 스프링에서 권장하는 방법은 **생성자 주입**이다.


### 생성자 주입 ( Constructor Injection )
생성자 주입이란 생성자를 통해 의존관계를 주입하는 방법으로 생성자를 호출 시에 딱 한 번만 호출되는 것을 보장한다.

스프링 4.3 버전 이후라면 @Autowired를 생략해도 주입이 되며, 이 방법은 객체가 생성될 때 의존성을 한번에 주입받기 때문에 의존성 주입 후에 변경이 불가능하다는 점에서 불변성을 확보할 수 있다는 장점이 있다.

```java
@Slf4j
@Service
public class AuthServiceImpl implements AuthService {


    private final AuthRepository authRepository;

    //  생성자가 1개인 경우 @Autowired를 생략
    public AuthServiceImpl(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    @Override
    public void initializeRoles() throws Exception {
        log.info("[AuthServiceImpl][initializeRoles] Start");
        authRepository.insertRoleAdmin();
    }

}


```

>RequiredArgsConstructor 이용한 생성자 주입 

```java
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthRepository authRepository;
    
    @Override
    public void initializeRoles() throws Exception {
        log.info("[AuthServiceImpl][initializeRoles] Start");
        authRepository.insertRoleAdmin();
    }

}

```

### Setter 주입(Setter Injection)
Setter 주입은 의존성을 주입받는 클래스의 setter 메서드를 통해 의존성을 주입하는 방법이다 . 
Setter 주입은 생성자 주입과 다르게 주입받는 객체가 변경될 가능성이 있는 경우에 사용한다. 이 방법은 객체가 생성된 후에도 의존성을 변경할 수 있다는 점에서 유연성을 제공하지만, 의존성이 변경될 가능성이 있기 때문에 불변성을 확보하기 어렵다.

```java

    // @Autowired와 setter는 필드를 final로 선언할 수 없다.
    private  AuthRepository authRepository;

    @Autowired
    public void setAuthRepository(AuthRepository authRepository){
        this.authRepository =authRepository;
    }

```

@Autowired로 주입할 대상이 없는 경우에는 오류가 발생한다. 주입할 대상이 없어도 동작하도록 하려면 @Autowired(required = false)를 통해 설정할 수 있다.

### 필드 주입(Field Injection)

필드 주입은 의존성을 주입받는 클래스의 필드에 직접 의존성을 주입하는 방법이다. 이 방법은 코드가 간결하다는 장점이 있지만, 의존성이 변경될 가능성이 있고 테스트하기 어렵다는 단점이 있다.

```java
public class AuthServiceImpl implements AuthService {

    @Autowired
    private  AuthRepository authRepository;

}
```
코드가 단순해진다는 이유로 내가 자주썼던 방법이다. **하지만 Spring에서 필드 주입을 권장하지 않는다.** 

필드 주입을 사용하려면 @Autowired를 이용해야 하는데, 이것은 스프링이 제공하는 어노테이션이다. 그러므로 @Autowired 를 사용하면 스프링 의존성이 침투하게 된다.

필드 주입을 사용하면 반드시 DI 프레임워크가 존재해야 하므로 테스트가 어렵다. 객체를 직접 생성하면서 의존성을 주입하는 생성자 주입을 사용하면, 테스트가 더 용이하게 된다.


**테스트 코드 예제**

#### 1. 필드 주입 예제

```java
// test code 
@RunWith(MockitoJUnitRunner.class)
public class AuthServiceImplTest {

    @Mock
    private AuthRepository authRepositoryMock;

    private AuthServiceImpl authService;

    @Before
    public void setUp() {
        authService = new AuthServiceImpl();
        // authService 객체의 authRepository 필드에 Mock 객체 주입
        ReflectionTestUtils.setField(authService, "authRepository", authRepositoryMock);
    }

    @Test
    public void testAuthenticateUser() {
    }
}
```
ReflectionTestUtils를 통해 authService 객체의 authRepository 필드에 Mock 객체를 주입하는 추가적인 과정이 필요하다.

#### 2. 생성자 주입 예제

```java
@RunWith(MockitoJUnitRunner.class)
public class AuthServiceImplTest {

    @Mock
    private AuthRepository authRepositoryMock;

    private AuthServiceImpl authService;

    @Before
    public void setUp() {
        authService = new AuthServiceImpl(authRepositoryMock);
    }

    @Test
    public void testAuthenticateUser() {
    }
}
```

AuthServiceImpl 객체를 생성할 때 생성자를 통해 Mock 객체를 전달하여 간단하게 테스트할 수 있다.


또한, 필드 주입을 사용하면 객체가 생성된 후에도 의존성이 변경될 수 있다. 이는 불변성을 해칠 수 있으므로 객체의 안정성을 보장하기 어다. 이러한 문제를 방지하기 위해서는 **생성자 주입을 사용하는 것이 좋다.** 

### 생성자 주입을 사용해야 하는 이유

- 객체의 불변성을 확보할 수 있다.
- 테스트 코드의 작성이 용이해진다.
- final 키워드를 사용할 수 있고, Lombok과의 결합을 통해 코드를 간결하게 작성할 수 있다.
- 스프링에 침투적이지 않은 코드를 작성할 수 있다.
- 순환 참조 에러를 애플리케이션 구동(객체의 생성) 시점에 파악하여 방지할 수 있다.


<br>
<br>

## 코드 리팩토링하기 

**final 키워드와 Lombok을 이용한 생성자 주입 방식을 적용했다.**

### 1. 필드 주입 방식 리팩토링 

기존 코드를 살펴보면 @Autowired 를 ㅇ
```java
@Service
public class AuthDaoImpl implements AuthDao{
    
    @Autowired
    private AuthRepository authRepository;

    @PostConstruct
    public void initializeRoles() {
        authRepository.insertRoleUser();
        authRepository.insertRoleAdmin();
    }
}

```

<br>

**생성자 주입 방식 적용**

```java
@Service
@RequiredArgsConstructor
public class AuthDaoImpl implements AuthDao {

    private final AuthRepository authRepository;

    @PostConstruct
    public void initializeRoles() {
        authRepository.insertRoleUser();
        authRepository.insertRoleAdmin();
    }
}
```

### 2. @AllargsConstructor 생성자 주입 방식 리팩토링

 @AllArgsConstructor는 클래스에 존재하는 모든 필드에 대한 생성자를 자동으로 생성해주는 어노테이션이므로 필드에 final 키워드와  @NonNull 어노테이션이 붙은 대상에 한해서 생성자를 생성해 주는 @RequiredArgsConstructor를 쓰는것이 바람직하다.

 ```java
@Service
@AllArgsConstructor
@Slf4j
public class CertificateInfoImpl implements CertificateInfoDao {

    final private CertificateInfoRepository certificateInfoRepository;

}

 ```

**@RequiredArgsConstructor 을 이용한 생성자 주입 방식 적용** 

```java
@Service
@RequiredArgsConstructor
@Slf4j
public class CertificateInfoImpl implements CertificateInfoDao {

    final private CertificateInfoRepository certificateInfoRepository;

}

 ```


 
<br>
<br>

----
Reference

- <a href = 'https://velog.io/@developerjun0615/Spring-RequiredArgsConstructor-%EC%96%B4%EB%85%B8%ED%85%8C%EC%9D%B4%EC%85%98%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%83%9D%EC%84%B1%EC%9E%90-%EC%A3%BC%EC%9E%85'>[Spring] @RequiredArgsConstructor 어노테이션을 사용한 "생성자 주입" by 노경준</a>
- <a href = 'https://1minute-before6pm.tistory.com/73'>왜 Spring에서는 필드 주입을 지양하나? by Back to basics</a>
- <a href = 'https://mangkyu.tistory.com/125'>[Spring] 다양한 의존성 주입 방법과 생성자 주입을 사용해야 하는 이유 - (2/2) by [MangKyu's Diary:티스토리]</a>

- <a href = 'https://velog.io/@sujin1018/%EC%8A%A4%ED%94%84%EB%A7%81-Spring-%EC%9D%98%EC%A1%B4%EC%84%B1-%EC%A3%BC%EC%9E%85-%EB%B0%A9%EB%B2%95-%EB%B0%8F-%EC%83%9D%EC%84%B1%EC%9E%90-%EC%A3%BC%EC%9E%85-%EB%B0%A9%EB%B2%95%EC%9D%98-%EC%9E%A5%EC%A0%90'>[스프링] Spring 의존성 주입 방법 및 생성자 주입 방법의 장점 by 모래벨로그</a>

- <a href = 'https://developbear.tistory.com/87'>[Spring] Ioc(제어의 역전)와 DI(의존성 주입)의 개념과 그 차이 by 김베어의 개발일지</a>


- <a href = 'https://subscription.packtpub.com/book/web-development/9781787284661/1/ch01lvl1sec8/introduction-to-the-spring-ioc-container'>IOC Image : Introduction to the Spring IOC container</a>





