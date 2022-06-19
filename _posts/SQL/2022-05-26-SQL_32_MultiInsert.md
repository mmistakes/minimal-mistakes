---
layout : single
title : SQL 다중테이블 INSERT
categories:
  - Blog
tags:
  - Blog
---





> ### 다중 테이블 INSERT 구문

~~~sql
-- 다중 테이블 INSERT 구문은 단 하나의 INSERT 문장으로 여러 개의 INSERT 문을 수행하는 효과를 낼 수 있을 뿐만 아니라
-- 특정 조건에 맞는 데이터만 특정 테이블에 입력되게 할 수 있는 문장이다.
-- 먼저 다중 테이블 INSERT 문의 구문을 살펴 보자.

-- INSERT ALL| FIRST
-- WHEN 조건1 THEN
-- INTO [스키마.]테이블명(컬럼1, 컬럼2, ...) VALUES(값1, 값2, ...)
-- WHEN 조건2 THEN
-- INTO [스키마.]테이블명(컬럼1, 컬럼2, ...) VALUES(값1, 값2, ...)
-- ...
-- ELSE
-- INTO [스키마.]테이블명(컬럼1, 컬럼2, ...) VALUES(값1, 값2, ...)
-- SELECT 문;
~~~

1. ALL : 디폴트 값으로 이후 WHEN 조건절을 명시했을 때 각 조건이 맞으면

   ​         INSERT를 모두 수행하라는 의미다.

2. FIRST: 이후 WHEN 절 조건식에 따른 INSERT문을 수행할 때,

   ​            서브 쿼리로 반환된 로우에 대해 조건이 참인 WHEN 절을 만나면 해당 INSERT문을 수행하고

   ​            나머지에 대해서는 조건 평가를 하지 않고 끝낸다.

3. WHEN 조건 THEN … ELSE: 특정 조건에 따라 INSERT를 수행할 때 해당 조건을 명시.

4. SELECT 문: 다중 테이블 INSERT 구문에서는 반드시 서브 쿼리가 동반되어야 하며,

   ​                    서브 쿼리의 결과를 조건에 따라 평가해 데이터를 INSERT 한다.

5. 여기까지만 보면 아직 감이 오지 않을 것이다.

   어떤 식으로 활용하고 사용하는지 각 유형별로 살펴보기로 하자.

---

> ###### INSERT ALL

~~~sql
CREATE TABLE EX7_3 (
    EMP_ID      NUMBER,
    EMP_NAME    VARCHAR2(100)
);

CREATE TABLE EX7_4 (
    EMP_ID      NUMBER,
    EMP_NAME    VARCHAR2(100)
);

CREATE TABLE EX7_5 (
    EMP_ID      NUMBER,
    EMP_NAME    VARCHAR2(100)
);

-- 다중 테이블 INSERT문
INSERT ALL
    INTO EX7_3 VALUES(103, '강감찬')
    INTO EX7_3 VALUES(104, '연개소문')
SELECT * FROM DUAL; -- 서브쿼리가 와야한다. 지금은 의미없는 문법형식

-- 형식을 넣고 SELECT 문으로 데이터 입력
INSERT ALL
    INTO EX7_3 VALUES(EMP_ID, EMP_NAME)
SELECT 103 EMP_ID, '강감찬' EMP_NAME FROM DUAL
UNION ALL
SELECT 104 EMP_ID, '연개소문' EMP_NAME FROM DUAL;

-- 테이블명이 EX7_3, EX7_4 각각 다르다
INSERT ALL
    INTO EX7_3 VALUES(105, '가가가')
    INTO EX7_4 VALUES(106, '나나나')
SELECT * FROM DUAL;

-- 테이블 데이터 삭제
TRUNCATE TABLE EX7_3;
TRUNCATE TABLE EX7_4;


-- 이번에는 서브 쿼리를 사용할 것이므로 사원 테이블에서 부서번호가
-- 30번과 90번에 속하는 사원의 사번과 이름을 선택해
-- 30번 부서 사원들은 ex7_3 테이블에, 90번 부서 사원들은 ex7_4 테이블에
-- INSERT 하는 구문을 만들어 보자.
INSERT ALL
    WHEN DEPARTMENT_ID = 30 THEN
        INTO EX7_3 VALUES(EMPLOYEE_ID, EMP_NAME)
    WHEN DEPARTMENT_ID = 90 THEN
        INTO EX7_4 VALUES(EMPLOYEE_ID, EMP_NAME)
    ELSE
        INTO EX7_5 VALUES(EMPLOYEE_ID, EMP_NAME) -- 나머지 데이터
SELECT DEPARTMENT_ID, EMPLOYEE_ID, EMP_NAME
FROM EMPLOYEES;
~~~

---

> ###### INSERT FIRST

~~~sql
-- INSERT FIRST문
-- 서브쿼리문
SELECT DEPARTMENT_ID, EMPLOYEE_ID, EMP_NAME,  SALARY
FROM EMPLOYEES
WHERE DEPARTMENT_ID = 30;

-- 이 중에서 1)사번이 116번 보다 작은 사원은 EX7_3 테이블에
--          2)급여가 5000보다 작은 사원은 EX7_4 테이블에 삽입
-- 1) INSERT ALL
INSERT ALL
    WHEN EMPLOYEE_ID < 116 THEN
        INTO EX7_3 VALUES(EMPLOYEE_ID, EMP_NAME)
    WHEN SALARY < 5000 THEN
        INTO EX7_4 VALUES(EMPLOYEE_ID, EMP_NAME)
SELECT DEPARTMENT_ID, EMPLOYEE_ID, EMP_NAME,  SALARY
FROM EMPLOYEES
WHERE DEPARTMENT_ID = 30;

-- 2) INSERT FIRST
-- 조건식 중에 TRUE가 처음인 경우만 실행
-- 위족 WHEN에서 맞는 데이터를 가져가면 아래 WHEN에서 제외됨
INSERT FIRST
    WHEN EMPLOYEE_ID < 116 THEN
        INTO EX7_3 VALUES(EMPLOYEE_ID, EMP_NAME)
    WHEN SALARY < 5000 THEN
        INTO EX7_4 VALUES(EMPLOYEE_ID, EMP_NAME)
SELECT DEPARTMENT_ID, EMPLOYEE_ID, EMP_NAME,  SALARY
FROM EMPLOYEES
WHERE DEPARTMENT_ID = 30;
~~~

