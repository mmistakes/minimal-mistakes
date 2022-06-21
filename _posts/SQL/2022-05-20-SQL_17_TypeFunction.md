---
layout : single
title : SQL 형변환 함수
categories: SQL
tags: [SQL]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: true
sidebar:
  nav: "docs"
---

> ### 형변환 함수

---



> ###### TO_CHAR (숫자 혹은 날짜, format)

~~~sql
-- TO_CHAR (숫자 혹은 날짜, format)
-- 숫자나 날짜를 문자로 변환해 주는 함수가 바로 TO_CHAR로,
-- 매개변수로는 숫자나 날짜가 올 수 있고 반환 결과를 특정 형식에 맞게 출력할 수 있다

SELECT TO_CHAR(123456789) FROM DUAL;

-- TO_CHAR(숫자, 포맷)
SELECT TO_CHAR(123456789, '999,999,999') FROM DUAL;

SELECT HIRE_DATE, TO_CHAR(HIRE_DATE) FROM EMPLOYEES;
SELECT HIRE_DATE, TO_CHAR(HIRE_DATE, 'MONTH') FROM EMPLOYEES; -- 월
SELECT HIRE_DATE, TO_CHAR(HIRE_DATE, 'DAY') FROM EMPLOYEES; -- 요일
SELECT HIRE_DATE, TO_CHAR(HIRE_DATE, 'YYYY') FROM EMPLOYEES; -- 년도 4자리
SELECT HIRE_DATE, TO_CHAR(HIRE_DATE, 'YY') FROM EMPLOYEES; -- 년도 2자리

SELECT HIRE_DATE, TO_CHAR(HIRE_DATE, 'D') FROM EMPLOYEES; -- 요일 숫자
SELECT HIRE_DATE, TO_CHAR(HIRE_DATE, 'DD') FROM EMPLOYEES; -- 일
SELECT HIRE_DATE, TO_CHAR(HIRE_DATE, 'DDD') FROM EMPLOYEES; -- 365일 중 현재 몇일째

SELECT HIRE_DATE, TO_CHAR(HIRE_DATE, 'YYYY-MM-DD') FROM EMPLOYEES; -- 4자리년도-월-일
~~~





