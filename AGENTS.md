# AGENTS.md

이 문서는 이 저장소를 처음 여는 다른 에이전트가 빠르게 구조를 이해하고 안전하게 수정할 수 있도록 정리한 운영 메모다.

## 프로젝트 성격

- 이 저장소는 순수한 블로그 전용 프로젝트라기보다 `Minimal Mistakes` Jekyll 테마 원본 위에 실제 블로그 콘텐츠를 얹은 구조다.
- 따라서 루트에 테마 소스가 많이 남아 있다.
- 실제 블로그 운영에 필요한 파일과, upstream 테마/데모 파일을 구분해서 작업해야 한다.
- `docs/`, `test/`, `.github/` 같은 upstream 보조 자산은 이제 Git 추적 대상에서 제외되어 있을 수 있다. 로컬에 남아 있어도 배포용 저장소 기준으로는 없는 것으로 생각하고 작업하는 편이 맞다.

## 실제 운영에 중요한 경로

- 전역 설정: `_config.yml`
- 홈: `index.html`
- 홈 레이아웃: `_layouts/home.html`
- 상단 메뉴/사이드 메뉴 데이터: `_data/navigation.yml`
- 언어 전환 include: `_includes/language-switcher.html`
- 실제 글: `_posts/*.md`
- 섹션별 아카이브 페이지:
  - `_pages/security.md`
  - `_pages/development.md`
  - `_pages/life.md`
- 영어 미러 페이지:
  - `_pages/en-home.md`
  - `_pages/en-security.md`
  - `_pages/en-development.md`
  - `_pages/en-life.md`
  - `_pages/en-category-archive.md`
  - `_pages/en-tag-archive.md`
  - `_pages/en-search.md`
- 카테고리/태그/검색 페이지:
  - `_pages/category-archive.md`
  - `_pages/tag-archive.md`
  - `_pages/search.md`
- 섹션 아카이브 레이아웃: `_layouts/section-archive.html`
- 사이드 메뉴 렌더링: `_includes/nav_list`
- 커스텀 스타일 import 진입점: `assets/css/main.scss`
- 추가 스타일 보정: `_includes/head/custom.html`
- 글 본문 이미지: `images/...`
- 사이트 로고/프로필 이미지: `assets/images/...`

## 블로그 분류 구조

현재 블로그는 상단 기준으로 아래 3개 메뉴를 사용한다.

- `Security` -> `/security/`
- `Development` -> `/development/`
- `Life` -> `/life/`

영어 페이지에서는 `/en/...` 경로를 사용하는 미러 메뉴를 쓴다.

상단 메뉴는 `_data/navigation.yml`의 아래 키에서 관리한다.

- `main`: 기본(KOR) 경로용
- `main_en`: ENG 경로용

사이드바의 `POSTS` 메뉴도 `_data/navigation.yml`에서 관리한다.

- `sections`: 기본(KOR) 경로용
- `sections_en`: ENG 경로용

라벨은 현재 `전체/보안/개발/일상/카테고리/태그/검색`의 한국어 표기를 유지하지만, ENG 페이지에서는 링크만 `/en/...`로 바뀐다.

## 새 글 작성 규칙

새 글은 반드시 `_posts` 바로 아래에 둔다.

- 좋은 예: `_posts/2026-04-07-my-post.md`
- 피해야 할 예: `_posts/security/2026-04-07-my-post.md`

이유:

- Jekyll은 `_posts` 하위 폴더명을 category/permalink에 반영할 수 있다.
- 섹션 구분만 하려다가 기존 URL 구조와 카테고리 동작이 꼬일 수 있다.

새 글 front matter 최소 권장 예시는 아래와 같다.

```yaml
---
layout: single
title: "글 제목"
date: 2026-04-07
lang: ko
translation_key: example-post
section: development
categories: Dev
tags: [example]
---
```

영문 글을 같이 운영할 때는 같은 `translation_key`를 공유하는 영어 포스트를 별도로 만든다.

```yaml
---
layout: single
title: "Post title"
date: 2026-04-07
lang: en
translation_key: example-post
section: development
categories: Dev
tags: [example]
permalink: /en/dev/example-post/
---
```

## section 필드 규칙

`section` 값은 아래 셋 중 하나만 사용한다.

- `security`
- `development`
- `life`

섹션 페이지는 `site.posts | where: "section", ...` 방식으로 필터링한다.

즉, 탭에 글이 보이게 하려면 폴더 이동이 아니라 front matter의 `section`을 맞춰야 한다.

추가로 현재는 언어도 함께 필터링한다.

- KOR 페이지는 `lang: ko` 글만 노출
- ENG 페이지는 `lang: en` 글만 노출

따라서 새 영어 글을 만들 때 `section`만 맞추고 `lang`을 빼먹으면 ENG 섹션에서 보이지 않는다.

## tags 필드 주의

- `tag:`가 아니라 `tags:`를 사용한다.
- 이 테마의 태그 아카이브는 `site.tags` 기준으로 동작한다.
- 단수형 `tag`를 쓰면 `/tags/` 페이지에 반영되지 않을 수 있다.

## 사이드바 메뉴가 유지되는 방식

`POSTS` 사이드바를 계속 보이게 하려면 페이지 front matter에 아래가 있어야 한다.

```yaml
sidebar:
  nav: "sections"
```

현재 아래 페이지들은 이미 그렇게 설정되어 있다.

- 홈 `index.html`
- 각 섹션 페이지 `_pages/security.md`, `_pages/development.md`, `_pages/life.md`
- `_pages/category-archive.md`
- `_pages/tag-archive.md`
- `_pages/search.md`
- 기본 글 defaults in `_config.yml`

만약 새 아카이브/소개 페이지를 만들었는데 왼쪽 `POSTS` 메뉴가 사라지면, 먼저 이 설정이 있는지 확인할 것.

영어 미러 페이지를 만들 때도 동일하게 `sidebar.nav: "sections"`를 유지한다.
영어용 링크 전환은 `_includes/nav_list` 내부에서 `page.lang == "en"`일 때 `sections_en`을 선택하는 방식으로 처리한다.

## 다국어 구조 메모

- 기본(KOR) 페이지는 `lang: ko`
- 영어 미러 페이지/포스트는 `lang: en`
- 언어 매칭은 `translation_key`로 연결
- 헤더의 `KOR / ENG` 버튼은 `_includes/language-switcher.html`에서 현재 페이지와 같은 `translation_key`를 가진 페이지/포스트를 찾아 이동
- 포스트 하단 카테고리/태그 링크, breadcrumb, 이전/다음 글, 관련 글도 현재 언어 기준으로 동작하도록 수정된 상태
- 검색 결과도 `document.documentElement.lang` 기준으로 현재 언어 결과만 보이도록 조정된 상태

## 스타일 관련 메모

- 다크 스킨에서 필요한 일부 보정은 `_includes/head/custom.html` 안의 inline `<style>`로 처리 중
- 상단 카운트 탭 UI는 제거된 상태다
- `KOR / ENG` 언어 버튼 스타일도 `_includes/head/custom.html`에 들어 있다

## 테마 원본/데모 파일

아래 경로와 파일은 현재 블로그 운영보다 upstream 테마 성격이 더 강하다.

- `docs/`
- `test/`
- `.github/`
- `.travis.yml`
- `CHANGELOG.md`
- `screenshot.png`
- `screenshot-layouts.png`

이들은 배포용 저장소에서 Git 추적 제외 대상으로 정리된 상태일 수 있다.

반면 아래는 여전히 현재 블로그 동작에 직접 영향을 주는 핵심 소스다.

블로그 운영 작업이라면 먼저 `_posts`, `_pages`, `_data`, `index.html`, `images`, `assets/images`, `_includes/head/custom.html` 쪽을 우선 확인할 것.

## 현재 알려진 구조적 특징

- 스킨은 `_config.yml`에서 `minimal_mistakes_skin: "dark"` 사용 중
- 홈은 최신 글 목록 구조이며, KOR/ENG 각각 `10개씩` 홈 전용 페이지네이션을 사용
- 상단 메뉴는 `Security/Development/Life`
- 사이드 메뉴는 `전체/보안/개발/일상/카테고리/태그/검색`
- 현재는 KOR/ENG 이중 구조를 가짐
- 기존 한국어 글 외에 Rust 개발 글 2개도 `lang: ko`, `section: development`로 존재
- 영어 번역 글은 보안 2개, 개발 2개가 별도 포스트로 존재

## 홈 페이지네이션 메모

- 기본 `jekyll-paginate`는 제거된 상태다.
- 이유는 KOR/ENG 언어 분리 홈에서 같은 paginator를 공유하면 한국어 홈에 일부 글만 보이는 문제가 생기기 때문이다.
- 홈 목록은 `_layouts/home.html`에서 현재 언어의 글만 모두 렌더링한 뒤, `assets/js/home-pagination.js`가 `10개씩` 잘라서 보여준다.
- 페이지 이동은 `/` 또는 `/en/`에 `?page=2` 같은 쿼리스트링을 붙이는 방식이다.
- 페이지당 개수는 `_config.yml`의 `home_posts_per_page`에서 관리한다.

## 테스트 메모

이 프로젝트는 Jekyll 기반이라 일반적으로 아래로 테스트한다.

```powershell
bundle install
bundle exec jekyll serve
```

확인할 주요 URL:

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

이 Codex 세션에서는 `bundle` 명령이 잡히지 않아 런타임 검증이 항상 가능한 것은 아니다.
가능한 환경이라면 UI/사이드바/탭 색상까지 직접 확인하는 것이 안전하다.
