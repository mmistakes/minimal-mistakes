---
layout : single
title : PL/SQL 프로시저 예외처리
categories:
  - Blog
tags:
  - Blog
---

> ### PL/SQL 프로시저 예외처리

~~~sql
SET SERVEROUTPUT ON; -- 세션수준 설정명령어

-- 예외처리구문
-- 1) OTHERS
DECLARE
    VI_NUM NUMBER := 0;
BEGIN
    VI_NUM := 10 / 0; -- 에러. divisor is equal to zero

    DBMS_OUTPUT.PUT_LINE(VI_NUM); -- 정상적인 실행이 되지 못함
    
EXCEPTION WHEN OTHERS THEN -- OTHERS : 기타  등등 예외처리
    DBMS_OUTPUT.PUT_LINE('오류가 발생했습니다.');
    
END;

-- 2) ZERO_DIVIDE
DECLARE
    VI_NUM NUMBER := 0;
BEGIN
    VI_NUM := 10 / 0; -- 에러. divisor is equal to zero

    DBMS_OUTPUT.PUT_LINE(VI_NUM); -- 정상적인 실행이 되지 못함
    
EXCEPTION WHEN ZERO_DIVIDE THEN -- OTHERS : 기타  등등 예외처리
    DBMS_OUTPUT.PUT_LINE('오류가 발생했습니다.');
    
END;
~~~

~~~sql
-- 예외처리가 안되어 있는 프로시저 정의
CREATE OR REPLACE PROCEDURE CH10_NO_EXCEPTION_PROC
IS
    VI_NUM NUMBER := 0;
BEGIN
    VI_NUM := 10 / 0;
    
    DBMS_OUTPUT.PUT_LINE('SUCCESS!');
END;

-- 테스트
DECLARE
    VI_NUM NUMBER := 0;
BEGIN
    CH10_NO_EXCEPTION_PROC; -- EXEC 키워드 생략
    
    DBMS_OUTPUT.PUT_LINE('SUCCESS!');
END;


-- 예외처리가 되어 있는 프로시저 정의
CREATE OR REPLACE PROCEDURE CH10_NO_EXCEPTION_PROC
IS
    VI_NUM NUMBER := 0;
BEGIN
    VI_NUM := 10 / 0;
    
    DBMS_OUTPUT.PUT_LINE('SUCCESS!');
EXCEPTION WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('오류가 발생했습니다.');
END;

-- 테스트
DECLARE
    VI_NUM NUMBER := 0;
BEGIN
    CH10_NO_EXCEPTION_PROC; -- EXEC 키워드 생략
    
    DBMS_OUTPUT.PUT_LINE('SUCCESS!');
END;
~~~

~~~sql
-- 예외처리구문 사용시 사용명령어
-- SQLCODE, SQLERRM
CREATE OR REPLACE PROCEDURE CH10_NO_EXCEPTION_PROC
IS
    VI_NUM NUMBER := 0;
BEGIN
    VI_NUM := 10 / 0;
    
    DBMS_OUTPUT.PUT_LINE('SUCCESS!');
EXCEPTION WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('오류가 발생했습니다.');
    DBMS_OUTPUT.PUT_LINE('SQL ERROR CODE : ' || SQLCODE);
    DBMS_OUTPUT.PUT_LINE('SQL ERROR MESSAGE : ' || SQLERRM); -- 매개변수 없는 SQLERRM
    DBMS_OUTPUT.PUT_LINE(SQLERRM(SQLCODE)); -- 매개변수 있는 SQLERRM
END;


-- 테스트
DECLARE
    VI_NUM NUMBER := 0;
BEGIN
    CH10_NO_EXCEPTION_PROC; -- EXEC 키워드 생략
    
    DBMS_OUTPUT.PUT_LINE('SUCCESS!');
END;
~~~



---

> ### NO_DATA_FOUND 예외처리 구문

~~~sql
-- NO_DATA_FOUND 예외처리 프로시저
CREATE OR REPLACE PROCEDURE CH10_NO_EXCEPTION_PROC
(
    P_EMPLOYEE_ID EMPLOYEES.EMPLOYEE_ID%TYPE,
    P_JOB_ID      EMPLOYEES.JOB_ID%TYPE
)
IS 
    VN_CNT NUMBER := 0;
BEGIN
    -- SELECT 1이면 WHERE절에 해당하는 것이 있다면 데이터 1 없으면 NULL
    SELECT 1
    INTO VN_CNT
    FROM JOBS
    WHERE JOB_ID = P_JOB_ID;
    
    
    UPDATE EMPLOYEES
        SET JOB_ID = P_JOB_ID
    WHERE EMPLOYEE_ID = P_EMPLOYEE_ID;
    
    COMMIT;
    
    EXCEPTION WHEN NO_DATA_FOUND THEN
                    DBMS_OUTPUT.PUT_LINE(SQLERRM);
                    DBMS_OUTPUT.PUT_LINE(P_JOB_ID || '에 해당하는 JOB_ID가 없습니다');
              WHEN OTHERS THEN
                    DBMS_OUTPUT.PUT_LINE('기타에러 : ' || SQLERRM);
END;

-- 테스트
EXECUTE CH10_NO_EXCEPTION_PROC(200, 'SM_JOB2');

SELECT 1 INTO VN_CNT FROM JOBS WHERE JOB_ID = SM_JOB1; -- 데이터 있으면 출력 1
SELECT 1 INTO VN_CNT FROM JOBS WHERE JOB_ID = SM_JOB2; -- 데이터 없으면 NULL
~~~



