---
layout: single
description: "build와 test만으로 agent 작업을 검증하기 어려운 이유와 추가 검증 계층을 설명한 글."
title: "하네스 엔지니어링 05. build와 test만으로는 agent를 검증할 수 없다"
lang: ko
translation_key: build-and-test-are-not-enough-to-validate-an-agent
date: 2026-04-14 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, eval]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

테스트가 모두 통과했는데도 운영은 흔들릴 수 있다. 얼핏 이상하게 들리지만, agent 시스템에서는 꽤 자주 만나는 장면이다. build, test, lint, audit가 모두 초록불이어도, 그 일이 올바른 방식으로 라우팅되었는지, handoff가 충분했는지, 문서가 최신 상태인지까지 보장되지는 않는다. 그래서 이번 글에서는 제품 검증과 agent 검증을 왜 구분해서 봐야 하는지 이야기해보려 한다.

## 검증 기준과 해석 경계

- 시점: 2026-04-15 기준 OpenAI Codex 문서, OpenAI 공식 API 문서, Anthropic Claude Code 문서를 확인했다.
- 출처 등급: 공식 문서 우선, 개념을 처음 소개한 vendor-authored 글만 보조로 사용했다.
- 사실 범위: `AGENTS.md`, memory/settings, hooks, subagents, approvals, sandboxing, eval, trace처럼 문서로 확인 가능한 기능만 사실로 적었다.
- 해석 범위: `harness engineering`, `control plane`, `contract`, `enforcement`, `observable harness` 같은 표현은 이 시리즈에서 쓰는 운영 개념이며, 별도 근거 줄이 없는 경우 필자의 해석이다.


## 제품 테스트는 무엇을 검증하는가

build, test, lint, audit는 여전히 중요하다. 이들은 코드가 깨지지 않았는지, 인터페이스가 유지됐는지, 정적 규칙을 어기지 않았는지, 알려진 취약점이 있는지를 확인해준다. 다시 말해 제품 회귀를 막는 기본 안전장치다.
해석: 이 절은 전통적 제품 테스트와 agent eval의 범위를 비교하는 운영 설명이다. OpenAI는 공식 eval 가이드에서 AI 평가를 전통적 소프트웨어 테스트와 구분해 설명한다([Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices))

문제는 여기서 검증되는 것이 주로 결과물이라는 점이다. API가 동작하는지, UI가 렌더링되는지, 타입 에러가 없는지, 린트 규칙을 통과하는지가 중심이다. 이것만으로는 "이 작업이 우리 하네스가 기대한 방식으로 수행됐는가"까지는 알 수 없다.

## agent 시스템은 어떻게 따로 실패하는가

agent 시스템은 코드 실패 말고도 다른 방식으로 실패한다. 대표적인 것이 wrong-owner routing이다. 예를 들어 인증 로직 수정이 필요한 작업인데, 라우팅이 잘못되어 프론트엔드 성격의 agent가 핵심 auth 파일까지 건드렸다고 해보자. 테스트는 통과할 수 있다. 하지만 책임 경계는 무너졌고, 다음 작업에서 유지보수 비용이 커진다.
문서로 확인 가능한 사실: OpenAI는 eval guide와 trace grading 문서에서 output만이 아니라 trace, workflow, architecture 선택까지 평가 관점에 포함시킨다([Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading), [Agents SDK](https://developers.openai.com/api/docs/guides/agents-sdk))

incomplete handoff도 비슷하다. 코드와 테스트는 통과했지만, 다음 단계가 알아야 할 위험이나 남은 확인 항목이 누락될 수 있다. stale docs 역시 마찬가지다. 구현은 바뀌었는데 설계 문서나 운영 문서가 갱신되지 않았다면, build와 test는 이 실패를 거의 잡지 못한다. bad tool choice, unnecessary sub-agent usage도 제품 테스트만으로는 잘 드러나지 않는다. 결과가 우연히 맞았더라도 orchestration 자체는 나쁘게 흘렀을 수 있기 때문이다.

예를 들어 문서 갱신이 필요한 변경이 있었는데도 코드만 수정하고 끝냈다고 해보자. 애플리케이션은 정상 동작할 수 있다. 하지만 별도 eval이 "이 경로의 변경에는 해당 문서 갱신이 따라와야 한다"를 검사한다면 그 누락은 잡아낼 수 있다. 이런 실패는 제품 실패가 아니라 운영 실패에 가깝다.

## 그래서 agent workflow eval이 필요하다

이 지점에서 agent workflow eval, 즉 agent의 작업 흐름과 orchestration을 따로 보는 평가가 필요해진다. 제품 테스트가 "무엇이 만들어졌는가"를 본다면, agent eval은 "그것이 어떤 과정으로 만들어졌는가"까지 본다. 하네스 엔지니어링은 결과물 검증만이 아니라 orchestration 검증까지 포함해야 한다는 뜻이다.
문서로 확인 가능한 사실: OpenAI는 AI applications를 테스트할 때 task-specific evaluation과 반복 측정이 필요하다고 안내한다([Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices))

이 구분이 중요한 이유는 agent 시스템의 실패가 늘 코드 오류 형태로만 나타나지 않기 때문이다. 어떤 실패는 나쁜 라우팅, 불완전한 handoff, 오래된 문서, 부적절한 도구 선택, 불필요한 sub-agent 호출처럼 나타난다. 제품은 통과했지만 시스템은 학습하지 못하고, 다음 실행도 불안정해지는 식이다.

## 어떤 eval이 가능한가

이런 agent workflow eval은 생각보다 다양하게 설계할 수 있다.
문서로 확인 가능한 사실: OpenAI는 output grading뿐 아니라 trace grading도 공식 가이드로 제공한다([Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading))

- handoff completeness eval: 필수 handoff 필드가 모두 채워졌는지 본다.
- wrong-owner routing eval: 작업 성격과 실제 담당 agent가 맞았는지 확인한다.
- scope violation eval: 허용 범위를 넘는 수정이 있었는지 본다.
- stale-doc detection: 관련 코드가 바뀌었는데 연결된 문서가 갱신되지 않았는지 잡는다.
- tool-choice trace grading: 필요 이상의 도구 선택이나 부적절한 실행 경로를 평가한다.
- orchestration trace review: 어떤 판단과 위임이 있었는지 trace 수준에서 검토한다.

이런 eval은 build나 test를 대체하려는 것이 아니다. 오히려 제품 검증 바깥에 있던 사각지대를 메우는 층에 가깝다.

## 내가 놓쳤던 검증의 사각지대

나도 처음에는 build, test, lint를 잘 묶어두면 충분하다고 생각한 적이 있다. 코드가 깨지지 않고 테스트가 통과하면 일단 시스템도 건강하다고 보기 쉬웠기 때문이다. 하지만 나중에 돌아보니 문서 미갱신, 잘못된 라우팅, handoff 불완전성 같은 실패는 이 묶음으로 거의 보이지 않았다.

이 경험이 보여준 것은 검증이 부족했다는 단순한 사실보다, 무엇을 검증하고 있는지부터 나눠 봐야 한다는 점이었다. 제품이 맞다는 것과, agent가 올바른 방식으로 일했다는 것은 같은 문장이 아니었다.

## 마무리

build, test, lint, audit는 제품 회귀 검증에 꼭 필요하다. 하지만 agent 시스템은 코드가 맞아도 orchestration에서 실패할 수 있다. 그래서 하네스 엔지니어링에서는 결과물 검증에 더해 agent workflow eval을 설계해야 한다.

다음 글에서는 이 문제를 멀티에이전트 관점으로 이어가 보려 한다. 많은 사람이 멀티에이전트를 기본값처럼 상상하지만, 실제로는 그렇지 않기 때문이다.

## 이 글의 한 줄 요약

제품 테스트가 통과했다고 해서 agent 시스템까지 검증된 것은 아니며, orchestration 실패를 잡으려면 agent workflow eval이 필요하다.

## 다음 글 예고

다음 편에서는 "멀티에이전트는 기본값이 아니다"라는 문제를 다뤄보려 한다. 작업을 여러 agent로 나누는 것이 항상 더 좋은 구조처럼 보이지만, 실제로는 오히려 복잡성과 실패 지점을 늘릴 수 있다. 어떤 경우에는 단일 agent가 더 안정적이고, 어떤 경우에만 분리가 이득인지 기준이 필요하다. 그래서 다음 글에서는 멀티에이전트를 기능이 아니라 비용과 통제 관점에서 보려 한다. orchestration을 검증하기 시작했다면, 이제 언제 분해하고 언제 분해하지 말아야 하는지도 함께 따져봐야 한다.

## 출처 및 참고

- OpenAI, [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- OpenAI, [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading)
- OpenAI, [Agents SDK](https://developers.openai.com/api/docs/guides/agents-sdk)
- OpenAI, [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
