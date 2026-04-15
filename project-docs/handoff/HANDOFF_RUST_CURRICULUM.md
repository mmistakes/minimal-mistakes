# Rust Curriculum Handoff

## Snapshot

- 목적: Rust 시리즈 전체 구조와 다음 발행 우선순위를 유지한다.
- 현재 공개 상태: Rust 01~07 발행 완료
- 다음 우선순위: Rust 08
- 바로 다음 실행 메모: `HANDOFF_NEXT_RUST_POST.md`

## Current State

현재 공개된 Rust 시리즈는 아래 7편이다.

1. `Rust 01. 설치와 Hello World 실행하기`
   KOR: `_posts/2026-04-07-rust-install-hello-world.md`
   ENG: `_posts/2026-04-07-rust-install-hello-world-en.md`
2. `Rust 02. rust-analyzer와 CodeLLDB로 디버깅하기`
   KOR: `_posts/2026-04-08-rust-debugging-with-rust-analyzer.md`
   ENG: `_posts/2026-04-08-rust-debugging-with-rust-analyzer-en.md`
3. `Rust 03. 변수, 타입, 제어흐름, 함수 기초`
   KOR: `_posts/2026-04-09-rust-variables-types-control-flow-functions.md`
   ENG: `_posts/2026-04-09-rust-variables-types-control-flow-functions-en.md`
4. `Rust 04. Ownership, Borrowing, Lifetime 기초`
   KOR: `_posts/2026-04-10-rust-ownership-borrowing-lifetimes.md`
   ENG: `_posts/2026-04-10-rust-ownership-borrowing-lifetimes-en.md`
5. `Rust 05. Structs, Enums, Pattern Matching, Traits 기초`
   KOR: `_posts/2026-04-12-rust-structs-enums-pattern-matching-traits.md`
   ENG: `_posts/2026-04-12-rust-structs-enums-pattern-matching-traits-en.md`
6. `Rust 06. Generics, Error Handling, Closures, Iterators 기초`
   KOR: `_posts/2026-04-13-rust-generics-error-handling-closures-iterators.md`
   ENG: `_posts/2026-04-13-rust-generics-error-handling-closures-iterators-en.md`
7. `Rust 07. Modules, Smart Pointers, Concurrency, Async 기초`
   KOR: `_posts/2026-04-14-rust-modules-smart-pointers-concurrency-async.md`
   ENG: `_posts/2026-04-14-rust-modules-smart-pointers-concurrency-async-en.md`

## What The Series Already Covers Well

- 개발 환경 설치와 첫 실행
- VS Code 기반 디버깅
- 변수, 타입, 제어흐름, 함수
- ownership, borrowing, lifetime
- struct, enum, match, trait
- generics, `Result`, closure, iterator
- module, smart pointer, concurrency, async 개요

## Current Coverage Summary

- 현재 시리즈는 `입문 -> 초급 핵심 개념` 구간까지 연결되어 있다.

## Main Gaps To Fill

다음 커리큘럼에서는 아래 공백을 메우는 것이 중요하다.

- 컬렉션과 문자열 실전 사용
- crate/package/project layout
- testing
- file I/O와 CLI 입력 처리
- 직렬화/역직렬화
- 작은 결과물을 만드는 mini project

## Gap Summary

- 위 공백을 채워야 독자가 "문법을 읽는 상태"에서 "작은 도구를 직접 만드는 상태"로 넘어갈 수 있다.

## Target Reader

- Rust를 처음 배우는 독자
- C/C++/Java/Python 경험은 있지만 Rust는 처음인 독자
- 이론보다 "왜 이 타입과 구조를 쓰는지"를 알고 싶은 독자
- VS Code와 Windows 기준 예제를 따라가는 독자

## Curriculum Goal

시리즈의 목표는 Rust를 깊게 완주하는 것이 아니라 아래 수준까지 안정적으로 올리는 것이다.

- Cargo 프로젝트를 만들고 실행할 수 있다
- ownership과 borrowing을 이해하고 오류 메시지를 덜 두려워한다
- 기본 데이터 구조와 문자열을 실전적으로 다룰 수 있다
- 테스트와 file I/O를 포함한 작은 CLI를 만들 수 있다
- 이후 비동기, 웹, 시스템 프로그래밍으로 넘어갈 준비가 된다

## Recommended Roadmap

현재 01~07 이후 권장 발행 순서는 아래와 같다.

### Rust 08

- KOR title: `Rust 08. Vec, String, &str, HashMap 기초`
- ENG title: `Rust 08. Vec, String, &str, and HashMap Basics`
- translation_key: `rust-vec-string-str-hashmap`
- 핵심 목표:
  컬렉션과 문자열의 기본 사용법을 익히고, 실제 예제에서 owned data와 borrowed data가 어떻게 같이 등장하는지 보여준다.
- 꼭 포함할 내용:
  `Vec`, `String`, `&str`, `HashMap`, 반복, 조회, 기본 변환
- 추천 종합 예제:
  단어 빈도 수 세기

### Rust 09

- KOR title: `Rust 09. Crates, Packages, and Project Layout`
- ENG title: `Rust 09. Crates, Packages, and Project Layout`
- translation_key: `rust-crates-packages-project-layout`
- 핵심 목표:
  07편의 module 소개를 실전 프로젝트 구조 관점으로 확장한다.
- 꼭 포함할 내용:
  `cargo new --lib`, `main.rs`, `lib.rs`, `mod`, `use`, `pub`, 여러 파일로 나누기
- 추천 종합 예제:
  계산기 로직을 `lib.rs`로 분리하고 `main.rs`에서 호출

### Rust 10

- KOR title: `Rust 10. Testing in Rust`
- ENG title: `Rust 10. Testing in Rust`
- translation_key: `rust-testing-basics`
- 핵심 목표:
  "코드가 돌아간다"에서 "코드를 검증한다"로 넘어간다.
- 꼭 포함할 내용:
  `cargo test`, unit test, integration test, `#[cfg(test)]`, `assert_eq!`, `Result` 반환 테스트
- 추천 종합 예제:
  문자열 파서나 계산 함수 테스트 작성

### Rust 11

- KOR title: `Rust 11. File I/O and Command-Line Input`
- ENG title: `Rust 11. File I/O and Command-Line Input`
- translation_key: `rust-file-io-and-cli-input`
- 핵심 목표:
  파일 입력과 커맨드라인 입력을 처리하는 기본 패턴을 익힌다.
- 꼭 포함할 내용:
  `std::fs::read_to_string`, `write`, `std::env::args`, `Result`로 에러 전달
- 추천 종합 예제:
  파일을 읽어 줄 수나 단어 수를 세는 간단한 CLI

### Rust 12

- KOR title: `Rust 12. Serde with JSON and TOML Basics`
- ENG title: `Rust 12. Serde with JSON and TOML Basics`
- translation_key: `rust-serde-json-toml-basics`
- 핵심 목표:
  외부 데이터 형식을 Rust 타입으로 다루는 감각을 만든다.
- 꼭 포함할 내용:
  `serde`, `Serialize`, `Deserialize`, `serde_json`, TOML 예제
- 추천 종합 예제:
  설정 파일 읽기 또는 JSON 로그 한 줄 파싱

### Rust 13

- KOR title: `Rust 13. Build a Small CLI Project`
- ENG title: `Rust 13. Build a Small CLI Project`
- translation_key: `rust-build-a-small-cli-project`
- 핵심 목표:
  01~12까지의 내용을 묶어 독자가 하나의 작은 결과물을 끝까지 완성하게 만든다.
- 꼭 포함할 내용:
  프로젝트 구조, 테스트, file I/O, 에러 처리, 컬렉션 활용
- 추천 종합 예제:
  `word counter`, `todo CLI`, `simple log summary` 중 하나

## Recommended Grouping

운영 관점에서 이 시리즈는 아래 4단계로 묶는 것이 자연스럽다.

1. 환경과 기본 실행
   Rust 01, 02
2. 언어 기초와 Rust 고유 개념
   Rust 03, 04, 05
3. 추상화와 구조
   Rust 06, 07
4. 실용 도구 만들기
   Rust 08, 09, 10, 11, 12, 13

## Metadata Rules For All Future Rust Posts

- `_posts` 바로 아래에 파일을 둘 것
- KOR/ENG 한 쌍으로 발행할 것
- 같은 `translation_key` 공유
- `section: development`
- `topic_key: rust`
- `categories: Rust`
- `sidebar.nav: "sections"`
- `search: true`
- 영어 글에는 명시적 `permalink` 추가
- `_data/seo_descriptions.yml`에 같은 `translation_key`로 설명 추가

## Front Matter Template

```yaml
---
layout: single
title: "Rust NN. 제목"
lang: ko
translation_key: rust-example-key
date: 2026-04-15 09:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, example]
author_profile: false
sidebar:
  nav: "sections"
search: true
---
```

```yaml
---
layout: single
title: "Rust NN. English Title"
lang: en
translation_key: rust-example-key
date: 2026-04-15 09:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, example]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/rust/example-permalink/
---
```

## Style Guidance For Future Rust Posts

- 초급 독자를 기준으로 쓸 것
- 설명은 "개념 정의 -> 짧은 코드 -> 실행 결과/주의점 -> 실제로 왜 필요한지" 순서가 좋다
- 한 글에 너무 많은 주제를 묶지 않는 편이 낫다
- 06, 07처럼 주제가 많아지는 경우 이후 글에서는 범위를 더 좁게 잡는 편이 좋다
- 실전 예제를 반드시 넣을 것
- 개념 설명만 끝내지 말고 마지막에 작은 종합 예제를 둘 것

## Validation Checklist Per Post

- `bundle exec jekyll build`
- KOR 포스트 URL 확인
- ENG 포스트 URL 확인
- `/development/rust/` 아카이브 노출 확인
- `/en/development/rust/` 아카이브 노출 확인
- language switch 연결 확인
- `_data/seo_descriptions.yml` 적용 확인
- 검색 페이지에서 제목/핵심 태그 검색 확인

## Optional Stretch Topics

아래는 13편 이후 확장 후보이다.

- `Rust 14. Traits Deep Dive and Trait Objects`
- `Rust 15. Lifetimes in Real APIs`
- `Rust 16. Error Types with thiserror and anyhow`
- `Rust 17. Async Rust with Tokio`
- `Rust 18. Web Basics with Axum or Actix`

하지만 현재 시리즈 우선순위는 위 확장보다 08~13의 실용 구간을 완성하는 쪽이 맞다.

## Execution Priority

실제 작업 우선순위는 아래 순서로 고정하는 것을 권장한다.

1. Rust 08 제작
2. Rust 08 SEO description 반영
3. KOR/ENG 링크와 아카이브 노출 검증
4. 그 다음 Rust 09 제작

## Current Required Action

- 다음 액션은 `Rust 08` 작성이다.

## Related File

- `HANDOFF_NEXT_RUST_POST.md`
