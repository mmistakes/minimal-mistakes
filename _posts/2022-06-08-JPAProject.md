---
layout: single
title:  "[자바 ORM 표준] 기능 적용 예제"
categories: JPA
tag: [web, server, DB, JPA, spring boot]
toc: true
toc_sticky: true
author_profile: false
sidebar:
    nav: "docs"
---

<br>

# 요구사항 분석

- 회원은 상품을 주문할 수 있다.
- 주문시 여러 종류의 상품을 선택할 수 있다.

<br>

# 도메인 모델 분석

- **회원 - 주문 관계**: **회원**은 여러번 **주문**할 수 있다.(일대다)
- **주문 - 상품 관계**: **주문**할 때 여러 **상품**을 선택할 수 있다.
    - 반대로 **상품**도 여러번 **주문**될 수 있다.
    - **주문상품** 모델을 만들어서 다대다 관계를 일대다, 다대일로 풀어냈다.
![15](/images/JPA_ORM/15.jpg)

## 테이블 설계

![16](/images/JPA_ORM/16.jpg)

## 엔티티 설계와 매핑

![17](/images/JPA_ORM/17.jpg)

<br>

# 코드 작성

## Member.class

```java
@Entity
public class Member {

    @Id @GeneratedValue()
    @Column(name = "MEMBER_ID")
    private Long id;
    private String name;
    private String city;
    private String street;
    private String zipcode;

    // getter, setter...
}
```

## Order.class

```java
@Entity
@Table(name = "ORDERS")
public class Order {

    @Id @GeneratedValue
    @Column(name = "ORDER_ID")
    private Long id;

    @Column(name = "MEMBER_ID")
    private Long memberId;

    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus status; // ORDER, CANCEL(주문 상태 enum)

    // getter, setter...
}
```

**나머지도 비슷하게 작성하기 때문에 생략..**

<br>

# 데이터 중심 설계의 문제점

- 현재 방식은 객체 설계를 테이블 설계에 맞춘 방식
- 테이블의 외래키를 객체에 그대로 가져옴
- 객체 크래프 탐색이 불가능
- 참조가 없으므로 UML도 잘못됨

## 문제점 예시

Order 테이블에서 id값을 알고 있고 조회를 통해 member객체를 찾기 위한 과정

```java
Order order = em.find(Order.class, 1L);
Long memberId = order.getMemberId();

Member member = em.find(Member.class, memberId);
```
객체지향 답지 않은 코드이다..

<br>

# 연관관계 매핑 시작

## 객체 구조

- 테이블 구조는 이전과 동일하기 때문에 생략..
- 객체 구조는 참조를 사용하도록 변경

![23](/images/JPA_ORM/23.jpg)

## Member.class(V2)

```java
@Entity
public class Member {

    @Id @GeneratedValue()
    @Column(name = "MEMBER_ID")
    private Long id;
    private String name;
    private String city;
    private String street;
    private String zipcode;

    @OneToMany(mappedBy = "member")
    private List<Order> orders = new ArrayList<>();

    // getter, setter...
}
```

## Order.class(V2)

```java
@Entity
@Table(name = "ORDERS")
public class Order {

    @Id @GeneratedValue
    @Column(name = "ORDER_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems = new ArrayList<>();

    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus status; // ORDER, CANCEL(주문 상태 enum)

    // 예시 코드
    public void addOrderItem(OrderItem orderItem) {
        orderItems.add(orderItem);
        orderItem.setOrder(this);
    }
    // getter, setter...
}
```

## OrderItem.class(V2)

```java
public class OrderItem {

    @Id @GeneratedValue
    @Column(name = "ORDER_ITEM_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ITEM_ID")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "ORDER_ID")
    private Order order;

    private int orderPrice;
    private int count;

    // getter, setter...
}
```

## 예시 JpaMain.class

```java
public class JpaMain {
    public Static void main(String[] args) {
        
        ...

        Order order = new Order();
        order.addOrderItem(new OrderItem());
    }
}
```

---

```java
public class Order{

    ...

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
```
이 코드의 의미는 호출한 해당 테이블(Order)에 name의 입력값인 `MEMBER_ID`라는 외래 키 컬럼이 생성된다.<br>
`Order` 클래스의 `member`변수에 `Member` 엔티티가 할당되면 `Order`를 저장할 때 `Member`엔티티의 PK를 외래 키 컬럼인 `MEMBER_ID`에 저장하게 된다.<br>
PK를 외래 키 컬럼에 저장하는 것이므로 `@Column(name = "MEMBER_ID")`와 같은 컬럼 설정 코드를 넣지 않아도 정상 동작하는 것이다.

<br>

# 다양한 연관관계 매핑

## 배송, 카테고리 추가

### 엔티티

- 주문과 배송은 1:1(**@OneToOne**)
- 상품과 카테고리는 N:M(**@ManyToMany**)<br>

![35](/images/JPA_ORM/35.jpg)

### ERD

![36](/images/JPA_ORM/36.jpg)

### 엔티티 상세

![37](/images/JPA_ORM/37.jpg)

**N:M 관게는 1:N, N:1로**
- 테이블의 N:M 관계는 중간 테이블을 이용해서 1:N, N:1
- 실무에서는 중간 테이블이 단순하지 않다.
- @ManyToMany 제약: 필드 추가X, 엔티티 테이블 불일치
- 실무에서는 **@ManyToMany 사용 X**

## Order.class(V3)

```java
@Entity
@Table(name = "ORDERS")
public class Order {

    @Id @GeneratedValue
    @Column(name = "ORDER_ID")
    private Long id;
    
    ...

    // 추가 코드
    @OneToOne
    @JoinColumn(name = "DELIVERY_ID")
    private Delivery delivery;

    ...

    // getter, setter...
}
```

## Delivery.class(추가)

```java
@Entity
public class Delivery {

    @Id @GeneratedValue
    @Column(name = "DELIVERY_ID")
    private Long id;

    @OneToOne(mappedBy = "delivery")
    private Order order;

    private String city;
    private String street;
    private String zipcode;
    private DeliveryStatus status;  // enum
}
```

## Category.class(추가)

```java
@Entity
public class Category {

    @Id @GeneratedValue
    @Column(name = "CATEGORY_ID")
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "PARENT_ID")
    private Category parent;

    @OneToMany(mappedBy = "parent")
    private List<Category> child = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "CATEGORY_ITEM",
            joinColumns = @JoinColumn(name = "CATEGORY_ID"),
            inverseJoinColumns = @JoinColumn(name = "ITEM_ID"))
    private List<Item> items = new ArrayList<>();
}
```
실무에서 `@ManyToMany`을 안쓰지만, 예제이기 때문에 예시로 사용함.

## Item.class(V3)

```java
@Entity
public class Item {

    ...

    @ManyToMany(mappedBy = "items")
    private List<Category> categoryList = new ArrayList<>();

    ...
}
```

<br>

# 상속관계 매핑

## 요구사항 추가

- 상품의 종류는 음반, 도서, 영화가 있고 이후 더 확장될 수도 있다.
- 모든 데이터는 등록일과 수정일이 필수이다.

## 도메인 모델

![43](/images/JPA_ORM/43.jpg)

### 도메인 모델 상세

![44](/images/JPA_ORM/44.jpg)

## 테이블 설계

![45](/images/JPA_ORM/45.jpg)

## Book.class

```java
@Entity
public class Book extends Item {
    private String author;
    private String isbn;

    // getter and setter ...
}
```
**Album, Movie는 동일하기에 생략..**

## Item.class(V4)

```java
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn
public abstract class Item extends BaseEntity{

    ...
}
```
- 직접 생성해 사용할 일이 없다고 판단하여 **추상 클래스**로 변경
- 테이블 설계에 맞춰 단일 테이블 전략으로 설정
- `DTYPE` 코드 추가
- 공통 부분 처리인 BaseEntity(`@MappedSuperclass`)를 상속받았다.

## BaseEntity.class

```java
@MappedSuperclass
public abstract class BaseEntity {

    private String createdBy;
    private LocalDateTime createdDate;
    private String lastModifiedBy;
    private LocalDateTime lastModifiedDate;

    // getter and setter ...
}
```
모든 클래스(Item.class를 상속받은 클래스 제외)에 BaseEntity를 상속받았다.

<br>

# 연관관계 관리

## 글로벌 패치 전략 설정

- 모든 연관관계를 지연 로딩으로 설정
- @ManyToOne, @OneToOne은 기본이 즉시 로딩이므로 지연 로딩으로 변경

## 영속성 전이 설정

- Order -> Delivery를 영속성 전이 ALL 설정
- Order -> OrderItem을 영속성 전이 ALL 설정

## Order.class

```java
@Entity
@Table(name = "ORDERS")
public class Order {

    @Id @GeneratedValue
    @Column(name = "ORDER_ID")
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "DELIVERY_ID")
    private Delivery delivery;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

    ...

    // getter, setter...
}
```
**나머지 클래스 설정은 생략..**

<br>

# 값 타입 매핑

![65](/images/JPA_ORM/65.jpg)

## Address.class
```java
@Embeddable
public class Address {

    private String city;
    private String street;
    private String zipcode;

    // getter and setter ...

    // equals(), HashCode() ...
}
```

## Member.class

```java
@Entity
public class Member extends BaseEntity{

    @Id @GeneratedValue()
    @Column(name = "MEMBER_ID")
    private Long id;
    private String name;

    @Embedded
    private Address address;

    ...

    // getter and setter ...
}
```

## Delivery.class

```java
@Entity
public class Delivery extends BaseEntity{

    @Id @GeneratedValue
    @Column(name = "DELIVERY_ID")
    private Long id;

    @Embedded
    private Address address;
    private DeliveryStatus status;
}
```

<br>

<출처 : [인프런 - 자바 ORM 표준 JPA 프로그래밍 - 기본편 (김영한)](https://www.inflearn.com/course/ORM-JPA-Basic)>