---
categories: "learning"
---

# 0. Bean Validation - 시작

- `implementation 'org.springframework.boot:spring-boot-starter-validation'` 추가

## Bean Validation 적용 (Item)

- 주석 참고

- ```java
  package hello.itemservice.domain.item;
  
  import lombok.Data;
  import org.hibernate.validator.constraints.Range;
  import javax.validation.constraints.NotBlank;
  import javax.validation.constraints.NotNull;
  
  @Data
  public class Item {
  
      private Long id;
  
      //공백, 빈값 안됨
      //모든 beanValidation 에 message 속성 가능 (오류 시 message)
      @NotBlank(message = "공백 안됨")
      private String itemName;
  
      //null 허용 안됨
      @NotNull
      //범위
      @Range(min = 1000, max = 1000000)
      private Integer price;
  
      @NotNull
      @Range(max = 9999)
      private Integer quantity;
  
      public Item() {
      }
  
      public Item(String itemName, Integer price, Integer quantity) {
          this.itemName = itemName;
          this.price = price;
          this.quantity = quantity;
      }
  }
  ```

## BeanValidationTest - Bean Validation 테스트 코드 작성

- ```java
  package hello.itemservice.validation;
  
  import hello.itemservice.domain.item.Item;
  import org.junit.jupiter.api.Test;
  
  import javax.validation.ConstraintViolation;
  import javax.validation.Validation;
  import javax.validation.Validator;
  import javax.validation.ValidatorFactory;
  import java.util.Set;
  
  public class ValidationTest {
      
      @Test
      void beanValidation(){
          //검증기 생성
          ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
          Validator validator = factory.getValidator();
          
          Item item = new Item();
          item.setItemName(" ");
          item.setPrice(0);
          item.setQuantity(10000);
  
          Set<ConstraintViolation<Item>> violations = validator.validate(item);
          for (ConstraintViolation<Item> violation : violations) {
              System.out.println("violation = " + violation);
              System.out.println("violation.getMessage() = " + violation.getMessage());
          }
      }
  }
  
  ```

### 검증

#### 검증기 생성

- ```java
  ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
      Validator validator = factory.getValidator();
  ```

-  스프링과 통합하면 작성할 일 없다.

#### 검증 실행

- 검증 대상( item )을 직접 검증기에 넣고 그 결과를 받는다. Set 에는 ConstraintViolation 이라는 검증 오류가 담긴다. 따라서 결과가 비어있으면 검증 오류가 없는 것이다.
- `Set> violations = validator.validate(item);`

#### 결과

```
violation = ConstraintViolationImpl{interpolatedMessage='0에서 9999 사이여야 합니다', propertyPath=quantity, rootBeanClass=class hello.itemservice.domain.item.Item, messageTemplate='{org.hibernate.validator.constraints.Range.message}'}
violation.getMessage() = 0에서 9999 사이여야 합니다
violation = ConstraintViolationImpl{interpolatedMessage='공백일 수 없습니다', propertyPath=itemName, rootBeanClass=class hello.itemservice.domain.item.Item, messageTemplate='{javax.validation.constraints.NotBlank.message}'}
violation.getMessage() = 공백일 수 없습니다
violation = ConstraintViolationImpl{interpolatedMessage='1000에서 1000000 사이여야 합니다', propertyPath=price, rootBeanClass=class hello.itemservice.domain.item.Item, messageTemplate='{org.hibernate.validator.constraints.Range.message}'}
violation.getMessage() = 1000에서 1000000 사이여야 합니다
```

# 1. Bean Validation - 스프링 적용

- 기존의 `private final ItemValidator itemValidator;` 과 @InitBinder 제거
  - -> 바로 적용된다!

## 스프링 MVC는 어떻게 Bean Validator를 사용하는 걸까?

- **스프링 부트는 자동으로 글로벌 Validator로 등록한다!**
- LocalValidatorFactoryBean 을 글로벌 Validator로 등록한다.
- 이 Validator는 @NotNull 같은 애노테이션을 보고 검증을 수행한다. 이렇게 글로벌 Validator가 적용되어 있기 때문에, @Valid , @Validated 만 적용하면 된다.
- 검증 오류가 발생하면, FieldError , ObjectError 를 생성해서 BindingResult 에 담아준다.

*글로벌 Validator를 직접 등록하면 스프링 부트는 Bean Validator를 글로벌 Validator 로 등록하지 않는다.*

## 검증 순서

1. @ModelAttribute 각각의 필드에 타입 변환 시도
   1. 성공하면 Validator 적용
   2. 실패하면 typeMismatch 로 FieldError 추가
      - 이 때 직접 설정한 `typeMismatch.java.lang.Integer=숫자를 입력해주세요.` 같은 게 뜬다.

## 바인딩에 성공한 필드만 Bean Validation 적용

- BeanValidator는 바인딩에 실패한 필드는 BeanValidation을 적용하지 않는다.

- 타입 변환에 성공해서 바인딩에 성공한 필드여야 BeanValidation 적용이 의미 있다.

  *@ModelAttribute -> 각각의 필드 타입 변환시도 -> 변환에 성공한 필드만 BeanValidation 적용*

### 예시

- itemName 에 문자 "A" 입력 -> 타입 변환 성공 -> itemName 필드에 BeanValidation 적용
- price 에 문자 "A" 입력 -> "A"를 숫자 타입 변환 시도 실패 -> typeMismatch FieldError 추가 ->price 필드는 BeanValidation 적용 X
  - `typeMismatch.java.lang.Integer=` 적용..

# 2. Bean Validation - 에러 코드

- Bean Validation이 기본으로 제공하는 오류 메시지를 좀 더 자세히 변경할 수 있다.
- Bean Validation을 적용하고 bindingResult 에 등록된 검증 오류 코드를 보자.
- ex) itemName 검증 오류
  - `Field error in object 'item' on field 'itemName': rejected value []; codes [NotBlank.item.itemName,NotBlank.itemName,NotBlank.java.lang.String,NotBlank]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [item.itemName,itemName]; arguments []; default message [itemName]]; default message [공백일 수 없습니다]`
- 자세히 보면, codes 는 NotBlank.item.itemName 과 같이 오류코드가 어노테이션 이름으로 등록된다.

## 에러 코드 상세

- **NotBlank 라는 오류 코드를 기반으로 MessageCodesResolver 를 통해 다양한 메시지 코드가 순서대로 생성된다.**
- @NotBlank : [NotBlank.item.itemName, NotBlank.itemName, NotBlank.java.lang.String, NotBlank]
- @Range : [Range.item.price, Range.price, Range.java.lang.Integer, Range]

## errors.properties 에 메세지 등록

- ```properties
  #Bean Validation 추가
  NotBlank={0} 공백X
  Range={0}, {2} ~ {1} 허용
  Max={0}, 최대 {1}
  ```

  - {0} 은 필드명이고, {1} , {2} ...은 각 애노테이션 마다 다르다.

## BeanValidation 메시지 찾는 순서

1. 생성된 메시지 코드 순서대로 messageSource 에서 메시지 찾기 (properties)
2. 애노테이션의 message 속성 사용 @NotBlank(message = "공백! {0}")
3. . 라이브러리가 제공하는 기본 값 사용 : "공백일 수 없습니다."

# 3. Bean Validation - 오브젝트 오류

###  @ScriptAssert() 

- Bean Validation에서 특정 필드( FieldError )가 아닌 해당 오브젝트 관련 오류( ObjectError )는 @ScriptAssert() 를 사용하면 된다.

- ```java
  @Data
  @ScriptAssert(lang = "javascript", script = "_this.price * _this.quantity >= 10000", message = "총합이 10000원 넘게 입력해주세요.")
  public class Item {
  ```

  - 그런데 실제 사용해보면 제약이 많고 복잡하다. 그리고 실무에서는 검증 기능이 해당 객체의 범위를 넘어서는 경우들도 종종 등장하는데, 그런 경우 대응이 어렵다.
  - 따라서 오브젝트 오류(글로벌 오류)의 경우 @ScriptAssert 을 억지로 사용하는 것 보다는 다음과 같이 오브젝트 오류 관련 부분만 직접 자바 코드로 작성하는 것을 권장한다

### ValidationItemControllerV3 - 글로벌 오류 추가

- ValidationItemControllerV2 까지 계속 썼던 검증방법이다. 

- ```java
  @PostMapping("/add")
  public String addItem(@Validated @ModelAttribute Item item, BindingResult bindingResult, RedirectAttributes redirectAttributes, Model model) {
      //특정 필드 예외가 아닌 전체 예외
      if (item.getPrice() != null && item.getQuantity() != null) {
          int resultPrice = item.getPrice() * item.getQuantity();
          if (resultPrice < 10000) {
              bindingResult.reject("totalPriceMin", new Object[]{10000,
                      resultPrice}, null);
          }
      }
  ```

  - @ScriptAssert 부분은 제거한다.

# 4. Bean Validation - 수정에 적용

## ValidationItemControllerV3 - edit() 변경

- ```java
  @PostMapping("/{itemId}/edit")
  //1, 2
  public String edit(@PathVariable Long itemId,
                     @Validated @ModelAttribute Item item,
                     BindingResult bindingResult) {
  
      //3
      if (item.getPrice() != null && item.getQuantity() != null) {
          int resultPrice = item.getPrice() * item.getQuantity();
          if (resultPrice < 10000) {
              bindingResult.reject("totalPriceMin", new Object[]{10000,
                      resultPrice}, null);
          }
      }
  
      //4
      if(bindingResult.hasErrors()){
          log.info("errors code = {}", bindingResult);
          return "validation/v3/editForm";
      }
  
      itemRepository.update(itemId, item);
      return "redirect:/validation/v3/items/{itemId}";
  }
  ```

  - 주석 넘버링 기준

  1. Item 모델 객체에 @Validated 를 추가
  2. BindingResult bindingResult 매개변수 추가
  3. object 오류검증 추가
  4. 검증 오류 발생 시 editForm 으로 이동하는 코드 추가

## validation/v3/editForm.html 변경

- addForm 과 똑같이 변경하면 된다.

# 5. Bean Validation - 한계 및 Group 적용

- 데이터를 등록할 때와 수정할 때는 요구사항이 다를 수 있다.
- 이를 해결하기 위한 방법 2가지
  1. BeanValidation의 groups 기능을 사용한다.
  2. tem을 직접 사용하지 않고, ItemSaveForm, ItemUpdateForm 같은 폼 전송을 위한 별도의 모델 객체를 만들어서 사용한다.

## BeanValidation groups 기능 사용

### 저장용/수정용 groups 생성

- ```java
  package hello.itemservice.domain.item;
  
  public interface UpdateCheck {}
  ```

- ```java
  package hello.itemservice.domain.item;
  
  public interface SaveCheck {}
  ```

### Item - groups 적용

- ```java
  public class Item {
  
      @NotNull(groups = UpdateCheck.class)
      private Long id;
  
      @NotBlank(groups = {SaveCheck.class, UpdateCheck.class})
      private String itemName;
  
      @NotNull(groups = {SaveCheck.class, UpdateCheck.class})
      @Range(min = 1000, max = 1000000)
      private Integer price;
  
      @NotNull(groups = {SaveCheck.class, UpdateCheck.class})
      @Max(value = 9999, groups = {SaveCheck.class})
      private Integer quantity;
  ```

  - 각 Validation 어노테이션마다 어느 클래스에 속하는지 지정한다.

### ValidationItemControllerV3 - 저장 로직에 SaveCheck Groups 적용

- ```java
  @PostMapping("/add")
  public String addItemV2(@Validated(SaveCheck.class) @ModelAttribute Item item, BindingResult bindingResult, RedirectAttributes redirectAttributes, Model model) {
          ...
          }
  ```

  - @Validated 속성으로 (value = "SaveCheck.class") 로 넣는다. value 는 생략할 수 있다.
  - 업데이트 로직도 동일하다.

### group 기능 한계

- groups 기능을 사용하니 Item 은 물론이고, 전반적으로 복잡도가 올라갔다.
- 사실 groups 기능은 실제 잘 사용되지는 않는데, 

*그 이유는 실무에서는 주로 다음에 등장하는 등록용 폼 객체와 수정용 폼 객체를 분리해서 사용하기 때문이다.*

# 6. Form 전송 객체 분리

## 분리하는 이유

- 등록시 폼에서 전달하는 데이터가 Item 도메인 객체와 딱 맞지 않기 때문이다.
- 실무에서는 회원 등록시 회원과 관련된 데이터만 전달받는 것이 아니라, 약관 정보도 추가로 받는 등 Item 과 관계없는 수 많은 부가 데이터가 넘어온다. (약관 동의 여부, 아이디, 주민번호 등등..)
- 래서 보통 Item 을 직접 전달받는 것이 아니라, 복잡한 폼의 데이터를 컨트롤러까지 전달할 별도의 객체를 만들어서 전달한다.

### 데이터 전달을 위한 별도의 객체 사용

- HTML Form -> ItemSaveForm -> Controller -> Item 생성 -> Repository
  - 장점: 전송하는 폼 데이터가 복잡해도 거기에 맞춘 별도의 폼 객체를 사용해서 데이터를 전달 받을 수 있다. 보통 등록과, 수정용으로 별도의 폼 객체를 만들기 때문에 검증이 중복되지 않는다. 
  - 단점: 폼 데이터를 기반으로 컨트롤러에서 Item 객체를 생성하는 변환 과정이 추가된다.

- 수정의 경우 등록과 수정은 완전히 다른 데이터가 넘어온다. 따라서 ItemUpdateForm 이라는 별도의 객체로 데이터를 전달받는 것이 좋다.

## Form 전송 객체 분리 - 개발

### ITEM 원복

- 이제 Item 의 검증은 사용하지 않으므로 검증 코드를 제거해도 된다.

- ```java
  @Data
  public class Item {
      private Long id;
      private String itemName;
      private Integer price;
      private Integer quantity;
  }
  ```

### ItemSaveForm - ITEM 저장용 폼

- ```java
  package hello.itemservice.web.validation.form;
  
  import lombok.Data;
  import org.hibernate.validator.constraints.Range;
  
  import javax.validation.constraints.Max;
  import javax.validation.constraints.NotBlank;
  import javax.validation.constraints.NotNull;
  @Data
  public class ItemSaveForm {
  
      @NotBlank
      private String itemName;
  
      @NotNull
      @Range(min = 1000, max = 1000000)
      private Integer price;
  
      @NotNull
      @Max(value = 9999)
      private Integer quantity;
  }
  ```

### ItemUpdateForm - ITEM 수정용 폼

- ```java
  package hello.itemservice.web.validation.form;
  
  import lombok.Data;
  import org.hibernate.validator.constraints.Range;
  
  import javax.validation.constraints.Max;
  import javax.validation.constraints.NotBlank;
  import javax.validation.constraints.NotNull;
  
  @Data
  public class ItemUpdateForm {
  
      @NotNull
      private Long id;
  
      @NotBlank
      private String itemName;
  
      @NotNull
      @Range(min = 1000, max = 1000000)
      private Integer price;
  
      //수정에서는 자유롭게 변경가능
      private Integer quantity;
  }
  
  ```

### ValidationItemControllerV4

#### add

- ```java
  @PostMapping("/add")
  public String addItem(@Validated @ModelAttribute("item") ItemSaveForm form,
                        BindingResult bindingResult,
                        RedirectAttributes redirectAttributes,
                        Model model) {
      //특정 필드 예외가 아닌 전체 예외
      if (form.getPrice() != null && form.getQuantity() != null) {
          int resultPrice = form.getPrice() * form.getQuantity();
          if (resultPrice < 10000) {
              bindingResult.reject("totalPriceMin", new Object[]{10000,
                      resultPrice}, null);
          }
      }
  
      if(bindingResult.hasErrors()){
          log.info("errors code = {}", bindingResult);
          //자동으로 view 에 넘어감
          return "validation/v4/addForm";
      }
  
      //성공 로직
      Item item = new Item();
      item.setItemName(form.getItemName());
      item.setPrice(form.getPrice());
      item.setQuantity(form.getQuantity());
  
      Item savedItem = itemRepository.save(item);
      redirectAttributes.addAttribute("itemId", savedItem.getId());
      redirectAttributes.addAttribute("status", true);
      return "redirect:/validation/v4/items/{itemId}";
  }
  ```

1. @ModelAttribute 로 ItemSaveForm 을 받는다. 
   - 이때 기본으로 넘어가는 Model.addattribute 의 첫번째 매개변수 string 값이 "itemSaveForm" 이므로 thymeleaf 템플릿을 모두 고치기 싫다면 `@ModelAttribute("item") ItemSaveForm form` 이렇게 고친다.
2. "item" 은 모두 "form" 으로 바꿔준다. 하지만 `itemRepository.save(item)` 는 Item 클래스가 들어가야한다.
3. 따라서 `Item item = new Item();` 을 선언해준다음에 form 에서 get 으로 모두 꺼내서 넣어준 후 repository 에 반환해준다.

#### edit

- add 와 똑같다!

# 7. Bean Validation - HTTP 메시지 컨버터

- @Valid , @Validated 는 HttpMessageConverter ( @RequestBody )에도 적용할 수 있다.

*@RequestBody 는 HTTP Body의 데이터를 객체로 변환할 때 사용한다. 주로 API JSON 요청을 다룰 때 사용한다.*

## ValidationItemApiController 생성

- ```java
  package hello.itemservice.web.validation;
  
  @Slf4j
  @RestController
  @RequestMapping("/validation/api/items")
  public class ValidationItemApiController {
      @PostMapping("/add")
      public Object addItem(@RequestBody @Validated ItemSaveForm form,
                            BindingResult bindingResult){
          log.info("API 컨트롤러 호출");
  //객체가 바껴야 호출할 수 있는데 객체 바꾸는데 실패함 제이슨이 하나의 덩어리기 때문에
          //따라서 컨트롤러 자체가 호출이 안된다
          if(bindingResult.hasErrors()){
              log.info("검증 오류 발생 error = {}", bindingResult);
              return bindingResult.getAllErrors();
          }
  
          log.info("성공 로직 실행");
          return form;
      }
  }
  
  ```

- @RequestBody 에도 @Validated 를 붙일 수 있다.
- 이러면 BindingResult 도 호출해서 매개변수로 넘겨야 한다.

## Postman을 사용해서 테스트

### API의 경우 3가지 경우를 나누어 생각해야 한다.

- 성공 요청: 성공 
- 실패 요청: JSON을 객체로 생성하는 것 자체가 실패함 
- 검증 오류 요청: JSON을 객체로 생성하는 것은 성공했고, 검증에서 실패함

### 성공 요청

- `{"itemName":"hello", "price":1000, "quantity": 10}`

   -> form 데이터를 그대로 반환

### 실패 요청

- `{"itemName":"hello", "price":"A", "quantity": 10}`

- 실패 요청 body 값

  - ```json
    {
     "timestamp": "2021-04-20T00:00:00.000+00:00",
     "status": 400,
     "error": "Bad Request",
     "message": "",
     "path": "/validation/api/items/add"
    }
    ```

- HttpMessageConverter 에서 요청 JSON을 ItemSaveForm 객체로 생성하는데 실패한다.

  - **JSON 은 한덩어리기 때문에!!**

- 이 경우는 ItemSaveForm 객체를 만들지 못하기 때문에 **컨트롤러 자체가 호출되지 않고** 그 전에 예외가 발생한다. 

- 물론 Validator도 실행되지 않는다. 

## 검증 오류 요청

- HttpMessageConverter 는 성공하지만 검증(Validator)에서 오류가 발생하는 경우

- `{"itemName":"hello", "price":1000, "quantity": 10000}`

- 검증 오류 요청 body 값

  - ```json
    [
        {
            "codes": [
                "Max.itemSaveForm.quantity",
                "Max.quantity",
                "Max.java.lang.Integer",
                "Max"
            ],
            "arguments": [
                {
                    "codes": [
                        "itemSaveForm.quantity",
                        "quantity"
                    ],
                    "arguments": null,
                    "defaultMessage": "quantity",
                    "code": "quantity"
                },
                9999
            ],
            "defaultMessage": "9999 이하여야 합니다",
            "objectName": "itemSaveForm",
            "field": "quantity",
            "rejectedValue": 10000,
            "bindingFailure": false,
            "code": "Max"
        }
    ]
    ```

- return bindingResult.getAllErrors(); 는 ObjectError 와 FieldError 를 반환한다.

- 스프링이 이 객체를 JSON으로 변환해서 클라이언트에 전달했다. 

*여기서는 예시로 보여주기 위해서 검증 오류 객체들을 그대로 반환했다. 실제 개발할 때는 이 객체들을 그대로 사용하지 말고, 필요한 데이터만 뽑아서 별도의 API 스펙을 정의하고 그에 맞는 객체를 만들어서 반환해야 한다.*

## @ModelAttribute vs @RequestBody

- HTTP 요청 파리미터를 처리하는 @ModelAttribute 는 각각의 필드 단위로 세밀하게 적용된다. 그래서 특정 필드에 타입이 맞지 않는 오류가 발생해도 나머지 필드는 정상 처리할 수 있었다.
  - @ModelAttribute 는 필드 단위로 정교하게 바인딩이 적용된다. 특정 필드가 바인딩 되지 않아도 나머지 필드는 정상 바인딩 되고, Validator를 사용한 검증도 적용할 수 있다.
- HttpMessageConverter 는 @ModelAttribute 와 다르게 각각의 필드 단위로 적용되는 것이 아니라, 전체 객체 단위로 적용된다.
  - @RequestBody 는 HttpMessageConverter 단계에서 JSON 데이터를 객체로 변경하지 못하면 이후 단계 자체가 진행되지 않고 예외가 발생한다. 컨트롤러도 호출되지 않고, Validator도 적용할 수 없다.

- HttpMessageConverter 단계에서 실패하면 예외가 발생한다. 예외 발생시 원하는 모양으로 예외를 처리하는 방법은 예외 처리 부분에서 다룬다.