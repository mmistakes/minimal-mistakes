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
- Bean Validation과 관련된 의존을 설정을 추가한다.
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

각각의 
## Ref.
- 최범균, 스프링프로그래밍입문5, 가메출판사.