# JpaRepository 

- JPA 개론 파일과 이어짐(bookmanager)

### @Entity

- User 에 @Entity 와 @Table, @Column 을 통해 entity 로 만듦

- @Entity 에는 반드시 pk 값이 필요

- @Table(name="") 과 각 객체들의 @Column(name="") 필요

- ```java
  package com.fastcampus.jpa.bookmanger.domain;
  
  import lombok.*;
  
  import javax.persistence.*;
  import java.time.LocalDateTime;
  
  @NoArgsConstructor
  @AllArgsConstructor
  @RequiredArgsConstructor
  @Data
  @Builder
  //객체를 entity 로 선언해주는 어노테이션
  //반드시 pk 가 필요함
  @Entity
  @Table(name="TEST")
  public class User {
      //User 의 pk 값이 됨
      //자동으로 증가하는 id
      @Id
      @Column(name ="ID")
      @GeneratedValue
      private Long id;
  
      @NonNull
      @Column(name="NAME")
      private String name;
  
      @NonNull
      @Column(name="EMAIL")
      private String email;
  
      @Column(name="CREATE_TIME")
      private LocalDateTime createdAt;
  
      @Column(name="UPDATE_TIME")
      private LocalDateTime updatedAt;
  }
  
  ```

  

# 2. Jpa Repository Interface 실습(1)

### UserRepository

- JpaRepository 를 상속받아 기능 사용

- ```java
  package com.fastcampus.jpa.bookmanger.repository;
  
  import com.fastcampus.jpa.bookmanger.domain.User;
  import org.springframework.data.jpa.repository.JpaRepository;
  
  public interface UserRepository extends JpaRepository<User, Long> {
  }
  ```

### UserRepositoryTest

- ```java
  package com.fastcampus.jpa.bookmanger.repository;
  
  import com.fastcampus.jpa.bookmanger.domain.User;
  import org.junit.jupiter.api.Test;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.boot.test.context.SpringBootTest;
  
  import static org.junit.jupiter.api.Assertions.*;
  @SpringBootTest
  class UserRepositoryTest {
  
      @Autowired
      private UserRepository userRepository;
  
      @Test
      void crud(){
          userRepository.save(new User());
  
          System.out.println(">>> " + userRepository.findAll());
      }
  ```

### resources

- test 폴더에 리소스 파일을 만들어서 쿼리문을 동작시킴
- 테스트가 동작할 때만 동작함

- ```mysql
  /* 테스트가 동작할 때만 동작함 */
  call next value for hibernate_sequence;
  insert into TEST ('id', 'name', 'email', 'created_at', 'updated_at')
  values (1, 'martin', 'martin@fastcampus.com', now(), now());
  
  call next value for hibernate_sequence;
  insert into TEST ('id', 'name', 'email', 'created_at', 'updated_at')
      values (2, 'dennis', 'dennis@fastcampus.com', now(), now());
  
  call next value for hibernate_sequence;
  insert into TEST ('id', 'name', 'email', 'created_at', 'updated_at')
      values (3, 'sophia', 'sophia@slowcampus.com', now(), now());
  
  call next value for hibernate_sequence;
  insert into TEST ('id', 'name', 'email', 'created_at', 'updated_at')
      values (4, 'james', 'james@slowcampus.com', now(), now());
  
  call next value for hibernate_sequence;
  insert into TEST ('id', 'name', 'email', 'created_at', 'updated_at')
      values (5, 'martin', 'martin@another.com', now(), now());
  
  ```

  

# 3. 실습(2)

### flush

- db 반영시점을 조절하는 기능. 로그 상으로 확인하기 어려움 

- ```java
  @Test
  void crud(){
      userRepository.saveAndFlush(new User("new martin", "newmartin@fastcampus.com"));
      userRepository.flush();
      userRepository.findAll().forEach(System.out::println);
  }
  ```

### count

- long 형식으로 리턴됨

- ```java
  @Test
  void test(){
      userRepository.save(new User("martin", "martin@army.mil"));
      userRepository.save(new User("martin2", "martin2@army.mil"));
      userRepository.save(new User("sophia1", "sophia1@navy.mil"));
      userRepository.save(new User("sophia2", "sophia2@navy.mil"));
      userRepository.save(new User("john", "john@army.mil"));
  
      long cnt = userRepository.count();
      System.out.println(cnt); // 5
  }
  ```

### exist

- boolean 형식으로 리턴되며 해당 ID 값이 있는지 찾음

- findById(id).isPresent() 로 리턴되는 형식

- ```java
  @Test
      void test(){
          userRepository.save(new User("martin", "martin@army.mil"));
          userRepository.save(new User("martin2", "martin2@army.mil"));
          userRepository.save(new User("sophia1", "sophia1@navy.mil"));
          userRepository.save(new User("sophia2", "sophia2@navy.mil"));
          userRepository.save(new User("john", "john@army.mil"));
  
          boolean exist = userRepository.existsById(1L);
          System.out.println(exist); // true
      }
  ```

### delete

- delete

- ```java
  @Test
      void crud(){
          userRepository.save(new User("martin", "martin@army.mil"));
          userRepository.save(new User("martin2", "martin2@army.mil"));
          userRepository.save(new User("martin3", "martin3@army.mil"));
          userRepository.save(new User("martin4", "martin4@army.mil"));
          userRepository.save(new User("martin5", "martin5@army.mil"));
  
          //Params: entity – must not be null.
          userRepository.delete(userRepository.findById(1L).orElseThrow(RuntimeException::new));
  
          userRepository.findAll().forEach(System.out::println);
      }
  ```

- deleteAll

  - 다 지운다는 의미

  - 레코드 지정가능

  - ```java
    @Test
        void crud(){
            userRepository.save(new User("martin", "martin@army.mil"));
            userRepository.save(new User("martin2", "martin2@army.mil"));
            userRepository.save(new User("martin3", "martin3@army.mil"));
            userRepository.save(new User("martin4", "martin4@army.mil"));
            userRepository.save(new User("martin5", "martin5@army.mil"));
    
            //다 지운다는 의미
            //순서 : findall -> 레코드 개수대로 delete -> select
            userRepository.deleteAll();
            //순서 : 1번이 있는지 조회 -> 3번이 있는지 조회 -> 1번 삭제 -> 3번 삭제 -> select all
            userRepository.deleteAll(userRepository.findAllById(Lists.newArrayList(1L, 3L)));
            
            userRepository.findAll().forEach(System.out::println);
        }
    ```

- deleteInBatch

  - select 문으로 레코드를 개별적으로 찾지 않고 바로 delete 실행

  - 실제로 select 를 해서 하나하나 지우느냐, batch 로 쿼리 한번으로 모든 것을 지우느냐 차이

  - ```java
    @Test
        void crud(){
            userRepository.save(new User("martin", "martin@army.mil"));
            userRepository.save(new User("martin2", "martin2@army.mil"));
            userRepository.save(new User("martin3", "martin3@army.mil"));
            userRepository.save(new User("martin4", "martin4@army.mil"));
            userRepository.save(new User("martin5", "martin5@army.mil"));
    
            userRepository.deleteInBatch(userRepository.findAllById(Lists.newArrayList(1L, 3L)));
            //마찬가지로 'delete from user' 를 통해 바로 delete
            userRepository.deleteAllInBatch();
    
        }
    ```

  


### paging

- ```java
  @Test
  void crud(){
      userRepository.save(new User("martin", "martin@army.mil"));
      userRepository.save(new User("martin2", "martin2@army.mil"));
      userRepository.save(new User("martin3", "martin3@army.mil"));
      userRepository.save(new User("martin4", "martin4@army.mil"));
      userRepository.save(new User("martin5", "martin5@army.mil"));
  
      //page 를 0 으로 바꾸면 id : 1, 2, 3 페이지 기준으로 적용됨 ex) PageRequest.of(0, 3)
      Page<User> users = userRepository.findAll(PageRequest.of(1, 3));
  
      System.out.println("page : " + users);
      System.out.println("totalElements : " + users.getTotalElements()); //count query랑 동일
      System.out.println("totalPages : " + users.getTotalPages()); // 전체 페이지 수
      System.out.println("numberOfElements : " + users.getNumberOfElements()); // 현재 가져온 레코드 수 -> 3개지만, 0페이지 조회 시 2개가 됨
      System.out.println("sort : " + users.getSort());
      System.out.println("size : " + users.getSize()); // 페이징 할 때 나누는 크기
      users.getContent().forEach(System.out::println); // 내부에 있는 user 정보 가지고 오기
  }
  ```

- outcome :
  - page : Page 2 of 2 containing com.fastcampus.jpa.bookmanger.domain.User instances
    totalElements : 5
    totalPages : 2
    numberOfElements : 2 
    sort : UNSORTED
    size : 3
    User(id=4, name=martin4, email=martin4@army.mil, createdAt=null, updatedAt=null)
    User(id=5, name=martin5, email=martin5@army.mil, createdAt=null, updatedAt=null)

### update

- ```java
  @Test
  void crud(){
      userRepository.save(new User("martin", "martin@army.mil"));
      userRepository.save(new User("martin", "martin2@army.mil"));
      userRepository.save(new User("sophia1", "sophia1@navy.mil"));
      userRepository.save(new User("sophia2", "sophia2@navy.mil"));
      userRepository.save(new User("john", "john@army.mil"));
  
      userRepository.save(new User("david", "david@army.mil"));
  
      //findById 와 orElseThrow 를 통해 runtimeexception, 이후 이메일 업데이트 후 저장
      User user = userRepository.findById(1L).orElseThrow(RuntimeException::new);
      user.setEmail("martin-updated@army.mil");
  
      userRepository.save(user);
  }
  ```

  



### QBE(QueryByExample)

- 엔티티를 Example로 만들고 매쳐를 선언해줌으로써 우리가 필요한 쿼리들을 만드는 방법

- 실제로는 생각처럼 많이 쓰이지 않음

- ```java
  @Test
      void crud(){
          userRepository.save(new User("martin", "martin@army.mil"));
          userRepository.save(new User("martin2", "martin2@army.mil"));
          userRepository.save(new User("sophia1", "sophia1@navy.mil"));
          userRepository.save(new User("sophia2", "sophia2@navy.mil"));
          userRepository.save(new User("john", "john@army.mil"));
  
          ExampleMatcher matcher = ExampleMatcher.matching()
                  .withIgnorePaths("name") // 이거는 확인하지 않겠다는 뜻, 이게 없으면 exact match가 진행됨
                  .withMatcher("email", endsWith()); //이메일은 endswith로 확인하겠다는 뜻, like 쿼리 사용 (like *army.mil)
  
          //matcher 가 없으면 Exact match
          //name 은 무시하므로 상관없음
          Example<User> example = Example.of(new User("fd", "army.mil"), matcher);
          userRepository.findAll(example).forEach(System.out::println); 
  
          //user 를 지정하면
          User user = new User();
          user.setEmail("slow");
          ExampleMatcher matcher2 = ExampleMatcher.matching()
                  //양방향 like 검색
                  .withMatcher("email", contains());
          //검색이 필요한 인자를 생산가능함
          Example<User> example2 = Example.of(user, matcher);
  
      }
  ```

  

# 4. SimpleJpaRepository 코드 확인

### save

- ```java
  //transactional 이 존재하지않으면 save 메소드가 자체적인 transactional을 생성함
  @Transactional
  	@Override
  	public <S extends T> S save(S entity) {
  
          //null을 체크하여 entity 가 null 이면 해당 문구 출력
  		Assert.notNull(entity, "Entity must not be null.");
  
          //isNew 를 통해 id 기준으로 entity 가 있으면 persist, 없으면 merge 진행
  		if (entityInformation.isNew(entity)) {
              //EntityManager em
  			em.persist(entity);
  			return entity;
  		} else {
  			return em.merge(entity);
  		}
  	}
  ```

### saveAndFlush

- ```java
  @Transactional
  	@Override
  	public <S extends T> S saveAndFlush(S entity) {
  
  		S result = save(entity);
  		flush();
  
  		return result;
  	}
  ```

### deleteAll() 과 deleteAllInBatch() 차이

- deleteAll()

  - ```java
    @Override
    @Transactional
    public void deleteAll() {
        //for 반복문을 통해 하나씩 삭제
        for (T element : findAll()) {
            delete(element);	
        }
    }
    ```

- deleteAllInBatch()

  - 하나의 delete 쿼리로 처리 가능(findAll() 사용 x)

  - ```java
    @Override
    @Transactional
    public void deleteAllInBatch() {
    	em.createQuery(getDeleteAllQueryString()).executeUpdate();
    }
    ```

  - getDeletAllQueryString()

    - ```java
      public static final String DELETE_ALL_QUERY_STRING = "delete from %s x";
      
      private String getDeleteAllQueryString() {
          return getQueryString(DELETE_ALL_QUERY_STRING, entityInformation.getEntityName());
      }
      ```

    
