---
layout: single
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

Rust를 배우다 보면 변수나 함수 문법보다 더 자주 듣게 되는 단어가 `ownership`, `borrowing`, `lifetime`이다. 이 개념들은 Rust가 가비지 컬렉터 없이도 메모리 안전성을 지키는 핵심 규칙이다. 처음에는 다소 낯설게 느껴질 수 있지만, `move`, 참조, 스코프라는 3가지만 차근차근 이해하면 흐름이 훨씬 선명해진다.

이번 글에서는 `String` 예제를 중심으로 ownership이 어떻게 이동하는지, 빌림(borrowing)은 왜 필요한지, 그리고 lifetime annotation이 어떤 상황에서 등장하는지를 한 번에 정리한다.

## 검증 기준과 재현 범위

- 시점: 2026-04-15 기준 Rust Book 4장과 10장 lifetime 문법을 확인했다.
- 출처 등급: 공식 문서만 사용했다.
- 재현 환경: Cargo 프로젝트, `String`/reference 예제, `src/main.rs`.
- 주의: lifetime annotation 예제는 개념 설명용이므로 실제 코드에서는 추론 가능한 경우가 더 많다.


## 실습 프로젝트 만들기

아래처럼 새 Cargo 프로젝트를 만든 뒤 `src/main.rs`에서 예제를 하나씩 실행해 보면 된다.
근거: Rust Book의 입문 실습 흐름은 `cargo new` 프로젝트를 기준으로 한다. [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)

```powershell
cargo new rust-ownership-basics
cd rust-ownership-basics
code .
```

예제를 붙여 넣은 뒤에는 아래 명령으로 실행하면 된다.

```powershell
cargo run
```

## Ownership이 왜 중요한가

Rust는 값을 아무 데서나 자유롭게 복사하고 해제하게 두지 않는다. 대신 어떤 값이 누구의 책임 아래 있는지를 컴파일 시점에 명확히 확인한다. 이때 사용하는 개념이 ownership이다.
근거: Rust Book은 ownership을 값의 책임과 메모리 안전성을 연결하는 핵심 개념으로 설명한다. [What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)

ownership의 핵심 규칙은 아래 3가지다.

- 모든 값은 owner를 하나 가진다.
- 한 시점에 owner는 하나만 존재한다.
- owner가 스코프를 벗어나면 값은 제거된다.

이 규칙 덕분에 Rust는 이중 해제(double free), 해제된 메모리 접근(use-after-free), 데이터 레이스 같은 문제를 미리 막을 수 있다.

## 스코프와 Drop

가장 먼저 봐야 할 것은 값이 스코프를 벗어날 때 어떻게 정리되는가다.
근거: Rust Book은 값이 스코프를 벗어날 때 `drop`으로 정리되는 흐름을 ownership 장에서 설명한다. [What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)

```rust
fn main() {
    {
        let message = String::from("hello");
        println!("{}", message);
    }

    // 여기서는 message를 더 이상 사용할 수 없다.
}
```

`message`는 중괄호 안에서만 유효하다. 블록이 끝나면 owner도 사라지고, Rust는 그 시점에 `String`이 잡고 있던 메모리를 정리한다. C++의 RAII와 비슷하게 느껴질 수 있지만, Rust는 이 규칙을 ownership과 borrow checker로 훨씬 엄격하게 확인한다.

## Move: 소유권 이동

Rust에서 `String` 같은 타입은 단순 대입을 하면 복사라기보다 소유권 이동(move)으로 처리된다.
근거: Rust Book은 `String` 대입이 단순 복사가 아니라 move로 처리된다고 설명한다. [What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("{}", s2);
}
```

이 코드에서 `s1`의 ownership은 `s2`로 이동한다. 그래서 `s2`는 정상적으로 사용할 수 있지만, `s1`은 더 이상 유효하지 않다.

아래처럼 `s1`을 다시 사용하려고 하면 컴파일 에러가 난다.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("{}", s1);
    println!("{}", s2);
}
```

컴파일 에러는 아래와 같다.

<img src="{{ '/images/rust_04/move 소유권 이동 오류 결과.png' | relative_url }}" alt="move 소유권 이동 오류 결과">

왜 이렇게 동작할까? `String`은 문자열 데이터를 힙(heap)에 저장한다. 만약 대입 시 얕은 복사만 허용하고 `s1`, `s2`가 같은 데이터를 동시에 owner처럼 다루게 두면, 둘 다 스코프를 벗어날 때 같은 메모리를 두 번 해제할 위험이 생긴다. Rust는 이런 상황을 막기 위해 대입 순간 기존 변수의 사용을 금지한다.

## Clone과 Copy의 차이

정말로 데이터를 복사하고 싶다면 `clone()`을 사용해야 한다.
근거: Rust Book은 `clone`, stack-only `Copy`, move의 차이를 ownership 장에서 구분한다. [What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();

    println!("s1 = {}", s1);
    println!("s2 = {}", s2);
}
```

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_04/clone과 copy의 차이 결과 1.png' | relative_url }}" alt="clone과 copy의 차이 결과 1">

이 경우 `s1`과 `s2`는 각각 별도의 문자열 데이터를 가진다. 즉, 힙 데이터까지 명시적으로 복사된다.

반면 `Copy`는 단순히 "크기가 작고 스택에 있다"는 뜻은 아니다. Rust에서는 타입의 모든 구성 요소가 `Copy`이고, `Drop`처럼 별도 정리 책임이 없을 때 `Copy`를 구현할 수 있다. 이런 타입은 대입해도 ownership이 이동하지 않고 값이 그대로 복사된다.

```rust
fn main() {
    let x = 10;
    let y = x;

    println!("x = {}", x);
    println!("y = {}", y);
}
```

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_04/clone과 copy의 차이 결과 2.png' | relative_url }}" alt="clone과 copy의 차이 결과 2">

`i32`, `bool`, `char`, 고정 크기 튜플 일부, 공유 참조 `&T` 등은 이런 식으로 복사가 자연스럽게 일어난다. 반대로 `String`, `Vec<T>`처럼 자원을 소유하거나 `Drop`으로 정리가 필요한 타입은 기본적으로 `Copy`가 아니다.

## Borrowing: 소유권을 넘기지 않고 빌려 쓰기

함수에 값을 넘길 때마다 ownership이 이동해 버리면 코드가 금방 불편해진다. 그래서 Rust는 참조(reference)를 통해 값을 빌려 쓰는 borrowing을 사용한다.
근거: Rust Book은 참조를 통한 borrowing과 함수 인자 전달 패턴을 별도 장으로 설명한다. [References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)

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

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_04/Borrowing 결과.png' | relative_url }}" alt="Borrowing 결과">

위 코드에서 `print_length`는 `&str` 참조를 받는다. `message` 자체의 ownership은 여전히 `main` 안에 있고, 함수는 잠깐 빌려서 길이만 확인한다. 그래서 함수 호출 뒤에도 `message`를 계속 사용할 수 있다.

초반에는 `&String`과 `&str`가 헷갈릴 수 있는데, 읽기 전용 문자열 인자를 받을 때는 보통 더 범용적인 `&str`를 선호한다.

## Immutable Borrow와 Mutable Borrow

참조는 크게 immutable borrow와 mutable borrow로 나뉜다.
근거: Rust Book은 immutable reference와 mutable reference의 규칙을 예제로 보여 준다. [References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)

immutable borrow는 여러 개를 동시에 가질 수 있다.

```rust
fn main() {
    let message = String::from("rust");

    let r1 = &message;
    let r2 = &message;

    println!("{}, {}", r1, r2);
}
```

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_04/immutable borrow와 mutable borrow 결과 1.png' | relative_url }}" alt="immutable borrow와 mutable borrow 결과 1">

읽기만 하는 참조는 동시에 여러 개 있어도 안전하기 때문이다.

반면 값을 수정하려면 mutable borrow가 필요하다.

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

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_04/immutable borrow와 mutable borrow 결과 2.png' | relative_url }}" alt="immutable borrow와 mutable borrow 결과 2">

여기서 중요한 점은 mutable borrow는 같은 시점에 하나만 허용된다는 것이다. 또한 immutable borrow가 살아 있는 동안에는 mutable borrow를 만들 수 없다.

아래 코드는 에러가 난다.

```rust
fn main() {
    let mut text = String::from("hello");

    let r1 = &text;
    let r2 = &mut text;

    println!("{}, {}", r1, r2);
}
```

에러 메시지는 아래와 같다.

<img src="{{ '/images/rust_04/immutable borrow와 mutable borrow 오류 결과.png' | relative_url }}" alt="immutable borrow와 mutable borrow 오류 결과">

이유는 한쪽에서는 읽고 있고, 다른 한쪽에서는 동시에 수정하려 하기 때문이다. Rust는 이런 충돌을 컴파일 단계에서 차단한다.

필요하다면 참조의 사용 시점을 분리해서 해결할 수 있다.

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

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_04/immutable borrow와 mutable borrow 결과 3.png' | relative_url }}" alt="immutable borrow와 mutable borrow 결과 3">

먼저 immutable borrow를 끝내고, 그다음 mutable borrow를 만들면 문제가 없다.

## Dangling Reference와 Lifetime이 필요한 이유

borrowing 규칙은 dangling reference도 막아 준다. dangling reference는 이미 해제된 값을 가리키는 참조다.
근거: Rust Book은 dangling reference를 borrowing 규칙으로 막고, lifetime 문법 장에서 참조 관계를 설명한다. [References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html), [Validating References with Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)

아래 코드는 허용되지 않는다.

```rust
fn dangle() -> &String {
    let text = String::from("hello");
    &text
}
```

`text`는 함수가 끝날 때 제거되는데, 그 참조를 바깥으로 반환하면 이미 사라진 데이터를 가리키게 된다. Rust는 이를 컴파일 단계에서 막는다.

이 경우는 참조가 아니라 ownership 자체를 반환하면 된다.

```rust
fn no_dangle() -> String {
    let text = String::from("hello");
    text
}
```

## Lifetime Annotation이 등장하는 대표 예제

대부분의 참조는 컴파일러가 lifetime을 추론해 준다. 하지만 함수가 여러 참조를 받아서, 반환 참조가 누구와 연결되는지 명확히 알려 줘야 하는 경우에는 lifetime annotation이 필요하다.
근거: Rust Book은 여러 참조 중 하나를 반환하는 함수에서 lifetime annotation이 필요한 대표 예제를 제시한다. [Validating References with Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)

대표적인 예제가 `longest` 함수다.

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() >= y.len() {
        x
    } else {
        y
    }
}
```

여기서 `'a`는 실제 시간을 의미하는 값이 아니라, 참조들의 유효 범위를 연결하는 표기다. 위 함수는 반환값이 `x`와 `y` 중 더 오래 사는 참조를 무조건 돌려준다는 뜻이 아니라, 반환 참조가 두 입력 참조의 공통으로 유효한 범위 안에서만 살아 있을 수 있다는 의미다. 실질적으로는 두 입력 중 더 짧은 lifetime에 맞춰 안전하게 사용해야 한다고 이해하면 된다.

사용 예제는 아래와 같다.

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

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_04/lifetime Annotation 예제.png' | relative_url }}" alt="lifetime annotation 예제 결과">

이 코드는 `first`와 `second`가 모두 `main` 안에서 충분히 오래 살아 있기 때문에 안전하다.

## Struct에 참조를 저장할 때의 Lifetime

구조체가 참조를 필드로 가지는 경우에도 lifetime을 명시해야 한다.
근거: Rust Book은 참조를 필드로 가지는 struct에 lifetime parameter가 필요하다고 설명한다. [Validating References with Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)

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

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_04/struct에 참조를 저장할 때의 Lifetime 결과.png' | relative_url }}" alt="struct에 참조를 저장할 때의 lifetime 결과">

`Highlight<'a>`는 구조체가 들고 있는 `part` 참조가 최소한 `'a` 동안은 유효하다는 뜻이다. 즉, 구조체가 원본 문자열보다 오래 살아남을 수 없도록 제한하는 것이다.

## 한 번에 보는 종합 예제

지금까지 본 내용을 한 파일에 모으면 아래처럼 정리할 수 있다.

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

이 예제에는 immutable borrow, mutable borrow, lifetime annotation, 그리고 참조를 담는 구조체가 모두 들어 있다. 처음에는 각 예제를 따로 실행해 보고, 마지막에 종합 예제를 돌려 보면 개념 연결이 더 잘 된다.

## 정리

이번 글에서는 Rust의 ownership, borrowing, lifetime을 한 흐름으로 정리했다. 핵심은 `String` 같은 값은 대입 시 move가 일어나고, ownership을 유지한 채 사용하려면 참조로 빌려야 하며, 여러 참조의 관계가 애매해지는 순간 lifetime annotation으로 유효 범위를 연결해 준다는 점이다.

처음에는 borrow checker가 불편하게 느껴질 수 있지만, 이 규칙에 익숙해지면 런타임이 아니라 컴파일 시점에 문제를 잡아 주는 장점이 매우 크게 다가온다. 다음 단계에서는 `struct`, `enum`, `Result`, `Option` 같은 타입과 함께 ownership 규칙이 실제 코드에서 어떻게 활용되는지 이어서 보면 좋다.

## 출처 및 참고

- Rust Project Developers, [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- Rust Project Developers, [What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)
- Rust Project Developers, [References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)
- Rust Project Developers, [Validating References with Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)
