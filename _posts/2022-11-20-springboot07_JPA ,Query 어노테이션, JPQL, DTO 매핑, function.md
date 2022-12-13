---
layout: single
title:  "JPA ,Query 어노테이션, JPQL, DTO 매핑, function 사용"
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

### JPA 장점

- SQL문이 아닌 Method를 통해 DB를 조작할 수 있어 개발자가 비즈니스 로직 구성에 좀 더 집중할 수 있음
- 쿼리문 등의 부수적인 코드가 줄어들어 가독성이 높아짐
- 오직 객체지향적 접근만 고려되므로 생산정 증가
- 매핑 정보가 Class로 명시되어 있어서 ERD를 보는 의존도를 낮출 수 있고 유지보수 및 리팩토링에 유리

### JPA 단점

- 프로젝트의 규모가 크고 복잡하여 설계가 잘못된 경우, 속도 저하 및 일관성을 무너뜨리는 문제점이 생길 수 있음
- 복잡하고 무거운 Query는 속도를 위해 별도의 튜닝이 필요하기 때문에 결국 SQL문을 써야할 수도 있음

JPA가 쿼리를 자동으로 생성해주지만 상황에 따라 직접 쿼리를 작성할 필요가 생긴다.

### JPA에서 직접 쿼리를 작성할 수 있는 방법

- JPQL 작성
- 네이티브 쿼리(일반 SQL) 작성

JPQL은 JPA의 일부분으로 정의된 플랫폼 독립적인 **객체지향 쿼리 언어**이다.

**네이티브 쿼리는 데이터베이스를 바라보고 작성**한다면 **JPQL은 엔티티 클래스를 바라보고 작성**해야 한다.

JPQL에서는 **대 소문자 구분**을 하고 select, from과 같은 **키워드는 구분하지 않는다.**

## @Query 어노테이션

JpaRepository에서 쿼리(JPQL, native query 둘 다)를 직접 작성해줄 때 사용한다.

메서드 명은 기존 자동생성 방식과 달리 **자유롭게 작성**할 수 있다.

그리고 **nativeQuery**라는 속성을 이용하여 JPQL로 작성한 것인지 SQL로 작성한 것인지 구분할 수 있다.

- nativeQuery = false(default) → JPQL
- nativeQuery = true → SQL

### Entity : Broadcasting (방송 정보)

```java
@Entity
@Table
@Data
public class Broadcasting {
	
	@Id
	@Column(name = "bc_seq")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long bcSeq;
	
	@Column(name = "bc_title", nullable = false, length = 400)
	private String bcTitle;
```

### Entity : ViewerReaction (시청자 반응)

```java
@Entity
@Table(name = "viewer_reaction")
@Data
public class ViewerReaction {
	@Id
	@Column(name ="vr_seq")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long vrSeq;
	
	@Column(name ="vr_viewers", nullable = false)
	private int vrViewers;
	
	@Column(name ="vr_sales", nullable = false)
	private int vrSales;
	
	@Column(name ="vr_comments", nullable = false)
	private int vrComments;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "bc_seq")
	private Broadcasting broadcastingVO;
}
```

### 1. @Query 사용 방법 (일반 쿼리)

JPQL은 **엔티티의 이름과 속성명을 사용**하고, 일반 SQL은 **설계된 테이블명과 칼럼명** 사용

```java
@Repository                                       
public interface ViewerReactionRepository extends JpaRepository<ViewerReaction, Long> {
	
	// JPQL 사용
	@Query(value = "select vr.vrSeq from ViewerReaction vr")
	List<Long> selectAllVrSeq();
	// 일반 SQL 사용
	@Query(value = "select vr.vr_seq from viewer_reaction vr", nativeQuery = true)
	List<Long> selectAllVr_seq();	
}
```

### 2. @Query 사용 방법 (파라미터 사용)

```java
@Repository                                       
public interface ViewerReactionRepository extends JpaRepository<ViewerReaction, Long> {
	
	// JPQL 일반 파라미터 쿼리, @Param 사용 X, 엔티티 변수명 "vrSeq" 사용
	@Query(value = "select vr from ViewerReaction " +
				"vr where vr.vrSeq = ?1")
	List<ViewerReaction> selectAllByVrSeq(long seq);

	// 일반 SQL문 파라미터 쿼리 ,@Param 사용 X, 테이블 컬럼명 "vr_seq" 사용
	@Query(value = "select * from viewer_reaction " + 
				"where vr_seq = ?1", nativeQuery = true)
	List<ViewerReaction> selectAllByVr_seq(long seq);

	// JPQL 일반 파라미터 쿼리, @Param 사용 O
	@Query(value = "select vr from ViewerReaction vr where vr.vrSeq = :seq")
	List<ViewerReaction> selectAllByVrSeq2(@Param(value = "seq") long seq);

	// 일반 SQL문 파라미터 쿼리 ,@Param 사용 O
	@Query(value = "select * from viewer_reaction " +
				"where vr_seq = :seq", nativeQuery = true)
	List<ViewerReaction> selectAllByVr_seq2(@Param(value = "seq") long seq);

	// JPQL 객체 파라미터 쿼리, :#{#객체명}으로 사용
	@Query(value = "select vr.vrTitle from ViewerReaction vr " +
				"where vr.vrSeq < :#{#bc.bcSeq}")
	List<String> selectVrTitleByBc(@Param(value = "bc") Broadcasting bc)

	// 일반 SQL문 객체 파라미터 쿼리, :#{#객체명}으로 사용
	@Query(value = "select vr_title from viewer_reaction "
			+"where vr_seq < :#{#bc.bcSeq}", nativeQuery = true)
	List<String> selectVrTitleByBc(@Param(value = "bc") Broadcasting bc)
```

### 3. @Query 사용 방법(집계 함수 단독)

객체 파라미터를 사용할 때 여기서는 ManyToOne 매핑이 되어 ViewerReaction 엔티티가 Broadcasting의 매핑 주인이 된다.

그러므로, JPQL 사용 할 때에는 외래키 속성 변수가 객체 형태가 되므로 주의해서 참고

```java
@Repository                                       
public interface ViewerReactionRepository extends JpaRepository<ViewerReaction, Long> {	
	
	// 집계함수 SUM 사용
	// JPQL 사용, broadcastingVO 형태
	@Query(value = "select SUM(vr.vrSales) from ViewerReaction vr "
			+ "where vr.broadcastingVO = :#{#bc}")
	Integer vrSalesSum(@Param("bc") Broadcasting bc);

	// 일반 SQL 사용, 테이블에선 컬럼이 객체 형태가 아님
	@Query(value = "select SUM(vr.vr_sales) from viewer_reaction vr "
			+ "where vr.bc_seq = :bcSeq", nativeQuery = true)
	Integer vrSalesSum(@Param("bcSeq") long bcSeq);
```

## DTO Mapping

JPQL을 작성하면서 여러 `function`과 `join`을 사용하다보면 결과가 Entity 형태로 나오지 않을 경우도 있다. 이를 위해 **DTO 반환**이 필요하다.

**@Query** 어노테이션을 사용하여 DTO 반환을 하기 위해서는 **select 구분에서 생성자를 통해 객체를 반환**해야 한다.

### Entity : User

```java
@Entity
@Table(name = "user")
@Data
public class User {
	@Id
	private String id;
	private String name;
	private String phone;
	private String deptId;
}
```

### JpaRepository

```java
public interface UserRepository extends JpaRepository<User, String> {
	@Query(value = "select u from User u where u.name = :name")
	List<User> findByName(@Param("name") String name);
}
```

### DTO

```java
@Data
public class UserDTO {
	private String id;
	private String name;
	private String deptId;
	private String deptName;
}
```

### @Query로 DTO 반환하기

```java
public interface UserRepository extends JpaRepository<User, String> {
	@Query(value = "select" +
				"new com.yoonkie.dto.UserDto(u.id, u.name, u.deptId, d.deptName " +
				"from User u left outer join Dept d on u.deptId = d.deptId")
	List<UserDTO> findUserDept();
}
```

## SQL Function

JPQL에서는 기본적으로 select 구문의 **max, min, count, sum, avg**를 제공하며 `기본 function` 으로는 **COALESCE, LOWER, UPPER** 등을 지원하며 자세한 Function은 문서를 참고하면 된다.

```java
public interface UserRepository extends JpaRepository<User, String> {
	@Query(value = "select max(u.id) " +
				"from User user " +
				"where u.deptId is not null")
	String findMaxUserId();
}
```

이러한 JPQL에서 기본적으로 지원하는 `ANSI Query Function`만으로는 비지니스 조회를 해결하기에 한계가 존재한다.

`DataBase Function` 을 사용하는 방식은 JPQL에서 `function()` 을 활용하여 **hibernate에 등록된** 각 DataBase의 `Dialect에 정의된 function`을 사용하는 방법이 있다.

```java
public interface UserRepository extends JpaRepository<User, String> {
	@Query(value = "select function('date_format', :date, '%Y/%m/%d') " +
				"from User u"
	String findNow(@Param("date") LocalDateTime date);
}
```

하지만, **hibernate**에서 기본적으로 등록되는 function에서도 **누락되는 function이 존재**한다. 이러한 경우 `MetadataBuilderContributor`의 **구현체를 구현하는 방식**으로 사용할 수 있다.

(이전에는 **Dialect를 상속받아 구현하는 방식** 사용)

```java
public class MyMetadataBuilderContributor implements MetadataBuilderContributor{
	@Override
	public void contribute(MetadataBuilder metadataBuilder) {
		metadataBuilder.applySqlFunction("JSON_EXTRACT", new StandardSQLFunction("JSON_EXTRACT", StringType.INSTANCE))
						.applySqlFunction("JSON_UNQUOTE", new StandardSQLFunction("JSON_UNQUOTE", StringType.INSTANCE))
						.applySqlFunction("STR_TO_DATE", new StandardSQLFunction("STR_TO_DATE", LocalDateType.INSTANCE))
						.applySqlFunction("MATCH_AGAINST", new SQLFunctionTemplate(DoubleType.INSTANCE, "MATCH (?1) AGAINST (?2 IN BOOLEAN MODE)"))
	}
}
```

`applySqlFunction`의 첫번째 파라미터는 **JPQL**에서 `function(”함수명”)`에서 **함수명**에 해당하는 등록명이다.

`StandardSQLFunction`은 **기본적인 함수를 등록하기 위한 Class**로 생성자의 **첫번째 파라미터**는 `실제 DataVase Function명`이며, **두번째 파라미터**는 function의 `리턴 타입`이 되야 한다.

`StandardSQLFunction`의 경우 파라미터는 함수에 순서에 맞게 **JPQL function(’등록 함수명’, 파라미터1, 파라미터2, …) 같이 정의**하여 사용하면 된다.

`SQLFunctionTemplete`은 **문법이 존재하는 function을 등록할 때 사용가능**하며, **첫번째 파라미터**가 `function의 리턴타입`이고, **두번째 파라미터**가 `function`이다.

**?1, ?2**와 같이 명시하여 JPQL function()에서 전달되는 **파라미터**의 순서대로 파싱된다.

```java
public interface UserRepository extends JpaRepository<User, String> {
	@Query(value = "select u from User u " +
				"where function('JSON_UNQUOTE', function('JSON_EXTRACT', u.phone, '$.id')) = 'admin' ")
	List<User> findAllByPhoneAdmin();
}
```

```java
public interface UserRepository extends JpaRepository<User, String> {
	@Query(value = "select user from User u" +
				"where function('MATCH_AGAINST', u.name, :name) > 0")
	List<User> findAllByName(@Param("name") String name);

}
```