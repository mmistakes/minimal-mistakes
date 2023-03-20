# 0. JPA 소개

### ORM (Object Relational Mapping) 이란?

- ![image-20221118204449183](../images/2022-11-18-JPA 개론/image-20221118204449183.png)

- 객체와 데이터베이스 사이의 관계를 연결해주는 것
- 만약 ORM 없이 관계를 설정한다면 직접 데이터 셀렉트 쿼리를 해서 받을 결과값들을 일일히 어떤 정보인지 맵핑해서 사용해야 함

### JPA(Java Persistence API) 란?

- 현재 java 에서 ORM 표준으로 채택되어있음
- 데이터에 접근하기 위한 API 규격을 정해놓은 것
- ![image-20221118205248062](../images/2022-11-18-JPA 개론/image-20221118205248062.png)

#### Hibernate

- JPA 에 대한 실제 구현체(implementation)
- 하이버네이트 ORM은 자바 언어를 위한 객체 관계 매핑 프레임워크

#### Spring Data Jpa

- 스프링에서 hibernate 를 간편히 사용할 수 있도록 추상 객체를 한번 더 감싸서 만들어놓은 것

### Intellj 기본 설정

- java 8 버전
- dependencies : Lombok, Spring web, Spring Data JPA, H2 Database (총 4개)

#### hello world (controller > HelloWorldController (Class) )

- ```java
  package com.fastcampus.jpa.bookmanger.controller;
  
  import org.springframework.web.bind.annotation.GetMapping;
  import org.springframework.web.bind.annotation.RestController;
  
  @RestController
  public class HelloWorldController {
      @GetMapping("/hello-world")
      public String helloWorld(){
          return "hello world";
      }
  }
  ```

- Test

  - HelloWorldController 에서 ctrl + shift + T 단축키를 누르면 JUnit 으로 test 바로 생성

  - ```java
    package com.fastcampus.jpa.bookmanger.controller;
    
    import org.junit.jupiter.api.Test;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
    import org.springframework.test.web.servlet.MockMvc;
    import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
    
    import static org.junit.jupiter.api.Assertions.*;
    import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
    import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
    import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
    
    //WebMvcTest 사용
    @WebMvcTest
    class HelloWorldControllerTest {
        @Autowired
        private MockMvc mockMvc;
    
        @Test
        void helloWorld() throws Exception{
            mockMvc.perform(MockMvcRequestBuilders.get("/hello-world"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().string("hello world"));
        }
    }
    ```

    - output : 
    - MockHttpServletResponse:
                 Status = 200
          Error message = null
                Headers = [Content-Type:"text/plain;charset=UTF-8", Content-Length:"11"]
           Content type = text/plain;charset=UTF-8
                   Body = hello world
          Forwarded URL = null
         Redirected URL = null
                Cookies = []



# 1. Lombok

### Lombok 어노테이션

- ```java
  package com.fastcampus.jpa.bookmanger.domain;
  
  import lombok.NonNull;
  
  import java.time.LocalDateTime;
  
  @Getter
  @Setter
  @ToString
  //인자가 없는 생성자 ex. public User(){}
  @NoArgsConstructor
  //모든 인자를 가지는 생성자 ex. public User(String name, String email ... ) {this.name = name ...}
  @AllArgsConstructor
  //꼭 필요한 인자만을 가지고 만드는 생성자
  //@NonNull 을 사용한 인자는 무조건 가지는 생성자를 만듦
  //@NonNull 이나 final 이 없으면 NoArgsConstructor 와 같음
  @RequiredArgsConstructor
  //equals 와 hashcode overriding 을 위해
  @EqualsAndHashCode
  //@Getter, @Setter, @ToSting, @RequiredArgsConstructor, @EqualsAndHashCode 를 합쳐놓은 것
  @Data
  //AllArgsConstructor 와 비슷하게 빌드 형식으로 객체를 생성하고 필드값을 주입해줌
  @Builder
  public class User {
      @NonNull
      private String name;
      @NonNull
      private String email;
      private LocalDateTime createdAt;
      private LocalDateTime updatedAt;
  
  //@RequiredArgsConstructor 를 통해 생성
      public User(@NonNull String name, @NonNull String email) {
          this.name = name;
          this.email = email;
      }
  
      //@AllArgsConstructor 를 통해 생성
      public User(@NonNull String name, @NonNull String email, LocalDateTime createdAt, LocalDateTime updatedAt) {
          this.name = name;
          this.email = email;
          this.createdAt = createdAt;
          this.updatedAt = updatedAt;
      }
  
      //@NoArgsConstructor 를 통해 생성
      public User() {
      }
  
      //@Builder 를 통해 생성
      public static UserBuilder builder() {
          return new UserBuilder();
      }
  
      //@Getter, @Setter 를 통해 생성
      public @NonNull String getName() {
          return this.name;
      }
  
      public @NonNull String getEmail() {
          return this.email;
      }
  
      public LocalDateTime getCreatedAt() {
          return this.createdAt;
      }
  
      public LocalDateTime getUpdatedAt() {
          return this.updatedAt;
      }
  
      public void setName(@NonNull String name) {
          this.name = name;
      }
  
      public void setEmail(@NonNull String email) {
          this.email = email;
      }
  
      public void setCreatedAt(LocalDateTime createdAt) {
          this.createdAt = createdAt;
      }
  
      public void setUpdatedAt(LocalDateTime updatedAt) {
          this.updatedAt = updatedAt;
      }
  
      //@EqualsAndHashCode 를 통해 생성
      public boolean equals(final Object o) {
          if (o == this) return true;
          if (!(o instanceof User)) return false;
          final User other = (User) o;
          if (!other.canEqual((Object) this)) return false;
          final Object this$name = this.getName();
          final Object other$name = other.getName();
          if (this$name == null ? other$name != null : !this$name.equals(other$name)) return false;
          final Object this$email = this.getEmail();
          final Object other$email = other.getEmail();
          if (this$email == null ? other$email != null : !this$email.equals(other$email)) return false;
          final Object this$createdAt = this.getCreatedAt();
          final Object other$createdAt = other.getCreatedAt();
          if (this$createdAt == null ? other$createdAt != null : !this$createdAt.equals(other$createdAt)) return false;
          final Object this$updatedAt = this.getUpdatedAt();
          final Object other$updatedAt = other.getUpdatedAt();
          if (this$updatedAt == null ? other$updatedAt != null : !this$updatedAt.equals(other$updatedAt)) return false;
          return true;
      }
  
      protected boolean canEqual(final Object other) {
          return other instanceof User;
      }
  
      //@EqualsAndHashCode 를 통해 생성
      public int hashCode() {
          final int PRIME = 59;
          int result = 1;
          final Object $name = this.getName();
          result = result * PRIME + ($name == null ? 43 : $name.hashCode());
          final Object $email = this.getEmail();
          result = result * PRIME + ($email == null ? 43 : $email.hashCode());
          final Object $createdAt = this.getCreatedAt();
          result = result * PRIME + ($createdAt == null ? 43 : $createdAt.hashCode());
          final Object $updatedAt = this.getUpdatedAt();
          result = result * PRIME + ($updatedAt == null ? 43 : $updatedAt.hashCode());
          return result;
      }
  
      //@ToString 을 통해 생성
      public String toString() {
          return "User(name=" + this.getName() + ", email=" + this.getEmail() + ", createdAt=" + this.getCreatedAt() + ", updatedAt=" + this.getUpdatedAt() + ")";
      }
  
      //@UserBulider 클래스 정의
      public static class UserBuilder {
          private @NonNull String name;
          private @NonNull String email;
          private LocalDateTime createdAt;
          private LocalDateTime updatedAt;
  
          UserBuilder() {
          }
  
          public UserBuilder name(@NonNull String name) {
              this.name = name;
              return this;
          }
  
          public UserBuilder email(@NonNull String email) {
              this.email = email;
              return this;
          }
  
          public UserBuilder createdAt(LocalDateTime createdAt) {
              this.createdAt = createdAt;
              return this;
          }
  
          public UserBuilder updatedAt(LocalDateTime updatedAt) {
              this.updatedAt = updatedAt;
              return this;
          }
  
          //bulid() 를 통해 다시 User 클래스로 변경
          //이전까지는 UserBulider 클래스이다
          public User build() {
              return new User(name, email, createdAt, updatedAt);
          }
  
          public String toString() {
              return "User.UserBuilder(name=" + this.name + ", email=" + this.email + ", createdAt=" + this.createdAt + ", updatedAt=" + this.updatedAt + ")";
          }
      }
  }
  ```



# 2. H2 In-Memory DB 에 대해

- 주로 test 용 DB 로 사용됨
- H2 embedded vs server (save)
  - embedded 모드는 3, 4배 더 빠르지만 다른 프로세스가 DB에 접근할 수 없음. 따라서 다른 서버나 API 와 DB를 공유하기 위해서는 server 모드로 진행해야 함. 
  - 이때 main java app이나 분리된 JVM process 에 H2 서버를 먼저 실행해야 함
  - automatic mixed 모드가 있는데, 첫번째 연결에서는 Embedded 모드의 속도의 장점을 가지고, 그 다음 연결부터는 server 모드로 실행됨. 여기서도 마찬가지로 H2 서버를 먼저 실행해야 함
  - H2 in embedded mode will be faster (3x to 4x) but no other process can access the DB.
