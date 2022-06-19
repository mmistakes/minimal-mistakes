---
layout : single
title : SQL 의사컬럼
categories:
  - Blog
tags:
  - Blog
---

> ### 의사컬럼 (Pseudo-Column)



- ROWNUM : 테이블에 공통적으로 사용가능. 데이터의 인덱스(일련번호)를 차례대로 부여하는 특징

~~~sql
-- 테이블에 존재하지 않는다. 테이블의 컬럼처럼 동작하는 특징이 있다
-- SELECT문에서 의사컬럼을 사용할 수 있지만, INSERT, UPDATE, DELETE 문은 사용할 수가 없다

-- ROWNUM : 테이블에 공통적으로 사용가능. 데이터의 인덱스(일련번호)를 차례대로 부여하는 특징
SELECT ROWNUM, employee_id, EMP_NAME, SALARY
FROM EMPLOYEES
WHERE SALARY > 10000;

SELECT ROWNUM, employee_id, EMP_NAME, SALARY
FROM EMPLOYEES
WHERE ROWNUM <= 5;
~~~

---

- ROWID : 테이블에 저장된 각 로우(행)의 저장된 주소값을 가리키는 의사컬럼

~~~sql
-- ROWID : 테이블에 저장된 각 로우(행)의 저장된 주소값을 가리키는 의사컬럼
SELECT employee_id, EMP_NAME, ROWID
FROM EMPLOYEES
WHERE ROWNUM <= 5;
~~~

