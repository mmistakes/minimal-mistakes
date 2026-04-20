# AGENTS.md

## 저장소 목적

- 이 저장소는 블로그 콘텐츠와 `Minimal Mistakes` 테마 원본이 함께 있는 운영 저장소다.
- 블로그 운영 파일을 우선 보고, upstream/theme 성격의 파일은 작업 요구가 있을 때만 수정한다.

## 공통 원칙

- 추측을 사실처럼 쓰지 않는다.
- 사실, 직접 재현한 결과, 해석/의견을 구분한다.
- 최신성에 민감한 내용은 `검증 기준일`을 적고, `현재`, `최신`, `요즘` 같은 표현은 날짜 없이 쓰지 않는다.
- 버전 의존적인 내용은 `테스트 환경`과 `테스트 버전`을 적고, 미확인 환경은 한계로 남긴다.
- 기술적 주장은 1차 출처를 우선 사용하고, 검증하지 못한 내용은 불확실성을 표시한다.
- 최근 Rust / AI 글의 검증 구조를 기준선으로 삼고, 새 글과 기존 글 모두 같은 최소 검증 기준을 적용한다.
- 기술 글은 화려함보다 검증 가능성을 우선한다. 독자가 근거와 재현 가능성을 판단할 수 있어야 한다.
- 기존 글을 수정할 때는 본문-근거 연결, `검증 기준일`, 환경/버전, 한계와 예외를 우선 보강한다.
- 루트 파일에 모든 규칙을 넣지 않는다. 포스트 작성과 수정은 `_posts/AGENTS.md`를 먼저 보고, 더 가까운 `AGENTS.md`와 상세 문서를 우선 따른다.
- 향후 시리즈, 허브, 주제 로드맵은 루트 `AGENTS.md`에 장문으로 쌓지 않고 `project-docs/plans/` 아래 별도 계획 문서로 분리한다.

## 문서 맵

- 포스트 작성과 수정: `_posts/AGENTS.md`, `docs/blog-style.md`, `templates/post-template.md`
- 포스트 작성과 수정은 시작 전에 `_posts/AGENTS.md`를 먼저 확인한다.
- `_posts/AGENTS.md`는 새 글 기본 구조, 기존 글 보강 우선순위, 튜토리얼/비교/분석 글의 최소 기준을 다루는 기본 진입점이다.
- 사이트 구조와 운영 경로: `docs/site-operations.md`
- 향후 시리즈/허브 계획 인덱스: `project-docs/plans/README.md`
- DevOps 연재 로드맵: `project-docs/plans/ROADMAP_DEVOPS_CURRICULUM.md`
- 반복 가능한 작성/검증 절차: `skills/blog-writing/SKILL.md`
- Rust 시리즈 handoff: `project-docs/handoff/README.md`

## 우선 확인 경로

- 콘텐츠: `_posts`, `_pages`
- 구조와 데이터: `_config.yml`, `_data`, `_includes`, `_layouts`, `index.html`
- 이미지와 스타일: `images`, `assets/images`, `assets/css/main.scss`, `_includes/head/custom.html`

## 리뷰 체크포인트

- 핵심 주장 옆에 근거가 직접 연결되어 있는가
- 사실, 실험, 의견이 문장 또는 섹션 수준에서 구분되는가
- 최신성/버전 민감 정보에 날짜와 환경이 있는가
- 기존 글 수정 시 본문-근거 연결, `검증 기준일`, 환경/버전, 한계와 예외가 우선 보강되었는가
- 튜토리얼은 선행 조건/재현 순서, 비교 글은 비교 기준, 분석 글은 범위·샘플·미확인 사항이 드러나는가
- 불확실한 내용이 단정형 문장으로 남아 있지 않은가
