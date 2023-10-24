---
layout: single
title:  "oracle - multiple insert"
categories: oracle
tag: [Oracle]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>







# ◆다중 insert문

oracle은 ``INSERT INTO table (컬럼1, 컬럼2, 컬럼3, ...)   VALUES (값1, 값2, 값3...), (값1, 값2, 값3...), (값1, 값2, 값3...); ``쿼리문은 안된다.

```java
NSERT ALL 

    INTO table (컬럼1, 컬럼2, 컬럼3 ...) VALUES (값1, 값2, 값3, ...)

    INTO table (컬럼1, 컬럼2, 컬럼3 ...) VALUES (값1, 값2, 값3, ...)

    INTO table (컬럼1, 컬럼2, 컬럼3 ...) VALUES (값1, 값2, 값3, ...)

    ...

SELECT *

    FROM DUAL;
```

