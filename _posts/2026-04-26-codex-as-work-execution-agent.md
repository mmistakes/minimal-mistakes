---
layout: single
description: "Codex를 단순 코드 생성기가 아니라 저장소 작업을 수행하는 에이전트로 다뤄야 하는 이유를 정리한 글."
title: "Codex 실전 활용 01. Codex를 코드 생성기가 아니라 작업 수행 에이전트로 보기"
lang: ko
translation_key: codex-as-work-execution-agent
date: 2026-04-26 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, agent, harness-engineering, software-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

Codex를 실무에 붙일 때 첫 번째로 바꿔야 할 관점은 "코드를 써 주는 도구"에서 "저장소 안에서 작업을 수행하는 에이전트"로 보는 것이다. 코드 조각을 얻는 일과, 저장소를 읽고 수정하고 검증한 뒤 리뷰 가능한 변경으로 남기는 일은 다르다.

이 글의 결론은 단순하다. Codex에게 좋은 답변을 기대하기보다, 사람이 목표, 범위, 금지 사항, 완료 기준을 먼저 정하고 Codex가 그 안에서 작업을 수행하게 해야 한다. 그래야 결과물이 대화 속 문장으로 끝나지 않고 실제 프로젝트 변경으로 이어진다.

## 문서 정보

- 작성일: 2026-04-23
- 검증 기준일: 2026-04-23
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. OpenAI Codex 공식 문서를 바탕으로 한 운영 관점 정리.
- 테스트 버전: OpenAI Codex 문서 2026-04-23 확인본

## 문제 정의

AI 도구를 처음 프로젝트에 붙일 때 흔한 실수는 "이 함수 만들어 줘", "이 버그 고쳐 줘"처럼 결과 문장만 요청하는 것이다. 작은 예제에서는 충분할 수 있지만, 실제 저장소에서는 어디를 읽어야 하는지, 무엇을 바꾸면 안 되는지, 어떤 검증을 통과해야 하는지가 더 중요하다.

이 글은 Codex를 코드 생성기로 볼 때 빠지는 부분과, 작업 수행 에이전트로 볼 때 사람이 미리 정해야 하는 경계를 구분한다.

## 확인된 사실

공식 문서 기준: OpenAI의 Code generation 문서는 Codex를 소프트웨어 개발을 위한 coding agent로 설명하며, 코드 작성, 리뷰, 디버깅을 돕고 IDE, CLI, 웹, 모바일, SDK 기반 CI/CD 흐름에서 사용할 수 있다고 설명한다. 근거: [OpenAI, Code generation](https://developers.openai.com/api/docs/guides/code-generation)

공식 문서 기준: Codex CLI 문서는 CLI가 터미널에서 로컬로 실행되며, 선택한 디렉터리 안의 코드를 읽고 변경하고 실행할 수 있다고 설명한다. 근거: [OpenAI, Codex CLI](https://developers.openai.com/codex/cli)

공식 문서 기준: Codex web 문서는 Codex cloud가 별도 클라우드 환경에서 백그라운드 작업을 수행할 수 있고, 여러 작업을 병렬로 처리할 수 있다고 설명한다. 근거: [OpenAI, Codex web](https://developers.openai.com/codex/cloud)

공식 문서 기준: Codex best practices 문서는 좋은 첫 요청에 `Goal`, `Context`, `Constraints`, `Done when`을 포함하는 방식을 권장한다. 근거: [OpenAI, Codex best practices](https://developers.openai.com/codex/learn/best-practices)

## 직접 재현한 결과

직접 재현 없음: 이 글은 특정 저장소에서 Codex 작업 성공률을 반복 측정한 실험 글이 아니다. 2026-04-23 기준 공개 공식 문서에 드러난 기능 범위와, 이 블로그의 하네스 엔지니어링 관점을 연결한 분석 글이다.

따라서 "Codex가 항상 이런 결과를 낸다"는 식의 성능 주장은 하지 않는다. 이 글의 직접적인 재현 대상은 제품 성능이 아니라, Codex를 프로젝트 작업 단위로 요청할 때 필요한 운영 구조다.

## 해석 / 의견

내 판단으로는 Codex를 코드 생성기로만 보면 요청이 너무 얇아진다. 생성기는 "무엇을 출력할지"를 중심으로 다루지만, 작업 수행 에이전트는 "어떤 저장소 상태에서 무엇을 바꾸고 어떤 검증으로 끝낼지"를 함께 다룬다.

그래서 Codex 요청은 최소한 아래 네 가지를 포함해야 한다.

```md
## Goal

무엇을 바꾸거나 확인할 것인가.

## Scope

읽어야 할 파일, 수정 가능한 파일, 건드리지 말아야 할 영역은 무엇인가.

## Constraints

기존 스타일, 호환성, 보안, 성능, 문서화 기준은 무엇인가.

## Done when

어떤 테스트, 빌드, 리뷰 조건을 만족하면 끝난 것으로 볼 것인가.
```

의견: 사람의 역할은 코드 한 줄을 대신 쓰는 것이 아니라, 작업의 의미와 경계를 정하는 것이다. Codex의 역할은 그 경계 안에서 저장소를 읽고, 변경하고, 검증 가능한 결과를 만드는 것이다.

여기서 말하는 하네스는 Codex가 작업을 시작하기 전에 만나는 프로젝트 쪽 실행 구조다. 반복 규칙은 `AGENTS.md`에, 실행 기본값은 config에, 반복 절차는 skill에, 병렬 위임 기준은 subagent 판단에 둔다. 하네스 엔지니어링 자체가 낯설다면 먼저 [하네스 엔지니어링이란 무엇인가](/ai/what-is-harness-engineering/)를 읽으면 이 시리즈의 배경을 잡기 쉽다.

이 구분이 있어야 후속 글에서 다룰 `AGENTS.md`, config, skill, subagent도 제자리를 찾는다. `AGENTS.md`는 매번 반복되는 프로젝트 규칙을 담고, config는 실행 환경과 권한을 고정하며, skill은 반복 절차를 재사용 가능하게 만들고, subagent는 병렬성이 실제 이득을 줄 때만 쓴다.

## 한계와 예외

작은 알고리즘 예제나 독립적인 코드 스니펫 작성에서는 Codex를 코드 생성기처럼 써도 충분할 수 있다. 이 글의 관점은 운영 중인 저장소, 테스트가 있는 코드베이스, 리뷰와 배포가 이어지는 프로젝트 작업에 더 잘 맞는다.

또한 Codex의 구체적인 UI, 모델 기본값, 제공 인터페이스는 바뀔 수 있다. 이 글은 2026-04-23 기준 공식 문서에서 확인한 범위만 사실로 다뤘다.

## 참고자료

- OpenAI, [Code generation](https://developers.openai.com/api/docs/guides/code-generation)
- OpenAI, [Codex CLI](https://developers.openai.com/codex/cli)
- OpenAI, [Codex web](https://developers.openai.com/codex/cloud)
- OpenAI, [Codex best practices](https://developers.openai.com/codex/learn/best-practices)
