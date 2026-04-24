---
layout: single
description: "Claude Code hooks를 검증, 차단, 완료 보고 점검에 사용하는 운영 기준을 정리한 글."
title: "Claude Code 실전 활용 06. hooks로 검증과 보호 장치를 자동화하기"
lang: ko
translation_key: automate-validation-and-guardrails-with-hooks
date: 2026-05-11 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, claude-code, hooks, validation, guardrails, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

hooks는 Claude Code에게 "기억해 줘"라고 부탁하는 문장이 아니다. 특정 lifecycle event에서 실행되는 자동화 장치다.

이 글은 hooks를 검증과 보호 장치 관점에서 본다. 위험 명령을 막고, 파일 수정 뒤 검사를 실행하고, 완료 보고 전에 검증 상태를 확인하는 식으로 작업 루프 안에 결정적인 장치를 넣을 수 있다.

## 문서 정보

- 작성일: 2026-04-24
- 검증 기준일: 2026-04-24
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. Anthropic Claude Code hooks 공식 문서를 바탕으로 한 운영 구조 정리.
- 테스트 버전: Claude Code 공식 문서 2026-04-24 확인본. 로컬 Claude Code CLI 버전은 확인하지 않음.

## 문제 정의

Claude Code에게 "수정 후 테스트를 실행해"라고 지시할 수 있다. 하지만 반복되는 검증이나 위험 명령 차단을 매번 모델의 기억에만 맡기면 빠뜨릴 수 있다.

hooks는 이런 반복적이고 결정적인 작업을 lifecycle event에 연결하는 방법이다. 이 글은 hooks를 어디에 쓰고 어디에 쓰지 말아야 하는지 구분한다.

## 확인된 사실

공식 문서 기준: hooks는 Claude Code lifecycle의 특정 지점에서 실행되는 사용자 정의 shell command, HTTP endpoint, LLM prompt다. event가 발생하고 matcher가 맞으면 Claude Code는 hook handler에 JSON context를 전달한다. 근거: [Anthropic, Hooks reference](https://code.claude.com/docs/en/hooks)

공식 문서 기준: hooks event는 session 단위, turn 단위, agentic loop 안의 tool call 단위로 나뉜다. 예를 들어 `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `Stop`, `InstructionsLoaded` 같은 event가 있다. 근거: [Anthropic, Hooks reference](https://code.claude.com/docs/en/hooks)

공식 문서 기준: `PreToolUse`는 tool call 실행 전에 발생하고 차단할 수 있다. `PostToolUse`는 tool call 성공 후 발생한다. `Stop`은 Claude가 응답을 마쳤을 때 발생한다. 근거: [Anthropic, Hooks reference](https://code.claude.com/docs/en/hooks)

공식 문서 기준: extension overview는 hooks가 trigger될 때 외부에서 실행되며, hook이 추가 context를 반환하지 않는 한 context cost가 없다고 설명한다. 근거: [Anthropic, Extend Claude Code](https://code.claude.com/docs/en/features-overview)

## 직접 재현한 결과

직접 재현 없음: 이 글은 실제 hook script를 만들어 Claude Code에서 실행한 결과가 아니다.

검증한 것은 2026-04-24 기준 hooks 공식 문서다. 아래 예시는 설계 방향을 보여 주기 위한 운영 예시이며, 실제 적용 전에는 팀 환경과 보안 정책에 맞춰 테스트해야 한다.

## 해석 / 의견

### hook이 적합한 작업

| 상황 | 적합한 hook 후보 | 이유 |
| --- | --- | --- |
| 위험 shell command 차단 | `PreToolUse` | 실행 전에 막아야 함 |
| 파일 수정 뒤 lint 실행 | `PostToolUse` | tool call 성공 후 검사 가능 |
| prompt 제출 전 금지 정보 점검 | `UserPromptSubmit` | 모델 처리 전에 감지 가능 |
| 완료 보고 형식 점검 | `Stop` | 마지막 응답을 확인할 수 있음 |
| 지시 파일 로딩 관찰 | `InstructionsLoaded` | context에 어떤 지시가 들어왔는지 볼 수 있음 |

의견: hook은 "Claude가 판단해야 하는 일"보다 "조건이 맞으면 같은 방식으로 실행되어야 하는 일"에 적합하다.

### 위험 명령 차단 예시

공식 문서에도 destructive command를 `PreToolUse`에서 막는 예시가 있다. 운영 관점에서는 아래처럼 접근하면 된다.

```md
조건:
- Bash tool call이다.
- command에 위험 패턴이 있다.

동작:
- 실행을 deny한다.
- Claude에게 차단 이유를 반환한다.
```

의견: "위험 명령을 실행하지 마"라는 자연어 지시보다, 실제 실행 직전에 막는 hook이 더 강한 경계다.

### 검증 자동화 예시

파일 수정 뒤 항상 lint를 실행해야 한다면 `PostToolUse` hook 후보가 된다.

```md
event: PostToolUse
matcher: Edit 또는 Write 계열 tool
action:
  - 변경된 파일 유형을 확인한다.
  - 관련 lint 또는 test command를 실행한다.
  - 결과를 Claude가 읽을 수 있는 짧은 요약으로 반환한다.
```

의견: hook output이 너무 길면 다시 context 부담이 된다. 자동화 결과는 "성공/실패, 관련 파일, 다음 행동" 정도로 압축하는 편이 낫다.

### hook으로 해결하지 말아야 할 것

복잡한 설계 판단, 제품 요구사항 해석, 모호한 버그 원인 추론은 hook보다 Claude의 reasoning과 사람의 리뷰가 필요한 영역이다.

의견: hooks는 결정적인 장치다. 모든 검토를 hook으로 만들면 유지보수와 false positive 비용이 커진다. 자동화해야 할 것과 판단해야 할 것을 나누어야 한다.

## 한계와 예외

이 글은 2026-04-24 기준 hooks 공식 문서에 근거한다. event 이름, JSON schema, decision 형식은 이후 바뀔 수 있다.

직접 실행 테스트가 없으므로, Windows PowerShell hook, HTTP hook, prompt-based hook, async hook의 실제 동작은 검증하지 않았다.

hook은 보안 위험도 만든다. shell script와 HTTP endpoint는 권한, secret, network access, command injection 가능성을 따로 검토해야 한다.

## 참고자료

- Anthropic, [Hooks reference](https://code.claude.com/docs/en/hooks)
- Anthropic, [Extend Claude Code](https://code.claude.com/docs/en/features-overview)
- Anthropic, [Claude Code settings](https://code.claude.com/docs/en/settings)
