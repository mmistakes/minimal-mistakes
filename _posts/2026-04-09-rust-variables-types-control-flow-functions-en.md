---
layout: single
description: "Beginner guide to Rust variables, basic types, control flow, and functions with examples."
title: "Rust 03. Variables, Types, Control Flow, and Functions"
lang: en
translation_key: rust-variables-types-control-flow-functions
date: 2026-04-09 09:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, variables, types, control-flow, functions, cargo]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/rust/variables-types-control-flow-and-functions/
---

## Summary

When you first learn Rust, the first syntax group that really matters is variables, types, control flow, and functions. Once those four are clear, later topics such as `struct`, `enum`, ownership, and borrowing become much easier to follow.

This post keeps everything inside one Cargo project and walks through default immutability, commonly used types, `if/loop/while/for/match`, and function parameters and return values. The practical idea is simple: learn how values are stored, typed, branched, repeated, and grouped into functions as one connected flow.

## Document Information

- Written on: 2026-04-09
- Verification date: 2026-04-15
- Document type: tutorial
- Test environment: Cargo project, Windows PowerShell example commands, `src/main.rs`
- Test version: rustc 1.94.0, cargo 1.94.0
- Source quality: only official documentation is used.
- Note: example outputs and diagnostics are shown to explain structure. Exact wording can vary across Rust versions.

## Problem Definition

At the beginner stage, the following four topics are easy to understand separately but harder to connect.

- the difference between `let`, `let mut`, and shadowing
- the role of common types such as numbers, strings, arrays, and tuples
- when each branching and loop form feels natural
- how function parameters, return types, and expressions work together

This post focuses on connecting those ideas inside one Cargo project you can run immediately. It does not cover `struct`, `enum`, `Result`, `Option`, or advanced pattern matching.

How to read this post: follow the sequence "create a value, attach a type, choose a flow, group code into a function." At this stage, it is more important to recognize whether a line creates a new binding, changes an existing value, or returns a value from a branch than to memorize every built-in type.

## Verified Facts

- Rust variables are immutable by default, and `mut` and shadowing are different concepts.
  Evidence: [Variables and Mutability](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html)
  Meaning: `let` does not create a slot you can freely change later. Rust asks you to show whether you intend mutation or a new binding.
- Rust data types are grouped into scalar and compound types, and `parse()` is a common case where an explicit type annotation is needed.
  Evidence: [Data Types](https://doc.rust-lang.org/book/ch03-02-data-types.html)
  Meaning: types are not just a list to memorize. They are expectations you share with the compiler, especially when one operation could produce multiple possible types.
- `if` requires a `bool`, `loop` can return a value through `break`, and `while` and `for` are used for different repetition patterns.
  Evidence: [Control Flow](https://doc.rust-lang.org/book/ch03-05-control-flow.html)
  Meaning: Rust keeps conditions and returned values explicit. That strictness catches many accidental branches early.
- Rust functions are defined with `fn`, and if the last expression has no semicolon, that value becomes the return value.
  Evidence: [How Functions Work](https://doc.rust-lang.org/book/ch03-03-how-functions-work.html)
  Meaning: the distinction between statements and expressions is central to understanding Rust return values.
- The beginner practice flow is built around `cargo new`.
  Evidence: [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
  Meaning: even when you only edit one file, a Cargo project lets this practice flow grow naturally into testing, modules, and dependencies later.

## Directly Confirmed Results

### 1. One Cargo project made the examples easiest to repeat

- Direct result: creating a small Cargo project and replacing `src/main.rs` while rerunning `cargo run` was the cleanest learning loop.

```powershell
cargo new rust-basic-syntax
cd rust-basic-syntax
code .
cargo run
```

### 2. Variables were easiest to understand as immutable, mutable, and shadowed bindings

- Direct result: the example below showed the difference between an immutable binding, a mutable binding, and shadowing in one place.

```rust
fn main() {
    let count = 10;
    println!("count = {}", count);

    let mut level = 1;
    level = level + 1;
    println!("level = {}", level);

    let spaces = "   ";
    let spaces = spaces.len();
    println!("spaces length = {}", spaces);
}
```

- Observed result:

```text
count = 10
level = 2
spaces length = 3
```

- How to read this: `count` is bound once and not changed, `level` is reassigned because it is mutable, and `spaces` is a new binding with the same name rather than a mutation of the old value.

- Direct result: reassigning an immutable variable produced a compiler error like the one below.

```rust
fn main() {
    let count = 10;
    count = 20;
}
```

```text
error[E0384]: cannot assign twice to immutable variable `count`
```

- How to read this: this error does not mean Rust forbids reassignment everywhere. It means this binding was immutable. Use `let mut count` when you intend mutation, or shadowing when you intend a new binding.

### 3. Types were easier to learn through the most common examples first

- Direct result: the following example covered the beginner-level types that come up most often: `i32`, `f64`, `bool`, `char`, `&str`, and `String`.

```rust
fn main() {
    let age: i32 = 29;
    let temperature: f64 = 36.5;
    let is_rust_fun: bool = true;
    let grade: char = 'A';
    let language: &str = "Rust";
    let message: String = String::from("hello");

    println!("age = {}", age);
    println!("temperature = {}", temperature);
    println!("is_rust_fun = {}", is_rust_fun);
    println!("grade = {}", grade);
    println!("language = {}", language);
    println!("message = {}", message);
}
```

- Observed result:

```text
age = 29
temperature = 36.5
is_rust_fun = true
grade = A
language = Rust
message = hello
```

- Direct result: `parse()` was easiest to understand when the target type was written explicitly.

```rust
fn main() {
    let guess: i32 = "42".parse().expect("A number is required.");
    println!("guess = {}", guess);
}
```

```text
guess = 42
```

- How to read this: `"42"` is a string and `guess` is an `i32`. The important point is not just that parsing succeeded, but that the code made the target type explicit.

### 4. Control flow forms had slightly different roles

- Direct result: `if` required a `bool` condition and worked well for a simple branch like this.

```rust
fn main() {
    let number = 7;

    if number % 2 == 0 {
        println!("It is even.");
    } else {
        println!("It is odd.");
    }
}
```

```text
It is odd.
```

- How to read this: the condition must evaluate to a `bool`, such as `number % 2 == 0`. Do not read Rust `if` conditions like C-style truthy numbers.

- Direct result: `loop` could return a value through `break`.

```rust
fn main() {
    let mut count = 0;

    let result = loop {
        count += 1;

        if count == 3 {
            break count * 10;
        }
    };

    println!("result = {}", result);
}
```

```text
result = 30
```

- How to read this: `loop` is not only for endless repetition. With `break count * 10`, the loop can produce a value that gets stored in a variable.

- Direct result: `while` worked naturally for condition-based repetition, `for` for arrays and ranges, and `match` for value-based branching.

```rust
fn main() {
    let tools = ["rustc", "cargo", "clippy"];

    for tool in tools {
        println!("tool = {}", tool);
    }

    let score = 85;
    let grade = match score {
        90..=100 => "A",
        80..=89 => "B",
        70..=79 => "C",
        _ => "D",
    };

    println!("grade = {}", grade);
}
```

```text
tool = rustc
tool = cargo
tool = clippy
grade = B
```

### 5. Functions made more sense when parameters, return types, and expressions were shown together

- Direct result: the example below made function parameters, explicit return types, and implicit final-expression returns easy to see together.

```rust
fn print_user(name: &str, age: u32) {
    println!("name = {}, age = {}", name, age);
}

fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn max(a: i32, b: i32) -> i32 {
    if a > b {
        a
    } else {
        b
    }
}

fn main() {
    print_user("K4NUL", 30);

    let sum = add(10, 20);
    let bigger = max(7, 11);

    println!("sum = {}", sum);
    println!("bigger = {}", bigger);
}
```

- Observed result:

```text
name = K4NUL, age = 30
sum = 30
bigger = 11
```

- How to read this: the last lines in `add` and `max` are expressions, so they become return values. Adding a semicolon to the final expression of a returning function changed the flow into `()` and no longer matched the intended return type.

### 6. The combined example made the connections clearer

- Direct result: once variables, types, `if`, `for`, `match`, and functions were placed in one file, the beginner grammar started to feel like one connected system instead of separate rules.

```rust
fn describe_score(score: i32) -> &'static str {
    match score {
        90..=100 => "excellent",
        80..=89 => "good",
        70..=79 => "not bad",
        _ => "keep practicing",
    }
}

fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    let user = "rust beginner";
    let mut score = 70;
    score = score + 15;

    let level = if score >= 80 { "intermediate" } else { "starter" };
    let point: (i32, i32) = (10, 20);
    let numbers: [i32; 3] = [1, 2, 3];

    println!("user = {}", user);
    println!("score = {}", score);
    println!("level = {}", level);
    println!("point = ({}, {})", point.0, point.1);

    for number in numbers {
        println!("number = {}", number);
    }

    let total = add(10, 20);
    println!("total = {}", total);
    println!("description = {}", describe_score(score));
}
```

## Interpretation / Opinion

- Key decision at this stage: variables, types, control flow, and functions are easier to learn by rerunning one `main.rs` file than by memorizing each rule separately.
- Decision rule: learn the types you will keep seeing first, such as `i32`, `bool`, `&str`, and `String`, instead of trying to memorize the full type list at once.
- Interpretation: the most important outcome at this stage is not "knowing a lot of syntax," but building a feel for storing values, branching, repeating, and grouping code into functions.

## Limits and Exceptions

- This post only covers the most basic grammar inside a Cargo project. `struct`, `enum`, `Result`, `Option`, and iterator-heavy patterns are outside the scope.
- Exact diagnostics and some inferred behavior can vary across Rust versions.
- This post does not cover macOS, Linux, or WSL-specific differences.
- `match` is a much deeper topic, but here it is only used as an entry-level branching example.
- Remaining questions after this post include `Option`, `Result`, and how ownership affects function arguments. Those are better handled in the ownership and error-handling posts.

## References

- [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- [Variables and Mutability](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html)
- [Data Types](https://doc.rust-lang.org/book/ch03-02-data-types.html)
- [How Functions Work](https://doc.rust-lang.org/book/ch03-03-how-functions-work.html)
- [Control Flow](https://doc.rust-lang.org/book/ch03-05-control-flow.html)
- [match](https://doc.rust-lang.org/book/ch06-02-match.html)
