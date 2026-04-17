---
layout: single
description: "토큰 관리를 비용 절약이 아니라 agent 시스템의 안정성, 지연, 문맥 제어 문제로 설명한 글."
title: "토큰 관리 01. 왜 하네스 엔지니어링에서 토큰 관리가 중요한가"
lang: ko
translation_key: why-token-management-matters-in-harness-engineering
date: 2026-04-20 00:00:00 +0900
section: development
topic_key: token-management
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, token-management, context-window]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

## 요약

토큰은 API 사용량을 계산하는 숫자처럼 보이지만, agent 시스템 안에서는 훨씬 더 중요한 의미를 가진다. 시스템 프롬프트, `AGENTS.md`, 상태 요약, 이전 대화, tool output, 첨부 문서가 모두 같은 context window 안에서 경쟁하기 때문이다. 그래서 하네스 엔지니어링에서 토큰 관리는 단순한 비용 절감 팁이 아니라, agent가 얼마나 안정적으로 지시를 유지하고, 얼마나 빠르게 응답하고, 얼마나 일관되게 작업을 이어갈 수 있는지를 좌우하는 설계 문제에 가깝다.

긴 컨텍스트가 항상 더 좋은 결과를 보장하지 않는다는 점도 여기서 중요해진다. 문맥이 많아질수록 필요한 정보가 풍부해질 수도 있지만, 동시에 중요한 지시가 희석되고 불필요한 과거 정보가 끼어들 가능성도 커진다. 이번 글에서는 왜 토큰 관리가 하네스 엔지니어링의 핵심 제어 변수인지 정리해보려 한다.

## 문서 정보

- 작성일: 2026-04-16
- 검증 기준일: 2026-04-16
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. OpenAI, Anthropic 공식 문서와 ACL Anthology 논문을 바탕으로 한 구조 분석.
- 테스트 버전: OpenAI 공식 문서 2026-04-16 확인본, Anthropic 공식 문서 2026-04-16 확인본, `Lost in the Middle` 2024 논문

## 문제 정의

토큰 절약을 말할 때 흔히 떠올리는 접근은 "프롬프트를 조금 짧게 쓰자"에 머문다. 하지만 `Codex`, `Claude Code`, 기타 agentic coding 도구의 실제 작동을 보면, 한 번의 추론에 들어가는 토큰은 사용자 프롬프트만으로 이루어지지 않는다. 시스템 지시, 프로젝트 지침 파일, 이전 대화, tool 결과, 상태 요약, 참조 문서, 구조화된 출력 스키마가 모두 함께 들어간다. 즉, 토큰은 문장 몇 줄을 줄이느냐의 문제가 아니라, agent가 작업 중 무엇을 보고 무엇을 놓칠지와 직접 연결된다.

그래서 하네스 엔지니어링에서 토큰 관리는 비용 계산보다 먼저 시스템 설계 문제로 다뤄야 한다. 토큰이 불필요하게 늘어나면 비용이 오르는 것은 당연한 결과다. 하지만 실제 운영에서 더 먼저 드러나는 문제는 응답 지연, 중요한 지시의 희석, 과거 문맥의 불필요한 개입, 상태 추적 실패 가능성 증가다. 특히 agent가 여러 차례 tool call과 요약을 거치며 긴 세션을 이어갈 때는, "무엇을 컨텍스트에 남기고 무엇을 바깥으로 밀어낼 것인가"가 안정성과 일관성을 좌우한다.

## 확인된 사실

문서로 확인 가능한 사실: OpenAI의 `Unrolling the Codex agent loop`에 따르면, 기존 대화에서 새 메시지를 보낼 때 이전 메시지와 tool call 이력이 다음 턴의 프롬프트에 다시 포함된다. 이 글은 대화가 길어질수록 프롬프트 길이도 함께 늘어나며, context window는 입력과 출력 토큰을 모두 포함하는 한정된 자원이라고 설명한다([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)). 같은 글은 Codex가 이 한계를 다루기 위해 일정 임계값을 넘으면 conversation compaction을 수행한다고 밝힌다.

문서로 확인 가능한 사실: Anthropic의 `Context windows` 문서는 context window를 모델의 "working memory"에 해당하는 영역으로 설명하며, 더 큰 컨텍스트가 자동으로 더 나은 결과를 주는 것은 아니라고 명시한다. 같은 문서는 토큰 수가 커질수록 accuracy와 recall이 저하되는 `context rot`가 나타날 수 있다고 안내한다([Anthropic, Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)).

문서로 확인 가능한 사실: Anthropic의 같은 문서는 Claude Sonnet 3.7 이후 모델이 prompt와 output token 합이 context window를 넘으면 조용히 잘라내지 않고 validation error를 반환한다고 설명한다([Anthropic, Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)).

문서로 확인 가능한 사실: OpenAI의 `Prompt caching` 문서는 반복되는 system prompt나 공통 지시가 있을 때 Prompt Caching이 latency를 최대 80%, input token cost를 최대 90% 줄일 수 있다고 설명한다. 같은 문서는 cache hit를 얻으려면 정적 내용은 프롬프트 앞에, 가변 내용은 뒤에 두라고 권장한다([OpenAI, Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)).

문서로 확인 가능한 사실: OpenAI의 `Latency optimization` 문서는 입력 토큰을 줄이면 지연이 줄어들지만, 일반적으로는 그 효과가 크지 않을 수 있으며, 문서나 이미지처럼 매우 큰 컨텍스트를 다룰 때 더 중요해진다고 설명한다([OpenAI, Latency optimization](https://developers.openai.com/api/docs/guides/latency-optimization)).

문서로 확인 가능한 사실: OpenAI의 `Harness engineering: leveraging Codex in an agent-first world`는 거대한 하나의 `AGENTS.md` 접근이 실패한 이유로 context scarcity, 중요 지시의 희석, stale rule 누적, 기계적 검증 어려움을 들고 있다. 이 글은 큰 지침 파일이 task, code, relevant docs를 밀어내 agent가 잘못된 제약에 최적화하게 만들 수 있다고 설명한다([OpenAI, Harness engineering](https://openai.com/index/harness-engineering/)).

문서로 확인 가능한 사실: Anthropic의 `Prompting best practices` 문서는 20K 토큰 이상 긴 문맥에서 longform data를 프롬프트 상단에 두고 query를 끝에 두면 복잡한 다중 문서 입력에서 응답 품질이 최대 30% 개선될 수 있다고 안내한다([Anthropic, Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#long-context-prompting)).

문서로 확인 가능한 사실: Claude Code의 MCP 문서는 대형 MCP output이 대화 컨텍스트를 압도하지 않도록 경고 임계값과 기본 제한을 두고, 한도를 넘는 결과는 파일 참조로 바꾸거나 도구 설명을 지연 로딩하는 방식으로 context usage를 줄인다고 설명한다([Anthropic, Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)).

문서로 확인 가능한 사실: `Lost in the Middle` 논문은 관련 정보가 긴 입력의 중간에 있을 때 성능이 유의미하게 떨어질 수 있으며, 시작 또는 끝에 있을 때 성능이 더 높은 경향을 관찰했다고 보고한다([Liu et al., 2024](https://aclanthology.org/2024.tacl-1.9/)).

## 직접 재현한 결과

직접 재현 없음: 이번 글은 특정 모델의 token budget을 동일 작업에서 벤치마크하는 실험 글이 아니라, 공개 문서와 연구 결과를 바탕으로 하네스 관점의 공통 구조를 정리하는 분석 글이다. 따라서 2026-04-16 기준으로 `Codex`, `Claude Code`, 기타 도구에 동일한 저장소와 동일한 작업을 반복 실행해 비용, 지연, 품질, 상태 유지력을 직접 비교 측정하지는 않았다.

다만 직접 재현이 없다고 해서 범위를 넓게 주장하려는 것은 아니다. 이 글에서 사실로 적은 부분은 각 도구의 공식 문서가 직접 설명하는 동작에 한정했다. 예를 들어 conversation history 누적, compaction, prompt caching, tool output limit, long-context degradation 가능성 같은 항목만 사실로 다루고, 그 위의 설계 해석은 다음 절에서 분리해 적는다.

## 해석 / 의견

내 판단으로는, 하네스 엔지니어링에서 토큰 관리는 최적화가 아니라 제어의 문제다. 최적화라는 말은 보통 이미 정해진 구조를 조금 더 효율적으로 다듬는 느낌을 준다. 하지만 실제 agent 시스템에서는 애초에 어떤 정보를 context에 넣고, 어떤 정보를 파일 참조나 요약으로 넘기고, 어떤 정보는 다음 턴에 만료시킬지를 정해야 한다. 이 결정이 곧 시스템의 행동 범위를 만든다. 그래서 토큰 관리는 "덜 쓰면 좋다" 수준의 미세 조정이 아니라 "무엇을 보이게 하고 무엇을 치울 것인가"를 정하는 제어 설계에 가깝다.

이 관점에서 보면, 토큰이 많아질수록 생기는 문제도 비용 하나로 설명되지 않는다. 물론 input과 output 토큰이 늘면 비용은 증가한다. 하지만 현장에서 더 자주 체감되는 것은 응답 지연과 문맥 품질 저하다. 긴 세션일수록 매 턴 더 많은 히스토리와 tool 결과를 다시 읽어야 하고, 요약이나 compaction이 늦어지면 중요한 현재 지시보다 오래된 맥락이 더 크게 보일 수 있다. 지침 파일이 너무 길어지면 핵심 규칙이 오히려 묻히고, 대형 로그나 분석 결과를 그대로 붙이면 현재 작업과 상관없는 문맥이 새 응답에 끼어들 수 있다. 그 결과 agent는 필요한 정보를 더 많이 가진 상태가 아니라, 서로 경쟁하는 단서들 사이에서 덜 선명하게 판단하는 상태에 들어가기 쉽다.

그래서 "긴 프롬프트 = 더 똑똑한 결과"라는 직관은 agent 운영에서는 자주 틀린다. 모델이 더 많은 정보를 보게 되면 도움이 될 수는 있다. 하지만 그 정보가 지금 작업에 필요한 구조로 정리되어 있지 않다면, 긴 프롬프트는 오히려 중요 지시를 희석시키고 상태 추적을 어렵게 만든다. 예를 들어 현재 해야 할 작업이 1,500토큰짜리 수정 지시인데, 그 앞뒤에 오래된 handoff, 중복된 운영 원칙, 지난 실행의 로그, 이미 끝난 실험 메모가 수만 토큰 붙어 있다면, 그 세션은 풍부한 문맥을 가진 것이 아니라 혼합된 문맥을 가진 상태에 더 가깝다.

이 점은 `Codex`, `Claude Code`, 다른 agentic coding 도구에도 공통으로 적용된다. 제품별 구현은 다르다. 어떤 도구는 compaction을 적극적으로 쓰고, 어떤 도구는 tool schema를 지연 로딩하고, 어떤 도구는 output 한도를 넘으면 파일 참조로 바꾼다. 하지만 공통 구조는 동일하다. 시스템 프롬프트, 프로젝트 규칙, 상태, tool output, 대화 이력은 모두 같은 working memory를 두고 경쟁한다. 따라서 모델 성능만 높인다고 해결되지 않고, 하네스가 어떤 레이어를 언제 context에 올릴지 설계해야 안정성이 생긴다.

내 의견으로는, 좋은 토큰 관리는 "프롬프트를 짧게 쓰는 기술"이 아니라 "문맥을 계층화하는 기술"에 더 가깝다. 짧아야 할 것은 entrypoint이고, 길어도 되는 것은 필요할 때만 불러오는 참조 문서여야 한다. 계속 살아 있어야 하는 것은 현재 작업 상태와 핵심 제약이고, 오래 남기면 안 되는 것은 이미 효력을 다한 로그와 중복 지시다. 이 구분이 없으면 토큰은 단지 많이 쓰이는 것이 아니라, 시스템을 덜 통제 가능하게 만든다.

## 한계와 예외

이 글이 "항상 짧을수록 좋다"를 주장하는 것은 아니다. 대규모 리팩터링, 긴 사양 검토, 다수 파일 간 의존성 파악처럼 실제로 넓은 문맥이 필요한 작업도 분명히 있다. 필요한 정보를 너무 공격적으로 줄이면 재질문, 추가 tool call, 잘못된 추론이 늘어날 수 있다. 따라서 토큰 관리의 목표는 무조건 감축이 아니라, 필요한 문맥을 구조적으로 유지하면서 불필요한 문맥을 제거하는 데 있다.

또한 각 도구의 context window 크기, compaction 정책, caching 방식, tool output 처리 방식은 모델과 버전에 따라 달라질 수 있다. 이 글은 2026-04-16 기준 공개 문서에서 공통으로 확인할 수 있는 범위만 다뤘다. 따라서 특정 저장소, 특정 모델, 특정 세션 길이에서 정확히 어느 시점부터 품질이 무너지는지 같은 운영 임계값은 별도 측정이 필요하다.

여기서 다음 질문이 자연스럽게 나온다. 실제 운영에서 token budget을 가장 빨리 태우는 것은 무엇일까. 많은 경우 답은 모델 자체보다, 너무 많은 역할을 떠안은 `AGENTS.md`, `CLAUDE.md`, 시스템 프롬프트, 그리고 매 턴 중복으로 붙는 상태 요약에 있다. 다음 글에서는 바로 그 지점을 다뤄보려 한다. 왜 이 레이어들이 서로를 중복시키고 중요한 지시를 희석시키는지, 그리고 어떻게 줄여야 하는지가 토큰 관리 시리즈의 다음 출발점이 된다.

## 참고자료

- OpenAI, [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
- OpenAI, [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
- OpenAI, [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- OpenAI, [Latency optimization](https://developers.openai.com/api/docs/guides/latency-optimization)
- Anthropic, [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)
- Anthropic, [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#long-context-prompting)
- Anthropic, [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)
- Liu et al., [Lost in the Middle: How Language Models Use Long Contexts](https://aclanthology.org/2024.tacl-1.9/)
