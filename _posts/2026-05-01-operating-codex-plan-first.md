---
layout: single
description: "복잡한 Codex 작업을 바로 수정하지 않고 계획, 위험, 검증 방법부터 정리하게 하는 운영 방식을 설명한 글."
title: "Codex 실전 활용 06. Codex를 plan-first로 운영하기"
lang: ko
translation_key: operating-codex-plan-first
date: 2026-05-01 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, planning, verification, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

Codex에게 모든 작업을 바로 수정하게 할 필요는 없다. 범위가 넓거나 위험이 큰 작업은 먼저 계획을 만들고, 사람이 그 계획의 범위와 검증 방법을 확인한 뒤 수정으로 넘어가는 편이 낫다.

plan-first 운영의 핵심은 느리게 일하는 것이 아니다. 수정 전에 목표, 영향 범위, 위험, 검증을 드러내서 나중에 되돌리는 비용을 줄이는 것이다.

## 문서 정보

- 작성일: 2026-04-23
- 검증 기준일: 2026-04-23
- 문서 성격: tutorial
- 테스트 환경: 실행 테스트 없음. OpenAI Codex 공식 문서와 프로젝트 운영 패턴을 바탕으로 한 절차 정리.
- 테스트 버전: OpenAI Codex 문서 2026-04-23 확인본

## 문제 정의

작은 수정은 바로 처리해도 된다. 하지만 마이그레이션, 리팩터링, 보안 수정, 빌드 시스템 변경처럼 영향 범위가 넓은 작업은 Codex가 먼저 파일을 바꾸기 전에 계획을 세우게 해야 한다.

이 글은 어떤 작업에서 plan-first가 필요한지, 계획에 무엇을 포함해야 하는지, 승인 지점을 어디에 둘지 정리한다.

## 확인된 사실

공식 문서 기준: Codex best practices는 작업 컨텍스트와 명확한 구조가 큰 저장소나 높은 위험의 작업에서 결과 신뢰성을 높인다고 설명한다. 근거: [OpenAI, Codex best practices](https://developers.openai.com/codex/learn/best-practices)

공식 문서 기준: 같은 문서는 첫 요청에 목표, 관련 맥락, 제약, 완료 기준을 포함하는 방식을 권장한다. 근거: [OpenAI, Codex best practices](https://developers.openai.com/codex/learn/best-practices)

공식 문서 기준: Codex best practices는 변경 후 테스트 작성, 관련 검증 실행, 결과 확인, diff review까지 요청하라고 설명한다. 근거: [OpenAI, Codex best practices](https://developers.openai.com/codex/learn/best-practices)

## 직접 재현한 결과

직접 재현 없음: 이 글은 plan-first 요청과 즉시 수정 요청의 성공률을 비교한 실험이 아니다. 공식 문서의 권장 요청 구조와 검증 루프를 바탕으로 운영 절차를 제안한다.

## 해석 / 의견

### 튜토리얼 적용 기준

- 선행 조건: 작업 목표가 있고, 영향 범위가 넓거나 위험한 변경일 가능성이 있어야 한다.
- 재현 순서: Codex에게 먼저 수정하지 말고 계획만 세우게 한 뒤, 계획의 수정 후보, 제외 범위, 위험, 검증 방법을 사람이 확인한다. 승인 후에만 구현으로 넘어간다.
- 성공 조건: 파일이 바뀌기 전에 목표, 영향 범위, 위험한 결정, 검증 방법, 사람 승인 지점이 드러난다.
- 실패 가능 조건: 목표가 모호하거나 사람이 계획을 검토하지 않으면 plan-first도 단순한 긴 응답으로 끝날 수 있다.

내 판단으로는 아래 조건 중 하나라도 있으면 plan-first로 시작하는 편이 낫다.

- 수정 파일이 여러 모듈에 걸쳐 있다.
- public API, DB schema, 인증, 결제, 배포 설정을 건드릴 수 있다.
- 실패 시 되돌리는 비용이 크다.
- 테스트가 부족해 영향 범위를 먼저 파악해야 한다.
- 여러 접근 방법 중 선택이 필요하다.

요청 예시는 아래처럼 쓸 수 있다.

```md
먼저 수정하지 말고 계획만 세워 줘.

포함할 것:
- 목표 재정의
- 읽어야 할 파일
- 예상 수정 범위
- 위험한 변경 지점
- 검증 방법
- 사람 승인이 필요한 결정

계획을 확인한 뒤 내가 승인하면 수정으로 진행해.
```

계획은 길게 쓰기보다 상태를 드러내야 한다.

```md
## Plan

- 목표:
- 수정 후보:
- 제외 범위:
- 위험:
- 검증:
- 승인 필요:
```

의견: plan-first의 장점은 Codex를 멈추게 하는 데 있지 않다. 작업 초반에 사람이 판단해야 할 결정과 Codex가 실행해도 되는 범위를 분리하는 데 있다. 이 분리가 없으면 Codex는 좋은 의도로도 너무 넓은 변경을 만들 수 있다.

## 한계와 예외

모든 작업을 plan-first로 처리하면 흐름이 느려질 수 있다. 오타 수정, 작은 테스트 보강, 단일 파일 문서 수정처럼 영향이 작고 검증이 명확한 작업은 바로 수정해도 된다.

반대로 plan-first를 했다고 안전이 보장되는 것도 아니다. 계획이 부정확하면 이후 구현도 흔들린다. 계획 자체도 리뷰 대상이며, 특히 제외 범위와 검증 방법은 사람이 확인해야 한다.

## 참고자료

- OpenAI, [Codex best practices](https://developers.openai.com/codex/learn/best-practices)
