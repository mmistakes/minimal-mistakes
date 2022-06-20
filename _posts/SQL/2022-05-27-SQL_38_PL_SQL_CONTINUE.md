---
layout : single
title : PL/SQL CONTINUE문
categories: SQL
tags: [SQL]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

> ### PL/SQL CONTINUE문

- CONTINUE문은 FOR나 WHILE 같은 반복문은 아니지만,  반복문 내에서 특정 조건에 부합할 때

  처리 로직을 건너뛰고 상단의 루프 조건으로 건너가 루프를 계속 수행할 때 사용한다.

  EXIT는 루프를 완전히 빠져 나오는데 반해, CONTINUE는 제어 범위가 조건절로 넘어간다

~~~sql
-- 3*5가 출력이 안됨
-- COTINUE 조건절에 따라 빠져나옴
DECLARE
    VN_BASE_NUM NUMBER := 3;
BEGIN
    FOR I IN 1..9
    LOOP
        CONTINUE WHEN i=5;
        DBMS_OUTPUT.PUT_LINE(VN_BASE_NUM || '*' || I || '=' || VN_BASE_NUM * I);
    END LOOP;
END;
~~~



