# 0. 요구사항 정리

## 요구사항

- 요구사항: 검증 로직 추가 
- 타입 검증 
  - 가격, 수량에 문자가 들어가면 검증 오류 처리 
- 필드 검증 
  - 상품명: 필수, 공백X 
  - 가격: 1000원 이상, 1백만원 이하 
  - 수량: 최대 9999 
- 특정 필드의 범위를 넘어서는 검증 
  - 가격 * 수량의 합은 10,000원 이상

## 검증

- 지금까지 만든 웹 애플리케이션은 폼 입력시 숫자를 문자로 작성하거나해서 검증 오류가 발생하면 오류 화면으로 바로 이동한다. 
- 이렇게 되면 사용자는 처음부터 해당 폼으로 다시 이동해서 입력을 해야 한다. 
- 아마도 이런 서비스라면 사용자는 금방 떠나버릴 것이다. 
- 웹 서비스는 폼 입력시 오류가 발생하면, 고객이 입력한 데이터를 유지한 상태로 어떤 오류가 발생했는지 친절하게 알려주어야 한다. 
- 컨트롤러의 중요한 역할중 하나는 HTTP 요청이 정상인지 검증하는 것이다. 

## 클라이언트 검증, 서버 검증

- 클라이언트 검증은 조작할 수 있으므로 보안에 취약하다. 
- 서버만으로 검증하면, 즉각적인 고객 사용성이 부족해진다. 
- 둘을 적절히 섞어서 사용하되, 최종적으로 서버 검증은 필수 
- API 방식을 사용하면 API 스펙을 잘 정의해서 검증 오류를 API 응답 결과에 잘 남겨주어야 함

# 1. 검증 직접 처리 - 소개

## 상품 저장 성공

- ![image-20230313230355110](../images/2023-03-13-spring MVC2(3) 검증1 - Validation/image-20230313230355110.png)

## 상품 저장 검증 실패

- ![image-20230313230445514](../images/2023-03-13-spring MVC2(3) 검증1 - Validation/image-20230313230445514.png)

- 검증 오류가 발생하면, 고객에게 다시 상품 등록 폼을 보여주고, 어떤 값을 잘못 입력했는지 친절하게 알려주어야 한다.
- model 에 검증 오류 결과를 포함해서 상품등록 폼(addForm.html) 을 다시 렌더링 해야 한다.

# 2. 검증 직접 처리 - 개발

## ValidationItemControllerV1 - addItem() 수정

- 검증 로직 추가 (주석 참고)

- ```java
      @PostMapping("/add")
      public String addItem(@ModelAttribute Item item, RedirectAttributes redirectAttributes, Model model) {
  
      //검증 오류 결과를 보관
      Map<String, String> errors = new HashMap<>();
  
      //검증 로직
      //item.getItemName() 에 text 가 없으면 errors 에 담아둔다.
      if (!StringUtils.hasText(item.getItemName())) {
          errors.put("itemName", "상품 이름은 필수입니다.");
      }
      //price 범위 설정 후 error 보관
      if (item.getPrice() == null || item.getPrice() < 1000 || item.getPrice() > 1000000){
          errors.put("price", "가격은 1,000 ~ 1,000,000 까지 허용합니다.");
      }
      //quantity 범위 설정 후 error 보관
      if(item.getQuantity() == null || item.getQuantity() >= 9999){
          errors.put("quantity", "수량은 최대 9,999 까지 허용합니다.");
      }
  
      //특정 필드가 아닌 복합 룰 검증
      if(item.getPrice() != null && item.getQuantity() != null){
          int resultPrice = item.getPrice() * item.getQuantity();
          if(resultPrice < 10000){
              errors.put("globalError", "가격 * 수량의 합은 10,000원 이상이어야 합니다. 현재 값 = " + resultPrice);
          }
      }
  
      //검증에 실패하면 다시 입력 폼으로
      if(!errors.isEmpty()){
          log.info("errors code = {}", errors.values());
          //model 에 attribute 로 담는다.
          model.addAttribute("errors", errors);
          return "validation/v1/addForm";
      }
  
      //성공 로직
      Item savedItem = itemRepository.save(item);
      redirectAttributes.addAttribute("itemId", savedItem.getId());
      redirectAttributes.addAttribute("status", true);
      return "redirect:/validation/v1/items/{itemId}";
  }
  ```

### 검증 오류 보관

- `Map errors = new HashMap<>();`
- 만약 검증시 오류가 발생하면 어떤 검증에서 오류가 발생했는지 정보를 담아둔다.

## addForm.html

- ```html
  <!DOCTYPE HTML>
  <html xmlns:th="http://www.thymeleaf.org">
  <head>
      <meta charset="utf-8">
      <link th:href="@{/css/bootstrap.min.css}"
            href="../css/bootstrap.min.css" rel="stylesheet">
      <style>
          .container {
              max-width: 560px;
          }
          .field-error {
               border-color: #dc3545;
               color: #dc3545;
          }
      </style>
  </head>
  <body>
  
  <div class="container">
  
      <div class="py-5 text-center">
          <h2 th:text="#{page.addItem}">상품 등록</h2>
      </div>
  
      <form action="item.html" th:action th:object="${item}" method="post">
          <div th:if="${errors?.containsKey('globalError')}">
              <p class="field-error" th:text="${errors['globalError']}">전체 오류 메세지</p>
          </div>
          <div>
              <label for="itemName" th:text="#{label.item.itemName}">상품명</label>
              <input type="text" id="itemName" th:field="*{itemName}"
                     th:class="${errors?.containsKey('itemName')} ? 'form-control field-error' : 'form-control'"
                     class="form-control" placeholder="이름을 입력하세요">
              <div class="field-error" th:if="${errors?.containsKey('itemName')}" th:text="${errors['itemName']}">
                  상품명 오류
              </div>
          </div>
          <div>
              <label for="price" th:text="#{label.item.price}">가격</label>
              <input type="text" id="price" th:field="*{price}" class="form-control"
                     th:class="${errors?.containsKey('price')} ? 'form-control field-error' : 'form-control'"
                     placeholder="가격을 입력하세요">
          </div>
          <div class="field-error" th:if="${errors?.containsKey('price')}" th:text="${errors['price']}">
              가격 오류
          </div>
          <div>
              <label for="quantity" th:text="#{label.item.quantity}">수량</label>
              <input type="text" id="quantity" th:field="*{quantity}" class="form-control"
                     th:class="${errors?.containsKey('quantity')} ? 'form-control field-error' : 'form-control'"
                     placeholder="수량을 입력하세요">
          </div>
          <div class="field-error" th:if="${errors?.containsKey('quantity')}" th:text="${errors['quantity']}">
              수량 오류
          </div>
  
          <hr class="my-4">
  
          <div class="row">
              <div class="col">
                  <button class="w-100 btn btn-primary btn-lg" type="submit" th:text="#{button.save}">상품 등록</button>
              </div>
              <div class="col">
                  <button class="w-100 btn btn-secondary btn-lg"
                          onclick="location.href='items.html'"
                          th:onclick="|location.href='@{/validation/v1/items}'|"
                          type="button" th:text="#{button.cancel}">취소</button>
              </div>
          </div>
  
      </form>
  
  </div> <!-- /container -->
  </body>
  </html>
  ```

### css 추가

- ```css
  .field-error {
   border-color: #dc3545;
   color: #dc3545;
  }
  ```

  - 오류 메시지를 빨간색으로 강조하기 위해 추가했다.

### 글로벌 오류 메시지

- ```html
  <div th:if="${errors?.containsKey('globalError')}">
   <p class="field-error" th:text="${errors['globalError']}">전체 오류 메시지</p>
  </div>
  ```

  - if -> errors 에 key 로 globalError 가 있으면?
    - text = error['globalError '] (= `"가격 * 수량의 합은 10,000원 이상이어야 합니다. 현재 값 = " + resultPrice`)

#### Safe Navigation Operator

- 만약 여기에서 errors 가 null 이라면 어떻게 될까?
- 생각해보면 get 으로 등록폼에 진입한 시점에는 errors 가 없다.
- 따라서 errors.containsKey() 를 호출하는 순간 NullPointerException 이 발생한다.
- errors?. 은 errors 가 null 일때 NullPointerException 이 발생하는 대신, null 을 반환하는 문법이다.
- 이것은 스프링의 SpringEL이 제공하는 문법이다.

### 상품명, 가격, 수량 오류코드 (동일)

- ```html
  <input type="text" id="itemName" th:field="*{itemName}"
             th:class="${errors?.containsKey('itemName')} ? 'form-control field-error' : 'form-control'"
             class="form-control" placeholder="이름을 입력하세요">
  
  
  <div class="field-error" th:if="${errors?.containsKey('itemName')}" th:text="${errors['itemName']}">
      상품명 오류
  </div>
  ```

  - 먼저 input 을 보면, ${errors?.containsKey('itemName')} 가 있으면 `form-control field-error`, 없으면 `form-control` 로 한다.
  - 즉, errors 맵에 'itemName' 키가 있으면 `class="form-control field-error"`, 없으면 `class="form-control"`
  -  `<input type="text" th:classappend="${errors?.containsKey('itemName')} ? 'fielderror' : _"
     class="form-control">` 이렇게 classappend 를 사용해서 간단하게도 표현 가능하다.
  - 밑에 div 태그로 오류메시지를 출력한다.



# 3. BindingResult

## ValidationItemControllerV2 - addItemV1

- ```java
  @PostMapping("/add")
  
  		//1
      public String addItemV1(@ModelAttribute Item item, BindingResult bindingResult, RedirectAttributes redirectAttributes, Model model) {
  
          //2
          if (!StringUtils.hasText(item.getItemName())) {
              bindingResult.addError(new FieldError("item", "itemName", "상품 이름은 필수입니다."));
          }
          if (item.getPrice() == null || item.getPrice() < 1000 || item.getPrice() > 1000000){
              bindingResult.addError(new FieldError("item", "price", "가격은 1,000 ~ 1,000,000 까지 허용합니다."));
  
          }
          if(item.getQuantity() == null || item.getQuantity() >= 9999){
              bindingResult.addError(new FieldError("item", "quantity", "수량은 최대 9,999 까지 허용합니다."));
          }
  
          //3
          if(item.getPrice() != null && item.getQuantity() != null){
              int resultPrice = item.getPrice() * item.getQuantity();
              if(resultPrice < 10000){
                  bindingResult.addError(new ObjectError("item", "가격 * 수량의 합은 10,000원 이상이어야 합니다. 현재 값 = "  + resultPrice));
              }
          }
          
              //4
          if(bindingResult.hasErrors()){
              log.info("errors code = {}", bindingResult);
              return "validation/v2/addForm";
          }
  ```

### 설명

1. BindingResult bindingResult 를 무조건 `@ModelAttribute Item item` 뒤에 넣어준다. 그래야 Item 과 연동이 된다.
2. bindingResult.addError(new FieldError("objectName", "field", "defaultMessage"))) 로 bindingResult 에 오류메세지를 추가한다.
   - `void addError(ObjectError error)` 로, FieldError 는 ObjectError 를 상속받는다.
   - objectName(@ModelAttribute 이름) , field(오류가 발생한 필드 이름), defaultMessage(오류 기본 메시지) 를 생성자로 받는다.
3. bindingResult.addError(new ObjectError("objectName", "defaultMessage"))) 로 bindingResult 에 오류메세지를 추가한다.
   - objectName(@ModelAttribute 이름), defaultMessage(오류 기본 메시지) 를 생성자로 받는다.
   - ObjectError 는 지역변수 에러이기 때문에 hasGlobalError(), GlobalError() 등의 메서드를 사용한다.
4. `bindingResult.hasErrors() 를 통해 boolean 검증

## addForm.html 수정

- ```html
  
  <form action="item.html" th:action th:object="${item}" method="post">
      <div th:if="${#fields.hasGlobalErrors()}">
          <p class="field-error" th:each ="err : ${#fields.globalErrors()}" th:text="${err}">전체 오류 메세지</p>
      </div>
      <div>
          <label for="itemName" th:text="#{label.item.itemName}">상품명</label>
          <input type="text" id="itemName" th:field="*{itemName}"
                 th:errorclass="field-error" class="form-control" placeholder="이름을 입력하세요">
          <div class="field-error" th:errors="*{itemName}">
              상품명 오류
          </div>
  
      </div>
      <div>
          <label for="price" th:text="#{label.item.price}">가격</label>
          <input type="text" id="price" th:field="*{price}" th:errorclass="field-error"
                 class="form-control" placeholder="가격을 입력하세요">
      </div>
      <div class="field-error" th:errors="*{price}">
          가격 오류
      </div>
  
      <div>
          <label for="quantity" th:text="#{label.item.quantity}">수량</label>
          <input type="text" id="quantity" th:field="*{quantity}" th:errorclass="field-error"
                 class="form-control" placeholder="수량을 입력하세요">
      </div>
      <div class="field-error" th:errors="*{quantity}">
          수량 오류
      </div>
  
      <hr class="my-4">
  
      <div class="row">
          <div class="col">
              <button class="w-100 btn btn-primary btn-lg" type="submit" th:text="#{button.save}">상품 등록</button>
          </div>
          <div class="col">
              <button class="w-100 btn btn-secondary btn-lg"
                      onclick="location.href='items.html'"
                      th:onclick="|location.href='@{/validation/v2/items}'|"
                      type="button" th:text="#{button.cancel}">취소</button>
          </div>
      </div>
  
  </form>
  ```

  1. 전체
     1. `<div th:if="${#fields.hasGlobalErrors()}">` : 만약 fields 에 hasGlobalErrors() 가 참이면
        - -> ObjectError 가 있으면
     2. `th:each ="err : ${#fields.globalErrors()}" th:text="${err}"` 
        - `.globalErrors()` 메서드는 리스트를 반환한다.
        - err 가 여러 개일 수 있으므로 루프를 통해 text 로 반환한다.
  2. field 에러
     1. `th:field="*{itemName}" th:errorclass="field-error"`
        - th:errorclass 를 통해 new FieldError() 중 "itemName" 필드 이름을 가진 FieldError 가 있으면 클래스를 만든다.
        - `th:errorclass="field-error"`는 `th:class="${#fields.hadErrors('itemName')?:'field-error:_}"` 과 같다고 볼 수 있으며, 간단하게 표현한 것이다.
     2. `<div class="field-error" th:errors="*{quantity}">`
        - new FieldError() 중 "quantity" 필드 이름을 가진 FieldError 가 있으면 `<div class="field-error"` 태그와 클래스를 만든다.

## BindingResult 동작

- BindingResult 가 있으면 @ModelAttribute 에 데이터 바인딩 시 오류가 발생해도 컨트롤러가 호출된다!
- ![image-20230314133821943](../images/2023-03-13-spring MVC2(3) 검증1 - Validation/image-20230314133821943.png)
  - 스프링이 넘어온 오류를 new FieldError() 로 만들어서 자동으로 넘겨준다.

### BindingResult에 검증 오류를 적용하는 3가지 방법

1. @ModelAttribute 의 객체에 타입 오류 등으로 바인딩이 실패하는 경우 스프링이 `FieldError `생성해서 `BindingResult` 에 넣어준다. 
2. 개발자가 직접 넣어준다. (ValudationitemControllerV2 에서 설정한 방법)
3. Validator 사용 (어노테이션 사용)

### BindingResult와 Errors

- BindingResult 는 인터페이스이고, Errors 인터페이스를 상속받고 있다.
- 실제 넘어오는 구현체는 `BeanPropertyBindingResult` 라는 것인데, 둘다 구현하고 있으므로 BindingResult 대신에 Errors 를 사용해도 된다. 
- Errors 인터페이스는 단순한 오류 저장과 조회 기능을 제공한다.
- BindingResult 는 여기에 더해서 추가적인 기능들을 제공한다. `addError()` 도 BindingResult 가 제공하므로 여기서는 BindingResult 를 사용한다.

# 4. FieldError, ObjectError

- 클라이언트가 입력한 값이 error 가 나면 값이 사라진다.
- 이 부분을 해결하기 위해서 FieldError 의 다른 생성자를 사용한다.

## ValidationItemControllerV2 - addItemV2

- ```java
      @PostMapping("/add")
      public String addItemV2(@ModelAttribute Item item, BindingResult bindingResult, RedirectAttributes redirectAttributes, Model model) {
  
          if (!StringUtils.hasText(item.getItemName())) {
              bindingResult.addError(new FieldError("item", "itemName", item.getItemName(),
                      false, null, null, "상품 이름은 필수입니다."));
          }
          if (item.getPrice() == null || item.getPrice() < 1000 || item.getPrice() > 1000000){
              bindingResult.addError(new FieldError("item", "price", item.getPrice(),
                      false, null, null, "가격은 1,000 ~ 1,000,000 까지 허용합니다."));
  
          }
          if(item.getQuantity() == null || item.getQuantity() >= 9999){
              bindingResult.addError(new FieldError("item", "quantity", item.getQuantity(),
                      false, null, null, "수량은 최대 9,999 까지 허용합니다."));
          }
  
          if(item.getPrice() != null && item.getQuantity() != null){
              int resultPrice = item.getPrice() * item.getQuantity();
              if(resultPrice < 10000){
                  bindingResult.addError(new ObjectError("item",
                          null, null, "가격 * 수량의 합은 10,000원 이상이어야 합니다. 현재 값 = "  + resultPrice));
              }
          }
  
  ```

## FieldError 생성자

- ```java
  public FieldError(String objectName, String field, @Nullable Object rejectedValue, boolean bindingFailure,
          @Nullable String[] codes, @Nullable Object[] arguments, @Nullable String defaultMessage) {
  
      super(objectName, codes, arguments, defaultMessage);
      Assert.notNull(field, "Field must not be null");
      this.field = field;
      this.rejectedValue = rejectedValue;
      this.bindingFailure = bindingFailure;
  }
  ```

  - @Nullable Object rejectedValue, boolean bindingFailure, @Nullable String[] codes, @Nullable Object[] arguments 총 4개가 추가되었다.

- 파라미터 목록

  - objectName : 오류가 발생한 객체 이름 
  - field : 오류 필드 
  - rejectedValue : 사용자가 입력한 값(거절된 값) 
  - bindingFailure : 타입 오류 같은 바인딩 실패인지, 검증 실패인지 구분 값 
  - codes : 메시지 코드 
  - arguments : 메시지에서 사용하는 인자 
  - defaultMessage : 기본 오류 메시지

- ObjectError 는 여기서 objectName, codes, arguments, defaultMessage 를 매개변수로 하는 생성자가 있다.

  - ```java
    public ObjectError(
            String objectName, @Nullable String[] codes, @Nullable Object[] arguments, @Nullable String defaultMessage) {
    
        super(codes, arguments, defaultMessage);
        Assert.notNull(objectName, "Object name must not be null");
        this.objectName = objectName;
    }
    ```

## 오류 발생시 사용자 입력 값 유지

### rejectedValue 

- FieldError 에서 Object rejectedValue 변수에 사용자 입력 값을 별도로 보관한다.
- 이렇게 보관한 사용자 입력 값을 검증 오류 발생시 화면에 다시 출력하면 된다

### bindingFailure 

- 바인딩이 실패했는지 여부를 묻는 것이다. 타입오류는 바인딩실패는 아니므로 false 를 넣어준다.

## 타임리프의 사용자 입력 값 유지(addForm.html)

- `th:field="*{price}"` 는 정상 상황에는 모델 객체의 값을 사용하지만, 오류가 발생하면 `FieldError` 에서 보관한 값을 사용해서 값을 출력한다.

# 5. 오류 코드와 메시지 처리1 (FieldError 생성자 사용)

## FieldError 생성자 (codes, arguments)

- FieldError 생성자 중 codes 와 arguments 는 properties 에서 찾는다.

## errors 메시지 파일 생성(errors.properties )

### 스프링 부트 메시지 설정 추가

- `application.properties` 에 `spring.messages.basename=messages,errors` 추가

### errors.properties 

- ```properties
  required.item.itemName=상품 이름은 필수입니다.
  range.item.price=가격은 {0} ~ {1} 까지 허용합니다.
  max.item.quantity=수량은 최대 {0} 까지 허용합니다.
  totalPriceMin=가격 * 수량의 합은 {0}원 이상이어야 합니다. 현재 값 = {1}
  ```

  - errors_en.properties 파일을 생성하면 오류 메시지도 국제화 처리를 할 수 있다.

## ValidationItemControllerV2 - addItemV3() 추가

- ```java
  @PostMapping("/add")
  public String addItemV3(@ModelAttribute Item item, BindingResult bindingResult, RedirectAttributes redirectAttributes, Model model) {
  
      //검증 로직
      if (!StringUtils.hasText(item.getItemName())) {
          bindingResult.addError(new FieldError("item", "itemName", item.getItemName(),
                  false, new String[]{"required.item.itemName"}, null, null));
      }
      if (item.getPrice() == null || item.getPrice() < 1000 || item.getPrice() > 1000000){
          bindingResult.addError(new FieldError("item", "price", item.getPrice(),
                  false, new String[]{"range.item.price"}, new Object[]{1000, 1000000}, null));
  
      }
      if(item.getQuantity() == null || item.getQuantity() >= 9999){
          bindingResult.addError(new FieldError("item", "quantity", item.getQuantity(),
                  false, new String[]{"max.item.quantity"}, new Object[]{9999}, null));
      }
  
      //특정 필드가 아닌 복합 룰 검증
      if(item.getPrice() != null && item.getQuantity() != null){
          int resultPrice = item.getPrice() * item.getQuantity();
          if(resultPrice < 10000){
              bindingResult.addError(new ObjectError("item",
                      new String[]{"totalPriceMin"}, new Object[]{10000, resultPrice}, null));
          }
      }
  ```

### code 

- `new String[]{"range.item.price"}` 처럼 properties 의 키값을 사용해서 메시지 코드를 지정한다.
- 메시지 코드는 하나가 아니라 배열로 여러 값을 전달할 수 있는데, 순서대로 매칭해서 처음 매칭되는 메시지가 사용된다.
- 따라서 String 배열을 사용한다.
- 해당 부분은 에러 객체에 key를 문자열로 넘겨주는 과정입니다.\

#### 프로퍼티에 지정한 값을 어떻게 중괄호에서 바로 사용이 가능한건지? 

- 뷰가 렌더링 되는 과정에서 해당 에러 객체를 처리하게 되는데, 이때 에러가 발생하였다면 해당 에러와 관련된 메시지가 있는지 찾는다. 
- 이때, 내부에 만들어진 프로퍼티 파일(messages, errors)를 순회하며 이전에 저장해둔 key에 해당하는 부분이 있는지 확인 후 key의 value를 가져옵니다.
  - 즉, `spring.messages.basename=messages,errors` 기본 설정으로 messages, errors 를 다 찾아본다는 말!
  - 따라서 messages, errors 내 key 값이 겹치면 안될 듯

### aguments

- 매개변수로 `new Object[]` 를 사용한다.
- 따라서 properties 에 {0}, {1} 등이 있다면 new Object[]{"1000", "20000"} 처럼 넣어주면 된다.

# 6. 오류 코드와 메시지 처리2(rejectValue(), reject() 사용)

- 컨트롤러에서 BindingResult 는 검증해야 할 객체인 target 바로 다음에 온다. 따라서 BindingResult 는 이미 본인이 검증해야 할 객체인 target 을 알고 있다.
-  `bindingResult.getObjectName()` = "item" (String)
- `bindingResult.getTarget()` = `target=Item(id=null, itemName=상품, price=100, quantity=1234)` (Object)

## ValidationItemControllerV2 - addItemV4() 추가

- ```java
  @PostMapping("/add")
  public String addItemV4(@ModelAttribute Item item, BindingResult bindingResult, RedirectAttributes redirectAttributes, Model model) {
  
      //검증 로직
      if (!StringUtils.hasText(item.getItemName())) {
          bindingResult.rejectValue("itemName", "required");
  
      }
      if (item.getPrice() == null || item.getPrice() < 1000 || item.getPrice() > 1000000){
          bindingResult.rejectValue("price", "range", new Object[]{1000, 1000000}, null);
      }
      if(item.getQuantity() == null || item.getQuantity() >= 9999){
          bindingResult.rejectValue("quantity", "max", new Object[]{9999}, null);
      }
  
      //특정 필드가 아닌 복합 룰 검증
      if(item.getPrice() != null && item.getQuantity() != null){
          int resultPrice = item.getPrice() * item.getQuantity();
          if(resultPrice < 10000){
              bindingResult.reject("totalPriceMin",
                      new Object[]{10000, resultPrice}, null);
          }
      }
  
      //검증에 실패하면 다시 입력 폼으로
      if(bindingResult.hasErrors()){
          log.info("errors code = {}", bindingResult);
          //자동으로 view 에 넘어감
          return "validation/v2/addForm";
      }
  
      //성공 로직
      Item savedItem = itemRepository.save(item);
      redirectAttributes.addAttribute("itemId", savedItem.getId());
      redirectAttributes.addAttribute("status", true);
      return "redirect:/validation/v2/items/{itemId}";
  }
  ```

### rejectValue()

- ```java
  void rejectValue(@Nullable String field, String errorCode, @Nullable Object[] errorArgs, @Nullable String defaultMessage);
  ```

  - field : 오류 필드명 
  - errorCode : 오류 코드(이 오류 코드는 메시지에 등록된 코드가 아니다. 뒤에서 설명할 messageResolver를 위한 오류 코드이다.) 
  - errorArgs : 오류 메시지에서 {0} 을 치환하기 위한 값 
  - defaultMessage : 오류 메시지를 찾을 수 없을 때 사용하는 기본 메시지

### rejectValue() 예시

- `bindingResult.rejectValue("price", "range", new Object[]{1000, 1000000}, null)`
- BindingResult 는 어떤 객체를 대상으로 하는지 알고 있으므로 객체 생략 ("item" 생략)
- 축약된 오류코드 : 오류 코드를 range 로 간단하게 입력한다. (뒤에 item.price 생략)
- errorArgs 와 defaultMessage 는 똑같다.

### reject()

- ```java
  void reject(String errorCode, @Nullable Object[] errorArgs, @Nullable String defaultMessage);
  ```

- 앞의 내용과 같다.

# 7. 오류 코드와 메시지 처리3, 4(MessageCodesResolver)

## 오류 코드 처리 범위

- 오류코드를 만들 때 자세히 만들 수도 있고(`required.item.itemName: 상품 이름은 필수 입니다.`), 또는 단순하게 만들 수도 있다.(`required : 필수 값 입니다.`)

- 단순하게 만들면 범용성이 좋아서 여러곳에서 사용할 수 있지만, 메시지를 세밀하게 작성하기 어렵다. 반대로 너무 자세하게 만들면 범용성이 떨어진다

- 가장 좋은 방법은 범용성으로 사용하다가, 세밀하게 작성해야 하는 경우에는 세밀한 내용이 적용되도록 메시지에 단계를 두는 방법이다.

- ```properties
  #Level1
  required.item.itemName=상품 이름은 필수 입니다.
  #Level2
  required=필수 값 입니다.
  ```

  - rejectValue() 에서 String code 값이 required 일 때
  - required.item.itemName 와 같이 객체명과 필드명을 조합한 세밀한 메시지 코드가 있고 이 조건을 만족한다면(Item 객체에 itemName 필드이면) 이 메시지를 높은 우선순위로 사용하는 것이다.
  - 그렇지 않으면 `required=필수 값 입니다.` 를 사용한다.

## MessageCodesResolverTest

- ```java
  package hello.itemservice.validation;
  
  import org.assertj.core.api.Assertions;
  import org.junit.jupiter.api.Test;
  import org.springframework.validation.DefaultMessageCodesResolver;
  import org.springframework.validation.FieldError;
  import org.springframework.validation.MessageCodesResolver;
  import org.springframework.validation.ObjectError;
  
  import static org.assertj.core.api.Assertions.*;
  
  public class MessageCodesResolverTest {
  
      MessageCodesResolver codesResolver = new DefaultMessageCodesResolver();
  
      @Test
      void messageCodesResolverObject(){
          String[] messageCodes = codesResolver.resolveMessageCodes("required", "item");
          assertThat(messageCodes).containsExactly("required.item", "required");
      }
  
      @Test
      void messageCodesResolverField(){
          String[] messageCodes = codesResolver.resolveMessageCodes("required", "item", "itemName", String.class);
          for (String messageCode : messageCodes) {
              System.out.println("messageCode = " + messageCode);
          }
          assertThat(messageCodes).containsExactly(
                  "required.item.itemName",
                  "required.itemName",
                  "required.java.lang.String",
                  "required");
      }
  }
  ```

  - MessageCodesResolver 인터페이스이고 DefaultMessageCodesResolver 는 기본 구현체이다.

### .contains vs .containExactly

- contains 메소드는 단순하다. 중복여부, 순서에 관계 없이 값만 일치하면 테스트가 성공한다.
- containsExactly 는 원소가 정확히 일치해야 한다. 중복된 값이 있어도 안되고 순서가 달라져도 안된다. 특정 자료구조의 정확한 값을 테스트 하고 싶은 경우에는 이 메소드를 사용할 수 있다.

### Test 1

- `codesResolver.resolveMessageCodes("required", "item");` 를 매개변수로 준다.
  - required 는 매개변수로 원래 줬고, "item" 은 getObjectName() 으로 얻는다.
- messageCodes 로 `"required.item", "required"` 를 Sting[] 으로 받는다.

### Test 2

- `codesResolver.resolveMessageCodes("required", "item", "itemName", String.class);` 를 매개변수로 준다.
  - itemName 은 원래 매개변수로 줬고, String.class 는 item.itemName 에서 얻는다.
- messageCodes 로 `"required.item.itemName", "required.itemName",  "required.java.lang.String", "required"`를 Sting[] 으로 받는다.

## DefaultMessageCodesResolver의 기본 메시지 생성 규칙

### 객체 오류

- 객체 오류의 경우 다음 순서로 2가지 생성 

  1. code + "." + object name

  2. code 

- 예) 오류 코드: required, object name: item 

  1. required.item 
  2. required

### 필드 오류

- 필드 오류의 경우 다음 순서로 4가지 메시지 코드 생성
  1. code + "." + object name + "." + field
  2.  code + "." + field
  3. code + "." + field type
  4. code
- 예) 오류 코드: typeMismatch, object name "user", field "age", field type: int
  1.  "typeMismatch.user.age"
  2. "typeMismatch.age"
  3. "typeMismatch.int"
  4. "typeMismatch"

## 동작 방식

- rejectValue() , reject() 는 내부에서 MessageCodesResolver 를 사용한다. 여기에서 메시지 코드들을 생성한다.
- FieldError , ObjectError 의 생성자를 보면, 오류 코드를 하나가 아니라 여러 오류 코드를 가질 수 있다. MessageCodesResolver 를 통해서 생성된 순서대로 오류 코드를 보관한다.
- 타임리프 화면을 렌더링 할 때 th:errors 가 실행된다. 만약 이때 오류가 있다면 생성된 오류 메시지 코드를 순서대로 돌아가면서 메시지를 찾는다. 그리고 없으면 디폴트 메시지를 출력한다.

## rejectValue() 에서 DefaultMessageCodesResolver 찾아 떠나기

1. `bindingResult.rejectValue("price", "range", new Object[]{1000, 1000000}, null);`

2. rejectVaue() 는 Error 인터페이스에 있다.

   - ```java
     public interface Error{
         ...
         void rejectValue(@Nullable String field, String errorCode,
           @Nullable Object[] errorArgs, @Nullable String defaultMessage);
     }
     ```

2. 이 Error 코드의 구현체는 AbstractBindingResult 인데, rejectValue 가 이렇게 되어있다.

   - ```java
     	@Override
     	public void rejectValue(@Nullable String field, String errorCode, @Nullable Object[] errorArgs,
     			@Nullable String defaultMessage) {
     
     		if (!StringUtils.hasLength(getNestedPath()) && !StringUtils.hasLength(field)) {
     			// We're at the top of the nested object hierarchy,
     			// so the present level is not a field but rather the top object.
     			// The best we can do is register a global error here...
     			reject(errorCode, errorArgs, defaultMessage);
     			return;
     		}
     
     		String fixedField = fixedField(field);
     		Object newVal = getActualFieldValue(fixedField);
     		FieldError fe = new FieldError(getObjectName(), fixedField, newVal, false,
     				resolveMessageCodes(errorCode, field), errorArgs, defaultMessage);
     		addError(fe);
     	}
     ```

   - 여기서 보면 new FieldError 를 생성하고 addError 를 통해 BindingResult 에 에러정보를 넣는다.

   - 매개변수는 getObjectName(), fixedField, newVal, false, resolveMessageCodes(errorCode, field), errorArgs, defaultMessage 가 있는데

     - getObjectName() : 이미 BindingResult 에 넣어진 ObjectName 이다. ("Item")
     - fixedField : `fixedField(field);` 인데 기본적으로 field 를 그대로 반환한다. ("price")
     - newVal : "price" 를 넣어서 Object 형식으로 거절된 값을 반환한다. 
     - resolveMessageCodes(errorCode, field) : 알아봐야 할 값

3. resolveMessageCodes(errorCode, field) : resolveMessageCodes("range", "price") 인데,

   - ```java
     @Override
     public String[] resolveMessageCodes(String errorCode, @Nullable String field) {
         return getMessageCodesResolver().resolveMessageCodes(
                 errorCode, getObjectName(), fixedField(field), getFieldType(field));
     	}
     ```

   - 이러한 코드를 가지고 있다. 

   - getMessageCodesResolver() 는 AbstractBindingResult 의 messageCodesResolver 를 반환한다.

   - AbstractBindingResult 에서 선언된 messageCodesResolver 는 `private MessageCodesResolver messageCodesResolver = new DefaultMessageCodesResolver();` 이다. 즉 `DefaultMessageCodesResolver()` 를 구현체로 사용하고 있다.

4. `DefaultMessageCodesResolver().resolveMessageCodes(errorCode, getObjectName(), fixedField(field), getFieldType(field))`

   - ``` java
     DefaultMessageCodesResolver().resolveMessageCodes("range", "item", "price", Sting.class)
     ```

   - getFieldType() 메소드를 통해 fieldtype 을 반환받는다.

5. `resolveMessageCodes("range", "item", "price", Sting.class)`

   - DefaultMessageCodesResolver 에서 resolveMessageCodes 메소드는,

   - ```java
     @Override
     	public String[] resolveMessageCodes(String errorCode, String objectName, String field, @Nullable Class<?> fieldType) {
     		Set<String> codeList = new LinkedHashSet<>();
     		List<String> fieldList = new ArrayList<>();
     		buildFieldList(field, fieldList);
     		addCodes(codeList, errorCode, objectName, fieldList);
     		int dotIndex = field.lastIndexOf('.');
     		if (dotIndex != -1) {
     			buildFieldList(field.substring(dotIndex + 1), fieldList);
     		}
     		addCodes(codeList, errorCode, null, fieldList);
     		if (fieldType != null) {
     			addCode(codeList, errorCode, null, fieldType.getName());
     		}
     		addCode(codeList, errorCode, null, null);
     		return StringUtils.toStringArray(codeList);
     	}
     ```

   - 이렇게 되어 있고, 결론적으로, 매서드를 받아서 "." 을 찍고 `Sting[]` 형태로 반환한다.

# 8. 오류 코드와 메시지 처리5(오류 코드 관리 전략)

## 핵심은 구체적인 것에서! 덜 구체적인 것으로!

- 모든 오류 코드에 대해서 메시지를 각각 다 정의하면 개발자 입장에서 관리하기 너무 힘들다.
- 크게 중요하지 않은 메시지는 범용성 있는 requried 같은 메시지로 끝내고, 정말 중요한 메시지는 꼭 필요할 때 구체적으로 적어서 사용하는 방식이 더 효과적이다.

## errors.properties 추가

- ```properties
  #required.item.itemName=상품 이름은 필수입니다.
  #range.item.price=가격은 {0} ~ {1} 까지 허용합니다.
  #max.item.quantity=수량은 최대 {0} 까지 허용합니다.
  #totalPriceMin=가격 * 수량의 합은 {0}원 이상이어야 합니다. 현재 값 = {1}
  
  #==ObjectError==
  #Level1
  totalPriceMin.item=상품의 가격 * 수량의 합은 {0}원 이상이어야 합니다. 현재 값 = {1}
  #Level2
  totalPriceMin=전체 가격은 {0}원 이상이어야 합니다. 현재 값 = {1}
  
  #==FieldError==
  #Level1
  required.item.itemName=상품 이름은 필수입니다.
  range.item.price=가격은 {0} ~ {1} 까지 허용합니다.
  max.item.quantity=수량은 최대 {0} 까지 허용합니다.
  
  #Level2 - 생략
  
  #Level3
  required.java.lang.String = 필수 문자입니다.
  required.java.lang.Integer = 필수 숫자입니다.
  min.java.lang.String = {0} 이상의 문자를 입력해주세요.
  min.java.lang.Integer = {0} 이상의 숫자를 입력해주세요.
  range.java.lang.String = {0} ~ {1} 까지의 문자를 입력해주세요.
  range.java.lang.Integer = {0} ~ {1} 까지의 숫자를 입력해주세요.
  max.java.lang.String = {0} 까지의 문자를 허용합니다.
  max.java.lang.Integer = {0} 까지의 숫자를 허용합니다.
  
  #Level4
  required = 필수 값 입니다.
  min= {0} 이상이어야 합니다.
  range= {0} ~ {1} 범위를 허용합니다.
  max= {0} 까지 허용합니다.
  ```

### 예시 (itemName)

- itemName 의 경우 required 검증 오류 메시지가 발생하면 다음 코드 순서대로 메시지가 생성된다.
  1. required.item.itemName
  2. required.itemName 
  3. required.java.lang.String
  4. required
- 만약에 크게 중요하지 않은 오류 메시지는 기존에 정의된 것을 그냥 재활용 하면 된다!

## ValidationUtils

- ValidationUtils 사용 전

  - ```java
    if (!StringUtils.hasText(item.getItemName())) {
                bindingResult.rejectValue("itemName", "required");
            }
    ```

- ValidationUtils 사용 후

  - 다음과 같이 한줄로 가능하지만 제공하는 기능은 Empty, 공백 같은 단순한 기능만 제공한다.

  - ```java
    ValidationUtils.rejectIfEmptyOrWhitespace(bindingResult, "itemName", "required");
    ```

    

# 9. 오류 코드와 메시지 처리6 (스프링이 직접 만든 오류 메시지 처리)

- 검증 오류 코드는 다음과 같이 2가지로 나눌 수 있다.
  - 개발자가 직접 설정한 오류 코드 -> `rejectValue()` 를 직접 호출
  - 스프링이 직접 검증 오류에 추가한 경우(주로 타입 정보가 맞지 않음)

## price 필드에 문자입력 후 확인

- 로그를 확인해보면 BindingResult 에 FieldError 가 담겨있고, 다음과 같은 메시지 코드들이 생성된 것을 확인할 수 있다. 
  - `codes[typeMismatch.item.price,typeMismatch.price,typeMismatch.java.lang.Integer,typ eMismatch]`

- errors.properties 에 메시지 코드가 없기 때문에 스프링이 생성한 기본 메시지가 출력된다.
  - Failed to convert property value of type java.lang.String to required type java.lang.Integer for property price; nested exception is java.lang.NumberFormatException: For input string: "A"

## error.properties 에 typeMismatch 추가

- ```properties
  #추가
  typeMismatch.java.lang.Integer=숫자를 입력해주세요.
  typeMismatch=타입 오류입니다
  ```

## 메세지 1개만 출력하기

- 스프링이 직접 검증 오류에 추가한 경우 컨트롤러에서 바로 return 해주면 된다.

- ```java
  @PostMapping("/add")
      public String addItemV4(@ModelAttribute Item item, BindingResult bindingResult, RedirectAttributes redirectAttributes, Model model) {
          
      if(bindingResult.hasErrors()){
          log.info("errors code = {}", bindingResult);
          return "validation/v2/addForm";
      }
          
      //직접 설절한 오류 코드
          ...
  ```

  - 이렇게 하면 bindingResult 에 스프링이 생성한 오류가 들어가자마자 return 한다.

# 10. Validator 분리 1

## ItemValidator

- 컨트롤러에서 주입받아 사용하기 위해 @Component 사용

- ```java
  package hello.itemservice.web.validation;
  
  import hello.itemservice.domain.item.Item;
  import lombok.extern.slf4j.Slf4j;
  import org.springframework.stereotype.Component;
  import org.springframework.stereotype.Controller;
  import org.springframework.util.StringUtils;
  import org.springframework.validation.Errors;
  import org.springframework.validation.Validator;
  
  @Slf4j
  @Component
  public class ItemValidator implements Validator {
      @Override
      public boolean supports(Class<?> clazz) {
          //자식 클래스까지 커버됨
          return Item.class.isAssignableFrom(clazz);
      }
  
      @Override
      public void validate(Object target, Errors errors) {
          Item item = (Item) target;
  
          if (!StringUtils.hasText(item.getItemName())) {
              errors.rejectValue("itemName", "required");
          }
          if (item.getPrice() == null || item.getPrice() < 1000 || item.getPrice() > 1000000){
              errors.rejectValue("price", "range", new Object[]{1000, 1000000}, null);
          }
          if(item.getQuantity() == null || item.getQuantity() >= 9999){
              errors.rejectValue("quantity", "max", new Object[]{9999}, null);
          }
  
          if(item.getPrice() != null && item.getQuantity() != null){
              int resultPrice = item.getPrice() * item.getQuantity();
              if(resultPrice < 10000){
                  errors.reject("totalPriceMin",
                          new Object[]{10000, resultPrice}, null);
              }
          }
  
      }
  }
  
  ```

  - `supports(Class<?> clazz)` : 지원하는 클래스인지 검증(boolean)
  - `validate(Object target, Errors errors)` : 실제 검증 코드
    - Object target : Item item 을 넣으면 된다.
    - Errors errors : bindingResult 를 넣으면 된다(Error 를 상속받으므로)

## ValidationItemControllerV2 - addItemV5()

- ```java
  private final ItemValidator itemValidator;
  
  @PostMapping("/add")
  public String addItemV5(@ModelAttribute Item item, BindingResult bindingResult, RedirectAttributes redirectAttributes, Model model) {
  
      //itemvalidator.validate 호출
      itemValidator.validate(item, bindingResult);
  
      //실패 로직
      if(bindingResult.hasErrors()){
          log.info("errors code = {}", bindingResult);
          return "validation/v2/addForm";
      }
  
      //성공 로직
      Item savedItem = itemRepository.save(item);
      redirectAttributes.addAttribute("itemId", savedItem.getId());
      redirectAttributes.addAttribute("status", true);
      return "redirect:/validation/v2/items/{itemId}";
  }
  ```

  

# 11. Validation  분리 - 2 (WebDataBinder 사용)

## WebDataBinder 

- WebDataBinder 는 브라우저를 통해 요청받은 값이 실제 서버의 객체에 바인딩될 때 중간 역할을 한다.

  - 스프링의 파라미터 바인딩의 역할을 해주고 검증 기능도 내부에 포함한다.
  - ![화면 캡처 2023-03-14 175909](../images/2023-03-13-spring MVC2(3) 검증1 - Validation/화면 캡처 2023-03-14 175909.png)

- ValidationItemControllerV2에 다음 코드를 추가

  - ```java
    @InitBinder
    public void init(WebDataBinder dataBinder) {
    	dataBinder.addValidators(itemValidator);
    }
    ```

  - 이렇게 WebDataBinder 에 검증기를 추가하면 해당 컨트롤러에서는 검증기를 자동으로 적용할 수 있다.

  - @InitBinder 해당 컨트롤러에만 영향을 준다. 글로벌 설정은 별도로 해야한다.

## ValidationItemControllerV2 - addItemV6() (@Validated 적용)

- ```java
  @PostMapping("/add")
  public String addItemV6(@Validated @ModelAttribute Item item, BindingResult bindingResult, RedirectAttributes redirectAttributes, Model model) {
  
      if(bindingResult.hasErrors()){
          log.info("errors code = {}", bindingResult);
          //자동으로 view 에 넘어감
          return "validation/v2/addForm";
      }
  
      //성공 로직
      Item savedItem = itemRepository.save(item);
      redirectAttributes.addAttribute("itemId", savedItem.getId());
      redirectAttributes.addAttribute("status", true);
      return "redirect:/validation/v2/items/{itemId}";
  }
  ```

  - @ModelAttribute Item item 앞에 @Validated 를 붙여준다.

  - 그러면 `dataBinder.addValidators(itemValidator);` 로 추가된 dataBinder 가

    1. `itemValidator.support(Item item)` 을 한 후

    2. true 이면 `itemValidator.validate(item, bindingResult)` 를 실행한다.

## 글로벌 설정 - 모든 컨트롤러에 다 적용

- ```java
  @SpringBootApplication
  public class ItemServiceApplication implements WebMvcConfigurer {
      public static void main(String[] args) {
      	SpringApplication.run(ItemServiceApplication.class, args);
      }
      
      @Override
      public Validator getValidator() {
      	return new ItemValidator();
      }
  }
  ```

  - 로벌 설정을 하면 다음에 설명할 BeanValidator가 자동 등록되지 않는다. 글로벌 설정 부분은 주석처리 해두자. 
  - 참고로 글로벌 설정을 직접 사용하는 경우는 드물다.