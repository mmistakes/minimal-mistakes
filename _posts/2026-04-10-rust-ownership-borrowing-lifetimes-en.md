---
layout: single
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

When learning Rust, the terms you hear over and over are `ownership`, `borrowing`, and `lifetime`. These ideas are the core reason Rust can provide memory safety without relying on a garbage collector. They may feel unusual at first, but the overall flow becomes much easier once you understand `move`, references, and scope.

This post explains how ownership moves, why borrowing is needed, and when lifetime annotations appear, all centered around small `String` examples you can run right away.

## Verification scope and reproducibility

- As of: April 15, 2026, checked chapter 4 of the Rust Book together with the lifetime syntax section in chapter 10.
- Source grade: only official documentation is used.
- Reproduction environment: Cargo project, `String` and reference examples, and `src/main.rs`.
- Note: lifetime annotation examples are shown for explanation; in real code, the compiler often infers more than beginners expect.


## Create a Practice Project

Create a new Cargo project like this and run each example in `src/main.rs`. The Rust Book beginner workflow starts from a `cargo new` project. [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)

```powershell
cargo new rust-ownership-basics
cd rust-ownership-basics
code .
```

After pasting in an example, run it with:

```powershell
cargo run
```

## Why Ownership Matters

Rust does not allow values to be copied and freed casually from anywhere in the program. Instead, it checks at compile time who is responsible for each value. That idea is ownership. The Rust Book presents ownership as the core model for tracking value responsibility and memory safety. [What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)

The three core ownership rules are:

- Each value has one owner.
- Only one owner exists at a time.
- When the owner goes out of scope, the value is dropped.

Because of these rules, Rust can prevent problems such as double free, use-after-free, and data races before the program even runs.

## Scope and Drop

The first thing to understand is what happens when a value leaves its scope. The Rust Book explains that values are cleaned up when they leave scope. [What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)

```rust
fn main() {
    {
        let message = String::from("hello");
        println!("{}", message);
    }

    // message is no longer valid here.
}
```

`message` is valid only inside the block. Once the block ends, the owner disappears, and Rust cleans up the memory that the `String` was using. If you come from C++, this can feel similar to RAII, but Rust enforces the rules much more explicitly through ownership and the borrow checker.

## Move: Ownership Transfer

With a type such as `String`, assignment is treated as a move rather than a simple copy. The Rust Book explains that assigning a `String` is a move, not a deep copy. [What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("{}", s2);
}
```

In this code, ownership of `s1` moves to `s2`. That means `s2` is valid, but `s1` is no longer usable.

If you try to use `s1` again, you get a compile error.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("{}", s1);
    println!("{}", s2);
}
```

The compiler output looks like this.

<img src="{{ '/images/rust_04/move 소유권 이동 오류 결과.png' | relative_url }}" alt="Move ownership transfer error output">

Why does Rust do this? A `String` stores its character data on the heap. If Rust allowed both `s1` and `s2` to behave like owners of the same heap allocation, both of them could try to free the same memory when leaving scope. Rust prevents that by invalidating the old binding at the point of the move.

## Clone vs Copy

If you really want a separate copy of the data, use `clone()`. The Rust Book distinguishes `clone`, stack-only `Copy`, and move semantics in the ownership chapter. [What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();

    println!("s1 = {}", s1);
    println!("s2 = {}", s2);
}
```

The output looks like this.

<img src="{{ '/images/rust_04/clone과 copy의 차이 결과 1.png' | relative_url }}" alt="Clone example output">

In this case, `s1` and `s2` each own their own heap data.

By contrast, `Copy` does not simply mean "small and on the stack." In Rust, a type can implement `Copy` when all of its components are `Copy` and it does not require cleanup through `Drop`. For such types, assignment duplicates the value instead of moving ownership.

```rust
fn main() {
    let x = 10;
    let y = x;

    println!("x = {}", x);
    println!("y = {}", y);
}
```

The output looks like this.

<img src="{{ '/images/rust_04/clone과 copy의 차이 결과 2.png' | relative_url }}" alt="Copy example output">

Types such as `i32`, `bool`, `char`, some fixed-size tuples, and shared references like `&T` copy naturally. Types that own resources or require cleanup, such as `String` and `Vec<T>`, are not `Copy` by default.

## Borrowing: Using a Value Without Taking Ownership

If every function call moved ownership, Rust would become awkward very quickly. To avoid that, Rust lets you borrow a value through a reference. The Rust Book explains borrowing through references and function arguments in a dedicated section. [References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)

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

The output looks like this.

<img src="{{ '/images/rust_04/Borrowing 결과.png' | relative_url }}" alt="Borrowing example output">

Here, `print_length` receives a `&str` reference. Ownership of `message` stays in `main`, and the function only borrows it briefly to read the length. That is why `message` is still available after the function call.

Early on, `&String` and `&str` can feel confusing. In practice, when a function only needs read-only string data, `&str` is usually the more flexible choice.

## Immutable Borrow and Mutable Borrow

References are mainly divided into immutable borrow and mutable borrow. The Rust Book documents the rules for immutable and mutable references with examples. [References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)

You can have multiple immutable borrows at the same time.

```rust
fn main() {
    let message = String::from("rust");

    let r1 = &message;
    let r2 = &message;

    println!("{}, {}", r1, r2);
}
```

The output looks like this.

<img src="{{ '/images/rust_04/immutable borrow와 mutable borrow 결과 1.png' | relative_url }}" alt="Immutable borrow example output">

That is safe because both references only read the same value.

If you want to modify the value, you need a mutable borrow.

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

The output looks like this.

<img src="{{ '/images/rust_04/immutable borrow와 mutable borrow 결과 2.png' | relative_url }}" alt="Mutable borrow example output">

The key rule is that only one mutable borrow is allowed at a time. Also, you cannot create a mutable borrow while immutable borrows are still alive.

The following code produces an error.

```rust
fn main() {
    let mut text = String::from("hello");

    let r1 = &text;
    let r2 = &mut text;

    println!("{}, {}", r1, r2);
}
```

The compiler error looks like this.

<img src="{{ '/images/rust_04/immutable borrow와 mutable borrow 오류 결과.png' | relative_url }}" alt="Immutable and mutable borrow conflict error output">

Rust rejects this because one reference wants to read while the other wants to modify the same value at the same time.

If needed, you can separate the usage periods of the references.

```rust
fn main() {
    let mut text = String::from("hello");

    {
        let r1 = &text;
        println!("{}", r1);
    }

    let r2 = &mut text;
    r2.push_str(" rust");

    println!("{}", r2);
}
```

The output looks like this.

<img src="{{ '/images/rust_04/immutable borrow와 mutable borrow 결과 3.png' | relative_url }}" alt="Separated borrow example output">

Once the immutable borrow is finished, creating the mutable borrow becomes fine.

## Dangling References and Why Lifetimes Matter

Borrowing rules also prevent dangling references. A dangling reference is a reference that points to data that has already been dropped. The Rust Book shows how borrowing rules prevent dangling references, and the lifetime chapter explains how reference relationships are expressed. [References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html), [Validating References with Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)

The following code is not allowed.

```rust
fn dangle() -> &String {
    let text = String::from("hello");
    &text
}
```

`text` is dropped when the function ends, so returning a reference to it would create a reference to invalid memory. Rust blocks that at compile time.

In this case, the fix is to return ownership instead of a reference.

```rust
fn no_dangle() -> String {
    let text = String::from("hello");
    text
}
```

## A Classic Lifetime Annotation Example

For many references, the compiler can infer lifetimes automatically. But when a function accepts multiple references and returns one of them, you sometimes need to describe the relationship explicitly with a lifetime annotation. The Rust Book uses the “return one of two references” pattern as the classic motivation for explicit lifetime annotations. [Validating References with Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)

The classic example is `longest`.

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() >= y.len() {
        x
    } else {
        y
    }
}
```

Here, `'a` is not a real runtime value. It is a way to connect the valid ranges of the references. This function does not mean the returned reference always lives as long as whichever input lasts longer. It means the returned reference is valid only within the range that both input references share. In practice, it is safest to think of the result as being limited by the shorter of the two input lifetimes.

Here is a valid usage example.

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

The output looks like this.

<img src="{{ '/images/rust_04/lifetime Annotation 예제.png' | relative_url }}" alt="Lifetime annotation example output">

This is safe because both `first` and `second` live long enough inside `main`.

## Lifetimes in Structs That Store References

If a struct stores a reference in one of its fields, it also needs a lifetime parameter. The Rust Book explains that structs containing references need lifetime parameters. [Validating References with Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)

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

The output looks like this.

<img src="{{ '/images/rust_04/struct에 참조를 저장할 때의 Lifetime 결과.png' | relative_url }}" alt="Struct reference lifetime output">

`Highlight<'a>` means the `part` reference inside the struct must remain valid for at least `'a`. In other words, the struct is not allowed to outlive the original string it refers to.

## Combined Example

Here is a single example that combines the key ideas from this post.

```rust
fn print_length(text: &str) {
    println!("length = {}", text.len());
}

fn add_suffix(text: &mut String) {
    text.push_str(" ownership");
}

fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() >= y.len() {
        x
    } else {
        y
    }
}

struct Highlight<'a> {
    part: &'a str,
}

fn main() {
    let mut title = String::from("Rust");
    print_length(&title);

    add_suffix(&mut title);
    println!("title = {}", title);

    let first = String::from("Ownership");
    let second = String::from("Borrowing");
    let longer = longest(first.as_str(), second.as_str());

    println!("longer = {}", longer);

    let article = String::from("Rust ownership makes memory safety practical.");
    let first_word = article.split_whitespace().next().unwrap();
    let highlight = Highlight { part: first_word };

    println!("highlight = {}", highlight.part);
}
```

This example includes immutable borrowing, mutable borrowing, lifetime annotations, and a struct that stores a reference. It is often easiest to run each small example first and then come back to this combined version at the end.

## Summary

This post covered ownership, borrowing, and lifetimes as one connected flow. The key idea is that values such as `String` move by default, references let you use a value without taking ownership, and lifetime annotations describe how borrowed references are related when the compiler needs help.

The borrow checker can feel strict at first, but once you get used to it, you start seeing the benefit of catching memory safety problems during compilation rather than at runtime. A practical next step is to continue with `struct`, `enum`, `Result`, and `Option`, where these ownership rules become even more meaningful in real Rust code.

## Sources and references

- Rust Project Developers, [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- Rust Project Developers, [What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)
- Rust Project Developers, [References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)
- Rust Project Developers, [Validating References with Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)
