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

이전 글에서 ownership, borrowing, lifetime을 정리했다면, 이제는 실제 데이터를 어떻게 모델링하고 공통 동작을 어떻게 표현할지 배울 차례다. Rust에서는 여러 필드를 하나로 묶을 때 `struct`를 사용하고, 여러 경우 중 하나를 표현할 때 `enum`을 사용한다. 그리고 `match`와 `if let`은 이런 값을 안전하게 분기 처리하는 핵심 문법이며, `trait`는 여러 타입이 같은 동작을 공유하도록 만드는 도구다.

이번 글에서는 `struct`, `enum`, pattern matching, `trait`를 한 흐름으로 정리하면서, Rust에서 데이터와 동작을 어떻게 설계하는지 기초를 잡아 본다.

## 문서 정보

- 작성일: 2026-04-12
- 검증 기준일: 2026-04-15
- 문서 성격: tutorial
- 테스트 환경: Cargo 프로젝트, `src/main.rs`, 기본 enum/trait 예제
- 테스트 버전: 미고정
- 출처 등급: 공식 문서만 사용했다.
- 비고: 이 글은 입문 수준의 핵심 문법에 집중하며, advanced pattern과 generic trait bound 전체를 다루지는 않는다.


## 실습 프로젝트 만들기

아래처럼 새 Cargo 프로젝트를 만든 뒤 `src/main.rs`에서 예제를 하나씩 실행해 보면 된다. Rust Book 입문 예제는 `cargo new` 프로젝트를 기준으로 설명한다. [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)

```powershell
cargo new rust-structs-enums-traits
cd rust-structs-enums-traits
code .
```

예제를 붙여 넣은 뒤에는 아래 명령으로 실행하면 된다.

```powershell
cargo run
```

## Struct: 관련 데이터를 하나로 묶기

`struct`는 서로 관련된 여러 필드를 하나의 이름 아래 묶고 싶을 때 사용한다. 예를 들어 사용자 정보를 각각 따로 변수로 두는 대신, 하나의 사용자 타입으로 표현할 수 있다. Rust Book은 struct를 관련 데이터를 하나의 custom type으로 묶는 기본 방법으로 소개한다. [Defining and Instantiating Structs](https://doc.rust-lang.org/book/ch05-01-defining-structs.html)

```rust
struct User {
    username: String,
    active: bool,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        username: String::from("k4nul"),
        active: true,
        sign_in_count: 1,
    };

    println!("username = {}", user1.username);
    println!("active = {}", user1.active);
    println!("sign_in_count = {}", user1.sign_in_count);
}
```

실행 결과는 아래와 같다.

```text
username = k4nul
active = true
sign_in_count = 1
```

`User`처럼 이름 있는 필드를 가지는 형태를 named struct라고 보면 된다. 각 값이 어떤 의미인지 이름으로 바로 드러나기 때문에 읽기가 쉽다.

새 값을 만들 때는 아래처럼 field init shorthand도 자주 사용한다.

```rust
struct User {
    username: String,
    active: bool,
    sign_in_count: u64,
}

fn build_user(username: String) -> User {
    User {
        username,
        active: true,
        sign_in_count: 1,
    }
}

fn main() {
    let user = build_user(String::from("rustacean"));
    println!("{}", user.username);
}
```

실행 결과는 아래와 같다.

```text
rustacean
```

여기서는 함수 인자 이름 `username`과 struct 필드 이름 `username`이 같기 때문에 `username: username`을 줄여서 쓸 수 있다.

## impl로 Struct에 메서드 붙이기

Rust에서 `struct`에 동작을 붙일 때는 `impl` 블록을 사용한다. Rust Book은 method syntax와 `impl` block을 struct 장에서 설명한다. [Method Syntax](https://doc.rust-lang.org/book/ch05-03-method-syntax.html)

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

실행 결과는 아래와 같다.

```text
area = 600
can_hold = true
```

여기서 `&self`는 현재 인스턴스를 참조로 받는다는 뜻이다. 즉, `rect1.area()`는 내부적으로 `Rectangle::area(&rect1)`처럼 호출된다고 생각하면 이해하기 쉽다.

함수를 그냥 분리해서 만들 수도 있지만, 특정 타입과 밀접한 동작은 `impl` 안에 두는 편이 훨씬 읽기 좋다.

## Enum: 여러 경우 중 하나를 표현하기

`struct`가 여러 필드를 동시에 가지는 타입이라면, `enum`은 여러 variant 중 정확히 하나를 가지는 타입이다. Rust Book은 enum을 여러 variant 중 하나를 표현하는 타입으로 소개한다. [Defining an Enum](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html)

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(u8, u8, u8),
}

fn main() {
    let message1 = Message::Quit;
    let message2 = Message::Move { x: 10, y: 20 };
    let message3 = Message::Write(String::from("hello"));

    match message1 {
        Message::Quit => println!("quit"),
        Message::Move { x, y } => println!("move to ({}, {})", x, y),
        Message::Write(text) => println!("text = {}", text),
        Message::ChangeColor(r, g, b) => println!("rgb({}, {}, {})", r, g, b),
    }

    match message2 {
        Message::Quit => println!("quit"),
        Message::Move { x, y } => println!("move to ({}, {})", x, y),
        Message::Write(text) => println!("text = {}", text),
        Message::ChangeColor(r, g, b) => println!("rgb({}, {}, {})", r, g, b),
    }

    match message3 {
        Message::Quit => println!("quit"),
        Message::Move { x, y } => println!("move to ({}, {})", x, y),
        Message::Write(text) => println!("text = {}", text),
        Message::ChangeColor(r, g, b) => println!("rgb({}, {}, {})", r, g, b),
    }
}
```

실행 결과는 아래와 같다.

```text
quit
move to (10, 20)
text = hello
```

중요한 점은 각 variant가 서로 다른 형태의 데이터를 가질 수 있다는 것이다. `Quit`는 데이터가 없고, `Move`는 named field를 가지며, `Write`는 `String` 하나를 담고, `ChangeColor`는 튜플처럼 값을 담는다.

Rust 표준 라이브러리에서 가장 자주 보는 enum 중 하나는 `Option<T>`다.

```rust
fn main() {
    let some_number = Some(10);
    let no_number: Option<i32> = None;

    println!("some_number = {:?}", some_number);
    println!("no_number = {:?}", no_number);
}
```

실행 결과는 아래와 같다.

```text
some_number = Some(10)
no_number = None
```

`Option<T>`는 값이 있을 수도 없을 수도 있다는 가능성을 타입 수준에서 드러낸다. 다른 언어의 `null`처럼 애매하게 두지 않고, 그 가능성을 처리하지 않은 채 일반 값처럼 사용하지 못하게 막는 것이 핵심이다. 실제로는 `match`, `if let`, 여러 메서드, `?` 등을 통해 안전하게 다룬다.

## Pattern Matching: match와 if let

enum을 꺼내 쓸 때 가장 자주 쓰는 문법은 `match`다. `match`는 모든 경우를 빠짐없이 처리하도록 강제하기 때문에 안전하다. Rust Book은 `match`와 `if let`을 enum 분기 처리의 핵심 도구로 설명한다. [match](https://doc.rust-lang.org/book/ch06-02-match.html), [Concise Control Flow with if let](https://doc.rust-lang.org/book/ch06-03-if-let.html)

```rust
enum Ticket {
    Normal,
    Vip(u32),
    Staff(String),
}

fn describe(ticket: Ticket) {
    match ticket {
        Ticket::Normal => println!("normal ticket"),
        Ticket::Vip(level) => println!("vip level = {}", level),
        Ticket::Staff(name) => println!("staff = {}", name),
    }
}

fn main() {
    describe(Ticket::Normal);
    describe(Ticket::Vip(3));
    describe(Ticket::Staff(String::from("admin")));
}
```

실행 결과는 아래와 같다.

```text
normal ticket
vip level = 3
staff = admin
```

`match` 안에서는 variant에 들어 있던 값을 바로 꺼내서 사용할 수 있다. `Ticket::Vip(level)`에서 `level`, `Ticket::Staff(name)`에서 `name`이 바로 바인딩되는 부분이 핵심이다.

단, 모든 경우를 다 쓸 필요는 없고 특정 패턴 하나만 간단히 확인하고 싶을 때는 `if let`이 편하다.

```rust
fn main() {
    let config_max = Some(5u8);

    if let Some(max) = config_max {
        println!("max = {}", max);
    } else {
        println!("no max value");
    }
}
```

실행 결과는 아래와 같다.

```text
max = 5
```

`if let`은 `match`의 축약형처럼 생각하면 된다. 경우가 많을 때는 `match`, 특정 패턴 하나만 빠르게 다룰 때는 `if let`이 잘 어울린다.

## Trait: 여러 타입의 공통 동작 정의하기

`trait`는 여러 타입이 공유해야 하는 동작의 약속이라고 보면 된다. Java의 interface와 비슷하게 느껴질 수 있지만 완전히 같지는 않다. Rust의 trait는 기본 메서드 구현을 둘 수도 있고, 같은 이름의 메서드가 있다고 해서 자동으로 trait를 만족하는 것도 아니다. Rust Book은 trait를 여러 타입이 공유하는 동작 계약으로 설명한다. [Traits: Defining Shared Behavior](https://doc.rust-lang.org/book/ch10-02-traits.html)

```rust
trait Summary {
    fn summarize(&self) -> String;
}

struct BlogPost {
    title: String,
    author: String,
}

struct NewsArticle {
    headline: String,
    reporter: String,
}

impl Summary for BlogPost {
    fn summarize(&self) -> String {
        format!("{} - {}", self.title, self.author)
    }
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{} ({})", self.headline, self.reporter)
    }
}

fn notify(item: &impl Summary) {
    println!("summary = {}", item.summarize());
}

fn main() {
    let post = BlogPost {
        title: String::from("Rust Traits"),
        author: String::from("K4NUL"),
    };

    let article = NewsArticle {
        headline: String::from("Rust 1.xx Released"),
        reporter: String::from("Dev Reporter"),
    };

    notify(&post);
    notify(&article);
}
```

실행 결과는 아래와 같다.

```text
summary = Rust Traits - K4NUL
summary = Rust 1.xx Released (Dev Reporter)
```

핵심은 `BlogPost`와 `NewsArticle`의 구조는 다르지만, 둘 다 `Summary`라는 같은 동작을 제공할 수 있다는 점이다. 그래서 `notify` 함수는 구체 타입을 몰라도 `Summary`를 구현했다는 사실만 알면 호출할 수 있다.

## 한 번에 보는 종합 예제

지금까지 본 내용을 한 파일에 모으면 아래처럼 정리할 수 있다.

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

fn notify(item: &impl Summary) {
    println!("summary = {}", item.summarize());
}

fn main() {
    let post = Article::new("Rust Structs and Traits", PostState::Published);

    notify(&post);

    if let PostState::Published = post.state {
        println!("This post can be shown to readers.");
    }
}
```

이 예제에는 `struct`, `enum`, `match`, `if let`, `trait`가 모두 들어 있다. 각각을 따로 실행해 본 뒤 마지막에 종합 예제를 보면, Rust가 데이터와 동작을 어떻게 묶는지 감이 훨씬 잘 잡힌다.

## 정리

이번 글에서는 Rust에서 데이터를 다루는 핵심 도구인 `struct`, `enum`, pattern matching, `trait`를 한 번에 정리했다. `struct`는 관련 필드를 묶는 데 적합하고, `enum`은 여러 경우 중 하나를 안전하게 표현하는 데 강력하다. 여기에 `match`와 `if let`을 이용하면 각 경우를 명확하게 꺼내 처리할 수 있고, `trait`를 사용하면 서로 다른 타입에 공통 동작을 부여할 수 있다.

다음 단계에서는 `Vec`, `HashMap`, iterator, error handling 같은 주제로 넘어가면서, 지금 배운 `struct`와 `enum`, `trait`가 실제 애플리케이션 코드에서 어떻게 연결되는지 이어서 보면 좋다.

## 출처 및 참고

- Rust Project Developers, [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- Rust Project Developers, [Defining and Instantiating Structs](https://doc.rust-lang.org/book/ch05-01-defining-structs.html)
- Rust Project Developers, [Method Syntax](https://doc.rust-lang.org/book/ch05-03-method-syntax.html)
- Rust Project Developers, [Defining an Enum](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html)
- Rust Project Developers, [match](https://doc.rust-lang.org/book/ch06-02-match.html)
- Rust Project Developers, [Concise Control Flow with if let](https://doc.rust-lang.org/book/ch06-03-if-let.html)
- Rust Project Developers, [Traits: Defining Shared Behavior](https://doc.rust-lang.org/book/ch10-02-traits.html)
