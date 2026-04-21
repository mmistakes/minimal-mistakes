---
layout: single
title: "Rust 10. Testing in Rust"
description: "Beginner-friendly Rust testing guide to cargo test, unit tests, integration tests, assert_eq!, and Result-based tests."
date: 2026-04-17 09:00:00 +0900
lang: en
translation_key: rust-testing-basics
section: development
topic_key: rust
categories: Rust
tags: [rust, testing, cargo-test, unit-test, integration-test]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/rust/testing-in-rust/
---

## Summary

In Rust, getting code to run once is not the same as being able to trust future changes. As soon as functions grow and files start splitting apart, `cargo test` becomes one of the most practical tools for staying confident during refactoring.

This post introduces `cargo test`, `#[test]`, `assert_eq!`, `#[cfg(test)]`, integration tests, and tests that return `Result`. The practical conclusion is that Rust becomes much easier to test when input and output stay thin, core logic is kept in small functions, and reusable logic lives in `lib.rs`.

## Document Information

- Written on: 2026-04-15
- Verification date: 2026-04-16
- Document type: tutorial
- Test environment: Windows 11 Pro, Windows PowerShell, Cargo CLI examples
- Test version: rustc 1.94.0, cargo 1.94.0
- Source grade: only official documentation is used.
- Note: this post focuses on the beginner testing workflow and intentionally leaves broader topics such as async testing and property-based testing for separate material.

## Problem Definition

At the beginner stage, it is easy to think that a successful run means the program is done. But once code starts changing, several problems appear immediately.

- Refactoring becomes risky because you have to check behavior manually.
- Edge cases need to be rerun by hand over and over.
- If all logic stays in `main.rs`, it is hard to verify just one behavior in isolation.

The goal of this post is to treat testing not as a heavy process, but as the default way to keep small Rust programs safe to change.

How to read this post: focus less on what ran once and more on what can be checked automatically again. At the beginner stage, the most important testing skill is making the logic small enough to test outside `main.rs`.

## Verified Facts

- According to the official Cargo docs, `cargo test` builds and runs the tests for a project.
  Evidence: [cargo-test(1)](https://doc.rust-lang.org/cargo/commands/cargo-test.html)
  Meaning: `cargo run` checks one execution path, while `cargo test` checks whether expected rules keep holding over time.
- According to the official Rust Book, the `#[test]` attribute marks a test function, and macros like `assert!`, `assert_eq!`, and `assert_ne!` are used to verify expectations.
  Evidence: [How to Write Tests](https://doc.rust-lang.org/book/ch11-01-writing-tests.html)
  Meaning: a test function is not a separate `main`; it is a verification function that Cargo knows how to discover and run.
- According to the official docs, unit tests are commonly placed in a `#[cfg(test)]` module in the same file, while integration tests go in the `tests/` directory.
  Evidence: [Test Organization](https://doc.rust-lang.org/book/ch11-03-test-organization.html)
  Meaning: unit tests sit close to small internal rules, while integration tests call the public API from the outside.
- According to the official docs, tests can also be written to return `Result<(), E>`.
  Evidence: [How to Write Tests](https://doc.rust-lang.org/book/ch11-01-writing-tests.html)
  Meaning: if test setup can fail, returning `Result` can be cleaner than forcing every failure through panic-style assertions.

One of the most practical beginner layouts is this:

```text
rust-testing-basics/
  Cargo.toml
  src/
    lib.rs
  tests/
    normalize.rs
```

Put the function you want to verify in `src/lib.rs`.

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

Then place an integration test in `tests/normalize.rs` to verify the public API from the outside.

```rust
use rust_testing_basics::normalize_name;

#[test]
fn integration_test_uses_public_api() {
    assert_eq!(normalize_name("  Bob  "), "bob");
}
```

One practical detail is that the package name `rust-testing-basics` is accessed in code as `rust_testing_basics`. This structure also prepares you well for later posts, because once file I/O or CLI logic is added, you can still keep the core logic testable inside `lib.rs`.

## Directly Confirmed Results

- Directly confirmed result: the Rust toolchain versions available in the current writing environment were:

```powershell
rustc --version
cargo --version
```

- Observed output:

```text
rustc 1.94.0 (4a4ef493e 2026-03-02)
cargo 1.94.0 (85eff7c80 2026-01-15)
```

- How to read this: exact test output formatting can vary by Rust and Cargo version. For this post, focus on the number of tests and whether they passed.

- Directly confirmed result: when I ran `cargo test --quiet` against the same `src/lib.rs` and `tests/normalize.rs` structure as the post, the key output was:

```powershell
cargo test --quiet
```

- Observed output:

```text
running 3 tests
...
test result: ok. 3 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

running 1 test
.
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

- How to read this: the first group is the three unit tests in `src/lib.rs`, and the second group is the integration test in `tests/normalize.rs`. The same function can be checked both near its implementation and from the public API boundary.

- Limitation of direct reproduction: I reproduced the test run in a temporary Cargo project, but I did not add a separate example test project to this repository.

## Interpretation / Opinion

- Key decision at this stage: the most important beginner testing skill is not test syntax, but function boundaries.
- Decision rule: keep `main.rs` thin, and move core calculation or transformation logic into `lib.rs` so tests can call it directly.
- Interpretation: unit tests are good for small rules, while integration tests are good for checking whether the public API is wired correctly. Beginners benefit from seeing both at least once.

## Limits and Exceptions

- This post covers only the testing basics and does not include benchmarking, property-based testing, or snapshot testing.
- Async tests, database tests, and network tests may require extra runtime or environment setup, so they are outside the scope here.
- Options for controlling parallel execution, filtering tests, or handling output are documented in more detail in `cargo test`.
- The exact way you design failure messages and fixtures can vary by team or project.
- Remaining questions after this post include mocks, fixtures, property-based testing, and async tests. Those belong in testing-strategy material.

## References

- [cargo-test(1)](https://doc.rust-lang.org/cargo/commands/cargo-test.html)
- [Writing Automated Tests](https://doc.rust-lang.org/book/ch11-00-testing.html)
- [How to Write Tests](https://doc.rust-lang.org/book/ch11-01-writing-tests.html)
- [Controlling How Tests Are Run](https://doc.rust-lang.org/book/ch11-02-running-tests.html)
- [Test Organization](https://doc.rust-lang.org/book/ch11-03-test-organization.html)
