---
layout: single
description: "module, smart pointer, concurrency, async를 예제로 익히는 Rust 기초 가이드."
title: "Rust 07. Modules, Smart Pointers, Concurrency, Async 기초"
lang: ko
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
---

## 요약

Rust를 어느 정도 익히고 나면 개별 문법보다 "코드를 어떻게 나눌지", "값을 어떻게 공유할지", "동시에 여러 작업을 어떻게 안전하게 처리할지"가 더 중요해진다. 이 지점을 대표하는 주제가 `module`, smart pointer, concurrency, async다.

이 글은 위 네 가지를 초급자 기준으로 연결해 정리한다. 결론부터 말하면 module은 코드 구조화, smart pointer는 소유와 접근 방식의 세분화, concurrency는 스레드와 공유 상태 관리, async는 대기 시간이 큰 작업의 효율적 스케줄링에 초점이 있다.

## 문서 정보

- 작성일: 2026-04-14
- 검증 기준일: 2026-04-16
- 문서 성격: tutorial
- 테스트 환경: Windows 11 Pro, Cargo 프로젝트, Windows PowerShell 예시 명령, `src/main.rs`
- 테스트 버전: rustc 1.94.0, cargo 1.94.0
- 출처 등급: 공식 문서만 사용했다.
- 비고: `module`, `Box`, `Rc`, `RefCell`, channel, `Arc<Mutex<_>>` 예제는 로컬에서 재실행했다. Tokio 런타임이 필요한 async 예제는 이번 검증 범위에서 제외하고 실행 조건과 공식 문서 근거만 명시했다.

## 문제 정의

Rust 초중반 단계에서 아래 네 가지는 서로 연결해서 봐야 이해가 쉬워진다.

- 코드가 커질 때 파일과 모듈을 어떤 기준으로 나눌지
- 단순 참조만으로 부족할 때 값을 어떤 ownership 모델로 다룰지
- 스레드 간 통신과 공유 상태를 어떻게 안전하게 구성할지
- thread 기반 concurrency와 runtime 기반 async를 어떻게 구분할지

이 글은 위 질문을 입문 수준에서 정리한다. production async runtime 구성, custom executor, lock-free 자료구조, actor 모델은 다루지 않는다.

## 확인된 사실

- module은 `mod`, `pub`, path를 통해 코드를 역할 단위로 나누고 공개 범위를 제어하는 기본 구조다.
  근거: [Managing Growing Projects with Packages, Crates, and Modules](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)
- `Box<T>`, `Rc<T>`, `RefCell<T>`는 각각 heap allocation, single-thread shared ownership, interior mutability를 대표하는 smart pointer 계열 도구다.
  근거: [Smart Pointers](https://doc.rust-lang.org/book/ch15-00-smart-pointers.html), [Using Box<T> to Point to Data on the Heap](https://doc.rust-lang.org/book/ch15-01-box.html), [Rc<T>, the Reference Counted Smart Pointer](https://doc.rust-lang.org/book/ch15-04-rc.html), [RefCell<T> and the Interior Mutability Pattern](https://doc.rust-lang.org/book/ch15-05-interior-mutability.html)
- Rust는 thread, message passing, shared-state concurrency를 표준 라이브러리 수준에서 제공하며, 데이터 레이스를 줄이도록 타입 시스템 제약을 둔다.
  근거: [Fearless Concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html)
- async/await는 future와 runtime을 기반으로 하며, I/O처럼 대기 시간이 큰 작업에서 특히 유용하다.
  근거: [Asynchronous Programming in Rust](https://rust-lang.github.io/async-book/)
- 입문 실습 흐름은 `cargo new` 프로젝트 기준으로 설명하는 편이 가장 재현하기 쉽다.
  근거: [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)

## 직접 확인한 결과

### 1. 새 Cargo 프로젝트에서 std 기반 예제를 교체하며 실행하는 흐름이 가장 단순했다

- 직접 확인한 결과: 아래처럼 새 Cargo 프로젝트를 만든 뒤 `src/main.rs`를 바꿔 가며 `cargo run`을 반복하는 방식이 가장 자연스러웠다.

```powershell
cargo new rust-modules-concurrency
cd rust-modules-concurrency
code .
cargo run
```

### 2. module과 smart pointer 예제는 각 ownership 모델 차이를 바로 드러냈다

- 직접 확인한 결과: 아래 예제로 module 호출, `Box<T>`, `Rc<T>`, `RefCell<T>` 흐름을 한 번에 확인할 수 있었다.

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

- 관찰된 결과:

```text
hello from module
boxed = 100
rc count = 3
a = rust, b = rust
refcell = 15
```

### 3. concurrency 예제는 channel과 `Arc<Mutex<_>>`가 서로 다른 공유 방식을 보여 줬다

- 직접 확인한 결과: 아래 예제로 message passing과 shared state를 각각 재현할 수 있었다.

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

- 관찰된 결과:

```text
received = hello from thread
counter = 3
```

### 4. async는 실행 조건을 분리해서 보는 편이 더 정확했다

- 직접 확인한 결과: 이번 검증에서는 Tokio 같은 runtime 의존성이 없는 std 기반 예제만 재실행했다.
- 확인한 조건: 본문에 나온 `#[tokio::main]` 예제는 새 Cargo 프로젝트에서 아래 의존성을 추가해야 실행 가능하다.

```toml
[dependencies]
tokio = { version = "1", features = ["macros", "rt-multi-thread", "time"] }
```

- 해석을 위한 관찰: 따라서 이 글에서 async 부분은 "직접 실행 결과"보다 "실행 조건과 개념 경계"를 먼저 밝히는 편이 더 정확했다.

## 해석 / 의견

- 해석: module, smart pointer, concurrency, async는 서로 다른 문법이 아니라 "코드 구조, ownership, 실행 모델"이라는 세 층위를 나눠 맡는 도구에 가깝다.
- 의견: 초급자 기준으로는 `Rc`와 `Arc`, `RefCell`과 `Mutex`를 한 번에 모두 외우기보다 "single-thread/shared ownership", "runtime borrow check", "multi-thread/shared state"라는 역할 차이부터 잡는 편이 이해가 빠르다.
- 의견: async는 thread의 대체제가 아니라, 기다림이 많은 작업을 runtime이 효율적으로 스케줄링하도록 돕는 별도 실행 모델로 소개하는 편이 혼동이 적다.

## 한계와 예외

- 이 글은 입문 예제 기준이다. custom executor, async stream, actor 모델, lock-free 구조는 범위 밖이다.
- thread 출력 순서와 타이밍은 스케줄링에 따라 달라질 수 있다.
- `RefCell<T>`는 유연하지만 borrow 규칙을 런타임에 검사하므로 잘못 쓰면 panic이 날 수 있다.
- async 예제는 Tokio 같은 runtime 의존성이 있어, 이번 검증에서는 표준 라이브러리 기반 예제만 직접 재현했다.

## 참고자료

- [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- [Managing Growing Projects with Packages, Crates, and Modules](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)
- [Smart Pointers](https://doc.rust-lang.org/book/ch15-00-smart-pointers.html)
- [Using Box<T> to Point to Data on the Heap](https://doc.rust-lang.org/book/ch15-01-box.html)
- [Rc<T>, the Reference Counted Smart Pointer](https://doc.rust-lang.org/book/ch15-04-rc.html)
- [RefCell<T> and the Interior Mutability Pattern](https://doc.rust-lang.org/book/ch15-05-interior-mutability.html)
- [Fearless Concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html)
- [Asynchronous Programming in Rust](https://rust-lang.github.io/async-book/)
