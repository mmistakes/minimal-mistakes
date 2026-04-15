# AGENTS.md

## 저장소 목적

- 이 저장소는 블로그 콘텐츠와 `Minimal Mistakes` 테마 원본이 함께 있는 운영 저장소다.
- 블로그 운영 파일을 우선 보고, upstream/theme 성격의 파일은 작업 요구가 있을 때만 수정한다.

## 공통 원칙

- 추측을 사실처럼 쓰지 않는다.
- 사실, 직접 재현한 결과, 해석/의견을 구분한다.
- 최신성에 민감한 내용은 `검증 기준일`을 적는다.
- 버전 의존적인 내용은 `테스트 환경`과 `테스트 버전`을 적는다.
- 기술적 주장은 1차 출처를 우선 사용하고, 검증하지 못한 내용은 불확실성을 표시한다.
- 루트 파일에 모든 규칙을 넣지 않는다. 더 가까운 `AGENTS.md`와 상세 문서를 우선 따른다.

## 문서 맵

- 포스트 작성과 수정: `_posts/AGENTS.md`, `docs/blog-style.md`, `templates/post-template.md`
- 사이트 구조와 운영 경로: `docs/site-operations.md`
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
- 튜토리얼, 비교, 분석 글에 한계와 예외가 포함되는가
- 불확실한 내용이 단정형 문장으로 남아 있지 않은가
