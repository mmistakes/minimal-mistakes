---
layout : single
title : PL/SQL NULL문
categories:
  - Blog
tags:
  - Blog
---

> ### PL/SQL NULL문

~~~sql
-- PL/SQL에서는 NULL문을 사용할 수 있다. NULL문은 아무것도 처리하지 않는 문장이다
-- IF절이나 CASE절에서 해당하지 않으면 ELSE NULL 처리

IF vn_variable = 'A' THEN
       처리로직1;
    ELSIF vn_variable = 'B' THEN
       처리로직2;
       ...
ELSE NULL;
END IF;


CASE WHEN vn_variable = 'A' THEN
              처리로직1;
     WHEN vn_variable = 'B' THEN
              처리로직2;
     ...
     ELSE NULL;
END CASE;
~~~

