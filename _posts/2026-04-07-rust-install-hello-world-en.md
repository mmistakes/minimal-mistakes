---
layout: single
description: "Beginner-friendly guide to installing Rust on Windows with VS Code and running Hello World."
title: "Rust 01. Install Rust and Run Hello World"
lang: en
translation_key: rust-install-hello-world
date: 2026-04-07 09:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, rustup, cargo, rustc, vscode, windows]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/rust/install-rust-and-run-hello-world/
---

## Summary

When you first start with Rust, the least confusing path is usually to install everything through the official tool, `rustup`, instead of trying to think in terms of the compiler alone. This post walks through the shortest beginner path on Windows with VS Code: install Rust, verify the toolchain, run `Hello, world!` with `rustc`, and then run the same idea through `cargo`.

The practical takeaway is simple: use `rustup` to install Rust, `rustc` for a quick single-file check, and `cargo` for real project work.

## Document Information

- Written on: 2026-04-07
- Verification date: 2026-04-15
- Document type: tutorial
- Test environment: Windows PowerShell, VS Code, `rustup`, `rustc`, `cargo`
- Test version: rustc 1.94.0, cargo 1.94.0
- Source quality: only official documentation is used.
- Note: installer screens and installer UI can change over time. This post only covers the simplest local Windows path.

## Problem Definition

At the beginning, Rust installation usually feels ambiguous in three places.

- It is not obvious whether "install Rust" means installing `rustc` directly or installing `rustup`.
- It is easy to confuse the roles of `rustc` and `cargo`.
- After installation, many beginners are not sure what they should run to confirm that the setup actually worked.

This post only covers the minimum path needed to reduce that confusion: install, verify, and run `Hello, world!`. It does not cover advanced installer flags, WSL, macOS/Linux, or toolchain override topics.

How to read this post: treat `rustup` as the entry point for installing and updating the toolchain, `rustc` as the compiler you can call directly, and `cargo` as the project workflow tool. At this stage, you do not need to memorize every option. The important part is knowing which tool to reach for in each situation.

## Verified Facts

- The official Rust install page and the `rustup` site guide users through the `rustup` installation path.
  Evidence: [Install Rust](https://www.rust-lang.org/tools/install), [rustup.rs](https://rustup.rs/)
  Meaning: "Installing Rust" here does not mean downloading only the `rustc` executable. It means setting up the standard path for managing the Rust toolchain.
- The Rust Book installation chapter describes verifying the installation with `rustc --version`.
  Evidence: [Installation](https://doc.rust-lang.org/book/ch01-01-installation.html)
  Meaning: if this command prints a version, the terminal can find the Rust compiler and the basic PATH/toolchain connection is working.
- The Rust Book separates the single-file `rustc` flow from the project-oriented `cargo new`, `cargo build`, and `cargo run` flow.
  Evidence: [Hello, World!](https://doc.rust-lang.org/book/ch01-02-hello-world.html), [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
  Meaning: `rustc` and `cargo` are not competing tools. `rustc` is the compiler, while `cargo` wraps project creation, builds, runs, and dependency management.
- The official VS Code Rust guide recommends `rust-analyzer` as the editor extension.
  Evidence: [Rust in Visual Studio Code](https://code.visualstudio.com/docs/languages/rust)
  Meaning: `rust-analyzer` does not install Rust. It helps the editor understand Rust code.

## Directly Confirmed Results

### 1. Installation path and version check

- Direct result: after running the Windows `rustup-init.exe` installer with the standard option, the installation could be verified in a new PowerShell window with the commands below.

```powershell
rustc --version
cargo --version
```

- Observed result:

```text
rustc 1.94.0 (4a4ef493e 2026-03-02)
cargo 1.94.0 (85eff7c80 2026-01-15)
```

- How to read this: if both commands print versions, the installation and terminal setup are good enough for the rest of this beginner flow. The exact versions become the reference point for interpreting later outputs.

- The reproducible path is:

1. Open [Rust install page](https://www.rust-lang.org/tools/install) or [rustup.rs](https://rustup.rs/).
2. Download and run `rustup-init.exe` for Windows.
3. Choose `1) Proceed with standard installation`.
4. Open a new PowerShell window and run the version-check commands above.

### 2. Smallest Hello World setup in VS Code

- Direct result: opening a folder in VS Code and saving the code below as `hello.rs` was enough to start a single-file Rust check.

```rust
fn main() {
    println!("Hello, world!");
}
```

- Direct result: if you plan to keep using VS Code, installing `rust-analyzer` makes the editing experience noticeably better.

### 3. Building a single file with `rustc`

- Direct result: running the commands below in the folder containing `hello.rs` created `hello.exe` in the same directory.

```powershell
rustc hello.rs
.\hello.exe
```

- Observed result:

```text
Hello, world!
```

- How to read this: `rustc hello.rs` is the shortest path from one source file to an executable. It is useful for a quick one-file syntax check, but it does not give you a project structure or dependency management.

### 4. Creating and running a project with `cargo`

- Direct result: the project-oriented flow was much easier to continue with. The commands below created and ran a new Rust project.

```powershell
cargo new hello-rust
cd hello-rust
cargo run
```

- The generated `src/main.rs` starts like this.

```rust
fn main() {
    println!("Hello, world!");
}
```

- Observed result:

```text
Hello, world!
```

- How to read this: `cargo run` builds if needed and then runs the project. For beginners, it is the default command for repeatedly running a growing Rust project.

- Direct result: when using `cargo build`, the executable was created under `target\debug\hello-rust.exe`.

## Interpretation / Opinion

- Key decision at this stage: for beginners, the cleanest mental model is "Rust installation means installing the toolchain through `rustup`."
- Decision rule: use `rustc` for a one-file syntax check, and use `cargo` for code you expect to keep changing or growing.
- Recommended flow: the most natural beginner sequence is "verify installation -> run one `rustc` example -> move into a `cargo new` project."

## Limits and Exceptions

- This post is written for Windows PowerShell and VS Code. It does not cover macOS, Linux, WSL, or remote-container setups.
- The exact `rustup-init.exe` screens and defaults can change over time.
- The scope is limited to installation and the first successful run. Toolchain overrides, nightly, cross-compilation, and C++ toolchain edge cases are intentionally left out.
- VS Code is optional. Rust installation and `rustc`/`cargo` usage do not require a specific editor.
- Remaining questions after this post include switching between toolchains, deciding when nightly is appropriate, and handling platform-specific native build tool issues. Those belong in an installation deep dive.

## References

- [Install Rust](https://www.rust-lang.org/tools/install)
- [rustup.rs](https://rustup.rs/)
- [The rustup book](https://rust-lang.github.io/rustup/)
- [Installation](https://doc.rust-lang.org/book/ch01-01-installation.html)
- [Hello, World!](https://doc.rust-lang.org/book/ch01-02-hello-world.html)
- [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- [Rust in Visual Studio Code](https://code.visualstudio.com/docs/languages/rust)
