---
layout: single
title: "Rust 08. Vec, String, &str, and HashMap Basics"
description: "Beginner-friendly Rust guide to Vec, String, &str, and HashMap with examples and a word-frequency walkthrough."
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

## Summary

Once you start writing practical Rust code, the types you see most often are `Vec`, `String`, `&str`, and `HashMap`. Understanding those four makes it much easier to read input, split strings, and accumulate results in beginner-level programs.

This post connects those four ideas in one flow. In short, use `Vec` for ordered collections, `String` for owned editable text, `&str` for borrowed string access, and `HashMap` for keyed lookup and accumulation.

## Document Information

- Written on: 2026-04-15
- Verification date: 2026-04-16
- Document type: tutorial
- Test environment: Windows 11 Pro, Cargo project, Windows PowerShell example commands, `src/main.rs`
- Test version: rustc 1.94.0, cargo 1.94.0
- Source quality: only official documentation is used.
- Note: representative examples were rerun locally, and the post stays with the beginner-level view of `HashMap` ordering and UTF-8 behavior.

## Problem Definition

At the beginner stage, the following four questions often appear together.

- which collection to use when values need to stay in order
- when a string should be owned and when it should be borrowed
- how UTF-8 affects string length and slicing expectations
- where to store accumulated results such as word counts or keyed settings

This post connects those questions as one workflow. It does not cover `BTreeMap`, `Cow`, advanced `entry()` usage, or the full internal details of UTF-8 string representation.

How to read this post: start by asking whether order matters, whether the string must be owned, and whether lookup by key is needed. The examples are not here to make you memorize collection names. They show the basic beginner workflow of reading input, splitting text, and accumulating results.

## Verified Facts

- `Vec<T>` is Rust's growable collection for storing values of the same type in order.
  Evidence: [Storing Lists of Values with Vectors](https://doc.rust-lang.org/book/ch08-01-vectors.html), [Vec in std::vec](https://doc.rust-lang.org/std/vec/struct.Vec.html)
  Meaning: if the order of items matters and the number of items can grow, `Vec` is the first collection to consider.
- `String` is an owned UTF-8 string type, while `str` is the primitive string slice type usually used through `&str`.
  Evidence: [Storing UTF-8 Encoded Text with Strings](https://doc.rust-lang.org/book/ch08-02-strings.html), [String in std::string](https://doc.rust-lang.org/std/string/struct.String.html), [str primitive type](https://doc.rust-lang.org/std/primitive.str.html)
  Meaning: use `String` when text must be stored or modified, and `&str` when existing text only needs to be read.
- `HashMap<K, V>` is the standard key-value collection for associated data.
  Evidence: [Storing Keys with Associated Values in Hash Maps](https://doc.rust-lang.org/book/ch08-03-hash-maps.html), [HashMap in std::collections](https://doc.rust-lang.org/std/collections/struct.HashMap.html)
  Meaning: when the problem looks like "this key maps to that count/value," `HashMap` is usually the simplest starting point.
- `Vec::get` returns `Option<&T>`, and `str::len()` reports bytes rather than character count.
  Evidence: [Vec in std::vec](https://doc.rust-lang.org/std/vec/struct.Vec.html), [str primitive type](https://doc.rust-lang.org/std/primitive.str.html)
  Meaning: Rust does not hide missing-index access or UTF-8 byte behavior. You need to distinguish optional access from indexing and byte length from character count.
- The simplest practice flow is still a small `cargo new` project.
  Evidence: [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
  Meaning: collection examples are easiest to understand by changing small inputs and observing output changes.

## Directly Confirmed Results

### 1. A small Cargo project made the practice loop simple

- Direct result: creating a fresh project and repeatedly replacing `src/main.rs` while running `cargo run` was the cleanest way to verify the examples.

```powershell
cargo new rust-collections-basics
cd rust-collections-basics
code .
cargo run
```

### 2. `Vec`, `String`, `&str`, and UTF-8 length differences showed up clearly in a short example

- Direct result: the example below made vector access, owned vs borrowed strings, and byte-vs-character length easy to observe together.

```rust
fn main() {
    let mut scores: Vec<i32> = Vec::new();
    scores.push(10);
    scores.push(20);
    scores.push(30);

    println!("len = {}", scores.len());
    println!("scores[0] = {}", scores[0]);
    println!("index 10 = {:?}", scores.get(10));

    let literal: &str = "Rust";
    let mut owned = String::from("Rust");
    owned.push_str(" language");
    println!("literal = {}", literal);
    println!("owned = {}", owned);

    let text = "한글";
    println!("bytes = {}", text.len());
    println!("chars = {}", text.chars().count());
}
```

- Observed result:

```text
len = 3
scores[0] = 10
index 10 = None
literal = Rust
owned = Rust language
bytes = 6
chars = 2
```

- How to read this: `scores[0]` assumes the index exists, while `scores.get(10)` reports absence as `None`. `"한글"` has 6 bytes and 2 characters, which shows why Rust string length must be read through UTF-8 behavior.

### 3. The word-frequency example made the relationship between the four types clearer

- Direct result: the example below showed how `Vec`, `&str`, `String`, and `HashMap` connect in a small word-count workflow.

```rust
use std::collections::HashMap;

fn count_words(text: &str) -> HashMap<String, usize> {
    let mut counts = HashMap::new();

    for word in text.split_whitespace() {
        let normalized = word.to_lowercase();

        if let Some(count) = counts.get_mut(&normalized) {
            *count += 1;
        } else {
            counts.insert(normalized, 1);
        }
    }

    counts
}

fn main() {
    let lines = vec![
        "Rust makes systems programming safer",
        "Rust makes concurrency easier to reason about",
        "safer code starts with clear data ownership",
    ];

    let joined = lines.join(" ");
    let counts = count_words(&joined);

    println!("rust = {:?}", counts.get("rust"));
    println!("safer = {:?}", counts.get("safer"));
}
```

- Observed result:

```text
rust = Some(2)
safer = Some(2)
```

- How to read this: `lines` is a `Vec`, `joined` is an owned `String`, `count_words` reads a borrowed `&str`, and `counts` stores accumulated results in a `HashMap`. The four types form one workflow rather than four isolated facts.

## Interpretation / Opinion

- Key decision at this stage: the real point of this topic is not memorizing type names, but learning when to own data, when to borrow it, and when to accumulate it under keys.
- Decision rule: start with `&str` for read-only string parameters, `String` for owned or mutable text, `Vec` for ordered lists, and `HashMap` for keyed accumulation.
- Interpretation: `HashMap` is convenient for accumulation, but because it does not guarantee iteration order, output-order expectations should be explained separately.

## Limits and Exceptions

- This post only covers the most common beginner patterns. `BTreeMap`, `Cow`, and deeper `entry()` patterns are outside the scope.
- `HashMap` iteration order is not guaranteed, so some printed lines can appear in a different order across runs.
- `len()` on strings reports bytes, and direct byte indexing is not always safe for UTF-8 text.
- This post does not go deep into UTF-8 internals or advanced string-performance topics.
- Remaining questions after this post include the `entry()` API, choosing sorted maps, and string slicing strategy. Those belong in a deeper collections/string post.

## References

- [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- [Storing Lists of Values with Vectors](https://doc.rust-lang.org/book/ch08-01-vectors.html)
- [Storing UTF-8 Encoded Text with Strings](https://doc.rust-lang.org/book/ch08-02-strings.html)
- [Storing Keys with Associated Values in Hash Maps](https://doc.rust-lang.org/book/ch08-03-hash-maps.html)
- [String in std::string](https://doc.rust-lang.org/std/string/struct.String.html)
- [str primitive type](https://doc.rust-lang.org/std/primitive.str.html)
- [Vec in std::vec](https://doc.rust-lang.org/std/vec/struct.Vec.html)
- [HashMap in std::collections](https://doc.rust-lang.org/std/collections/struct.HashMap.html)
