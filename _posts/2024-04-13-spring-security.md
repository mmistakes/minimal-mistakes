---
layout: single
title: '[Spring] Spring Security 흐름 이해하기'
categories: Spring
tag: [Spring]
toc: true 
author_profile: false
sidebar:
    nav: "counts"
published: true
counts: false

---

Spring Security는 Spring 기반의 애플리케이션의 보안(인증과 권한, 인가 등)을 담당하는 스프링 하위 프레임워크이다. Spring Security는 '인증'과 '권한'에 대한 부분을 Filter 흐름에 따라 처리하고 있다. 

## Security 용어 

- **인증(Authentication)** : 사용자가 누구인지 확인하는 과정이며, 스프링 시큐리티에서 가장 일반적인 방법은 폼 기반 로그인이다. 스프링 시큐리티는 사용자의 아이디와 비밀번호 바탕으로 사용자의 인증을 처리한다.

- **인가(Authorization)** : 인증된 사용자가 요청한 자원에 접근 가능한지를 결정하는 절차 

- **접근 주체(Principal)**: 보호받는 대상에 접근하는 사용자


Spring Security 과정은 인증 절차를 거친 후에 인가 절차를 진행하게 되며, 인가 과정에서 해당 리소스에 대한 접근 권한이 있는지 확인을 하게 된다. 인증과 인가를 위해 Principal을 아이디로, Credential을 비밀번호로 사용하는 **Credential 기반의 인증 방식**을 사용한다. 

## spring security 동작 원리

### 서블릿 필터 기반의 구조

서블릿 필터(Servlet Filter)는 서블릿 기반 애플리케이션의 엔드포인트에 요청이 도달하기 전에 중간에서 요청을 가로챈 후 어떤 처리를 할 수 있도록 해주는 Java의 컴포넌트이다. 

### Filter 
<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}/images/2024-04-13-spring-security/filter_flow.png" alt="Alt text" style="width: 120%; height: 120%; margin: 10px;">
</div>
- 필터 흐름 
    - HTTP 요청 → WAS → 필터 → 서블릿 → 컨트롤러 

- 필터 제한
    - HTTP 요청 → WAS → 필터 

- 필터 체인
    - HTTP 요청 → WAS →  필터 → 필터2 → 필터3 → 서블릿 → 컨트롤러 

------

HTTP 요청이 들어오면 제일 먼저 서블릿 필터를 거치게 된다. 스프링 시큐리티는 서블릿 필터를 사용하여 HTTP 요청을 가로채고, 보안 처리를 수행한다.

필터는 로직에 의해서 적절하지 않은 요청이라고 판단할 경우 서블릿 호출을 하지 않는다. 필터는 체인으로 구성되는데, 중간에 필터를 자유롭게 추가할 수 있다. 

## Spring Security Architecture

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}/images/2024-04-13-spring-security/security_flow_custom.png" alt="Alt text" style="width: 7
    0%; height: 70%; margin: 10px;">
</div>

><span style = "font-weight:bold;">1. 사용자가 로그인 정보와 함께 인증 요청을 한다.</span>

><span style = "font-weight:bold;">2. UsernamePasswordAuthenticationToken의 인증용 객체 생성 </span><br><br>AuthenticationFilter가 요청을 가로채고, 가로챈 Username 과 Password를 가지고 Authentication 정보를 통해 UsernamePasswordAuthenticationToken의 인증용 객체를 생성한다.

><span style = "font-weight:bold;">3. AuthenticationManager의 구현체인 ProviderManager에게 생성한 UsernamePasswordToken 객체를 전달한다.</span>

><span style = "font-weight:bold;">4. 토큰을 처리할 수 있는 AuthenticationProvider 선택</span><br><br> AuthenticationManager은 List 형태로 AuthenticationProvider를 가지고 있다. AutenticationManger는 등록된 AuthenticationProvider들을 조회하며 인증을 요구한다.

><span style = "font-weight:bold;">5. 실제 데이터베이스에서 사용자 인증정보를 가져오는 UserDetailsService에 사용자 정보를 넘겨준다.</span><br><br>AuthenticationProvider 인터페이스에서 실제 데이터베이스에 있는 사용자 정보를 가져오기 위해서는 UserDetailsService 인터페이스를 통해 가져와야 한다

><span style = "font-weight:bold;">6. 사용자 정보를 통해 데이터베이스에서 찾아낸 사용자 정보인 UserDetails 객체를 만든다.</span>

><span style = "font-weight:bold;">7. AuthenticaitonProvider들은 UserDetails를 넘겨받고 사용자 정보를 비교한다</span>

><span style = "font-weight:bold;">8.  AuthenticationFilter에 Authentication 객체가 반환된다.</span> <br><br> 인증에 성공하면, AuthenticationProvider에서 인증된 인증용 객체를 Authentication 객체에 담아 AuthenticationManager에게 전달한다.

><span style = "font-weight:bold;">9. Authentication 객체를 Security Context에 저장한다.</span><br><br> AuthenticationFilter는 Authentication 객체를 SecurityContextHolder에 저장한 후, AuthenticationSuccessHandler을 실행한다.



###  Spring Security 주요 모듈

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}/images/2024-04-13-spring-security/security_module.png" alt="Alt text" style="width: 50%; height: 50%; margin: 10px;">
</div>


### SecurityContextHolder, SecurityContext, Authentication 

Authentication는 현재 접근하는 주체의 정보와 권한을 담는 인터페이스이다.

Authentication 객체는 Security Context에 저장되며, SecurityContextHolder를 통해 SecurityContext에 접근하고, SecurityContext를 통해 Authentication에 접근할 수 있다.

#### Authentication

```java
public interface Authentication extends Principal, Serializable {

	/**
	 * AuthenticationManager에 의해 설정되며, 주체에게 부여된 권한을 나타냅니다.
	 * @return 주체에게 부여된 권한 또는 토큰이 인증되지 않았다면 빈 컬렉션 반환
	 */
	Collection<? extends GrantedAuthority> getAuthorities();

	/**
	 * 주체의 정체성을 증명하는 자격 증명입니다. 일반적으로 비밀번호일 수 있지만,
	 * AuthenticationManager와 관련된 것이어야 합니다. 호출자가 자격 증명을 채워야 합니다.
	 * @return Principal의 정체성을 증명하는 자격 증명
	 */
	Object getCredentials();

	/**
	 * 인증 요청에 대한 추가 정보를 저장합니다. IP 주소, 인증서 일련 번호 등이 될 수 있습니다.
	 * @return 인증 요청에 대한 추가 정보 또는 사용되지 않았다면 null
	 */
	Object getDetails();

	/**
	 * 인증되는 주체의 정체성입니다. 사용자 이름과 비밀번호로 인증 요청의 경우 사용자 이름이 될 것입니다.
	 * @return 인증되거나 인증 후의 Principal
	 */
	Object getPrincipal();

	/**
	 * AbstractSecurityInterceptor에게 인증 토큰을 AuthenticationManager에
	 * 제시해야 하는지 여부를 나타냅니다.
	 * @return 토큰이 인증되었고 AbstractSecurityInterceptor가 다시 인증을 위해
	 * AuthenticationManager에 토큰을 제시할 필요가 없으면 true

	boolean isAuthenticated();

	/**
	 * 
	 * @param isAuthenticated true이면 토큰이 신뢰할 수 있으며 예외가 발생할 수 있습니다.
	 *                        false이면 토큰이 신뢰되지 않습니다.
	 * @throws IllegalArgumentException 구현이 불변이거나 isAuthenticated()에 대한
	 *                                  자체 대체 접근 방식을 구현하는 경우, 인증 토큰을 신뢰할
	 *                                  수 있게 하려는 시도(인수로 true를 전달)를
	 *                                  거부할 때 발생 
	 */
	void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException;

}
```
#### UsernamePasswordAuthenticationToken 
**UsernamePasswordAuthenticationToken** 인스턴스가 생성되면 인스턴스는 검증을 위해 AuthenticationManager로 전달되고 AuthenticationManager의 인증이 성공 후 Authentication를 리턴한다.


```java
public class UsernamePasswordAuthenticationToken extends AbstractAuthenticationToken {

	private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

	private final Object principal; // 주체
	private Object credentials; // 자격 증명 

	public UsernamePasswordAuthenticationToken(Object principal, Object credentials) {
		super(null); // 부모 클래스의 생성자 호출
		this.principal = principal;
		this.credentials = credentials;
		setAuthenticated(false); // 인증되지 않음 설정
	}

	/**
	 * AuthenticationManager또는 AuthenticationProvider 구현에서만 사용해야 합니다.
	 * 신뢰할 수 있는 인증 토큰을 생성하는 데 사용됩니다.
	 * @param principal 주체
	 * @param credentials 자격 증명
	 * @param authorities 권한
	 */
	public UsernamePasswordAuthenticationToken(Object principal, Object credentials,
			Collection<? extends GrantedAuthority> authorities) {
		super(authorities); // 부모 클래스의 생성자 호출
		this.principal = principal;
		this.credentials = credentials;
		super.setAuthenticated(true); // 인증됨 설정 
	}
}
```

### AuthenticationProvider

인증 전의 Authentication객체를 받아서 인증이 완료된 객체를 반환하는 역할을 한다. 

```java

public interface AuthenticationProvider {

	/**
	 * {@link org.springframework.security.authentication.AuthenticationManager#authenticate(Authentication)}
	 * 
	 * @param authentication 인증 요청 객체
	 * @return 자격 증명을 포함한 완전히 인증된 객체. 만약 AuthenticationProvider가
	 * 전달된 Authentication 객체의 인증을 지원할 수 없다면 null을 반환할 수 있습니다.
	 * 이 경우, 제시된 Authentication 클래스를 지원하는 다음 AuthenticationProvider가 시도됩니다.
	 * @throws AuthenticationException 인증이 실패한 경우
	 */
	Authentication authenticate(Authentication authentication) throws AuthenticationException;

	/**
	 * AuthenticationProvider가 지정된 Authentication 객체를 지원하는지 여부를 반환합니다.
	 * @param authentication
	 * @return 
	 */
	boolean supports(Class<?> authentication);

}

```
### Authentication Manager 
인증에 대한 부분 AuthenticationManager에 등록된 AuthenticationProvider에 의해 처리된다. 인증이 성공하면 2번째 생성자를 이용해 인증이 성공한(isAuthenticated=true) 객체를 생성하여 Security Context에 저장한다. 그리고 인증 상태를 유지하기 위해 세션에 보관하며, 인증이 실패한 경우에는 AuthenticationException를 발생시킨다.

```java
public interface AuthenticationManager {

	/**
	 * 전달된 Authentication 객체를 사용하여 인증을 시도하고, 성공할 경우 
	 * Authentication객체(부여된 권한 포함)를 반환합니다.
	 * 
	 * AuthenticationManager는 다음과 같은 예외에 대한 계약을 준수해야 합니다:
	 * 
	 * 계정이 비활성화되었고 AuthenticationManager가 이 상태를 테스트할 수 있다면
	 *  DisabledException을 던져야 합니다.
	 * 계정이 잠겨 있고 AuthenticationManager가 계정 잠금을 테스트할 수 있다면
	 * LockedException을 던져야 합니다.
	 * 잘못된 자격 증명이 제시되면 BadCredentialsException을 던져야 합니다.
	 * 위의 예외들은 선택 사항이지만, AuthenticationManager는 자격 증명을 항상 테스트해야 합니다.
	 * 
	 * 예외는 위에서 나열된 순서대로 테스트되어야 하며, 해당되는 경우 해당 순서대로 던져져야 합니다
	 * (즉, 계정이 비활성화되었거나 잠겨 있으면 인증 요청이 즉시 거부되며 자격 증명 테스트 과정은 수행되지 않습니다).
	 * 
	 * @param authentication 인증 요청 객체
	 * @return 자격 증명을 포함한 완전히 인증된 객체
	 * @throws AuthenticationException 인증이 실패한 경우
	 */
	Authentication authenticate(Authentication authentication) throws AuthenticationException;

}

```

### ProviderManager 

등록된 AuthenticationProvider 리스트를 반복하면서 지원하는 Authentication 객체를 찾는다.
지원하는 AuthenticationProvider를 찾으면 해당 AuthenticationProvider의 authenticate 메서드를 호출하여 인증을 시도한 후 인증이 성공하면 result 변수에 결과를 저장하고 반복문을 종료한다

```java
/**
 * 주어진 Authentication 객체를 인증하려 시도합니다.
 * 
 * AuthenticationProvider들의 목록은 지원되는 AuthenticationProvider가 주어진 Authentication 객체를 인증할 수 있을 때까지 순차적으로 시도됩니다.
 * 인증이 가능한 AuthenticationProvider로 인증이 시도됩니다.
 * 
 * 여러 AuthenticationProvider가 주어진Authentication 객체를 지원하는 경우, 
 * 첫 번째로 성공적으로 인증하는 AuthenticationProvider가 결과를 결정하며, 이전의 AuthenticationProvider들에 의해 발생한 가능한 AuthenticationException을 무시합니다.
 * 인증이 성공하면 추가적인 AuthenticationProvider는 시도되지 않습니다.
 * 인증이 어느 AuthenticationProvider에도 성공하지 않으면 마지막으로 발생한 AuthenticationException이 다시 던져집니다.
 * 
 * @param authentication 인증 요청 객체
 * @return 자격증명을 포함한 완전히 인증된 객체
 * @throws AuthenticationException 인증 실패 시 발생
 */
@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		Class<? extends Authentication> toTest = authentication.getClass();
		AuthenticationException lastException = null;
		AuthenticationException parentException = null;
		Authentication result = null;
		Authentication parentResult = null;
		int currentPosition = 0;
		int size = this.providers.size();
		for (AuthenticationProvider provider : getProviders()) {
			if (!provider.supports(toTest)) {
				continue;
			}
			if (logger.isTraceEnabled()) {
				logger.trace(LogMessage.format("Authenticating request with %s (%d/%d)",
						provider.getClass().getSimpleName(), ++currentPosition, size));
			}
			try {
				result = provider.authenticate(authentication);
				if (result != null) {
					copyDetails(authentication, result);
					break;
				}
			}
			catch (AccountStatusException | InternalAuthenticationServiceException ex) {
				prepareException(ex, authentication);
				// SEC-546: Avoid polling additional providers if auth failure is due to
				// invalid account status
				throw ex;
			}

            ....


```
--------

## Spring Security 구현하기 

### USER Entity

유저 ID 는 이메일을 사용할 예정으로 PK는 email 로 설정했으며, role 을 이용해서 인가 정보를 확인한다. 


```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "UserEntity")
@Table(name = "users")
public class UserEntity extends BaseEntity {

    // email
    @Id
    @NotBlank
    @Email(message = "올바른 이메일 형식이 아닙니다.")
    private String email; // ID

    // nickname
    @NotBlank
    @Pattern(regexp = "^[가-힣a-z0-9_]+$", message = "닉네임은 한글, 영어 소문자, 숫자, 밑줄(_)만 포함할 수 있습니다. (12 글자 제한)")
    @Column(unique = true, length = 12)
    private String nickname;


    // pw
    // @Size(min = 6, max = 10, message = "비밀번호는 최소 6자에서 최대 10자여야 합니다.")
    @NotBlank(message = "비밀번호는 필수입니다.")
    private String password; // PW

    // 프로필 이미지
    @URL
    private String profileImage;

    // 로그인 유무
    @Column(columnDefinition = "tinyint(1) default 0")
    private Boolean isLogin;

    // 일반사용자 / 관리자를 구분용
    private String role; 

    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<PostEntity> posts;

    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<EmotionEntity> emotions;

    @Override
    public String toString() {
        return "UserEntity{id=" + email + ", name=" + nickname + "}"; // 예시로 필요한 정보만 반환하도록 수정
    }

}
```

### Role 설정 (인가)

유저별 권한 정보를 설정해주기 위해서 Role 을 만들어 일반사용자와 관리자로 나눴다.

```java

@Getter
@RequiredArgsConstructor
public enum Role {
    USER("ROLE_USER", "일반사용자"),
    ADMIN("ROLE_ADMIN", "관리자");

    private final String key;
    private final String title;
}
```

### SecurityConfig 
SecurityConfig 클래스를 생성해 비밀번호 암호화와  인증(로그인) & 인가(권한)에 대한 시큐리티 설정을 해준다.

- 로그인 한 유저만 "/user" 와 같은 url path로 접근할 수 있게 설정했다.

- 관리자만 "/admin" 와 같은 url path로 접근할 수 있게 설정했다.

Spring Security를 이용하면 login 과 logout url을 간단하게 생성 가능하다.

LoginAuthSuccessHandelr, LoginAuthFailureHandler, LogoutAuthSuccessHandler 핸들러를 이용해 로그인/로그아웃 성공 실패에 대한 예외처리를 해줬다.

#### 참고
>- authenticated() : 인증된 사용자의 접근을 허용
>- fullyAuthenticated() : 인증된 사용자의 접근을 허용, rememberMe 인증 제외
>- permitAll() :  무조건 접근 허용
>- denyAll() :  무조건 접근을 허용하지 않음
>- anonymous() : 익명사용자의 접근을 허용
>- rememberMe() :  기억하기를 통해 인증된 사용자의 접근을 허용
>- access(String) : 주어진 SpEL 표현식의 평가 결과가 true이면 접근을 허용
>- hasRole(String) : 사용자가 주어진 역할이 있다면 접근을 허용 
>- hasAuthority(String) :  사용자가 주어진 권한이 있다면
>- hasAnyRole(String...) : 사용자가 주어진 권한이 있다면 접근을 허용
>- hasAnyAuthority(String...) : 사용자가 주어진 권한 중 어떤 것이라도 있다면 접근을 허용
>- hasIpAddress(String) : 주어진 IP로부터 요청이 왔다면 접근을 허용
 

```java

@Configuration // 스프링 설정 파일
@EnableWebSecurity // 시큐리티 설정
// @Secured 어노테이션 활성화, @PreAuthorize 어노테이션 활성화
@EnableMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig {

    // 비밀번호 암호화에서 사용할 객체
    @Bean
    @Lazy
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    @Lazy
    private LoginAuthSuccessHandelr loginAuthSuccessHandler;
    @Autowired
    @Lazy
    private LoginAuthFailureHandler loginAuthFailureHandler;
    @Autowired
    @Lazy
    private LogoutAuthSuccessHandler logoutAuthSuccesshandler;

    // 인증(로그인) & 인가(권한)에 대한 시큐리티 설정
    @Bean
    @Lazy
    public SecurityFilterChain finteFilterChain(HttpSecurity http) throws Exception {
        // CSRF란, Cross Site Request Forgery의 약자로,
        // 한글 뜻으로는 사이트간 요청 위조를 뜻합니다.
        http.csrf((csrfConfig) -> csrfConfig.disable()
        )
        .headers((headerConfig) ->
        headerConfig.frameOptions(frameOptionsConfig -> // X-Frame-Options 헤더 비활성화
                frameOptionsConfig.disable()
        ))
        // 인증 & 인가 설정
        .authorizeHttpRequests(authorize -> authorize // http request 요청에 대한 화면 접근(url path) 권한 설정
                        // "/user" 와 같은 url path로 접근할 경우
                        .requestMatchers("/user/**") 
                        .authenticated() // 인증(로그인)만 접근 가능
                         // "/admin" 와 같은 url path로 접근할 경우...
                        .requestMatchers("/admin/**").hasAuthority(Role.ADMIN.name())
                        .anyRequest().permitAll()) // 그외의 모든 url path는 누구나 접근 가능 

                // 인증(로그인)에 대한 설정
                .formLogin(formLogin -> formLogin
                        .loginPage("/loginPage") // Controller에서 로그인 페이지 url path
                        /*
                         * 로그인 화면에서 form 테그의 action 주소(url path)
                         * Spring Security가 로그인 검증을 진행함
                         * Controller에서는 해당 "/login"을 만들 필요가 없음
                         */
                        .loginProcessingUrl("/login")
                        .successHandler(loginAuthSuccessHandler) // 로그인 성공시
                        .failureHandler(loginAuthFailureHandler) // 로그인 실패시
                        .permitAll() // 그외의 모든 url path는 누구나 접근 가능
                )
                // 로그아웃에 대한 설정
                .logout(logout -> logout
                        .logoutUrl("/logout") // 로그아웃 요청 url path
                        .logoutSuccessHandler(logoutAuthSuccesshandler) // 로그아웃 성공시
                        .permitAll())
                .exceptionHandling(exceptionHandling -> exceptionHandling
                // 인증되지 않은 사용자가 접근했을 때 "/index"로 리디렉션합니다.
                        .authenticationEntryPoint(
                                (request, response, authException) -> response.sendRedirect("/index"))); 
                                                                                                        

        // http.headers().frameOptions().disable(); // X-Frame-Options 헤더 비활성화

        // 위에서 설정한 인증 & 인가를 Spring Boot Configuration에 적용
        return http.build();
    }
}
```

#### LoginAuthSuccessHandelr  
로그인 성공시, 로그인 유무를 저장하고 로그인창을 닫도록 설정했다. 
```java

@Slf4j
@Component
public class LoginAuthSuccessHandelr extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    @Lazy
    private UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        // TODO Auto-generated method stub
        log.info("[LoginAuthSuccessHandler][onAuthenticationSuccess] Start");
        // 로그인 성공시, 로그인 유무 저장
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        userService.updateIsLoginByEmail(userDetails.getUsername(), true);
   
        String redirectUrl = "/close";

        response.sendRedirect(redirectUrl);

        super.onAuthenticationSuccess(request, response, authentication);
    }

}


```

#### LoginAuthFailureHandler  
로그인 실패시 에러 메세지를 보내고 함께 로그인 페이지에 머무르게 설정했다.

```java

@Slf4j
@Component
public class LoginAuthFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException exception) throws IOException, ServletException {
        // TODO Auto-generated method stub

        log.error("[LoginAuthFailureHandler][onAuthenticationFailure] Start");
        exception.printStackTrace();
        writePrintErrorResponse(response, exception);

        super.onAuthenticationFailure(request, response, exception);

    }

    private void writePrintErrorResponse(HttpServletResponse response,
            AuthenticationException exception) throws IOException {

        AuthenticationTypes authenticationTypes = AuthenticationTypes.valueOf(exception.getClass().getSimpleName());
        String errorMessage = authenticationTypes.getMsg();
        int code = authenticationTypes.getCode();
        log.error("message: " + errorMessage + " / code: " + code);

        errorMessage = URLEncoder.encode(errorMessage, "UTF-8"); 
        
        setDefaultFailureUrl("/loginPage?errorMessage=" + errorMessage);

    }

}
```

#### LogoutAuthSuccessHandler  
로그아웃 실패시 index 페이지로 이동하게 설정했다. 
```java

@Component
public class LogoutAuthSuccessHandler implements LogoutSuccessHandler {

    @Autowired
    @Lazy
    private UserService userService;

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        // TODO Auto-generated method stub
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        userService.updateIsLoginByEmail(userDetails.getUsername(), false);

        // 로그아웃 -> index로 이동
        response.sendRedirect("/index");

    }

}


```



### AuthenticationProvider

AuthenticaitonProvider들은 UserDetails를 넘겨받고 데이터베이스에 있는 사용자 정보와 인증용 객체에 담긴 정보를 비교한다.

```java
@Slf4j
@Configuration
public class AuthProvider implements AuthenticationProvider {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private AuthUserService securityUserService;

    // ID, PW 검증 
    @Override
    public  authenticate(Authentication authentication) throws AuthenticationException {
        // TODO Auto-generated method stub
        log.info("[AuthProvider][authenticate] Start");

        String email = authentication.getName(); // ID
        String pwd = (String) authentication.getCredentials(); // PW

        log.info("email: " + email + " / pwd: " + pwd); // pwd -> 암호화 전

        // ID 검증
        UserDetails userDetails = (AuthUserDto) securityUserService.loadUserByUsername(email);
        if (userDetails == null) {
            throw new UsernameNotFoundException("There is no username >> " + email);
        }
        // PW 검증
        else if (isNotMatches(pwd, userDetails.getPassword())) {
            throw new BadCredentialsException("Your password is incorrect. real -> " + userDetails.getPassword());
        }

        return new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(),
                userDetails.getAuthorities());
    }

    // AuthenticationProvider는 요청이 오면 먼저 supports()를 통해서 인증(검증) 진행 유무 판단
    // supports()의 값이 true이면, authenticate()를 실행하여 인증(검증) 진행
    @Override
    public boolean supports(Class<?> authentication) {
        // TODO Auto-generated method stub
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

    // 비밀번호 검수 
    private boolean isNotMatches(String password, String encodePassword) {
        log.info("[AuthProvider] : " + bCryptPasswordEncoder.encode(password));
        return !bCryptPasswordEncoder.matches(password, encodePassword);
    }
}

```

### UserDetailsService
데이터베이스에 존재하는 사용자 정보를 가져오기 위해서는 UserDetailsService 인터페이스를 통해 가져와야 한다.
loadUserByUsername() 메서드를 이용해 데이터베이스 데이터베이스에서 찾아낸 사용자 정보인 UserDetails 객체를 만든다.
 
```java
@Slf4j
@Service
public class AuthUserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    // email 이 아이디므로 email을 기준으로 load
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        log.info("[AuthUserService] : " + email);

        UserEntity entity = userRepository.findById(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        UserDto dto = new UserDto();

        log.info("[AuthUserService][entity] " + entity);

        dto.setEmail(entity.getEmail());
        dto.setPassword(entity.getPassword());
        dto.setEmotionCnt(entity.getEmotionCnt());
        dto.setNickname(entity.getNickname());
        dto.setPostCnt(entity.getPostCnt());
        dto.setProfileImage(entity.getProfileImage());

        // username의 데이터가 database에 존재함
        return new AuthUserDto(dto);
    }
}


```


### UserDetails

```java
@AllArgsConstructor
public class AuthUserDto implements UserDetails {

    private UserDto userDto;

    // 권한(들)
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new GranctedAuthority() {
            @Override
            public String getAuthority() {
                return userDto.getRole();            }
        });

        return authorities;
    }

    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return userDto.getPassword();
    }

    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return userDto.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        // 계정 만료 유무 확인
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        // 계정 잠긴 유무 확인
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        // 계정 비번 오래 사용했는지 유무 확인
        return true;
    }

    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        // 활성화된 계정인지 유무 확인
        return true;
    }

}

```

<br>
<br>

----
Reference
- Spring Security 
    - <a href = 'https://www.nextree.co.kr/p3239/'>[SpringBoot] Spring Security 처리 과정 by [MangKyu's Diary:티스토리]</a>
    - <a href = 'https://www.elancer.co.kr/blog/view?seq=235'>Spring Security란? 사용하는 이유부터 설정 방법까지 알려드립니다! by 이랜서 블로그</a>
    - <a href = 'https://velog.io/@eunsiver/Spring-Interceptor%EC%99%80-Servlet-Filter'>Spring Interceptor와 Servlet Filter by eunsiver</a>
    - <a href = 'https://velog.io/@hope0206/Spring-Security-%EA%B5%AC%EC%A1%B0-%ED%9D%90%EB%A6%84-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EC%97%AD%ED%95%A0-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0'>Spring Security 구조, 흐름 그리고 역할 알아보기 🌱 by 김희망</a>

    - <a href = 'https://gngsn.tistory.com/160'>Spring Security, 제대로 이해하기 - FilterChain by ENFJ.dev:티스토리</a>   

    - <a href = 'https://roadj.tistory.com/15'>서블릿 필터 vs 스프링 인터셉터 by J-Mandu</a>

    -  <a href = 'https://velog.io/@leeeeeyeon/Spring-Boot-Spring-Security-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC'>Spring Security 동작 원리 by 짱제이의 코딩짱 도전기</a>

    -  <a href = 'https://velog.io/@woosim34/Spring-Spring-Security-%EC%84%A4%EC%A0%95-%EB%B0%8F-%EA%B5%AC%ED%98%84SessionSpring-boot3.0-%EC%9D%B4%EC%83%81'>[Spring] Spring Security 설정 및 구현 by wooSim</a>
    
    -  <a href = 'https://unluckyjung.github.io/spring/2022/03/12/Spring-Filter-vs-Interceptor/'>Filter vs Interceptor by UnluckyJung's Dev Blog/a>

