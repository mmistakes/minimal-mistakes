---
layout: post
title: "PostgreSQL SQL: 효율적인 쿼리 작성과 인덱스 전략"
date: 2026-03-06 10:10:38 +0900
categories: [sql]
tags: [study, sql, postgresql, database, automation]
---

## 왜 이 주제가 중요한가?

PostgreSQL에서 SQL을 제대로 작성하는 것은 애플리케이션 성능을 좌우하는 핵심 요소입니다.

대규모 데이터를 다루는 실제 프로젝트에서는 쿼리 최적화 없이 응답 시간이 수 초 이상 걸릴 수 있습니다. 올바른 인덱스 전략과 쿼리 작성법을 알면 데이터베이스 부하를 크게 줄일 수 있습니다.

## 핵심 개념

- **EXPLAIN 분석**
  쿼리 실행 계획을 확인하여 병목 지점을 파악하는 방법입니다.

- **인덱스 활용**
  B-tree, Hash, GiST 등 다양한 인덱스 타입을 상황에 맞게 선택하는 것이 중요합니다.

- **조인 최적화**
  Nested Loop, Hash Join, Merge Join 중 가장 효율적인 방식을 선택하도록 유도합니다.

- **쿼리 작성 패턴**
  SELECT 절에서 필요한 컬럼만 선택하고, WHERE 절에서 조건을 명확히 하는 습관입니다.

- **통계 정보 관리**
  ANALYZE 명령으로 테이블 통계를 최신으로 유지하면 옵티마이저가 더 나은 계획을 수립합니다.

## 실전 미니 예제

### 1단계: 기본 쿼리와 EXPLAIN 분석

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  amount DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2단계: 인덱스 없이 쿼리 실행 계획 확인

```sql
EXPLAIN ANALYZE
SELECT u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2025-01-01'
GROUP BY u.id, u.email
ORDER BY order_count DESC;
```

위 쿼리는 Seq Scan(전체 테이블 스캔)을 수행할 가능성이 높습니다.

### 3단계: 적절한 인덱스 생성

```sql
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_orders_user_id ON orders(user_id);
```

인덱스 생성 후 동일한 EXPLAIN ANALYZE를 실행하면 Index Scan으로 변경되어 성능이 향상됩니다.

### 4단계: 최적화된 쿼리 작성

```sql
SELECT u.id, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2025-01-01'
GROUP BY u.id, u.email
HAVING COUNT(o.id) > 0
ORDER BY order_count DESC
LIMIT 100;
```

HAVING 절로 필터링하고 LIMIT을 추가하면 불필요한 행 처리를 줄입니다.

## 자주 하는 실수

- **SELECT * 사용**
  필요하지 않은 모든 컬럼을 조회하면 네트워크 전송량이 증가합니다. 필요한 컬럼만 명시적으로 선택하세요.

- **인덱스 과다 생성**
  모든 컬럼에 인덱스를 만들면 INSERT/UPDATE 성능이 저하됩니다. 자주 검색되는 컬럼에만 선택적으로 생성하세요.

- **LIKE 쿼리 오용**
  WHERE email LIKE '%example%' 패턴은 인덱스를 활용하지 못합니다. 가능하면 정확한 검색 조건을 사용하세요.

- **서브쿼리 남용**
  복잡한 서브쿼리는 가독성을 해치고 성능을 저하시킵니다. 조인으로 대체할 수 있는지 검토하세요.

- **통계 정보 미갱신**
  ANALYZE를 주기적으로 실행하지 않으면 옵티마이저가 잘못된 실행 계획을 수립합니다.

## 오늘의 실습 체크리스트

- [ ] PostgreSQL 로컬 환경에서 샘플 테이블 2개 이상 생성하기
- [ ] EXPLAIN 명령으로 쿼리 실행 계획 분석해보기
- [ ] 인덱스 없는 상태에서 쿼리 실행 시간 측정하기
- [ ] 적절한 인덱스 생성 후 성능 개선 확인하기
- [ ] 자신의 프로젝트에서 느린 쿼리 1개 찾아 최적화하기
- [ ] ANALYZE 명령 실행하여 통계 정보 갱신하기
