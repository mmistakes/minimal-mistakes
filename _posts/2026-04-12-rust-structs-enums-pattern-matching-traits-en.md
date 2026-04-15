---
layout: single
description: "Rust fundamentals guide to structs, enums, pattern matching, and traits with examples."
title: "Rust 05. Structs, Enums, Pattern Matching, and Traits"
lang: en
translation_key: rust-structs-enums-pattern-matching-traits
date: 2026-04-12 09:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, structs, enums, pattern-matching, traits]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/rust/structs-enums-pattern-matching-and-traits/
---

## Summary

After ownership, borrowing, and lifetimes, the next beginner question is how Rust models data, represents state, branches safely, and shares behavior across types. In Rust, those roles are mainly handled by `struct`, `enum`, `match`/`if let`, and `trait`.

This post connects those four ideas inside one Cargo-based workflow. In short, `struct` groups related data, `enum` represents one of several states, `match` and `if let` extract those states safely, and `trait` defines shared behavior across otherwise different types.

## Document Information

- Written on: 2026-04-12
- Verification date: 2026-04-16
- Document type: tutorial
- Test environment: Windows 11 Pro, Cargo project, Windows PowerShell example commands, `src/main.rs`
- Test version: rustc 1.94.0, cargo 1.94.0
- Source quality: only official documentation is used.
- Note: representative examples were rerun locally, and some shortened examples can produce unused-variant warnings.

## Problem Definition

At the beginner stage, the following four questions are easy to learn separately but harder to connect.

- how to group several related fields into one type
- how to represent exactly one state out of several possibilities
- how to branch on enum values without silently missing a case
- how to give shared behavior to types with different internal structures

This post focuses on connecting those questions inside one runnable Rust project. It does not cover advanced derive usage, the full space of trait bounds, trait objects, or advanced pattern guards.

## Verified Facts

- A `struct` is Rust's basic tool for grouping related data into a custom type.
  Evidence: [Defining and Instantiating Structs](https://doc.rust-lang.org/book/ch05-01-defining-structs.html)
- An `impl` block is the standard way to place methods close to the type they belong to.
  Evidence: [Method Syntax](https://doc.rust-lang.org/book/ch05-03-method-syntax.html)
- An `enum` represents exactly one variant out of several possibilities, and each variant can carry different data.
  Evidence: [Defining an Enum](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html)
- `match` requires exhaustive handling, while `if let` is the concise form for focusing on one pattern.
  Evidence: [match](https://doc.rust-lang.org/book/ch06-02-match.html), [Concise Control Flow with if let](https://doc.rust-lang.org/book/ch06-03-if-let.html)
- A `trait` defines a shared behavior contract that multiple types can implement.
  Evidence: [Traits: Defining Shared Behavior](https://doc.rust-lang.org/book/ch10-02-traits.html)
- The easiest beginner practice flow is built around a small `cargo new` project.
  Evidence: [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)

## Directly Confirmed Results

### 1. A small Cargo project was the simplest way to rerun the examples

- Direct result: creating a fresh Cargo project and replacing `src/main.rs` while rerunning `cargo run` gave the cleanest practice loop.

```powershell
cargo new rust-structs-enums-traits
cd rust-structs-enums-traits
code .
cargo run
```

### 2. `struct` and `impl` made the data-behavior relationship easy to read

- Direct result: the example below showed grouping fields in a struct and attaching methods with `impl` in one place.

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 20,
    };

    let rect2 = Rectangle {
        width: 10,
        height: 15,
    };

    println!("area = {}", rect1.area());
    println!("can_hold = {}", rect1.can_hold(&rect2));
}
```

- Observed result:

```text
area = 600
can_hold = true
```

### 3. `enum`, `match`, and `if let` worked well as one branching flow

- Direct result: the example below showed enum-based branching and the compact one-pattern style of `if let` together.

```rust
enum Ticket {
    Normal,
    Vip(u32),
    Staff(String),
}

fn main() {
    let ticket = Ticket::Vip(3);

    match ticket {
        Ticket::Normal => println!("normal ticket"),
        Ticket::Vip(level) => println!("vip level = {}", level),
        Ticket::Staff(name) => println!("staff = {}", name),
    }

    let config_max = Some(5u8);

    if let Some(max) = config_max {
        println!("max = {}", max);
    }
}
```

- Observed result:

```text
vip level = 3
max = 5
```

### 4. A combined example made the division of roles much clearer

- Direct result: when `struct`, `enum`, `match`, and `trait` were placed in one file, the connection between type design and shared behavior became much easier to see.

```rust
trait Summary {
    fn summarize(&self) -> String;
}

#[derive(Clone, Copy)]
enum PostState {
    Draft,
    Published,
    Archived,
}

struct Article {
    title: String,
    state: PostState,
}

impl Article {
    fn new(title: &str, state: PostState) -> Self {
        Self {
            title: String::from(title),
            state,
        }
    }

    fn status_label(&self) -> &'static str {
        match self.state {
            PostState::Draft => "draft",
            PostState::Published => "published",
            PostState::Archived => "archived",
        }
    }
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{} [{}]", self.title, self.status_label())
    }
}

fn main() {
    let post = Article::new("Rust Structs and Traits", PostState::Published);
    println!("summary = {}", post.summarize());
}
```

- Observed result:

```text
summary = Rust Structs and Traits [published]
```

- Direct result: if not every enum variant is constructed in the example, Rust can emit `dead_code`-style warnings. In this case that was caused by the shortened teaching example, not by an invalid concept.

## Interpretation / Opinion

- Interpretation: `struct`, `enum`, `match`, and `trait` are easier to understand as tools that share the larger job of data modeling and behavior design, not as isolated pieces of syntax.
- Opinion: for beginners, `trait` is easier to learn first as "a shared contract across types" than as an abstract language feature.
- Opinion: `if let` is best introduced as a readability shortcut for one pattern, not as a replacement for exhaustive `match`.

## Limits and Exceptions

- This post only covers single-file beginner examples. Trait objects, deeper trait bounds, derive-heavy patterns, and pattern guards are outside the scope.
- Depending on the snippet, warnings such as unused variants can appear, and exact warning text can vary across Rust versions.
- `Option<T>` and `Result<T, E>` are important enum examples, but this post only mentions that connection briefly.
- This post does not cover environment-specific differences on macOS, Linux, or WSL.

## References

- [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- [Defining and Instantiating Structs](https://doc.rust-lang.org/book/ch05-01-defining-structs.html)
- [Method Syntax](https://doc.rust-lang.org/book/ch05-03-method-syntax.html)
- [Defining an Enum](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html)
- [match](https://doc.rust-lang.org/book/ch06-02-match.html)
- [Concise Control Flow with if let](https://doc.rust-lang.org/book/ch06-03-if-let.html)
- [Traits: Defining Shared Behavior](https://doc.rust-lang.org/book/ch10-02-traits.html)
