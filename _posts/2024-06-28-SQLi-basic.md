---
layout: single
title:  "SQLi란?"
categories: SQLi
tag: [SQLi, sqlmap, 기초, 옵션]
toc: true
author_profile: false
---

[공지사항]** [본 블로그에 포함된 모든 정보는 교육 목적으로만 제공됩니다.](https://weoooo.github.io/notice/notice/)

## SQL 인젝션 개요

![What is SQL Injection (SQLi)? Types & Examples. Part 1❗️](https://cdn.prod.website-files.com/5ff66329429d880392f6cba2/6275078d9f62bcb3d2f7f811_SQLi.jpg)

SQL 인젝션(SQL Injection, SQLi)은 공격자가 애플리케이션이 데이터베이스에 수행하는 쿼리를 조작할 수 있게 하는 보안 취약점입니다. 

이는 주로 애플리케이션이 사용자 입력을 적절히 검증하지 않을 때 발생하며, 공격자가 자신의 SQL 명령을 쿼리에 "삽입"하거나 "주입"할 수 있게 합니다.

## SQL 인젝션의 작동 원리

### **사용자 입력 필드**

사용자 이름과 비밀번호를 묻는 로그인 폼이 있는 웹사이트를 가정해본다.

**SQL 쿼리**: 웹사이트는 제공된 자격 증명을 데이터베이스와 비교하기 위해 다음과 같은 SQL 쿼리를 사용할 수 있습니다.

```sql
SELECT * FROM users WHERE username = 'user_input' AND password = 'user_password';
```

### **인젝션**

공격자는 입력을 조작하여 악성 SQL 코드를 주입할 수 있습니다. 예를 들어, 사용자 이름 필드에 다음과 같이 입력한다고 가정해본다.

```sql
' OR 1=1
```

2번 3번을 결합한다.

```sql
SELECT * FROM users WHERE username = '' OR 1=1 AND password = 'user_password';
```

### **실행**

 '1'='1'은 항상 참이므로, 이 쿼리는 users 테이블의 모든 행을 반환하여 인증을 우회할 수 있습니다.

## SQL 인젝션의 유형

### **In-band SQLi (고전적 SQLi)**

공격자가 동일한 통신 채널을 사용하여 공격을 수행하고 결과를 수집합니다.

**에러 기반 SQLi**: 데이터베이스 오류 메시지를 이용해 정보를 수집합니다.

**유니온 기반 SQLi**: UNION SQL 연산자를 사용하여 두 개 이상의 SELECT 쿼리의 결과를 하나의 결과 집합으로 결합합니다.

### **Inferential SQLi (블라인드 SQLi)**

공격자가 인젝션의 직접적인 결과를 보지 못합니다. 대신 데이터베이스의 동작을 관찰하여 정보를 추론합니다.

**불린 기반 블라인드 SQLi**: 참 또는 거짓 조건에 따라 다른 결과를 반환하는 쿼리를 보냅니다.

**시간 기반 블라인드 SQLi**: 시간 지연을 유발하는 쿼리를 보내고 응답 시간을 통해 정보를 추론합니다.

### **Out-of-band SQLi**

공격자가 다른 채널을 사용하여 공격을 수행하고 결과를 수집합니다. 주로 HTTP 요청이나 DNS 쿼리를 통해 수행됩니다.

## 예제

취약한 PHP 로그인 스크립트를 예로 들어보겠습니다.

```php
<?php 
$username = $_POST['username'];
$password = $_POST['password'];
$query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'"; 
$result = mysqli_query($conn, $query); 
if (mysqli_num_rows($result) > 0) {
    echo "로그인 성공!";
} else {
    echo "잘못된 자격 증명!";
}
?>
```

공격자는 사용자 이름 필드에 `' OR '1'='1`을 입력하여 인증을 우회할 수 있습니다. 결과적으로 다음과 같은 쿼리가 생성됩니다:

```sql
SELECT * FROM users WHERE username = '' OR '1'='1' AND password = 'user_password';
```

### SQL 인젝션의 결과

**무단 접근**: 공격자가 인증을 우회하고 민감한 데이터에 접근할 수 있습니다.

**데이터 도난**: 공격자가 데이터베이스에서 민감한 정보를 추출할 수 있습니다.

**데이터 조작**: 공격자가 데이터를 수정하거나 삭제할 수 있습니다.

**데이터베이스 손상**: 공격자가 데이터베이스에서 관리 작업을 실행할 수 있습니다.

## 예방 및 완화 방법

**준비된 문(statement)과 매개변수화된 쿼리 사용**: 사용자 입력이 실행 가능한 코드가 아니라 데이터로 처리되도록 보장합니다.

```sql
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?"); 
$stmt->bind_param("ss",$username, $password); 
$stmt->execute();
```

**저장 프로시저 사용**: 데이터베이스에서 SQL 쿼리를 캡슐화하여 인젝션 위험을 줄입니다.

**입력 검증**: 사용자 입력이 예상 패턴과 타입에 맞는지 확인합니다.

**사용자 입력 이스케이핑**: 데이터베이스 라이브러리가 제공하는 함수를 사용하여 특수 문자를 이스케이핑합니다.

**최소 권한 원칙**: 데이터베이스 사용자 권한을 애플리케이션이 기능하는 데 필요한 최소한으로 제한합니다.

**정기적인 보안 테스트**: 정기적인 보안 평가와 코드 검토를 수행합니다.

## 결론

SQL 인젝션은 그 잠재적 영향으로 인해 여전히 가장 중요한 보안 취약점 중 하나입니다. 

SQLi의 작동 원리를 이해하고 효과적인 완화 전략을 구현함으로써 개발자는 애플리케이션과 데이터를 악의적인 공격으로부터 보호할 수 있습니다.

## 📖Reference

[https://cwe.mitre.org/data/definitions/89.html](https://cwe.mitre.org/data/definitions/89.html)

[What is SQL Injection (SQLi)? Types &amp; Examples. Part 1❗️](https://www.wallarm.com/what/structured-query-language-injection-sqli-part-1)

[SQL Injection_OWASP Foundation](https://owasp.org/www-community/attacks/SQL_Injection)
