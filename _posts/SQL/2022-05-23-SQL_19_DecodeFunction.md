---
layout : single
title : SQL DECODE
categories: SQL
tags: [SQL]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

> ###### DECODE (expr, search1, result1, search2, result2, ..., default)

~~~sql
-- DECODE (expr, search1, result1, search2, result2, ..., default)
-- DECODE는 expr과 search1을 비교해 두 값이 같으면 result1을, 같지 않으면
-- 다시 search2와 비교해 값이 같으면 result2를 반환
-- 이런식으로 계속 비교한 뒤 최종

SELECT CHANNEL_ID, DECODE(CHANNEL_ID, 3, 'Direct',
                                      9, 'Direct',
                                      5, 'Indirect',
                                      4, 'Indirect',
                                         'Others') AS DECODES
FROM CHANNELS;
~~~

---

