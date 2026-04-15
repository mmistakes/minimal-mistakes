---
layout: single
title: "Rust 10. Testing in Rust"
description: "cargo test, unit test, integration test, assert_eq!, Result 반환 테스트를 익히는 Rust 테스트 입문 가이드."
date: 2026-04-17 09:00:00 +0900
lang: ko
translation_key: rust-testing-basics
section: development
topic_key: rust
categories: Rust
tags: [rust, testing, cargo-test, unit-test, integration-test]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Rust에서 코드를 실행하는 것과 코드를 검증하는 것은 다른 단계다. 예제가 한 번 돌아갔다고 해서 이후 수정에도 같은 결과가 유지되는 것은 아니기 때문에, `cargo test`와 기본 테스트 구조를 일찍 익히는 편이 훨씬 안전하다.

이 글은 `cargo test`, `#[test]`, `assert_eq!`, `#[cfg(test)]`, integration test, `Result`를 반환하는 테스트를 초급자 기준으로 정리한다. 결론부터 말하면 테스트하기 쉬운 Rust 코드를 만들려면 "입출력은 얇게, 핵심 로직은 작은 함수로, 재사용할 함수는 `lib.rs`에"라는 원칙을 먼저 잡는 것이 좋다.

## 문서 정보

- 작성일: 2026-04-15
- 검증 기준일: 2026-04-15
- 문서 성격: tutorial
- 테스트 환경: Windows 11, PowerShell, Cargo CLI 예시
- 테스트 버전: rustc 1.94.0, cargo 1.94.0
- 출처 등급: 공식 문서만 사용했다.
- 비고: 이 글은 초급 테스트 흐름에 집중하며, async 테스트나 property-based testing 같은 확장 주제는 별도 문서 범위로 남겨 둔다.

## 문제 정의

초급 단계에서는 프로그램이 한 번 실행되면 "이제 됐다"고 느끼기 쉽다. 하지만 함수가 늘어나고 파일이 분리되기 시작하면 아래 문제가 바로 생긴다.

- 리팩터링 뒤에 예전 동작이 깨졌는지 눈으로만 확인해야 한다.
- edge case를 계속 수동으로 재실행해야 한다.
- `main.rs`에 로직이 몰려 있으면 특정 동작만 따로 검증하기 어렵다.

이번 글의 목표는 테스트를 거창한 품질 절차로 보는 대신, "작은 Rust 함수를 계속 안전하게 바꾸기 위한 기본 도구"로 이해하는 데 있다.

## 확인된 사실

- 공식 문서 기준으로 `cargo test`는 프로젝트의 테스트를 빌드하고 실행한다.
  근거: [cargo-test(1)](https://doc.rust-lang.org/cargo/commands/cargo-test.html)
- 공식 문서 기준으로 `#[test]` 속성은 테스트 함수로 인식되게 하고, `assert!`, `assert_eq!`, `assert_ne!` 같은 매크로로 기대 결과를 검증할 수 있다.
  근거: [How to Write Tests](https://doc.rust-lang.org/book/ch11-01-writing-tests.html)
- 공식 문서 기준으로 단위 테스트는 보통 같은 파일 안의 `#[cfg(test)]` 모듈에 두고, integration test는 `tests/` 디렉터리에 둔다.
  근거: [Test Organization](https://doc.rust-lang.org/book/ch11-03-test-organization.html)
- 공식 문서 기준으로 테스트 함수는 `Result<(), E>`를 반환하도록 작성할 수도 있다.
  근거: [How to Write Tests](https://doc.rust-lang.org/book/ch11-01-writing-tests.html)

초급자에게 가장 실용적인 구조는 아래처럼 잡는 것이다.

```text
rust-testing-basics/
  Cargo.toml
  src/
    lib.rs
  tests/
    normalize.rs
```

`src/lib.rs`에는 검증하고 싶은 순수 함수를 둔다.

```rust
pub fn normalize_name(input: &str) -> String {
    input.trim().to_lowercase()
}

#[cfg(test)]
mod tests {
    use super::normalize_name;

    #[test]
    fn trims_and_lowercases() {
        assert_eq!(normalize_name("  Alice "), "alice");
    }

    #[test]
    fn keeps_empty_string_after_trim() {
        assert_eq!(normalize_name("   "), "");
    }

    #[test]
    fn result_based_test() -> Result<(), String> {
        let actual = normalize_name("Rust");

        if actual == "rust" {
            Ok(())
        } else {
            Err(format!("unexpected value: {}", actual))
        }
    }
}
```

`tests/normalize.rs`에는 외부 사용자 시점의 integration test를 둘 수 있다.

```rust
use rust_testing_basics::normalize_name;

#[test]
fn integration_test_uses_public_api() {
    assert_eq!(normalize_name("  Bob  "), "bob");
}
```

여기서 `rust-testing-basics` package 이름은 코드에서 `rust_testing_basics`처럼 언더스코어 경로로 접근한다. 이 구조는 앞으로 파일 I/O나 CLI가 들어가더라도 핵심 로직을 `lib.rs`에 두고 테스트를 유지하기 쉽다는 장점이 있다.

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

- 직접 확인한 결과: 본문 예제와 같은 `src/lib.rs`, `tests/normalize.rs` 구조에서 `cargo test --quiet`를 실행했을 때 핵심 출력은 아래와 같았다.

```powershell
cargo test --quiet
```

- 관찰된 결과:

```text
running 3 tests
...
test result: ok. 3 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

running 1 test
.
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

- 직접 재현 범위의 한계: 본문 구조를 기준으로 임시 테스트 프로젝트를 만들어 `cargo test`는 실행했지만, 이 저장소 안에 별도 테스트 예제 프로젝트를 추가하지는 않았다.

## 해석 / 의견

- 내 판단으로는 Rust 테스트 입문에서 가장 중요한 것은 테스트 문법보다 함수 경계다.
- 의견: `main.rs`에 입출력과 분기만 두고, 핵심 계산이나 변환 로직을 `lib.rs`로 분리하면 테스트 난이도가 크게 내려간다.
- 의견: unit test는 작은 규칙을 빠르게 잡아 주고, integration test는 공개 API가 기대대로 연결되는지 보는 데 적합하다. 초급 단계에서는 두 종류를 모두 한 번 경험하는 편이 좋다.

## 한계와 예외

- 이 글은 기본 테스트 흐름만 다루며, benchmark, property-based testing, snapshot testing은 포함하지 않았다.
- async 함수 테스트, 데이터베이스 테스트, 네트워크 테스트는 runtime과 외부 환경이 추가로 필요할 수 있어 이번 범위에서 제외했다.
- 병렬 실행 제어, 출력 캡처, 특정 테스트만 실행하는 옵션은 `cargo test` 문서에 더 자세한 내용이 있다.
- 실패 메시지와 fixture 구성을 어떻게 설계할지는 팀 규칙에 따라 달라질 수 있다.

## 참고자료

- [cargo-test(1)](https://doc.rust-lang.org/cargo/commands/cargo-test.html)
- [Writing Automated Tests](https://doc.rust-lang.org/book/ch11-00-testing.html)
- [How to Write Tests](https://doc.rust-lang.org/book/ch11-01-writing-tests.html)
- [Controlling How Tests Are Run](https://doc.rust-lang.org/book/ch11-02-running-tests.html)
- [Test Organization](https://doc.rust-lang.org/book/ch11-03-test-organization.html)
