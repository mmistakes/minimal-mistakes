---
layout: single
title: "[JPA] Application 개발"
date: "2022-01-01 15:31:40"
categories: JPA
tag: [JPA, hibernate]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ✔ JPA 구동 방식

![jpa구동방식](https://user-images.githubusercontent.com/53969142/150360123-48c4138c-bb5d-4021-8afc-9b6e416aee67.PNG)

1. 설정 정보 조회
2. Persistence 객체를 통해 EntityManagerFactory 객체를 얻는다
3. EntityManagerFactory 객체를 통해 EntityManager 객체를 획득

### JPA 동작 확인

```java
public void main(String[] args) {
    //EntityMangerFactory 객체 획득
    EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");

    //EntityManager 객체 획득
    EntityManager em = emf.createEntityManager();

    em.close();
    emf.close();
}
```

- **Persistence.createEntityManagerFactory**("**hello**")
  - META-INF에 존재하는 persistence.xml 파일을 읽어 EntityManagerFactory 객체 생성
- **emf.createEntityManager**();
  - emf( EntityManagerFactory )를 통해 EntityManger를 생성 한다
- EntityManagerFactory는 반드시 하나만 생성을 해야 한다
- 클라이언트의 요청이 들어올 때마다 **EntityManager**를 생성하여 처리한다

### 객체와 테이블 생성 후 매핑

```java
package hellojpa;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Member {

    @Id
    private Long id;

    @Column(nullable = false, columnDefinition = "varchar(100) default 'EMPTY'")
    private String username;

    private Integer age;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModifiedDate;

    @Lob
    private String description;

    public Member() {
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public Integer getAge() {
        return age;
    }

    public RoleType getRoleType() {
        return roleType;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public String getDescription() {
        return description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public void setRoleType(RoleType roleType) {
        this.roleType = roleType;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
```

- **@Entity**
  - 애플리케이션이 구동되는 순간 JPA를 사용하는 모듈로 인식하기 위해 사용
- **@Id**
  - 데이터베이스의 PK( 기본키 )와 매핑

### JPA는 하나의 트랜잭션 단위 안에서 작업

```java
public class JpaMain {

    public static void main(String[] args) {
        //EntityMangerFactory 객체 획득
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");

        //EntityManager 객체 획득
        EntityManager em = emf.createEntityManager();

        //Transaction
        EntityTransaction tx = em.getTransaction();
        tx.begin();

        try {
            Member member = new Member();
            member.setId(1L);
            member.setUsername("HelloA");

            em.persist(member);
            tx.commit();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            em.close();
        }

        emf.close();
    }
}
```

- JPA에서 **데이터를 변경하는 작업**은 **하나의 트랜잭션 단위 내에서** 수행 해야 한다
- 위 코드는 실제 JPA 동작 방식을 알기 위해 작성이 된 코드다
  - 실제로는 스프링( Spring ) F/W가 알아서 처리를 해준다

## ✔ JPA CRUD

### SELECT

```java
Member member = em.find(Member.class, 1L);
```

### INSERT

```java
em.persist(member);
```

### UPDATE

```java
Member member = em.find(Member.class, 1L);
member.setUserName("June"); //UPDATE - 영속성
```

- 기존 SQL의 경우 데이터를 조회 후 값을 변경하는데 JPA는 Java Collection 객체와 같이  
  데이터를 꺼낸 후에 값만 변경하여도 UPDATE 쿼리가 날란간다

### DELETE

```java
em.remove(member) //DELETE
```

### JPA 구동 방식

- **Persistence** -> **EntityManagerFactory** -> **EntityManager** 객체 생성 후 사용
- JPA에는 Persistence 클래스가 존재, META-INF의 설정 정보를 읽어서 EntityManagerFactory 객체 생성
- 필요할때마다 EntityManagerFactory 객체를 통해 EntityManger 객체를 찍어내듯이 사용
- EntityManagerFactory 객체는 애플리케이션 로드시에 딱 하나만 생성
- 실제 DB에 저장, 트랜잭션 단위 -> 고객이 어떤 제스처를 할시 -> DB 커넥션을 얻어 쿼리를 날린다
  - 이 때, EntityManager 객체를 사용해야 한다
  - **EntityManger**는 **쓰레드 간 공유**를 **지양**해야 한다
  - **JPA**에서는 **모든 데이터를 변경하는 작업**은 **트랜잭션 안에서 작업**을 해야한다.

### JPQL 소개

```java
List<Member> memberList = em.createQuery("select m from Member as m", Member.class)
            .setFirstResult(5)
            .setMaxResults(10)
            .getResultList();
```

- JPA는 DB 테이블이 아닌 **객체를 대상으로 조회**를 요청한다
- 가장 단순한 조회 방법
  - EntityManager.find()
  - 필요에 따라 **JOIN**, **통계** 등 **세부적인 SQL**을 날려야 하는 상황이 있는 경우
  - **ex**) 나이가 18살 이상인 모든 데이터를 출력하고 싶다

### JPQL 부연 설명

- JPA를 사용하면 Entity ( 엔티티 ) 객체를 중심으로 개발
- **JPA**를 사용할때의 **문제점**은 **검색 쿼리**
- **검색 시** **테이블**이 아닌 **엔티티 객체를 대상**으로 검색
- 모든 DB 데이터를 객체로 변환해서 검색하는 것은 불가능
- 애플리케이션이 필요한 데이터만 DB에서 불러오려면 결국 검색 조건이 포함된 SQL 필요
  - 실제 RDB의 물리적인 Table에 Query를 날리면 해당 RDB에 **종속적 관계**가 되는 단점 존재

### JPQL 특징

- **JPA**는 **SQL**을 **추상화**한 **JPQL이라는 객체 지향 쿼리** 언어 제공
- SQL 문법과 유사, SELECT, FROM, WHERE, GROUP BY, HAVING, JOIN 지원
- **JPQL**은 **엔티티 객체를 대상**으로 쿼리
- **SQL**은 **데이터베이스 테이블을 대상**으로 쿼리

### 참고 자료

- [JPA 애플리케이션 구축](https://www.inflearn.com/course/ORM-JPA-Basic/lecture/21685?tab=note&mm=close)
