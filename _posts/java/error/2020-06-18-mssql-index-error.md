---
title: \[JAVA] MSSQL 사용 시 "인덱스 {}이(가) 범위를 벗어났습니다." 은 왜 발생할까?
permalink: /java/mssql/error/1
categories: 
   - java
   - mssql
tags:
   - java
   - mssql
   - error
   - index

last_modified_at: 2020-06-18  10:41:30.77 

---
회사에서 mssql 을 사용하고 이를 sp를 통해 호출한다.


이때, OUTPUT을 지정해주는 과정에서 "인덱스 7이(가) 범위를 벗어났습니다." 에러가 발생하였다.

이 에러는 sp에 설정된 ? 의 개수가 내가 설정하려는(넣어주려는) 변수의 개수보다 적을 경우 발생했다.

즉, 해결하기 위해서 내가 callableStatement 변수에 set 해주거나 regist 해주는 변수의 개수가 ? 의 개수보다 많은 지 살펴보자!
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTMxMDYwNTE4NV19
-->