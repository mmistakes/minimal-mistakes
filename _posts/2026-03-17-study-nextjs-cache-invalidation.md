---
layout: post
title: "Next.js 캐시 무효화 전략: ISR, Tag Revalidation, 운영 사고 줄이기"
date: 2026-03-17 09:05:00 +0900
categories: [nextjs]
tags: [study, nextjs, cache, isr, revalidate, architecture, automation]
---

## 문제 정의

Next.js 앱이 커질수록 장애는 코드보다 **캐시 정책 충돌**에서 자주 발생한다.

- 관리자에서 상품 수정했는데 사용자 화면 반영 지연
- 서버 액션 이후 일부 페이지만 stale 상태 유지
- 무효화 범위가 과도해 캐시 히트율 급감

핵심은 "빠르게 보여주기"와 "정확하게 갱신하기" 사이 균형이다.

## 선택지 비교

### 1) 모든 페이지 `no-store`

- 장점: 데이터 일관성은 단순
- 단점: SSR 비용 급증, 응답 시간 악화

### 2) 시간 기반 ISR만 사용

- 장점: 구현 단순, 비용 절감
- 단점: 갱신 시점이 비즈니스 이벤트와 분리됨

### 3) Tag 기반 정밀 무효화 + ISR 병행

- 장점: 필요한 데이터만 즉시 무효화 가능
- 단점: 태그 설계/운영 규칙이 필요

실무에서는 3번이 가장 유연하고 비용 효율적이다.

## 구현 핵심

### 1) fetch 태그 설계 규칙 먼저 고정

```ts
const product = await fetch(`${API_URL}/products/${id}`, {
  next: { tags: [`product:${id}`, "product:list"] },
}).then((r) => r.json());
```

권장 네이밍:

- 엔티티 단건: `product:{id}`
- 엔티티 목록: `product:list`
- 도메인 범위: `catalog:*` (과도 사용 금지)

### 2) 변경 이벤트에서 revalidateTag 호출

```ts
"use server";

import { revalidateTag } from "next/cache";

export async function updateProductAction(input: UpdateProductInput) {
  await productService.update(input);

  revalidateTag(`product:${input.id}`);
  revalidateTag("product:list");
}
```

무효화는 "데이터 쓰기 경로"에서 일관되게 호출해야 누락이 줄어든다.

### 3) 페이지 단위 revalidatePath는 최소화

`revalidatePath("/")` 남용은 성능 저하를 부른다. 태그 기반이 우선, 경로 무효화는 예외 상황(레이아웃 전역 변경)에서만 사용한다.

## 성능/운영 이슈

### 1) 태그 폭발 방지

태그가 너무 세분화되면 관리가 어려워진다. 아래 규칙을 추천한다.

- 단건 + 목록 + 핵심 집계 3단 구조
- 팀 공통 태그 컨벤션 문서화
- 코드리뷰 시 "무효화 누락" 체크 항목 추가

### 2) 캐시 전략과 API SLA 연결

- 재고/가격: 이벤트 기반 즉시 무효화
- 리뷰/조회수: 짧은 ISR 허용
- 통계/대시보드: 배치 갱신 허용

데이터 성격별 신선도 SLA를 정해야 불필요한 무효화를 줄일 수 있다.

### 3) 장애 대응 포인트

운영 중 "갱신 안 됨" 이슈가 나오면 다음 순서로 점검한다.

1. 쓰기 API 성공 여부
2. 해당 액션에서 revalidate 호출 여부
3. fetch에 올바른 tags 지정 여부
4. CDN 캐시 헤더/프록시 계층 영향

## 회고 및 확장 포인트

캐시는 성능 기능이 아니라 **데이터 일관성 설계의 일부**다. 팀에서 태그 설계 원칙과 무효화 책임 경계를 합의하지 않으면, 기능이 늘수록 갱신 누락 사고가 반복된다.

다음 단계로는:

1. 태그 맵 자동 문서화
2. E2E 테스트에 "수정 후 반영 시간" 검증 추가
3. 도메인 이벤트 기반 무효화 추상화 도입

## 오늘의 적용 체크리스트

- [ ] 핵심 도메인별 태그 네이밍 규칙 확정
- [ ] 쓰기 액션 경로의 revalidate 호출 현황 점검
- [ ] `revalidatePath` 남용 구간 리팩터링
- [ ] 데이터별 신선도 SLA 정의
- [ ] 캐시 미반영 장애 대응 런북 작성
