---
layout: single
description: "Codex를 실제 프로젝트에 적용할 때 작업 요청, AGENTS.md, config, skill, subagent 기준을 하나로 묶은 운영 템플릿."
title: "Codex 실전 활용 10. Codex 프로젝트 적용용 운영 템플릿"
lang: ko
translation_key: codex-project-operations-template
date: 2026-05-05 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, operations-template, agents-md, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

Codex를 프로젝트에 붙이는 일은 프롬프트 하나를 잘 쓰는 일이 아니다. 작업 요청, `AGENTS.md`, config, skill, subagent, 검증 루프를 함께 정해야 한다.

이 글은 앞선 9편을 실제 프로젝트에 적용하기 위한 최소 운영 템플릿으로 묶는다. 목적은 거대한 규칙집을 만드는 것이 아니라, Codex가 저장소를 읽고 수정하고 검증할 때 흔들리지 않는 기본 구조를 만드는 것이다.

## 문서 정보

- 작성일: 2026-04-23
- 검증 기준일: 2026-04-23
- 문서 성격: tutorial
- 테스트 환경: 실행 테스트 없음. OpenAI Codex 공식 문서와 앞선 연재의 운영 기준을 바탕으로 한 템플릿 정리.
- 테스트 버전: OpenAI Codex 문서 2026-04-23 확인본

## 문제 정의

Codex를 도입할 때 각 요소를 따로 보면 어렵지 않다. `AGENTS.md`를 만들고, config를 설정하고, 필요한 skill을 만들고, 경우에 따라 subagent를 쓴다. 문제는 이 요소들이 서로 겹치기 시작할 때다.

이 글은 각 요소의 책임을 나누고, 프로젝트에 바로 적용할 수 있는 최소 템플릿을 제시한다.

## 확인된 사실

공식 문서 기준: Codex best practices는 작업 맥락, `AGENTS.md`, configuration, MCP, skills, automation, validation과 review를 함께 다룬다. 근거: [OpenAI, Codex best practices](https://developers.openai.com/codex/learn/best-practices)

공식 문서 기준: `AGENTS.md`는 Codex가 작업 전에 읽는 프로젝트 지침 계층이다. 근거: [OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)

공식 문서 기준: Codex config는 모델, approval, sandbox, MCP 서버 같은 실행 설정을 담을 수 있다. 근거: [OpenAI, Config basics](https://developers.openai.com/codex/config-basic)

공식 문서 기준: skill은 반복 작업 절차와 참고자료, 선택적 스크립트를 패키징하는 구조이고, subagent는 명시적으로 요청할 때 병렬 작업 흐름을 만들 수 있는 기능이다. 근거: [OpenAI, Agent Skills](https://developers.openai.com/codex/skills), [OpenAI, Subagents](https://developers.openai.com/codex/subagents)

## 직접 재현한 결과

직접 재현 없음: 이 글은 하나의 실제 제품 저장소에 템플릿을 적용해 전후 품질을 측정한 결과가 아니다. 공식 문서와 앞선 글의 판단 기준을 바탕으로 한 적용용 템플릿이다.

## 해석 / 의견

### 튜토리얼 적용 기준

- 선행 조건: 팀이나 저장소에서 반복되는 작업 유형, 기본 검증 명령, 권한 경계, 리뷰 기준을 정할 수 있어야 한다.
- 재현 순서: 첫 작업 요청 템플릿, `AGENTS.md` 최소안, config 후보, skill 후보, subagent 기준, 완료 보고 기준을 차례로 채우고 중복되는 책임을 제거한다.
- 성공 조건: 같은 운영 판단을 매번 프롬프트에 다시 쓰지 않아도 되고, 각 기준이 어느 위치에 있어야 하는지 분리된다.
- 실패 가능 조건: 팀의 CI, 보안 정책, 배포 방식에 맞추지 않고 그대로 복사하면 실제 작업 기준과 템플릿이 어긋날 수 있다.

내 판단으로는 Codex 프로젝트 운영 템플릿은 아래 순서로 잡으면 된다.

### 1. 첫 작업 요청 템플릿

```md
## Goal

## Context

## Scope

## Constraints

## Verification

## Report
```

### 2. AGENTS.md 최소안

```md
# AGENTS.md

## Repository purpose

## First places to inspect

## Working rules

## Verification

## Review checklist
```

### 3. Config 후보

```md
- 기본 모델
- sandbox mode
- approval policy
- 네트워크 접근
- MCP 서버
- project profile
```

### 4. Skill 후보

```md
- 반복되는 글 작성 절차
- 반복되는 리뷰 절차
- 릴리스 노트 작성
- 마이그레이션 점검
- 장애 분석 보고
```

### 5. Subagent 사용 기준

```md
- 독립적인 탐색 질문인가?
- 파일 소유권을 나눌 수 있는가?
- 병렬화가 실제 시간을 줄이는가?
- 통합 기준이 명확한가?
- 토큰 비용을 감수할 이유가 있는가?
```

### 6. 완료 보고 기준

```md
- 변경 요약
- 변경 파일
- 실행한 검증
- 실행하지 못한 검증과 이유
- 남은 위험
- 후속 작업
```

의견: 이 템플릿은 Codex를 통제하기 위한 문서가 아니라, 사람이 매번 같은 운영 판단을 반복하지 않도록 만드는 기본 구조다. 프로젝트가 커질수록 자연어 지시보다 책임 분리가 중요해진다.

## 한계와 예외

이 템플릿은 출발점일 뿐이다. 팀의 보안 정책, CI 구조, 배포 방식, 코드 리뷰 문화에 따라 항목은 바뀌어야 한다.

또한 Codex의 제품 기능과 권장 모델, 설정 방식은 바뀔 수 있다. 실제 적용 전에는 2026-04-23 이후의 공식 문서를 다시 확인해야 한다.

## 참고자료

- OpenAI, [Codex best practices](https://developers.openai.com/codex/learn/best-practices)
- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Config basics](https://developers.openai.com/codex/config-basic)
- OpenAI, [Agent Skills](https://developers.openai.com/codex/skills)
- OpenAI, [Subagents](https://developers.openai.com/codex/subagents)
