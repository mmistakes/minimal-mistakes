---
layout: single
description: "AGENTS.md, CLAUDE.md, 시스템 프롬프트가 왜 쉽게 비대해지고 토큰 낭비와 실행 품질 저하를 함께 만드는지 구조적으로 설명한 글."
title: "토큰 관리 02. 토큰을 태우는 AGENTS.md, CLAUDE.md, 시스템 프롬프트의 공통 문제"
lang: ko
translation_key: why-agents-md-claude-md-and-system-prompts-burn-tokens
date: 2026-04-21 00:00:00 +0900
section: development
topic_key: token-management
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, token-management, agents-md, system-prompt]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

많은 팀은 agent의 품질을 높이기 위해 `AGENTS.md`, `CLAUDE.md`, 시스템 프롬프트를 계속 보강한다. 문제는 문서를 더 많이 쓰는 것 자체가 아니라, 서로 다른 역할의 문서를 같은 계층에 쌓아두는 방식이 토큰 낭비와 실행 품질 저하를 함께 만든다는 점이다. 같은 규칙이 여러 레이어에서 반복되고, 사람을 위한 설명과 모델 실행 문서가 섞이고, 현재 작업과 무관한 배경까지 매번 주입되면 문서는 가이드가 아니라 상시 비용이 된다.

이 글은 문서의 존재를 부정하려는 글이 아니다. 오히려 좋은 문서는 필요하다는 전제를 두고, 무엇이 좋은 문서 구조이고 무엇이 나쁜 문서 구조인지를 구분해보려 한다. 핵심은 길이를 무조건 줄이는 데 있지 않고, 역할을 분리하고 계층을 나누는 데 있다.

## 문서 정보

- 작성일: 2026-04-16
- 검증 기준일: 2026-04-16
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. OpenAI, Anthropic 공식 문서를 바탕으로 한 구조 분석.
- 테스트 버전: OpenAI Codex / API 문서 2026-04-16 확인본, Anthropic Claude Code 문서 2026-04-16 확인본

## 문제 정의

지난 글에서 토큰 관리는 비용 절감이 아니라 제어의 문제라고 정리했다. 그렇다면 실제 운영에서 토큰을 가장 조용히, 그러나 꾸준히 태우는 레이어는 어디일까. 많은 경우 답은 모델 자체보다, agent가 시작할 때 반복적으로 읽는 운영 문서와 시스템 수준 지시다. `AGENTS.md`, `CLAUDE.md`, 시스템 프롬프트는 이름과 위치는 달라도 공통점이 있다. 현재 세션이 시작될 때 agent의 행동을 방향짓는 상시 문맥이라는 점이다.

바로 이 이유 때문에 이 레이어는 쉽게 비대해진다. 한번 실수가 나면 금지 규칙이 추가되고, 팀이 늘어나면 배경 설명이 붙고, 새로운 도구가 들어오면 주의사항이 더해진다. 그 자체는 이해할 만한 대응이다. 하지만 문제는 이런 내용이 대부분 기존 구조를 다시 설계하는 방식이 아니라, 이미 있는 entrypoint 문서에 문장을 덧붙이는 방식으로 누적된다는 점이다. 그러면 문서는 저장소 안내문, 실행 규칙, 운영 철학, 온보딩 자료, 장애 회고, 금지 목록을 한 번에 떠안게 된다. 이 글에서는 바로 그 구조가 왜 토큰 낭비와 실행 품질 저하를 동시에 만드는지 보려 한다.

## 확인된 사실

문서로 확인 가능한 사실: OpenAI의 `Custom instructions with AGENTS.md` 문서는 Codex가 `AGENTS.md`를 "before doing any work" 읽는다고 설명하며, 전역 지침과 프로젝트 지침을 레이어로 결합해 시작 시 일관된 기대치를 주는 방식으로 소개한다. 같은 문서는 Codex가 여러 디렉터리의 instruction file을 root에서 current working directory까지 concatenation하고, 결합 크기가 `project_doc_max_bytes` 한도에 닿으면 추가를 멈춘다고 설명한다. 기본 한도는 32 KiB다([OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)).

문서로 확인 가능한 사실: OpenAI의 `Harness engineering: leveraging Codex in an agent-first world`는 "one big `AGENTS.md`" 접근이 예측 가능한 방식으로 실패했다고 설명한다. 그 이유로 이 글은 context scarcity, 중요 제약의 crowd-out, stale rule 누적, mechanical verification의 어려움을 든다. 이어서 OpenAI는 giant instruction file 대신 roughly 100 lines 수준의 짧은 `AGENTS.md`를 table of contents처럼 쓰고, deeper source of truth는 구조화된 `docs/`로 분리한다고 설명한다([OpenAI, Harness engineering](https://openai.com/index/harness-engineering/)).

문서로 확인 가능한 사실: Anthropic의 `How Claude remembers your project` 문서는 Claude Code 세션이 fresh context window로 시작하며, `CLAUDE.md`와 auto memory 두 메커니즘이 모두 "loaded at the start of every conversation"된다고 설명한다. 같은 문서는 `CLAUDE.md`를 context로 취급하고 enforced configuration은 아니라고 밝히며, "The more specific and concise your instructions, the more consistently Claude follows them"이라고 적는다([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)).

문서로 확인 가능한 사실: Anthropic의 같은 문서는 `CLAUDE.md`에 every session에서 유지되어야 할 사실만 남기고, multi-step procedure이거나 codebase 일부에만 필요한 내용은 skill이나 path-scoped rule로 옮기라고 권장한다. 또 `CLAUDE.md`는 길이에 상관없이 full load되지만, shorter files produce better adherence라고 설명하고, 200 lines 아래를 목표로 하며 longer files consume more context and reduce adherence라고 적는다([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)).

문서로 확인 가능한 사실: Anthropic의 `Claude Code settings` 문서는 `includeGitInstructions` 설정이 built-in commit/PR workflow instructions와 git status snapshot을 Claude의 system prompt에 포함한다고 설명한다([Anthropic, Claude Code settings](https://code.claude.com/docs/en/settings)).

문서로 확인 가능한 사실: OpenAI의 `Prompt caching` 문서는 system prompts와 common instructions처럼 repetitive content가 있을 때 latency를 최대 80%, input token cost를 최대 90% 줄일 수 있다고 설명한다. 다만 cache hit는 exact prefix match에서만 가능하며, 정적 내용은 앞에 두고 가변 내용은 뒤에 두라고 권장한다([OpenAI, Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)).

## 직접 재현한 결과

직접 재현 없음: 이번 글은 특정 팀의 실제 `AGENTS.md`, `CLAUDE.md`, 시스템 프롬프트를 수집해 토큰 수와 품질 저하를 정량 비교한 벤치마크 글이 아니다. 2026-04-16 기준으로는 동일한 저장소와 작업을 여러 도구에 반복 실행하면서 문서 구조에 따른 비용, 지연, 준수율 차이를 직접 측정하지 않았다.

다만 이 글에서 제시하는 짧은 예시는 임의로 만들어낸 패턴 비교이며, 특정 벤더 문서나 특정 팀 내부 프롬프트를 그대로 옮긴 것은 아니다. 사실로 적은 부분은 공식 문서가 직접 설명하는 로딩 방식, 길이 권고, 계층화 방식, 상시 주입 특성에 한정하고, 예시와 설계 해석은 다음 절에서 분리해 적는다.

## 해석 / 의견

내 판단으로는, 에이전트 운영 문서가 비대해지는 가장 전형적인 이유는 문서가 실패 후 패치의 저장소가 되기 때문이다. 테스트를 빼먹은 일이 있으면 "항상 테스트하라"가 추가되고, 리뷰 누락이 생기면 "반드시 검토 포인트를 적어라"가 붙고, 새 팀원이 헷갈렸던 배경이 있으면 역사 설명이 덧붙는다. 각각의 추가는 합리적이지만, 시간이 지나면 문서는 현재 작업을 움직이기 위한 실행 규칙보다, 과거의 실수와 조직의 불안을 덧붙여 놓은 집합에 가까워진다.

여기서 가장 흔한 첫 번째 문제는 같은 규칙이 여러 계층에서 반복되는 구조다. 시스템 프롬프트에도 있고, `AGENTS.md`에도 있고, `CLAUDE.md`에도 있는 규칙은 토큰을 세 번 쓰는데 정보는 한 번만 늘어난다. 더 중요한 문제는 어느 계층이 기준인지 흐려진다는 점이다. 표현만 살짝 다른 중복 규칙은 agent에게 더 강한 제약을 주는 것이 아니라, 우선순위가 불분명한 비슷한 문장을 여러 번 읽게 만든다.

나쁜 예시 1은 이런 반복 구조다.

```md
시스템 프롬프트
- 변경 후 테스트를 실행하고 결과를 보고하라

AGENTS.md
- 모든 코드 수정 후 테스트를 돌리고 요약하라

CLAUDE.md
- 파일을 수정했다면 반드시 테스트를 수행하고 결과를 남겨라
```

이 패턴이 나쁜 이유는 세 문장이 거의 같은 역할을 하기 때문이다. 표현이 조금 다른 중복은 준수율을 높이기보다, 어떤 레이어를 진짜 source of truth로 봐야 하는지를 흐린다.

두 번째 문제는 사람을 위한 문서와 모델 실행 문서가 분리되지 않는다는 점이다. 사람에게는 유용한 배경 설명, 팀의 개발 문화, 과거 회고, 협업 철학이 현재 작업과 직접 관련이 없더라도, 런타임 문서에 들어 있으면 매 세션마다 상시 주입된다. 이것은 정보가 풍부한 상태가 아니라, 실행에 필요한 지시와 사람용 설명이 한 working memory에서 경쟁하는 상태에 가깝다.

나쁜 예시 2는 이런 혼합 구조다.

```md
AGENTS.md
- 우리 팀이 지난 2년간 어떤 방식으로 개발 문화를 바꿔왔는지
- 왜 장기적으로 문서 중심 운영에서 벗어나려 하는지
- 과거 장애에서 배운 문화적 교훈
- 실제 실행 규칙: migrations/ 변경은 승인 없이는 금지
```

이 구조가 나쁜 이유는 마지막 한 줄의 핵심 제약이 앞선 장문의 배경과 같은 밀도로 섞여 있기 때문이다. 사람은 읽으며 구분할 수 있지만, agent에게는 모두 같은 컨텍스트 비용으로 들어간다.

세 번째 문제는 현재 작업과 무관한 배경까지 매번 주입된다는 점이다. 어떤 agent가 지금 결제 모듈의 작은 수정 하나를 하는데도, 매 세션마다 조직 구조, 장기 제품 전략, 전체 아키텍처 역사, 지난 분기 운영 원칙이 함께 들어간다면 문맥은 넓어지지만 선명해지지는 않는다. 네 번째 문제는 금지사항과 운영 철학이 지나치게 장문화된다는 점이다. 중요한 금지 규칙 몇 줄이면 충분한 곳에 "책임감 있게 생각하라", "신중하게 움직여라", "항상 프로젝트의 장기적 방향을 고려하라" 같은 추상 문장이 길게 반복되면, 실제로 검증 가능한 제약은 오히려 묻힌다. 다섯 번째 문제는 결국 긴 문서가 핵심 제약을 묻어버린다는 점이다. 중요한 한 줄이 덜 중요해지는 방식으로 길이가 늘어나면, 그 문서는 설명은 많지만 제어는 약한 문서가 된다.

이 문제는 `AGENTS.md`, `CLAUDE.md`, 시스템 프롬프트의 이름이 서로 달라도 공통으로 발생한다. 세 레이어 모두 모델 실행 가까이에 있는 startup context이기 때문이다. OpenAI 문서에서는 `AGENTS.md`가 시작 전에 읽히고 root에서 current directory까지 합쳐진다. Anthropic 문서에서는 `CLAUDE.md`가 every session에서 읽히고 길어질수록 adherence가 떨어질 수 있다고 말한다. 시스템 프롬프트 역시 도구 기본 워크플로 지시와 상태 스냅샷을 담을 수 있다. 즉, 파일명이 무엇이든 상시 주입되는 문서는 쉽게 비대해지고, 일단 비대해지면 매 턴 같은 비용을 반복해서 낸다.

그래서 이 글의 결론은 "문서를 줄여라"가 아니다. 더 정확한 결론은 역할을 분리하고 계층을 나누라는 것이다. 상시 entrypoint에는 항상 필요한 핵심 제약만 두고, 사람용 배경 설명은 사람용 문서로 보내고, 특정 디렉터리나 특정 작업에만 필요한 규칙은 path-scoped rule이나 하위 문서로 내리고, 반복 검증 규칙은 hook, CI, schema, eval 같은 바깥 레이어로 올리는 편이 낫다.

좋은 예시 1은 상시 문서와 상세 문서를 나누는 패턴이다.

```md
AGENTS.md
- 이 저장소의 핵심 제약은 승인 경계, 출력 형식, 참조 경로다
- 검증 절차는 @docs/verification.md를 본다
- payments/ 하위 규칙은 payments/AGENTS.override.md를 본다
```

이 구조가 좋은 이유는 entrypoint가 짧고 선명하기 때문이다. 핵심은 항상 남기되, 상세 절차는 필요할 때 읽는 구조로 밀어냈다.

좋은 예시 2는 사람용 문서와 모델용 문서를 분리하는 패턴이다.

```md
team-handbook.md
- 배경, 팀 역사, 운영 철학, 사례

CLAUDE.md
- 항상 필요한 제약만 유지
- 특정 영역 규칙은 .claude/rules/ 아래로 분리
- 긴 절차는 skill 또는 별도 문서 참조
```

이 구조가 좋은 이유는 문서를 없애지 않으면서도 각 문서의 목적을 분명히 했기 때문이다. 사람을 위한 설명은 보존되고, 모델이 항상 읽어야 하는 런타임 문서는 더 작고 검증 가능해진다.

내 의견으로는, 좋은 문서 구조의 기준은 길이가 아니라 역할 선명도다. 작은 문서라도 배경과 규칙이 섞여 있으면 나쁜 구조가 될 수 있고, 긴 문서라도 필요할 때만 읽히는 참조 문서라면 큰 문제가 아닐 수 있다. 중요한 것은 어떤 정보가 상시 컨텍스트에 들어가야 하고, 어떤 정보는 필요할 때만 불러오면 되는지를 구분하는 일이다. 하네스 엔지니어링에서 문서 품질은 문장 수가 아니라 계층 구조로 평가하는 편이 더 정확하다.

## 한계와 예외

이 글이 모든 운영 문서는 짧아야 한다고 주장하는 것은 아니다. 규제 요건이 강한 조직, 복잡한 보안 경계가 있는 저장소, 다수 팀이 동시에 작업하는 대형 코드베이스에서는 문서 자체가 길어질 수 있다. 중요한 것은 길이보다 상시 주입 범위다. 참조 문서가 길어도 필요할 때만 읽힌다면 문제는 훨씬 줄어든다.

또한 각 도구의 system prompt 구성 방식, instruction loading 방식, prompt caching 효과, rules 지원 범위는 버전과 제품에 따라 달라질 수 있다. 이 글은 2026-04-16 기준 공개 문서에서 확인 가능한 공통 특성만 다뤘다. 특정 팀의 실제 문서 구조가 어느 시점부터 품질 저하를 만드는지는 별도 운영 측정이 필요하다.

여기서 다음 병목이 자연스럽게 이어진다. 상시 문서를 줄이고 나서도 컨텍스트는 계속 불어난다. 실제 운영에서는 긴 로그, 긴 계획, 긴 memory, 과거 handoff와 상태 요약이 또 다른 비대화 원인이 된다. 다음 글에서는 `긴 로그, 긴 계획, 긴 메모리: 에이전트 컨텍스트 비대화의 원인`을 다루며, 정적 문서 바깥에서 컨텍스트가 어떻게 누적되고 왜 그 누적이 지연과 품질을 함께 흔드는지 이어서 보려 한다.

## 참고자료

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
- OpenAI, [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- Anthropic, [Claude Code settings](https://code.claude.com/docs/en/settings)
