---
layout : single
title : PL/SQL CASE문
categories: SQL
tags: [SQL]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---



> ### PL/SQL CASE문

~~~sql
-- CASE문은 3장에서 배웠던 CASE 표현식과 비슷하다.
-- SELECT 절에서 CASE 표현식을 사용했듯이 PL/SQL 프로그램 내에서도 CASE문을 사용할 수 있는데, 그 구문은 다음과 같다.

-- <유형 1>
-- CASE 표현식
--    WHEN 결과1 THEN
--        처리문1;
--    WHEN 결과2 THEN
--        처리문2;
--        ...
--    ELSE
--        기타 처리문;
--    END CASE;
--     
-- <유형 2>
-- CASE WHEN 표현식1 THEN
--        처리문1;
--     WHEN 표현식2 THEN
--        처리문2;
--     ...
--     ELSE
--        기타 처리문;
-- END CASE;
~~~

~~~sql
SET SERVEROUTPUT ON;

DECLARE
    VN_SALARY NUMBER := 0;
    VN_DEPARTMENT_ID NUMBER := 0;
BEGIN
    VN_DEPARTMENT_ID := ROUND(DBMS_RANDOM.VALUE(10, 120), -1);
    
    SELECT SALARY
    INTO VN_SALARY
    FROM EMPLOYEES
    WHERE DEPARTMENT_ID = VN_DEPARTMENT_ID
    AND ROWNUM = 1;
    
    DBMS_OUTPUT.PUT_LINE(VN_SALARY);
    
--    IF VN_SALARY BETWEEN 1 AND 3000 THEN
--        DBMS_OUTPUT.PUT_LINE('낮음');
--    ELSIF VN_SALARY BETWEEN 3001 AND 6000 THEN
--        DBMS_OUTPUT.PUT_LINE('중간');
--    ELSIF VN_SALARY BETWEEN 6001 AND 10000 THEN
--        DBMS_OUTPUT.PUT_LINE('높음');
--    ELSE
--        DBMS_OUTPUT.PUT_LINE('최상위');
--    END IF;

-- 위의 다중IF문 -> CASE문으로 변경

    CASE
        WHEN VN_SALARY BETWEEN 1 AND 3000 THEN
            DBMS_OUTPUT.PUT_LINE('낮음');
        WHEN VN_SALARY BETWEEN 3001 AND 6000 THEN
            DBMS_OUTPUT.PUT_LINE('중간');
        WHEN VN_SALARY BETWEEN 6001 AND 10000 THEN
            DBMS_OUTPUT.PUT_LINE('높음');
        ELSE
            DBMS_OUTPUT.PUT_LINE('최상위');
    END CASE;
END;
~~~

