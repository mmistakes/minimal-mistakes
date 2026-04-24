---
layout: single
description: "Claude Code에서 CLAUDE.md, .claude/rules, skills의 책임을 나누어 instruction loading을 관리하는 방법."
title: "Claude Code 실전 활용 04. rules와 skills로 지시를 언제 로드할지 나누기"
lang: ko
translation_key: split-instructions-with-rules-and-skills
date: 2026-05-09 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, claude-code, rules, skills, context, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

Claude Code에서 모든 지시를 `CLAUDE.md`에 넣으면 매 세션마다 필요하지 않은 내용까지 함께 로드된다. 반대로 지시를 너무 잘게 나누면 어디에 무엇이 있는지 추적하기 어려워진다.

이 글은 `CLAUDE.md`, `.claude/rules/`, skills를 "무엇을 언제 로드할 것인가"라는 기준으로 나눈다. 항상 필요한 기준은 `CLAUDE.md`, 경로별 기준은 rules, 반복 절차와 긴 참고자료는 skills가 더 적합하다.

## 문서 정보

- 작성일: 2026-04-24
- 검증 기준일: 2026-04-24
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. Anthropic Claude Code 공식 문서를 바탕으로 한 instruction loading 구조 정리.
- 테스트 버전: Claude Code 공식 문서 2026-04-24 확인본. 로컬 Claude Code CLI 버전은 확인하지 않음.

## 문제 정의

프로젝트가 커지면 지시도 커진다. API 규칙, 프론트엔드 스타일, 테스트 작성 기준, 배포 절차, 장애 분석 절차가 모두 필요하다. 하지만 이 모든 내용이 매 작업마다 필요한 것은 아니다.

이 글은 Claude Code에서 지시를 언제 로드해야 하는지에 따라 계층을 나누는 기준을 다룬다.

## 확인된 사실

공식 문서 기준: `.claude/rules/`는 여러 markdown 파일로 지시를 나눌 수 있는 디렉터리다. rules는 매 세션에 로드되거나, matching files가 열릴 때 로드될 수 있다. 근거: [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)

공식 문서 기준: `paths` frontmatter가 있는 rule은 Claude가 해당 패턴에 맞는 파일을 다룰 때 적용된다. `paths`가 없는 rule은 unconditional rule로 launch 시 로드된다. 근거: [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)

공식 문서 기준: skills는 `SKILL.md`를 가진 재사용 지식과 workflow이며, relevant할 때 Claude가 사용하거나 사용자가 `/skill-name`으로 직접 호출할 수 있다. skill 본문은 사용될 때 로드된다. 근거: [Anthropic, Extend Claude with skills](https://code.claude.com/docs/en/skills)

공식 문서 기준: Claude Code extension overview는 `CLAUDE.md`는 session start에 full content가 로드되고, skills는 descriptions가 시작 시 로드되고 full content는 사용 시 로드된다고 설명한다. 근거: [Anthropic, Extend Claude Code](https://code.claude.com/docs/en/features-overview)

공식 문서 기준: custom commands는 skills로 병합되었고, `.claude/commands/deploy.md`와 `.claude/skills/deploy/SKILL.md`는 모두 `/deploy`를 만들 수 있다. 근거: [Anthropic, Extend Claude with skills](https://code.claude.com/docs/en/skills)

## 직접 재현한 결과

직접 재현 없음: 이 글은 실제 `.claude/rules/`와 skill을 만든 뒤 Claude Code의 로딩 이벤트를 관찰한 결과가 아니다.

검증한 것은 2026-04-24 기준 공식 문서의 설명이다. 아래 판단표는 문서의 로딩 방식과 실무 운영 기준을 연결한 해석이다.

## 해석 / 의견

### 분리 판단표

| 질문 | 예 | 권장 위치 |
| --- | --- | --- |
| 매 세션마다 알아야 하는가 | 기본 test command, 저장소 목적 | `CLAUDE.md` |
| 특정 경로나 파일 유형에서만 필요한가 | `src/api/**/*.ts` input validation 규칙 | `.claude/rules/` with `paths` |
| 반복되는 multi-step 절차인가 | release checklist, incident analysis | skill |
| 사람이 직접 호출해야 안전한가 | 배포, destructive migration 점검 | user-invoked skill |
| 강제 차단이 필요한가 | `.env` 읽기 금지, 위험 명령 차단 | settings / hooks |

의견: "지시를 어디에 둘까"라는 질문은 결국 "언제 로드되어야 하는가"라는 질문이다. 매번 필요하지 않은 긴 지시는 on-demand 쪽으로 내려야 한다.

### rules 예시

API 파일에만 적용되는 규칙은 path-scoped rule로 둘 수 있다.

```md
---
paths:
  - "src/api/**/*.ts"
  - "tests/api/**/*.test.ts"
---

# API Rules

- Validate external input at the boundary.
- Keep error responses in the shared error shape.
- Add or update API tests when behavior changes.
```

의견: 이 규칙은 API 파일을 다룰 때는 유용하지만, 문서 수정이나 CSS 변경에는 필요하지 않다. 그래서 `CLAUDE.md`보다 path-scoped rule이 더 자연스럽다.

### skill 예시

반복되는 릴리스 점검은 skill로 분리하는 편이 낫다.

```md
---
name: release-checklist
description: Use when preparing a release note or release validation summary.
---

When preparing a release:

1. Read the pending changes.
2. Group changes by user-facing impact.
3. List required validation.
4. Separate verified items from unverified risks.
5. Produce a release note draft.
```

의견: 이 절차는 모든 작업에 필요하지 않다. 필요할 때만 `/release-checklist`로 호출할 수 있다면 시작 문맥을 덜 차지한다.

### rules와 skills의 경계

rules는 "이 파일을 다룰 때 지켜야 하는 기준"에 적합하다. skills는 "이 일을 처리하는 절차"에 적합하다.

예를 들어 테스트 파일 작성 규칙은 rule이 맞다. 반면 "릴리스 노트를 작성하고 검증 항목을 묶어라"는 작업 절차이므로 skill이 맞다.

의견: 둘을 섞으면 rules가 절차 문서처럼 길어지고, skills가 프로젝트 공통 규칙처럼 남용된다. 규칙은 짧게, 절차는 호출 가능하게 두는 편이 좋다.

## 한계와 예외

이 글은 2026-04-24 기준 공식 문서를 바탕으로 한다. Claude Code의 skills, commands, rules 로딩 방식은 이후 바뀔 수 있다.

직접 실행 테스트가 없으므로, 실제 skill 자동 선택 정확도나 path matching 결과는 검증하지 않았다.

작은 프로젝트에서는 rules와 skills를 과하게 나누는 것이 오히려 유지보수 비용이 될 수 있다. 분리는 반복과 길이가 실제 문제가 될 때 시작해도 된다.

## 참고자료

- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- Anthropic, [Extend Claude with skills](https://code.claude.com/docs/en/skills)
- Anthropic, [Extend Claude Code](https://code.claude.com/docs/en/features-overview)
