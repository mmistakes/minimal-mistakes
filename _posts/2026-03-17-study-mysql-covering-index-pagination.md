---
layout: post
title: "MySQL 검색 API 고도화: Covering Index와 Pagination 트레이드오프"
date: 2026-03-17 08:45:00 +0900
categories: [sql]
tags: [study, sql, mysql, index, pagination, performance, automation]
---

## 문제 정의

검색 API는 처음엔 빠르다가 데이터가 수백만 건이 되면 급격히 느려진다. 특히 아래 조합에서 병목이 잘 발생한다.

- `WHERE` + `ORDER BY` + `LIMIT OFFSET`
- 다중 필터 + 정렬 + 목록 화면

문제의 본질은 OFFSET 자체보다, **정렬 대상 행을 읽는 비용**이 커지는 데 있다.

## 선택지 비교

### 1) 단순 OFFSET 기반 페이징 유지

- 장점: 구현이 가장 단순함
- 단점: 페이지가 뒤로 갈수록 스캔 비용 급증

### 2) Keyset Pagination(Seek Method)

- 장점: 대규모 데이터에서도 성능 안정적
- 단점: 임의 페이지 점프 UX 구현이 어려움

### 3) Covering Index + 제한적 OFFSET

- 장점: 기존 UX 유지하면서 성능 개선 가능
- 단점: 인덱스 설계 미스 시 쓰기 비용 증가

실무에서는 "관리자 화면은 OFFSET", "대규모 피드는 Keyset"으로 분리하는 경우가 많다.

## 구현 핵심

### 1) 목록 조회 패턴을 인덱스 순서로 맞추기

예: 주문 목록 필터

- 조건: `tenant_id`, `status`
- 정렬: `created_at DESC`, `id DESC`
- 조회 컬럼: `id`, `status`, `created_at`, `total_amount`

```sql
CREATE INDEX idx_orders_list
ON orders (tenant_id, status, created_at DESC, id DESC, total_amount);
```

이렇게 구성하면 인덱스만으로 결과를 반환하는 **Covering Index** 가능성이 높아진다.

### 2) OFFSET 큰 구간은 Keyset으로 전환

```sql
SELECT id, status, created_at, total_amount
FROM orders
WHERE tenant_id = ?
  AND status = ?
  AND (created_at < ? OR (created_at = ? AND id < ?))
ORDER BY created_at DESC, id DESC
LIMIT 50;
```

이전 페이지의 마지막 `(created_at, id)`를 커서로 사용한다.

### 3) COUNT(*) 분리 전략

총 건수는 매번 실시간 계산하지 않고 아래 정책으로 분리한다.

- 최초 진입: 정확한 count
- 이후 필터 변경 없음: 캐시된 count 활용
- 대규모 검색: "약식 total" 또는 "다음 페이지 존재 여부"만 노출

## 성능/운영 이슈

### 1) EXPLAIN에서 꼭 보는 항목

- `type`: `range`/`ref`인지
- `rows`: 예상 스캔 행 수
- `Extra`: `Using filesort`, `Using temporary` 여부

`Using filesort`가 뜨면 ORDER BY가 인덱스로 커버되지 않는 경우가 많다.

### 2) 인덱스 과다 생성 방지

화면별로 인덱스를 무분별하게 늘리면 INSERT/UPDATE가 느려진다. 다음 기준으로 정리한다.

- 상위 트래픽 쿼리 20% 우선
- 중복 Prefix 인덱스 제거
- 30일간 미사용 인덱스 후보화

### 3) API 응답 설계

프론트와 API 계약도 성능에 영향이 크다.

- `page`/`size` + `sortKey`를 명시
- 다중 정렬 키를 제한
- 검색 조건의 최대 범위를 제한 (예: 기간 1년)

## 회고 및 확장 포인트

목록 성능은 DB 한 군데 최적화로 끝나지 않는다. **쿼리 + 인덱스 + API 계약 + UX 정책**이 함께 맞아야 안정화된다.

다음 단계로는 아래를 추천한다.

1. Hot Query Top-N 추적 자동화
2. 인덱스 리그레션 테스트 (EXPLAIN snapshot)
3. 조회 패턴별 표준 인덱스 가이드 문서화

## 오늘의 적용 체크리스트

- [ ] 상위 트래픽 목록 API 3개 EXPLAIN 수집
- [ ] `Using filesort` 발생 쿼리 식별
- [ ] Covering Index 후보 설계 및 쓰기 비용 검토
- [ ] 100페이지 이상 이동 시 Keyset 전환 정책 정의
- [ ] COUNT 전략(실시간/캐시/근사치) 화면별 분류
