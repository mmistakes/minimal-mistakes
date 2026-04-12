---
layout: single
title: "하네스 엔지니어링 04. prose에서 schema로: handoff를 메모가 아니라 계약으로 바꾸는 법"
lang: ko
translation_key: from-prose-to-schema-turning-handoff-into-a-contract
date: 2026-04-13 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, handoff]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

3편에서 본 핵심은 프로젝트 지침 파일이 control plane이 아니라 entrypoint에 가까워야 한다는 점이었다. 하지만 지침 파일을 잘 정리해도, 실제 작업 인계가 여전히 자연어 메모 수준에 머물면 시스템은 쉽게 흔들린다. 그래서 이번 글에서는 handoff를 왜 구조화된 계약으로 봐야 하는지 이야기해보려 한다.

## 자연어 handoff는 왜 편해 보이는가

자연어 handoff는 처음엔 꽤 합리적으로 보인다. 사람이 빠르게 적을 수 있고, 읽는 사람도 문맥을 짐작하며 따라갈 수 있기 때문이다. 특히 작은 팀이나 짧은 실험에서는 "대충 핵심만 남기면 되지 않을까"라는 생각이 자연스럽다.

예를 들어 이런 handoff는 익숙하다.

> "로그인 API 수정함. 예외 처리도 봤고 테스트는 대충 확인했음. 문서도 나중에 업데이트 필요."

사람이 읽으면 얼핏 이해한 것처럼 느껴진다. 하지만 시스템이 여기서 무엇을 확정적으로 알아야 하는지는 전혀 고정되어 있지 않다.

## 하지만 왜 불안정한가

자연어 handoff가 약한 첫 번째 이유는 누락 검출이 어렵기 때문이다. `어떤 파일이 바뀌었는지`, `무엇이 아직 위험한지`, `다음 agent가 무엇을 검증해야 하는지`가 빠져 있어도 자동으로 잡아내기 어렵다.

두 번째는 파싱 난이도다. 사람은 문맥으로 빈칸을 메우지만, 후속 agent나 자동화는 그렇지 못하다. "대충 확인"이 unit test를 뜻하는지, 수동 클릭 테스트를 뜻하는지, 아예 한두 번 실행해 봤다는 뜻인지 알 수 없다. 이런 애매함은 멀티에이전트 흐름에서 특히 치명적이다.

세 번째는 후속 작업의 불안정이다. handoff 형식이 매번 달라지면 다음 단계는 항상 해석부터 다시 시작해야 한다. 네 번째는 분석의 어려움이다. 나중에 로깅을 모아 회귀 패턴을 보려 해도 형식이 제각각이면 비교가 어렵다.

Codex든 Claude Code든, 여러 단계의 작업 위임과 문맥 전달이 중요해지는 환경이라면 이 문제는 비슷하게 나타날 수 있다. 특정 도구의 기능 문제가 아니라, handoff를 자연어에만 맡겼을 때 생기는 구조적 한계에 가깝다.

## handoff는 왜 계약이어야 하는가

하네스 엔지니어링 관점에서 handoff는 메모보다 계약에 가깝다. 메모는 "대충 이런 일이 있었다"를 남기는 데 적합하지만, 계약은 "다음 단계가 무엇을 신뢰해도 되는가"를 분명히 한다. 계약이 되려면 최소한 필수 필드가 정해져 있어야 하고, 그 필드의 존재 여부를 검사할 수 있어야 한다.

이 전환이 중요한 이유는 단순히 문서를 깔끔하게 만들기 위해서가 아니다. schema가 생기면 자동 검증과 누락 감지가 가능해지고, 후속 작업도 더 예측 가능해진다. prose를 schema로 바꾸는 순간, handoff는 읽는 사람의 감각에 기대는 메모에서 시스템이 다룰 수 있는 계약으로 바뀐다.

## 어떤 필드가 구조화될 수 있는가

예를 들면 handoff는 아래처럼 YAML 같은 구조화된 형식으로 고정할 수 있다. 중요한 것은 특정 문법을 고집하는 일이 아니라, 필수 필드와 검증 가능한 형식을 정하는 일이다.

```yaml
owner_team: backend-platform
task_id: auth-login-api-042
changed_paths:
  - src/api/login.ts
  - tests/login.test.ts
risk: "Rate limit edge case not fully verified"
eval_plan:
  - "Run auth integration tests"
  - "Check invalid token retry path"
expected_outputs:
  - "POST /login returns normalized error payloads"
  - "Existing auth tests stay green"
blocking_questions:
  - "Should login failures be logged at warn or info?"
```

여기서 중요한 것은 YAML이라는 문법 자체가 아니다. `owner_team`, `task_id`, `changed_paths`, `risk`, `eval_plan`, `expected_outputs`, `blocking_questions`처럼 무엇을 반드시 넘겨야 하는지를 고정하는 일이다. 이 구조가 있으면 누락 여부를 검사할 수 있고, 후속 agent는 어디서부터 읽어야 할지 덜 헤맨다. 바로 이 지점에서 handoff는 메모보다 계약에 가까워진다.

## 내가 직접 겪으며 보게 된 한계

나 역시 한동안은 handoff에 기대 영향, 검증 대상, 회귀 메모 정도를 자연어로 남기면 충분하다고 생각했다. 빠르게 적을 수 있고, 사람끼리는 대체로 알아들을 수 있었기 때문이다. 하지만 형식이 고정되지 않으면 누락 검사가 거의 불가능했고, 다음 작업자도 매번 다시 해석해야 했다.

이 경험이 보여준 것은 자연어가 나쁘다는 사실이 아니라, 자연어만으로는 안정적인 인계 구조를 만들기 어렵다는 점이었다. handoff를 잘 쓴다고 느끼는 것과, handoff가 시스템적으로 검증 가능하다는 것은 전혀 다른 문제였다.

## 마무리

자연어 handoff는 사람에게는 유연하고 편해 보이지만, 시스템 관점에서는 누락을 잡기 어렵고 후속 작업도 불안정하게 만든다. 멀티에이전트 환경에서 handoff는 단순 메모가 아니라 다음 단계와 맺는 계약에 가깝다. 그래서 하네스 엔지니어링에서는 prose를 schema로 바꾸는 전환이 중요하다.

다음 글에서는 여기서 한 단계 더 나아가 보려 한다. build와 test가 통과했다고 해서 agent가 정말 제대로 일했는지 알 수 있는지는 또 다른 문제이기 때문이다.

## 이 글의 한 줄 요약

handoff를 자연어 메모에만 맡기지 말고 schema 기반 계약으로 바꿔야 누락을 검증하고 후속 작업을 안정화할 수 있다.

## 다음 글 예고

다음 편에서는 "build와 test만으로는 agent를 검증할 수 없다"는 문제를 다뤄보려 한다. 제품 테스트가 통과하는 것과, agent가 우리 팀이 원하는 방식으로 일하고 있는지는 같은 이야기가 아니다. 어떤 실패는 build에서 드러나지만, 어떤 실패는 작업 방식과 품질 기준의 어긋남으로 나타난다. 다음 글에서는 product correctness와 agent correctness를 왜 구분해서 봐야 하는지 정리해볼 생각이다.
