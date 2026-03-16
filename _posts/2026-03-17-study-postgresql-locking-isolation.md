---
layout: post
title: "PostgreSQL 동시성 제어 실무: Isolation Level과 Lock 경합 줄이기"
date: 2026-03-17 08:35:00 +0900
categories: [sql]
tags: [study, sql, postgresql, transaction, locking, performance, automation]
---

## 문제 정의

트래픽이 늘면 대부분의 서비스는 쿼리 자체보다 **동시성 충돌**에서 먼저 무너진다. 대표 증상은 아래와 같다.

- 같은 행을 동시에 수정할 때 대기 시간이 급증
- 배치 작업이 온라인 트랜잭션을 막아서 타임아웃 발생
- 재시도 로직이 중복 업데이트를 유발

핵심은 "쿼리를 빠르게"보다 먼저 **트랜잭션 경계를 짧게, 충돌 확률을 낮게** 설계하는 것이다.

## 선택지 비교

### 1) READ COMMITTED 유지 + 애플리케이션 재시도

- 장점: 기본 설정이라 운영 부담이 낮다.
- 단점: Lost Update 같은 논리 충돌을 개발자가 직접 막아야 한다.

### 2) REPEATABLE READ / SERIALIZABLE로 격상

- 장점: 일관성 보장이 강해진다.
- 단점: 락/검증 비용 증가, 고트래픽 구간에서 실패율 상승 가능.

### 3) 비관적 락 (`FOR UPDATE`) 적극 사용

- 장점: 동일 자원 동시 수정 방지에 직관적이다.
- 단점: 잠금 범위를 넓히면 오히려 전체 처리량이 떨어진다.

실무에서는 보통 **READ COMMITTED + 좁은 범위의 명시적 락 + 재시도** 조합이 가장 안정적이다.

## 구현 핵심

### 1) 트랜잭션 경계 최소화

비즈니스 검증, 외부 API 호출, 파일 업로드를 같은 트랜잭션에 묶지 않는다.

```sql
BEGIN;
SELECT id, balance
FROM accounts
WHERE id = $1
FOR UPDATE;

UPDATE accounts
SET balance = balance - $2, updated_at = now()
WHERE id = $1;
COMMIT;
```

`FOR UPDATE`는 정말 필요한 순간에만, 그리고 **가장 늦게 획득**한다.

### 2) 작업 큐성 처리에는 SKIP LOCKED 사용

```sql
WITH picked AS (
  SELECT id
  FROM job_queue
  WHERE status = 'PENDING'
  ORDER BY id
  LIMIT 100
  FOR UPDATE SKIP LOCKED
)
UPDATE job_queue q
SET status = 'RUNNING', started_at = now()
FROM picked
WHERE q.id = picked.id
RETURNING q.id;
```

워커 여러 대가 동시에 실행돼도 같은 작업을 중복 집계하지 않는다.

### 3) 낙관적 동시성 제어(버전 컬럼)

```sql
UPDATE orders
SET status = 'PAID', version = version + 1
WHERE id = $1
  AND version = $2;
```

영향 행이 0이면 충돌로 간주하고 재조회/재시도한다. 락 대기를 줄이면서 정합성을 지킨다.

## 성능/운영 이슈

### 1) 락 대기 모니터링 쿼리

```sql
SELECT
  a.pid,
  a.usename,
  a.state,
  a.wait_event_type,
  a.wait_event,
  now() - a.query_start AS query_age,
  a.query
FROM pg_stat_activity a
WHERE a.datname = current_database()
  AND a.state <> 'idle'
ORDER BY query_age DESC;
```

핵심 지표:

- `wait_event_type = Lock` 비율
- 장기 실행 트랜잭션 수
- deadlock 발생 빈도

### 2) "긴 트랜잭션"을 제일 먼저 제거

트랜잭션 안에서 아래 작업이 있으면 즉시 분리한다.

- 외부 API 호출
- 대용량 JSON 직렬화
- 파일 I/O

### 3) 배치 vs 온라인 분리

대량 업데이트는 `LIMIT` 기반 청크로 나눠 수행한다.

```sql
UPDATE users
SET status = 'INACTIVE'
WHERE id IN (
  SELECT id FROM users
  WHERE last_login_at < now() - interval '1 year'
  ORDER BY id
  LIMIT 5000
);
```

잠금 점유 시간을 짧게 끊어 온라인 트랜잭션 영향도를 낮춘다.

## 회고 및 확장 포인트

동시성 이슈는 "DB 버그"가 아니라 **업무 모델링의 빈틈**에서 나온다. 특히 아래를 먼저 점검하면 실패율이 빠르게 떨어진다.

1. 같은 엔티티를 동시에 바꾸는 유스케이스가 어디인지
2. 반드시 직렬화해야 하는 필드가 무엇인지
3. 재시도 시 부작용(중복 결제/중복 발송)이 없는지

다음 단계는 Outbox + Idempotency Key를 붙여 "재시도 가능한 아키텍처"로 확장하는 것이다.

## 오늘의 적용 체크리스트

- [ ] 핵심 쓰기 API의 트랜잭션 구간 길이 측정
- [ ] `FOR UPDATE` 사용 구간에서 잠금 범위 재검토
- [ ] 워커 큐 처리에 `SKIP LOCKED` 적용 가능성 검토
- [ ] `version` 기반 낙관적 제어가 필요한 테이블 식별
- [ ] `pg_stat_activity` 대시보드에 Lock 대기 지표 추가
