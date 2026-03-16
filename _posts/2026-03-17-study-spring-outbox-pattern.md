---
layout: post
title: "Spring Boot 이벤트 처리 안정화: Transactional Outbox 패턴 실전 적용"
date: 2026-03-17 08:55:00 +0900
categories: [java]
tags: [study, java, spring, outbox, kafka, reliability, automation]
---

## 문제 정의

주문 생성 후 "결제 요청 이벤트"를 발행하는 로직은 흔하지만, 아래 장애가 반복된다.

- DB는 커밋됐는데 메시지 브로커 전송 실패
- 브로커 전송은 됐는데 DB 롤백
- 재시도 과정에서 중복 이벤트 발행

즉, 로컬 트랜잭션(DB)과 외부 시스템(Kafka/RabbitMQ)의 **원자성 불일치**가 핵심 문제다.

## 선택지 비교

### 1) 서비스 코드에서 DB 저장 후 즉시 publish

- 장점: 코드가 단순
- 단점: 부분 실패 시 정합성 깨짐

### 2) 2PC/XA 트랜잭션

- 장점: 이론적으로 강한 일관성
- 단점: 운영 복잡도 높고 성능 저하, 장애 분석 어려움

### 3) Transactional Outbox

- 장점: DB 트랜잭션 내에서 이벤트 기록 보장
- 단점: Outbox 소비자/재처리 파이프라인 필요

현대 마이크로서비스에서는 대부분 3번이 현실적인 해법이다.

## 구현 핵심

### 1) 도메인 저장 + Outbox insert를 같은 트랜잭션으로 처리

```java
@Transactional
public Long createOrder(CreateOrderCommand cmd) {
    Order order = orderRepository.save(Order.create(cmd));

    OutboxEvent event = OutboxEvent.of(
        "order",
        order.getId().toString(),
        "OrderCreated",
        objectMapper.writeValueAsString(new OrderCreatedPayload(order.getId(), order.getTotalAmount()))
    );
    outboxRepository.save(event);

    return order.getId();
}
```

핵심은 publish를 하지 않고, **발행할 사실**을 DB에 남기는 것.

### 2) 별도 퍼블리셔가 Outbox를 읽어 브로커로 전달

```java
@Scheduled(fixedDelay = 1000)
public void publishOutbox() {
    List<OutboxEvent> events = outboxRepository.findTop100ByStatusOrderByIdAsc(OutboxStatus.PENDING);

    for (OutboxEvent e : events) {
        try {
            kafkaTemplate.send("order-events", e.getAggregateId(), e.getPayload()).get();
            e.markPublished();
        } catch (Exception ex) {
            e.increaseRetry();
        }
    }
}
```

여기서 중요한 건 상태 전이(`PENDING -> PUBLISHED`)와 재시도 횟수 관리다.

### 3) 소비자 측 idempotency 보장

Outbox를 도입해도 중복 전달은 발생할 수 있다. 소비자는 `eventId` 기반 중복 방지를 반드시 가져야 한다.

## 성능/운영 이슈

### 1) Outbox 테이블 설계

권장 컬럼:

- `id` (PK, 증가 키)
- `event_id` (UUID, 유니크)
- `aggregate_type`, `aggregate_id`
- `event_type`, `payload`
- `status`, `retry_count`, `next_retry_at`
- `created_at`, `published_at`

인덱스는 `status, id` 조합이 핵심이다.

### 2) 재시도 정책

- 즉시 재시도 3회
- 이후 지수 백오프
- 임계 초과 시 DLQ(or FAILED 상태)로 격리

무한 재시도는 장애를 숨기고 운영자 피로도를 높인다.

### 3) 정리(아카이빙) 정책

Outbox를 계속 쌓아두면 성능 저하가 온다.

- `PUBLISHED` 7일 이후 아카이브
- 월 단위 파티셔닝 검토
- 운영 대시보드에서 pending 건수 알람

## 회고 및 확장 포인트

Outbox는 메시징 안정화 패턴이지만, 본질은 "실패를 전제한 설계"다. 단일 성공 경로가 아니라 실패/재시도/복구 경로를 먼저 설계하면 운영이 급격히 안정된다.

다음 단계로는 다음을 붙이면 좋다.

1. CDC(Debezium) 기반 Outbox relay
2. 이벤트 스키마 버전 관리
3. consumer side exactly-once 유사 보장(중복 무해화)

## 오늘의 적용 체크리스트

- [ ] 핵심 이벤트 발행 API의 DB/브로커 원자성 점검
- [ ] Outbox 테이블/인덱스 설계 문서화
- [ ] 퍼블리셔 재시도/백오프/DLQ 정책 확정
- [ ] 소비자 중복 처리(idempotency key) 구현
- [ ] pending outbox 알람 기준 수립
