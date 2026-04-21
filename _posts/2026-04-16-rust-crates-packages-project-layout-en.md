---
layout: single
title: "Rust 09. Crates, Packages, and Project Layout"
description: "Rust guide to crates, packages, main.rs, lib.rs, mod, use, and pub in a Cargo project."
date: 2026-04-16 09:00:00 +0900
lang: en
translation_key: rust-crates-packages-project-layout
section: development
topic_key: rust
categories: Rust
tags: [rust, cargo, crates, packages, modules, project-layout]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/rust/crates-packages-and-project-layout/
---

## Summary

Once you move past syntax basics in Rust, the next common point of confusion is project structure. If `Cargo.toml`, `src/main.rs`, `src/lib.rs`, `mod`, `use`, and `pub` are still blurred together, even a small project quickly becomes hard to organize.

This post focuses on the relationship between packages and crates, the difference between a binary crate and a library crate, and how `main.rs`, `lib.rs`, `mod`, `use`, and `pub` fit together. The practical beginner rule is simple: treat `main.rs` as the entry point, move reusable logic into `lib.rs`, and expose only the items that really need to be public.

## Document Information

- Written on: 2026-04-15
- Verification date: 2026-04-16
- Document type: tutorial
- Test environment: Windows 11 Pro, Windows PowerShell, Cargo CLI examples
- Test version: rustc 1.94.0, cargo 1.94.0
- Source grade: only official documentation is used.
- Note: this post stays focused on the basic structure of a single Cargo package and intentionally leaves out broader topics such as workspaces and features.

## Problem Definition

After learning basic `module` syntax, beginners often get stuck at the next step.

- It is not obvious whether `package` and `crate` mean the same thing.
- It is hard to tell when `src/main.rs` and `src/lib.rs` should exist together.
- Once code is split into multiple files, the roles of `mod`, `use`, and `pub` can feel vague.

This post stays intentionally narrow. It explains how to read and split one Cargo project, without going into wider topics like workspaces, publishing, features, or path dependencies.

How to read this post: separate the bundle Cargo manages from the code unit Rust compiles. At the beginner stage, it is possible to put everything in `main.rs`, but it is more useful to learn how the entry point and reusable logic can be separated.

## Verified Facts

- According to the official Rust Book, a Cargo package is the unit described by `Cargo.toml`, and a package can contain at most one library crate and any number of binary crates.
  Evidence: [Packages and Crates](https://doc.rust-lang.org/book/ch07-01-packages-and-crates.html)
  Meaning: a package is the project bundle Cargo manages, while a crate is a compilation unit.
- According to the official docs, a binary crate has a `main` function as its entry point, while a library crate exposes reusable functionality.
  Evidence: [Packages and Crates](https://doc.rust-lang.org/book/ch07-01-packages-and-crates.html)
  Meaning: execution belongs in the binary crate, and reusable or testable logic is usually better placed in the library crate.
- According to the official docs, `mod` defines modules, `use` brings a path into the current scope, and `pub` controls visibility.
  Evidence: [Defining Modules to Control Scope and Privacy](https://doc.rust-lang.org/book/ch07-02-defining-modules-to-control-scope-and-privacy.html), [Paths for Referring to an Item in the Module Tree](https://doc.rust-lang.org/book/ch07-03-paths-for-referring-to-an-item-in-the-module-tree.html), [Bringing Paths into Scope with the use Keyword](https://doc.rust-lang.org/book/ch07-04-bringing-paths-into-scope-with-the-use-keyword.html)
  Meaning: `mod`, `use`, and `pub` do not do the same job. `mod` connects a module, `use` shortens access to a path, and `pub` defines what crosses the API boundary.
- According to the official docs, modules can be moved into separate files and connected from the crate root.
  Evidence: [Separating Modules into Different Files](https://doc.rust-lang.org/book/ch07-05-separating-modules-into-different-files.html)
  Meaning: splitting a file is not enough by itself. The crate root still has to connect that module into the module tree.

A useful beginner mental model is this layout:

```text
rust-layout-demo/
  Cargo.toml
  src/
    main.rs
    lib.rs
    math.rs
```

It helps to read that structure in this order:

1. `Cargo.toml`: check the package name and dependencies.
2. `src/main.rs`: check where execution starts.
3. `src/lib.rs`: check which reusable modules the crate exposes.
4. `src/math.rs`: check where the actual feature logic lives.

For example, `lib.rs` can expose a module like this:

```rust
pub mod math;
```

Then `math.rs` can hold the reusable functions.

```rust
pub fn add(left: i32, right: i32) -> i32 {
    left + right
}

pub fn subtract(left: i32, right: i32) -> i32 {
    left - right
}
```

And `main.rs` can stay focused on wiring execution together.

```rust
use rust_layout_demo::math;

fn main() {
    let sum = math::add(10, 20);
    let diff = math::subtract(20, 5);

    println!("sum = {}", sum);
    println!("diff = {}", diff);
}
```

The important beginner takeaway is that execution starts in `main.rs`, but the real logic does not need to stay there. Once you move reusable code into `lib.rs` and its modules, later topics like testing, file I/O, CLI tools, and small projects become much easier to structure.

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

- How to read this: these are the tool versions used to run the structure example. The project layout rules are stable for this beginner use case, but warning text and command output can still vary by version.

- Directly confirmed result: when I ran the `main.rs` example in a temporary Cargo project with the same structure as the post, the output was:

```powershell
cargo run
```

- Observed output:

```text
sum = 30
diff = 15
```

- How to read this: `main.rs` only wires the run together, while the actual arithmetic functions come from the library crate module. This output confirms that `lib.rs`, `math.rs`, and `use rust_layout_demo::math` are connected correctly.

- Limitation of direct reproduction: I reproduced the representative example in a temporary Cargo project, but I did not add a separate example project to this repository.

## Interpretation / Opinion

- Key decision at this stage: the most important early distinction is this: a package is the Cargo-managed bundle, while a crate is the compilation unit.
- Decision rule: keep execution wiring in `main.rs`, and move reusable or testable logic into `lib.rs` and its modules.
- Interpretation: `pub` should be treated as an API boundary, not as a convenience switch. Keeping most items private by default tends to produce cleaner project structure.

## Limits and Exceptions

- This post explains a single-package project and does not cover Cargo workspaces.
- It does not go into finer visibility details such as `pub(crate)`, `super`, or deeper nested module layouts.
- You can build a Rust program without a library crate. Still, once the project grows, the `lib.rs` split often becomes easier to maintain.
- Package names with hyphens introduce additional crate-name details in code, but this post keeps the example intentionally simple.
- Remaining questions after this post include workspaces, feature flags, publishing, and path dependencies. Those belong in a project-operations layer rather than this beginner layout article.

## References

- [Managing Growing Projects with Packages, Crates, and Modules](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)
- [Packages and Crates](https://doc.rust-lang.org/book/ch07-01-packages-and-crates.html)
- [Defining Modules to Control Scope and Privacy](https://doc.rust-lang.org/book/ch07-02-defining-modules-to-control-scope-and-privacy.html)
- [Paths for Referring to an Item in the Module Tree](https://doc.rust-lang.org/book/ch07-03-paths-for-referring-to-an-item-in-the-module-tree.html)
- [Bringing Paths into Scope with the use Keyword](https://doc.rust-lang.org/book/ch07-04-bringing-paths-into-scope-with-the-use-keyword.html)
- [Separating Modules into Different Files](https://doc.rust-lang.org/book/ch07-05-separating-modules-into-different-files.html)
