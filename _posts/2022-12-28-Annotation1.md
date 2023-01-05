### 1. Annotation이란?
Spring에서는 Annotation을 많이 사용합니다. `Annotation의 역할`은 아래와 같습니다. 
> JAVA에서 Annotation이라는 기능이 있습니다. 사전상으로 주석의 의미이지만 JAVA에서는 주석 이상의 기능을 가지고 있습니다. Annotation은 자바 소스 코드에 추가하여 사용할 수 있는 메타데이터의 일종입니다. 소스코드에 추가하면 단순 주석의 기능을 하는 것이 아니라 특별한 기능을 사용할 수 있습니다.

Annotation은 클래스와 메서드에 추가하여 다양한 기능을 부여하는 역할을 합니다.\
Annotation을 활용하여 Spring Framework는 해당 클래스가 어떤 역할인지 정하기도 하고, Bean을 주입하기도 하며, 자동으로 getter나 setter를 생성하기도 합니다. 특별한 의미를 부여하거나 기능을 부여하는 등 다양한 역할을 수행할 수 있습니다.

이러한 Annotation을 통하여 **코드량이 감소하고 유지보수하기 쉬우며, 생산성이 증가됩니다.** 

### 2. Spring의 대표적인 Annotation과 역할
#### @Configuration
해당 클래스를 스프링 설정 클래스로 지정한다. 

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppContext {
	...
}

```

#### @Bean
스프링은 객체를 생성하고 초기화하는 기능을 제공하는데, 아래 코드가 한 개 객체를 생성하고 초기화하는 설정을 담고 있다. 스프링이 생성하는 객체를 빈(Bean)객체라고 부르는데, 이 빈 객체에 대한 정보를 담고 잇는 메서드가 greeter() 메서드이다. 이 메서드에는 @Bean 애노테이션이 붙어 있다. 이 애노테이션을 붙이면 해당 메서드가 생성한 객체를 스프링이 관리하는 빈 객체로 등록된다.메서드 이름은 빈 객체를 구분할 때 사용한다.\
@Bean 애노테이션을 붙인 메서드는 객체를 생성하고 알맞게 초기화해야 한다.  

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppContext {
	@Bean
	public Greeter greeter() {
		Greeter g = new Greeter();
		g.setFormat("%s, 안녕하세요!");
		return g;
	}
}
```

### 2.1 예제
```java
public class Greeter {
	private String format;
	
	public String greet(String guest) {
		return String.format(format, guest);
	}
	public void setFormat(String format) {
		this.format = format;
	}
}

```
Greeter 클래스

```java
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {
	public static void main(String[] args) {
		AnnotationConfigApplicationContext ctx = 
        new AnnotationConfigApplicationContext(AppContext.class);
		Greeter g1 = ctx.getBean("greeter",Greeter.class);
		Greeter g2 = ctx.getBean("greeter", Greeter.class);
		System.out.println("(g1 == g2) = " + (g1==g2));
		ctx.close();
	}
}
```
Main 클래스

- AnnotationConfigApplicationContext 클래스는 자바 설정에서 정보를 읽어와 빈 객체를 생성하고 관리한다.
- AnnotationConfigApplicationContext 객체를 생성할 때 앞서 작성한 AppContext 클래스를 생성자 파라미터로 전달한다. AnnotationConfigApplicationContext는 AppContext에 정의한 @Bean 설정 정보를 읽어와 **Greeter 객체를 생성하고 초기화한다.**
- getBean() 메서드는 AnnotationConfigApplicationContext가 자바 설정을 읽어와 생성한 Bean 객체를 검색할 때 사용된다. getBean() 메서드의 첫 번째 파라미터는 @Bean 애노테이션의 메서드 이름인 빈 객체의 이름이며, 두번째 파라미터는 검색할 빈 객체의 타입이다. 위의 코드를 보면 getBean() 메서드는 greeter() 메서드가 생성한 Greeter 객체를 리턴한다.
- **싱글톤(Singleton)객체**
    - 여기서 위 코드를 실행하면 
    > (g1 == g2) = true

        결과가 true라는 것을 알 수 있다. 즉, g1과 g2가 같은 객체라는 것을 의미한다. 즉 getBean() 메서드에서 같은 객체를 리턴하는 것이다.\
        **별도 설정하지 않을 경우 스프링은 한 개의 빈 객체만을 생성하며, 이 때 빈 객체는 '싱글톤(singleton) 범위를 갖는다'고 표현한다.** 싱글톤은 단일 객체(single object)를 의미하는 단어로서 **스프링은 기본적으로 한 개의 @Bean 애노테이션에 대해 한 개의 빈 객체를 생성한다.**

### 3. @Configuration설정의 @Bean설정과 싱글톤
아래의 AppCtx 클래스의 코드로 예시를 들겠다.
```java
@Configuration
public class AppCtx {
	@Bean
	public MemberDao memberDao() {
		return new MemberDao();
	}
	
	@Bean
	public MemberRegisterService memberRegSvc() {
		return new MemberRegisterService(memberDao());
	}
	
	@Bean
	public ChangePasswordService changePwdSvc() {
		ChangePasswordService pwdSvc = new ChangePasswordService();
		pwdSvc.setMemeberDao(memberDao());
		return pwdSvc;
	}
}
```
memberRegSvc()메서드와 changePwdSvc()메서드 둘 다 memberDao() 메서드를 실행하고 있다. 그리고 memberDao() 메서드는 매번 새로운 MemberDao 객체를 생성해서 리턴한다. 여기서 다음과 같은 궁금증이 생긴다.
- memberDao()가 새로운 MemberDao 객체를 생성해서 리턴하므로
- <span style='background-color: #fff5b1'>memberRegSvc()에서 생성한 MemberRegisterService 객체와 changePwdSvc()에서 생성한 ChangePasswordService 객체는 서로 다른 MemberDao 객체르 사용하는 것 아닌가?</span>

하지만 스프링 컨테이너가 생성한 빈은 <span style="color:red">싱글톤 객체</span>라고 앞서 설명하였다. <span style='background-color: #fff5b1'>스프링 컨테이너는 @Bean이 붙은 메서드에 대해 한 개의 객체만 생성한다.</span> 이는 다른 설정 메서드에서 memberDao()를 몇 번 호출하더라도 항상 같은 객체를 리턴한다는 것을 의미한다.

이게 어떻게 가능할까? 스프링은 설정 클래스를 그대로 사용하지 않는다. 대신 <span style='background-color: #fff5b1'>설정 클래스를 상속한 새로운 설정 클래스를 만들어서 사용한다.</span> 스프링이 런타임에 생성한 설정 클래스는 다음과 유사한 방식으로 동작한다.

```java
public class AppCtxExt extends AppCtx{
	private Map<String, Object> beans = ...;

	@Override
	public MemberDao memberDao(){
		if(!beans.containsKey("memberDao"))
			beans.put("memberDao", super.memberDao());
		
		return (MemberDao)beans.get("memberDao");
	}
}
```
> 스프링이 런타임에 생성한 설정 클래스의 메서드는 매번 새로운 객체를 생성하지 않는다. <span style='background-color: #fff5b1'>한 번 생성한 객체를 보관했다가 이후에는 동일한 객체를 리턴한다.</span>

## Ref.
- 최범균, 스프링프로그래밍입문5, 가메출판사.
- https://melonicedlatte.com/2021/07/18/182600.html