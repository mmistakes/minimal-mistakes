---
layout: single
title: '[Spring] SpringBoot 제대로 알기 - AOP ( Aspect Oriented Programming )'
categories: SpringBoot
tag: [Spring, SpringBoot]
toc: true 
author_profile: false
sidebar:
    nav: "counts"
published: true

---

<i>면접 준비 겸 SpringBoot에 대해 제대로 정리해보자</i>


## AOP ( Aspect Oriented Programming )

AOP는 Aspect Oriented Programming의 준말로, 관점 지향 프로그래밍이라고 한다.

관점 지향 프로그래밍은 어떤 로직을 기준으로 **핵심 관심사(Core Concern)**와 **공통 관심사(Cross-cutting Concern)**로 나누어서 각각을 모듈화하는 개발 방법론이다. 핵심 관심사는 각 객체가 가져야 할 주요 기능을 말하며, 공통 관심사는 여러 객체에서 공통으로 사용되는 코드를 의미한다. 이렇게 모듈화란 공통된 로직이나 기능을 하나의 단위로 묶는 것을 말한다.

AOP에서는 이러한 관심사들을 기준으로 코드를 모듈화하여 재사용성을 높이고 중복을 줄인다. 예를 들어, 여러 메소드에서 반복되는 로깅, 트랜잭션 관리 등을 횡단적으로 처리할 수 있다. 이런 횡단적인 관심사를 **흩어진 관심사(Crosscutting Concerns)**라고 한다.

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-07-03-springboot-AOP\AOP.png" alt="Alt text" style="width: 50%; height: 70%; margin: 10px;">
</div>

만약 A에서 주황색 블록을 수정해야 할 경우, 이 로직이 클래스 B와 C에 모두 적용되는 상황이 발생할 수 있다. 이때는 유지보수 관점에서 모든 코드를 일일이 수정하는 것이 아니라, 공통 관심사를 담당하는 AspectX만 수정하면 된다. 따라서 재사용성과 유지보수성을 크게 향상시킬 수 있다.  

AspectX는 여러 클래스나 메소드에서 공통적으로 필요한 기능을 제공하므로, 변경 사항이 생겼을 때 한 곳에서만 수정하면 모든 관련 코드에 반영된다.

AOP 용어 정리
------

| 용어        | 정의                                                                                     | 예시                                                                                          |
|-------------|------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| **Target**  | Aspect가 적용될 대상입니다. 메소드, 클래스 등이 이에 해당합니다.                             | 특정 서비스 클래스의 메소드.                                                                |
| **JointPoint** | 특정 대상(메소드)에서 횡단 로직(Advice)이 수행될 시점입니다.<br>유형: `before`, `after-returning`, `after-throwing`, `after`, `around` 등 | 메소드가 호출되기 전, 후, 예외가 발생했을 때 등.                                           |
| **PointCut** | Advice를 적용할 메소드의 범위를 지정하는 것을 의미합니다.<br>표현식: 대표적으로 `execution` 등이 있습니다. | `execution(* com.example.service.*.*(..))` - `com.example.service` 패키지의 모든 메소드.    |
| **Advice**  | Aspect의 기능을 정의한 것으로, 메소드의 실행 전, 후, 예외 처리 발생 시 실행되는 코드를 의미합니다.<br>유형: `before`, `after-returning`, `after-throwing`, `after`, `around` 등 | 로그 기록, 트랜잭션 관리 등.                                                                |
| **Aspect**  | JoinPoint와 Advice를 결합한 객체를 의미합니다. 다시 말해서, 횡단 관심사 로직과 로직이 수행될 시점을 결합하여 모듈화한 객체입니다. | 트랜잭션 관리 Aspect, 로깅 Aspect 등.                                                        |


Advice의 종류
------

| Advice 종류      | 정의                                                                                                  |
|------------------|-------------------------------------------------------------------------------------------------------|
| **@Before**      | 대상 "메서드"가 실행되기 전에 Advice를 실행합니다.                                                      |
| **@AfterReturning** | 대상 "메서드"가 정상적으로 실행되고 반환된 후에 Advice를 실행합니다.                                    |
| **@AfterThrowing**  | 대상 "메서드"에서 예외가 발생했을 때 Advice를 실행합니다.                                              |
| **@After**          | 대상 "메서드"가 실행된 후에 Advice를 실행합니다.                                                        |
| **@Around**         | 대상 "메서드" 실행 전, 후 또는 예외 발생 시에 Advice를 실행합니다.                                        |






스프링이 제공하는 AOP 방식은 주로 프록시를 이용한 방식이다. 스프링 AOP는 프록시 객체를 자동으로 생성하여 실제 객체의 기능을 실행하기 전, 후에 공통 기능을 호출한다. 

## AOP 적용 - 로깅 


### 1. build.gradle에 의존성을 추가

```java
implementation 'org.springframework.boot:spring-boot-starter
```

### 2. LoggingAspect 클래스 생성

@Aspect 어노테이션이 붙은 클래스를 생성하여 로깅 어드바이스를 정의한다.  메서드 실행 시 로그를 남기는 클래스이다.  


#### LoggingAspect

로그를 생성하는 Advice 생성 

```java

/**
 * 로깅 관련 AOP 구성
 * 
 * 이 클래스는 Spring AOP를 사용하여 다양한 로깅 관련 작업을 수행합니다.
 */
@Slf4j
@Aspect
@Component
public class LoggingAspect {

    /**
     * Controller의 모든 메소드 실행 전에 로그를 출력합니다.
     */
    @Before("execution(* com.web.ddajait.controller.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        log.info("메소드 실행 전: {}", joinPoint.getSignature().toShortString());
    }

    /**
     * Controller의 메소드가 정상적으로 반환된 후에 반환값을 로그에 출력합니다.
     */
    @AfterReturning(pointcut = "execution(* com.web.ddajait.controller.*.*(..))", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        log.info("메소드 정상 실행 후 - 반환값: {}", extractResponseDto(result));
    }

    /**
     * Controller의 메소드에서 예외가 발생한 경우 예외 정보를 로그에 출력합니다.
     */
    @AfterThrowing(pointcut = "execution(* com.web.ddajait.controller.*.*(..))", throwing = "error")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable error) {
        log.error("메소드 실행 중 예외 발생 - 메소드: {}, 예외: {}", joinPoint.getSignature().toShortString(), error.getMessage());
    }

    /**
     * Controller의 메소드 실행 후에 항상 로그를 출력합니다.
     */
    @After("execution(* com.web.ddajait.controller.*.*(..))")
    public void logAfter(JoinPoint joinPoint) {
        log.info("메소드 실행 후: {}", joinPoint.getSignature().toShortString());
    }

    /**
     * Around 어드바이스를 사용하여 Controller의 메소드 실행 전후에 로그를 출력합니다.
     */
    @Around("execution(* com.web.ddajait.controller.*.*(..))")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        log.info("메소드 실행 전: {}", joinPoint.getSignature().toShortString());
        try {
            Object result = joinPoint.proceed(); // 대상 메소드 실행
            log.info("메소드 정상 실행 후 - 반환값: {}", extractResponseDto(result));
            return result;
        } catch (Throwable throwable) {
            log.error("메소드 실행 중 예외 발생 - 예외: {}", throwable.getMessage());
            throw throwable;
        } finally {
            log.info("메소드 실행 후: {}", joinPoint.getSignature().toShortString());
        }
    }

    /**
     * 반환값이 ResponseEntity인 경우 그 내부의 ResponseDto의 데이터를 추출하여 반환합니다.
     * @param result AOP Around 어드바이스에서 반환된 결과 객체
     * @return 반환값이 ResponseDto인 경우 그 안의 데이터, 아닌 경우 null
     */
    private Object extractResponseDto(Object result) {
        if (result instanceof ResponseEntity) {
            ResponseEntity<?> responseEntity = (ResponseEntity<?>) result;
            Object body = responseEntity.getBody();
            if (body instanceof ResponseDto) {
                return ((ResponseDto<?>) body).getData();
            }
        }
        return null;
    }
}

```
### 3. Swagger를 이용한 Test

- Swagger UI를 이용하여 테스트

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-07-03-springboot-AOP\swagger.png" alt="Alt text" style="width: 80%; height: 80%; margin: 10px;">
</div>

- 콘솔 확인

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-07-03-springboot-AOP\result.png" alt="Alt text" style="width: 100%; height: 100%; margin: 10px;">
</div>


 콘솔창에 정상적으로 로그가 잘 출력되는것을 확인할 수 있다 .

**UserApiController에서 각각의 메서드에 로그를 남기는 대신, Spring AOP를 사용하여 로그를 중앙에서 관리하는 클래스를 만들어 코드의 중복을 줄이고 유지보수성을 향상시켰다.**

<br>
<br>

----
Reference

- <a href = 'https://java-is-happy-things.tistory.com/41'>[Spring] Spring AOP + 예제 실습 by  댕꼬</a>
- <a href = 'https://hstory0208.tistory.com/entry/Spring-%EC%8A%A4%ED%94%84%EB%A7%81-AOPAspect-Oriented-Programming%EB%9E%80-Aspect'>스프링 AOP(Aspect Oriented Programming)란? - @Aspect by < Hyun / Log ></a>
- <a href = 'https://adjh54.tistory.com/133'>[Java] Spring Boot AOP(Aspect-Oriented Programming) 이해하고 설정하기 by adjh54</a>

- <a href = 'https://velog.io/@dkwktm45/Spring-AOP%EB%A5%BC-%EC%95%8C%EA%B3%A0-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95%EC%9D%84-%EC%95%8C%EC%9E%90'>[Spring] AOP는 뭔지는 알고 쓰자! by 이진영</a>

- <a href = 'https://engkimbs.tistory.com/entry/%EC%8A%A4%ED%94%84%EB%A7%81AOP'> [Spring] 스프링 AOP (Spring AOP) 총정리 : 개념, 프록시 기반 AOP by 새로비:티스토리</a>

- <a href = 'https://velog.io/@developer_khj/Spring-AOP-%EA%B0%9C%EB%85%90%EA%B3%BC-Spring-AOP%EC%A0%81%EC%9A%A9'>[Spring] AOP - AOP 개념과 Spring AOP 적용 by 김희정</a>



