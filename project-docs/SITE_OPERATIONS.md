# Site Operations

## 실제 운영에 중요한 경로

- 전역 설정: `_config.yml`
- 홈: `index.html`
- 홈 레이아웃: `_layouts/home.html`
- 상단 메뉴/사이드 메뉴 데이터: `_data/navigation.yml`
- 섹션 세부 분류 데이터: `_data/section_topics.yml`
- 언어 전환 include: `_includes/language-switcher.html`
- 실제 글: `_posts/*.md`
- 섹션 아카이브 페이지: `_pages/security.md`, `_pages/development.md`, `_pages/life.md`
- 영어 미러 페이지: `_pages/en-home.md`, `_pages/en-security.md`, `_pages/en-development.md`, `_pages/en-life.md`, `_pages/en-category-archive.md`, `_pages/en-tag-archive.md`, `_pages/en-search.md`
- 카테고리/태그/검색 페이지: `_pages/category-archive.md`, `_pages/tag-archive.md`, `_pages/search.md`
- 섹션 아카이브 레이아웃: `_layouts/section-archive.html`
- 섹션 세부 분류 UI: `_includes/section-topics.html`
- 사이드 메뉴 렌더링: `_includes/nav_list`
- 커스텀 스타일 진입점: `assets/css/main.scss`
- 추가 스타일 보정: `_includes/head/custom.html`
- 본문 이미지: `images/...`
- 로고/프로필 이미지: `assets/images/...`

## 메뉴 구조

### 상단 메뉴

- `Security` -> `/security/`
- `Development` -> `/development/`
- `Life` -> `/life/`
- 영어 미러 메뉴는 `/en/...` 경로를 사용한다.

### `_data/navigation.yml` 키

- 상단 메뉴 KOR: `main`
- 상단 메뉴 ENG: `main_en`
- 사이드바 KOR: `sections`
- 사이드바 ENG: `sections_en`

### 라벨

- KOR: `전체/보안/개발/일상/카테고리/태그/검색`
- ENG: `All/Security/Development/Life/Categories/Tags/Search`

## 다국어 구조

- 기본 페이지와 글은 `lang: ko`
- 영어 미러 페이지와 글은 `lang: en`
- 언어 매칭 기준은 `translation_key`
- `KOR / ENG` 버튼은 `_includes/language-switcher.html`에서 현재 문서와 같은 `translation_key`를 찾아 이동
- 포스트 하단 카테고리/태그 링크, breadcrumb, 이전/다음 글, 관련 글도 현재 언어 기준으로 동작
- 검색 결과도 `document.documentElement.lang` 기준으로 현재 언어 결과만 노출

## 스타일 메모

- 스킨은 `_config.yml`에서 `minimal_mistakes_skin: "dark"`를 사용한다.
- 다크 스킨 보정은 `_includes/head/custom.html`의 inline `<style>`에 들어 있다.
- 상단 카운트 탭 UI는 제거된 상태다.
- `KOR / ENG` 버튼 스타일도 `_includes/head/custom.html`에서 관리한다.

## 홈 페이지네이션

- 기본 `jekyll-paginate`는 제거된 상태다.
- 제거 이유:
- KOR/ENG 홈에서 같은 paginator를 공유하면 한국어 홈에 일부 글만 보이는 문제가 생긴다.
- 현재 동작:
- `_layouts/home.html`이 현재 언어 글만 모두 렌더링한다.
- `assets/js/home-pagination.js`가 `10개씩` 잘라서 보여준다.
- 페이지 이동은 `/` 또는 `/en/`에 `?page=2` 같은 쿼리스트링을 붙이는 방식이다.
- 페이지당 개수는 `_config.yml`의 `home_posts_per_page`에서 관리한다.

## 테스트 메모

- 기본 명령:

```powershell
bundle install
bundle exec jekyll serve
```

- 확인 URL:
- `/`
- `/?page=2`
- `/en/`
- `/en/?page=2`
- `/security/`
- `/en/security/`
- `/development/`
- `/en/development/`
- `/life/`
- `/en/life/`
- `/categories/`
- `/en/categories/`
- `/tags/`
- `/en/tags/`
- `/search/`
- `/en/search/`
- Codex 세션에서는 `bundle` 명령이 잡히지 않을 수 있다.
- 가능하면 UI, 사이드바, 탭 색상까지 직접 확인한다.

## upstream/demo 경로

- 아래 경로와 파일은 현재 블로그 운영보다 upstream 테마 성격이 강하다.
- `docs/`
- `test/`
- `.github/`
- `.travis.yml`
- `CHANGELOG.md`
- `screenshot.png`
- `screenshot-layouts.png`
- 블로그 운영 작업은 `_posts`, `_pages`, `_data`, `index.html`, `images`, `assets/images`, `_includes/head/custom.html`부터 본다.
