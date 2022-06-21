---
layout : single
title : PL/SQL 사용자정의함수 생성
categories: SQL
tags: [SQL]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: true
sidebar:
  nav: "docs"
---

> ### PL/SQL 사용자 정의 함수 생성

- PL/SQL 문법을 이용하여, 1) 사용자정의 함수 2) 사용자정의 프로시저를 생성해서 사용
      

```sql
CREATE OR REPLACE FUNCTION 함수 이름 (매개변수1, 매개변수2, ...)
    RETURN 데이터타입;
    IS[AS]
      변수, 상수 등 선언
    BEGIN
      실행부
      
    RETURN 반환값;
[EXCEPTION 예외 처리부]
END [함수 이름];
```
- CREATE OR REPLACE FUNCTION: CREATE OR REPLACE 구문을 사용해 함수를 생성한다.

  최초 함수를 만들고 나서 수정을 하더라도 이 구문을 사용해 계속 컴파일할 수 있고 

  마지막으로 수정된 최종본이 반영된다.

- 매개변수: 함수로 전달되는 매개변수로, “매개변수명 데이터 타입” 형태로 명시한다.

  매개변수는 생략할 수 있다.

- RETURN 데이터 타입: 함수가 반환할 데이터 타입을 지정한다.

- RETURN 반환값: 매개변수를 받아 특정 연산을 수행한 후 반환할 값을 명시한다.

---

> ###### 함수 생성

~~~sql
-- 함수 생성
-- 시나리오 : 나머지를 구하는 함수 예) MOD()
-- DECLARE 키워드는 사용안함. 익명블록에서만 사용
CREATE OR REPLACE FUNCTION MY_MOD(NUM1 NUMBER, NUM2 NUMBER) -- 매개변수의 타입에 길이 사용 X
    RETURN NUMBER -- 반환되는 데이터 타입
IS
    -- 변수, 상수 선언
    VN_REMAINDER NUMBER := 0; -- 반환할 나머지
    VN_QUOTIENT  NUMBER := 0; -- 몫
BEGIN
	-- 구동
    VN_QUOTIENT := FLOOR(NUM1 / NUM2);
    VN_REMAINDER := NUM1 - (NUM2 * VN_QUOTIENT);
    
    RETURN VN_REMAINDER; -- 반환값
END;

-- 함수 사용
SELECT MY_MOD(10, 3) FROM DUAL; -- 사용자 정의함수
SELECT MOD(10, 3) FROM DUAL; -- 내장함수
~~~

---





> ###### 예제

~~~sql
-- 국가(countries) 테이블을 읽어 국가번호를 받아 국가명을 반환하는 함수를 만들어보자.
-- 함수정의
CREATE OR REPLACE FUNCTION FN_GET_COUNTRY_NAME(P_COUNTRY_ID NUMBER)
    RETURN VARCHAR2
IS
    VS_COUNTRY_NAME COUNTRIES.COUNTRY_NAME%TYPE;
BEGIN
    SELECT COUNTRY_NAME
    INTO VS_COUNTRY_NAME
    FROM COUNTRIES
    WHERE COUNTRY_ID = P_COUNTRY_ID;
    
    RETURN VS_COUNTRY_NAME;
END;


-- 함수사용
-- FN_GET_COUNTRY_NAME(10000) NULL 반환
SELECT FN_GET_COUNTRY_NAME(52775), FN_GET_COUNTRY_NAME(10000) FROM DUAL;


-- 수정
CREATE OR REPLACE FUNCTION FN_GET_COUNTRY_NAME(P_COUNTRY_ID NUMBER)
    RETURN VARCHAR2
IS
    VS_COUNTRY_NAME COUNTRIES.COUNTRY_NAME%TYPE;
    VN_COUNT NUMBER := 0;
BEGIN
	-- NULL 데이터를 0으로 표시하도록 데이터 있으면 1
    SELECT COUNT(*)
    INTO VN_COUNT -- VN_COUNT 변수는 데이터 존재하면 1
    FROM COUNTRIES
    WHERE COUNTRY_ID = P_COUNTRY_ID;
	
	-- IF 절에 위에서 정의한 값을 나눠서 넣음
    IF VN_COUNT = 0 THEN
        VS_COUNTRY_NAME := '해당국가 없음';
    ELSE -- 데이터 존재
        SELECT COUNTRY_NAME
        INTO VS_COUNTRY_NAME
        FROM COUNTRIES
        WHERE COUNTRY_ID = P_COUNTRY_ID;
   END IF;
   
   RETURN VS_COUNTRY_NAME; -- 반환값
END;

-- 10000은 원래 NULL이지만 정의를 통해 해당국가 없음으로 나옴
SELECT FN_GET_COUNTRY_NAME(52775), FN_GET_COUNTRY_NAME(10000) FROM DUAL;
~~~

---

> ###### 함수가 매개변수 없이 정의

~~~sql
CREATE OR REPLACE FUNCTION FN_GET_USER -- ()의 변수가 없음
    RETURN VARCHAR2
IS
    VS_USER_NAME    VARCHAR2(80);
BEGIN
    SELECT USER -- USER : 현재 로그인 된 사용자정보를 반환
    INTO VS_USER_NAME
    FROM DUAL;
    
    RETURN VS_USER_NAME;
END;

-- ()를 넣는거랑 안 넣은거 다 가능
SELECT FN_GET_USER(), FN_GET_USER FROM DUAL;
~~~

