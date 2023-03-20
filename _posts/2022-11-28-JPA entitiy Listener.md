# 0. Listener

- listener 란 이벤트를 관찰하고 있다가 이벤트가 발생하면 특정 동작을 진행하는 것



# 1. Entity Listener 종류

- 주로 prePersist, preUpdate 가 자주 쓰임
- 코드 상 setCreatedAt() 이나 setUpdatedAt() 을 사용하지 않기 위함

- ```java
  //insert 메소드 호출 전, 후 실행
  @PrePersist
  public void prePersist(){
      System.out.println(">>> prePersist");
  }
  @PostPersist
  public void postPersist(){
      System.out.println(">>> postPersist");
  }
  
  //merge 메소드 호출 전, 후 실행
  @PreUpdate
  public void preUpdate(){
      System.out.println(">>> preUpdate");
  }
  @PostUpdate
  public void postUpdate(){
      System.out.println(">>> postUpdate");
  }
  
  //delete 메소드 호출 전, 후 실행
  @PreRemove
  public void preRemove(){
      System.out.println(">>> preRemove");
  }
  @PostRemove
  public void postRemove(){
      System.out.println(">>> postRemove");
  }
  
  //select 조회가 일어난 직후에 실행
  @PostLoad
  public void postLoad(){
      System.out.println(">>> postLoad");
  }
  ```

### @PrePersist, @PreUpdate 활용

- 해당 어노테이션에 createdAt, updatedAt 값을 넣어줌

  - ```java
    @PrePersist
    public void prePersist(){
        System.out.println(">>> prePersist");
        this.createdAt = LocalDateTime.now();
    }
    
    @PreUpdate
    public void preUpdate(){
        System.out.println(">>> preUpdate");
        this.updatedAt = LocalDateTime.now();
    }
    ```

- UserRepositoryTest

  - ```java
    @Test
    void prePersistTest(){
        User user = new User();
        user.setEmail("martin2@army.mil");
        user.setName("martin");
        userRepository.save(user);
    
        System.out.println(userRepository.findByEmail("martin2@army.mil"));
    }
    /*outcome :
    >>> prePersist
    >>> postPersist
    >>> postLoad
    User(id=1, name=martin, email=martin2@army.mil, gender=null, createdAt=2022-11-28T17:51:58.836221, updatedAt=null, address=[], testData=null)
    */
    @Test
    void preUpdateTest(){
        User user = new User();
        user.setEmail("martin2@army.mil");
        user.setName("martin");
        userRepository.save(user);
        System.out.println("as-is : " + user);
    
        user.setName("john");
        userRepository.save(user);
        System.out.println("to-be : " + userRepository.findAll().get(0));
    /*outcome : 
    >>> prePersist
    >>> postPersist
    as-is : User(id=1, name=martin, email=martin2@army.mil, gender=null, createdAt=2022-11-28T17:43:39.552946100, updatedAt=null, address=null, testData=null)
    >>> postLoad
    >>> preUpdate
    >>> postUpdate
    >>> postLoad
    to-be : User(id=1, name=john, email=martin2@army.mil, gender=null, createdAt=2022-11-28T17:43:39.552946, updatedAt=2022-11-28T17:43:39.638929, address=[], testData=null)
    */
    }
    ```

    - **save** 가 되는 시점에서 insert / update 가 진행됨

# 2. @EntityListeners 사용

- 각 entity 마다 @prePersist, @preUpdate 등을 선언할 수 없기 때문에 하나의 클래스를 선언해서 사용
  - entity 와 동일 package 에 'MyEntityListner' 클래스 생성
  - 이때 각 Entity 마다 @EntityListeners(value = MyEntityListner.class) 를 붙여줘야 함
- 여러 entity 에서 사용하기 위해서는 createdAt과 updatedAt 이 존재한다는 것을 알아야 하기 때문에 Interface 를 선언하는 것도 좋은 방법임

### Auditable (interface)

- domain 패키지 내에서 사용

- 각 entity 에 @data 를 통해 getter, setter 가 선언되어 있으므로 아래와 같이 사용

- ```java
  package com.fastcampus.jpa.bookmanger.domain;
  
  import java.time.LocalDateTime;
  
  public interface Auditable {
      LocalDateTime getCreatedAt();
      LocalDateTime getUpdatedAt();
  
      void setCreatedAt(LocalDateTime localDateTime);
  
      void setUpdatedAt(LocalDateTime localDateTime);
  }
  ```

### Book (class)

- User 클래스도 비슷함
- Auditable 을 상속받아 만듦

- ```java
  @Entity
  @NoArgsConstructor
  @AllArgsConstructor
  @Data
  @Table(name="book")
  @EntityListeners(value = MyEntityListener.class)
  public class Book implements Auditable{
      @Id
      @GeneratedValue
      private Long id;
  
      private String name;
  
      private String author;
  
      private LocalDateTime createdAt;
  
      private LocalDateTime updatedAt;
  }
  ```

### MyEntityListener

- domain 패키지 내 생성

- ```java
  package com.fastcampus.jpa.bookmanger.domain;
  
  import javax.persistence.PrePersist;
  import javax.persistence.PreUpdate;
  import java.time.LocalDateTime;
  
  public class MyEntityListener {
      //해당 엔티티는 오브젝트 없이 바로 받을 수 있으나 리스너는 오브젝트를 받아야 함
      @PrePersist
      public void prePersist(Object o){
          //o 가 Auditable 로부터 상속받은 클래스이면,
          if(o instanceof Auditable){
              //해당 클래스.setCreatedAt(LocalDateTime.now());
              //Book.setCreatedAt(LocalDateTime.now());
              ((Auditable) o).setCreatedAt(LocalDateTime.now());
              ((Auditable) o).setUpdatedAt(LocalDateTime.now());
          }
      }
  
      //위와 같음
      @PreUpdate
      public void preUpdate(Object o){
          if(o instanceof Auditable){
              ((Auditable) o).setUpdatedAt(LocalDateTime.now());
          }
      }
  }
  ```

### Test

- 정상 작동



# 3. UserHistoryRepository 활용

- User 의 변경사항을 추적하기 위한 Repository 생성

### User(class)

- @EntityListners 에 'UserEntityListner.class' 추가
  - @EntityListeners(value = {MyEntityListener.class, UserEntityListener.class})
  - **User 클래스가 update 될 때마다 history 에 반영되므로 User 클래스에 추가해야 한다**

### UserHistory (class)

- ```java
  package com.fastcampus.jpa.bookmanger.domain;
  
  import ...
  
  @Entity
  @NoArgsConstructor
  @Data
  //createdAt 과 updatedAt 을 받기 위해서 MyEntityListener 사용
  @EntityListeners(value = MyEntityListener.class)
  public class UserHistory implements Auditable{
      @Id
      @GeneratedValue
      private Long id;
  
      private Long userId;
  
      private String name;
  
      private String email;
  
      private LocalDateTime createdAt;
  
      private LocalDateTime updatedAt;
  }
  ```

### UserEntityListener (class)

- User 클래스의 PrePersist, PreUpdate 리스너

- Spring bean 으로 관리해야 하지만 listener 는 스프링을 주입받지 못함

- 따라서 특별한 클래스를 만들어야 함(BeanUtils)

- ```java
  package com.fastcampus.jpa.bookmanger.domain;
  
  import ...
  
  public class UserEntityListener {
  
      //PrePersist 와 PreUpdate 를 함께 쓸 수 있음
      @PrePersist
      @PreUpdate
      public void prePersistAndPreUpdate(Object o){
          //bean 으로 관리하기 위함
      UserHistoryRepository userHistoryRepository = BeanUtils.getBean(UserHistoryRepository.class);
  
          //대상 User
          User user = (User) o;
  
          //history 생성 후 id, name, email 을 저장하고 save 실행
          UserHistory userHistory = new UserHistory();
          userHistory.setUserId(user.getId());
          userHistory.setName(user.getName());
          userHistory.setEmail(user.getEmail());
  
          userHistoryRepository.save(userHistory);
      }
  }
  ```

### BeanUtils

- support 패키지 하위에 생성

- ```java
  package com.fastcampus.jpa.bookmanger.support;
  
  import jdk.dynalink.beans.StaticClass;
  import org.springframework.beans.BeansException;
  import org.springframework.context.ApplicationContext;
  import org.springframework.context.ApplicationContextAware;
  import org.springframework.stereotype.Component;
  
  //컴포넌트로 실행
  @Component
  //ApplicationContextAware 상속
  public class BeanUtils implements ApplicationContextAware {
      private static ApplicationContext applicationContext;
  
      @Override
      public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
          BeanUtils.applicationContext = applicationContext;
      }
  
      public static<T> T getBean(Class<T> clazz){
          return applicationContext.getBean(clazz);
      }
  }
  ```

  

# 4. jpa 에서 제공하는 listener

### BookmangerApplication

- @EnableJpaAuditing 추가

### User

- @EntityListeners 에 `AuditingEntityListener.class` 추가
  - @EntityListeners(value = {AuditingEntityListener.class, UserEntityListener.class})
- Auditing 을 지정해야 할 데이터에 @CreatedDate, @LastModifiedDate 지정 (createdAt, UpdatedAt)

- ```java
  package com.fastcampus.jpa.bookmanger.domain;
  
  import lombok.*;
  import org.springframework.data.annotation.CreatedDate;
  import org.springframework.data.annotation.LastModifiedDate;
  import org.springframework.data.jpa.domain.support.AuditingEntityListener;
  
  import javax.persistence.*;
  import java.time.LocalDateTime;
  import java.util.List;
  
  @NoArgsConstructor
  @AllArgsConstructor
  @RequiredArgsConstructor
  @Data
  @Builder
  @Entity
  @EntityListeners(value = {AuditingEntityListener.class, UserEntityListener.class})
  @Table(name = "TEST")
  public class User implements Auditable{
      @Id
      @GeneratedValue
      private Long id;
  
      @NonNull
      private String name;
  
      @NonNull
      private String email;
  
      @Enumerated(value = EnumType.STRING)
      private Gender gender;
  
      //createdAt 에 @CreatedDate 추가
      @CreatedDate
      private LocalDateTime createdAt;
      //updatedAt 에 @LastModifiedDate 추가
      @Column(insertable = false)
      @LastModifiedDate
      private LocalDateTime updatedAt;
  
      @OneToMany(fetch = FetchType.EAGER)
      private List<Address> address;
  
      @Transient
      private String testData;
  }
  ```

### UserHistory

- User 클래스와 똑같이 변경



# 5. 현업에서 쓰이는 listener

- createdAt, updatedAt 이 계속 쓰이면 `BaseEntity` 로 만들어놓고 사용
- 현업에서는 중복되는 필드가 있으면 하나로 통합해서 관리함

### BaseEntity

- @MappedSUperClass 를 사용하여 해당 클래스의 필드를 상속받는 entity 의 컬럼으로 포함시킴

- ```java
  package com.fastcampus.jpa.bookmanger.domain;
  
  import lombok.Data;
  import org.springframework.data.annotation.CreatedDate;
  import org.springframework.data.annotation.LastModifiedDate;
  import org.springframework.data.jpa.domain.support.AuditingEntityListener;
  
  import javax.persistence.EntityListeners;
  import javax.persistence.MappedSuperclass;
  import java.time.LocalDateTime;
  
  @Data
  //해당 클래스의 필드를 상속받는 entity 의 컬럼으로 포함시켜주겠다는 얘기
  //따라서 baseEntity 에 있는 컬럼은 모두 상속받는 컬럼에 사용 가능
  @MappedSuperclass
  //AuditingEntityListener 를 사용
  @EntityListeners(value = AuditingEntityListener.class)
  public class BaseEntity {
      @CreatedDate
      private LocalDateTime createdAt;
  
      @LastModifiedDate
      private LocalDateTime updatedAt;
  }
  ```

### User, Book, UserHistory 등 클래스

- @EntityListeners 에 `AuditingEntityListener.class` 삭제

  - BaseEntity 에 있고, 상속받아서 쓸 것이기 때

  - ```
    @EntityListeners(value = UserEntityListener.class)
    ```

- @Data 밑에 해당 어노테이션 필요

  - ```java
    //data warning 마크 제거를 위해 @ToSpring 과 @EqualsAndHasCode 넣어야 함
    //상속받는 슈퍼클래스의 정보를 ToString, EqualsAndHashCode 에 포함하는 코드
    
    @ToString(callSuper=true)
    @EqualsAndHashCode(callSuper = true)
    ```
