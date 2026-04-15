---
layout: single
title: "하네스 엔지니어링 07. 원칙에서 enforcement로: 문장을 시스템 규칙으로 올리는 법"
lang: ko
translation_key: from-principles-to-enforcement
date: 2026-04-16 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, enforcement]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

좋은 규칙을 써놨는데도 왜 자꾸 놓치게 될까. 이 질문은 하네스 엔지니어링을 하다 보면 꽤 빨리 만나게 된다. 문서에 원칙이 잘 적혀 있어도 agent는 상황에 따라 그 규칙을 놓칠 수 있고, 사람 역시 바쁜 순간에는 빠뜨릴 수 있다. 그래서 이번 글에서는 좋은 원칙을 문장으로 써두는 것과, 실제로 지켜지게 만드는 것이 왜 다른지 이야기해보려 한다.

## 검증 기준과 해석 경계

- 시점: 2026-04-15 기준 OpenAI Codex 문서, OpenAI 공식 API 문서, Anthropic Claude Code 문서를 확인했다.
- 출처 등급: 공식 문서 우선, 개념을 처음 소개한 vendor-authored 글만 보조로 사용했다.
- 사실 범위: `AGENTS.md`, memory/settings, hooks, subagents, approvals, sandboxing, eval, trace처럼 문서로 확인 가능한 기능만 사실로 적었다.
- 해석 범위: `harness engineering`, `control plane`, `contract`, `enforcement`, `observable harness` 같은 표현은 이 시리즈에서 쓰는 운영 개념이며, 별도 근거 줄이 없는 경우 필자의 해석이다.


## prose-only 규칙의 한계

문서에 `"문서를 갱신해라"`, `"handoff를 남겨라"`, `"진행률을 관리해라"` 같은 규칙을 적어두는 일은 분명 출발점으로 중요하다. 문제는 이런 prose-only 규칙이 방향은 알려주지만, 위반을 자동으로 막아주지는 못한다는 점이다.
해석: prose-only 규칙이 왜 놓치기 쉬운지는 필자의 운영 경험에 기반한 설명이다. 공식 문서는 바로 그 빈틈을 메우는 계층으로 hooks, approvals, permissions, sandboxing을 제공한다([OpenAI hooks](https://developers.openai.com/codex/hooks), [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [Claude hooks](https://code.claude.com/docs/en/hooks), [Claude permissions](https://code.claude.com/docs/en/permissions), [Claude sandboxing](https://code.claude.com/docs/en/sandboxing))

예를 들어 `"문서를 갱신해라"`라는 문장은 좋은 원칙이다. 하지만 어떤 변경에 어떤 문서가 연결되는지, 언제 갱신이 필수인지, 누락되었을 때 누가 감지하는지는 여전히 열려 있다. 결국 규칙의 질보다 더 중요한 것은 그 규칙이 자동 검사 가능한 형태인지다.

## enforcement는 무엇인가

여기서 enforcement는 원칙을 시스템 규칙으로 올리는 층을 뜻한다. 문장으로 적어둔 기대치를 hook, lint, CI, validation 같은 장치로 바꿔서 실제 실행 흐름 안에서 검사하게 만드는 것이다. 좋은 문서는 기준을 설명하고, enforcement는 그 기준이 빠졌을 때 멈추거나 경고하게 만든다.
문서로 확인 가능한 사실: OpenAI와 Anthropic은 hooks, approvals, permissions, sandboxing을 통해 특정 동작을 막거나 승인 단계로 올리거나 실행 범위를 제한하는 메커니즘을 문서화한다([OpenAI hooks](https://developers.openai.com/codex/hooks), [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [Claude hooks](https://code.claude.com/docs/en/hooks), [Claude permissions](https://code.claude.com/docs/en/permissions), [Claude sandboxing](https://code.claude.com/docs/en/sandboxing))

하네스가 강해지는 순간도 바로 여기다. 규칙의 양이 많아지는 순간이 아니라, 규칙이 자동 검사 가능해지는 순간이다. 문서에만 있던 원칙이 실행 중 검증되는 규칙으로 올라가야 agent 시스템은 덜 흔들린다.

## 어떤 규칙들이 enforcement로 올라갈 수 있는가

대표적인 예로는 docs freshness check를 들 수 있다. `"문서를 갱신해라"`라는 자연어 규칙만 두면 누락은 쉽게 생긴다. 반대로 CI가 특정 코드 경로 변경과 연결된 문서 갱신 여부를 검사하면, 문서 미갱신은 이제 운영 원칙이 아니라 감지 가능한 실패가 된다.
문서로 확인 가능한 사실: OpenAI의 agent safety 가이드는 guardrail과 policy checks를, Anthropic 문서는 hooks/permissions/sandboxing을 통해 실행 전후 통제 지점을 설명한다([Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety), [OpenAI hooks](https://developers.openai.com/codex/hooks), [Claude hooks](https://code.claude.com/docs/en/hooks), [Claude permissions](https://code.claude.com/docs/en/permissions), [Claude sandboxing](https://code.claude.com/docs/en/sandboxing))

실무적으로는 changed-path ownership check도 같은 범주의 예다. 어떤 경로는 특정 팀이나 역할만 수정해야 한다는 원칙이 있다면, 이를 단순 설명으로 두지 않고 변경 파일과 owner 매핑을 검사하는 규칙으로 올릴 수 있다. 그러면 팀 경계 위반은 리뷰 감에만 의존하지 않고 시스템에서 먼저 드러난다.

handoff schema validation과 progress 필드 누락 감지도 같은 범주의 예다. handoff에 필요한 필드가 정해져 있다면, 그 존재 여부를 검사해 누락을 막을 수 있다. `"진행률을 관리해라"`라는 문장 대신, 특정 작업 문서에 `status`나 `progress` 필드가 없으면 실패하게 만들 수 있다.

이 항목들은 특정 벤더가 정식 분류로 제시한 표준 목록이라기보다, 자연어 원칙을 감지 가능한 규칙으로 바꾸는 대표 사례들이다.

중요한 것은 거창한 자동화를 다 붙이는 일이 아니다. 어떤 규칙이 반복적으로 놓치게 되는지 보고, 그중 일부를 먼저 시스템 규칙으로 승격시키는 사고방식이다.

## 내가 직접 느낀 문서와 시스템의 차이

나 역시 한때는 좋은 규칙을 충분히 적어두면 agent도 그 기준을 잘 따를 것이라고 생각했다. handoff를 남겨라, 문서를 갱신해라, 진행률을 관리해라 같은 문장은 모두 맞는 말이었고, 실제로 운영 원칙으로도 필요했다. 하지만 나중에 보니 그것은 어디까지나 좋은 운영 문서였지, 자동으로 막아주는 장치는 아니었다.
해석: 이 절은 문서와 enforcement layer를 구분하게 된 필자의 경험을 정리한 부분이다. 문서로 확인 가능한 사실은 enforcement가 실제 실행 경계에서 작동하는 hooks/approvals/permissions/sandboxing 같은 별도 계층이라는 점이다([OpenAI hooks](https://developers.openai.com/codex/hooks), [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [Claude hooks](https://code.claude.com/docs/en/hooks), [Claude permissions](https://code.claude.com/docs/en/permissions))

이 경험이 보여준 것은 문서가 쓸모없다는 뜻이 아니라, 문서와 시스템의 역할이 다르다는 점이었다. 문서는 방향을 알려주고, enforcement는 그 방향을 어겼을 때 드러나게 만든다.

## 마무리

좋은 원칙을 문서에 적어두는 것은 출발점일 뿐이다. agent 시스템은 prose-only 규칙만으로는 쉽게 놓치고 흔들릴 수 있다. 그래서 하네스 엔지니어링에서는 규칙의 양보다 자동 검사 가능성을 더 중요하게 봐야 하며, 필요한 규칙은 hook, lint, CI, validation 같은 enforcement 레이어로 올려야 한다.

다음 글에서는 여기서 한 단계 더 들어가 보려 한다. 어떤 결과가 나왔는지만 보는 것보다, 그 결과가 어떻게 만들어졌는지 추적하는 일이 왜 더 중요해지는지를 trace 관점에서 다뤄볼 생각이다.

## 이 글의 한 줄 요약

좋은 원칙은 문서로 시작하지만, 실제로 지켜지게 하려면 hook, lint, CI, validation 같은 enforcement 레이어로 올려야 한다.

## 다음 글 예고

다음 편에서는 "결과보다 중요한 것은 trace다"를 이야기해보려 한다. 같은 결과가 나와도 어떤 경로와 판단을 거쳐 도달했는지는 전혀 다를 수 있다. 하네스 엔지니어링에서는 정답 하나보다, 그 정답이 만들어진 과정의 추적 가능성이 점점 더 중요해진다. 그래서 다음 글에서는 왜 trace가 디버깅과 평가, 개선의 중심 자산이 되는지 정리해볼 생각이다. 원칙을 enforcement로 올렸다면, 이제 그 enforcement가 실제로 어떻게 작동했는지 볼 차례다.

## 출처 및 참고

- OpenAI, [Hooks](https://developers.openai.com/codex/hooks)
- OpenAI, [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)
- OpenAI, [Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety)
- Anthropic, [Hooks reference](https://code.claude.com/docs/en/hooks)
- Anthropic, [Permissions](https://code.claude.com/docs/en/permissions)
- Anthropic, [Sandboxing](https://code.claude.com/docs/en/sandboxing)
