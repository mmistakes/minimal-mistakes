---
layout: single
description: "Codex 첫 작업 요청에 목표, 범위, 제약, 완료 기준, 검증 방법을 어떻게 담아야 하는지 정리한 글."
title: "Codex 실전 활용 03. Codex 첫 작업 요청 작성법"
lang: ko
translation_key: how-to-write-first-codex-task-request
date: 2026-04-28 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, prompt, task-request, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

Codex 첫 요청은 길 필요가 없다. 하지만 목표, 관련 맥락, 제약, 완료 기준이 빠지면 Codex는 저장소를 읽으면서 중요한 경계를 다시 추론해야 한다.

좋은 첫 요청은 "무엇을 해 줘"가 아니라 "이 범위 안에서, 이 조건을 지키고, 이 검증을 통과하면 완료"라고 말한다. 이 글은 바로 복사해 쓸 수 있는 첫 작업 요청 틀을 제시한다.

## 문서 정보

- 작성일: 2026-04-23
- 검증 기준일: 2026-04-23
- 문서 성격: tutorial
- 테스트 환경: 실행 테스트 없음. OpenAI Codex 공식 문서와 저장소 작업 요청 패턴을 바탕으로 한 작성 절차.
- 테스트 버전: OpenAI Codex 문서 2026-04-23 확인본

## 문제 정의

첫 요청이 모호하면 Codex는 너무 넓게 탐색하거나, 수정하면 안 되는 파일을 건드리거나, 검증 없이 작업을 끝낼 수 있다. 특히 큰 저장소에서는 "알아서 해 줘"라는 요청이 작업 품질보다 추측량을 늘린다.

이 글은 Codex에게 처음 작업을 맡길 때 포함해야 할 최소 필드를 정리한다.

## 확인된 사실

공식 문서 기준: Codex best practices는 첫 요청에 `Goal`, `Context`, `Constraints`, `Done when`을 포함하는 방식을 권장한다. 근거: [OpenAI, Codex best practices](https://developers.openai.com/codex/learn/best-practices)

공식 문서 기준: Codex CLI는 선택한 디렉터리 안에서 저장소를 검사하고, 파일을 편집하고, 명령을 실행할 수 있다. 근거: [OpenAI, Codex CLI](https://developers.openai.com/codex/cli)

공식 문서 기준: Codex 보안 문서는 sandbox mode와 approval policy가 Codex가 기술적으로 할 수 있는 일과 승인 없이 할 수 있는 일을 나눠 제어한다고 설명한다. 근거: [OpenAI, Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)

## 직접 재현한 결과

직접 재현 없음: 이 글은 여러 프롬프트 버전의 성공률을 비교한 실험이 아니다. 첫 요청에 포함할 필드를 공식 문서의 권장 구조와 실무 리뷰 기준에 맞춰 정리한 튜토리얼이다.

## 해석 / 의견

### 튜토리얼 적용 기준

- 선행 조건: Codex가 접근할 저장소와 맡길 작업 1개가 정해져 있어야 한다.
- 재현 순서: 아래 템플릿을 채워 첫 요청으로 보내고, Codex의 결과 보고에서 변경 범위와 검증 내용을 확인한다.
- 성공 조건: 요청 안에 `Goal`, `Context`, `Scope`, `Constraints`, `Verification`, `Report`가 포함되고, 결과 보고가 리뷰 가능한 형태로 남는다.
- 실패 가능 조건: 작업 범위가 모호하거나 검증 명령을 모르면 바로 구현을 맡기지 말고, 먼저 읽기 전용 조사나 plan-first 요청으로 나눠야 한다.

내 판단으로는 첫 요청은 아래 틀로 시작하면 충분하다.

```md
## Goal

무엇을 바꾸거나 확인해야 하는지 한 문장으로 적는다.

## Context

관련 파일, 오류 메시지, 기존 문서, 비슷한 구현을 적는다.

## Scope

수정 가능한 파일과 수정하지 말아야 할 파일을 구분한다.

## Constraints

스타일, 호환성, 보안, 성능, 문서화 기준을 적는다.

## Verification

실행해야 할 테스트, 빌드, lint, 수동 확인 조건을 적는다.

## Report

완료 후 어떤 형식으로 보고할지 적는다.
```

예시는 아래와 같다.

```md
## Goal

로그인 실패 시 잘못된 오류 메시지가 표시되는 문제를 수정해 줘.

## Context

- 관련 파일: `src/auth/login.ts`, `src/auth/errors.ts`, `tests/auth/login.test.ts`
- 재현 조건: 비활성 계정으로 로그인하면 "unknown error"가 표시됨

## Scope

- 수정 가능: `src/auth/*`, `tests/auth/*`
- 수정 금지: DB schema, public API response shape

## Constraints

- 기존 에러 코드 이름은 유지
- 테스트가 없으면 회귀 테스트 추가

## Verification

- `npm test -- auth`
- 관련 diff 자체 리뷰

## Report

- 원인
- 변경 파일
- 실행한 검증
- 남은 위험
```

의견: 이 정도 구조만 있어도 Codex는 "무엇을 해야 하는가"보다 "어디까지 해도 되는가"를 훨씬 잘 판단할 수 있다. 특히 `Scope`와 `Verification`은 결과의 리뷰 가능성을 크게 바꾼다.

## 한계와 예외

탐색 자체가 목적인 작업에서는 수정 가능 범위를 처음부터 좁히기 어렵다. 이 경우에는 "먼저 읽기 전용으로 조사하고, 수정 계획을 제안한 뒤 승인 후 변경"처럼 단계형 요청을 쓰는 편이 낫다.

또한 검증 명령이 오래 걸리거나 외부 서비스에 의존한다면, 어떤 검증은 직접 실행하지 못할 수 있다. 그 경우에는 실행하지 못한 이유와 대체 확인 방법을 결과 보고에 남기도록 요청해야 한다.

## 참고자료

- OpenAI, [Codex best practices](https://developers.openai.com/codex/learn/best-practices)
- OpenAI, [Codex CLI](https://developers.openai.com/codex/cli)
- OpenAI, [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)
