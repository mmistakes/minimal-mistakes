---
layout: post
title: "PostgreSQL에서 효율적인 인덱스 전략 세우기"
date: 2026-03-15 10:15:20 +0900
categories: [sql]
tags: [study, sql, postgresql, database, automation]
---

## 왜 이 주제가 중요한가?

프로덕션 환경에서 데이터베이스 성능은 전체 애플리케이션 속도를 결정합니다. 인덱스 없이는 수백만 건의 데이터를 풀 스캔하게 되어 쿼리가 수십 초 이상 걸릴 수 있습니다.

올바른 인덱스 전략은 쿼리 응답 시간을 밀리초 단위로 단축시키고, 데이터베이스 부하를 크게 줄입니다. 특히 실시간 서비스에서는 필수적입니다.

## 핵심 개념

- **B-Tree 인덱스**
  PostgreSQL의 기본 인덱스 타입으로, 범위 검색과 정렬에 최적화되어 있습니다.

- **복합 인덱스 (Composite Index)**
  여러 컬럼을 함께 인덱싱하여 WHERE 절의 여러 조건을 동시에 처리합니다.

- **인덱스 선택도 (Selectivity)**
  인덱스가 전체 행 중 얼마나 적은 수를 선택하는지를 나타냅니다. 높을수록 효율적입니다.

- **EXPLAIN ANALYZE**
  쿼리 실행 계획을 분석하여 인덱스 사용 여부와 성능을 확인하는 도구입니다.

- **인덱스 유지 비용**
  INSERT, UPDATE, DELETE 시 인덱스도 함께 갱신되므로 쓰기 성능에 영향을 줍니다.

## 실습 예제

### 1단계: 테스트 테이블 생성

```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'active'
);

INSERT INTO users (email, username, status)
SELECT 
  'user' || i || '@example.com',
  'username' || i,
  CASE WHEN i % 3 = 0 THEN 'inactive' ELSE 'active' END
FROM generate_series(1, 100000) AS i;
```

### 2단계: 인덱스 없이 쿼리 성능 확인

```sql
EXPLAIN ANALYZE
SELECT * FROM users 
WHERE email = 'user5000@example.com';
```

이 쿼리는 전체 100,000행을 스캔합니다. 실행 계획에서 "Seq Scan"이 표시됩니다.

### 3단계: 단일 컬럼 인덱스 생성

```sql
CREATE INDEX idx_users_email ON users(email);
```

같은 쿼리를 다시 실행하면 "Index Scan"으로 변경되고 훨씬 빠릅니다.

### 4단계: 복합 인덱스 활용

```sql
CREATE INDEX idx_users_status_created 
ON users(status, created_at DESC);

EXPLAIN ANALYZE
SELECT * FROM users 
WHERE status = 'active' 
ORDER BY created_at DESC 
LIMIT 10;
```

이 인덱스는 WHERE 절의 status 필터링과 ORDER BY 정렬을 동시에 처리합니다.

### 5단계: 인덱스 효율성 확인

```sql
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
WHERE tablename = 'users';
```

idx_scan이 0이면 사용되지 않는 인덱스입니다. 이런 인덱스는 삭제하는 것이 좋습니다.

## 흔한 실수

- **모든 컬럼에 인덱스 생성**
  인덱스는 저장 공간을 차지하고 쓰기 성능을 저하시킵니다. 실제로 WHERE 절에서 자주 사용되는 컬럼만 인덱싱하세요.

- **복합 인덱스의 컬럼 순서 무시**
  복합 인덱스에서 컬럼 순서는 중요합니다. 선택도가 높은 컬럼을 먼저 배치하세요. (status, email 순서가 email, status 순서보다 효율적)

- **EXPLAIN 분석 없이 인덱스 생성**
  실제로 인덱스가 사용되는지 확인하지 않으면 낭비입니다. 항상 EXPLAIN ANALYZE로 검증하세요.

- **NULL 값 처리 간과**
  NULL은 인덱스에서 특별하게 처리됩니다. IS NULL 조건이 자주 사용되면 별도의 인덱스가 필요할 수 있습니다.

- **인덱스 유지 비용 무시**
  쓰기가 많은 테이블에 너무 많은 인덱스를 만들면 INSERT/UPDATE 성능이 급격히 떨어집니다.

## 오늘의 실습 체크리스트

- [ ] PostgreSQL에서 새 테이블 생성하고 샘플 데이터 100,000건 이상 삽입
- [ ] EXPLAIN ANALYZE로 인덱스 없는 쿼리의 실행 계획 확인
- [ ] 자주 사용되는 WHERE 조건에 대해 단일 인덱스 생성
- [ ] 같은 쿼리를 다시 실행하여 성능 개선 확인
- [ ] 복합 인덱스를 생성하고 여러 조건을 함께 처리하는 쿼리 테스트
- [ ] pg_stat_user_indexes 뷰로 실제 사용되는 인덱스 확인
- [ ] 사용되지 않는 인덱스를 찾아 DROP INDEX로 제거해보기
