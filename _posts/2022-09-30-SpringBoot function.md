# 1. Spring Boot Validation

### Validation이란

- 프로그래밍에 있어서 가장 필요한 부분으로, Java 에서는 null 값에 대해서 접근하려고 할 때 null pointer exception 이 발생하므로, 이러한 부분을 방지하기 위해서 미리 검증을 하는 과정을 Validation 이라고 함

- 예제(많은 검증 때문에 비즈니스 로직에서 벗어남)

  - ```java
    if(account == null || pw == null){
    	return 
    }
    
    if(age == 0){
    	return
    }
    
    //수행해야할 로직 진행
    ```

    - account, pw, age 에 대한 검증때문에 자원 낭비



#### Validation 을 사용하는 이유

- 사용하지 않았을 경우

1. 검증해야 할 값이 많은 경우 코드의 길이가 길어짐
2. 구현에 따라서 달라질 수 있지만 Service Logic 과의 분리가 필요
3. 흩어져 있는 경우 어디에서 검증을 하는지 알기 어려우며, 재사용의 한계가 있음
4. 검증 Logic 이 변경 되는 경우 테스트 코드 등 참조하는 클래스에서 Logic 이 변경되어야 하는 부분이 발생할 수 있음



#### Validation Annotation

- ![image-20220930195934607](../images/2022-09-30-SpringBoot function/image-20220930195934607.png)





# 2 .Validation 시작

- gradle dependencies -> implementation 'org.springframework.boot:spring-boot-starter-web'

- Annotation 을 통해 

- User 클래스

  - ```java
    package com.example.validation.dto;
    
    import javax.validation.constraints.*;
    
    public class User {
        @NotBlank
        private String name;
        @Min(value = 0)
        @Max(value = 90)
        private int age;
        @Email
        private String email;
    
        @Pattern(regexp = "^\\d{2,3}-\\d{3,4}-\\d{4}$", message = "핸드폰 번호 양식과 맞지 않습니다. 01x-xxx(x)-xxxx")
        private String phoneNumber;
    
        public String getName() {
            return name;
        }
    
        public void setName(String name) {
            this.name = name;
        }
    
        public int getAge() {
            return age;
        }
    
        public void setAge(int age) {
            this.age = age;
        }
    
        public String getEmail() {
            return email;
        }
    
        public void setEmail(String email) {
            this.email = email;
        }
    
        public String getPhoneNumber() {
            return phoneNumber;
        }
    
        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }
    
        @Override
        public String toString() {
            return "User{" +
                    "name='" + name + '\'' +
                    ", age=" + age +
                    ", email='" + email + '\'' +
                    ", phoneNumber='" + phoneNumber + '\'' +
                    '}';
        }
    }
    ```

    - notBlank, Min, Max, Pattern(정규식), Email 등으로 User class 에서 validation 구현 

- ApiController

  - ```java
    package com.example.validation.controller;
    
    import ...;
    
    @RestController
    @RequestMapping("/api")
    public class ApiController {
    
        @PostMapping("/user")
        //validation 을 위해서 @Valid 사용
        //BindingResult 로 받게 되면 예외가 나오는게 아니라 validation 에 대한 결과가 bindingResult 에 들어감
        public Object user(@Valid @RequestBody User user, BindingResult bindingResult){
    
            if(bindingResult.hasErrors()){
                StringBuilder sb = new StringBuilder();
                //bindingResult 에서 에러를 받어서 출력 및 StringBuilder 에 넣음
                bindingResult.getAllErrors().forEach(objectError -> {
                    FieldError field = (FieldError) objectError;
                    String msg = objectError.getDefaultMessage();
    
                    System.out.println("field : " + field.getField());
                    System.out.println(msg);
    
                    sb.append("field : " + field.getField());
                    sb.append("message : " + msg);
                });
    			//return 값으로 넣어서 400번 호출 및 sb.toString() 출력
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(sb.toString());
            }
            System.out.println(user);
            return user;
        }
    
    }
    ```

    - parameter 에 @Valid 를 사용하여 해당 인자가 validation 을 사용한다고 알림
    - bindingResult 로 error 메시지 출력

- json 과 result

  - post : age 가 error 일 때

    - ```json
      {
        "name" : "홍길동",
        "age" : 100,
        "email" : "steve@gamil.com",
        "phoneNumber" : "010-1111-2222"
      
      }
      ```

  - response(body 값)

    - field : agemessage : 90 이하여야 합니다

      

# 2. Custom Validation

- @AssertTrue / False 와 같은 method 지정을 통해서 Custom Logic 적용 가능
- ConstraintValidator 를 적용하여 재사용이 가능한 Custom Logic 적용 가능

### 예제 : 위 예제의 User 와 ApiController 계속 사용

-  User 클래스

  - YearMonth 에 @AssertTrue 를 이용하여 검증

  - ```java
    package com.example.validation.dto;
    
    import ...;
    
    public class User {
        @NotBlank
        private String name;
        @Min(value = 0)
        @Max(value = 90)
        private int age;
        @Email
        private String email;
    
        @Pattern(regexp = "^\\d{2,3}-\\d{3,4}-\\d{4}$", message = "핸드폰 번호 양식과 맞지 않습니다. 01x-xxx(x)-xxxx")
        private String phoneNumber;
    
        @Size(min = 6, max =6)
        private String reqYearMonth; //yyyyMM
    
        //getsetMethod 생략
    
        public String getReqYearMonth() {
            return reqYearMonth;
        }
    
        public void setReqYearMonth(String reqYearMonth) {
            this.reqYearMonth = reqYearMonth;
        }
    
        @AssertTrue(message = "yyyyMM 의 형식에 맞지 않습니다.")
        //boolean 형식은 메소드 앞에 is 를 붙여야 한다.
        public boolean isReqYearMonthValidation(){
            try{
                //yyyyMMdd 형식을 검증하기 때문에 "01" 을 붙여서 yyyMM01 로 만듦
                LocalDate localDate = LocalDate.parse(getReqYearMonth() + "01", DateTimeFormatter.ofPattern("yyyyMMdd"));
                //맞는 형식이 아니면 false 반환
            }catch(Exception e){
                return false;
            }
    
            return true;
        }
        @Override
        public String toString() {
            return "User{" +
                    "name='" + name + '\'' +
                    ", age=" + age +
                    ", email='" + email + '\'' +
                    ", phoneNumber='" + phoneNumber + '\'' +
                    ", reqYearMonth='" + reqYearMonth + '\'' +
                    '}';
        }
    }
    
    ```

    

### 예제 2 : ConstraintValidator 를 사용한 재사용

- interface 로 @YearMonth 생성

  - ```java
    package com.example.validation.annotation;
    
    import com.example.validation.validator.YearMonthValidator;
    
    import javax.validation.Constraint;
    import javax.validation.Payload;
    import java.lang.annotation.Retention;
    import java.lang.annotation.Target;
    
    import static java.lang.annotation.ElementType.*;
    import static java.lang.annotation.ElementType.TYPE_USE;
    import static java.lang.annotation.RetentionPolicy.RUNTIME;
    
    //어떤 클래스를 가지고 검사할건지 설정
    @Constraint(validatedBy = {YearMonthValidator.class})
    @Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
    @Retention(RUNTIME)
    public @interface YearMonth {
        //default message 값 설정
        String message() default "{yyyyMM 형식에 맞지 않습니다.}";
    
        Class<?>[] groups() default { };
    
        Class<? extends Payload>[] payload() default { };
        //이까지 default 형식
    
        //pattern 의 디폴트 값
        String pattern() default "yyyyMMdd";
    
    }
    ```

    - @Constraint, @Target, @Retention 은  필수 annotation
      - @Constraint 에 validator 클래스를 넣어줌 (여기서는 YearMonthValidator 클래스)
    - 위 3개 method 는 default 형식
    - pattern 의 default 값으로 "yyyyMMdd"  사용

- YearMonthValidator 클래스

  - ```java
    package com.example.validation.validator;
    
    
    import com.example.validation.annotation.YearMonth;
    
    import javax.validation.ConstraintValidator;
    import javax.validation.ConstraintValidatorContext;
    import java.time.LocalDate;
    import java.time.format.DateTimeFormatter;
    
    //Constraintvalidator<annotation, 검증 형식> 을 사용해야 함
    public class YearMonthValidator implements ConstraintValidator<YearMonth, String> {
    
        private String pattern;
    
        @Override
        //초기화 매소드, annotation 패턴을 가져옴
        public void initialize(YearMonth constraintAnnotation) {
            //@YearMonth에서 pattern() = "yyyyMMdd"
            this.pattern = constraintAnnotation.pattern();
        }
    
        @Override
        //유효성 검사(true, false) 
        //앞선 예제 1에서 AssertTrue 의 isReqYearMonthValidation()과 똑같음
        //value 값이 검증해야하는 값 
        public boolean isValid(String value, ConstraintValidatorContext context) {
            //yyyyMM
            try{
                //"01" 을 붙이는 이유는 임의로 yyyyMMdd 로 만들어서 validation 검사를 위해
                LocalDate localDate = LocalDate.parse(value + "01", DateTimeFormatter.ofPattern(this.pattern));
            }catch(Exception e){
                return false;
            }
    
            return true;
        }
    }
    ```

- 이후 User 클래스의 String reqYearMonth; 에 @YearMonth 를 붙여 검증