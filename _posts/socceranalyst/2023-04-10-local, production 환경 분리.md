---
categories: "socceranalyst"
tag: "setting"
---



# 로컬 환경과 배포 환경 분리

socceranalyst 에 한해서, 스프링을 실행할 때 저는 주로 로컬 환경은 H2 DB 를 사용하고, 배포할 때는 mysql 입니다.

일단 Dependency 에서는 둘 다 넣어줬는데요. **환경에 따라 DB 를 자동으로 변경하기 위해서는 yml 에서 로컬과 배포를 구분해줘야 합니다.**

## application.yml

```yaml
spring:
  profiles:
    active: local

---

spring:
  config:
    activate:
      on-profile: local
  datasource:
    url: jdbc:h2:tcp://localhost/~/test
    username: sa
    password:
  jpa:
    hibernate:
      ddl-auto: none

---

spring:
  config:
    activate:
      on-profile: production
  datasource:
    url: [RDS url]
    username: [mysql username]
    password: [mysql passwor]
---
# 공통 구성
logging:
  level:
    org:
      hibernate:
        SQL: DEBUG
        type:
          descriptor:
            sql:
              BasicBinder: TRACE

jwt:
  secret-key: "[secret-key]"

```

중요한 건 `---` 구분 줄과 위에서 세번째 줄 `active: local` 입니다.

spring:profiles:active: local 을 통해 spring:config:activate:on-profile: local 을 실행하겠다는 겁니다. (yml 파일에서는 들여쓰기가 중요하니 한줄로 쓰면 안됩니다.)

이때 조건문처럼 --- 통해서 구분해줘야 단락 단락이 구분되어 실행됩니다.

여기서 `#공통구성` 위에 `---` 를 생략한다면 `on-profile: production` 과 같은 위치로 묶이게 되어 local 환경에서는 공통구성도 실행되지 않게 됩니다.

## 배포환경에서 production 으로 실행

하지만 이렇게 해도 배포할 때는 active: production 으로 변경해야 한다는 불편함이 있습니다.

이때는 .jar 파일을 실행할 때 yml 의 spring.profiles.active 을 production 으로 변경하여 실행하면 됩니다.

다음은 제가 EC2 서버에서 .jar 파일을 실행할 때 쓰는 명령어입니다.

`nohup java -jar -Dspring.profiles.active=production backend-0.0.1-SNAPSHOT.jar > output.log 2>&1 &`

**아래는 해당 명령어에 대한 설명입니다.**

- `nohup` : 백그라운드에서 실행한다는 의미입니다. 리눅스 서버를 종료해도 java 는 계속 실행됩니다.
- `java -jar` : 자바 jar 파일을 실행한다는 의미입니다.
- `-Dspring.profiles.active=production` : application.yml 의 spring.profiles.active 을 production 으로 변경한다는 의미입니다. 이를 통해서 mysql 을 사용하게 됩니다.
- `> output.log`   : 표준 출력(stdout)을 리다이렉션하여 output.log 파일로 저장하는 기호입니다. 
- `2>&1` : 표준 에러(stderr)를 표준 출력(stdout)과 같은 곳으로 리다이렉션합니다. 이 경우 표준 출력이 `output.log` 파일로 리다이렉션되므로 표준 에러도 동일한 파일에 저장됩니다.

로컬 테스트 환경과 배포 환경을 구분하는 건 중요한 것 같습니다 ㅎㅎ

