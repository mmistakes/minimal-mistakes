---
layout: single
description: "Codex용 AGENTS.md에 저장소 목적, 우선 확인 경로, 작업 원칙, 검증 기준을 어떻게 담을지 설명한 글."
title: "Codex 실전 활용 04. Codex용 AGENTS.md 작성법"
lang: ko
translation_key: how-to-write-agents-md-for-codex
date: 2026-04-29 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, agents-md, project-instructions, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

`AGENTS.md`는 매 작업 요청을 대신하는 파일이 아니다. 저장소를 열 때 Codex가 먼저 알아야 하는 운영 기준의 진입점이다.

좋은 `AGENTS.md`는 저장소 목적, 우선 확인 경로, 수정 경계, 검증 기준, 리뷰 체크포인트를 짧게 담는다. 반대로 긴 튜토리얼, 변경 이력, 일회성 작업 계획을 모두 넣으면 오히려 지침의 선명도가 떨어진다.

## 문서 정보

- 작성일: 2026-04-23
- 검증 기준일: 2026-04-23
- 문서 성격: tutorial
- 테스트 환경: 실행 테스트 없음. OpenAI Codex 공식 문서를 바탕으로 한 문서 작성 절차.
- 테스트 버전: OpenAI Codex 문서 2026-04-23 확인본

## 문제 정의

프로젝트 지침 파일을 만들 때 흔한 문제는 모든 규칙을 한 파일에 넣는 것이다. 하지만 Codex가 매번 읽어야 하는 문서라면, 지속적으로 유효한 기준과 일회성 설명을 분리해야 한다.

이 글은 Codex용 `AGENTS.md`의 역할과 최소 구성을 정리한다.

## 확인된 사실

공식 문서 기준: Codex는 작업 전에 `AGENTS.md` 파일을 읽고, 전역 지침과 프로젝트 지침을 계층적으로 결합한다. 근거: [OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)

공식 문서 기준: Codex는 프로젝트 루트에서 현재 작업 디렉터리까지 내려오며 각 디렉터리의 지침 파일을 확인하고, 가까운 디렉터리의 지침이 나중에 결합되어 앞선 지침을 덮어쓸 수 있다. 근거: [OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)

공식 문서 기준: Codex는 결합된 프로젝트 지침 크기가 `project_doc_max_bytes` 한도에 도달하면 더 이상 파일을 추가하지 않으며, 기본값은 32 KiB다. 근거: [OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)

## 직접 재현한 결과

직접 재현 없음: 이 글은 특정 Codex 실행에서 지침 로딩 순서를 직접 출력해 검증한 실험 글이 아니다. 2026-04-23 기준 공식 문서의 discovery 규칙을 바탕으로 작성 기준을 정리했다.

## 해석 / 의견

### 튜토리얼 적용 기준

- 선행 조건: 저장소 목적, 중요한 디렉터리, 수정 금지 영역, 기본 검증 명령을 사람이 대략 알고 있어야 한다.
- 재현 순서: 루트에 `AGENTS.md`를 만들고 아래 골격을 채운 뒤, 하위 디렉터리별 예외가 있으면 더 가까운 위치의 지침 파일로 분리한다.
- 성공 조건: Codex가 저장소를 열었을 때 먼저 볼 경로, 지켜야 할 경계, 완료 전 검증 기준을 빠르게 파악할 수 있다.
- 실패 가능 조건: 일회성 작업 계획, 긴 배경 설명, 오래된 명령을 함께 넣으면 지침이 길어지고 실제 작업 기준이 흐려진다.

내 판단으로는 저장소 루트 `AGENTS.md`는 아래 정도를 기본 골격으로 삼는 것이 좋다.

```md
# AGENTS.md

## Repository purpose

- 이 저장소가 무엇을 위한 저장소인지 적는다.

## First places to inspect

- 작업 전에 우선 확인할 디렉터리와 파일을 적는다.

## Working rules

- 수정 경계, 금지 사항, 선호하는 구현 방식을 적는다.

## Verification

- 변경 종류별로 실행해야 할 검증을 적는다.

## Review checklist

- 완료 전 스스로 확인해야 할 위험과 회귀 가능성을 적는다.
```

더 가까운 하위 디렉터리에 별도 규칙이 필요한 경우에는 그 디렉터리에 별도 `AGENTS.md` 또는 override 파일을 둔다. 예를 들어 프런트엔드와 백엔드가 전혀 다른 검증 명령을 쓴다면 루트 문서에 모든 세부 명령을 몰아넣기보다 하위 규칙으로 분리하는 편이 낫다.

의견: `AGENTS.md`의 목적은 Codex에게 많은 정보를 주는 것이 아니라, 첫 판단을 틀리지 않게 만드는 것이다. "무엇을 먼저 읽어야 하는가", "무엇을 바꾸면 안 되는가", "어떤 검증 없이 끝내면 안 되는가"가 가장 중요하다.

## 한계와 예외

작은 저장소에서는 루트 `AGENTS.md` 하나로 충분할 수 있다. 반대로 모노레포나 여러 팀이 함께 쓰는 저장소에서는 디렉터리별 지침이 필요할 수 있다.

또한 지침 파일이 너무 짧으면 중요한 제약이 빠질 수 있다. 짧게 쓰라는 말은 중요한 기준을 생략하라는 뜻이 아니라, 반복적으로 유효한 기준만 남기라는 뜻이다.

## 참고자료

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
