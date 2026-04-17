---
layout: single
description: "토큰 절약에서 중요한 것은 무조건 삭제가 아니라, 핵심 정보를 보존한 채 정보 밀도와 우선순위를 높이는 압축이라는 점을 설명한 글."
title: "토큰 관리 05. 좋은 압축과 나쁜 압축: 무엇을 남기고 무엇을 버릴 것인가"
lang: ko
translation_key: good-compression-vs-bad-compression-what-to-keep-and-what-to-drop
date: 2026-04-24 00:00:00 +0900
section: development
topic_key: token-management
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, token-management, compression, context]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

토큰 절약을 이야기하면 흔히 "더 짧게 만들면 된다"는 결론으로 가기 쉽다. 하지만 실제 agent 운영에서 중요한 것은 무조건 많이 지우는 일이 아니라, 지금 작업을 제어하는 정보를 남긴 채 정보 밀도와 우선순위를 높이는 일이다. 그래서 압축과 삭제는 같은 말이 아니다.

이 글은 좋은 압축과 나쁜 압축의 차이를 설명하고, 무엇을 반드시 남겨야 하며 무엇을 과감히 버리거나 줄일 수 있는지를 실무적인 판단 프레임으로 정리한다. 핵심은 길이를 줄이는 것이 목적이 아니라, 핵심 제약과 상태를 더 선명하게 남기는 데 있다.

## 문서 정보

- 작성일: 2026-04-17
- 검증 기준일: 2026-04-17
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. OpenAI, Anthropic 공식 문서를 바탕으로 한 구조 분석.
- 테스트 버전: OpenAI Codex / API 문서 2026-04-17 확인본, Anthropic Claude Code 문서 2026-04-17 확인본

## 문제 정의

앞선 글들에서 상태 요약과 working state가 왜 중요한지를 정리했다면, 이제 남는 질문은 더 실전적이다. 긴 로그, 긴 plan, 긴 history를 줄이려 할 때 무엇을 남기고 무엇을 버려야 할까. 이 지점에서 많은 팀이 "짧게 만드는 것" 자체를 목표로 삼는다. 그래서 길어 보이는 문장을 없애고, 상세 설명을 줄이고, 여러 항목을 한 줄로 뭉친다.

하지만 이 방식은 쉽게 잘못된 압축으로 이어진다. 검증 기준이나 작업 범위 같은 핵심 제약까지 함께 사라지면, 텍스트는 짧아졌지만 실행 품질은 오히려 나빠진다. 즉, 토큰 절약은 무조건적인 삭제가 아니다. 중요한 정보를 잃지 않으면서, 현재 작업에 필요한 정보의 밀도와 우선순위를 높이는 일이 더 가깝다. 이 글에서는 좋은 압축과 나쁜 압축의 차이, 반드시 남겨야 하는 정보와 과감히 줄이거나 버릴 수 있는 정보, 그리고 실무에서 바로 쓸 수 있는 판단 질문을 정리해보려 한다.

## 확인된 사실

문서로 확인 가능한 사실: OpenAI의 `Custom instructions with AGENTS.md` 문서는 Codex가 `AGENTS.md`를 "before doing any work" 읽는다고 설명하며, instruction chain은 결합 크기가 `project_doc_max_bytes` 한도에 도달하면 더 이상 추가하지 않는다고 밝힌다. 기본 한도는 32 KiB다([OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)).

문서로 확인 가능한 사실: OpenAI의 `Unrolling the Codex agent loop`는 기존 conversation에 새 메시지를 보낼 때 conversation history와 previous tool calls가 다음 턴 프롬프트에 포함된다고 설명한다. 같은 글은 대화가 길어질수록 프롬프트도 길어지고, 많은 tool call이 누적되면 context window를 소진할 수 있다고 적는다([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)).

문서로 확인 가능한 사실: OpenAI의 같은 글은 Codex가 token 수가 일정 임계값을 넘으면 conversation compaction을 수행해 이전 `input`을 더 작은 item list로 바꿔 이어간다고 설명한다. 현재는 `/responses/compact`를 자동으로 사용한다고 밝힌다([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)).

문서로 확인 가능한 사실: Anthropic의 `How Claude remembers your project` 문서는 `CLAUDE.md`와 auto memory가 conversation start에 loaded되며, Claude는 이를 enforced configuration이 아니라 context로 다룬다고 설명한다. 같은 문서는 "The more specific and concise your instructions, the more consistently Claude follows them"이라고 적고, longer files consume more context and reduce adherence라고 설명한다([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)).

문서로 확인 가능한 사실: OpenAI의 `Prompt caching` 문서는 cache hit가 exact prefix match에서만 가능하며, static content는 앞에 두고 variable content는 뒤에 두라고 설명한다([OpenAI, Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)).

## 직접 재현한 결과

직접 재현 없음: 이번 글은 동일한 저장소와 동일한 작업에 대해 여러 형태의 압축 결과를 적용해, 어떤 정보가 빠질 때 실패 확률이 어떻게 올라가는지 정량 비교한 실험 글이 아니다. 2026-04-17 기준으로는 `Codex`, `Claude Code`, 기타 도구에 같은 작업을 반복 실행하면서 압축 방식별 품질 차이를 직접 측정하지 않았다.

따라서 이 글에서 제시하는 사례와 판단 질문은 특정 제품의 내부 compaction 결과를 그대로 인용한 것이 아니라, 공식 문서의 context growth, compaction, memory loading, prompt structuring 원리를 바탕으로 정리한 실무용 프레임이다. 사실로 적은 부분은 공식 문서가 직접 설명하는 loading / history growth / compaction / context behavior에 한정하고, 무엇을 남기고 무엇을 버릴지에 대한 기준은 다음 절에서 해석과 권고로 분리해 적는다.

## 해석 / 의견

내 판단으로는, 좋은 압축과 나쁜 압축의 가장 큰 차이는 길이가 아니라 우선순위에 있다. 좋은 압축은 현재 작업을 제어하는 정보를 남긴다. 현재 목표, 핵심 제약, 검증 기준, 실패 이력 중 재발 방지에 중요한 것, 현재 작업 범위는 길지 않아도 반드시 살아 있어야 한다. 반대로 장황한 배경 설명, 이미 끝난 논의의 세부 과정, 반복되는 운영 문구, 긴 로그 전문, 이미 반영된 완료 이력은 줄이거나 버려도 되는 경우가 많다. 이런 정보는 기록 저장소에는 남길 수 있지만, live context에 계속 붙어 있을 필요는 없다.

이 차이를 사례로 보면 더 분명해진다. 예를 들어 auth 모듈 수정 작업이 있다고 해보자. 나쁜 압축은 아래처럼 되기 쉽다.

```md
현재 auth 관련 문제를 다루고 있고, 여러 논의를 거쳐 원인을 좁히는 중이다.
이전에도 비슷한 이슈가 있었으니 신중하게 접근한다.
테스트도 중요하니 수정 후 확인이 필요하다.
```

이 텍스트는 짧아 보이지만, 실제로는 중요한 것이 거의 남아 있지 않다. 무엇이 현재 목표인지, 무엇을 수정하면 안 되는지, 어떤 테스트가 검증 기준인지, 이전 실패에서 무엇을 반복하면 안 되는지가 드러나지 않는다. 반대로 좋은 압축은 아래처럼 될 수 있다.

```md
- 현재 목표: auth 테스트 실패 수정
- 현재 작업 범위: `src/auth.ts`, `tests/auth.test.ts`만 수정
- 핵심 제약: DB schema 변경 금지, public API 유지
- 검증 기준: `tests/auth.test.ts` 통과, 관련 회귀 테스트 재실행
- 재발 방지 포인트: 이전 시도에서 fixture 차이를 놓쳐 원인 추정이 틀렸음
```

이 요약은 더 짧아서 좋은 것이 아니라, 다음 행동을 바꾸는 정보가 더 선명하게 살아 있어서 좋다. 좋은 압축은 현재 state의 밀도를 높인다. 나쁜 압축은 길이를 줄이면서 핵심 제약도 함께 깎아 버린다.

압축이 잘못되면 어떤 문제가 생기는지도 이 지점에서 드러난다. 첫째, 핵심 제약 유실이 생긴다. public API를 바꾸면 안 되는 작업인데 그 문장이 빠지면, agent는 더 쉬운 해결책처럼 보이는 interface 변경을 다시 시도할 수 있다. 둘째, 잘못된 재시도가 반복된다. 과거 실패에서 정말 중요한 한 줄, 예를 들어 "이전 실패 원인은 fixture mismatch였음"이 빠지면, 이미 틀렸던 가설을 다시 따라가게 된다. 셋째, 반복 실패가 생긴다. 검증 기준이 빠지면 수정을 끝냈다고 착각하지만 실제 회귀는 남을 수 있다. 넷째, 작업 경계가 무너진다. 어디까지 손대도 되는지 사라지면 현재 범위 밖 파일까지 수정이 퍼지기 쉽다.

그래서 압축은 삭제와 구분해 봐야 한다. 삭제는 텍스트를 없애는 행위 자체다. 압축은 남겨야 할 정보의 형태를 바꾸는 일에 더 가깝다. 긴 build log 전문을 한 줄의 실패 요약과 관련 파일, 다음 행동으로 바꾸는 것은 좋은 압축이 될 수 있다. 하지만 그 과정에서 에러 종류나 재현 조건까지 같이 사라지면 나쁜 압축이 된다. 이미 끝난 논의 전체를 버리는 것은 괜찮을 수 있다. 하지만 그 논의 끝에서 확정된 제약까지 함께 사라지면 안 된다. 결국 핵심은 문장의 수가 아니라, 현재 작업을 잘못 수행하게 만들 수 있는 정보를 남겼는가에 있다.

실무에서 이 판단은 완벽한 규칙집보다 몇 가지 질문으로 더 잘 작동한다. 내가 자주 쓰게 되는 질문은 아래와 같다.

- 이 정보가 없으면 지금 작업을 잘못 수행할 가능성이 있는가?
- 이 정보는 현재 목표나 작업 범위를 직접 바꾸는가?
- 이 정보는 검증 기준이나 금지사항처럼 반드시 지켜야 할 제약인가?
- 이 정보는 이전 실패를 반복하지 않게 막아주는가?
- 이 정보는 이미 코드나 상태 문서에 반영된 완료 이력의 반복인가?
- 이 정보는 원문 전문이 꼭 필요한가, 아니면 요약된 사실만으로 충분한가?
- 이 정보는 사람이 이해하기에는 유용하지만 모델의 다음 행동에는 직접 필요하지 않은가?

이 질문들로 보면, 무엇을 남기고 무엇을 줄일지 기준이 조금 더 선명해진다. 현재 목표, 핵심 제약, 검증 기준, 재발 방지에 중요한 실패 이력, 현재 작업 범위는 대체로 살아 있어야 한다. 반대로 장황한 배경 설명, 이미 끝난 논의의 세부 과정, 반복되는 운영 문구, 긴 로그 전문, 이미 반영된 완료 이력은 줄이거나 archive로 내릴 가능성이 높다.

내 의견으로는, 좋은 압축은 더 적게 남기는 기술이 아니라 더 중요한 것을 앞에 남기는 기술이다. 텍스트를 가볍게 만들었는데 실행은 더 자주 흔들린다면, 그것은 절약이 아니라 손실이다. 반대로 핵심 state와 제약은 그대로 살아 있고, 설명과 반복만 줄었다면 그 압축은 실제로 품질을 높이는 방향에 가깝다.

## 한계와 예외

이 글이 모든 작업에서 같은 정보가 반드시 남아야 한다고 주장하는 것은 아니다. 보안이나 규제 요구가 강한 환경에서는 실패 이력과 검증 기준의 상세 수준이 더 높아질 수 있고, 멀티에이전트 작업에서는 범위와 handoff 관련 정보가 더 중요해질 수 있다. 즉, 남길 정보의 목록은 도메인과 작업 성격에 따라 달라질 수 있다.

또한 어떤 정보는 평소에는 줄여도 되지만, 특정 시점에는 원문이 필요할 수 있다. 예를 들어 복잡한 장애 분석이나 flaky test 조사처럼 원문 로그가 실제 판단에 필요해지는 경우가 있다. 중요한 것은 그 원문이 영구적으로 live context에 남아 있어야 한다는 뜻이 아니라, 필요할 때 다시 참조 가능한 archive나 file reference가 있어야 한다는 점이다.

마지막으로, 도구마다 compaction과 memory 전략은 다르다. 어떤 시스템은 요약을 더 공격적으로 하고, 어떤 시스템은 오래된 history를 더 길게 유지한다. 이 글은 2026-04-17 기준 공개 문서에서 확인 가능한 공통 원리와 그 위의 운영 해석만 다뤘다. 실제로 어느 정도까지 줄여도 되는지는 저장소, 작업 크기, 도구 특성에 따라 직접 조정이 필요하다.

여기까지 오면 자연스럽게 다음 질문이 남는다. 같은 원칙으로 압축과 상태 관리를 한다고 해도, 실제 운영에서는 도구마다 토큰이 타는 방식과 줄이는 방식이 조금씩 다르지 않을까. 예를 들어 `Codex`는 instruction chain과 compaction 구조가 보이고, `Claude Code`는 memory와 project instruction loading 방식이 다르게 보인다. 다음 글에서는 `Codex와 Claude Code에서 토큰 관리 전략은 어떻게 달라지는가`를 다루며, 같은 하네스 원칙이 도구별로 어떤 운영 차이를 만드는지 더 구체적으로 이어가 보겠다.

## 참고자료

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
- OpenAI, [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
