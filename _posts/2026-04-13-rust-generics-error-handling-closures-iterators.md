---
layout: single
title: "Rust 06. Generics, Error Handling, Closures, Iterators 기초"
lang: ko
translation_key: rust-generics-error-handling-closures-iterators
date: 2026-04-13 10:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, generics, error-handling, closures, iterators]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

Rust를 조금 더 익숙하게 쓰기 시작하면, 같은 로직을 여러 타입에 재사용하는 방법, 실패를 안전하게 처리하는 방법, 함수를 값처럼 다루는 방법, 그리고 컬렉션 데이터를 깔끔하게 순회하는 방법이 중요해진다. 이때 핵심이 되는 주제가 `generics`, error handling, closure, iterator다.

이번 글에서는 이 네 가지를 초급자 기준으로 정리한다. 각각 따로 보면 문법처럼 느껴질 수 있지만, 실제 Rust 코드에서는 자주 함께 등장한다.

## 검증 기준과 재현 범위

- 시점: 2026-04-15 기준 Rust Book 9장, 10장, 13장을 확인했다.
- 출처 등급: 공식 문서만 사용했다.
- 재현 환경: Cargo 프로젝트, `src/main.rs`, `Result`와 iterator 예제.
- 주의: 이 글은 초반 실무 감각을 잡기 위한 요약이므로 iterator adaptor 전체나 고급 에러 설계는 생략한다.


## 실습 프로젝트 만들기

아래처럼 새 Cargo 프로젝트를 만든 뒤 `src/main.rs`에서 예제를 하나씩 실행해 보면 된다.
근거: Rust Book의 입문 예제는 `cargo new` 기반 실습 흐름을 전제로 한다. [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)

```powershell
cargo new rust-generics-errors-closures
cd rust-generics-errors-closures
code .
```

예제를 붙여 넣은 뒤에는 아래 명령으로 실행하면 된다.

```powershell
cargo run
```

## Generics: 타입을 일반화하기

generic은 같은 로직을 여러 타입에 재사용할 수 있게 해 주는 문법이다. 예를 들어 가장 큰 값을 찾는 함수는 `i32` 배열에도, `char` 배열에도 비슷한 방식으로 쓸 수 있다.
근거: Rust Book은 generic type parameter를 중복 제거와 재사용을 위한 핵심 문법으로 소개한다. [Generic Data Types](https://doc.rust-lang.org/book/ch10-01-syntax.html)

```rust
fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];

    for &item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let numbers = [10, 40, 20, 30];
    let chars = ['a', 'z', 'm'];

    println!("largest number = {}", largest(&numbers));
    println!("largest char = {}", largest(&chars));
}
```

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_06/Generics 타입 일반화하기 예제 결과 1.png' | relative_url }}" alt="Generics 타입 일반화하기 예제 결과 1">

여기서 `T`는 아직 구체적으로 정해지지 않은 타입 자리라고 보면 된다. 대신 아무 타입이나 받을 수 있는 것은 아니고, `>` 비교를 위해 `PartialOrd`, 값을 복사해서 반환하기 위해 `Copy`가 필요하다는 조건을 붙였다.

generic은 struct에도 자주 사용한다.

```rust
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let int_point = Point { x: 10, y: 20 };
    let float_point = Point { x: 1.5, y: 2.5 };

    println!("int_point = ({}, {})", int_point.x, int_point.y);
    println!("float_point = ({}, {})", float_point.x, float_point.y);
}
```

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_06/Generics 타입 일반화하기 예제 결과 2.png' | relative_url }}" alt="Generics 타입 일반화하기 예제 결과 2">

`Point<T>`는 같은 타입 `T`를 가지는 좌표를 표현한다. 이처럼 generic을 쓰면 코드 중복을 줄이면서도 타입 안전성은 그대로 유지할 수 있다.

## Error Handling: Result와 ? 연산자

Rust는 실패 가능성을 숨기지 않는다. recoverable error는 보통 `Result<T, E>`로 표현하고, 성공이면 `Ok`, 실패면 `Err`를 사용한다.
근거: Rust Book은 recoverable error를 `Result<T, E>`와 `?` 연산자 중심으로 설명한다. [Recoverable Errors with Result](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html)

```rust
fn safe_divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("0으로 나눌 수 없습니다."))
    } else {
        Ok(a / b)
    }
}

fn main() {
    match safe_divide(10.0, 2.0) {
        Ok(value) => println!("result = {}", value),
        Err(message) => println!("error = {}", message),
    }

    match safe_divide(10.0, 0.0) {
        Ok(value) => println!("result = {}", value),
        Err(message) => println!("error = {}", message),
    }
}
```

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_06/Error handling 예제 결과 1.png' | relative_url }}" alt="Error handling 예제 결과 1">

이 예제처럼 `match`로 `Ok`와 `Err`를 나누어 처리하면, 실패 상황을 빼먹지 않고 다룰 수 있다.

Rust에서는 `?` 연산자로 error 전달을 더 짧게 쓸 수도 있다.

```rust
fn add_parsed(a: &str, b: &str) -> Result<i32, std::num::ParseIntError> {
    let first = a.parse::<i32>()?;
    let second = b.parse::<i32>()?;

    Ok(first + second)
}

fn main() {
    match add_parsed("10", "20") {
        Ok(value) => println!("sum = {}", value),
        Err(error) => println!("error = {}", error),
    }
}
```

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_06/Error handling 예제 결과 2.png' | relative_url }}" alt="Error handling 예제 결과 2">

`?`는 `Err`가 나오면 바로 바깥으로 반환하고, `Ok`면 안의 값만 꺼내는 역할을 한다. 단, 이런 조기 반환이 가능하려면 바깥 함수의 반환 타입도 `Result`처럼 그 error와 호환되어야 한다. 그래서 여러 단계의 실패 가능성이 있는 코드를 훨씬 읽기 쉽게 만들 수 있다.

## Closures: 이름 없는 함수

closure는 이름 없이 바로 정의해서 변수에 담아 둘 수 있는 함수다. 보통 짧은 로직을 전달하거나, 주변 환경의 값을 캡처할 때 자주 쓴다.
근거: Rust Book은 closure를 환경을 캡처할 수 있는 익명 함수로 설명한다. [Closures](https://doc.rust-lang.org/book/ch13-01-closures.html)

```rust
fn main() {
    let bonus = 5;
    let add_bonus = |score: i32| score + bonus;

    println!("result = {}", add_bonus(10));
}
```

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_06/closures 예제 결과 1.png' | relative_url }}" alt="closures 예제 결과 1">

위 예제에서 closure는 바깥 변수 `bonus`를 그대로 사용한다. 이런 식으로 주변 스코프 값을 캡처한다는 점이 일반 함수와 closure의 큰 차이 중 하나다.

closure는 타입 추론도 꽤 잘 되는 편이라 아래처럼 더 짧게 쓸 때도 많다.

```rust
fn main() {
    let multiply = |a, b| a * b;
    println!("result = {}", multiply(3, 4));
}
```

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_06/closures 예제 결과 2.png' | relative_url }}" alt="closures 예제 결과 2">

초반에는 closure를 "잠깐 쓰는 짧은 함수"라고 이해해도 충분하다.

## Iterators: 컬렉션을 유연하게 순회하기

iterator는 데이터를 하나씩 꺼내며 처리하는 추상화다. Rust에서는 `for`문뿐 아니라 `map`, `filter`, `sum`, `collect` 같은 메서드 체이닝과 함께 자주 등장한다. 여기서 `map`이나 `filter` 같은 단계는 바로 계산을 끝내는 것이 아니라, `sum`, `collect`, `for`처럼 실제로 소비하는 시점에 평가된다는 점도 중요하다.
근거: Rust Book은 iterator를 지연 평가와 조합 가능한 순회 인터페이스로 설명한다. [Processing a Series of Items with Iterators](https://doc.rust-lang.org/book/ch13-02-iterators.html)

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    let total: i32 = numbers
        .iter()
        .copied()
        .filter(|n| n % 2 == 0)
        .map(|n| n * 2)
        .sum();

    println!("total = {}", total);
}
```

실행 결과는 아래와 같다.

<img src="{{ '/images/rust_06/Iterators 예제 결과.png' | relative_url }}" alt="Iterators 예제 결과">

이 코드는 아래 흐름으로 읽으면 된다.

- `iter()`로 요소를 순회한다.
- `copied()`로 `&i32`를 `i32` 값으로 바꾼다.
- `filter()`로 짝수만 남긴다.
- `map()`으로 값을 두 배로 만든다.
- `sum()`으로 모두 더한다.

iterator의 장점은 중간 단계가 명확하게 드러나고, 반복 로직을 직접 관리하지 않아도 된다는 점이다.

## 한 번에 보는 종합 예제

지금까지 본 내용을 한 파일에 모으면 아래처럼 정리할 수 있다.

```rust
use std::num::ParseIntError;
use std::str::FromStr;

fn parse_values<T>(inputs: &[&str]) -> Result<Vec<T>, T::Err>
where
    T: FromStr,
{
    inputs.iter().map(|input| input.parse::<T>()).collect()
}

fn main() -> Result<(), ParseIntError> {
    let inputs = vec!["10", "20", "30"];
    let numbers = parse_values::<i32>(&inputs)?;

    let bonus = 3;
    let doubled_total: i32 = numbers.iter().map(|n| (n + bonus) * 2).sum();

    println!("numbers = {:?}", numbers);
    println!("doubled_total = {}", doubled_total);

    Ok(())
}
```

이 예제에는 아래 요소가 모두 들어 있다.

- `parse_values<T>`에서 generic 사용
- `Result`와 `?`를 통한 error handling
- `map(|n| ...)` 형태의 closure
- `iter()`와 `sum()`을 이용한 iterator 처리

처음에는 각각의 개념을 따로 실행해 보고, 마지막에 이 종합 예제를 보면 "왜 이 네 가지가 자주 같이 나오는지"가 더 잘 보인다.

## 정리

이번 글에서는 `generics`, error handling, closure, iterator를 한 번에 정리했다. generic은 같은 로직을 여러 타입에 재사용하게 해 주고, `Result`와 `?`는 실패 가능성을 안전하게 다루게 해 준다. closure는 짧은 로직을 값처럼 넘길 수 있게 하고, iterator는 컬렉션 처리 코드를 훨씬 읽기 좋게 만든다.

다음 단계에서는 collection, ownership 심화, module, crate, async 같은 주제로 넘어가면서, 지금 배운 추상화 도구들이 실전 코드에서 어떻게 확장되는지 이어서 보면 좋다.

## 출처 및 참고

- Rust Project Developers, [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- Rust Project Developers, [Generic Data Types](https://doc.rust-lang.org/book/ch10-01-syntax.html)
- Rust Project Developers, [Recoverable Errors with Result](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html)
- Rust Project Developers, [Closures](https://doc.rust-lang.org/book/ch13-01-closures.html)
- Rust Project Developers, [Processing a Series of Items with Iterators](https://doc.rust-lang.org/book/ch13-02-iterators.html)
