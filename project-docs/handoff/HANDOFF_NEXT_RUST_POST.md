# Next Rust Post Handoff

## Snapshot

- 전체 시리즈 로드맵: `HANDOFF_RUST_CURRICULUM.md`
- 코어 상태: Rust 09~13까지 예약 발행 완료
- 다음 신규 초안 후보: `Rust 14`
- 목적: 코어 로드맵 이후 이어 쓸 다음 확장 글 1편의 실행 기준을 남긴다.

## Recommended Next Post

- 시리즈 번호: `Rust 14`
- 권장 주제: `Traits Deep Dive and Trait Objects`
- 권장 이유:
  05편에서 trait 기초를 다뤘고, 13편까지 실용 구간을 채웠으므로 이제는 trait bound, `impl Trait`, `dyn Trait`, static dispatch와 dynamic dispatch 차이를 정리하는 확장 글이 자연스럽다.

## Suggested Title

- KOR: `Rust 14. Traits Deep Dive and Trait Objects`
- ENG: `Rust 14. Traits Deep Dive and Trait Objects`

## Suggested Files

- Korean post:
  `_posts/2026-04-21-rust-traits-deep-dive-and-trait-objects.md`
- English post:
  `_posts/2026-04-21-rust-traits-deep-dive-and-trait-objects-en.md`

## Date Handling

- 이 handoff는 2026-04-15 기준으로 작성됐다.
- Rust 13이 `2026-04-20 09:00:00 +0900`에 예약되어 있으므로, 매일 발행 흐름을 이어 간다면 Rust 14의 기본 제안 날짜는 `2026-04-21 09:00:00 +0900`이다.
- 실제 발행일이 달라지면 파일명과 front matter `date`를 함께 맞춘다.

## Front Matter Draft

```yaml
---
layout: single
title: "Rust 14. Traits Deep Dive and Trait Objects"
description: "trait bound, impl Trait, dyn Trait, trait object를 정리하는 Rust 심화 가이드."
lang: ko
translation_key: rust-traits-deep-dive-and-trait-objects
date: 2026-04-21 09:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, traits, trait-objects, impl-trait, dyn-trait]
author_profile: false
sidebar:
  nav: "sections"
search: true
---
```

```yaml
---
layout: single
title: "Rust 14. Traits Deep Dive and Trait Objects"
description: "Rust guide to trait bounds, impl Trait, dyn Trait, and trait objects."
lang: en
translation_key: rust-traits-deep-dive-and-trait-objects
date: 2026-04-21 09:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, traits, trait-objects, impl-trait, dyn-trait]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/rust/traits-deep-dive-and-trait-objects/
---
```

## Suggested SEO Description Entry

`_data/seo_descriptions.yml`에 아래 항목 추가:

```yaml
rust-traits-deep-dive-and-trait-objects:
  ko: "trait bound, impl Trait, dyn Trait, trait object를 정리하는 Rust 심화 가이드."
  en: "Rust guide to trait bounds, impl Trait, dyn Trait, and trait objects."
```

## Recommended Outline

1. 왜 trait 기초 다음에 이 글이 필요한가
2. trait bound와 generic 함수 다시 보기
3. `impl Trait`를 인자와 반환 타입에서 읽는 법
4. `dyn Trait`와 trait object가 필요한 상황
5. static dispatch와 dynamic dispatch 차이
6. `Vec<Box<dyn Trait>>` 같은 종합 예제
7. 언제 trait object가 과하고 언제 유용한지 정리

## Recommended Example Scope

- 반드시 들어갈 개념:
  trait bound, `impl Trait`, `dyn Trait`
- 반드시 들어갈 비교:
  compile-time polymorphism과 runtime polymorphism의 차이
- 추천 종합 예제:
  `Draw` 또는 `Render` trait를 구현한 서로 다른 타입을 한 컬렉션에 담아 순회

## Keep The Scope Tight

- 이번 글에서는 GAT, specialization, async trait 세부 구현까지 넓히지 않는 편이 낫다.
- 목표는 초급-중급 경계 독자가 trait object를 "언제 쓰는지" 감으로 이해하는 것이다.

## Validation Checklist

- `bundle exec jekyll build`
- KOR 글 URL 확인
- ENG 글 URL 확인
- `/development/rust/` 노출 확인
- `/en/development/rust/` 노출 확인
- language switch 연결 확인
- `_data/seo_descriptions.yml` 적용 확인

## Roadmap Note

- 코어 실용 구간은 Rust 13까지 채워졌으므로, 이후 글은 확장/심화 주제로 넘어간다.
- 확장 순서는 `traits deep dive -> lifetimes in real APIs -> anyhow/thiserror -> tokio -> web basics` 흐름이 무난하다.
