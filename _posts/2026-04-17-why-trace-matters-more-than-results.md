---
layout: single
title: "하네스 엔지니어링 08. 결과만으로는 부족하고 trace가 필요하다"
lang: ko
translation_key: why-trace-matters-more-than-results
date: 2026-04-17 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, trace]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

결과는 남았는데, 왜 그렇게 했는지는 모른다. 하네스 엔지니어링을 하다 보면 이 상황이 꽤 자주 문제로 떠오른다. 코드 결과물도 있고 실행 로그도 있는데, 왜 이 팀이 owner였는지, 왜 이 tool을 골랐는지, 왜 sub-agent에게 넘겼는지, 어느 지점에서 handoff가 실패했는지는 보이지 않는 경우다. 그래서 이번 글에서는 결과 로그와 trace 안의 판단 근거가 왜 다른지, 그리고 왜 trace가 있어야 개선이 가능해지는지 이야기해보려 한다.

## 검증 기준과 해석 경계

- 시점: 2026-04-15 기준 OpenAI Codex 문서, OpenAI 공식 API 문서, Anthropic Claude Code 문서를 확인했다.
- 출처 등급: 공식 문서 우선, 개념을 처음 소개한 vendor-authored 글만 보조로 사용했다.
- 사실 범위: `AGENTS.md`, memory/settings, hooks, subagents, approvals, sandboxing, eval, trace처럼 문서로 확인 가능한 기능만 사실로 적었다.
- 해석 범위: `harness engineering`, `control plane`, `contract`, `enforcement`, `observable harness` 같은 표현은 이 시리즈에서 쓰는 운영 개념이며, 별도 근거 줄이 없는 경우 필자의 해석이다.


## 결과 로그와 trace 안의 판단 근거의 차이

결과 로그는 보통 "무엇이 일어났는가"를 남긴다. 테스트가 통과했는지, 파일이 수정됐는지, 명령이 실행됐는지, 최종 산출물이 무엇인지 같은 정보가 여기에 들어간다. 이것만으로도 운영에 필요한 기본 기록은 남길 수 있다.
문서로 확인 가능한 사실: OpenAI는 Agents SDK 가이드에서 “full trace of what happened”를 설명하고, trace grading 가이드는 trace를 평가 입력으로 다룬다. 근거: [Agents SDK](https://developers.openai.com/api/docs/guides/agents-sdk), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading)

여기서 말하는 판단 근거 trace는 공식 표준 용어라기보다, trace 안에서도 owner 선택, tool 선택, handoff 시점 같은 의사결정 맥락을 가리키는 설명용 표현에 가깝다. 왜 인증 팀이 아니라 플랫폼 팀이 owner로 선택됐는지, 왜 grep 대신 특정 분석 도구를 썼는지, 왜 단일 agent로 끝내지 않고 sub-agent에게 넘겼는지, 왜 handoff를 그 시점에 만들었는지 같은 정보가 여기에 해당한다. 결과물 저장과 이런 판단 근거 추적은 비슷해 보여도 목적이 전혀 다르다.

## trace가 없을 때 생기는 운영 문제

trace가 약하면 실패 원인을 결과만 보고 추정해야 한다. 예를 들어 결과물은 남아 있는데 auth 관련 수정이 잘못된 팀으로 라우팅되었다고 해보자. 코드만 보면 "누가 이걸 맡았는가"는 알 수 있어도, 왜 그렇게 판단했는지는 모른다. 그러면 다음 개선은 규칙을 정교화하는 대신 사람의 추측에 기대게 된다.
해석: 이 절은 trace가 약할 때 원인 분석이 결과 추정에 머문다는 운영 문제를 설명한 부분이다. 문서로 확인 가능한 사실은 trace가 output만이 아니라 intermediate decision과 tool use까지 평가 재료가 된다는 점이다. 근거: [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading)

tool choice도 마찬가지다. 실행 로그에는 어떤 도구를 썼는지는 남을 수 있지만, 왜 그 도구를 골랐는지는 빠지기 쉽다. 그 이유가 남지 않으면 부적절한 선택이 반복되어도 하네스를 어떻게 고쳐야 할지 감이 약해진다. handoff 실패 역시 비슷하다. 결과만 보면 "정보가 부족했다"는 사실은 보여도, 어느 단계에서 누가 무엇을 넘기지 않았는지는 trace가 있어야 분해할 수 있다.

## 어떤 판단 근거를 남겨야 하는가

모든 생각을 장황하게 기록하자는 뜻은 아니다. 개선에 필요한 최소 판단 근거를 남기자는 뜻에 가깝다. 적어도 owner 선택 이유, tool 선택 이유, sub-agent 위임 여부와 이유, handoff 시점과 누락 여부, 범위 축소나 확장 판단 정도는 추적 가능해야 한다.
해석: owner 선택 이유, tool 선택 이유, sub-agent 위임 여부 같은 항목은 필자가 제안하는 최소 trace 필드다. 다만 OpenAI의 trace grading 문서는 trace에 reasoning process와 tool path를 담아 평가하는 방향을 공식적으로 제시한다. 근거: [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading), [Subagents](https://developers.openai.com/codex/subagents)

예를 들어 trace가 남아 있다면 "이 변경은 `payments/`와 `docs/payments.md`를 함께 건드리므로 결제 owner가 맡아야 한다" 같은 판단을 나중에 다시 볼 수 있다. 또 "sub-agent를 쓴 이유는 병렬 구현이 아니라 별도 도메인 문맥 분리가 필요했기 때문"이라는 흔적이 있으면, 멀티에이전트 사용이 정당했는지도 평가할 수 있다. 이런 trace는 디버깅용 메모가 아니라, 하네스 개선용 데이터에 가깝다.

## trace와 eval은 어떻게 연결되는가

trace는 eval의 재료가 된다. wrong-owner routing eval이 실패했을 때, trace가 있으면 owner 선택 근거가 잘못됐는지, ownership mapping이 낡았는지, 라우팅 규칙이 비어 있었는지를 더 빠르게 가를 수 있다. tool-choice eval도 마찬가지다. 결과만 보면 우연히 성공한 실행과 합리적으로 성공한 실행을 구분하기 어렵지만, trace가 있으면 그 차이를 평가할 수 있다.
문서로 확인 가능한 사실: OpenAI는 trace grading을 eval 기법으로 공식 문서화한다. 근거: [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading), [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)

예를 들어 한 작업에서 결과는 성공했지만 trace를 보니 불필요하게 sub-agent를 호출했고, handoff도 두 번 새면서 문서 갱신이 늦어졌다고 해보자. 이 경우 제품은 맞을 수 있지만 orchestration은 좋지 않았다. trace는 바로 이런 차이를 결과 바깥에서 드러내 준다.

## 내가 직접 느낀 trace의 부족함

나 역시 한동안은 실행 결과와 로그만 남으면 충분하다고 생각한 적이 있다. 무엇이 실행됐고, 마지막에 어떤 결과가 나왔는지를 알면 대체로 복기할 수 있다고 봤기 때문이다. 하지만 나중에 보니 더 중요한 것은 왜 그런 판단을 했는지가 남아 있는지였다. 그 흔적이 없으면 하네스를 개선하는 일은 결국 결과를 보고 추정하는 작업에 머물기 쉬웠다.

이 경험이 보여준 것은 trace가 있으면 편리하다는 수준이 아니었다. trace가 있어야만 실패를 구조적으로 고칠 수 있다는 점에 더 가까웠다.

## 마무리

결과물 저장과 실행 로그는 중요하다. 하지만 그것만으로는 agent 시스템을 충분히 이해할 수 없다. 하네스 엔지니어링은 결과뿐 아니라 판단 과정의 관측 가능성까지 포함하며, 바로 그 지점에서 trace는 디버깅과 평가, 개선의 핵심 자산이 된다.

다음 글에서는 이 흐름을 approval과 guardrail로 이어가 보려 한다. trace로 판단 과정을 본다면, 이제 어떤 판단은 아예 제한하거나 승인 흐름에 올려야 하기 때문이다.

## 이 글의 한 줄 요약

결과와 실행 로그만으로는 하네스를 개선하기 어렵고, 왜 그런 판단을 했는지 보여주는 trace가 있어야 실패 원인을 구조적으로 고칠 수 있다.

## 다음 글 예고

다음 편에서는 "approval과 guardrail이 비어 있으면 agent 시스템은 불안정하다"를 다뤄보려 한다. 어떤 판단은 trace로 남기는 것만으로는 부족하고, 애초에 특정 경로를 막거나 승인 단계로 올려야 한다. 특히 위험한 도구 사용, 경계 밖 수정, 큰 권한이 필요한 작업은 사후 분석보다 사전 통제가 더 중요해진다. 그래서 다음 글에서는 approval과 guardrail이 왜 하네스의 안정성을 좌우하는지 정리해볼 생각이다. trace가 관측 가능성을 만든다면, guardrail은 그 위에서 허용 범위를 정한다.

## 출처 및 참고

- OpenAI, [Agents SDK](https://developers.openai.com/api/docs/guides/agents-sdk)
- OpenAI, [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading)
- OpenAI, [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- OpenAI, [Subagents](https://developers.openai.com/codex/subagents)
