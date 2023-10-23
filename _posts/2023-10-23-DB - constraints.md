---
ayout: single
title:  "oracle - Constraints"
categories: oracle
tag: [Constraints]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>







# ◆Constraints(제약조건)

제약조건은 컬럼에 어떠한 조건을 거는 것을 말한다.



| **Constraints**         | **NULL 허용 여부**                                           | **데이터 중복 허용여부**                       | **특징**                                                     |
| ----------------------- | ------------------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------------ |
| **NOT NULL**            | NULL 불가                                                    | 중복 가능                                      | 테이블당 여러개 지정가능                                     |
| **UNIQUE**              | NULL 가능                                                    | 중복 불가(* NULL끼리는 중복으로 간주하지 않음) | 테이블당 여러개 지정가능                                     |
| **PRIMARY KEY(고유키)** | NULL 불가                                                    | 중복 불가                                      | 지정한 열은 유일한 값을 반드시 가져야 함테이블 당 1개만 지정가능 |
| **FOREIGN KEY(외래키)** | 다른 테이블 열을 참조하여해당 테이블에 존재하는 값만 입력 가능다른 테이블의 고유키(PRIMARY KEY)를 참조 |                                                | 테이블당 여러개 지정가능                                     |
| **CHECK**               | 설정한 조건식을 만족하는 데이터만 입력가능조건식을 만족하지 않는 데이터는 입력이 거부됨 |                                                | 테이블당 여러개 지정가능                                     |

<br>







# ◆Primary Key(기본키)

테이블 당 하나만 가질 수 있는 키로서 해당 키를 가진 컬럼의 데이터는 중복이 불가하다. primary key는 unique와 not null의 속성이 있다.

```java
--첫번째 방식
CREATE TABLE 테이블명(
	컬럼명 데이터 형식 PRIMARY KEY
);

--두번째 방식
CREATE TABLE 테이블명(
	컬럼명 데이터형식, 
    CONSTRAINT PK PRIMARY KEY(컬럼명)
);
```

<br>







# ◆Foreign Key(외래키)

외부의 테이블을 참조 시키고 싶을 때 해당 키를 컬럼에 지정햇 외부 테이블의 컬럼과 연동가능하다.

**주의할점**

- 부모 테이블(참조해야 하는 테이블)의 컬럼은 PRIMARY KEY 또는 UNIQUE로 지정되어야 한다.
- 부모 테이블에 없는 값은 자식 테이블에 추가할 수 없다. 즉 부모 테이블에 있는 값만 자식 테이블이 가질 수 있다.

```java
CREATE TABLE 테이블명(
     컬럼명 데이터형식,
     CONSTRAINT 외래키명 FOREIGN KEY (적용 컬럼명)
     REFERENCES 참조테이블명 (참조테이블 내 참조할 컬럼명)
     ON DELETE CASCADE(선택 사항)
);
```



**ON DELETE CASCADE, ON DELETE SET NULL**

-ON DELETE CASCADE : 부모테이블의 값을 삭제하면 자식 테이블의 값도 연동하여 삭제한다.<br>-ON DELETE SET NULL : 부모테이블의 값을 삭제하면 자식 테이블의 값도 연동하여 삭제한다.

<br>







# ◆Unique(고유 키, 유일키)

PRIMARY KEY와 비슷하지만, 차이점이 있다.

```java
--첫번째 방식
CREATE TABLE 테이블명(
     컬럼명 데이터형식 UNIQUE
);

--두번째 방식
CREATE TABLE 테이블명(
     컬럼명 데이터 형식
     CONSTRAINT UK UNIQUE(컬럼명)
);
```

<br>







# ◆Check

입력되는 값이 check을 통해 미리 지정한 조건에 맞지 않으면 오류를 반환한다.

```java
--첫번째 방식
CREATE TABLE 테이블명(
     컬럼명 데이터 형식 CHECK(컬럼명 > 조건값)
);

--두번째 방식
CREATE TABLE 테이블명(
     컬럼명 데이터형식
     CONSTRAINT CK CHECK (컬럼명 > 조건값)
);
```

<br>









# ◆Not Null

NOT NULL은 해당 컬럼에 NULL값을 허용하지 않는다는 키다. NULL 뿐 아니라 공백문자열은 허용하지 않는다.

```java
CREATE TABLE 테이블명(     
	컬럼명 데이터 형식 NOT NULL
);
```







참고 블로그 : <a href="https://sgcomputer.tistory.com/250">오라클 제약 조건 (CONSTRAINTS) :: 컴퓨터 공부하는 블로그</a>
