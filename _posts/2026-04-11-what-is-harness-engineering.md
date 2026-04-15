---
layout: single
description: "하네스 엔지니어링을 AI 주변의 도구, 권한, 검증 구조 설계라는 관점에서 설명한 글."
title: "하네스 엔지니어링 02. 하네스 엔지니어링이란 무엇인가"
lang: ko
translation_key: what-is-harness-engineering
date: 2026-04-11 00:10:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

1편에서 본 핵심은 한 번 그럴듯한 결과를 얻는 것보다, 다시 시켜도 비슷한 품질과 구조가 나오는 반복 가능성이 더 중요하다는 점이었다. 좋은 운영 문서를 쓴다고 해서, 그 반복 가능성이 곧바로 생기지는 않는다. 원칙이 잘 적힌 문서는 필요하지만, 그것만으로 충분하지는 않다. 그렇다면 하네스 엔지니어링은 정확히 무엇일까.

여기서 `harness`라는 말은 AI 자체를 가리키기보다, AI가 정해진 방식으로 일하도록 붙잡아 주는 보조 구조를 뜻한다고 보면 이해가 쉽다. 소프트웨어에서도 `test harness`처럼 실행, 입력, 검증을 한 묶음으로 다루는 표현이 오래 쓰여 왔다. 그래서 하네스 엔지니어링은 모델을 더 똑똑하게 만드는 일보다, 모델이 일할 문맥, 도구, 권한, 검증 절차를 함께 엮는 일에 가깝다.

## 검증 기준과 해석 범위

- 시점: 2026-04-15 기준 OpenAI Codex와 Claude Code 공식 문서를 확인했다.
- 출처 등급: 공식 문서만 사용했다.
- 사실: Codex의 `AGENTS.md`, hooks, skills, subagents, sandboxing, approvals와 Claude Code의 memory, settings, hooks, subagents는 각 공식 문서에 실제로 존재한다.
- 해석: `harness engineering`은 이 블로그에서 여러 메커니즘을 묶어 설명하기 위해 쓰는 정리용 표현이다. 벤더가 동일한 단일 공식 용어로 정의한 것은 아니다.

## 프롬프트를 다듬는 일과 환경을 설계하는 일

프롬프트 엔지니어링이 이번 작업의 지시문을 더 정확하게 쓰는 일이라면, 하네스 엔지니어링은 그 작업이 수행되는 레일을 설계하는 일에 가깝다. 전자는 입력 문장을 다듬는 접근이고, 후자는 규칙, 도구, 검증, 기록까지 포함한 실행 환경 전체를 다룬다.

둘은 대체 관계가 아니라 레이어가 다르다. 좋은 프롬프트는 여전히 중요하지만, 어떤 문맥이 먼저 로드되는지, 어떤 형식으로 결과를 내야 하는지, 무엇을 통과해야 완료로 보는지가 정해져 있지 않으면 결과는 쉽게 흔들린다.

## 좋은 운영 문서와 강한 하네스는 왜 다른가

의견: 좋은 운영 문서는 방향을 설명하고, 강한 하네스는 그 방향을 실패를 줄이는 구조로 바꾼다. 이 글은 그 차이를 자연어 규칙, schema, enforcement의 차이로 설명한다.

예를 들어 `"Handoff를 남겨라."`, `"문서를 갱신해라."` 같은 규칙은 분명 맞는 말이다. 다만 이것만으로는 언제, 어디에, 어떤 형식으로 남겨야 하는지가 비어 있다. 사람이 읽기에는 그럴듯하지만, 시스템 관점에서는 빠뜨리기 쉽고 품질 편차도 크다. prose-only 규칙이 약한 이유가 여기에 있다.

반대로 handoff schema가 있고, `summary`, `changed_files`, `known_risks`, `next_action` 같은 필수 필드가 검증되며, CI가 누락을 감지한다면 이야기가 달라진다. 이제 이것은 권장 문구가 아니라 구조화된 계약이 된다. 좋은 문서를 넘어서, 예측 가능한 결과를 만드는 하네스에 가까워진다.
의견: 이 단락은 특정 벤더 문구를 그대로 옮긴 것이 아니라, 문서 규칙을 검증 가능한 계약으로 올리는 사고방식을 설명한 내 해석이다.

## 내가 직접 설계해보며 보인 다음 단계

나 역시 Codex 기반 프로젝트에서 AGENTS.md를 꽤 자세히 설계한 적이 있다. 역할 분리, 작업 범위, 검증 방식, 문서 갱신 규칙까지 넣으면 agent 안정성이 높아질 것이라고 생각했다. 실제로 초반 정렬에는 도움이 됐다. 다만 피드백을 받고 보니, 그 문서는 운영 원칙을 잘 정리한 문서였지 실패를 자동으로 줄이고 검증하는 하네스 자체는 아니었다.

이 경험이 중요했던 이유는 단순한 반성이 아니라 관점의 이동 때문이다. 문서를 더 길게 쓰는 쪽이 아니라, 어떤 규칙을 schema와 check로 바꾸고 무엇을 CI에서 자동 검증할지를 따져보게 됐다. 문서를 잘 쓰는 일과 하네스를 잘 설계하는 일은 분명히 다르다.

## Codex와 Claude Code에서 공통으로 보이는 것

의견: 이 지점에서 Codex와 Claude Code를 함께 보면 개념이 더 또렷해진다. 이 비교의 목적은 우열 평가가 아니라 공통 설계 원리를 드러내는 데 있다.

공식 문서 기준으로 Codex는 `AGENTS.md`를 작업 전에 읽는 지침 파일로 설명하고, hooks, skills, subagents, sandboxing, approvals를 각각 별도 설정 계층으로 문서화한다. [OpenAI Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md), [Hooks](https://developers.openai.com/codex/hooks), [Skills](https://developers.openai.com/codex/skills), [Subagents](https://developers.openai.com/codex/subagents), [Sandboxing](https://developers.openai.com/codex/concepts/sandboxing), [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)

공식 문서 기준으로 Claude Code도 memory, settings, hooks, subagents를 각각 독립된 메커니즘으로 설명한다. 특히 subagent는 별도 context window와 permissions를 가진 specialized assistant로 문서화되어 있다. [Anthropic memory](https://code.claude.com/docs/en/memory), [Claude Code settings](https://code.claude.com/docs/en/settings), [Claude Code hooks](https://code.claude.com/docs/en/hooks), [Claude Code subagents](https://code.claude.com/docs/en/sub-agents)

내 해석: 그래서 두 도구 모두 하네스를 단일 프롬프트 파일이 아니라, 문맥, 설정, 자동화, 검증을 나눠 담는 여러 구성 요소의 조합으로 다룬다고 보는 편이 타당하다.

의견: 중요한 것은 파일 이름보다, 무엇을 프로젝트의 상수로 두고 무엇을 별도의 검증 계층으로 분리하느냐다.

## 하네스는 무엇으로 이루어지는가

의견: 하네스는 실무적으로 몇 가지 층으로 나눠 생각하면 이해하기 쉽다.

- 규칙: 기준과 금지 사항.
- 문맥: 아키텍처와 도메인 전제.
- 구조화된 입력/출력: 정해진 필드와 형식의 계약.
- 검증: 테스트, 린트, 스키마 검사.
- 평가: 여러 작업에서의 일관성 측정.
- trace: 입력, 판단, 실행의 흔적.
- guardrail: 권한 제한과 차단 규칙.

이 목록의 핵심은 "좋은 상식"을 모으는 데 있지 않다. 실패를 줄이고, 실패를 관측하고, 실패를 자동으로 잡을 수 있게 만드는 데 있다.

## 결국 핵심은 실패를 다루는 방식이다

의견: 강한 하네스는 agent가 절대 실패하지 않게 만드는 장치가 아니다. 대신 실패를 더 적게 만들고, 생긴 실패를 빨리 발견하고, 원인을 추적하고, 다음 실행에서 같은 문제가 덜 나오게 만든다. 그래서 하네스 엔지니어링은 프롬프트를 더 정교하게 쓰는 기술이 아니라, 관측 가능하고 검증 가능한 시스템을 만드는 접근이라고 보는 편이 정확하다.

결국 좋은 운영 문서는 필요하다. 하지만 그것만으로는 충분하지 않다. 자연어 규칙을 어디까지 문서에 두고, 어디서부터 구조화된 계약과 자동 검증으로 넘길지 설계할 때 비로소 강한 하네스가 만들어진다.

## 마무리

의견: 하네스 엔지니어링은 문장을 잘 쓰는 기술보다, AI가 일하는 환경 전체를 설계하는 접근에 가깝다. 규칙이 많다고 안정성이 생기는 것은 아니며, 자연어 원칙이 구조화된 계약과 검증으로 이어질 때 비로소 예측 가능한 결과가 나온다. 그리고 이 관점은 여러 agentic coding 도구에 공통으로 적용되는 운영 원리라고 본다.

다음 글에서는 이 문제를 조금 더 실전적으로 가져가 보려 한다. AGENTS.md와 CLAUDE.md 같은 프로젝트 지침 파일이 무엇을 담아야 하고, 무엇은 그 파일 바깥의 하네스 계층으로 분리해야 하는지를 살펴볼 예정이다.

## 이 글의 한 줄 요약

하네스 엔지니어링은 좋은 규칙을 많이 적는 일이 아니라, 실패를 줄이고 자동 검증할 수 있는 실행 환경을 설계하는 일이다.

## 다음 글 예고

다음 편에서는 AGENTS.md와 CLAUDE.md 같은 프로젝트 지침 파일을 어디까지 써야 하는지 다룰 생각이다. 모든 원칙을 한 문서에 몰아넣는 방식이 왜 오히려 약해질 수 있는지도 함께 보게 될 것이다. 어떤 내용은 사람을 위한 설명으로 남겨야 하고, 어떤 내용은 schema, hook, CI 같은 하네스 계층으로 내려보내야 한다. 그 경계를 이해하면 문서는 더 짧아지고, 시스템은 더 강해진다.

## 출처 및 참고

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Hooks](https://developers.openai.com/codex/hooks)
- OpenAI, [Agent Skills](https://developers.openai.com/codex/skills)
- OpenAI, [Subagents](https://developers.openai.com/codex/subagents)
- OpenAI, [Sandboxing](https://developers.openai.com/codex/concepts/sandboxing)
- OpenAI, [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)
- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- Anthropic, [Claude Code settings](https://code.claude.com/docs/en/settings)
- Anthropic, [Hooks reference](https://code.claude.com/docs/en/hooks)
- Anthropic, [Create custom subagents](https://code.claude.com/docs/en/sub-agents)
