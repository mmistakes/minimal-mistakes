---
layout : single
title : PL/SQL WHILE문
categories: SQL
tags: [SQL]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: true
sidebar:
  nav: "docs"
---

> ### PL/SQL WHILE문

~~~sql
-- 일반적인 프로그래밍 언어에서 대표적인 반복문을 꼽으라면 WHILE문과 FOR문을 들 수 있다.
-- 오라클에서도 역시 이 두 문장을 제공하는데, 먼저 WHILE문에 대해 살펴 보자.


-- WHILE 조건
-- LOOP
--      처리문;
-- END LOOP;
~~~

~~~sql
DECLARE
    VN_BASE_NUM NUMBER := 3;
    VN_CNT      NUMBER := 1;
BEGIN
    WHILE VN_CNT <= 9 -- VN_CNT변수의 값이 9보다 작거나 같은때까지만 한다
    LOOP
        -- 3 * 1 = 3
        DBMS_OUTPUT.PUT_LINE(VN_BASE_NUM || '*' || VN_CNT || '=' || VN_BASE_NUM * VN_CNT);
        VN_CNT := VN_CNT + 1;
    END LOOP;
END;
~~~

