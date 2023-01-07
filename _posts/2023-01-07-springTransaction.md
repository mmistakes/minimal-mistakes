---
title: "Spring의 Transaction"
categories:
  - Spring
toc: true
toc_label: "목차"
#toc_icon:
toc_sticky: true
#last_modified_at:
---
## 1. 트랜잭션 처리
두 개이상의 쿼리를 한 작업으로 실행해야 할 때 사용하는 것이 트랜잭션(transaction)이다. 트랜잭션을 여러 쿼리를 논리적으로 하나의 작업으로 묶어준다. 한 트랜잭션으로 묶인 쿼리 중 하나라도 실패하면 전체 쿼리를 실패로 간주하고 실패 이전에 실행한 쿼리를 취소한다. <span style="color:red">쿼리 실행 결과를 취소하고 DB를 기존 상태로 되돌리는 것을 롤백(rollback)</span>이라고 부른다. 반면에 <span style="color:red">트랜잭션으로 묶인 모든 쿼리가 성공해서 쿼리 결과를 DB에 실제로 반영하는 것을 커밋(commit)</span>이라고 한다.

트랜잭션을 시작하면 트랜잭션을 커밋하거나 롤백할 때까지 실행한 쿼리들이 하나의 작접 단위가 된다. JDBC는 Connection의 setAutoCommit(false)를 이용해서 트랜잭션을 시작하고 commit()과 rollback()을 이용해서 트랜잭션을 반영(커밋)하거나 취소(롤백)한다.
```java
Connection con = null
try{
    con = DriverManager.getConnection(jdbcUrl, user, pw);
    con.setAutoCommit(false); //트랜잭션 범위 시작
    ...쿼리 실행
    con.commit();
}catch(SQLException e){
    if(con != null){
        // 트랜잭션 범위 종료 : 롤백
        try{
            con.rollback();
        } catch(SQLException e){}
    }
}finally{
    if(con != null){
        try{
            con.close();
        }catch(SQLException e){}
    }
}
```
위와 같은 방식은 코드로 직접 트랜잭션 범위를 관리하기 때문에 커밋하는 코드나 롤백하는 코드를 누락하기 쉽다. 게다가 구조적인 중복이 반복되는 문제도 있다.\
스프링이 제공하는 트랜잭션 기능을 사용하면 중복이 없는 간단한 코드로 트랜잭션 범위를 지정할 수 있다.

## 2 @Transcational을 이용한 트랜잭션 처리
스프링이 제공하는 @Transactional 애노테이션을 사용하면 트랜잭션 범위를 매우 쉽게 지정할 수 있다. 다음과 같이 트랜잭션 범위엥서 실행하고 싶은 메서드에 @Transcational 애노테이션만 붙이면 된다.
```java
import org.springframework.trasaction.annotation.Transactional;

@Transactional
public void changePassword(String email, String oldPwd, String newPwd) {
	Member member = memberDao.selectByEmail(email);
	if(member == null) {
		throw new MemberNotFoundException();
	}
	
	member.changePassword(oldPwd, newPwd);
	
	memberDao.update(member);
}
```
> 스프링은 @Transactional 애노테이션이 붙은 changePassword() 메서드를 동일한 트랜잭션 범위에서 실행한다. 따라서 memberDao.selectByEmail()에서 실행하는 쿼리와 member.changePassword()에서 실행하는 쿼리는 한 트랜잭션에 묶인다.

@Transactional 애노테이션이 제대로 동작하려면 다음의 두 가지 내용을 스프링 설정에 추가해야 한다.
- 플랫폼 트랜잭션 매니저(PlatformTranscationManageer) 빈 설정
- @Transcational 애노테이션 활성화 설정

다음은 설정 예를 보여주고 있다.
```java
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
public class AppCtx {
	@Bean(destroyMethod = "close")
	public DataSource dataSource() {
		DataSource ds = new DataSource();
		ds.setDriverClassName("com.mysql.jdbc.Driver");
		ds.setUrl("jdbc:mysql://localhost/spring5fs?characterEncoding=utf8");
		...
		return ds;
	}
	
	@Bean
	public PlatformTransactionManager transactionManager() {
		DataSourceTransactionManager tm = new DataSourceTransactionManager();
		tm.setDataSource(dataSource());
		return tm;
	}
}
```
PlatformTransactionManager는 스프링이 제공하는 트랜잭션 매니저 인터페이스이다. <span style="color:red">스프링은 구현기술에 상관없이 동일한 방식으로 트랜잭션을 처리하기 위해 이 인터페이스를 사용한다.</span> JDBC는 DataSourceTranscationManager클래스를 PlatformTranscationManager로 사용한다. 위 설정에서 보듯이 dataSource 프로퍼티를 이용해서 트랜잭션 연동에 사용한 DataSource를 지정한다.

@EnableTranscactionManagement 애노테이션은 @Transcational 애노테이션이 붙은 메서드를 트랜잭션 범위에서 실행하는 기능을 활성화한다. 등록된 PlatformTranscationalManager 빈을 사용해서 트랜잭션을 적용한다.

트랜잭션 처리를 위한 설정을 완료하면 트랜잭션 범위에서 실행하고 싶은 스프링 빈 객체의 메서드에 @Transcational 애노테이션을 붙이면 된다.

## 3.트랜잭션 관련 로그 메시지 출력
이렇게 Main클래스를 실행하면 실제로 트랜잭션이 시작되고 커밋되는지 확인할 수 없다. 이를 확인하기 위한 방법은 스프링이 출력하는 로그 메시지를  보는 것이다. 트랜잭션과 관련된 로그 메시지를 추가로 출력하기 위해 Logback을 사용한다.
> 스프링 5 버전은 자체 로깅 모듈인 spring-jcl을 사용한다. 이 로킹 모듈은 직접 로그를 남기지 않고 다른 로깅 모듈을 사용해서 로그를 남긴다. 예를 들어 클래스 패스에 Logback이 존재하면 Logback을 이용해서 로그를 남기고 Log4js가 존재하면 Log4j2를 이용해서 로그를 남긴다. 따라서 사용할 로깅 모듈만 클래스 패스에 추가해주면 된다.

먼저 pom.xml 파일이나 builde.gradle 파일에 Logback 모듈을 추가한다. 아래는 메이븐의 경우이다.
```
<?xml version="1.0" encoding="UTF-8"?>
<project ...>
	<modelVersion>4.0.0</modelVersion>
	<groupId>sp5</groupId>
	<artifactId>sp5-chap08</artifactId>
	<version>0.0.1-SNAPSHOT</version>

	<dependencies>
        ....
		<dependency>
			<groupId>org.slf4j</groupId>
			<artifactId>slf4j-api</artifactId>
			<version>1.7.25</version>
		</dependency>
		<dependency>
			<groupId>ch.qos.logback</groupId>
			<artifactId>logback-classic</artifactId>
			<version>1.2.3</version>
		</dependency>
	</dependencies>

	<build>
        ...
	</build>

</project>
```
Logback은 로그 메시지 형식과 기록 위치를 설정 파일에서 읽어온다. 이 설정 파일을 src/main/resouces에 다음과 같이 작성한다.
```
<?xml version="1.0" encoding="UTF-8"?>

<configuration>
    <appender name ="stdout" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d %5p %c{2} - %m%n</pattern>
        </encoder>
    </appender>
    <root level="INFO">
        <appender-ref ref="stdout"/>
    </root>
    
    // 스프링의 JDBC관련 모듈에서 출력하는 로그 메시지를
    // 상시하게("DUBUG" 레벨) 보기 위한 설정
    <logger name="org.springframework.jdbc" level="DEBUG" />
</configuration>
```
다음과 같은 코드를 실행하도록 하자
```java
try {
    cps.changePassword("glove", "1111", "1234");
		System.out.println("암호를 변경했습니다.");
}catch(MemberNotFoundException e) {
	System.out.println("회원 데이터가 존재하지 않습니다.");
}catch(WrongIdPasswordException e) {
	System.out.println("암호가 올바르지 않습니다.");
}
```
정상 실행되면 다음과 유사한 로그 메시지가 콘솔에 출력된다.
![springTrascation1](https://user-images.githubusercontent.com/97718735/211152056-be8da39c-8faa-4287-a762-cfc2ac1fcaa6.png)


정상 실행되지 않는다면 다음과 유사한 로그 메시지가 콘솔에 출력된다.
![springTrascation2](https://user-images.githubusercontent.com/97718735/211152121-de9ff903-000e-4f70-9569-78d142ebbb7e.png)

트랜잭션을 롤백했다는 로그 메시지가 찍힌다. 여기서 의문점이 하나 생긴다. 
> 도대체 트랜잭셕을 시작하고, 커밋하고, 롤백하는 것은 누가 어떻게 처리하는 걸까? 이에 관한 내용을 이해하려면 프록시를 알아야한다.

## 4. @Transactional과 프록시
앞서 여러 빈 객체에 공통으로 적용되는 기능을 구현하는 방법으로 [AOP](https://yoongunwo.github.io/spring/AOP/#2-%ED%94%84%EB%A1%9D%EC%8B%9C%EC%99%80-aop)를 설명했는데 트랙잭션도 공통 기능 중 하나이다. 스프링은 @Transactional 애노테이션을 이용해서 트랜잭션을 처리하기 위해 내부적으로 AOP를 사용한다. 따라서 트랜잭션 처리도 프록시를 통해서 이루어진다고 유추할 수 있다.

> 실제로 @Transactional 애노테이션을 적용하기 위해 @EnableTransactionalManagement 태그를 사용하면 스프링은 @Transactional 애노테이션이 적용된 빈 객체를 찾아서 알맞은 프록시 객체를 생성한다.

### 4.1 @Transactional 적용 메서드의 커밋 처리
![springTrascation3](https://user-images.githubusercontent.com/97718735/211152145-dca1e7d7-de34-43e3-9dc5-7242ee4c91d4.png)

ChangePasswordService 클래스의 메서드에 @Transactional 애노테이션이 적용되어 있으므로 스프링은 트랜잭션 기능을 적용한 프록시 객체를 생성한다. Main 클래스에서 getBean("changePwdSvc", ChangePasswordService.class) 코드를 실행하면 ChangePasswordService 객체 대신에 트랜잭션 처리를 위해 생성한 프록시 객체를 리턴한다.

이 프록시 객체는 @Transactional 애노테이션이 붙은 메서드를 호출하면 1.1 과정처럼 PlatformTransactionManagement를 사용해서 트랜잭션을 시작한다. 트랜잭션 시작한 후 실제 객체의 메서드를 호출하고, 성공적으로 실행되면 트랜잭션을 커밋한다.

### 4.2 @Transactional 적용 메서드의 롤백 처리
커밋 수행하는 주체가 프록시 객체였던 것처럼 롤백을 처리하는 주체 또한 프록시 객체이다. 예제 코드를 보자
```java
try {
    cps.changePassword("glove", "1111", "1234");
		System.out.println("암호를 변경했습니다.");
}catch(MemberNotFoundException e) {
	System.out.println("회원 데이터가 존재하지 않습니다.");
}catch(WrongIdPasswordException e) {
	System.out.println("암호가 올바르지 않습니다.");
}
```
이 코드의 실행 결과 WrongIdPasswordException이 발생했을 때 트랜잭션이 롤백된 것을 알 수 있다. 실제로 @Transactional을 처리하기 위한 프록시 객체는 원본 객체의 메서드를 실행하는 과정에서 RuntimeException일 발생하면 다음과 같이 트랜잭션을 롤백한다.
![springTrascation4](https://user-images.githubusercontent.com/97718735/211152149-f391116c-425f-44b6-ad7e-84bea9e5f082.png)

<span style="color:red">별도 설정을 추가하지 않으면 발생한 익셉션이 RuntimeException일 때 트랜잭션을 롤백한다.</span>

JdbcTemplate은 DB 연동 과정에 문제가 있으면 DataAccessException을 발생한다고 했는데 DataAccessException 역시 RuntimeException을 상속받고 있다. 따라서 JdbcTemplate의 기능을 실행하는 도중 익셉션이 발생해도 프록시는 트랜잭션을 롤백한다.

SQLException은 RuntimeException을 상속하고 있지 않으므로 SQLException이 발생하면 트랜잭션을 롤백하지 않는다. RuntimeException 뿐만 아니라 SQLException이 발생하는 경우에도 트랜잭션을 롤백하고 싶다면 @Transactional의 rollbackFor 속성을 사용해야 한다.
```java
@Transactional(rollbackFor = SQLException.class)
public void method(){}
```
여러 익셉션 타입을 지정하고 싶다면 {SQLException.class, IOException.class}와 같이 배열로 지정하면 된다.

<span style="color:red">rollbackFor와 반대 설정을 제공하는 것이 noRollbackFor 속성이다.</span> 이 속성은 익셉션이 발생해도 롤백시키지 않고 커밋할 익셉션 타일을 지정할 때 사용한다.

## 5.@Transactional의 주요 속성
@Transactional 애노테이션의 주요 속성은 다음과 같다. 보통 이들 속성이 간혹 필요할 때가 있다.
- value
    - 타입 : String
    - 트랜잭션을 관리할 때 사용할 PlatformTransactionManager 빈의 이름을 지정한다. 기본값은 ""이다.
- propagation
    - 타입 : Propagation
    - 트랜잭션 전파 타입을 지정한다.\
    기본값은 Propagation.REQUIRED이다.
- isolation
    - 타입 : Isolation
    - 트랜잭션 격리 레벨을 지정한다.\
    기본값은 Isolation.DEFAULT이다
- timeout
    - 타입 : int
    - 트랜잭션 제한 시간을 지정한다. 기본값은 -1로 이 경우 데이터베이스의 타임아웃 시간을 사용한다. 초 단위로 지정한다.

### 5.1 Propagation 열거 타입
Propagation 열거 타입에 정의되어 있는 값 목록은 아래와 같다. Propagation은 트랜잭션 전파와 관련된 것으로 이에 대한 내용은 뒤에서 설명한다.
- REQUIRED
    : 메서드를 수행하는 데 트랜잭션이 필요하다는 것을 의미한다. 현재 진행 중인 트랜잭션이 존재하면 해당 트랜잭션을 사용한다. 존재하지 않으면 새로운 트랜잭션을 생성한다.
- MANDATORY
    : 메서드를 수행하는 데 트랜잭션이 필요하다는 것을 의미한다. 하지만 진행 중인 트랜잭션이 존재하지 않을 경우 익셉션이 발생한다.
- REQUIRES_NEW
    : 항상 새로운 트랜잭션을 시작한다. 진행 중인 트랜잭션이 존재하면 기존 트랜잭션을 일시 중지하고 새로운 트랜잭션을 시작한다. 새로 시작된 트랜잭션이 종료된 뒤에 기존 트랜잭션이 계속 된다.
- SUPPORTS
    : 메서드가 트랜잭션을 필요로 하지는 않지만, 진행 중인 트랜잭션이 존재하면 트랜잭션을 사용한다는 것을 의미한다. 진행 중인 트랜잭션이 존재하지 않더라도 정상적으로 동작한다.
- NOT_SUPPORTED
    : 메서드가 트랜잭션을 필요로 하지 않음을 의미한다. 진행 중인 트랜잭션이 존재할 경우 메서드가 실행되는 동안 트랜잭션은 일시 중지되고 메서드 실행이 종료된 후에 트랜잭션을 계속 진행한다.
- NEVER
    : 메서드가 트랜잭션을 필요로 하지 않는다. 만약 진행 중인 트랜잭션이 존재하면 익셉션이 발생한다.
- NESTED
    : 진행 중인 트랜잭션이 존재하면 기존 트랜잭션에 중첩된 트랜잭션에서 메서드를 실행한다. 진행 중인 트랜잭션이 존재하지 않으면 REQUIRED와 동일하게 동작한다. 이 기능은 JDBC 3.0 드라이버를 사용할 때에만 적용된다.

### 5.2 Isolation 열거 타입
Isolation 열거 타입에 정의된 값은 다음과 같다
- DEFAULT
    : 기본 설정을 사용한다.
- READ_UNCOMMITTED
    : 다른 트랜잭션이 커밋하지 않은 데이터를 읽을 수 있다.
- READ_COMMITTED
    : 다른 트랜잭션이 커밋한 데이터를 읽을 수 있다.
- REPEATABLE_READ
    : 처음에 읽어 온 데이터와 두 번째 읽어 온 데이터가 동일한 값을 갖는다.
- SERIALIZABLE
    : 동일한 데이터에 대해서 동시에 두 개 이상의 트랜잭션을 수행할 수 없다.

## 6. @EnableTransactionManagement의 주요 속성
@EnableTransactionManagement이 제공하는 속성은 다음과 같다
- proxyTargetClass
    : 클래스를 이용해서 프록시를 생성할지 여부를 지정한다. 기본값은 false로서 인터페이스를 이용해서 프록시를 생성한다.
- order
    : AOP 적용 순서를 지정한다. 기본값은 가장 낮은 우선순위에 해당하는 int의 최댓값이다.

## 7. 트랜잭션 전파
Propagation 열거 타입 값 목록에서 REQUIRED 값의 설명은 다음과 같다
> 메서드를 수행하는 데 트랜잭션이 필요하다는 것을 의미한다. 현재 진행 중인 트랜잭션이 존재하면 해당 트랜잭션을 사용한다. 존재하지 않으면 새로운 트랜잭션을 생성한다.

이해를 돕기 위해 다음의 자바코드와 스프링 설정을 보자
```java
public class SomeService{
    @Autowired
    private AnyService any;
    
    @Transactional
    public void some(){
        anyService.any();
    }
}

public class AnyService{
    @Tansactional
    publci void any(){...}
}
```
```java
@Configuration
@EnableTransactionManagement
public class Config{
    @Bean
    public SomeService some(){
        return new SomeService();
    }
    @Bean
    public AnyService any(){
        return new AnyService();
    }
}
```
다음 설정 클래스에 따르면 두 클래스에 대해 프록시가 생성된다. 즉 some 메서드를 호출하면 트랜잭션이 시작되고 any() 메서드를 호출해도 트랜잭션이 시작된다.\
그런데 some()메서드 내부에서 다시 any()메서드를 호출하고 있다. 이 경우 트랜잭션 처리는 어떻게 될까?

@Transactionald의 propagation 속성은 기본값이 Propagation.REQUIRED이다. 처음 some()메서드를 호출하면 트랜잭션을 새로 시작한다. 하지만 some()메서드 내부에서 any() 메서드를 호출하면 이미 some() 메서드에 의해 시작된 트랜잭션이 존재하므로 any() 메서드를 호출하는 시점에는 트랜잭션을 새로 생성하지 않는다. 대신에 존재하는 트랜잭션을 그대로 사용한다. <span style="color:red">즉 some 메서드와 any() 메서드를 한 트랜잭션으로 묶어서 실행하는 것이다.</span>

만약 any() 메서드에 @Transactional이 붙어 있지 않다면 JdbcTemplate 클래스 덕에 트랜잭션 범위에서 쿼리를 실행할 수 있다. <span style="color:red">JdbcTemplate은 진행 중인 트랜잭션이 존재하면 해당 트랜잭션 범위에서 쿼리를 실행한다.</span>


## Ref.
- 최범균, 스프링프로그래밍입문5, 가메출판사.