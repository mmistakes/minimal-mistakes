---
layout: post
title: "Harness Engineering: 에이전트 우선 소프트웨어 개발 방법론"
date: 2026-03-19 09:53:00 +0900
categories: [ai]
tags: [harness-engineering, codex, claude-code, ai-agent, software-engineering, architecture, methodology]
---

> **원문**: [OpenAI - Harness Engineering](https://openai.com/ko-KR/index/harness-engineering/) (2026.02.11)
> **참고**: [RevFactory - 하네스 엔지니어링 분석](https://revf.tistory.com/320) (2026.03.02)
> **분석 작성**: 2026.03.18 (최종 업데이트: 2026.03.18)
> **목적**: 이 문서를 프로젝트에 붙여넣으면 Harness Engineering 방법론을 즉시 적용할 수 있는 실행 가이드

---

## 1. Harness Engineering이란?

### 1.1 정의

**Harness Engineering**은 AI 에이전트와 워크플로우에 대한 **행동 제약(behavioral constraints)**과 **개선 순환(improvement cycles)**을 포함하는 시스템 설계를 의미한다.

에이전트의 **"바깥쪽 시스템(outside system)"**을 설계하는 것으로, 에이전트 내부(컨텍스트, 프롬프트)가 아닌 **외부 환경**을 다룬다.

> **핵심 비유**: "The model is the CPU, the harness is the OS." — Evangelos Pappas

핵심 공식:

```text
사람이 조정(Orchestrate) + 에이전트가 수행(Execute)
= Harness Engineering
```

- **사람**: 목표 설정, 환경 설계, 의도 명시, 피드백 루프 구축, 결과 검증
- **에이전트**: 코드 작성, 테스트, CI 구성, 문서화, 리뷰, 리팩터링, 배포

### 1.1.1 개념적 위계: Prompt → Context → Harness

```text
Harness Engineering ⊇ Context Engineering ⊇ Prompt Engineering
```

| 차원 | Prompt Engineering | Context Engineering | Harness Engineering |
|------|-------------------|--------------------|--------------------|
| **관심 범위** | 단일 프롬프트 | 단일 추론의 모든 입력 | 시스템 전체 |
| **시간 축** | 정적 | 동적 (런타임) | 지속적 (세션 간) |
| **핵심 질문** | 어떻게 말할 것인가? | 무엇을 보여줄 것인가? | 무엇을 방지/측정/수정? |
| **등장 시기** | 2022-2023 | 2024-2025 | 2025-2026 |

### 1.1.2 Relocating Rigor (엄격함의 재배치)

> **"AI가 코드를 짠다고 규율이 사라지는 것이 아니다. 규율이 적용되는 위치가 코드 작성에서 하네스 설계로 이동했을 뿐이다."**
> — Birgitta Böckeler (ThoughtWorks, Martin Fowler 사이트 기고)

소프트웨어를 구축하는 데 필요한 엄격함(rigor)의 총량은 줄지 않는다. 코드 레벨에서 하네스 환경 설계 레벨로 재배치되었을 뿐이다.

### 1.1.3 도구별 가이드라인 파일 비교: CLAUDE.md vs AGENTS.md

각 AI 코딩 도구는 서로 다른 이름의 가이드라인 파일을 사용한다. **AGENTS.md는 OpenAI Codex 전용**이며, Claude Code는 **CLAUDE.md**를 사용한다.

| 도구 | 가이드라인 파일 | 강제력 | 계층 구조 | 비고 |
|------|----------------|--------|-----------|------|
| **Claude Code** | `CLAUDE.md` | 제안(suggestion) — Hooks로 강제 가능 | 프로젝트 루트 + 하위 디렉토리 + `~/.claude/CLAUDE.md` | Memory 시스템, settings.json 별도 |
| **OpenAI Codex** | `AGENTS.md` | 제안(suggestion) | 프로젝트 루트 + 하위 디렉토리 | sandbox 환경 전용 |
| **Cursor** | `.cursor/rules/*.mdc` | Rule 타입별 상이 (Always/Auto/Agent Requested/Manual) | `.cursor/rules/` 디렉토리 | glob 패턴으로 파일별 규칙 가능 |
| **GitHub Copilot** | `.github/copilot-instructions.md` | 제안 | 프로젝트 루트 | 비교적 단순 |
| **Windsurf** | `.windsurfrules` | 제안 | 프로젝트 루트 | Cascade 에이전트 |

**핵심 차이점:**

- **CLAUDE.md = "제안"**: 에이전트에게 컨텍스트로 제공되지만, 위반해도 기술적으로 실행은 됨
- **Hooks = "규칙"**: `PreToolUse`, `PostToolUse` 훅으로 도구 호출 전후에 강제 검증 가능
- **AGENTS.md**: Codex 전용. Claude Code 환경에서는 무시됨
- **실질적 권고**: 프로젝트에서 Claude Code를 사용한다면 `CLAUDE.md`를 작성하고, 멀티 도구 환경이라면 두 파일 모두 유지

### 1.1.4 하네스의 5대 구성요소

RevFactory 분석에 따르면 Harness Engineering은 다음 5개 구성요소로 이루어진다:

```text
┌─────────────────────────────────────────────────┐
│ HARNESS SYSTEM                                  │
│                                                 │
│ ┌──────────┐ ┌──────────┐ ┌───────────────┐    │
│ │Guardrails│ │Plan &    │ │Verification   │    │
│ │(가드레일) │ │Spec      │ │Loops          │    │
│ │          │ │(계획·명세)│ │(검증 루프)    │    │
│ └──────────┘ └──────────┘ └───────────────┘    │
│                                                 │
│ ┌──────────────┐ ┌─────────────────────────┐    │
│ │Eval Harness  │ │Observability            │    │
│ │(평가 하네스) │ │(관측 가능성)            │    │
│ └──────────────┘ └─────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

| 구성요소 | 역할 | 구현 예시 |
|---------|------|----------|
| **Guardrails** | 에이전트가 넘지 못할 울타리 | CLAUDE.md 핵심 규칙, Hooks, 커스텀 린터, ArchUnit |
| **Plan & Spec** | 작업 전 계획·명세 수립 | exec-plans/, product-specs/, 이슈 템플릿 |
| **Verification Loops** | 코드 생성 후 자동 검증 | 테스트 실행, 빌드 확인, Ralph Wiggum Loop |
| **Eval Harness** | 에이전트 성능 측정·비교 | QUALITY_SCORE.md, 벤치마크, A/B 테스트 |
| **Observability** | 에이전트 행동 추적·분석 | 로그, 메트릭, 트레이싱, 텔레메트리 |

**가장 중요한 통찰**: 가드레일과 검증 루프는 "사후 점검"이 아니라 **에이전트 실행 환경의 일부**로 내장되어야 한다.

### 1.2 기존 소프트웨어 엔지니어링과의 차이

| 관점 | 기존 방식 | Harness Engineering |
|------|-----------|---------------------|
| **코드 작성** | 사람이 직접 작성 | 에이전트가 전량 작성 |
| **엔지니어 역할** | 코더, 리뷰어 | 환경 설계자, 오케스트레이터 |
| **지식 저장소** | Confluence, Notion, 사람의 머릿속 | **리포지터리 = 유일한 기록 시스템** |
| **코드 리뷰** | 사람 → 사람 | 에이전트 → 에이전트 (사람은 선택적) |
| **아키텍처 강제** | 코드 리뷰 + 구두 합의 | **커스텀 린터 + 구조적 테스트** (기계적 강제) |
| **기술 부채** | 분기별 스프린트로 일괄 해소 | **가비지 컬렉션** (매일 조금씩 해소) |
| **병합 정책** | 엄격한 게이트 (2인 리뷰 필수 등) | 최소 차단, 빠른 병합, Fix-Forward |
| **문서화** | 선택적, 자주 낡음 | **일급 아티팩트**, 기계적 신선도 검증 |
| **처리량** | 엔지니어 1인당 ~0.5 PR/일 | 엔지니어 1인당 **~3.5 PR/일** |

### 1.3 핵심 전제

> **"에이전트가 실행 중에 컨텍스트 내에서 접근할 수 없는 것은 사실상 존재하지 않는 것이다."**

이 전제에서 모든 실천 원칙이 도출된다:

- Google Docs, Slack, 사람의 머릿속에 있는 지식 → **접근 불가 = 존재하지 않음**
- 리포지터리 내 버전관리되는 아티팩트(코드, 마크다운, 스키마, 실행 계획)에만 접근 가능
- 따라서 **모든 의사결정, 규칙, 컨텍스트를 리포지터리에 기록**해야 한다

---

## 2. 5대 핵심 원칙

### 원칙 1: 리포지터리 = 기록 시스템 (Repository as System of Record)

**모든 지식은 리포지터리 안에 존재해야 한다.**

Slack 토론에서 아키텍처 결정이 내려졌다면, 그 결정은 리포지터리에 기록되지 않는 한 에이전트에게는 존재하지 않는다. 3개월 후 합류하는 신입 사원이 모르는 것은 에이전트도 모른다.

**실천 방법:**
- 아키텍처 결정 → `docs/design-docs/`에 기록
- 진행 중인 작업 → `docs/exec-plans/active/`에 기록
- 완료된 작업 → `docs/exec-plans/completed/`로 이동
- 제품 요구사항 → `docs/product-specs/`에 기록
- 외부 라이브러리 가이드 → `docs/references/`에 llms.txt 형태로 기록

### 원칙 2: 가이드라인 파일 = 목차 (Table of Contents, Not Encyclopedia)

> **도구별 파일명**: Claude Code → `CLAUDE.md` / Codex → `AGENTS.md` / Cursor → `.cursor/rules/`

**가이드라인 파일은 ~100줄의 맵이다. 백과사전이 아니다.**

OpenAI는 "하나의 거대한 AGENTS.md" 접근 방식이 실패한 이유를 4가지로 정리했다 (CLAUDE.md에도 동일하게 적용):

1. **컨텍스트는 희소 리소스** — 거대한 지침은 에이전트가 핵심 제약을 놓치거나 잘못된 제약에 최적화하게 만든다
2. **모든 것이 중요하면 아무것도 중요하지 않다** — 에이전트가 의도적으로 탐색하는 대신 로컬 패턴 매칭을 수행한다
3. **순식간에 낡는다** — 획일적 매뉴얼은 "낡은 규칙들의 무덤"이 된다
4. **검증이 어렵다** — 단일 블롭은 기계적 점검(커버리지, 신선도, 소유권)에 적합하지 않다

**올바른 구조:**

```text
CLAUDE.md (또는 AGENTS.md) ← ~100줄, 맵/목차 역할
ARCHITECTURE.md ← 도메인·레이어 최상위 맵
docs/
├── design-docs/
│  ├── index.md ← 설계 문서 목차
│  ├── core-beliefs.md ← 팀 핵심 신념 & 에이전트 운영 원칙
│  └── [주제별].md
├── exec-plans/
│  ├── active/ ← 현재 진행 중인 계획
│  ├── completed/ ← 완료된 계획
│  └── tech-debt-tracker.md
├── product-specs/
│  ├── index.md
│  └── [기능별].md
├── references/
│  ├── [라이브러리]-llms.txt ← 외부 라이브러리 에이전트용 요약
│  └── ...
├── generated/
│  └── db-schema.md ← 자동 생성 문서
├── DESIGN.md ← 디자인 시스템 규칙
├── FRONTEND.md ← 프론트엔드 규칙
├── BACKEND.md ← 백엔드 규칙
├── QUALITY_SCORE.md ← 도메인별 품질 등급
├── PLANS.md ← 마스터 플랜
├── RELIABILITY.md ← 안정성 기준
└── SECURITY.md ← 보안 규칙
```

### 원칙 3: 아키텍처 기계적 강제 (Mechanical Architecture Enforcement)

> **"문서화만으로는 에이전트 생성 코드베이스의 일관성을 유지할 수 없다."**

불변조건(invariant)을 문서가 아닌 **코드로 강제**한다.

**OpenAI의 레이어 모델:**

```text
각 비즈니스 도메인 내에서:
Types → Config → Repo → Service → Runtime → UI
(단방향 의존성만 허용, 역방향 금지)

교차 관심사(Auth, Telemetry, Feature Flags):
→ 하나의 명시적 인터페이스 "Providers"를 통해서만 유입
```

**강제 도구:**
- **커스텀 린터** — 구조 규칙 위반 시 에러 메시지에 수정 지침 포함 (에이전트 컨텍스트에 주입)
- **구조적 테스트** — 의존성 방향, 파일 크기, 네이밍 규칙을 CI에서 검증
- **"취향 불변성"** — 구조화된 로깅, 스키마 네이밍, 플랫폼별 안정성 요구사항 등

**핵심 통찰:**

> 사람 중심 워크플로에서는 이런 규칙이 지나치게 세세하게 느껴질 수 있다.
> 에이전트를 사용하면 **한 번 인코딩하면 모든 곳에 즉시 적용**된다.

### 원칙 4: 에이전트 가독성 우선 (Agent Readability)

사람이 아닌 **에이전트가 읽고 추론할 수 있는 형태**로 시스템을 구성한다.

**실천 방법:**
- **worktree별 앱 부팅** — 에이전트가 변경사항마다 독립 인스턴스를 실행
- **DevTools Protocol 연결** — DOM 스냅샷, 스크린샷, 탐색 작업 스킬 제공
- **로컬 관측 스택** — 로그(LogQL), 메트릭(PromQL) 쿼리 가능
- **검증 가능한 프롬프트** — "서비스 시작이 800ms 이내에 완료되도록" 같은 측정 가능한 목표

**기술 선택 기준 변화:**
- "지루한" 기술이 에이전트에게 더 좋다 — 합성성, API 안정성, 학습 데이터 풍부
- 외부 라이브러리의 불투명한 동작보다 **자체 구현이 더 저렴**한 경우가 있음 (테스트 100%, 텔레메트리 통합)
- 에이전트가 검사·검증·수정할 수 있는 형태로 시스템을 끌어옴

### 원칙 5: 가비지 컬렉션 (Entropy Management)

> **"기술 부채는 고금리 대출이다. 이자가 쌓여 고통스럽게 한꺼번에 갚는 것보다 조금씩 꾸준히 갚는 편이 낫다."**

**문제:**
에이전트는 리포지터리에 이미 존재하는 패턴을 복제한다. 불균일하거나 최적이 아닌 패턴도 복제한다. 시간이 지나면 필연적으로 드리프트가 발생한다.

**실패한 접근: 수동 정리**
> 매주 금요일(20%)마다 "AI 슬로프" 정리 → 확장 불가

**성공한 접근: 자동 가비지 컬렉션**
1. **"황금 원칙"을 리포지터리에 인코딩** — `docs/design-docs/core-beliefs.md`
2. **정기 cleanup 에이전트** 운영 — 편차 검사, 품질 등급 업데이트, 리팩터링 PR 생성
3. **대부분 1분 이내 리뷰** 가능, 자동 병합

---

## 3. 실행 가이드: 새 프로젝트에 적용하기

### Step 1: 리포지터리 기반 구조 생성

프로젝트 루트에 다음 파일/디렉토리를 생성한다:

```bash
mkdir -p docs/{design-docs,exec-plans/active,exec-plans/completed,product-specs,references,generated}
mkdir -p .claude
touch CLAUDE.md # Claude Code 사용 시
# touch AGENTS.md # Codex 사용 시 (또는 둘 다 유지)
touch ARCHITECTURE.md
touch docs/design-docs/{index.md,core-beliefs.md}
touch docs/exec-plans/tech-debt-tracker.md
touch docs/product-specs/index.md
touch docs/{DESIGN.md,FRONTEND.md,BACKEND.md,QUALITY_SCORE.md,PLANS.md,RELIABILITY.md,SECURITY.md}
```

### Step 2: CLAUDE.md 작성 (맵 역할, ~100줄)

> Claude Code 사용 시 `CLAUDE.md`, Codex 사용 시 `AGENTS.md`, 둘 다 사용 시 양쪽 모두 유지.
> 아래 템플릿은 Claude Code 기준이며, AGENTS.md도 동일한 구조로 작성하면 된다.

```markdown
# CLAUDE.md

## 프로젝트 개요
[1~3줄로 프로젝트가 무엇인지 설명]

## 기술 스택
- Frontend: [프레임워크, 언어]
- Backend: [프레임워크, 언어, DB]
- Infrastructure: [빌드 도구, CI/CD]

## 리포지터리 구조
[디렉토리 트리 — 최상위 2~3레벨만]

## 아키텍처 레이어
→ 상세: ARCHITECTURE.md

## 핵심 규칙 (절대 위반 금지)
1. [규칙 1]
2. [규칙 2]
3. [규칙 3]

## 문서 맵 (깊이 탐색 시 참조)
- 설계 원칙 → docs/design-docs/core-beliefs.md
- 아키텍처 → ARCHITECTURE.md
- 프론트엔드 규칙 → docs/FRONTEND.md
- 백엔드 규칙 → docs/BACKEND.md
- 디자인 시스템 → docs/DESIGN.md
- 현재 진행 계획 → docs/exec-plans/active/
- 기술 부채 → docs/exec-plans/tech-debt-tracker.md
- 품질 등급 → docs/QUALITY_SCORE.md
- DB 스키마 → docs/generated/db-schema.md

## 개발 명령어
- 빌드: [command]
- 테스트: [command]
- 린트: [command]
- 실행: [command]

## 커밋 & PR 규칙
- [브랜치 네이밍]
- [커밋 메시지 형식]
- [PR 규칙]
```

### Step 3: ARCHITECTURE.md 작성

```markdown
# Architecture

## 레이어 모델
[비즈니스 도메인별 계층 구조 다이어그램]

## 의존성 규칙
- [어떤 레이어가 어떤 레이어를 참조할 수 있는지]
- [교차 관심사 처리 방식]

## 도메인 맵
[각 비즈니스 도메인과 해당 디렉토리 위치]

## 데이터 흐름
[요청 → 응답 흐름]
```

### Step 4: core-beliefs.md 작성 (황금 원칙)

이 파일은 **에이전트의 의사결정 프레임워크**이다. 구체적이고 검증 가능해야 한다.

```markdown
# Core Beliefs

## 에이전트 운영 원칙
1. 리포지터리 내에서 완전히 추론 가능한 종속성을 선호한다
2. 경계에서 데이터 형태를 반드시 파싱/검증한다
3. 공유 유틸리티를 선호하고, 직접 만든 헬퍼를 지양한다
4. YOLO-style 데이터 탐색 금지 — 타입 지정 SDK 또는 경계 검증 필수

## 코드 품질 원칙
1. [프로젝트 특화 원칙]
2. [프로젝트 특화 원칙]

## 금지 사항
1. [절대 하면 안 되는 것]
2. [절대 하면 안 되는 것]
```

### Step 5: exec-plans 운영

**모든 작업은 계획으로 시작한다.**

```markdown
# docs/exec-plans/active/feature-xyz.md

## 목표
[무엇을 달성하려는가]

## 현재 상태
- [x] Step 1: 완료된 작업
- [ ] Step 2: 진행 중인 작업
- [ ] Step 3: 예정된 작업

## 의사결정 로그
- 2026-03-18: [결정 사항] — [이유]

## 관련 파일
- `src/path/to/file.ts`

## 알려진 이슈
- [이슈 설명]
```

**완료 시 → `completed/`로 이동, 기술 부채 발견 시 → `tech-debt-tracker.md`에 기록**

### Step 6: QUALITY_SCORE.md 운영

```markdown
# Quality Score

| 도메인 | 테스트 커버리지 | 문서화 | 아키텍처 준수 | 전체 등급 |
|--------|----------------|--------|--------------|-----------|
| auth | A (95%) | B | A | A |
| shell | B (80%) | A | A | A |
| sys | C (60%) | C | B | C |
| org | D (30%) | D | C | D |

## 등급 기준
- A: 프로덕션 준비 완료, 에이전트가 안정적으로 작업 가능
- B: 대부분 완성, 소수 개선 필요
- C: 기본 기능 동작, 구조적 개선 필요
- D: 초기 단계, 상당한 작업 필요
- F: 미시작 또는 심각한 문제
```

### Step 7: 커스텀 린터 설정

에이전트가 위반할 수 없도록 **에러 메시지에 수정 지침을 포함**한다.

**ESLint 플러그인 예시 (프론트엔드):**

```javascript
// eslint-rules/no-cross-feature-import.js
module.exports = {
 create(context) {
 return {
 ImportDeclaration(node) {
 const source = node.source.value;
 const filename = context.getFilename();

 // features/auth/는 features/shell/을 import 불가
 if (filename.includes('/features/auth/') && source.includes('/features/shell/')) {
 context.report({
 node,
 message:
 'features/auth/에서 features/shell/ import 금지. ' +
 '교차 의존성이 필요하면 shared/에 공통 인터페이스를 만드세요. ' +
 '참조: ARCHITECTURE.md "의존성 규칙" 섹션.',
 });
 }
 },
 };
 },
};
```

**Checkstyle/ArchUnit 예시 (백엔드 Java):**

```java
@AnalyzeClasses(packages = "com.example.app")
class ArchitectureTest {

 @ArchTest
 static final ArchRule controllers_should_not_access_mappers =
 noClasses()
 .that().resideInAPackage("..controller..")
 .should().accessClassesThat().resideInAPackage("..mapper..")
 .because("Controller는 반드시 Service를 경유해야 합니다. " +
 "참조: ARCHITECTURE.md 레이어 모델");

 @ArchTest
 static final ArchRule shared_should_not_depend_on_features =
 noClasses()
 .that().resideInAPackage("..shared..")
 .should().dependOnClassesThat().resideInAPackage("..features..")
 .because("shared/는 features/에 의존할 수 없습니다. " +
 "참조: docs/design-docs/core-beliefs.md");
}
```

### Step 8: 가비지 컬렉션 프로세스

**자동 정리 에이전트 프롬프트 (주기적 실행):**

```text
리포지터리를 검사하고 다음을 수행하세요:

1. docs/QUALITY_SCORE.md 기준으로 각 도메인의 현재 상태를 재평가
2. docs/design-docs/core-beliefs.md의 "황금 원칙"을 위반하는 코드 패턴 검색
3. 발견된 위반에 대해 수정 PR 생성
4. 낡은 문서(코드와 불일치하는 docs/)를 찾아 업데이트 PR 생성
5. docs/exec-plans/tech-debt-tracker.md 업데이트
```

---

## 4. 병합 철학

### 기존 방식 vs Harness Engineering

| 기존 | Harness Engineering |
|------|---------------------|
| 2인 이상 리뷰 필수 | 에이전트 리뷰로 대체 가능 |
| 모든 테스트 통과 필수 | 불안정 테스트는 후속 PR로 해결 |
| 완벽한 PR 추구 | 빠른 병합 + Fix-Forward |
| 큰 PR (수백 줄) | 작은 PR (에이전트 1회 실행 단위) |

### 핵심 통찰

> **"에이전트 처리량이 사람의 주의력을 훨씬 초과하는 시스템에서는 수정 비용이 저렴하고 대기 비용이 비싸다."**

- PR은 수명이 짧아야 한다
- 테스트 불안정성은 진행을 무기한으로 막기보다는 후속 실행으로 해결
- 사람의 리뷰는 **구조적 결정**에만 집중

---

## 5. Claude Code 전용 하네스 기능

Claude Code를 사용하는 프로젝트라면 다음 기능을 하네스의 핵심 도구로 활용할 수 있다.

### 5.1 CLAUDE.md 계층 구조

Claude Code는 CLAUDE.md를 **3개 계층**에서 로드한다:

```text
~/.claude/CLAUDE.md ← 사용자 전역 (모든 프로젝트 공통)
<project-root>/CLAUDE.md ← 프로젝트 루트 (팀 공유, git 추적)
<subdirectory>/CLAUDE.md ← 하위 디렉토리 (모듈별 특화 규칙)
```

**활용 전략:**
- **전역**: 코딩 스타일, 언어 선호, 공통 명령어
- **루트**: 프로젝트 아키텍처, 핵심 규칙, 문서 맵 (= 원칙 2의 목차 역할)
- **하위**: 모듈별 특화 규칙 (예: `ehr-frontend/CLAUDE.md`에 Next.js 규칙)

### 5.2 Hooks: 제안을 규칙으로 전환

CLAUDE.md의 내용은 "제안"이지만, **Hooks**를 사용하면 기계적 강제가 가능하다.

```jsonc
// .claude/settings.json
{
 "hooks": {
 "PreToolUse": [
 {
 "matcher": "Write|Edit",
 "command": "node scripts/check-architecture.js $FILE_PATH"
 }
 ],
 "PostToolUse": [
 {
 "matcher": "Write|Edit",
 "command": "npx eslint --fix $FILE_PATH && npx tsc --noEmit"
 }
 ]
 }
}
```

| Hook 타입 | 시점 | 용도 |
|-----------|------|------|
| **PreToolUse** | 도구 호출 **전** | 파일 쓰기 전 아키텍처 규칙 검증, 금지 패턴 차단 |
| **PostToolUse** | 도구 호출 **후** | 린트 자동 실행, 타입 체크, 테스트 트리거 |

**Hooks vs CLAUDE.md 비교:**

| 측면 | CLAUDE.md | Hooks |
|------|-----------|-------|
| 강제력 | 제안 (무시 가능) | 규칙 (실패 시 중단) |
| 유연성 | 자연어, 맥락 의존 | 스크립트, 기계적 판단 |
| 적합한 규칙 | "~을 선호하라", "~을 고려하라" | "~은 절대 금지", "~을 반드시 통과" |

### 5.3 MEMORY.md: 세션 간 지속 기억

Claude Code는 `~/.claude/projects/<project>/memory/` 디렉토리에 세션 간 기억을 저장한다.

- 에이전트가 학습한 프로젝트 컨텍스트가 자동으로 축적
- **실패 기반 점진적 지식 베이스** — AGENTS.md의 "실패 경험에서 규칙이 추가되는" 패턴과 동일
- 수동으로 편집하여 에이전트의 장기 기억을 조정 가능

### 5.4 settings.json: 프로젝트별 에이전트 설정

```jsonc
// .claude/settings.json
{
 "permissions": {
 "allow": ["Read", "Glob", "Grep", "Bash(npm test:*)"],
 "deny": ["Bash(rm -rf *)"]
 },
 "hooks": { /* ... */ }
}
```

이 설정으로 에이전트가 실행할 수 있는 도구와 명령어를 **화이트리스트/블랙리스트** 방식으로 제어한다.

---

## 6. Mitchell Hashimoto의 AI 코딩 6단계 여정

HashiCorp 창업자 Mitchell Hashimoto는 AI 코딩 도구 도입의 성숙도를 6단계로 정리했다:

| 단계 | 이름 | 설명 | 특징 |
|------|------|------|------|
| **1** | 자동완성 | Tab 완성 (Copilot 스타일) | 가장 낮은 진입 장벽 |
| **2** | 인라인 대화 | 에디터 내 부분 수정 요청 | Cursor Cmd+K 스타일 |
| **3** | 채팅 기반 코딩 | 사이드바 대화로 코드 생성 | Claude Code, Cursor Chat |
| **4** | 에이전트 코딩 | 계획 → 실행 → 검증 자동화 | Claude Code Agent, Codex |
| **5** | 에이전트 팀 | 여러 에이전트 협업 (코더+리뷰어+테스터) | OpenAI 내부 워크플로 |
| **6** | 완전 자율 | 이슈 → PR → 병합까지 무인 운영 | Harness Engineering 필수 |

**핵심 메시지:**

> 단계가 올라갈수록 **하네스의 중요성이 기하급수적으로 증가**한다.
> 4단계 이상에서는 CLAUDE.md/AGENTS.md, Hooks, 기계적 강제, 검증 루프 없이는
> 에이전트가 코드베이스를 빠르게 오염시킨다.

대부분의 팀은 현재 2~3단계에 있으며, 4단계 진입 시 Harness Engineering이 **선택이 아닌 필수**가 된다.

---

## 7. 산업 사례 및 벤치마크

### 7.1 OpenAI 내부 (App Server)
- 100만 줄 코드, 5개월, 사람이 작성한 코드 0줄
- 엔지니어 1인당 일 3.5 PR, 총 ~1,500 PR
- 3명 → 7명으로 팀 확장 중에도 속도 유지

### 7.2 Stripe (Minions 시스템)
- 에이전트가 사전 조사·컨텍스트 수집 → 사람에게 구조화된 제안 전달
- "에이전트가 코드를 직접 쓰지 않아도" 생산성 향상 가능함을 입증
- 하네스의 핵심: **에이전트에게 적절한 컨텍스트를 제공하는 시스템**

### 7.3 Meta (Manus 시스템)
- 대규모 모노레포에서 에이전트 기반 코드 생성
- 사내 린터·테스트와 깊이 통합된 하네스
- "가드레일 없는 에이전트는 모노레포에서 재앙" — 기계적 강제의 중요성 확인

### 7.4 LangChain Terminal Bench
- 에이전트 코딩 능력을 벤치마크로 정량화
- 하네스(컨텍스트 제공, 도구 접근성)가 **모델 선택보다 성능에 더 큰 영향**
- 같은 모델이라도 하네스 품질에 따라 성능 2~3배 차이

### 7.5 Birgitta Böckeler (ThoughtWorks)의 비판적 관점

> "AI 코딩의 가장 위험한 함정은 **검증 격차(verification gap)**이다.
> 에이전트가 생성한 코드를 사람이 충분히 검증하지 않으면,
> 코드베이스에 이해되지 않은 코드가 쌓여간다."

**시사점:**
- Harness Engineering은 이 검증 격차를 **기계적 검증**으로 메우는 것
- "사람이 모든 코드를 읽는다"는 전제를 버리고, "기계가 불변조건을 검증한다"로 전환
- 하지만 **아키텍처적 결정**은 여전히 사람의 판단이 필요

---

## 8. 에이전트 자율성 수준 모델

OpenAI는 시간이 지나면서 에이전트의 자율성이 단계적으로 증가했다:

### Level 1: 코드 생성 (기본)

```text
사람 프롬프트 → 에이전트 코드 작성 → 사람 리뷰 → 사람 병합
```

### Level 2: 코드 + 리뷰 (중급)

```text
사람 프롬프트 → 에이전트 코드 작성 → 에이전트 자체 리뷰 → 사람 확인 → 병합
```

### Level 3: 코드 + 리뷰 + 검증 (고급)

```text
사람 프롬프트 → 에이전트 코드 작성 → 에이전트 자체 리뷰
→ 에이전트 앱 실행 & 검증 → 에이전트 PR 오픈
→ 에이전트 피드백 응답 → 에이전트 병합
→ 판단 필요 시에만 사람에게 에스컬레이션
```

### Level 4: 완전 자율 (OpenAI 현재)

```text
사람 프롬프트 하나로:
1. 코드베이스 현재 상태 검증
2. 버그 재현
3. 실패 상황 동영상 녹화
4. 수정사항 구현
5. 앱 실행하여 수정 검증
6. 해결 동영상 녹화
7. PR 오픈
8. 에이전트/사람 피드백 응답
9. 빌드 실패 감지 & 수정
10. 판단 필요 시만 에스컬레이션
11. 병합
```

---

## 9. 체크리스트: 프로젝트 적용 시 확인 사항

### 즉시 적용 (Day 1)

- [ ] `CLAUDE.md` 생성 (~100줄, 맵 역할) — Codex 병용 시 `AGENTS.md`도 생성
- [ ] `ARCHITECTURE.md` 생성 (레이어 모델, 의존성 규칙, 도메인 맵)
- [ ] `docs/` 디렉토리 구조 생성 (design-docs, exec-plans, product-specs, references)
- [ ] `docs/design-docs/core-beliefs.md` 작성 (황금 원칙 3~7개)
- [ ] `docs/QUALITY_SCORE.md` 초기 버전 작성
- [ ] 현재 진행 중인 작업을 `docs/exec-plans/active/`에 기록
- [ ] `.claude/settings.json` 생성 (권한 설정, 기본 Hooks)

### 1주 내 적용

- [ ] **Hooks 설정**: PreToolUse/PostToolUse 훅으로 핵심 규칙 기계적 강제
- [ ] 커스텀 린터 규칙 최소 3개 추가 (에러 메시지에 수정 지침 포함)
- [ ] 외부 라이브러리 참조 문서를 `docs/references/`에 llms.txt로 정리
- [ ] DB 스키마 문서를 `docs/generated/`에 자동 생성 스크립트 작성
- [ ] CI에서 docs/ 신선도 검증 작업 추가
- [ ] 하위 디렉토리별 `CLAUDE.md` 작성 (모듈별 특화 규칙)

### 1개월 내 적용

- [ ] 에이전트 리뷰 워크플로 구축 (에이전트가 PR 리뷰 + 코멘트)
- [ ] 가비지 컬렉션 프로세스 자동화 (주 1회 cleanup 에이전트 실행)
- [ ] 품질 등급 자동 업데이트 스크립트
- [ ] 에이전트 자율성 Level 2 → Level 3 전환 (Mitchell Hashimoto 4단계)
- [ ] MEMORY.md 검토 및 정리 (에이전트 장기 기억 품질 관리)

### 분기별 점검

- [ ] core-beliefs.md가 현재 팀 합의를 반영하는가?
- [ ] exec-plans/active/에 낡은 계획이 남아있지 않은가?
- [ ] QUALITY_SCORE.md가 실제 상태를 반영하는가?
- [ ] 린터 규칙이 실제 위반 패턴을 커버하는가?
- [ ] CLAUDE.md가 너무 비대해지지 않았는가? (~100줄 유지)
- [ ] Hooks가 실제 위반을 잡고 있는가? (false positive 비율 점검)

---

## 10. 안티패턴: 이것은 피하라

### 안티패턴 1: 거대한 CLAUDE.md / AGENTS.md
- ❌ 500줄 이상의 상세 지침서
- ✅ ~100줄의 맵 + 깊은 문서로의 포인터

### 안티패턴 2: 문서로만 강제
- ❌ "Controller에서 Mapper 직접 호출 금지"라고 문서에만 적기
- ✅ 린터/테스트로 기계적 강제 + 에러 메시지에 수정 지침

### 안티패턴 3: 수동 가비지 컬렉션
- ❌ 매주 금요일 "AI 슬로프" 수동 정리
- ✅ 정기 자동 cleanup 에이전트 운영

### 안티패턴 4: 외부 지식 의존
- ❌ "Slack에서 합의한 대로" 또는 "지난 미팅에서 결정한 대로"
- ✅ 모든 결정을 리포지터리에 기록

### 안티패턴 5: 인간 스타일 강요
- ❌ 에이전트 코드가 인간의 문체와 다르다고 거부
- ✅ 정확하고, 유지관리 가능하고, 에이전트가 읽기 쉬우면 OK

### 안티패턴 6: 에이전트 실패 시 "더 분발"
- ❌ 같은 프롬프트를 더 강하게 반복
- ✅ "어떤 기능이 누락되어 있으며, 에이전트가 실행 가능하게 만들려면 어떻게 해야 할까?" 고민

### 안티패턴 7: CLAUDE.md만 쓰고 Hooks 미설정
- ❌ CLAUDE.md에 "테스트 반드시 통과"라고 적고 끝
- ✅ PostToolUse Hook으로 파일 수정 후 자동 테스트 실행

### 안티패턴 8: 도구별 가이드라인 파일 혼동
- ❌ Claude Code 프로젝트에 AGENTS.md만 작성 (Claude Code는 읽지 않음)
- ✅ 사용하는 도구에 맞는 파일 작성 (Claude Code → CLAUDE.md, Codex → AGENTS.md)

---

## 11. 성과 지표

OpenAI의 5개월 실험 결과:

| 지표 | 수치 |
|------|------|
| **코드 라인** | ~1,000,000 |
| **기간** | 5개월 |
| **초기 팀 규모** | 3명 → 7명 |
| **총 PR** | ~1,500개 |
| **엔지니어 1인당 일 평균 PR** | ~3.5개 |
| **시간 절약 추정** | 수작업 대비 ~1/10 |
| **사용자** | 내부 수백 명 (일일 파워 유저 포함) |
| **사람이 직접 작성한 코드** | 0줄 |

### 중요한 점

> "단지 출력을 위한 출력이 아니었다. 이 제품은 매일 사용하는 내부 파워 유저를 포함해 수백 명의 사용자가 사용해왔다."

---

## 12. 미해결 질문 (OpenAI도 아직 배우는 중)

1. **완전 에이전트 생성 시스템에서 아키텍처 일관성이 수년에 걸쳐 어떻게 진화하는가?**
2. **사람의 판단이 가장 큰 영향력을 발휘하는 지점은 어디인가?**
3. **모델 기능이 향상됨에 따라 이 시스템은 어떻게 발전하는가?**

### OpenAI의 결론

> "소프트웨어를 구축하는 데는 여전히 규율이 필요하지만, 규율은 코드보다는 **스캐폴딩**에서 더 많이 드러난다. 코드베이스의 일관성을 유지하는 **툴링, 추상화, 피드백 루프**는 점점 더 중요해지고 있다."

---

## 부록 A: 용어 사전

| 용어 | 의미 |
|------|------|
| **Harness** | 마구(馬具). 에이전트를 올바른 방향으로 이끄는 환경·제약·도구의 총체 |
| **System of Record** | 유일한 진실의 출처. Harness Engineering에서는 리포지터리 |
| **Golden Rules** | 황금 원칙. 에이전트가 반드시 따라야 하는 핵심 불변조건 |
| **Garbage Collection** | 기술 부채를 정기적·자동적으로 해소하는 프로세스 |
| **Agent Readability** | 에이전트가 코드를 읽고 추론할 수 있는 정도 |
| **Exec Plan** | 실행 계획. 진행 상황과 의사결정 로그가 포함된 일급 아티팩트 |
| **Fix-Forward** | 롤백 대신 빠른 수정으로 전진하는 전략 |
| **Progressive Disclosure** | 에이전트가 필요한 만큼만 점진적으로 깊은 정보를 탐색하는 패턴 |
| **Ralph Wiggum Loop** | 에이전트가 자체 리뷰 → 수정 → 리뷰를 반복하는 루프 |
| **llms.txt** | 외부 라이브러리·도구의 에이전트용 요약 참조 문서 |
| **CLAUDE.md** | Claude Code의 프로젝트별 가이드라인 파일 (AGENTS.md의 Claude Code 버전) |
| **AGENTS.md** | OpenAI Codex의 프로젝트별 가이드라인 파일 |
| **Hooks** | Claude Code의 PreToolUse/PostToolUse 훅. 도구 실행 전후에 스크립트 실행 |
| **MEMORY.md** | Claude Code의 세션 간 지속 기억 파일 |
| **Verification Gap** | 에이전트 생성 코드를 사람이 충분히 검증하지 못하는 간극 (Böckeler) |
| **Relocating Rigor** | 엄격함의 재배치. 코드 작성 → 하네스 설계로 규율 이동 |
| **Minions** | Stripe의 에이전트 시스템. 사전 조사·컨텍스트 수집 자동화 |

## 부록 B: 참고 자료

- [원문] OpenAI - Harness Engineering (2026.02.11)
  https://openai.com/ko-KR/index/harness-engineering/
- [관련] Codex 하네스 활용하기: OpenAI가 App Server를 구축한 방법 (2026.02.04)
  https://openai.com/index/harnessing-codex/
- [분석] RevFactory - 하네스 엔지니어링 완전 분석 (2026.03.02)
  https://revf.tistory.com/320
- [참고] Mitchell Hashimoto - AI 코딩 6단계 여정
  https://mitchellh.com/writing/ai-coding-stages
- [참고] Birgitta Böckeler - On Coding with AI (ThoughtWorks / Martin Fowler)
  https://martinfowler.com/articles/on-coding-with-ai.html
- [참고] Claude Code 공식 문서 — CLAUDE.md, Hooks, Settings
  https://docs.anthropic.com/en/docs/claude-code
