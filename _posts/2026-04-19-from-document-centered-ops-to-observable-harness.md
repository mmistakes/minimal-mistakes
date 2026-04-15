---
layout: single
title: "하네스 엔지니어링 10. 문서 중심 운영에서 관측 가능한 하네스로: 실전 전환 로드맵"
lang: ko
translation_key: from-document-centered-ops-to-observable-harness
date: 2026-04-19 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, harness-engineering, roadmap, eval, trace, guardrail]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

문서를 더 길게 쓰는 것만으로는 해결되지 않는다. 시리즈 전체를 관통한 문제의식도 결국 여기로 모인다. AGENTS.md나 CLAUDE.md 같은 지침 파일을 더 촘촘히 쓰는 일은 출발점일 수는 있지만, 그 자체가 하네스를 만들어 주지는 않는다. 이번 최종편에서는 지금까지의 논의를 묶어, 문서 중심 운영에서 관측 가능하고 검증 가능한 하네스로 실제로 어떻게 전환할 수 있는지 정리해보려 한다.

## 검증 기준과 해석 경계

- 시점: 2026-04-15 기준 OpenAI Codex 문서, OpenAI 공식 API 문서, Anthropic Claude Code 문서를 확인했다.
- 출처 등급: 공식 문서 우선, 개념을 처음 소개한 vendor-authored 글만 보조로 사용했다.
- 사실 범위: `AGENTS.md`, memory/settings, hooks, subagents, approvals, sandboxing, eval, trace처럼 문서로 확인 가능한 기능만 사실로 적었다.
- 해석 범위: `harness engineering`, `control plane`, `contract`, `enforcement`, `observable harness` 같은 표현은 이 시리즈에서 쓰는 운영 개념이며, 별도 근거 줄이 없는 경우 필자의 해석이다.


## 지금까지의 문제를 한 문장으로 다시 정리하면

문제가 된 것은 문서가 적어서가 아니라, 하네스가 문서에만 머물러 있었다는 점이다. 좋은 원칙이 자연어로만 남아 있으면 놓치기 쉽고, handoff는 흩어지고, eval은 결과물만 보게 되고, trace와 guardrail이 비면 시스템은 겉보기보다 훨씬 불안정해진다.
해석: 이 절은 시리즈 전체를 한 문장으로 요약하는 필자의 관점이다. 다만 공식 문서들을 보면 instruction file, hooks, eval, trace, approvals가 실제로 분리된 운영 계층으로 존재한다. 근거: [OpenAI AGENTS.md](https://developers.openai.com/codex/guides/agents-md), [Hooks](https://developers.openai.com/codex/hooks), [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading), [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [Claude hooks](https://code.claude.com/docs/en/hooks), [Claude permissions](https://code.claude.com/docs/en/permissions)

## 전환의 핵심 원칙

전환의 방향은 복잡하지 않다. 문서에 몰려 있던 역할을 여러 층으로 다시 나누면 된다.
문서로 확인 가능한 사실: 공식 문서에는 이미 instruction, automation/hooks, evaluation, trace, approval/permission이 분리된 계층으로 등장한다. 근거: [OpenAI AGENTS.md](https://developers.openai.com/codex/guides/agents-md), [Hooks](https://developers.openai.com/codex/hooks), [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading), [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [Claude hooks](https://code.claude.com/docs/en/hooks), [Claude permissions](https://code.claude.com/docs/en/permissions)
해석: 이 글의 전환 원칙은 그 계층들을 운영 구조로 재배치하는 필자의 권고다.

1. 프로젝트 지침 파일은 entrypoint로 경량화한다.
2. 세부 운영 문서는 별도 경로로 분리한다.
3. handoff는 schema로 구조화한다.
4. 제품 테스트와 별도로 agent workflow eval을 둔다.
5. 문서 규칙은 CI, hook, validation 같은 enforcement로 올린다.
6. 결과뿐 아니라 trace를 남긴다.
7. approval boundary와 guardrail을 함께 설계한다.

예를 들어 문제를 문서만 계속 추가하는 방식으로 풀려 하면, "문서를 갱신해라", "handoff를 남겨라", "owner를 지켜라" 같은 문장이 늘어난다. 반대로 역할을 분리하고 자동 검증을 붙이는 방식으로 가면 지침 파일은 짧아지고, docs freshness check, handoff schema validation, changed-path ownership check, trace review 같은 바깥 층이 생긴다. 차이는 문서의 분량이 아니라, 하네스가 어디에 존재하느냐다.

공식 문서와 사례를 종합해보면, 도구는 달라도 전환 순서는 크게 비슷하다. Codex든 Claude Code든 결국 entrypoint를 가볍게 하고, schema, enforcement, eval, trace, guardrail을 바깥 레이어로 세우는 방향으로 가게 된다.

## 현실적인 적용 순서

현실에서는 한 번에 다 바꾸기보다 점진적으로 재구성하는 편이 낫다.
해석: 어떤 순서로 옮길지는 필자의 단계적 도입안이다. 공식 문서가 특정 순서를 강제하는 것은 아니다.

1. 프로젝트 지침 파일을 먼저 경량화한다. 저장소의 핵심 기대치와 참조 경로만 남긴다.
2. 운영 절차와 기준은 별도 문서로 분리한다. 사람을 위한 설명과 시스템 규칙을 섞지 않는다.
3. handoff schema를 도입한다. 최소 필드부터 고정해 누락을 줄인다.
4. agent workflow eval을 추가한다. wrong-owner routing, handoff completeness, stale docs 같은 실패를 별도로 본다.
5. 반복적으로 놓치는 규칙을 CI나 hook으로 올린다. prose를 enforcement로 바꾸는 단계다.
6. approval boundary와 guardrail을 명시한다. 위험한 실행 경계를 뒤늦게 붙이지 말고 구조 안에 넣는다.

## 작은 프로젝트에서는 어떻게 시작할 수 있는가

작은 프로젝트라면 더 단순하게 시작해도 된다. 예를 들어 4주 전환안은 아래처럼 잡을 수 있다.
해석: 이 절의 4주 계획은 필자의 제안이다. 다만 출발점으로 instruction, hooks, eval, trace, approvals 같은 분리된 계층을 확인할 수 있다는 점은 공식 문서로 뒷받침된다. 근거: [OpenAI AGENTS.md](https://developers.openai.com/codex/guides/agents-md), [Hooks](https://developers.openai.com/codex/hooks), [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading), [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)

1. 1주차: 지침 파일을 반으로 줄이고, 세부 문서를 별도 폴더로 뺀다.
2. 2주차: handoff schema 하나와 docs freshness check 하나를 도입한다.
3. 3주차: wrong-owner routing 또는 stale-doc detection 같은 agent workflow eval 하나를 붙인다.
4. 4주차: trace 필드와 approval boundary를 최소 단위로 정의한다.

핵심은 완벽한 체계를 한 번에 만들려 하지 않는 것이다. 작은 프로젝트일수록 더 큰 control plane을 문서 하나에 몰아넣기 쉽다. 오히려 작은 단위의 schema, check, trace부터 붙이는 편이 현실적이다.

## 내가 처음 문제를 보던 방식과 지금의 차이

처음에는 나 역시 AGENTS.md를 더 잘 쓰는 방향으로 문제를 해결하려 한 적이 있다. 좋은 규칙을 더 적고, 역할을 더 자세히 설명하고, handoff와 문서 규칙을 더 꼼꼼히 넣으면 안정성이 올라갈 것처럼 보였기 때문이다. 하지만 점점 분명해진 것은 문서를 더 추가하는 일이 아니라 운영 구조를 재설계하는 일이 핵심이라는 점이었다.

이 차이는 감상보다 설계의 문제에 가깝다. 문서를 잘 쓰는 일은 여전히 필요하지만, 하네스는 schema, enforcement, eval, trace, guardrail이 들어오면서 비로소 시스템이 된다.

## 마무리

이 시리즈가 말하고 싶었던 것은 결국 하나다. agent 시스템의 품질은 프롬프트 한 줄이나 문서 한 장으로 안정되지 않는다. 지침 파일은 가벼운 entrypoint가 되어야 하고, 세부 운영은 schema, eval, enforcement, trace, guardrail로 분산된 구조 안에서 검증 가능해져야 한다. 문서 중심 운영에서 관측 가능한 하네스로의 전환은 거대한 일괄 개편이 아니라, 반복적으로 놓치는 지점을 하나씩 바깥 레이어로 끌어내는 점진적 재구성에 더 가깝다.

독자에게 마지막으로 남기고 싶은 문장은 이것이다. 문서를 더 쓰는 것보다, 문서 밖에서 무엇을 자동으로 보이게 하고 검사하게 만들 것인가부터 설계하자.

## 이 시리즈의 한 줄 요약

하네스 엔지니어링의 핵심은 좋은 문서를 더 많이 쓰는 것이 아니라, 문서에 머물러 있던 운영 원칙을 schema, eval, enforcement, trace, guardrail로 옮겨 관측 가능하고 검증 가능한 시스템으로 재구성하는 일이다.

## 마무리하며

가장 먼저 할 일은 지침 파일을 더 길게 쓰는 것이 아니라, 지금 그 파일이 너무 많은 역할을 떠안고 있는지 보는 것이다. 그다음에는 반복적으로 놓치는 규칙 하나를 골라 schema나 check로 바꿔보는 편이 좋다. handoff 하나를 구조화하고, 문서 갱신 하나를 CI로 올리고, trace 필드 몇 개를 남기는 것만으로도 시스템은 눈에 띄게 달라질 수 있다. 작은 프로젝트라면 더더욱 한 번에 다 하려 하지 말고, 가장 자주 흔들리는 지점부터 바깥 레이어로 옮기면 된다. 이 시리즈가 끝나는 지점은 결론이라기보다 출발선에 가깝다. 이제 필요한 것은 더 많은 문서가 아니라, 더 잘 보이고 더 잘 검증되는 운영 구조다.

## 출처 및 참고

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Hooks](https://developers.openai.com/codex/hooks)
- OpenAI, [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- OpenAI, [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading)
- OpenAI, [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)
- Anthropic, [Hooks reference](https://code.claude.com/docs/en/hooks)
- Anthropic, [Permissions](https://code.claude.com/docs/en/permissions)
