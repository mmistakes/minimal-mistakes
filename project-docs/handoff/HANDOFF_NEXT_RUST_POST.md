# Next Rust Post Handoff

## Snapshot

- 전체 시리즈 로드맵: `HANDOFF_RUST_CURRICULUM.md`
- 대상 글: `Rust 09`
- 권장 주제: `Crates`, `Packages`, `Project Layout`
- 목적: 다음 Rust 포스트 1편을 바로 제작할 수 있는 실행 기준을 남긴다.

## Recommended Next Post

- 시리즈 번호: `Rust 09`
- 권장 주제: `Crates`, `Packages`, `Project Layout`
- 권장 이유:
  07편의 module 소개와 08편의 컬렉션 실습까지 끝난 뒤에는 코드를 파일과 crate 단위로 어떻게 나눌지가 다음 병목이 된다.
  `main.rs`, `lib.rs`, `mod`, `use`, `pub`를 실제 프로젝트 구조에 연결해야 이후 testing, file I/O, mini project 글도 자연스럽게 이어진다.

## Suggested Title

- KOR: `Rust 09. Crates, Packages, and Project Layout`
- ENG: `Rust 09. Crates, Packages, and Project Layout`

## Suggested Files

- Korean post:
  `_posts/2026-04-16-rust-crates-packages-project-layout.md`
- English post:
  `_posts/2026-04-16-rust-crates-packages-project-layout-en.md`

## Date Handling

- 날짜는 handoff 작성 시점 기준 제안값이다.
- 실제 발행일이 달라지면 파일명과 front matter `date`를 함께 맞춘다.

## Front Matter Draft

```yaml
---
layout: single
title: "Rust 09. Crates, Packages, and Project Layout"
description: "Cargo 프로젝트에서 crate, package, main.rs, lib.rs, mod, use, pub 구조를 익히는 Rust 가이드."
lang: ko
translation_key: rust-crates-packages-project-layout
date: 2026-04-16 09:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, cargo, crates, packages, modules, project-layout]
author_profile: false
sidebar:
  nav: "sections"
search: true
---
```

```yaml
---
layout: single
title: "Rust 09. Crates, Packages, and Project Layout"
description: "Rust guide to crates, packages, main.rs, lib.rs, mod, use, and pub in a Cargo project."
lang: en
translation_key: rust-crates-packages-project-layout
date: 2026-04-16 09:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, cargo, crates, packages, modules, project-layout]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/rust/crates-packages-and-project-layout/
---
```

## Suggested SEO Description Entry

`_data/seo_descriptions.yml`에 아래 항목 추가:

```yaml
rust-crates-packages-project-layout:
  ko: "Cargo 프로젝트에서 crate, package, main.rs, lib.rs, mod, use, pub 구조를 익히는 Rust 가이드."
  en: "Rust guide to crates, packages, main.rs, lib.rs, mod, use, and pub in a Cargo project."
```

## Recommended Outline

1. 왜 이 글이 필요한가
   module 문법을 배운 뒤에도 초급자가 실제 프로젝트 구조에서 가장 자주 헷갈리는 지점이 crate/package/file layout라는 점을 짚는다.
2. 실습 프로젝트 만들기
   `cargo new rust-layout-demo`
3. crate와 package 구분
   Cargo package와 crate의 관계, binary crate와 library crate 설명
4. `main.rs`와 `lib.rs`
   실행 진입점과 재사용 로직 분리
5. `mod`, `use`, `pub`
   파일 분리, 경로 가져오기, 공개 범위
6. 여러 파일로 나누기
   `src/main.rs`, `src/lib.rs`, `src/math.rs` 같은 기본 구조
7. 한 번에 보는 종합 예제
   계산기 로직을 `lib.rs`로 분리하고 `main.rs`에서 호출
8. 정리
   다음 글은 `testing`으로 넘기는 흐름이 자연스럽다.

## Recommended Example Scope

- 반드시 들어갈 예제:
  `cargo new rust-layout-demo`로 binary crate 생성
- 반드시 들어갈 설명:
  package와 crate가 완전히 같은 말은 아니라는 점
- 반드시 들어갈 예제:
  `lib.rs`에 함수 두고 `main.rs`에서 호출
- 종합 예제 권장:
  간단한 계산기 또는 문자열 유틸 함수를 파일 분리해 호출하는 예제

## Keep The Scope Tight

- 이번 글에서 너무 많이 확장하지 말 것:
  workspace, cargo feature, publish, proc-macro, path dependency까지 한 번에 넓히지 않는 편이 낫다.
- 초급 독자 기준으로 핵심만 유지:
  "Cargo 프로젝트를 파일과 crate 단위로 읽는 감각"이 목표다.

## Image Guidance

- 이 글도 코드 중심이라 이미지 없이도 충분하다.
- 이미지가 필요하면 `images/rust_09/` 아래에 둔다.
- 트리 구조나 파일 분리 전후 비교 이미지 정도만 고려하면 된다.

## Consistency Rules

- 한국어/영어 포스트는 같은 `translation_key`를 쓸 것
- 둘 다 `section: development`, `topic_key: rust` 유지
- 둘 다 `search: true` 유지
- 영어 포스트에는 명시적 `permalink` 추가
- 새 글은 `_posts` 바로 아래에 둘 것

## Validation Checklist

- `bundle exec jekyll build`
- KOR 글 URL 확인
- ENG 글 URL 확인
- `/development/rust/`에 새 글이 노출되는지 확인
- `/en/development/rust/`에 영어 글이 노출되는지 확인
- KOR/ENG language switch가 서로 연결되는지 확인
- `_data/seo_descriptions.yml` 매핑이 적용되는지 확인

## Suggested Next-After-Next

이 글 다음 순서로는 아래 둘 중 하나가 자연스럽다.

- `Rust 10. Testing in Rust`
- `Rust 11. File I/O and Command-Line Input`

## Roadmap Note

- 현재 시리즈의 빈 구간을 메우는 관점에서는 `collections -> project layout/testing -> file I/O -> serde -> mini project` 순서가 가장 안정적이다.
