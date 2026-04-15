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

Once you move past Rust syntax basics and start writing real code, the types you run into most often are `Vec`, `String`, `&str`, and `HashMap`. This post explains what each one is for and how owned data and borrowed data appear together in practical beginner-level code.

The short version is simple: use `Vec` when you want an ordered list of values, `String` when you need an owned and editable string, `&str` when you only need to borrow string data, and `HashMap` when you want key-value storage. Once that mental model is in place, it becomes much easier to move into file I/O, CLI input, serde, and small command-line tools.

## Verification scope and reproducibility

- As of: April 15, 2026, checked against the official Rust Book and Rust standard library documentation.
- Source grade: only official documentation is used.
- Reproduction environment: Cargo project, Windows PowerShell example commands, and `src/main.rs`.
- Opinion: this post intentionally stays with the most common beginner patterns and avoids going deep into advanced `entry()` usage or UTF-8 internals.

## Create a Practice Project

Create a new project like this and run the examples in `src/main.rs`. The Rust Book beginner workflow starts from a `cargo new` project. [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)

```powershell
cargo new rust-collections-basics
cd rust-collections-basics
code .
```

After pasting an example into `src/main.rs`, run it with:

```powershell
cargo run
```

## First, a One-Line Mental Model

- `Vec<T>`: a growable collection of values in order
- `String`: an owned UTF-8 string
- `&str`: a borrowed string slice
- `HashMap<K, V>`: a key-value collection

According to the official docs, `String` is a growable UTF-8 string type, while `str` is the most primitive string type and is usually seen in its borrowed form as `&str`. [Rust `String` docs](https://doc.rust-lang.org/std/string/struct.String.html), [Rust `str` docs](https://doc.rust-lang.org/std/primitive.str.html)

## Vec<T>: Storing Values in Order

`Vec<T>` is one of the most common collections in Rust. It is used when you want to keep multiple values of the same type in order, append new values, and iterate over them.

The Rust Book introduces vectors as the standard way to store more than one value of the same type, and the standard library documents `Vec<T>` as Rust's growable array type. [Storing Lists of Values with Vectors](https://doc.rust-lang.org/book/ch08-01-vectors.html), [Rust `Vec` docs](https://doc.rust-lang.org/std/vec/struct.Vec.html)

```rust
fn main() {
    let mut scores: Vec<i32> = Vec::new();
    scores.push(10);
    scores.push(20);
    scores.push(30);

    println!("len = {}", scores.len());
    println!("scores[0] = {}", scores[0]);

    match scores.get(10) {
        Some(value) => println!("value = {}", value),
        None => println!("index 10 is out of range"),
    }

    for score in &scores {
        println!("score = {}", score);
    }
}
```

The output looks like this.

![Console output showing the Vec example length, first element, out-of-range lookup, and iteration results]({{ '/images/rust_08/vec 예제결과.png' | relative_url }})

The first distinction beginners should remember is this:

- `scores[0]` accesses the value directly and assumes the index exists
- `scores.get(10)` returns `Option<&T>`, so out-of-range access can be handled safely

In practice, if you are not absolutely sure the index exists, `get` is usually the safer choice.

## String and &str: Owned Strings vs Borrowed Strings

The most common early confusion around Rust strings is the difference between `String` and `&str`.

- `String` owns its contents
- `&str` borrows string data
- a string literal like `"hello"` is usually of type `&'static str`

According to the official docs, `String` owns a heap-allocated UTF-8 buffer, while `str` is the primitive string slice type. [Rust `String` docs](https://doc.rust-lang.org/std/string/struct.String.html), [Rust `str` docs](https://doc.rust-lang.org/std/primitive.str.html), [Storing UTF-8 Encoded Text with Strings](https://doc.rust-lang.org/book/ch08-02-strings.html)

```rust
fn print_title(title: &str) {
    println!("title = {}", title);
}

fn main() {
    let literal: &str = "Rust";

    let mut owned = String::from("Rust");
    owned.push_str(" language");

    print_title(literal);
    print_title(&owned);

    let copied = literal.to_string();
    println!("copied = {}", copied);
}
```

The output looks like this.

![Console output showing the String and &str example with a string literal and an owned string]({{ '/images/rust_08/string과 &str 예제 결과.png' | relative_url }})

The important practical point here is that a function that accepts `&str` can work with both string literals and borrowed `String` values. At the beginner level, accepting `&str` for read-only string parameters is often the most flexible pattern.

## Working with Strings: Slices, Words, and a UTF-8 Reminder

When handling strings, you often do not need a brand-new `String`. Many tasks are really about borrowing part of a string or iterating over words.

```rust
fn main() {
    let text = String::from("rust makes systems programming safer");
    let first_word = &text[0..4];

    println!("first_word = {}", first_word);

    for word in text.split_whitespace() {
        println!("word = {}", word);
    }
}
```

The output looks like this.

![Console output showing the first borrowed slice and each word returned by split_whitespace]({{ '/images/rust_08/문자열 다루기 예제 결과 1.png' | relative_url }})

You can read that code like this:

- `first_word` is not a copied string, but a borrowed `&str` slice
- `split_whitespace()` yields each word as `&str`
- working with strings does not always mean allocating a new `String`

There is one especially important beginner warning: `str::len()` returns bytes, not character count, and string slicing indices must stay on valid UTF-8 boundaries. [Rust `str` docs](https://doc.rust-lang.org/std/primitive.str.html), [Storing UTF-8 Encoded Text with Strings](https://doc.rust-lang.org/book/ch08-02-strings.html)

```rust
fn main() {
    let text = "한글";

    println!("bytes = {}", text.len());
    println!("chars = {}", text.chars().count());
}
```

The output looks like this.

![Console output showing the difference between byte length and character count for a Korean string]({{ '/images/rust_08/문자열 다루기 예제 결과 2.png' | relative_url }})

That is why beginners are usually better off starting with methods like `split_whitespace()`, `lines()`, and `chars()` instead of slicing strings by arbitrary byte offsets.

## HashMap<K, V>: Finding Values by Key

`HashMap<K, V>` is the right tool for patterns like "name -> score", "word -> count", or "setting -> value".

The Rust Book presents hash maps as the standard key-value collection, and the standard library documents `HashMap` as Rust's hash-based key-value map type. [Storing Keys with Associated Values in Hash Maps](https://doc.rust-lang.org/book/ch08-03-hash-maps.html), [Rust `HashMap` docs](https://doc.rust-lang.org/std/collections/struct.HashMap.html)

```rust
use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("alice"), 95);
    scores.insert(String::from("bob"), 88);

    let target = String::from("alice");

    match scores.get(&target) {
        Some(score) => println!("alice = {}", score),
        None => println!("no score found"),
    }

    println!("contains bob = {}", scores.contains_key("bob"));

    for (name, score) in &scores {
        println!("{} = {}", name, score);
    }
}
```

The output looks like this.

![Console output showing the HashMap example with the alice lookup, bob key check, and full map iteration]({{ '/images/rust_08/hashmap 예제 결과.png' | relative_url }})

Note: iteration order in `HashMap` is not guaranteed, so the last two lines may appear in a different order on another run.

At this stage, these are the main operations worth remembering:

- use `insert` to store a key-value pair
- `get` returns `Option<&V>`
- `contains_key` checks whether a key exists
- you can iterate over the full map with a `for` loop

## Combined Example: Counting Word Frequency

Now let us connect `Vec`, `String`, `&str`, and `HashMap` in one practical example. The code below counts word frequency across multiple lines.

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

    println!("joined = {}", joined);

    let rust_key = String::from("rust");
    let safer_key = String::from("safer");

    println!("rust = {:?}", counts.get(&rust_key));
    println!("safer = {:?}", counts.get(&safer_key));

    for (word, count) in &counts {
        println!("{}: {}", word, count);
    }
}
```

Each type plays a different role here:

- `Vec<&str>` stores multiple input lines
- `join(" ")` builds one owned `String`
- `count_words(&joined)` borrows that string as `&str`
- `split_whitespace()` walks through borrowed `&str` words
- `HashMap<String, usize>` stores owned keys because the result needs to remain valid after the loop ends

That relationship is the real takeaway from this post. You often read input through `&str`, keep long-lived results in `String`, gather multiple values in `Vec`, and accumulate counts or lookups in `HashMap`.

## Summary

This post grouped `Vec`, `String`, `&str`, and `HashMap` into one beginner-friendly flow. Use `Vec` for ordered collections, `String` for owned editable text, `&str` for borrowed read-only string access, and `HashMap` for key-based lookup and accumulation.

The most natural next step is to move from individual types to project structure: how these values get split across files, libraries, and executables. That is why the next post fits well around crates, packages, and project layout.

## Sources and references

- Rust Project Developers, [Storing Lists of Values with Vectors](https://doc.rust-lang.org/book/ch08-01-vectors.html)
- Rust Project Developers, [Storing UTF-8 Encoded Text with Strings](https://doc.rust-lang.org/book/ch08-02-strings.html)
- Rust Project Developers, [Storing Keys with Associated Values in Hash Maps](https://doc.rust-lang.org/book/ch08-03-hash-maps.html)
- Rust Project Developers, [String in std::string](https://doc.rust-lang.org/std/string/struct.String.html)
- Rust Project Developers, [str primitive type](https://doc.rust-lang.org/std/primitive.str.html)
- Rust Project Developers, [Vec in std::vec](https://doc.rust-lang.org/std/vec/struct.Vec.html)
- Rust Project Developers, [HashMap in std::collections](https://doc.rust-lang.org/std/collections/struct.HashMap.html)
