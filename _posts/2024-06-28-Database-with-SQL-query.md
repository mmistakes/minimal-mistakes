---
layout: single
title:  "데이터베이스 설계 및 SQL쿼리"
categories: Database SQL
tag: [SQL, 데이터베이스,이론]
toc: true
author_profile: false
---

**[공지사항]** [본 블로그에 포함된 모든 정보는 교육 목적으로만 제공됩니다.](https://weoooo.github.io/notice/notice/)
{: .notice--danger}

<div class="notice--primary">
<h2>SQL Injection과 데이터베이스 개념을 이해하기 위해, 몇 가지 주요 용어들을 알아두는 것이 중요해요. </h2>
<h2>이 용어들을 알면 데이터베이스의 구조와 SQL 쿼리를 더 잘 이해할 수 있어요.</h2>
</div>

## 📖데이터베이스(Database)

> 데이터베이스는 데이터를 체계적으로 저장하고 관리하는 시스템이에요. 

여러 개의 테이블을 포함하고 있으며, 각 테이블은 특정 종류의 데이터를 저장해요.

예를 들어, 회원 정보를 저장하는 데이터베이스가 있다면, 그 안에 회원들의 이름, 이메일, 비밀번호 등이 저장되어 있을 거예요.

### **테이블(Table)**

> 테이블은 데이터베이스 내에서 데이터를 행(Row)과 열(Column)로 구성하여 저장하는 구조에요.

각 테이블은 고유의 이름을 가지고 있으며, 관련된 데이터를 저장해요.

예를 들어, `users` 테이블은 회원 정보를 저장하고, `posts` 테이블은 게시글 정보를 저장할 수 있어요.

**예시: users 테이블**

| id  | username | email            | password   |
| --- | -------- | ---------------- | ---------- |
| 1   | john     | john@example.com | hashed_pw1 |
| 2   | jane     | jane@example.com | hashed_pw2 |

### **컬럼(Column)**

> 컬럼은 테이블 내에서 데이터를 저장하는 각 열을 의미해요. 

각 컬럼은 특정 데이터 타입을 가지며, 테이블 내의 모든 행에서 동일한 종류의 데이터를 저장해요. 

예를 들어, `username` 컬럼은 모든 행에서 사용자 이름을 저장해요.

- `id`: 정수형 데이터 타입, 각 행의 고유 식별자
- `username`: 문자열 데이터 타입, 사용자 이름
- `email`: 문자열 데이터 타입, 사용자 이메일
- `password`: 문자열 데이터 타입, 암호화된 비밀번호

### **행(Row)**

> 행은 테이블 내에서 하나의 레코드를 의미해요. 

테이블의 각 행은 관련된 여러 컬럼에 데이터를 포함하고 있어요.

예를 들어, `users` 테이블의 한 행은 한 명의 회원 정보를 저장해요.

| id  | username | email            | password   |
| --- | -------- | ---------------- | ---------- |
| 1   | john     | john@example.com | hashed_pw1 |

### **스키마(Schema)**

> 스키마는 데이터베이스 내의 테이블, 뷰, 인덱스, 절차 등 데이터베이스 객체의 구조를 정의해요.

데이터베이스의 조직 방식과 데이터를 어떻게 저장할 것인지를 결정해요. 스키마는 데이터베이스의 청사진이라고 할 수 있어요.

### **기본 키(Primary Key)**

> 기본 키는 테이블 내에서 각 행을 고유하게 식별할 수 있는 컬럼 또는 컬럼 집합이에요.

기본 키는 `중복 값을` 가질 수 없고, `NULL 값`을 가질 수 없어요.

예를 들어, `users` 테이블의 `id` 컬럼은 기본 키로 사용될 수 있어요.

### **외래 키(Foreign Key)**

> 외래 키는 한 테이블의 컬럼이 다른 테이블의 기본 키를 참조하는 키에요. 

이는 테이블 간의 관계를 정의하고 데이터 무결성을 유지하는 데 사용돼요.

**예시:** `orders` 테이블의 `user_id` 컬럼은 `users` 테이블의 `id` 컬럼을 참조하는 외래 키로 사용될 수 있어요.

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### **인덱스(Index)**

> 인덱스는 테이블의 검색 속도를 높이기 위해 사용하는 데이터 구조에요.

책의 색인처럼, 특정 컬럼의 값을 빠르게 찾을 수 있게 해줘요.

```sql
CREATE INDEX idx_username ON users(username);
```

## 🧑‍💻SQL(Structured Query Language)

SQL은 데이터베이스와 상호작용하기 위한 언어로, 

주요 SQL 쿼리 유형에는 데이터 조회(SELECT), 데이터 추가(INSERT), 데이터 수정(UPDATE), 데이터 삭제(DELETE) 등이 있습니다.

### SELECT 쿼리

데이터베이스에서 데이터를 조회할 때 사용됩니다.

```sql
INSERT INTO users (username, email, password) VALUES ('john', 'john@example.com', 'hashed_pw1');
```

모든 회원 정보를 조회합니다.

### INSERT 쿼리

데이터베이스에 새로운 데이터를 추가할 때 사용됩니다.

```sql
INSERT INTO users (username, email, password) VALUES ('john', 'john@example.com', 'hashed_pw1');
```

새로운 회원 정보를 추가합니다.

### UPDATE 쿼리

데이터베이스의 기존 데이터를 수정할 때 사용됩니다.

```sql
UPDATE users SET email='newemail@example.com' WHERE username='john';
```

회원의 이메일 정보를 수정합니다.

### DELETE 쿼리

데이터베이스에서 데이터를 삭제할 때 사용됩니다.

```sql
DELETE FROM users WHERE username='john';
```

회원 정보를 삭제합니다.

## 🛠️데이터베이스 설계 예제

간단한 블로그 시스템의 데이터베이스 설계 예제입니다.

### users 테이블

회원 정보를 저장하는 테이블입니다.

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);
```

### posts 테이블

게시글 정보를 저장하는 테이블입니다.

```sql
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🛠️SQL 쿼리 예제

### 데이터 조회

블로그 시스템에서 특정 사용자가 작성한 모든 게시글을 조회하는 쿼리입니다.

```sql
SELECT posts.title, posts.content, users.username
FROM posts
JOIN users ON posts.user_id = users.id
WHERE users.username = 'john';
```

### 데이터 추가

새로운 사용자를 추가하는 쿼리입니다.

```sql
INSERT INTO users (username, email, password) VALUES ('jane', 'jane@example.com', 'hashed_pw2');
```

### 데이터 수정

특정 사용자의 이메일을 수정하는 쿼리입니다.

```sql
UPDATE users SET email='jane_new@example.com' WHERE username='jane';
```

### 데이터 삭제

특정 사용자의 계정을 삭제하는 쿼리입니다.

```sql
DELETE FROM users WHERE username='jane';
```
