---
layout: single
description: "struct, enum, pattern matching, trait을 예제로 익히는 Rust 기초 가이드."
title: "Rust 05. Structs, Enums, Pattern Matching, Traits 기초"
lang: ko
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
---

## 요약

ownership, borrowing, lifetime까지 익혔다면 이제 "데이터를 어떤 형태로 모델링하고, 여러 경우를 어떻게 안전하게 분기하며, 공통 동작을 어떤 단위로 묶을 것인가"를 볼 차례다. Rust에서는 이 지점을 `struct`, `enum`, `match`/`if let`, `trait`가 맡는다.

이 글은 위 네 가지를 하나의 Cargo 프로젝트 흐름으로 연결해 정리한다. 결론부터 말하면 `struct`는 관련 데이터를 묶고, `enum`은 여러 상태 중 하나를 표현하고, `match`와 `if let`은 그 상태를 안전하게 꺼내며, `trait`는 서로 다른 타입에 같은 동작 계약을 부여한다.

## 문서 정보

- 작성일: 2026-04-12
- 검증 기준일: 2026-04-16
- 문서 성격: tutorial
- 테스트 환경: Windows 11 Pro, Cargo 프로젝트, Windows PowerShell 예시 명령, `src/main.rs`
- 테스트 버전: rustc 1.94.0, cargo 1.94.0
- 출처 등급: 공식 문서만 사용했다.
- 비고: 대표 예제를 로컬에서 재실행했고, 예제에 따라 unused variant 경고가 함께 보일 수 있다.

## 문제 정의

Rust 입문 단계에서 아래 네 가지는 서로 연결해서 보지 않으면 이해가 끊기기 쉽다.

- 여러 필드를 하나의 타입으로 어떻게 묶을지
- 여러 상태 중 하나를 타입 수준에서 어떻게 표현할지
- enum 값을 꺼낼 때 누락 없이 어떻게 분기할지
- 구조는 다르지만 같은 동작을 여러 타입에 어떻게 부여할지

이 글은 위 질문을 하나의 흐름으로 연결하는 데 초점을 둔다. derive macro 심화, generic trait bound 전체, trait object, 고급 pattern guard는 범위에서 제외한다.

읽는 기준은 "데이터 모양을 정하고, 가능한 상태를 제한하고, 상태를 꺼내고, 공통 동작을 이름 붙인다"는 흐름이다. `struct`, `enum`, `match`, `trait`를 각각 따로 외우면 복잡하지만, 작은 도메인 모델을 만드는 도구로 보면 역할이 분명해진다.

## 확인된 사실

- `struct`는 관련 데이터를 하나의 사용자 정의 타입으로 묶는 기본 도구다.
  근거: [Defining and Instantiating Structs](https://doc.rust-lang.org/book/ch05-01-defining-structs.html)
  의미: 여러 값을 따로 넘기지 않고 하나의 의미 있는 타입으로 묶으면, 코드가 어떤 데이터를 다루는지 이름으로 드러낼 수 있다.
- `impl` 블록은 특정 타입과 밀접한 메서드를 같은 단위에 배치하는 방법이다.
  근거: [Method Syntax](https://doc.rust-lang.org/book/ch05-03-method-syntax.html)
  의미: 데이터와 그 데이터를 다루는 동작을 가까이 두면, 함수를 어디에 둘지 덜 헷갈리고 호출 쪽도 `value.method()` 형태로 읽기 쉬워진다.
- `enum`은 여러 variant 중 정확히 하나를 표현하며, 각 variant는 서로 다른 형태의 데이터를 가질 수 있다.
  근거: [Defining an Enum](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html)
  의미: 상태를 문자열이나 숫자 코드로 흩어 놓는 대신, 가능한 경우를 타입 안에 모아 둘 수 있다.
- `match`는 가능한 경우를 빠짐없이 처리하도록 요구하고, `if let`은 특정 패턴 하나를 간단히 다룰 때 쓰는 축약형이다.
  근거: [match](https://doc.rust-lang.org/book/ch06-02-match.html), [Concise Control Flow with if let](https://doc.rust-lang.org/book/ch06-03-if-let.html)
  의미: `match`는 누락된 상태 처리를 컴파일러가 잡게 하는 장치이고, `if let`은 관심 있는 한 경우만 꺼내 읽을 때 코드를 줄여 주는 장치다.
- `trait`는 여러 타입이 공유하는 동작 계약을 정의하는 수단이다.
  근거: [Traits: Defining Shared Behavior](https://doc.rust-lang.org/book/ch10-02-traits.html)
  의미: trait는 상속 계층을 먼저 떠올리기보다, "이 타입은 이 동작을 제공한다"는 약속으로 읽는 편이 초급자에게 더 안전하다.
- 입문 실습 흐름은 `cargo new` 프로젝트 기준으로 설명하는 편이 가장 재현하기 쉽다.
  근거: [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
  의미: 모델링 예제는 여러 코드를 바꿔 보며 실행해야 하므로, Cargo 프로젝트 하나에서 반복하는 방식이 가장 재현하기 쉽다.

## 직접 재현한 결과

### 1. 실습 프로젝트를 따로 만들어 예제를 교체하며 실행하는 흐름이 가장 단순했다

- 직접 확인한 결과: 아래처럼 새 Cargo 프로젝트를 만든 뒤 `src/main.rs`를 바꿔 가며 `cargo run`을 반복하는 흐름이 가장 자연스러웠다.

```powershell
cargo new rust-structs-enums-traits
cd rust-structs-enums-traits
code .
cargo run
```

### 2. `struct`와 `impl`은 데이터와 동작을 함께 읽게 해 줬다

- 직접 확인한 결과: 아래 예제로 struct 필드 묶기와 impl 메서드 호출을 한 번에 확인할 수 있었다.

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

- 관찰된 결과:

```text
area = 600
can_hold = true
```

- 읽는 법: `Rectangle`은 너비와 높이를 하나의 의미 있는 값으로 묶고, `area`와 `can_hold`는 그 타입에 붙은 동작이다. 같은 계산을 독립 함수로 둘 수도 있지만, 이 예제에서는 데이터와 동작을 함께 읽는 감각이 중요하다.

### 3. `enum`, `match`, `if let`은 상태 표현과 분기 처리를 한 흐름으로 묶어 줬다

- 직접 확인한 결과: 아래 예제로 enum variant 분기와 `if let`의 축약된 패턴 처리를 함께 확인할 수 있었다.

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

- 관찰된 결과:

```text
vip level = 3
max = 5
```

- 읽는 법: `Ticket::Vip(3)`은 "VIP 상태이며 level 값이 있다"를 타입으로 표현한다. `match`는 모든 티켓 종류를 처리하게 만들고, `if let`은 `Some`인 경우 하나만 간단히 꺼내는 예제로 읽으면 된다.

### 4. `trait`를 포함한 종합 예제를 돌리면 네 개념의 역할 분담이 더 분명해졌다

- 직접 확인한 결과: 아래 예제처럼 `struct`, `enum`, `match`, `trait`를 한 파일에 모으면 "타입 설계"와 "공통 동작"의 연결이 잘 드러났다.

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

- 관찰된 결과:

```text
summary = Rust Structs and Traits [published]
```

- 읽는 법: `Article`은 데이터, `PostState`는 가능한 상태, `status_label`은 상태 해석, `Summary`는 외부에서 기대할 공통 동작을 맡는다. 일부 variant를 실제로 생성하지 않으면 `dead_code` 계열 경고가 함께 출력됐지만, 이는 예제 축약 때문에 생긴 경고이며 개념 설명 자체가 틀렸다는 뜻은 아니었다.

## 해석 / 의견

- 이 단계에서 중요한 판단: `struct`, `enum`, `match`, `trait`는 각각 따로 외울 문법이라기보다 "데이터 모델링과 동작 설계"라는 하나의 문제를 나눠 맡는 도구에 가깝다.
- 선택 기준: 필드 묶음은 `struct`, 제한된 상태 집합은 `enum`, 상태별 처리는 `match`, 여러 타입의 공통 동작은 `trait`로 시작한다.
- 해석: `if let`은 `match`를 대체하는 문법이 아니라, 경우 하나만 빠르게 확인할 때 읽기 좋은 축약형으로 배우는 편이 실용적이다.

## 한계와 예외

- 이 글은 단일 파일 기준의 입문 예제만 다룬다. trait object, generic trait bound 심화, derive macro 활용, pattern guard는 범위 밖이다.
- 예제에 따라 unused variant 같은 경고가 보일 수 있으며, 경고 문구는 Rust 버전에 따라 조금 달라질 수 있다.
- `Option<T>`와 `Result<T, E>`는 enum의 대표 사례이지만, 이 글에서는 개념 연결만 짧게 언급하고 별도 심화는 하지 않는다.
- macOS, Linux, WSL 환경 차이는 다루지 않았다.
- 이 글을 읽고도 남는 질문은 generic trait bound, trait object, derive macro 활용이며, 이는 trait 심화나 에러 처리 글에서 별도로 다루는 편이 좋다.

## 참고자료

- [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- [Defining and Instantiating Structs](https://doc.rust-lang.org/book/ch05-01-defining-structs.html)
- [Method Syntax](https://doc.rust-lang.org/book/ch05-03-method-syntax.html)
- [Defining an Enum](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html)
- [match](https://doc.rust-lang.org/book/ch06-02-match.html)
- [Concise Control Flow with if let](https://doc.rust-lang.org/book/ch06-03-if-let.html)
- [Traits: Defining Shared Behavior](https://doc.rust-lang.org/book/ch10-02-traits.html)
