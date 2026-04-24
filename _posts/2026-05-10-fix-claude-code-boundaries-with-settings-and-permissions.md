---
layout: single
description: "Claude Code에서 자연어 지시와 settings, permissions의 책임을 나누어 작업 경계를 고정하는 방법."
title: "Claude Code 실전 활용 05. settings와 permissions로 작업 경계 고정하기"
lang: ko
translation_key: fix-claude-code-boundaries-with-settings-and-permissions
date: 2026-05-10 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, claude-code, settings, permissions, security, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

Claude Code에게 "민감 파일은 읽지 마"라고 말하는 것은 행동을 유도하는 지시다. 하지만 실제 접근 경계를 고정하려면 settings와 permissions를 함께 봐야 한다.

이 글은 자연어 지시와 강제 설정의 책임을 나눈다. `CLAUDE.md`는 행동 기준을 설명하고, settings와 permissions는 도구 사용과 파일 접근 경계를 설정하는 계층으로 다룬다.

## 문서 정보

- 작성일: 2026-04-24
- 검증 기준일: 2026-04-24
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. Anthropic Claude Code 공식 문서를 바탕으로 한 설정 계층 정리.
- 테스트 버전: Claude Code 공식 문서 2026-04-24 확인본. 로컬 Claude Code CLI 버전은 확인하지 않음.

## 문제 정의

프롬프트와 지시 파일만으로 작업 경계를 만들면 중요한 부분이 사람의 기대에 머문다. Claude Code가 의도를 잘 따라 줄 수는 있지만, 민감 파일 접근, 위험 명령, 네트워크 요청 같은 작업은 더 명확한 경계가 필요하다.

이 글은 settings와 permissions를 "편의 설정"이 아니라 하네스의 강제 경계로 보는 방법을 정리한다.

## 확인된 사실

공식 문서 기준: Claude Code settings는 permissions, environment variables, tool behavior를 설정하는 JSON 계층이다. 더 높은 수준의 configuration은 낮은 수준의 설정보다 우선한다. 근거: [Anthropic, Claude Code settings](https://code.claude.com/docs/en/settings)

공식 문서 기준: settings precedence는 managed settings, command line arguments, local project settings, shared project settings, user settings 순서로 적용된다. 근거: [Anthropic, Claude Code settings](https://code.claude.com/docs/en/settings)

공식 문서 기준: 민감 파일 접근을 막기 위해 `.claude/settings.json`의 `permissions.deny`를 사용할 수 있다. 문서는 `.env`, secrets, credentials 같은 예시를 든다. 근거: [Anthropic, Claude Code settings](https://code.claude.com/docs/en/settings)

공식 문서 기준: permission mode는 Claude가 파일 편집, shell command, network request를 실행할 때 얼마나 자주 approval을 요구하는지 제어한다. `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions` 같은 mode가 설명되어 있다. 근거: [Anthropic, Choose a permission mode](https://code.claude.com/docs/en/permission-modes)

공식 문서 기준: mode와 관계없이 protected paths에 대한 write는 auto-approved 되지 않는다. permission modes는 baseline이고, permission rules는 그 위에 추가된다. 근거: [Anthropic, Choose a permission mode](https://code.claude.com/docs/en/permission-modes)

## 직접 재현한 결과

직접 재현 없음: 이 글은 실제 `.claude/settings.json`을 구성하고 Claude Code permission prompt나 deny 동작을 확인한 결과가 아니다.

검증한 것은 2026-04-24 기준 공식 문서의 설정 구조다. 아래 예시는 운영 설계 예시이며, 실제 적용 전에는 프로젝트 정책에 맞게 검토해야 한다.

## 해석 / 의견

### 자연어와 설정의 책임을 나눈다

| 대상 | 자연어 지시에 적합한 것 | settings / permissions에 적합한 것 |
| --- | --- | --- |
| 코드 스타일 | "기존 스타일을 따른다" | formatter command 고정은 hook 후보 |
| 민감 파일 | "secret을 노출하지 않는다" | `Read(./.env*)`, `Read(./secrets/**)` deny |
| 검증 | "테스트 결과를 보고한다" | post-edit hook 또는 CI |
| 위험 명령 | "destructive command는 피한다" | deny rule 또는 `PreToolUse` hook |
| 승인 경계 | "큰 변경은 먼저 계획한다" | permission mode, plan-first workflow |

의견: 자연어 지시는 Claude의 판단을 안내한다. settings와 permissions는 실행 가능한 경계를 만든다. 둘은 경쟁 관계가 아니라 서로 다른 층이다.

### 최소 deny 후보

팀 저장소라면 아래 항목을 먼저 검토할 수 있다.

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./config/credentials.json)",
      "Read(./build)"
    ]
  }
}
```

의견: 위 예시는 공식 문서의 민감 파일 차단 예시를 운영 관점으로 가져온 것이다. 실제 저장소에서는 secret 위치, generated output, vendor directory, build artifact 위치에 맞춰 조정해야 한다.

### permission mode는 작업 성격에 맞춘다

민감한 저장소를 처음 탐색할 때는 `plan`이나 `default` 같은 감독이 강한 흐름이 더 적합할 수 있다. 반복적인 안전 작업에서는 더 적은 interruption이 필요할 수 있다.

의견: permission mode를 "귀찮은 prompt를 줄이는 설정"으로만 보면 위험하다. 이 설정은 작업 속도와 감독 수준 사이의 tradeoff를 정하는 운영 결정이다.

### settings는 팀 규칙과 개인 규칙을 분리한다

공유해야 하는 정책은 `.claude/settings.json`에, 개인 로컬 설정은 `.claude/settings.local.json`에 두는 식으로 나누는 편이 자연스럽다.

의견: 팀 전체가 따라야 하는 deny rule을 개인 설정에만 두면 재현되지 않는다. 반대로 개인 sandbox 경로나 local tool 설정을 공유 설정에 넣으면 다른 사람의 환경을 깨뜨릴 수 있다.

## 한계와 예외

이 글은 2026-04-24 기준 공식 문서를 바탕으로 한 설정 구조 설명이다. permission mode 이름, settings precedence, deny rule 문법은 이후 바뀔 수 있다.

실제 deny rule 동작을 로컬에서 재현하지 않았으므로, glob matching과 tool별 permission 표현은 적용 전 공식 문서와 `/permissions` 화면에서 다시 확인해야 한다.

보안 요구가 강한 팀에서는 Claude Code 설정만으로 충분하지 않다. 별도 sandbox, secret scanning, CI policy, code review, 조직 managed settings가 함께 필요할 수 있다.

## 참고자료

- Anthropic, [Claude Code settings](https://code.claude.com/docs/en/settings)
- Anthropic, [Choose a permission mode](https://code.claude.com/docs/en/permission-modes)
- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
