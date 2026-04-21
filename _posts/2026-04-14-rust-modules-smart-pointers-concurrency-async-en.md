---
layout: single
description: "Rust fundamentals guide to modules, smart pointers, concurrency, and async with examples."
title: "Rust 07. Modules, Smart Pointers, Concurrency, and Async"
lang: en
translation_key: rust-modules-smart-pointers-concurrency-async
date: 2026-04-14 11:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, modules, smart-pointers, concurrency, async]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/rust/modules-smart-pointers-concurrency-and-async/
---

## Summary

Once you move past individual Rust syntax rules, the bigger questions become how to organize code, how to share values safely, and how to handle more than one task at a time. That is where `module`, smart pointers, concurrency, and async start to matter.

This post connects those four topics at a beginner-friendly level. In short, modules structure code, smart pointers refine ownership and access patterns, concurrency covers threads and shared-state coordination, and async focuses on efficiently scheduling wait-heavy work.

## Document Information

- Written on: 2026-04-14
- Verification date: 2026-04-16
- Document type: tutorial
- Test environment: Windows 11 Pro, Cargo project, Windows PowerShell example commands, `src/main.rs`
- Test version: rustc 1.94.0, cargo 1.94.0
- Source quality: only official documentation is used.
- Note: the `module`, `Box`, `Rc`, `RefCell`, channel, and `Arc<Mutex<_>>` examples were rerun locally. Async examples that require a Tokio-style runtime were not rerun in this verification pass; instead, the post now states their execution requirements and source basis explicitly.

## Problem Definition

At this stage of learning Rust, the following questions are easier to understand when treated as one connected set.

- how to split a growing codebase into files and modules
- how to model ownership when plain references are not enough
- how to coordinate threads through communication or shared state
- how to distinguish thread-based concurrency from runtime-based async execution

This post answers those questions at the beginner level. It does not cover production async runtime setup, custom executors, lock-free structures, or actor-style architectures.

How to read this post: these four topics do not live at the same layer. Modules are about code layout, smart pointers are about ownership models, and concurrency plus async are about execution models. In each example, ask what is being organized, what is being shared, and what is actually running concurrently or being scheduled.

On a first read, use this priority split to keep the scope manageable.

| Topic | Focus on this in the post | Safe to skip for now |
| --- | --- | --- |
| module | how files and visibility boundaries are split | workspace, features, publishing |
| smart pointer | why `Box`, `Rc`, and `RefCell` exist | unsafe pointers, custom smart pointers |
| concurrency | the difference between channels and `Arc<Mutex<_>>` | lock-free structures, actor models |
| async | the fact that async needs a runtime | custom executors, async streams |

This table is a reading order, not a memorization list. The first goal is to understand what problem each tool reduces before trying to learn every detail.

## Verified Facts

- Modules use `mod`, `pub`, and paths to structure code and control visibility.
  Evidence: [Managing Growing Projects with Packages, Crates, and Modules](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)
  Meaning: a module is not only a way to split files. It also defines what names are visible outside a boundary.
- `Box<T>`, `Rc<T>`, and `RefCell<T>` are representative smart-pointer tools for heap allocation, single-thread shared ownership, and interior mutability.
  Evidence: [Smart Pointers](https://doc.rust-lang.org/book/ch15-00-smart-pointers.html), [Using Box<T> to Point to Data on the Heap](https://doc.rust-lang.org/book/ch15-01-box.html), [Rc<T>, the Reference Counted Smart Pointer](https://doc.rust-lang.org/book/ch15-04-rc.html), [RefCell<T> and the Interior Mutability Pattern](https://doc.rust-lang.org/book/ch15-05-interior-mutability.html)
  Meaning: read smart pointers as tools that refine ownership and borrowing rules, not as hard syntax only because they contain the word pointer.
- Rust supports threads, message passing, and shared-state concurrency at the standard-library level, while using the type system to reduce unsafe sharing patterns.
  Evidence: [Fearless Concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html)
  Meaning: the concurrency examples are not only about thread APIs. They also show how types enforce safer sharing conditions.
- Async and await are built around futures and runtimes, and they are especially useful for wait-heavy workloads such as I/O.
  Evidence: [Asynchronous Programming in Rust](https://rust-lang.github.io/async-book/)
  Meaning: an async function does not run by magic on its own. It creates future-based work that needs a runtime to be executed.
- The simplest beginner practice flow still starts from a `cargo new` project.
  Evidence: [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
  Meaning: a Cargo project makes it clear which examples use only the standard library and which need runtime dependencies.

## Directly Confirmed Results

### 1. A fresh Cargo project made the standard-library examples easy to rerun

- Direct result: creating a small Cargo project and replacing `src/main.rs` while rerunning `cargo run` was the simplest practice loop.

```powershell
cargo new rust-modules-concurrency
cd rust-modules-concurrency
code .
cargo run
```

### 2. Modules and smart pointers exposed different ownership models clearly

- Direct result: the example below showed module access, `Box<T>`, `Rc<T>`, and `RefCell<T>` in one place.

```rust
use std::cell::RefCell;
use std::rc::Rc;

mod greeting {
    pub fn say_hello() {
        println!("hello from module");
    }
}

fn main() {
    greeting::say_hello();

    let number = Box::new(100);
    println!("boxed = {}", number);

    let name = Rc::new(String::from("rust"));
    let a = Rc::clone(&name);
    let b = Rc::clone(&name);
    println!("rc count = {}", Rc::strong_count(&name));
    println!("a = {}, b = {}", a, b);

    let value = RefCell::new(10);
    *value.borrow_mut() += 5;
    println!("refcell = {}", value.borrow());
}
```

- Observed result:

```text
hello from module
boxed = 100
rc count = 3
a = rust, b = rust
refcell = 15
```

- How to read this: `mod greeting` creates a namespace, `Box` stores a value on the heap, `Rc` shares ownership within one thread, and `RefCell` moves borrow checks to runtime. The output shows several ownership models in one program.

### 3. Concurrency examples showed communication and shared state as different patterns

- Direct result: the example below reproduced both message passing through a channel and shared-state updates through `Arc<Mutex<_>>`.

```rust
use std::sync::{mpsc, Arc, Mutex};
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        tx.send(String::from("hello from thread")).unwrap();
    });

    println!("received = {}", rx.recv().unwrap());

    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..3 {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut number = counter.lock().unwrap();
            *number += 1;
        }));
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("counter = {}", *counter.lock().unwrap());
}
```

- Observed result:

```text
received = hello from thread
counter = 3
```

- How to read this: the channel example sends a value between threads, while `Arc<Mutex<_>>` lets several threads update shared state under a lock. Both are concurrency patterns, but they solve sharing in different ways.

### 4. Async was more accurate to document through requirements than through an unverified example

- Direct result: in this verification pass, only standard-library examples were rerun locally.
- Confirmed requirement: the `#[tokio::main]` examples in the post require a Cargo dependency like the following before they can run.

```toml
[dependencies]
tokio = { version = "1", features = ["macros", "rt-multi-thread", "time"] }
```

- Interpretation from verification: for this post, it was more accurate to separate "directly rerun code" from "runtime-dependent async setup" than to present both as if they had been verified in the same way.

- How to read this: the async example is not shown as directly rerun because Rust async execution needs a runtime. The post therefore separates directly observed std examples from runtime-dependent setup requirements.

## Interpretation / Opinion

- Key decision at this stage: modules, smart pointers, concurrency, and async are easier to learn as tools for different layers of program design, not as disconnected syntax topics.
- Decision rule: start with `Rc` for single-thread sharing, `RefCell` for runtime borrow checking, `Arc<Mutex<_>>` for multi-thread shared state, and async for wait-heavy I/O-style workflows.
- Interpretation: async should be introduced as a separate execution model for waiting-heavy work, not as a simple replacement for threads.

## Limits and Exceptions

- This post stays at the beginner-example level. Custom executors, async streams, actor models, and lock-free concurrency are outside the scope.
- Thread output order and timing are not deterministic and can vary across runs.
- `RefCell<T>` is flexible, but because it checks some borrow rules at runtime, misuse can lead to a panic.
- Async examples were not rerun locally in this pass because they depend on an added runtime such as Tokio.
- Remaining questions after this post include runtime choice, async borrowing, lock-free structures, and actor models. Those are execution-model design topics beyond the beginner scope.

## References

- [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- [Managing Growing Projects with Packages, Crates, and Modules](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)
- [Smart Pointers](https://doc.rust-lang.org/book/ch15-00-smart-pointers.html)
- [Using Box<T> to Point to Data on the Heap](https://doc.rust-lang.org/book/ch15-01-box.html)
- [Rc<T>, the Reference Counted Smart Pointer](https://doc.rust-lang.org/book/ch15-04-rc.html)
- [RefCell<T> and the Interior Mutability Pattern](https://doc.rust-lang.org/book/ch15-05-interior-mutability.html)
- [Fearless Concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html)
- [Asynchronous Programming in Rust](https://rust-lang.github.io/async-book/)
