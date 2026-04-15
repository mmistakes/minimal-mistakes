# Next Rust Post Handoff

## Snapshot

- 전체 시리즈 로드맵: `HANDOFF_RUST_CURRICULUM.md`
- 대상 글: `Rust 08`
- 권장 주제: `Vec`, `String`, `&str`, `HashMap`
- 목적: 다음 Rust 포스트 1편을 바로 제작할 수 있는 실행 기준을 남긴다.

## Recommended Next Post

- 시리즈 번호: `Rust 08`
- 권장 주제: `Vec`, `String`, `&str`, `HashMap`
- 권장 이유:
  현재 시리즈는 문법, ownership, traits, generics, modules까지는 다뤘지만 실제로 자주 쓰는 컬렉션과 문자열 경계가 비어 있다.
  이 구간이 빠지면 다음 단계인 file I/O, serde, testing, mini project로 넘어갈 때 독자가 자주 막힌다.

## Suggested Title

- KOR: `Rust 08. Vec, String, &str, HashMap 기초`
- ENG: `Rust 08. Vec, String, &str, and HashMap Basics`

## Suggested Files

- Korean post:
  `_posts/2026-04-15-rust-vec-string-str-hashmap.md`
- English post:
  `_posts/2026-04-15-rust-vec-string-str-hashmap-en.md`

## Date Handling

- 날짜는 handoff 작성 시점 기준 제안값이다.
- 실제 발행일이 달라지면 파일명과 front matter `date`를 함께 맞춘다.

## Front Matter Draft

```yaml
---
layout: single
title: "Rust 08. Vec, String, &str, HashMap 기초"
lang: ko
translation_key: rust-vec-string-str-hashmap
date: 2026-04-15 09:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, vec, string, hashmap, collections]
author_profile: false
sidebar:
  nav: "sections"
search: true
---
```

```yaml
---
layout: single
title: "Rust 08. Vec, String, &str, and HashMap Basics"
lang: en
translation_key: rust-vec-string-str-hashmap
date: 2026-04-15 09:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, vec, string, hashmap, collections]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/rust/vec-string-str-and-hashmap-basics/
---
```

## Suggested SEO Description Entry

`_data/seo_descriptions.yml`에 아래 항목 추가:

```yaml
rust-vec-string-str-hashmap:
  ko: "Vec, String, &str, HashMap를 예제로 익히는 Rust 기초 가이드."
  en: "Rust fundamentals guide to Vec, String, &str, and HashMap with examples."
```

## Recommended Outline

1. 왜 이 글이 필요한가
   Rust 기본 문법을 익힌 뒤 실제 코드를 쓰면 가장 먼저 자주 마주치는 타입이 `Vec`, `String`, `&str`, `HashMap`이라는 점을 짚는다.
2. 실습 프로젝트 만들기
   `cargo new rust-collections-basics`
3. `Vec<T>` 기초
   생성, `push`, 인덱싱, `get`, 반복, 길이 확인
4. `String`과 `&str` 차이
   owned string과 borrowed string의 차이, `String::from`, `.to_string()`, 함수 인자에서 어떤 타입을 받을지
5. 슬라이스와 문자열 다루기
   `&text[..]`, `split_whitespace()` 정도까지
6. `HashMap<K, V>` 기초
   생성, `insert`, `get`, `contains_key`, 반복
7. 한 번에 보는 종합 예제
   추천 예제는 `문장 단어 수 세기` 또는 `학생 점수표`다.
   이 구간에서 `Vec`, `String`, `&str`, `HashMap`이 함께 등장하게 만든다.
8. 정리
   다음 글은 `Cargo/project layout/testing` 또는 `file I/O`로 넘기는 흐름이 자연스럽다.

## Recommended Example Scope

- 반드시 들어갈 예제:
  `Vec<i32>`에 값 추가 후 반복 출력
- 반드시 들어갈 설명:
  `String`은 소유권이 있는 문자열이고 `&str`은 빌린 문자열이라는 점
- 반드시 들어갈 예제:
  `HashMap<String, i32>` 또는 `HashMap<&str, i32>` 사용
- 종합 예제 권장:
  `split_whitespace()`로 단어를 순회하면서 빈도 수를 세는 예제

## Keep The Scope Tight

- 이번 글에서 너무 많이 확장하지 말 것:
  `BTreeMap`, `Cow`, UTF-8 심화, `entry()` API 심화, lifetime-heavy 함수 설계까지 한 번에 넣지 않는 편이 낫다.
- 초급 독자 기준으로 핵심만 유지:
  "자주 쓰는 타입을 안전하게 읽고 쓰는 감각"이 목표다.

## Image Guidance

- 이 글은 코드 중심이라 이미지 없이도 충분하다.
- 이미지가 필요하면 `images/rust_08/` 아래에 둔다.
- VS Code 캡처보다 실행 결과나 before/after 예제가 더 유효하다.

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

- `Rust 09. Cargo, Crates, Modules, Project Layout`
- `Rust 09. Testing in Rust`

## Roadmap Note

- 현재 시리즈의 빈 구간을 메우는 관점에서는 `collections -> project layout/testing -> file I/O -> serde -> mini project` 순서가 가장 안정적이다.
