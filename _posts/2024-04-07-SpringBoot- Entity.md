---
layout: single
title:  "SpringBoot- Entity"
categories: SpringBoot
tag: [SpringBoot]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>





# ◆Entity 생성하기

## 1.1 Entity 란?

- 사전적 의미로는 개체, 실체의 의미를 가지며 JPA의 엔티티는 쉽게 말해 테이블, 컬럼과 같은 의미를 가진다.





## 1.2 Entity 어노테이션

|   어노테이션    | 설명                                                         |
| :-------------: | :----------------------------------------------------------- |
|       @Id       | 기본키 지정                                                  |
| @GeneratedValue | 자동으로 1씩 증가<br />속성 : strategy = GenerationType.IDENTITY(고유번호 생성) |
|     @Colum      | 열의 세부설정<br />속성 : columnDefinition : 열의 데이터 유형이나 세부설정<br />           length = 200 : 열의 데이터의 길이는 200으로 제한 |
|   @ManyToOne    | 부모자식 관계를 갖는 구조에서 사용한다. N:1관계              |
|   @OneToMany    | 부모자식 관계를 갖는 구조에서 사용한다. 1:N관계              |

<br>



**예제**

```java
package com.example.demo;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Answer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(columnDefinition = "TEXT")
	private String content;
	
	private LocalDateTime createDate;
	
	@ManyToOne
	private Question question;

}

```

```java
package com.example.demo;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Question {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(length = 200)
	private String subject;
	
	@Column(columnDefinition = "TEXT")
	private String content;
	
	private LocalDateTime createDate;
	
	@OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
	private List<Answer> answerList;

}

```

- mappedBy : 양방향 매핑을 할 때에는 아래와 같이 반드시 한쪽의 객체에 MappedBy 옵션을 설정해야 한다.

- cascade : PERSIST, MERGE, REMOVE, REFRESH, DETACH와 모든 옵션을 줄 수 있는 ALL입니다.

 <br>


---




# ◆양방향과 단방향 연관관계

테이블은 **외래 키로 조인을 사용해서 연관된 테이블을 찾고**객체는 **참조를 사용해서 연관된 객체를 찾는다.**
<br/>
<br/>
**`@OneToMany`** 기준으로 설명드리자면,

단방향(unidirectional)은 상대 엔티티에 `@ManyToOne`이 없는 경우,
양방향(bidirectional)은 상대 엔티티에 `@ManyToOne`이 있는 경우이다.
<br/>
<br/>
**`@ManyToOne`** 기준으로 설명드리자면,

단방향(unidirectional)은 상대 엔티티에 `@OneToMany`가 없는 경우,
양방향(bidirectional)은 상대 엔티티에 `@OneToMany`가 있는 경우이다.

<br>



---





# ◆연관관계의 주인과 mappedBy

그렇다면 객체는 객체 **연관관계가 두 가지라고 볼 수 있다.**

1. 질문 → 답변 연관관계 1개(단방향)
2. 답변 → 질문 연관관계 1개(단방향)

위 와 같이 **단방향 연관관계가 두가지 존재한다고 볼 수 있다.**
<br/>
<br/>

그렇다면 도대체 뭘로 매핑해야 할까?

**question에 answer값을 바꿧을때 외래키 값이 업데이트되어야 하는가?**

**answer에 question를 바꿨을 때 외래키 값이 업데이트되어야 하는가?**

 이런 딜레마가 존재 한다.
<br/>
<br/>
양방향 매핑 규칙은 그래서 연관관계의 주인을 지정하는 것이다.

객체의 두 관계 중 **하나를 연관관계의 주인으로 지정** 하고 **연관관계의 주인만이 외래 키를 관리(등록, 수정)**하는 것이다.

주인이 아닌 쪽은 **읽기만 가능**하다.
<br/>
<br/>
보통 **1 대 다 관계에서는 보통 다(N) 쪽이 외래키를 가지므로 다(N) 쪽이 관계의 주인이 된다.**

**JPA 설계를 할 때 단방향 매핑으로 설계를 끝내는 것이 좋다.**
<br>


---


참고 : <a href="https://colevelup.tistory.com/41">https://colevelup.tistory.com/41, <a href="https://velog.io/@goniieee/JPA-OneToMany-ManyToOne%EC%9C%BC%EB%A1%9C-%EC%97%B0%EA%B4%80%EA%B4%80%EA%B3%84-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0">https://velog.io/@goniieee/


