---
title: JAVA String 객체 Boolean으로 변환하기
permalink: /java/method/Boolean.parseBoolean
categories: 
   - java
tags:
   - java
   - method
   - boolean
   - parse
   - parseBoolean
   - Boolean
   - String
   - convert

last_modified_at: 2020-04-08 10:31:32.71 

---
자바에서 String 객체를 boolean으로 변환하고 싶을 수 있다.

```java
1. Boolean.valueOf([String 객체])
2. Boolean.parseBoolean([String 객체])
```
둘 다 Convert to boolean from String 으로 가능하다.

**특이한 점은 String 객체가 "TRUE", "true", "True" 등 대소문자에 상관없이 `TRUE`라면 true를 반환하지만 그게 아닌 모든 경우는 `false`를 반환한다.**
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1NTk5NjI4ODBdfQ==
-->