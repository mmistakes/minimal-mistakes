# Content Rules

## 글 파일 배치

- 새 글은 `_posts` 바로 아래에 둔다.
- 권장 형식: `_posts/2026-04-07-my-post.md`
- 비권장 형식: `_posts/security/2026-04-07-my-post.md`
- 배치 이유:
- `_posts` 하위 폴더명은 category/permalink에 반영될 수 있다.
- 섹션 구분은 폴더가 아니라 front matter로 처리한다.

## 최소 front matter 템플릿

```yaml
---
layout: single
title: "글 제목"
date: 2026-04-07
lang: ko
translation_key: example-post
section: development
topic_key: rust
categories: Dev
tags: [example]
---
```

```yaml
---
layout: single
title: "Post title"
date: 2026-04-07
lang: en
translation_key: example-post
section: development
topic_key: rust
categories: Dev
tags: [example]
permalink: /en/dev/example-post/
---
```

## 필드 규칙

### `section`

- 허용값: `security`, `development`, `life`
- 섹션 페이지는 `site.posts | where: "section", ...` 방식으로 필터링한다.
- 섹션 노출 여부는 폴더 구조가 아니라 `section` 값으로 결정된다.

### `lang`

- KOR 페이지는 `lang: ko` 글만 노출한다.
- ENG 페이지는 `lang: en` 글만 노출한다.
- 영어 글은 `section`과 함께 `lang: en`도 반드시 맞춘다.

### `translation_key`

- 한국어/영어 미러 글은 같은 값을 공유한다.
- 언어 전환 버튼과 관련 링크 연결 기준이다.

### `topic_key`

- 같은 `section` 안에서 세부 분류를 나눌 때 사용한다.
- 예: `security > malware-analysis`, `development > rust`
- 세부 분류 목록과 slug는 `_data/section_topics.yml`에서 관리한다.

### `tags`

- `tag:`가 아니라 `tags:`를 사용한다.
- 태그 아카이브는 `site.tags` 기준으로 동작한다.

## 사이드바 유지 규칙

- `POSTS` 사이드바를 유지하려면 front matter에 아래 설정을 둔다.

```yaml
sidebar:
  nav: "sections"
```

- 이미 적용된 대표 페이지:
- `index.html`
- `_pages/security.md`
- `_pages/development.md`
- `_pages/life.md`
- `_pages/category-archive.md`
- `_pages/tag-archive.md`
- `_pages/search.md`
- `_config.yml`의 기본 글 defaults
- 영어 미러 페이지도 `sidebar.nav: "sections"`를 유지한다.
- 실제 영어용 메뉴 전환은 `_includes/nav_list`에서 `sections_en`을 선택하는 방식으로 처리한다.

## Rust 시리즈 공통 규칙

- Rust 포스트는 KOR/ENG 한 쌍으로 발행한다.
- 두 글 모두 `section: development`, `topic_key: rust`를 유지한다.
- 두 글 모두 같은 `translation_key`를 사용한다.
- 영어 글에는 명시적 `permalink`를 넣는다.
- 새 Rust 글을 발행했거나 시리즈 순서를 바꿨다면 `project-docs/handoff/` 아래 Rust handoff 문서도 함께 갱신한다.

## 작성 전 체크리스트

- 파일 위치가 `_posts` 바로 아래인지 확인
- `section`, `lang`, `translation_key`, `tags` 키 확인
- 필요한 경우 `sidebar.nav: "sections"` 포함 여부 확인
- 영어 미러 글의 `permalink` 존재 여부 확인
