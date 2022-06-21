---
layout : single
title : SQL GROUP BY, HAVING
categories: SQL
tags: [SQL]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: true
sidebar:
  nav: "docs"
---

> ### 그룹화 함수(GROUP BY)

~~~sql
-- GROUP BY 절과 HAVING 절
-- 지금까지 알아본 집계 함수의 예제는 모두 사원 전체를 기준으로 데이터를 추출했는데,
-- 전체가 아닌 특정 그룹으로 묶어 데이터를 집계할 수도 있다. 
-- 이때 사용되는 구문이 바로 GROUP BY 절이다. 그룹으로 묶을 컬럼명이나 표현식을 GROUP BY 절에 명시해서 사용하며
-- GROUP BY 구문은 WHERE와 ORDER BY절 사이에 위치한다.

-- 사원 테이블에서 각 부서별 급영의 총액을 구했다
SELECT DEPARTMENT_ID, SALARY
FROM EMPLOYEES
ORDER BY DEPARTMENT_ID ASC; --부서ID 오름차순 정렬

SELECT DEPARTMENT_ID, SUM(SALARY)
FROM EMPLOYEES -- 전체 데이터 대상작업
GROUP BY DEPARTMENT_ID -- DEPARTMENT_ID 컬럼의 동일한 데이터를 묶는다(그룹화)
ORDER BY DEPARTMENT_ID ASC;

-- not a GROUP BY expression 에러발생. EMPLOYEE_ID 컬럼 사용불가
SELECT EMPLOYEE_ID, DEPARTMENT_ID, SUM(SALARY)
FROM EMPLOYEES -- 전체 데이터 대상작업
GROUP BY DEPARTMENT_ID -- DEPARTMENT_ID 컬럼의 동일한 데이터를 묶는다(그룹화)
ORDER BY DEPARTMENT_ID ASC;


-- 질문시, 그룹화 대상의 컬럼이 무엇인지 판단
-- 사원 테이블에서 각 부서별 인원수를 구하라
SELECT DEPARTMENT_ID, COUNT(EMPLOYEE_ID)
FROM EMPLOYEES
GROUP BY DEPARTMENT_ID -- DEPARTMENT_ID 컬럼의 동일한 데이터를 묶는다(그룹화)
ORDER BY DEPARTMENT_ID ASC;

-- 사원 테이블에서 각 부서별 평균금액을 구하라
SELECT DEPARTMENT_ID, COUNT(SALARY), AVG(SALARY)
FROM EMPLOYEES
GROUP BY DEPARTMENT_ID -- DEPARTMENT_ID 컬럼의 동일한 데이터를 묶는다(그룹화)
ORDER BY DEPARTMENT_ID ASC;

-- 종합으로 집계 함수를 모두 사용하자
-- 각 부서별, 급여합계, 급여평균, 사원수, 부서별 가장 높은 연봉, 부서별 가장 낮은 연봉
SELECT DEPARTMENT_ID, SUM(SALARY), AVG(SALARY), COUNT(SALARY), MAX(SALARY), MIN(SALARY)
FROM EMPLOYEES
GROUP BY DEPARTMENT_ID -- DEPARTMENT_ID 컬럼의 동일한 데이터를 묶는다(그룹화)
ORDER BY DEPARTMENT_ID ASC;
~~~

---

> ### HAVING 조건식

- HAVING 조건식 : GROUP BY 문법을 사용하여, 발생된 데이터에 대하여 조건식을 사용

~~~sql
-- HAVING 조건식 : GROUP BY 문법을 사용하여, 발생된 데이터에 대하여 조건식을 사용

-- 사원 테이블에서 각 부서별 평균금액이 3000 보다 큰 데이터를 출력하라
SELECT DEPARTMENT_ID, AVG(SALARY)
FROM EMPLOYEES -- 전체 데이터
GROUP BY DEPARTMENT_ID -- DEPARTMENT_ID 컬럼의 동일한 데이터 묶음(그룹화)
HAVING AVG(SALARY) > 3000 -- GROUP BY의 조건식
ORDER BY DEPARTMENT_ID ASC;

-- 대출관려 테이블 : KOR_LOAN_STATUS

SELECT * FROM KOR_LOAN_STATUS;

-- 2013년 지역별(지역단위) 가계대출 총 잔액을 구해 보자

DESC KOR_LOAN_STATUS;

SELECT REGION, GUBUN, SUM(LOAN_JAN_AMT) TOT__LOAN
FROM KOR_LOAN_STATUS
WHERE PERIOD LIKE '2013%'
GROUP BY REGION, GUBUN
ORDER BY REGION, GUBUN;

-- 2013년 11월 데이터 한정. 지역별(지역단위) 가계대출 총 잔액

SELECT REGION, SUM(LOAN_JAN_AMT) TOT__LOAN
FROM KOR_LOAN_STATUS
WHERE PERIOD = '201311'
GROUP BY REGION
ORDER BY REGION;

-- 부서ID별, JOB_ID별 그룹화해서 평균 급여가 3000보다 큰 데이터 조회

SELECT DEPARTMENT_ID, JOB_ID, COUNT(*), AVG(SALARY)
FROM EMPLOYEES
GROUP BY DEPARTMENT_ID, JOB_ID
HAVING AVG(SALARY) > 3000
ORDER BY DEPARTMENT_ID, JOB_ID ASC;
~~~

