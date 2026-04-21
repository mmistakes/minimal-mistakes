---
layout: single
title: "Rust 09. Crate, Package, 프로젝트 구조 이해하기"
description: "Cargo 프로젝트에서 crate, package, main.rs, lib.rs, mod, use, pub 구조를 익히는 Rust 가이드."
date: 2026-04-16 09:00:00 +0900
lang: ko
translation_key: rust-crates-packages-project-layout
section: development
topic_key: rust
categories: Rust
tags: [rust, cargo, crates, packages, modules, project-layout]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Rust 입문 단계를 지나면 문법보다 먼저 막히는 지점이 프로젝트 구조다. `Cargo.toml`, `src/main.rs`, `src/lib.rs`, `mod`, `use`, `pub`가 각각 무엇을 담당하는지 분리해서 이해하지 못하면, 코드가 조금만 커져도 파일을 어디에 둘지부터 헷갈리기 쉽다.

이 글은 package와 crate의 관계, binary crate와 library crate의 차이, 그리고 `main.rs`, `lib.rs`, `mod`, `use`, `pub`를 한 번에 연결하는 데 초점을 둔다. 결론부터 말하면 초급 단계에서는 "Cargo package 하나 안에 실행 진입점은 `main.rs`, 재사용 로직은 `lib.rs`, 외부에 보여 줄 것만 `pub`"이라는 기준을 먼저 잡아 두는 편이 가장 실용적이다.

## 문서 정보

- 작성일: 2026-04-15
- 검증 기준일: 2026-04-16
- 문서 성격: tutorial
- 테스트 환경: Windows 11 Pro, Windows PowerShell, Cargo CLI 예시
- 테스트 버전: rustc 1.94.0, cargo 1.94.0
- 출처 등급: 공식 문서만 사용했다.
- 비고: 이 글은 단일 Cargo package 기준의 기본 구조 감각에 집중하며, workspace나 feature 같은 확장 주제는 의도적으로 범위에서 제외한다.

## 문제 정의

Rust 07에서 `module` 문법을 보고 나면 초급자는 곧바로 아래 지점에서 멈추기 쉽다.

- `package`와 `crate`가 같은 말인지 다른 말인지 헷갈린다.
- `src/main.rs`와 `src/lib.rs`를 언제 함께 두는지 감이 안 잡힌다.
- 파일을 나눌 때 `mod`, `use`, `pub`를 어떤 순서로 써야 하는지 모호하다.

이번 글은 위 혼란을 줄이는 범위까지만 다룬다. `workspace`, `feature`, `publish`, `path dependency`처럼 운영 범위가 넓어지는 주제는 일부러 넣지 않고, 하나의 Cargo 프로젝트를 읽고 나누는 기본 감각에 집중한다.

읽는 기준은 "Cargo가 관리하는 묶음"과 "컴파일되는 코드 단위"를 분리하는 것이다. 초급 단계에서는 `main.rs`에 모든 코드를 넣을 수는 있지만, 테스트와 재사용을 생각하면 실행 진입점과 핵심 로직을 나눠 읽는 습관이 더 중요하다.

## 확인된 사실

- 공식 문서 기준으로 Cargo package는 `Cargo.toml`이 있는 단위이고, package는 최대 하나의 library crate와 여러 개의 binary crate를 포함할 수 있다.
  근거: [Packages and Crates](https://doc.rust-lang.org/book/ch07-01-packages-and-crates.html)
  의미: package는 Cargo가 빌드하고 의존성을 관리하는 프로젝트 묶음이고, crate는 실제로 컴파일되는 코드 단위로 읽으면 된다.
- 공식 문서 기준으로 binary crate는 실행 진입점인 `main` 함수를 가지며, library crate는 다른 코드에서 재사용할 API를 노출하는 데 쓰인다.
  근거: [Packages and Crates](https://doc.rust-lang.org/book/ch07-01-packages-and-crates.html)
  의미: 실행 흐름은 binary crate에 두고, 테스트하거나 재사용할 로직은 library crate로 옮기면 이후 구조가 덜 엉킨다.
- 공식 문서 기준으로 `mod`는 모듈을 정의하고, `use`는 경로를 현재 스코프로 가져오며, `pub`는 공개 범위를 제어한다.
  근거: [Defining Modules to Control Scope and Privacy](https://doc.rust-lang.org/book/ch07-02-defining-modules-to-control-scope-and-privacy.html), [Paths for Referring to an Item in the Module Tree](https://doc.rust-lang.org/book/ch07-03-paths-for-referring-to-an-item-in-the-module-tree.html), [Bringing Paths into Scope with the use Keyword](https://doc.rust-lang.org/book/ch07-04-bringing-paths-into-scope-with-the-use-keyword.html)
  의미: `mod`, `use`, `pub`는 같은 일을 하는 키워드가 아니다. `mod`는 위치를 연결하고, `use`는 이름을 짧게 가져오고, `pub`는 외부 공개 여부를 정한다.
- 공식 문서 기준으로 모듈은 별도 파일로 분리할 수 있고, crate root에서 선언해 연결한다.
  근거: [Separating Modules into Different Files](https://doc.rust-lang.org/book/ch07-05-separating-modules-into-different-files.html)
  의미: 파일을 나눴다고 자동으로 모듈이 연결되는 것이 아니라, crate root에서 모듈 트리에 포함해야 Rust가 해당 코드를 인식한다.

가장 이해하기 쉬운 기본 구조는 아래처럼 보는 것이다.

```text
rust-layout-demo/
  Cargo.toml
  src/
    main.rs
    lib.rs
    math.rs
```

이 구조에서 읽는 순서는 아래처럼 잡아 두면 편하다.

1. `Cargo.toml`: package 이름과 의존성을 본다.
2. `src/main.rs`: 실행이 어디서 시작되는지 본다.
3. `src/lib.rs`: 재사용할 모듈을 crate 바깥에 어떻게 공개하는지 본다.
4. `src/math.rs`: 실제 기능 코드가 어디에 들어 있는지 본다.

예를 들어 `lib.rs`에서 모듈을 공개하는 코드는 아래처럼 둘 수 있다.

```rust
pub mod math;
```

`math.rs`는 재사용할 함수를 담는다.

```rust
pub fn add(left: i32, right: i32) -> i32 {
    left + right
}

pub fn subtract(left: i32, right: i32) -> i32 {
    left - right
}
```

`main.rs`는 library crate에 공개된 모듈을 사용해 실행 흐름만 조립한다.

```rust
use rust_layout_demo::math;

fn main() {
    let sum = math::add(10, 20);
    let diff = math::subtract(20, 5);

    println!("sum = {}", sum);
    println!("diff = {}", diff);
}
```

초급 단계에서 중요한 포인트는 "실행은 `main.rs`에서 시작하지만, 실제 로직은 `lib.rs`와 하위 모듈로 옮길 수 있다"는 점이다. 이 패턴을 먼저 익혀 두면 이후 `testing`, `file I/O`, `CLI`, `mini project` 글에서도 같은 구조를 반복해서 재사용할 수 있다.

## 직접 재현한 결과

- 직접 확인한 결과: 현재 작성 환경에서 Rust toolchain 버전은 아래와 같았다.

```powershell
rustc --version
cargo --version
```

- 관찰된 결과:

```text
rustc 1.94.0 (4a4ef493e 2026-03-02)
cargo 1.94.0 (85eff7c80 2026-01-15)
```

- 읽는 법: 이 버전은 본문 구조 예제를 실행한 도구 기준이다. 프로젝트 구조 자체는 버전에 크게 흔들리는 주제가 아니지만, 출력 문구나 경고는 버전에 따라 달라질 수 있다.

- 직접 확인한 결과: 본문과 같은 구조의 임시 Cargo 프로젝트에서 `main.rs` 예제를 실행했을 때 출력은 아래와 같았다.

```powershell
cargo run
```

- 관찰된 결과:

```text
sum = 30
diff = 15
```

- 읽는 법: `main.rs`는 실행 흐름만 조립하고, 실제 계산 함수는 library crate의 모듈에서 온다. 이 결과가 나온다는 것은 `lib.rs`, `math.rs`, `use rust_layout_demo::math` 경로가 올바르게 연결됐다는 뜻이다.

- 직접 확인 범위의 한계: 본문 구조를 기준으로 임시 Cargo 프로젝트를 만들어 대표 예제는 실행했지만, 이 저장소 안에 별도 예제 프로젝트를 추가하지는 않았다.

## 해석 / 의견

- 이 단계에서 중요한 판단: 초급자가 가장 먼저 가져가야 할 감각은 "`package`는 Cargo가 관리하는 묶음이고, `crate`는 컴파일 단위"라는 구분이다.
- 선택 기준: 실행만 담당하는 코드는 `main.rs`, 재사용하거나 테스트할 로직은 `lib.rs`와 하위 모듈로 옮긴다.
- 해석: `pub`는 편의 기능이 아니라 API 경계다. 밖에서 써야 하는 항목만 공개하고, 나머지는 기본 비공개로 두는 습관이 유지보수에 도움이 된다.

## 한계와 예외

- 이 글은 single package 기준 설명이며, 여러 package를 묶는 Cargo workspace는 다루지 않았다.
- `pub(crate)`, `super`, 중첩 모듈 폴더 구조 같은 세부 공개 범위 규칙은 범위에서 제외했다.
- library crate가 없어도 Rust 프로그램은 만들 수 있다. 다만 파일이 커질수록 `lib.rs` 분리 패턴이 더 유리한 경우가 많다.
- package 이름에 하이픈이 있으면 코드에서 crate 이름은 언더스코어로 바뀌는 등 세부 규칙이 추가되는데, 이번 글에서는 가장 단순한 구조만 예제로 사용했다.
- 이 글을 읽고도 남는 질문은 workspace, feature flag, publish, path dependency이며, 이는 프로젝트 운영 단계에서 다루는 편이 맞다.

## 참고자료

- [Managing Growing Projects with Packages, Crates, and Modules](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)
- [Packages and Crates](https://doc.rust-lang.org/book/ch07-01-packages-and-crates.html)
- [Defining Modules to Control Scope and Privacy](https://doc.rust-lang.org/book/ch07-02-defining-modules-to-control-scope-and-privacy.html)
- [Paths for Referring to an Item in the Module Tree](https://doc.rust-lang.org/book/ch07-03-paths-for-referring-to-an-item-in-the-module-tree.html)
- [Bringing Paths into Scope with the use Keyword](https://doc.rust-lang.org/book/ch07-04-bringing-paths-into-scope-with-the-use-keyword.html)
- [Separating Modules into Different Files](https://doc.rust-lang.org/book/ch07-05-separating-modules-into-different-files.html)
