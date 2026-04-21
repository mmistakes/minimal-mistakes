---
layout: single
description: "Rust fundamentals guide explaining ownership, borrowing, and lifetimes through examples."
title: "Rust 04. Ownership, Borrowing, and Lifetimes"
lang: en
translation_key: rust-ownership-borrowing-lifetimes
date: 2026-04-10 09:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, ownership, borrowing, lifetimes, references]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/rust/ownership-borrowing-and-lifetimes/
---

## Summary

When learning Rust, the words you keep seeing are `ownership`, `borrowing`, and `lifetime`. Those ideas are the main reason Rust can provide memory safety without a garbage collector.

This post uses small `String`-based examples to explain how ownership moves, why borrowing exists, and when lifetime annotations appear. The practical model is simple: ownership defines responsibility for a value, references let you borrow without taking that responsibility, and lifetimes describe how borrowed references are related.

## Document Information

- Written on: 2026-04-10
- Verification date: 2026-04-15
- Document type: tutorial
- Test environment: Cargo project, `String` and reference examples, `src/main.rs`
- Test version: rustc 1.94.0, cargo 1.94.0
- Source quality: only official documentation is used.
- Note: lifetime annotation examples are shown to explain the concept. In real code, the compiler often infers more than beginners expect.

## Problem Definition

For beginners, ownership-related topics feel difficult for a few recurring reasons.

- the same assignment looks like a copy in some cases and a move in others
- it is easy to lose track of whether a function takes ownership or just borrows
- mutable and immutable borrow conflicts feel surprising at first
- lifetime syntax looks like a time concept, even though it is mainly a way to describe reference relationships

This post reduces that confusion by connecting scope, move, clone/copy, borrowing, dangling references, and lifetime annotations into one flow. It does not cover smart pointers, interior mutability, or advanced lifetime patterns.

How to read this post: keep asking who is responsible for a value and whether the code is only borrowing it temporarily. Do not try to memorize lifetime syntax first. Instead, watch why a moved value cannot be used through its old name and why a reference must not outlive the value it points to.

## Verified Facts

- The core ownership rules are that each value has one owner, and the value is dropped when that owner goes out of scope.
  Evidence: [What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)
  Meaning: Rust assigns one cleanup responsibility for each value. That rule helps prevent double frees and references to values that no longer exist.
- Owned types such as `String` move on assignment, `clone()` creates a real duplicate, and `Copy` types duplicate on assignment instead of moving.
  Evidence: [What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)
  Meaning: the same `=` can have different costs and meanings. `String` transfers responsibility, while small `Copy` values such as `i32` remain usable through the original binding.
- Borrowing lets you use references without transferring ownership, and mutable borrowing follows stricter rules than immutable borrowing.
  Evidence: [References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)
  Meaning: many readers can look at the same value, but a writer needs exclusive access. That is the core reason mutable borrowing is more restricted.
- Dangling references are rejected, and explicit lifetime annotations are sometimes required to describe how returned references relate to input references.
  Evidence: [References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html), [Validating References with Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)
  Meaning: lifetimes are not runtime clocks. They are type-level descriptions of valid reference relationships.
- The beginner practice flow is easiest to follow inside a `cargo new` project.
  Evidence: [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
  Meaning: ownership examples are most useful when you also see the compiler errors, so replacing code and rerunning `cargo run` is part of the learning loop.

## Directly Confirmed Results

### 1. One small Cargo project made the examples easiest to rerun

- Direct result: the following setup worked well as a baseline for replacing `src/main.rs` and rechecking each ownership example.

```powershell
cargo new rust-ownership-basics
cd rust-ownership-basics
code .
cargo run
```

### 2. Scope explained the first ownership rule clearly

- Direct result: in the example below, `message` was only valid inside the block, which made the owner-scope relationship easy to see.

```rust
fn main() {
    {
        let message = String::from("hello");
        println!("{}", message);
    }

    // message is no longer valid here.
}
```

- How to read this: a block creates the range in which a value is valid. This was the simplest starting point for explaining why Rust ties values to owner scope.

### 3. `String` assignment behaved like a move, not a copy

- Direct result: assigning `s1` to `s2` made the moved-ownership model much easier to understand.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("{}", s2);
}
```

- Direct result: trying to use `s1` again produced a moved-value compile error.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("{}", s1);
    println!("{}", s2);
}
```

```text
error[E0382]: borrow of moved value: `s1`
```

- How to read this: this does not mean the string data disappeared. It means responsibility for the value moved from `s1` to `s2`. If both names need usable values, choose an explicit copy such as `clone()`.

- Direct result: using `clone()` created a real duplicate.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();

    println!("s1 = {}", s1);
    println!("s2 = {}", s2);
}
```

```text
s1 = hello
s2 = hello
```

- Direct result: `Copy` types such as `i32` kept the original binding usable after assignment.

```rust
fn main() {
    let x = 10;
    let y = x;

    println!("x = {}", x);
    println!("y = {}", y);
}
```

```text
x = 10
y = 10
```

- How to read this: `clone()` creates separate string data, so both `s1` and `s2` remain usable. `i32` is `Copy`, so assignment keeps `x` usable as well. A useful beginner model is: owned heap-backed values often move, small `Copy` values copy.

### 4. Borrowing kept ownership in place while still allowing access

- Direct result: passing a string by reference let the function read from it without taking ownership away from `main`.

```rust
fn print_length(text: &str) {
    println!("length = {}", text.len());
}

fn main() {
    let message = String::from("hello rust");
    print_length(&message);

    println!("message = {}", message);
}
```

- Observed result:

```text
length = 10
message = hello rust
```

- How to read this: `print_length(&message)` lends read access instead of transferring the value. After the function call, `main` is still the owner of `message`.

- Direct result: immutable borrows could coexist, but mutable borrows were only accepted when the code had exclusive access.

```rust
fn add_suffix(text: &mut String) {
    text.push_str(" ownership");
}

fn main() {
    let mut message = String::from("rust");
    add_suffix(&mut message);

    println!("{}", message);
}
```

```text
rust ownership
```

- Direct result: mixing an immutable borrow and a mutable borrow at the same time produced the expected borrow-checker error.

```rust
fn main() {
    let mut text = String::from("hello");

    let r1 = &text;
    let r2 = &mut text;

    println!("{}, {}", r1, r2);
}
```

```text
error[E0502]: cannot borrow `text` as mutable because it is also borrowed as immutable
```

- How to read this: the problem is not that mutable borrowing is bad. The problem is that the code asks for write access while a read reference is still in use.

### 5. Dangling references were blocked, and lifetimes described relationships

- Direct result: returning a reference to a local `String` was rejected.

```rust
fn dangle() -> &String {
    let text = String::from("hello");
    &text
}
```

- Direct result: returning ownership instead of a reference fixed that pattern.

```rust
fn no_dangle() -> String {
    let text = String::from("hello");
    text
}
```

- Direct result: the classic "return one of two borrowed strings" example showed where lifetime annotations become useful.

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() >= y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let first = String::from("rust");
    let second = String::from("ownership");

    let result = longest(first.as_str(), second.as_str());
    println!("longer = {}", result);
}
```

```text
longer = ownership
```

- How to read this: `'a` in `longest<'a>` says that the two inputs and the returned reference are tied together by a valid reference relationship. Because the function may return either `x` or `y`, the compiler needs that relationship stated.

### 6. Structs that stored references also needed lifetimes

- Direct result: when a struct field stored a reference, adding a lifetime parameter made the relationship explicit.

```rust
struct Highlight<'a> {
    part: &'a str,
}

fn main() {
    let article = String::from("Rust ownership makes memory safety practical.");
    let first_word = article.split_whitespace().next().unwrap();

    let highlight = Highlight { part: first_word };
    println!("{}", highlight.part);
}
```

```text
Rust
```

- How to read this: if a struct stores a reference, the struct must not outlive the original value behind that reference. Once immutable borrowing, mutable borrowing, lifetime annotations, and a reference-storing struct were placed side by side, the overall model became much easier to connect.

## Interpretation / Opinion

- Key decision at this stage: ownership is easier to learn as "who is responsible for this value?" than as a purely memory-theory concept.
- Decision rule: if the old name is no longer needed, move the value; if both sides need their own value, use `clone`; if only reading is needed, use `&T`; if mutation is needed, use `&mut T`.
- Interpretation: lifetimes are less about measuring time and more about describing valid reference ranges to the compiler.

## Limits and Exceptions

- This post is an introduction centered on `String` and string references. It does not cover `Vec<T>`, smart pointers, interior mutability, trait objects, or async borrowing issues.
- Exact diagnostics can vary across Rust versions.
- Lifetime annotations are often omitted in real code when inference is enough, but this post keeps the classic examples visible for clarity.
- The focus is on the language rules themselves rather than OS-specific differences.
- Remaining questions after this post include smart pointers, interior mutability, trait objects, and async borrowing. Those are next-layer topics built on top of the same ownership rules.

## References

- [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- [What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)
- [References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)
- [Validating References with Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)
