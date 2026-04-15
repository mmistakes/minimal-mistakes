---
layout: single
description: "소유권, 대여, 수명 규칙을 예제로 설명하는 Rust 기초 가이드."
title: "Rust 04. Ownership, Borrowing, Lifetime 기초"
lang: ko
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
---

## 요약

Rust를 배우다 보면 변수나 함수 문법보다 더 자주 듣게 되는 단어가 `ownership`, `borrowing`, `lifetime`이다. 이 개념들은 Rust가 가비지 컬렉터 없이도 메모리 안전성을 지키는 핵심 규칙이다.

이 글은 `String` 예제를 중심으로 ownership이 어떻게 이동하는지, 왜 borrowing이 필요한지, 그리고 lifetime annotation이 어떤 상황에서 등장하는지를 한 번에 정리한다. 결론부터 말하면 "값의 책임은 owner가 갖고, 필요하면 참조로 빌려 쓰고, 참조 관계가 복잡해지면 lifetime으로 범위를 연결한다"로 이해하면 가장 자연스럽다.

## 문서 정보

- 작성일: 2026-04-10
- 검증 기준일: 2026-04-15
- 문서 성격: tutorial
- 테스트 환경: Cargo 프로젝트, `String`/reference 예제, `src/main.rs`
- 테스트 버전: rustc 1.94.0, cargo 1.94.0
- 출처 등급: 공식 문서만 사용했다.
- 비고: lifetime annotation 예제는 개념 설명용이다. 실제 코드에서는 컴파일러가 더 많이 추론해 주는 경우가 많다.

## 문제 정의

Rust 초급 단계에서 ownership 계열 개념은 아래 이유로 특히 어렵게 느껴진다.

- 같은 대입인데 어떤 값은 복사되고 어떤 값은 move되는지 직관과 다르다.
- 함수에 값을 넘길 때 ownership이 이동하는지, 빌려 주는지 헷갈린다.
- mutable borrow와 immutable borrow 충돌이 왜 컴파일 에러가 되는지 처음엔 감이 잘 안 잡힌다.
- lifetime 표기가 실제 시간 개념처럼 보이지만, 코드 안에서는 참조 관계를 설명하는 표기라서 더 헷갈린다.

이 글은 위 혼란을 줄이기 위해 scope, move, clone/copy, borrowing, dangling reference, lifetime annotation을 하나의 흐름으로 묶어 설명한다. 스마트 포인터, interior mutability, 고급 lifetime 패턴은 다루지 않는다.

## 확인된 사실

- ownership의 핵심 규칙은 "각 값은 owner 하나를 갖고, owner가 scope를 벗어나면 값이 drop된다"는 구조다.
  근거: [What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)
- `String` 같은 소유 타입은 대입 시 move되고, 진짜 복사가 필요하면 `clone()`을 사용한다. 반면 `Copy` 타입은 대입 시 값이 복사된다.
  근거: [What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)
- borrowing은 ownership을 넘기지 않고 값을 참조로 빌려 쓰는 방식이며, 여러 immutable borrow는 가능하지만 mutable borrow 규칙은 더 엄격하다.
  근거: [References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)
- dangling reference는 허용되지 않으며, 여러 참조 관계를 반환값과 연결해야 할 때 lifetime annotation이 필요할 수 있다.
  근거: [References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html), [Validating References with Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)
- 입문 실습은 `cargo new` 프로젝트 기준으로 따라가는 편이 가장 단순하다.
  근거: [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)

## 직접 확인한 결과

### 1. 실습 프로젝트를 하나 만들고 예제를 교체하며 보는 방식이 가장 편했다

- 직접 확인한 결과: 아래처럼 프로젝트를 하나 만든 뒤 `src/main.rs`를 바꿔 가며 `cargo run`으로 확인하는 흐름이 ownership 예제에도 가장 잘 맞았다.

```powershell
cargo new rust-ownership-basics
cd rust-ownership-basics
code .
cargo run
```

### 2. scope를 벗어나면 owner도 사라지고 값이 정리됐다

- 직접 확인한 결과: 아래 코드에서 `message`는 블록 안에서만 유효했고, 블록 밖에서는 더 이상 쓸 수 없는 흐름으로 이해하는 것이 자연스러웠다.

```rust
fn main() {
    {
        let message = String::from("hello");
        println!("{}", message);
    }

    // 여기서는 message를 더 이상 사용할 수 없다.
}
```

- 이 예제는 ownership의 시작점을 설명할 때 가장 기본적인 scope 규칙을 보여 줬다.

### 3. `String` 대입은 복사가 아니라 move로 읽는 편이 맞았다

- 직접 확인한 결과: 아래 코드에서 `s1`을 `s2`에 대입하면 ownership이 이동한 것으로 읽는 편이 맞았다.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("{}", s2);
}
```

- 직접 확인한 결과: `s1`을 다시 쓰려고 하면 아래처럼 moved value 관련 컴파일 에러가 났다.

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

- 직접 확인한 결과: `clone()`을 쓰면 별도 복사본을 만들 수 있었다.

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

- 직접 확인한 결과: `i32` 같은 `Copy` 타입은 대입해도 원래 값이 계속 유효했다.

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

### 4. borrowing을 쓰면 ownership을 유지한 채 값에 접근할 수 있었다

- 직접 확인한 결과: 아래처럼 `&str` 참조를 함수에 넘기면 ownership은 `main`에 남고, 함수는 길이만 읽었다.

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

- 관찰된 결과:

```text
length = 10
message = hello rust
```

- 직접 확인한 결과: immutable borrow는 여러 개 동시에 둘 수 있었고, mutable borrow는 수정이 필요할 때 하나만 두는 편이 맞았다.

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

- 직접 확인한 결과: immutable borrow가 살아 있는 동안 mutable borrow를 만들면 아래처럼 에러가 났다.

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

### 5. dangling reference는 막혔고, lifetime annotation은 참조 관계를 설명했다

- 직접 확인한 결과: 아래처럼 함수 안에서 만든 `String`의 참조를 반환하려는 코드는 허용되지 않았다.

```rust
fn dangle() -> &String {
    let text = String::from("hello");
    &text
}
```

- 직접 확인한 결과: 이런 경우는 참조가 아니라 ownership 자체를 반환하는 쪽이 맞았다.

```rust
fn no_dangle() -> String {
    let text = String::from("hello");
    text
}
```

- 직접 확인한 결과: 여러 참조를 받아 그중 하나를 반환하는 대표 예제에서는 lifetime annotation이 관계 설명용으로 등장했다.

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

### 6. 참조를 담는 struct도 lifetime을 같이 적어야 했다

- 직접 확인한 결과: 구조체가 참조를 필드로 가지면 아래처럼 lifetime parameter를 적어 줘야 의미가 분명했다.

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

- 직접 확인한 결과: 마지막으로 immutable borrow, mutable borrow, lifetime annotation, 참조를 담는 구조체를 한 파일에 모아 보면 개념 연결이 더 잘 보였다.

## 해석 / 의견

- 의견: ownership은 "메모리 규칙"으로만 보지 말고 "값의 책임이 누구에게 있나"로 보는 편이 이해가 훨씬 빠르다.
- 의견: 초급자 단계에서는 `clone`, `&T`, `&mut T`만 확실히 구분해도 borrow checker의 절반 이상이 정리된다.
- 해석: lifetime은 시간을 재는 문법이라기보다, 참조들의 유효 범위를 컴파일러와 공유하는 표기로 이해하는 편이 가장 덜 헷갈린다.

## 한계와 예외

- 이 글은 `String`과 문자열 참조 중심의 입문 설명이다. `Vec<T>`, smart pointer, interior mutability, trait object, async borrow 문제는 다루지 않았다.
- 에러 메시지 세부 문구는 Rust 버전에 따라 조금 달라질 수 있다.
- lifetime은 실제 코드에서 생략 가능한 경우가 많지만, 이 글은 개념을 분명히 보이기 위해 대표 예제를 드러내어 적었다.
- WSL, macOS, Linux 같은 환경 차이보다 언어 규칙 자체에 초점을 맞췄다.

## 참고자료

- [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- [What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)
- [References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)
- [Validating References with Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)
