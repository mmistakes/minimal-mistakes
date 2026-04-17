---
layout: single
description: "하네스 엔지니어링의 공통 원칙은 유지하되, Codex와 Claude Code의 문맥 소비 방식 차이에 맞춰 토큰 관리 전략을 어떻게 조정해야 하는지 설명한 글."
title: "토큰 관리 06. Codex와 Claude Code에서 토큰 관리 전략은 어떻게 달라지는가"
lang: ko
translation_key: how-token-management-strategies-differ-between-codex-and-claude-code
date: 2026-04-25 00:00:00 +0900
section: development
topic_key: token-management
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, token-management, context, agents]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

토큰 관리는 도구가 달라도 같은 원칙으로만 해결되지 않는다. 최소 상태 유지, 중복 지시 제거, 실행 중심 컨텍스트 같은 공통 원칙은 그대로 유효하지만, `Codex`와 `Claude Code`는 문맥을 쌓고 읽고 줄이는 방식에서 차이가 보이기 때문에 운영 전략도 함께 조정해야 한다.

이 글은 두 도구의 우열을 가리는 비교 리뷰가 아니다. 대신 하네스 엔지니어링 관점에서 문맥 유지 방식, 계획 표현 성향, 문서 참조 구조, 코드베이스 탐색, 툴 출력 소비 방식이 어떻게 다르게 체감되는지 정리하고, 그 차이가 토큰 관리 설계에 어떤 영향을 주는지 설명한다.

## 문서 정보

- 작성일: 2026-04-17
- 검증 기준일: 2026-04-17
- 문서 성격: comparison, analysis
- 테스트 환경: 실행 테스트 없음. OpenAI, Anthropic 공식 문서와 공개 가이드를 바탕으로 한 비교 분석.
- 테스트 버전: OpenAI Codex 관련 문서 2026-04-17 확인본, Anthropic Claude Code 및 Claude API context 문서 2026-04-17 확인본

## 문제 정의

토큰 관리 시리즈를 따라오다 보면 마지막에 자연스럽게 남는 질문이 있다. "원칙은 알겠는데, 실제로는 도구마다 토큰이 타는 방식이 다르지 않나?" 이 질문은 중요하다. 하네스 엔지니어링은 특정 모델의 파라미터 성능보다, 그 모델이 어떤 문맥을 언제 읽고 무엇을 계속 들고 가며 어디서부터 희석되는지를 설계하는 일이기 때문이다.

특히 `Codex`와 `Claude Code`처럼 agent형 코딩 도구를 운영할 때는, 겉으로는 비슷한 작업을 해도 컨텍스트 압력이 생기는 지점이 다르게 나타나는 경우가 많다. 어떤 환경에서는 긴 대화와 툴 호출 누적이 먼저 문제를 만들고, 어떤 환경에서는 세션 시작 시 읽히는 문서와 메모리 계층이 먼저 핵심 제약을 흐리게 만든다. 그래서 "문서를 짧게 써라" 또는 "히스토리를 줄여라" 같은 단일 처방은 충분하지 않다.

이 글의 범위는 제품 내부 구현을 역추적해 확정적으로 비교하는 데 있지 않다. 2026-04-17 기준 공개 문서에서 확인 가능한 사실을 먼저 정리하고, 그 위에서 실무상 자주 체감되는 운영 패턴을 하네스 설계 관점으로 해석한다. 핵심은 하나다. 원칙은 공통이지만, 전략은 도구별로 조정해야 한다.

## 확인된 사실

문서로 확인 가능한 사실: OpenAI의 `Custom instructions with AGENTS.md` 문서는 Codex가 `AGENTS.md`를 "before doing any work" 읽는다고 설명한다. 같은 문서는 Codex가 프로젝트 루트에서 현재 작업 디렉터리까지 내려오며 instruction chain을 만들고, 결합 크기가 `project_doc_max_bytes` 한도에 도달하면 더 이상 추가하지 않는다고 밝힌다. 기본 한도는 32 KiB다([OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)).

문서로 확인 가능한 사실: OpenAI의 `Unrolling the Codex agent loop`는 기존 conversation에 새 메시지를 보낼 때 이전 메시지와 tool call이 다음 턴 프롬프트에 포함된다고 설명한다. 같은 글은 대화가 길어질수록 프롬프트 길이도 함께 증가하며, 많은 tool call이 누적되면 context window를 소진할 수 있다고 적는다([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)). 이 문서는 또한 Codex가 임계값을 넘으면 conversation compaction을 수행해 이전 `input`을 더 작은 item list로 교체한다고 설명한다.

문서로 확인 가능한 사실: 같은 OpenAI 글은 prompt caching이 exact prefix match에서만 가능하며, 대화 중간에 `tools`, `model`, sandbox configuration, approval mode, current working directory가 바뀌면 cache miss가 날 수 있다고 적는다([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/); [OpenAI, Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)).

문서로 확인 가능한 사실: OpenAI의 `Harness engineering` 글은 팀이 "one big `AGENTS.md`" 접근을 시도했다가 실패했고, 대신 짧은 `AGENTS.md`를 table of contents처럼 사용하며 실제 지식은 구조화된 `docs/` 아래 두었다고 설명한다([OpenAI, Harness engineering](https://openai.com/index/harness-engineering/)).

문서로 확인 가능한 사실: Anthropic의 `How Claude remembers your project` 문서는 `CLAUDE.md`와 auto memory가 conversation start에 loaded되며, Claude는 이를 enforced configuration이 아니라 context로 다룬다고 설명한다. 같은 문서는 "The more specific and concise your instructions, the more consistently Claude follows them"이라고 적고, `CLAUDE.md`는 파일당 200줄 이하를 목표로 하며 longer files consume more context and reduce adherence라고 설명한다([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)).

문서로 확인 가능한 사실: 같은 Anthropic 문서는 `CLAUDE.md`가 디렉터리 계층을 따라 로드되며, 조상 디렉터리의 `CLAUDE.md`와 `CLAUDE.local.md`가 launch 시 결합된다고 설명한다. 또한 여러 단계 절차나 코드베이스 일부에만 필요한 규칙은 `CLAUDE.md`에 길게 쓰지 말고, path-scoped rule이나 skill로 분리하라고 권장한다([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)).

문서로 확인 가능한 사실: Anthropic의 `Settings` 문서는 `includeGitInstructions`가 기본값 `true`이며, built-in commit / PR workflow instructions와 git status snapshot을 Claude의 system prompt에 포함한다고 설명한다([Anthropic, Claude Code settings](https://code.claude.com/docs/en/settings)).

문서로 확인 가능한 사실: Anthropic의 `Connect Claude Code to tools via MCP` 문서는 Claude Code가 MCP를 통해 외부 도구와 데이터를 직접 읽고 동작할 수 있으며, 데이터를 채팅에 붙여 넣는 대신 연결된 시스템에서 직접 읽도록 하는 것이 가능하다고 설명한다([Anthropic, Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)). 또한 Claude API의 context window 문서는 context를 모델의 working memory로 설명하며, "more context isn't automatically better"라고 적고, 긴 agentic workflow에서는 server-side compaction을 기본 전략으로, 더 세밀한 경우에는 tool result clearing 같은 context editing 전략을 소개한다([Anthropic, Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)).

## 직접 재현한 결과

직접 재현 없음: 이번 글은 동일한 저장소와 동일한 작업을 `Codex`와 `Claude Code`에 반복 투입해, 토큰 사용량과 실패 패턴을 정량 비교한 벤치마크가 아니다. 2026-04-17 기준으로 두 도구를 같은 조건에서 장시간 실행하며 대화 길이, 문서 길이, 툴 출력량을 통제한 비교 실험은 직접 수행하지 않았다.

따라서 아래 해석은 제품 내부 로직을 확정적으로 설명하는 문장이 아니라, 공식 문서가 공개한 instruction loading, conversation growth, memory loading, prompt caching, compaction, context management 원리를 바탕으로 정리한 운영 프레임이다. 사실로 적은 부분은 문서에 근거를 둔 내용으로 한정하고, "경향", "실무상 체감", "운영상 자주 보이는 패턴"은 해석과 의견으로 분리해 적는다.

## 해석 / 의견

### 원칙은 같지만 전략은 같지 않다

내 판단으로는, `Codex`와 `Claude Code`를 함께 써보거나 비교 검토할 때 가장 먼저 버려야 할 생각은 "둘 다 agent니까 같은 하네스면 되겠지"라는 가정이다. 최소 상태 유지, 중복 지시 제거, 실행 중심 컨텍스트, 요약 가능한 로그 처리라는 공통 원칙은 분명히 같다. 하지만 어느 지점에서 토큰 압력이 먼저 커지는지, 어떤 종류의 텍스트가 실행 품질을 먼저 흐리는지는 도구별로 다르게 체감된다.

`Codex` 쪽은 실무상 긴 thread와 tool call 누적 관리가 먼저 문제로 드러나는 경우가 많다. OpenAI 문서가 직접 설명하듯, 이전 대화와 툴 호출이 다음 턴 프롬프트로 계속 이어지고, 환경 변화나 툴 목록 변화는 캐시 효율에도 영향을 준다. 반면 `Claude Code` 쪽은 세션 시작에 읽히는 `CLAUDE.md`, auto memory, 설정 계층의 밀도와 역할 분리가 먼저 중요해지는 경우가 많다. Anthropic 문서가 반복해서 짧고 구체적인 문서, path-scoped rule, skill 분리를 강조하는 이유도 여기에 가깝다.

결국 원칙은 하나지만 전략은 달라진다. `Codex`에서는 "실행 중 누적되는 것"을 덜어내는 설계가 더 중요하게 올라오고, `Claude Code`에서는 "시작 시점에 주입되는 것"을 분해하고 역할별로 나누는 설계가 더 중요하게 올라오는 경향이 있다.

### 하네스 설계 관점에서 보면 비교 기준이 달라진다

아래 표는 스펙 비교가 아니라, 하네스 엔지니어링 관점에서 두 도구를 볼 때 의미 있는 비교 기준을 정리한 것이다.

| 비교 기준 | Codex 쪽 경향 | Claude Code 쪽 경향 | 하네스 설계 시사점 |
| --- | --- | --- | --- |
| 문맥 유지 방식 | 공식 문서상 이전 대화와 tool call이 다음 턴 프롬프트에 계속 포함되고, 길어지면 compaction이 개입한다. | 공식 문서상 세션 시작 시 `CLAUDE.md`와 auto memory가 읽히고, 긴 대화는 별도 context management 전략의 영향을 받는다. | `Codex`는 장기 thread의 누적 관리가 중요하고, `Claude Code`는 startup context 밀도와 메모리 계층 관리가 더 중요하다. |
| 계획 표현 성향 | 긴 작업에서 중간 계획과 상태 보고가 thread 안에 누적되기 쉬워 장문 plan 재선언 비용이 빨리 커진다. | 계획 그 자체보다 세션 시작에 적재되는 규칙, 메모리, 운영 문서가 장문일 때 핵심 제약이 흐려지기 쉽다. | `Codex`는 plan을 반복 서술하기보다 상태 문서로 분리하는 편이 유리하고, `Claude Code`는 plan보다 규칙 문서의 역할 분리가 더 중요하다. |
| 문서 참조 방식 | `AGENTS.md`가 루트에서 현재 디렉터리까지 결합되며 32 KiB 한도가 있다. 짧은 map형 문서가 유리하다. | `CLAUDE.md`가 계층적으로 로드되고, 더 긴 내용은 `.claude/rules/`, imports, skill로 나누는 방식이 권장된다. | 두 도구 모두 "한 파일에 다 넣기"보다 계층화가 낫지만, `Codex`는 탐색 지도를, `Claude Code`는 역할 분리된 startup 문서를 더 중시하는 편이 안정적이다. |
| 코드베이스 탐색 방식 | 저장소 내부 지식을 구조화해 agent가 직접 찾게 하는 접근이 공개 사례에서 강조된다. | 외부 정보는 MCP 연결을 통해 직접 읽게 하고, 채팅에 붙여 넣는 양을 줄이는 방향이 강조된다. | `Codex`는 repo-local docs의 탐색성을, `Claude Code`는 pasted context 대신 connected context를 설계하는 쪽이 더 효과적일 수 있다. |
| 툴 호출 및 중간 출력 소비 방식 | tool output과 환경 변화가 thread와 캐시 구조에 직접 영향을 준다. 긴 출력 전문은 다음 턴 부담으로 남기 쉽다. | 세션 시작의 시스템 지시와 도구 연결 구조가 중요하고, 긴 agentic workflow에는 compaction과 tool result 관리 전략이 별도로 필요하다. | `Codex`는 tool set 안정화와 출력 요약이 중요하고, `Claude Code`는 startup 지시 중복 제거와 외부 출력의 직접 연결 방식이 중요하다. |

이 표에서 중요한 것은 어느 쪽이 낫다는 결론이 아니다. 같은 토큰 5,000개를 써도, 어떤 도구에서는 긴 conversation history가 더 문제고, 다른 도구에서는 과하게 적재된 startup instruction stack이 더 문제일 수 있다는 점이다.

### Codex에서 더 주의할 토큰 관리 포인트

내 의견으로는 `Codex` 하네스에서 가장 먼저 점검할 것은 긴 thread 안에 무엇이 계속 재주입되는가다. OpenAI 문서가 설명하듯, 이전 대화와 툴 호출은 이어지는 턴의 프롬프트 일부가 된다. 그래서 `Codex`에서는 긴 build log 전문, 반복되는 에러 원문, 매 단계 장황한 계획 재선언이 생각보다 빠르게 문맥 비용으로 돌아온다. 같은 이유로 "지금 상태"만 짧게 남기고, 원문 로그는 파일 참조나 아카이브로 내리는 구조가 더 잘 맞는다.

두 번째로 중요한 것은 실행 환경의 안정성이다. OpenAI 문서상 `tools`, current working directory, approval mode, sandbox configuration 변화는 캐시 효율에 영향을 줄 수 있다. 따라서 task 하나를 처리하는 동안 툴 목록과 작업 루트를 자주 흔드는 하네스는 `Codex`에 불리하게 작동할 가능성이 있다. 실무상 체감으로는, 같은 종류의 작업을 처리할 때 툴 세트와 작업 경계를 되도록 안정적으로 유지하는 편이 지연 시간과 맥락 일관성 양쪽에 도움이 된다.

세 번째는 문서 구조다. `Codex`에서 `AGENTS.md`는 encyclopedia가 아니라 map에 가깝게 쓰는 편이 안전하다. OpenAI의 harness engineering 글이 보여주듯, 짧은 루트 문서가 어디를 봐야 하는지 알려주고, 세부 규칙은 `docs/`, 하위 디렉터리 문서, 상태 문서로 흩어져 있는 구조가 더 유지보수 가능하다. 다시 말해 `Codex`에선 긴 "모든 규칙 모음"보다, 현재 경로와 작업 종류에 따라 필요한 문서만 가까워지게 만드는 계층 구조가 중요하다.

### Claude Code에서 더 주의할 토큰 관리 포인트

`Claude Code`에서는 startup context를 구성하는 층을 먼저 점검하는 편이 낫다고 본다. `CLAUDE.md`, `CLAUDE.local.md`, auto memory, 설정 계층이 모두 현재 세션의 문맥 품질에 영향을 줄 수 있기 때문이다. Anthropic 문서가 `CLAUDE.md`는 구체적이고 짧게 유지하고, 긴 절차나 특정 경로 전용 규칙은 `.claude/rules/`나 skill로 빼라고 권하는 이유도 이와 연결된다. 실무상 자주 보이는 문제는 "팀 운영 철학", "금지사항", "코딩 스타일", "특정 모듈 절차"가 하나의 `CLAUDE.md`에 함께 쌓이면서, 실제 현재 작업과 직접 관련 있는 제약이 묻히는 구조다.

또 하나는 중복 지시다. Anthropic 문서에 따르면 `Claude Code`는 `AGENTS.md`를 직접 읽는 대신 `CLAUDE.md`에서 import해 함께 읽게 만들 수 있다. 여기에 `includeGitInstructions` 기본값까지 고려하면, 팀이 이미 git 운영 방식과 PR 절차를 장문으로 적어 둔 상태에서 비슷한 내용을 여러 문서에 반복하면 startup context가 빠르게 비대해질 수 있다. 이런 경우에는 문서를 없애는 것이 아니라, 무엇이 공통 규칙이고 무엇이 Claude 전용 보충 규칙인지 분리하는 편이 낫다.

외부 정보 처리 방식도 다르게 볼 필요가 있다. Claude Code 문서는 MCP를 연결해 붙여 넣기 대신 직접 읽게 할 수 있다고 설명한다. 그래서 `Claude Code` 하네스에서는 긴 이슈 본문, 모니터링 데이터, 운영 대시보드 요약을 매번 대화에 붙여 넣는 방식보다, 연결된 도구에서 필요할 때 읽도록 설계하는 편이 더 맞을 수 있다. 이 차이는 단순 편의 기능이 아니라, 라이브 컨텍스트에 불필요한 원문을 덜 올리는 방식이라는 점에서 토큰 관리 전략과 직접 연결된다.

### 공통으로 유지해야 하는 하네스 원칙은 여전히 같다

도구별 차이를 강조한다고 해서 공통 원칙이 사라지는 것은 아니다. 오히려 도구가 달라질수록 변하지 않는 원칙 몇 가지가 더 또렷해진다.

첫째, 최소 상태만 유지해야 한다. 현재 목표, 현재 범위, 핵심 제약, 검증 상태, 남은 작업처럼 바로 행동을 바꾸는 정보만 live context에 남기는 원칙은 `Codex`와 `Claude Code` 모두에서 유효하다.

둘째, 중복 지시를 제거해야 한다. 루트 문서, 하위 문서, 시스템 프롬프트, 상태 요약, 운영 메모에 같은 규칙이 반복되면 길이만 늘어나는 것이 아니라 우선순위도 흐려진다. 한 규칙은 한 계층의 system of record에 두고, 다른 계층은 그 문서를 가리키게 만드는 편이 안정적이다.

셋째, 실행 중심 컨텍스트를 유지해야 한다. 사람을 설득하기 위한 배경 설명과 모델이 지금 행동하기 위해 필요한 제어 정보는 다르다. 둘을 분리하지 않으면 어느 도구에서든 핵심 상태가 장식적 설명 아래로 가라앉는다.

넷째, 로그와 중간 출력은 요약 가능한 형태로 다뤄야 한다. 긴 원문은 기록 저장소에 남기고, live context에는 실패 원인, 관련 파일, 다음 행동, 재발 방지 포인트처럼 압축된 상태를 남기는 편이 낫다.

시리즈 전체를 마무리하며 다시 강조하고 싶은 결론도 같다. 토큰 관리는 프롬프트를 짧게 쓰는 요령이 아니라, agent가 무엇을 들고 일하고 무엇을 버린 채 앞으로 나아갈지를 설계하는 시스템 문제다. `Codex`와 `Claude Code`는 그 설계에서 주의할 지점이 조금씩 다르지만, 결국 더 좋은 하네스는 더 많은 문장을 넣는 하네스가 아니라, 더 정확한 상태와 더 선명한 제약을 남기는 하네스에 가깝다.

## 한계와 예외

이 글은 2026-04-17 기준 공개 문서와 공개 가이드에 근거한 비교 분석이며, 두 도구의 비공개 내부 구현을 단정적으로 설명하지 않는다. 특히 실제 제품 동작은 버전, 설정, 계정 등급, 조직 정책, 연결된 툴 구성에 따라 달라질 수 있다. 따라서 여기서 말한 차이는 "공식 문서에서 확인되는 구조"와 "실무상 자주 보이는 운영 패턴"의 수준으로 읽는 편이 적절하다.

또한 `Claude API` 문서의 context management 전략이 곧바로 `Claude Code` 전체 동작을 그대로 대변한다고 단정할 수는 없다. 마찬가지로 OpenAI의 Codex 관련 공개 글도 특정 시점의 구조 설명이며, 이후 구현 세부는 달라질 수 있다. 이 글은 어디까지나 하네스 설계자가 조정해야 할 변수와 관찰 포인트를 정리한 것이다.

마지막으로, 실제 운영에서 어느 쪽이 더 크게 문제로 드러나는지는 팀의 작업 형태에 따라 달라질 수 있다. 짧고 독립적인 태스크가 많은 팀은 startup instruction stack이 더 중요하게 느껴질 수 있고, 긴 연속 작업과 반복 tool call이 많은 팀은 thread growth가 더 큰 병목으로 보일 수 있다. 그래서 이 글의 결론은 특정 도구 선택이 아니라, 사용하는 도구에 맞춰 하네스를 계속 조정해야 한다는 점에 있다.

## 참고자료

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
- OpenAI, [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- OpenAI, [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- Anthropic, [Claude Code settings](https://code.claude.com/docs/en/settings)
- Anthropic, [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)
- Anthropic, [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)
