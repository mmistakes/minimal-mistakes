---
layout: single
title:  "Spring JPA 설정 및 사용 어노테이션"
categories: SpringBoot
tag: [Java, Spring, JPA, Spring Boot, STS, Eclipse]
toc: true
toc_sticky: true

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


## application.yml 설정

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    password: 1234
    url: jdbc:mysql://localhost:3306/mysql
    username: root
	# JPA 설정
  jpa:
    database-platform: org.hibernate.dialect.MySQL5InnoDBDialect   # 데이터베이스 종류
    hibernate:
      ddl-auto: update   # jpa로 entity 처음 생성시 테이블 없으면 create, 만든 다음엔 update로 변경해야함
    properties:
      hibernate:
        format_sql: true
    show-sql: true
```

## 엔티티와 매핑

### @Entity란 ?

@Entity가 붙은 클래스는 JPA가 관리하는 객체이다.

```java
@Entity
// 제약조건이나 테이블 명 등의 옵션 설정 가능
@Table(name = "BOARD2")
@Data
public class Board {
	
	@Id	// PK라는 뜻
	@GeneratedValue(strategy = GenerationType.IDENTITY)	// 자동증가 라는 뜻(strategy의 Identity: mysql)
	private Long idx;
	
	@Column(nullable = false)
	private String memId;
	
	@Column(length = 1000)	// 컬럼 상세 설정
	private String title;
	
	@Column(length = 2000)
	private String contents;
	
	@ColumnDefault("0")
	private int count;
	
	@Column(length = 100)
	private String writer;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Date indate;
	
}
```

- 객체와 테이블 매핑 : @Entity, @Table
- 기본키 매핑 : @Id
- 필드와 컬럼 매핑 : @Column
- 연관관계 매핑 : @ManyToOne, @JoinColumn
- 자동증가 : @GeneratedValue(strategy = GenerationType.IDENTITY)

### 1. @Entity

- 테이블과의 매핑
- JPA가 관리하는 것으로 엔티티라고 불림
- 속성
    - name : JPA에서 사용할 엔티티 이름을 지정, 보통 기본값인 클래스 이름을 사용

### 2. @Table

- 에니티와 매핑할 테이블을 지정
- 생략 시 매핑한 엔티티 이름을 테이블 이름으로 사용
- 속성
    - name : 매핑할 테이블 이름 (default : 엔티티 이름 사용)
    - catalog : catalog 기능이 있는 DB에서 catalog를 매핑
    - schema : schema 기능이 있는 DB에서 schema를 매핑
    - uniqueConstraints : DDL 생성 시 **유니크 제약조건을 생성**, 스키마 자동생성 기능을 사용해서 DDL을 만들때만 사용됨

### 3. @Column

- 객체 필드를 테이블 컬럼에 매핑
- 속성
    - name : 필드와 매핑할 테이블 컬럼 이름 (default : 객체의 필드 이름)
    - nullable (DDL) : **null 값의 허용 여부** 설정, false : not null (default : true)
    - unique (DDL) : @Table의 uniqueConstraints와 같지만 **한 컬럼에 간단히 유니크 제약조건**을 적용
    - columnDefinition (DDL) : 데이터베이스 **컬럼 정보**를 **직접** 줄수 있음
    - length (DDL) : 문자 길이 제약조건, **String** 타입에만 적용 (default : 255)
    - percision, scale (DDL) : **BigDecimal, BigInteger** 타입에만 적용, 아주 큰 숫자나 정밀한 소수를 다룰때 사용 (default : precision = 19, scale = 2)

### 4. @Enumerated

- 자바의 enum 타입을 매핑할 때 사용
- EnumType.ORDINAL : enum 순서를 데이터베이스에 저장
- EnumType.STRING : enum 이름을 데이터베이스에 저장 (default : EnumType.ORDINAL)

### 5. @Temporal

- 날짜 타입(java.util.Date, java.util.Calendar)을 매핑할 때 사용
- 자바의 Date 타입에는 년월일 시분초가 있지만, 데이터베이스에는 date(날짜), time(시간), timestamp(날짜와 시간)라는 세 가지 타입이 별도로 존재
- @Temporal을 생략하면 자바의 Date와 가장 유사한 **timestamp**로 정의
- 하지만 timestamp대신에 **datetime**을 예약어로 사용하는 데이터베이스도 있는데, 데이터베이스 방언 덕분에 애플리케이션 코드는 변경하지 않아도 됨
- datetime : MySQL
- timestamp : H2, 오라클, PostgreSQL
    1. TemporalType.**DATE**
     : 날짜, 데이터베이스 date 타입과 매핑 (예 : 2013-10-11)
    2. TemporalType.**TIME**
     : 시간, 데이터베이스 time 타입과 매핑 (예 : 11:11:11)
    3. TemporalType.**TIMESTAMP**
     : 날짜와 시간, 데이터베이스 timestamp 타입과 매핑 (예 : 2013-10-11 11:11:!1)

### Default 값을 넣는 방법

**@DynamicInsert :** Default값을 적용하기 위해서는 이 어노테이션을 써야한다. Insert 시 지정된 Default값을 적용시킨다.

**@ColumnDefault :** ColumnDefault는 Default값 설정을 할 때 사용한다.

## @Builder 어노테이션 올바른 사용

Entity를 선언할 때 주의점

1. @Setter : 객체가 무분별하게 변경될 가능성이 있다
2. @NoArgsConstructor : 기본 생성자의 접근 제어자가 불명확하다
3. @AllArgsConstructor : 객체 내부의 인스턴스멤버들을 모두 가지고 있는 생성자를 생성한다

@Builder 어노테이션을 사용하여 문제점들을 해결할 수 있다.

- 객체 생성자

```java
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
	
	@Id
	private String memId;
	
	@Column(length = 100)
	private String memPwd;
	
	@Column(length = 100)
	private String memName;
	
	// 의미있는 객체 생성
	@Builder
	public Member(String memId, String memPwd, String memName) {
		this.memId = memId;
		this.memPwd = memPwd;
		this.memName = memName;
	}
}
```

- 테스트 코드

```java
@Test
	void insertMember() {
		Member vo = Member.builder()
				.memId("admin")
				.memPwd("1234")
				.memName("관리자").build();
		
		mRepository.save(vo);
	}
```