# AGENTS.md

## 역할

- 이 파일은 저장소 entrypoint다.
- 운영 규칙과 참조 경로만 유지한다.
- 세부 절차, 예시, handoff는 `project-docs/` 아래 문서에서 확인한다.

## 저장소 성격

- 이 저장소는 블로그 콘텐츠 위에 `Minimal Mistakes` 테마 원본이 함께 남아 있는 구조다.
- 블로그 운영 파일과 upstream 테마/데모 자산을 구분해서 수정한다.
- 로컬에 남아 있어도 배포 기준에서 제외된 경로는 운영 파일로 취급하지 않는다.

## 우선 확인 경로

- 전역 설정: `_config.yml`
- 홈: `index.html`, `_layouts/home.html`
- 메뉴/사이드바 데이터: `_data/navigation.yml`
- 섹션 세부 분류 데이터: `_data/section_topics.yml`
- 언어 전환 include: `_includes/language-switcher.html`
- 섹션 아카이브 레이아웃: `_layouts/section-archive.html`
- 섹션 세부 분류 UI: `_includes/section-topics.html`
- 사이드 메뉴 렌더링: `_includes/nav_list`
- 스타일 진입점: `assets/css/main.scss`, `_includes/head/custom.html`
- 콘텐츠: `_posts/*.md`, `_pages/*.md`
- 이미지: `images/...`, `assets/images/...`

## 작업별 참조 문서

- 글 작성, front matter, 섹션/태그 규칙: `project-docs/CONTENT_RULES.md`
- 메뉴, 다국어, 페이지네이션, 스타일, 검증: `project-docs/SITE_OPERATIONS.md`
- handoff 인덱스와 읽기 순서: `project-docs/handoff/README.md`

## 핵심 규칙

- 새 글은 반드시 `_posts` 바로 아래에 둔다.
- `section` 값은 `security`, `development`, `life`만 사용한다.
- 태그는 `tag:`가 아니라 `tags:`를 사용한다.
- KOR/ENG 쌍은 `translation_key`로 연결한다.
- 영어 미러 페이지/포스트에는 `lang: en`을 반드시 넣는다.
- `POSTS` 사이드바가 필요한 페이지는 `sidebar.nav: "sections"`를 유지한다.
- Rust 시리즈 번호, 주제, 순서가 바뀌면 관련 handoff 문서도 함께 갱신한다.

## 운영 우선순위

- 블로그 운영 작업은 `_posts`, `_pages`, `_data`, `index.html`, `images`, `assets/images`, `_includes/head/custom.html`부터 확인한다.
- 아래 경로와 파일은 upstream/demo 성격이 강하므로 필요할 때만 건드린다.
- `docs/`
- `test/`
- `.github/`
- `.travis.yml`
- `CHANGELOG.md`
- `screenshot.png`
- `screenshot-layouts.png`
