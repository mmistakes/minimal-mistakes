---
layout: single
description: "Codex 결과를 안정화하려면 좋은 요청뿐 아니라 프로젝트 규칙, 권한, 검증 구조가 필요한 이유를 설명한 글."
title: "Codex 실전 활용 02. 왜 Codex에는 하네스가 필요한가"
lang: ko
translation_key: why-codex-needs-a-harness
date: 2026-04-27 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, harness-engineering, agents-md, verification]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

Codex를 안정적으로 쓰려면 프롬프트를 잘 쓰는 것만으로는 부족하다. 프로젝트마다 규칙, 권한, 검증 방법, 반복 절차가 다르기 때문이다.

이 글에서 말하는 하네스는 Codex 주변에 두는 실행 구조다. `AGENTS.md`, config, sandbox와 approval, test와 review, skill 같은 요소를 묶어서 Codex가 매번 같은 기준으로 일하도록 돕는 구조를 뜻한다.

## 문서 정보

- 작성일: 2026-04-23
- 검증 기준일: 2026-04-23
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. OpenAI Codex 공식 문서를 바탕으로 한 구조 분석.
- 테스트 버전: OpenAI Codex 문서 2026-04-23 확인본

## 문제 정의

같은 요청을 해도 프로젝트 상태, 로드된 지침, 권한 설정, 검증 명령이 다르면 결과는 달라질 수 있다. 그래서 "Codex에게 더 자세히 말하면 된다"는 접근만으로는 반복 가능성을 충분히 확보하기 어렵다.

이 글은 Codex에 필요한 하네스의 범위를 자연어 지시, 실행 설정, 검증 절차, 재사용 절차로 나눠 정리한다.

## 확인된 사실

공식 문서 기준: Codex는 작업 전에 `AGENTS.md` 파일을 읽고, 전역 지침과 프로젝트별 지침을 결합해 사용한다. 근거: [OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)

공식 문서 기준: Codex 설정은 `~/.codex/config.toml`과 저장소 안의 `.codex/config.toml` 등 여러 계층에서 읽히며, 모델, approval, sandbox, MCP 서버 같은 항목을 설정할 수 있다. 근거: [OpenAI, Config basics](https://developers.openai.com/codex/config-basic)

공식 문서 기준: Codex 보안 문서는 sandbox mode와 approval policy를 별도 계층으로 설명하고, 기본적으로 네트워크 접근을 끄는 방향을 설명한다. 근거: [OpenAI, Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)

공식 문서 기준: Codex best practices 문서는 Codex에게 테스트 작성, 관련 검증 실행, 결과 확인, diff review까지 요청하라고 권장한다. 근거: [OpenAI, Codex best practices](https://developers.openai.com/codex/learn/best-practices)

## 직접 재현한 결과

직접 재현 없음: 이 글은 하네스가 있는 프로젝트와 없는 프로젝트의 성공률을 비교한 실험 결과가 아니다. 공개 문서에서 확인 가능한 Codex 구성 요소를 기준으로, 실무 운영 구조를 해석한 글이다.

## 해석 / 의견

내 판단으로는 Codex 하네스는 적어도 네 층으로 나눠야 한다.

- 지침 층: `AGENTS.md`처럼 프로젝트의 지속 규칙과 우선순위를 설명한다.
- 실행 층: config, sandbox, approval, 네트워크 접근처럼 실제 실행 권한을 제어한다.
- 검증 층: 테스트, lint, type check, build, diff review를 완료 기준으로 둔다.
- 재사용 층: 반복 작업을 skill이나 스크립트로 만들어 매번 같은 절차를 쓰게 한다.

중요한 점은 이 네 층을 한 문서에 모두 넣지 않는 것이다. `AGENTS.md`에 "테스트를 실행하라"고 적는 것은 필요하지만, 어떤 테스트 명령을 기본값으로 둘지, 네트워크를 허용할지, 반복되는 릴리스 절차를 어떻게 재사용할지는 config, CI, skill로 내려보내는 편이 더 안정적이다.

예를 들어 좋은 하네스는 아래처럼 책임을 나눈다.

```md
- AGENTS.md: 저장소 목적, 수정 경계, 리뷰 기준
- .codex/config.toml: 기본 모델, sandbox, approval, MCP 설정
- package.json / Makefile: 검증 명령
- skills/: 반복 가능한 작성, 리뷰, 릴리스 절차
- CI: 사람이 놓칠 수 있는 검증의 최종 차단선
```

의견: 하네스는 Codex를 믿지 못해서 만드는 안전장치가 아니다. 사람이 매번 같은 운영 지식을 다시 설명하지 않아도 되도록 프로젝트 쪽에 기준을 남기는 방법이다.

## 한계와 예외

모든 프로젝트가 같은 수준의 하네스를 필요로 하지는 않는다. 개인 실험 저장소나 일회성 스크립트에서는 간단한 요청과 수동 리뷰로 충분할 수 있다. 반대로 운영 서비스, 보안 민감 코드, 팀 단위 협업 저장소에서는 권한과 검증을 더 강하게 나눠야 한다.

또한 Codex의 설정 항목과 기본 동작은 제품 업데이트에 따라 바뀔 수 있다. 이 글은 2026-04-23 기준 공식 문서 확인 범위에서만 사실을 다룬다.

## 참고자료

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Config basics](https://developers.openai.com/codex/config-basic)
- OpenAI, [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)
- OpenAI, [Codex best practices](https://developers.openai.com/codex/learn/best-practices)

