---
layout: single
description: "Rust의 변수, 기본 타입, 제어 흐름, 함수를 예제로 정리한 기초 문법 가이드."
title: "Rust 03. 변수, 타입, 제어흐름, 함수 기초"
lang: ko
translation_key: rust-variables-types-control-flow-functions
date: 2026-04-09 09:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, variables, types, control-flow, functions, cargo]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Rust를 처음 공부할 때 가장 먼저 익혀야 하는 문법은 변수, 타입, 제어흐름, 함수다. 이 네 가지를 이해하면 이후 `struct`, `enum`, `ownership`, `borrow` 같은 개념을 배울 때도 훨씬 덜 막힌다.

이 글은 Cargo 프로젝트 하나를 기준으로 변수의 기본 불변성, 자주 쓰는 타입, `if/loop/while/for/match`의 쓰임, 함수의 인자와 반환값 규칙을 한 번에 정리한다. 결론부터 말하면 "값을 어떻게 저장하고, 어떤 타입으로 읽고, 어떤 흐름으로 분기하고, 어떤 단위로 코드를 묶는가"를 같이 보는 편이 가장 이해가 빠르다.

## 문서 정보

- 작성일: 2026-04-09
- 검증 기준일: 2026-04-15
- 문서 성격: tutorial
- 테스트 환경: Cargo 프로젝트, Windows PowerShell 예시 명령, `src/main.rs`
- 테스트 버전: rustc 1.94.0, cargo 1.94.0
- 출처 등급: 공식 문서만 사용했다.
- 비고: 예제 출력과 에러 메시지는 구조 설명용이다. 세부 문구는 Rust 버전에 따라 조금 달라질 수 있다.

## 문제 정의

Rust 입문 단계에서 아래 네 가지는 따로 배우면 이해가 끊기기 쉽다.

- `let`과 `let mut`, shadowing의 차이
- 숫자, 문자열, 배열, 튜플 같은 기본 타입의 역할
- 조건문과 반복문이 어떤 상황에서 자연스러운지
- 함수의 인자, 반환값, 표현식 규칙

이 글은 위 네 가지를 각각 따로 외우기보다, 하나의 Cargo 프로젝트 안에서 바로 실행해 보며 연결하는 데 초점을 둔다. `struct`, `enum`, `Result`, `Option`, 고급 패턴 매칭은 범위에서 제외한다.

읽는 기준은 "값을 만든다, 타입을 붙인다, 흐름을 나눈다, 함수를 만든다"의 순서다. 지금 단계에서는 타입 표 전체나 모든 반복문 변형을 외우는 것보다, 코드 한 줄이 값을 새로 만드는지, 기존 값을 바꾸는지, 분기 결과를 돌려주는지 구분하는 것이 더 중요하다.

## 확인된 사실

- Rust 변수는 기본적으로 immutable이며, `mut`와 shadowing은 서로 다른 개념이다.
  근거: [Variables and Mutability](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html)
  의미: Rust에서 `let`은 "나중에 아무 때나 바꿀 수 있는 칸"이 아니라 기본적으로 고정된 바인딩을 만든다. 값을 바꿀지, 새 이름으로 다시 묶을지 의도를 코드에 드러내야 한다.
- Rust의 데이터 타입은 스칼라 타입과 복합 타입으로 나뉘고, `parse()` 같은 경우에는 타입 명시가 필요한 대표 사례가 있다.
  근거: [Data Types](https://doc.rust-lang.org/book/ch03-02-data-types.html)
  의미: 타입은 외울 목록이 아니라 컴파일러와 공유하는 기대값이다. `parse()`처럼 여러 타입으로 해석될 수 있는 작업에서는 목표 타입을 적어야 코드의 의도가 분명해진다.
- `if`는 `bool`를 요구하고, `loop`는 `break`로 값을 반환할 수 있으며, `while`과 `for`는 반복 목적에 따라 다르게 쓰인다.
  근거: [Control Flow](https://doc.rust-lang.org/book/ch03-05-control-flow.html)
  의미: Rust의 제어흐름은 조건과 반환값이 비교적 엄격하다. 이 엄격함 덕분에 "조건처럼 보이는 숫자"나 "반환값이 섞인 분기"를 초기에 잡을 수 있다.
- Rust 함수는 `fn`으로 정의하며, 마지막 표현식에 세미콜론이 없으면 그 값이 반환된다.
  근거: [How Functions Work](https://doc.rust-lang.org/book/ch03-03-how-functions-work.html)
  의미: Rust에서는 statement와 expression 차이가 함수 반환을 이해하는 핵심이다. 마지막 줄의 세미콜론 하나가 반환값 유무를 바꿀 수 있다.
- 입문 실습 흐름은 `cargo new` 프로젝트 기준으로 설명된다.
  근거: [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
  의미: 같은 파일을 계속 바꿔 실행하는 단계에서도 Cargo 프로젝트를 쓰면 이후 테스트, 모듈, 의존성 흐름으로 자연스럽게 이어진다.

## 직접 재현한 결과

### 1. 실습 프로젝트를 하나 만들고 `cargo run`으로 반복하는 편이 가장 편했다

- 직접 확인한 결과: 아래처럼 새 Cargo 프로젝트를 만든 뒤 `src/main.rs`에서 예제를 바꿔 가며 실행하는 흐름이 가장 자연스러웠다.

```powershell
cargo new rust-basic-syntax
cd rust-basic-syntax
code .
cargo run
```

### 2. 변수는 기본 불변, `mut`는 변경 가능, shadowing은 새 바인딩이었다

- 직접 확인한 결과: 아래 예제로 immutable 변수, mutable 변수, shadowing 차이를 한 번에 확인할 수 있었다.

```rust
fn main() {
    let count = 10;
    println!("count = {}", count);

    let mut level = 1;
    level = level + 1;
    println!("level = {}", level);

    let spaces = "   ";
    let spaces = spaces.len();
    println!("spaces length = {}", spaces);
}
```

- 관찰된 결과:

```text
count = 10
level = 2
spaces length = 3
```

- 읽는 법: `count`는 한 번 묶인 뒤 바뀌지 않고, `level`은 `mut` 때문에 재할당된다. `spaces`는 같은 이름을 다시 쓰지만 기존 값을 바꾸는 것이 아니라 새 타입의 새 바인딩을 만드는 shadowing이다.

- 직접 확인한 결과: immutable 변수에 재할당하면 아래처럼 컴파일 에러가 났다.

```rust
fn main() {
    let count = 10;
    count = 20;
}
```

```text
error[E0384]: cannot assign twice to immutable variable `count`
```

- 읽는 법: 이 에러는 Rust가 재할당 자체를 금지한다는 뜻이 아니라, immutable 바인딩에 재할당하려 했다는 뜻이다. 값을 바꿀 의도라면 `let mut count`로 시작하고, 타입이나 의미를 바꿔 다시 묶을 의도라면 shadowing을 쓴다.

### 3. 타입은 전부 외우기보다 자주 쓰는 것부터 예제로 보는 편이 쉬웠다

- 직접 확인한 결과: 아래 예제로 `i32`, `f64`, `bool`, `char`, `&str`, `String` 같은 초반 핵심 타입을 한 번에 확인할 수 있었다.

```rust
fn main() {
    let age: i32 = 29;
    let temperature: f64 = 36.5;
    let is_rust_fun: bool = true;
    let grade: char = 'A';
    let language: &str = "Rust";
    let message: String = String::from("hello");

    println!("age = {}", age);
    println!("temperature = {}", temperature);
    println!("is_rust_fun = {}", is_rust_fun);
    println!("grade = {}", grade);
    println!("language = {}", language);
    println!("message = {}", message);
}
```

- 관찰된 결과:

```text
age = 29
temperature = 36.5
is_rust_fun = true
grade = A
language = Rust
message = hello
```

- 직접 확인한 결과: `parse()`는 아래처럼 목표 타입을 적어 줘야 가장 명확하게 동작했다.

```rust
fn main() {
    let guess: i32 = "42".parse().expect("숫자를 입력해야 합니다.");
    println!("guess = {}", guess);
}
```

```text
guess = 42
```

- 읽는 법: `"42"`는 문자열이고 `guess`는 `i32`다. `parse()`가 성공했다는 결과보다 중요한 점은, 문자열을 어떤 숫자 타입으로 해석할지 코드가 명시했다는 점이다.

### 4. 제어흐름은 `if`, `loop`, `while`, `for`, `match`가 역할이 조금씩 달랐다

- 직접 확인한 결과: `if`는 반드시 `bool` 조건을 요구했고, 아래 예제는 홀짝 분기를 바로 보여 줬다.

```rust
fn main() {
    let number = 7;

    if number % 2 == 0 {
        println!("짝수입니다.");
    } else {
        println!("홀수입니다.");
    }
}
```

```text
홀수입니다.
```

- 읽는 법: `if` 조건에는 `number % 2 == 0`처럼 최종 결과가 `bool`인 식이 들어간다. C 계열 언어처럼 `0`이나 `1`을 조건처럼 쓰는 방식으로 읽으면 안 된다.

- 직접 확인한 결과: `loop`는 `break`와 함께 값을 돌려줄 수 있었다.

```rust
fn main() {
    let mut count = 0;

    let result = loop {
        count += 1;

        if count == 3 {
            break count * 10;
        }
    };

    println!("result = {}", result);
}
```

```text
result = 30
```

- 읽는 법: `loop`는 무한 반복만 뜻하지 않는다. `break count * 10`처럼 값을 돌려주는 식으로 쓰면 반복 결과를 변수에 저장할 수 있다.

- 직접 확인한 결과: `while`은 조건 기반 반복, `for`는 배열/범위 순회, `match`는 값 분기를 정리할 때 읽기 좋았다.

```rust
fn main() {
    let tools = ["rustc", "cargo", "clippy"];

    for tool in tools {
        println!("tool = {}", tool);
    }

    let score = 85;
    let grade = match score {
        90..=100 => "A",
        80..=89 => "B",
        70..=79 => "C",
        _ => "D",
    };

    println!("grade = {}", grade);
}
```

```text
tool = rustc
tool = cargo
tool = clippy
grade = B
```

### 5. 함수는 인자, 반환 타입, 마지막 표현식 규칙을 함께 봐야 이해가 쉬웠다

- 직접 확인한 결과: 아래 예제는 인자 전달, 반환 타입, 마지막 표현식 반환을 한 번에 보여 줬다.

```rust
fn print_user(name: &str, age: u32) {
    println!("name = {}, age = {}", name, age);
}

fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn max(a: i32, b: i32) -> i32 {
    if a > b {
        a
    } else {
        b
    }
}

fn main() {
    print_user("K4NUL", 30);

    let sum = add(10, 20);
    let bigger = max(7, 11);

    println!("sum = {}", sum);
    println!("bigger = {}", bigger);
}
```

- 관찰된 결과:

```text
name = K4NUL, age = 30
sum = 30
bigger = 11
```

- 읽는 법: `add`와 `max`의 마지막 줄은 값으로 끝나기 때문에 반환값이 된다. 반환값이 필요한 함수 마지막 줄에 세미콜론을 붙이면 `()`로 처리돼 의도한 타입과 맞지 않는 흐름이 생겼다.

### 6. 종합 예제로 다시 보면 개념 연결이 더 잘 보였다

- 직접 확인한 결과: 아래처럼 변수, 타입, `if`, `while`, `for`, `match`, 함수까지 한 파일에 묶어 두면 각각 따로 배운 규칙이 하나의 흐름으로 연결됐다.

```rust
fn describe_score(score: i32) -> &'static str {
    match score {
        90..=100 => "excellent",
        80..=89 => "good",
        70..=79 => "not bad",
        _ => "keep practicing",
    }
}

fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    let user = "rust beginner";
    let mut score = 70;
    score = score + 15;

    let level = if score >= 80 { "intermediate" } else { "starter" };
    let point: (i32, i32) = (10, 20);
    let numbers: [i32; 3] = [1, 2, 3];

    println!("user = {}", user);
    println!("score = {}", score);
    println!("level = {}", level);
    println!("point = ({}, {})", point.0, point.1);

    for number in numbers {
        println!("number = {}", number);
    }

    let total = add(10, 20);
    println!("total = {}", total);
    println!("description = {}", describe_score(score));
}
```

## 해석 / 의견

- 이 단계에서 중요한 판단: 변수, 타입, 제어흐름, 함수를 따로 외우기보다 하나의 `main.rs`에서 번갈아 실행하며 보는 편이 훨씬 이해가 빠르다.
- 선택 기준: 타입 표 전체를 한 번에 암기하기보다 `i32`, `bool`, `&str`, `String`처럼 이후 글에서 계속 반복될 타입부터 익힌다.
- 해석: 이 단계에서 가장 중요한 것은 문법을 많이 아는 것이 아니라 "값을 저장하고, 분기하고, 반복하고, 함수로 묶는 기본 감각"을 만드는 일이다.

## 한계와 예외

- 이 글은 Cargo 프로젝트 기준의 가장 기초 문법만 다룬다. `struct`, `enum`, `Result`, `Option`, iterator 심화는 범위 밖이다.
- 에러 메시지 문구와 일부 타입 추론 결과는 Rust 버전에 따라 조금 달라질 수 있다.
- macOS, Linux, WSL 같은 환경 차이는 다루지 않았다.
- `match`는 더 깊은 주제이지만, 이 글에서는 입문 수준의 값 분기 예제로만 사용했다.
- 이 글을 읽고도 남는 질문은 `Option`, `Result`, 소유권이 함수 인자에 미치는 영향이며, 이는 다음 ownership과 error handling 글에서 다루는 편이 자연스럽다.

## 참고자료

- [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- [Variables and Mutability](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html)
- [Data Types](https://doc.rust-lang.org/book/ch03-02-data-types.html)
- [How Functions Work](https://doc.rust-lang.org/book/ch03-03-how-functions-work.html)
- [Control Flow](https://doc.rust-lang.org/book/ch03-05-control-flow.html)
- [match](https://doc.rust-lang.org/book/ch06-02-match.html)
