---
categories: "learning"
---

# 1. QueryMethod

- UserRepository 에 jpa 에서 제공하는 *Query subject keywords* 를 통해 QueryMethod 생성가능

- UserRepository

  - ```java
    public interface UserRepository extends JpaRepository<User, Long> {
        //Optional 이나 Set 으로 해서 리턴 가능
        List<User> findByName(String name); 
    }
    ```

- Test

  - ```java
    @Test
        void select(){
            userRepository.save(new User("martin", "martin@army.mil"));
            userRepository.save(new User("martin", "martin2@army.mil"));
            userRepository.save(new User("sophia1", "sophia1@navy.mil"));
            userRepository.save(new User("sophia2", "sophia2@navy.mil"));
            userRepository.save(new User("john", "john@army.mil"));
    
            System.out.println(userRepository.findByName("john"));
        }
    ```

### *Query subject keywords*

- | Keyword                                                      | Description                                                  |
  | ------------------------------------------------------------ | :----------------------------------------------------------- |
  | `find…By`, `read…By`, `get…By`, `query…By`, `search…By`, `stream…By` | General query method returning typically the repository type, a `Collection` or `Streamable` subtype or a result wrapper such as `Page`, `GeoResults` or any other store-specific result wrapper. Can be used as `findBy…`, `findMyDomainTypeBy…` or in combination with additional keywords. |
  | `exists…By`                                                  | Exists projection, returning typically a `boolean` result.   |
  | `count…By`                                                   | Count projection returning a numeric result.                 |
  | `delete…By`, `remove…By`                                     | Delete query method returning either no result (`void`) or the delete count. |
  | `…First<number>…`, `…Top<number>…`                           | Limit the query results to the first `<number>` of results. This keyword can occur in any place of the subject between `find` (and the other keywords) and `by`. |
  | `…Distinct…`                                                 | Use a distinct query to return only unique results. Consult the store-specific documentation whether that feature is supported. This keyword can occur in any place of the subject between `find` (and the other keywords) and `by`. |

- findUserById 로 만들어도 되지만, 이미 JpaRepository 를 상속받을 때 매개변수로 User 를 넣었으므로 중복임

### QueryMethod 사용

- UserRepository

  - ```java
    package com.fastcampus.jpa.bookmanger.repository;
    
    import com.fastcampus.jpa.bookmanger.domain.User;
    import org.springframework.data.jpa.repository.JpaRepository;
    
    import java.util.List;
    import java.util.Optional;
    
    public interface UserRepository extends JpaRepository<User, Long> {
        //Optional 이나 Set 으로 해서 리턴 가능
        List<User> findByName(String name);
    
        //모두 동일한 쿼리와 동일한 결과값이 나옴(where)
        //따라서 쿼리 가독성이 좋은 걸로 선택해서 하면 됨
        User findByEmail(String email);
        User getByEmail(String email);
        User readByEmail(String email);
        User queryByEmail(String email);
        User searchByEmail(String email);
        User streamByEmail(String email);
        User findUserByEmail(String email);
    
        //limit 쿼리를 이용해서 사용
        //첫번째 User 를 들고 옴
        List<User> findFirst1ByName(String name);
        List<User> findTop1ByName(String name);
    }
    ```

- Test

  - ```java
    @Test
        void select(){
            userRepository.save(new User("martin", "martin@army.mil"));
            userRepository.save(new User("martin", "martin2@army.mil"));
            userRepository.save(new User("sophia1", "sophia1@navy.mil"));
            userRepository.save(new User("sophia2", "sophia2@navy.mil"));
            userRepository.save(new User("john", "john@army.mil"));
    
            System.out.println(userRepository.findByName("john"));
    
            System.out.println("findByEmail : " + userRepository.findByEmail("martin@army.mil"));
            System.out.println("getByEmail : " + userRepository.getByEmail("martin@army.mil"));
            System.out.println("readByEmail : " + userRepository.readByEmail("martin@army.mil"));
            System.out.println("queryByEmail : " + userRepository.queryByEmail("martin@army.mil"));
            System.out.println("searchByEmail : " + userRepository.searchByEmail("martin@army.mil"));
            System.out.println("streamByEmail : " + userRepository.streamByEmail("martin@army.mil"));
            System.out.println("findUserByEmail : " + userRepository.findUserByEmail("martin@army.mil"));
    
            System.out.println("findFirst1ByName : " + userRepository.findFirst1ByName("martin"));
            System.out.println("findTop1ByName : " + userRepository.findTop1ByName("martin"));
    
        }
    ```

    


# 2. *Query predicate keywords*

- 쿼리 메소드의 술부

- | Logical keyword       | Keyword expressions                            |
  | :-------------------- | :--------------------------------------------- |
  | `AND`                 | `And`                                          |
  | `OR`                  | `Or`                                           |
  | `AFTER`               | `After`, `IsAfter`                             |
  | `BEFORE`              | `Before`, `IsBefore`                           |
  | `CONTAINING`          | `Containing`, `IsContaining`, `Contains`       |
  | `BETWEEN`             | `Between`, `IsBetween`                         |
  | `ENDING_WITH`         | `EndingWith`, `IsEndingWith`, `EndsWith`       |
  | `EXISTS`              | `Exists`                                       |
  | `FALSE`               | `False`, `IsFalse`                             |
  | `GREATER_THAN`        | `GreaterThan`, `IsGreaterThan`                 |
  | `GREATER_THAN_EQUALS` | `GreaterThanEqual`, `IsGreaterThanEqual`       |
  | `IN`                  | `In`, `IsIn`                                   |
  | `IS`                  | `Is`, `Equals`, (or no keyword)                |
  | `IS_EMPTY`            | `IsEmpty`, `Empty`                             |
  | `IS_NOT_EMPTY`        | `IsNotEmpty`, `NotEmpty`                       |
  | `IS_NOT_NULL`         | `NotNull`, `IsNotNull`                         |
  | `IS_NULL`             | `Null`, `IsNull`                               |
  | `LESS_THAN`           | `LessThan`, `IsLessThan`                       |
  | `LESS_THAN_EQUAL`     | `LessThanEqual`, `IsLessThanEqual`             |
  | `LIKE`                | `Like`, `IsLike`                               |
  | `NEAR`                | `Near`, `IsNear`                               |
  | `NOT`                 | `Not`, `IsNot`                                 |
  | `NOT_IN`              | `NotIn`, `IsNotIn`                             |
  | `NOT_LIKE`            | `NotLike`, `IsNotLike`                         |
  | `REGEX`               | `Regex`, `MatchesRegex`, `Matches`             |
  | `STARTING_WITH`       | `StartingWith`, `IsStartingWith`, `StartsWith` |
  | `TRUE`                | `True`, `IsTrue`                               |

### predicate keywords 활용

#### And / Or

- UserRepository

  - ```java
    //where = and 조건
    List<User> findByEmailAndName(String email, String name);
    //where = or 조건
    List<User> findByEmailOrName(String email, String name);
    ```

- Test

  - ```java
    System.out.println("findByEmailAndName : " + userRepository.findByEmailAndName("martin@army.mil", "martin"));
    System.out.println("findByEmailOrName : " + userRepository.findByEmailOrName("martin@army.mil", "martin"));
    ```

- Outcome 

  - findByEmailAndName : [User(id=1, name=martin, email=martin@army.mil, createdAt=2022-11-27T19:23:48.959047, updatedAt=2022-11-27T19:23:48.959047)]
    findByEmailOrName : [User(id=1, name=martin, email=martin@army.mil, createdAt=2022-11-27T19:23:48.959047, updatedAt=2022-11-27T19:23:48.959047), User(id=2, name=martin, email=martin2@army.mil, createdAt=2022-11-27T19:23:49.045690, updatedAt=2022-11-27T19:23:49.045690)]

#### FindByCreatedAtAfter / FindByIdAfter

- UserRepository

  - ```java
    List<User> findByCreatedAtAfter(LocalDateTime yesterday);
    
    List<User> findByIdAfter(Long id);
    ```

- Test

  - ```java
    System.out.println("findByCreatedAtAfter : " + userRepository.findByCreatedAtAfter(LocalDateTime.now().minusDays(1L)));
    System.out.println("findByIdAfter : " + userRepository.findByIdAfter(4L));
    ```

- Test Outcome

  - CreatedAt 은 모든 값 / Id 는 4L 이후인 Id=5 만 나옴
  - findByCreatedAtAfter : [User(id=1, name=martin, email=martin@army.mil, createdAt=2022-11-27T19:23:48.959047, updatedAt=2022-11-27T19:23:48.959047), User(id=2, name=martin, email=martin2@army.mil, createdAt=2022-11-27T19:23:49.045690, updatedAt=2022-11-27T19:23:49.045690), User(id=3, name=sophia1, email=sophia1@navy.mil, createdAt=2022-11-27T19:23:49.046691, updatedAt=2022-11-27T19:23:49.046691), User(id=4, name=sophia2, email=sophia2@navy.mil, createdAt=2022-11-27T19:23:49.047695, updatedAt=2022-11-27T19:23:49.047695), User(id=5, name=john, email=john@army.mil, createdAt=2022-11-27T19:23:49.048681, updatedAt=2022-11-27T19:23:49.048681)]
    findByIdAfter : [User(id=5, name=john, email=john@army.mil, createdAt=2022-11-27T19:23:49.048681, updatedAt=2022-11-27T19:23:49.048681)]

#### findByCreatedAtGreaterThan / findByCreatedAtGreaterThanEqual

- UserRepository

  - ```java
    //after 와 쿼리는 똑같으나 좀 더 범용적
    List<User> findByCreatedAtGreaterThan(LocalDateTime yesterday);
    
    // >= 와 같음(after 은 >)
    List<User> findByCreatedAtGreaterThanEqual(LocalDateTime yesterday);
    ```

- Test

  - ```java
    System.out.println("findByCreatedAtGreaterThan : " + userRepository.findByCreatedAtGreaterThan(LocalDateTime.now().minusDays(1L)));
    System.out.println("findByCreatedAtGreaterThanEqual : " + userRepository.findByCreatedAtGreaterThanEqual(LocalDateTime.now().minusDays(1L)));
    ```

- Outcome : 둘 다 모든 값

#### findBy~Between

- UserRepository

  - ```java
    //사이값이기 때문에 인자를 2개 가짐
    //<= ? <= 을 사용(이하 ~ 이상)
    List<User> findByCreatedAtBetween(LocalDateTime yesterday, LocalDateTime tomorrow);
    
    //findByIdGreaterThanEqualAndIdLessThanEqual 과 같음
    List<User> findByIdBetween(Long id1, Long id2);
    //위와 동일한 내용
    List<User> findByIdGreaterThanEqualAndIdLessThanEqual(Long id1, Long id2);
    ```

- Test

  - ```java
    System.out.println("findByCreatedAtBetween : " + userRepository.findByCreatedAtBetween(LocalDateTime.now().minusDays(1L), LocalDateTime.now().plusDays(1L)));
    System.out.println("findByIdBetween : " + userRepository.findByIdBetween(1L, 3L));
    System.out.println("findByIdGreaterThanEqualAndIdLessThanEqual : " + userRepository.findByIdGreaterThanEqualAndIdLessThanEqual(1L, 3L));
    ```

- Outcome : 1번째는 모든 값 / 2, 3번째는 1~3

### predicate keywords 활용(2)

#### findByIdIsNotNull / findByAddressIsNotEmpty

- UserRepository

  - ```java
    //쿼리 상 where id is not null 이라고 되어있음
    //findByIdIsNull() 은 반대로 작동함
    List<User> findByIdIsNotNull();
    //collection 타입의 notEmpty 를 체크함
    //where 의 exist inner 로 구성(잘 사용하지 않음)
    //name is not null and name is not empty?? 아니다!
    List<User> findByAddressIsNotEmpty();
    ```

- User / Address

  - ```java
    //User 에 Address 추가
    @Column(name="address")
    @OneToMany(fetch = FetchType.EAGER)
    private List<Address> address;
    
    //Address class
    @Entity
    public class Address {
        @Id
        private Long id;
    }
    ```

- Test

  - ```java
    System.out.println("findByIdIsNotNull : " + userRepository.findByIdIsNotNull());
    System.out.println("findByAddressIsNotEmpty : " + userRepository.findByAddressIsNotEmpty());
    ```

- Outcome : notNull 은 모든 값 / notEmpty 는 []

#### findByNameIn

- UserRepository

  - ```java
    //값을 리스트로 받아서 넣기보다는 다른 쿼리의 리턴 값을 받아서 바로 찾는데 사용됨
    //해당 리스트의 name 들을 찾음
        List<User> findByNameIn(List<String> names);
    ```

- Test

  - ```java
    System.out.println("findByNameIn : " + userRepository.findByNameIn(Lists.newArrayList("martin", "john")));
    ```

- Outcome : martin, john

#### findByNameStartingWith / EndingWith / Contains

- Like 검색을 가독성 있게 만든 메소드

- UserRepository

  - ```java
    //like 검색으로 실행
    List<User> findByNameStartingWith(String name);
    List<User> findByNameEndingWith(String name);
    List<User> findByNameContains(String name);
    
    //일반적인 like 검색으로 % 와 함께 씀
    //양방향 -> %~~% , endingWith -> %~~, startingWith -> ~~%
    List<User> findByNameLike(String name);
    ```

- Test

  - ```java
    //mar 로 시작하는 like 쿼리 -> mar%
    System.out.println("findByNameStartingWith : " + userRepository.findByNameStartingWith("mar"));
    //tin 으로 끝나는 like 쿼리 -> %tin
    System.out.println("findByNameEndingWith : " + userRepository.findByNameEndingWith("tin"));
    //art 를 포함하는 like 쿼리 -> %art% 
    System.out.println("findByNameContains : " + userRepository.findByNameContains("art"));
    //~contains("art") 와 동일
    System.out.println("findByNameLike : " + userRepository.findByNameLike("%art%"));
    ```

#### Is

- UserRepository

  - ```java
    //is 는 is 와 Equals (or no Keywords)
    //특별한 역할은 하지 않으나, 코드 가독성을 높이기 위해 사용함
    //Name 은 String name 이다.. 와 같은 가독성..
    //Set<User> findByName(String name) 과 같음
    Set<User> findUserByNameIs(String name);
    Set<User> findUserByName(String name);
    Set<User> findUserByNameEquals(String name);
    ```

    

# 3. *Query predicate modifier keywords*

### 정렬

#### ~OrderBy~

- UserRepository

  - ```java
    //역순으로 만들어서 그중 하나를 가져오는 것!
    //Id 기준으로 역순으로 정렬(Desc) / 정순은 Asc
    //query 에 order by 와 limit 가 들어감
    //Top1 일 때는 1 은 생략가능 -> findTopByNameOrderByIdDesc
    List<User> findTop1ByNameOrderByIdDesc(String name);
    
    //정렬 기준을 2개로 -> id는 역순, email 은 정순 (And 를 사용하지 않음)
    List<User> findFirstByNameOrderByIdDescEmailAsc(String name);
    
    //추가적인 sort param 을 제공하여 정렬
    //코드 가독성 측면에서 따로 param을 제공하는게 좋음
    List<User> findFirstByName(String name, Sort sort);
    ```

- Test

  - ```java
     @Test
    void pagingAndSortingTest(){
        userRepository.save(new User(1L, "martin", "martin@army.mil", LocalDateTime.now(), LocalDateTime.now(), null));
        userRepository.save(new User(2L, "martin2", "martin2@army.mil", LocalDateTime.now(), LocalDateTime.now(), null));
        userRepository.save(new User(3L,"sophia1", "sophia1@navy.mil", LocalDateTime.now(), LocalDateTime.now(), null));
        userRepository.save(new User(4L, "sophia2", "sophia2@navy.mil", LocalDateTime.now(), LocalDateTime.now(), null));
        userRepository.save(new User(5L, "john", "john@army.mil", LocalDateTime.now(), LocalDateTime.now(), null));
        userRepository.save(new User(6L, "martin", "john@army.mil", LocalDateTime.now(), LocalDateTime.now(), null));
    
        //Id 역순으로 정렬된 martin -> id 6
        System.out.println("findTop1ByNameOrderByIdDesc : " + userRepository.findTop1ByNameOrderByIdDesc("martin"));
        //Id 역순, Email 정순 -> id 6
        System.out.println("findFirstByNameOrderByIdDescEmailAsc : " + userRepository.findFirstByNameOrderByIdDescEmailAsc("martin"));
        //id 역순, email 정순 -> id 6
        //코드 가독성을 높임
        System.out.println("findFirstByNameWithSortParams : " + userRepository.findFirstByName("martin", Sort.by(Sort.Order.desc("id"), Sort.Order.asc("email"))));
        //id 역순, email 정순 -> id 6
        //getSort() 메소드를 만들어줘서 코드 가독성을 높임
        //getSort() 를 활용할 일이 많을 때 만들어주면 됨
        System.out.println("findFirstByNameWithSortParams : " + userRepository.findFirstByName("martin", getSort()));
    }
    
    //sort 가 너무 길면 따로 메소드로 만들기
    private Sort getSort(){
        return Sort.by(
            Sort.Order.desc("id"),
            Sort.Order.asc("email")
        );
    }
    ```

#### Paging

- 굉장히 많은 경우 List 형식으로 record 를 받기 때문에 페이징기법이 필요함 (게시글, 댓글 등등...)

- UserRepository

  - ```java
    //page 는 Pageable 의 응답값, pageable 을 page 를 호출하기 위한 요청값
    Page<User> findByName(String name, Pageable pageable);
    ```

- Test

  - ```java
    //0번째 페이지, 1개씩 페이징
    //getContent() 를 통해 실제값 확인가능
            System.out.println("findByNameWithPaging : " + userRepository.findByName("martin", PageRequest.of(0, 1, Sort.by(Sort.Order.desc("id")))).getContent());
    //select 쿼리와 count 쿼리 둘다 실행
    //count 쿼리를 실행하기 때문에 getTotalElements() 확인가능
            System.out.println("findByNameWithPaging : " + userRepository.findByName("martin", PageRequest.of(0, 1, Sort.by(Sort.Order.desc("id")))).getTotalElements());
        
    ```

- Outcome :

  - findByNameWithPaging : [User(id=6, name=martin, email=john@army.mil, createdAt=2022-11-27T21:50:29.884081, updatedAt=2022-11-27T21:50:29.884081, address=[])]


    findByNameWithPaging : 2