---
layout: single
title: "[JPA]Spring Data JPA"
excerpt : "Spring Data JPA에 대해서"
categories: jpa
---

## Spring Data JPA란?
> - JPA를 좀 더 편하게 사용할 수 있게 Repository interface를 제공한다.  
  repository 개발 시 인터페이스만 작성하면 실행 시점에 spring data jpa가 구현 객체를 동적으로 생성해서 알아서 주입한다.
> - 기존의 JPA는 EntityManager를 생성하여 그 안에서 CRUD의 로직을 처리하는 반면에 Spring Data JPA는 이미 EntityManager가 선언되어 있기 때문에 직접 작성할 필요가 없다. 
> - CRUD 처리를 위한 공통 인터페이스를 제공한다.
> - 공통 메소드를 제공한다.(아래 내용 있습니다)

---

## 의존성 주입

- gradle에서 build.gradle

```java
dependencies {
    mplementation 'org.springframework.
        boot:spring-boot-starter-data-jpa'
}
```
- maven에서 appConfig.xml

```xml
<dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-jpa</artifactId>
</dependency>
```

---
## Spring Data JPA의 예시

```java
public interface UserRepository extends JpaRepository<User, Long> {

  List<User> findByEmailAddressAndLastname
  (String emailAddress, String lastname);
}
```

>- docs.spring.io에 나온 예시이다.
>- Repository만 interface로 작성하면 spring data jpa 적용 끝이다.
>- 위의 코드(findByEmailAddressAndLastname)를 쿼리로 날리면 다음과 같다. 

``` sql
select u from User u where u.emailAddress = ?1 and u.lastname = ?2
```

- sql문을 읽어보면 emailAddress 값과 lastname이 일치하는 값을 select해주며 List<User> 타입으로 값을 받는다.
- 이처럼 spring data jpa는 메소드 이름을 보고 쿼리를 생성한다. 이를 spring.io.docx 사이트에서는 keyword로 정의했는데 자세한 내용은 사이트를 참조 바란다.
- [spring.io.docx](https://docs.spring.io/spring-data/jpa/docs/1.10.1.RELEASE/reference/html/#jpa.sample-app.finders.strategies)

- 주요 메서드
>    - save() : 새로운 엔티티는 저장하고 이미 있는 엔티티는 수정한다.
>        - 내부 : em.merge() 호출
>    - delete() : 엔티티 하나를 삭제
>        - 내부 : em.remove() 호출
>    - findOne() : 엔티티 하나를 조회
>        - 내부 : em.find() 호출
>    - getOne() : 엔티티를 프록시로 조회
>        - 내부 : em.getReference() 호출
>    - findAll() : 모든 엔티티를 조회
>        - sort 또는 pageable 조건을 파라미터로 제공


--- 
## Query직접 사용하기 
- Repository 메소드를 사용한 곳에 직접 쿼리를 정의하는 방식

    - Repository에 직접 쿼리 정의 

- @Query 어노테이션에 nativeQuery=true로 설정 시 파라미터 바인딩을 0부터 사용하면 된다. default는 1부터 시작

```java
public interface UserRepository extends JpaRepository<User, Long>{

    @Query(value ="select u from User u where u.
    emailAddress =?1 and u.lastname = ?2")
    List<User> findByEmailAddressAndLastname(
        String emailAddress, String Lastname);

    // nativeQuery = true 사용 
    @Query(value ="select u from User u where u.
    emailAddress =?0 and u.lastname = ?1", 
    nativeQuery = true)
    List<User> findByEmailAddressAndLastname(
        String emailAddress, String Lastname);
}
```
