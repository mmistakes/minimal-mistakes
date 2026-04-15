---
layout: single
title: "하네스 엔지니어링 01. 왜 AI 코딩 툴을 바꿀 때마다 결과가 달라질까"
lang: ko
translation_key: why-ai-tools-produce-different-results
date: 2026-04-11 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

AI 코딩 툴을 몇 가지 써보면 비슷한 장면을 자주 만나게 된다. 같은 기능을 요청했는데 어떤 툴은 파일 구조부터 크게 벌려서 만들고, 어떤 툴은 한 파일에 몰아서 구현한다. 어떤 툴은 테스트를 같이 만들지만, 어떤 툴은 "필요하면 추가할 수 있다"는 설명만 남긴다. 처음에는 이 차이가 신기하게 느껴지지만, 실제 프로젝트에서는 조금 다른 문제로 이어진다. 결과가 흔들릴수록 유지보수 리스크가 커지기 때문이다.

이 글에서 말하는 "AI 툴"은 주로 Codex, Claude Code, Copilot처럼 코드를 읽고 이해하고, 생성·수정하며, 필요하면 실행·테스트·검증까지 수행하는 AI 코딩 도구를 가리킨다. 일반 챗봇, 검색형 AI, 이미지 생성기까지 한 번에 설명하려는 글은 아니다.

개인 실험이라면 어느 정도의 편차는 감수할 수 있다. 하지만 팀 단위 개발, 특히 엔터프라이즈 환경에서는 이야기가 달라진다. 한 번 멋지게 만들어지는 것보다, 비슷한 작업을 다시 시켜도 예측 가능한 결과가 나오는지가 더 중요해진다. 그래서 이 글에서는 "왜 툴마다 결과가 다를까"를 모델 비교가 아니라, 모델이 일하는 환경과 구조의 관점에서 풀어보려 한다.

## 검증 기준과 해석 경계

- 시점: 2026-04-15 기준 OpenAI Codex 문서, OpenAI 공식 API 문서, Anthropic Claude Code 문서를 확인했다.
- 출처 등급: 공식 문서 우선, 개념을 처음 소개한 vendor-authored 글만 보조로 사용했다.
- 사실 범위: `AGENTS.md`, memory/settings, hooks, subagents, approvals, sandboxing, eval, trace처럼 문서로 확인 가능한 기능만 사실로 적었다.
- 해석 범위: `harness engineering`, `control plane`, `contract`, `enforcement`, `observable harness` 같은 표현은 이 시리즈에서 쓰는 운영 개념이며, 별도 근거 줄이 없는 경우 필자의 해석이다.


## 왜 같은 요청인데 결과가 다를까

가장 먼저 떠올릴 수 있는 이유는 모델 차이다. 각 모델과 제품은 모델 계열, 버전(스냅샷), 튜닝 방식, 시스템 지침, 응답 성향이 조금씩 다르다. 그래서 같은 문장을 받아도 중요하게 보는 단서와 기본 응답 방식이 달라질 수 있다.
문서로 확인 가능한 사실: Codex는 `AGENTS.md`, hooks, skills, subagents, sandboxing, approvals를 분리된 운영 계층으로 문서화하고, Claude Code는 memory, settings, hooks, subagents를 별도 문서로 설명한다([OpenAI AGENTS.md](https://developers.openai.com/codex/guides/agents-md), [Hooks](https://developers.openai.com/codex/hooks), [Skills](https://developers.openai.com/codex/skills), [Subagents](https://developers.openai.com/codex/subagents), [Sandboxing](https://developers.openai.com/codex/concepts/sandboxing), [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [Anthropic memory](https://code.claude.com/docs/en/memory), [Claude Code settings](https://code.claude.com/docs/en/settings), [Claude Code hooks](https://code.claude.com/docs/en/hooks), [Claude Code subagents](https://code.claude.com/docs/en/sub-agents))
해석: 아래 단락의 모델·제품 차이 설명은 이런 제어면 차이가 결과 편차에 어떻게 반영되는지에 대한 운영 관찰이다.

하지만 차이는 거기서 끝나지 않는다. 해석 차이도 크다. 사람도 "로그인 API를 만들어줘"라는 말을 들으면 떠올리는 구현이 다르듯, AI 역시 최소 기능을 생각할 수도 있고 보안 예외 처리까지 포함한 형태를 상상할 수도 있다. 요청이 짧을수록 빈칸이 많아지고, 그 빈칸을 각 툴이 서로 다른 방식으로 채운다.

기본 전제 역시 다르다. 이미 프로젝트가 있다고 가정하는 툴도 있고, 처음부터 새로 짠다고 받아들이는 툴도 있다. 데이터베이스 스키마, 인증 정책, 테스트 문화, 배포 환경 같은 정보가 비어 있으면 결과는 자연스럽게 흔들린다. 게다가 생성형 출력은 본질적으로 어느 정도 비결정적이기 때문에, 프롬프트를 조금 더 정교하게 쓴다고 해도 이 차이를 완전히 없애기는 어렵다. 프롬프트는 방향을 잡아주지만, 실행 환경 전체를 강제하지는 못하기 때문이다.

## 모델 말고도 결과를 흔드는 요소들

실무에서는 오히려 모델 밖의 요소가 모델 성능 못지않게 크게 작동할 때가 많다. AI는 항상 어떤 프로젝트 안에서 일한다. 이미 존재하는 코드 구조, 네이밍 규칙, 폴더 배치, 사용하는 프레임워크, 팀의 리뷰 문화 같은 맥락이 결과를 끌고 간다.
문서로 확인 가능한 사실: OpenAI는 하네스 엔지니어링 글과 eval 가이드에서 context, workflow design, evaluation을 별도 설계 대상으로 본다([Harness engineering](https://openai.com/index/harness-engineering/), [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices))

규칙 파일의 유무도 중요하다. "에러 응답 형식 통일", "서비스 레이어 분리", "린터 경고 금지", "테스트 없으면 머지 불가" 같은 규칙이 있으면 AI는 그 구조 안에서 움직인다. 반대로 이런 하네스가 없으면 같은 작업을 반복해도 폴더 구조가 매번 달라지고, 함수 이름도 흔들리고, 코드 스타일도 들쑥날쑥해질 수 있다.

테스트와 검증 기준이 있는지도 결과를 크게 바꾼다. 단순히 구현 성공 여부만 보는지, 팀이 원하는 품질 기준까지 확인하는지에 따라 출력은 달라진다. 조직마다 요구하는 기준이 다르기 때문에 맞춤형 evaluation이 필요하다는 말도 여기서 나온다. 결국 중요한 것은 "코드가 한 번 돌아갔다"가 아니라, 팀이 기대하는 형태로 반복 가능하게 나오는지다.

허용된 도구 차이도 빼놓기 어렵다. 어떤 툴은 파일을 읽고 수정하고 테스트를 실행할 수 있지만, 어떤 툴은 코드 초안만 제안할 수 있다. 여기에 린터, 포매터, 테스트 러너, 작업 절차까지 묶여 있으면 결과는 더 예측 가능해진다. 다시 말해 모델이 무엇이냐 못지않게, 모델이 어떤 구조 안에서 일하느냐가 중요해지는 순간이 온다.

## 예제로 보는 차이

### 예제 A: 애매한 요청

가장 단순한 예시는 아래 한 문장이다.

> "로그인 API를 만들어줘."

이 요청은 이해하기 쉽지만, 실제로는 빈칸이 너무 많다. 어떤 툴은 Express로 만들고, 다른 툴은 FastAPI를 고를 수 있다. 인증은 JWT일 수도 있고 세션일 수도 있다. 테스트를 만들 수도 있고 안 만들 수도 있으며, 예외 처리를 자세히 적을 수도 있고 생략할 수도 있다. 심지어 폴더 구조와 네이밍 방식도 제각각일 수 있다. 이런 차이는 단순한 취향 문제가 아니라, 나중에 사람이 읽고 고칠 때 부담으로 돌아온다.

### 예제 B: 구조화된 요청

반대로 요청을 조금 더 구조화하면 편차는 눈에 띄게 줄어든다.

```text
Goal: 이메일/비밀번호 기반 로그인 API 구현
Stack: Node.js + Express
Constraints:
- JWT 사용
- 비밀번호는 bcrypt로 해시
- 기존 users 테이블 사용
Definition of done:
- POST /login 구현
- 비정상 입력 처리
- 테스트 3개 이상 작성
Verification:
- npm test 통과
```

이 명세는 기능 범위만 줄이는 것이 아니다. 팀이 기대하는 결과의 형태와 검증 기준까지 함께 맞춰준다. 이제 Express와 FastAPI 사이에서 흔들릴 이유가 줄고, JWT와 bcrypt 사용 여부도 더 이상 추정이 아니다. 테스트 개수와 `npm test` 통과 조건까지 들어가 있으니, 결과는 단순히 "작동하는 코드"보다 "예측 가능한 결과"에 가까워진다.

여기서 더 나아가 Context / Problem / Solution처럼 맥락을 구조화하면 고객과 개발팀의 멘탈 모델을 맞추기 쉬워진다. 1편에서 이 틀을 깊게 설명할 필요는 없지만, 구조화된 맥락 정리가 결과 편차를 줄이고 유지보수 가능한 결과를 만드는 출발점이라는 점은 기억할 만하다.

## 엔터프라이즈 환경에서는 무엇이 더 중요한가

개인 프로젝트에서는 빠르게 초안을 얻는 것만으로도 충분할 수 있다. 하지만 6개월 뒤에도 관리해야 하는 서비스라면 기준이 달라진다. 엔터프라이즈 환경에서 중요한 것은 화려한 첫 결과보다, 비슷한 작업을 반복했을 때 지나치게 흔들리지 않는 상태다. 여기서 말하는 예측 가능성은 수학적 의미의 멱등성과는 조금 다르다. 다시 시켜도 비슷한 품질과 구조가 나오는 실무적 반복 일관성에 가깝다.
해석: 이 절의 “반복 가능한 품질”과 “유지보수 가능성”은 필자의 실무 기준이다. 다만 OpenAI의 공식 eval 가이드도 AI 시스템에서 일회성 성공보다 반복 검증 가능성을 강조한다([Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices))

또 하나 중요한 것은 휴먼 리더블 코드다. AI가 쓰기 편한 코드가 아니라, 사람이 읽고 수정하고 리뷰하기 쉬운 코드여야 한다. 그래서 린터, 코드 스타일 규칙, 네이밍 규칙, 구조 규칙이 중요하다. AI가 만든 코드는 결국 사람이 떠안기 때문이다.

문서 역시 자산이 된다. 미팅 로그, 기획 문서, 변경 기록, PRD 같은 문서가 남아 있어야 왜 이런 구현을 했는지 추적할 수 있다. 평가도 마찬가지다. 단순히 한 번 성공했는지가 아니라, 우리 팀 기준에 맞는 품질을 계속 만족하는지 봐야 한다. 그리고 AI 시대에는 수정만이 아니라 재생성도 전략이 될 수 있다. 꼬인 결과물을 오래 끌고 가기보다, 명확한 문맥과 하네스를 바탕으로 다시 생성하는 편이 더 효율적인 경우도 있기 때문이다.

## 그래서 하네스 엔지니어링이 등장한다

이쯤에서 "하네스 엔지니어링"이라는 말이 자연스럽게 나온다. 아직 완전히 표준화된 교과서 용어라고 보기는 어렵지만, 최근에는 프롬프트 자체보다 실행 환경 전체를 설계하는 접근을 가리키는 말로 자주 쓰인다. OpenAI도 2026년 2월 11일 공개한 [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)에서 비슷한 문제의식을 정리했다. 어렵게 들리지만, 핵심은 단순하다. 프롬프트 한 줄에 모든 것을 기대하는 대신, 코드 구조, 네이밍 규칙, 린터, 테스트, 작업 절차 같은 실행 환경 전체를 설계해서 어떤 모델을 쓰더라도 더 비슷하고 예측 가능한 결과를 얻도록 돕는 접근이다.
문서로 확인 가능한 사실: OpenAI는 2026-02-11에 [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)를 공개했다. 해석: 이 시리즈는 그 문제의식을 더 넓은 운영 설계 개념으로 확장해 사용한다.

즉, "어떤 모델이 최고인가"보다 "그 모델이 어떤 구조 안에서 일하는가"를 더 중요하게 보는 관점이다. 이 글에서는 문제의식을 먼저 깔아두고, 다음 글에서 하네스 엔지니어링이 실제로 무엇을 의미하는지 조금 더 구체적으로 다뤄보려 한다.

## 마무리

같은 요청인데도 AI 툴마다 결과가 달라지는 것은 자연스러운 현상이다. 그 차이는 모델 성능뿐 아니라 컨텍스트, 프로젝트 규칙, 도구, 검증 방식 같은 환경에서 함께 만들어진다. OpenAI와 Anthropic의 공식 가이드도 구체적인 지시, 충분한 맥락, 평가 기준의 중요성을 반복해서 강조한다. 프롬프트만 잘 쓴다고 장기 유지보수 가능한 결과가 자동으로 보장되지는 않으며, 엔터프라이즈 환경에서는 화려함보다 일관성과 유지보수 가능성이 더 중요하다.

다음 글에서는 이 환경을 어떻게 설계할지에 초점을 맞춰보려 한다. 프롬프트를 넘어 실행 구조 전체를 다루는 하네스 엔지니어링 관점이 왜 필요한지, 그리고 실제로 어떤 요소를 설계해야 하는지 차근차근 이어가 보겠다.

## 이 글의 한 줄 요약

AI 결과의 차이는 모델 성능만이 아니라, 그 모델이 어떤 규칙과 검증 구조 안에서 일하느냐에 크게 좌우된다.

## 다음 글 예고

다음 편에서는 "하네스 엔지니어링이란 무엇인가"를 본격적으로 다뤄볼 예정이다. 프롬프트를 잘 쓰는 것과 실행 환경을 잘 설계하는 것이 왜 다른지부터 차근차근 정리해보려 한다. 코드 규칙, 테스트, 문서, 평가 기준이 어떻게 하나의 작업 하네스로 묶이는지도 함께 살펴볼 생각이다. 특정 모델에 덜 종속되면서도 예측 가능한 결과를 얻고 싶다면, 결국 어디를 설계해야 하는지 감이 잡히게 될 것이다. AI를 도구로 쓰는 단계에서, 시스템으로 운영하는 단계로 넘어가는 연결점도 그 안에서 자연스럽게 보일 것이다.

## 출처 및 참고

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Hooks](https://developers.openai.com/codex/hooks)
- OpenAI, [Agent Skills](https://developers.openai.com/codex/skills)
- OpenAI, [Subagents](https://developers.openai.com/codex/subagents)
- OpenAI, [Sandboxing](https://developers.openai.com/codex/concepts/sandboxing)
- OpenAI, [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)
- OpenAI, [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
- OpenAI, [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- Anthropic, [Claude Code settings](https://code.claude.com/docs/en/settings)
- Anthropic, [Hooks reference](https://code.claude.com/docs/en/hooks)
- Anthropic, [Create custom subagents](https://code.claude.com/docs/en/sub-agents)
