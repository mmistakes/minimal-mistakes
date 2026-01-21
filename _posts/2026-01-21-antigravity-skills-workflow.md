---
layout: single
title:  "비전공자가 만든 Antigravity 개발 파이프라인 - 6개의 AI 전문가 팀 구축기"
categories: GEN_AI
tag: [ai, gen_ai, google, antigravity, gemini, coding, workflow, skills, no-code]
---

# 비전공자가 만든 Antigravity 개발 파이프라인

## 들어가며: 삽질의 기록을 시스템으로

나는 개발자가 아니다. 컴퓨터공학을 전공하지도 않았고, 코딩 부트캠프를 다닌 적도 없다. 그런데 지난 1년간 AI 코딩 도구들을 붙잡고 이것저것 만들어보면서, 나름의 **작업 프로세스**가 생겼다.

"기획을 먼저 명확히 해야 AI가 덜 헤맨다", "코드 짜고 나면 무조건 한 번 검토시켜야 한다", "테스트 안 돌리면 나중에 큰일난다"... 이런 것들. 처음엔 감으로 했는데, 실패를 거듭하면서 패턴이 보이기 시작했다.

그러다 구글의 **Antigravity**를 접했다. VS Code 기반에 **Gemini 3.0**이 탑재된 에이전트 퍼스트 IDE. 단순한 코드 자동완성이 아니라, AI가 직접 계획을 세우고, 터미널을 조작하고, 브라우저로 테스트까지 하는 도구다.

여기서 **스킬(Skill)**이라는 기능을 발견했다. AI에게 특정 역할과 규칙을 미리 정의해둘 수 있는 기능인데, 이걸 보자마자 생각이 들었다.

**"내가 그동안 삽질하면서 만든 프로세스를, 이걸로 자동화할 수 있겠다."**

이 글은 비전공자인 내가 직접 설계하고 실제로 사용 중인 **6개의 커스텀 스킬**과 이들을 연결한 **자동화 워크플로우**에 대한 기록이다. 전문 개발자의 정석이 아닐 수 있다. 하지만 나처럼 코드를 모르는 사람이 AI와 협업해서 결과물을 만들어내는 데는 꽤 효과적이었다.

---

## 목차

1. Antigravity 스킬이란?
2. 왜 이런 파이프라인을 만들었나
3. 6개의 커스텀 스킬 상세 설명
4. 워크플로우 자동화: 오케스트레이션의 힘
5. 실전에서 배운 것들
6. 마무리

---

## 1. Antigravity 스킬이란?

Antigravity의 **스킬(Skill)**은 AI 에이전트에게 부여하는 **전문 페르소나**다. 단순히 "코드 짜줘"라고 시키는 것과, "너는 10년 경력의 시니어 엔지니어야. 보안 취약점과 성능 병목을 집중적으로 봐줘"라고 역할을 정의해주는 건 완전히 다른 결과를 낸다.

스킬의 구성 요소:

| 항목 | 설명 |
|-----|------|
| **name** | 스킬의 고유 이름 (예: Code_Auditor) |
| **description** | 이 스킬이 하는 일의 한 줄 요약 |
| **Parameters** | 스킬 호출 시 필요한 입력값 정의 |
| **System Prompt** | AI가 따라야 할 상세 지침과 프로세스 |
| **Output Format** | 결과물의 구조와 형식 |

핵심은 **System Prompt**다. 여기에 역할, 프로세스, 품질 기준을 명확히 적어두면 AI는 그 기준을 엄격히 따른다. 마치 회사에서 신입에게 업무 매뉴얼을 건네주는 것과 같다.

---

## 2. 왜 이런 파이프라인을 만들었나

AI 코딩 도구를 처음 쓸 때는 그냥 "이거 만들어줘"하고 던졌다. 결과물이 나오긴 하는데, 문제가 많았다.

- 내가 원하는 게 뭔지 AI가 제대로 이해 못하는 경우가 많았다
- 코드가 나와도 그게 맞는 건지 틀린 건지 내가 판단할 수가 없었다
- 나중에 뭔가 안 되면 어디서부터 고쳐야 하는지 막막했다

그래서 자연스럽게 **단계를 나누게** 됐다.

```
[기획 명확화] → [설계 문서화] → [코드 작성] → [코드 검토] → [테스트]
```

이 흐름을 머릿속으로만 갖고 있다가, Antigravity의 스킬 기능을 보고 아예 시스템으로 만들어버렸다. 각 단계마다 **전문가 역할의 AI**를 배치하고, 서로의 산출물을 주고받게 한 것이다.

내가 삽질 끝에 정리한 원칙들:

1. **한 놈이 한 가지만**: 하나의 스킬은 하나의 역할에만 집중시킨다. 여러 개 시키면 다 어중간해진다.
2. **문서로 남기기**: AI끼리 대화하면 맥락이 날아간다. 중간 산출물은 무조건 파일로 저장해서 다음 단계에 넘긴다.
3. **자동 검수**: 내가 코드를 못 읽으니까, 다른 AI에게 검토를 시킨다. 점수가 낮으면 자동으로 수정 요청.
4. **기록 남기기**: 뭐가 어디서 막혔는지 알아야 다음에 똑같은 실수를 안 한다.

이 원칙으로 만든 6개의 스킬을 소개한다.

---

## 3. 6개의 커스텀 스킬 상세 설명

### 3.1 Requirement_Interrogator (기술 전략가)

**역할**: 아이디어를 분석하고, 최적의 기술 스택을 제안하며, 구현에 필요한 사양을 확정한다.

이 스킬을 만든 이유가 있다. 예전에 "게시판 만들어줘"라고 했다가 낭패를 봤다. AI가 만든 건 내가 생각한 게시판이 아니었다. 회원가입 기능은 빠져 있고, 글 수정은 안 되고...

그래서 **먼저 질문을 던지는 AI**를 만들었다. 내가 뭘 원하는지 AI가 캐묻고, 그걸 바탕으로 명확한 사양서를 뽑아낸다.

```markdown
## Parameters
- `idea` (string): 구현하고자 하는 서비스의 초기 아이디어

## System Prompt
사용자가 아이디어를 주면:
1. 아이디어 분석 및 기술 스택 제안
2. 사양 확정을 위한 질의
3. 최종 사양 정의서 도출
```

**출력 예시**:
- 기술 스택 제안: "가벼운 게시판이니 SQLite + FastAPI 추천"
- 핵심 질의: "회원가입 기능 필요한가요? 글 수정/삭제 권한은?"
- 예상 아키텍처 다이어그램

---

### 3.2 Blueprint_Composer (시스템 아키텍트)

**역할**: 확정된 사양 정의서를 바탕으로 `/docs` 폴더에 개발 문서를 생성한다.

추상적인 기획서를 **코딩 에이전트가 즉시 작업에 착수할 수 있는 수준**의 기술 문서로 변환한다.

```markdown
## Parameters
- `spec` (string): 확정된 프로젝트 사양 정의서 전문

## System Prompt
1. 문서 전략 수립: 필요한 문서 종류 결정 (API 명세, ERD, UI 가이드 등)
2. 기술 문서 생성: `/docs` 폴더에 Markdown 파일로 생성
3. 상세 구현 지침 포함: 변수 타입, API 파라미터, DB 필드 제약 조건 명시
```

**출력 예시**:
- `/docs/api_specification.md` (엔드포인트, 파라미터, 응답 형식)
- `/docs/database_erd.md` (테이블 구조, 관계, 제약조건)
- `/docs/ui_style_guide.md` (컴포넌트 규격, 색상 팔레트)

---

### 3.3 Code_Generator (풀스택 개발자)

**역할**: `/docs`에 저장된 문서들을 분석하여 실제 작동하는 소스 코드를 작성한다.

단순한 코드 조각이 아니라, **실행 가능한 패키지 형태**로 결과물을 만든다.

```markdown
## Parameters
- `doc_path` (string): 설계 문서 경로
- `target_feature` (string): 구현할 핵심 기능명

## System Prompt
1. 문서 분석 및 스택 적용: 베스트 프랙티스 엄격 적용
2. 모듈식 클린 코드: DRY, SRP 준수
3. 환경 설정 자동화: `.project_config.json` 생성/관리
4. 구현 완결성: 테스트 코드 포함
```

**핵심 포인트**: 이 스킬은 `.project_config.json`이라는 설정 파일을 관리한다. 기술 스택, 라이브러리 버전, 네이밍 규칙 등을 여기에 명시해두면, 다른 스킬들(Code_Auditor 등)이 이를 참조해서 일관된 기준으로 코드를 평가할 수 있다.

```json
{
  "project_config": {
    "project_type": "Python FastAPI",
    "db_schema": "users(id, email, hashed_password), posts(id, author_id, content)",
    "naming_convention": "snake_case for variables, PascalCase for classes"
  }
}
```

---

### 3.4 Code_Auditor (코드 감사관)

**역할**: 코드의 로직 결함, 보안 취약점, 성능 병목을 분석하고 리팩토링 제안을 제공한다.

솔직히 말하면, 나는 AI가 짠 코드가 좋은 건지 나쁜 건지 모른다. 그래서 **다른 AI에게 검토를 시킨다**. 이 스킬의 페르소나는 **"Google, Toss, Meta에서 10년 이상 근무한 시니어 엔지니어"**로 설정했다. 일부러 빡빡한 기준으로 검토하게 만들었다.

```markdown
## Parameters
- `code` (string): 리뷰할 소스 코드
- `language` (string): 사용 언어
- `strictness` (1~5): 리뷰 엄격도
- `project_type`, `db_schema`, `naming_convention`: 컨텍스트 정보

## Audit Criteria
1. Context Alignment: 프로젝트 컨벤션 준수 여부
2. Bug & Logic: 예외 처리 누락, 무한 루프, 메모리 누수
3. Security: SQL Injection, 하드코딩된 API Key, XSS
4. Clean Code: 변수명, 함수 길이, SOLID 원칙
5. Modern Syntax: 최신 버전 권장 문법 적용 여부
```

**출력 예시**:
- 총평: "7/10점. 기능은 동작하나 보안 취약점 존재"
- Critical Issue: "L42: SQL 쿼리에 파라미터 바인딩 미사용"
- Refactoring Suggestion: 개선된 코드 블록과 이유 설명

---

### 3.5 Logic_Test_Crafter (QA 엔지니어)

**역할**: 구현 코드와 설계 문서를 대조하여 논리적 결함을 찾고 테스트 코드를 생성한다.

단순히 "테스트 짜줘"가 아니라, **엣지 케이스를 철저히 식별**하도록 지시한다.

```markdown
## Parameters
- `code_context` (string): 테스트 대상 소스 코드와 맥락

## System Prompt
1. 엣지 케이스 분석: API 실패, DB 롤백, 경계값, 비정상 입력
2. 테스트 프레임워크 선택: `.project_config.json` 참조 (Pytest, Jest 등)
3. 로직 모순 리포트: 설계 vs 구현의 간극 정리
4. Mocking & Isolation: 외부 의존성 격리
```

**출력 예시**:
- 논리적 결함 리포트: "설계서는 이메일 중복 체크를 명시했으나, 구현에서 누락"
- 테스트 코드: `test_user_registration.py` 전문
- 실행 명령: `pytest --cov=src tests/`

---

### 3.6 Workflow_Manager (프로젝트 매니저)

**역할**: 전체 파이프라인을 오케스트레이션하고, 품질 게이트를 관리한다.

이 스킬이 **핵심 허브**다. 다른 5개 스킬 사이의 산출물 전달을 조율하고, 품질 기준 미달 시 자동으로 반려한다.

```markdown
## Parameters
- `current_stage` (string): 현재 단계 (Interview, Design, Coding, Audit, Testing)
- `project_name` (string): 프로젝트명
- `input_data` (string): 이전 단계 산출물

## System Prompt
1. Step-by-Step Hand-off:
   - Requirement_Interrogator → Blueprint_Composer
   - Blueprint_Composer → Code_Generator
   - Code_Generator → Code_Auditor + Logic_Test_Crafter (동시)

2. Quality Gatekeeping:
   - Code_Auditor 점수 8점 미만 시 반려 → Code_Generator로 롤백
   - Logic_Test_Crafter 테스트 실패 시 자동 재시도 (최대 3회)
   - 3회 초과 시 사용자에게 보고 후 중단

3. Status Reporting:
   - 진척률, 산출물 요약, 병목 현상 투명 보고
```

**출력 예시**:

```markdown
[PROJECT DASHBOARD]
- Stage: Coding
- Progress: 60%
- Status: Warning (Audit 점수 7점, 1회 롤백 진행 중)

[HAND-OFF LOG]
(From: Code_Generator → To: Code_Auditor)
- 전달 파일: /src/api/users.py, /src/models/user.py
- 라인 수: 총 248 Lines

[GATEKEEPING DECISION]
- Decision: FAIL
- Reason: Security Issue - SQL Injection 취약점 발견
- Action: Code_Generator에게 피드백 포함 수정 요청

[PM ADVICE]
- DB 쿼리 전체를 ORM으로 전환하면 보안과 유지보수 동시 개선 가능
```

---

## 4. 워크플로우 자동화: 오케스트레이션의 힘

6개 스킬이 어떻게 연결되는지 시각화하면 다음과 같다:

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Workflow_Manager (PM)                          │
│                    전체 파이프라인 오케스트레이션                       │
└─────────────────────────────────────────────────────────────────────┘
                                 │
     ┌───────────────────────────┼───────────────────────────┐
     │                           │                           │
     ▼                           ▼                           ▼
┌─────────────┐           ┌─────────────┐           ┌─────────────┐
│ Requirement │    ──▶    │  Blueprint  │    ──▶    │    Code     │
│ Interrogator│  사양서    │  Composer   │  설계문서   │  Generator  │
│ (기획 분석)  │           │ (설계 문서)  │           │ (코드 작성)  │
└─────────────┘           └─────────────┘           └─────────────┘
                                                          │
                                                          │ 소스 코드
                                          ┌───────────────┴───────────────┐
                                          │                               │
                                          ▼                               ▼
                                   ┌─────────────┐                 ┌─────────────┐
                                   │    Code     │                 │ Logic_Test  │
                                   │   Auditor   │                 │   Crafter   │
                                   │ (코드 리뷰)  │                 │ (테스트 작성)│
                                   └─────────────┘                 └─────────────┘
                                          │                               │
                                          └───────────────┬───────────────┘
                                                          │
                                                          ▼
                                               ┌─────────────────┐
                                               │  품질 게이트     │
                                               │ (8점 이상 PASS)  │
                                               └─────────────────┘
                                                          │
                                         ┌────────────────┴────────────────┐
                                         │                                 │
                                   [PASS: 완료]                     [FAIL: 롤백]
                                                                           │
                                                                           ▼
                                                               ┌─────────────────┐
                                                               │ Code_Generator  │
                                                               │   (수정 요청)    │
                                                               └─────────────────┘
```

### 실제 작동 흐름

1. **아이디어 입력**: "사용자가 글을 쓰고 수정할 수 있는 간단한 게시판"
2. **Requirement_Interrogator**: 기술 스택 제안, 질의응답, 사양 정의서 확정
3. **Blueprint_Composer**: `/docs`에 API 명세, DB 설계, UI 가이드 생성
4. **Code_Generator**: 설계 문서 기반 소스 코드 작성
5. **Code_Auditor + Logic_Test_Crafter**: 동시에 리뷰 및 테스트
6. **Workflow_Manager**: 점수 8점 미만 시 피드백과 함께 Code_Generator로 반려
7. **반복**: 품질 기준 충족까지 자동 반복 (최대 3회)
8. **완료**: 모든 게이트 통과 시 최종 산출물 제출

---

## 5. 실전에서 배운 것들

### 5.1 스킬 프롬프트 작성할 때 깨달은 것

| DO | DON'T |
|-----|-------|
| 구체적인 페르소나 부여 ("10년 경력 시니어") | 막연한 역할 ("좋은 개발자") |
| 수치화된 기준 ("8점 미만 시 반려") | 주관적 기준 ("별로면 고쳐") |
| Output Format 명시 | 자유 형식 방치 |
| 단계별 프로세스 정의 | 한 번에 모든 것 요구 |

### 5.2 `.project_config.json` 활용

프로젝트 루트에 이 파일을 두면, 모든 스킬이 **동일한 컨텍스트**를 공유한다:

- Code_Generator가 `snake_case` 규칙으로 코드를 작성하면
- Code_Auditor도 같은 규칙으로 평가한다

이렇게 하면 "왜 camelCase로 안 썼어?"라는 불필요한 지적이 사라진다.

### 5.3 처음엔 이렇게 시작했다

나도 처음부터 6개 다 쓴 게 아니다. 단계적으로 추가했다:

1. **처음**: Code_Generator + Code_Auditor만 썼다. "짜줘 → 검토해줘" 반복.
2. **그 다음**: 자꾸 기획이 꼬여서 Requirement_Interrogator를 추가했다.
3. **지금**: 전체 파이프라인 + Workflow_Manager로 자동화.

한 번에 다 만들려고 하지 않아도 된다. 필요를 느낄 때 하나씩 추가하면 된다.

### 5.4 무한 루프 트라우마

Workflow_Manager에 **"최대 3회 재시도"** 제한을 둔 건 쓰라린 경험 때문이다. 한번은 Code_Auditor가 계속 "보안 이슈 있음"이라고 하고, Code_Generator는 계속 고친다고 고치는데 같은 문제가 반복됐다. 정신 차려보니 토큰이 어마어마하게 날아가 있었다.

3회 안에 해결 안 되는 문제는 내가 개입해서 방향을 바꿔줘야 한다. AI끼리만 돌리면 안 된다.

---

## 6. 마무리

### 6.1 요약

| 스킬 | 역할 | 핵심 Output |
|-----|------|-----------|
| Requirement_Interrogator | 기술 전략가 | 사양 정의서 |
| Blueprint_Composer | 시스템 아키텍트 | `/docs` 폴더 문서 |
| Code_Generator | 풀스택 개발자 | 소스 코드 + 테스트 |
| Code_Auditor | 코드 감사관 | 리뷰 리포트 + 점수 |
| Logic_Test_Crafter | QA 엔지니어 | 테스트 코드 + 결함 리포트 |
| Workflow_Manager | 프로젝트 매니저 | 파이프라인 조율 + 품질 게이트 |

### 6.2 같은 비전공자에게

1년 전의 나에게 이걸 보여줬다면 엄청 좋았을 것 같다. 그때는 AI한테 "이거 만들어줘"하고 결과가 이상하면 "아 왜 안 돼"만 반복했으니까.

코딩을 몰라도 괜찮다. 대신 **AI를 어떻게 굴릴지**를 알아야 한다. 역할을 나누고, 규칙을 정해주고, 검수 단계를 만들고, 안 되면 롤백하고. 이게 내가 삽질 끝에 배운 것들이다.

오늘 공유한 6개의 스킬이 정답은 아니다. 나도 계속 고치고 있다. 하지만 **"AI한테 그냥 시키면 되는 거 아냐?"**에서 **"어떻게 시켜야 잘 되지?"**로 생각이 바뀌는 데는 도움이 될 거다.

나처럼 코드 모르는 사람들, 일단 해보자. 생각보다 된다.

---

## 참고 링크

- [Google Antigravity 공식 문서](https://antigravity.google/docs/plans)
- [Google Antigravity 시작하기 - Codelabs](https://codelabs.developers.google.com/getting-started-google-antigravity?hl=ko)
- [Gemini 3.0 - Google의 새로운 AI IDE와 Antigravity 사용법](https://lilys.ai/ko/notes/google-antigravity-20251209/antigravity-gemini-3-google-ai-ide)
- [AI를 위한 프로젝트 안내서: AGENTS.md와 CLAUDE.md](https://www.daleseo.com/agents-md/)
