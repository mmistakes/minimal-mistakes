---
layout : single
title : SQL NULL 관련 함수
categories:
  - Blog
tags:
  - Blog
---

> ### NULL 관련 함수

---

> ###### NVL(expr1, expr2)

~~~sql
-- NVL(expr1, expr2), NVL2((expr1, expr2, expr3)
-- NVL 함수는 expr1이 NULL일 때 expr2를 반환한다. (파라미터 2개만 사용)

SELECT NVL(NULL, 0) FROM DUAL;
SELECT NVL('홍길동', 0) FROM DUAL;

SELECT NVL(NULL, NULL) FROM DUAL;

-- 파라미터 개수를 2개만 사용가능. 에러발생
SELECT NVL(NULL, NULL, 0) FROM DUAL;

-- EMPLOYEE_ID : NOT NULL 설정
-- manager_id : NULL 설정
SELECT manager_id, EMPLOYEE_ID, NVL(manager_id, EMPLOYEE_ID)
FROM EMPLOYEES
WHERE manager_id IS NULL;
~~~



---



> ###### NVL2(expr1, expr2, expr3)

~~~sql
-- NVL2(expr1, expr2, expr3)NVL2는 NVL을 확장한 함수로 
-- expr1이 NULL이 아니면 expr2를, NULL이면 expr3를 반환하는 함수다

-- NVL2(i, j ,k)
-- i가 NOT NULL j 반환
-- i가 NULL     k 반환

-- 첫번쨰 파라미터가 널이면, 3번쨰 파라미터가 반환값이 된다
SELECT NVL2(NULL, 0, 1) FROM DUAL;

-- 첫번째 파라미터가 NOT NULL이면, 2번쨰 파라미터가 반환값이 된다
SELECT NVL2('홍길동', 0, 1) FROM DUAL;
~~~

---

> ###### NULL 주의사항

~~~sql
-- NULL 컬럼과 연산시 결과값은 NULL 이 된다
SELECT NULL + '홍길동' FROM DUAL;
SELECT NULL + 10 FROM DUAL;
-- 2개의 컬럼 중 하나라도 NULL이면 결과값은 NULL이 된다
SELECT SALARY * COMMISSION_PCT FROM EMPLOYEES;
~~~

---

> ###### NAV2 예시

~~~sql
-- 급여정산 앞의 쿼리는 커미션이
-- NULL인 사원은 그냥 급여를
-- NULL 이 아니면 '급여 + (급여 + 커미션)'을 조회하기

SELECT EMPLOYEE_ID, SALARY,
    NVL2(COMMISSION_PCT, SALARY + ( SALARY * COMMISSION_PCT ), SALARY) AS SALARY2
FROM EMPLOYEES;

~~~

---

> ###### COALESCE (expr1, expr2, …)

~~~sql
-- COALESCE (expr1, expr2, …)
-- COALESCE 함수는 매개변수로 들어오는 표현식에서 
-- NULL이 아닌 첫 번째 표현식을 반환하는 함수다.

SELECT COALESCE(NULL, 1, 2) FROM DUAL; -- 1
SELECT COALESCE(NULL, NULL, 2) FROM DUAL; -- 2
SELECT COALESCE(NULL, NULL, NULL) FROM DUAL; -- NULL

-- 쿼리>
SELECT EMPLOYEE_ID, SALARY, COMMISSION_PCT,
    COALESCE(SALARY * COMMISSION_PCT, SALARY) AS SALARY2
FROM EMPLOYEES;
~~~

---



> ###### COALESCE 예시

~~~sql
-- 조건식에서 NULL 이 누락되는 사항을 꼭 확인하라
-- 커미션이 0.2보다 작은데이터를 조회하라

-- 11건 출력
SELECT EMPLOYEE_ID, COMMISSION_PCT
FROM EMPLOYEES
WHERE COMMISSION_PCT < 0.2; -- 출력결과에 커미션이 NULL(72건) 데이터는 포함이 안되어있음

-- NULL인 72건
SELECT EMPLOYEE_ID, COMMISSION_PCT
FROM EMPLOYEES
WHERE COMMISSION_PCT IS NULL;

-- 11건 + NULL을 0으로 해서 조건식에 적용(72건) = 합 83건
SELECT EMPLOYEE_ID, COMMISSION_PCT
FROM EMPLOYEES
WHERE NVL(COMMISSION_PCT, 0) < 0.2; -- NULL(72건)을 0으로 변환하고 < 0.2 조건식 비교가 처리됨(NULL 72건 데이터 포함)
~~~

---





> ###### NULLIF (expr1, expr2)

~~~sql
-- NULLIF (expr1, expr2)
-- NULLIF 함수는 expr1과 expr2을 비교해 같으면 NULL을, 
-- 같지 않으면 expr1을 반환한다.

SELECT NULLIF(1, 1) FROM DUAL; -- NULL
SELECT NULLIF('홍길동', '홍길동') FROM DUAL; -- NULL

SELECT NULLIF(1, 2) FROM DUAL; -- 1


-- job_history 테이블에서 
-- start_date와 end_date의 연도만 추출해 두 연도가 같으면 NULL을, 
-- 같지 않으면 종료년도를 출력하는 쿼리다.

SELECT
    TO_CHAR(start_date, 'YYYY'),
    TO_CHAR(end_date, 'YYYY'),
    NULLIF(TO_CHAR(end_date, 'YYYY'), TO_CHAR(start_date, 'YYYY'))
FROM job_history;
~~~

