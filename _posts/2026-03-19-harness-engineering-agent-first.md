---
layout: post
title: "Harness Engineering: 에이전트 우선 소프트웨어 개발 방법론"
date: 2026-03-19 09:53:00 +0900
categories: [ai-daily-news]
tags: [harness-engineering, codex, ai-agent, software-engineering, architecture, methodology]
---

> **원문**: [OpenAI - Harness Engineering: 에이전트 우선 세계에서 Codex 활용하기](https://openai.com/ko-KR/index/harness-engineering/) (2026.02.11)  
> **분석 작성**: 2026.03.18  
> **목적**: 이 문서를 프로젝트에 붙여넣으면 Harness Engineering 방법론을 즉시 적용할 수 있는 실행 가이드

---

## 1. Harness Engineering이란?

### 1.1 정의

**Harness Engineering**은 소프트웨어 엔지니어의 역할이 **코드 작성자**에서 **환경 설계자**로 전환되는 에이전트 우선(Agent-First) 개발 방법론이다.

핵심 공식:

```text
사람이 조정(Orchestrate) + 에이전트가 수행(Execute)
= Harness Engineering
```

- **사람**: 목표 설정, 환경 설계, 의도 명시, 피드백 루프 구축, 결과 검증
- **에이전트**: 코드 작성, 테스트, CI 구성, 문서화, 리뷰, 리팩터링, 배포

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

### 원칙 2: AGENTS.md = 목차 (Table of Contents, Not Encyclopedia)

**AGENTS.md는 ~100줄의 맵이다. 백과사전이 아니다.**

OpenAI는 "하나의 거대한 AGENTS.md" 접근 방식이 실패한 이유를 4가지로 정리했다:

1. **컨텍스트는 희소 리소스** — 거대한 지침은 에이전트가 핵심 제약을 놓치거나 잘못된 제약에 최적화하게 만든다
2. **모든 것이 중요하면 아무것도 중요하지 않다** — 에이전트가 의도적으로 탐색하는 대신 로컬 패턴 매칭을 수행한다
3. **순식간에 낡는다** — 획일적 매뉴얼은 "낡은 규칙들의 무덤"이 된다
4. **검증이 어렵다** — 단일 블롭은 기계적 점검(커버리지, 신선도, 소유권)에 적합하지 않다

**올바른 구조:**

```text
AGENTS.md ← ~100줄, 맵/목차 역할
ARCHITECTURE.md ← 도메인·레이어 최상위 맵
docs/
├── design-docs/
│   ├── index.md ← 설계 문서 목차
│   ├── core-beliefs.md ← 팀 핵심 신념 & 에이전트 운영 원칙
│   └── [주제별].md
├── exec-plans/
│   ├── active/ ← 현재 진행 중인 계획
│   ├── completed/ ← 완료된 계획
│   └── tech-debt-tracker.md
├── product-specs/
│   ├── index.md
│   └── [기능별].md
├── references/
│   ├── [라이브러리]-llms.txt ← 외부 라이브러리 에이전트용 요약
│   └── ...
├── generated/
│   └── db-schema.md ← 자동 생성 문서
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
touch AGENTS.md
touch ARCHITECTURE.md
touch docs/design-docs/{index.md,core-beliefs.md}
touch docs/exec-plans/tech-debt-tracker.md
touch docs/product-specs/index.md
touch docs/{DESIGN.md,FRONTEND.md,BACKEND.md,QUALITY_SCORE.md,PLANS.md,RELIABILITY.md,SECURITY.md}
```

### Step 2: AGENTS.md 작성 (맵 역할, ~100줄)

```markdown
# AGENTS.md

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

## 5. 에이전트 자율성 수준 모델

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

## 6. 체크리스트: 프로젝트 적용 시 확인 사항

### 즉시 적용 (Day 1)

- [ ] `AGENTS.md` 생성 또는 경량화 (~100줄, 맵 역할)
- [ ] `ARCHITECTURE.md` 생성 (레이어 모델, 의존성 규칙, 도메인 맵)
- [ ] `docs/` 디렉토리 구조 생성 (design-docs, exec-plans, product-specs, references)
- [ ] `docs/design-docs/core-beliefs.md` 작성 (황금 원칙 3~7개)
- [ ] `docs/QUALITY_SCORE.md` 초기 버전 작성
- [ ] 현재 진행 중인 작업을 `docs/exec-plans/active/`에 기록

### 1주 내 적용

- [ ] 커스텀 린터 규칙 최소 3개 추가 (에러 메시지에 수정 지침 포함)
- [ ] 외부 라이브러리 참조 문서를 `docs/references/`에 llms.txt로 정리
- [ ] DB 스키마 문서를 `docs/generated/`에 자동 생성 스크립트 작성
- [ ] CI에서 docs/ 신선도 검증 작업 추가

### 1개월 내 적용

- [ ] 에이전트 리뷰 워크플로 구축 (에이전트가 PR 리뷰 + 코멘트)
- [ ] 가비지 컬렉션 프로세스 자동화 (주 1회 cleanup 에이전트 실행)
- [ ] 품질 등급 자동 업데이트 스크립트
- [ ] 에이전트 자율성 Level 2 → Level 3 전환

### 분기별 점검

- [ ] core-beliefs.md가 현재 팀 합의를 반영하는가?
- [ ] exec-plans/active/에 낡은 계획이 남아있지 않은가?
- [ ] QUALITY_SCORE.md가 실제 상태를 반영하는가?
- [ ] 린터 규칙이 실제 위반 패턴을 커버하는가?

---

## 7. 안티패턴: 이것은 피하라

### 안티패턴 1: 거대한 AGENTS.md
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

---

## 8. 성과 지표

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

## 9. 미해결 질문 (OpenAI도 아직 배우는 중)

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

## 부록 B: 참고 자료

- [원문] OpenAI - Harness Engineering (2026.02.11)  
  https://openai.com/ko-KR/index/harness-engineering/
- [관련] Codex 하네스 활용하기: OpenAI가 App Server를 구축한 방법 (2026.02.04)  
  https://openai.com/index/harnessing-codex/
