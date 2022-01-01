---
layout: single
title: "[JPA] Application 개발"
categories: JPA
tag: [JPA, hibernate]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ✔ JPA 구동 방식

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

- JpaMain 클래스 생성
- JPA 동작 확인

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

- @Entity: JPA가 관리할 객체
- @Id: 데이터베이스의 PK와 매핑

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

- 실제로는 Spring F/W가 알아서 해주기에, 없어져야 하는 코드가 많다

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

### DELETE

```java
em.remove(member) //DELETE
```

### JPA 구동 방식

- Persistence -> EntityManagerFactory -> EntityManager 객체 생성 후 사용
- JPA에는 Persistence 클래스가 존재, META-INF의 설정 정보를 읽어서 EntityManagerFactory 객체 생성
- 필요할때마다 EntityManagerFactory 객체를 통해 EntityManger 객체를 찍어내듯이 사용
- EntityManagerFactory 객체는 애플리케이션 로드시에 딱 하나만 생성
  - 실제 DB에 저장, 트랜잭션 단위 -> 고객이 어떤 제스처를 할시 -> DB 커넥션을 얻어 쿼리를 날린다
    - 이 때, EntityManager 객체를 사용해야 한다
    - EntityManger는 쓰레드 간 공유를 지양해야 한다
  - JPA에서는 모든 데이터를 변경하는 작업은 트랜잭션 안에서 작업을 해야한다.

### JPQL 소개

```java
List<Member> memberList = em.createQuery("select m from Member as m", Member.class)
            .setFirstResult(5)
            .setMaxResults(10)
            .getResultList();
```

- 가장 단순한 조회 방법
  - EntityManager.find()
  - 필요에 따라 JOIN, 통계 등 세부적인 SQL을 날려야 하는 상황이 있는 경우

### JPQL 특징

- JPA는 SQL을 추상화한 JPQL이라는 객체 지향 쿼리 언어 제공
- SQL 문법과 유사, SELECT, FROM, WHERE, GROUP BY, HAVING, JOIN 지원
- JPQL은 엔티티 객체를 대상으로 쿼리
- SQL은 데이터베이스 테이블을 대상으로 쿼리

### 참고 자료

- [JPA 애플리케이션 구축](https://www.inflearn.com/course/ORM-JPA-Basic/lecture/21685?tab=note&mm=close)
