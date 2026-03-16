---
layout: post
title: "Python 비동기 처리 안정화: asyncio Backpressure와 Worker 설계"
date: 2026-03-17 09:15:00 +0900
categories: [python]
tags: [study, python, asyncio, backpressure, concurrency, reliability, automation]
---

## 문제 정의

비동기 처리는 "빠르다"보다 "안정적으로 느리지 않다"가 더 중요하다. 실무에서 자주 보는 문제는 다음과 같다.

- 요청이 몰리면 메모리가 급격히 증가
- 외부 API 지연이 전체 파이프라인을 막음
- consumer 속도보다 producer 속도가 빨라 큐가 무한히 쌓임

이건 단순 성능 이슈가 아니라 **backpressure 부재**다.

## 선택지 비교

### 1) 단순 `asyncio.gather()` 무제한 병렬

- 장점: 코드가 짧고 구현이 빠름
- 단점: 트래픽 급증 시 자원 고갈 위험 큼

### 2) 세마포어로 동시성 제한

- 장점: 가장 쉽게 적용 가능
- 단점: 큐 길이, 재시도, 우선순위 제어는 부족

### 3) bounded queue + worker pool + timeout/retry

- 장점: 처리량과 안정성 균형이 좋음
- 단점: 관측 지표 설계가 필요

운영 환경에서는 3번이 사실상 표준이다.

## 구현 핵심

### 1) bounded queue로 시스템 상한 강제

```python
import asyncio
from collections.abc import Awaitable, Callable

MAX_QUEUE = 2000
WORKERS = 32

queue: asyncio.Queue[dict] = asyncio.Queue(maxsize=MAX_QUEUE)

async def producer(item: dict) -> None:
    await queue.put(item)  # 꽉 차면 자동 대기 = backpressure
```

큐가 가득 찼을 때 producer를 대기시키면, 시스템이 스스로 속도를 조절한다.

### 2) worker에서 timeout + retry + circuit breaker 유사 정책

```python
async def process(item: dict) -> None:
    # 외부 API 호출 등
    ...

async def worker() -> None:
    while True:
        item = await queue.get()
        try:
            await asyncio.wait_for(process(item), timeout=2.0)
        except Exception:
            # retry 큐 전송 또는 실패 저장
            pass
        finally:
            queue.task_done()
```

핵심은 실패를 숨기지 않고, 재처리 경로를 명시하는 것이다.

### 3) graceful shutdown 보장

```python
async def shutdown(workers: list[asyncio.Task]) -> None:
    await queue.join()  # 큐 비울 때까지 대기
    for t in workers:
        t.cancel()
    await asyncio.gather(*workers, return_exceptions=True)
```

프로세스 종료 시 처리 중이던 작업의 상태를 명확히 해야 데이터 유실을 막는다.

## 성능/운영 이슈

### 1) 반드시 수집할 지표

- queue length (현재/최대)
- 처리 성공률/실패율
- 평균 처리 시간/95p 지연
- 재시도 횟수, DLQ 누적 건수

지표 없이 동시성 튜닝하면 감으로 운영하게 된다.

### 2) CPU 바운드와 I/O 바운드 분리

- I/O 바운드: asyncio 적합
- CPU 바운드: `ProcessPoolExecutor` 또는 별도 워커 분리

CPU 바운드를 이벤트 루프에 태우면 전체 응답성이 무너진다.

### 3) 외부 API 보호 정책

- 클라이언트 타임아웃 고정
- 서비스별 동시 호출 상한
- 연속 실패 시 단기 차단(half-open 재시도)

외부 의존성 장애를 내부 장애로 전염시키지 않는 게 핵심이다.

## 회고 및 확장 포인트

비동기 처리의 성패는 "얼마나 빨리"보다 **어떻게 느려지게 만들었는가**에 달려 있다. 

좋은 시스템은 부하가 올라가도 다음 특징을 유지한다.

1. 메모리/큐 길이가 상한 내에서 제어됨
2. 실패가 재시도/격리 경로로 흘러감
3. 운영자가 지표로 병목을 즉시 파악 가능

다음 단계로는 Kafka/NATS 기반으로 producer-consumer를 분리하고, idempotency key를 붙여 중복 처리 안정성을 높이는 것을 추천한다.

## 오늘의 적용 체크리스트

- [ ] 현재 비동기 작업에 queue maxsize 설정 여부 점검
- [ ] worker 처리 경로에 timeout/retry 정책 추가
- [ ] graceful shutdown 시나리오 테스트
- [ ] 큐 길이/실패율 대시보드 구성
- [ ] CPU 바운드 작업 분리 여부 검토
