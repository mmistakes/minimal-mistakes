---
layout: single
description: "Claude Code를 프로젝트에 적용할 때 CLAUDE.md, AGENTS.md, rules, skills, settings, hooks, MCP, subagent 기준을 묶은 운영 템플릿."
title: "Claude Code 실전 활용 10. Claude Code 프로젝트 적용용 운영 템플릿"
lang: ko
translation_key: claude-code-project-operations-template
date: 2026-05-15 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, claude-code, operations-template, claude-md, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

Claude Code를 프로젝트에 붙이는 일은 `CLAUDE.md` 하나를 만드는 일로 끝나지 않는다. 항상 로드되는 지시, 경로별 규칙, 반복 절차, 권한 경계, 외부 문맥 연결, 검증 루프를 함께 설계해야 한다.

이 글은 앞선 9편을 실제 저장소에 적용하기 위한 운영 템플릿으로 묶는다. 목적은 거대한 규칙집이 아니라, Claude Code가 읽고, 수정하고, 검증하고, 보고하는 흐름을 안정시키는 기본 구조를 만드는 것이다.

## 문서 정보

- 작성일: 2026-04-24
- 검증 기준일: 2026-04-24
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. Anthropic Claude Code 공식 문서와 앞선 연재의 운영 기준을 바탕으로 한 템플릿 정리.
- 테스트 버전: Claude Code 공식 문서 2026-04-24 확인본. 로컬 Claude Code CLI 버전은 확인하지 않음.

## 문제 정의

Claude Code의 기능은 각각 따로 보면 어렵지 않다. `CLAUDE.md`를 만들고, rules를 나누고, skill을 만들고, permissions와 hooks를 설정하고, MCP와 subagent를 필요할 때 쓴다.

문제는 이 요소들이 서로 겹칠 때다. 같은 규칙이 여러 곳에 반복되고, 긴 절차가 매 세션 로드되고, 자연어 지시로 막아야 할 일을 설정으로 고정하지 않으면 운영이 흐려진다.

## 확인된 사실

공식 문서 기준: Claude Code extension overview는 `CLAUDE.md`, skills, MCP, subagents, hooks, plugins를 확장 계층으로 설명하고, 각 feature가 언제 로드되는지 구분한다. 근거: [Anthropic, Extend Claude Code](https://code.claude.com/docs/en/features-overview)

공식 문서 기준: `CLAUDE.md`와 auto memory는 conversation start에 로드되는 context이며, `CLAUDE.md`는 enforced configuration이 아니다. 근거: [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)

공식 문서 기준: `.claude/rules/`는 unconditional 또는 path-scoped instructions를 구성할 수 있고, skills는 필요할 때 호출되는 reusable knowledge와 workflow로 쓸 수 있다. 근거: [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory), [Anthropic, Extend Claude with skills](https://code.claude.com/docs/en/skills)

공식 문서 기준: settings files는 permissions, environment variables, tool behavior를 설정하고, `permissions.deny`로 민감 파일 접근을 막을 수 있다. 근거: [Anthropic, Claude Code settings](https://code.claude.com/docs/en/settings)

공식 문서 기준: hooks는 Claude Code lifecycle event에서 실행되며, `PreToolUse`, `PostToolUse`, `UserPromptSubmit`, `Stop` 같은 event를 사용할 수 있다. 근거: [Anthropic, Hooks reference](https://code.claude.com/docs/en/hooks)

공식 문서 기준: MCP는 외부 도구, 데이터 소스, API를 Claude Code와 연결하고, subagents는 별도 context window와 tool access를 가진 specialized assistants로 동작한다. 근거: [Anthropic, Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp), [Anthropic, Create custom subagents](https://code.claude.com/docs/en/sub-agents)

## 직접 재현한 결과

직접 재현 없음: 이 글은 하나의 실제 제품 저장소에 템플릿을 적용해 전후 품질을 측정한 결과가 아니다.

검증한 것은 2026-04-24 기준 공식 문서와 앞선 글에서 정리한 운영 구조다. 아래 템플릿은 출발점이며, 실제 팀의 보안 정책과 CI 구조에 맞게 조정해야 한다.

## 해석 / 의견

### 1. 도입 전 점검

```md
## Claude Code Adoption Check

- 저장소 목적:
- 주요 작업 유형:
- 민감 파일과 금지 경로:
- 기본 build/test/lint 명령:
- 외부 시스템:
- 리뷰와 배포 기준:
- 자동화 가능한 검증:
```

의견: Claude Code 설정을 만들기 전에 먼저 사람이 작업 경계와 완료 기준을 알아야 한다.

### 2. `CLAUDE.md` 최소안

```md
# CLAUDE.md

## Project

- Repository purpose:
- Main paths:
- Test paths:

## Commands

- Build:
- Test:
- Lint:

## Working Rules

- Keep changes scoped to the request.
- Separate facts, direct results, and opinions in reports.
- Report tests run and tests not run separately.

## References

- Shared agent rules: @AGENTS.md
- Path-specific rules: .claude/rules/
- Repeatable workflows: .claude/skills/
```

의견: `CLAUDE.md`는 모든 설명을 담는 곳이 아니라 어디를 봐야 하는지 알려 주는 진입점이다.

### 3. rules와 skills 분리

```md
.claude/
  rules/
    api.md
    frontend.md
    tests.md
  skills/
    release-checklist/
      SKILL.md
    incident-analysis/
      SKILL.md
```

| 내용 | 위치 |
| --- | --- |
| 모든 작업에 필요한 짧은 기준 | `CLAUDE.md` |
| 특정 파일 유형에 필요한 기준 | `.claude/rules/` |
| 반복 절차와 긴 참고자료 | `.claude/skills/` |
| 금지 파일과 승인 경계 | `.claude/settings.json` |

### 4. settings와 permissions 기본 점검

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ]
  }
}
```

의견: 자연어로 "secret을 보지 마"라고 쓰는 것과 접근을 deny하는 것은 다르다. 민감 경계는 설정으로 내리는 편이 낫다.

### 5. hooks 후보

```md
## Hook Candidates

- PreToolUse: 위험 shell command 차단
- PostToolUse: 파일 수정 뒤 lint 또는 format 확인
- UserPromptSubmit: 민감 정보 prompt 포함 여부 점검
- Stop: 완료 보고에 검증 결과가 있는지 확인
```

의견: 모든 검증을 hook으로 만들 필요는 없다. 반복적이고 결정적인 검증부터 자동화 후보로 둔다.

### 6. MCP 연결 기준

```md
## MCP Candidates

- Issue tracker: 반복적으로 이슈 본문을 붙여 넣는 경우
- Monitoring: 장애 로그와 dashboard를 자주 확인하는 경우
- Database: read-only query가 필요한 경우
- Docs: 긴 사내 문서에서 필요한 부분만 읽어야 하는 경우
```

의견: MCP는 권한 설계다. 읽기 전용부터 시작하고, 쓰기 권한은 승인과 감사 기준이 있을 때만 열어야 한다.

### 7. subagent 사용 기준

```md
Use a subagent when:

- side task가 main context를 크게 오염시킨다.
- 읽기 전용 탐색이나 독립 리뷰가 필요하다.
- 결과는 요약만 있으면 된다.
- tool access를 제한할 이유가 있다.

Avoid a subagent when:

- 작업이 작고 바로 수정하면 된다.
- 통합 기준이 없다.
- 여러 worker가 같은 파일을 수정할 가능성이 크다.
```

의견: subagent는 병렬 작업 장식이 아니라 context isolation 도구다.

### 8. 완료 보고 기준

```md
## Completion Report

- 변경 요약:
- 변경 파일:
- 실행한 검증:
- 실행하지 못한 검증과 이유:
- 남은 위험:
- 사람이 리뷰해야 할 지점:
```

의견: "완료"는 감상이 아니라 검증 가능한 상태 보고여야 한다. 이 보고 형식은 `CLAUDE.md`에 짧게 남기고, 더 복잡한 리뷰 절차는 skill로 분리할 수 있다.

## 한계와 예외

이 템플릿은 2026-04-24 기준 공식 문서와 앞선 연재의 운영 관점에 근거한 출발점이다. Claude Code의 기능명, 설정 키, 권장 구조는 이후 바뀔 수 있다.

직접 제품 저장소에 적용해 측정하지 않았으므로, 이 템플릿이 모든 팀에서 같은 효과를 낸다고 단정할 수 없다.

작은 개인 프로젝트는 `CLAUDE.md`와 간단한 permission 설정만으로 충분할 수 있다. 반대로 규제가 강한 팀 저장소는 managed settings, 별도 sandbox, CI policy, audit log가 더 중요할 수 있다.

## 참고자료

- Anthropic, [Extend Claude Code](https://code.claude.com/docs/en/features-overview)
- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- Anthropic, [Claude Code settings](https://code.claude.com/docs/en/settings)
- Anthropic, [Hooks reference](https://code.claude.com/docs/en/hooks)
- Anthropic, [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)
- Anthropic, [Extend Claude with skills](https://code.claude.com/docs/en/skills)
- Anthropic, [Create custom subagents](https://code.claude.com/docs/en/sub-agents)
