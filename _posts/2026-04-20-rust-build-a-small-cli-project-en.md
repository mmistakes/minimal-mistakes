---
layout: single
title: "Rust 13. Build a Small CLI Project"
description: "Practical Rust guide to building a small word counter CLI by combining project structure, file input, collections, and tests."
date: 2026-04-20 09:00:00 +0900
lang: en
translation_key: rust-build-a-small-cli-project
section: development
topic_key: rust
categories: Rust
tags: [rust, cli, mini-project, word-counter, cargo]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/rust/build-a-small-cli-project/
---

## Summary

If you have followed the Rust series through setup, debugging, syntax basics, ownership, modules, testing, file I/O, and serde, the next step is to combine those ideas into one small result. Without that step, each concept can stay isolated instead of turning into a working development flow.

This post uses a small `word counter` CLI as the example and connects project structure, file input, string processing, `HashMap`, tests, and output formatting inside one program. The practical conclusion is that a first mini project works best when the problem stays small, core logic lives in `lib.rs`, input and output stay in `main.rs`, and verification is handled with tests.

## Document Information

- Created: 2026-04-15
- Verified on: 2026-04-15
- Document type: tutorial
- Test environment: Windows 11, PowerShell, Cargo CLI examples
- Test version: rustc 1.94.0, cargo 1.94.0

## Problem Definition

A common problem while learning Rust is this: each concept makes sense on its own, but it is still unclear how to combine them into one complete program. The difficulty usually becomes visible once beginners need to handle all of the following together:

- accept a file path from the command line
- read a file
- process the string data and count words
- sort and print the result
- test the core logic

The goal of this post is not to introduce new syntax, but to connect previously learned pieces into one small CLI project.

## Confirmed Facts

- According to the official Rust Book, a Cargo package can contain both a binary crate and a library crate, which makes it possible to keep reusable logic in the library layer.
  Evidence: [Packages and Crates](https://doc.rust-lang.org/book/ch07-01-packages-and-crates.html)
- According to the standard library docs, `HashMap` is Rust's standard key-value collection.
  Evidence: [HashMap in std::collections](https://doc.rust-lang.org/std/collections/struct.HashMap.html)
- According to the standard library docs, combining `std::env::args` and `std::fs::read_to_string` provides the simplest file-based CLI input flow.
  Evidence: [std::env::args](https://doc.rust-lang.org/std/env/fn.args.html), [std::fs::read_to_string](https://doc.rust-lang.org/std/fs/fn.read_to_string.html)
- According to the official Rust Book, tests can be organized with `#[cfg(test)]` or in a `tests/` directory.
  Evidence: [Test Organization](https://doc.rust-lang.org/book/ch11-03-test-organization.html)

For a beginner mini project, this layout is already enough:

```text
word-counter/
  Cargo.toml
  src/
    main.rs
    lib.rs
  tests/
    word_count.rs
```

Keep the core logic in `src/lib.rs`.

```rust
use std::collections::HashMap;

pub fn count_words(text: &str) -> HashMap<String, usize> {
    let mut counts = HashMap::new();

    for word in text.split_whitespace() {
        let normalized = word.to_lowercase();
        *counts.entry(normalized).or_insert(0) += 1;
    }

    counts
}

pub fn sort_counts(counts: HashMap<String, usize>) -> Vec<(String, usize)> {
    let mut items: Vec<_> = counts.into_iter().collect();
    items.sort_by(|a, b| b.1.cmp(&a.1).then_with(|| a.0.cmp(&b.0)));
    items
}
```

Let `src/main.rs` focus on input and output.

```rust
use std::{env, error::Error, fs, io};
use word_counter::{count_words, sort_counts};

fn main() -> Result<(), Box<dyn Error>> {
    let path = env::args().nth(1).ok_or_else(|| {
        io::Error::new(io::ErrorKind::InvalidInput, "usage: cargo run -- <file-path>")
    })?;

    let text = fs::read_to_string(&path)?;
    let ranked = sort_counts(count_words(&text));

    for (word, count) in ranked.into_iter().take(10) {
        println!("{}\t{}", word, count);
    }

    Ok(())
}
```

Then verify the public API through `tests/word_count.rs`.

```rust
use word_counter::{count_words, sort_counts};

#[test]
fn counts_words_case_insensitively() {
    let counts = count_words("Rust rust RUST safety");

    assert_eq!(counts.get("rust"), Some(&3));
    assert_eq!(counts.get("safety"), Some(&1));
}

#[test]
fn sorts_by_frequency_descending() {
    let sorted = sort_counts(count_words("b a a c c c"));

    assert_eq!(sorted[0], ("c".to_string(), 3));
    assert_eq!(sorted[1], ("a".to_string(), 2));
}
```

That example shows how the earlier concepts connect:

- `env::args`: accept the input path
- `read_to_string`: read the file
- `split_whitespace` and `to_lowercase`: process strings
- `HashMap`: accumulate word counts
- `lib.rs` and `main.rs`: separate structure and behavior
- `tests/`: add verification

## Directly Reproduced Results

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

- Directly confirmed result: when I placed the following `sample.txt` next to the mini project and ran it, the output was:

```text
Rust rust safety safety safety tools
```

```powershell
cargo run --quiet -- sample.txt
```

- Observed output:

```text
safety	3
rust	2
tools	1
```

- Directly confirmed result: when I ran `cargo test --quiet` with the same project structure, the key output was:

```powershell
cargo test --quiet
```

- Observed output:

```text
running 2 tests
..
test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

- Limitation of direct reproduction: I verified the representative run and tests in a temporary Cargo project, but I did not validate larger inputs, punctuation handling, or extended requirements such as stop-word filtering.

## Interpretation / Opinion

- My view is that the point of a first mini project is not impressive functionality, but getting used to connecting concepts through one file structure.
- Opinion: beginners usually gain more from finishing one complete tool with the standard library and a few pure functions than from adding many crates too early.
- Opinion: input and output often change, while the core calculation logic tends to stay stable, so even a mini project benefits from centering the design on `lib.rs`.

## Limits and Exceptions

- This example uses whitespace-based tokenization only, so it does not cover punctuation handling, morphological analysis, or Unicode normalization.
- For large files or tighter memory requirements, buffered reading may be a better fit than reading everything at once.
- A production-quality CLI would likely need more work around argument parsing, output formats, exit codes, and logging.
- The sorting rule and whether to remove stop words depend on the actual problem you want to solve.

## References

- [Packages and Crates](https://doc.rust-lang.org/book/ch07-01-packages-and-crates.html)
- [HashMap in std::collections](https://doc.rust-lang.org/std/collections/struct.HashMap.html)
- [std::env::args](https://doc.rust-lang.org/std/env/fn.args.html)
- [std::fs::read_to_string](https://doc.rust-lang.org/std/fs/fn.read_to_string.html)
- [Test Organization](https://doc.rust-lang.org/book/ch11-03-test-organization.html)
- [Accepting Command Line Arguments](https://doc.rust-lang.org/book/ch12-01-accepting-command-line-arguments.html)
