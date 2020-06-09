---
title: \[MSSQL] JDBC 로 SP(StoredProcedue) 호출 시 발생하는 에러 해결 방법
permalink:  /danal/lg-pay/stored-procedure/error
categories: 
   - java
   - mssql
   - jdbc
   - stored-procedure
   - error

tags:
   - lg-pay
   - error
   - stored-procedure
   - procedure
   - sp
   - mssql
   - java
   - mssql

last_modified_at: 2020-06-09  9:25:59.77 

---
# MSSQL에서 발생한 Error 메세지들

## 매개 변수 번호 {} 가 설정되지 않았습니다.
해당 에러의 경우 CallableStatement에 parameter를 설정해 줄 때, null 값이 들어가서 발생한 에러이다.
```java
callableStatement.setInt(1, null);
callableStatement.setString(2, null);
```
위와 같이 null이 들어간 경우 해당 에러 메세지가 발생한다.  
이를 해결하기 위해서 
```java
callableStatement.setNull(1, type);
```
이런 식으로 null 인경우는 setNull 메소드를 호출해야 한다!  

## 저장 프로시저 {} 을(를) 찾을 수 없습니다.
이 경우, 호출하는 프로시저명이 틀렸을  경우 발생한다.  
프로시저 명 혹은 데이터 베이스 명이나 Owner 명이 생략 된건 아닌지 체크해본다.
```java
call [DB].[Owner].[프로시저명]
call Auth.dbo.spTest
```

## 형식 매개 변수 "{0}"이(가) OUTPUT 매개 변수로 선언되지 않았지만 실제 매개 변수가 요청된 출력에 전달되었습니다.

해당 메세지는 sp에 설정된 parameter를 전부 선언하지 않았기 때문에 발생하는 에러이다.  
혹시나 param, 혹은 output을 빠트린 것 없이 전부 등록한지 확인해보자.  

## 개체 한정자의 데이터베이스 이름 구성 요소는_ 현재 데이터베이스의 이름이어야 합니다.

mssql에서 conf(설정)에서 url 등록 시 포트 뒤에 사용하는 데이터베이스 이름을 명시해줘야한다.
```xml
<url>[url]:[port];databaseName=[DB명]</url>
```

mysql의 경우 포트 뒤에 /(슬래쉬)를 명시한뒤 DB명을 적지만 mssql의 경우 ;(세미콜론)을 명시한뒤 databaseName=[DB명]을 기술해야한다.  
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTQyMTU2MjNdfQ==
-->