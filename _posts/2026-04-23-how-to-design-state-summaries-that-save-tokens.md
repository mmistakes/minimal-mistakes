---
layout: single
description: "전체 히스토리 대신 현재 작업을 직접 제어하는 working state를 어떻게 설계해야 하는지 설명한 글."
title: "토큰 관리 04. 토큰을 아끼는 상태 요약 설계법"
lang: ko
translation_key: how-to-design-state-summaries-that-save-tokens
date: 2026-04-23 00:00:00 +0900
section: development
topic_key: token-management
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, token-management, state-summary, working-state]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

앞선 글들에서 본 핵심은 같았다. 토큰은 규칙 문서에서만 낭비되지 않고, 로그, 계획, 메모리, 이전 대화가 누적되면서 더 빠르게 소모된다. 그렇다면 다음 질문은 자연스럽다. 전체 대화와 전체 로그를 붙잡고 가지 않는다면, agent가 현재 작업을 유지하기 위해 무엇을 남겨야 할까.

이 글은 그 질문에 대한 실전적인 답을 정리한다. 핵심은 `history summary`를 길게 만드는 것이 아니라, 현재 작업을 직접 제어하는 `working state`를 짧고 선명하게 설계하는 데 있다. 좋은 상태 요약은 과거를 많이 기억하는 문서가 아니라, 다음 행동을 바로 선택하게 만드는 상태여야 한다.

## 문서 정보

- 작성일: 2026-04-17
- 검증 기준일: 2026-04-17
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. OpenAI, Anthropic 공식 문서를 바탕으로 한 구조 분석.
- 테스트 버전: OpenAI Codex / API 문서 2026-04-17 확인본, Anthropic Claude Code 문서 2026-04-17 확인본

## 문제 정의

실무에서 agent 컨텍스트를 관리할 때 가장 흔한 선택은 전체 히스토리를 가능한 오래 유지하는 것이다. 이전 대화도 남기고, build log도 남기고, plan도 남기고, 중간 판단도 최대한 보존한다. 얼핏 보면 안전한 전략처럼 보인다. 무엇 하나 빠뜨리지 않으니 나중에 복기하기도 쉬울 것 같고, 중요한 맥락을 놓칠 확률도 낮아 보인다.

하지만 실제로는 이 방식이 현재 작업을 더 잘 유지하게 만들지 않는 경우가 많다. 로그, 계획, 메모리, 이전 대화가 함께 길어질수록 agent는 "지금 유효한 상태"를 직접 읽는 대신, 과거 기록 속에서 현재 상태를 다시 추론해야 한다. 그래서 필요한 것은 전체 history를 조금 짧게 말하는 요약이 아니라, 현재 작업을 계속 이어가기 위한 state를 따로 설계하는 일이다. 이 글에서는 왜 상태 요약이 필요한지, 어떤 정보를 포함하고 제외해야 하는지, 그리고 실무에서 바로 적용할 수 있는 working state 템플릿은 어떤 모양이어야 하는지를 정리해보려 한다.

## 확인된 사실

문서로 확인 가능한 사실: OpenAI의 `Custom instructions with AGENTS.md` 문서는 Codex가 `AGENTS.md`를 "before doing any work" 읽는다고 설명하며, 지침 파일 결합 크기가 `project_doc_max_bytes` 한도에 도달하면 더 이상 추가하지 않는다고 밝힌다. 기본 한도는 32 KiB다([OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)).

문서로 확인 가능한 사실: OpenAI의 `Unrolling the Codex agent loop`는 새 메시지를 기존 대화에 보낼 때 conversation history가 다음 턴 프롬프트에 포함되며, previous turns의 messages와 tool calls가 함께 들어간다고 설명한다. 같은 글은 대화가 길어질수록 프롬프트도 길어지고, 한 턴 안에서 많은 tool call이 있으면 context window를 소진할 수 있다고 적는다([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)).

문서로 확인 가능한 사실: OpenAI의 같은 글은 Codex가 token 수가 일정 임계값을 넘으면 conversation compaction을 수행해 이전 `input`을 더 작은 item list로 바꾼다고 설명한다. 현재는 `/responses/compact`를 자동으로 사용한다고 밝힌다([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)).

문서로 확인 가능한 사실: Anthropic의 `How Claude remembers your project` 문서는 `CLAUDE.md`와 auto memory가 모두 conversation start에 loaded되며, Claude는 이를 enforced configuration이 아니라 context로 다룬다고 설명한다. 같은 문서는 "The more specific and concise your instructions, the more consistently Claude follows them"이라고 적고, auto memory는 every session에 `first 200 lines or 25KB`가 로드된다고 밝힌다([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)).

문서로 확인 가능한 사실: Anthropic의 같은 문서는 `CLAUDE.md`에는 every session에서 유지해야 할 사실만 남기고, multi-step procedure이거나 codebase 일부에만 필요한 내용은 skill이나 path-scoped rule로 옮기라고 권장한다. 또한 200 lines 이하를 목표로 하며, longer files consume more context and reduce adherence라고 설명한다([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)).

문서로 확인 가능한 사실: OpenAI의 `Prompt caching` 문서는 cache hit가 exact prefix match에서만 가능하며, static content는 프롬프트 앞에, variable content는 뒤에 두라고 설명한다([OpenAI, Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)).

## 직접 재현한 결과

직접 재현 없음: 이번 글은 동일한 작업을 놓고 다양한 상태 요약 형식의 길이와 품질을 정량 비교한 실험 글이 아니다. 2026-04-17 기준으로는 `Codex`, `Claude Code`, 기타 도구에 같은 저장소와 같은 작업을 반복 실행하면서 `history summary`와 `working state` 방식의 차이를 직접 측정하지 않았다.

따라서 이 글에서 제시하는 상태 요약 템플릿과 예시는 특정 제품의 내부 프롬프트를 옮긴 것이 아니라, 공식 문서의 context / memory / compaction / prompt structuring 원리를 바탕으로 정리한 실무용 패턴이다. 사실로 적은 부분은 공식 문서가 설명하는 instruction loading, history growth, compaction, memory loading, prompt caching에 한정하고, 설계 원칙과 템플릿은 다음 절에서 해석과 권고로 분리해 적는다.

## 해석 / 의견

내 판단으로는, 상태 요약이 필요한 이유는 전체 history가 너무 길어서가 아니라, history가 state를 대신할 수 없기 때문이다. history는 "무슨 일이 있었는가"를 보여주는 데 적합하다. 하지만 agent가 다음 행동을 선택하려면 "지금 무엇이 유효한가"가 먼저 보여야 한다. 그래서 상태 요약을 설계할 때 가장 먼저 버려야 할 발상은 `history summary`를 조금 더 짧게 만들면 된다는 생각이다. 좋은 상태 요약은 과거를 압축한 메모가 아니라, 현재 작업을 직접 제어하는 `working state`여야 한다.

이 관점에서 보면 상태 요약에 포함할 정보와 제외할 정보도 분명해진다. 남겨야 하는 것은 현재 목표, 현재 작업 범위, 이미 결정된 사항, 변경된 파일 또는 영향 범위, 남은 작업, 검증 상태, 금지사항 또는 주의사항, 막힌 이유다. 이 항목들은 모두 다음 턴의 행동을 직접 바꾼다. 반대로 긴 배경 설명, 완료된 과거의 장황한 서술, 원문 로그 전문, 이미 폐기된 접근의 상세 기록은 상태 요약에서 빠지는 편이 낫다. 그런 정보는 archive나 별도 문서로 남길 수 있지만, live context에 계속 붙어 있을 필요는 없다.

실무에서 바로 쓸 수 있는 working state의 최소 템플릿은 아래처럼 잡을 수 있다.

```md
## Working State

- 현재 목표:
- 현재 작업 범위:
- 이미 결정된 사항:
- 변경된 파일 또는 영향 범위:
- 남은 작업:
- 검증 상태:
- 금지사항 또는 주의사항:
- 막힌 이유:
```

이 템플릿의 장점은 단순함에 있다. 사람이 보는 운영 문서에도 넣을 수 있고, agent 입력용 상태 블록으로도 응용할 수 있다. 중요한 것은 각 필드를 길게 채우는 것이 아니라, 모델이 바로 행동할 수 있을 정도로만 짧고 분명하게 유지하는 것이다.

예를 들어 나쁜 상태 요약은 아래처럼 되기 쉽다.

```md
오늘은 먼저 인증 흐름 전체를 다시 검토했고, 중간에는 세션 저장 방식도 의심했다.
그다음 여러 테스트를 실행하면서 fixture 차이 가능성도 생각했다.
이후 auth.ts 쪽이 가장 유력하다고 봤지만 아직 확실하지는 않다.
전체적으로는 원인을 거의 좁힌 것 같고, 다음에는 좀 더 자세히 확인해볼 예정이다.
```

이 문단이 나쁜 이유는 읽고 나서도 지금 무엇을 해야 하는지가 바로 보이지 않기 때문이다. 시간 순서대로는 이해되지만, 현재 상태와 다음 행동이 분리되어 있지 않다.

같은 상황을 working state로 쓰면 아래처럼 바뀐다.

```md
## Working State

- 현재 목표: auth 테스트 실패 수정
- 현재 작업 범위: `src/auth.ts`, `tests/auth.test.ts`만 수정
- 이미 결정된 사항: DB schema 변경 없음, public API 유지
- 변경된 파일 또는 영향 범위: `src/auth.ts`, `tests/auth.test.ts`
- 남은 작업: null guard 수정, 테스트 재실행, 회귀 확인
- 검증 상태: 실패 재현 완료, 수정 전 테스트 실패 확인
- 금지사항 또는 주의사항: `migrations/` 수정 금지
- 막힌 이유: fixture 차이 원인 추가 확인 필요
```

이 요약이 더 좋은 이유는 과거를 더 많이 설명해서가 아니라, 현재 행동을 더 직접적으로 제어하기 때문이다. 사람이 읽어도 바로 다음 단계가 보이고, 모델이 읽어도 어떤 범위 안에서 무엇을 해야 하는지가 선명하다.

좋은 상태 요약의 조건도 결국 여기서 나온다. 첫째, 짧아야 한다. 둘째, 현재 작업과 직접 관련 있어야 한다. 셋째, 사람이 읽는 친절한 회고문이 아니라 모델이 바로 행동할 수 있는 상태여야 한다. 넷째, 완료된 과거를 장황하게 서술하지 않아야 한다. 이 기준을 만족하지 못하면 상태 요약은 곧 history summary처럼 변하고, 얼마 지나지 않아 다시 비대해진다.

이 구조는 문서 설계와도 자연스럽게 연결할 수 있다. `AGENTS.md`는 상태를 길게 저장하는 문서가 아니라, 핵심 제약과 참조 경로를 알려주는 entrypoint가 되는 편이 좋다. `docs/plan.md`는 전체 역사보다 현재 단계와 남은 작업 중심으로 유지하는 편이 낫다. `docs/status.md`는 위의 `Working State` 템플릿을 중심으로 현재 상태를 유지하는 문서가 될 수 있다. 반대로 raw log, 긴 회고, 폐기된 접근의 상세 기록은 `logs/`나 archive 문서로 내리는 편이 더 적절하다. 이렇게 하면 고정된 운영 규칙은 앞쪽의 static content로 유지하고, 작업마다 달라지는 작은 상태 블록만 뒤쪽의 variable content로 붙이는 구조를 만들 수 있다.

내 의견으로는, 상태 요약 설계의 핵심은 "얼마나 많이 기억할까"가 아니라 "무엇을 계속 살아 있게 둘까"를 정하는 데 있다. 메모리의 목적은 회상이 아니라 현재 작업의 제어여야 한다. 상태 요약이 그 역할을 제대로 하려면, 과거 전체를 요약하려는 유혹을 버리고 현재 유효한 상태만 남겨야 한다.

## 한계와 예외

이 글이 모든 작업을 8개 필드로만 정리할 수 있다고 주장하는 것은 아니다. 대규모 리팩터링이나 멀티에이전트 작업처럼 범위가 넓은 경우에는 하위 task별 상태 블록이 따로 필요할 수 있고, 긴 분석 작업에서는 가설과 반례를 별도 문서로 관리해야 할 수도 있다. 중요한 것은 필드 수보다 목적이다. 상태 요약은 항상 "지금 무엇이 유효한가"를 보여줘야 한다.

또한 상태를 지나치게 압축하면 중요한 제약이 사라질 수 있다. 예를 들어 검증 상태를 너무 짧게 적어 재현 여부와 회귀 확인 여부가 구분되지 않거나, 결정된 사항과 가설이 섞이면 오히려 잘못된 행동을 유도할 수 있다. 즉, 좋은 상태 요약은 무조건 짧은 요약이 아니라, 필요한 제어 정보를 남긴 짧은 요약이어야 한다.

마지막으로, 도구마다 memory 구조, instruction loading 방식, compaction 방식은 다를 수 있다. 어떤 시스템은 상태 파일을 자동으로 불러오고, 어떤 시스템은 대화 내부 summary에 더 의존한다. 이 글은 2026-04-17 기준 공개 문서에서 확인 가능한 공통 원리와 그 위의 운영 해석만 다뤘다. 실제 환경에서는 어느 필드가 더 중요한지 별도 측정과 조정이 필요하다.

여기서 다음 질문이 이어진다. 상태 요약이 중요하다는 것은 알겠는데, 실제 압축 과정에서 무엇을 남기고 무엇을 버려야 할까. 어떤 정보는 줄이면 되고, 어떤 정보는 절대 빠지면 안 되며, 어떤 정보는 과감히 버릴 수 있다. 다음 글에서는 `좋은 압축과 나쁜 압축: 무엇을 남기고 무엇을 버릴 것인가`를 다루며, 상태 요약을 만들 때 정보 손실을 어디까지 허용해야 하는지 더 구체적으로 이어가 보겠다.

## 참고자료

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
- OpenAI, [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
