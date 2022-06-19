---
layout : single
title : SQL 숫자 함수
categories:
  - Blog
tags:
  - Blog
---

> ### 숫자 함수

- 숫자 함수란 수식 연산을 하는 함수로 연산 대상 즉, 매개변수나 반환 값이 대부분 숫자 형태다

---



> ###### DUAL 테이블

~~~sql
-- DUAL 테이블
-- SELECT 문 사용시 문법적인 구조를 맞추기 위하여 사용하는 특수한 테이블

SELECT 10 + 20 FROM DUAL;
~~~

---



> ###### ABS(n)

~~~sql
-- ① ABS(n)
-- ABS 함수는 매개변수로 숫자를 받아 그 절대값을 반환하는 함수다.

SELECT ABS(10), ABS(-10), ABS(-10.123) FROM DUAL;
~~~

---



> ###### CELL(n)

~~~sql
-- ② CEIL(n) :올림함수와 FLOOR(n):내림함수
-- CEIL 함수는 매개변수 n과 같거나 가장 큰 정수를 반환한다.

SELECT CEIL(10.123), CEIL(10.541), CEIL(11.001), CEIL(11.000) FROM DUAL;

SELECT FLOOR(10.123), FLOOR(10.541), FLOOR(11.001), FLOOR(11.000) FROM DUAL;
~~~

---



> ###### ROUND(n, i)와 TRUNC(n1, n2)

~~~sql
-- ③ ROUND(n, i)와 TRUNC(n1, n2)
-- ROUND 함수는 매개변수 n을 소수점 기준 (i+1)번 째에서 반올림한 결과를 반환한다.
-- i번 소수자리까지 출력, i+1번짜리에서 반올림 
-- i는 생략할 수 있고 디폴트 값은 0, 즉 소수점 첫 번째 자리에서 반올림이 일어나 정수 부분의 일의 자리에 결과가 반영된다.

-- 기본. 소수첫째자리를 반올림체크, 디폴트 0
SELECT ROUND(10.154), ROUND(10.541), ROUND(11.001) FROM DUAL;

-- 2번쨰 파라미터가 양수인 경우, 소수자리를 지정하여 반올림 반영한다
SELECT ROUND(10.154, 1), ROUND(10.541, 2), ROUND(11.001, 3) FROM DUAL;

-- 2번째 파라미터가 음수인 경우, 정수자리를 지정하여 반올림 체크한다
SELECT ROUND(0, 3), ROUND(115.155, -1), ROUND(115.155, -2) FROM DUAL;
~~~

---



> ###### TRUNC

~~~sql
-- 지정한 자리수 이후를 절삭 : TRUNC
SELECT TRUNC(115.155), TRUNC(115.155, -1), TRUNC(115.155, 2), TRUNC(115.155, -2) 
FROM DUAL;
~~~

---

> ###### POWER

~~~sql
-- POEWR(n, n의제곱수)
SELECT POWER(3, 2), POWER(3, 3), POWER(3, 3.0001)
  FROM DUAL;  

-- 작동안함
SELECT POWER(-3, 3.0001) FROM DUAL;
~~~

---

> ###### SQRT(n)

~~~sql
-- SQRT(n) : n의 제곱근 구하기
SELECT SQRT(2), SQRT(5)
  FROM DUAL;
~~~

---

> MOD / REMAINDER

~~~sql
-- REMAINDER 함수 역시 n2를 n1으로 나눈 나머지 값을 반환하는데, 
-- 나머지를 구하는 내부적 연산 방법이 MOD 함수와는 약간 다르다.

-- MOD → n2 - n1 * FLOOR (n2/n1)

-- REMAINDER → n2 - n1 * ROUND (n2/n1)


SELECT MOD(19,4), MOD(19.123, 4.2) FROM DUAL;

SELECT REMAINDER(19,4), REMAINDER(19.123, 4.2) FROD DUAL;

SELECT REMAINDER(19, 4) FROM DUAL;
~~~

---



