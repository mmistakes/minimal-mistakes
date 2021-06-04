---
title: \[Spring Boot\] There is no PasswordEncoder mapped for the id "null" 오류
permalink: /java/spring-boot/error

categories: 
   - 스프링 부트

tags:
   - 스프링 부트
   - null 오류
   - 오류
   - 에러
   - error
   - spring security
   

last_modified_at: 2021-02-19 14:31:32.71 

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
eyJoaXN0b3J5IjpbLTM3NDc0MjY0XX0=
-->