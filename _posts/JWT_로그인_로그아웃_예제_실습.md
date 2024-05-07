# JWT를 이용한 로그인 프로세스 시습

<br>
>의존성 추가
```gradle
dependencies {
	...생략...
	
	// 자바 JWT 라이브러리  
	implementation 'io.jsonwebtoken:jjwt:0.9.1'
	
	// XML 문서와 Java 객체 간 매핑 자동화
	implementation 'javax.xml.bind:jaxb-api:2.3.1' 
	
}
```

>application.yml 파일에 발급자, 비밀키 값 넣기
```yml
...생략...
jwt:
	issuer: myDomainName.com/projectName // http://도메인주소/프로젝트명
	secret_key: key-is-secret-code
```

1. config.jwt 패키지안에 JwtProperties.java 파일 생성
2. 같은 패키지 안에 TokenProvider.java 파일 생성
3. JWT 테스트 코드 작성
	1. test 디렉터리에 config.jwt 패키지를 생성하고 JwtFactory.java 파일 생성
		- 이 파일은 JWT 토큰 서비스를 테스트하는 데 사용할 모킹(mocking)용 객체
		- 테스트를 실행할 때 객체를 대신하는 가짜 객체임...
	2. 같은 패키지에 TokenProviderTest.java 파일 생성
4. 리프레시 토큰 구현
	1. domain 패키지에 RefreshToken.java 생성
	2. repository 패키지에 RefreshTokenRepository.java 생성
	3. config.jwt 패키지에 TokenAuthenticationFilter.java 생성
		- 액세스 토큰값이 담긴 Authorization 헤더값을 가져온 뒤 액세스 토큰이 유요하다면 인증 정보를 설정하는 필터
	4. UserService.java파일을 열어 수정
		1. public User findById(Long userId) 메서드 추가
	5. service 패키지에 RefreshTokenService.java 파일 생성
	6. service 패키지에 TokenService.java 파일 생성
	7. dto 패키지에 CreateAccessTokenRequest 생성
	8. dto 패키지에 CreateAccessTokenResponse 생성
	9. controller 패키지에 TokenApiContreoller.java 생성
	10. 리프레시 토큰 테스트 코드 작성
		1. test 디렉토리로 가서 controller 패키지 안에 TokenApiControllerTest.java 생성