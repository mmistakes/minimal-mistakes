---
layout: single
title: "하네스 엔지니어링 09. approval과 guardrail이 비어 있으면 agent 시스템은 불안정하다"
lang: ko
translation_key: approval-boundaries-and-guardrails
date: 2026-04-18 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, harness-engineering, guardrail, approval, mcp]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

규칙은 많았는데도 왠지 불안하다면, 경계가 비어 있을 가능성이 크다. 역할 분리도 있고 검증 규칙도 있고 문서 원칙도 잘 적혀 있는데, 막상 운영해 보면 어떤 행동은 너무 쉽게 실행되고 어떤 입력은 너무 쉽게 믿어지는 경우가 있다. 그래서 이번 글에서는 좋은 운영 문서와 안전한 실행 경계가 왜 다른 문제인지, 그리고 approval boundary와 guardrail이 왜 agent 시스템에 처음부터 필요했는지를 이야기해보려 한다.

## 검증 기준과 해석 경계

- 시점: 2026-04-15 기준 OpenAI Codex 문서, OpenAI 공식 API 문서, Anthropic Claude Code 문서를 확인했다.
- 출처 등급: 공식 문서 우선, 개념을 처음 소개한 vendor-authored 글만 보조로 사용했다.
- 사실 범위: `AGENTS.md`, memory/settings, hooks, subagents, approvals, sandboxing, eval, trace처럼 문서로 확인 가능한 기능만 사실로 적었다.
- 해석 범위: `harness engineering`, `control plane`, `contract`, `enforcement`, `observable harness` 같은 표현은 이 시리즈에서 쓰는 운영 개념이며, 별도 근거 줄이 없는 경우 필자의 해석이다.


## approval boundary란 무엇인가

approval boundary는 "어떤 행동까지는 agent가 스스로 해도 되고, 어떤 행동부터는 사람 승인이 필요하다"는 경계를 뜻한다. 이것은 단순한 권한 설정이 아니라, 책임이 넘어가는 지점을 명확히 하는 설계에 가깝다.
문서로 확인 가능한 사실: OpenAI는 agent approvals를 별도 보안 계층으로 설명하고, Anthropic은 permissions를 통해 어떤 행동이 허용되는지 문서화한다([Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [Claude permissions](https://code.claude.com/docs/en/permissions))

가장 쉬운 예는 destructive action이다. 삭제, 배포, 대량 수정 같은 작업은 결과가 되돌리기 어렵거나 영향 범위가 넓다. 예를 들어 수백 개 파일을 한꺼번에 바꾸는 작업, 운영 환경 배포, 기존 데이터를 지우는 작업은 agent가 규칙을 잘 이해하고 있더라도 자동 실행보다 사람 승인을 먼저 두는 편이 안전하다. 좋은 문서에 "조심해라"라고 적는 것과, 실제로 승인 없이는 못 넘어가게 만드는 것은 전혀 다른 층의 이야기다.

## guardrail은 무엇을 막는가

여기서 말하는 guardrail은 실무에서 넓게 묶어 부르는 표현에 가깝다. 공식 문서에서는 permissions, hooks, input/output guardrails, trust verification처럼 조금 더 나뉜 장치로 설명되기도 한다. 다만 공통적으로는 agent가 잘못된 방향으로 너무 멀리 가기 전에 멈추게 하거나, 위험한 흐름을 제한하는 역할을 가리킨다. approval boundary가 승인 지점을 정한다면, guardrail은 아예 허용되지 않는 동작이나 위험한 흐름을 제한한다.
문서로 확인 가능한 사실: OpenAI는 safety guide와 sandboxing 문서에서 guardrail, policy check, 실행 제한을 설명하고, Anthropic은 hooks, sandboxing, security 문서에서 실행 전후 통제 지점을 설명한다([Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety), [OpenAI sandboxing](https://developers.openai.com/codex/concepts/sandboxing), [Claude hooks](https://code.claude.com/docs/en/hooks), [Claude sandboxing](https://code.claude.com/docs/en/sandboxing), [Claude security](https://code.claude.com/docs/en/security))
해석: 이 글의 `guardrail`은 이 여러 장치를 실무적으로 묶어 부르는 표현이다.

예를 들어 비신뢰 입력을 그대로 실행 지시처럼 다루지 못하게 하는 것이 guardrail이다. 외부 문서, 이슈 본문, 웹에서 가져온 텍스트, connector나 MCP를 통해 들어온 데이터는 모두 유용한 문맥이 될 수 있다. 하지만 그 내용이 곧바로 시스템 지시처럼 agent 행동을 밀게 두면 위험하다. 외부 문서에 적혀 있다고 해서 바로 삭제, 배포, 권한 확장 같은 행동으로 이어지면 안 된다. 외부 텍스트는 참고 문맥일 수는 있어도, 곧바로 실행 권한을 얻는 입력이 되어서는 안 된다.

## 어떤 영역에서 특히 중요해지는가

특히 세 가지 영역에서 approval과 guardrail이 중요해진다.
해석: 어느 영역이 특히 중요하다는 우선순위 판단은 필자의 운영 기준이다. 다만 공식 문서도 고위험 tool use, 외부 입력, 권한 경계, sandboxing을 별도 안전 주제로 다룬다([Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety), [Claude permissions](https://code.claude.com/docs/en/permissions), [Claude sandboxing](https://code.claude.com/docs/en/sandboxing))

첫째는 destructive action이다. 삭제, 강한 overwrite, 대량 변경, 배포 같은 작업은 승인 경계가 필요하다. 둘째는 외부 데이터와 비신뢰 입력이다. 외부 문서의 내용을 그대로 실행 지시로 취급하면 안 되는 이유가 여기에 있다. 텍스트는 사실 주장일 수는 있어도, 권한 위임은 아니다. 셋째는 connector/MCP 같은 외부 연결이다. 이 경우 agent가 무엇을 읽었고, 어떤 도구를 호출했고, 그 결과를 어떤 판단에 사용했는지가 최소한 기록되어야 한다.

예를 들어 connector/MCP 사용 시에는 `source`, `tool_name`, `query_or_resource`, `timestamp`, `decision_usage` 같은 필드를 남기는 편이 좋다. 이것은 공식 표준 스키마라기보다, 나중에 "이 외부 데이터가 왜 이 행동으로 이어졌는가"를 추적하기 위한 실무적 최소 예시에 가깝다. 외부 연결을 쓴다는 사실 자체보다, 그 연결이 판단 과정에 어떤 영향을 줬는지 보이는 것이 더 중요하다.

## 내가 뒤늦게 더 중요하게 보게 된 항목

나 역시 초기에 agent 운영을 설계할 때는 역할 분리, 검증, 문서 규칙 쪽에 더 집중한 적이 있다. 무엇을 어떻게 맡길지, 어떤 테스트를 붙일지, 어떤 문서를 갱신할지가 더 눈에 잘 들어왔기 때문이다. approval과 guardrail은 그다음에 덧붙이는 옵션처럼 보이기도 했다.
해석: 이 절은 필자가 approval boundary와 guardrail을 더 중요한 축으로 보게 된 경험을 정리한 부분이다. 문서로 확인 가능한 사실은 approvals, permissions, hooks, sandboxing이 모두 별도 운영 계층으로 존재한다는 점이다([Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [OpenAI hooks](https://developers.openai.com/codex/hooks), [Claude permissions](https://code.claude.com/docs/en/permissions), [Claude hooks](https://code.claude.com/docs/en/hooks))

하지만 나중에 보니 이 부분은 뒤늦게 붙이는 장식이 아니라, 처음부터 설계해야 하는 항목에 더 가까웠다. 규칙이 좋아도 승인 경계가 비어 있으면 위험한 행동이 너무 쉽게 실행될 수 있고, guardrail이 약하면 외부 입력이 생각보다 큰 힘을 가지게 된다. 좋은 운영 문서와 안전한 실행 경계는 같은 것이 아니었다.

## 마무리

agent-first 운영 문서라면 approval boundary와 guardrail이 반드시 필요하다. 어떤 도구 호출은 사람 승인이 필요한지, destructive action은 어디서 멈춰야 하는지, 외부 텍스트와 비신뢰 입력은 어떻게 다뤄야 하는지, connector/MCP 사용 시 무엇을 기록해야 하는지를 처음부터 정해야 한다. 하네스 엔지니어링에서 중요한 것은 규칙을 많이 쓰는 일이 아니라, 그 규칙이 안전한 실행 경계 안에서 작동하게 만드는 일이다.

다음 글에서는 이 흐름을 실제 전환 로드맵으로 이어가 보려 한다. 문서 중심 운영에서 관측 가능한 하네스로 넘어갈 때 무엇부터 바꾸면 되는지를 실전 순서로 정리해볼 생각이다.

## 이 글의 한 줄 요약

좋은 운영 규칙만으로는 agent 시스템을 안전하게 만들 수 없고, approval boundary와 guardrail 같은 실행 경계를 처음부터 함께 설계해야 한다.

## 다음 글 예고

다음 편에서는 "문서 중심 운영에서 관측 가능한 하네스로: 실전 전환 로드맵"을 다뤄보려 한다. 지금까지 시리즈에서 본 문제들은 서로 따로 떨어져 있지 않고, 실제로는 한 번에 조금씩 옮겨가야 하는 전환 과제에 가깝다. 그래서 다음 글에서는 무엇을 먼저 문서에서 분리하고, 무엇을 schema와 eval로 올리고, 무엇을 trace와 guardrail로 보강할지 순서를 잡아볼 생각이다. 처음부터 완벽한 하네스를 만드는 대신, 어떤 단계로 현실적으로 옮겨갈 수 있는지가 더 중요하기 때문이다. 이제부터는 개념 설명을 넘어 실제 적용의 순서를 다룰 차례다.

## 출처 및 참고

- OpenAI, [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)
- OpenAI, [Sandboxing](https://developers.openai.com/codex/concepts/sandboxing)
- OpenAI, [Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety)
- Anthropic, [Permissions](https://code.claude.com/docs/en/permissions)
- Anthropic, [Hooks reference](https://code.claude.com/docs/en/hooks)
- Anthropic, [Sandboxing](https://code.claude.com/docs/en/sandboxing)
- Anthropic, [Security](https://code.claude.com/docs/en/security)
