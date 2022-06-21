---
layout : single
title : PL/SQL FOR문
categories: SQL
tags: [SQL]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: true
sidebar:
  nav: "docs"
---

> ### PL/SQL FOR문

~~~sql
-- FOR문도 다른 프로그래밍 언어에서 사용하는 것과 비슷한 형태이다.
-- 오라클에서 제공하는 FOR문의 기본 유형은 다음과 같다.

-- FOR 인덱스 IN [REVERSE]초깃값..최종값
--      LOOP
--          처리문;
--      END LOOP;
~~~

~~~sql
-- 1)
DECLARE
    VN_BASE_NUM NUMBER := 3;
BEGIN
    FOR I IN 1..9
    LOOP
        DBMS_OUTPUT.PUT_LINE(VN_BASE_NUM || '*' || I || '=' || VN_BASE_NUM * I);
    END LOOP;
END;

-- 2) REVERSE 1~9를 뒤에서부터 넣음
DECLARE
    VN_BASE_NUM NUMBER := 3;
BEGIN
    FOR I IN REVERSE 1..9
    LOOP
        DBMS_OUTPUT.PUT_LINE(VN_BASE_NUM || '*' || I || '=' || VN_BASE_NUM * I);
    END LOOP;
END;
~~~

