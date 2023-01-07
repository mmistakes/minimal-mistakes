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
![springTrasaction1]("MyImages/springTransaction/springTransaction1")


## Ref.
- 최범균, 스프링프로그래밍입문5, 가메출판사.