---
layout: post
title: "PostgreSQL SQL: 트랜잭션과 ACID 속성 완벽 이해하기"
date: 2026-02-24 10:05:55 +0900
categories: [sql]
tags: [study, sql, postgresql, database, automation]
---

## 왜 이 주제가 중요한가?

실제 프로젝트에서 데이터 일관성은 생명입니다. 은행 송금, 재고 관리, 주문 처리 같은 작업에서 트랜잭션 처리가 잘못되면 심각한 데이터 손상이 발생합니다.

PostgreSQL의 ACID 속성을 제대로 이해하면 동시성 문제를 예방하고 안정적인 애플리케이션을 만들 수 있습니다.

## 핵심 개념

- **Atomicity (원자성)**
  트랜잭션의 모든 작업이 완전히 실행되거나 전혀 실행되지 않습니다. 중간에 실패하면 모두 롤백됩니다.

- **Consistency (일관성)**
  트랜잭션 전후로 데이터베이스가 유효한 상태를 유지합니다. 제약 조건 위반이 발생하지 않습니다.

- **Isolation (격리성)**
  동시에 실행되는 트랜잭션들이 서로 간섭하지 않습니다. 격리 수준에 따라 동작이 달라집니다.

- **Durability (지속성)**
  커밋된 데이터는 시스템 장애가 발생해도 유지됩니다. 디스크에 안전하게 저장됩니다.

- **Isolation Levels (격리 수준)**
  Read Uncommitted, Read Committed, Repeatable Read, Serializable 네 가지 수준이 있습니다.

## 실습 예제

### 기본 트랜잭션 구조

```sql
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
```

위 코드는 계좌 1에서 100을 빼고 계좌 2에 100을 더합니다. 두 작업이 모두 성공하거나 모두 실패합니다.

### 롤백 예제

```sql
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

ROLLBACK;
```

ROLLBACK을 실행하면 모든 변경 사항이 취소됩니다. 데이터는 BEGIN 전 상태로 돌아갑니다.

### 격리 수준 설정

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

BEGIN;
SELECT * FROM accounts WHERE id = 1;
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
COMMIT;
```

격리 수준을 SERIALIZABLE로 설정하면 가장 높은 수준의 격리를 제공합니다. 성능은 낮아지지만 데이터 안전성이 최고입니다.

### 세이브포인트 활용

```sql
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
SAVEPOINT sp1;

UPDATE accounts SET balance = balance + 100 WHERE id = 2;
ROLLBACK TO sp1;

COMMIT;
```

세이브포인트를 사용하면 트랜잭션 중간 지점으로 부분 롤백할 수 있습니다. 첫 번째 UPDATE는 유지되고 두 번째는 취소됩니다.

## 흔한 실수

- **자동 커밋 무시**
  기본적으로 각 SQL 문이 자동으로 커밋됩니다. 명시적으로 BEGIN을 사용하지 않으면 트랜잭션 보호를 받지 못합니다.

- **장시간 트랜잭션 유지**
  트랜잭션을 오래 열어두면 다른 작업을 차단하고 데드락을 유발합니다. 필요한 작업만 수행하고 빨리 커밋하세요.

- **격리 수준 과다 설정**
  SERIALIZABLE은 안전하지만 동시성이 매우 떨어집니다. 대부분의 경우 Read Committed로 충분합니다.

- **예외 처리 없는 커밋**
  에러 발생 시 자동으로 롤백되지 않습니다. 애플리케이션에서 명시적으로 ROLLBACK을 처리해야 합니다.

- **데드락 무시**
  두 트랜잭션이 서로 다른 순서로 리소스를 잠그면 데드락이 발생합니다. 항상 같은 순서로 테이블에 접근하세요.

## 오늘의 실습 체크리스트

- [ ] PostgreSQL에서 BEGIN과 COMMIT으로 기본 트랜잭션 작성하기
- [ ] ROLLBACK을 사용해 변경 사항 취소하기
- [ ] SAVEPOINT를 만들고 부분 롤백 테스트하기
- [ ] 각 격리 수준(Read Committed, Serializable) 차이 확인하기
- [ ] 두 개의 동시 트랜잭션을 실행해 격리 동작 관찰하기
- [ ] 데드락 상황 만들어보고 해결 방법 이해하기
- [ ] 자신의 프로젝트에서 트랜잭션이 필요한 부분 찾아 적용하기
