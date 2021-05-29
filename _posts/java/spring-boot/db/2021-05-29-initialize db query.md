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


스프링 부트가 뜰 때, h2 등을 사용하는 경우에 데이터 베이스에 대한 테이블과 그 데이터를 자동으로 삽입하고 싶을 때가 있다. 매번 /h2-console을 들어가서 삽입할 수는 없으니까! ㅎㅎ

## sql 파일 위치

![%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%B5%E1%86%BC%20%E1%84%87%E1%85%AE%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%92%E1%85%A2%E1%86%BC%20%E1%84%89%E1%85%B5%20database%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5%20%E1%84%89%E1%85%A1%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%B8%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5%20c66b862c664741da9af69289ac04b8fd/Untitled%201.png](https://i.ibb.co/4ZMmFsz/Untitled.png)


당연히 방법이 있을 것 같아서 찾아보던 도중 classpath위치에 (resources 폴더) data.sql 파일을 생성하고 사용하고자 하는 데이터 베이스 시퀀스에 맞춰서 명령어를 넣어 주면 된다. 

create table 같은 ddl은 schema.sql 파일에 넣고, dml 같은 데이터 삽입은 data.sql 파일에 넣어주면 된다.
![](https://i.ibb.co/YDywJhv/image.png)
![](https://i.ibb.co/J3Jtfds/image.png)

### 쿼리를 모르겠다면 
만약에 시퀀스를 잘 모르겠다면, jpa의 `spring.jap.show-sql: true`로 application.yml에 넣어주면 console에서 날리는 쿼리를 볼 수 있다. 해당 쿼리를 보고 참고해서 원하는 쿼리를 작성하자! ㅎㅎ
![](https://i.ibb.co/ZLht8Bz/image.png)

## 주의사항

![%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%B5%E1%86%BC%20%E1%84%87%E1%85%AE%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%92%E1%85%A2%E1%86%BC%20%E1%84%89%E1%85%B5%20database%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5%20%E1%84%89%E1%85%A1%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%B8%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5%20c66b862c664741da9af69289ac04b8fd/Untitled.png](https://i.ibb.co/VqPS4yf/Untitled-1.png)

create table 등은 가능한데, data.sql에서의 쿼리가 먹히지 않아서 찾아보니 `ddl-auto: none, initialize: true` 로 설정해야 읽힌다. 추측하건데, ddl-auto는 자동으로 생성하지 않기 위해서 none을 하는 것 같고, initialize를 true로 해야 .sql 파일을 읽는 것 같다!

이상!!
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTI4NTQyMTE5NSwzMjkxOTkxMDEsLTMwMz
QyNzk2MF19
-->