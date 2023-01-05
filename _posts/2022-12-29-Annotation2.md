### 1. 두 개 이상의 설정 파일 사용
스프링을 이용해서 어플리케이션 개발하다보면 적게는 수십 개에서 많게는 수백여 개 이상의 빈을 설정하게 된다. 설정하는 빈의 개수가 증가하면 한 개의 클래스 파일에 설정하는 것보다 영역별로 설정 파일을 나누면 관리하기 편해진다.\
스프링은 한 개 이상의 설정 파일을 이용해서 컨테이너를 생성할 수 있다

### 2. @Autowired
```java
@Configuration
public class AppCtx1 {
	@Bean
	public MemberDao memberDao() {
		return new MemberDao();
	}
}
```

```java
@Configuration
public class AppCtx2{
    @Autowired
    private MemberDao memberDao;

	@Bean
	public MemberRegisterService memberRegSvc() {
		return new MemberRegisterService(memberDao);
	}
	
	@Bean
	public ChangePasswordService changePwdSvc() {
		ChangePasswordService pwdSvc = new ChangePasswordService();
		pwdSvc.setMemeberDao(memberDao);
		return pwdSvc;
	}
}
```
- 여기서 @Autowired 애노테이션은 스프링의 자동 주입 기능을 위한 것이다.
- <span style='background-color: #fff5b1'>스프링 설정 클래스의 필드에 @Autowired 애노테이션을 붙이면 해당 타입의 빈을 찾아서 필드에 할당한다</span>
- 스프링 빈에 의존하는 다른 빈을 자동으로 주입하고 싶을때 사용한다. 즉, 스프링 설정 클래스의 @Bean 메서드에서 의존 주입을 위한 코드(setter)를 작성하지 않아도 된다.

설정 클래스가 2개 이상이어도 스프링 컨테이너를 생성하는 코드는 크게 다르지 않다. 다음과 같이 파라미터로 설정 클래스를 추가로 전달하면 된다.
```java
ctx = new AnnotationConfigApplication(AppCtx1, AppCtx2);
```

> $+$plus\
스프링은 @Configuration 애노테이션이 붙은 설정 클래스를 내부적으로 스프링 빈으로 등록한다.

```java
AbstractApplication ctx = 
new AnnotationConfigApplication(AppCtx1, AppCtx2);

//@Configuration 설정 클래스도 빈으로 등록함
AppCtx1 appCtx1 = ctx.getBean(AppCtx1.class);
System.out.println(appCtx1 != null) // true출력

```

### @import
두개 이상의 설정 파일을 사용하는 또 다른 방법은 @Import 애노테이션을 사용하는 것이다. 함께 사용할 설정 클래스를 지정한다. 예를 들어 아래 코드를 보자.
```java
@Configuration
@Import(AppCtx2)
public class AppCtx1{
    ...
}
```
- AppCtx1 설정 클래스를 사용하면, @Import 애노테이션으로 지정한 AppCtx2 설정 클래스도 함께 사용한다
- 스프링 컨테이너를 생성할 때 AppCtx2 설정 클래스를 지정할 필요가 없다.
- 배열을 이용해서 두개 이상의 설정 클래스도 지정할 수 있다.
```java
@Configuration
@import({AppCtx2, AppCtx3})
public class AppCtx1{
    ...
}
```
- <span style='background-color: #fff5b1'>다중 @Import</span>
    - @Import를 사용해서 포함한 설정클래스가 다시 @Import를 사용할 수 있다.
    - <span style='background-color: #fff5b1'>이렇게 하면 설정 클래스를 변경해도 AnnotationConfigApplicationContext를 생성하는 코드는 <span style="color:red">최상위 설정 클래스</span> 한 개만 사용하면 된다.</span>
## Ref.
- 최범균, 스프링프로그래밍입문5, 가메출판사.
- https://melonicedlatte.com/2021/07/18/182600.html