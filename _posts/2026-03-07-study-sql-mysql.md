---
layout: post
title: "MySQL SQL: 인덱스 전략으로 쿼리 성능 10배 향상시키기"
date: 2026-03-07 10:02:47 +0900
categories: [sql]
tags: [study, sql, mysql, database, automation]
---

## 왜 이 주제가 중요한가?

프로덕션 환경에서 데이터가 100만 건을 넘어가면 인덱스 없는 쿼리는 치명적이다.

인덱스 전략을 모르면 같은 기능을 구현해도 응답 시간이 5초 vs 0.05초처럼 극단적으로 차이난다. 사용자 경험과 서버 비용을 직결하는 필수 스킬이다.

## 핵심 개념

- **B-Tree 인덱스 구조**
  데이터를 정렬된 트리 형태로 저장하여 O(log n) 시간에 검색한다. MySQL의 기본 인덱스 타입이다.

- **단일 컬럼 vs 복합 인덱스**
  복합 인덱스는 여러 컬럼을 함께 인덱싱하며, 왼쪽부터 순서대로 효과가 있다.

- **인덱스 선택도(Selectivity)**
  한 값이 차지하는 행의 비율이 낮을수록 좋다. 성별(2개 값)보다 이메일(고유값)에 인덱스를 만들어야 한다.

- **EXPLAIN으로 실행 계획 분석**
  쿼리가 인덱스를 사용하는지, 몇 개 행을 스캔하는지 확인한다.

- **인덱스 유지 비용**
  INSERT, UPDATE, DELETE 시마다 인덱스도 갱신되므로 무분별한 인덱스는 성능을 해친다.

## 실습 예제

### 문제 상황: 느린 쿼리

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255),
  name VARCHAR(100),
  created_at TIMESTAMP,
  status VARCHAR(20)
);

-- 100만 건의 데이터가 있을 때
SELECT * FROM users WHERE email = 'john@example.com';
```

이 쿼리는 인덱스 없이 100만 행을 모두 스캔한다(Full Table Scan).

### 해결책: 올바른 인덱스 설계

```sql
-- 1단계: 인덱스 생성
CREATE INDEX idx_email ON users(email);

-- 2단계: 실행 계획 확인
EXPLAIN SELECT * FROM users WHERE email = 'john@example.com';
```

EXPLAIN 결과에서 `type: ref`이고 `rows: 1`이면 인덱스가 제대로 작동한다.

### 복합 인덱스 예제

```sql
-- 자주 함께 검색하는 두 컬럼
CREATE INDEX idx_status_created 
  ON users(status, created_at);

-- 이 쿼리는 인덱스를 탈 수 있다
SELECT * FROM users 
WHERE status = 'active' AND created_at > '2026-01-01';
```

순서가 중요하다. 선택도가 높은 컬럼(status)을 먼저 놓는다.

### 인덱스를 타지 않는 경우

```sql
-- ❌ 나쁜 예: 함수 사용
SELECT * FROM users WHERE YEAR(created_at) = 2026;

-- ✅ 좋은 예: 범위 검색
SELECT * FROM users 
WHERE created_at >= '2026-01-01' 
  AND created_at < '2027-01-01';
```

함수를 사용하면 인덱스를 활용할 수 없다.

## 자주 하는 실수

- **모든 컬럼에 인덱스를 만드는 것**
  인덱스는 저장 공간을 차지하고 쓰기 성능을 해친다. 자주 검색하는 컬럼만 선택해야 한다.

- **복합 인덱스의 순서를 무시하는 것**
  `INDEX(a, b)`는 `WHERE a = 1 AND b = 2`에는 효과적이지만, `WHERE b = 2`에는 작동하지 않는다.

- **LIKE '%keyword'로 검색하기**
  앞에 와일드카드가 있으면 인덱스를 사용할 수 없다. `LIKE 'keyword%'`는 가능하다.

- **NULL 값을 무시하는 것**
  `WHERE column IS NULL`도 인덱스를 탈 수 있으니 고려해야 한다.

- **EXPLAIN을 확인하지 않고 인덱스를 만드는 것**
  실제로 쿼리가 인덱스를 사용하는지 항상 검증해야 한다.

## 오늘의 실습 체크리스트

- [ ] 로컬 MySQL에 100만 건 이상의 테스트 데이터 생성
- [ ] EXPLAIN으로 Full Table Scan 확인하기
- [ ] 검색 조건에 맞는 단일 인덱스 생성 후 성능 비교
- [ ] 복합 인덱스를 만들고 컬럼 순서 변경 시 성능 차이 관찰
- [ ] LIKE, 함수, NULL 조건에서 인덱스 동작 테스트
- [ ] `SHOW INDEX FROM table_name`으로 생성된 인덱스 목록 확인
- [ ] 불필요한 인덱스 삭제하고 저장 공간 확인
