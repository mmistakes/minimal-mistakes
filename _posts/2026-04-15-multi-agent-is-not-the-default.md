---
layout: single
description: "멀티에이전트 구성이 항상 정답이 아닌 이유와 단일 에이전트 기준선을 설명한 글."
title: "하네스 엔지니어링 06. 멀티에이전트는 기본값이 아니다"
lang: ko
translation_key: multi-agent-is-not-the-default
date: 2026-04-15 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, multi-agent]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

에이전트가 많을수록 더 똑똑해질 것 같다는 직관은 꽤 강하다. planner가 계획하고, executor가 구현하고, verifier가 검증하고, doc-writer가 문서를 맡으면 더 체계적으로 보이기 때문이다. 하지만 실제 운영에서는 이 분업 구조가 항상 이득이 되지 않는다. 그래서 이번 글에서는 멀티에이전트가 무조건 좋은 기본값이 아니라, 조건부 전략이어야 하는 이유를 이야기해보려 한다.

## 검증 기준과 해석 경계

- 시점: 2026-04-15 기준 OpenAI Codex 문서, OpenAI 공식 API 문서, Anthropic Claude Code 문서를 확인했다.
- 출처 등급: 공식 문서 우선, 개념을 처음 소개한 vendor-authored 글만 보조로 사용했다.
- 사실 범위: `AGENTS.md`, memory/settings, hooks, subagents, approvals, sandboxing, eval, trace처럼 문서로 확인 가능한 기능만 사실로 적었다.
- 해석 범위: `harness engineering`, `control plane`, `contract`, `enforcement`, `observable harness` 같은 표현은 이 시리즈에서 쓰는 운영 개념이며, 별도 근거 줄이 없는 경우 필자의 해석이다.


## 왜 멀티에이전트가 매력적으로 보이는가

멀티에이전트는 겉보기에 분업적이고 정돈돼 보인다. 역할이 나뉘면 책임도 선명해질 것 같고, 동시에 여러 작업을 돌리면 속도도 빨라질 것처럼 느껴진다. 특히 사람 팀의 조직도를 닮아 있어 직관적으로 설득력이 있다.
문서로 확인 가능한 사실: OpenAI와 Anthropic 모두 subagent 기능을 공식적으로 문서화하고 있다([OpenAI subagents](https://developers.openai.com/codex/subagents), [Claude Code subagents](https://code.claude.com/docs/en/sub-agents))

큰 기능 추가처럼 실제로 서로 다른 문맥이 필요한 경우에는 이 직관이 맞을 때도 있다. 예를 들어 새로운 결제 기능을 붙이는 작업이라면, 결제 도메인 구현, 프론트엔드 연결, 검증 시나리오 정리, 문서 갱신이 어느 정도 분리될 수 있다. 이런 경우에는 역할 분리가 실제 컨텍스트 분리와 맞물리며 도움이 될 수 있다.

## 하지만 어떤 비용이 숨어 있는가

문제는 작은 작업에도 이 구조를 기본값처럼 붙이는 순간 드러난다. 예를 들어 단일 파일 수정 작업인데 planner, executor, verifier, doc-writer를 모두 붙였다고 해보자. 겉보기에는 체계적이지만 실제로는 orchestration 비용만 늘어난다. 각 단계마다 handoff가 필요해지고, handoff 실수 가능성도 함께 커진다.
해석: coordination cost, 평가 복잡도, trace 난이도는 필자의 운영 관찰이다. 다만 OpenAI의 eval 가이드는 architecture choice 자체를 평가 대상으로 보라고 설명한다([Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading))

추적도 어려워진다. 단일 agent라면 판단 흐름이 한 줄로 이어지지만, 멀티에이전트에서는 누가 어떤 결정을 했는지 trace를 다시 모아야 한다. 품질 책임 경계도 모호해진다. planner가 문제였는지, executor가 범위를 넘겼는지, verifier가 놓쳤는지, doc-writer가 stale docs를 남겼는지 구분하는 비용이 생긴다.

결국 멀티에이전트는 비결정성을 줄이는 구조가 아니라, 잘못 쓰면 오히려 늘리는 구조가 될 수 있다. 작은 작업에도 무조건 sub-agent를 태우면 속도보다 coordination이 더 커지고, 시스템은 더 복잡해진다.

## 멀티에이전트는 언제 정당화되는가

그래서 멀티에이전트는 기본값이 아니라 조건부 전략이어야 한다. 공식 문서와 사례를 종합해보면, 적어도 세 가지 기준으로 정당화하는 편이 안전하다. 첫째, 작업 크기가 충분히 커서 실제 병렬화 이점이 있어야 한다. 둘째, 컨텍스트가 정말 분리되어 각 agent가 다른 정보 집합을 다루는 편이 나아야 한다. 셋째, eval 상 이점이 확인되어야 한다. 즉, 단일 agent보다 결과 품질이나 처리 시간이 실제로 개선된다는 근거가 있어야 한다.
문서로 확인 가능한 사실: subagent는 공식 기능이지만, 어떤 구조가 더 낫다는 판단은 별도 eval로 검증해야 한다는 방향이 공식 가이드와 맞닿아 있다([OpenAI subagents](https://developers.openai.com/codex/subagents), [Claude Code subagents](https://code.claude.com/docs/en/sub-agents), [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices))
해석: 이 글의 “기본값이 아니다”는 결론은 필자의 운영 판단이다.

이 기준이 없으면 멀티에이전트는 단지 "복잡해 보이는 구조"가 되기 쉽다. 하네스 엔지니어링 관점에서 중요한 것은 기능을 더 붙이는 일이 아니라, 실패를 줄이는 구조를 선택하는 일이다. 멀티에이전트도 그 기준으로 정당화되어야 한다.

## 내가 직접 설계해보며 느낀 유혹과 한계

나 역시 멀티에이전트 구조가 더 체계적이고 좋아 보인다고 생각한 적이 있다. 역할이 나뉘면 더 안전하고 더 전문화된 흐름이 될 것 같았기 때문이다. 하지만 실제로는 작은 작업에도 handoff와 추적 비용이 생겼고, 생각보다 많은 복잡성이 orchestration 층에서 발생했다.

이 경험이 남긴 교훈은 멀티에이전트가 틀렸다는 것이 아니었다. 오히려 "언제 분해할 것인가"가 설계의 핵심이라는 점이었다. 멀티에이전트는 기본 자세가 아니라, eval로 정당화된 경우에만 꺼내는 전략에 더 가깝다.

## 마무리

멀티에이전트는 겉으로 보면 분업적이고 영리해 보이지만, 실제 운영에서는 orchestration 비용, handoff 실수, 추적 난이도, 책임 경계 모호화를 함께 가져올 수 있다. 그래서 기본값처럼 붙이기보다, 충분한 작업 크기와 실제 컨텍스트 분리, eval 상 이점이 있을 때만 선택하는 편이 낫다. 하네스 엔지니어링에서 중요한 것은 많은 agent가 아니라, 더 예측 가능한 시스템이다.

다음 글에서는 이 문제를 한 단계 더 내려가서 보려 한다. 자연어 원칙을 문장으로만 남겨두지 않고, 어떻게 enforcement로 올릴 것인지가 그 다음 질문이기 때문이다.

## 이 글의 한 줄 요약

멀티에이전트는 더 체계적으로 보인다는 이유만으로 기본값이 되어서는 안 되며, 실제 이점이 eval로 정당화될 때만 선택해야 한다.

## 다음 글 예고

다음 편에서는 "원칙에서 enforcement로: 문장을 시스템 규칙으로 올리는 법"을 다뤄보려 한다. 좋은 원칙을 문서에 적는 것만으로는 agent가 항상 그 기준을 지키지 않는다. 어떤 규칙은 자연어 설명으로 남길 수 있지만, 어떤 규칙은 lint, schema, hook, CI 같은 장치로 올려야 한다. 그래서 다음 글에서는 문장을 어떻게 검증 가능한 시스템 규칙으로 바꾸는지 살펴볼 생각이다. 멀티에이전트의 사용 조건을 정했다면, 이제 그 조건을 실제로 강제하는 방법까지 가야 한다.

## 출처 및 참고

- OpenAI, [Subagents](https://developers.openai.com/codex/subagents)
- OpenAI, [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- OpenAI, [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading)
- Anthropic, [Create custom subagents](https://code.claude.com/docs/en/sub-agents)
