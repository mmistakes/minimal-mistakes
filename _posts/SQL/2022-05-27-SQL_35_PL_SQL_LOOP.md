---
layout : single
title : PL/SQL LOOP문
categories:
  - Blog
tags:
  - Blog
---

> ### PL/SQL LOOP문

~~~sql
-- LOOP문은 루프를 돌며 반복해서 로직을 처리하는 반복문이다.
-- 이러한 반복문에는 LOOP문 외에도 WHILE문, FOR문이 있는데,
-- 먼저 가장 기본적인 형태의 반복문인 LOOP문에 대해 살펴 보자.

-- LOOP
--      처리문;
--      EXIT [WHEN 조건];
-- END LOOP;
~~~

~~~sql
-- LOOP문은 루프를 돌며 반복해서 로직을 처리하는 반복문이다.
-- 이러한 반복문에는 LOOP문 외에도 WHILE문, FOR문이 있는데,
-- 먼저 가장 기본적인 형태의 반복문인 LOOP문에 대해 살펴 보자.

-- LOOP
--      처리문;
--      EXIT [WHEN 조건];
-- END LOOP;

DECLARE
    VN_BASE_NUM NUMBER := 3;
    VN_CNT      NUMBER := 1;
BEGIN
    LOOP
        -- 3 * 1 = 3
        DBMS_OUTPUT.PUT_LINE(VN_BASE_NUM || '*' || VN_CNT || '=' || VN_BASE_NUM * VN_CNT);
        VN_CNT := VN_CNT + 1;
        
        EXIT WHEN VN_CNT > 9; -- VN_CNT변수의 값이 9보다 크면 종료
    END LOOP;
END;
~~~

