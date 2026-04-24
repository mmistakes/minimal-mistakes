---
layout: single
description: "Claude Code를 기능 목록이 아니라 CLAUDE.md, rules, skills, settings, hooks, MCP, subagent가 만드는 운영 구조로 이해하기 위한 첫 기준."
title: "Claude Code 실전 활용 01. Claude Code를 기능이 아니라 운영 구조로 이해하기"
lang: ko
translation_key: claude-code-as-operating-structure
date: 2026-05-06 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, claude-code, harness-engineering, claude-md, mcp, agents]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

Claude Code를 실무에 붙일 때 중요한 질문은 "어떤 명령어가 있는가"보다 "어떤 지시가 언제 로드되고, 어떤 작업은 권한으로 막히며, 어떤 검증을 통과해야 끝난 것으로 볼 것인가"에 가깝다. 기능을 많이 아는 것만으로는 저장소 작업의 품질이 안정되지 않는다.

이 글은 Claude Code를 기능 목록이 아니라 운영 구조로 이해하기 위한 첫 글이다. `CLAUDE.md`, `.claude/rules/`, skills, settings, permissions, hooks, MCP, subagent를 각각 따로 외우는 대신, 무엇을 항상 들고 시작하고 무엇을 필요할 때 불러오며 무엇을 강제 경계로 둘지 정리한다.

## 문서 정보

- 작성일: 2026-04-24
- 검증 기준일: 2026-04-24
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. Anthropic Claude Code 공식 문서를 바탕으로 한 운영 구조 분석.
- 테스트 버전: Claude Code 공식 문서 2026-04-24 확인본. 로컬 Claude Code CLI 버전은 확인하지 않음.

## 문제 정의

Claude Code 소개 글은 보통 설치, 명령어, 편의 기능, 모델 성능으로 시작하기 쉽다. 하지만 실제 저장소에서 문제가 되는 지점은 조금 다르다. 범위 없이 큰 작업을 맡기거나, `CLAUDE.md`에 모든 규칙을 쌓아 두거나, 외부 이슈와 로그를 대화창에 그대로 붙여 넣거나, "끝났습니다"라는 보고를 검증 완료로 착각할 때 실패 비용이 커진다.

이 글의 범위는 Claude Code 기능 전체 설명이 아니다. 2026-04-24 기준 공식 문서에서 확인 가능한 지시 로딩, 설정, 권한, 훅, MCP, subagent 구조를 바탕으로, Claude Code를 어떤 운영 계층 안에 두어야 하는지 정리한다.

## 확인된 사실

공식 문서 기준: Claude Code 확장 구조는 `CLAUDE.md`, skills, MCP, subagents, hooks, plugins 같은 계층으로 설명된다. 같은 문서는 `CLAUDE.md`를 매 대화에서 보는 persistent context, skills를 재사용 지식과 workflow, MCP를 외부 서비스와 도구 연결, subagents를 격리된 context에서 동작하는 작업 단위, hooks를 lifecycle event에서 실행되는 자동화로 구분한다. 근거: [Anthropic, Extend Claude Code](https://code.claude.com/docs/en/features-overview)

공식 문서 기준: Claude Code의 각 세션은 fresh context window로 시작하고, `CLAUDE.md`와 auto memory는 대화 시작 시 로드된다. 같은 문서는 둘을 enforced configuration이 아니라 context로 다루며, 지시가 구체적이고 간결할수록 더 일관되게 따르기 쉽다고 설명한다. 근거: [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)

공식 문서 기준: `CLAUDE.md`는 프로젝트, 사용자, 조직 범위에 둘 수 있는 persistent instruction 파일이다. 다단계 절차나 코드베이스 일부에만 필요한 규칙은 `CLAUDE.md`에 계속 쌓기보다 skill 또는 path-scoped rule로 옮기는 것이 권장된다. 근거: [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)

공식 문서 기준: Claude Code는 `AGENTS.md`가 아니라 `CLAUDE.md`를 읽는다. 이미 `AGENTS.md`를 쓰는 저장소에서는 `CLAUDE.md`에서 `@AGENTS.md`로 import하고, 그 아래에 Claude Code 전용 지시를 덧붙이는 구성이 가능하다. 근거: [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)

공식 문서 기준: `.claude/rules/`의 rules는 `paths`가 없으면 unconditional rule로 로드되고, `paths`가 있으면 Claude가 해당 패턴에 맞는 파일을 읽을 때 로드된다. user-level rules보다 project rules가 더 높은 우선순위를 가진다. 근거: [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)

공식 문서 기준: settings는 permissions, environment variables, tool behavior를 설정하는 JSON 계층이며, managed settings, command line arguments, local project settings, shared project settings, user settings 순서로 우선순위가 적용된다. 더 높은 수준의 configuration은 낮은 수준의 설정보다 우선한다. 근거: [Anthropic, Claude Code settings](https://code.claude.com/docs/en/settings)

공식 문서 기준: 민감 파일 접근을 막기 위해 `.claude/settings.json`의 `permissions.deny`를 사용할 수 있다. settings 문서는 memory files, settings files, skills, MCP servers를 서로 다른 configuration 요소로 구분하고, Claude Code의 internal system prompt는 공개되지 않았다고 명시한다. 근거: [Anthropic, Claude Code settings](https://code.claude.com/docs/en/settings)

공식 문서 기준: hooks는 session, turn, tool call 같은 lifecycle event에서 실행된다. 예를 들어 `PreToolUse`는 tool call 실행 전에 동작하고 차단할 수 있으며, `Stop`은 Claude가 응답을 마쳤을 때 실행된다. `InstructionsLoaded`는 `CLAUDE.md`나 `.claude/rules/*.md`가 context에 로드될 때 발생한다. 근거: [Anthropic, Hooks reference](https://code.claude.com/docs/en/hooks)

공식 문서 기준: MCP는 Claude Code가 외부 도구, 데이터 소스, API에 접근하도록 연결하는 방식이다. 문서는 이슈 트래커나 모니터링 대시보드의 데이터를 채팅에 복사해 넣는 대신, 연결된 시스템에서 Claude가 직접 읽고 동작할 수 있다고 설명한다. 근거: [Anthropic, Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)

공식 문서 기준: subagent는 특정 작업을 처리하는 specialized AI assistant이며, 자체 context window, custom system prompt, tool access, independent permissions를 가진다. 문서는 main conversation을 검색 결과, 로그, 파일 내용으로 채우지 않으려는 side task에 subagent를 쓰라고 설명한다. 근거: [Anthropic, Create custom subagents](https://code.claude.com/docs/en/sub-agents)

## 직접 재현한 결과

직접 재현 없음: 이 글은 로컬 환경에 Claude Code를 설치해 특정 저장소 작업을 반복 실행한 실험 글이 아니다. 또한 Claude Code의 작업 성공률, 성능, 모델 우열을 측정하지 않았다.

2026-04-24에 확인한 것은 공식 문서의 공개 구조다. 따라서 아래 해석은 "Claude Code가 항상 이렇게 행동한다"는 성능 주장이 아니라, 공식 문서가 설명하는 지시 로딩, 설정, 권한, 훅, 외부 연결 구조를 바탕으로 한 운영 설계 관점이다.

## 해석 / 의견

### 기능 목록보다 운영 계층이 먼저다

내 판단으로는 Claude Code를 처음 도입할 때 가장 먼저 그려야 하는 것은 명령어 목록이 아니라 운영 계층 지도다. 어떤 정보가 매 세션마다 올라오고, 어떤 정보는 특정 경로를 볼 때만 들어오며, 어떤 작업은 자연어 지시가 아니라 설정이나 훅으로 막아야 하는지를 먼저 나눠야 한다.

| 계층 | 운영상 역할 | 적합한 내용 | 피해야 할 사용 |
| --- | --- | --- | --- |
| `CLAUDE.md` | 항상 들고 시작하는 프로젝트 지시 | 빌드 명령, 핵심 아키텍처, 반복 실수 방지 규칙 | 긴 절차, 특정 모듈 전용 규칙, 참고자료 전문 |
| `.claude/rules/` | 경로나 파일 유형에 따라 로드되는 지시 | 프론트엔드 전용 규칙, 테스트 파일 규칙, 보안 민감 경로 규칙 | 모든 규칙을 unconditional rule로 쌓기 |
| skills | 필요할 때 불러오는 반복 절차와 지식 | 릴리스 절차, 리뷰 체크리스트, 장애 분석 playbook | 매 작업마다 항상 알아야 하는 짧은 규칙 |
| settings / permissions | 강제 경계와 실행 설정 | 민감 파일 deny, 도구 사용 경계, 조직 정책 | 행동 원칙을 전부 자연어로만 적어 두기 |
| hooks | 이벤트 기반 검증과 보호 장치 | 위험 명령 차단, 수정 후 lint 실행, 완료 전 보고 점검 | Claude가 기억해 주기를 바라는 규칙의 대체물 |
| MCP | 외부 시스템과 데이터 연결 | 이슈, 로그, DB, 문서, 모니터링 시스템 접근 | 원문을 대화창에 대량 붙여 넣기 |
| subagents | main context를 더럽히지 않는 side task | 대량 탐색, 독립 리뷰, 로그 조사, 반복 역할 | 모든 작업의 기본 실행 방식 |

의견: 이 표의 핵심은 기능을 많이 쓰자는 것이 아니다. 오히려 반대에 가깝다. `CLAUDE.md`에 있어야 할 것, skill로 내려야 할 것, settings로 강제해야 할 것, MCP로 연결해야 할 것을 나누면 대화창과 시작 문맥이 덜 비대해진다.

### 좋은 요청은 결과보다 경계를 먼저 정한다

Claude Code에게 "결제 API 에러 좀 고쳐줘"라고 요청하면 결과만 지정되고 작업 경계는 비어 있다. 작은 버그라면 충분할 수도 있지만, 운영 중인 저장소에서는 어디까지 읽고 수정해도 되는지, 언제 사람에게 묻고, 무엇을 검증해야 끝나는지가 더 중요하다.

더 안전한 요청은 아래처럼 생겼다.

```md
src/payment/**와 관련 테스트만 먼저 읽고 원인을 정리해 줘.
수정 후보 1~2개와 예상 영향 범위를 제안한 뒤, 수정은 내가 승인한 다음 진행해 줘.
끝나면 실행한 테스트, 실행하지 못한 검증, 남은 위험, 변경 파일을 분리해서 보고해 줘.
```

의견: 이 요청은 Claude Code를 느리게 만들기 위한 형식이 아니다. 목표, 범위, 승인 지점, 완료 보고 형식을 먼저 고정해서 실패 비용을 낮추는 방식이다. 하네스 엔지니어링 관점에서는 프롬프트 문장이 아니라 작업 경계와 검증 루프가 더 중요하다.

### `CLAUDE.md`는 만능 운영 문서가 아니다

공식 문서 기준으로도 `CLAUDE.md`는 hard enforcement가 아니라 context다. 그래서 `CLAUDE.md`가 길어진다고 안정성이 자동으로 올라간다고 보기 어렵다. 길고 충돌하는 문서는 오히려 어떤 규칙이 핵심인지 흐리게 만들 수 있다.

이미 `AGENTS.md`를 쓰는 저장소라면 같은 내용을 복사해 두는 대신, `CLAUDE.md`를 얇은 연결 계층으로 두는 편이 낫다.

```md
@AGENTS.md

## Claude Code

- 이 저장소에서는 글 작성 전 `_posts/AGENTS.md`를 먼저 확인한다.
- 큰 수정은 먼저 범위와 검증 방법을 제안한 뒤 진행한다.
- 완료 보고에는 실행한 검증과 실행하지 못한 검증을 분리한다.
```

의견: 같은 금지사항과 리뷰 규칙을 `AGENTS.md`, `CLAUDE.md`, 채팅 요청에 반복해서 쓰면 길이만 늘어나는 것이 아니라 source of truth도 흐려진다. 공통 규칙은 한 곳에 두고, Claude Code 전용 보충만 얇게 붙이는 편이 운영하기 쉽다.

### 긴 자료는 붙여 넣기보다 위치와 목적을 준다

Claude Code에 외부 이슈 400줄, 장애 로그 800줄, 회고 메모 전체를 한 번에 붙여 넣는 방식은 편해 보이지만, live context를 빠르게 오염시킬 수 있다. 특히 원문 대부분이 이번 판단에 직접 쓰이지 않는다면 더 그렇다.

더 나은 요청은 아래처럼 원문 대신 접근 지점과 질문을 분리한다.

```md
증상: 결제 승인 후 500 응답이 간헐적으로 발생한다.
재현 조건: staging, card-payment flow, 2026-04-24 14:00~15:00 KST 로그 구간.
관련 경로: src/payment/**, tests/payment/**.
외부 자료: Jira PAY-1234, monitoring dashboard의 payment-api error panel.

먼저 원인 후보를 2~3개로 좁히고, 필요한 로그만 읽어 근거를 붙여 줘.
```

의견: MCP를 이미 연결해 둔 환경이라면 Claude Code가 필요한 순간에 외부 시스템을 읽게 만들 수 있다. MCP가 없더라도 원문 전체를 붙여 넣기 전에 증상, 시간 범위, 관련 경로, 꼭 확인해야 할 자료 위치를 먼저 주는 편이 낫다.

### 완료 선언은 검증 보고가 되어야 한다

Claude Code가 "수정했습니다"라고 말하는 것과 실제로 검증이 끝난 것은 다르다. 사람은 작업을 맡기기 전에 완료 보고 형식을 정해 두어야 한다.

```md
완료 보고에는 아래 항목을 포함해 줘.

- 변경 요약
- 변경 파일
- 실행한 검증 명령과 결과
- 실행하지 못한 검증과 이유
- 남은 위험
- 사람이 리뷰해야 할 지점
```

의견: 위험 작업이라면 이 보고 형식을 자연어로만 기대하지 말고 settings, permissions, hooks로 보강하는 편이 낫다. 예를 들어 민감 파일 read/write는 `permissions.deny`로 막고, 특정 파일 수정 뒤 테스트를 실행해야 한다면 hook 후보로 검토할 수 있다. 자연어 지시는 행동을 유도하지만, 강제 경계는 설정과 자동화 쪽으로 내려야 한다.

### 흔한 실패 패턴

내가 Claude Code 운영에서 가장 먼저 경계할 패턴은 아래 다섯 가지다.

| 실패 패턴 | 왜 문제가 되는가 | 더 나은 방향 |
| --- | --- | --- |
| `CLAUDE.md`에 모든 규칙을 계속 추가한다 | 항상 로드되는 문맥이 비대해지고 핵심 규칙이 묻힌다 | 공통 핵심만 남기고 경로 규칙은 `.claude/rules/`, 절차는 skill로 분리한다 |
| 큰 작업을 한 번에 맡긴다 | 읽기 범위, 수정 범위, 승인 지점이 흐려진다 | 먼저 조사, 계획, 수정, 검증 단계를 나눈다 |
| `AGENTS.md` 내용을 그대로 복사한다 | 중복 지시가 생기고 어느 문서가 기준인지 불분명해진다 | `@AGENTS.md` import와 Claude 전용 보충으로 나눈다 |
| 외부 로그와 이슈 전문을 붙여 넣는다 | live context가 원문으로 채워지고 중요한 판단 정보가 묻힌다 | 증상, 범위, 자료 위치, 질문을 먼저 주고 필요할 때 읽게 한다 |
| "끝났다"는 말을 검증 완료로 본다 | 테스트 미실행, 위험, 미확인 항목이 보고에서 빠질 수 있다 | 완료 보고 형식과 검증 기준을 먼저 정한다 |

의견: 이 실패들은 Claude Code만의 문제가 아니다. agent형 코딩 도구를 운영할 때 반복되는 구조적 문제다. 다만 Claude Code에서는 `CLAUDE.md`, rules, skills, settings, hooks, MCP 같은 계층이 명확히 있으므로, 각 계층에 맞는 책임 분리를 더 일찍 설계할 수 있다.

결론은 단순하다. Claude Code의 좋은 결과는 도구 이름만으로 나오지 않는다. 사람이 목표와 경계를 정하고, 항상 필요한 문맥과 필요할 때 읽을 문맥을 나누고, 자연어 지시와 강제 설정을 구분하고, 검증 가능한 종료 조건을 만들 때 더 안정적인 작업 흐름이 된다.

이번 글이 Claude Code를 어떤 구조 안에서 운영해야 하는지의 큰 그림을 잡는 글이었다면, 다음 글에서는 그 구조의 첫 진입점인 `CLAUDE.md`를 어디까지 써야 하는지부터 좁혀 보려 한다.

## 한계와 예외

이 글은 2026-04-24 기준 Claude Code 공식 문서를 바탕으로 한 분석이다. Claude Code의 UI, 설정 키, 기본 동작, 권장 구조는 이후 바뀔 수 있으므로 실제 적용 전에는 발행 시점 또는 적용 시점의 공식 문서를 다시 확인해야 한다.

로컬 Claude Code CLI를 설치해 직접 실행한 결과는 포함하지 않았다. 따라서 특정 버전에서의 실제 화면, 권한 프롬프트, hook 실행 결과, MCP 연결 상태, subagent 동작 차이는 이 글의 검증 범위 밖이다.

작은 개인 프로젝트나 독립적인 코드 스니펫 작성에서는 이 글의 구조가 과하게 느껴질 수 있다. 반대로 팀 저장소, 민감 데이터가 있는 저장소, 배포와 리뷰가 연결된 저장소에서는 자연어 지시만으로 충분하지 않을 수 있다.

MCP, hooks, permissions는 편의 기능이면서 동시에 보안과 운영 위험을 만들 수 있다. 외부 시스템 권한, 민감 정보, destructive command, 자동 실행 스크립트는 팀의 보안 정책과 리뷰 절차에 맞춰 별도로 검토해야 한다.

## 참고자료

- Anthropic, [Extend Claude Code](https://code.claude.com/docs/en/features-overview)
- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- Anthropic, [Claude Code settings](https://code.claude.com/docs/en/settings)
- Anthropic, [Hooks reference](https://code.claude.com/docs/en/hooks)
- Anthropic, [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)
- Anthropic, [Create custom subagents](https://code.claude.com/docs/en/sub-agents)
