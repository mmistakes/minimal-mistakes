---
categories: "socceranalyst"
tag: ["validation", "spring"]
---



# Validation 설정 추가

validation 이란 간단히 말해서 사용자가 입력한 내용이 정확한지 검증하고 DB 에 반영하는 것입니다.

즉, 회원가입을 할 때 ID 를 "4자 이상 20자 이하, 영문소문자 필수, 숫자 선택" 과 같이 입력할 수 있는 값을 정하는 것입니다. 이 부분은 Spring Data JPA 를 사용한다면 어노테이션을 통해 간단하게 설정할 수 있지만, **놀랍게도 배포할 때까지 하지 않았습니다.(!)** 필수인데도 말입니다... 대신 프론트엔드에서는 정규식표현을 이용하여 validation 을 추가해놓았습니다.

**이런 validation 은 프론트엔드, 백엔드, DB 세군데에 반영하겠습니다.** 저는 프론트, 백엔드만 반영하면 되는줄 알았는데 찾아보니 DB 에도 반영되어야하더군요. 생각해보면 DB 무결성을 보장하기 위해 DB 에도 적용해야 하는데 제가 생각이 짧았던 것 같습니다. 

문제는 어떤 값을 null 을 허용할 것인지, 입력이 안되었을 때 default 값은 어떻게 할 것인지 등을 Auth 이외에는 구체적으로 고민하지 않았습니다.

그래서 일단 Validation 을 어떻게 할지부터 고민해보겠습니다.

# Validation 설정

일단 필드명, 타입, 제약사항(Constraints), 유효 범위로 구분하고 각각 설정해보겠습니다.

id 는 자동생성으로 입력불가능한 사항이니 생략하겠습니다.

제약사항은 WorkBench 기준입니다.

- **PK** : 기본키(Primary Key)입니다. NotNull + Unique 이며 테이블 당 1개만 설정할 수 있습니다. 여러열로 기본키를 구성하려면 복합키(composite key) 를 사용할 수 있습니다. 복합키는 두 개의 열이 합쳐서 하나의 복합열을 구성하는 것으로, 각각의 열은 Unique 가 아닐 수 있지만 복합열은 Unique 가 되어야 합니다.
- **NN** : not Null 입니다. Null 값을 허용하지 않습니다. 하지만 0(숫자 영) 이나 ""(공백) 은 허용하므로 추가적인 조치가 필요합니다.
- **UQ** : unique 입니다. 열의 모든 값이 고유해야 합니다.
- **CHECK** : 유효 범위에 쓸 CHECK 입니다. 제약사항과 따로 구분해놨습니다. 열 값이 특정 조건을 충족해야 함을 지정합니다. (1 < 값 <= 10 과 같이 사용합니다.)
- **DEFAULT** : 열에 기본값을 설정합니다. 
- **B** : Binary 입니다. 이 플래그는 열의 데이터 유형이 이진 데이터임을 나타냅니다. 이 경우, 해당 열은 이진 데이터를 저장하고 처리하는 데 사용됩니다. 
- **UN**: Unsigned  입니다. 이 제약사항은 열의 데이터 유형이 부호 없는 정수임을 나타냅니다. 부호 없는 정수는 음수 값을 허용하지 않으며, 0 및 양수 값만 저장할 수 있습니다. 이렇게 하면 해당 열의 저장 공간을 최적화할 수 있습니다.
- **ZF** : Zero Fill 입니다. 이 제약사항은 열 값이 저장될 때 남은 공간을 0으로 채워야 함을 나타냅니다. 이는 주로 고정 길이의 숫자 값을 저장하는 데 사용되며, 일관된 형식을 유지할 때 도움이 됩니다.
- **G** : Generated 입니다.  이 제약사항은 열 값이 사용자가 입력한 것이 아니라, 데이터베이스 시스템에 의해 자동으로 생성됨을 나타냅니다. 이는 주로 생성된 열(Generated Columns)이나 자동 증가 열(Auto-Increment Columns)에 사용됩니다.
- **AI** : Auto Increment 입니다. 데이터베이스 관리 시스템에서 자동으로 값을 증가시켜 고유한 값을 생성하는 기능입니다. 모든 테이블의 기본키를 id 로 하고 AI 를 적용했습니다.

### Member  validation

<table>
    <thead>
        <tr>
        	<th>필드명</</th>
            <th>타입</</th>
            <th>제약사항</</th>
            <th>유효 범위</</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>email</td>
            <td>String</td> 
            <td>NN</td> 
            <td>공백 미허용, 이메일 형식</td>             
        </tr>
        <tr>
            <td>memberId</td>
            <td>String</td> 
            <td>NN, UQ</td> 
            <td>글자수 4~20/소문자필수, 숫자선택</td>             
        </tr>
        <tr>
            <td>password</td>
            <td>String</td> 
            <td>NN</td> 
            <td>글자 수 8~30/숫자, 영문자, 특수문자 조합</td>             
        </tr>
        <tr>
            <td>name</td>
            <td>String</td> 
            <td>NN</td> 
            <td>글자수 1~100, 영문자 또는 한글</td>             
        </tr>
        <tr>
            <td>nickname</td>
            <td>String</td> 
            <td>NN</td> 
            <td>글자수 1~20, 영문자 또는 한글로 시작, 숫자선택</td>             
        </tr>
        <tr>
            <td>authority</td>
            <td>ENUM</td> 
            <td>NN</td> 
            <td>ENUM('ROLE_USER', 'ROLE_ADMIN')</td>             
        </tr>
    </tbody>
</table>

글자 수가 지정되어있으면 Not Null 이 적용된거지만 혹시 정규식표현이 변경될 수도 있으니 NotNull 도 함께 넣어주겠습니다.

만약에 NotNull 만 넣을거라면 백엔드서버에서는 JPA 를 사용하면서 @NotBlank 를 넣어줘야 합니다. 해당 문자열이 `""`(공백) 이라면 사실 의미가 없죠.

**참고로 spring data JPA 의 @NotNull vs @NotBlank vs @NotEmpty 입니다.** 

- @NotBlank : 문자열이 `null`이 아니고, 공백 문자를 제외한 길이가 1 이상인지 확인합니다. `""`(공백) 도 허용하지 않습니다.
- @NotNull : `null` 값만 허용하지 않습니다. `0`, `""` 은 가능합니다.
- @NotEmpty : 문자열, 컬렉션, 배열, 맵 등의 객체가 비어있지 않음을 확인합니다. 문자열의 경우  `null`이거나 길이가 0인지 확인합니다. 즉, `""`(공백) 은 통과할 수 있습니다.

### Player validation

<table>
    <thead>
        <tr>
        	<th>필드명</</th>
            <th>타입</</th>
            <th>제약사항</</th>
            <th>유효 범위</</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>name</td>
            <td>String</td> 
            <td>NN</td> 
            <td>글자수 1~100, 영문자 또는 한글</td>             
        </tr>
        <tr>
            <td>position</td>
            <td>ENUM</td> 
            <td>NN</td> 
            <td>ENUM([포지션 이름])</td>             
        </tr>
        <tr>
            <td>memberId</td>
            <td>Long</td> 
            <td>NN, UN, FK</td> 
            <td>-</td>             
        </tr>
    </tbody>
</table>

memberId 는 어차피 1부터 시작하니까 UN(unsigned) 를 붙여서 쥐톨이나마 데이터를 효율적으로 사용해봅시다.

### Game validation

<table>
    <thead>
        <tr>
        	<th>필드명</</th>
            <th>타입</</th>
            <th>제약사항</</th>
            <th>유효 범위</</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>memberId</td>
            <td>Long</td> 
            <td>NN, UN, FK</td> 
            <td>-</td>             
        </tr>
        <tr>
            <td>gameName</td>
            <td>String</td> 
            <td>NN</td> 
            <td>글자수 1~100, 영문자, 한글, 숫자, 특수문자 가능</td>             
        </tr>
        <tr>
            <td>opponent</td>
            <td>String</td> 
            <td>-</td>
            <td>글자수 0~100, 영문자, 한글, 숫자, 특수문자 가능</td>             
        </tr>
        <tr>
            <td>location</td>
            <td>String</td> 
            <td>-</td> 
            <td>글자수 0~100, 영문자, 한글, 숫자, 특수문자 가능</td>             
        </tr>
         <tr>
            <td>GA, GF</td>
            <td>Int</td> 
            <td>-</td> 
            <td>0~999 숫자만 허용</td>             
        </tr>
         <tr>
            <td>createdAt</td>
            <td>Date</td> 
            <td>NN</td> 
            <td>Date 형식</td>             
        </tr>
    </tbody>
</table>

gameName, opponent, location, GA, GF 까지 넉넉하게 줬습니다.

**gameName 은 글자수 1개 이상으로 NN 을 부여하지만, 나머지는 공백이나 0 이 가능하도록 합니다.** 즉, game 을 생성할 때나 수정할 때 gameName 만 입력해도 되게 하는 겁니다. **왜냐하면 입력하기 귀찮을 수 있잖아요??**

현재 서버에서 GA, GF 가 Integer 형태이지만 null 값을 넣어주지 않기 위해 Int 로 변경해주겠습니다.

createdAt 은 지금 프론트에서는 `2023-04-06T04:12:27.000Z` 이런 LocalDateTime 형식으로 보내는데요. 백엔드에서 LocalDate 로 받아서 변환해서 잘보내줍니다.

지금 알았는데 한국시간으로 안가네요 ... ㅎㅎ 지금은 어차피 Date 만 필요하니 급할 건 없지만 locale 을 한국으로 해서 같이 수정해야겠습니다.

### Game_player validation

<table>
    <thead>
        <tr>
        	<th>필드명</</th>
            <th>타입</</th>
            <th>제약사항</</th>
            <th>유효 범위</</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>gameId</td>
            <td>Long</td> 
            <td>NN, UN, FK</td> 
            <td>-</td>             
        </tr>
        <tr>
            <td>playerId</td>
            <td>Long</td> 
            <td>NN, UN, FK</td> 
            <td>-</td>             
        </tr>
    </tbody>
</table>


game 과 player 테이블의 매핑(연결) 테이블입니다. 특별할 건 없습니다.

### Record validation

<table>
    <thead>
        <tr>
        	<th>필드명</</th>
            <th>타입</</th>
            <th>제약사항</</th>
            <th>유효 범위</</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>gameId</td>
            <td>Long</td> 
            <td>NN, UN, FK</td> 
            <td>-</td>             
        </tr>
        <tr>
            <td>playerId</td>
            <td>Long</td> 
            <td>NN, UN, FK</td> 
            <td>-</td>             
        </tr>
        <tr>
            <td>gamePosition</td>
            <td>ENUM</td> 
            <td>NN</td> 
            <td>ENUM([포지션 이름])</td>             
        </tr>
        <tr>
            <td>timeIn, timeOut</td>
            <td>Int</td> 
            <td>-</td> 
            <td>0~120</td>             
        </tr>
        <tr>
            <td>main</td>
            <td>ENUM</td> 
            <td>NN</td> 
            <td>ENUM[MAIN, SUB]</td>             
        </tr>
        <tr>
            <td>touch, goal, assist 등등 기록</td>
            <td>Int</td> 
            <td>-</td> 
            <td>0~999 숫자만 허용</td>             
        </tr>
    </tbody>
</table>

gameId 와 playerId 는 FK 입니다. 

gamePosition 과 main 은 각각의 ENUM 타입입니다.  NotNull 을 넣었는데요. 저번에 프론트에서 "경기생성 페이지" 에서 데이터를 넘길 때 실수가 있어서  main 값을 넘기지 못했었습니다. 그때 Null 값이 들어갔었습니다. ENUM 을 지정하더라도 Not Null 은  필수입니다.

timeIn, timeOut 은 값 범위를 120분 이상까지 할지 고민했는데, 맘편하게 120분까지만 했습니다. touch, goal, assist 등의 기록도 맘편하게 999까지 허용했습니다.

### DotRecord validation

<table>
    <thead>
        <tr>
        	<th>필드명</</th>
            <th>타입</</th>
            <th>제약사항</</th>
            <th>유효 범위</</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>gameId</td>
            <td>Long</td> 
            <td>NN, UN, FK</td> 
            <td>-</td>             
        </tr>
        <tr>
            <td>playerId</td>
            <td>Long</td> 
            <td>NN, UN</td> 
            <td>-</td>             
        </tr>
        <tr>
            <td>playerName</td>
            <td>String</td> 
            <td>NN</td> 
            <td>글자수 1~100, 영문자 또는 한글</td>             
        </tr>
        <tr>
            <td>gamePosition</td>
            <td>ENUM</td> 
            <td>NN</td> 
            <td>ENUM([포지션 이름])</td>             
        </tr>
        <tr>
            <td>x, y, shootX, shootY</td>
            <td>Float(10,4)</td> 
            <td>-</td> 
            <td>-</td>             
        </tr>
        <tr>
            <td>shoot, validShoot</td>
            <td>boolean</td> 
            <td>-</td> 
            <td>-</td>             
        </tr>
        <tr>
            <td>gameTime</td>
            <td>Int</td> 
            <td>-</td> 
            <td>0~120 숫자만 허용</td>             
        </tr>
    </tbody>
</table>

이 웹앱의 핵심 기능의 DB 입니다. 

먼저 game 과는 다대일 관계이지만 Player 와는 아닙니다. 원래는 Player 와도 다대일 관계였지만... 익명 및 상대편 DotRecord 구현이 힘들어서 Player 다대일 관계는 뺏습니다. 

그리고 백엔드에서 playerId 를 참조해서 해당 DotRecord 의 playerName 과 gamePosition 을 Join 하여 넘기는 것보다 DotRecord 에 필드를 포함시키는 게 코드짜기 편하겠다고 생각해서 playerName 과 gamePosition 을 테이블에 포함시켰습니다. 

x, y, shootX, shootY 는 점이 찍히는 위치, 슛이 끝나고 화살표가 그려지는 위치(shoot, validShoot 이 True 일 때) 입니다. **그런데 지금 프론트엔드 payLoad 확인해보니 x, y 좌표값이 전부 정수형태로 갑니다. 0.xxx 가 중요할 수도 있으니 한번 확인해봐야겠습니다.**

gameTime 은 어차피 최대 120분이니 복잡할 것 없이 Int 로 범위 설정했습니다.

# 백엔드 Validation 설정 바꾸기 

이제 백엔드 스프링 코드를 하나하나 보면서 변경해봅시다. 

**중요한 점은 Validation 을 직접 Entity 에 설정하지 않고 DTO (Data Transfer Object) 에 적용한다는 점입니다. 방금  검색하다가 깨달았습니다...**

~~깨닫고 나니 김영한님이 저에게 DTO 에 적용해야하지만 당시 코드가 간단해서 Entity 에 강의하신게 기억이 납니다. 복습의 중요성입니다. (물론 포스팅 내용에 적어놓지 않아서 복습해봤자 의미가 없었을겁니다.)~~

다시 보니 김영한님 강의에서도 Validation 을 DTO 에 적용해놨습니다. 버그 이슈의 대부분은 지능 이슈입니다!

복습합시다. [Bean Validation 다시 복습](https://hobeen-kim.github.io/learning/spring-MVC2-%EA%B2%80%EC%A6%9D2-Bean-Validation/) 



### 검증에 실패한다면 어떤 오류가?

spring validation 을 통해서 프론트에서 서버로 들어오는 RequestDto 를 검증하게 됩니다.

**이때 검증에 실패하면 컨트롤러 메서드는 실행하지 않고 Error 를 반환합니다.**

이때 에러는 MethodArgumentNotValidException, BindException 입니다.

- MethodArgumentNotValidException : BindException 을 상속받습니다.  @RequestBody 에서 Validation 오류 시 해당 오류를 반환합니다.
- BindException : Exception 을 상속받습니다. @ModelAttribute 에서 Validation 오류 시 해당 오류를 반환합니다.

[@validated, @valid 관련 참고 포스팅 링크입니다.](https://wildeveloperetrain.tistory.com/158)

결론적으로 MethodArgumentNotValidException 이 터졌고, 체크예외이기 때문에 RuntimeException 으로는 (당연히) 잡을 수 없어서 전역예외처리에 추가해야 했습니다.

**GlobalExceptionHandler 클래스**

```java
package soccer.backend.aop;

import ...;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException e) {
       ...
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        //이걸로 어떤 핸들러가 실행되는지 확인해봤습니다. ㅎㅎ
        log.info("MethodArgumentNotValidException 실행");

        BindingResult bindingResult = e.getBindingResult();
        List<FieldError> errors = bindingResult.getFieldErrors();
        List<String> errorMessages = errors.stream()
                .map(error -> error.getField() + " : " + error.getDefaultMessage())
                .collect(Collectors.toList());
        String errorMessage = errorMessages.stream().collect(Collectors.joining(", "));

        return ResponseEntity.badRequest().body(errorMessage);
    }
}

```

- `@Valid` 어노테이션이 붙은 파라미터 객체는 스프링 MVC에서 요청 처리를 시작하기 전에 검증이 수행됩니다. 검증 실패 시, `BindingResult` 객체에 검증 결과가 담긴다고 생각하시면 됩니다. 그래서 bindingResult 에서 FieldError 를 뽑아내게 됩니다. 
- 에러는 여러 개일 수 있습니다. (ID 도 검증에 걸리고 Email 도 걸리고...) 따라서 에러를 String List 형태로 변환한 후 `String errorMessages`  로 받아서 한줄로 만들어주겠습니다. 
- 그리고 badRequest 와 함께 반환합니다. 그러면 front 에서 alert 창으로 errorMessage 를 띄웁니다.



### MemberRequestDto

필요한 코드만 들고 왔습니다. builder 생성자나 oneToMany 는 지금은 필요없습니다.

```java
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberRequestDto {
    
    private String memberId;
    private String email;
    private String password;
    private String name;
    private String nickname;
}
```

**email **

- 공백미허용, email 형식 적용

  - Spring 에서는 @Email 만 적용하면 OK 입니다.

- 최종 어노테이션  

  - ```java
    @Email(message="이메일 형식을 확인해주세요.")
    private String email;
    ```

    

**memberId**

- 글자수 4~20/소문자필수, 숫자선택, UQ, NN

  - 어차피 Unique 는 서비스계층에서 처리하게 되니 여기선 빼줍시다.
  - NN 은 @NotBlank 로 처리해줍니다. 공백도 되면 안되니깐요.
  - 소문자 필수, 숫자 선택 : `regexp = "^[a-z]+\\d*$"` (이거 끝나고 정규식 공부를 좀 해야겠습니다. GPT 가 만들어줘도 교차검증이 안되네요.)
  - 글자수 4~20 : @Size(min = 4, max = 20)

- 최종 어노테이션

  - ```java
    @NotBlank(message = "ID 를 입력해주세요.")
    @Pattern(regexp = "^[a-z]+\\d*$", message = "4~20글자의 소문자, 숫자로 구성해주세요.")
    @Size(min = 4, max = 20, message = "4~20글자의 소문자, 숫자로 구성해주세요.")
    private String memberId;
    ```

  - 메세지는 @Pattern 과 @Size 는 통일했습니다. 구구절절 구분해도 이상할거같아서요.

- 





작성중입니다... Ing

링크걸려고 미리 올렸습니다.
