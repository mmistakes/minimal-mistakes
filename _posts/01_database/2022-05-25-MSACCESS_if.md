---
layout: single
title:  MS-ACCESS IIF - 조건문 사용
categories: 01_database
tag: [database, db, MSACCESS, IIF]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

 MSACCESS query에서 조건문을 넣으려고 할 때 아래 IIF문을 쓰면 된다. IIF이지만 그냥 받아들이자. 다른 SQL(MSSQL, MYSQL)과 크게 다를건 없다.<br>
 IIF를 사용하여 다른 식이 true인지 or false인지 여부를 확인한다. 식이 true이면 하나의 값을 반환한다. false인 경우 IIF는 다른 을 반환한다. <br>
<br>
IIF(expr, truepart, falsepart)의 인수<br>

1. expr: 필수요소. 평가하려는 식
2. truepart: 필수요소. expr가 True인 경우 반환된 값 or 식
3. falsepart: 필수요소. expr가 False인 경우 반환된 값 or 식 
