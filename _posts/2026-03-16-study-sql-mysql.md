---
layout: post
title: "MySQL SQL 기초: SELECT와 WHERE로 데이터 조회하기"
date: 2026-03-16 10:15:39 +0900
categories: [sql]
tags: [study, sql, mysql, database, automation]
---

## 왜 이 주제가 중요한가?

MySQL에서 SELECT와 WHERE는 모든 데이터 조회의 기본입니다. 실무에서 90% 이상의 쿼리가 이 두 가지를 조합하여 작성됩니다.

올바른 SELECT와 WHERE 작성 능력이 없으면 성능 문제, 데이터 누수, 잘못된 분석 결과로 이어집니다.

## 핵심 개념

- **SELECT 절의 역할**
  조회할 컬럼을 명시적으로 지정합니다. SELECT *는 피하고 필요한 컬럼만 선택하세요.

- **WHERE 절의 조건 작성**
  데이터를 필터링하는 조건을 정의합니다. 인덱스를 활용하려면 조건 작성 방식이 중요합니다.

- **비교 연산자와 논리 연산자**
  =, <, >, <=, >=, !=, AND, OR, NOT을 정확히 조합하여 복잡한 조건을 만듭니다.

- **NULL 처리**
  NULL은 일반 비교 연산자로 검사할 수 없습니다. IS NULL, IS NOT NULL을 사용해야 합니다.

- **LIKE를 이용한 패턴 매칭**
  %와 _를 활용하여 부분 문자열을 검색합니다. 성능을 고려하여 사용해야 합니다.

## 실습 예제

다음은 간단한 users 테이블 구조입니다.

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100),
  age INT,
  created_at DATETIME
);
```

기본 SELECT 쿼리입니다.

```sql
SELECT id, name, email FROM users;
```

단일 조건으로 필터링합니다.

```sql
SELECT id, name, email FROM users WHERE age > 25;
```

여러 조건을 AND로 결합합니다.

```sql
SELECT id, name, email FROM users 
WHERE age > 25 AND created_at > '2025-01-01';
```

OR를 사용하여 여러 조건 중 하나를 만족하는 데이터를 조회합니다.

```sql
SELECT id, name, email FROM users 
WHERE age < 20 OR age > 60;
```

LIKE로 이메일 도메인 검색합니다.

```sql
SELECT id, name, email FROM users 
WHERE email LIKE '%@gmail.com';
```

NULL 값을 확인합니다.

```sql
SELECT id, name FROM users WHERE email IS NULL;
```

## 자주하는 실수

- **SELECT * 남용**
  불필요한 모든 컬럼을 조회하면 네트워크 대역폭을 낭비하고 쿼리 속도가 느려집니다. 필요한 컬럼만 명시하세요.

- **NULL 비교에 = 사용**
  WHERE email = NULL은 항상 거짓입니다. IS NULL을 반드시 사용하세요.

- **LIKE 패턴 시작에 %**
  WHERE email LIKE '%gmail%'처럼 앞에 %를 붙이면 인덱스를 활용할 수 없어 전체 테이블 스캔이 발생합니다.

- **복잡한 조건을 괄호 없이 작성**
  AND와 OR를 섞을 때 괄호를 생략하면 예상과 다른 결과가 나옵니다. 명확하게 괄호를 사용하세요.

- **타입 변환 암묵적 사용**
  WHERE age = '25'처럼 문자열로 비교하면 타입 변환이 발생하여 인덱스를 활용하지 못합니다.

## 오늘의 실습 체크리스트

- [ ] 로컬 MySQL에 테스트 테이블 생성하기
- [ ] SELECT로 모든 컬럼 조회한 후 필요한 컬럼만 선택하기
- [ ] WHERE 절에서 단일 조건 (=, >, <) 사용해보기
- [ ] AND와 OR를 조합하여 복합 조건 작성하기
- [ ] NULL 값을 IS NULL로 검사하기
- [ ] LIKE를 사용하여 패턴 매칭 연습하기
- [ ] 작성한 쿼리의 실행 계획 확인하기 (EXPLAIN)
- [ ] 같은 결과를 다양한 WHERE 조건으로 표현해보기
