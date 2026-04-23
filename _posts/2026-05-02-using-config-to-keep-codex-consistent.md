---
layout: single
description: "Codex 반복 작업에서 모델, 권한, sandbox, MCP 같은 설정을 config로 고정해야 하는 이유를 정리한 글."
title: "Codex 실전 활용 07. config로 Codex 작업 일관성 확보하기"
lang: ko
translation_key: using-config-to-keep-codex-consistent
date: 2026-05-02 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, config, sandbox, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

반복되는 Codex 작업을 매번 자연어로 통제하려고 하면 설정 누락이 생기기 쉽다. 모델, sandbox, approval, MCP 같은 항목은 가능하면 config로 고정하는 편이 안정적이다.

자연어 지시는 "왜 그렇게 일해야 하는가"를 설명하고, config는 "실제로 어떤 기본값으로 실행할 것인가"를 정한다. 이 둘을 구분해야 Codex 작업의 편차가 줄어든다.

## 문서 정보

- 작성일: 2026-04-23
- 검증 기준일: 2026-04-23
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. OpenAI Codex 공식 문서를 바탕으로 한 설정 계층 분석.
- 테스트 버전: OpenAI Codex 문서 2026-04-23 확인본

## 문제 정의

`AGENTS.md`에 "신중하게 작업하라", "권한을 조심하라", "공식 문서를 확인하라"고 쓰는 것만으로는 실제 실행 환경이 고정되지 않는다. 권한, 모델, MCP 서버, sandbox 설정은 자연어보다 config로 관리하는 편이 명확하다.

이 글은 어떤 항목을 `AGENTS.md`에 두고, 어떤 항목을 config로 옮겨야 하는지 정리한다.

## 확인된 사실

공식 문서 기준: Codex는 사용자 수준 설정을 `~/.codex/config.toml`에서 읽고, 프로젝트나 하위 폴더에는 `.codex/config.toml`을 둘 수 있다. 프로젝트 설정은 신뢰된 프로젝트에서만 로드된다. 근거: [OpenAI, Config basics](https://developers.openai.com/codex/config-basic)

공식 문서 기준: Codex 설정 우선순위는 CLI flags와 `--config` override, profile, 프로젝트 config, 사용자 config, 시스템 config, built-in defaults 순서로 설명되어 있다. 근거: [OpenAI, Config basics](https://developers.openai.com/codex/config-basic)

공식 문서 기준: CLI와 IDE extension은 같은 configuration layer를 공유하며, 기본 모델과 provider, approval policy와 sandbox, MCP 서버를 설정할 수 있다. 근거: [OpenAI, Config basics](https://developers.openai.com/codex/config-basic)

공식 문서 기준: Codex model 문서는 2026-04-23 확인 시점에 대부분의 Codex 작업에서 `gpt-5.4`로 시작하라고 설명한다. 근거: [OpenAI, Codex Models](https://developers.openai.com/codex/models)

## 직접 재현한 결과

직접 재현 없음: 이 글은 실제 `.codex/config.toml` 파일을 여러 환경에 배포해 결과 차이를 측정하지 않았다. 공식 문서의 설정 계층과 우선순위를 바탕으로 운영 기준을 제안한다.

## 해석 / 의견

내 판단으로는 아래 항목은 config 후보로 보는 편이 좋다.

- 기본 모델과 reasoning 수준
- sandbox mode
- approval policy
- 네트워크 접근 기본값
- MCP 서버
- 프로젝트별 profile
- 반복적으로 쓰는 CLI override

반대로 아래 항목은 `AGENTS.md`에 남기는 편이 낫다.

- 저장소 목적
- 수정 경계
- 설계 원칙
- 리뷰 체크포인트
- 문서 작성 기준
- 사람이 읽어야 하는 운영 의도

구분 기준은 간단하다. 실행기가 실제로 강제하거나 기본값으로 적용해야 하는 것은 config에 둔다. 사람이 이해해야 하는 판단 기준은 `AGENTS.md`에 둔다.

예시:

```toml
model = "gpt-5.4"

[sandbox_workspace_write]
network_access = false
```

의견: config는 긴 지시문을 줄이는 도구이기도 하다. 매번 "네트워크를 켜지 말고, 승인 없이 위험한 명령을 실행하지 말고..."라고 설명하기보다, 가능한 기본값을 설정으로 고정하고 `AGENTS.md`에는 그 이유와 예외 기준만 남기는 편이 낫다.

## 한계와 예외

모든 설정을 저장소에 커밋할 수 있는 것은 아니다. 개인별 권한, 회사 정책, 로컬 경로, 비밀값은 사용자 설정이나 관리형 설정으로 분리해야 한다.

또한 모델 권장값은 시간이 지나며 바뀔 수 있다. 이 글의 모델 관련 언급은 2026-04-23 기준 공식 문서 확인 결과이며, 발행 이후에는 Codex Models 문서를 다시 확인해야 한다.

## 참고자료

- OpenAI, [Config basics](https://developers.openai.com/codex/config-basic)
- OpenAI, [Codex Models](https://developers.openai.com/codex/models)
- OpenAI, [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)

