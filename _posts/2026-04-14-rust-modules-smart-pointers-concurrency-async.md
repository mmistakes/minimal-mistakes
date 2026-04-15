---
layout: single
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

Rust를 어느 정도 익히고 나면 문법 하나하나보다 "코드를 어떻게 나눌지", "값을 어떻게 안전하게 공유할지", "여러 작업을 동시에 어떻게 처리할지"가 더 중요해진다. 이때 자주 마주치는 주제가 `module`, smart pointer, concurrency, async다.

이번 글에서는 네 가지를 초급자 기준으로 정리한다. `module`은 코드를 구조화하는 도구이고, smart pointer는 값의 소유와 접근 방식을 더 정교하게 제어하게 해 준다. concurrency는 여러 작업을 동시에 진행하는 방법이고, async는 대기 시간이 많은 작업을 효율적으로 다루는 방식이다.

## 검증 기준과 재현 범위

- 시점: 2026-04-15 기준 Rust Book 7장, 15장, 16장과 Async Book을 확인했다.
- 출처 등급: 공식 문서만 사용했다.
- 재현 환경: Cargo 프로젝트, `src/main.rs`, thread와 async 예제.
- 주의: async 예제는 runtime 선택 전의 개념 설명 수준이며, 실제 네트워크 async는 별도 executor 문서와 함께 봐야 한다.


## 실습 프로젝트 만들기

아래처럼 새 Cargo 프로젝트를 만든 뒤 `src/main.rs`에서 예제를 하나씩 실행해 보면 된다. Rust Book의 입문 실습은 `cargo new` 기반 프로젝트 구조를 전제로 한다. [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)

```powershell
cargo new rust-modules-concurrency
cd rust-modules-concurrency
code .
```

예제를 붙여 넣은 뒤에는 아래 명령으로 실행하면 된다.

```powershell
cargo run
```

## Modules: 코드를 의미 단위로 나누기

Rust에서 module은 코드를 역할별로 나누고 경로(path)로 접근하게 해 주는 구조다. 작은 예제에서는 한 파일에 다 넣어도 되지만, 코드가 커질수록 `mod`, `pub`, 경로 사용법이 중요해진다. Rust Book 7장은 package, crate, module, path를 통해 코드 구조를 나누는 방법을 설명한다. [Managing Growing Projects with Packages, Crates, and Modules](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)

가장 단순한 예제는 아래와 같다.

```rust
mod greeting {
    pub fn say_hello() {
        println!("hello from module");
    }
}

fn main() {
    greeting::say_hello();
}
```

여기서 핵심은 아래 두 가지다.

- `mod greeting`으로 모듈을 만든다.
- 바깥에서 사용할 함수는 `pub`으로 공개해야 한다.

module을 파일로 분리하면 구조가 더 명확해진다.

```text
src/
  main.rs
  greeting.rs
```

`src/greeting.rs`는 아래처럼 둘 수 있다.

```rust
pub fn say_hello() {
    println!("hello from greeting.rs");
}
```

그리고 `src/main.rs`는 아래처럼 연결한다.

```rust
mod greeting;

fn main() {
    greeting::say_hello();
}
```

프로젝트가 커지면 module은 단순한 문법이 아니라 코드 탐색성과 유지보수성을 크게 좌우하는 구조가 된다.

## Smart Pointers: 값 관리 방식을 더 정교하게 다루기

Rust의 기본 참조와 소유권만으로도 많은 문제를 해결할 수 있지만, 더 복잡한 상황에서는 smart pointer가 필요하다. smart pointer는 단순한 주소값이 아니라 추가 메타데이터와 동작을 함께 가지는 타입이다. Rust Book 15장은 smart pointer를 기본 reference보다 더 많은 메타데이터와 동작을 가진 타입으로 설명한다. [Smart Pointers](https://doc.rust-lang.org/book/ch15-00-smart-pointers.html)

### Box<T>

`Box<T>`는 값을 힙(heap)에 저장하고 싶을 때 쓰는 가장 기본적인 smart pointer다. Rust Book은 `Box<T>`를 heap allocation과 recursive type 표현의 기본 도구로 설명한다. [Using Box<T> to Point to Data on the Heap](https://doc.rust-lang.org/book/ch15-01-box.html)

```rust
fn main() {
    let number = Box::new(100);
    println!("number = {}", number);
}
```

이 예제는 겉보기에는 단순하지만, 값이 스택이 아니라 힙에 저장된다는 점이 다르다. 재귀 타입이나 큰 데이터를 다룰 때 `Box<T>`가 자주 등장한다.

### Rc<T>

`Rc<T>`는 single-thread 환경에서 여러 owner가 같은 값을 공유할 수 있게 해 준다. Rust Book은 `Rc<T>`를 single-threaded multiple ownership 패턴으로 설명한다. [Rc<T>, the Reference Counted Smart Pointer](https://doc.rust-lang.org/book/ch15-04-rc.html)

```rust
use std::rc::Rc;

fn main() {
    let name = Rc::new(String::from("rust"));

    let a = Rc::clone(&name);
    let b = Rc::clone(&name);

    println!("a = {}", a);
    println!("b = {}", b);
    println!("count = {}", Rc::strong_count(&name));
}
```

보통 `clone()`이라는 이름 때문에 데이터를 복사한다고 오해하기 쉽지만, `Rc::clone`은 실제 문자열을 깊게 복사하는 것이 아니라 reference count를 늘려 공유 ownership을 만든다.

### RefCell<T>

`RefCell<T>`는 immutable 바인딩 안에서도 내부 값을 바꿀 수 있게 해 주는 interior mutability 패턴에 쓰인다. Rust Book은 `RefCell<T>`를 interior mutability와 runtime borrow checking 예제로 설명한다. [RefCell<T> and the Interior Mutability Pattern](https://doc.rust-lang.org/book/ch15-05-interior-mutability.html)

```rust
use std::cell::RefCell;

fn main() {
    let value = RefCell::new(10);

    *value.borrow_mut() += 5;

    println!("value = {}", value.borrow());
}
```

보통 borrow 규칙은 컴파일 시점에 검사되지만, `RefCell<T>`는 일부 규칙을 런타임에 검사한다. 그래서 더 유연하지만, 잘못 쓰면 실행 중 panic이 날 수 있다.

## Concurrency: 여러 작업을 동시에 다루기

Rust의 concurrency는 안전성이 강점이다. thread를 만들 때도 데이터 레이스를 쉽게 허용하지 않고, 공유 방식이 안전한지 컴파일 단계에서 많이 확인한다. Rust Book 16장은 thread, message passing, shared-state concurrency를 공식적으로 다룬다. [Fearless Concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

가장 기본적인 예제는 thread 생성이다.

```rust
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..=3 {
            println!("spawned thread = {}", i);
            thread::sleep(Duration::from_millis(100));
        }
    });

    for i in 1..=2 {
        println!("main thread = {}", i);
        thread::sleep(Duration::from_millis(100));
    }

    handle.join().unwrap();
}
```

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_07/concurrency 예제 결과 1.png' | relative_url }}" alt="concurrency 예제 결과 1">

`thread::spawn`은 새 스레드를 만들고, `join()`은 해당 스레드가 끝날 때까지 기다린다.

thread 사이에 데이터를 직접 공유하기보다 message passing을 쓰는 것도 Rust에서 매우 흔한 패턴이다.

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let message = String::from("hello from thread");
        tx.send(message).unwrap();
    });

    let received = rx.recv().unwrap();
    println!("received = {}", received);
}
```

이 방식은 한 스레드가 다른 스레드에 값을 보내고, 받는 쪽이 안전하게 처리하게 만든다.

shared state가 꼭 필요할 때는 `Arc<Mutex<T>>` 조합이 많이 쓰인다.

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..3 {
        let counter = Arc::clone(&counter);

        let handle = thread::spawn(move || {
            let mut number = counter.lock().unwrap();
            *number += 1;
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("counter = {}", *counter.lock().unwrap());
}
```

여기서 `Arc<T>`는 multi-thread용 shared ownership이고, `Mutex<T>`는 한 번에 한 스레드만 값에 접근하도록 보호한다.

## Async: 기다리는 동안 다른 작업하기

concurrency가 여러 작업을 동시에 처리하는 큰 개념이라면, async는 특히 I/O처럼 기다리는 시간이 긴 작업을 효율적으로 다루는 데 강하다. 핵심 키워드는 `async`, `await`다. Async Book은 async/await를 cooperative concurrency 관점에서 설명한다. [Asynchronous Programming in Rust](https://rust-lang.github.io/async-book/)

async 예제는 보통 runtime이 필요하다. 가장 많이 쓰는 방식 중 하나는 Tokio를 사용하는 것이다. 새 Cargo 프로젝트에서 아래 예제를 그대로 실행하려면 먼저 `Cargo.toml`에 Tokio 의존성을 추가해야 한다.

```toml
[dependencies]
tokio = { version = "1", features = ["macros", "rt-multi-thread", "time"] }
```

```rust
async fn get_message() -> String {
    String::from("hello async")
}

#[tokio::main]
async fn main() {
    let message = get_message().await;
    println!("message = {}", message);
}
```

이 코드는 아래 흐름으로 읽으면 된다.

- `async fn`은 바로 값을 반환하는 것이 아니라 future를 만든다.
- `.await`는 future가 완료될 때까지 기다린 뒤 결과를 꺼낸다.
- `#[tokio::main]`은 async `main`을 실행할 runtime을 준비해 준다.
- runtime은 여러 async task를 스케줄링한다.

async의 장점은 "작업이 쉬는 동안 스레드도 같이 묶어 두지 않아도 된다"는 점이다. 그래서 네트워크 요청, 파일 I/O, 서버 처리 같은 상황에서 특히 강력하다.

여러 async 작업을 함께 기다리는 예제는 아래처럼 볼 수 있다.

```rust
use tokio::time::{sleep, Duration};

async fn task(name: &str, delay_ms: u64) -> String {
    sleep(Duration::from_millis(delay_ms)).await;
    format!("done: {}", name)
}

#[tokio::main]
async fn main() {
    let first = task("A", 200);
    let second = task("B", 100);

    let (a, b) = tokio::join!(first, second);
    println!("{}, {}", a, b);
}
```

이 예제는 각 task 안에 실제 `.await` 지점이 있어서, `tokio::join!`이 여러 future를 함께 진행시키고 모두 끝날 때까지 기다리는 모습을 더 잘 보여 준다.

초반에는 thread와 async를 같은 개념으로 느끼기 쉽지만, thread는 운영체제 스레드를 직접 활용하는 방식이고, async는 future와 runtime 위에서 많은 작업을 효율적으로 스케줄링하는 방식이라고 구분해 두면 이해가 쉬워진다.

## 한 번에 보는 종합 예제

이번 주제는 한 파일로 모두 완벽하게 합치기보다, 연결 고리를 보는 것이 중요하다. 아래 예제는 module, smart pointer, concurrency를 함께 묶은 예제다.

```rust
use std::sync::{Arc, Mutex};
use std::thread;

mod logger {
    pub fn print_status(message: &str) {
        println!("status = {}", message);
    }
}

fn main() {
    let shared = Arc::new(Mutex::new(Box::new(0)));
    let mut handles = vec![];

    for _ in 0..3 {
        let shared = Arc::clone(&shared);

        let handle = thread::spawn(move || {
            let mut value = shared.lock().unwrap();
            **value += 1;
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    logger::print_status("all threads finished");
    println!("final = {}", **shared.lock().unwrap());
}
```

이 예제에는 아래 요소가 모두 들어 있다.

- `mod logger`로 코드 역할 분리
- `Box<i32>`로 힙에 값 저장
- `Arc<Mutex<_>>`로 안전한 shared state 구성
- `thread::spawn`과 `join()`으로 concurrency 처리

async는 runtime이 필요한 경우가 많기 때문에, 보통은 별도 예제로 이해하는 편이 더 자연스럽다.

## 정리

이번 글에서는 `module`, smart pointer, concurrency, async를 한 흐름으로 정리했다. module은 코드를 더 읽기 좋게 나누는 구조이고, smart pointer는 ownership과 접근 방식을 더 유연하게 제어하게 해 준다. concurrency는 여러 스레드나 작업을 안전하게 다루는 방법이고, async는 기다림이 많은 작업을 효율적으로 처리하는 방식이다.

이 단계까지 오면 Rust는 단순 문법이 아니라 설계 도구처럼 느껴지기 시작한다. 다음 단계에서는 crate 구조, testing, lifetimes 심화, trait object, macros 같은 주제로 넘어가면서 Rust 스타일의 설계 감각을 더 넓혀 가면 좋다.

## 출처 및 참고

- Rust Project Developers, [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- Rust Project Developers, [Managing Growing Projects with Packages, Crates, and Modules](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)
- Rust Project Developers, [Smart Pointers](https://doc.rust-lang.org/book/ch15-00-smart-pointers.html)
- Rust Project Developers, [Using Box<T> to Point to Data on the Heap](https://doc.rust-lang.org/book/ch15-01-box.html)
- Rust Project Developers, [Rc<T>, the Reference Counted Smart Pointer](https://doc.rust-lang.org/book/ch15-04-rc.html)
- Rust Project Developers, [RefCell<T> and the Interior Mutability Pattern](https://doc.rust-lang.org/book/ch15-05-interior-mutability.html)
- Rust Project Developers, [Fearless Concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html)
- Rust Async WG, [Asynchronous Programming in Rust](https://rust-lang.github.io/async-book/)
