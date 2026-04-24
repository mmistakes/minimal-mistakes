---
layout: single
description: "Claude Code의 CLAUDE.md에 무엇을 넣고 무엇을 rules, skills, settings로 내려야 하는지 정리한 글."
title: "Claude Code 실전 활용 02. CLAUDE.md는 어디까지 써야 하는가"
lang: ko
translation_key: how-far-should-claude-md-go
date: 2026-05-07 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, claude-code, claude-md, instructions, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

`CLAUDE.md`는 Claude Code가 매 세션마다 들고 시작하는 프로젝트 지시 파일이다. 그래서 여기에 넣을 내용은 "가끔 필요한 절차"가 아니라 "매번 알아야 하는 짧고 검증 가능한 기준"이어야 한다.

이 글의 결론은 단순하다. `CLAUDE.md`는 운영 문서 전체가 아니라 진입점이다. 긴 절차는 skills로, 경로별 규칙은 `.claude/rules/`로, 강제 경계는 settings와 permissions로 내려야 문맥을 덜 낭비한다.

## 문서 정보

- 작성일: 2026-04-24
- 검증 기준일: 2026-04-24
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. Anthropic Claude Code 공식 문서를 바탕으로 한 구조 정리.
- 테스트 버전: Claude Code 공식 문서 2026-04-24 확인본. 로컬 Claude Code CLI 버전은 확인하지 않음.

## 문제 정의

Claude Code를 쓰기 시작하면 `CLAUDE.md`에 규칙을 계속 추가하고 싶어진다. 빌드 명령, 테스트 명령, 코드 스타일, 배포 절차, 리뷰 체크리스트, 팀 운영 원칙이 한 파일에 쌓인다.

문제는 `CLAUDE.md`가 길어질수록 중요한 규칙도 덜 선명해질 수 있다는 점이다. 이 글은 `CLAUDE.md`에 남길 내용과 다른 계층으로 내릴 내용을 나누는 기준을 제시한다.

## 확인된 사실

공식 문서 기준: Claude Code 세션은 fresh context window로 시작하고, `CLAUDE.md` 파일과 auto memory는 대화 시작 시 로드된다. 문서는 이 둘이 enforced configuration이 아니라 context라고 설명한다. 근거: [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)

공식 문서 기준: `CLAUDE.md`는 프로젝트, 사용자, 조직, 로컬 범위에 둘 수 있다. 프로젝트 지시는 `./CLAUDE.md` 또는 `./.claude/CLAUDE.md`에 둘 수 있고, 개인 로컬 지시는 `CLAUDE.local.md`에 둘 수 있다. 근거: [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)

공식 문서 기준: `CLAUDE.md`는 세션 시작 시 context window에 들어가며, 문서는 파일당 200줄 이하를 목표로 하라고 권장한다. 긴 절차나 코드베이스 일부에만 필요한 규칙은 path-scoped rule이나 skill로 옮기는 것이 권장된다. 근거: [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)

공식 문서 기준: `CLAUDE.md`는 `@path/to/import` 문법으로 다른 파일을 import할 수 있다. import된 파일도 launch 시 context에 확장되어 들어가며, recursive import는 최대 5단계까지 허용된다. 근거: [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)

공식 문서 기준: settings 문서는 `CLAUDE.md` 같은 memory files와 JSON settings files를 구분한다. settings files는 permissions, environment variables, tool behavior를 설정한다. 근거: [Anthropic, Claude Code settings](https://code.claude.com/docs/en/settings)

## 직접 재현한 결과

직접 재현 없음: 이 글은 실제 저장소에서 `CLAUDE.md` 길이를 바꿔가며 Claude Code의 작업 품질을 측정한 실험 글이 아니다.

검증한 것은 2026-04-24 기준 공식 문서의 구조다. 아래 기준은 공식 문서가 설명한 로딩 방식과 이 블로그의 하네스 엔지니어링 관점을 연결한 운영 판단이다.

## 해석 / 의견

### 넣을 것과 빼야 할 것

내 판단으로는 `CLAUDE.md`에는 아래 네 가지 정도만 남기는 편이 안정적이다.

| 분류 | `CLAUDE.md`에 적합한 내용 | 다른 계층으로 내릴 내용 |
| --- | --- | --- |
| 프로젝트 정체성 | 저장소 목적, 주요 경로, 기술 스택 | 긴 아키텍처 설명 전문 |
| 기본 명령 | 자주 쓰는 build, test, lint 명령 | 상황별 디버깅 절차 |
| 반복 규칙 | 매번 지켜야 하는 코드 스타일, 리뷰 기준 | 특정 디렉터리 전용 규칙 |
| 완료 기준 | 검증 보고 형식, 미실행 검증 표시 | 자동 실행해야 하는 검사 |

의견: `CLAUDE.md`는 "Claude가 항상 알아야 하는 사실"에 가깝고, skill은 "필요할 때 실행할 절차"에 가깝다. 같은 내용을 넣더라도 위치가 바뀌면 문맥 비용과 유지보수 방식이 달라진다.

### 최소 템플릿

작은 프로젝트라면 아래 정도에서 시작해도 충분하다.

```md
# CLAUDE.md

## Project

- This repository is ...
- Main application code lives in ...
- Tests live in ...

## Commands

- Install: ...
- Test: ...
- Lint: ...

## Working Rules

- Keep changes scoped to the requested task.
- Do not edit generated files unless explicitly requested.
- Report tests run and tests not run separately.

## References

- Detailed release workflow: use `/release-checklist`.
- Path-specific frontend rules live in `.claude/rules/frontend.md`.
```

의견: 중요한 것은 템플릿 자체가 아니라 길이와 책임이다. `CLAUDE.md`가 커지면 먼저 "이 문장이 매 세션마다 필요한가"를 물어야 한다.

### import는 복사가 아니라 비용 이전이다

`@docs/guide.md`처럼 import를 쓰면 문서를 복사하지 않아도 되어 유지보수는 편해진다. 하지만 공식 문서 기준으로 import된 파일도 launch 시 context에 들어간다. 그래서 import는 공짜 압축이 아니다.

의견: import는 source of truth를 한 곳에 두는 데 좋다. 반면 긴 reference를 문맥에서 숨기기 위한 도구로 보면 안 된다. 긴 문서를 필요할 때만 읽게 하려면 skill, MCP, 파일 참조 같은 다른 방법을 검토하는 편이 낫다.

### `CLAUDE.local.md`는 개인 설정에만 쓴다

`CLAUDE.local.md`는 로컬 개인 지시를 담을 수 있지만, 팀 전체 기준을 여기에 두면 다른 사람에게 재현되지 않는다.

의견: `CLAUDE.local.md`에는 개인 sandbox URL, 선호 test data, 로컬 도구 경로처럼 공유하면 안 되거나 공유할 필요가 없는 내용만 두는 편이 낫다. 팀 규칙은 version control에 올라가는 `CLAUDE.md`나 `.claude/rules/`로 옮겨야 한다.

### 줄일 때의 기준

`CLAUDE.md`가 길어졌다면 아래 순서로 줄인다.

1. 특정 경로나 파일 유형에만 적용되는 내용은 `.claude/rules/`로 옮긴다.
2. 여러 단계 절차는 skill로 옮긴다.
3. 금지해야 하는 파일 접근이나 명령은 settings와 permissions로 옮긴다.
4. 사람을 위한 배경 설명은 `docs/`로 옮기고, `CLAUDE.md`에는 위치만 남긴다.

의견: 좋은 `CLAUDE.md`는 친절한 매뉴얼이 아니라 작은 운영 지도다. Claude Code가 어디를 봐야 하는지 알려 주되, 모든 내용을 매번 들고 시작하게 만들 필요는 없다.

## 한계와 예외

이 글은 2026-04-24 기준 공식 문서를 바탕으로 한 운영 기준이다. Claude Code의 파일 로딩 방식, 권장 줄 수, settings 키는 이후 바뀔 수 있다.

직접 실행 테스트를 하지 않았으므로, 특정 버전의 CLI 화면이나 `/init`, `/memory`, import approval 동작은 검증 범위 밖이다.

작은 개인 프로젝트에서는 `CLAUDE.md` 하나에 조금 더 많은 내용을 넣어도 운영 비용이 크지 않을 수 있다. 반대로 모노레포나 팀 저장소에서는 계층 분리가 더 일찍 필요해질 수 있다.

## 참고자료

- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- Anthropic, [Claude Code settings](https://code.claude.com/docs/en/settings)
- Anthropic, [Extend Claude Code](https://code.claude.com/docs/en/features-overview)
