---
layout : single
title : SQL 기본 집계 함수
categories:
  - Blog
tags:
  - Blog
---

> ### 기본 집계 함수

- 기본 집계 함수
- 집계함수란 대상 데이터를 특정 그룹으로 묶은 다음 이 그룹에 대해
- 총합(SUM), 평균(AVG), 최댓값(MAX), 최솟값(MIN), 개수(COUNT) 등을 구하는 함수를 말한다. 
- 그럼 대표적인 집계 함수에 대해 하나씩 살펴 보자.

---

> ###### COUNT (expr)

~~~sql
-- COUNT (expr)
-- COUNT는 쿼리 결과 건수, 즉 전체 로우 수를 반환하는 집계함수. 테이블 전체 로우는 물론 WHERE조건을 걸러진 로우 수를 반환
SELECT COUNT(*) FROM EMPLOYEES;

-- 잘못된 사용(구조적으로 같이 사용 불가)
-- COUNT(*) : 107건
-- EMPLOYEE_ID : 107건 데이터행 출력
SELECT COUNT(*), EMPLOYEE_ID, EMP_NAME FROM EMPLOYEES;

DESC EMPLOYEES; -- 테이블의 NULL 유무 확인

SELECT COUNT(*) FROM EMPLOYEES; -- 107

-- EMPLOYEE_ID 컬럼은 PRIMARY KEY로 설정되어 있어, NOT NULL 성격이므로 107건 데이터 조회
SELECT COUNT(EMPLOYEE_ID) FROM EMPLOYEES;

-- DEPARTMENT_ID 컬럼은 NULL이므로 106건 데이터 조회
-- 집계 함수 사용시 컬럼의 NULL 데이터는 제외된다는 특징
SELECT COUNT(DEPARTMENT_ID) FROM EMPLOYEES;

-- 위의 쿼리의 NULL 데이터 확인
SELECT * FROM EMPLOYEES WHERE DEPARTMENT_ID IS NULL;
~~~

---



> ###### DISTINCT

~~~sql
-- DISTINCT : 중복된 데이터 행을 1개가 참조하고, 제외하는 기능

-- 사원테이블을 참조해서, 부서의 개수가 몇인지 참조할 때 사용
SELECT COUNT(DISTINCT DEPARTMENT_ID) FROM EMPLOYEES;

-- 동시에 만족하는 데이터를 1개만 참조하고, 나머지는 제외하는 기능
SELECT DISTINCT EMPLOYEE_ID, DEPARTMENT_ID FROM EMPLOYEES;

-- 정렬시 컬럼명 대신 숫자를 사용가능
SELECT DISTINCT DEPARTMENT_ID FROM EMPLOYEES
ORDER BY 1;
~~~

---

> ###### SUM

- SUM은 expr의 전체 합계를 반환하는 함수로 매개변수 expr에는 숫자형만 올 수 있다.
- 사원 테이블에서 급여가 숫자형이므로 전 사원의 급여 총액을 구해 보자.

~~~sql
-- 집계함수는 컬럼의 널 데이터를 제외하고, 함수가 사용된다 (제외된 널은 없다)
SELECT SUM(SALARY) FROM EMPLOYEES;
~~~

---

> ###### AVG

~~~sql
-- 사원 테이블에서 급여의 평균을 조회하라
SELECT AVG(SALARY) FROM EMPLOYEES;

SELECT ROUND(AVG(SALARY)) FROM EMPLOYEES; -- 소수 1자리 반올림체크해서, 정수부분에 반영

SELECT ROUND(AVG(SALARY), 2) FROM EMPLOYEES; -- 소수 3자리를 반올림해서, 2째자리에 적용
~~~

---

> ###### MAX, MIN

~~~sql
-- 사원테이블에서 가장 높은 연봉은?
SELECT MAX(SALARY) FROM EMPLOYEES;

-- 사원테이블에서 가장 높은 연봉은?
SELECT MIN(SALARY) FROM EMPLOYEES;

SELECT SUM(SALARY), AVG(SALARY), COUNT(*), MAX(SALARY), MIN(SALARY) FROM EMPLOYEES;
~~~

---

