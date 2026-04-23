---
layout: single
description: "Codex subagent를 병렬성과 전문화가 실제 이득을 줄 때만 사용해야 하는 이유와 판단 기준을 정리한 글."
title: "Codex 실전 활용 09. Codex subagent는 언제 써야 하는가"
lang: ko
translation_key: when-to-use-codex-subagents
date: 2026-05-04 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, subagents, parallel-work, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

subagent는 멋있어 보이지만 기본값이 되어서는 안 된다. 병렬 탐색이나 역할 분리가 실제 이득을 줄 때만 써야 한다.

Codex subagent의 핵심은 "여러 에이전트가 알아서 더 잘한다"가 아니다. 서로 독립적인 질문이나 작업을 분리하고, 결과를 다시 하나의 판단으로 통합할 수 있을 때 효과가 있다.

## 문서 정보

- 작성일: 2026-04-23
- 검증 기준일: 2026-04-23
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. OpenAI Codex 공식 문서를 바탕으로 한 운영 판단 기준 정리.
- 테스트 버전: OpenAI Codex 문서 2026-04-23 확인본

## 문제 정의

복잡한 작업을 보면 여러 agent를 병렬로 돌리고 싶어진다. 하지만 병렬 작업은 비용과 통합 부담도 만든다. 작업이 서로 겹치거나, 같은 파일을 동시에 수정하거나, 결과를 통합할 기준이 없으면 오히려 위험이 커진다.

이 글은 Codex subagent를 언제 쓰고 언제 쓰지 말아야 하는지 정리한다.

## 확인된 사실

공식 문서 기준: Codex는 specialized agents를 병렬로 spawn하고 결과를 한 응답으로 모으는 subagent workflow를 지원한다. 근거: [OpenAI, Subagents](https://developers.openai.com/codex/subagents)

공식 문서 기준: Codex는 사용자가 명시적으로 요청할 때만 subagent를 spawn하며, subagent workflow는 단일 agent 실행보다 더 많은 토큰을 사용한다. 근거: [OpenAI, Subagents](https://developers.openai.com/codex/subagents)

공식 문서 기준: Codex에는 `default`, `worker`, `explorer` built-in agent가 있으며, custom agent 파일도 정의할 수 있다. 근거: [OpenAI, Subagents](https://developers.openai.com/codex/subagents)

공식 문서 기준: subagent는 parent session의 sandbox policy와 approval 설정을 상속한다. 근거: [OpenAI, Subagents](https://developers.openai.com/codex/subagents)

## 직접 재현한 결과

직접 재현 없음: 이 글은 subagent를 여러 개 실행해 속도나 품질을 측정한 실험이 아니다. 공식 문서에서 확인한 동작 범위를 바탕으로 사용 판단 기준을 정리한다.

## 해석 / 의견

내 판단으로는 subagent가 적합한 경우는 아래와 같다.

- 서로 독립적인 코드베이스 탐색 질문이 여러 개 있다.
- 보안, 성능, 테스트, 유지보수성처럼 리뷰 관점이 명확히 분리된다.
- 구현 작업의 파일 소유권을 분명히 나눌 수 있다.
- 메인 흐름이 기다리는 동안 병렬로 검증이나 조사 작업을 맡길 수 있다.
- 결과를 통합할 사람이 있고, 최종 책임이 명확하다.

반대로 아래 상황에서는 단일 흐름이 낫다.

- 다음 행동이 한 결과에 강하게 의존한다.
- 여러 agent가 같은 파일을 수정해야 한다.
- 문제 정의가 아직 모호하다.
- 병렬화보다 정확한 순차 판단이 더 중요하다.
- 결과 통합 기준이 없다.

위임 템플릿은 아래처럼 쓸 수 있다.

```md
다음 작업을 subagent로 나눠 조사해 줘.

- Agent A: 인증 흐름의 보안 위험만 조사. 파일 수정 금지.
- Agent B: 테스트 누락과 회귀 위험만 조사. 파일 수정 금지.
- Agent C: 성능 병목 가능성만 조사. 파일 수정 금지.

모든 결과를 기다린 뒤, 중복을 제거하고 우선순위별로 통합해 줘.
```

의견: subagent의 가치는 숫자가 아니라 경계에서 나온다. 역할, 파일 소유권, 결과 통합 기준이 없으면 병렬성은 품질 향상이 아니라 혼선이 된다.

## 한계와 예외

subagent 기능과 표시 방식은 Codex 클라이언트별로 차이가 있을 수 있다. 2026-04-23 기준 공식 문서는 subagent activity가 Codex app과 CLI에 표시되며, IDE extension 가시성은 예정이라고 설명한다.

또한 subagent를 쓴다고 검증 책임이 사라지지 않는다. 최종 변경은 여전히 사람이 리뷰하거나, 메인 agent가 통합 후 테스트와 diff review를 수행해야 한다.

## 참고자료

- OpenAI, [Subagents](https://developers.openai.com/codex/subagents)

