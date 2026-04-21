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

읽는 기준은 이 네 주제를 같은 층위의 문법으로 보지 않는 것이다. module은 코드 배치 문제, smart pointer는 ownership 모델 문제, concurrency와 async는 실행 모델 문제다. 각 예제에서 "파일을 어떻게 나눴는가", "값을 누가 공유하는가", "작업이 실제로 동시에 도는가 또는 기다림을 스케줄링하는가"를 구분해서 보면 된다.

처음 읽을 때는 아래처럼 우선순위를 나누면 부담이 줄어든다.

| 주제 | 이번 글에서 꼭 볼 것 | 지금은 넘겨도 되는 것 |
| --- | --- | --- |
| module | 파일과 공개 범위를 나누는 기준 | workspace, feature, publish |
| smart pointer | `Box`, `Rc`, `RefCell`이 필요한 이유 | unsafe pointer, custom smart pointer |
| concurrency | channel과 `Arc<Mutex<_>>`의 차이 | lock-free 구조, actor 모델 |
| async | async에는 runtime이 필요하다는 사실 | custom executor, async stream |

이 표는 암기 목록이 아니라 읽는 순서다. 한 번에 모든 세부 문법을 외우려 하기보다, 각 도구가 어떤 문제를 줄이기 위해 나왔는지만 먼저 잡으면 된다.

## 확인된 사실

- module은 `mod`, `pub`, path를 통해 코드를 역할 단위로 나누고 공개 범위를 제어하는 기본 구조다.
  근거: [Managing Growing Projects with Packages, Crates, and Modules](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)
  의미: module은 파일을 쪼개는 문법만이 아니라, 어떤 이름을 밖에 보여 줄지 정하는 경계 역할을 한다.
- `Box<T>`, `Rc<T>`, `RefCell<T>`는 각각 heap allocation, single-thread shared ownership, interior mutability를 대표하는 smart pointer 계열 도구다.
  근거: [Smart Pointers](https://doc.rust-lang.org/book/ch15-00-smart-pointers.html), [Using Box<T> to Point to Data on the Heap](https://doc.rust-lang.org/book/ch15-01-box.html), [Rc<T>, the Reference Counted Smart Pointer](https://doc.rust-lang.org/book/ch15-04-rc.html), [RefCell<T> and the Interior Mutability Pattern](https://doc.rust-lang.org/book/ch15-05-interior-mutability.html)
  의미: smart pointer는 "포인터라서 어렵다"보다, ownership과 borrow 규칙을 어떤 방식으로 확장하는 도구인지로 읽어야 한다.
- Rust는 thread, message passing, shared-state concurrency를 표준 라이브러리 수준에서 제공하며, 데이터 레이스를 줄이도록 타입 시스템 제약을 둔다.
  근거: [Fearless Concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html)
  의미: Rust의 concurrency 예제는 thread API 사용법만 보여 주는 것이 아니라, 공유 값에 접근할 때 타입이 안전 조건을 함께 강제한다는 점을 보여 준다.
- async/await는 future와 runtime을 기반으로 하며, I/O처럼 대기 시간이 큰 작업에서 특히 유용하다.
  근거: [Asynchronous Programming in Rust](https://rust-lang.github.io/async-book/)
  의미: async 함수는 혼자 실행되는 마법 함수가 아니라 future를 만들고, 실제 실행에는 runtime이 필요하다.
- 입문 실습 흐름은 `cargo new` 프로젝트 기준으로 설명하는 편이 가장 재현하기 쉽다.
  근거: [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
  의미: std 기반 예제와 runtime 의존 예제를 나눠 확인하려면 Cargo 프로젝트에서 의존성 유무를 분명히 하는 편이 안전하다.

## 직접 재현한 결과

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

- 읽는 법: `mod greeting`은 이름 공간을 나누고, `Box`는 값을 heap에 두며, `Rc`는 single-thread 안에서 소유를 공유하고, `RefCell`은 borrow 검사를 런타임으로 미룬다. 네 줄의 출력은 서로 다른 ownership 모델이 한 프로그램 안에서 어떤 역할을 맡는지 보여 준다.

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

- 읽는 법: channel 예제는 값을 보내는 방식이고, `Arc<Mutex<_>>` 예제는 여러 thread가 같은 값을 잠금으로 보호하며 수정하는 방식이다. 둘 다 concurrency지만, 하나는 message passing이고 다른 하나는 shared state라는 점이 핵심이다.

### 4. async는 실행 조건을 분리해서 보는 편이 더 정확했다

- 직접 확인한 결과: 이번 검증에서는 Tokio 같은 runtime 의존성이 없는 std 기반 예제만 재실행했다.
- 확인한 조건: 본문에 나온 `#[tokio::main]` 예제는 새 Cargo 프로젝트에서 아래 의존성을 추가해야 실행 가능하다.

```toml
[dependencies]
tokio = { version = "1", features = ["macros", "rt-multi-thread", "time"] }
```

- 해석을 위한 관찰: 따라서 이 글에서 async 부분은 "직접 실행 결과"보다 "실행 조건과 개념 경계"를 먼저 밝히는 편이 더 정확했다.

- 읽는 법: async 예제가 std 예제와 같은 방식으로 바로 실행되지 않는 이유는 Rust의 async 실행에 runtime이 필요하기 때문이다. 따라서 이 글에서는 async를 직접 실행 결과로 단정하기보다, 실행 조건과 개념 경계를 먼저 구분한다.

## 해석 / 의견

- 이 단계에서 중요한 판단: module, smart pointer, concurrency, async는 서로 다른 문법이 아니라 "코드 구조, ownership, 실행 모델"이라는 세 층위를 나눠 맡는 도구에 가깝다.
- 선택 기준: single-thread 공유는 `Rc`, 런타임 borrow 검사가 필요하면 `RefCell`, multi-thread 공유는 `Arc<Mutex<_>>`, 대기 시간이 큰 I/O 흐름은 async를 검토한다.
- 해석: async는 thread의 대체제가 아니라, 기다림이 많은 작업을 runtime이 효율적으로 스케줄링하도록 돕는 별도 실행 모델로 소개하는 편이 혼동이 적다.

## 한계와 예외

- 이 글은 입문 예제 기준이다. custom executor, async stream, actor 모델, lock-free 구조는 범위 밖이다.
- thread 출력 순서와 타이밍은 스케줄링에 따라 달라질 수 있다.
- `RefCell<T>`는 유연하지만 borrow 규칙을 런타임에 검사하므로 잘못 쓰면 panic이 날 수 있다.
- async 예제는 Tokio 같은 runtime 의존성이 있어, 이번 검증에서는 표준 라이브러리 기반 예제만 직접 재현했다.
- 이 글을 읽고도 남는 질문은 Tokio 같은 runtime 선택, async borrow 문제, lock-free 구조, actor 모델이며, 이는 입문 범위를 넘어선 실행 모델 설계 주제다.

## 참고자료

- [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- [Managing Growing Projects with Packages, Crates, and Modules](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)
- [Smart Pointers](https://doc.rust-lang.org/book/ch15-00-smart-pointers.html)
- [Using Box<T> to Point to Data on the Heap](https://doc.rust-lang.org/book/ch15-01-box.html)
- [Rc<T>, the Reference Counted Smart Pointer](https://doc.rust-lang.org/book/ch15-04-rc.html)
- [RefCell<T> and the Interior Mutability Pattern](https://doc.rust-lang.org/book/ch15-05-interior-mutability.html)
- [Fearless Concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html)
- [Asynchronous Programming in Rust](https://rust-lang.github.io/async-book/)
