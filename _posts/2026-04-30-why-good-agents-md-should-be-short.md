---
layout: single
description: "좋은 AGENTS.md가 길어지면 왜 토큰 비용, 중복 지시, 책임 혼합이 커지는지 설명한 글."
title: "Codex 실전 활용 05. 좋은 AGENTS.md는 왜 짧아야 하는가"
lang: ko
translation_key: why-good-agents-md-should-be-short
date: 2026-04-30 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, agents-md, token-management, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

`AGENTS.md`는 짧을수록 좋다는 말은 단순한 미니멀리즘이 아니다. Codex가 매 작업 전에 읽는 지침이라면, 길고 반복적인 내용은 매번 컨텍스트 비용이 되고 중요한 규칙을 흐리게 만든다.

좋은 `AGENTS.md`는 프로젝트의 지속 규칙을 담고, 자세한 절차는 문서, config, skill, CI로 분리한다. 핵심은 정보를 줄이는 것이 아니라 책임을 나누는 것이다.

## 문서 정보

- 작성일: 2026-04-23
- 검증 기준일: 2026-04-23
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. OpenAI Codex 공식 문서를 바탕으로 한 운영 구조 분석.
- 테스트 버전: OpenAI Codex 문서 2026-04-23 확인본

## 문제 정의

처음에는 `AGENTS.md`가 길어지는 것이 안전해 보인다. 규칙을 더 많이 적으면 Codex가 더 잘 따를 것 같기 때문이다. 하지만 문서가 길어질수록 지속 규칙, 일회성 계획, 절차 설명, 도구 설정, 리뷰 체크리스트가 섞인다.

이 글은 `AGENTS.md`에 남길 것과 바깥으로 분리할 것을 판단하는 기준을 정리한다.

## 확인된 사실

공식 문서 기준: Codex는 작업 전에 `AGENTS.md`를 읽으며, 결합된 지침 크기가 `project_doc_max_bytes` 한도에 닿으면 더 이상 지침 파일을 추가하지 않는다. 기본 한도는 32 KiB다. 근거: [OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)

공식 문서 기준: Codex 설정 파일은 모델, approval policy, sandbox 설정, MCP 서버 같은 항목을 설정할 수 있다. 근거: [OpenAI, Config basics](https://developers.openai.com/codex/config-basic)

공식 문서 기준: Codex skill은 작업별 능력과 절차를 `SKILL.md`, scripts, references, assets로 묶어 재사용할 수 있는 구조다. 근거: [OpenAI, Agent Skills](https://developers.openai.com/codex/skills)

## 직접 재현한 결과

직접 재현 없음: 이 글은 같은 저장소에서 긴 `AGENTS.md`와 짧은 `AGENTS.md`의 결과 차이를 정량 측정하지 않았다. 공식 문서의 지침 로딩, config, skill 구조를 바탕으로 작성 책임 분리 기준을 제안한다.

## 해석 / 의견

내 판단으로는 `AGENTS.md`에 남길 내용은 아래 질문으로 고르면 된다.

- 모든 작업에서 거의 항상 유효한가?
- 저장소를 처음 읽을 때 방향을 바꾸는가?
- 수정하면 안 되는 경계나 반드시 확인할 검증인가?
- 다른 문서나 config로 옮기면 더 명확해지는가?

반대로 아래 내용은 분리 후보에 가깝다.

- 특정 기능 구현 계획
- 긴 튜토리얼과 배경 설명
- 자주 바뀌는 명령 옵션
- 릴리스, 리뷰, 번역처럼 반복되는 절차
- 도구 설치 방법 전체
- 과거 의사결정 기록 전문

분리 기준은 아래처럼 잡을 수 있다.

```md
- AGENTS.md: 항상 유효한 원칙과 경계
- docs/: 사람이 읽을 상세 설명과 배경
- .codex/config.toml: 실행 환경, 모델, sandbox, approval 기본값
- skills/: 반복 가능한 절차
- CI/scripts: 자동 검증과 강제 규칙
```

의견: `AGENTS.md`는 프로젝트의 목차와 안전선에 가까워야 한다. 모든 규칙을 다 담는 파일이 아니라, Codex가 올바른 다음 문서를 찾아가고 올바른 경계 안에서 작업하게 만드는 진입점이어야 한다.

## 한계와 예외

규제가 강한 조직이나 보안 민감 저장소에서는 루트 지침 파일에 반드시 명시해야 하는 규칙이 많을 수 있다. 이 경우에도 긴 문서를 피하는 것 자체보다, 필수 규칙과 상세 절차를 분리하는 것이 중요하다.

또한 지침을 지나치게 줄이면 Codex가 프로젝트 특성을 놓칠 수 있다. "짧게"의 기준은 절대 글자 수가 아니라, 매 작업에서 실제로 필요한 지속 규칙만 남겼는지 여부다.

## 참고자료

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Config basics](https://developers.openai.com/codex/config-basic)
- OpenAI, [Agent Skills](https://developers.openai.com/codex/skills)

