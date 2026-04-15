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

Once you get more comfortable with Rust, four topics start appearing everywhere: how to reuse the same logic across different types, how to handle failure safely, how to treat small pieces of logic like values, and how to process collections cleanly. Those ideas are covered by `generics`, error handling, closures, and iterators.

This post explains those four topics at a beginner-friendly level. Each one may look like separate syntax at first, but in real Rust code they very often work together.

## Document Information

- Created: 2026-04-13
- Verified on: April 15, 2026
- Document type: tutorial
- Test environment: Cargo project, `src/main.rs`, and examples built around `Result` and iterators
- Test version: not fixed
- Source grade: only official documentation is used.
- Note: this post is a beginner-oriented summary, so it does not try to cover every iterator adaptor or advanced error-design pattern.


## Create a Practice Project

Create a new Cargo project like this and run the examples in `src/main.rs`. The Rust Book beginner examples assume a `cargo new` workflow. [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)

```powershell
cargo new rust-generics-errors-closures
cd rust-generics-errors-closures
code .
```

After pasting an example into `src/main.rs`, run it with:

```powershell
cargo run
```

## Generics: Generalizing Over Types

Generics let you reuse the same logic across multiple types. For example, a function that finds the largest value can work for an array of `i32` values and also for an array of `char` values. The Rust Book introduces generic type parameters as the basic way to remove repetition and generalize code over types. [Generic Data Types](https://doc.rust-lang.org/book/ch10-01-syntax.html)

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

fn main() {
    let numbers = [10, 40, 20, 30];
    let chars = ['a', 'z', 'm'];

    println!("largest number = {}", largest(&numbers));
    println!("largest char = {}", largest(&chars));
}
```

The output looks like this.

```text
largest number = 40
largest char = z
```

Here, `T` is a placeholder for a type that will be decided later. Rust still does not accept just any type here. The function requires `PartialOrd` so values can be compared with `>`, and `Copy` so the chosen value can be returned by value.

Generics are also common in structs.

```rust
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let int_point = Point { x: 10, y: 20 };
    let float_point = Point { x: 1.5, y: 2.5 };

    println!("int_point = ({}, {})", int_point.x, int_point.y);
    println!("float_point = ({}, {})", float_point.x, float_point.y);
}
```

The output looks like this.

```text
int_point = (10, 20)
float_point = (1.5, 2.5)
```

`Point<T>` represents a coordinate whose `x` and `y` share the same type `T`. This is a typical way to reduce duplication while keeping strong type safety.

## Error Handling: Result and the ? Operator

Rust does not hide the possibility of failure. Recoverable errors are usually represented with `Result<T, E>`, where success is `Ok` and failure is `Err`. The Rust Book explains recoverable errors primarily through `Result<T, E>` and the `?` operator. [Recoverable Errors with Result](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html)

```rust
fn safe_divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Cannot divide by zero."))
    } else {
        Ok(a / b)
    }
}

fn main() {
    match safe_divide(10.0, 2.0) {
        Ok(value) => println!("result = {}", value),
        Err(message) => println!("error = {}", message),
    }

    match safe_divide(10.0, 0.0) {
        Ok(value) => println!("result = {}", value),
        Err(message) => println!("error = {}", message),
    }
}
```

The output looks like this.

```text
result = 5
error = Cannot divide by zero.
```

With `match`, you handle both `Ok` and `Err` explicitly, which makes failure cases much harder to ignore by accident.

Rust also provides the `?` operator to make error propagation shorter and clearer.

```rust
fn add_parsed(a: &str, b: &str) -> Result<i32, std::num::ParseIntError> {
    let first = a.parse::<i32>()?;
    let second = b.parse::<i32>()?;

    Ok(first + second)
}

fn main() {
    match add_parsed("10", "20") {
        Ok(value) => println!("sum = {}", value),
        Err(error) => println!("error = {}", error),
    }
}
```

The output looks like this.

```text
sum = 30
```

If `?` sees an `Err`, it returns that error immediately to the outer function. If it sees an `Ok`, it unwraps the inner value. However, this only works when the outer function returns a compatible type such as `Result`. That makes multi-step fallible code much easier to read.

## Closures: Anonymous Functions

A closure is a function without a name that you can define inline and store in a variable. It is commonly used for short logic or when you want to capture values from the surrounding environment. The Rust Book describes closures as anonymous functions that can capture environment values. [Closures](https://doc.rust-lang.org/book/ch13-01-closures.html)

```rust
fn main() {
    let bonus = 5;
    let add_bonus = |score: i32| score + bonus;

    println!("result = {}", add_bonus(10));
}
```

The output looks like this.

```text
result = 15
```

In this example, the closure uses the outer variable `bonus` directly. Capturing surrounding values like this is one of the main differences between closures and ordinary functions.

Rust can also infer closure types quite well, so you often see shorter forms like this.

```rust
fn main() {
    let multiply = |a, b| a * b;
    println!("result = {}", multiply(3, 4));
}
```

The output looks like this.

```text
result = 12
```

At the beginner level, it is enough to think of a closure as a short function you create on the spot.

## Iterators: Flexible Collection Processing

An iterator is an abstraction for pulling values out one by one. In Rust, iterators appear not only with `for` loops but also with method chains such as `map`, `filter`, `sum`, and `collect`. An important detail is that adapters like `map` and `filter` are lazy: the work is actually performed only when the iterator is consumed by something like `sum`, `collect`, or a `for` loop. The Rust Book explains iterators as Rust's composable, lazy iteration interface. [Processing a Series of Items with Iterators](https://doc.rust-lang.org/book/ch13-02-iterators.html)

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    let total: i32 = numbers
        .iter()
        .copied()
        .filter(|n| n % 2 == 0)
        .map(|n| n * 2)
        .sum();

    println!("total = {}", total);
}
```

The output looks like this.

```text
total = 12
```

You can read this flow like this:

- `iter()` starts iterating over the elements
- `copied()` turns `&i32` values into `i32`
- `filter()` keeps only even numbers
- `map()` doubles those values
- `sum()` adds everything together

The big advantage of iterators is that the transformation steps stay visible, and you do not have to manually manage the loop state yourself.

## Combined Example

Here is one example that combines the main ideas from this post.

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

    let bonus = 3;
    let doubled_total: i32 = numbers.iter().map(|n| (n + bonus) * 2).sum();

    println!("numbers = {:?}", numbers);
    println!("doubled_total = {}", doubled_total);

    Ok(())
}
```

This single example contains:

- generics in `parse_values<T>`
- error handling through `Result` and `?`
- a closure in `map(|n| ...)`
- iterator processing with `iter()` and `sum()`

It is often easiest to run each topic separately first and then return to this combined example to see why these features so often appear together.

## Summary

This post covered `generics`, error handling, closures, and iterators in one flow. Generics let you reuse logic across types, `Result` and `?` let you handle failure safely, closures let you pass short pieces of logic around, and iterators make collection processing much clearer.

A practical next step is to move on to topics such as collections, deeper ownership patterns, modules, crates, or async Rust, where these abstraction tools start showing up even more naturally in real application code.

## Sources and references

- Rust Project Developers, [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- Rust Project Developers, [Generic Data Types](https://doc.rust-lang.org/book/ch10-01-syntax.html)
- Rust Project Developers, [Recoverable Errors with Result](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html)
- Rust Project Developers, [Closures](https://doc.rust-lang.org/book/ch13-01-closures.html)
- Rust Project Developers, [Processing a Series of Items with Iterators](https://doc.rust-lang.org/book/ch13-02-iterators.html)
