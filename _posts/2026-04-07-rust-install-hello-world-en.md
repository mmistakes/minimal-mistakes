---
layout: single
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

When you first start with Rust, it is usually much easier to install everything through the official installer, `rustup`, instead of installing the compiler by itself. This post walks through the most basic setup flow on Windows with VS Code, ending with a simple `Hello, world!` program.

## Verification scope and reproducibility

- As of: April 15, 2026, checked the official Rust install page, `rustup` documentation, the Rust Book, and VS Code Rust docs.
- Source grade: only official documentation is used.
- Reproduction environment: Windows PowerShell, VS Code, `rustup`, `rustc`, and `cargo`.
- Note: version numbers and installer screens change over time, so confirm them on your own machine at install time.


## Where to Find the Official Installer

You can find the official Rust install page and the `rustup` site here: The Rust project directs installation through the official install page and `rustup`, and the rustup book documents toolchain management. [Rust install page](https://www.rust-lang.org/tools/install), [rustup site](https://rustup.rs/), [rustup book](https://rust-lang.github.io/rustup/)

- Rust install page: <https://www.rust-lang.org/tools/install>
- rustup site: <https://rustup.rs/>

In practice, "installing Rust" usually means installing `rustup`. Once `rustup` is installed, you also get `rustc`, `cargo`, the standard library, and toolchain management.

## How to Install Rust on Windows

The basic installation flow on Windows is: The Rust Book installation chapter and rustup docs describe the standard installation flow and post-install version checks. [Installation](https://doc.rust-lang.org/book/ch01-01-installation.html), [rustup book](https://rust-lang.github.io/rustup/)

1. Open the official site above.
2. Download `rustup-init.exe` for Windows.
3. Run the installer.
4. When the menu appears, choose `1) Proceed with standard installation`.
5. Open a new PowerShell or Command Prompt window after installation finishes.
6. Check that the install worked with the commands below.

```powershell
rustc --version
cargo --version
```

If the installation completed successfully, you should see version information like this. The exact version numbers will vary depending on when you install.

![Check rustc version]({{ '/images/rust_01/rustc.png' | relative_url }})

![Check cargo version]({{ '/images/rust_01/cargo.png' | relative_url }})

## Print Hello World in VS Code

If you plan to work with Rust in VS Code, it is a good idea to install the `rust-analyzer` extension as well. It makes autocomplete, diagnostics, and editor feedback much more convenient. The VS Code Rust guide recommends `rust-analyzer` as the standard editing extension. [Rust in Visual Studio Code](https://code.visualstudio.com/docs/languages/rust)

Create a new folder, open it in VS Code, then make a `hello.rs` file with the following code:

```rust
fn main() {
    println!("Hello, world!");
}
```

This is the most basic starting point in Rust. The `main` function is the entry point of the program, and `println!` prints a string to the console.

## Build with rustc

If you want to test a single file quickly, you can compile it directly with `rustc`. The Rust Book `Hello, world!` chapter shows compiling a single file with `rustc` and running the generated executable. [Hello, World!](https://doc.rust-lang.org/book/ch01-02-hello-world.html)

First, save the code below as `hello.rs`.

```rust
fn main() {
    println!("Hello, world!");
}
```

Then move to that folder in PowerShell and build it like this:

```powershell
rustc hello.rs
```

After the build finishes, a `hello.exe` file will be created in the same folder. Run it with:

```powershell
.\hello.exe
```

If everything worked, the output will be:

```text
Hello, world!
```

## Build with cargo

For real projects, you will usually create and manage everything with `cargo`. It handles project generation, builds, execution, and dependency management. The Rust Book explains the normal project workflow through `cargo new`, `cargo build`, and `cargo run`. [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)

Start by creating a new project:

```powershell
cargo new hello-rust
cd hello-rust
```

This creates a `src/main.rs` file. Put the following code in that file:

```rust
fn main() {
    println!("Hello, world!");
}
```

Now build the project with:

```powershell
cargo build
```

When the build finishes, the executable will be created at `target\\debug\\hello-rust.exe`. You can run it directly with:

```powershell
.\target\debug\hello-rust.exe
```

Or, if you want to build and run in one step, use:

```powershell
cargo run
```

The result is the same:

```text
Hello, world!
```

## Wrap-up

The most common way to install Rust is through the official tool, `rustup`. For quick experiments, `rustc` can be enough, but real development is much smoother with a `cargo` project. A good first step is to get `Hello, world!` running and then become familiar with commands like `cargo run`, `cargo build`, and `cargo check`.

## Sources and references

- Rust Project Developers, [Install Rust](https://www.rust-lang.org/tools/install)
- rustup team, [rustup.rs](https://rustup.rs/)
- rustup team, [The rustup book](https://rust-lang.github.io/rustup/)
- Rust Project Developers, [Installation](https://doc.rust-lang.org/book/ch01-01-installation.html)
- Rust Project Developers, [Hello, World!](https://doc.rust-lang.org/book/ch01-02-hello-world.html)
- Rust Project Developers, [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- Microsoft, [Rust in Visual Studio Code](https://code.visualstudio.com/docs/languages/rust)
