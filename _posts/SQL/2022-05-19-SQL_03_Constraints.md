---
layout : single
title :   SQL 제약조건 5가지
categories:
  - Blog
tags:
  - Blog
---

> ### 데이터 제약조건 5가지



| **CONSTRAINT_TYPE** |     **의   미**     |
| :-----------------: | :-----------------: |
|        **P**        |   **PRIMARY KEY**   |
|        **R**        |   **FOREIGN KEY**   |
|        **U**        |     **UNIQUE**      |
|        **C**        | **CHECK, NOT NULL** |

1. NOT NULL

~~~sql
 CREATE TABLE ex2_6(
    COL_NULL    VARCHAR2(10),
    COL_NOT_NULL VARCHAR2(10) NOT NULL -- NOT NULL 제약조건객체가 생성됨. 이름을 지정하지 않으면, 오라클이 자동으로 생성함.(SYS_ 이름패턴)
);
~~~

---



2. UNIQUE

~~~sql
-- 2)UNIQUE : 컬럼의 값이 유일해야 한다. 중복값 허용안됨
-- 단일컬럼, 복합컬럼
-- 테이블에 UNIQUE 제약조건은 여러개 설정이 가능한다

-- 테이블 생성시 제약조건을 설정하는 구문 2가지 형식
-- 1)컬럼수준제약 : 컬럼명 데이터타입 제약조건명령어
-- 2)테이블수준제약 : CONSTRAINTS 제약조건객체이름 제약조건명령어 (칼럼명)

CREATE TABLE ex2_7(
    COL_UNIQUE_NULL     VARCHAR2(10)    UNIQUE, -- UNIQUE 제약조건 객체가 이름이 자동생성. SYS_
    COL_UNIQUE_NNULL    VARCHAR2(10)    UNIQUE NOT NULL,
    COL_UNIQUE          VARCHAR2(10),
    CONSTRAINTS unique_nm1 UNIQUE (COL_UNIQUE)
);

CREATE TABLE ex2_7_2(
    COL_UNIQUE_NULL     VARCHAR2(10)    UNIQUE, -- UNIQUE 제약조건 객체가 이름이 자동생성. SYS_
    COL_UNIQUE_NNULL    VARCHAR2(10)    UNIQUE NOT NULL,
    COL_UNIQUE          VARCHAR2(10),
    CONSTRAINTS unique_nm2 UNIQUE (COL_UNIQUE)
);

CREATE TABLE ex2_7_3(
    COL_UNIQUE_NULL     VARCHAR2(10)    CONSTRAINTS unique_nm_01 UNIQUE, -- UNIQUE 제약조건 객체가 이름이 자동생성. SYS_
    COL_UNIQUE_NNULL    VARCHAR2(10)    CONSTRAINTS unique_nm_02 UNIQUE NOT NULL,
    COL_UNIQUE          VARCHAR2(10),
    CONSTRAINTS unique_nm3 UNIQUE (COL_UNIQUE)
);
~~~

---



3. PRIMARY KEY

~~~sql
-- 3)기본키(PRIMARY KEY) : NOT NULL + UNIQUE
-- 테이블에 단 1개만 설정할 수가 있다. (참고로, UNIQUE는 여러개 설정 가능)
-- 단일키 : 컬럼 1개를 대상으로 설정
-- 복합키 : 여러 컬럼을 대상으로 설정

CREATE TABLE ex2_8(
    COL1    VARCHAR2(10) PRIMARY KEY, --NOT NULL + UNIQUE
    COL2    VARCHAR2(10)
);

-- PRIMARY KEY를 복합키로 설정하는 방법 : 테이블 수준제약 문법 형식을 사용
CREATE TABLE complex_1(
    A   VARCHAR2(10),
    B   VARCHAR2(10),
    C   VARCHAR2(10),
    CONSTRAINTS PK_COMPLEX_NM1 PRIMARY KEY(A, B)
);
~~~

---



4. FOREIGH KEY

~~~sql
-- 4) 참조키 (FOREIGN KEY)
-- 기본키 테이블(DEPT)은 DEPT_CODE 컬럼이 PRIMARY KEY 설정이 되어 있어야한다
-- 참조키 테이블(EMP)의 DEPT_CODE 칼럼명은 DEPT테이블의 DEPT_CODE 컬럼명은 동일하지 않아도 상관없다
-- (보통 칼럼명을 동일하게 한다)
-- 타입은 일치하거나 호환되어야 한다
-- 참조키도 복합키 작업이 가능하다

-- 기본키 테이블
CREATE TABLE DEPT(
    DEPT_CODE   VARCHAR2(2) PRIMARY KEY,
    DEPT_NAME   VARCHAR2(20)    NOT NULL
);

-- 참조키 테이블
-- 테이블 수준 제약
CREATE TABLE EMP (
    EMP_ID       VARCHAR2(2)     PRIMARY KEY,
    EMP_NAME     VARCHAR2(20)    NOT NULL,
    DEPT_CODE    VARCHAR2(2)     NOT NULL,
    FOREIGN KEY(DEPT_CODE) REFERENCES DEPT(DEPT_CODE)
);
~~~

- 두 개의 테이블을  관계형모델로 도식화
- 보기메뉴 - DATA MODELER - 브라우저 - 관계형모델 - 새모델  - 우클릭 옮겨넣기

---

5. CHECK

~~~sql
-- 5)CHECK 제약조건 : 컬럼에 입력되는 데이터를 체크해서 설정된 데이터만 입력을 가능하게 하는 기능
-- 사용법 : 칼럼 데이터형태 체크명 CHECK (칼럼 (조건))

CREATE TABLE ex2_9(
    num1    NUMBER
        CONSTRAINTS check1 CHECK (num1 BETWEEN 1 AND 9),
    gender  VARCHAR2(10)
        CONSTRAINTS check2 CHECK (gender IN ('MALE', 'FEMALE'))
);
~~~
