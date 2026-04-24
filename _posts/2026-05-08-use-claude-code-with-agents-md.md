---
layout: single
description: "AGENTS.md를 이미 쓰는 저장소에서 Claude Code의 CLAUDE.md를 중복 없이 연결하는 방법."
title: "Claude Code 실전 활용 03. AGENTS.md가 있는 저장소에서 Claude Code를 함께 쓰는 법"
lang: ko
translation_key: use-claude-code-with-agents-md
date: 2026-05-08 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, claude-code, agents-md, claude-md, codex, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

이미 `AGENTS.md`를 쓰는 저장소에서 Claude Code를 도입할 때 같은 규칙을 `CLAUDE.md`에 복사하면 지시가 중복된다. 중복은 길이 문제만 만들지 않는다. 어느 파일이 기준인지도 흐리게 만든다.

이 글은 `AGENTS.md`를 source of truth로 두고, `CLAUDE.md`는 import와 Claude Code 전용 보충 지시만 담는 방식을 제안한다.

## 문서 정보

- 작성일: 2026-04-24
- 검증 기준일: 2026-04-24
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. Anthropic Claude Code 공식 문서와 OpenAI Codex 공식 문서를 바탕으로 한 병행 운영 정리.
- 테스트 버전: Claude Code 공식 문서 2026-04-24 확인본, OpenAI Codex 공식 문서 2026-04-24 확인본. 로컬 CLI 버전은 확인하지 않음.

## 문제 정의

Codex, Claude Code, 다른 코딩 에이전트를 한 저장소에서 함께 쓰면 프로젝트 규칙 파일이 늘어난다. `AGENTS.md`에는 Codex용 규칙이 있고, Claude Code는 `CLAUDE.md`를 읽는다. 여기서 같은 내용을 양쪽에 복사하면 수정할 때마다 동기화 문제가 생긴다.

이 글의 목표는 두 도구를 비교해 우열을 가리는 것이 아니다. 이미 있는 `AGENTS.md`를 낭비하지 않고 Claude Code와 함께 쓰는 얇은 연결 구조를 만드는 것이다.

## 확인된 사실

공식 문서 기준: Claude Code는 `AGENTS.md`가 아니라 `CLAUDE.md`를 읽는다. Anthropic 문서는 `AGENTS.md`를 이미 쓰는 저장소에서는 `CLAUDE.md`에서 `@AGENTS.md`를 import하고 Claude Code 전용 지시를 아래에 추가할 수 있다고 설명한다. 근거: [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)

공식 문서 기준: Claude Code의 `@path` import는 launch 시 context에 확장되어 들어간다. 상대 경로는 import를 포함한 파일 기준으로 해석된다. 근거: [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)

공식 문서 기준: Codex는 작업 전에 `AGENTS.md`를 읽고, global guidance와 project-specific overrides를 결합해 instruction chain을 만든다. 근거: [OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)

공식 문서 기준: Codex는 프로젝트 루트에서 실행 작업 디렉터리까지 내려오며 지시 파일을 결합하고, 기본 `project_doc_max_bytes` 한도는 32 KiB다. 근거: [OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)

## 직접 재현한 결과

직접 재현 없음: 이 글은 같은 저장소에서 Codex와 Claude Code를 동시에 실행해 instruction chain을 비교한 실험 글이 아니다.

검증한 것은 2026-04-24 기준 두 제품의 공식 문서다. 아래 구조는 문서에서 확인된 로딩 방식과 중복 지시를 줄이기 위한 운영 판단을 연결한 것이다.

## 해석 / 의견

### 기본 구조

내 판단으로는 이미 `AGENTS.md`가 있는 저장소의 `CLAUDE.md`는 아래처럼 시작하는 편이 좋다.

```md
@AGENTS.md

## Claude Code

- 큰 변경은 먼저 계획과 검증 방법을 제안한다.
- 완료 보고에는 변경 파일, 실행한 검증, 실행하지 못한 검증, 남은 위험을 분리한다.
- Claude Code 전용 settings, hooks, skills는 `.claude/` 아래 문서를 기준으로 한다.
```

이 구조에서 `AGENTS.md`는 공통 프로젝트 규칙의 기준이고, `CLAUDE.md`는 Claude Code가 읽을 수 있게 연결하는 어댑터다.

### 무엇을 어디에 둘 것인가

| 내용 | 권장 위치 | 이유 |
| --- | --- | --- |
| 저장소 목적, 우선 확인 경로, 공통 리뷰 기준 | `AGENTS.md` | 여러 에이전트가 공유할 기준 |
| Claude Code가 `AGENTS.md`를 읽게 하는 연결 | `CLAUDE.md` | Claude Code는 `CLAUDE.md`를 읽기 때문 |
| Claude Code 전용 권한, hook, MCP 메모 | `CLAUDE.md` 또는 `.claude/` 문서 | 도구별 운영 차이를 분리하기 위함 |
| 경로별 세부 규칙 | 가까운 `AGENTS.md` 또는 `.claude/rules/` | 작업 위치에 따라 필요한 규칙을 좁히기 위함 |
| 반복 절차 | skill | 필요할 때만 로드하기 위함 |

의견: 핵심은 "공통 규칙은 한 곳, 도구별 보충은 얇게"다. 같은 금지사항을 여러 파일에 반복하면 나중에 하나만 수정되어 충돌할 가능성이 커진다.

### 이 블로그 저장소에 적용한다면

이 저장소는 이미 루트 `AGENTS.md`와 `_posts/AGENTS.md`로 포스트 작성 규칙을 나누고 있다. Claude Code를 병행한다면 `CLAUDE.md`는 아래처럼 얇게 두는 편이 자연스럽다.

```md
@AGENTS.md

## Claude Code

- `_posts/` 글 작성과 수정은 `_posts/AGENTS.md`와 `docs/blog-style.md`를 먼저 확인한다.
- 공식 문서로 확인한 사실, 직접 재현한 결과, 해석 / 의견을 섞지 않는다.
- 시간에 민감한 내용은 검증 기준일을 본문에 남긴다.
- 긴 계획은 `project-docs/plans/` 아래 문서를 기준으로 갱신한다.
```

의견: 이 예시는 `AGENTS.md` 내용을 복사하지 않는다. Claude Code에게 필요한 연결과 보충만 둔다.

### 중복을 줄이는 점검표

1. 같은 문장이 `AGENTS.md`와 `CLAUDE.md`에 반복되는가.
2. 반복된다면 한쪽은 import나 참조로 바꿀 수 있는가.
3. Claude Code 전용 내용인가, 모든 에이전트 공통 내용인가.
4. 긴 절차라면 skill로 분리할 수 있는가.
5. 금지해야 하는 행동이라면 자연어 지시보다 permissions나 hooks가 더 적절한가.

의견: `CLAUDE.md`는 `AGENTS.md`의 번역본이 아니라 연결 파일에 가깝게 두는 편이 유지보수에 좋다.

## 한계와 예외

이 글은 2026-04-24 기준 공식 문서에 근거한다. Codex와 Claude Code의 지시 파일 로딩 방식은 제품 업데이트에 따라 바뀔 수 있다.

`@AGENTS.md` import는 중복을 줄이지만, import된 파일도 Claude Code context에 들어간다. 긴 `AGENTS.md`를 import하면 문맥 비용도 함께 늘어난다.

팀이 `AGENTS.md`와 `CLAUDE.md`를 완전히 다른 역할로 운영하기로 합의한 경우에는 이 글의 구조가 맞지 않을 수 있다. 다만 그런 경우에도 source of truth가 어디인지 문서화해야 한다.

## 참고자료

- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
