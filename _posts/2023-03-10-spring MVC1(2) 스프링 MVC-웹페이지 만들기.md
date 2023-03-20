# 0. 요구사항 분석

## 상품 도메인 모델

- 상품 ID 
-  상품명 
- 가격 
- 수량

## 상품 관리 기능

- 상품 목록 
- 상품 상세 
- 상품 등록 
- 상품 수정

## 서비스 화면 

- ![image-20230310175801512](../images/2023-03-10-spring MVC1(2) 스프링 MVC-웹페이지 만들기/image-20230310175801512.png)

- 서비스 제공 흐름
  - ![image-20230310175819887](../images/2023-03-10-spring MVC1(2) 스프링 MVC-웹페이지 만들기/image-20230310175819887.png)

- 요구사항이 정리되고 디자이너, 웹 퍼블리셔, 백엔드 개발자가 업무를 나누어 진행한다. 
- 디자이너: 요구사항에 맞도록 디자인하고, 디자인 결과물을 웹 퍼블리셔에게 넘겨준다. 
- 웹 퍼블리셔: 다자이너에서 받은 디자인을 기반으로 HTML, CSS를 만들어 개발자에게 제공한다. 
- 백엔드 개발자: 디자이너, 웹 퍼블리셔를 통해서 HTML 화면이 나오기 전까지 시스템을 설계하고, 핵심 비즈니스 모델을 개발한다. 이후 HTML이 나오면 이 HTML을 뷰 템플릿으로 변환해서 동적으로 화면을 그리고, 또 웹 화면의 흐름을 제어한다.

# 1. 상품 도메인 개발

## Item - 상품 객체

- ```java
  package hello.itemservice.domain.item;
  
  import lombok.Data;
  import lombok.Getter;
  import lombok.Setter;
  
  @Data
  public class Item {
  
      private Long id;
      private String itemName;
      private Integer price;
      private Integer quantity;
  
      public Item(){}
  
      public Item(String itemName, Integer price, Integer quantity){
          this.itemName = itemName;
          this.price = price;
          this.quantity = quantity;
      }
  }
  ```

## ItemRepository - 상품 저장소

- ```java
  package hello.itemservice.domain.item;
  
  import org.springframework.stereotype.Repository;
  import org.springframework.web.bind.annotation.RestController;
  
  import java.util.ArrayList;
  import java.util.HashMap;
  import java.util.List;
  import java.util.Map;
  
  @Repository
  public class ItemRepository {
  
      private static final Map<Long, Item> store = new HashMap<>();
      private static Long sequence = 0L;
  
      public Map getIntance(){
          return store;
      }
  
      public Item save(Item item){
          item.setId(++sequence);
          store.put(item.getId(), item);
          return item;
      }
  
      public Item findById(Long id){
          return store.get(id);
      }
  
      public List<Item> findAll(){
          return new ArrayList<>(store.values());
      }
  
      public void update(Long itemId, Item updateParam){
          Item findItem = findById(itemId);
          findItem.setItemName(updateParam.getItemName());
          findItem.setPrice(updateParam.getPrice());
          findItem.setQuantity(updateParam.getQuantity());
      }
  
      public void clearStore(){
          store.clear();
      }
  }
  ```

# 2. 상품 서비스 HTML

## 부트스트랩

- 참고로 HTML을 편리하게 개발하기 위해 부트스트랩 사용했다.
- 부트스트랩 다운로드 후 `bootstrap.min.css` 를 복사해서 `resources/static/css/bootstrap.min.css` 에 추가한다.

## HTML 파일 다운로드

- 강의자료 7. 스프링 MVC - 웹페이지 만들기 참조해서 ctrl c,v (resources.static.html 에 넣는다)
- 다운로드 후 확인 시 절대경로를 붙여넣거나(`C:\Users\kimhobeen\IdeaProjects\item-service\out\production\resources\static\html\item.html`)
- 서버 실행 후 들어가도 된다. (`http://localhost:8080/html/item.html`)

# 3. 상품 목록 - 타임리프

## BasicItemController

- ```java
  package hello.itemservice.web.basic;
  
  import hello.itemservice.domain.item.Item;
  import hello.itemservice.domain.item.ItemRepository;
  import jakarta.annotation.PostConstruct;
  import lombok.RequiredArgsConstructor;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.stereotype.Controller;
  import org.springframework.ui.Model;
  import org.springframework.web.bind.annotation.GetMapping;
  import org.springframework.web.bind.annotation.RequestMapping;
  
  import java.util.List;
  
  @Controller
  @RequestMapping("/basic/items")
  @RequiredArgsConstructor
  public class BasicItemController {
  
      //스프링 빈 등록
      private final ItemRepository itemRepository;
  
      @GetMapping
      public String items(Model model) {
          List<Item> items = itemRepository.findAll();
          model.addAttribute("items", items);
          return "basic/items";
      }
  
      /**
       * 테스트용 데이터 추가
       */
      @PostConstruct
      public void init(){
          itemRepository.save(new Item("itemA", 10000, 10));
          itemRepository.save(new Item("itemB", 20000, 20));
      }
  }
  ```

## 뷰 템플릿(templates) 영역

- /resources/static/items.html -> 복사 -> /resources/templates/basic/items.html

- ```html
  <!DOCTYPE HTML>
  <html xmlns:th="http://www.thymeleaf.org">
  <head>
    <meta charset="utf-8">
    <link th:href="@{/css/bootstrap.min.css}"
            href="../css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
  <div class="container" style="max-width: 600px">
    <div class="py-5 text-center">
      <h2>상품 목록</h2>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-primary float-end"
                onclick="location.href='addForm.html'"
                th:onclick="|location.href='@{/basic/items/add}'|"
                type="button">상품
          등록</button>
      </div>
    </div>
    <hr class="my-4">
    <div>
      <table class="table">
        <thead>
        <tr>
          <th>ID</th>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
        </tr>
        </thead>
        <tbody>
        <tr th:each="item : ${items}">
        <td><a href="item.html" th:href="@{/basic/items/{itemId}(itemId=${item.id})}" th:text="${item.id}">회원id</a></td>
        <td><a href="item.html" th:href="@{|/basic/items/${item.id}|}" th:text="${item.itemName}">상품명</a></td>
        <td th:text="${item.price}">10000</td>
        <td th:text="${item.quantity}">10</td>
        </tr>
  
        </tbody>
      </table>
    </div>
  </div> <!-- /container -->
  </body>
  </html>
  ```

### 타임리프 사용 선언

- <html xmlns:th="http://www.thymeleaf.org">

### 속성 변경 - th:href

- `th:href="@{/css/bootstrap.min.css}"`
- href="value1" 을 th:href="value2" 의 값으로 변경한다.
-  타임리프 뷰 템플릿을 거치게 되면 원래 값을 th:xxx 값으로 변경한다. 만약 값이 없다면 새로 생성한다. 
- HTML을 그대로 볼 때는 href 속성이 사용되고, 뷰 템플릿을 거치면 th:href 의 값이 href 로 대체되면서 동적으로 변경할 수 있다.

### URL 링크 표현식 - @{...},

- `th:href="@{/css/bootstrap.min.css}"`
- @{...} : 타임리프는 URL 링크를 사용하는 경우 @{...} 를 사용한다. 이것을 URL 링크 표현식이라 한다. URL 링크 표현식을 사용하면 서블릿 컨텍스트를 자동으로 포함한다.

### 속성 변경 - th:onclick

- `onclick="location.href='addForm.html'"` -> `th:onclick="|location.href='@{/basic/items/add}'|"`
- 리터럴 대체 문법이 사용되었다.

### 리터럴 대체 - |...|

- |...| :이렇게 사용한다.
- 타임리프에서 문자와 표현식 등은 분리되어 있기 때문에 더해서 사용해야 한다.
  - `<span th:text="'Welcome to our application, ' + ${user.name} + '!'">`
-  다음과 같이 리터럴 대체 문법을 사용하면, 더하기 없이 편리하게 사용할 수 있다.
  - `<span th:text="|Welcome to our application, ${user.name}!|">`

### 반복 출력 - th:each

- `<tr th:each="item : ${items}">`
- 반복은 th:each 를 사용한다. 이렇게 하면 모델에 포함된 items 컬렉션 데이터가 item 변수에 하나씩 포함되고, 반복문 안에서 item 변수를 사용할 수 있다. 
- 컬렉션의 수 만큼 .. 이 하위 테그를 포함해서 생성된다.

### 변수 표현식 - ${...}

- `<td th:text="${item.price}">10000</td>`
- 10000 모델에 포함된 값이나, 타임리프 변수로 선언한 값을 조회할 수 있다. 
- 프로퍼티 접근법을 사용한다. ( item.getPrice() )

### 내용 변경 - th:text

- `<td th:text="${item.price}">10000</td>`
- 내용의 값을 th:text 의 값으로 변경한다. 
- 여기서는 10000을 ${item.price} 의 값으로 변경한다.

### URL 링크 표현식2 - @{...},

- `th:href="@{/basic/items/{itemId}(itemId=${item.id})}"`
- URL 링크 표현식을 사용하면 경로를 템플릿처럼 편리하게 사용할 수 있다. 
- 경로 변수( {itemId} ) 뿐만 아니라 쿼리 파라미터도 생성한다. 
- 예) `th:href="@{/basic/items/{itemId}(itemId=${item.id}, query='test')}" `
  - `생성 링크: http://localhost:8080/basic/items/1?query=test`

### URL 링크 간단히

- `th:href="@{|/basic/items/${item.id}|}"` (URL 링크 표현식2 와 비교)
- 리터럴 대체 문법을 활용해서 간단히 사용할 수도 있다.

# 4. 상품등록 상세

- 상품 상세 컨트롤러와 뷰를 개발한다.

## BasicItemController에 추가

- ```java
  @GetMapping("/{itemId}")
  public String item(@PathVariable long itemId, Model model){
      Item item = itemRepository.findById(itemId);
      model.addAttribute("item", item);
      return "basic/item";
  }
  ```

  - PathVariable 과 Model 을 이용하여 http 요청을 받는다.

## 상품 상세 뷰

- `/resources/templates/basic/item.html`

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
   </style>
  </head>
  <body>
  <div class="container">
    <div class="py-5 text-center">
      <h2>상품 상세</h2>
    </div>
    <div>
      <label for="itemId">상품 ID</label>
      <input type="text" id="itemId" name="itemId" class="form-control"
             th:value="${item.id}" value="1" readonly>
    </div>
    <div>
      <label for="itemName">상품명</label>
      <input type="text" id="itemName" name="itemName" class="form-control"
             th:value="${item.itemName}" value="상품A" readonly>
    </div>
    <div>
      <label for="price">가격</label>
      <input type="text" id="price" name="price" class="form-control"
             th:value="${item.price}" value="10000" readonly>
    </div>
    <div>
      <label for="quantity">수량</label>
      <input type="text" id="quantity" name="quantity" class="form-control"
             th:value="${item.quantity}" value="10" readonly>
    </div>
    <hr class="my-4">
    <div class="row">
      <div class="col">
        <button class="w-100 btn btn-primary btn-lg"
                onclick="location.href='editForm.html'"
                th:onclick ="|location.href='@{/basic/items/{itemId}/edit(itemId=${item.id})}'|"
                type="button">상품 수정</button>
      </div>
      <div class="col">
        <button class="w-100 btn btn-secondary btn-lg"
                onclick="location.href='items.html'" th:onclick ="|location.href='@{/basic/items}'|"
                type="button">목록으로</button>
      </div>
    </div>
  </div> <!-- /container -->
  </body>
  </html>
  ```

- 상품 id, 상품명, 수량, 가격에는 `th:value=${item.xxx}` 를 통해 속성을 변경한다.
- '상품수정' 및 '목록으로' 링크도 리터럴 대체로 바꾼다.

## 5. 상품 등록 폼

## BasicItemController에 추가

- ```java
  @GetMapping("/add")
  public String addForm(){
      return "basic/addForm";
  }
  
  //    @PostMapping("/add")
      public String addItemV1(@RequestParam String itemName,
              @RequestParam int price,
              @RequestParam int quantity,
              Model model){
          Item item = new Item();
          item.setItemName(itemName);
          item.setPrice(price);
          item.setQuantity(quantity);
          itemRepository.save(item);
          model.addAttribute("item", item);
  
          return "basic/item";
      }
  
  //    @PostMapping("/add")
      public String addItemV2(@ModelAttribute("item") Item item){
  
          itemRepository.save(item);
          //자동으로 해준다. 생략 가능
          //model.addAttribute("item", item);
  
          return "basic/item";
      }
  
  //    @PostMapping("/add")
      //클래스 명에서 첫글자만 소문자로 바꿔서 이름으로 저장한다. (Item -> item)
      public String addItemV3(@ModelAttribute Item item){
  
          itemRepository.save(item);
  
          return "basic/item";
      }
  
      @PostMapping("/add")
      public String addItemV4(Item item){
  
          itemRepository.save(item);
  
          return "basic/item";
      }
  
  ```

- V1 : @requestParam 으로 받아서 model 로 보낸다
- V2 : @ModelAttribute 로 Item 을 받는다. 이러면 model 이 필요없다. 
  - `model.addAttribute("item", item);` 을 자동으로 해준다.
- V3 : @ModelAttibute 에서 name 속성 생략 가능하다. 그렇게 되면 클래스에서 첫글자만 소문자로 바꿔서 저장한다.
  - Item -> "item"
- V4 : @ModelAttibute 도 생략가능하다.

## 상품 등록 폼 뷰

- `/resources/templates/basic/addForm.html`

- ```HTML
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
   </style>
  </head>
  <body>
  <div class="container">
    <div class="py-5 text-center">
      <h2>상품 등록 폼</h2>
    </div>
    <h4 class="mb-3">상품 입력</h4>
    <form th:action
            action="item.html"
          method="post">
      <div>
        <label for="itemName">상품명</label>
        <input type="text" id="itemName" name="itemName" class="form-control" placeholder="이름을 입력하세요">
      </div>
      <div>
        <label for="price">가격</label>
        <input type="text" id="price" name="price" class="form-control"
               placeholder="가격을 입력하세요">
      </div>
      <div>
        <label for="quantity">수량</label>
        <input type="text" id="quantity" name="quantity" class="form-control" placeholder="수량을 입력하세요">
      </div>
      <hr class="my-4">
      <div class="row">
        <div class="col">
          <button class="w-100 btn btn-primary btn-lg" type="submit">상품
            등록</button>
        </div>
        <div class="col">
          <button class="w-100 btn btn-secondary btn-lg"
                  onclick="location.href='items.html'"
                  th:onclick ="|location.href='@{/basic/items}'|"
                  type="button">취소</button>
        </div>
      </div>
    </form>
  </div> <!-- /container -->
  </body>
  </html>
  ```

  - post 와 get 의 url 이 같으로 여기서는 form 태그에서 `th:action` 으로만 설정해주면  get 과 같은 url 에서 실행된다.
  - 취소 버튼은 `th:onclick ="|location.href='@{/basic/items}'|"` 로 설정하여 목록으로 가게 한다.

# 5. 상품 수정

## 상품 수정 폼 컨트롤러

- BasicItemController에 추가

- ```java
  @GetMapping("{itemId}/edit")
  public String editorm(@PathVariable long itemId, Model model){
  
      Item item = itemRepository.findById(itemId);
      model.addAttribute("item", item);
  
      return "/basic/editForm";
  }
  ```

- 수정에 필요한 정보를 조회하고, 수정용 폼 뷰를 호출한다.

## 상품 수정 폼 뷰

- `/resources/templates/basic/editForm.html`

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
   </style>
  </head>
  <body>
  <div class="container">
    <div class="py-5 text-center">
      <h2>상품 수정 폼</h2>
    </div>
    <form action="item.html" th:action method="post">
      <div>
        <label for="id">상품 ID</label>
        <input type="text" id="id" name="id" class="form-control"
               value="1"
               th:value = "${item.id}"
               readonly>
      </div>
      <div>
        <label for="itemName">상품명</label>
        <input type="text" id="itemName" name="itemName" class="form-control"
               value="상품A"
               th:value="${item.itemName}"
        >
      </div>
      <div>
        <label for="price">가격</label>
        <input type="text" id="price" name="price" class="form-control"
               value="10000"
               th:value = "${item.price}"
        >
      </div>
      <div>
        <label for="quantity">수량</label>
        <input type="text" id="quantity" name="quantity" class="form-control"
               value="10"
               th:value = "${item.quantity}"
        >
      </div>
      <hr class="my-4">
      <div class="row">
        <div class="col">
          <button class="w-100 btn btn-primary btn-lg" type="submit">저장
          </button>
        </div>
        <div class="col">
          <button class="w-100 btn btn-secondary btn-lg"
                  onclick="location.href='item.html'"
                  th:onclick="|location.href='@{/basic/items/{itemId}(itemId=${item.id})}'|"
                  type="button">취소</button>
        </div>
      </div>
    </form>
  </div> <!-- /container -->
  </body>
  </html>
  ```

  - form action 은 `th:action`
  - 각 input 태그에 value 값으로 `${item.xxx}` 를 넣어준다. id 는 readonly 를 붙여서 수정못하게 한다.
  - 취소는 상품상세로 돌아가도록 `th:onclick` 사용

## 상품 수정 개발

- ```java
   @PostMapping("{itemId}/edit")
  public String edit(@PathVariable Long itemId, @ModelAttribute Item item){
  
      itemRepository.update(itemId, item);
  
      return "redirect:/basic/items/{itemId}";
  }
  ```

### 리다이렉트

- 상품 수정은 마지막에 뷰 템플릿을 호출하는 대신에 상품 상세 화면으로 이동하도록 리다이렉트를 호출한다.
  - 컨트롤러에 매핑된 @PathVariable 의 값은 redirect 에도 사용 할 수 있다.

# 6. PRG (Post/Redirect/Get, addForm 해결)

- /add 에서 상품 등록을 완료하고 웹 브라우저의 새로고침 버튼을 클릭하면 상품이 계속 중복등록이 되는 문제가 있다.

## POST 등록 후 새로 고침 설명

- ![image-20230312122839841](../images/2023-03-10-spring MVC1(2) 스프링 MVC-웹페이지 만들기/image-20230312122839841.png)
  1. 상품등록을 클릭하면 Get 으로 상품등록 폼을 보여준다.
  2. 상품 등록 폼에서 데이터를 입력하고 저장을 선택하면 POST /add + 상품 데이터를 서버로 전송한다.
  3. 이 상태에서 새로 고침을 또 선택하면 마지막에 전송한 POST /add + 상품 데이터를 서버로 다시 전송하게 된다. 그래서 내용은 같고, ID만 다른 상품 데이터가 계속 쌓이게 된다

- ![image-20230312122938600](../images/2023-03-10-spring MVC1(2) 스프링 MVC-웹페이지 만들기/image-20230312122938600.png)
  - 웹 브라우저의 새로 고침은 마지막에 서버에 전송한 데이터를 다시 전송한다.
  - 새로 고침 문제를 해결하려면 상품 저장 후에 뷰 템플릿으로 이동하는 것이 아니라, 상품 상세 화면으로 리다이렉트를 호출해주면 된다. 
  - 웹 브라우저는 리다이렉트의 영향으로 상품 저장 후에 실제 상품 상세 화면으로 다시 이동한다. 따라서 마지막에 호출한 내용이 상품 상세 화면인 GET /items/{id} 가 되는 것이다.

## BasicItemController에 추가

- ```java
  @PostMapping("/add")
  public String addItemV5(Item item){
  
      itemRepository.save(item);
  
      return "redirect:/basic/items/" + item.getId();
  }
  ```

- 상품 등록 처리 이후에 뷰 템플릿이 아니라 상품 상세 화면으로 리다이렉트 하도록 코드를 작성한다.
- 이런 문제 해결 방식을 PRG Post/Redirect/Get 라 한다.
-  redirect에서 +item.getId() 처럼 URL에 변수를 더해서 사용하는 것은 URL 인코딩이 안되기 때문에 위험하다. 다음에 설명하는 RedirectAttributes 를 사용하자.

# 7. RedirectAttributes

- 저장이 잘 되었으면 상품 상세 화면에 "저장되었습니다"라는 메시지를 보여달라는 요구사항이 왔다.

## BasicItemController에 추가

- ```java
  @PostMapping("/add")
  public String addItemV6(Item item, RedirectAttributes redirectAttributes){
  
      Item savedItem = itemRepository.save(item);
      redirectAttributes.addAttribute("itemId", savedItem.getId());
      redirectAttributes.addAttribute("status", true);
  
      return "redirect:/basic/items/{itemId}";
  }
  ```

### RedirectAttributes

- RedirectAttributes 를 사용하면 URL 인코딩도 해주고, pathVarible , 쿼리 파라미터까지 처리해준다.
- `redirect:/basic/items/{itemId} `
  - pathVariable 바인딩: {itemId} 
  - 나머지는 쿼리 파라미터로 처리: ?status=true

## 뷰 템플릿 메시지 추가

- `resources/templates/basic/item.html`

- ```html
  <div class="container">
    <div class="py-5 text-center">
      <h2>상품 상세</h2>
    </div>
  
    <h2 th:if="${param.status}" th:text="'저장 완료'"></h2>
  ```

  - `th:if` : 해당 조건이 참이면 실행
  - `${param.status}` : 타임리프에서 쿼리 파라미터를 편리하게 조회하는 기능
    - 원래는 컨트롤러에서 모델에 직접 담고 값을 꺼내야 한다. 그런데 쿼리 파라미터는 자주 사용해서 타임리프에서 직접 지원한다.
  -  템플릿에 메시지를 추가하고 실행해보면 "저장 완료!" 라는 메시지가 나오는 것을 확인할 수 있다. 물론 상품 목록에서 상품 상세로 이동한 경우에는 해당 메시지가 출력되지 않는다.