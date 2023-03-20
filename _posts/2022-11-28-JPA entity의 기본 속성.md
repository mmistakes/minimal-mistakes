# 0. entity 구조

- ```java
  package com.fastcampus.jpa.bookmanger.domain;
  
  import lombok.*;
  
  import javax.persistence.*;
  import java.time.LocalDateTime;
  import java.util.List;
  
  @NoArgsConstructor
  @AllArgsConstructor
  @RequiredArgsConstructor
  @Data
  @Builder
  @Entity
  @Table(name = "TEST")
  public class User {
      @Id
      @Column(name ="id")
      @GeneratedValue
      private Long id;
  
      @NonNull
      @Column(name="name")
      private String name;
  
      @NonNull
      @Column(name="email")
      private String email;
  
      @Enumerated(value = EnumType.STRING)
      private Gender gender;
  
      @Column(name="createdAt", updatable = false)
      private LocalDateTime createdAt;
  
      @Column(name="updatedAt", insertable = false)
      private LocalDateTime updatedAt;
  
      @Column(name="address")
      @OneToMany(fetch = FetchType.EAGER)
      private List<Address> address;
  
      @Transient
      private String testData;
  }
  ```

# 1. @Table

- name 을 정의할 수 있으나 h2 database 사용시 클래스 이름으로 자동 정의됨 
  - 그러나 intellij community 버전은 따로 정의해야 할듯..

# 2. @Column

- name, unique, nullable, insertable, updatable 등의 속성이 있음
- nullable 을 false 로 하면 @NonNull 과 동일
- insertable false 는 insert 구문(create) 불가능, updatable false 는 update 구문 불가능
  - 따라서 insertable, updatable 을 통해 필요에 따라 insert 나 update 시 해당 값 저장 여부를 지정할 수 있음

# 3. @Transient

- DB 레코드에는 처리를 하지 않지만, 객체에서 따로 쓰겠다는 필드가 존재하면 transient 사용

- insert, update, select 등 사용 x

- ```java
  @Transient
  private String testData;
  ```

# 4. @Enumerated

- enum 클래스를 사용할 때 `value = EnumType.STRING` 로 설정 필요

- Example

  - ```java
    //User
    @Enumerated(value = EnumType.STRING)
    private Gender gender;
    ```

  - ```java
    //Gender(enum)
    package com.fastcampus.jpa.bookmanger.domain;
    
    public enum Gender {
        MALE,
        FEMALE
    }
    ```

  - ```java
    //UserRepository
    //row level 을 확인하기 위한 쿼리문
    @Query(value = "select * from TEST limit 1;", nativeQuery = true)
        Map<String, Object> findRowRecord();
    ```

  - ```java
    @Test
    void enumTest(){
        userRepositoryList();
        User user = userRepository.findById(1L).orElseThrow(RuntimeException::new);
        user.setGender(Gender.MALE);
    
        userRepository.save(user);
    
        userRepository.findAll().forEach(System.out::println);
        //해당 결과는 제대로 나오는 것 같이 보이나 Row 수준에서는 다름
    
        System.out.println(userRepository.findRowRecord().get("gender"));
        //해당값은 0 으로 지정되며, enum Gender 에서 MALE, FEMALE 위치를 바꾸면 1로 바뀜
    }
    ```

    - @Enumerated(value = EnumType.ORDINAL)  일때 findRowRecord().get("gender") 의 결과는 0
    - 즉, 인덱스 형태로 저장되며 enum Gender 에서 MALE, FEMALE 위치를 바꾸면 1로 바뀜
    - @Enumerated(value = EnumType.STRING) 일때 결과값은 MALE 임
    - 따라서 MALE 로 정상저장하기 위해 EnumType 을 STRING 설정 필요



