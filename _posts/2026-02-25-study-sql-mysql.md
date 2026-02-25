---
layout: post
title: "MySQL SQL 기초: SELECT와 WHERE로 데이터 조회하기"
date: 2026-02-25 10:11:19 +0900
categories: [sql]
tags: [study, sql, mysql, database, automation]
---

## 왜 이 주제가 중요한가?

MySQL에서 데이터를 효율적으로 조회하는 것은 모든 애플리케이션의 핵심입니다.

SELECT와 WHERE 절을 제대로 이해하지 못하면 불필요한 데이터를 모두 가져오거나, 필요한 데이터를 놓치게 됩니다. 이는 성능 저하와 버그로 이어집니다.

## 핵심 개념

- **SELECT 절의 역할**
  데이터베이스에서 어떤 열(컬럼)을 가져올지 지정합니다. * 는 모든 열을 의미합니다.

- **WHERE 절로 행 필터링**
  조건을 만족하는 행(row)만 반환합니다. 조건이 없으면 전체 데이터를 가져옵니다.

- **비교 연산자의 종류**
  = (같음), != (다름), > (초과), < (미만), >= (이상), <= (이하)를 사용합니다.

- **논리 연산자 AND, OR**
  여러 조건을 조합할 때 AND는 모두 만족, OR은 하나라도 만족하면 됩니다.

- **NULL 처리**
  IS NULL, IS NOT NULL을 사용합니다. = NULL은 작동하지 않습니다.

## 실습 예제

다음은 users 테이블에서 데이터를 조회하는 기본 쿼리입니다.

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  age INT,
  city VARCHAR(50),
  salary INT
);
```

기본 SELECT 쿼리:

```sql
SELECT name, age FROM users;
```

WHERE 절로 조건 추가:

```sql
SELECT name, age FROM users WHERE age > 25;
```

여러 조건 조합:

```sql
SELECT name, salary FROM users 
WHERE age > 25 AND city = 'Seoul';
```

OR 연산자 사용:

```sql
SELECT name FROM users 
WHERE city = 'Seoul' OR city = 'Busan';
```

NULL 값 확인:

```sql
SELECT name FROM users WHERE city IS NULL;
```

## 흔한 실수

- **NULL 비교에 = 사용**
  NULL은 = 로 비교할 수 없습니다. 반드시 IS NULL을 사용하세요.

- **WHERE 절 없이 전체 데이터 조회**
  프로덕션 환경에서 SELECT * 는 위험합니다. 필요한 열만 명시하세요.

- **문자열 비교 시 따옴표 누락**
  WHERE name = 'John' 처럼 문자열은 반드시 따옴표로 감싸야 합니다.

- **AND와 OR 우선순위 혼동**
  복잡한 조건은 괄호로 명확히 하세요. WHERE (age > 25 AND city = 'Seoul') OR salary > 5000

- **대소문자 구분 실수**
  MySQL은 기본적으로 문자열 비교 시 대소문자를 구분하지 않습니다. 필요하면 BINARY를 사용하세요.

## 오늘의 실습 체크리스트

- [ ] 로컬 MySQL에서 users 테이블 생성하기
- [ ] SELECT * 로 전체 데이터 조회해보기
- [ ] WHERE age > 30 조건으로 필터링하기
- [ ] AND를 사용해 두 개 이상의 조건 조합하기
- [ ] OR 연산자로 여러 도시의 사용자 찾기
- [ ] IS NULL로 빈 값 확인하기
- [ ] 문자열 검색 시 따옴표 필수 확인하기
- [ ] 복잡한 조건에 괄호 추가해서 명확히 하기
