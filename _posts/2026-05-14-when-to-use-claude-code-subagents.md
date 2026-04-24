---
layout: single
description: "Claude Code subagent를 언제 쓰고 언제 쓰지 말아야 하는지 판단하는 기준."
title: "Claude Code 실전 활용 09. Claude Code subagent는 언제 써야 하는가"
lang: ko
translation_key: when-to-use-claude-code-subagents
date: 2026-05-14 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, claude-code, subagents, parallel-work, context, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

Claude Code subagent는 모든 작업의 기본값이 아니다. main conversation을 로그, 검색 결과, 대량 파일 내용으로 채우지 않기 위해 분리된 작업자에게 side task를 맡기는 장치에 가깝다.

이 글은 subagent를 언제 쓰고 언제 피해야 하는지 정리한다. 기준은 병렬성이 아니라 격리, 요약, tool access 제한, 통합 비용이다.

## 문서 정보

- 작성일: 2026-04-24
- 검증 기준일: 2026-04-24
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. Anthropic Claude Code subagents 공식 문서를 바탕으로 한 운영 기준 정리.
- 테스트 버전: Claude Code 공식 문서 2026-04-24 확인본. 로컬 Claude Code CLI 버전은 확인하지 않음.

## 문제 정의

subagent 기능이 보이면 모든 일을 나눠 맡기고 싶어진다. 하지만 위임은 공짜가 아니다. 결과를 통합해야 하고, 중간 판단이 main conversation에서 보이지 않을 수 있으며, 작업 경계가 흐리면 충돌이 난다.

이 글은 subagent를 "더 많은 에이전트가 더 좋다"는 관점이 아니라, main context를 보호하고 반복 역할을 분리하는 운영 장치로 본다.

## 확인된 사실

공식 문서 기준: subagent는 특정 task를 처리하는 specialized AI assistant다. side task가 main conversation을 search results, logs, file contents로 채울 때 subagent를 쓰라고 설명한다. 근거: [Anthropic, Create custom subagents](https://code.claude.com/docs/en/sub-agents)

공식 문서 기준: 각 subagent는 자체 context window, custom system prompt, specific tool access, independent permissions를 가진다. 근거: [Anthropic, Create custom subagents](https://code.claude.com/docs/en/sub-agents)

공식 문서 기준: Claude Code에는 Explore, Plan, general-purpose 같은 built-in subagents가 있으며, Explore는 read-only agent로 codebase search와 analysis에 최적화된 것으로 설명된다. 근거: [Anthropic, Create custom subagents](https://code.claude.com/docs/en/sub-agents)

공식 문서 기준: subagent는 single session 안에서 동작하고 main agent에 결과를 돌려준다. 여러 agent가 독립적으로 협업하고 소통해야 하는 경우에는 agent teams가 별도 개념으로 설명된다. 근거: [Anthropic, Create custom subagents](https://code.claude.com/docs/en/sub-agents)

공식 문서 기준: extension overview는 subagents가 spawned될 때 fresh context를 사용하고 main session과 격리된 context cost를 가진다고 설명한다. 근거: [Anthropic, Extend Claude Code](https://code.claude.com/docs/en/features-overview)

## 직접 재현한 결과

직접 재현 없음: 이 글은 Claude Code에서 실제 subagent를 생성하거나 병렬 작업을 실행한 결과가 아니다.

검증한 것은 2026-04-24 기준 공식 문서다. 아래 기준은 subagent를 운영 판단으로 사용할 때의 해석이다.

## 해석 / 의견

### subagent를 쓰기 좋은 경우

| 상황 | 이유 |
| --- | --- |
| 큰 코드베이스 탐색 | main context를 검색 결과로 채우지 않기 위해 |
| 독립 리뷰 | 보안, 성능, 테스트 관점을 분리하기 위해 |
| 긴 로그 조사 | 원문을 읽고 signature만 돌려받기 위해 |
| 반복 역할 | 같은 instructions를 가진 worker를 재사용하기 위해 |
| tool access 제한이 필요한 작업 | 읽기 전용 worker처럼 권한을 좁히기 위해 |

의견: subagent의 핵심 가치는 "더 많은 손"보다 "분리된 context"에 있다.

### 피해야 할 경우

아래 상황에서는 main conversation에서 처리하는 편이 나을 수 있다.

1. 바로 다음 판단이 subagent 결과에 완전히 막혀 있는 경우.
2. 작은 파일 하나를 수정하는 좁은 작업인 경우.
3. 작업 경계와 결과 형식이 정해지지 않은 경우.
4. 여러 subagent 결과를 통합할 사람이 없는 경우.
5. 같은 파일을 여러 subagent가 동시에 수정할 가능성이 있는 경우.

의견: subagent를 많이 쓰면 탐색은 빨라질 수 있지만, 통합과 검증 비용이 커질 수 있다. 병렬화는 목표가 아니라 수단이다.

### 위임 프롬프트 예시

subagent에게 맡길 때는 결과 형식을 좁히는 편이 좋다.

```md
역할: 결제 모듈 읽기 전용 탐색

범위:
- src/payment/**
- tests/payment/**

할 일:
- 결제 승인 실패와 관련된 흐름을 찾아라.
- 수정하지 말고 읽기만 해라.
- 관련 파일, 함수, 테스트 후보를 요약해라.

보고 형식:
- 핵심 흐름
- 관련 파일
- 원인 후보
- 추가 확인이 필요한 지점
```

의견: 위임이 모호하면 subagent는 많은 내용을 읽고도 main conversation에 쓸모없는 요약을 돌려줄 수 있다. 좋은 위임은 범위와 보고 형식이 짧고 분명하다.

### 통합 책임은 main 흐름에 남는다

subagent가 결과를 가져와도 결론을 내리고 수정 방향을 정하는 책임은 main 흐름에 남는다.

의견: subagent의 요약은 근거 후보이지 최종 판단이 아니다. 특히 코드 수정, 보안 판단, 배포 판단은 main conversation에서 다시 검토하고 검증해야 한다.

## 한계와 예외

이 글은 2026-04-24 기준 공식 문서를 바탕으로 한다. built-in subagent 종류, model routing, tool restriction 방식은 이후 바뀔 수 있다.

직접 실행 테스트가 없으므로, 실제 subagent 자동 위임, foreground/background 동작, cost 차이, context 절감 효과는 검증하지 않았다.

작업 규모가 작거나 통합 기준이 불명확한 경우 subagent는 오히려 복잡도를 늘릴 수 있다.

## 참고자료

- Anthropic, [Create custom subagents](https://code.claude.com/docs/en/sub-agents)
- Anthropic, [Extend Claude Code](https://code.claude.com/docs/en/features-overview)
- Anthropic, [Commands](https://code.claude.com/docs/en/commands)
