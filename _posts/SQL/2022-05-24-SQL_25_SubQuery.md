---
layout : single
title : SQL 서브쿼리
categories: SQL
tags: [SQL]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---







> ### 서브 쿼리 

- SQL 문장 안에서 보조로 사용되는 또 다른 SELECT문을 의미한다



---



> #### 연관성이 없는 서브쿼리 유형 3가지

- 연관성 없는 서브쿼리
- 메인쿼리와의 연관성이 없는 서브쿼리를 말한다
- 즉 메인 테이블과 조인 조건이 걸리지 않는 서브쿼리를 가리킨다

---



> ###### 유형1

~~~sql
-- 전 사원의 평균 급여 이상을 받는 사원 수를 조회하는 쿼리
-- 1) 전 사원의 평균 급여
SELECT AVG(SALARY) FROM EMPLOYEES;

-- 2) 조건식 : 전 사원의 평균 급여 < 급여 인원수
SELECT COUNT(*) -- 메인쿼리
FROM EMPLOYEES
WHERE SALARY >= (SELECT AVG(SALARY) FROM EMPLOYEES); -- 서브쿼리
~~~



---

> ###### 유형2

~~~sql
-- 부서 테이블에서 PARENT_ID가 NULL인 부서번호를 가진 사원의 총 건수를 반환하는 쿼리다
-- 1) 부서 테이블에서 PARENT_ID가 NULL인 부서번호
SELECT DEPARTMENT_ID FROM DEPARTMENTS WHERE PARENT_ID IS NULL;

-- 2) 조식식 : 부서 테이블에서 PARENT_ID가 NULL인 부서번호
-- IN 사용시 : 서브쿼리의 결과값이 여러개 값일 경우 사용
-- 예) IN (값1, 값2, 값3, ...)
SELECT COUNT(*)
FROM EMPLOYEES
WHERE DEPARTMENT_ID IN ( SELECT DEPARTMENT_ID
                         FROM DEPARTMENTS
                         WHERE PARENT_ID IS NULL);
                         
-- 관계 연산자(>, <, >=, <=, =, !=)를 사용시, 서브쿼리의 결과값이 단일값이어야 한다
-- 서브쿼리의 값이 여러개 반환되면, 에러발생
SELECT COUNT(*)
FROM EMPLOYEES
WHERE DEPARTMENT_ID = ( SELECT DEPARTMENT_ID
                         FROM DEPARTMENTS
                         WHERE PARENT_ID IS NULL);
                         
-- 서브쿼리의 결과가 동시에 2개 이상의 컬럼 값을 갖는 경우
-- 비교시 2개의 컬럼값은 동시에 만족이 되어야 한다
SELECT EMPLOYEE_ID, EMP_NAME, JOB_ID
FROM EMPLOYEES
WHERE (EMPLOYEE_ID, JOB_ID) IN ( SELECT EMPLOYEE_ID, JOB_ID
                                 FROM JOB_HISTORY);
~~~



---



> ###### 유형3

~~~sql

-- 서브 쿼리는 SELECT문 뿐만 아니라 다음과 같이 UPDATE문, DELETE문에서도 사용할 수 있다.

-- <전 사원의 급여를 평균 금액으로 갱신>

UPDATE EMPLOYEES
SET SALARY = ( SELECT AVG(SALARY)
               FROM EMPLOYEES );

-- <평균 급여보다 많이 받는 사원 삭제>

DELETE EMPLOYEES
WHERE SALARY >= ( SELECT AVG(SALARY)
                  FROM EMPLOYEES );
~~~





---

> #### 연관성이 있는 서브쿼리

- 메인 쿼리와의 연관성이 있는 서브쿼리, 즉 메인 테이블과 조인 조건이 걸린 서브쿼리

---



> ###### 유형1

~~~sql
-- 메인쿼리(27개 데이터), 서브쿼리의 조건식에 참조되어 있는 모습
-- EXISTS(SELECT문) : SELECT문의 결과가 존재하면, TRUE
-- 메인쿼리의 테이블의 A.DEPARTMENT_ID 컬럼의 데이터 27개를 서브쿼리에서 하나씩 비교해서,
-- EXISTS(SELECT문)에 의해 존재하면 메인쿼리로 데이터 반환, 없으면 버려진다
-- 메인쿼리에서 돌려받은 데이터행으로 결과를 출력
-- 1의 의미는 조건식이 TRUE로 해석
SELECT A.DEPARTMENT_ID, A.DEPARTMENT_NAME
FROM DEPARTMENTS A
WHERE EXISTS (SELECT 1
              FROM JOB_HISTORY B
              WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID);
~~~



---



> ###### 유형2

~~~sql
-- 컬럼위치에 서브쿼리가 존재하고 있다

-- 1) SELECT 절(컬럼위치)에 서브쿼리가 사용
SELECT A.EMPLOYEE_ID,
            (SELECT B.EMP_NAME
             FROM EMPLOYEES B
             WHERE A.EMPLOYEE_ID = B.EMPLOYEE_ID) AS EMP_NAME,
       A.DEPARTMENT_ID,
            (SELECT B.DEPARTMENT_NAME
             FROM DEPARTMENTS B
             WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID) AS DEP_NAME
FROM JOB_HISTORY A;

-- 2) WHERE절에 서브쿼리가 사용
SELECT A.DEPARTMENT_ID, A.DEPARTMENT_NAME
     FROM DEPARTMENTS A
     WHERE EXISTS ( SELECT 1
                    FROM EMPLOYEES B
                    WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID
                    AND B.SALARY > ( SELECT AVG(SALARY) FROM EMPLOYEES )
                    );
~~~

---

> ###### 유형3

~~~sql
-- 인라인 뷰
-- FROM 절에 사용하는 서브 쿼리를 인라인 뷰InlineView 라고 한다
-- 원래 FROM 절에는 테이블이나 뷰가 오는데,
-- 서브 쿼리를 FROM 절에 사용해 하나의 테이블이나 뷰처럼 사용할 수 있다.

SELECT A.EMPLOYEE_ID, A.EMP_NAME, B.DEPARTMENT_ID, B.DEPARTMENT_NAME
FROM EMPLOYEES A, DEPARTMENTS B,
                           (SELECT AVG(C.SALARY) AS AVG_SALARY
                            FROM DEPARTMENTS B, EMPLOYEES C
                            WHERE B.PARENT_ID = 90  -- 기획부
                            AND B.DEPARTMENT_ID = C.DEPARTMENT_ID ) D
WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID
AND A.SALARY > D.AVG_SALARY;
~~~

---

> ###### 셀프 조인

~~~sql
-- 셀프 조인
-- 셀프조인은 서로 다른 두 테이블이 아닌 동일한 한 테이블을 사용해 조인하는 것을 말한다
-- 예제) 동일한 테이블 : 사원번호(PK) / 상사사원번호(FK) / 부서ID(PK) / 상위부서ID(FK)

SELECT A.EMPLOYEE_ID, A.EMP_NAME, B.EMPLOYEE_ID, B.EMP_NAME, A.DEPARTMENT_ID
FROM EMPLOYEES A, EMPLOYEES B
WHERE A.EMPLOYEE_ID < B.EMPLOYEE_ID
AND A.DEPARTMENT_ID = B.DEPARTMENT_ID
AND A.DEPARTMENT_ID = 20;
~~~

