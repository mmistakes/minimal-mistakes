---
title: \[Spring Boot\] 스프링 부트가 실행 될 때, 자동으로 데이터 삽입하기 + 데이터 삽입 안되는 오류 해결 (initialize database load 오류)
categories: 
   - 스프링 부트
tags:
   - 스프링 부트
   - database
   - spring boot
   - 데이터 베이스
   - sql
   - database load error
   

last_modified_at: 2021-05-29 18:31:32.71 

---

## 해결 방법

Spring Security 버전 5 이상부터는 PasswordEncoder가 변경되었기 때문에, password 앞에 `식별자`를 넣어야 하는데 `식별자`를 넣지 않았을 경우 해당 에러가 난다.

```yaml
spring:
 security:
   user:
    name: "user"
    password: "{noop}password"
    role: USER
```

yaml 기준으로 user / password를 적었을 경우 저렇게 **{noop}**를 붙여주면 된다. propertis 혹은 xml 등등 어디서든 **{noop}**을 붙여주면 된다.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1NjE1NTE4XX0=
-->