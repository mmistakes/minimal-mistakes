---
layout: single
description: "Rust fundamentals guide to generics, error handling, closures, and iterators with examples."
title: "Rust 06. Generics, Error Handling, Closures, and Iterators"
lang: en
translation_key: rust-generics-error-handling-closures-iterators
date: 2026-04-13 10:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, generics, error-handling, closures, iterators]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/rust/generics-error-handling-closures-and-iterators/
---

## Summary

Once you get a little more comfortable with Rust, four ideas start showing up together: reusing logic across types, handling failure without hiding it, treating small pieces of logic like values, and processing collections in clear transformation steps. Those ideas are represented by `generics`, error handling, closures, and iterators.

This post connects those four topics inside one Cargo-based workflow. In short, generics generalize over types, `Result` and `?` propagate failure, closures capture surrounding values in short inline logic, and iterators provide a composable and lazy model for collection processing.

## Document Information

- Written on: 2026-04-13
- Verification date: 2026-04-16
- Document type: tutorial
- Test environment: Windows 11 Pro, Cargo project, Windows PowerShell example commands, `src/main.rs`
- Test version: rustc 1.94.0, cargo 1.94.0
- Source quality: only official documentation is used.
- Note: representative examples were rerun locally, and advanced trait bounds or production-oriented error design are intentionally out of scope.

## Problem Definition

At the beginner stage, the following four questions often appear together even though they first look like unrelated syntax.

- how to reuse one piece of logic across multiple types
- how to expose recoverable failure in a return value
- how to pass short logic around while still reading outer values
- how to express collection processing as a chain of steps instead of manual loop state

This post connects those questions at the beginner level. It does not cover lifetime-heavy generic design, custom error architecture, the full iterator adaptor space, or async streams.

How to read this post: do not treat the four topics as a list to memorize. Read them as roles inside a data-processing flow. Generics keep one shape of logic open to multiple types, `Result` exposes failure, and closures plus iterators let you compose small transformation steps.

## Verified Facts

- Generic type parameters are Rust's basic tool for reducing duplication across types.
  Evidence: [Generic Data Types](https://doc.rust-lang.org/book/ch10-01-syntax.html)
  Meaning: generics do not mean "accept literally anything." They mean "apply the same code shape to types that meet the required conditions."
- Recoverable errors are typically expressed with `Result<T, E>`, and the `?` operator shortens propagation inside compatible return types.
  Evidence: [Recoverable Errors with Result](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html)
  Meaning: failure is visible in the return type, so the caller must handle both success and error paths in code.
- A closure is an anonymous function that can capture values from its surrounding environment.
  Evidence: [Closures](https://doc.rust-lang.org/book/ch13-01-closures.html)
  Meaning: closures are useful when a short rule needs to be passed around while still reading values from the current scope.
- Iterator adapters such as `map` and `filter` are usually lazy, and work happens when the iterator is consumed by something like `sum`, `collect`, or a `for` loop.
  Evidence: [Processing a Series of Items with Iterators](https://doc.rust-lang.org/book/ch13-02-iterators.html)
  Meaning: an iterator chain is a staged description of work. The work usually happens when the chain is consumed.
- The simplest beginner practice flow is still a small `cargo new` project.
  Evidence: [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
  Meaning: this topic benefits from rerunning both success and failure cases in the same small project.

## Directly Confirmed Results

### 1. A single practice project made repeated reruns easy

- Direct result: creating one fresh Cargo project and replacing `src/main.rs` while rerunning `cargo run` was the simplest practice loop.

```powershell
cargo new rust-generics-errors-closures
cd rust-generics-errors-closures
code .
cargo run
```

### 2. Generics and `Result` showed reuse and failure handling as separate concerns

- Direct result: the example below made it easy to see generic reuse and recoverable failure in the same file.

```rust
fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];

    for &item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn safe_divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Cannot divide by zero."))
    } else {
        Ok(a / b)
    }
}

fn main() {
    let numbers = [10, 40, 20, 30];
    println!("largest number = {}", largest(&numbers));

    match safe_divide(10.0, 0.0) {
        Ok(value) => println!("result = {}", value),
        Err(message) => println!("error = {}", message),
    }
}
```

- Observed result:

```text
largest number = 40
error = Cannot divide by zero.
```

- How to read this: `largest` reuses one algorithm for values that can be compared and copied. `safe_divide` does not hide failure in a print statement; it returns `Result`, and the caller chooses how to handle `Ok` and `Err`.

### 3. Closures and iterators worked well as one data-processing flow

- Direct result: the example below showed environment capture by a closure and a small iterator pipeline in one place.

```rust
fn main() {
    let bonus = 5;
    let add_bonus = |score: i32| score + bonus;
    println!("closure result = {}", add_bonus(10));

    let total: i32 = vec![1, 2, 3, 4, 5]
        .iter()
        .copied()
        .filter(|n| n % 2 == 0)
        .map(|n| n * 2)
        .sum();

    println!("total = {}", total);
}
```

- Observed result:

```text
closure result = 15
total = 12
```

- How to read this: `add_bonus` behaves like a small function that can read `bonus` from the surrounding scope. The iterator chain shows the data-processing order directly: keep even numbers, double them, then sum them.

### 4. The combined example showed why these four ideas often appear together

- Direct result: the example below connected generics, `Result`, closures, and iterators in one flow.

```rust
use std::num::ParseIntError;
use std::str::FromStr;

fn parse_values<T>(inputs: &[&str]) -> Result<Vec<T>, T::Err>
where
    T: FromStr,
{
    inputs.iter().map(|input| input.parse::<T>()).collect()
}

fn main() -> Result<(), ParseIntError> {
    let inputs = vec!["10", "20", "30"];
    let numbers = parse_values::<i32>(&inputs)?;

    let doubled_total: i32 = numbers.iter().map(|n| (n + 3) * 2).sum();

    println!("numbers = {:?}", numbers);
    println!("doubled_total = {}", doubled_total);

    Ok(())
}
```

- Observed result:

```text
numbers = [10, 20, 30]
doubled_total = 138
```

- How to read this: `parse_values` turns a slice of strings into a `Vec<T>`, but returns early with a `Result` if parsing fails. The `?` operator is not hiding errors; it is a short form for passing them outward through the current function's return type.

## Interpretation / Opinion

- Key decision at this stage: generics, `Result`, closures, and iterators usually appear in real Rust code as one flow of reading, transforming, and safely returning data, not as isolated syntax features.
- Decision rule: if a loop is mostly a sequence of transformations, consider an iterator chain; if failure can occur, expose it in the return type with `Result`.
- Interpretation: the `?` operator becomes much easier to use later in file I/O or parsing code once it is understood first as control flow for early error return.

## Limits and Exceptions

- This post stays at the beginner-summary level. Lifetime-heavy generics, advanced trait bounds, custom error types, and the broader iterator adaptor set are outside the scope.
- The differences between `Fn`, `FnMut`, and `FnOnce`, along with deeper borrow behavior around closures, are not covered here.
- Lazy iterator behavior matters, but this post only touches the basic consumption points such as `sum()` and `collect()`.
- Exact output and diagnostic wording can vary by Rust version, and this post does not compare macOS, Linux, or WSL-specific behavior.
- Remaining questions after this post include custom error types, lifetime-heavy generic APIs, and iterator performance details. Those fit better after a few practical projects.

## References

- [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- [Generic Data Types](https://doc.rust-lang.org/book/ch10-01-syntax.html)
- [Recoverable Errors with Result](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html)
- [Closures](https://doc.rust-lang.org/book/ch13-01-closures.html)
- [Processing a Series of Items with Iterators](https://doc.rust-lang.org/book/ch13-02-iterators.html)
