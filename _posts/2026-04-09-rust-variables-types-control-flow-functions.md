---
layout: single
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

Rust를 처음 공부할 때 가장 먼저 익혀야 하는 문법은 변수, 타입, 제어흐름, 함수다. 이 4가지를 이해하면 이후에 `struct`, `enum`, `ownership`, `borrow` 같은 개념을 배울 때도 훨씬 수월하다. 이 글에서는 Cargo 프로젝트 하나를 기준으로 각 문법을 하나씩 설명하고, 바로 실행해 볼 수 있는 예제까지 함께 정리한다.

## 검증 기준과 재현 범위

- 시점: 2026-04-15 기준 Rust Book 3장과 Cargo 기본 흐름을 확인했다.
- 출처 등급: 공식 문서만 사용했다.
- 재현 환경: Cargo 프로젝트, Windows PowerShell 예시 명령, `src/main.rs`.
- 주의: 예제 출력은 코드 구조 설명용이며, 타입 표기와 에러 메시지 일부는 Rust 버전에 따라 달라질 수 있다.


## 실습 프로젝트 만들기

예제는 아래처럼 새 Cargo 프로젝트를 만든 뒤 `src/main.rs`에서 실행하면 된다.
근거: Rust Book은 초기 실습 흐름을 `cargo new` 프로젝트 기준으로 설명한다. [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)

```powershell
cargo new rust-basic-syntax
cd rust-basic-syntax
code .
```

예제를 붙여 넣은 뒤에는 아래 명령으로 실행하면 된다.

```powershell
cargo run
```

## 변수

Rust의 변수는 기본적으로 변경 불가능하다. 즉, `let`으로 만든 값은 다시 대입할 수 없고, 값을 바꾸려면 `mut`를 붙여 `let mut` 형태로 선언해야 한다.
근거: Rust Book의 변수 장은 기본 불변성, `mut`, shadowing을 함께 설명한다. [Variables and Mutability](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html)

아래 예제는 변경 불가능한 변수, 변경 가능한 변수, 그리고 섀도잉(shadowing)을 함께 보여 준다.

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

위 코드에서 핵심은 아래 3가지다.

- `count`는 `let`으로 선언했기 때문에 다시 값을 넣을 수 없다.
- `level`은 `let mut`으로 선언했기 때문에 값을 바꿀 수 있다.
- `spaces`는 섀도잉(shadowing) 예제다. 같은 이름을 다시 `let`으로 선언해서 문자열을 길이 값으로 덮어쓴다.

예를 들어 아래처럼 `let`으로 선언한 변수에 다시 값을 넣으려고 하면 컴파일 에러가 난다.

```rust
fn main() {
    let count = 10;
    count = 20;
}
```

Rust는 이 경우 `count`가 불변 변수이므로 재할당할 수 없다고 알려 준다.

![불변 변수 재할당 에러]({{ '/images/rust_03/let_error.png' | relative_url }})

값을 바꾸고 싶다면 아래처럼 `mut`를 붙여 선언해야 한다.

```rust
fn main() {
    let mut count = 10;
    count = 20;

    println!("count = {}", count);
}
```

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_03/변수예제결과.png' | relative_url }}" alt="변수 예제 결과">

섀도잉(shadowing)은 `mut`와 다르다. `mut`는 같은 변수의 값을 변경하는 것이고, 섀도잉(shadowing)은 같은 이름의 새 변수를 다시 만드는 것이다. 그래서 섀도잉(shadowing)은 타입까지 바꾸는 데 쓸 수 있다.

## 타입

Rust는 타입 추론이 꽤 강한 편이라 많은 경우 타입을 직접 쓰지 않아도 된다. 하지만 Rust에 어떤 타입들이 있는지 한 번에 보고 넘어가면 이후 문법을 이해하기가 훨씬 편하다. 먼저 초반에 자주 보게 되는 기본 타입들을 표로 정리하면 아래와 같다.
근거: Rust Book의 데이터 타입 장은 스칼라, 복합 타입, 타입 명시가 필요한 대표 사례를 다룬다. [Data Types](https://doc.rust-lang.org/book/ch03-02-data-types.html)

| 분류 | 타입 | 설명 |
| --- | --- | --- |
| 부호 있는 정수 | `i8`, `i16`, `i32`, `i64`, `i128`, `isize` | 음수와 양수를 모두 저장할 수 있는 정수 타입이다. 일반적으로 `i32`를 가장 자주 본다. |
| 부호 없는 정수 | `u8`, `u16`, `u32`, `u64`, `u128`, `usize` | 0 이상만 저장하는 정수 타입이다. 인덱스에는 `usize`가 자주 등장한다. |
| 부동소수점 | `f32`, `f64` | 소수점을 포함하는 실수 타입이다. 보통 `f64`를 더 많이 사용한다. |
| 논리값 | `bool` | `true` 또는 `false` 값을 가진다. |
| 문자 | `char` | 작은따옴표를 사용하는 문자 하나를 저장한다. |
| 문자열 슬라이스 | `&str` | 읽기 전용 문자열 참조다. 문자열 리터럴이 여기에 해당한다. |
| 문자열 | `String` | 소유권을 가지는 가변 문자열 타입이다. |
| 튜플 | `(T1, T2, ...)` | 여러 값을 하나로 묶는다. 서로 다른 타입도 함께 넣을 수 있다. |
| 배열 | `[T; N]` | 같은 타입의 값을 고정 길이로 저장한다. |

처음에는 위 타입을 다 외우려고 하기보다, 자주 쓰는 타입부터 예제로 익히는 편이 좋다.

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

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_03/타입예제결과.png' | relative_url }}" alt="타입 예제 결과">

위 예제에서 특히 자주 쓰는 타입은 아래처럼 보면 된다.

- `i32`: 가장 기본적인 정수 예제로 자주 등장한다.
- `f64`: 실수 계산에서 기본처럼 많이 사용된다.
- `bool`: 조건문과 함께 거의 항상 사용된다.
- `char`: 문자 하나를 저장할 때 사용한다.
- `&str`: 문자열 리터럴을 다룰 때 가장 자주 보게 된다.
- `String`: 문자열을 소유하고 수정 가능한 형태로 다룰 때 사용한다.

tuple과 array도 기본 타입이지만, 일단 초반에는 위 타입들에 익숙해지는 것만으로도 충분하다. tuple과 array는 이 글의 종합 예제에서 다시 등장한다.

타입 명시가 왜 필요한지 보여 주는 대표적인 예제는 문자열 파싱이다.

```rust
fn main() {
    let guess: i32 = "42".parse().expect("숫자를 입력해야 합니다.");
    println!("guess = {}", guess);
}
```

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_03/문자열파싱예제.png' | relative_url }}" alt="문자열 파싱 예제 결과">

`parse()`만 보면 문자열을 어떤 숫자 타입으로 바꿔야 하는지 애매하기 때문에, `guess: i32`처럼 타입을 알려 줘야 컴파일러가 올바르게 처리할 수 있다.

## 제어흐름

제어흐름은 프로그램이 어떤 순서로 실행될지 결정하는 문법이다. Rust에서는 `if`, `loop`, `while`, `for`, `match`를 자주 사용한다.

### if

`if`는 조건에 따라 다른 코드를 실행할 때 사용한다.
근거: Rust Book의 제어흐름 장은 `if`가 `bool` 조건을 요구하고 표현식으로도 쓰인다고 설명한다. [Control Flow](https://doc.rust-lang.org/book/ch03-05-control-flow.html)

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

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_03/if문예제.png' | relative_url }}" alt="if문 예제 결과">

Rust의 `if`는 조건식이 반드시 `bool`이어야 한다. C 언어나 JavaScript처럼 숫자를 조건문에 바로 넣는 방식은 허용되지 않는다.

또한 `if`는 표현식으로도 사용할 수 있다.

```rust
fn main() {
    let score = 85;
    let result = if score >= 80 { "pass" } else { "retry" };

    println!("result = {}", result);
}
```

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_03/if 표현식 예제 결과.png' | relative_url }}" alt="if 표현식 예제 결과">

### loop

`loop`는 명시적으로 `break`를 만날 때까지 계속 반복한다.
근거: Rust Book은 `loop`와 `break` 반환값 패턴을 공식 예제로 설명한다. [Control Flow](https://doc.rust-lang.org/book/ch03-05-control-flow.html)

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

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_03/loop예제 결과.png' | relative_url }}" alt="loop 예제 결과">

Rust의 `loop`는 `break`와 함께 값을 돌려줄 수 있다는 점이 특징이다. 위 예제에서는 `count == 3`일 때 `30`이 `result`에 저장된다.

### while

`while`은 조건이 참인 동안 반복할 때 사용한다.
근거: Rust Book은 조건 기반 반복에서 `while` 사용 예시를 제공한다. [Control Flow](https://doc.rust-lang.org/book/ch03-05-control-flow.html)

```rust
fn main() {
    let mut remaining = 3;

    while remaining > 0 {
        println!("remaining = {}", remaining);
        remaining -= 1;
    }

    println!("start");
}
```

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_03/while예제 결과.png' | relative_url }}" alt="while 예제 결과">

반복 횟수가 조건에 의해 자연스럽게 줄어드는 경우에는 `while`이 읽기 쉽다.

### for

`for`는 배열, 벡터, 범위 같은 반복 가능한 값을 순회할 때 가장 자주 쓰는 문법이다.
근거: Rust Book은 배열과 범위를 순회할 때 `for`를 사용하는 흐름을 소개한다. [Control Flow](https://doc.rust-lang.org/book/ch03-05-control-flow.html)

```rust
fn main() {
    let tools = ["rustc", "cargo", "clippy"];

    for tool in tools {
        println!("tool = {}", tool);
    }

    for number in 1..=3 {
        println!("number = {}", number);
    }
}
```

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_03/for문 예제 결과.png' | relative_url }}" alt="for문 예제 결과">

실무에서도 단순 카운팅 반복보다 `for`를 훨씬 많이 쓴다. 특히 컬렉션을 돌 때는 `while`보다 `for`가 더 안전하고 코드도 짧다.

### match

Rust에서 분기 처리를 더 명확하게 쓰고 싶을 때는 `match`가 매우 자주 등장한다.
근거: Rust Book은 `match`를 6장에서 자세히 다루지만, 제어흐름 기초와 함께 보면 분기 구조 이해에 도움이 된다. [Control Flow](https://doc.rust-lang.org/book/ch03-05-control-flow.html), [match](https://doc.rust-lang.org/book/ch06-02-match.html)

```rust
fn main() {
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

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_03/match문 예제 결과.png' | relative_url }}" alt="match문 예제 결과">

`match`는 값의 경우를 빠짐없이 처리하도록 강제하는 데 강점이 있다. 그래서 단순한 `if/else if`보다 더 읽기 쉽고 안전한 경우가 많다.

## 함수

함수는 반복되는 코드를 묶고, 입력과 출력을 명확하게 나누는 가장 기본적인 단위다. Rust에서는 `fn` 키워드로 함수를 정의한다.
근거: Rust Book의 함수 장은 `fn`, 인자, 반환 타입, 표현식과 세미콜론 차이를 함께 설명한다. [How Functions Work](https://doc.rust-lang.org/book/ch03-03-how-functions-work.html)

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

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_03/함수 예제 결과.png' | relative_url }}" alt="함수 예제 결과">

이 예제에서 볼 점은 아래와 같다.

- `print_user`는 반환 타입을 명시하지 않았기 때문에 `()`를 반환한다.
- `add`와 `max`는 `-> i32`처럼 반환 타입을 명시했다.
- `a + b`처럼 줄 끝에 세미콜론이 없으면 그 값이 반환된다.

Rust에서 세미콜론은 중요하다. 아래처럼 마지막 줄에 세미콜론을 붙이면 반환값이 아니라 단순한 statement가 되므로 의도한 타입과 맞지 않아 오류가 날 수 있다.

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b;
}
```

이 경우 마지막 줄의 결과는 `i32`가 아니라 `()`로 처리되기 때문에, 함수 선언의 반환 타입인 `i32`와 맞지 않아 컴파일 에러가 난다.

즉, 반환값이 필요한 함수에서는 마지막 표현식에 세미콜론을 붙이지 않는 습관이 중요하다.

## 한 번에 보는 종합 예제

지금까지 본 내용을 한 파일에 모으면 아래처럼 정리할 수 있다.

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

    let mut countdown = 3;
    while countdown > 0 {
        println!("countdown = {}", countdown);
        countdown -= 1;
    }

    let total = add(10, 20);
    println!("total = {}", total);
    println!("description = {}", describe_score(score));
}
```

이 예제에는 변수, 타입, `if`, `while`, `for`, `match`, 함수 선언과 반환값이 모두 들어 있다. 처음에는 각각 따로 실행해 보고, 마지막에 종합 예제를 한 번 더 돌려 보면 흐름이 더 잘 잡힌다.

## 정리

이번 글에서는 Rust의 가장 기본이 되는 변수, 타입, 제어흐름, 함수를 한 번에 정리했다. `let`과 `let mut`의 차이, 숫자와 문자 같은 기본 타입, `if/loop/while/for/match`의 용도, 그리고 함수의 인자와 반환값 문법을 이해하면 이후 문법을 익히는 속도가 훨씬 빨라진다.

다음 단계로는 `ownership`, `borrow`, `reference`를 배우면서 왜 Rust가 메모리 안전성과 성능을 동시에 가져갈 수 있는지 이해해 보면 좋다.

## 출처 및 참고

- Rust Project Developers, [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- Rust Project Developers, [Variables and Mutability](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html)
- Rust Project Developers, [Data Types](https://doc.rust-lang.org/book/ch03-02-data-types.html)
- Rust Project Developers, [How Functions Work](https://doc.rust-lang.org/book/ch03-03-how-functions-work.html)
- Rust Project Developers, [Control Flow](https://doc.rust-lang.org/book/ch03-05-control-flow.html)
- Rust Project Developers, [match](https://doc.rust-lang.org/book/ch06-02-match.html)
