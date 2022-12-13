---
layout: single
title:  "JPA 연관관계 매핑"
categories: SpringBoot
tag: [Java, Spring, JPA, Spring Boot, join]
toc: true
toc_sticky: true
post-header: false

---

<head>
  <style>
    table.dataframe {
      white-space: normal;
      width: 100%;
      height: 240px;
      display: block;
      overflow: auto;
      font-family: Arial, sans-serif;
      font-size: 0.9rem;
      line-height: 20px;
      text-align: center;
      border: 0px !important;
    }

    table.dataframe th {
      text-align: center;
      font-weight: bold;
      padding: 8px;
    }

    table.dataframe td {
      text-align: center;
      padding: 8px;
    }

    table.dataframe tr:hover {
      background: #b8d1f3; 
    }

    .output_prompt {
      overflow: auto;
      font-size: 0.9rem;
      line-height: 1.45;
      border-radius: 0.3rem;
      -webkit-overflow-scrolling: touch;
      padding: 0.8rem;
      margin-top: 0;
      margin-bottom: 15px;
      font: 1rem Consolas, "Liberation Mono", Menlo, Courier, monospace;
      color: $code-text-color;
      border: solid 1px $border-color;
      border-radius: 0.3rem;
      word-break: normal;
      white-space: pre;
    }

  .dataframe tbody tr th:only-of-type {
      vertical-align: middle;
  }

  .dataframe tbody tr th {
      vertical-align: top;
  }

  .dataframe thead th {
      text-align: center !important;
      padding: 8px;
  }

  .page__content p {
      margin: 0 0 0px !important;
  }

  .page__content p > strong {
    font-size: 0.8rem !important;
  }

  </style>
</head>


## 연관관계 매핑

연관관계 매핑이란 객체의 참조와 테이블의 **외래키를 매핑**하는 것을 의미한다.

**JPA**에서는 **Mybatis**를 사용했을 때와 다르게 연관 관계에 있는 상대 테이블의 PK를 멤버변수로 갖지 않고, 엔티티 **객체 자체를 통째로 참조**한다.

### 용어

- **방향**
1. 단방향 관계 : 두 엔티티가 관계를 맺을 때, **한 쪽의 엔티티만 참조**하고 있는 것을 의미한다.
2. 양방향 관계 : 두 엔티티가 관계를 맺을 때, **양 쪽이 서로 참조**하고 있는 것을 의미한다.

데이터 모델링에서는 관계를 맺어주기만 하면 자동으로 양방향 관계가 되어 서로 참조하지만, 객체지향 모델링에서는 구현하고자 하는 서비스에 따라 단방향 관계인지, 양방향 관계인지 적절한 선택을 할 필요가 있다.

하지만, 어느 정도의 비즈니스에서는 단방향 관계만으로도 해결이 가능하기 때문에 양방향 관계를 꼭 해야하는 것은 아니다.

그리고 양방향 관계란 서로 다른 단방향 관계 2개를 묶어서 양방향인 것처럼 보이게 할 뿐, 양방향 연관 관계는 사실 존재하지 않는다고 할 수 있다.

- **다중성**
1. ManyToOne : 다대일 (N : 1)
2. OneToMany : 일대다 (1 : N)
3. OneToOne : 일대일 (1 : 1)
4. ManyToMany : 다대다 (N : M)

- **연관관계의 주인 (Owner)**

연관 관계에서 주인을 찾는 방법은 관계를 갖는 두 테이블에 대해서 **외래키를 갖는 테이블**이 연관 관계의 주인이라고 할 수 있다.

연관 관계의 주인만이 **외래키를 등록, 수정, 삭제**할 수 있고, 반면 주인이 아닌 엔티티는 읽기만 할 수 있기 때문이다.

### 예시 - @ManyToOne (단방향)

```java
@Entity
@Table
@Data
public class Categories {
	@Id
	@Column(name = "cate_seq")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long cateSeq;
	
	@Column(name = "cate_name", length = 400)
	private String cateName;
}

@Entity
@Table
@Data
public class Items {
	@Id
	@Column(name = "item_seq")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long itemSeq;
	
	@Column(name = "item_name", length = 45)
	private String itemName;
	
	@Column(name = "item_price")
	private int itemPrice;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cate_seq")
	private Categories categoriesVO;
}
```

단방향은 한 쪽의 엔티티가 상대 엔티티를 참조하고 있는 상태이다.

그래서 Items 엔티티에만 @ManyToOne 어노테이션을 추가했다.

- **@ManyToOne**
    
    @ManyToOne 어노테이션은 이름 그대로 다대일 관계 매핑 정보이다.
    
    Items 입장에서는 Categories 와 다대일 관계이므로 ManyToOne 어노테이션을 사용했다.
    
    연관 관계를 매핑할 때는 이렇게 다중성을 나타내는 어노테이션을 필수로 사용해야 하며, **엔티티 자신을 기준**으로 다중성을 생각해야 한다.
    
- @JoinColumn(name=”cate_seq”)
    
    @JoinColumn 어노테이션은 외래 키를 매핑할 때 사용한다.
    
    name 속성에는 매핑할 외래 키 이름을 지정한다.
    
    Items 엔티티의 경우 Categories 엔티티의 PK를 “cate_seq”라는 이름의 외래키를 가진다는 뜻으로 작성이 된다.