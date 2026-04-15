# Site Operations

## 실제 운영 경로

- 전역 설정: `_config.yml`
- 홈: `index.html`, `_layouts/home.html`
- 메뉴와 사이드바 데이터: `_data/navigation.yml`
- 섹션 세부 분류 데이터: `_data/section_topics.yml`
- 언어 전환 include: `_includes/language-switcher.html`
- 섹션 아카이브 레이아웃: `_layouts/section-archive.html`
- 섹션 세부 분류 UI: `_includes/section-topics.html`
- 사이드 메뉴 렌더링: `_includes/nav_list`
- 실제 글: `_posts/*.md`
- 섹션 페이지: `_pages/security.md`, `_pages/development.md`, `_pages/life.md`
- 영어 미러 페이지: `_pages/en-*.md`
- 카테고리, 태그, 검색 페이지: `_pages/category-archive.md`, `_pages/tag-archive.md`, `_pages/search.md`, `_pages/en-*.md`
- 스타일 진입점: `assets/css/main.scss`, `_includes/head/custom.html`
- 이미지: `images/...`, `assets/images/...`

## 메뉴와 다국어 구조

- 상단 메뉴 KOR 키: `main`
- 상단 메뉴 ENG 키: `main_en`
- 사이드바 KOR 키: `sections`
- 사이드바 ENG 키: `sections_en`
- 기본 글과 페이지는 `lang: ko`, 영어 미러는 `lang: en`을 사용한다.
- 언어 매칭 기준은 `translation_key`다.
- 포스트 하단 링크, breadcrumb, 관련 글, 검색 결과는 현재 언어 기준으로 동작한다.

## 홈 페이지네이션

- 기본 `jekyll-paginate`는 사용하지 않는다.
- `_layouts/home.html`이 현재 언어 글만 모두 렌더링한다.
- `assets/js/home-pagination.js`가 클라이언트에서 잘라 보여준다.
- 페이지당 개수는 `_config.yml`의 `home_posts_per_page`에서 관리한다.
- 확인 URL 예시는 `/`, `/?page=2`, `/en/`, `/en/?page=2`다.

## 스타일 메모

- 스킨은 `_config.yml`의 `minimal_mistakes_skin: "dark"`를 사용한다.
- 다크 스킨 보정과 `KOR / ENG` 버튼 스타일은 `_includes/head/custom.html`에서 관리한다.

## 내부 운영 문서와 배포 제외

- 내부 문서와 스킬은 `_config.yml`의 `exclude`에서 배포 대상에서 제외한다.
- 현재 제외 대상에는 `AGENTS.md`, `docs/`, `project-docs/`, `templates/`, `skills/`가 포함되어야 한다.

## 로컬 검증

기본 명령:

```powershell
bundle install
bundle exec jekyll build
bundle exec jekyll serve
```

기본 확인 경로:

- `/`
- `/?page=2`
- `/en/`
- `/en/?page=2`
- `/security/`, `/en/security/`
- `/development/`, `/en/development/`
- `/life/`, `/en/life/`
- `/categories/`, `/en/categories/`
- `/tags/`, `/en/tags/`
- `/search/`, `/en/search/`

## upstream/theme 경로

- 아래 경로는 블로그 운영보다 upstream/theme 성격이 강하다.
- `test/`
- `.github/`
- `.travis.yml`
- `CHANGELOG.md`
- `screenshot.png`
- `screenshot-layouts.png`
