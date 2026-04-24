---
layout: single
description: "Claude Code에서 긴 외부 자료를 붙여 넣는 대신 MCP로 필요한 문맥을 연결하는 운영 기준."
title: "Claude Code 실전 활용 07. MCP로 외부 문맥을 붙여 넣지 않고 연결하기"
lang: ko
translation_key: connect-external-context-with-mcp
date: 2026-05-12 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, claude-code, mcp, context, external-tools, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

Claude Code에 이슈, 로그, 데이터베이스 결과, 모니터링 화면 내용을 그대로 붙여 넣으면 대화 문맥이 빠르게 커진다. MCP는 이런 외부 문맥을 대화창에 복사하는 대신 연결된 도구에서 읽게 만드는 방법이다.

이 글은 MCP를 기능 목록이 아니라 문맥 관리와 출처 관리의 계층으로 다룬다. 연결할 가치가 있는 정보, 붙여 넣어도 되는 정보, 연결하면 위험한 정보를 나눠 본다.

## 문서 정보

- 작성일: 2026-04-24
- 검증 기준일: 2026-04-24
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. Anthropic Claude Code MCP 공식 문서를 바탕으로 한 운영 구조 정리.
- 테스트 버전: Claude Code 공식 문서 2026-04-24 확인본. 로컬 Claude Code CLI 및 MCP 서버 버전은 확인하지 않음.

## 문제 정의

외부 이슈와 로그를 대화창에 붙여 넣는 방식은 간단하다. 하지만 원문이 길수록 핵심 질문이 묻히고, 출처와 기준 시점도 흐려질 수 있다.

MCP를 연결하면 Claude Code가 외부 시스템을 도구처럼 읽고 동작할 수 있다. 이 글은 MCP를 언제 쓰고, 어떤 위험을 같이 봐야 하는지 정리한다.

## 확인된 사실

공식 문서 기준: Claude Code는 MCP를 통해 외부 도구와 데이터 소스에 연결할 수 있다. MCP servers는 Claude Code가 tools, databases, APIs에 접근하도록 한다. 근거: [Anthropic, Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)

공식 문서 기준: Anthropic 문서는 issue tracker나 monitoring dashboard에서 데이터를 복사해 넣는 상황이 생기면 MCP server 연결을 검토하라고 설명한다. 연결 후에는 Claude가 paste된 내용 대신 해당 시스템을 직접 읽고 동작할 수 있다. 근거: [Anthropic, Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)

공식 문서 기준: MCP 서버는 feature 구현, monitoring data 분석, database query, design integration, workflow automation 같은 작업에 쓰일 수 있다고 설명된다. 근거: [Anthropic, Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)

공식 문서 기준: Anthropic 문서는 third-party MCP server 사용 시 위험을 사용자 책임으로 두고, untrusted content를 가져오는 서버는 prompt injection risk를 만들 수 있다고 경고한다. 근거: [Anthropic, Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)

공식 문서 기준: extension overview는 MCP servers가 session start에 tool names를 로드하고, full schemas는 필요할 때 로드된다고 설명한다. 근거: [Anthropic, Extend Claude Code](https://code.claude.com/docs/en/features-overview)

## 직접 재현한 결과

직접 재현 없음: 이 글은 실제 GitHub, Jira, Sentry, database MCP server를 연결해 Claude Code에서 실행한 결과가 아니다.

검증한 것은 2026-04-24 기준 공식 문서의 MCP 구조다. 아래 판단은 MCP 연결을 운영 문맥에서 설계하기 위한 기준이다.

## 해석 / 의견

### 붙여 넣기와 MCP 연결의 차이

| 방식 | 장점 | 위험 |
| --- | --- | --- |
| 대화창 붙여 넣기 | 빠르고 설정이 필요 없다 | 문맥이 커지고 출처가 흐려진다 |
| 파일로 저장 후 참조 | 원문을 보존하고 필요한 부분만 읽을 수 있다 | 파일 관리가 필요하다 |
| MCP 연결 | 변경되는 외부 자료를 필요할 때 읽을 수 있다 | 권한, 보안, prompt injection 위험이 생긴다 |

의견: MCP는 모든 외부 자료를 연결하라는 뜻이 아니다. 반복적으로 읽고, 출처가 중요하며, 원문이 긴 시스템일수록 MCP 후보가 된다.

### MCP 도입 전 질문

1. 같은 외부 자료를 반복해서 붙여 넣고 있는가.
2. 자료가 자주 바뀌어 붙여 넣은 순간 stale해지는가.
3. Claude Code가 읽기만 하면 되는가, 외부 시스템에 쓰기 동작도 해야 하는가.
4. 해당 시스템에 민감 정보가 포함되는가.
5. MCP server를 신뢰할 수 있고, 권한 범위를 제한할 수 있는가.

의견: 읽기 전용으로 시작하는 편이 안전하다. 외부 시스템에 쓰는 권한은 검증 루프와 승인 경계가 잡힌 뒤 열어야 한다.

### 좋은 요청 형식

MCP가 있다고 해도 Claude에게 "이슈 알아서 보고 고쳐줘"라고 맡기면 범위가 흐려진다. 더 나은 요청은 아래처럼 목적과 접근 지점을 함께 준다.

```md
Jira PAY-1234와 최근 payment-api error dashboard를 확인해 줘.
목표는 원인 후보를 좁히는 것이다.

범위:
- src/payment/**
- tests/payment/**

보고:
- 확인한 외부 자료
- 원인 후보 2~3개
- 근거
- 추가로 읽어야 할 자료
```

의견: MCP는 문맥을 연결해 줄 뿐, 작업 목표와 완료 기준을 대신 정하지 않는다.

### 연결하면 안 되는 정보도 있다

secret, production customer data, 내부 보안 자료처럼 권한과 감사가 필요한 정보는 MCP 연결 전에 별도 정책이 필요하다.

의견: "Claude가 직접 읽을 수 있다"는 말은 "읽어도 된다"는 뜻이 아니다. 외부 연결은 편의 기능이 아니라 권한 설계다.

## 한계와 예외

이 글은 2026-04-24 기준 공식 문서를 바탕으로 한다. MCP transport, server scope, output limit, tool search 동작은 이후 바뀔 수 있다.

직접 MCP 서버를 연결하지 않았으므로, 실제 인증 흐름, token cost, tool schema 로딩, output warning은 검증하지 않았다.

보안 요구가 높은 조직에서는 MCP server 설치와 권한 부여가 별도 승인 대상일 수 있다. third-party server는 신뢰성과 prompt injection 위험을 독립적으로 평가해야 한다.

## 참고자료

- Anthropic, [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)
- Anthropic, [Extend Claude Code](https://code.claude.com/docs/en/features-overview)
- Anthropic, [Claude Code settings](https://code.claude.com/docs/en/settings)
