---
layout: single
description: "로그, 계획, 메모리, 이전 대화가 왜 agent 컨텍스트를 비대하게 만들고 실행 품질을 떨어뜨리는지 구조적으로 설명한 글."
title: "토큰 관리 03. 긴 로그, 긴 계획, 긴 메모리: 에이전트 컨텍스트 비대화의 원인"
lang: ko
translation_key: long-logs-long-plans-long-memory-agent-context-bloat
date: 2026-04-22 00:00:00 +0900
section: development
topic_key: token-management
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, token-management, logs, memory, state]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

토큰 낭비는 `AGENTS.md`, `CLAUDE.md`, 시스템 프롬프트 같은 정적인 문서에서만 일어나지 않는다. 실제 운영에서는 실행 중 생성되는 빌드 로그, 에러 출력, 장황한 계획, 이전 대화, 상태 기록, 중간 보고가 더 빠르게 컨텍스트를 불린다. 그래서 많은 팀이 시스템 프롬프트만 줄이면 된다고 생각하지만, 실제로는 작업 도중 누적되는 문맥이 더 큰 병목이 되는 경우가 많다.

이 글의 핵심은 단순하다. 기록을 많이 남긴다고 실행 품질이 자동으로 좋아지지는 않는다. 오히려 무엇을 상태로 유지하고, 무엇을 요약하고, 무엇을 버려야 하는지 구분하지 못하면 기록의 양은 늘고 현재 작업의 핵심은 흐려진다.

## 문서 정보

- 작성일: 2026-04-16
- 검증 기준일: 2026-04-16
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. OpenAI, Anthropic 공식 문서를 바탕으로 한 구조 분석.
- 테스트 버전: OpenAI Codex / API 문서 2026-04-16 확인본, Anthropic Claude Code / Claude API 문서 2026-04-16 확인본

## 문제 정의

토큰 문제를 이야기할 때 많은 팀은 먼저 시스템 프롬프트나 프로젝트 지침 파일 길이를 떠올린다. 물론 그 레이어도 중요하다. 하지만 실제 agent 운영에서는 정적인 규칙 문서보다, 작업 도중 생성되는 컨텍스트가 더 빨리 커지는 경우가 많다. 빌드 로그 전문이 붙고, 에러 원문이 반복되고, plan이 매 단계마다 다시 길어지고, 이전 대화와 상태 기록이 정리되지 않은 채 계속 누적되면 세션은 생각보다 빠르게 무거워진다.

이 문제를 놓치기 쉬운 이유는, 실행 중 생성되는 컨텍스트가 대개 "안전을 위해 남겨둔 정보"처럼 보이기 때문이다. 로그를 남기면 더 추적 가능할 것 같고, plan을 자세히 쓰면 더 통제된 작업처럼 보이고, 이전 대화를 길게 유지하면 더 많이 기억하는 것처럼 느껴진다. 하지만 기록의 양과 실행 품질은 비례하지 않는다. 오히려 핵심 상태와 참고 기록이 구분되지 않으면, agent는 현재 해야 할 일을 직접 읽는 대신 과거 기록 속에서 다시 추론해야 한다. 이 글에서는 왜 로그, 계획, 메모리, 이전 대화가 쉽게 비대해지는지, 그리고 왜 그 구조가 행동 품질을 떨어뜨리는지 정리해보려 한다.

## 확인된 사실

문서로 확인 가능한 사실: OpenAI의 `Unrolling the Codex agent loop`는 기존 대화에 새 메시지를 보낼 때 이전 대화 기록이 다음 턴 프롬프트에 포함되며, 여기에는 previous turns의 messages와 tool calls가 들어간다고 설명한다. 같은 글은 대화가 길어질수록 프롬프트도 길어지고, 한 턴 안에서 hundreds of tool calls가 일어나면 context window를 소진할 수 있다고 적는다([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)).

문서로 확인 가능한 사실: OpenAI의 같은 글은 Codex가 context window를 관리하기 위해 일정 임계값을 넘으면 conversation compaction을 수행한다고 설명한다. 이때 기존 `input`을 더 작은 item list로 바꿔 대화를 이어가며, 현재는 `/responses/compact`를 자동으로 사용한다고 밝힌다([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)).

문서로 확인 가능한 사실: Anthropic의 `How Claude remembers your project` 문서는 각 Claude Code session이 fresh context window로 시작하며, `CLAUDE.md`와 auto memory 두 메커니즘이 모두 start of every conversation에 loaded된다고 설명한다. 같은 문서는 auto memory가 `MEMORY.md`와 topic file들로 저장되며, `MEMORY.md`의 first 200 lines 또는 first 25KB가 대화 시작 시 로드된다고 밝힌다([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)).

문서로 확인 가능한 사실: Anthropic의 같은 문서는 Claude가 세션 중에 memory file을 읽고 쓰며, 인터페이스에 `Writing memory`나 `Recalled memory`가 보일 때 실제로 `~/.claude/projects/<project>/memory/` 아래 파일을 갱신하거나 읽는다고 설명한다([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)).

문서로 확인 가능한 사실: Anthropic의 `Context windows` 문서는 context window를 모델의 "working memory"로 설명하며, more context isn’t automatically better라고 적는다. 같은 문서는 token count가 커질수록 accuracy와 recall이 degrade하는 `context rot`가 나타날 수 있다고 안내한다([Anthropic, Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)).

문서로 확인 가능한 사실: OpenAI의 `Prompt caching` 문서는 cache hit가 exact prefix match에서만 가능하며, static content는 앞에 두고 variable content는 뒤에 두라고 설명한다([OpenAI, Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)).

## 직접 재현한 결과

직접 재현 없음: 이번 글은 동일한 저장소와 동일한 작업을 놓고 로그 길이, plan 길이, memory 보존 방식에 따라 지연과 준수율이 어떻게 바뀌는지 실험한 벤치마크 글이 아니다. 2026-04-16 기준으로는 `Codex`, `Claude Code`, 기타 도구에 같은 작업을 반복 실행하면서 동적 컨텍스트 누적량과 품질 변화를 정량 측정하지 않았다.

따라서 이 글에서 예시로 드는 빌드 로그, plan, 상태 기록은 특정 제품의 내부 프롬프트를 그대로 옮긴 것이 아니라, 실무에서 흔히 보는 패턴을 설명하기 위한 구조 예시다. 사실로 적은 부분은 공식 문서가 설명하는 conversation history, tool call history, compaction, memory loading, context rot 같은 항목에 한정하고, 그 위의 운영 해석은 다음 절에서 분리해 적는다.

## 해석 / 의견

내 판단으로는, 많은 팀이 시스템 프롬프트만 줄이면 토큰 문제가 해결될 것이라고 생각하지만, 실제로 더 빠르게 불어나는 것은 실행 중 생성되는 컨텍스트다. 정적인 문서는 한 번 설계하면 구조가 보인다. 반면 로그, plan, memory, 이전 대화는 작업이 길어질수록 조금씩 쌓이고, 그 누적은 세션 안에서 자연스럽게 정당화되기 쉽다. "나중에 필요할 수 있다"는 이유로 남겨둔 정보가, 몇 턴 뒤에는 현재 상태보다 더 큰 비중을 차지하는 식이다.

로그가 비대해지는 가장 흔한 이유는 원문 보존과 실행 컨텍스트를 구분하지 않기 때문이다. 실패한 빌드에서 실제로 다음 판단에 필요한 것은 에러 유형, 관련 파일, 재현 명령, 다음 확인 포인트 정도일 수 있다. 그런데 실무에서는 아래처럼 전문이 통째로 붙는 경우가 많다.

```text
npm test
...
PASS src/a.test.ts
PASS src/b.test.ts
...
FAIL src/auth.test.ts
TypeError: Cannot read properties of undefined
...
[중략 없이 수백 줄]
```

이 패턴이 문제인 이유는 로그를 기록으로 남기는 것과, 다음 턴의 working memory에 그대로 넣는 것이 다른 일이기 때문이다. 빌드 로그 전문 주입, 같은 에러 출력 원문 반복, 툴 결과의 정제 없는 재주입은 모두 같은 구조를 가진다. 한 번 필요했던 원문이 이후 여러 턴에 반복 비용으로 남는다.

plan이 비대해지는 이유도 비슷하다. 계획은 원래 현재 행동을 제어하기 위한 도구인데, 자주 작업 일지나 자기 설명으로 변한다. 예를 들어 지금 필요한 것은 "1. 실패 테스트 재현, 2. 원인 확인, 3. 수정, 4. 재검증" 정도일 수 있다. 그런데 세션이 길어지면 매 단계마다 비슷한 plan을 더 긴 문장으로 재선언하고, 이미 완료된 단계까지 계속 유지하며, 왜 이런 순서를 택했는지까지 장황하게 해설하는 경우가 많다. 그 순간 plan은 실행 도구가 아니라 해설 문서가 된다. 완료된 단계까지 계속 살아 있는 plan은 기억을 보존하는 데는 도움이 될 수 있어도, 현재 해야 할 일을 선명하게 만드는 데는 오히려 방해가 되기 쉽다.

메모리와 이전 대화가 비대해지는 가장 전형적인 이유는 전체 히스토리를 유지하려는 습관이다. 많은 팀은 무언가를 생략하면 중요한 맥락을 잃을까 봐, 원문 대화를 최대한 오래 붙들고 있으려 한다. 하지만 상태 요약 없이 원문에 계속 의존하는 구조에서는, agent가 지금 유효한 결정과 이미 끝난 논의를 구분하는 데 매번 비용을 쓴다. 예를 들어 초반에 검토했다가 버린 접근, 이미 해결된 우려, 폐기된 plan이 계속 살아 있으면, agent는 현재 상태를 읽는 대신 과거 논의 속에서 다시 상태를 복원해야 한다. 메모리의 목적은 회상이 아니라 현재 작업의 제어여야 하는데, 많은 시스템은 메모리를 기록 보관소처럼 다루고 바로 그 지점에서 컨텍스트가 무거워진다.

이 구조가 agent의 행동 품질을 떨어뜨리는 이유는 결국 우선순위 문제다. 현재 작업에 필요한 정보와 이미 끝난 정보가 같은 밀도로 섞여 있으면, 핵심 제약이 덜 선명해진다. 방금 실패한 테스트의 핵심 원인 한 줄보다 오래된 로그 수백 줄이 더 크게 남아 있고, 지금 필요한 다음 단계 한 줄보다 과거 plan 설명 열 줄이 더 길게 붙어 있으면, 실행은 느려지고 판단은 흔들린다. 많은 팀이 안전을 위해 더 많이 남기지만, 구조화되지 않은 보존은 안전을 높이기보다 핵심을 흐리는 경우가 많다.

그래서 중요한 질문은 "얼마나 많이 남길까"가 아니라 "무엇을 어떤 형태로 남길까"가 된다. 내 의견으로는, 로그 원문은 기록 저장소에 남기되 live context에는 실패 요약과 다음 행동만 유지하는 편이 낫다. plan은 현재 단계, 남은 blocker, 승인 필요 여부처럼 행동 제어에 필요한 상태만 남기고, 완료된 단계의 장문 해설은 live context에서 내려야 한다. memory 역시 전체 회상이 아니라 현재 유효한 결정, 아직 열린 이슈, 다음 턴에 직접 영향을 주는 제약만 상태로 유지하는 편이 맞다. 즉, 어떤 정보는 압축되어야 하고, 어떤 정보는 삭제되어야 하며, 어떤 정보만 현재 상태로 살아 있어야 한다. 이 구분이 없으면 컨텍스트는 기록물 창고가 되고, agent는 매 턴 그 창고를 다시 뒤져야 한다.

## 한계와 예외

이 글이 원문 로그나 긴 기록이 전혀 필요 없다고 주장하는 것은 아니다. 복잡한 컴파일 오류, 재현이 어려운 장애, 규제 요건이 있는 운영 환경에서는 raw log와 full trace를 보존해야 할 수 있다. 중요한 것은 archive와 live context를 구분하는 일이다. 나중에 참고해야 하는 기록이 있다는 사실이, 그 기록 전문이 매 턴 프롬프트에 다시 들어가야 한다는 뜻은 아니다.

또한 각 도구의 compaction 방식, memory 구조, history 유지 정책, tool output 처리 방식은 제품과 버전에 따라 다르다. 어떤 시스템은 자동 요약을 더 적극적으로 하고, 어떤 시스템은 긴 기록을 파일 참조로 내릴 수 있다. 이 글은 2026-04-16 기준 공개 문서에서 확인 가능한 공통 특성과 그 위의 운영 해석만 다뤘다. 실제로 어느 정도 길이에서 품질 저하가 체감되는지는 저장소와 작업 성격에 따라 별도 측정이 필요하다.

여기서 다음 질문이 자연스럽게 이어진다. 그렇다면 무엇을 상태로 남기고, 무엇을 요약하고, 무엇을 버려야 할까. 결국 문제의 핵심은 기록을 남기느냐 마느냐보다, 현재 작업을 제어하는 요약을 어떻게 설계하느냐다. 다음 글에서는 `토큰을 아끼는 상태 요약 설계법`을 다루며, 긴 원문 대신 짧고 유효한 상태를 남기려면 어떤 필드와 기준이 필요한지 더 구체적으로 이어가 보겠다.

## 참고자료

- OpenAI, [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
- OpenAI, [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- Anthropic, [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)
