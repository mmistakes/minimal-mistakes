---
title: "Spring MVC : Bean Validation"
categories:
  - Spring
toc: true
toc_label: "목차"
#toc_icon:
toc_sticky: true
#last_modified_at:
---

## 1. Bean Validation을 이용한 값 검증 처리
@Valid 애노테이션은 Bean Validation 스펙에 정의되어 있다. 이 스펙은 @Valid 애노테이션뿐만 아니라 @NotNull, @Digits, @Size 등의 애노테이션을 정의하고 있다. 이 애노테이션을 사용하면 Validator 작성 없이 애노테이션만으로 커맨드 객체의 값 검증을 처리할 수 있다.

Bean Validation이 제공하는 애노테이션을 이용해서 커맨드 객체의 값을 검증하는 방법은 다음과 같다.
- Bean Validation과 관련된 의존을 설정에 추가한다.
- 커맨드 객체에 @NotNull, @Digits 등의 애노테이션을 이용해서 검증 규칙을 설정한다.

### 1.1 Bean Validation 관련 의존 추가
가장 먼저 할 작업은 Bean Validation 관련 의존을 추가하는 것이다. Bean Validation을 적용하려면 API를 정의한 모듈과 이 API를 구현한 프로바이더를 의존으로 추가해야 한다, 프로바이더로는 Hibernate Validator를 사용할 것이다. 다음은 pom.xml에 의존 설정을 추가한 예이다.
```xml
<dependency>
    <groudId>javax.validation</groudId>
    <artifactId>validation-api</artifactId>
    <version>1.1.0.Final</version>
</dependency>
<dependency>
    <groudId>org.hibernate</groudId>
    <artifactId>hibernate-validator</artifactId>
    <version>5.4.2.Final</version>
</dependency>
```

### 1.2 검증 규칙 설정
커맨드 클래스는 다음과 같이 Bean Validation과 프로바이더가 제공하는 애노테이션을 이용해서 값 검증 규칙을 설정할 수 있다,

```java
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

public class RegisterRequest {
    @NotBlack
    @Email
    private String email;
    @Size(min=6)
    private String password;
    @NotEmpty
    private String confirmPassword;
    @NotEmpty
    private String name;
}
```
@Size, @NotBlank, @Email, @NotEmpty 애노테이션은 각각 검사하는 조건이 다르지만 애노테이션 이름만 보면 어떤 검사를 하는지 어렵지 않게 유추할 수 있다. 정확한 의미는 [여기](#2-bean-validation의-주요-애노테이션)에서 확인할 수 있다.

### 1.3 OptionalValidatorFactoryBean 클래스 빈 등록
Bean Validation 애노테이션을 사용했다면 그 다음으로 할 작업은 Bean Validation 애노테이션을 적용한 커맨드 객체를 검증할 수 있는 OptionalValidatorFactoryBean 클래스를 빈으로 등록하는 것이다.

@EnableWebMvc 애노테이션을 사용하면 OptionalValidatorFactoryBean을 글로벌 범위 Validator로 등록하므로 다음과 같이 @EnableWebMvc 애노테이션을 설정했다면 추가로 설정할 것은 없다.

```java
@Configuration
@EnableWebMvc // OptioanlValidatorFactoryBea을 글로벌 범위 Validator로 등록
public class MvcConfig implements WebMvcConfigurer{
    ...
}
```

### 1.4 @Valid 애노테이션 적용
남은 작업은 @Valid 애노테이션을 붙여서 글로벌 범위 Validator로 검증하는 것이다.

```java
@PostMapping("/register/step3")
public String handleStep3(@Valid RegisterRequest regReq, Errors errors) {
    if(errors.hasErrors())
        return "register/step2";
    ...
}
```

### 1.5 주의사항
만약 글로벌 범위 Validator를 따로 설정했다면 해당 설정을 삭제하자.
> 아래와 같이 글로벌 범위 Validator를 설정하면 OptionalValidatorFactoryBean을 글로벌 범위 Validator로 사용하지 않는다.\
스프링 MVC는 별도로 설정한 글로벌 범위 Validato가 없을 때에 OptionalValidatorFactoryBean을 글로벌 범위 Validator로 사용한다.
```java
@Configuration
@EnableWebMvc
public clas MvcConfig implements WebMvcConfigurer {

    // 글로벌 범위 Validator를 설정하면
    // OptionalValidatorFactoryBean을 사용하지 않는다.
    @Override
    public Validator getValidator(){
        return new RegisterRequestValidator();
    }
}
```

### 1.6 Bean Validation의 에러 메시지
![beanvalidation1](https://user-images.githubusercontent.com/97718735/222687337-077d99a1-ab0d-4862-928f-106ead24f990.png)

위 오류 메시지는 메시지 프로퍼티 파일에 등록한 내용이 아니다. 이 메시지는 Bean Validation 프로바이더(hibernate-validator)가 제공한느 기본 에러 메시지다. 스프링 MVC는 에러 코드에 해당하는 메시지가 존재하지 않을 때 Bean Validation 프로바이더가 제공하는 기본 에러 메시지를 출력한다.

> 기본 에러 메시지 대신 원하는 에러 메시지를 사용하려면 다음 규칙을 따르는 메시지 코드를 메시지 프로퍼티 파일에 추가하면 된다.
- 애노테이션이름.커맨드객체모델명.프로퍼티명
- 애노테이션이름.프로퍼티명
- 애노테이션이름

다음 코드를 보자.
```java
public class ReigsterRequest{
    @NotBlank
    @Email
    private String email;
}
```

값을 검사한는 과정에서 @NotBlank 애노테이션으로 지정한 검사를 통과하지 못할 때 사용하는 메시지 코드는 다음과 같다. (커맨드 객체의 모델 이름을 registerRequest라고 가정).
- NotBlank.registerRequest.name
- NotBlank,name
- NotBlank

따라서 다음과 같이 메시지 프로퍼티 파일에 위 규칙에 맞게 에러 메시지를 등록하면 기본 에러 메시지 대신 원하는 에러 메시지를 출력할 수 있다.
```properties
NotBlank=필수 항목입니다. 공백 문자는 허용하지 않습니다.
NotEmpty=필수 항목입니다.
Size.password=암호 길이는 6자 이상이어야 합니다.
Email=올바른 이메일 주소를 입력해야 합니다.
```

## 2. Bean Validation의 주요 애노테이션
### 2.1 Bean Validation 1.1
Bean Validation 1.1에서 제공하는 주요 애노테이션은 다음과 같다. 모든 애노테이션은 javax.validation.constraints 패키지에 정의되어 있다.

|애노테이션| 주요 속성 | 설명 | 지원 타입 |
|:------:|:---:|:---:|:---:|
|@AssertTrue <br> @AssertFalse||값이 true인지 또는 false인지 검사한다. <br> null은 유효하다고 판단한다.|boolean <br> Boolean|
|@DecimalMax <br> @DecimalMin|String value<br> -최대값 또는 최소값<br> boolean inclusive <br> - 지정값 포함 여부 <br> - 기본값 : true|지정한 값보다 작거나 같은지 또는 크거나 같은지 검사한다. <br> inclusive가 false이면 value로 지정한 값은 포함하지 않는다. <br> null은 유효하다고 판단한다.|BigDecimal<br>BigInteger<br>CharSequence<br>정수타입|
|@Max <br> @Min|long value|지정한 값보다 작거나 같은지 또는 크거나 같은지 검사한다.<br>null은 유효하다고 판단한다.|BigDecimal<br>BigInteger<br>정수타입|
|@Digits|int integer<br>-최대 정수 자릿수<br>int fraction<br>-최대 소수점 자릿수 |자릿수가 지정한 크기를 넘지 않는지 검사한다. <br> null은 유효하다고 판단한다.|BigDecimal<br>BigInteger<br>CharSequence<br>정수타입|
|@Size|int min<br>-최소 크기<br>-기본 값 : 0<br> int max<br>최대 크기<br>-기본값 : 정수 최대값|길이나 크기가 지정한 값 범위에 있는지 검사한다.<br>null은 유효하다고 판단한다.|CharSequence<br>Collection<br>Map<br>배열|
|@Null <br> @NotNull ||값이 null인지 또는 null이 아닌지 검사한다.||
|@Pattern|String regexp<br>-정규표현식|값이 정규표현식에 일치하는지 검사한다.<br>null운 유효하다고 판단한다.|CharSequence|

> @NotNull을 제외한 나머지 애노테이션은 검사 대상 값이 null인 경우 유효한 것으로 판단하는 것을 알 수 있다. 따라서 필수 입력 값을 검사할 때에는 다음과 같이 @NotNull @Size를 함께 사용해야 한다.

```java
@NotNull
@Size(min=1)
private String title;
//@NotNull만 사용하면 title의 값이 빈 문자열("")일 경우 값 검사를 통과한다.
```

### 2.2 Bean Validation 2.0
Hibernate Validator는 @Email이나 @NotBlank와 같은 추가 애노테이션을 지원하는데 이 중 일부는 Bean Validation 2.0에 추가됐다. 스프링 5버전은 Bean Validation 2.0을 지원하므로 Bean Validation 2.0을 사용하면 아래의 애노테이션을 추가로 사용할 수 있다.

|애노테이션|설정|지원 타입|
|:---:|:---:|:---:|
|@NotEmpty|문자열이나 배열의 경우 null이 아니고 길이가 0이 아닌지 검사한다.<br>콜렉션의 경우 null이 아니고 크기가 0이  아닌지 검사한다.|CharSequence<br>Collection<br>Map<br>배열|
|@NotBlank|null이 아니고 최소한 한 개 이상의 공백아닌 문자를 포함하는지 검사한다.|CharSequence|
|@Positive<br>@PositiveOrZero|양수인지 검사한다.<br>OrZero가 붙은 것은 0 또는 양수인지 검사한다.<br>null은 유효하다고 판단한다.|BigDecimal<br>BigInteger<br>정수타입|
|@Negative<br>@NegativeOrZero|음수인지 검사한다.<br>OrZero가 붙은 것은 0 또는 양수인지 검사한다.<br>null은 유효하다고 판단한다.|BigDecimal<br>BigInteger<br>정수타입|
|@Email|이메일 주소가 유효한지 검사한다.<br>null은 유효하다고 판단한다.|CharSequence|
|@Future<br>@FutureOrPresent|해당 시간이 미래 시간인지 검사한다.<br>OrPresent가 붙은 것은 현재 또는 미래시간인지 검사한다.<br>null은 유효하다고 판단한다.|시간 관련 타입|
|@Past<br>@PastOrPresent|해당 시간이 과거 시간인지 검사한다.<br>OrPresent가 붙은 것은 현재 또는 과거 시간인지 검사한다.<br>null은 유효하다고 판단한다.|시간 관련 타입|

Bean Validation 2.0을 사용하고 싶다면 다음 의존을 설정하면 된다.
```xml
<!--validation-api는 생략 가능-->
<dependency>
    <groupId>javax.validation</groupId>
    <artifactId>validation-api</artifactId>
    <version>2.0.1.Final</version>
</dependency>

<dependency>
    <groupId>org.hibernate.validator</groupId>
    <artifactId>hibernate-validator</artifactId>
    <version>6.0.7.Final</version>
</dependency>
```

## Ref.
- 최범균, 스프링프로그래밍입문5, 가메출판사.